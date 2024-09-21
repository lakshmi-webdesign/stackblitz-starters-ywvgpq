const express = require('express');
let app = express();
let {
  getAllGames,
  getGamesById,
  getAllGenres,
  getGenreById,
} = require('./game.js');
app.use(express.json());

app.get('/api/games', async (req, res) => {
  try {
    let result = await getAllGames();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No games found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/games/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getGamesById(id);
    if (!result) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    let result = await getAllGenres();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No genres found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/genres/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getGenreById(id);
    if (!result) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
