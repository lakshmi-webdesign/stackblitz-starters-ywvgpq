let http = require('http');
let request = require('supertest');
let { app, validateUser, validateBook, validateReview } = require('../index');
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api input validation tests', () => {
  it('/api/users should add new user with valid input', async () => {
    let result = await request(server).post("/api/users").send({
      name: 'Alice',
      email: 'alice@example.com'
    });

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com'
    })
  });

  it("/api/users should return 401 from invalid user input", async () => {
    let result = await request(server).post("/api/users").send({ name: 'Alice' });

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Email is required and should be string");
  });

  it("/api/books should add new book with valid input", async () => {
    let result = await request(server).post("/api/books").send({
      title: "Moby Dick",
      author: "Herman Melville"
    });

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      title: 'Moby Dick',
      author: 'Herman Melville'
    });
  });

  it("/api/books should return 400 from invalid book input ", async () => {
    let result = await request(server).post("/api/books").send({
      author: 'Herman Melville'
    });

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Title is required and should be string")
  });

  it("/api/reviews should add new review with valid input", async () => {
    let result = await request(server).post("/api/reviews").send({
      content: "Great book!",
      userId: 1
    });

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      id: 1,
      content: "Great book!",
      userId: 1
    });
  });

  it("/api/reviews should return 400 with invalid input", async () => {
    let result = await request(server).post("/api/reviews").send({
      userId: 1
    });

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Content is required and should be string")
  });
});

describe("validation functions", () => {
  it("validate user input correctly", () => {
    expect(validateUser({
      name: 'Alice',
      email: 'alice@example.com'
    })).toBeNull();

    expect(validateUser({
      name: 'Alice'
    })).toEqual("Email is required and should be string");

    expect(validateUser({
      email: 'alice@example.com'
    })).toEqual("Name is required and should be string");
  });

  it("validate book input correctly", () => {
    expect(validateBook({
      title: "Moby Dick",
      author: "Herman Melville"
    })).toBeNull();

    expect(validateBook({
      title: "Moby Dick"
    })).toEqual("Author is required and should be string");

    expect(validateBook({
      author: "Herman Melville"
    })).toEqual("Title is required and should be string");
  });

  it("validate review input correctly", () => {
    expect(validateReview({
      content: "Great book!",
      userId: 1
    })).toBeNull();

    expect(validateReview({
      content: "Great book!"
    })).toEqual("UserId is required and should be number");

    expect(validateReview({
      userId: 1
    })).toEqual("Content is required and should be string")
  });
});
