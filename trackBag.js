const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const
  request = require('request');
module.exports ={
  callTrack : function (text, sender){

  var res = text.split(" ");
  var tag = res[0];
  var date_bag = res[1];
  var name_bag = res[2];
  if(tag == null || date_bag == null || name_bag == null){
    var handleMissing = "Verifiez votre entree !" + "\n" +
                          "Exemple :  AT707351 09JAN LastName";
    sendTextMessage(sender, handleMissing);
  } else {
  console.log(text);
  console.log(tag, date_bag, name_bag, "Karim");
  //Chemin de rest
  var path_bag = 'http://trackbag.royalairmaroc.com/site/bag-status?tag=' + tag + '&flightdate=' + date_bag + '&name=' + name_bag;
  console.log(path_bag, "Baydara");
  // web service REST
  var http = require('http');
  var fs = require("fs");
  var tmp_json = {};
  var g_last = 0;
  var data = {};
  var result ;
  var full_result;
   //request 1
  var req1 = new Promise((resolve, reject) => {
    http.get(path_bag, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        tmp_json.server1 = {};
        tmp_json.server1 = JSON.parse(data);
        result = JSON.parse(data);
        console.log(result.statut, "test1");
        resolve()
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message, "testError");
      reject(error)
    });
  });
  Promise.all([ req1 ]).then(() => {
    console.log(result, "test3");
    data = JSON.stringify(result);
    full_result = "Statut : " + String(result.statut) + "\n" +
                  "Aeroport : " + String(result.airport) + "\n" +
                  "Destination : " + String(result.destination) + "\n" +
                  "Vol : " + String(result.vol) + "\n" +
                  "Date du vol : " + String(result.date) + "\n" ;
    console.log(full_result, "testAPI_send");
    if(result.onward != null){
      //"onward":null,"onwardFlight":null,"onwardDate":nul
      full_result = full_result + "Destination finale : " + String(result.onward) + "\n" +
                                  "Num vol de correspondance : " + String(result.onwardFlight) + "\n" +
                                  "Date vol de correspondance : " + String(result.onwardDate) + "\n";
    console.log(full_result, "testAPI_onward");
    };
    sendTextMessage(sender, full_result);
    // sendTextMessage(sender.id, result.statut);
    // fs.writeFile('./data_test.json', data, 'utf8');
  })
  }
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

const sendQuickReply = async (recipientId, text, replies, metadata) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: text,
      // metadata: isDefined(metadata) ? metadata : "",
      quick_replies: replies
    }
  };
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
} // end function callSendAPI
