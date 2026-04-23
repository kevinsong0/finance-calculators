'use client'

import { useState } from 'react'

export default function TaxAppealStrategyCalculator() {
  const [appealType, setAppealType] = useState<'examination' | 'collection' | 'penalty' | 'liability'>('examination')
  const [disputedAmount, setDisputedAmount] = useState(20000)
  const [appealStage, setAppealStage] = useState<'30_day' | '90_day' | 'tax_court' | 'appeals_office'>('30_day')
  const [documentationStrength, setDocumentationStrength] = useState<'strong' | 'moderate' | 'weak'>('moderate')
  const [legalIssueComplexity, setLegalIssueComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate')
  const [professionalRepresentation, setProfessionalRepresentation] = useState(false)
  const [priorAppealOutcome, setPriorAppealOutcome] = useState<'none' | 'favorable' | 'unfavorable'>('none')
  const [taxYear, setTaxYear] = useState(2022)
  const [deadlineDate, setDeadlineDate] = useState('2024-04-15')
  const [interestRate, setInterestRate] = useState(8)

  const calculate = () => {
    // Tax Appeal Strategy Calculator
    // Calculate appeal strategy, timeline, costs, and success factors

    const deadlineObj = new Date(deadlineDate)
    const today = new Date()
    const daysUntilDeadline = Math.ceil((deadlineObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Appeal options based on stage
    const appealOptions: { stage: string; option: string; description: string; requirements: string; successFactors: string; timeEstimate: string }[] = []

    if (appealStage === '30_day') {
      appealOptions.push({
        stage: '30-Day Letter',
        option: 'IRS Appeals Office',
        description: 'Request Appeals conference with written protest',
        requirements: 'Written protest with statement of facts, law, and disagreements',
        successFactors: documentationStrength === 'strong' ? 'Strong documentation increases success' : 'Gather more documentation',
        timeEstimate: '6-12 months for resolution',
      })
      appealOptions.push({
        stage: '30-Day Letter',
        option: 'Fast Track Settlement',
        description: 'Accelerated settlement process for certain cases',
        requirements: 'IRS and taxpayer agree to participate',
        successFactors: 'Works well for factual disputes',
        timeEstimate: '2-4 months',
      })
      appealOptions.push({
        stage: '30-Day Letter',
        option: 'Settle with Examiner',
        description: 'Negotiate directly with examiner before formal appeal',
        requirements: 'Open communication with examiner',
        successFactors: 'May resolve without formal appeal',
        timeEstimate: 'Immediate if successful',
      })
    }

    if (appealStage === '90_day') {
      appealOptions.push({
        stage: '90-Day Letter',
        option: 'Tax Court Petition',
        description: 'File petition in US Tax Court',
        requirements: 'Petition within 90 days, $60 filing fee',
        successFactors: 'Preserves rights, formal litigation process',
        timeEstimate: '1-2 years for trial',
      })
      appealOptions.push({
        stage: '90-Day Letter',
        option: 'Small Tax Case Procedure',
        description: 'Simplified Tax Court for disputes under $50K',
        requirements: 'Elect small case status, informal rules',
        successFactors: 'Lower cost, faster resolution',
        timeEstimate: '6-12 months',
      })
      appealOptions.push({
        stage: '90-Day Letter',
        option: 'Pay and Sue for Refund',
        description: 'Pay tax, then sue in District Court or Claims Court',
        requirements: 'Full payment first, then file refund claim',
        successFactors: 'Different court options, jury trial possible',
        timeEstimate: '1-3 years',
      })
    }

    if (appealStage === 'tax_court') {
      appealOptions.push({
        stage: 'Tax Court',
        option: 'Pre-Trial Settlement',
        description: 'Negotiate settlement with IRS counsel before trial',
        requirements: 'Discussions with IRS attorneys',
        successFactors: 'Most cases settle before trial',
        timeEstimate: 'During pre-trial phase',
      })
      appealOptions.push({
        stage: 'Tax Court',
        option: 'Motion Practice',
        description: 'File motions to resolve legal issues',
        requirements: 'Legal research and motion drafting',
        successFactors: 'Can resolve without trial',
        timeEstimate: 'Before trial',
      })
      appealOptions.push({
        stage: 'Tax Court',
        option: 'Trial',
        description: 'Present case at Tax Court trial',
        requirements: 'Evidence, witnesses, testimony',
        successFactors: documentationStrength === 'strong' ? 'Strong evidence at trial' : 'Evidence preparation critical',
        timeEstimate: '1 day trial, months for decision',
      })
    }

    if (appealStage === 'appeals_office') {
      appealOptions.push({
        stage: 'Appeals Office',
        option: 'Appeals Conference',
        description: 'Informal meeting with Appeals Officer',
        requirements: 'Protest letter, documentation',
        successFactors: 'Informal, flexible process',
        timeEstimate: '2-4 hours for conference',
      })
      appealOptions.push({
        stage: 'Appeals Office',
        option: 'Settlement Proposal',
        description: 'Propose specific settlement amount',
        requirements: 'Written proposal with rationale',
        successFactors: 'Many cases settle at Appeals',
        timeEstimate: 'During conference',
      })
    }

    // Success factors
    const successFactorsList: { factor: string; importance: string; yourStatus: string; improvement: string }[] = []

    successFactorsList.push({
      factor: 'Documentation Quality',
      importance: 'Critical',
      yourStatus: documentationStrength === 'strong' ? 'Strong' : documentationStrength === 'moderate' ? 'Moderate' : 'Weak',
      improvement: documentationStrength === 'strong' ? 'Maintain complete records' : 'Gather additional supporting documents',
    })

    successFactorsList.push({
      factor: 'Legal Issue Complexity',
      importance: 'High',
      yourStatus: legalIssueComplexity === 'simple' ? 'Simple' : legalIssueComplexity === 'moderate' ? 'Moderate' : 'Complex',
      improvement: legalIssueComplexity === 'complex' && !professionalRepresentation ? 'Consider professional representation' : 'Prepare legal arguments',
    })

    successFactorsList.push({
      factor: 'Timeliness',
      importance: 'Critical',
      yourStatus: daysUntilDeadline > 30 ? 'Good' : daysUntilDeadline > 7 ? 'Urgent' : 'Critical',
      improvement: daysUntilDeadline < 30 ? 'File immediately' : 'Prepare thoroughly before filing',
    })

    successFactorsList.push({
      factor: 'Professional Representation',
      importance: 'High for complex cases',
      yourStatus: professionalRepresentation ? 'Represented' : 'Self-represented',
      improvement: !professionalRepresentation && (legalIssueComplexity === 'complex' || disputedAmount > 20000) ? 'Consider engaging professional' : 'Self-representation possible',
    })

    successFactorsList.push({
      factor: 'Prior Appeal Outcome',
      importance: 'Moderate',
      yourStatus: priorAppealOutcome === 'none' ? 'First appeal' : priorAppealOutcome === 'favorable' ? 'Prior success' : 'Prior unfavorable',
      improvement: priorAppealOutcome === 'unfavorable' ? 'Address issues from prior appeal' : 'Build on prior experience',
    })

    // Cost estimates
    const professionalFees = professionalRepresentation ?
      (legalIssueComplexity === 'complex' ? 8000 :
       legalIssueComplexity === 'moderate' ? 4000 : 2000) : 0

    const courtFees = appealStage === '90_day' || appealStage === 'tax_court' ? 60 : 0

    // Interest during appeal
    const monthsDuringAppeal = appealStage === 'tax_court' ? 18 :
                               appealStage === 'appeals_office' ? 6 :
                               appealStage === '90_day' ? 12 : 6

    const interestAccruing = disputedAmount * (interestRate / 100) * (monthsDuringAppeal / 12)

    const totalCostEstimate = professionalFees + courtFees + interestAccruing

    // Success probability
    let baseSuccess = 0
    if (documentationStrength === 'strong') baseSuccess += 30
    else if (documentationStrength === 'moderate') baseSuccess += 15
    else baseSuccess += 5

    if (professionalRepresentation) baseSuccess += 15
    if (priorAppealOutcome === 'favorable') baseSuccess += 10
    if (legalIssueComplexity === 'simple') baseSuccess += 10

    const successProbability = Math.min(80, Math.max(10, baseSuccess))

    // Recommendation
    let recommendation = ''
    if (daysUntilDeadline <= 0) {
      recommendation = `DEADLINE EXCEEDED. Appeal rights may be lost. ${appealStage === '90_day' ? 'Tax Court deadline passed - cannot file petition. Consider refund suit if tax paid.' : 'Contact IRS immediately to discuss options.'}`
    } else if (daysUntilDeadline <= 7) {
      recommendation = `URGENT: ${daysUntilDeadline} days until deadline. File appeal immediately. ${professionalRepresentation ? 'Representative handling.' : 'Prepare petition/protest quickly.'} Consider requesting extension if possible.`
    } else if (daysUntilDeadline <= 30) {
      recommendation = `Approaching deadline. Prepare appeal documents. ${documentationStrength === 'weak' ? 'Gather documentation urgently.' : 'Organize existing documentation.'} ${!professionalRepresentation && disputedAmount > 15000 ? 'Consider professional help.' : ''}`
    } else {
      recommendation = `Good timeline. Prepare thorough appeal. ${documentationStrength === 'strong' ? 'Strong documentation supports appeal.' : 'Gather additional supporting documents.'} ${appealStage === '30_day' ? 'Appeals Office often successful for factual disputes.' : appealStage === '90_day' ? 'Tax Court preserves rights and allows formal litigation.' : ''}`
    }

    return {
      appealType,
      disputedAmount: disputedAmount.toFixed(0),
      appealStage,
      documentationStrength,
      legalIssueComplexity,
      professionalRepresentation,
      priorAppealOutcome,
      taxYear,
      deadlineDate,
      interestRate: interestRate.toFixed(0),
      daysUntilDeadline: daysUntilDeadline.toFixed(0),
      appealOptions,
      successFactorsList,
      professionalFees: professionalFees.toFixed(0),
      courtFees: courtFees.toFixed(0),
      interestAccruing: interestAccruing.toFixed(0),
      totalCostEstimate: totalCostEstimate.toFixed(0),
      monthsDuringAppeal: monthsDuringAppeal.toFixed(0),
      successProbability: successProbability.toFixed(0),
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Appeal Strategy Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate appeal strategy, timeline, costs, and success factors.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Appeal Type</label>
          <select value={appealType} onChange={(e) => setAppealType(e.target.value as 'examination' | 'collection' | 'penalty' | 'liability')} className="w-full border rounded p-2">
            <option value="examination">Examination Appeal</option>
            <option value="collection">Collection Appeal (CDP)</option>
            <option value="penalty">Penalty Appeal</option>
            <option value="liability">Liability Dispute</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Disputed Amount</label>
          <input type="number" value={disputedAmount} onChange={(e) => setDisputedAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Appeal Stage</label>
          <select value={appealStage} onChange={(e) => setAppealStage(e.target.value as '30_day' | '90_day' | 'tax_court' | 'appeals_office')} className="w-full border rounded p-2">
            <option value="30_day">30-Day Letter Response</option>
            <option value="90_day">90-Day Letter/SNOD</option>
            <option value="tax_court">Tax Court Proceeding</option>
            <option value="appeals_office">Appeals Office Conference</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documentation Strength</label>
          <select value={documentationStrength} onChange={(e) => setDocumentationStrength(e.target.value as 'strong' | 'moderate' | 'weak')} className="w-full border rounded p-2">
            <option value="strong">Strong - Complete records</option>
            <option value="moderate">Moderate - Some records</option>
            <option value="weak">Weak - Limited records</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Legal Issue Complexity</label>
          <select value={legalIssueComplexity} onChange={(e) => setLegalIssueComplexity(e.target.value as 'simple' | 'moderate' | 'complex')} className="w-full border rounded p-2">
            <option value="simple">Simple - Clear factual dispute</option>
            <option value="moderate">Moderate - Some legal issues</option>
            <option value="complex">Complex - Significant legal issues</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Appeal Deadline</label>
          <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appeal Context</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={professionalRepresentation} onChange={(e) => setProfessionalRepresentation(e.target.checked)} className="mr-2" />
              <span className="text-sm">Professional Representation</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prior Appeal Outcome</label>
            <select value={priorAppealOutcome} onChange={(e) => setPriorAppealOutcome(e.target.value as 'none' | 'favorable' | 'unfavorable')} className="w-full border rounded p-2">
              <option value="none">None - First Appeal</option>
              <option value="favorable">Favorable Outcome</option>
              <option value="unfavorable">Unfavorable Outcome</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.daysUntilDeadline) <= 7 ? 'bg-red-50 border border-red-200' : Number(result.daysUntilDeadline) <= 30 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Timeline & Success Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Disputed Amount:</span><span className="font-bold ml-2">$ {result.disputedAmount}</span></div>
          <div><span className="text-zinc-600">Days Until Deadline:</span><span className={`font-bold ml-2 ${Number(result.daysUntilDeadline) <= 7 ? 'text-red-700' : Number(result.daysUntilDeadline) <= 30 ? 'text-orange-700' : 'text-green-700'}`}>{result.daysUntilDeadline}</span></div>
          <div><span className="text-zinc-600">Success Probability:</span><span className={`font-bold ml-2 ${Number(result.successProbability) >= 50 ? 'text-green-700' : Number(result.successProbability) >= 30 ? 'text-orange-700' : ''}`}>{result.successProbability}%</span></div>
          <div><span className="text-zinc-600">Est. Total Cost:</span><span className="font-bold ml-2">$ {result.totalCostEstimate}</span></div>
          <div><span className="text-zinc-600">Est. Months:</span><span className="font-bold ml-2">{result.monthsDuringAppeal}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appeal Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Stage</th>
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {result.appealOptions.map((o, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{o.stage}</td>
                  <td className="py-1">{o.option}</td>
                  <td className="py-1">{o.description}</td>
                  <td className="py-1">{o.timeEstimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Success Factors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Factor</th>
                <th className="py-2 text-left">Importance</th>
                <th className="py-2 text-left">Your Status</th>
                <th className="py-2 text-left">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {result.successFactorsList.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.factor}</td>
                  <td className="py-1">{s.importance}</td>
                  <td className="py-1">{s.yourStatus}</td>
                  <td className="py-1">{s.improvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Cost Estimates</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Professional Fees:</span><span className="font-medium ml-2">$ {result.professionalFees}</span></div>
          <div><span className="text-zinc-600">Court Fees:</span><span className="font-medium ml-2">$ {result.courtFees}</span></div>
          <div><span className="text-zinc-600">Interest Accruing:</span><span className="font-bold text-red-700 ml-2">$ {result.interestAccruing}</span></div>
          <div><span className="text-zinc-600">Total Estimate:</span><span className="font-bold ml-2">$ {result.totalCostEstimate}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.daysUntilDeadline) <= 7 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Appeal Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>30-day letter: Appeals Office</li>
          <li>90-day letter: Tax Court</li>
          <li>File within deadlines critical</li>
          <li>Documentation determines success</li>
          <li>Most cases settle before trial</li>
          <li>Appeals: informal process</li>
          <li>Tax Court: formal litigation</li>
          <li>Small case: simpler rules</li>
          <li>Interest continues during appeal</li>
          <li>Professional help for complex</li>
        </ul>
      </div>
    </div>
  )
}