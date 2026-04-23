'use client';

import { useState, useMemo } from 'react';

export default function SavingsBucketsAllocatorCalculator() {
  const [totalSavings, setTotalSavings] = useState<string>('1000');
  const [shortTermGoal, setShortTermGoal] = useState<string>('2000');
  const [mediumTermGoal, setMediumTermGoal] = useState<string>('10000');
  const [longTermGoal, setLongTermGoal] = useState<string>('50000');
  const [emergencyGoal, setEmergencyGoal] = useState<string>('18000');
  const [retirementGoal, setRetirementGoal] = useState<string>('500000');
  const [shortTermPriority, setShortTermPriority] = useState<string>('medium');
  const [mediumTermPriority, setMediumTermPriority] = useState<string>('high');
  const [emergencyPriority, setEmergencyPriority] = useState<string>('critical');
  const [retirementPriority, setRetirementPriority] = useState<string>('medium');

  const result = useMemo(() => {
    const total = parseFloat(totalSavings) || 0;
    const shortGoal = parseFloat(shortTermGoal) || 0;
    const mediumGoal = parseFloat(mediumTermGoal) || 0;
    const longGoal = parseFloat(longTermGoal) || 0;
    const emergencyGoalVal = parseFloat(emergencyGoal) || 0;
    const retirementGoalVal = parseFloat(retirementGoal) || 0;

    // Define buckets with priorities
    const buckets = [
      { name: 'Emergency Fund', goal: emergencyGoalVal, priority: emergencyPriority, type: 'security', color: 'bg-red-500' },
      { name: 'Short-Term Goals', goal: shortGoal, priority: shortTermPriority, type: 'near-term', color: 'bg-yellow-500' },
      { name: 'Medium-Term Goals', goal: mediumGoal, priority: mediumTermPriority, type: 'planned', color: 'bg-blue-500' },
      { name: 'Long-Term Goals', goal: longGoal, priority: 'low', type: 'future', color: 'bg-purple-500' },
      { name: 'Retirement', goal: retirementGoalVal, priority: retirementPriority, type: 'retirement', color: 'bg-green-500' }
    ].filter(b => b.goal > 0);

    // Priority weights
    const priorityWeights: Record<string, number> = {
      critical: 10,
      high: 7,
      medium: 4,
      low: 1
    };

    // Calculate weighted allocation
    const totalWeight = buckets.reduce((sum, b) => sum + priorityWeights[b.priority], 0);

    // First pass: weighted allocation
    const weightedAllocations = buckets.map(b => ({
      ...b,
      allocated: (total * priorityWeights[b.priority]) / totalWeight,
      percentAllocated: (priorityWeights[b.priority] / totalWeight) * 100
    }));

    // Check if any bucket exceeds its goal
    let remaining = total;
    const finalAllocations = weightedAllocations.map(b => {
      const cappedAmount = Math.min(b.allocated, b.goal);
      remaining -= cappedAmount;
      return {
        ...b,
        allocated: cappedAmount,
        remainingGoal: b.goal - cappedAmount,
        progress: b.goal > 0 ? (cappedAmount / b.goal) * 100 : 0
      };
    });

    // Reallocate excess to incomplete buckets by priority
    if (remaining > 0) {
      const incompleteBuckets = finalAllocations.filter(b => b.remainingGoal > 0);
      incompleteBuckets.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);

      incompleteBuckets.forEach(b => {
        const additional = Math.min(remaining, b.remainingGoal);
        b.allocated += additional;
        b.remainingGoal -= additional;
        b.progress = b.goal > 0 ? (b.allocated / b.goal) * 100 : 0;
        remaining -= additional;
      });
    }

    const totalAllocated = finalAllocations.reduce((sum, b) => sum + b.allocated, 0);
    const unallocated = Math.max(0, total - totalAllocated);

    // Progress summary
    const overallProgress = buckets.reduce((sum, b) => {
      const bucket = finalAllocations.find(fb => fb.name === b.name);
      return sum + (bucket ? bucket.progress * (b.goal / buckets.reduce((s, bb) => s + bb.goal, 0)) : 0);
    }, 0);

    // Recommendations
    const recommendations: string[] = [];

    const emergencyBucket = finalAllocations.find(b => b.name === 'Emergency Fund');
    if (emergencyBucket && emergencyBucket.progress < 100 && emergencyPriority !== 'critical') {
      recommendations.push('Emergency fund incomplete - consider setting priority to critical');
    }

    const retirementBucket = finalAllocations.find(b => b.name === 'Retirement');
    if (retirementBucket && retirementBucket.progress < 50) {
      recommendations.push('Retirement under 50% - increase contributions for long-term security');
    }

    if (shortGoal > total * 0.5) {
      recommendations.push('Short-term goal exceeds half of savings - may delay other priorities');
    }

    if (unallocated > 0) {
      recommendations.push('$${unallocated.toFixed(0)} unallocated - redistribute to incomplete goals');
    }

    const criticalIncomplete = finalAllocations.filter(b => b.priority === 'critical' && b.progress < 100);
    if (criticalIncomplete.length > 0) {
      recommendations.push('Critical priority goals incomplete - focus savings here first');
    }

    return {
      allocations: finalAllocations,
      totalAllocated,
      unallocated,
      overallProgress,
      recommendations,
      total
    };
  }, [totalSavings, shortTermGoal, mediumTermGoal, longTermGoal, emergencyGoal, retirementGoal, shortTermPriority, mediumTermPriority, emergencyPriority, retirementPriority]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Savings Buckets Allocator Calculator</h1>
      <p className="text-gray-600 mb-6">Allocate savings across multiple goals with priority-based distribution</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Savings Available</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings to Allocate ($)</label>
            <input
              type="number"
              value={totalSavings}
              onChange={(e) => setTotalSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
            />
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Goal Amounts</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-700">Emergency Fund Goal ($)</label>
                <input
                  type="number"
                  value={emergencyGoal}
                  onChange={(e) => setEmergencyGoal(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="18000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Short-Term Goals ($)</label>
                <input
                  type="number"
                  value={shortTermGoal}
                  onChange={(e) => setShortTermGoal(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="2000"
                />
                <p className="text-xs text-gray-500">Vacation, gadget, small purchase</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Medium-Term Goals ($)</label>
                <input
                  type="number"
                  value={mediumTermGoal}
                  onChange={(e) => setMediumTermGoal(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="10000"
                />
                <p className="text-xs text-gray-500">Car, home down payment, major purchase</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Long-Term Goals ($)</label>
                <input
                  type="number"
                  value={longTermGoal}
                  onChange={(e) => setLongTermGoal(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="50000"
                />
                <p className="text-xs text-gray-500">Education, major renovation</p>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Retirement Goal ($)</label>
                <input
                  type="number"
                  value={retirementGoal}
                  onChange={(e) => setRetirementGoal(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="500000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Priority Levels</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Fund Priority</label>
              <select
                value={emergencyPriority}
                onChange={(e) => setEmergencyPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="critical">Critical (highest)</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short-Term Priority</label>
              <select
                value={shortTermPriority}
                onChange={(e) => setShortTermPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medium-Term Priority</label>
              <select
                value={mediumTermPriority}
                onChange={(e) => setMediumTermPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Priority</label>
              <select
                value={retirementPriority}
                onChange={(e) => setRetirementPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg text-sm">
            <h4 className="font-medium text-gray-700 mb-2">Priority Explanation</h4>
            <p className="text-gray-600">Critical: 10x weight - life essentials</p>
            <p className="text-gray-600">High: 7x weight - important goals</p>
            <p className="text-gray-600">Medium: 4x weight - standard priorities</p>
            <p className="text-gray-600">Low: 1x weight - future planning</p>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Savings Allocation Results</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Allocated</h4>
              <p className="text-xl font-bold text-green-700">$${result.totalAllocated.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{((result.totalAllocated / result.total) * 100).toFixed(0)}% of savings</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Unallocated</h4>
              <p className="text-xl font-bold text-orange-700">$${result.unallocated.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Available for redistribution</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Overall Progress</h4>
              <p className="text-xl font-bold text-blue-700">{result.overallProgress.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Across all goals</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Bucket Allocations</h4>
            <div className="space-y-3 mt-2">
              {result.allocations.map((bucket, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${bucket.color}`}></div>
                      <span className="font-medium text-gray-700">{bucket.name}</span>
                      <span className="text-xs text-gray-500">({bucket.priority})</span>
                    </div>
                    <span className="font-bold text-green-600">$${bucket.allocated.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${bucket.color}`}
                      style={{ width: `${Math.min(100, bucket.progress)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Goal: $${bucket.goal.toFixed(0)}</span>
                    <span>{bucket.progress.toFixed(0)}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Allocation Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-green-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Priority-based allocation ensures critical goals (emergency fund) receive funding first. Weighted distribution balances multiple competing goals. Progress tracking shows completion status. Review priorities quarterly. Adjust as goals are met or life circumstances change.</p>
      </div>
    </div>
  );
}