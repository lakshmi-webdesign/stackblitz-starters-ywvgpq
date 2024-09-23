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
    it("/articles should add new article", async () => {
        let result = await request(server).post("/articles").send({
            title: 'Mastering Node.js',
            content: 'Node.js is a powerful tool for backend development...'
        });

        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            id: 3,
            title: 'Mastering Node.js',
            content: 'Node.js is a powerful tool for backend development...'
        })
    });

    it("/articles should validate input correctly", async () => {
        let result = await request(server).post("/articles").send({
            title: 'Mastering Node.js'
        });
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("Content is required and should be string")
    });

    it("/authors should add new author", async () => {
        let result = await request(server).post("/authors").send({
            name: 'Alice Johnson',
            articleId: 3
        });

        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            id: 3,
            name: 'Alice Johnson',
            articleId: 3
        });
    });

    it("/authors should validate input correctly", async () => {
        let result = await request(server).post("/authors").send({
            articleId: 3
        });
        expect(result.status).toEqual(400);
        expect(result.text).toEqual("Name is required and should be string")
    });
});

describe("validating functions", () => {
    it("validateArticle should validate input correctly", () => {
        expect(validateArticle({
            title: 'Mastering Node.js',
            content: 'Node.js is a powerful tool for backend development...'
        })).toBeNull();

        expect(validateArticle({
            title: 'Mastering Node.js'
        })).toEqual("Content is required and should be string");

        expect(validateArticle({
            content: 'Node.js is a powerful tool for backend development...'
        })).toEqual("Title is required and should be string")
    });

    it("validateAuthor should validate input correctly", () => {
        expect(validateAuthor({
            name: 'Alice Johnson',
            articleId: 3
        })).toBeNull();

        expect(validateAuthor({
            name: 'Alice Johnson'
        })).toEqual("ArticleId is required and should be number");

        expect(validateAuthor({
            articleId: 3
        })).toEqual("Name is required and should be string");
    });
})