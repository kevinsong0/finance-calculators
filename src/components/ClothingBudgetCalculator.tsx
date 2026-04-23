'use client';

import { useState, useMemo } from 'react';

export default function ClothingBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('100');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('150');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  const [clothingFrequency, setClothingFrequency] = useState<string>('seasonal');
  const [qualityPreference, setQualityPreference] = useState<string>('midRange');
  const [workClothing, setWorkClothing] = useState<string>('business');
  const [specialOccasions, setSpecialOccasions] = useState<string>('2');
  const [avgItemCost, setAvgItemCost] = useState<string>('50');
  const [itemsPerPurchase, setItemsPerPurchase] = useState<string>('3');
  const [shoppingFrequency, setShoppingFrequency] = useState<string>('monthly');
  const [onlineVsStore, setOnlineVsStore] = useState<string>('mixed');
  const [seasonalBudgeting, setSeasonalBudgeting] = useState<string>('yes');
  const [salesUsage, setSalesUsage] = useState<string>('sometimes');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const occasions = parseFloat(specialOccasions) || 0;
    const itemCost = parseFloat(avgItemCost) || 0;
    const items = parseFloat(itemsPerPurchase) || 0;

    // Frequency multipliers
    const freqMap: Record<string, number> = { weekly: 4, monthly: 1, quarterly: 0.33, seasonal: 0.5, rarely: 0.1 };
    const purchasesPerMonth = freqMap[shoppingFrequency] || 1;

    // Calculate estimated spending
    const monthlyPurchases = purchasesPerMonth * items * itemCost;
    const specialOccasionCost = occasions * 200 / 12; // $200 per occasion annualized
    const workClothingCost = workClothing === 'professional' ? 50 : workClothing === 'business' ? 30 : 10;
    const perPersonCost = monthlyPurchases * people + workClothingCost;

    const totalMonthly = perPersonCost + specialOccasionCost;
    const totalAnnual = totalMonthly * 12;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;
    const perPersonBudget = budget / people;
    const perPersonSpending = spending / people;

    // Quality impact on cost
    const qualityMultipliers: Record<string, number> = { budget: 0.7, midRange: 1, premium: 1.5, luxury: 2.5 };
    const qualityMult = qualityMultipliers[qualityPreference] || 1;
    const adjustedCost = totalMonthly * qualityMult;

    // Seasonal breakdown
    const seasons = [
      { name: 'Spring', percent: 20, amount: totalAnnual * 0.20 },
      { name: 'Summer', percent: 20, amount: totalAnnual * 0.20 },
      { name: 'Fall', percent: 25, amount: totalAnnual * 0.25 },
      { name: 'Winter', percent: 25, amount: totalAnnual * 0.25 },
      { name: 'Special Occasions', percent: 10, amount: totalAnnual * 0.10 }
    ];

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (salesUsage === 'rarely') {
      savingsOpportunities.push({ action: 'Shop during sales (40% typical discount)', savings: spending * 0.15 });
    }

    if (qualityPreference === 'premium' || qualityPreference === 'luxury') {
      savingsOpportunities.push({ action: 'Mix quality levels - basics mid-range, special items premium', savings: spending * 0.2 });
    }

    if (onlineVsStore === 'store') {
      savingsOpportunities.push({ action: 'Compare online prices before in-store purchase', savings: spending * 0.1 });
    }

    if (shoppingFrequency === 'weekly') {
      savingsOpportunities.push({ action: 'Reduce frequency, shop with list', savings: spending * 0.2 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Wardrobe tracking
    const recommendedItems = {
      basics: 10,
      work: 5,
      casual: 8,
      formal: 2,
      seasonal: 4
    };

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - review purchase patterns');
    }

    if (percentOfIncome > 5) {
      recommendations.push('Clothing exceeds 5% of income - typical is 2-4%');
    }

    if (shoppingFrequency === 'weekly') {
      recommendations.push('Frequent shopping leads to impulse purchases - consolidate trips');
    }

    if (salesUsage === 'rarely') {
      recommendations.push('Missing sales opportunities - plan purchases around seasonal discounts');
    }

    if (perPersonSpending > 75) {
      recommendations.push('High per-person spending - consider capsule wardrobe approach');
    }

    return {
      totalMonthly,
      totalAnnual,
      adjustedCost,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      perPersonBudget,
      perPersonSpending,
      seasons,
      savingsOpportunities,
      totalPotentialSavings,
      recommendedItems,
      recommendations,
      budget,
      spending,
      people,
      qualityMult
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, numberOfPeople, clothingFrequency, qualityPreference, workClothing, specialOccasions, avgItemCost, itemsPerPurchase, shoppingFrequency, onlineVsStore, seasonalBudgeting, salesUsage]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Clothing Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan clothing expenses with seasonal budgeting and savings strategies</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Clothing Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Quality Preference</label>
            <select
              value={qualityPreference}
              onChange={(e) => setQualityPreference(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="budget">Budget/Value</option>
              <option value="midRange">Mid-Range</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Clothing Needs</label>
            <select
              value={workClothing}
              onChange={(e) => setWorkClothing(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="casual">Casual</option>
              <option value="business">Business Casual</option>
              <option value="professional">Professional/Business Formal</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Shopping Patterns</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shopping Frequency</label>
            <select
              value={shoppingFrequency}
              onChange={(e) => setShoppingFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Every 3 months</option>
              <option value="seasonal">Seasonal</option>
              <option value="rarely">Rarely/Need-based</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avg Item Cost ($)</label>
              <input
                type="number"
                value={avgItemCost}
                onChange={(e) => setAvgItemCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items per Purchase</label>
              <input
                type="number"
                value={itemsPerPurchase}
                onChange={(e) => setItemsPerPurchase(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Occasions/Year</label>
              <input
                type="number"
                value={specialOccasions}
                onChange={(e) => setSpecialOccasions(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sales Usage</label>
              <select
                value={salesUsage}
                onChange={(e) => setSalesUsage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="always">Always</option>
                <option value="sometimes">Sometimes</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shopping Method</label>
            <select
              value={onlineVsStore}
              onChange={(e) => setOnlineVsStore(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="online">Primarily Online</option>
              <option value="store">Primarily In-Store</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Clothing Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-pink-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.people} people</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Person</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.perPersonSpending.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly per person</p>
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
            <h4 className="font-medium text-gray-800">Seasonal Budget Allocation</h4>
            <div className="space-y-2 mt-2">
              {result.seasons.map((s, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{s.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-pink-600">$${s.amount.toFixed(0)}/yr</span>
                    <span className="text-xs text-gray-500 ml-1">({s.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Annual Total: $${result.totalAnnual.toFixed(0)}
            </p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Recommended Wardrobe Size</h4>
            <p className="text-sm mt-1 text-blue-700">
              Basics: {result.recommendedItems.basics} items | Work: {result.recommendedItems.work} | Casual: {result.recommendedItems.casual}
            </p>
            <p className="text-sm text-blue-700">
              Formal: {result.recommendedItems.formal} | Seasonal: {result.recommendedItems.seasonal}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Capsule approach: 30-40 quality items vs 100+ impulse purchases
            </p>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Savings Opportunities</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
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
              <h4 className="font-medium text-gray-800">Clothing Budget Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-pink-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Clothing should be 2-4% of income. Capsule wardrobes (30-40 versatile items) reduce waste. Shop end-of-season sales for best prices. Quality basics last longer than trendy fast fashion. Children need 50-100% more due to growth. Work attire needs separate budgeting. Thrift/resale offers 50-70% savings.</p>
      </div>
    </div>
  );
}