'use client';

import { useState, useMemo } from 'react';

export default function DiningOutBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('300');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  const [currentSpending, setCurrentSpending] = useState<string>('450');
  const [diningFrequency, setDiningFrequency] = useState<string>('weekly');
  const [averageMealCost, setAverageMealCost] = useState<string>('40');
  const [cookingAtHome, setCookingAtHome] = useState<string>('mostDays');
  const [deliveryFrequency, setDeliveryFrequency] = useState<string>('weekly');
  const [deliveryAverageCost, setDeliveryAverageCost] = useState<string>('35');
  const [coffeeFrequency, setCoffeeFrequency] = useState<string>('daily');
  const [coffeeCost, setCoffeeCost] = useState<string>('5');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const spending = parseFloat(currentSpending) || 0;
    const mealCost = parseFloat(averageMealCost) || 0;
    const deliveryCost = parseFloat(deliveryAverageCost) || 0;
    const coffeeC = parseFloat(coffeeCost) || 0;

    // Calculate frequency-based spending
    const diningFreqMap: Record<string, number> = { daily: 30, fewTimes: 12, weekly: 4, biweekly: 2, rarely: 1 };
    const deliveryFreqMap: Record<string, number> = { daily: 30, fewTimes: 8, weekly: 4, rarely: 1, never: 0 };
    const coffeeFreqMap: Record<string, number> = { daily: 30, fewTimes: 8, weekly: 4, rarely: 1, never: 0 };

    const diningTripsPerMonth = diningFreqMap[diningFrequency] || 4;
    const deliveryPerMonth = deliveryFreqMap[deliveryFrequency] || 4;
    const coffeePerMonth = coffeeFreqMap[coffeeFrequency] || 30;

    // Estimated actual spending
    const estimatedDiningOut = diningTripsPerMonth * mealCost;
    const estimatedDelivery = deliveryPerMonth * deliveryCost;
    const estimatedCoffee = coffeePerMonth * coffeeC;
    const estimatedTotal = estimatedDiningOut + estimatedDelivery + estimatedCoffee;

    // Budget variance
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;

    // Income percentage
    const spendingPercentOfIncome = income > 0 ? (spending / income) * 100 : 0;
    const budgetPercentOfIncome = income > 0 ? (budget / income) * 100 : 0;

    // Per person breakdown
    const perPersonBudget = budget / people;
    const perPersonSpending = spending / people;

    // Spending categories breakdown
    const categories = [
      { name: 'Restaurant Dining', amount: estimatedDiningOut, percent: (estimatedDiningOut / estimatedTotal) * 100 },
      { name: 'Food Delivery', amount: estimatedDelivery, percent: (estimatedDelivery / estimatedTotal) * 100 },
      { name: 'Coffee/Beverages', amount: estimatedCoffee, percent: (estimatedCoffee / estimatedTotal) * 100 }
    ];

    // Home cooking savings potential
    const homeCookingCost = mealCost * 0.3; // Home cooking is roughly 30% of restaurant cost
    const cookingSavings = estimatedDiningOut * 0.7; // 70% savings from cooking at home

    // Recommendations for reduction
    const reductionOpportunities: { action: string; savings: number; difficulty: string }[] = [];

    if (coffeeFrequency === 'daily' && coffeeC > 4) {
      reductionOpportunities.push({
        action: 'Make coffee at home instead of buying',
        savings: (coffeeC - 0.5) * 30, // Home coffee costs ~$0.50
        difficulty: 'Easy'
      });
    }

    if (deliveryFrequency === 'daily' || deliveryFrequency === 'fewTimes') {
      reductionOpportunities.push({
        action: 'Reduce delivery frequency',
        savings: deliveryCost * Math.floor(deliveryPerMonth / 2),
        difficulty: 'Medium'
      });
    }

    if (diningFrequency === 'daily' || diningFrequency === 'fewTimes') {
      reductionOpportunities.push({
        action: 'Cook more meals at home',
        savings: mealCost * Math.floor(diningTripsPerMonth / 2) * 0.7,
        difficulty: 'Medium'
      });
    }

    if (mealCost > 50) {
      reductionOpportunities.push({
        action: 'Choose less expensive restaurants',
        savings: (mealCost - 35) * diningTripsPerMonth,
        difficulty: 'Easy'
      });
    }

    const totalPotentialSavings = reductionOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - adjust spending habits');
    }

    if (spendingPercentOfIncome > 10) {
      recommendations.push('Dining spending exceeds 10% of income - typical guideline is 5-10%');
    }

    if (coffeePerMonth > 20 && coffeeC > 5) {
      recommendations.push('High coffee spending - making at home saves $${(coffeeC - 0.5) * 30 * 12}/year');
    }

    if (deliveryPerMonth > 8) {
      recommendations.push('Heavy delivery usage adds fees and markup - reduce frequency');
    }

    if (estimatedDiningOut > budget * 0.6) {
      recommendations.push('Restaurant dining dominates budget - balance with cooking at home');
    }

    if (cookingAtHome === 'rarely') {
      recommendations.push('Minimal home cooking - significant savings opportunity exists');
    }

    return {
      estimatedDiningOut,
      estimatedDelivery,
      estimatedCoffee,
      estimatedTotal,
      budgetVariance,
      isOverBudget,
      spendingPercentOfIncome,
      budgetPercentOfIncome,
      perPersonBudget,
      perPersonSpending,
      categories,
      reductionOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      spending,
      income,
      diningTripsPerMonth,
      deliveryPerMonth,
      coffeePerMonth
    };
  }, [monthlyBudget, monthlyIncome, numberOfPeople, currentSpending, diningFrequency, averageMealCost, cookingAtHome, deliveryFrequency, deliveryAverageCost, coffeeFrequency, coffeeCost]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dining Out Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Track and optimize dining, delivery, and beverage spending</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget &amp; Income</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Dining Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
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
              placeholder="450"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Cooking Frequency</label>
            <select
              value={cookingAtHome}
              onChange={(e) => setCookingAtHome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="mostDays">Most days</option>
              <option value="fewTimes">Few times per week</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Dining Habits</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Dining Frequency</label>
            <select
              value={diningFrequency}
              onChange={(e) => setDiningFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="fewTimes">Few times per week</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Every 2 weeks</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Meal Cost ($)</label>
            <input
              type="number"
              value={averageMealCost}
              onChange={(e) => setAverageMealCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Delivery Frequency</label>
            <select
              value={deliveryFrequency}
              onChange={(e) => setDeliveryFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="fewTimes">Few times per week</option>
              <option value="weekly">Weekly</option>
              <option value="rarely">Rarely</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Delivery Cost ($)</label>
            <input
              type="number"
              value={deliveryAverageCost}
              onChange={(e) => setDeliveryAverageCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="35"
            />
            <p className="text-xs text-gray-500 mt-1">Include food + delivery fees + tip</p>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Coffee/Beverages</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Frequency</label>
                <select
                  value={coffeeFrequency}
                  onChange={(e) => setCoffeeFrequency(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="fewTimes">Few times/week</option>
                  <option value="weekly">Weekly</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-700">Cost per ($)</label>
                <input
                  type="number"
                  value={coffeeCost}
                  onChange={(e) => setCoffeeCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Dining Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Budget vs Spending</h4>
              <p className={`text-xl font-bold ${result.isOverBudget ? 'text-red-700' : 'text-green-700'}`}>
                {result.isOverBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.isOverBudget ? 'Over budget' : 'Under budget'}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">% of Income</h4>
              <p className={`text-xl font-bold ${result.spendingPercentOfIncome > 10 ? 'text-red-700' : 'text-blue-700'}`}>
                {result.spendingPercentOfIncome.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">Recommended: 5-10%</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Person</h4>
              <p className="text-xl font-bold text-purple-700">$${result.perPersonSpending.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly dining per person</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Estimated Monthly Spending Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-orange-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Total Estimated: $${result.estimatedTotal.toFixed(0)}/month
            </p>
          </div>

          {result.reductionOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Savings Opportunities</h4>
              <div className="space-y-2 mt-2">
                {result.reductionOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-gray-600">{opp.action}</span>
                      <span className="text-xs text-gray-400 ml-2">({opp.difficulty})</span>
                    </div>
                    <span className="font-bold text-green-600">$${opp.savings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Total potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}/month</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Budget Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-orange-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Recommended dining budget is 5-10% of income. Home cooking costs roughly 30% of restaurant prices. Coffee shops charge 10x home brewing cost. Delivery adds 20-30% markup plus fees. Track monthly to identify patterns. Small changes compound significantly over time.</p>
      </div>
    </div>
  );
}