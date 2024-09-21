const express = require("express");
let app = express();
app.use(express.json());

let games = [];

function validateGame(data) {
    if (!data.title || typeof data.title !== string) {
        return "Title is required and should be string"
    }

    if (!data.genre || typeof data.genre !== string) {
        return "Genre is required and should be string"
    }

    return null;
}

function validateTournament(data) {
    if (!data.name || typeof data.name !== "string") {
        return "Tournamnet is required and should be string"
    }

    if (!data.gameId || typeof data.gameId !== "NUMBER") {
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