const req = require("express/lib/request");
let { app, validateGame, validateTournament } = require("../index")
let http = require("http");
let request = require("supertest");
const { title } = require("process");
let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
})

describe("api input validation", () => {
    test("/api/games should add new game with valid input", async () => {
        let result = await request(server).post("/api/games").send({
            title: 'The Legend of Zelda',
            genre: 'Adventure'
        });
        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            id: 1,
            title: 'The Legend of Zelda',
            genre: 'Adventure'
        });
    });

    test("/api/games should return 400 for invalid input", async () => {
        let result = await request(server).post("/api/games").send({
            genre: 'Adventure'
        });

        expect(result.status).toEqual(400);
        expect(result.text).toEqual("Title is required and should be string");
    });

    test("/api/tournaments should add new tournaments with valid input", async () => {
        let result = await request(server).post("/api/tournaments").send({
            name: 'Zelda Championship',
            gameId: 1
        });
        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            id: 1,
            name: 'Zelda Championship',
            gameId: 1
        });
    });

    test("/api/tournaments should return 400 for invalid input", async () => {
        let result = await request(server).post("/api/tournaments").send({
            gameId: 1
        });

        expect(result.status).toEqual(400);
        expect(result.text).toEqual("Name is required and should be string");
    });
});

describe("validation functions", () => {
    it("validate game input correctly", () => {
        expect(validateGame({
            title: 'The Legend of Zelda',
            genre: 'Adventure'
        })).toBeNull()

        expect(validateGame({
            title: 'The Legend of Zelda'
        })).toEqual("Genre is required and should be string");

        expect(validateGame({
            genre: 'Adventure'
        })).toEqual("Title is required and should be string");
    });

    it("validate tournament input correctly", () => {
        expect(validateTournament({
            name: 'Zelda Championship',
            gameId: 1
          })).toBeNull()

        expect(validateTournament({
            name: 'Zelda Championship'
        })).toEqual("GameId is required and should be string");

        expect(validateTournament({
            gameId: 1
        })).toEqual("Name is required and should be string");
    });
})