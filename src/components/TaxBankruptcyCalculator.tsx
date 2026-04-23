'use client'

import { useState } from 'react'

export default function TaxBankruptcyCalculator() {
  const [taxDebt, setTaxDebt] = useState(50000)
  const [incomeTaxYears, setIncomeTaxYears] = useState<[number, number, number]>([2020, 2021, 2022])
  const [returnFiledDates, setReturnFiledDates] = useState<[string, string, string]>(['2021-04-15', '2022-04-15', '2023-04-15'])
  const [assessmentDates, setAssessmentDates] = useState<[string, string, string]>(['2021-04-15', '2022-04-15', '2023-06-15'])
  const [fraudulentReturn, setFraudulentReturn] = useState(false)
  const [willfulEvasion, setWillfulEvasion] = useState(false)
  const [unfiledReturns, setUnfiledReturns] = useState(0)
  const [otherDebt, setOtherDebt] = useState(30000)
  const [incomeMonthly, setIncomeMonthly] = useState(4000)
  const [expensesMonthly, setExpensesMonthly] = useState(3500)
  const [assetsValue, setAssetsValue] = useState(50000)
  const [bankruptcyType, setBankruptcyType] = useState<'chapter7' | 'chapter13'>('chapter7')
  const [state, setState] = useState('median')

  const calculate = () => {
    // Tax Bankruptcy Calculator
    // Calculate tax debt dischargeability and bankruptcy strategy

    const totalDebt = taxDebt + otherDebt
    const disposableIncome = incomeMonthly - expensesMonthly

    // Check dischargeability rules (240-day rule, 3-year rule, filing rule)
    const dischargeability: { year: number; rule: string; met: boolean; details: string }[] = []

    const today = new Date()

    incomeTaxYears.forEach((year, idx) => {
      const filedDate = new Date(returnFiledDates[idx])
      const assessedDate = new Date(assessmentDates[idx])

      // 3-year rule: Return must be filed at least 3 years before bankruptcy
      const threeYearRule = (today.getTime() - filedDate.getTime()) > (3 * 365 * 24 * 60 * 60 * 1000)
      const yearsSinceFiling = (today.getTime() - filedDate.getTime()) / (365 * 24 * 60 * 60 * 1000)

      // 240-day rule: Assessment must be at least 240 days before bankruptcy
      const assessed240 = (today.getTime() - assessedDate.getTime()) > (240 * 24 * 60 * 60 * 1000)
      const daysSinceAssessment = Math.ceil((today.getTime() - assessedDate.getTime()) / (24 * 60 * 60 * 1000))

      // Filing rule: Return must have been filed
      const filedRule = filedDate.getFullYear() > 1900

      dischargeability.push({
        year,
        rule: '3-Year Rule',
        met: threeYearRule,
        details: threeYearRule ? `Met: ${yearsSinceFiling.toFixed(1)} years since filing` : `Not met: Only ${yearsSinceFiling.toFixed(1)} years`,
      })

      dischargeability.push({
        year,
        rule: '240-Day Rule',
        met: assessed240,
        details: assessed240 ? `Met: ${daysSinceAssessment} days since assessment` : `Not met: Only ${daysSinceAssessment} days`,
      })

      dischargeability.push({
        year,
        rule: 'Filing Rule',
        met: filedRule,
        details: filedRule ? 'Return filed' : 'Return not filed - debt not dischargeable',
      })
    })

    // Exceptions that prevent discharge
    const exceptions: { exception: string; applies: boolean; consequence: string }[] = []

    exceptions.push({
      exception: 'Fraudulent Return',
      applies: fraudulentReturn,
      consequence: fraudulentReturn ? 'All fraudulent tax debt not dischargeable' : 'Not applicable',
    })

    exceptions.push({
      exception: 'Willful Tax Evasion',
      applies: willfulEvasion,
      consequence: willfulEvasion ? 'Debt from evasion not dischargeable' : 'Not applicable',
    })

    exceptions.push({
      exception: 'Unfiled Returns',
      applies: unfiledReturns > 0,
      consequence: unfiledReturns > 0 ? `${unfiledReturns} unfiled returns - associated debt not dischargeable` : 'All returns filed',
    })

    // Calculate dischargeable amount
    let dischargeableTax = 0
    let nonDischargeableTax = 0

    // Simple calculation based on rules
    const allRulesMet = dischargeability.every((d) => d.met)
    const noExceptions = !fraudulentReturn && !willfulEvasion && unfiledReturns === 0

    if (allRulesMet && noExceptions) {
      dischargeableTax = taxDebt
    } else if (noExceptions) {
      // Partial dischargeability
      dischargeableTax = taxDebt * 0.5 // Simplified
      nonDischargeableTax = taxDebt * 0.5
    } else {
      nonDischargeableTax = taxDebt
    }

    // Bankruptcy type comparison
    const bankruptcyOptions: { type: string; eligibility: string; timeline: string; discharge: string; taxImpact: string }[] = []

    // Chapter 7 eligibility
    const medianIncome = 5000 // Simplified median for state
    const belowMedian = incomeMonthly < medianIncome
    const chapter7Eligible = belowMedian || disposableIncome < 100

    bankruptcyOptions.push({
      type: 'Chapter 7',
      eligibility: chapter7Eligible ? 'Eligible' : 'Not Eligible (Above Median)',
      timeline: '3-6 months',
      discharge: 'Liquidation bankruptcy, non-exempt assets sold',
      taxImpact: `${dischargeableTax.toFixed(0)} dischargeable, ${nonDischargeableTax.toFixed(0)} remains`,
    })

    // Chapter 13 eligibility
    const debtLimit = bankruptcyType === 'chapter13' ? (totalDebt < 2500000 ? 'Eligible' : 'Over Limit') : 'Check limits'
    bankruptcyOptions.push({
      type: 'Chapter 13',
      eligibility: disposableIncome > 0 && Number(debtLimit) === 0 ? 'Eligible' : disposableIncome > 0 ? 'Eligible' : 'No disposable income',
      timeline: '3-5 years',
      discharge: 'Repayment plan, assets retained',
      taxImpact: 'Tax debt included in plan, dischargeable portion forgiven',
    })

    // Non-dischargeable tax debt handling
    const nonDischargeHandling: { option: string; description: string; when: string }[] = []

    nonDischargeHandling.push({
      option: 'Pay in Full',
      description: 'Pay non-dischargeable tax debt outside bankruptcy',
      when: 'If assets available',
    })

    nonDischargeHandling.push({
      option: 'Chapter 13 Plan',
      description: 'Include in repayment plan, pay over 3-5 years',
      when: 'If income supports plan payments',
    })

    nonDischargeHandling.push({
      option: 'Post-Bankruptcy Settlement',
      description: 'After discharge, negotiate OIC or IA for remaining',
      when: 'After bankruptcy completes',
    })

    nonDischargeHandling.push({
      option: 'Wait for CSED',
      description: 'Let collection statute expire',
      when: 'If CSED near expiration',
    })

    // Timeline phases
    const phases: { phase: string; duration: string; action: string; milestone: string }[] = []

    if (bankruptcyType === 'chapter7') {
      phases.push({
        phase: 'Pre-Filing Preparation',
        duration: '2-4 weeks',
        action: 'Gather documents, file missing returns, credit counseling',
        milestone: 'All returns filed, counseling complete',
      })

      phases.push({
        phase: 'File Chapter 7',
        duration: 'Day 1',
        action: 'Submit petition, schedules, tax returns',
        milestone: 'Automatic stay in effect',
      })

      phases.push({
        phase: 'Trustee Review',
        duration: '30-60 days',
        action: 'Trustee examines assets, verifies tax debt',
        milestone: '341 meeting of creditors',
      })

      phases.push({
        phase: 'Tax Debt Analysis',
        duration: 'During process',
        action: 'IRS files proof of claim, disputes dischargeability',
        milestone: 'Tax debt discharge determined',
      })

      phases.push({
        phase: 'Asset Liquidation',
        duration: 'If non-exempt assets',
        action: 'Non-exempt assets sold to pay creditors',
        milestone: 'Assets distributed',
      })

      phases.push({
        phase: 'Discharge',
        duration: '60-90 days after filing',
        action: 'Dischargeable debts eliminated',
        milestone: 'Discharge order issued',
      })

      phases.push({
        phase: 'Post-Discharge',
        duration: 'After discharge',
        action: 'Address non-dischargeable tax debt',
        milestone: 'Remaining debt resolved',
      })
    } else {
      phases.push({
        phase: 'Pre-Filing Preparation',
        duration: '2-4 weeks',
        action: 'Gather documents, file missing returns, credit counseling',
        milestone: 'All returns filed, counseling complete',
      })

      phases.push({
        phase: 'File Chapter 13',
        duration: 'Day 1',
        action: 'Submit petition, schedules, proposed plan',
        milestone: 'Automatic stay in effect',
      })

      phases.push({
        phase: 'Trustee Review',
        duration: '30-60 days',
        action: 'Trusttee examines plan feasibility',
        milestone: '341 meeting, plan confirmation',
      })

      phases.push({
        phase: 'Plan Payments',
        duration: '3-5 years',
        action: 'Make monthly payments per confirmed plan',
        milestone: 'Payments include tax debt',
      })

      phases.push({
        phase: 'Plan Completion',
        duration: 'After all payments',
        action: 'Complete all plan requirements',
        milestone: 'Plan completed',
      })

      phases.push({
        phase: 'Discharge',
        duration: 'Upon completion',
        action: 'Remaining dischargeable debts eliminated',
        milestone: 'Discharge order',
      })
    }

    // Recommendation
    let recommendation = ''

    if (fraudulentReturn || willfulEvasion) {
      recommendation = `CRITICAL: ${fraudulentReturn ? 'Fraudulent return' : 'Willful evasion'} makes tax debt non-dischargeable. Bankruptcy will NOT eliminate this debt. Consider: 1) Consult criminal tax attorney, 2) Negotiate settlement after bankruptcy, 3) Chapter 13 to pay over time. Fraud penalties cannot be discharged.`
    } else if (unfiledReturns > 0) {
      recommendation = `WARNING: ${unfiledReturns} unfiled returns. File ALL returns before bankruptcy. Unfiled return debt is NOT dischargeable. After filing returns, wait 2 years before filing bankruptcy to meet filing rule. Cannot discharge taxes from unfiled returns.`
    } else if (dischargeableTax > 0) {
      if (chapter7Eligible) {
        recommendation = `Chapter 7 viable. $${dischargeableTax.toFixed(0)} tax debt dischargeable. ${nonDischargeableTax > 0 ? `$${nonDischargeableTax.toFixed(0)} remains after discharge.` : 'All tax debt dischargeable.'} Timeline: 3-6 months. Must meet all rules: 3-year, 240-day, filed return. File when rules met.`
      } else {
        recommendation = `Chapter 7 not eligible (above median income). Consider Chapter 13. Repayment plan over 3-5 years. Dischargeable portion forgiven after plan completion. ${nonDischargeableTax > 0 ? `$${nonDischargeableTax.toFixed(0)} included in plan payments.` : ''} Plan payments: $${Math.max(disposableIncome, 100).toFixed(0)}/mo.`
      }
    } else {
      recommendation = `Tax debt not dischargeable at this time. Check rule timing: 3-year rule (${Math.ceil(365 * 3 / 30)} months from filing), 240-day rule (${Math.ceil(240 / 30)} months from assessment). Wait until rules met, or consider Chapter 13 to manage debt. File missing returns immediately.`
    }

    return {
      taxDebt: taxDebt.toFixed(0),
      otherDebt: otherDebt.toFixed(0),
      totalDebt: totalDebt.toFixed(0),
      incomeTaxYears,
      fraudulentReturn,
      willfulEvasion,
      unfiledReturns,
      disposableIncome: disposableIncome.toFixed(0),
      bankruptcyType,
      dischargeability,
      exceptions,
      dischargeableTax: dischargeableTax.toFixed(0),
      nonDischargeableTax: nonDischargeableTax.toFixed(0),
      bankruptcyOptions,
      nonDischargeHandling,
      phases,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Bankruptcy Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax debt dischargeability and bankruptcy strategy for Chapter 7 and Chapter 13.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax Debt Amount</label>
          <input type="number" value={taxDebt} onChange={(e) => setTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Debt Amount</label>
          <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income</label>
          <input type="number" value={incomeMonthly} onChange={(e) => setIncomeMonthly(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
          <input type="number" value={expensesMonthly} onChange={(e) => setExpensesMonthly(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assets Value</label>
          <input type="number" value={assetsValue} onChange={(e) => setAssetsValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unfiled Returns</label>
          <input type="number" value={unfiledReturns} onChange={(e) => setUnfiledReturns(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bankruptcy Type</label>
          <select value={bankruptcyType} onChange={(e) => setBankruptcyType(e.target.value as 'chapter7' | 'chapter13')} className="w-full border rounded p-2">
            <option value="chapter7">Chapter 7 (Liquidation)</option>
            <option value="chapter13">Chapter 13 (Repayment)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Debt Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={fraudulentReturn} onChange={(e) => setFraudulentReturn(e.target.checked)} className="mr-2" />
              <span className="text-sm">Fraudulent Return</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={willfulEvasion} onChange={(e) => setWillfulEvasion(e.target.checked)} className="mr-2" />
              <span className="text-sm">Willful Tax Evasion</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.dischargeableTax) > Number(result.taxDebt) * 0.5 ? 'bg-green-50 border border-green-200' : Number(result.dischargeableTax) > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Dischargeability Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Tax Debt:</span><span className="font-bold ml-2">$ {result.taxDebt}</span></div>
          <div><span className="text-zinc-600">Dischargeable:</span><span className={`font-bold ml-2 ${Number(result.dischargeableTax) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.dischargeableTax}</span></div>
          <div><span className="text-zinc-600">Not Dischargeable:</span><span className={`font-bold ml-2 ${Number(result.nonDischargeableTax) > 0 ? 'text-red-700' : ''}`}>$ {result.nonDischargeableTax}</span></div>
          <div><span className="text-zinc-600">Disposable Income:</span><span className="font-bold ml-2">$ {result.disposableIncome}/mo</span></div>
          <div><span className="text-zinc-600">Bankruptcy:</span><span className="font-bold ml-2">{result.bankruptcyType.toUpperCase()}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${Number(result.dischargeableTax) > 0 ? 'text-green-700' : 'text-red-700'}`}>
          {Number(result.dischargeableTax) > Number(result.taxDebt) * 0.5 ? 'Most/all tax debt dischargeable' : Number(result.dischargeableTax) > 0 ? 'Partial tax debt dischargeable' : 'Tax debt not dischargeable at this time'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Dischargeability Rules</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Rule</th>
                <th className="py-2 text-left">Met</th>
                <th className="py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {result.dischargeability.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.year}</td>
                  <td className="py-1">{d.rule}</td>
                  <td className="py-1"><span className={d.met ? 'text-green-700' : 'text-red-700'}>{d.met ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{d.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Discharge Exceptions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Exception</th>
                <th className="py-2 text-left">Applies</th>
                <th className="py-2 text-left">Consequence</th>
              </tr>
            </thead>
            <tbody>
              {result.exceptions.map((e, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{e.exception}</td>
                  <td className="py-1"><span className={e.applies ? 'text-red-700' : 'text-green-700'}>{e.applies ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{e.consequence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bankruptcy Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Eligibility</th>
                <th className="py-2 text-left">Timeline</th>
                <th className="py-2 text-left">Tax Impact</th>
              </tr>
            </thead>
            <tbody>
              {result.bankruptcyOptions.map((b, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{b.type}</td>
                  <td className="py-1">{b.eligibility}</td>
                  <td className="py-1">{b.timeline}</td>
                  <td className="py-1">{b.taxImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bankruptcy Timeline</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Phase</th>
                <th className="py-2 text-left">Duration</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {result.phases.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.phase}</td>
                  <td className="py-1">{p.duration}</td>
                  <td className="py-1">{p.action}</td>
                  <td className="py-1">{p.milestone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Non-Dischargeable Debt Handling</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">When</th>
              </tr>
            </thead>
            <tbody>
              {result.nonDischargeHandling.map((n, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{n.option}</td>
                  <td className="py-1">{n.description}</td>
                  <td className="py-1">{n.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.fraudulentReturn || result.willfulEvasion ? 'bg-red-50 border border-red-200' : Number(result.dischargeableTax) > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax Bankruptcy Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>3-year rule: Return filed 3+ years before filing</li>
          <li>240-day rule: Assessment 240+ days before filing</li>
          <li>Filing rule: Return must be filed</li>
          <li>Fraud/evasion: Debt NOT dischargeable</li>
          <li>Unfiled returns: Block dischargeability</li>
          <li>Chapter 7: Liquidation, 3-6 months</li>
          <li>Chapter 13: Repayment, 3-5 years</li>
          <li>File ALL returns before bankruptcy</li>
          <li>Wait until rules met</li>
          <li>Consult bankruptcy attorney</li>
        </ul>
      </div>
    </div>
  )
}