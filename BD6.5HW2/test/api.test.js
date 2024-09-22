let { app, validateEmployee } = require("../index");
let http = require("http");
let request = require("supertest");
let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done)
});

afterAll((done) => {
    server.close(done)
});

describe("api input validation", () => {
    it("/api/employees should add new employee", async () => {
        let result = await request(server).post('/api/employees').send({
            name: 'John Doe',
            companyId: 1
        });

        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            id: 1,
            name: 'John Doe',
            companyId: 1
        })
    })
})