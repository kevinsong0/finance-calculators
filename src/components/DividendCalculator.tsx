'use client'

import { useState } from 'react'

export default function DividendCalculator() {
  const [investment, setInvestment] = useState('')
  const [dividendYield, setDividendYield] = useState('')
  const [frequency, setFrequency] = useState('quarterly')
  const [growthRate, setGrowthRate] = useState('')
  const [years, setYears] = useState('')

  const calculate = () => {
    const inv = parseFloat(investment) || 0
    const yieldRate = parseFloat(dividendYield) || 0
    const growth = parseFloat(growthRate) || 0
    const yrs = parseFloat(years) || 1
    
    const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1
    const annualDividend = inv * yieldRate / 100
    const periodPayment = annualDividend / periodsPerYear
    
    let totalDividends = 0
    let currentYield = yieldRate
    for (let i = 0; i < yrs; i++) {
      totalDividends += inv * currentYield / 100
      currentYield += growth
    }
    
    const reinvestedValue = inv * Math.pow(1 + (yieldRate/100), yrs)

    return { annualDividend, periodPayment, totalDividends, reinvestedValue }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dividend Calculator</h1>
      <p className="text-zinc-600">Calculate dividend income and growth projections.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investment Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Initial Investment ($)</label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter investment amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Dividend Yield (%)</label>
            <input
              type="number"
              value={dividendYield}
              onChange={(e) => setDividendYield(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual yield"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Payment Frequency</label>
            <select 
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Dividend Growth Rate (%/year)</label>
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Expected growth rate"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Investment Period (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Years to hold"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Results</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Annual Dividend</div>
            <div className="text-2xl font-bold text-green-600">
              ${result.annualDividend.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Per Payment</div>
            <div className="text-2xl font-bold text-blue-600">
              ${result.periodPayment.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Total Dividends</div>
            <div className="text-2xl font-bold text-green-600">
              ${result.totalDividends.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Reinvested Value</div>
            <div className="text-2xl font-bold text-purple-600">
              ${result.reinvestedValue.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dividend Investment Tips</h3>
        <div className="text-xs text-zinc-600">
          Dividend stocks provide regular income. Look for companies with consistent payout history. DRIP (Dividend Reinvestment Plan) compounds returns. Qualified dividends taxed at lower rates (0-20%). Dividend aristocrats have 25+ years of increasing payouts.
        </div>
      </div>
    </main>
  )
}
