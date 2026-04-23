'use client'

import { useState } from 'react'

export default function PortfolioRiskCalculator() {
  const [stocksAllocation, setStocksAllocation] = useState('60')
  const [bondsAllocation, setBondsAllocation] = useState('30')
  const [cashAllocation, setCashAllocation] = useState('10')
  const [reitAllocation, setReitAllocation] = useState('0')
  const [internationalAllocation, setInternationalAllocation] = useState('0')
  const [portfolioValue, setPortfolioValue] = useState('500000')
  const [investorAge, setInvestorAge] = useState('45')
  const [riskTolerance, setRiskTolerance] = useState('moderate')
  const [timeHorizon, setTimeHorizon] = useState('15')

  const calculate = () => {
    const stocks = parseFloat(stocksAllocation) || 0
    const bonds = parseFloat(bondsAllocation) || 0
    const cash = parseFloat(cashAllocation) || 0
    const reits = parseFloat(reitAllocation) || 0
    const intl = parseFloat(internationalAllocation) || 0
    const value = parseFloat(portfolioValue) || 0
    const age = parseFloat(investorAge) || 0
    const horizon = parseFloat(timeHorizon) || 0

    // Validate allocation sums to 100%
    const totalAllocation = stocks + bonds + cash + reits + intl

    // Historical volatility by asset class (annualized)
    const assetVolatility: Record<string, number> = {
      stocks: 18, // S&P 500 historical ~18%
      bonds: 6, // Aggregate bond index
      cash: 0.5, // Money market
      reits: 22, // REITs more volatile
      international: 20, // International stocks
    }

    // Historical returns by asset class
    const assetReturns: Record<string, number> = {
      stocks: 10, // S&P 500 ~10% long-term
      bonds: 5, // Aggregate bonds
      cash: 2, // Money market/short-term
      reits: 11, // REITs
      international: 8, // International
    }

    // Expected return (weighted average)
    const expectedReturn =
      (stocks / 100) * assetReturns.stocks +
      (bonds / 100) * assetReturns.bonds +
      (cash / 100) * assetReturns.cash +
      (reits / 100) * assetReturns.reits +
      (intl / 100) * assetReturns.international

    // Portfolio volatility (simplified weighted volatility)
    // In reality, diversification reduces volatility more than weighted average
    const weightedVolatility =
      (stocks / 100) * assetVolatility.stocks +
      (bonds / 100) * assetVolatility.bonds +
      (cash / 100) * assetVolatility.cash +
      (reits / 100) * assetVolatility.reits +
      (intl / 100) * assetVolatility.international

    // Diversification benefit (correlation reduces volatility)
    const diversificationFactor = 0.85 // Rough estimate of correlation benefit
    const portfolioVolatility = weightedVolatility * diversificationFactor

    // Risk metrics
    const standardDeviation = portfolioVolatility
    const oneYearDownside = expectedReturn - standardDeviation // ~16% chance of this or worse
    const worstCaseYear = expectedReturn - 2 * standardDeviation // ~2.5% chance (2 sigma)

    // Maximum drawdown estimate (worst historical)
    const maxDrawdown = stocks > 50 ? 35 : stocks > 30 ? 25 : 15 // Rough estimate based on stock exposure

    // Value at Risk (VaR) - 95% confidence
    const var95 = value * (standardDeviation / 100)

    // Sharpe ratio approximation (assuming risk-free rate 3%)
    const riskFreeRate = 3
    const sharpeRatio = (expectedReturn - riskFreeRate) / portfolioVolatility

    // Age-based recommended allocation (rule of thumb: 100 - age in stocks)
    const recommendedStocks = Math.max(20, Math.min(90, 100 - age))
    const recommendedBonds = 100 - recommendedStocks

    // Risk tolerance adjustments
    const toleranceAdjustments: Record<string, number> = {
      conservative: -15,
      moderate: 0,
      aggressive: 15,
    }
    const adjustedStockRec = recommendedStocks + toleranceAdjustments[riskTolerance]
    const finalStockRec = Math.max(20, Math.min(90, adjustedStockRec))

    // Allocation deviation from recommended
    const stockDeviation = stocks - finalStockRec
    const allocationRisk = stockDeviation > 20 ? 'Too aggressive for age' :
                          stockDeviation < -20 ? 'Too conservative for age' :
                          stockDeviation > 10 ? 'Slightly aggressive' :
                          stockDeviation < -10 ? 'Slightly conservative' :
                          'Aligned with age and risk tolerance'

    // Time horizon assessment
    const horizonRisk = horizon < 5 ? 'Short horizon - reduce equity exposure' :
                        horizon < 10 ? 'Medium horizon - moderate risk acceptable' :
                        'Long horizon - higher equity exposure appropriate'

    // Portfolio values by asset
    const stocksValue = value * (stocks / 100)
    const bondsValue = value * (bonds / 100)
    const cashValue = value * (cash / 100)
    const reitsValue = value * (reits / 100)
    const intlValue = value * (intl / 100)

    // Rebalancing recommendation
    const needsRebalancing = Math.abs(stockDeviation) > 5 || Math.abs(bonds - (100 - stocks)) > 5

    return {
      stocksAllocation: stocks.toFixed(0),
      bondsAllocation: bonds.toFixed(0),
      cashAllocation: cash.toFixed(0),
      reitAllocation: reits.toFixed(0),
      internationalAllocation: intl.toFixed(0),
      totalAllocation: totalAllocation.toFixed(0),
      portfolioValue: value.toFixed(2),
      investorAge: age.toFixed(0),
      timeHorizon: horizon.toFixed(0),
      riskTolerance: riskTolerance.charAt(0).toUpperCase() + riskTolerance.slice(1),
      stocksValue: stocksValue.toFixed(2),
      bondsValue: bondsValue.toFixed(2),
      cashValue: cashValue.toFixed(2),
      reitsValue: reitsValue.toFixed(2),
      intlValue: intlValue.toFixed(2),
      expectedReturn: expectedReturn.toFixed(2),
      portfolioVolatility: portfolioVolatility.toFixed(2),
      standardDeviation: standardDeviation.toFixed(2),
      oneYearDownside: oneYearDownside.toFixed(2),
      worstCaseYear: worstCaseYear.toFixed(2),
      maxDrawdown: maxDrawdown.toFixed(0),
      var95: var95.toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2),
      recommendedStocks: finalStockRec.toFixed(0),
      recommendedBonds: (100 - finalStockRec).toFixed(0),
      stockDeviation: stockDeviation.toFixed(0),
      allocationRisk,
      horizonRisk,
      needsRebalancing,
      isBalanced: totalAllocation === 100,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Portfolio Risk Calculator</h1>
      <p className="text-zinc-600">Analyze portfolio risk metrics including volatility, expected returns, Sharpe ratio, and Value at Risk. Compare your allocation to age-based recommendations and understand risk-adjusted performance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Asset Allocation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Stocks/Equity (%)</label>
            <input
              type="number"
              value={stocksAllocation}
              onChange={(e) => setStocksAllocation(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Bonds (%)</label>
            <input
              type="number"
              value={bondsAllocation}
              onChange={(e) => setBondsAllocation(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Cash/Money Market (%)</label>
            <input
              type="number"
              value={cashAllocation}
              onChange={(e) => setCashAllocation(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">REITs (%)</label>
            <input
              type="number"
              value={reitAllocation}
              onChange={(e) => setReitAllocation(e.target.value)}
              className="input"
              min="0"
              max="20"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">International (%)</label>
            <input
              type="number"
              value={internationalAllocation}
              onChange={(e) => setInternationalAllocation(e.target.value)}
              className="input"
              min="0"
              max="30"
            />
          </div>
          <div className={`text-sm ${result.isBalanced ? 'text-green-600' : 'text-red-600'}`}>
            Total Allocation: {result.totalAllocation}% {result.isBalanced ? '(balanced)' : '(adjust to 100%)'}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investor Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Portfolio Value ($)</label>
            <input
              type="number"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Age</label>
            <input
              type="number"
              value={investorAge}
              onChange={(e) => setInvestorAge(e.target.value)}
              className="input"
              min="18"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="input"
            >
              <option value="conservative">Conservative (preserve capital, lower returns)</option>
              <option value="moderate">Moderate (balance growth and stability)</option>
              <option value="aggressive">Aggressive (maximize growth, accept volatility)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Time Horizon (Years)</label>
            <input
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="input"
              min="1"
              max="40"
            />
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Current Portfolio Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Stocks:</span>
            <span className="font-medium ml-2">{result.stocksAllocation}% (${result.stocksValue})</span>
          </div>
          <div>
            <span className="text-zinc-600">Bonds:</span>
            <span className="font-medium ml-2">{result.bondsAllocation}% (${result.bondsValue})</span>
          </div>
          <div>
            <span className="text-zinc-600">Cash:</span>
            <span className="font-medium ml-2">{result.cashAllocation}% (${result.cashValue})</span>
          </div>
          <div>
            <span className="text-zinc-600">REITs:</span>
            <span className="font-medium ml-2">{result.reitAllocation}% (${result.reitsValue})</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Expected Performance</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Expected Return:</span>
            <span className="font-bold ml-2">{result.expectedReturn}%/year</span>
          </div>
          <div>
            <span className="text-zinc-600">Volatility (Std Dev):</span>
            <span className="font-medium ml-2">{result.portfolioVolatility}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Sharpe Ratio:</span>
            <span className="font-medium ml-2">{result.sharpeRatio}</span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Sharpe ratio above 1.0 is good. Higher = better risk-adjusted returns.
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Risk Metrics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">1-Year Downside:</span>
            <span className="font-medium ml-2">{result.oneYearDownside}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Worst Case Year:</span>
            <span className="font-medium ml-2 text-red-600">{result.worstCaseYear}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Max Drawdown:</span>
            <span className="font-medium ml-2">{result.maxDrawdown}%</span>
          </div>
          <div>
            <span className="text-zinc-600">VaR (95%):</span>
            <span className="font-bold ml-2">${result.var95}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          VaR: 95% chance losses won't exceed this in a typical year. 5% chance they could.
        </div>
      </div>

      <div className={`card ${result.needsRebalancing ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
        <h3 className={`font-medium mb-2 ${result.needsRebalancing ? 'text-yellow-700' : 'text-green-700'}`}>
          Allocation Recommendation
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Your Stock Allocation:</span>
            <span className="font-medium ml-2">{result.stocksAllocation}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Recommended:</span>
            <span className="font-bold ml-2">{result.recommendedStocks}% stocks / {result.recommendedBonds}% bonds</span>
          </div>
          <div>
            <span className="text-zinc-600">Deviation:</span>
            <span className="font-medium ml-2">{result.stockDeviation}%</span>
          </div>
        </div>
        <div className={`text-sm mt-2 ${result.needsRebalancing ? 'text-yellow-600' : 'text-green-600'}`}>
          {result.allocationRisk}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Time Horizon Assessment</h3>
        <div className="text-sm text-orange-600">{result.horizonRisk}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Your Horizon:</span>
            <span className="font-medium ml-2">{result.timeHorizon} years</span>
          </div>
          <div>
            <span className="text-zinc-600">Risk Capacity:</span>
            <span className="font-medium ml-2">{parseInt(result.timeHorizon) > 10 ? 'High' : parseInt(result.timeHorizon) > 5 ? 'Medium' : 'Low'}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Asset Class Historical Risk/Return</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>US Stocks:</strong> ~10% return, ~18% volatility. Highest growth potential, highest risk.</li>
          <li><strong>Bonds:</strong> ~5% return, ~6% volatility. Stability, income, diversification from stocks.</li>
          <li><strong>Cash:</strong> ~2% return, ~0.5% volatility. Safety, liquidity, emergency fund. Lowest return.</li>
          <li><strong>REITs:</strong> ~11% return, ~22% volatility. Real estate exposure, dividends, higher volatility.</li>
          <li><strong>International:</strong> ~8% return, ~20% volatility. Geographic diversification, currency risk.</li>
          <li><strong>Diversification Benefit:</strong> Mixing assets reduces portfolio volatility below weighted average.</li>
          <li><strong>Rebalancing:</strong> Review annually. Sell winners, buy losers to maintain target allocation.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Age-Based Allocation Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Rule of 100:</strong> Stocks = 100 - Age. Age 30: 70% stocks. Age 60: 40% stocks.</li>
          <li><strong>Rule of 110:</strong> More aggressive: Stocks = 110 - Age. For longer life expectancy.</li>
          <li><strong>Rule of 120:</strong> Very aggressive: Stocks = 120 - Age. For young investors with long horizon.</li>
          <li><strong>Adjustment Factors:</strong> Risk tolerance, job stability, other income sources, legacy goals.</li>
          <li><strong>Glide Path:</strong> Target-date funds automatically reduce equity as you approach retirement.</li>
          <li><strong>Minimum Equity:</strong> Even retirees need 20-30% equity for growth and inflation protection.</li>
        </ul>
      </div>
    </main>
  )
}