let { app, validateEmployee, validateCompany } = require("../index");
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
    });

    it("/api/employees should return 400 for invalid input", async () => {
        let result = await request(server).post("/api/employees").send({
            name: 'John Doe'
        });

        expect(result.status).toEqual(400);
        expect(result.text).toEqual("CompanyId is required and should be number");
    });

    it("/api/companies should validate input correctly", async () => {
        let result = await request(server).post("/api/companies").send({
            name: 'TechCorp'
        });

        expect(result.status).toEqual(201);
        expect(result.body).toEqual({
            id: 1,
            name: 'TechCorp'
        });
    })

    it("/api/companies should return 400 for invlid input", async () => {
        let result = await request(server).post("/api/companies").send({});

        expect(result.status).toEqual(400);
        expect(result.text).toEqual("Name is required and should be a string")
    })
})

describe("validation functions", () => {
    it("validateEmployee should validate input correctly", () => {
        expect(validateEmployee({
            name: 'John Doe',
            companyId: 1
        })).toBeNull();

        expect(validateEmployee({
            companyId: 1
        })).toEqual("Name is required and should be a string");

        expect(validateEmployee({
            name: 'John Doe'
        })).toEqual("CompanyId is required and should be number")
    })

    it("validateCompany should validate input correctly", () => {
        expect(validateCompany({
            name: 'TechCorp'
        })).toBeNull();

        expect(validateCompany({})).toEqual("Name is required and should be a string")
    })
})