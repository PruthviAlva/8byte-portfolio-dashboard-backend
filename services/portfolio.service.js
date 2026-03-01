// Portfolio Service (Calculation + Cache)

const NodeCache = require("node-cache");
const { getCMP } = require("./yahoo.service");
const { fetchStockData } = require("./google.service");

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

async function calculatePortfolio(stocks) {
  let totalInvestment = 0;
  let totalPresentValue = 0;

  const calculatedStocks = [];

  for (let stock of stocks) {
    let cached = cache.get(stock.symbol);

    if (!cached) {
      const cmp = await getCMP(stock.symbol);
      const fundamentals = await fetchStockData(stock.symbol);

      cached = { cmp, ...fundamentals };
      cache.set(stock.symbol, cached);
    }

    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = cached.cmp * stock.quantity;
    const gainLoss = presentValue - investment;

    totalInvestment += investment;
    totalPresentValue += presentValue;

    calculatedStocks.push({
      ...stock,
      ...cached,
      investment,
      presentValue,
      gainLoss,
    });
  }

  const totalGainLoss = totalPresentValue - totalInvestment;

  // =============================
  // 1️ Calculate Portfolio Weight
  // =============================
  const stocksWithWeight = calculatedStocks.map((stock) => ({
    ...stock,
    portfolioWeight:
      totalInvestment > 0
        ? Number(((stock.investment / totalInvestment) * 100).toFixed(2))
        : 0,
  }));

  // =============================
  // 2️ Group By Sector
  // =============================
  const sectorSummary = {};

  stocksWithWeight.forEach((stock) => {
    if (!sectorSummary[stock.sector]) {
      sectorSummary[stock.sector] = {
        stocks: [],
        totalInvestment: 0,
        totalPresentValue: 0,
        totalGainLoss: 0,
      };
    }

    sectorSummary[stock.sector].stocks.push(stock);
    sectorSummary[stock.sector].totalInvestment += stock.investment;
    sectorSummary[stock.sector].totalPresentValue += stock.presentValue;
    sectorSummary[stock.sector].totalGainLoss += stock.gainLoss;
  });

  // =============================
  // 3️ Format Sector Totals
  // =============================
  Object.keys(sectorSummary).forEach((sector) => {
    sectorSummary[sector].totalInvestment = Number(
      sectorSummary[sector].totalInvestment.toFixed(2)
    );

    sectorSummary[sector].totalPresentValue = Number(
      sectorSummary[sector].totalPresentValue.toFixed(2)
    );

    sectorSummary[sector].totalGainLoss = Number(
      sectorSummary[sector].totalGainLoss.toFixed(2)
    );
  });

  // =============================
  // 4️ Return Final Response
  // =============================
  return {
    summary: {
      totalInvestment: Number(totalInvestment.toFixed(2)),
      totalPresentValue: Number(totalPresentValue.toFixed(2)),
      totalGainLoss: Number(totalGainLoss.toFixed(2)),
    },
    sectorSummary,
  };
}

module.exports = { calculatePortfolio };