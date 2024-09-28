const express = require("express");
let app = express();
let { getAllShows, getShowById, addShow, validateShow } = require("./controller/index")

app.get("/shows", async (req, res) => {
    let result = await getAllShows();
    res.status(200).json({ shows: result })
});

app.get("/shows/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await getShowById(id);
    if (!result) return res.status(400).send("Show not found");
    res.status(200).json({ show: result });
});

app.post("/shows", async (req, res) => {
    let data = req.body;
    let error = validateShow(data);
    if (error) return res.status(400).send(error);

    let result = await addShow(data);
    res.status(200).json(result)
});

module.exports = { app }