'use client'

import { useState } from 'react'

export default function QualifiedDividendsTaxCalculator() {
  const [dividendIncome, setDividendIncome] = useState(10000)
  const [otherIncome, setOtherIncome] = useState(80000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'>('marriedJoint')
  const [isQualified, setIsQualified] = useState(true)
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(12)
  const [stockType, setStockType] = useState<'domestic' | 'foreign' | 'both'>('domestic')
  const [isTaxableAccount, setIsTaxableAccount] = useState(true)

  const calculate = () => {
    // Qualified Dividends Tax Calculator
    // Qualified dividends taxed at preferential rates: 0%, 15%, 20%
    // Ordinary dividends taxed at regular income tax rates

    // Qualified dividend requirements:
    // 1. Paid by US corporation or qualified foreign corporation
    // 2. Holding period: >60 days for common stock, >90 days for preferred
    // 3. Not received in taxable account (IRA/401k dividends not qualified)

    // Tax brackets for qualified dividends (2024):
    // 0% rate: income up to threshold
    // 15% rate: income between thresholds
    // 20% rate: income above top threshold

    const thresholds = {
      single: { zero: 47025, fifteen: 518900 },
      marriedJoint: { zero: 94050, fifteen: 583750 },
      marriedSeparate: { zero: 47025, fifteen: 291875 },
      headOfHousehold: { zero: 63150, fifteen: 551350 },
    }

    const threshold = thresholds[filingStatus]
    const totalIncome = dividendIncome + otherIncome
    const agi = totalIncome

    // Determine qualified dividend rate
    let qualifiedRate = 15
    if (agi <= threshold.zero) {
      qualifiedRate = 0
    } else if (agi > threshold.fifteen) {
      qualifiedRate = 20
    }

    // Check if dividends actually qualify
    let qualifiesForPreferredRate = isQualified && isTaxableAccount && holdingPeriodMonths >= 2

    // Foreign corporation qualification
    const foreignQualification = stockType === 'foreign' ? 'Foreign corporation must be in country with tax treaty or traded on US exchange' : ''

    // Calculate tax
    const dividendTax = isQualified && qualifiesForPreferredRate
      ? dividendIncome * (qualifiedRate / 100)
      : dividendIncome * 0.24 // Ordinary rate (simplified)

    // Tax savings from qualified treatment
    const ordinaryTax = dividendIncome * 0.24
    const taxSavings = ordinaryTax - dividendTax

    // Holding period check
    const meetsHoldingPeriod = holdingPeriodMonths >= 2 // Simplified 60 days = ~2 months
    const holdingPeriodNote = meetsHoldingPeriod
      ? 'Holding period met (60+ days for common stock)'
      : 'Warning: Holding period not met - dividends may not be qualified'

    // Tax account check
    const accountNote = isTaxableAccount
      ? 'Taxable account - dividends can be qualified'
      : 'Retirement account (IRA/401k) - dividends not qualified, taxed as ordinary income when withdrawn'

    // Total tax including other income (simplified)
    const ordinaryIncomeTax = otherIncome * 0.22 // Simplified bracket
    const totalTax = ordinaryIncomeTax + dividendTax

    // Effective tax rate
    const effectiveRate = (totalTax / totalIncome) * 100

    // Comparison table
    const taxComparison = {
      qualified: { rate: `${qualifiedRate}%`, tax: dividendIncome * (qualifiedRate / 100) },
      ordinary: { rate: '24%', tax: ordinaryTax },
      savings: { amount: taxSavings, percentage: ((taxSavings / ordinaryTax) * 100).toFixed(0) },
    }

    // Requirements summary
    const qualifiedRequirements = [
      'Paid by US corporation or qualified foreign corporation',
      'Holding period: 60+ days for common, 90+ days for preferred',
      'Holding period includes ex-dividend date',
      'Received in taxable account (not IRA/401k)',
      'Not hedged positions (no offsetting positions)',
      'Foreign: country with US tax treaty or traded on US exchange',
    ]

    // Recommendation
    let recommendation = ''
    if (!isTaxableAccount) {
      recommendation = 'Dividends in retirement accounts are never qualified - taxed as ordinary income upon withdrawal.'
    } else if (!meetsHoldingPeriod) {
      recommendation = `Holding period not met. Extend holding to 60+ days for qualified treatment. Potential tax savings: $${taxSavings.toFixed(0)}.`
    } else if (qualifiedRate === 0) {
      recommendation = `Income within 0% bracket - qualified dividends completely tax-free! Maximize qualified dividend income.`
    } else if (qualifiedRate === 15) {
      recommendation = `Qualified dividends at 15% vs ordinary 24%. Tax savings: $${taxSavings.toFixed(0)} on $${dividendIncome} dividends.`
    } else {
      recommendation = `High income: 20% rate on qualified dividends. Still saves $${taxSavings.toFixed(0)} vs ordinary rate.`
    }

    return {
      dividendIncome: dividendIncome.toFixed(0),
      otherIncome: otherIncome.toFixed(0),
      totalIncome: totalIncome.toFixed(0),
      filingStatus,
      isQualified,
      holdingPeriodMonths: holdingPeriodMonths.toFixed(0),
      meetsHoldingPeriod,
      stockType,
      isTaxableAccount,
      thresholdZero: threshold.zero.toFixed(0),
      thresholdFifteen: threshold.fifteen.toFixed(0),
      qualifiedRate: qualifiedRate.toFixed(0),
      qualifiesForPreferredRate,
      dividendTax: dividendTax.toFixed(0),
      ordinaryTax: ordinaryTax.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      ordinaryIncomeTax: ordinaryIncomeTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      taxComparison,
      holdingPeriodNote,
      accountNote,
      foreignQualification,
      qualifiedRequirements,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Qualified Dividends Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on qualified vs ordinary dividends.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Dividend Income</label>
          <input type="number" value={dividendIncome} onChange={(e) => setDividendIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Income</label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="marriedJoint">Married Filing Jointly</option>
            <option value="marriedSeparate">Married Filing Separately</option>
            <option value="headOfHousehold">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Qualified Dividends?</label>
          <select value={isQualified ? 'yes' : 'no'} onChange={(e) => setIsQualified(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - qualified dividends</option>
            <option value="no">No - ordinary dividends</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Period (Months)</label>
          <input type="number" value={holdingPeriodMonths} min="0" onChange={(e) => setHoldingPeriodMonths(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Type</label>
          <select value={stockType} onChange={(e) => setStockType(e.target.value as 'domestic' | 'foreign' | 'both')} className="w-full border rounded p-2">
            <option value="domestic">US Domestic Stock</option>
            <option value="foreign">Foreign Stock</option>
            <option value="both">Mixed Portfolio</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select value={isTaxableAccount ? 'yes' : 'no'} onChange={(e) => setIsTaxableAccount(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Taxable Account</option>
            <option value="no">Retirement Account (IRA/401k)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Qualified Dividend Rate</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Rate:</span><span className={`font-bold ml-2 ${result.qualifiedRate === '0' ? 'text-green-700' : result.qualifiedRate === '15' ? 'text-blue-700' : 'text-orange-700'}`}>{result.qualifiedRate}%</span></div>
          <div><span className="text-zinc-600">Income:</span><span className="font-medium ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className="font-medium ml-2">{filingStatus}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">0% Threshold:</span><span className="font-medium ml-2">$ {result.thresholdZero}</span></div>
          <div><span className="text-zinc-600">15% Threshold:</span><span className="font-medium ml-2">$ {result.thresholdFifteen}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Qualified dividend rates based on total income and filing status.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Qualified Tax:</span><span className="font-bold text-green-700 ml-2">$ {result.taxComparison.qualified.tax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Ordinary Tax:</span><span className="font-medium ml-2">$ {result.taxComparison.ordinary.tax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Qualified dividends save {result.taxComparison.savings.percentage}% vs ordinary income treatment.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Tax</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Dividend Tax:</span><span className="font-medium ml-2">$ {result.dividendTax}</span></div>
          <div><span className="text-zinc-600">Other Income Tax:</span><span className="font-medium ml-2">$ {result.ordinaryIncomeTax}</span></div>
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveRate}%</span></div>
        </div>
      </div>

      {!result.meetsHoldingPeriod && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-orange-700">⚠️ Holding Period Warning</h2>
          <div className="text-xs text-zinc-600">{result.holdingPeriodNote}</div>
        </div>
      )}

      {!result.isTaxableAccount && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Account Type Warning</h2>
          <div className="text-xs text-zinc-600">{result.accountNote}</div>
        </div>
      )}

      {result.stockType === 'foreign' && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Foreign Stock Rules</h2>
          <div className="text-xs text-zinc-600">{result.foreignQualification}</div>
        </div>
      )}

      <div className={`card mb-6 ${result.qualifiesForPreferredRate ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Qualified Dividend Requirements</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.qualifiedRequirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Qualified Dividends Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>0%, 15%, or 20% rates</li>
          <li>Rate based on total income</li>
          <li>60+ day holding period</li>
          <li>Must be taxable account</li>
          <li>US or qualified foreign corp</li>
          <li>Not hedged positions</li>
          <li>Reported on Form 1099-DIV</li>
          <li>Box 1a total, 1b qualified</li>
          <li>Schedule B for reporting</li>
          <li>Maximize qualified income</li>
        </ul>
      </div>
    </div>
  )
}