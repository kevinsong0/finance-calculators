'use client'

import { useState } from 'react'

export default function DividendTaxCalculator() {
  const [dividendIncome, setDividendIncome] = useState('10000')
  const [qualifiedDividends, setQualifiedDividends] = useState('8000')
  const [ordinaryIncome, setOrdinaryIncome] = useState('80000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [taxYear, setTaxYear] = useState('2024')
  const [state, setState] = useState('CA')

  const federalBrackets: Record<string, Array<{ min: number; max: number; rate: number }>> = {
    single: [
      { min: 0, max: 11600, rate: 10 },
      { min: 11600, max: 47150, rate: 12 },
      { min: 47150, max: 100525, rate: 22 },
      { min: 100525, max: 191950, rate: 24 },
      { min: 191950, max: 243725, rate: 32 },
      { min: 243725, max: 609350, rate: 35 },
      { min: 609350, max: Infinity, rate: 37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 10 },
      { min: 23200, max: 94300, rate: 12 },
      { min: 94300, max: 201050, rate: 22 },
      { min: 201050, max: 383900, rate: 24 },
      { min: 383900, max: 487450, rate: 32 },
      { min: 487450, max: 731200, rate: 35 },
      { min: 731200, max: Infinity, rate: 37 },
    ],
  }

  const stateRates: Record<string, number> = {
    CA: 13.3,
    NY: 10.9,
    TX: 0,
    FL: 0,
    PA: 3.07,
    NJ: 10.75,
    MA: 12,
    NC: 5.25,
    GA: 5.75,
    VA: 5.75,
    MI: 4.25,
    IL: 4.95,
    OH: 4.0,
    WA: 0,
    NV: 0,
    AZ: 2.5,
    CO: 4.4,
    UT: 4.85,
  }

  const calculate = () => {
    const totalDividends = parseFloat(dividendIncome) || 0
    const qualified = parseFloat(qualifiedDividends) || 0
    const nonQualified = totalDividends - qualified
    const income = parseFloat(ordinaryIncome) || 0

    const stateRate = stateRates[state] || 5

    // Total income including dividends
    const totalIncome = income + totalDividends

    // Qualified dividend tax rates (same as long-term capital gains rates)
    // 0% for income under threshold, 15% for most, 20% for high income
    const zeroRateThreshold = filingStatus === 'single' ? 47150 : 94300
    const fifteenRateThreshold = filingStatus === 'single' ? 518900 : 583750

    let qualifiedTax = 0
    if (totalIncome <= zeroRateThreshold) {
      qualifiedTax = 0
    } else if (totalIncome <= fifteenRateThreshold) {
      qualifiedTax = qualified * 0.15
    } else {
      qualifiedTax = qualified * 0.20
    }

    // Non-qualified dividends taxed as ordinary income
    // Calculate marginal rate on total income
    let marginalRate = 0
    let marginalBracket = ''
    const brackets = federalBrackets[filingStatus]
    for (const bracket of brackets) {
      if (totalIncome >= bracket.min && totalIncome <= bracket.max) {
        marginalRate = bracket.rate
        marginalBracket = `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`
        break
      }
    }

    // Non-qualified dividend tax (at marginal rate)
    const nonQualifiedTax = nonQualified * (marginalRate / 100)

    // Total federal tax on dividends
    const totalFedTax = qualifiedTax + nonQualifiedTax

    // State tax on all dividends (most states tax as ordinary income)
    const stateTax = totalDividends * (stateRate / 100)

    // Total tax
    const totalTax = totalFedTax + stateTax

    // Effective rate on dividends
    const effectiveRate = totalDividends > 0 ? (totalTax / totalDividends) * 100 : 0

    // Tax saved by qualified vs non-qualified
    const taxSaved = nonQualified * (marginalRate / 100) - (qualified * (totalIncome <= zeroRateThreshold ? 0 : totalIncome <= fifteenRateThreshold ? 0.15 : 0.20))

    // NIIT check (3.8% on investment income over threshold)
    const niitThreshold = filingStatus === 'single' ? 200000 : 250000
    const niitApplicable = totalIncome > niitThreshold
    const niitTax = niitApplicable ? totalDividends * 0.038 : 0

    // Total tax including NIIT
    const totalTaxWithNiit = totalTax + niitTax

    // Qualified dividend requirements
    const holdingRequirement = '60+ days during 121-day period around ex-dividend date'
    const preferredStockHolding = '90+ days during 181-day period'

    return {
      totalDividends: totalDividends.toFixed(2),
      qualifiedDividends: qualified.toFixed(2),
      nonQualifiedDividends: nonQualified.toFixed(2),
      ordinaryIncome: income.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      taxYear: taxYear,
      state: state,
      stateRate: stateRate.toFixed(2),
      zeroRateThreshold: zeroRateThreshold.toLocaleString(),
      fifteenRateThreshold: fifteenRateThreshold.toLocaleString(),
      qualifiedRate: totalIncome <= zeroRateThreshold ? '0%' : totalIncome <= fifteenRateThreshold ? '15%' : '20%',
      qualifiedTax: qualifiedTax.toFixed(2),
      marginalRate: marginalRate.toFixed(0),
      marginalBracket,
      nonQualifiedTax: nonQualifiedTax.toFixed(2),
      totalFedTax: totalFedTax.toFixed(2),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      taxSaved: taxSaved.toFixed(2),
      niitApplicable,
      niitThreshold: niitThreshold.toLocaleString(),
      niitTax: niitTax.toFixed(2),
      totalTaxWithNiit: totalTaxWithNiit.toFixed(2),
      holdingRequirement,
      preferredStockHolding,
      qualifiedPercentage: ((qualified / totalDividends) * 100).toFixed(0),
      hasQualified: qualified > 0,
      hasNonQualified: nonQualified > 0,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dividend Tax Calculator</h1>
      <p className="text-zinc-600">Calculate federal and state tax on dividend income. Understand qualified vs non-qualified dividend tax rates, NIIT implications, and holding period requirements for preferential rates.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Dividend Income</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Dividend Income ($)</label>
            <input
              type="number"
              value={dividendIncome}
              onChange={(e) => setDividendIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Total dividends received from stocks, ETFs, mutual funds.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Qualified Dividends ($)</label>
            <input
              type="number"
              value={qualifiedDividends}
              onChange={(e) => setQualifiedDividends(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Dividends meeting holding period requirements. taxed at preferential 0-20% rates.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Income (Wages) ($)</label>
            <input
              type="number"
              value={ordinaryIncome}
              onChange={(e) => setOrdinaryIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Dividends add to total income, affecting qualified dividend rate thresholds.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
            >
              <option value="CA">California (13.3%)</option>
              <option value="NY">New York (10.9%)</option>
              <option value="TX">Texas (0%)</option>
              <option value="FL">Florida (0%)</option>
              <option value="PA">Pennsylvania (3.07%)</option>
              <option value="NJ">New Jersey (10.75%)</option>
              <option value="MA">Massachusetts (12%)</option>
              <option value="NC">North Carolina (5.25%)</option>
              <option value="GA">Georgia (5.75%)</option>
              <option value="VA">Virginia (5.75%)</option>
              <option value="MI">Michigan (4.25%)</option>
              <option value="IL">Illinois (4.95%)</option>
              <option value="OH">Ohio (4%)</option>
              <option value="WA">Washington (0%)</option>
              <option value="NV">Nevada (0%)</option>
              <option value="AZ">Arizona (2.5%)</option>
              <option value="CO">Colorado (4.4%)</option>
              <option value="UT">Utah (4.85%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="input"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Dividend Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Dividends:</span>
            <span className="font-bold ml-2">${result.totalDividends}</span>
          </div>
          <div>
            <span className="text-zinc-600">Qualified:</span>
            <span className="font-medium ml-2 text-green-700">${result.qualifiedDividends} ({result.qualifiedPercentage}%)</span>
          </div>
          <div>
            <span className="text-zinc-600">Non-Qualified:</span>
            <span className="font-medium ml-2 text-orange-700">${result.nonQualifiedDividends}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Income:</span>
            <span className="font-medium ml-2">${result.totalIncome}</span>
          </div>
        </div>
      </div>

      {result.hasQualified && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Qualified Dividend Tax (Preferential Rate)</h3>
          <div className="text-xl font-bold text-green-800">${result.qualifiedTax}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Rate:</span>
              <span className="font-bold ml-2">{result.qualifiedRate}</span>
            </div>
            <div>
              <span className="text-zinc-600">0% Threshold:</span>
              <span className="font-medium ml-2">${result.zeroRateThreshold}</span>
            </div>
            <div>
              <span className="text-zinc-600">15% Threshold:</span>
              <span className="font-medium ml-2">${result.fifteenRateThreshold}</span>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-2">
            Qualified dividends taxed at same preferential rates as long-term capital gains.
          </div>
        </div>
      )}

      {result.hasNonQualified && (
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">Non-Qualified Dividend Tax (Ordinary Rate)</h3>
          <div className="text-xl font-bold text-orange-800">${result.nonQualifiedTax}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Rate:</span>
              <span className="font-bold ml-2">{result.marginalRate}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Bracket:</span>
              <span className="font-medium ml-2">{result.marginalBracket}</span>
            </div>
          </div>
          <div className="text-xs text-orange-600 mt-2">
            Non-qualified dividends (ordinary dividends) taxed at your marginal ordinary income rate.
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">State Tax</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">State:</span>
            <span className="font-medium ml-2">{result.state}</span>
          </div>
          <div>
            <span className="text-zinc-600">Rate:</span>
            <span className="font-medium ml-2">{result.stateRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">State Tax:</span>
            <span className="font-bold ml-2">${result.stateTax}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          Most states tax dividends as ordinary income (same rate regardless of qualified status).
        </div>
      </div>

      {result.niitApplicable && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Net Investment Income Tax (NIIT)</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Threshold:</span>
              <span className="font-medium ml-2">${result.niitThreshold}</span>
            </div>
            <div>
              <span className="text-zinc-600">NIIT (3.8%):</span>
              <span className="font-bold ml-2">${result.niitTax}</span>
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2">
            High-income taxpayers pay additional 3.8% NIIT on investment income over threshold.
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Total Tax on Dividends</h3>
        <div className="text-2xl font-bold text-red-800">${result.niitApplicable ? result.totalTaxWithNiit : result.totalTax}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Federal:</span>
            <span className="font-medium ml-2">${result.totalFedTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">State:</span>
            <span className="font-medium ml-2">${result.stateTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-bold ml-2">{result.effectiveRate}%</span>
          </div>
        </div>
      </div>

      {parseFloat(result.taxSaved) > 0 && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Tax Savings from Qualified Dividends</h3>
          <div className="text-xl font-bold text-teal-800">${result.taxSaved}</div>
          <div className="text-xs text-teal-600 mt-2">
            Qualified dividends saved ${result.taxSaved} vs being taxed as ordinary income at {result.marginalRate}%.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Qualified Dividend Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Common Stock:</strong> {result.holdingRequirement}</li>
          <li><strong>Preferred Stock:</strong> {result.preferredStockHolding}</li>
          <li><strong>US Company or Qualified Foreign:</strong> Must be US corporation or qualified foreign corporation (traded on US exchange or in country with tax treaty).</li>
          <li><strong>Not Qualified:</strong> Dividends from tax-exempt organizations, REITs, MLPs, money market funds.</li>
          <li><strong>Holding Period:</strong> Count from purchase date, includes ex-dividend date. Must hold for required period.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dividend Tax Facts</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Qualified vs Non-Qualified:</strong> Qualified dividends get 0-20% preferential rates. Non-qualified taxed as ordinary income at 10-37%.</li>
          <li><strong>Rate Thresholds:</strong> 0% under ~$47K (single), 15% for most taxpayers, 20% over ~$519K (single).</li>
          <li><strong>State Tax:</strong> Most states tax all dividends as ordinary income. No preferential treatment for qualified dividends.</li>
          <li><strong>NIIT:</strong> 3.8% additional tax on investment income for high earners (over $200K single, $250K married).</li>
          <li><strong>REITs/MLPs:</strong> Dividends typically non-qualified. Taxed at ordinary rates but may have deductions.</li>
          <li><strong>Foreign Stocks:</strong> May have foreign tax credit for taxes paid to foreign country on dividends.</li>
          <li><strong>Dividend Funds:</strong> ETFs and mutual funds report qualified % on 1099-DIV each year.</li>
        </ul>
      </div>
    </main>
  )
}