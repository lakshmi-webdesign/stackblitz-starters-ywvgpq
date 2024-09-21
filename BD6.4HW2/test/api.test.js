let {
  getAllGames,
  getGamesById,
  getAllGenres,
  getGenreById,
} = require('../game.js');
let http = require('http');
let request = require('supertest');
let { app } = require('../index.js');
let server;

jest.mock('../game.js', () => ({
  ...jest.requireActual('../game.js'),
  getAllGames: jest.fn(),
  getGamesById: jest.fn(),
  getAllGenres: jest.fn(),
  getGenreById: jest.fn(),
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

  test('/api/games should return 404 when games are not found', async () => {
    const mockData = [];

    getAllGames.mockReturnValue(mockData);
    let result = await request(server).get('/api/games');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('No games found');
  });

  test('/api/games/:id should return 404 for non-existent game id', async () => {
    const mockData = null;

    getGamesById.mockReturnValue(mockData);
    let result = await request(server).get('/api/games/99');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('Game not found');
  });

  test('/api/genres should return 404 when genres are not found', async () => {
    const mockData = [];

    getAllGenres.mockReturnValue(mockData);
    let result = await request(server).get('/api/genres');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('No genres found');
  });

  test('/api/genres/:id should return 404 for non-existent genre id', async () => {
    const mockData = null;

    getGenreById.mockReturnValue(mockData);
    let result = await request(server).get('/api/genres/99');
    expect(result.status).toEqual(404);
    expect(result.body.error).toBe('Genre not found');
  });
});
