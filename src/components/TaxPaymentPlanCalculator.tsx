'use client';

import { useState, useMemo } from 'react';

export default function TaxPaymentPlanCalculator() {
  const [totalDebt, setTotalDebt] = useState<string>('15000');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('4000');
  const [hasFinancialHardship, setHasFinancialHardship] = useState<boolean>(false);
  const [debtAgeMonths, setDebtAgeMonths] = useState<string>('6');
  const [filingStatus, setFilingStatus] = useState<string>('compliant');

  const result = useMemo(() => {
    const debt = parseFloat(totalDebt) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const ageMonths = parseInt(debtAgeMonths) || 0;

    const disposable = income - expenses;
    let maxMonths = Math.min(72, Math.ceil(debt / (disposable * 0.25)));
    const monthlyPayment = disposable > 0 ? Math.min(disposable, debt / Math.max(24, maxMonths)) : 0;

    // Evaluate plan options
    let recommendedPlan = 'standard_ia';
    let setupFee = 31;
    let interestRate = 0.08; // IRS statutory rate ~8%
    let totalInterest = debt * interestRate * (maxMonths / 12);
    let eligibilityIssues: string[] = [];

    // Check eligibility
    if (filingStatus !== 'compliant') {
      eligibilityIssues.push('Must file all required returns first');
    }
    if (ageMonths > 12) {
      eligibilityIssues.push('Debt may be in collection status - contact IRS');
    }
    if (disposable <= 0 && !hasFinancialHardship) {
      eligibilityIssues.push('No disposable income - consider CNC or OIC');
    }

    // Determine best plan type
    if (debt <= 10000) {
      recommendedPlan = 'streamlined_ia';
      setupFee = 43;
      maxMonths = 36;
    } else if (debt <= 50000 && disposable > 0) {
      recommendedPlan = 'streamlined_large_ia';
      setupFee = 43;
    } else if (hasFinancialHardship && disposable <= 0) {
      recommendedPlan = 'cnc_status';
      setupFee = 0;
      totalInterest = 0;
    } else if (debt > 50000) {
      recommendedPlan = 'regular_ia';
      setupFee = 225;
      eligibilityIssues.push('Requires detailed financial statement (Form 433)');
    }

    // Calculate total cost
    const totalCost = debt + totalInterest + setupFee;
    const payoffMonths = monthlyPayment > 0 ? Math.ceil(debt / monthlyPayment) : 0;

    return {
      recommendedPlan,
      monthlyPayment,
      payoffMonths,
      setupFee,
      totalInterest,
      totalCost,
      eligibilityIssues,
      disposable,
      maxMonths
    };
  }, [totalDebt, monthlyIncome, monthlyExpenses, hasFinancialHardship, debtAgeMonths, filingStatus]);

  const getPlanDetails = (plan: string) => {
    const details: Record<string, { name: string; description: string; requirements: string[] }> = {
      'streamlined_ia': {
        name: 'Streamlined Installment Agreement',
        description: 'Simple payment plan for debts under $10,000',
        requirements: ['Debt under $10,000', 'Can pay within 36 months', 'Current filing compliance']
      },
      'streamlined_large_ia': {
        name: 'Streamlined Large Installment Agreement',
        description: 'Extended plan for debts up to $50,000',
        requirements: ['Debt under $50,000', 'Can pay within 72 months', 'Current filing compliance']
      },
      'standard_ia': {
        name: 'Standard Installment Agreement',
        description: 'Regular payment plan requiring financial disclosure',
        requirements: ['Can pay debt over time', 'Form 433-F may be required', 'Current filing compliance']
      },
      'regular_ia': {
        name: 'Regular Installment Agreement',
        description: 'Full financial disclosure required for large debts',
        requirements: ['Form 433-A or 433-F', 'Detailed financial statement', 'Asset disclosure']
      },
      'cnc_status': {
        name: 'Currently Not Collectible',
        description: 'Temporary suspension of collection due to hardship',
        requirements: ['No disposable income', 'Financial hardship documented', 'Asset protection']
      }
    };
    return details[plan] || details['standard_ia'];
  };

  const planDetails = result ? getPlanDetails(result.recommendedPlan) : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Payment Plan Calculator</h1>
      <p className="text-gray-600 mb-6">Determine the best IRS payment plan based on your financial situation</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Tax Debt Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Tax Debt ($)</label>
            <input
              type="number"
              value={totalDebt}
              onChange={(e) => setTotalDebt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Debt Age (months)</label>
            <input
              type="number"
              value={debtAgeMonths}
              onChange={(e) => setDebtAgeMonths(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="compliant">All returns filed (compliant)</option>
              <option value="missing">Some returns missing</option>
              <option value="non_filer">Have not filed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Finances</h3>
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

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={hasFinancialHardship}
              onChange={(e) => setHasFinancialHardship(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Financial hardship (cannot pay basic expenses)</span>
          </div>
        </div>
      </div>

      {result && planDetails && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recommended Plan: {planDetails.name}</h3>
          <p className="text-gray-700 mb-4">{planDetails.description}</p>

          {result.eligibilityIssues.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Eligibility Issues:</h4>
              <ul className="list-disc list-inside text-yellow-700">
                {result.eligibilityIssues.map((issue, i) => <li key={i}>{issue}</li>)}
              </ul>
            </div>
          )}

          <div className="grid md:grid-cols-4 gap-4 mb-4 text-gray-700">
            <div>
              <h4 className="font-medium">Monthly Payment</h4>
              <p className="text-xl font-bold text-blue-700">${result.monthlyPayment.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium">Payoff Period</h4>
              <p className="text-xl font-bold">{result.payoffMonths} months</p>
            </div>
            <div>
              <h4 className="font-medium">Setup Fee</h4>
              <p className="text-xl font-bold">${result.setupFee}</p>
            </div>
            <div>
              <h4 className="font-medium">Est. Interest</h4>
              <p className="text-xl font-bold">${result.totalInterest.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Total Cost of Plan</h4>
            <p className="text-2xl font-bold text-blue-700">${result.totalCost.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Includes debt + interest + setup fee</p>
          </div>

          <div className="mt-4 p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {planDetails.requirements.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Payment Plan Options</h3>
        <div className="space-y-3 text-green-700">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Streamlined IA ($10K max)</h4>
            <p>No financial disclosure, $43 fee, 36-month max term</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Streamlined Large IA ($50K max)</h4>
            <p>No detailed financials, $43 fee, 72-month max term</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Regular IA (Over $50K)</h4>
            <p>Full Form 433 disclosure, $225 fee, negotiable terms</p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium">Currently Not Collectible</h4>
            <p>No payment required, debt suspended during hardship</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> IRS interest rates change quarterly. Current rate ~8%. Setup fees may be waived for low-income taxpayers. Apply online at IRS.gov or call 1-800-829-1040.</p>
      </div>
    </div>
  );
}