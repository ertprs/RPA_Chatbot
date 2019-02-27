var txt = require('./sendText');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const download = require('./downloadfile.js'),
      send = require('./sendattachement.js');
const
  request = require('request'),
  http = require('http');

module.exports = {
  sendFile : function (bpid, sender, langu){
    var full_result;
    var length = bpid.length;
    console.log(length);
    var pnr = bpid.substring(0, 6);
    var name = bpid.substring(7, length);
    console.log("PNR :", pnr,"X" );
    console.log("Name :", name,"X" );
    // var res = text.split(" ");
    // var pnr = res[0];
    // var name = res[1];
    if(pnr == null || name == null){
      if (langu == 'FR'){
        var handleMissing = "Verifiez votre entree !" + "\n" +
                          "Exemple :  E45RGH YOURNAME";
        let send = txt.sendText(sender, handleMissing, langu);
      } else {
        var handleMissing = "Check your entry !" + "\n" +
                          "Exemple :  E45RGH YOURNAME";
        let send = txt.sendText(sender, handleMissing, langu);
      }
    };
    var endpoint = 'http://192.168.20.51:8010',
        resource = '/site/amadeus-ws',
        parameters = '?key=' + 'HkfYe15g578FjcvSq87YPwkqi' +
                 '&pnr=' + pnr +
                 '&name=' + name +
                 '&request=' + 'BP';
                 var path_pnr =  endpoint + resource + parameters;
                 console.log(path_pnr);

                 var req1 = new Promise((resolve, reject) => {
                 http.get(path_pnr , (resp) => {
                   let data = '';

                   resp.on('data', (chunk) => {
                     data += chunk;
                   });

                   resp.on('end', () => {
                     console.log("DATA : ", data);
                     result = JSON.parse(data);
                     // console.log(tmp_json, "tmp_json.");
                     console.log(result, "test1");
                     resolve()
                   });

                 }).on("error", (err) => {
                   console.log("Error: " + err.message, "testError");
                   reject(err)
                 });
               });

               Promise.all([ req1 ]).then(() => {
                 console.log(result, "test3");
                 if(result != null){
                 // console.log(JSON.stringify(result));
                 let board = result.boarding;
                 let check = result.checkin;
                 // console.log("checking : ", check);
                 let dataLength = Object.keys(board).length;
                 console.log(dataLength);
                 let dynamicProperties = Object.getOwnPropertyNames(board);
                 console.log("dynamicProperties : ", dynamicProperties);
                 for(let i = 0; i < dataLength; i++){
                   console.log(board[dynamicProperties[i]]);
                   let content = board[dynamicProperties[i]];
                   let length = content.length;
                   content = content.substring(30, length);
                   console.log("CONTENT : ", content);
                   download(content).then(() => send(sender, content)).catch((err) => console.log(err));
                 }
                 if (langu == 'FR'){
                   let greeting = `Bonjour ${check.name},`+ "\n";
                   let msg = greeting + `Veuillez effectuer le chck-in du vol en utilisant le lien suivant : ${check.surname} ${check.pnr}`;
                   setTimeout(function(){txt.sendText(sender, msg, langu);}, 3000);
                 } else {
                   let greeting = `Hi ${check.name},` + "\n";
                   let msg = greeting + `Please make the flight check-in first using the following link : ${check.surname} ${check.pnr}`;
                   setTimeout(function(){txt.sendText(sender, msg, langu);}, 3000);
                 }
               } else {
                 if(langu =='FR'){
                   var handleMissing = "Vérifiez votre entree !" + "\n" +
                                     "Exemple :  E45RGH YOURNAME";
                   let send = txt.sendText(sender, handleMissing, langu);
                 } else {
                   var handleMissing = "Check your entry !" + "\n" +
                                     "Exemple :  E45RGH YOURNAME";
                   let send = txt.sendText(sender, handleMissing, langu);
               }
               }
               });
}}

  const sendFile = async (senderID, text) => {
    console.log("TEXT : ", text);
    var fileData = {
      recipient: {
        id: senderID
      },
      message: {
        attachment: {
          type: "file",
          payload: {
             url: "http://green-ws.royalairmaroc.com/docs/87dff462c8d66ba19313722d7356205c.pdf"
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
