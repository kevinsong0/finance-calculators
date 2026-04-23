'use client'

import { useState } from 'react'

export default function DividendGrowthCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('10000')
  const [initialYield, setInitialYield] = useState('4')
  const [dividendGrowthRate, setDividendGrowthRate] = useState('5')
  const [sharePriceGrowth, setSharePriceGrowth] = useState('8')
  const [holdingYears, setHoldingYears] = useState('10')
  const [reinvestDividends, setReinvestDividends] = useState(true)
  const [yieldOnCostDisplay, setYieldOnCostDisplay] = useState('0')

  const calculate = () => {
    const initial = parseFloat(initialInvestment) || 0
    const yieldRate = parseFloat(initialYield) || 0
    const divGrowth = parseFloat(dividendGrowthRate) || 0
    const priceGrowth = parseFloat(sharePriceGrowth) || 0
    const years = parseFloat(holdingYears) || 0
    const reinvest = reinvestDividends

    // Initial values
    const initialDividend = initial * (yieldRate / 100)
    const initialShares = initial // Assuming $1/share for simplicity or use actual

    // Year-by-year calculations
    const yearlyData = []
    let currentInvestment = initial
    let currentDividendRate = yieldRate
    let totalDividendsReceived = 0
    let totalReinvested = 0

    for (let year = 1; year <= years; year++) {
      // Dividend grows each year
      const dividendGrowthFactor = Math.pow(1 + divGrowth / 100, year - 1)
      const yearDividendRate = yieldRate * dividendGrowthFactor

      // Portfolio value grows (price appreciation)
      const priceGrowthFactor = Math.pow(1 + priceGrowth / 100, year)
      const yearPortfolioValue = currentInvestment * priceGrowthFactor

      // Dividend income for this year
      const yearDividendIncome = yearPortfolioValue * (yearDividendRate / 100)

      // Yield on cost (dividend rate relative to original investment)
      const yieldOnCost = yearDividendRate

      // If reinvesting, add to portfolio
      if (reinvest) {
        currentInvestment += yearDividendIncome
        totalReinvested += yearDividendIncome
      }

      totalDividendsReceived += yearDividendIncome

      yearlyData.push({
        year,
        portfolioValue: yearPortfolioValue.toFixed(2),
        dividendRate: yearDividendRate.toFixed(2),
        dividendIncome: yearDividendIncome.toFixed(2),
        yieldOnCost: yieldOnCost.toFixed(2),
        cumulativeDividends: totalDividendsReceived.toFixed(2),
        reinvestAmount: reinvest ? yearDividendIncome.toFixed(2) : '0',
      })
    }

    // Final values
    const finalPortfolioValue = initial * Math.pow(1 + priceGrowth / 100, years)
    const finalDividendRate = yieldRate * Math.pow(1 + divGrowth / 100, years - 1)
    const finalYieldOnCost = finalDividendRate
    const finalDividendIncome = finalPortfolioValue * (finalDividendRate / 100)

    // With reinvestment (more complex calculation)
    let portfolioWithReinvest = initial
    for (let year = 1; year <= years; year++) {
      const priceFactor = Math.pow(1 + priceGrowth / 100, year)
      const yearValue = portfolioWithReinvest * (1 + priceGrowth / 100)
      const yearDiv = yearValue * (yieldRate * Math.pow(1 + divGrowth / 100, year - 1) / 100)
      if (reinvest) {
        portfolioWithReinvest = yearValue + yearDiv
      } else {
        portfolioWithReinvest = yearValue
      }
    }

    const totalReturn = reinvest ?
      (portfolioWithReinvest - initial + (reinvest ? 0 : totalDividendsReceived)) :
      (finalPortfolioValue - initial + totalDividendsReceived)
    const totalReturnPercent = (totalReturn / initial) * 100

    // Dividend income vs price appreciation contribution
    const priceAppreciation = finalPortfolioValue - initial
    const dividendContribution = totalDividendsReceived
    const reinvestBonus = reinvest ? (portfolioWithReinvest - finalPortfolioValue) : 0

    return {
      initialInvestment: initial.toFixed(2),
      initialYield: yieldRate.toFixed(2),
      dividendGrowthRate: divGrowth.toFixed(1),
      sharePriceGrowth: priceGrowth.toFixed(1),
      holdingYears: years.toFixed(0),
      reinvestDividends: reinvest,
      initialDividend: initialDividend.toFixed(2),
      finalPortfolioValue: finalPortfolioValue.toFixed(2),
      portfolioWithReinvest: reinvest ? portfolioWithReinvest.toFixed(2) : finalPortfolioValue.toFixed(2),
      finalDividendRate: finalDividendRate.toFixed(2),
      finalYieldOnCost: finalYieldOnCost.toFixed(2),
      finalDividendIncome: finalDividendIncome.toFixed(2),
      totalDividendsReceived: totalDividendsReceived.toFixed(2),
      totalReinvested: totalReinvested.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      totalReturnPercent: totalReturnPercent.toFixed(2),
      priceAppreciation: priceAppreciation.toFixed(2),
      dividendContribution: dividendContribution.toFixed(2),
      reinvestBonus: reinvestBonus.toFixed(2),
      yearlyData: yearlyData.slice(0, 5), // First 5 years for display
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dividend Growth Calculator</h1>
      <p className="text-zinc-600">Calculate long-term returns from dividend growth stocks. Understand yield on cost, dividend reinvestment benefits, and compare price appreciation vs dividend income over time.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investment Parameters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Initial Investment ($)</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="input"
              min="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Initial Dividend Yield (%)</label>
            <input
              type="number"
              value={initialYield}
              onChange={(e) => setInitialYield(e.target.value)}
              className="input"
              min="0"
              max="15"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Typical dividend stocks: 2-6%. High-yield: 6-10%. REITs: 4-8%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Growth Assumptions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Dividend Growth Rate (%)</label>
            <input
              type="number"
              value={dividendGrowthRate}
              onChange={(e) => setDividendGrowthRate(e.target.value)}
              className="input"
              min="0"
              max="20"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Dividend Aristocrats: 5-10%. Fast growers: 10-15%. Slow growers: 2-4%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Share Price Growth (%)</label>
            <input
              type="number"
              value={sharePriceGrowth}
              onChange={(e) => setSharePriceGrowth(e.target.value)}
              className="input"
              min="-10"
              max="30"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Market average: 7-10%. Defensive stocks: 3-5%. Growth stocks: 10-15%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period (Years)</label>
            <input
              type="number"
              value={holdingYears}
              onChange={(e) => setHoldingYears(e.target.value)}
              className="input"
              min="1"
              max="30"
            />
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Dividend Reinvestment (DRIP)</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={reinvestDividends}
            onChange={(e) => setReinvestDividends(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Automatically reinvest dividends to buy more shares</label>
        </div>
        <div className="text-xs text-yellow-600 mt-2">
          DRIP accelerates compound growth. Dividends buy shares at current price, increasing future dividends.
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Initial Investment</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Investment Amount:</span>
            <span className="font-medium ml-2">${result.initialInvestment}</span>
          </div>
          <div>
            <span className="text-zinc-600">Initial Yield:</span>
            <span className="font-medium ml-2">{result.initialYield}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Year 1 Dividend:</span>
            <span className="font-bold ml-2">${result.initialDividend}</span>
          </div>
          <div>
            <span className="text-zinc-600">Holding Period:</span>
            <span className="font-medium ml-2">{result.holdingYears} years</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Yield on Cost Growth</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Initial Yield on Cost:</span>
            <span className="font-medium ml-2">{result.initialYield}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Final Yield on Cost:</span>
            <span className="font-bold ml-2">{result.finalYieldOnCost}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Final Dividend Rate:</span>
            <span className="font-medium ml-2">{result.finalDividendRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Yield Increase:</span>
            <span className="font-medium ml-2">{(parseFloat(result.finalYieldOnCost) - parseFloat(result.initialYield)).toFixed(1)}%</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          Yield on cost shows your actual return on original investment as dividends grow over time.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Final Portfolio Value</h3>
        <div className="text-2xl font-bold text-green-800">${result.portfolioWithReinvest}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Price Appreciation:</span>
            <span className="font-medium ml-2">${result.priceAppreciation}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Dividends:</span>
            <span className="font-medium ml-2">${result.totalDividendsReceived}</span>
          </div>
          {result.reinvestDividends && (
            <>
              <div>
                <span className="text-zinc-600">Reinvestment Bonus:</span>
                <span className="font-medium ml-2">${result.reinvestBonus}</span>
              </div>
              <div>
                <span className="text-zinc-600">Total Reinvested:</span>
                <span className="font-medium ml-2">${result.totalReinvested}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Final Annual Dividend Income</h3>
        <div className="text-xl font-bold text-orange-800">${result.finalDividendIncome}</div>
        <div className="text-sm text-orange-600 mt-1">
          Year {result.holdingYears} dividend income (YOC: {result.finalYieldOnCost}% on original ${result.initialInvestment})
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Total Return Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Return:</span>
            <span className="font-bold ml-2">${result.totalReturn}</span>
          </div>
          <div>
            <span className="text-zinc-600">Return %:</span>
            <span className="font-bold ml-2">{result.totalReturnPercent}%</span>
          </div>
        </div>
        <div className="text-xs text-teal-600 mt-2">
          {result.reinvestDividends ? 'With DRIP: dividends compound for higher total return.' : 'Without DRIP: dividends received as cash, not reinvested.'}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Year-by-Year Projection (First 5 Years)</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">Portfolio</th>
                <th className="text-left p-2">Div Rate</th>
                <th className="text-left p-2">Div Income</th>
                <th className="text-left p-2">YOC</th>
                <th className="text-left p-2">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {result.yearlyData.map((row) => (
                <tr key={row.year} className="border-b">
                  <td className="p-2">{row.year}</td>
                  <td className="p-2">${row.portfolioValue}</td>
                  <td className="p-2">{row.dividendRate}%</td>
                  <td className="p-2">${row.dividendIncome}</td>
                  <td className="p-2">{row.yieldOnCost}%</td>
                  <td className="p-2">${row.cumulativeDividends}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dividend Growth Investing Strategy</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Yield on Cost:</strong> Your effective yield grows over time as dividends increase. A 4% initial yield with 5% annual growth becomes 6.5% YOC in 10 years.</li>
          <li><strong>Dividend Aristocrats:</strong> Companies with 25+ years of consecutive dividend increases. Examples: KO, PG, JNJ, PEP. Typically grow dividends 5-8% annually.</li>
          <li><strong>DRIP Benefits:</strong> Reinvesting dividends compounds returns. Automatic reinvestment buys fractional shares at no commission.</li>
          <li><strong>Tax Consideration:</strong> Qualified dividends taxed at 15-20% (lower than ordinary income). Reinvested dividends still taxable.</li>
          <li><strong>Safety Check:</strong> Dividend payout ratio under 60% indicates sustainable dividend. Avoid stocks with unsustainable yields (above 8-10%).</li>
          <li><strong>Diversification:</strong> Spread across multiple dividend stocks and sectors. Target 15-25 positions for balanced income.</li>
        </ul>
      </div>
    </main>
  )
}