'use client'

import { useState } from 'react'

export default function SocialSecuritySpousalTimingCalculator() {
  const [higherEarnerAge, setHigherEarnerAge] = useState(67)
  const [lowerEarnerAge, setLowerEarnerAge] = useState(62)
  const [higherEarnerFRABenefit, setHigherEarnerFRABenefit] = useState(2500)
  const [lowerEarnerOwnBenefit, setLowerEarnerOwnBenefit] = useState(800)
  const [higherClaimAge, setHigherClaimAge] = useState(67)
  const [lowerClaimAge, setLowerClaimAge] = useState(62)

  const calculate = () => {
    const fra = 67

    // Higher earner benefit at claim age
    let higherBenefit = 0
    if (higherClaimAge >= 70) {
      higherBenefit = higherEarnerFRABenefit * 1.24
    } else if (higherClaimAge >= fra) {
      const monthsPastFRA = (higherClaimAge - fra) * 12
      higherBenefit = higherEarnerFRABenefit * (1 + 0.08 / 12 * monthsPastFRA)
    } else {
      const monthsBeforeFRA = (fra - higherClaimAge) * 12
      higherBenefit = higherEarnerFRABenefit * (1 - 0.05 / 12 * monthsBeforeFRA)
    }

    // Lower earner own benefit
    let lowerOwnBenefit = 0
    if (lowerClaimAge >= fra) {
      lowerOwnBenefit = lowerEarnerOwnBenefit
    } else {
      const monthsBeforeFRA = (fra - lowerClaimAge) * 12
      lowerOwnBenefit = lowerEarnerOwnBenefit * (1 - 0.05 / 12 * monthsBeforeFRA)
    }

    // Spousal benefit - can only claim after higher earner claims
    const spousalBenefitMax = higherEarnerFRABenefit * 0.5

    // Spousal benefit reduced if claimed before FRA
    let spousalBenefit = spousalBenefitMax
    if (lowerClaimAge < fra) {
      const monthsBeforeFRA = (fra - lowerClaimAge) * 12
      spousalBenefit = spousalBenefitMax * (1 - 0.25 / 36 * monthsBeforeFRA) // ~6.67% per year
      spousalBenefit = Math.max(0, spousalBenefit)
    }

    // Actual lower earner benefit
    const lowerBenefit = Math.max(lowerOwnBenefit, spousalBenefit)
    const usingSpousal = spousalBenefit > lowerOwnBenefit

    // Timing constraints
    const higherClaimYear = 2026 + (higherClaimAge - higherEarnerAge)
    const lowerCanClaimSpousalYear = higherClaimYear // Must wait for higher earner to claim

    // Strategy comparison
    // Option 1: Higher claims now, lower claims now (if allowed)
    // Option 2: Higher delays to 70, lower claims own now, then spousal later

    const higherBenefitAt70 = higherEarnerFRABenefit * 1.24
    const yearsToDelayHigher = Math.max(0, 70 - higherClaimAge)
    const yearsLowerWaitingForSpousal = yearsToDelayHigher

    // Strategy 1: Both claim now
    const monthly1 = higherBenefit + lowerBenefit
    const annual1 = monthly1 * 12

    // Strategy 2: Higher delays, lower claims own then switches to spousal
    const monthly2BeforeSwitch = lowerOwnBenefit // Lower gets own benefit while waiting
    const monthly2AfterSwitch = higherBenefitAt70 + Math.max(lowerOwnBenefit, spousalBenefitMax)
    const annual2BeforeSwitch = monthly2BeforeSwitch * 12 * yearsToDelayHigher
    const annual2AfterSwitch = monthly2AfterSwitch * 12

    return {
      higherEarnerAge: higherEarnerAge.toFixed(0),
      lowerEarnerAge: lowerEarnerAge.toFixed(0),
      higherEarnerFRABenefit: higherEarnerFRABenefit.toFixed(0),
      lowerEarnerOwnBenefit: lowerEarnerOwnBenefit.toFixed(0),
      higherClaimAge: higherClaimAge.toFixed(0),
      lowerClaimAge: lowerClaimAge.toFixed(0),
      higherBenefit: higherBenefit.toFixed(0),
      lowerOwnBenefit: lowerOwnBenefit.toFixed(0),
      spousalBenefitMax: spousalBenefitMax.toFixed(0),
      spousalBenefit: spousalBenefit.toFixed(0),
      lowerBenefit: lowerBenefit.toFixed(0),
      usingSpousal,
      higherClaimYear: higherClaimYear.toFixed(0),
      lowerCanClaimSpousalYear: lowerCanClaimSpousalYear.toFixed(0),
      higherBenefitAt70: higherBenefitAt70.toFixed(0),
      yearsToDelayHigher: yearsToDelayHigher.toFixed(0),
      monthly1: monthly1.toFixed(0),
      annual1: annual1.toFixed(0),
      monthly2BeforeSwitch: monthly2BeforeSwitch.toFixed(0),
      monthly2AfterSwitch: monthly2AfterSwitch.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Spousal Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Analyze optimal timing for spousal benefit claims.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Higher Earner Current Age</label>
          <input type="number" value={higherEarnerAge} min="60" max="70" onChange={(e) => setHigherEarnerAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Earner Current Age</label>
          <input type="number" value={lowerEarnerAge} min="60" max="70" onChange={(e) => setLowerEarnerAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Higher Earner FRA Benefit ($)</label>
          <input type="number" value={higherEarnerFRABenefit} onChange={(e) => setHigherEarnerFRABenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Earner Own Benefit ($)</label>
          <input type="number" value={lowerEarnerOwnBenefit} onChange={(e) => setLowerEarnerOwnBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Higher Earner Claim Age</label>
          <input type="number" value={higherClaimAge} min="62" max="70" onChange={(e) => setHigherClaimAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Earner Claim Age</label>
          <input type="number" value={lowerClaimAge} min="62" max="70" onChange={(e) => setLowerClaimAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefit Calculation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-2">Higher Earner</div>
            <div><span className="text-zinc-600">FRA Benefit:</span><span className="font-medium ml-2">$ {result.higherEarnerFRABenefit}</span></div>
            <div><span className="text-zinc-600">Claim Age:</span><span className="font-medium ml-2">{result.higherClaimAge}</span></div>
            <div><span className="text-zinc-600">Actual Benefit:</span><span className="font-bold text-blue-700 ml-2">$ {result.higherBenefit}</span></div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Lower Earner</div>
            <div><span className="text-zinc-600">Own Benefit:</span><span className="font-medium ml-2">$ {result.lowerOwnBenefit}</span></div>
            <div><span className="text-zinc-600">Spousal Max:</span><span className="font-medium ml-2">$ {result.spousalBenefitMax}</span></div>
            <div><span className="text-zinc-600">Spousal (at claim age):</span><span className="font-medium ml-2">$ {result.spousalBenefit}</span></div>
            <div><span className="text-zinc-600">Actual Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.lowerBenefit} ({result.usingSpousal ? 'Spousal' : 'Own'})</span></div>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Timing Rules</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Higher Claim Year:</span><span className="font-medium ml-2">{result.higherClaimYear}</span></div>
          <div><span className="text-zinc-600">Lower Spousal Eligible:</span><span className={`font-bold ml-2 ${Number(result.higherClaimYear) <= 2026 ? 'text-green-700' : 'text-orange-700'}`}>{result.lowerCanClaimSpousalYear}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Spousal benefit requires higher earner to have filed. Lower earner cannot claim spousal until higher earner claims.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xs text-zinc-600 mb-1">Both Claim Now</div>
            <div className="font-bold">$ {result.monthly1}/mo</div>
            <div className="text-xs text-purple-700">$ {result.annual1}/yr</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-600 mb-1">Higher Delays to 70</div>
            <div className="text-xs text-zinc-600">Before switch: $ {result.monthly2BeforeSwitch}/mo</div>
            <div className="text-xs text-zinc-600">After switch: $ {result.monthly2AfterSwitch}/mo</div>
          </div>
        </div>
      </div>

      {Number(result.higherClaimAge) < 70 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Delay Strategy Analysis</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Years to Delay Higher:</span><span className="font-bold text-green-700 ml-2">{result.yearsToDelayHigher}</span></div>
            <div><span className="text-zinc-600">Benefit at 70:</span><span className="font-bold text-green-700 ml-2">$ {result.higherBenefitAt70}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Lower earner can claim own benefit while waiting, then switch to higher spousal benefit when higher earner claims.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Spousal Timing Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Spousal benefit cannot start until higher earner files for benefits</li>
          <li>Lower earner can claim own benefit earlier, then switch to spousal</li>
          <li>Spousal benefit is reduced if claimed before FRA (~6.67% per year)</li>
          <li>Maximum spousal benefit is 50% of higher earner's FRA amount</li>
          <li>Lower earner gets higher of own benefit or spousal benefit</li>
          <li>Consider survivor benefit when deciding higher earner's claim age</li>
        </ul>
      </div>
    </div>
  )
}