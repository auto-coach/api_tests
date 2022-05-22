const { faker } = require('@faker-js/faker');

module.exports = {
  generateUser,
};

function generateUser() {
  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    gender: faker.name.gender(true),
    status: 'inactive',
  };
}
