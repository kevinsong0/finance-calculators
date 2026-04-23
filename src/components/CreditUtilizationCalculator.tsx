'use client'

import { useState } from 'react'

export default function CreditUtilizationCalculator() {
  const [creditLimit, setCreditLimit] = useState('')
  const [currentBalance, setCurrentBalance] = useState('')
  const [targetScore, setTargetScore] = useState('good')
  const [cards, setCards] = useState([{ limit: '', balance: '' }])

  const calculate = () => {
    const limit = parseFloat(creditLimit) || 10000
    const balance = parseFloat(currentBalance) || 3000
    const target = targetScore

    // Current utilization
    const utilization = (balance / limit) * 100

    // Recommended utilization by target score
    const targetUtilizations: Record<string, number> = {
      'excellent': 10,
      'good': 30,
      'fair': 50,
      'any': 100
    }
    const targetUtil = targetUtilizations[target] || 30

    // Calculate optimal balance
    const optimalBalance = limit * (targetUtil / 100)
    const reductionNeeded = Math.max(0, balance - optimalBalance)

    // Impact on score estimate
    const scoreImpact = utilization <= 10 ? '+30-50 pts' :
                        utilization <= 30 ? '0-20 pts' :
                        utilization <= 50 ? '-10-30 pts' :
                        utilization <= 70 ? '-30-60 pts' :
                        '-50-100 pts'

    // Multi-card calculation
    let totalLimit = limit
    let totalBalance = balance
    cards.forEach((c) => {
      totalLimit += parseFloat(c.limit) || 0
      totalBalance += parseFloat(c.balance) || 0
    })
    const totalUtilization = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0

    // Per-card utilization warning
    const perCardUtilization = (balance / limit) * 100

    // Days to pay down (assuming payment rate)
    const monthlyPayment = 500
    const daysToTarget = reductionNeeded > 0 ? Math.ceil((reductionNeeded / monthlyPayment) * 30) : 0

    return {
      utilization: utilization.toFixed(1),
      optimalBalance: optimalBalance.toFixed(2),
      reductionNeeded: reductionNeeded.toFixed(2),
      scoreImpact,
      targetUtil: targetUtil.toString(),
      targetScore: target,
      optimalUtilization: targetUtil,
      totalLimit: totalLimit.toFixed(2),
      totalBalance: totalBalance.toFixed(2),
      totalUtilization: totalUtilization.toFixed(1),
      perCardUtilization: perCardUtilization.toFixed(1),
      daysToTarget,
      isGood: utilization <= targetUtil,
      creditLimit: limit.toFixed(2),
      currentBalance: balance.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Credit Utilization Calculator</h1>
      <p className="text-zinc-600">Calculate credit utilization and its impact on your credit score.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Credit Card Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Credit Limit</label>
            <input
              type="number"
              value={creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total credit limit"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Balance</label>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current balance"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Credit Score Category</label>
            <select
              value={targetScore}
              onChange={(e) => setTargetScore(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="excellent">Excellent (Utilization under 10%)</option>
              <option value="good">Good (Utilization under 30%)</option>
              <option value="fair">Fair (Utilization under 50%)</option>
              <option value="any">Any Score</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Utilization Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Current Utilization</div>
            <div className={`text-2xl font-bold ${result.isGood ? 'text-green-600' : 'text-red-600'}`}>
              {result.utilization}%
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Target Utilization</div>
            <div className="text-2xl font-bold">{result.optimalUtilization}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Optimal Balance</div>
            <div className="text-2xl font-bold text-green-600">$${result.optimalBalance}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Estimated Score Impact</div>
            <div className="text-lg font-bold">{result.scoreImpact}</div>
          </div>
        </div>
      </div>

      {!result.isGood && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Reduce Balance to Improve Score</h3>
          <div className="text-sm text-yellow-600">
            Pay down $${result.reductionNeeded} to reach {result.optimalUtilization}% utilization. Estimated {result.daysToTarget} days at $500/month payments.
          </div>
        </div>
      )}

      {result.isGood && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Utilization is Healthy</h3>
          <div className="text-sm text-green-600">
            Your {result.utilization}% utilization is within the recommended {result.optimalUtilization}% range for {result.targetScore} credit score.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Utilization Impact on Score</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Under 10%</strong>
            <div className="text-green-600">Excellent impact (+30-50 pts)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>10-30%</strong>
            <div className="text-zinc-600">Good impact (0-20 pts)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>30-50%</strong>
            <div className="text-yellow-600">Fair impact (-10-30 pts)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Over 50%</strong>
            <div className="text-red-600">Negative impact (-30+ pts)</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips to Lower Utilization</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Pay Before Statement Date</strong>
            <div className="text-zinc-500">Reduce balance before it's reported to bureaus</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Request Credit Limit Increase</strong>
            <div className="text-zinc-500">Higher limit lowers utilization ratio automatically</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Spread Balances Across Cards</strong>
            <div className="text-zinc-500">Avoid maxing out any single card</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Use Less Than 30%</strong>
            <div className="text-zinc-500">Keep balances well below limits consistently</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Score Factors</h3>
        <div className="text-xs text-zinc-600">
          Utilization accounts for 30% of FICO score (second largest factor). Payment history is 35%. Length of history 15%. New credit 10%. Credit mix 10%. Keep utilization low for maximum score benefit.
        </div>
      </div>
    </main>
  )
}