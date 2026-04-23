'use client'

import { useState } from 'react'

export default function CreditCardInterestCalculator() {
  const [balance, setBalance] = useState('5000')
  const [apr, setApr] = useState('24.99')
  const [monthlyPayment, setMonthlyPayment] = useState('150')
  const [newCharges, setNewCharges] = useState('0')
  const [cardType, setCardType] = useState('standard')
  const [gracePeriod, setGracePeriod] = useState('25')

  const calculate = () => {
    const principal = parseFloat(balance) || 0
    const rate = parseFloat(apr) || 0
    const payment = parseFloat(monthlyPayment) || 0
    const charges = parseFloat(newCharges) || 0
    const grace = parseFloat(gracePeriod) || 25

    const dailyRate = rate / 100 / 365
    const monthlyRate = rate / 100 / 12

    // Minimum payment calculation (typically 2-3% of balance or $25)
    const minPaymentPercent = cardType === 'standard' ? 2 : 1.5
    const minPaymentFloor = 25
    const minimumPayment = Math.max(principal * (minPaymentPercent / 100), minPaymentFloor)

    // Calculate payoff timeline
    let currentBalance = principal
    let months = 0
    let totalInterest = 0
    let totalPayments = 0

    const monthlyDetails = []

    while (currentBalance > 0 && months < 600) {
      months++
      const monthInterest = currentBalance * monthlyRate
      totalInterest += monthInterest

      currentBalance += monthInterest + charges

      const actualPayment = Math.min(payment, currentBalance)
      currentBalance -= actualPayment
      totalPayments += actualPayment

      if (months <= 12) {
        monthlyDetails.push({
          month: months,
          balance: currentBalance.toFixed(2),
          interest: monthInterest.toFixed(2),
          payment: actualPayment.toFixed(2),
        })
      }

      if (currentBalance < 0) currentBalance = 0
    }

    // Calculate if paying minimum only
    let minBalance = principal
    let minMonths = 0
    let minTotalInterest = 0

    while (minBalance > 0 && minMonths < 600) {
      minMonths++
      const monthInterest = minBalance * monthlyRate
      minTotalInterest += monthInterest
      minBalance += monthInterest
      const minPay = Math.max(minBalance * (minPaymentPercent / 100), minPaymentFloor)
      minBalance -= Math.min(minPay, minBalance)
    }

    // Interest if no payment made for N months
    const interestIfNoPayment = principal * (1 + monthlyRate) ** 6 - principal

    // Daily interest cost
    const dailyInterest = principal * dailyRate

    // Grace period analysis
    const gracePeriodBenefit = grace > 0 ? 'No interest if paid in full by due date' : 'Interest starts immediately'

    // Comparison: paying double
    const doublePayment = payment * 2
    let doubleBalance = principal
    let doubleMonths = 0
    let doubleInterest = 0

    while (doubleBalance > 0 && doubleMonths < 300) {
      doubleMonths++
      const monthInterest = doubleBalance * monthlyRate
      doubleInterest += monthInterest
      doubleBalance += monthInterest
      doubleBalance -= Math.min(doublePayment, doubleBalance)
    }

    // Total cost analysis
    const totalCost = principal + totalInterest
    const interestRatio = totalInterest / principal

    return {
      balance: principal.toFixed(2),
      apr: rate.toFixed(2),
      dailyRate: (dailyRate * 100).toFixed(4),
      monthlyRate: (monthlyRate * 100).toFixed(2),
      monthlyPayment: payment.toFixed(2),
      newCharges: charges.toFixed(2),
      minimumPayment: minimumPayment.toFixed(2),
      payoffMonths: months.toFixed(0),
      payoffYears: (months / 12).toFixed(1),
      totalInterest: totalInterest.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      totalCost: totalCost.toFixed(2),
      interestRatio: (interestRatio * 100).toFixed(0),
      minPayoffMonths: minMonths.toFixed(0),
      minPayoffYears: (minMonths / 12).toFixed(1),
      minTotalInterest: minTotalInterest.toFixed(2),
      interestIfNoPayment: interestIfNoPayment.toFixed(2),
      dailyInterest: dailyInterest.toFixed(2),
      gracePeriod: grace.toFixed(0),
      gracePeriodBenefit,
      doublePayment: doublePayment.toFixed(2),
      doublePayoffMonths: doubleMonths.toFixed(0),
      doubleInterestSaved: (totalInterest - doubleInterest).toFixed(2),
      cardType: cardType.charAt(0).toUpperCase() + cardType.slice(1),
      isMinimumPayment: payment <= minimumPayment,
      paymentCoverInterest: payment > principal * monthlyRate,
      monthlyDetails,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Credit Card Interest Calculator</h1>
      <p className="text-zinc-600">Calculate credit card interest costs, payoff timeline, and compare minimum vs actual payments. Understand daily interest, grace periods, and how much interest you'll pay over time.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Card Balance & Rate</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Balance ($)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">APR (%)</label>
            <input
              type="number"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              className="input"
              min="0"
              max="40"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Typical rates: 15-25% (standard), 25-30% (store cards). Check your statement.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Card Type</label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="input"
            >
              <option value="standard">Standard Credit Card (min payment ~2%)</option>
              <option value="store">Store Card (min payment ~1.5%, higher APR)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Payment Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Payment ($)</label>
            <input
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">New Monthly Charges ($)</label>
            <input
              type="number"
              value={newCharges}
              onChange={(e) => setNewCharges(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Amount you add to balance each month. Set to 0 for payoff calculation.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Grace Period (Days)</label>
            <input
              type="number"
              value={gracePeriod}
              onChange={(e) => setGracePeriod(e.target.value)}
              className="input"
              min="0"
              max="30"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Days between statement and due date. Pay in full = no interest.
            </div>
          </div>
        </div>
      </div>

      {result.isMinimumPayment && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Warning: Near Minimum Payment</h3>
          <div className="text-sm text-red-600">
            Your payment of ${result.monthlyPayment} is close to or below the minimum ${result.minimumPayment}. Payoff will take much longer.
          </div>
        </div>
      )}

      {!result.paymentCoverInterest && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Warning: Payment Below Interest</h3>
          <div className="text-sm text-red-600">
            Your monthly payment doesn't cover monthly interest. Balance will grow indefinitely. Increase payment to at least ${((parseFloat(result.balance) * parseFloat(result.monthlyRate) / 100) + 1).toFixed(0)}.
          </div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Interest Rate Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">APR:</span>
            <span className="font-medium ml-2">{result.apr}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly Rate:</span>
            <span className="font-medium ml-2">{result.monthlyRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Daily Rate:</span>
            <span className="font-medium ml-2">{result.dailyRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Daily Interest:</span>
            <span className="font-bold ml-2">${result.dailyInterest}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Payoff Timeline</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Months to Payoff:</span>
            <span className="font-bold ml-2">{result.payoffMonths} months ({result.payoffYears} years)</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Payments:</span>
            <span className="font-medium ml-2">${result.totalPayments}</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Total Interest Cost</h3>
        <div className="text-2xl font-bold text-red-800">${result.totalInterest}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Total Cost:</span>
            <span className="font-medium ml-2">${result.totalCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Interest % of Principal:</span>
            <span className="font-bold ml-2">{result.interestRatio}%</span>
          </div>
        </div>
        <div className="text-xs text-red-600 mt-2">
          You'll pay {result.interestRatio}% of your original balance in interest alone.
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Minimum Payment Trap</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Minimum Payment:</span>
            <span className="font-medium ml-2">${result.minimumPayment}</span>
          </div>
          <div>
            <span className="text-zinc-600">Min Payoff Time:</span>
            <span className="font-bold ml-2">{result.minPayoffMonths} months ({result.minPayoffYears} years)</span>
          </div>
          <div>
            <span className="text-zinc-600">Min Total Interest:</span>
            <span className="font-bold ml-2">${result.minTotalInterest}</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Minimum payments barely cover interest, leading to years of debt and massive interest costs.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Pay More to Save</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Double Payment:</span>
            <span className="font-medium ml-2">${result.doublePayment}</span>
          </div>
          <div>
            <span className="text-zinc-600">Double Payoff:</span>
            <span className="font-medium ml-2">{result.doublePayoffMonths} months</span>
          </div>
          <div>
            <span className="text-zinc-600">Interest Saved:</span>
            <span className="font-bold ml-2">${result.doubleInterestSaved}</span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Doubling your payment dramatically reduces payoff time and interest.
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Grace Period Benefit</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Grace Period:</span>
            <span className="font-medium ml-2">{result.gracePeriod} days</span>
          </div>
        </div>
        <div className="text-sm text-teal-600">{result.gracePeriodBenefit}</div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">First 12 Months Detail</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Month</th>
                <th className="text-left p-2">Balance</th>
                <th className="text-left p-2">Interest</th>
                <th className="text-left p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {result.monthlyDetails.map((row) => (
                <tr key={row.month} className="border-b">
                  <td className="p-2">{row.month}</td>
                  <td className="p-2">${row.balance}</td>
                  <td className="p-2">${row.interest}</td>
                  <td className="p-2">${row.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Card Interest Facts</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Daily Compounding:</strong> Interest calculated daily on balance. APR divided by 365 = daily rate.</li>
          <li><strong>Grace Period:</strong> Pay full statement balance by due date = NO interest on purchases.</li>
          <li><strong>No Grace Period:</strong> If carrying balance, interest starts on new purchases immediately.</li>
          <li><strong>Minimum Payment Trap:</strong> 2-3% minimum barely covers interest. Takes 10+ years to pay off.</li>
          <li><strong>Interest on Interest:</strong> Unpaid interest added to balance, increasing next month's interest.</li>
          <li><strong>Balance Transfer:</strong> Transfer to 0% APR card to stop interest (usually 3-5% transfer fee).</li>
          <li><strong>Average APR:</strong> 24%+ on standard cards. Store cards can be 30%+.</li>
          <li><strong>Pay Extra:</strong> Even $50 more per month saves hundreds in interest and years of time.</li>
        </ul>
      </div>
    </main>
  )
}