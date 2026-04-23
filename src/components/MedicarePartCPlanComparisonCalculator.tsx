'use client'

import { useState } from 'react'

export default function MedicarePartCPlanComparisonCalculator() {
  const [planAPremium, setPlanAPremium] = useState(0)
  const [planBPremium, setPlanBPremium] = useState(174.70)
  const [planDDeductible, setPlanDDeductible] = useState(545)
  const [maPlanPremium, setMAPlanPremium] = useState(25)
  const [drugNeeds, setDrugNeeds] = useState('high')
  const [doctorVisits, setDoctorVisits] = useState('moderate')
  const [hasChronicCondition, setHasChronicCondition] = useState(false)
  const [travelNeeds, setTravelNeeds] = useState('rarely')
  const [supplementPlanType, setSupplementPlanType] = useState<'G' | 'N' | 'F'>('G')

  const calculate = () => {
    // Medicare Part C (Medicare Advantage) vs Original Medicare + Medigap comparison
    // Original Medicare: Part A + Part B + Part D + Medigap (optional)
    // Medicare Advantage: Part C includes A, B, usually D

    // Medigap 2024 premiums (approximate averages)
    const medigapPremiums: Record<string, number> = {
      G: 150, // Most popular
      N: 120, // Lower cost alternative
      F: 200, // Comprehensive (not available to new enrollees)
    }

    // Part D average premium 2024
    const partDAvgPremium = 50

    // Medicare Advantage additional benefits estimate
    const maExtraBenefits = {
      vision: 150, // Annual value
      dental: 300,
      hearing: 200,
      fitness: 100,
      otcDrugs: 50,
    }

    const totalMAExtraBenefits = Object.values(maExtraBenefits).reduce((a, b) => a + b, 0)

    // Original Medicare total annual cost estimate
    const originalMedicareAnnual = (planBPremium + medigapPremiums[supplementPlanType] + partDAvgPremium) * 12 + planDDeductible

    // Medicare Advantage total annual cost estimate
    const maAnnual = maPlanPremium * 12

    // Out-of-pocket maximum comparison
    // Original Medicare: No cap (unless Medigap covers all)
    // Medicare Advantage: Maximum $8,850 (2024) out-of-pocket limit

    const maOutOfPocketMax = 8850
    const originalMedicareOutOfPocket = 'No cap (Medigap covers most)'

    // Network comparison
    // Original Medicare: Any Medicare-certified provider nationwide
    // Medicare Advantage: Network-based (HMO, PPO)

    const originalNetwork = 'Nationwide'
    const maNetwork = 'Network-based'

    // Drug coverage comparison
    // Original Medicare: Stand-alone Part D plan
    // Medicare Advantage: Usually includes Part D

    // Cost estimates based on usage
    let estimatedAnnualDrugCost = 0
    if (drugNeeds === 'low') {
      estimatedAnnualDrugCost = 500
    } else if (drugNeeds === 'moderate') {
      estimatedAnnualDrugCost = 2000
    } else {
      estimatedAnnualDrugCost = 5000
    }

    let estimatedDoctorVisitsCost = 0
    if (doctorVisits === 'low') {
      estimatedDoctorVisitsCost = 200 // Copays only
    } else if (doctorVisits === 'moderate') {
      estimatedDoctorVisitsCost = 500
    } else {
      estimatedDoctorVisitsCost = 1000
    }

    // Medigap covers most copays (Plan G/N)
    const medigapCoverageRate = supplementPlanType === 'G' ? 0.95 : supplementPlanType === 'N' ? 0.85 : 0.99
    const originalOOPAfterMedigap = estimatedDoctorVisitsCost * (1 - medigapCoverageRate)

    // Medicare Advantage copays apply
    const maCopaysTotal = estimatedDoctorVisitsCost * 0.80 // MA typically has copays

    // Travel considerations
    const travelScore = travelNeeds === 'frequently' ? 'Original Medicare better' : travelNeeds === 'sometimes' ? 'PPO MA may work' : 'Both OK'

    // Chronic condition special needs
    const snpEligible = hasChronicCondition // Special Needs Plan eligibility

    // Recommendation factors
    const originalMedicareAdvantages = [
      'Nationwide provider access',
      'No network restrictions',
      'Predictable costs with Medigap',
      'Better for frequent travelers',
    ]

    const maAdvantages = [
      'Lower premiums often',
      'Extra benefits (vision, dental)',
      'Out-of-pocket maximum',
      'Coordination of care',
    ]

    // Total estimated annual cost comparison
    const originalTotalEstimate = originalMedicareAnnual + originalOOPAfterMedigap + estimatedAnnualDrugCost * 0.25 // Medigap covers some drug costs
    const maTotalEstimate = maAnnual + maCopaysTotal + estimatedAnnualDrugCost * 0.25 // MA Part D copays

    const cheaperOption = originalTotalEstimate <= maTotalEstimate ? 'Original Medicare + Medigap' : 'Medicare Advantage'

    return {
      planAPremium: planAPremium.toFixed(2),
      planBPremium: planBPremium.toFixed(2),
      planDDeductible: planDDeductible.toFixed(0),
      maPlanPremium: maPlanPremium.toFixed(2),
      drugNeeds,
      doctorVisits,
      hasChronicCondition,
      travelNeeds,
      supplementPlanType,
      medigapPremium: medigapPremiums[supplementPlanType].toFixed(0),
      partDAvgPremium: partDAvgPremium.toFixed(0),
      originalMedicareAnnual: originalMedicareAnnual.toFixed(0),
      maAnnual: maAnnual.toFixed(0),
      maExtraBenefits: totalMAExtraBenefits.toFixed(0),
      maOutOfPocketMax: maOutOfPocketMax.toFixed(0),
      originalMedicareOutOfPocket,
      originalNetwork,
      maNetwork,
      estimatedAnnualDrugCost: estimatedAnnualDrugCost.toFixed(0),
      originalOOPAfterMedigap: originalOOPAfterMedigap.toFixed(0),
      maCopaysTotal: maCopaysTotal.toFixed(0),
      travelScore,
      snpEligible,
      originalTotalEstimate: originalTotalEstimate.toFixed(0),
      maTotalEstimate: maTotalEstimate.toFixed(0),
      cheaperOption,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part C Plan Comparison Calculator</h1>
      <p className="text-gray-600 mb-4">Compare Medicare Advantage vs Original Medicare + Medigap costs.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Part B Premium</label>
          <input type="number" value={planBPremium} step="0.01" onChange={(e) => setPlanBPremium(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">MA Plan Monthly Premium</label>
          <input type="number" value={maPlanPremium} step="0.01" onChange={(e) => setMAPlanPremium(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Medigap Plan Type</label>
          <select value={supplementPlanType} onChange={(e) => setSupplementPlanType(e.target.value as 'G' | 'N' | 'F')} className="w-full border rounded p-2">
            <option value="G">Plan G (Most Popular)</option>
            <option value="N">Plan N (Lower Cost)</option>
            <option value="F">Plan F (Full Coverage)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Drug Usage Level</label>
          <select value={drugNeeds} onChange={(e) => setDrugNeeds(e.target.value)} className="w-full border rounded p-2">
            <option value="low">Low - Few prescriptions</option>
            <option value="moderate">Moderate - Several drugs</option>
            <option value="high">High - Many/expensive drugs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Doctor Visits Frequency</label>
          <select value={doctorVisits} onChange={(e) => setDoctorVisits(e.target.value)} className="w-full border rounded p-2">
            <option value="low">Low - Rarely see doctors</option>
            <option value="moderate">Moderate - Regular checkups</option>
            <option value="high">High - Frequent visits</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Travel Frequency</label>
          <select value={travelNeeds} onChange={(e) => setTravelNeeds(e.target.value)} className="w-full border rounded p-2">
            <option value="rarely">Rarely - Stay local</option>
            <option value="sometimes">Sometimes - Travel occasionally</option>
            <option value="frequently">Frequently - Travel often</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chronic Condition?</label>
          <select value={hasChronicCondition ? 'yes' : 'no'} onChange={(e) => setHasChronicCondition(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - May qualify for SNP</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.cheaperOption.includes('Original') ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.cheaperOption.includes('Original') ? 'text-blue-700' : 'text-green-700'}`}>Cost Comparison Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Original + Medigap:</span><span className="font-bold text-blue-700 ml-2">$ {result.originalTotalEstimate}/yr</span></div>
          <div><span className="text-zinc-600">Medicare Advantage:</span><span className="font-bold text-green-700 ml-2">$ {result.maTotalEstimate}/yr</span></div>
        </div>
        <div className="mt-2"><span className="text-zinc-600">Recommendation:</span><span className={`font-bold ml-2 ${result.cheaperOption.includes('Original') ? 'text-blue-700' : 'text-green-700'}`}>{result.cheaperOption}</span></div>
        <div className="text-xs text-zinc-600 mt-2">Estimates based on your usage level. Actual costs vary by plan.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Original Medicare + Medigap</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Part B:</span><span className="font-medium ml-2">$ {result.planBPremium}/mo</span></div>
          <div><span className="text-zinc-600">Medigap:</span><span className="font-medium ml-2">$ {result.medigapPremium}/mo</span></div>
          <div><span className="text-zinc-600">Part D:</span><span className="font-medium ml-2">$ {result.partDAvgPremium}/mo</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Annual Premium:</span><span className="font-bold text-blue-700 ml-2">$ {result.originalMedicareAnnual}</span></div>
          <div><span className="text-zinc-600">Network:</span><span className="font-bold text-blue-700 ml-2">{result.originalNetwork}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Original Medicare + Plan {result.supplementPlanType} Medigap + Part D. Any Medicare-certified provider nationwide.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Medicare Advantage (Part C)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Premium:</span><span className="font-medium ml-2">$ {result.maPlanPremium}/mo</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className="font-bold text-green-700 ml-2">$ {result.maAnnual}</span></div>
          <div><span className="text-zinc-600">Extra Benefits:</span><span className="font-medium ml-2">$ {result.maExtraBenefits}/yr</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">OOP Max:</span><span className="font-bold text-green-700 ml-2">$ {result.maOutOfPocketMax}</span></div>
          <div><span className="text-zinc-600">Network:</span><span className="font-bold text-green-700 ml-2">{result.maNetwork}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Includes Part A, B, D. Often includes vision, dental, hearing. Out-of-pocket maximum protection.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Key Differences</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm">
            <div className="font-semibold text-purple-700 mb-1">Original Medicare</div>
            <div className="text-xs text-zinc-600">✓ Nationwide providers</div>
            <div className="text-xs text-zinc-600">✓ Predictable with Medigap</div>
            <div className="text-xs text-zinc-600">✓ No network restrictions</div>
            <div className="text-xs text-zinc-600">✗ Higher premiums</div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-purple-700 mb-1">Medicare Advantage</div>
            <div className="text-xs text-zinc-600">✓ Lower premiums often</div>
            <div className="text-xs text-zinc-600">✓ Extra benefits</div>
            <div className="text-xs text-zinc-600">✓ OOP maximum cap</div>
            <div className="text-xs text-zinc-600">✗ Network restrictions</div>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.travelScore.includes('Original') ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.travelScore.includes('Original') ? 'text-blue-700' : 'text-green-700'}`}>Travel Consideration</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Your Travel:</span><span className="font-medium ml-2">{result.travelNeeds}</span></div>
          <div><span className="text-zinc-600">Recommendation:</span><span className={`font-bold ml-2 ${result.travelScore.includes('Original') ? 'text-blue-700' : 'text-green-700'}`}>{result.travelScore}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Original Medicare works nationwide. MA plans are network-based - PPO offers more flexibility than HMO.</div>
      </div>

      {result.snpEligible && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Special Needs Plan (SNP) Eligibility</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Eligible:</span><span className="font-bold text-teal-700 ml-2">Yes</span></div>
            <div><span className="text-zinc-600">Benefit:</span><span className="font-medium ml-2">Tailored coverage</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Chronic condition SNP provides specialized care coordination and benefits.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part C vs Original Medicare Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Original: nationwide access, predictable costs</li>
          <li>MA: lower premiums, extra benefits, OOP max</li>
          <li>Medigap G: most popular, covers Part B coinsurance</li>
          <li>MA HMO: lower cost, network required</li>
          <li>MA PPO: more flexibility, higher cost</li>
          <li>SNP: for chronic conditions/dual eligible</li>
          <li>Compare plans during AEP (Oct 15 - Dec 7)</li>
          <li>Can switch MA to Original during OEP</li>
          <li>Travel: Original better for frequent travelers</li>
          <li>Check plan ratings before choosing</li>
        </ul>
      </div>
    </div>
  )
}