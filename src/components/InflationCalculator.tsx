'use client'

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(3);
  const [startYear, setStartYear] = useState(2020);

  const result = useMemo(() => {
    const endAmount = initialAmount * Math.pow(1 + inflationRate / 100, years);
    const purchasingPower = initialAmount / Math.pow(1 + inflationRate / 100, years);
    const totalLoss = initialAmount - purchasingPower;

    const timeline = [];
    for (let i = 0; i <= years; i++) {
      const futureValue = initialAmount * Math.pow(1 + inflationRate / 100, i);
      const adjustedValue = initialAmount / Math.pow(1 + inflationRate / 100, i);
      timeline.push({
        year: startYear + i,
        futureValue,
        adjustedValue,
        inflationLoss: initialAmount - adjustedValue,
      });
    }

    return {
      endAmount,
      purchasingPower,
      totalLoss,
      timeline,
      averageAnnualLoss: initialAmount * (inflationRate / 100),
    };
  }, [initialAmount, years, inflationRate, startYear]);

  const formatMoney = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Inflation Calculator</h1>
      <p className="text-zinc-600">See how inflation erodes purchasing power over time. Calculate what your money will be worth in the future.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Initial Amount ($)</label>
            <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[1000, 5000, 10000, 50000, 100000].map((v) => (
                <button key={v} onClick={() => setInitialAmount(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                  {formatMoney(v)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Years</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" min="1" max="50" />
            <div className="flex gap-2 mt-2">
              {[5, 10, 20, 30].map((v) => (
                <button key={v} onClick={() => setYears(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v} yrs</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Annual Inflation Rate (%)</label>
            <input type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="w-full" step="0.5" />
            <div className="flex gap-2 mt-2">
              {[2, 3, 4, 5, 7].map((v) => (
                <button key={v} onClick={() => setInflationRate(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}%</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Start Year</label>
            <input type="number" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card bg-blue-50">
          <div className="text-xs text-zinc-500 mb-1">Future Value Needed</div>
          <div className="text-xl font-bold text-blue-600">{formatMoney(result.endAmount)}</div>
          <div className="text-xs text-zinc-500">to match {formatMoney(initialAmount)} today</div>
        </div>
        <div className="card bg-red-50">
          <div className="text-xs text-zinc-500 mb-1">Purchasing Power in {startYear + years}</div>
          <div className="text-xl font-bold text-red-600">{formatMoney(result.purchasingPower)}</div>
          <div className="text-xs text-zinc-500">equivalent value</div>
        </div>
        <div className="card bg-orange-50">
          <div className="text-xs text-zinc-500 mb-1">Total Value Lost</div>
          <div className="text-xl font-bold text-orange-600">{formatMoney(result.totalLoss)}</div>
          <div className="text-xs text-zinc-500">{((result.totalLoss / initialAmount) * 100).toFixed(1)}% erosion</div>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="text-sm font-medium mb-2">Purchasing Power Over Time</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.timeline}>
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(v) => formatMoney(Number(v))} labelFormatter={(l) => `${l}`} />
              <Line type="monotone" dataKey="adjustedValue" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="Purchasing Power" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-sm font-medium mb-2">Year-by-Year Impact</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Year</th>
              <th className="text-right py-2">Future Value Needed</th>
              <th className="text-right py-2">Purchasing Power</th>
              <th className="text-right py-2">Value Lost</th>
            </tr>
          </thead>
          <tbody>
            {result.timeline.filter((_, i) => i % Math.ceil(years / 10) === 0 || i === years).map((row) => (
              <tr key={row.year} className="border-b">
                <td className="py-2">{row.year}</td>
                <td className="py-2 text-right text-blue-600">{formatMoney(row.futureValue)}</td>
                <td className="py-2 text-right text-red-600">{formatMoney(row.adjustedValue)}</td>
                <td className="py-2 text-right text-orange-600">{formatMoney(row.inflationLoss)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Protecting Against Inflation</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Invest:</span> Stocks historically beat inflation (avg 7-10% return)
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">High-yield savings:</span> Earn 4-5% APY to partially offset
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">I Bonds:</span> Treasury bonds with inflation protection
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Real Estate:</span> Property values often rise with inflation
          </div>
        </div>
      </div>
    </main>
  );
}