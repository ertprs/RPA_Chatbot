var txt = require('./sendText');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v2.6/';

const
  request = require('request');
module.exports ={
  callSalesforce : function (text, sender, langu){
  let recla = "'" + pad(text, 8) + "'";
  console.log(recla, "RECLAMATION");
  let username ='gdpr@apiuser.com';
  let password ="Ht47gr8ZG2GxajkuG0nG18rOoPFsRB0g";

  var soap = require('soap');
  var url = 'C:/Users/SBENFDIL/Desktop/RAM Chatbot/SalesforcePRODwsdl.xml';
  var query = 'SELECT Status FROM Case WHERE CaseNumber LIKE ' + recla; // "'00802915'";
  // var query = 'SELECT Status FROM Case WHERE CaseNumber LIKE ' + "'00181215'";
  // var query = 'SELECT Id, CaseNumber,Status, (SELECT Id, Name FROM Attachments) FROM Case';

  soap.createClient(url, function(err, client) {
    console.log('\t\tLogging in on Salesforce...');
    client.login({username: username ,password: password},function(err,result,raw){
      if(err) {console.log(err)};
      if(result){
        console.log(result.result);
      };
      var sheader = {SessionHeader:{sessionId: result.result.sessionId}};
			client.addSoapHeader(sheader,"","tns","");
		  client.setEndpoint(result.result.serverUrl);
		    console.log('\t\tQuerying attachment...');
      client.query({queryString:query},function(err,result2,raw){
		    console.log('\t\tDone.');
        if(result2){
			      // console.log(result2.result.records[0].Status); // Statut récupéré !
            console.log(result2.result);
            if(langu == 'EN'){
              if(result2.result.size != '0'){
                let status = "The status of your claim : " + result2.result.records[0].Status;
                let send = txt.sendText(sender, status, langu);
                // sendTextMessage(sender, status);
              } else {
                let err_msg = "Unauthorized entry, please check the number entered.";
                let send = txt.sendText(sender, err_msg, langu);
                // sendTextMessage(sender, err_msg);
              }
            } else {
              if(result2.result.size != '0'){
                let statut = "Le statut de votre réclamation : " + result2.result.records[0].Status;
                let send = txt.sendText(sender, status, langu);
                // sendTextMessage(sender, statut);
              } else {
                  let err_msg = "Entree non autorisee, merci de verifier le numero saisi.";
                  let send = txt.sendText(sender, err_msg, langu);
                // sendTextMessage(sender, err_msg);
                }
            }
          };
      });
    });

  });
 }
}
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
