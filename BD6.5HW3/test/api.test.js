let http = require("http");
let request = require("supertest");
let { app, validateArticle, validateAuthor } = require("../index")
let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done)
});

afterAll((done) => {
    server.close(done)
});

describe("api input validation", () => {
    it("/article should add new article", async () => {
        let result = await request(server).post("/article").send({
            title: 'Mastering Node.js',
            content: 'Node.js is a powerful tool for backend development...'
        });

        expect(result.status).toEqual(200)
        expect(result.body).toEqual({
            id: 3,
            title: 'Mastering Node.js',
            content: 'Node.js is a powerful tool for backend development...'
        })
    });
})