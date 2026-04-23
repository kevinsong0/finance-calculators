'use client';

import { useState, useMemo } from 'react';

export default function UtilityCostCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('200');
  const [homeSize, setHomeSize] = useState<string>('2000');
  const [occupants, setOccupants] = useState<string>('4');
  const [climateRegion, setClimateRegion] = useState<string>('mixed');
  const [homeAge, setHomeAge] = useState<string>('15');
  const [electricRate, setElectricRate] = useState<string>('0.12');
  const [gasRate, setGasRate] = useState<string>('1.20');
  const [waterRate, setWaterRate] = useState<string>('5');
  const [electricUsage, setElectricUsage] = useState<string>('900');
  const [gasUsage, setGasUsage] = useState<string>('60');
  const [waterUsage, setWaterUsage] = useState<string>('100');
  const [internetCost, setInternetCost] = useState<string>('60');
  const [trashCost, setTrashCost] = useState<string>('30');
  const [phoneCost, setPhoneCost] = useState<string>('0');
  const [streamingCost, setStreamingCost] = useState<string>('30');
  const [hasSolar, setHasSolar] = useState<string>('no');
  const [solarOffset, setSolarOffset] = useState<string>('0');
  const [seasonalAdjust, setSeasonalAdjust] = useState<string>('1');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const size = parseFloat(homeSize) || 0;
    const people = parseFloat(occupants) || 1;
    const age = parseFloat(homeAge) || 0;
    const electricR = parseFloat(electricRate) || 0.12;
    const gasR = parseFloat(gasRate) || 1.20;
    const waterR = parseFloat(waterRate) || 5;
    const electricU = parseFloat(electricUsage) || 0;
    const gasU = parseFloat(gasUsage) || 0;
    const waterU = parseFloat(waterUsage) || 0;
    const internet = parseFloat(internetCost) || 0;
    const trash = parseFloat(trashCost) || 0;
    const phone = parseFloat(phoneCost) || 0;
    const streaming = parseFloat(streamingCost) || 0;
    const solar = parseFloat(solarOffset) || 0;
    const seasonal = parseFloat(seasonalAdjust) || 1;

    // Baseline estimates based on home size, occupants, region
    const sizeMultipliers: Record<string, number> = { small: 0.7, medium: 1, large: 1.3, xlarge: 1.6 };
    const sizeAdj = size < 1000 ? 0.7 : size < 2000 ? 1 : size < 3000 ? 1.3 : 1.6;

    // Climate region baselines
    const regionBaselines: Record<string, { electric: number; gas: number }> = {
      north: { electric: 800, gas: 100 },
      south: { electric: 1200, gas: 30 },
      mixed: { electric: 900, gas: 60 },
      desert: { electric: 1500, gas: 10 }
    };
    const baseline = regionBaselines[climateRegion] || { electric: 900, gas: 60 };

    // Occupant multiplier for water
    const waterMultiplier = people > 6 ? 2 : people > 4 ? 1.5 : people > 2 ? 1.2 : 1;

    // Age multiplier (older homes less efficient)
    const ageMultiplier = age > 30 ? 1.2 : age > 20 ? 1.1 : age > 10 ? 1.05 : 1;

    // Calculate actual costs
    const electricCost = Math.max(0, (electricU - solar) * electricR * seasonal);
    const gasCost = gasU * gasR * seasonal;
    const waterCost = waterU * waterR * waterMultiplier;
    const sewerCost = waterCost * 0.5; // Sewer typically 50% of water
    const otherUtilities = internet + trash + phone + streaming;

    const totalMonthly = electricCost + gasCost + waterCost + sewerCost + otherUtilities;

    // Annual costs
    const annualElectric = electricCost * 12;
    const annualGas = gasCost * 12;
    const annualWater = waterCost * 12 + sewerCost * 12;
    const annualTotal = totalMonthly * 12;

    // Budget analysis
    const budgetVariance = budget - totalMonthly;
    const isOverBudget = totalMonthly > budget;

    // Cost per sq ft
    const costPerSqFt = size > 0 ? totalMonthly / size : 0;

    // Cost per person
    const costPerPerson = people > 0 ? totalMonthly / people : 0;

    // Category breakdown
    const categories = [
      { name: 'Electric', amount: electricCost, percent: (electricCost / totalMonthly) * 100, annual: annualElectric },
      { name: 'Gas', amount: gasCost, percent: (gasCost / totalMonthly) * 100, annual: annualGas },
      { name: 'Water/Sewer', amount: waterCost + sewerCost, percent: ((waterCost + sewerCost) / totalMonthly) * 100, annual: annualWater },
      { name: 'Internet', amount: internet, percent: (internet / totalMonthly) * 100, annual: internet * 12 },
      { name: 'Trash', amount: trash, percent: (trash / totalMonthly) * 100, annual: trash * 12 },
      { name: 'Phone/Streaming', amount: phone + streaming, percent: ((phone + streaming) / totalMonthly) * 100, annual: (phone + streaming) * 12 }
    ].filter(c => c.amount > 0);

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (electricCost > 150) {
      savingsOpportunities.push({ action: 'LED bulbs, smart thermostat', savings: electricCost * 0.15 });
    }

    if (age > 15 && electricCost > 100) {
      savingsOpportunities.push({ action: 'Weatherization, insulation', savings: electricCost * 0.1 + gasCost * 0.1 });
    }

    if (waterCost > 50) {
      savingsOpportunities.push({ action: 'Low-flow fixtures, fix leaks', savings: waterCost * 0.2 });
    }

    if (internet > 70) {
      savingsOpportunities.push({ action: 'Compare internet providers', savings: internet * 0.2 });
    }

    if (streaming > 40) {
      savingsOpportunities.push({ action: 'Rotate streaming subscriptions', savings: streaming * 0.3 });
    }

    if (hasSolar === 'no' && electricCost > 100) {
      savingsOpportunities.push({ action: 'Consider solar panels', savings: electricCost * 0.7 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - target highest cost categories');
    }

    if (electricCost > totalMonthly * 0.5) {
      recommendations.push('Electric dominates budget - efficiency improvements priority');
    }

    if (costPerSqFt > 0.15) {
      recommendations.push('High cost per sq ft - check insulation, HVAC efficiency');
    }

    if (age > 25) {
      recommendations.push('Older home - efficiency upgrades offer good ROI');
    }

    if (people > 4 && waterCost > 80) {
      recommendations.push('Large household water costs - consider water-saving fixtures');
    }

    return {
      totalMonthly,
      annualTotal,
      budgetVariance,
      isOverBudget,
      costPerSqFt,
      costPerPerson,
      categories,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      size,
      people,
      age,
      electricCost,
      gasCost,
      waterCost
    };
  }, [monthlyBudget, homeSize, occupants, climateRegion, homeAge, electricRate, gasRate, waterRate, electricUsage, gasUsage, waterUsage, internetCost, trashCost, phoneCost, streamingCost, hasSolar, solarOffset, seasonalAdjust]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Utility Cost Calculator</h1>
      <p className="text-gray-600 mb-6">Estimate monthly utility costs and identify savings opportunities</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Home Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Size (sq ft)</label>
              <input
                type="number"
                value={homeSize}
                onChange={(e) => setHomeSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupants</label>
              <input
                type="number"
                value={occupants}
                onChange={(e) => setOccupants(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Climate Region</label>
            <select
              value={climateRegion}
              onChange={(e) => setClimateRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="north">Northern (cold winters)</option>
              <option value="south">Southern (hot summers)</option>
              <option value="mixed">Mixed (both seasons)</option>
              <option value="desert">Desert (extreme heat)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Age (years)</label>
            <input
              type="number"
              value={homeAge}
              onChange={(e) => setHomeAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="200"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Utility Usage</h3>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Rates</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Electric ($/kWh)</label>
                <input
                  type="number"
                  step="0.01"
                  value={electricRate}
                  onChange={(e) => setElectricRate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0.12"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Gas ($/therm)</label>
                <input
                  type="number"
                  step="0.01"
                  value={gasRate}
                  onChange={(e) => setGasRate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="1.20"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Water ($/100gal)</label>
                <input
                  type="number"
                  value={waterRate}
                  onChange={(e) => setWaterRate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Electric (kWh)</label>
              <input
                type="number"
                value={electricUsage}
                onChange={(e) => setElectricUsage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gas (therms)</label>
              <input
                type="number"
                value={gasUsage}
                onChange={(e) => setGasUsage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Water (100 gal)</label>
              <input
                type="number"
                value={waterUsage}
                onChange={(e) => setWaterUsage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Internet ($)</label>
              <input
                type="number"
                value={internetCost}
                onChange={(e) => setInternetCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trash ($)</label>
              <input
                type="number"
                value={trashCost}
                onChange={(e) => setTrashCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone ($)</label>
              <input
                type="number"
                value={phoneCost}
                onChange={(e) => setPhoneCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Streaming ($)</label>
              <input
                type="number"
                value={streamingCost}
                onChange={(e) => setStreamingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solar Panels?</label>
              <select
                value={hasSolar}
                onChange={(e) => setHasSolar(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Solar Offset (kWh)</label>
              <input
                type="number"
                value={solarOffset}
                onChange={(e) => setSolarOffset(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Utility Cost Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Total</h4>
              <p className="text-xl font-bold text-yellow-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">$${result.costPerSqFt.toFixed(2)}/sq ft</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Annual Cost</h4>
              <p className="text-xl font-bold text-blue-700">$${result.annualTotal.toFixed(0)}</p>
              <p className="text-xs text-gray-500">$${result.costPerPerson.toFixed(0)}/person</p>
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
            <h4 className="font-medium text-gray-800">Utility Breakdown</h4>
            <div className="space-y-1 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-yellow-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Electric: $${result.electricCost.toFixed(0)} | Gas: $${result.gasCost.toFixed(0)} | Water: $${result.waterCost.toFixed(0)}
            </p>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Savings Opportunities</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">-$${opp.savings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}/month</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Utility Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-yellow-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Average utility costs: Electric $100-150/mo, Gas $50-100/mo (varies by region), Water $40-80/mo, Internet $50-80/mo. Larger homes cost 30-60% more. Northern regions use more gas, southern use more electric. Older homes 10-20% higher due to efficiency. Solar can offset 50-80% of electric. LED bulbs save 15%, smart thermostat saves 10%, low-flow fixtures save 20% water. Compare providers annually for best rates.</p>
      </div>
    </div>
  );
}