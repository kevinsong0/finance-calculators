'use client';

import { useState, useMemo } from 'react';

export default function HolidayBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('300');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('400');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('4');
  const [numberOfGifts, setNumberOfGifts] = useState<string>('15');
  const [avgGiftCost, setAvgGiftCost] = useState<string>('40');
  const [hostingCosts, setHostingCosts] = useState<string>('200');
  const [travelCosts, setTravelCosts] = useState<string>('300');
  const [decorations, setDecorations] = useState<string>('100');
  const [foodDrinks, setFoodDrinks] = useState<string>('150');
  const [entertainmentEvents, setEntertainmentEvents] = useState<string>('100');
  const [newClothes, setNewClothes] = useState<string>('75');
  const [charitableGiving, setCharitableGiving] = useState<string>('50');
  const [postHolidaySavings, setPostHolidaySavings] = useState<string>('0');
  const [holidayType, setHolidayType] = useState<string>('standard');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const gifts = parseFloat(numberOfGifts) || 0;
    const giftCost = parseFloat(avgGiftCost) || 0;
    const hosting = parseFloat(hostingCosts) || 0;
    const travel = parseFloat(travelCosts) || 0;
    const decor = parseFloat(decorations) || 0;
    const food = parseFloat(foodDrinks) || 0;
    const events = parseFloat(entertainmentEvents) || 0;
    const clothes = parseFloat(newClothes) || 0;
    const charity = parseFloat(charitableGiving) || 0;
    const postSavings = parseFloat(postHolidaySavings) || 0;

    // Total holiday spending
    const totalGifts = gifts * giftCost;
    const totalHoliday = totalGifts + hosting + travel + decor + food + events + clothes + charity;

    // Monthly average (spread over 12 months for planning)
    const monthlyAverage = totalHoliday / 12;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;

    // Per person cost
    const perPersonGift = totalGifts / people;
    const perPersonTotal = totalHoliday / people;

    // Category breakdown
    const categories = [
      { name: 'Gifts', amount: totalGifts, percent: (totalGifts / totalHoliday) * 100 },
      { name: 'Hosting', amount: hosting, percent: (hosting / totalHoliday) * 100 },
      { name: 'Travel', amount: travel, percent: (travel / totalHoliday) * 100 },
      { name: 'Decorations', amount: decor, percent: (decor / totalHoliday) * 100 },
      { name: 'Food/Drinks', amount: food, percent: (food / totalHoliday) * 100 },
      { name: 'Events', amount: events, percent: (events / totalHoliday) * 100 },
      { name: 'New Clothes', amount: clothes, percent: (clothes / totalHoliday) * 100 },
      { name: 'Charity', amount: charity, percent: (charity / totalHoliday) * 100 }
    ].filter(c => c.amount > 0);

    // Holiday type baseline
    const baselines: Record<string, number> = { minimal: 400, standard: 800, generous: 1500, extravagant: 2500 };
    const baseline = baselines[holidayType] || 800;

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (giftCost > 50) {
      savingsOpportunities.push({ action: 'Reduce average gift cost', savings: (giftCost - 40) * gifts });
    }

    if (hosting > 250) {
      savingsOpportunities.push({ action: 'Potluck or shared hosting', savings: hosting * 0.3 });
    }

    if (decor > 100) {
      savingsOpportunities.push({ action: 'Reuse decorations from previous years', savings: decor * 0.5 });
    }

    if (clothes > 50) {
      savingsOpportunities.push({ action: 'Shop sales or skip new clothes', savings: clothes * 0.4 });
    }

    if (events > 100) {
      savingsOpportunities.push({ action: 'Free community events', savings: events * 0.3 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - prioritize categories');
    }

    if (totalGifts > totalHoliday * 0.5) {
      recommendations.push('Gifts dominate budget - consider experience gifts or limits');
    }

    if (percentOfIncome > 15) {
      recommendations.push('Holiday spending exceeds 15% of monthly income - plan earlier');
    }

    if (gifts > 20) {
      recommendations.push('Many gifts - consider group gifts or family limits');
    }

    if (travel > 500) {
      recommendations.push('High travel costs - compare booking options early');
    }

    // Monthly saving plan
    const monthlySavingGoal = totalHoliday / 10; // Save over 10 months before holiday

    return {
      totalHoliday,
      monthlyAverage,
      totalGifts,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      perPersonGift,
      perPersonTotal,
      categories,
      baseline,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      monthlySavingGoal,
      budget,
      spending,
      people,
      gifts,
      giftCost
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, numberOfPeople, numberOfGifts, avgGiftCost, hostingCosts, travelCosts, decorations, foodDrinks, entertainmentEvents, newClothes, charitableGiving, postHolidaySavings, holidayType]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Holiday Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan seasonal spending for gifts, hosting, travel, and celebrations</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Holiday Budget ($)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Spending Estimate ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Family Members</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Style</label>
            <select
              value={holidayType}
              onChange={(e) => setHolidayType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimal">Minimal (~$400)</option>
              <option value="standard">Standard (~$800)</option>
              <option value="generous">Generous (~$1,500)</option>
              <option value="extravagant">Extravagant (~$2,500)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Holiday Expenses</h3>

          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Gifts</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Number of gifts</label>
                <input
                  type="number"
                  value={numberOfGifts}
                  onChange={(e) => setNumberOfGifts(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Avg cost ($)</label>
                <input
                  type="number"
                  value={avgGiftCost}
                  onChange={(e) => setAvgGiftCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="40"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hosting ($)</label>
              <input
                type="number"
                value={hostingCosts}
                onChange={(e) => setHostingCosts(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel ($)</label>
              <input
                type="number"
                value={travelCosts}
                onChange={(e) => setTravelCosts(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Decorations ($)</label>
              <input
                type="number"
                value={decorations}
                onChange={(e) => setDecorations(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food/Drinks ($)</label>
              <input
                type="number"
                value={foodDrinks}
                onChange={(e) => setFoodDrinks(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="150"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Events</label>
              <input
                type="number"
                value={entertainmentEvents}
                onChange={(e) => setEntertainmentEvents(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Clothes</label>
              <input
                type="number"
                value={newClothes}
                onChange={(e) => setNewClothes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="75"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Charity</label>
              <input
                type="number"
                value={charitableGiving}
                onChange={(e) => setCharitableGiving(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Holiday Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Season</h4>
              <p className="text-xl font-bold text-red-700">$${result.totalHoliday.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.people} family members</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Average</h4>
              <p className="text-xl font-bold text-blue-700">$${result.monthlyAverage.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Spread over 12 months</p>
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
            <h4 className="font-medium text-gray-800">Expense Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-red-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Gifts: $${result.totalGifts.toFixed(0)} ({result.gifts} gifts @ $${result.giftCost})
            </p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
            <h4 className="font-medium text-green-800">Saving Plan</h4>
            <p className="text-sm mt-1 text-green-700">
              Save $${result.monthlySavingGoal.toFixed(0)}/month for 10 months before holiday season
            </p>
            <p className="text-sm text-green-700">
              Baseline for {holidayType} style: $${result.baseline}
            </p>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Cost Reduction Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">-$${opp.savings.toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Holiday Budget Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-red-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Average holiday spending is $800-1,500 per household. Gifts typically consume 40-60% of budget. Plan early - start saving 10 months before. Set gift limits with family. Shop early for deals. Reuse decorations. Compare travel costs. Consider experience gifts. Charitable giving has tax benefits. Post-holiday sales offer savings.</p>
      </div>
    </div>
  );
}