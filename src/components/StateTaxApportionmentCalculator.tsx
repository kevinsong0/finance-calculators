'use client'

import { useState } from 'react'

export default function StateTaxApportionmentCalculator() {
  const [totalIncome, setTotalIncome] = useState(200000)
  const [state1, setState1] = useState('California')
  const [state1Rate, setState1Rate] = useState(9.3)
  const [state1Days, setState1Days] = useState(180)
  const [state2, setState2] = useState('Texas')
  const [state2Rate, setState2Rate] = useState(0)
  const [state2Days, setState2Days] = useState(185)
  const [incomeType, setIncomeType] = useState<'wages' | 'business' | 'investment'>('wages')
  const [state1SourceIncome, setState1SourceIncome] = useState(120000)
  const [state2SourceIncome, setState2SourceIncome] = useState(80000)

  const calculate = () => {
    // State Tax Apportionment Calculator
    // Apportion income between states based on residency and source

    // Methods of apportionment:
    // 1. Time-based (days spent in each state)
    // 2. Source-based (where income earned/generated)
    // 3. Domicile (primary residence)

    // Different rules by income type:
    // - Wages: source at work location
    // - Business: apportion by payroll/property/sales
    // - Investment: domicile state

    const totalDays = state1Days + state2Days
    const state1Percentage = totalDays > 0 ? state1Days / totalDays : 0.5
    const state2Percentage = totalDays > 0 ? state2Days / totalDays : 0.5

    // Calculate apportioned income based on method
    let state1ApportionedIncome = 0
    let state2ApportionedIncome = 0

    if (incomeType === 'wages') {
      // Wages: source-based apportionment
      state1ApportionedIncome = state1SourceIncome
      state2ApportionedIncome = state2SourceIncome
    } else if (incomeType === 'business') {
      // Business: time-based apportionment
      state1ApportionedIncome = totalIncome * state1Percentage
      state2ApportionedIncome = totalIncome * state2Percentage
    } else if (incomeType === 'investment') {
      // Investment: domicile state (assume state1)
      state1ApportionedIncome = totalIncome
      state2ApportionedIncome = 0
    }

    // Calculate state taxes
    const state1Tax = state1ApportionedIncome * (state1Rate / 100)
    const state2Tax = state2ApportionedIncome * (state2Rate / 100)
    const totalStateTax = state1Tax + state2Tax

    // Effective state tax rate
    const effectiveStateRate = (totalStateTax / totalIncome) * 100

    // Credit for taxes paid to other states
    // Resident state allows credit for taxes paid to non-resident states
    const creditAvailable = Math.min(state2Tax, state1Tax * state2Percentage)
    const netState1Tax = state1Tax - creditAvailable

    // Alternative: if domiciled in no-tax state
    const domicileNoTaxBenefit = totalIncome * (state1Rate / 100)

    // Days-based allocation summary
    const daysAllocation = [
      { state: state1, days: state1Days, percentage: state1Percentage * 100, income: state1ApportionedIncome, tax: state1Tax, rate: state1Rate },
      { state: state2, days: state2Days, percentage: state2Percentage * 100, income: state2ApportionedIncome, tax: state2Tax, rate: state2Rate },
    ]

    // Recommendation
    let recommendation = ''
    if (state2Rate === 0 && state2Days > 0) {
      recommendation = `${state2} has 0% state tax. Spending ${state2Days} days there reduces ${state1} tax exposure. ${state1} tax on $${state1ApportionedIncome.toFixed(0)}: $${state1Tax.toFixed(0)}. Consider domiciling in ${state2} to eliminate ${state1} tax entirely on investment income.`
    } else if (state1Rate > state2Rate) {
      recommendation = `${state1} (${state1Rate}%) has higher rate than ${state2} (${state2Rate}%). Apportioned income: ${state1}: $${state1ApportionedIncome.toFixed(0)}, ${state2}: $${state2ApportionedIncome.toFixed(0)}. Total state tax: $${totalStateTax.toFixed(0)}. Consider moving more days to ${state2}.`
    } else if (state2Rate > state1Rate) {
      recommendation = `${state2} (${state2Rate}%) has higher rate than ${state1} (${state1Rate}%). Apportioned income: ${state1}: $${state1ApportionedIncome.toFixed(0)}, ${state2}: $${state2ApportionedIncome.toFixed(0)}. Total state tax: $${totalStateTax.toFixed(0)}. Consider moving more days to ${state1}.`
    } else {
      recommendation = `States have similar rates. Total state tax: $${totalStateTax.toFixed(0)}. Effective rate: ${effectiveStateRate.toFixed(2)}%. No significant benefit from timing optimization. Focus on other planning strategies.`
    }

    if (incomeType === 'investment') {
      recommendation += ` Investment income taxed at domicile state. Choose domicile carefully.`
    }

    // State rules summary
    const stateRules = [
      { rule: '183-day rule', description: 'Many states use 183 days to determine residency' },
      { rule: 'Domicile', description: 'Permanent home location determines tax home' },
      { rule: 'Source income', description: 'Wages taxed where work performed' },
      { rule: 'Investment income', description: 'Taxed at domicile state' },
      { rule: 'Credit mechanism', description: 'Resident state credits tax paid to other states' },
    ]

    return {
      totalIncome: totalIncome.toFixed(0),
      state1,
      state1Rate: state1Rate.toFixed(1),
      state1Days: state1Days.toFixed(0),
      state2,
      state2Rate: state2Rate.toFixed(1),
      state2Days: state2Days.toFixed(0),
      incomeType,
      state1SourceIncome: state1SourceIncome.toFixed(0),
      state2SourceIncome: state2SourceIncome.toFixed(0),
      state1Percentage: (state1Percentage * 100).toFixed(1),
      state2Percentage: (state2Percentage * 100).toFixed(1),
      state1ApportionedIncome: state1ApportionedIncome.toFixed(0),
      state2ApportionedIncome: state2ApportionedIncome.toFixed(0),
      state1Tax: state1Tax.toFixed(0),
      state2Tax: state2Tax.toFixed(0),
      totalStateTax: totalStateTax.toFixed(0),
      effectiveStateRate: effectiveStateRate.toFixed(2),
      creditAvailable: creditAvailable.toFixed(0),
      netState1Tax: netState1Tax.toFixed(0),
      daysAllocation,
      recommendation,
      stateRules,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">State Tax Apportionment Calculator</h1>
      <p className="text-gray-600 mb-4">Apportion income between states based on residency and source rules.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Income</label>
          <input type="number" value={totalIncome} onChange={(e) => setTotalIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income Type</label>
          <select value={incomeType} onChange={(e) => setIncomeType(e.target.value as 'wages' | 'business' | 'investment')} className="w-full border rounded p-2">
            <option value="wages">Wages/Salary</option>
            <option value="business">Business Income</option>
            <option value="investment">Investment Income</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">State 1 Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">State Name</label>
            <input type="text" value={state1} onChange={(e) => setState1(e.target.value)} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
            <input type="number" step="0.1" value={state1Rate} onChange={(e) => setState1Rate(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Days in State</label>
            <input type="number" value={state1Days} onChange={(e) => setState1Days(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          {incomeType === 'wages' && (
            <div>
              <label className="block text-sm font-medium mb-1">Source Income in State</label>
              <input type="number" value={state1SourceIncome} onChange={(e) => setState1SourceIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          )}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">State 2 Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">State Name</label>
            <input type="text" value={state2} onChange={(e) => setState2(e.target.value)} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
            <input type="number" step="0.1" value={state2Rate} onChange={(e) => setState2Rate(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Days in State</label>
            <input type="number" value={state2Days} onChange={(e) => setState2Days(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          {incomeType === 'wages' && (
            <div>
              <label className="block text-sm font-medium mb-1">Source Income in State</label>
              <input type="number" value={state2SourceIncome} onChange={(e) => setState2SourceIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          )}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Days-Based Allocation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">State</th>
                <th className="py-2 text-left">Days</th>
                <th className="py-2 text-left">Percentage</th>
                <th className="py-2 text-left">Rate</th>
                <th className="py-2 text-left">Apportioned Income</th>
                <th className="py-2 text-left">Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.daysAllocation.map((d) => (
                <tr key={d.state} className="border-b">
                  <td className="py-1 font-semibold">{d.state}</td>
                  <td className="py-1">{d.days}</td>
                  <td className="py-1">{d.percentage.toFixed(1)}%</td>
                  <td className="py-1">{d.rate}%</td>
                  <td className="py-1">$ {d.income.toFixed(0)}</td>
                  <td className="py-1 font-bold">$ {d.tax.toFixed(0)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="py-1">Total</td>
                <td className="py-1">{Number(result.state1Days) + Number(result.state2Days)}</td>
                <td className="py-1">100%</td>
                <td className="py-1"></td>
                <td className="py-1">$ {result.totalIncome}</td>
                <td className="py-1">$ {result.totalStateTax}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">State Tax Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">{result.state1} Tax:</span><span className="font-medium ml-2">$ {result.state1Tax}</span></div>
          <div><span className="text-zinc-600">{result.state2} Tax:</span><span className="font-medium ml-2">$ {result.state2Tax}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-green-700 ml-2">$ {result.totalStateTax}</span></div>
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveStateRate}%</span></div>
          <div><span className="text-zinc-600">Credit Available:</span><span className="font-medium ml-2">$ {result.creditAvailable}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">State Tax Rules</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.stateRules.map((r, i) => (
            <li key={i}><strong>{r.rule}:</strong> {r.description}</li>
          ))}
        </ul>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Apportionment Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>183-day rule for residency</li>
          <li>Domicile determines tax home</li>
          <li>Wages taxed at work location</li>
          <li>Investment income at domicile</li>
          <li>Credit for taxes paid elsewhere</li>
          <li>Part-year resident rules</li>
          <li>Non-resident filing requirements</li>
          <li>Track days carefully</li>
          <li>Move timing considerations</li>
          <li>State-specific rules vary</li>
        </ul>
      </div>
    </div>
  )
}