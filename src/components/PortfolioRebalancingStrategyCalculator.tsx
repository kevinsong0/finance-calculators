'use client'

import { useState } from 'react'

export default function PortfolioRebalancingStrategyCalculator() {
  const [portfolioValue, setPortfolioValue] = useState(500000)
  const [targetStocksPercent, setTargetStocksPercent] = useState(60)
  const [targetBondsPercent, setTargetBondsPercent] = useState(30)
  const [targetReitsPercent, setTargetReitsPercent] = useState(5)
  const [targetCashPercent, setTargetCashPercent] = useState(5)
  const [currentStocksValue, setCurrentStocksValue] = useState(320000)
  const [currentBondsValue, setCurrentBondsValue] = useState(140000)
  const [currentReitsValue, setCurrentReitsValue] = useState(25000)
  const [currentCashValue, setCurrentCashValue] = useState(35000)
  const [rebalanceThreshold, setRebalanceThreshold] = useState(5)
  const [taxRate, setTaxRate] = useState(22)

  const calculate = () => {
    const totalCurrent = currentStocksValue + currentBondsValue + currentReitsValue + currentCashValue

    // Current percentages
    const currentStocksPercent = (currentStocksValue / totalCurrent) * 100
    const currentBondsPercent = (currentBondsValue / totalCurrent) * 100
    const currentReitsPercent = (currentReitsValue / totalCurrent) * 100
    const currentCashPercent = (currentCashValue / totalCurrent) * 100

    // Target values
    const targetStocksValue = totalCurrent * targetStocksPercent / 100
    const targetBondsValue = totalCurrent * targetBondsPercent / 100
    const targetReitsValue = totalCurrent * targetReitsPercent / 100
    const targetCashValue = totalCurrent * targetCashPercent / 100

    // Drift from target
    const stocksDrift = currentStocksPercent - targetStocksPercent
    const bondsDrift = currentBondsPercent - targetBondsPercent
    const reitsDrift = currentReitsPercent - targetReitsPercent
    const cashDrift = currentCashPercent - targetCashPercent

    // Rebalancing needed?
    const needsRebalance = Math.abs(stocksDrift) > rebalanceThreshold ||
                           Math.abs(bondsDrift) > rebalanceThreshold ||
                           Math.abs(reitsDrift) > rebalanceThreshold ||
                           Math.abs(cashDrift) > rebalanceThreshold

    // Trades required
    const stocksTrade = targetStocksValue - currentStocksValue
    const bondsTrade = targetBondsValue - currentBondsValue
    const reitsTrade = targetReitsValue - currentReitsValue
    const cashTrade = targetCashValue - currentCashValue

    // Tax implications (simplified - assume gains in stocks to sell)
    const stocksToSell = stocksTrade < 0 ? Math.abs(stocksTrade) : 0
    const assumedGainRatio = 0.4 // 40% of stock value is gains
    const taxableGain = stocksToSell * assumedGainRatio
    const taxCost = taxableGain * taxRate / 100

    // After-tax rebalancing cost
    const rebalancingCost = taxCost

    // Alternative: use new contributions to rebalance
    const annualContribution = 20000 // estimate
    const contributionsToRebalance = needsRebalance ? Math.abs(stocksTrade) / annualContribution : 0

    // Drift score (sum of absolute deviations)
    const driftScore = Math.abs(stocksDrift) + Math.abs(bondsDrift) + Math.abs(reitsDrift) + Math.abs(cashDrift)

    return {
      portfolioValue: portfolioValue.toFixed(0),
      totalCurrent: totalCurrent.toFixed(0),
      targetStocksPercent: targetStocksPercent.toFixed(0),
      targetBondsPercent: targetBondsPercent.toFixed(0),
      targetReitsPercent: targetReitsPercent.toFixed(0),
      targetCashPercent: targetCashPercent.toFixed(0),
      currentStocksPercent: currentStocksPercent.toFixed(1),
      currentBondsPercent: currentBondsPercent.toFixed(1),
      currentReitsPercent: currentReitsPercent.toFixed(1),
      currentCashPercent: currentCashPercent.toFixed(1),
      currentStocksValue: currentStocksValue.toFixed(0),
      currentBondsValue: currentBondsValue.toFixed(0),
      currentReitsValue: currentReitsValue.toFixed(0),
      currentCashValue: currentCashValue.toFixed(0),
      targetStocksValue: targetStocksValue.toFixed(0),
      targetBondsValue: targetBondsValue.toFixed(0),
      targetReitsValue: targetReitsValue.toFixed(0),
      targetCashValue: targetCashValue.toFixed(0),
      stocksDrift: stocksDrift.toFixed(1),
      bondsDrift: bondsDrift.toFixed(1),
      reitsDrift: reitsDrift.toFixed(1),
      cashDrift: cashDrift.toFixed(1),
      needsRebalance,
      rebalanceThreshold: rebalanceThreshold.toFixed(0),
      stocksTrade: stocksTrade.toFixed(0),
      bondsTrade: bondsTrade.toFixed(0),
      reitsTrade: reitsTrade.toFixed(0),
      cashTrade: cashTrade.toFixed(0),
      stocksToSell: stocksToSell.toFixed(0),
      taxableGain: taxableGain.toFixed(0),
      taxRate: taxRate.toFixed(0),
      rebalancingCost: rebalancingCost.toFixed(0),
      contributionsToRebalance: contributionsToRebalance.toFixed(1),
      driftScore: driftScore.toFixed(1),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Portfolio Rebalancing Strategy Calculator</h1>
      <p className="text-gray-600 mb-4">Analyze portfolio drift and calculate optimal rebalancing trades.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Target Stocks %</label>
          <input type="number" value={targetStocksPercent} min="0" max="100" onChange={(e) => setTargetStocksPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Bonds %</label>
          <input type="number" value={targetBondsPercent} min="0" max="100" onChange={(e) => setTargetBondsPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target REITs %</label>
          <input type="number" value={targetReitsPercent} min="0" max="100" onChange={(e) => setTargetReitsPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Cash %</label>
          <input type="number" value={targetCashPercent} min="0" max="100" onChange={(e) => setTargetCashPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Stocks Value ($)</label>
          <input type="number" value={currentStocksValue} onChange={(e) => setCurrentStocksValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Bonds Value ($)</label>
          <input type="number" value={currentBondsValue} onChange={(e) => setCurrentBondsValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rebalance Threshold (%)</label>
          <input type="number" value={rebalanceThreshold} min="1" max="20" onChange={(e) => setRebalanceThreshold(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capital Gains Tax Rate (%)</label>
          <input type="number" value={taxRate} min="0" max="40" onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Current vs Target Allocation</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xs text-zinc-600">Stocks</div>
            <div><span className="text-zinc-600">Current:</span><span className="font-medium ml-1">{result.currentStocksPercent}%</span></div>
            <div><span className="text-zinc-600">Target:</span><span className="font-bold text-blue-700 ml-1">{result.targetStocksPercent}%</span></div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-600">Bonds</div>
            <div><span className="text-zinc-600">Current:</span><span className="font-medium ml-1">{result.currentBondsPercent}%</span></div>
            <div><span className="text-zinc-600">Target:</span><span className="font-bold text-blue-700 ml-1">{result.targetBondsPercent}%</span></div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-600">REITs</div>
            <div><span className="text-zinc-600">Current:</span><span className="font-medium ml-1">{result.currentReitsPercent}%</span></div>
            <div><span className="text-zinc-600">Target:</span><span className="font-bold text-blue-700 ml-1">{result.targetReitsPercent}%</span></div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-600">Cash</div>
            <div><span className="text-zinc-600">Current:</span><span className="font-medium ml-1">{result.currentCashPercent}%</span></div>
            <div><span className="text-zinc-600">Target:</span><span className="font-bold text-blue-700 ml-1">{result.targetCashPercent}%</span></div>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Drift Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Stocks Drift:</span><span className={`font-bold ml-2 ${Number(result.stocksDrift) > Number(result.rebalanceThreshold) ? 'text-red-700' : 'text-green-700'}`}>{result.stocksDrift}%</span></div>
          <div><span className="text-zinc-600">Bonds Drift:</span><span className={`font-bold ml-2 ${Math.abs(Number(result.bondsDrift)) > Number(result.rebalanceThreshold) ? 'text-red-700' : 'text-green-700'}`}>{result.bondsDrift}%</span></div>
          <div><span className="text-zinc-600">Drift Score:</span><span className="font-bold text-orange-700 ml-2">{result.driftScore}%</span></div>
          <div><span className="text-zinc-600">Threshold:</span><span className="font-medium ml-2">{result.rebalanceThreshold}%</span></div>
        </div>
        <div className={`mt-2 text-sm font-bold ${result.needsRebalance ? 'text-red-700' : 'text-green-700'}`}>
          {result.needsRebalance ? '⚠️ Rebalancing recommended - drift exceeds threshold' : '✓ Portfolio within tolerance - no rebalancing needed'}
        </div>
      </div>

      {result.needsRebalance && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Required Trades</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><span className="text-zinc-600">Stocks:</span><span className={`font-bold ml-2 ${Number(result.stocksTrade) < 0 ? 'text-red-700' : 'text-green-700'}`}>{Number(result.stocksTrade) < 0 ? 'Sell' : 'Buy'} $ {Math.abs(Number(result.stocksTrade))}</span></div>
            <div><span className="text-zinc-600">Bonds:</span><span className={`font-bold ml-2 ${Number(result.bondsTrade) < 0 ? 'text-red-700' : 'text-green-700'}`}>{Number(result.bondsTrade) < 0 ? 'Sell' : 'Buy'} $ {Math.abs(Number(result.bondsTrade))}</span></div>
          </div>
        </div>
      )}

      {result.needsRebalance && Number(result.stocksToSell) > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Tax Impact Analysis</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Stocks to Sell:</span><span className="font-medium ml-2">$ {result.stocksToSell}</span></div>
            <div><span className="text-zinc-600">Estimated Gain:</span><span className="font-medium ml-2">$ {result.taxableGain}</span></div>
            <div><span className="text-zinc-600">Tax Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.rebalancingCost}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Assumes 40% of stock value is taxable gains. Actual depends on cost basis.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Rebalancing Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Threshold-based: rebalance when drift exceeds 5% (or set threshold)</li>
          <li>Time-based: rebalance quarterly or annually regardless of drift</li>
          <li>Tax-aware: use new contributions to rebalance, avoid selling</li>
          <li>Band-based: tolerance bands around target (e.g., 60% ±5%)</li>
          <li>Consider tax-loss harvesting to offset rebalancing gains</li>
          <li>In tax-advantaged accounts, rebalancing has no tax cost</li>
        </ul>
      </div>
    </div>
  )
}