'use client';

import { useState, useMemo } from 'react';

export default function RefinanceBreakEvenCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>('250000');
  const [currentRate, setCurrentRate] = useState<string>('7.5');
  const [remainingTerm, setRemainingTerm] = useState<string>('25');
  const [originalTerm, setOriginalTerm] = useState<string>('30');

  const [newRate, setNewRate] = useState<string>('6.5');
  const [newTerm, setNewTerm] = useState<string>('30');
  const [closingCosts, setClosingCosts] = useState<string>('5000');
  const [pointsPurchased, setPointsPurchased] = useState<string>('0');
  const [cashOut, setCashOut] = useState<string>('0');

  const [monthlyBudget, setMonthlyBudget] = useState<string>('1800');
  const [planningHorizon, setPlanningHorizon] = useState<string>('10');
  const [extraMonthly, setExtraMonthly] = useState<string>('0');

  const result = useMemo(() => {
    const balance = parseFloat(currentBalance) || 0;
    const currRate = parseFloat(currentRate) || 0;
    const remainTerm = parseFloat(remainingTerm) || 0;
    const origTerm = parseFloat(originalTerm) || 0;

    const newR = parseFloat(newRate) || 0;
    const newT = parseFloat(newTerm) || 0;
    const costs = parseFloat(closingCosts) || 0;
    const points = parseFloat(pointsPurchased) || 0;
    const cash = parseFloat(cashOut) || 0;

    const budget = parseFloat(monthlyBudget) || 0;
    const horizon = parseFloat(planningHorizon) || 0;
    const extra = parseFloat(extraMonthly) || 0;

    // Current loan payment
    const currMonthlyRate = currRate / 100 / 12;
    const currPayment = remainTerm > 0 && currRate > 0
      ? balance * (currMonthlyRate * Math.pow(1 + currMonthlyRate, remainTerm)) / (Math.pow(1 + currMonthlyRate, remainTerm) - 1)
      : remainTerm > 0 ? balance / remainTerm : 0;

    const currTotalPayments = currPayment * remainTerm;
    const currTotalInterest = currTotalPayments - balance;

    // New loan
    const newLoanAmount = balance + costs + points * balance * 0.01 + cash;
    const newMonthlyRate = newR / 100 / 12;
    const newPayment = newT > 0 && newR > 0
      ? newLoanAmount * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newT)) / (Math.pow(1 + newMonthlyRate, newT) - 1)
      : newT > 0 ? newLoanAmount / newT : 0;

    const newTotalPayments = newPayment * newT;
    const newTotalInterest = newTotalPayments - newLoanAmount;
    const newTotalCost = newLoanAmount + newTotalInterest;

    // Monthly savings
    const monthlySavings = currPayment - newPayment;
    const paymentDecrease = currPayment > newPayment;
    const paymentPercentChange = currPayment > 0 ? ((newPayment - currPayment) / currPayment) * 100 : 0;

    // Break-even calculation
    const totalUpfrontCost = costs + points * balance * 0.01;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(totalUpfrontCost / monthlySavings) : 0;
    const breakEvenYears = breakEvenMonths > 0 ? Math.round(breakEvenMonths / 12 * 10) / 10 : 0;

    // Is it worth it?
    const worthIt = breakEvenMonths > 0 && breakEvenMonths < horizon * 12 && remainTerm > breakEvenMonths;

    // Interest comparison
    const interestSaved = currTotalInterest - newTotalInterest;

    // Total cost comparison over remaining term
    const newPaymentsOverRemainTerm = newPayment * remainTerm;
    const newInterestOverRemainTerm = newPaymentsOverRemainTerm - newLoanAmount;
    const savingsOverRemainTerm = currTotalPayments - newPaymentsOverRemainTerm - totalUpfrontCost;

    // Different scenarios
    const scenarios = [
      { term: 15, rate: newR - 0.5, label: 'Shorter term (15yr)' },
      { term: 20, rate: newR - 0.25, label: 'Medium term (20yr)' },
      { term: 30, rate: newR, label: 'Standard term (30yr)' }
    ].map(s => {
      const sRate = s.rate / 100 / 12;
      const sPayment = s.term > 0 && s.rate > 0
        ? newLoanAmount * (sRate * Math.pow(1 + sRate, s.term)) / (Math.pow(1 + sRate, s.term) - 1)
        : 0;
      const sTotal = sPayment * s.term;
      const sInterest = sTotal - newLoanAmount;
      const sBreakEven = monthlySavings > 0 ? Math.ceil(totalUpfrontCost / (currPayment - sPayment)) : 0;
      return { ...s, payment: sPayment, total: sTotal, interest: sInterest, breakEven: sBreakEven };
    });

    // Extra payment impact
    const extraPaymentNew = newPayment + extra;
    let extraBalance = newLoanAmount;
    let extraMonths = 0;
    while (extraBalance > 0 && extraMonths < newT * 2) {
      const interestPmt = extraBalance * newMonthlyRate;
      const principalPmt = extraPaymentNew - interestPmt;
      extraBalance = Math.max(0, extraBalance - principalPmt);
      extraMonths++;
    }
    const extraSavings = newTotalInterest - (extraPaymentNew * extraMonths - newLoanAmount);

    // Budget analysis
    const fitsBudget = newPayment <= budget;
    const budgetVariance = budget - newPayment;

    // Recommendations
    const recommendations: string[] = [];

    if (!worthIt && breakEvenMonths > horizon * 12) {
      recommendations.push('Break-even exceeds your planning horizon - consider staying with current loan');
    }

    if (worthIt && monthlySavings > currPayment * 0.1) {
      recommendations.push('Monthly savings exceed 10% - refinancing strongly recommended');
    }

    if (newT > remainTerm) {
      recommendations.push('New loan extends term - total interest may increase despite lower rate');
    }

    if (cash > 0) {
      recommendations.push('Cash-out increases loan amount - consider impact on total cost');
    }

    if (points > 0) {
      const pointBreakEven = Math.ceil((points * balance * 0.01) / (currPayment - newPayment));
      recommendations.push(`Points cost $${(points * balance * 0.01).toFixed(0)} - point break-even: ${pointBreakEven} months`);
    }

    if (interestSaved < 0 && monthlySavings > 0) {
      recommendations.push('Lower payment but higher total interest - evaluate your priorities');
    }

    return {
      currPayment,
      currTotalInterest,
      currTotalPayments,
      newPayment,
      newTotalInterest,
      newTotalCost,
      newLoanAmount,
      monthlySavings,
      breakEvenMonths,
      breakEvenYears,
      worthIt,
      interestSaved,
      savingsOverRemainTerm,
      scenarios,
      extraMonths,
      extraSavings,
      fitsBudget,
      budgetVariance,
      recommendations,
      totalUpfrontCost,
      balance,
      currRate,
      remainTerm,
      newR,
      newT,
      costs,
      points,
      cash,
      budget,
      horizon,
      extra,
      paymentDecrease,
      paymentPercentChange
    };
  }, [currentBalance, currentRate, remainingTerm, originalTerm, newRate, newTerm, closingCosts, pointsPurchased, cashOut, monthlyBudget, planningHorizon, extraMonthly]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Refinance Break-Even Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate when refinancing pays off and compare different scenarios</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Mortgage</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance ($)</label>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="250000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Interest Rate (%)</label>
            <input
              type="number"
              step="0.125"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="7.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Term (months)</label>
            <input
              type="number"
              value={remainingTerm}
              onChange={(e) => setRemainingTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Term (months)</label>
            <input
              type="number"
              value={originalTerm}
              onChange={(e) => setOriginalTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="360"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">New Loan Options</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Interest Rate (%)</label>
            <input
              type="number"
              step="0.125"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Term (months)</label>
            <input
              type="number"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="360"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs ($)</label>
            <input
              type="number"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Points Purchased</label>
            <input
              type="number"
              step="0.5"
              value={pointsPurchased}
              onChange={(e) => setPointsPurchased(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500">Each point = 1% of loan, typically reduces rate 0.25%</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cash Out ($)</label>
            <input
              type="number"
              value={cashOut}
              onChange={(e) => setCashOut(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Planning Horizon (years)</label>
            <input
              type="number"
              value={planningHorizon}
              onChange={(e) => setPlanningHorizon(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Refinance Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-800">Current Payment</h4>
              <p className="text-2xl font-bold text-gray-700">${result.currPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.remainTerm} months left at {result.currRate}%</p>
            </div>

            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-800">New Payment</h4>
              <p className={`text-2xl font-bold ${result.paymentDecrease ? 'text-green-700' : 'text-red-700'}`}>
                ${result.newPayment.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.newT} months at {result.newR}%</p>
            </div>

            <div className={`p-4 rounded-lg ${result.monthlySavings > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <h4 className="font-medium text-gray-800">Monthly Change</h4>
              <p className={`text-2xl font-bold ${result.monthlySavings > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {result.monthlySavings > 0 ? '-' : '+'}${Math.abs(result.monthlySavings).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{Math.abs(result.paymentPercentChange).toFixed(1)}% change</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg mb-4 ${result.worthIt ? 'bg-green-100 border border-green-300' : 'bg-amber-100 border border-amber-300'}`}>
            <h4 className="font-medium text-gray-800">Break-Even Analysis</h4>
            <div className="grid md:grid-cols-4 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Upfront Costs</p>
                <p className="font-bold text-indigo-700">${result.totalUpfrontCost.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Break-Even</p>
                <p className="font-bold text-blue-700">{result.breakEvenMonths} months ({result.breakEvenYears} years)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Worth It?</p>
                <p className={`font-bold ${result.worthIt ? 'text-green-700' : 'text-red-700'}`}>
                  {result.worthIt ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Planning Horizon</p>
                <p className="font-bold">{result.horizon} years</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Interest Comparison</h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Current Loan Interest (remaining)</span>
                <span className="font-bold text-red-600">${result.currTotalInterest.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span className="text-gray-600">New Loan Interest (full term)</span>
                <span className="font-bold text-blue-600">${result.newTotalInterest.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Interest Difference</span>
                <span className={`font-bold ${result.interestSaved > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.interestSaved > 0 ? 'Save' : 'Pay'} ${Math.abs(result.interestSaved).toFixed(0)}
                </span>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Savings over {result.remainTerm} months: ${result.savingsOverRemainTerm.toFixed(0)} (including costs)
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Alternative Term Scenarios</h4>
            <div className="space-y-2 mt-2">
              {result.scenarios.map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">{s.label} at {s.rate}%</span>
                  <div className="text-right">
                    <span className="font-bold text-indigo-600">${s.payment.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-2">BE: {s.breakEven}mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Extra Payment Impact</h4>
            <p className="text-sm text-gray-600 mt-1">
              Pay ${result.extra}/mo extra on new loan: payoff in {result.extraMonths} months, save ${result.extraSavings.toFixed(0)} interest
            </p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Key Insights</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-blue-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Refinance costs typically 2-5% of loan amount. Points: 1 point = 1% loan amount, reduces rate ~0.25%. Break-even under 3 years usually worthwhile. Consider: will you stay in home past break-even? Lower rate but longer term may increase total interest. Cash-out refi increases loan amount. Compare with keeping current loan. Check current rates vs historical trends. Consider no-cost refinance options. Factor in tax implications.</p>
      </div>
    </div>
  );
}