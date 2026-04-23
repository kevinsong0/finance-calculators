'use client'

import { useState } from 'react'

export default function TaxUnderpaymentPenaltyCalculator() {
  const [totalTax, setTotalTax] = useState(50000)
  const [w2Withholding, setW2Withholding] = useState(20000)
  const [q1Payment, setQ1Payment] = useState(5000)
  const [q2Payment, setQ2Payment] = useState(5000)
  const [q3Payment, setQ3Payment] = useState(5000)
  const [q4Payment, setQ4Payment] = useState(5000)
  const [priorYearTax, setPriorYearTax] = useState(45000)
  const [agi, setAGI] = useState(200000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    const totalWithholding = w2Withholding
    const totalEstimatedPayments = q1Payment + q2Payment + q3Payment + q4Payment
    const totalPayments = totalWithholding + totalEstimatedPayments
    const underpayment = totalTax - totalPayments

    const safeHarbor100 = priorYearTax
    const safeHarbor110 = priorYearTax * 1.1
    const applicableSafeHarbor = agi > 150000 ? safeHarbor110 : safeHarbor100
    const metSafeHarbor = totalPayments >= applicableSafeHarbor

    const requiredAnnual = totalTax
    const quarterlyRequired = requiredAnnual / 4
    const q1Required = quarterlyRequired
    const q2Required = quarterlyRequired
    const q3Required = quarterlyRequired
    const q4Required = quarterlyRequired

    const q1Paid = w2Withholding / 4 + q1Payment
    const q2Paid = w2Withholding / 4 + q2Payment
    const q3Paid = w2Withholding / 4 + q3Payment
    const q4Paid = w2Withholding / 4 + q4Payment

    const q1Underpayment = Math.max(0, q1Required - q1Paid)
    const q2Underpayment = Math.max(0, q2Required - q2Paid)
    const q3Underpayment = Math.max(0, q3Required - q3Paid)
    const q4Underpayment = Math.max(0, q4Required - q4Paid)

    const q1DueDate = 'April 15'
    const q2DueDate = 'June 15'
    const q3DueDate = 'September 15'
    const q4DueDate = 'January 15'

    const penaltyRate = 0.08
    const q1Penalty = q1Underpayment * penaltyRate * 0.25
    const q2Penalty = q2Underpayment * penaltyRate * 0.25
    const q3Penalty = q3Underpayment * penaltyRate * 0.25
    const q4Penalty = q4Underpayment * penaltyRate * 0.25
    const totalPenalty = q1Penalty + q2Penalty + q3Penalty + q4Penalty

    const annualizedIncomeMethod = false
    const form2210Required = underpayment > 1000 && !metSafeHarbor

    return {
      totalTax: totalTax.toFixed(2),
      totalWithholding: totalWithholding.toFixed(2),
      totalEstimatedPayments: totalEstimatedPayments.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      underpayment: underpayment.toFixed(2),
      safeHarbor100: safeHarbor100.toFixed(2),
      safeHarbor110: safeHarbor110.toFixed(2),
      applicableSafeHarbor: applicableSafeHarbor.toFixed(2),
      metSafeHarbor,
      agiOver150K: agi > 150000,
      quarterlyRequired: quarterlyRequired.toFixed(2),
      q1Paid: q1Paid.toFixed(2),
      q2Paid: q2Paid.toFixed(2),
      q3Paid: q3Paid.toFixed(2),
      q4Paid: q4Paid.toFixed(2),
      q1Underpayment: q1Underpayment.toFixed(2),
      q2Underpayment: q2Underpayment.toFixed(2),
      q3Underpayment: q3Underpayment.toFixed(2),
      q4Underpayment: q4Underpayment.toFixed(2),
      q1DueDate,
      q2DueDate,
      q3DueDate,
      q4DueDate,
      penaltyRate: (penaltyRate * 100).toFixed(1),
      q1Penalty: q1Penalty.toFixed(2),
      q2Penalty: q2Penalty.toFixed(2),
      q3Penalty: q3Penalty.toFixed(2),
      q4Penalty: q4Penalty.toFixed(2),
      totalPenalty: totalPenalty.toFixed(2),
      form2210Required,
      hasPenalty: totalPenalty > 0,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Underpayment Penalty Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRS underpayment penalty (Form 2210) for insufficient estimated payments.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Liability ($)</label>
          <input
            type="number"
            value={totalTax}
            onChange={(e) => setTotalTax(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">W-2 Withholding ($)</label>
          <input
            type="number"
            value={w2Withholding}
            onChange={(e) => setW2Withholding(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Q1 Estimated Payment (April 15) ($)</label>
          <input
            type="number"
            value={q1Payment}
            onChange={(e) => setQ1Payment(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Q2 Estimated Payment (June 15) ($)</label>
          <input
            type="number"
            value={q2Payment}
            onChange={(e) => setQ2Payment(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Q3 Estimated Payment (Sept 15) ($)</label>
          <input
            type="number"
            value={q3Payment}
            onChange={(e) => setQ3Payment(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Q4 Estimated Payment (Jan 15) ($)</label>
          <input
            type="number"
            value={q4Payment}
            onChange={(e) => setQ4Payment(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Tax ($)</label>
          <input
            type="number"
            value={priorYearTax}
            onChange={(e) => setPriorYearTax(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">AGI ($)</label>
          <input
            type="number"
            value={agi}
            onChange={(e) => setAGI(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-medium ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">W-2 Withholding:</span>
            <span className="font-medium ml-2">$ {result.totalWithholding}</span>
          </div>
          <div>
            <span className="text-zinc-600">Estimated Payments:</span>
            <span className="font-medium ml-2">$ {result.totalEstimatedPayments}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Payments:</span>
            <span className="font-medium ml-2">$ {result.totalPayments}</span>
          </div>
          <div>
            <span className="text-zinc-600">Underpayment:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.underpayment}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Safe Harbor Check</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Prior Year Tax:</span>
            <span className="font-medium ml-2">$ {result.safeHarbor100}</span>
          </div>
          <div>
            <span className="text-zinc-600">Safe Harbor (100%):</span>
            <span className="font-medium ml-2">$ {result.safeHarbor100}</span>
          </div>
          <div>
            <span className="text-zinc-600">Safe Harbor (110%):</span>
            <span className="font-medium ml-2">$ {result.safeHarbor110}</span>
          </div>
          <div>
            <span className="text-zinc-600">Your Safe Harbor:</span>
            <span className="font-bold ml-2">$ {result.applicableSafeHarbor}</span>
            <span className="text-xs ml-1">{result.agiOver150K ? '(110% rule)' : '(100% rule)'}</span>
          </div>
          <div>
            <span className="text-zinc-600">Safe Harbor Met:</span>
            <span className={`font-bold ml-2 ${result.metSafeHarbor ? 'text-green-600' : 'text-red-600'}`}>
              {result.metSafeHarbor ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-3">
          If AGI exceeds $150K, safe harbor is 110% of prior year tax. Otherwise, 100% of prior year tax avoids penalty.
        </div>
      </div>

      {result.hasPenalty && !result.metSafeHarbor && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Quarterly Underpayment Penalty</h2>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Quarter</th>
                  <th className="text-right py-1">Required</th>
                  <th className="text-right py-1">Paid</th>
                  <th className="text-right py-1">Shortfall</th>
                  <th className="text-right py-1">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-red-100">
                  <td className="py-1">Q1 ({result.q1DueDate})</td>
                  <td className="text-right">$ {result.quarterlyRequired}</td>
                  <td className="text-right">$ {result.q1Paid}</td>
                  <td className="text-right">$ {result.q1Underpayment}</td>
                  <td className="text-right font-medium">$ {result.q1Penalty}</td>
                </tr>
                <tr className="border-b border-red-100">
                  <td className="py-1">Q2 ({result.q2DueDate})</td>
                  <td className="text-right">$ {result.quarterlyRequired}</td>
                  <td className="text-right">$ {result.q2Paid}</td>
                  <td className="text-right">$ {result.q2Underpayment}</td>
                  <td className="text-right font-medium">$ {result.q2Penalty}</td>
                </tr>
                <tr className="border-b border-red-100">
                  <td className="py-1">Q3 ({result.q3DueDate})</td>
                  <td className="text-right">$ {result.quarterlyRequired}</td>
                  <td className="text-right">$ {result.q3Paid}</td>
                  <td className="text-right">$ {result.q3Underpayment}</td>
                  <td className="text-right font-medium">$ {result.q3Penalty}</td>
                </tr>
                <tr className="border-b border-red-100">
                  <td className="py-1">Q4 ({result.q4DueDate})</td>
                  <td className="text-right">$ {result.quarterlyRequired}</td>
                  <td className="text-right">$ {result.q4Paid}</td>
                  <td className="text-right">$ {result.q4Underpayment}</td>
                  <td className="text-right font-medium">$ {result.q4Penalty}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 pt-3 border-t border-red-200">
            <span className="text-zinc-600 font-medium">Total Penalty:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalPenalty}</span>
            <span className="text-xs text-zinc-500 ml-2">(approx 8% annual rate on shortfall)</span>
          </div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Underpayment Penalty Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Must pay at least 90% of current year tax OR 100%/110% of prior year tax</li>
          <li>Payments required quarterly: Apr 15, Jun 15, Sep 15, Jan 15</li>
          <li>W-2 withholding treated as paid evenly throughout year</li>
          <li>Penalty rate: approx 8% annually (IRS adjusts quarterly)</li>
          <li>Form 2210: Calculate and report underpayment penalty</li>
          <li>No penalty if underpayment less than $1,000</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Avoiding Underpayment Penalty</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Safe harbor: Pay 100% of prior year tax (110% if AGI over $150K)</li>
          <li>Increase W-2 withholding (treated as paid evenly, more forgiving)</li>
          <li>Annualized income method if income varies throughout year</li>
          <li>Pay quarterly estimated taxes on time</li>
          <li>Use Form W-4 to adjust withholding at job</li>
          <li>Make extra payment before year-end via withholding</li>
        </ul>
      </div>
    </div>
  )
}