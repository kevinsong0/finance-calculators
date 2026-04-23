'use client'

import { useState } from 'react'

export default function HomeEquityLoanCalculator() {
  const [homeValue, setHomeValue] = useState('')
  const [currentMortgageBalance, setCurrentMortgageBalance] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [loanType, setLoanType] = useState('heloc')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [drawPeriod, setDrawPeriod] = useState('')
  const [creditScore, setCreditScore] = useState('')

  const calculate = () => {
    const value = parseFloat(homeValue) || 400000
    const mortgage = parseFloat(currentMortgageBalance) || 200000
    const requestedLoan = parseFloat(loanAmount) || 50000
    const type = loanType
    const rate = parseFloat(interestRate) || (type === 'heloc' ? 8.5 : 9.0)
    const term = parseInt(loanTerm) || (type === 'heloc' ? 20 : 15)
    const draw = parseInt(drawPeriod) || 10
    const score = parseInt(creditScore) || 750

    // Calculate home equity
    const equity = value - mortgage
    const equityPercentage = (equity / value) * 100

    // LTV limits (typically 80-85% for HELOC, 80-90% for home equity loan)
    const maxLtv = type === 'heloc' ? 0.85 : 0.80
    const maxCombinedLtv = value * maxLtv
    const maxLoanAmount = maxCombinedLtv - mortgage
    const actualLoanAmount = Math.min(requestedLoan, maxLoanAmount)

    // New combined debt
    const totalDebtAfterLoan = mortgage + actualLoanAmount
    const combinedLtv = (totalDebtAfterLoan / value) * 100

    // Calculate payments
    const monthlyRate = rate / 100 / 12

    // HELOC: Draw period + repayment period
    let monthlyPayment = 0
    let drawPayment = 0
    let repaymentPayment = 0

    if (type === 'heloc') {
      // Draw period: Interest only on drawn amount (assume full draw)
      drawPayment = actualLoanAmount * monthlyRate
      // Repayment period: Principal + interest
      const repaymentMonths = (term - draw) * 12
      repaymentPayment = actualLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) / (Math.pow(1 + monthlyRate, repaymentMonths) - 1)
      monthlyPayment = drawPayment // During draw period
    } else {
      // Home equity loan: Fixed term amortizing
      const totalMonths = term * 12
      monthlyPayment = actualLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    // Total interest over life of loan
    let totalInterest = 0
    let totalPayments = 0

    if (type === 'heloc') {
      // Interest during draw + interest/principal during repayment
      const drawInterest = drawPayment * draw * 12
      const repaymentInterest = repaymentPayment * (term - draw) * 12 - actualLoanAmount
      totalInterest = drawInterest + repaymentInterest
      totalPayments = drawPayment * draw * 12 + repaymentPayment * (term - draw) * 12
    } else {
      totalPayments = monthlyPayment * term * 12
      totalInterest = totalPayments - actualLoanAmount
    }

    // Credit score impact on rate
    const rateAdjustment = score >= 740 ? -0.5 : score >= 700 ? 0 : score >= 660 ? 0.5 : 1.0
    const adjustedRate = rate + rateAdjustment

    // Comparison with alternatives
    const personalLoanRate = 12 // Typical personal loan rate
    const creditCardRate = 20 // Typical credit card rate
    const personalLoanPayment = actualLoanAmount * ((personalLoanRate / 100 / 12) * Math.pow(1 + personalLoanRate / 100 / 12, 60)) / (Math.pow(1 + personalLoanRate / 100 / 12, 60) - 1)
    const creditCardInterest = actualLoanAmount * (creditCardRate / 100 / 12)

    // Tax deduction eligibility (interest on home equity debt used for home improvement)
    const taxDeductible = true // If used for home improvement
    const taxSavings = totalInterest * 0.22 // Assume 22% marginal rate

    return {
      homeValue: value.toFixed(2),
      currentMortgage: mortgage.toFixed(2),
      equity: equity.toFixed(2),
      equityPercentage: equityPercentage.toFixed(1),
      requestedLoan: requestedLoan.toFixed(2),
      actualLoanAmount: actualLoanAmount.toFixed(2),
      maxLoanAmount: maxLoanAmount.toFixed(2),
      totalDebtAfterLoan: totalDebtAfterLoan.toFixed(2),
      combinedLtv: combinedLtv.toFixed(1),
      maxLtv: (maxLtv * 100).toFixed(0),
      loanType: type,
      interestRate: rate.toFixed(2),
      adjustedRate: adjustedRate.toFixed(2),
      loanTerm: term,
      drawPeriod: draw,
      drawPayment: drawPayment.toFixed(2),
      repaymentPayment: repaymentPayment.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      creditScore: score,
      personalLoanPayment: personalLoanPayment.toFixed(2),
      creditCardInterest: creditCardInterest.toFixed(2),
      savingsVsPersonal: ((personalLoanPayment * 5 * 12) - totalPayments).toFixed(2),
      savingsVsCreditCard: ((creditCardInterest * 60) - totalInterest).toFixed(2),
      taxDeductible,
      taxSavings: taxDeductible ? taxSavings.toFixed(2) : '0',
      canQualify: score >= 620 && equityPercentage >= 15,
      closingCosts: (actualLoanAmount * 0.02).toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Home Equity Loan Calculator</h1>
      <p className="text-zinc-600">Calculate HELOC vs home equity loan options, payments, and compare with alternatives.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Home Value</label>
            <input
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current home value"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Mortgage Balance</label>
            <input
              type="number"
              value={currentMortgageBalance}
              onChange={(e) => setCurrentMortgageBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter remaining mortgage"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Desired Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter amount needed"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Credit Score</label>
            <input
              type="number"
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter credit score"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Loan Options</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Type</label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="heloc">HELOC (Variable rate, flexible access)</option>
              <option value="home_equity">Home Equity Loan (Fixed rate, lump sum)</option>
            </select>
          </div>
          {result.loanType === 'heloc' && (
            <>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Draw Period (years)</label>
                <select
                  value={drawPeriod}
                  onChange={(e) => setDrawPeriod(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="5">5 years</option>
                  <option value="10">10 years (Standard)</option>
                  <option value="15">15 years</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter rate (or use estimate)"
            />
            <div className="text-xs text-zinc-500 mt-1">
              HELOC: 8-10% variable. Home Equity: 8-12% fixed. Rates vary by credit score.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Term (years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Equity Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Home Value</span>
            <span className="font-bold">$${result.homeValue}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Current Mortgage</span>
            <span className="font-bold">$${result.currentMortgage}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Available Equity</span>
            <span className="font-bold text-green-600">$${result.equity}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Equity Percentage</span>
            <span className="font-bold">{result.equityPercentage}%</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Maximum Loan Available</span>
            <span className="font-bold text-blue-600">$${result.maxLoanAmount}</span>
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            LTV limit: {result.maxLtv}% combined (mortgage + equity loan)
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Loan Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Loan Amount</div>
            <div className="text-2xl font-bold">$${result.actualLoanAmount}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Adjusted Rate</div>
            <div className="text-2xl font-bold">{result.adjustedRate}%</div>
            <div className="text-xs text-zinc-400">Based on credit score</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Combined LTV</div>
            <div className="text-2xl font-bold">{result.combinedLtv}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Closing Costs</div>
            <div className="text-2xl font-bold">$${result.closingCosts}</div>
          </div>
        </div>
      </div>

      {result.loanType === 'heloc' ? (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">HELOC Payments</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 rounded p-4">
              <div className="text-sm text-zinc-500">Draw Period (Interest Only)</div>
              <div className="text-2xl font-bold">$${result.drawPayment}/mo</div>
              <div className="text-xs text-zinc-400">{result.drawPeriod} years</div>
            </div>
            <div className="bg-blue-50 rounded p-4">
              <div className="text-sm text-zinc-500">Repayment Period</div>
              <div className="text-2xl font-bold text-blue-600">$${result.repaymentPayment}/mo</div>
              <div className="text-xs text-zinc-400">{result.loanTerm - result.drawPeriod} years</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Home Equity Loan Payment</h3>
          <div className="bg-blue-50 rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Payment (Fixed)</div>
            <div className="text-3xl font-bold text-blue-600">$${result.monthlyPayment}</div>
            <div className="text-xs text-zinc-400">{result.loanTerm} years, {result.adjustedRate}% rate</div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Cost Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 rounded p-4">
            <div className="text-sm text-zinc-500">Total Interest</div>
            <div className="text-2xl font-bold text-red-600">$${result.totalInterest}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Payments</div>
            <div className="text-2xl font-bold">$${result.totalPayments}</div>
          </div>
          {result.taxDeductible && (
            <div className="bg-green-50 rounded p-4">
              <div className="text-sm text-zinc-500">Tax Savings (22%)</div>
              <div className="text-2xl font-bold text-green-600">$${result.taxSavings}</div>
              <div className="text-xs text-zinc-400">If used for home improvement</div>
            </div>
          )}
        </div>
      </div>

      {result.canQualify ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Qualification Likely</h3>
          <div className="text-sm text-green-600">
            Credit score {result.creditScore} and {result.equityPercentage}% equity meet typical lender requirements. Rate estimate: {result.adjustedRate}%. Shop multiple lenders for best rates. Watch for HELOC variable rate increases.
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Qualification Challenges</h3>
          <div className="text-sm text-red-600">
            {result.creditScore < 620 ? `Credit score ${result.creditScore} below 620 minimum.` : `Equity ${result.equityPercentage}% below 15% minimum.`} Consider improving credit, increasing equity, or exploring alternatives like personal loans.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Alternative Comparison</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Home Equity</strong>
            <div className="text-zinc-500">$${result.monthlyPayment}/mo</div>
            <div className="text-zinc-500">Lower rate, tax deductible</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Personal Loan</strong>
            <div className="text-zinc-500">$${result.personalLoanPayment}/mo</div>
            <div className="text-zinc-500">No collateral, higher rate</div>
          </div>
          <div className="bg-red-50 rounded p-3">
            <strong>Credit Card</strong>
            <div className="text-zinc-500">$${result.creditCardInterest}/mo (interest only)</div>
            <div className="text-zinc-500">Highest rate, avoid</div>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Savings vs personal loan: $${result.savingsVsPersonal}. Savings vs credit card: $${result.savingsVsCreditCard}.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">HELOC vs Home Equity Loan</h3>
        <div className="text-xs text-zinc-600">
          HELOC: Variable rate, flexible access during draw period, interest-only payments possible, reusable credit line, risk of rate increases. Home Equity Loan: Fixed rate, lump sum disbursement, fixed payments, predictable costs, one-time borrowing. Choose HELOC for ongoing needs, home equity loan for one-time expense.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Uses & Risks</h3>
        <div className="text-xs text-zinc-600">
          Good uses: Home improvements (tax deductible), debt consolidation (lower rate), emergency fund access. Risks: Variable HELOC rates can rise, home as collateral (foreclosure risk), closing costs (~2-5%), resetting mortgage clock if refinancing. Avoid: Vacations, luxury purchases, speculative investments. Protect your home.
        </div>
      </div>
    </main>
  )
}