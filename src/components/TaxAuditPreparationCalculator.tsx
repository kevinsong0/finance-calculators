'use client'

import { useState } from 'react'

export default function TaxAuditPreparationCalculator() {
  const [auditType, setAuditType] = useState<'correspondence' | 'office' | 'field'>('correspondence')
  const [taxYear, setTaxYear] = useState(2022)
  const [auditFocus, setAuditFocus] = useState<'income' | 'deductions' | 'credits' | 'business' | 'foreign'>('income')
  const [incomeSources, setIncomeSources] = useState(5)
  const [businessIncome, setBusinessIncome] = useState(false)
  const [documentationComplete, setDocumentationComplete] = useState(70)
  const [professionalRepresentation, setProfessionalRepresentation] = useState(false)
  const [priorAuditExperience, setPriorAuditExperience] = useState(false)
  const [monthsToPrepare, setMonthsToPrepare] = useState(2)

  const calculate = () => {
    // Tax Audit Preparation Calculator
    // Calculate preparation timeline, documentation needs, and defense strategy

    // Preparation timeline
    const preparationTasks: { task: string; priority: string; timeframe: string; status: string }[] = []

    // Phase 1: Initial Response (30 days)
    preparationTasks.push({
      task: 'Respond to audit notice',
      priority: 'Critical',
      timeframe: 'Within 30 days',
      status: 'Required',
    })
    preparationTasks.push({
      task: 'Organize tax return documents',
      priority: 'High',
      timeframe: 'Week 1',
      status: 'Essential',
    })
    preparationTasks.push({
      task: 'Gather income documentation (W-2s, 1099s)',
      priority: 'Critical',
      timeframe: 'Week 1-2',
      status: 'Essential',
    })

    // Phase 2: Documentation Collection
    if (auditFocus === 'deductions') {
      preparationTasks.push({
        task: 'Compile deduction receipts',
        priority: 'Critical',
        timeframe: 'Week 2-3',
        status: 'Essential',
      })
      preparationTasks.push({
        task: 'Document charitable donations',
        priority: 'High',
        timeframe: 'Week 2',
        status: 'Required',
      })
      preparationTasks.push({
        task: 'Verify medical expense records',
        priority: 'High',
        timeframe: 'Week 2-3',
        status: 'Required',
      })
    }

    if (auditFocus === 'business') {
      preparationTasks.push({
        task: 'Prepare business financial statements',
        priority: 'Critical',
        timeframe: 'Week 2-4',
        status: 'Essential',
      })
      preparationTasks.push({
        task: 'Document business expenses',
        priority: 'Critical',
        timeframe: 'Week 2-4',
        status: 'Essential',
      })
      preparationTasks.push({
        task: 'Verify business bank statements',
        priority: 'High',
        timeframe: 'Week 3',
        status: 'Required',
      })
      preparationTasks.push({
        task: 'Prepare mileage logs',
        priority: 'High',
        timeframe: 'Week 3',
        status: 'Required',
      })
    }

    if (auditFocus === 'credits') {
      preparationTasks.push({
        task: 'Verify credit eligibility',
        priority: 'Critical',
        timeframe: 'Week 2',
        status: 'Essential',
      })
      preparationTasks.push({
        task: 'Document qualifying expenses',
        priority: 'Critical',
        timeframe: 'Week 2-3',
        status: 'Required',
      })
    }

    if (auditFocus === 'foreign') {
      preparationTasks.push({
        task: 'Compile FBAR documentation',
        priority: 'Critical',
        timeframe: 'Week 1-2',
        status: 'Essential',
      })
      preparationTasks.push({
        task: 'Document foreign account balances',
        priority: 'Critical',
        timeframe: 'Week 2',
        status: 'Required',
      })
      preparationTasks.push({
        task: 'Prepare FATCA forms',
        priority: 'High',
        timeframe: 'Week 2-3',
        status: 'Required',
      })
    }

    // Phase 3: Professional Help
    if (!professionalRepresentation) {
      preparationTasks.push({
        task: 'Consider tax professional consultation',
        priority: 'High',
        timeframe: 'Week 1',
        status: 'Recommended',
      })
    } else {
      preparationTasks.push({
        task: 'Provide documents to representative',
        priority: 'Critical',
        timeframe: 'Week 1-2',
        status: 'Required',
      })
      preparationTasks.push({
        task: 'Sign Form 2848 (Power of Attorney)',
        priority: 'Critical',
        timeframe: 'Week 1',
        status: 'Required',
      })
    }

    // Phase 4: Audit Meeting Preparation
    if (auditType === 'office' || auditType === 'field') {
      preparationTasks.push({
        task: 'Prepare written explanations',
        priority: 'High',
        timeframe: 'Week before meeting',
        status: 'Essential',
      })
      preparationTasks.push({
        task: 'Create document summary',
        priority: 'High',
        timeframe: 'Week before meeting',
        status: 'Recommended',
      })
      preparationTasks.push({
        task: 'Review IRS audit techniques',
        priority: 'Moderate',
        timeframe: 'Before meeting',
        status: 'Recommended',
      })
    }

    // Risk assessment
    let riskLevel = ''
    let riskColor = ''
    const docScore = documentationComplete

    if (docScore < 50) {
      riskLevel = 'HIGH - Documentation incomplete. Significant risk of adjustments. Gather documents urgently.'
      riskColor = 'red'
    } else if (docScore < 70) {
      riskLevel = 'MODERATE - Some documentation gaps. Risk of partial adjustments. Improve documentation.'
      riskColor = 'orange'
    } else if (docScore < 90) {
      riskLevel = 'LOW - Good documentation. Minor risk. Continue organizing records.'
      riskColor = 'yellow'
    } else {
      riskLevel = 'MINIMAL - Excellent documentation. Low risk. Maintain records.'
      riskColor = 'green'
    }

    if (businessIncome && docScore < 80) {
      riskLevel += ' Business income audits are thorough. Documentation critical.'
    }

    if (!professionalRepresentation && auditType !== 'correspondence') {
      riskLevel += ' Consider professional representation for in-person audits.'
    }

    // Estimated audit outcomes
    const outcomeScenarios: { scenario: string; probability: string; outcome: string; action: string }[] = []

    outcomeScenarios.push({
      scenario: 'No Change',
      probability: docScore >= 90 ? 'High' : docScore >= 70 ? 'Moderate' : 'Low',
      outcome: 'No adjustments, audit closed',
      action: 'Respond promptly with complete documentation',
    })

    outcomeScenarios.push({
      scenario: 'Minor Adjustment',
      probability: docScore >= 70 ? 'Moderate' : docScore >= 50 ? 'High' : 'Moderate',
      outcome: 'Small tax change, possible penalties',
      action: 'Accept or appeal if documentation supports position',
    })

    outcomeScenarios.push({
      scenario: 'Significant Adjustment',
      probability: docScore < 50 ? 'High' : docScore < 70 ? 'Moderate' : 'Low',
      outcome: 'Large tax change, penalties likely',
      action: 'Appeal if grounds exist, negotiate settlement',
    })

    outcomeScenarios.push({
      scenario: 'Full Disallowance',
      probability: docScore < 40 ? 'Moderate' : 'Low',
      outcome: 'Item fully denied, penalties and interest',
      action: 'Appeal to IRS Appeals Office',
    })

    // Preparation score
    const preparationScore = Math.min(100, documentationComplete + (professionalRepresentation ? 15 : 0) + (priorAuditExperience ? 10 : 0) + (monthsToPrepare >= 2 ? 10 : monthsToPrepare >= 1 ? 5 : 0))

    // Recommendation
    let recommendation = ''
    if (preparationScore >= 85) {
      recommendation = `Excellent preparation position. Documentation strong (${docScore}%). ${professionalRepresentation ? 'Professional representation engaged.' : ''} Respond confidently with organized records. Maintain thorough documentation.`
    } else if (preparationScore >= 70) {
      recommendation = `Good preparation. Documentation at ${docScore}%. ${monthsToPrepare < 2 ? 'Request additional time if needed.' : ''} Focus on documenting disputed items. ${!professionalRepresentation && auditType !== 'correspondence' ? 'Consider professional representation.' : ''}`
    } else if (preparationScore >= 50) {
      recommendation = `Moderate preparation needed. Documentation at ${docScore}% - improve urgently. ${businessIncome ? 'Business records critical.' : ''} Request extension if needed. ${!professionalRepresentation ? 'Professional representation recommended.' : ''}`
    } else {
      recommendation = `URGENT: Documentation severely lacking (${docScore}%). Immediate action required. Request audit extension. ${!professionalRepresentation ? 'Engage tax professional immediately.' : ''} Focus on gathering critical documents. Risk of significant adjustment high.`
    }

    return {
      auditType,
      taxYear,
      auditFocus,
      incomeSources: incomeSources.toFixed(0),
      businessIncome,
      documentationComplete: documentationComplete.toFixed(0),
      professionalRepresentation,
      priorAuditExperience,
      monthsToPrepare: monthsToPrepare.toFixed(0),
      preparationTasks,
      riskLevel,
      riskColor,
      outcomeScenarios,
      preparationScore: preparationScore.toFixed(0),
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Audit Preparation Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate preparation timeline and defense strategy for IRS audits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Audit Type</label>
          <select value={auditType} onChange={(e) => setAuditType(e.target.value as 'correspondence' | 'office' | 'field')} className="w-full border rounded p-2">
            <option value="correspondence">Correspondence Audit (Mail)</option>
            <option value="office">Office Audit (IRS Office)</option>
            <option value="field">Field Audit (At Your Location)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year Under Audit</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Audit Focus</label>
          <select value={auditFocus} onChange={(e) => setAuditFocus(e.target.value as 'income' | 'deductions' | 'credits' | 'business' | 'foreign')} className="w-full border rounded p-2">
            <option value="income">Income Verification</option>
            <option value="deductions">Deduction Claims</option>
            <option value="credits">Tax Credits</option>
            <option value="business">Business/Schedule C</option>
            <option value="foreign">Foreign Accounts/FBAR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income Sources</label>
          <input type="number" value={incomeSources} onChange={(e) => setIncomeSources(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documentation Complete (%)</label>
          <input type="number" value={documentationComplete} onChange={(e) => setDocumentationComplete(Number(e.target.value))} min="0" max="100" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Months to Prepare</label>
          <input type="number" value={monthsToPrepare} onChange={(e) => setMonthsToPrepare(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Audit Context</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={businessIncome} onChange={(e) => setBusinessIncome(e.target.checked)} className="mr-2" />
              <span className="text-sm">Has Business Income</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={professionalRepresentation} onChange={(e) => setProfessionalRepresentation(e.target.checked)} className="mr-2" />
              <span className="text-sm">Professional Representation</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={priorAuditExperience} onChange={(e) => setPriorAuditExperience(e.target.checked)} className="mr-2" />
              <span className="text-sm">Prior Audit Experience</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.riskColor === 'red' ? 'bg-red-50 border border-red-200' : result.riskColor === 'orange' ? 'bg-orange-50 border border-orange-200' : result.riskColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Audit Type:</span><span className="font-bold ml-2">{result.auditType}</span></div>
          <div><span className="text-zinc-600">Focus:</span><span className="font-bold ml-2">{result.auditFocus}</span></div>
          <div><span className="text-zinc-600">Prep Score:</span><span className={`font-bold ml-2 ${Number(result.preparationScore) < 50 ? 'text-red-700' : Number(result.preparationScore) < 70 ? 'text-orange-700' : ''}`}>{result.preparationScore}%</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.riskColor === 'red' ? 'text-red-700' : result.riskColor === 'orange' ? 'text-orange-700' : ''}`}>{result.riskLevel}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Preparation Tasks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Task</th>
                <th className="py-2 text-left">Priority</th>
                <th className="py-2 text-left">Timeframe</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.preparationTasks.map((t, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{t.task}</td>
                  <td className="py-1"><span className={t.priority === 'Critical' ? 'text-red-700' : t.priority === 'High' ? 'text-orange-700' : ''}>{t.priority}</span></td>
                  <td className="py-1">{t.timeframe}</td>
                  <td className="py-1">{t.status}</td>
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
                <th className="py-2 text-left">Scenario</th>
                <th className="py-2 text-left">Probability</th>
                <th className="py-2 text-left">Outcome</th>
                <th className="py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {result.outcomeScenarios.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.scenario}</td>
                  <td className="py-1">{s.probability}</td>
                  <td className="py-1">{s.outcome}</td>
                  <td className="py-1">{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.preparationScore) < 50 ? 'bg-red-50 border border-red-200' : Number(result.preparationScore) < 70 ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Audit Preparation Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Respond to notice within 30 days</li>
          <li>Organize all documentation</li>
          <li>Keep copies of everything</li>
          <li>Request extension if needed</li>
          <li>Consider professional help</li>
          <li>Prepare written explanations</li>
          <li>Be professional and cooperative</li>
          <li>Don't volunteer extra information</li>
          <li>Document all IRS contacts</li>
          <li>Appeal if you disagree</li>
        </ul>
      </div>
    </div>
  )
}