'use client'

import { useState } from 'react'

export default function CollegeSavingsCalculator() {
  const [childAge, setChildAge] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [collegeCost, setCollegeCost] = useState('25000')
  const [collegeYears, setCollegeYears] = useState('4')
  const [collegeType, setCollegeType] = useState('public')
  const [returnRate, setReturnRate] = useState('6')

  const calculate = () => {
    const age = parseInt(childAge) || 5
    const savings = parseFloat(currentSavings) || 0
    const monthly = parseFloat(monthlyContribution) || 200
    const cost = parseFloat(collegeCost) || 25000
    const years = parseInt(collegeYears) || 4
    const rate = parseFloat(returnRate) || 6
    const type = collegeType

    // Years until college
    const yearsToCollege = 18 - age

    // Future value of current savings
    const futureValueCurrent = savings * Math.pow(1 + rate / 100, yearsToCollege)

    // Future value of monthly contributions (compound interest)
    const monthlyRate = rate / 100 / 12
    const months = yearsToCollege * 12
    const futureValueContributions = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))

    // Total projected savings
    const totalProjected = futureValueCurrent + futureValueContributions

    // Total college cost (with 5% annual inflation)
    const inflationRate = 5
    const inflatedAnnualCost = cost * Math.pow(1 + inflationRate / 100, yearsToCollege)
    const totalCollegeCost = inflatedAnnualCost * years

    // Shortfall or surplus
    const shortfall = Math.max(0, totalCollegeCost - totalProjected)
    const surplus = Math.max(0, totalProjected - totalCollegeCost)

    // Monthly needed to meet goal
    const monthlyNeeded = shortfall > 0 ?
      (shortfall / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))) : 0

    // 529 plan tax savings estimate (state tax deduction varies)
    const totalContributions = monthly * months + savings
    const taxSavingsEstimate = totalContributions * 0.05 // Approximate 5% state tax benefit

    return {
      yearsToCollege: Math.max(0, yearsToCollege),
      totalProjected: totalProjected.toFixed(2),
      totalCollegeCost: totalCollegeCost.toFixed(2),
      inflatedAnnualCost: inflatedAnnualCost.toFixed(2),
      shortfall: shortfall.toFixed(2),
      surplus: surplus.toFixed(2),
      monthlyNeeded: monthlyNeeded.toFixed(2),
      isOnTrack: shortfall === 0,
      coveragePercent: Math.min(100, (totalProjected / totalCollegeCost) * 100).toFixed(1),
      taxSavingsEstimate: taxSavingsEstimate.toFixed(2),
      totalContributions: totalContributions.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">College Savings Calculator (529 Plan)</h1>
      <p className="text-zinc-600">Plan your child's education savings with tax-advantaged 529 plans.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Situation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Child's Current Age</label>
            <input
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter child's age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current College Savings</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current savings"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Contribution</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter monthly savings amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">College Type</label>
            <select
              value={collegeType}
              onChange={(e) => {
                setCollegeType(e.target.value)
                if (e.target.value === 'public') setCollegeCost('25000')
                else if (e.target.value === 'private') setCollegeCost('55000')
                else setCollegeCost('15000')
              }}
              className="w-full p-2 border rounded"
            >
              <option value="public">Public University ($25,000/year)</option>
              <option value="private">Private University ($55,000/year)</option>
              <option value="community">Community College ($15,000/year)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Return Rate (%)</label>
            <select
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="4">4% (Conservative)</option>
              <option value="6">6% (Moderate)</option>
              <option value="8">8% (Aggressive)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Savings Projection</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Years Until College</div>
            <div className="text-2xl font-bold">{result.yearsToCollege}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Projected Savings</div>
            <div className="text-2xl font-bold text-green-600">$${result.totalProjected}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total College Cost</div>
            <div className="text-2xl font-bold text-blue-600">$${result.totalCollegeCost}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Coverage</div>
            <div className="text-2xl font-bold">{result.coveragePercent}%</div>
          </div>
        </div>
      </div>

      {result.isOnTrack ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">On Track!</h3>
          <div className="text-sm text-green-600">
            Your projected savings exceed estimated costs. Surplus: $${result.surplus}
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Shortfall Detected</h3>
          <div className="text-sm text-yellow-600">
            Estimated shortfall: $${result.shortfall}. Consider increasing monthly contribution to $${result.monthlyNeeded}/month.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">529 Plan Benefits</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Tax-Free Growth</strong>
            <div className="text-zinc-500">Earnings grow tax-free when used for qualified education expenses</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>State Tax Deduction</strong>
            <div className="text-zinc-500">Estimated tax savings: $${result.taxSavingsEstimate} (varies by state)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>High Contribution Limits</strong>
            <div className="text-zinc-500">Most states allow $300,000+ per beneficiary</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Estimates</h3>
        <div className="text-xs text-zinc-600">
          Current costs: Public ~$25,000/year, Private ~$55,000/year, Community ~$15,000/year. Costs include tuition, fees, room & board. Assumes 5% annual inflation. 4-year degree shown. Graduate school costs significantly more.
        </div>
      </div>
    </main>
  )
}