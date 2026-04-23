'use client'

import { useState } from 'react'

export default function Exchange1031Calculator() {
  const [salePrice, setSalePrice] = useState('')
  const [originalPurchasePrice, setOriginalPurchasePrice] = useState('')
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState('')
  const [exchangeType, setExchangeType] = useState('delayed')
  const [replacementPropertyPrice, setReplacementPropertyPrice] = useState('')
  const [improvementCost, setImprovementCost] = useState('')
  const [state, setState] = useState('california')

  const calculate = () => {
    const soldPrice = parseFloat(salePrice) || 500000
    const purchasePrice = parseFloat(originalPurchasePrice) || 200000
    const depreciation = parseFloat(accumulatedDepreciation) || 50000
    const replacementPrice = parseFloat(replacementPropertyPrice) || 550000
    const improvements = parseFloat(improvementCost) || 0
    const type = exchangeType
    const stateCode = state

    // Calculate realized gain
    const adjustedBasis = purchasePrice - depreciation
    const realizedGain = soldPrice - adjustedBasis

    // Depreciation recapture (25% federal rate)
    const depreciationRecapture = Math.min(depreciation, realizedGain)
    const recaptureTax = depreciationRecapture * 0.25

    // Capital gains portion
    const capitalGain = Math.max(0, realizedGain - depreciationRecapture)
    const federalCapGainsRate = 0.20 // 20% for most investors
    const stateCapGainsRate: Record<string, number> = {
      'california': 0.093,
      'newyork': 0.0882,
      'florida': 0,
      'texas': 0,
      'washington': 0,
      'illinois': 0.0495,
      'georgia': 0.0575
    }
    const stateRate = stateCapGainsRate[stateCode] || 0.05
    const capitalGainsTax = capitalGain * federalCapGainsRate + capitalGain * stateRate

    // Total tax if sold (no 1031)
    const totalTaxNoExchange = recaptureTax + capitalGainsTax

    // 1031 Exchange requirements
    // Must purchase property of equal or greater value
    // Must reinvest all proceeds
    const totalReplacementCost = replacementPrice + improvements
    const meetsValueRequirement = totalReplacementCost >= soldPrice
    const meetsProceedsRequirement = totalReplacementCost >= soldPrice // Same check for simplicity

    // Boot (taxable portion if exchange incomplete)
    const valueBoot = Math.max(0, soldPrice - totalReplacementCost)
    const cashBoot = 0 // Assume all cash reinvested
    const totalBoot = valueBoot + cashBoot

    // Tax on boot (if partial exchange)
    const bootTax = totalBoot * 0.25 // Simplified

    // Deferred gain
    const deferredGain = meetsValueRequirement ? realizedGain : Math.max(0, realizedGain - totalBoot)

    // New basis for replacement property
    const newBasis = replacementPrice - deferredGain

    // Future tax liability (when replacement sold)
    const futureTaxEstimate = deferredGain * (federalCapGainsRate + stateRate)

    // Tax savings from 1031
    const taxSavings = totalTaxNoExchange - bootTax

    // Timeline requirements
    const identificationDeadline = 45
    const closingDeadline = 180

    // Exchange types and rules
    const exchangeTypeRules = {
      'delayed': 'Sell first, identify replacement within 45 days, close within 180 days.',
      'reverse': 'Buy replacement first, sell relinquished within 180 days.',
      'improvement': 'Use exchange funds for improvements to meet value requirement.'
    }

    return {
      salePrice: soldPrice.toFixed(2),
      purchasePrice: purchasePrice.toFixed(2),
      accumulatedDepreciation: depreciation.toFixed(2),
      adjustedBasis: adjustedBasis.toFixed(2),
      realizedGain: realizedGain.toFixed(2),
      depreciationRecapture: depreciationRecapture.toFixed(2),
      recaptureTax: recaptureTax.toFixed(2),
      capitalGain: capitalGain.toFixed(2),
      federalCapGainsTax: (capitalGain * federalCapGainsRate).toFixed(2),
      stateCapGainsTax: (capitalGain * stateRate).toFixed(2),
      totalTaxNoExchange: totalTaxNoExchange.toFixed(2),
      replacementPrice: replacementPrice.toFixed(2),
      improvementCost: improvements.toFixed(2),
      totalReplacementCost: totalReplacementCost.toFixed(2),
      meetsValueRequirement,
      totalBoot: totalBoot.toFixed(2),
      bootTax: bootTax.toFixed(2),
      deferredGain: deferredGain.toFixed(2),
      newBasis: newBasis.toFixed(2),
      futureTaxEstimate: futureTaxEstimate.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      exchangeType: type,
      exchangeRule: exchangeTypeRules[type as keyof typeof exchangeTypeRules],
      identificationDeadline,
      closingDeadline,
      state: stateCode,
      federalRate: '20%',
      recaptureRate: '25%'
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">1031 Exchange Calculator</h1>
      <p className="text-zinc-600">Calculate tax savings from IRS Section 1031 like-kind property exchange for real estate investors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Relinquished Property (Sold)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Sale Price</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter property sale price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Original Purchase Price</label>
            <input
              type="number"
              value={originalPurchasePrice}
              onChange={(e) => setOriginalPurchasePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter original purchase price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Accumulated Depreciation</label>
            <input
              type="number"
              value={accumulatedDepreciation}
              onChange={(e) => setAccumulatedDepreciation(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter depreciation claimed"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Residential: ~$36K/year per $1M. Commercial: varies by useful life.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="california">California (9.3%)</option>
              <option value="newyork">New York (8.82%)</option>
              <option value="florida">Florida (0% - No state tax)</option>
              <option value="texas">Texas (0% - No state tax)</option>
              <option value="illinois">Illinois (4.95%)</option>
              <option value="georgia">Georgia (5.75%)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Replacement Property</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Exchange Type</label>
            <select
              value={exchangeType}
              onChange={(e) => setExchangeType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="delayed">Delayed Exchange (Standard)</option>
              <option value="reverse">Reverse Exchange</option>
              <option value="improvement">Improvement Exchange</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Replacement Property Price</label>
            <input
              type="number"
              value={replacementPropertyPrice}
              onChange={(e) => setReplacementPropertyPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter replacement property price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Improvement Costs (if applicable)</label>
            <input
              type="number"
              value={improvementCost}
              onChange={(e) => setImprovementCost(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter improvement costs"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Use exchange funds for improvements to meet value requirement
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Gain Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Sale Price</span>
            <span className="font-bold">$${result.salePrice}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Adjusted Basis (Purchase - Depreciation)</span>
            <span className="font-bold">$${result.adjustedBasis}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Realized Gain</span>
            <span className="font-bold text-blue-600">$${result.realizedGain}</span>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Depreciation Recapture (25%)</span>
            <span className="font-bold text-yellow-600">$${result.depreciationRecapture}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Capital Gain Portion</span>
            <span className="font-bold">$${result.capitalGain}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Without 1031 Exchange</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Recapture Tax (25%)</span>
            <span className="font-bold text-red-600">$${result.recaptureTax}</span>
          </div>
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Federal Capital Gains (20%)</span>
            <span className="font-bold text-red-600">$${result.federalCapGainsTax}</span>
          </div>
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Capital Gains</span>
            <span className="font-bold text-red-600">$${result.stateCapGainsTax}</span>
          </div>
          <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
            <span className="font-medium">Total Tax (No Exchange)</span>
            <span className="font-bold text-red-600">$${result.totalTaxNoExchange}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">1031 Exchange Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Replacement Total</div>
            <div className="text-2xl font-bold">$${result.totalReplacementCost}</div>
          </div>
          <div className={`rounded p-4 ${result.meetsValueRequirement ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-sm text-zinc-500">Value Requirement</div>
            <div className={`text-2xl font-bold ${result.meetsValueRequirement ? 'text-green-600' : 'text-red-600'}`}>
              {result.meetsValueRequirement ? 'Met' : 'Not Met'}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Deferred Gain</div>
            <div className="text-2xl font-bold text-blue-600">$${result.deferredGain}</div>
          </div>
          <div className="bg-green-50 rounded p-4">
            <div className="text-sm text-zinc-500">Tax Savings</div>
            <div className="text-2xl font-bold text-green-600">$${result.taxSavings}</div>
          </div>
        </div>
      </div>

      {result.meetsValueRequirement ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Full Tax Deferral Achieved</h3>
          <div className="text-sm text-green-600">
            Replacement property ($${result.totalReplacementCost}) meets or exceeds sale price ($${result.salePrice}). All $${result.deferredGain} gain deferred. New basis: $${result.newBasis}. Future tax liability when replacement sold: ~$${result.futureTaxEstimate}.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Partial Exchange - Boot Taxable</h3>
          <div className="text-sm text-yellow-600">
            Replacement property ($${result.totalReplacementCost}) below sale price ($${result.salePrice}). Boot: $${result.totalBoot} taxable. Boot tax: ~$${result.bootTax}. Consider increasing replacement value or improvements.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Timeline Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Identification Deadline</strong>
            <div className="text-zinc-500">{result.identificationDeadline} days from sale</div>
            <div className="text-zinc-400">Identify up to 3 properties (or more with rules)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Closing Deadline</strong>
            <div className="text-zinc-500">{result.closingDeadline} days from sale</div>
            <div className="text-zinc-400">Must close on replacement property</div>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          {result.exchangeRule}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key 1031 Rules</h3>
        <div className="text-xs text-zinc-600">
          Like-kind: Real estate for real estate (any type). Value requirement: Replacement must equal or exceed sale price. Proceeds requirement: All cash must be reinvested. Qualified Intermediary (QI) required: Cannot touch funds directly. No personal use properties. Depreciation recapture: May apply if new property has less depreciation. State rules: Some states (CA) track deferred gain for future tax.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">1031 Exchange Benefits</h3>
        <div className="text-xs text-zinc-600">
          Defer 100% capital gains tax. Defer depreciation recapture (25%). Leverage equity into larger property. Portfolio rebalancing without tax cost. Estate planning: Heirs inherit at market value (step-up basis eliminates deferred gain). Unlimited exchanges allowed. Combine multiple properties into one (or vice versa).
        </div>
      </div>
    </main>
  )
}