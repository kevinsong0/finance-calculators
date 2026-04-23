'use client'

import { useState } from 'react'

export default function OptionsProfitCalculator() {
  const [optionType, setOptionType] = useState('call')
  const [stockPrice, setStockPrice] = useState('')
  const [strikePrice, setStrikePrice] = useState('')
  const [premium, setPremium] = useState('')
  const [contracts, setContracts] = useState('')
  const [targetPrice, setTargetPrice] = useState('')

  const calculate = () => {
    const currentPrice = parseFloat(stockPrice) || 100
    const strike = parseFloat(strikePrice) || 100
    const prem = parseFloat(premium) || 5
    const numContracts = parseInt(contracts) || 1
    const target = parseFloat(targetPrice) || (optionType === 'call' ? strike + 10 : strike - 10)
    const type = optionType

    const sharesPerContract = 100
    const totalShares = numContracts * sharesPerContract
    const totalCost = prem * totalShares

    let intrinsicValue = 0
    let profitLoss = 0
    let profitPercent = 0

    if (type === 'call') {
      // Call option profit when stock price exceeds strike
      intrinsicValue = Math.max(0, target - strike)
      const perShareGain = intrinsicValue - prem
      profitLoss = perShareGain * totalShares
      profitPercent = (profitLoss / totalCost) * 100
    } else {
      // Put option profit when stock price falls below strike
      intrinsicValue = Math.max(0, strike - target)
      const perShareGain = intrinsicValue - prem
      profitLoss = perShareGain * totalShares
      profitPercent = (profitLoss / totalCost) * 100
    }

    // Calculate break-even price
    const breakEven = type === 'call' ? strike + prem : strike - prem

    // Calculate max profit and max loss
    const maxLoss = totalCost // Premium paid
    let maxProfitDisplay: string
    if (type === 'call') {
      maxProfitDisplay = 'Unlimited' // Theoretically unlimited for calls
    } else {
      maxProfitDisplay = ((strike - prem) * totalShares).toFixed(2) // Max profit when stock goes to 0
    }

    // Time value estimate (simplified)
    const timeValue = prem - intrinsicValue
    const inTheMoney = type === 'call' ? currentPrice > strike : currentPrice < strike

    return {
      intrinsicValue: intrinsicValue.toFixed(2),
      profitLoss: profitLoss.toFixed(2),
      profitPercent: profitPercent.toFixed(1),
      totalCost: totalCost.toFixed(2),
      breakEven: breakEven.toFixed(2),
      maxLoss: maxLoss.toFixed(2),
      maxProfitDisplay,
      timeValue: timeValue.toFixed(2),
      inTheMoney,
      moneyness: inTheMoney ? 'In the Money (ITM)' : currentPrice === strike ? 'At the Money (ATM)' : 'Out of the Money (OTM)',
      totalShares,
      premiumPerShare: prem.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Options Profit Calculator</h1>
      <p className="text-zinc-600">Calculate potential profit or loss for call and put options at different price targets.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Option Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Option Type</label>
            <select
              value={optionType}
              onChange={(e) => setOptionType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="call">Call Option (Bullish)</option>
              <option value="put">Put Option (Bearish)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Stock Price</label>
            <input
              type="number"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current stock price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Strike Price</label>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter strike price"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Premium per Share</label>
            <input
              type="number"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter option premium"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Contracts</label>
            <input
              type="number"
              value={contracts}
              onChange={(e) => setContracts(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter contracts (each = 100 shares)"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Price at Expiration</label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Expected stock price at expiration"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Profit Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Cost</div>
            <div className="text-2xl font-bold text-red-600">$${result.totalCost}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Profit/Loss</div>
            <div className={`text-2xl font-bold ${parseFloat(result.profitLoss) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              $${result.profitLoss}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Return %</div>
            <div className={`text-2xl font-bold ${parseFloat(result.profitPercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {result.profitPercent}%
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Break-even Price</div>
            <div className="text-2xl font-bold">$${result.breakEven}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Option Status</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Moneyness</div>
            <div className="font-bold">{result.moneyness}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Intrinsic Value</div>
            <div className="font-bold">$${result.intrinsicValue}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Time Value</div>
            <div className="font-bold">$${result.timeValue}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Max Profit</div>
            <div className="font-bold text-green-600">{result.maxProfitDisplay}</div>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Risk Warning</h3>
        <div className="text-sm text-red-600">
          Maximum loss is $${result.maxLoss} (100% of premium paid). Options can expire worthless if stock price doesn't move past break-even. Options trading involves significant risk and is not suitable for all investors.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Options Basics</h3>
        <div className="text-xs text-zinc-600">
          Call options profit when stock rises above strike + premium. Put options profit when stock falls below strike - premium. Each contract covers 100 shares. Options have expiration dates and lose time value as they approach expiration.
        </div>
      </div>
    </main>
  )
}