'use client'

import { useState } from 'react'

export default function InsuranceCoverageCalculator() {
  const [annualIncome, setAnnualIncome] = useState('')
  const [homeValue, setHomeValue] = useState('')
  const [vehicleValue, setVehicleValue] = useState('')
  const [dependents, setDependents] = useState('')
  const [mortgageBalance, setMortgageBalance] = useState('')
  const [hasHealth, setHasHealth] = useState(true)
  const [riskProfile, setRiskProfile] = useState('moderate')

  const calculate = () => {
    const income = parseFloat(annualIncome) || 100000
    const home = parseFloat(homeValue) || 400000
    const vehicle = parseFloat(vehicleValue) || 30000
    const dependentsCount = parseInt(dependents) || 2
    const mortgage = parseFloat(mortgageBalance) || 250000
    const profile = riskProfile

    // Life insurance recommendation
    const lifeInsuranceBase = income * 10 // 10x income rule
    const lifeInsuranceDebt = mortgage + vehicle
    const lifeInsuranceTotal = lifeInsuranceBase + lifeInsuranceDebt
    const lifeAnnualCost = lifeInsuranceTotal * 0.005 // Approximate term life cost

    // Home insurance recommendation
    const homeCoverage = home * 0.8 // Dwelling coverage (80% replacement)
    const contentsCoverage = home * 0.5 // Contents
    const liabilityCoverage = 300000 // Standard liability
    const homeAnnualCost = homeCoverage * 0.003

    // Auto insurance recommendation
    const autoLiability = profile === 'aggressive' ? 100000 : profile === 'moderate' ? 300000 : 500000
    const autoCollision = vehicle
    const autoAnnualCost = vehicle * 0.05 + (autoLiability / 10000)

    // Health insurance (if no coverage)
    const healthAnnualCost = hasHealth ? 0 : income * 0.06

    // Disability insurance
    const disabilityCoverage = income * 0.6 // 60% of income
    const disabilityAnnualCost = disabilityCoverage * 0.02

    // Umbrella insurance recommendation
    const netWorth = home - mortgage + vehicle + income * 5
    const umbrellaRecommend = netWorth > 500000 ? Math.min(netWorth, 2000000) : 0
    const umbrellaAnnualCost = umbrellaRecommend * 0.001

    const totalAnnualCost = lifeAnnualCost + homeAnnualCost + autoAnnualCost + healthAnnualCost + disabilityAnnualCost + umbrellaAnnualCost

    return {
      lifeInsurance: lifeInsuranceTotal.toFixed(0),
      lifeAnnualCost: lifeAnnualCost.toFixed(2),
      homeCoverage: homeCoverage.toFixed(0),
      contentsCoverage: contentsCoverage.toFixed(0),
      homeAnnualCost: homeAnnualCost.toFixed(2),
      autoLiability: autoLiability.toFixed(0),
      autoAnnualCost: autoAnnualCost.toFixed(2),
      disabilityCoverage: disabilityCoverage.toFixed(0),
      disabilityAnnualCost: disabilityAnnualCost.toFixed(2),
      umbrellaRecommend: umbrellaRecommend.toFixed(0),
      umbrellaAnnualCost: umbrellaAnnualCost.toFixed(2),
      healthAnnualCost: healthAnnualCost.toFixed(2),
      totalAnnualCost: totalAnnualCost.toFixed(2),
      coverageRatio: ((income - totalAnnualCost) / income * 100).toFixed(1)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Insurance Coverage Calculator</h1>
      <p className="text-zinc-600">Calculate recommended insurance coverage based on your assets, income, and risk profile.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Situation</h3>
        <div className="space-y-4">
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
            <label className="block text-sm text-zinc-600 mb-1">Home Value</label>
            <input
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter home market value"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Mortgage Balance</label>
            <input
              type="number"
              value={mortgageBalance}
              onChange={(e) => setMortgageBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter remaining mortgage"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Vehicle Value</label>
            <input
              type="number"
              value={vehicleValue}
              onChange={(e) => setVehicleValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter vehicle value"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Dependents</label>
            <input
              type="number"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter dependents count"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Risk Profile</label>
            <select
              value={riskProfile}
              onChange={(e) => setRiskProfile(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="conservative">Conservative (Higher coverage)</option>
              <option value="moderate">Moderate (Standard coverage)</option>
              <option value="aggressive">Aggressive (Minimal coverage)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Recommended Coverage</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <div className="flex justify-between font-bold">
              <span>Life Insurance</span>
              <span>$${result.lifeInsurance}</span>
            </div>
            <div className="text-zinc-500">10x income + debts covered. Est. cost: $${result.lifeAnnualCost}/yr</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="flex justify-between font-bold">
              <span>Home Insurance</span>
              <span>$${result.homeCoverage}</span>
            </div>
            <div className="text-zinc-500">Dwelling: $${result.homeCoverage}, Contents: $${result.contentsCoverage}. Est. cost: $${result.homeAnnualCost}/yr</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="flex justify-between font-bold">
              <span>Auto Insurance</span>
              <span>$${result.autoLiability} liability</span>
            </div>
            <div className="text-zinc-500">Liability coverage. Est. cost: $${result.autoAnnualCost}/yr</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="flex justify-between font-bold">
              <span>Disability Insurance</span>
              <span>$${result.disabilityCoverage}/yr</span>
            </div>
            <div className="text-zinc-500">60% income replacement. Est. cost: $${result.disabilityAnnualCost}/yr</div>
          </div>
          {parseFloat(result.umbrellaRecommend) > 0 && (
            <div className="bg-white rounded p-3">
              <div className="flex justify-between font-bold">
                <span>Umbrella Policy</span>
                <span>$${result.umbrellaRecommend}</span>
              </div>
              <div className="text-zinc-500">Extra liability protection. Est. cost: $${result.umbrellaAnnualCost}/yr</div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Total Insurance Budget</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Annual Cost</div>
            <div className="font-bold text-red-600">$${result.totalAnnualCost}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">% of Income</div>
            <div className="font-bold">{result.coverageRatio}%</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Coverage Guidelines</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Life Insurance: 10x Income Rule</strong>
            <div className="text-zinc-500">Replace income for 10 years. Add mortgage and debts. More for young children.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Home: 80% Replacement Cost</strong>
            <div className="text-zinc-500">Cover structure rebuild. Contents 50% of dwelling. $300K+ liability.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Auto: State Minimum +</strong>
            <div className="text-zinc-500">100K/300K minimum recommended. Full coverage if financed.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Umbrella: Net Worth Match</strong>
            <div className="text-zinc-500">1M+ recommended for assets over $500K. Cost ~$150-300/year per million.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Insurance Priority</h3>
        <div className="text-xs text-zinc-600">
          Health (mandatory), Auto (required), Home (mortgage requirement), Life (if dependents), Disability (income protection), Umbrella (asset protection). Review annually. Bundle for discounts. Raise deductibles to lower premiums.
        </div>
      </div>
    </main>
  )
}