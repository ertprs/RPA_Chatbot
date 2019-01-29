'use strict';

// Récupérer les variables d'environnement
 require('dotenv').config({ path: 'variables.env' });

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';
const MONGODB_URI = process.env.MONGODB_URI;

const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  mongoose = require("mongoose"),
  str = require("node-strings"),
  app = express().use(body_parser.json()); // creates express http server
const MongoClient = require('mongodb').MongoClient;

let db = mongoose.connect(MONGODB_URI);
// Sets server port and logs message on success
  app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
/*
 * GET
 */
// Accepts GET requests at the /webhook endpoint
  app.get('/webhook', (req, res) => {
  /** UPDATE YOUR VERIFY TOKEN **/
  let VERIFY_TOKEN = '123456';

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

    // Check the mode and token sent are correct
    if (mode  && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
}); //fin app.get
/*
 * POST
 */
// Accepts POST requests at /webhook endpoint
  app.post('/webhook', (req, res) => {
  // Return a '200 OK' response to all events
  res.status(200).send('EVENT_RECEIVED');

  const body = req.body;
  if (body.object === 'page') {
      // Iterate over each entry
      // There may be multiple if batched
      if (body.entry && body.entry.length <= 0){
        return;
      }
      body.entry.forEach((pageEntry) => {
        // Iterate over each messaging event and handle accordingly
        pageEntry.messaging.forEach((messagingEvent) => {
          console.log({messagingEvent});
          if (messagingEvent.message) {
            processMessage(messagingEvent);
          } else if (messagingEvent.postback) {
            processPostback(messagingEvent);
          } else {
            console.log( 'Webhook received unknown messagingEvent: ', messagingEvent );
          }
        });
      });
    }
});


//function processPostback
function processPostback(event) {
  let sender = event.sender.id; ////U+2708
  let payload = event.postback.payload;
}

//function processMessage
function processMessage(event) {
  let sender = event.sender.id;
  let message = event.message;
  // const plane = String.fromCodePoint(0x2708);
  const plane = "✈";
  // Message N°2
  const africa = "🌍";
  let text_plane = plane + " Bienvenue / Welcome to " + "Royal Air Maroc" + " on Whatsapp " + plane;

  console.log("Received message from senderId: " + sender); //  Get senders ID
  console.log("Message is: " + JSON.stringify(message)); //
  sendTextMessage(sender, text_plane);

  let text_africa = africa + " Enter en for English " + "\n" +
                    africa + " Tapez fr pour le Français ";
  console.log(text_africa, "Africaaa!!")
  setTimeout(function(){
    sendTextMessage(sender, text_africa)
}, 500);
}
// Send text message
const sendTextMessage = async (senderID, text) => {
  var messageData = {
    recipient: {
      id: senderID
    },
    message: {
      text: text
    }
  };
  console.log(messageData);
  await callSendAPI(messageData);
}
// Graph API
function callSendAPI(messageData) {
  console.log(PAGE_ACCESS_TOKEN);//test
  request({
    "url": `${FACEBOOK_GRAPH_API_BASE_URL}me/messages`,
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json" : messageData
    // "json": request_body
  }, (err, res, body) => {
    console.log("Message Sent Response body:", body);
    if (err) {
      console.error("Unable to send message:", err);
    }
  });
}
