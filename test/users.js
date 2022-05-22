require('dotenv').config();
const axios = require('axios');
const { assert } = require('chai');

const { generateRandomUser } = require('./helpers/dataHelpers');

const BASE_URL = 'https://gorest.co.in/public/v2';

const TOKEN = process.env.TOKEN;
const authConfig = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

describe('Users Endpoint', () => {
  it('GET /users', async () => {
    const userProps = ['id', 'name', 'email', 'gender', 'status'];
    const response = await axios.get(`${BASE_URL}/users`);
    const { status, statusText, data: users } = response;

    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');
    //assertStatus(status, 200).andText(statusText);

    // all users have proper keys
    users.forEach((user) => {
      assert.containsAllKeys(user, userProps, 'all keys are present');
    });

    // Alternative
    // delete users[19].id; // - to fail test
    // const result = users.every((user) => {
    //   return userProps.every((prop) => prop in user);
    // });
    // assert.isTrue(result, 'all keys are present');
  });

  it('POST /users', async () => {
    const generatedUser = generateRandomUser();
    const { status, statusText, data: returnedUser } = await axios.post(`${BASE_URL}/users`, generatedUser, authConfig);
    assert.equal(status, 201, 'status is correct');
    assert.equal(statusText, 'Created', 'status test is correct');

    //returnedUser.name = 'sdf'; //fail test
    assert.ownInclude(returnedUser, generatedUser, 'saved user as same fields');

    // Alternative
    // returnedUser.name = 'fail test';
    // const allFieldsSaved = Object.keys(generatedUser).every(
    //   (key) => generatedUser[key] === returnedUser[key]
    // );
    // assert.isTrue(allFieldsSaved, 'user properties saved correctly');
  });

  // TODO: parametrize
  it('GET /users by name', async () => {
    const name = 'Jeff Daugherty'; // is there a user with the name ??? what if not ?
    const config = {
      ...authConfig,
      params: {
        name,
      },
    };

    const response = await axios.get(`${BASE_URL}/users`, config);
    const users = response.data;

    users.forEach((user) => assert.equal(user.name, name, `Username expected to be ${name}, got - ${user.name}`));

    //Alternative
    // const everyUserHasCorrectName = users.every((user) => user.name === name);
    // assert.isTrue(everyUserHasCorrectName);
  });
});
