'use client'

import { useState } from 'react'

export default function SpousalBenefitMaximizerCalculator() {
  const [higherEarnerFRABenefit, setHigherEarnerFRABenefit] = useState(2500)
  const [lowerEarnerFRABenefit, setLowerEarnerFRABenefit] = useState(800)
  const [higherEarnerClaimAge, setHigherEarnerClaimAge] = useState(67)
  const [lowerEarnerClaimAge, setLowerEarnerClaimAge] = useState(62)
  const [higherEarnerBirthYear, setHigherEarnerBirthYear] = useState(1958)
  const [lowerEarnerBirthYear, setLowerEarnerBirthYear] = useState(1962)
  const [lifeExpectancyHigher, setLifeExpectancyHigher] = useState(85)
  const [lifeExpectancyLower, setLifeExpectancyLower] = useState(88)

  const calculate = () => {
    const fra = 67 // Full retirement age

    // Higher earner actual benefit based on claim age
    let higherBenefit = 0
    if (higherEarnerClaimAge >= 70) {
      higherBenefit = higherEarnerFRABenefit * 1.24 // 24% increase at 70
    } else if (higherEarnerClaimAge >= fra) {
      const monthsPastFRA = (higherEarnerClaimAge - fra) * 12
      higherBenefit = higherEarnerFRABenefit * (1 + 0.08 / 12 * monthsPastFRA) // 8% per year
    } else {
      const monthsBeforeFRA = (fra - higherEarnerClaimAge) * 12
      higherBenefit = higherEarnerFRABenefit * (1 - 0.05 / 12 * monthsBeforeFRA) // ~5% reduction
    }

    // Lower earner own benefit or spousal benefit
    let lowerOwnBenefit = 0
    if (lowerEarnerClaimAge >= fra) {
      lowerOwnBenefit = lowerEarnerFRABenefit
    } else {
      const monthsBeforeFRA = (fra - lowerEarnerClaimAge) * 12
      lowerOwnBenefit = lowerEarnerFRABenefit * (1 - 0.05 / 12 * monthsBeforeFRA)
    }

    // Spousal benefit: up to 50% of higher earner's FRA benefit
    const spousalBenefitMax = higherEarnerFRABenefit * 0.5
    const lowerActualBenefit = Math.max(lowerOwnBenefit, spousalBenefitMax)

    // Years receiving benefits
    const higherYearsReceiving = Math.max(0, lifeExpectancyHigher - higherEarnerClaimAge)
    const lowerYearsReceiving = Math.max(0, lifeExpectancyLower - lowerEarnerClaimAge)

    // Total lifetime benefits
    const higherLifetime = higherBenefit * 12 * higherYearsReceiving
    const lowerLifetime = lowerActualBenefit * 12 * lowerYearsReceiving
    const totalLifetime = higherLifetime + lowerLifetime

    // Survivor benefit (when higher earner dies)
    const survivorBenefit = higherBenefit // Survivor gets deceased's full benefit
    const survivorYears = Math.max(0, lifeExpectancyLower - lifeExpectancyHigher)
    const survivorLifetime = survivorBenefit * 12 * survivorYears

    // Combined household total
    const householdTotal = higherLifetime + lowerLifetime + survivorLifetime

    // Alternative: Higher earner waits to 70
    const higherBenefitAt70 = higherEarnerFRABenefit * 1.24
    const higherYearsReceivingAt70 = Math.max(0, lifeExpectancyHigher - 70)
    const higherLifetimeAt70 = higherBenefitAt70 * 12 * higherYearsReceivingAt70
    const survivorLifetimeAt70 = higherBenefitAt70 * 12 * survivorYears
    const householdTotalAt70 = higherLifetimeAt70 + lowerLifetime + survivorLifetimeAt70

    // Recommendation
    const waitingAdvantage = householdTotalAt70 - householdTotal
    let recommendation = ''
    if (waitingAdvantage > 0) {
      recommendation = 'Higher earner should delay to 70: increases household benefits by $' + waitingAdvantage.toFixed(0) + '. Survivor benefit grows significantly.'
    } else {
      recommendation = 'Current strategy is optimal given life expectancy projections.'
    }

    return {
      higherEarnerFRABenefit: higherEarnerFRABenefit.toFixed(0),
      lowerEarnerFRABenefit: lowerEarnerFRABenefit.toFixed(0),
      higherEarnerClaimAge: higherEarnerClaimAge.toFixed(0),
      lowerEarnerClaimAge: lowerEarnerClaimAge.toFixed(0),
      higherBenefit: higherBenefit.toFixed(0),
      lowerOwnBenefit: lowerOwnBenefit.toFixed(0),
      spousalBenefitMax: spousalBenefitMax.toFixed(0),
      lowerActualBenefit: lowerActualBenefit.toFixed(0),
      lowerBenefitSource: lowerOwnBenefit >= spousalBenefitMax ? 'Own benefit' : 'Spousal benefit',
      higherYearsReceiving: higherYearsReceiving.toFixed(0),
      lowerYearsReceiving: lowerYearsReceiving.toFixed(0),
      higherLifetime: higherLifetime.toFixed(0),
      lowerLifetime: lowerLifetime.toFixed(0),
      survivorBenefit: survivorBenefit.toFixed(0),
      survivorYears: survivorYears.toFixed(0),
      survivorLifetime: survivorLifetime.toFixed(0),
      householdTotal: householdTotal.toFixed(0),
      higherBenefitAt70: higherBenefitAt70.toFixed(0),
      householdTotalAt70: householdTotalAt70.toFixed(0),
      waitingAdvantage: waitingAdvantage.toFixed(0),
      recommendation,
      lifeExpectancyHigher: lifeExpectancyHigher.toFixed(0),
      lifeExpectancyLower: lifeExpectancyLower.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Spousal Benefit Maximizer Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize Social Security claiming strategy for married couples.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Higher Earner FRA Benefit ($)</label>
          <input type="number" value={higherEarnerFRABenefit} onChange={(e) => setHigherEarnerFRABenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Earner FRA Benefit ($)</label>
          <input type="number" value={lowerEarnerFRABenefit} onChange={(e) => setLowerEarnerFRABenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Higher Earner Claim Age</label>
          <input type="number" value={higherEarnerClaimAge} min="62" max="70" onChange={(e) => setHigherEarnerClaimAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Earner Claim Age</label>
          <input type="number" value={lowerEarnerClaimAge} min="62" max="70" onChange={(e) => setLowerEarnerClaimAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Higher Earner Life Expectancy</label>
          <input type="number" value={lifeExpectancyHigher} min="62" max="100" onChange={(e) => setLifeExpectancyHigher(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Earner Life Expectancy</label>
          <input type="number" value={lifeExpectancyLower} min="62" max="100" onChange={(e) => setLifeExpectancyLower(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Individual Benefits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Higher Earner</div>
            <div><span className="text-zinc-600">FRA Benefit:</span><span className="font-medium ml-2">$ {result.higherEarnerFRABenefit}</span></div>
            <div><span className="text-zinc-600">Claim Age:</span><span className="font-medium ml-2">{result.higherEarnerClaimAge}</span></div>
            <div><span className="text-zinc-600">Actual Benefit:</span><span className="font-bold text-blue-700 ml-2">$ {result.higherBenefit}</span></div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Lower Earner</div>
            <div><span className="text-zinc-600">FRA Benefit:</span><span className="font-medium ml-2">$ {result.lowerEarnerFRABenefit}</span></div>
            <div><span className="text-zinc-600">Own Benefit:</span><span className="font-medium ml-2">$ {result.lowerOwnBenefit}</span></div>
            <div><span className="text-zinc-600">Spousal Max:</span><span className="font-medium ml-2">$ {result.spousalBenefitMax}</span></div>
            <div><span className="text-zinc-600">Actual Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.lowerActualBenefit} ({result.lowerBenefitSource})</span></div>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Lifetime Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Higher Earner:</span><span className="font-bold ml-2">$ {result.higherLifetime}</span></div>
          <div><span className="text-zinc-600">Lower Earner:</span><span className="font-bold ml-2">$ {result.lowerLifetime}</span></div>
          <div><span className="text-zinc-600">Couple Total:</span><span className="font-bold text-purple-700 ml-2">$ {result.householdTotal}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Based on receiving benefits until projected life expectancy.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Survivor Benefit Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Survivor Benefit:</span><span className="font-bold text-orange-700 ml-2">$ {result.survivorBenefit}/mo</span></div>
          <div><span className="text-zinc-600">Survivor Years:</span><span className="font-medium ml-2">{result.survivorYears}</span></div>
          <div><span className="text-zinc-600">Survivor Total:</span><span className="font-bold text-orange-700 ml-2">$ {result.survivorLifetime}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">When higher earner dies, survivor receives their full benefit amount.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Alternative: Higher Earner Delays to 70</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Benefit at 70:</span><span className="font-bold text-green-700 ml-2">$ {result.higherBenefitAt70}/mo</span></div>
          <div><span className="text-zinc-600">Household Total:</span><span className="font-bold text-green-700 ml-2">$ {result.householdTotalAt70}</span></div>
          <div><span className="text-zinc-600">Advantage:</span><span className={`font-bold ml-2 ${Number(result.waitingAdvantage) > 0 ? 'text-green-700' : 'text-zinc-600'}`}>$ {result.waitingAdvantage}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-teal-700">Recommendation</h2>
        <div className="text-sm font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Spousal Benefit Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Higher earner should delay to maximize survivor benefit</li>
          <li>Spousal benefit: up to 50% of higher earner's FRA benefit</li>
          <li>Lower earner can claim own OR spousal (not both)</li>
          <li>Spousal benefit requires higher earner to claim first</li>
          <li>Survivor benefit often larger than spousal benefit</li>
          <li>Consider both spouses' health and longevity</li>
        </ul>
      </div>
    </div>
  )
}