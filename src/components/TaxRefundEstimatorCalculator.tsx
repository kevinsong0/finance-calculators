'use client'

import { useState } from 'react'

export default function TaxRefundEstimatorCalculator() {
  const [grossIncome, setGrossIncome] = useState(80000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [standardDeduction, setStandardDeduction] = useState(true)
  const [itemizedDeduction, setItemizedDeduction] = useState(0)
  const [taxCredits, setTaxCredits] = useState(0)
  const [federalWithholding, setFederalWithholding] = useState(15000)
  const [stateWithholding, setStateWithholding] = useState(4000)
  const [dependents, setDependents] = useState(0)
  const [w2Income, setW2Income] = useState(80000)
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState(0)

  const calculate = () => {
    // Total income
    const totalIncome = w2Income + selfEmploymentIncome

    // Self-employment tax
    const seTax = selfEmploymentIncome > 0 ? selfEmploymentIncome * 0.9235 * 0.153 : 0
    const seTaxDeduction = seTax / 2

    // Deduction amount
    const deductionAmount = standardDeduction
      ? (filingStatus === 'single' ? 14600 : 29200) // 2024 standard deduction
      : itemizedDeduction

    // Taxable income
    const taxableIncome = Math.max(0, totalIncome - deductionAmount - seTaxDeduction)

    // Federal tax calculation (2024 brackets)
    const calculateFederalTax = (income: number, status: 'single' | 'married'): number => {
      const bracketsSingle = [11600, 47150, 100525, 191950, 243725, 609350]
      const bracketsMarried = [23200, 94300, 201050, 383900, 487450, 731200]
      const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
      const brackets = status === 'single' ? bracketsSingle : bracketsMarried

      let tax = 0
      let prevBracket = 0

      for (let i = 0; i < brackets.length; i++) {
        if (income <= brackets[i]) {
          tax += (income - prevBracket) * rates[i]
          return tax
        }
        tax += (brackets[i] - prevBracket) * rates[i]
        prevBracket = brackets[i]
      }
      tax += (income - prevBracket) * rates[6]
      return tax
    }

    const federalTaxBeforeCredits = calculateFederalTax(taxableIncome, filingStatus)

    // Child tax credit (up to $2000 per child, refundable up to $1700)
    const childTaxCredit = Math.min(dependents * 2000, federalTaxBeforeCredits)
    const refundableCTC = Math.max(0, dependents * 1700 - childTaxCredit)

    // Total credits applied
    const totalCredits = Math.min(taxCredits + childTaxCredit, federalTaxBeforeCredits)

    // Final federal tax
    const federalTax = federalTaxBeforeCredits - totalCredits

    // Federal refund or owed
    const federalRefund = federalWithholding - federalTax + refundableCTC

    // State tax estimation (average ~5%)
    const stateTax = taxableIncome * 0.05 // Simplified state estimate
    const stateRefund = stateWithholding - stateTax

    // Total refund or owed
    const totalRefund = federalRefund + stateRefund

    // Effective tax rate
    const effectiveRate = totalIncome > 0 ? (federalTax / totalIncome) * 100 : 0

    // Marginal rate
    const marginalRate = getMarginalRate(taxableIncome, filingStatus)

    return {
      totalIncome: totalIncome.toFixed(0),
      w2Income: w2Income.toFixed(0),
      selfEmploymentIncome: selfEmploymentIncome.toFixed(0),
      seTax: seTax.toFixed(0),
      deductionAmount: deductionAmount.toFixed(0),
      standardDeductionUsed: standardDeduction,
      taxableIncome: taxableIncome.toFixed(0),
      federalTaxBeforeCredits: federalTaxBeforeCredits.toFixed(0),
      childTaxCredit: childTaxCredit.toFixed(0),
      refundableCTC: refundableCTC.toFixed(0),
      totalCredits: totalCredits.toFixed(0),
      federalTax: federalTax.toFixed(0),
      federalWithholding: federalWithholding.toFixed(0),
      federalRefund: federalRefund.toFixed(0),
      stateTax: stateTax.toFixed(0),
      stateWithholding: stateWithholding.toFixed(0),
      stateRefund: stateRefund.toFixed(0),
      totalRefund: totalRefund.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      marginalRate: (marginalRate * 100).toFixed(0),
      dependents: dependents.toFixed(0),
      filingStatus,
    }
  }

  const getMarginalRate = (income: number, status: 'single' | 'married'): number => {
    const bracketsSingle = [11600, 47150, 100525, 191950, 243725, 609350]
    const bracketsMarried = [23200, 94300, 201050, 383900, 487450, 731200]
    const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
    const brackets = status === 'single' ? bracketsSingle : bracketsMarried
    for (let i = 0; i < brackets.length; i++) {
      if (income <= brackets[i]) return rates[i]
    }
    return rates[6]
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Refund Estimator Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate your federal and state tax refund or amount owed.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">W-2 Income ($)</label>
          <input type="number" value={w2Income} onChange={(e) => setW2Income(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Self-Employment Income ($)</label>
          <input type="number" value={selfEmploymentIncome} onChange={(e) => setSelfEmploymentIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dependents</label>
          <input type="number" value={dependents} min="0" max="10" onChange={(e) => setDependents(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Federal Tax Withheld ($)</label>
          <input type="number" value={federalWithholding} onChange={(e) => setFederalWithholding(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Withheld ($)</label>
          <input type="number" value={stateWithholding} onChange={(e) => setStateWithholding(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={standardDeduction} onChange={(e) => setStandardDeduction(e.target.checked)} className="w-4 h-4" />
          <label className="text-sm font-medium">Use Standard Deduction</label>
        </div>
        {!standardDeduction && (
          <div>
            <label className="block text-sm font-medium mb-1">Itemized Deduction Amount ($)</label>
            <input type="number" value={itemizedDeduction} onChange={(e) => setItemizedDeduction(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Other Tax Credits ($)</label>
          <input type="number" value={taxCredits} onChange={(e) => setTaxCredits(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Income Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">W-2 Income:</span><span className="font-medium ml-2">$ {result.w2Income}</span></div>
          <div><span className="text-zinc-600">Self-Employment:</span><span className="font-medium ml-2">$ {result.selfEmploymentIncome}</span></div>
          <div><span className="text-zinc-600">Total Income:</span><span className="font-bold text-blue-700 ml-2">$ {result.totalIncome}</span></div>
          {Number(result.selfEmploymentIncome) > 0 && (
            <div><span className="text-zinc-600">SE Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.seTax}</span></div>
          )}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Deduction:</span><span className="font-medium ml-2">$ {result.deductionAmount}</span></div>
          <div><span className="text-zinc-600">Taxable Income:</span><span className="font-bold text-purple-700 ml-2">$ {result.taxableIncome}</span></div>
          <div><span className="text-zinc-600">Tax Before Credits:</span><span className="font-medium ml-2">$ {result.federalTaxBeforeCredits}</span></div>
          {Number(result.dependents) > 0 && (
            <>
              <div><span className="text-zinc-600">Child Tax Credit:</span><span className="font-bold text-green-700 ml-2">$ {result.childTaxCredit}</span></div>
              <div><span className="text-zinc-600">Refundable CTC:</span><span className="font-bold text-green-700 ml-2">$ {result.refundableCTC}</span></div>
            </>
          )}
          <div><span className="text-zinc-600">Total Credits:</span><span className="font-bold text-green-700 ml-2">$ {result.totalCredits}</span></div>
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-bold text-purple-700 ml-2">$ {result.federalTax}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Federal Refund/Owed</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Federal Withholding:</span><span className="font-medium ml-2">$ {result.federalWithholding}</span></div>
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-medium ml-2">$ {result.federalTax}</span></div>
          <div><span className="text-zinc-600">Federal Result:</span>
            <span className={`font-bold ml-2 ${Number(result.federalRefund) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {Number(result.federalRefund) >= 0 ? 'REFUND' : 'OWED'} $ {Math.abs(Number(result.federalRefund))}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">State Estimate</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">State Withholding:</span><span className="font-medium ml-2">$ {result.stateWithholding}</span></div>
          <div><span className="text-zinc-600">Estimated State Tax:</span><span className="font-medium ml-2">$ {result.stateTax}</span></div>
          <div><span className="text-zinc-600">State Result:</span>
            <span className={`font-bold ml-2 ${Number(result.stateRefund) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {Number(result.stateRefund) >= 0 ? 'REFUND' : 'OWED'} $ {Math.abs(Number(result.stateRefund))}
            </span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">State tax estimated at ~5%. Actual varies by state.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveRate}%</span></div>
          <div><span className="text-zinc-600">Marginal Rate:</span><span className="font-bold ml-2">{result.marginalRate}%</span></div>
          <div><span className="text-zinc-600">Total Result:</span>
            <span className={`font-bold ml-2 ${Number(result.totalRefund) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {Number(result.totalRefund) >= 0 ? 'REFUND' : 'OWED'} $ {Math.abs(Number(result.totalRefund))}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax Planning Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Adjust W-4 withholding to avoid large refunds or owed amounts</li>
          <li>Large refund = overpaid taxes throughout year (lost opportunity cost)</li>
          <li>Large owed amount = potential underpayment penalty risk</li>
          <li>Standard deduction: $14,600 single, $29,200 married (2024)</li>
          <li>Child Tax Credit: up to $2,000/child, $1,700 refundable</li>
          <li>Self-employment: 15.3% SE tax on net earnings</li>
        </ul>
      </div>
    </div>
  )
}