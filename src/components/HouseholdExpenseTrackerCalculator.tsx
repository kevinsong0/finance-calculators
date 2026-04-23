'use client';

import { useState, useMemo } from 'react';

export default function HouseholdExpenseTrackerCalculator() {
  const [housingExpense, setHousingExpense] = useState<string>('1500');
  const [utilitiesExpense, setUtilitiesExpense] = useState<string>('200');
  const [groceriesExpense, setGroceriesExpense] = useState<string>('400');
  const [transportationExpense, setTransportationExpense] = useState<string>('300');
  const [healthcareExpense, setHealthcareExpense] = useState<string>('150');
  const [entertainmentExpense, setEntertainmentExpense] = useState<string>('100');
  const [educationExpense, setEducationExpense] = useState<string>('0');
  const [personalExpense, setPersonalExpense] = useState<string>('100');
  const [otherExpense, setOtherExpense] = useState<string>('50');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [numberOfMembers, setNumberOfMembers] = useState<string>('2');
  const [savingsGoal, setSavingsGoal] = useState<string>('500');
  const [analysisMonths, setAnalysisMonths] = useState<string>('12');

  const result = useMemo(() => {
    const housing = parseFloat(housingExpense) || 0;
    const utilities = parseFloat(utilitiesExpense) || 0;
    const groceries = parseFloat(groceriesExpense) || 0;
    const transportation = parseFloat(transportationExpense) || 0;
    const healthcare = parseFloat(healthcareExpense) || 0;
    const entertainment = parseFloat(entertainmentExpense) || 0;
    const education = parseFloat(educationExpense) || 0;
    const personal = parseFloat(personalExpense) || 0;
    const other = parseFloat(otherExpense) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const members = parseInt(numberOfMembers) || 1;
    const savings = parseFloat(savingsGoal) || 0;
    const months = parseInt(analysisMonths) || 12;

    // Total expenses
    const totalExpenses = housing + utilities + groceries + transportation + healthcare + entertainment + education + personal + other;
    const annualExpenses = totalExpenses * months;

    // Expense breakdown
    const expenseCategories = [
      { name: 'Housing', amount: housing, color: 'bg-blue-500', essential: true },
      { name: 'Utilities', amount: utilities, color: 'bg-yellow-500', essential: true },
      { name: 'Groceries', amount: groceries, color: 'bg-green-500', essential: true },
      { name: 'Transportation', amount: transportation, color: 'bg-purple-500', essential: true },
      { name: 'Healthcare', amount: healthcare, color: 'bg-red-500', essential: true },
      { name: 'Entertainment', amount: entertainment, color: 'bg-pink-500', essential: false },
      { name: 'Education', amount: education, color: 'bg-indigo-500', essential: false },
      { name: 'Personal', amount: personal, color: 'bg-orange-500', essential: false },
      { name: 'Other', amount: other, color: 'bg-gray-500', essential: false }
    ].sort((a, b) => b.amount - a.amount);

    // Essential vs discretionary
    const essentialExpenses = housing + utilities + groceries + transportation + healthcare;
    const discretionaryExpenses = entertainment + education + personal + other;
    const essentialPercent = (essentialExpenses / totalExpenses) * 100;
    const discretionaryPercent = (discretionaryExpenses / totalExpenses) * 100;

    // Per member costs
    const perMemberExpense = totalExpenses / members;
    const perMemberIncome = income / members;

    // Budget analysis
    const remainingIncome = income - totalExpenses;
    const savingsAchieved = Math.max(0, remainingIncome);
    const savingsPercent = (savingsAchieved / income) * 100;
    const savingsGoalMet = savingsAchieved >= savings;

    // Housing cost ratio (should be below 30%)
    const housingRatio = (housing / income) * 100;

    // Expense to income ratio
    const expenseRatio = (totalExpenses / income) * 100;

    // Recommendations
    const recommendations: string[] = [];

    if (housingRatio > 30) {
      recommendations.push('Housing exceeds 30% of income - consider downsizing or roommates');
    }

    if (savingsPercent < 10) {
      recommendations.push('Savings rate below 10% - reduce discretionary spending');
    }

    if (discretionaryPercent > 30) {
      recommendations.push('Discretionary spending over 30% - significant cut opportunities exist');
    }

    if (expenseRatio > 90) {
      recommendations.push('Expenses consume 90%+ of income - high financial risk');
    }

    if (!savingsGoalMet && savings > 0) {
      const shortfall = savings - savingsAchieved;
      recommendations.push(`Savings goal shortfall: $${shortfall.toFixed(0)} - adjust discretionary spending`);
    }

    if (transportation > income * 0.15) {
      recommendations.push('Transportation exceeds 15% of income - consider alternatives');
    }

    // Category-specific insights
    const categoryInsights: string[] = [];

    if (utilities > 300) {
      categoryInsights.push('High utilities - energy efficiency upgrades may reduce costs');
    }

    if (groceries > members * 200) {
      categoryInsights.push('Grocery spending high per person - meal planning may reduce costs');
    }

    if (entertainment > income * 0.05) {
      categoryInsights.push('Entertainment exceeds 5% - consider lower-cost alternatives');
    }

    return {
      totalExpenses,
      annualExpenses,
      expenseCategories,
      essentialExpenses,
      discretionaryExpenses,
      essentialPercent,
      discretionaryPercent,
      perMemberExpense,
      perMemberIncome,
      remainingIncome,
      savingsAchieved,
      savingsPercent,
      savingsGoalMet,
      housingRatio,
      expenseRatio,
      recommendations,
      categoryInsights,
      income
    };
  }, [housingExpense, utilitiesExpense, groceriesExpense, transportationExpense, healthcareExpense, entertainmentExpense, educationExpense, personalExpense, otherExpense, monthlyIncome, numberOfMembers, savingsGoal, analysisMonths]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Household Expense Tracker Calculator</h1>
      <p className="text-gray-600 mb-6">Track, categorize, and analyze household expenses for better budgeting</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Expenses</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Housing (Rent/Mortgage) ($)</label>
            <input
              type="number"
              value={housingExpense}
              onChange={(e) => setHousingExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Utilities ($)</label>
            <input
              type="number"
              value={utilitiesExpense}
              onChange={(e) => setUtilitiesExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="200"
            />
            <p className="text-xs text-gray-500 mt-1">Electric, gas, water, internet</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Groceries ($)</label>
            <input
              type="number"
              value={groceriesExpense}
              onChange={(e) => setGroceriesExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transportation ($)</label>
            <input
              type="number"
              value={transportationExpense}
              onChange={(e) => setTransportationExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
            />
            <p className="text-xs text-gray-500 mt-1">Car, gas, public transit, parking</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Healthcare ($)</label>
            <input
              type="number"
              value={healthcareExpense}
              onChange={(e) => setHealthcareExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
            <p className="text-xs text-gray-500 mt-1">Insurance premiums, medications, copays</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional & Income</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entertainment ($)</label>
            <input
              type="number"
              value={entertainmentExpense}
              onChange={(e) => setEntertainmentExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education ($)</label>
            <input
              type="number"
              value={educationExpense}
              onChange={(e) => setEducationExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal/Miscellaneous ($)</label>
            <input
              type="number"
              value={personalExpense}
              onChange={(e) => setPersonalExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Expenses ($)</label>
            <input
              type="number"
              value={otherExpense}
              onChange={(e) => setOtherExpense(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Household Income ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Household Members</label>
            <input
              type="number"
              value={numberOfMembers}
              onChange={(e) => setNumberOfMembers(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings Goal ($)</label>
            <input
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Expense Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Monthly Expenses</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.totalExpenses.toFixed(0)}</p>
              <p className="text-xs text-gray-500">${result.annualExpenses.toFixed(0)}/year</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Remaining Income</h4>
              <p className={`text-xl font-bold ${result.remainingIncome >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                $${result.remainingIncome.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.savingsPercent.toFixed(1)}% savings rate</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Member Cost</h4>
              <p className="text-xl font-bold text-purple-700">$${result.perMemberExpense.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly per person</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Expense Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.expenseCategories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${cat.color}`}></div>
                    <span className="text-gray-600">{cat.name}</span>
                    {cat.essential && <span className="text-xs text-gray-400">(essential)</span>}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({((cat.amount / result.totalExpenses) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Essential vs Discretionary</h4>
              <p className="text-sm mt-1">Essential: <span className="font-bold text-blue-600">{result.essentialPercent.toFixed(1)}%</span> ($${result.essentialExpenses.toFixed(0)})</p>
              <p className="text-sm">Discretionary: <span className="font-bold text-orange-600">{result.discretionaryPercent.toFixed(1)}%</span> ($${result.discretionaryExpenses.toFixed(0)})</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Housing Cost Ratio</h4>
              <p className={`text-lg font-bold ${result.housingRatio > 30 ? 'text-red-600' : 'text-green-600'}`}>
                {result.housingRatio.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">
                {result.housingRatio > 30 ? 'Exceeds recommended 30%' : 'Within recommended range'}
              </p>
            </div>
          </div>

          {parseFloat(savingsGoal) > 0 && !result.savingsGoalMet && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-4">
              <p className="text-yellow-700 font-medium">
                Savings goal not met: $${(parseFloat(savingsGoal) - result.savingsAchieved).toFixed(0)} shortfall
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Budget Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {result.categoryInsights.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Category Insights</h4>
              <ul className="mt-2 space-y-1">
                {result.categoryInsights.map((insight, i) => (
                  <li key={i} className="text-sm text-indigo-600">💡 {insight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Essential expenses include housing, utilities, groceries, transportation, and healthcare. Discretionary expenses are entertainment, education, personal, and other. Recommended housing ratio is below 30% of income. Target savings rate of 10-20% for financial stability. Actual expenses may vary by region and household size.</p>
      </div>
    </div>
  );
}