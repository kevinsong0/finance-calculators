'use client';

import { useState, useMemo } from 'react';

export default function ChildCareCostCalculator() {
  const [numberOfChildren, setNumberOfChildren] = useState<string>('2');
  const [childAges, setChildAges] = useState<string>('3,5');
  const [careType, setCareType] = useState<string>('daycare');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('1500');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('6000');
  const [currentSpending, setCurrentSpending] = useState<string>('1800');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [daycareCost, setDaycareCost] = useState<string>('1200');
  const [nannyCost, setNannyCost] = useState<string>('18');
  const [babysitterCost, setBabysitterCost] = useState<string>('15');
  const [babysitterHours, setBabysitterHours] = useState<string>('10');
  const [afterSchoolCost, setAfterSchoolCost] = useState<string>('300');
  const [summerCampCost, setSummerCampCost] = useState<string>('2000');
  const [otherCareCost, setOtherCareCost] = useState<string>('0');

  const result = useMemo(() => {
    const children = parseFloat(numberOfChildren) || 1;
    const budget = parseFloat(monthlyBudget) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const spending = parseFloat(currentSpending) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const daycare = parseFloat(daycareCost) || 0;
    const nannyRate = parseFloat(nannyCost) || 0;
    const babysitterRate = parseFloat(babysitterCost) || 0;
    const babysitterHrs = parseFloat(babysitterHours) || 0;
    const afterSchool = parseFloat(afterSchoolCost) || 0;
    const summerCamp = parseFloat(summerCampCost) || 0;
    const other = parseFloat(otherCareCost) || 0;

    // Calculate costs based on care type
    let monthlyCareCost = 0;
    if (careType === 'daycare') {
      monthlyCareCost = daycare * children;
    } else if (careType === 'nanny') {
      monthlyCareCost = nannyRate * hours * 4; // Weekly hours * 4 weeks
    } else if (careType === 'babysitter') {
      monthlyCareCost = babysitterRate * babysitterHrs * 4;
    } else if (careType === 'mixed') {
      monthlyCareCost = daycare * 0.5 + (nannyRate * hours * 4 * 0.3);
    }

    const monthlyAfterSchool = afterSchool;
    const monthlySummerCamp = summerCamp / 12; // Annualized
    const monthlyOther = other;

    const totalMonthly = monthlyCareCost + monthlyAfterSchool + monthlySummerCamp + monthlyOther + (babysitterRate * babysitterHrs * 4);
    const totalAnnual = totalMonthly * 12;

    // Budget analysis
    const budgetVariance = budget - spending;
    const isOverBudget = spending > budget;
    const percentOfIncome = income > 0 ? (spending / income) * 100 : 0;

    // Per child cost
    const perChildMonthly = totalMonthly / children;
    const perChildAnnual = perChildMonthly * 12;

    // Cost comparison by type
    const careOptions = [
      { type: 'Daycare', cost: daycare * children, pros: 'Structured, social', cons: 'Fixed hours' },
      { type: 'Nanny', cost: nannyRate * hours * 4, pros: 'Flexible, personalized', cons: 'Higher cost' },
      { type: 'Babysitter (part-time)', cost: babysitterRate * babysitterHrs * 4, pros: 'Low cost, occasional', cons: 'Limited availability' },
      { type: 'Family care', cost: 0, pros: 'Free, trusted', cons: 'Availability dependent' }
    ];

    // Age-based considerations
    const ageConsiderations: string[] = [];
    const ages = childAges.split(',').map(a => parseFloat(a.trim()) || 0);
    ages.forEach(age => {
      if (age < 1) {
        ageConsiderations.push('Infant care is most expensive (50-100% higher)');
      } else if (age < 3) {
        ageConsiderations.push('Toddler care requires higher staff ratios');
      } else if (age >= 5) {
        ageConsiderations.push('School-age: consider after-school programs');
      }
    });

    // Recommendations
    const recommendations: string[] = [];

    if (isOverBudget) {
      recommendations.push('Over budget by $${Math.abs(budgetVariance).toFixed(0)} - explore alternatives');
    }

    if (percentOfIncome > 25) {
      recommendations.push('Childcare exceeds 25% of income - typical is 10-20%');
    }

    if (nannyRate * hours * 4 > daycare * 1.5) {
      recommendations.push('Nanny significantly more expensive - consider daycare');
    }

    if (children > 2 && careType === 'nanny') {
      recommendations.push('Nanny may be cost-effective for multiple children');
    }

    if (hours < 30 && careType === 'daycare') {
      recommendations.push('Part-time needs - consider nanny share or flexible daycare');
    }

    // Tax benefits
    const dependentCareCredit = Math.min(totalAnnual, 6000) * 0.2; // 20% credit up to $6000

    return {
      totalMonthly,
      totalAnnual,
      perChildMonthly,
      perChildAnnual,
      budgetVariance,
      isOverBudget,
      percentOfIncome,
      careOptions,
      ageConsiderations,
      recommendations,
      dependentCareCredit,
      budget,
      spending,
      children,
      hours,
      careType
    };
  }, [numberOfChildren, childAges, careType, monthlyBudget, monthlyIncome, currentSpending, hoursPerWeek, daycareCost, nannyCost, babysitterCost, babysitterHours, afterSchoolCost, summerCampCost, otherCareCost]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Child Care Cost Calculator</h1>
      <p className="text-gray-600 mb-6">Compare childcare options and budget for daycare, nanny, and other care</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Family Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
            <input
              type="number"
              value={numberOfChildren}
              onChange={(e) => setNumberOfChildren(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Children Ages (comma-separated)</label>
            <input
              type="text"
              value={childAges}
              onChange={(e) => setChildAges(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3,5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Care Type</label>
            <select
              value={careType}
              onChange={(e) => setCareType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daycare">Daycare Center</option>
              <option value="nanny">Nanny</option>
              <option value="babysitter">Babysitter (part-time)</option>
              <option value="mixed">Mixed/Combination</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Care Hours per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Childcare Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Spending ($)</label>
            <input
              type="number"
              value={currentSpending}
              onChange={(e) => setCurrentSpending(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1800"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Care Costs</h3>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Primary Care Costs</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Daycare ($/child/mo)</label>
                <input
                  type="number"
                  value={daycareCost}
                  onChange={(e) => setDaycareCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="1200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700">Nanny Rate ($/hr)</label>
                <input
                  type="number"
                  value={nannyCost}
                  onChange={(e) => setNannyCost(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="18"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Babysitter Rate ($/hr)</label>
              <input
                type="number"
                value={babysitterCost}
                onChange={(e) => setBabysitterCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Babysitter Hours/Week</label>
              <input
                type="number"
                value={babysitterHours}
                onChange={(e) => setBabysitterHours(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">After-School ($/mo)</label>
              <input
                type="number"
                value={afterSchoolCost}
                onChange={(e) => setAfterSchoolCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summer Camp (Annual $)</label>
              <input
                type="number"
                value={summerCampCost}
                onChange={(e) => setSummerCampCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income ($)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Care Costs ($/mo)</label>
            <input
              type="number"
              value={otherCareCost}
              onChange={(e) => setOtherCareCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Child Care Cost Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Monthly Cost</h4>
              <p className="text-xl font-bold text-yellow-700">$${result.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.children} children</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Per Child</h4>
              <p className="text-xl font-bold text-orange-700">$${result.perChildMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Monthly per child</p>
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
            <h4 className="font-medium text-gray-800">Care Option Comparison</h4>
            <div className="grid md:grid-cols-4 gap-2 mt-2">
              {result.careOptions.map((opt, i) => (
                <div key={i} className={`p-2 rounded text-center ${opt.type.toLowerCase().includes(result.careType) ? 'bg-yellow-100' : 'bg-gray-50'}`}>
                  <p className="text-xs font-medium">{opt.type}</p>
                  <p className="text-sm font-bold text-gray-700">$${opt.cost.toFixed(0)}/mo</p>
                  <p className="text-xs text-green-600">{opt.pros}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
            <h4 className="font-medium text-green-800">Tax Benefits</h4>
            <p className="text-sm mt-1 text-green-700">
              Dependent Care Credit: up to $${result.dependentCareCredit.toFixed(0)} annual tax savings
            </p>
            <p className="text-sm text-green-700">
              FSA: Up to $5,000 pre-tax for dependent care
            </p>
          </div>

          {result.ageConsiderations.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
              <h4 className="font-medium text-blue-800">Age-Based Considerations</h4>
              <ul className="mt-2 space-y-1">
                {result.ageConsiderations.map((ac, i) => (
                  <li key={i} className="text-sm text-blue-700">📌 {ac}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Childcare Tips</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-yellow-600">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Childcare is typically 10-20% of family income. Infant care costs 50-100% more than preschool. Daycare averages $800-1,500/month per child. Nanny costs $15-25/hr. Consider Dependent Care FSA ($5,000 pre-tax) and Child Care Tax Credit. Nanny shares split costs. Au pairs offer cultural exchange at lower cost. Plan for summer camps and school breaks.</p>
      </div>
    </div>
  );
}