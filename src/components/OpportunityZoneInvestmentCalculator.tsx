'use client'

import { useState } from 'react'

export default function OpportunityZoneInvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [investmentDate, setInvestmentDate] = useState('2019')
  const [saleDate, setSaleDate] = useState('2028')
  const [capitalGainsDeferred, setCapitalGainsDeferred] = useState(50000)
  const [originalGainDate, setOriginalGainDate] = useState('2018')
  const [projectedAppreciation, setProjectedAppreciation] = useState(15)
  const [federalTaxRate, setFederalTaxRate] = useState(24)

  const calculate = () => {
    // Opportunity Zone Investment Calculator (Section 1400Z)
    // Tax benefits for investing capital gains in QOZ property

    // Rules:
    // 1. Invest capital gains within 180 days of sale
    // 2. Hold 5 years: 10% basis step-up (defer gain reduced by 10%)
    // 3. Hold 7 years: additional 5% basis step-up (15% total)
    // 4. Hold 10+ years: exclude ALL appreciation on QOF investment
    // 5. Deferred gains recognized Dec 31, 2026 (or earlier if sold)
    // 6. Investment must be by Dec 31, 2021 for full 10-year benefit

    const investmentYear = parseInt(investmentDate)
    const saleYear = parseInt(saleDate)
    const holdingYears = saleYear - investmentYear
    const originalGainYear = parseInt(originalGainDate)

    // Basis step-up for holding period
    let basisStepUpPercent = 0
    if (holdingYears >= 5 && investmentYear <= 2019) {
      basisStepUpPercent = 10
    }
    if (holdingYears >= 7 && investmentYear <= 2018) {
      basisStepUpPercent = 15 // Additional 5%
    }

    // Deferred gain reduction
    const deferredGainAfterStepUp = capitalGainsDeferred * (1 - basisStepUpPercent / 100)

    // Recognition date
    const recognitionYear = Math.min(saleYear, 2026)

    // Tax on deferred gain (recognized)
    const taxOnDeferredGain = deferredGainAfterStepUp * (federalTaxRate / 100)

    // Appreciation on investment
    const appreciationAmount = initialInvestment * (projectedAppreciation / 100) * (holdingYears / 10)

    // Tax exclusion for 10+ year hold
    const qualifiesForExclusion = holdingYears >= 10 && investmentYear <= 2021
    const appreciationTaxSaved = qualifiesForExclusion ? appreciationAmount * (federalTaxRate / 100) : 0

    // Final basis in QOF investment
    const finalBasis = initialInvestment + (qualifiesForExclusion ? appreciationAmount : 0)

    // Total tax savings
    const basisStepUpTaxSaved = capitalGainsDeferred * (basisStepUpPercent / 100) * (federalTaxRate / 100)
    const totalTaxSaved = basisStepUpTaxSaved + appreciationTaxSaved

    // Without opportunity zone (comparison)
    const taxWithoutOZ = capitalGainsDeferred * (federalTaxRate / 100) + appreciationAmount * (federalTaxRate / 100)

    // Net benefit
    const netBenefit = totalTaxSaved

    // Timeline analysis
    const timelineStatus = [
      { milestone: '180-Day Investment Deadline', status: 'Must invest within 180 days of gain' },
      { milestone: '5-Year Hold (10% step-up)', status: holdingYears >= 5 && investmentYear <= 2019 ? 'Achieved ✓' : investmentYear > 2019 ? 'Not available (invested post-2019)' : `${5 - holdingYears} years remaining` },
      { milestone: '7-Year Hold (15% step-up)', status: holdingYears >= 7 && investmentYear <= 2018 ? 'Achieved ✓' : investmentYear > 2018 ? 'Not available (invested post-2018)' : `${7 - holdingYears} years remaining` },
      { milestone: '10-Year Hold (exclusion)', status: holdingYears >= 10 && investmentYear <= 2021 ? 'Achieved ✓' : investmentYear > 2021 ? 'Not available (invested post-2021)' : `${10 - holdingYears} years remaining` },
      { milestone: 'Dec 31, 2026 Recognition', status: recognitionYear <= 2026 ? 'Deferred gain recognized' : 'Gain still deferred' },
    ]

    // Recommendation
    let recommendation = ''
    if (qualifiesForExclusion) {
      recommendation = `Excellent! 10+ year hold qualifies for full appreciation exclusion. Tax saved: $${totalTaxSaved.toFixed(0)} on appreciation $${appreciationAmount.toFixed(0)}. Basis step-up: ${basisStepUpPercent}%. Deferred gain tax: $${taxOnDeferredGain.toFixed(0)} due ${recognitionYear}.`
    } else if (holdingYears >= 7 && investmentYear <= 2018) {
      recommendation = `Good position: 15% basis step-up achieved. Deferred gain reduced to $${deferredGainAfterStepUp.toFixed(0)}. To get exclusion, hold until ${investmentYear + 10} (but invested ${investmentYear} limits may apply).`
    } else if (holdingYears >= 5 && investmentYear <= 2019) {
      recommendation = `5-year benefit achieved (10% step-up). Deferred gain reduced by 10%. Hold 7+ years for additional 5% (if invested by 2018). Appreciation still taxable unless 10-year hold.`
    } else {
      recommendation = `Holding period not yet met for basis step-up. Continue holding. Investment date ${investmentYear} affects available benefits. All investments must be by Dec 31, 2021 for 10-year exclusion.`
    }

    // Key deadlines
    const keyDeadlines = [
      `Investment deadline: Dec 31, 2021 (for 10-year exclusion)`,
      `180 days from capital gain to invest`,
      `5-year hold by Dec 31, 2024 (for 10% step-up)`,
      `7-year hold by Dec 31, 2026 (for additional 5%)`,
      `Deferred gains recognized Dec 31, 2026`,
      `10-year hold for appreciation exclusion`,
    ]

    return {
      initialInvestment: initialInvestment.toFixed(0),
      investmentDate,
      saleDate,
      holdingYears: holdingYears.toFixed(0),
      capitalGainsDeferred: capitalGainsDeferred.toFixed(0),
      originalGainDate,
      basisStepUpPercent: basisStepUpPercent.toFixed(0),
      deferredGainAfterStepUp: deferredGainAfterStepUp.toFixed(0),
      recognitionYear: recognitionYear.toFixed(0),
      taxOnDeferredGain: taxOnDeferredGain.toFixed(0),
      projectedAppreciation: projectedAppreciation.toFixed(0),
      appreciationAmount: appreciationAmount.toFixed(0),
      qualifiesForExclusion,
      appreciationTaxSaved: appreciationTaxSaved.toFixed(0),
      finalBasis: finalBasis.toFixed(0),
      basisStepUpTaxSaved: basisStepUpTaxSaved.toFixed(0),
      totalTaxSaved: totalTaxSaved.toFixed(0),
      taxWithoutOZ: taxWithoutOZ.toFixed(0),
      netBenefit: netBenefit.toFixed(0),
      federalTaxRate: federalTaxRate.toFixed(0),
      timelineStatus,
      recommendation,
      keyDeadlines,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Opportunity Zone Investment Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax benefits of investing in Qualified Opportunity Zones.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Initial Investment</label>
          <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Year</label>
          <input type="number" value={investmentDate} onChange={(e) => setInvestmentDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Projected Sale Year</label>
          <input type="number" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capital Gains Deferred</label>
          <input type="number" value={capitalGainsDeferred} onChange={(e) => setCapitalGainsDeferred(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Gain Year</label>
          <input type="number" value={originalGainDate} onChange={(e) => setOriginalGainDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Projected Appreciation (%/yr)</label>
          <input type="number" value={projectedAppreciation} onChange={(e) => setProjectedAppreciation(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Federal Tax Rate (%)</label>
          <input type="number" value={federalTaxRate} onChange={(e) => setFederalTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Holding Period Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Holding Years:</span><span className="font-bold ml-2">{result.holdingYears}</span></div>
          <div><span className="text-zinc-600">Basis Step-Up:</span><span className="font-bold text-green-700 ml-2">{result.basisStepUpPercent}%</span></div>
          <div><span className="text-zinc-600">Exclusion:</span><span className={`font-bold ml-2 ${result.qualifiesForExclusion ? 'text-green-700' : 'text-zinc-500'}`}>{result.qualifiesForExclusion ? 'Yes ✓' : 'No'}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Timeline Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Milestone</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.timelineStatus.map((t) => (
                <tr key={t.milestone} className="border-b">
                  <td className="py-1 font-semibold">{t.milestone}</td>
                  <td className="py-1">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Deferred Gain Treatment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original Deferred:</span><span className="font-medium ml-2">$ {result.capitalGainsDeferred}</span></div>
          <div><span className="text-zinc-600">After Step-Up:</span><span className="font-bold ml-2">$ {result.deferredGainAfterStepUp}</span></div>
          <div><span className="text-zinc-600">Tax Due:</span><span className="font-bold text-red-700 ml-2">$ {result.taxOnDeferredGain}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Deferred gain recognized in year {result.recognitionYear} (or earlier if QOF sold)</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Appreciation &amp; Exclusion</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Projected Appreciation:</span><span className="font-medium ml-2">$ {result.appreciationAmount}</span></div>
          <div><span className="text-zinc-600">Tax Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.appreciationTaxSaved}</span></div>
          <div><span className="text-zinc-600">Final Basis:</span><span className="font-bold ml-2">$ {result.finalBasis}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Step-Up Savings:</span><span className="font-medium ml-2">$ {result.basisStepUpTaxSaved}</span></div>
          <div><span className="text-zinc-600">Exclusion Savings:</span><span className="font-medium ml-2">$ {result.appreciationTaxSaved}</span></div>
          <div><span className="text-zinc-600">Total Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.totalTaxSaved}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.qualifiesForExclusion || Number(result.basisStepUpPercent) > 0 ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Key Deadlines</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.keyDeadlines.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Opportunity Zone Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Invest capital gains within 180 days</li>
          <li>5-year hold: 10% basis step-up</li>
          <li>7-year hold: additional 5% (15% total)</li>
          <li>10-year hold: exclude ALL appreciation</li>
          <li>Deferred gain recognized Dec 31, 2026</li>
          <li>Must invest by Dec 31, 2021</li>
          <li>QOZ property: stock, partnership, real estate</li>
          <li>Form 8949 for reporting</li>
          <li>State tax treatment varies</li>
          <li>Research QOZ census tract designation</li>
        </ul>
      </div>
    </div>
  )
}