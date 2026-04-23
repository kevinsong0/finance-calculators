'use client';

import { useState, useMemo } from 'react';

export default function CollegeBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('800');
  const [tuition, setTuition] = useState<string>('0');
  const [financialAid, setFinancialAid] = useState<string>('5000');
  const [housingCost, setHousingCost] = useState<string>('500');
  const [housingType, setHousingType] = useState<string>('dorm');
  const [foodCost, setFoodCost] = useState<string>('250');
  const [foodPlan, setFoodPlan] = useState<string>('moderate');
  const [booksCost, setBooksCost] = useState<string>('100');
  const [transportation, setTransportation] = useState<string>('50');
  const [entertainment, setEntertainment] = useState<string>('100');
  const [supplies, setSupplies] = useState<string>('50');
  const [personal, setPersonal] = useState<string>('75');
  const [phoneInternet, setPhoneInternet] = useState<string>('80');
  const [laundry, setLaundry] = useState<string>('30');
  const [healthExpenses, setHealthExpenses] = useState<string>('25');
  const [partTimeIncome, setPartTimeIncome] = useState<string>('300');
  const [savingsGoal, setSavingsGoal] = useState<string>('0');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const tuitionAnnual = parseFloat(tuition) || 0;
    const aid = parseFloat(financialAid) || 0;
    const housing = parseFloat(housingCost) || 0;
    const food = parseFloat(foodCost) || 0;
    const books = parseFloat(booksCost) || 0;
    const trans = parseFloat(transportation) || 0;
    const ent = parseFloat(entertainment) || 0;
    const supp = parseFloat(supplies) || 0;
    const pers = parseFloat(personal) || 0;
    const phone = parseFloat(phoneInternet) || 0;
    const laundryC = parseFloat(laundry) || 0;
    const health = parseFloat(healthExpenses) || 0;
    const income = parseFloat(partTimeIncome) || 0;
    const savings = parseFloat(savingsGoal) || 0;

    // Monthly costs
    const monthlyHousing = housing;
    const monthlyFood = food;
    const monthlyBooks = books;
    const monthlyTrans = trans;
    const monthlyEnt = ent;
    const monthlySupplies = supp;
    const monthlyPersonal = pers;
    const monthlyPhone = phone;
    const monthlyLaundry = laundryC;
    const monthlyHealth = health;

    const totalMonthly = monthlyHousing + monthlyFood + monthlyBooks + monthlyTrans + monthlyEnt + monthlySupplies + monthlyPersonal + monthlyPhone + monthlyLaundry + monthlyHealth;
    const totalSemester = totalMonthly * 4.5; // Average semester length
    const totalAnnual = totalMonthly * 9; // Academic year (exclude summer)

    // With tuition
    const totalAnnualWithTuition = totalAnnual + tuitionAnnual;
    const netAnnual = totalAnnualWithTuition - aid - (income * 9);
    const netMonthly = netAnnual / 9;

    // Budget analysis
    const budgetVariance = budget - totalMonthly;
    const isOverBudget = totalMonthly > budget;
    const netBudgetVariance = income > 0 ? budget - (totalMonthly - income) : budgetVariance;

    // Category breakdown
    const categories = [
      { name: 'Housing', amount: monthlyHousing, percent: (monthlyHousing / totalMonthly) * 100 },
      { name: 'Food', amount: monthlyFood, percent: (monthlyFood / totalMonthly) * 100 },
      { name: 'Books/Supplies', amount: monthlyBooks + monthlySupplies, percent: ((monthlyBooks + monthlySupplies) / totalMonthly) * 100 },
      { name: 'Transportation', amount: monthlyTrans, percent: (monthlyTrans / totalMonthly) * 100 },
      { name: 'Entertainment', amount: monthlyEnt, percent: (monthlyEnt / totalMonthly) * 100 },
      { name: 'Phone/Internet', amount: monthlyPhone, percent: (monthlyPhone / totalMonthly) * 100 },
      { name: 'Personal/Laundry', amount: monthlyPersonal + monthlyLaundry, percent: ((monthlyPersonal + monthlyLaundry) / totalMonthly) * 100 },
      { name: 'Health', amount: monthlyHealth, percent: (monthlyHealth / totalMonthly) * 100 }
    ];

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (housingType === 'dorm' && housing > 600) {
      savingsOpportunities.push({ action: 'Consider off-campus apartment', savings: housing * 0.3 });
    }

    if (foodPlan === 'premium' || food > 300) {
      savingsOpportunities.push({ action: 'Reduce meal plan or cook more', savings: food * 0.2 });
    }

    if (books > 150) {
      savingsOpportunities.push({ action: 'Buy used books or use library', savings: books * 0.5 });
    }

    if (ent > 150) {
      savingsOpportunities.push({ action: 'Use free campus activities', savings: ent * 0.3 });
    }

    if (phone > 60) {
      savingsOpportunities.push({ action: 'Student phone plan discounts', savings: phone * 0.25 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - adjust spending');
    }

    if (netAnnual > 0 && income === 0) {
      recommendations.push('Consider part-time work to offset costs');
    }

    if (housing > totalMonthly * 0.4) {
      recommendations.push('Housing exceeds 40% of budget - explore alternatives');
    }

    if (books > 100 && savingsOpportunities.length === 0) {
      recommendations.push('Books eating budget - digital/used options available');
    }

    if (ent > totalMonthly * 0.15) {
      recommendations.push('High entertainment spending - use campus events');
    }

    return {
      totalMonthly,
      totalSemester,
      totalAnnual,
      totalAnnualWithTuition,
      netAnnual,
      netMonthly,
      budgetVariance,
      isOverBudget,
      netBudgetVariance,
      categories,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      tuitionAnnual,
      aid,
      income,
      savings
    };
  }, [monthlyBudget, tuition, financialAid, housingCost, housingType, foodCost, foodPlan, booksCost, transportation, entertainment, supplies, personal, phoneInternet, laundry, healthExpenses, partTimeIncome, savingsGoal]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">College Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan student expenses including housing, food, books, and financial aid</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Tuition & Financial Aid</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Tuition ($)</label>
            <input
              type="number"
              value={tuition}
              onChange={(e) => setTuition(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Include tuition and fees per year</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Financial Aid/Scholarships ($/yr)</label>
            <input
              type="number"
              value={financialAid}
              onChange={(e) => setFinancialAid(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Part-Time Income ($/mo)</label>
            <input
              type="number"
              value={partTimeIncome}
              onChange={(e) => setPartTimeIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="800"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Living Expenses</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Housing ($/mo)</label>
              <input
                type="number"
                value={housingCost}
                onChange={(e) => setHousingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Housing Type</label>
              <select
                value={housingType}
                onChange={(e) => setHousingType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="dorm">Dorm</option>
                <option value="apartment">Apartment</option>
                <option value="home">Living at Home</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food ($/mo)</label>
              <input
                type="number"
                value={foodCost}
                onChange={(e) => setFoodCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="250"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Plan</label>
              <select
                value={foodPlan}
                onChange={(e) => setFoodPlan(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="minimal">Minimal/Cook</option>
                <option value="moderate">Moderate</option>
                <option value="premium">Premium Plan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Books ($/mo)</label>
              <input
                type="number"
                value={booksCost}
                onChange={(e) => setBooksCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transportation ($/mo)</label>
              <input
                type="number"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entertainment</label>
              <input
                type="number"
                value={entertainment}
                onChange={(e) => setEntertainment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplies</label>
              <input
                type="number"
                value={supplies}
                onChange={(e) => setSupplies(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Personal</label>
              <input
                type="number"
                value={personal}
                onChange={(e) => setPersonal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="75"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone/Internet</label>
              <input
                type="number"
                value={phoneInternet}
                onChange={(e) => setPhoneInternet(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Laundry</label>
              <input
                type="number"
                value={laundry}
                onChange={(e) => setLaundry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health</label>
              <input
                type="number"
                value={healthExpenses}
                onChange={(e) => setHealthExpenses(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="25"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">College Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Living</h4>
              <p className="text-xl font-bold text-emerald-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Excluding tuition</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Semester Cost</h4>
              <p className="text-xl font-bold text-blue-700">$${result.totalSemester.toFixed(0)}</p>
              <p className="text-xs text-gray-500">4.5 months</p>
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
                    <span className="font-bold text-emerald-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.tuitionAnnual > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
              <h4 className="font-medium text-blue-800">Annual Financial Summary</h4>
              <p className="text-sm mt-1 text-blue-700">
                Total Annual: $${result.totalAnnualWithTuition.toFixed(0)} (Living: $${result.totalAnnual} + Tuition: $${result.tuitionAnnual})
              </p>
              <p className="text-sm text-blue-700">
                Financial Aid: $${result.aid} | Part-Time Income: $${result.income * 9}/year
              </p>
              <p className="text-sm font-medium text-blue-800">
                Net Annual Cost: $${result.netAnnual.toFixed(0)} | Net Monthly: $${result.netMonthly.toFixed(0)}
              </p>
            </div>
          )}

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Student Savings Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">$${opp.savings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}/month</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Student Budget Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-emerald-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Average student spends $800-1,200/month excluding tuition. Housing is typically 40-50% of living costs. Dorms average $500-800/month, apartments $600-1,000. Meal plans range $150-400/month. Books cost $300-600 per semester. Use student discounts, campus resources, and free activities. Part-time work ($300-600/mo) offsets costs significantly.</p>
      </div>
    </div>
  );
}