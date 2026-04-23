'use client'

import { useState } from 'react'

export default function RMDPenaltyWaiverCalculator() {
  const [missedRMDAmount, setMissedRMDAmount] = useState(10000)
  const [missedYear, setMissedYear] = useState(2023)
  const [accountBalance, setAccountBalance] = useState(200000)
  const [reasonableCause, setReasonableCause] = useState<'none' | 'illness' | 'death' | 'error' | 'disability' | 'other'>('none')
  const [correctiveAction, setCorrectiveAction] = useState(false)
  const [priorRMDsCompliant, setPriorRMDsCompliant] = useState(true)

  const calculate = () => {
    const currentYear = 2026

    // Standard penalty: 25% of missed RMD amount
    const standardPenalty = missedRMDAmount * 0.25

    // SECURE 2.0 Act reduced penalty to 25% (was 50% before 2023)
    const isAfterSecureAct = missedYear >= 2023
    const penaltyRate = isAfterSecureAct ? 0.25 : 0.50
    const applicablePenalty = missedRMDAmount * penaltyRate

    // Waiver calculation based on reasonable cause
    let waiverLikelihood = 0
    let waiverReason = ''
    let estimatedWaiverAmount = 0

    if (reasonableCause === 'none') {
      waiverLikelihood = 0
      waiverReason = 'No reasonable cause stated. Waiver unlikely.'
      estimatedWaiverAmount = 0
    } else if (reasonableCause === 'illness') {
      waiverLikelihood = correctiveAction ? 85 : 50
      waiverReason = 'Serious illness may qualify. File Form 5329 with statement.'
      estimatedWaiverAmount = applicablePenalty * (waiverLikelihood / 100)
    } else if (reasonableCause === 'death') {
      waiverLikelihood = correctiveAction ? 90 : 60
      waiverReason = 'Death of account owner or family member may qualify.'
      estimatedWaiverAmount = applicablePenalty * (waiverLikelihood / 100)
    } else if (reasonableCause === 'error') {
      waiverLikelihood = correctiveAction && priorRMDsCompliant ? 70 : 30
      waiverReason = 'Custodian/advisor error may qualify if documented.'
      estimatedWaiverAmount = applicablePenalty * (waiverLikelihood / 100)
    } else if (reasonableCause === 'disability') {
      waiverLikelihood = correctiveAction ? 80 : 45
      waiverReason = 'Documented disability may qualify for waiver.'
      estimatedWaiverAmount = applicablePenalty * (waiverLikelihood / 100)
    } else {
      waiverLikelihood = correctiveAction ? 40 : 15
      waiverReason = 'Other causes require strong documentation.'
      estimatedWaiverAmount = applicablePenalty * (waiverLikelihood / 100)
    }

    // If corrective action taken, likelihood increases
    const correctiveBonus = correctiveAction ? 25 : 0
    const finalWaiverLikelihood = Math.min(95, waiverLikelihood + correctiveBonus)

    // Estimated penalty after waiver
    const estimatedRemainingPenalty = applicablePenalty - estimatedWaiverAmount

    // Self-correct option (withdraw now, file waiver)
    const yearsLate = currentYear - missedYear
    const distributionNow = missedRMDAmount
    const selfCorrectPenalty = applicablePenalty * (1 - finalWaiverLikelihood / 100)

    return {
      missedRMDAmount: missedRMDAmount.toFixed(0),
      missedYear: missedYear.toFixed(0),
      accountBalance: accountBalance.toFixed(0),
      reasonableCause,
      correctiveAction,
      priorRMDsCompliant,
      penaltyRate: (penaltyRate * 100).toFixed(0),
      standardPenalty: standardPenalty.toFixed(0),
      applicablePenalty: applicablePenalty.toFixed(0),
      waiverLikelihood: finalWaiverLikelihood.toFixed(0),
      waiverReason,
      estimatedWaiverAmount: estimatedWaiverAmount.toFixed(0),
      estimatedRemainingPenalty: estimatedRemainingPenalty.toFixed(0),
      yearsLate: yearsLate.toFixed(0),
      distributionNow: distributionNow.toFixed(0),
      selfCorrectPenalty: selfCorrectPenalty.toFixed(0),
      isAfterSecureAct,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">RMD Penalty Waiver Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate IRS penalty waiver likelihood for missed Required Minimum Distributions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Missed RMD Amount ($)</label>
          <input type="number" value={missedRMDAmount} onChange={(e) => setMissedRMDAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year Missed</label>
          <input type="number" value={missedYear} min="2020" max="2025" onChange={(e) => setMissedYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Balance at Time ($)</label>
          <input type="number" value={accountBalance} onChange={(e) => setAccountBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reasonable Cause</label>
          <select value={reasonableCause} onChange={(e) => setReasonableCause(e.target.value as 'none' | 'illness' | 'death' | 'error' | 'disability' | 'other')} className="w-full border rounded p-2">
            <option value="none">None</option>
            <option value="illness">Serious Illness</option>
            <option value="death">Death of Owner/Family</option>
            <option value="error">Custodian/Advisor Error</option>
            <option value="disability">Disability</option>
            <option value="other">Other (documented)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corrective Action Taken?</label>
          <select value={correctiveAction ? 'yes' : 'no'} onChange={(e) => setCorrectiveAction(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - withdrew missed amount</option>
            <option value="no">No - not yet corrected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior RMDs Compliant?</label>
          <select value={priorRMDsCompliant ? 'yes' : 'no'} onChange={(e) => setPriorRMDsCompliant(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - all prior RMDs taken</option>
            <option value="no">No - other missed RMDs</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Penalty Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Missed Amount:</span><span className="font-medium ml-2">$ {result.missedRMDAmount}</span></div>
          <div><span className="text-zinc-600">Penalty Rate:</span><span className="font-bold text-blue-700 ml-2">{result.penaltyRate}%</span></div>
          <div><span className="text-zinc-600">Applicable Penalty:</span><span className={`font-bold ml-2 ${Number(result.applicablePenalty) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.applicablePenalty}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          {result.isAfterSecureAct
            ? 'SECURE 2.0 Act (2023+): penalty reduced from 50% to 25% of missed amount.'
            : 'Pre-SECURE 2.0: penalty was 50% of missed amount.'}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Waiver Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Reasonable Cause:</span><span className="font-medium ml-2">{result.reasonableCause === 'none' ? 'None' : result.reasonableCause}</span></div>
          <div><span className="text-zinc-600">Waiver Likelihood:</span><span className={`font-bold ml-2 ${Number(result.waiverLikelihood) >= 70 ? 'text-green-700' : Number(result.waiverLikelihood) >= 40 ? 'text-orange-700' : 'text-red-700'}`}>{result.waiverLikelihood}%</span></div>
          <div><span className="text-zinc-600">Est. Waiver:</span><span className="font-bold text-green-700 ml-2">$ {result.estimatedWaiverAmount}</span></div>
        </div>
        <div className="text-sm font-medium mt-2 text-orange-700">{result.waiverReason}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Estimated Outcome</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Original Penalty:</span><span className="font-medium ml-2">$ {result.applicablePenalty}</span></div>
          <div><span className="text-zinc-600">Est. Remaining:</span><span className={`font-bold ml-2 ${Number(result.estimatedRemainingPenalty) > 0 ? 'text-purple-700' : 'text-green-700'}`}>$ {result.estimatedRemainingPenalty}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Self-Correction Steps</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Years Late:</span><span className="font-medium ml-2">{result.yearsLate}</span></div>
          <div><span className="text-zinc-600">Withdraw Now:</span><span className="font-bold text-green-700 ml-2">$ {result.distributionNow}</span></div>
          <div><span className="text-zinc-600">Potential Penalty:</span><span className={`font-bold ml-2 ${Number(result.selfCorrectPenalty) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.selfCorrectPenalty}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Take missed distribution immediately. File Form 5329 with waiver request and documentation.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">RMD Penalty Waiver Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>File Form 5329 with each tax return for missed year</li>
          <li>Attach detailed statement explaining reasonable cause</li>
          <li>Document illness, death, or disability with medical/legal records</li>
          <li>Take corrective distribution immediately</li>
          <li>IRS generally grants waivers for documented reasonable cause</li>
          <li>SECURE 2.0 (2023+) reduced penalty from 50% to 25%</li>
        </ul>
      </div>
    </div>
  )
}