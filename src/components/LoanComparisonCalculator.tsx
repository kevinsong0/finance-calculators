'use client'

import { useState, useMemo } from 'react';

export default function LoanComparisonCalculator() {
  const [amount, setAmount] = useState(25000);
  const [rate1, setRate1] = useState(6.5);
  const [rate2, setRate2] = useState(5.5);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    const n = years * 12;
    const calc = (rate: number) => {
      const r = rate / 100 / 12;
      const payment = amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const total = payment * n;
      const interest = total - amount;
      return { payment, total, interest };
    };
    const loan1 = calc(rate1);
    const loan2 = calc(rate2);
    const savings = loan1.total - loan2.total;
    return { loan1, loan2, savings };
  }, [amount, rate1, rate2, years]);

  const formatMoney = (n: number) => `$${n.toFixed(0)}`;

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Loan Comparison Calculator</h1>
      <p className="text-zinc-600">Compare two loan options to see which saves you more money.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Loan Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Loan A Rate (%)</label>
          <input type="number" value={rate1} onChange={(e) => setRate1(Number(e.target.value))} step={0.5} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Loan B Rate (%)</label>
          <input type="number" value={rate2} onChange={(e) => setRate2(Number(e.target.value))} step={0.5} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Term (Years)</label>
          <select value={years} onChange={(e) => setYears(Number(e.target.value))}>
            {[3, 5, 7, 10, 15, 20, 30].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Loan A Total</div>
            <div className="text-lg font-bold text-red-600">{formatMoney(result.loan1.total)}</div>
            <div className="text-xs text-zinc-500">Payment: {formatMoney(result.loan1.payment)}/mo</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Loan B Total</div>
            <div className="text-lg font-bold text-green-600">{formatMoney(result.loan2.total)}</div>
            <div className="text-xs text-zinc-500">Payment: {formatMoney(result.loan2.payment)}/mo</div>
          </div>
        </div>
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-zinc-600 mb-1">Savings with Lower Rate</div>
          <div className="text-lg font-bold text-blue-600">{formatMoney(result.savings)}</div>
        </div>
      </div>
    </main>
  );
}