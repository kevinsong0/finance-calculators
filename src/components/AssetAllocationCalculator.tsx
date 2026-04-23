'use client'

import { useState } from 'react'

export default function AssetAllocationCalculator() {
  const [age, setAge] = useState('')
  const [riskTolerance, setRiskTolerance] = useState('moderate')
  const [timeline, setTimeline] = useState('long')

  const calculate = () => {
    const ageNum = parseInt(age) || 30
    let stocksBase = 100 - ageNum
    let bondsBase = ageNum
    let cashAdjustment = 0

    if (riskTolerance === 'aggressive') {
      stocksBase += 10
      bondsBase -= 10
    } else if (riskTolerance === 'conservative') {
      stocksBase -= 10
      bondsBase += 10
    }

    if (timeline === 'short') {
      stocksBase -= 20
      bondsBase += 10
      cashAdjustment = 10
    }

    stocksBase = Math.max(0, Math.min(100, stocksBase))
    bondsBase = Math.max(0, Math.min(100 - stocksBase - cashAdjustment, bondsBase))
    const cash = 100 - stocksBase - bondsBase

    return { stocks: stocksBase, bonds: bondsBase, cash }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Asset Allocation Calculator</h1>
      <p className="text-zinc-600">Determine optimal portfolio allocation based on age and risk tolerance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="conservative">Conservative (Low Risk)</option>
              <option value="moderate">Moderate (Medium Risk)</option>
              <option value="aggressive">Aggressive (High Risk)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Investment Timeline</label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="short">Short (Less than 5 years)</option>
              <option value="medium">Medium (5-10 years)</option>
              <option value="long">Long (10+ years)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Recommended Allocation</h3>
        <div className="space-y-3">
          <div className="bg-white rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Stocks/Equity</span>
              <span className="text-xl font-bold">{result.stocks}%</span>
            </div>
            <div className="w-full bg-zinc-200 rounded h-4">
              <div className="bg-green-500 h-4 rounded" style={{ width: `${result.stocks}%` }} />
            </div>
            <div className="text-xs text-zinc-500 mt-1">Higher growth potential</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Bonds/Fixed Income</span>
              <span className="text-xl font-bold">{result.bonds}%</span>
            </div>
            <div className="w-full bg-zinc-200 rounded h-4">
              <div className="bg-blue-500 h-4 rounded" style={{ width: `${result.bonds}%` }} />
            </div>
            <div className="text-xs text-zinc-500 mt-1">Stability and income</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Cash/Money Market</span>
              <span className="text-xl font-bold">{result.cash}%</span>
            </div>
            <div className="w-full bg-zinc-200 rounded h-4">
              <div className="bg-zinc-500 h-4 rounded" style={{ width: `${result.cash}%` }} />
            </div>
            <div className="text-xs text-zinc-500 mt-1">Liquidity and safety</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Allocation Guidelines</h3>
        <div className="text-xs text-zinc-600">
          Rule of 100: Subtract age from 100 for stock allocation. Younger investors should have more stocks for growth. Older investors should shift to bonds for stability. Rebalance annually. Consider target-date funds for automatic adjustment.
        </div>
      </div>
    </main>
  )
}