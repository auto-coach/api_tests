const { assert } = require('chai');
const User = require('../../../models/User');

describe('GET non-existing user', () => {
  beforeEach(async () => {
    this.seeds = await User.seed(1);
    await this.seeds[0].remove();
  });

  it('by id in path', async () => {
    const { status } = await User.findById(this.seeds[0].id);
    assert.equal(status, 404);
  });

  it('by id in query params', async () => {
    const { status, data } = await User.findBy('id', this.seeds[0].id);

    assert.equal(status, 200);
    assert.lengthOf(data, 0);
  });
});
