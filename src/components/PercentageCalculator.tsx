'use client'

import { useState, useMemo } from 'react';

export default function PercentageCalculator() {
  const [mode, setMode] = useState('percentageOf');
  const [number1, setNumber1] = useState(100);
  const [number2, setNumber2] = useState(25);
  const [number3, setNumber3] = useState(50);

  const result = useMemo(() => {
    switch (mode) {
      case 'percentageOf':
        return {
          question: `What is ${number2}% of ${number1}?`,
          answer: number1 * (number2 / 100),
          formula: `${number1} × ${number2}% = ${number1} × ${number2 / 100}`,
        };
      case 'whatPercent':
        return {
          question: `${number2} is what percent of ${number1}?`,
          answer: (number2 / number1) * 100,
          formula: `${number2} ÷ ${number1} × 100`,
        };
      case 'percentChange':
        const change = number2 - number1;
        const percentChange = (change / number1) * 100;
        return {
          question: `Percent change from ${number1} to ${number2}`,
          answer: percentChange,
          formula: `(${number2} - ${number1}) ÷ ${number1} × 100`,
          isIncrease: percentChange > 0,
        };
      case 'percentIncrease':
        return {
          question: `${number1} + ${number2}% increase`,
          answer: number1 * (1 + number2 / 100),
          formula: `${number1} × (1 + ${number2 / 100})`,
        };
      case 'percentDecrease':
        return {
          question: `${number1} - ${number2}% decrease`,
          answer: number1 * (1 - number2 / 100),
          formula: `${number1} × (1 - ${number2 / 100})`,
        };
      case 'percentDifference':
        const diff = Math.abs(number2 - number1);
        const avg = (number1 + number2) / 2;
        return {
          question: `Percent difference between ${number1} and ${number2}`,
          answer: (diff / avg) * 100,
          formula: `|${number2} - ${number1}| ÷ ((${number1} + ${number2}) ÷ 2) × 100`,
        };
      case 'originalFromPercent':
        return {
          question: `${number2} is ${number3}% of what number?`,
          answer: number2 / (number3 / 100),
          formula: `${number2} ÷ ${number3 / 100}`,
        };
      default:
        return { question: '', answer: 0, formula: '' };
    }
  }, [mode, number1, number2, number3]);

  const formatNumber = (n: number) => {
    if (mode === 'whatPercent' || mode === 'percentChange' || mode === 'percentDifference') {
      return `${n.toFixed(2)}%`;
    }
    return n.toFixed(2);
  };

  const modes = [
    { id: 'percentageOf', label: '% of Number', icon: '÷', inputs: ['number1', 'number2'] },
    { id: 'whatPercent', label: 'What %', icon: '?', inputs: ['number1', 'number2'] },
    { id: 'percentChange', label: '% Change', icon: '↔', inputs: ['number1', 'number2'] },
    { id: 'percentIncrease', label: '% Increase', icon: '↑', inputs: ['number1', 'number2'] },
    { id: 'percentDecrease', label: '% Decrease', icon: '↓', inputs: ['number1', 'number2'] },
    { id: 'percentDifference', label: '% Difference', icon: '≠', inputs: ['number1', 'number2'] },
    { id: 'originalFromPercent', label: 'Find Original', icon: '←', inputs: ['number2', 'number3'] },
  ];

  const currentMode = modes.find(m => m.id === mode);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Percentage Calculator</h1>
      <p className="text-zinc-600">Calculate percentages, percent change, increases, decreases, and more. Multiple calculation modes.</p>

      {/* Mode Selection */}
      <div className="card">
        <div className="grid grid-cols-4 gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded text-center ${mode === m.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              <div className="text-lg mb-1">{m.icon}</div>
              <div className="text-xs">{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="card space-y-4">
        {currentMode?.inputs.includes('number1') && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              {mode === 'percentageOf' ? 'Number' : mode === 'percentChange' ? 'Original Value' : mode === 'whatPercent' ? 'Total' : 'Original Number'}
            </label>
            <input type="number" value={number1} onChange={(e) => setNumber1(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[10, 50, 100, 500, 1000].map((v) => (
                <button key={v} onClick={() => setNumber1(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}</button>
              ))}
            </div>
          </div>
        )}

        {currentMode?.inputs.includes('number2') && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              {mode === 'percentageOf' ? 'Percentage (%)' : mode === 'whatPercent' ? 'Part' : mode === 'percentChange' ? 'New Value' : mode === 'originalFromPercent' ? 'Result' : 'Percentage (%)'}
            </label>
            <input type="number" value={number2} onChange={(e) => setNumber2(Number(e.target.value))} className="w-full" />
          </div>
        )}

        {currentMode?.inputs.includes('number3') && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Percentage (%)</label>
            <input type="number" value={number3} onChange={(e) => setNumber3(Number(e.target.value))} className="w-full" />
          </div>
        )}
      </div>

      {/* Result */}
      <div className="card">
        <div className="text-center p-4">
          <div className="text-sm text-zinc-500 mb-2">{result.question}</div>
          <div className={`text-4xl font-bold ${
            mode === 'percentChange' && result.isIncrease !== undefined
              ? result.isIncrease ? 'text-green-600' : 'text-red-600'
              : 'text-blue-600'
          }`}>
            {formatNumber(result.answer)}
          </div>
          {mode === 'percentChange' && (
            <div className={`text-sm mt-2 ${result.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
              {result.isIncrease ? '↑ Increase' : '↓ Decrease'}
            </div>
          )}
        </div>
        <div className="bg-zinc-50 rounded p-3 text-sm text-zinc-600 text-center">
          Formula: {result.formula}
        </div>
      </div>

      {/* Examples */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Percentage Calculations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Tips:</span> 20% of $50 = $10
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Discounts:</span> 30% off $100 = $70
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Grades:</span> 85/100 = 85%
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Growth:</span> $50 to $60 = 20% increase
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="card">
        <h3 className="font-medium mb-2">Percentage Quick Reference</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {['1%', '5%', '10%', '15%', '20%', '25%', '30%', '50%', '75%', '100%'].map((p) => (
            <div key={p} className="bg-zinc-50 rounded p-2 text-center">
              <div className="font-medium">{p}</div>
              <div className="text-zinc-600">= {parseFloat(p) / 100}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}