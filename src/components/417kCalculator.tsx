'use client'

import { useState } from 'react'

export default function FourOneKCalculator() {
  const [income, setIncome] = useState('')
  const [contributionPercent, setContributionPercent] = useState('')
  const [employerMatch, setEmployerMatch] = useState('')
  const [years, setYears] = useState('')
  const [growth, setGrowth] = useState('7')

  const calculate = () => {
    const annualIncome = parseFloat(income) || 0
    const contribution = parseFloat(contributionPercent) || 0
    const matchPercent = parseFloat(employerMatch) || 0
    const yearsNum = parseFloat(years) || 0
    const growthRate = parseFloat(growth) || 7
    
    const employeeContrib = annualIncome * contribution / 100
    const employerContrib = annualIncome * Math.min(matchPercent, contribution) / 100
    const totalAnnual = employeeContrib + employerContrib
    
    const futureValue = totalAnnual * ((Math.pow(1 + growthRate/100, yearsNum) - 1) / (growthRate/100))
    const totalContributed = totalAnnual * yearsNum
    
    return { 
      employeeContrib, 
      employerContrib, 
      totalAnnual, 
      futureValue, 
      totalContributed, 
      earnings: futureValue - totalContributed
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">401(k) Calculator</h1>
      <p className="text-zinc-600">Calculate 401(k) growth with employer matching contributions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">401(k) Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Salary ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Your annual salary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Contribution (%)</label>
            <input
              type="number"
              value={contributionPercent}
              onChange={(e) => setContributionPercent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., 6"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Employer Match (%)</label>
            <input
              type="number"
              value={employerMatch}
              onChange={(e) => setEmployerMatch(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., 3 (100% match up to 3%)"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years to Retirement</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Years until retirement"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Growth Rate (%)</label>
            <input
              type="number"
              value={growth}
              onChange={(e) => setGrowth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Default 7%"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Annual Contributions</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Your Contribution</div>
            <div className="text-xl font-bold text-blue-600">${result.employeeContrib.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Employer Match</div>
            <div className="text-xl font-bold text-green-600">${result.employerContrib.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Total Annual</div>
            <div className="text-xl font-bold text-purple-600">${result.totalAnnual.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Projected Value at Retirement</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Total Contributed</div>
            <div className="text-xl font-bold text-zinc-600">${result.totalContributed.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Investment Earnings</div>
            <div className="text-xl font-bold text-green-600">${result.earnings.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded col-span-2 text-center">
            <div className="text-zinc-500">Future Value</div>
            <div className="text-2xl font-bold text-purple-600">${result.futureValue.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">401(k) Tips</h3>
        <div className="text-xs text-zinc-600">
          Max contribution $23,000 (2024). Employer match is free money - always contribute enough to get full match. Traditional 401(k) reduces current taxable income. Roth 401(k) provides tax-free retirement withdrawals. Early withdrawal penalty 10% before age 59.5.
        </div>
      </div>
    </main>
  )
}
