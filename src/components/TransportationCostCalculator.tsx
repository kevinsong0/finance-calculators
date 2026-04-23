'use client';

import { useState, useMemo } from 'react';

export default function TransportationCostCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('400');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('500');
  const [primaryMode, setPrimaryMode] = useState<string>('car');
  const [commuteDistance, setCommuteDistance] = useState<string>('20');
  const [commuteDays, setCommuteDays] = useState<string>('5');
  const [fuelCost, setFuelCost] = useState<string>('150');
  const [insurance, setInsurance] = useState<string>('120');
  const [maintenance, setMaintenance] = useState<string>('100');
  const [carPayment, setCarPayment] = useState<string>('350');
  const [parking, setParking] = useState<string>('50');
  const [tolls, setTolls] = useState<string>('0');
  const [publicTransitCost, setPublicTransitCost] = useState<string>('100');
  const [uberLyft, setUberLyft] = useState<string>('50');
  const [bikeMaintenance, setBikeMaintenance] = useState<string>('10');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const distance = parseFloat(commuteDistance) || 0;
    const days = parseFloat(commuteDays) || 0;
    const fuel = parseFloat(fuelCost) || 0;
    const ins = parseFloat(insurance) || 0;
    const maint = parseFloat(maintenance) || 0;
    const payment = parseFloat(carPayment) || 0;
    const park = parseFloat(parking) || 0;
    const toll = parseFloat(tolls) || 0;
    const transit = parseFloat(publicTransitCost) || 0;
    const rideshare = parseFloat(uberLyft) || 0;
    const bike = parseFloat(bikeMaintenance) || 0;

    // Monthly commute metrics
    const monthlyCommuteDistance = distance * days * 4; // 4 weeks per month
    const annualCommuteDistance = monthlyCommuteDistance * 12;

    // Calculate total costs by mode
    const carTotal = fuel + ins + maint + payment + park + toll + rideshare;
    const transitTotal = transit + rideshare + bike;
    const bikeTotal = bike;

    let totalMonthly = primaryMode === 'car' ? carTotal : primaryMode === 'transit' ? transitTotal : bikeTotal;
    if (primaryMode === 'mixed') {
      totalMonthly = carTotal * 0.5 + transitTotal * 0.5;
    }
    const totalAnnual = totalMonthly * 12;

    // Cost per mile
    const costPerMile = monthlyCommuteDistance > 0 ? totalMonthly / monthlyCommuteDistance : 0;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;

    // Category breakdown
    const carCategories = [
      { name: 'Fuel', amount: fuel },
      { name: 'Insurance', amount: ins },
      { name: 'Maintenance', amount: maint },
      { name: 'Car Payment', amount: payment },
      { name: 'Parking', amount: park },
      { name: 'Tolls', amount: toll },
      { name: 'Rideshare', amount: rideshare }
    ].filter(c => c.amount > 0);

    const transitCategories = [
      { name: 'Public Transit', amount: transit },
      { name: 'Rideshare', amount: rideshare },
      { name: 'Bike Maintenance', amount: bike }
    ].filter(c => c.amount > 0);

    // Mode comparison
    const modes = [
      { mode: 'Car Only', cost: carTotal, convenience: 'High', health: 'Low' },
      { mode: 'Public Transit', cost: transitTotal, convenience: 'Medium', health: 'Medium' },
      { mode: 'Bike Only', cost: bikeTotal, convenience: 'Low', health: 'High' },
      { mode: 'Mixed', cost: carTotal * 0.3 + transitTotal * 0.5 + bike * 0.2, convenience: 'Medium', health: 'High' }
    ];

    // Alternative cost if switching modes
    const potentialSavings = primaryMode === 'car' ? carTotal - transitTotal : 0;

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - evaluate transportation options');
    }

    if (percentOfIncome > 10) {
      recommendations.push('Transportation exceeds 10% of income - typical is 5-10%');
    }

    if (payment > income * 0.1) {
      recommendations.push('Car payment exceeds 10% of income - consider refinancing');
    }

    if (fuel > 200) {
      recommendations.push('High fuel cost - consider fuel-efficient vehicle or alternative transit');
    }

    if (distance > 30 && primaryMode === 'car') {
      recommendations.push('Long commute by car - public transit may save money');
    }

    if (rideshare > 100) {
      recommendations.push('High rideshare spending - could indicate transit gaps');
    }

    return {
      totalMonthly,
      totalAnnual,
      monthlyCommuteDistance,
      annualCommuteDistance,
      costPerMile,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      carCategories,
      transitCategories,
      modes,
      potentialSavings,
      recommendations,
      budget,
      spending,
      primaryMode
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, primaryMode, commuteDistance, commuteDays, fuelCost, insurance, maintenance, carPayment, parking, tolls, publicTransitCost, uberLyft, bikeMaintenance]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Transportation Cost Calculator</h1>
      <p className="text-gray-600 mb-6">Compare transportation modes and optimize commute costs</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget & Commute</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Transportation Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Transportation Mode</label>
            <select
              value={primaryMode}
              onChange={(e) => setPrimaryMode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="car">Car</option>
              <option value="transit">Public Transit</option>
              <option value="bike">Bike/Walking</option>
              <option value="mixed">Mixed Modes</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commute Distance (mi)</label>
              <input
                type="number"
                value={commuteDistance}
                onChange={(e) => setCommuteDistance(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commute Days/Week</label>
              <input
                type="number"
                value={commuteDays}
                onChange={(e) => setCommuteDays(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Transportation Expenses</h3>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Car Costs</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Fuel ($/mo)</label>
                <input
                  type="number"
                  value={fuelCost}
                  onChange={(e) => setFuelCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Insurance ($/mo)</label>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Maintenance ($/mo)</label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Car Payment ($/mo)</label>
                <input
                  type="number"
                  value={carPayment}
                  onChange={(e) => setCarPayment(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="350"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Parking ($/mo)</label>
                <input
                  type="number"
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Tolls ($/mo)</label>
                <input
                  type="number"
                  value={tolls}
                  onChange={(e) => setTolls(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Public Transit</label>
              <input
                type="number"
                value={publicTransitCost}
                onChange={(e) => setPublicTransitCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uber/Lyft</label>
              <input
                type="number"
                value={uberLyft}
                onChange={(e) => setUberLyft(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bike Maint.</label>
              <input
                type="number"
                value={bikeMaintenance}
                onChange={(e) => setBikeMaintenance(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-cyan-50 border border-cyan-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Transportation Cost Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-cyan-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">All transportation expenses</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Cost per Mile</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.costPerMile.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{result.monthlyCommuteDistance.toFixed(0)} mi/month</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Budget Status</h4>
              <p className={`text-xl font-bold ${result.isOverBudget ? 'text-red-700' : 'text-green-700'}`}>
                {result.isOverBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.isOverBudget ? 'Over budget' : 'Under budget'}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Expense Breakdown</h4>
            <div className="space-y-2 mt-2">
              {(result.primaryMode === 'car' || result.primaryMode === 'mixed' ? result.carCategories : result.transitCategories).map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <span className="font-bold text-cyan-600">$${cat.amount.toFixed(0)}/mo</span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Annual Total: $${result.totalAnnual.toFixed(0)}
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Mode Comparison</h4>
            <div className="grid md:grid-cols-4 gap-2 mt-2">
              {result.modes.map((m, i) => (
                <div key={i} className={`p-2 rounded text-center ${m.mode.toLowerCase().includes(result.primaryMode) ? 'bg-cyan-100' : 'bg-gray-50'}`}>
                  <p className="text-xs font-medium">{m.mode}</p>
                  <p className="text-sm font-bold text-gray-700">$${m.cost.toFixed(0)}/mo</p>
                  <p className="text-xs text-gray-500">{m.convenience}</p>
                </div>
              ))}
            </div>
          </div>

          {result.potentialSavings > 0 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
              <h4 className="font-medium text-green-800">Potential Savings</h4>
              <p className="text-sm mt-1 text-green-700">
                Switching to public transit could save $${result.potentialSavings.toFixed(0)}/month
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Transportation Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-cyan-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Transportation should be 5-10% of income. Car ownership costs $8,000-12,000/year including depreciation. Public transit costs 10-20% of car expenses. Consider proximity to work when choosing housing. Remote work eliminates commute costs. Carpooling and bike commuting offer savings.</p>
      </div>
    </div>
  );
}