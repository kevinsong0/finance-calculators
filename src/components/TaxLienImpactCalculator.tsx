'use client'

import { useState } from 'react'

export default function TaxLienImpactCalculator() {
  const [lienAmount, setLienAmount] = useState(25000)
  const [lienType, setLienType] = useState<'federal' | 'state' | 'property'>('federal')
  const [lienDate, setLienDate] = useState('2024-01-15')
  const [creditScoreBefore, setCreditScoreBefore] = useState(750)
  const [propertyValue, setPropertyValue] = useState(300000)
  const [mortgageBalance, setMortgageBalance] = useState(200000)
  const [lienPriority, setLienPriority] = useState<'first' | 'second' | 'subordinate'>('first')
  const [dischargePossible, setDischargePossible] = useState(false)

  const calculate = () => {
    // Tax Lien Impact Calculator
    // Calculate credit, property, and financial impact of tax liens

    // Credit score impact (tax liens historically severe)
    // Note: Credit reporting of tax liens changed in 2018-2019
    // Many tax liens removed from credit reports per NCAP
    // But liens still affect property and financing

    let creditImpact = 0
    let creditScoreAfter = creditScoreBefore

    // Estimated credit impact based on lien type and amount
    if (lienType === 'federal') {
      creditImpact = 50 // Federal tax lien most severe
    } else if (lienType === 'state') {
      creditImpact = 40 // State tax lien
    } else {
      creditImpact = 60 // Property tax lien can be severe
    }

    creditScoreAfter = Math.max(300, creditScoreBefore - creditImpact)

    // Property impact
    const equity = propertyValue - mortgageBalance
    const lienEquityImpact = Math.min(lienAmount, equity)
    const encumberedEquity = equity - lienEquityImpact
    const lienCoverageRatio = propertyValue > 0 ? lienAmount / propertyValue : 0

    // Sale impact - lien must be paid at sale
    const netFromSale = propertyValue - mortgageBalance - lienAmount
    const salePossible = netFromSale > 0

    // Refinancing impact
    let refinancePossible = false
    let refinanceNotes = ''
    if (lienPriority === 'subordinate' && lienAmount < equity * 0.2) {
      refinancePossible = true
      refinanceNotes = 'Possible if lien subordinated to new mortgage'
    } else if (lienAmount < 10000) {
      refinancePossible = true
      refinanceNotes = 'May be possible to pay lien at closing'
    } else {
      refinancePossible = false
      refinanceNotes = 'Lien must be discharged or subordinated before refinancing'
    }

    // Discharge eligibility
    const dischargeEligible = dischargePossible || lienAmount < propertyValue * 0.25

    // Subordination eligibility
    let subordinateEligible = false
    let subordinateNotes = ''
    if (lienType === 'federal' && lienAmount < equity * 0.5) {
      subordinateEligible = true
      subordinateNotes = 'IRS may subordinate if refinancing benefits IRS collection'
    } else {
      subordinateEligible = false
      subordinateNotes = 'Generally not eligible for subordination'
    }

    // Collection timeline
    const lienDateObj = new Date(lienDate)
    const statuteYear = lienDateObj.getFullYear() + 10 // 10-year statute for federal
    const monthsSinceLien = Math.floor((new Date().getTime() - lienDateObj.getTime()) / (1000 * 60 * 60 * 24 * 30))
    const monthsUntilStatute = Math.max(0, 10 * 12 - monthsSinceLien)

    // Impact categories
    const impacts = [
      { category: 'Credit Score', impact: `-${creditImpact} points`, severity: creditImpact > 50 ? 'High' : 'Moderate' },
      { category: 'Property Equity', impact: `$${lienEquityImpact.toFixed(0)} encumbered`, severity: lienEquityImpact > equity * 0.5 ? 'High' : 'Moderate' },
      { category: 'Sale Proceeds', impact: salePossible ? `$${netFromSale.toFixed(0)} net` : 'Cannot sell without paying lien', severity: salePossible ? 'Moderate' : 'High' },
      { category: 'Refinancing', impact: refinancePossible ? 'Possible with conditions' : 'Blocked until discharge', severity: refinancePossible ? 'Low' : 'High' },
      { category: 'Public Record', impact: 'Appears in county records', severity: 'High' },
      { category: 'Lien Duration', impact: `${monthsUntilStatute} months until statute`, severity: monthsUntilStatute < 12 ? 'High' : 'Moderate' },
    ]

    // Resolution options
    const resolutionOptions = [
      { option: 'Pay Lien', action: 'Pay full amount, obtain lien release', timeline: 'Immediate', cost: lienAmount },
      { option: 'Discharge Lien', action: 'Apply for discharge if IRS interest protected', timeline: '30-60 days', cost: 0 },
      { option: 'Subordinate Lien', action: 'Request subordination for refinancing', timeline: '30-45 days', cost: 0 },
      { option: 'Offer in Compromise', action: 'Settle debt for less than full amount', timeline: '6-12 months', cost: 'Varies' },
      { option: 'Payment Agreement', action: 'Set up installment agreement', timeline: 'Ongoing', cost: 'Monthly payments' },
      { option: 'Wait for Statute', action: 'Wait 10 years for statute expiration', timeline: `${monthsUntilStatute} months`, cost: 'Interest accrues' },
    ]

    // Recommendation
    let recommendation = ''
    if (lienAmount < 5000) {
      recommendation = `Small lien amount ($${lienAmount.toFixed(0)}). Best option: pay lien and obtain release. Consider including in refinancing if possible. Impact manageable.`
    } else if (lienAmount < equity * 0.3) {
      recommendation = `Moderate lien relative to equity. Options: pay lien, subordinate for refinancing, or negotiate payment plan. Discharge may be possible if IRS interest protected.`
    } else {
      recommendation = `Large lien relative to equity ($${lienAmount.toFixed(0)}). Property significantly encumbered. Consider Offer in Compromise or payment agreement. Discharge unlikely without payment.`
    }

    return {
      lienAmount: lienAmount.toFixed(0),
      lienType,
      lienDate,
      creditScoreBefore: creditScoreBefore.toFixed(0),
      creditScoreAfter: creditScoreAfter.toFixed(0),
      creditImpact: creditImpact.toFixed(0),
      propertyValue: propertyValue.toFixed(0),
      mortgageBalance: mortgageBalance.toFixed(0),
      equity: equity.toFixed(0),
      lienEquityImpact: lienEquityImpact.toFixed(0),
      encumberedEquity: encumberedEquity.toFixed(0),
      lienCoverageRatio: lienCoverageRatio.toFixed(2),
      netFromSale: netFromSale.toFixed(0),
      salePossible,
      refinancePossible,
      refinanceNotes,
      dischargeEligible,
      subordinateEligible,
      subordinateNotes,
      statuteYear,
      monthsSinceLien: monthsSinceLien.toFixed(0),
      monthsUntilStatute: monthsUntilStatute.toFixed(0),
      impacts,
      resolutionOptions,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Lien Impact Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate credit, property, and financial impact of tax liens.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Lien Amount</label>
          <input type="number" value={lienAmount} onChange={(e) => setLienAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lien Type</label>
          <select value={lienType} onChange={(e) => setLienType(e.target.value as 'federal' | 'state' | 'property')} className="w-full border rounded p-2">
            <option value="federal">Federal Tax Lien (IRS)</option>
            <option value="state">State Tax Lien</option>
            <option value="property">Property Tax Lien</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lien Filed Date</label>
          <input type="date" value={lienDate} onChange={(e) => setLienDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credit Score Before Lien</label>
          <input type="number" value={creditScoreBefore} onChange={(e) => setCreditScoreBefore(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Value</label>
          <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mortgage Balance</label>
          <input type="number" value={mortgageBalance} onChange={(e) => setMortgageBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lien Priority</label>
          <select value={lienPriority} onChange={(e) => setLienPriority(e.target.value as 'first' | 'second' | 'subordinate')} className="w-full border rounded p-2">
            <option value="first">First Position Lien</option>
            <option value="second">Second Position</option>
            <option value="subordinate">Subordinate/Junior Lien</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Additional Options</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={dischargePossible} onChange={(e) => setDischargePossible(e.target.checked)} className="mr-2" />
              <span className="text-sm">Discharge may be possible</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.creditImpact) > 50 ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Impact Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Lien Amount:</span><span className="font-bold ml-2">$ {result.lienAmount}</span></div>
          <div><span className="text-zinc-600">Credit Before:</span><span className="font-medium ml-2">{result.creditScoreBefore}</span></div>
          <div><span className="text-zinc-600">Credit After:</span><span className={`font-bold ml-2 ${Number(result.creditScoreAfter) < 650 ? 'text-red-700' : ''}`}>{result.creditScoreAfter}</span></div>
          <div><span className="text-zinc-600">Credit Impact:</span><span className={`font-bold ml-2 text-red-700`}>-{result.creditImpact} pts</span></div>
          <div><span className="text-zinc-600">Equity Encumbered:</span><span className="font-bold ml-2">$ {result.lienEquityImpact}</span></div>
          <div><span className="text-zinc-600">Net from Sale:</span><span className={`font-bold ml-2 ${result.salePossible ? '' : 'text-red-700'}`}>$ {result.netFromSale}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Impact Categories</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Impact</th>
                <th className="py-2 text-left">Severity</th>
              </tr>
            </thead>
            <tbody>
              {result.impacts.map((i, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{i.category}</td>
                  <td className="py-1">{i.impact}</td>
                  <td className="py-1"><span className={i.severity === 'High' ? 'text-red-700' : 'text-orange-700'}>{i.severity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Resolution Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {result.resolutionOptions.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.option}</td>
                  <td className="py-1">{r.action}</td>
                  <td className="py-1">{r.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.lienAmount) > Number(result.equity) * 0.3 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax Lien Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Tax liens attach to all property</li>
          <li>IRS lien: federal, 10-year statute</li>
          <li>State lien: varies by state</li>
          <li>Property lien: can foreclose</li>
          <li>Public record in county</li>
          <li>Blocks refinancing usually</li>
          <li>Must pay at property sale</li>
          <li>Discharge possible conditions</li>
          <li>Subordination for refinance</li>
          <li>Release after payment</li>
        </ul>
      </div>
    </div>
  )
}