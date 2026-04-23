'use client';

import { useState, useMemo } from 'react';

export default function RetirementIncomeCalculator() {
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentAge, setCurrentAge] = useState<string>('35');
  const [currentSavings, setCurrentSavings] = useState<string>('200000');
  const [annualContributions, setAnnualContributions] = useState<string>('10000');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [socialSecurity, setSocialSecurity] = useState<string>('2000');
  const [pension, setPension] = useState<string>('0');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('4000');
  const [lifeExpectancy, setLifeExpectancy] = useState<string>('85');
  const [inflationRate, setInflationRate] = useState<string>('3');

  const result = useMemo(() => {
    const retire = parseFloat(retirementAge) || 0;
    const current = parseFloat(currentAge) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const contributions = parseFloat(annualContributions) || 0;
    const returnRate = parseFloat(expectedReturn) || 0;
    const ss = parseFloat(socialSecurity) || 0;
    const pen = parseFloat(pension) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const life = parseFloat(lifeExpectancy) || 0;
    const inflation = parseFloat(inflationRate) || 0;

    const yearsToRetirement = retire - current;
    const yearsInRetirement = life - retire;
    const monthsInRetirement = yearsInRetirement * 12;

    // Growth of savings until retirement
    const realReturn = returnRate - inflation;
    const monthlyReturn = realReturn / 100 / 12;
    const annualReturnCompound = Math.pow(1 + returnRate / 100, 1);

    let accumulatedSavings = savings;
    for (let y = 0; y < yearsToRetirement; y++) {
      accumulatedSavings = accumulatedSavings * annualReturnCompound + contributions;
    }

    // Monthly income sources
    const ssMonthly = ss;
    const pensionMonthly = pen;
    const investmentWithdrawalRate = realReturn > 0 ? realReturn / 100 / 12 : 0.004;
    const sustainableWithdrawal = accumulatedSavings * 0.04 / 12; // 4% rule

    // Total monthly income
    const totalMonthlyIncome = ssMonthly + pensionMonthly + sustainableWithdrawal;

    // Inflation-adjusted expenses at retirement
    const inflationAdjustedExpenses = expenses * Math.pow(1 + inflation / 100, yearsToRetirement);

    // Income vs expenses gap
    const monthlyGap = totalMonthlyIncome - inflationAdjustedExpenses;
    const shortfall = monthlyGap < 0;

    // Run out of money calculation
    let balance = accumulatedSavings;
    let monthsUntilDepletion = 0;
    const monthlyWithdrawal = inflationAdjustedExpenses - ssMonthly - pensionMonthly;
    while (balance > 0 && monthsUntilDepletion < monthsInRetirement) {
      const investmentGrowth = balance * returnRate / 100 / 12;
      balance = balance + investmentGrowth - Math.max(0, monthlyWithdrawal);
      monthsUntilDepletion++;
    }
    const moneyLasts = monthsUntilDepletion >= monthsInRetirement;

    // Additional savings needed
    const additionalNeeded = shortfall ? Math.abs(monthlyGap) * monthsInRetirement / (Math.pow(1 + returnRate / 100, yearsInRetirement)) : 0;
    const additionalAnnual = shortfall ? additionalNeeded / yearsToRetirement : 0;

    // Income replacement ratio
    const replacementRatio = expenses > 0 ? (totalMonthlyIncome / expenses) * 100 : 0;

    // Different withdrawal scenarios
    const withdrawalScenarios = [3, 4, 5, 6].map(wr => {
      const withdrawal = accumulatedSavings * (wr / 100) / 12;
      const totalIncome = ssMonthly + pensionMonthly + withdrawal;
      const gap = totalIncome - inflationAdjustedExpenses;
      let bal = accumulatedSavings;
      let mo = 0;
      while (bal > 0 && mo < monthsInRetirement) {
        const growth = bal * returnRate / 100 / 12;
        bal = bal + growth - Math.max(0, inflationAdjustedExpenses - ssMonthly - pensionMonthly);
        mo++;
      }
      return { rate: wr, withdrawal, totalIncome, gap, lastsYears: mo / 12 };
    });

    // Savings milestones
    const savingsMilestones: { age: number; balance: number }[] = [];
    let milestoneBalance = savings;
    for (let age = current + 5; age <= retire; age += 5) {
      const years = age - current;
      milestoneBalance = savings;
      for (let y = 0; y < years; y++) {
        milestoneBalance = milestoneBalance * annualReturnCompound + contributions;
      }
      savingsMilestones.push({ age, balance: Math.round(milestoneBalance) });
    }

    return {
      accumulatedSavings: Math.round(accumulatedSavings),
      yearsToRetirement,
      yearsInRetirement,
      totalMonthlyIncome: Math.round(totalMonthlyIncome),
      inflationAdjustedExpenses: Math.round(inflationAdjustedExpenses),
      monthlyGap: Math.round(monthlyGap),
      shortfall,
      monthsUntilDepletion,
      moneyLasts,
      additionalNeeded: Math.round(additionalNeeded),
      additionalAnnual: Math.round(additionalAnnual),
      replacementRatio: Math.round(replacementRatio),
      withdrawalScenarios,
      savingsMilestones,
      ssMonthly,
      pensionMonthly,
      sustainableWithdrawal: Math.round(sustainableWithdrawal),
      retire,
      current,
      savings,
      contributions,
      returnRate,
      life,
      inflation
    };
  }, [retirementAge, currentAge, currentSavings, annualContributions, expectedReturn, socialSecurity, pension, monthlyExpenses, lifeExpectancy, inflationRate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Retirement Income Calculator</h1>
      <p className="text-gray-600 mb-6">Plan retirement income sources and estimate sustainability</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Retirement Timeline</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="35"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="65"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Life Expectancy</label>
            <input
              type="number"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="85"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Monthly Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Inflation (%)</label>
            <input
              type="number"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Savings & Income Sources</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Retirement Savings ($)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="200000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Contributions ($)</label>
            <input
              type="number"
              value={annualContributions}
              onChange={(e) => setAnnualContributions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Investment Return (%)</label>
            <input
              type="number"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Social Security ($/month)</label>
            <input
              type="number"
              value={socialSecurity}
              onChange={(e) => setSocialSecurity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pension Income ($/month)</label>
            <input
              type="number"
              value={pension}
              onChange={(e) => setPension(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Retirement Income Analysis</h3>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Years to Retirement</p>
              <p className="text-2xl font-bold text-blue-700">{result.yearsToRetirement}</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Projected Savings</p>
              <p className="text-2xl font-bold text-indigo-700">${result.accumulatedSavings.toLocaleString()}</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="text-2xl font-bold text-green-700">${result.totalMonthlyIncome}</p>
            </div>

            <div className={`text-center p-3 rounded-lg ${result.shortfall ? 'bg-red-100' : 'bg-green-100'}`}>
              <p className="text-sm text-gray-600">Income Gap</p>
              <p className={`text-xl font-bold ${result.shortfall ? 'text-red-700' : 'text-green-700'}`}>
                {result.shortfall ? '-' : '+'}${Math.abs(result.monthlyGap)}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Income Sources at Retirement</h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Social Security</span>
                <span className="font-bold text-blue-600">${result.ssMonthly}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Pension</span>
                <span className="font-bold text-purple-600">${result.pensionMonthly}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Investments (4% rule)</span>
                <span className="font-bold text-green-600">${result.sustainableWithdrawal}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-amber-50 rounded font-medium">
                <span className="text-gray-800">Total Monthly Income</span>
                <span className="font-bold text-amber-700">${result.totalMonthlyIncome}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-gray-100 rounded">
                <span className="text-gray-800">Inflation-Adjusted Expenses</span>
                <span className="font-bold text-gray-700">${result.inflationAdjustedExpenses}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Withdrawal Rate Scenarios</h4>
            <div className="space-y-2 mt-2">
              {result.withdrawalScenarios.map((s, i) => (
                <div key={i} className={`flex justify-between items-center text-sm p-2 rounded ${s.gap >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <span className="text-gray-600">{s.rate}% withdrawal rate</span>
                  <div className="text-right">
                    <span className="font-medium">${s.totalIncome}/mo</span>
                    <span className={`text-xs ml-2 ${s.gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({s.gap >= 0 ? '+' : ''}${s.gap}, lasts {s.lastsYears}yr)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Savings Milestones</h4>
            <div className="space-y-2 mt-2">
              {result.savingsMilestones.map((m, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Age {m.age}</span>
                  <span className="font-bold text-indigo-600">${m.balance.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {result.shortfall && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <h4 className="font-medium text-red-800">Action Needed</h4>
              <p className="text-sm mt-1 text-red-700">
                To cover shortfall, increase savings by ${result.additionalAnnual}/year for {result.yearsToRetirement} years
              </p>
              <p className="text-sm text-red-600">
                Or increase total savings target by ${result.additionalNeeded.toLocaleString()} before retirement
              </p>
            </div>
          )}

          {!result.shortfall && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <h4 className="font-medium text-green-800">On Track!</h4>
              <p className="text-sm mt-1 text-green-700">
                Income replacement ratio: {result.replacementRatio}% | Money lasts {result.monthsUntilDepletion / 12} years
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> 4% rule: withdraw 4% of savings first year, adjust for inflation annually. Social Security: average ~$1,800/month at 67, claim early (62) reduces 25%, delay (70) increases 8%/year. Safe withdrawal: 3-4% for 30-year retirement, 2.5-3% for longer. Income replacement target: 70-80% of pre-retirement income. Consider healthcare costs (not covered by SS). Review plan annually. Adjust for actual returns vs projected.</p>
      </div>
    </div>
  );
}