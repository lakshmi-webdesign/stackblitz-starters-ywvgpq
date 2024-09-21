let {
  getAllArticles,
  getAllComments,
  getArticleById,
  getCommentById,
  getUserById,
} = require('../article');
let http = require('http');
let request = require('supertest');
let { app } = require('../index');
let server;

jest.mock('../article.js', () => ({
  ...jest.mock('../article.js'),
  getAllArticles: jest.fn(),
  getAllComments: jest.fn(),
  getArticleById: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('/articles should return 404 when articles not found', async () => {
    const mockData = [];

    getAllArticles.mockReturnValue(mockData);
    let result = await request(server).get('/articles');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('No articles found');
  });

  test('/articles/:id should return 404 for non-existent article id', async () => {
    const mockData = null;

    getAllArticles.mockReturnValue(mockData);
    let result = await request(server).get('/articles/99');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('Article not found');
  });

  test('/comments should return 404 when comments not found', async () => {
    const mockData = [];

    getAllComments.mockReturnValue(mockData);
    let result = await request(server).get('/comments');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('No comments found');
  });

  test('/comments/:id should return 404 for non-existent comment id', async () => {
    const mockData = null;

    getAllComments.mockReturnValue(mockData);
    let result = await request(server).get('/comments/99');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('Comment not found');
  });

  test('/users/:id should return 404 for non-existent user id', async () => {
    const mockData = null;

    getUserById.mockReturnValue(mockData);
    let result = await request(server).get('/users/99');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('User not found');
  });
});
