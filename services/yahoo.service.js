const YahooFinance = require("yahoo-finance2").default;

/* CMP - Current Market Price - 
To get the current market price of a stock, we can use Yahoo Finance API. 
For this example, let's assume we have a function that fetches the CMP from Yahoo Finance.
*/

// Create instance (IMPORTANT)
const yahooFinance = new YahooFinance();

async function getCMP(symbol) {
  //Yahoo Finance API
  try {
    const quote = await yahooFinance.quote(`${symbol}.NS`);

    if (!quote || typeof quote.regularMarketPrice !== "number") {
      console.error(`No market price for ${symbol}`);
      return 0;
    }

    return quote.regularMarketPrice;
  } catch (error) {
    console.error(`Yahoo Error for ${symbol}:`, error.message);
    return 0; // prevent crash
  }
}

module.exports = { getCMP };