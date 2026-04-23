'use client';

import { useState, useMemo } from 'react';

export default function HomeDownPaymentCalculator() {
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>('1.2');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [pmiRate, setPmiRate] = useState<string>('0.5');
  const [currentSavings, setCurrentSavings] = useState<string>('50000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('1000');
  const [closingCostPercent, setClosingCostPercent] = useState<string>('3');

  const result = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const downPercent = parseFloat(downPaymentPercent) || 0;
    const term = parseFloat(loanTermYears) || 0;
    const rate = parseFloat(interestRate) || 0;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const pmi = parseFloat(pmiRate) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;
    const closingPercent = parseFloat(closingCostPercent) || 0;

    // Calculate down payment and loan
    const downPayment = price * (downPercent / 100);
    const loanAmount = price - downPayment;
    const closingCosts = price * (closingPercent / 100);
    const totalCashNeeded = downPayment + closingCosts;

    // Monthly mortgage payment
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    let monthlyMortgage = 0;
    if (monthlyRate > 0 && numPayments > 0) {
      monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    // Property tax and insurance monthly
    const monthlyPropertyTax = (price * taxRate / 100) / 12;
    const monthlyInsurance = insurance / 12;

    // PMI (if down payment less than 20%)
    const needsPMI = downPercent < 20;
    const monthlyPMI = needsPMI ? (loanAmount * pmi / 100) / 12 : 0;

    // Total monthly payment
    const totalMonthlyPayment = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

    // Total interest over loan term
    const totalLoanPayments = monthlyMortgage * numPayments;
    const totalInterest = totalLoanPayments - loanAmount;

    // Down payment scenarios
    const scenarios = [
      { percent: 3, label: '3% (Minimum conventional)', down: price * 0.03, loan: price * 0.97, pmiNeeded: true, monthly: 0 },
      { percent: 5, label: '5% (Low down payment)', down: price * 0.05, loan: price * 0.95, pmiNeeded: true, monthly: 0 },
      { percent: 10, label: '10%', down: price * 0.10, loan: price * 0.90, pmiNeeded: true, monthly: 0 },
      { percent: 20, label: '20% (No PMI)', down: price * 0.20, loan: price * 0.80, pmiNeeded: false, monthly: 0 }
    ];

    scenarios.forEach(s => {
      const sMonthlyRate = rate / 100 / 12;
      if (sMonthlyRate > 0 && numPayments > 0) {
        s.monthly = (s.loan * sMonthlyRate * Math.pow(1 + sMonthlyRate, numPayments)) / (Math.pow(1 + sMonthlyRate, numPayments) - 1);
        if (s.pmiNeeded) {
          s.monthly += (s.loan * pmi / 100) / 12;
        }
      }
    });

    // Savings timeline
    const shortfall = Math.max(0, totalCashNeeded - savings);
    const monthsToSave = contribution > 0 ? Math.ceil(shortfall / contribution) : 0;
    const canAffordNow = savings >= totalCashNeeded;

    // LTV ratio
    const ltvRatio = (loanAmount / price) * 100;

    // Recommendations
    const recommendations: string[] = [];

    if (downPercent < 20) {
      recommendations.push('Down payment below 20% - PMI required, adding $${monthlyPMI.toFixed(0)}/month');
    }

    if (ltvRatio > 80) {
      recommendations.push('LTV exceeds 80% - consider larger down payment or FHA loan options');
    }

    if (!canAffordNow) {
      recommendations.push('$${shortfall.toFixed(0)} shortfall for down payment + closing costs');
      recommendations.push('{monthsToSave} months to save at current contribution rate');
    }

    if (downPercent < 10) {
      recommendations.push('Very low down payment - higher risk and monthly payments');
    }

    if (rate > 7) {
      recommendations.push('Interest rate above 7% - consider improving credit score before purchase');
    }

    // 20% down saves PMI
    const pmiSavings = needsPMI ? monthlyPMI * numPayments : 0;
    if (pmiSavings > 0) {
      recommendations.push('20% down payment would save $${pmiSavings.toFixed(0)} in PMI over loan term');
    }

    return {
      downPayment,
      loanAmount,
      closingCosts,
      totalCashNeeded,
      monthlyMortgage,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthlyPayment,
      totalInterest,
      needsPMI,
      scenarios,
      shortfall,
      monthsToSave,
      canAffordNow,
      ltvRatio,
      recommendations,
      savings,
      price,
      term,
      numPayments
    };
  }, [homePrice, downPaymentPercent, loanTermYears, interestRate, propertyTaxRate, homeInsurance, pmiRate, currentSavings, monthlyContribution, closingCostPercent]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Down Payment Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate optimal down payment and financing for your home purchase</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Home Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="400000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
            <select
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="3">3% (Minimum conventional)</option>
              <option value="5">5% (Low down payment)</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20% (No PMI)</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
            <select
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6.5"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Tax Rate (%/year)</label>
            <input
              type="number"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1.2"
              step="0.1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional Costs &amp; Savings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Home Insurance ($)</label>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PMI Rate (%/year) - if applicable</label>
            <input
              type="number"
              value={pmiRate}
              onChange={(e) => setPmiRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.5"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">Typical 0.5-1% when down payment &lt; 20%</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs (%)</label>
            <input
              type="number"
              value={closingCostPercent}
              onChange={(e) => setClosingCostPercent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
              step="0.5"
            />
            <p className="text-xs text-gray-500 mt-1">Typical 2-5% of home price</p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Your Savings</h4>
            <div className="space-y-2">
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Current savings for down payment"
              />
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Monthly savings contribution"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Home Purchase Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Down Payment Needed</h4>
              <p className="text-xl font-bold text-emerald-700">$${result.downPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{downPaymentPercent}% of home price</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Total Cash Needed</h4>
              <p className="text-xl font-bold text-blue-700">$${result.totalCashNeeded.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Down payment + closing costs</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Monthly Payment</h4>
              <p className="text-xl font-bold text-purple-700">$${result.totalMonthlyPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">PITI + PMI if applicable</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Monthly Payment Breakdown</h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Principal + Interest</span>
                <span className="font-bold text-emerald-600">$${result.monthlyMortgage.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-bold text-emerald-600">$${result.monthlyPropertyTax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Home Insurance</span>
                <span className="font-bold text-emerald-600">$${result.monthlyInsurance.toFixed(0)}</span>
              </div>
              {result.needsPMI && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">PMI</span>
                  <span className="font-bold text-red-600">$${result.monthlyPMI.toFixed(0)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Down Payment Comparison</h4>
            <div className="grid md:grid-cols-4 gap-2 mt-2">
              {result.scenarios.map((s, i) => (
                <div key={i} className={`p-2 rounded text-center ${s.pmiNeeded ? 'bg-orange-50' : 'bg-green-100'}`}>
                  <p className="text-xs font-medium">{s.label}</p>
                  <p className="text-sm font-bold text-gray-700">Down: $${s.down.toFixed(0)}</p>
                  <p className="text-sm text-emerald-600">$${s.monthly.toFixed(0)}/mo</p>
                  {s.pmiNeeded && <p className="text-xs text-red-500">+ PMI</p>}
                </div>
              ))}
            </div>
          </div>

          <div className={`p-3 rounded border mb-4 ${result.canAffordNow ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <h4 className="font-medium ${result.canAffordNow ? 'text-green-800' : 'text-orange-800'}">Savings Status</h4>
            {result.canAffordNow ? (
              <p className="text-sm text-green-700">✓ You have enough savings for down payment and closing costs!</p>
            ) : (
              <p className="text-sm text-orange-700">
                $${result.shortfall.toFixed(0)} shortfall - {result.monthsToSave} months to save
              </p>
            )}
            <p className="text-sm text-gray-600 mt-1">
              Have: $${result.savings.toFixed(0)} | Need: $${result.totalCashNeeded.toFixed(0)}
            </p>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Purchase Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-emerald-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> 20% down payment eliminates PMI, saving thousands over loan term. Lower down payments (3-5%) are possible but increase monthly costs significantly. Closing costs (2-5%) are additional cash needed beyond down payment. Factor in moving costs, repairs, and reserves. Consider all-in monthly payment including taxes and insurance.</p>
      </div>
    </div>
  );
}