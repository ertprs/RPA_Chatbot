const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';
const request = require('request');

module.exports ={
  sendText : function (sender, text, langu){
    console.log(text, "SENT TEXT");
    sendTextMessage(sender, text);
    let req = exportReq(langu);
    let back = req.backToZero(sender);
    console.log(text, "BEFORE BACK TO ZERO");
    backToZero(sender, back);
  }
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
      } // end const sendTextMessage
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
} // end function callSendAPI

// Supprimer ligne user si OPT-OUT
function backToZero(sender, text){
  setTimeout(function(){
    sendTextMessage(sender, text);
  }, 1000);
}

//Dynamiser la récupération de texte par langue choisie
function exportReq (lang){
  ///// Require language files
  var fr = require('./fr');
  var en = require('./en');
  // var ar = require('./ar');
  let req;
    if (lang == 'FR'){
      req = fr;
    } else if(lang == 'EN') {
      req = en;
    } else if(lang == 'AR') {
      req = ar;
    }
    return req;
}
