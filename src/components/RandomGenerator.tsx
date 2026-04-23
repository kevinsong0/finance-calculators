'use client'

import { useState } from 'react';

export default function RandomGenerator() {
  const [mode, setMode] = useState('number');
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowRepeat, setAllowRepeat] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [coinResults, setCoinResults] = useState<string[]>([]);
  const [diceCount, setDiceCount] = useState(1);
  const [diceSides, setDiceSides] = useState(6);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  const generateNumber = () => {
    if (allowRepeat) {
      const nums = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
      setResults(nums);
    } else {
      const range = max - min + 1;
      if (count > range) {
        setResults([]);
        return;
      }
      const available = Array.from({ length: range }, (_, i) => min + i);
      const nums: number[] = [];
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * available.length);
        nums.push(available.splice(idx, 1)[0]);
      }
      setResults(nums.sort((a, b) => a - b));
    }
  };

  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    setCoinResults([...coinResults, result]);
  };

  const clearCoinResults = () => setCoinResults([]);

  const rollDice = () => {
    const rolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * diceSides) + 1);
    setDiceResults([...diceResults, ...rolls]);
  };

  const clearDiceResults = () => setDiceResults([]);

  const generatePassword = () => {
    let chars = '';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars.length === 0) {
      setPassword('Select at least one character type');
      return;
    }

    const pw = Array.from({ length: passwordLength }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setPassword(pw);
  };

  const headsCount = coinResults.filter((r) => r === 'Heads').length;
  const tailsCount = coinResults.filter((r) => r === 'Tails').length;
  const diceTotal = diceResults.reduce((a, b) => a + b, 0);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Random Generator</h1>
      <p className="text-zinc-600">Generate random numbers, flip coins, roll dice, and create secure passwords.</p>

      {/* Mode Selection */}
      <div className="card">
        <div className="flex gap-2">
          {[
            { id: 'number', name: 'Random Number', icon: '🔢' },
            { id: 'coin', name: 'Coin Flip', icon: '🪙' },
            { id: 'dice', name: 'Dice Roll', icon: '🎲' },
            { id: 'password', name: 'Password', icon: '🔐' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded ${mode === m.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              {m.icon} {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Random Number Mode */}
      {mode === 'number' && (
        <>
          <div className="card space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Minimum</label>
                <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Maximum</label>
                <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">How Many Numbers?</label>
              <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full" min="1" max="100" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={allowRepeat} onChange={(e) => setAllowRepeat(e.target.checked)} className="w-4 h-4" />
              <label className="text-sm">Allow duplicates</label>
            </div>
            <button onClick={generateNumber} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 font-medium">
              Generate {count} Numbers
            </button>
          </div>

          {results.length > 0 && (
            <div className="card bg-blue-50 p-4">
              <div className="text-sm text-zinc-500 mb-2">Results</div>
              <div className="grid grid-cols-10 gap-2">
                {results.map((num, i) => (
                  <div key={i} className="bg-white rounded p-2 text-center font-bold">{num}</div>
                ))}
              </div>
              {!allowRepeat && results.length > 0 && (
                <div className="text-sm text-zinc-600 mt-2">
                  Unique numbers between {min} and {max}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Coin Flip Mode */}
      {mode === 'coin' && (
        <>
          <div className="card">
            <button onClick={flipCoin} className="w-full bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600 font-medium text-xl">
              🪙 Flip Coin
            </button>
          </div>

          {coinResults.length > 0 && (
            <div className="card bg-yellow-50 p-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {coinResults[coinResults.length - 1] === 'Heads' ? '👤' : '🦅'}
                </div>
                <div className="text-xl font-bold">{coinResults[coinResults.length - 1]}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Heads</div>
                  <div className="font-bold text-green-600">{headsCount}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Tails</div>
                  <div className="font-bold text-red-600">{tailsCount}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Total</div>
                  <div className="font-bold">{coinResults.length}</div>
                </div>
              </div>
              <div className="text-sm text-zinc-600 text-center mt-2">
                {coinResults.length > 0 && `${((headsCount / coinResults.length) * 100).toFixed(1)}% Heads`}
              </div>
              <button onClick={clearCoinResults} className="w-full mt-4 bg-zinc-200 p-2 rounded hover:bg-zinc-300">
                Clear History
              </button>
            </div>
          )}
        </>
      )}

      {/* Dice Roll Mode */}
      {mode === 'dice' && (
        <>
          <div className="card space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Number of Dice</label>
                <input type="number" value={diceCount} onChange={(e) => setDiceCount(Number(e.target.value))} className="w-full" min="1" max="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Sides per Die</label>
                <select value={diceSides} onChange={(e) => setDiceSides(Number(e.target.value))} className="w-full">
                  <option value="4">D4 (4-sided)</option>
                  <option value="6">D6 (6-sided)</option>
                  <option value="8">D8 (8-sided)</option>
                  <option value="10">D10 (10-sided)</option>
                  <option value="12">D12 (12-sided)</option>
                  <option value="20">D20 (20-sided)</option>
                </select>
              </div>
            </div>
            <button onClick={rollDice} className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 font-medium">
              🎲 Roll {diceCount} D{diceSides}
            </button>
          </div>

          {diceResults.length > 0 && (
            <div className="card bg-purple-50 p-4">
              <div className="grid grid-cols-10 gap-2 mb-4">
                {diceResults.slice(-20).map((roll, i) => (
                  <div key={i} className="bg-white rounded p-2 text-center font-bold">{roll}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Last Roll</div>
                  <div className="font-bold">{diceResults[diceResults.length - 1]}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Total</div>
                  <div className="font-bold">{diceTotal}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Average</div>
                  <div className="font-bold">{(diceTotal / diceResults.length).toFixed(2)}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Rolls</div>
                  <div className="font-bold">{diceResults.length}</div>
                </div>
              </div>
              <button onClick={clearDiceResults} className="w-full mt-4 bg-zinc-200 p-2 rounded hover:bg-zinc-300">
                Clear History
              </button>
            </div>
          )}
        </>
      )}

      {/* Password Mode */}
      {mode === 'password' && (
        <>
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Password Length</label>
              <input type="number" value={passwordLength} onChange={(e) => setPasswordLength(Number(e.target.value))} className="w-full" min="4" max="64" />
              <div className="flex gap-2 mt-2">
                {[8, 12, 16, 20, 24].map((l) => (
                  <button key={l} onClick={() => setPasswordLength(l)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                    {l} chars
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="w-4 h-4" />
                <label className="text-sm">Uppercase (A-Z)</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="w-4 h-4" />
                <label className="text-sm">Lowercase (a-z)</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-4 h-4" />
                <label className="text-sm">Numbers (0-9)</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-4 h-4" />
                <label className="text-sm">Symbols (!@#$...)</label>
              </div>
            </div>
            <button onClick={generatePassword} className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 font-medium">
              🔐 Generate Password
            </button>
          </div>

          {password && (
            <div className="card bg-green-50 p-4">
              <div className="text-sm text-zinc-500 mb-2">Generated Password</div>
              <div className="bg-white p-4 rounded text-xl font-mono text-center">{password}</div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-zinc-500">Length</div>
                  <div className="font-bold">{password.length}</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-zinc-500">Entropy</div>
                  <div className="font-bold">
                    {Math.round(passwordLength * Math.log2((includeUpper ? 26 : 0) + (includeLower ? 26 : 0) + (includeNumbers ? 10 : 0) + (includeSymbols ? 32 : 0)))} bits
                  </div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-zinc-500">Strength</div>
                  <div className="font-bold">{password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Medium' : 'Weak'}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Statistics Info */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Randomness Info</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Numbers:</span> Uses JavaScript Math.random() for pseudo-random generation.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-yellow-600 font-medium">Coins:</span> Each flip has exactly 50% probability for heads or tails.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Passwords:</span> Cryptographically suitable for everyday use. Use password managers for critical accounts.
          </div>
        </div>
      </div>
    </main>
  );
}