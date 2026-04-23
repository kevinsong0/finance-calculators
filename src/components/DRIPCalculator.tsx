'use client'

import { useState } from 'react'

export default function DRIPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('')
  const [stockPrice, setStockPrice] = useState('')
  const [dividendYield, setDividendYield] = useState('')
  const [years, setYears] = useState('')
  const [stockGrowth, setStockGrowth] = useState('')
  const [contribution, setContribution] = useState('')

  const calculate = () => {
    const initial = parseFloat(initialInvestment) || 10000
    const price = parseFloat(stockPrice) || 100
    const yieldRate = parseFloat(dividendYield) || 3
    const numYears = parseInt(years) || 10
    const growthRate = parseFloat(stockGrowth) || 5
    const monthlyContrib = parseFloat(contribution) || 0

    const dividendRate = yieldRate / 100
    const annualGrowth = growthRate / 100

    let shares = initial / price
    let totalDividends = 0
    let totalValue = initial

    for (let year = 1; year <= numYears; year++) {
      // Add monthly contributions at beginning of year
      const yearlyContrib = monthlyContrib * 12
      const sharesFromContrib = yearlyContrib / (price * Math.pow(1 + annualGrowth, year - 1))
      shares += sharesFromContrib

      // Calculate dividends for this year
      const currentPrice = price * Math.pow(1 + annualGrowth, year - 1)
      const annualDividend = shares * currentPrice * dividendRate
      totalDividends += annualDividend

      // Reinvest dividends (buy more shares at current price)
      const sharesFromDividends = annualDividend / currentPrice
      shares += sharesFromDividends

      // Update total value
      totalValue = shares * currentPrice * Math.pow(1 + annualGrowth, 1)
    }

    // Calculate without DRIP for comparison
    const noDRIPShares = (initial + monthlyContrib * 12 * numYears) / price
    const noDRIPValue = noDRIPShares * price * Math.pow(1 + annualGrowth, numYears)
    const noDRIPDividends = noDRIPShares * price * Math.pow(1 + annualGrowth, numYears / 2) * dividendRate * numYears

    // Final calculations
    const finalPrice = price * Math.pow(1 + annualGrowth, numYears)
    const finalValue = shares * finalPrice
    const totalInvested = initial + monthlyContrib * 12 * numYears
    const profit = finalValue - totalInvested

    return {
      finalShares: shares.toFixed(2),
      finalValue: finalValue.toFixed(2),
      totalDividends: totalDividends.toFixed(2),
      profit: profit.toFixed(2),
      noDRIPValue: noDRIPValue.toFixed(2),
      noDRIPDividends: noDRIPDividends.toFixed(2),
      dripBenefit: (finalValue - noDRIPValue + totalDividends - noDRIPDividends).toFixed(2),
      yieldOnCost: ((totalDividends / totalInvested) * 100 / numYears).toFixed(2),
      totalReturnPercent: ((profit / totalInvested) * 100).toFixed(1),
      totalInvested: totalInvested.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dividend Reinvestment Calculator (DRIP)</h1>
      <p className="text-zinc-600">Calculate the power of dividend reinvestment over time with compound growth.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investment Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Initial Investment</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter initial investment"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Stock Price per Share</label>
            <input
              type="number"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter stock price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Dividend Yield (%)</label>
            <input
              type="number"
              value={dividendYield}
              onChange={(e) => setDividendYield(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual dividend yield"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Stock Price Growth (%)</label>
            <input
              type="number"
              value={stockGrowth}
              onChange={(e) => setStockGrowth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Expected annual stock growth"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Investment Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Number of years to invest"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Contribution</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Optional monthly investment"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">DRIP Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Final Shares</div>
            <div className="text-2xl font-bold">{result.finalShares}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Portfolio Value</div>
            <div className="text-2xl font-bold text-green-600">$${result.finalValue}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-z-zinc-500">Total Dividends</div>
            <div className="text-2xl font-bold text-blue-600">$${result.totalDividends}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Profit</div>
            <div className="text-2xl font-bold text-purple-600">$${result.profit}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">DRIP vs No DRIP Comparison</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">With DRIP</div>
            <div className="font-bold text-green-600">$${result.finalValue}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Without DRIP</div>
            <div className="font-bold">$${result.noDRIPValue}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">DRIP Benefit</div>
            <div className="font-bold text-green-600">$${result.dripBenefit}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Yield on Cost</div>
            <div className="font-bold">{result.yieldOnCost}%</div>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">DRIP Advantages</h3>
        <div className="text-sm text-green-600">
          Dividend reinvestment compounds your returns by buying more shares automatically. Over time, you own more shares paying more dividends. This creates a powerful compounding effect that can significantly boost long-term returns.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">DRIP Facts</h3>
        <div className="text-xs text-zinc-600">
          DRIP stands for Dividend Reinvestment Plan. Many companies and brokers offer free DRIP programs. Reinvested dividends grow tax-deferred in retirement accounts. DRIP is ideal for long-term dividend investors seeking compound growth. Start early to maximize compounding benefits.
        </div>
      </div>
    </main>
  )
}