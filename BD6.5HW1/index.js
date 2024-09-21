const express = require("express");
let app = express();
app.use(express.json());

let games = [];

let tournamnets = [];

function validateGame(data) {
    if (!data.title || typeof data.title !== "string") {
        return "Title is required and should be string"
    }

    if (!data.genre || typeof data.genre !== "string") {
        return "Genre is required and should be string"
    }

    return null;
}

function validateTournament(data) {
    if (!data.name || typeof data.name !== "string") {
        return "Tournamnet is required and should be string"
    }

    if (!data.gameId || typeof data.gameId !== "number") {
        return "GameId is required and should be string"
    }

    return null;
}

app.post("/api/games", (req, res) => {
    let error = validateGame(req.body);
    if (error) return res.status(400).send(error);

    let game = { id: games.length + 1, ...req.body };
    games.push(game);
    res.status(201).json(game);
});

app.post("/api/tournaments", (req, res) => {
    let error = validateTournament(req.body);
    if (error) return res.status(400).send(error);

    let tournamnet = { id: tournamnets.length + 1, ...req.body };
    tournamnets.push(tournamnet);
    res.status(201).json(tournamnet);
});

module.exports = { app, validateGame, validateTournament }