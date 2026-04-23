'use client';

import { useState, useMemo } from 'react';

type Mode = 'normal' | 'math_error' | 'quick';

export default function TaxDocumentationGapsCalculator() {
  const [incomeSources, setIncomeSources] = useState<string>('3');
  const [deductionCategories, setDeductionCategories] = useState<string>('5');
  const [hasW2, setHasW2] = useState<boolean>(true);
  const [has1099s, setHas1099s] = useState<boolean>(false);
  const [hasReceipts, setHasReceipts] = useState<boolean>(true);
  const [hasBankStatements, setHasBankStatements] = useState<boolean>(true);
  const [hasMileageLog, setHasMileageLog] = useState<boolean>(false);
  const [hasHomeOfficeRecords, setHasHomeOfficeRecords] = useState<boolean>(false);
  const [hasInvestmentRecords, setHasInvestmentRecords] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>('normal');

  const result = useMemo(() => {
    const incomeNum = parseInt(incomeSources) || 0;
    const deductionNum = parseInt(deductionCategories) || 0;

    if (incomeNum <= 0) {
      return null;
    }

    // Calculate documentation coverage
    const incomeDocs = [
      hasW2,
      has1099s,
      hasInvestmentRecords
    ].filter(Boolean).length;

    const expenseDocs = [
      hasReceipts,
      hasBankStatements,
      hasMileageLog,
      hasHomeOfficeRecords
    ].filter(Boolean).length;

    // Expected documents based on sources
    const expectedIncomeDocs = Math.min(incomeNum, 3);
    const expectedExpenseDocs = deductionNum > 3 ? 4 : 2;

    // Calculate gaps
    const incomeGap = expectedIncomeDocs - incomeDocs;
    const expenseGap = expectedExpenseDocs - expenseDocs;

    // Risk factors
    const missing1099Risk = incomeNum > 1 && !has1099s;
    const missingMileageRisk = deductionNum >= 3 && !hasMileageLog;
    const missingHomeOfficeRisk = deductionNum >= 4 && !hasHomeOfficeRecords;

    const totalGaps = Math.max(0, incomeGap) + Math.max(0, expenseGap);
    const riskFactors = [missing1099Risk, missingMileageRisk, missingHomeOfficeRisk].filter(Boolean).length;

    // Gap score (0-100, higher = more gaps = higher risk)
    let gapScore = totalGaps * 15 + riskFactors * 10;
    gapScore = Math.max(0, Math.min(100, gapScore));

    return {
      totalGaps,
      incomeGap: Math.max(0, incomeGap),
      expenseGap: Math.max(0, expenseGap),
      riskFactors,
      gapScore,
      coverage: Math.max(0, 100 - gapScore)
    };
  }, [incomeSources, deductionCategories, hasW2, has1099s, hasReceipts, hasBankStatements, hasMileageLog, hasHomeOfficeRecords, hasInvestmentRecords]);

  const getRiskLevel = (gapScore: number) => {
    if (gapScore <= 20) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', desc: 'Strong documentation coverage' };
    if (gapScore <= 40) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Minor gaps, low audit risk' };
    if (gapScore <= 60) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Notable gaps, review recommended' };
    if (gapScore <= 80) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Significant gaps, action needed' };
    return { level: 'Critical', color: 'text-red-600', bg: 'bg-red-50', desc: 'Major gaps, high audit vulnerability' };
  };

  const risk = result ? getRiskLevel(result.gapScore) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Documentation Gaps Calculator</h1>
      <p className="text-gray-600 mb-6">Identify missing documentation that could create audit vulnerabilities</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Income Sources</label>
            <input
              type="number"
              value={incomeSources}
              onChange={(e) => setIncomeSources(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deduction Categories Claimed</label>
            <input
              type="number"
              value={deductionCategories}
              onChange={(e) => setDeductionCategories(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              max="20"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-4">Income Documentation</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasW2} onChange={(e) => setHasW2(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">W-2 forms collected</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={has1099s} onChange={(e) => setHas1099s(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">1099 forms (NEC, INT, DIV, etc.)</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasInvestmentRecords} onChange={(e) => setHasInvestmentRecords(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Investment/brokerage statements</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Expense Documentation</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasReceipts} onChange={(e) => setHasReceipts(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Receipts/invoices for expenses</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasBankStatements} onChange={(e) => setHasBankStatements(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Bank/credit card statements</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasMileageLog} onChange={(e) => setHasMileageLog(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Mileage log (if claiming vehicle)</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasHomeOfficeRecords} onChange={(e) => setHasHomeOfficeRecords(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Home office measurements/photos</span>
            </div>
          </div>
        </div>
      </div>

      {mode === 'math_error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Please enter valid numbers for income sources.</p>
        </div>
      )}

      {result && risk && (
        <div className={`mt-6 p-6 ${risk.bg} border rounded-lg`}>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="text-lg font-semibold">Documentation Coverage</h4>
              <p className="text-2xl font-bold">{result.coverage}%</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Gap Score</h4>
              <p className={`text-2xl font-bold ${risk.color}`}>{result.gapScore}/100</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Risk Level</h4>
              <p className={`text-xl font-bold ${risk.color}`}>{risk.level}</p>
            </div>
          </div>

          <div className="space-y-2 text-gray-700">
            <h4 className="font-medium">Gap Analysis:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Income documentation gaps: {result.incomeGap}</li>
              <li>Expense documentation gaps: {result.expenseGap}</li>
              <li>High-risk missing items: {result.riskFactors}</li>
            </ul>
            <p className="mt-2">{risk.desc}</p>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">Gap Remediation Actions</h3>
        <ul className="space-y-2 text-purple-700">
          {!has1099s && parseInt(incomeSources) > 1 && <li>• Collect all 1099 forms - missing forms create automatic IRS mismatches</li>}
          {!hasReceipts && <li>• Request duplicate receipts from vendors or use bank statement evidence</li>}
          {!hasMileageLog && parseInt(deductionCategories) >= 3 && <li>• Start a mileage tracking app or log book immediately</li>}
          {!hasHomeOfficeRecords && parseInt(deductionCategories) >= 4 && <li>• Document home office: floor plan, photos, exclusive use area</li>}
          {!hasBankStatements && <li>• Download monthly statements as backup expense evidence</li>}
          {!hasInvestmentRecords && <li>• Consolidate investment statements for cost basis verification</li>}
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Documentation gaps are identified based on common audit requirements. Consult a tax professional for specific documentation needs.</p>
      </div>
    </div>
  );
}