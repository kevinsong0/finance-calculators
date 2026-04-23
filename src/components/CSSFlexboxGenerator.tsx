'use client'

import { useState } from 'react';

export default function CSSFlexboxGenerator() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('stretch');
  const [wrap, setWrap] = useState('nowrap');
  const [gap, setGap] = useState(0);
  const [items, setItems] = useState(3);

  const cssCode = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}

.item {
  /* Your item styles here */
}`;

  const itemStyles = {
    width: '60px',
    height: '60px',
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: `${gap}px`,
    padding: '16px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    minHeight: '200px',
    border: '2px dashed #d1d5db',
  };

  const copyCode = () => {
    navigator.clipboard.writeText(cssCode);
  };

  const presets = [
    { direction: 'row', justify: 'center', align: 'center', name: 'Center Everything' },
    { direction: 'row', justify: 'space-between', align: 'center', name: 'Space Between' },
    { direction: 'column', justify: 'center', align: 'center', name: 'Vertical Center' },
    { direction: 'row', justify: 'space-around', align: 'stretch', name: 'Space Around' },
    { direction: 'row-reverse', justify: 'flex-end', align: 'flex-end', name: 'Reverse' },
  ];

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">CSS Flexbox Generator</h1>
      <p className="text-zinc-600">Generate CSS Flexbox layouts with live preview. Adjust direction, justification, alignment, wrapping. Copy generated CSS for your projects.</p>

      <div className="grid grid-cols-2 gap-4">
        {/* Controls */}
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Direction</label>
            <div className="flex gap-2">
              {['row', 'row-reverse', 'column', 'column-reverse'].map((d) => (
                <button key={d} onClick={() => setDirection(d)} className={`px-3 py-1 rounded text-xs ${direction === d ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Justify Content</label>
            <div className="flex gap-1">
              {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map((j) => (
                <button key={j} onClick={() => setJustify(j)} className={`px-2 py-1 rounded text-xs ${justify === j ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {j.replace('flex-', '').replace('space-', '')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Align Items</label>
            <div className="flex gap-2">
              {['stretch', 'flex-start', 'flex-end', 'center', 'baseline'].map((a) => (
                <button key={a} onClick={() => setAlign(a)} className={`px-2 py-1 rounded text-xs ${align === a ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {a.replace('flex-', '')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Wrap</label>
            <div className="flex gap-2">
              {['nowrap', 'wrap', 'wrap-reverse'].map((w) => (
                <button key={w} onClick={() => setWrap(w)} className={`px-3 py-1 rounded text-xs ${wrap === w ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Gap: {gap}px</label>
            <input type="range" min="0" max="40" value={gap} onChange={e => setGap(parseInt(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Items: {items}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button key={n} onClick={() => setItems(n)} className={`px-3 py-1 rounded ${items === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card bg-zinc-50">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Live Preview</label>
          <div style={containerStyles as React.CSSProperties}>
            {Array.from({ length: items }, (_, i) => (
              <div key={i} style={itemStyles as React.CSSProperties}>{i + 1}</div>
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
            <button key={i} onClick={() => { setDirection(p.direction); setJustify(p.justify); setAlign(p.align); }} className="bg-white rounded p-2 hover:bg-zinc-100 text-xs">
              <div className="font-medium text-blue-600">{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Flexbox Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Container Properties</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">display: flex</span> Enable flexbox</div>
              <div><span className="text-blue-600">flex-direction</span> Main axis direction</div>
              <div><span className="text-blue-600">justify-content</span> Main axis alignment</div>
              <div><span className="text-blue-600">align-items</span> Cross axis alignment</div>
              <div><span className="text-blue-600">flex-wrap</span> Wrap behavior</div>
              <div><span className="text-blue-600">gap</span> Space between items</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Item Properties</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-green-600">flex-grow</span> Grow factor</div>
              <div><span className="text-green-600">flex-shrink</span> Shrink factor</div>
              <div><span className="text-green-600">flex-basis</span> Initial size</div>
              <div><span className="text-green-600">flex</span> Grow shrink basis</div>
              <div><span className="text-green-600">align-self</span> Override alignment</div>
              <div><span className="text-green-600">order</span> Visual order</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Common Patterns</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Center: justify + align center</div>
              <div>Navbar: space-between</div>
              <div>Cards: wrap + gap</div>
              <div>Equal width: flex: 1</div>
              <div>Sticky footer: column</div>
              <div>Grid-like: wrap + basis</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}