'use client'

import { useState } from 'react'

export default function StartupCostsAmortizationCalculator() {
  const [totalStartupCosts, setTotalStartupCosts] = useState(50000)
  const [organizationalCosts, setOrganizationalCosts] = useState(10000)
  const [businessStartDate, setBusinessStartDate] = useState('2024-07-01')
  const [taxYear, setTaxYear] = useState(2024)
  const [electionMade, setElectionMade] = useState(true)
  const [amortizationPeriod, setAmortizationPeriod] = useState(15)
  const [immediateDeductionCap, setImmediateDeductionCap] = useState(5000)

  const calculate = () => {
    // Startup Costs Amortization Calculator
    // Section 195: Startup costs can be deducted up to $5,000 immediately
    // Remainder amortized over 15 years (180 months)

    // Organizational costs (Section 248):
    // Similar treatment: $5,000 immediate, 15-year amortization

    // Phase-out:
    // - $5,000 deduction reduced dollar-for-dollar when costs exceed $50,000
    // - At $55,000+, immediate deduction is zero

    const startup = totalStartupCosts
    const organizational = organizationalCosts
    const totalCosts = startup + organizational

    // Phase-out calculation
    const phaseOutThreshold = 50000
    const phaseOutStart = 55000

    let startupImmediateDeduction = Math.min(startup, immediateDeductionCap)
    if (startup > phaseOutThreshold) {
      const phaseOutReduction = Math.min(startup - phaseOutThreshold, immediateDeductionCap)
      startupImmediateDeduction = Math.max(0, immediateDeductionCap - phaseOutReduction)
    }

    let organizationalImmediateDeduction = Math.min(organizational, immediateDeductionCap)
    if (organizational > phaseOutThreshold) {
      const phaseOutReduction = Math.min(organizational - phaseOutThreshold, immediateDeductionCap)
      organizationalImmediateDeduction = Math.max(0, immediateDeductionCap - phaseOutReduction)
    }

    // Amortizable amounts
    const startupAmortizable = startup - startupImmediateDeduction
    const organizationalAmortizable = organizational - organizationalImmediateDeduction
    const totalAmortizable = startupAmortizable + organizationalAmortizable

    // Monthly amortization
    const months = amortizationPeriod * 12
    const monthlyAmortization = totalAmortizable / months
    const annualAmortization = monthlyAmortization * 12

    // If no election made: must amortize all over 15 years
    const noElectionAnnual = totalCosts / (amortizationPeriod)
    const noElectionMonthly = totalCosts / months

    // Election timing
    // Must attach statement to first tax return
    // Deadline: due date including extensions

    // Amortization schedule
    const schedule: { year: number; startupDed: number; orgDed: number; amortDed: number; totalDed: number; remaining: number }[] = []
    let cumulativeAmort = 0

    // Year 1: immediate + partial year amortization
    const startMonth = new Date(businessStartDate).getMonth() + 1
    const monthsInYear1 = 12 - startMonth + 1
    const year1Amort = monthlyAmortization * monthsInYear1

    schedule.push({
      year: taxYear,
      startupDed: electionMade ? startupImmediateDeduction : 0,
      orgDed: electionMade ? organizationalImmediateDeduction : 0,
      amortDed: year1Amort,
      totalDed: (electionMade ? startupImmediateDeduction + organizationalImmediateDeduction : 0) + year1Amort,
      remaining: totalAmortizable - year1Amort,
    })
    cumulativeAmort += year1Amort

    // Subsequent years
    for (let i = 2; i <= amortizationPeriod; i++) {
      const remaining = totalAmortizable - cumulativeAmort
      const yearAmort = Math.min(annualAmortization, remaining)
      schedule.push({
        year: taxYear + i - 1,
        startupDed: 0,
        orgDed: 0,
        amortDed: yearAmort,
        totalDed: yearAmort,
        remaining: remaining - yearAmort,
      })
      cumulativeAmort += yearAmort
    }

    // Tax benefit
    const taxRate = 0.24
    const year1TaxBenefit = schedule[0].totalDed * taxRate
    const totalTaxBenefit = totalCosts * taxRate

    // Deduction comparison
    const withElectionYear1 = schedule[0].totalDed
    const withoutElectionYear1 = noElectionMonthly * monthsInYear1
    const electionBenefitYear1 = withElectionYear1 - withoutElectionYear1

    // Eligible costs breakdown
    const eligibleStartupCosts = [
      'Market research',
      'Advertising for opening',
      'Employee training before opening',
      'Salaries before opening',
      'Travel for securing suppliers/distributors',
      'Professional fees (legal, accounting)',
      'Licenses and permits',
    ]

    const ineligibleCosts = [
      'Research and experimental costs',
      'Cost of assets with useful life',
      'Organizational costs (separate election)',
      'Operating costs after business starts',
    ]

    // Recommendation
    let recommendation = ''
    if (!electionMade) {
      recommendation = `Without election, must amortize entire $${totalCosts.toFixed(0)} over 15 years. Elect to claim $${startupImmediateDeduction + organizationalImmediateDeduction} immediately.`
    } else if (startup > phaseOutThreshold || organizational > phaseOutThreshold) {
      recommendation = `Phase-out reduces immediate deduction. Amortize $${totalAmortizable.toFixed(0)} over ${amortizationPeriod} years starting month business begins.`
    } else {
      recommendation = `Deduct $${startupImmediateDeduction + organizationalImmediateDeduction} immediately. Amortize $${totalAmortizable.toFixed(0)} over ${amortizationPeriod} years. Year 1 benefit: $${year1TaxBenefit.toFixed(0)}.`
    }

    return {
      totalStartupCosts: startup.toFixed(0),
      organizationalCosts: organizational.toFixed(0),
      totalCosts: totalCosts.toFixed(0),
      businessStartDate,
      taxYear: taxYear.toFixed(0),
      electionMade,
      amortizationPeriod: amortizationPeriod.toFixed(0),
      immediateDeductionCap: immediateDeductionCap.toFixed(0),
      phaseOutThreshold: phaseOutThreshold.toFixed(0),
      startupImmediateDeduction: startupImmediateDeduction.toFixed(0),
      organizationalImmediateDeduction: organizationalImmediateDeduction.toFixed(0),
      totalImmediateDeduction: (startupImmediateDeduction + organizationalImmediateDeduction).toFixed(0),
      startupAmortizable: startupAmortizable.toFixed(0),
      organizationalAmortizable: organizationalAmortizable.toFixed(0),
      totalAmortizable: totalAmortizable.toFixed(0),
      monthlyAmortization: monthlyAmortization.toFixed(0),
      annualAmortization: annualAmortization.toFixed(0),
      noElectionAnnual: noElectionAnnual.toFixed(0),
      noElectionMonthly: noElectionMonthly.toFixed(0),
      startMonth: startMonth.toFixed(0),
      monthsInYear1: monthsInYear1.toFixed(0),
      year1Amort: year1Amort.toFixed(0),
      schedule,
      year1TaxBenefit: year1TaxBenefit.toFixed(0),
      totalTaxBenefit: totalTaxBenefit.toFixed(0),
      withElectionYear1: withElectionYear1.toFixed(0),
      withoutElectionYear1: withoutElectionYear1.toFixed(0),
      electionBenefitYear1: electionBenefitYear1.toFixed(0),
      eligibleStartupCosts,
      ineligibleCosts,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Startup Costs Amortization Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Section 195 startup and organizational costs deductions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Startup Costs</label>
          <input type="number" value={totalStartupCosts} onChange={(e) => setTotalStartupCosts(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Organizational Costs</label>
          <input type="number" value={organizationalCosts} onChange={(e) => setOrganizationalCosts(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business Start Date</label>
          <input type="date" value={businessStartDate} onChange={(e) => setBusinessStartDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} min="2020" max="2030" onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Election Made?</label>
          <select value={electionMade ? 'yes' : 'no'} onChange={(e) => setElectionMade(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - elect immediate deduction</option>
            <option value="no">No - must amortize all</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amortization Period (Years)</label>
          <select value={amortizationPeriod} onChange={(e) => setAmortizationPeriod(Number(e.target.value))} className="w-full border rounded p-2">
            <option value={15}>15 years (standard)</option>
          </select>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Immediate Deduction (Year 1)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Startup:</span><span className="font-bold text-green-700 ml-2">$ {result.startupImmediateDeduction}</span></div>
          <div><span className="text-zinc-600">Organizational:</span><span className="font-bold text-green-700 ml-2">$ {result.organizationalImmediateDeduction}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-green-700 ml-2">$ {result.totalImmediateDeduction}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Maximum $5,000 each. Phase-out begins at $50,000. Zero at $55,000+.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Amortization</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">To Amortize:</span><span className="font-bold ml-2">$ {result.totalAmortizable}</span></div>
          <div><span className="text-zinc-600">Monthly:</span><span className="font-medium ml-2">$ {result.monthlyAmortization}</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className="font-medium ml-2">$ {result.annualAmortization}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.amortizationPeriod} years (180 months)</span></div>
          <div><span className="text-zinc-600">Start Month:</span><span className="font-medium ml-2">Month {result.startMonth}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Deduction Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Startup Ded</th>
                <th className="py-2 text-left">Org Ded</th>
                <th className="py-2 text-left">Amort Ded</th>
                <th className="py-2 text-left">Total Ded</th>
                <th className="py-2 text-left">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.slice(0, 10).map((y) => (
                <tr key={y.year} className="border-b">
                  <td className="py-1">{y.year}</td>
                  <td className="py-1">$ {y.startupDed.toFixed(0)}</td>
                  <td className="py-1">$ {y.orgDed.toFixed(0)}</td>
                  <td className="py-1">$ {y.amortDed.toFixed(0)}</td>
                  <td className="py-1 font-bold">$ {y.totalDed.toFixed(0)}</td>
                  <td className="py-1">$ {y.remaining.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Year 1:</span><span className="font-bold text-green-700 ml-2">$ {result.year1TaxBenefit}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-green-700 ml-2">$ {result.totalTaxBenefit}</span></div>
          <div><span className="text-zinc-600">Rate:</span><span className="font-medium ml-2">24%</span></div>
        </div>
      </div>

      {!result.electionMade && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Without Election</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Annual Amort:</span><span className="font-bold ml-2">$ {result.noElectionAnnual}</span></div>
            <div><span className="text-zinc-600">Lost Benefit:</span><span className="font-bold text-red-700 ml-2">$ {result.electionBenefitYear1}</span></div>
          </div>
        </div>
      )}

      <div className={`card mb-6 ${result.recommendation.includes('Without') ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Eligible Startup Costs</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.eligibleStartupCosts.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Ineligible Costs</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.ineligibleCosts.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Startup Costs Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Section 195: startup costs</li>
          <li>Section 248: organizational costs</li>
          <li>$5,000 immediate each</li>
          <li>Phase-out at $50,000</li>
          <li>Zero deduction at $55,000+</li>
          <li>15-year amortization</li>
          <li>Start month business opens</li>
          <li>Must elect on first return</li>
          <li>Attach statement to return</li>
          <li>Form 4562 for reporting</li>
        </ul>
      </div>
    </div>
  )
}