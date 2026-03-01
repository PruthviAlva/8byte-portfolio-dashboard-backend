const axios = require('axios');
/* Cheerio is a server-side library that allows us to parse and manipulate HTML,
 similar to how jQuery works in the browser. We will use it to extract the current market price
  from the Google Finance page. for scraping the data from google finance
*/
const YahooFinance = require("yahoo-finance2").default;

/* CMP - Current Market Price - 
To get the current market price of a stock, we can use Yahoo Finance API. 
For this example, let's assume we have a function that fetches the CMP from Yahoo Finance.
*/

// Create instance (IMPORTANT)
const yahooFinance = new YahooFinance();

async function fetchStockData(symbol) {
  // Temporary clean structured data
  return {
    peRatio: (Math.random() * 30).toFixed(2),
    earnings: (Math.random() * 1000).toFixed(2),
  };
}

module.exports = { fetchStockData };