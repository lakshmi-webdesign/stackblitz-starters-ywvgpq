const express = require('express');
let app = express();
app.use(express.json());

let games = [
  {
    id: 1,
    title: 'The Legend of Zelda',
    genre: 'Adventure',
    developer: 'Nintendo',
  },
  {
    id: 2,
    title: 'Super Mario Bros',
    genre: 'Platformer',
    developer: 'Nintendo',
  },
];

let developers = [
  { id: 1, name: 'Nintendo', country: 'Japan' },
  { id: 1, name: 'PS5', country: 'USA' },
];

async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((obj) => obj.id === id);
}

async function addGame(data) {
  data.id = games.length + 1;
  games.push(data);
  return data;
}

async function getDevById(id) {
  return developers.find((obj) => obj.id === id);
}

async function addDev(data) {
  data.id = developers.length + 1;
  developers.push(data);
  return data;
}

app.get('/games', async (req, res) => {
  let result = await getAllGames();
  res.status(200).json(result);
});

app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getGameById(id);
  if (!result) {
    return res.status(404).send('game not found');
  }
  res.status(200).json(result);
});

app.post('/games/new', async (req, res) => {
  let data = req.body;
  let result = await addGame(data);
  res.status(200).json(result);
});

app.get('/developers/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getDevById(id);
  if (!result) {
    return res.status(404).json('developer not found');
  }
  res.status(200).json(result);
});

app.post('/developers/new', async (req, res) => {
  let data = req.body;
  let result = await addDev(data);
  res.status(200).json(result);
});

module.exports = { app, getAllGames, getGameById, addGame, getDevById, addDev };
