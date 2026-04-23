'use client'

import { useState } from 'react'

export default function RetirementTaxPlanningCalculator() {
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentAge, setCurrentAge] = useState(50)
  const [socialSecurityIncome, setSocialSecurityIncome] = useState(30000)
  const [pensionIncome, setPensionIncome] = useState(20000)
  const [iraWithdrawal, setIraWithdrawal] = useState(40000)
  const [rothWithdrawal, setRothWithdrawal] = useState(10000)
  const [investmentIncome, setInvestmentIncome] = useState(5000)
  const [otherIncome, setOtherIncome] = useState(0)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('married')
  const [standardDeduction, setStandardDeduction] = useState(true)
  const [itemizedDeduction, setItemizedDeduction] = useState(0)

  const calculate = () => {
    // Social Security taxation calculation
    const combinedIncome = socialSecurityIncome * 0.5 + pensionIncome + iraWithdrawal + investmentIncome + otherIncome

    let taxableSSPercent = 0
    const ssThresholdBase = filingStatus === 'married' ? 32000 : 25000
    const ssThresholdHigh = filingStatus === 'married' ? 44000 : 34000

    if (combinedIncome <= ssThresholdBase) {
      taxableSSPercent = 0
    } else if (combinedIncome <= ssThresholdHigh) {
      taxableSSPercent = 50
    } else {
      taxableSSPercent = 85
    }

    const taxableSS = socialSecurityIncome * (taxableSSPercent / 100)

    // Total taxable income
    const deduction = standardDeduction
      ? (filingStatus === 'married' ? 29200 : 14600)
      : itemizedDeduction

    const totalGrossIncome = taxableSS + pensionIncome + iraWithdrawal + investmentIncome + otherIncome
    const taxableIncome = Math.max(0, totalGrossIncome - deduction)

    // Tax calculation (2024 brackets)
    let federalTax = 0
    if (filingStatus === 'married') {
      if (taxableIncome <= 22000) federalTax = taxableIncome * 0.10
      else if (taxableIncome <= 89450) federalTax = 2200 + (taxableIncome - 22000) * 0.12
      else if (taxableIncome <= 190750) federalTax = 10794 + (taxableIncome - 89450) * 0.22
      else federalTax = 33063 + (taxableIncome - 190750) * 0.24
    } else {
      if (taxableIncome <= 11000) federalTax = taxableIncome * 0.10
      else if (taxableIncome <= 44725) federalTax = 1100 + (taxableIncome - 11000) * 0.12
      else if (taxableIncome <= 95475) federalTax = 5147 + (taxableIncome - 44725) * 0.22
      else federalTax = 16290 + (taxableIncome - 95475) * 0.24
    }

    // Effective rate
    const totalIncomeAllSources = socialSecurityIncome + pensionIncome + iraWithdrawal + rothWithdrawal + investmentIncome + otherIncome
    const effectiveRate = totalIncomeAllSources > 0 ? (federalTax / totalIncomeAllSources) * 100 : 0

    // Marginal rate on additional IRA withdrawal
    const marginalRate = filingStatus === 'married'
      ? (taxableIncome > 190750 ? 0.24 : taxableIncome > 89450 ? 0.22 : taxableIncome > 22000 ? 0.12 : 0.10)
      : (taxableIncome > 95475 ? 0.24 : taxableIncome > 44725 ? 0.22 : taxableIncome > 11000 ? 0.12 : 0.10)

    // Tax savings from Roth withdrawal (tax-free)
    const rothTaxSavings = rothWithdrawal * marginalRate

    // Recommended withdrawal strategy
    const optimalWithdrawal = Math.min(iraWithdrawal, ssThresholdHigh - combinedIncome)
    const taxOptimizedIncome = combinedIncome + optimalWithdrawal

    // Strategy analysis
    let strategy = ''
    if (combinedIncome < ssThresholdBase) {
      strategy = 'Below SS tax threshold. Convert Traditional to Roth while in 0% tax bracket on SS.'
    } else if (combinedIncome < ssThresholdHigh) {
      strategy = 'In 50% SS taxable zone. Manage withdrawals to stay below $44K (married) threshold.'
    } else if (taxableIncome < 22000 && filingStatus === 'married') {
      strategy = 'In 10% bracket. Good time for Roth conversions or additional Traditional withdrawals.'
    } else {
      strategy = 'Consider Roth withdrawals first (tax-free), then Traditional IRA to manage bracket.'
    }

    return {
      retirementAge: retirementAge.toFixed(0),
      currentAge: currentAge.toFixed(0),
      socialSecurityIncome: socialSecurityIncome.toFixed(0),
      taxableSSPercent: taxableSSPercent.toFixed(0),
      taxableSS: taxableSS.toFixed(0),
      pensionIncome: pensionIncome.toFixed(0),
      iraWithdrawal: iraWithdrawal.toFixed(0),
      rothWithdrawal: rothWithdrawal.toFixed(0),
      investmentIncome: investmentIncome.toFixed(0),
      otherIncome: otherIncome.toFixed(0),
      combinedIncome: combinedIncome.toFixed(0),
      totalGrossIncome: totalGrossIncome.toFixed(0),
      deduction: deduction.toFixed(0),
      taxableIncome: taxableIncome.toFixed(0),
      federalTax: federalTax.toFixed(0),
      totalIncomeAllSources: totalIncomeAllSources.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      marginalRate: (marginalRate * 100).toFixed(0),
      rothTaxSavings: rothTaxSavings.toFixed(0),
      ssThresholdBase: ssThresholdBase.toFixed(0),
      ssThresholdHigh: ssThresholdHigh.toFixed(0),
      filingStatus,
      standardDeduction,
      strategy,
      optimalWithdrawal: optimalWithdrawal.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Retirement Tax Planning Calculator</h1>
      <p className="text-gray-600 mb-4">Plan tax-efficient retirement income withdrawal strategy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Social Security Income ($)</label>
          <input
            type="number"
            value={socialSecurityIncome}
            onChange={(e) => setSocialSecurityIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pension Income ($)</label>
          <input
            type="number"
            value={pensionIncome}
            onChange={(e) => setPensionIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional IRA/401k Withdrawal ($)</label>
          <input
            type="number"
            value={iraWithdrawal}
            onChange={(e) => setIraWithdrawal(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Roth IRA Withdrawal ($)</label>
          <input
            type="number"
            value={rothWithdrawal}
            onChange={(e) => setRothWithdrawal(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Income ($)</label>
          <input
            type="number"
            value={investmentIncome}
            onChange={(e) => setInvestmentIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={standardDeduction}
            onChange={(e) => setStandardDeduction(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Use Standard Deduction</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Social Security Taxation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Combined Income:</span>
            <span className="font-bold ml-2">$ {result.combinedIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable %:</span>
            <span className="font-bold ml-2">{result.taxableSSPercent}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable SS:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.taxableSS}</span>
          </div>
          <div>
            <span className="text-zinc-600">Threshold (0%):</span>
            <span className="font-medium ml-2">$ {result.ssThresholdBase}</span>
          </div>
          <div>
            <span className="text-zinc-600">Threshold (85%):</span>
            <span className="font-medium ml-2">$ {result.ssThresholdHigh}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Income Sources</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Taxable SS:</span>
            <span className="font-medium ml-2">$ {result.taxableSS}</span>
          </div>
          <div>
            <span className="text-zinc-600">Pension:</span>
            <span className="font-medium ml-2">$ {result.pensionIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Traditional IRA:</span>
            <span className="font-medium ml-2">$ {result.iraWithdrawal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Roth (Tax-Free):</span>
            <span className="font-bold text-green-700 ml-2">$ {result.rothWithdrawal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Investment:</span>
            <span className="font-medium ml-2">$ {result.investmentIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Gross:</span>
            <span className="font-bold ml-2">$ {result.totalGrossIncome}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Deduction:</span>
            <span className="font-medium ml-2">$ {result.deduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-bold ml-2">$ {result.taxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Federal Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.federalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Income:</span>
            <span className="font-medium ml-2">$ {result.totalIncomeAllSources}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-bold ml-2">{result.effectiveRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Marginal Rate:</span>
            <span className="font-bold ml-2">{result.marginalRate}%</span>
          </div>
        </div>
      </div>

      {parseFloat(result.rothWithdrawal) > 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Roth Tax Savings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Roth Withdrawal:</span>
              <span className="font-medium ml-2">$ {result.rothWithdrawal}</span>
            </div>
            <div>
              <span className="text-zinc-600">Tax Saved:</span>
              <span className="font-bold text-teal-700 ml-2">$ {result.rothTaxSavings}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            Roth withdrawals are tax-free (if 5-year rule + 59.5 age met). No SS taxation impact.
          </div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Withdrawal Strategy</h2>
        <div className="text-sm text-yellow-700">{result.strategy}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Social Security Tax Thresholds</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Combined income under $25K (single) / $32K (married): 0% taxable</li>
          <li>Combined income $25K-$34K (single) / $32K-$44K (married): 50% taxable</li>
          <li>Combined income over $34K (single) / $44K (married): 85% taxable</li>
          <li>Combined income = 50% SS + all other taxable income</li>
          <li>Roth withdrawals do NOT count toward combined income</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Tax-Efficient Withdrawal Order</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>First: Use Roth (tax-free, doesn't affect SS taxation)</li>
          <li>Second: Traditional IRA/401k to fill low brackets</li>
          <li>Third: Consider Roth conversions in low-income years</li>
          <li>Manage withdrawals to stay below SS thresholds</li>
          <li>Leave Roth for later years or heirs (no RMDs)</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Retirement Tax Planning Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Years 60-65: Ideal for Roth conversions (lower income)</li>
          <li>Before SS: Convert Traditional to Roth in 0% bracket</li>
          <li>After SS: Manage income to minimize SS taxation</li>
          <li>Consider QCDs (Qualified Charitable Distributions) from IRA after 70.5</li>
          <li>Plan withdrawals to avoid pushing into higher brackets</li>
        </ul>
      </div>
    </div>
  )
}