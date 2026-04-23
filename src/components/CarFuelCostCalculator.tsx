'use client'

import { useState, useMemo } from 'react';

export default function CarFuelCostCalculator() {
  const [miles, setMiles] = useState(12000);
  const [mpg, setMpg] = useState(25);
  const [price, setPrice] = useState(3.50);

  const result = useMemo(() => {
    const gallons = miles / mpg;
    const monthlyCost = gallons * price / 12;
    const annualCost = gallons * price;
    return { gallons, monthlyCost, annualCost };
  }, [miles, mpg, price]);

  const formatMoney = (n: number) => `$${n.toFixed(2)}`;

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Car Fuel Cost Calculator</h1>
      <p className="text-zinc-600">Calculate annual and monthly fuel costs based on driving distance and MPG.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Annual Miles Driven</label>
          <input type="number" value={miles} onChange={(e) => setMiles(Number(e.target.value))} className="w-full" />
          <div className="flex gap-2 mt-2">
            {[6000, 12000, 15000, 20000].map((v) => (
              <button key={v} onClick={() => setMiles(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">MPG (Miles Per Gallon)</label>
          <input type="number" value={mpg} onChange={(e) => setMpg(Number(e.target.value))} className="w-full" />
          <div className="flex gap-2 mt-2">
            {[15, 20, 25, 30, 35, 40].map((v) => (
              <button key={v} onClick={() => setMpg(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Gas Price ($/gallon)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} step={0.1} className="w-full" />
          <div className="flex gap-2 mt-2">
            {[2.50, 3.00, 3.50, 4.00, 4.50].map((v) => (
              <button key={v} onClick={() => setPrice(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">${v}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Gallons/Year</div>
            <div className="text-lg font-bold text-blue-600">{result.gallons.toFixed(0)}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Monthly Cost</div>
            <div className="text-lg font-bold text-green-600">{formatMoney(result.monthlyCost)}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Annual Cost</div>
            <div className="text-lg font-bold text-orange-600">{formatMoney(result.annualCost)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}