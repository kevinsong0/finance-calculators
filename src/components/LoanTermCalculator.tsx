'use client'

import { useState, useMemo } from 'react';

export default function LoanTermCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(200);
  const [loanType, setLoanType] = useState('personal');

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;

    // Calculate number of months using formula: n = -log(1 - (P * r) / A) / log(1 + r)
    if (r === 0) {
      return {
        months: Math.ceil(principal / monthlyPayment),
        totalInterest: 0,
        totalPayment: principal,
        effectiveRate: 0,
      };
    }

    const ratio = (principal * r) / monthlyPayment;

    // Check if monthly payment is sufficient to pay off the loan
    if (ratio >= 1) {
      return {
        error: 'Monthly payment is too low to pay off the loan with this interest rate.',
        minPayment: principal * r + 1,
      };
    }

    const months = -Math.log(1 - ratio) / Math.log(1 + r);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    // Effective annual rate (APR approximation)
    const effectiveRate = ((totalPayment / principal - 1) * 12 / months) * 100;

    return {
      months: Math.ceil(months),
      years: Math.floor(months / 12),
      remainingMonths: Math.ceil(months % 12),
      totalInterest,
      totalPayment,
      effectiveRate,
      payoffDate: new Date(Date.now() + Math.ceil(months) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
  }, [principal, rate, monthlyPayment]);

  const comparison = useMemo(() => {
    const payments = [monthlyPayment * 1.5, monthlyPayment * 1.25, monthlyPayment, monthlyPayment * 0.9, monthlyPayment * 0.8];
    return payments.map((p) => {
      const r = rate / 100 / 12;
      if (r === 0) {
        return { payment: p, months: Math.ceil(principal / p), totalInterest: 0 };
      }
      const ratio = (principal * r) / p;
      if (ratio >= 1) return { payment: p, months: Infinity, totalInterest: Infinity, error: true };
      const months = -Math.log(1 - ratio) / Math.log(1 + r);
      return { payment: p, months: Math.ceil(months), totalInterest: p * months - principal };
    });
  }, [principal, rate, monthlyPayment]);

  const schedule = useMemo(() => {
    if (!calculation || calculation.error) return [];
    const r = rate / 100 / 12;
    const months = calculation.months ?? 0;
    const schedule = [];
    let balance = principal;

    for (let i = 1; i <= Math.min(months, 12); i++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }
    return schedule;
  }, [principal, rate, monthlyPayment, calculation]);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Loan Term Calculator</h1>
      <p className="text-zinc-600">Calculate how long it takes to pay off a loan based on your monthly payment. Find the payoff timeline.</p>

      <div className="card space-y-4">
        {/* Loan Type */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Loan Type</label>
          <div className="flex gap-2">
            {[
              { id: 'personal', name: 'Personal Loan' },
              { id: 'auto', name: 'Auto Loan' },
              { id: 'credit', name: 'Credit Card' },
              { id: 'student', name: 'Student Loan' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setLoanType(type.id)}
                className={`px-4 py-2 rounded ${loanType === type.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Principal */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full"
            min="100"
            max="1000000"
          />
          <div className="flex gap-2 mt-2">
            {[1000, 5000, 10000, 25000, 50000].map((p) => (
              <button key={p} onClick={() => setPrincipal(p)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                ${p.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full"
            min="0"
            max="30"
            step="0.1"
          />
          <div className="flex gap-2 mt-2">
            {loanType === 'personal' && [3, 5, 7, 10, 15].map((r) => (
              <button key={r} onClick={() => setRate(r)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{r}%</button>
            ))}
            {loanType === 'auto' && [3, 4, 5, 6, 8].map((r) => (
              <button key={r} onClick={() => setRate(r)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{r}%</button>
            ))}
            {loanType === 'credit' && [15, 18, 20, 22, 25].map((r) => (
              <button key={r} onClick={() => setRate(r)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{r}%</button>
            ))}
            {loanType === 'student' && [4, 5, 6, 7, 8].map((r) => (
              <button key={r} onClick={() => setRate(r)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{r}%</button>
            ))}
          </div>
        </div>

        {/* Monthly Payment */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Monthly Payment ($)</label>
          <input
            type="number"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="w-full"
            min="1"
            max="50000"
          />
          <div className="flex gap-2 mt-2">
            {[100, 200, 300, 500, 1000].map((p) => (
              <button key={p} onClick={() => setMonthlyPayment(p)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                ${p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {calculation && (
        calculation.error ? (
          <div className="card bg-red-50 text-center p-6">
            <div className="text-red-600 font-medium">{calculation.error}</div>
            <div className="text-sm text-zinc-600 mt-2">
              Minimum payment needed: ${calculation.minPayment?.toFixed(2)}/month
            </div>
          </div>
        ) : (
          <div className="card bg-blue-50 text-center p-6">
            <div className="text-sm text-zinc-500 mb-2">Payoff Timeline</div>
            <div className="text-4xl font-bold text-blue-600">
              {calculation.years} years, {calculation.remainingMonths} months
            </div>
            <div className="text-sm text-zinc-600 mt-2">
              ({calculation.months} total payments)
            </div>
            <div className="text-sm text-zinc-500 mt-2">
              Payoff date: {calculation.payoffDate}
            </div>
          </div>
        )
      )}

      {/* Cost Summary */}
      {calculation && !calculation.error && (
        <div className="card">
          <h3 className="font-medium mb-3">Total Cost Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-zinc-50 rounded p-4 text-center">
              <div className="text-zinc-500">Principal</div>
              <div className="font-bold">${principal.toLocaleString()}</div>
            </div>
            <div className="bg-orange-50 rounded p-4 text-center">
              <div className="text-zinc-500">Total Interest</div>
              <div className="font-bold text-orange-600">${(calculation.totalInterest ?? 0).toFixed(2)}</div>
            </div>
            <div className="bg-zinc-50 rounded p-4 text-center">
              <div className="text-zinc-500">Total Paid</div>
              <div className="font-bold">${(calculation.totalPayment ?? 0).toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Comparison */}
      {calculation && !calculation.error && (
        <div className="card">
          <h3 className="font-medium mb-3">Payoff by Different Monthly Payments</h3>
          <div className="grid grid-cols-5 gap-2 text-xs">
            {comparison.map((c, i) => (
              <div key={i} className={`rounded p-3 text-center ${c.error ? 'bg-red-50' : i === 2 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-zinc-50'}`}>
                <div className="text-zinc-500">${c.payment.toFixed(0)}/mo</div>
                <div className="font-bold">{c.error ? '∞' : `${c.months} mo`}</div>
                <div className="text-zinc-600">{c.error ? 'Never' : `$${c.totalInterest.toFixed(0)} int`}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amortization Preview */}
      {schedule.length > 0 && (
        <div className="card">
          <h3 className="font-medium mb-3">First 12 Months Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-right py-2">Payment</th>
                  <th className="text-right py-2">Principal</th>
                  <th className="text-right py-2">Interest</th>
                  <th className="text-right py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-b border-zinc-100">
                    <td className="py-2">{row.month}</td>
                    <td className="text-right">${row.payment.toFixed(2)}</td>
                    <td className="text-right">${row.principal.toFixed(2)}</td>
                    <td className="text-right text-orange-600">${row.interest.toFixed(2)}</td>
                    <td className="text-right">${row.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payoff Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Increase payments:</span> Even $50 more per month can shave months off your loan.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Extra payments:</span> Make occasional lump sum payments toward principal.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Refinance:</span> If rates dropped, consider refinancing to reduce interest.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Prioritize high rate:</span> Pay off highest interest loans first.
          </div>
        </div>
      </div>
    </main>
  );
}