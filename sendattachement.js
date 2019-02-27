const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
// const Path = require('path')
require('dotenv').config({ path: 'variables.env' });

const { PAGE_ACCESS_TOKEN } = process.env;
// const path = Path.join(__dirname, '/../');

const callSendAPI = async(form) => {
    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    const headers = {
    'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    };
  return axios({
      method: 'post',
      url,
      headers,
      data: form,
      timeout: '10000',
    })
    .then(response => {
        console.log(response.data);
        //return response;
    })
    .catch(error => {
        console.log(error.response.data);
        //return error.response;
    });
}

const sendAttachment = (recipientID, fileName) => {
    let fileReaderStream = fs.createReadStream(`./Docs/${fileName}`);
    let form = new FormData();
    let formData = {
        recipient: JSON.stringify({
        id: recipientID
    }),
    message: JSON.stringify({
    attachment: {
        type: 'file',
        payload: {
            is_reusable: false
        }
    }
    }),
    filedata: fileReaderStream
    };
    form.append('recipient', formData.recipient);
    form.append('message', formData.message);
    form.append('filedata', formData.filedata);
    callSendAPI(form);
}
// sendAttachment('2041738185879573','253fe21d08b9fa17eb87e2e5811d79e0.pdf');
module.exports = sendAttachment;
