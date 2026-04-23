'use client'

import { useState } from 'react'

export default function TaxPenaltyAppealCalculator() {
  const [penaltyType, setPenaltyType] = useState<'failure_to_file' | 'failure_to_pay' | 'accuracy_related' | 'fraud' | 'negligence' | 'substantial_understatement'>('failure_to_file')
  const [penaltyAmount, setPenaltyAmount] = useState(5000)
  const [taxDue, setTaxDue] = useState(10000)
  const [filingDueDate, setFilingDueDate] = useState('2023-04-15')
  const [actualFilingDate, setActualFilingDate] = useState('2023-06-15')
  const [reasonableCause, setReasonableCause] = useState(false)
  const [causeType, setCauseType] = useState<'death' | 'illness' | 'disaster' | 'unable_to_obtain_records' | 'other'>('illness')
  const [firstTimeAbatement, setFirstTimeAbatement] = useState(false)
  const [cleanHistoryYears, setCleanHistoryYears] = useState(3)
  const [currentYear, setCurrentYear] = useState(2022)
  const [alreadyAppealed, setAlreadyAppealed] = useState(false)

  const calculate = () => {
    // Tax Penalty Appeal Calculator
    // Calculate penalty appeal options, success likelihood, and abatement amount

    const dueDate = new Date(filingDueDate)
    const filedDate = new Date(actualFilingDate)
    const daysLate = Math.ceil((filedDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

    // Calculate base penalty amounts
    let penaltyRate = 0
    let penaltyDescription = ''

    switch (penaltyType) {
      case 'failure_to_file':
        penaltyRate = 0.05 // 5% per month
        penaltyDescription = 'Failure to File Penalty (IRC 6651(a)(1))'
        break
      case 'failure_to_pay':
        penaltyRate = 0.005 // 0.5% per month
        penaltyDescription = 'Failure to Pay Penalty (IRC 6651(a)(2))'
        break
      case 'accuracy_related':
        penaltyRate = 0.20 // 20%
        penaltyDescription = 'Accuracy-Related Penalty (IRC 6662)'
        break
      case 'fraud':
        penaltyRate = 0.75 // 75%
        penaltyDescription = 'Fraud Penalty (IRC 6663)'
        break
      case 'negligence':
        penaltyRate = 0.20 // 20%
        penaltyDescription = 'Negligence Penalty (IRC 6662(c))'
        break
      case 'substantial_understatement':
        penaltyRate = 0.20 // 20%
        penaltyDescription = 'Substantial Understatement Penalty (IRC 6662(d))'
        break
    }

    // Calculate computed penalty
    let computedPenalty = 0
    const monthsLate = Math.ceil(daysLate / 30)

    if (penaltyType === 'failure_to_file') {
      computedPenalty = Math.min(taxDue * 0.25, taxDue * penaltyRate * monthsLate)
    } else if (penaltyType === 'failure_to_pay') {
      computedPenalty = Math.min(taxDue * 0.25, taxDue * penaltyRate * monthsLate)
    } else {
      computedPenalty = penaltyAmount // Use provided for accuracy-related
    }

    // Appeal options
    const appealOptions: { option: string; eligibility: string; process: string; successRate: string; amountSaved: string }[] = []

    // First-Time Abatement (FTA)
    if (penaltyType === 'failure_to_file' || penaltyType === 'failure_to_pay') {
      const ftaEligible = cleanHistoryYears >= 3 && firstTimeAbatement && currentYear >= 2020
      appealOptions.push({
        option: 'First-Time Abatement (FTA)',
        eligibility: ftaEligible ? 'Eligible' : 'Not Eligible',
        process: ftaEligible ? 'Request FTA by phone or letter. IRS may grant automatically if 3-year clean history.' : 'Need 3-year clean compliance history',
        successRate: ftaEligible ? 'High (often automatic)' : '0%',
        amountSaved: ftaEligible ? `$${computedPenalty.toFixed(0)}` : '$0',
      })
    }

    // Reasonable Cause
    let rcEligible = false
    let rcStrength = ''

    if (reasonableCause) {
      switch (causeType) {
        case 'death':
          rcStrength = 'Strong - Death of family member is recognized reasonable cause'
          rcEligible = true
          break
        case 'illness':
          rcStrength = 'Strong - Serious illness is recognized reasonable cause if documented'
          rcEligible = true
          break
        case 'disaster':
          rcStrength = 'Strong - Natural disaster qualifies if in affected area'
          rcEligible = true
          break
        case 'unable_to_obtain_records':
          rcStrength = 'Moderate - Must show reasonable efforts to obtain records'
          rcEligible = true
          break
        case 'other':
          rcStrength = 'Variable - Depends on specific circumstances and documentation'
          rcEligible = false
          break
      }
    }

    appealOptions.push({
      option: 'Reasonable Cause',
      eligibility: rcEligible ? 'Potentially Eligible' : 'Review Required',
      process: rcEligible ? 'Document circumstances, submit Form 843 or letter with evidence' : 'Provide detailed documentation of circumstances',
      successRate: rcEligible ? 'Moderate to High' : 'Variable',
      amountSaved: rcEligible ? `$${computedPenalty.toFixed(0)}` : 'Depends on evidence',
    })

    // Correction of IRS Error
    appealOptions.push({
      option: 'IRS Error Correction',
      eligibility: 'If IRS made computational or procedural error',
      process: 'Contact IRS, point out specific error, request immediate correction',
      successRate: 'High if error proven',
      amountSaved: 'Full penalty if IRS error',
    })

    // Appeal to IRS Appeals Office
    appealOptions.push({
      option: 'IRS Appeals Office',
      eligibility: alreadyAppealed ? 'Already appealed' : 'Available after IRS rejection',
      process: 'File protest within 30 days of rejection letter, request Appeals conference',
      successRate: 'Moderate - negotiate settlement',
      amountSaved: 'Often 50-80% reduction',
    })

    // Tax Court Petition
    if (penaltyAmount > 500) {
      appealOptions.push({
        option: 'Tax Court Petition',
        eligibility: 'After 90-day letter',
        process: 'File petition within 90 days of Statutory Notice of Deficiency',
        successRate: 'Variable - formal litigation',
        amountSaved: 'Potentially full penalty',
      })
    }

    // Calculate success likelihood
    let successLikelihood = 0
    let successDescription = ''

    // FTA factor
    if (cleanHistoryYears >= 3 && firstTimeAbatement && (penaltyType === 'failure_to_file' || penaltyType === 'failure_to_pay')) {
      successLikelihood += 80
    }

    // Reasonable cause factor
    if (reasonableCause && rcEligible) {
      successLikelihood = Math.max(successLikelihood, 60)
      if (causeType === 'death' || causeType === 'illness' || causeType === 'disaster') {
        successLikelihood = Math.max(successLikelihood, 70)
      }
    }

    // Penalty type factor
    if (penaltyType === 'fraud') {
      successLikelihood = Math.min(successLikelihood, 10)
      successDescription = 'Fraud penalties very difficult to appeal - requires proving no fraud intent'
    } else if (penaltyType === 'accuracy_related' || penaltyType === 'negligence') {
      successLikelihood = Math.min(successLikelihood, 40)
      successDescription = 'Accuracy-related penalties require showing reasonable cause or good faith'
    } else {
      successDescription = 'Filing/payment penalties have multiple appeal pathways'
    }

    if (successLikelihood === 0) {
      successLikelihood = 20
      successDescription = 'Limited appeal options - review eligibility criteria'
    }

    // Recommended strategy
    let recommendedStrategy = ''

    if (cleanHistoryYears >= 3 && firstTimeAbatement && (penaltyType === 'failure_to_file' || penaltyType === 'failure_to_pay')) {
      recommendedStrategy = `RECOMMENDED: Request First-Time Abatement first. You have ${cleanHistoryYears}-year clean history. FTA often granted automatically. If rejected, then pursue reasonable cause argument.`
    } else if (reasonableCause && rcEligible) {
      recommendedStrategy = `RECOMMENDED: Pursue reasonable cause argument. ${rcStrength}. Gather documentation: medical records, death certificate, disaster declaration, etc. Submit with Form 843 or detailed letter.`
    } else if (penaltyType === 'fraud') {
      recommendedStrategy = `WARNING: Fraud penalty (${penaltyRate * 100}%) extremely difficult to abate. Requires proving no fraudulent intent. Consult tax attorney immediately. Consider settlement negotiation.`
    } else {
      recommendedStrategy = `RECOMMENDED: Combine multiple appeal strategies. ${cleanHistoryYears >= 3 ? 'Request FTA if eligible. ' : ''}${reasonableCause ? 'Document reasonable cause. ' : ''}If initial request denied, escalate to Appeals Office. Professional representation recommended for penalties >$5,000.`
    }

    // Documentation checklist
    const documentation: { item: string; required: boolean; notes: string }[] = []

    documentation.push({ item: 'Penalty notice copy', required: true, notes: 'Include notice date and penalty amount' })
    documentation.push({ item: 'Tax return copy', required: true, notes: 'Show filing date and tax due' })

    if (reasonableCause) {
      if (causeType === 'death') {
        documentation.push({ item: 'Death certificate', required: true, notes: 'Family member death within filing period' })
        documentation.push({ item: 'Relationship proof', required: true, notes: 'Proof of relationship to deceased' })
      } else if (causeType === 'illness') {
        documentation.push({ item: 'Medical records', required: true, notes: 'Doctor statements, hospital records' })
        documentation.push({ item: 'Illness timeline', required: true, notes: 'Dates of illness affecting filing' })
      } else if (causeType === 'disaster') {
        documentation.push({ item: 'FEMA declaration', required: true, notes: 'Official disaster declaration' })
        documentation.push({ item: 'Location proof', required: true, notes: 'Address in affected area' })
      } else if (causeType === 'unable_to_obtain_records') {
        documentation.push({ item: 'Records request attempts', required: true, notes: 'Document multiple attempts to obtain records' })
        documentation.push({ item: 'Third-party correspondence', required: true, notes: 'Letters showing delays' })
      }
    }

    documentation.push({ item: 'Written statement', required: true, notes: 'Explain circumstances in detail' })
    documentation.push({ item: 'FTA request letter', required: false, notes: 'If FTA eligible, separate request' })

    // Timeline
    const timeline: { step: string; deadline: string; action: string }[] = []

    timeline.push({
      step: 'Initial Penalty Notice',
      deadline: 'Received',
      action: 'Review penalty, gather initial documents',
    })

    timeline.push({
      step: 'Abatement Request',
      deadline: 'Within 30-60 days',
      action: 'Submit FTA or reasonable cause request',
    })

    timeline.push({
      step: 'IRS Response',
      deadline: '45-90 days after request',
      action: 'Wait for IRS decision letter',
    })

    timeline.push({
      step: 'Appeals Protest',
      deadline: '30 days from rejection',
      action: 'File written protest to Appeals Office',
    })

    timeline.push({
      step: 'Appeals Conference',
      deadline: 'Scheduled date',
      action: 'Present case to Appeals Officer',
    })

    timeline.push({
      step: 'Tax Court Petition',
      deadline: '90 days from SNOD',
      action: 'File petition if Appeals unsuccessful',
    })

    return {
      penaltyType,
      penaltyDescription,
      penaltyAmount: computedPenalty.toFixed(0),
      penaltyRate: (penaltyRate * 100).toFixed(1),
      taxDue: taxDue.toFixed(0),
      daysLate,
      monthsLate,
      filingDueDate,
      actualFilingDate,
      reasonableCause,
      causeType,
      firstTimeAbatement,
      cleanHistoryYears,
      appealOptions,
      successLikelihood: successLikelihood.toFixed(0),
      successDescription,
      recommendedStrategy,
      documentation,
      timeline,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Penalty Appeal Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate appeal options and success likelihood for IRS penalty abatement.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Type</label>
          <select value={penaltyType} onChange={(e) => setPenaltyType(e.target.value as 'failure_to_file' | 'failure_to_pay' | 'accuracy_related' | 'fraud' | 'negligence' | 'substantial_understatement')} className="w-full border rounded p-2">
            <option value="failure_to_file">Failure to File</option>
            <option value="failure_to_pay">Failure to Pay</option>
            <option value="accuracy_related">Accuracy-Related</option>
            <option value="fraud">Fraud Penalty</option>
            <option value="negligence">Negligence</option>
            <option value="substantial_understatement">Substantial Understatement</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Amount</label>
          <input type="number" value={penaltyAmount} onChange={(e) => setPenaltyAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Due</label>
          <input type="number" value={taxDue} onChange={(e) => setTaxDue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Due Date</label>
          <input type="date" value={filingDueDate} onChange={(e) => setFilingDueDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Actual Filing Date</label>
          <input type="date" value={actualFilingDate} onChange={(e) => setActualFilingDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appeal Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={reasonableCause} onChange={(e) => setReasonableCause(e.target.checked)} className="mr-2" />
              <span className="text-sm">Reasonable Cause Exists</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={firstTimeAbatement} onChange={(e) => setFirstTimeAbatement(e.target.checked)} className="mr-2" />
              <span className="text-sm">First-Time Penalty Issue</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={alreadyAppealed} onChange={(e) => setAlreadyAppealed(e.target.checked)} className="mr-2" />
              <span className="text-sm">Already Appealed</span>
            </label>
          </div>
        </div>
        {reasonableCause && (
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Cause Type</label>
            <select value={causeType} onChange={(e) => setCauseType(e.target.value as 'death' | 'illness' | 'disaster' | 'unable_to_obtain_records' | 'other')} className="w-full border rounded p-2">
              <option value="death">Death in Family</option>
              <option value="illness">Serious Illness</option>
              <option value="disaster">Natural Disaster</option>
              <option value="unable_to_obtain_records">Unable to Obtain Records</option>
              <option value="other">Other Circumstance</option>
            </select>
          </div>
        )}
        {firstTimeAbatement && (
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Clean History Years</label>
            <input type="number" value={cleanHistoryYears} onChange={(e) => setCleanHistoryYears(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className={`card mb-6 ${Number(result.successLikelihood) >= 60 ? 'bg-green-50 border border-green-200' : Number(result.successLikelihood) >= 40 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Appeal Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Penalty:</span><span className="font-bold ml-2">{result.penaltyDescription}</span></div>
          <div><span className="text-zinc-600">Amount:</span><span className="font-bold ml-2">$ {result.penaltyAmount}</span></div>
          <div><span className="text-zinc-600">Days Late:</span><span className="font-bold ml-2">{result.daysLate}</span></div>
          <div><span className="text-zinc-600">Success Likelihood:</span><span className={`font-bold ml-2 ${Number(result.successLikelihood) >= 60 ? 'text-green-700' : Number(result.successLikelihood) >= 40 ? 'text-orange-700' : 'text-red-700'}`}>{result.successLikelihood}%</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${Number(result.successLikelihood) >= 60 ? 'text-green-700' : Number(result.successLikelihood) >= 40 ? 'text-orange-700' : 'text-red-700'}`}>{result.successDescription}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appeal Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Eligibility</th>
                <th className="py-2 text-left">Success Rate</th>
                <th className="py-2 text-left">Amount Saved</th>
              </tr>
            </thead>
            <tbody>
              {result.appealOptions.map((o, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{o.option}</td>
                  <td className="py-1">{o.eligibility}</td>
                  <td className="py-1">{o.successRate}</td>
                  <td className="py-1">{o.amountSaved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Checklist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-left">Required</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.documentation.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.item}</td>
                  <td className="py-1">{d.required ? 'Yes' : 'Optional'}</td>
                  <td className="py-1">{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appeal Timeline</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Step</th>
                <th className="py-2 text-left">Deadline</th>
                <th className="py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {result.timeline.map((t, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{t.step}</td>
                  <td className="py-1">{t.deadline}</td>
                  <td className="py-1">{t.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.successLikelihood) >= 60 ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommended Strategy</h2>
        <div className="text-sm text-zinc-600">{result.recommendedStrategy}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Penalty Appeal Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>FTA requires 3-year clean history</li>
          <li>Reasonable cause needs documentation</li>
          <li>Death, illness, disaster qualify</li>
          <li>Fraud penalty extremely hard to abate</li>
          <li>Appeals can negotiate settlement</li>
          <li>Tax Court for formal disputes</li>
          <li>File requests within 30-60 days</li>
          <li>Professional help for complex cases</li>
          <li>Combine multiple strategies</li>
          <li>Document everything thoroughly</li>
        </ul>
      </div>
    </div>
  )
}