'use client'

import { useState } from 'react'

export default function MedicarePartAPremiumFreeEligibilityCalculator() {
  const [age, setAge] = useState(65)
  const [quartersWorked, setQuartersWorked] = useState(40)
  const [currentlyWorking, setCurrentlyWorking] = useState(false)
  const [spouseQuarters, setSpouseQuarters] = useState(40)
  const [hasSpouse, setHasSpouse] = useState(true)
  const [isDependentOnSpouse, setIsDependentOnSpouse] = useState(false)

  const calculate = () => {
    // Medicare Part A premium-free eligibility rules
    // Need 40 quarters (10 years) of covered employment

    const quartersRequired = 40
    const yearsRequired = quartersRequired / 4

    // Self-eligibility
    const selfEligible = quartersWorked >= quartersRequired
    const selfQuartersNeeded = Math.max(0, quartersRequired - quartersWorked)
    const selfYearsNeeded = selfQuartersNeeded / 4

    // Spouse eligibility (if married or widowed)
    const spouseEligible = hasSpouse && spouseQuarters >= quartersRequired
    const canUseSpouseQuarters = isDependentOnSpouse || hasSpouse

    // Combined eligibility
    const premiumFreeEligible = selfEligible || (canUseSpouseQuarters && spouseEligible)

    // If not premium-free, calculate Part A premium
    // 2024 Part A premium structure
    const partAPremiumFull = 505 // Full premium if < 30 quarters
    const partAPremiumReduced = 278 // Reduced premium if 30-39 quarters

    // Determine premium based on quarters
    let partAPremiumMonthly = 0
    if (quartersWorked >= 40) {
      partAPremiumMonthly = 0 // Premium-free
    } else if (quartersWorked >= 30) {
      partAPremiumMonthly = partAPremiumReduced
    } else {
      partAPremiumMonthly = partAPremiumFull
    }

    const annualPremium = partAPremiumMonthly * 12

    // Quarters earned per year (if currently working)
    const quartersPerYear = currentlyWorking ? 4 : 0
    const yearsToPremiumFreeWorking = currentlyWorking ?
      Math.ceil(selfQuartersNeeded / quartersPerYear) : 0

    // Buy-in option
    const canBuyIn = !premiumFreeEligible
    const buyInCostMonthly = partAPremiumMonthly
    const buyInCostAnnual = annualPremium

    // Special cases
    // Age 65+ and eligible for railroad retirement
    // ESRD (End-Stage Renal Disease) - automatic eligibility
    // ALS (Amyotrophic Lateral Sclerosis) - automatic eligibility

    // Dependent spouse eligibility
    const dependentEligibleThroughSpouse = isDependentOnSpouse && spouseEligible

    // Widowed spouse eligibility
    // Can qualify on deceased spouse's record if married 10+ years

    // Estimate future quarters if working
    const futureQuartersIfWorking5Years = currentlyWorking ? quartersWorked + 20 : quartersWorked
    const willBeEligibleIn5Years = futureQuartersIfWorking5Years >= quartersRequired

    return {
      age: age.toFixed(0),
      quartersWorked: quartersWorked.toFixed(0),
      currentlyWorking,
      spouseQuarters: spouseQuarters.toFixed(0),
      hasSpouse,
      isDependentOnSpouse,
      quartersRequired: quartersRequired.toFixed(0),
      yearsRequired: yearsRequired.toFixed(0),
      selfEligible,
      selfQuartersNeeded: selfQuartersNeeded.toFixed(0),
      selfYearsNeeded: selfYearsNeeded.toFixed(1),
      spouseEligible,
      canUseSpouseQuarters,
      premiumFreeEligible,
      partAPremiumFull: partAPremiumFull.toFixed(0),
      partAPremiumReduced: partAPremiumReduced.toFixed(0),
      partAPremiumMonthly: partAPremiumMonthly.toFixed(0),
      annualPremium: annualPremium.toFixed(0),
      quartersPerYear: quartersPerYear.toFixed(0),
      yearsToPremiumFreeWorking: yearsToPremiumFreeWorking.toFixed(0),
      canBuyIn,
      buyInCostMonthly: buyInCostMonthly.toFixed(0),
      buyInCostAnnual: buyInCostAnnual.toFixed(0),
      dependentEligibleThroughSpouse,
      futureQuartersIfWorking5Years: futureQuartersIfWorking5Years.toFixed(0),
      willBeEligibleIn5Years,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part A Premium-Free Eligibility Calculator</h1>
      <p className="text-gray-600 mb-4">Check eligibility based on work history quarters.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={age} min="60" max="75" onChange={(e) => setAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quarters Worked (Covered Employment)</label>
          <input type="number" value={quartersWorked} min="0" max="200" onChange={(e) => setQuartersWorked(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currently Working?</label>
          <select value={currentlyWorking ? 'yes' : 'no'} onChange={(e) => setCurrentlyWorking(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - retired or stopped</option>
            <option value="yes">Yes - earning quarters</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has Spouse?</label>
          <select value={hasSpouse ? 'yes' : 'no'} onChange={(e) => setHasSpouse(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - married or widowed</option>
            <option value="no">No</option>
          </select>
        </div>
        {hasSpouse && (
          <div>
            <label className="block text-sm font-medium mb-1">Spouse's Quarters Worked</label>
            <input type="number" value={spouseQuarters} min="0" max="200" onChange={(e) => setSpouseQuarters(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        {hasSpouse && (
          <div>
            <label className="block text-sm font-medium mb-1">Dependent on Spouse?</label>
            <select value={isDependentOnSpouse ? 'yes' : 'no'} onChange={(e) => setIsDependentOnSpouse(e.target.value === 'yes')} className="w-full border rounded p-2">
              <option value="no">No - have own work record</option>
              <option value="yes">Yes - qualify through spouse</option>
            </select>
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.premiumFreeEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.premiumFreeEligible ? 'text-green-700' : 'text-red-700'}`}>Premium-Free Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Quarters Required:</span><span className="font-medium ml-2">{result.quartersRequired}</span></div>
          <div><span className="text-zinc-600">Your Quarters:</span><span className="font-medium ml-2">{result.quartersWorked}</span></div>
          <div><span className="text-zinc-600">Eligible:</span><span className={`font-bold ml-2 ${result.premiumFreeEligible ? 'text-green-700' : 'text-red-700'}`}>{result.premiumFreeEligible ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Need 40 quarters (10 years) of Social Security-covered employment for premium-free Part A.</div>
      </div>

      <div className={`card mb-6 ${result.selfEligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.selfEligible ? 'text-green-700' : 'text-orange-700'}`}>Self Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Self Eligible:</span><span className={`font-bold ml-2 ${result.selfEligible ? 'text-green-700' : 'text-orange-700'}`}>{result.selfEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Quarters Needed:</span><span className="font-medium ml-2">{result.selfQuartersNeeded}</span></div>
          <div><span className="text-zinc-600">Years Needed:</span><span className="font-medium ml-2">{result.selfYearsNeeded}</span></div>
        </div>
        {result.currentlyWorking && (
          <div className="mt-2">
            <div><span className="text-zinc-600">Years to Eligible (working):</span><span className="font-bold text-teal-700 ml-2">{result.yearsToPremiumFreeWorking}</span></div>
            <div><span className="text-zinc-600">Eligible in 5 Years:</span><span className={`font-bold ml-2 ${result.willBeEligibleIn5Years ? 'text-green-700' : 'text-orange-700'}`}>{result.willBeEligibleIn5Years ? 'Yes' : 'No'}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Based on your own work record. Earn 4 quarters per year if working in covered employment.</div>
      </div>

      {result.hasSpouse && (
        <div className={`card mb-6 ${result.spouseEligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
          <h2 className={`text-lg font-semibold mb-3 ${result.spouseEligible ? 'text-green-700' : 'text-orange-700'}`}>Spouse Eligibility</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Spouse Eligible:</span><span className={`font-bold ml-2 ${result.spouseEligible ? 'text-green-700' : 'text-orange-700'}`}>{result.spouseEligible ? 'Yes' : 'No'}</span></div>
            <div><span className="text-zinc-600">Can Use Spouse Quarters:</span><span className={`font-bold ml-2 ${result.canUseSpouseQuarters ? 'text-green-700' : 'text-orange-700'}`}>{result.canUseSpouseQuarters ? 'Yes' : 'No'}</span></div>
          </div>
          {result.isDependentOnSpouse && (
            <div className="mt-2">
              <div><span className="text-zinc-600">Dependent Eligible:</span><span className={`font-bold ml-2 ${result.dependentEligibleThroughSpouse ? 'text-green-700' : 'text-red-700'}`}>{result.dependentEligibleThroughSpouse ? 'Yes' : 'No'}</span></div>
            </div>
          )}
          <div className="text-xs text-zinc-600 mt-2">Can qualify through spouse if married 10+ years or widowed. Dependent spouse can use spouse's quarters.</div>
        </div>
      )}

      <div className={`card mb-6 ${result.canBuyIn ? 'bg-purple-50 border border-purple-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.canBuyIn ? 'text-purple-700' : 'text-green-700'}`}>Part A Premium / Buy-In</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Monthly Premium:</span><span className={`font-bold ml-2 ${Number(result.partAPremiumMonthly) > 0 ? 'text-purple-700' : 'text-green-700'}`}>$ {result.partAPremiumMonthly}</span></div>
          <div><span className="text-zinc-600">Annual Premium:</span><span className={`font-bold ml-2 ${Number(result.annualPremium) > 0 ? 'text-purple-700' : 'text-green-700'}`}>$ {result.annualPremium}</span></div>
          <div><span className="text-zinc-600">Can Buy-In:</span><span className={`font-bold ml-2 ${result.canBuyIn ? 'text-purple-700' : 'text-green-700'}`}>{result.canBuyIn ? 'Yes' : 'No (premium-free)'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">30-39 quarters: $278/month. &lt;30 quarters: $505/month. Premium-free if ≥40 quarters.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Premium Structure</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">40+ quarters:</span><span className="font-bold text-green-700 ml-2">$0 (Premium-free)</span></div>
          <div><span className="text-zinc-600">30-39 quarters:</span><span className="font-medium ml-2">$ {result.partAPremiumReduced}/mo</span></div>
          <div><span className="text-zinc-600">&lt;30 quarters:</span><span className="font-medium ml-2">$ {result.partAPremiumFull}/mo</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">2024 Part A premiums. Higher premium if fewer quarters. Can enroll even without work history.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part A Eligibility Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Premium-free if 40 quarters (10 years) of covered work</li>
          <li>Can use spouse's quarters if married 10+ years</li>
          <li>Widowed: qualify on deceased spouse's record</li>
          <li>30-39 quarters: $278/month premium (2024)</li>
          <li>Less than 30 quarters: $505/month premium</li>
          <li>ESRD/ALS: automatic eligibility</li>
          <li>Can buy Part A even without work history</li>
          <li>Quarters earned 4 per year if working</li>
          <li>Must also enroll in Part B</li>
          <li>Check SSA statement for exact quarters</li>
        </ul>
      </div>
    </div>
  )
}