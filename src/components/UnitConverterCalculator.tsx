'use client'

import { useState, useMemo } from 'react';

export default function UnitConverterCalculator() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');

  const units: Record<string, { name: string; units: { id: string; name: string; toBase: number }[] }> = useMemo(() => ({
    length: {
      name: 'Length',
      units: [
        { id: 'meter', name: 'Meter (m)', toBase: 1 },
        { id: 'kilometer', name: 'Kilometer (km)', toBase: 1000 },
        { id: 'centimeter', name: 'Centimeter (cm)', toBase: 0.01 },
        { id: 'millimeter', name: 'Millimeter (mm)', toBase: 0.001 },
        { id: 'mile', name: 'Mile', toBase: 1609.344 },
        { id: 'yard', name: 'Yard', toBase: 0.9144 },
        { id: 'foot', name: 'Foot', toBase: 0.3048 },
        { id: 'inch', name: 'Inch', toBase: 0.0254 },
      ],
    },
    weight: {
      name: 'Weight',
      units: [
        { id: 'kilogram', name: 'Kilogram (kg)', toBase: 1 },
        { id: 'gram', name: 'Gram (g)', toBase: 0.001 },
        { id: 'milligram', name: 'Milligram (mg)', toBase: 0.000001 },
        { id: 'pound', name: 'Pound (lb)', toBase: 0.453592 },
        { id: 'ounce', name: 'Ounce (oz)', toBase: 0.0283495 },
        { id: 'ton', name: 'Metric Ton', toBase: 1000 },
      ],
    },
    temperature: {
      name: 'Temperature',
      units: [
        { id: 'celsius', name: 'Celsius (°C)', toBase: 1 },
        { id: 'fahrenheit', name: 'Fahrenheit (°F)', toBase: 1 },
        { id: 'kelvin', name: 'Kelvin (K)', toBase: 1 },
      ],
    },
    volume: {
      name: 'Volume',
      units: [
        { id: 'liter', name: 'Liter (L)', toBase: 1 },
        { id: 'milliliter', name: 'Milliliter (mL)', toBase: 0.001 },
        { id: 'gallon', name: 'Gallon (US)', toBase: 3.78541 },
        { id: 'quart', name: 'Quart (US)', toBase: 0.946353 },
        { id: 'pint', name: 'Pint (US)', toBase: 0.473176 },
        { id: 'cup', name: 'Cup (US)', toBase: 0.236588 },
        { id: 'fluidOunce', name: 'Fluid Ounce (US)', toBase: 0.0295735 },
      ],
    },
    area: {
      name: 'Area',
      units: [
        { id: 'sqMeter', name: 'Square Meter', toBase: 1 },
        { id: 'sqKilometer', name: 'Square Kilometer', toBase: 1000000 },
        { id: 'sqFoot', name: 'Square Foot', toBase: 0.092903 },
        { id: 'sqYard', name: 'Square Yard', toBase: 0.836127 },
        { id: 'acre', name: 'Acre', toBase: 4046.86 },
        { id: 'hectare', name: 'Hectare', toBase: 10000 },
      ],
    },
    speed: {
      name: 'Speed',
      units: [
        { id: 'mps', name: 'Meter/second', toBase: 1 },
        { id: 'kmh', name: 'Kilometer/hour', toBase: 0.277778 },
        { id: 'mph', name: 'Mile/hour', toBase: 0.44704 },
        { id: 'fps', name: 'Foot/second', toBase: 0.3048 },
        { id: 'knot', name: 'Knot', toBase: 0.514444 },
      ],
    },
  }), []);

  const result = useMemo(() => {
    const cat = units[category];
    if (!cat) return { result: value };

    const from = cat.units.find(u => u.id === fromUnit);
    const to = cat.units.find(u => u.id === toUnit);

    if (!from || !to) return { result: value };

    // Special handling for temperature
    if (category === 'temperature') {
      let celsius: number;
      if (fromUnit === 'celsius') celsius = value;
      else if (fromUnit === 'fahrenheit') celsius = (value - 32) * 5/9;
      else celsius = value - 273.15; // kelvin

      let converted: number;
      if (toUnit === 'celsius') converted = celsius;
      else if (toUnit === 'fahrenheit') converted = celsius * 9/5 + 32;
      else converted = celsius + 273.15; // kelvin

      return { result: converted, formula: `${value}° ${from.name.split(' ')[0]} → ${converted.toFixed(2)}° ${to.name.split(' ')[0]}` };
    }

    const baseValue = value * from.toBase;
    const converted = baseValue / to.toBase;

    return {
      result: converted,
      formula: `${value} ${from.name.split(' ')[0]} = ${converted.toFixed(4)} ${to.name.split(' ')[0]}`,
    };
  }, [category, value, fromUnit, toUnit, units]);

  const currentCategory = units[category];

  const formatResult = (n: number) => {
    if (Math.abs(n) >= 1000000) return `${(n/1000000).toFixed(4)}M`;
    if (Math.abs(n) >= 1000) return `${(n/1000).toFixed(4)}K`;
    if (Math.abs(n) < 0.001) return `${n.toFixed(6)}`;
    return `${n.toFixed(4)}`;
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Unit Converter Calculator</h1>
      <p className="text-zinc-600">Convert between length, weight, temperature, volume, area, and speed units instantly.</p>

      <div className="card space-y-4">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Category</label>
          <div className="flex gap-2">
            {Object.entries(units).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => {
                  setCategory(key);
                  setFromUnit(cat.units[0].id);
                  setToUnit(cat.units[1].id);
                }}
                className={`px-4 py-2 rounded ${category === key ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Value Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full" />
          <div className="flex gap-2 mt-2">
            {[0.1, 1, 10, 100, 1000].map((v) => (
              <button key={v} onClick={() => setValue(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}</button>
            ))}
          </div>
        </div>

        {/* Unit Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full">
              {currentCategory?.units.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full">
              {currentCategory?.units.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="card bg-blue-50 text-center p-6">
        <div className="text-sm text-zinc-500 mb-2">Converted Value</div>
        <div className="text-4xl font-bold text-blue-600">
          {category === 'temperature' ? `${result.result.toFixed(2)}°` : formatResult(result.result)}
        </div>
        <div className="text-sm text-zinc-600 mt-2">{currentCategory?.units.find(u => u.id === toUnit)?.name}</div>
      </div>

      {/* Formula */}
      <div className="card bg-zinc-50 text-center">
        <div className="text-sm text-zinc-600">{result.formula}</div>
      </div>

      {/* Quick Reference */}
      <div className="card">
        <h3 className="font-medium mb-2">Common Conversions</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {category === 'length' && (
            <>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 mile</div><div className="text-zinc-600">= 1.609 km</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 foot</div><div className="text-zinc-600">= 30.48 cm</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 inch</div><div className="text-zinc-600">= 2.54 cm</div></div>
            </>
          )}
          {category === 'weight' && (
            <>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 lb</div><div className="text-zinc-600">= 0.454 kg</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 oz</div><div className="text-zinc-600">= 28.35 g</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 ton</div><div className="text-zinc-600">= 1000 kg</div></div>
            </>
          )}
          {category === 'temperature' && (
            <>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">0°C</div><div className="text-zinc-600">= 32°F</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">100°C</div><div className="text-zinc-600">= 212°F</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">-40°C</div><div className="text-zinc-600">= -40°F</div></div>
            </>
          )}
          {category === 'volume' && (
            <>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 gallon</div><div className="text-zinc-600">= 3.785 L</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 cup</div><div className="text-zinc-600">= 236.6 mL</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 fl oz</div><div className="text-zinc-600">= 29.57 mL</div></div>
            </>
          )}
          {category === 'area' && (
            <>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 acre</div><div className="text-zinc-600">= 4047 m²</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 hectare</div><div className="text-zinc-600">= 10000 m²</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 sq ft</div><div className="text-zinc-600">= 0.093 m²</div></div>
            </>
          )}
          {category === 'speed' && (
            <>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">60 mph</div><div className="text-zinc-600">= 96.6 km/h</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">1 knot</div><div className="text-zinc-600">= 1.852 km/h</div></div>
              <div className="bg-white rounded p-2 text-center"><div className="font-medium">100 km/h</div><div className="text-zinc-600">= 62.1 mph</div></div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}