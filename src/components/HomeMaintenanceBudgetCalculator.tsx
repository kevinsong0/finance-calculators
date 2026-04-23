'use client';

import { useState, useMemo } from 'react';

export default function HomeMaintenanceBudgetCalculator() {
  const [homeValue, setHomeValue] = useState<string>('400000');
  const [homeAge, setHomeAge] = useState<string>('15');
  const [homeSize, setHomeSize] = useState<string>('2000');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('300');
  const [currentSpending, setCurrentSpending] = useState<string>('250');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('6000');
  const [climate, setClimate] = useState<string>('moderate');
  const [propertyType, setPropertyType] = useState<string>('singleFamily');
  const [maintenanceLevel, setMaintenanceLevel] = useState<string>('average');
  const [hasHOA, setHasHOA] = useState<string>('no');
  const [hoaMonthly, setHoaMonthly] = useState<string>('0');
  const [emergencyReserve, setEmergencyReserve] = useState<string>('5000');
  const [seasonalTasks, setSeasonalTasks] = useState<string>('yes');

  const result = useMemo(() => {
    const value = parseFloat(homeValue) || 0;
    const age = parseFloat(homeAge) || 0;
    const size = parseFloat(homeSize) || 0;
    const budget = parseFloat(monthlyBudget) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const hoa = parseFloat(hoaMonthly) || 0;
    const reserve = parseFloat(emergencyReserve) || 0;

    // 1% rule baseline (annual maintenance = 1% of home value)
    const onePercentAnnual = value * 0.01;
    const onePercentMonthly = onePercentAnnual / 12;

    // Age multiplier (older homes need more maintenance)
    const ageMultiplier = age < 5 ? 0.5 : age < 10 ? 0.75 : age < 20 ? 1 : age < 30 ? 1.25 : 1.5;

    // Size multiplier (larger homes cost more)
    const sizeMultiplier = size < 1000 ? 0.7 : size < 2000 ? 1 : size < 3000 ? 1.3 : 1.6;

    // Climate impact
    const climateMultipliers: Record<string, number> = {
      mild: 0.8,
      moderate: 1,
      harsh: 1.2,
      extreme: 1.4
    };
    const climateMult = climateMultipliers[climate] || 1;

    // Property type impact
    const propertyMultipliers: Record<string, number> = {
      singleFamily: 1,
      condo: 0.6,
      townhouse: 0.8,
      multifamily: 1.2
    };
    const propertyMult = propertyMultipliers[propertyType] || 1;

    // Maintenance level
    const levelMultipliers: Record<string, number> = {
      minimal: 0.7,
      average: 1,
      thorough: 1.3,
      premium: 1.5
    };
    const levelMult = levelMultipliers[maintenanceLevel] || 1;

    // Calculate recommended budget
    const recommendedMonthly = onePercentMonthly * ageMultiplier * sizeMultiplier * climateMult * propertyMult * levelMult;
    const recommendedAnnual = recommendedMonthly * 12;

    // Total monthly including HOA
    const totalMonthly = spending + hoa;
    const totalAnnual = totalMonthly * 12;

    // Budget variance
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;

    // Emergency fund analysis
    const recommendedReserve = recommendedAnnual * 0.5; // 6 months reserve
    const reserveShortfall = Math.max(0, recommendedReserve - reserve);

    // Category breakdown (typical allocation)
    const categories = [
      { name: 'Regular Repairs', percent: 40, amount: recommendedMonthly * 0.4 },
      { name: 'Seasonal Tasks', percent: 20, amount: recommendedMonthly * 0.2 },
      { name: 'Appliance Replacement', percent: 15, amount: recommendedMonthly * 0.15 },
      { name: 'Systems Maintenance', percent: 15, amount: recommendedMonthly * 0.15 },
      { name: 'Exterior/Landscaping', percent: 10, amount: recommendedMonthly * 0.1 }
    ];

    // Seasonal tasks estimate
    const seasonalEstimates = [
      { task: 'Spring: HVAC tune-up, gutter cleaning', cost: 150 },
      { task: 'Summer: Exterior inspection, deck maintenance', cost: 200 },
      { task: 'Fall: Heating prep, weather sealing', cost: 150 },
      { task: 'Winter: Snow removal, pipe insulation', cost: climate === 'harsh' || climate === 'extreme' ? 300 : 50 }
    ];
    const annualSeasonal = seasonalEstimates.reduce((sum, s) => sum + s.cost, 0);

    // Age-related concerns
    const ageConcerns: { concern: string; urgency: string }[] = [];
    if (age > 10) {
      ageConcerns.push({ concern: 'HVAC system approaching replacement age', urgency: 'Monitor' });
    }
    if (age > 15) {
      ageConcerns.push({ concern: 'Roof may need inspection', urgency: 'Plan' });
    }
    if (age > 20) {
      ageConcerns.push({ concern: 'Plumbing and electrical systems aging', urgency: 'Budget' });
    }
    if (age > 30) {
      ageConcerns.push({ concern: 'Major systems replacement likely needed', urgency: 'Priority' });
    }

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - consider increasing budget');
    }

    if (spending < recommendedMonthly * 0.7) {
      recommendations.push('Under-spending may lead to deferred maintenance - increase budget');
    }

    if (reserveShortfall > 0) {
      recommendations.push('Emergency reserve shortfall $${reserveShortfall.toFixed(0)} - build fund');
    }

    if (age > 20 && reserve < recommendedAnnual) {
      recommendations.push('Older home needs larger reserve for major repairs');
    }

    if (hoa > 0 && propertyType === 'condo') {
      recommendations.push('HOA covers some maintenance - adjust budget accordingly');
    }

    if (totalAnnual > income * 0.05) {
      recommendations.push('Home maintenance exceeds 5% of income - review costs');
    }

    return {
      onePercentMonthly,
      onePercentAnnual,
      recommendedMonthly,
      recommendedAnnual,
      totalMonthly,
      totalAnnual,
      budgetVariance,
      isOverBudget,
      recommendedReserve,
      reserveShortfall,
      categories,
      seasonalEstimates,
      annualSeasonal,
      ageConcerns,
      recommendations,
      budget,
      spending,
      hoa,
      reserve,
      age
    };
  }, [homeValue, homeAge, homeSize, monthlyBudget, currentSpending, monthlyIncome, climate, propertyType, maintenanceLevel, hasHOA, hoaMonthly, emergencyReserve, seasonalTasks]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Maintenance Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan annual home maintenance using the 1% rule and customized factors</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Home Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Value ($)</label>
            <input
              type="number"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400000"
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="singleFamily">Single Family Home</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="multifamily">Multi-family</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Climate</label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="mild">Mild (minimal seasonal impact)</option>
              <option value="moderate">Moderate (seasonal changes)</option>
              <option value="harsh">Harsh (extreme winters/heat)</option>
              <option value="extreme">Extreme (severe weather)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget &amp; Preferences</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Maintenance Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Level</label>
            <select
              value={maintenanceLevel}
              onChange={(e) => setMaintenanceLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimal">Minimal (reactive only)</option>
              <option value="average">Average (preventive basics)</option>
              <option value="thorough">Thorough (comprehensive care)</option>
              <option value="premium">Premium (proactive+upgrades)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HOA Monthly ($)</label>
              <input
                type="number"
                value={hoaMonthly}
                onChange={(e) => setHoaMonthly(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Reserve ($)</label>
              <input
                type="number"
                value={emergencyReserve}
                onChange={(e) => setEmergencyReserve(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6000"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Maintenance Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">1% Rule Baseline</h4>
              <p className="text-xl font-bold text-slate-700">$${result.onePercentMonthly.toFixed(0)}/mo</p>
              <p className="text-xs text-gray-500">$${result.onePercentAnnual.toFixed(0)}/year</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Recommended Budget</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.recommendedMonthly.toFixed(0)}/mo</p>
              <p className="text-xs text-gray-500">Adjusted for your home</p>
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
            <h4 className="font-medium text-gray-800">Budget Allocation</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-slate-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Seasonal Maintenance Tasks</h4>
            <div className="space-y-1 mt-2">
              {result.seasonalEstimates.map((s, i) => (
                <div key={i} className="flex justify-between text-sm text-blue-700">
                  <span>{s.task}</span>
                  <span>$${s.cost}</span>
                </div>
              ))}
              <p className="text-sm font-medium text-blue-800 mt-2">Annual seasonal: $${result.annualSeasonal}</p>
            </div>
          </div>

          {result.ageConcerns.length > 0 && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded mb-4">
              <h4 className="font-medium text-orange-800">Age-Related Concerns ({result.age} years)</h4>
              <ul className="mt-2 space-y-1">
                {result.ageConcerns.map((ac, i) => (
                  <li key={i} className="text-sm text-orange-700">
                    ⚠️ {ac.concern} - <span className="font-medium">{ac.urgency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={`p-3 rounded border mb-4 ${result.reserveShortfall > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <h4 className={`font-medium ${result.reserveShortfall > 0 ? 'text-yellow-800' : 'text-green-800'}`}>Emergency Reserve Status</h4>
            <p className="text-sm mt-1">
              Recommended reserve: $${result.recommendedReserve.toFixed(0)} (6 months of maintenance)
            </p>
            {result.reserveShortfall > 0 ? (
              <p className="text-sm text-yellow-700">
                Shortfall: $${result.reserveShortfall.toFixed(0)} - build reserve for unexpected repairs
              </p>
            ) : (
              <p className="text-sm text-green-700">✓ Reserve adequate for major repairs</p>
            )}
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Maintenance Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-slate-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> The 1% rule suggests annual maintenance = 1% of home value. Adjust based on age (older homes need more), size, climate, and maintenance level. Emergency reserves should cover 6 months of maintenance costs for unexpected repairs like HVAC failure or roof damage. Preventive maintenance reduces costly emergency repairs.</p>
      </div>
    </div>
  );
}