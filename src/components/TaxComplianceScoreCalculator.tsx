'use client';

import { useState, useMemo } from 'react';

type Mode = 'normal' | 'math_error' | 'quick';

export default function TaxComplianceScoreCalculator() {
  const [income, setIncome] = useState<string>('100000');
  const [deductions, setDeductions] = useState<string>('15000');
  const [creditsClaimed, setCreditsClaimed] = useState<string>('2000');
  const [fileOnTime, setFileOnTime] = useState<boolean>(true);
  const [payOnTime, setPayOnTime] = useState<boolean>(true);
  const [accurateRecords, setAccurateRecords] = useState<boolean>(true);
  const [reportAllIncome, setReportAllIncome] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>('normal');

  const score = useMemo(() => {
    const incomeNum = parseFloat(income) || 0;
    const deductionsNum = parseFloat(deductions) || 0;
    const creditsNum = parseFloat(creditsClaimed) || 0;

    if (incomeNum <= 0) {
      return null;
    }

    // Base score starts at 50
    let scoreValue = 50;

    // Filing compliance (+20)
    if (fileOnTime) scoreValue += 10;
    if (payOnTime) scoreValue += 10;

    // Documentation compliance (+20)
    if (accurateRecords) scoreValue += 10;
    if (reportAllIncome) scoreValue += 10;

    // Deduction ratio analysis
    const deductionRatio = deductionsNum / incomeNum;
    if (deductionRatio < 0.15) scoreValue += 5; // Conservative deductions
    else if (deductionRatio > 0.35) scoreValue -= 10; // High deduction risk

    // Credit ratio analysis
    const creditRatio = creditsNum / incomeNum;
    if (creditRatio < 0.02) scoreValue += 5; // Conservative credits
    else if (creditRatio > 0.05) scoreValue -= 5; // High credit claims

    // Income level factor
    if (incomeNum > 200000) scoreValue -= 5; // Higher scrutiny for high income

    // Clamp score between 0 and 100
    scoreValue = Math.max(0, Math.min(100, scoreValue));

    return scoreValue;
  }, [income, deductions, creditsClaimed, fileOnTime, payOnTime, accurateRecords, reportAllIncome]);

  const getRiskLevel = (scoreVal: number) => {
    if (scoreVal >= 80) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (scoreVal >= 60) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (scoreVal >= 40) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const risk = score ? getRiskLevel(score) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Compliance Score Calculator</h1>
      <p className="text-gray-600 mb-6">Assess your overall tax compliance health and identify improvement areas</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Deductions Claimed ($)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Credits Claimed ($)</label>
            <input
              type="number"
              value={creditsClaimed}
              onChange={(e) => setCreditsClaimed(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Compliance Behaviors</h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={fileOnTime}
              onChange={(e) => setFileOnTime(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Filed returns on time</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={payOnTime}
              onChange={(e) => setPayOnTime(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Paid taxes on time</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={accurateRecords}
              onChange={(e) => setAccurateRecords(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Maintains accurate records</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={reportAllIncome}
              onChange={(e) => setReportAllIncome(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Reports all income sources</span>
          </div>
        </div>
      </div>

      {mode === 'math_error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Please enter a valid income amount greater than zero.</p>
        </div>
      )}

      {risk && score && (
        <div className={`mt-6 p-6 ${risk.bg} border rounded-lg`}>
          <h3 className="text-xl font-semibold mb-4">Compliance Score: {score}/100</h3>
          <p className={`${risk.color} font-medium mb-4`}>Risk Level: {risk.level}</p>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="space-y-2 text-gray-700">
            <h4 className="font-medium">Score Breakdown:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Base score: 50 points</li>
              <li>Filing compliance: {fileOnTime && payOnTime ? '+20' : '0'} points</li>
              <li>Documentation: {accurateRecords && reportAllIncome ? '+20' : '0'} points</li>
              <li>Deduction ratio adjustment: {parseFloat(deductions) / parseFloat(income) < 0.15 ? '+5' : parseFloat(deductions) / parseFloat(income) > 0.35 ? '-10' : '0'} points</li>
              <li>Credit ratio adjustment: {parseFloat(creditsClaimed) / parseFloat(income) < 0.02 ? '+5' : parseFloat(creditsClaimed) / parseFloat(income) > 0.05 ? '-5' : '0'} points</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Improvement Recommendations</h3>
        <ul className="space-y-2 text-blue-700">
          {!fileOnTime && <li>• File returns by the deadline or request an extension</li>}
          {!payOnTime && <li>• Set up estimated tax payments to avoid late payment penalties</li>}
          {!accurateRecords && <li>• Implement a recordkeeping system for all transactions</li>}
          {!reportAllIncome && <li>• Report all income including freelance, side jobs, and foreign income</li>}
          {parseFloat(deductions) / parseFloat(income) > 0.35 && <li>• Review deduction claims - high ratio increases audit risk</li>}
          {parseFloat(creditsClaimed) / parseFloat(income) > 0.05 && <li>• Verify all credit eligibility documentation</li>}
          {score && score >= 80 && <li>• Maintain current compliance practices</li>}
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> This score is for educational purposes only and does not guarantee IRS audit outcomes. Actual audit decisions depend on many factors beyond compliance behaviors.</p>
      </div>
    </div>
  );
}