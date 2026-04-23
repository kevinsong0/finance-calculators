'use client'

import { useState, useMemo } from 'react';

export default function SpeedCalculator() {
  const [mode, setMode] = useState('speed');
  const [distance, setDistance] = useState(100);
  const [time, setTime] = useState(2);
  const [timeUnit, setTimeUnit] = useState('hours');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [speed, setSpeed] = useState(60);
  const [speedUnit, setSpeedUnit] = useState('kmh');

  const conversions: Record<string, Record<string, number>> = {
    distance: {
      km: 1,
      miles: 1.60934,
      meters: 1000,
      feet: 3280.84,
    },
    time: {
      seconds: 1,
      minutes: 60,
      hours: 3600,
    },
    speed: {
      kmh: 1,
      mph: 1.60934,
      mps: 3.6,
      fps: 1.09728,
    },
  };

  const calculation = useMemo(() => {
    if (mode === 'speed') {
      const timeInSeconds = time * conversions.time[timeUnit];
      const distanceInKm = distance * conversions.distance[distanceUnit];
      const speedKmh = (distanceInKm / timeInSeconds) * 3600;
      return {
        result: speedKmh,
        resultUnit: 'km/h',
        mph: speedKmh / 1.60934,
        mps: speedKmh / 3.6,
        formula: `${distance} ${distanceUnit} / ${time} ${timeUnit}`,
        explanation: `Traveling ${distance} ${distanceUnit} in ${time} ${timeUnit} requires average speed of ${speedKmh.toFixed(2)} km/h`,
      };
    }

    if (mode === 'distance') {
      const timeInSeconds = time * conversions.time[timeUnit];
      const speedInKmh = speed * conversions.speed[speedUnit];
      const distanceKm = (speedInKmh / 3600) * timeInSeconds;
      return {
        result: distanceKm,
        resultUnit: 'km',
        miles: distanceKm / 1.60934,
        meters: distanceKm * 1000,
        formula: `${speed} ${speedUnit} × ${time} ${timeUnit}`,
        explanation: `At ${speed} ${speedUnit} for ${time} ${timeUnit}, you travel ${distanceKm.toFixed(2)} km`,
      };
    }

    if (mode === 'time') {
      const distanceInKm = distance * conversions.distance[distanceUnit];
      const speedInKmh = speed * conversions.speed[speedUnit];
      const timeSeconds = (distanceInKm / speedInKmh) * 3600;
      const hours = Math.floor(timeSeconds / 3600);
      const minutes = Math.floor((timeSeconds % 3600) / 60);
      const seconds = Math.floor(timeSeconds % 60);
      return {
        result: timeSeconds,
        resultUnit: 'seconds',
        hours,
        minutes,
        seconds,
        formatted: `${hours}h ${minutes}m ${seconds}s`,
        formula: `${distance} ${distanceUnit} / ${speed} ${speedUnit}`,
        explanation: `To travel ${distance} ${distanceUnit} at ${speed} ${speedUnit}, it takes ${hours}h ${minutes}m ${seconds}s`,
      };
    }

    return null;
  }, [mode, distance, time, timeUnit, distanceUnit, speed, speedUnit]);

  const presets = [
    { mode: 'speed', label: 'Car trip', distance: 200, time: 3, distanceUnit: 'km', timeUnit: 'hours' },
    { mode: 'speed', label: 'Marathon', distance: 42.195, time: 4, distanceUnit: 'km', timeUnit: 'hours' },
    { mode: 'distance', label: 'Daily commute', speed: 30, time: 0.5, speedUnit: 'kmh', timeUnit: 'hours' },
    { mode: 'time', label: 'Flight distance', distance: 5000, speed: 900, distanceUnit: 'km', speedUnit: 'kmh' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Speed, Distance, Time Calculator</h1>
      <p className="text-zinc-600">Calculate speed, distance, or time. Perfect for travel planning, running, cycling, and physics problems.</p>

      <div className="card space-y-4">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Calculate</label>
          <div className="flex gap-2">
            {[
              { id: 'speed', name: 'Speed', icon: '🚗' },
              { id: 'distance', name: 'Distance', icon: '📏' },
              { id: 'time', name: 'Time', icon: '⏱️' },
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

        {/* Speed Mode */}
        {mode === 'speed' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Distance</label>
              <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full" />
              <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-full mt-2">
                <option value="km">Kilometers</option>
                <option value="miles">Miles</option>
                <option value="meters">Meters</option>
                <option value="feet">Feet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Time</label>
              <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full" />
              <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} className="w-full mt-2">
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
                <option value="seconds">Seconds</option>
              </select>
            </div>
          </div>
        )}

        {/* Distance Mode */}
        {mode === 'distance' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Speed</label>
              <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full" />
              <select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="w-full mt-2">
                <option value="kmh">km/h</option>
                <option value="mph">mph</option>
                <option value="mps">m/s</option>
                <option value="fps">ft/s</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Time</label>
              <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full" />
              <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} className="w-full mt-2">
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
                <option value="seconds">Seconds</option>
              </select>
            </div>
          </div>
        )}

        {/* Time Mode */}
        {mode === 'time' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Distance</label>
              <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full" />
              <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="w-full mt-2">
                <option value="km">Kilometers</option>
                <option value="miles">Miles</option>
                <option value="meters">Meters</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Speed</label>
              <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full" />
              <select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="w-full mt-2">
                <option value="kmh">km/h</option>
                <option value="mph">mph</option>
                <option value="mps">m/s</option>
              </select>
            </div>
          </div>
        )}

        {/* Quick Presets */}
        <div className="flex gap-2">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setMode(preset.mode);
                if (preset.distance) setDistance(preset.distance);
                if (preset.time) setTime(preset.time);
                if (preset.speed) setSpeed(preset.speed);
                if (preset.distanceUnit) setDistanceUnit(preset.distanceUnit);
                if (preset.timeUnit) setTimeUnit(preset.timeUnit);
                if (preset.speedUnit) setSpeedUnit(preset.speedUnit);
              }}
              className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {calculation && (
        <div className="card bg-blue-50 text-center p-6">
          <div className="text-sm text-zinc-500 mb-2">Result</div>
          {mode === 'speed' && (
            <>
              <div className="text-4xl font-bold text-blue-600">{(calculation.result as number).toFixed(2)} km/h</div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">mph</div>
                  <div className="font-medium">{(calculation.mph as number).toFixed(2)}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">m/s</div>
                  <div className="font-medium">{(calculation.mps as number).toFixed(2)}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">min/km</div>
                  <div className="font-medium">{(60 / (calculation.result as number)).toFixed(2)}</div>
                </div>
              </div>
            </>
          )}
          {mode === 'distance' && (
            <>
              <div className="text-4xl font-bold text-blue-600">{(calculation.result as number).toFixed(2)} km</div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">miles</div>
                  <div className="font-medium">{(calculation.miles as number).toFixed(2)}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">meters</div>
                  <div className="font-medium">{(calculation.meters as number).toFixed(0)}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">feet</div>
                  <div className="font-medium">{((calculation.meters as number) * 3.281).toFixed(0)}</div>
                </div>
              </div>
            </>
          )}
          {mode === 'time' && (
            <>
              <div className="text-4xl font-bold text-blue-600">{calculation.formatted}</div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Hours</div>
                  <div className="font-medium">{calculation.hours}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Minutes</div>
                  <div className="font-medium">{calculation.minutes}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-zinc-500">Total Seconds</div>
                  <div className="font-medium">{(calculation.result as number).toFixed(0)}</div>
                </div>
              </div>
            </>
          )}
          <div className="text-sm text-zinc-600 mt-4">
            Formula: {calculation.formula}
          </div>
        </div>
      )}

      {/* Formula Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Formulas</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Speed</div>
            <div className="text-zinc-600">Speed = Distance / Time</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Distance</div>
            <div className="text-zinc-600">Distance = Speed × Time</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Time</div>
            <div className="text-zinc-600">Time = Distance / Speed</div>
          </div>
        </div>
      </div>

      {/* Common Speeds */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reference Speeds</h3>
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Walking</div>
            <div className="text-zinc-600">5 km/h</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Running</div>
            <div className="text-zinc-600">10 km/h</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Cycling</div>
            <div className="text-zinc-600">20 km/h</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Car (city)</div>
            <div className="text-zinc-600">50 km/h</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Car (highway)</div>
            <div className="text-zinc-600">100 km/h</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Plane</div>
            <div className="text-zinc-600">900 km/h</div>
          </div>
        </div>
      </div>
    </main>
  );
}