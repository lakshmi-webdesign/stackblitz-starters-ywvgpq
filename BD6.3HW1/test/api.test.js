let {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDevById,
  addDev,
} = require('../index');
let http = require('http');
let request = require('supertest');
let server;

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDevById: jest.fn(),
  addDev: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('getAllGames should return all games', async () => {
    const mockData = [
      {
        id: 1,
        title: 'The Legend of Zelda',
        genre: 'Adventure',
        developer: 'Nintendo',
      },
      {
        id: 2,
        title: 'Super Mario Bros',
        genre: 'Platformer',
        developer: 'Nintendo',
      },
    ];

    getAllGames.mockResolvedValue(mockData);
    let result = await request(server).get('/games');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getGameById should return game by id', async () => {
    const mockData = {
      id: 1,
      title: 'The Legend of Zelda',
      genre: 'Adventure',
      developer: 'Nintendo',
    };

    getGameById.mockResolvedValue(mockData);
    let result = await request(server).get('/games/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getGameById should null when game not found', async () => {
    const mockData = null;

    getGameById.mockResolvedValue(mockData);
    let result = await request(server).get('/games/details/99');
    expect(result.statusCode).toEqual(404);
  });

  test('addGame should add new game', async () => {
    const mockData = {
      id: 3,
      title: 'Half-Life',
      genre: 'FPS',
      developer: 'Valve',
    };

    addGame.mockResolvedValue(mockData);
    let result = await request(server).post('/games/new').send({
      title: 'Half-Life',
      genre: 'FPS',
      developer: 'Valve',
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getDevById should return dev by id', async () => {
    const mockData = { id: 1, name: 'Nintendo', country: 'Japan' };

    getDevById.mockResolvedValue(mockData);
    let result = await request(server).get('/developers/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getDevById should return dev by id', async () => {
    const mockData = null;

    getDevById.mockResolvedValue(mockData);
    let result = await request(server).get('/developers/details/99');
    expect(result.statusCode).toEqual(404);
  });

  test('addDev should add new developer', async () => {
    const mockData = { id: 3, name: 'Epic Games', country: 'USA' };

    addDev.mockResolvedValue(mockData);
    let result = await request(server).post('/developers/new').send({
      name: 'Epic Games',
      country: 'USA',
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });
});
