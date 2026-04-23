'use client';

import { useState, useMemo } from 'react';

export default function DebtSnowballCalculator() {
  const [debts, setDebts] = useState<{ name: string; balance: string; rate: string; minPayment: string }[]>([
    { name: 'Credit Card 1', balance: '5000', rate: '18', minPayment: '100' },
    { name: 'Credit Card 2', balance: '3000', rate: '22', minPayment: '75' },
    { name: 'Car Loan', balance: '10000', rate: '5', minPayment: '200' }
  ]);
  const [extraPayment, setExtraPayment] = useState<string>('200');
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');

  const addDebt = () => {
    setDebts([...debts, { name: 'New Debt', balance: '1000', rate: '10', minPayment: '50' }]);
  };

  const removeDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index));
  };

  const updateDebt = (index: number, field: string, value: string) => {
    const updated = [...debts];
    updated[index] = { ...updated[index], [field]: value };
    setDebts(updated);
  };

  const result = useMemo(() => {
    const parsedDebts = debts.map(d => ({
      name: d.name,
      balance: parseFloat(d.balance) || 0,
      rate: parseFloat(d.rate) || 0,
      minPayment: parseFloat(d.minPayment) || 0
    })).filter(d => d.balance > 0);

    const extra = parseFloat(extraPayment) || 0;
    const totalBalance = parsedDebts.reduce((sum, d) => sum + d.balance, 0);
    const totalMinPayment = parsedDebts.reduce((sum, d) => sum + d.minPayment, 0);
    const monthlyPayment = totalMinPayment + extra;

    const sortedDebts = strategy === 'snowball'
      ? [...parsedDebts].sort((a, b) => a.balance - b.balance)
      : [...parsedDebts].sort((a, b) => b.rate - a.rate);

    let months = 0;
    let totalInterest = 0;
    let currentDebts = sortedDebts.map(d => ({ ...d }));
    const payoffOrder: { name: string; payoffMonth: number }[] = [];

    while (currentDebts.some(d => d.balance > 0)) {
      months++;
      let remainingExtra = extra;
      currentDebts.forEach(d => {
        if (d.balance > 0) {
          const interest = d.balance * (d.rate / 100 / 12);
          totalInterest += interest;
          d.balance += interest;
          const payment = Math.min(d.minPayment, d.balance);
          d.balance -= payment;
        }
      });

      for (let i = 0; i < currentDebts.length && remainingExtra > 0; i++) {
        if (currentDebts[i].balance > 0) {
          const payment = Math.min(remainingExtra, currentDebts[i].balance);
          currentDebts[i].balance -= payment;
          remainingExtra -= payment;

          if (currentDebts[i].balance <= 0) {
            payoffOrder.push({ name: currentDebts[i].name, payoffMonth: months });
          }
        }
      }

      if (months > 600) break;
    }

    const avalancheDebts = [...parsedDebts].sort((a, b) => b.rate - a.rate);
    let avalancheMonths = 0;
    let avalancheInterest = 0;
    let avDebts = avalancheDebts.map(d => ({ ...d }));

    while (avDebts.some(d => d.balance > 0)) {
      avalancheMonths++;
      let remainingExtra = extra;

      avDebts.forEach(d => {
        if (d.balance > 0) {
          const interest = d.balance * (d.rate / 100 / 12);
          avalancheInterest += interest;
          d.balance += interest;
          const payment = Math.min(d.minPayment, d.balance);
          d.balance -= payment;
        }
      });

      for (let i = 0; i < avDebts.length && remainingExtra > 0; i++) {
        if (avDebts[i].balance > 0) {
          const payment = Math.min(remainingExtra, avDebts[i].balance);
          avDebts[i].balance -= payment;
          remainingExtra -= payment;
        }
      }

      if (avalancheMonths > 600) break;
    }

    const monthsSaved = avalancheMonths - months;
    const interestSaved = avalancheInterest - totalInterest;

    return {
      totalBalance,
      totalMinPayment,
      monthlyPayment,
      payoffMonths: months,
      totalInterest: Math.round(totalInterest),
      payoffOrder,
      avalancheMonths,
      avalancheInterest: Math.round(avalancheInterest),
      monthsSaved,
      interestSaved: Math.round(interestSaved),
      strategy,
      extra
    };
  }, [debts, extraPayment, strategy]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Debt Snowball Calculator</h1>
      <p className="text-gray-600 mb-6">Compare debt payoff strategies</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Debts</h3>
        {debts.map((debt, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2 p-3 bg-gray-50 rounded-lg">
            <input type="text" value={debt.name} onChange={(e) => updateDebt(index, 'name', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="number" value={debt.balance} onChange={(e) => updateDebt(index, 'balance', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="number" step="0.5" value={debt.rate} onChange={(e) => updateDebt(index, 'rate', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="number" value={debt.minPayment} onChange={(e) => updateDebt(index, 'minPayment', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
            <button onClick={() => removeDebt(index)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg">Remove</button>
          </div>
        ))}
        <button onClick={addDebt} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">Add Debt</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extra Monthly Payment</label>
          <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Strategy</label>
          <select value={strategy} onChange={(e) => setStrategy(e.target.value as 'snowball' | 'avalanche')} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="snowball">Snowball (smallest first)</option>
            <option value="avalanche">Avalanche (highest rate)</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Debt Payoff Analysis</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg"><p className="text-sm text-gray-600">Total Debt</p><p className="text-2xl font-bold text-blue-700">${result.totalBalance.toLocaleString()}</p></div>
            <div className="text-center p-3 bg-white rounded-lg"><p className="text-sm text-gray-600">Months</p><p className="text-2xl font-bold text-indigo-700">{result.payoffMonths}</p></div>
            <div className="text-center p-3 bg-white rounded-lg"><p className="text-sm text-gray-600">Interest</p><p className="text-2xl font-bold text-red-700">${result.totalInterest.toLocaleString()}</p></div>
            <div className="text-center p-3 bg-white rounded-lg"><p className="text-sm text-gray-600">Monthly</p><p className="text-2xl font-bold text-green-700">${result.monthlyPayment.toLocaleString()}</p></div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Payoff Order</h4>
            <div className="space-y-2 mt-2">
              {result.payoffOrder.map((d, i) => (
                <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>{i + 1}. {d.name}</span>
                  <span>Month {d.payoffMonth}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Strategy Comparison</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-blue-50 rounded"><p className="font-medium text-blue-800">Snowball</p><p className="text-sm text-blue-700">{result.payoffMonths} mo, ${result.totalInterest}</p></div>
              <div className="p-3 bg-purple-50 rounded"><p className="font-medium text-purple-800">Avalanche</p><p className="text-sm text-purple-700">{result.avalancheMonths} mo, ${result.avalancheInterest}</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p>Note: Snowball pays smallest first, avalanche pays highest rate first.</p>
      </div>
    </div>
  );
}