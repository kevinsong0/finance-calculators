'use client'

import { useState } from 'react'

export default function BackdoorRothIRACalculator() {
  const [traditionalIRABalance, setTraditionalIRABalance] = useState(5000)
  const [nonDeductibleContributions, setNonDeductibleContributions] = useState(7000)
  const [earningsOnNonDeductible, setEarningsOnNonDeductible] = useState(1000)
  const [annualIncome, setAnnualIncome] = useState(180000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [conversionAmount, setConversionAmount] = useState(7000)
  const [conversionYear, setConversionYear] = useState(2024)

  const calculate = () => {
    const totalTraditionalIRA = traditionalIRABalance
    const totalNonDeductible = nonDeductibleContributions + earningsOnNonDeductible
    const taxableBasis = totalTraditionalIRA - totalNonDeductible

    const taxableRatio = totalTraditionalIRA > 0 ? taxableBasis / totalTraditionalIRA : 0
    const nonTaxableRatio = totalTraditionalIRA > 0 ? totalNonDeductible / totalTraditionalIRA : 0

    const taxableConversionAmount = conversionAmount * taxableRatio
    const nonTaxableConversionAmount = conversionAmount * nonTaxableRatio

    const proRataIssue = traditionalIRABalance > 0

    let marginalRate = 0.24
    if (filingStatus === 'single') {
      if (annualIncome <= 11000) marginalRate = 0.10
      else if (annualIncome <= 44725) marginalRate = 0.12
      else if (annualIncome <= 95475) marginalRate = 0.22
      else if (annualIncome <= 182100) marginalRate = 0.24
      else if (annualIncome <= 231250) marginalRate = 0.32
      else marginalRate = 0.35
    } else {
      if (annualIncome <= 22000) marginalRate = 0.10
      else if (annualIncome <= 89450) marginalRate = 0.12
      else if (annualIncome <= 190750) marginalRate = 0.22
      else if (annualIncome <= 364200) marginalRate = 0.24
      else if (annualIncome <= 462500) marginalRate = 0.32
      else marginalRate = 0.35
    }

    const conversionTax = taxableConversionAmount * marginalRate

    const directRothLimitSingle = 161000
    const directRothLimitMarried = 240000
    const directRothEligible = filingStatus === 'single' ? annualIncome < directRothLimitSingle : annualIncome < directRothLimitMarried

    const afterConversionBalance = conversionAmount - conversionTax
    const fiveYearRuleYear = conversionYear + 5

    const rolloverTraditionalFirst = traditionalIRABalance > 0

    return {
      traditionalIRABalance: traditionalIRABalance.toFixed(2),
      nonDeductibleContributions: nonDeductibleContributions.toFixed(2),
      earningsOnNonDeductible: earningsOnNonDeductible.toFixed(2),
      totalNonDeductible: totalNonDeductible.toFixed(2),
      totalTraditionalIRA: totalTraditionalIRA.toFixed(2),
      taxableBasis: taxableBasis.toFixed(2),
      taxableRatio: (taxableRatio * 100).toFixed(2),
      nonTaxableRatio: (nonTaxableRatio * 100).toFixed(2),
      conversionAmount: conversionAmount.toFixed(2),
      taxableConversionAmount: taxableConversionAmount.toFixed(2),
      nonTaxableConversionAmount: nonTaxableConversionAmount.toFixed(2),
      conversionTax: conversionTax.toFixed(2),
      marginalRate: (marginalRate * 100).toFixed(0),
      afterConversionBalance: afterConversionBalance.toFixed(2),
      fiveYearRuleYear: fiveYearRuleYear.toFixed(0),
      proRataIssue,
      directRothEligible,
      directRothLimitSingle: directRothLimitSingle.toFixed(0),
      directRothLimitMarried: directRothLimitMarried.toFixed(0),
      rolloverTraditionalFirst,
      conversionYear: conversionYear.toFixed(0),
      filingStatus,
      annualIncome: annualIncome.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Backdoor Roth IRA Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax implications of backdoor Roth IRA conversion strategy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Traditional IRA Balance ($)</label>
          <input
            type="number"
            value={traditionalIRABalance}
            onChange={(e) => setTraditionalIRABalance(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Non-Deductible Contributions ($)</label>
          <input
            type="number"
            value={nonDeductibleContributions}
            onChange={(e) => setNonDeductibleContributions(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Earnings on Non-Deductible ($)</label>
          <input
            type="number"
            value={earningsOnNonDeductible}
            onChange={(e) => setEarningsOnNonDeductible(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conversion Amount ($)</label>
          <input
            type="number"
            value={conversionAmount}
            onChange={(e) => setConversionAmount(Number(e.target.value))}
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
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRA Account Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Traditional IRA Balance:</span>
            <span className="font-medium ml-2">$ {result.traditionalIRABalance}</span>
          </div>
          <div>
            <span className="text-zinc-600">Non-Deductible Basis:</span>
            <span className="font-medium ml-2">$ {result.totalNonDeductible}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Basis:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.taxableBasis}</span>
          </div>
        </div>
      </div>

      {result.proRataIssue && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Pro-Rata Rule Warning</h2>
          <div className="text-sm text-red-700">
            You have existing Traditional IRA funds. Pro-Rata rule applies: {result.taxableRatio}% of your conversion is taxable.
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            To avoid Pro-Rata: Roll Traditional IRA funds to 401(k) first, then convert only non-deductible contributions.
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Conversion Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Conversion Amount:</span>
            <span className="font-medium ml-2">$ {result.conversionAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Portion:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.taxableConversionAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Non-Taxable Portion:</span>
            <span className="font-bold text-green-600 ml-2">$ {result.nonTaxableConversionAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Rate:</span>
            <span className="font-medium ml-2">{result.marginalRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Conversion Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.conversionTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">5-Year Rule Year:</span>
            <span className="font-medium ml-2">{result.fiveYearRuleYear}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Direct Roth Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Income Limit (Single):</span>
            <span className="font-medium ml-2">$ {result.directRothLimitSingle}</span>
          </div>
          <div>
            <span className="text-zinc-600">Income Limit (Married):</span>
            <span className="font-medium ml-2">$ {result.directRothLimitMarried}</span>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-600">Direct Roth Eligible:</span>
            <span className={`font-bold ml-2 ${result.directRothEligible ? 'text-green-600' : 'text-red-600'}`}>
              {result.directRothEligible ? 'Yes - No need for backdoor!' : 'No - Backdoor strategy required'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Backdoor Roth IRA Process</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Step 1: Contribute to Traditional IRA (non-deductible if income above limits)</li>
          <li>Step 2: Convert Traditional IRA to Roth IRA</li>
          <li>Step 3: File Form 8606 to report non-deductible contribution</li>
          <li>Step 4: Pay tax only on earnings portion (if no other Traditional IRA funds)</li>
          <li>Step 5: Wait 5 years for tax-free withdrawal of converted amount</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Pro-Rata Rule Explained</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>If you have other Traditional IRA funds, Pro-Rata rule applies</li>
          <li>Taxable percentage = (Taxable funds / Total Traditional IRA) × 100%</li>
          <li>Cannot convert only non-deductible portion separately</li>
          <li>Solution: Roll Traditional IRA to 401(k) before conversion</li>
          <li>401(k) rollover removes funds from Pro-Rata calculation</li>
          <li>Then convert only non-deductible IRA with minimal tax</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Benefits of Backdoor Roth</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Contribute $7,000 to Roth IRA regardless of income</li>
          <li>Tax-free growth forever</li>
          <li>Tax-free withdrawals after 5 years + age 59.5</li>
          <li>No income limits for conversion</li>
          <li>No RMDs during lifetime</li>
          <li>Can be combined with mega backdoor 401(k) strategy</li>
        </ul>
      </div>
    </div>
  )
}