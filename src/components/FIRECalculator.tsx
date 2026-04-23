'use client'

import { useState } from 'react'

export default function FIRECalculator() {
  const [annualExpenses, setAnnualExpenses] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [growthRate, setGrowthRate] = useState('7')

  const calculate = () => {
    const expenses = parseFloat(annualExpenses) || 0
    const savings = parseFloat(currentSavings) || 0
    const monthly = parseFloat(monthlyContribution) || 0
    const rate = parseFloat(growthRate) || 7
    
    const fireNumber = expenses * 25 // 4% rule
    const monthlyRate = rate / 100 / 12
    
    let months = 0
    let balance = savings
    while (balance < fireNumber && months < 600) {
      balance = balance * (1 + monthlyRate) + monthly
      months++
    }
    
    const years = months / 12
    const totalContributed = savings + monthly * months
    const growthEarnings = fireNumber - totalContributed

    return { fireNumber, years, months, totalContributed, growthEarnings }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">FIRE Calculator</h1>
      <p className="text-zinc-600">Calculate your Financial Independence, Retire Early timeline.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your FIRE Numbers</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Expenses ($)</label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Annual living expenses"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Savings ($)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Current investment balance"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Monthly savings amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Growth (%)</label>
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Default 7%"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">FIRE Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">FIRE Number (25x expenses)</div>
            <div className="text-2xl font-bold text-purple-600">${result.fireNumber.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Years to FIRE</div>
            <div className="text-2xl font-bold text-green-600">{result.years.toFixed(1)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Total Contributed</div>
            <div className="text-xl font-bold text-zinc-600">${result.totalContributed.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Growth Earnings</div>
            <div className="text-xl font-bold text-blue-600">${result.growthEarnings.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">The 4% Rule</h3>
        <div className="text-xs text-zinc-600">
          FIRE number = Annual expenses × 25. Based on 4% safe withdrawal rate from Trinity Study. Assumes 7% real returns and 3% inflation. Withdraw 4% annually, adjust for inflation, portfolio lasts 30+ years. Lean FIRE = minimal expenses. Fat FIRE = comfortable lifestyle.
        </div>
      </div>
    </main>
  )
}
