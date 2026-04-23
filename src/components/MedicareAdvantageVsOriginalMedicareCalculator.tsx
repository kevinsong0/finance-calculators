'use client'

import { useState } from 'react'

export default function MedicareAdvantageVsOriginalMedicareCalculator() {
  const [age, setAge] = useState(65)
  const [healthStatus, setHealthStatus] = useState<'good' | 'average' | 'poor'>('average')
  const [prescriptionNeeds, setPrescriptionNeeds] = useState<'none' | 'few' | 'many'>('few')
  const [doctorPreference, setDoctorPreference] = useState<'any' | 'preferred'>('preferred')
  const [travelFrequency, setTravelFrequency] = useState<'rarely' | 'sometimes' | 'frequently'>('sometimes')
  const [location, setLocation] = useState<'urban' | 'suburban' | 'rural'>('urban')

  const calculate = () => {
    // Original Medicare costs (2024 estimates)
    const partAPremium = 0 // Usually free
    const partBPremium = 174.70 // Standard premium
    const partBDeductible = 240
    const partBCoinsurance = 0.20 // 20% of approved amount

    // Medigap Plan G cost (estimated)
    const medigapPlanGMonthly = 150 * (age < 70 ? 1.0 : age < 75 ? 1.15 : 1.30)
    const medigapAnnual = medigapPlanGMonthly * 12

    // Part D drug plan (estimated)
    const partDMonthly = 30
    const partDAnnual = partDMonthly * 12

    // Original Medicare total
    const originalMedicareTotalAnnual = partBPremium * 12 + partBDeductible + medigapAnnual + partDAnnual

    // Medicare Advantage costs (estimated average)
    const maMonthlyPremium = 18 // Many plans have $0 premium, but average varies
    const maAnnualPremium = maMonthlyPremium * 12
    const maDeductible = 200
    const maMaxOutOfPocket = 4500 // Average MOOP limit

    // MA includes Part D (drug coverage included)
    const maDrugIncluded = true

    // Medicare Advantage total
    const maTotalAnnual = maAnnualPremium + maDeductible + maMaxOutOfPocket * 0.3 // Assume 30% of MOOP used

    // Health status factor
    const healthFactor = healthStatus === 'good' ? 0.5 : healthStatus === 'average' ? 1.0 : 1.5

    // Estimated actual costs based on health
    const originalEstimatedCost = partBPremium * 12 + partBDeductible + medigapAnnual + partDAnnual * healthFactor
    const maEstimatedCost = maAnnualPremium + maDeductible + maMaxOutOfPocket * healthFactor * 0.3

    // Doctor network flexibility
    const originalDoctorFlexibility = 'Any Medicare-approved doctor nationwide'
    const maDoctorFlexibility = 'Network-based (HMO/PPO), may need referrals'

    // Travel coverage
    const originalTravelCoverage = travelFrequency === 'frequently' ? 'Excellent - nationwide coverage' : 'Good'
    const maTravelCoverage = travelFrequency === 'frequently' ? 'Limited - emergency only outside network' : 'Moderate'

    // Recommendation scoring
    const originalScore =
      (doctorPreference === 'preferred' ? 3 : 0) +
      (travelFrequency === 'frequently' ? 2 : travelFrequency === 'sometimes' ? 1 : 0) +
      (healthStatus === 'poor' ? 2 : 0) +
      (prescriptionNeeds === 'many' ? 0 : prescriptionNeeds === 'few' ? 1 : 2) +
      (location === 'rural' ? 2 : location === 'suburban' ? 1 : 0)

    const maScore =
      (doctorPreference === 'any' ? 3 : 0) +
      (travelFrequency === 'rarely' ? 2 : travelFrequency === 'sometimes' ? 1 : 0) +
      (healthStatus === 'good' ? 2 : healthStatus === 'average' ? 1 : 0) +
      (prescriptionNeeds === 'many' ? 2 : prescriptionNeeds === 'few' ? 1 : 0) +
      (location === 'urban' ? 2 : location === 'suburban' ? 1 : 0)

    const recommendation = originalScore > maScore ? 'Original Medicare + Medigap' :
                          maScore > originalScore ? 'Medicare Advantage' : 'Depends on preferences'

    return {
      age: age.toFixed(0),
      healthStatus,
      prescriptionNeeds,
      doctorPreference,
      travelFrequency,
      location,
      partAPremium: partAPremium.toFixed(0),
      partBPremium: partBPremium.toFixed(2),
      partBDeductible: partBDeductible.toFixed(0),
      partBCoinsurance: partBCoinsurance.toFixed(2),
      medigapPlanGMonthly: medigapPlanGMonthly.toFixed(0),
      medigapAnnual: medigapAnnual.toFixed(0),
      partDMonthly: partDMonthly.toFixed(0),
      partDAnnual: partDAnnual.toFixed(0),
      originalMedicareTotalAnnual: originalMedicareTotalAnnual.toFixed(0),
      maMonthlyPremium: maMonthlyPremium.toFixed(0),
      maAnnualPremium: maAnnualPremium.toFixed(0),
      maDeductible: maDeductible.toFixed(0),
      maMaxOutOfPocket: maMaxOutOfPocket.toFixed(0),
      maDrugIncluded,
      maTotalAnnual: maTotalAnnual.toFixed(0),
      originalEstimatedCost: originalEstimatedCost.toFixed(0),
      maEstimatedCost: maEstimatedCost.toFixed(0),
      originalDoctorFlexibility,
      maDoctorFlexibility,
      originalTravelCoverage,
      maTravelCoverage,
      originalScore: originalScore.toFixed(0),
      maScore: maScore.toFixed(0),
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Advantage vs Original Medicare Calculator</h1>
      <p className="text-gray-600 mb-4">Compare costs and coverage to find your best Medicare option.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={age} min="65" max="80" onChange={(e) => setAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Health Status</label>
          <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value as 'good' | 'average' | 'poor')} className="w-full border rounded p-2">
            <option value="good">Good - rarely need care</option>
            <option value="average">Average - occasional care</option>
            <option value="poor">Poor - frequent medical needs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prescription Drug Needs</label>
          <select value={prescriptionNeeds} onChange={(e) => setPrescriptionNeeds(e.target.value as 'none' | 'few' | 'many')} className="w-full border rounded p-2">
            <option value="none">None - no regular prescriptions</option>
            <option value="few">Few - 1-3 medications</option>
            <option value="many">Many - multiple prescriptions</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Doctor Preference</label>
          <select value={doctorPreference} onChange={(e) => setDoctorPreference(e.target.value as 'any' | 'preferred')} className="w-full border rounded p-2">
            <option value="preferred">Preferred - want specific doctors</option>
            <option value="any">Any - flexible with doctors</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Travel Frequency</label>
          <select value={travelFrequency} onChange={(e) => setTravelFrequency(e.target.value as 'rarely' | 'sometimes' | 'frequently')} className="w-full border rounded p-2">
            <option value="rarely">Rarely - mostly stay home</option>
            <option value="sometimes">Sometimes - occasional trips</option>
            <option value="frequently">Frequently - travel often</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value as 'urban' | 'suburban' | 'rural')} className="w-full border rounded p-2">
            <option value="urban">Urban - many providers nearby</option>
            <option value="suburban">Suburban - moderate options</option>
            <option value="rural">Rural - limited providers</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Original Medicare Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Part A Premium:</span><span className="font-medium ml-2">$ {result.partAPremium} (usually free)</span></div>
          <div><span className="text-zinc-600">Part B Premium:</span><span className="font-medium ml-2">$ {result.partBPremium}/mo</span></div>
          <div><span className="text-zinc-600">Part B Deductible:</span><span className="font-medium ml-2">$ {result.partBDeductible}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Medigap Plan G:</span><span className="font-medium ml-2">$ {result.medigapPlanGMonthly}/mo</span></div>
          <div><span className="text-zinc-600">Part D Drug Plan:</span><span className="font-medium ml-2">$ {result.partDMonthly}/mo</span></div>
        </div>
        <div className="mt-2">
          <div><span className="text-zinc-600">Estimated Annual Cost:</span><span className="font-bold text-blue-700 ml-2">$ {result.originalEstimatedCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Original Medicare = Part A + Part B + Medigap (optional) + Part D (optional).</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Medicare Advantage Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">MA Premium:</span><span className="font-medium ml-2">$ {result.maMonthlyPremium}/mo</span></div>
          <div><span className="text-zinc-600">MA Deductible:</span><span className="font-medium ml-2">$ {result.maDeductible}</span></div>
          <div><span className="text-zinc-600">Max Out-of-Pocket:</span><span className="font-bold text-green-700 ml-2">$ {result.maMaxOutOfPocket}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Drug Coverage:</span><span className="font-medium ml-2">{result.maDrugIncluded ? 'Included' : 'Separate'}</span></div>
          <div><span className="text-zinc-600">Estimated Annual:</span><span className="font-bold text-green-700 ml-2">$ {result.maEstimatedCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Medicare Advantage bundles Part A, B, and usually D with max out-of-pocket protection.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Doctor & Network Flexibility</h2>
        <div className="grid grid-cols-1 gap-2">
          <div><span className="text-zinc-600">Original Medicare:</span><span className="font-medium ml-2">{result.originalDoctorFlexibility}</span></div>
          <div><span className="text-zinc-600">Medicare Advantage:</span><span className="font-medium ml-2">{result.maDoctorFlexibility}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Original Medicare offers nationwide access. MA plans use networks (HMO/PPO).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Travel Coverage</h2>
        <div className="grid grid-cols-1 gap-2">
          <div><span className="text-zinc-600">Original Medicare:</span><span className="font-medium ml-2">{result.originalTravelCoverage}</span></div>
          <div><span className="text-zinc-600">Medicare Advantage:</span><span className="font-medium ml-2">{result.maTravelCoverage}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Original Medicare works nationwide. MA covers emergencies only outside network area.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation Score</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original Medicare Score:</span><span className="font-bold text-teal-700 ml-2">{result.originalScore}</span></div>
          <div><span className="text-zinc-600">Medicare Advantage Score:</span><span className="font-bold text-teal-700 ml-2">{result.maScore}</span></div>
        </div>
        <div className="mt-2 text-sm font-bold">Recommended: {result.recommendation}</div>
        <div className="text-xs text-zinc-600 mt-2">Score based on your preferences for doctors, travel, health needs, and location.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Medicare Decision Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Original Medicare: nationwide coverage, choose any doctor, add Medigap</li>
          <li>Medicare Advantage: bundled coverage, max out-of-pocket, may have $0 premium</li>
          <li>MA includes drug coverage (Part D), Original needs separate Part D</li>
          <li>Original + Medigap: predictable costs, no network restrictions</li>
          <li>MA: lower premiums but copays, network limits, max OOP protection</li>
          <li>Travel frequently? Original Medicare better for nationwide access</li>
          <li>Prefer specific doctors? Original Medicare offers more flexibility</li>
          <li>Good health + urban? MA may offer extra benefits at lower cost</li>
          <li>Can switch during Medicare Open Enrollment (Oct 15 - Dec 7)</li>
        </ul>
      </div>
    </div>
  )
}