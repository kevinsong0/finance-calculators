'use client'

import { useState } from 'react'

export default function ShortTermCapitalGainsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('10000')
  const [salePrice, setSalePrice] = useState('15000')
  const [holdingPeriod, setHoldingPeriod] = useState('6')
  const [filingStatus, setFilingStatus] = useState('single')
  const [otherIncome, setOtherIncome] = useState('80000')
  const [state, setState] = useState('CA')
  const [assetType, setAssetType] = useState('stock')

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

  const stateCapitalGainsRates: Record<string, number> = {
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
    const purchase = parseFloat(purchasePrice) || 0
    const sale = parseFloat(salePrice) || 0
    const holding = parseFloat(holdingPeriod) || 0
    const income = parseFloat(otherIncome) || 0
    const isShortTerm = holding < 12

    // Capital gain
    const capitalGain = sale - purchase
    const gainOrLoss = capitalGain >= 0 ? 'gain' : 'loss'

    // Total income including capital gain
    const totalIncome = income + (capitalGain > 0 ? capitalGain : 0)

    // Federal tax calculation (short-term gains taxed as ordinary income)
    let federalTax = 0
    const brackets = federalBrackets[filingStatus]

    if (capitalGain > 0 && isShortTerm) {
      let remainingIncome = totalIncome
      for (const bracket of brackets) {
        if (remainingIncome <= 0) break
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
        federalTax += taxableInBracket * (bracket.rate / 100)
        remainingIncome -= taxableInBracket
      }
    } else if (capitalGain > 0 && !isShortTerm) {
      // Long-term rates (for comparison)
      const longTermRate = totalIncome > 500000 ? 20 : totalIncome > 44600 ? 15 : 0
      federalTax = capitalGain * (longTermRate / 100)
    }

    // State tax
    const stateRate = stateCapitalGainsRates[state] || 5
    const stateTax = capitalGain > 0 ? capitalGain * (stateRate / 100) : 0

    // Total tax
    const totalTax = federalTax + stateTax

    // Effective tax rate on the gain
    const effectiveRate = capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0

    // Compare short-term vs long-term
    const longTermRate = totalIncome > 500000 ? 20 : totalIncome > 44600 ? 15 : 0
    const longTermFedTax = capitalGain > 0 ? capitalGain * (longTermRate / 100) : 0
    const longTermTotalTax = longTermFedTax + stateTax
    const taxSavingsIfLongTerm = totalTax - longTermTotalTax

    // Net after tax
    const netAfterTax = sale - totalTax
    const netProfit = capitalGain - totalTax

    // Days remaining to reach long-term threshold
    const daysToLongTerm = Math.max(0, 365 - holding * 30)
    const monthsToLongTerm = Math.ceil(daysToLongTerm / 30)

    // Marginal tax rate on capital gain (the bracket where gain falls)
    let marginalRate = 0
    let marginalBracket = ''
    for (const bracket of brackets) {
      if (totalIncome >= bracket.min && totalIncome <= bracket.max) {
        marginalRate = bracket.rate
        marginalBracket = `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`
        break
      }
    }

    return {
      purchasePrice: purchase.toFixed(2),
      salePrice: sale.toFixed(2),
      holdingPeriod: holding.toFixed(0),
      holdingPeriodMonths: (holding / 12).toFixed(1),
      isShortTerm,
      isLongTerm: !isShortTerm,
      assetType: assetType.charAt(0).toUpperCase() + assetType.slice(1),
      capitalGain: capitalGain.toFixed(2),
      gainOrLoss,
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      otherIncome: income.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      federalTax: federalTax.toFixed(2),
      state: state,
      stateRate: stateRate.toFixed(2),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      marginalRate: marginalRate.toFixed(0),
      marginalBracket,
      netAfterTax: netAfterTax.toFixed(2),
      netProfit: netProfit.toFixed(2),
      longTermRate: longTermRate.toFixed(0),
      longTermFedTax: longTermFedTax.toFixed(2),
      longTermTotalTax: longTermTotalTax.toFixed(2),
      taxSavingsIfLongTerm: taxSavingsIfLongTerm.toFixed(2),
      daysToLongTerm: daysToLongTerm.toFixed(0),
      monthsToLongTerm: monthsToLongTerm.toFixed(0),
      potentialSavingsPerMonth: taxSavingsIfLongTerm > 0 ? (taxSavingsIfLongTerm / monthsToLongTerm).toFixed(2) : '0',
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Short-Term Capital Gains Tax Calculator</h1>
      <p className="text-zinc-600">Calculate short-term capital gains tax (assets held under 1 year). Compare to long-term rates, understand marginal tax impact, and calculate potential savings from waiting.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Transaction Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Sale Price ($)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period (Months)</label>
            <input
              type="number"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="input"
              min="0"
              max="24"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Short-term: under 12 months. Long-term: 12+ months.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Asset Type</label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="input"
            >
              <option value="stock">Stock/ETF</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="mutualFund">Mutual Fund</option>
              <option value="bond">Bond</option>
              <option value="option">Stock Option</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Situation</h3>
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
            <label className="block text-sm text-zinc-600 mb-1">Other Income (Wages, etc.) ($)</label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Short-term gains add to ordinary income, affecting your tax bracket.
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
        </div>
      </div>

      <div className={`card ${result.isShortTerm ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isShortTerm ? 'text-red-700' : 'text-green-700'}`}>
          Holding Period Classification
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Holding Period:</span>
            <span className="font-medium ml-2">{result.holdingPeriod} months ({result.holdingPeriodMonths} years)</span>
          </div>
          <div>
            <span className="text-zinc-600">Classification:</span>
            <span className={`font-bold ml-2 ${result.isShortTerm ? 'text-red-800' : 'text-green-800'}`}>
              {result.isShortTerm ? 'SHORT-TERM (ordinary income rates)' : 'LONG-TERM (preferential rates)'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Capital Gain</h3>
        <div className="text-2xl font-bold text-blue-800">
          ${result.capitalGain} {result.gainOrLoss}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Purchase:</span>
            <span className="font-medium ml-2">${result.purchasePrice}</span>
          </div>
          <div>
            <span className="text-zinc-600">Sale:</span>
            <span className="font-medium ml-2">${result.salePrice}</span>
          </div>
        </div>
      </div>

      {result.isShortTerm && (
        <div className="card bg-purple-50 border border-purple-200">
          <h3 className="font-medium mb-2 text-purple-700">Federal Tax (Ordinary Income Rate)</h3>
          <div className="text-xl font-bold text-purple-800">${result.federalTax}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Total Income:</span>
              <span className="font-medium ml-2">${result.totalIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">Marginal Bracket:</span>
              <span className="font-medium ml-2">{result.marginalBracket}</span>
            </div>
            <div>
              <span className="text-zinc-600">Marginal Rate:</span>
              <span className="font-bold ml-2">{result.marginalRate}%</span>
            </div>
          </div>
          <div className="text-xs text-purple-600 mt-2">
            Short-term gains taxed at ordinary income rates (10-37%).
          </div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">State Tax</h3>
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
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Total Tax on Gain</h3>
        <div className="text-2xl font-bold text-red-800">${result.totalTax}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-bold ml-2">{result.effectiveRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Profit:</span>
            <span className="font-medium ml-2">${result.netProfit}</span>
          </div>
        </div>
      </div>

      {result.isShortTerm && parseFloat(result.taxSavingsIfLongTerm) > 0 && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Long-Term Tax Comparison</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Long-Term Rate:</span>
              <span className="font-medium ml-2">{result.longTermRate}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Long-Term Tax:</span>
              <span className="font-medium ml-2">${result.longTermTotalTax}</span>
            </div>
            <div>
              <span className="text-zinc-600">Savings if Long-Term:</span>
              <span className="font-bold ml-2 text-green-800">${result.taxSavingsIfLongTerm}</span>
            </div>
            <div>
              <span className="text-zinc-600">Time to Long-Term:</span>
              <span className="font-medium ml-2">{result.monthsToLongTerm} months</span>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-2">
            Waiting {result.monthsToLongTerm} months saves ${result.taxSavingsIfLongTerm} ({result.potentialSavingsPerMonth}/month equivalent)
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Short-Term vs Long-Term Capital Gains</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Short-Term (under 1 year):</strong> Taxed as ordinary income at your marginal rate (10-37% federal + state).</li>
          <li><strong>Long-Term (over 1 year):</strong> Preferential rates: 0% (under $47K), 15% (most taxpayers), 20% (over $500K).</li>
          <li><strong>State Tax:</strong> Most states tax capital gains as ordinary income (same rate regardless of holding period).</li>
          <li><strong>Strategy:</strong> If close to 1 year, consider waiting to qualify for long-term rates. Calculate potential savings.</li>
          <li><strong>Tax-Loss Harvesting:</strong> Short-term losses offset short-term gains first. Can reduce ordinary income up to $3K/year.</li>
          <li><strong>Wash Sale Rule:</strong> Cannot repurchase same/similar asset within 30 days of selling for loss.</li>
          <li><strong>High Income Warning:</strong> Short-term gains can push you into higher bracket, increasing tax on ALL income.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Federal Tax Brackets (2024)</h3>
        <ul className="text-xs text-zinc-600 space-y-1">
          <li>Single: 10% ($0-11,600) → 12% → 22% → 24% → 32% → 35% → 37% (over $609K)</li>
          <li>Married: 10% ($0-23,200) → 12% → 22% → 24% → 32% → 35% → 37% (over $731K)</li>
          <li>Short-term gains add to total income, potentially pushing you into higher bracket.</li>
        </ul>
      </div>
    </main>
  )
}