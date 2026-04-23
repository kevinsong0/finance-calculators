'use client'

import { useState } from 'react'

export default function StateTaxResidencyCalculator() {
  const [ domicileState, setDomicileState ] = useState('CA')
  const [ workStates, setWorkStates ] = useState(['NY', 'CA'])
  const [ daysInDomicile, setDaysInDomicile ] = useState(180)
  const [ daysInOtherStates, setDaysInOtherStates ] = useState<Record<string, number>>({ NY: 60, TX: 30 })
  const [ incomeSources, setIncomeSources ] = useState<Record<string, number>>({ CA: 80000, NY: 40000 })
  const [ ownsHomeDomicile, setOwnsHomeDomicile ] = useState(true)
  const [ voterRegistration, setVoterRegistration ] = useState('CA')
  const [ bankAccountsState, setBankAccountsState ] = useState('CA')
  const [ taxYear, setTaxYear ] = useState(2024)

  const calculate = () => {
    // State Tax Residency Determination
    // Domicile vs Statutory Residency vs Nonresident

    // Domicile: permanent home, intent to return
    // Factors: home ownership, voter registration, bank accounts,
    //          family location, professional licenses, days present

    // Statutory Residency: spend >183 days in state + permanent place of abode
    // Applies in NY, CA varies

    // Nonresident: only income earned in state taxed

    // Calculate days in each state
    const totalDays = 365
    const domicilePercentage = (daysInDomicile / totalDays) * 100
    const otherDaysTotal = Object.values(daysInOtherStates).reduce((a, b) => a + b, 0)
    const travelingDays = totalDays - daysInDomicile - otherDaysTotal

    // Statutory residency check (183-day rule)
    const statutoryThreshold = 183
    const isDomicileStatutoryResident = daysInDomicile >= statutoryThreshold

    // Residency indicators score
    let domicileScore = 0
    const indicators: string[] = []

    if (ownsHomeDomicile) {
      domicileScore += 30
      indicators.push('Owns home in domicile state')
    }
    if (voterRegistration === domicileState) {
      domicileScore += 20
      indicators.push('Voter registration in domicile')
    }
    if (bankAccountsState === domicileState) {
      domicileScore += 10
      indicators.push('Bank accounts in domicile')
    }
    if (daysInDomicile > 180) {
      domicileScore += 25
      indicators.push('More than 180 days in domicile')
    }
    if (incomeSources[domicileState] > 50000) {
      domicileScore += 15
      indicators.push('Primary income in domicile')
    }

    // Residency determination
    let residencyStatus = ''
    let primaryTaxState = domicileState

    if (domicileScore >= 70) {
      residencyStatus = 'Full Year Resident'
    } else if (isDomicileStatutoryResident) {
      residencyStatus = 'Statutory Resident (183+ days)'
    } else if (daysInDomicile > 0 && otherDaysTotal > 0) {
      residencyStatus = 'Part-Year Resident'
    } else {
      residencyStatus = 'Nonresident'
    }

    // Income allocation by state
    const totalIncome = Object.values(incomeSources).reduce((a, b) => a + b, 0)
    const domicileIncome = incomeSources[domicileState] || 0
    const otherIncome = totalIncome - domicileIncome

    // Days-based allocation (alternative method)
    const domicileIncomeByDays = totalIncome * (daysInDomicile / totalDays)

    // Tax implications
    // Resident: all income taxed
    // Part-year: income during resident period taxed
    // Nonresident: only state-source income taxed

    // Multi-state filing requirements
    const filingRequirements: { state: string; reason: string }[] = []

    // Always file in domicile
    filingRequirements.push({ state: domicileState, reason: residencyStatus })

    // Check work states
    workStates.forEach((state) => {
      if (state !== domicileState) {
        const stateIncome = incomeSources[state] || 0
        const stateDays = daysInOtherStates[state] || 0
        if (stateIncome > 0 || stateDays > 0) {
          filingRequirements.push({ state: state, reason: 'Income or days in state' })
        }
      }
    })

    // Other states with days
    Object.keys(daysInOtherStates).forEach((state) => {
      if (state !== domicileState && !workStates.includes(state)) {
        if (daysInOtherStates[state] > 0) {
          filingRequirements.push({ state: state, reason: 'Days present in state' })
        }
      }
    })

    // Special state rules
    // CA: source income + domicile
    // NY: 183-day rule + domicile
    // TX/FL/WA: no state income tax

    const statesWithNoIncomeTax = ['TX', 'FL', 'WA', 'NV', 'SD', 'AK', 'WY']
    const domicileHasNoTax = statesWithNoIncomeTax.includes(domicileState)

    // Income sourcing rules by state type
    let incomeSourcingNote = ''
    if (domicileHasNoTax) {
      incomeSourcingNote = 'Domicile state has no income tax - only file in source states'
    } else if (residencyStatus === 'Full Year Resident') {
      incomeSourcingNote = 'All income taxed by domicile state'
    } else if (residencyStatus === 'Nonresident') {
      incomeSourcingNote = 'Only income sourced to each state taxed there'
    } else {
      incomeSourcingNote = 'Part-year: allocate income by residency period'
    }

    // Double taxation risk
    // Some states don't recognize other states' taxes
    // CA, NY, CT: tax worldwide income for residents

    const doubleTaxRiskStates = ['CA', 'NY', 'CT', 'NJ']
    const hasDoubleTaxRisk = doubleTaxRiskStates.includes(domicileState) && otherIncome > 0

    // Credit for taxes paid to other states
    // Most states allow credit for taxes paid elsewhere
    const creditAvailable = !domicileHasNoTax && otherIncome > 0

    return {
      domicileState,
      workStates,
      daysInDomicile: daysInDomicile.toFixed(0),
      daysInOtherStates,
      otherDaysTotal: otherDaysTotal.toFixed(0),
      travelingDays: travelingDays.toFixed(0),
      domicilePercentage: domicilePercentage.toFixed(0),
      statutoryThreshold: statutoryThreshold.toFixed(0),
      isDomicileStatutoryResident,
      ownsHomeDomicile,
      voterRegistration,
      bankAccountsState,
      domicileScore: domicileScore.toFixed(0),
      indicators,
      residencyStatus,
      primaryTaxState,
      incomeSources,
      totalIncome: totalIncome.toFixed(0),
      domicileIncome: domicileIncome.toFixed(0),
      otherIncome: otherIncome.toFixed(0),
      domicileIncomeByDays: domicileIncomeByDays.toFixed(0),
      filingRequirements,
      statesWithNoIncomeTax,
      domicileHasNoTax,
      incomeSourcingNote,
      doubleTaxRiskStates,
      hasDoubleTaxRisk,
      creditAvailable,
      taxYear: taxYear.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">State Tax Residency Calculator</h1>
      <p className="text-gray-600 mb-4">Determine multi-state tax residency and filing requirements.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Domicile State</label>
          <select value={ domicileState } onChange={(e) => setDomicileState(e.target.value)} className="w-full border rounded p-2">
            <option value="CA">California (CA)</option>
            <option value="NY">New York (NY)</option>
            <option value="TX">Texas (TX)</option>
            <option value="FL">Florida (FL)</option>
            <option value="WA">Washington (WA)</option>
            <option value="NV">Nevada (NV)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Days in Domicile State</label>
          <input type="number" value={ daysInDomicile } min="0" max="365" onChange={(e) => setDaysInDomicile(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Days in NY (if applicable)</label>
          <input type="number" value={ daysInOtherStates.NY || 0 } onChange={(e) => setDaysInOtherStates(prev => ({ ...prev, NY: Number(e.target.value) }))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Owns Home in Domicile?</label>
          <select value={ ownsHomeDomicile ? 'yes' : 'no' } onChange={(e) => setOwnsHomeDomicile(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Voter Registration State</label>
          <input type="text" value={ voterRegistration } onChange={(e) => setVoterRegistration(e.target.value)} className="w-full border rounded p-2" maxLength={2} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income in Domicile State</label>
          <input type="number" value={ incomeSources[domicileState] || 0 } onChange={(e) => setIncomeSources(prev => ({ ...prev, [domicileState]: Number(e.target.value) }))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.residencyStatus === 'Full Year Resident' ? 'bg-green-50 border border-green-200' : result.residencyStatus === 'Statutory Resident' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.residencyStatus === 'Full Year Resident' ? 'text-green-700' : result.residencyStatus === 'Statutory Resident' ? 'text-orange-700' : 'text-blue-700'}`}>Residency Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Status:</span><span className="font-bold ml-2">{result.residencyStatus}</span></div>
          <div><span className="text-zinc-600">Domicile:</span><span className="font-medium ml-2">{result.domicileState}</span></div>
          <div><span className="text-zinc-600">Score:</span><span className="font-medium ml-2">{result.domicileScore}/100</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Domicile score based on home, voter, bank, days, and income indicators.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Days Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Domicile:</span><span className="font-medium ml-2">{result.daysInDomicile} days</span></div>
          <div><span className="text-zinc-600">Other States:</span><span className="font-medium ml-2">{result.otherDaysTotal} days</span></div>
          <div><span className="text-zinc-600">Traveling:</span><span className="font-medium ml-2">{result.travelingDays} days</span></div>
          <div><span className="text-zinc-600">Domicile %:</span><span className="font-bold ml-2">{result.domicilePercentage}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">183+ days in state + permanent abode = statutory resident (NY rule).</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Residency Indicators</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.indicators.map((indicator, i) => (
            <li key={i}>{indicator}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Strong domicile indicators: home ownership, voter registration, time spent.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Income Allocation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Income:</span><span className="font-medium ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Domicile:</span><span className="font-bold ml-2">$ {result.domicileIncome}</span></div>
          <div><span className="text-zinc-600">Other States:</span><span className="font-medium ml-2">$ {result.otherIncome}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.incomeSourcingNote}</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Multi-State Filing Requirements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">State</th>
                <th className="py-2 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {result.filingRequirements.map((req) => (
                <tr key={req.state} className="border-b">
                  <td className="py-1 font-semibold">{req.state}</td>
                  <td className="py-1">{req.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">File in domicile state plus any state where you earned income or spent significant time.</div>
      </div>

      {result.hasDoubleTaxRisk && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Double Taxation Risk</h2>
          <div className="text-sm text-red-700">Domicile state {result.domicileState} may tax worldwide income. Other income: $ {result.otherIncome}</div>
          <div className="text-xs text-zinc-600 mt-2">CA, NY, CT, NJ tax residents on all income. Credit for taxes paid to other states may apply.</div>
        </div>
      )}

      {result.domicileHasNoTax && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">No Income Tax State</h2>
          <div className="text-sm text-green-700">Domicile {result.domicileState} has no state income tax</div>
          <div className="text-xs text-zinc-600 mt-2">TX, FL, WA, NV, SD, AK, WY: no state income tax. Only file in source states.</div>
        </div>
      )}

      {result.creditAvailable && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Credit for Other State Taxes</h2>
          <div className="text-sm text-zinc-600">May claim credit in {result.domicileState} for taxes paid to other states</div>
          <div className="text-xs text-zinc-600 mt-2">Most states allow credit to reduce double taxation. Check specific state rules.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">State Residency Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Domicile: permanent home intent</li>
          <li>183-day rule: statutory residency</li>
          <li>Home ownership: strong indicator</li>
          <li>Voter registration: domicile evidence</li>
          <li>Bank accounts: ties to state</li>
          <li>CA/NY: worldwide income for residents</li>
          <li>TX/FL/WA: no income tax</li>
          <li>Part-year: allocate income</li>
          <li>Credit for other state taxes</li>
          <li>Keep residency documentation</li>
        </ul>
      </div>
    </div>
  )
}