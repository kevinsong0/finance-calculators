'use client'

import { useState } from 'react'

export default function Section179DeductionCalculator() {
  const [assetCost, setAssetCost] = useState(500000)
  const [assetType, setAssetType] = useState<'equipment' | 'software' | 'vehicle' | 'furniture'>('equipment')
  const [businessIncome, setBusinessIncome] = useState(200000)
  const [businessUsePercentage, setBusinessUsePercentage] = useState(100)
  const [taxYear, setTaxYear] = useState(2024)
  const [hasBonusDepreciation, setHasBonusDepreciation] = useState(true)
  const [placingInServiceDate, setPlacingInServiceDate] = useState('2024-06-01')

  const calculate = () => {
    // Section 179 Deduction Calculator
    // Allows immediate expensing of qualifying business assets

    // Section 179 limits for 2024:
    // - Maximum deduction: $1,220,000
    // - Investment limit (phase-out): $3,050,000
    // - Must have business income to deduct
    // - 100% business use required (vehicles have different rules)

    const section179Limits = {
      2024: { maxDeduction: 1220000, investmentLimit: 3050000 },
      2023: { maxDeduction: 1160000, investmentLimit: 2900000 },
      2022: { maxDeduction: 1080000, investmentLimit: 2700000 },
      2021: { maxDeduction: 1050000, investmentLimit: 2620000 },
      2020: { maxDeduction: 1040000, investmentLimit: 2600000 },
    }

    const limits = section179Limits[taxYear as keyof typeof section179Limits] || section179Limits[2024]

    // Business use percentage
    const businessUseAmount = assetCost * (businessUsePercentage / 100)

    // Check if within investment limit (phase-out)
    const isAboveInvestmentLimit = assetCost > limits.investmentLimit
    let phaseOutReduction = 0
    if (isAboveInvestmentLimit) {
      phaseOutReduction = assetCost - limits.investmentLimit
      // Dollar-for-dollar reduction above limit
    }

    // Reduced maximum deduction
    const reducedMaxDeduction = Math.max(0, limits.maxDeduction - phaseOutReduction)

    // Section 179 deduction available
    const section179Available = Math.min(businessUseAmount, reducedMaxDeduction)

    // Limited by business income
    const section179Allowed = Math.min(section179Available, businessIncome)

    // Carryover to future years
    const section179Carryover = section179Available - section179Allowed

    // Remaining cost after Section 179
    const remainingCost = businessUseAmount - section179Allowed

    // Bonus depreciation (if applicable)
    // 2024: 60% bonus depreciation
    // 2023: 80%
    // 2022: 100%
    const bonusDepreciationRates = {
      2024: 0.60,
      2023: 0.80,
      2022: 1.00,
      2021: 1.00,
      2020: 1.00,
    }
    const bonusRate = bonusDepreciationRates[taxYear as keyof typeof bonusDepreciationRates] || 0.60

    let bonusDepreciationAmount = 0
    if (hasBonusDepreciation && remainingCost > 0) {
      bonusDepreciationAmount = remainingCost * bonusRate
    }

    // Regular depreciation on remaining
    const depreciatedRemaining = remainingCost - bonusDepreciationAmount

    // Total first-year deduction
    const totalFirstYearDeduction = section179Allowed + bonusDepreciationAmount

    // Tax savings (assuming marginal rate)
    const taxBracket = 24 // Simplified
    const taxSavings = totalFirstYearDeduction * (taxBracket / 100)

    // Qualifying asset types
    const qualifyingAssets = {
      equipment: 'Machinery, equipment, and tangible personal property',
      software: 'Off-the-shelf computer software',
      vehicle: 'Cars, trucks, SUVs (limited to $11,200-$12,200 first year)',
      furniture: 'Office furniture and fixtures',
    }

    // Vehicle specific limits
    const vehicleLimits = {
      2024: { passengerCar: 11200, truckVanSUV: 12200 },
      2023: { passengerCar: 11200, truckVanSUV: 12200 },
    }

    // Special rules for vehicles
    let vehicleNote = ''
    let vehicleLimitedSection179 = section179Allowed
    if (assetType === 'vehicle') {
      const vehicleLimit = vehicleLimits[taxYear as keyof typeof vehicleLimits]?.passengerCar || 11200
      vehicleLimitedSection179 = Math.min(section179Allowed, vehicleLimit)
      vehicleNote = `Vehicle Section 179 limited to $${vehicleLimit}. Bonus depreciation adds $8,000 for trucks/vans.`
    }

    // Recommendations
    let recommendation = ''
    if (section179Allowed > 0) {
      recommendation = `Section 179 deduction of $${section179Allowed.toFixed(0)} provides immediate tax savings.`
    } else if (businessIncome <= 0) {
      recommendation = 'No business income - Section 179 limited. Carryover to future years.'
    } else {
      recommendation = 'Asset cost exceeds limits. Consider bonus depreciation instead.'
    }

    // Election requirements
    const electionNote = 'File Form 4562 to elect Section 179. Must be placed in service during tax year.'

    // Warning for partial business use
    const businessUseWarning = businessUsePercentage < 100
      ? 'Warning: Less than 100% business use may limit or disallow Section 179.'
      : '100% business use - full deduction potential.'

    return {
      assetCost: assetCost.toFixed(0),
      assetType,
      businessIncome: businessIncome.toFixed(0),
      businessUsePercentage: businessUsePercentage.toFixed(0),
      businessUseAmount: businessUseAmount.toFixed(0),
      taxYear: taxYear.toFixed(0),
      maxDeduction: limits.maxDeduction.toFixed(0),
      investmentLimit: limits.investmentLimit.toFixed(0),
      isAboveInvestmentLimit,
      phaseOutReduction: phaseOutReduction.toFixed(0),
      reducedMaxDeduction: reducedMaxDeduction.toFixed(0),
      section179Available: section179Available.toFixed(0),
      section179Allowed: section179Allowed.toFixed(0),
      section179Carryover: section179Carryover.toFixed(0),
      remainingCost: remainingCost.toFixed(0),
      bonusDepreciationRate: (bonusRate * 100).toFixed(0),
      bonusDepreciationAmount: bonusDepreciationAmount.toFixed(0),
      depreciatedRemaining: depreciatedRemaining.toFixed(0),
      totalFirstYearDeduction: totalFirstYearDeduction.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      qualifyingAssets,
      vehicleNote,
      vehicleLimitedSection179: vehicleLimitedSection179.toFixed(0),
      recommendation,
      electionNote,
      businessUseWarning,
      hasBonusDepreciation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Section 179 Deduction Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate immediate expensing for qualifying business assets.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Asset Cost</label>
          <input type="number" value={assetCost} onChange={(e) => setAssetCost(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Type</label>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value as 'equipment' | 'software' | 'vehicle' | 'furniture')} className="w-full border rounded p-2">
            <option value="equipment">Equipment/Machinery</option>
            <option value="software">Computer Software</option>
            <option value="vehicle">Vehicle</option>
            <option value="furniture">Office Furniture</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business Income (Taxable)</label>
          <input type="number" value={businessIncome} onChange={(e) => setBusinessIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business Use (%)</label>
          <input type="number" value={businessUsePercentage} min="0" max="100" onChange={(e) => setBusinessUsePercentage(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <select value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2">
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Apply Bonus Depreciation?</label>
          <select value={hasBonusDepreciation ? 'yes' : 'no'} onChange={(e) => setHasBonusDepreciation(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - apply bonus depreciation</option>
            <option value="no">No - regular depreciation only</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Section 179 Limits ({result.taxYear})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Max Deduction:</span><span className="font-bold ml-2">$ {result.maxDeduction}</span></div>
          <div><span className="text-zinc-600">Investment Limit:</span><span className="font-medium ml-2">$ {result.investmentLimit}</span></div>
          <div><span className="text-zinc-600">Asset Cost:</span><span className="font-medium ml-2">$ {result.assetCost}</span></div>
        </div>
        {result.isAboveInvestmentLimit && (
          <div className="text-xs text-orange-600 mt-2">Phase-out: $ {result.phaseOutReduction} reduction above investment limit</div>
        )}
        <div className="text-xs text-zinc-600 mt-1">Reduced max deduction: $ {result.reducedMaxDeduction}</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Section 179 Deduction</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Business Use:</span><span className="font-bold ml-2">$ {result.businessUseAmount}</span></div>
          <div><span className="text-zinc-600">Available:</span><span className="font-medium ml-2">$ {result.section179Available}</span></div>
          <div><span className="text-zinc-600">Allowed:</span><span className="font-bold text-green-700 ml-2">$ {result.section179Allowed}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Carryover:</span><span className="font-medium ml-2">$ {result.section179Carryover}</span></div>
          <div><span className="text-zinc-600">Remaining Cost:</span><span className="font-medium ml-2">$ {result.remainingCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.businessUseWarning}</div>
      </div>

      {result.hasBonusDepreciation && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Bonus Depreciation ({result.bonusDepreciationRate}%)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Bonus Amount:</span><span className="font-bold text-purple-700 ml-2">$ {result.bonusDepreciationAmount}</span></div>
            <div><span className="text-zinc-600">Regular Dep:</span><span className="font-medium ml-2">$ {result.depreciatedRemaining}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Bonus depreciation applies to remaining cost after Section 179.</div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total First-Year Deduction</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Total Deduction:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalFirstYearDeduction}</span></div>
          <div><span className="text-zinc-600">Tax Savings (24%):</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      {result.assetType === 'vehicle' && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Vehicle Special Rules</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Vehicle Limit:</span><span className="font-medium ml-2">$ {result.vehicleLimitedSection179}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">{result.vehicleNote}</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Section 179 Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Max deduction: $1.22M (2024)</li>
          <li>Phase-out above $3.05M</li>
          <li>Limited by business income</li>
          <li>100% business use required</li>
          <li>File Form 4562 to elect</li>
          <li>Must be placed in service</li>
          <li>Bonus depreciation after</li>
          <li>Vehicles have special limits</li>
          <li>Carryover unused deduction</li>
          <li>Qualifying assets: equipment, software</li>
        </ul>
      </div>
    </div>
  )
}