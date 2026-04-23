'use client'

import { useState } from 'react'

export default function RentalPropertyDepreciationMethodsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000)
  const [buildingValue, setBuildingValue] = useState(250000)
  const [landValue, setLandValue] = useState(50000)
  const [purchaseDate, setPurchaseDate] = useState('2020-01')
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential')
  const [depreciationMethod, setDepreciationMethod] = useState<'straightLine' | 'accelerated'>('straightLine')
  const [bonusDepreciation, setBonusDepreciation] = useState(0)
  const [section179, setSection179] = useState(0)
  const [improvements, setImprovements] = useState(20000)

  const calculate = () => {
    // Rental Property Depreciation Methods Calculator
    // Compare depreciation methods for rental property

    // Rules:
    // Residential: 27.5 years (MACRS straight-line)
    // Commercial: 39 years (MACRS straight-line)
    // Land: not depreciable
    // Accelerated: not allowed for rental real estate after 1986
    // Bonus: 60% for 2024 (placed in service before 2027)
    // Section 179: NOT allowed for rental property

    const usefulLife = propertyType === 'residential' ? 27.5 : 39
    const monthsInService = 12 // Full year for simplicity

    // Calculate depreciable basis
    const depreciableBasis = buildingValue + improvements - section179

    // Bonus depreciation (first year)
    const bonusDepreciationAmount = depreciableBasis * (bonusDepreciation / 100)
    const basisAfterBonus = depreciableBasis - bonusDepreciationAmount

    // Annual depreciation (straight-line)
    const annualDepreciation = basisAfterBonus / usefulLife

    // Mid-month convention (for real estate)
    // Property placed in service mid-month, so first year is prorated
    const firstYearFactor = 0.5 // Simplified - mid-month average
    const firstYearDepreciation = annualDepreciation * firstYearFactor + bonusDepreciationAmount

    // Total depreciation over useful life
    const totalDepreciation = basisAfterBonus + bonusDepreciationAmount

    // Depreciation schedule (first 10 years)
    const schedule = []
    let accumulated = 0
    for (let year = 1; year <= Math.min(10, usefulLife); year++) {
      const yearly = year === 1 ? firstYearDepreciation : annualDepreciation
      accumulated += yearly
      schedule.push({
        year,
        depreciation: yearly,
        accumulated,
        remainingBasis: depreciableBasis - accumulated,
      })
    }

    // Tax savings per year
    const taxRate = 0.24 // Simplified marginal rate
    const taxSavingsFirstYear = firstYearDepreciation * taxRate
    const taxSavingsAnnual = annualDepreciation * taxRate
    const totalTaxSavings = totalDepreciation * taxRate

    // Comparison of methods
    // Note: Accelerated depreciation not available for rental real estate
    const methodComparison = [
      { method: 'Straight-Line (MACRS)', recoveryPeriod: usefulLife, firstYear: firstYearDepreciation, annual: annualDepreciation, allowed: true },
      { method: 'Accelerated (MACRS)', recoveryPeriod: usefulLife, firstYear: 0, annual: 0, allowed: false, note: 'Not allowed for rental real estate after 1986' },
      { method: 'Bonus + Straight-Line', recoveryPeriod: usefulLife, firstYear: firstYearDepreciation, annual: annualDepreciation, allowed: bonusDepreciation > 0 },
    ]

    // Recommendation
    let recommendation = ''
    if (bonusDepreciation > 0) {
      recommendation = `Bonus depreciation (${bonusDepreciation}%) accelerates deduction. First year: $${firstYearDepreciation.toFixed(0)} (includes $${bonusDepreciationAmount.toFixed(0)} bonus). Tax savings: $${taxSavingsFirstYear.toFixed(0)}. Remaining basis depreciated over ${usefulLife} years.`
    } else {
      recommendation = `Standard MACRS straight-line over ${usefulLife} years. Annual depreciation: $${annualDepreciation.toFixed(0)}. First year (mid-month): $${firstYearDepreciation.toFixed(0)}. Tax savings: $${taxSavingsAnnual.toFixed(0)} per year.`
    }

    if (section179 > 0) {
      recommendation += ` WARNING: Section 179 not allowed for rental property. Must remove from calculation.`
    }

    // Key points
    const keyPoints = [
      `Residential: 27.5 years`,
      `Commercial: 39 years`,
      `Land not depreciable`,
      `Straight-line only for rental`,
      `Mid-month convention`,
      `Bonus depreciation available`,
      `Section 179 NOT allowed`,
      `Improvements: 27.5/39 years`,
      `Separate land/building`,
      `Form 4562 for reporting`,
    ]

    return {
      purchasePrice: purchasePrice.toFixed(0),
      buildingValue: buildingValue.toFixed(0),
      landValue: landValue.toFixed(0),
      purchaseDate,
      propertyType,
      usefulLife: usefulLife.toFixed(1),
      depreciableBasis: depreciableBasis.toFixed(0),
      bonusDepreciation: bonusDepreciation.toFixed(0),
      bonusDepreciationAmount: bonusDepreciationAmount.toFixed(0),
      basisAfterBonus: basisAfterBonus.toFixed(0),
      annualDepreciation: annualDepreciation.toFixed(0),
      firstYearDepreciation: firstYearDepreciation.toFixed(0),
      totalDepreciation: totalDepreciation.toFixed(0),
      taxSavingsFirstYear: taxSavingsFirstYear.toFixed(0),
      taxSavingsAnnual: taxSavingsAnnual.toFixed(0),
      totalTaxSavings: totalTaxSavings.toFixed(0),
      schedule,
      methodComparison,
      section179: section179.toFixed(0),
      improvements: improvements.toFixed(0),
      recommendation,
      keyPoints,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rental Property Depreciation Methods Calculator</h1>
      <p className="text-gray-600 mb-4">Compare depreciation methods for rental real estate.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Price</label>
          <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Building Value</label>
          <input type="number" value={buildingValue} onChange={(e) => setBuildingValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Land Value (not depreciable)</label>
          <input type="number" value={landValue} onChange={(e) => setLandValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as 'residential' | 'commercial')} className="w-full border rounded p-2">
            <option value="residential">Residential (27.5 years)</option>
            <option value="commercial">Commercial (39 years)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capital Improvements</label>
          <input type="number" value={improvements} onChange={(e) => setImprovements(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bonus Depreciation (%)</label>
          <select value={bonusDepreciation} onChange={(e) => setBonusDepreciation(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="0">None (0%)</option>
            <option value="60">60% (2024)</option>
            <option value="40">40% (2025)</option>
            <option value="20">20% (2026)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Section 179 (not allowed)</label>
          <input type="number" value={section179} onChange={(e) => setSection179(Number(e.target.value))} className="w-full border rounded p-2" />
          <div className="text-xs text-red-600">Section 179 not applicable to rental property</div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Depreciable Basis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Building:</span><span className="font-medium ml-2">$ {result.buildingValue}</span></div>
          <div><span className="text-zinc-600">Improvements:</span><span className="font-medium ml-2">$ {result.improvements}</span></div>
          <div><span className="text-zinc-600">Land:</span><span className="font-medium text-zinc-500 ml-2">$ {result.landValue} (excluded)</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Depreciable Basis:</span><span className="font-bold ml-2">$ {result.depreciableBasis}</span></div>
          <div><span className="text-zinc-600">Recovery Period:</span><span className="font-bold ml-2">{result.usefulLife} years</span></div>
        </div>
      </div>

      {Number(result.bonusDepreciation) > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Bonus Depreciation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Rate:</span><span className="font-bold ml-2">{result.bonusDepreciation}%</span></div>
            <div><span className="text-zinc-600">Amount:</span><span className="font-bold text-green-700 ml-2">$ {result.bonusDepreciationAmount}</span></div>
            <div><span className="text-zinc-600">Remaining Basis:</span><span className="font-medium ml-2">$ {result.basisAfterBonus}</span></div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Depreciation Schedule (First 10 Years)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Depreciation</th>
                <th className="py-2 text-left">Accumulated</th>
                <th className="py-2 text-left">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((s) => (
                <tr key={s.year} className="border-b">
                  <td className="py-1">{s.year}</td>
                  <td className="py-1">$ {s.depreciation.toFixed(0)}</td>
                  <td className="py-1">$ {s.accumulated.toFixed(0)}</td>
                  <td className="py-1">$ {s.remainingBasis.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Method Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Method</th>
                <th className="py-2 text-left">Recovery</th>
                <th className="py-2 text-left">First Year</th>
                <th className="py-2 text-left">Annual</th>
                <th className="py-2 text-left">Allowed?</th>
              </tr>
            </thead>
            <tbody>
              {result.methodComparison.map((m) => (
                <tr key={m.method} className="border-b">
                  <td className="py-1 font-semibold">{m.method}</td>
                  <td className="py-1">{m.recoveryPeriod} yrs</td>
                  <td className="py-1">$ {m.firstYear.toFixed(0)}</td>
                  <td className="py-1">$ {m.annual.toFixed(0)}</td>
                  <td className="py-1"><span className={m.allowed ? 'text-green-700' : 'text-red-700'}>{m.allowed ? 'Yes' : 'No'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">First Year:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavingsFirstYear}</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className="font-medium ml-2">$ {result.taxSavingsAnnual}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-green-700 ml-2">$ {result.totalTaxSavings}</span></div>
        </div>
      </div>

      {Number(result.section179) > 0 && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Section 179 Warning</h2>
          <div className="text-xs text-zinc-600">Section 179 not allowed for rental property. Must use regular MACRS depreciation. Remove Section 179 amount from calculation.</div>
        </div>
      )}

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Depreciation Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.keyPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}