require('dotenv').config();
const axios = require('axios');
const { assert } = require('chai');

const BASE_URL = 'https://gorest.co.in/public/v2';

const TOKEN = process.env.TOKEN;

describe('Users Endpoint', () => {
  it('GET /users', async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    const { status, statusText, data: users } = response;
    // console.log(data);
    // console.log(status, statusText);

    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');
    assert.equal(users.length, 20);

    // users.forEach((user) => {
    //   //const result = 'id' in user;
    //  // assert.equal(result, true, 'all users have id field');
    //   assert.hasAllKeys(
    //     user,
    //     ['id', 'name', 'email', 'gender', 'status'],
    //     'all keys are present'
    //   );
    // });

    //delete users[19].id;

    let result = users.every((user) => {
      return 'id' in user;
    });

    console.log('############', result);

    assert.equal(result, true, 'all users have id field');
  });

  it('POST /users', async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    const user = {
      name: 'Test Name',
      email: 'test@email.com',
      status: 'inactive',
      gender: 'male',
    };

    const response = await axios.post(`${BASE_URL}/users`, user, config);

    const returnedUser = response.data;
    // assert.equal(status, 200, 'status is correct');
    // assert.equal(statusText, 'OK', 'status test is correct');
    assert.ownInclude(returnedUser, user, 'saved user as same fields');
    console.log(OBject.keys(response));
  });

  // parametrize
  it(' GET /users by ${field}', async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        name: 'Test Name',
      },
    };

    const response = await axios.get(`${BASE_URL}/users`, config);
    const user = response.data;
  });
});
