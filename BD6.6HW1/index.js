const express = require('express');
let app = express();
let { getAllMovies, getMovieById } = require('./controller/index')

app.get("/movies", async (req, res) => {
    let result = await getAllMovies();
    res.status(200).json({ movies: result });
});

app.get("/movies/details/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let result = await getMovieById(id);
    if (!result) return res.status(400).send("Movie not found");
    res.status(200).json({ movie: result });
});

module.exports = { app }