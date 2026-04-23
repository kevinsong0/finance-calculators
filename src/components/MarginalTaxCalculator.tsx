'use client'

import { useState } from 'react'

export default function MarginalTaxCalculator() {
  const [currentIncome, setCurrentIncome] = useState('')
  const [additionalIncome, setAdditionalIncome] = useState('')
  const [status, setStatus] = useState('single')

  const brackets = {
    single: [11600, 47150, 100525, 191950, 243725, 609350],
    married: [23200, 94300, 201050, 383900, 487450, 731200],
  }

  const rates = [10, 12, 22, 24, 32, 35, 37]

  const getMarginalRate = (income: number, bracketList: number[]) => {
    for (let i = 0; i < bracketList.length; i++) {
      if (income <= bracketList[i]) return rates[i]
    }
    return rates[rates.length - 1]
  }

  const calculate = () => {
    const current = parseFloat(currentIncome) || 0
    const additional = parseFloat(additionalIncome) || 0
    const newTotal = current + additional
    const bracketList = brackets[status as keyof typeof brackets]

    const currentRate = getMarginalRate(current, bracketList)
    const newRate = getMarginalRate(newTotal, bracketList)
    
    const taxOnAdditional = additional * newRate / 100
    const keepAmount = additional - taxOnAdditional
    const crossesBracket = currentRate !== newRate

    return { currentRate, newRate, taxOnAdditional, keepAmount, crossesBracket }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Marginal Tax Calculator</h1>
      <p className="text-zinc-600">Calculate tax impact of additional income at your marginal rate.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Income ($)</label>
            <input
              type="number"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Your current income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Additional Income ($)</label>
            <input
              type="number"
              value={additionalIncome}
              onChange={(e) => setAdditionalIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Extra income (bonus, raise)"
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
        <h3 className="font-medium mb-4">Marginal Tax Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Current Marginal Rate</div>
            <div className="text-2xl font-bold text-blue-600">{result.currentRate}%</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">New Marginal Rate</div>
            <div className="text-2xl font-bold text-orange-600">{result.newRate}%</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Tax on Additional</div>
            <div className="text-2xl font-bold text-red-600">${result.taxOnAdditional.toFixed(2)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">You Keep</div>
            <div className="text-2xl font-bold text-green-600">${result.keepAmount.toFixed(2)}</div>
          </div>
        </div>
        {result.crossesBracket && (
          <div className="bg-yellow-50 rounded p-2 mt-3 text-xs text-yellow-700">
            Warning: Additional income crosses into higher tax bracket!
          </div>
        )}
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Marginal Tax Tips</h3>
        <div className="text-xs text-zinc-600">
          Marginal rate determines tax on additional income. Each dollar in higher bracket taxed more. Consider timing of income to manage bracket crossing. Retirement contributions can reduce taxable income. Tax planning helps optimize bracket positioning.
        </div>
      </div>
    </main>
  )
}
