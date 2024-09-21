let express = require('express');
let app = express();
app.use(express.json());
let {
  getAllArticles,
  getAllComments,
  getArticleById,
  getCommentById,
  getUserById,
} = require('./article');

app.get('/articles', async (req, res) => {
  try {
    let result = await getAllArticles();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/articles/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getArticleById(id);
    if (!result) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/comments', async (req, res) => {
  try {
    let result = await getAllComments();
    if (result.length === 0) {
      return res.status(404).json({ error: 'No comments found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/comments/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getCommentById(id);
    if (!result) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
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
