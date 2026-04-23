'use client'

import { useState } from 'react'

export default function SocialSecuritySurvivorBenefitCalculator() {
  const [currentAge, setCurrentAge] = useState(60)
  const [spouseAge, setSpouseAge] = useState(62)
  const [spouseFullRetirementAge, setSpouseFullRetirementAge] = useState(67)
  const [spousePIA, setSpousePIA] = useState(2000)
  const [isDeceased, setIsDeceased] = useState(true)
  const [ownPIA, setOwnPIA] = useState(1200)
  const [hasOwnBenefit, setHasOwnBenefit] = useState(true)

  const calculate = () => {
    // Survivor benefit rules
    const fullSurvivorBenefitAge = 65 // For most people, can get full survivor at 65
    const earliestSurvivorAge = 60 // Can start survivor benefits at 60

    // Reduced survivor benefit if taken early
    const reductionFactor = (fullSurvivorBenefitAge - currentAge) * 0.002815 // ~0.2815% per month before 65

    // Calculate survivor benefit
    const survivorBenefitFull = spousePIA * 1.0 // 100% of deceased spouse's PIA
    const survivorBenefitReduced = survivorBenefitFull * (1 - Math.max(0, reductionFactor))

    // Compare with own benefit
    const ownBenefitAmount = hasOwnBenefit ? ownPIA : 0
    const bestBenefit = Math.max(survivorBenefitReduced, ownBenefitAmount)

    // If both benefits available, can switch strategies
    const canSwitchStrategies = hasOwnBenefit && isDeceased

    // Lump-sum death benefit (one-time $255)
    const lumpSumDeathBenefit = 255

    // Family maximum (150-180% of deceased's PIA, varies)
    const familyMaximumPercentage = 1.75 // Simplified
    const familyMaximum = spousePIA * familyMaximumPercentage

    // If remarriage before age 60, survivor benefits end
    const remarriageRuleAge = 60

    // Widow(er) benefit at FRA
    const widowBenefitAtFRA = spousePIA

    // Delayed retirement credits on deceased spouse's record
    const drcApplies = spouseAge > spouseFullRetirementAge
    const drcIncrease = drcApplies ? (spouseAge - spouseFullRetirementAge) * 0.08 * spousePIA : 0
    const piaWithDRC = spousePIA + drcIncrease

    // Eligibility check
    const isEligibleForSurvivor = currentAge >= earliestSurvivorAge && isDeceased

    // Benefit at different ages
    const benefitAt60 = spousePIA * 0.715 // ~71.5% at age 60
    const benefitAt62 = spousePIA * 0.79 // ~79% at age 62 (for survivor)
    const benefitAt65 = spousePIA * 1.0 // 100% at age 65 (or FRA for survivor)

    return {
      currentAge: currentAge.toFixed(0),
      spouseAge: spouseAge.toFixed(0),
      spouseFullRetirementAge: spouseFullRetirementAge.toFixed(0),
      spousePIA: spousePIA.toFixed(0),
      isDeceased,
      ownPIA: ownPIA.toFixed(0),
      hasOwnBenefit,
      fullSurvivorBenefitAge: fullSurvivorBenefitAge.toFixed(0),
      earliestSurvivorAge: earliestSurvivorAge.toFixed(0),
      survivorBenefitFull: survivorBenefitFull.toFixed(0),
      survivorBenefitReduced: survivorBenefitReduced.toFixed(0),
      ownBenefitAmount: ownBenefitAmount.toFixed(0),
      bestBenefit: bestBenefit.toFixed(0),
      canSwitchStrategies,
      lumpSumDeathBenefit: lumpSumDeathBenefit.toFixed(0),
      familyMaximum: familyMaximum.toFixed(0),
      remarriageRuleAge: remarriageRuleAge.toFixed(0),
      widowBenefitAtFRA: widowBenefitAtFRA.toFixed(0),
      drcApplies,
      drcIncrease: drcIncrease.toFixed(0),
      piaWithDRC: piaWithDRC.toFixed(0),
      isEligibleForSurvivor,
      benefitAt60: benefitAt60.toFixed(0),
      benefitAt62: benefitAt62.toFixed(0),
      benefitAt65: benefitAt65.toFixed(0),
      reductionFactorPercent: (reductionFactor * 100).toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Survivor Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate widow/widower benefits based on deceased spouse's record.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Your Current Age</label>
          <input type="number" value={currentAge} min="60" max="80" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse's Age (at death/claim)</label>
          <input type="number" value={spouseAge} min="62" max="70" onChange={(e) => setSpouseAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse's PIA (Monthly Benefit)</label>
          <input type="number" value={spousePIA} onChange={(e) => setSpousePIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse's FRA</label>
          <select value={spouseFullRetirementAge} onChange={(e) => setSpouseFullRetirementAge(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="66">Age 66</option>
            <option value="66.5">Age 66 + 6 months</option>
            <option value="67">Age 67</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Have Own Benefit?</label>
          <select value={hasOwnBenefit ? 'yes' : 'no'} onChange={(e) => setHasOwnBenefit(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - have own work record</option>
            <option value="no">No - no own benefits</option>
          </select>
        </div>
        {hasOwnBenefit && (
          <div>
            <label className="block text-sm font-medium mb-1">Your Own PIA</label>
            <input type="number" value={ownPIA} onChange={(e) => setOwnPIA(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.isEligibleForSurvivor ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isEligibleForSurvivor ? 'text-green-700' : 'text-red-700'}`}>Eligibility Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Eligible:</span><span className={`font-bold ml-2 ${result.isEligibleForSurvivor ? 'text-green-700' : 'text-red-700'}`}>{result.isEligibleForSurvivor ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Earliest Age:</span><span className="font-medium ml-2">{result.earliestSurvivorAge}</span></div>
          <div><span className="text-zinc-600">Full Benefit Age:</span><span className="font-medium ml-2">{result.fullSurvivorBenefitAge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Widow/widower can claim survivor benefits as early as age 60, or age 50 if disabled.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Survivor Benefit Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Spouse's PIA:</span><span className="font-medium ml-2">$ {result.spousePIA}</span></div>
          <div><span className="text-zinc-600">Full Survivor:</span><span className="font-medium ml-2">$ {result.survivorBenefitFull}</span></div>
          <div><span className="text-zinc-600">At Your Age:</span><span className="font-bold text-blue-700 ml-2">$ {result.survivorBenefitReduced}</span></div>
        </div>
        {result.drcApplies && (
          <div className="mt-2">
            <div><span className="text-zinc-600">DRC Increase:</span><span className="font-medium ml-2">$ {result.drcIncrease}</span></div>
            <div><span className="text-zinc-600">PIA with DRC:</span><span className="font-bold text-blue-700 ml-2">$ {result.piaWithDRC}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Survivor benefit = 100% of deceased spouse's PIA at full survivor age, reduced if claimed early.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefit Reduction by Age</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">At Age 60:</span><span className="font-bold text-orange-700 ml-2">$ {result.benefitAt60} (~71.5%)</span></div>
          <div><span className="text-zinc-600">At Age 62:</span><span className="font-medium ml-2">$ {result.benefitAt62} (~79%)</span></div>
          <div><span className="text-zinc-600">At Age 65:</span><span className="font-medium ml-2">$ {result.benefitAt65} (100%)</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Reduction: ~0.2815% per month before full survivor age (65 for most, varies).</div>
      </div>

      {result.hasOwnBenefit && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Benefit Comparison</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Your Own PIA:</span><span className="font-medium ml-2">$ {result.ownBenefitAmount}</span></div>
            <div><span className="text-zinc-600">Survivor Benefit:</span><span className="font-medium ml-2">$ {result.survivorBenefitReduced}</span></div>
            <div><span className="text-zinc-600">Best Option:</span><span className="font-bold text-purple-700 ml-2">$ {result.bestBenefit}</span></div>
          </div>
          <div className="mt-2 text-sm font-medium">Strategy: {result.canSwitchStrategies ? 'Can switch between own and survivor benefits' : 'Survivor only'}</div>
          <div className="text-xs text-zinc-600 mt-2">Take survivor early, let own grow; or take own early, switch to survivor later.</div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Additional Benefits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Lump-Sum Death Benefit:</span><span className="font-medium ml-2">$ {result.lumpSumDeathBenefit}</span></div>
          <div><span className="text-zinc-600">Family Maximum:</span><span className="font-bold text-teal-700 ml-2">$ {result.familyMaximum}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">One-time death benefit paid to surviving spouse. Family maximum caps total benefits on one record.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Survivor Benefit Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Eligible as early as age 60 (50 if disabled)</li>
          <li>Full benefit at age 65 (varies by birth year)</li>
          <li>Receive 100% of deceased spouse's PIA at full age</li>
          <li>Delayed retirement credits increase survivor benefit</li>
          <li>Can switch between own and survivor benefits</li>
          <li>Remarriage before 60 ends survivor benefits</li>
          <li>Lump-sum death benefit: $255 one-time payment</li>
          <li>Coordinate with own benefit for maximum payout</li>
          <li>Family maximum: 150-180% of deceased's PIA</li>
        </ul>
      </div>
    </div>
  )
}