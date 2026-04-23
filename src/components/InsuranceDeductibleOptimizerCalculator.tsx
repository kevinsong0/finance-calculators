'use client';

import { useState, useMemo } from 'react';

export default function InsuranceDeductibleOptimizerCalculator() {
  const [insuranceType, setInsuranceType] = useState<string>('auto');
  const [annualPremiumLowDeductible, setAnnualPremiumLowDeductible] = useState<string>('1500');
  const [lowDeductible, setLowDeductible] = useState<string>('250');
  const [annualPremiumHighDeductible, setAnnualPremiumHighDeductible] = useState<string>('1000');
  const [highDeductible, setHighDeductible] = useState<string>('1000');
  const [claimProbability, setClaimProbability] = useState<string>('10');
  const [averageClaimSize, setAverageClaimSize] = useState<string>('3000');
  const [emergencyFundAvailable, setEmergencyFundAvailable] = useState<string>('5000');
  const [riskTolerance, setRiskTolerance] = useState<string>('moderate');
  const [analysisYears, setAnalysisYears] = useState<string>('5');

  const result = useMemo(() => {
    const lowPrem = parseFloat(annualPremiumLowDeductible) || 0;
    const lowDed = parseFloat(lowDeductible) || 0;
    const highPrem = parseFloat(annualPremiumHighDeductible) || 0;
    const highDed = parseFloat(highDeductible) || 0;
    const prob = parseFloat(claimProbability) / 100 || 0;
    const avgClaim = parseFloat(averageClaimSize) || 0;
    const fund = parseFloat(emergencyFundAvailable) || 0;
    const years = parseInt(analysisYears) || 5;

    // Expected number of claims
    const expectedClaims = prob * years;

    // Total expected cost for each option
    const lowDeductibleTotalPremium = lowPrem * years;
    const lowDeductibleExpectedClaimCost = expectedClaims * lowDed;
    const lowDeductibleTotalCost = lowDeductibleTotalPremium + lowDeductibleExpectedClaimCost;

    const highDeductibleTotalPremium = highPrem * years;
    const highDeductibleExpectedClaimCost = expectedClaims * highDed;
    const highDeductibleTotalCost = highDeductibleTotalPremium + highDeductibleExpectedClaimCost;

    // Premium savings from high deductible
    const annualPremiumSavings = lowPrem - highPrem;
    const totalPremiumSavings = annualPremiumSavings * years;

    // Break-even analysis
    const premiumSavingsPerClaimDollar = annualPremiumSavings / (highDed - lowDed);
    const claimsToBreakEven = (highDed - lowDed) / annualPremiumSavings;

    // Risk assessment
    const highDeductibleRisk = highDed > fund;
    const maxOutofPocket = highDed;
    const affordableDeductible = Math.min(fund * 0.5, avgClaim * 0.3);

    // Recommendation based on factors
    let recommendation = '';
    let recommendedDeductible = '';

    if (highDeductibleRisk && riskTolerance === 'low') {
      recommendation = 'High deductible exceeds comfort zone. Stick with lower deductible for peace of mind.';
      recommendedDeductible = 'low';
    } else if (expectedClaims >= claimsToBreakEven) {
      recommendation = `Expected ${expectedClaims.toFixed(1)} claims exceed break-even of ${claimsToBreakEven.toFixed(1)}. Lower deductible saves money overall.`;
      recommendedDeductible = 'low';
    } else if (totalPremiumSavings > (highDed - lowDed) * expectedClaims * 1.5) {
      recommendation = 'Premium savings significantly outweigh expected deductible costs. High deductible recommended.';
      recommendedDeductible = 'high';
    } else if (fund > highDed * 2 && riskTolerance !== 'low') {
      recommendation = 'Emergency fund covers deductible comfortably. High deductible saves premium.';
      recommendedDeductible = 'high';
    } else {
      recommendation = 'Marginal difference. Choose based on risk preference and cash flow needs.';
      recommendedDeductible = 'neutral';
    }

    // Net savings calculation
    const netSavingsHighDeductible = lowDeductibleTotalCost - highDeductibleTotalCost;

    // Coverage considerations
    const considerations: string[] = [];

    if (highDed > avgClaim * 0.5) {
      considerations.push('High deductible may exceed typical claim size - small claims would not be filed');
    }

    if (prob < 0.05 && annualPremiumSavings > 100) {
      considerations.push('Low claim probability: high deductible strategy maximizes savings');
    }

    if (fund < highDed) {
      considerations.push('Warning: Emergency fund insufficient for high deductible - risk of financial strain');
    }

    if (insuranceType === 'health' && highDed > 5000) {
      considerations.push('Health insurance high deductible may qualify for HSA - consider tax benefits');
    }

    if (riskTolerance === 'high' && netSavingsHighDeductible > 0) {
      considerations.push('Risk-tolerant profile aligns with high deductible savings strategy');
    }

    return {
      lowDeductibleTotalCost,
      highDeductibleTotalCost,
      netSavingsHighDeductible,
      annualPremiumSavings,
      totalPremiumSavings,
      expectedClaims,
      claimsToBreakEven,
      highDeductibleRisk,
      affordableDeductible,
      recommendation,
      recommendedDeductible,
      considerations,
      maxOutofPocket,
      lowDeductibleTotalPremium,
      highDeductibleTotalPremium
    };
  }, [insuranceType, annualPremiumLowDeductible, lowDeductible, annualPremiumHighDeductible, highDeductible, claimProbability, averageClaimSize, emergencyFundAvailable, riskTolerance, analysisYears]);

  const getRecommendationColor = (rec: string) => {
    if (rec === 'high') return 'bg-green-50 border-green-200';
    if (rec === 'low') return 'bg-blue-50 border-blue-200';
    return 'bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Deductible Optimizer Calculator</h1>
      <p className="text-gray-600 mb-6">Find the optimal deductible based on risk tolerance and expected claims</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Policy Options</h3>
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
              <option value="renters">Renters Insurance</option>
            </select>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800">Low Deductible Option</h4>
            <div className="space-y-2 mt-2">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Annual Premium ($)</label>
                <input
                  type="number"
                  value={annualPremiumLowDeductible}
                  onChange={(e) => setAnnualPremiumLowDeductible(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Deductible ($)</label>
                <input
                  type="number"
                  value={lowDeductible}
                  onChange={(e) => setLowDeductible(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="250"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-orange-800">High Deductible Option</h4>
            <div className="space-y-2 mt-2">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Annual Premium ($)</label>
                <input
                  type="number"
                  value={annualPremiumHighDeductible}
                  onChange={(e) => setAnnualPremiumHighDeductible(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Deductible ($)</label>
                <input
                  type="number"
                  value={highDeductible}
                  onChange={(e) => setHighDeductible(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Risk Assessment</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Claim Probability (%/year)</label>
            <input
              type="number"
              value={claimProbability}
              onChange={(e) => setClaimProbability(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
            <p className="text-xs text-gray-500 mt-1">Average annual chance of filing a claim</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Claim Size ($)</label>
            <input
              type="number"
              value={averageClaimSize}
              onChange={(e) => setAverageClaimSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Fund Available ($)</label>
            <input
              type="number"
              value={emergencyFundAvailable}
              onChange={(e) => setEmergencyFundAvailable(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
            <p className="text-xs text-gray-500 mt-1">Cash available to cover deductible if claim occurs</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low - Prefer predictability, avoid large out-of-pocket</option>
              <option value="moderate">Moderate - Balance savings with manageable risk</option>
              <option value="high">High - Maximize savings, comfortable with risk</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Period (years)</label>
            <input
              type="number"
              value={analysisYears}
              onChange={(e) => setAnalysisYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Deductible Optimization Analysis</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Low Deductible Total Cost</h4>
              <p className="text-xl font-bold text-blue-700">$${result.lowDeductibleTotalCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{analysisYears}-year premium + expected deductibles</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">High Deductible Total Cost</h4>
              <p className="text-xl font-bold text-orange-700">$${result.highDeductibleTotalCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{analysisYears}-year premium + expected deductibles</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Net Savings with High Deductible</h4>
            <p className={`text-xl font-bold ${result.netSavingsHighDeductible > 0 ? 'text-green-700' : 'text-red-700'}`}>
              {result.netSavingsHighDeductible > 0 ? '+' : ''}${Math.abs(result.netSavingsHighDeductible).toFixed(0)}
            </p>
            <p className="text-sm text-gray-600">
              {result.netSavingsHighDeductible > 0 ? 'High deductible saves money overall' : 'Low deductible saves money overall'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Annual Premium Savings</h4>
              <p className="text-lg font-bold text-green-600">$${result.annualPremiumSavings.toFixed(0)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Expected Claims</h4>
              <p className="text-lg font-bold text-indigo-600">{result.expectedClaims.toFixed(1)}</p>
              <p className="text-xs text-gray-500">in {analysisYears} years</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Break-Even Claims</h4>
              <p className="text-lg font-bold text-purple-600">{result.claimsToBreakEven.toFixed(1)}</p>
              <p className="text-xs text-gray-500">to justify low deductible</p>
            </div>
          </div>

          <div className={`p-3 rounded border mb-4 ${getRecommendationColor(result.recommendedDeductible)}`}>
            <h4 className="font-medium text-gray-800">Recommendation</h4>
            <p className="text-lg font-bold mt-1">
              {result.recommendedDeductible === 'high' ? 'High Deductible' :
               result.recommendedDeductible === 'low' ? 'Low Deductible' : 'Either Option'}
            </p>
            <p className="text-sm text-gray-600 mt-1">{result.recommendation}</p>
          </div>

          {result.considerations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Additional Considerations</h4>
              <ul className="mt-2 space-y-1">
                {result.considerations.map((c, i) => (
                  <li key={i} className="text-sm text-gray-600">• {c}</li>
                ))}
              </ul>
            </div>
          )}

          {result.highDeductibleRisk && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-700 font-medium">⚠️ High deductible exceeds emergency fund - financial risk if claim occurs</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Deductible optimization balances premium savings against claim risk. Expected claims based on probability may differ from actual experience. Emergency fund adequacy is critical for high deductible strategies. Health insurance high deductibles may offer HSA tax advantages not captured here.</p>
      </div>
    </div>
  );
}