'use client';

import { useState, useMemo } from 'react';

export default function InvestmentGrowthCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualReturn, setAnnualReturn] = useState<string>('8');
  const [investmentYears, setInvestmentYears] = useState<string>('20');
  const [inflationRate, setInflationRate] = useState<string>('3');
  const [taxRate, setTaxRate] = useState<string>('0');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('monthly');

  const result = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const returnRate = parseFloat(annualReturn) || 0;
    const years = parseFloat(investmentYears) || 0;
    const inflation = parseFloat(inflationRate) || 0;
    const tax = parseFloat(taxRate) || 0;
    const compoundPerYear = compoundFrequency === 'monthly' ? 12 : compoundFrequency === 'quarterly' ? 4 : compoundFrequency === 'daily' ? 365 : 1;

    const periods = years * compoundPerYear;
    const ratePerPeriod = returnRate / 100 / compoundPerYear;
    const contributionPerPeriod = monthly / (compoundPerYear / 12);

    // Total contributions
    const totalContributions = initial + monthly * 12 * years;

    // Future value of initial investment
    const fvInitial = initial * Math.pow(1 + ratePerPeriod, periods);

    // Future value of contributions (annuity)
    const fvContributions = contributionPerPeriod > 0
      ? contributionPerPeriod * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod)
      : 0;

    // Total future value (pre-tax)
    const totalFutureValue = fvInitial + fvContributions;

    // Total earnings
    const totalEarnings = totalFutureValue - totalContributions;

    // After-tax value
    const afterTaxEarnings = totalEarnings * (1 - tax / 100);
    const afterTaxValue = totalContributions + afterTaxEarnings;

    // Inflation-adjusted value
    const inflationFactor = Math.pow(1 + inflation / 100, years);
    const realValue = totalFutureValue / inflationFactor;

    // Year-by-year breakdown
    const yearlyBreakdown: { year: number; balance: number; contributions: number; earnings: number; growth: number }[] = [];
    let balance = initial;
    let totalContributed = initial;
    let totalEarned = 0;

    for (let y = 1; y <= years; y++) {
      const prevBalance = balance;
      // Compound for one year
      const yearPeriods = compoundPerYear;
      for (let p = 0; p < yearPeriods; p++) {
        const interest = balance * ratePerPeriod;
        balance += interest + contributionPerPeriod;
        totalEarned += interest;
        totalContributed += contributionPerPeriod;
      }
      yearlyBreakdown.push({
        year: y,
        balance: Math.round(balance),
        contributions: Math.round(totalContributed),
        earnings: Math.round(totalEarned),
        growth: Math.round(balance - prevBalance)
      });
    }

    // Compare different return rates
    const returnComparison = [4, 6, 8, 10, 12].map(r => {
      const rPeriod = r / 100 / compoundPerYear;
      const fvI = initial * Math.pow(1 + rPeriod, periods);
      const fvC = contributionPerPeriod * ((Math.pow(1 + rPeriod, periods) - 1) / rPeriod);
      return { rate: r, value: Math.round(fvI + fvC) };
    });

    // Time to reach milestones
    const milestones = [50000, 100000, 250000, 500000, 1000000].map(target => {
      let balance = initial;
      let months = 0;
      while (balance < target && months < years * 12) {
        const interest = balance * (returnRate / 100 / 12);
        balance += interest + monthly;
        months++;
      }
      return { target, months: months < years * 12 ? months : null, years: months < years * 12 ? Math.round(months / 12 * 10) / 10 : null };
    });

    // Doubling time (Rule of 72 approximation)
    const doublingYears = returnRate > 0 ? Math.round(72 / returnRate * 10) / 10 : null;

    return {
      totalFutureValue: Math.round(totalFutureValue),
      totalContributions: Math.round(totalContributions),
      totalEarnings: Math.round(totalEarnings),
      afterTaxValue: Math.round(afterTaxValue),
      realValue: Math.round(realValue),
      yearlyBreakdown,
      returnComparison,
      milestones,
      doublingYears,
      initial,
      monthly,
      returnRate,
      years,
      inflation,
      tax
    };
  }, [initialInvestment, monthlyContribution, annualReturn, investmentYears, inflationRate, taxRate, compoundFrequency]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Growth Calculator</h1>
      <p className="text-gray-600 mb-6">Project investment growth with contributions and compound interest</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Investment Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ($)</label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              step="0.5"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Period (years)</label>
            <input
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Adjustments</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compound Frequency</label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly (12x/year)</option>
              <option value="quarterly">Quarterly (4x/year)</option>
              <option value="annual">Annual (1x/year)</option>
              <option value="daily">Daily (365x/year)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Inflation (%)</label>
            <input
              type="number"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax on Gains (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500">Capital gains tax (15-20% typically)</p>
          </div>
        </div>
      </div>

      {result && (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Investment Growth Projection</h3>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Total Contributed</p>
              <p className="text-2xl font-bold text-gray-700">${result.totalContributions}</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">${result.totalEarnings}</p>
            </div>

            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-gray-600">Future Value</p>
              <p className="text-2xl font-bold text-blue-700">${result.totalFutureValue}</p>
            </div>

            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">Real Value (adj. inflation)</p>
              <p className="text-xl font-bold text-purple-700">${result.realValue}</p>
            </div>
          </div>

          {result.tax > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">After-Tax Analysis</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="text-sm">
                  <span className="text-gray-600">Tax on gains: </span>
                  <span className="font-bold text-red-600">${(result.totalEarnings * result.tax / 100).toFixed(0)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">After-tax value: </span>
                  <span className="font-bold text-blue-700">${result.afterTaxValue}</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Return Rate Comparison</h4>
            <div className="space-y-2 mt-2">
              {result.returnComparison.map((r, i) => (
                <div key={i} className={`flex justify-between items-center text-sm p-2 rounded ${r.rate === result.returnRate ? 'bg-blue-100' : 'bg-gray-50'}`}>
                  <span className="text-gray-600">{r.rate}% annual return</span>
                  <span className="font-bold text-blue-700">${r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Milestone Timeline</h4>
            <div className="space-y-2 mt-2">
              {result.milestones.map((m, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">$${m.target.toLocaleString()}</span>
                  <span className="font-medium">
                    {m.years ? `${m.years} years` : 'Not reached in timeframe'}
                  </span>
                </div>
              ))}
            </div>
            {result.doublingYears && (
              <p className="text-sm mt-2 text-gray-600">
                Doubling time (Rule of 72): ~{result.doublingYears} years at {result.returnRate}%
              </p>
            )}
          </div>

          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-800">Year-by-Year Growth</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="text-left py-1">Year</th>
                    <th className="text-right py-1">Balance</th>
                    <th className="text-right py-1">Contributed</th>
                    <th className="text-right py-1">Earnings</th>
                    <th className="text-right py-1">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.filter((_, i) => i % 5 === 0 || i === result.yearlyBreakdown.length - 1).map((row, i) => (
                    <tr key={i}>
                      <td className="py-1">{row.year}</td>
                      <td className="text-right font-medium">${row.balance.toLocaleString()}</td>
                      <td className="text-right">${row.contributions.toLocaleString()}</td>
                      <td className="text-right text-green-600">${row.earnings.toLocaleString()}</td>
                      <td className="text-right">${row.growth.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Historical stock market returns average 7-10% annually (after inflation ~6-7%). Bonds: 3-5%. High-yield savings: 1-2%. Compound frequency matters: daily compounds slightly more than annual. Inflation erodes purchasing power - real returns are lower. Tax-advantaged accounts (401k, IRA) avoid capital gains tax. Rule of 72: divide 72 by rate to estimate doubling time. Past returns don't guarantee future results. Diversify to reduce risk.</p>
      </div>
    </div>
  );
}