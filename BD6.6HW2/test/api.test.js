let http = require("http");
let request = require("supertest");
let { app } = require('../index');
const { getAllGames, getGameById } = require('../controller/index')
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllGames: jest.fn(),
    getGameById: jest.fn()
}));

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
});

describe("api tests", () => {
    it("/games should return all games data", async () => {
        const mockData = [
            {
                gameId: 1,
                title: 'The Legend of Zelda: Breath of the Wild',
                genre: 'Adventure',
                platform: 'Nintendo Switch'
            },
            {
                gameId: 2,
                title: 'Red Dead Redemption 2',
                genre: 'Action',
                platform: 'PlayStation 4'
            },
            {
                gameId: 3,
                title: 'The Witcher 3: Wild Hunt',
                genre: 'RPG',
                platform: 'PC'
            }
        ];

        getAllGames.mockReturnValue(mockData);
        let result = await request(server).get("/games");
        expect(result.status).toBe(200);
        expect(result.body.games).toEqual(mockData)
    });

    it("/games/details/:id should return game by id", async () => {
        const mockData = {
            gameId: 1,
            title: 'The Legend of Zelda: Breath of the Wild',
            genre: 'Adventure',
            platform: 'Nintendo Switch'
        }

        getGameById.mockReturnValue(mockData);
        let result = await request(server).get('/games/details/1');
        expect(result.status).toBe(200);
        expect(result.body.game).toEqual(mockData)
    })
});

describe("validate functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getAllGames should return all games', () => {
        const mockData = [
            {
                gameId: 1,
                title: 'The Legend of Zelda: Breath of the Wild',
                genre: 'Adventure',
                platform: 'Nintendo Switch'
            },
            {
                gameId: 2,
                title: 'Red Dead Redemption 2',
                genre: 'Action',
                platform: 'PlayStation 4'
            },
            {
                gameId: 3,
                title: 'The Witcher 3: Wild Hunt',
                genre: 'RPG',
                platform: 'PC'
            }
        ];

        let result = getAllGames();
        expect(result).toEqual(mockData);
        expect(result.length).toBe(3)
    })
})