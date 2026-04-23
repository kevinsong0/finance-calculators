'use client'

import { useState } from 'react'

export default function SafeWithdrawalCalculator() {
  const [portfolio, setPortfolio] = useState('')
  const [withdrawalRate, setWithdrawalRate] = useState('4')
  const [growthRate, setGrowthRate] = useState('7')
  const [inflationRate, setInflationRate] = useState('3')
  const [years, setYears] = useState('30')

  const calculate = () => {
    const portfolioValue = parseFloat(portfolio) || 0
    const withdrawal = parseFloat(withdrawalRate) || 4
    const growth = parseFloat(growthRate) || 7
    const inflation = parseFloat(inflationRate) || 3
    const yearsNum = parseFloat(years) || 30
    
    const initialWithdrawal = portfolioValue * withdrawal / 100
    const realReturn = growth - inflation
    
    let balance = portfolioValue
    let totalWithdrawn = 0
    let annualWithdrawal = initialWithdrawal
    
    const yearByYear = []
    for (let i = 0; i < yearsNum; i++) {
      const startBalance = balance
      const withdrawalAmount = annualWithdrawal
      const growthAmount = (balance - withdrawalAmount) * realReturn / 100
      balance = balance - withdrawalAmount + growthAmount
      totalWithdrawn += withdrawalAmount
      annualWithdrawal = annualWithdrawal * (1 + inflation / 100)
      
      yearByYear.push({
        year: i + 1,
        startBalance: startBalance.toFixed(0),
        withdrawal: withdrawalAmount.toFixed(0),
        endBalance: Math.max(0, balance).toFixed(0)
      })
      
      if (balance <= 0) break
    }
    
    const success = balance > 0
    const depletionYear = balance <= 0 ? yearByYear.length : null

    return { 
      initialWithdrawal, 
      totalWithdrawn, 
      finalBalance: balance, 
      success, 
      depletionYear,
      yearByYear: yearByYear.slice(0, 5)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Safe Withdrawal Rate Calculator</h1>
      <p className="text-zinc-600">Test withdrawal sustainability with inflation-adjusted projections.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Portfolio & Withdrawal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Portfolio Value ($)</label>
            <input
              type="number"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Total retirement savings"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Withdrawal Rate (%)</label>
            <input
              type="number"
              value={withdrawalRate}
              onChange={(e) => setWithdrawalRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Default 4%"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Growth Rate (%)</label>
              <input
                type="number"
                value={growthRate}
                onChange={(e) => setGrowthRate(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="7%"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Inflation (%)</label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="3%"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="30"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Withdrawal Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">First Year Withdrawal</div>
            <div className="text-xl font-bold text-green-600">${result.initialWithdrawal.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Total Withdrawn</div>
            <div className="text-xl font-bold text-blue-600">${result.totalWithdrawn.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Final Balance</div>
            <div className={`text-xl font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
              ${result.finalBalance.toFixed(0)}
            </div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Success</div>
            <div className={`text-xl font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
              {result.success ? 'Yes' : `Depleted at year ${result.depletionYear}`}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">First 5 Years Projection</h3>
        <div className="text-xs space-y-1">
          {result.yearByYear.map(y => (
            <div key={y.year} className="bg-white rounded p-2 flex justify-between">
              <span>Year {y.year}</span>
              <span className="text-zinc-500">Withdraw ${y.withdrawal} → Balance ${y.endBalance}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safe Withdrawal Guidelines</h3>
        <div className="text-xs text-zinc-600">
          4% rule: historical safe withdrawal for 30-year retirement. Lower rates (3-3.5%) more conservative for early retirees. Adjust withdrawal based on market conditions. Consider flexible withdrawal strategies. Guardrails approach adjusts spending based on portfolio performance.
        </div>
      </div>
    </main>
  )
}
