'use client'

import { useState } from 'react';

export default function CSSGridGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(16);
  const [colSize, setColSize] = useState('1fr');
  const [rowSize, setRowSize] = useState('auto');
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignItems, setAlignItems] = useState('stretch');

  const cssCode = `.container {
  display: grid;
  grid-template-columns: repeat(${columns}, ${colSize});
  grid-template-rows: repeat(${rows}, ${rowSize});
  gap: ${gap}px;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}

.item {
  /* Your item styles here */
}`;

  const containerStyles: Record<string, string | number> = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, ${colSize})`,
    gridTemplateRows: `repeat(${rows}, ${rowSize})`,
    gap: `${gap}px`,
    padding: '16px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    minHeight: '300px',
    border: '2px dashed #d1d5db',
    justifyItems: justifyItems,
    alignItems: alignItems,
  };

  const itemStyles: Record<string, string | number> = {
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    minHeight: '60px',
  };

  const copyCode = () => {
    navigator.clipboard.writeText(cssCode);
  };

  const presets = [
    { cols: 2, colSize: '1fr', name: '2 Equal Columns' },
    { cols: 3, colSize: '1fr', name: '3 Equal Columns' },
    { cols: 4, colSize: '1fr', name: '4 Column Grid' },
    { cols: 3, colSize: '200px', name: 'Fixed 200px Columns' },
    { cols: 3, colSize: 'minmax(100px, 1fr)', name: 'Responsive Min' },
  ];

  const totalItems = columns * rows;

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">CSS Grid Generator</h1>
      <p className="text-zinc-600">Generate CSS Grid layouts with live preview. Configure columns, rows, gap, and alignment. Copy generated CSS for complex layouts.</p>

      <div className="grid grid-cols-2 gap-4">
        {/* Controls */}
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Columns: {columns}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button key={n} onClick={() => setColumns(n)} className={`px-3 py-1 rounded ${columns === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Rows: {rows}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} onClick={() => setRows(n)} className={`px-3 py-1 rounded ${rows === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Column Size</label>
            <div className="flex gap-2">
              {['1fr', '100px', '200px', 'minmax(100px, 1fr)'].map((s) => (
                <button key={s} onClick={() => setColSize(s)} className={`px-2 py-1 rounded text-xs ${colSize === s ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Row Size</label>
            <div className="flex gap-2">
              {['auto', '100px', 'minmax(50px, auto)'].map((s) => (
                <button key={s} onClick={() => setRowSize(s)} className={`px-2 py-1 rounded text-xs ${rowSize === s ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Gap: {gap}px</label>
            <input type="range" min="0" max="40" value={gap} onChange={e => setGap(parseInt(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Justify Items</label>
            <div className="flex gap-2">
              {['stretch', 'start', 'center', 'end'].map((j) => (
                <button key={j} onClick={() => setJustifyItems(j)} className={`px-2 py-1 rounded text-xs ${justifyItems === j ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {j}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Align Items</label>
            <div className="flex gap-2">
              {['stretch', 'start', 'center', 'end'].map((a) => (
                <button key={a} onClick={() => setAlignItems(a)} className={`px-2 py-1 rounded text-xs ${alignItems === a ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card bg-zinc-50">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Live Preview ({totalItems} items)</label>
          <div style={containerStyles}>
            {Array.from({ length: totalItems }, (_, i) => (
              <div key={i} style={itemStyles}>{i + 1}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated CSS */}
      <div className="card bg-blue-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Generated CSS</h3>
          <button onClick={copyCode} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy CSS</button>
        </div>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{cssCode}</pre>
      </div>

      {/* Presets */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Presets</h3>
        <div className="grid grid-cols-5 gap-2">
          {presets.map((p, i) => (
            <button key={i} onClick={() => { setColumns(p.cols); setColSize(p.colSize); }} className="bg-white rounded p-2 hover:bg-zinc-100 text-xs">
              <div className="font-medium text-blue-600">{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">CSS Grid Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Container Properties</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">display: grid</span> Enable grid</div>
              <div><span className="text-blue-600">grid-template-columns</span> Column sizes</div>
              <div><span className="text-blue-600">grid-template-rows</span> Row sizes</div>
              <div><span className="text-blue-600">gap</span> Space between items</div>
              <div><span className="text-blue-600">justify-items</span> Horizontal alignment</div>
              <div><span className="text-blue-600">align-items</span> Vertical alignment</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Item Properties</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-green-600">grid-column</span> Span columns</div>
              <div><span className="text-green-600">grid-row</span> Span rows</div>
              <div><span className="text-green-600">grid-area</span> Named placement</div>
              <div><span className="text-green-600">justify-self</span> Override justify</div>
              <div><span className="text-green-600">align-self</span> Override align</div>
              <div><span className="text-green-600">order</span> Visual order</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Size Units</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-purple-600">fr</span> Fractional unit</div>
              <div><span className="text-purple-600">px</span> Fixed pixels</div>
              <div><span className="text-purple-600">%</span> Percentage</div>
              <div><span className="text-purple-600">auto</span> Content-based</div>
              <div><span className="text-purple-600">minmax(min, max)</span> Range</div>
              <div><span className="text-purple-600">repeat(n, size)</span> Repeat pattern</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}