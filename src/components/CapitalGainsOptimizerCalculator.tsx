'use client'

import { useState } from 'react'

export default function CapitalGainsOptimizerCalculator() {
  const [currentGains, setCurrentGains] = useState('50000')
  const [currentLosses, setCurrentLosses] = useState('10000')
  const [ordinaryIncome, setOrdinaryIncome] = useState('80000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [hasLossPositions, setHasLossPositions] = useState('15000')
  const [holdingPeriod, setHoldingPeriod] = useState('mixed')
  const [optimizationGoal, setOptimizationGoal] = useState('minimizeTax')

  const capitalGainsThresholds: Record<string, { zero: number; fifteen: number }> = {
    single: { zero: 47025, fifteen: 518900 },
    married: { zero: 94050, fifteen: 583750 },
  }

  const calculate = () => {
    const gains = parseFloat(currentGains) || 0
    const losses = parseFloat(currentLosses) || 0
    const income = parseFloat(ordinaryIncome) || 0
    const harvestableLosses = parseFloat(hasLossPositions) || 0
    const thresholds = capitalGainsThresholds[filingStatus]

    // Net capital gains after existing losses
    const netGains = Math.max(0, gains - losses)
    const netLosses = Math.max(0, losses - gains)

    // Tax bracket determination
    const totalIncome = income + netGains
    let longTermRate = 0.15
    if (totalIncome <= thresholds.zero) {
      longTermRate = 0.00
    } else if (totalIncome > thresholds.fifteen) {
      longTermRate = 0.20
    }

    // Optimization scenarios
    // Scenario 1: Harvest all losses
    const harvestAllLoss = harvestableLosses
    const gainsAfterHarvest = Math.max(0, netGains - harvestAllLoss)
    const ordinaryOffset1 = Math.min(Math.max(0, harvestAllLoss - gains), 3000)
    const taxSavings1 = (harvestAllLoss > gains ? harvestAllLoss - gains : 0) * longTermRate +
                        Math.min(harvestAllLoss, gains) * longTermRate +
                        ordinaryOffset1 * 0.22

    // Scenario 2: Harvest only to 0% bracket threshold
    const targetGains = Math.max(0, thresholds.zero - income)
    const harvestToZeroRate = Math.max(0, netGains - targetGains)
    const optimalHarvest = Math.min(harvestToZeroRate, harvestableLosses)
    const taxSavings2 = optimalHarvest * longTermRate

    // Scenario 3: Harvest to eliminate short-term gains (if mixed)
    const stGains = holdingPeriod === 'mixed' || holdingPeriod === 'short' ? gains * 0.4 : 0
    const ltGains = holdingPeriod === 'mixed' || holdingPeriod === 'long' ? gains * 0.6 : gains
    const harvestForST = Math.min(stGains, harvestableLosses)
    const taxSavings3 = harvestForST * 0.32 // Short-term taxed at ordinary rate

    // Optimal strategy recommendation
    const strategies = [
      { name: 'Harvest All Losses', savings: taxSavings1, harvest: harvestAllLoss },
      { name: 'Harvest to 0% Bracket', savings: taxSavings2, harvest: optimalHarvest },
      { name: 'Target Short-term Gains', savings: taxSavings3, harvest: harvestForST },
    ]

    const bestStrategy = strategies.reduce((a, b) => a.savings > b.savings ? a : b)

    // Calculate current tax vs optimized tax
    const currentTax = netGains * longTermRate + (holdingPeriod === 'mixed' ? stGains * 0.32 : 0)
    const optimizedTax = Math.max(0, currentTax - bestStrategy.savings)

    // Carryover analysis
    const remainingLosses = harvestableLosses - bestStrategy.harvest
    const futureCarryover = remainingLosses > 0 ? remainingLosses : 0

    // Income bracket shift analysis
    const bracketShifts = {
      canReachZeroRate: totalIncome - bestStrategy.harvest <= thresholds.zero,
      avoidsTwentyRate: totalIncome <= thresholds.fifteen && totalIncome - bestStrategy.harvest <= thresholds.fifteen,
    }

    return {
      currentGains: gains.toFixed(2),
      currentLosses: losses.toFixed(2),
      netGains: netGains.toFixed(2),
      netLosses: netLosses.toFixed(2),
      ordinaryIncome: income.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      longTermRate: (longTermRate * 100).toFixed(0),
      harvestableLosses: harvestableLosses.toFixed(2),
      currentTax: currentTax.toFixed(2),
      optimizedTax: optimizedTax.toFixed(2),
      taxSavings: bestStrategy.savings.toFixed(2),
      optimalHarvest: bestStrategy.harvest.toFixed(2),
      bestStrategy: bestStrategy.name,
      remainingLosses: remainingLosses.toFixed(2),
      futureCarryover: futureCarryover.toFixed(2),
      zeroThreshold: thresholds.zero,
      fifteenThreshold: thresholds.fifteen,
      canReachZeroRate: bracketShifts.canReachZeroRate,
      avoidsTwentyRate: bracketShifts.avoidsTwentyRate,
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Capital Gains Tax Optimizer Calculator</h1>
      <p className="text-zinc-600">Optimize your capital gains tax strategy through loss harvesting, bracket optimization, and timing decisions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Position</h3>
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
            <label className="block text-sm text-zinc-600 mb-1">Realized Capital Gains ($)</label>
            <input
              type="number"
              value={currentGains}
              onChange={(e) => setCurrentGains(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Realized Capital Losses ($)</label>
            <input
              type="number"
              value={currentLosses}
              onChange={(e) => setCurrentLosses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Ordinary Income (W-2, etc.) ($)</label>
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

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Harvesting Opportunities</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Available Unrealized Loss Positions ($)</label>
            <input
              type="number"
              value={hasLossPositions}
              onChange={(e) => setHasLossPositions(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period Mix</label>
            <select
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="input"
            >
              <option value="long">All Long-term (over 1 year)</option>
              <option value="short">All Short-term (under 1 year)</option>
              <option value="mixed">Mixed (estimate 60% LT, 40% ST)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Income & Bracket Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Ordinary Income:</span>
            <span className="font-medium ml-2">${result.ordinaryIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Capital Gains:</span>
            <span className="font-medium ml-2">${result.netGains}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Income:</span>
            <span className="font-medium ml-2">${result.totalIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Long-term Rate:</span>
            <span className="font-medium ml-2">{result.longTermRate}%</span>
          </div>
        </div>
        <div className="text-xs text-blue-600 mt-3">
          0% bracket threshold: ${result.zeroThreshold} | 15% bracket up to: ${result.fifteenThreshold}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Current Tax Liability</h3>
        <div className="text-2xl font-bold text-orange-800">${result.currentTax}</div>
        <div className="text-sm text-orange-600 mt-1">
          Based on {result.longTermRate}% long-term capital gains rate
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Optimized Tax Strategy</h3>
        <div className="text-xl font-bold text-green-800">Best Strategy: {result.bestStrategy}</div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <span className="text-zinc-600">Tax Savings:</span>
            <span className="font-bold text-green-700 ml-2">${result.taxSavings}</span>
          </div>
          <div>
            <span className="text-zinc-600">Optimized Tax:</span>
            <span className="font-medium ml-2">${result.optimizedTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Harvest Amount:</span>
            <span className="font-medium ml-2">${result.optimalHarvest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Losses:</span>
            <span className="font-medium ml-2">${result.remainingLosses}</span>
          </div>
        </div>
      </div>

      {result.canReachZeroRate && (
        <div className="card bg-emerald-50 border border-emerald-200">
          <h3 className="font-medium mb-2 text-emerald-700">Zero-Rate Bracket Opportunity</h3>
          <div className="text-sm text-emerald-600">
            Harvesting ${result.optimalHarvest} can potentially push your total income below the ${result.zeroThreshold} threshold, qualifying for 0% long-term capital gains rate.
          </div>
        </div>
      )}

      {parseFloat(result.futureCarryover) > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Loss Carryover for Future Years</h3>
          <div className="text-sm text-zinc-600">
            ${result.futureCarryover} will carry forward to offset future gains and up to $3,000 ordinary income annually.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Optimization Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Harvest losses to offset gains: First offset same-type gains, then cross-type, then $3,000 ordinary.</li>
          <li>Bracket optimization: Harvest enough losses to drop into 0% bracket if possible.</li>
          <li>Short-term priority: Offset high-rate short-term gains first (taxed at ordinary rates up to 37%).</li>
          <li>Timing: Hold winners over 1 year for long-term rates (0%, 15%, 20% vs ordinary rates).</li>
          <li>Wash sale rule: Wait 31 days before repurchasing to preserve loss deduction.</li>
          <li>Income stacking: Long-term gains stack on top of ordinary income for bracket determination.</li>
        </ul>
      </div>
    </main>
  )
}