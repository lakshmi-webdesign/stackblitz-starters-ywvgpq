let express = require('express');
let app = express();
app.use(express.json());

let employees = [
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

async function getEmployee() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((obj) => obj.id === id);
}

async function addEmployee(data) {
  data.id = employees.length + 1;
  employees.push(data);
  return data;
}

app.get('/employees', async (req, res) => {
  let result = await getEmployee();
  res.status(200).json(result);
});

app.get('/employees/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getEmployeeById(id);
  if (!result) {
    return res.status(404).send(null);
  }
  res.status(200).json(result);
});

app.post('/employees/new', async (req, res) => {
  let data = req.body;
  let result = await addEmployee(data);
  res.status(200).json(result);
});

module.exports = { app, getEmployee, getEmployeeById, addEmployee };
