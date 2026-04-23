'use client'

import { useState } from 'react'

export default function UmbrellaInsuranceCalculator() {
  const [netWorth, setNetWorth] = useState('')
  const [annualIncome, setAnnualIncome] = useState('')
  const [riskFactors, setRiskFactors] = useState<string[]>([])
  const [currentAutoLiability, setCurrentAutoLiability] = useState('')
  const [currentHomeLiability, setCurrentHomeLiability] = useState('')
  const [teenDrivers, setTeenDrivers] = useState('0')
  const [rentalProperties, setRentalProperties] = useState('0')

  const calculate = () => {
    const netWorthValue = parseFloat(netWorth) || 500000
    const income = parseFloat(annualIncome) || 100000
    const autoLiability = parseFloat(currentAutoLiability) || 300000
    const homeLiability = parseFloat(currentHomeLiability) || 300000
    const teens = parseInt(teenDrivers) || 0
    const rentals = parseInt(rentalProperties) || 0

    // Calculate recommended umbrella coverage
    // Typically 1-2x net worth, minimum $1M
    const baseCoverage = Math.max(1000000, netWorthValue)

    // Risk factor adjustments
    let riskMultiplier = 1.0

    // Teen drivers increase risk significantly
    if (teens > 0) {
      riskMultiplier += teens * 0.2 // +20% per teen driver
    }

    // Rental properties increase liability exposure
    if (rentals > 0) {
      riskMultiplier += rentals * 0.15 // +15% per rental
    }

    // High net worth = higher target lawsuits
    if (netWorthValue > 1000000) {
      riskMultiplier += 0.2
    }
    if (netWorthValue > 5000000) {
      riskMultiplier += 0.3
    }

    // High income = attractive lawsuit target
    if (income > 200000) {
      riskMultiplier += 0.1
    }

    // Additional risk factors
    const selectedRisks = riskFactors
    if (selectedRisks.includes('pool')) riskMultiplier += 0.15
    if (selectedRisks.includes('dog')) riskMultiplier += 0.1
    if (selectedRisks.includes('boat')) riskMultiplier += 0.15
    if (selectedRisks.includes('social')) riskMultiplier += 0.1
    if (selectedRisks.includes('volunteer')) riskMultiplier += 0.05

    // Calculate recommended coverage
    const recommendedCoverage = Math.ceil(baseCoverage * riskMultiplier / 1000000) * 1000000
    const maxCoverage = Math.min(recommendedCoverage, 5000000) // Cap at $5M for personal

    // Premium estimate (industry averages)
    const premiumPerMillion = 150 // ~$150-300 per million
    const annualPremium = (maxCoverage / 1000000) * premiumPerMillion

    // Coverage gap analysis
    const underlyingCoverage = Math.min(autoLiability, homeLiability)
    const coverageGap = maxCoverage - underlyingCoverage

    // Underlying policy requirements
    const minAutoRequired = 300000
    const minHomeRequired = 300000
    const meetsAuto = autoLiability >= minAutoRequired
    const meetsHome = homeLiability >= minHomeRequired

    // Total liability protection
    const totalProtection = underlyingCoverage + maxCoverage

    // Risk score
    const riskScore = riskMultiplier * 100
    const riskCategory = riskScore > 150 ? 'High' : riskScore > 120 ? 'Medium' : 'Standard'

    return {
      netWorth: netWorthValue.toFixed(2),
      annualIncome: income.toFixed(2),
      recommendedCoverage: recommendedCoverage.toFixed(0),
      maxCoverage: maxCoverage.toFixed(0),
      annualPremium: annualPremium.toFixed(2),
      underlyingCoverage: underlyingCoverage.toFixed(0),
      coverageGap: coverageGap.toFixed(0),
      totalProtection: totalProtection.toFixed(0),
      meetsAuto,
      meetsHome,
      minAutoRequired,
      minHomeRequired,
      autoLiability: autoLiability.toFixed(0),
      homeLiability: homeLiability.toFixed(0),
      riskScore: riskScore.toFixed(0),
      riskCategory,
      teenDrivers: teens,
      rentalProperties: rentals,
      premiumPerMillion,
      needsUmbrella: netWorthValue > 300000 || income > 100000 || riskScore > 110
    }
  }

  const result = calculate()

  const toggleRisk = (risk: string) => {
    if (riskFactors.includes(risk)) {
      setRiskFactors(riskFactors.filter(r => r !== risk))
    } else {
      setRiskFactors([...riskFactors, risk])
    }
  }

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Umbrella Insurance Calculator</h1>
      <p className="text-zinc-600">Determine appropriate umbrella policy coverage based on assets and risk factors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Financial Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Net Worth (Total Assets)</label>
            <input
              type="number"
              value={netWorth}
              onChange={(e) => setNetWorth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total net worth"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Income</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Auto Liability Coverage</label>
            <select
              value={currentAutoLiability}
              onChange={(e) => setCurrentAutoLiability(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="100000">$100K (Minimum)</option>
              <option value="250000">$250K</option>
              <option value="300000">$300K (Recommended)</option>
              <option value="500000">$500K</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Home Liability Coverage</label>
            <select
              value={currentHomeLiability}
              onChange={(e) => setCurrentHomeLiability(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="100000">$100K</option>
              <option value="300000">$300K (Recommended)</option>
              <option value="500000">$500K</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Risk Factors</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Teen Drivers</label>
              <select
                value={teenDrivers}
                onChange={(e) => setTeenDrivers(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Rental Properties</label>
              <select
                value={rentalProperties}
                onChange={(e) => setRentalProperties(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Additional Risk Factors</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['pool', 'dog', 'boat', 'social', 'volunteer'].map((risk) => (
                <label key={risk} className="flex items-center gap-2 bg-white rounded p-2 cursor-pointer hover:bg-zinc-100">
                  <input
                    type="checkbox"
                    checked={riskFactors.includes(risk)}
                    onChange={() => toggleRisk(risk)}
                    className="w-4 h-4"
                  />
                  <span className="capitalize">{risk === 'pool' ? 'Pool/Trampoline' : risk === 'social' ? 'Social Media Active' : risk === 'volunteer' ? 'Volunteer Work' : risk === 'dog' ? 'Own Dog' : 'Own Boat'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Coverage Recommendation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Recommended Coverage</div>
            <div className="text-2xl font-bold text-blue-600">$${result.maxCoverage}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Premium Estimate</div>
            <div className="text-2xl font-bold text-green-600">$${result.annualPremium}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Liability Protection</div>
            <div className="text-2xl font-bold">$${result.totalProtection}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Risk Level</div>
            <div className={`text-2xl font-bold ${result.riskCategory === 'High' ? 'text-red-600' : result.riskCategory === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
              {result.riskCategory} ({result.riskScore}%)
            </div>
          </div>
        </div>
      </div>

      {result.needsUmbrella ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Umbrella Insurance Recommended</h3>
          <div className="text-sm text-green-600">
            Based on net worth ($${result.netWorth}) and risk factors, umbrella coverage protects assets beyond underlying policy limits. $${result.annualPremium}/year provides $${result.maxCoverage} additional liability protection.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Consider Umbrella Insurance</h3>
          <div className="text-sm text-yellow-600">
            Lower net worth reduces risk exposure, but consider umbrella for: future asset growth, peace of mind, lawsuit protection. Premiums are affordable ($${result.annualPremium}/year for $${result.maxCoverage} coverage).
          </div>
        </div>
      )}

      {!result.meetsAuto && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Increase Auto Liability</h3>
          <div className="text-sm text-red-600">
            Current auto liability ($${result.autoLiability}) below umbrella requirement ($${result.minAutoRequired}). Increase underlying coverage before adding umbrella policy.
          </div>
        </div>
      )}

      {!result.meetsHome && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Increase Home Liability</h3>
          <div className="text-sm text-red-600">
            Current home liability ($${result.homeLiability}) below umbrella requirement ($${result.minHomeRequired}). Increase underlying coverage before adding umbrella policy.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Umbrella Policy Benefits</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Extended Liability Coverage</strong>
            <div className="text-zinc-500">Above underlying auto/home limits. Covers bodily injury, property damage, personal injury lawsuits.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Broader Coverage</strong>
            <div className="text-zinc-500">Libel, slander, defamation, invasion of privacy, rental property liability, some boat coverage.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Legal Defense Costs</strong>
            <div className="text-zinc-500">Defense costs covered even if lawsuit is groundless. Legal fees often exceed judgment amounts.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Affordable Premiums</strong>
            <div className="text-zinc-500">$150-300 per million coverage. $1-5M policies available. Cost-effective asset protection.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Coverage Guidelines</h3>
        <div className="text-xs text-zinc-600">
          Minimum underlying: $300K auto + $300K home liability. Umbrella fills gap to $1-5M. Buy coverage matching net worth + future earnings potential. High-risk activities need higher limits. Umbrella required for rentals, businesses, high-profile individuals. Premium stays same regardless of claims history.
        </div>
      </div>
    </main>
  )
}