'use client'

import { useState } from 'react'

export default function MortgageRefinanceBreakEvenCalculator() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState('300000')
  const [currentRate, setCurrentRate] = useState('7.5')
  const [currentRemainingTerm, setCurrentRemainingTerm] = useState('25')
  const [newRate, setNewRate] = useState('5.5')
  const [newTerm, setNewTerm] = useState('30')
  const [closingCosts, setClosingCosts] = useState('5000')
  const [pointsPurchased, setPointsPurchased] = useState('0')
  const [cashOut, setCashOut] = useState('0')
  const [originationFee, setOriginationFee] = useState('1')

  const calculate = () => {
    const balance = parseFloat(currentLoanBalance) || 0
    const currentR = parseFloat(currentRate) || 0
    const currentTerm = parseFloat(currentRemainingTerm) || 0
    const newR = parseFloat(newRate) || 0
    const newT = parseFloat(newTerm) || 0
    const closing = parseFloat(closingCosts) || 0
    const points = parseFloat(pointsPurchased) || 0
    const cashOutAmount = parseFloat(cashOut) || 0
    const origination = parseFloat(originationFee) || 0

    // Calculate points cost (1 point = 1% of loan)
    const pointsCost = balance * (points / 100)

    // Origination fee
    const originationCost = balance * (origination / 100)

    // Total refinancing cost
    const totalRefiCost = closing + pointsCost + originationCost

    // New loan amount (including cash out if applicable)
    const newLoanAmount = balance + cashOutAmount

    // Calculate monthly payments
    const calcMonthlyPayment = (principal: number, annualRate: number, termYears: number) => {
      if (annualRate === 0) return principal / (termYears * 12)
      const monthlyRate = annualRate / 100 / 12
      const numPayments = termYears * 12
      return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
             (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const currentMonthlyPayment = calcMonthlyPayment(balance, currentR, currentTerm)
    const newMonthlyPayment = calcMonthlyPayment(newLoanAmount, newR, newT)

    // Monthly savings (or increase)
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment

    // Break-even calculation (months to recoup costs)
    const breakEvenMonths = monthlySavings > 0 ? totalRefiCost / monthlySavings : Infinity

    // Calculate total interest over remaining term
    const currentTotalInterest = (currentMonthlyPayment * currentTerm * 12) - balance
    const newTotalInterest = (newMonthlyPayment * newT * 12) - newLoanAmount

    // Total interest difference (considering term extension)
    // If extending term, compare interest over same period vs full new term
    const newInterestOverCurrentTerm = (newMonthlyPayment * currentTerm * 12) - newLoanAmount
    const interestSavingsShortTerm = currentTotalInterest - newInterestOverCurrentTerm - totalRefiCost
    const interestSavingsFullTerm = currentTotalInterest - newTotalInterest - totalRefiCost

    // Net benefit analysis
    const netBenefitMonthly = monthlySavings * 12 - (totalRefiCost / breakEvenMonths * 12)

    // APR after refinance (including closing costs)
    const effectiveLoan = newLoanAmount + totalRefiCost
    const aprPayment = calcMonthlyPayment(effectiveLoan, newR, newT)
    const effectiveAPR = newLoanAmount > 0 ?
      ((aprPayment * newT * 12) / effectiveLoan - 1) / newT * 100 : newR

    // Recommendations
    const isWorthRefinancing = breakEvenMonths < currentTerm * 12 && monthlySavings > 0
    const recommendation = isWorthRefinancing ?
      `Refinance recommended. Break-even in ${Math.floor(breakEvenMonths)} months.` :
      monthlySavings > 0 ?
        `Break-even too long (${Math.floor(breakEvenMonths)} months). Consider if planning to stay longer.` :
        `Refinance not recommended. New payment is higher.`

    return {
      currentLoanBalance: balance.toFixed(2),
      currentRate: currentR.toFixed(2),
      currentRemainingTerm: currentTerm.toFixed(0),
      newRate: newR.toFixed(2),
      newTerm: newT.toFixed(0),
      closingCosts: closing.toFixed(2),
      pointsPurchased: points.toFixed(0),
      pointsCost: pointsCost.toFixed(2),
      originationFee: origination.toFixed(1),
      originationCost: originationCost.toFixed(2),
      totalRefiCost: totalRefiCost.toFixed(2),
      cashOut: cashOutAmount.toFixed(2),
      newLoanAmount: newLoanAmount.toFixed(2),
      currentMonthlyPayment: currentMonthlyPayment.toFixed(2),
      newMonthlyPayment: newMonthlyPayment.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      breakEvenMonths: breakEvenMonths === Infinity ? 'Never' : Math.floor(breakEvenMonths).toFixed(0),
      breakEvenYears: breakEvenMonths === Infinity ? 'Never' : (breakEvenMonths / 12).toFixed(1),
      currentTotalInterest: currentTotalInterest.toFixed(2),
      newTotalInterest: newTotalInterest.toFixed(2),
      newInterestOverCurrentTerm: newInterestOverCurrentTerm.toFixed(2),
      interestSavingsShortTerm: interestSavingsShortTerm.toFixed(2),
      interestSavingsFullTerm: interestSavingsFullTerm.toFixed(2),
      isWorthRefinancing,
      recommendation,
      effectiveAPR: effectiveAPR.toFixed(2),
      rateDifference: (currentR - newR).toFixed(2),
      termDifference: (newT - currentTerm).toFixed(0),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Mortgage Refinance Break-Even Calculator</h1>
      <p className="text-zinc-600">Calculate break-even time for mortgage refinancing. Understand total costs, monthly savings, interest savings, and when refinancing makes sense based on your timeline.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Mortgage</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Loan Balance ($)</label>
            <input
              type="number"
              value={currentLoanBalance}
              onChange={(e) => setCurrentLoanBalance(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Interest Rate (%)</label>
            <input
              type="number"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              className="input"
              min="0"
              max="15"
              step="0.125"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Remaining Term (Years)</label>
            <input
              type="number"
              value={currentRemainingTerm}
              onChange={(e) => setCurrentRemainingTerm(e.target.value)}
              className="input"
              min="1"
              max="30"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">New Mortgage Terms</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">New Interest Rate (%)</label>
            <input
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              className="input"
              min="0"
              max="15"
              step="0.125"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">New Loan Term (Years)</label>
            <input
              type="number"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              className="input"
              min="10"
              max="30"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Cash Out Amount ($)</label>
            <input
              type="number"
              value={cashOut}
              onChange={(e) => setCashOut(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Amount to take out for home improvements, debt payoff, etc.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Refinancing Costs</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Closing Costs ($)</label>
            <input
              type="number"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Appraisal, title, attorney, recording fees. Typically 2-5% of loan.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Points Purchased</label>
            <input
              type="number"
              value={pointsPurchased}
              onChange={(e) => setPointsPurchased(e.target.value)}
              className="input"
              min="0"
              max="4"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Each point costs 1% of loan and reduces rate ~0.25%. Break-even: ~5-7 years.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Origination Fee (%)</label>
            <input
              type="number"
              value={originationFee}
              onChange={(e) => setOriginationFee(e.target.value)}
              className="input"
              min="0"
              max="2"
              step="0.25"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Lender fee for processing loan. Typically 0.5-1% of loan amount.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Rate & Term Comparison</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Rate Difference:</span>
            <span className={`font-medium ml-2 ${parseFloat(result.rateDifference) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {result.rateDifference}% {parseFloat(result.rateDifference) > 0 ? 'lower' : 'higher'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Term Difference:</span>
            <span className="font-medium ml-2">
              {result.termDifference} years {parseFloat(result.termDifference) > 0 ? 'longer' : 'shorter'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Refinancing Costs Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Closing Costs:</span>
            <span className="font-medium ml-2">${result.closingCosts}</span>
          </div>
          <div>
            <span className="text-zinc-600">Points Cost:</span>
            <span className="font-medium ml-2">${result.pointsCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Origination Fee:</span>
            <span className="font-medium ml-2">${result.originationCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Cost:</span>
            <span className="font-bold ml-2">${result.totalRefiCost}</span>
          </div>
        </div>
      </div>

      <div className={`card ${parseFloat(result.monthlySavings) > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${parseFloat(result.monthlySavings) > 0 ? 'text-green-700' : 'text-red-700'}`}>
          Monthly Payment Comparison
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Current Payment:</span>
            <span className="font-medium ml-2">${result.currentMonthlyPayment}</span>
          </div>
          <div>
            <span className="text-zinc-600">New Payment:</span>
            <span className="font-medium ml-2">${result.newMonthlyPayment}</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly Savings:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.monthlySavings) > 0 ? 'text-green-800' : 'text-red-800'}`}>
              ${result.monthlySavings}
            </span>
          </div>
        </div>
      </div>

      <div className={`card ${result.isWorthRefinancing ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isWorthRefinancing ? 'text-green-700' : 'text-yellow-700'}`}>
          Break-Even Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Break-Even:</span>
            <span className="font-bold ml-2">{result.breakEvenMonths} months ({result.breakEvenYears} years)</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Term:</span>
            <span className="font-medium ml-2">{result.currentRemainingTerm} years</span>
          </div>
        </div>
        <div className="text-sm mt-2">
          {result.recommendation}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Interest Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Current Total Interest:</span>
            <span className="font-medium ml-2">${result.currentTotalInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">New Total Interest:</span>
            <span className="font-medium ml-2">${result.newTotalInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Interest Over Current Term:</span>
            <span className="font-medium ml-2">${result.newInterestOverCurrentTerm}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Savings (Current Term):</span>
            <span className={`font-bold ml-2 ${parseFloat(result.interestSavingsShortTerm) > 0 ? 'text-green-800' : 'text-red-800'}`}>
              ${result.interestSavingsShortTerm}
            </span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Extending term increases total interest. Compare over remaining term for accurate savings.
        </div>
      </div>

      {parseFloat(result.cashOut) > 0 && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Cash-Out Refinance</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Cash Out:</span>
              <span className="font-bold ml-2">${result.cashOut}</span>
            </div>
            <div>
              <span className="text-zinc-600">New Loan Amount:</span>
              <span className="font-medium ml-2">${result.newLoanAmount}</span>
            </div>
          </div>
          <div className="text-xs text-teal-600 mt-2">
            Cash-out increases loan amount and monthly payment. Consider home equity loan if rate higher.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">When to Refinance</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Break-Even Rule:</strong> Refinance if break-even period is shorter than your expected time in home.</li>
          <li><strong>Rate Drop:</strong> Generally worth refinancing if rate drops 1%+ and you plan to stay 3+ years.</li>
          <li><strong>Points Decision:</strong> Pay points if staying 7+ years. Avoid points if moving sooner.</li>
          <li><strong>Term Extension:</strong> Extending term lowers monthly payment but increases total interest. Consider if cash flow is priority.</li>
          <li><strong>Cash-Out:</strong> Cash-out refi has higher rates. Consider HELOC or home equity loan for smaller amounts.</li>
          <li><strong>Closing Cost Negotiation:</strong> Ask lender about no-closing-cost refi (higher rate, no upfront costs).</li>
          <li><strong>Credit Score Impact:</strong> Better credit scores get better rates. Improve credit before refinancing if possible.</li>
          <li><strong>Timing:</strong> Rates fluctuate. Lock rate when favorable. Don't wait too long chasing lowest rate.</li>
        </ul>
      </div>
    </main>
  )
}