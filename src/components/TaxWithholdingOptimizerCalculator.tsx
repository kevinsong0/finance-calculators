'use client'

import { useState } from 'react'

export default function TaxWithholdingOptimizerCalculator() {
  const [grossIncome, setGrossIncome] = useState(120000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'>('marriedJoint')
  const [currentWithholding, setCurrentWithholding] = useState(18000)
  const [expectedRefund, setExpectedRefund] = useState(5000)
  const [payFrequency, setPayFrequency] = useState<'weekly' | 'biweekly' | 'monthly' | 'annual'>('biweekly')
  const [otherIncome, setOtherIncome] = useState(0)
  const [deductions, setDeductions] = useState(25000)
  const [taxCredits, setTaxCredits] = useState(2000)
  const [goal, setGoal] = useState<'breakEven' | 'smallRefund' | 'noRefund'>('breakEven')

  const calculate = () => {
    // Tax Withholding Optimizer Calculator
    // Adjust W-4 withholding to meet tax goal

    // Federal tax brackets 2024
    const brackets = {
      single: [
        { min: 0, max: 11600, rate: 10 },
        { min: 11600, max: 47150, rate: 12 },
        { min: 47150, max: 100525, rate: 22 },
        { min: 100525, max: 191950, rate: 24 },
        { min: 191950, max: 243725, rate: 32 },
        { min: 243725, max: 609350, rate: 35 },
        { min: 609350, max: Infinity, rate: 37 },
      ],
      marriedJoint: [
        { min: 0, max: 23200, rate: 10 },
        { min: 23200, max: 94300, rate: 12 },
        { min: 94300, max: 201050, rate: 22 },
        { min: 201050, max: 383900, rate: 24 },
        { min: 383900, max: 487450, rate: 32 },
        { min: 487450, max: 731200, rate: 35 },
        { min: 731200, max: Infinity, rate: 37 },
      ],
      marriedSeparate: [
        { min: 0, max: 11600, rate: 10 },
        { min: 11600, max: 47150, rate: 12 },
        { min: 47150, max: 100525, rate: 22 },
        { min: 100525, max: 191950, rate: 24 },
        { min: 191950, max: 243725, rate: 32 },
        { min: 243725, max: 365600, rate: 35 },
        { min: 365600, max: Infinity, rate: 37 },
      ],
      headOfHousehold: [
        { min: 0, max: 16550, rate: 10 },
        { min: 16550, max: 63100, rate: 12 },
        { min: 63100, max: 100500, rate: 22 },
        { min: 100500, max: 191950, rate: 24 },
        { min: 191950, max: 243700, rate: 32 },
        { min: 243700, max: 609350, rate: 35 },
        { min: 609350, max: Infinity, rate: 37 },
      ],
    }

    // Calculate total taxable income
    const totalIncome = grossIncome + otherIncome
    const taxableIncome = totalIncome - deductions

    // Calculate federal tax
    const applicableBrackets = brackets[filingStatus]
    let federalTax = 0
    let remainingIncome = taxableIncome

    for (const bracket of applicableBrackets) {
      if (remainingIncome <= 0) break
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      federalTax += taxableInBracket * (bracket.rate / 100)
      remainingIncome -= taxableInBracket
    }

    // Apply tax credits
    const totalTax = Math.max(0, federalTax - taxCredits)

    // Calculate withholding goal
    let withholdingGoal = totalTax
    if (goal === 'smallRefund') {
      withholdingGoal = totalTax + 500 // Target $500 refund
    } else if (goal === 'noRefund') {
      withholdingGoal = totalTax
    }

    // Current status
    const currentBalance = currentWithholding - totalTax
    const isOverWithholding = currentWithholding > withholdingGoal
    const isUnderWithholding = currentWithholding < totalTax - 1000 // Underpayment threshold

    // Calculate per-period withholding
    const periodsPerYear: Record<string, number> = {
      weekly: 52,
      biweekly: 26,
      monthly: 12,
      annual: 1,
    }
    const periods = periodsPerYear[payFrequency]

    const currentPerPeriod = currentWithholding / periods
    const targetPerPeriod = withholdingGoal / periods
    const adjustmentPerPeriod = targetPerPeriod - currentPerPeriod

    // W-4 adjustments
    const w4Line3Adjustment = -Math.round(adjustmentPerPeriod * periods) // Line 3 for extra withholding
    const w4Line4cAdjustment = Math.round(adjustmentPerPeriod) // Line 4c for extra withholding per period

    // Underpayment penalty check
    const safeHarborMin = Math.min(totalTax * 0.9, totalTax - 1000) // 90% of tax or $1000 less
    const penaltyRisk = currentWithholding < safeHarborMin

    // Recommendation
    let recommendation = ''
    if (isUnderWithholding) {
      recommendation = `Under-withholding by $${Math.abs(currentBalance).toFixed(0)}. Risk of underpayment penalty. Increase withholding by $${Math.abs(w4Line4cAdjustment).toFixed(0)} per paycheck (W-4 Line 4c).`
    } else if (isOverWithholding && currentBalance > 2000) {
      recommendation = `Over-withholding by $${currentBalance.toFixed(0)}. Large refund expected. Reduce withholding via W-4 Line 3 by $${Math.abs(w4Line3Adjustment).toFixed(0)} to increase take-home pay.`
    } else if (Math.abs(currentBalance) < 500) {
      recommendation = `Withholding nearly perfect. Balance: $${currentBalance.toFixed(0)}. Minimal adjustment needed.`
    } else {
      recommendation = `Adjust withholding by $${Math.abs(w4Line4cAdjustment).toFixed(0)} per paycheck to reach goal. Current: $${currentPerPeriod.toFixed(0)}, Target: $${targetPerPeriod.toFixed(0)}.`
    }

    if (penaltyRisk) {
      recommendation += ` WARNING: Below safe harbor - may trigger underpayment penalty.`
    }

    return {
      grossIncome: grossIncome.toFixed(0),
      filingStatus,
      otherIncome: otherIncome.toFixed(0),
      deductions: deductions.toFixed(0),
      taxCredits: taxCredits.toFixed(0),
      totalIncome: totalIncome.toFixed(0),
      taxableIncome: taxableIncome.toFixed(0),
      federalTax: federalTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      currentWithholding: currentWithholding.toFixed(0),
      withholdingGoal: withholdingGoal.toFixed(0),
      currentBalance: currentBalance.toFixed(0),
      isOverWithholding,
      isUnderWithholding,
      penaltyRisk,
      payFrequency,
      periods: periods.toFixed(0),
      currentPerPeriod: currentPerPeriod.toFixed(0),
      targetPerPeriod: targetPerPeriod.toFixed(0),
      adjustmentPerPeriod: adjustmentPerPeriod.toFixed(0),
      w4Line3Adjustment: w4Line3Adjustment.toFixed(0),
      w4Line4cAdjustment: w4Line4cAdjustment.toFixed(0),
      goal,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Withholding Optimizer Calculator</h1>
      <p className="text-gray-600 mb-4">Adjust W-4 withholding to optimize your tax outcome.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Gross Salary</label>
          <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="marriedJoint">Married Filing Jointly</option>
            <option value="marriedSeparate">Married Filing Separately</option>
            <option value="headOfHousehold">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Annual Withholding</label>
          <input type="number" value={currentWithholding} onChange={(e) => setCurrentWithholding(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pay Frequency</label>
          <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value as 'weekly' | 'biweekly' | 'monthly' | 'annual')} className="w-full border rounded p-2">
            <option value="weekly">Weekly (52 paychecks)</option>
            <option value="biweekly">Biweekly (26 paychecks)</option>
            <option value="monthly">Monthly (12 paychecks)</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Income</label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deductions</label>
          <input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Credits</label>
          <input type="number" value={taxCredits} onChange={(e) => setTaxCredits(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Withholding Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value as 'breakEven' | 'smallRefund' | 'noRefund')} className="w-full border rounded p-2">
            <option value="breakEven">Break-Even (no refund/no payment)</option>
            <option value="smallRefund">Small Refund (~$500)</option>
            <option value="noRefund">Exact Balance</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Income:</span><span className="font-medium ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Taxable Income:</span><span className="font-medium ml-2">$ {result.taxableIncome}</span></div>
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-bold ml-2">$ {result.federalTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">After Credits:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
          <div><span className="text-zinc-600">Withholding Goal:</span><span className="font-medium ml-2">$ {result.withholdingGoal}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.currentBalance) > 500 ? 'bg-green-50 border border-green-200' : Number(result.currentBalance) < -500 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Current Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Withholding:</span><span className="font-medium ml-2">$ {result.currentWithholding}</span></div>
          <div><span className="text-zinc-600">Tax Liability:</span><span className="font-medium ml-2">$ {result.totalTax}</span></div>
          <div><span className="text-zinc-600">Balance:</span><span className={`font-bold ml-2 ${Number(result.currentBalance) > 0 ? 'text-green-700' : Number(result.currentBalance) < 0 ? 'text-red-700' : ''}`}>$ {result.currentBalance}</span></div>
        </div>
        {Number(result.currentBalance) > 0 && (
          <div className="text-xs text-zinc-600 mt-2">Expected refund: $ {result.currentBalance}</div>
        )}
        {Number(result.currentBalance) < 0 && (
          <div className="text-xs text-red-600 mt-2">Amount due: $ {Math.abs(Number(result.currentBalance))}</div>
        )}
      </div>

      {result.penaltyRisk && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Underpayment Penalty Risk</h2>
          <div className="text-xs text-zinc-600">Current withholding below safe harbor threshold. May trigger IRS underpayment penalty.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Per-Paycheck Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Pay Periods:</span><span className="font-medium ml-2">{result.periods}</span></div>
          <div><span className="text-zinc-600">Current:</span><span className="font-medium ml-2">$ {result.currentPerPeriod}</span></div>
          <div><span className="text-zinc-600">Target:</span><span className="font-bold ml-2">$ {result.targetPerPeriod}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Adjustment:</span><span className={`font-bold ml-2 ${Number(result.adjustmentPerPeriod) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.adjustmentPerPeriod}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">W-4 Adjustment Instructions</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          {Number(result.adjustmentPerPeriod) > 0 && (
            <div>• Add $ {Math.abs(Number(result.w4Line4cAdjustment))} to Line 4c (Extra withholding)</div>
          )}
          {Number(result.adjustmentPerPeriod) < 0 && (
            <div>• Enter $ {Math.abs(Number(result.w4Line3Adjustment))} on Line 3 (Claim dependents/other credits)</div>
          )}
          <div>• Submit new W-4 to employer</div>
          <div>• Changes effective next pay period</div>
        </div>
      </div>

      <div className={`card mb-6 ${result.penaltyRisk ? 'bg-orange-50 border border-orange-200' : Number(result.currentBalance) >= 0 ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Withholding Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>W-4 controls withholding</li>
          <li>Line 3: reduce withholding</li>
          <li>Line 4c: increase withholding</li>
          <li>Safe harbor: 90% of tax or $1000</li>
          <li>Underpayment penalty: ~3-5%</li>
          <li>Check withholding annually</li>
          <li>Life events require W-4 update</li>
          <li>IRS Tax Withholding Estimator</li>
          <li>Large refund = missed opportunity</li>
          <li>Under-withholding = penalty risk</li>
        </ul>
      </div>
    </div>
  )
}