const axios = require("axios");
require("dotenv").config();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    "X-RapidAPI-Key": "e7d9710815msh122213a08c14487p1d2ed7jsnfcc325940b79",
  },
};

async function alphaCall(ticker) {
  const coinData = await axios.get(
    `https://alpha-vantage.p.rapidapi.com/query?from_currency=${ticker}&function=CURRENCY_EXCHANGE_RATE&to_currency=USD`,
    options
  );
  return coinData;
}

module.exports = { alphaCall };
