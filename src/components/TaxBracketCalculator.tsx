'use client'

import { useState } from 'react'

export default function TaxBracketCalculator() {
  const [income, setIncome] = useState('')
  const [status, setStatus] = useState('single')

  const brackets = {
    single: [
      { min: 0, max: 11600, rate: 10 },
      { min: 11600, max: 47150, rate: 12 },
      { min: 47150, max: 100525, rate: 22 },
      { min: 100525, max: 191950, rate: 24 },
      { min: 191950, max: 243725, rate: 32 },
      { min: 243725, max: 609350, rate: 35 },
      { min: 609350, max: Infinity, rate: 37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 10 },
      { min: 23200, max: 94300, rate: 12 },
      { min: 94300, max: 201050, rate: 22 },
      { min: 201050, max: 383900, rate: 24 },
      { min: 383900, max: 487450, rate: 32 },
      { min: 487450, max: 731200, rate: 35 },
      { min: 731200, max: Infinity, rate: 37 },
    ],
  }

  const calculate = () => {
    const incomeNum = parseFloat(income) || 0
    const selectedBrackets = brackets[status as keyof typeof brackets]
    
    let totalTax = 0
    let bracketBreakdown = []
    
    for (const bracket of selectedBrackets) {
      if (incomeNum > bracket.min) {
        const taxableInBracket = Math.min(incomeNum, bracket.max) - bracket.min
        const taxInBracket = taxableInBracket * bracket.rate / 100
        totalTax += taxInBracket
        bracketBreakdown.push({
          rate: bracket.rate,
          taxable: taxableInBracket,
          tax: taxInBracket,
        })
      }
    }
    
    const effectiveRate = incomeNum > 0 ? (totalTax / incomeNum) * 100 : 0
    const marginalBracket = selectedBrackets.find(b => incomeNum > b.min && incomeNum <= b.max) || selectedBrackets[selectedBrackets.length - 1]
    
    return { totalTax, effectiveRate, bracketBreakdown, marginalRate: marginalBracket.rate }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax Bracket Calculator</h1>
      <p className="text-zinc-600">Calculate federal income tax based on tax brackets and filing status.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income & Status</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Total Tax</div>
            <div className="text-2xl font-bold text-red-600">${result.totalTax.toFixed(2)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Effective Rate</div>
            <div className="text-2xl font-bold text-blue-600">{result.effectiveRate.toFixed(1)}%</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Marginal Rate</div>
            <div className="text-2xl font-bold text-orange-600">{result.marginalRate}%</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">After Tax Income</div>
            <div className="text-2xl font-bold text-green-600">${((parseFloat(income) || 0) - result.totalTax).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Bracket Breakdown</h3>
        <div className="space-y-1 text-xs">
          {result.bracketBreakdown.map((b, idx) => (
            <div key={idx} className="bg-white rounded p-2 flex justify-between">
              <span className="font-medium">{b.rate}% bracket</span>
              <span className="text-zinc-500">${b.taxable.toFixed(0)} taxed = ${b.tax.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Bracket Facts</h3>
        <div className="text-xs text-zinc-600">
          Progressive tax system: higher income pays higher rates on additional income. Marginal rate is your highest bracket. Effective rate is average across all brackets. Tax brackets adjust annually for inflation.
        </div>
      </div>
    </main>
  )
}
