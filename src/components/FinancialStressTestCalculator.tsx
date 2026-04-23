'use client';

import { useState, useMemo } from 'react';

export default function FinancialStressTestCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3500');
  const [emergencyFund, setEmergencyFund] = useState<string>('15000');
  const [investmentAccounts, setInvestmentAccounts] = useState<string>('50000');
  const [hasInsurance, setHasInsurance] = useState<boolean>(true);
  const [insuranceCoverage, setInsuranceCoverage] = useState<string>('6');
  const [jobStability, setJobStability] = useState<string>('stable');
  const [debtPayments, setDebtPayments] = useState<string>('500');
  const [stressScenario, setStressScenario] = useState<string>('job_loss');

  const result = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const fund = parseFloat(emergencyFund) || 0;
    const investments = parseFloat(investmentAccounts) || 0;
    const coverage = parseFloat(insuranceCoverage) || 0;
    const debt = parseFloat(debtPayments) || 0;

    const monthlySurplus = income - expenses - debt;
    const currentRunway = fund / (expenses + debt);

    // Scenario impacts
    const scenarios: { name: string; incomeReduction: number; expenseIncrease: number; duration: number; impact: string }[] = [];

    // Job loss scenario
    const jobLossIncomeReduction = income * 0.85; // Assume 85% reduction
    const jobLossRunway = fund / (expenses + debt);
    const unemploymentWeeks = coverage * 4;
    const jobLossSurvival = Math.min(jobLossRunway, unemploymentWeeks / 4);
    scenarios.push({
      name: 'Job Loss',
      incomeReduction: jobLossIncomeReduction,
      expenseIncrease: 0,
      duration: Math.min(6, jobStability === 'unstable' ? 12 : 3),
      impact: jobLossRunway >= 6 ? 'Resilient' : jobLossRunway >= 3 ? 'Vulnerable' : 'Critical'
    });

    // Medical emergency scenario
    const medicalExpenses = expenses * 1.2 + 5000; // 20% increase + one-time $5k
    const medicalRunway = fund / medicalExpenses;
    scenarios.push({
      name: 'Medical Emergency',
      incomeReduction: hasInsurance ? 0 : income * 0.3,
      expenseIncrease: 5000,
      duration: 2,
      impact: hasInsurance && fund >= 5000 ? 'Resilient' : fund >= 3000 ? 'Vulnerable' : 'Critical'
    });

    // Market crash scenario
    const marketCrashLoss = investments * 0.3; // 30% portfolio loss
    const marketRunway = fund / (expenses + debt);
    scenarios.push({
      name: 'Market Crash (30%)',
      incomeReduction: 0,
      expenseIncrease: 0,
      duration: 24, // Recovery time
      impact: investments <= fund * 2 ? 'Resilient' : marketRunway >= 6 ? 'Vulnerable' : 'Critical'
    });

    // Combined stress scenario
    const combinedIncome = income * 0.5;
    const combinedExpenses = expenses * 1.15 + 2000;
    const combinedRunway = fund / combinedExpenses;
    scenarios.push({
      name: 'Combined Crisis',
      incomeReduction: combinedIncome,
      expenseIncrease: 2000,
      duration: 4,
      impact: combinedRunway >= 4 ? 'Resilient' : combinedRunway >= 2 ? 'Vulnerable' : 'Critical'
    });

    // Calculate overall resilience score
    const resilientCount = scenarios.filter(s => s.impact === 'Resilient').length;
    const vulnerableCount = scenarios.filter(s => s.impact === 'Vulnerable').length;
    const criticalCount = scenarios.filter(s => s.impact === 'Critical').length;

    const resilienceScore = Math.round(
      (resilientCount * 25 + vulnerableCount * 10 + criticalCount * 0) +
      (currentRunway >= 6 ? 25 : currentRunway >= 3 ? 15 : 5) +
      (hasInsurance ? 10 : 0) +
      (jobStability === 'stable' ? 10 : jobStability === 'moderate' ? 5 : 0)
    );

    const recommendations: string[] = [];

    if (currentRunway < 3) {
      recommendations.push('Build emergency fund to cover at least 3 months of expenses');
    }
    if (!hasInsurance) {
      recommendations.push('Consider disability and health insurance coverage');
    }
    if (debt > income * 0.15) {
      recommendations.push('Reduce debt payments to below 15% of income');
    }
    if (resilienceScore < 50) {
      recommendations.push('Increase financial reserves before major financial decisions');
    }
    if (investments > fund * 10 && currentRunway < 6) {
      recommendations.push('Consider reallocating some investments to liquid emergency fund');
    }

    return {
      monthlySurplus,
      currentRunway,
      scenarios,
      resilienceScore,
      recommendations,
      emergencyFundNeeded: (expenses + debt) * 6 - fund,
      investmentBuffer: investments - fund * 3
    };
  }, [monthlyIncome, monthlyExpenses, emergencyFund, investmentAccounts, hasInsurance, insuranceCoverage, jobStability, debtPayments, stressScenario]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-blue-700';
    if (score >= 40) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'Resilient') return 'bg-green-50 text-green-700 border-green-200';
    if (impact === 'Vulnerable') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Stress Test Calculator</h1>
      <p className="text-gray-600 mb-6">Test your financial resilience against adverse scenarios</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Baseline</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Fund ($)</label>
            <input
              type="number"
              value={emergencyFund}
              onChange={(e) => setEmergencyFund(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Accounts ($)</label>
            <input
              type="number"
              value={investmentAccounts}
              onChange={(e) => setInvestmentAccounts(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Debt Payments ($)</label>
            <input
              type="number"
              value={debtPayments}
              onChange={(e) => setDebtPayments(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Risk Factors</h3>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasInsurance}
              onChange={(e) => setHasInsurance(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Have disability/health insurance</span>
          </div>

          {hasInsurance && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Coverage (months)</label>
              <input
                type="number"
                value={insuranceCoverage}
                onChange={(e) => setInsuranceCoverage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="6"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Stability</label>
            <select
              value={jobStability}
              onChange={(e) => setJobStability(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="stable">Stable (tenured/established role)</option>
              <option value="moderate">Moderate (typical employment)</option>
              <option value="unstable">Unstable (contract/startup/frequent changes)</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Financial Resilience Score</h3>
            <span className={`text-3xl font-bold ${getScoreColor(result.resilienceScore)}`}>
              {result.resilienceScore}/100
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Current Cash Runway</h4>
              <p className="text-xl font-bold text-blue-700">{result.currentRunway.toFixed(1)} months</p>
              <p className="text-sm text-gray-600">Based on emergency fund vs expenses</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Surplus</h4>
              <p className={`text-xl font-bold ${result.monthlySurplus >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                ${result.monthlySurplus.toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">Income minus expenses and debt</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Stress Scenario Results:</h4>
            {result.scenarios.map((scenario, i) => (
              <div key={i} className={`p-3 rounded border ${getImpactColor(scenario.impact)}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{scenario.name}</span>
                  <span className="font-bold">{scenario.impact}</span>
                </div>
                <p className="text-sm mt-1">
                  Duration: {scenario.duration} months
                  {scenario.incomeReduction > 0 && ` | Income impact: $${scenario.incomeReduction.toFixed(0)}`}
                </p>
              </div>
            ))}
          </div>

          {result.recommendations.length > 0 && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Recommendations:</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {result.emergencyFundNeeded > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded">
              <p className="text-orange-700">
                <strong>Target:</strong> Increase emergency fund by ${result.emergencyFundNeeded.toFixed(0)} to reach 6-month coverage
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Stress test scenarios are simplified estimates. Actual financial resilience depends on many factors including access to credit, family support, skill portability, and health status. Regular stress testing helps identify vulnerabilities before crises occur.</p>
      </div>
    </div>
  );
}