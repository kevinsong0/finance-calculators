'use client'

import { useState } from 'react'

export default function HomeEquityLOCCalculator() {
  const [homeValue, setHomeValue] = useState('400000')
  const [currentMortgage, setCurrentMortgage] = useState('250000')
  const [helocAmount, setHelocAmount] = useState('50000')
  const [helocRate, setHelocRate] = useState('8.5')
  const [drawPeriod, setDrawPeriod] = useState('10')
  const [repaymentPeriod, setRepaymentPeriod] = useState('20')
  const [monthlyDraw, setMonthlyDraw] = useState('2000')
  const [helocType, setHelocType] = useState('variable')

  const calculate = () => {
    const home = parseFloat(homeValue) || 0
    const mortgage = parseFloat(currentMortgage) || 0
    const helocAmt = parseFloat(helocAmount) || 0
    const rate = parseFloat(helocRate) || 0
    const drawYears = parseFloat(drawPeriod) || 0
    const repayYears = parseFloat(repaymentPeriod) || 0
    const draw = parseFloat(monthlyDraw) || 0
    const isVariable = helocType === 'variable'

    // Calculate equity and CLTV
    const currentEquity = home - mortgage
    const maxHeloc = currentEquity * 0.85 // Lenders typically allow up to 85% CLTV
    const combinedLtv = ((mortgage + helocAmt) / home) * 100
    const availableEquity = currentEquity * (0.85 - mortgage / home)

    // Draw period analysis
    const drawMonths = drawYears * 12
    const totalDrawn = Math.min(draw * drawMonths, helocAmt)
    const averageBalance = totalDrawn / 2 // Simplified average balance during draw

    // Interest during draw period (interest-only payments typical)
    const monthlyRate = rate / 100 / 12
    const interestOnlyPayment = helocAmt * monthlyRate

    // Variable rate scenario (assume rate changes)
    const variableRateLow = rate - 2
    const variableRateHigh = rate + 3
    const interestOnlyLow = helocAmt * (variableRateLow / 100 / 12)
    const interestOnlyHigh = helocAmt * (variableRateHigh / 100 / 12)

    // Repayment period (amortizing the full balance)
    const repayMonths = repayYears * 12
    const amortPayment = helocAmt > 0 && rate > 0 ?
      helocAmt * (monthlyRate * Math.pow(1 + monthlyRate, repayMonths)) /
      (Math.pow(1 + monthlyRate, repayMonths) - 1) : 0

    // Total cost over full term
    const drawPeriodInterest = averageBalance * monthlyRate * drawMonths
    const repayPeriodInterest = (amortPayment * repayMonths) - helocAmt
    const totalInterest = drawPeriodInterest + repayPeriodInterest
    const totalCost = helocAmt + totalInterest

    // Compare to alternatives
    // Home equity loan (fixed rate, typically 1-2% higher than HELOC)
    const helLoanRate = rate + 1.5
    const helLoanTerm = 15
    const helLoanMonthly = helocAmt * ((helLoanRate / 100 / 12) * Math.pow(1 + helLoanRate / 100 / 12, helLoanTerm * 12)) /
      (Math.pow(1 + helLoanRate / 100 / 12, helLoanTerm * 12) - 1)
    const helLoanTotalInterest = (helLoanMonthly * helLoanTerm * 12) - helocAmt

    // Cash-out refi comparison
    const cashOutRefiRate = rate + 0.5 // Typically slightly higher
    const cashOutRefiTerm = 30
    const cashOutRefiAmount = mortgage + helocAmt
    const cashOutRefiMonthly = cashOutRefiAmount * ((cashOutRefiRate / 100 / 12) * Math.pow(1 + cashOutRefiRate / 100 / 12, cashOutRefiTerm * 12)) /
      (Math.pow(1 + cashOutRefiRate / 100 / 12, cashOutRefiTerm * 12) - 1)
    const currentMortgageMonthly = mortgage * ((rate / 100 / 12) * Math.pow(1 + rate / 100 / 12, 25 * 12)) /
      (Math.pow(1 + rate / 100 / 12, 25 * 12) - 1) // Assume 25 years remaining
    const cashOutRefiInterest = (cashOutRefiMonthly * cashOutRefiTerm * 12) - cashOutRefiAmount

    return {
      homeValue: home.toFixed(2),
      currentMortgage: mortgage.toFixed(2),
      currentEquity: currentEquity.toFixed(2),
      helocAmount: helocAmt.toFixed(2),
      helocRate: rate.toFixed(2),
      helocType: isVariable ? 'Variable Rate' : 'Fixed Rate',
      drawPeriod: drawYears.toFixed(0),
      repaymentPeriod: repayYears.toFixed(0),
      combinedLtv: combinedLtv.toFixed(1),
      maxHeloc: maxHeloc.toFixed(2),
      availableEquity: availableEquity.toFixed(2),
      monthlyDraw: draw.toFixed(2),
      totalDrawn: totalDrawn.toFixed(2),
      interestOnlyPayment: interestOnlyPayment.toFixed(2),
      variableRateLow: variableRateLow.toFixed(2),
      variableRateHigh: variableRateHigh.toFixed(2),
      interestOnlyLow: interestOnlyLow.toFixed(2),
      interestOnlyHigh: interestOnlyHigh.toFixed(2),
      amortPayment: amortPayment.toFixed(2),
      drawPeriodInterest: drawPeriodInterest.toFixed(2),
      repayPeriodInterest: repayPeriodInterest.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalCost.toFixed(2),
      helLoanRate: helLoanRate.toFixed(2),
      helLoanMonthly: helLoanMonthly.toFixed(2),
      helLoanTotalInterest: helLoanTotalInterest.toFixed(2),
      cashOutRefiRate: cashOutRefiRate.toFixed(2),
      cashOutRefiMonthly: cashOutRefiMonthly.toFixed(2),
      currentMortgageMonthly: currentMortgageMonthly.toFixed(2),
      cashOutRefiInterest: cashOutRefiInterest.toFixed(2),
      cltvWithinLimit: combinedLtv <= 85,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Home Equity Line of Credit (HELOC) Calculator</h1>
      <p className="text-zinc-600">Calculate HELOC payments, compare to home equity loans and cash-out refinance. Understand draw period, repayment terms, variable rate risks, and CLTV limits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Home & Mortgage Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Home Value ($)</label>
            <input
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Mortgage Balance ($)</label>
            <input
              type="number"
              value={currentMortgage}
              onChange={(e) => setCurrentMortgage(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">HELOC Parameters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">HELOC Amount ($)</label>
            <input
              type="number"
              value={helocAmount}
              onChange={(e) => setHelocAmount(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={helocRate}
              onChange={(e) => setHelocRate(e.target.value)}
              className="input"
              min="0"
              max="20"
              step="0.125"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Rate Type</label>
            <select
              value={helocType}
              onChange={(e) => setHelocType(e.target.value)}
              className="input"
            >
              <option value="variable">Variable Rate (most common, tied to prime)</option>
              <option value="fixed">Fixed Rate (higher, less flexible)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Draw Period (Years)</label>
            <input
              type="number"
              value={drawPeriod}
              onChange={(e) => setDrawPeriod(e.target.value)}
              className="input"
              min="5"
              max="15"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Typically 5-10 years. Borrow as needed, pay interest only.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Repayment Period (Years)</label>
            <input
              type="number"
              value={repaymentPeriod}
              onChange={(e) => setRepaymentPeriod(e.target.value)}
              className="input"
              min="10"
              max="25"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Typically 15-20 years. Principal + interest payments required.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Equity Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Current Equity:</span>
            <span className="font-bold ml-2">${result.currentEquity}</span>
          </div>
          <div>
            <span className="text-zinc-600">Combined LTV:</span>
            <span className={`font-medium ml-2 ${result.cltvWithinLimit ? 'text-green-600' : 'text-red-600'}`}>
              {result.combinedLtv}% {result.cltvWithinLimit ? '(within limit)' : '(exceeds 85%)'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Max HELOC Available:</span>
            <span className="font-medium ml-2">${result.maxHeloc}</span>
          </div>
          <div>
            <span className="text-zinc-600">Available Equity:</span>
            <span className="font-medium ml-2">${result.availableEquity}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Draw Period (Interest-Only)</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Draw Period:</span>
            <span className="font-medium ml-2">{result.drawPeriod} years</span>
          </div>
          <div>
            <span className="text-zinc-600">Interest-Only Payment:</span>
            <span className="font-bold ml-2">${result.interestOnlyPayment}/mo</span>
          </div>
        </div>
        {result.helocType === 'Variable Rate' && (
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Rate Range:</span>
              <span className="font-medium ml-2">{result.variableRateLow}% - {result.variableRateHigh}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Payment Range:</span>
              <span className="font-medium ml-2">${result.interestOnlyLow} - ${result.interestOnlyHigh}/mo</span>
            </div>
          </div>
        )}
        <div className="text-xs text-purple-600 mt-2">
          During draw period, pay only interest on borrowed amount. No principal payment required.
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Repayment Period (Principal + Interest)</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Repayment Period:</span>
            <span className="font-medium ml-2">{result.repaymentPeriod} years</span>
          </div>
          <div>
            <span className="text-zinc-600">Amortizing Payment:</span>
            <span className="font-bold ml-2">${result.amortPayment}/mo</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Full balance amortized over repayment period. Payment jumps significantly from draw period.
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Total Cost Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Draw Period Interest:</span>
            <span className="font-medium ml-2">${result.drawPeriodInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Repay Period Interest:</span>
            <span className="font-medium ml-2">${result.repayPeriodInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Interest:</span>
            <span className="font-bold ml-2">${result.totalInterest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Cost:</span>
            <span className="font-bold ml-2">${result.totalCost}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Alternative: Home Equity Loan</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Rate:</span>
            <span className="font-medium ml-2">{result.helLoanRate}% fixed</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly Payment:</span>
            <span className="font-bold ml-2">${result.helLoanMonthly}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Interest:</span>
            <span className="font-medium ml-2">${result.helLoanTotalInterest}</span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Lump-sum, fixed rate, fixed term. Higher rate but predictable payments. Best for one-time expenses.
        </div>
      </div>

      <div className="card bg-indigo-50 border border-indigo-200">
        <h3 className="font-medium mb-2 text-indigo-700">Alternative: Cash-Out Refinance</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">New Loan Amount:</span>
            <span className="font-medium ml-2">${(parseFloat(result.currentMortgage) + parseFloat(result.helocAmount)).toFixed(0)}</span>
          </div>
          <div>
            <span className="text-zinc-600">New Monthly Payment:</span>
            <span className="font-bold ml-2">${result.cashOutRefiMonthly}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current Mortgage:</span>
            <span className="font-medium ml-2">${result.currentMortgageMonthly}/mo</span>
          </div>
        </div>
        <div className="text-xs text-indigo-600 mt-2">
          Replaces existing mortgage. Extends term to 30 years. Lower rate than HELOC but longer commitment.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">HELOC vs Alternatives</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>HELOC Pros:</strong> Flexibility - borrow as needed, pay interest only during draw. Lower initial rate.</li>
          <li><strong>HELOC Cons:</strong> Variable rate risk (payments can rise). Payment shock at repayment. Temptation to overborrow.</li>
          <li><strong>Home Equity Loan:</strong> Fixed rate, predictable payments. Best for one-time large expense (renovation, medical).</li>
          <li><strong>Cash-Out Refi:</strong> One loan, lower rate than HELOC. Extends mortgage term. Higher closing costs.</li>
          <li><strong>Rate Risk:</strong> HELOC tied to prime rate. If prime rises 3%, your payment rises significantly.</li>
          <li><strong>Best Use:</strong> Ongoing projects, emergency fund backup, debt consolidation with payoff plan.</li>
          <li><strong>Tax Deduction:</strong> Interest deductible if funds used to buy, build, or improve home (TCJA 2017).</li>
        </ul>
      </div>
    </main>
  )
}