const Fs = require('fs');
// const Path = require('path');
const axios = require('axios');

const downloadFile = async(pdfname) => {
    //http://green-ws.royalairmaroc.com/docs/253fe21d08b9fa17eb87e2e5811d79e0.pdf
    const url = `http://192.168.20.51:8010/docs/${pdfname}`;
    // const path = Path.join(__dirname, '/../');
    const writer = Fs.createWriteStream(`./Docs/${pdfname}`)
  return axios({
      method: 'get',
      url,
      responseType: 'stream',
      timeout: '10000',
    })
    .then(response => {
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
          });
    })
    .catch(error => {
        console.log(error.response.data);
        //return error.response.data;
    });
}
// downloadFile('253fe21d08b9fa17eb87e2e5811d79e0.pdf');
module.exports = downloadFile;
