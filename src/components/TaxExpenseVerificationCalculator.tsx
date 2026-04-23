'use client'

import { useState } from 'react'

export default function TaxExpenseVerificationCalculator() {
  const [expenseType, setExpenseType] = useState<'deduction' | 'business' | 'rental' | 'charitable' | 'medical'>('deduction')
  const [claimedAmount, setClaimedAmount] = useState(10000)
  const [documentedAmount, setDocumentedAmount] = useState(9000)
  const [auditYear, setAuditYear] = useState(2022)
  const [documentsAvailable, setDocumentsAvailable] = useState(80)
  const [receiptsComplete, setReceiptsComplete] = useState(true)
  const [bankStatementsMatch, setBankStatementsMatch] = useState(true)
  const [thirdPartyConfirmation, setThirdPartyConfirmation] = useState(false)
  const [reasonableBasis, setReasonableBasis] = useState(true)
  const [writtenRecords, setWrittenRecords] = useState(true)
  const [contemporaneous, setContemporaneous] = useState(false)
  const [cashPayments, setCashPayments] = useState(0)

  const calculate = () => {
    // Tax Expense Verification Calculator
    // Calculate expense verification requirements and audit risk

    const discrepancy = claimedAmount - documentedAmount
    const discrepancyPercent = (discrepancy / claimedAmount) * 100

    // Verification requirements by expense type
    const requirements: { requirement: string; needed: boolean; met: boolean; notes: string }[] = []

    // General requirements
    requirements.push({
      requirement: 'Receipts/Invoices',
      needed: true,
      met: receiptsComplete,
      notes: receiptsComplete ? 'Complete receipts available' : 'Missing receipts - major risk',
    })

    requirements.push({
      requirement: 'Bank Statement Evidence',
      needed: true,
      met: bankStatementsMatch,
      notes: bankStatementsMatch ? 'Bank statements corroborate expenses' : 'Bank statements don\'t match claimed',
    })

    requirements.push({
      requirement: 'Written Records',
      needed: expenseType === 'business' || expenseType === 'rental',
      met: writtenRecords,
      notes: expenseType === 'business' || expenseType === 'rental' ? writtenRecords ? 'Books/records maintained' : 'Written records required' : 'Not required for personal deductions',
    })

    requirements.push({
      requirement: 'Contemporaneous Records',
      needed: expenseType === 'business' && claimedAmount > 5000,
      met: contemporaneous,
      notes: expenseType === 'business' && claimedAmount > 5000 ? contemporaneous ? 'Records made at time of expense' : 'Contemporaneous records strongly preferred' : 'Not required',
    })

    requirements.push({
      requirement: 'Third-Party Confirmation',
      needed: expenseType === 'charitable' && claimedAmount > 500,
      met: thirdPartyConfirmation,
      notes: expenseType === 'charitable' && claimedAmount > 500 ? thirdPartyConfirmation ? 'Charity acknowledgment letter obtained' : 'Required for donations >$500' : 'Not required',
    })

    requirements.push({
      requirement: 'Reasonable Basis',
      needed: true,
      met: reasonableBasis,
      notes: reasonableBasis ? 'Expense has reasonable basis' : 'No reasonable basis for expense',
    })

    // Documentation analysis
    const documentation: { doc: string; importance: string; status: string; action: string }[] = []

    if (expenseType === 'deduction') {
      documentation.push({
        doc: 'Receipts',
        importance: 'Critical',
        status: receiptsComplete ? 'Complete' : 'Incomplete',
        action: receiptsComplete ? 'Maintain in organized file' : 'Obtain missing receipts',
      })
      documentation.push({
        doc: 'Canceled Checks',
        importance: 'High',
        status: bankStatementsMatch ? 'Available' : 'Missing',
        action: bankStatementsMatch ? 'Verify payment evidence' : 'Obtain check copies',
      })
    }

    if (expenseType === 'business') {
      documentation.push({
        doc: 'Business Records',
        importance: 'Critical',
        status: writtenRecords ? 'Maintained' : 'Missing',
        action: writtenRecords ? 'Ensure books reconciled' : 'Create written records',
      })
      documentation.push({
        doc: 'Invoices/Bills',
        importance: 'Critical',
        status: receiptsComplete ? 'Complete' : 'Incomplete',
        action: receiptsComplete ? 'Match to ledger entries' : 'Collect vendor invoices',
      })
      documentation.push({
        doc: 'Expense Log',
        importance: 'High',
        status: contemporaneous ? 'Contemporaneous' : 'Reconstructed',
        action: contemporaneous ? 'Good practice' : 'Create contemporaneous log',
      })
    }

    if (expenseType === 'rental') {
      documentation.push({
        doc: 'Lease Agreements',
        importance: 'Critical',
        status: 'Required',
        action: 'Maintain all lease copies',
      })
      documentation.push({
        doc: 'Property Records',
        importance: 'High',
        status: writtenRecords ? 'Complete' : 'Incomplete',
        action: writtenRecords ? 'Reconcile to Schedule E' : 'Create property ledger',
      })
      documentation.push({
        doc: 'Receipts for Repairs',
        importance: 'High',
        status: receiptsComplete ? 'Available' : 'Missing',
        action: receiptsComplete ? 'Document repair purpose' : 'Obtain receipts',
      })
    }

    if (expenseType === 'charitable') {
      documentation.push({
        doc: 'Charity Acknowledgment',
        importance: 'Critical',
        status: thirdPartyConfirmation ? 'Obtained' : 'Missing',
        action: thirdPartyConfirmation ? 'Keep with return' : 'Request from charity',
      })
      documentation.push({
        doc: 'Donation Receipts',
        importance: 'High',
        status: receiptsComplete ? 'Complete' : 'Incomplete',
        action: receiptsComplete ? 'Document donation date/value' : 'Obtain acknowledgment',
      })
      documentation.push({
        doc: 'Appraisal (if >$5000)',
        importance: 'Critical if applicable',
        status: 'Required for non-cash >$5000',
        action: 'Qualified appraisal needed',
      })
    }

    if (expenseType === 'medical') {
      documentation.push({
        doc: 'Medical Bills',
        importance: 'Critical',
        status: receiptsComplete ? 'Complete' : 'Incomplete',
        action: receiptsComplete ? 'Verify amounts' : 'Obtain from providers',
      })
      documentation.push({
        doc: 'Insurance Statements',
        importance: 'High',
        status: 'Shows unreimbursed amounts',
        action: 'Document out-of-pocket',
      })
      documentation.push({
        doc: 'Prescription Records',
        importance: 'Moderate',
        status: 'Pharmacy receipts',
        action: 'Collect pharmacy records',
      })
    }

    // Risk factors
    const riskFactors: { factor: string; severity: string; present: boolean; explanation: string }[] = []

    riskFactors.push({
      factor: 'Documentation Gap',
      severity: discrepancyPercent > 10 ? 'High' : discrepancyPercent > 5 ? 'Moderate' : discrepancyPercent > 0 ? 'Low' : 'None',
      present: discrepancy > 0,
      explanation: discrepancy > 0 ? `$${discrepancy.toFixed(0)} gap (${discrepancyPercent.toFixed(1)}%)` : 'No documentation gap',
    })

    riskFactors.push({
      factor: 'Missing Receipts',
      severity: !receiptsComplete ? 'High' : 'None',
      present: !receiptsComplete,
      explanation: receiptsComplete ? 'Receipts complete' : 'Missing receipts - major verification issue',
    })

    riskFactors.push({
      factor: 'Bank Statement Mismatch',
      severity: !bankStatementsMatch ? 'High' : 'None',
      present: !bankStatementsMatch,
      explanation: bankStatementsMatch ? 'Bank evidence matches' : 'Claimed amounts exceed bank evidence',
    })

    riskFactors.push({
      factor: 'Cash Payments',
      severity: cashPayments > 0 && cashPayments > 1000 ? 'High' : cashPayments > 0 ? 'Moderate' : 'None',
      present: cashPayments > 0,
      explanation: cashPayments > 0 ? `Cash payments: $${cashPayments.toFixed(0)} - harder to verify` : 'No cash payments',
    })

    riskFactors.push({
      factor: 'Reconstructed Records',
      severity: !contemporaneous && expenseType === 'business' ? 'Moderate' : 'None',
      present: expenseType === 'business' && !contemporaneous,
      explanation: contemporaneous ? 'Records contemporaneous' : 'Reconstructed records less reliable',
    })

    riskFactors.push({
      factor: 'High Amount Relative to Income',
      severity: claimedAmount > 10000 ? 'Moderate' : 'Low',
      present: claimedAmount > 10000,
      explanation: claimedAmount > 10000 ? 'Large expense attracts attention' : 'Normal expense amount',
    })

    // Calculate verification score
    let verificationScore = 100

    if (discrepancyPercent > 10) verificationScore -= 30
    else if (discrepancyPercent > 5) verificationScore -= 20
    else if (discrepancyPercent > 0) verificationScore -= 10

    if (!receiptsComplete) verificationScore -= 35
    if (!bankStatementsMatch) verificationScore -= 25
    if (!writtenRecords && (expenseType === 'business' || expenseType === 'rental')) verificationScore -= 20
    if (!thirdPartyConfirmation && expenseType === 'charitable' && claimedAmount > 500) verificationScore -= 30
    if (!reasonableBasis) verificationScore -= 40
    if (cashPayments > 1000) verificationScore -= 15

    // Audit scenarios
    const outcomes: { outcome: string; likelihood: string; result: string; action: string }[] = []

    outcomes.push({
      outcome: 'Full Allowance',
      likelihood: verificationScore >= 90 ? 'High' : verificationScore >= 70 ? 'Moderate' : 'Low',
      result: 'Expense fully allowed as claimed',
      action: verificationScore >= 80 ? 'Maintain documentation' : 'Improve documentation quality',
    })

    outcomes.push({
      outcome: 'Partial Allowance',
      likelihood: discrepancy > 0 && verificationScore >= 60 ? 'Moderate' : 'Low',
      result: `Allowed: $${documentedAmount.toFixed(0)}, Disallowed: $${discrepancy.toFixed(0)}`,
      action: 'Document all claimed amounts',
    })

    outcomes.push({
      outcome: 'Full Disallowance',
      likelihood: verificationScore < 50 ? 'High' : verificationScore < 70 ? 'Moderate' : 'Low',
      result: 'Expense completely denied',
      action: verificationScore < 60 ? 'Urgent: gather documentation' : 'Prepare verification evidence',
    })

    outcomes.push({
      outcome: 'Negligence Penalty',
      likelihood: !reasonableBasis && verificationScore < 40 ? 'Possible' : 'Unlikely',
      result: '20% accuracy-related penalty added',
      action: !reasonableBasis ? 'Document reasonable basis' : 'Maintain good records',
    })

    // Recommendation
    let recommendation = ''

    if (verificationScore >= 90) {
      recommendation = `Excellent verification position. Expense: $${claimedAmount.toFixed(0)}. Documentation: ${documentsAvailable}% complete. ${receiptsComplete ? 'Receipts complete. ' : ''}${bankStatementsMatch ? 'Bank evidence matches. ' : ''}Expense well documented. Maintain organized records. Respond promptly to any IRS inquiries.`
    } else if (verificationScore >= 70) {
      recommendation = `Good verification position with minor gaps. Discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation: ${documentsAvailable}%. ${!receiptsComplete ? 'Missing receipts - obtain copies. ' : ''}${cashPayments > 0 ? `Cash: $${cashPayments.toFixed(0)} - get alternative evidence. ` : ''}Prepare explanations for gaps. Consider preemptive documentation improvements.`
    } else if (verificationScore >= 50) {
      recommendation = `Moderate verification risk. Discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation gaps significant. ${!receiptsComplete ? 'CRITICAL: Obtain missing receipts. ' : ''}${!bankStatementsMatch ? 'Bank evidence mismatch - reconcile. ' : ''}${expenseType === 'business' && !writtenRecords ? 'Business records needed. ' : ''}Gather documentation urgently. Prepare written explanations. Professional assistance recommended.`
    } else {
      recommendation = `High verification risk. Discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation severely lacking. ${!reasonableBasis ? 'No reasonable basis - penalty risk. ' : ''}Immediate action required. Obtain all possible documentation. Create written explanations for gaps. Consult professional before audit. Full disallowance likely without better evidence.`
    }

    return {
      expenseType,
      claimedAmount: claimedAmount.toFixed(0),
      documentedAmount: documentedAmount.toFixed(0),
      discrepancy: discrepancy.toFixed(0),
      discrepancyPercent: discrepancyPercent.toFixed(1),
      auditYear,
      documentsAvailable,
      receiptsComplete,
      bankStatementsMatch,
      thirdPartyConfirmation,
      reasonableBasis,
      writtenRecords,
      contemporaneous,
      cashPayments: cashPayments.toFixed(0),
      requirements,
      documentation,
      riskFactors,
      verificationScore,
      outcomes,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Expense Verification Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate expense verification requirements, documentation needs, and audit risk for tax deductions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Expense Type</label>
          <select value={expenseType} onChange={(e) => setExpenseType(e.target.value as 'deduction' | 'business' | 'rental' | 'charitable' | 'medical')} className="w-full border rounded p-2">
            <option value="deduction">Itemized Deduction</option>
            <option value="business">Business Expense</option>
            <option value="rental">Rental Expense</option>
            <option value="charitable">Charitable Donation</option>
            <option value="medical">Medical Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={auditYear} onChange={(e) => setAuditYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Claimed Amount</label>
          <input type="number" value={claimedAmount} onChange={(e) => setClaimedAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documented Amount</label>
          <input type="number" value={documentedAmount} onChange={(e) => setDocumentedAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documentation Complete (%)</label>
          <input type="number" value={documentsAvailable} onChange={(e) => setDocumentsAvailable(Number(e.target.value))} min="0" max="100" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cash Payments Amount</label>
          <input type="number" value={cashPayments} onChange={(e) => setCashPayments(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={receiptsComplete} onChange={(e) => setReceiptsComplete(e.target.checked)} className="mr-2" />
              <span className="text-sm">Receipts Complete</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={bankStatementsMatch} onChange={(e) => setBankStatementsMatch(e.target.checked)} className="mr-2" />
              <span className="text-sm">Bank Statements Match</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={thirdPartyConfirmation} onChange={(e) => setThirdPartyConfirmation(e.target.checked)} className="mr-2" />
              <span className="text-sm">Third-Party Confirmation</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={reasonableBasis} onChange={(e) => setReasonableBasis(e.target.checked)} className="mr-2" />
              <span className="text-sm">Reasonable Basis</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={writtenRecords} onChange={(e) => setWrittenRecords(e.target.checked)} className="mr-2" />
              <span className="text-sm">Written Records</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={contemporaneous} onChange={(e) => setContemporaneous(e.target.checked)} className="mr-2" />
              <span className="text-sm">Contemporaneous Records</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.verificationScore >= 90 ? 'bg-green-50 border border-green-200' : result.verificationScore >= 70 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Verification Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Claimed:</span><span className="font-bold ml-2">$ {result.claimedAmount}</span></div>
          <div><span className="text-zinc-600">Documented:</span><span className="font-bold ml-2">$ {result.documentedAmount}</span></div>
          <div><span className="text-zinc-600">Discrepancy:</span><span className={`font-bold ml-2 ${Number(result.discrepancy) > 0 ? 'text-red-700' : ''}`}>$ {result.discrepancy}</span></div>
          <div><span className="text-zinc-600">Gap %:</span><span className={`font-bold ml-2 ${Number(result.discrepancyPercent) > 5 ? 'text-red-700' : Number(result.discrepancyPercent) > 0 ? 'text-orange-700' : ''}`}>{result.discrepancyPercent}%</span></div>
          <div><span className="text-zinc-600">Verification Score:</span><span className={`font-bold ml-2 ${result.verificationScore >= 90 ? 'text-green-700' : result.verificationScore >= 70 ? 'text-orange-700' : 'text-red-700'}`}>{result.verificationScore}/100</span></div>
          <div><span className="text-zinc-600">Documentation:</span><span className="font-bold ml-2">{result.documentsAvailable}%</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.verificationScore >= 90 ? 'text-green-700' : result.verificationScore >= 70 ? 'text-orange-700' : 'text-red-700'}`}>
          {result.verificationScore >= 90 ? 'Expense well documented' : result.verificationScore >= 70 ? 'Minor documentation gaps' : 'Significant verification risk'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Verification Requirements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Requirement</th>
                <th className="py-2 text-left">Needed</th>
                <th className="py-2 text-left">Met</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.requirements.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.requirement}</td>
                  <td className="py-1">{r.needed ? 'Yes' : 'Optional'}</td>
                  <td className="py-1"><span className={r.met ? 'text-green-700' : 'text-red-700'}>{r.met ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{r.notes}</td>
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
                <th className="py-2 text-left">Document</th>
                <th className="py-2 text-left">Importance</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.documentation.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.doc}</td>
                  <td className="py-1">{d.importance}</td>
                  <td className="py-1">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Risk Factors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Factor</th>
                <th className="py-2 text-left">Present</th>
                <th className="py-2 text-left">Severity</th>
                <th className="py-2 text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {result.riskFactors.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.factor}</td>
                  <td className="py-1">{r.present ? 'Yes' : 'No'}</td>
                  <td className="py-1"><span className={r.severity === 'High' ? 'text-red-700' : r.severity === 'Moderate' ? 'text-orange-700' : ''}>{r.severity}</span></td>
                  <td className="py-1">{r.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Audit Outcomes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Outcome</th>
                <th className="py-2 text-left">Likelihood</th>
                <th className="py-2 text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              {result.outcomes.map((o, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{o.outcome}</td>
                  <td className="py-1">{o.likelihood}</td>
                  <td className="py-1">{o.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.verificationScore >= 90 ? 'bg-green-50 border border-green-200' : result.verificationScore >= 70 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Expense Verification Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Receipts required for most expenses</li>
          <li>Bank statements corroborate payments</li>
          <li>Business expenses need written records</li>
          <li>Contemporaneous records preferred</li>
          <li>Charitable &gt;$500 needs acknowledgment</li>
          <li>Cash payments harder to verify</li>
          <li>Documented &lt; claimed = audit risk</li>
          <li>Keep organized expense files</li>
          <li>Maintain records for 7 years</li>
          <li>Respond promptly to IRS notices</li>
        </ul>
      </div>
    </div>
  )
}