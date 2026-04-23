'use client'

import { useState, useMemo } from 'react';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [weightLbs, setWeightLbs] = useState(154);

  const bmi = useMemo(() => {
    if (unit === 'metric') {
      const heightM = height / 100;
      return weight / (heightM * heightM);
    } else {
      const totalInches = heightFeet * 12 + heightInches;
      const heightM = totalInches * 0.0254;
      const weightKg = weightLbs * 0.453592;
      return weightKg / (heightM * heightM);
    }
  }, [unit, weight, height, heightFeet, heightInches, weightLbs]);

  const category = useMemo(() => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-100' };
  }, [bmi]);

  const idealWeight = useMemo(() => {
    let heightM;
    if (unit === 'metric') {
      heightM = height / 100;
    } else {
      const totalInches = heightFeet * 12 + heightInches;
      heightM = totalInches * 0.0254;
    }
    const minIdeal = 18.5 * heightM * heightM;
    const maxIdeal = 25 * heightM * heightM;
    return {
      min: unit === 'metric' ? minIdeal : minIdeal / 0.453592,
      max: unit === 'metric' ? maxIdeal : maxIdeal / 0.453592,
      unit: unit === 'metric' ? 'kg' : 'lbs',
    };
  }, [unit, height, heightFeet, heightInches]);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">BMI Calculator</h1>
      <p className="text-zinc-600">Calculate your Body Mass Index and find your ideal weight range.</p>

      <div className="card space-y-4">
        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Unit System</label>
          <div className="flex gap-2">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded ${unit === 'metric' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Metric (kg, cm)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded ${unit === 'imperial' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Imperial (lbs, ft/in)
            </button>
          </div>
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={unit === 'metric' ? weight : weightLbs}
            onChange={(e) => unit === 'metric' ? setWeight(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
            className="w-full"
            min="1"
            max="500"
          />
          <div className="flex gap-2 mt-2">
            {unit === 'metric' ? (
              [50, 60, 70, 80, 90, 100].map((w) => (
                <button key={w} onClick={() => setWeight(w)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                  {w} kg
                </button>
              ))
            ) : (
              [100, 130, 150, 170, 200, 250].map((w) => (
                <button key={w} onClick={() => setWeightLbs(w)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                  {w} lbs
                </button>
              ))
            )}
          </div>
        </div>

        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'feet/inches'})
          </label>
          {unit === 'metric' ? (
            <>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full"
                min="50"
                max="250"
              />
              <div className="flex gap-2 mt-2">
                {[150, 160, 170, 175, 180, 190].map((h) => (
                  <button key={h} onClick={() => setHeight(h)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                    {h} cm
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Feet</label>
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value))}
                  className="w-full"
                  min="1"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Inches</label>
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="w-full"
                  min="0"
                  max="11"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BMI Result */}
      <div className={`card ${category.bg} text-center p-6`}>
        <div className="text-sm text-zinc-500 mb-2">Your BMI</div>
        <div className={`text-4xl font-bold ${category.color}`}>{bmi.toFixed(1)}</div>
        <div className={`text-lg font-semibold mt-2 ${category.color}`}>{category.label}</div>
      </div>

      {/* Ideal Weight Range */}
      <div className="card bg-green-50 text-center p-6">
        <div className="text-sm text-zinc-500 mb-2">Ideal Weight Range (BMI 18.5-25)</div>
        <div className="text-2xl font-bold text-green-600">
          {idealWeight.min.toFixed(1)} - {idealWeight.max.toFixed(1)} {idealWeight.unit}
        </div>
      </div>

      {/* BMI Categories */}
      <div className="card">
        <h3 className="font-medium mb-2">BMI Categories</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-blue-100 rounded p-3 text-center">
            <div className="font-bold text-blue-600">Underweight</div>
            <div className="text-zinc-600">BMI &lt; 18.5</div>
          </div>
          <div className="bg-green-100 rounded p-3 text-center">
            <div className="font-bold text-green-600">Normal</div>
            <div className="text-zinc-600">BMI 18.5-24.9</div>
          </div>
          <div className="bg-orange-100 rounded p-3 text-center">
            <div className="font-bold text-orange-600">Overweight</div>
            <div className="text-zinc-600">BMI 25-29.9</div>
          </div>
          <div className="bg-red-100 rounded p-3 text-center">
            <div className="font-bold text-red-600">Obese</div>
            <div className="text-zinc-600">BMI ≥ 30</div>
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Health Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">BMI is a guideline:</span> It doesn&apos;t account for muscle mass, bone density, age, or gender differences.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Healthy lifestyle:</span> Focus on balanced diet, regular exercise, and adequate sleep regardless of BMI.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Consult a doctor:</span> For personalized health advice, speak with a healthcare professional.
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Muscle matters:</span> Athletes may have high BMI due to muscle mass, not body fat.
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-zinc-50 text-sm text-zinc-600">
        BMI is a general indicator and may not accurately reflect body fat for athletes, elderly people, or those with high muscle mass. This calculator is for informational purposes only and should not replace professional medical advice.
      </div>
    </main>
  );
}