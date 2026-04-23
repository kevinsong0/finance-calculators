'use client'

import { useState, useMemo } from 'react';

export default function TippingCalculator() {
  const [billAmount, setBillAmount] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [splitCount, setSplitCount] = useState(1);
  const [roundUp, setRoundUp] = useState(false);

  const result = useMemo(() => {
    const tip = billAmount * (tipPercent / 100);
    const total = billAmount + tip;
    const perPerson = total / splitCount;
    const roundedPerPerson = roundUp ? Math.ceil(perPerson) : perPerson;
    const roundedTotal = roundedPerPerson * splitCount;
    return {
      tip,
      total,
      perPerson,
      roundedPerPerson,
      roundedTotal,
      extraFromRounding: roundedTotal - total
    };
  }, [billAmount, tipPercent, splitCount, roundUp]);

  const formatMoney = (n: number) => `$${n.toFixed(2)}`;

  const tipPresets = [15, 18, 20, 22, 25];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tipping Calculator</h1>
      <p className="text-zinc-600">Calculate tips for restaurants, delivery, and services. Split bills with friends.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Bill Amount ($)</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(Number(e.target.value))}
            className="w-full"
            min="0"
            step="1"
          />
          <div className="flex gap-2 mt-2">
            {[20, 50, 75, 100, 150].map((v) => (
              <button
                key={v}
                onClick={() => setBillAmount(v)}
                className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
              >
                ${v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Tip Percentage (%)</label>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(Number(e.target.value))}
            className="w-full"
            min="0"
            max="100"
            step="1"
          />
          <div className="flex gap-2 mt-2">
            {tipPresets.map((v) => (
              <button
                key={v}
                onClick={() => setTipPercent(v)}
                className={`px-3 py-1 text-xs rounded ${tipPercent === v ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {v}%{v === 15 && ' (OK)'}{v === 18 && ' (Good)'}{v === 20 && ' (Great)'}{v === 22 && ' (Excellent)'}{v === 25 && ' (Amazing)'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Split Between</label>
          <input
            type="number"
            value={splitCount}
            onChange={(e) => setSplitCount(Math.max(1, Number(e.target.value)))}
            className="w-full"
            min="1"
            max="20"
          />
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <button
                key={v}
                onClick={() => setSplitCount(v)}
                className={`px-3 py-1 text-xs rounded ${splitCount === v ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {v} {v === 1 ? 'person' : 'people'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="roundUp"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="roundUp" className="text-sm text-zinc-700">
            Round up each person&apos;s share
          </label>
        </div>
      </div>

      <div className="card">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Tip Amount</div>
            <div className="text-2xl font-bold text-green-600">{formatMoney(result.tip)}</div>
            <div className="text-xs text-zinc-500">{tipPercent}% of bill</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Total with Tip</div>
            <div className="text-2xl font-bold text-blue-600">{formatMoney(result.total)}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-zinc-600 mb-1">Per Person</div>
            <div className="text-2xl font-bold text-purple-600">
              {formatMoney(roundUp ? result.roundedPerPerson : result.perPerson)}
            </div>
            {splitCount > 1 && (
              <div className="text-xs text-zinc-500">Split {splitCount} ways</div>
            )}
          </div>
        </div>

        {roundUp && result.extraFromRounding > 0 && (
          <div className="bg-yellow-50 rounded-lg p-3 text-sm">
            <span className="text-yellow-700">
              Rounding adds {formatMoney(result.extraFromRounding)} extra tip ({formatMoney(result.roundedTotal)} total)
            </span>
          </div>
        )}

        <div className="mt-4 p-4 bg-zinc-50 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-700 mb-2">Quick Reference</h3>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {tipPresets.map((p) => (
              <div key={p} className="bg-white rounded p-2">
                <div className="font-medium">{p}%</div>
                <div className="text-zinc-600">{formatMoney(billAmount * p / 100)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}