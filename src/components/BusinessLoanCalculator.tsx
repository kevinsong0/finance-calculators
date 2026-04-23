'use client'

import { useState } from 'react'

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [loanType, setLoanType] = useState('term')
  const [paymentFrequency, setPaymentFrequency] = useState('monthly')

  const calculate = () => {
    const amount = parseFloat(loanAmount) || 100000
    const rate = parseFloat(interestRate) || 8
    const term = parseInt(loanTerm) || 5
    const type = loanType
    const freq = paymentFrequency

    // Calculate based on loan type
    const annualRate = rate / 100
    const periodsPerYear = freq === 'monthly' ? 12 : freq === 'quarterly' ? 4 : 52
    const totalPeriods = term * periodsPerYear
    const periodRate = annualRate / periodsPerYear

    let paymentPerPeriod = 0
    let totalInterest = 0
    let totalPayment = 0

    if (type === 'term') {
      // Term loan - fixed amortizing payments
      if (periodRate > 0) {
        paymentPerPeriod = amount * periodRate * Math.pow(1 + periodRate, totalPeriods) /
          (Math.pow(1 + periodRate, totalPeriods) - 1)
      } else {
        paymentPerPeriod = amount / totalPeriods
      }
      totalPayment = paymentPerPeriod * totalPeriods
      totalInterest = totalPayment - amount
    } else if (type === 'line') {
      // Business line of credit - interest only
      paymentPerPeriod = amount * periodRate
      totalInterest = paymentPerPeriod * totalPeriods
      totalPayment = amount + totalInterest // Principal due at end
    } else if (type === 'sba') {
      // SBA loan - typically lower rates, longer terms
      const sbaRate = rate / 100
      const sbaPeriodRate = sbaRate / periodsPerYear
      if (sbaPeriodRate > 0) {
        paymentPerPeriod = amount * sbaPeriodRate * Math.pow(1 + sbaPeriodRate, totalPeriods) /
          (Math.pow(1 + sbaPeriodRate, totalPeriods) - 1)
      } else {
        paymentPerPeriod = amount / totalPeriods
      }
      totalPayment = paymentPerPeriod * totalPeriods
      totalInterest = totalPayment - amount
    }

    // Annual figures
    const annualPayment = paymentPerPeriod * periodsPerYear
    const annualInterest = amount * annualRate

    // Debt service coverage ratio estimate
    const requiredIncome = annualPayment * 1.25

    // Effective APR (includes fees estimate)
    const estimatedFees = amount * 0.03 // 3% origination fee
    const effectiveAmount = amount - estimatedFees
    const effectiveRate = ((totalInterest + estimatedFees) / effectiveAmount / term) * 100

    return {
      paymentPerPeriod: paymentPerPeriod.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      annualPayment: annualPayment.toFixed(2),
      annualInterest: annualInterest.toFixed(2),
      loanAmount: amount.toFixed(2),
      effectiveRate: effectiveRate.toFixed(1),
      requiredIncome: requiredIncome.toFixed(2),
      paymentFrequency: freq,
      loanType: type,
      termYears: term,
      principalDue: type === 'line' ? amount.toFixed(2) : '0',
      estimatedFees: estimatedFees.toFixed(2),
      totalCost: (totalPayment + (type === 'line' ? 0 : 0) + estimatedFees).toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Loan Calculator</h1>
      <p className="text-zinc-600">Calculate business loan payments, total costs, and analyze financing options.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Loan Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Type</label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="term">Term Loan</option>
              <option value="line">Business Line of Credit</option>
              <option value="sba">SBA Loan (7a)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual interest rate"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Term (Years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="5">5 Years</option>
              <option value="7">7 Years</option>
              <option value="10">10 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Payment Frequency</label>
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Payment Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">{result.paymentFrequency === 'monthly' ? 'Monthly' : result.paymentFrequency === 'quarterly' ? 'Quarterly' : 'Weekly'} Payment</div>
            <div className="text-2xl font-bold text-green-600">$${result.paymentPerPeriod}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Payment</div>
            <div className="text-2xl font-bold">$${result.annualPayment}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Interest</div>
            <div className="text-2xl font-bold text-red-600">$${result.totalInterest}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Cost</div>
            <div className="text-2xl font-bold">$${result.totalCost}</div>
          </div>
        </div>
      </div>

      {result.loanType === 'line' && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Line of Credit Note</h3>
          <div className="text-sm text-yellow-600">
            Payments are interest-only. Principal of $${result.principalDue} due at end of term or upon draw repayment. You only pay interest on drawn funds.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Loan Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Loan Amount</div>
            <div className="font-bold">$${result.loanAmount}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Est. Origination Fee</div>
            <div className="font-bold">$${result.estimatedFees}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Effective Rate</div>
            <div className="font-bold">{result.effectiveRate}%</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Min. Income (1.25x)</div>
            <div className="font-bold">$${result.requiredIncome}/yr</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Loan Types Comparison</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Term Loan</strong>
            <div className="text-zinc-500">Fixed payments, full amortization. Best for equipment, expansion. Rates: 6-13%</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Line of Credit</strong>
            <div className="text-zinc-500">Flexible draw, interest-only. Best for working capital, inventory. Rates: 7-25%</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>SBA 7(a) Loan</strong>
            <div className="text-zinc-500">Government-backed, lower rates. Best for startups, real estate. Rates: prime + 2.25-4.75%</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Qualification Factors</h3>
        <div className="text-xs text-zinc-600">
          Lenders consider: credit score (680+ preferred), time in business (2+ years), annual revenue, debt service coverage ratio (1.25x), collateral, industry risk. SBA loans require more documentation but offer better terms.
        </div>
      </div>
    </main>
  )
}