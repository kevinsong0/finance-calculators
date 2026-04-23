'use client';

import { useState, useMemo } from 'react';

export default function TaxSettlementOptionsCalculator() {
  const [totalDebt, setTotalDebt] = useState<string>('25000');
  const [debtType, setDebtType] = useState<string>('income_tax');
  const [annualIncome, setAnnualIncome] = useState<string>('60000');
  const [totalAssets, setTotalAssets] = useState<string>('30000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3500');
  const [hasHardship, setHasHardship] = useState<boolean>(false);
  const [disputeValidity, setDisputeValidity] = useState<string>('valid');

  const result = useMemo(() => {
    const debt = parseFloat(totalDebt) || 0;
    const income = parseFloat(annualIncome) || 0;
    const assets = parseFloat(totalAssets) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;

    const monthlyIncome = income / 12;
    const disposableIncome = monthlyIncome - expenses;
    const reasonableCollectionPotential = (disposableIncome * 60) + assets;

    // Evaluate settlement options
    const options: { name: string; eligible: boolean; savings: number; timeline: string; description: string }[] = [];

    // Option 1: Full Payment
    const canPayFull = assets >= debt || disposableIncome >= debt / 24;
    options.push({
      name: 'Full Payment',
      eligible: canPayFull,
      savings: 0,
      timeline: 'Immediate',
      description: 'Pay entire debt to resolve immediately'
    });

    // Option 2: Installment Agreement
    const canPayInstallment = disposableIncome > 0 && debt / disposableIncome <= 72;
    const iaMonthlyPayment = Math.min(disposableIncome, debt / 60);
    options.push({
      name: 'Installment Agreement',
      eligible: canPayInstallment,
      savings: 0,
      timeline: `${Math.ceil(debt / iaMonthlyPayment)} months`,
      description: `Pay $${iaMonthlyPayment.toFixed(0)}/month over ${Math.ceil(debt / iaMonthlyPayment)} months`
    });

    // Option 3: Offer in Compromise (Doubt as to Collectibility)
    const oicEligible = reasonableCollectionPotential < debt;
    const oicAmount = Math.max(reasonableCollectionPotential * 0.8, 0);
    const oicSavings = debt - oicAmount;
    options.push({
      name: 'Offer in Compromise',
      eligible: oicEligible,
      savings: oicSavings,
      timeline: '6-12 months',
      description: `Settle for $${oicAmount.toFixed(0)} (${((oicAmount / debt) * 100).toFixed(0)}% of debt)`
    });

    // Option 4: Currently Not Collectible
    const cncEligible = disposableIncome <= 0 || (hasHardship && assets <= debt * 0.1);
    options.push({
      name: 'Currently Not Collectible',
      eligible: cncEligible,
      savings: debt,
      timeline: 'Suspension',
      description: 'Debt suspended while unable to pay'
    });

    // Option 5: Doubt as to Liability (if dispute exists)
    if (disputeValidity === 'disputed') {
      options.push({
        name: 'OIC - Doubt as to Liability',
        eligible: true,
        savings: debt * 0.5,
        timeline: '6-12 months',
        description: 'Settle based on legitimate dispute over liability'
      });
    }

    // Find best option
    const eligibleOptions = options.filter(o => o.eligible);
    let bestOption = eligibleOptions[0];
    for (const opt of eligibleOptions) {
      if (opt.savings > bestOption.savings) bestOption = opt;
    }

    return {
      options,
      eligibleOptions,
      bestOption,
      reasonableCollectionPotential,
      monthlyDisposable: disposableIncome
    };
  }, [totalDebt, debtType, annualIncome, totalAssets, monthlyExpenses, hasHardship, disputeValidity]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Settlement Options Calculator</h1>
      <p className="text-gray-600 mb-6">Evaluate all IRS settlement options based on your financial situation</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Tax Debt Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Tax Debt ($)</label>
            <input
              type="number"
              value={totalDebt}
              onChange={(e) => setTotalDebt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Debt Type</label>
            <select
              value={debtType}
              onChange={(e) => setDebtType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="income_tax">Income Tax</option>
              <option value="payroll_tax">Payroll Tax</option>
              <option value="business_tax">Business Tax</option>
              <option value="penalty_interest">Penalties & Interest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Debt Validity</label>
            <select
              value={disputeValidity}
              onChange={(e) => setDisputeValidity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="valid">Valid (Agreed liability)</option>
              <option value="disputed">Disputed (Question liability)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Situation</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Assets ($)</label>
            <input
              type="number"
              value={totalAssets}
              onChange={(e) => setTotalAssets(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3500"
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={hasHardship}
              onChange={(e) => setHasHardship(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">Financial hardship situation</span>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-teal-50 border border-teal-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Best Option: {result.bestOption?.name}</h3>
          <p className="text-gray-700 mb-4">{result.bestOption?.description}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-4 text-gray-700">
            <div>
              <h4 className="font-medium">Timeline</h4>
              <p className="text-lg font-bold">{result.bestOption?.timeline}</p>
            </div>
            <div>
              <h4 className="font-medium">Potential Savings</h4>
              <p className="text-lg font-bold text-teal-700">$${result.bestOption?.savings.toFixed(0)}</p>
            </div>
            <div>
              <h4 className="font-medium">RCP</h4>
              <p className="text-lg">$${result.reasonableCollectionPotential.toFixed(0)}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border">
            <p className="text-sm text-gray-600">
              Reasonable Collection Potential (RCP) = Assets + (Disposable Income × 60 months)
            </p>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">All Settlement Options</h3>
          <div className="space-y-3">
            {result.options.map((opt, i) => (
              <div key={i} className={`p-4 rounded-lg border ${opt.eligible ? 'bg-white border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{opt.name}</h4>
                    <p className="text-sm text-gray-600">{opt.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-sm ${opt.eligible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {opt.eligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Option Requirements</h3>
        <ul className="space-y-2 text-blue-700">
          <li>• <strong>Installment Agreement:</strong> Must have disposable income, debt payable within 72 months</li>
          <li>• <strong>Offer in Compromise:</strong> RCP must be less than total debt</li>
          <li>• <strong>Currently Not Collectible:</strong> No disposable income or severe hardship</li>
          <li>• <strong>OIC Doubt as to Liability:</strong> Legitimate dispute over tax owed</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Settlement eligibility depends on IRS evaluation of your complete financial situation. This calculator provides preliminary guidance. Consult a tax professional for actual IRS submissions.</p>
      </div>
    </div>
  );
}