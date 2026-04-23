'use client';

import { useState, useMemo } from 'react';

type Mode = 'normal' | 'math_error' | 'quick';

export default function TaxAuditReadinessCalculator() {
  const [auditType, setAuditType] = useState<string>('correspondence');
  const [yearsFiled, setYearsFiled] = useState<string>('5');
  const [incomeComplexity, setIncomeComplexity] = useState<string>('simple');
  const [deductionComplexity, setDeductionComplexity] = useState<string>('standard');
  const [hasOrganizedRecords, setHasOrganizedRecords] = useState<boolean>(true);
  const [hasProfessionalHelp, setHasProfessionalHelp] = useState<boolean>(false);
  const [hasBackupDocs, setHasBackupDocs] = useState<boolean>(true);
  const [knowsRights, setKnowsRights] = useState<boolean>(false);
  const [hasResponsePlan, setHasResponsePlan] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>('normal');

  const result = useMemo(() => {
    const yearsNum = parseInt(yearsFiled) || 0;

    if (yearsNum <= 0) {
      return null;
    }

    // Base readiness score
    let score = 30;

    // Record organization (+25)
    if (hasOrganizedRecords) score += 10;
    if (hasBackupDocs) score += 15;

    // Professional support (+20)
    if (hasProfessionalHelp) score += 20;

    // Knowledge and preparation (+25)
    if (knowsRights) score += 10;
    if (hasResponsePlan) score += 15;

    // Income complexity factor
    if (incomeComplexity === 'simple') score += 5;
    else if (incomeComplexity === 'complex') score -= 5;

    // Deduction complexity factor
    if (deductionComplexity === 'standard') score += 5;
    else if (deductionComplexity === 'aggressive') score -= 10;

    // Years filed factor (more years = more exposure)
    if (yearsNum > 3) score -= 5;
    if (yearsNum > 6) score -= 5;

    // Audit type preparation
    let auditDifficulty = 0;
    if (auditType === 'office') auditDifficulty = 10;
    else if (auditType === 'field') auditDifficulty = 20;
    score -= auditDifficulty;

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    // Calculate preparation time needed
    let prepDays = 7;
    if (!hasOrganizedRecords) prepDays += 14;
    if (!hasBackupDocs) prepDays += 7;
    if (auditType === 'office') prepDays += 7;
    if (auditType === 'field') prepDays += 14;
    if (incomeComplexity === 'complex') prepDays += 7;
    if (deductionComplexity === 'aggressive') prepDays += 10;

    return {
      score,
      prepDays,
      auditDifficulty,
      gaps: [
        !hasOrganizedRecords && 'Organized records system',
        !hasBackupDocs && 'Backup documentation',
        !hasProfessionalHelp && 'Tax professional support',
        !knowsRights && 'Knowledge of audit rights',
        !hasResponsePlan && 'Response plan ready',
      ].filter(Boolean) as string[]
    };
  }, [auditType, yearsFiled, incomeComplexity, deductionComplexity, hasOrganizedRecords, hasProfessionalHelp, hasBackupDocs, knowsRights, hasResponsePlan]);

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: 'Well Prepared', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 60) return { level: 'Moderately Prepared', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 40) return { level: 'Needs Preparation', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Underprepared', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const readiness = result ? getReadinessLevel(result.score) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Audit Readiness Calculator</h1>
      <p className="text-gray-600 mb-6">Evaluate your preparation level for potential IRS audit scenarios</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Likely Audit Type</label>
            <select
              value={auditType}
              onChange={(e) => setAuditType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="correspondence">Correspondence (Mail Audit)</option>
              <option value="office">Office Audit (In-person)</option>
              <option value="field">Field Audit (At your location)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Returns Filed</label>
            <input
              type="number"
              value={yearsFiled}
              onChange={(e) => setYearsFiled(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Income Complexity</label>
            <select
              value={incomeComplexity}
              onChange={(e) => setIncomeComplexity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="simple">Simple (W-2 only)</option>
              <option value="moderate">Moderate (Multiple sources)</option>
              <option value="complex">Complex (Business, investments, foreign)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deduction Complexity</label>
            <select
              value={deductionComplexity}
              onChange={(e) => setDeductionComplexity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard deduction only</option>
              <option value="itemized">Itemized (Common deductions)</option>
              <option value="aggressive">Aggressive (Business, large items)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Preparation Status</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasOrganizedRecords} onChange={(e) => setHasOrganizedRecords(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Records organized by year/category</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasBackupDocs} onChange={(e) => setHasBackupDocs(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Backup copies of all documents</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasProfessionalHelp} onChange={(e) => setHasProfessionalHelp(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Tax professional available</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={knowsRights} onChange={(e) => setKnowsRights(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Knows audit rights & appeal process</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={hasResponsePlan} onChange={(e) => setHasResponsePlan(e.target.checked)} className="w-5 h-5 text-blue-600 rounded" />
              <span className="text-gray-700">Has audit response plan</span>
            </div>
          </div>
        </div>
      </div>

      {mode === 'math_error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Please enter valid years filed.</p>
        </div>
      )}

      {result && readiness && (
        <div className={`mt-6 p-6 ${readiness.bg} border rounded-lg`}>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <h4 className="text-lg font-semibold">Readiness Score</h4>
              <p className={`text-3xl font-bold ${readiness.color}`}>{result.score}/100</p>
              <p className={`font-medium ${readiness.color}`}>{readiness.level}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Estimated Prep Time</h4>
              <p className="text-2xl font-bold">{result.prepDays} days</p>
              <p className="text-gray-600">To reach full readiness</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full ${result.score >= 80 ? 'bg-green-500' : result.score >= 60 ? 'bg-blue-500' : result.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          {result.gaps.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Critical Gaps to Address:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {result.gaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-800 mb-3">Audit Preparation Checklist</h3>
        <div className="grid md:grid-cols-2 gap-4 text-teal-700">
          <div>
            <h4 className="font-medium mb-2">Before Audit:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Gather all relevant year documents</li>
              <li>Review return being audited</li>
              <li>Organize supporting documentation</li>
              <li>Consult tax professional if complex</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">During Audit:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Respond within deadline (30 days typically)</li>
              <li>Provide only requested documents</li>
              <li>Keep copies of all submissions</li>
              <li>Document all communications</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Audit readiness assessment is educational. Actual audit outcomes depend on IRS findings. Consider professional representation for complex audits.</p>
      </div>
    </div>
  );
}