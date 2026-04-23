'use client';

import { useState, useMemo } from 'react';

export default function EntertainmentBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('150');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('200');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  const [entertainmentStyle, setEntertainmentStyle] = useState<string>('balanced');
  const [movieFrequency, setMovieFrequency] = useState<string>('monthly');
  const [movieCost, setMovieCost] = useState<string>('30');
  const [concertFrequency, setConcertFrequency] = useState<string>('quarterly');
  const [concertCost, setConcertCost] = useState<string>('100');
  const [diningOutCost, setDiningOutCost] = useState<string>('80');
  const [streamingServices, setStreamingServices] = useState<string>('45');
  const [gamingCost, setGamingCost] = useState<string>('20');
  const [sportsEventsCost, setSportsEventsCost] = useState<string>('0');
  const [hobbiesCost, setHobbiesCost] = useState<string>('50');
  const [otherEntertainment, setOtherEntertainment] = useState<string>('0');
  const [savingGoal, setSavingGoal] = useState<string>('none');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const people = parseFloat(numberOfPeople) || 1;
    const movieC = parseFloat(movieCost) || 0;
    const concertC = parseFloat(concertCost) || 0;
    const dining = parseFloat(diningOutCost) || 0;
    const streaming = parseFloat(streamingServices) || 0;
    const gaming = parseFloat(gamingCost) || 0;
    const sports = parseFloat(sportsEventsCost) || 0;
    const hobbies = parseFloat(hobbiesCost) || 0;
    const other = parseFloat(otherEntertainment) || 0;

    // Frequency multipliers
    const movieFreqMap: Record<string, number> = { weekly: 4, monthly: 1, quarterly: 0.33, rarely: 0.1 };
    const concertFreqMap: Record<string, number> = { monthly: 1, quarterly: 0.33, annually: 0.08, rarely: 0.05 };

    const moviePerMonth = movieC * (movieFreqMap[movieFrequency] || 1);
    const concertPerMonth = concertC * (concertFreqMap[concertFrequency] || 0.33);

    // Total monthly
    const totalMonthly = moviePerMonth + concertPerMonth + dining + streaming + gaming + sports + hobbies + other;
    const totalAnnual = totalMonthly * 12;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;
    const perPersonCost = totalMonthly / people;

    // Category breakdown
    const categories = [
      { name: 'Movies', amount: moviePerMonth, percent: (moviePerMonth / totalMonthly) * 100 },
      { name: 'Concerts/Events', amount: concertPerMonth, percent: (concertPerMonth / totalMonthly) * 100 },
      { name: 'Dining Out', amount: dining, percent: (dining / totalMonthly) * 100 },
      { name: 'Streaming', amount: streaming, percent: (streaming / totalMonthly) * 100 },
      { name: 'Gaming', amount: gaming, percent: (gaming / totalMonthly) * 100 },
      { name: 'Sports Events', amount: sports, percent: (sports / totalMonthly) * 100 },
      { name: 'Hobbies', amount: hobbies, percent: (hobbies / totalMonthly) * 100 },
      { name: 'Other', amount: other, percent: (other / totalMonthly) * 100 }
    ].filter(c => c.amount > 0);

    // Entertainment style baseline
    const styleBaselines: Record<string, number> = {
      minimal: 50,
      balanced: 150,
      active: 250,
      premium: 400
    };
    const baseline = styleBaselines[entertainmentStyle] || 150;

    // Value analysis - cost per entertainment hour estimate
    const estimatedHoursPerMonth = 30; // Rough estimate
    const costPerHour = totalMonthly / estimatedHoursPerMonth;

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (streaming > 40) {
      savingsOpportunities.push({ action: 'Rotate streaming subscriptions', savings: streaming * 0.4 });
    }

    if (moviePerMonth > 60) {
      savingsOpportunities.push({ action: 'Use discount movie days or streaming', savings: moviePerMonth * 0.3 });
    }

    if (dining > 100) {
      savingsOpportunities.push({ action: 'Balance dining with home entertainment', savings: dining * 0.2 });
    }

    if (concertPerMonth > 50) {
      savingsOpportunities.push({ action: 'Mix free events with paid concerts', savings: concertPerMonth * 0.25 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Free alternatives
    const freeAlternatives = [
      'Free community events',
      'Public parks and hiking',
      'Library programs',
      'Free museum days',
      'Community sports leagues',
      'Home game nights'
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - balance entertainment mix');
    }

    if (percentOfIncome > 5) {
      recommendations.push('Entertainment exceeds 5% of income - typical is 2-4%');
    }

    if (streaming > dining) {
      recommendations.push('Streaming exceeds dining - consider reallocation');
    }

    if (categories.length > 5) {
      recommendations.push('Many entertainment categories - focus on favorites');
    }

    if (savingGoal !== 'none' && totalMonthly > baseline) {
      recommendations.push('Entertainment spending could fund savings goal');
    }

    return {
      totalMonthly,
      totalAnnual,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      perPersonCost,
      categories,
      baseline,
      costPerHour,
      savingsOpportunities,
      totalPotentialSavings,
      freeAlternatives,
      recommendations,
      budget,
      spending,
      people
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, numberOfPeople, entertainmentStyle, movieFrequency, movieCost, concertFrequency, concertCost, diningOutCost, streamingServices, gamingCost, sportsEventsCost, hobbiesCost, otherEntertainment, savingGoal]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Entertainment Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan entertainment spending with free alternatives and savings opportunities</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Entertainment Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
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
              placeholder="200"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Entertainment Style</label>
            <select
              value={entertainmentStyle}
              onChange={(e) => setEntertainmentStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimal">Minimal ($50 baseline)</option>
              <option value="balanced">Balanced ($150 baseline)</option>
              <option value="active">Active ($250 baseline)</option>
              <option value="premium">Premium ($400 baseline)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Savings Goal Priority</label>
            <select
              value={savingGoal}
              onChange={(e) => setSavingGoal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None - Focus on entertainment</option>
              <option value="moderate">Moderate - Balance entertainment</option>
              <option value="high">High - Minimize entertainment</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Entertainment Categories</h3>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Movie Frequency</label>
              <select
                value={movieFrequency}
                onChange={(e) => setMovieFrequency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Every 3 months</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Movie Cost ($)</label>
              <input
                type="number"
                value={movieCost}
                onChange={(e) => setMovieCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concert Frequency</label>
              <select
                value={concertFrequency}
                onChange={(e) => setConcertFrequency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concert Cost ($)</label>
              <input
                type="number"
                value={concertCost}
                onChange={(e) => setConcertCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dining Out ($/mo)</label>
              <input
                type="number"
                value={diningOutCost}
                onChange={(e) => setDiningOutCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Streaming ($/mo)</label>
              <input
                type="number"
                value={streamingServices}
                onChange={(e) => setStreamingServices(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="45"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gaming</label>
              <input
                type="number"
                value={gamingCost}
                onChange={(e) => setGamingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sports Events</label>
              <input
                type="number"
                value={sportsEventsCost}
                onChange={(e) => setSportsEventsCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies</label>
              <input
                type="number"
                value={hobbiesCost}
                onChange={(e) => setHobbiesCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Entertainment ($/mo)</label>
            <input
              type="number"
              value={otherEntertainment}
              onChange={(e) => setOtherEntertainment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-fuchsia-50 border border-fuchsia-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Entertainment Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-fuchsia-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.people} people</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Person</h4>
              <p className="text-xl font-bold text-purple-700">$${result.perPersonCost.toFixed(0)}</p>
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
            <h4 className="font-medium text-gray-800">Category Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-fuchsia-600">$${cat.amount.toFixed(0)}/mo</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Annual: $${result.totalAnnual.toFixed(0)} | Baseline: $${result.baseline}/mo
            </p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
            <h4 className="font-medium text-green-800">Free Alternatives</h4>
            <ul className="mt-2 space-y-1">
              {result.freeAlternatives.slice(0, 4).map((alt, i) => (
                <li key={i} className="text-sm text-green-700">✓ {alt}</li>
              ))}
            </ul>
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
                Potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}/month</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Entertainment Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-fuchsia-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Entertainment should be 2-4% of income. Balance paid and free activities. Streaming services average $45/month - rotate subscriptions. Movie theaters offer discount days. Free community events provide entertainment value. Mix dining with home-cooked meals. Gaming subscriptions add up. Budget for concerts and events separately.</p>
      </div>
    </div>
  );
}