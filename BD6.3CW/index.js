const express = require('express');
let app = express();
app.use(express.json());

let reviews = [
  { id: 1, content: 'Great product!', userId: 1 },
  { id: 2, content: 'Not bad, could be better.', userId: 2 },
];

let user = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
];

async function getAllReviews() {
  return reviews;
}

async function getReviewsById(id) {
  return reviews.find((obj) => obj.id === id);
}

async function addReview(data) {
  data.id = reviews.length + 1;
  reviews.push(data);
  return data;
}

async function getUserById(id) {
  return user.find((obj) => obj.id === id);
}

async function addUser(data) {
  data.id = user.length + 1;
  user.push(data);
  return data;
}

app.get('/reviews', async (req, res) => {
  let result = await getAllReviews();
  res.status(200).json(result);
});

app.get('/reviews/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getReviewsById(id);
  if (!result) {
    return res.status(404).send('no review found');
  }
  res.status(200).json(result);
});

app.post('/reviews/new', async (req, res) => {
  let data = req.body;
  let result = await addReview(data);
  res.status(200).json(result);
});

app.get('/users/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getUserById(id);
  if (!result) {
    return res.status(404).send('user not found');
  }
  res.status(200).json(result);
});

app.post('/users/new', async (req, res) => {
  let data = req.body;
  let result = await addUser(data);
  res.status(200).json(result);
});

module.exports = {
  app,
  getAllReviews,
  getReviewsById,
  addReview,
  getUserById,
  addUser,
};
