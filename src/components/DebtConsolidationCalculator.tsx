'use client';

import { useState, useMemo } from 'react';

export default function DebtConsolidationCalculator() {
  const [totalDebt, setTotalDebt] = useState<string>('15000');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('400');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [creditScore, setCreditScore] = useState<string>('good');
  const [debt1Balance, setDebt1Balance] = useState<string>('5000');
  const [debt1Rate, setDebt1Rate] = useState<string>('18');
  const [debt1Payment, setDebt1Payment] = useState<string>('150');
  const [debt2Balance, setDebt2Balance] = useState<string>('3000');
  const [debt2Rate, setDebt2Rate] = useState<string>('22');
  const [debt2Payment, setDebt2Payment] = useState<string>('100');
  const [debt3Balance, setDebt3Balance] = useState<string>('2000');
  const [debt3Rate, setDebt3Rate] = useState<string>('24');
  const [debt3Payment, setDebt3Payment] = useState<string>('80');
  const [consolidationRate, setConsolidationRate] = useState<string>('12');
  const [consolidationTerm, setConsolidationTerm] = useState<string>('36');
  const [consolidationFee, setConsolidationFee] = useState<string>('300');

  const result = useMemo(() => {
    const total = parseFloat(totalDebt) || 0;
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const d1Bal = parseFloat(debt1Balance) || 0;
    const d1Rate = parseFloat(debt1Rate) || 0;
    const d1Pay = parseFloat(debt1Payment) || 0;
    const d2Bal = parseFloat(debt2Balance) || 0;
    const d2Rate = parseFloat(debt2Rate) || 0;
    const d2Pay = parseFloat(debt2Payment) || 0;
    const d3Bal = parseFloat(debt3Balance) || 0;
    const d3Rate = parseFloat(debt3Rate) || 0;
    const d3Pay = parseFloat(debt3Payment) || 0;
    const conRate = parseFloat(consolidationRate) || 0;
    const conTerm = parseFloat(consolidationTerm) || 0;
    const conFee = parseFloat(consolidationFee) || 0;

    // Current debts
    const debts = [
      { name: 'Debt 1', balance: d1Bal, rate: d1Rate, payment: d1Pay },
      { name: 'Debt 2', balance: d2Bal, rate: d2Rate, payment: d2Pay },
      { name: 'Debt 3', balance: d3Bal, rate: d3Rate, payment: d3Pay }
    ].filter(d => d.balance > 0);

    const currentTotalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
    const currentMonthlyPayment = debts.reduce((sum, d) => sum + d.payment, 0);
    const avgCurrentRate = currentTotalBalance > 0
      ? debts.reduce((sum, d) => sum + d.balance * d.rate, 0) / currentTotalBalance
      : 0;

    // Calculate current payoff time (approximate)
    const currentPayoffMonths = debts.reduce((max, d) => {
      if (d.payment <= d.balance * d.rate / 100 / 12) return max; // Minimum payment trap
      const months = Math.ceil(d.balance / (d.payment - d.balance * d.rate / 100 / 12));
      return Math.max(max, months);
    }, 0);

    // Current total interest (approximate)
    const currentTotalInterest = debts.reduce((sum, d) => {
      const months = Math.min(currentPayoffMonths, Math.ceil(d.balance / (d.payment - d.balance * d.rate / 100 / 12)));
      return sum + d.payment * months - d.balance;
    }, 0);

    // Consolidation loan calculation
    const conMonthlyRate = conRate / 100 / 12;
    const conPayment = conTerm > 0 && conRate > 0
      ? currentTotalBalance * (conMonthlyRate * Math.pow(1 + conMonthlyRate, conTerm)) / (Math.pow(1 + conMonthlyRate, conTerm) - 1)
      : conTerm > 0 ? currentTotalBalance / conTerm : 0;

    const conTotalPayment = conPayment * conTerm;
    const conTotalInterest = conTotalPayment - currentTotalBalance;
    const conTotalCost = conTotalPayment + conFee;

    // Savings comparison
    const monthlySavings = currentMonthlyPayment - conPayment;
    const interestSavings = currentTotalInterest - conTotalInterest;
    const totalSavings = monthlySavings * conTerm + interestSavings - conFee;

    // Budget analysis
    const currentBudgetVariance = budget - currentMonthlyPayment;
    const conBudgetVariance = budget - conPayment;
    const currentOverBudget = currentMonthlyPayment > budget;
    const conOverBudget = conPayment > budget;

    // Debt-to-income ratio
    const currentDTI = income > 0 ? (currentMonthlyPayment / income) * 100 : 0;
    const conDTI = income > 0 ? (conPayment / income) * 100 : 0;

    // Credit score impact consideration
    const creditImpact = creditScore === 'excellent' ? 'Minimal impact if managed well'
      : creditScore === 'good' ? 'May improve with lower utilization'
      : creditScore === 'fair' ? 'Could improve significantly with on-time payments'
      : 'Important to make all payments on time';

    // Recommendations
    const recommendations: string[] = [];

    if (avgCurrentRate > conRate + 3) {
      recommendations.push('Consolidation rate significantly lower - good option');
    }

    if (conPayment > currentMonthlyPayment) {
      recommendations.push('Consolidation payment higher - may not be beneficial');
    }

    if (conFee > currentTotalBalance * 0.05) {
      recommendations.push('High consolidation fee (>5%) - compare other options');
    }

    if (currentOverBudget && !conOverBudget) {
      recommendations.push('Consolidation brings payment within budget - consider');
    }

    if (conTerm > currentPayoffMonths + 12) {
      recommendations.push('Longer term extends debt - weigh monthly savings vs total cost');
    }

    if (avgCurrentRate < conRate) {
      recommendations.push('Current rates lower than consolidation - keep separate debts');
    }

    if (creditScore === 'poor') {
      recommendations.push('Poor credit may limit consolidation options - improve credit first');
    }

    // Alternative strategies
    const alternatives: { name: string; description: string }[] = [];
    if (avgCurrentRate > 20) {
      alternatives.push({ name: 'Balance Transfer Card', description: '0% APR for 12-18 months, transfer fee 3-5%' });
    }
    if (currentTotalBalance < 5000) {
      alternatives.push({ name: 'Snowball Method', description: 'Pay smallest debt first for motivation' });
    }
    if (d1Rate > d2Rate && d2Rate > d3Rate) {
      alternatives.push({ name: 'Avalanche Method', description: 'Pay highest rate debt first for savings' });
    }

    return {
      debts,
      currentTotalBalance,
      currentMonthlyPayment,
      avgCurrentRate,
      currentPayoffMonths,
      currentTotalInterest,
      conPayment,
      conTotalPayment,
      conTotalInterest,
      conTotalCost,
      monthlySavings,
      interestSavings,
      totalSavings,
      currentBudgetVariance,
      conBudgetVariance,
      currentOverBudget,
      conOverBudget,
      currentDTI,
      conDTI,
      creditImpact,
      recommendations,
      alternatives,
      budget,
      income,
      creditScore,
      conRate,
      conTerm,
      conFee
    };
  }, [totalDebt, monthlyBudget, monthlyIncome, creditScore, debt1Balance, debt1Rate, debt1Payment, debt2Balance, debt2Rate, debt2Payment, debt3Balance, debt3Rate, debt3Payment, consolidationRate, consolidationTerm, consolidationFee]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Debt Consolidation Calculator</h1>
      <p className="text-gray-600 mb-6">Compare debt consolidation vs current debts and evaluate savings</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Debts</h3>

          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Debt 1 (e.g., Credit Card)</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Balance ($)</label>
                <input
                  type="number"
                  value={debt1Balance}
                  onChange={(e) => setDebt1Balance(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Rate (%)</label>
                <input
                  type="number"
                  value={debt1Rate}
                  onChange={(e) => setDebt1Rate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="18"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Payment ($)</label>
                <input
                  type="number"
                  value={debt1Payment}
                  onChange={(e) => setDebt1Payment(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="150"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Debt 2</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Balance ($)</label>
                <input
                  type="number"
                  value={debt2Balance}
                  onChange={(e) => setDebt2Balance(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="3000"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Rate (%)</label>
                <input
                  type="number"
                  value={debt2Rate}
                  onChange={(e) => setDebt2Rate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="22"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Payment ($)</label>
                <input
                  type="number"
                  value={debt2Payment}
                  onChange={(e) => setDebt2Payment(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Debt 3</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Balance ($)</label>
                <input
                  type="number"
                  value={debt3Balance}
                  onChange={(e) => setDebt3Balance(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="2000"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Rate (%)</label>
                <input
                  type="number"
                  value={debt3Rate}
                  onChange={(e) => setDebt3Rate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="24"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Payment ($)</label>
                <input
                  type="number"
                  value={debt3Payment}
                  onChange={(e) => setDebt3Payment(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="80"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget ($)</label>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score Estimate</label>
            <select
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="excellent">Excellent (720+)</option>
              <option value="good">Good (680-719)</option>
              <option value="fair">Fair (640-679)</option>
              <option value="poor">Poor (under 640)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Consolidation Loan</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consolidation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={consolidationRate}
                onChange={(e) => setConsolidationRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Term (months)</label>
              <input
                type="number"
                value={consolidationTerm}
                onChange={(e) => setConsolidationTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="36"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origination/Fees ($)</label>
            <input
              type="number"
              value={consolidationFee}
              onChange={(e) => setConsolidationFee(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Debt Consolidation Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Current Payment</h4>
              <p className="text-xl font-bold text-red-700">$${result.currentMonthlyPayment.toFixed(0)}/mo</p>
              <p className="text-xs text-gray-500">Avg rate: {result.avgCurrentRate.toFixed(1)}%</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Consolidation Payment</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.conPayment.toFixed(0)}/mo</p>
              <p className="text-xs text-gray-500">{result.conTerm} mo at {result.conRate}%</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Savings</h4>
              <p className={"text-xl font-bold " + (result.monthlySavings > 0 ? 'text-green-700' : 'text-red-700')}>
                {result.monthlySavings > 0 ? '+' : ''}$${result.monthlySavings.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.monthlySavings > 0 ? 'Savings' : 'Higher payment'}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Current Debt Breakdown</h4>
            <div className="space-y-1 mt-2">
              {result.debts.map((d, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{d.name}: $${d.balance} @ {d.rate}%</span>
                  <span className="font-bold text-red-600">$${d.payment}/mo</span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Total: $${result.currentTotalBalance} | Estimated payoff: ~{result.currentPayoffMonths} months
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Cost Comparison</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Current Debts</p>
                <p className="font-bold text-red-600">$${result.currentTotalInterest.toFixed(0)} interest</p>
                <p className="text-xs text-gray-500">{result.currentPayoffMonths} months</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Consolidation</p>
                <p className="font-bold text-indigo-600">$${result.conTotalInterest.toFixed(0)} interest + $${result.conFee} fees</p>
                <p className="text-xs text-gray-500">{result.conTerm} months</p>
              </div>
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Total savings: <span className={result.totalSavings > 0 ? 'text-green-700' : 'text-red-700'}>$${result.totalSavings.toFixed(0)}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Current DTI</h4>
              <p className={"text-lg font-bold " + (result.currentDTI > 20 ? 'text-red-600' : 'text-green-600')}>
                {result.currentDTI.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">{result.currentOverBudget ? 'Over budget' : 'Within budget'}</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Consolidation DTI</h4>
              <p className={"text-lg font-bold " + (result.conDTI > 20 ? 'text-red-600' : 'text-green-600')}>
                {result.conDTI.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">{result.conOverBudget ? 'Over budget' : 'Within budget'}</p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Credit Score Impact</h4>
            <p className="text-sm mt-1 text-blue-700">{result.creditImpact}</p>
            <p className="text-sm text-blue-700">Credit: {result.creditScore}</p>
          </div>

          {result.alternatives.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Alternative Strategies</h4>
              <div className="space-y-2 mt-2">
                {result.alternatives.map((alt, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded">
                    <span className="font-medium text-gray-800">{alt.name}</span>
                    <p className="text-xs text-gray-600">{alt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Consolidation Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-indigo-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Debt consolidation works best when new rate significantly lower than average current rate. Compare total cost including fees, not just monthly payment. Balance transfer cards offer 0% APR for 12-18 months with 3-5% transfer fee - good for paying off quickly. Home equity loans offer lowest rates but risk your home. Consider debt snowball (smallest first) for motivation or avalanche (highest rate first) for savings. Non-profit credit counseling may offer debt management plans. Avoid debt settlement companies - they can damage credit. Consolidation doesn't address spending habits - budget counseling important.</p>
      </div>
    </div>
  );
}