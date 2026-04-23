'use client'

import { useState } from 'react'

export default function BudgetAllocator() {
  const [totalBudget, setTotalBudget] = useState('')
  const [allocations, setAllocations] = useState({
    housing: 30,
    food: 15,
    transportation: 10,
    savings: 20,
    entertainment: 5,
    utilities: 5,
    healthcare: 5,
    other: 10,
  })

  const handleAllocationChange = (key: string, value: string) => {
    setAllocations(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const totalPercent = Object.values(allocations).reduce((sum, val) => sum + val, 0)
  const budgetNum = parseFloat(totalBudget) || 0

  const categories = [
    { key: 'housing', name: 'Housing', icon: '🏠', color: 'bg-blue-500' },
    { key: 'food', name: 'Food & Groceries', icon: '🛒', color: 'bg-green-500' },
    { key: 'transportation', name: 'Transportation', icon: '🚗', color: 'bg-orange-500' },
    { key: 'savings', name: 'Savings', icon: '💰', color: 'bg-purple-500' },
    { key: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'bg-pink-500' },
    { key: 'utilities', name: 'Utilities', icon: '💡', color: 'bg-yellow-500' },
    { key: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'bg-red-500' },
    { key: 'other', name: 'Other', icon: '📦', color: 'bg-zinc-500' },
  ]

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Budget Allocator</h1>
      <p className="text-zinc-600">Allocate your budget across categories with visual breakdown.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Total Budget</h3>
        <div>
          <label className="block text-sm text-zinc-600 mb-1">Monthly Budget ($)</label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your monthly budget"
          />
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Category Allocation (%)</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <div key={cat.key} className="bg-white rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="text-sm">{cat.name}</span>
                </span>
                <input
                  type="number"
                  value={allocations[cat.key as keyof typeof allocations]}
                  onChange={(e) => handleAllocationChange(cat.key, e.target.value)}
                  className="w-16 p-1 border rounded text-sm text-right"
                />
              </div>
              <div className="w-full bg-zinc-200 rounded h-2">
                <div 
                  className={`${cat.color} h-2 rounded`}
                  style={{ width: `${Math.min(100, allocations[cat.key as keyof typeof allocations])}%` }}
                />
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                ${(budgetNum * allocations[cat.key as keyof typeof allocations] / 100).toFixed(0)}/mo
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Budget Summary</h3>
        <div className="bg-white rounded p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Total Allocated</span>
            <span className={`font-bold ${totalPercent === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPercent}%
            </span>
          </div>
          {totalPercent !== 100 && (
            <div className={`text-xs ${totalPercent > 100 ? 'text-red-600' : 'text-blue-600'}`}>
              {totalPercent > 100 ? `Over budget by ${totalPercent - 100}%` : `${100 - totalPercent}% unallocated`}
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <span className="text-zinc-500">Total Monthly</span>
            <span className="text-xl font-bold">${(budgetNum * totalPercent / 100).toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Guidelines</h3>
        <div className="text-xs text-zinc-600">
          50/30/20 rule: 50% needs, 30% wants, 20% savings. Housing should stay under 30% of income. Savings rate ideally 15-20%. Track actual spending against budget. Review and adjust monthly. Build emergency fund (3-6 months) before other goals.
        </div>
      </div>
    </main>
  )
}
