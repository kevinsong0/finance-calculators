'use client'

import { useState } from 'react'

export default function AnnuityCalculator() {
  const [annuityType, setAnnuityType] = useState('immediate')
  const [principal, setPrincipal] = useState('')
  const [payoutFrequency, setPayoutFrequency] = useState('monthly')
  const [payoutYears, setPayoutYears] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [monthlyPayout, setMonthlyPayout] = useState('')

  const calculate = () => {
    const amount = parseFloat(principal) || 100000
    const years = parseInt(payoutYears) || 20
    const rate = parseFloat(interestRate) || 4
    const monthly = parseFloat(monthlyPayout) || 0
    const type = annuityType
    const freq = payoutFrequency

    const annualRate = rate / 100
    const periodsPerYear = freq === 'monthly' ? 12 : freq === 'quarterly' ? 4 : freq === 'annual' ? 1 : 12
    const periodRate = annualRate / periodsPerYear
    const totalPeriods = years * periodsPerYear

    // Immediate annuity: Calculate payout from principal
    let payoutPerPeriod = 0
    if (type === 'immediate') {
      // Payout formula: P = PV * r / (1 - (1 + r)^-n)
      if (periodRate > 0) {
        payoutPerPeriod = amount * periodRate / (1 - Math.pow(1 + periodRate, -totalPeriods))
      } else {
        payoutPerPeriod = amount / totalPeriods
      }
    } else if (type === 'deferred') {
      // Deferred annuity: Future value calculation
      const deferralYears = 10
      const futureValue = amount * Math.pow(1 + annualRate, deferralYears)
      if (periodRate > 0) {
        payoutPerPeriod = futureValue * periodRate / (1 - Math.pow(1 + periodRate, -totalPeriods))
      } else {
        payoutPerPeriod = futureValue / totalPeriods
      }
    } else if (type === 'fixed') {
      // Fixed period annuity
      payoutPerPeriod = monthly > 0 ? monthly : amount / totalPeriods
    }

    const annualPayout = payoutPerPeriod * periodsPerYear
    const totalPayout = payoutPerPeriod * totalPeriods
    const totalInterest = totalPayout - amount
    const payoutRatio = totalPayout / amount

    // Calculate required principal for desired payout
    const desiredMonthly = monthly > 0 ? monthly : payoutPerPeriod
    const requiredPrincipal = type === 'immediate' ?
      desiredMonthly * (1 - Math.pow(1 + periodRate, -totalPeriods)) / periodRate : amount

    return {
      payoutPerPeriod: payoutPerPeriod.toFixed(2),
      annualPayout: annualPayout.toFixed(2),
      totalPayout: totalPayout.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      payoutRatio: payoutRatio.toFixed(2),
      principal: amount.toFixed(2),
      payoutFrequency: freq,
      annuityType: type,
      years: years,
      effectiveRate: ((payoutRatio - 1) / years * 100).toFixed(1),
      monthlyEquivalent: freq === 'monthly' ? payoutPerPeriod.toFixed(2) : (annualPayout / 12).toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Annuity Calculator</h1>
      <p className="text-zinc-600">Calculate annuity payouts, compare types, and plan retirement income streams.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Annuity Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annuity Type</label>
            <select
              value={annuityType}
              onChange={(e) => setAnnuityType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="immediate">Immediate Annuity</option>
              <option value="deferred">Deferred Annuity</option>
              <option value="fixed">Fixed Period Annuity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Principal Amount</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter investment amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual rate"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Payout Period (Years)</label>
            <input
              type="number"
              value={payoutYears}
              onChange={(e) => setPayoutYears(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter payout duration"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Payout Frequency</label>
            <select
              value={payoutFrequency}
              onChange={(e) => setPayoutFrequency(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Annuity Payout</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">{result.payoutFrequency === 'monthly' ? 'Monthly' : result.payoutFrequency === 'quarterly' ? 'Quarterly' : 'Annual'} Payout</div>
            <div className="text-2xl font-bold text-green-600">$${result.payoutPerPeriod}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Income</div>
            <div className="text-2xl font-bold text-green-600">$${result.annualPayout}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Payout</div>
            <div className="text-2xl font-bold text-blue-600">$${result.totalPayout}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Payout Ratio</div>
            <div className="text-2xl font-bold">{result.payoutRatio}x</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Principal Invested</div>
            <div className="font-bold">$${result.principal}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Interest Earned</div>
            <div className="font-bold text-blue-600">$${result.totalInterest}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Monthly Equivalent</div>
            <div className="font-bold">$${result.monthlyEquivalent}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Effective Rate</div>
            <div className="font-bold">{result.effectiveRate}%/yr</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Annuity Types Explained</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Immediate Annuity</strong>
            <div className="text-zinc-500">Begin payouts within 1 year of purchase. Ideal for immediate retirement income.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Deferred Annuity</strong>
            <div className="text-zinc-500">Payouts start years later, allowing principal growth. Better for early planning.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Fixed Period Annuity</strong>
            <div className="text-zinc-500">Guaranteed payouts for a set period. Principal depleted over time.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Annuity Considerations</h3>
        <div className="text-xs text-zinc-600">
          Annuities provide guaranteed income but have fees and limited flexibility. Consider inflation risk (fixed payments lose purchasing power). Lifetime annuities continue until death but may not pass to heirs. Compare with other retirement income options before purchasing.
        </div>
      </div>
    </main>
  )
}