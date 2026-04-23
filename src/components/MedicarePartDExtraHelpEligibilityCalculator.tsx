'use client'

import { useState } from 'react'

export default function MedicarePartDExtraHelpEligibilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(20000)
  const [resources, setResources] = useState(15000)
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married'>('single')
  const [livingSituation, setLivingSituation] = useState<'community' | 'institution'>('community')
  const [state, setState] = useState('CA')

  const calculate = () => {
    // Medicare Part D Extra Help (Low-Income Subsidy) eligibility
    // 2024 income and resource limits

    // Income limits 2024
    const incomeLimitsSingle = 21850 // Full Extra Help
    const incomeLimitsMarried = 29580 // Full Extra Help

    // Resource limits 2024
    const resourceLimitsSingle = 17150 // Full Extra Help
    const resourceLimitsMarried = 34300 // Full Extra Help

    // Partial Extra Help limits (higher)
    const partialIncomeSingle = 26280
    const partialIncomeMarried = 35330
    const partialResourceSingle = 51800
    const partialResourceMarried = 103600

    // Use appropriate limits based on marital status
    const fullIncomeLimit = maritalStatus === 'single' ? incomeLimitsSingle : incomeLimitsMarried
    const fullResourceLimit = maritalStatus === 'single' ? resourceLimitsSingle : resourceLimitsMarried
    const partialIncomeLimit = maritalStatus === 'single' ? partialIncomeSingle : partialIncomeMarried
    const partialResourceLimit = maritalStatus === 'single' ? partialResourceSingle : partialResourceMarried

    // Eligibility determination
    const incomeEligibleFull = annualIncome <= fullIncomeLimit
    const resourceEligibleFull = resources <= fullResourceLimit
    const eligibleFull = incomeEligibleFull && resourceEligibleFull

    const incomeEligiblePartial = annualIncome <= partialIncomeLimit
    const resourceEligiblePartial = resources <= partialResourceLimit
    const eligiblePartial = (incomeEligiblePartial && resourceEligiblePartial) && !eligibleFull

    const notEligible = !eligibleFull && !eligiblePartial

    // Extra Help benefits
    // Full Extra Help: $0 deductible, $0 premium, low copays
    const fullDeductible = 0
    const fullPremium = 0
    const fullGenericCopay = 4.50
    const fullBrandCopay = 11.30

    // Partial Extra Help: reduced premium, deductible, copays
    const partialDeductible = 104 // Reduced deductible
    const partialPremiumRange = 'Varies by plan'
    const partialGenericCopay = 15 // 15% coinsurance
    const partialBrandCopay = 15 // 15% coinsurance

    // Standard Part D (no Extra Help)
    const standardDeductible = 545
    const standardPremiumEstimate = 50 // Average
    const standardCopayPercentage = 25

    // Institutionalized individuals: higher limits
    const institutionalBonus = 5000 // Additional resource allowance (simplified)

    // State-specific SPAP (State Pharmaceutical Assistance Program)
    const hasSPAP = ['CA', 'NY', 'PA', 'NJ', 'CT', 'WI', 'MO', 'VT', 'ME', 'DE'].includes(state)

    // Estimated savings
    const fullAnnualSavings = standardDeductible + standardPremiumEstimate * 12 + 200 // Simplified
    const partialAnnualSavings = standardDeductible - partialDeductible + 300 // Simplified

    return {
      annualIncome: annualIncome.toFixed(0),
      resources: resources.toFixed(0),
      maritalStatus,
      livingSituation,
      state,
      fullIncomeLimit: fullIncomeLimit.toFixed(0),
      fullResourceLimit: fullResourceLimit.toFixed(0),
      partialIncomeLimit: partialIncomeLimit.toFixed(0),
      partialResourceLimit: partialResourceLimit.toFixed(0),
      incomeEligibleFull,
      resourceEligibleFull,
      eligibleFull,
      eligiblePartial,
      notEligible,
      fullDeductible: fullDeductible.toFixed(0),
      fullPremium: fullPremium.toFixed(0),
      fullGenericCopay: fullGenericCopay.toFixed(2),
      fullBrandCopay: fullBrandCopay.toFixed(2),
      partialDeductible: partialDeductible.toFixed(0),
      partialPremiumRange,
      partialGenericCopay: partialGenericCopay.toFixed(0),
      partialBrandCopay: partialBrandCopay.toFixed(0),
      standardDeductible: standardDeductible.toFixed(0),
      standardPremiumEstimate: standardPremiumEstimate.toFixed(0),
      standardCopayPercentage: standardCopayPercentage.toFixed(0),
      hasSPAP,
      fullAnnualSavings: fullAnnualSavings.toFixed(0),
      partialAnnualSavings: partialAnnualSavings.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part D Extra Help Eligibility Calculator</h1>
      <p className="text-gray-600 mb-4">Check eligibility for Low-Income Subsidy (LIS) program.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Resources/Assets ($)</label>
          <input type="number" value={resources} onChange={(e) => setResources(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Living Situation</label>
          <select value={livingSituation} onChange={(e) => setLivingSituation(e.target.value as 'community' | 'institution')} className="w-full border rounded p-2">
            <option value="community">Living in Community</option>
            <option value="institution">Institutionalized (Nursing Home)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input type="text" value={state} maxLength={2} onChange={(e) => setState(e.target.value.toUpperCase())} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.eligibleFull ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.eligibleFull ? 'text-green-700' : 'text-red-700'}`}>Extra Help Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Full Extra Help:</span><span className={`font-bold ml-2 ${result.eligibleFull ? 'text-green-700' : 'text-red-700'}`}>{result.eligibleFull ? 'Eligible' : 'Not Eligible'}</span></div>
          <div><span className="text-zinc-600">Partial Help:</span><span className={`font-bold ml-2 ${result.eligiblePartial ? 'text-orange-700' : 'text-zinc-600'}`}>{result.eligiblePartial ? 'Eligible' : 'Not Eligible'}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.eligibleFull ? 'text-green-700' : result.eligiblePartial ? 'text-orange-700' : 'text-red-700'}`}>{result.eligibleFull ? 'Full LIS' : result.eligiblePartial ? 'Partial LIS' : 'No LIS'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Extra Help (LIS) provides premium/deductible assistance for Part D drug coverage.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 Income Limits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Your Income:</span><span className="font-medium ml-2">$ {result.annualIncome}</span></div>
          <div><span className="text-zinc-600">Full LIS Limit:</span><span className="font-medium ml-2">$ {result.fullIncomeLimit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Partial LIS Limit:</span><span className="font-medium ml-2">$ {result.partialIncomeLimit}</span></div>
          <div><span className="text-zinc-600">Income Eligible (Full):</span><span className={`font-bold ml-2 ${result.incomeEligibleFull ? 'text-green-700' : 'text-red-700'}`}>{result.incomeEligibleFull ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Income includes wages, Social Security, pensions. Some income types excluded (SSI, food assistance).</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 Resource Limits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Your Resources:</span><span className="font-medium ml-2">$ {result.resources}</span></div>
          <div><span className="text-zinc-600">Full LIS Limit:</span><span className="font-medium ml-2">$ {result.fullResourceLimit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Partial LIS Limit:</span><span className="font-medium ml-2">$ {result.partialResourceLimit}</span></div>
          <div><span className="text-zinc-600">Resource Eligible (Full):</span><span className={`font-bold ml-2 ${result.resourceEligibleFull ? 'text-green-700' : 'text-red-700'}`}>{result.resourceEligibleFull ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Resources: cash, bank accounts, stocks, bonds. Home and car usually excluded.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Full Extra Help Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Deductible:</span><span className="font-bold text-green-700 ml-2">$ {result.fullDeductible}</span></div>
          <div><span className="text-zinc-600">Premium:</span><span className="font-bold text-green-700 ml-2">$ {result.fullPremium}</span></div>
          <div><span className="text-zinc-600">Generic Copay:</span><span className="font-medium ml-2">$ {result.fullGenericCopay}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Brand Copay:</span><span className="font-medium ml-2">$ {result.fullBrandCopay}</span></div>
          <div><span className="text-zinc-600">Annual Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.fullAnnualSavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Full LIS: no premium, no deductible, low copays for covered drugs.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Partial Extra Help Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Deductible:</span><span className="font-medium ml-2">$ {result.partialDeductible}</span></div>
          <div><span className="text-zinc-600">Premium:</span><span className="font-medium ml-2">{result.partialPremiumRange}</span></div>
          <div><span className="text-zinc-600">Generic Copay:</span><span className="font-medium ml-2">{result.partialGenericCopay}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Brand Copay:</span><span className="font-medium ml-2">{result.partialBrandCopay}%</span></div>
          <div><span className="text-zinc-600">Annual Savings:</span><span className="font-medium ml-2">$ {result.partialAnnualSavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Partial LIS: reduced premium/deductible, 15% coinsurance for drugs.</div>
      </div>

      <div className={`card mb-6 ${result.hasSPAP ? 'bg-teal-50 border border-teal-200' : 'bg-gray-50 border border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.hasSPAP ? 'text-teal-700' : 'text-gray-700'}`}>State Pharmaceutical Assistance (SPAP)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">State:</span><span className="font-medium ml-2">{result.state}</span></div>
          <div><span className="text-zinc-600">SPAP Available:</span><span className={`font-bold ml-2 ${result.hasSPAP ? 'text-teal-700' : 'text-gray-600'}`}>{result.hasSPAP ? 'Yes' : 'Check State'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Some states offer additional drug cost assistance (SPAP). Check your state program.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Extra Help Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Full Extra Help: $0 premium, $0 deductible</li>
          <li>Partial Extra Help: reduced costs</li>
          <li>Apply through SSA or Medicare</li>
          <li>Auto-enrolled if on Medicaid/SSI</li>
          <li>Income & resource limits apply</li>
          <li>Home and car excluded from resources</li>
          <li>Can apply anytime during year</li>
          <li>SPAP provides additional state help</li>
          <li>Catastrophic coverage copays lower</li>
          <li>Apply at ssa.gov or call 1-800-772-1213</li>
        </ul>
      </div>
    </div>
  )
}