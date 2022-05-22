const { faker } = require('@faker-js/faker');
const { getRandomArrayElement, getRandomInt } = require('./utils');

module.exports = {
  generateRandomUser,
  generateRandomPost,
  generateRandomTodoItem,
  generateRandomComment,
};

// generate random user data
function generateRandomUser() {
  const userStatusesAvailable = ['active', 'inactive'];
  const gender = faker.name.gender(true);
  const name = faker.name.findName(null, null, gender);
  const [firstName, lastName] = name.split(' ');
  const email = faker.internet.email(firstName, lastName);

  return {
    name,
    email,
    gender: gender.toLowerCase(),
    status: getRandomArrayElement(userStatusesAvailable),
  };
}

//genetate post with random text of random length
function generateRandomPost(userId) {
  const titleLength = getRandomInt(1, 5);
  const bodyLength = getRandomInt(10, 20);

  return {
    user_id: userId,
    title: faker.random.words(titleLength),
    body: faker.random.words(bodyLength),
  };
}

//generate random todo item
function generateRandomTodoItem(userId) {
  const titleLength = getRandomInt(1, 5);
  const statuses = ['completed', 'pending'];

  return {
    user_id: userId,
    title: faker.random.words(titleLength),
    status: getRandomArrayElement(statuses),
    due_on: faker.date.soon(),
  };
}

//generate random post comment
function generateRandomComment(postId) {
  const name = faker.name.findName();
  const [firstName, lastName] = name.split(' ');
  const email = faker.internet.email(firstName, lastName);
  const bodyLength = getRandomInt(10, 20);
  return {
    name,
    email,
    post_id: postId,
    body: faker.random.words(bodyLength),
  };
}
