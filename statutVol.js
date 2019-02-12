const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const
  request = require('request');
module.exports ={
  callStatut : function (text, sender){
  var body_xml = text.replace(/\s+/g, '');
        var requestBody =
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
          'xmlns:ws="http://ws.royalairmaroc.com"> <soapenv:Header/>' +
          '<soapenv:Body> <ws:SmsgetFlightInfoByFlightNumber>' +
          '<ws:FlightNumber>' + body_xml + '</ws:FlightNumber>' +
          '</ws:SmsgetFlightInfoByFlightNumber>' +
          '</soapenv:Body>' +
          '</soapenv:Envelope>';

        var requestHeaders = {
          'cache-control': 'no-cache',
          'soapaction': 'urn:SmsgetFlightInfoByFlightNumber',
          'content-type': 'text/xml;charset=UTF-8'
        };

        var requestOptions = {
          'method': 'POST',
          'url': 'http://statutvolp.royalairmaroc.com/WebServiceStatutDeVol/services/FlightStatus?wsdl',
          'qs': { 'wsdl': ''},
          // 'proxy': 'http://38tzc6v3ms43ku:rT4elgo_oPu3fsO3sUhusgt_uQ@eu-west-static-01.quotaguard.com:9293',
          'headers': requestHeaders,
          'body': requestBody
        };

        request(requestOptions, function (error, response, body) {
          if (error) {
            console.log(error);
          } else {
        //Afficher resultat
        // console.log(body);
          var DOMParser = new (require('xmldom')).DOMParser;
          var doc = DOMParser.parseFromString(body);
          //Statut
          var NodeById = doc.getElementsByTagName('ax21:statut')[0];
          if (NodeById != null){
              var var_1 = NodeById.childNodes[0];
              var statut_vol = var_1.nodeValue;
              // console.log
        //Num Vol
          var NodeByvol = doc.getElementsByTagName('ax21:flightNumber')[0];
              var var_2 = NodeByvol.childNodes[0];
              var num_vol = var_2.nodeValue;
        //Date vol
          var NodeBydate = doc.getElementsByTagName('ax21:flightDate')[0];
              var var_3 = NodeBydate.childNodes[0];
              var date_vol = var_3.nodeValue;
        //destination
          var NodeBydestin = doc.getElementsByTagName('ax21:destination')[0];
              var var_4 = NodeBydestin.childNodes[0];
              var date_destin = var_4.nodeValue;
        //date et heure d'arrivée.
          var NodeBytime = doc.getElementsByTagName('ax21:realArrival')[0];
              var var_5 = NodeBytime.childNodes[0];
              var time_arr = var_5.nodeValue;

              // variable_texte = String(statut_vol + num_vol + date_vol + date_destin + time_arr);
              variable_texte = "Statut : " + String(statut_vol) + "\n" +
                               "Num de vol : " + String(num_vol) + "\n" +
                               "Date du vol : " + String(date_vol) + "\n" +
                               "Destination : " + String(date_destin) + "\n" +
                               "Date et heure d'arrivée : " + String(time_arr) + "\n" ;
              // String(var_2);
              console.log(variable_texte);
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
