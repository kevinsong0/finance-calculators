'use client'

import { useState } from 'react'

export default function MedicareMedigapPlanComparisonCalculator() {
  const [age, setAge] = useState(65)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [tobaccoUse, setTobaccoUse] = useState(false)
  const [state, setState] = useState('CA')
  const [healthStatus, setHealthStatus] = useState<'excellent' | 'good' | 'fair'>('good')

  const calculate = () => {
    // Medigap (Medicare Supplement) plan comparison
    // Plans standardized: A, B, C, D, F, G, K, L, M, N
    // 2024 average premiums (approximate)

    const planDetails: Record<string, {
        name: string;
        premiumBase: number;
        covers: string[];
        gaps: string[];
        note?: string;
        oopMax?: number;
      }> = {
      A: {
        name: 'Plan A',
        premiumBase: 100,
        covers: ['Part A coinsurance', 'Part B coinsurance', 'Blood (3 pints)', 'Part A hospice'],
        gaps: ['Part B deductible', 'Part A deductible', 'Foreign travel', 'Part B excess charges'],
      },
      B: {
        name: 'Plan B',
        premiumBase: 120,
        covers: ['Part A coinsurance', 'Part B coinsurance', 'Blood', 'Part A hospice', 'Part A deductible'],
        gaps: ['Part B deductible', 'Foreign travel', 'Part B excess charges'],
      },
      C: {
        name: 'Plan C',
        premiumBase: 140,
        covers: ['Part A coinsurance', 'Part B coinsurance', 'Blood', 'Part A hospice', 'Part A deductible', 'Part B deductible', 'Skilled nursing', 'Foreign travel (80%)'],
        gaps: ['Part B excess charges'],
      },
      D: {
        name: 'Plan D',
        premiumBase: 135,
        covers: ['Part A coinsurance', 'Part B coinsurance', 'Blood', 'Part A hospice', 'Part A deductible', 'Skilled nursing', 'Foreign travel'],
        gaps: ['Part B deductible', 'Part B excess charges'],
      },
      F: {
        name: 'Plan F',
        premiumBase: 200,
        covers: ['Everything (full coverage)'],
        gaps: [],
        note: 'Not available to new enrollees after 2020',
      },
      G: {
        name: 'Plan G',
        premiumBase: 150,
        covers: ['Part A coinsurance', 'Part B coinsurance', 'Blood', 'Part A hospice', 'Part A deductible', 'Skilled nursing', 'Foreign travel', 'Part B excess charges'],
        gaps: ['Part B deductible ($240)'],
        note: 'Most popular for new enrollees',
      },
      K: {
        name: 'Plan K',
        premiumBase: 80,
        covers: ['50% of Part A deductible', '50% of Part B coinsurance', '50% of Blood', '50% of Part A hospice'],
        gaps: ['Part B deductible', 'Full Part A deductible', 'Part B excess charges'],
        oopMax: 6600,
      },
      L: {
        name: 'Plan L',
        premiumBase: 90,
        covers: ['75% of covered services'],
        gaps: ['Part B deductible', '25% of costs'],
        oopMax: 3300,
      },
      N: {
        name: 'Plan N',
        premiumBase: 120,
        covers: ['Part A coinsurance', 'Part B coinsurance (except copays)', 'Blood', 'Part A hospice', 'Part A deductible', 'Skilled nursing', 'Foreign travel'],
        gaps: ['Part B deductible', 'Part B copays ($20 office, $50 ER)'],
        note: 'Lower cost alternative to G',
      },
    }

    // Premium adjustments
    let ageFactor = 1
    if (age >= 70) ageFactor = 1.15
    if (age >= 75) ageFactor = 1.30
    if (age >= 80) ageFactor = 1.50

    let tobaccoFactor = tobaccoUse ? 1.20 : 1

    let healthFactor = 1
    if (healthStatus === 'excellent') healthFactor = 0.90
    if (healthStatus === 'fair') healthFactor = 1.10

    // Calculate premiums for each plan
    const plans = Object.entries(planDetails).map(([key, plan]) => ({
      key,
      name: plan.name,
      premium: (plan.premiumBase * ageFactor * tobaccoFactor * healthFactor).toFixed(0),
      covers: plan.covers,
      gaps: plan.gaps,
      note: plan.note || '',
      oopMax: plan.oopMax || 0,
      annualPremium: (plan.premiumBase * ageFactor * tobaccoFactor * healthFactor * 12).toFixed(0),
    }))

    // Recommendation based on factors
    let recommendation = 'G'
    if (healthStatus === 'fair' && age < 70) recommendation = 'N'
    if (tobaccoUse) recommendation = 'N'
    if (age >= 80) recommendation = 'K'

    // Best value analysis
    const bestValue = plans.find(p => p.key === 'G')
    const lowestCost = plans.find(p => p.key === 'K')
    const mostPopular = plans.find(p => p.key === 'G')

    // Enrollment period
    // Medigap Open Enrollment: 6 months after Part B enrollment
    // Best time to buy: age 65, during open enrollment (guaranteed issue)

    return {
      age: age.toFixed(0),
      gender,
      tobaccoUse,
      state,
      healthStatus,
      ageFactor: ageFactor.toFixed(2),
      tobaccoFactor: tobaccoFactor.toFixed(2),
      healthFactor: healthFactor.toFixed(2),
      plans,
      recommendation,
      bestValueName: bestValue?.name || '',
      bestValuePremium: bestValue?.premium || '0',
      lowestCostName: lowestCost?.name || '',
      lowestCostPremium: lowestCost?.premium || '0',
      mostPopularName: mostPopular?.name || '',
      mostPopularPremium: mostPopular?.premium || '0',
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Medigap Plan Comparison Calculator</h1>
      <p className="text-gray-600 mb-4">Compare standardized Medigap plans A, B, C, D, F, G, K, L, N.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={age} min="65" max="85" onChange={(e) => setAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} className="w-full border rounded p-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tobacco Use</label>
          <select value={tobaccoUse ? 'yes' : 'no'} onChange={(e) => setTobaccoUse(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - use within 12 months</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Health Status</label>
          <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value as 'excellent' | 'good' | 'fair')} className="w-full border rounded p-2">
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Premium Factors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Age Factor:</span><span className="font-medium ml-2">{result.ageFactor}</span></div>
          <div><span className="text-zinc-600">Tobacco:</span><span className="font-medium ml-2">{result.tobaccoFactor}</span></div>
          <div><span className="text-zinc-600">Health:</span><span className="font-medium ml-2">{result.healthFactor}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Premiums vary by age, tobacco use, health, state, and issuer. Estimates only.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Top Recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Most Popular:</span><span className="font-bold text-green-700 ml-2">{result.mostPopularName} ($ {result.mostPopularPremium}/mo)</span></div>
          <div><span className="text-zinc-600">Best Value:</span><span className="font-bold text-green-700 ml-2">{result.bestValueName} ($ {result.bestValuePremium}/mo)</span></div>
          <div><span className="text-zinc-600">Lowest Cost:</span><span className="font-bold text-green-700 ml-2">{result.lowestCostName} ($ {result.lowestCostPremium}/mo)</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Plan G is most popular for new enrollees. Plan N offers lower cost with copays.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Plan Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Plan</th>
                <th className="py-2 text-left">Premium</th>
                <th className="py-2 text-left">Annual</th>
                <th className="py-2 text-left">Key Coverage</th>
              </tr>
            </thead>
            <tbody>
              {result.plans.map((plan) => (
                <tr key={plan.key} className="border-b">
                  <td className="py-1 font-semibold">{plan.name}</td>
                  <td className="py-1">$ {plan.premium}/mo</td>
                  <td className="py-1">$ {plan.annualPremium}</td>
                  <td className="py-1">{plan.covers.slice(0, 2).join(', ')}{plan.note ? ` (${plan.note})` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Premiums are estimates. Actual rates vary by state and insurer.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Plan G Details (Most Popular)</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div className="font-semibold text-orange-700 mb-1">Covers:</div>
          {result.plans.find(p => p.key === 'G')?.covers.map((c, i) => (
            <div key={i}>✓ {c}</div>
          ))}
        </div>
        <div className="text-sm text-zinc-600 mt-2">
          <div className="font-semibold text-red-700 mb-1">Gaps:</div>
          <div>✗ Part B deductible ($240 in 2024)</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Plan G covers almost everything except Part B deductible. Best for new enrollees.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Plan N Details (Lower Cost)</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div className="font-semibold text-teal-700 mb-1">Covers:</div>
          {result.plans.find(p => p.key === 'N')?.covers.slice(0, 4).map((c, i) => (
            <div key={i}>✓ {c}</div>
          ))}
        </div>
        <div className="text-sm text-zinc-600 mt-2">
          <div className="font-semibold text-red-700 mb-1">Gaps:</div>
          <div>✗ Part B deductible ($240)</div>
          <div>✗ Office visit copay ($20)</div>
          <div>✗ ER copay ($50)</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Plan N has small copays but lower premium. Good for healthy individuals.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Medigap Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Plans standardized by federal law</li>
          <li>Same coverage regardless of insurer</li>
          <li>Plan G: most popular for new enrollees</li>
          <li>Plan F: not available after 2020</li>
          <li>Open Enrollment: 6 months after Part B</li>
          <li>Guaranteed issue during open enrollment</li>
          <li>Can change plans anytime (may require underwriting)</li>
          <li>Premiums vary by age, location, tobacco</li>
          <li>Does not include Part D drug coverage</li>
          <li>Compare prices from multiple insurers</li>
        </ul>
      </div>
    </div>
  )
}