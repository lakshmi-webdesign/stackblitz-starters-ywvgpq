const express = require('express');
let app = express();
app.use(express.json());

let {
  getAllEmployees,
  getEmployeeId,
  getAllDepartments,
  getDeptById,
} = require('./employee');

app.get('/api/employees', async (req, res) => {
  try {
    let result = await getAllEmployees();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getEmployeeId(id);
    if (!result) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    let result = await getAllDepartments();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No departments found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getDeptById(id);
    if (!result) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
