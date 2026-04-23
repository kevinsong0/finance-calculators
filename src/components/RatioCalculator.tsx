'use client'

import { useState, useMemo } from 'react';

export default function RatioCalculator() {
  const [mode, setMode] = useState('simplify');
  const [a, setA] = useState(12);
  const [b, setB] = useState(18);
  const [c, setC] = useState(24);
  const [d, setD] = useState(36);
  const [targetRatio, setTargetRatio] = useState('');
  const [scale, setScale] = useState(2);

  const gcd = (x: number, y: number): number => {
    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  const calculation = useMemo(() => {
    if (mode === 'simplify') {
      const divisor = gcd(a, b);
      return {
        original: `${a}:${b}`,
        simplified: `${a / divisor}:${b / divisor}`,
        divisor,
        decimal: a / b,
        percent: `${((a / b) * 100).toFixed(2)}%`,
        fraction: `${a / divisor}/${b / divisor}`,
      };
    }

    if (mode === 'equivalent') {
      const ratioA = a / b;
      const ratioC = c / d;
      const isEquivalent = Math.abs(ratioA - ratioC) < 0.0001;
      const multiplierAtoC = c / a;
      const multiplierBtoD = d / b;
      return {
        firstRatio: `${a}:${b}`,
        secondRatio: `${c}:${d}`,
        isEquivalent,
        decimalA: ratioA.toFixed(4),
        decimalC: ratioC.toFixed(4),
        explanation: isEquivalent
          ? `Both ratios equal ${ratioA.toFixed(4)}. ${c} = ${a} × ${multiplierAtoC.toFixed(2)}, ${d} = ${b} × ${multiplierBtoD.toFixed(2)}`
          : `Not equivalent: ${a}:${b} = ${ratioA.toFixed(4)}, ${c}:${d} = ${ratioC.toFixed(4)}`,
      };
    }

    if (mode === 'scale') {
      const divisor = gcd(a, b);
      const simplifiedA = a / divisor;
      const simplifiedB = b / divisor;
      const scaledA = simplifiedA * scale;
      const scaledB = simplifiedB * scale;
      return {
        original: `${a}:${b}`,
        simplified: `${simplifiedA}:${simplifiedB}`,
        scaled: `${scaledA}:${scaledB}`,
        scale,
        divisor,
      };
    }

    if (mode === 'solve') {
      // Solve for x in a:b = c:x format
      // If user enters "3:4 = 9:x", we solve x = 12
      const match = targetRatio.match(/^(\d+):(\d+)\s*=\s*(\d+):x$/);
      if (match) {
        const [, num1, num2, num3] = match;
        const x = (Number(num2) * Number(num3)) / Number(num1);
        return {
          equation: `${num1}:${num2} = ${num3}:${x.toFixed(2)}`,
          solution: `x = ${x.toFixed(2)}`,
          explanation: `${num1}/${num2} = ${num3}/x → x = ${num2} × ${num3} / ${num1} = ${x.toFixed(2)}`,
        };
      }
      return { error: 'Enter format like "3:4 = 9:x"' };
    }

    if (mode === 'compare') {
      const ratioA = a / b;
      const ratioC = c / d;
      const difference = ratioA - ratioC;
      const percentDiff = ((ratioA / ratioC - 1) * 100).toFixed(2);
      return {
        firstRatio: `${a}:${b}`,
        secondRatio: `${c}:${d}`,
        decimalA: ratioA.toFixed(4),
        decimalC: ratioC.toFixed(4),
        difference: difference.toFixed(4),
        percentDiff: percentDiff,
        larger: ratioA > ratioC ? `${a}:${b}` : ratioA < ratioC ? `${c}:${d}` : 'Equal',
      };
    }

    return null;
  }, [mode, a, b, c, d, targetRatio, scale]);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Ratio Calculator</h1>
      <p className="text-zinc-600">Simplify ratios, find equivalent ratios, scale ratios, and solve ratio problems.</p>

      <div className="card space-y-4">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Calculation Mode</label>
          <div className="flex gap-2">
            {[
              { id: 'simplify', name: 'Simplify' },
              { id: 'equivalent', name: 'Equivalent' },
              { id: 'scale', name: 'Scale' },
              { id: 'solve', name: 'Solve for X' },
              { id: 'compare', name: 'Compare' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-4 py-2 rounded ${mode === m.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Simplify Mode */}
        {mode === 'simplify' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">First Number (A)</label>
              <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Second Number (B)</label>
              <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        )}

        {/* Equivalent Mode */}
        {mode === 'equivalent' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Ratio 1 (A:B)</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
                <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Ratio 2 (C:D)</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full" />
                <input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Scale Mode */}
        {mode === 'scale' && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">First Number (A)</label>
                <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Second Number (B)</label>
                <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Scale Factor</label>
              <input type="number" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full" />
              <div className="flex gap-2 mt-2">
                {[2, 3, 4, 5, 10].map((s) => (
                  <button key={s} onClick={() => setScale(s)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                    ×{s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solve Mode */}
        {mode === 'solve' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Ratio Equation (e.g., "3:4 = 9:x")</label>
            <input
              type="text"
              value={targetRatio}
              onChange={(e) => setTargetRatio(e.target.value)}
              className="w-full"
              placeholder="3:4 = 9:x"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setTargetRatio('3:4 = 9:x')} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                3:4 = 9:x
              </button>
              <button onClick={() => setTargetRatio('5:2 = 15:x')} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                5:2 = 15:x
              </button>
              <button onClick={() => setTargetRatio('1:3 = x:27')} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                1:3 = x:27
              </button>
            </div>
          </div>
        )}

        {/* Compare Mode */}
        {mode === 'compare' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Ratio 1 (A:B)</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full" />
                <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Ratio 2 (C:D)</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full" />
                <input type="number" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {calculation && !calculation.error && (
        <div className="card bg-blue-50 text-center p-6">
          {mode === 'simplify' && (
            <>
              <div className="text-sm text-zinc-500 mb-2">Simplified Ratio</div>
              <div className="text-4xl font-bold text-blue-600">{calculation.simplified}</div>
              <div className="text-sm text-zinc-600 mt-2">
                Original: {calculation.original} (divided by {calculation.divisor})
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Decimal</div>
                  <div className="font-medium">{(calculation.decimal as number)?.toFixed(4)}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Percent</div>
                  <div className="font-medium">{calculation.percent}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Fraction</div>
                  <div className="font-medium">{calculation.fraction}</div>
                </div>
              </div>
            </>
          )}

          {mode === 'equivalent' && (
            <>
              <div className={`text-4xl font-bold ${calculation.isEquivalent ? 'text-green-600' : 'text-red-600'}`}>
                {calculation.isEquivalent ? 'Equivalent' : 'Not Equivalent'}
              </div>
              <div className="text-sm text-zinc-600 mt-2">
                {calculation.firstRatio} = {calculation.decimalA} vs {calculation.secondRatio} = {calculation.decimalC}
              </div>
              <div className="text-sm text-zinc-500 mt-2">{calculation.explanation}</div>
            </>
          )}

          {mode === 'scale' && (
            <>
              <div className="text-sm text-zinc-500 mb-2">Scaled Ratio</div>
              <div className="text-4xl font-bold text-blue-600">{calculation.scaled}</div>
              <div className="text-sm text-zinc-600 mt-2">
                {calculation.simplified} × {calculation.scale} = {calculation.scaled}
              </div>
              <div className="text-sm text-zinc-500 mt-2">
                Original {calculation.original} → Simplified {calculation.simplified}
              </div>
            </>
          )}

          {mode === 'solve' && (
            <>
              <div className="text-sm text-zinc-500 mb-2">Solution</div>
              <div className="text-4xl font-bold text-blue-600">{calculation.solution}</div>
              <div className="text-sm text-zinc-600 mt-2">{calculation.explanation}</div>
            </>
          )}

          {mode === 'compare' && (
            <>
              <div className="text-sm text-zinc-500 mb-2">Comparison Result</div>
              <div className="text-2xl font-bold text-blue-600">{calculation.larger} is larger</div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">{calculation.firstRatio}</div>
                  <div className="font-medium">{calculation.decimalA}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Difference</div>
                  <div className="font-medium">{calculation.difference}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">{calculation.secondRatio}</div>
                  <div className="font-medium">{calculation.decimalC}</div>
                </div>
              </div>
              <div className="text-sm text-zinc-600 mt-2">
                {calculation.percentDiff}% difference
              </div>
            </>
          )}
        </div>
      )}

      {calculation?.error && (
        <div className="card bg-red-50 text-center p-6">
          <div className="text-red-600">{calculation.error}</div>
        </div>
      )}

      {/* Common Ratios */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Ratios</h3>
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1:1</div>
            <div className="text-zinc-600">Equal</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1:2</div>
            <div className="text-zinc-600">Half</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">2:1</div>
            <div className="text-zinc-600">Double</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">3:4</div>
            <div className="text-zinc-600">75%</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1:3</div>
            <div className="text-zinc-600">33%</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">4:5</div>
            <div className="text-zinc-600">80%</div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Real-World Ratio Applications</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Recipes:</span> 2:1 flour to water ratio for dough
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Finance:</span> 3:1 debt to income ratio limit
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Mixing:</span> 4:1 paint thinner ratio
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Photos:</span> 4:3, 16:9 aspect ratios
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Scale:</span> 1:1000 map scale ratio
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Probability:</span> 1:6 dice roll ratio
          </div>
        </div>
      </div>
    </main>
  );
}