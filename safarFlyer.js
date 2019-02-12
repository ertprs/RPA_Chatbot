const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const request = require('request');
const parser = require('body-parser');
module.exports ={
  callSafar : function (text, sender){
var fff_id = '108677811';
var safar_token = 'jwltAfBozeRJ3T6tWKhNrMgmK8ZIo48A2Z1fVBV3DdjwbjQwP';
var requestBody =
  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.royalairmaroc.com"> ' +
  '<soapenv:Header/>' +
  '<soapenv:Body> <ser:getPNRInfos>' +
  '<ser:FFP_ID>' + text + '</ser:FFP_ID>' +
  '<ser:token>' + safar_token + '</ser:token>' +
  '</ser:getPNRInfos> </soapenv:Body>' +
  '</soapenv:Envelope>';

var requestHeaders = {
  'cache-control': 'no-cache',
  'soapaction': 'urn:getPNRInfos',
  'content-type': 'text/xml;charset=UTF-8'
};

var requestOptions = {
  'method': 'POST',
  'url': 'http://192.168.20.51:8080/FFPService/services/FFPservices?wsdl',
  'qs': { 'wsdl': ''},
  'headers': requestHeaders,
  'body': requestBody,
  'timeout': 5000
};

request(requestOptions, function (error, response, body) {
  //console.log(body, "Body------------------------");
  if (error) {
    console.log(error);
  } else {
//Afficher resultat
  console.log(body, "HERE'S THE BODY!");
  var DOMParser = new (require('xmldom')).DOMParser;
  var doc = DOMParser.parseFromString(body);

// Balance
  var NodeByBal = doc.getElementsByTagName('ax21:balance')[0];
  // if (NodeByBal != null){
  var var_1 = NodeByBal.childNodes[0];
  if(var_1 != null){
      var balance = var_1.nodeValue;
      // console.log
//Email
  var NodeByMail = doc.getElementsByTagName('ax21:email')[0];
      var var_2 = NodeByMail.childNodes[0];
      var email = var_2.nodeValue;
//StatutClient
  var NodeByStat = doc.getElementsByTagName('ax21:statutClient')[0];
      var var_3 = NodeByStat.childNodes[0];
      var stat = var_3.nodeValue;
//Telephone
  var NodeByTel = doc.getElementsByTagName('ax21:telephone_portabe')[0];
      var var_4 = NodeByTel.childNodes[0];
      var date_tel = var_4.nodeValue;

      var variable_texte = "Balance : "+ String(balance) + "\n" +
                            "Statut : "+ String(stat) + "\n";
      sendTextMessage(sender, variable_texte);
      } else {
      var err_msg = "Entree non autorisee, merci de verifier le numero saisi"
      sendTextMessage(sender, err_msg);
      }
    }
});
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
