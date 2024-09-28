const express = require("express");
let app = express();
let { getAllBooks, getBookById } = require("./controller/index")

app.get("/books", async (req, res) => {
    let result = await getAllBooks();
    res.status(200).json({ books: result })
})

app.get("/books/details/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await getBookById(id);
    if (!result) return res.status(400).send("Book not found");
    res.status(200).json({ book: result })
});

module.exports = { app }