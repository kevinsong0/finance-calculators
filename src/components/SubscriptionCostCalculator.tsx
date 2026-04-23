'use client';

import { useState, useMemo } from 'react';

export default function SubscriptionCostCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('100');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [numberOfSubscriptions, setNumberOfSubscriptions] = useState<string>('8');
  const [currentSpending, setCurrentSpending] = useState<string>('150');
  const [streamingCount, setStreamingCount] = useState<string>('3');
  const [streamingAvgCost, setStreamingAvgCost] = useState<string>('12');
  const [musicCount, setMusicCount] = useState<string>('1');
  const [musicAvgCost, setMusicAvgCost] = useState<string>('10');
  const [gymCost, setGymCost] = useState<string>('50');
  const [softwareCount, setSoftwareCount] = useState<string>('2');
  const [softwareAvgCost, setSoftwareAvgCost] = useState<string>('15');
  const [cloudStorageCost, setCloudStorageCost] = useState<string>('10');
  const [newsMagazineCost, setNewsMagazineCost] = useState<string>('0');
  const [gamingCost, setGamingCost] = useState<string>('0');
  const [otherSubscriptions, setOtherSubscriptions] = useState<string>('0');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const streamCount = parseFloat(streamingCount) || 0;
    const streamCost = parseFloat(streamingAvgCost) || 0;
    const musicCnt = parseFloat(musicCount) || 0;
    const musicCst = parseFloat(musicAvgCost) || 0;
    const gym = parseFloat(gymCost) || 0;
    const softCount = parseFloat(softwareCount) || 0;
    const softCost = parseFloat(softwareAvgCost) || 0;
    const cloud = parseFloat(cloudStorageCost) || 0;
    const news = parseFloat(newsMagazineCost) || 0;
    const game = parseFloat(gamingCost) || 0;
    const other = parseFloat(otherSubscriptions) || 0;

    // Calculate category totals
    const streamingTotal = streamCount * streamCost;
    const musicTotal = musicCnt * musicCst;
    const softwareTotal = softCount * softCost;

    const estimatedMonthly = streamingTotal + musicTotal + gym + softwareTotal + cloud + news + game + other;
    const estimatedAnnual = estimatedMonthly * 12;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;

    // Category breakdown
    const categories = [
      { name: 'Streaming Services', amount: streamingTotal, count: streamCount },
      { name: 'Music Services', amount: musicTotal, count: musicCnt },
      { name: 'Gym/Fitness', amount: gym, count: gym > 0 ? 1 : 0 },
      { name: 'Software/Apps', amount: softwareTotal, count: softCount },
      { name: 'Cloud Storage', amount: cloud, count: cloud > 0 ? 1 : 0 },
      { name: 'News/Magazines', amount: news, count: news > 0 ? 1 : 0 },
      { name: 'Gaming', amount: game, count: game > 0 ? 1 : 0 },
      { name: 'Other', amount: other, count: other > 0 ? 1 : 0 }
    ].filter(c => c.amount > 0);

    // Duplicate detection
    const duplicateCheck: { service: string; issue: string }[] = [];
    if (streamCount > 3) {
      duplicateCheck.push({ service: 'Streaming', issue: 'Multiple streaming services - consider consolidating' });
    }
    if (musicCnt > 1) {
      duplicateCheck.push({ service: 'Music', issue: 'Multiple music subscriptions - you likely only need one' });
    }
    if (softCount > 3) {
      duplicateCheck.push({ service: 'Software', issue: 'Many software subscriptions - review usage frequency' });
    }

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number; difficulty: string }[] = [];

    if (streamCount > 2) {
      savingsOpportunities.push({
        action: 'Reduce streaming services to 1-2 platforms',
        savings: (streamCount - 2) * streamCost,
        difficulty: 'Easy'
      });
    }

    if (musicCnt > 1) {
      savingsOpportunities.push({
        action: 'Keep only one music subscription',
        savings: (musicCnt - 1) * musicCst,
        difficulty: 'Easy'
      });
    }

    if (gym > 0 && gym > 40) {
      savingsOpportunities.push({
        action: 'Consider budget gym or home workouts',
        savings: gym - 25,
        difficulty: 'Medium'
      });
    }

    if (cloud > 10) {
      savingsOpportunities.push({
        action: 'Use free storage options or consolidate',
        savings: cloud - 5,
        difficulty: 'Easy'
      });
    }

    if (news > 15) {
      savingsOpportunities.push({
        action: 'Use free news sources instead',
        savings: news,
        difficulty: 'Medium'
      });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - review and cancel unused subscriptions');
    }

    if (percentOfIncome > 3) {
      recommendations.push('Subscriptions exceed 3% of income - typical target is 1-2%');
    }

    if (estimatedAnnual > 1000) {
      recommendations.push('Annual subscription spending $${estimatedAnnual.toFixed(0)} - significant hidden cost');
    }

    if (duplicateCheck.length > 0) {
      recommendations.push('Potential overlapping subscriptions detected - review for duplicates');
    }

    if (streamCount > 3 && streamCost > 10) {
      recommendations.push('Multiple expensive streaming services - rotate subscriptions monthly');
    }

    return {
      estimatedMonthly,
      estimatedAnnual,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      categories,
      duplicateCheck,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      spending
    };
  }, [monthlyBudget, monthlyIncome, numberOfSubscriptions, currentSpending, streamingCount, streamingAvgCost, musicCount, musicAvgCost, gymCost, softwareCount, softwareAvgCost, cloudStorageCost, newsMagazineCost, gamingCost, otherSubscriptions]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Cost Calculator</h1>
      <p className="text-gray-600 mb-6">Track recurring subscriptions and find savings opportunities</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Subscription Budget ($)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Subscriptions</label>
            <input
              type="number"
              value={numberOfSubscriptions}
              onChange={(e) => setNumberOfSubscriptions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="8"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Subscription Categories</h3>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Streaming Services</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Number</label>
                <input
                  type="number"
                  value={streamingCount}
                  onChange={(e) => setStreamingCount(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Avg Cost ($)</label>
                <input
                  type="number"
                  value={streamingAvgCost}
                  onChange={(e) => setStreamingAvgCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="12"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Music Services ($/mo)</label>
              <input
                type="number"
                value={parseFloat(musicCount) * parseFloat(musicAvgCost) || 0}
                onChange={(e) => setMusicCount(e.target.value ? '1' : '0')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gym/Fitness ($/mo)</label>
              <input
                type="number"
                value={gymCost}
                onChange={(e) => setGymCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Software/Apps ($/mo)</label>
              <input
                type="number"
                value={parseFloat(softwareCount) * parseFloat(softwareAvgCost) || 0}
                onChange={(e) => setSoftwareCount(e.target.value ? '1' : '0')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Storage ($/mo)</label>
              <input
                type="number"
                value={cloudStorageCost}
                onChange={(e) => setCloudStorageCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">News/Magazines</label>
              <input
                type="number"
                value={newsMagazineCost}
                onChange={(e) => setNewsMagazineCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gaming</label>
              <input
                type="number"
                value={gamingCost}
                onChange={(e) => setGamingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other</label>
              <input
                type="number"
                value={otherSubscriptions}
                onChange={(e) => setOtherSubscriptions(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Subscription Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.estimatedMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Estimated monthly</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Annual Cost</h4>
              <p className="text-xl font-bold text-purple-700">$${result.estimatedAnnual.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Hidden annual expense</p>
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
                  <span className="text-gray-600">{cat.name} ({cat.count})</span>
                  <span className="font-bold text-indigo-600">$${cat.amount.toFixed(0)}/mo</span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Total: $${result.estimatedMonthly.toFixed(0)}/month | $${result.estimatedAnnual.toFixed(0)}/year
            </p>
          </div>

          {result.duplicateCheck.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-4">
              <h4 className="font-medium text-yellow-800">Duplicate Detection</h4>
              <ul className="mt-2 space-y-1">
                {result.duplicateCheck.map((dup, i) => (
                  <li key={i} className="text-sm text-yellow-700">⚠️ {dup.service}: {dup.issue}</li>
                ))}
              </ul>
            </div>
          )}

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Savings Opportunities</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
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
                <span className="text-gray-500 ml-1">($${result.totalPotentialSavings * 12}/year)</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Subscription Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-indigo-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Subscription creep is a common budget leak. Average household has 8-12 subscriptions totaling $200-300/month. Review quarterly for unused services. Rotate streaming subscriptions instead of keeping multiple active. Use free alternatives where possible. Annual costs are often underestimated - $15/month becomes $180/year.</p>
      </div>
    </div>
  );
}