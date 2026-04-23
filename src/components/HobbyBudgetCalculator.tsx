'use client';

import { useState, useMemo } from 'react';

export default function HobbyBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('200');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('250');
  const [hobbyType, setHobbyType] = useState<string>('mixed');
  const [numberOfHobbies, setNumberOfHobbies] = useState<string>('3');
  const [equipmentCost, setEquipmentCost] = useState<string>('500');
  const [monthlySupplies, setMonthlySupplies] = useState<string>('50');
  const [lessonCost, setLessonCost] = useState<string>('100');
  const [membershipCost, setMembershipCost] = useState<string>('30');
  const [travelCost, setTravelCost] = useState<string>('0');
  const [competitionCost, setCompetitionCost] = useState<string>('0');
  const [timePerWeek, setTimePerWeek] = useState<string>('10');
  const [goalType, setGoalType] = useState<string>('enjoyment');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const equipment = parseFloat(equipmentCost) || 0;
    const supplies = parseFloat(monthlySupplies) || 0;
    const lessons = parseFloat(lessonCost) || 0;
    const membership = parseFloat(membershipCost) || 0;
    const travel = parseFloat(travelCost) || 0;
    const competition = parseFloat(competitionCost) || 0;
    const time = parseFloat(timePerWeek) || 0;
    const hobbies = parseFloat(numberOfHobbies) || 1;

    // Monthly costs
    const monthlyEquipment = equipment / 12; // Annualized
    const monthlyLessons = lessons;
    const monthlyMembership = membership;
    const monthlyTravel = travel;
    const monthlyCompetition = competition / 12; // Annualized

    const totalMonthly = supplies + monthlyEquipment + monthlyLessons + monthlyMembership + monthlyTravel + monthlyCompetition;
    const totalAnnual = totalMonthly * 12 + equipment + competition;

    // Time value (hourly rate based on income)
    const hourlyRate = income / 160; // Assuming 160 work hours per month
    const timeValueMonthly = time * hourlyRate * 4; // Weekly hours * 4 weeks

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;

    // Cost per hour of hobby time
    const costPerHour = time > 0 ? totalMonthly / (time * 4) : 0;

    // Category breakdown
    const categories = [
      { name: 'Supplies', amount: supplies, percent: (supplies / totalMonthly) * 100 },
      { name: 'Equipment', amount: monthlyEquipment, percent: (monthlyEquipment / totalMonthly) * 100 },
      { name: 'Lessons/Training', amount: lessons, percent: (lessons / totalMonthly) * 100 },
      { name: 'Membership', amount: membership, percent: (membership / totalMonthly) * 100 },
      { name: 'Travel/Events', amount: travel, percent: (travel / totalMonthly) * 100 },
      { name: 'Competitions', amount: monthlyCompetition, percent: (monthlyCompetition / totalMonthly) * 100 }
    ].filter(c => c.amount > 0);

    // ROI calculation (enjoyment value vs cost)
    const enjoymentROI = time > 0 ? (timeValueMonthly / spending) : 0;

    // Hobby type baseline costs
    const hobbyBaselines: Record<string, { low: number; medium: number; high: number }> = {
      reading: { low: 20, medium: 50, high: 100 },
      gaming: { low: 30, medium: 100, high: 200 },
      fitness: { low: 50, medium: 150, high: 300 },
      photography: { low: 100, medium: 300, high: 500 },
      music: { low: 50, medium: 150, high: 400 },
      gardening: { low: 30, medium: 80, high: 150 },
      cooking: { low: 50, medium: 150, high: 300 },
      crafts: { low: 30, medium: 100, high: 200 },
      sports: { low: 50, medium: 200, high: 500 },
      travel: { low: 200, medium: 500, high: 1500 },
      mixed: { low: 50, medium: 150, high: 400 }
    };
    const baseline = hobbyBaselines[hobbyType] || hobbyBaselines.mixed;

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - review spending priorities');
    }

    if (percentOfIncome > 5) {
      recommendations.push('Hobby spending exceeds 5% of income - typical is 2-4%');
    }

    if (hobbies > 3) {
      recommendations.push('Many hobbies may dilute focus - consider specializing');
    }

    if (costPerHour > hourlyRate) {
      recommendations.push('Cost per hobby hour exceeds your hourly wage - consider alternatives');
    }

    if (equipment > 1000 && lessons === 0) {
      recommendations.push('High equipment investment without training - consider lessons');
    }

    if (time < 2) {
      recommendations.push('Limited hobby time - investment may not justify cost');
    }

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (lessons > 100) {
      savingsOpportunities.push({ action: 'Try online tutorials or self-learning', savings: lessons * 0.5 });
    }

    if (membership > 50) {
      savingsOpportunities.push({ action: 'Compare membership options', savings: membership * 0.3 });
    }

    if (equipment > 500) {
      savingsOpportunities.push({ action: 'Buy used equipment or wait for sales', savings: equipment * 0.2 / 12 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    return {
      totalMonthly,
      totalAnnual,
      timeValueMonthly,
      costPerHour,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      categories,
      enjoymentROI,
      baseline,
      recommendations,
      savingsOpportunities,
      totalPotentialSavings,
      budget,
      spending,
      time,
      hourlyRate
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, hobbyType, numberOfHobbies, equipmentCost, monthlySupplies, lessonCost, membershipCost, travelCost, competitionCost, timePerWeek, goalType]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Hobby Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Balance hobby spending with enjoyment value and budget goals</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Hobby Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="200"
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
              placeholder="250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Hobby Type</label>
            <select
              value={hobbyType}
              onChange={(e) => setHobbyType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="mixed">Mixed/Multiple</option>
              <option value="reading">Reading</option>
              <option value="gaming">Gaming</option>
              <option value="fitness">Fitness/Sports</option>
              <option value="photography">Photography</option>
              <option value="music">Music</option>
              <option value="gardening">Gardening</option>
              <option value="cooking">Cooking</option>
              <option value="crafts">Crafts/Arts</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Active Hobbies</label>
            <input
              type="number"
              value={numberOfHobbies}
              onChange={(e) => setNumberOfHobbies(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Spent per Week (hours)</label>
            <input
              type="number"
              value={timePerWeek}
              onChange={(e) => setTimePerWeek(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Hobby Expenses</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Supplies ($)</label>
              <input
                type="number"
                value={monthlySupplies}
                onChange={(e) => setMonthlySupplies(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment (Annual $)</label>
              <input
                type="number"
                value={equipmentCost}
                onChange={(e) => setEquipmentCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lessons/Training ($/mo)</label>
              <input
                type="number"
                value={lessonCost}
                onChange={(e) => setLessonCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Membership ($/mo)</label>
              <input
                type="number"
                value={membershipCost}
                onChange={(e) => setMembershipCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel/Events ($/mo)</label>
              <input
                type="number"
                value={travelCost}
                onChange={(e) => setTravelCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Competitions (Annual $)</label>
              <input
                type="number"
                value={competitionCost}
                onChange={(e) => setCompetitionCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hobby Goal</label>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="enjoyment">Pure Enjoyment</option>
              <option value="skill">Skill Development</option>
              <option value="competition">Competition/Performance</option>
              <option value="social">Social Connection</option>
              <option value="health">Health/Wellness</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Hobby Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-purple-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Equipment annualized</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Cost per Hour</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.costPerHour.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{result.time} hrs/week</p>
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
                    <span className="font-bold text-purple-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Annual Total: $${result.totalAnnual.toFixed(0)}
            </p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Value Analysis</h4>
            <p className="text-sm mt-1 text-blue-700">
              Your hourly rate: $${result.hourlyRate.toFixed(2)}/hr
            </p>
            <p className="text-sm text-blue-700">
              Time value invested: $${result.timeValueMonthly.toFixed(0)}/month
            </p>
            <p className="text-sm text-blue-700">
              Enjoyment ROI: {result.enjoymentROI.toFixed(2)}x (time value vs spending)
            </p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
            <h4 className="font-medium text-green-800">Typical Range for {hobbyType}</h4>
            <p className="text-sm mt-1 text-green-700">
              Low: $${result.baseline.low}/mo | Medium: $${result.baseline.medium}/mo | High: $${result.baseline.high}/mo
            </p>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Savings Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">$${opp.savings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Hobby Budget Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-purple-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Hobbies should enhance life quality, not stress finances. Typical hobby spending is 2-4% of income. Consider both monetary cost and time investment. Low-cost hobbies (reading, hiking) offer great value. Equipment-heavy hobbies require careful budgeting. Balance enjoyment value with actual cost.</p>
      </div>
    </div>
  );
}