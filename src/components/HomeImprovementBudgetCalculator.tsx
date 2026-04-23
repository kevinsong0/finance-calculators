'use client';

import { useState, useMemo } from 'react';

export default function HomeImprovementBudgetCalculator() {
  const [projectBudget, setProjectBudget] = useState<string>('10000');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('500');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [projectType, setProjectType] = useState<string>('kitchen');
  const [currentEstimate, setCurrentEstimate] = useState<string>('12000');
  const [homeValue, setHomeValue] = useState<string>('300000');
  const [homeAge, setHomeAge] = useState<string>('10');
  const [laborCost, setLaborCost] = useState<string>('50');
  const [materialsCost, setMaterialsCost] = useState<string>('40');
  const [permitsCost, setPermitsCost] = useState<string>('5');
  const [contingency, setContingency] = useState<string>('10');
  const [diyLevel, setDiyLevel] = useState<string>('none');
  const [timelineMonths, setTimelineMonths] = useState<string>('3');
  const [financingType, setFinancingType] = useState<string>('cash');

  const result = useMemo(() => {
    const budget = parseFloat(projectBudget) || 0;
    const monthly = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const estimate = parseFloat(currentEstimate) || 0;
    const homeVal = parseFloat(homeValue) || 0;
    const age = parseFloat(homeAge) || 0;
    const labor = parseFloat(laborCost) || 0;
    const materials = parseFloat(materialsCost) || 0;
    const permits = parseFloat(permitsCost) || 0;
    const cont = parseFloat(contingency) || 0;
    const months = parseFloat(timelineMonths) || 1;

    // Project type baseline costs (national averages)
    const projectBaselines: Record<string, { low: number; mid: number; high: number; roi: number }> = {
      kitchen: { low: 8000, mid: 25000, high: 50000, roi: 60 },
      bathroom: { low: 3000, mid: 10000, high: 25000, roi: 55 },
      basement: { low: 10000, mid: 30000, high: 60000, roi: 70 },
      roof: { low: 5000, mid: 10000, high: 20000, roi: 50 },
      siding: { low: 5000, mid: 12000, high: 20000, roi: 65 },
      windows: { low: 3000, mid: 8000, high: 15000, roi: 70 },
      flooring: { low: 2000, mid: 6000, high: 12000, roi: 50 },
      landscaping: { low: 1000, mid: 5000, high: 15000, roi: 100 },
      deck: { low: 2000, mid: 8000, high: 15000, roi: 65 },
      hvac: { low: 3000, mid: 7000, high: 12000, roi: 40 }
    };

    const baseline = projectBaselines[projectType] || { low: 5000, mid: 15000, high: 30000, roi: 50 };

    // DIY savings calculation
    const diySavings: Record<string, number> = { none: 0, some: 0.2, most: 0.5, all: 0.8 };
    const diyMultiplier = diySavings[diyLevel] || 0;

    // Calculate cost components
    const laborAmount = estimate * (labor / 100);
    const materialsAmount = estimate * (materials / 100);
    const permitsAmount = estimate * (permits / 100);
    const contingencyAmount = estimate * (cont / 100);

    // DIY adjustment
    const savedLabor = laborAmount * diyMultiplier;
    const adjustedTotal = estimate - savedLabor;

    // Total project cost with contingency
    const totalProjectCost = adjustedTotal + permitsAmount + contingencyAmount;

    // Monthly savings needed
    const monthlySavingsNeeded = totalProjectCost / months;

    // Budget variance
    const budgetVariance = budget - totalProjectCost;
    const isOverBudget = totalProjectCost > budget;

    // ROI calculation
    const roiPercent = baseline.roi;
    const homeValueIncrease = totalProjectCost * (roiPercent / 100);
    const netInvestment = totalProjectCost - homeValueIncrease;

    // Home value percentage
    const percentOfHomeValue = homeVal > 0 ? (totalProjectCost / homeVal) * 100 : 0;

    // Financing costs
    const financingOptions = [
      { type: 'cash', rate: 0, monthly: 0, totalInterest: 0 },
      { type: 'heloc', rate: 8.5, monthly: (totalProjectCost * 0.085 / 12), totalInterest: totalProjectCost * 0.085 },
      { type: 'loan', rate: 7, monthly: (totalProjectCost * 0.07 / 12), totalInterest: totalProjectCost * 0.07 },
      { type: 'credit', rate: 18, monthly: (totalProjectCost * 0.18 / 12), totalInterest: totalProjectCost * 0.18 }
    ];

    // Age-based considerations
    const ageConsiderations: string[] = [];
    if (age > 20) {
      ageConsiderations.push('Older home - budget extra for unexpected repairs');
    }
    if (age > 30) {
      ageConsiderations.push('Consider structural inspections before major projects');
    }

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - consider phased approach');
    }

    if (percentOfHomeValue > 10) {
      recommendations.push('Project exceeds 10% of home value - verify ROI potential');
    }

    if (diyLevel === 'none' && labor > 60) {
      recommendations.push('High labor costs - consider DIY for finishing work');
    }

    if (cont < 10) {
      recommendations.push('Low contingency - recommend 15-20% for older homes');
    }

    if (financingType === 'credit') {
      recommendations.push('Credit card financing expensive - consider HELOC or cash');
    }

    if (roiPercent < 50 && netInvestment > 5000) {
      recommendations.push('Low ROI project - focus on personal enjoyment vs resale');
    }

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (diyLevel === 'none') {
      savingsOpportunities.push({ action: 'DIY finishing/painting work', savings: laborAmount * 0.3 });
    }

    if (materialsAmount > totalProjectCost * 0.5) {
      savingsOpportunities.push({ action: 'Shop for materials, compare suppliers', savings: materialsAmount * 0.15 });
    }

    if (timelineMonths === '1' || months < 2) {
      savingsOpportunities.push({ action: 'Extend timeline, spread costs', savings: 0 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    return {
      totalProjectCost,
      monthlySavingsNeeded,
      budgetVariance,
      isOverBudget,
      homeValueIncrease,
      netInvestment,
      roiPercent,
      percentOfHomeValue,
      laborAmount,
      materialsAmount,
      permitsAmount,
      contingencyAmount,
      savedLabor,
      financingOptions,
      baseline,
      ageConsiderations,
      recommendations,
      savingsOpportunities,
      totalPotentialSavings,
      budget,
      estimate,
      projectType,
      diyLevel,
      months,
      financingType,
      homeVal
    };
  }, [projectBudget, monthlyBudget, monthlyIncome, projectType, currentEstimate, homeValue, homeAge, laborCost, materialsCost, permitsCost, contingency, diyLevel, timelineMonths, financingType]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Improvement Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan renovation costs, ROI, and financing options for your project</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Project Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="kitchen">Kitchen Remodel</option>
              <option value="bathroom">Bathroom Remodel</option>
              <option value="basement">Basement Finishing</option>
              <option value="roof">Roof Replacement</option>
              <option value="siding">Siding Replacement</option>
              <option value="windows">Window Replacement</option>
              <option value="flooring">Flooring Update</option>
              <option value="landscaping">Landscaping</option>
              <option value="deck">Deck/Patio</option>
              <option value="hvac">HVAC System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Budget ($)</label>
            <input
              type="number"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Estimate ($)</label>
            <input
              type="number"
              value={currentEstimate}
              onChange={(e) => setCurrentEstimate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="12000"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Value ($)</label>
              <input
                type="number"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="300000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Age (years)</label>
              <input
                type="number"
                value={homeAge}
                onChange={(e) => setHomeAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeline (months)</label>
            <input
              type="number"
              value={timelineMonths}
              onChange={(e) => setTimelineMonths(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Cost Breakdown</h3>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">Cost Components (%)</h4>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Labor %</label>
                <input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Materials %</label>
                <input
                  type="number"
                  value={materialsCost}
                  onChange={(e) => setMaterialsCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="40"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Permits %</label>
                <input
                  type="number"
                  value={permitsCost}
                  onChange={(e) => setPermitsCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Contingency %</label>
                <input
                  type="number"
                  value={contingency}
                  onChange={(e) => setContingency(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DIY Level</label>
            <select
              value={diyLevel}
              onChange={(e) => setDiyLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None (Contractor handles all)</option>
              <option value="some">Some (DIY finishing/painting)</option>
              <option value="most">Most (DIY major work)</option>
              <option value="all">All (Complete DIY)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Financing Method</label>
            <select
              value={financingType}
              onChange={(e) => setFinancingType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="cash">Cash/Savings</option>
              <option value="heloc">HELOC</option>
              <option value="loan">Personal Loan</option>
              <option value="credit">Credit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Home Improvement Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Cost</h4>
              <p className="text-xl font-bold text-amber-700">$${result.totalProjectCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.projectType} project</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Savings</h4>
              <p className="text-xl font-bold text-blue-700">$${result.monthlySavingsNeeded.toFixed(0)}/mo</p>
              <p className="text-xs text-gray-500">{result.months} months to complete</p>
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
            <h4 className="font-medium text-gray-800">Cost Breakdown</h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Labor</span>
                <span className="font-bold text-amber-600">$${result.laborAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Materials</span>
                <span className="font-bold text-amber-600">$${result.materialsAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Permits</span>
                <span className="font-bold text-amber-600">$${result.permitsAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Contingency</span>
                <span className="font-bold text-amber-600">$${result.contingencyAmount.toFixed(0)}</span>
              </div>
              {result.savedLabor > 0 && (
                <div className="flex justify-between items-center text-sm p-1 bg-green-50 rounded">
                  <span className="text-gray-600">DIY Savings</span>
                  <span className="font-bold text-green-600">-$${result.savedLabor.toFixed(0)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">ROI Analysis</h4>
            <p className="text-sm mt-1 text-blue-700">
              Expected ROI: {result.roiPercent}% | Home value increase: $${result.homeValueIncrease.toFixed(0)}
            </p>
            <p className="text-sm text-blue-700">
              Net investment after ROI: $${result.netInvestment.toFixed(0)}
            </p>
            <p className="text-sm text-blue-700">
              Project cost: {result.percentOfHomeValue.toFixed(1)}% of home value
            </p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
            <h4 className="font-medium text-green-800">National Average Costs</h4>
            <p className="text-sm mt-1 text-green-700">
              {result.projectType}: Low $${result.baseline.low} | Mid $${result.baseline.mid} | High $${result.baseline.high}
            </p>
          </div>

          {result.ageConsiderations.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-4">
              <h4 className="font-medium text-yellow-800">Home Age Considerations</h4>
              <ul className="mt-2 space-y-1">
                {result.ageConsiderations.map((c, i) => (
                  <li key={i} className="text-sm text-yellow-700">⚠️ {c}</li>
                ))}
              </ul>
            </div>
          )}

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Cost Reduction Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">{opp.savings > 0 ? `-$${opp.savings.toFixed(0)}` : 'Spread costs'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Project Planning Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-amber-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Kitchen remodels cost $8,000-50,000, bathrooms $3,000-25,000. Labor typically 40-60% of cost. DIY saves 20-80% on labor. Add 10-20% contingency for surprises. Projects under 10% of home value safer. ROI varies: landscaping 100%, windows 70%, kitchen 60%. Get 3 contractor quotes. Use HELOC for tax-deductible interest. Older homes need extra budget for hidden issues. Phased approach spreads costs.</p>
      </div>
    </div>
  );
}