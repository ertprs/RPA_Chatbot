const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const
  request = require('request'),
  fs = require('fs'),
  pdfreader = require('pdfreader');

module.exports = {
  sendFIle : function (text, sender){
    fs.readFile('C:/Users/SBENFDIL/Desktop/RAM Chatbot/pdf-test.pdf', function read(err, data) {
          if (err) {
              throw err;
          };
        let  content = data;
        console.log(content, 'TEST_PDF');
        sendFile(sender, content);
  });
}}
//
//   fs.readFile('C:/Users/SBENFDIL/Desktop/RAM Chatbot/pdf-test.pdf', function read(err, data) {
//       if (err) {
//           throw err;
//       }
//       content = data;
//
//       // Invoke the next step here however you like
//       console.log(content);   // Put all of the code here (not the best solution)
//       processFile();          // Or put the next step in a function and invoke it
//   });
//
//   function processFile() {
//       console.log(content);
//   }

  const sendFile = async (senderID, text) => {
    var fileData = {
      recipient: {
        id: senderID
      },
      message: {
        attachment: {
          type: "file",
          payload: {
            url: "http://www.orimi.com/pdf-test.pdf"
          }
        }
      }
    };
    await callSendAPI(fileData);
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
