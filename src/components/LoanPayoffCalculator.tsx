'use client';

import { useState, useMemo } from 'react';

export default function LoanPayoffCalculator() {
  const [principal, setPrincipal] = useState<string>('15000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [termMonths, setTermMonths] = useState<string>('36');
  const [extraMonthly, setExtraMonthly] = useState<string>('100');
  const [oneTimePayment, setOneTimePayment] = useState<string>('0');
  const [lumpSumMonth, setLumpSumMonth] = useState<string>('12');
  const [doublePayments, setDoublePayments] = useState<boolean>(false);
  const [doubleFromMonth, setDoubleFromMonth] = useState<string>('1');

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(termMonths) || 0;
    const extra = parseFloat(extraMonthly) || 0;
    const lumpSum = parseFloat(oneTimePayment) || 0;
    const lumpMonth = parseFloat(lumpSumMonth) || 0;
    const dblFrom = parseFloat(doubleFromMonth) || 0;

    const monthlyRate = rate / 100 / 12;
    const standardPayment = term > 0 && rate > 0
      ? p * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
      : term > 0 ? p / term : 0;

    // Standard payoff schedule
    let balance = p;
    let monthsStandard = 0;
    let totalInterestStandard = 0;
    const standardSchedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];

    while (balance > 0 && monthsStandard < term) {
      const interestPmt = balance * monthlyRate;
      const principalPmt = standardPayment - interestPmt;
      balance = Math.max(0, balance - principalPmt);
      totalInterestStandard += interestPmt;
      monthsStandard++;
      standardSchedule.push({ month: monthsStandard, payment: standardPayment, principal: principalPmt, interest: interestPmt, balance });
    }

    // With extra payments
    let balanceExtra = p;
    let monthsExtra = 0;
    let totalInterestExtra = 0;
    const extraSchedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];

    while (balanceExtra > 0) {
      const interestPmt = balanceExtra * monthlyRate;
      let payment = standardPayment + extra;

      // Apply one-time lump sum
      if (monthsExtra + 1 === lumpMonth && lumpSum > 0) {
        payment += lumpSum;
      }

      // Apply double payments
      if (doublePayments && monthsExtra + 1 >= dblFrom) {
        payment = standardPayment * 2 + extra;
      }

      const principalPmt = Math.min(payment - interestPmt, balanceExtra);
      balanceExtra = Math.max(0, balanceExtra - principalPmt);
      totalInterestExtra += interestPmt;
      monthsExtra++;

      if (monthsExtra <= 60 || balanceExtra === 0) {
        extraSchedule.push({ month: monthsExtra, payment, principal: principalPmt, interest: interestPmt, balance: balanceExtra });
      }
    }

    // Calculations
    const monthsSaved = monthsStandard - monthsExtra;
    const interestSaved = totalInterestStandard - totalInterestExtra;
    const totalSaved = interestSaved + (lumpSum > 0 ? lumpSum * (monthsStandard - lumpMonth) / monthsStandard * interestSaved : 0);

    // Different strategies comparison
    const strategies = [
      { name: 'Extra $50/month', extra: 50 },
      { name: 'Extra $100/month', extra: 100 },
      { name: 'Extra $200/month', extra: 200 },
      { name: 'Extra $500/month', extra: 500 }
    ].map(s => {
      let bal = p;
      let mo = 0;
      let int = 0;
      const pay = standardPayment + s.extra;
      while (bal > 0) {
        const i = bal * monthlyRate;
        const prin = Math.min(pay - i, bal);
        bal = Math.max(0, bal - prin);
        int += i;
        mo++;
      }
      return { ...s, months: mo, saved: totalInterestStandard - int };
    });

    // Early payoff scenarios
    const payoffScenarios = [
      { targetMonths: 24, label: '2 years' },
      { targetMonths: 18, label: '1.5 years' },
      { targetMonths: 12, label: '1 year' }
    ].map(s => {
      const targetRate = monthlyRate;
      const neededPayment = s.targetMonths > 0 && rate > 0
        ? p * (targetRate * Math.pow(1 + targetRate, s.targetMonths)) / (Math.pow(1 + targetRate, s.targetMonths) - 1)
        : s.targetMonths > 0 ? p / s.targetMonths : 0;
      const extraNeeded = neededPayment - standardPayment;
      return { ...s, payment: neededPayment, extraNeeded: Math.max(0, extraNeeded) };
    });

    return {
      standardPayment,
      monthsStandard,
      totalInterestStandard,
      standardSchedule,
      monthsExtra,
      totalInterestExtra,
      extraSchedule,
      monthsSaved,
      interestSaved,
      totalSaved,
      strategies,
      payoffScenarios,
      principal: p,
      rate,
      term,
      extra,
      lumpSum,
      lumpMonth
    };
  }, [principal, interestRate, termMonths, extraMonthly, oneTimePayment, lumpSumMonth, doublePayments, doubleFromMonth]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Payoff Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate early payoff savings and compare strategies</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Loan Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal ($)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="8.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Term (months)</label>
            <input
              type="number"
              value={termMonths}
              onChange={(e) => setTermMonths(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="36"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Extra Payment Options</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Monthly Payment ($)</label>
            <input
              type="number"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">One-Time Payment ($)</label>
            <input
              type="number"
              value={oneTimePayment}
              onChange={(e) => setOneTimePayment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply One-Time in Month #</label>
            <input
              type="number"
              value={lumpSumMonth}
              onChange={(e) => setLumpSumMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="12"
            />
          </div>

          <label className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={doublePayments}
              onChange={(e) => setDoublePayments(e.target.checked)}
              className="mr-3"
            />
            <div>
              <span className="font-medium text-amber-800">Double Payments</span>
              <p className="text-xs text-amber-600">Pay twice the standard amount</p>
            </div>
          </label>

          {doublePayments && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Doubling from Month #</label>
              <input
                type="number"
                value={doubleFromMonth}
                onChange={(e) => setDoubleFromMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Payoff Analysis</h3>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Standard Payment</p>
              <p className="text-2xl font-bold text-gray-700">${result.standardPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.term} months</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Standard Interest</p>
              <p className="text-2xl font-bold text-red-600">${result.totalInterestStandard.toFixed(0)}</p>
            </div>

            <div className="text-center p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-gray-600">Months Saved</p>
              <p className="text-2xl font-bold text-green-700">{result.monthsSaved}</p>
            </div>

            <div className="text-center p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-gray-600">Interest Saved</p>
              <p className="text-2xl font-bold text-green-700">${result.interestSaved.toFixed(0)}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Payoff Comparison</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Standard Schedule</p>
                <div className="text-sm">
                  <span className="text-gray-600">Payoff: </span>
                  <span className="font-bold">{result.monthsStandard} months</span>
                  <span className="text-gray-500 ml-2">({Math.ceil(result.monthsStandard / 12)} years)</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Total Interest: </span>
                  <span className="font-bold text-red-600">${result.totalInterestStandard.toFixed(0)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Total Cost: </span>
                  <span className="font-bold">${(result.principal + result.totalInterestStandard).toFixed(0)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">With Extra Payments</p>
                <div className="text-sm">
                  <span className="text-gray-600">Payoff: </span>
                  <span className="font-bold text-green-700">{result.monthsExtra} months</span>
                  <span className="text-gray-500 ml-2">({Math.ceil(result.monthsExtra / 12)} years)</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Total Interest: </span>
                  <span className="font-bold text-green-700">${result.totalInterestExtra.toFixed(0)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Total Cost: </span>
                  <span className="font-bold">${(result.principal + result.totalInterestExtra).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Extra Payment Strategies</h4>
            <div className="space-y-2 mt-2">
              {result.strategies.map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">{s.name}</span>
                  <div className="text-right">
                    <span className="font-medium">{s.months} months</span>
                    <span className="text-xs text-green-600 ml-2">(Save ${s.saved.toFixed(0)})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Payoff by Target Date</h4>
            <div className="space-y-2 mt-2">
              {result.payoffScenarios.map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Payoff in {s.label}</span>
                  <div className="text-right">
                    <span className="font-medium">${s.payment.toFixed(0)}/mo</span>
                    <span className="text-xs text-blue-600 ml-2">(+${s.extraNeeded.toFixed(0)} extra)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Payment Schedule (First 12 Months)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="text-left py-1">Month</th>
                    <th className="text-right py-1">Payment</th>
                    <th className="text-right py-1">Principal</th>
                    <th className="text-right py-1">Interest</th>
                    <th className="text-right py-1">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.extraSchedule.slice(0, 12).map((row, i) => (
                    <tr key={i} className={i === result.lumpMonth - 1 && result.lumpSum > 0 ? 'bg-amber-50' : ''}>
                      <td className="py-1">{row.month}</td>
                      <td className="text-right">${row.payment.toFixed(0)}</td>
                      <td className="text-right">${row.principal.toFixed(0)}</td>
                      <td className="text-right text-red-600">${row.interest.toFixed(0)}</td>
                      <td className="text-right">${row.balance.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Extra payments go directly to principal, reducing interest significantly. Even small extra payments save months and hundreds in interest. Best strategy: round up payment to nearest $50 or $100. One-time payments (bonus, tax refund) accelerate payoff. Check if loan has prepayment penalty - most don't. Paying bi-weekly (26 half payments = 13 full payments/year) saves even more. Automate extra payments for consistency.</p>
      </div>
    </div>
  );
}