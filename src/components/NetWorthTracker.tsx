'use client'

import { useState } from 'react'

export default function NetWorthTracker() {
  const [assets, setAssets] = useState({
    cash: 0,
    investments: 0,
    realEstate: 0,
    vehicles: 0,
    retirement: 0,
    other: 0,
  })
  
  const [liabilities, setLiabilities] = useState({
    mortgage: 0,
    carLoan: 0,
    creditCard: 0,
    studentLoan: 0,
    otherDebt: 0,
  })

  const handleAssetChange = (key: string, value: string) => {
    setAssets(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const handleLiabilityChange = (key: string, value: string) => {
    setLiabilities(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const totalAssets = Object.values(assets).reduce((sum, val) => sum + val, 0)
  const totalLiabilities = Object.values(liabilities).reduce((sum, val) => sum + val, 0)
  const netWorth = totalAssets - totalLiabilities
  const debtRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Net Worth Tracker</h1>
      <p className="text-zinc-600">Calculate and track your net worth: assets minus liabilities.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Assets</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            cash: 'Cash & Savings',
            investments: 'Investments',
            realEstate: 'Real Estate',
            vehicles: 'Vehicles',
            retirement: 'Retirement Accounts',
            other: 'Other Assets',
          }).map(([key, name]) => (
            <div key={key}>
              <label className="block text-xs text-zinc-600 mb-1">{name}</label>
              <input
                type="number"
                value={assets[key as keyof typeof assets]}
                onChange={(e) => handleAssetChange(key, e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="$0"
              />
            </div>
          ))}
        </div>
        <div className="bg-green-50 rounded p-3 mt-4 text-center">
          <div className="text-zinc-500">Total Assets</div>
          <div className="text-2xl font-bold text-green-600">${totalAssets.toFixed(0)}</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Liabilities</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            mortgage: 'Mortgage',
            carLoan: 'Car Loan',
            creditCard: 'Credit Card Debt',
            studentLoan: 'Student Loans',
            otherDebt: 'Other Debt',
          }).map(([key, name]) => (
            <div key={key}>
              <label className="block text-xs text-zinc-600 mb-1">{name}</label>
              <input
                type="number"
                value={liabilities[key as keyof typeof liabilities]}
                onChange={(e) => handleLiabilityChange(key, e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="$0"
              />
            </div>
          ))}
        </div>
        <div className="bg-red-50 rounded p-3 mt-4 text-center">
          <div className="text-zinc-500">Total Liabilities</div>
          <div className="text-2xl font-bold text-red-600">${totalLiabilities.toFixed(0)}</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Net Worth Summary</h3>
        <div className="bg-white rounded p-4 text-center">
          <div className="text-zinc-500 mb-2">Your Net Worth</div>
          <div className={`text-4xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${netWorth.toFixed(0)}
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            {netWorth >= 0 ? 'Positive net worth' : 'Negative net worth - focus on debt reduction'}
          </div>
        </div>
        <div className="bg-white rounded p-3 mt-3 text-center">
          <div className="text-zinc-500">Debt-to-Asset Ratio</div>
          <div className={`text-xl font-bold ${debtRatio < 50 ? 'text-green-600' : 'text-orange-600'}`}>
            {debtRatio.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Net Worth Guidelines</h3>
        <div className="text-xs text-zinc-600">
          Track net worth monthly to measure progress. Positive trend = growing wealth. Debt ratio under 50% healthy. Focus on increasing assets and decreasing liabilities. Home equity counts as asset. Retirement accounts are assets. Review annually with financial plan.
        </div>
      </div>
    </main>
  )
}
