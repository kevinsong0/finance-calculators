'use client'

import { useState } from 'react'

export default function SocialSecurityDivorceSpouseBenefitCalculator() {
  const [exSpousePIA, setExSpousePIA] = useState(2000)
  const [yourPIA, setYourPIA] = useState(800)
  const [yourAge, setYourAge] = useState(62)
  const [marriageLength, setMarriageLength] = useState(15)
  const [divorceYearsAgo, setDivorceYearsAgo] = useState(5)
  const [exSpouseRemarried, setExSpouseRemarried] = useState(false)
  const [youRemarried, setYouRemarried] = useState(false)
  const [exSpouseClaimingStatus, setExSpouseClaimingStatus] = useState<'claiming' | 'not_claiming' | 'unknown'>('unknown')

  const calculate = () => {
    // Social Security divorced spouse benefits
    // Requirements:
    // - Marriage lasted at least 10 years
    // - Currently unmarried (or remarried after age 60)
    // - Age 62 or older
    // - Ex-spouse entitled to benefits (doesn't need to be claiming if divorced 2+ years)

    const eligibleMarriageLength = marriageLength >= 10
    const eligibleAge = yourAge >= 62
    const eligibleRemarriage = !youRemarried // Simplified: remarried generally disqualifies

    // Special rule: if divorced 2+ years, ex-spouse doesn't need to be claiming
    const independentEntitlement = divorceYearsAgo >= 2

    // Divorced spouse benefit = 50% of ex-spouse's PIA (at full retirement age)
    const divorcedSpouseBenefitMax = exSpousePIA * 0.50

    // Early claiming reduction (if claiming before FRA)
    let earlyReduction = 0
    if (yourAge < 67) {
      const monthsEarly = (67 - yourAge) * 12
      // Spousal/divorced spouse: 25/36 of 1% per month early (max 35% at 62)
      earlyReduction = divorcedSpouseBenefitMax * Math.min(0.35, monthsEarly * 25 / 36 / 100)
    }

    const divorcedSpouseBenefitActual = divorcedSpouseBenefitMax - earlyReduction

    // Windfall Elimination Provision check
    // If you have your own benefit, SSA pays your benefit first
    // Then adds divorced spouse benefit if it's higher

    const ownBenefit = yourPIA
    const totalBenefitIfDivorcedSpouseHigher = Math.max(ownBenefit, divorcedSpouseBenefitActual)

    // If divorced spouse benefit is higher than own benefit
    const benefitIncrease = divorcedSpouseBenefitActual > ownBenefit ?
      divorcedSpouseBenefitActual - ownBenefit : 0

    // Total benefit received
    const totalBenefit = ownBenefit + benefitIncrease

    // Comparison: own vs divorced spouse
    const betterOption = ownBenefit >= divorcedSpouseBenefitActual ? 'Own benefit' : 'Divorced spouse'

    // Ex-spouse remarriage doesn't affect your divorced spouse benefit
    // But your remarriage generally disqualifies you

    // Exceptions to remarriage disqualification:
    // - Remarried after age 60 (survivor benefits allowed)
    // - Remarriage ended (death, divorce)

    // Eligibility summary
    const eligible = eligibleMarriageLength && eligibleAge && (eligibleRemarriage || independentEntitlement)

    // If ex-spouse is claiming, benefit amount is fixed
    // If ex-spouse not yet claiming (divorced 2+ years), benefit based on ex-spouse's PIA

    return {
      exSpousePIA: exSpousePIA.toFixed(0),
      yourPIA: yourPIA.toFixed(0),
      yourAge: yourAge.toFixed(0),
      marriageLength: marriageLength.toFixed(0),
      divorceYearsAgo: divorceYearsAgo.toFixed(0),
      exSpouseRemarried,
      youRemarried,
      exSpouseClaimingStatus,
      eligibleMarriageLength,
      eligibleAge,
      eligibleRemarriage,
      independentEntitlement,
      eligible,
      divorcedSpouseBenefitMax: divorcedSpouseBenefitMax.toFixed(0),
      earlyReduction: earlyReduction.toFixed(0),
      divorcedSpouseBenefitActual: divorcedSpouseBenefitActual.toFixed(0),
      ownBenefit: ownBenefit.toFixed(0),
      benefitIncrease: benefitIncrease.toFixed(0),
      totalBenefit: totalBenefit.toFixed(0),
      betterOption,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Divorce Spouse Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate divorced spouse benefits if marriage lasted 10+ years.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Ex-Spouse's PIA (Monthly)</label>
          <input type="number" value={exSpousePIA} onChange={(e) => setExSpousePIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Own PIA (Monthly)</label>
          <input type="number" value={yourPIA} onChange={(e) => setYourPIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Current Age</label>
          <input type="number" value={yourAge} min="60" max="70" onChange={(e) => setYourAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marriage Length (Years)</label>
          <input type="number" value={marriageLength} min="0" max="50" onChange={(e) => setMarriageLength(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Since Divorce</label>
          <input type="number" value={divorceYearsAgo} min="0" max="40" onChange={(e) => setDivorceYearsAgo(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Remarried?</label>
          <select value={youRemarried ? 'yes' : 'no'} onChange={(e) => setYouRemarried(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - currently unmarried</option>
            <option value="yes">Yes - remarried</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ex-Spouse Remarried?</label>
          <select value={exSpouseRemarried ? 'yes' : 'no'} onChange={(e) => setExSpouseRemarried(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.eligible ? 'text-green-700' : 'text-red-700'}`}>Eligibility Requirements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Marriage ≥10yr:</span><span className={`font-bold ml-2 ${result.eligibleMarriageLength ? 'text-green-700' : 'text-red-700'}`}>{result.eligibleMarriageLength ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Age ≥62:</span><span className={`font-bold ml-2 ${result.eligibleAge ? 'text-green-700' : 'text-red-700'}`}>{result.eligibleAge ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Unmarried:</span><span className={`font-bold ml-2 ${result.eligibleRemarriage ? 'text-green-700' : 'text-red-700'}`}>{result.eligibleRemarriage ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Must be unmarried (remarriage after age 60 may qualify for survivor benefits). Ex-spouse remarriage does NOT affect your benefit.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Divorced Spouse Benefit Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Ex-Spouse PIA:</span><span className="font-medium ml-2">$ {result.exSpousePIA}</span></div>
          <div><span className="text-zinc-600">Max Benefit:</span><span className="font-bold text-blue-700 ml-2">$ {result.divorcedSpouseBenefitMax}</span></div>
          <div><span className="text-zinc-600">Formula:</span><span className="font-medium ml-2">50% of PIA</span></div>
        </div>
        {Number(result.earlyReduction) > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Early Reduction:</span><span className="font-bold text-red-700 ml-2">$ {result.earlyReduction}</span></div>
            <div><span className="text-zinc-600">At Age {result.yourAge}:</span><span className="font-bold text-blue-700 ml-2">$ {result.divorcedSpouseBenefitActual}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Divorced spouse receives up to 50% of ex-spouse's PIA at full retirement age.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Your Benefit vs Divorced Spouse Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Your Own:</span><span className="font-medium ml-2">$ {result.ownBenefit}</span></div>
          <div><span className="text-zinc-600">Divorced:</span><span className="font-medium ml-2">$ {result.divorcedSpouseBenefitActual}</span></div>
          <div><span className="text-zinc-600">Better Option:</span><span className={`font-bold ml-2 ${result.betterOption === 'Own benefit' ? 'text-purple-700' : 'text-blue-700'}`}>{result.betterOption}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Benefit Increase:</span><span className={`font-bold ml-2 ${Number(result.benefitIncrease) > 0 ? 'text-green-700' : 'text-zinc-600'}`}>$ {result.benefitIncrease}</span></div>
          <div><span className="text-zinc-600">Total Benefit:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalBenefit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SSA pays your own benefit first. If divorced spouse benefit is higher, you get the difference added.</div>
      </div>

      <div className={`card mb-6 ${result.independentEntitlement ? 'bg-teal-50 border border-teal-200' : 'bg-gray-50 border border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.independentEntitlement ? 'text-teal-700' : 'text-gray-700'}`}>Independent Entitlement Rule</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Divorced ≥2yr:</span><span className={`font-bold ml-2 ${result.independentEntitlement ? 'text-teal-700' : 'text-gray-600'}`}>{result.independentEntitlement ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Ex-Spouse Claiming:</span><span className={`font-medium ml-2 ${result.independentEntitlement ? 'text-teal-700' : 'text-gray-600'}`}>{result.independentEntitlement ? 'Not Required' : 'Required'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">If divorced 2+ years, you can claim divorced spouse benefits even if ex-spouse hasn't filed.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Remarriage Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Your Remarriage:</span><span className={`font-bold ml-2 ${result.youRemarried ? 'text-red-700' : 'text-green-700'}`}>{result.youRemarried ? 'Disqualifies' : 'OK'}</span></div>
          <div><span className="text-zinc-600">Ex-Spouse Remarriage:</span><span className="font-bold text-green-700 ml-2">No Effect</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Ex-spouse's remarriage does NOT affect your divorced spouse benefit. Your remarriage generally disqualifies (exception: remarriage after 60).</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Divorced Spouse Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Marriage must have lasted at least 10 years</li>
          <li>Benefit = 50% of ex-spouse's PIA (at FRA)</li>
          <li>Early claim reduces benefit up to 35%</li>
          <li>Your remarriage generally disqualifies</li>
          <li>Ex-spouse remarriage has no effect</li>
          <li>Divorced 2+ years: ex-spouse need not file</li>
          <li>Cannot claim if ex-spouse's benefit is lower</li>
          <li>Can delay own benefit, claim divorced first</li>
          <li>Survivor benefits if ex-spouse dies (100%)</li>
          <li>Apply at SSA with divorce decree</li>
        </ul>
      </div>
    </div>
  )
}