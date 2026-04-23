'use client'

import { useState } from 'react'

export default function StockSplitCalculator() {
  const [currentShares, setCurrentShares] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [splitRatioA, setSplitRatioA] = useState('2')
  const [splitRatioB, setSplitRatioB] = useState('1')

  const calculate = () => {
    const shares = parseFloat(currentShares) || 0
    const price = parseFloat(currentPrice) || 0
    const ratioA = parseFloat(splitRatioA) || 1
    const ratioB = parseFloat(splitRatioB) || 1
    
    const splitMultiplier = ratioA / ratioB
    const newShares = shares * splitMultiplier
    const newPrice = price / splitMultiplier
    const totalValueBefore = shares * price
    const totalValueAfter = newShares * newPrice

    return { newShares, newPrice, totalValueBefore, totalValueAfter, splitMultiplier }
  }

  const result = calculate()

  const commonSplits = [
    { ratio: '2:1', a: 2, b: 1 },
    { ratio: '3:1', a: 3, b: 1 },
    { ratio: '4:1', a: 4, b: 1 },
    { ratio: '3:2', a: 3, b: 2 },
    { ratio: '5:4', a: 5, b: 4 },
  ]

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stock Split Calculator</h1>
      <p className="text-zinc-600">Calculate share changes after a stock split.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Position</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Shares</label>
            <input
              type="number"
              value={currentShares}
              onChange={(e) => setCurrentShares(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter number of shares"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Price ($)</label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current price"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Split Ratio (A)</label>
              <input
                type="number"
                value={splitRatioA}
                onChange={(e) => setSplitRatioA(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Split Ratio (B)</label>
              <input
                type="number"
                value={splitRatioB}
                onChange={(e) => setSplitRatioB(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., 1"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {commonSplits.map(s => (
              <button
                key={s.ratio}
                onClick={() => { setSplitRatioA(String(s.a)); setSplitRatioB(String(s.b)) }}
                className="px-3 py-1 bg-white border rounded text-xs hover:bg-zinc-100"
              >
                {s.ratio}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">After Split</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">New Shares</div>
            <div className="text-2xl font-bold text-green-600">
              {result.newShares.toFixed(0)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">New Price</div>
            <div className="text-2xl font-bold text-blue-600">
              ${result.newPrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Value Before</div>
            <div className="text-xl font-bold text-zinc-600">
              ${result.totalValueBefore.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Value After</div>
            <div className="text-xl font-bold text-zinc-600">
              ${result.totalValueAfter.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2 text-center">
          ✓ Total value remains unchanged after split
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stock Split Facts</h3>
        <div className="text-xs text-zinc-600">
          Stock splits don't change total investment value. They make shares more affordable. Reverse splits (1:2, 1:3) reduce shares, increase price. Splits may signal company confidence. No tax impact from split itself.
        </div>
      </div>
    </main>
  )
}
