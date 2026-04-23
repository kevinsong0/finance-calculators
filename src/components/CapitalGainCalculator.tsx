'use client'

import { useState } from 'react'

export default function CapitalGainCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState('')
  const [assetType, setAssetType] = useState('stock')

  const calculate = () => {
    const purchase = parseFloat(purchasePrice) || 0
    const sale = parseFloat(salePrice) || 0
    const months = parseFloat(holdingPeriod) || 0
    const gain = sale - purchase
    const isLongTerm = months >= 12

    let taxRate = 0
    if (assetType === 'stock') {
      taxRate = isLongTerm ? 0.15 : 0.35
    } else if (assetType === 'real_estate') {
      taxRate = isLongTerm ? 0.15 : 0.35
    } else {
      taxRate = 0.35
    }

    const tax = gain > 0 ? gain * taxRate : 0
    const netGain = gain - tax

    return { gain, taxRate, tax, netGain, isLongTerm }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Capital Gain Tax Calculator</h1>
      <p className="text-zinc-600">Calculate capital gains tax for stocks, real estate, and other assets.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Asset Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Asset Type</label>
            <select 
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="stock">Stocks/ETFs</option>
              <option value="real_estate">Real Estate</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="other">Other Assets</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter purchase price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Sale Price ($)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter sale price"
            />
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
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Results</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Capital Gain/Loss</div>
            <div className={`text-2xl font-bold ${result.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${result.gain.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Holding Period</div>
            <div className="text-2xl font-bold text-blue-600">
              {result.isLongTerm ? 'Long-term' : 'Short-term'}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Tax Rate</div>
            <div className="text-2xl font-bold text-orange-600">
              {(result.taxRate * 100).toFixed(0)}%
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Tax Amount</div>
            <div className="text-2xl font-bold text-red-600">
              ${result.tax.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded col-span-2">
            <div className="text-zinc-500">Net Gain After Tax</div>
            <div className={`text-2xl font-bold ${result.netGain >= 0 ? 'text-green-600' : 'text-zinc-600'}`}>
              ${result.netGain.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Capital Gain Tax Rules</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Short-term gains</strong> (held less than 12 months): Taxed at ordinary income rates (up to 35%)</p>
          <p><strong>Long-term gains</strong> (held 12+ months): Taxed at preferential rates (0%, 15%, or 20% based on income)</p>
          <p><strong>Real estate exclusion</strong>: Primary residence may qualify for $250k/$500k exclusion</p>
          <p><strong>Crypto</strong>: Treated as property, subject to capital gains rules</p>
        </div>
      </div>
    </main>
  )
}
