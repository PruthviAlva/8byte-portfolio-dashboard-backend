function groupBySector(stocks) {
    const grouped = {};

    stocks.forEach(stock => {
        const sector = stock.sector;
        if (!grouped[sector]) {
            grouped[sector] = {
                totalInvestment: 0,
                totalCurrentValue: 0,
                totalGainLoss: 0,
                stocks: []
            };
        }

        grouped[sector].totalInvestment += stock.investment;
        grouped[sector].totalCurrentValue += stock.currentValue;
        grouped[sector].totalGainLoss += stock.gainLoss;

        grouped[sector].stocks.push(stock);
    });

    return grouped;
}

module.exports = { groupBySector };