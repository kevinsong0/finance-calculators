'use client'

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CurrencyExchangeHistoryCalculator() {
  const [baseAmount, setBaseAmount] = useState(1000);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [years, setYears] = useState(5);

  const rates: Record<string, Record<string, number[]>> = useMemo(() => ({
    USD: {
      EUR: [0.85, 0.88, 0.92, 0.93, 0.91, 0.89],
      GBP: [0.73, 0.75, 0.78, 0.79, 0.77, 0.76],
      JPY: [110, 115, 130, 140, 150, 148],
      CNY: [6.4, 6.5, 6.7, 7.0, 7.2, 7.1],
      CAD: [1.25, 1.27, 1.35, 1.36, 1.35, 1.34],
    },
    EUR: {
      USD: [1.18, 1.14, 1.09, 1.08, 1.10, 1.12],
      GBP: [0.86, 0.85, 0.84, 0.85, 0.85, 0.85],
      JPY: [130, 105, 112, 130, 150, 165],
    },
    GBP: {
      USD: [1.37, 1.33, 1.28, 1.27, 1.30, 1.32],
      EUR: [1.16, 1.18, 1.19, 1.18, 1.18, 1.18],
    },
  }), []);

  const result = useMemo(() => {
    const history = rates[baseCurrency]?.[targetCurrency] || [];
    if (history.length === 0) return { current: baseAmount, avg: baseAmount, trajectory: [], change: 0, changePercent: 0 };

    const currentRate = history[history.length - 1];
    const avgRate = history.reduce((a, b) => a + b, 0) / history.length;
    const firstRate = history[0];

    const trajectory = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - history.length);

    for (let i = 0; i < history.length; i++) {
      trajectory.push({
        year: startDate.getFullYear() + i + 1,
        rate: history[i],
        converted: baseAmount * history[i],
      });
    }

    const current = baseAmount * currentRate;
    const avg = baseAmount * avgRate;
    const first = baseAmount * firstRate;
    const change = current - first;
    const changePercent = ((currentRate - firstRate) / firstRate) * 100;

    return { current, avg, first, trajectory, change, changePercent, currentRate, avgRate, firstRate };
  }, [baseAmount, baseCurrency, targetCurrency, rates]);

  const formatMoney = (n: number, currency: string) => {
    const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', CAD: 'C$' };
    return `${symbols[currency] || ''}${n.toFixed(2)}`;
  };

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD'];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Currency Exchange History Calculator</h1>
      <p className="text-zinc-600">See how exchange rates have changed over time. Calculate historical conversions and trends.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Amount</label>
            <input type="number" value={baseAmount} onChange={(e) => setBaseAmount(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[100, 500, 1000, 5000, 10000].map((v) => (
                <button key={v} onClick={() => setBaseAmount(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">From Currency</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} className="w-full">
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">To Currency</label>
            <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)} className="w-full">
              {currencies.filter(c => c !== baseCurrency).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Current Results */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card bg-green-50">
          <div className="text-xs text-zinc-500 mb-1">Current Value</div>
          <div className="text-xl font-bold text-green-600">{formatMoney(result.current, targetCurrency)}</div>
        </div>
        <div className="card bg-blue-50">
          <div className="text-xs text-zinc-500 mb-1">Average Value</div>
          <div className="text-xl font-bold text-blue-600">{formatMoney(result.avg, targetCurrency)}</div>
        </div>
        <div className="card bg-red-50">
          <div className="text-xs text-zinc-500 mb-1">Change ({years} years)</div>
          <div className={`text-xl font-bold ${result.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {result.change >= 0 ? '+' : ''}{formatMoney(Math.abs(result.change), targetCurrency)}
          </div>
        </div>
        <div className="card bg-purple-50">
          <div className="text-xs text-zinc-500 mb-1">% Change</div>
          <div className={`text-xl font-bold ${result.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {result.changePercent >= 0 ? '+' : ''}{result.changePercent.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Historical Chart */}
      <div className="card">
        <h3 className="text-sm font-medium mb-2">Exchange Rate History</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.trajectory}>
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => `${v.toFixed(2)}`} />
              <Tooltip formatter={(v: number) => v.toFixed(4)} labelFormatter={(l) => `${l}`} />
              <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name={`Rate (${baseCurrency}/${targetCurrency})`} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Table */}
      <div className="card">
        <h3 className="font-medium mb-2">Year-by-Year Conversion</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Year</th>
              <th className="text-right py-2">Rate</th>
              <th className="text-right py-2">{baseAmount} {baseCurrency} =</th>
            </tr>
          </thead>
          <tbody>
            {result.trajectory.map((row) => (
              <tr key={row.year} className="border-b">
                <td className="py-2">{row.year}</td>
                <td className="py-2 text-right">{row.rate.toFixed(4)}</td>
                <td className="py-2 text-right font-medium">{formatMoney(row.converted, targetCurrency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Currency Exchange Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Timing:</span> Exchange when your base currency is strong
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Trends:</span> Strong USD = better EUR/GBP conversion
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Avoid fees:</span> Use rate alerts to time exchanges
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Hedging:</span> Lock rates for large future transfers
          </div>
        </div>
      </div>
    </main>
  );
}