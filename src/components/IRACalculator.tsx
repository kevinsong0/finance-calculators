'use client'

import { useState } from 'react'

export default function IRACalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [contribution, setContribution] = useState('')
  const [currentBalance, setCurrentBalance] = useState('')
  const [growth, setGrowth] = useState('7')
  const [iraType, setIraType] = useState('traditional')

  const calculate = () => {
    const age = parseInt(currentAge) || 30
    const annualContrib = parseFloat(contribution) || 0
    const balance = parseFloat(currentBalance) || 0
    const rate = parseFloat(growth) || 7
    const yearsToRetirement = Math.max(0, 65 - age)
    
    const maxContrib = age >= 50 ? 8000 : 7000
    const actualContrib = Math.min(annualContrib, maxContrib)
    
    const futureValue = balance * Math.pow(1 + rate/100, yearsToRetirement) + 
      actualContrib * ((Math.pow(1 + rate/100, yearsToRetirement) - 1) / (rate/100))
    
    const totalContributed = balance + actualContrib * yearsToRetirement
    const earnings = futureValue - totalContributed
    
    let taxImpact = ''
    if (iraType === 'traditional') {
      taxImpact = `Tax savings: $${(actualContrib * 0.22).toFixed(0)} annually (at 22% rate)`
    } else {
      taxImpact = `No current tax savings; tax-free withdrawals at retirement`
    }

    return { 
      futureValue, 
      totalContributed, 
      earnings, 
      maxContrib,
      actualContrib,
      yearsToRetirement,
      taxImpact 
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">IRA Calculator</h1>
      <p className="text-zinc-600">Calculate IRA growth and compare Traditional vs Roth benefits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">IRA Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Your age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Contribution ($)</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={`Max: $${result.maxContrib}`}
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Balance ($)</label>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Existing IRA balance"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">IRA Type</label>
            <select
              value={iraType}
              onChange={(e) => setIraType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="traditional">Traditional IRA</option>
              <option value="roth">Roth IRA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Growth (%)</label>
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
        <h3 className="font-medium mb-4">IRA Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Years to 65</div>
            <div className="text-xl font-bold text-blue-600">{result.yearsToRetirement}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Max Contribution</div>
            <div className="text-xl font-bold text-zinc-600">${result.maxContrib}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Total Contributed</div>
            <div className="text-xl font-bold text-zinc-600">${result.totalContributed.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Investment Earnings</div>
            <div className="text-xl font-bold text-green-600">${result.earnings.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded col-span-2 text-center">
            <div className="text-zinc-500">Future Value at 65</div>
            <div className="text-2xl font-bold text-purple-600">${result.futureValue.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">{iraType === 'traditional' ? 'Traditional' : 'Roth'} IRA Tax Impact</h3>
        <div className="bg-white rounded p-3 text-sm text-zinc-600">
          {result.taxImpact}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">IRA Comparison</h3>
        <div className="text-xs text-zinc-600">
          Traditional: Tax deduction now, taxed withdrawals later. Roth: No deduction now, tax-free withdrawals later. Income limits for Roth eligibility. Catch-up contribution $1,000 at age 50+. Withdrawals penalty-free after 59.5.
        </div>
      </div>
    </main>
  )
}
