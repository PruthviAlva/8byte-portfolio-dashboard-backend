const { calculatePortfolio } = require("../services/portfolio.service");
const portfolioData = require("../data/portfolio.json");

exports.getPortfolio = async (req, res) => {
  try {
    const result = await calculatePortfolio(portfolioData);

    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: "Failed to load portfolio" });
  }
};