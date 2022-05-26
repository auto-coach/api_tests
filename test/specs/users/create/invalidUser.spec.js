const { assert } = require('chai');
const User = require('../../../models/User');

describe('POST', () => {
  describe('invalid user #regression', () => {
    Object.keys(User.create()).forEach((key) => {
      it(`with missing ${key}`, async () => {
        const user = createUserWithoutKey(key);
        const { status, data } = await user.save();
        assert.equal(status, 422);
        assert.deepEqual(data[0], { field: key, message: "can't be blank" });
      });
    });
  });
});

function createUserWithoutKey(key) {
  const user = User.create();
  delete user[key];
  return user;
}
