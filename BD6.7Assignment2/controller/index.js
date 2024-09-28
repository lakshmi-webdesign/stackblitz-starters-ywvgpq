let stocks = [
    { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
    { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.10 },
    { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.50 },
];

let trades = [
    { tradeId: 1, stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07' },
    { tradeId: 2, stockId: 2, quantity: 5, tradeType: 'sell', tradeDate: '2024-08-06' },
    { tradeId: 3, stockId: 3, quantity: 7, tradeType: 'buy', tradeDate: '2024-08-05' },
];

function getAllStocks() {
    return stocks;
}

function getStockByTicker(ticker) {
    return stocks.find((obj) => obj.ticker === ticker)
}

function addTrade(data) {
    let trade = { tradeId: trades.length + 1, ...data }
    trades.push(trade);
    return trade;
}

function validateTrade(data) {
    if (!data.stockId || typeof data.stockId !== "number") {
        return "StockId is required and should be number"
    }

    if (!data.quantity || typeof data.quantity !== "string") {
        return "Quantity is required and should be string"
    }

    if (!data.tradeType || typeof data.tradeType !== "string") {
        return "TradeType is required and should be string"
    }

    if (!data.tradeDate || typeof data.tradeDate !== "string") {
        return "TradeDate is required and should be string"
    }

    return null;
}

module.exports = { getAllStocks, getStockByTicker, addTrade, validateTrade }