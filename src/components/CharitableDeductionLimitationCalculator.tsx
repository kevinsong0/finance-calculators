'use client'

import { useState } from 'react'

export default function CharitableDeductionLimitationCalculator() {
  const [cashDonations, setCashDonations] = useState(50000)
  const [propertyDonations, setPropertyDonations] = useState(20000)
  const [appreciatedProperty, setAppreciatedProperty] = useState(30000)
  const [agi, setAgi] = useState(200000)
  const [donationType, setDonationType] = useState<'public' | 'private' | 'privateOperating'>('public')
  const [carryforwardYears, setCarryforwardYears] = useState(5)

  const calculate = () => {
    // Charitable Deduction Limitation Calculator
    // Different limits based on donation type and recipient

    // Cash donations to public charities:
    // - 60% of AGI limit (2020+)
    // - 50% of AGI (prior years)

    // Property donations to public charities:
    // - 30% of AGI for appreciated property
    // - 50% of AGI for ordinary income property

    // Private non-operating foundations:
    // - 30% of AGI for cash
    // - 20% of AGI for appreciated property

    // Carryforward: 5 years for excess donations

    const totalDonations = cashDonations + propertyDonations + appreciatedProperty

    // Determine AGI limits based on charity type
    let cashLimit = 0
    let propertyLimit = 0
    let appreciatedLimit = 0

    if (donationType === 'public') {
      cashLimit = agi * 0.6 // 60% for public charities
      propertyLimit = agi * 0.5 // 50% for ordinary income property
      appreciatedLimit = agi * 0.3 // 30% for appreciated property
    } else if (donationType === 'private') {
      cashLimit = agi * 0.3 // 30% for private foundations
      propertyLimit = agi * 0.2 // 20% for ordinary income property
      appreciatedLimit = agi * 0.2 // 20% for appreciated property
    } else if (donationType === 'privateOperating') {
      cashLimit = agi * 0.5 // 50% for private operating foundations
      propertyLimit = agi * 0.3 // 30%
      appreciatedLimit = agi * 0.3 // 30%
    }

    // Combined 30%/50% limitation rule
    // Total 30% items cannot exceed 30% of AGI
    // But can be reduced by 50% items above 20% AGI

    // Calculate deduction allowed
    const cashAllowed = Math.min(cashDonations, cashLimit)
    const propertyAllowed = Math.min(propertyDonations, propertyLimit)
    const appreciatedAllowed = Math.min(appreciatedProperty, appreciatedLimit)

    // Total deduction this year
    const totalAllowed = cashAllowed + propertyAllowed + appreciatedAllowed

    // Excess carryforward
    const cashExcess = cashDonations - cashAllowed
    const propertyExcess = propertyDonations - propertyAllowed
    const appreciatedExcess = appreciatedProperty - appreciatedAllowed

    const totalExcess = cashExcess + propertyExcess + appreciatedExcess

    // AGI after deduction
    const agiAfterDeduction = agi - totalAllowed

    // Tax savings (assumed 24% marginal rate)
    const taxRate = 0.24
    const taxSavings = totalAllowed * taxRate
    const carryforwardTaxBenefit = totalExcess * taxRate

    // Years to use carryforward (simplified projection)
    const avgAgiGrowth = 0.03
    let projectedUse = 0
    let remainingCarryforward = totalExcess
    const carryforwardSchedule = []

    for (let year = 1; year <= carryforwardYears && remainingCarryforward > 0; year++) {
      const projectedAgi = agi * Math.pow(1 + avgAgiGrowth, year)
      const projectedLimit = donationType === 'public' ? projectedAgi * 0.6 : projectedAgi * 0.3
      const useInYear = Math.min(remainingCarryforward, projectedLimit)
      remainingCarryforward -= useInYear
      carryforwardSchedule.push({
        year,
        projectedAgi: projectedAgi.toFixed(0),
        limit: projectedLimit.toFixed(0),
        use: useInYear.toFixed(0),
        remaining: remainingCarryforward.toFixed(0),
      })
    }

    // Recommendation
    let recommendation = ''
    if (totalExcess === 0) {
      recommendation = `All donations deductible this year. Total: $${totalAllowed.toFixed(0)}. Cash: $${cashAllowed.toFixed(0)}, Property: $${propertyAllowed.toFixed(0)}, Appreciated: $${appreciatedAllowed.toFixed(0)}. Tax savings: $${taxSavings.toFixed(0)}. No carryforward needed.`
    } else {
      recommendation = `Deduction limited. Allowed: $${totalAllowed.toFixed(0)}, Carryforward: $${totalExcess.toFixed(0)}. Cash excess: $${cashExcess.toFixed(0)}, Property excess: $${propertyExcess.toFixed(0)}. Use carryforward over ${carryforwardYears} years. Tax savings this year: $${taxSavings.toFixed(0)}. Future benefit: $${carryforwardTaxBenefit.toFixed(0)}.`
    }

    if (donationType === 'private') {
      recommendation += ' Private foundation has lower limits (30%/20%). Consider donating to public charity for higher limits.'
    }

    if (appreciatedProperty > 0 && donationType === 'public') {
      recommendation += ` Appreciated property donation avoids capital gains tax and provides deduction. Consider donating appreciated stock instead of cash.`
    }

    // Limit comparison table
    const limitComparison = [
      { type: 'Public Charity', cash: '60%', property: '50%', appreciated: '30%' },
      { type: 'Private Foundation', cash: '30%', property: '20%', appreciated: '20%' },
      { type: 'Private Operating', cash: '50%', property: '30%', appreciated: '30%' },
    ]

    return {
      cashDonations: cashDonations.toFixed(0),
      propertyDonations: propertyDonations.toFixed(0),
      appreciatedProperty: appreciatedProperty.toFixed(0),
      totalDonations: totalDonations.toFixed(0),
      agi: agi.toFixed(0),
      donationType,
      cashLimit: cashLimit.toFixed(0),
      propertyLimit: propertyLimit.toFixed(0),
      appreciatedLimit: appreciatedLimit.toFixed(0),
      cashAllowed: cashAllowed.toFixed(0),
      propertyAllowed: propertyAllowed.toFixed(0),
      appreciatedAllowed: appreciatedAllowed.toFixed(0),
      totalAllowed: totalAllowed.toFixed(0),
      cashExcess: cashExcess.toFixed(0),
      propertyExcess: propertyExcess.toFixed(0),
      appreciatedExcess: appreciatedExcess.toFixed(0),
      totalExcess: totalExcess.toFixed(0),
      agiAfterDeduction: agiAfterDeduction.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      carryforwardTaxBenefit: carryforwardTaxBenefit.toFixed(0),
      carryforwardYears,
      carryforwardSchedule,
      recommendation,
      limitComparison,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Charitable Deduction Limitation Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate AGI percentage limits for charitable donations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Cash Donations</label>
          <input type="number" value={cashDonations} onChange={(e) => setCashDonations(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Donations (Ordinary Income)</label>
          <input type="number" value={propertyDonations} onChange={(e) => setPropertyDonations(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Appreciated Property Donations</label>
          <input type="number" value={appreciatedProperty} onChange={(e) => setAppreciatedProperty(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">AGI (Adjusted Gross Income)</label>
          <input type="number" value={agi} onChange={(e) => setAgi(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Type</label>
          <select value={donationType} onChange={(e) => setDonationType(e.target.value as 'public' | 'private' | 'privateOperating')} className="w-full border rounded p-2">
            <option value="public">Public Charity (60%/50%/30%)</option>
            <option value="private">Private Foundation (30%/20%/20%)</option>
            <option value="privateOperating">Private Operating Foundation (50%/30%/30%)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">AGI Percentage Limits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Recipient Type</th>
                <th className="py-2 text-left">Cash</th>
                <th className="py-2 text-left">Ordinary Property</th>
                <th className="py-2 text-left">Appreciated Property</th>
              </tr>
            </thead>
            <tbody>
              {result.limitComparison.map((l) => (
                <tr key={l.type} className={`border-b ${result.donationType === l.type.toLowerCase().replace(' ', '') || (result.donationType === 'privateOperating' && l.type === 'Private Operating') ? 'bg-green-100' : ''}`}>
                  <td className="py-1 font-semibold">{l.type}</td>
                  <td className="py-1">{l.cash}</td>
                  <td className="py-1">{l.property}</td>
                  <td className="py-1">{l.appreciated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Deduction Calculation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Donation Type</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">AGI Limit</th>
                <th className="py-2 text-left">Allowed</th>
                <th className="py-2 text-left">Excess</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-1 font-semibold">Cash</td>
                <td className="py-1">$ {result.cashDonations}</td>
                <td className="py-1">$ {result.cashLimit}</td>
                <td className="py-1 text-green-700">$ {result.cashAllowed}</td>
                <td className="py-1 text-red-700">$ {result.cashExcess}</td>
              </tr>
              <tr className="border-b">
                <td className="py-1 font-semibold">Ordinary Property</td>
                <td className="py-1">$ {result.propertyDonations}</td>
                <td className="py-1">$ {result.propertyLimit}</td>
                <td className="py-1 text-green-700">$ {result.propertyAllowed}</td>
                <td className="py-1 text-red-700">$ {result.propertyExcess}</td>
              </tr>
              <tr className="border-b">
                <td className="py-1 font-semibold">Appreciated Property</td>
                <td className="py-1">$ {result.appreciatedProperty}</td>
                <td className="py-1">$ {result.appreciatedLimit}</td>
                <td className="py-1 text-green-700">$ {result.appreciatedAllowed}</td>
                <td className="py-1 text-red-700">$ {result.appreciatedExcess}</td>
              </tr>
              <tr className="font-bold bg-gray-50">
                <td className="py-1">Total</td>
                <td className="py-1">$ {result.totalDonations}</td>
                <td className="py-1"></td>
                <td className="py-1 text-green-700">$ {result.totalAllowed}</td>
                <td className="py-1 text-red-700">$ {result.totalExcess}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {Number(result.totalExcess) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Carryforward Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Year</th>
                  <th className="py-2 text-left">Projected AGI</th>
                  <th className="py-2 text-left">Limit</th>
                  <th className="py-2 text-left">Used</th>
                  <th className="py-2 text-left">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {result.carryforwardSchedule.map((c) => (
                  <tr key={c.year} className="border-b">
                    <td className="py-1">{c.year}</td>
                    <td className="py-1">$ {c.projectedAgi}</td>
                    <td className="py-1">$ {c.limit}</td>
                    <td className="py-1 font-semibold text-green-700">$ {c.use}</td>
                    <td className="py-1">$ {c.remaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">AGI:</span><span className="font-medium ml-2">$ {result.agi}</span></div>
          <div><span className="text-zinc-600">Total Allowed:</span><span className="font-bold text-green-700 ml-2">$ {result.totalAllowed}</span></div>
          <div><span className="text-zinc-600">Tax Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span></div>
          <div><span className="text-zinc-600">Carryforward:</span><span className="font-medium text-red-700 ml-2">$ {result.totalExcess}</span></div>
          <div><span className="text-zinc-600">Future Benefit:</span><span className="font-medium ml-2">$ {result.carryforwardTaxBenefit}</span></div>
          <div><span className="text-zinc-600">AGI After:</span><span className="font-medium ml-2">$ {result.agiAfterDeduction}</span></div>
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Charitable Deduction Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Public charity: 60% AGI for cash</li>
          <li>Private foundation: 30% AGI for cash</li>
          <li>Appreciated property: 30% AGI limit</li>
          <li>Bypass capital gains on appreciated gifts</li>
          <li>5-year carryforward for excess</li>
          <li>30%/50% combined limit rule</li>
          <li>Qualified appraisal for property &gt;$5,000</li>
          <li>Form 8283 for non-cash donations</li>
          <li>Document all donations carefully</li>
          <li>Consider bunching strategy</li>
        </ul>
      </div>
    </div>
  )
}