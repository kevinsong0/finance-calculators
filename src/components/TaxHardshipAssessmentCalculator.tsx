'use client';

import { useState, useMemo } from 'react';

export default function TaxHardshipAssessmentCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>('40000');
  const [totalAssets, setTotalAssets] = useState<string>('10000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3200');
  const [necessaryExpenses, setNecessaryExpenses] = useState<string>('2800');
  const [hasHealthIssues, setHasHealthIssues] = useState<boolean>(false);
  const [isElderly, setIsElderly] = useState<boolean>(false);
  const [hasDependents, setHasDependents] = useState<boolean>(false);
  const [unemployed, setUnemployed] = useState<boolean>(false);
  const [debtAmount, setDebtAmount] = useState<string>('25000');

  const result = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const assets = parseFloat(totalAssets) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const necessary = parseFloat(necessaryExpenses) || 0;
    const debt = parseFloat(debtAmount) || 0;

    const monthlyIncome = income / 12;
    const disposable = monthlyIncome - expenses;
    const necessaryDisposable = monthlyIncome - necessary;

    // IRS hardship thresholds
    const nationalStandardExpenses = 1500; // Simplified approximation
    const allowableHousing = Math.min(monthlyIncome * 0.3, expenses);
    const allowableTransportation = Math.min(monthlyIncome * 0.1, expenses);

    // Calculate hardship indicators
    const incomeToDebtRatio = income / debt;
    const assetsToDebtRatio = assets / debt;
    const disposableNegative = disposable <= 0;

    // Score hardship factors
    let hardshipScore = 0;
    const factors: string[] = [];

    // Financial factors
    if (disposableNegative) {
      hardshipScore += 30;
      factors.push('No disposable income after expenses');
    }
    if (necessaryDisposable <= 100) {
      hardshipScore += 20;
      factors.push('Cannot cover basic living expenses');
    }
    if (assetsToDebtRatio < 0.5) {
      hardshipScore += 15;
      factors.push('Assets less than half of tax debt');
    }
    if (incomeToDebtRatio < 2) {
      hardshipScore += 10;
      factors.push('Annual income less than twice the debt');
    }

    // Personal circumstances
    if (hasHealthIssues) {
      hardshipScore += 15;
      factors.push('Health issues affecting ability to work');
    }
    if (isElderly) {
      hardshipScore += 10;
      factors.push('Age factor - limited earning potential');
    }
    if (hasDependents) {
      hardshipScore += 10;
      factors.push('Dependent care responsibilities');
    }
    if (unemployed) {
      hardshipScore += 20;
      factors.push('Unemployed - no current income');
    }

    // Determine hardship status
    let status = 'no_hardship';
    let recommendation = 'Consider standard payment plan';
    let cncEligible = false;

    if (hardshipScore >= 60) {
      status = 'severe_hardship';
      recommendation = 'Request Currently Not Collectible status immediately';
      cncEligible = true;
    } else if (hardshipScore >= 40) {
      status = 'moderate_hardship';
      recommendation = 'CNC status or reduced payment plan possible';
      cncEligible = disposableNegative;
    } else if (hardshipScore >= 20) {
      status = 'minor_hardship';
      recommendation = 'Reduced installment agreement may be approved';
    }

    return {
      hardshipScore,
      status,
      recommendation,
      factors,
      cncEligible,
      disposable,
      necessaryDisposable,
      monthlyIncome
    };
  }, [annualIncome, totalAssets, monthlyExpenses, necessaryExpenses, hasHealthIssues, isElderly, hasDependents, unemployed, debtAmount]);

  const getStatusDetails = (status: string) => {
    const details: Record<string, { label: string; color: string; bg: string }> = {
      'severe_hardship': { label: 'Severe Hardship', color: 'text-red-700', bg: 'bg-red-50' },
      'moderate_hardship': { label: 'Moderate Hardship', color: 'text-orange-700', bg: 'bg-orange-50' },
      'minor_hardship': { label: 'Minor Hardship', color: 'text-yellow-700', bg: 'bg-yellow-50' },
      'no_hardship': { label: 'No Hardship', color: 'text-green-700', bg: 'bg-green-50' }
    };
    return details[status] || details['no_hardship'];
  };

  const statusDetails = result ? getStatusDetails(result.status) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Hardship Assessment Calculator</h1>
      <p className="text-gray-600 mb-6">Evaluate financial hardship for IRS relief programs</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="40000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Assets ($)</label>
            <input
              type="number"
              value={totalAssets}
              onChange={(e) => setTotalAssets(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Total Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Necessary Living Expenses ($)</label>
            <input
              type="number"
              value={necessaryExpenses}
              onChange={(e) => setNecessaryExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Debt Amount ($)</label>
            <input
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="25000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Personal Circumstances</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasHealthIssues}
                onChange={(e) => setHasHealthIssues(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Health issues affecting work ability</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isElderly}
                onChange={(e) => setIsElderly(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Age 65 or older</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasDependents}
                onChange={(e) => setHasDependents(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Have dependents to support</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={unemployed}
                onChange={(e) => setUnemployed(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700">Currently unemployed</span>
            </div>
          </div>
        </div>
      </div>

      {result && statusDetails && (
        <div className={`mt-6 p-6 ${statusDetails.bg} border rounded-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Hardship Assessment</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusDetails.bg} ${statusDetails.color}`}>
              {statusDetails.label}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Hardship Score</h4>
              <p className={`text-2xl font-bold ${statusDetails.color}`}>{result.hardshipScore}/100</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Disposable</h4>
              <p className="text-xl font-bold">${result.disposable.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">CNC Eligible</h4>
              <p className={`text-xl font-bold ${result.cncEligible ? 'text-green-600' : 'text-gray-500'}`}>
                {result.cncEligible ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Recommendation</h4>
            <p className="text-gray-700 mt-1">{result.recommendation}</p>
          </div>

          {result.factors.length > 0 && (
            <div className="p-4 bg-white rounded border">
              <h4 className="font-medium text-gray-800 mb-2">Hardship Factors Identified:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {result.factors.map((factor, i) => <li key={i}>{factor}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">IRS Hardship Programs</h3>
        <div className="space-y-3 text-purple-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Currently Not Collectible (CNC)</h4>
            <p>Collection suspended when paying would create economic hardship. Debt remains but no active collection.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Reduced Installment Agreement</h4>
            <p>Lower monthly payment based on actual disposable income. May be reviewed periodically.</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Offer in Compromise (Doubt as to Collectibility)</h4>
            <p>Settle for less when hardship prevents full payment. Requires detailed financial disclosure.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> IRS uses Collection Financial Standards to determine allowable expenses. Hardship determination requires complete Form 433-A or 433-F. This calculator provides preliminary assessment only.</p>
      </div>
    </div>
  );
}