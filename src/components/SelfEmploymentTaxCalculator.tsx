'use client'

import { useState } from 'react'

export default function SelfEmploymentTaxCalculator() {
  const [netIncome, setNetIncome] = useState('')
  const [taxYear, setTaxYear] = useState('2026')
  const [hasEmployees, setHasEmployees] = useState(false)
  const [businessType, setBusinessType] = useState('sole_prop')
  const [w2Income, setW2Income] = useState('0')

  const calculate = () => {
    const income = parseFloat(netIncome) || 80000
    const year = taxYear
    const hasW2Income = parseFloat(w2Income) || 0
    const isSCorp = businessType === 's_corp'

    // 2026 Self-Employment Tax Rates
    const socialSecurityRate = 0.124 // 12.4% (employee + employer)
    const medicareRate = 0.029 // 2.9% (employee + employer)
    const additionalMedicareRate = 0.009 // 0.9% additional for high income

    // 2026 Social Security Wage Base
    const ssWageBase = 176100 // Estimated 2026 limit

    // Calculate SE tax for sole proprietor
    // SE tax = 15.3% of 92.35% of net income ( deductible half)
    const seIncomeBase = income * 0.9235

    // Social Security portion (capped)
    const ssTaxBase = Math.min(seIncomeBase, ssWageBase - hasW2Income)
    const ssTax = ssTaxBase * socialSecurityRate

    // Medicare portion (no cap)
    const medicareTax = seIncomeBase * medicareRate

    // Additional Medicare tax (over $200K for single, $250K married)
    const additionalMedicareThreshold = 200000
    const additionalMedicare = Math.max(0, seIncomeBase - additionalMedicareThreshold) * additionalMedicareRate

    // Total SE tax
    const totalSETax = ssTax + medicareTax + additionalMedicare

    // Deductible portion (50% of SE tax)
    const deductibleSETax = totalSETax / 2

    // For S-Corp comparison
    // S-Corp owner pays FICA on salary only, not distributions
    let sCorpSETax = 0
    let sCorpSalary = 0
    let sCorpDistributions = 0
    let sCorpTaxSavings = 0

    if (isSCorp) {
      // Reasonable salary estimate (60% of net income as salary)
      sCorpSalary = income * 0.6
      sCorpDistributions = income * 0.4

      // FICA on salary
      const sCorpSSBase = Math.min(sCorpSalary, ssWageBase)
      sCorpSETax = sCorpSSBase * (socialSecurityRate / 2) + sCorpSalary * (medicareRate / 2)

      // Employer portion (company pays)
      const employerFICA = sCorpSSBase * (socialSecurityRate / 2) + sCorpSalary * (medicareRate / 2)

      sCorpSETax += employerFICA

      // Savings from avoiding SE tax on distributions
      const seOnFullIncome = totalSETax
      sCorpTaxSavings = seOnFullIncome - sCorpSETax
    }

    // Effective SE tax rate
    const effectiveSERate = (totalSETax / income) * 100

    // Total tax burden estimate (SE + income tax estimate)
    const incomeTaxEstimate = income * 0.22 // Rough estimate
    const totalTaxBurden = totalSETax + incomeTaxEstimate - deductibleSETax

    return {
      netIncome: income.toFixed(2),
      seIncomeBase: seIncomeBase.toFixed(2),
      ssWageBase: ssWageBase.toFixed(0),
      ssTax: ssTax.toFixed(2),
      medicareTax: medicareTax.toFixed(2),
      additionalMedicare: additionalMedicare.toFixed(2),
      totalSETax: totalSETax.toFixed(2),
      deductibleSETax: deductibleSETax.toFixed(2),
      effectiveSERate: effectiveSERate.toFixed(2),
      incomeTaxEstimate: incomeTaxEstimate.toFixed(2),
      totalTaxBurden: totalTaxBurden.toFixed(2),
      taxYear: year,
      ssTaxRate: '12.4%',
      medicareRateStr: '2.9%',
      additionalMedicareRateStr: '0.9%',
      isSCorp,
      sCorpSalary: sCorpSalary.toFixed(2),
      sCorpDistributions: sCorpDistributions.toFixed(2),
      sCorpSETax: sCorpSETax.toFixed(2),
      sCorpTaxSavings: sCorpTaxSavings.toFixed(2),
      w2Income: hasW2Income.toFixed(2),
      ssWageBaseRemaining: (ssWageBase - hasW2Income).toFixed(0)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Self-Employment Tax Calculator</h1>
      <p className="text-zinc-600">Calculate 2026 self-employment tax including Social Security, Medicare, and potential S-Corp savings.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Net Self-Employment Income</label>
            <input
              type="number"
              value={netIncome}
              onChange={(e) => setNetIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter net business income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Structure</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="sole_prop">Sole Proprietor / LLC (Default)</option>
              <option value="s_corp">S-Corporation</option>
              <option value="partnership">Partnership Member</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">W-2 Income (from other job)</label>
            <input
              type="number"
              value={w2Income}
              onChange={(e) => setW2Income(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter W-2 wages if employed elsewhere"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Affects Social Security wage base limit
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2026">2026 (Estimated)</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Self-Employment Tax Breakdown</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Net Income</span>
            <span className="font-bold">$${result.netIncome}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">SE Tax Base (92.35%)</span>
            <span className="font-bold">$${result.seIncomeBase}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Social Security ({result.ssTaxRate})</span>
            <span className="font-bold">$${result.ssTax}</span>
            <div className="text-xs text-zinc-400">Up to $${result.ssWageBaseRemaining} wage base</div>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Medicare ({result.medicareRateStr})</span>
            <span className="font-bold">$${result.medicareTax}</span>
            <div className="text-xs text-zinc-400">No income limit</div>
          </div>
          {parseFloat(result.additionalMedicare) > 0 && (
            <div className="bg-yellow-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Additional Medicare ({result.additionalMedicareRateStr})</span>
              <span className="font-bold text-yellow-600">$${result.additionalMedicare}</span>
              <div className="text-xs text-zinc-400">Income over $200K</div>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Total Self-Employment Tax</span>
            <span className="font-bold text-blue-600">$${result.totalSETax}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Deductible Half (50%)</span>
            <span className="font-bold text-green-600">-$${result.deductibleSETax}</span>
            <div className="text-xs text-zinc-400">Reduces income tax</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective SE Rate</div>
            <div className="text-2xl font-bold">{result.effectiveSERate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">SE Tax Paid</div>
            <div className="text-2xl font-bold text-blue-600">$${result.totalSETax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Estimated Total Tax</div>
            <div className="text-2xl font-bold">$${result.totalTaxBurden}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">SS Wage Base ({result.taxYear})</div>
            <div className="text-2xl font-bold">$${result.ssWageBase}</div>
          </div>
        </div>
      </div>

      {result.isSCorp && parseFloat(result.sCorpTaxSavings) > 0 && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">S-Corp Tax Savings</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Reasonable Salary</div>
              <div className="font-bold">$${result.sCorpSalary}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Distributions (No SE Tax)</div>
              <div className="font-bold">$${result.sCorpDistributions}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">S-Corp FICA Total</div>
              <div className="font-bold">$${result.sCorpSETax}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Potential Savings</div>
              <div className="font-bold text-green-600">$${result.sCorpTaxSavings}</div>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-2">
            S-Corp status avoids SE tax on distributions, but requires reasonable salary, payroll processing, and S-Corp filing costs. Threshold: ~$60-80K net income to benefit.
          </div>
        </div>
      )}

      {!result.isSCorp && parseFloat(result.netIncome) > 60000 && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Consider S-Corporation Status</h3>
          <div className="text-sm text-yellow-600">
            At $${result.netIncome} net income, S-Corp election could save ~$${parseFloat(result.totalSETax) * 0.3}/year. S-Corp owners pay FICA on salary only, not distributions. Requires: reasonable salary, payroll setup, quarterly filings. Consult tax advisor for suitability.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SE Tax Rates ({result.taxYear})</h3>
        <div className="text-xs text-zinc-600">
          Social Security: 12.4% (employee 6.2% + employer 6.2%) up to $176,100 wage base. Medicare: 2.9% (1.45% + 1.45%) no limit. Additional Medicare: 0.9% over $200K single/$250K married. SE tax = 15.3% of 92.35% of net income. Deduct half on Schedule SE.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payment Schedule</h3>
        <div className="text-xs text-zinc-600">
          Pay quarterly via estimated taxes (Form 1040-ES): April 15, June 15, September 15, January 15. Each payment = (income tax + SE tax) / 4. Underpayment penalty if owe $1,000+ at year end. Safe harbor: pay 100% of last year's tax (110% if AGI over $150K).
        </div>
      </div>
    </main>
  )
}