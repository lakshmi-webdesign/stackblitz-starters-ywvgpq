let {
  app,
  getAllReviews,
  getReviewsById,
  addReview,
  getUserById,
  addUser,
} = require('../index.js');
let http = require('http');
let request = require('supertest');
let server;

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getAllReviews: jest.fn(),
  getReviewsById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('getAllReviews should return all Reviews', async () => {
    const mockData = [
      { id: 1, content: 'Great product!', userId: 1 },
      { id: 2, content: 'Not bad, could be better.', userId: 2 },
    ];

    getAllReviews.mockResolvedValue(mockData);
    let result = await request(server).get('/reviews');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getReviewsById should return review by id', async () => {
    const mockData = { id: 1, content: 'Great product!', userId: 1 };

    getReviewsById.mockResolvedValue(mockData);
    let result = await request(server).get('/reviews/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getReviewsById should return 404 for non-existing id', async () => {
    const mockData = null;

    getReviewsById.mockResolvedValue(mockData);
    let result = await request(server).get('/reviews/details/99');
    expect(result.statusCode).toEqual(404);
  });

  test('addReview should add new review', async () => {
    const mockData = { id: 3, content: 'Awesome!', userId: 1 };

    addReview.mockResolvedValue(mockData);
    let result = await request(server).post('/reviews/new').send({
      content: 'Awesome!',
      userId: 1,
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getUserById should return user by id', async () => {
    const mockData = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

    getUserById.mockResolvedValue(mockData);
    let result = await request(server).get('/users/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('addUser should add new user', async () => {
    const mockData = {
      id: 3,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
    };

    addUser.mockResolvedValue(mockData);
    let result = await request(server).post('/users/new').send({
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });
});
