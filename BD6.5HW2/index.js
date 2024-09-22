const express = require("express");
let app = express();
app.use(express.json());

let employees = [];

function validateEmployee(data) {
    if (!data.name || typeof data.name !== "string") {
        return "Name is required and should be a string"
    }

    if (!data.companyId || typeof data.companyId !== "number") {
        return "CompanyId is required and should be number"
    }

    return null;
}

app.post("/api/employees", (req, res) => {
    let error = validateEmployee(req.body);
    if (error) return res.status(400).send(error);

    let employee = { id: employees.length + 1, ...req.body };
    employees.push(employee);
    res.status(201).json(employee);
});

module.exports = { app, validateEmployee };