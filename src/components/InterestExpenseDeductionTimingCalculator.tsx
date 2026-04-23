'use client'

import { useState } from 'react'

export default function InterestExpenseDeductionTimingCalculator() {
  const [interestExpense, setInterestExpense] = useState(50000)
  const [investmentIncome, setInvestmentIncome] = useState(30000)
  const [investmentExpenses, setInvestmentExpenses] = useState(5000)
  const [taxYear, setTaxYear] = useState(2024)
  const [carryforwardYears, setCarryforwardYears] = useState(5)
  const [interestType, setInterestType] = useState<'investment' | 'business' | 'mortgage'>('investment')
  const [mortgageAmount, setMortgageAmount] = useState(750000)
  const [mortgageInterest, setMortgageInterest] = useState(25000)
  const [itemizeDeduction, setItemizeDeduction] = useState(true)

  const calculate = () => {
    // Interest Expense Deduction Timing Calculator
    // Calculate deduction limits and carryforward for interest

    // Investment Interest Expense:
    // - Limited to net investment income
    // - Carryforward indefinitely
    // - Form 4952 for calculation

    // Business Interest Expense:
    // - TCJA limit: 30% of adjusted taxable income
    // - Small business exemption (&lt;$27M gross)
    // - Carryforward indefinitely

    // Mortgage Interest:
    // - Acquisition debt: $750k limit
    // - Home equity: not deductible (TCJA)
    // - Must itemize to claim

    let deductionAllowed = 0
    let deductionLimited = 0
    let carryforwardAmount = 0
    let limitationReason = ''

    if (interestType === 'investment') {
      // Investment interest limited to net investment income
      const netInvestmentIncome = investmentIncome - investmentExpenses
      deductionAllowed = Math.min(interestExpense, netInvestmentIncome)
      deductionLimited = Math.max(0, interestExpense - netInvestmentIncome)
      carryforwardAmount = deductionLimited // Carryforward indefinitely
      limitationReason = `Limited to net investment income ($${netInvestmentIncome.toFixed(0)}). Excess carries forward indefinitely.`
    } else if (interestType === 'business') {
      // Simplified business interest calculation
      const taxableIncome = investmentIncome + 100000 // Simplified
      const businessInterestLimit = taxableIncome * 0.3
      deductionAllowed = Math.min(interestExpense, businessInterestLimit)
      deductionLimited = Math.max(0, interestExpense - businessInterestLimit)
      carryforwardAmount = deductionLimited
      limitationReason = `30% of taxable income limit ($${businessInterestLimit.toFixed(0)}). Excess carries forward indefinitely.`
    } else if (interestType === 'mortgage') {
      // Mortgage interest deduction
      const acquisitionLimit = 750000
      const effectiveLoanAmount = Math.min(mortgageAmount, acquisitionLimit)
      const deductibleRatio = effectiveLoanAmount / mortgageAmount
      const deductibleInterest = mortgageInterest * deductibleRatio

      if (itemizeDeduction) {
        deductionAllowed = deductibleInterest
        deductionLimited = mortgageInterest - deductibleInterest
        carryforwardAmount = 0 // Mortgage interest cannot carryforward
        limitationReason = `Acquisition debt limit $${acquisitionLimit}. ${(deductibleRatio * 100).toFixed(1)}% of interest deductible. Home equity not deductible.`
      } else {
        deductionAllowed = 0
        deductionLimited = mortgageInterest
        carryforwardAmount = 0
        limitationReason = 'Not itemizing - standard deduction taken. Mortgage interest not claimed.'
      }
    }

    // Tax benefit calculation
    const taxRate = 0.24
    const taxSavingsThisYear = deductionAllowed * taxRate
    const taxSavingsCarryforward = carryforwardAmount * taxRate

    // Total tax savings (over carryforward period)
    const totalTaxSavings = (deductionAllowed + carryforwardAmount) * taxRate

    // Carryforward schedule projection
    const carryforwardSchedule = []
    let remainingCarryforward = carryforwardAmount
    for (let year = 1; year <= carryforwardYears && remainingCarryforward > 0; year++) {
      const yearIncome = investmentIncome * 1.05 // Assume 5% growth
      const yearNetIncome = yearIncome - investmentExpenses
      const yearDeduction = Math.min(remainingCarryforward, yearNetIncome)
      remainingCarryforward -= yearDeduction
      carryforwardSchedule.push({
        year,
        projectedIncome: yearIncome.toFixed(0),
        deduction: yearDeduction.toFixed(0),
        remaining: remainingCarryforward.toFixed(0),
        taxSavings: (yearDeduction * taxRate).toFixed(0),
      })
    }

    // Recommendation
    let recommendation = ''
    if (interestType === 'investment') {
      if (carryforwardAmount > 0) {
        recommendation = `Investment interest $${interestExpense.toFixed(0)} limited to net investment income $${(investmentIncome - investmentExpenses).toFixed(0)}. Deduct $${deductionAllowed.toFixed(0)} now. Carryforward $${carryforwardAmount.toFixed(0)} indefinitely. Tax savings: $${taxSavingsThisYear.toFixed(0)}. Generate more investment income to utilize carryforward.`
      } else {
        recommendation = `Full deduction allowed. Investment interest $${interestExpense.toFixed(0)} within net investment income limit. Tax savings: $${taxSavingsThisYear.toFixed(0)}. No carryforward needed.`
      }
    } else if (interestType === 'mortgage') {
      if (!itemizeDeduction) {
        recommendation = `Not itemizing. Mortgage interest $${mortgageInterest.toFixed(0)} not deductible. Consider if itemizing exceeds standard deduction ($${14700} single / $${29400} joint).`
      } else {
        recommendation = `Mortgage interest deduction: $${deductionAllowed.toFixed(0)} of $${mortgageInterest.toFixed(0)}. Loan exceeds $${750000} limit - partial deduction. Tax savings: $${taxSavingsThisYear.toFixed(0)}. Home equity interest not deductible under TCJA.`
      }
    } else {
      recommendation = limitationReason + ` Deduction: $${deductionAllowed.toFixed(0)}. Carryforward: $${carryforwardAmount.toFixed(0)}.`
    }

    // Interest type comparison
    const interestComparison = [
      { type: 'Investment Interest', limit: 'Net investment income', carryforward: 'Indefinite', form: 'Form 4952' },
      { type: 'Business Interest', limit: '30% ATI', carryforward: 'Indefinite', form: 'Form 8990' },
      { type: 'Mortgage Interest', limit: '$750k acquisition', carryforward: 'None', form: 'Schedule A' },
    ]

    return {
      interestExpense: interestExpense.toFixed(0),
      investmentIncome: investmentIncome.toFixed(0),
      investmentExpenses: investmentExpenses.toFixed(0),
      taxYear,
      interestType,
      mortgageAmount: mortgageAmount.toFixed(0),
      mortgageInterest: mortgageInterest.toFixed(0),
      itemizeDeduction,
      deductionAllowed: deductionAllowed.toFixed(0),
      deductionLimited: deductionLimited.toFixed(0),
      carryforwardAmount: carryforwardAmount.toFixed(0),
      taxSavingsThisYear: taxSavingsThisYear.toFixed(0),
      taxSavingsCarryforward: taxSavingsCarryforward.toFixed(0),
      totalTaxSavings: totalTaxSavings.toFixed(0),
      limitationReason,
      carryforwardSchedule,
      recommendation,
      interestComparison,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Interest Expense Deduction Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate deduction limits and carryforward for interest expenses.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Interest Type</label>
          <select value={interestType} onChange={(e) => setInterestType(e.target.value as 'investment' | 'business' | 'mortgage')} className="w-full border rounded p-2">
            <option value="investment">Investment Interest</option>
            <option value="business">Business Interest</option>
            <option value="mortgage">Mortgage Interest</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Expense Amount</label>
          <input type="number" value={interestExpense} onChange={(e) => setInterestExpense(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      {interestType === 'investment' && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Investment Income</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Investment Income</label>
              <input type="number" value={investmentIncome} onChange={(e) => setInvestmentIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Other Investment Expenses</label>
              <input type="number" value={investmentExpenses} onChange={(e) => setInvestmentExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          </div>
        </div>
      )}

      {interestType === 'mortgage' && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Mortgage Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mortgage Amount</label>
              <input type="number" value={mortgageAmount} onChange={(e) => setMortgageAmount(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mortgage Interest</label>
              <input type="number" value={mortgageInterest} onChange={(e) => setMortgageInterest(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Itemize Deduction?</label>
              <select value={itemizeDeduction ? 'yes' : 'no'} onChange={(e) => setItemizeDeduction(e.target.value === 'yes')} className="w-full border rounded p-2">
                <option value="yes">Yes - claim mortgage interest</option>
                <option value="no">No - use standard deduction</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Interest Deduction Limits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Interest Type</th>
                <th className="py-2 text-left">Limit</th>
                <th className="py-2 text-left">Carryforward</th>
                <th className="py-2 text-left">Form</th>
              </tr>
            </thead>
            <tbody>
              {result.interestComparison.map((i) => (
                <tr key={i.type} className={`border-b ${result.interestType === i.type.toLowerCase().split(' ')[0] ? 'bg-green-100' : ''}`}>
                  <td className="py-1 font-semibold">{i.type}</td>
                  <td className="py-1">{i.limit}</td>
                  <td className="py-1">{i.carryforward}</td>
                  <td className="py-1">{i.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.deductionAllowed) >= Number(result.interestExpense) ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Deduction Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Interest Expense:</span><span className="font-medium ml-2">$ {result.interestExpense}</span></div>
          <div><span className="text-zinc-600">Deductible:</span><span className="font-bold text-green-700 ml-2">$ {result.deductionAllowed}</span></div>
          <div><span className="text-zinc-600">Limited:</span><span className="font-bold text-red-700 ml-2">$ {result.deductionLimited}</span></div>
          <div><span className="text-zinc-600">Carryforward:</span><span className="font-medium ml-2">$ {result.carryforwardAmount}</span></div>
          <div><span className="text-zinc-600">Tax Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavingsThisYear}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.limitationReason}</div>
      </div>

      {Number(result.carryforwardAmount) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Carryforward Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Year</th>
                  <th className="py-2 text-left">Projected Income</th>
                  <th className="py-2 text-left">Deduction</th>
                  <th className="py-2 text-left">Remaining</th>
                  <th className="py-2 text-left">Tax Savings</th>
                </tr>
              </thead>
              <tbody>
                {result.carryforwardSchedule.map((c) => (
                  <tr key={c.year} className="border-b">
                    <td className="py-1">{c.year}</td>
                    <td className="py-1">$ {c.projectedIncome}</td>
                    <td className="py-1 font-semibold">$ {c.deduction}</td>
                    <td className="py-1">$ {c.remaining}</td>
                    <td className="py-1">$ {c.taxSavings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Interest Deduction Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Investment interest: net investment income limit</li>
          <li>Business interest: 30% ATI limit (TCJA)</li>
          <li>Mortgage interest: $750k acquisition limit</li>
          <li>Home equity interest not deductible</li>
          <li>Investment/business carryforward indefinite</li>
          <li>Form 4952 for investment interest</li>
          <li>Form 8990 for business interest</li>
          <li>Must itemize for mortgage deduction</li>
          <li>Track carryforward carefully</li>
          <li>Generate income to utilize carryforward</li>
        </ul>
      </div>
    </div>
  )
}