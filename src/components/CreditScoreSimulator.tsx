'use client';

import { useState, useMemo } from 'react';

export default function CreditScoreSimulator() {
  const [currentScore, setCurrentScore] = useState<string>('720');
  const [paymentHistory, setPaymentHistory] = useState<string>('100');
  const [creditUtilization, setCreditUtilization] = useState<string>('30');
  const [creditAge, setCreditAge] = useState<string>('7');
  const [creditMix, setCreditMix] = useState<string>('3');
  const [newCredit, setNewCredit] = useState<string>('0');
  const [simulateLatePayment, setSimulateLatePayment] = useState<boolean>(false);
  const [simulateNewCard, setSimulateNewCard] = useState<boolean>(false);
  const [simulatePayoff, setSimulatePayoff] = useState<boolean>(false);
  const [simulateBalanceTransfer, setSimulateBalanceTransfer] = useState<boolean>(false);
  const [targetScore, setTargetScore] = useState<string>('750');

  const result = useMemo(() => {
    const score = parseFloat(currentScore) || 0;
    const history = parseFloat(paymentHistory) || 0;
    const utilization = parseFloat(creditUtilization) || 0;
    const age = parseFloat(creditAge) || 0;
    const mix = parseFloat(creditMix) || 0;
    const newInquiries = parseFloat(newCredit) || 0;

    // FICO score factors (approximate weights)
    // Payment History: 35%
    // Credit Utilization: 30%
    // Credit Age: 15%
    // Credit Mix: 10%
    // New Credit: 10%

    // Calculate component scores
    const historyScore = history >= 100 ? 100 : history >= 95 ? 85 : history >= 90 ? 70 : history >= 80 ? 50 : 30;
    const utilizationScore = utilization <= 10 ? 100 : utilization <= 30 ? 80 : utilization <= 50 ? 60 : utilization <= 70 ? 40 : 20;
    const ageScore = age >= 10 ? 100 : age >= 7 ? 80 : age >= 5 ? 60 : age >= 3 ? 40 : 20;
    const mixScore = mix >= 5 ? 100 : mix >= 3 ? 80 : mix >= 2 ? 60 : mix >= 1 ? 40 : 20;
    const newCreditScore = newInquiries === 0 ? 100 : newInquiries <= 2 ? 80 : newInquiries <= 4 ? 60 : newInquiries <= 6 ? 40 : 20;

    // Weighted calculation
    const weightedScore =
      historyScore * 0.35 +
      utilizationScore * 0.30 +
      ageScore * 0.15 +
      mixScore * 0.10 +
      newCreditScore * 0.10;

    // Map to approximate FICO range (300-850)
    const estimatedScore = Math.round(300 + (weightedScore / 100) * 550);

    // Simulate scenarios
    const scenarios: { action: string; impact: number; newScore: number; timeline: string }[] = [];

    // Late payment scenario
    if (simulateLatePayment) {
      const impact = score >= 780 ? -110 : score >= 700 ? -90 : score >= 650 ? -70 : -50;
      scenarios.push({
        action: 'One 30-day late payment',
        impact,
        newScore: Math.max(300, score + impact),
        timeline: 'Immediate drop, recovers 6-24 months'
      });
    }

    // New credit card scenario
    if (simulateNewCard) {
      const inquiryImpact = -5;
      const avgAgeImpact = age > 2 ? -10 : 0;
      scenarios.push({
        action: 'New credit card application',
        impact: inquiryImpact + avgAgeImpact,
        newScore: Math.max(300, score + inquiryImpact + avgAgeImpact),
        timeline: 'Drop 3-6 months, recover 6-12 months'
      });
    }

    // Payoff scenario
    if (simulatePayoff) {
      const payoffImpact = utilization > 30 ? Math.round((utilization - 0) * 0.5) : utilization > 10 ? 20 : 10;
      scenarios.push({
        action: 'Pay off all balances',
        impact: payoffImpact,
        newScore: Math.min(850, score + payoffImpact),
        timeline: 'Improvement within 30 days'
      });
    }

    // Balance transfer scenario
    if (simulateBalanceTransfer) {
      const inquiryImpact = -5;
      const utilizationChange = utilization > 50 ? Math.round((utilization - 30) * 0.3) : 10;
      scenarios.push({
        action: 'Balance transfer to lower utilization',
        impact: utilizationChange + inquiryImpact,
        newScore: Math.min(850, Math.max(300, score + utilizationChange + inquiryImpact)),
        timeline: 'Hard inquiry temp drop, utilization benefit 30 days'
      });
    }

    // Improvement path
    const target = parseFloat(targetScore) || 0;
    const neededPoints = target - score;
    const improvementActions: { action: string; points: number; timeline: string }[] = [];

    if (neededPoints > 0) {
      if (utilization > 30) {
        improvementActions.push({
          action: 'Reduce utilization to under 10%',
          points: Math.round((utilization - 10) * 0.5),
          timeline: '30-45 days after payment'
        });
      }

      if (history < 100) {
        improvementActions.push({
          action: 'Continue on-time payments',
          points: Math.round((100 - history) * 0.35),
          timeline: '6-12 months'
        });
      }

      if (age < 7) {
        improvementActions.push({
          action: 'Keep old accounts open',
          points: Math.round((7 - age) * 5),
          timeline: 'Gradual over time'
        });
      }

      if (mix < 3) {
        improvementActions.push({
          action: 'Add different credit types',
          points: Math.round((3 - mix) * 10),
          timeline: '6-12 months after new account'
        });
      }

      if (newInquiries > 0) {
        improvementActions.push({
          action: 'Avoid new applications',
          points: Math.round(newInquiries * 5),
          timeline: '6-12 months'
        });
      }
    }

    // Timeline to target
    const totalPossibleGain = improvementActions.reduce((sum, a) => sum + a.points, 0);
    const canReachTarget = totalPossibleGain >= neededPoints;
    const estimatedMonths = canReachTarget
      ? Math.ceil(neededPoints / 5) + 6
      : 24;

    // Credit score ranges
    const scoreRanges = [
      { range: 'Excellent', min: 800, max: 850, rate: 'Best rates, easy approval' },
      { range: 'Very Good', min: 740, max: 799, rate: 'Great rates, good approval' },
      { range: 'Good', min: 670, max: 739, rate: 'Acceptable rates, may need verification' },
      { range: 'Fair', min: 580, max: 669, rate: 'Higher rates, limited options' },
      { range: 'Poor', min: 300, max: 579, rate: 'Very high rates, difficult approval' }
    ];

    const currentRange = scoreRanges.find(r => score >= r.min && score <= r.max) || scoreRanges[4];

    return {
      estimatedScore,
      historyScore,
      utilizationScore,
      ageScore,
      mixScore,
      newCreditScore,
      scenarios,
      improvementActions,
      neededPoints,
      canReachTarget,
      estimatedMonths,
      scoreRanges,
      currentRange,
      totalPossibleGain,
      score,
      utilization,
      age,
      mix,
      newInquiries,
      target
    };
  }, [currentScore, paymentHistory, creditUtilization, creditAge, creditMix, newCredit, simulateLatePayment, simulateNewCard, simulatePayoff, simulateBalanceTransfer, targetScore]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Score Simulator</h1>
      <p className="text-gray-600 mb-6">Simulate how financial actions impact your credit score</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Credit Profile</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Credit Score</label>
            <input
              type="number"
              value={currentScore}
              onChange={(e) => setCurrentScore(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="720"
              min="300"
              max="850"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment History (%)</label>
            <input
              type="number"
              value={paymentHistory}
              onChange={(e) => setPaymentHistory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100"
              min="0"
              max="100"
            />
            <p className="text-xs text-gray-500">Percentage of on-time payments</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Utilization (%)</label>
            <input
              type="number"
              value={creditUtilization}
              onChange={(e) => setCreditUtilization(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30"
              min="0"
              max="100"
            />
            <p className="text-xs text-gray-500">Credit used vs total available</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Credit Age (years)</label>
            <input
              type="number"
              value={creditAge}
              onChange={(e) => setCreditAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="7"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Mix (types)</label>
            <input
              type="number"
              value={creditMix}
              onChange={(e) => setCreditMix(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
              min="0"
            />
            <p className="text-xs text-gray-500">Cards, loans, mortgage, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recent Inquiries (last 12 mo)</label>
            <input
              type="number"
              value={newCredit}
              onChange={(e) => setNewCredit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Simulate Actions</h3>

          <div className="space-y-3">
            <label className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={simulateLatePayment}
                onChange={(e) => setSimulateLatePayment(e.target.checked)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-red-800">Miss a Payment</span>
                <p className="text-xs text-red-600">30-day late payment impact</p>
              </div>
            </label>

            <label className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={simulateNewCard}
                onChange={(e) => setSimulateNewCard(e.target.checked)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-amber-800">Apply for New Card</span>
                <p className="text-xs text-amber-600">Hard inquiry + account age impact</p>
              </div>
            </label>

            <label className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={simulatePayoff}
                onChange={(e) => setSimulatePayoff(e.target.checked)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-green-800">Pay Off All Balances</span>
                <p className="text-xs text-green-600">Reduce utilization to 0%</p>
              </div>
            </label>

            <label className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={simulateBalanceTransfer}
                onChange={(e) => setSimulateBalanceTransfer(e.target.checked)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-blue-800">Balance Transfer</span>
                <p className="text-xs text-blue-600">Inquiry + lower utilization</p>
              </div>
            </label>
          </div>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <label className="block text-sm font-medium text-purple-800 mb-1">Target Score</label>
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(e.target.value)}
              className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="750"
              min="300"
              max="850"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Credit Score Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-800">Current Score</h4>
              <p className="text-3xl font-bold text-indigo-700">{result.score}</p>
              <span className="text-sm px-2 py-1 rounded bg-indigo-100 text-indigo-800">{result.currentRange.range}</span>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-800">Estimated Score</h4>
              <p className="text-3xl font-bold text-green-700">{result.estimatedScore}</p>
              <p className="text-xs text-gray-500">Based on factors</p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <h4 className="font-medium text-gray-800">Target Score</h4>
              <p className="text-3xl font-bold text-purple-700">{result.target}</p>
              <p className="text-xs text-gray-500">
                {result.canReachTarget ? `${result.estimatedMonths} months possible` : 'Longer timeline needed'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Score Factor Breakdown</h4>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment History (35%)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">{result.historyScore}%</span>
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: `${result.historyScore}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credit Utilization (30%)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600">{result.utilizationScore}%</span>
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${result.utilizationScore}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credit Age (15%)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-purple-600">{result.ageScore}%</span>
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-purple-500 rounded" style={{ width: `${result.ageScore}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credit Mix (10%)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-600">{result.mixScore}%</span>
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-amber-500 rounded" style={{ width: `${result.mixScore}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Credit (10%)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-600">{result.newCreditScore}%</span>
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-red-500 rounded" style={{ width: `${result.newCreditScore}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {result.scenarios.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Scenario Impact</h4>
              <div className="space-y-2 mt-2">
                {result.scenarios.map((s, i) => (
                  <div key={i} className={`p-2 rounded ${s.impact > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{s.action}</span>
                      <span className={`font-bold ${s.impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {s.impact > 0 ? '+' : ''}{s.impact} pts
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">New score: {s.newScore}</span>
                      <span className="text-gray-500">{s.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.neededPoints > 0 && result.improvementActions.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Path to {result.target}</h4>
              <p className="text-sm text-gray-600 mb-2">Need {result.neededPoints} points, potential gain: {result.totalPossibleGain} points</p>
              <div className="space-y-2">
                {result.improvementActions.map((a, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-green-50 rounded">
                    <span className="text-gray-700">{a.action}</span>
                    <div className="text-right">
                      <span className="font-bold text-green-600">+{a.points}</span>
                      <span className="text-xs text-gray-500 ml-2">{a.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Credit Score Ranges</h4>
            <div className="space-y-1 mt-2">
              {result.scoreRanges.map((r, i) => (
                <div key={i} className={`flex justify-between items-center text-sm p-1 rounded ${r.range === result.currentRange.range ? 'bg-indigo-100' : ''}`}>
                  <span className="font-medium">{r.range}</span>
                  <span className="text-gray-600">{r.min}-{r.max}</span>
                  <span className="text-xs text-gray-500">{r.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> FICO scores range 300-850. Factors: Payment history 35%, Utilization 30%, Age 15%, Mix 10%, New credit 10%. Utilization best under 10%, acceptable under 30%. Late payments hurt most - 50-110 points. Hard inquiries: -5 points each, 6-12 months recovery. Keep old accounts open for age. Mix of credit types helps. Check reports annually at annualcreditreport.com. Dispute errors promptly.</p>
      </div>
    </div>
  );
}