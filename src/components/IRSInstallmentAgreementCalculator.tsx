'use client'

import { useState } from 'react'

export default function IRSInstallmentAgreementCalculator() {
  const [totalDebt, setTotalDebt] = useState(25000)
  const [monthlyPayment, setMonthlyPayment] = useState(500)
  const [interestRate, setInterestRate] = useState(8)
  const [penaltyRate, setPenaltyRate] = useState(0.25)

  const calculate = () => {
    const interestMonthly = interestRate / 100 / 12
    const penaltyMonthly = penaltyRate / 100 / 12
    const totalMonthlyRate = interestMonthly + penaltyMonthly

    let remainingBalance = totalDebt
    let totalInterest = 0
    let totalPenalty = 0
    let months = 0
    const paymentSchedule: { month: number; payment: string; interest: string; penalty: string; balance: string }[] = []

    while (remainingBalance > 0 && months < 120) {
      months++
      const monthInterest = remainingBalance * interestMonthly
      const monthPenalty = remainingBalance * penaltyMonthly
      const monthTotalCharge = monthInterest + monthPenalty

      totalInterest += monthInterest
      totalPenalty += monthPenalty

      const actualPayment = Math.min(monthlyPayment, remainingBalance + monthTotalCharge)
      remainingBalance = remainingBalance + monthTotalCharge - actualPayment

      if (months <= 12) {
        paymentSchedule.push({
          month: months,
          payment: actualPayment.toFixed(2),
          interest: monthInterest.toFixed(2),
          penalty: monthPenalty.toFixed(2),
          balance: Math.max(0, remainingBalance).toFixed(2),
        })
      }
    }

    const totalPaid = months * monthlyPayment
    const additionalCost = totalInterest + totalPenalty
    const payoffMonths = months
    const payoffYears = months / 12
    const canPayIn6Years = months <= 72

    const minimumPayment = totalDebt / 72 + totalDebt * totalMonthlyRate
    const freshStartThreshold = 50000
    const eligibleForFreshStart = totalDebt <= freshStartThreshold

    return {
      totalDebt: totalDebt.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      interestRate: interestRate.toFixed(1),
      penaltyRate: penaltyRate.toFixed(2),
      payoffMonths: payoffMonths.toFixed(0),
      payoffYears: payoffYears.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPenalty: totalPenalty.toFixed(2),
      additionalCost: additionalCost.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      canPayIn6Years,
      minimumPayment: minimumPayment.toFixed(2),
      eligibleForFreshStart,
      freshStartThreshold: freshStartThreshold.toFixed(0),
      paymentSchedule,
      exceeds6Years: months > 72,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Installment Agreement Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRS payment plan costs, timeline, and requirements.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt ($)</label>
          <input
            type="number"
            value={totalDebt}
            onChange={(e) => setTotalDebt(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Payment ($)</label>
          <input
            type="number"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%/year)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full border rounded p-2"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Rate (%/month - IA reduced)</label>
          <input
            type="number"
            value={penaltyRate}
            onChange={(e) => setPenaltyRate(Number(e.target.value))}
            className="w-full border rounded p-2"
            step="0.01"
          />
          <p className="text-xs text-zinc-500">Installment agreement: penalty reduced from 0.5% to 0.25%</p>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Plan Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Debt:</span>
            <span className="font-medium ml-2">$ {result.totalDebt}</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly Payment:</span>
            <span className="font-medium ml-2">$ {result.monthlyPayment}</span>
          </div>
          <div>
            <span className="text-zinc-600">Payoff Time:</span>
            <span className="font-bold ml-2">{result.payoffMonths} months ({result.payoffYears} yrs)</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Cost of Payment Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Interest:</span>
            <span className="font-medium ml-2">$ {result.totalInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Penalty:</span>
            <span className="font-medium ml-2">$ {result.totalPenalty}</span>
          </div>
          <div>
            <span className="text-zinc-600">Additional Cost:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.additionalCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Paid:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalPaid}</span>
          </div>
          <div>
            <span className="text-zinc-600">Interest Rate:</span>
            <span className="font-medium ml-2">{result.interestRate}%/yr</span>
          </div>
          <div>
            <span className="text-zinc-600">Penalty Rate:</span>
            <span className="font-medium ml-2">{result.penaltyRate}%/mo</span>
          </div>
        </div>
        {result.exceeds6Years && (
          <div className="text-xs text-red-600 mt-3">
            Payment plan exceeds IRS 6-year limit ($50K max debt for streamlined). May need partial payment or different arrangement.
          </div>
        )}
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRS Requirements</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Minimum Payment (72 months):</span>
            <span className="font-bold ml-2">$ {result.minimumPayment}/mo</span>
          </div>
          <div>
            <span className="text-zinc-600">Fresh Start Eligible:</span>
            <span className={`font-bold ml-2 ${result.eligibleForFreshStart ? 'text-green-600' : 'text-red-600'}`}>
              {result.eligibleForFreshStart ? 'Yes' : 'No (over $50K)'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Installment Agreement Types</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Streamlined IA:</strong> Debt under $50K, no financial disclosure, 72 months max</li>
          <li><strong>Guaranteed IA:</strong> Debt under $10K, 36 months max, automatic approval</li>
          <li><strong>Regular IA:</strong> Over $50K requires Form 433-F financial disclosure</li>
          <li><strong>Partial Payment:</strong> Can't pay full amount, debt forgiven after term</li>
          <li><strong>Direct Debit:</strong> Automatic payments, penalty reduced to 0.25%</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Setup Fees</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Online application: $31 (reduced fee)</li>
          <li>Phone/mail application: $225</li>
          <li>Direct debit agreement: $31</li>
          <li>Low income: Fee waiver available</li>
          <li>Reinstatement after default: $89</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Benefits of Installment Agreement</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Penalty reduced from 0.5% to 0.25% per month</li>
          <li>Avoids enforced collection (levies, garnishment)</li>
          <li>Interest continues but lower penalty</li>
          <li>Stay compliant: file and pay future taxes on time</li>
          <li>Can request modification if circumstances change</li>
          <li>Fresh Start: easier approval for debts under $50K</li>
        </ul>
      </div>
    </div>
  )
}