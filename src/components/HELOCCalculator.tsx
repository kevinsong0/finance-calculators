'use client'

import { useState } from 'react'

export default function HELOCCalculator() {
  const [homeValue, setHomeValue] = useState('')
  const [mortgageBalance, setMortgageBalance] = useState('')
  const [helocRate, setHelocRate] = useState('')
  const [drawAmount, setDrawAmount] = useState('')
  const [drawPeriod, setDrawPeriod] = useState('10')
  const [repaymentPeriod, setRepaymentPeriod] = useState('20')

  const calculate = () => {
    const value = parseFloat(homeValue) || 500000
    const mortgage = parseFloat(mortgageBalance) || 200000
    const rate = parseFloat(helocRate) || 8.5
    const draw = parseFloat(drawAmount) || 0
    const drawYears = parseInt(drawPeriod) || 10
    const repayYears = parseInt(repaymentPeriod) || 20

    // Calculate available equity
    const currentEquity = value - mortgage
    const maxHELOCPercent = 0.80 // 80% CLTV typically
    const maxHELOC = Math.max(0, value * maxHELOCPercent - mortgage)
    const usableEquity = Math.min(currentEquity, maxHELOC)

    // If no draw specified, use max available
    const helocAmount = draw > 0 ? Math.min(draw, maxHELOC) : maxHELOC

    // Interest-only payments during draw period
    const monthlyRate = rate / 100 / 12
    const monthlyInterestOnly = helocAmount * monthlyRate

    // Amortizing payments during repayment period
    const totalMonths = repayYears * 12
    const monthlyAmortizing = helocAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)

    // Total costs
    const totalDrawInterest = monthlyInterestOnly * 12 * drawYears
    const totalRepayInterest = (monthlyAmortizing * totalMonths) - helocAmount
    const totalInterest = totalDrawInterest + totalRepayInterest
    const totalPaid = helocAmount + totalInterest

    // Effective rates and comparison
    const effectiveRate = ((totalInterest / helocAmount) / (drawYears + repayYears) * 100).toFixed(1)

    return {
      homeValue: value.toFixed(2),
      mortgageBalance: mortgage.toFixed(2),
      currentEquity: currentEquity.toFixed(2),
      maxHELOC: maxHELOC.toFixed(2),
      usableEquity: usableEquity.toFixed(2),
      helocAmount: helocAmount.toFixed(2),
      monthlyInterestOnly: monthlyInterestOnly.toFixed(2),
      monthlyAmortizing: monthlyAmortizing.toFixed(2),
      totalDrawInterest: totalDrawInterest.toFixed(2),
      totalRepayInterest: totalRepayInterest.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      effectiveRate,
      drawYears,
      repayYears,
      interestRate: rate.toFixed(1),
      equityPercent: ((currentEquity / value) * 100).toFixed(1),
      cltvPercent: (((mortgage + helocAmount) / value) * 100).toFixed(1)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HELOC Calculator</h1>
      <p className="text-zinc-600">Calculate Home Equity Line of Credit amounts, payments, and total costs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Home Equity Details</h3>
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
              value={mortgageBalance}
              onChange={(e) => setMortgageBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter remaining mortgage"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">HELOC Interest Rate (%)</label>
            <input
              type="number"
              value={helocRate}
              onChange={(e) => setHelocRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter HELOC rate (variable)"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Desired HELOC Amount</label>
            <input
              type="number"
              value={drawAmount}
              onChange={(e) => setDrawAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Optional - or use max available"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Draw Period (Years)</label>
            <select
              value={drawPeriod}
              onChange={(e) => setDrawPeriod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="5">5 Years</option>
              <option value="7">7 Years</option>
              <option value="10">10 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Repayment Period (Years)</label>
            <select
              value={repaymentPeriod}
              onChange={(e) => setRepaymentPeriod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Equity Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Home Value</div>
            <div className="text-2xl font-bold">$${result.homeValue}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Current Equity</div>
            <div className="text-2xl font-bold text-green-600">$${result.currentEquity}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Max HELOC Available</div>
            <div className="text-2xl font-bold text-blue-600">$${result.maxHELOC}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Equity Percentage</div>
            <div className="text-2xl font-bold">{result.equityPercent}%</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">HELOC Payments</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Draw Period Payment</div>
            <div className="text-lg font-bold text-blue-600">$${result.monthlyInterestOnly}/mo</div>
            <div className="text-xs text-zinc-400">Interest-only ({result.drawYears} years)</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Repayment Period Payment</div>
            <div className="text-lg font-bold text-red-600">$${result.monthlyAmortizing}/mo</div>
            <div className="text-xs text-zinc-400">Full amortization ({result.repayYears} years)</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Total Cost Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">HELOC Amount</div>
            <div className="font-bold">$${result.helocAmount}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Interest</div>
            <div className="font-bold text-red-600">$${result.totalInterest}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Paid</div>
            <div className="font-bold">$${result.totalPaid}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Combined CLTV</div>
            <div className="font-bold">{result.cltvPercent}%</div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">HELOC Rate Warning</h3>
        <div className="text-sm text-yellow-600">
          HELOC rates are variable and tied to prime rate. Current rate: {result.interestRate}%. Rates can increase significantly. Budget for potential rate increases of 2-3% during the loan term.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">HELOC Phases</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Draw Period ({result.drawYears} years)</strong>
            <div className="text-zinc-500">Borrow funds as needed, pay interest only. Minimum payments cover interest charges.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Repayment Period ({result.repayYears} years)</strong>
            <div className="text-zinc-500">No more withdrawals. Must pay principal + interest. Payments increase significantly.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">HELOC vs Cash-Out Refinance</h3>
        <div className="text-xs text-zinc-600">
          HELOC: Flexible access, variable rate, interest-only option. Cash-out refi: Fixed rate, one lump sum, higher closing costs. HELOC ideal for ongoing needs (renovations, education). Refi better for one-time large expenses.
        </div>
      </div>
    </main>
  )
}