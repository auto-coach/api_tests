const axios = require('../helpers/request');
const { assert } = require('chai');

const { generateRandomPost, generateRandomUser } = require('../helpers/dataHelpers');

const postKeys = ['id', 'user_id', 'title', 'body'];

describe.only('POSTS Endpoint', () => {
  let testUser;
  before(async () => {
    const genUser = generateRandomUser();
    const resp = await axios.post(`/users`, genUser);
    testUser = resp.data;
  });

  after(async () => {
    await axios.delete(`/users/${testUser.id}`);
  });

  // it('GET /posts', async () => {
  //   const response = await axios.get(`${BASE_URL}/posts`);
  //   const { status, statusText, data: posts } = response;

  //   assert.equal(status, 200, 'status is correct');
  //   assert.equal(statusText, 'OK', 'status test is correct');

  //   posts.forEach((post) => {
  //     assert.containsAllKeys(post, postKeys, 'all keys are present');
  //   });
  // });

  // it.only('POST /posts', async () => {
  //   const generatedPost = generateRandomPost(testUser.id);
  //   const { status } = await axios.post(`/posts`, generatedPost);
  //   assert.equal(status, 201);
  // });

  // TODO: parametrize

  describe.only('get posts by', () => {
    let genPost;
    before(async () => {
      const response = await axios.post('/posts', generateRandomPost(testUser.id));
      genPost = response.data;
    });

    postKeys.forEach((key) => {
      it(`GET /posts by ${key}`, async () => {
        const config = {
          params: {
            [key]: genPost[key],
          },
        };

        const response = await axios.get(`/posts`, config);
        const posts = response.data;
        //for fail
        //TBD: if no user test passes with empty array
        posts.forEach((post) => assert.equal(genPost[key], post[key]));
      });
    });
  });
});
