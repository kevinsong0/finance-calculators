'use client'

import { useState } from 'react'

export default function SocialSecuritySurvivorBenefitTimingCalculator() {
  const [deceasedPIA, setDeceasedPIA] = useState(2000)
  const [survivorAge, setSurvivorAge] = useState(60)
  const [survivorOwnPIA, setSurvivorOwnPIA] = useState(800)
  const [survivorFRA, setSurvivorFRA] = useState(67)
  const [isDisabled, setIsDisabled] = useState(false)
  const [caringForChild, setCaringForChild] = useState(false)

  const calculate = () => {
    // Social Security survivor benefit timing
    // Survivor can receive up to 100% of deceased's PIA (at full retirement age)
    // Reduced benefits available starting at age 60 (widow/widower)

    // Early claiming reduction for survivor benefits
    // 71.5% at age 60 (reduced by 28.5%)
    // Reduction formula: 19/40 of 1% per month before FRA

    const monthsBeforeFRA = Math.max(0, (survivorFRA - survivorAge) * 12)

    // Survivor benefit reduction
    let survivorBenefitPercentage = 100
    if (survivorAge < survivorFRA && !isDisabled && !caringForChild) {
      // Standard reduction formula for survivor benefits
      // Different from retirement benefits: 19/40 of 1% per month
      const reduction = monthsBeforeFRA * 19 / 40 / 100
      survivorBenefitPercentage = Math.max(71.5, 100 - reduction * 100)
    }

    const survivorBenefit = deceasedPIA * survivorBenefitPercentage / 100

    // Disabled widow/widower: can claim at age 50 (71.5%)
    const disabledBenefitAge50 = isDisabled ? deceasedPIA * 0.715 : 0
    const disabledEligibleAge = 50

    // Caring for child under 16: can claim at any age (75%)
    const motherFatherBenefit = caringForChild ? deceasedPIA * 0.75 : 0

    // Own benefit comparison
    // Switching strategy: claim survivor first, own later
    // Or claim own first, survivor later (if own is higher)

    const ownBenefitAt62 = survivorOwnPIA * 0.70 // Early retirement
    const ownBenefitAtFRA = survivorOwnPIA
    const ownBenefitAt70 = survivorOwnPIA * 1.24 // Delayed retirement credits

    // Best claiming strategy
    // If survivor > own: claim survivor now, delay own
    // If own > survivor: claim own at FRA or 70, claim survivor if needed

    const claimSurvivorFirst = survivorBenefit > ownBenefitAtFRA
    const claimOwnFirst = ownBenefitAtFRA >= survivorBenefit

    // Break-even analysis
    // Compare claiming survivor at 60 vs waiting until FRA

    const survivorAt60 = deceasedPIA * 0.715
    const survivorAtFRA = deceasedPIA
    const differencePerMonth = (survivorAtFRA - survivorAt60) / 12
    const monthsToBreakEven = (survivorAge - 60) * 12 * survivorAt60 / differencePerMonth
    const yearsToBreakEven = monthsToBreakEven / 12

    // Family maximum benefit (survivor benefits)
    // Can affect if multiple family members claim

    // Lump-sum death benefit: $255 one-time payment

    return {
      deceasedPIA: deceasedPIA.toFixed(0),
      survivorAge: survivorAge.toFixed(0),
      survivorOwnPIA: survivorOwnPIA.toFixed(0),
      survivorFRA: survivorFRA.toFixed(0),
      isDisabled,
      caringForChild,
      monthsBeforeFRA: monthsBeforeFRA.toFixed(0),
      survivorBenefitPercentage: survivorBenefitPercentage.toFixed(1),
      survivorBenefit: survivorBenefit.toFixed(0),
      disabledBenefitAge50: disabledBenefitAge50.toFixed(0),
      disabledEligibleAge: disabledEligibleAge.toFixed(0),
      motherFatherBenefit: motherFatherBenefit.toFixed(0),
      ownBenefitAt62: ownBenefitAt62.toFixed(0),
      ownBenefitAtFRA: ownBenefitAtFRA.toFixed(0),
      ownBenefitAt70: ownBenefitAt70.toFixed(0),
      claimSurvivorFirst,
      claimOwnFirst,
      survivorAt60: survivorAt60.toFixed(0),
      survivorAtFRA: survivorAtFRA.toFixed(0),
      yearsToBreakEven: yearsToBreakEven.toFixed(1),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Survivor Benefit Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize timing for claiming survivor benefits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Deceased Worker's PIA</label>
          <input type="number" value={deceasedPIA} onChange={(e) => setDeceasedPIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Survivor's Current Age</label>
          <input type="number" value={survivorAge} min="50" max="70" onChange={(e) => setSurvivorAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Survivor's Own PIA</label>
          <input type="number" value={survivorOwnPIA} onChange={(e) => setSurvivorOwnPIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Survivor's Full Retirement Age</label>
          <input type="number" value={survivorFRA} min="66" max="67" onChange={(e) => setSurvivorFRA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Disabled Widow/Widower?</label>
          <select value={isDisabled ? 'yes' : 'no'} onChange={(e) => setIsDisabled(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - eligible at age 50</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Caring for Child Under 16?</label>
          <select value={caringForChild ? 'yes' : 'no'} onChange={(e) => setCaringForChild(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - mother/father benefit</option>
          </select>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Survivor Benefit at Age {result.survivorAge}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Deceased PIA:</span><span className="font-medium ml-2">$ {result.deceasedPIA}</span></div>
          <div><span className="text-zinc-600">Benefit %:</span><span className="font-bold text-purple-700 ml-2">{result.survivorBenefitPercentage}%</span></div>
          <div><span className="text-zinc-600">Monthly:</span><span className="font-bold text-purple-700 ml-2">$ {result.survivorBenefit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Months Before FRA:</span><span className="font-medium ml-2">{result.monthsBeforeFRA}</span></div>
          <div><span className="text-zinc-600">FRA Benefit:</span><span className="font-bold text-purple-700 ml-2">$ {result.survivorAtFRA}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Survivor benefit reduced if claimed before FRA (age {result.survivorFRA}). Minimum 71.5% at age 60.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Own Benefit Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Own at 62:</span><span className="font-medium ml-2">$ {result.ownBenefitAt62}</span></div>
          <div><span className="text-zinc-600">Own at FRA:</span><span className="font-medium ml-2">$ {result.ownBenefitAtFRA}</span></div>
          <div><span className="text-zinc-600">Own at 70:</span><span className="font-bold text-blue-700 ml-2">$ {result.ownBenefitAt70}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Compare survivor benefit to own benefit at different ages. Choose the higher option.</div>
      </div>

      <div className={`card mb-6 ${result.claimSurvivorFirst ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.claimSurvivorFirst ? 'text-green-700' : 'text-orange-700'}`}>Recommended Strategy</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Strategy:</span><span className={`font-bold ml-2 ${result.claimSurvivorFirst ? 'text-green-700' : 'text-orange-700'}`}>{result.claimSurvivorFirst ? 'Claim Survivor First' : 'Consider Own Benefit'}</span></div>
          <div><span className="text-zinc-600">Reason:</span><span className="font-medium ml-2">{result.claimSurvivorFirst ? 'Survivor benefit higher' : 'Own benefit may be higher'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.claimSurvivorFirst ? 'Claim survivor now, delay own benefit to grow with DRCs.' : 'Own benefit grows to 124% at age 70. Evaluate switching options.'}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Break-Even Analysis</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Survivor at 60:</span><span className="font-medium ml-2">$ {result.survivorAt60}</span></div>
          <div><span className="text-zinc-600">Survivor at FRA:</span><span className="font-medium ml-2">$ {result.survivorAtFRA}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Difference:</span><span className="font-bold text-teal-700 ml-2">$ {Number(result.survivorAtFRA) - Number(result.survivorAt60)}</span></div>
          <div><span className="text-zinc-600">Years to Break-Even:</span><span className="font-medium ml-2">{result.yearsToBreakEven} years</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">If claiming early at 60, higher benefit at FRA compensates after break-even period.</div>
      </div>

      {result.isDisabled && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Disabled Widow/Widower Benefit</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Eligible at:</span><span className="font-bold text-purple-700 ml-2">Age {result.disabledEligibleAge}</span></div>
            <div><span className="text-zinc-600">Benefit:</span><span className="font-bold text-purple-700 ml-2">$ {result.disabledBenefitAge50}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Disabled widow/widower can claim survivor benefits at age 50 (71.5% of deceased's PIA).</div>
        </div>
      )}

      {result.caringForChild && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Mother/Father Benefit</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Eligible:</span><span className="font-bold text-green-700 ml-2">Any Age</span></div>
            <div><span className="text-zinc-600">Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.motherFatherBenefit}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Caring for deceased's child under 16: receive 75% of PIA regardless of age.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Survivor Benefit Timing Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Can claim as early as age 60 (widow/widower)</li>
          <li>Disabled: eligible at age 50 (71.5%)</li>
          <li>Caring for child: any age (75%)</li>
          <li>100% benefit at full retirement age</li>
          <li>Compare to own benefit before claiming</li>
          <li>Switching strategy: survivor then own</li>
          <li>Delay own benefit for DRCs</li>
          <li>Lump-sum death benefit: $255</li>
          <li>Remarriage before 60 may disqualify</li>
          <li>Apply promptly after death</li>
        </ul>
      </div>
    </div>
  )
}