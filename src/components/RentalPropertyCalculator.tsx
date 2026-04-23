'use client'

import { useState } from 'react'

export default function RentalPropertyCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [loanRate, setLoanRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [operatingExpenses, setOperatingExpenses] = useState('')
  const [vacancyRate, setVacancyRate] = useState('')
  const [appreciationRate, setAppreciationRate] = useState('')
  const [analysisYears, setAnalysisYears] = useState('')

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 300000
    const down = parseFloat(downPayment) || 60000
    const rate = parseFloat(loanRate) || 6.5
    const term = parseInt(loanTerm) || 30
    const rent = parseFloat(monthlyRent) || 2500
    const expenses = parseFloat(operatingExpenses) || 500
    const vacancy = parseFloat(vacancyRate) || 5
    const appreciation = parseFloat(appreciationRate) || 3
    const years = parseInt(analysisYears) || 10

    // Loan calculations
    const loanAmount = price - down
    const monthlyRate = rate / 100 / 12
    const totalPayments = term * 12
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)

    // Monthly cash flow
    const effectiveRent = rent * (1 - vacancy / 100)
    const grossIncome = effectiveRent
    const netOperatingIncome = grossIncome - expenses
    const cashFlow = netOperatingIncome - monthlyPayment

    // Annual figures
    const annualCashFlow = cashFlow * 12
    const annualNOI = netOperatingIncome * 12

    // Cap rate
    const capRate = (annualNOI / price) * 100

    // Cash on cash return
    const cashOnCash = (annualCashFlow / down) * 100

    // DSCR (Debt Service Coverage Ratio)
    const dscr = annualNOI / (monthlyPayment * 12)

    // 50% rule check
    const fiftyPercentExpense = grossIncome * 0.5
    const fiftyPercentCashFlow = grossIncome * 0.5 - monthlyPayment

    // Appreciation projection
    const futureValue = price * Math.pow(1 + appreciation / 100, years)
    const appreciationGain = futureValue - price

    // Total return over period
    const totalCashFlow = annualCashFlow * years
    const loanBalanceAfterYears = loanAmount * (Math.pow(1 + monthlyRate, totalPayments) -
      Math.pow(1 + monthlyRate, years * 12)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    const equityBuilt = loanAmount - loanBalanceAfterYears
    const totalEquity = appreciationGain + equityBuilt
    const totalProfit = totalCashFlow + totalEquity
    const totalReturnPercent = (totalProfit / down) * 100

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      monthlyCashFlow: cashFlow.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2),
      capRate: capRate.toFixed(1),
      cashOnCash: cashOnCash.toFixed(1),
      dscr: dscr.toFixed(2),
      noi: annualNOI.toFixed(2),
      grossIncome: grossIncome.toFixed(2),
      fiftyPercentCashFlow: fiftyPercentCashFlow.toFixed(2),
      futureValue: futureValue.toFixed(2),
      appreciationGain: appreciationGain.toFixed(2),
      totalCashFlow: totalCashFlow.toFixed(2),
      totalEquity: totalEquity.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      totalReturnPercent: totalReturnPercent.toFixed(1),
      downPayment: down.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      isPositiveCashFlow: cashFlow > 0,
      meetsDSCR: dscr >= 1.25
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Rental Property ROI Calculator</h1>
      <p className="text-zinc-600">Analyze rental property investment returns including cap rate, cash flow, and appreciation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter property price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Down Payment</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter down payment amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Interest Rate (%)</label>
            <input
              type="number"
              value={loanRate}
              onChange={(e) => setLoanRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter mortgage rate"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Rent</label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Expected monthly rent"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Operating Expenses (Monthly)</label>
            <input
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Maintenance, taxes, insurance, etc."
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Vacancy Rate (%)</label>
            <input
              type="number"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Expected vacancy percentage"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Appreciation Rate (%)</label>
            <input
              type="number"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Annual appreciation rate"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Monthly Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Payment</div>
            <div className="text-2xl font-bold">$${result.monthlyPayment}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Cash Flow</div>
            <div className={`text-2xl font-bold ${result.isPositiveCashFlow ? 'text-green-600' : 'text-red-600'}`}>
              $${result.monthlyCashFlow}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective Rent</div>
            <div className="text-lg font-bold">$${result.grossIncome}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Net Operating Income</div>
            <div className="text-lg font-bold">$${result.noi}/yr</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investment Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Cap Rate</div>
            <div className="text-2xl font-bold">{result.capRate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Cash-on-Cash Return</div>
            <div className={`text-2xl font-bold ${parseFloat(result.cashOnCash) > 8 ? 'text-green-600' : 'text-zinc-800'}`}>
              {result.cashOnCash}%
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">DSCR</div>
            <div className={`text-2xl font-bold ${result.meetsDSCR ? 'text-green-600' : 'text-red-600'}`}>
              {result.dscr}
            </div>
            <div className="text-xs text-zinc-400">{result.meetsDSCR ? 'Meets 1.25 minimum' : 'Below 1.25 threshold'}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Cash Flow</div>
            <div className={`text-2xl font-bold ${result.isPositiveCashFlow ? 'text-green-600' : 'text-red-600'}`}>
              $${result.annualCashFlow}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">10-Year Projection</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Future Value</div>
            <div className="font-bold">$${result.futureValue}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Appreciation Gain</div>
            <div className="font-bold text-green-600">$${result.appreciationGain}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Cash Flow</div>
            <div className="font-bold">$${result.totalCashFlow}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Equity Built</div>
            <div className="font-bold">$${result.totalEquity}</div>
          </div>
          <div className="bg-white rounded p-3 col-span-2">
            <div className="text-zinc-500">Total Return</div>
            <div className="font-bold text-green-600">$${result.totalProfit} ({result.totalReturnPercent}%)</div>
          </div>
        </div>
      </div>

      {result.isPositiveCashFlow ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Positive Cash Flow</h3>
          <div className="text-sm text-green-600">
            Property generates $${result.annualCashFlow}/year cash flow. Cash-on-cash return of {result.cashOnCash}% on your $${result.downPayment} investment.
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Negative Cash Flow</h3>
          <div className="text-sm text-red-600">
            Property costs $${Math.abs(parseFloat(result.annualCashFlow))}/year. You'll need to cover expenses from other income or consider increasing rent.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Rules</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>1% Rule</strong>
            <div className="text-zinc-500">Monthly rent should be at least 1% of purchase price. Target: $${(parseFloat(purchasePrice || '300000') / 100).toFixed(0)}</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>50% Rule</strong>
            <div className="text-zinc-500">Operating expenses roughly 50% of rent. Expected cash flow: $${result.fiftyPercentCashFlow}</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>DSCR Minimum</strong>
            <div className="text-zinc-500">Lenders typically require 1.25 or higher. Current: {result.dscr}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operating Expenses</h3>
        <div className="text-xs text-zinc-600">
          Include: property taxes, insurance, maintenance, property management (8-10%), HOA fees, utilities (if landlord pays), vacancy allowance, repairs. Budget 5-10% of rent for capital expenditures (roof, HVAC, etc.).
        </div>
      </div>
    </main>
  )
}