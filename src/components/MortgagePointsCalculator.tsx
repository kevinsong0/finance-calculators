'use client'

import { useState } from 'react'

export default function MortgagePointsCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [pointsToBuy, setPointsToBuy] = useState(1)
  const [costPerPoint, setCostPerPoint] = useState(1) // 1% of loan
  const [loanTerm, setLoanTerm] = useState(30)
  const [yearsInHome, setYearsInHome] = useState(7)

  const calculate = () => {
    // Point cost calculation
    const pointCost = (loanAmount * costPerPoint / 100) * pointsToBuy
    const rateWithPoints = interestRate - (pointsToBuy * 0.25) // Each point reduces rate by ~0.25%

    // Monthly payment without points
    const monthlyRateNoPoints = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    const paymentNoPoints = loanAmount *
      (monthlyRateNoPoints * Math.pow(1 + monthlyRateNoPoints, numPayments)) /
      (Math.pow(1 + monthlyRateNoPoints, numPayments) - 1)

    // Monthly payment with points
    const monthlyRateWithPoints = rateWithPoints / 100 / 12
    const paymentWithPoints = loanAmount *
      (monthlyRateWithPoints * Math.pow(1 + monthlyRateWithPoints, numPayments)) /
      (Math.pow(1 + monthlyRateWithPoints, numPayments) - 1)

    // Monthly savings
    const monthlySavings = paymentNoPoints - paymentWithPoints

    // Break-even calculation
    const breakEvenMonths = pointCost / monthlySavings
    const breakEvenYears = breakEvenMonths / 12

    // Total interest paid comparison
    const totalInterestNoPoints = (paymentNoPoints * numPayments) - loanAmount
    const totalInterestWithPoints = (paymentWithPoints * numPayments) - loanAmount
    const interestSavings = totalInterestNoPoints - totalInterestWithPoints

    // Net savings over time in home
    const monthsInHome = yearsInHome * 12
    const totalSavingsIfStay = monthlySavings * monthsInHome
    const netSavings = totalSavingsIfStay - pointCost

    // Recommendation
    let recommendation = ''
    if (breakEvenYears < yearsInHome) {
      recommendation = `BUY POINTS: You'll break even in ${breakEvenYears.toFixed(1)} years and save $${netSavings.toFixed(0)} over ${yearsInHome} years.`
    } else {
      recommendation = `SKIP POINTS: Break-even takes ${breakEvenYears.toFixed(1)} years, longer than your planned stay of ${yearsInHome} years.`
    }

    // Effective rate considering point cost
    const totalCostWithPoints = loanAmount + pointCost + totalInterestWithPoints
    const effectiveRate = ((totalCostWithPoints / loanAmount - 1) / loanTerm) * 100

    return {
      loanAmount: loanAmount.toFixed(0),
      interestRate: interestRate.toFixed(2),
      pointsToBuy: pointsToBuy.toFixed(1),
      rateWithPoints: rateWithPoints.toFixed(3),
      pointCost: pointCost.toFixed(0),
      paymentNoPoints: paymentNoPoints.toFixed(2),
      paymentWithPoints: paymentWithPoints.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      breakEvenMonths: breakEvenMonths.toFixed(0),
      breakEvenYears: breakEvenYears.toFixed(1),
      totalInterestNoPoints: totalInterestNoPoints.toFixed(0),
      totalInterestWithPoints: totalInterestWithPoints.toFixed(0),
      interestSavings: interestSavings.toFixed(0),
      yearsInHome: yearsInHome.toFixed(0),
      netSavings: netSavings.toFixed(0),
      recommendation,
      loanTerm: loanTerm.toFixed(0),
      effectiveRate: effectiveRate.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mortgage Points Calculator</h1>
      <p className="text-gray-600 mb-4">Decide whether buying mortgage points is worth it for your situation.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" value={interestRate} step="0.1" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Points to Buy</label>
          <input type="number" value={pointsToBuy} step="0.25" min="0" max="4" onChange={(e) => setPointsToBuy(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (years)</label>
          <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="30">30 years</option>
            <option value="20">20 years</option>
            <option value="15">15 years</option>
            <option value="10">10 years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years You Plan to Stay</label>
          <input type="number" value={yearsInHome} min="1" max="30" onChange={(e) => setYearsInHome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Points Cost vs Rate Reduction</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Points Purchased:</span><span className="font-medium ml-2">{result.pointsToBuy}</span></div>
          <div><span className="text-zinc-600">Point Cost:</span><span className="font-bold text-blue-700 ml-2">$ {result.pointCost}</span></div>
          <div><span className="text-zinc-600">Rate Without Points:</span><span className="font-medium ml-2">{result.interestRate}%</span></div>
          <div><span className="text-zinc-600">Rate With Points:</span><span className="font-bold text-green-700 ml-2">{result.rateWithPoints}%</span></div>
          <div><span className="text-zinc-600">Rate Reduction:</span><span className="font-medium ml-2">{(Number(result.pointsToBuy) * 0.25).toFixed(2)}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each point costs 1% of loan amount and reduces rate by ~0.25%.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Payment Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Payment (No Points):</span><span className="font-medium ml-2">$ {result.paymentNoPoints}</span></div>
          <div><span className="text-zinc-600">Payment (With Points):</span><span className="font-bold text-purple-700 ml-2">$ {result.paymentWithPoints}</span></div>
          <div><span className="text-zinc-600">Monthly Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.monthlySavings}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Break-Even Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Break-Even (months):</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenMonths}</span></div>
          <div><span className="text-zinc-600">Break-Even (years):</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenYears}</span></div>
          <div><span className="text-zinc-600">Your Planned Stay:</span><span className="font-medium ml-2">{result.yearsInHome} years</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Break-even: months until monthly savings equal the point cost.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Net Savings Over {result.yearsInHome} Years</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Total Interest (No Points):</span><span className="font-medium ml-2">$ {result.totalInterestNoPoints}</span></div>
          <div><span className="text-zinc-600">Total Interest (With Points):</span><span className="font-medium ml-2">$ {result.totalInterestWithPoints}</span></div>
          <div><span className="text-zinc-600">Interest Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.interestSavings}</span></div>
          <div><span className="text-zinc-600">Net Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.netSavings}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-teal-700">Recommendation</h2>
        <div className="text-sm font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Mortgage Points Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Points are upfront fees paid to lower your mortgage rate</li>
          <li>Each point = 1% of loan amount, reduces rate by ~0.25%</li>
          <li>Best for long-term homeowners: need to stay past break-even</li>
          <li>Points are tax-deductible as mortgage interest (primary residence)</li>
          <li>Negotiate: lenders may offer free points or lower point costs</li>
          <li>Compare: sometimes better to use that money for down payment</li>
        </ul>
      </div>
    </div>
  )
}