'use client';

import { useState, useMemo } from 'react';

export default function TaxNegotiationStrategyCalculator() {
  const [disputeAmount, setDisputeAmount] = useState<string>('10000');
  const [totalAssets, setTotalAssets] = useState<string>('50000');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('4000');
  const [hasDocumentation, setHasDocumentation] = useState<boolean>(false);
  const [disputeStrength, setDisputeStrength] = useState<string>('moderate');
  const [irsPositionStrength, setIrsPositionStrength] = useState<string>('strong');
  const [timeConstraints, setTimeConstraints] = useState<string>('normal');

  const result = useMemo(() => {
    const dispute = parseFloat(disputeAmount) || 0;
    const assets = parseFloat(totalAssets) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;

    const monthlyDisposable = income - expenses;
    const canPayFull = monthlyDisposable > dispute / 12 && assets > dispute;
    const canPayPartial = monthlyDisposable > 0;

    // Strategy scoring
    let recommendedStrategy = 'negotiate';
    let settlementRange = { min: dispute * 0.3, max: dispute * 0.7 };
    let successProbability = 50;
    let timeEstimate = '6-12 months';
    let costEstimate = 0;

    // Calculate strength factors
    const positionScore = disputeStrength === 'strong' ? 30 : disputeStrength === 'moderate' ? 20 : 10;
    const irsScore = irsPositionStrength === 'weak' ? 20 : irsPositionStrength === 'moderate' ? 10 : 0;
    const docScore = hasDocumentation ? 15 : 0;

    const totalScore = positionScore + irsScore + docScore;

    // Determine strategy based on financial position and dispute strength
    if (totalScore >= 45 && dispute > 5000) {
      recommendedStrategy = 'appeal';
      successProbability = 65;
      timeEstimate = '6-9 months';
      costEstimate = 2500;
      settlementRange = { min: dispute * 0.1, max: dispute * 0.5 };
    } else if (totalScore >= 30) {
      recommendedStrategy = 'negotiate';
      successProbability = 55;
      timeEstimate = '4-6 months';
      costEstimate = 1000;
      settlementRange = { min: dispute * 0.2, max: dispute * 0.6 };
    } else if (canPayFull) {
      recommendedStrategy = 'pay_with_abatement_request';
      successProbability = 40;
      timeEstimate = '2-3 months';
      costEstimate = 500;
      settlementRange = { min: dispute * 0.5, max: dispute };
    } else if (canPayPartial) {
      recommendedStrategy = 'installment_with_penalty_abatement';
      successProbability = 70;
      timeEstimate = '3-6 months';
      costEstimate = 750;
      settlementRange = { min: dispute, max: dispute + dispute * 0.1 };
    } else {
      recommendedStrategy = 'cnc_or_oic';
      successProbability = 45;
      timeEstimate = '9-18 months';
      costEstimate = 3000;
      settlementRange = { min: 0, max: dispute * 0.3 };
    }

    // Time constraints adjustment
    if (timeConstraints === 'urgent') {
      if (canPayFull) recommendedStrategy = 'pay_with_abatement_request';
      else recommendedStrategy = 'quick_settlement';
      timeEstimate = '1-2 months';
    }

    // Calculate negotiation leverage
    const leverageFactor = totalScore / 60;
    const adjustedMin = settlementRange.min * (1 + leverageFactor * 0.5);
    const adjustedMax = settlementRange.max * (1 + leverageFactor * 0.3);

    return {
      recommendedStrategy,
      settlementRange: {
        min: Math.max(0, adjustedMin),
        max: Math.min(dispute, adjustedMax)
      },
      successProbability,
      timeEstimate,
      costEstimate,
      canPayFull,
      canPayPartial,
      monthlyDisposable,
      leverageFactor
    };
  }, [disputeAmount, totalAssets, monthlyIncome, monthlyExpenses, hasDocumentation, disputeStrength, irsPositionStrength, timeConstraints]);

  const getStrategyDetails = (strategy: string) => {
    const details: Record<string, { name: string; description: string; pros: string[]; cons: string[] }> = {
      'appeal': {
        name: 'Formal Appeal',
        description: 'File appeal with IRS Office of Appeals for formal review',
        pros: ['Preserves legal rights', 'Independent review', 'Potential for full resolution'],
        cons: ['Longer timeline', 'Requires documentation', 'May need professional help']
      },
      'negotiate': {
        name: 'Direct Negotiation',
        description: 'Work directly with IRS to reach settlement agreement',
        pros: ['Faster resolution', 'Flexible terms', 'Lower cost'],
        cons: ['May accept unfavorable terms', 'Less formal protection', 'Requires negotiation skill']
      },
      'pay_with_abatement_request': {
        name: 'Pay with Penalty Abatement',
        description: 'Pay principal and request penalty removal',
        pros: ['Fastest resolution', 'Eliminates penalties', 'Clear outcome'],
        cons: ['Full payment required', 'No dispute resolution', 'Penalties may not be removed']
      },
      'installment_with_penalty_abatement': {
        name: 'Installment Agreement + Abatement',
        description: 'Set up payment plan while requesting penalty relief',
        pros: ['Manageable payments', 'Stops collection', 'Potential penalty savings'],
        cons: ['Still paying full amount', 'Interest continues', 'Long-term commitment']
      },
      'cnc_or_oic': {
        name: 'Currently Not Collectible / Offer in Compromise',
        description: 'Request CNC status or submit settlement offer based on inability to pay',
        pros: ['Debt suspension or reduction', 'Based on actual ability', 'Fresh start'],
        cons: ['Requires financial disclosure', 'Lengthy process', 'Not guaranteed']
      },
      'quick_settlement': {
        name: 'Quick Settlement',
        description: 'Accept expedited settlement to resolve urgently',
        pros: ['Immediate resolution', 'Clear outcome', 'Stops collection'],
        cons: ['May pay more', 'Limited negotiation', 'Less favorable terms']
      }
    };
    return details[strategy] || details['negotiate'];
  };

  const strategyDetails = result ? getStrategyDetails(result.recommendedStrategy) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Negotiation Strategy Calculator</h1>
      <p className="text-gray-600 mb-6">Determine optimal negotiation strategy based on your financial and dispute situation</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disputed Amount ($)</label>
            <input
              type="number"
              value={disputeAmount}
              onChange={(e) => setDisputeAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Assets ($)</label>
            <input
              type="number"
              value={totalAssets}
              onChange={(e) => setTotalAssets(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Dispute Assessment</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Position Strength</label>
            <select
              value={disputeStrength}
              onChange={(e) => setDisputeStrength(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="strong">Strong (Clear documentation, valid position)</option>
              <option value="moderate">Moderate (Some evidence, arguable position)</option>
              <option value="weak">Weak (Limited evidence, uncertain position)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IRS Position Strength</label>
            <select
              value={irsPositionStrength}
              onChange={(e) => setIrsPositionStrength(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="strong">Strong (Clear documentation, valid position)</option>
              <option value="moderate">Moderate (Some ambiguity)</option>
              <option value="weak">Weak (Interpretation issues, unclear position)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Constraints</label>
            <select
              value={timeConstraints}
              onChange={(e) => setTimeConstraints(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">Normal (Can wait for best outcome)</option>
              <option value="urgent">Urgent (Collection action imminent)</option>
              <option value="very_urgent">Very Urgent (Levy/lien active)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={hasDocumentation}
              onChange={(e) => setHasDocumentation(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Have supporting documentation</span>
          </div>
        </div>
      </div>

      {result && strategyDetails && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recommended Strategy: {strategyDetails.name}</h3>
          <p className="text-gray-700 mb-4">{strategyDetails.description}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Success Probability</h4>
              <p className="text-2xl font-bold text-green-700">{result.successProbability}%</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Estimated Timeline</h4>
              <p className="text-lg font-bold">{result.timeEstimate}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-green-700">Pros</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                {strategyDetails.pros.map((pro, i) => <li key={i}>{pro}</li>)}
              </ul>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-red-700">Cons</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                {strategyDetails.cons.map((con, i) => <li key={i}>{con}</li>)}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Potential Settlement Range</h4>
            <p className="text-lg mt-2">
              <span className="font-bold">${result.settlementRange.min.toFixed(0)}</span>
              to
              <span className="font-bold">${result.settlementRange.max.toFixed(0)}</span>
              (vs ${parseFloat(disputeAmount).toFixed(0)} disputed)
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Strategy Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">Strategy</th>
                <th className="px-2 py-2 text-left">Best For</th>
                <th className="px-2 py-2 text-left">Timeline</th>
                <th className="px-2 py-2 text-left">Cost</th>
              </tr>
            </thead>
            <tbody className="text-blue-700">
              <tr className="border-b">
                <td className="px-2 py-2">Appeal</td>
                <td className="px-2 py-2">Strong position, &gt;$5K</td>
                <td className="px-2 py-2">6-9 months</td>
                <td className="px-2 py-2">~$2,500</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Negotiate</td>
                <td className="px-2 py-2">Moderate position</td>
                <td className="px-2 py-2">4-6 months</td>
                <td className="px-2 py-2">~$1,000</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Installment</td>
                <td className="px-2 py-2">Can pay over time</td>
                <td className="px-2 py-2">3-6 months</td>
                <td className="px-2 py-2">~$750</td>
              </tr>
              <tr>
                <td className="px-2 py-2">OIC/CNC</td>
                <td className="px-2 py-2">Cannot pay</td>
                <td className="px-2 py-2">9-18 months</td>
                <td className="px-2 py-2">~$3,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Strategy recommendations are based on common scenarios. Individual outcomes vary based on specific circumstances. Consider professional tax advice for significant disputes.</p>
      </div>
    </div>
  );
}