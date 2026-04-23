'use client'

import { useState } from 'react'

export default function InvestmentInterestExpenseCalculator() {
  const [investmentIncome, setInvestmentIncome] = useState(15000)
  const [interestExpense, setInterestExpense] = useState(8000)
  const [marginInterest, setMarginInterest] = useState(5000)
  const [otherInterest, setOtherInterest] = useState(3000)
  const [marginalRate, setMarginalRate] = useState(32)

  const calculate = () => {
    const totalInterest = marginInterest + otherInterest
    const deductibleLimit = investmentIncome
    const currentDeduction = Math.min(totalInterest, deductibleLimit)
    const disallowedExpense = totalInterest - currentDeduction
    const carryforward = disallowedExpense
    const taxSavings = currentDeduction * (marginalRate / 100)
    const netSavings = taxSavings - totalInterest * 0
    const effectiveRate = investmentIncome > 0 ? (taxSavings / investmentIncome) * 100 : 0

    return {
      investmentIncome: investmentIncome.toFixed(2),
      marginInterest: marginInterest.toFixed(2),
      otherInterest: otherInterest.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      deductibleLimit: deductibleLimit.toFixed(2),
      currentDeduction: currentDeduction.toFixed(2),
      disallowedExpense: disallowedExpense.toFixed(2),
      carryforward: carryforward.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      canDeductAll: totalInterest <= deductibleLimit,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Investment Interest Expense Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate deductible investment interest expense and carryforward amounts.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Net Investment Income ($)</label>
          <input
            type="number"
            value={investmentIncome}
            onChange={(e) => setInvestmentIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Margin Account Interest ($)</label>
          <input
            type="number"
            value={marginInterest}
            onChange={(e) => setMarginInterest(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Investment Loan Interest ($)</label>
          <input
            type="number"
            value={otherInterest}
            onChange={(e) => setOtherInterest(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate (%)</label>
          <input
            type="number"
            value={marginalRate}
            onChange={(e) => setMarginalRate(Number(e.target.value))}
            className="w-full border rounded p-2"
            step="1"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Interest Expense Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Interest Expense:</span>
            <span className="font-medium ml-2">$ {result.totalInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Investment Income:</span>
            <span className="font-medium ml-2">$ {result.investmentIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Deduction Limit:</span>
            <span className="font-medium ml-2">$ {result.deductibleLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current Deduction:</span>
            <span className="font-medium ml-2 text-green-600">$ {result.currentDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Disallowed Amount:</span>
            <span className="font-medium ml-2">$ {result.disallowedExpense}</span>
          </div>
          <div>
            <span className="text-zinc-600">Carryforward:</span>
            <span className="font-medium ml-2">$ {result.carryforward}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Savings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Tax Savings at {marginalRate}%:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate Reduction:</span>
            <span className="font-medium ml-2">{result.effectiveRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Investment Interest Expense Rules</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Deduction Limit:</strong> Can only deduct up to net investment income (interest, dividends, capital gains, royalties). Excess carries forward indefinitely.</p>
          <p><strong>Net Investment Income:</strong> Gross investment income minus investment expenses. Capital gains are included only if you elect to forgo capital gains tax rates.</p>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Qualifying Investment Interest</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Margin account interest for purchasing securities</li>
          <li>Interest on loans used to buy investment property</li>
          <li>Interest on loans for investment real estate (if not rental)</li>
          <li>Brokerage account margin interest</li>
          <li>Interest paid to carry investment positions</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Important Considerations</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Cannot deduct interest for tax-exempt investments</li>
          <li>Capital gains election: include capital gains to increase deduction limit</li>
          <li>Passive activity rules may apply to some investment interest</li>
          <li>Carryforward has no expiration - can use in future years</li>
          <li>Must itemize deductions to claim investment interest expense</li>
        </ul>
      </div>
    </div>
  )
}