require('dotenv').config();
const axios = require('axios');
const { assert } = require('chai');

const { generateRandomComment } = require('./helpers/dataHelpers');

const BASE_URL = 'https://gorest.co.in/public/v2';

const TOKEN = process.env.TOKEN;
const authConfig = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

describe.skip('Comments Endpoint', () => {
  it('GET /comments', async () => {
    const props = ['id', 'post_id', 'email', 'body'];
    const response = await axios.get(`${BASE_URL}/comments`);
    const { status, statusText, data: comments } = response;

    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');

    comments.forEach((comment) => {
      assert.containsAllKeys(comment, props, 'all keys are present');
    });
  });

  it('POST /comments', async () => {
    // TBD: where whould we get post id ? Will it always be present?
    const generatedComment = generateRandomComment(1886);
    const {
      status,
      statusText,
      data: returnedComment,
    } = await axios.post(`${BASE_URL}/comments`, generatedComment, authConfig).catch((e) => {
      console.log(Object.keys(e), '######');
      console.log(e.message);
      console.log(e.response.data);
    });
  });

  // TODO: parametrize
  it('GET /comments by post_id', async () => {
    const postId = 186; // is there a post with the id??
    const config = {
      ...authConfig,
      params: {
        post_id: postId,
      },
    };

    const response = await axios.get(`${BASE_URL}/comments`, config);
    const comments = response.data;
    console.log(comments, '####"'); // if no user test passes with empty array
    comments.forEach((comment) => {
      console.log(comment);
      assert.equal(comment.post_id, postId);
    });
  });
});
