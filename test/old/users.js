const axios = require('../helpers/request');
const { assert } = require('chai');

const { generateRandomUser } = require('../helpers/dataHelpers');

const userKeys = ['id', 'name', 'email', 'gender', 'status'];

describe.skip('Users Endpoint', () => {
  it('GET /users', async () => {
    const response = await axios.get(`/users`);
    const { status, statusText, data: users } = response;

    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');
    // all users have proper keys
    users.forEach((user) => {
      assert.containsAllKeys(user, userKeys, 'all keys are present');
    });
  });

  it('POST /users', async () => {
    const generatedUser = generateRandomUser();
    const { status, statusText, data: returnedUser } = await axios.post(`/users`, generatedUser);

    assert.equal(status, 201, 'status is correct');
    assert.equal(statusText, 'Created', 'status test is correct');
    assert.ownInclude(returnedUser, generatedUser, 'saved user as same fields');
  });

  describe('get user by various fields', () => {
    let saveduser;
    before(async () => {
      const response = await axios.post('/users', generateRandomUser());
      saveduser = response.data;
    });
    after(async () => {
      axios.delete(`/users/${saveduser.id}`);
    });

    userKeys.forEach((key) => {
      it(`GET /users by ${key}`, async () => {
        const config = {
          params: {
            [key]: saveduser[key],
          },
        };

        const response = await axios.get(`/users`, config);
        const users = response.data;

        users.forEach((user) =>
          assert.equal(saveduser[key], user[key], `Username expected to be ${saveduser[key]}, got - ${user[key]}`)
        );
      });
    });
  });

  describe('patch', () => {
    let testUser;
    before(async () => {
      const generatedUser = generateRandomUser();
      const response = await axios.post(`/users`, generatedUser);
      testUser = response.data;
    });
    it('existing user', async () => {
      const data = {
        name: 'patched name',
      };

      const response = await axios.put(`/users/${testUser.id}`, data);
      assert.equal(response.status, 200);
    });
  });

  describe('DELETE', () => {
    let testUser;
    beforeEach(async () => {
      const generUser = generateRandomUser();
      const resp = await axios.post(`/users`, generUser);
      testUser = resp.data;
    });

    it('existing user', async () => {
      const r = await axios.delete(`/users/${testUser.id}`);
      assert.equal(r.status, 204);
    });

    it('non existing user', async () => {
      const r = await axios.delete(`/users/${testUser.id}`);
      const resp = await axios.delete(`/users/${testUser.id}`).catch((err) => {
        const { status } = err.response;
        assert.equal(status, 404);
      });
    });
  });

  describe('invalid url', () => {
    it('should return 404 with invalid url', async () => {
      const response = await axios.get(`/non-existing-url`).catch((err) => {
        const { status } = err.response;
        assert.equal(status, 404);
      });
    });
  });
});
