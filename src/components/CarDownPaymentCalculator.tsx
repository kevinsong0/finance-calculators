'use client';

import { useState, useMemo } from 'react';

export default function CarDownPaymentCalculator() {
  const [carPrice, setCarPrice] = useState<string>('35000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
  const [downPaymentAmount, setDownPaymentAmount] = useState<string>('7000');
  const [loanTermMonths, setLoanTermMonths] = useState<string>('60');
  const [interestRate, setInterestRate] = useState<string>('6');
  const [tradeInValue, setTradeInValue] = useState<string>('5000');
  const [salesTaxRate, setSalesTaxRate] = useState<string>('8');
  const [titleRegistration, setTitleRegistration] = useState<string>('500');
  const [currentSavings, setCurrentSavings] = useState<string>('8000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');

  const result = useMemo(() => {
    const price = parseFloat(carPrice) || 0;
    const downPercent = parseFloat(downPaymentPercent) || 0;
    const downAmount = parseFloat(downPaymentAmount) || 0;
    const term = parseFloat(loanTermMonths) || 0;
    const rate = parseFloat(interestRate) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const taxRate = parseFloat(salesTaxRate) || 0;
    const titleReg = parseFloat(titleRegistration) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;

    // Calculate effective down payment
    const standardDownPayment = price * (downPercent / 100);
    const effectiveDownPayment = downAmount > 0 ? downAmount : standardDownPayment;
    const totalDownPayment = effectiveDownPayment + tradeIn;

    // Calculate loan amount
    const taxablePrice = price - tradeIn;
    const salesTax = taxablePrice * (taxRate / 100);
    const loanAmount = price - totalDownPayment;

    // Monthly payment calculation (simple amortization)
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment = 0;
    if (monthlyRate > 0 && term > 0) {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    } else if (term > 0) {
      monthlyPayment = loanAmount / term;
    }

    // Total loan cost
    const totalLoanPayments = monthlyPayment * term;
    const totalInterest = totalLoanPayments - loanAmount;

    // Total car cost
    const totalCarCost = totalDownPayment + totalLoanPayments + salesTax + titleReg;

    // Down payment scenarios
    const scenarios = [
      { percent: 0, label: '0% (No down payment)', down: 0, loan: price, payment: 0, total: 0 },
      { percent: 10, label: '10%', down: price * 0.1, loan: price * 0.9, payment: 0, total: 0 },
      { percent: 20, label: '20% (Recommended)', down: price * 0.2, loan: price * 0.8, payment: 0, total: 0 },
      { percent: 30, label: '30%', down: price * 0.3, loan: price * 0.7, payment: 0, total: 0 }
    ];

    scenarios.forEach(s => {
      if (monthlyRate > 0 && term > 0) {
        s.payment = (s.loan * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      } else if (term > 0) {
        s.payment = s.loan / term;
      }
      s.total = s.payment * term;
    });

    // Savings analysis
    const cashNeeded = effectiveDownPayment + salesTax + titleReg;
    const shortfall = Math.max(0, cashNeeded - savings);
    const monthsToSave = contribution > 0 ? Math.ceil(shortfall / contribution) : 0;
    const canAffordNow = savings >= cashNeeded;

    // LTV ratio
    const ltvRatio = (loanAmount / price) * 100;

    // Recommendations
    const recommendations: string[] = [];

    if (ltvRatio > 80) {
      recommendations.push('Loan exceeds 80% LTV - consider larger down payment or gap insurance');
    }

    if (downPercent < 10) {
      recommendations.push('Down payment below 10% - higher monthly payments and more interest');
    }

    if (!canAffordNow) {
      recommendations.push('$${shortfall.toFixed(0)} shortfall - need {monthsToSave} months to save');
    }

    if (term > 60) {
      recommendations.push('Long loan term (over 5 years) - consider shorter term for less interest');
    }

    if (rate > 8) {
      recommendations.push('High interest rate - improve credit score or seek better financing');
    }

    if (tradeIn > price * 0.3) {
      recommendations.push('High trade-in value - negotiate selling privately for better return');
    }

    // Quick tip: 20% down saves significant interest
    const savings20vs0 = scenarios[3].total - scenarios[0].total;

    return {
      loanAmount,
      effectiveDownPayment,
      totalDownPayment,
      monthlyPayment,
      totalLoanPayments,
      totalInterest,
      totalCarCost,
      salesTax,
      scenarios,
      cashNeeded,
      shortfall,
      monthsToSave,
      canAffordNow,
      ltvRatio,
      recommendations,
      savings,
      price
    };
  }, [carPrice, downPaymentPercent, downPaymentAmount, loanTermMonths, interestRate, tradeInValue, salesTaxRate, titleRegistration, currentSavings, monthlyContribution]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Down Payment Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate optimal down payment and financing for your car purchase</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Car Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Price ($)</label>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="35000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
            <input
              type="number"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="20"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Or Specific Down Payment Amount ($)</label>
            <input
              type="number"
              value={downPaymentAmount}
              onChange={(e) => setDownPaymentAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="7000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trade-In Value ($)</label>
            <input
              type="number"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (months)</label>
            <select
              value={loanTermMonths}
              onChange={(e) => setLoanTermMonths(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="24">24 months (2 years)</option>
              <option value="36">36 months (3 years)</option>
              <option value="48">48 months (4 years)</option>
              <option value="60">60 months (5 years)</option>
              <option value="72">72 months (6 years)</option>
              <option value="84">84 months (7 years)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Financing &amp; Savings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sales Tax Rate (%)</label>
            <input
              type="number"
              value={salesTaxRate}
              onChange={(e) => setSalesTaxRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="8"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title/Registration ($)</label>
            <input
              type="number"
              value={titleRegistration}
              onChange={(e) => setTitleRegistration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Your Savings</h4>
            <div className="space-y-2">
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Current savings"
              />
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Monthly contribution"
              />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Car Purchase Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Payment</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.monthlyPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">For {loanTermMonths} months</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Total Down Payment</h4>
              <p className="text-xl font-bold text-green-700">$${result.totalDownPayment.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Including trade-in</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Total Interest</h4>
              <p className="text-xl font-bold text-red-700">$${result.totalInterest.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Over loan term</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Down Payment Comparison</h4>
            <div className="grid md:grid-cols-4 gap-2 mt-2">
              {result.scenarios.map((s, i) => (
                <div key={i} className={`p-2 rounded text-center ${s.percent === 20 ? 'bg-blue-100 border-blue-300' : 'bg-gray-50'}`}>
                  <p className="text-xs font-medium">{s.label}</p>
                  <p className="text-sm font-bold text-gray-700">Down: $${s.down.toFixed(0)}</p>
                  <p className="text-sm text-indigo-600">$${s.payment.toFixed(0)}/mo</p>
                  <p className="text-xs text-gray-500">Total: $${s.total.toFixed(0)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Loan Details</h4>
              <p className="text-sm mt-1">Loan Amount: <span className="font-bold text-indigo-600">$${result.loanAmount.toFixed(0)}</span></p>
              <p className="text-sm">LTV Ratio: <span className={`font-bold ${result.ltvRatio > 80 ? 'text-red-600' : 'text-green-600'}`}>
                {result.ltvRatio.toFixed(1)}%
              </span></p>
              <p className="text-sm">Sales Tax: <span className="font-bold">$${result.salesTax.toFixed(0)}</span></p>
              <p className="text-sm">Total Cost: <span className="font-bold">$${result.totalCarCost.toFixed(0)}</span></p>
            </div>
            <div className={`p-3 rounded border ${result.canAffordNow ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
              <h4 className="font-medium ${result.canAffordNow ? 'text-green-800' : 'text-orange-800'}">Savings Status</h4>
              {result.canAffordNow ? (
                <p className="text-sm text-green-700">✓ You have enough savings for the down payment!</p>
              ) : (
                <p className="text-sm text-orange-700">
                  $${result.shortfall.toFixed(0)} shortfall - {result.monthsToSave} months to save
                </p>
              )}
              <p className="text-sm text-gray-600 mt-1">Cash needed: $${result.cashNeeded.toFixed(0)}</p>
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Purchase Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-indigo-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Recommended down payment is 20% to avoid negative equity and reduce interest. 0% down leads to highest payments and risk. Consider gap insurance if LTV exceeds 80%. Shop around for best financing rates. Trade-in value reduces both down payment needed and taxable amount.</p>
      </div>
    </div>
  );
}