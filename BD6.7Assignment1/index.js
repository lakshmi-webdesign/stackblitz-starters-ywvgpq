const express = require("express");
let app = express();
app.use(express.json())
let { getAllShows, getShowById, addShow, validateShow } = require("./controller/index")

app.get("/shows", async (req, res) => {
    let result = await getAllShows();
    res.status(200).json({ shows: result })
});

app.get("/shows/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await getShowById(id);
    if (!result) return res.status(404).send("Show not found");
    res.status(200).json({ show: result });
});

app.post("/shows", async (req, res) => {
    let error = validateShow(req.body);
    if (error) return res.status(400).send(error);

    let result = await addShow(req.body);
    res.status(201).json(result);
});

module.exports = { app }