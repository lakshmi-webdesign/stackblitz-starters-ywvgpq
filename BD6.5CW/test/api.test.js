let http = require('http');
let request = require('supertest');
let { app } = require('../index');
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api input validation tests', () => {
  it('');
});
