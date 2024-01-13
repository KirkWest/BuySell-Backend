const { app } = require('../src/server');
const request = require('supertest');

describe('Server root route exists and returns test successful', () => {
  test('Root route exists and returns status 200', async () => {
    const responseResult = await request(app).get('/');
    expect(responseResult.statusCode).toEqual(200);
  });

  test('Root route exists and returns test successful message', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({
      message: 'Testing the connection'
    });
  });
});

describe('POST to root route posts message in body', () => {
  test('POST request.body.message of "Post body test" returns received value of "Post body test"', async () => {
    const response = await request(app)
      .post("/")
      .send({ message: "Post body test" });

    expect(response.body).toEqual({ message: "Testing the connection" }); 
  });
});