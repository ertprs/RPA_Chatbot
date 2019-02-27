var txt = require('./sendText');
var full_result;

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const axios = require('axios');
const callSafar = async (safarid, sender, langu) => {
    // safarid = safarid.trim();
    console.log("TEXT :" ,safarid);
    return axios.get(`http://192.168.20.51:8010/site/ffp-ws?number=${safarid}&key=HkfYe15g578FjcvSq87YPwkqi`)
    .then(response => {
        // return response.data;
        console.log("DATA : ", response.data);
        //console.log(response.data);
        console.log(response.data.totalMiles);
        console.log(response.data.status);
          if (langu == 'FR'){
            full_result = 'Numéro Safar Flyer : ' + safarid + "\n" +
                          'Total Miles : ' + response.data.totalMiles  +  "\n" +
                          'Votre statut : ' + response.data.status + "\n" ;
          } else if (langu == 'EN'){
            full_result = 'Safar Flyer number : ' + safarid + "\n" +
                          'Total Miles : ' + response.data.totalMiles  +  "\n" +
                          'Your status : ' + response.data.status + "\n" ;
          }
        let send = txt.sendText(sender, full_result, langu);
    })
    .catch(error => {
    console.log(error);
    if (langu == 'FR'){
      full_result = "Vérifiez votre entree !" + "\n" +
                      "Par exemple : 908677831";
    } else if (langu == 'EN'){
      full_result = "Check your entry !" + "\n" +
                      "Par exemple : 908677831";
    }
    let send = txt.sendText(sender, full_result, langu);
    });
}

// callSafar('108677785', '2041738185879573', 'FR');
module.exports = callSafar;
