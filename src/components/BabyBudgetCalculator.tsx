'use client';

import { useState, useMemo } from 'react';

export default function BabyBudgetCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('500');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [currentSpending, setCurrentSpending] = useState<string>('600');
  const [childAge, setChildAge] = useState<string>('newborn');
  const [diapersCost, setDiapersCost] = useState<string>('70');
  const [formulaCost, setFormulaCost] = useState<string>('100');
  const [clothingCost, setClothingCost] = useState<string>('50');
  const [childcareType, setChildcareType] = useState<string>('daycare');
  const [childcareCost, setChildcareCost] = useState<string>('800');
  const [medicalCost, setMedicalCost] = useState<string>('100');
  const [toysBooks, setToysBooks] = useState<string>('30');
  const [miscellaneous, setMiscellaneous] = useState<string>('50');
  const [parentLeaveMonths, setParentLeaveMonths] = useState<string>('3');
  const [incomeReplacement, setIncomeReplacement] = useState<string>('0');

  const result = useMemo(() => {
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const diapers = parseFloat(diapersCost) || 0;
    const formula = parseFloat(formulaCost) || 0;
    const clothing = parseFloat(clothingCost) || 0;
    const childcare = parseFloat(childcareCost) || 0;
    const medical = parseFloat(medicalCost) || 0;
    const toys = parseFloat(toysBooks) || 0;
    const misc = parseFloat(miscellaneous) || 0;
    const leaveMonths = parseFloat(parentLeaveMonths) || 0;
    const incomeLoss = parseFloat(incomeReplacement) || 0;

    // Age-based adjustments
    const ageMultipliers: Record<string, number> = { newborn: 1.2, infant: 1, toddler: 0.9, preschool: 0.7 };
    const ageMultiplier = ageMultipliers[childAge] || 1;

    // Adjust costs by age
    const adjustedDiapers = childAge === 'newborn' ? diapers * 1.5 : childAge === 'preschool' ? 0 : diapers;
    const adjustedFormula = childAge === 'newborn' || childAge === 'infant' ? formula : 0;
    const adjustedClothing = clothing * ageMultiplier;

    // Total monthly costs
    const monthlyEssentials = adjustedDiapers + adjustedFormula + adjustedClothing + childcare + medical;
    const monthlyTotal = monthlyEssentials + toys + misc;

    // Annual costs
    const annualCost = monthlyTotal * 12;

    // First year additional costs (one-time)
    const firstYearOneTime = 2000; // Nursery setup, stroller, car seat, etc

    // Parental leave impact
    const leaveIncomeLoss = incomeLoss * leaveMonths;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (monthlyTotal / income) * 100 : 0;

    // Category breakdown
    const categories = [
      { name: 'Diapers/Wipes', amount: adjustedDiapers, percent: (adjustedDiapers / monthlyTotal) * 100 },
      { name: 'Formula/Food', amount: adjustedFormula, percent: (adjustedFormula / monthlyTotal) * 100 },
      { name: 'Clothing', amount: adjustedClothing, percent: (adjustedClothing / monthlyTotal) * 100 },
      { name: 'Childcare', amount: childcare, percent: (childcare / monthlyTotal) * 100 },
      { name: 'Medical', amount: medical, percent: (medical / monthlyTotal) * 100 },
      { name: 'Toys/Books', amount: toys, percent: (toys / monthlyTotal) * 100 },
      { name: 'Miscellaneous', amount: misc, percent: (misc / monthlyTotal) * 100 }
    ].filter(c => c.amount > 0);

    // Childcare type comparison
    const childcareOptions = [
      { type: 'daycare', avg: 800, range: '600-1200' },
      { type: 'nanny', avg: 1500, range: '1200-2500' },
      { type: 'family', avg: 300, range: '0-500' },
      { type: 'stayHome', avg: 0, range: '0' }
    ];

    // Savings opportunities
    const savingsOpportunities: { action: string; savings: number }[] = [];

    if (childcareType === 'nanny' && childcare > 1200) {
      savingsOpportunities.push({ action: 'Consider daycare or nanny share', savings: childcare * 0.4 });
    }

    if (adjustedDiapers > 80) {
      savingsOpportunities.push({ action: 'Buy diapers in bulk or cloth diapers', savings: adjustedDiapers * 0.3 });
    }

    if (adjustedClothing > 50) {
      savingsOpportunities.push({ action: 'Buy secondhand or accept hand-me-downs', savings: adjustedClothing * 0.5 });
    }

    if (toys > 40) {
      savingsOpportunities.push({ action: 'Library toys, community swaps', savings: toys * 0.5 });
    }

    if (medical > 100) {
      savingsOpportunities.push({ action: 'Use pediatrician over ER for non-emergencies', savings: medical * 0.2 });
    }

    const totalPotentialSavings = savingsOpportunities.reduce((sum, o) => sum + o.savings, 0);

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - prioritize essentials');
    }

    if (childcare > income * 0.2) {
      recommendations.push('Childcare exceeds 20% income - explore alternatives or subsidies');
    }

    if (percentOfIncome > 15) {
      recommendations.push('Baby costs exceed 15% of income - review childcare options');
    }

    if (childAge === 'newborn' && formula > 80) {
      recommendations.push('Consider breastfeeding support to reduce formula costs');
    }

    if (leaveIncomeLoss > 0) {
      recommendations.push('Plan for $${leaveIncomeLoss.toFixed(0)} income loss during parental leave');
    }

    return {
      monthlyTotal,
      annualCost,
      firstYearOneTime,
      leaveIncomeLoss,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      categories,
      childcareOptions,
      savingsOpportunities,
      totalPotentialSavings,
      recommendations,
      budget,
      spending,
      childAge,
      childcareType,
      childcare
    };
  }, [monthlyBudget, monthlyIncome, currentSpending, childAge, diapersCost, formulaCost, clothingCost, childcareType, childcareCost, medicalCost, toysBooks, miscellaneous, parentLeaveMonths, incomeReplacement]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Baby Budget Calculator</h1>
      <p className="text-gray-600 mb-6">Plan expenses for your little one from newborn to preschool</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Budget Overview</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Baby Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Spending Estimate ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Child Age</label>
            <select
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="newborn">Newborn (0-6 months)</option>
              <option value="infant">Infant (6-12 months)</option>
              <option value="toddler">Toddler (1-3 years)</option>
              <option value="preschool">Preschool (3-5 years)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Expenses</h3>

          <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
            <h4 className="font-medium text-pink-800 mb-2">Essentials</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Diapers/Wipes ($)</label>
                <input
                  type="number"
                  value={diapersCost}
                  onChange={(e) => setDiapersCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Formula/Food ($)</label>
                <input
                  type="number"
                  value={formulaCost}
                  onChange={(e) => setFormulaCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clothing ($)</label>
              <input
                type="number"
                value={clothingCost}
                onChange={(e) => setClothingCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical ($)</label>
              <input
                type="number"
                value={medicalCost}
                onChange={(e) => setMedicalCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Childcare Type</label>
              <select
                value={childcareType}
                onChange={(e) => setChildcareType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="daycare">Daycare</option>
                <option value="nanny">Nanny</option>
                <option value="family">Family Care</option>
                <option value="stayHome">Stay-at-Home</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Childcare Cost ($)</label>
              <input
                type="number"
                value={childcareCost}
                onChange={(e) => setChildcareCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Toys/Books ($)</label>
              <input
                type="number"
                value={toysBooks}
                onChange={(e) => setToysBooks(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Miscellaneous ($)</label>
              <input
                type="number"
                value={miscellaneous}
                onChange={(e) => setMiscellaneous(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Parental Leave Planning</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Leave Months</label>
                <input
                  type="number"
                  value={parentLeaveMonths}
                  onChange={(e) => setParentLeaveMonths(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Income Loss ($/mo)</label>
                <input
                  type="number"
                  value={incomeReplacement}
                  onChange={(e) => setIncomeReplacement(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-pink-50 border border-pink-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Baby Budget Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-pink-700">$${result.monthlyTotal.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.childAge} stage</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Annual Cost</h4>
              <p className="text-xl font-bold text-blue-700">$${result.annualCost.toFixed(0)}</p>
              <p className="text-xs text-gray-500">+ $${result.firstYearOneTime} first-year setup</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Budget Status</h4>
              <p className={`text-xl font-bold ${result.isOverBudget ? 'text-red-700' : 'text-green-700'}`}>
                {result.isOverBudget ? '-' : '+'}$${Math.abs(result.budgetVariance).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500">{result.isOverBudget ? 'Over budget' : 'Under budget'}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Expense Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.categories.map((cat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{cat.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-pink-600">$${cat.amount.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cat.percent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 font-medium text-gray-700">
              Childcare ({result.childcareType}): $${result.childcare}/month
            </p>
          </div>

          {result.leaveIncomeLoss > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded mb-4">
              <h4 className="font-medium text-yellow-800">Parental Leave Impact</h4>
              <p className="text-sm mt-1 text-yellow-700">
                Income loss during leave: $${result.leaveIncomeLoss.toFixed(0)}
              </p>
              <p className="text-sm text-yellow-700">
                Plan savings to cover this gap before baby arrives
              </p>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
            <h4 className="font-medium text-blue-800">Childcare Cost Reference</h4>
            <p className="text-sm mt-1 text-blue-700">
              Daycare: $600-1,200/mo | Nanny: $1,200-2,500/mo | Family care: $0-500/mo
            </p>
            <p className="text-sm text-blue-700">
              Full-time daycare averages $800-1,000/month nationally
            </p>
          </div>

          {result.savingsOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Cost Reduction Ideas</h4>
              <div className="space-y-2 mt-2">
                {result.savingsOpportunities.map((opp, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">{opp.action}</span>
                    <span className="font-bold text-green-600">-$${opp.savings.toFixed(0)}/mo</span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Potential savings: <span className="font-bold text-green-700">$${result.totalPotentialSavings.toFixed(0)}/month</span>
              </p>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Baby Budget Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-pink-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> First-year baby costs average $12,000-15,000 including one-time purchases ($2,000 nursery setup). Monthly costs range $300-1,500 depending on childcare. Daycare is largest expense at $600-1,200/month. Nannies cost $1,200-2,500/month. Budget for parental leave income gap. Look for employer childcare subsidies, tax credits (Child Tax Credit $2,000/yr), and Dependent Care FSA ($5,000 pre-tax).</p>
      </div>
    </div>
  );
}