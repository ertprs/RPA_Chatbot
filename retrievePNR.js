var txt = require('./sendText');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';
const pnr_key = process.env.PNR_KEY,
      pnr_req = process.env.PNR_REQ ;

const
  request = require('request'),
  http = require('http');

  module.exports ={
    callPNR : function (pnrid, sender, langu){
      // var langu = 'FR';
      var full_result;
      var length = pnrid.length;
      console.log(length);
      var pnr = pnrid.substring(0, 6);
      var name = pnrid.substring(7, length);
      console.log("PNR :", pnr,"X" );
      console.log("Name :", name,"X" );
      if(pnr == null || name == null){
        if (langu == 'FR'){
          var handleMissing = "Vérifiez votre entree !" + "\n" +
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
                   '&request=' + 'PNR';

      var path_pnr =  endpoint + resource + parameters;
      console.log(path_pnr);

      var req1 = new Promise((resolve, reject) => {
      http.get(path_pnr , (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          result = JSON.parse(data);
          // console.log(tmp_json, "tmp_json.");
          console.log(result, "test1");
          resolve()
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message, "testError");
        reject(error)
      });
    });

    Promise.all([ req1 ]).then(() => {
      console.log(result, "test3");
      console.log(result.segments, "Segments");
      if(result.segments == null){
        if (langu == 'FR'){
          var handleMissing = "Verifiez votre entree !" + "\n" +
                            "Exemple :  E45RGH YOURNAME";
          let send = txt.sendText(sender, handleMissing, langu);
        } else {
          var handleMissing = "Check your entry !" + "\n" +
                            "Exemple :  E45RGH YOURNAME";
          let send = txt.sendText(sender, handleMissing, langu);
        }
      } else {
      console.log(JSON.stringify(result.segments[1].departure));
      console.log(result.segments.length);

// Formuler le message de réponse
      let pass = '';
      let res = result;
      let data = result.segments;
      console.log(data);
      // Passengers
        var len = result.names.length;
        for (let i = 0; i < len; i ++){
           pass = pass + result.names[i] + "\n" ;
        }
      if(langu == 'FR') {
        full_result = "Bonjour " + res.names[0] + ',' + "\n" +
                      "Merci d'avoir choisi Royal Air Maroc. Ci-après le détail de votre réservation:";
        console.log(full_result);
        full_result = full_result + "\n" + "\n" +
                      "Numéro de réservation: " + res.pnr + "\n" +
                      "Passagers : " + "\n"  + pass ;

      } else {
        full_result = "Hi " + result.names[0] + ',' + "\n" +
                      "Thank you for flying with Royal Air Maroc. This is your flight confirmation:";
        console.log(full_result);
        full_result = full_result + "\n" + "\n" +
                     "Booking reference: " + res.pnr + "\n" +
                     "Passengers : " + "\n"  + pass;

      }

      for(let i = 0; i < result.segments.length; i++){

        // Formattage date :
        console.log(i);
        // console.log(data[i]);
          let datedep = data[i].dateDepart;
          let datefin = data[i].dateArrival;
          datedep = datedep.slice(0, 2) + '/' + datedep.slice(2, 4) + '/' + datedep.slice(4, 6);
          datefin = datefin.slice(0, 2) + '/' + datefin.slice(2, 4) + '/' + datefin.slice(4, 6);

        // Formattage heure
          let heuredep = data[i].departure;
          let heurefin = data[i].arrival;
          heuredep = heuredep.slice(0, 2) + ':' + heuredep.slice(2, 4);
          heurefin = heurefin.slice(0, 2) + ':' + heurefin.slice(2, 4);

          if(langu == 'FR'){
            let result = "Itinéraire : " + String(data[i].from) + "➡" + String(data[i].to)  + "\n" +
                         "Vol : " + String(data[i].flight) + "\n" +
                         "Départ : " + datedep + ' ' + heuredep + "\n" +
                         "Arrivée : " + datefin + ' ' + heurefin + "\n";

            full_result = full_result + "\n" + "\n" + result;
            console.log(full_result);
            // let send = txt.sendText(sender, full_result, langu);
          } else {
            let result = "Routing : " + String(data[i].from) + "➡" + String(data[i].to) + "\n" +
                         "Flight : " + String(data[i].flight) + "\n" +
                         "Departure Time : " + datedep + ' ' + heuredep + "\n" +
                         "Arrival Time : " + datefin + ' ' + heurefin + "\n";
            full_result = full_result + "\n" + result;
            console.log(full_result);
          }
      }
      let send = txt.sendText(sender, full_result, langu);
    }
    }) // end promise
  }
}
