'use client';

import { useState, useMemo } from 'react';

export default function EmployeeBenefitsPackageCalculator() {
  const [baseSalary, setBaseSalary] = useState<string>('80000');
  const [healthInsuranceValue, setHealthInsuranceValue] = useState<string>('12000');
  const [retirementMatchPercent, setRetirementMatchPercent] = useState<string>('6');
  const [retirementMatchMax, setRetirementMatchMax] = useState<string>('5000');
  const [paidTimeOffDays, setPaidTimeOffDays] = useState<string>('15');
  const [paidTimeOffValue, setPaidTimeOffValue] = useState<string>('0');
  const [stockOptionsValue, setStockOptionsValue] = useState<string>('10000');
  const [bonusPercent, setBonusPercent] = useState<string>('10');
  const [bonusTarget, setBonusTarget] = useState<string>('8000');
  const [lifeInsuranceValue, setLifeInsuranceValue] = useState<string>('500');
  const [otherBenefits, setOtherBenefits] = useState<string>('2000');
  const [commutingCosts, setCommutingCosts] = useState<string>('3000');
  const [workFromHomeSavings, setWorkFromHomeSavings] = useState<string>('0');

  const result = useMemo(() => {
    const salary = parseFloat(baseSalary) || 0;
    const health = parseFloat(healthInsuranceValue) || 0;
    const matchPct = parseFloat(retirementMatchPercent) / 100 || 0;
    const matchMax = parseFloat(retirementMatchMax) || 0;
    const ptoDays = parseFloat(paidTimeOffDays) || 0;
    const ptoVal = parseFloat(paidTimeOffValue) || salary / 260 * ptoDays; // 260 work days
    const stock = parseFloat(stockOptionsValue) || 0;
    const bonusPct = parseFloat(bonusPercent) / 100 || 0;
    const bonusTgt = parseFloat(bonusTarget) || salary * bonusPct;
    const life = parseFloat(lifeInsuranceValue) || 0;
    const other = parseFloat(otherBenefits) || 0;
    const commute = parseFloat(commutingCosts) || 0;
    const wfhSavings = parseFloat(workFromHomeSavings) || 0;

    // Calculate retirement match
    const retirementMatch = Math.min(salary * matchPct, matchMax);

    // Total compensation
    const totalBenefits = health + retirementMatch + ptoVal + stock + bonusTgt + life + other;
    const totalCompensation = salary + totalBenefits;
    const netBenefits = totalBenefits - commute + wfhSavings;

    // Effective hourly rate
    const workHoursPerYear = 2080; // 52 weeks * 40 hours
    const effectiveHourly = totalCompensation / workHoursPerYear;

    // Benefits as percentage of salary
    const benefitsPercent = (totalBenefits / salary) * 100;

    // Comparison metrics
    const equivalentSalaryNoBenefits = salary;
    const equivalentSalaryWithBenefits = totalCompensation;

    // Benefit rankings
    const benefitItems = [
      { name: 'Health Insurance', value: health, category: 'insurance' },
      { name: 'Retirement Match', value: retirementMatch, category: 'retirement' },
      { name: 'Paid Time Off', value: ptoVal, category: 'time' },
      { name: 'Stock Options/Equity', value: stock, category: 'equity' },
      { name: 'Performance Bonus', value: bonusTgt, category: 'bonus' },
      { name: 'Life Insurance', value: life, category: 'insurance' },
      { name: 'Other Benefits', value: other, category: 'misc' }
    ].sort((a, b) => b.value - a.value);

    // Tax-advantaged benefits estimate
    const taxAdvantaged = health + retirementMatch + life; // Typically pre-tax
    const taxableEquivalent = taxAdvantaged * 1.25; // Approximate tax adjustment

    // Recommendations
    const recommendations: string[] = [];

    if (matchPct < 0.04) {
      recommendations.push('Retirement match below 4% - below average employer contribution');
    }

    if (ptoDays < 10) {
      recommendations.push('PTO below 10 days - below standard for professional roles');
    }

    if (benefitsPercent < 20) {
      recommendations.push('Benefits package less than 20% of salary - compare to market rates');
    }

    if (!stock && salary > 100000) {
      recommendations.push('High salary role typically includes equity compensation');
    }

    if (commute > totalBenefits * 0.2) {
      recommendations.push('Commuting costs exceed 20% of benefits value - consider remote work');
    }

    if (wfhSavings > 0 && wfhSavings > commute * 0.5) {
      recommendations.push('Work-from-home savings partially offset commuting costs');
    }

    return {
      salary,
      totalBenefits,
      totalCompensation,
      netBenefits,
      effectiveHourly,
      benefitsPercent,
      benefitItems,
      taxAdvantaged,
      taxableEquivalent,
      retirementMatch,
      ptoVal,
      bonusTgt,
      recommendations,
      equivalentSalaryNoBenefits,
      equivalentSalaryWithBenefits
    };
  }, [baseSalary, healthInsuranceValue, retirementMatchPercent, retirementMatchMax, paidTimeOffDays, paidTimeOffValue, stockOptionsValue, bonusPercent, bonusTarget, lifeInsuranceValue, otherBenefits, commutingCosts, workFromHomeSavings]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Benefits Package Calculator</h1>
      <p className="text-gray-600 mb-6">Calculate total compensation including all benefits and their true value</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Core Compensation</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary ($)</label>
            <input
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="80000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Insurance Value ($/year)</label>
            <input
              type="number"
              value={healthInsuranceValue}
              onChange={(e) => setHealthInsuranceValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="12000"
            />
            <p className="text-xs text-gray-500 mt-1">Employer-paid portion of premium</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">401(k) Match (%)</label>
            <input
              type="number"
              value={retirementMatchPercent}
              onChange={(e) => setRetirementMatchPercent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Match Maximum ($)</label>
            <input
              type="number"
              value={retirementMatchMax}
              onChange={(e) => setRetirementMatchMax(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paid Time Off (days)</label>
            <input
              type="number"
              value={paidTimeOffDays}
              onChange={(e) => setPaidTimeOffDays(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional Benefits</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Options/Equity Value ($)</label>
            <input
              type="number"
              value={stockOptionsValue}
              onChange={(e) => setStockOptionsValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Target (%)</label>
            <input
              type="number"
              value={bonusPercent}
              onChange={(e) => setBonusPercent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Life Insurance Value ($/year)</label>
            <input
              type="number"
              value={lifeInsuranceValue}
              onChange={(e) => setLifeInsuranceValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Benefits Value ($)</label>
            <input
              type="number"
              value={otherBenefits}
              onChange={(e) => setOtherBenefits(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="2000"
            />
            <p className="text-xs text-gray-500 mt-1">Gym, meals, education, professional development</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commuting Costs ($/year)</label>
            <input
              type="number"
              value={commutingCosts}
              onChange={(e) => setCommutingCosts(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work-from-Home Savings ($/year)</label>
            <input
              type="number"
              value={workFromHomeSavings}
              onChange={(e) => setWorkFromHomeSavings(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Total Compensation Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Compensation</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.totalCompensation.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Salary + Benefits</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Benefits Value</h4>
              <p className="text-xl font-bold text-green-700">$${result.totalBenefits.toFixed(0)}</p>
              <p className="text-xs text-gray-500">{result.benefitsPercent.toFixed(1)}% of salary</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Effective Hourly Rate</h4>
              <p className="text-xl font-bold text-purple-700">$${result.effectiveHourly.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Total comp / 2080 hours</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Benefits Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.benefitItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-bold text-indigo-600">$${item.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Tax-Advantaged Benefits</h4>
              <p className="text-lg font-bold text-blue-700">$${result.taxAdvantaged.toFixed(0)}</p>
              <p className="text-sm text-gray-600">Health, retirement, life insurance (pre-tax)</p>
              <p className="text-xs text-gray-500 mt-1">Taxable equivalent: $${result.taxableEquivalent.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Net Benefits (after costs)</h4>
              <p className="text-lg font-bold text-green-700">$${result.netBenefits.toFixed(0)}</p>
              <p className="text-sm text-gray-600">Benefits minus commuting + WFH savings</p>
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Benefits Assessment</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Total compensation includes all employer-provided benefits. Tax-advantaged benefits have higher effective value due to pre-tax treatment. Stock options may vest over time. Bonus targets may not be guaranteed. Compare total compensation when evaluating job offers, not just base salary.</p>
      </div>
    </div>
  );
}