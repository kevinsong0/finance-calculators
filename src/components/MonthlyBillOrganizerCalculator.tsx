'use client';

import { useState, useMemo } from 'react';

export default function MonthlyBillOrganizerCalculator() {
  const [electricBill, setElectricBill] = useState<string>('120');
  const [gasBill, setGasBill] = useState<string>('50');
  const [waterBill, setWaterBill] = useState<string>('30');
  const [internetBill, setInternetBill] = useState<string>('60');
  const [phoneBill, setPhoneBill] = useState<string>('80');
  const [cableBill, setCableBill] = useState<string>('0');
  const [streamingServices, setStreamingServices] = useState<string>('30');
  const [insurancePremium, setInsurancePremium] = useState<string>('150');
  const [loanPayment1, setLoanPayment1] = useState<string>('350');
  const [loanPayment2, setLoanPayment2] = useState<string>('0');
  const [subscriptionServices, setSubscriptionServices] = useState<string>('20');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('4000');
  const [paymentStrategy, setPaymentStrategy] = useState<string>('spread');

  const result = useMemo(() => {
    const electric = parseFloat(electricBill) || 0;
    const gas = parseFloat(gasBill) || 0;
    const water = parseFloat(waterBill) || 0;
    const internet = parseFloat(internetBill) || 0;
    const phone = parseFloat(phoneBill) || 0;
    const cable = parseFloat(cableBill) || 0;
    const streaming = parseFloat(streamingServices) || 0;
    const insurance = parseFloat(insurancePremium) || 0;
    const loan1 = parseFloat(loanPayment1) || 0;
    const loan2 = parseFloat(loanPayment2) || 0;
    const subscriptions = parseFloat(subscriptionServices) || 0;
    const income = parseFloat(monthlyIncome) || 0;

    // Total bills
    const totalBills = electric + gas + water + internet + phone + cable + streaming + insurance + loan1 + loan2 + subscriptions;

    // Bill categories
    const billCategories = [
      { name: 'Electric', amount: electric, dueDay: 15, category: 'utility', autopay: false },
      { name: 'Gas', amount: gas, dueDay: 20, category: 'utility', autopay: false },
      { name: 'Water', amount: water, dueDay: 25, category: 'utility', autopay: false },
      { name: 'Internet', amount: internet, dueDay: 1, category: 'utility', autopay: true },
      { name: 'Phone', amount: phone, dueDay: 5, category: 'communication', autopay: true },
      { name: 'Cable', amount: cable, dueDay: 10, category: 'entertainment', autopay: false },
      { name: 'Streaming Services', amount: streaming, dueDay: 1, category: 'entertainment', autopay: true },
      { name: 'Insurance', amount: insurance, dueDay: 1, category: 'insurance', autopay: true },
      { name: 'Loan Payment 1', amount: loan1, dueDay: 15, category: 'debt', autopay: false },
      { name: 'Loan Payment 2', amount: loan2, dueDay: 20, category: 'debt', autopay: false },
      { name: 'Subscriptions', amount: subscriptions, dueDay: 1, category: 'subscription', autopay: true }
    ].filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);

    // Category totals
    const utilities = electric + gas + water + internet;
    const entertainment = cable + streaming;
    const communication = phone;
    const debtPayments = loan1 + loan2;
    const subscriptionsTotal = subscriptions;

    // Bill timing analysis
    const billsByDueDate = [...billCategories].sort((a, b) => a.dueDay - b.dueDay);
    const firstHalfBills = billCategories.filter(b => b.dueDay <= 15).reduce((sum, b) => sum + b.amount, 0);
    const secondHalfBills = billCategories.filter(b => b.dueDay > 15).reduce((sum, b) => sum + b.amount, 0);

    // Payment schedule based on strategy
    let paymentSchedule: { week: number; amount: number; bills: string[] }[] = [];

    if (paymentStrategy === 'spread') {
      // Distribute bills across 4 weeks
      const weeklyBudget = totalBills / 4;
      paymentSchedule = [
        { week: 1, amount: firstHalfBills * 0.5 + secondHalfBills * 0.25, bills: ['Early month bills'] },
        { week: 2, amount: firstHalfBills * 0.5 + secondHalfBills * 0.25, bills: ['Mid-month bills'] },
        { week: 3, amount: secondHalfBills * 0.25, bills: ['Late month bills'] },
        { week: 4, amount: secondHalfBills * 0.25, bills: ['End month bills'] }
      ];
    } else if (paymentStrategy === 'front') {
      // Pay all bills in first half
      paymentSchedule = [
        { week: 1, amount: totalBills, bills: ['All bills'] },
        { week: 2, amount: 0, bills: [] },
        { week: 3, amount: 0, bills: [] },
        { week: 4, amount: 0, bills: [] }
      ];
    } else {
      // Pay bills as they come due
      paymentSchedule = [
        { week: 1, amount: billsByDueDate.filter(b => b.dueDay <= 7).reduce((s, b) => s + b.amount, 0), bills: billsByDueDate.filter(b => b.dueDay <= 7).map(b => b.name) },
        { week: 2, amount: billsByDueDate.filter(b => b.dueDay > 7 && b.dueDay <= 14).reduce((s, b) => s + b.amount, 0), bills: billsByDueDate.filter(b => b.dueDay > 7 && b.dueDay <= 14).map(b => b.name) },
        { week: 3, amount: billsByDueDate.filter(b => b.dueDay > 14 && b.dueDay <= 21).reduce((s, b) => s + b.amount, 0), bills: billsByDueDate.filter(b => b.dueDay > 14 && b.dueDay <= 21).map(b => b.name) },
        { week: 4, amount: billsByDueDate.filter(b => b.dueDay > 21).reduce((s, b) => s + b.amount, 0), bills: billsByDueDate.filter(b => b.dueDay > 21).map(b => b.name) }
      ];
    }

    // Autopay analysis
    const autopayBills = billCategories.filter(b => b.autopay);
    const autopayTotal = autopayBills.reduce((sum, b) => sum + b.amount, 0);
    const manualBills = billCategories.filter(b => !b.autopay);
    const manualTotal = manualBills.reduce((sum, b) => sum + b.amount, 0);

    // Optimization opportunities
    const optimizations: string[] = [];

    if (cable > 50 && streaming > 20) {
      optimizations.push('Consider canceling cable if streaming services cover needs - save $${cable.toFixed(0)}/month');
    }

    if (phone > 80) {
      optimizations.push('High phone bill - consider switching to cheaper plan or carrier');
    }

    if (subscriptions > 30) {
      optimizations.push('Multiple subscriptions - review and cancel unused services');
    }

    if (manualTotal > autopayTotal * 1.5) {
      optimizations.push('Many manual payments - consider autopay for convenience and avoiding late fees');
    }

    if (internet > 70) {
      optimizations.push('High internet cost - check for competitor offers or negotiate rate');
    }

    // Remaining income
    const remainingIncome = income - totalBills;
    const billRatio = (totalBills / income) * 100;

    return {
      totalBills,
      billCategories,
      utilities,
      entertainment,
      communication,
      debtPayments,
      subscriptionsTotal,
      firstHalfBills,
      secondHalfBills,
      paymentSchedule,
      autopayTotal,
      manualTotal,
      autopayBills,
      manualBills,
      optimizations,
      remainingIncome,
      billRatio,
      income
    };
  }, [electricBill, gasBill, waterBill, internetBill, phoneBill, cableBill, streamingServices, insurancePremium, loanPayment1, loanPayment2, subscriptionServices, monthlyIncome, paymentStrategy]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Monthly Bill Organizer Calculator</h1>
      <p className="text-gray-600 mb-6">Organize recurring bills and optimize payment schedules</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Utility Bills</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Electric Bill ($)</label>
            <input
              type="number"
              value={electricBill}
              onChange={(e) => setElectricBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gas Bill ($)</label>
            <input
              type="number"
              value={gasBill}
              onChange={(e) => setGasBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Water Bill ($)</label>
            <input
              type="number"
              value={waterBill}
              onChange={(e) => setWaterBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internet Bill ($)</label>
            <input
              type="number"
              value={internetBill}
              onChange={(e) => setInternetBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Bill ($)</label>
            <input
              type="number"
              value={phoneBill}
              onChange={(e) => setPhoneBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="80"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Other Bills & Payments</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cable TV ($)</label>
            <input
              type="number"
              value={cableBill}
              onChange={(e) => setCableBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Streaming Services ($)</label>
            <input
              type="number"
              value={streamingServices}
              onChange={(e) => setStreamingServices(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
            <p className="text-xs text-gray-500 mt-1">Netflix, Hulu, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Premium ($)</label>
            <input
              type="number"
              value={insurancePremium}
              onChange={(e) => setInsurancePremium(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Payment 1 ($)</label>
            <input
              type="number"
              value={loanPayment1}
              onChange={(e) => setLoanPayment1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="350"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Payment 2 ($)</label>
            <input
              type="number"
              value={loanPayment2}
              onChange={(e) => setLoanPayment2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Subscriptions ($)</label>
            <input
              type="number"
              value={subscriptionServices}
              onChange={(e) => setSubscriptionServices(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="4000"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Payment Strategy</h4>
        <select
          value={paymentStrategy}
          onChange={(e) => setPaymentStrategy(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="spread">Spread payments across month</option>
          <option value="front">Pay all bills early in month</option>
          <option value="due">Pay bills as they come due</option>
        </select>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Bill Organization Summary</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Monthly Bills</h4>
              <p className="text-xl font-bold text-blue-700">$${result.totalBills.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{((result.totalBills / result.income) * 100).toFixed(1)}% of income</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Remaining Income</h4>
              <p className={`text-xl font-bold ${result.remainingIncome >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                $${result.remainingIncome.toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">After all bills</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Number of Bills</h4>
              <p className="text-xl font-bold text-purple-700">{result.billCategories.length}</p>
              <p className="text-xs text-gray-500">Recurring payments</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Bill Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.billCategories.map((bill, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{bill.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-blue-600">$${bill.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-2">Due: Day {bill.dueDay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Payment Schedule</h4>
            <div className="grid md:grid-cols-4 gap-2 mt-2">
              {result.paymentSchedule.map((week, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded text-center">
                  <p className="text-sm font-medium">Week {week.week}</p>
                  <p className="text-lg font-bold text-blue-600">$${week.amount.toFixed(0)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Autopay vs Manual</h4>
              <p className="text-sm mt-1">Autopay: <span className="font-bold text-green-600">$${result.autopayTotal.toFixed(0)}</span> ({result.autopayBills.length} bills)</p>
              <p className="text-sm">Manual: <span className="font-bold text-orange-600">$${result.manualTotal.toFixed(0)}</span> ({result.manualBills.length} bills)</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">First Half vs Second Half</h4>
              <p className="text-sm mt-1">Days 1-15: <span className="font-bold text-blue-600">$${result.firstHalfBills.toFixed(0)}</span></p>
              <p className="text-sm">Days 16-31: <span className="font-bold text-purple-600">$${result.secondHalfBills.toFixed(0)}</span></p>
            </div>
          </div>

          {result.optimizations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Optimization Opportunities</h4>
              <ul className="mt-2 space-y-1">
                {result.optimizations.map((opt, i) => (
                  <li key={i} className="text-sm text-green-600">💡 {opt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Autopay recommended for fixed recurring bills to avoid late fees. Review subscriptions monthly for unused services. Bill timing affects cash flow - spreading payments reduces single-day burden. Consider bill consolidation where possible. Negotiate rates annually with service providers.</p>
      </div>
    </div>
  );
}