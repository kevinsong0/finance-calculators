'use client'

import { useState } from 'react'

export default function TaxAuditRiskCalculator() {
  const [totalIncome, setTotalIncome] = useState(150000)
  const [totalDeductions, setTotalDeductions] = useState(45000)
  const [businessIncome, setBusinessIncome] = useState(0)
  const [homeOfficeDeduction, setHomeOfficeDeduction] = useState(false)
  const [largeCharitableDeduction, setLargeCharitableDeduction] = useState(0)
  const [unreportedIncome, setUnreportedIncome] = useState(false)
  const [priorAudit, setPriorAudit] = useState(false)
  const [complexReturn, setComplexReturn] = useState(false)
  const [foreignAccounts, setForeignAccounts] = useState(false)
  const [cryptocurrency, setCryptocurrency] = useState(false)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    const deductionRatio = totalDeductions / totalIncome
    let riskScore = 0

    if (totalIncome > 200000) riskScore += 2
    if (totalIncome > 500000) riskScore += 3
    if (totalIncome > 1000000) riskScore += 5

    if (deductionRatio > 0.3) riskScore += 1
    if (deductionRatio > 0.5) riskScore += 2
    if (deductionRatio > 0.7) riskScore += 3

    if (businessIncome > 0) riskScore += 1
    if (businessIncome > 50000) riskScore += 2
    if (businessIncome > totalIncome * 0.5) riskScore += 2

    if (homeOfficeDeduction) riskScore += 1
    if (largeCharitableDeduction > totalIncome * 0.1) riskScore += 2
    if (largeCharitableDeduction > totalIncome * 0.3) riskScore += 3
    if (unreportedIncome) riskScore += 5
    if (priorAudit) riskScore += 2
    if (complexReturn) riskScore += 1
    if (foreignAccounts) riskScore += 3
    if (cryptocurrency) riskScore += 2

    const maxScore = 30
    const riskPercentage = (riskScore / maxScore) * 100

    let riskLevel = 'Low'
    let riskColor = 'green'
    if (riskScore > 10) {
      riskLevel = 'Medium'
      riskColor = 'yellow'
    }
    if (riskScore > 20) {
      riskLevel = 'High'
      riskColor = 'orange'
    }
    if (riskScore > 25) {
      riskLevel = 'Very High'
      riskColor = 'red'
    }

    const estimatedAuditRate = riskScore <= 5 ? 0.3 : riskScore <= 10 ? 1 : riskScore <= 15 ? 3 : riskScore <= 20 ? 5 : riskScore <= 25 ? 8 : 10

    const recommendations: string[] = []
    if (deductionRatio > 0.3) recommendations.push('Keep detailed documentation for all deductions')
    if (businessIncome > 0) recommendations.push('Maintain separate business bank accounts and records')
    if (homeOfficeDeduction) recommendations.push('Document exclusive business use of home office')
    if (largeCharitableDeduction > 5000) recommendations.push('Keep receipts, acknowledgment letters, and appraisals')
    if (foreignAccounts) recommendations.push('File FBAR (FinCEN Form 114) and Form 8938')
    if (cryptocurrency) recommendations.push('Report all crypto transactions on Form 8949')
    if (unreportedIncome) recommendations.push('Report ALL income sources - IRS matches 1099s')

    return {
      totalIncome: totalIncome.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      deductionRatio: (deductionRatio * 100).toFixed(1),
      businessIncome: businessIncome.toFixed(2),
      largeCharitableDeduction: largeCharitableDeduction.toFixed(2),
      riskScore: riskScore.toFixed(0),
      maxScore: maxScore.toFixed(0),
      riskPercentage: riskPercentage.toFixed(1),
      riskLevel,
      riskColor,
      estimatedAuditRate: estimatedAuditRate.toFixed(1),
      recommendations,
      homeOfficeDeduction,
      unreportedIncome,
      priorAudit,
      complexReturn,
      foreignAccounts,
      cryptocurrency,
      filingStatus,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Audit Risk Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate your IRS audit risk based on income, deductions, and filing factors.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Income ($)</label>
          <input
            type="number"
            value={totalIncome}
            onChange={(e) => setTotalIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Deductions ($)</label>
          <input
            type="number"
            value={totalDeductions}
            onChange={(e) => setTotalDeductions(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business/Self-Employment Income ($)</label>
          <input
            type="number"
            value={businessIncome}
            onChange={(e) => setBusinessIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Large Charitable Deduction ($)</label>
          <input
            type="number"
            value={largeCharitableDeduction}
            onChange={(e) => setLargeCharitableDeduction(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={homeOfficeDeduction} onChange={(e) => setHomeOfficeDeduction(e.target.checked)} className="rounded" />
          <span className="text-xs">Home Office Deduction</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={priorAudit} onChange={(e) => setPriorAudit(e.target.checked)} className="rounded" />
          <span className="text-xs">Prior Audit History</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={complexReturn} onChange={(e) => setComplexReturn(e.target.checked)} className="rounded" />
          <span className="text-xs">Complex Return</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={foreignAccounts} onChange={(e) => setForeignAccounts(e.target.checked)} className="rounded" />
          <span className="text-xs">Foreign Bank Accounts</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={cryptocurrency} onChange={(e) => setCryptocurrency(e.target.checked)} className="rounded" />
          <span className="text-xs">Cryptocurrency Transactions</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={unreportedIncome} onChange={(e) => setUnreportedIncome(e.target.checked)} className="rounded" />
          <span className="text-xs">Unreported Income (Warning)</span>
        </label>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Return Profile</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Income:</span>
            <span className="font-medium ml-2">$ {result.totalIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Deductions:</span>
            <span className="font-medium ml-2">$ {result.totalDeductions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Deduction Ratio:</span>
            <span className="font-medium ml-2">{result.deductionRatio}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Business Income:</span>
            <span className="font-medium ml-2">$ {result.businessIncome}</span>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${
        result.riskColor === 'green' ? 'bg-green-50 border border-green-200' :
        result.riskColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
        result.riskColor === 'orange' ? 'bg-orange-50 border border-orange-200' :
        'bg-red-50 border border-red-200'
      }`}>
        <h2 className="text-lg font-semibold mb-3">Audit Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Risk Score:</span>
            <span className="font-bold ml-2">{result.riskScore} / {result.maxScore}</span>
          </div>
          <div>
            <span className="text-zinc-600">Risk Level:</span>
            <span className={`font-bold ml-2 ${
              result.riskColor === 'green' ? 'text-green-700' :
              result.riskColor === 'yellow' ? 'text-yellow-700' :
              result.riskColor === 'orange' ? 'text-orange-700' :
              'text-red-700'
            }`}>{result.riskLevel}</span>
          </div>
          <div>
            <span className="text-zinc-600">Est. Audit Rate:</span>
            <span className="font-medium ml-2">{result.estimatedAuditRate}%</span>
          </div>
        </div>
      </div>

      {result.recommendations.length > 0 && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
          <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
            {result.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Audit Risk Factors</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>High Income:</strong> Over $200K increases audit probability significantly</li>
          <li><strong>High Deduction Ratio:</strong> Deductions over 50% of income flagged</li>
          <li><strong>Business Income:</strong> Self-employment prone to audit</li>
          <li><strong>Home Office:</strong> Common audit trigger, document carefully</li>
          <li><strong>Large Charitable Deductions:</strong> Over 10% of income requires documentation</li>
          <li><strong>Unreported Income:</strong> IRS computer matches 1099s to returns</li>
          <li><strong>Foreign Accounts:</strong> FBAR/Form 8938 required</li>
          <li><strong>Cryptocurrency:</strong> IRS actively targeting crypto compliance</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Audit Prevention Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Report ALL income - IRS receives copies of all 1099s</li>
          <li>Keep receipts and documentation for all deductions</li>
          <li>File FBAR if foreign accounts exceed $10K</li>
          <li>Report cryptocurrency transactions on Form 8949</li>
          <li>Use tax professional for complex returns</li>
          <li>File on time, pay on time</li>
          <li>Respond promptly to IRS notices</li>
        </ul>
      </div>
    </div>
  )
}