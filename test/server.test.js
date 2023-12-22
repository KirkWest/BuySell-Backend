const { app } = require('../src/server');
const { databaseConnect } = require('../src/database');
const request = require('supertest');

describe('Server root route exists and returns test successful', () => {
  test('Root route exists and returns status 200', async () => {
    const responseResult = await request(app).get('/');
    expect(responseResult.statusCode).toEqual(200);
  });

  test('Root route exists and returns test successful message', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({
      message: 'Testing connection'
    });
  });
});
