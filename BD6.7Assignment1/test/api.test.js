let http = require("http");
let request = require("supertest");
let { app } = require('../index');
const { getAllShows, getShowById, validateShow } = require('../controller/index')
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllShows: jest.fn(),
    getShowById: jest.fn(),
    validateShow: jest.fn()
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
    it("/shows should retun all shows data", async () => {
        const mockData = [
            { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
            { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
            { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
            { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' },
        ];
        getAllShows.mockReturnValue(mockData);
        let result = await request(server).get("/shows");
        expect(result.status).toBe(200);
        expect(result.body.shows).toEqual(mockData)
    });

    it("/shows/:id should retun show by id", async () => {
        const mockData = { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' };

        getShowById.mockReturnValue(mockData);
        let result = await request(server).get("/shows/1");
        expect(result.status).toBe(200);
        expect(result.body.show).toEqual(mockData)
    });

});