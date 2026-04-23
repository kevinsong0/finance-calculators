'use client'

import { useState } from 'react'

export default function SavingsGoalTracker() {
  const [goalName, setGoalName] = useState('Emergency Fund')
  const [targetAmount, setTargetAmount] = useState('')
  const [currentAmount, setCurrentAmount] = useState('')
  const [monthlySaving, setMonthlySaving] = useState('')
  const [targetDate, setTargetDate] = useState('')

  const calculate = () => {
    const target = parseFloat(targetAmount) || 0
    const current = parseFloat(currentAmount) || 0
    const monthly = parseFloat(monthlySaving) || 0
    const remaining = target - current
    const progress = target > 0 ? (current / target) * 100 : 0
    
    let monthsNeeded = 0
    if (monthly > 0 && remaining > 0) {
      monthsNeeded = Math.ceil(remaining / monthly)
    }
    
    const targetDateObj = targetDate ? new Date(targetDate) : null
    const today = new Date()
    let monthsToTarget = 0
    if (targetDateObj) {
      monthsToTarget = Math.max(0, (targetDateObj.getFullYear() - today.getFullYear()) * 12 + targetDateObj.getMonth() - today.getMonth())
    }
    
    const requiredMonthly = monthsToTarget > 0 && remaining > 0 ? remaining / monthsToTarget : monthly
    const onTrack = monthly >= requiredMonthly

    return { 
      remaining, 
      progress, 
      monthsNeeded, 
      monthsToTarget, 
      requiredMonthly, 
      onTrack,
      milestone25: target * 0.25,
      milestone50: target * 0.5,
      milestone75: target * 0.75,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Savings Goal Tracker</h1>
      <p className="text-zinc-600">Track progress toward your savings goals with milestone checkpoints.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Goal Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Goal Name</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="What are you saving for?"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Amount ($)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Your savings goal"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Amount ($)</label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="What you've saved so far"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Saving ($)</label>
            <input
              type="number"
              value={monthlySaving}
              onChange={(e) => setMonthlySaving(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Amount you save each month"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">{goalName} Progress</h3>
        <div className="bg-white rounded p-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-purple-600">{result.progress.toFixed(1)}%</div>
            <div className="text-zinc-500">of goal reached</div>
          </div>
          <div className="w-full bg-zinc-200 rounded-full h-6 mb-2">
            <div 
              className="bg-purple-500 h-6 rounded-full transition-all"
              style={{ width: `${Math.min(100, result.progress)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span>$0</span>
            <span>${(result.milestone25/1000).toFixed(0)}k</span>
            <span>${(result.milestone50/1000).toFixed(0)}k</span>
            <span>${(result.milestone75/1000).toFixed(0)}k</span>
            <span>${(parseFloat(targetAmount)/1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Goal Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Remaining</div>
            <div className="text-xl font-bold text-blue-600">${result.remaining.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Months Needed</div>
            <div className="text-xl font-bold text-green-600">{result.monthsNeeded}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Required Monthly</div>
            <div className="text-xl font-bold text-orange-600">${result.requiredMonthly.toFixed(0)}</div>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <div className="text-zinc-500">Status</div>
            <div className={`text-xl font-bold ${result.onTrack ? 'text-green-600' : 'text-red-600'}`}>
              {result.onTrack ? 'On Track' : 'Behind'}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Goal Milestones</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-2 flex justify-between">
            <span>25% Milestone</span>
            <span className="font-medium">${result.milestone25.toFixed(0)}</span>
          </div>
          <div className="bg-white rounded p-2 flex justify-between">
            <span>50% Milestone</span>
            <span className="font-medium">${result.milestone50.toFixed(0)}</span>
          </div>
          <div className="bg-white rounded p-2 flex justify-between">
            <span>75% Milestone</span>
            <span className="font-medium">${result.milestone75.toFixed(0)}</span>
          </div>
          <div className="bg-white rounded p-2 flex justify-between">
            <span>100% Goal</span>
            <span className="font-bold text-purple-600">${parseFloat(targetAmount).toFixed(0)}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
