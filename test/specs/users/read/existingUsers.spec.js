const { assert } = require('chai');
const User = require('../../../models/User');

describe('GET existing #regression', () => {
  before(async () => (this.seeds = await User.seed(5)));

  it('multiple users ', async () => {
    const { status, data: users } = await User.find();

    assert.equal(status, 200);
    users.forEach((user) => {
      assert.hasAllKeys(user, User.schema);
    });
  });

  User.schema.forEach((key) => {
    it(`users by ${key}`, async () => {
      const { status, data: users } = await User.findBy([key], this.seeds[0][key]);

      assert.equal(status, 200);
      users.forEach((user) => {
        assert.equal(this.seeds[0][key], user[key]);
      });
    });
  });

  after(async () => {});
});
