let employees = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', departmentId: 1 },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    departmentId: 2,
  },
];

let departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' },
];

async function getAllEmployees() {
  return employees;
}

async function getAllDepartments() {
  return departments;
}

async function getEmployeeId(id) {
  return employees.find((obj) => obj.id === id);
}

async function getDeptById(id) {
  return departments.find((obj) => obj.id === id);
}

module.exports = {
  getAllEmployees,
  getEmployeeId,
  getAllDepartments,
  getDeptById,
};
