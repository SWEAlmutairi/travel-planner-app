const app = require('../../server/index')
const supertest = require('supertest')
const request = supertest(app)

describe('Connect to server', () => {
  test('it sould respond with a success msg', async () => {
    const response = await supertest(app)
        .get('/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    expect(response.body.success).toEqual('true');
  });
});

