const express = require("express");
let app = express();
app.use(express.json());

let employees = [];

let companies = [];

function validateEmployee(data) {
    if (!data.name || typeof data.name !== "string") {
        return "Name is required and should be a string"
    }

    if (!data.companyId || typeof data.companyId !== "number") {
        return "CompanyId is required and should be number"
    }

    return null;
}

function validateCompany(data) {
    if (!data.name || typeof data.name !== "string") {
        return "Name is required and should be a string"
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

app.post("/api/companies", (req, res) => {
    let error = validateCompany(req.body);
    if (error) return res.status(400).send(error);

    let company = { id: companies.length + 1, ...req.body };
    companies.push(company);
    res.status(201).json(company)
})

module.exports = { app, validateEmployee, validateCompany };