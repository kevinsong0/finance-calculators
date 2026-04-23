'use client';

import { useState, useMemo } from 'react';

export default function LiquidityRatioCalculator() {
  const [cashSavings, setCashSavings] = useState<string>('10000');
  const [checkingBalance, setCheckingBalance] = useState<string>('3000');
  const [moneyMarket, setMoneyMarket] = useState<string>('5000');
  const [shortTermInvestments, setShortTermInvestments] = useState<string>('20000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('4000');
  const [creditCardDebt, setCreditCardDebt] = useState<string>('2000');
  const [shortTermDebt, setShortTermDebt] = useState<string>('3000');
  const [annualIncome, setAnnualIncome] = useState<string>('60000');

  const result = useMemo(() => {
    const cash = parseFloat(cashSavings) || 0;
    const checking = parseFloat(checkingBalance) || 0;
    const moneyMarketBal = parseFloat(moneyMarket) || 0;
    const shortInv = parseFloat(shortTermInvestments) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const ccDebt = parseFloat(creditCardDebt) || 0;
    const stDebt = parseFloat(shortTermDebt) || 0;
    const income = parseFloat(annualIncome) || 0;

    // Liquidity calculations
    const totalCash = cash + checking + moneyMarketBal;
    const quickAssets = totalCash + shortInv; // Cash + investments that can be sold quickly
    const currentLiabilities = ccDebt + stDebt;

    // Ratios
    const cashRatio = currentLiabilities > 0 ? totalCash / currentLiabilities : totalCash / expenses;
    const quickRatio = currentLiabilities > 0 ? quickAssets / currentLiabilities : quickAssets / expenses;
    const currentRatio = currentLiabilities > 0 ? (quickAssets + income / 12) / currentLiabilities : (quickAssets + income / 12) / expenses;

    // Coverage metrics
    const monthsCovered = expenses > 0 ? quickAssets / expenses : 0;
    const monthsCashOnly = expenses > 0 ? totalCash / expenses : 0;

    // Industry benchmarks
    const benchmarks = {
      cashRatio: { ideal: 1.0, minimum: 0.5, personal: '2+ months expenses' },
      quickRatio: { ideal: 1.5, minimum: 1.0, personal: '3+ months expenses' },
      currentRatio: { ideal: 2.0, minimum: 1.5, personal: '6+ months expenses' }
    };

    // Assessment
    const assessRatio = (value: number, ideal: number, minimum: number) => {
      if (value >= ideal) return 'Strong';
      if (value >= minimum) return 'Adequate';
      return 'Weak';
    };

    const cashAssessment = assessRatio(cashRatio, 1.0, 0.5);
    const quickAssessment = assessRatio(quickRatio, 1.5, 1.0);
    const currentAssessment = assessRatio(currentRatio, 2.0, 1.5);

    // Recommendations
    const recommendations: string[] = [];

    if (monthsCashOnly < 1) {
      recommendations.push('Critical: Cash reserves cover less than 1 month. Build immediate buffer.');
    } else if (monthsCashOnly < 3) {
      recommendations.push('Increase cash reserves to cover at least 3 months of expenses.');
    }

    if (quickRatio < 1.0 && currentLiabilities > 0) {
      recommendations.push('Quick ratio below 1.0 indicates difficulty meeting short-term obligations.');
    }

    if (ccDebt > totalCash * 0.5) {
      recommendations.push('Credit card debt exceeds 50% of cash reserves. Consider debt reduction.');
    }

    if (monthsCovered >= 6 && currentLiabilities === 0) {
      recommendations.push('Excellent liquidity position. Consider optimizing excess cash for higher returns.');
    }

    if (shortInv > totalCash * 5 && monthsCashOnly < 3) {
      recommendations.push('Consider rebalancing: too much in investments relative to liquid cash.');
    }

    // Emergency fund target
    const targetEmergencyFund = expenses * 6;
    const shortfall = targetEmergencyFund - quickAssets;

    return {
      totalCash,
      quickAssets,
      currentLiabilities,
      cashRatio,
      quickRatio,
      currentRatio,
      monthsCovered,
      monthsCashOnly,
      cashAssessment,
      quickAssessment,
      currentAssessment,
      recommendations,
      targetEmergencyFund,
      shortfall,
      benchmarks
    };
  }, [cashSavings, checkingBalance, moneyMarket, shortTermInvestments, monthlyExpenses, creditCardDebt, shortTermDebt, annualIncome]);

  const getAssessmentColor = (assessment: string) => {
    if (assessment === 'Strong') return 'text-green-700';
    if (assessment === 'Adequate') return 'text-blue-700';
    return 'text-red-700';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Liquidity Ratio Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate personal liquidity ratios and emergency fund coverage</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Liquid Assets</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cash Savings ($)</label>
            <input
              type="number"
              value={cashSavings}
              onChange={(e) => setCashSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Checking Account ($)</label>
            <input
              type="number"
              value={checkingBalance}
              onChange={(e) => setCheckingBalance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Money Market Account ($)</label>
            <input
              type="number"
              value={moneyMarket}
              onChange={(e) => setMoneyMarket(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short-Term Investments ($)</label>
            <input
              type="number"
              value={shortTermInvestments}
              onChange={(e) => setShortTermInvestments(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="20000"
            />
            <p className="text-xs text-gray-500 mt-1">Stocks, bonds, CDs that can be liquidated within 30 days</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Liabilities & Expenses</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Living Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Card Debt ($)</label>
            <input
              type="number"
              value={creditCardDebt}
              onChange={(e) => setCreditCardDebt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short-Term Debt (&lt; 1 year) ($)</label>
            <input
              type="number"
              value={shortTermDebt}
              onChange={(e) => setShortTermDebt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60000"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Liquidity Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Cash Ratio</h4>
              <p className={`text-xl font-bold ${getAssessmentColor(result.cashAssessment)}`}>
                {result.cashRatio.toFixed(2)}
              </p>
              <p className={`text-sm ${getAssessmentColor(result.cashAssessment)}`}>{result.cashAssessment}</p>
              <p className="text-xs text-gray-500">Cash / Current Liabilities</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Quick Ratio</h4>
              <p className={`text-xl font-bold ${getAssessmentColor(result.quickAssessment)}`}>
                {result.quickRatio.toFixed(2)}
              </p>
              <p className={`text-sm ${getAssessmentColor(result.quickAssessment)}`}>{result.quickAssessment}</p>
              <p className="text-xs text-gray-500">(Cash + Quick Assets) / Liabilities</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Current Ratio</h4>
              <p className={`text-xl font-bold ${getAssessmentColor(result.currentAssessment)}`}>
                {result.currentRatio.toFixed(2)}
              </p>
              <p className={`text-sm ${getAssessmentColor(result.currentAssessment)}`}>{result.currentAssessment}</p>
              <p className="text-xs text-gray-500">(All Liquid + Monthly Income) / Liabilities</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Months Covered (All Liquid)</h4>
              <p className="text-xl font-bold text-indigo-700">{result.monthsCovered.toFixed(1)} months</p>
              <p className="text-sm text-gray-600">How long liquid assets cover expenses</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Months Covered (Cash Only)</h4>
              <p className="text-xl font-bold text-purple-700">{result.monthsCashOnly.toFixed(1)} months</p>
              <p className="text-sm text-gray-600">Pure cash without selling investments</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Asset Summary</h4>
            <div className="grid md:grid-cols-3 gap-2 mt-2 text-sm">
              <p>Total Cash: <span className="font-bold">${result.totalCash.toFixed(0)}</span></p>
              <p>Quick Assets: <span className="font-bold">${result.quickAssets.toFixed(0)}</span></p>
              <p>Current Liabilities: <span className="font-bold">${result.currentLiabilities.toFixed(0)}</span></p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Benchmarks (Personal Finance)</h4>
            <div className="space-y-2 mt-2 text-sm text-gray-600">
              <p><strong>Cash Ratio:</strong> Ideal ≥1.0 (covers immediate debts) | Personal goal: 2+ months expenses in cash</p>
              <p><strong>Quick Ratio:</strong> Ideal ≥1.5 (covers short-term needs) | Personal goal: 3+ months expenses</p>
              <p><strong>Current Ratio:</strong> Ideal ≥2.0 (comfortable buffer) | Personal goal: 6+ months expenses</p>
            </div>
          </div>

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

          {result.shortfall > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded">
              <p className="text-orange-700">
                <strong>Target:</strong> Need ${result.shortfall.toFixed(0)} more to reach 6-month emergency fund (${result.targetEmergencyFund.toFixed(0)})
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Liquidity ratios adapted from corporate finance metrics for personal finance. Cash ratio measures immediate liquidity, quick ratio includes near-liquid assets, current ratio considers income flow. Personal finance typically focuses on months of expense coverage rather than debt coverage.</p>
      </div>
    </div>
  );
}