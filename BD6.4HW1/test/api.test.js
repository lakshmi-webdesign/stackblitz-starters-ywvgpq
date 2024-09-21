let { app } = require('../index');
let {
  getAllEmployees,
  getEmployeeId,
  getAllDepartments,
  getDeptById,
} = require('../employee.js');
let http = require('http');
let request = require('supertest');
let server;

jest.mock('../employee.js', () => ({
  ...jest.requireActual('../employee.js'),
  getAllEmployees: jest.fn(),
  getEmployeeId: jest.fn(),
  getAllDepartments: jest.fn(),
  getDeptById: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api error tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('/api/employees should return status 404 when no employees are found', async () => {
    const mockData = [];
    getAllEmployees.mockReturnValue(mockData);

    let result = await request(server).get('/api/employees');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('No employees found');
  });

  test('/api/employees/:id should return status 404 when employee is not found', async () => {
    const mockData = null;
    getEmployeeId.mockReturnValue(mockData);

    let result = await request(server).get('/api/employees/44');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('Employee not found');
  });

  test('api/departments should return status 404 when no departments are found', async () => {
    const mockData = [];
    getAllDepartments.mockReturnValue(mockData);

    let result = await request(server).get('/api/departments');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('No departments found');
  });

  test('/api/departments/:id should return status 404 when department is not found', async () => {
    const mockData = null;
    getDeptById.mockReturnValue(mockData);

    let result = await request(server).get('/api/departments/77');
    expect(result.statusCode).toEqual(404);
    expect(result.body.error).toBe('Department not found');
  });
});
