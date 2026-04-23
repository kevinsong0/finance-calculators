'use client';

import { useState, useMemo } from 'react';

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTerm, setLoanTerm] = useState<string>('36');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('300');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [loanPurpose, setLoanPurpose] = useState<string>('personal');
  const [creditScore, setCreditScore] = useState<string>('good');
  const [comparisonRate1, setComparisonRate1] = useState<string>('7.5');
  const [comparisonRate2, setComparisonRate2] = useState<string>('10');
  const [comparisonTerm1, setComparisonTerm1] = useState<string>('24');
  const [comparisonTerm2, setComparisonTerm2] = useState<string>('48');
  const [originationFee, setOriginationFee] = useState<string>('0');
  const [otherFees, setOtherFees] = useState<string>('0');

  const result = useMemo(() => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const compRate1 = parseFloat(comparisonRate1) || 0;
    const compRate2 = parseFloat(comparisonRate2) || 0;
    const compTerm1 = parseFloat(comparisonTerm1) || 0;
    const compTerm2 = parseFloat(comparisonTerm2) || 0;
    const fee = parseFloat(originationFee) || 0;
    const other = parseFloat(otherFees) || 0;

    // Calculate monthly payment (standard amortization)
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = term > 0 && rate > 0
      ? amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
      : term > 0 ? amount / term : 0;

    // Total cost
    const totalPayments = monthlyPayment * term;
    const totalInterest = totalPayments - amount;
    const totalCost = amount + fee + other + totalInterest;

    // Budget analysis
    const budgetVariance = budget - monthlyPayment;
    const isOverBudget = monthlyPayment > budget;
    const percentOfIncome = income > 0 ? (monthlyPayment / income) * 100 : 0;

    // Comparison calculations
    const comp1Rate = compRate1 / 100 / 12;
    const comp1Payment = compTerm1 > 0 && compRate1 > 0
      ? amount * (comp1Rate * Math.pow(1 + comp1Rate, compTerm1)) / (Math.pow(1 + comp1Rate, compTerm1) - 1)
      : compTerm1 > 0 ? amount / compTerm1 : 0;
    const comp1Total = comp1Payment * compTerm1;

    const comp2Rate = compRate2 / 100 / 12;
    const comp2Payment = compTerm2 > 0 && compRate2 > 0
      ? amount * (comp2Rate * Math.pow(1 + comp2Rate, compTerm2)) / (Math.pow(1 + comp2Rate, compTerm2) - 1)
      : compTerm2 > 0 ? amount / compTerm2 : 0;
    const comp2Total = comp2Payment * compTerm2;

    // Credit score rate adjustment estimates
    const creditRates: Record<string, number> = { excellent: 6, good: 8.5, fair: 12, poor: 18 };
    const estimatedRate = creditRates[creditScore] || 8.5;

    // Loan purpose considerations
    const purposeRates: Record<string, string> = {
      personal: 'Variable, often 6-36%',
      consolidation: 'Often lower, 5-15%',
      home: 'May qualify for secured rates',
      medical: 'May have special programs',
      education: 'Student loans often better',
      emergency: 'Higher rates for speed'
    };

    // Early payoff analysis
    const extraPaymentOptions = [50, 100, 200].map(extra => {
      const newPayment = monthlyPayment + extra;
      const newPrincipal = amount;
      const newMonthlyRate = monthlyRate;
      let monthsRemaining = term;
      let balance = newPrincipal;
      while (balance > 0 && monthsRemaining > 0) {
        const interestPayment = balance * newMonthlyRate;
        const principalPayment = newPayment - interestPayment;
        balance = Math.max(0, balance - principalPayment);
        monthsRemaining--;
      }
      const savedInterest = totalInterest - (newPayment * monthsRemaining - newPrincipal);
      return { extra, monthsRemaining, savedInterest };
    });

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Payment over budget by $${Math.abs(budgetVariance).toFixed(0)} - consider longer term');
    }

    if (percentOfIncome > 10) {
      recommendations.push('Payment exceeds 10% of income - review loan necessity');
    }

    if (rate > estimatedRate + 3) {
      recommendations.push('Rate higher than expected for your credit - shop around');
    }

    if (fee > amount * 0.05) {
      recommendations.push('High origination fee (>5%) - negotiate or compare lenders');
    }

    if (term < 24 && monthlyPayment > budget * 1.5) {
      recommendations.push('Short term with high payment - consider extending term');
    }

    if (creditScore === 'poor' && rate > 15) {
      recommendations.push('Poor credit with high rate - consider improving credit first');
    }

    return {
      monthlyPayment,
      totalPayments,
      totalInterest,
      totalCost,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      comp1Payment,
      comp1Total,
      comp2Payment,
      comp2Total,
      estimatedRate,
      purposeRates,
      extraPaymentOptions,
      recommendations,
      amount,
      rate,
      term,
      budget,
      income,
      creditScore,
      loanPurpose,
      fee,
      other
    };
  }, [loanAmount, interestRate, loanTerm, monthlyBudget, monthlyIncome, loanPurpose, creditScore, comparisonRate1, comparisonRate2, comparisonTerm1, comparisonTerm2, originationFee, otherFees]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Loan Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate personal loan payments, compare options, and analyze total cost</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Loan Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="8.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Term (months)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="36"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
            <select
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="personal">Personal Use</option>
              <option value="consolidation">Debt Consolidation</option>
              <option value="home">Home Improvement</option>
              <option value="medical">Medical Expenses</option>
              <option value="education">Education</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score Estimate</label>
            <select
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="excellent">Excellent (720+)</option>
              <option value="good">Good (680-719)</option>
              <option value="fair">Fair (640-679)</option>
              <option value="poor">Poor (under 640)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget ($)</label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="300"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origination Fee ($)</label>
              <input
                type="number"
                value={originationFee}
                onChange={(e) => setOriginationFee(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Fees ($)</label>
              <input
                type="number"
                value={otherFees}
                onChange={(e) => setOtherFees(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Compare Options</h3>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Option 1 (Lower Rate)</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={comparisonRate1}
                  onChange={(e) => setComparisonRate1(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="7.5"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Term (mo)</label>
                <input
                  type="number"
                  value={comparisonTerm1}
                  onChange={(e) => setComparisonTerm1(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="24"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-800 mb-2">Option 2 (Higher Rate/Longer Term)</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={comparisonRate2}
                  onChange={(e) => setComparisonRate2(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Term (mo)</label>
                <input
                  type="number"
                  value={comparisonTerm2}
                  onChange={(e) => setComparisonTerm2(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="48"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Personal Loan Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Payment</h4>
              <p className="text-xl font-bold text-purple-700">$${result.monthlyPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.term} months at {result.rate}%</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Total Interest</h4>
              <p className="text-xl font-bold text-red-700">$${result.totalInterest.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Over full term</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Budget Status</h4>
              <p className={"text-xl font-bold " + (result.isOverBudget ? 'text-red-700' : 'text-green-700')}>
                {result.isOverBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.isOverBudget ? 'Over budget' : 'Under budget'}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Total Cost Breakdown</h4>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Principal</span>
                <span className="font-bold text-purple-600">$${result.amount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Interest</span>
                <span className="font-bold text-red-600">$${result.totalInterest.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Fees</span>
                <span className="font-bold text-amber-600">$${(result.fee + result.other).toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium pt-1 border-t">
                <span className="text-gray-800">Total Cost</span>
                <span className="font-bold text-purple-800">$${result.totalCost.toFixed(0)}</span>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              {result.percentOfIncome.toFixed(1)}% of monthly income
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Comparison</h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-sm p-2 bg-blue-50 rounded">
                <span className="text-gray-600">Current: {result.rate}% / {result.term}mo</span>
                <span className="font-bold text-blue-600">$${result.monthlyPayment.toFixed(0)}/mo (Total: $${result.totalPayments.toFixed(0)})</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-green-50 rounded">
                <span className="text-gray-600">Option 1: {result.comp1Payment > 0 ? '$' + result.comp1Payment.toFixed(0) + '/mo' : 'N/A'}</span>
                <span className="font-bold text-green-600">{result.comp1Total > 0 ? 'Total: $' + result.comp1Total.toFixed(0) : '-'}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-amber-50 rounded">
                <span className="text-gray-600">Option 2: {result.comp2Payment > 0 ? '$' + result.comp2Payment.toFixed(0) + '/mo' : 'N/A'}</span>
                <span className="font-bold text-amber-600">{result.comp2Total > 0 ? 'Total: $' + result.comp2Total.toFixed(0) : '-'}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Rate Estimate by Credit Score</h4>
            <p className="text-sm mt-1 text-blue-700">
              Your credit ({result.creditScore}): Expected ~{result.estimatedRate}% | Current: {result.rate}%
            </p>
            <p className="text-sm text-blue-700">
              Excellent: 6% | Good: 8.5% | Fair: 12% | Poor: 18%
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Early Payoff Options</h4>
            <div className="space-y-2 mt-2">
              {result.extraPaymentOptions.map((opt, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">+ $${opt.extra}/month extra</span>
                  <div className="text-right">
                    <span className="font-bold text-green-600">{opt.monthsRemaining} months</span>
                    <span className="text-xs text-gray-500 ml-1">(Save $${opt.savedInterest.toFixed(0)})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Loan Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-purple-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Personal loan rates range 6-36% based on credit score. Excellent credit (720+): 6-10%. Good (680-719): 8-15%. Fair (640-679): 12-20%. Poor (under 640): 18-36%. Terms typically 12-60 months. Origination fees 0-8%. Compare multiple lenders for best rate. Pre-qualification doesn't affect credit. Consider secured loans for lower rates. Pay off early if possible to save interest. Avoid payday loans (300%+ APR).</p>
      </div>
    </div>
  );
}