'use client'

import { useState } from 'react'

export default function CashFlowAnalyzer() {
  const [income, setIncome] = useState({
    salary: 0,
    sideIncome: 0,
    investments: 0,
    other: 0,
  })
  
  const [expenses, setExpenses] = useState({
    housing: 0,
    utilities: 0,
    food: 0,
    transportation: 0,
    healthcare: 0,
    entertainment: 0,
    savings: 0,
    other: 0,
  })

  const handleIncomeChange = (key: string, value: string) => {
    setIncome(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const handleExpenseChange = (key: string, value: string) => {
    setExpenses(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0)
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0)
  const netFlow = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (expenses.savings / totalIncome) * 100 : 0
  const expenseRatio = totalIncome > 0 ? ((totalExpenses - expenses.savings) / totalIncome) * 100 : 0

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cash Flow Analyzer</h1>
      <p className="text-zinc-600">Analyze monthly income and expenses to optimize your cash flow.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Monthly Income</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            salary: 'Salary/Wages',
            sideIncome: 'Side Income',
            investments: 'Investment Income',
            other: 'Other Income',
          }).map(([key, name]) => (
            <div key={key}>
              <label className="block text-xs text-zinc-600 mb-1">{name}</label>
              <input
                type="number"
                value={income[key as keyof typeof income]}
                onChange={(e) => handleIncomeChange(key, e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="$0"
              />
            </div>
          ))}
        </div>
        <div className="bg-green-50 rounded p-3 mt-4 text-center">
          <div className="text-zinc-500">Total Income</div>
          <div className="text-xl font-bold text-green-600">${totalIncome.toFixed(0)}</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Monthly Expenses</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            housing: 'Housing',
            utilities: 'Utilities',
            food: 'Food & Groceries',
            transportation: 'Transportation',
            healthcare: 'Healthcare',
            entertainment: 'Entertainment',
            savings: 'Savings',
            other: 'Other Expenses',
          }).map(([key, name]) => (
            <div key={key}>
              <label className="block text-xs text-zinc-600 mb-1">{name}</label>
              <input
                type="number"
                value={expenses[key as keyof typeof expenses]}
                onChange={(e) => handleExpenseChange(key, e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="$0"
              />
            </div>
          ))}
        </div>
        <div className="bg-red-50 rounded p-3 mt-4 text-center">
          <div className="text-zinc-500">Total Expenses</div>
          <div className="text-xl font-bold text-red-600">${totalExpenses.toFixed(0)}</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Cash Flow Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Net Cash Flow</div>
            <div className={`text-xl font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netFlow.toFixed(0)}
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              {netFlow >= 0 ? 'Surplus' : 'Deficit'}
            </div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Savings Rate</div>
            <div className={`text-xl font-bold ${savingsRate >= 20 ? 'text-green-600' : 'text-orange-600'}`}>
              {savingsRate.toFixed(1)}%
            </div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Expense Ratio</div>
            <div className={`text-xl font-bold ${expenseRatio <= 80 ? 'text-green-600' : 'text-red-600'}`}>
              {expenseRatio.toFixed(1)}%
            </div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Status</div>
            <div className={`text-xl font-bold ${netFlow >= 0 && savingsRate >= 10 ? 'text-green-600' : 'text-orange-600'}`}>
              {netFlow >= 0 && savingsRate >= 10 ? 'Healthy' : 'Review'}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Optimization</h3>
        <div className="text-xs text-zinc-600">
          Track actual spending vs budget. Identify expense reduction opportunities. Increase income streams. Automate savings transfers. Build emergency buffer. Review monthly for adjustments. Positive cash flow enables wealth building. Negative requires immediate action.
        </div>
      </div>
    </main>
  )
}
