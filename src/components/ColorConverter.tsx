'use client'

import { useState, useMemo } from 'react';

export default function ColorConverter() {
  const [inputType, setInputType] = useState('hex');
  const [hexValue, setHexValue] = useState('#3B82F6');
  const [rgbR, setRgbR] = useState(59);
  const [rgbG, setRgbG] = useState(130);
  const [rgbB, setRgbB] = useState(246);
  const [hslH, setHslH] = useState(217);
  const [hslS, setHslS] = useState(91);
  const [hslL, setHslL] = useState(60);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      return l - a * Math.max(Math.min(k - 3, Math.min(9 - k, 1)), -1);
    };
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  const conversion = useMemo(() => {
    if (inputType === 'hex') {
      const rgb = hexToRgb(hexValue);
      if (!rgb) return null;
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return { hex: hexValue.toUpperCase(), rgb, hsl };
    }

    if (inputType === 'rgb') {
      const hex = rgbToHex(rgbR, rgbG, rgbB);
      const hsl = rgbToHsl(rgbR, rgbG, rgbB);
      return { hex: hex.toUpperCase(), rgb: { r: rgbR, g: rgbG, b: rgbB }, hsl };
    }

    if (inputType === 'hsl') {
      const rgb = hslToRgb(hslH, hslS, hslL);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      return { hex: hex.toUpperCase(), rgb, hsl: { h: hslH, s: hslS, l: hslL } };
    }

    return null;
  }, [inputType, hexValue, rgbR, rgbG, rgbB, hslH, hslS, hslL]);

  const presets = [
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#22C55E' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Yellow', hex: '#EAB308' },
    { name: 'Purple', hex: '#A855F7' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Teal', hex: '#14B8A6' },
    { name: 'Gray', hex: '#6B7280' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Color Converter</h1>
      <p className="text-zinc-600">Convert colors between HEX, RGB, and HSL formats. Pick colors and see conversions instantly.</p>

      <div className="card space-y-4">
        {/* Input Type Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input Format</label>
          <div className="flex gap-2">
            {['hex', 'rgb', 'hsl'].map((type) => (
              <button
                key={type}
                onClick={() => setInputType(type)}
                className={`px-4 py-2 rounded ${inputType === type ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* HEX Input */}
        {inputType === 'hex' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">HEX Value</label>
            <input
              type="text"
              value={hexValue}
              onChange={(e) => setHexValue(e.target.value)}
              className="w-full"
              placeholder="#3B82F6"
            />
          </div>
        )}

        {/* RGB Input */}
        {inputType === 'rgb' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Red (0-255)</label>
              <input type="number" value={rgbR} onChange={(e) => setRgbR(Number(e.target.value))} className="w-full" min="0" max="255" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Green (0-255)</label>
              <input type="number" value={rgbG} onChange={(e) => setRgbG(Number(e.target.value))} className="w-full" min="0" max="255" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Blue (0-255)</label>
              <input type="number" value={rgbB} onChange={(e) => setRgbB(Number(e.target.value))} className="w-full" min="0" max="255" />
            </div>
          </div>
        )}

        {/* HSL Input */}
        {inputType === 'hsl' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Hue (0-360°)</label>
              <input type="number" value={hslH} onChange={(e) => setHslH(Number(e.target.value))} className="w-full" min="0" max="360" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Saturation (0-100%)</label>
              <input type="number" value={hslS} onChange={(e) => setHslS(Number(e.target.value))} className="w-full" min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Lightness (0-100%)</label>
              <input type="number" value={hslL} onChange={(e) => setHslL(Number(e.target.value))} className="w-full" min="0" max="100" />
            </div>
          </div>
        )}

        {/* Preset Colors */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Preset Colors</label>
          <div className="flex gap-2">
            {presets.map((preset) => (
              <button
                key={preset.hex}
                onClick={() => {
                  setHexValue(preset.hex);
                  setInputType('hex');
                }}
                className="w-8 h-8 rounded border border-zinc-200 hover:border-zinc-400"
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Color Preview */}
      {conversion && (
        <div className="card">
          <div
            className="h-32 rounded-lg mb-4"
            style={{ backgroundColor: conversion.hex }}
          />
          <div className="text-center text-sm text-zinc-600">
            Preview of {conversion.hex}
          </div>
        </div>
      )}

      {/* Conversion Results */}
      {conversion && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-3">Conversions</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded p-4">
              <div className="text-sm text-zinc-500 mb-2">HEX</div>
              <div className="font-mono font-bold">{conversion.hex}</div>
            </div>
            <div className="bg-white rounded p-4">
              <div className="text-sm text-zinc-500 mb-2">RGB</div>
              <div className="font-mono font-bold">
                {conversion.rgb.r}, {conversion.rgb.g}, {conversion.rgb.b}
              </div>
              <div className="text-xs text-zinc-600 mt-1">
                rgb({conversion.rgb.r}, {conversion.rgb.g}, {conversion.rgb.b})
              </div>
            </div>
            <div className="bg-white rounded p-4">
              <div className="text-sm text-zinc-500 mb-2">HSL</div>
              <div className="font-mono font-bold">
                {conversion.hsl.h}°, {conversion.hsl.s}%, {conversion.hsl.l}%
              </div>
              <div className="text-xs text-zinc-600 mt-1">
                hsl({conversion.hsl.h}, {conversion.hsl.s}%, {conversion.hsl.l}%)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Code */}
      {conversion && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-3">CSS Code</h3>
          <div className="bg-zinc-900 text-green-400 p-4 rounded font-mono text-sm">
            <div>background-color: {conversion.hex};</div>
            <div>background-color: rgb({conversion.rgb.r}, {conversion.rgb.g}, {conversion.rgb.b});</div>
            <div>background-color: hsl({conversion.hsl.h}, {conversion.hsl.s}%, {conversion.hsl.l}%);</div>
            <div className="mt-2 text-zinc-400">color: {conversion.hex};</div>
          </div>
        </div>
      )}

      {/* Related Colors */}
      {conversion && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-3">Related Colors</h3>
          <div className="grid grid-cols-5 gap-2">
            {/* Lighter */}
            <div>
              <div
                className="h-16 rounded mb-1"
                style={{ backgroundColor: rgbToHex(Math.min(conversion.rgb.r + 40, 255), Math.min(conversion.rgb.g + 40, 255), Math.min(conversion.rgb.b + 40, 255)) }}
              />
              <div className="text-xs text-center">Lighter</div>
            </div>
            {/* Darker */}
            <div>
              <div
                className="h-16 rounded mb-1"
                style={{ backgroundColor: rgbToHex(Math.max(conversion.rgb.r - 40, 0), Math.max(conversion.rgb.g - 40, 0), Math.max(conversion.rgb.b - 40, 0)) }}
              />
              <div className="text-xs text-center">Darker</div>
            </div>
            {/* Complementary */}
            <div>
              <div
                className="h-16 rounded mb-1"
                style={{ backgroundColor: rgbToHex(255 - conversion.rgb.r, 255 - conversion.rgb.g, 255 - conversion.rgb.b) }}
              />
              <div className="text-xs text-center">Complement</div>
            </div>
            {/* Saturated */}
            <div>
              <div
                className="h-16 rounded mb-1"
                style={{ backgroundColor: conversion.hex }}
              />
              <div className="text-xs text-center">Original</div>
            </div>
            {/* Desaturated */}
            <div>
              <div
                className="h-16 rounded mb-1"
                style={{ backgroundColor: `hsl(${conversion.hsl.h}, ${Math.max(conversion.hsl.s - 50, 0)}%, ${conversion.hsl.l}%)` }}
              />
              <div className="text-xs text-center">Desaturate</div>
            </div>
          </div>
        </div>
      )}

      {/* Format Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Format Reference</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">HEX:</span> 6-digit hex code (#RRGGBB). Each pair represents red, green, blue in hex (00-FF).
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">RGB:</span> Red, Green, Blue values (0-255 each). Additive color model used in screens.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">HSL:</span> Hue (0-360°), Saturation (0-100%), Lightness (0-100%). Human-friendly representation.
          </div>
        </div>
      </div>
    </main>
  );
}