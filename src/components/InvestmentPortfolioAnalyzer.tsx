'use client'

import { useState } from 'react';

export default function InvestmentPortfolioAnalyzer() {
  const [holdings, setHoldings] = useState<{ name: string; value: number; allocation: number }[]>([
    { name: 'Stocks', value: 50000, allocation: 50 },
    { name: 'Bonds', value: 30000, allocation: 30 },
    { name: 'Real Estate', value: 10000, allocation: 10 },
    { name: 'Cash', value: 10000, allocation: 10 },
  ]);
  const [result, setResult] = useState<{ total: number; risk: string; diversification: string } | null>(null);

  const updateHolding = (index: number, field: 'name' | 'value' | 'allocation', val: string) => {
    const updated = [...holdings];
    if (field === 'name') {
      updated[index].name = val;
    } else {
      const numVal = parseFloat(val) || 0;
      if (field === 'value') {
        updated[index].value = numVal;
      } else {
        updated[index].allocation = numVal;
      }
    }
    setHoldings(updated);
  };

  const analyzePortfolio = () => {
    const total = holdings.reduce((sum, h) => sum + h.value, 0);

    // Calculate risk level
    const stockAllocation = holdings.find(h => h.name === 'Stocks')?.allocation || 0;
    let risk = 'Moderate';
    if (stockAllocation > 70) risk = 'High';
    else if (stockAllocation < 30) risk = 'Low';

    // Calculate diversification score
    const allocations = holdings.map(h => h.allocation);
    const maxAllocation = Math.max(...allocations);
    let diversification = 'Good';
    if (maxAllocation > 60) diversification = 'Poor - concentrated';
    else if (maxAllocation < 30 && allocations.filter(a => a > 5).length > 4) diversification = 'Excellent - diversified';

    setResult({ total, risk, diversification });
  };

  const strategies = [
    { name: 'Conservative', desc: '30% stocks, 50% bonds, 20% cash. Low risk, stable returns.', age: '65+' },
    { name: 'Moderate', desc: '50% stocks, 40% bonds, 10% alternatives. Balanced growth and stability.', age: '40-65' },
    { name: 'Aggressive', desc: '70% stocks, 20% bonds, 10% alternatives. Higher risk, higher potential returns.', age: '20-40' },
    { name: 'Income', desc: '20% stocks, 70% bonds, 10% dividend stocks. Focus on income generation.', age: 'Retirement' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Investment Portfolio Analyzer</h1>
      <p className="text-zinc-600">Analyze your investment portfolio allocation. Calculate total value, risk level, diversification score. Get portfolio strategy recommendations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Your Holdings</h3>
        {holdings.map((h, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <label className="text-sm text-zinc-600">Asset Type</label>
              <input type="text" className="w-full p-2 border rounded" value={h.name} onChange={(e) => updateHolding(i, 'name', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-600">Value ($)</label>
              <input type="number" className="w-full p-2 border rounded" value={h.value} onChange={(e) => updateHolding(i, 'value', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-600">Allocation (%)</label>
              <input type="number" className="w-full p-2 border rounded" value={h.allocation} onChange={(e) => updateHolding(i, 'allocation', e.target.value)} max={100} />
            </div>
          </div>
        ))}
        <button onClick={analyzePortfolio} className="btn-primary w-full">Analyze Portfolio</button>
      </div>

      {result && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Portfolio Analysis</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">${result.total.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Total Value</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">{result.risk}</div>
              <div className="text-xs text-zinc-500">Risk Level</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">{result.diversification}</div>
              <div className="text-xs text-zinc-500">Diversification</div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Allocation Strategies by Age</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.name} className="bg-white rounded p-2">
              <strong>{s.name}</strong> ({s.age}): {s.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Asset Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><strong>Stocks</strong>: Growth, higher risk</div>
          <div className="bg-white rounded p-2"><strong>Bonds</strong>: Stability, lower risk</div>
          <div className="bg-white rounded p-2"><strong>Real Estate</strong>: Diversification, income</div>
          <div className="bg-white rounded p-2"><strong>Cash</strong>: Liquidity, safety</div>
          <div className="bg-white rounded p-2"><strong>Commodities</strong>: Hedge against inflation</div>
          <div className="bg-white rounded p-2"><strong>Alternatives</strong>: Diversification</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rebalancing Tips</h3>
        <div className="text-xs text-zinc-600">
          Review allocation annually. Rebalance when allocations drift 5%+ from target. Sell high performers to buy underweighted assets. Consider tax implications. Use new contributions to rebalance. Target allocation based on age, goals, risk tolerance. Market changes affect allocation automatically.
        </div>
      </div>
    </main>
  );
}