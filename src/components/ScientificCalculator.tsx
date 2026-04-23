'use client'

import { useState, useMemo } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [lastOperation, setLastOperation] = useState<string | null>(null);

  const appendNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const appendOperator = (op: string) => {
    setDisplay(display + op);
  };

  const calculate = () => {
    try {
      let expression = display;
      // Replace function names with Math functions
      expression = expression.replace(/sin/g, angleMode === 'deg' ? 'Math.sin(Math.PI/180*' : 'Math.sin(');
      expression = expression.replace(/cos/g, angleMode === 'deg' ? 'Math.cos(Math.PI/180*' : 'Math.cos(');
      expression = expression.replace(/tan/g, angleMode === 'deg' ? 'Math.tan(Math.PI/180*' : 'Math.tan(');
      expression = expression.replace(/log/g, 'Math.log10(');
      expression = expression.replace(/ln/g, 'Math.log(');
      expression = expression.replace(/sqrt/g, 'Math.sqrt(');
      expression = expression.replace(/abs/g, 'Math.abs(');
      expression = expression.replace(/\^/g, '**');
      expression = expression.replace(/π/g, 'Math.PI');
      expression = expression.replace(/e(?![a-z])/g, 'Math.E');

      // Fix angle mode parentheses
      if (angleMode === 'deg') {
        const trigCount = (expression.match(/Math\.sin\(|Math\.cos\(|Math\.tan\(/g) || []).length;
        for (let i = 0; i < trigCount; i++) {
          expression = expression.replace(/\)$/, ')');
        }
        expression = expression.replace(/Math\.sin\(Math\.PI\/180\(/g, 'Math.sin(Math.PI/180*');
        expression = expression.replace(/Math\.cos\(Math\.PI\/180\(/g, 'Math.cos(Math.PI/180*');
        expression = expression.replace(/Math\.tan\(Math\.PI\/180\(/g, 'Math.tan(Math.PI/180*');
      }

      const result = eval(expression);
      const roundedResult = Math.round(result * 1000000000) / 1000000000;
      setHistory([...history, `${display} = ${roundedResult}`]);
      setDisplay(String(roundedResult));
      setLastOperation(display);
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => setDisplay('0');
  const clearAll = () => {
    setDisplay('0');
    setHistory([]);
  };

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const memoryAdd = () => setMemory(memory + parseFloat(display) || 0);
  const memorySub = () => setMemory(memory - parseFloat(display) || 0);
  const memoryRecall = () => setDisplay(String(memory));
  const memoryClear = () => setMemory(0);

  const scientificFunction = (func: string) => {
    try {
      let result: number;
      const num = parseFloat(display);

      switch (func) {
        case 'sin': result = angleMode === 'deg' ? Math.sin(num * Math.PI / 180) : Math.sin(num); break;
        case 'cos': result = angleMode === 'deg' ? Math.cos(num * Math.PI / 180) : Math.cos(num); break;
        case 'tan': result = angleMode === 'deg' ? Math.tan(num * Math.PI / 180) : Math.tan(num); break;
        case 'asin': result = angleMode === 'deg' ? Math.asin(num) * 180 / Math.PI : Math.asin(num); break;
        case 'acos': result = angleMode === 'deg' ? Math.acos(num) * 180 / Math.PI : Math.acos(num); break;
        case 'atan': result = angleMode === 'deg' ? Math.atan(num) * 180 / Math.PI : Math.atan(num); break;
        case 'log': result = Math.log10(num); break;
        case 'ln': result = Math.log(num); break;
        case 'sqrt': result = Math.sqrt(num); break;
        case 'square': result = num * num; break;
        case 'cube': result = num * num * num; break;
        case 'inv': result = 1 / num; break;
        case 'abs': result = Math.abs(num); break;
        case 'exp': result = Math.exp(num); break;
        case 'factorial': result = factorial(Math.floor(num)); break;
        default: result = num;
      }

      setHistory([...history, `${func}(${num}) = ${result}`]);
      setDisplay(String(Math.round(result * 1000000000) / 1000000000));
    } catch {
      setDisplay('Error');
    }
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const constants: Record<string, number> = {
    'π': Math.PI,
    'e': Math.E,
  };

  const insertConstant = (c: string) => {
    setDisplay(display === '0' ? String(constants[c]) : display + constants[c].toString());
  };

  const negate = () => {
    const num = parseFloat(display);
    setDisplay(String(-num));
  };

  const percent = () => {
    const num = parseFloat(display);
    setDisplay(String(num / 100));
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Scientific Calculator</h1>
      <p className="text-zinc-600">Advanced calculator with trigonometric, logarithmic, and scientific functions.</p>

      <div className="card">
        {/* Angle Mode */}
        <div className="flex gap-2 mb-2">
          <button onClick={() => setAngleMode('deg')} className={`px-3 py-1 rounded ${angleMode === 'deg' ? 'bg-blue-500 text-white' : 'bg-zinc-100'}`}>
            DEG
          </button>
          <button onClick={() => setAngleMode('rad')} className={`px-3 py-1 rounded ${angleMode === 'rad' ? 'bg-blue-500 text-white' : 'bg-zinc-100'}`}>
            RAD
          </button>
          <div className="flex-1 text-right text-sm text-zinc-500">
            Memory: {memory}
          </div>
        </div>

        {/* Display */}
        <div className="bg-zinc-900 text-white text-right p-4 rounded mb-2">
          <div className="text-3xl font-mono overflow-x-auto">{display}</div>
        </div>

        {/* Memory Buttons */}
        <div className="grid grid-cols-4 gap-1 mb-2">
          <button onClick={memoryAdd} className="bg-zinc-200 p-2 rounded text-sm hover:bg-zinc-300">M+</button>
          <button onClick={memorySub} className="bg-zinc-200 p-2 rounded text-sm hover:bg-zinc-300">M-</button>
          <button onClick={memoryRecall} className="bg-zinc-200 p-2 rounded text-sm hover:bg-zinc-300">MR</button>
          <button onClick={memoryClear} className="bg-zinc-200 p-2 rounded text-sm hover:bg-zinc-300">MC</button>
        </div>

        {/* Scientific Functions */}
        <div className="grid grid-cols-8 gap-1 mb-2 text-sm">
          <button onClick={() => scientificFunction('sin')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">sin</button>
          <button onClick={() => scientificFunction('cos')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">cos</button>
          <button onClick={() => scientificFunction('tan')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">tan</button>
          <button onClick={() => scientificFunction('asin')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">asin</button>
          <button onClick={() => scientificFunction('acos')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">acos</button>
          <button onClick={() => scientificFunction('atan')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">atan</button>
          <button onClick={() => scientificFunction('log')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">log</button>
          <button onClick={() => scientificFunction('ln')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">ln</button>
          <button onClick={() => scientificFunction('sqrt')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">√</button>
          <button onClick={() => scientificFunction('square')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">x²</button>
          <button onClick={() => scientificFunction('cube')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">x³</button>
          <button onClick={() => scientificFunction('inv')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">1/x</button>
          <button onClick={() => scientificFunction('abs')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">|x|</button>
          <button onClick={() => scientificFunction('exp')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">eˣ</button>
          <button onClick={() => scientificFunction('factorial')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">n!</button>
          <button onClick={() => appendOperator('^')} className="bg-blue-100 p-2 rounded hover:bg-blue-200">xʸ</button>
        </div>

        {/* Constants */}
        <div className="grid grid-cols-4 gap-1 mb-2">
          <button onClick={() => insertConstant('π')} className="bg-purple-100 p-2 rounded hover:bg-purple-200">π</button>
          <button onClick={() => insertConstant('e')} className="bg-purple-100 p-2 rounded hover:bg-purple-200">e</button>
          <button onClick={negate} className="bg-zinc-200 p-2 rounded hover:bg-zinc-300">±</button>
          <button onClick={percent} className="bg-zinc-200 p-2 rounded hover:bg-zinc-300">%</button>
        </div>

        {/* Basic Calculator */}
        <div className="grid grid-cols-5 gap-1">
          {/* Clear */}
          <button onClick={clearAll} className="bg-red-100 p-3 rounded hover:bg-red-200 font-medium">AC</button>
          <button onClick={clear} className="bg-red-100 p-3 rounded hover:bg-red-200">C</button>
          <button onClick={backspace} className="bg-zinc-200 p-3 rounded hover:bg-zinc-300">⌫</button>
          <button onClick={() => appendOperator('(')} className="bg-zinc-200 p-3 rounded hover:bg-zinc-300">(</button>
          <button onClick={() => appendOperator(')')} className="bg-zinc-200 p-3 rounded hover:bg-zinc-300">)</button>

          {/* Numbers Row 1 */}
          <button onClick={() => appendNumber('7')} className="bg-white border p-3 rounded hover:bg-zinc-50">7</button>
          <button onClick={() => appendNumber('8')} className="bg-white border p-3 rounded hover:bg-zinc-50">8</button>
          <button onClick={() => appendNumber('9')} className="bg-white border p-3 rounded hover:bg-zinc-50">9</button>
          <button onClick={() => appendOperator('/')} className="bg-orange-100 p-3 rounded hover:bg-orange-200">÷</button>
          <button onClick={() => appendOperator('*')} className="bg-orange-100 p-3 rounded hover:bg-orange-200">×</button>

          {/* Numbers Row 2 */}
          <button onClick={() => appendNumber('4')} className="bg-white border p-3 rounded hover:bg-zinc-50">4</button>
          <button onClick={() => appendNumber('5')} className="bg-white border p-3 rounded hover:bg-zinc-50">5</button>
          <button onClick={() => appendNumber('6')} className="bg-white border p-3 rounded hover:bg-zinc-50">6</button>
          <button onClick={() => appendOperator('-')} className="bg-orange-100 p-3 rounded hover:bg-orange-200">−</button>
          <button onClick={() => appendOperator('+')} className="bg-orange-100 p-3 rounded hover:bg-orange-200">+</button>

          {/* Numbers Row 3 */}
          <button onClick={() => appendNumber('1')} className="bg-white border p-3 rounded hover:bg-zinc-50">1</button>
          <button onClick={() => appendNumber('2')} className="bg-white border p-3 rounded hover:bg-zinc-50">2</button>
          <button onClick={() => appendNumber('3')} className="bg-white border p-3 rounded hover:bg-zinc-50">3</button>
          <button onClick={() => appendNumber('.')} className="bg-white border p-3 rounded hover:bg-zinc-50">.</button>
          <button onClick={calculate} className="bg-green-500 text-white p-3 rounded hover:bg-green-600 font-medium">=</button>

          {/* Zero */}
          <button onClick={() => appendNumber('0')} className="bg-white border p-3 rounded hover:bg-zinc-50 col-span-3">0</button>
          <button onClick={() => setDisplay(lastOperation || '0')} className="bg-zinc-200 p-3 rounded hover:bg-zinc-300 text-sm">Last</button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">History</h3>
          <div className="space-y-1 text-sm">
            {history.slice(-10).reverse().map((h, i) => (
              <div key={i} className="bg-white rounded p-2">{h}</div>
            ))}
          </div>
          <button onClick={() => setHistory([])} className="mt-2 px-3 py-1 text-xs bg-zinc-200 rounded hover:bg-zinc-300">
            Clear History
          </button>
        </div>
      )}

      {/* Function Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Function Reference</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">sin/cos/tan:</span> Trigonometric functions ({angleMode})
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">log:</span> Base-10 logarithm (log₁₀)
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">ln:</span> Natural logarithm (logₑ)
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">√:</span> Square root
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">π:</span> Pi ≈ 3.14159
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">e:</span> Euler&apos;s number ≈ 2.718
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">n!:</span> Factorial (n × n-1 × ... × 1)
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">xʸ:</span> Power (x raised to y)
          </div>
        </div>
      </div>
    </main>
  );
}