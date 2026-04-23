'use client'

import { useState } from 'react'

export default function TaxLossHarvestingOptimizerCalculator() {
  const [shortTermGains, setShortTermGains] = useState('10000')
  const [longTermGains, setLongTermGains] = useState('20000')
  const [shortTermLosses, setShortTermLosses] = useState('0')
  const [longTermLosses, setLongTermLosses] = useState('0')
  const [potentialLosses, setPotentialLosses] = useState('5000')
  const [ordinaryIncome, setOrdinaryIncome] = useState('80000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [taxYear, setTaxYear] = useState('2024')
  const [harvestStrategy, setHarvestStrategy] = useState('optimal')

  const calculate = () => {
    const stGains = parseFloat(shortTermGains) || 0
    const ltGains = parseFloat(longTermGains) || 0
    const stLosses = parseFloat(shortTermLosses) || 0
    const ltLosses = parseFloat(longTermLosses) || 0
    const potential = parseFloat(potentialLosses) || 0
    const income = parseFloat(ordinaryIncome) || 0

    // Tax rates (approximate)
    const stRate = 0.35 // Short-term gains taxed as ordinary income (use marginal rate)
    const ltRate = 0.15 // Long-term gains (15% for most taxpayers)
    const ordinaryRate = 0.22 // Marginal rate for ordinary income

    // Current situation (before harvesting)
    const netStGains = stGains - stLosses
    const netLtGains = ltGains - ltLosses

    const currentStTax = netStGains > 0 ? netStGains * stRate : 0
    const currentLtTax = netLtGains > 0 ? netLtGains * ltRate : 0
    const currentTotalTax = currentStTax + currentLtTax

    // Losses can offset: first same type, then cross-type, then $3000 ordinary income
    let currentDeductibleLosses = 0
    if (netStGains < 0) {
      currentDeductibleLosses += Math.min(-netStGains, 3000)
    }
    if (netLtGains < 0 && currentDeductibleLosses < 3000) {
      currentDeductibleLosses += Math.min(-netLtGains, 3000 - currentDeductibleLosses)
    }

    const currentOrdinaryTaxSavings = currentDeductibleLosses * ordinaryRate

    // Harvesting strategies
    // Strategy 1: Harvest all potential losses
    const harvestAllStLosses = potential // Assume all harvested losses are short-term (recent purchases)
    const totalStLossesAll = stLosses + harvestAllStLosses

    let netStGainsAll = stGains - totalStLossesAll
    let netLtGainsAll = ltGains - ltLosses

    // Cross-offset: ST losses offset LT gains if ST losses exceed ST gains
    if (netStGainsAll < 0) {
      netLtGainsAll += netStGainsAll // Add negative to reduce LT gains
      netStGainsAll = 0
    }

    const stTaxAll = netStGainsAll > 0 ? netStGainsAll * stRate : 0
    const ltTaxAll = netLtGainsAll > 0 ? netLtGainsAll * ltRate : 0

    // Remaining losses for ordinary income deduction
    let remainingLossAll = 0
    if (netStGainsAll < 0) remainingLossAll = -netStGainsAll
    if (netLtGainsAll < 0) remainingLossAll += -netLtGainsAll
    const deductibleAll = Math.min(remainingLossAll, 3000)

    const ordinarySavingsAll = deductibleAll * ordinaryRate
    const totalTaxAll = stTaxAll + ltTaxAll - ordinarySavingsAll
    const savingsAll = currentTotalTax - totalTaxAll + ordinarySavingsAll

    // Strategy 2: Harvest just enough to offset short-term gains
    const harvestPartialStLosses = Math.min(potential, stGains - stLosses)
    const totalStLossesPartial = stLosses + harvestPartialStLosses

    const netStGainsPartial = stGains - totalStLossesPartial
    const netLtGainsPartial = ltGains - ltLosses

    const stTaxPartial = netStGainsPartial > 0 ? netStGainsPartial * stRate : 0
    const ltTaxPartial = netLtGainsPartial > 0 ? netLtGainsPartial * ltRate : 0

    let remainingLossPartial = 0
    if (netStGainsPartial < 0) remainingLossPartial = -netStGainsPartial
    const deductiblePartial = Math.min(remainingLossPartial, 3000)

    const ordinarySavingsPartial = deductiblePartial * ordinaryRate
    const totalTaxPartial = stTaxPartial + ltTaxPartial - ordinarySavingsPartial
    const savingsPartial = currentTotalTax - totalTaxPartial + ordinarySavingsPartial

    // Recommended strategy
    const recommendedStrategy = savingsAll > savingsPartial ? 'harvestAll' : 'harvestPartial'
    const recommendedLosses = recommendedStrategy === 'harvestAll' ? potential : harvestPartialStLosses
    const recommendedSavings = recommendedStrategy === 'harvestAll' ? savingsAll : savingsPartial

    // Carryover losses
    const carryoverAll = Math.max(0, remainingLossAll - 3000)
    const carryoverPartial = Math.max(0, remainingLossPartial - 3000)

    // Wash sale warning (30-day rule)
    const washSaleRisk = potential > 0

    // Future benefit of carryover
    const carryoverFutureBenefit = carryoverAll * ltRate // If offsetting LT gains next year

    return {
      shortTermGains: stGains.toFixed(2),
      longTermGains: ltGains.toFixed(2),
      shortTermLosses: stLosses.toFixed(2),
      longTermLosses: ltLosses.toFixed(2),
      potentialLosses: potential.toFixed(2),
      ordinaryIncome: income.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      taxYear: taxYear,
      netStGains: netStGains.toFixed(2),
      netLtGains: netLtGains.toFixed(2),
      currentStTax: currentStTax.toFixed(2),
      currentLtTax: currentLtTax.toFixed(2),
      currentTotalTax: currentTotalTax.toFixed(2),
      currentDeductibleLosses: currentDeductibleLosses.toFixed(2),
      currentOrdinarySavings: currentOrdinaryTaxSavings.toFixed(2),
      harvestAllStLosses: harvestAllStLosses.toFixed(2),
      netStGainsAll: netStGainsAll.toFixed(2),
      netLtGainsAll: Math.max(0, netLtGainsAll).toFixed(2),
      stTaxAll: stTaxAll.toFixed(2),
      ltTaxAll: ltTaxAll.toFixed(2),
      deductibleAll: deductibleAll.toFixed(2),
      ordinarySavingsAll: ordinarySavingsAll.toFixed(2),
      totalTaxAll: totalTaxAll.toFixed(2),
      savingsAll: savingsAll.toFixed(2),
      harvestPartialLosses: harvestPartialStLosses.toFixed(2),
      netStGainsPartial: netStGainsPartial.toFixed(2),
      totalTaxPartial: totalTaxPartial.toFixed(2),
      savingsPartial: savingsPartial.toFixed(2),
      recommendedStrategy: recommendedStrategy === 'harvestAll' ? 'Harvest All Losses' : 'Harvest Partial Losses',
      recommendedLosses: recommendedLosses.toFixed(2),
      recommendedSavings: recommendedSavings.toFixed(2),
      carryoverAll: carryoverAll.toFixed(2),
      carryoverPartial: carryoverPartial.toFixed(2),
      carryoverFutureBenefit: carryoverFutureBenefit.toFixed(2),
      washSaleRisk,
      stRate: (stRate * 100).toFixed(0),
      ltRate: (ltRate * 100).toFixed(0),
      ordinaryRate: (ordinaryRate * 100).toFixed(0),
      hasNetGains: netStGains > 0 || netLtGains > 0,
      hasNetLosses: netStGains < 0 || netLtGains < 0,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax-Loss Harvesting Optimizer Calculator</h1>
      <p className="text-zinc-600">Optimize tax-loss harvesting strategy. Calculate savings from harvesting losses to offset gains, understand short-term vs long-term offset rules, and plan carryover losses for future years.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Gains & Losses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Short-Term Gains ($)</label>
            <input
              type="number"
              value={shortTermGains}
              onChange={(e) => setShortTermGains(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Assets held under 1 year. Taxed as ordinary income (higher rate).
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Long-Term Gains ($)</label>
            <input
              type="number"
              value={longTermGains}
              onChange={(e) => setLongTermGains(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Assets held over 1 year. Taxed at preferential 0-20% rate.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Existing Short-Term Losses ($)</label>
            <input
              type="number"
              value={shortTermLosses}
              onChange={(e) => setShortTermLosses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Existing Long-Term Losses ($)</label>
            <input
              type="number"
              value={longTermLosses}
              onChange={(e) => setLongTermLosses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Potential Losses to Harvest</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Unrealized Losses Available ($)</label>
            <input
              type="number"
              value={potentialLosses}
              onChange={(e) => setPotentialLosses(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-yellow-600 mt-1">
              Positions currently showing losses that you could sell to realize the loss.
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
            <label className="block text-sm text-zinc-600 mb-1">Ordinary Income (Wages) ($)</label>
            <input
              type="number"
              value={ordinaryIncome}
              onChange={(e) => setOrdinaryIncome(e.target.value)}
              className="input"
              min="0"
            />
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
        <h3 className="font-medium mb-2 text-blue-700">Current Tax Situation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Net Short-Term:</span>
            <span className={`font-medium ml-2 ${parseFloat(result.netStGains) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${result.netStGains}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Net Long-Term:</span>
            <span className={`font-medium ml-2 ${parseFloat(result.netLtGains) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${result.netLtGains}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Current ST Tax:</span>
            <span className="font-medium ml-2">${result.currentStTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current LT Tax:</span>
            <span className="font-medium ml-2">${result.currentLtTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold ml-2">${result.currentTotalTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Recommended Harvesting Strategy</h3>
        <div className="text-lg font-bold text-green-800">{result.recommendedStrategy}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Losses to Harvest:</span>
            <span className="font-bold ml-2">${result.recommendedLosses}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Savings:</span>
            <span className="font-bold ml-2 text-green-800">${result.recommendedSavings}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Strategy 1: Harvest All Losses</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Harvest Amount:</span>
            <span className="font-medium ml-2">${result.harvestAllStLosses}</span>
          </div>
          <div>
            <span className="text-zinc-600">New ST Tax:</span>
            <span className="font-medium ml-2">${result.stTaxAll}</span>
          </div>
          <div>
            <span className="text-zinc-600">New LT Tax:</span>
            <span className="font-medium ml-2">${result.ltTaxAll}</span>
          </div>
          <div>
            <span className="text-zinc-600">Ordinary Deduction:</span>
            <span className="font-medium ml-2">${result.deductibleAll}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold ml-2">${result.totalTaxAll}</span>
          </div>
          <div>
            <span className="text-zinc-600">Savings:</span>
            <span className="font-bold ml-2">${result.savingsAll}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Strategy 2: Harvest Partial Losses</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Harvest Amount:</span>
            <span className="font-medium ml-2">${result.harvestPartialLosses}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold ml-2">${result.totalTaxPartial}</span>
          </div>
          <div>
            <span className="text-zinc-600">Savings:</span>
            <span className="font-bold ml-2">${result.savingsPartial}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.carryoverAll) > 0 && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Loss Carryover</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Carryover Losses:</span>
              <span className="font-bold ml-2">${result.carryoverAll}</span>
            </div>
            <div>
              <span className="text-zinc-600">Future Benefit:</span>
              <span className="font-medium ml-2">${result.carryoverFutureBenefit}</span>
            </div>
          </div>
          <div className="text-xs text-teal-600 mt-2">
            Unused losses carry forward indefinitely. Offset future gains or deduct $3000/year from ordinary income.
          </div>
        </div>
      )}

      {result.washSaleRisk && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Wash Sale Rule Warning</h3>
          <div className="text-sm text-red-600">
            Avoid repurchasing the same or substantially identical security within 30 days before or after the sale. The IRS will disallow the loss deduction.
          </div>
          <div className="text-xs text-red-600 mt-2">
            Solution: Buy a similar but not identical ETF (e.g., sell S&P 500 fund, buy total market fund), or wait 31+ days before repurchasing.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax-Loss Harvesting Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Offset Order:</strong> Short-term losses first offset short-term gains. Then long-term gains. Then $3000 ordinary income.</li>
          <li><strong>Long-Term Losses:</strong> First offset long-term gains. Then short-term gains. Then $3000 ordinary income.</li>
          <li><strong>Best Strategy:</strong> Harvest losses to offset short-term gains first (saves at higher ordinary rate).</li>
          <li><strong>$3000 Limit:</strong> Net losses exceeding gains can deduct $3000 ($1500 married separate) from ordinary income yearly.</li>
          <li><strong>Carryover:</strong> Unused losses carry forward indefinitely. No expiration.</li>
          <li><strong>Wash Sale:</strong> 30-day rule before/after sale. Loss disallowed if repurchase same/substantially identical security.</li>
          <li><strong>Timing:</strong> Harvest before year-end to lock in deduction. Consider market conditions.</li>
          <li><strong>Rebalance:</strong> Use harvesting as opportunity to rebalance portfolio into desired allocation.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Rates Applied</h3>
        <ul className="text-xs text-zinc-600 space-y-1">
          <li>Short-Term Gains: {result.stRate}% (ordinary income marginal rate)</li>
          <li>Long-Term Gains: {result.ltRate}% (preferential capital gains rate)</li>
          <li>Ordinary Income Deduction: {result.ordinaryRate}% (marginal rate on wages)</li>
        </ul>
        <div className="text-xs text-zinc-600 mt-2">
          Rates are approximate. Consult tax professional for your actual marginal rates.
        </div>
      </div>
    </main>
  )
}