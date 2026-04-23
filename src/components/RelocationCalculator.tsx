'use client'

import { useState } from 'react'

export default function RelocationCalculator() {
  const [movingCost, setMovingCost] = useState('')
  const [housingDiff, setHousingDiff] = useState('')
  const [salaryDiff, setSalaryDiff] = useState('')
  const [months, setMonths] = useState('12')

  const calculate = () => {
    const moving = parseFloat(movingCost) || 0
    const housing = parseFloat(housingDiff) || 0
    const salary = parseFloat(salaryDiff) || 0
    const monthsNum = parseFloat(months) || 12
    
    const monthlyBenefit = salary + housing
    const netBenefit = monthlyBenefit * monthsNum - moving
    const breakEvenMonths = moving / Math.max(0.01, monthlyBenefit)
    const roi = (netBenefit / moving) * 100

    return { monthlyBenefit, netBenefit, breakEvenMonths, roi, isPositive: netBenefit > 0 }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Relocation ROI Calculator</h1>
      <p className="text-zinc-600">Calculate financial return of relocating for a job or lifestyle.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Relocation Costs & Benefits</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Moving Costs ($)</label>
            <input
              type="number"
              value={movingCost}
              onChange={(e) => setMovingCost(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Moving company, travel, setup"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Housing Difference ($)</label>
            <input
              type="number"
              value={housingDiff}
              onChange={(e) => setHousingDiff(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Negative if cheaper, positive if more expensive"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Salary Difference ($)</label>
            <input
              type="number"
              value={salaryDiff}
              onChange={(e) => setSalaryDiff(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="New salary minus current salary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Analysis Period (months)</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="12"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Relocation ROI</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Monthly Benefit</div>
            <div className={`text-xl font-bold ${result.monthlyBenefit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${result.monthlyBenefit.toFixed(0)}
            </div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Break Even</div>
            <div className="text-xl font-bold text-blue-600">{result.breakEvenMonths.toFixed(1)} months</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Net Benefit</div>
            <div className={`text-xl font-bold ${result.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ${result.netBenefit.toFixed(0)}
            </div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">ROI</div>
            <div className={`text-xl font-bold ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {result.roi.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Relocation Considerations</h3>
        <div className="text-xs text-zinc-600">
          Factor in: job stability, career growth, lifestyle quality, family impact, commute changes. Moving costs include packing, shipping, travel, temporary housing, setup fees. Employer relocation packages may cover costs. Consider non-financial benefits: weather, culture, proximity to family.
        </div>
      </div>
    </main>
  )
}
