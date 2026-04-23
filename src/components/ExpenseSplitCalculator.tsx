'use client'

import { useState, useMemo } from 'react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
}

interface Person {
  name: string;
  color: string;
}

export default function ExpenseSplitCalculator() {
  const [people, setPeople] = useState<Person[]>([
    { name: 'Person 1', color: '#3b82f6' },
    { name: 'Person 2', color: '#f59e0b' },
    { name: 'Person 3', color: '#10b981' },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Hotel', amount: 300, paidBy: 'Person 1', splitWith: ['Person 1', 'Person 2', 'Person 3'] },
    { id: 2, description: 'Dinner', amount: 120, paidBy: 'Person 2', splitWith: ['Person 1', 'Person 2', 'Person 3'] },
    { id: 3, description: 'Tickets', amount: 60, paidBy: 'Person 3', splitWith: ['Person 1', 'Person 2', 'Person 3'] },
  ]);

  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState(100);
  const [newExpensePaidBy, setNewExpensePaidBy] = useState('Person 1');

  const result = useMemo(() => {
    const balances: Record<string, number> = {};
    people.forEach(p => balances[p.name] = 0);

    expenses.forEach(exp => {
      const splitAmount = exp.amount / exp.splitWith.length;
      balances[exp.paidBy] += exp.amount;
      exp.splitWith.forEach(p => {
        if (p !== exp.paidBy) {
          balances[p] -= splitAmount;
        }
      });
    });

    const settlements: { from: string; to: string; amount: number }[] = [];
    const debtors = Object.entries(balances).filter(([_, b]) => b < 0).map(([n, b]) => ({ name: n, amount: -b }));
    const creditors = Object.entries(balances).filter(([_, b]) => b > 0).map(([n, b]) => ({ name: n, amount: b }));

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const settleAmount = Math.min(debtors[i].amount, creditors[j].amount);
      if (settleAmount > 0.01) {
        settlements.push({
          from: debtors[i].name,
          to: creditors[j].name,
          amount: settleAmount
        });
      }
      debtors[i].amount -= settleAmount;
      creditors[j].amount -= settleAmount;
      if (debtors[i].amount < 0.01) i++;
      if (creditors[j].amount < 0.01) j++;
    }

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const perPerson = totalExpenses / people.length;

    return { balances, settlements, totalExpenses, perPerson };
  }, [expenses, people]);

  const formatMoney = (n: number) => `$${n.toFixed(2)}`;

  const addExpense = () => {
    if (!newExpenseDesc.trim()) return;
    const newExp: Expense = {
      id: Date.now(),
      description: newExpenseDesc,
      amount: newExpenseAmount,
      paidBy: newExpensePaidBy,
      splitWith: people.map(p => p.name)
    };
    setExpenses([...expenses, newExp]);
    setNewExpenseDesc('');
    setNewExpenseAmount(100);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const addPerson = () => {
    const colors = ['#6366f1', '#ec4899', '#84cc16', '#f97316', '#0ea5e9'];
    const newPerson: Person = {
      name: `Person ${people.length + 1}`,
      color: colors[people.length % colors.length]
    };
    setPeople([...people, newPerson]);
  };

  const getPersonColor = (name: string) => people.find(p => p.name === name)?.color || '#zinc-500';

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Expense Split Calculator</h1>
      <p className="text-zinc-600">Track and split group expenses fairly. Calculate who owes whom for trips, shared living, or group activities.</p>

      {/* People Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Participants ({people.length})</h3>
          <button onClick={addPerson} className="text-sm text-blue-500 hover:text-blue-700">+ Add Person</button>
        </div>
        <div className="flex gap-2">
          {people.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 rounded-full"
              style={{ backgroundColor: `${p.color}20` }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
              <input
                type="text"
                value={p.name}
                onChange={(e) => {
                  const newPeople = [...people];
                  newPeople[idx].name = e.target.value;
                  setPeople(newPeople);
                }}
                className="bg-transparent border-none text-sm w-20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Section */}
      <div className="card space-y-3">
        <h3 className="font-medium">Add Expense</h3>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Description</label>
            <input
              type="text"
              value={newExpenseDesc}
              onChange={(e) => setNewExpenseDesc(e.target.value)}
              placeholder="What?"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Amount ($)</label>
            <input
              type="number"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Paid By</label>
            <select value={newExpensePaidBy} onChange={(e) => setNewExpensePaidBy(e.target.value)} className="w-full">
              {people.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <button onClick={addExpense} className="w-full h-full bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="card">
        <h3 className="font-medium mb-3">Expenses ({expenses.length})</h3>
        <div className="space-y-2">
          {expenses.map(exp => (
            <div key={exp.id} className="flex items-center justify-between bg-zinc-50 rounded p-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">{exp.description}</span>
                <span className="text-sm text-zinc-500">split {exp.splitWith.length} ways</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getPersonColor(exp.paidBy) }}></div>
                  <span className="text-sm">{exp.paidBy}</span>
                </div>
                <span className="font-bold">{formatMoney(exp.amount)}</span>
                <button onClick={() => removeExpense(exp.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t flex justify-between">
          <span className="text-zinc-500">Total</span>
          <span className="font-bold">{formatMoney(result.totalExpenses)}</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        {/* Balances */}
        <div className="card">
          <h3 className="font-medium mb-3">Individual Balances</h3>
          <div className="space-y-2">
            {people.map(p => (
              <div key={p.name} className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: `${p.color}15` }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                  <span>{p.name}</span>
                </div>
                <span className={`font-medium ${result.balances[p.name] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.balances[p.name] >= 0 ? '+' : ''}{formatMoney(result.balances[p.name])}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-zinc-500 text-center">
            Positive = owed money, Negative = owes money
          </div>
        </div>

        {/* Settlements */}
        <div className="card">
          <h3 className="font-medium mb-3">Settlement Suggestions</h3>
          {result.settlements.length === 0 ? (
            <div className="text-center text-zinc-500 py-4">Everyone is settled up!</div>
          ) : (
            <div className="space-y-2">
              {result.settlements.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between bg-blue-50 rounded p-2">
                  <span className="text-sm">
                    <span style={{ color: getPersonColor(s.from) }}>{s.from}</span>
                    <span className="text-zinc-400"> pays </span>
                    <span style={{ color: getPersonColor(s.to) }}>{s.to}</span>
                  </span>
                  <span className="font-bold text-blue-600">{formatMoney(s.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="card bg-zinc-50 text-center">
        <div className="text-sm text-zinc-500">Fair share per person</div>
        <div className="text-2xl font-bold">{formatMoney(result.perPerson)}</div>
      </div>
    </main>
  );
}