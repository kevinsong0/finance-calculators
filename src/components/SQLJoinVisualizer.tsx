'use client'

import { useState } from 'react';

export default function SQLJoinVisualizer() {
  const [joinType, setJoinType] = useState<'inner' | 'left' | 'right' | 'full' | 'cross'>('inner');
  const [table1, setTable1] = useState('employees');
  const [table2, setTable2] = useState('departments');
  const [key1, setKey1] = useState('dept_id');
  const [key2, setKey2] = useState('id');

  const generateSQL = () => {
    let sql = '';
    switch (joinType) {
      case 'inner':
        sql = `SELECT * FROM ${table1}\nINNER JOIN ${table2} ON ${table1}.${key1} = ${table2}.${key2};`;
        break;
      case 'left':
        sql = `SELECT * FROM ${table1}\nLEFT JOIN ${table2} ON ${table1}.${key1} = ${table2}.${key2};`;
        break;
      case 'right':
        sql = `SELECT * FROM ${table1}\nRIGHT JOIN ${table2} ON ${table1}.${key1} = ${table2}.${key2};`;
        break;
      case 'full':
        sql = `SELECT * FROM ${table1}\nFULL OUTER JOIN ${table2} ON ${table1}.${key1} = ${table2}.${key2};`;
        break;
      case 'cross':
        sql = `SELECT * FROM ${table1}\nCROSS JOIN ${table2};`;
        break;
    }
    return sql;
  };

  const joinDescriptions: Record<string, { desc: string; result: string; use: string }> = {
    inner: { desc: 'Only matching rows from both tables', result: 'A ∩ B', use: 'Find records with relationships' },
    left: { desc: 'All rows from left, matching from right', result: 'A + (A ∩ B)', use: 'Keep all left records, get right if exists' },
    right: { desc: 'All rows from right, matching from left', result: 'B + (A ∩ B)', use: 'Keep all right records, get left if exists' },
    full: { desc: 'All rows from both tables', result: 'A ∪ B', use: 'Combine all records, show missing as NULL' },
    cross: { desc: 'Every combination of rows', result: 'A × B', use: 'Generate all possible pairs' },
  };

  const copySQL = () => {
    navigator.clipboard.writeText(generateSQL());
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">SQL Join Visualizer</h1>
      <p className="text-zinc-600">Visualize SQL JOIN types. Generate JOIN queries. Understand inner, left, right, full outer, and cross joins with examples.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Select Join Type</h3>
        <div className="flex gap-2">
          {['inner', 'left', 'right', 'full', 'cross'].map((type) => (
            <button key={type} onClick={() => setJoinType(type as 'inner' | 'left' | 'right' | 'full' | 'cross')} className={joinType === type ? 'btn-primary' : 'btn-secondary'}>
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Table Configuration</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Left Table</label>
            <input type="text" className="w-full p-2 border rounded" value={table1} onChange={(e) => setTable1(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Right Table</label>
            <input type="text" className="w-full p-2 border rounded" value={table2} onChange={(e) => setTable2(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Left Key Column</label>
            <input type="text" className="w-full p-2 border rounded" value={key1} onChange={(e) => setKey1(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Right Key Column</label>
            <input type="text" className="w-full p-2 border rounded" value={key2} onChange={(e) => setKey2(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated SQL</h3>
        <pre className="bg-white p-3 rounded font-mono text-sm overflow-x-auto">{generateSQL()}</pre>
        <button onClick={copySQL} className="btn-secondary mt-2">Copy SQL</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">{joinType.toUpperCase()} JOIN Explanation</h3>
        <div className="bg-white rounded p-3 text-sm">
          <div className="mb-2"><strong>Description:</strong> {joinDescriptions[joinType].desc}</div>
          <div className="mb-2"><strong>Result:</strong> {joinDescriptions[joinType].result}</div>
          <div><strong>Use Case:</strong> {joinDescriptions[joinType].use}</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Visual Diagram</h3>
        <div className="flex items-center justify-center gap-4">
          <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-sm font-medium">A ({table1})</div>
          <div className="text-2xl">{joinType === 'cross' ? '×' : joinDescriptions[joinType].result}</div>
          <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-sm font-medium">B ({table2})</div>
        </div>
        <div className="text-xs text-zinc-500 text-center mt-2">
          {joinType === 'inner' && 'Returns intersection of both circles'}
          {joinType === 'left' && 'Returns all of A plus intersection'}
          {joinType === 'right' && 'Returns all of B plus intersection'}
          {joinType === 'full' && 'Returns union of both circles'}
          {joinType === 'cross' && 'Returns all combinations (cartesian product)'}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">JOIN Types Reference</h3>
        <div className="space-y-1 text-xs">
          {Object.entries(joinDescriptions).map(([type, info]) => (
            <div key={type} className="bg-white rounded p-2">
              <strong className="font-mono">{type.toUpperCase()} JOIN</strong>: {info.desc}. Result: {info.result}. {info.use}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips</h3>
        <div className="text-xs text-zinc-600">
          Use aliases for readability: FROM employees e JOIN departments d. Select specific columns instead of *. Use WHERE after JOIN for filtering. Multiple JOINs: chain with additional JOIN clauses. Index join columns for performance. NULL in LEFT/RIGHT/FULL where no match.
        </div>
      </div>
    </main>
  );
}