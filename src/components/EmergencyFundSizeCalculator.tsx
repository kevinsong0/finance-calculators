'use client';

import { useState, useMemo } from 'react';

export default function EmergencyFundSizeCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3000');
  const [monthsTarget, setMonthsTarget] = useState<string>('6');
  const [jobStability, setJobStability] = useState<string>('stable');
  const [incomeSources, setIncomeSources] = useState<string>('single');
  const [healthConsiderations, setHealthConsiderations] = useState<string>('none');
  const [currentSavings, setCurrentSavings] = useState<string>('5000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');

  const result = useMemo(() => {
    const expenses = parseFloat(monthlyExpenses) || 0;
    const targetMonths = parseFloat(monthsTarget) || 6;
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;

    // Base emergency fund
    const baseFund = expenses * targetMonths;

    // Adjustments based on factors
    let recommendedMultiplier = targetMonths;

    // Job stability adjustment
    if (jobStability === 'unstable') {
      recommendedMultiplier += 3;
    } else if (jobStability === 'variable') {
      recommendedMultiplier += 2;
    } else if (jobStability === 'self-employed') {
      recommendedMultiplier += 4;
    }

    // Income sources adjustment
    if (incomeSources === 'single') {
      recommendedMultiplier += 1;
    } else if (incomeSources === 'diverse') {
      recommendedMultiplier -= 0.5;
    }

    // Health considerations
    if (healthConsiderations === 'chronic') {
      recommendedMultiplier += 2;
    } else if (healthConsiderations === 'family-needs') {
      recommendedMultiplier += 1;
    }

    const recommendedFund = expenses * recommendedMultiplier;
    const shortfall = Math.max(0, recommendedFund - savings);

    // Timeline to reach goal
    const monthsToGoal = contribution > 0 ? Math.ceil(shortfall / contribution) : 0;
    const yearsToGoal = monthsToGoal / 12;

    // Savings milestones
    const milestones = [
      { name: 'Mini emergency fund', amount: expenses * 1, description: '1 month buffer' },
      { name: 'Basic security', amount: expenses * 3, description: '3 months coverage' },
      { name: 'Standard fund', amount: expenses * 6, description: '6 months recommended' },
      { name: 'Full fund', amount: recommendedFund, description: `${recommendedMultiplier.toFixed(1)} months adjusted` }
    ];

    const currentMilestone = milestones.filter(m => savings >= m.amount).length;
    const nextMilestone = milestones[currentMilestone];

    // Risk assessment
    const coverageMonths = savings / expenses;
    let riskLevel = 'high';
    let riskDescription = '';

    if (coverageMonths >= recommendedMultiplier) {
      riskLevel = 'secure';
      riskDescription = 'Fully prepared for emergencies';
    } else if (coverageMonths >= 6) {
      riskLevel = 'good';
      riskDescription = 'Good coverage but below adjusted target';
    } else if (coverageMonths >= 3) {
      riskLevel = 'moderate';
      riskDescription = 'Basic coverage - vulnerable to major emergencies';
    } else if (coverageMonths >= 1) {
      riskLevel = 'low';
      riskDescription = 'Minimal buffer - high risk if income disrupted';
    } else {
      riskLevel = 'critical';
      riskDescription = 'No emergency buffer - immediate action needed';
    }

    // Recommendations
    const recommendations: string[] = [];

    if (coverageMonths < 1) {
      recommendations.push('Start immediately - save $${expenses.toFixed(0)} for 1-month buffer');
    }

    if (jobStability === 'self-employed' && coverageMonths < 9) {
      recommendations.push('Self-employed: target 9-12 months due to income variability');
    }

    if (healthConsiderations === 'chronic' && coverageMonths < 8) {
      recommendations.push('Health considerations: increase buffer for medical expenses');
    }

    if (contribution < expenses * 0.1) {
      recommendations.push('Consider increasing savings rate to 10%+ of expenses');
    }

    if (incomeSources === 'single' && coverageMonths < 7) {
      recommendations.push('Single income source: maintain higher buffer');
    }

    return {
      baseFund,
      recommendedFund,
      recommendedMultiplier,
      shortfall,
      monthsToGoal,
      yearsToGoal,
      coverageMonths,
      milestones,
      currentMilestone,
      nextMilestone,
      riskLevel,
      riskDescription,
      recommendations,
      expenses,
      savings
    };
  }, [monthlyExpenses, monthsTarget, jobStability, incomeSources, healthConsiderations, currentSavings, monthlyContribution]);

  const getRiskColor = (level: string) => {
    if (level === 'secure') return 'text-green-700 bg-green-50 border-green-200';
    if (level === 'good') return 'text-blue-700 bg-blue-50 border-blue-200';
    if (level === 'moderate') return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    if (level === 'low') return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Fund Size Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate recommended emergency fund based on your situation</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Basics</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Essential Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
            <p className="text-xs text-gray-500 mt-1">Housing, food, utilities, transportation, insurance</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Months of Coverage</label>
            <select
              value={monthsTarget}
              onChange={(e) => setMonthsTarget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="3">3 months (minimum)</option>
              <option value="6">6 months (standard)</option>
              <option value="9">9 months (conservative)</option>
              <option value="12">12 months (very conservative)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Emergency Savings ($)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Risk Factors</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Stability</label>
            <select
              value={jobStability}
              onChange={(e) => setJobStability(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="stable">Stable (long-term position)</option>
              <option value="variable">Variable (contract/seasonal)</option>
              <option value="unstable">Unstable (recent change/industry risk)</option>
              <option value="self-employed">Self-employed/Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Income Sources</label>
            <select
              value={incomeSources}
              onChange={(e) => setIncomeSources(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="single">Single income source</option>
              <option value="dual">Dual household income</option>
              <option value="diverse">Multiple diversified sources</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Considerations</label>
            <select
              value={healthConsiderations}
              onChange={(e) => setHealthConsiderations(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None (healthy, good coverage)</option>
              <option value="family-needs">Family health needs</option>
              <option value="chronic">Chronic condition or ongoing treatment</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Emergency Fund Recommendation</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Recommended Fund Size</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.recommendedFund.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.recommendedMultiplier.toFixed(1)} months coverage</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Current Coverage</h4>
              <p className="text-xl font-bold text-blue-700">{result.coverageMonths.toFixed(1)} months</p>
              <p className="text-xs text-gray-500">$${result.savings.toFixed(0)} saved</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Shortfall</h4>
              <p className={`text-xl font-bold ${result.shortfall > 0 ? 'text-red-700' : 'text-green-700'}`}>
                $${result.shortfall.toFixed(0)}
              </p>
              {result.shortfall > 0 && result.monthsToGoal > 0 && (
                <p className="text-xs text-gray-500">{result.monthsToGoal} months to goal</p>
              )}
            </div>
          </div>

          <div className={`p-3 rounded border mb-4 ${getRiskColor(result.riskLevel)}`}>
            <h4 className="font-medium">Risk Level: {result.riskLevel.toUpperCase()}</h4>
            <p className="text-sm mt-1">{result.riskDescription}</p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Savings Milestones</h4>
            <div className="space-y-2 mt-2">
              {result.milestones.map((milestone, i) => (
                <div key={i} className="flex items-center gap-3 text-sm p-2 rounded ${i < result.currentMilestone ? 'bg-green-50' : 'bg-gray-50'}">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${i < result.currentMilestone ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                    {i < result.currentMilestone ? '✓' : (i + 1)}
                  </div>
                  <div className="flex-grow">
                    <span className="font-medium text-gray-700">{milestone.name}</span>
                    <p className="text-xs text-gray-500">{milestone.description}</p>
                  </div>
                  <span className="font-bold ${i < result.currentMilestone ? 'text-green-600' : 'text-gray-400'}">$${milestone.amount.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Personalized Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-indigo-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Standard recommendation is 3-6 months expenses. Adjust upward for: self-employment (+4 months), unstable job (+3), single income (+1), health issues (+2). Keep funds in accessible savings account. Review annually. Consider tiered approach: 1-month cash, remainder in liquid savings.</p>
      </div>
    </div>
  );
}