'use client'

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function NetWorthCalculator() {
  // Assets
  const [cash, setCash] = useState(5000);
  const [investments, setInvestments] = useState(25000);
  const [retirement, setRetirement] = useState(15000);
  const [realEstate, setRealEstate] = useState(0);
  const [vehicles, setVehicles] = useState(15000);
  const [otherAssets, setOtherAssets] = useState(0);

  // Liabilities
  const [mortgage, setMortgage] = useState(0);
  const [carLoan, setCarLoan] = useState(10000);
  const [studentLoans, setStudentLoans] = useState(5000);
  const [creditCards, setCreditCards] = useState(2000);
  const [otherDebt, setOtherDebt] = useState(0);

  const result = useMemo(() => {
    const totalAssets = cash + investments + retirement + realEstate + vehicles + otherAssets;
    const totalLiabilities = mortgage + carLoan + studentLoans + creditCards + otherDebt;
    const netWorth = totalAssets - totalLiabilities;
    const debtRatio = totalLiabilities / totalAssets;
    return { totalAssets, totalLiabilities, netWorth, debtRatio };
  }, [cash, investments, retirement, realEstate, vehicles, otherAssets, mortgage, carLoan, studentLoans, creditCards, otherDebt]);

  const chartData = useMemo(() => [
    { name: 'Assets', value: result.totalAssets, type: 'asset' },
    { name: 'Liabilities', value: result.totalLiabilities, type: 'liability' },
  ], [result]);

  const formatMoney = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const getNetWorthStatus = () => {
    if (result.netWorth > 100000) return { label: 'Strong', color: 'text-green-600' };
    if (result.netWorth > 0) return { label: 'Positive', color: 'text-blue-600' };
    if (result.netWorth > -50000) return { label: 'Needs Work', color: 'text-orange-600' };
    return { label: 'Focus on Debt', color: 'text-red-600' };
  };

  const status = getNetWorthStatus();

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Net Worth Calculator</h1>
      <p className="text-zinc-600">Calculate your net worth by comparing your assets against your liabilities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Assets Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-green-600 mb-4">Assets</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Cash & Savings</label>
              <input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Investments (Stocks, Bonds)</label>
              <input type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Retirement Accounts (401k, IRA)</label>
              <input type="number" value={retirement} onChange={(e) => setRetirement(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Real Estate Value</label>
              <input type="number" value={realEstate} onChange={(e) => setRealEstate(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Vehicle Value</label>
              <input type="number" value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Other Assets</label>
              <input type="number" value={otherAssets} onChange={(e) => setOtherAssets(Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-zinc-600">Total Assets</div>
            <div className="text-xl font-bold text-green-600">{formatMoney(result.totalAssets)}</div>
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Liabilities</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Mortgage Balance</label>
              <input type="number" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Car Loan</label>
              <input type="number" value={carLoan} onChange={(e) => setCarLoan(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Student Loans</label>
              <input type="number" value={studentLoans} onChange={(e) => setStudentLoans(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Credit Card Debt</label>
              <input type="number" value={creditCards} onChange={(e) => setCreditCards(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Other Debt</label>
              <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <div className="text-sm text-zinc-600">Total Liabilities</div>
            <div className="text-xl font-bold text-red-600">{formatMoney(result.totalLiabilities)}</div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" tickFormatter={(v) => `$${v/1000}k`} />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip formatter={(v: number) => formatMoney(v)} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-sm text-zinc-600 mb-1">Net Worth</div>
            <div className={`text-2xl font-bold ${result.netWorth >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatMoney(result.netWorth)}
            </div>
          </div>
          <div className="bg-zinc-50 rounded-lg p-4 text-center">
            <div className="text-sm text-zinc-600 mb-1">Status</div>
            <div className={`text-lg font-bold ${status.color}`}>{status.label}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-sm text-zinc-600 mb-1">Debt Ratio</div>
            <div className="text-lg font-bold text-purple-600">{(result.debtRatio * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips to Improve Net Worth</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Increase Assets:</span> Invest consistently, build emergency fund
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Reduce Debt:</span> Pay off high-interest debt first
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Track Progress:</span> Check net worth monthly
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Goal:</span> Aim for positive net worth by age 30
          </div>
        </div>
      </div>
    </main>
  );
}