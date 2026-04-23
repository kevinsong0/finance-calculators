'use client';

import { useState, useMemo } from 'react';

export default function AutoRepairCostCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('150');
  const [vehicleAge, setVehicleAge] = useState<string>('5');
  const [vehicleValue, setVehicleValue] = useState<string>('15000');
  const [mileage, setMileage] = useState<string>('60000');
  const [vehicleType, setVehicleType] = useState<string>('sedan');
  const [maintenanceStyle, setMaintenanceStyle] = useState<string>('standard');
  const [currentSpending, setCurrentSpending] = useState<string>('1200');
  const [oilChanges, setOilChanges] = useState<string>('2');
  const [tireReplacement, setTireReplacement] = useState<string>('0');
  const [brakeWork, setBrakeWork] = useState<string>('0');
  const [fluidChanges, setFluidChanges] = useState<string>('1');
  const [tuneUps, setTuneUps] = useState<string>('0');
  const [unexpectedRepairs, setUnexpectedRepairs] = useState<string>('0');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const age = parseFloat(vehicleAge) || 0;
    const value = parseFloat(vehicleValue) || 0;
    const miles = parseFloat(mileage) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const oil = parseFloat(oilChanges) || 0;
    const tire = parseFloat(tireReplacement) || 0;
    const brake = parseFloat(brakeWork) || 0;
    const fluid = parseFloat(fluidChanges) || 0;
    const tune = parseFloat(tuneUps) || 0;
    const unexpected = parseFloat(unexpectedRepairs) || 0;

    // Base annual maintenance estimate (based on vehicle age and value)
    const baseAnnual = value * 0.02; // 2% of value baseline

    // Age adjustment
    const ageMultiplier = age > 10 ? 1.5 : age > 7 ? 1.2 : age > 5 ? 1.1 : age > 3 ? 1 : 0.8;

    // Mileage adjustment
    const mileageMultiplier = miles > 100000 ? 1.3 : miles > 75000 ? 1.1 : miles > 50000 ? 1 : 0.9;

    // Vehicle type adjustment
    const typeMultiplier: Record<string, number> = { sedan: 1, suv: 1.2, truck: 1.3, luxury: 1.8, sports: 2 };
    const typeAdj = typeMultiplier[vehicleType] || 1;

    // Maintenance style adjustment
    const styleMultiplier: Record<string, number> = { preventive: 0.7, standard: 1, reactive: 1.5 };
    const styleAdj = styleMultiplier[maintenanceStyle] || 1;

    // Recommended annual budget
    const recommendedAnnual = baseAnnual * ageMultiplier * mileageMultiplier * typeAdj * styleAdj;

    // Routine maintenance costs
    const routineCosts = [
      { name: 'Oil changes', cost: oil * 75, frequency: 'per service' },
      { name: 'Tire replacement', cost: tire * 400, frequency: 'per set' },
      { name: 'Brake work', cost: brake * 300, frequency: 'per service' },
      { name: 'Fluid changes', cost: fluid * 150, frequency: 'per service' },
      { name: 'Tune-ups', cost: tune * 200, frequency: 'per service' },
      { name: 'Annual inspection', cost: 50, frequency: 'annual' },
      { name: 'Unexpected repairs', cost: unexpected, frequency: 'annual' }
    ];

    const totalRoutine = routineCosts.reduce((sum, r) => sum + r.cost, 0);

    // Expected upcoming maintenance based on age/mileage
    const upcomingMaintenance: { name: string; yearsLeft: number; cost: number; urgency: string }[] = [];

    if (miles > 60000 && miles < 90000) {
      upcomingMaintenance.push({ name: 'Timing belt', yearsLeft: Math.max(0, (90000 - miles) / 15000), cost: 500, urgency: 'medium' });
    }

    if (age > 3 && tire === 0) {
      upcomingMaintenance.push({ name: 'Tire replacement', yearsLeft: Math.max(0, 5 - age), cost: 400, urgency: age > 4 ? 'high' : 'low' });
    }

    if (miles > 30000 && brake === 0) {
      upcomingMaintenance.push({ name: 'Brake pads', yearsLeft: Math.max(0, (50000 - miles) / 10000), cost: 300, urgency: miles > 45000 ? 'medium' : 'low' });
    }

    if (age > 5 && fluid === 0) {
      upcomingMaintenance.push({ name: 'Transmission fluid', yearsLeft: 1, cost: 150, urgency: 'medium' });
    }

    if (age > 7) {
      upcomingMaintenance.push({ name: 'Battery replacement', yearsLeft: Math.max(0, 8 - age), cost: 150, urgency: age > 6 ? 'medium' : 'low' });
    }

    if (age > 10) {
      upcomingMaintenance.push({ name: 'Suspension work', yearsLeft: 0, cost: 500, urgency: 'high' });
    }

    const upcomingCost = upcomingMaintenance.reduce((sum, u) => sum + u.cost, 0);

    // Total annual cost
    const totalAnnual = totalRoutine + upcomingCost;

    // Monthly breakdown
    const monthlyCost = totalAnnual / 12;

    // Budget analysis
    const budgetVariance = budget * 12 - spending;
    const isOverBudget = spending > budget * 12;
    const percentOfValue = value > 0 ? (totalAnnual / value) * 100 : 0;

    // Cost per mile
    const costPerMile = miles > 0 ? totalAnnual / miles : 0;

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - review maintenance needs');
    }

    if (percentOfValue > 10 && age > 8) {
      recommendations.push('Maintenance exceeds 10% of value - consider replacement');
    }

    if (maintenanceStyle === 'reactive') {
      recommendations.push('Reactive maintenance costs 50% more - preventive approach saves money');
    }

    if (miles > 100000 && vehicleType === 'luxury') {
      recommendations.push('High-mileage luxury vehicle - repairs increasingly expensive');
    }

    if (age > 8 && value < 10000) {
      recommendations.push('Older vehicle with low value - budget for replacement vs repair');
    }

    if (upcomingMaintenance.filter(u => u.urgency === 'high').length > 0) {
      recommendations.push('Urgent maintenance needed - prioritize safety items');
    }

    return {
      recommendedAnnual,
      totalAnnual,
      totalRoutine,
      upcomingCost,
      monthlyCost,
      budgetVariance,
      isOverBudget,
      percentOfValue,
      costPerMile,
      routineCosts,
      upcomingMaintenance,
      recommendations,
      budget,
      spending,
      age,
      miles,
      value,
      vehicleType
    };
  }, [monthlyBudget, vehicleAge, vehicleValue, mileage, vehicleType, maintenanceStyle, currentSpending, oilChanges, tireReplacement, brakeWork, fluidChanges, tuneUps, unexpectedRepairs]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Auto Repair Cost Calculator</h1>
      <p className="text-gray-600 mb-6">Estimate vehicle maintenance and repair costs by age, mileage, and type</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Vehicle Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="luxury">Luxury</option>
              <option value="sports">Sports Car</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Age (years)</label>
              <input
                type="number"
                value={vehicleAge}
                onChange={(e) => setVehicleAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="60000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Value ($)</label>
            <input
              type="number"
              value={vehicleValue}
              onChange={(e) => setVehicleValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Style</label>
            <select
              value={maintenanceStyle}
              onChange={(e) => setMaintenanceStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="preventive">Preventive (regular service)</option>
              <option value="standard">Standard (as needed)</option>
              <option value="reactive">Reactive (when breaks)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget ($)</label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="150"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Spending ($/yr)</label>
              <input
                type="number"
                value={currentSpending}
                onChange={(e) => setCurrentSpending(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Maintenance Costs This Year</h3>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Routine Maintenance</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Oil Changes (#)</label>
                <input
                  type="number"
                  value={oilChanges}
                  onChange={(e) => setOilChanges(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Tire Replacement (#)</label>
                <input
                  type="number"
                  value={tireReplacement}
                  onChange={(e) => setTireReplacement(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Brake Work (#)</label>
                <input
                  type="number"
                  value={brakeWork}
                  onChange={(e) => setBrakeWork(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Fluid Changes (#)</label>
                <input
                  type="number"
                  value={fluidChanges}
                  onChange={(e) => setFluidChanges(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Tune-ups (#)</label>
                <input
                  type="number"
                  value={tuneUps}
                  onChange={(e) => setTuneUps(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Unexpected ($)</label>
                <input
                  type="number"
                  value={unexpectedRepairs}
                  onChange={(e) => setUnexpectedRepairs(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Auto Repair Cost Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Recommended Annual</h4>
              <p className="text-xl font-bold text-blue-700">$${result.recommendedAnnual.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Based on age, mileage, type</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Total Estimate</h4>
              <p className="text-xl font-bold text-green-700">$${result.totalAnnual.toFixed(0)}/yr</p>
              <p className="text-xs text-gray-500">$${result.monthlyCost.toFixed(0)}/mo</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Budget Status</h4>
              <p className={"text-xl font-bold " + (result.isOverBudget ? 'text-red-700' : 'text-green-700')}>
                {result.isOverBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.isOverBudget ? 'Over' : 'Under'} budget</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Routine Maintenance Breakdown</h4>
            <div className="space-y-1 mt-2">
              {result.routineCosts.map((r, i) => (
                r.cost > 0 && (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{r.name}</span>
                    <span className="font-bold text-blue-600">$${r.cost.toFixed(0)} {r.frequency}</span>
                  </div>
                )
              ))}
            </div>
            <p className="text-sm mt-2 text-gray-600">Total routine: $${result.totalRoutine.toFixed(0)}</p>
          </div>

          {result.upcomingMaintenance.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Upcoming Maintenance</h4>
              <div className="space-y-2 mt-2">
                {result.upcomingMaintenance.map((u, i) => (
                  <div key={i} className={"flex justify-between items-center text-sm p-2 rounded " + (u.urgency === 'high' ? 'bg-red-50' : u.urgency === 'medium' ? 'bg-yellow-50' : 'bg-gray-50')}>
                    <span className="text-gray-600">{u.name}{u.urgency === 'high' && ' ⚠️'}</span>
                    <span className="font-bold text-blue-600">$${u.cost.toFixed(0)} ({u.yearsLeft > 0 ? u.yearsLeft.toFixed(1) + ' yrs' : 'now'})</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">Upcoming costs: $${result.upcomingCost.toFixed(0)}</p>
            </div>
          )}

          <div className="p-3 bg-amber-50 border border-amber-200 rounded mb-4">
            <h4 className="font-medium text-amber-800">Cost Analysis</h4>
            <p className="text-sm mt-1 text-amber-700">
              Cost per mile: $${result.costPerMile.toFixed(3)} | Percent of value: {result.percentOfValue.toFixed(1)}%
            </p>
            <p className="text-sm text-amber-700">
              {result.vehicleType}, {result.age} yrs old, {result.miles} miles
            </p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Maintenance Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-blue-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Annual maintenance averages 2% of vehicle value. Oil changes $50-75 every 5K miles. Tires $400-800 per set (40-60K miles). Brakes $300-600 (30-50K miles). Older vehicles (10+ yrs) cost 50% more. Luxury cars cost 80% more. Preventive maintenance saves 30% vs reactive. Consider replacement when repairs exceed 10% of value annually. Keep maintenance fund of $500-1,500 for unexpected repairs.</p>
      </div>
    </div>
  );
}