const express = require('express');
let app = express();
let { getAllGames, getGameById } = require('./controller/index')

app.get("/games", async (req, res) => {
    let result = await getAllGames();
    res.status(200).json({ games: result });
});

app.get("/games/details/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let result = await getGameById(id);
    if (!result) return res.status(400).send("Game not found");
    res.status(200).json({ game: result });
});

module.exports = { app }