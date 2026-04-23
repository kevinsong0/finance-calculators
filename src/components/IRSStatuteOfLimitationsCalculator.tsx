'use client'

import { useState } from 'react'

export default function IRSStatuteOfLimitationsCalculator() {
  const [returnFiledYear, setReturnFiledYear] = useState(2022)
  const [returnType, setReturnType] = useState<'1040' | '1040NR' | 'corporate' | 'fiduciary'>('1040')
  const [assessmentType, setAssessmentType] = useState<'normal' | 'no_return' | 'fraud' | 'substantial_omission'>('normal')
  const [currentYear, setCurrentYear] = useState(2024)
  const [incomeOmitted, setIncomeOmitted] = useState(0)
  const [totalIncome, setTotalIncome] = useState(100000)

  const calculate = () => {
    // IRS Statute of Limitations Calculator
    // Calculate expiration dates for IRS assessment and collection

    // Assessment statute (ASED):
    // - Normal: 3 years from filing
    // - No return filed: unlimited
    // - Substantial omission (&gt;25% income): 6 years
    // - Fraud: unlimited

    // Collection statute (CSED):
    // - 10 years from assessment
    // - Can be extended by certain events

    // Refund claim statute:
    // - 3 years from filing or 2 years from payment

    const filingYear = returnFiledYear
    const yearsSinceFiling = currentYear - filingYear

    // Calculate ASED (Assessment Statute Expiration Date)
    let assessmentYears = 3 // Default
    let assessmentReason = 'Normal 3-year statute'

    if (assessmentType === 'no_return') {
      assessmentYears = 999 // Unlimited
      assessmentReason = 'No return filed - unlimited assessment period'
    } else if (assessmentType === 'fraud') {
      assessmentYears = 999 // Unlimited
      assessmentReason = 'Fraud - unlimited assessment period'
    } else if (assessmentType === 'substantial_omission') {
      // Check if omission exceeds 25% of gross income
      const omissionPercentage = (incomeOmitted / totalIncome) * 100
      if (omissionPercentage > 25) {
        assessmentYears = 6
        assessmentReason = `Substantial omission (${omissionPercentage.toFixed(1)}% > 25%) - 6-year statute`
      } else {
        assessmentYears = 3
        assessmentReason = `Omission (${omissionPercentage.toFixed(1)}%) below 25% threshold - 3-year statute`
      }
    }

    // ASED date
    const assessmentDeadline = filingYear + assessmentYears
    const yearsUntilASED = assessmentDeadline - currentYear

    // CSED (Collection Statute Expiration Date)
    // 10 years from assessment date
    // Assuming assessment occurred in filing year + 1
    const assessmentYear = filingYear + 1
    const collectionDeadline = assessmentYear + 10
    const yearsUntilCSED = collectionDeadline - currentYear

    // Refund statute
    const refundDeadline = filingYear + 3
    const yearsUntilRefund = refundDeadline - currentYear

    // Status checks
    const assessmentOpen = yearsUntilASED > 0
    const collectionOpen = yearsUntilCSED > 0
    const refundClaimable = yearsUntilRefund > 0

    // Risk level
    let riskLevel = ''
    let riskColor = ''
    if (assessmentType === 'fraud' || assessmentType === 'no_return') {
      riskLevel = 'CRITICAL - Unlimited statute, IRS can assess anytime'
      riskColor = 'red'
    } else if (yearsUntilASED <= 0) {
      riskLevel = 'SAFE - Assessment statute expired'
      riskColor = 'green'
    } else if (yearsUntilASED <= 1) {
      riskLevel = 'HIGH - Assessment expires soon, IRS may act quickly'
      riskColor = 'orange'
    } else if (yearsUntilASED <= 2) {
      riskLevel = 'MODERATE - Assessment open for limited time'
      riskColor = 'yellow'
    } else {
      riskLevel = 'LOW - Assessment period continues normally'
      riskColor = 'blue'
    }

    // Recommendation
    let recommendation = ''
    if (assessmentType === 'no_return') {
      recommendation = `WARNING: No return filed. IRS has unlimited time to assess tax. File immediately to start statute clock. Potential penalties and interest continue accruing.`
    } else if (assessmentType === 'fraud') {
      recommendation = `WARNING: Fraud case. Unlimited assessment statute. IRS can pursue indefinitely. Consult criminal tax attorney immediately.`
    } else if (!assessmentOpen) {
      recommendation = `Assessment statute expired (${assessmentDeadline}). IRS cannot assess additional tax. Safe from audit for this return. Keep records for 7 years total.`
    } else if (!refundClaimable) {
      recommendation = `Refund statute expired (${refundDeadline}). Cannot claim refund for this year. Assessment statute still open (${assessmentDeadline}). Document any IRS contact.`
    } else {
      recommendation = `Return filed ${filingYear}. Assessment deadline: ${assessmentDeadline} (${yearsUntilASED} years). Collection deadline: ${collectionDeadline} (${yearsUntilCSED} years from assessment). Refund deadline: ${refundDeadline} (${yearsUntilRefund} years). ${riskLevel}`
    }

    // Statute comparison table
    const statuteTable = [
      { type: 'Assessment (ASED)', period: assessmentYears === 999 ? 'Unlimited' : `${assessmentYears} years`, deadline: assessmentYears === 999 ? 'Never' : assessmentDeadline, status: assessmentOpen ? 'Open' : 'Expired' },
      { type: 'Collection (CSED)', period: '10 years', deadline: collectionDeadline, status: collectionOpen ? 'Open' : 'Expired' },
      { type: 'Refund Claim', period: '3 years', deadline: refundDeadline, status: refundClaimable ? 'Claimable' : 'Expired' },
    ]

    return {
      returnFiledYear,
      returnType,
      assessmentType,
      currentYear,
      incomeOmitted: incomeOmitted.toFixed(0),
      totalIncome: totalIncome.toFixed(0),
      assessmentYears: assessmentYears === 999 ? 'Unlimited' : assessmentYears.toFixed(0),
      assessmentReason,
      assessmentDeadline: assessmentYears === 999 ? 'Never' : assessmentDeadline,
      yearsUntilASED: assessmentYears === 999 ? 'Unlimited' : yearsUntilASED.toFixed(0),
      assessmentOpen,
      collectionDeadline,
      yearsUntilCSED: yearsUntilCSED.toFixed(0),
      collectionOpen,
      refundDeadline,
      yearsUntilRefund: yearsUntilRefund.toFixed(0),
      refundClaimable,
      riskLevel,
      riskColor,
      recommendation,
      statuteTable,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Statute of Limitations Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRS assessment and collection statute expiration dates.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Return Filed Year</label>
          <input type="number" value={returnFiledYear} onChange={(e) => setReturnFiledYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Return Type</label>
          <select value={returnType} onChange={(e) => setReturnType(e.target.value as '1040' | '1040NR' | 'corporate' | 'fiduciary')} className="w-full border rounded p-2">
            <option value="1040">Form 1040 (Individual)</option>
            <option value="1040NR">Form 1040NR (Nonresident)</option>
            <option value="corporate">Corporate Return</option>
            <option value="fiduciary">Fiduciary Return</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assessment Type</label>
          <select value={assessmentType} onChange={(e) => setAssessmentType(e.target.value as 'normal' | 'no_return' | 'fraud' | 'substantial_omission')} className="w-full border rounded p-2">
            <option value="normal">Normal Return Filed</option>
            <option value="no_return">No Return Filed</option>
            <option value="fraud">Fraud</option>
            <option value="substantial_omission">Substantial Income Omission</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Year</label>
          <input type="number" value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        {assessmentType === 'substantial_omission' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Income Omitted</label>
              <input type="number" value={incomeOmitted} onChange={(e) => setIncomeOmitted(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Gross Income</label>
              <input type="number" value={totalIncome} onChange={(e) => setTotalIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          </>
        )}
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Statute of Limitations Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Statute Type</th>
                <th className="py-2 text-left">Period</th>
                <th className="py-2 text-left">Deadline Year</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.statuteTable.map((s) => (
                <tr key={s.type} className="border-b">
                  <td className="py-1 font-semibold">{s.type}</td>
                  <td className="py-1">{s.period}</td>
                  <td className="py-1">{s.deadline}</td>
                  <td className="py-1"><span className={s.status === 'Open' || s.status === 'Claimable' ? 'text-orange-700' : 'text-green-700'}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.riskColor === 'red' ? 'bg-red-50 border border-red-200' : result.riskColor === 'green' ? 'bg-green-50 border border-green-200' : result.riskColor === 'orange' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">ASED:</span><span className="font-bold ml-2">{result.assessmentDeadline}</span></div>
          <div><span className="text-zinc-600">Years Left:</span><span className={`font-bold ml-2 ${result.riskColor === 'red' ? 'text-red-700' : result.riskColor === 'green' ? 'text-green-700' : ''}`}>{result.yearsUntilASED}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.assessmentOpen ? 'text-orange-700' : 'text-green-700'}`}>{result.assessmentOpen ? 'Open' : 'Expired'}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.riskColor === 'red' ? 'text-red-700' : result.riskColor === 'green' ? 'text-green-700' : result.riskColor === 'orange' ? 'text-orange-700' : 'text-blue-700'}`}>{result.riskLevel}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Assessment Rule Applied</h2>
        <div className="text-sm text-zinc-600">{result.assessmentReason}</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Collection Statute (CSED)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Collection Deadline:</span><span className="font-bold ml-2">{result.collectionDeadline}</span></div>
          <div><span className="text-zinc-600">Years Until CSED:</span><span className={`font-bold ml-2 ${result.collectionOpen ? '' : 'text-green-700'}`}>{result.yearsUntilCSED}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">10 years from assessment date. Can be extended by offer in compromise, bankruptcy, etc.</div>
      </div>

      <div className={`card mb-6 ${result.riskColor === 'red' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Statute Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>ASED: 3 years from filing (normal)</li>
          <li>ASED: 6 years if omit &gt;25% income</li>
          <li>ASED: Unlimited if fraud or no return</li>
          <li>CSED: 10 years from assessment</li>
          <li>CSED can be extended</li>
          <li>Refund: 3 years from filing</li>
          <li>Keep records 7 years minimum</li>
          <li>File to start statute clock</li>
          <li>Extensions for OIC, bankruptcy</li>
          <li>IRS must assess before statute expires</li>
        </ul>
      </div>
    </div>
  )
}