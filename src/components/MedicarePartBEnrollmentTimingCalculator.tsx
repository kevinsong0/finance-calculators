'use client'

import { useState } from 'react'

export default function MedicarePartBEnrollmentTimingCalculator() {
  const [currentAge, setCurrentAge] = useState(64)
  const [hasPartB, setHasPartB] = useState(false)
  const [retirementAge, setRetirementAge] = useState(65)
  const [hasGroupHealthPlan, setHasGroupHealthPlan] = useState(true)
  const [employerSize, setEmployerSize] = useState<'small' | 'large'>('large')
  const [incomeLevel, setIncomeLevel] = useState<'standard' | 'irmaa1' | 'irmaa2' | 'irmaa3'>('standard')
  const [enrollmentIntent, setEnrollmentIntent] = useState<'standard' | 'delayed'>('standard')

  const calculate = () => {
    // Medicare Part B premiums (2024)
    const standardPartBPremium = 174.70
    const irmaaTiers = {
      standard: 174.70,
      irmaa1: 244.60, // Income $103,000-$129,000 (single)
      irmaa2: 349.40, // Income $129,000-$161,000
      irmaa3: 459.00, // Income $161,000-$193,000
    }

    // Part B deductible (2024)
    const partBDeductible = 240

    // Coinsurance
    const partBCoinsurance = 0.20 // 20%

    // Late enrollment penalty
    const latePenaltyRate = 10 // 10% of premium per 12-month period
    const penaltyDuration = 'Lifetime'

    // Enrollment timing
    const iepStartAge = currentAge >= 65 ? 'Already eligible' : 64.75 // 3 months before 65
    const iepEndAge = 65.25 // 3 months after 65

    // SEP for group health plan
    const sepAvailable = hasGroupHealthPlan && employerSize === 'large'
    const sepDurationMonths = 8

    // Calculate premium based on income
    const partBPremium = irmaaTiers[incomeLevel]

    // Late penalty calculation
    const yearsDelayed = enrollmentIntent === 'delayed' ? 2 : 0 // Example: 2 years delayed
    const penaltyPercentage = yearsDelayed * latePenaltyRate
    const penaltyAmount = partBPremium * penaltyPercentage / 100
    const totalPremiumWithPenalty = partBPremium + penaltyAmount

    // Annual costs
    const annualPartB = partBPremium * 12
    const annualWithPenalty = totalPremiumWithPenalty * 12
    const deductibleAnnual = partBDeductible

    // Total potential late enrollment cost
    const penaltyLifetimeCost = penaltyAmount * 12 * 10 // Estimate 10 years

    // Coverage start timing
    const standardCoverageStart = 'First day of birthday month (or following month if enroll late in IEP)'
    const sepCoverageStart = 'First day of month after enrollment'

    // IRMAA details
    const irmaaThresholds = {
      standard: { single: '<$103,000', married: '<$206,000' },
      irmaa1: { single: '$103,000-$129,000', married: '$206,000-$258,000' },
      irmaa2: { single: '$129,000-$161,000', married: '$258,000-$322,000' },
      irmaa3: { single: '$161,000-$193,000', married: '$322,000-$386,000' },
    }

    return {
      currentAge: currentAge.toFixed(0),
      hasPartB,
      retirementAge: retirementAge.toFixed(0),
      hasGroupHealthPlan,
      employerSize,
      incomeLevel,
      enrollmentIntent,
      standardPartBPremium: standardPartBPremium.toFixed(2),
      partBPremium: partBPremium.toFixed(2),
      partBDeductible: partBDeductible.toFixed(0),
      partBCoinsurance: partBCoinsurance.toFixed(2),
      latePenaltyRate: latePenaltyRate.toFixed(0),
      penaltyDuration,
      iepStartAge,
      iepEndAge: iepEndAge.toFixed(2),
      sepAvailable,
      sepDurationMonths: sepDurationMonths.toFixed(0),
      yearsDelayed: yearsDelayed.toFixed(0),
      penaltyPercentage: penaltyPercentage.toFixed(0),
      penaltyAmount: penaltyAmount.toFixed(2),
      totalPremiumWithPenalty: totalPremiumWithPenalty.toFixed(2),
      annualPartB: annualPartB.toFixed(0),
      annualWithPenalty: annualWithPenalty.toFixed(0),
      deductibleAnnual: deductibleAnnual.toFixed(0),
      penaltyLifetimeCost: penaltyLifetimeCost.toFixed(0),
      standardCoverageStart,
      sepCoverageStart,
      irmaaThresholdSingle: irmaaThresholds[incomeLevel].single,
      irmaaThresholdMarried: irmaaThresholds[incomeLevel].married,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part B Enrollment Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Plan Part B enrollment timing to avoid penalties and IRMAA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="62" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <input type="number" value={retirementAge} min="62" max="70" onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Size</label>
          <select value={employerSize} onChange={(e) => setEmployerSize(e.target.value as 'small' | 'large')} className="w-full border rounded p-2">
            <option value="large">20+ employees (SEP available)</option>
            <option value="small">Under 20 employees (No SEP)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Health Coverage?</label>
          <select value={hasGroupHealthPlan ? 'yes' : 'no'} onChange={(e) => setHasGroupHealthPlan(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - active coverage</option>
            <option value="no">No - no employer coverage</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income Level (2 years prior)</label>
          <select value={incomeLevel} onChange={(e) => setIncomeLevel(e.target.value as 'standard' | 'irmaa1' | 'irmaa2' | 'irmaa3')} className="w-full border rounded p-2">
            <option value="standard">Standard ($103K single/$206K married)</option>
            <option value="irmaa1">IRMAA Tier 1 ($103K-$129K)</option>
            <option value="irmaa2">IRMAA Tier 2 ($129K-$161K)</option>
            <option value="irmaa3">IRMAA Tier 3 ($161K-$193K)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enrollment Intent</label>
          <select value={enrollmentIntent} onChange={(e) => setEnrollmentIntent(e.target.value as 'standard' | 'delayed')} className="w-full border rounded p-2">
            <option value="standard">Standard (at age 65)</option>
            <option value="delayed">Delayed (after IEP)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Initial Enrollment Period</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">IEP Start:</span><span className="font-medium ml-2">{result.iepStartAge}</span></div>
          <div><span className="text-zinc-600">IEP End:</span><span className="font-bold text-blue-700 ml-2">Age {result.iepEndAge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">7-month window: 3 months before, birthday month, 3 months after turning 65.</div>
      </div>

      <div className={`card mb-6 ${result.sepAvailable ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.sepAvailable ? 'text-green-700' : 'text-orange-700'}`}>Special Enrollment Period</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">SEP Available:</span><span className={`font-bold ml-2 ${result.sepAvailable ? 'text-green-700' : 'text-orange-700'}`}>{result.sepAvailable ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">SEP Duration:</span><span className="font-medium ml-2">{result.sepDurationMonths} months after coverage ends</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SEP available if covered by large employer group health plan based on current employment.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part B Premium & IRMAA</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Standard Premium:</span><span className="font-medium ml-2">$ {result.standardPartBPremium}/mo</span></div>
          <div><span className="text-zinc-600">Your Premium:</span><span className="font-bold text-purple-700 ml-2">$ {result.partBPremium}/mo</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className="font-medium ml-2">$ {result.annualPartB}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Income Threshold (Single):</span><span className="font-medium ml-2">{result.irmaaThresholdSingle}</span></div>
          <div><span className="text-zinc-600">Income Threshold (Married):</span><span className="font-medium ml-2">{result.irmaaThresholdMarried}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRMAA based on income from 2 years prior. Standard premium: $174.70/month (2024).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part B Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Deductible:</span><span className="font-medium ml-2">$ {result.partBDeductible}</span></div>
          <div><span className="text-zinc-600">Coinsurance:</span><span className="font-medium ml-2">20%</span></div>
          <div><span className="text-zinc-600">Annual Premium:</span><span className="font-bold text-orange-700 ml-2">$ {result.annualPartB}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">After deductible, you pay 20% of Medicare-approved amounts for most services.</div>
      </div>

      <div className={`card mb-6 ${result.enrollmentIntent === 'delayed' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.enrollmentIntent === 'delayed' ? 'text-red-700' : 'text-green-700'}`}>Late Enrollment Penalty</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Penalty Applies:</span><span className={`font-bold ml-2 ${result.enrollmentIntent === 'delayed' ? 'text-red-700' : 'text-green-700'}`}>{result.enrollmentIntent === 'delayed' && !result.sepAvailable ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Penalty Rate:</span><span className="font-medium ml-2">{result.latePenaltyRate}%/year</span></div>
          <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.penaltyDuration}</span></div>
        </div>
        {result.enrollmentIntent === 'delayed' && (
          <div className="mt-2">
            <div><span className="text-zinc-600">Penalty Amount:</span><span className="font-bold text-red-700 ml-2">$ {result.penaltyAmount}/mo</span></div>
            <div><span className="text-zinc-600">Total Premium:</span><span className="font-bold text-red-700 ml-2">$ {result.totalPremiumWithPenalty}/mo</span></div>
            <div><span className="text-zinc-600">Est. Lifetime Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.penaltyLifetimeCost}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Penalty = 10% of premium per 12-month period you could have had Part B but didn't. Penalty lasts forever.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part B Enrollment Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Enroll during IEP to avoid lifetime penalty</li>
          <li>SEP available if covered by large employer plan</li>
          <li>SEP: 8 months after employment/coverage ends</li>
          <li>Late penalty: 10% per 12-month period, forever</li>
          <li>IRMAA may apply based on income (2 years prior)</li>
          <li>Delay Part B if SEP available and employer coverage active</li>
          <li>Part B premium: $174.70/month (2024 standard)</li>
          <li>Deductible: $240, then 20% coinsurance</li>
          <li>Coordinate Part B with employer coverage carefully</li>
        </ul>
      </div>
    </div>
  )
}