'use client'

import { useState } from 'react'

export default function LongTermCareInsuranceCalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [healthStatus, setHealthStatus] = useState('good')
  const [coverageAmount, setCoverageAmount] = useState('')
  const [benefitPeriod, setBenefitPeriod] = useState('3')
  const [eliminationPeriod, setEliminationPeriod] = useState('90')
  const [inflationProtection, setInflationProtection] = useState('none')

  const calculate = () => {
    const age = parseInt(currentAge) || 60
    const health = healthStatus
    const coverage = parseFloat(coverageAmount) || 200
    const isLifetimePeriod = benefitPeriod === 'lifetime'
    const period = isLifetimePeriod ? 0 : parseInt(benefitPeriod) || 3
    const elimination = parseInt(eliminationPeriod) || 90
    const inflation = inflationProtection

    // Base annual premium estimates (simplified industry averages)
    const basePremiums: Record<number, number> = {
      55: 1500,
      60: 2500,
      65: 4000,
      70: 7000,
      75: 12000
    }

    const baseAge = Math.min(75, Math.max(55, age))
    const basePremium = basePremiums[baseAge] || 4000

    // Health status multiplier
    const healthMultipliers: Record<string, number> = {
      'excellent': 0.85,
      'good': 1.0,
      'fair': 1.25,
      'poor': 1.5
    }
    const healthMultiplier = healthMultipliers[health] || 1.0

    // Coverage amount adjustment (base is $200/day)
    const coverageMultiplier = coverage / 200

    // Benefit period multiplier
    const periodMultipliers: Record<string, number> = {
      '2': 0.7,
      '3': 1.0,
      '4': 1.2,
      '5': 1.4,
      'lifetime': 2.0
    }
    const periodMultiplier = periodMultipliers[benefitPeriod] || 1.0

    // Elimination period discount (longer wait = lower premium)
    const eliminationDiscount = elimination >= 90 ? 0.9 : elimination >= 60 ? 0.95 : 1.0

    // Inflation protection cost
    const inflationMultipliers: Record<string, number> = {
      'none': 1.0,
      'simple': 1.25,
      'compound': 1.5
    }
    const inflationMultiplier = inflationMultipliers[inflation] || 1.0

    // Calculate annual premium
    const annualPremium = basePremium * healthMultiplier * coverageMultiplier * periodMultiplier * eliminationDiscount * inflationMultiplier

    // Calculate total premium to age 85
    const yearsToPay = Math.min(25, 85 - age)
    const totalPremium = annualPremium * yearsToPay

    // Calculate potential benefits
    const dailyBenefit = coverage
    const totalBenefitDays = isLifetimePeriod ? 365 * 10 : period * 365
    const totalBenefit = dailyBenefit * totalBenefitDays

    // ROI analysis
    const breakEvenYears = annualPremium > 0 ? totalBenefit / annualPremium : 0
    const benefitToPremiumRatio = totalPremium > 0 ? totalBenefit / totalPremium : 0

    // Alternative: Self-insurance savings needed
    const selfInsuranceNeeded = totalBenefit
    const monthlySavings = selfInsuranceNeeded / yearsToPay / 12

    return {
      annualPremium: annualPremium.toFixed(2),
      monthlyPremium: (annualPremium / 12).toFixed(2),
      totalPremium: totalPremium.toFixed(2),
      dailyBenefit: dailyBenefit.toFixed(2),
      monthlyBenefit: (dailyBenefit * 30).toFixed(2),
      totalBenefit: totalBenefit.toFixed(2),
      benefitPeriod: benefitPeriod,
      eliminationPeriod: elimination,
      inflationProtection: inflation,
      breakEvenYears: breakEvenYears.toFixed(1),
      benefitToPremiumRatio: benefitToPremiumRatio.toFixed(1),
      selfInsuranceNeeded: selfInsuranceNeeded.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      age,
      healthStatus: health,
      yearsToPay,
      coverageAmount: coverage.toFixed(2),
      isWorthIt: benefitToPremiumRatio > 2,
      averageNursingHomeCost: 8000,
      averageHomeCareCost: 4500
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Long-Term Care Insurance Calculator</h1>
      <p className="text-zinc-600">Estimate LTC insurance premiums and compare with self-insurance costs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Health Status</label>
            <select
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="excellent">Excellent (Best rates)</option>
              <option value="good">Good (Standard rates)</option>
              <option value="fair">Fair (Higher rates)</option>
              <option value="poor">Poor (May not qualify)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Daily Benefit Amount</label>
            <input
              type="number"
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter daily benefit amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Benefit Period</label>
            <select
              value={benefitPeriod}
              onChange={(e) => setBenefitPeriod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
              <option value="lifetime">Lifetime (Unlimited)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Elimination Period (Days before benefits)</label>
            <select
              value={eliminationPeriod}
              onChange={(e) => setEliminationPeriod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days (Standard)</option>
              <option value="180">180 Days (Lower premium)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Inflation Protection</label>
            <select
              value={inflationProtection}
              onChange={(e) => setInflationProtection(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="none">None (Fixed benefit)</option>
              <option value="simple">Simple (3% annual increase)</option>
              <option value="compound">Compound (5% compounded growth)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Premium Estimate</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Premium</div>
            <div className="text-2xl font-bold text-blue-600">$${result.annualPremium}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Premium</div>
            <div className="text-2xl font-bold">$${result.monthlyPremium}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Premium (to age 85)</div>
            <div className="text-2xl font-bold">$${result.totalPremium}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Benefit-to-Premium Ratio</div>
            <div className={`text-2xl font-bold ${result.isWorthIt ? 'text-green-600' : 'text-zinc-600'}`}>
              {result.benefitToPremiumRatio}x
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Benefit Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Daily Benefit</div>
            <div className="font-bold">$${result.dailyBenefit}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Monthly Benefit</div>
            <div className="font-bold">$${result.monthlyBenefit}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Potential Benefit</div>
            <div className="font-bold text-green-600">$${result.totalBenefit}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Break-Even (years of care)</div>
            <div className="font-bold">{result.breakEvenYears} years</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Self-Insurance Alternative</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Savings Needed</div>
            <div className="font-bold">$${result.selfInsuranceNeeded}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Monthly Savings Required</div>
            <div className="font-bold">$${result.monthlySavings}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 mt-2">
          Self-insurance requires saving $${result.monthlySavings}/month for {result.yearsToPay} years. Compare with premium cost to decide.
        </div>
      </div>

      {result.isWorthIt ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Insurance Value</h3>
          <div className="text-sm text-green-600">
            Potential benefits ({result.benefitToPremiumRatio}x premiums) suggest good value. Risk protection for unpredictable care needs. Consider purchasing.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Evaluate Alternatives</h3>
          <div className="text-sm text-yellow-600">
            Benefit-to-premium ratio under 2x. Consider: self-insurance savings, hybrid life/LTC policies, or reducing benefit period. Premiums may increase over time.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Average LTC Costs (National)</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Nursing Home</strong>
            <div className="text-zinc-500">$8,000/month average. Semi-private room.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Home Care</strong>
            <div className="text-zinc-500">$4,500/month average. In-home aide services.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Assisted Living</strong>
            <div className="text-zinc-500">$5,500/month average. Room + basic care.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Adult Day Care</strong>
            <div className="text-zinc-500">$1,500/month average. Daytime supervision.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="text-xs text-zinc-600">
          Buy age 55-65 for best rates. Health qualification required. Premiums can increase (class rate hikes). Benefits begin after elimination period. Covers nursing home, home care, assisted living. Medicaid backup if assets exhausted. Consider hybrid policies (life + LTC) for guaranteed payout.
        </div>
      </div>
    </main>
  )
}