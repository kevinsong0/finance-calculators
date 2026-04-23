'use client'

import { useState } from 'react'

export default function TaxCreditRecaptureCalculator() {
  const [creditType, setCreditType] = useState<'investment' | 'rehabilitation' | 'energy' | 'workOpportunity'>('investment')
  const [originalCredit, setOriginalCredit] = useState(50000)
  const [creditYear, setCreditYear] = useState(2020)
  const [dispositionYear, setDispositionYear] = useState(2025)
  const [dispositionType, setDispositionType] = useState<'sale' | 'gift' | 'foreclosure' | 'abandonment'>('sale')
  const [holdingRequirement, setHoldingRequirement] = useState(5)
  const [recaptureRate, setRecaptureRate] = useState(100)
  const [creditUsed, setCreditUsed] = useState(30000)
  const [adjustedBasis, setAdjustedBasis] = useState(200000)
  const [salePrice, setSalePrice] = useState(250000)

  const calculate = () => {
    // Tax Credit Recapture Calculator
    // Calculate recapture when credit property disposed early

    // Rules vary by credit type:
    // - Investment Tax Credit (ITC): 5-year holding, 20% per year reduction
    // - Rehabilitation Credit: 5-year holding
    // - Energy Credits: 5-year holding (solar, wind)
    // - Work Opportunity: no recapture if employee retained

    const creditYr = creditYear
    const dispYr = dispositionYear
    const holdingYears = dispYr - creditYr

    // Calculate recapture
    let recaptureAmount = 0
    let recapturePercent = 0

    if (holdingYears < holdingRequirement) {
      // Full or partial recapture based on holding period
      if (creditType === 'investment' || creditType === 'energy') {
        // ITC/Energy: 100% recapture if disposed in year 1, decreasing 20% per year
        recapturePercent = Math.max(0, 100 - (holdingYears * 20))
      } else if (creditType === 'rehabilitation') {
        // Rehabilitation: full recapture if disposed within 5 years
        recapturePercent = holdingYears < holdingRequirement ? 100 : 0
      } else if (creditType === 'workOpportunity') {
        // WOTC: partial recapture based on employment duration
        recapturePercent = holdingYears < 1 ? 100 : holdingYears < 2 ? 50 : 0
      }

      recaptureAmount = originalCredit * (recapturePercent / 100)
    }

    // Recapture applies to credit actually used (not just claimed)
    const recaptureOnUsed = Math.min(recaptureAmount, creditUsed)

    // Gain on disposition
    const gainOnDisposition = salePrice - adjustedBasis

    // Total taxable amount (recapture + gain)
    const totalTaxable = recaptureOnUsed + gainOnDisposition

    // Tax rate on recapture (often ordinary rate)
    const recaptureTaxRate = 0.24 // Simplified
    const gainTaxRate = 0.20 // Simplified capital gains

    const taxOnRecapture = recaptureOnUsed * recaptureTaxRate
    const taxOnGain = Math.max(0, gainOnDisposition) * gainTaxRate
    const totalTax = taxOnRecapture + taxOnGain

    // Years remaining to avoid recapture
    const yearsToSafeHarbor = Math.max(0, holdingRequirement - holdingYears)

    // Recapture reduction schedule (for ITC)
    const reductionSchedule = [
      { year: 1, percent: 100 },
      { year: 2, percent: 80 },
      { year: 3, percent: 60 },
      { year: 4, percent: 40 },
      { year: 5, percent: 20 },
      { year: 6, percent: 0 },
    ]

    // Recommendation
    let recommendation = ''
    if (holdingYears >= holdingRequirement) {
      recommendation = `Holding period satisfied (${holdingYears} years). No recapture! Credit fully preserved. Proceed with disposition at normal tax treatment.`
    } else if (yearsToSafeHarbor > 0 && yearsToSafeHarbor <= 2) {
      recommendation = `Recapture risk: ${recapturePercent}% ($${recaptureAmount.toFixed(0)}). Only ${yearsToSafeHarbor} years to safe harbor. Consider holding longer to reduce recapture to ${Math.max(0, 100 - ((holdingYears + 1) * 20))}%.`
    } else {
      recommendation = `WARNING: High recapture ${recapturePercent}% ($${recaptureAmount.toFixed(0)}). Tax: $${taxOnRecapture.toFixed(0)}. Holding only ${holdingYears} years vs required ${holdingRequirement}. Evaluate disposition timing carefully.`
    }

    if (dispositionType === 'foreclosure' || dispositionType === 'abandonment') {
      recommendation += ` ${dispositionType} may trigger full recapture regardless of intent.`
    }

    // Credit-specific rules
    const creditRules: Record<string, string[]> = {
      investment: ['5-year holding required', 'Recapture decreases 20% per year', 'Full recapture in year 1', 'Applies to ITC (Section 46/48)', 'Form 4255 for recapture'],
      rehabilitation: ['5-year holding required', 'Full recapture if early disposition', 'Historic rehabilitation credit', '20% credit for qualified expenses', 'Form 3468 for credit'],
      energy: ['5-year holding required', 'Solar, wind, geothermal', '30% ITC for solar (2022-2032)', 'Decreasing to 26%, then 22%', 'Section 48 energy credits'],
      workOpportunity: ['400 hours employment required', 'Retain employee 1+ year to avoid', 'Partial recapture if early quit', 'Target group categories', 'Form 5884 for credit'],
    }

    return {
      creditType,
      originalCredit: originalCredit.toFixed(0),
      creditYear,
      dispositionYear,
      holdingYears: holdingYears.toFixed(0),
      dispositionType,
      holdingRequirement: holdingRequirement.toFixed(0),
      recapturePercent: recapturePercent.toFixed(0),
      recaptureAmount: recaptureAmount.toFixed(0),
      creditUsed: creditUsed.toFixed(0),
      recaptureOnUsed: recaptureOnUsed.toFixed(0),
      adjustedBasis: adjustedBasis.toFixed(0),
      salePrice: salePrice.toFixed(0),
      gainOnDisposition: gainOnDisposition.toFixed(0),
      totalTaxable: totalTaxable.toFixed(0),
      taxOnRecapture: taxOnRecapture.toFixed(0),
      taxOnGain: taxOnGain.toFixed(0),
      totalTax: totalTax.toFixed(0),
      yearsToSafeHarbor: yearsToSafeHarbor.toFixed(0),
      reductionSchedule,
      recommendation,
      creditRules: creditRules[creditType] || [],
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Credit Recapture Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate recapture when disposing of credit property early.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Credit Type</label>
          <select value={creditType} onChange={(e) => setCreditType(e.target.value as 'investment' | 'rehabilitation' | 'energy' | 'workOpportunity')} className="w-full border rounded p-2">
            <option value="investment">Investment Tax Credit (ITC)</option>
            <option value="rehabilitation">Rehabilitation Credit</option>
            <option value="energy">Energy Credit (Solar/Wind)</option>
            <option value="workOpportunity">Work Opportunity (WOTC)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Credit Amount</label>
          <input type="number" value={originalCredit} onChange={(e) => setOriginalCredit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credit Claimed Year</label>
          <input type="number" value={creditYear} onChange={(e) => setCreditYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Disposition Year</label>
          <input type="number" value={dispositionYear} onChange={(e) => setDispositionYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Disposition Type</label>
          <select value={dispositionType} onChange={(e) => setDispositionType(e.target.value as 'sale' | 'gift' | 'foreclosure' | 'abandonment')} className="w-full border rounded p-2">
            <option value="sale">Sale</option>
            <option value="gift">Gift</option>
            <option value="foreclosure">Foreclosure</option>
            <option value="abandonment">Abandonment</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Requirement (Years)</label>
          <input type="number" value={holdingRequirement} onChange={(e) => setHoldingRequirement(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credit Actually Used</label>
          <input type="number" value={creditUsed} onChange={(e) => setCreditUsed(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adjusted Basis</label>
          <input type="number" value={adjustedBasis} onChange={(e) => setAdjustedBasis(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Price</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Holding Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Credit Year:</span><span className="font-medium ml-2">{result.creditYear}</span></div>
          <div><span className="text-zinc-600">Disposition:</span><span className="font-medium ml-2">{result.dispositionYear}</span></div>
          <div><span className="text-zinc-600">Held:</span><span className="font-bold ml-2">{result.holdingYears} years</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Required:</span><span className="font-medium ml-2">{result.holdingRequirement} years</span></div>
          <div><span className="text-zinc-600">Years to Safe Harbor:</span><span className={`font-bold ml-2 ${Number(result.yearsToSafeHarbor) > 0 ? 'text-red-700' : 'text-green-700'}`}>{result.yearsToSafeHarbor}</span></div>
        </div>
      </div>

      {result.creditType === 'investment' && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">ITC Recapture Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Year of Disposition</th>
                  <th className="py-2 text-left">Recapture %</th>
                </tr>
              </thead>
              <tbody>
                {result.reductionSchedule.map((s) => (
                  <tr key={s.year} className={`border-b ${Number(result.holdingYears) < s.year && Number(result.holdingYears) === s.year - 1 ? 'bg-orange-100' : ''}`}>
                    <td className="py-1">{s.year}</td>
                    <td className="py-1">{s.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={`card mb-6 ${Number(result.recaptureAmount) > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recapture Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Recapture Rate:</span><span className={`font-bold ml-2 ${Number(result.recapturePercent) > 0 ? 'text-red-700' : 'text-green-700'}`}>{result.recapturePercent}%</span></div>
          <div><span className="text-zinc-600">Recapture Amount:</span><span className={`font-bold ml-2 ${Number(result.recaptureAmount) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.recaptureAmount}</span></div>
          <div><span className="text-zinc-600">Applied to Used:</span><span className="font-medium ml-2">$ {result.recaptureOnUsed}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Disposition Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Gain on Sale:</span><span className="font-medium ml-2">$ {result.gainOnDisposition}</span></div>
          <div><span className="text-zinc-600">Tax on Recapture:</span><span className="font-bold text-red-700 ml-2">$ {result.taxOnRecapture}</span></div>
          <div><span className="text-zinc-600">Tax on Gain:</span><span className="font-medium ml-2">$ {result.taxOnGain}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.recaptureAmount) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">{result.creditType.charAt(0).toUpperCase() + result.creditType.slice(1)} Credit Rules</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.creditRules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Recapture Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Recapture if disposed early</li>
          <li>Holding period varies by credit</li>
          <li>ITC: 5 years, 20% reduction/year</li>
          <li>Recapture treated as ordinary income</li>
          <li>Applies to credit actually used</li>
          <li>Form 4255 for ITC recapture</li>
          <li>Foreclosure triggers full recapture</li>
          <li>Gift may trigger recapture</li>
          <li>Plan disposition timing</li>
          <li>Track credit usage annually</li>
        </ul>
      </div>
    </div>
  )
}