'use client'

import { useState } from 'react'

export default function EstimatedTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState('single')
  const [expectedIncome, setExpectedIncome] = useState('100000')
  const [w2Withholding, setW2Withholding] = useState('15000')
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState('50000')
  const [otherIncome, setOtherIncome] = useState('0')
  const [deductions, setDeductions] = useState('14600')
  const [taxYear, setTaxYear] = useState('2024')

  const taxBrackets2024: Record<string, Array<{ min: number; max: number; rate: number }>> = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
  }

  const standardDeductions: Record<string, Record<string, number>> = {
    2024: { single: 14600, married: 29200 },
  }

  const selfEmploymentTaxRate = 0.153 // 15.3% (12.4% SS + 2.9% Medicare)

  const calculate = () => {
    const income = parseFloat(expectedIncome) || 0
    const withholding = parseFloat(w2Withholding) || 0
    const seIncome = parseFloat(selfEmploymentIncome) || 0
    const other = parseFloat(otherIncome) || 0
    const ded = parseFloat(deductions) || 0

    const totalGrossIncome = income + seIncome + other
    const taxableIncome = Math.max(0, totalGrossIncome - ded)

    // Calculate federal income tax using brackets
    const brackets = taxBrackets2024[filingStatus]
    let federalTax = 0
    let remainingIncome = taxableIncome

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      federalTax += taxableInBracket * bracket.rate
      remainingIncome -= taxableInBracket
    }

    // Self-employment tax calculation
    const seTaxableIncome = seIncome * 0.9235 // 92.35% of SE income subject to SE tax
    const ssLimit2024 = 168600
    const ssTax = Math.min(seTaxableIncome, ssLimit2024) * 0.124
    const medicareTax = seTaxableIncome * 0.029
    const additionalMedicare = seTaxableIncome > 200000 ? (seTaxableIncome - 200000) * 0.009 : 0
    const seTax = ssTax + medicareTax + additionalMedicare

    // QBI deduction (20% of qualified business income, simplified)
    const qbiDeduction = Math.min(seIncome * 0.20, taxableIncome * 0.20)
    const adjustedTaxableIncome = Math.max(0, taxableIncome - qbiDeduction)

    // Recalculate federal tax with QBI deduction
    let adjustedFederalTax = 0
    remainingIncome = adjustedTaxableIncome
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      adjustedFederalTax += taxableInBracket * bracket.rate
      remainingIncome -= taxableInBracket
    }

    const totalTax = adjustedFederalTax + seTax
    const taxDue = totalTax - withholding

    // Estimated tax payments (quarterly)
    // Safe harbor: 90% of current year tax or 100% of prior year (110% if AGI over $150K)
    const safeHarborCurrent = totalTax * 0.90
    const quarterlyPayment = Math.max(0, (taxDue / 4))

    // Penalty threshold (if underpaid)
    const underpayment = Math.max(0, safeHarborCurrent - withholding)
    const penaltyThreshold = 1000 // IRS penalty applies if underpayment exceeds $1,000

    // Due dates
    const dueDates = [
      { quarter: 'Q1', date: 'April 15', payment: quarterlyPayment },
      { quarter: 'Q2', date: 'June 15', payment: quarterlyPayment },
      { quarter: 'Q3', date: 'September 15', payment: quarterlyPayment },
      { quarter: 'Q4', date: 'January 15 (next year)', payment: quarterlyPayment },
    ]

    return {
      totalGrossIncome: totalGrossIncome.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      adjustedTaxableIncome: adjustedTaxableIncome.toFixed(2),
      federalTax: adjustedFederalTax.toFixed(2),
      seTax: seTax.toFixed(2),
      ssTax: ssTax.toFixed(2),
      medicareTax: (medicareTax + additionalMedicare).toFixed(2),
      totalTax: totalTax.toFixed(2),
      withholding: withholding.toFixed(2),
      taxDue: taxDue.toFixed(2),
      quarterlyPayment: quarterlyPayment.toFixed(2),
      safeHarborCurrent: safeHarborCurrent.toFixed(2),
      underpayment: underpayment.toFixed(2),
      penaltyThreshold,
      requiresPayments: taxDue > 0,
      dueDates,
      qbiDeduction: qbiDeduction.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Estimated Tax Payments Calculator</h1>
      <p className="text-zinc-600">Calculate quarterly estimated tax payments for self-employed individuals and those with income not subject to withholding.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income Sources</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">W-2 Income (if any) ($)</label>
            <input
              type="number"
              value={expectedIncome}
              onChange={(e) => setExpectedIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">W-2 Tax Withholding ($)</label>
            <input
              type="number"
              value={w2Withholding}
              onChange={(e) => setW2Withholding(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Self-Employment Income ($)</label>
            <input
              type="number"
              value={selfEmploymentIncome}
              onChange={(e) => setSelfEmploymentIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Income (interest, dividends, etc.) ($)</label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Deductions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Deductions ($)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              2024 Standard deduction: $14,600 (Single) or $29,200 (MFJ)
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Income Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Gross Income:</span>
            <span className="font-medium ml-2">${result.totalGrossIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-medium ml-2">${result.adjustedTaxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">QBI Deduction:</span>
            <span className="font-medium ml-2">${result.qbiDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Filing Status:</span>
            <span className="font-medium ml-2">{result.filingStatus}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Tax Calculation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Federal Income Tax:</span>
            <span className="font-medium ml-2">${result.federalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Self-Employment Tax:</span>
            <span className="font-medium ml-2">${result.seTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Social Security Tax:</span>
            <span className="font-medium ml-2">${result.ssTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Medicare Tax:</span>
            <span className="font-medium ml-2">${result.medicareTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Total Tax Due</h3>
        <div className="text-2xl font-bold text-red-800">${result.totalTax}</div>
        <div className="text-sm text-red-600 mt-1">
          Federal income tax + Self-employment tax
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Withholding vs Tax Due</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">W-2 Withholding:</span>
            <span className="font-medium ml-2">${result.withholding}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Tax Due:</span>
            <span className="font-medium ml-2">${result.taxDue}</span>
          </div>
        </div>
      </div>

      {result.requiresPayments && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Quarterly Estimated Tax Payments</h3>
          <div className="text-2xl font-bold text-green-800">${result.quarterlyPayment} per quarter</div>
          <div className="text-sm text-green-600 mt-2">
            Total annual payment: ${(parseFloat(result.quarterlyPayment) * 4).toFixed(2)}
          </div>
        </div>
      )}

      {result.requiresPayments && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Payment Due Dates</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Quarter</th>
                  <th className="py-2 text-left">Due Date</th>
                  <th className="py-2 text-right">Payment</th>
                </tr>
              </thead>
              <tbody>
                {result.dueDates.map((q) => (
                  <tr key={q.quarter} className="border-b">
                    <td className="py-2">{q.quarter}</td>
                    <td className="py-2">{q.date}</td>
                    <td className="py-2 text-right">${q.payment.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Safe Harbor Rule</h3>
        <div className="text-sm text-yellow-600">
          <div className="mb-2">
            Pay 90% of current year tax (${result.safeHarborCurrent}) or 100% of prior year tax to avoid underpayment penalty.
          </div>
          <div>
            Penalty may apply if underpayment exceeds ${result.penaltyThreshold}. Underpayment: ${result.underpayment}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Estimated tax required if expected tax due exceeds $1,000 after withholding.</li>
          <li>Self-employment tax: 15.3% (12.4% SS up to $168,600 + 2.9% Medicare, no limit).</li>
          <li>QBI deduction: 20% of qualified business income, reduces taxable income.</li>
          <li>Quarterly due dates: April 15, June 15, September 15, January 15.</li>
          <li>Safe harbor: Pay 90% of current year or 100% of prior year tax.</li>
          <li>High income (AGI over $150K): Safe harbor increases to 110% of prior year.</li>
        </ul>
      </div>
    </main>
  )
}