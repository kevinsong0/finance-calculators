'use client'

import { useState } from 'react'

export default function DepreciationCalculator() {
  const [assetCost, setAssetCost] = useState('50000')
  const [assetType, setAssetType] = useState('equipment')
  const [placedInService, setPlacedInService] = useState('2024-01')
  const [useBonus, setUseBonus] = useState(true)
  const [useSection179, setUseSection179] = useState(false)
  const [section179Amount, setSection179Amount] = useState('0')

  const depreciationRates: Record<string, number> = {
    equipment: 5, // 5-year property
    vehicles: 5,
    computers: 5,
    furniture: 7, // 7-year property
    fixtures: 7,
    buildings: 39, // Non-residential real property
    residential: 27.5, // Residential rental property
    land: 0, // Not depreciable
  }

  const bonusDepreciationRates: Record<number, number> = {
    2024: 0.60, // 60% bonus depreciation for 2024
    2025: 0.40, // 40% for 2025
    2026: 0.20, // 20% for 2026
    2027: 0.00, // 0% after 2026
  }

  const section179Limit = 1220000 // 2024 limit
  const section179PhaseOut = 3050000 // 2024 phase-out threshold

  const calculate = () => {
    const cost = parseFloat(assetCost) || 0
    const recoveryPeriod = depreciationRates[assetType] || 5
    const yearPlaced = parseInt(placedInService.split('-')[0]) || 2024
    const bonusRate = bonusDepreciationRates[yearPlaced] || 0
    const s179Amount = parseFloat(section179Amount) || 0

    // Section 179 calculation
    let section179Eligible = cost
    if (cost > section179PhaseOut) {
      section179Eligible = Math.max(0, section179Limit - (cost - section179PhaseOut))
    }
    const actualSection179 = useSection179 ? Math.min(s179Amount, section179Eligible, section179Limit) : 0

    // Remaining basis after Section 179
    const basisAfter179 = cost - actualSection179

    // Bonus depreciation
    const bonusDepreciation = useBonus ? basisAfter179 * bonusRate : 0
    const basisAfterBonus = basisAfter179 - bonusDepreciation

    // MACRS depreciation schedule
    const halfYearConvention = 0.5 // Half-year convention for most property
    const macrsRates: Record<number, Record<number, number>> = {
      5: { 1: 0.20, 2: 0.32, 3: 0.192, 4: 0.1152, 5: 0.1152, 6: 0.0576 },
      7: { 1: 0.1429, 2: 0.2449, 3: 0.1749, 4: 0.1249, 5: 0.0893, 6: 0.0892, 7: 0.0893, 8: 0.0446 },
      27.5: { 1: 0.03636, 2: 0.03636, /* continues */ },
      39: { 1: 0.02564, 2: 0.02564, /* continues */ },
    }

    const schedule: { year: number; depreciation: number; accumulated: number }[] = []
    let accumulated = actualSection179 + bonusDepreciation

    // Calculate yearly depreciation for shorter-lived assets
    if (recoveryPeriod <= 7) {
      const rates = macrsRates[recoveryPeriod] || macrsRates[5]
      for (let year = 1; year <= recoveryPeriod + 1; year++) {
        const rate = rates[year] || 0
        const yearlyDep = basisAfterBonus * rate
        accumulated += yearlyDep
        schedule.push({
          year: yearPlaced + year - 1,
          depreciation: yearlyDep,
          accumulated: Math.min(accumulated, cost),
        })
      }
    } else {
      // Straight-line for real property
      const yearlyRate = 1 / recoveryPeriod
      const midMonthConvention = 1 / 12 // Simplified
      for (let year = 1; year <= recoveryPeriod; year++) {
        const yearlyDep = basisAfterBonus * yearlyRate * (year === 1 ? midMonthConvention * 12 : 1)
        accumulated += yearlyDep
        schedule.push({
          year: yearPlaced + year - 1,
          depreciation: yearlyDep,
          accumulated: Math.min(accumulated, cost),
        })
      }
    }

    const totalFirstYear = actualSection179 + bonusDepreciation + (schedule[0]?.depreciation || 0)
    const remainingBasis = cost - accumulated

    return {
      assetCost: cost.toFixed(2),
      recoveryPeriod,
      yearPlaced,
      bonusRate: bonusRate * 100,
      section179Amount: actualSection179.toFixed(2),
      bonusDepreciation: bonusDepreciation.toFixed(2),
      firstYearDepreciation: totalFirstYear.toFixed(2),
      schedule,
      remainingBasis: Math.max(0, remainingBasis).toFixed(2),
      totalDepreciated: Math.min(accumulated, cost).toFixed(2),
      useSection179,
      useBonus,
      assetType,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">MACRS Depreciation Calculator</h1>
      <p className="text-zinc-600">Calculate depreciation using MACRS, Section 179, and Bonus Depreciation for business assets placed in service.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Asset Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Asset Cost ($)</label>
            <input
              type="number"
              value={assetCost}
              onChange={(e) => setAssetCost(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Asset Type (Recovery Period)</label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="input"
            >
              <option value="equipment">Equipment & Machinery (5-Year)</option>
              <option value="vehicles">Vehicles (5-Year)</option>
              <option value="computers">Computers & Software (5-Year)</option>
              <option value="furniture">Office Furniture (7-Year)</option>
              <option value="fixtures">Fixtures (7-Year)</option>
              <option value="buildings">Non-Residential Buildings (39-Year)</option>
              <option value="residential">Residential Rental Property (27.5-Year)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Placed in Service Date</label>
            <input
              type="month"
              value={placedInService}
              onChange={(e) => setPlacedInService(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Depreciation Options</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useSection179}
              onChange={(e) => setUseSection179(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Use Section 179 Expensing</label>
          </div>
          {useSection179 && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Section 179 Amount ($)</label>
              <input
                type="number"
                value={section179Amount}
                onChange={(e) => setSection179Amount(e.target.value)}
                className="input"
                min="0"
                max={assetCost}
              />
              <div className="text-xs text-zinc-500 mt-1">
                2024 Limit: $1,220,000. Phase-out begins at $3,050,000 total assets.
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useBonus}
              onChange={(e) => setUseBonus(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Use Bonus Depreciation ({result.bonusRate}% for {result.yearPlaced})</label>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Depreciation Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Asset Cost:</span>
            <span className="font-medium ml-2">${result.assetCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Recovery Period:</span>
            <span className="font-medium ml-2">{result.recoveryPeriod} Years</span>
          </div>
          <div>
            <span className="text-zinc-600">Section 179:</span>
            <span className="font-medium ml-2">${result.section179Amount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bonus Depreciation:</span>
            <span className="font-medium ml-2">${result.bonusDepreciation}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">First Year Depreciation</h3>
        <div className="text-2xl font-bold text-green-800">${result.firstYearDepreciation}</div>
        <div className="text-sm text-green-600 mt-1">
          Includes Section 179 + Bonus + MACRS first-year deduction
        </div>
      </div>

      {result.schedule.length > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">MACRS Depreciation Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Year</th>
                  <th className="py-2 text-right">Depreciation</th>
                  <th className="py-2 text-right">Accumulated</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 8).map((row) => (
                  <tr key={row.year} className="border-b">
                    <td className="py-2">{row.year}</td>
                    <td className="py-2 text-right">${row.depreciation.toFixed(2)}</td>
                    <td className="py-2 text-right">${row.accumulated.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remaining Basis</h3>
        <div className="text-sm text-zinc-600">
          ${result.remainingBasis} of original ${result.assetCost} cost remaining to depreciate.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Section 179: Immediate expensing up to $1.22M (2024). Phase-out at $3.05M total assets.</li>
          <li>Bonus Depreciation: 60% (2024), 40% (2025), 20% (2026), 0% after. Applies to remaining basis.</li>
          <li>MACRS: Accelerated depreciation using IRS tables. Half-year convention for personal property.</li>
          <li>Real property uses straight-line over 27.5 (residential) or 39 (commercial) years.</li>
        </ul>
      </div>
    </main>
  )
}