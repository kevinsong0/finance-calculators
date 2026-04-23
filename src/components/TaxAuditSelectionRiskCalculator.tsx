'use client'

import { useState } from 'react'

export default function TaxAuditSelectionRiskCalculator() {
  const [incomeLevel, setIncomeLevel] = useState(150000)
  const [incomeSourceType, setIncomeSourceType] = useState<'w2_only' | 'self_employed' | 'mixed' | 'investment'>('mixed')
  const [deductionProfile, setDeductionProfile] = useState<'standard' | 'moderate' | 'high' | 'unusual'>('moderate')
  const [previousAudits, setPreviousAudits] = useState(0)
  const [largeDeductions, setLargeDeductions] = useState(false)
  const [cashBusiness, setCashBusiness] = useState(false)
  const [foreignAccounts, setForeignAccounts] = useState(false)
  const [scheduleCIncome, setScheduleCIncome] = useState(50000)
  const [totalIncome, setTotalIncome] = useState(150000)

  const calculate = () => {
    // Tax Audit Selection Risk Calculator
    // Estimate relative audit risk based on return characteristics

    // IRS audit selection factors (DIF score components):
    // 1. Income level - higher income = higher audit rate
    // 2. Self-employment - Schedule C/C-EZ flagged
    // 3. Large deductions relative to income
    // 4. Cash businesses - IRS targets
    // 5. Previous audit history
    // 6. Foreign accounts (FBAR/FATCA)
    // 7. Unusual deduction patterns
    // 8. Home office deduction
    // 9. Large charitable donations
    // 10. Rental property losses

    // Base audit rates by income (approximate 2023):
    const auditRates: Record<string, number> = {
      'under25k': 0.4,
      '25k-50k': 0.5,
      '50k-100k': 0.6,
      '100k-200k': 0.8,
      '200k-500k': 1.5,
      '500k-1m': 2.5,
      '1m-5m': 4.0,
      'over5m': 8.0,
    }

    // Determine base rate by income
    let baseRate = 0.8 // Default for 100k-200k
    if (incomeLevel < 25000) baseRate = auditRates['under25k']
    else if (incomeLevel < 50000) baseRate = auditRates['25k-50k']
    else if (incomeLevel < 100000) baseRate = auditRates['50k-100k']
    else if (incomeLevel < 200000) baseRate = auditRates['100k-200k']
    else if (incomeLevel < 500000) baseRate = auditRates['200k-500k']
    else if (incomeLevel < 1000000) baseRate = auditRates['500k-1m']
    else if (incomeLevel < 5000000) baseRate = auditRates['1m-5m']
    else baseRate = auditRates['over5m']

    // Risk multipliers
    let riskMultiplier = 1.0
    const riskFactors: { factor: string; multiplier: number; reason: string }[] = []

    // Income source type
    if (incomeSourceType === 'self_employed') {
      riskMultiplier *= 2.5
      riskFactors.push({ factor: 'Self-Employment', multiplier: 2.5, reason: 'Schedule C flagged for examination' })
    } else if (incomeSourceType === 'mixed') {
      riskMultiplier *= 1.5
      riskFactors.push({ factor: 'Mixed Income Sources', multiplier: 1.5, reason: 'Complex return structure' })
    } else if (incomeSourceType === 'investment') {
      riskMultiplier *= 1.3
      riskFactors.push({ factor: 'Investment Income', multiplier: 1.3, reason: 'Capital gains scrutiny' })
    }

    // Deduction profile
    if (deductionProfile === 'high') {
      riskMultiplier *= 2.0
      riskFactors.push({ factor: 'High Deductions', multiplier: 2.0, reason: 'Deductions exceed norms for income' })
    } else if (deductionProfile === 'unusual') {
      riskMultiplier *= 3.0
      riskFactors.push({ factor: 'Unusual Deductions', multiplier: 3.0, reason: 'Non-standard deduction patterns' })
    }

    // Large deductions flag
    if (largeDeductions) {
      riskMultiplier *= 1.5
      riskFactors.push({ factor: 'Large Deductions', multiplier: 1.5, reason: 'Itemized deductions flagged' })
    }

    // Cash business
    if (cashBusiness) {
      riskMultiplier *= 3.0
      riskFactors.push({ factor: 'Cash Business', multiplier: 3.0, reason: 'IRS targets cash-intensive businesses' })
    }

    // Foreign accounts
    if (foreignAccounts) {
      riskMultiplier *= 2.0
      riskFactors.push({ factor: 'Foreign Accounts', multiplier: 2.0, reason: 'FBAR/FATCA compliance check' })
    }

    // Previous audits
    if (previousAudits > 0) {
      riskMultiplier *= 1.5 * previousAudits
      riskFactors.push({ factor: 'Previous Audit', multiplier: 1.5, reason: 'History of audit adjustments' })
    }

    // Schedule C ratio
    if (incomeSourceType === 'self_employed' || incomeSourceType === 'mixed') {
      const scheduleCRatio = scheduleCIncome / totalIncome
      if (scheduleCRatio > 0.5) {
        riskMultiplier *= 1.5
        riskFactors.push({ factor: 'High Schedule C Ratio', multiplier: 1.5, reason: `${(scheduleCRatio * 100).toFixed(0)}% income from self-employment` })
      }
    }

    // Calculate adjusted audit rate
    const adjustedRate = baseRate * riskMultiplier

    // Cap at reasonable maximum
    const cappedRate = Math.min(adjustedRate, 50)

    // Risk category
    let riskCategory = ''
    let riskColor = ''
    if (cappedRate < 1) {
      riskCategory = 'LOW'
      riskColor = 'green'
    } else if (cappedRate < 3) {
      riskCategory = 'MODERATE'
      riskColor = 'yellow'
    } else if (cappedRate < 10) {
      riskCategory = 'HIGH'
      riskColor = 'orange'
    } else {
      riskCategory = 'VERY HIGH'
      riskColor = 'red'
    }

    // Recommendation
    let recommendation = ''
    if (cappedRate < 1) {
      recommendation = `Low audit risk (${cappedRate.toFixed(1)}%). Return profile appears normal. Maintain good records. Standard filing practices adequate.`
    } else if (cappedRate < 3) {
      recommendation = `Moderate audit risk (${cappedRate.toFixed(1)}%). Some factors flagged. Keep detailed documentation. Consider professional review. Document all deductions thoroughly.`
    } else if (cappedRate < 10) {
      recommendation = `High audit risk (${cappedRate.toFixed(1)}%). Multiple risk factors present. Strong documentation essential. Professional tax preparation recommended. Respond promptly to any IRS notices.`
    } else {
      recommendation = `Very high audit risk (${cappedRate.toFixed(1)}%). Return profile significantly flagged. Consider tax professional review before filing. Maintain comprehensive records. Be prepared for examination.`
    }

    // Audit preparation checklist
    const preparationChecklist = [
      'Organize all income documentation',
      'Verify deduction calculations',
      'Keep receipts for 7 years',
      'Document business expenses',
      'Separate business/personal expenses',
      'Maintain mileage logs',
      'Save bank statements',
      'Review prior year returns',
      'Consider professional review',
      'File on time to avoid flags',
    ]

    return {
      incomeLevel: incomeLevel.toFixed(0),
      incomeSourceType,
      deductionProfile,
      previousAudits: previousAudits.toFixed(0),
      largeDeductions,
      cashBusiness,
      foreignAccounts,
      scheduleCIncome: scheduleCIncome.toFixed(0),
      totalIncome: totalIncome.toFixed(0),
      baseRate: baseRate.toFixed(2),
      riskMultiplier: riskMultiplier.toFixed(2),
      adjustedRate: cappedRate.toFixed(2),
      riskCategory,
      riskColor,
      riskFactors,
      recommendation,
      preparationChecklist,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Audit Selection Risk Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate relative audit risk based on return characteristics.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Income Level</label>
          <input type="number" value={incomeLevel} onChange={(e) => setIncomeLevel(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income Source Type</label>
          <select value={incomeSourceType} onChange={(e) => setIncomeSourceType(e.target.value as 'w2_only' | 'self_employed' | 'mixed' | 'investment')} className="w-full border rounded p-2">
            <option value="w2_only">W-2 Only (lowest risk)</option>
            <option value="self_employed">Self-Employment Only</option>
            <option value="mixed">Mixed Sources</option>
            <option value="investment">Investment Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deduction Profile</label>
          <select value={deductionProfile} onChange={(e) => setDeductionProfile(e.target.value as 'standard' | 'moderate' | 'high' | 'unusual')} className="w-full border rounded p-2">
            <option value="standard">Standard Deduction</option>
            <option value="moderate">Moderate Itemized</option>
            <option value="high">High Itemized</option>
            <option value="unusual">Unusual Deductions</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Previous Audits</label>
          <input type="number" value={previousAudits} onChange={(e) => setPreviousAudits(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Risk Flags</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={largeDeductions} onChange={(e) => setLargeDeductions(e.target.checked)} className="mr-2" />
              <span className="text-sm">Large Deductions Relative to Income</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={cashBusiness} onChange={(e) => setCashBusiness(e.target.checked)} className="mr-2" />
              <span className="text-sm">Cash-Intensive Business</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={foreignAccounts} onChange={(e) => setForeignAccounts(e.target.checked)} className="mr-2" />
              <span className="text-sm">Foreign Bank Accounts</span>
            </label>
          </div>
        </div>
        {(incomeSourceType === 'self_employed' || incomeSourceType === 'mixed') && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Schedule C Income</label>
              <input type="number" value={scheduleCIncome} onChange={(e) => setScheduleCIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Income</label>
              <input type="number" value={totalIncome} onChange={(e) => setTotalIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.riskColor === 'green' ? 'bg-green-50 border border-green-200' : result.riskColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : result.riskColor === 'orange' ? 'bg-orange-50 border border-orange-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Audit Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Base Rate:</span><span className="font-medium ml-2">{result.baseRate}%</span></div>
          <div><span className="text-zinc-600">Risk Multiplier:</span><span className="font-medium ml-2">{result.riskMultiplier}x</span></div>
          <div><span className="text-zinc-600">Adjusted Rate:</span><span className={`font-bold ml-2 ${result.riskColor === 'green' ? 'text-green-700' : result.riskColor === 'red' ? 'text-red-700' : ''}`}>{result.adjustedRate}%</span></div>
          <div><span className="text-zinc-600">Risk Category:</span><span className={`font-bold ml-2 ${result.riskColor === 'green' ? 'text-green-700' : result.riskColor === 'red' ? 'text-red-700' : ''}`}>{result.riskCategory}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Risk Factors Applied</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Factor</th>
                <th className="py-2 text-left">Multiplier</th>
                <th className="py-2 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {result.riskFactors.map((f) => (
                <tr key={f.factor} className="border-b">
                  <td className="py-1 font-semibold">{f.factor}</td>
                  <td className="py-1">{f.multiplier}x</td>
                  <td className="py-1">{f.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Audit Preparation Checklist</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.preparationChecklist.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className={`card mb-6 ${result.riskColor === 'green' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Audit Risk Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>DIF score determines selection</li>
          <li>Higher income = higher audit rate</li>
          <li>Self-employment flagged</li>
          <li>Cash businesses targeted</li>
          <li>Large deductions scrutinized</li>
          <li>Home office deduction flagged</li>
          <li>Foreign accounts reviewed</li>
          <li>Keep records 7 years</li>
          <li>Document all deductions</li>
          <li>Respond promptly to notices</li>
        </ul>
      </div>
    </div>
  )
}