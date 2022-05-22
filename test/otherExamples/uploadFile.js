const fs = require('fs'); //required to read file
const path = require('path'); //node js built in utility module to help dealing with paths
const FormData = require('form-data'); // npm module to form-data streams
const axios = require('axios');
const { assert } = require('chai');

const form = new FormData(); // create and instance of form data that will be posted
const filePath = path.resolve(__dirname, '../data/bear.jpeg'); // form absolute path to the file (__dirname - is the current directory)
form.append('file', fs.createReadStream(filePath)); // append file to form as "multipart/form-data"

describe.skip('File Upload Tests', () => {
  it('should upload valid file', async () => {
    const { status, statusText, data } = await axios.post('https://the-internet.herokuapp.com/upload', form);

    assert.equal(status, 200, 'status is Correct');
    assert.equal(statusText, 'OK', 'status text is correct');
    assert.include(data, 'File Uploaded!'); // response data is html page with  <h3>File Uploaded!</h3>
  });

  it('should return 500 with no file provided', async () => {
    //send no data to url
    await axios.post('https://the-internet.herokuapp.com/upload', {}).catch((err) => {
      const { response } = err;
      assert.equal(response.status, 500);
      assert.equal(response.statusText, 'Internal Server Error');
    });
  });
});
