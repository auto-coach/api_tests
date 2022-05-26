require('dotenv').config();
const axios = require('axios');
const { assert } = require('chai');

const { generateRandomTodoItem } = require('../helpers/dataHelpers');

const BASE_URL = 'https://gorest.co.in/public/v2';

const TOKEN = process.env.TOKEN;
const authConfig = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

describe.skip('TODOS Endpoint', () => {
  it('GET /todos', async () => {
    const props = ['id', 'user_id', 'title', 'due_on', 'status'];
    const response = await axios.get(`${BASE_URL}/todos`);
    const { status, statusText, data: todos } = response;

    assert.equal(status, 200, 'status is correct');
    assert.equal(statusText, 'OK', 'status test is correct');

    todos.forEach((todo) => {
      assert.containsAllKeys(todo, props, 'all keys are present');
    });
  });

  it('POST /todos', async () => {
    // TBD: where whould we get user id ?
    const generatedTodo = generateRandomTodoItem();
    const {
      status,
      statusText,
      data: returnedTodo,
    } = await axios.post(`${BASE_URL}/todos`, generatedTodo, authConfig).catch((e) => {
      console.log(Object.keys(e), '######');
      console.log(e.message);
      console.log(e.response.data);
    });
  });

  // TODO: parametrize
  it.skip('GET /todos by user_id', async () => {
    const userId = 9999; // is there a user with the id??
    const config = {
      ...authConfig,
      params: {
        user_id: userId,
      },
    };

    const response = await axios.get(`${BASE_URL}/todos`, config);
    const todos = response.data;
    console.log(todos, '####"'); // if no user test passes with empty array
    todos.forEach((todo) => {
      console.log(todo);
      assert.equal(todo.uset_id, userId);
    });
  });
});
