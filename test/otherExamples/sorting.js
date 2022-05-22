const axios = require('axios');
const { assert } = require('chai');

describe.skip('sorting test', () => {
  it('should be sorted array', async () => {
    const response = await axios.get('https://fakestoreapi.com/products?sort=desc');
    const { data: products } = response;

    //products.sort((a, b) => a.id - b.id); // to fail test

    products.forEach((product, i, arr) => {
      if (i === 0) {
        return;
      }
      const previousProduct = arr[i - 1];
      assert.isBelow(product.id, previousProduct.id, 'Current id is less than previous one');
    });
  });
});
