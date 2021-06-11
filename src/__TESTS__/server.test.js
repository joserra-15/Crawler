const axios = require('axios');

describe('Testing functionality request', () => {
  test('should return a array with 30 objects when request 1 page', async () => {
    const { data } = await axios.get('http://localhost:4000/');
    expect(data.length).toBe(30);
  });
});
