'use client'

import { useState } from 'react'

export default function StateIncomeTaxComparisonCalculator() {
  const [income, setIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint'>('single')
  const [deductions, setDeductions] = useState(15000)
  const [currentState, setCurrentState] = useState('CA')
  const [targetState, setTargetState] = useState('TX')

  const calculate = () => {
    // State Income Tax Comparison Calculator
    // Compare state tax burden between two states

    // State tax rates (simplified - actual rates vary by bracket)
    const stateRates: Record<string, { hasIncomeTax: boolean; maxRate: number; minRate: number; avgRate: number }> = {
      CA: { hasIncomeTax: true, maxRate: 13.3, minRate: 1, avgRate: 7.5 },
      TX: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
      FL: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
      NY: { hasIncomeTax: true, maxRate: 10.9, minRate: 4, avgRate: 6.5 },
      WA: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
      PA: { hasIncomeTax: true, maxRate: 3.07, minRate: 3.07, avgRate: 3.07 },
      IL: { hasIncomeTax: true, maxRate: 4.95, minRate: 4.95, avgRate: 4.95 },
      OH: { hasIncomeTax: true, maxRate: 4.997, minRate: 0, avgRate: 3.5 },
      MI: { hasIncomeTax: true, maxRate: 4.25, minRate: 4.25, avgRate: 4.25 },
      GA: { hasIncomeTax: true, maxRate: 5.75, minRate: 1, avgRate: 4 },
      NC: { hasIncomeTax: true, maxRate: 4.75, minRate: 4.75, avgRate: 4.75 },
      NJ: { hasIncomeTax: true, maxRate: 10.75, minRate: 1.4, avgRate: 5 },
      MA: { hasIncomeTax: true, maxRate: 5, minRate: 5, avgRate: 5 },
      VA: { hasIncomeTax: true, maxRate: 5.75, minRate: 2, avgRate: 4 },
      AZ: { hasIncomeTax: true, maxRate: 2.59, minRate: 2.59, avgRate: 2.59 },
      CO: { hasIncomeTax: true, maxRate: 4.4, minRate: 4.4, avgRate: 4.4 },
      OR: { hasIncomeTax: true, maxRate: 9.9, minRate: 4.75, avgRate: 7 },
      CT: { hasIncomeTax: true, maxRate: 6.99, minRate: 3, avgRate: 5 },
      MD: { hasIncomeTax: true, maxRate: 5.75, minRate: 2, avgRate: 4 },
      MN: { hasIncomeTax: true, maxRate: 9.85, minRate: 5.35, avgRate: 7 },
      MO: { hasIncomeTax: true, maxRate: 4.8, minRate: 0, avgRate: 3 },
      SC: { hasIncomeTax: true, maxRate: 6.4, minRate: 0, avgRate: 4 },
      WI: { hasIncomeTax: true, maxRate: 7.65, minRate: 3.54, avgRate: 5 },
      IN: { hasIncomeTax: true, maxRate: 3.15, minRate: 3.15, avgRate: 3.15 },
      UT: { hasIncomeTax: true, maxRate: 4.65, minRate: 4.65, avgRate: 4.65 },
      NM: { hasIncomeTax: true, maxRate: 5.9, minRate: 1.7, avgRate: 4 },
      NV: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
      NH: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 }, // Only taxes dividends/interest
      TN: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 }, // Hall income tax repealed 2021
      SD: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
      AK: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
      WY: { hasIncomeTax: false, maxRate: 0, minRate: 0, avgRate: 0 },
    }

    const taxableIncome = income - deductions

    // Calculate estimated state tax using average rate approximation
    const currentRate = stateRates[currentState] || { hasIncomeTax: true, maxRate: 5, minRate: 1, avgRate: 3 }
    const targetRate = stateRates[targetState] || { hasIncomeTax: true, maxRate: 5, minRate: 1, avgRate: 3 }

    // Estimate tax based on income bracket position
    const currentTax = currentRate.hasIncomeTax ? taxableIncome * (currentRate.avgRate / 100) : 0
    const targetTax = targetRate.hasIncomeTax ? taxableIncome * (targetRate.avgRate / 100) : 0

    // Tax difference
    const taxDifference = currentTax - targetTax
    const taxSavingsPercent = currentTax > 0 ? ((taxDifference / currentTax) * 100) : 0

    // Effective rates
    const currentEffectiveRate = income > 0 ? (currentTax / income) * 100 : 0
    const targetEffectiveRate = income > 0 ? (targetTax / income) * 100 : 0

    // Comparison summary
    const comparison = [
      { state: currentState, hasIncomeTax: currentRate.hasIncomeTax, minRate: currentRate.minRate, maxRate: currentRate.maxRate, estimatedTax: currentTax, effectiveRate: currentEffectiveRate },
      { state: targetState, hasIncomeTax: targetRate.hasIncomeTax, minRate: targetRate.minRate, maxRate: targetRate.maxRate, estimatedTax: targetTax, effectiveRate: targetEffectiveRate },
    ]

    // Recommendation
    let recommendation = ''
    if (!currentRate.hasIncomeTax && !targetRate.hasIncomeTax) {
      recommendation = `Both ${currentState} and ${targetState} have no state income tax. Focus on other factors like property tax, sales tax, and cost of living.`
    } else if (!targetRate.hasIncomeTax) {
      recommendation = `Moving to ${targetState} (no income tax) saves ~$${taxDifference.toFixed(0)} annually. Consider property tax and cost of living differences.`
    } else if (taxDifference > 5000) {
      recommendation = `Significant tax savings: ~$${taxDifference.toFixed(0)} by moving to ${targetState}. Rate difference: ${currentRate.avgRate}% vs ${targetRate.avgRate}%.`
    } else if (taxDifference > 0) {
      recommendation = `Moderate savings: ~$${taxDifference.toFixed(0)} in ${targetState}. Consider overall cost of living and job market.`
    } else if (taxDifference < -5000) {
      recommendation = `Warning: Moving to ${targetState} increases tax by ~$${Math.abs(taxDifference).toFixed(0)}. Higher rate: ${targetRate.avgRate}% vs ${currentRate.avgRate}%.`
    } else {
      recommendation = `Similar tax burden between states. Tax difference ~$${Math.abs(taxDifference).toFixed(0)}. Consider other relocation factors.`
    }

    // No income tax states
    const noIncomeTaxStates = ['TX', 'FL', 'WA', 'NV', 'NH', 'TN', 'SD', 'AK', 'WY']

    return {
      income: income.toFixed(0),
      filingStatus,
      deductions: deductions.toFixed(0),
      taxableIncome: taxableIncome.toFixed(0),
      currentState,
      targetState,
      currentHasTax: currentRate.hasIncomeTax,
      targetHasTax: targetRate.hasIncomeTax,
      currentMinRate: currentRate.minRate.toFixed(2),
      currentMaxRate: currentRate.maxRate.toFixed(2),
      currentAvgRate: currentRate.avgRate.toFixed(2),
      targetMinRate: targetRate.minRate.toFixed(2),
      targetMaxRate: targetRate.maxRate.toFixed(2),
      targetAvgRate: targetRate.avgRate.toFixed(2),
      currentTax: currentTax.toFixed(0),
      targetTax: targetTax.toFixed(0),
      taxDifference: taxDifference.toFixed(0),
      taxSavingsPercent: taxSavingsPercent.toFixed(1),
      currentEffectiveRate: currentEffectiveRate.toFixed(2),
      targetEffectiveRate: targetEffectiveRate.toFixed(2),
      comparison,
      recommendation,
      noIncomeTaxStates,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">State Income Tax Comparison Calculator</h1>
      <p className="text-gray-600 mb-4">Compare state income tax burden for relocation decisions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income</label>
          <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'marriedJoint')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="marriedJoint">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current State</label>
          <select value={currentState} onChange={(e) => setCurrentState(e.target.value)} className="w-full border rounded p-2">
            <option value="CA">California (CA)</option>
            <option value="TX">Texas (TX)</option>
            <option value="FL">Florida (FL)</option>
            <option value="NY">New York (NY)</option>
            <option value="WA">Washington (WA)</option>
            <option value="PA">Pennsylvania (PA)</option>
            <option value="IL">Illinois (IL)</option>
            <option value="OH">Ohio (OH)</option>
            <option value="MI">Michigan (MI)</option>
            <option value="GA">Georgia (GA)</option>
            <option value="NC">North Carolina (NC)</option>
            <option value="NJ">New Jersey (NJ)</option>
            <option value="MA">Massachusetts (MA)</option>
            <option value="VA">Virginia (VA)</option>
            <option value="AZ">Arizona (AZ)</option>
            <option value="CO">Colorado (CO)</option>
            <option value="OR">Oregon (OR)</option>
            <option value="CT">Connecticut (CT)</option>
            <option value="MD">Maryland (MD)</option>
            <option value="MN">Minnesota (MN)</option>
            <option value="MO">Missouri (MO)</option>
            <option value="SC">South Carolina (SC)</option>
            <option value="WI">Wisconsin (WI)</option>
            <option value="IN">Indiana (IN)</option>
            <option value="UT">Utah (UT)</option>
            <option value="NM">New Mexico (NM)</option>
            <option value="NV">Nevada (NV)</option>
            <option value="NH">New Hampshire (NH)</option>
            <option value="TN">Tennessee (TN)</option>
            <option value="SD">South Dakota (SD)</option>
            <option value="AK">Alaska (AK)</option>
            <option value="WY">Wyoming (WY)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target State</label>
          <select value={targetState} onChange={(e) => setTargetState(e.target.value)} className="w-full border rounded p-2">
            <option value="TX">Texas (TX)</option>
            <option value="FL">Florida (FL)</option>
            <option value="CA">California (CA)</option>
            <option value="NY">New York (NY)</option>
            <option value="WA">Washington (WA)</option>
            <option value="PA">Pennsylvania (PA)</option>
            <option value="IL">Illinois (IL)</option>
            <option value="OH">Ohio (OH)</option>
            <option value="MI">Michigan (MI)</option>
            <option value="GA">Georgia (GA)</option>
            <option value="NC">North Carolina (NC)</option>
            <option value="NJ">New Jersey (NJ)</option>
            <option value="MA">Massachusetts (MA)</option>
            <option value="VA">Virginia (VA)</option>
            <option value="AZ">Arizona (AZ)</option>
            <option value="CO">Colorado (CO)</option>
            <option value="OR">Oregon (OR)</option>
            <option value="CT">Connecticut (CT)</option>
            <option value="MD">Maryland (MD)</option>
            <option value="MN">Minnesota (MN)</option>
            <option value="MO">Missouri (MO)</option>
            <option value="SC">South Carolina (SC)</option>
            <option value="WI">Wisconsin (WI)</option>
            <option value="IN">Indiana (IN)</option>
            <option value="UT">Utah (UT)</option>
            <option value="NM">New Mexico (NM)</option>
            <option value="NV">Nevada (NV)</option>
            <option value="NH">New Hampshire (NH)</option>
            <option value="TN">Tennessee (TN)</option>
            <option value="SD">South Dakota (SD)</option>
            <option value="AK">Alaska (AK)</option>
            <option value="WY">Wyoming (WY)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deductions</label>
          <input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">State Tax Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">State</th>
                <th className="py-2 text-left">Income Tax?</th>
                <th className="py-2 text-left">Min Rate</th>
                <th className="py-2 text-left">Max Rate</th>
                <th className="py-2 text-left">Est. Tax</th>
                <th className="py-2 text-left">Eff. Rate</th>
              </tr>
            </thead>
            <tbody>
              {result.comparison.map((s) => (
                <tr key={s.state} className="border-b">
                  <td className="py-1 font-semibold">{s.state}</td>
                  <td className="py-1">{s.hasIncomeTax ? 'Yes' : 'None'}</td>
                  <td className="py-1">{s.minRate.toFixed(2)}%</td>
                  <td className="py-1">{s.maxRate.toFixed(2)}%</td>
                  <td className="py-1 font-bold">$ {s.estimatedTax.toFixed(0)}</td>
                  <td className="py-1">{s.effectiveRate.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.taxDifference) > 0 ? 'bg-green-50 border border-green-200' : Number(result.taxDifference) < 0 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Tax Difference</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">{result.currentState} Tax:</span><span className="font-medium ml-2">$ {result.currentTax}</span></div>
          <div><span className="text-zinc-600">{result.targetState} Tax:</span><span className="font-medium ml-2">$ {result.targetTax}</span></div>
          <div><span className="text-zinc-600">Difference:</span><span className={`font-bold ml-2 ${Number(result.taxDifference) > 0 ? 'text-green-700' : Number(result.taxDifference) < 0 ? 'text-red-700' : ''}`}>$ {result.taxDifference}</span></div>
        </div>
        {Number(result.taxDifference) > 0 && (
          <div className="text-xs text-zinc-600 mt-2">Savings: {result.taxSavingsPercent}% of current state tax</div>
        )}
      </div>

      <div className={`card mb-6 ${Number(result.taxDifference) >= 0 ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">No Income Tax States</h2>
        <div className="text-xs text-zinc-600">{result.noIncomeTaxStates.join(', ')}</div>
        <div className="text-xs text-zinc-600 mt-2">Note: NH taxes dividends/interest only. TN Hall tax repealed 2021.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">State Tax Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>9 states have no income tax</li>
          <li>Progressive vs flat rate systems</li>
          <li>SALT deduction capped at $10K</li>
          <li>Consider property tax rates</li>
          <li>Sales tax varies by state</li>
          <li>Local/city taxes may apply</li>
          <li>Establish residency carefully</li>
          <li>183-day rule for domicile</li>
          <li>Part-year returns for moving</li>
          <li>Overall cost of living matters</li>
        </ul>
      </div>
    </div>
  )
}