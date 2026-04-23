'use client'

import { useState } from 'react'

export default function EarlyRetirementHealthInsuranceCalculator() {
  const [currentAge, setCurrentAge] = useState(55)
  const [retirementAge, setRetirementAge] = useState(60)
  const [spouseAge, setSpouseAge] = useState(58)
  const [hasSpouse, setHasSpouse] = useState(true)
  const [annualIncome, setAnnualIncome] = useState(80000)
  const [healthStatus, setHealthStatus] = useState<'excellent' | 'good' | 'average' | 'poor'>('good')
  const [location, setLocation] = useState<'ca' | 'ny' | 'tx' | 'fl' | 'other'>('other')

  const calculate = () => {
    const yearsToMedicare = 65 - retirementAge
    const currentYear = 2026
    const medicareEligibleYear = currentYear + yearsToMedicare

    // ACA premium estimates (2026 projected)
    const basePremiumIndividual = 450
    const basePremiumCouple = 900

    // Premium by state (cost factor)
    const stateFactors = {
      ca: 1.25,
      ny: 1.20,
      tx: 0.95,
      fl: 1.0,
      other: 1.0,
    }
    const stateFactor = stateFactors[location]

    // Health status factor
    const healthFactors = {
      excellent: 0.9,
      good: 1.0,
      average: 1.15,
      poor: 1.3,
    }
    const healthFactor = healthFactors[healthStatus]

    // Calculate ACA premium before subsidy
    const basePremium = hasSpouse ? basePremiumCouple : basePremiumIndividual
    const adjustedPremium = basePremium * stateFactor * healthFactor

    // ACA subsidy calculation (simplified)
    // 2026: second lowest cost silver plan benchmark
    const benchmarkPremium = adjustedPremium * 1.1
    const expectedContributionRate = annualIncome <= 30000 ? 0.02 :
                                      annualIncome <= 50000 ? 0.04 :
                                      annualIncome <= 75000 ? 0.06 :
                                      annualIncome <= 100000 ? 0.08 : 0.095
    const expectedContribution = annualIncome * expectedContributionRate / 12
    const subsidy = Math.max(0, benchmarkPremium - expectedContribution)
    const netPremium = Math.max(0, adjustedPremium - subsidy)

    // COBRA alternative (employer coverage continuation)
    const cobraPremiumIndividual = 600
    const cobraPremium = hasSpouse ? cobraPremiumIndividual * 2.2 : cobraPremiumIndividual

    // Health share plans (faith-based alternatives)
    const healthShareIndividual = 200
    const healthSharePremium = hasSpouse ? healthShareIndividual * 2 : healthShareIndividual

    // Total costs to Medicare eligibility
    const acaTotalCost = netPremium * 12 * yearsToMedicare
    const cobraTotalCost = cobraPremium * 12 * Math.min(yearsToMedicare, 1.5) // COBRA max 18 months
    const healthShareTotalCost = healthSharePremium * 12 * yearsToMedicare

    // Medicare Part B premium (2024)
    const medicarePartB = 174.70
    const medicarePartD = 34.50 // average
    const medicareSupplement = 150 // estimate for Plan G
    const medicareMonthly = hasSpouse ? (medicarePartB + medicarePartD + medicareSupplement) * 2 : medicarePartB + medicarePartD + medicareSupplement

    // Options comparison
    const options = [
      { name: 'ACA with Subsidy', monthly: netPremium.toFixed(0), total: acaTotalCost.toFixed(0) },
      { name: 'COBRA (18mo max)', monthly: cobraPremium.toFixed(0), total: cobraTotalCost.toFixed(0) },
      { name: 'Health Share', monthly: healthSharePremium.toFixed(0), total: healthShareTotalCost.toFixed(0) },
    ]

    return {
      currentAge: currentAge.toFixed(0),
      retirementAge: retirementAge.toFixed(0),
      spouseAge: spouseAge.toFixed(0),
      hasSpouse,
      yearsToMedicare: yearsToMedicare.toFixed(0),
      medicareEligibleYear: medicareEligibleYear.toFixed(0),
      annualIncome: annualIncome.toFixed(0),
      healthStatus,
      location,
      adjustedPremium: adjustedPremium.toFixed(0),
      benchmarkPremium: benchmarkPremium.toFixed(0),
      expectedContribution: expectedContribution.toFixed(0),
      subsidy: subsidy.toFixed(0),
      netPremium: netPremium.toFixed(0),
      cobraPremium: cobraPremium.toFixed(0),
      healthSharePremium: healthSharePremium.toFixed(0),
      acaTotalCost: acaTotalCost.toFixed(0),
      cobraTotalCost: cobraTotalCost.toFixed(0),
      healthShareTotalCost: healthShareTotalCost.toFixed(0),
      medicareMonthly: medicareMonthly.toFixed(0),
      options,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Early Retirement Health Insurance Calculator</h1>
      <p className="text-gray-600 mb-4">Plan health coverage from early retirement until Medicare eligibility.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="50" max="64" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Planned Retirement Age</label>
          <input type="number" value={retirementAge} min="55" max="64" onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Projected Annual Income ($)</label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Health Status</label>
          <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value as 'excellent' | 'good' | 'average' | 'poor')} className="w-full border rounded p-2">
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select value={location} onChange={(e) => setLocation(e.target.value as 'ca' | 'ny' | 'tx' | 'fl' | 'other')} className="w-full border rounded p-2">
            <option value="ca">California (higher cost)</option>
            <option value="ny">New York (higher cost)</option>
            <option value="tx">Texas (lower cost)</option>
            <option value="fl">Florida</option>
            <option value="other">Other States</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse Coverage</label>
          <select value={hasSpouse ? 'yes' : 'no'} onChange={(e) => setHasSpouse(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Include Spouse</option>
            <option value="no">Individual Only</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Coverage Gap Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Retirement Age:</span><span className="font-medium ml-2">{result.retirementAge}</span></div>
          <div><span className="text-zinc-600">Years to Medicare:</span><span className="font-bold text-blue-700 ml-2">{result.yearsToMedicare}</span></div>
          <div><span className="text-zinc-600">Medicare Eligible:</span><span className="font-medium ml-2">{result.medicareEligibleYear}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">ACA Marketplace Option</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Base Premium:</span><span className="font-medium ml-2">$ {result.adjustedPremium}</span></div>
          <div><span className="text-zinc-600">Income Contribution:</span><span className="font-medium ml-2">$ {result.expectedContribution}</span></div>
          <div><span className="text-zinc-600">ACA Subsidy:</span><span className="font-bold text-green-700 ml-2">$ {result.subsidy}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Net Premium:</span><span className="font-bold text-orange-700 ml-2">$ {result.netPremium}/mo</span></div>
          <div><span className="text-zinc-600">Total Cost to Medicare:</span><span className="font-bold text-orange-700 ml-2">$ {result.acaTotalCost}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Alternative Coverage Options</h2>
        <div className="grid grid-cols-3 gap-4">
          {result.options.map((opt, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-zinc-600 mb-1">{opt.name}</div>
              <div className="font-bold">$ {opt.monthly}/mo</div>
              <div className="text-xs text-purple-700">Total: $ {opt.total}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-zinc-600 mt-2">COBRA: max 18 months continuation. Health Share: faith-based, not insurance.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Medicare After Age 65</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Part B + D + Supplement:</span><span className="font-bold text-green-700 ml-2">$ {result.medicareMonthly}/mo</span></div>
          <div><span className="text-zinc-600">Coverage Type:</span><span className="font-medium ml-2">{result.hasSpouse ? 'Couple' : 'Individual'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Medicare Part B ($174.70), Part D (~$34.50), Supplement Plan G (~$150). IRMAA may apply for high income.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Early Retirement Health Coverage Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>ACA subsidies based on income - manage withdrawals to maximize subsidy</li>
          <li>COBRA: 18 months max, costs ~102% of employer plan premium</li>
          <li>Health share plans: lower cost but not traditional insurance</li>
          <li>Consider HSA funds to pay premiums tax-free</li>
          <li>Manage MAGI to stay below subsidy cliffs</li>
          <li>State variation: CA/NY higher premiums, TX/FL often lower</li>
        </ul>
      </div>
    </div>
  )
}