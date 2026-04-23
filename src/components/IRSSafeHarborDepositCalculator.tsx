'use client'

import { useState } from 'react'

export default function IRSSafeHarborDepositCalculator() {
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [priorYearAGI, setPriorYearAGI] = useState(50000)
  const [priorYearTax, setPriorYearTax] = useState(8000)
  const [currentYearTax, setCurrentYearTax] = useState(10000)
  const [estimatedPaymentsMade, setEstimatedPaymentsMade] = useState(6000)
  const [totalTaxWithheld, setTotalTaxWithheld] = useState(3000)
  const [hasSafeHarbor, setHasSafeHarbor] = useState(true)

  const calculate = () => {
    // IRS Safe Harbor Deposit Rules
    // Avoid underpayment penalty by meeting safe harbor requirements
    // Safe harbor 1: Pay 100% of prior year tax (110% if AGI > $150k)
    // Safe harbor 2: Pay 90% of current year tax

    // Penalty threshold: $1,000 underpayment
    const penaltyThreshold = 1000

    // Safe harbor thresholds
    const highIncomeThreshold = 150000 // AGI threshold for 110% rule
    const safeHarborMultiplier = hasSafeHarbor && priorYearAGI > highIncomeThreshold ? 1.10 : 1.0

    // Calculate safe harbor amount
    const safeHarborAmount = priorYearTax * safeHarborMultiplier

    // Calculate current year safe harbor (90% rule)
    const currentYearSafeHarbor = currentYearTax * 0.90

    // Total payments made
    const totalPayments = estimatedPaymentsMade + totalTaxWithheld

    // Shortfall calculations
    const priorYearShortfall = Math.max(0, safeHarborAmount - totalPayments)
    const currentYearShortfall = Math.max(0, currentYearSafeHarbor - totalPayments)

    // Minimum safe harbor requirement
    const minSafeHarborRequired = Math.min(safeHarborAmount, currentYearSafeHarbor)

    // Check if penalty applies
    const totalTaxDue = currentYearTax - totalPayments
    const penaltyApplies = totalTaxDue > penaltyThreshold && totalPayments < minSafeHarborRequired

    // Remaining deposit needed for safe harbor
    const depositNeededForPriorYear = Math.max(0, safeHarborAmount - totalPayments)
    const depositNeededForCurrentYear = Math.max(0, currentYearSafeHarbor - totalPayments)

    // Choose optimal safe harbor strategy
    let optimalStrategy = ''
    let optimalDepositAmount = 0
    if (priorYearTax < currentYearTax * 0.90) {
      optimalStrategy = 'Prior Year 100% Rule'
      optimalDepositAmount = depositNeededForPriorYear
    } else {
      optimalStrategy = 'Current Year 90% Rule'
      optimalDepositAmount = depositNeededForCurrentYear
    }

    // Penalty estimate (simplified)
    // IRS interest rate ~8% (2024) on underpayment
    const underpaymentAmount = Math.max(0, minSafeHarborRequired - totalPayments)
    const penaltyRate = 0.08 // Approximate annual rate
    const estimatedPenalty = underpaymentAmount > penaltyThreshold ? underpaymentAmount * penaltyRate * 0.5 : 0

    // Quarterly deadlines
    const quarterlyDeadlines = [
      { quarter: 'Q1', deadline: 'April 15', percent: 25 },
      { quarter: 'Q2', deadline: 'June 15', percent: 25 },
      { quarter: 'Q3', deadline: 'September 15', percent: 25 },
      { quarter: 'Q4', deadline: 'January 15', percent: 25 },
    ]

    // Recommended quarterly payment if using safe harbor
    const quarterlySafeHarborPayment = safeHarborAmount / 4

    return {
      filingStatus,
      priorYearAGI: priorYearAGI.toFixed(0),
      priorYearTax: priorYearTax.toFixed(0),
      currentYearTax: currentYearTax.toFixed(0),
      estimatedPaymentsMade: estimatedPaymentsMade.toFixed(0),
      totalTaxWithheld: totalTaxWithheld.toFixed(0),
      hasSafeHarbor,
      highIncomeThreshold: highIncomeThreshold.toFixed(0),
      safeHarborMultiplier: safeHarborMultiplier.toFixed(2),
      safeHarborAmount: safeHarborAmount.toFixed(0),
      currentYearSafeHarbor: currentYearSafeHarbor.toFixed(0),
      totalPayments: totalPayments.toFixed(0),
      priorYearShortfall: priorYearShortfall.toFixed(0),
      currentYearShortfall: currentYearShortfall.toFixed(0),
      minSafeHarborRequired: minSafeHarborRequired.toFixed(0),
      totalTaxDue: totalTaxDue.toFixed(0),
      penaltyThreshold: penaltyThreshold.toFixed(0),
      penaltyApplies,
      depositNeededForPriorYear: depositNeededForPriorYear.toFixed(0),
      depositNeededForCurrentYear: depositNeededForCurrentYear.toFixed(0),
      optimalStrategy,
      optimalDepositAmount: optimalDepositAmount.toFixed(0),
      underpaymentAmount: underpaymentAmount.toFixed(0),
      penaltyRate: (penaltyRate * 100).toFixed(0),
      estimatedPenalty: estimatedPenalty.toFixed(0),
      quarterlyDeadlines,
      quarterlySafeHarborPayment: quarterlySafeHarborPayment.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Safe Harbor Deposit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate safe harbor requirements to avoid underpayment penalty.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single / Head of Household</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year AGI</label>
          <input type="number" value={priorYearAGI} onChange={(e) => setPriorYearAGI(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Total Tax</label>
          <input type="number" value={priorYearTax} onChange={(e) => setPriorYearTax(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Year Estimated Tax</label>
          <input type="number" value={currentYearTax} onChange={(e) => setCurrentYearTax(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estimated Payments Made</label>
          <input type="number" value={estimatedPaymentsMade} onChange={(e) => setEstimatedPaymentsMade(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Withheld (W-2/1099)</label>
          <input type="number" value={totalTaxWithheld} onChange={(e) => setTotalTaxWithheld(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Safe Harbor Status</label>
          <select value={hasSafeHarbor ? 'yes' : 'no'} onChange={(e) => setHasSafeHarbor(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Eligible for Safe Harbor</option>
            <option value="no">Not Eligible</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.penaltyApplies ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.penaltyApplies ? 'text-red-700' : 'text-green-700'}`}>Safe Harbor Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Prior Year Tax:</span><span className="font-medium ml-2">$ {result.priorYearTax}</span></div>
          <div><span className="text-zinc-600">Safe Harbor %:</span><span className="font-bold ml-2">{result.safeHarborMultiplier === '1.10' ? '110%' : '100%'}</span></div>
          <div><span className="text-zinc-600">Required:</span><span className="font-bold ml-2">$ {result.safeHarborAmount}</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Paid:</span><span className="font-medium ml-2">$ {result.totalPayments}</span></div>
          <div><span className="text-zinc-600">Shortfall:</span><span className={`font-bold ml-2 ${Number(result.priorYearShortfall) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.priorYearShortfall}</span></div>
          <div><span className="text-zinc-600">Penalty Risk:</span><span className={`font-bold ml-2 ${result.penaltyApplies ? 'text-red-700' : 'text-green-700'}`}>{result.penaltyApplies ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">High income (&gt;$150k AGI) requires 110% of prior year tax for safe harbor.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Safe Harbor Rules Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-purple-700 mb-1">Prior Year 100%/110% Rule</div>
            <div className="text-sm text-zinc-600">Required: $ {result.safeHarborAmount}</div>
            <div className="text-sm text-zinc-600">Deposit Needed: $ {result.depositNeededForPriorYear}</div>
          </div>
          <div>
            <div className="font-semibold text-purple-700 mb-1">Current Year 90% Rule</div>
            <div className="text-sm text-zinc-600">Required: $ {result.currentYearSafeHarbor}</div>
            <div className="text-sm text-zinc-600">Deposit Needed: $ {result.depositNeededForCurrentYear}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Choose whichever rule results in lower deposit requirement.</div>
      </div>

      <div className={`card mb-6 ${Number(result.optimalDepositAmount) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.optimalDepositAmount) > 0 ? 'text-orange-700' : 'text-green-700'}`}>Optimal Strategy</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Best Rule:</span><span className="font-bold ml-2">{result.optimalStrategy}</span></div>
          <div><span className="text-zinc-600">Deposit Needed:</span><span className={`font-bold ml-2 ${Number(result.optimalDepositAmount) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.optimalDepositAmount}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Use the rule that requires the smallest deposit to avoid penalty.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Quarterly Payment Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Quarter</th>
                <th className="py-2 text-left">Deadline</th>
                <th className="py-2 text-left">% of Safe Harbor</th>
                <th className="py-2 text-left">Payment</th>
              </tr>
            </thead>
            <tbody>
              {result.quarterlyDeadlines.map((q) => (
                <tr key={q.quarter} className="border-b">
                  <td className="py-1 font-semibold">{q.quarter}</td>
                  <td className="py-1">{q.deadline}</td>
                  <td className="py-1">{q.percent}%</td>
                  <td className="py-1 font-medium">$ {result.quarterlySafeHarborPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Pay equal quarterly amounts to meet safe harbor evenly.</div>
      </div>

      {result.penaltyApplies && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Estimated Penalty</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Underpayment:</span><span className="font-bold text-red-700 ml-2">$ {result.underpaymentAmount}</span></div>
            <div><span className="text-zinc-600">Penalty Rate:</span><span className="font-medium ml-2">{result.penaltyRate}%/yr</span></div>
            <div><span className="text-zinc-600">Est. Penalty:</span><span className="font-bold text-red-700 ml-2">$ {result.estimatedPenalty}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Penalty calculated at IRS interest rate on underpayment amount.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Safe Harbor Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>100% of prior year tax (safe harbor)</li>
          <li>110% if prior AGI &gt;$150k</li>
          <li>90% of current year tax (alternative)</li>
          <li>Penalty threshold: $1,000 underpayment</li>
          <li>Quarterly deadlines: Apr 15, Jun 15, Sep 15, Jan 15</li>
          <li>W-2 withholding counts as paid evenly</li>
          <li>Estimated payments must be timely</li>
          <li>Safe harbor protects from penalty</li>
          <li>File Form 2210 for penalty calculation</li>
          <li>Adjust W-4 to increase withholding</li>
        </ul>
      </div>
    </div>
  )
}