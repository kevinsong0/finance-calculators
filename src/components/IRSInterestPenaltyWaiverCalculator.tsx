'use client'

import { useState } from 'react'

export default function IRSInterestPenaltyWaiverCalculator() {
  const [penaltyType, setPenaltyType] = useState<'failure_to_file' | 'failure_to_pay' | 'underpayment' | 'accuracy'>('failure_to_pay')
  const [penaltyAmount, setPenaltyAmount] = useState(2500)
  const [causeReason, setCauseReason] = useState('medical')
  const [firstTimeFiler, setFirstTimeFiler] = useState(false)
  const [reasonableCause, setReasonableCause] = useState(true)
  const [correctiveAction, setCorrectiveAction] = useState(true)
  const [yearsClean, setYearsClean] = useState(3)
  const [currentlyCompliant, setCurrentlyCompliant] = useState(true)

  const calculate = () => {
    // IRS Penalty and Interest Abatement
    // First-time penalty abatement (FTA): automatic if clean history
    // Reasonable cause: documented circumstances beyond control
    // Statutory exception: specific IRS guidance

    // Penalty types and rates
    // Failure to file: 5% per month, max 25%
    // Failure to pay: 0.5% per month, max 25%
    // Underpayment of estimated tax: interest-based
    // Accuracy-related penalty: 20% of underpayment

    // First-time abatement eligibility
    // 3-year clean compliance history
    // Currently filed all returns
    // Currently paid or arranged payment

    const ftaEligible = yearsClean >= 3 && currentlyCompliant && firstTimeFiler

    // Reasonable cause categories
    const reasonableCauseCategories: Record<string, {
      category: string;
      documentation: string[];
      strength: string;
    }> = {
      medical: { category: 'Medical/Health', documentation: ['Doctor statement', 'Hospital records', 'Disability proof'], strength: 'Strong' },
      death: { category: 'Death in Family', documentation: ['Death certificate', 'Estate documents'], strength: 'Strong' },
      disaster: { category: 'Natural Disaster', documentation: ['FEMA declaration', 'Insurance claim'], strength: 'Strong' },
      fire: { category: 'Fire/Casualty', documentation: ['Fire report', 'Insurance claim'], strength: 'Moderate' },
      theft: { category: 'Records Theft', documentation: ['Police report', 'Reconstruction proof'], strength: 'Moderate' },
      inability: { category: 'Unable to Obtain Records', documentation: ['IRS response delay', 'Third party failure'], strength: 'Moderate' },
      advice: { category: 'Erroneous IRS Advice', documentation: ['IRS correspondence', 'Written advice'], strength: 'Strong' },
      other: { category: 'Other Circumstances', documentation: ['Supporting documents'], strength: 'Variable' },
    }

    const causeInfo = reasonableCauseCategories[causeReason] || reasonableCauseCategories['other']

    // Reasonable cause strength assessment
    let causeStrengthScore = 0
    if (causeInfo.strength === 'Strong') causeStrengthScore = 85
    else if (causeInfo.strength === 'Moderate') causeStrengthScore = 60
    else causeStrengthScore = 40

    if (!reasonableCause) causeStrengthScore = 0
    if (!correctiveAction) causeStrengthScore = causeStrengthScore * 0.5

    // Abatement recommendation
    let abatementRecommendation = ''
    let abatementLikelihood = ''

    if (ftaEligible) {
      abatementRecommendation = 'Request First-Time Abatement - easiest path, automatic if eligible'
      abatementLikelihood = 'High (FTA automatic)'
    } else if (causeStrengthScore >= 80) {
      abatementRecommendation = 'Strong reasonable cause case - file Form 843 with full documentation'
      abatementLikelihood = 'High'
    } else if (causeStrengthScore >= 50) {
      abatementRecommendation = 'Moderate reasonable cause - document thoroughly, may need appeal'
      abatementLikelihood = 'Moderate'
    } else if (causeStrengthScore >= 30) {
      abatementRecommendation = 'Weak reasonable cause - consider FTA first if any history clean'
      abatementLikelihood = 'Low'
    } else {
      abatementRecommendation = 'No clear abatement path - negotiate payment plan instead'
      abatementLikelihood = 'Very Low'
    }

    // Interest abatement
    // Interest abatement only if:
    // 1. IRS error or delay
    // 2. Erroneous IRS written advice
    // Much harder than penalty abatement

    const interestAbatementEligible = causeReason === 'advice' || causeReason === 'disaster'
    let interestAbatementNote = ''
    if (interestAbatementEligible) {
      interestAbatementNote = 'May qualify for interest abatement - IRS error/exception case'
    } else {
      interestAbatementNote = 'Interest rarely abated except for IRS errors'
    }

    // Penalty details
    const penaltyRates: Record<string, { rate: string; max: string }> = {
      failure_to_file: { rate: '5% per month', max: '25% total' },
      failure_to_pay: { rate: '0.5% per month', max: '25% total' },
      underpayment: { rate: 'Interest-based', max: 'Varies' },
      accuracy: { rate: '20% of understatement', max: '20% one-time' },
    }

    const penaltyDetails = penaltyRates[penaltyType]

    // Potential savings
    const abatementSavings = penaltyAmount
    const potentialSavings = ftaEligible ? abatementSavings : abatementSavings * (causeStrengthScore / 100)

    // Appeal process
    // 1. Request abatement in writing
    // 2. If denied, appeal within 30 days
    // 3. If denied again, Tax Court or other court

    return {
      penaltyType,
      penaltyAmount: penaltyAmount.toFixed(0),
      causeReason,
      firstTimeFiler,
      reasonableCause,
      correctiveAction,
      yearsClean: yearsClean.toFixed(0),
      currentlyCompliant,
      ftaEligible,
      causeCategory: causeInfo.category,
      documentationNeeded: causeInfo.documentation,
      causeStrength: causeInfo.strength,
      causeStrengthScore: causeStrengthScore.toFixed(0),
      abatementRecommendation,
      abatementLikelihood,
      penaltyRate: penaltyDetails.rate,
      penaltyMax: penaltyDetails.max,
      abatementSavings: abatementSavings.toFixed(0),
      potentialSavings: potentialSavings.toFixed(0),
      interestAbatementEligible,
      interestAbatementNote,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Interest/Penalty Waiver Calculator</h1>
      <p className="text-gray-600 mb-4">Assess eligibility for penalty abatement and interest waiver.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Type</label>
          <select value={penaltyType} onChange={(e) => setPenaltyType(e.target.value as 'failure_to_file' | 'failure_to_pay' | 'underpayment' | 'accuracy')} className="w-full border rounded p-2">
            <option value="failure_to_file">Failure to File (5%/mo)</option>
            <option value="failure_to_pay">Failure to Pay (0.5%/mo)</option>
            <option value="underpayment">Underpayment of Estimated Tax</option>
            <option value="accuracy">Accuracy-Related Penalty (20%)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Amount</label>
          <input type="number" value={penaltyAmount} onChange={(e) => setPenaltyAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cause Reason</label>
          <select value={causeReason} onChange={(e) => setCauseReason(e.target.value)} className="w-full border rounded p-2">
            <option value="medical">Medical/Health Issue</option>
            <option value="death">Death in Family</option>
            <option value="disaster">Natural Disaster</option>
            <option value="fire">Fire/Casualty</option>
            <option value="theft">Records Theft</option>
            <option value="inability">Unable to Obtain Records</option>
            <option value="advice">Erroneous IRS Advice</option>
            <option value="other">Other Circumstances</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">First-Time Penalty Abatement?</label>
          <select value={firstTimeFiler ? 'yes' : 'no'} onChange={(e) => setFirstTimeFiler(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - had penalties before</option>
            <option value="yes">Yes - no penalties in past 3 years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Clean History</label>
          <input type="number" value={yearsClean} min="0" max="10" onChange={(e) => setYearsClean(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currently Compliant?</label>
          <select value={currentlyCompliant ? 'yes' : 'no'} onChange={(e) => setCurrentlyCompliant(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - all returns filed, paid or arranged</option>
            <option value="no">No - outstanding issues</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reasonable Cause Documented?</label>
          <select value={reasonableCause ? 'yes' : 'no'} onChange={(e) => setReasonableCause(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - have supporting docs</option>
            <option value="no">No - no documentation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corrective Action Taken?</label>
          <select value={correctiveAction ? 'yes' : 'no'} onChange={(e) => setCorrectiveAction(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - fixed the issue</option>
            <option value="no">No - still pending</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.ftaEligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.ftaEligible ? 'text-green-700' : 'text-orange-700'}`}>First-Time Abatement Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">FTA Eligible:</span><span className={`font-bold ml-2 ${result.ftaEligible ? 'text-green-700' : 'text-red-700'}`}>{result.ftaEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Clean Years:</span><span className="font-medium ml-2">{result.yearsClean}</span></div>
          <div><span className="text-zinc-600">Compliant:</span><span className={`font-bold ml-2 ${result.currentlyCompliant ? 'text-green-700' : 'text-red-700'}`}>{result.currentlyCompliant ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FTA requires: 3-year clean history + currently filed/paid + no prior FTA used.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Reasonable Cause Assessment</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Category:</span><span className="font-medium ml-2">{result.causeCategory}</span></div>
          <div><span className="text-zinc-600">Strength:</span><span className={`font-bold ml-2 ${result.causeStrength === 'Strong' ? 'text-green-700' : result.causeStrength === 'Moderate' ? 'text-blue-700' : 'text-orange-700'}`}>{result.causeStrength}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Score:</span><span className="font-bold ml-2">{result.causeStrengthScore}%</span></div>
          <div><span className="text-zinc-600">Likelihood:</span><span className={`font-bold ml-2 ${result.abatementLikelihood.includes('High') ? 'text-green-700' : result.abatementLikelihood.includes('Moderate') ? 'text-blue-700' : 'text-orange-700'}`}>{result.abatementLikelihood}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Reasonable cause: circumstances beyond your control despite due diligence.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Needed</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.documentationNeeded.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Attach all supporting documents to abatement request (Form 843 or letter).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Penalty Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Type:</span><span className="font-medium ml-2">{result.penaltyType}</span></div>
          <div><span className="text-zinc-600">Amount:</span><span className="font-bold text-orange-700 ml-2">$ {result.penaltyAmount}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Rate:</span><span className="font-medium ml-2">{result.penaltyRate}</span></div>
          <div><span className="text-zinc-600">Max:</span><span className="font-medium ml-2">{result.penaltyMax}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Abatement Recommendation</h2>
        <div className="text-sm text-zinc-600 font-medium mb-2">{result.abatementRecommendation}</div>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Penalty:</span><span className="font-medium ml-2">$ {result.abatementSavings}</span></div>
          <div><span className="text-zinc-600">Potential Saved:</span><span className="font-bold text-teal-700 ml-2">$ {result.potentialSavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FTA: one-time waiver. Reasonable cause: must prove circumstances.</div>
      </div>

      <div className={`card mb-6 ${result.interestAbatementEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.interestAbatementEligible ? 'text-green-700' : 'text-red-700'}`}>Interest Abatement</h2>
        <div className="text-sm text-zinc-600">{result.interestAbatementNote}</div>
        <div className="text-xs text-zinc-600 mt-2">Interest only abated for IRS errors or statutory exceptions. Very limited.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Penalty Abatement Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>FTA: 3-year clean history</li>
          <li>FTA: one-time only</li>
          <li>Reasonable cause: documented</li>
          <li>Medical: strong cause</li>
          <li>Disaster: automatic area</li>
          <li>IRS error: abate both</li>
          <li>Interest: rarely abated</li>
          <li>File Form 843 or write</li>
          <li>Appeal within 30 days</li>
          <li>Keep all documentation</li>
        </ul>
      </div>
    </div>
  )
}