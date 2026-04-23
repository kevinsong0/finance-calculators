'use client'

import { useState } from 'react'

export default function DividendStockComparisonCalculator() {
  const [stocks, setStocks] = useState([
    { name: 'Stock A', price: '100', yield: '3', growth: '5' },
    { name: 'Stock B', price: '80', yield: '4', growth: '3' }
  ])
  const [years, setYears] = useState('10')
  const [initialInvestment, setInitialInvestment] = useState('10000')
  const [taxRate, setTaxRate] = useState('15')

  const updateStock = (idx: number, field: string, value: string) => {
    const updated = [...stocks]
    updated[idx] = { ...updated[idx], [field]: value }
    setStocks(updated)
  }

  const addStock = () => {
    setStocks([...stocks, { name: `Stock ${String.fromCharCode(65 + stocks.length)}`, price: '50', yield: '2', growth: '4' }])
  }

  const calculate = () => {
    const numYears = parseInt(years) || 10
    const investment = parseFloat(initialInvestment) || 10000
    const tax = parseFloat(taxRate) || 15

    const results = stocks.map((s) => {
      const price = parseFloat(s.price) || 100
      const yieldRate = parseFloat(s.yield) || 3
      const growthRate = parseFloat(s.growth) || 5

      const shares = investment / price
      const annualDividend = yieldRate / 100
      const annualGrowth = growthRate / 100

      // Calculate total return
      let totalDividends = 0
      let currentSharePrice = price
      let currentShares = shares

      for (let year = 1; year <= numYears; year++) {
        // Dividend income this year
        const yearlyDividend = currentShares * currentSharePrice * annualDividend
        const afterTaxDividend = yearlyDividend * (1 - tax / 100)
        totalDividends += afterTaxDividend

        // Share price appreciation
        currentSharePrice *= (1 + annualGrowth)

        // Dividend growth (simplified - grows with share price)
      }

      // Final portfolio value
      const finalValue = currentShares * currentSharePrice
      const totalReturn = totalDividends + finalValue - investment
      const annualizedReturn = ((totalReturn / investment) / numYears) * 100

      // Yield on cost after growth
      const yieldOnCost = (yieldRate * Math.pow(1 + annualGrowth, numYears))

      return {
        name: s.name,
        shares: shares.toFixed(2),
        initialYield: yieldRate.toFixed(2),
        growthRate: annualGrowth.toFixed(2),
        totalDividends: totalDividends.toFixed(2),
        finalValue: finalValue.toFixed(2),
        totalReturn: totalReturn.toFixed(2),
        annualizedReturn: annualizedReturn.toFixed(2),
        dividendGrowth: (yieldRate * Math.pow(1 + annualGrowth, numYears / 2)).toFixed(2),
        priceAppreciation: ((currentSharePrice - price) / price * 100).toFixed(1)
      }
    })

    // Find best performer
    const bestByReturn = results.reduce((a, b) =>
      parseFloat(a.totalReturn) > parseFloat(b.totalReturn) ? a : b
    )
    const bestByYield = results.reduce((a, b) =>
      parseFloat(a.totalDividends) > parseFloat(b.totalDividends) ? a : b
    )

    return {
      results,
      bestByReturn: bestByReturn.name,
      bestByYield: bestByYield.name,
      investment: investment.toFixed(2),
      years: numYears,
      taxRate: tax
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dividend Stock Comparison Calculator</h1>
      <p className="text-zinc-600">Compare dividend stocks by total return, yield, and growth over time.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investment Parameters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Initial Investment</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter investment amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years to Hold</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter holding period"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Dividend Tax Rate (%)</label>
            <select
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="0">0% (Tax-free account)</option>
              <option value="15">15% (Qualified dividends)</option>
              <option value="20">20% (High income bracket)</option>
              <option value="37">37% (Ordinary income rate)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Stocks to Compare</h3>
        <div className="space-y-2">
          {stocks.map((s, idx) => (
            <div key={idx} className="bg-white rounded p-3 grid grid-cols-4 gap-2 text-sm">
              <input
                type="text"
                value={s.name}
                onChange={(e) => updateStock(idx, 'name', e.target.value)}
                className="p-1 border rounded"
                placeholder="Name"
              />
              <input
                type="number"
                value={s.price}
                onChange={(e) => updateStock(idx, 'price', e.target.value)}
                className="p-1 border rounded"
                placeholder="Price"
              />
              <input
                type="number"
                value={s.yield}
                onChange={(e) => updateStock(idx, 'yield', e.target.value)}
                className="p-1 border rounded"
                placeholder="Yield %"
              />
              <input
                type="number"
                value={s.growth}
                onChange={(e) => updateStock(idx, 'growth', e.target.value)}
                className="p-1 border rounded"
                placeholder="Growth %"
              />
            </div>
          ))}
          <button
            onClick={addStock}
            className="w-full p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Add Stock for Comparison
          </button>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Comparison Results ({result.years} Years)</h3>
        <div className="space-y-2">
          {result.results.map((r) => (
            <div key={r.name} className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{r.name}</span>
                <span className="text-sm text-zinc-500">
                  {r.shares} shares @ {r.initialYield}% yield, {r.growthRate}% growth
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>
                  <div className="text-zinc-500">Dividends</div>
                  <div className="font-bold">$${r.totalDividends}</div>
                </div>
                <div>
                  <div className="text-zinc-500">Final Value</div>
                  <div className="font-bold">$${r.finalValue}</div>
                </div>
                <div>
                  <div className="text-zinc-500">Total Return</div>
                  <div className="font-bold text-green-600">$${r.totalReturn}</div>
                </div>
                <div>
                  <div className="text-zinc-500">Annualized</div>
                  <div className="font-bold">{r.annualizedReturn}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Performers</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Highest Total Return</div>
            <div className="font-bold text-green-600">{result.bestByReturn}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Most Dividend Income</div>
            <div className="font-bold text-blue-600">{result.bestByYield}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dividend Investment Strategy</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>High Yield vs High Growth</strong>
            <div className="text-zinc-500">High yield: more income now, lower growth. High growth: less income, better appreciation. Balance based on income needs vs time horizon.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Dividend Aristocrats</strong>
            <div className="text-zinc-500">25+ years of consecutive dividend increases. Reliable income stream. Examples: JNJ, KO, PG. Combine with growth stocks.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Tax Considerations</strong>
            <div className="text-zinc-500">Qualified dividends: 0-20% tax (hold 60+ days). REITs: ordinary income rates. Municipal bonds: tax-free. Hold in tax-advantaged accounts for efficiency.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Total Return Components</h3>
        <div className="text-xs text-zinc-600">
          Dividend income + price appreciation = total return. Yield typically 2-5% for quality stocks. Growth varies by sector. Utilities: high yield, low growth. Tech: low yield, high growth. Seek balance: 3-4% yield + 5-7% growth = 8-11% total return potential.
        </div>
      </div>
    </main>
  )
}