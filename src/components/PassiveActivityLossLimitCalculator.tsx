'use client'

import { useState } from 'react'

export default function PassiveActivityLossLimitCalculator() {
  const [passiveIncome, setPassiveIncome] = useState(50000)
  const [passiveLosses, setPassiveLosses] = useState(100000)
  const [activeIncome, setActiveIncome] = useState(150000)
  const [isREPS, setIsREPS] = useState(false)
  const [hasMaterialParticipation, setHasMaterialParticipation] = useState(false)
  const [activityType, setActivityType] = useState<'rental' | 'business' | 'investment'>('rental')
  const [aggregatedActivities, setAggregatedActivities] = useState(false)
  const [priorYearSuspensions, setPriorYearSuspensions] = useState(20000)
  const [taxYear, setTaxYear] = useState(2024)

  const calculate = () => {
    // Passive Activity Loss Limit Calculator
    // Passive losses generally limited to passive income
    // Special rules for rental real estate

    // Passive activities: rental, businesses where no material participation
    // Active activities: wages, businesses with material participation
    // Portfolio activities: interest, dividends, capital gains

    const pi = passiveIncome
    const pl = passiveLosses
    const ai = activeIncome

    // Basic passive loss limitation
    const passiveLossAllowed = Math.min(pl, pi)
    const passiveLossSuspended = pl - passiveLossAllowed

    // Add prior year suspensions
    const totalSuspended = passiveLossSuspended + priorYearSuspensions

    // REPS exception
    // If qualifies as REPS, rental losses not passive (material participation)
    const repsAllowance = isREPS ? Math.min(pl, ai + pi) : 0

    // Material participation exception
    // Business with material participation not passive
    const materialParticipationAllowance = hasMaterialParticipation && activityType === 'business'
      ? pl // Full deduction allowed
      : 0

    // Rental real estate special allowance ($25,000)
    // Phase-out: AGI $100,000-$150,000
    // Active participation required (not material)
    const rentalSpecialAllowanceMax = 25000
    const phaseOutStart = 100000
    const phaseOutEnd = 150000
    const agi = ai + pi

    let rentalSpecialAllowance = 0
    if (activityType === 'rental' && !isREPS && !hasMaterialParticipation) {
      if (agi <= phaseOutStart) {
        rentalSpecialAllowance = Math.min(rentalSpecialAllowanceMax, pl)
      } else if (agi < phaseOutEnd) {
        const phaseOutRatio = (agi - phaseOutStart) / (phaseOutEnd - phaseOutStart)
        rentalSpecialAllowance = Math.min(rentalSpecialAllowanceMax * (1 - phaseOutRatio), pl)
      }
    }

    // Aggregation election
    // Can aggregate multiple rental activities to meet material participation
    const aggregationNote = aggregatedActivities
      ? 'Aggregation election: combine activities for material participation test'
      : 'No aggregation: each activity tested separately'

    // Total deduction allowed
    let totalPassiveLossDeduction = 0
    if (isREPS) {
      totalPassiveLossDeduction = repsAllowance
    } else if (hasMaterialParticipation && activityType === 'business') {
      totalPassiveLossDeduction = materialParticipationAllowance
    } else {
      totalPassiveLossDeduction = passiveLossAllowed + rentalSpecialAllowance
    }

    // Total suspended losses
    const finalSuspendedLoss = pl - totalPassiveLossDeduction + priorYearSuspensions

    // Tax benefit lost
    const taxBracket = 0.24 // Simplified
    const taxBenefitLost = finalSuspendedLoss * taxBracket

    // Disposition rules
    // When passive activity disposed in full, suspended losses released
    // Must be fully disposed (not partial)
    const dispositionNote = 'Suspended losses released upon full disposition of activity in taxable transaction.'

    // Recommendations
    let recommendation = ''
    if (isREPS) {
      recommendation = 'REPS status allows full passive loss deduction against all income.'
    } else if (hasMaterialParticipation && activityType === 'business') {
      recommendation = 'Material participation makes business active - full loss deduction allowed.'
    } else if (finalSuspendedLoss > 0) {
      recommendation = `${finalSuspendedLoss > 0 ? `$${finalSuspendedLoss.toFixed(0)} suspended losses carry forward. ` : ''}Consider REPS qualification or activity aggregation.`
    } else {
      recommendation = 'No suspended losses - full passive losses deductible against passive income.'
    }

    // Passive vs active classification
    const classificationRules = {
      rental: 'Rental generally passive unless REPS or material participation',
      business: 'Business passive unless material participation (500+ hours)',
      investment: 'Investment activities always passive',
    }

    // Strategies to release suspended losses
    const strategies: string[] = []
    if (!isREPS && activityType === 'rental') {
      strategies.push('Qualify as Real Estate Professional')
      strategies.push('Aggregate rental activities')
    }
    if (!hasMaterialParticipation && activityType === 'business') {
      strategies.push('Increase participation hours to 500+')
      strategies.push('Document time spent on activity')
    }
    strategies.push('Dispose of activity in full transaction')
    strategies.push('Generate more passive income')

    return {
      passiveIncome: passiveIncome.toFixed(0),
      passiveLosses: passiveLosses.toFixed(0),
      activeIncome: activeIncome.toFixed(0),
      activityType,
      isREPS,
      hasMaterialParticipation,
      taxYear: taxYear.toFixed(0),
      passiveLossAllowed: passiveLossAllowed.toFixed(0),
      passiveLossSuspended: passiveLossSuspended.toFixed(0),
      priorYearSuspensions: priorYearSuspensions.toFixed(0),
      totalSuspended: totalSuspended.toFixed(0),
      rentalSpecialAllowance: rentalSpecialAllowance.toFixed(0),
      repsAllowance: repsAllowance.toFixed(0),
      materialParticipationAllowance: materialParticipationAllowance.toFixed(0),
      totalPassiveLossDeduction: totalPassiveLossDeduction.toFixed(0),
      finalSuspendedLoss: finalSuspendedLoss.toFixed(0),
      taxBenefitLost: taxBenefitLost.toFixed(0),
      agi: agi.toFixed(0),
      aggregatedActivities,
      aggregationNote,
      dispositionNote,
      recommendation,
      classificationRules,
      strategies,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Passive Activity Loss Limit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate passive loss limitations and suspended losses.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Passive Income</label>
          <input type="number" value={passiveIncome} onChange={(e) => setPassiveIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passive Losses</label>
          <input type="number" value={passiveLosses} onChange={(e) => setPassiveLosses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Active/W-2 Income</label>
          <input type="number" value={activeIncome} onChange={(e) => setActiveIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Activity Type</label>
          <select value={activityType} onChange={(e) => setActivityType(e.target.value as 'rental' | 'business' | 'investment')} className="w-full border rounded p-2">
            <option value="rental">Rental Real Estate</option>
            <option value="business">Passive Business</option>
            <option value="investment">Investment Activity</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Real Estate Professional Status?</label>
          <select value={isREPS ? 'yes' : 'no'} onChange={(e) => setIsREPS(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - not REPS qualified</option>
            <option value="yes">Yes - REPS qualified</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Material Participation?</label>
          <select value={hasMaterialParticipation ? 'yes' : 'no'} onChange={(e) => setHasMaterialParticipation(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - passive activity</option>
            <option value="yes">Yes - materially participate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Suspensions</label>
          <input type="number" value={priorYearSuspensions} onChange={(e) => setPriorYearSuspensions(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Aggregation Election?</label>
          <select value={aggregatedActivities ? 'yes' : 'no'} onChange={(e) => setAggregatedActivities(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - separate activities</option>
            <option value="yes">Yes - aggregated rental activities</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Basic Passive Loss Limit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Passive Income:</span><span className="font-medium ml-2">$ {result.passiveIncome}</span></div>
          <div><span className="text-zinc-600">Passive Losses:</span><span className="font-bold text-red-700 ml-2">$ {result.passiveLosses}</span></div>
          <div><span className="text-zinc-600">Allowed:</span><span className="font-bold text-green-700 ml-2">$ {result.passiveLossAllowed}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Suspended:</span><span className="font-bold text-orange-700 ml-2">$ {result.passiveLossSuspended}</span></div>
          <div><span className="text-zinc-600">Prior Suspensions:</span><span className="font-medium ml-2">$ {result.priorYearSuspensions}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Passive losses limited to passive income without special status.</div>
      </div>

      {result.activityType === 'rental' && !result.isREPS && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Rental Special Allowance ($25K)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">AGI:</span><span className="font-medium ml-2">$ {result.agi}</span></div>
            <div><span className="text-zinc-600">Special Allowance:</span><span className="font-bold text-purple-700 ml-2">$ {result.rentalSpecialAllowance}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Phase-out: $100K-$150K AGI. Active participation required.</div>
        </div>
      )}

      {result.isREPS && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">REPS Exception</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">REPS Allowance:</span><span className="font-bold text-green-700 ml-2">$ {result.repsAllowance}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">REPS: rental losses not passive - can offset any income.</div>
        </div>
      )}

      {result.hasMaterialParticipation && result.activityType === 'business' && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Material Participation Exception</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Full Allowance:</span><span className="font-bold text-teal-700 ml-2">$ {result.materialParticipationAllowance}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Material participation makes business active - full deduction allowed.</div>
        </div>
      )}

      <div className={`card mb-6 ${Number(result.finalSuspendedLoss) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Total Passive Loss Deduction</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Deduction Allowed:</span><span className="font-bold text-green-700 ml-2">$ {result.totalPassiveLossDeduction}</span></div>
          <div><span className="text-zinc-600">Suspended Loss:</span><span className={`font-bold ml-2 ${Number(result.finalSuspendedLoss) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.finalSuspendedLoss}</span></div>
          <div><span className="text-zinc-600">Tax Benefit Lost:</span><span className="font-bold text-red-700 ml-2">$ {result.taxBenefitLost}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      {result.aggregatedActivities && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Aggregation Election</h2>
          <div className="text-xs text-zinc-600">{result.aggregationNote}</div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Activity Classification</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Rental:</span> {result.classificationRules.rental}</div>
          <div><span className="font-semibold">Business:</span> {result.classificationRules.business}</div>
          <div><span className="font-semibold">Investment:</span> {result.classificationRules.investment}</div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategies to Release Suspended Losses</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.strategies.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">{result.dispositionNote}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Passive Activity Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Passive losses limited to passive income</li>
          <li>Suspended losses carry forward</li>
          <li>Released on full disposition</li>
          <li>REPS breaks passive classification</li>
          <li>Material participation for business</li>
          <li>$25K rental allowance (phase-out)</li>
          <li>Aggregation election for rentals</li>
          <li>Track suspended losses carefully</li>
          <li>Form 8582 for passive activities</li>
          <li>IRS audits passive activity claims</li>
        </ul>
      </div>
    </div>
  )
}