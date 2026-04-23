'use client';

import { useState, useMemo } from 'react';

export default function InsurancePremiumComparisonCalculator() {
  const [insuranceType, setInsuranceType] = useState<string>('auto');
  const [currentPremium, setCurrentPremium] = useState<string>('1200');
  const [currentDeductible, setCurrentDeductible] = useState<string>('500');
  const [currentCoverage, setCurrentCoverage] = useState<string>('100000');
  const [competitorPremium1, setCompetitorPremium1] = useState<string>('1100');
  const [competitorDeductible1, setCompetitorDeductible1] = useState<string>('500');
  const [competitorCoverage1, setCompetitorCoverage1] = useState<string>('100000');
  const [competitorPremium2, setCompetitorPremium2] = useState<string>('950');
  const [competitorDeductible2, setCompetitorDeductible2] = useState<string>('1000');
  const [competitorCoverage2, setCompetitorCoverage2] = useState<string>('75000');
  const [claimsExpected, setClaimsExpected] = useState<string>('1');
  const [averageClaimCost, setAverageClaimCost] = useState<string>('2000');
  const [analysisYears, setAnalysisYears] = useState<string>('3');

  const result = useMemo(() => {
    const current = parseFloat(currentPremium) || 0;
    const curDed = parseFloat(currentDeductible) || 0;
    const curCov = parseFloat(currentCoverage) || 0;
    const comp1 = parseFloat(competitorPremium1) || 0;
    const comp1Ded = parseFloat(competitorDeductible1) || 0;
    const comp1Cov = parseFloat(competitorCoverage1) || 0;
    const comp2 = parseFloat(competitorPremium2) || 0;
    const comp2Ded = parseFloat(competitorDeductible2) || 0;
    const comp2Cov = parseFloat(competitorCoverage2) || 0;
    const claims = parseInt(claimsExpected) || 0;
    const avgClaim = parseFloat(averageClaimCost) || 0;
    const years = parseInt(analysisYears) || 3;

    // Total cost calculation (premium + expected claim out-of-pocket)
    const currentTotalPremium = current * years;
    const currentClaimCost = claims * curDed + Math.max(0, claims * avgClaim - curCov);
    const currentTotalCost = currentTotalPremium + currentClaimCost;

    const comp1TotalPremium = comp1 * years;
    const comp1ClaimCost = claims * comp1Ded + Math.max(0, claims * avgClaim - comp1Cov);
    const comp1TotalCost = comp1TotalPremium + comp1ClaimCost;

    const comp2TotalPremium = comp2 * years;
    const comp2ClaimCost = claims * comp2Ded + Math.max(0, claims * avgClaim - comp2Cov);
    const comp2TotalCost = comp2TotalPremium + comp2ClaimCost;

    // Annual savings
    const savingsVsComp1 = currentTotalCost - comp1TotalCost;
    const savingsVsComp2 = currentTotalCost - comp2TotalCost;

    // Coverage per dollar
    const currentCoveragePerDollar = curCov / current;
    const comp1CoveragePerDollar = comp1Cov / comp1;
    const comp2CoveragePerDollar = comp2Cov / comp2;

    // Value score (coverage/price adjusted for deductible)
    const calculateValueScore = (premium: number, coverage: number, deductible: number) => {
      const baseScore = coverage / premium;
      const deductibleImpact = deductible / premium * 0.5;
      return baseScore - deductibleImpact;
    };

    const currentValueScore = calculateValueScore(current, curCov, curDed);
    const comp1ValueScore = calculateValueScore(comp1, comp1Cov, comp1Ded);
    const comp2ValueScore = calculateValueScore(comp2, comp2Cov, comp2Ded);

    // Rankings
    const policies = [
      { name: 'Current Policy', totalCost: currentTotalCost, valueScore: currentValueScore, premium: current, coverage: curCov },
      { name: 'Competitor 1', totalCost: comp1TotalCost, valueScore: comp1ValueScore, premium: comp1, coverage: comp1Cov },
      { name: 'Competitor 2', totalCost: comp2TotalCost, valueScore: comp2ValueScore, premium: comp2, coverage: comp2Cov }
    ];

    policies.sort((a, b) => a.totalCost - b.totalCost);

    // Recommendations
    const recommendations: string[] = [];

    if (comp1TotalCost < currentTotalCost * 0.9) {
      recommendations.push('Competitor 1 offers significant savings over current policy');
    }

    if (comp2Cov < curCov * 0.8) {
      recommendations.push('Competitor 2 has significantly lower coverage - evaluate risk tolerance');
    }

    if (comp2Ded > curDed * 2 && claims > 0) {
      recommendations.push('Competitor 2 higher deductible may cost more if claims occur');
    }

    if (currentValueScore > comp1ValueScore && currentValueScore > comp2ValueScore) {
      recommendations.push('Current policy has best value score - consider staying');
    }

    if (claims === 0) {
      recommendations.push('With no expected claims, focus on premium cost rather than coverage/deductible');
    }

    return {
      currentTotalPremium,
      currentTotalCost,
      comp1TotalPremium,
      comp1TotalCost,
      comp2TotalPremium,
      comp2TotalCost,
      savingsVsComp1,
      savingsVsComp2,
      currentCoveragePerDollar,
      comp1CoveragePerDollar,
      comp2CoveragePerDollar,
      currentValueScore,
      comp1ValueScore,
      comp2ValueScore,
      policies,
      recommendations
    };
  }, [insuranceType, currentPremium, currentDeductible, currentCoverage, competitorPremium1, competitorDeductible1, competitorCoverage1, competitorPremium2, competitorDeductible2, competitorCoverage2, claimsExpected, averageClaimCost, analysisYears]);

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-green-50 border-green-200';
    if (rank === 2) return 'bg-blue-50 border-blue-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Premium Comparison Calculator</h1>
      <p className="text-gray-600 mb-6">Compare insurance policies considering premium, coverage, and deductible</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Policy</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Premium ($)</label>
            <input
              type="number"
              value={currentPremium}
              onChange={(e) => setCurrentPremium(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deductible ($)</label>
            <input
              type="number"
              value={currentDeductible}
              onChange={(e) => setCurrentDeductible(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Limit ($)</label>
            <input
              type="number"
              value={currentCoverage}
              onChange={(e) => setCurrentCoverage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Competitor 1</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Premium ($)</label>
            <input
              type="number"
              value={competitorPremium1}
              onChange={(e) => setCompetitorPremium1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deductible ($)</label>
            <input
              type="number"
              value={competitorDeductible1}
              onChange={(e) => setCompetitorDeductible1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Limit ($)</label>
            <input
              type="number"
              value={competitorCoverage1}
              onChange={(e) => setCompetitorCoverage1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Competitor 2</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Premium ($)</label>
            <input
              type="number"
              value={competitorPremium2}
              onChange={(e) => setCompetitorPremium2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="950"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deductible ($)</label>
            <input
              type="number"
              value={competitorDeductible2}
              onChange={(e) => setCompetitorDeductible2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Limit ($)</label>
            <input
              type="number"
              value={competitorCoverage2}
              onChange={(e) => setCompetitorCoverage2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="75000"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">Expected Claims Scenario</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
            <select
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Auto Insurance</option>
              <option value="home">Homeowners</option>
              <option value="health">Health Insurance</option>
              <option value="life">Life Insurance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Claims (in {analysisYears} yrs)</label>
            <input
              type="number"
              value={claimsExpected}
              onChange={(e) => setClaimsExpected(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Claim Cost ($)</label>
            <input
              type="number"
              value={averageClaimCost}
              onChange={(e) => setAverageClaimCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Period (years)</label>
            <input
              type="number"
              value={analysisYears}
              onChange={(e) => setAnalysisYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Comparison Results</h3>

          <div className="space-y-3 mb-4">
            <h4 className="font-medium text-gray-800">Policy Rankings (by Total {analysisYears}-Year Cost)</h4>
            {result.policies.map((policy, i) => (
              <div key={i} className={`p-3 rounded border ${getRankColor(i + 1)}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {policy.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Premium: $${policy.premium}/yr | Coverage: $${policy.coverage}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${policy.totalCost.toFixed(0)}</p>
                    <p className="text-xs text-gray-500">Total {analysisYears}-year cost</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Savings vs Competitor 1</h4>
              <p className={`text-xl font-bold ${result.savingsVsComp1 > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {result.savingsVsComp1 > 0 ? '+' : ''}${Math.abs(result.savingsVsComp1).toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">
                {result.savingsVsComp1 > 0 ? 'Current costs more' : 'Current saves money'}
              </p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Savings vs Competitor 2</h4>
              <p className={`text-xl font-bold ${result.savingsVsComp2 > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {result.savingsVsComp2 > 0 ? '+' : ''}${Math.abs(result.savingsVsComp2).toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">
                {result.savingsVsComp2 > 0 ? 'Current costs more' : 'Current saves money'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Value Score (Coverage/Price)</h4>
            <div className="grid md:grid-cols-3 gap-2 mt-2">
              <div>
                <p className="text-sm text-gray-600">Current: {result.currentValueScore.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Comp 1: {result.comp1ValueScore.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Comp 2: {result.comp2ValueScore.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Higher score = better value (coverage per dollar minus deductible impact)</p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Total cost includes premiums and expected claim out-of-pocket (deductibles + uncovered costs). Value score helps identify policies with best coverage-to-price ratio. Consider insurer reputation, customer service, and claim processing quality beyond pure cost comparison.</p>
      </div>
    </div>
  );
}