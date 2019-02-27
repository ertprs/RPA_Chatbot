var txt = require('./sendText');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';
const format = require('./dateFormat.js');

const
  request = require('request');
module.exports ={
  callTrack : function (text, sender, langu){
    console.log(langu, "TRACK");
  var lang = langu.toLowerCase();
  var res = text.split(" ");
  var tag = res[0];
      tag = tag.toUpperCase();
  // var date_bag = res[1];
  var day = res[1].substring(0, 2);
  var len = res[1].length;
  var month = format(res[1].substring(2, len));
  var date_bag = day + month;
  console.log("DATE :",month )
  var name_bag = res[2];
  if(tag == null || date_bag == null || name_bag == null){
    if(langu == 'FR'){
      var handleMissing = "Verifiez votre entree !" + "\n" +
                          "Exemple :  AT707351 09JAN LastName";
    } else {
      var handleMissing = "Check your entry !" + "\n" +
                          "Example :  AT707351 09JAN LastName";
    }
    let send = txt.sendText(sender, handleMissing, langu);
    // sendTextMessage(sender, handleMissing);
  } else {
  console.log(text);
  console.log(tag, date_bag, name_bag, "BAG");
  //Chemin de rest
  var path_bag = 'http://trackbag.royalairmaroc.com/site/bag-status?tag=' + tag + '&flightdate=' + date_bag
  + '&name=' + name_bag + '&lang=' + lang;
  console.log(path_bag, "PATHBAG");
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
    if(lang == 'fr'){
      full_result = "Statut : " + String(result.statut) + "\n" +
                    "Aéroport : " + String(result.airport) + "\n" +
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
    } else {
      full_result = "Status : " + String(result.statut) + "\n" +
                    "Airport : " + String(result.airport) + "\n" +
                    "Destination : " + String(result.destination) + "\n" +
                    "Flight : " + String(result.vol) + "\n" +
                    "Flight Date : " + String(result.date) + "\n" ;
      console.log(full_result, "testAPI_send");
      if(result.onward != null){
        //"onward":null,"onwardFlight":null,"onwardDate":nul
        full_result = full_result + "Final Destination : " + String(result.onward) + "\n" +
                                    "Connecting flight Number : " + String(result.onwardFlight) + "\n" +
                                    "Connecting flight date : " + String(result.onwardDate) + "\n";
      console.log(full_result, "testAPI_onward");
      };
    }
    let send = txt.sendText(sender, full_result, langu);
    // sendTextMessage(sender, full_result);
    // sendTextMessage(sender.id, result.statut);
    // fs.writeFile('./data_test.json', data, 'utf8');
  })
  }
}
}
