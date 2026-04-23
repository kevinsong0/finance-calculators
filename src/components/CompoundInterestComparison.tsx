'use client'

import { useState } from 'react';

export default function CompoundInterestComparison() {
  const [principal1, setPrincipal1] = useState('10000');
  const [rate1, setRate1] = useState('5');
  const [years1, setYears1] = useState('10');
  const [contribution1, setContribution1] = useState('0');
  const [principal2, setPrincipal2] = useState('10000');
  const [rate2, setRate2] = useState('7');
  const [years2, setYears2] = useState('10');
  const [contribution2, setContribution2] = useState('0');
  const [result, setResult] = useState<{ final1: number; final2: number; difference: number; chart: { year: number; value1: number; value2: number }[] } | null>(null);

  const calculate = () => {
    const p1 = parseFloat(principal1);
    const r1 = parseFloat(rate1) / 100;
    const y1 = parseInt(years1);
    const c1 = parseFloat(contribution1);

    const p2 = parseFloat(principal2);
    const r2 = parseFloat(rate2) / 100;
    const y2 = parseInt(years2);
    const c2 = parseFloat(contribution2);

    const years = Math.max(y1, y2);
    const chart: { year: number; value1: number; value2: number }[] = [];

    let value1 = p1;
    let value2 = p2;

    for (let y = 0; y <= years; y++) {
      chart.push({ year: y, value1: Math.round(value1), value2: Math.round(value2) });
      value1 = value1 * (1 + r1) + c1;
      value2 = value2 * (1 + r2) + c2;
    }

    const final1 = Math.round(p1 * Math.pow(1 + r1, y1) + c1 * ((Math.pow(1 + r1, y1) - 1) / r1 || 0));
    const final2 = Math.round(p2 * Math.pow(1 + r2, y2) + c2 * ((Math.pow(1 + r2, y2) - 1) / r2 || 0));
    const difference = final2 - final1;

    setResult({ final1, final2, difference, chart });
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Compound Interest Comparison</h1>
      <p className="text-zinc-600">Compare two compound interest scenarios side by side. Different rates, principals, contributions. See difference over time.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Scenario A</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Principal ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={principal1} onChange={(e) => setPrincipal1(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Annual Rate (%)</label>
            <input type="number" className="w-full p-2 border rounded" value={rate1} onChange={(e) => setRate1(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Years</label>
            <input type="number" className="w-full p-2 border rounded" value={years1} onChange={(e) => setYears1(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Annual Contribution ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={contribution1} onChange={(e) => setContribution1(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Scenario B</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Principal ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={principal2} onChange={(e) => setPrincipal2(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Annual Rate (%)</label>
            <input type="number" className="w-full p-2 border rounded" value={rate2} onChange={(e) => setRate2(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Years</label>
            <input type="number" className="w-full p-2 border rounded" value={years2} onChange={(e) => setYears2(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Annual Contribution ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={contribution2} onChange={(e) => setContribution2(e.target.value)} />
          </div>
        </div>
      </div>

      <button onClick={calculate} className="btn-primary w-full">Compare Scenarios</button>

      {result && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Comparison Results</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-blue-600">${result.final1.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Scenario A Final</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-green-600">${result.final2.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Scenario B Final</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-purple-600">${Math.abs(result.difference).toLocaleString()}</div>
              <div className="text-xs text-zinc-500">{result.difference > 0 ? 'B earns more' : 'A earns more'}</div>
            </div>
          </div>
        </div>
      )}

      {result && result.chart.length > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Year-by-Year Growth</h3>
          <div className="space-y-1 text-xs">
            {result.chart.slice(0, 11).map((c) => (
              <div key={c.year} className="bg-white rounded p-2 flex justify-between">
                <span>Year {c.year}</span>
                <span className="text-blue-600">$${c.value1.toLocaleString()}</span>
                <span className="text-green-600">$${c.value2.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compound Interest Formula</h3>
        <div className="text-xs text-zinc-600">
          Formula: P × (1 + r)^n + C × ((1 + r)^n - 1) / r. P = principal, r = rate, n = years, C = annual contribution. Compound frequency: annually (assumed). Higher rate = exponential growth. Longer time = more growth. Contributions compound too.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Why Compare?</h3>
        <div className="text-xs text-zinc-600">
          Compare to: see rate impact (5% vs 7%), evaluate investment options, decide on risk/reward, plan savings strategy. Small rate differences compound significantly over time. Example: $10k at 5% for 30 years = $43k, at 7% = $76k. Rate matters more than initial principal over long periods.
        </div>
      </div>
    </main>
  );
}