'use client';

import { useState, useMemo } from 'react';

export default function EarlyRetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [currentIncome, setCurrentIncome] = useState<string>('80000');
  const [currentSavings, setCurrentSavings] = useState<string>('100000');
  const [savingsRate, setSavingsRate] = useState<string>('25');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [targetRetirementAge, setTargetRetirementAge] = useState<string>('50');
  const [annualExpenses, setAnnualExpenses] = useState<string>('40000');
  const [inflation, setInflation] = useState<string>('3');
  const [withdrawalRate, setWithdrawalRate] = useState<string>('4');

  const result = useMemo(() => {
    const age = parseFloat(currentAge) || 0;
    const income = parseFloat(currentIncome) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const rate = parseFloat(savingsRate) || 0;
    const returnPct = parseFloat(expectedReturn) || 0;
    const targetAge = parseFloat(targetRetirementAge) || 0;
    const expenses = parseFloat(annualExpenses) || 0;
    const inflPct = parseFloat(inflation) || 0;
    const wr = parseFloat(withdrawalRate) || 0;

    const yearsToRetirement = targetAge - age;
    const yearsInRetirement = 85 - targetAge;

    // Annual savings amount
    const annualSavingsAmount = income * (rate / 100);

    // Projected savings at retirement
    const annualReturn = returnPct / 100;
    let projectedSavings = savings;
    for (let y = 0; y < yearsToRetirement; y++) {
      projectedSavings = projectedSavings * (1 + annualReturn) + annualSavingsAmount;
    }

    // FIRE number (25x annual expenses rule)
    const fireNumber = expenses * 25;
    const fireNumberInflationAdjusted = expenses * Math.pow(1 + inflPct / 100, yearsToRetirement) * 25;

    // Gap analysis
    const savingsGap = fireNumberInflationAdjusted - projectedSavings;
    const onTrack = projectedSavings >= fireNumberInflationAdjusted;

    // Calculate required savings rate
    const requiredFireNumber = fireNumberInflationAdjusted;
    const requiredAnnualSavings = requiredFireNumber > savings
      ? (requiredFireNumber - savings * Math.pow(1 + annualReturn, yearsToRetirement)) /
        ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn)
      : 0;
    const requiredSavingsRate = income > 0 ? (requiredAnnualSavings / income) * 100 : 0;

    // Withdrawal sustainability
    const annualWithdrawal = projectedSavings * (wr / 100);
    const monthlyWithdrawal = annualWithdrawal / 12;
    const expensesAtRetirement = expenses * Math.pow(1 + inflPct / 100, yearsToRetirement);
    const withdrawalCoversExpenses = annualWithdrawal >= expensesAtRetirement;

    // Years of runway
    let runwayYears = 0;
    let balance = projectedSavings;
    const realWithdrawal = expensesAtRetirement;
    while (balance > 0 && runwayYears < yearsInRetirement) {
      const growth = balance * annualReturn;
      balance = balance + growth - realWithdrawal;
      runwayYears++;
    }

    // Savings milestones
    const milestones: { age: number; savings: number; percentToFire: number }[] = [];
    let milestoneBalance = savings;
    for (let yr = 1; yr <= yearsToRetirement; yr++) {
      milestoneBalance = milestoneBalance * (1 + annualReturn) + annualSavingsAmount;
      if (yr % 5 === 0 || yr === yearsToRetirement) {
        milestones.push({
          age: age + yr,
          savings: Math.round(milestoneBalance),
          percentToFire: Math.round((milestoneBalance / fireNumberInflationAdjusted) * 100)
        });
      }
    }

    // Different FIRE scenarios
    const fireScenarios = [
      { targetAge: 45, label: 'Ultra-early (45)' },
      { targetAge: 50, label: 'Very early (50)' },
      { targetAge: 55, label: 'Early (55)' },
      { targetAge: 60, label: 'Semi-retire (60)' }
    ].map(s => {
      const yrs = s.targetAge - age;
      const fireNum = expenses * Math.pow(1 + inflPct / 100, yrs) * 25;
      let proj = savings;
      for (let y = 0; y < yrs; y++) {
        proj = proj * (1 + annualReturn) + annualSavingsAmount;
      }
      const gap = fireNum - proj;
      const reqRate = income > 0 ? ((fireNum - savings * Math.pow(1 + annualReturn, yrs)) /
        ((Math.pow(1 + annualReturn, yrs) - 1) / annualReturn)) / income * 100 : 0;
      return { ...s, fireNumber: Math.round(fireNum), projected: Math.round(proj), gap: Math.round(gap), requiredRate: Math.round(reqRate) };
    });

    return {
      projectedSavings: Math.round(projectedSavings),
      fireNumber: Math.round(fireNumber),
      fireNumberInflationAdjusted: Math.round(fireNumberInflationAdjusted),
      savingsGap: Math.round(savingsGap),
      onTrack,
      yearsToRetirement,
      yearsInRetirement,
      annualSavingsAmount: Math.round(annualSavingsAmount),
      requiredSavingsRate: Math.round(requiredSavingsRate),
      annualWithdrawal: Math.round(annualWithdrawal),
      monthlyWithdrawal: Math.round(monthlyWithdrawal),
      expensesAtRetirement: Math.round(expensesAtRetirement),
      withdrawalCoversExpenses,
      runwayYears,
      milestones,
      fireScenarios,
      age,
      targetAge,
      income,
      savings,
      rate,
      returnPct,
      expenses,
      inflPct,
      wr
    };
  }, [currentAge, currentIncome, currentSavings, savingsRate, expectedReturn, targetRetirementAge, annualExpenses, inflation, withdrawalRate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Early Retirement (FIRE) Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate Financial Independence, Retire Early timeline</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Situation</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="80000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Savings Rate (%)</label>
            <input
              type="number"
              value={savingsRate}
              onChange={(e) => setSavingsRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="25"
            />
            <p className="text-xs text-gray-500">Percentage of income saved annually</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return (%)</label>
            <input
              type="number"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="7"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Retirement Target</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Retirement Age</label>
            <input
              type="number"
              value={targetRetirementAge}
              onChange={(e) => setTargetRetirementAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Expenses ($)</label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="40000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Inflation (%)</label>
            <input
              type="number"
              step="0.5"
              value={inflation}
              onChange={(e) => setInflation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Safe Withdrawal Rate (%)</label>
            <input
              type="number"
              step="0.5"
              value={withdrawalRate}
              onChange={(e) => setWithdrawalRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4"
            />
            <p className="text-xs text-gray-500">4% is traditional, 3-3.5% safer for early retirement</p>
          </div>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">FIRE Analysis</h3>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Years to FIRE</p>
              <p className="text-2xl font-bold text-blue-700">{result.yearsToRetirement}</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">FIRE Number</p>
              <p className="text-2xl font-bold text-indigo-700">${result.fireNumberInflationAdjusted.toLocaleString()}</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Projected Savings</p>
              <p className="text-2xl font-bold text-green-700">${result.projectedSavings.toLocaleString()}</p>
            </div>

            <div className={`text-center p-3 rounded-lg ${result.onTrack ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="text-sm text-gray-600">{result.onTrack ? 'On Track!' : 'Gap'}</p>
              <p className={`text-xl font-bold ${result.onTrack ? 'text-green-700' : 'text-red-700'}`}>
                {result.onTrack ? '+' : '-'}${Math.abs(result.savingsGap).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">FIRE Math</h4>
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Annual Savings</p>
                <p className="font-bold text-blue-600">${result.annualSavingsAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Required Savings Rate</p>
                <p className={`font-bold ${result.rate >= result.requiredSavingsRate ? 'text-green-600' : 'text-red-600'}`}>
                  {result.requiredSavingsRate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">25x Expenses Rule</p>
                <p className="font-bold text-indigo-600">${result.fireNumber}</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Withdrawal Sustainability</h4>
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Annual Withdrawal</p>
                <p className="font-bold text-amber-600">${result.annualWithdrawal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Income</p>
                <p className="font-bold text-green-600">${result.monthlyWithdrawal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Runway Years</p>
                <p className={`font-bold ${result.runwayYears >= result.yearsInRetirement ? 'text-green-600' : 'text-amber-600'}`}>
                  {result.runwayYears}
                </p>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              Expenses at retirement: ${result.expensesAtRetirement} (inflation-adjusted)
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Savings Milestones</h4>
            <div className="space-y-2 mt-2">
              {result.milestones.map((m, i) => (
                <div key={i} className={`flex justify-between items-center text-sm p-2 rounded ${m.percentToFire >= 100 ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <span className="text-gray-600">Age {m.age}</span>
                  <div className="text-right">
                    <span className="font-medium">${m.savings.toLocaleString()}</span>
                    <span className={`text-xs ml-2 ${m.percentToFire >= 100 ? 'text-green-600' : 'text-gray-500'}`}>
                      ({m.percentToFire}% to FIRE)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">FIRE Timeline Scenarios</h4>
            <div className="space-y-2 mt-2">
              {result.fireScenarios.map((s, i) => (
                <div key={i} className={`flex justify-between items-center text-sm p-2 rounded ${s.gap <= 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <span className="text-gray-600">{s.label}</span>
                  <div className="text-right">
                    <span className="font-medium">${s.projected.toLocaleString()}</span>
                    <span className="text-xs ml-2 text-gray-500">
                      (need ${s.fireNumber.toLocaleString()}, {s.requiredRate}% savings)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!result.onTrack && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <h4 className="font-medium text-amber-800">How to Reach FIRE</h4>
              <p className="text-sm mt-1 text-amber-700">
                Increase savings rate to {result.requiredSavingsRate}% (save ${Math.round(result.income * result.requiredSavingsRate / 100)} annually)
              </p>
              <p className="text-sm text-amber-600">
                Or reduce annual expenses to ${Math.round(result.projectedSavings / 25)} (FIRE number: 25x expenses)
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> FIRE = Financial Independence, Retire Early. Core formula: FIRE Number = 25x annual expenses. Savings rate determines timeline: 10% ~ 51 years, 25% ~ 32 years, 50% ~ 17 years, 75% ~ 7 years. 4% rule assumes 30-year retirement - early retirees need 3-3.5%. Reduce expenses by cutting housing, transportation, subscriptions. Increase income through career growth, side hustles. Maximize tax-advantaged accounts (401k, IRA). Health insurance major cost for early retirees.</p>
      </div>
    </div>
  );
}