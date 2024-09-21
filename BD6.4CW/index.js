const express = require('express');
let app = express();
app.use(express.json());
let {
  getAllBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require('./book.js');

app.get('/api/books', async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getBookById(id);
    if (!result) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    let result = await getReviews();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No review found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getReviewById(id);
    if (!result) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getUserById(id);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
