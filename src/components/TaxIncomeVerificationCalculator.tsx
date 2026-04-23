'use client'

import { useState } from 'react'

export default function TaxIncomeVerificationCalculator() {
  const [incomeType, setIncomeType] = useState<'w2' | 'self_employed' | 'investment' | 'rental' | 'mixed'>('w2')
  const [totalIncome, setTotalIncome] = useState(60000)
  const [reportedIncome, setReportedIncome] = useState(58000)
  const [w2Income, setW2Income] = useState(50000)
  const [seIncome, setSeIncome] = useState(10000)
  const [investmentIncome, setInvestmentIncome] = useState(5000)
  const [rentalIncome, setRentalIncome] = useState(5000)
  const [auditYear, setAuditYear] = useState(2022)
  const [documentsAvailable, setDocumentsAvailable] = useState(70)
  const [bankStatementsComplete, setBankStatementsComplete] = useState(true)
  const [thirdPartyConfirmation, setThirdPartyConfirmation] = useState(true)
  const [cashTransactions, setCashTransactions] = useState(false)
  const [cashAmount, setCashAmount] = useState(0)
  const [underreported, setUnderreported] = useState(2000)

  const calculate = () => {
    // Tax Income Verification Calculator
    // Calculate IRS income verification methods and audit risk

    const discrepancy = totalIncome - reportedIncome
    const discrepancyPercent = (discrepancy / totalIncome) * 100

    // Income verification methods used by IRS
    const verificationMethods: { method: string; description: string; dataUsed: string; reliability: string }[] = []

    verificationMethods.push({
      method: 'Information Matching',
      description: 'Compare filed return to third-party reports',
      dataUsed: 'W-2s, 1099s, K-1s, bank deposits',
      reliability: 'High - automated matching',
    })

    verificationMethods.push({
      method: 'Bank Deposit Analysis',
      description: 'Analyze all bank deposits for unreported income',
      dataUsed: 'Bank statements, cancelled checks',
      reliability: 'High if complete records',
    })

    verificationMethods.push({
      method: 'Cash Flow Analysis',
      description: 'Compare income to lifestyle/expenses',
      dataUsed: 'Living expenses, asset purchases',
      reliability: 'Moderate - indirect method',
    })

    verificationMethods.push({
      method: 'Net Worth Method',
      description: 'Compare beginning/end net worth',
      dataUsed: 'Assets, liabilities year to year',
      reliability: 'High for substantial changes',
    })

    verificationMethods.push({
      method: 'Source and Use Analysis',
      description: 'Trace where money came from and went',
      dataUsed: 'All income sources and expenditures',
      reliability: 'Moderate',
    })

    verificationMethods.push({
      method: 'Specific Items Method',
      description: 'Examine specific transactions',
      dataUsed: 'Individual transactions',
      reliability: 'High for targeted items',
    })

    // Document requirements
    const documents: { document: string; purpose: string; required: boolean; status: string }[] = []

    if (incomeType === 'w2' || w2Income > 0) {
      documents.push({
        document: 'W-2 Forms',
        purpose: 'Verify employer income',
        required: true,
        status: 'Match IRS records',
      })
    }

    if (incomeType === 'self_employed' || seIncome > 0) {
      documents.push({
        document: 'Schedule C',
        purpose: 'Verify business income/expenses',
        required: true,
        status: documentsAvailable >= 80 ? 'Strong documentation' : 'Documentation gaps',
      })
      documents.push({
        document: 'Business Bank Statements',
        purpose: 'Verify business deposits',
        required: true,
        status: bankStatementsComplete ? 'Complete' : 'Incomplete',
      })
      documents.push({
        document: 'Invoices/Receipts',
        purpose: 'Verify business transactions',
        required: true,
        status: documentsAvailable >= 70 ? 'Adequate' : 'Missing items',
      })
    }

    if (investmentIncome > 0) {
      documents.push({
        document: '1099-B/DIV/INT',
        purpose: 'Verify investment income',
        required: true,
        status: 'Match IRS records',
      })
      documents.push({
        document: 'Brokerage Statements',
        purpose: 'Verify transactions',
        required: true,
        status: thirdPartyConfirmation ? 'Complete' : 'Partial',
      })
    }

    if (rentalIncome > 0) {
      documents.push({
        document: 'Schedule E',
        purpose: 'Verify rental income',
        required: true,
        status: documentsAvailable >= 60 ? 'Adequate' : 'Documentation needed',
      })
      documents.push({
        document: 'Lease Agreements',
        purpose: 'Verify rental terms',
        required: true,
        status: 'Required',
      })
    }

    documents.push({
      document: 'Bank Statements',
      purpose: 'Verify deposits and transactions',
      required: true,
      status: bankStatementsComplete ? 'Complete' : 'Missing months',
    })

    // Risk analysis
    const riskFactors: { factor: string; present: boolean; severity: string; explanation: string }[] = []

    riskFactors.push({
      factor: 'Income Discrepancy',
      present: discrepancy > 0,
      severity: discrepancyPercent > 10 ? 'High' : discrepancyPercent > 5 ? 'Moderate' : discrepancyPercent > 0 ? 'Low' : 'None',
      explanation: discrepancy > 0 ? `${discrepancyPercent.toFixed(1)}% discrepancy: $${discrepancy.toFixed(0)} unreported` : 'No discrepancy detected',
    })

    riskFactors.push({
      factor: 'Third-Party Reporting Gap',
      present: !thirdPartyConfirmation,
      severity: !thirdPartyConfirmation ? 'High' : 'None',
      explanation: thirdPartyConfirmation ? 'Third-party reports match' : 'Missing 1099s or W-2 discrepancies',
    })

    riskFactors.push({
      factor: 'Cash Transactions',
      present: cashTransactions,
      severity: cashTransactions && cashAmount > 5000 ? 'High' : cashTransactions ? 'Moderate' : 'None',
      explanation: cashTransactions ? `Cash transactions: $${cashAmount.toFixed(0)} - hard to verify` : 'No cash transactions',
    })

    riskFactors.push({
      factor: 'Documentation Incomplete',
      present: documentsAvailable < 80,
      severity: documentsAvailable < 50 ? 'High' : documentsAvailable < 70 ? 'Moderate' : documentsAvailable < 80 ? 'Low' : 'None',
      explanation: `Documentation: ${documentsAvailable}% complete`,
    })

    riskFactors.push({
      factor: 'Self-Employment',
      present: seIncome > 0,
      severity: seIncome > 0 && documentsAvailable < 70 ? 'Moderate' : 'Low',
      explanation: seIncome > 0 ? 'Self-employment requires detailed records' : 'W-2 income easily verified',
    })

    // Calculate verification likelihood
    let verificationScore = 100

    if (discrepancyPercent > 10) verificationScore -= 40
    else if (discrepancyPercent > 5) verificationScore -= 20
    else if (discrepancyPercent > 0) verificationScore -= 10

    if (!thirdPartyConfirmation) verificationScore -= 30

    if (cashTransactions && cashAmount > 5000) verificationScore -= 25
    else if (cashTransactions) verificationScore -= 15

    if (documentsAvailable < 50) verificationScore -= 30
    else if (documentsAvailable < 70) verificationScore -= 15
    else if (documentsAvailable < 80) verificationScore -= 5

    // Verification outcome scenarios
    const outcomes: { outcome: string; likelihood: string; result: string; action: string }[] = []

    outcomes.push({
      outcome: 'Full Verification',
      likelihood: verificationScore >= 90 ? 'High' : verificationScore >= 70 ? 'Moderate' : 'Low',
      result: 'Income verified as reported',
      action: documentsAvailable >= 80 ? 'Maintain good records' : 'Improve documentation',
    })

    outcomes.push({
      outcome: 'Partial Adjustment',
      likelihood: discrepancyPercent > 5 && verificationScore < 80 ? 'Moderate' : 'Low',
      result: 'Some income adjusted',
      action: discrepancyPercent > 5 ? 'Prepare explanations for gaps' : 'Monitor discrepancies',
    })

    outcomes.push({
      outcome: 'Full Adjustment',
      likelihood: discrepancyPercent > 10 || !thirdPartyConfirmation ? 'High' : discrepancyPercent > 5 ? 'Moderate' : 'Low',
      result: `Full $${underreported.toFixed(0)} adjustment proposed`,
      action: 'Document all income sources',
    })

    outcomes.push({
      outcome: 'Fraud Investigation',
      likelihood: discrepancyPercent > 25 && cashTransactions ? 'Possible' : 'Unlikely',
      result: 'Willful underreporting investigation',
      action: 'Consult attorney immediately',
    })

    // Recommendation
    let recommendation = ''

    if (verificationScore >= 90) {
      recommendation = `Excellent verification position. Income discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation: ${documentsAvailable}%. Third-party confirmation: ${thirdPartyConfirmation ? 'Yes' : 'No'}. Income easily verified. Maintain complete records. Respond promptly to any IRS inquiries.`
    } else if (verificationScore >= 70) {
      recommendation = `Good verification position with minor gaps. Discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation: ${documentsAvailable}%. ${!bankStatementsComplete ? 'Bank statements incomplete - gather all months. ' : ''}Prepare explanations for any gaps. Consider preemptive response if discrepancy >5%.`
    } else if (verificationScore >= 50) {
      recommendation = `Moderate verification risk. Discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation gaps: ${documentsAvailable}% complete. ${cashTransactions ? 'Cash transactions increase verification difficulty. ' : ''}Gather missing documents urgently. Prepare written explanations. Consider professional assistance.`
    } else {
      recommendation = `High verification risk. Discrepancy: $${discrepancy.toFixed(0)} (${discrepancyPercent.toFixed(1)}%). Documentation severely lacking: ${documentsAvailable}%. ${!thirdPartyConfirmation ? 'Third-party gaps detected. ' : ''}${cashTransactions ? `Cash: $${cashAmount.toFixed(0)} unverified. ` : ''}Immediate action: gather all documents, prepare explanations, consult professional. Audit likely if discrepancy >10%.`
    }

    return {
      incomeType,
      totalIncome: totalIncome.toFixed(0),
      reportedIncome: reportedIncome.toFixed(0),
      discrepancy: discrepancy.toFixed(0),
      discrepancyPercent: discrepancyPercent.toFixed(1),
      w2Income: w2Income.toFixed(0),
      seIncome: seIncome.toFixed(0),
      investmentIncome: investmentIncome.toFixed(0),
      rentalIncome: rentalIncome.toFixed(0),
      auditYear,
      documentsAvailable,
      bankStatementsComplete,
      thirdPartyConfirmation,
      cashTransactions,
      cashAmount: cashAmount.toFixed(0),
      underreported: underreported.toFixed(0),
      verificationMethods,
      documents,
      riskFactors,
      verificationScore,
      outcomes,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Income Verification Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRS income verification methods, documentation needs, and audit risk assessment.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Primary Income Type</label>
          <select value={incomeType} onChange={(e) => setIncomeType(e.target.value as 'w2' | 'self_employed' | 'investment' | 'rental' | 'mixed')} className="w-full border rounded p-2">
            <option value="w2">W-2 Employment</option>
            <option value="self_employed">Self-Employment</option>
            <option value="investment">Investment Income</option>
            <option value="rental">Rental Income</option>
            <option value="mixed">Mixed Sources</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={auditYear} onChange={(e) => setAuditYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Actual Total Income</label>
          <input type="number" value={totalIncome} onChange={(e) => setTotalIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reported Income</label>
          <input type="number" value={reportedIncome} onChange={(e) => setReportedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">W-2 Income</label>
          <input type="number" value={w2Income} onChange={(e) => setW2Income(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Self-Employment Income</label>
          <input type="number" value={seIncome} onChange={(e) => setSeIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Income</label>
          <input type="number" value={investmentIncome} onChange={(e) => setInvestmentIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rental Income</label>
          <input type="number" value={rentalIncome} onChange={(e) => setRentalIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Documentation Complete (%)</label>
            <input type="number" value={documentsAvailable} onChange={(e) => setDocumentsAvailable(Number(e.target.value))} min="0" max="100" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={bankStatementsComplete} onChange={(e) => setBankStatementsComplete(e.target.checked)} className="mr-2" />
              <span className="text-sm">Bank Statements Complete</span>
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
              <input type="checkbox" checked={cashTransactions} onChange={(e) => setCashTransactions(e.target.checked)} className="mr-2" />
              <span className="text-sm">Cash Transactions</span>
            </label>
          </div>
          {cashTransactions && (
            <div>
              <label className="block text-sm font-medium mb-1">Cash Amount</label>
              <input type="number" value={cashAmount} onChange={(e) => setCashAmount(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Underreported Amount</label>
            <input type="number" value={underreported} onChange={(e) => setUnderreported(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.verificationScore >= 90 ? 'bg-green-50 border border-green-200' : result.verificationScore >= 70 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Verification Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Income:</span><span className="font-bold ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Reported:</span><span className="font-bold ml-2">$ {result.reportedIncome}</span></div>
          <div><span className="text-zinc-600">Discrepancy:</span><span className={`font-bold ml-2 ${Number(result.discrepancy) > 0 ? 'text-red-700' : ''}`}>$ {result.discrepancy}</span></div>
          <div><span className="text-zinc-600">Discrepancy %:</span><span className={`font-bold ml-2 ${Number(result.discrepancyPercent) > 5 ? 'text-red-700' : Number(result.discrepancyPercent) > 0 ? 'text-orange-700' : ''}`}>{result.discrepancyPercent}%</span></div>
          <div><span className="text-zinc-600">Verification Score:</span><span className={`font-bold ml-2 ${result.verificationScore >= 90 ? 'text-green-700' : result.verificationScore >= 70 ? 'text-orange-700' : 'text-red-700'}`}>{result.verificationScore}/100</span></div>
          <div><span className="text-zinc-600">Documentation:</span><span className="font-bold ml-2">{result.documentsAvailable}%</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.verificationScore >= 90 ? 'text-green-700' : result.verificationScore >= 70 ? 'text-orange-700' : 'text-red-700'}`}>
          {result.verificationScore >= 90 ? 'Income easily verified' : result.verificationScore >= 70 ? 'Minor verification concerns' : 'Significant verification risk'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRS Verification Methods</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Method</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {result.verificationMethods.map((v, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{v.method}</td>
                  <td className="py-1">{v.description}</td>
                  <td className="py-1">{v.reliability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Required Documents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Document</th>
                <th className="py-2 text-left">Purpose</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.documents.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.document}</td>
                  <td className="py-1">{d.purpose}</td>
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
        <h2 className="text-lg font-semibold mb-3">Verification Outcomes</h2>
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
        <h3 className="font-medium mb-2 text-red-700">Income Verification Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IRS matches W-2s and 1099s automatically</li>
          <li>Bank deposit analysis finds unreported income</li>
          <li>Discrepancy &gt;10% triggers audit flag</li>
          <li>Cash transactions harder to verify</li>
          <li>Self-employment requires detailed records</li>
          <li>Keep all income documentation</li>
          <li>Third-party reports must match return</li>
          <li>Respond promptly to IRS notices</li>
          <li>Prepare explanations for any gaps</li>
          <li>Professional help for complex cases</li>
        </ul>
      </div>
    </div>
  )
}