'use client'

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function BudgetPlannerCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [customNeeds, setCustomNeeds] = useState<number | null>(null);
  const [customWants, setCustomWants] = useState<number | null>(null);
  const [customSavings, setCustomSavings] = useState<number | null>(null);

  const result = useMemo(() => {
    const needs = customNeeds ?? monthlyIncome * 0.5;
    const wants = customWants ?? monthlyIncome * 0.3;
    const savings = customSavings ?? monthlyIncome * 0.2;
    return { needs, wants, savings };
  }, [monthlyIncome, customNeeds, customWants, customSavings]);

  const chartData = useMemo(() => [
    { name: 'Needs (50%)', value: result.needs, color: '#3b82f6' },
    { name: 'Wants (30%)', value: result.wants, color: '#f59e0b' },
    { name: 'Savings (20%)', value: result.savings, color: '#10b981' },
  ], [result]);

  const formatMoney = (n: number) => `$${n.toFixed(2)}`;

  const needsExamples = [
    { item: 'Housing/Rent', percent: 25, amount: monthlyIncome * 0.25 },
    { item: 'Utilities', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Groceries', percent: 10, amount: monthlyIncome * 0.10 },
    { item: 'Transportation', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Insurance', percent: 5, amount: monthlyIncome * 0.05 },
  ];

  const wantsExamples = [
    { item: 'Entertainment', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Dining Out', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Shopping', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Hobbies', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Subscriptions', percent: 5, amount: monthlyIncome * 0.05 },
    { item: 'Vacations', percent: 5, amount: monthlyIncome * 0.05 },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Budget Planner Calculator</h1>
      <p className="text-zinc-600">Plan your monthly budget using the 50/30/20 rule or customize your own allocations.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Monthly After-Tax Income ($)</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full"
            min="0"
            step="100"
          />
          <div className="flex gap-2 mt-2">
            {[2000, 3000, 5000, 7500, 10000].map((v) => (
              <button
                key={v}
                onClick={() => setMonthlyIncome(v)}
                className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
              >
                ${v.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Needs % or $</label>
            <input
              type="number"
              placeholder={`${50}% = ${formatMoney(monthlyIncome * 0.5)}`}
              value={customNeeds ?? ''}
              onChange={(e) => setCustomNeeds(e.target.value ? Number(e.target.value) : null)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Wants % or $</label>
            <input
              type="number"
              placeholder={`${30}% = ${formatMoney(monthlyIncome * 0.3)}`}
              value={customWants ?? ''}
              onChange={(e) => setCustomWants(e.target.value ? Number(e.target.value) : null)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Savings % or $</label>
            <input
              type="number"
              placeholder={`${20}% = ${formatMoney(monthlyIncome * 0.2)}`}
              value={customSavings ?? ''}
              onChange={(e) => setCustomSavings(e.target.value ? Number(e.target.value) : null)}
              className="w-full"
            />
          </div>
        </div>

        {(customNeeds || customWants || customSavings) && (
          <button
            onClick={() => {
              setCustomNeeds(null);
              setCustomWants(null);
              setCustomSavings(null);
            }}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Reset to 50/30/20 rule
          </button>
        )}
      </div>

      <div className="card">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatMoney(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Needs ({formatMoney(result.needs)})</h3>
          <p className="text-xs text-zinc-500 mb-3">Essential expenses you must pay</p>
          <div className="space-y-2">
            {needsExamples.map((ex) => (
              <div key={ex.item} className="flex justify-between text-sm bg-blue-50 rounded p-2">
                <span>{ex.item}</span>
                <span className="font-medium">{formatMoney(ex.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-amber-600 mb-3">Wants ({formatMoney(result.wants)})</h3>
          <p className="text-xs text-zinc-500 mb-3">Non-essential spending for enjoyment</p>
          <div className="space-y-2">
            {wantsExamples.map((ex) => (
              <div key={ex.item} className="flex justify-between text-sm bg-amber-50 rounded p-2">
                <span>{ex.item}</span>
                <span className="font-medium">{formatMoney(ex.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-green-50">
        <h3 className="text-lg font-semibold text-green-600 mb-3">Savings ({formatMoney(result.savings)})</h3>
        <p className="text-xs text-zinc-600 mb-3">Building your financial future</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white rounded p-2">
            <span className="text-zinc-500">Emergency Fund</span>
            <div className="font-medium">{formatMoney(result.savings * 0.5)}</div>
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-zinc-500">Retirement</span>
            <div className="font-medium">{formatMoney(result.savings * 0.3)}</div>
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-zinc-500">Investments</span>
            <div className="font-medium">{formatMoney(result.savings * 0.2)}</div>
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-zinc-500">Goals/Debt</span>
            <div className="font-medium">{formatMoney(result.savings * 0)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}