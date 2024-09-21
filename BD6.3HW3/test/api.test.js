let { app, getRecipes, getRecipesById, addRecipe } = require('../index.js');
let http = require('http');
let request = require('supertest');
let server;

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getRecipes: jest.fn(),
  getRecipesById: jest.fn(),
  addRecipe: jest.fn(),
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
  test('getRecipes should return all recipes', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Spaghetti Bolognese',
        cuisine: 'Italian',
        difficulty: 'Medium',
      },
      {
        id: 2,
        name: 'Chicken Tikka Masala',
        cuisine: 'Indian',
        difficulty: 'Hard',
      },
    ];

    getRecipes.mockResolvedValue(mockData);
    let result = await request(server).get('/recipes');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getRecipesById should return recipe by id', async () => {
    const mockData = {
      id: 1,
      name: 'Spaghetti Bolognese',
      cuisine: 'Italian',
      difficulty: 'Medium',
    };

    getRecipesById.mockResolvedValue(mockData);
    let result = await request(server).get('/recipes/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getRecipesById should return null when recipe doesnt exist', async () => {
    const mockData = null;

    getRecipesById.mockResolvedValue(mockData);
    let result = await request(server).get('/recipes/details/99');
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({});
  });

  test('addRecipe should add new recipe', async () => {
    const mockData = {
      id: 3,
      name: 'Sushi',
      cuisine: 'Japanese',
      difficulty: 'Hard',
    };

    addRecipe.mockResolvedValue(mockData);
    let result = await request(server).post('/recipes/new').send({
      name: 'Sushi',
      cuisine: 'Japanese',
      difficulty: 'Hard',
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });
});
