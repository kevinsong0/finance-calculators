'use client'

import { useState } from 'react';

export default function CSSGradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [color3, setColor3] = useState('');
  const [output, setOutput] = useState('');

  const generateGradient = () => {
    let gradient = '';
    const colors = [color1, color2, color3].filter(c => c);

    if (type === 'linear') {
      gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    } else if (type === 'radial') {
      gradient = `radial-gradient(circle, ${colors.join(', ')})`;
    } else if (type === 'conic') {
      gradient = `conic-gradient(from ${angle}deg, ${colors.join(', ')})`;
    }

    setOutput(`background: ${gradient};`);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const presets = [
    { name: 'Sunset', colors: ['#ff7e5f', '#feb47b'], angle: 45 },
    { name: 'Ocean', colors: ['#2193b0', '#6dd5ed'], angle: 90 },
    { name: 'Purple', colors: ['#667eea', '#764ba2'], angle: 135 },
    { name: 'Fire', colors: ['#f83600', '#f9d423'], angle: 180 },
    { name: 'Cool Blues', colors: ['#2193b0', '#6dd5ed'], angle: 90 },
    { name: 'Rainbow', colors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff'], angle: 90 },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">CSS Gradient Generator</h1>
      <p className="text-zinc-600">Generate CSS gradients with live preview. Linear, radial, and conic gradients with multiple colors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Preview</h3>
        <div
          className="h-32 rounded border"
          style={{ background: type === 'linear' ? `linear-gradient(${angle}deg, ${[color1, color2, color3].filter(c => c).join(', ')})` : type === 'radial' ? `radial-gradient(circle, ${[color1, color2, color3].filter(c => c).join(', ')})` : `conic-gradient(from ${angle}deg, ${[color1, color2, color3].filter(c => c).join(', ')})` }}
        />
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Gradient Type</h3>
        <div className="flex gap-2">
          <button onClick={() => setType('linear')} className={type === 'linear' ? 'btn-primary' : 'btn-secondary'}>Linear</button>
          <button onClick={() => setType('radial')} className={type === 'radial' ? 'btn-primary' : 'btn-secondary'}>Radial</button>
          <button onClick={() => setType('conic')} className={type === 'conic' ? 'btn-primary' : 'btn-secondary'}>Conic</button>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Colors</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Color 1</label>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full p-1 border rounded text-sm mt-1" />
          </div>
          <div>
            <label className="text-sm">Color 2</label>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full p-1 border rounded text-sm mt-1" />
          </div>
          <div>
            <label className="text-sm">Color 3 (optional)</label>
            <input type="color" value={color3 || '#ffffff'} onChange={(e) => setColor3(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <input type="text" value={color3} onChange={(e) => setColor3(e.target.value)} placeholder="Optional" className="w-full p-1 border rounded text-sm mt-1" />
          </div>
        </div>
        {type !== 'radial' && (
          <div className="mt-4">
            <label className="text-sm">Angle: {angle}deg</label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full" />
          </div>
        )}
        <button onClick={generateGradient} className="btn-primary mt-2">Generate CSS</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated CSS</h3>
        <textarea className="w-full h-20 p-3 border rounded font-mono text-sm bg-white" value={output} readOnly />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy CSS</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Presets</h3>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((p, i) => (
            <button key={i} onClick={() => { setColor1(p.colors[0]); setColor2(p.colors[1] || ''); setColor3(p.colors[2] || ''); setAngle(p.angle); }} className="bg-white rounded p-2 text-xs hover:bg-blue-50">
              <div className="h-6 rounded mb-1" style={{ background: `linear-gradient(${p.angle}deg, ${p.colors.join(', ')})` }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Gradient Types</h3>
        <div className="text-xs text-zinc-600">
          Linear: straight line at angle. Radial: circular from center outward. Conic: color wheel pattern around center. Use for backgrounds, buttons, overlays, hero sections, cards.
        </div>
      </div>
    </main>
  );
}