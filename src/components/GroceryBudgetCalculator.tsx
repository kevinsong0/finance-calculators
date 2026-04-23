'use client';

import { useState, useMemo } from 'react';

export default function GroceryBudgetCalculator() {
  const [monthlyGroceryBudget, setMonthlyGroceryBudget] = useState<string>('600');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  const [shoppingFrequency, setShoppingFrequency] = useState<string>('weekly');
  const [mealPlanning, setMealPlanning] = useState<string>('sometimes');
  const [cookingFrequency, setCookingFrequency] = useState<string>('daily');
  const [specialDiet, setSpecialDiet] = useState<string>('none');
  const [organicPercentage, setOrganicPercentage] = useState<string>('25');
  const [bulkBuying, setBulkBuying] = useState<string>('sometimes');
  const [couponUsage, setCouponUsage] = useState<string>('rarely');
  const [currentSpending, setCurrentSpending] = useState<string>('750');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyGroceryBudget) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const spending = parseFloat(currentSpending) || 0;
    const organicPercent = parseFloat(organicPercentage) || 0;

    // Calculate per person budget
    const perPersonBudget = budget / people;
    const perPersonSpending = spending / people;

    // Weekly and daily breakdowns
    const weeklyBudget = budget / 4;
    const dailyBudget = budget / 30;
    const weeklySpending = spending / 4;

    // Budget vs actual
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const overBudgetPercent = isOverBudget ? ((spending - budget) / budget) * 100 : 0;

    // Baseline recommendations by household size
    const baselinePerPerson = 250; // USDA moderate plan baseline
    const expectedBudget = baselinePerPerson * people;

    // Diet cost multipliers
    const dietMultipliers: Record<string, number> = {
      none: 1.0,
      vegetarian: 1.05,
      vegan: 1.1,
      glutenFree: 1.2,
      organicOnly: 1.3,
      lowCarb: 1.15
    };
    const dietAdjustedBudget = expectedBudget * dietMultipliers[specialDiet];

    // Organic premium calculation
    const organicPremium = organicPercent * 0.3; // 30% premium on organic items

    // Potential savings from habits
    let potentialSavings = 0;
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (mealPlanning === 'rarely') {
      const mealPlanningSavings = spending * 0.15;
      potentialSavings += mealPlanningSavings;
      savingsOpportunities.push({ action: 'Implement meal planning', savings: mealPlanningSavings });
    } else if (mealPlanning === 'sometimes') {
      const mealPlanningSavings = spending * 0.08;
      potentialSavings += mealPlanningSavings;
      savingsOpportunities.push({ action: 'Consistent weekly meal planning', savings: mealPlanningSavings });
    }

    if (bulkBuying === 'rarely') {
      const bulkSavings = spending * 0.1;
      potentialSavings += bulkSavings;
      savingsOpportunities.push({ action: 'Buy staples in bulk', savings: bulkSavings });
    }

    if (couponUsage === 'rarely') {
      const couponSavings = spending * 0.05;
      potentialSavings += couponSavings;
      savingsOpportunities.push({ action: 'Use coupons and apps', savings: couponSavings });
    }

    if (organicPercent > 50) {
      const organicSavings = spending * organicPercent * 0.15;
      savingsOpportunities.push({ action: 'Reduce organic to essentials only', savings: organicSavings });
    }

    if (shoppingFrequency === 'daily') {
      const frequencySavings = spending * 0.1;
      potentialSavings += frequencySavings;
      savingsOpportunities.push({ action: 'Reduce shopping frequency', savings: frequencySavings });
    }

    // Food waste reduction
    const foodWasteSavings = spending * 0.08;
    savingsOpportunities.push({ action: 'Reduce food waste', savings: foodWasteSavings });

    // New optimized budget
    const optimizedBudget = spending - potentialSavings;

    // Category allocation recommendations
    const categories = [
      { name: 'Proteins', percent: 30, amount: budget * 0.30 },
      { name: 'Fruits/Veggies', percent: 25, amount: budget * 0.25 },
      { name: 'Grains/Starches', percent: 15, amount: budget * 0.15 },
      { name: 'Dairy', percent: 12, amount: budget * 0.12 },
      { name: 'Snacks/Beverages', percent: 10, amount: budget * 0.10 },
      { name: 'Misc/Condiments', percent: 8, amount: budget * 0.08 }
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Currently over budget by $${Math.abs(budgetVariance).toFixed(0)} ({overBudgetPercent.toFixed(1)}%)');
    }

    if (perPersonSpending > baselinePerPerson * 1.2) {
      recommendations.push('Spending per person above typical - review purchasing patterns');
    }

    if (mealPlanning === 'rarely' || mealPlanning === 'sometimes') {
      recommendations.push('Meal planning can reduce waste and impulse purchases');
    }

    if (shoppingFrequency === 'daily') {
      recommendations.push('Daily shopping increases impulse purchases - consolidate trips');
    }

    if (organicPercent > 30) {
      recommendations.push('High organic spending - prioritize Dirty Dozen, skip Clean Fifteen');
    }

    if (couponUsage === 'rarely') {
      recommendations.push('Use store apps and coupons - typical savings 5-10%');
    }

    return {
      perPersonBudget,
      perPersonSpending,
      weeklyBudget,
      dailyBudget,
      budgetVariance,
      isOverBudget,
      overBudgetPercent,
      expectedBudget,
      dietAdjustedBudget,
      potentialSavings,
      savingsOpportunities,
      optimizedBudget,
      categories,
      recommendations,
      budget,
      spending
    };
  }, [monthlyGroceryBudget, numberOfPeople, shoppingFrequency, mealPlanning, cookingFrequency, specialDiet, organicPercentage, bulkBuying, couponUsage, currentSpending]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Grocery Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Optimize grocery spending with personalized recommendations</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget &amp; Household</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Grocery Budget ($)</label>
            <input
              type="number"
              value={monthlyGroceryBudget}
              onChange={(e) => setMonthlyGroceryBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="750"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shopping Frequency</label>
            <select
              value={shoppingFrequency}
              onChange={(e) => setShoppingFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="fewTimes">Few times per week</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Every 2 weeks</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meal Planning</label>
            <select
              value={mealPlanning}
              onChange={(e) => setMealPlanning(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="always">Always (weekly plans)</option>
              <option value="sometimes">Sometimes</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Shopping Habits</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Diet</label>
            <select
              value={specialDiet}
              onChange={(e) => setSpecialDiet(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None (standard)</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="glutenFree">Gluten-free</option>
              <option value="organicOnly">Organic only</option>
              <option value="lowCarb">Low-carb/Keto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organic Percentage (%)</label>
            <input
              type="number"
              value={organicPercentage}
              onChange={(e) => setOrganicPercentage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="25"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">% of groceries that are organic</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Buying</label>
            <select
              value={bulkBuying}
              onChange={(e) => setBulkBuying(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="often">Often</option>
              <option value="sometimes">Sometimes</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon/App Usage</label>
            <select
              value={couponUsage}
              onChange={(e) => setCouponUsage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="always">Always</option>
              <option value="sometimes">Sometimes</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Cooking Frequency</label>
            <select
              value={cookingFrequency}
              onChange={(e) => setCookingFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="mostDays">Most days</option>
              <option value="fewTimes">Few times per week</option>
              <option value="rarely">Rarely (mostly eat out)</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Grocery Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Per Person Budget</h4>
              <p className="text-xl font-bold text-amber-700">$${result.perPersonBudget.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly per person</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Weekly Budget</h4>
              <p className="text-xl font-bold text-blue-700">$${result.weeklyBudget.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Per shopping trip</p>
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
            <h4 className="font-medium text-gray-800">Recommended Budget Allocation</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Potential Savings</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">$${opp.savings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Total potential savings: <span className="font-bold text-green-700">$${result.potentialSavings.toFixed(0)}/month</span>
              </p>
              <p className="text-sm text-gray-600">
                Optimized monthly budget: <span className="font-bold text-blue-700">$${result.optimizedBudget.toFixed(0)}</span>
              </p>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Benchmark Comparison</h4>
            <p className="text-sm mt-1 text-blue-700">
              USDA moderate plan baseline: $${result.expectedBudget.toFixed(0)}/month for {numberOfPeople} people
            </p>
            <p className="text-sm text-blue-700">
              Diet-adjusted expected: $${result.dietAdjustedBudget.toFixed(0)}/month
            </p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Optimization Tips</h4>
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
        <p><strong>Note:</strong> USDA recommends $200-400/person/month depending on plan (thrifty to liberal). Meal planning reduces waste by 15%. Bulk buying saves 10-20% on staples. Weekly shopping reduces impulse purchases. Focus organic spending on Dirty Dozen items. Track spending weekly to stay on budget.</p>
      </div>
    </div>
  );
}