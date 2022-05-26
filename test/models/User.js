const { generateRandomUser } = require('../helpers/dataHelpers');
const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor(data = generateRandomUser()) {
    super();
    Object.keys(data).forEach((key) => (this[key] = data[key]));
  }

  static path = '/users';
  static postsPath = '/posts';
  static schema = ['id', 'name', 'email', 'gender', 'status'];

  static async seed(quantity = 5) {
    return super.seed(quantity, generateRandomUser);
  }

  // hw
  // async getPosts () {

  // }

  // async getTotos () {

  // }
}

module.exports = User;
