'use client'

import { useState } from 'react'

export default function SocialSecurityFamilyMaximumBenefitCalculator() {
  const [workerPIA, setWorkerPIA] = useState(2000)
  const [spouseAge, setSpouseAge] = useState(62)
  const [workerAge, setWorkerAge] = useState(65)
  const [numChildren, setNumChildren] = useState(0)
  const [childAge, setChildAge] = useState(16)
  const [isWorkerDeceased, setIsWorkerDeceased] = useState(false)

  const calculate = () => {
    // Family Maximum Benefit (FMB) rules
    // FMB ranges from 150% to 188% of PIA depending on PIA amount
    // Formula (2024):
    // First $1,174 of PIA: 150%
    // $1,174 to $1,778: 272%
    // $1,778 to $2,372: 134%
    // Above $2,372: 175%

    const bend1 = 1174
    const bend2 = 1778
    const bend3 = 2372

    let fmb = 0
    if (workerPIA <= bend1) {
      fmb = workerPIA * 1.50
    } else if (workerPIA <= bend2) {
      fmb = bend1 * 1.50 + (workerPIA - bend1) * 2.72
    } else if (workerPIA <= bend3) {
      fmb = bend1 * 1.50 + (bend2 - bend1) * 2.72 + (workerPIA - bend2) * 1.34
    } else {
      fmb = bend1 * 1.50 + (bend2 - bend1) * 2.72 + (bend3 - bend2) * 1.34 + (workerPIA - bend3) * 1.75
    }

    // Cap FMB at 188% of PIA
    const maxFMB = workerPIA * 1.88
    const effectiveFMB = Math.min(fmb, maxFMB)

    // Individual benefits
    const workerBenefit = workerPIA // Worker gets full PIA

    // Spouse benefit (50% of PIA if spouse doesn't have own benefit)
    const spouseBenefit = workerPIA * 0.50

    // Child benefit (50% of PIA per child under 18 or disabled)
    const childBenefitPerChild = workerPIA * 0.50
    const totalChildBenefits = numChildren * childBenefitPerChild

    // Survivor benefits (if worker deceased)
    // Widow/widower: 100% of PIA at full retirement age
    // Child: 75% of PIA
    const survivorSpouseBenefit = workerPIA * 1.0
    const survivorChildBenefit = workerPIA * 0.75
    const survivorTotalChildren = numChildren * survivorChildBenefit

    // Total family benefits calculation
    const totalFamilyBenefitLiving = workerBenefit + spouseBenefit + totalChildBenefits
    const totalFamilyBenefitDeceased = survivorSpouseBenefit + survivorTotalChildren

    // Actual benefits (subject to FMB)
    const actualLivingTotal = Math.min(totalFamilyBenefitLiving, effectiveFMB)
    const actualDeceasedTotal = Math.min(totalFamilyBenefitDeceased, effectiveFMB)

    // Reduction if total exceeds FMB
    const reductionLiving = totalFamilyBenefitLiving - actualLivingTotal
    const reductionDeceased = totalFamilyBenefitDeceased - actualDeceasedTotal

    // Per-person reduction calculation (pro-rata)
    const reductionPerBeneficiaryLiving = reductionLiving / (1 + 1 + numChildren)
    const reductionPerBeneficiaryDeceased = reductionDeceased / (1 + numChildren)

    // Family maximum percentage
    const fmbPercent = (effectiveFMB / workerPIA) * 100

    return {
      workerPIA: workerPIA.toFixed(0),
      spouseAge: spouseAge.toFixed(0),
      workerAge: workerAge.toFixed(0),
      numChildren: numChildren.toFixed(0),
      childAge: childAge.toFixed(0),
      isWorkerDeceased,
      bend1: bend1.toFixed(0),
      bend2: bend2.toFixed(0),
      bend3: bend3.toFixed(0),
      fmb: fmb.toFixed(0),
      maxFMB: maxFMB.toFixed(0),
      effectiveFMB: effectiveFMB.toFixed(0),
      fmbPercent: fmbPercent.toFixed(1),
      workerBenefit: workerBenefit.toFixed(0),
      spouseBenefit: spouseBenefit.toFixed(0),
      childBenefitPerChild: childBenefitPerChild.toFixed(0),
      totalChildBenefits: totalChildBenefits.toFixed(0),
      survivorSpouseBenefit: survivorSpouseBenefit.toFixed(0),
      survivorChildBenefit: survivorChildBenefit.toFixed(0),
      survivorTotalChildren: survivorTotalChildren.toFixed(0),
      totalFamilyBenefitLiving: totalFamilyBenefitLiving.toFixed(0),
      totalFamilyBenefitDeceased: totalFamilyBenefitDeceased.toFixed(0),
      actualLivingTotal: actualLivingTotal.toFixed(0),
      actualDeceasedTotal: actualDeceasedTotal.toFixed(0),
      reductionLiving: reductionLiving.toFixed(0),
      reductionDeceased: reductionDeceased.toFixed(0),
      reductionPerBeneficiaryLiving: reductionPerBeneficiaryLiving.toFixed(0),
      reductionPerBeneficiaryDeceased: reductionPerBeneficiaryDeceased.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Family Maximum Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate maximum benefits for worker, spouse, and children.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Worker's PIA (Monthly Benefit)</label>
          <input type="number" value={workerPIA} onChange={(e) => setWorkerPIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Worker Age</label>
          <input type="number" value={workerAge} min="62" max="70" onChange={(e) => setWorkerAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse Age</label>
          <input type="number" value={spouseAge} min="60" max="70" onChange={(e) => setSpouseAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Eligible Children</label>
          <input type="number" value={numChildren} min="0" max="4" onChange={(e) => setNumChildren(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Worker Status</label>
          <select value={isWorkerDeceased ? 'deceased' : 'living'} onChange={(e) => setIsWorkerDeceased(e.target.value === 'deceased')} className="w-full border rounded p-2">
            <option value="living">Living - retirement benefits</option>
            <option value="deceased">Deceased - survivor benefits</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Family Maximum Benefit (FMB)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Worker PIA:</span><span className="font-medium ml-2">$ {result.workerPIA}</span></div>
          <div><span className="text-zinc-600">Calculated FMB:</span><span className="font-medium ml-2">$ {result.fmb}</span></div>
          <div><span className="text-zinc-600">Effective FMB:</span><span className="font-bold text-blue-700 ml-2">$ {result.effectiveFMB}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">FMB %:</span><span className="font-medium ml-2">{result.fmbPercent}% of PIA</span></div>
          <div><span className="text-zinc-600">Max Cap:</span><span className="font-medium ml-2">188% of PIA</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FMB formula: 150% of first $1,174, 272% up to $1,778, 134% up to $2,372, 175% above. Capped at 188%.</div>
      </div>

      <div className={`card mb-6 ${result.isWorkerDeceased ? 'bg-purple-50 border border-purple-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isWorkerDeceased ? 'text-purple-700' : 'text-green-700'}`}>Individual Benefits</h2>
        {!result.isWorkerDeceased ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Worker:</span><span className="font-medium ml-2">$ {result.workerBenefit}</span></div>
            <div><span className="text-zinc-600">Spouse (50%):</span><span className="font-medium ml-2">$ {result.spouseBenefit}</span></div>
            <div><span className="text-zinc-600">Each Child (50%):</span><span className="font-medium ml-2">$ {result.childBenefitPerChild}</span></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Survivor Spouse:</span><span className="font-medium ml-2">$ {result.survivorSpouseBenefit}</span></div>
            <div><span className="text-zinc-600">Each Child (75%):</span><span className="font-medium ml-2">$ {result.survivorChildBenefit}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Living: Spouse/Child get 50% of PIA. Survivor: Spouse 100%, Child 75% of PIA.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Family Benefits vs FMB</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!result.isWorkerDeceased ? (
            <>
              <div><span className="text-zinc-600">Total Claimed:</span><span className="font-medium ml-2">$ {result.totalFamilyBenefitLiving}</span></div>
              <div><span className="text-zinc-600">FMB Limit:</span><span className="font-bold text-orange-700 ml-2">$ {result.effectiveFMB}</span></div>
              <div><span className="text-zinc-600">Actual Paid:</span><span className="font-bold text-orange-700 ml-2">$ {result.actualLivingTotal}</span></div>
            </>
          ) : (
            <>
              <div><span className="text-zinc-600">Total Claimed:</span><span className="font-medium ml-2">$ {result.totalFamilyBenefitDeceased}</span></div>
              <div><span className="text-zinc-600">FMB Limit:</span><span className="font-bold text-orange-700 ml-2">$ {result.effectiveFMB}</span></div>
              <div><span className="text-zinc-600">Actual Paid:</span><span className="font-bold text-orange-700 ml-2">$ {result.actualDeceasedTotal}</span></div>
            </>
          )}
        </div>
        <div className="text-xs text-zinc-600 mt-2">If total benefits exceed FMB, each beneficiary's benefit is reduced proportionally.</div>
      </div>

      <div className={`card mb-6 ${Number(result.reductionLiving) > 0 || Number(result.reductionDeceased) > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.reductionLiving) > 0 || Number(result.reductionDeceased) > 0 ? 'text-red-700' : 'text-green-700'}`}>FMB Reduction</h2>
        <div className="grid grid-cols-2 gap-4">
          {!result.isWorkerDeceased ? (
            <>
              <div><span className="text-zinc-600">Total Reduction:</span><span className={`font-bold ml-2 ${Number(result.reductionLiving) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.reductionLiving}</span></div>
              <div><span className="text-zinc-600">Per Beneficiary:</span><span className="font-medium ml-2">$ {result.reductionPerBeneficiaryLiving}</span></div>
            </>
          ) : (
            <>
              <div><span className="text-zinc-600">Total Reduction:</span><span className={`font-bold ml-2 ${Number(result.reductionDeceased) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.reductionDeceased}</span></div>
              <div><span className="text-zinc-600">Per Beneficiary:</span><span className="font-medium ml-2">$ {result.reductionPerBeneficiaryDeceased}</span></div>
            </>
          )}
        </div>
        <div className="text-xs text-zinc-600 mt-2">Reductions apply proportionally when total exceeds FMB. Worker's benefit is NOT reduced - only auxiliary benefits.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Family Maximum Benefit Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>FMB limits total benefits on one worker's record</li>
          <li>Ranges from 150% to 188% of PIA</li>
          <li>Affects spouse and children benefits, not worker</li>
          <li>Spouse (living): 50% of worker's PIA</li>
          <li>Child (living): 50% of PIA, under 18 or disabled</li>
          <li>Survivor spouse: 100% of PIA at FRA</li>
          <li>Survivor child: 75% of PIA</li>
          <li>Excess benefits reduced proportionally</li>
          <li>Worker's own benefit never reduced by FMB</li>
          <li>Maximum 4-5 family members can receive benefits</li>
        </ul>
      </div>
    </div>
  )
}