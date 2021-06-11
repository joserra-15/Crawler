const { app } = require('../server');
const { server } = require('..');
const supertest = require('supertest');
const cache = require('../services/cache');
const request = supertest(app);

const numberNewsPage = 30;

describe('Testing functionality request', () => {
  afterEach(() => server.close());

  test('should return a array with 30 objects when request 1 page', async () => {
    const res = await request.get('/').set('Accept', 'application/json');
    expect(res.body.length).toBe(numberNewsPage);
  });

  test('should return a array with 30*5 objects when request 5 page', async () => {
    const res = await request.get('/5').set('Accept', 'application/json');
    expect(res.body.length).toBe(numberNewsPage * 5);
  });
});
