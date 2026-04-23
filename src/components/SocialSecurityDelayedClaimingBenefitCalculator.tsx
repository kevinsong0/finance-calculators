'use client'

import { useState } from 'react'

export default function SocialSecurityDelayedClaimingBenefitCalculator() {
  const [currentAge, setCurrentAge] = useState(62)
  const [fullRetirementAge, setFullRetirementAge] = useState(67)
  const [pia, setPIA] = useState(1500)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [delayedYears, setDelayedYears] = useState(3)

  const calculate = () => {
    // DRC (Delayed Retirement Credits) = 8% per year after FRA
    const drcRate = 0.08 // 8% per year

    // Calculate delayed benefit
    const yearsDelayed = Math.max(0, delayedYears)
    const drcIncrease = pia * drcRate * yearsDelayed
    const delayedBenefit = pia + drcIncrease

    // Maximum delay is age 70 (3 years after FRA 67)
    const maxDelayYears = Math.min(3, yearsDelayed)
    const maxDelayedBenefit = pia * (1 + drcRate * maxDelayYears)

    // Early claiming reduction (if claiming before FRA)
    const earlyClaimingAge = Math.min(fullRetirementAge, currentAge)
    const yearsEarly = Math.max(0, fullRetirementAge - earlyClaimingAge)
    const earlyReductionRate = yearsEarly <= 3 ? 0.0667 : 0.05 // 6.67% for first 3 years, 5% after
    const earlyReduction = pia * earlyReductionRate * yearsEarly
    const earlyBenefit = pia - earlyReduction

    // Lifetime benefits calculation
    const yearsAtFRA = Math.max(0, lifeExpectancy - fullRetirementAge)
    const yearsAtDelayed = Math.max(0, lifeExpectancy - fullRetirementAge - yearsDelayed)
    const yearsAtEarly = Math.max(0, lifeExpectancy - currentAge)

    // Total lifetime benefits for each scenario
    const lifetimeAtFRA = pia * 12 * yearsAtFRA
    const lifetimeAtDelayed = delayedBenefit * 12 * yearsAtDelayed
    const lifetimeAtEarly = earlyBenefit * 12 * yearsAtEarly

    // Break-even analysis
    // How many years to recoup the foregone benefits from delaying
    const foregoneBenefits = pia * 12 * yearsDelayed
    const extraMonthlyBenefit = delayedBenefit - pia
    const breakEvenMonths = Math.ceil(foregoneBenefits / extraMonthlyBenefit)
    const breakEvenYears = breakEvenMonths / 12

    // Break-even age
    const breakEvenAge = fullRetirementAge + yearsDelayed + breakEvenYears

    // Best claiming age based on life expectancy
    const bestClaimingAge = lifeExpectancy < breakEvenAge ? 'At FRA' : 'Delay to 70'

    // Inflation adjustment (simplified)
    const colaRate = 2.5 // Estimated COLA
    const adjustedDelayedBenefit = delayedBenefit * Math.pow(1 + colaRate / 100, yearsDelayed)

    return {
      currentAge: currentAge.toFixed(0),
      fullRetirementAge: fullRetirementAge.toFixed(0),
      pia: pia.toFixed(0),
      lifeExpectancy: lifeExpectancy.toFixed(0),
      delayedYears: delayedYears.toFixed(0),
      drcRate: (drcRate * 100).toFixed(0),
      drcIncrease: drcIncrease.toFixed(0),
      delayedBenefit: delayedBenefit.toFixed(0),
      maxDelayYears: maxDelayYears.toFixed(0),
      maxDelayedBenefit: maxDelayedBenefit.toFixed(0),
      earlyBenefit: earlyBenefit.toFixed(0),
      earlyReduction: earlyReduction.toFixed(0),
      lifetimeAtFRA: lifetimeAtFRA.toFixed(0),
      lifetimeAtDelayed: lifetimeAtDelayed.toFixed(0),
      lifetimeAtEarly: lifetimeAtEarly.toFixed(0),
      foregoneBenefits: foregoneBenefits.toFixed(0),
      extraMonthlyBenefit: extraMonthlyBenefit.toFixed(0),
      breakEvenMonths: breakEvenMonths.toFixed(0),
      breakEvenYears: breakEvenYears.toFixed(2),
      breakEvenAge: breakEvenAge.toFixed(0),
      bestClaimingAge,
      colaRate: colaRate.toFixed(1),
      adjustedDelayedBenefit: adjustedDelayedBenefit.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Delayed Claiming Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate the benefit of delaying Social Security past FRA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="62" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Retirement Age</label>
          <select value={fullRetirementAge} onChange={(e) => setFullRetirementAge(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="66">Age 66</option>
            <option value="66.5">Age 66 + 6 months</option>
            <option value="67">Age 67</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PIA (Monthly Benefit at FRA)</label>
          <input type="number" value={pia} onChange={(e) => setPIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Life Expectancy</label>
          <input type="number" value={lifeExpectancy} min="75" max="100" onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years to Delay After FRA</label>
          <input type="number" value={delayedYears} min="0" max="3" onChange={(e) => setDelayedYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Delayed Retirement Credits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">DRC Rate:</span><span className="font-medium ml-2">{result.drcRate}%/year</span></div>
          <div><span className="text-zinc-600">Years Delayed:</span><span className="font-medium ml-2">{result.delayedYears}</span></div>
          <div><span className="text-zinc-600">DRC Increase:</span><span className="font-bold text-blue-700 ml-2">$ {result.drcIncrease}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Delayed Benefit:</span><span className="font-bold text-blue-700 ml-2">$ {result.delayedBenefit}/mo</span></div>
          <div><span className="text-zinc-600">Max at Age 70:</span><span className="font-bold text-blue-700 ml-2">$ {result.maxDelayedBenefit}/mo</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each year of delay after FRA adds 8% to your benefit. Maximum delay is age 70.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefit Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">PIA (at FRA):</span><span className="font-medium ml-2">$ {result.pia}</span></div>
          <div><span className="text-zinc-600">Early (age {result.currentAge}):</span><span className="font-medium ml-2">$ {result.earlyBenefit}</span></div>
          <div><span className="text-zinc-600">Delayed:</span><span className="font-bold text-green-700 ml-2">$ {result.delayedBenefit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Extra Monthly:</span><span className="font-bold text-green-700 ml-2">$ {result.extraMonthlyBenefit}</span></div>
          <div><span className="text-zinc-600">COLA Adjusted:</span><span className="font-medium ml-2">$ {result.adjustedDelayedBenefit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">COLA adjustments increase delayed benefits further (estimated {result.colaRate}% annual COLA).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Break-Even Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Foregone Benefits:</span><span className="font-medium ml-2">$ {result.foregoneBenefits}</span></div>
          <div><span className="text-zinc-600">Break-Even:</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenYears} years</span></div>
          <div><span className="text-zinc-600">Break-Even Age:</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenAge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">You need to live past age {result.breakEvenAge} for delay to pay off versus claiming at FRA.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Lifetime Benefits (to age {result.lifeExpectancy})</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">At FRA:</span><span className="font-medium ml-2">$ {result.lifetimeAtFRA}</span></div>
          <div><span className="text-zinc-600">Delayed:</span><span className="font-bold text-purple-700 ml-2">$ {result.lifetimeAtDelayed}</span></div>
          <div><span className="text-zinc-600">Early:</span><span className="font-medium ml-2">$ {result.lifetimeAtEarly}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Lifetime total benefits based on life expectancy of {result.lifeExpectancy} years.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommended Strategy</h2>
        <div className="text-lg font-bold text-teal-700">{result.bestClaimingAge}</div>
        <div className="text-xs text-zinc-600 mt-2">Based on your life expectancy of {result.lifeExpectancy} and break-even age of {result.breakEvenAge}.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Delayed Claiming Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Each year delayed after FRA adds 8% to benefit</li>
          <li>Maximum delay benefit at age 70 (24% increase)</li>
          <li>COLA adjustments compound on higher base</li>
          <li>Higher benefit for survivor if you die</li>
          <li>Break-even typically age 78-82</li>
          <li>Good strategy if healthy and expect long life</li>
          <li>Consider other income sources during delay</li>
          <li>Delay reduces taxation at lower income level</li>
        </ul>
      </div>
    </div>
  )
}