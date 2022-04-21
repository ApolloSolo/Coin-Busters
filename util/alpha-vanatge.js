const axios = require("axios");
require('dotenv').config();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": process.env.API_HOST,
    "X-RapidAPI-Key": process.env.SECRET_KEY,
  },
};

async function alphaCall(ticker) {
  const coinData = await axios.get(
    `https://alpha-vantage.p.rapidapi.com/query?from_currency=${ticker}&function=CURRENCY_EXCHANGE_RATE&to_currency=USD`,
    options
  );
  return coinData;
}

module.exports = {alphaCall};