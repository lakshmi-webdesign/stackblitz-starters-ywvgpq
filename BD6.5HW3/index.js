const express = require("express");
let app = express();
app.use(express.json());

let articles = [
    {
        id: 1,
        title: 'Understanding JavaScript',
        content: 'JavaScript is a versatile language used for both frontend and backend development.'
    },
    {
        id: 2,
        title: 'Introduction to React',
        content: 'React is a popular JavaScript library for building user interfaces.'
    }
];

let authors = [
    {
        id: 1,
        name: 'John Doe',
        articleId: 1
    },
    {
        id: 2,
        name: 'Jane Smith',
        articleId: 2
    }
];

function validateArticle(data) {
    if (!data.title || typeof data.title !== "string") {
        return "Title is required and should be string"
    }

    if (!data.content || typeof data.content !== "string") {
        return "Content is required and should be string"
    }

    return null;
}

function validateAuthor(data) {
    if (!data.name || typeof data.name !== "string") {
        return "Name is required and should be string";
    }

    if (!data.articleId || typeof data.articleId !== "number") {
        return "ArticleId is required and should be number"
    }

    return null;
}

app.post("/articles", (req, res) => {
    let error = validateArticle(req.body);
    if (error) return res.status(400).send(error);

    let article = { id: articles.length + 1, ...req.body };
    articles.push(article);
    res.status(201).json(article)
});

app.post("/authors", (req, res) => {
    let error = validateAuthor(req.body);
    if (error) return res.status(400).send(error);

    let author = { id: authors.length + 1, ...req.body };
    authors.push(author);
    res.status(201).json(author)
});

module.exports = { app, validateArticle, validateAuthor }