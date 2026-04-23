'use client';

import { useState, useMemo } from 'react';

export default function TaxYearEndPlanningCalculator() {
  const [yearIncome, setYearIncome] = useState<string>('100000');
  const [expectedBonuses, setExpectedBonuses] = useState<string>('10000');
  const [plannedDeductions, setPlannedDeductions] = useState<string>('12000');
  const [availableCredits, setAvailableCredits] = useState<string>('3000');
  const [currentWithholding, setCurrentWithholding] = useState<string>('18000');
  const [hasRetirementAccount, setHasRetirementAccount] = useState<boolean>(true);
  const [retirementContribution, setRetirementContribution] = useState<string>('6000');
  const [hasHsa, setHasHsa] = useState<boolean>(false);
  const [hsaContribution, setHsaContribution] = useState<string>('0');
  const [plannedCharitable, setPlannedCharitable] = useState<string>('2000');
  const [taxYearEnd, setTaxYearEnd] = useState<string>('2024-12-31');
  const [daysRemaining, setDaysRemaining] = useState<string>('60');

  const result = useMemo(() => {
    const income = parseFloat(yearIncome) || 0;
    const bonuses = parseFloat(expectedBonuses) || 0;
    const deductions = parseFloat(plannedDeductions) || 0;
    const credits = parseFloat(availableCredits) || 0;
    const withholding = parseFloat(currentWithholding) || 0;
    const retirement = parseFloat(retirementContribution) || 0;
    const hsa = parseFloat(hsaContribution) || 0;
    const charitable = parseFloat(plannedCharitable) || 0;
    const days = parseInt(daysRemaining) || 0;

    const totalIncome = income + bonuses;
    const totalDeductions = deductions + retirement + hsa + charitable;
    const taxableIncome = totalIncome - totalDeductions;

    // Rough tax estimate (using simplified brackets)
    let estimatedTax = 0;
    const brackets = [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ];

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        estimatedTax += taxableInBracket * bracket.rate;
      }
    }

    const taxAfterCredits = Math.max(0, estimatedTax - credits);
    const refundOrOwed = withholding - taxAfterCredits;

    // Calculate action opportunities
    const actions: { action: string; savings: number; deadline: string; done: boolean }[] = [];

    if (hasRetirementAccount && retirement < 23000) {
      const additionalPossible = 23000 - retirement;
      const bracketRate = taxableIncome > 100525 ? 0.24 : taxableIncome > 47150 ? 0.22 : 0.12;
      actions.push({
        action: 'Maximize 401(k) contribution',
        savings: additionalPossible * bracketRate,
        deadline: 'Last paycheck of year',
        done: retirement >= 23000
      });
    }

    if (hasHsa && hsa < 4150) {
      const additionalPossible = 4150 - hsa;
      const bracketRate = taxableIncome > 100525 ? 0.24 : taxableIncome > 47150 ? 0.22 : 0.12;
      actions.push({
        action: 'Maximize HSA contribution',
        savings: additionalPossible * bracketRate,
        deadline: 'April 15 of next year',
        done: hsa >= 4150
      });
    }

    if (charitable < 2000 && taxableIncome > 50000) {
      actions.push({
        action: 'Consider additional charitable giving',
        savings: 2000 * (taxableIncome > 100525 ? 0.24 : 0.22),
        deadline: 'December 31',
        done: charitable >= 2000
      });
    }

    // Tax loss harvesting opportunity
    actions.push({
      action: 'Review tax-loss harvesting opportunities',
      savings: 3000 * (taxableIncome > 100525 ? 0.24 : 0.22),
      deadline: 'December 31',
      done: false
    });

    // Calculate urgency level
    const totalSavings = actions.filter(a => !a.done).reduce((sum, a) => sum + a.savings, 0);
    let urgency = 'low';
    if (refundOrOwed < 0 && Math.abs(refundOrOwed) > 1000) urgency = 'high';
    else if (days <= 30) urgency = 'high';
    else if (days <= 60 || totalSavings > 500) urgency = 'medium';

    return {
      totalIncome,
      totalDeductions,
      taxableIncome,
      estimatedTax,
      taxAfterCredits,
      refundOrOwed,
      actions,
      totalSavings,
      urgency,
      daysRemaining: days,
      isRefund: refundOrOwed > 0,
      owesAmount: Math.abs(Math.min(0, refundOrOwed))
    };
  }, [yearIncome, expectedBonuses, plannedDeductions, availableCredits, currentWithholding, hasRetirementAccount, retirementContribution, hasHsa, hsaContribution, plannedCharitable, taxYearEnd, daysRemaining]);

  const getUrgencyColor = (level: string) => {
    if (level === 'high') return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    if (level === 'medium') return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
  };

  const urgencyColors = result ? getUrgencyColor(result.urgency) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Year-End Planning Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate year-end tax optimization opportunities and deadlines</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Income & Withholding</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year Income ($)</label>
            <input
              type="number"
              value={yearIncome}
              onChange={(e) => setYearIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Bonuses ($)</label>
            <input
              type="number"
              value={expectedBonuses}
              onChange={(e) => setExpectedBonuses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Withholding ($)</label>
            <input
              type="number"
              value={currentWithholding}
              onChange={(e) => setCurrentWithholding(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="18000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days Remaining in Year</label>
            <input
              type="number"
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Planned Deductions & Credits</h3>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasRetirementAccount}
              onChange={(e) => setHasRetirementAccount(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Have 401(k)/IRA</span>
          </div>
          {hasRetirementAccount && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Contribution ($)</label>
              <input
                type="number"
                value={retirementContribution}
                onChange={(e) => setRetirementContribution(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="6000"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasHsa}
              onChange={(e) => setHasHsa(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Have HSA</span>
          </div>
          {hasHsa && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current HSA Contribution ($)</label>
              <input
                type="number"
                value={hsaContribution}
                onChange={(e) => setHsaContribution(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2000"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Charitable Giving ($)</label>
            <input
              type="number"
              value={plannedCharitable}
              onChange={(e) => setPlannedCharitable(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Tax Credits ($)</label>
            <input
              type="number"
              value={availableCredits}
              onChange={(e) => setAvailableCredits(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
          </div>
        </div>
      </div>

      {result && urgencyColors && (
        <div className={`mt-6 p-6 ${urgencyColors.bg} ${urgencyColors.border} border rounded-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Year-End Planning Assessment</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgencyColors.bg} ${urgencyColors.text}`}>
              {result.urgency.toUpperCase()} URGENCY
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4 text-gray-700">
            <div>
              <h4 className="font-medium">Estimated Tax</h4>
              <p className="text-xl font-bold">${result.taxAfterCredits.toFixed(0)}</p>
            </div>
            <div>
              <h4 className="font-medium">{result.isRefund ? 'Expected Refund' : 'Amount Owed'}</h4>
              <p className={`text-xl font-bold ${result.isRefund ? 'text-green-700' : 'text-red-700'}`}>
                ${Math.abs(result.refundOrOwed).toFixed(0)}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Potential Savings</h4>
              <p className="text-xl font-bold text-blue-700">${result.totalSavings.toFixed(0)}</p>
            </div>
          </div>

          {!result.isRefund && result.owesAmount > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700 font-medium">⚠️ You may owe ${result.owesAmount.toFixed(0)} at tax time</p>
              <p className="text-red-600 text-sm mt-1">Consider increasing withholding or making estimated tax payment</p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Year-End Action Checklist:</h4>
            {result.actions.map((action, i) => (
              <div key={i} className={`p-3 rounded border ${action.done ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-medium ${action.done ? 'text-green-700' : ''}`}>
                      {action.done ? '✓ ' : ''}{action.action}
                    </p>
                    <p className="text-sm text-gray-500">Deadline: {action.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${action.done ? 'text-green-600' : 'text-blue-600'}`}>
                      {action.done ? 'Completed' : `Save $${action.savings.toFixed(0)}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
        <h3 className="text-lg font-semibold text-orange-800 mb-3">Key Year-End Deadlines</h3>
        <div className="space-y-3 text-orange-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">December 31</h4>
            <p>401(k) contributions, charitable donations, tax-loss harvesting, Roth conversions</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">January 15</h4>
            <p>Q4 estimated tax payment deadline (for under-withholding)</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">April 15</h4>
            <p>IRA/HSA contributions for prior year, tax filing deadline</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Tax estimates are simplified. Consult tax professional for precise planning. Year-end strategies depend on individual circumstances and tax bracket.</p>
      </div>
    </div>
  );
}