let http = require("http");
let request = require("supertest");
let { app } = require("../index")
const { getAllStocks, getStockByTicker, addTrade } = require('../controller/index')
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllStocks: jest.fn(),
    getStockByTicker: jest.fn(),
    addTrade: jest.fn()
}));

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
});

describe("api tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("/stocks should return all stocks", async () => {
        const mockData = [
            { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
            { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.10 },
            { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.50 },
        ];
        getAllStocks.mockReturnValue(mockData)
        let result = await request(server).get('/stocks');
        expect(result.status).toEqual(200);
        expect(result.body.stocks).toEqual(mockData)
    });

    it("/stocks/:ticker should return stock by ticker", async () => {
        const mockData = { stockId: 4, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 };

        getStockByTicker.mockReturnValue(mockData);
        let result = await request(server).get('/stocks/AAPL');
        expect(result.status).toEqual(200);
        expect(result.body.stock).toEqual(mockData)
    });

    it("/stocks/:ticker should return 404 for non existent ticker", async () => {
        const mockData = null;

        getStockByTicker.mockReturnValue(mockData);
        let result = await request(server).get('/stocks/IIIPL');
        expect(result.status).toEqual(404);
        expect(result.text).toEqual("Stock not found with ticker IIIPL")
    });

    it("/trades/new should add new trade", async () => {
        const mockData = {
            tradeId: 4,
            stockId: 1,
            quantity: 15,
            tradeType: 'buy',
            tradeDate: '2024-08-08'
        }

        addTrade.mockReturnValue(mockData);
        let result = await request(server).post("/trades/new/").send({
            stockId: 1,
            quantity: 15,
            tradeType: 'buy',
            tradeDate: '2024-08-08'
        });
        expect(result.status).toEqual(201);
        expect(result.body.trade).toEqual(mockData)
    });

    it("/trades/new should return 400 with validation error", async () => {
        const mockData = {
            quantity: 15,
            tradeType: 'buy',
            tradeDate: '2024-08-08'
        }

        let result = await request(server).post("/trades/new").send(mockData);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("StockId is required and should be number");
    });
});

describe("validation function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("getAllStocks should return all stocks", async () => {
        const mockData = [
            { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
            { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.10 },
            { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.50 },
        ];
        getAllStocks.mockReturnValue(mockData)

        let result = await getAllStocks();
        expect(result).toEqual(mockData);
        expect(result.length).toBe(3)
    });

    it("addTrade should add trade data", async () => {
        const mockData = {
            tradeId: 4,
            stockId: 1,
            quantity: 15,
            tradeType: 'buy',
            tradeDate: '2024-08-08'
        }

        addTrade.mockReturnValue(mockData);
        let result = await addTrade({
            stockId: 1,
            quantity: 15,
            tradeType: 'buy',
            tradeDate: '2024-08-08'
        });
        expect(result).toEqual(mockData);
    })
})