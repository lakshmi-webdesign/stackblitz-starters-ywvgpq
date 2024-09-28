let http = require('http');
let request = require('supertest');
let { app } = require("../index")
let { getAllemployee, getEmployeeById } = require("../controller/index");
let server;

jest.mock('../controller/index.js', () => ({
    ...jest.requireActual('../controller/index'),
    getAllemployee: jest.fn(),
    getEmployeeById: jest.fn()
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
    it("/employees should return all employeeData", async () => {
        const mockData = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
        ]

        getAllemployee.mockReturnValue(mockData)
        let result = await request(server).get("/employees");
        expect(result.status).toBe(200);
        expect(result.body.employees).toEqual(mockData);
    });

    it("/employees/details/:id should return employee by id", async () => {
        const mockData = {
            employeeId: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            departmentId: 1,
            roleId: 1,
        }

        getEmployeeById.mockReturnValue(mockData)
        let result = await request(server).get("/employees/details/1");
        expect(result.status).toBe(200);
        expect(result.body.employee).toEqual(mockData)
    });
});

describe("validate functions", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    it("getAllemployee should return all employee data", async () => {
        const mockData = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
        ];

        getAllemployee.mockReturnValue(mockData);
        let result = await getAllemployee();
        expect(result).toEqual(mockData)
    });
});