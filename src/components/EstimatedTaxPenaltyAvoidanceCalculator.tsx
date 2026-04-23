'use client'

import { useState } from 'react'

export default function EstimatedTaxPenaltyAvoidanceCalculator() {
  const [priorYearTax, setPriorYearTax] = useState(24000)
  const [currentYearIncome, setCurrentYearIncome] = useState(150000)
  const [ withholdingTotal, setWithholdingTotal] = useState(18000)
  const [estimatedPayments, setEstimatedPayments] = useState(6000)
  const [totalPayments, setTotalPayments] = useState(24000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'joint'>('single')
  const [agi, setAgi] = useState(150000)
  const [useSafeHarbor, setUseSafeHarbor] = useState(true)

  const calculate = () => {
    // Estimated Tax Penalty Avoidance Calculator
    // Calculate safe harbor requirements to avoid underpayment penalty

    // Safe harbor rules:
    // 1. Pay 100% of prior year tax (if AGI &lt;$150k)
    // 2. Pay 110% of prior year tax (if AGI &gt;$150k)
    // 3. Pay 90% of current year tax

    // Penalty rate: IRS quarterly interest rate (approx 8% for 2024)

    const safeHarborThreshold = agi >= 150000 ? 1.10 : 1.0
    const priorYearSafeHarbor = priorYearTax * safeHarborThreshold
    const currentYear90Percent = (currentYearIncome * 0.24) * 0.9 // Simplified 24% rate

    // Minimum required to avoid penalty
    const minRequired = useSafeHarbor ? priorYearSafeHarbor : currentYear90Percent

    // Compare to total payments
    const paymentShortfall = Math.max(0, minRequired - totalPayments)
    const overpayment = Math.max(0, totalPayments - minRequired)

    // Quarterly payment schedule
    // Due dates: April 15, June 15, September 15, January 15
    const quarterlyRequired = minRequired / 4
    const quarterlyPaid = totalPayments / 4 // Simplified - assume equal payments
    const quarterlyShortfall = Math.max(0, quarterlyRequired - quarterlyPaid)

    // Penalty calculation (if shortfall exists)
    // Penalty = shortfall * IRS interest rate * time period
    const penaltyRate = 0.08 // Approximate 2024 rate
    const penaltyAmount = paymentShortfall * penaltyRate

    // Tax liability this year
    const currentYearTax = currentYearIncome * 0.24 // Simplified
    const underpayment = Math.max(0, currentYearTax - totalPayments)

    // Payment adequacy status
    let status = ''
    let colorClass = ''
    if (totalPayments >= minRequired) {
      status = 'Safe harbor met - no penalty'
      colorClass = 'green'
    } else if (paymentShortfall < 1000) {
      status = 'Small shortfall - minimal penalty risk'
      colorClass = 'yellow'
    } else {
      status = 'Underpayment - penalty likely'
      colorClass = 'red'
    }

    // Quarterly breakdown
    const quarterlySchedule = [
      { quarter: 'Q1 (Apr 15)', due: quarterlyRequired.toFixed(0), paid: quarterlyPaid.toFixed(0), shortfall: quarterlyShortfall.toFixed(0) },
      { quarter: 'Q2 (Jun 15)', due: quarterlyRequired.toFixed(0), paid: quarterlyPaid.toFixed(0), shortfall: quarterlyShortfall.toFixed(0) },
      { quarter: 'Q3 (Sep 15)', due: quarterlyRequired.toFixed(0), paid: quarterlyPaid.toFixed(0), shortfall: quarterlyShortfall.toFixed(0) },
      { quarter: 'Q4 (Jan 15)', due: quarterlyRequired.toFixed(0), paid: quarterlyPaid.toFixed(0), shortfall: quarterlyShortfall.toFixed(0) },
    ]

    // Recommendation
    let recommendation = ''
    if (paymentShortfall === 0) {
      recommendation = `Safe harbor met! Payments of $${totalPayments.toFixed(0)} exceed minimum $${minRequired.toFixed(0)}. No penalty expected. Continue current payment strategy. Estimated tax due at filing: $${underpayment.toFixed(0)}.`
    } else {
      recommendation = `Underpayment risk. Need $${minRequired.toFixed(0)} to meet safe harbor. Current payments: $${totalPayments.toFixed(0)}. Shortfall: $${paymentShortfall.toFixed(0)}. Potential penalty: $${penaltyAmount.toFixed(0)}. Increase estimated payments immediately.`
    }

    if (agi >= 150000 && useSafeHarbor) {
      recommendation += ` High AGI requires 110% safe harbor ($${priorYearSafeHarbor.toFixed(0)}) vs 100% ($${priorYearTax.toFixed(0)}). Extra $${(priorYearTax * 0.1).toFixed(0)} needed.`
    }

    // Safe harbor comparison
    const safeHarborComparison = [
      { method: 'Prior Year 100%', threshold: priorYearTax, required: agi < 150000 },
      { method: 'Prior Year 110%', threshold: priorYearTax * 1.1, required: agi >= 150000 },
      { method: 'Current Year 90%', threshold: currentYear90Percent, required: true },
    ]

    return {
      priorYearTax: priorYearTax.toFixed(0),
      currentYearIncome: currentYearIncome.toFixed(0),
      withholdingTotal: withholdingTotal.toFixed(0),
      estimatedPayments: estimatedPayments.toFixed(0),
      totalPayments: totalPayments.toFixed(0),
      filingStatus,
      agi: agi.toFixed(0),
      safeHarborThreshold: safeHarborThreshold.toFixed(2),
      priorYearSafeHarbor: priorYearSafeHarbor.toFixed(0),
      currentYear90Percent: currentYear90Percent.toFixed(0),
      minRequired: minRequired.toFixed(0),
      paymentShortfall: paymentShortfall.toFixed(0),
      overpayment: overpayment.toFixed(0),
      quarterlyRequired: quarterlyRequired.toFixed(0),
      penaltyRate: (penaltyRate * 100).toFixed(1),
      penaltyAmount: penaltyAmount.toFixed(0),
      currentYearTax: currentYearTax.toFixed(0),
      underpayment: underpayment.toFixed(0),
      status,
      colorClass,
      quarterlySchedule,
      recommendation,
      safeHarborComparison,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Estimated Tax Penalty Avoidance Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate safe harbor requirements to avoid IRS underpayment penalty.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Tax Liability</label>
          <input type="number" value={priorYearTax} onChange={(e) => setPriorYearTax(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Year Projected Income</label>
          <input type="number" value={currentYearIncome} onChange={(e) => setCurrentYearIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">W-2 Withholding</label>
          <input type="number" value={ withholdingTotal} onChange={(e) => setWithholdingTotal(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estimated Tax Payments</label>
          <input type="number" value={estimatedPayments} onChange={(e) => setEstimatedPayments(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">AGI (for safe harbor)</label>
          <input type="number" value={agi} onChange={(e) => setAgi(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'joint')} className="w-full border rounded p-2">
            <option value="single">Single ($150k threshold)</option>
            <option value="joint">Joint ($150k threshold)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Safe Harbor Methods</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Method</th>
                <th className="py-2 text-left">Threshold</th>
                <th className="py-2 text-left">Applies</th>
              </tr>
            </thead>
            <tbody>
              {result.safeHarborComparison.map((s) => (
                <tr key={s.method} className="border-b">
                  <td className="py-1 font-semibold">{s.method}</td>
                  <td className="py-1">$ {s.threshold.toFixed(0)}</td>
                  <td className="py-1">{s.required ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.colorClass === 'green' ? 'bg-green-50 border border-green-200' : result.colorClass === 'red' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Payment Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Payments:</span><span className="font-medium ml-2">$ {result.totalPayments}</span></div>
          <div><span className="text-zinc-600">Minimum Required:</span><span className="font-medium ml-2">$ {result.minRequired}</span></div>
          <div><span className="text-zinc-600">Shortfall:</span><span className={`font-bold ml-2 ${Number(result.paymentShortfall) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.paymentShortfall}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.colorClass === 'green' ? 'text-green-700' : result.colorClass === 'red' ? 'text-red-700' : 'text-yellow-700'}`}>{result.status}</span></div>
          <div><span className="text-zinc-600">Potential Penalty:</span><span className={`font-bold ml-2 ${Number(result.penaltyAmount) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.penaltyAmount}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Quarterly Payment Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Quarter</th>
                <th className="py-2 text-left">Due</th>
                <th className="py-2 text-left">Paid</th>
                <th className="py-2 text-left">Shortfall</th>
              </tr>
            </thead>
            <tbody>
              {result.quarterlySchedule.map((q) => (
                <tr key={q.quarter} className="border-b">
                  <td className="py-1 font-semibold">{q.quarter}</td>
                  <td className="py-1">$ {q.due}</td>
                  <td className="py-1">$ {q.paid}</td>
                  <td className="py-1 font-bold text-red-700">$ {q.shortfall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Liability Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Current Year Tax:</span><span className="font-medium ml-2">$ {result.currentYearTax}</span></div>
          <div><span className="text-zinc-600">Payments Made:</span><span className="font-medium ml-2">$ {result.totalPayments}</span></div>
          <div><span className="text-zinc-600">Balance Due:</span><span className={`font-bold ml-2 ${Number(result.underpayment) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.underpayment}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.paymentShortfall) > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Estimated Tax Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Safe harbor: 100% prior year (AGI &lt;$150k)</li>
          <li>Safe harbor: 110% prior year (AGI &gt;$150k)</li>
          <li>Alternative: 90% current year tax</li>
          <li>Quarterly due dates: Apr/Jun/Sep/Jan 15</li>
          <li>Penalty = underpayment × IRS rate</li>
          <li>2024 penalty rate ~8%</li>
          <li>Increase withholding for safety</li>
          <li>Annualized income method available</li>
          <li>Form 2210 for penalty calculation</li>
          <li>Waiver for casualty/disaster</li>
        </ul>
      </div>
    </div>
  )
}