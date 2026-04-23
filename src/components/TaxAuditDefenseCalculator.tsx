'use client'

import { useState } from 'react'

export default function TaxAuditDefenseCalculator() {
  const [auditAdjustment, setAuditAdjustment] = useState(15000)
  const [adjustmentType, setAdjustmentType] = useState<'income' | 'deduction' | 'credit' | 'penalty'>('income')
  const [irsPosition, setIrsPosition] = useState<'strong' | 'moderate' | 'weak'>('strong')
  const [documentationStrength, setDocumentationStrength] = useState<'strong' | 'moderate' | 'weak' | 'none'>('moderate')
  const [auditStage, setAuditStage] = useState<'examination' | '30_day_letter' | '90_day_letter' | 'appeals'>('examination')
  const [professionalRepresentation, setProfessionalRepresentation] = useState(false)
  const [taxYear, setTaxYear] = useState(2022)
  const [penaltyProposed, setPenaltyProposed] = useState(3000)
  const [reasonableCause, setReasonableCause] = useState(false)
  const [firstTimePenalty, setFirstTimePenalty] = useState(false)

  const calculate = () => {
    // Tax Audit Defense Calculator
    // Calculate defense strategy, costs, and likelihood of success

    // Defense strategy by stage
    const defenseOptions: { stage: string; strategy: string; action: string; deadline: string; costEstimate: string; successRate: string }[] = []

    if (auditStage === 'examination') {
      defenseOptions.push({
        stage: 'Examination',
        strategy: 'Provide Documentation',
        action: 'Submit supporting documents to examiner',
        deadline: 'During audit',
        costEstimate: 'Low',
        successRate: documentationStrength === 'strong' ? 'High' : documentationStrength === 'moderate' ? 'Moderate' : 'Low',
      })
      defenseOptions.push({
        stage: 'Examination',
        strategy: 'Examiner Meeting',
        action: 'Meet with examiner to explain position',
        deadline: 'During audit',
        costEstimate: 'Low',
        successRate: 'Moderate',
      })
      defenseOptions.push({
        stage: 'Examination',
        strategy: 'Manager Conference',
        action: 'Request meeting with examiner manager',
        deadline: 'Before 30-day letter',
        costEstimate: 'Low',
        successRate: 'Moderate',
      })
    }

    if (auditStage === '30_day_letter' || auditStage === 'examination') {
      defenseOptions.push({
        stage: '30-Day Letter',
        strategy: 'File Protest Letter',
        action: 'Submit written protest to IRS Appeals',
        deadline: '30 days from letter',
        costEstimate: 'Moderate',
        successRate: 'Moderate to High',
      })
      defenseOptions.push({
        stage: '30-Day Letter',
        strategy: 'Appeals Conference',
        action: 'Request Appeals Office conference',
        deadline: '30 days from letter',
        costEstimate: 'Moderate',
        successRate: documentationStrength === 'strong' ? 'High' : 'Moderate',
      })
    }

    if (auditStage === '90_day_letter') {
      defenseOptions.push({
        stage: '90-Day Letter',
        strategy: 'Tax Court Petition',
        action: 'File petition in US Tax Court',
        deadline: '90 days from notice',
        costEstimate: 'High',
        successRate: 'Variable',
      })
      defenseOptions.push({
        stage: '90-Day Letter',
        strategy: 'Small Tax Case',
        action: 'Request simplified procedure (under $50K)',
        deadline: '90 days from notice',
        costEstimate: 'Moderate',
        successRate: 'Good for small disputes',
      })
    }

    if (auditStage === 'appeals') {
      defenseOptions.push({
        stage: 'Appeals',
        strategy: 'Appeals Conference',
        action: 'Present case to Appeals Officer',
        deadline: 'Scheduled date',
        costEstimate: 'Moderate',
        successRate: 'Often successful',
      })
      defenseOptions.push({
        stage: 'Appeals',
        strategy: 'Settlement Negotiation',
        action: 'Negotiate partial settlement',
        deadline: 'During appeals',
        costEstimate: 'Moderate',
        successRate: 'Common outcome',
      })
    }

    // Penalty defense
    if (penaltyProposed > 0) {
      if (firstTimePenalty) {
        defenseOptions.push({
          stage: 'Penalty',
          strategy: 'First-Time Abatement',
          action: 'Request FTA if 3-year clean history',
          deadline: 'Anytime',
          costEstimate: 'None',
          successRate: 'High if eligible',
        })
      }
      if (reasonableCause) {
        defenseOptions.push({
          stage: 'Penalty',
          strategy: 'Reasonable Cause',
          action: 'Document circumstances causing error',
          deadline: 'Anytime',
          costEstimate: 'Low',
          successRate: 'Moderate if documented',
        })
      }
    }

    // Calculate likelihood of success
    let successLikelihood = ''
    let likelihoodPercent = 0

    if (documentationStrength === 'strong' && irsPosition === 'weak') {
      successLikelihood = 'HIGH - Strong documentation, IRS position questionable'
      likelihoodPercent = 75
    } else if (documentationStrength === 'strong' && irsPosition === 'moderate') {
      successLikelihood = 'GOOD - Strong documentation, IRS position debatable'
      likelihoodPercent = 60
    } else if (documentationStrength === 'moderate' && irsPosition === 'weak') {
      successLikelihood = 'MODERATE - Some documentation, IRS position questionable'
      likelihoodPercent = 50
    } else if (documentationStrength === 'moderate') {
      successLikelihood = 'UNCERTAIN - Moderate documentation and IRS position'
      likelihoodPercent = 40
    } else if (documentationStrength === 'weak') {
      successLikelihood = 'LOW - Limited documentation'
      likelihoodPercent = 25
    } else {
      successLikelihood = 'VERY LOW - No supporting documentation'
      likelihoodPercent = 10
    }

    // Professional representation impact
    if (professionalRepresentation) {
      likelihoodPercent = Math.min(90, likelihoodPercent + 15)
    }

    // Cost estimates
    const professionalFee = professionalRepresentation ? (auditAdjustment > 20000 ? 5000 : auditAdjustment > 5000 ? 2000 : 500) : 0
    const courtCosts = auditStage === '90_day_letter' ? 60 : 0
    const totalCostEstimate = professionalFee + courtCosts

    // Potential outcomes
    const potentialOutcomes: { outcome: string; description: string; likelihood: string; financialImpact: number }[] = []

    potentialOutcomes.push({
      outcome: 'Full Victory',
      description: 'Adjustment fully reversed',
      likelihood: `${Math.max(5, likelihoodPercent - 20)}%`,
      financialImpact: 0,
    })

    potentialOutcomes.push({
      outcome: 'Partial Victory',
      description: 'Some adjustment reduced',
      likelihood: `${Math.min(50, likelihoodPercent)}%`,
      financialImpact: auditAdjustment * 0.5,
    })

    potentialOutcomes.push({
      outcome: 'Settlement',
      description: 'Negotiated partial payment',
      likelihood: `${Math.min(30, likelihoodPercent + 10)}%`,
      financialImpact: auditAdjustment * 0.7,
    })

    potentialOutcomes.push({
      outcome: 'Full Adjustment',
      description: 'IRS position upheld',
      likelihood: `${Math.max(10, 100 - likelihoodPercent)}%`,
      financialImpact: auditAdjustment,
    })

    // Recommendation
    let recommendation = ''
    if (auditStage === '90_day_letter') {
      recommendation = `90-day letter received. CRITICAL: File Tax Court petition within 90 days or lose appeal rights. ${likelihoodPercent >= 50 ? 'Good case for appeal.' : 'Consider settlement or paying assessment.'} ${professionalRepresentation ? 'Professional handling case.' : 'Consider professional representation.'}`
    } else if (auditStage === '30_day_letter') {
      recommendation = `30-day letter received. File protest letter with Appeals within 30 days. ${documentationStrength === 'strong' ? 'Strong documentation supports appeal.' : 'Gather additional documentation before appeal.'} Penalty: ${firstTimePenalty ? 'Request first-time abatement.' : reasonableCause ? 'Document reasonable cause.' : 'Penalty may be upheld.'}`
    } else if (auditStage === 'examination') {
      recommendation = `Examination ongoing. ${documentationStrength === 'strong' ? 'Submit complete documentation to examiner.' : documentationStrength === 'moderate' ? 'Gather additional supporting documents.' : 'Documentation critical - collect urgently.'} ${!professionalRepresentation && auditAdjustment > 10000 ? 'Consider professional representation.' : ''}`
    } else {
      recommendation = `Appeals stage. ${likelihoodPercent >= 50 ? 'Good position for settlement negotiation.' : 'Consider settlement to avoid further costs.'} Prepare comprehensive protest. Document all arguments clearly. ${professionalRepresentation ? 'Representative handling appeals.' : 'Consider engaging professional.'}`
    }

    return {
      auditAdjustment: auditAdjustment.toFixed(0),
      adjustmentType,
      irsPosition,
      documentationStrength,
      auditStage,
      professionalRepresentation,
      taxYear,
      penaltyProposed: penaltyProposed.toFixed(0),
      reasonableCause,
      firstTimePenalty,
      defenseOptions,
      successLikelihood,
      likelihoodPercent: likelihoodPercent.toFixed(0),
      professionalFee: professionalFee.toFixed(0),
      courtCosts: courtCosts.toFixed(0),
      totalCostEstimate: totalCostEstimate.toFixed(0),
      potentialOutcomes,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Audit Defense Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate defense strategy and likelihood of success for audit disputes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Audit Adjustment Amount</label>
          <input type="number" value={auditAdjustment} onChange={(e) => setAuditAdjustment(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adjustment Type</label>
          <select value={adjustmentType} onChange={(e) => setAdjustmentType(e.target.value as 'income' | 'deduction' | 'credit' | 'penalty')} className="w-full border rounded p-2">
            <option value="income">Income Underreported</option>
            <option value="deduction">Deduction Disallowed</option>
            <option value="credit">Credit Denied</option>
            <option value="penalty">Penalty Proposed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">IRS Position Strength</label>
          <select value={irsPosition} onChange={(e) => setIrsPosition(e.target.value as 'strong' | 'moderate' | 'weak')} className="w-full border rounded p-2">
            <option value="strong">Strong - Clear IRS basis</option>
            <option value="moderate">Moderate - Debatable</option>
            <option value="weak">Weak - Questionable</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Documentation Strength</label>
          <select value={documentationStrength} onChange={(e) => setDocumentationStrength(e.target.value as 'strong' | 'moderate' | 'weak' | 'none')} className="w-full border rounded p-2">
            <option value="strong">Strong - Complete records</option>
            <option value="moderate">Moderate - Some records</option>
            <option value="weak">Weak - Limited records</option>
            <option value="none">None - No documentation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Audit Stage</label>
          <select value={auditStage} onChange={(e) => setAuditStage(e.target.value as 'examination' | '30_day_letter' | '90_day_letter' | 'appeals')} className="w-full border rounded p-2">
            <option value="examination">Examination (In Progress)</option>
            <option value="30_day_letter">30-Day Letter Received</option>
            <option value="90_day_letter">90-Day Letter/SNOD</option>
            <option value="appeals">Appeals Office</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Proposed</label>
          <input type="number" value={penaltyProposed} onChange={(e) => setPenaltyProposed(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Defense Context</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={professionalRepresentation} onChange={(e) => setProfessionalRepresentation(e.target.checked)} className="mr-2" />
              <span className="text-sm">Professional Representation</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={reasonableCause} onChange={(e) => setReasonableCause(e.target.checked)} className="mr-2" />
              <span className="text-sm">Reasonable Cause for Penalty</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={firstTimePenalty} onChange={(e) => setFirstTimePenalty(e.target.checked)} className="mr-2" />
              <span className="text-sm">First-Time Penalty Issue</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.likelihoodPercent) >= 50 ? 'bg-green-50 border border-green-200' : Number(result.likelihoodPercent) >= 30 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Success Likelihood</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Adjustment:</span><span className="font-bold ml-2">$ {result.auditAdjustment}</span></div>
          <div><span className="text-zinc-600">Stage:</span><span className="font-bold ml-2">{result.auditStage}</span></div>
          <div><span className="text-zinc-600">Success Rate:</span><span className={`font-bold ml-2 ${Number(result.likelihoodPercent) >= 50 ? 'text-green-700' : Number(result.likelihoodPercent) >= 30 ? 'text-orange-700' : 'text-red-700'}`}>{result.likelihoodPercent}%</span></div>
          <div><span className="text-zinc-600">Cost Estimate:</span><span className="font-bold ml-2">$ {result.totalCostEstimate}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${Number(result.likelihoodPercent) >= 50 ? 'text-green-700' : Number(result.likelihoodPercent) >= 30 ? 'text-orange-700' : 'text-red-700'}`}>{result.successLikelihood}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Defense Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Stage</th>
                <th className="py-2 text-left">Strategy</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Deadline</th>
                <th className="py-2 text-left">Success</th>
              </tr>
            </thead>
            <tbody>
              {result.defenseOptions.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.stage}</td>
                  <td className="py-1">{d.strategy}</td>
                  <td className="py-1">{d.action}</td>
                  <td className="py-1">{d.deadline}</td>
                  <td className="py-1">{d.successRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Potential Outcomes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Outcome</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">Likelihood</th>
                <th className="py-2 text-left">Financial Impact</th>
              </tr>
            </thead>
            <tbody>
              {result.potentialOutcomes.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.outcome}</td>
                  <td className="py-1">{p.description}</td>
                  <td className="py-1">{p.likelihood}</td>
                  <td className="py-1">$ {p.financialImpact.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${auditStage === '90_day_letter' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Audit Defense Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Respond timely to all notices</li>
          <li>30-day letter: Appeals deadline</li>
          <li>90-day letter: Tax Court deadline</li>
          <li>Documentation is critical</li>
          <li>Manager conference before Appeals</li>
          <li>Appeals: informal process</li>
          <li>Tax Court: formal litigation</li>
          <li>Professional help for complex cases</li>
          <li>FTA for first-time penalties</li>
          <li>Reasonable cause argument</li>
        </ul>
      </div>
    </div>
  )
}