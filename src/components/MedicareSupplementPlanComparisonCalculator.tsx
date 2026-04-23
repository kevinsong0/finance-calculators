'use client'

import { useState } from 'react'

export default function MedicareSupplementPlanComparisonCalculator() {
  const [age, setAge] = useState(65)
  const [location, setLocation] = useState<'ca' | 'ny' | 'tx' | 'fl' | 'other'>('other')
  const [hasPartA, setHasPartA] = useState(true)
  const [hasPartB, setHasPartB] = useState(true)
  const [tobaccoUse, setTobaccoUse] = useState(false)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [planType, setPlanType] = useState<'g' | 'n' | 'f' | 'c'>('g')

  const calculate = () => {
    // Base premiums by plan type (estimated 2024 national average)
    const basePremiums = {
      g: 150, // Plan G - most comprehensive (no Part B deductible)
      n: 100, // Plan N - lower cost, some cost-sharing
      f: 200, // Plan F - not available to new enrollees (pre-2020 only)
      c: 130, // Plan C - similar to F but no excess charges
    }

    // State factors
    const stateFactors = {
      ca: 1.25,
      ny: 1.20,
      tx: 0.90,
      fl: 1.05,
      other: 1.0,
    }

    // Age factors (premiums increase with age)
    const ageFactor = age < 70 ? 1.0 : age < 75 ? 1.15 : age < 80 ? 1.30 : 1.45

    // Tobacco factor
    const tobaccoFactor = tobaccoUse ? 1.20 : 1.0

    // Gender factor (women sometimes pay slightly less)
    const genderFactor = gender === 'female' ? 0.95 : 1.0

    // Calculate premium
    const basePremium = basePremiums[planType]
    const stateFactor = stateFactors[location]
    const monthlyPremium = basePremium * stateFactor * ageFactor * tobaccoFactor * genderFactor
    const annualPremium = monthlyPremium * 12

    // Coverage comparison
    const planGCoverage = [
      'Part A deductible: Yes',
      'Part B deductible: No (you pay)',
      'Part B excess charges: Yes',
      'Skilled nursing coinsurance: Yes',
      'Foreign travel emergency: Yes (80%)',
    ]
    const planNCoverage = [
      'Part A deductible: Yes',
      'Part B deductible: No (you pay)',
      'Part B excess charges: No (you pay)',
      'Skilled nursing coinsurance: Yes',
      'Foreign travel emergency: Yes (80%)',
      'ER copay: Up to $20',
      'Doctor copay: Up to $20',
    ]
    const planFCoverage = [
      'Part A deductible: Yes (closed to new)',
      'Part B deductible: Yes (closed to new)',
      'Part B excess charges: Yes',
      'Skilled nursing coinsurance: Yes',
      'Foreign travel emergency: Yes (80%)',
    ]
    const planCCoverage = [
      'Part A deductible: Yes',
      'Part B deductible: Yes',
      'Part B excess charges: No',
      'Skilled nursing coinsurance: Yes',
      'Foreign travel emergency: Yes (80%)',
    ]

    const coverageDetails = planType === 'g' ? planGCoverage :
                            planType === 'n' ? planNCoverage :
                            planType === 'f' ? planFCoverage : planCCoverage

    // Out-of-pocket costs
    const partBDeductible = 240 // 2024
    const partACoinsuranceDays = 60 // Days you pay before supplement kicks in

    // Total costs
    const partBAnnual = 174.70 * 12 // Standard Part B premium
    const supplementAnnual = annualPremium
    const totalAnnualPremiums = partBAnnual + supplementAnnual

    // Savings vs Plan F (if Plan G)
    const planFMonthly = 200 * stateFactor * ageFactor * tobaccoFactor * genderFactor
    const savingsVsF = planType === 'g' ? (planFMonthly - monthlyPremium) * 12 : 0

    return {
      age: age.toFixed(0),
      location,
      hasPartA,
      hasPartB,
      tobaccoUse,
      gender,
      planType,
      basePremium: basePremium.toFixed(0),
      stateFactor: stateFactor.toFixed(2),
      ageFactor: ageFactor.toFixed(2),
      monthlyPremium: monthlyPremium.toFixed(0),
      annualPremium: annualPremium.toFixed(0),
      partBDeductible: partBDeductible.toFixed(0),
      partACoinsuranceDays: partACoinsuranceDays.toFixed(0),
      partBAnnual: partBAnnual.toFixed(0),
      totalAnnualPremiums: totalAnnualPremiums.toFixed(0),
      savingsVsF: savingsVsF.toFixed(0),
      coverageDetails,
      planFMonthly: planFMonthly.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Supplement Plan Comparison Calculator</h1>
      <p className="text-gray-600 mb-4">Compare Medigap plans G, N, F, and C costs and coverage.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={age} min="65" max="90" onChange={(e) => setAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plan Type</label>
          <select value={planType} onChange={(e) => setPlanType(e.target.value as 'g' | 'n' | 'f' | 'c')} className="w-full border rounded p-2">
            <option value="g">Plan G (Most Popular)</option>
            <option value="n">Plan N (Lower Cost)</option>
            <option value="f">Plan F (Pre-2020 Only)</option>
            <option value="c">Plan C (Pre-2020 Only)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select value={location} onChange={(e) => setLocation(e.target.value as 'ca' | 'ny' | 'tx' | 'fl' | 'other')} className="w-full border rounded p-2">
            <option value="ca">California</option>
            <option value="ny">New York</option>
            <option value="tx">Texas</option>
            <option value="fl">Florida</option>
            <option value="other">Other States</option>
          </select>
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
            <option value="yes">Yes (+20% premium)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Plan {result.planType.toUpperCase()} Premium</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Base Premium:</span><span className="font-medium ml-2">$ {result.basePremium}</span></div>
          <div><span className="text-zinc-600">State Factor:</span><span className="font-medium ml-2">{result.stateFactor}</span></div>
          <div><span className="text-zinc-600">Age Factor:</span><span className="font-medium ml-2">{result.ageFactor}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Monthly:</span><span className="font-bold text-blue-700 ml-2">$ {result.monthlyPremium}</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualPremium}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Plan {result.planType.toUpperCase()} Coverage</h2>
        <div className="grid grid-cols-1 gap-2">
          {result.coverageDetails.map((item, i) => (
            <div key={i} className="text-sm">{item}</div>
          ))}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Premium Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Part B Premium:</span><span className="font-medium ml-2">$ {result.partBAnnual}</span></div>
          <div><span className="text-zinc-600">Supplement:</span><span className="font-bold text-purple-700 ml-2">$ {result.annualPremium}</span></div>
          <div><span className="text-zinc-600">Total Annual:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalAnnualPremiums}</span></div>
        </div>
      </div>

      {result.planType === 'g' && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Plan G vs Plan F Comparison</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Plan F Monthly:</span><span className="font-medium ml-2">$ {result.planFMonthly}</span></div>
            <div><span className="text-zinc-600">Savings with G:</span><span className="font-bold text-teal-700 ml-2">$ {result.savingsVsF}/yr</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Plan G pays everything Plan F does except Part B deductible ($240). New enrollees can't get Plan F.</div>
        </div>
      )}

      {(result.planType === 'f' || result.planType === 'c') && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Plan Availability Warning</h2>
          <div className="text-sm font-medium">Plans F and C are only available if you were eligible for Medicare before January 1, 2020. New enrollees must choose Plan G or N.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Medigap Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Best time to buy: during Medigap Open Enrollment (6 months after Part B)</li>
          <li>No medical underwriting during open enrollment</li>
          <li>Plan G: most comprehensive for new enrollees</li>
          <li>Plan N: lower premium, small copays for ER/doctors</li>
          <li>Plans standardized - same coverage from any insurer</li>
          <li>Premiums vary by age, location, tobacco use</li>
          <li>Community-rated vs age-rated pricing varies by state</li>
        </ul>
      </div>
    </div>
  )
}