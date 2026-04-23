'use client'

import { useState } from 'react'

export default function TaxDisputeResolutionCalculator() {
  const [disputeType, setDisputeType] = useState<'examination' | 'collection' | 'penalty' | 'credit_denial' | 'deduction_denial' | 'income_dispute'>('examination')
  const [disputedAmount, setDisputedAmount] = useState(10000)
  const [irsPosition, setIrsPosition] = useState<'full_denial' | 'partial_denial' | 'adjustment'>('full_denial')
  const [taxYear, setTaxYear] = useState(2022)
  const [stage, setStage] = useState<'initial' | 'examination' | 'appeal' | 'tax_court' | 'collection'>('initial')
  const [haveDocumentation, setHaveDocumentation] = useState(true)
  const [firstTimePenalty, setFirstTimePenalty] = useState(false)
  const [reasonableCause, setReasonableCause] = useState(false)

  const calculate = () => {
    // Tax Dispute Resolution Calculator
    // Calculate options, timeline, and costs for tax disputes

    // Resolution options by stage
    const resolutionOptions: { stage: string; options: string[]; timeline: string; cost: string }[] = []

    // Stage 1: Initial/Correspondence
    if (stage === 'initial' || stage === 'examination') {
      resolutionOptions.push({
        stage: 'Correspondence/Examination',
        options: ['Respond with documentation', 'Request meeting with examiner', 'Agree to adjustment', 'Request manager conference'],
        timeline: '30-90 days from notice',
        cost: 'Minimal - documentation preparation',
      })
    }

    // Stage 2: IRS Appeals
    if (stage === 'appeal' || stage === 'examination') {
      resolutionOptions.push({
        stage: 'IRS Appeals Office',
        options: ['Request 30-day letter appeal', 'Request 90-day letter appeal', 'Submit protest letter', 'Request Appeals Conference'],
        timeline: '30-90 days from appeal request',
        cost: 'Moderate - may need professional assistance',
      })
    }

    // Stage 3: Tax Court
    if (stage === 'tax_court') {
      resolutionOptions.push({
        stage: 'Tax Court',
        options: ['File Tax Court petition', 'Request small tax case (under $50K)', 'Settle before trial', 'Proceed to trial'],
        timeline: '90 days from statutory notice of deficiency',
        cost: 'High - attorney fees, court costs',
      })
    }

    // Stage 4: Collection
    if (stage === 'collection') {
      resolutionOptions.push({
        stage: 'Collection Due Process',
        options: ['Request CDP hearing', 'Request equivalent hearing', 'Offer in compromise', 'Installment agreement'],
        timeline: '30 days from levy notice',
        cost: 'Moderate to high depending on resolution',
      })
    }

    // Calculate potential outcomes
    let potentialOutcome = ''
    let outcomeColor = ''

    if (irsPosition === 'full_denial' && !haveDocumentation) {
      potentialOutcome = 'Difficult to succeed. IRS position likely upheld. Gather documentation urgently.'
      outcomeColor = 'red'
    } else if (irsPosition === 'full_denial' && haveDocumentation) {
      potentialOutcome = 'Good chance of partial success. Document clearly. Appeal recommended if exam denies.'
      outcomeColor = 'yellow'
    } else if (irsPosition === 'partial_denial') {
      potentialOutcome = 'Likely partial resolution. Focus on disputed portion. Appeal if necessary.'
      outcomeColor = 'green'
    } else {
      potentialOutcome = 'Resolution likely achievable. Negotiate with examiner first.'
      outcomeColor = 'blue'
    }

    // Penalty dispute specific
    if (disputeType === 'penalty') {
      if (firstTimePenalty) {
        potentialOutcome = 'First-time penalty abatement likely available. Request FTA if 3-year clean history.'
        outcomeColor = 'green'
      } else if (reasonableCause) {
        potentialOutcome = 'Reasonable cause argument may succeed. Document circumstances thoroughly.'
        outcomeColor = 'yellow'
      } else {
        potentialOutcome = 'Penalty may be upheld. Consider FTA eligibility or reasonable cause argument.'
        outcomeColor = 'orange'
      }
    }

    // Estimated costs
    const professionalFees = disputedAmount > 50000 ? 5000 : disputedAmount > 10000 ? 2000 : 500
    const courtCosts = stage === 'tax_court' ? 60 : 0 // Tax Court filing fee
    const interestContinuing = disputedAmount * 0.08 * (90 / 365) // Approximate interest during dispute

    // Timeline estimate
    const estimatedMonths = stage === 'initial' ? 3 : stage === 'examination' ? 6 : stage === 'appeal' ? 12 : stage === 'tax_court' ? 18 : 6

    // Dispute resolution steps
    const resolutionSteps = [
      { step: 1, action: 'Review IRS notice carefully', timeline: 'Day 1-3' },
      { step: 2, action: 'Gather all supporting documentation', timeline: 'Day 4-14' },
      { step: 3, action: 'Prepare written response', timeline: 'Day 15-25' },
      { step: 4, action: 'Submit response before deadline', timeline: 'Day 30' },
      { step: 5, action: 'Await IRS response', timeline: '30-90 days' },
      { step: 6, action: 'Request manager conference if needed', timeline: 'After exam response' },
      { step: 7, action: 'File appeal if unresolved', timeline: '30 days from 30-day letter' },
      { step: 8, action: 'Prepare protest letter', timeline: 'Within appeal period' },
      { step: 9, action: 'Attend Appeals conference', timeline: 'Scheduled date' },
      { step: 10, action: 'Consider Tax Court if Appeals denies', timeline: '90 days from SNOD' },
    ]

    // Success factors
    const successFactors = [
      'Complete documentation of position',
      'Clear explanation of tax treatment',
      'Relevant case law or precedent',
      'Professional representation for complex cases',
      'Timely response to all deadlines',
      'Reasonable cause for penalties',
      'First-time penalty abatement eligibility',
      'Consistent treatment across years',
      'Supporting third-party documentation',
      'Clear factual narrative',
    ]

    return {
      disputeType,
      disputedAmount: disputedAmount.toFixed(0),
      irsPosition,
      taxYear,
      stage,
      haveDocumentation,
      firstTimePenalty,
      reasonableCause,
      resolutionOptions,
      potentialOutcome,
      outcomeColor,
      professionalFees: professionalFees.toFixed(0),
      courtCosts: courtCosts.toFixed(0),
      interestContinuing: interestContinuing.toFixed(2),
      estimatedMonths: estimatedMonths.toFixed(0),
      resolutionSteps,
      successFactors,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Dispute Resolution Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate options, timeline, and costs for resolving tax disputes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Dispute Type</label>
          <select value={disputeType} onChange={(e) => setDisputeType(e.target.value as 'examination' | 'collection' | 'penalty' | 'credit_denial' | 'deduction_denial' | 'income_dispute')} className="w-full border rounded p-2">
            <option value="examination">Examination/Audit</option>
            <option value="collection">Collection Issue</option>
            <option value="penalty">Penalty Assessment</option>
            <option value="credit_denial">Tax Credit Denied</option>
            <option value="deduction_denial">Deduction Denied</option>
            <option value="income_dispute">Income Reporting Dispute</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Disputed Amount</label>
          <input type="number" value={disputedAmount} onChange={(e) => setDisputedAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">IRS Position</label>
          <select value={irsPosition} onChange={(e) => setIrsPosition(e.target.value as 'full_denial' | 'partial_denial' | 'adjustment')} className="w-full border rounded p-2">
            <option value="full_denial">Full Denial of Position</option>
            <option value="partial_denial">Partial Denial/Adjustment</option>
            <option value="adjustment">Minor Adjustment Proposed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Stage</label>
          <select value={stage} onChange={(e) => setStage(e.target.value as 'initial' | 'examination' | 'appeal' | 'tax_court' | 'collection')} className="w-full border rounded p-2">
            <option value="initial">Initial Notice Received</option>
            <option value="examination">Under Examination</option>
            <option value="appeal">Appeals Stage</option>
            <option value="tax_court">Tax Court Consideration</option>
            <option value="collection">Collection Dispute</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation & Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={haveDocumentation} onChange={(e) => setHaveDocumentation(e.target.checked)} className="mr-2" />
              <span className="text-sm">I have supporting documentation</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={firstTimePenalty} onChange={(e) => setFirstTimePenalty(e.target.checked)} className="mr-2" />
              <span className="text-sm">First-time penalty issue</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={reasonableCause} onChange={(e) => setReasonableCause(e.target.checked)} className="mr-2" />
              <span className="text-sm">Reasonable cause exists</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.outcomeColor === 'red' ? 'bg-red-50 border border-red-200' : result.outcomeColor === 'orange' ? 'bg-orange-50 border border-orange-200' : result.outcomeColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : result.outcomeColor === 'green' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Potential Outcome Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Disputed Amount:</span><span className="font-bold ml-2">$ {result.disputedAmount}</span></div>
          <div><span className="text-zinc-600">IRS Position:</span><span className="font-bold ml-2">{result.irsPosition}</span></div>
          <div><span className="text-zinc-600">Stage:</span><span className="font-bold ml-2">{result.stage}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.outcomeColor === 'red' ? 'text-red-700' : result.outcomeColor === 'orange' ? 'text-orange-700' : result.outcomeColor === 'green' ? 'text-green-700' : ''}`}>{result.potentialOutcome}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Resolution Options by Stage</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Stage</th>
                <th className="py-2 text-left">Options</th>
                <th className="py-2 text-left">Timeline</th>
                <th className="py-2 text-left">Cost Level</th>
              </tr>
            </thead>
            <tbody>
              {result.resolutionOptions.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="py-1 font-semibold">{r.stage}</td>
                  <td className="py-1">{r.options.join(', ')}</td>
                  <td className="py-1">{r.timeline}</td>
                  <td className="py-1">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Estimated Costs & Timeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Professional Fees:</span><span className="font-bold ml-2">$ {result.professionalFees}</span></div>
          <div><span className="text-zinc-600">Court Costs:</span><span className="font-bold ml-2">$ {result.courtCosts}</span></div>
          <div><span className="text-zinc-600">Interest During Dispute:</span><span className="font-bold ml-2">$ {result.interestContinuing}</span></div>
          <div><span className="text-zinc-600">Estimated Months:</span><span className="font-bold ml-2">{result.estimatedMonths}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Resolution Steps</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Step</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {result.resolutionSteps.map((s) => (
                <tr key={s.step} className="border-b">
                  <td className="py-1 font-semibold">{s.step}</td>
                  <td className="py-1">{s.action}</td>
                  <td className="py-1">{s.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Success Factors</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.successFactors.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Dispute Resolution Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Respond timely to all notices</li>
          <li>30-day letter: request Appeals</li>
          <li>90-day letter: Tax Court deadline</li>
          <li>Document everything thoroughly</li>
          <li>Manager conference before Appeals</li>
          <li>Appeals: informal, no court rules</li>
          <li>Tax Court: formal litigation</li>
          <li>Small case under $50K: simpler</li>
          <li>Interest continues during dispute</li>
          <li>Settlement often saves costs</li>
        </ul>
      </div>
    </div>
  )
}