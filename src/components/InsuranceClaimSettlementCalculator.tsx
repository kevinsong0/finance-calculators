'use client';

import { useState, useMemo } from 'react';

export default function InsuranceClaimSettlementCalculator() {
  const [claimType, setClaimType] = useState<string>('auto');
  const [estimatedDamage, setEstimatedDamage] = useState<string>('5000');
  const [policyCoverage, setPolicyCoverage] = useState<string>('10000');
  const [deductible, setDeductible] = useState<string>('500');
  const [actualCashValue, setActualCashValue] = useState<string>('8000');
  const [replacementCost, setReplacementCost] = useState<string>('12000');
  const [hasReplacementCoverage, setHasReplacementCoverage] = useState<boolean>(true);
  const [claimFilingDate, setClaimFilingDate] = useState<string>('2024-01-15');
  const [priorClaims, setPriorClaims] = useState<string>('0');
  const [policyYears, setPolicyYears] = useState<string>('3');
  const [hasGapCoverage, setHasGapCoverage] = useState<boolean>(false);

  const result = useMemo(() => {
    const damage = parseFloat(estimatedDamage) || 0;
    const coverage = parseFloat(policyCoverage) || 0;
    const ded = parseFloat(deductible) || 0;
    const acv = parseFloat(actualCashValue) || 0;
    const rc = parseFloat(replacementCost) || 0;
    const prior = parseInt(priorClaims) || 0;
    const years = parseInt(policyYears) || 0;

    // Calculate settlement options
    const acvSettlement = Math.min(damage, coverage) - ded;
    const rcSettlement = hasReplacementCoverage ? Math.min(rc, coverage) - ded : acvSettlement;
    const gapSettlement = hasGapCoverage && claimType === 'auto' ? Math.max(0, damage - acv) : 0;

    // Calculate claim impact on premium
    const premiumImpactBase = prior >= 3 ? 25 : prior >= 1 ? 15 : 0;
    const premiumIncrease = claimType === 'auto' ? premiumImpactBase + 10 : premiumImpactBase + 5;
    const surchargeDuration = 3; // years

    // Calculate net benefit considering premium increase
    const annualPremiumEstimate = coverage * 0.02; // rough estimate 2% of coverage
    const totalPremiumIncrease = annualPremiumEstimate * (premiumIncrease / 100) * surchargeDuration;
    const netAcvBenefit = acvSettlement - totalPremiumIncrease;
    const netRcBenefit = rcSettlement - totalPremiumIncrease;

    // Settlement timeline estimate
    const timelineEstimate = claimType === 'auto' ?
      (damage > 5000 ? '30-60 days' : damage > 1000 ? '14-30 days' : '7-14 days') :
      claimType === 'home' ?
      (damage > 10000 ? '60-90 days' : damage > 5000 ? '30-60 days' : '14-30 days') :
      (damage > 2000 ? '30-45 days' : '14-21 days');

    // Recommendations
    const recommendations: string[] = [];

    if (damage <= ded * 2) {
      recommendations.push('Consider not filing: damage near deductible threshold. Filing may increase premiums.');
    }

    if (!hasReplacementCoverage && rc > acv * 1.3) {
      recommendations.push('Replacement coverage would significantly increase settlement. Consider policy upgrade.');
    }

    if (prior >= 2) {
      recommendations.push('Multiple prior claims may result in policy cancellation. Evaluate claim necessity carefully.');
    }

    if (damage > coverage) {
      recommendations.push('Damage exceeds policy limit. You will bear uncovered costs.');
    }

    if (claimType === 'auto' && !hasGapCoverage && acv < damage) {
      recommendations.push('Without gap coverage, you may owe difference between ACV and loan balance.');
    }

    // Settlement strategy
    const strategy = damage > coverage * 0.3 ?
      (prior < 1 && years >= 2 ? 'File claim - good claim history' : 'Evaluate premium impact vs benefit') :
      (damage <= ded ? 'Do not file - below deductible' : 'Minor claim - weigh premium increase');

    return {
      acvSettlement,
      rcSettlement,
      gapSettlement,
      netAcvBenefit,
      netRcBenefit,
      premiumIncrease,
      totalPremiumIncrease,
      timelineEstimate,
      recommendations,
      strategy,
      deductibleExceeded: damage > ded,
      coverageExceeded: damage > coverage,
      yearsSinceClaim: prior === 0 ? years : 0
    };
  }, [claimType, estimatedDamage, policyCoverage, deductible, actualCashValue, replacementCost, hasReplacementCoverage, priorClaims, policyYears, hasGapCoverage]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Claim Settlement Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate claim settlement options and premium impact</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Claim Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Claim Type</label>
            <select
              value={claimType}
              onChange={(e) => setClaimType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Auto Insurance</option>
              <option value="home">Homeowners Insurance</option>
              <option value="health">Health Insurance</option>
              <option value="life">Life Insurance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Damage/Loss ($)</label>
            <input
              type="number"
              value={estimatedDamage}
              onChange={(e) => setEstimatedDamage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Coverage Limit ($)</label>
            <input
              type="number"
              value={policyCoverage}
              onChange={(e) => setPolicyCoverage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deductible ($)</label>
            <input
              type="number"
              value={deductible}
              onChange={(e) => setDeductible(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Policy & Valuation</h3>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasReplacementCoverage}
              onChange={(e) => setHasReplacementCoverage(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Has Replacement Cost Coverage</span>
          </div>

          {hasReplacementCoverage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Actual Cash Value ($)</label>
              <input
                type="number"
                value={actualCashValue}
                onChange={(e) => setActualCashValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="8000"
              />
            </div>
          )}

          {hasReplacementCoverage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Replacement Cost ($)</label>
              <input
                type="number"
                value={replacementCost}
                onChange={(e) => setReplacementCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="12000"
              />
            </div>
          )}

          {claimType === 'auto' && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasGapCoverage}
                onChange={(e) => setHasGapCoverage(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Has Gap Insurance Coverage</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prior Claims (last 3 years)</label>
            <input
              type="number"
              value={priorClaims}
              onChange={(e) => setPriorClaims(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years with Current Policy</label>
            <input
              type="number"
              value={policyYears}
              onChange={(e) => setPolicyYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Settlement Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">ACV Settlement</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.acvSettlement.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Actual Cash Value - Deductible</p>
            </div>
            {hasReplacementCoverage && (
              <div>
                <h4 className="font-medium text-gray-800">RC Settlement</h4>
                <p className="text-xl font-bold text-green-700">$${result.rcSettlement.toFixed(0)}</p>
                <p className="text-xs text-gray-500">Replacement Cost - Deductible</p>
              </div>
            )}
            {hasGapCoverage && claimType === 'auto' && result.gapSettlement > 0 && (
              <div>
                <h4 className="font-medium text-gray-800">Gap Coverage</h4>
                <p className="text-xl font-bold text-purple-700">$${result.gapSettlement.toFixed(0)}</p>
                <p className="text-xs text-gray-500">Additional gap coverage</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Premium Impact Analysis</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Estimated Premium Increase</p>
                <p className="font-bold text-orange-700">{result.premiumIncrease}% for {3} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Premium Cost Impact</p>
                <p className="font-bold text-red-700">$${result.totalPremiumIncrease.toFixed(0)}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm text-gray-600">Net Benefit After Premium Impact</p>
              <p className="font-bold text-blue-700">ACV: $${result.netAcvBenefit.toFixed(0)} | RC: $${result.netRcBenefit.toFixed(0)}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Claim Strategy Recommendation</h4>
            <p className="text-lg font-bold text-gray-700 mt-1">{result.strategy}</p>
            <p className="text-sm text-gray-600 mt-1">Estimated Timeline: {result.timelineEstimate}</p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Important Considerations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {!result.deductibleExceeded && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-700 font-medium">⚠️ Damage does not exceed deductible - no payout expected</p>
            </div>
          )}

          {result.coverageExceeded && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-700 font-medium">⚠️ Damage exceeds coverage limit - you bear uncovered costs</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Settlement estimates are approximations. Actual settlement depends on adjuster assessment, policy terms, depreciation calculations, and state regulations. Premium impact varies by insurer and claim history. Consult your insurance agent for specific policy details.</p>
      </div>
    </div>
  );
}