const axios = require('axios');
const { assert } = require('chai');

describe.skip('Basic Auth Example', () => {
  const URL = 'https://postman-echo.com/basic-auth';
  //this is just for example purposes  -- not secure
  // Do not place credentials on github!!!
  const USERNAME = 'postman';
  const PASSWORD = 'password';

  it('should be not authorized', async () => {
    const response = await axios.get(URL).catch((err) => {
      assert.equal(err.message, 'Request failed with status code 401');
      assert.equal(err.code, 'ERR_BAD_REQUEST');
    });

    if (response) {
      assert.fail(`No response should be shown without credentials. Response is ${rsponse}`);
    }
  });
  // set credentials as axios params
  it('should get valid response with axios "auth" params', async () => {
    const config = {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    };

    const response = await axios.get(URL, config);
    const { status, statusText, data } = response;
    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');
    assert.deepEqual(data, { authenticated: true });
  });

  // generate token maually and set as Authorization token
  it('should get valid response with manually generated token', async () => {
    const token = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const response = await axios.get(URL, config);
    const { data } = response;
    assert.deepEqual(data, { authenticated: true });
  });
});
