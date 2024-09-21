let { app, getEmployee, getEmployeeById, addEmployee } = require('../index');
let http = require('http');
let request = require('supertest');
let server;

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getEmployee: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe('api tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('getEmployee should return all employees', async () => {
    const mockData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'Marketing',
      },
    ];

    getEmployee.mockResolvedValue(mockData);
    let result = await request(server).get('/employees');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getEmployeeById should return employee by id', async () => {
    const mockData = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
    };

    getEmployeeById.mockResolvedValue(mockData);
    let result = await request(server).get('/employees/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });

  test('getEmployeeById should null when employee doesnt exist', async () => {
    const mockData = null;

    getEmployeeById.mockResolvedValue(mockData);
    let result = await request(server).get('/employees/details/99');
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({});
  });

  test('addEmployee should add new employee', async () => {
    const mockData = {
      id: 3,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      department: 'Sales',
    };

    addEmployee.mockResolvedValue(mockData);
    let result = await request(server).post('/employees/new').send({
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      department: 'Sales',
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockData);
  });
});
