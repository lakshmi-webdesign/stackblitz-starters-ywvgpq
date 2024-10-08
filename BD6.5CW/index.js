const express = require('express');
let app = express();
app.use(express.json());
let users = [];

let books = [];

let reviews = [];

function validateBook(data) {
  if (!data.title || typeof data.title !== 'string') {
    return 'Title is required and should be string';
  }

  if (!data.author || typeof data.author !== 'string') {
    return 'Author is required and should be string';
  }

  return null;
}

function validateReview(data) {
  if (!data.content || typeof data.content !== 'string') {
    return 'Content is required and should be string';
  }

  if (!data.userId || typeof data.userId !== 'number') {
    return 'UserId is required and should be number';
  }

  return null;
}

function validateUser(data) {
  if (!data.name || typeof data.name !== 'string') {
    return 'Name is required and should be string';
  }

  if (!data.email || typeof data.email !== 'string') {
    return 'Email is required and should be string';
  }

  return null;
}

app.post('/api/users', (req, res) => {
  let error = validateUser(req.body);
  if (error) return res.status(400).send(error);

  let user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.post('/api/books', (req, res) => {
  let error = validateBook(req.body);
  if (error) return res.status(400).send(error);

  let book = { id: books.length + 1, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

app.post('/api/reviews', (req, res) => {
  let error = validateReview(req.body);
  if (error) return res.status(400).send(error);

  let review = { id: reviews.length + 1, ...req.body };
  reviews.push(review);
  res.status(201).json(review);
});

module.exports = { app, validateUser, validateBook, validateReview };
