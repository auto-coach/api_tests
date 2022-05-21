require('dotenv').config();
const axios = require('axios');
const { assert } = require('chai');

const { generateRandomPost } = require('./helpers/dataHelpers');

const BASE_URL = 'https://gorest.co.in/public/v2';

const TOKEN = process.env.TOKEN;
const authConfig = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

describe.skip('POSTS Endpoint', () => {
  it('GET /posts', async () => {
    const props = ['id', 'user_id', 'title', 'body'];
    const response = await axios.get(`${BASE_URL}/posts`);
    const { status, statusText, data: posts } = response;

    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');

    posts.forEach((post) => {
      assert.containsAllKeys(post, props, 'all keys are present');
    });
  });

  it('POST /posts', async () => {
    // TBD: where whould we get user id ? Will it always be present?
    const generatedPost = generateRandomPost(2432);
    const {
      status,
      statusText,
      data: returnedPost,
    } = await axios.post(`${BASE_URL}/posts`, generatedPost, authConfig).catch((e) => {
      console.log(Object.keys(e), '######');
      console.log(e.message);
      console.log(e.response.data);
    });
  });

  // TODO: parametrize
  it('GET /posts by user_id', async () => {
    const userId = 9999; // is there a user with the id??
    const config = {
      ...authConfig,
      params: {
        user_id: userId,
      },
    };

    const response = await axios.get(`${BASE_URL}/posts`, config);
    const posts = response.data;

    //TBD: if no user test passes with empty array
    posts.forEach((post) => assert.equal(post.user_id, userId));
  });
});
