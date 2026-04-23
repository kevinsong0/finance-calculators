'use client'

import { useState, useMemo } from 'react';

export default function BinaryCalculator() {
  const [inputType, setInputType] = useState('decimal');
  const [inputValue, setInputValue] = useState('255');
  const [operation, setOperation] = useState('convert');
  const [operand1, setOperand1] = useState('1010');
  const [operand2, setOperand2] = useState('0110');
  const [bits, setBits] = useState(8);

  const conversions = useMemo(() => {
    try {
      let decimal = 0;

      if (inputType === 'decimal') {
        decimal = parseInt(inputValue, 10);
      } else if (inputType === 'binary') {
        decimal = parseInt(inputValue.replace(/\s/g, ''), 2);
      } else if (inputType === 'hex') {
        decimal = parseInt(inputValue.replace(/\s/g, ''), 16);
      } else if (inputType === 'octal') {
        decimal = parseInt(inputValue.replace(/\s/g, ''), 8);
      }

      if (isNaN(decimal)) return null;

      const binary = decimal.toString(2).padStart(bits, '0');
      const hex = decimal.toString(16).toUpperCase();
      const octal = decimal.toString(8);

      return {
        decimal,
        binary,
        hex: hex.length < 2 ? hex.padStart(2, '0') : hex,
        octal,
        signedDecimal: decimal > Math.pow(2, bits - 1) - 1 ? decimal - Math.pow(2, bits) : decimal,
      };
    } catch {
      return null;
    }
  }, [inputType, inputValue, bits]);

  const binaryOperation = useMemo(() => {
    try {
      const a = parseInt(operand1.replace(/\s/g, ''), 2);
      const b = parseInt(operand2.replace(/\s/g, ''), 2);

      if (isNaN(a) || isNaN(b)) return null;

      let result: number;
      let symbol: string;

      switch (operation) {
        case 'add': result = a + b; symbol = '+'; break;
        case 'subtract': result = a - b; symbol = '-'; break;
        case 'multiply': result = a * b; symbol = '×'; break;
        case 'divide': result = Math.floor(a / b); symbol = '/'; break;
        case 'and': result = a & b; symbol = 'AND'; break;
        case 'or': result = a | b; symbol = 'OR'; break;
        case 'xor': result = a ^ b; symbol = 'XOR'; break;
        case 'shiftLeft': result = a << 1; symbol = '<<'; break;
        case 'shiftRight': result = a >> 1; symbol = '>>'; break;
        default: result = a; symbol = '';
      }

      return {
        operand1Decimal: a,
        operand2Decimal: b,
        resultDecimal: result,
        resultBinary: Math.abs(result).toString(2),
        resultHex: Math.abs(result).toString(16).toUpperCase(),
        formula: `${operand1} ${symbol} ${operand2}`,
      };
    } catch {
      return null;
    }
  }, [operation, operand1, operand2]);

  const bitExplanation = useMemo(() => {
    if (!conversions) return null;

    const bitsArray = conversions.binary.split('').map((bit, i) => ({
      position: conversions.binary.length - i - 1,
      value: bit,
      power: Math.pow(2, conversions.binary.length - i - 1),
      contribution: bit === '1' ? Math.pow(2, conversions.binary.length - i - 1) : 0,
    }));

    return bitsArray;
  }, [conversions]);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Binary Calculator</h1>
      <p className="text-zinc-600">Convert between decimal, binary, hexadecimal, and octal. Perform bitwise operations.</p>

      <div className="card space-y-4">
        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Mode</label>
          <div className="flex gap-2">
            <button onClick={() => setOperation('convert')} className={`px-4 py-2 rounded ${operation === 'convert' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
              Convert
            </button>
            <button onClick={() => setOperation('calculate')} className={`px-4 py-2 rounded ${operation === 'calculate' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
              Calculate
            </button>
          </div>
        </div>

        {operation === 'convert' ? (
          <>
            {/* Input Type */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Input Type</label>
              <div className="flex gap-2">
                {[
                  { id: 'decimal', name: 'Decimal' },
                  { id: 'binary', name: 'Binary' },
                  { id: 'hex', name: 'Hex' },
                  { id: 'octal', name: 'Octal' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInputType(type.id)}
                    className={`px-4 py-2 rounded ${inputType === type.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Value */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Value</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full"
                placeholder={inputType === 'binary' ? '10101010' : inputType === 'hex' ? 'FF' : inputType === 'octal' ? '377' : '255'}
              />
            </div>

            {/* Bit Width */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Bit Width</label>
              <div className="flex gap-2">
                {[4, 8, 16, 32, 64].map((b) => (
                  <button key={b} onClick={() => setBits(b)} className={`px-3 py-1 rounded ${bits === b ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                    {b}-bit
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Binary Operations */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Operation</label>
              <div className="flex gap-2">
                {[
                  { id: 'add', name: 'Add' },
                  { id: 'subtract', name: 'Subtract' },
                  { id: 'multiply', name: 'Multiply' },
                  { id: 'and', name: 'AND' },
                  { id: 'or', name: 'OR' },
                  { id: 'xor', name: 'XOR' },
                ].map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setOperation(op.id)}
                    className={`px-3 py-1 rounded ${operation === op.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                  >
                    {op.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Operands */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Operand 1 (Binary)</label>
                <input
                  type="text"
                  value={operand1}
                  onChange={(e) => setOperand1(e.target.value)}
                  className="w-full"
                  placeholder="1010"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Operand 2 (Binary)</label>
                <input
                  type="text"
                  value={operand2}
                  onChange={(e) => setOperand2(e.target.value)}
                  className="w-full"
                  placeholder="0110"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Conversion Results */}
      {operation === 'convert' && conversions && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-3">Conversion Results</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Decimal</div>
              <div className="font-bold font-mono">{conversions.decimal}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Binary</div>
              <div className="font-bold font-mono text-sm">{conversions.binary}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Hexadecimal</div>
              <div className="font-bold font-mono">{conversions.hex}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500">Octal</div>
              <div className="font-bold font-mono">{conversions.octal}</div>
            </div>
          </div>
          <div className="text-sm text-zinc-600 mt-2">
            Signed ({bits}-bit): {conversions.signedDecimal}
          </div>
        </div>
      )}

      {/* Binary Operation Results */}
      {operation !== 'convert' && binaryOperation && (
        <div className="card bg-blue-50 p-4">
          <div className="text-center">
            <div className="font-mono text-sm">{operand1} ({binaryOperation.operand1Decimal})</div>
            <div className="font-mono text-sm">{operand2} ({binaryOperation.operand2Decimal})</div>
            <div className="font-bold font-mono text-lg mt-2">= {binaryOperation.resultBinary} ({binaryOperation.resultDecimal})</div>
            <div className="text-sm text-zinc-600 mt-1">Hex: {binaryOperation.resultHex}</div>
          </div>
        </div>
      )}

      {/* Bit Visualization */}
      {operation === 'convert' && bitExplanation && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Bit Visualization</h3>
          <div className="grid grid-cols-8 gap-1">
            {bitExplanation.slice(0, 8).map((bit) => (
              <div key={bit.position} className={`rounded p-2 text-center ${bit.value === '1' ? 'bg-blue-100' : 'bg-zinc-100'}`}>
                <div className="font-mono font-bold">{bit.value}</div>
                <div className="text-xs text-zinc-600">2{bit.position}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            Sum: {bitExplanation.reduce((sum, bit) => sum + bit.contribution, 0)}
          </div>
        </div>
      )}

      {/* Reference Tables */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reference Tables</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Common Values</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>255 = FF = 11111111</div>
              <div>16 = 10 = 10000</div>
              <div>8 = 8 = 1000</div>
              <div>2 = 2 = 10</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Bitwise Operations</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>AND: 1 if both 1</div>
              <div>OR: 1 if either 1</div>
              <div>XOR: 1 if different</div>
              <div>NOT: invert bits</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Prefixes</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>0b = binary (0b1010)</div>
              <div>0x = hex (0xFF)</div>
              <div>0o = octal (0o377)</div>
              <div>No prefix = decimal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Uses */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Uses</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">IP Addresses:</span> Convert subnet masks
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Colors:</span> RGB hex to binary
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Flags:</span> Bit flags and permissions
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Debug:</span> Memory addresses, registers
          </div>
        </div>
      </div>
    </main>
  );
}