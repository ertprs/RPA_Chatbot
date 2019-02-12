let username ='gdpr@apiuser.com';
let password ="Ht47gr8ZG2GxajkuG0nG18rOoPFsRB0g";

var soap = require('soap');
var url = 'C:/Users/SBENFDIL/Desktop/RAM Chatbot/SalesforcePRODwsdl.xml';
var query = 'SELECT Status FROM Case WHERE CaseNumber LIKE ' + "'00802915'";
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
			      console.log(result2.result.records[0].Status); // Statut récupéré !
          };
      });
    });

  });
