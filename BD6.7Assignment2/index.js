const express = require("express");
const { getAllStocks, getStockByTicker, validateTrade, addTrade } = require("./controller");
let app = express();
app.use(express.json());

app.get("/stocks", async (req, res) => {
    let result = await getAllStocks();
    res.status(200).json({ stocks: result });
});

app.get("/stocks/:ticker", async (req, res) => {
    let ticker = req.params.ticker;
    let result = await getStockByTicker(ticker);
    if (!result) return res.status(404).send("Stock not found with ticker " + ticker);
    res.status(200).json({ stock: result });
});

app.post("/trades/new", async (req, res) => {
    let error = validateTrade(req.body);
    if (error) return res.status(400).send(error);

    let result = await addTrade(req.body);
    res.status(201).json({ trade: result });
});

module.exports = { app }