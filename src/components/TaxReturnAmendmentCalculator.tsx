'use client'

import { useState } from 'react'

export default function TaxReturnAmendmentCalculator() {
  const [originalTax, setOriginalTax] = useState(25000)
  const [correctedTax, setCorrectedTax] = useState(28000)
  const [originalRefund, setOriginalRefund] = useState(0)
  const [correctedRefund, setCorrectedRefund] = useState(0)
  const [originalYear, setOriginalYear] = useState(2022)
  const [amendmentYear, setAmendmentYear] = useState(2024)
  const [amendmentReason, setAmendmentReason] = useState<'underreported' | 'overreported' | 'missing_income' | 'wrong_deduction'>('underreported')
  const [interestRate, setInterestRate] = useState(8)

  const calculate = () => {
    // Tax Return Amendment Calculator
    // Calculate tax impact and penalties for amended returns

    // Amendment rules:
    // - File Form 1040-X within 3 years of original filing
    // - Additional tax owed: pay with amendment (interest applies)
    // - Refund claim: must file within 3 years
    // - Interest runs from original due date to payment date

    // Calculate tax difference
    const taxDifference = correctedTax - originalTax
    const refundDifference = originalRefund - correctedRefund
    const additionalTaxOwed = Math.max(0, taxDifference + refundDifference)
    const additionalRefund = Math.max(0, -taxDifference - refundDifference)

    // Calculate years since original filing
    const yearsSinceFiling = amendmentYear - originalYear

    // Interest calculation
    // Interest accrues from original due date (April 15 of original year + 1)
    const originalDueDate = originalYear + 1 // April 15
    const monthsInterest = (amendmentYear - originalDueDate) * 12
    const interestAmount = additionalTaxOwed * (interestRate / 100) * (monthsInterest / 12)

    // Total amount due with amendment
    const totalDue = additionalTaxOwed + interestAmount

    // Penalty considerations
    // Accuracy-related penalty: 20% of underpayment if substantial understatement
    const accuracyPenaltyThreshold = 5000 // Simplified
    const accuracyPenalty = additionalTaxOwed > accuracyPenaltyThreshold ? additionalTaxOwed * 0.2 : 0

    // Failure to file penalty (if late)
    // 5% per month, max 25%
    const lateFilingPenalty = 0 // Assuming timely amendment

    // Total penalties
    const totalPenalties = accuracyPenalty + lateFilingPenalty

    // Grand total
    const grandTotal = totalDue + totalPenalties

    // Amendment deadline
    const amendmentDeadline = originalYear + 3 // 3 years from original filing
    const daysUntilDeadline = (amendmentDeadline - amendmentYear) * 365

    // Reason-specific impacts
    let reasonImpact = ''
    if (amendmentReason === 'underreported') {
      reasonImpact = 'Underreported income - pay additional tax plus interest. May face accuracy penalty if substantial ($5,000+).'
    } else if (amendmentReason === 'overreported') {
      reasonImpact = 'Overreported income - claim refund. Must file within 3-year deadline. No penalty risk.'
    } else if (amendmentReason === 'missing_income') {
      reasonImpact = 'Missing income source - additional tax owed. Document source carefully. Interest from original due date.'
    } else if (amendmentReason === 'wrong_deduction') {
      reasonImpact = 'Wrong deduction claimed - adjust tax liability. Verify eligibility before amending.'
    }

    // Recommendation
    let recommendation = ''
    if (additionalTaxOwed > 0) {
      recommendation = `Amendment required. Additional tax: $${additionalTaxOwed.toFixed(0)}. Interest (${interestRate}%): $${interestAmount.toFixed(0)}. Total due: $${totalDue.toFixed(0)}. Potential accuracy penalty: $${accuracyPenalty.toFixed(0)}. File Form 1040-X immediately. Pay to stop interest accrual.`
      if (accuracyPenalty > 0) {
        recommendation += ` Accuracy penalty likely due to substantial understatement ($${additionalTaxOwed.toFixed(0)} > $${accuracyPenaltyThreshold}). Consider reasonable cause argument.`
      }
    } else if (additionalRefund > 0) {
      recommendation = `Amendment results in refund. Additional refund: $${additionalRefund.toFixed(0)}. File Form 1040-X within 3-year deadline (${amendmentDeadline}). No interest or penalties. Refund typically processed in 8-12 weeks.`
    } else {
      recommendation = `No change in tax liability. Amendment not necessary. Original filing accurate.`
    }

    if (yearsSinceFiling > 3) {
      recommendation = `WARNING: ${yearsSinceFiling} years since filing exceeds 3-year amendment deadline. Cannot claim refund. If tax owed, IRS may still assess. Consult tax professional immediately.`
    }

    // Amendment timeline
    const timeline = [
      { step: 'Identify Error', action: 'Review original return', timeframe: 'Immediate' },
      { step: 'Gather Documents', action: 'Collect supporting evidence', timeframe: '1-2 weeks' },
      { step: 'Complete 1040-X', action: 'Fill amendment form', timeframe: '1 week' },
      { step: 'Calculate Payment', action: 'Determine amount due', timeframe: 'Same day' },
      { step: 'File Amendment', action: 'Submit to IRS', timeframe: 'Within deadline' },
    ]

    return {
      originalTax: originalTax.toFixed(0),
      correctedTax: correctedTax.toFixed(0),
      originalRefund: originalRefund.toFixed(0),
      correctedRefund: correctedRefund.toFixed(0),
      originalYear,
      amendmentYear,
      amendmentReason,
      interestRate: interestRate.toFixed(0),
      taxDifference: taxDifference.toFixed(0),
      additionalTaxOwed: additionalTaxOwed.toFixed(0),
      additionalRefund: additionalRefund.toFixed(0),
      monthsInterest: monthsInterest.toFixed(0),
      interestAmount: interestAmount.toFixed(0),
      accuracyPenaltyThreshold: accuracyPenaltyThreshold.toFixed(0),
      accuracyPenalty: accuracyPenalty.toFixed(0),
      totalDue: totalDue.toFixed(0),
      totalPenalties: totalPenalties.toFixed(0),
      grandTotal: grandTotal.toFixed(0),
      amendmentDeadline,
      yearsSinceFiling: yearsSinceFiling.toFixed(0),
      daysUntilDeadline: daysUntilDeadline.toFixed(0),
      reasonImpact,
      recommendation,
      timeline,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Return Amendment Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax impact, interest, and penalties for filing Form 1040-X.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Original Tax Liability</label>
          <input type="number" value={originalTax} onChange={(e) => setOriginalTax(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corrected Tax Liability</label>
          <input type="number" value={correctedTax} onChange={(e) => setCorrectedTax(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Refund Received</label>
          <input type="number" value={originalRefund} onChange={(e) => setOriginalRefund(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corrected Refund Amount</label>
          <input type="number" value={correctedRefund} onChange={(e) => setCorrectedRefund(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Tax Year</label>
          <input type="number" value={originalYear} onChange={(e) => setOriginalYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amendment Year</label>
          <input type="number" value={amendmentYear} onChange={(e) => setAmendmentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amendment Reason</label>
          <select value={amendmentReason} onChange={(e) => setAmendmentReason(e.target.value as 'underreported' | 'overreported' | 'missing_income' | 'wrong_deduction')} className="w-full border rounded p-2">
            <option value="underreported">Underreported Income</option>
            <option value="overreported">Overreported Income</option>
            <option value="missing_income">Missing Income Source</option>
            <option value="wrong_deduction">Wrong Deduction Claimed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Amendment Timeline</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Step</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Timeframe</th>
              </tr>
            </thead>
            <tbody>
              {result.timeline.map((t) => (
                <tr key={t.step} className="border-b">
                  <td className="py-1 font-semibold">{t.step}</td>
                  <td className="py-1">{t.action}</td>
                  <td className="py-1">{t.timeframe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.additionalTaxOwed) > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Tax Change Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original Tax:</span><span className="font-medium ml-2">$ {result.originalTax}</span></div>
          <div><span className="text-zinc-600">Corrected Tax:</span><span className="font-medium ml-2">$ {result.correctedTax}</span></div>
          <div><span className="text-zinc-600">Tax Difference:</span><span className={`font-bold ml-2 ${Number(result.taxDifference) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.taxDifference}</span></div>
          <div><span className="text-zinc-600">Additional Tax Owed:</span><span className={`font-bold ml-2 ${Number(result.additionalTaxOwed) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.additionalTaxOwed}</span></div>
          <div><span className="text-zinc-600">Additional Refund:</span><span className={`font-bold ml-2 ${Number(result.additionalRefund) > 0 ? 'text-green-700' : ''}`}>$ {result.additionalRefund}</span></div>
        </div>
      </div>

      {Number(result.additionalTaxOwed) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Interest & Penalties</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Months Interest:</span><span className="font-medium ml-2">{result.monthsInterest}</span></div>
            <div><span className="text-zinc-600">Interest Rate:</span><span className="font-medium ml-2">{result.interestRate}%</span></div>
            <div><span className="text-zinc-600">Interest Amount:</span><span className="font-bold text-red-700 ml-2">$ {result.interestAmount}</span></div>
            <div><span className="text-zinc-600">Accuracy Penalty:</span><span className={`font-bold ml-2 ${Number(result.accuracyPenalty) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.accuracyPenalty}</span></div>
            <div><span className="text-zinc-600">Total Due:</span><span className="font-bold text-red-700 ml-2">$ {result.totalDue}</span></div>
            <div><span className="text-zinc-600">Grand Total:</span><span className="font-bold text-red-700 ml-2">$ {result.grandTotal}</span></div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Amendment Deadline</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Years Since Filing:</span><span className="font-medium ml-2">{result.yearsSinceFiling}</span></div>
          <div><span className="text-zinc-600">3-Year Deadline:</span><span className={`font-bold ml-2 ${Number(result.yearsSinceFiling) > 3 ? 'text-red-700' : 'text-green-700'}`}>{result.amendmentDeadline}</span></div>
        </div>
        {Number(result.yearsSinceFiling) > 3 && <div className="text-xs text-red-700 mt-2">Deadline exceeded - refund claims barred</div>}
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Reason Impact</h2>
        <div className="text-sm text-zinc-600">{result.reasonImpact}</div>
      </div>

      <div className={`card mb-6 ${Number(result.grandTotal) > Number(result.additionalTaxOwed) ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Amendment Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>File Form 1040-X within 3 years</li>
          <li>Interest accrues from original due date</li>
          <li>Pay immediately to stop interest</li>
          <li>Accuracy penalty: 20% for substantial understatement</li>
          <li>Reasonable cause may waive penalty</li>
          <li>Refund claims: 8-12 weeks processing</li>
          <li>Attach supporting documents</li>
          <li>Cannot e-file Form 1040-X</li>
          <li>Mail to correct IRS address</li>
          <li>Track amendment status online</li>
        </ul>
      </div>
    </div>
  )
}