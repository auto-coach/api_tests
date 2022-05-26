const { assert } = require('chai');
const User = require('../../../models/User');

describe('POST #regression', () => {
  before(() => (this.user = User.create()));
  after(async () => {
    await this.savedUser.remove();
  });

  it('valid user', async () => {
    const { status: postStatus, data: user } = await this.user.save();
    this.savedUser = user;
    const saved = await User.findById(user.id);

    assert.equal(postStatus, 201);
    assert.equal(saved.status, 200);
    assert.deepEqual(saved.data, user);
  });
});
