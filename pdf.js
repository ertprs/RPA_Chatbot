const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const
  request = require('request'),
  fs = require('fs'),
  http = require('http'),
  pdfreader = require('pdfreader');

module.exports = {
  sendFile : function (text, sender){
    let content = "http://green-ws.royalairmaroc.com/docs/253fe21d08b9fa17eb87e2e5811d79e0.pdf";
    // let content = "http://www.orimi.com/pdf-test.pdf";
    // let content = "http://home.zcu.cz/~jezekjan/tisk/BoardingPass.pdf";
  //   console.log(text);
  //   const file = fs.createWriteStream("file_test.pdf");
  //   const request = http.get("http://192.168.20.51:8010/docs/9b933153818f59aac8a51cac4d334f01.pdf", function(response) {
  // response.pipe(file);
  // });
    sendFile(sender,content);
  }
}
const sendFile = async (senderID, text) => {
    var fileData = {
      recipient: {
        id: senderID
      },
      message: {
        attachment: {
          // type: "template",
          //      payload: {
          //          template_type: "open_graph",
          //          elements: [
          //              {
          //                  url: text
          //              }
          //          ]
          type: "file",
          payload: {
            url: text,
            is_reusable: true
          }
        }
      }
    };
    await callSendAPI(fileData);
  }

  // Graph API
  function callSendAPI(messageData) {
    let headers = {
    'Content-Type': 'file'
    };
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
