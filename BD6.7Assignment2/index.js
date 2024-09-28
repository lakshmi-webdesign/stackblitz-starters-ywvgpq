const express = require("express");
const { getAllStocks, getStockByTicker, validateTrade, addTrade } = require("./controller");
let app = express();
app.use(express.json());

app.get("/stocks", async (req, res) => {
    let result = await getAllStocks();
    res.status(200).json(result);
});

app.get("/stocks/:ticker", async (req, res) => {
    let ticker = req.params.ticker;
    let result = await getStockByTicker(ticker);
    if (!result) return res.status(400).send("Stock not found with ticker " + ticker);
    res.status(200).json(result);
});

app.post("/trades", async (req, res) => {
    let data = req.body;
    let error = await validateTrade(data);
    if (error) return res.status(400).send(error)
    let result = await addTrade(data);

    res.status(200).json(result);
});

module.exports = { app }