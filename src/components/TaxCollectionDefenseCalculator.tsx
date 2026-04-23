'use client'

import { useState } from 'react'

export default function TaxCollectionDefenseCalculator() {
  const [collectionStage, setCollectionStage] = useState<'billing' | 'notice' | 'levy_warning' | 'levy_active' | 'seizure'>('notice')
  const [taxDebtAmount, setTaxDebtAmount] = useState(30000)
  const [yearsOwed, setYearsOwed] = useState('2022,2023')
  const [assetValue, setAssetValue] = useState(100000)
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000)
  const [employmentType, setEmploymentType] = useState<'w2' | 'self_employed' | 'retired' | 'unemployed'>('w2')
  const [hasBankAccount, setHasBankAccount] = useState(true)
  const [hasProperty, setHasProperty] = useState(true)
  const [hasRetirementAccounts, setHasRetirementAccounts] = useState(true)
  const [cdpRequested, setCdpRequested] = useState(false)
  const [paymentPlanAttempted, setPaymentPlanAttempted] = useState(false)

  const calculate = () => {
    // Tax Collection Defense Calculator
    // Calculate defense strategies against IRS collection action

    const disposableMonthly = monthlyIncome - monthlyExpenses
    const yearsList = yearsOwed.split(',').map(y => y.trim())

    // Collection risk assessment
    let riskLevel = ''
    let riskColor = ''
    if (collectionStage === 'seizure') {
      riskLevel = 'CRITICAL - Active seizure. Immediate legal assistance required.'
      riskColor = 'red'
    } else if (collectionStage === 'levy_active') {
      riskLevel = 'SEVERE - Active levy. Bank accounts or wages being seized. CDP appeal may still be possible.'
      riskColor = 'red'
    } else if (collectionStage === 'levy_warning') {
      riskLevel = 'HIGH - Levy imminent. File CDP appeal within 30 days critical.'
      riskColor = 'orange'
    } else if (collectionStage === 'notice') {
      riskLevel = 'MODERATE - Collection notices active. Time to negotiate resolution.'
      riskColor = 'yellow'
    } else {
      riskLevel = 'LOW - Billing stage. Options available to resolve before escalation.'
      riskColor = 'green'
    }

    // Defense options by stage
    const defenseOptions: { stage: string; strategy: string; action: string; deadline: string; effectiveness: string }[] = []

    if (collectionStage === 'billing') {
      defenseOptions.push({
        stage: 'Billing',
        strategy: 'Pay Full Amount',
        action: 'Pay tax debt to stop collection',
        deadline: 'Before notice escalation',
        effectiveness: '100% - Ends collection',
      })
      defenseOptions.push({
        stage: 'Billing',
        strategy: 'Payment Plan',
        action: 'Request installment agreement',
        deadline: 'Before levy stage',
        effectiveness: 'High - Stops levy if approved',
      })
      defenseOptions.push({
        stage: 'Billing',
        strategy: 'Offer in Compromise',
        action: 'Submit OIC application',
        deadline: 'Before levy stage',
        effectiveness: 'Moderate - May settle for less',
      })
    }

    if (collectionStage === 'notice') {
      defenseOptions.push({
        stage: 'Notice',
        strategy: 'Request Payment Plan',
        action: 'Call IRS or apply online for IA',
        deadline: 'Before levy notice',
        effectiveness: 'High - Prevents escalation',
      })
      defenseOptions.push({
        stage: 'Notice',
        strategy: 'Request CNC Status',
        action: 'Submit financial statement showing hardship',
        deadline: 'Before levy stage',
        effectiveness: 'Moderate - Temporary relief',
      })
      defenseOptions.push({
        stage: 'Notice',
        strategy: ' Penalty Abatement',
        action: 'Request FTA or reasonable cause abatement',
        deadline: 'Anytime',
        effectiveness: 'Moderate - Reduces total debt',
      })
    }

    if (collectionStage === 'levy_warning' || collectionStage === 'levy_active') {
      defenseOptions.push({
        stage: 'Levy Warning/Active',
        strategy: 'CDP Appeal',
        action: 'File Form 12153 within 30 days',
        deadline: '30 days from levy notice',
        effectiveness: 'High - Stops collection during appeal',
      })
      defenseOptions.push({
        stage: 'Levy Warning/Active',
        strategy: 'Equivalent Hearing',
        action: 'Request if CDP deadline missed (1 year)',
        deadline: 'Within 1 year',
        effectiveness: 'Moderate - No automatic stay',
      })
      defenseOptions.push({
        stage: 'Levy Warning/Active',
        strategy: 'Hardship Release',
        action: 'Submit CIS proving economic hardship',
        deadline: 'Immediately',
        effectiveness: 'Moderate - May release levy',
      })
    }

    if (collectionStage === 'seizure') {
      defenseOptions.push({
        stage: 'Seizure',
        strategy: 'Legal Challenge',
        action: 'Request judicial review of seizure',
        deadline: 'Immediately',
        effectiveness: 'Variable - Depends on grounds',
      })
      defenseOptions.push({
        stage: 'Seizure',
        strategy: 'Administrative Appeal',
        action: 'Appeal seizure action',
        deadline: 'Immediately',
        effectiveness: 'Moderate - May reverse seizure',
      })
    }

    // Asset protection assessment
    const assetProtection: { asset: string; protected: boolean; protectionType: string; riskLevel: string }[] = []

    if (hasBankAccount) {
      const bankRisk = disposableMonthly > 0 && !cdpRequested ? 'High' : 'Moderate'
      assetProtection.push({
        asset: 'Bank Account',
        protected: cdpRequested,
        protectionType: cdpRequested ? 'CDP stay' : 'None active',
        riskLevel: bankRisk,
      })
    }

    if (hasProperty) {
      const propertyRisk = taxDebtAmount > assetValue * 0.3 ? 'High' : 'Moderate'
      assetProtection.push({
        asset: 'Real Property',
        protected: taxDebtAmount < assetValue * 0.5,
        protectionType: 'Equity buffer',
        riskLevel: propertyRisk,
      })
    }

    if (hasRetirementAccounts) {
      assetProtection.push({
        asset: 'Retirement Accounts',
        protected: true,
        protectionType: 'IRS rarely levies retirement',
        riskLevel: 'Low',
      })
    }

    assetProtection.push({
      asset: 'Wages/Salary',
      protected: cdpRequested || paymentPlanAttempted,
      protectionType: cdpRequested ? 'CDP stay' : paymentPlanAttempted ? 'Plan pending' : 'None',
      riskLevel: employmentType === 'w2' && !cdpRequested ? 'High' : 'Moderate',
    })

    // Timeline urgency
    const urgencyFactors = [
      { factor: 'CDP Deadline', status: collectionStage === 'levy_warning' ? '30 days critical' : collectionStage === 'levy_active' ? 'Check notice date' : 'Not applicable', urgency: collectionStage === 'levy_warning' ? 'Critical' : 'Low' },
      { factor: 'Levy Risk', status: hasBankAccount && !cdpRequested ? 'Bank levy possible' : 'Protected by CDP', urgency: !cdpRequested ? 'High' : 'Low' },
      { factor: 'Wage Garnishment', status: employmentType === 'w2' && !paymentPlanAttempted ? 'Risk exists' : 'Mitigated', urgency: employmentType === 'w2' && !paymentPlanAttempted ? 'High' : 'Moderate' },
      { factor: 'Property Seizure', status: hasProperty && taxDebtAmount > 50000 ? 'Possible' : 'Lower risk', urgency: taxDebtAmount > 50000 ? 'Moderate' : 'Low' },
    ]

    // Resolution recommendation
    let recommendation = ''
    if (disposableMonthly <= 0) {
      recommendation = `No disposable income. Request Currently Not Collectible status. Submit Form 433-A/B showing financial hardship. Collection should halt. Document all expenses thoroughly.`
    } else if (taxDebtAmount > disposableMonthly * 72) {
      recommendation = `Debt exceeds 6-year payment capacity. Consider Offer in Compromise based on doubt as to collectibility. If OIC unlikely, CNC may be appropriate. Consult tax professional.`
    } else if (disposableMonthly > 0 && taxDebtAmount < 50000) {
      recommendation = `Payment plan likely achievable. Monthly payment: ~$${(taxDebtAmount / 72).toFixed(0)}. Request streamlined installment agreement. Consider paying lump sum if possible.`
    } else {
      recommendation = `Complex situation. Consider professional representation. Evaluate OIC, payment plan, or CNC options based on full financial analysis. CDP appeal if levy notice received.`
    }

    return {
      collectionStage,
      taxDebtAmount: taxDebtAmount.toFixed(0),
      yearsOwed: yearsList.join(', '),
      assetValue: assetValue.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      disposableMonthly: disposableMonthly.toFixed(0),
      employmentType,
      hasBankAccount,
      hasProperty,
      hasRetirementAccounts,
      cdpRequested,
      paymentPlanAttempted,
      riskLevel,
      riskColor,
      defenseOptions,
      assetProtection,
      urgencyFactors,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Collection Defense Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate defense strategies against IRS collection action.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Collection Stage</label>
          <select value={collectionStage} onChange={(e) => setCollectionStage(e.target.value as 'billing' | 'notice' | 'levy_warning' | 'levy_active' | 'seizure')} className="w-full border rounded p-2">
            <option value="billing">Billing - Initial Bills</option>
            <option value="notice">Notice - Collection Notices</option>
            <option value="levy_warning">Levy Warning - Intent to Levy</option>
            <option value="levy_active">Levy Active - Bank/Wage Levy</option>
            <option value="seizure">Seizure - Property Seizure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Debt Amount</label>
          <input type="number" value={taxDebtAmount} onChange={(e) => setTaxDebtAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Owed (comma separated)</label>
          <input type="text" value={yearsOwed} onChange={(e) => setYearsOwed(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Asset Value</label>
          <input type="number" value={assetValue} onChange={(e) => setAssetValue(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">Employment Type</label>
          <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value as 'w2' | 'self_employed' | 'retired' | 'unemployed')} className="w-full border rounded p-2">
            <option value="w2">W-2 Employee</option>
            <option value="self_employed">Self-Employed</option>
            <option value="retired">Retired</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Assets & Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasBankAccount} onChange={(e) => setHasBankAccount(e.target.checked)} className="mr-2" />
              <span className="text-sm">Has Bank Account</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasProperty} onChange={(e) => setHasProperty(e.target.checked)} className="mr-2" />
              <span className="text-sm">Owns Property</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasRetirementAccounts} onChange={(e) => setHasRetirementAccounts(e.target.checked)} className="mr-2" />
              <span className="text-sm">Has Retirement Accounts</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={cdpRequested} onChange={(e) => setCdpRequested(e.target.checked)} className="mr-2" />
              <span className="text-sm">CDP Appeal Requested</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={paymentPlanAttempted} onChange={(e) => setPaymentPlanAttempted(e.target.checked)} className="mr-2" />
              <span className="text-sm">Payment Plan Attempted</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.riskColor === 'red' ? 'bg-red-50 border border-red-200' : result.riskColor === 'orange' ? 'bg-orange-50 border border-orange-200' : result.riskColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Collection Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Stage:</span><span className="font-bold ml-2">{result.collectionStage}</span></div>
          <div><span className="text-zinc-600">Debt:</span><span className="font-bold ml-2">$ {result.taxDebtAmount}</span></div>
          <div><span className="text-zinc-600">Disposable Income:</span><span className={`font-bold ml-2 ${Number(result.disposableMonthly) <= 0 ? 'text-red-700' : ''}`}>$ {result.disposableMonthly}/mo</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.riskColor === 'red' ? 'text-red-700' : result.riskColor === 'orange' ? 'text-orange-700' : result.riskColor === 'yellow' ? 'text-yellow-700' : 'text-green-700'}`}>{result.riskLevel}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Defense Strategies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Stage</th>
                <th className="py-2 text-left">Strategy</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Deadline</th>
                <th className="py-2 text-left">Effectiveness</th>
              </tr>
            </thead>
            <tbody>
              {result.defenseOptions.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.stage}</td>
                  <td className="py-1">{d.strategy}</td>
                  <td className="py-1">{d.action}</td>
                  <td className="py-1">{d.deadline}</td>
                  <td className="py-1">{d.effectiveness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Asset Protection Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Asset</th>
                <th className="py-2 text-left">Protected</th>
                <th className="py-2 text-left">Protection Type</th>
                <th className="py-2 text-left">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {result.assetProtection.map((a, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{a.asset}</td>
                  <td className="py-1"><span className={a.protected ? 'text-green-700' : 'text-red-700'}>{a.protected ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{a.protectionType}</td>
                  <td className="py-1"><span className={a.riskLevel === 'High' ? 'text-red-700' : a.riskLevel === 'Moderate' ? 'text-orange-700' : 'text-green-700'}>{a.riskLevel}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Urgency Factors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Factor</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Urgency</th>
              </tr>
            </thead>
            <tbody>
              {result.urgencyFactors.map((u, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{u.factor}</td>
                  <td className="py-1">{u.status}</td>
                  <td className="py-1"><span className={u.urgency === 'Critical' ? 'text-red-700 font-bold' : u.urgency === 'High' ? 'text-orange-700' : ''}>{u.urgency}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.disposableMonthly) <= 0 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Resolution Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Collection Defense Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Respond to all IRS notices promptly</li>
          <li>CDP appeal: 30 days from levy notice</li>
          <li>Payment plan stops levy if approved</li>
          <li>CNC status for financial hardship</li>
          <li>OIC settles debt for less</li>
          <li>Bank levy: 21-day hold period</li>
          <li>Wage levy: ongoing until resolved</li>
          <li>Retirement accounts rarely levied</li>
          <li>Document all communications</li>
          <li>Consider professional representation</li>
        </ul>
      </div>
    </div>
  )
}