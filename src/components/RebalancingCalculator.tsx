'use client'

import { useState } from 'react'

export default function RebalancingCalculator() {
  const [totalValue, setTotalValue] = useState('')
  const [currentAllocation, setCurrentAllocation] = useState({ stocks: 0, bonds: 0, cash: 0 })
  const [targetAllocation, setTargetAllocation] = useState({ stocks: 60, bonds: 30, cash: 10 })

  const handleCurrentChange = (key: string, value: string) => {
    setCurrentAllocation(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const handleTargetChange = (key: string, value: string) => {
    setTargetAllocation(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const totalValueNum = parseFloat(totalValue) || 0
  
  const currentValues = {
    stocks: totalValueNum * currentAllocation.stocks / 100,
    bonds: totalValueNum * currentAllocation.bonds / 100,
    cash: totalValueNum * currentAllocation.cash / 100,
  }

  const targetValues = {
    stocks: totalValueNum * targetAllocation.stocks / 100,
    bonds: totalValueNum * targetAllocation.bonds / 100,
    cash: totalValueNum * targetAllocation.cash / 100,
  }

  const adjustments = {
    stocks: targetValues.stocks - currentValues.stocks,
    bonds: targetValues.bonds - currentValues.bonds,
    cash: targetValues.cash - currentValues.cash,
  }

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Portfolio Rebalancing Calculator</h1>
      <p className="text-zinc-600">Calculate trades needed to rebalance your portfolio to target allocation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Portfolio Value</h3>
        <div>
          <label className="block text-sm text-zinc-600 mb-1">Total Portfolio Value ($)</label>
          <input
            type="number"
            value={totalValue}
            onChange={(e) => setTotalValue(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter total value"
          />
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Allocation (%)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-zinc-600 mb-1">Stocks</label>
            <input
              type="number"
              value={currentAllocation.stocks}
              onChange={(e) => handleCurrentChange('stocks', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 mb-1">Bonds</label>
            <input
              type="number"
              value={currentAllocation.bonds}
              onChange={(e) => handleCurrentChange('bonds', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 mb-1">Cash</label>
            <input
              type="number"
              value={currentAllocation.cash}
              onChange={(e) => handleCurrentChange('cash', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Target Allocation (%)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-zinc-600 mb-1">Stocks</label>
            <input
              type="number"
              value={targetAllocation.stocks}
              onChange={(e) => handleTargetChange('stocks', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="60"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 mb-1">Bonds</label>
            <input
              type="number"
              value={targetAllocation.bonds}
              onChange={(e) => handleTargetChange('bonds', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 mb-1">Cash</label>
            <input
              type="number"
              value={targetAllocation.cash}
              onChange={(e) => handleTargetChange('cash', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="10"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Required Adjustments</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {Object.entries(adjustments).map(([key, value]) => (
            <div key={key} className="bg-white p-3 rounded text-center">
              <div className="text-zinc-500 capitalize">{key}</div>
              <div className={`text-xl font-bold ${value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-zinc-600'}`}>
                {value > 0 ? '+' : ''}{value.toFixed(0)}
              </div>
              <div className="text-xs text-zinc-500">
                {value > 0 ? 'Buy' : value < 0 ? 'Sell' : 'Hold'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rebalancing Tips</h3>
        <div className="text-xs text-zinc-600">
          Rebalance annually or when allocation drifts 5%+ from target. Use new contributions to rebalance (no selling). Consider tax impact of selling winners. Target-date funds auto-rebalance. Threshold-based rebalancing reduces trading costs.
        </div>
      </div>
    </main>
  )
}
