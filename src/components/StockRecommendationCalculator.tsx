'use client'

import { useState } from 'react'

export default function StockRecommendationCalculator() {
  const [buyPrice, setBuyPrice] = useState('150')
  const [currentPrice, setCurrentPrice] = useState('175')
  const [shares, setShares] = useState('100')
  const [targetGain, setTargetGain] = useState('20')
  const [sellPercentage, setSellPercentage] = useState('50')
  const [remainingShares, setRemainingShares] = useState('50')
  const [currentGain, setCurrentGain] = useState('0')
  const [priceAtGain, setPriceAtGain] = useState('180')
  const [recommendationType, setRecommendationType] = useState('tranche')

  const calculate = () => {
    const buy = parseFloat(buyPrice) || 0
    const current = parseFloat(currentPrice) || 0
    const numShares = parseFloat(shares) || 0
    const target = parseFloat(targetGain) || 0
    const sellPct = parseFloat(sellPercentage) || 0
    const remaining = parseFloat(remainingShares) || 0
    const gainAtPrice = parseFloat(currentGain) || 0
    const priceAtTarget = parseFloat(priceAtGain) || 0

    // Current position analysis
    const currentValue = current * numShares
    const purchaseCost = buy * numShares
    const unrealizedGain = currentValue - purchaseCost
    const unrealizedGainPercent = purchaseCost > 0 ? (unrealizedGain / purchaseCost) * 100 : 0

    // Partial sale analysis
    const sharesToSell = numShares * (sellPct / 100)
    const saleProceeds = sharesToSell * current
    const costOfSoldShares = sharesToSell * buy
    const realizedGain = saleProceeds - costOfSoldShares
    const realizedGainPercent = costOfSoldShares > 0 ? (realizedGain / costOfSoldShares) * 100 : 0

    // Remaining position after sale
    const remainingSharesCount = numShares - sharesToSell
    const remainingCostBasis = remainingSharesCount * buy
    const remainingValue = remainingSharesCount * current
    const remainingGain = remainingValue - remainingCostBasis
    const remainingGainPercent = remainingCostBasis > 0 ? (remainingGain / remainingCostBasis) * 100 : 0

    // Target price calculation
    const targetPrice = buy * (1 + target / 100)

    // Tranche-based recommendations (sell at specific gain levels)
    const tranches = [
      { gain: 20, sellPct: 25, reason: 'Lock in initial profits, reduce risk' },
      { gain: 50, sellPct: 25, reason: 'Second tranche: protect gains' },
      { gain: 100, sellPct: 25, reason: 'Major gains achieved, reduce position' },
      { gain: 150, sellPct: 15, reason: 'Exceptional gains, small remaining position' },
    ]

    // Find appropriate tranche recommendation
    let recommendation = 'Hold position'
    let recommendedAction = ''

    if (unrealizedGainPercent >= 150) {
      recommendation = 'Consider selling 15% of remaining position'
      recommendedAction = 'Exceptional gains - protect most of your profits'
    } else if (unrealizedGainPercent >= 100) {
      recommendation = 'Consider selling 25% of remaining position'
      recommendedAction = 'Major gains achieved - reduce position significantly'
    } else if (unrealizedGainPercent >= 50) {
      recommendation = 'Consider selling 25% of remaining position'
      recommendedAction = 'Solid gains - protect profits, maintain upside exposure'
    } else if (unrealizedGainPercent >= target) {
      recommendation = 'Consider selling 25% to lock in target gains'
      recommendedAction = 'Target reached - begin profit taking'
    } else if (unrealizedGainPercent >= 20) {
      recommendation = 'Consider selling 25% to lock in initial profits'
      recommendedAction = 'Good gains - reduce risk while maintaining exposure'
    } else if (unrealizedGainPercent < 0 && unrealizedGainPercent > -10) {
      recommendation = 'Monitor closely, consider holding'
      recommendedAction = 'Small loss - may recover, evaluate fundamentals'
    } else if (unrealizedGainPercent <= -10) {
      recommendation = 'Review position, consider tax-loss harvesting'
      recommendedAction = 'Significant loss - evaluate if better opportunities exist'
    }

    // Risk/reward ratio
    const upsideToTarget = targetPrice - current
    const downsideToBuy = current - buy
    const riskRewardRatio = upsideToTarget > 0 && downsideToBuy > 0 ?
      upsideToTarget / downsideToBuy : 0

    return {
      buyPrice: buy.toFixed(2),
      currentPrice: current.toFixed(2),
      shares: numShares.toFixed(0),
      purchaseCost: purchaseCost.toFixed(2),
      currentValue: currentValue.toFixed(2),
      unrealizedGain: unrealizedGain.toFixed(2),
      unrealizedGainPercent: unrealizedGainPercent.toFixed(2),
      targetGain: target.toFixed(0),
      targetPrice: targetPrice.toFixed(2),
      sellPercentage: sellPct.toFixed(0),
      sharesToSell: sharesToSell.toFixed(0),
      saleProceeds: saleProceeds.toFixed(2),
      realizedGain: realizedGain.toFixed(2),
      realizedGainPercent: realizedGainPercent.toFixed(2),
      remainingShares: remainingSharesCount.toFixed(0),
      remainingCostBasis: remainingCostBasis.toFixed(2),
      remainingValue: remainingValue.toFixed(2),
      remainingGain: remainingGain.toFixed(2),
      remainingGainPercent: remainingGainPercent.toFixed(2),
      recommendation,
      recommendedAction,
      riskRewardRatio: riskRewardRatio.toFixed(2),
      upsideToTarget: upsideToTarget.toFixed(2),
      downsideToBuy: downsideToBuy.toFixed(2),
      isProfit: unrealizedGain >= 0,
      hitTarget: unrealizedGainPercent >= target,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stock Position Recommendation Calculator</h1>
      <p className="text-zinc-600">Analyze your stock position and get sell recommendations based on gain levels. Calculate partial sales, remaining cost basis, and risk/reward ratios for informed decision-making.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Position</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Buy Price ($)</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Price ($)</label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Shares</label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="input"
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Target & Strategy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Gain (%)</label>
            <input
              type="number"
              value={targetGain}
              onChange={(e) => setTargetGain(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Potential Sale Percentage (%)</label>
            <input
              type="number"
              value={sellPercentage}
              onChange={(e) => setSellPercentage(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      <div className={`card ${result.isProfit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isProfit ? 'text-green-700' : 'text-red-700'}`}>
          Current Position Status
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Purchase Cost:</span>
            <span className="font-medium ml-2">${result.purchaseCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current Value:</span>
            <span className="font-medium ml-2">${result.currentValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Unrealized Gain:</span>
            <span className={`font-bold ml-2 ${result.isProfit ? 'text-green-800' : 'text-red-800'}`}>
              ${result.unrealizedGain} ({result.unrealizedGainPercent}%)
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Target Price:</span>
            <span className="font-medium ml-2">${result.targetPrice}</span>
          </div>
        </div>
      </div>

      {result.hitTarget && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Target Achieved!</h3>
          <div className="text-sm text-blue-600">
            Your position has reached your {result.targetGain}% target gain. Consider reviewing your sell strategy.
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Partial Sale Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Shares to Sell:</span>
            <span className="font-medium ml-2">{result.sharesToSell} ({result.sellPercentage}%)</span>
          </div>
          <div>
            <span className="text-zinc-600">Sale Proceeds:</span>
            <span className="font-medium ml-2">${result.saleProceeds}</span>
          </div>
          <div>
            <span className="text-zinc-600">Realized Gain:</span>
            <span className="font-bold ml-2">${result.realizedGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Gain on Sold:</span>
            <span className="font-medium ml-2">{result.realizedGainPercent}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Remaining Position After Sale</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Remaining Shares:</span>
            <span className="font-medium ml-2">{result.remainingShares}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Cost Basis:</span>
            <span className="font-medium ml-2">${result.remainingCostBasis}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Value:</span>
            <span className="font-medium ml-2">${result.remainingValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Gain:</span>
            <span className="font-bold ml-2">${result.remainingGain}</span>
          </div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Risk/Reward Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Upside to Target:</span>
            <span className="font-medium ml-2">${result.upsideToTarget}</span>
          </div>
          <div>
            <span className="text-zinc-600">Downside to Buy:</span>
            <span className="font-medium ml-2">${result.downsideToBuy}</span>
          </div>
          <div>
            <span className="text-zinc-600">Risk/Reward Ratio:</span>
            <span className="font-bold ml-2">{result.riskRewardRatio}</span>
          </div>
        </div>
        <div className="text-xs text-teal-600 mt-2">
          Higher ratio = better potential reward relative to risk. Ratio above 1.0 means upside exceeds downside to target.
        </div>
      </div>

      <div className={`card ${result.isProfit ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isProfit ? 'text-green-700' : 'text-yellow-700'}`}>
          Recommendation
        </h3>
        <div className="text-lg font-bold mb-2">{result.recommendation}</div>
        <div className="text-sm">{result.recommendedAction}</div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tranche-Based Selling Strategy</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Gain 20%:</strong> Sell 25%. Lock in initial profits, reduce overall risk exposure.</li>
          <li><strong>Gain 50%:</strong> Sell 25%. Protect substantial gains while maintaining upside potential.</li>
          <li><strong>Gain 100%:</strong> Sell 25%. Major gains achieved, significantly reduce position.</li>
          <li><strong>Gain 150%+</strong> Sell 15% of remaining. Exceptional gains, keep small position for long-term.</li>
          <li><strong>Rationale:</strong> Selling in tranches balances profit protection with continued upside exposure.</li>
          <li><strong>Tax Consideration:</strong> Long-term holdings (over 1 year) qualify for lower capital gains rates (15-20%).</li>
          <li><strong>Loss Strategy:</strong> If down 10%+, consider tax-loss harvesting to offset other gains.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Position Management Best Practices</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Set Targets:</strong> Define target gains before entering positions. Adjust based on fundamentals.</li>
          <li><strong>Stop Losses:</strong> Consider setting stop-loss levels (e.g., -7-8%) to protect against large losses.</li>
          <li><strong>Position Size:</strong> Limit individual positions to 5-10% of portfolio to manage risk.</li>
          <li><strong>Diversify:</strong> Avoid concentration in single stocks or sectors.</li>
          <li><strong>Review Quarterly:</strong> Reassess positions based on company performance, market conditions.</li>
          <li><strong>Fundamentals:</strong> Recommendations are mathematical. Always consider company fundamentals.</li>
        </ul>
      </div>
    </main>
  )
}