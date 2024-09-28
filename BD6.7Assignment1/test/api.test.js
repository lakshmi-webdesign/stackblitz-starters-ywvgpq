let http = require("http");
let request = require("supertest");
let { app } = require("../index")
const { getAllShows, getShowById, addShow } = require('../controller/index')
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllShows: jest.fn(),
    getShowById: jest.fn(),
    addShow: jest.fn()
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

    it('/shows/:id should return 404 when show not found', async () => {
        const mockData = null;
        getShowById.mockReturnValue(mockData);
        let result = await request(server).get("/shows/77");

        expect(result.status).toEqual(404);
        expect(result.text).toEqual("Show not found");
    })

    it("/shows should add new show", async () => {
        const mockData = {
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        }
        addShow.mockReturnValue({
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        });
        let result = await request(server).post("/shows").send(mockData);
        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        });
    });

    it("/shows should return 400 with correct validation message", async () => {
        const mockData = {
            theatreId: 2,
            time: '5:00 PM'
        }

        let result = await request(server).post('/shows').send(mockData);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("Title is required and should be string");
    });
});

describe("validation functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("getAllShows should validate data", async () => {
        const mockData = [
            { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
            { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
            { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
            { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' },
        ];

        getAllShows.mockResolvedValue(mockData);
        let result = await getAllShows();
        expect(result).toEqual(mockData);
    });

    it("addShow should add data properly", async () => {
        const mockData = {
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        }
        addShow.mockReturnValue({
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        });

        let result = await addShow(mockData);
        expect(result).toEqual({
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        });
    });
})