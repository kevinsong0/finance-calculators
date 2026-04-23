'use client'

import { useState } from 'react'

export default function TaxLevyReleaseCalculator() {
  const [levyType, setLevyType] = useState<'bank' | 'wage' | 'property'>('bank')
  const [levyAmount, setLevyAmount] = useState(15000)
  const [levyDate, setLevyDate] = useState('2024-01-15')
  const [totalTaxDebt, setTotalTaxDebt] = useState(25000)
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000)
  const [dependents, setDependents] = useState(2)
  const [hardshipClaimed, setHardshipClaimed] = useState(false)
  const [cdpFiled, setCdpFiled] = useState(false)
  const [paymentPlanEligible, setPaymentPlanEligible] = useState(true)
  const [bankBalanceLevied, setBankBalanceLevied] = useState(10000)

  const calculate = () => {
    // Tax Levy Release Calculator
    // Calculate options and timeline for getting IRS levy released

    const levyDateObj = new Date(levyDate)
    const today = new Date()
    const daysSinceLevy = Math.floor((today.getTime() - levyDateObj.getTime()) / (1000 * 60 * 60 * 24))

    // Bank levy timeline
    let bankLevyReleaseDays = 0
    let bankReleaseStatus = ''
    if (levyType === 'bank') {
      // Bank holds funds 21 days before sending to IRS
      bankLevyReleaseDays = 21 - daysSinceLevy
      if (daysSinceLevy < 21) {
        bankReleaseStatus = `Bank holding funds. ${Math.max(0, bankLevyReleaseDays)} days remaining before funds sent to IRS.`
      } else {
        bankReleaseStatus = `Funds sent to IRS. Must request refund if levy released.`
      }
    }

    // Hardship assessment
    const disposableIncome = monthlyIncome - monthlyExpenses
    const hardshipThreshold = monthlyExpenses + dependents * 300
    const hardshipEligible = monthlyIncome < hardshipThreshold || disposableIncome < 100

    // Release options
    const releaseOptions: { method: string; requirements: string; timeline: string; successRate: string }[] = []

    // Option 1: Pay full amount
    releaseOptions.push({
      method: 'Pay Full Tax Debt',
      requirements: `Pay $${totalTaxDebt.toFixed(0)} total tax debt`,
      timeline: 'Immediate release upon payment',
      successRate: '100% if payment made',
    })

    // Option 2: Hardship release
    if (hardshipEligible || hardshipClaimed) {
      releaseOptions.push({
        method: 'Hardship Release',
        requirements: 'Submit Form 433-A/B proving economic hardship',
        timeline: '2-5 business days after approval',
        successRate: 'High if hardship documented',
      })
    }

    // Option 3: Payment plan
    if (paymentPlanEligible && totalTaxDebt < 50000) {
      const monthlyPayment = Math.min(totalTaxDebt / 72, disposableIncome * 0.5)
      releaseOptions.push({
        method: 'Streamlined Payment Agreement',
        requirements: `Monthly payment of $${Math.max(0, monthlyPayment).toFixed(0)}, debt under $50K`,
        timeline: 'Levy released upon agreement approval',
        successRate: 'High for streamlined IA',
      })
    }

    // Option 4: CDP appeal
    if (!cdpFiled && daysSinceLevy <= 30) {
      releaseOptions.push({
        method: 'CDP Appeal with Stay',
        requirements: 'File Form 12153 within 30 days',
        timeline: 'Collection stayed during appeal process',
        successRate: 'Moderate - stay automatic',
      })
    }

    // Option 5: CNC status
    if (hardshipEligible) {
      releaseOptions.push({
        method: 'Currently Not Collectible',
        requirements: 'Submit CIS showing inability to pay',
        timeline: 'Levy released upon CNC approval',
        successRate: 'High for genuine hardship',
      })
    }

    // Option 6: Equivalent hearing (if CDP deadline missed)
    if (daysSinceLevy > 30 && daysSinceLevy <= 365) {
      releaseOptions.push({
        method: 'Equivalent Hearing',
        requirements: 'Request within 1 year of levy notice',
        timeline: 'No automatic stay, but may succeed',
        successRate: 'Lower than CDP',
      })
    }

    // Option 7: Bank levy specific
    if (levyType === 'bank' && daysSinceLevy < 21) {
      releaseOptions.push({
        method: 'Bank Levy Release (21-day window)',
        requirements: 'Contact IRS before 21-day deadline',
        timeline: 'Release stops bank from sending funds',
        successRate: 'Time-sensitive - act immediately',
      })
    }

    // Calculate release timeline estimate
    let estimatedReleaseDays = 0
    if (hardshipEligible) {
      estimatedReleaseDays = 5 // Hardship release fast
    } else if (paymentPlanEligible) {
      estimatedReleaseDays = 30 // Payment plan takes time
    } else {
      estimatedReleaseDays = 60 // CDP or negotiation
    }

    // Release likelihood
    let releaseLikelihood = ''
    let likelihoodColor = ''
    if (hardshipEligible) {
      releaseLikelihood = 'HIGH - Hardship grounds support levy release'
      likelihoodColor = 'green'
    } else if (paymentPlanEligible && totalTaxDebt < 50000) {
      releaseLikelihood = 'GOOD - Streamlined payment plan possible'
      likelihoodColor = 'blue'
    } else if (cdpFiled) {
      releaseLikelihood = 'MODERATE - CDP stay active during appeal'
      likelihoodColor = 'yellow'
    } else if (daysSinceLevy > 30) {
      releaseLikelihood = 'LOWER - CDP deadline missed. Equivalent hearing or negotiation.'
      likelihoodColor = 'orange'
    } else {
      releaseLikelihood = 'PLANNING - Multiple options available. Act promptly.'
      likelihoodColor = 'blue'
    }

    // Recommendation
    let recommendation = ''
    if (levyType === 'bank' && daysSinceLevy < 21) {
      recommendation = `URGENT: Bank levy in 21-day hold. ${Math.max(0, bankLevyReleaseDays)} days remaining. Contact IRS immediately (1-800-829-1040) to request hardship release or payment plan. Funds will be sent to IRS after 21 days.`
    } else if (levyType === 'wage') {
      recommendation = `Wage levy ongoing. ${hardshipEligible ? 'Hardship release likely. Submit CIS immediately.' : 'Payment plan may release levy. Contact IRS to negotiate.'} Garnishment continues until resolved.`
    } else if (daysSinceLevy > 30 && !cdpFiled) {
      recommendation = `CDP deadline passed. Request equivalent hearing within 1 year. ${hardshipEligible ? 'Hardship release still available.' : 'Negotiate payment plan or CNC status.'}`
    } else {
      recommendation = `${hardshipEligible ? 'Strong hardship case - submit Form 433-A/B for immediate release consideration.' : paymentPlanEligible ? 'Payment plan eligible - request streamlined IA for levy release.' : 'Consider CDP appeal or hardship documentation.'}`
    }

    // Release checklist
    const releaseChecklist = [
      'Contact IRS immediately at 1-800-829-1040',
      'Request levy release based on hardship',
      'Submit Collection Information Statement',
      'Document all expenses thoroughly',
      'Provide proof of income',
      'Submit bank statements if bank levy',
      'Request payment plan if applicable',
      'File CDP appeal if within 30 days',
      'Request equivalent hearing if past CDP deadline',
      'Keep records of all IRS communications',
      'Follow up within 5 business days',
      'Request supervisor if agent refuses',
      'Document hardship circumstances',
      'Provide medical bills if applicable',
      'Include utility bills as expenses',
    ]

    return {
      levyType,
      levyAmount: levyAmount.toFixed(0),
      levyDate,
      totalTaxDebt: totalTaxDebt.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      dependents: dependents.toFixed(0),
      hardshipClaimed,
      cdpFiled,
      paymentPlanEligible,
      bankBalanceLevied: bankBalanceLevied.toFixed(0),
      daysSinceLevy: daysSinceLevy.toFixed(0),
      bankLevyReleaseDays: Math.max(0, bankLevyReleaseDays).toFixed(0),
      bankReleaseStatus,
      hardshipEligible,
      hardshipThreshold: hardshipThreshold.toFixed(0),
      releaseOptions,
      estimatedReleaseDays: estimatedReleaseDays.toFixed(0),
      releaseLikelihood,
      likelihoodColor,
      recommendation,
      releaseChecklist,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Levy Release Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate options and timeline for getting IRS levy released.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Levy Type</label>
          <select value={levyType} onChange={(e) => setLevyType(e.target.value as 'bank' | 'wage' | 'property')} className="w-full border rounded p-2">
            <option value="bank">Bank Levy</option>
            <option value="wage">Wage Garnishment</option>
            <option value="property">Property Seizure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Levy Amount</label>
          <input type="number" value={levyAmount} onChange={(e) => setLevyAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Levy Date</label>
          <input type="date" value={levyDate} onChange={(e) => setLevyDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt</label>
          <input type="number" value={totalTaxDebt} onChange={(e) => setTotalTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
          <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dependents</label>
          <input type="number" value={dependents} onChange={(e) => setDependents(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        {levyType === 'bank' && (
          <div>
            <label className="block text-sm font-medium mb-1">Bank Balance Levied</label>
            <input type="number" value={bankBalanceLevied} onChange={(e) => setBankBalanceLevied(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Status & Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hardshipClaimed} onChange={(e) => setHardshipClaimed(e.target.checked)} className="mr-2" />
              <span className="text-sm">Hardship claimed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={cdpFiled} onChange={(e) => setCdpFiled(e.target.checked)} className="mr-2" />
              <span className="text-sm">CDP appeal filed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={paymentPlanEligible} onChange={(e) => setPaymentPlanEligible(e.target.checked)} className="mr-2" />
              <span className="text-sm">Payment plan eligible</span>
            </label>
          </div>
        </div>
      </div>

      {levyType === 'bank' && (
        <div className={`card mb-6 ${Number(result.bankLevyReleaseDays) <= 7 ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
          <h2 className="text-lg font-semibold mb-3">Bank Levy Timeline</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Days Since Levy:</span><span className="font-bold ml-2">{result.daysSinceLevy}</span></div>
            <div><span className="text-zinc-600">Days Until Funds Sent:</span><span className={`font-bold ml-2 ${Number(result.bankLevyReleaseDays) <= 7 ? 'text-red-700' : ''}`}>{result.bankLevyReleaseDays}</span></div>
          </div>
          <div className="text-sm text-zinc-600 mt-2">{result.bankReleaseStatus}</div>
        </div>
      )}

      <div className={`card mb-6 ${result.likelihoodColor === 'green' ? 'bg-green-50 border border-green-200' : result.likelihoodColor === 'orange' ? 'bg-orange-50 border border-orange-200' : result.likelihoodColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Release Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Debt:</span><span className="font-bold ml-2">$ {result.totalTaxDebt}</span></div>
          <div><span className="text-zinc-600">Disposable Income:</span><span className={`font-bold ml-2 ${Number(result.disposableIncome) <= 0 ? 'text-red-700' : ''}`}>$ {result.disposableIncome}</span></div>
          <div><span className="text-zinc-600">Hardship Eligible:</span><span className={`font-bold ml-2 ${result.hardshipEligible ? 'text-green-700' : ''}`}>{result.hardshipEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Est. Release Days:</span><span className="font-bold ml-2">{result.estimatedReleaseDays}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.likelihoodColor === 'green' ? 'text-green-700' : result.likelihoodColor === 'orange' ? 'text-orange-700' : ''}`}>{result.releaseLikelihood}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Release Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Method</th>
                <th className="py-2 text-left">Requirements</th>
                <th className="py-2 text-left">Timeline</th>
                <th className="py-2 text-left">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {result.releaseOptions.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.method}</td>
                  <td className="py-1">{r.requirements}</td>
                  <td className="py-1">{r.timeline}</td>
                  <td className="py-1">{r.successRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Release Checklist</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.releaseChecklist.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className={`card mb-6 ${levyType === 'bank' && Number(result.bankLevyReleaseDays) <= 7 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Levy Release Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Bank levy: 21-day hold window critical</li>
          <li>Wage levy: ongoing until resolved</li>
          <li>Hardship: immediate release possible</li>
          <li>Payment plan: releases levy on approval</li>
          <li>CNC: releases levy temporarily</li>
          <li>CDP: automatic stay during appeal</li>
          <li>Equivalent hearing: within 1 year</li>
          <li>Contact IRS immediately</li>
          <li>Document all communications</li>
          <li>Request supervisor if denied</li>
        </ul>
      </div>
    </div>
  )
}