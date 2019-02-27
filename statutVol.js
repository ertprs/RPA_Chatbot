var txt = require('./sendText');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';
const format = require('./dateFormat.js');
const
  request = require('request');
module.exports ={
  callStatut : function (text, sender, langu){
    var vol = text.substring(2, 5); console.log("VOL : ", vol);
    // Formatter date envoyée
    var jour = text.substring(6, 8);
    jour = Number(jour); console.log("JOUR : ", jour);
    var month = text.substring(8, 11);
   /*formatter mois*/
   mois = format(month);
   console.log("MOIS : ", mois);
  // var body_xml = text.replace(/\s+/g, '');
        var requestBody =
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
          'xmlns:ws="http://ws.royalairmaroc.com"> <soapenv:Header/>' +
          '<soapenv:Body> <ws:WebsitegetFlightInfoByFlightNumber>' +
          '<ws:FnNumber>' + vol /*body_xml*/ + '</ws:FnNumber>' +
          '</ws:WebsitegetFlightInfoByFlightNumber>' +
          '</soapenv:Body>' +
          '</soapenv:Envelope>';

        var requestHeaders = {
          'cache-control': 'no-cache',
          'soapaction': 'urn:WebsitegetFlightInfoByFlightNumber',
          'content-type': 'text/xml;charset=UTF-8'
        };

        var requestOptions = {
          'method': 'POST',
          'url': 'http://statutvolp.royalairmaroc.com/WebServiceStatutDeVol/services/FlightStatus?wsdl',
          'qs': { 'wsdl': ''},
          'headers': requestHeaders,
          'body': requestBody
        };
        // Formatter date du jour
        var date = new Date();
        var d = date.toString();
        var j = d.substring(8, 11);
            j = Number(j); console.log("J : ", j);
        var m = d.substring(4, 7);
            m = m.toLowerCase(); console.log("M : ", m);
        var i,
            err = '';
        request(requestOptions, function (error, response, body) {
          if (error) {
            console.log(error);
          } else {
            // Test jours
            if( m != mois){
              err = 'X';
            } else {
              if(jour == j-1){ i = '0';
              } else if(jour == j) {   i = '1';
              } else if (jour == j+1){ i = '2';
              } else {  err = 'X';
              }
            }
            console.log( "I : ", i);
            // END TEST JOURS
        //Afficher resultat
        // console.log(body);
          var DOMParser = new (require('xmldom')).DOMParser;
          var doc = DOMParser.parseFromString(body);
          //Statut
          var NodeById = doc.getElementsByTagName('ax21:statut')[i];
          if (NodeById != null && err != 'X'){
              var var_1 = NodeById.childNodes[0];
              var statut_vol = var_1.nodeValue;
              // console.log
        //Num Vol
          var NodeByvol = doc.getElementsByTagName('ax21:flightNumber')[i];
              var var_2 = NodeByvol.childNodes[0];
              var num_vol = var_2.nodeValue;
        //Date vol
          var NodeBydate = doc.getElementsByTagName('ax21:flightDate')[i];
              var var_3 = NodeBydate.childNodes[0];
              var date_vol = var_3.nodeValue;
        //destination
          var NodeBydestin = doc.getElementsByTagName('ax21:destination')[i];
              var var_4 = NodeBydestin.childNodes[0];
              var date_destin = var_4.nodeValue;
        //date et heure d'arrivée.
          var NodeBytime = doc.getElementsByTagName('ax21:realArrival')[i];
              var var_5 = NodeBytime.childNodes[0];
              var time_arr = var_5.nodeValue;
              if(langu == 'FR'){
              // variable_texte = String(statut_vol + num_vol + date_vol + date_destin + time_arr);
                variable_texte = "Statut : " + String(statut_vol) + "\n" +
                               "Numéro de vol : " + String(num_vol) + "\n" +
                               "Date du vol : " + String(date_vol) + "\n" +
                               "Destination : " + String(date_destin) + "\n" +
                               "Date et heure d'arrivée : " + String(time_arr) + "\n" ;
              } else {
                variable_texte = "Status : " + String(statut_vol) + "\n" +
                                 "Flight number : " + String(num_vol) + "\n" +
                                 "Flight date : " + String(date_vol) + "\n" +
                                 "Destination : " + String(date_destin) + "\n" +
                                 "Date and time of arrival : " + String(time_arr) + "\n" ;
              }
              // String(var_2);
              console.log(variable_texte);
              let send = txt.sendText(sender, variable_texte, langu);
              // sendTextMessage(sender, variable_texte);
           } else {
             if(langu == 'FR'){
               var err_msg = "Entree non autorisee, merci de verifier le numero saisi.";
             } else {
              var err_msg = "Unauthorized entry, please check the number entered.";
             }
             let send = txt.sendText(sender, err_msg, langu);
             // sendTextMessage(sender, err_msg);
           }
         }
        });
      }
}
