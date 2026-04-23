'use client'

import { useState } from 'react'

export default function TaxLossHarvestingCalculator() {
  const [portfolioValue, setPortfolioValue] = useState('100000')
  const [lossPosition, setLossPosition] = useState('15000')
  const [costBasis, setCostBasis] = useState('20000')
  const [currentValue, setCurrentValue] = useState('5000')
  const [holdingPeriod, setHoldingPeriod] = useState('long')
  const [incomeType, setIncomeType] = useState('ordinary')
  const [ordinaryIncome, setOrdinaryIncome] = useState('75000')
  const [capitalGainsLong, setCapitalGainsLong] = useState('10000')
  const [capitalGainsShort, setCapitalGainsShort] = useState('5000')
  const [hasWashSale, setHasWashSale] = useState(false)

  const capitalGainsTaxRates: Record<string, Record<string, number>> = {
    ordinary: { long: 0.15, short: 0.22 }, // 22% ordinary rate bracket
    high: { long: 0.20, short: 0.32 }, // Higher brackets
    zero: { long: 0.00, short: 0.10 }, // Low income
  }

  const calculate = () => {
    const portfolio = parseFloat(portfolioValue) || 0
    const loss = parseFloat(lossPosition) || 0
    const basis = parseFloat(costBasis) || 0
    const current = parseFloat(currentValue) || 0
    const ordinary = parseFloat(ordinaryIncome) || 0
    const longGains = parseFloat(capitalGainsLong) || 0
    const shortGains = parseFloat(capitalGainsShort) || 0

    const actualLoss = Math.max(0, basis - current)
    const isLongTerm = holdingPeriod === 'long'

    // Tax rates based on income
    let incomeBracket = 'ordinary'
    if (ordinary <= 47025) incomeBracket = 'zero' // 0% long-term rate threshold (2024 single)

    const rates = capitalGainsTaxRates[incomeBracket]
    const longTermRate = rates.long
    const shortTermRate = rates.short

    // Loss harvesting calculation
    // Long-term losses first offset long-term gains, then short-term gains
    // Short-term losses first offset short-term gains, then long-term gains
    // Remaining losses offset ordinary income up to $3,000

    let remainingLoss = isLongTerm ? actualLoss : actualLoss
    let offsetLongGains = 0
    let offsetShortGains = 0
    let offsetOrdinary = 0

    if (isLongTerm) {
      // Long-term loss
      offsetLongGains = Math.min(remainingLoss, longGains)
      remainingLoss -= offsetLongGains
      if (remainingLoss > 0) {
        offsetShortGains = Math.min(remainingLoss, shortGains)
        remainingLoss -= offsetShortGains
      }
    } else {
      // Short-term loss
      offsetShortGains = Math.min(remainingLoss, shortGains)
      remainingLoss -= offsetShortGains
      if (remainingLoss > 0) {
        offsetLongGains = Math.min(remainingLoss, longGains)
        remainingLoss -= offsetLongGains
      }
    }

    // Offset ordinary income up to $3,000
    offsetOrdinary = Math.min(remainingLoss, 3000)
    remainingLoss -= offsetOrdinary

    // Carryover losses
    const carryoverLoss = remainingLoss

    // Tax savings calculation
    const taxSavingsLong = offsetLongGains * longTermRate
    const taxSavingsShort = offsetShortGains * shortTermRate
    const taxSavingsOrdinary = offsetOrdinary * 0.22 // Approximate ordinary rate

    const totalTaxSavings = taxSavingsLong + taxSavingsShort + taxSavingsOrdinary

    // Wash sale consideration
    const washSalePenalty = hasWashSale ? actualLoss : 0

    // Net position after harvesting
    const netCapitalGains = longGains + shortGains - offsetLongGains - offsetShortGains
    const netOrdinaryDeduction = offsetOrdinary

    return {
      portfolioValue: portfolio.toFixed(2),
      actualLoss: actualLoss.toFixed(2),
      costBasis: basis.toFixed(2),
      currentValue: current.toFixed(2),
      isLongTerm,
      holdingPeriod: isLongTerm ? 'Long-term (over 1 year)' : 'Short-term (under 1 year)',
      offsetLongGains: offsetLongGains.toFixed(2),
      offsetShortGains: offsetShortGains.toFixed(2),
      offsetOrdinary: offsetOrdinary.toFixed(2),
      carryoverLoss: carryoverLoss.toFixed(2),
      taxSavingsLong: taxSavingsLong.toFixed(2),
      taxSavingsShort: taxSavingsShort.toFixed(2),
      taxSavingsOrdinary: taxSavingsOrdinary.toFixed(2),
      totalTaxSavings: totalTaxSavings.toFixed(2),
      washSalePenalty: washSalePenalty.toFixed(2),
      netCapitalGains: netCapitalGains.toFixed(2),
      longTermRate: (longTermRate * 100).toFixed(0),
      shortTermRate: (shortTermRate * 100).toFixed(0),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax Loss Harvesting Calculator</h1>
      <p className="text-zinc-600">Calculate potential tax savings from selling losing positions to offset capital gains and ordinary income.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Loss Position Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Cost Basis ($)</label>
            <input
              type="number"
              value={costBasis}
              onChange={(e) => setCostBasis(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Value ($)</label>
            <input
              type="number"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period</label>
            <select
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="input"
            >
              <option value="long">Long-term (held over 1 year)</option>
              <option value="short">Short-term (held under 1 year)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Unrealized Loss</h3>
        <div className="text-2xl font-bold text-red-800">${result.actualLoss}</div>
        <div className="text-sm text-red-600 mt-1">
          Cost basis ${result.costBasis} - Current value ${result.currentValue}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Existing Capital Gains</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Long-term Capital Gains ($)</label>
            <input
              type="number"
              value={capitalGainsLong}
              onChange={(e) => setCapitalGainsLong(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Tax rate: {result.longTermRate}% (based on income level)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Short-term Capital Gains ($)</label>
            <input
              type="number"
              value={capitalGainsShort}
              onChange={(e) => setCapitalGainsShort(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Tax rate: {result.shortTermRate}% (ordinary income rate)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Ordinary Income ($)</label>
            <input
              type="number"
              value={ordinaryIncome}
              onChange={(e) => setOrdinaryIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Wash Sale Rule</h3>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={hasWashSale}
            onChange={(e) => setHasWashSale(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Plan to repurchase same/similar security within 30 days</label>
        </div>
        <div className="text-xs text-yellow-600">
          Warning: Wash sale rule disallows loss if you buy the same or substantially identical security within 30 days before or after the sale.
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Loss Offsetting Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Offsets Long-term Gains:</span>
            <span className="font-medium ml-2">${result.offsetLongGains}</span>
          </div>
          <div>
            <span className="text-zinc-600">Offsets Short-term Gains:</span>
            <span className="font-medium ml-2">${result.offsetShortGains}</span>
          </div>
          <div>
            <span className="text-zinc-600">Offsets Ordinary Income:</span>
            <span className="font-medium ml-2">${result.offsetOrdinary}</span>
          </div>
          <div>
            <span className="text-zinc-600">Carryover Loss:</span>
            <span className="font-medium ml-2">${result.carryoverLoss}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Estimated Tax Savings</h3>
        <div className="text-2xl font-bold text-green-800">${result.totalTaxSavings}</div>
        <div className="text-sm text-green-600 mt-2 space-y-1">
          <div>Long-term offset savings: ${result.taxSavingsLong}</div>
          <div>Short-term offset savings: ${result.taxSavingsShort}</div>
          <div>Ordinary income deduction savings: ${result.taxSavingsOrdinary}</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Net Position After Harvesting</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Net Capital Gains:</span>
            <span className="font-medium ml-2">${result.netCapitalGains}</span>
          </div>
          <div>
            <span className="text-zinc-600">Holding Period:</span>
            <span className="font-medium ml-2">{result.holdingPeriod}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.carryoverLoss) > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Loss Carryover</h3>
          <div className="text-sm text-zinc-600">
            ${result.carryoverLoss} can be carried forward to future tax years to offset gains and up to $3,000 ordinary income annually.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Long-term losses offset long-term gains first, then short-term gains.</li>
          <li>Short-term losses offset short-term gains first, then long-term gains.</li>
          <li>Remaining losses can offset up to $3,000 of ordinary income per year.</li>
          <li>Unused losses carry forward indefinitely to future tax years.</li>
          <li>Wash sale: Loss disallowed if repurchasing same/similar security within 30 days.</li>
          <li>Long-term gains taxed at 0%, 15%, or 20% based on income bracket.</li>
          <li>Short-term gains taxed at ordinary income rates (10% to 37%).</li>
        </ul>
      </div>
    </main>
  )
}