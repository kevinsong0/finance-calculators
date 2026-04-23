'use client'

import { useState } from 'react'

export default function CapitalGainTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState('')
  const [assetType, setAssetType] = useState('stock')
  const [incomeBracket, setIncomeBracket] = useState('')
  const [filingStatus, setFilingStatus] = useState('single')
  const [state, setState] = useState('california')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [saleDate, setSaleDate] = useState('')

  const calculate = () => {
    const purchase = parseFloat(purchasePrice) || 10000
    const sale = parseFloat(salePrice) || 20000
    const months = parseInt(holdingPeriod) || 12
    const asset = assetType
    const bracket = parseFloat(incomeBracket) || 100000
    const status = filingStatus
    const stateCode = state

    // Calculate capital gain
    const capitalGain = sale - purchase
    const isLongTerm = months >= 12
    const isGain = capitalGain > 0

    // Federal capital gains rates (2026)
    // Long-term: 0%, 15%, 20% based on income
    // Short-term: Ordinary income tax rates

    let federalRate = 0
    let federalTax = 0

    if (isLongTerm) {
      // Long-term capital gains rates
      if (status === 'single') {
        if (bracket <= 47025) federalRate = 0
        else if (bracket <= 518900) federalRate = 0.15
        else federalRate = 0.20
      } else if (status === 'married') {
        if (bracket <= 94050) federalRate = 0
        else if (bracket <= 583750) federalRate = 0.15
        else federalRate = 0.20
      } else {
        if (bracket <= 63000) federalRate = 0
        else if (bracket <= 551850) federalRate = 0.15
        else federalRate = 0.20
      }
    } else {
      // Short-term: Ordinary income rates
      if (bracket <= 11600) federalRate = 0.10
      else if (bracket <= 47150) federalRate = 0.12
      else if (bracket <= 100525) federalRate = 0.22
      else if (bracket <= 191950) federalRate = 0.24
      else if (bracket <= 244725) federalRate = 0.32
      else if (bracket <= 609350) federalRate = 0.35
      else federalRate = 0.37
    }

    federalTax = Math.max(0, capitalGain) * federalRate

    // State capital gains rates (most states tax as ordinary income)
    const stateRates: Record<string, number> = {
      'california': 0.093,
      'newyork': 0.0882,
      'florida': 0,
      'texas': 0,
      'washington': 0,
      'illinois': 0.0495,
      'georgia': 0.0575,
      'massachusetts': 0.05,
      'newjersey': 0.1075,
      'connecticut': 0.0699
    }

    const stateRate = stateRates[stateCode] || 0.05
    const stateTax = Math.max(0, capitalGain) * stateRate

    // Net Investment Income Tax (NIIT) - 3.8% for high income
    const niitThreshold = status === 'married' ? 250000 : status === 'head_household' ? 250000 : 200000
    const niitApplies = bracket > niitThreshold && asset !== 'real_estate_primary'
    const niitTax = niitApplies ? Math.max(0, capitalGain) * 0.038 : 0

    // Total tax
    const totalTax = federalTax + stateTax + niitTax

    // Net proceeds
    const netProceeds = sale - totalTax

    // Effective tax rate on gain
    const effectiveRate = capitalGain > 0 ? (totalTax / capitalGain) * 100 : 0

    // ROI after taxes
    const roiBeforeTax = ((sale - purchase) / purchase) * 100
    const roiAfterTax = ((netProceeds - purchase) / purchase) * 100

    // Loss scenario (if capital loss)
    const isLoss = capitalGain < 0
    const lossAmount = Math.abs(Math.min(0, capitalGain))
    const deductionLimit = 3000 // Annual capital loss deduction limit
    const usableLoss = Math.min(lossAmount, deductionLimit)
    const carryoverLoss = lossAmount - usableLoss

    return {
      purchasePrice: purchase.toFixed(2),
      salePrice: sale.toFixed(2),
      capitalGain: capitalGain.toFixed(2),
      holdingPeriod: months,
      isLongTerm,
      assetType: asset,
      filingStatus: status,
      incomeBracket: bracket.toFixed(2),
      federalRate: (federalRate * 100).toFixed(1),
      federalTax: federalTax.toFixed(2),
      state: stateCode,
      stateRate: (stateRate * 100).toFixed(2),
      stateTax: stateTax.toFixed(2),
      niitApplies,
      niitTax: niitTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netProceeds: netProceeds.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      roiBeforeTax: roiBeforeTax.toFixed(1),
      roiAfterTax: roiAfterTax.toFixed(1),
      isGain,
      isLoss,
      lossAmount: lossAmount.toFixed(2),
      usableLoss: usableLoss.toFixed(2),
      carryoverLoss: carryoverLoss.toFixed(2),
      longTermBenefit: isLongTerm ? ((capitalGain * 0.22) - federalTax).toFixed(2) : '0',
      shortTermRate: 'Ordinary income',
      longTermRate: '0%/15%/20%'
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Capital Gains Tax Calculator</h1>
      <p className="text-zinc-600">Calculate federal and state capital gains tax for stocks, real estate, and other investments.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Transaction Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Asset Type</label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="stock">Stocks/ETFs/Mutual Funds</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="real_estate_investment">Investment Property</option>
              <option value="real_estate_primary">Primary Residence (Exemption)</option>
              <option value="collectibles">Collectibles (28% rate)</option>
              <option value="bonds">Bonds</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Purchase Price</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter purchase cost"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Sale Price</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter sale amount"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period (months)</label>
            <input
              type="number"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter months held"
            />
            <div className="text-xs text-zinc-500 mt-1">
              12+ months = Long-term (lower rates). Under 12 = Short-term (ordinary rates)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Taxable Income Bracket</label>
            <input
              type="number"
              value={incomeBracket}
              onChange={(e) => setIncomeBracket(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter taxable income"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Determines long-term capital gains rate: 0% / 15% / 20%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single</option>
              <option value="married">Married Joint</option>
              <option value="head_household">Head of Household</option>
            </select>
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
              <option value="newjersey">New Jersey (10.75%)</option>
              <option value="connecticut">Connecticut (6.99%)</option>
              <option value="massachusetts">Massachusetts (5%)</option>
              <option value="illinois">Illinois (4.95%)</option>
              <option value="georgia">Georgia (5.75%)</option>
              <option value="florida">Florida (0% - No state tax)</option>
              <option value="texas">Texas (0% - No state tax)</option>
              <option value="washington">Washington (0% - No state tax)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Gain/Loss Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Purchase Price</span>
            <span className="font-bold">$${result.purchasePrice}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Sale Price</span>
            <span className="font-bold">$${result.salePrice}</span>
          </div>
          <div className={`rounded p-3 flex justify-between border-t-2 ${result.isGain ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
            <span className="font-medium">Capital {result.isGain ? 'Gain' : 'Loss'}</span>
            <span className={`font-bold ${result.isGain ? 'text-green-600' : 'text-red-600'}`}>
              {result.isGain ? '+' : ''}$${result.capitalGain}
            </span>
          </div>
          <div className="bg-blue-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Holding Period</span>
            <span className="font-bold text-blue-600">
              {result.isLongTerm ? 'Long-term (12+ months)' : 'Short-term (<12 months)'}
            </span>
          </div>
        </div>
      </div>

      {result.isGain ? (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Tax Breakdown</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Federal Rate ({result.isLongTerm ? 'Long-term' : 'Short-term'})</span>
              <span className="font-bold">{result.federalRate}%</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Federal Tax</span>
              <span className="font-bold text-red-600">$${result.federalTax}</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">State Tax ({result.stateRate}%)</span>
              <span className="font-bold text-red-600">$${result.stateTax}</span>
            </div>
            {result.niitApplies && (
              <div className="bg-red-50 rounded p-3 flex justify-between">
                <span className="text-zinc-600">NIIT (3.8%)</span>
                <span className="font-bold text-red-600">$${result.niitTax}</span>
              </div>
            )}
            <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
              <span className="font-medium">Total Tax</span>
              <span className="font-bold text-red-600">$${result.totalTax}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Capital Loss Treatment</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Total Loss</div>
              <div className="font-bold text-red-600">$${result.lossAmount}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Deductible This Year</div>
              <div className="font-bold text-green-600">$${result.usableLoss}</div>
              <div className="text-xs text-zinc-400">Up to $3,000/year</div>
            </div>
            {parseFloat(result.carryoverLoss) > 0 && (
              <div className="bg-white rounded p-3 col-span-2">
                <div className="text-zinc-500">Carryover to Future Years</div>
                <div className="font-bold">$${result.carryoverLoss}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Results Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Net Proceeds</div>
            <div className="text-2xl font-bold text-green-600">$${result.netProceeds}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective Tax Rate</div>
            <div className="text-2xl font-bold">{result.effectiveRate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">ROI Before Tax</div>
            <div className="text-2xl font-bold">{result.roiBeforeTax}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">ROI After Tax</div>
            <div className="text-2xl font-bold text-blue-600">{result.roiAfterTax}%</div>
          </div>
        </div>
      </div>

      {result.isLongTerm && parseFloat(result.longTermBenefit) > 0 && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Long-term Tax Savings</h3>
          <div className="text-sm text-green-600">
            Holding 12+ months saves $${result.longTermBenefit} vs short-term rates. Long-term rates (0%/15%/20%) vs short-term (10%-37% ordinary income). Strategy: Hold investments longer to qualify for preferential rates.
          </div>
        </div>
      )}

      {!result.isLongTerm && result.isGain && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Short-term Higher Tax</h3>
          <div className="text-sm text-yellow-600">
            Short-term gains taxed at ordinary income rates ({result.federalRate}%), higher than long-term (0%-20%). Consider holding longer to qualify for preferential rates. Selling before 12 months costs more in taxes.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Capital Gains Rate Tiers (2026)</h3>
        <div className="text-xs text-zinc-600">
          Long-term rates (Single): 0% up to $47,025 income, 15% up to $518,900, 20% above. Married: 0% up to $94,050, 15% up to $583,750, 20% above. Short-term: Ordinary income rates (10%-37%). NIIT: Additional 3.8% if income exceeds $200K (single) / $250K (married).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Strategies</h3>
        <div className="text-xs text-zinc-600">
          Hold 12+ months for lower rates. Tax-loss harvesting: Offset gains with losses. Use losses against $3,000 ordinary income annually. Carryover unused losses indefinitely. Gift appreciated assets to charity. Consider 1031 exchange for real estate. Primary residence: Up to $250K ($500K married) exclusion if lived 2+ years.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">State Tax Note</h3>
        <div className="text-xs text-zinc-600">
          Most states tax capital gains as ordinary income. No state tax: FL, TX, WA, NV, WY, SD. High state tax: CA (9.3%), NJ (10.75%), NY (8.82%). Consider state residence when calculating total tax burden. Some states have no capital gains tax (e.g., AZ partial exemption).
        </div>
      </div>
    </main>
  )
}