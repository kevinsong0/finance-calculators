'use client';

import { useState, useMemo } from 'react';

export default function FinancialBurnRateCalculator() {
  const [totalSavings, setTotalSavings] = useState<string>('50000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3500');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('0');
  const [expectedReturns, setExpectedReturns] = useState<string>('4');
  const [inflationRate, setInflationRate] = useState<string>('3');
  const [scenarioType, setScenarioType] = useState<string>('reduced_income');
  const [reductionPercent, setReductionPercent] = useState<string>('50');
  const [oneTimeExpense, setOneTimeExpense] = useState<string>('0');
  const [monthsToAnalyze, setMonthsToAnalyze] = useState<string>('36');

  const result = useMemo(() => {
    const savings = parseFloat(totalSavings) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const returns = parseFloat(expectedReturns) / 100 / 12 || 0;
    const inflation = parseFloat(inflationRate) / 100 / 12 || 0;
    const reduction = parseFloat(reductionPercent) / 100 || 0;
    const oneTime = parseFloat(oneTimeExpense) || 0;
    const months = parseInt(monthsToAnalyze) || 36;

    // Calculate baseline burn rate
    const baselineBurnRate = expenses - income;
    const baselineMonths = baselineBurnRate > 0 ? savings / baselineBurnRate : Infinity;

    // Adjusted burn rate based on scenario
    let adjustedIncome = income;
    let adjustedExpenses = expenses;

    switch (scenarioType) {
      case 'reduced_income':
        adjustedIncome = income * (1 - reduction);
        break;
      case 'increased_expenses':
        adjustedExpenses = expenses * (1 + reduction);
        break;
      case 'no_income':
        adjustedIncome = 0;
        break;
      case 'emergency':
        adjustedExpenses = expenses * 1.3; // 30% increase for emergency
        adjustedIncome = income * 0.7; // Assume some income disruption
        break;
    }

    const adjustedBurnRate = adjustedExpenses - adjustedIncome;
    const startingSavings = savings - oneTime;

    // Calculate runway with returns and inflation
    const calculateRunway = (initial: number, burn: number, rate: number, inf: number, maxMonths: number) => {
      if (burn <= 0) return { months: Infinity, finalBalance: initial * Math.pow(1 + rate, maxMonths) };

      let balance = initial;
      let month = 0;
      let monthlyBurn = burn;
      const trajectory: { month: number; balance: number; burn: number }[] = [];

      while (balance > 0 && month < maxMonths) {
        // Apply returns
        balance *= (1 + rate);
        // Apply inflation to burn rate
        monthlyBurn *= (1 + inf);
        // Subtract burn
        balance -= monthlyBurn;
        month++;

        if (month <= 12 || month % 6 === 0) {
          trajectory.push({ month, balance: Math.max(0, balance), burn: monthlyBurn });
        }
      }

      return { months: month, finalBalance: Math.max(0, balance), trajectory };
    };

    const adjustedRunway = calculateRunway(startingSavings, adjustedBurnRate, returns, inflation, months);
    const baselineRunway = calculateRunway(savings, baselineBurnRate, returns, inflation, months);

    // Key dates
    const runwayExhaustion = adjustedRunway.months < Infinity ? adjustedRunway.months : null;
    const criticalPoint = Math.floor(adjustedRunway.months * 0.5); // When savings hit 50% of runway

    // Recommendations
    const recommendations: string[] = [];

    if (adjustedRunway.months < 6) {
      recommendations.push('Critical: Less than 6 months runway. Immediate action required.');
    } else if (adjustedRunway.months < 12) {
      recommendations.push('Warning: Less than 12 months runway. Consider reducing expenses or finding income.');
    }

    if (adjustedBurnRate > baselineBurnRate * 1.5) {
      recommendations.push('Burn rate significantly increased. Review expense reduction strategies.');
    }

    if (oneTime > savings * 0.3) {
      recommendations.push('Large one-time expense depletes significant reserves. Spread cost if possible.');
    }

    if (returns < inflation) {
      recommendations.push('Returns below inflation: savings losing real value. Consider higher-yield options.');
    }

    if (adjustedIncome === 0 && expenses > 0) {
      recommendations.push('Zero income scenario: strict expense minimization essential.');
    }

    // Break-even income needed
    const breakEvenIncome = adjustedExpenses;

    return {
      baselineBurnRate,
      adjustedBurnRate,
      baselineMonths,
      adjustedRunway,
      baselineRunway,
      runwayExhaustion,
      criticalPoint,
      recommendations,
      breakEvenIncome,
      trajectory: adjustedRunway.trajectory
    };
  }, [totalSavings, monthlyExpenses, monthlyIncome, expectedReturns, inflationRate, scenarioType, reductionPercent, oneTimeExpense, monthsToAnalyze]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Burn Rate Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate how long your savings will last under different scenarios</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Position</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Savings/Reserves ($)</label>
            <input
              type="number"
              value={totalSavings}
              onChange={(e) => setTotalSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (if any) ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Leave 0 for pure burn rate analysis</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">One-Time Expense ($)</label>
            <input
              type="number"
              value={oneTimeExpense}
              onChange={(e) => setOneTimeExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Scenario Settings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scenario Type</label>
            <select
              value={scenarioType}
              onChange={(e) => setScenarioType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="reduced_income">Reduced Income</option>
              <option value="increased_expenses">Increased Expenses</option>
              <option value="no_income">No Income (Pure Burn)</option>
              <option value="emergency">Emergency Situation</option>
            </select>
          </div>

          {(scenarioType === 'reduced_income' || scenarioType === 'increased_expenses') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {scenarioType === 'reduced_income' ? 'Income Reduction (%)' : 'Expense Increase (%)'}
              </label>
              <input
                type="number"
                value={reductionPercent}
                onChange={(e) => setReductionPercent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Annual Returns (%)</label>
            <input
              type="number"
              value={expectedReturns}
              onChange={(e) => setExpectedReturns(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4"
            />
            <p className="text-xs text-gray-500 mt-1">Interest/dividends on savings</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Inflation (%)</label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Months to Analyze</label>
            <input
              type="number"
              value={monthsToAnalyze}
              onChange={(e) => setMonthsToAnalyze(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="36"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Burn Rate Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Baseline Burn Rate</h4>
              <p className={`text-xl font-bold ${result.baselineBurnRate > 0 ? 'text-red-700' : 'text-green-700'}`}>
                ${Math.abs(result.baselineBurnRate).toFixed(0)}/month
              </p>
              <p className="text-sm text-gray-600">
                {result.baselineBurnRate > 0 ? 'Net outflow' : 'Net inflow - sustainable'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Adjusted Burn Rate</h4>
              <p className={`text-xl font-bold ${result.adjustedBurnRate > 0 ? 'text-red-700' : 'text-green-700'}`}>
                ${Math.abs(result.adjustedBurnRate).toFixed(0)}/month
              </p>
              <p className="text-sm text-gray-600">Under current scenario</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Runway</h4>
              <p className={`text-xl font-bold ${result.adjustedRunway.months >= 12 ? 'text-green-700' : result.adjustedRunway.months >= 6 ? 'text-yellow-700' : 'text-red-700'}`}>
                {result.adjustedRunway.months < Infinity ? `${result.adjustedRunway.months.toFixed(1)} months` : '∞ (Sustainable)'}
              </p>
              <p className="text-sm text-gray-600">Until savings exhausted</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Savings Trajectory</h4>
            <div className="grid md:grid-cols-4 gap-2 mt-2">
              {result.trajectory && result.trajectory.slice(0, 8).map((point, i) => (
                <div key={i} className="text-sm p-2 bg-gray-50 rounded">
                  <p className="text-gray-600">Month {point.month}</p>
                  <p className="font-bold text-indigo-700">$${point.balance.toFixed(0)}</p>
                  <p className="text-xs text-gray-500">Burn: $${point.burn.toFixed(0)}</p>
                </div>
              ))}
            </div>
          </div>

          {result.adjustedRunway.months < Infinity && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Key Milestones</h4>
              <div className="grid md:grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">50% Runway Point</p>
                  <p className="font-bold">Month {result.criticalPoint}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exhaustion Date</p>
                  <p className="font-bold text-red-700">Month {result.runwayExhaustion?.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Break-even Income Needed</p>
                  <p className="font-bold">${result.breakEvenIncome.toFixed(0)}/month</p>
                </div>
              </div>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Recommendations</h4>
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
        <p><strong>Note:</strong> Burn rate calculation includes expected returns (growing savings) and inflation (increasing expenses). Real burn rate accelerates over time as expenses inflate. This model helps understand true runway duration. Actual results depend on market conditions, spending behavior, and unexpected events.</p>
      </div>
    </div>
  );
}