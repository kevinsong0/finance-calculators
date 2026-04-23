'use client'

import { useState } from 'react';

export default function CarbonFootprintCalculator() {
  const [transport, setTransport] = useState({ car: '', flights: '', bus: '' });
  const [energy, setEnergy] = useState({ electricity: '', gas: '' });
  const [food, setFood] = useState({ meat: '', dairy: '', plant: '' });
  const [result, setResult] = useState<{ total: number; breakdown: Record<string, number> } | null>(null);

  // Emission factors (kg CO2 per unit, approximate)
  const factors = {
    transport: {
      car: 0.21, // per km
      flights: 250, // per flight (short-medium)
      bus: 0.089, // per km
    },
    energy: {
      electricity: 0.5, // per kWh (average US)
      gas: 2.0, // per m³ (natural gas)
    },
    food: {
      meat: 6.0, // per kg meat
      dairy: 3.0, // per kg dairy
      plant: 0.5, // per kg plant-based
    },
  };

  const calculateFootprint = () => {
    const breakdown: Record<string, number> = {};

    // Transport
    const carKm = parseFloat(transport.car) || 0;
    const flights = parseFloat(transport.flights) || 0;
    const busKm = parseFloat(transport.bus) || 0;
    breakdown['Car travel'] = carKm * factors.transport.car * 52; // weekly to yearly
    breakdown['Flights'] = flights * factors.transport.flights;
    breakdown['Public transport'] = busKm * factors.transport.bus * 52;

    // Energy (monthly to yearly)
    const electricity = parseFloat(energy.electricity) || 0;
    const gas = parseFloat(energy.gas) || 0;
    breakdown['Electricity'] = electricity * factors.energy.electricity * 12;
    breakdown['Natural gas'] = gas * factors.energy.gas * 12;

    // Food (weekly kg to yearly)
    const meat = parseFloat(food.meat) || 0;
    const dairy = parseFloat(food.dairy) || 0;
    const plant = parseFloat(food.plant) || 0;
    breakdown['Meat consumption'] = meat * factors.food.meat * 52;
    breakdown['Dairy products'] = dairy * factors.food.dairy * 52;
    breakdown['Plant-based food'] = plant * factors.food.plant * 52;

    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    setResult({ total, breakdown });
  };

  const tips = [
    { area: 'Transport', tip: 'Use public transit, bike, or walk. Combine trips. Consider electric vehicle.' },
    { area: 'Energy', tip: 'Switch to renewable energy. LED lights. Unplug devices. Smart thermostat.' },
    { area: 'Food', tip: 'Reduce meat consumption. Local produce. Less food waste. Grow your own.' },
    { area: 'General', tip: 'Reduce, reuse, recycle. Buy less. Secondhand items. Carbon offset programs.' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Carbon Footprint Calculator</h1>
      <p className="text-zinc-600">Estimate your annual carbon emissions. See breakdown by transport, energy, food. Get tips to reduce your environmental impact.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Transportation (weekly)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Car (km/week)</label>
            <input type="number" className="w-full p-2 border rounded" value={transport.car} onChange={(e) => setTransport({ ...transport, car: e.target.value })} placeholder="100" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Flights (per year)</label>
            <input type="number" className="w-full p-2 border rounded" value={transport.flights} onChange={(e) => setTransport({ ...transport, flights: e.target.value })} placeholder="2" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Bus/train (km/week)</label>
            <input type="number" className="w-full p-2 border rounded" value={transport.bus} onChange={(e) => setTransport({ ...transport, bus: e.target.value })} placeholder="20" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Home Energy (monthly)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Electricity (kWh/month)</label>
            <input type="number" className="w-full p-2 border rounded" value={energy.electricity} onChange={(e) => setEnergy({ ...energy, electricity: e.target.value })} placeholder="500" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Natural gas (m³/month)</label>
            <input type="number" className="w-full p-2 border rounded" value={energy.gas} onChange={(e) => setEnergy({ ...energy, gas: e.target.value })} placeholder="50" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Food Consumption (weekly kg)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Meat (kg/week)</label>
            <input type="number" className="w-full p-2 border rounded" value={food.meat} onChange={(e) => setFood({ ...food, meat: e.target.value })} placeholder="2" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Dairy (kg/week)</label>
            <input type="number" className="w-full p-2 border rounded" value={food.dairy} onChange={(e) => setFood({ ...food, dairy: e.target.value })} placeholder="3" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Plant-based (kg/week)</label>
            <input type="number" className="w-full p-2 border rounded" value={food.plant} onChange={(e) => setFood({ ...food, plant: e.target.value })} placeholder="5" />
          </div>
        </div>
      </div>

      <button onClick={calculateFootprint} className="btn-primary w-full">Calculate Carbon Footprint</button>

      {result && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Annual Carbon Footprint</h3>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-green-600">{result.total.toFixed(0)} kg CO₂</div>
            <div className="text-sm text-zinc-500">{(result.total / 1000).toFixed(2)} tonnes per year</div>
            <div className="text-xs text-zinc-400 mt-2">
              Average US: ~16 tonnes | Target: &lt;2 tonnes
            </div>
          </div>
          <div className="space-y-1 text-xs">
            {Object.entries(result.breakdown).map(([key, value]) => (
              <div key={key} className="bg-white rounded p-2 flex justify-between">
                <span>{key}</span>
                <span className="font-mono">{value.toFixed(0)} kg CO₂ ({((value / result.total) * 100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips to Reduce Your Footprint</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t, i) => (
            <div key={i} className="bg-white rounded p-2">
              <strong>{t.area}</strong>: {t.tip}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Emission Factors</h3>
        <div className="text-xs text-zinc-600">
          Car: 0.21 kg CO₂/km. Flight: 250 kg per short-medium flight. Bus: 0.089 kg/km. Electricity: 0.5 kg/kWh (US average). Natural gas: 2.0 kg/m³. Meat: 6.0 kg/kg. Dairy: 3.0 kg/kg. Plant: 0.5 kg/kg. Values approximate, vary by location.
        </div>
      </div>
    </main>
  );
}