const express = require('express');
let app = express();
let { getAllemployee, getEmployeeById } = require('./controller/index');

app.get("/employees", async (req, res) => {
    let result = await getAllemployee();
    res.status(200).json({ employees: result });
});

app.get("/employees/details/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await getEmployeeById(id);
    if (!result) {
        return res.status(404).send({ message: "Employee not found" })
    }
    res.status(200).json({ employee: result });
});

module.exports = { app };