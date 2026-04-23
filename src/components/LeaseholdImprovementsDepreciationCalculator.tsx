'use client'

import { useState } from 'react'

export default function LeaseholdImprovementsDepreciationCalculator() {
  const [improvementCost, setImprovementCost] = useState(100000)
  const [leaseTerm, setLeaseTerm] = useState(10)
  const [remainingLeaseTerm, setRemainingLeaseTerm] = useState(10)
  const [improvementType, setImprovementType] = useState<'interior' | 'restaurant' | 'retail'>('interior')
  const [buildingClass, setBuildingClass] = useState<'nonResidential' | 'residential' | 'restaurant'>('nonResidential')
  const [placedInServiceDate, setPlacedInServiceDate] = useState('2024-01-01')
  const [useBonusDepreciation, setUseBonusDepreciation] = useState(true)
  const [taxYear, setTaxYear] = useState(2024)

  const calculate = () => {
    // Leasehold Improvements Depreciation Calculator
    // Qualified Leasehold Improvements (QLI) have special depreciation rules

    // Tax treatment:
    // - Qualified Interior Improvements: 15-year MACRS (not 39-year like building)
    // - Qualified Restaurant Property: 15-year MACRS
    // - Qualified Retail Improvements: 15-year MACRS
    // - Bonus depreciation eligible (60% for 2024)

    // Requirements for QLI:
    // - Interior of nonresidential building
    // - Under lease with at least 39-year term (or assigned lease)
    // - Made by lessee or lessor
    // - Not structural components
    // - Not elevators, escalators, common areas

    const cost = improvementCost
    const lease = leaseTerm
    const remaining = remainingLeaseTerm

    // Recovery period based on improvement type
    const recoveryPeriods: Record<string, number> = {
      interior: 15, // Qualified Interior Improvements
      restaurant: 15, // Qualified Restaurant Property
      retail: 15, // Qualified Retail Improvements
    }

    const recoveryPeriod = recoveryPeriods[improvementType] || 39

    // Bonus depreciation rate by year
    const bonusRates: Record<number, number> = {
      2024: 0.60,
      2023: 0.80,
      2022: 1.00,
      2021: 1.00,
      2020: 1.00,
    }
    const bonusRate = bonusRates[taxYear] || 0.60

    // Calculate depreciation
    let bonusDepreciation = 0
    let remainingCost = cost

    if (useBonusDepreciation) {
      bonusDepreciation = cost * bonusRate
      remainingCost = cost - bonusDepreciation
    }

    // MACRS depreciation (15-year = 150% declining balance)
    // Mid-quarter convention assumed for simplicity
    const macrsRate = 0.10 // Simplified first year rate
    const annualMACRS = remainingCost * macrsRate

    // Total first year deduction
    const firstYearDeduction = bonusDepreciation + annualMACRS

    // Depreciation over lease term (alternative method)
    // If lease term shorter than recovery period
    const leaseTermDepreciation = cost / lease

    // Shorter of lease term or recovery period applies?
    const effectivePeriod = Math.min(lease, recoveryPeriod)
    const monthlyDepreciation = remainingCost / (effectivePeriod * 12)

    // Depreciation schedule
    const schedule: { year: number; bonus: number; macrs: number; total: number; remaining: number }[] = []
    let cumulative = 0

    // Year 1
    schedule.push({
      year: taxYear,
      bonus: bonusDepreciation,
      macrs: annualMACRS,
      total: firstYearDeduction,
      remaining: cost - firstYearDeduction,
    })
    cumulative += annualMACRS

    // Subsequent years
    const subsequentRate = 0.15 // Simplified subsequent year rate
    for (let i = 2; i <= recoveryPeriod; i++) {
      const remainingBalance = remainingCost - cumulative
      const yearDepreciation = Math.min(remainingBalance * subsequentRate, remainingBalance)
      schedule.push({
        year: taxYear + i - 1,
        bonus: 0,
        macrs: yearDepreciation,
        total: yearDepreciation,
        remaining: remainingBalance - yearDepreciation,
      })
      cumulative += yearDepreciation
    }

    // Tax benefit
    const taxRate = 0.24
    const firstYearTaxBenefit = firstYearDeduction * taxRate
    const totalTaxBenefit = cost * taxRate

    // Comparison: regular building depreciation (39 years)
    const buildingDepreciationPeriod = 39
    const regularBuildingAnnual = cost / buildingDepreciationPeriod
    const regularBuildingFirstYear = regularBuildingAnnual
    const benefitOfQLI = firstYearDeduction - regularBuildingFirstYear

    // QLI requirements check
    const qliRequirements = {
      interior: 'Interior of nonresidential building',
      lease: 'Lease term at least 39 years (original or assigned)',
      lessee: 'Made by lessee or lessor of that space',
      nonstructural: 'Not structural components of building',
      excluded: 'Not elevators, escalators, internal common areas',
    }

    let qualifiesAsQLI = true
    if (buildingClass === 'residential') qualifiesAsQLI = false
    if (remaining < 39) qualifiesAsQLI = false // Simplified: remaining lease check

    // Recommendation
    let recommendation = ''
    if (!qualifiesAsQLI) {
      recommendation = `Warning: May not qualify as QLI. If disqualified, use 39-year straight-line building depreciation. Check lease requirements.`
    } else if (useBonusDepreciation) {
      recommendation = `QLI qualifies for 15-year MACRS + ${bonusRate * 100}% bonus. First year deduction: $${firstYearDeduction.toFixed(0)}. Tax benefit: $${firstYearTaxBenefit.toFixed(0)}.`
    } else {
      recommendation = `Without bonus: 15-year MACRS depreciation. Annual deduction approximately $${annualMACRS.toFixed(0)} first year.`
    }

    // Asset specific notes
    const improvementNotes: Record<string, string> = {
      interior: 'Qualified Interior Improvements: interior walls, floors, lighting, HVAC, plumbing',
      restaurant: 'Qualified Restaurant Property: any improvement to restaurant building',
      retail: 'Qualified Retail Improvements: interior of retail building, open to public',
    }

    return {
      improvementCost: cost.toFixed(0),
      leaseTerm: lease.toFixed(0),
      remainingLeaseTerm: remaining.toFixed(0),
      improvementType,
      buildingClass,
      taxYear: taxYear.toFixed(0),
      recoveryPeriod: recoveryPeriod.toFixed(0),
      bonusRate: (bonusRate * 100).toFixed(0),
      useBonusDepreciation,
      bonusDepreciation: bonusDepreciation.toFixed(0),
      remainingCost: remainingCost.toFixed(0),
      annualMACRS: annualMACRS.toFixed(0),
      firstYearDeduction: firstYearDeduction.toFixed(0),
      effectivePeriod: effectivePeriod.toFixed(0),
      monthlyDepreciation: monthlyDepreciation.toFixed(0),
      leaseTermDepreciation: leaseTermDepreciation.toFixed(0),
      schedule,
      firstYearTaxBenefit: firstYearTaxBenefit.toFixed(0),
      totalTaxBenefit: totalTaxBenefit.toFixed(0),
      regularBuildingAnnual: regularBuildingAnnual.toFixed(0),
      regularBuildingFirstYear: regularBuildingFirstYear.toFixed(0),
      benefitOfQLI: benefitOfQLI.toFixed(0),
      qliRequirements,
      qualifiesAsQLI,
      recommendation,
      improvementNotes,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Leasehold Improvements Depreciation Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate depreciation for Qualified Leasehold Improvements.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Improvement Cost</label>
          <input type="number" value={improvementCost} onChange={(e) => setImprovementCost(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease Term (Years)</label>
          <input type="number" value={leaseTerm} min="1" max="40" onChange={(e) => setLeaseTerm(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Remaining Lease Term (Years)</label>
          <input type="number" value={remainingLeaseTerm} min="1" max="40" onChange={(e) => setRemainingLeaseTerm(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Improvement Type</label>
          <select value={improvementType} onChange={(e) => setImprovementType(e.target.value as 'interior' | 'restaurant' | 'retail')} className="w-full border rounded p-2">
            <option value="interior">Qualified Interior Improvements</option>
            <option value="restaurant">Qualified Restaurant Property</option>
            <option value="retail">Qualified Retail Improvements</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Building Class</label>
          <select value={buildingClass} onChange={(e) => setBuildingClass(e.target.value as 'nonResidential' | 'residential' | 'restaurant')} className="w-full border rounded p-2">
            <option value="nonResidential">Nonresidential Building</option>
            <option value="residential">Residential Building</option>
            <option value="restaurant">Restaurant Building</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Use Bonus Depreciation?</label>
          <select value={useBonusDepreciation ? 'yes' : 'no'} onChange={(e) => setUseBonusDepreciation(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - {result.bonusRate}% bonus</option>
            <option value="no">No - MACRS only</option>
          </select>
        </div>
      </div>

      {!result.qualifiesAsQLI && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ QLI Qualification Warning</h2>
          <div className="text-sm text-red-700">May not qualify as Qualified Leasehold Improvement. Check requirements below.</div>
          <div className="text-xs text-zinc-600 mt-2">If disqualified, must use 39-year straight-line building depreciation.</div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">First Year Depreciation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Bonus:</span><span className="font-bold text-green-700 ml-2">$ {result.bonusDepreciation}</span></div>
          <div><span className="text-zinc-600">MACRS:</span><span className="font-medium ml-2">$ {result.annualMACRS}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-green-700 ml-2">$ {result.firstYearDeduction}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Recovery Period:</span><span className="font-medium ml-2">{result.recoveryPeriod} years</span></div>
          <div><span className="text-zinc-600">Bonus Rate:</span><span className="font-medium ml-2">{result.bonusRate}%</span></div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Depreciation Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Bonus</th>
                <th className="py-2 text-left">MACRS</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-left">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.slice(0, 10).map((y) => (
                <tr key={y.year} className="border-b">
                  <td className="py-1">{y.year}</td>
                  <td className="py-1">$ {y.bonus.toFixed(0)}</td>
                  <td className="py-1">$ {y.macrs.toFixed(0)}</td>
                  <td className="py-1 font-bold">$ {y.total.toFixed(0)}</td>
                  <td className="py-1">$ {y.remaining.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">First Year:</span><span className="font-bold text-green-700 ml-2">$ {result.firstYearTaxBenefit}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-green-700 ml-2">$ {result.totalTaxBenefit}</span></div>
          <div><span className="text-zinc-600">Rate:</span><span className="font-medium ml-2">24%</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">QLI vs Regular Building</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">QLI First Year:</span><span className="font-bold text-orange-700 ml-2">$ {result.firstYearDeduction}</span></div>
          <div><span className="text-zinc-600">Building (39y):</span><span className="font-medium ml-2">$ {result.regularBuildingFirstYear}</span></div>
          <div><span className="text-zinc-600">QLI Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.benefitOfQLI}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">QLI gets 15-year MACRS instead of 39-year straight-line. Plus bonus depreciation.</div>
      </div>

      <div className={`card mb-6 ${result.qualifiesAsQLI ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">QLI Requirements</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Interior:</span> {result.qliRequirements.interior}</div>
          <div><span className="font-semibold">Lease:</span> {result.qliRequirements.lease}</div>
          <div><span className="font-semibold">Lessee:</span> {result.qliRequirements.lessee}</div>
          <div><span className="font-semibold">Nonstructural:</span> {result.qliRequirements.nonstructural}</div>
          <div><span className="font-semibold">Excluded:</span> {result.qliRequirements.excluded}</div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Improvement Types</h2>
        <div className="text-xs text-zinc-600">{result.improvementNotes[result.improvementType]}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Leasehold Improvements Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>QLI: 15-year MACRS (not 39y)</li>
          <li>Restaurant: 15-year always</li>
          <li>Retail: 15-year for interior</li>
          <li>Lease term: 39+ years required</li>
          <li>Interior of nonresidential</li>
          <li>Bonus depreciation eligible</li>
          <li>Not structural components</li>
          <li>Lessee or lessor makes</li>
          <li>Amortize if lease shorter</li>
          <li>Form 4562 for reporting</li>
        </ul>
      </div>
    </div>
  )
}