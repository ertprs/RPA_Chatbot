module.exports = (req, res) => {
  // Send text message
  function sendTextMessage = async (senderID, text) => {
    var messageData = {
      recipient: {
        id: senderID
      },
      message: {
        text: text
      }
    };
    console.log(messageData);
     callSendAPI(messageData);
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
  }
