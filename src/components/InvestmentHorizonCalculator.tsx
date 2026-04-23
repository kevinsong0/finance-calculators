'use client'

import { useState } from 'react'

export default function InvestmentHorizonCalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [goalAge, setGoalAge] = useState('')
  const [goalType, setGoalType] = useState('retirement')

  const calculate = () => {
    const current = parseInt(currentAge) || 30
    const goal = parseInt(goalAge) || 65
    const horizon = goal - current
    
    let recommendations = ''
    let riskLevel = ''
    
    if (horizon >= 30) {
      riskLevel = 'High'
      recommendations = 'Aggressive growth portfolio: 80-90% stocks, focus on long-term compound growth. Consider emerging markets and growth sectors.'
    } else if (horizon >= 20) {
      riskLevel = 'Medium-High'
      recommendations = 'Growth-focused portfolio: 70-80% stocks, begin including some bonds. Index funds provide diversified growth.'
    } else if (horizon >= 10) {
      riskLevel = 'Medium'
      recommendations = 'Balanced portfolio: 60% stocks, 30% bonds, 10% cash. Gradually reduce risk as goal approaches.'
    } else if (horizon >= 5) {
      riskLevel = 'Low-Medium'
      recommendations = 'Conservative growth: 40-50% stocks, 40-50% bonds. Focus on capital preservation with modest growth.'
    } else {
      riskLevel = 'Low'
      recommendations = 'Preservation focus: 20-30% stocks, 50-60% bonds, 20-30% cash. Minimize volatility risk.'
    }
    
    return { horizon, riskLevel, recommendations }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Investment Horizon Calculator</h1>
      <p className="text-zinc-600">Calculate your investment timeline and get appropriate strategy recommendations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Timeline</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your current age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Goal Age</label>
            <input
              type="number"
              value={goalAge}
              onChange={(e) => setGoalAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Age when you need the money"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Goal Type</label>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="retirement">Retirement</option>
              <option value="education">Education</option>
              <option value="house">House Purchase</option>
              <option value="emergency">Emergency Fund</option>
              <option value="vacation">Vacation/Travel</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Investment Horizon</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Years to Goal</div>
            <div className="text-2xl font-bold text-blue-600">{result.horizon} years</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Appropriate Risk</div>
            <div className="text-2xl font-bold text-purple-600">{result.riskLevel}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recommendation</h3>
        <div className="bg-white rounded p-3 text-sm text-zinc-600">
          {result.recommendations}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Horizon Guidelines</h3>
        <div className="text-xs text-zinc-600">
          Longer horizons allow higher risk for better returns. Short horizons need conservative strategies. Review horizon as life changes. Match asset allocation to timeline. Consider target-date funds for automatic adjustment.
        </div>
      </div>
    </main>
  )
}
