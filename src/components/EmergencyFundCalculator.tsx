'use client'

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EmergencyFundCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [targetMonths, setTargetMonths] = useState(6);

  const result = useMemo(() => {
    const targetAmount = monthlyExpenses * targetMonths;
    const shortfall = Math.max(0, targetAmount - currentSavings);
    const monthsToReach = shortfall > 0 ? Math.ceil(shortfall / monthlyContribution) : 0;
    const percentageComplete = Math.min(100, (currentSavings / targetAmount) * 100);

    // Generate savings trajectory
    const trajectory = [];
    for (let i = 0; i <= Math.min(24, monthsToReach + 3); i++) {
      const saved = currentSavings + monthlyContribution * i;
      trajectory.push({
        month: i,
        amount: Math.min(saved, targetAmount),
        target: targetAmount
      });
    }

    return {
      targetAmount,
      shortfall,
      monthsToReach,
      percentageComplete,
      trajectory
    };
  }, [monthlyExpenses, targetMonths, currentSavings, monthlyContribution]);

  const formatMoney = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const milestoneColors = [
    { months: 3, label: 'Minimum', color: '#f59e0b', amount: monthlyExpenses * 3 },
    { months: 6, label: 'Standard', color: '#3b82f6', amount: monthlyExpenses * 6 },
    { months: 9, label: 'Strong', color: '#10b981', amount: monthlyExpenses * 9 },
    { months: 12, label: 'Robust', color: '#6366f1', amount: monthlyExpenses * 12 },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Emergency Fund Calculator</h1>
      <p className="text-zinc-600">Plan how much to save and how long it takes to build your emergency fund.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Monthly Income ($)</label>
            <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Monthly Expenses ($)</label>
            <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Current Savings ($)</label>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Monthly Contribution ($)</label>
            <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Target Coverage (Months)</label>
          <div className="flex gap-2">
            {[3, 6, 9, 12].map((m) => (
              <button
                key={m}
                onClick={() => setTargetMonths(m)}
                className={`px-4 py-2 rounded ${targetMonths === m ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {m} months
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.trajectory}>
              <XAxis dataKey="month" tickFormatter={(v) => `${v}mo`} />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => formatMoney(v)} labelFormatter={(l) => `Month ${l}`} />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Saved" />
              <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-blue-50">
          <div className="text-sm text-zinc-600 mb-1">Target Emergency Fund</div>
          <div className="text-2xl font-bold text-blue-600">{formatMoney(result.targetAmount)}</div>
          <div className="text-xs text-zinc-500">{targetMonths} months of expenses</div>
        </div>

        <div className="card bg-green-50">
          <div className="text-sm text-zinc-600 mb-1">Progress</div>
          <div className="text-2xl font-bold text-green-600">{result.percentageComplete.toFixed(1)}%</div>
          <div className="text-xs text-zinc-500">{formatMoney(currentSavings)} saved</div>
        </div>

        {result.shortfall > 0 && (
          <div className="card bg-orange-50">
            <div className="text-sm text-zinc-600 mb-1">Shortfall</div>
            <div className="text-2xl font-bold text-orange-600">{formatMoney(result.shortfall)}</div>
            <div className="text-xs text-zinc-500">Amount still needed</div>
          </div>
        )}

        {result.monthsToReach > 0 && (
          <div className="card bg-purple-50">
            <div className="text-sm text-zinc-600 mb-1">Time to Reach Goal</div>
            <div className="text-2xl font-bold text-purple-600">{result.monthsToReach} months</div>
            <div className="text-xs text-zinc-500">At {formatMoney(monthlyContribution)}/month</div>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="font-medium mb-3">Emergency Fund Milestones</h3>
        <div className="space-y-2">
          {milestoneColors.map((m) => (
            <div key={m.months} className={`flex items-center justify-between p-3 rounded-lg`} style={{ backgroundColor: `${m.color}15` }}>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: m.color }}></div>
                <span className="font-medium">{m.label} ({m.months} months)</span>
              </div>
              <span className="text-lg" style={{ color: m.color }}>{formatMoney(m.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Why Emergency Funds Matter</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Job Loss:</span> Provides income buffer
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Medical:</span> Covers unexpected bills
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Car/Home:</span> Handles repairs
          </div>
        </div>
      </div>
    </main>
  );
}