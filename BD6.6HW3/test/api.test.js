let http = require("http");
let request = require("supertest");
let { app } = require('../index');
const { getAllBooks, getBookById } = require('../controller/index')
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllBooks: jest.fn(),
    getBookById: jest.fn()
}));

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
});

describe("api tests", () => {
    it("/books should return all books data", async () => {
        const mockData = [
            {
                bookId: 1,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                genre: 'Fiction'
            },
            {
                bookId: 2,
                title: '1984',
                author: 'George Orwell',
                genre: 'Dystopian'
            },
            {
                bookId: 3,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                genre: 'Classic'
            }
        ];

        getAllBooks.mockReturnValue(mockData);
        let result = await request(server).get("/books");
        expect(result.status).toBe(200);
        expect(result.body.books).toEqual(mockData)
    });

    it("/books/details/:id should return book by id", async () => {
        const mockData = {
            bookId: 1,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            genre: 'Fiction'
        }

        getBookById.mockReturnValue(mockData);
        let result = await request(server).get('/books/details/1');
        expect(result.status).toBe(200);
        expect(result.body.book).toEqual(mockData)
    })
});

describe("validate functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getAllBooks should return all books', () => {
        const mockData = [
            {
                bookId: 1,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                genre: 'Fiction'
            },
            {
                bookId: 2,
                title: '1984',
                author: 'George Orwell',
                genre: 'Dystopian'
            },
            {
                bookId: 3,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                genre: 'Classic'
            }
        ];

        let result = getAllBooks();
        expect(result).toEqual(mockData);
        expect(result.length).toBe(3)
    })
})