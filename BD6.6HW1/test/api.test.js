let http = require("http");
let request = require("supertest");
let { app } = require('../index');
const { getAllMovies, getMovieById } = require('../controller/index')
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllMovies: jest.fn(),
    getMovieById: jest.fn()
}));

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
});

describe("api test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("/movies should return all movies data", async () => {
        const mockData = [
            {
                movieId: 1,
                title: 'Inception',
                genre: 'Sci-Fi',
                director: 'Christopher Nolan'
            },
            {
                movieId: 2,
                title: 'The Shawshank Redemption',
                genre: 'Drama',
                director: 'Frank Darabont'
            },
            {
                movieId: 3,
                title: 'The Godfather',
                genre: 'Crime',
                director: 'Francis Ford Coppola'
            }
        ];

        getAllMovies.mockReturnValue(mockData);
        let result = await request(server).get("/movies");
        expect(result.status).toBe(200);
        expect(result.body.movies).toEqual(mockData)
    });

    it("/movies/details/:id should return movie by id", async () => {
        const mockData = {
            movieId: 1,
            title: 'Inception',
            genre: 'Sci-Fi',
            director: 'Christopher Nolan'
        }

        getMovieById.mockReturnValue(mockData);
        let result = await request(server).get('/movies/details/1');
        expect(result.status).toBe(200);
        expect(result.body.movie).toEqual(mockData)
    })
});