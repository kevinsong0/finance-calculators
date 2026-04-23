'use client';

import { useState, useMemo } from 'react';

export default function UtilityCostOptimizerCalculator() {
  const [electricMonthly, setElectricMonthly] = useState<string>('150');
  const [electricRate, setElectricRate] = useState<string>('0.12');
  const [electricUsage, setElectricUsage] = useState<string>('1200');
  const [gasMonthly, setGasMonthly] = useState<string>('60');
  const [gasRate, setGasRate] = useState<string>('1.20');
  const [gasUsage, setGasUsage] = useState<string>('50');
  const [waterMonthly, setWaterMonthly] = useState<string>('40');
  const [waterUsage, setWaterUsage] = useState<string>('5000');
  const [hasSmartThermostat, setHasSmartThermostat] = useState<boolean>(false);
  const [hasLEDLights, setHasLEDLights] = useState<boolean>(true);
  const [hasEnergyStarAppliances, setHasEnergyStarAppliances] = useState<boolean>(false);
  const [homeSize, setHomeSize] = useState<string>('1500');
  const [climateZone, setClimateZone] = useState<string>('mixed');
  const [numberOfResidents, setNumberOfResidents] = useState<string>('2');

  const result = useMemo(() => {
    const electric = parseFloat(electricMonthly) || 0;
    const electricRateVal = parseFloat(electricRate) || 0.12;
    const electricUsageVal = parseFloat(electricUsage) || 0;
    const gas = parseFloat(gasMonthly) || 0;
    const gasRateVal = parseFloat(gasRate) || 1.20;
    const gasUsageVal = parseFloat(gasUsage) || 0;
    const water = parseFloat(waterMonthly) || 0;
    const waterUsageVal = parseFloat(waterUsage) || 0;
    const size = parseFloat(homeSize) || 0;
    const residents = parseInt(numberOfResidents) || 1;

    const totalUtilityCost = electric + gas + water;
    const annualUtilityCost = totalUtilityCost * 12;

    // Per resident analysis
    const perResidentCost = totalUtilityCost / residents;
    const perSqmCost = size > 0 ? totalUtilityCost / size : 0;

    // Usage efficiency
    const electricPerResident = electricUsageVal / residents;
    const electricPerSqm = size > 0 ? electricUsageVal / size : 0;

    // Potential savings estimates
    const savingsOpportunities: { name: string; potentialSavings: number; investmentCost: number; roiMonths: number }[] = [];

    // Smart thermostat savings: 10-15% on heating/cooling
    if (!hasSmartThermostat && (gas > 30 || electric > 100)) {
      const thermostatSavings = (gas * 0.12 + electric * 0.05); // Mixed savings
      savingsOpportunities.push({
        name: 'Smart Thermostat',
        potentialSavings: thermostatSavings,
        investmentCost: 150,
        roiMonths: thermostatSavings > 0 ? Math.round(150 / thermostatSavings) : 0
      });
    }

    // LED conversion savings: 75% reduction in lighting portion (~10% of electric)
    if (!hasLEDLights && electric > 80) {
      const ledSavings = electric * 0.10 * 0.75;
      savingsOpportunities.push({
        name: 'LED Light Conversion',
        potentialSavings: ledSavings,
        investmentCost: 50,
        roiMonths: ledSavings > 0 ? Math.round(50 / ledSavings) : 0
      });
    }

    // Energy Star appliances: 10-20% reduction
    if (!hasEnergyStarAppliances && electric > 100) {
      const applianceSavings = electric * 0.15;
      savingsOpportunities.push({
        name: 'Energy Star Appliances',
        potentialSavings: applianceSavings,
        investmentCost: 500, // Average upgrade cost
        roiMonths: applianceSavings > 0 ? Math.round(500 / applianceSavings) : 0
      });
    }

    // Water efficiency
    if (water > 35) {
      const waterSavings = water * 0.20;
      savingsOpportunities.push({
        name: 'Low-Flow Fixtures',
        potentialSavings: waterSavings,
        investmentCost: 100,
        roiMonths: waterSavings > 0 ? Math.round(100 / waterSavings) : 0
      });
    }

    // Solar consideration for high electric usage
    if (electric > 150 && electricUsageVal > 1000) {
      const solarSavings = electric * 0.70;
      savingsOpportunities.push({
        name: 'Solar Panels (Partial)',
        potentialSavings: solarSavings,
        investmentCost: 5000,
        roiMonths: solarSavings > 0 ? Math.round(5000 / solarSavings) : 0
      });
    }

    // Total potential savings
    const totalPotentialSavings = savingsOpportunities.reduce((sum, s) => sum + s.potentialSavings, 0);
    const totalInvestmentCost = savingsOpportunities.reduce((sum, s) => sum + s.investmentCost, 0);

    // Usage benchmarks by climate
    let electricBenchmark = 0;
    let gasBenchmark = 0;

    if (climateZone === 'cold') {
      electricBenchmark = residents * 400 + size * 0.5; // Higher heating
      gasBenchmark = residents * 60 + size * 0.08;
    } else if (climateZone === 'hot') {
      electricBenchmark = residents * 500 + size * 0.6; // Higher AC
      gasBenchmark = residents * 20;
    } else {
      electricBenchmark = residents * 350 + size * 0.4;
      gasBenchmark = residents * 40 + size * 0.05;
    }

    const electricVsBenchmark = electricUsageVal > 0 ? ((electricUsageVal / electricBenchmark) * 100).toFixed(0) : '0';
    const gasVsBenchmark = gasUsageVal > 0 ? ((gasUsageVal / gasBenchmark) * 100).toFixed(0) : '0';

    // Recommendations
    const recommendations: string[] = [];

    if (electric > residents * 60) {
      recommendations.push('Electric cost high per resident - evaluate usage patterns');
    }

    if (gas > residents * 40 && climateZone !== 'cold') {
      recommendations.push('High gas usage in moderate climate - check heating efficiency');
    }

    if (water > residents * 25) {
      recommendations.push('Water usage above average - consider low-flow fixtures');
    }

    if (savingsOpportunities.length > 3) {
      recommendations.push('Multiple efficiency improvements available - prioritize by ROI');
    }

    // Quick wins (low investment, quick ROI)
    const quickWins = savingsOpportunities.filter(s => s.roiMonths <= 6);
    if (quickWins.length > 0) {
      recommendations.push('Quick wins available: ' + quickWins.map(q => q.name).join(', '));
    }

    return {
      totalUtilityCost,
      annualUtilityCost,
      perResidentCost,
      perSqmCost,
      electricPerResident,
      savingsOpportunities,
      totalPotentialSavings,
      totalInvestmentCost,
      electricVsBenchmark,
      gasVsBenchmark,
      electricBenchmark,
      gasBenchmark,
      recommendations,
      electric,
      gas,
      water
    };
  }, [electricMonthly, electricRate, electricUsage, gasMonthly, gasRate, gasUsage, waterMonthly, waterUsage, hasSmartThermostat, hasLEDLights, hasEnergyStarAppliances, homeSize, climateZone, numberOfResidents]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Utility Cost Optimizer Calculator</h1>
      <p className="text-gray-600 mb-6">Analyze utility costs and identify efficiency improvement opportunities</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Utility Costs</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Electric Bill ($/month)</label>
            <input
              type="number"
              value={electricMonthly}
              onChange={(e) => setElectricMonthly(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Electric Rate ($/kWh)</label>
            <input
              type="number"
              value={electricRate}
              onChange={(e) => setElectricRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.12"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Electric Usage (kWh/month)</label>
            <input
              type="number"
              value={electricUsage}
              onChange={(e) => setElectricUsage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gas Bill ($/month)</label>
            <input
              type="number"
              value={gasMonthly}
              onChange={(e) => setGasMonthly(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gas Usage (therms/month)</label>
            <input
              type="number"
              value={gasUsage}
              onChange={(e) => setGasUsage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Water Bill ($/month)</label>
            <input
              type="number"
              value={waterMonthly}
              onChange={(e) => setWaterMonthly(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="40"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Home & Efficiency</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Size (sq ft)</label>
            <input
              type="number"
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Residents</label>
            <input
              type="number"
              value={numberOfResidents}
              onChange={(e) => setNumberOfResidents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Climate Zone</label>
            <select
              value={climateZone}
              onChange={(e) => setClimateZone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="cold">Cold (heavy heating)</option>
              <option value="mixed">Mixed (moderate heating/cooling)</option>
              <option value="hot">Hot (heavy cooling)</option>
            </select>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Current Efficiency Features</h4>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasSmartThermostat}
                onChange={(e) => setHasSmartThermostat(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-600">Smart Thermostat</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasLEDLights}
                onChange={(e) => setHasLEDLights(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-600">LED Lighting</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasEnergyStarAppliances}
                onChange={(e) => setHasEnergyStarAppliances(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-600">Energy Star Appliances</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Utility Cost Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Monthly Utilities</h4>
              <p className="text-xl font-bold text-green-700">$${result.totalUtilityCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">$${result.annualUtilityCost.toFixed(0)}/year</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Resident Cost</h4>
              <p className="text-xl font-bold text-blue-700">$${result.perResidentCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly per person</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Potential Savings</h4>
              <p className="text-xl font-bold text-orange-700">$${result.totalPotentialSavings.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly with improvements</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Utility Breakdown</h4>
            <div className="grid md:grid-cols-3 gap-2 mt-2">
              <div>
                <p className="text-sm text-gray-600">Electric: <span className="font-bold text-yellow-600">$${result.electric.toFixed(0)}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gas: <span className="font-bold text-orange-600">$${result.gas.toFixed(0)}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Water: <span className="font-bold text-blue-600">$${result.water.toFixed(0)}</span></p>
              </div>
            </div>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Savings Opportunities</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-gray-700">{opp.name}</span>
                      <p className="text-xs text-gray-500">Investment: $${opp.investmentCost.toFixed(0)} | ROI: {opp.roiMonths} months</p>
                    </div>
                    <span className="font-bold text-green-600">$${opp.potentialSavings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Total investment: $${result.totalInvestmentCost.toFixed(0)} | Total monthly savings: $${result.totalPotentialSavings.toFixed(0)}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Usage vs Benchmark</h4>
              <p className="text-sm mt-1">Electric: <span className={parseFloat(result.electricVsBenchmark) > 100 ? 'text-red-600' : 'text-green-600'}>
                {result.electricVsBenchmark}% of benchmark
              </span></p>
              <p className="text-sm">Gas: <span className={parseFloat(result.gasVsBenchmark) > 100 ? 'text-red-600' : 'text-green-600'}>
                {result.gasVsBenchmark}% of benchmark
              </span></p>
              <p className="text-xs text-gray-500 mt-1">Benchmark based on {climateZone} climate, {numberOfResidents} residents</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Cost Efficiency</h4>
              <p className="text-sm mt-1">Cost per resident: $${result.perResidentCost.toFixed(0)}</p>
              <p className="text-sm">Cost per sq ft: $${result.perSqmCost.toFixed(2)}</p>
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Optimization Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Savings estimates are approximate based on typical efficiency improvements. Actual savings depend on usage patterns, local rates, and appliance age. Quick wins (ROI under 6 months) should be prioritized. Consider professional energy audit for accurate assessment. Utility rates vary significantly by region.</p>
      </div>
    </div>
  );
}