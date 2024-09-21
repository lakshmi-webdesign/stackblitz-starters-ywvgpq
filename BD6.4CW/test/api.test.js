let { app } = require('../index');
let {
  getAllBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require('../book.js');
let http = require('http');
let request = require('supertest');
let server;

jest.mock('../book.js', () => ({
  ...jest.requireActual('../book.js'),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
  getUserById: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api error tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('/api/book should return status 404 when no books are found', async () => {
    const mockData = [];
    getAllBooks.mockReturnValue(mockData);

    let result = await request(server).get('/api/books');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('No books found');
  });

  test('/api/books/:id should return 404 when book is not found', async () => {
    const mockData = null;
    getBookById.mockReturnValue(mockData);

    let result = await request(server).get('/api/books/99');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('Book not found');
  });

  test('/api/review should return status 404 when no reviews are found', async () => {
    const mockData = [];
    getReviews.mockReturnValue(mockData);

    let result = await request(server).get('/api/reviews');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('No review found');
  });

  test('/api/review/:id should return 404 when review is not found', async () => {
    const mockData = null;
    getReviewById.mockReturnValue(mockData);

    let result = await request(server).get('/api/reviews/88');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('Review not found');
  });

  test('/api/users/:id should return 404 when user is not found', async () => {
    const mockData = null;
    getUserById.mockReturnValue(mockData);

    let result = await request(server).get('/api/users/99');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('User not found');
  });
});
