'use client';

import { useState, useMemo } from 'react';

export default function MultipleIncomeSourcesCalculator() {
  const [primaryIncome, setPrimaryIncome] = useState<string>('60000');
  const [primaryIncomeType, setPrimaryIncomeType] = useState<string>('salary');
  const [secondaryIncome, setSecondaryIncome] = useState<string>('15000');
  const [secondaryIncomeType, setSecondaryIncomeType] = useState<string>('freelance');
  const [sideBusinessIncome, setSideBusinessIncome] = useState<string>('5000');
  const [investmentIncome, setInvestmentIncome] = useState<string>('3000');
  const [rentalIncome, setRentalIncome] = useState<string>('0');
  const [otherIncome, setOtherIncome] = useState<string>('0');
  const [hoursPrimaryJob, setHoursPrimaryJob] = useState<string>('40');
  const [hoursSecondary, setHoursSecondary] = useState<string>('10');
  const [hoursSideBusiness, setHoursSideBusiness] = useState<string>('5');
  const [taxYear, setTaxYear] = useState<string>('2024');

  const result = useMemo(() => {
    const primary = parseFloat(primaryIncome) || 0;
    const secondary = parseFloat(secondaryIncome) || 0;
    const business = parseFloat(sideBusinessIncome) || 0;
    const investment = parseFloat(investmentIncome) || 0;
    const rental = parseFloat(rentalIncome) || 0;
    const other = parseFloat(otherIncome) || 0;
    const hrsPrimary = parseFloat(hoursPrimaryJob) || 0;
    const hrsSecondary = parseFloat(hoursSecondary) || 0;
    const hrsBusiness = parseFloat(hoursSideBusiness) || 0;

    // Total income
    const totalGrossIncome = primary + secondary + business + investment + rental + other;

    // Hours analysis
    const totalHours = hrsPrimary + hrsSecondary + hrsBusiness;
    const hourlyRate = totalHours > 0 ? (primary + secondary + business) / totalHours : 0;

    // Income breakdown
    const incomeSources = [
      { name: 'Primary Job', amount: primary, type: primaryIncomeType, hours: hrsPrimary, passive: false },
      { name: 'Secondary Income', amount: secondary, type: secondaryIncomeType, hours: hrsSecondary, passive: secondaryIncomeType === 'investment' || secondaryIncomeType === 'rental' },
      { name: 'Side Business', amount: business, type: 'business', hours: hrsBusiness, passive: false },
      { name: 'Investment Income', amount: investment, type: 'investment', hours: 0, passive: true },
      { name: 'Rental Income', amount: rental, type: 'rental', hours: 0, passive: true },
      { name: 'Other Income', amount: other, type: 'other', hours: 0, passive: true }
    ].filter(s => s.amount > 0);

    // Active vs passive income
    const activeIncome = primary + secondary + business;
    const passiveIncome = investment + rental + other;
    const activePercent = (activeIncome / totalGrossIncome) * 100;
    const passivePercent = (passiveIncome / totalGrossIncome) * 100;

    // Tax considerations
    const w2Income = primaryIncomeType === 'salary' ? primary : 0;
    const selfEmploymentIncome = secondaryIncomeType === 'freelance' ? secondary : 0 + business;
    const passiveTaxIncome = investment + rental;

    // Self-employment tax estimate (15.3% on net earnings)
    const selfEmploymentTaxEstimate = selfEmploymentIncome * 0.153 * 0.9235; // 92.35% deduction

    // Diversification score
    const sourceCount = incomeSources.length;
    const diversificationScore = Math.min(100, sourceCount * 20 + passivePercent);

    // Income stability assessment
    let stabilityRating = 'moderate';
    const primaryPercentCalc = totalGrossIncome > 0 ? (primary / totalGrossIncome) * 100 : 0;
    if (primaryPercentCalc > 80) stabilityRating = 'dependent';
    else if (passivePercent > 40 && sourceCount >= 4) stabilityRating = 'stable';
    else if (sourceCount >= 3 && primary > 0) stabilityRating = 'balanced';

    // Recommendations
    const recommendations: string[] = [];

    if (primaryPercentCalc > 80) {
      recommendations.push('High dependency on single income source - diversification recommended');
    }

    if (selfEmploymentIncome > 0) {
      recommendations.push('Self-employment income subject to additional 15.3% SE tax - track expenses for deductions');
    }

    if (passivePercent < 20 && totalGrossIncome > 50000) {
      recommendations.push('Consider building passive income streams for long-term stability');
    }

    if (hrsSecondary + hrsBusiness > 20) {
      recommendations.push('Significant hours on secondary income - evaluate time investment vs return');
    }

    if (secondary > primary * 0.3 && secondaryIncomeType === 'freelance') {
      recommendations.push('Freelance income approaching primary - consider formal business structure');
    }

    // Income growth opportunities
    const growthOpportunities: string[] = [];

    if (hourlyRate > 30 && hrsSecondary < 5) {
      growthOpportunities.push('Good hourly rate - could expand secondary income hours');
    }

    if (passiveIncome < 10000 && totalGrossIncome > 60000) {
      growthOpportunities.push('Increase investment allocation for passive income growth');
    }

    if (business < 10000 && hrsBusiness > 5) {
      growthOpportunities.push('Side business hours investment exceeds return - optimize or pivot');
    }

    return {
      totalGrossIncome,
      activeIncome,
      passiveIncome,
      activePercent,
      passivePercent,
      hourlyRate,
      incomeSources,
      selfEmploymentTaxEstimate,
      diversificationScore,
      stabilityRating,
      sourceCount,
      recommendations,
      growthOpportunities,
      totalHours,
      w2Income,
      selfEmploymentIncome
    };
  }, [primaryIncome, primaryIncomeType, secondaryIncome, secondaryIncomeType, sideBusinessIncome, investmentIncome, rentalIncome, otherIncome, hoursPrimaryJob, hoursSecondary, hoursSideBusiness, taxYear]);

  const getStabilityColor = (rating: string) => {
    if (rating === 'stable') return 'text-green-700 bg-green-50 border-green-200';
    if (rating === 'balanced') return 'text-blue-700 bg-blue-50 border-blue-200';
    if (rating === 'dependent') return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Multiple Income Sources Calculator</h1>
      <p className="text-gray-600 mb-6">Analyze diversified income portfolio and tax implications</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Income Sources</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Job Income ($)</label>
            <input
              type="number"
              value={primaryIncome}
              onChange={(e) => setPrimaryIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="60000"
            />
            <select
              value={primaryIncomeType}
              onChange={(e) => setPrimaryIncomeType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            >
              <option value="salary">W-2 Salary</option>
              <option value="hourly">W-2 Hourly</option>
              <option value="contract">Contract (1099)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Income ($)</label>
            <input
              type="number"
              value={secondaryIncome}
              onChange={(e) => setSecondaryIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
            />
            <select
              value={secondaryIncomeType}
              onChange={(e) => setSecondaryIncomeType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
            >
              <option value="freelance">Freelance/Contract</option>
              <option value="part_time">Part-time W-2</option>
              <option value="gig">Gig Economy</option>
              <option value="commission">Commission</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Side Business Income ($)</label>
            <input
              type="number"
              value={sideBusinessIncome}
              onChange={(e) => setSideBusinessIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Income ($)</label>
            <input
              type="number"
              value={investmentIncome}
              onChange={(e) => setInvestmentIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3000"
            />
            <p className="text-xs text-gray-500 mt-1">Dividends, interest, capital gains</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional & Hours</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rental Income ($)</label>
            <input
              type="number"
              value={rentalIncome}
              onChange={(e) => setRentalIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Income ($)</label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Week - Primary Job</label>
            <input
              type="number"
              value={hoursPrimaryJob}
              onChange={(e) => setHoursPrimaryJob(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Week - Secondary</label>
            <input
              type="number"
              value={hoursSecondary}
              onChange={(e) => setHoursSecondary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Week - Side Business</label>
            <input
              type="number"
              value={hoursSideBusiness}
              onChange={(e) => setHoursSideBusiness(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="5"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Income Portfolio Analysis</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-800">Total Gross Income</h4>
              <p className="text-xl font-bold text-purple-700">$${result.totalGrossIncome.toFixed(0)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Effective Hourly Rate</h4>
              <p className="text-xl font-bold text-indigo-700">$${result.hourlyRate.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Active income / total hours</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Diversification Score</h4>
              <p className="text-xl font-bold text-green-700">{result.diversificationScore}/100</p>
              <p className="text-xs text-gray-500">{result.sourceCount} sources</p>
            </div>
          </div>

          <div className={`p-3 rounded border mb-4 ${getStabilityColor(result.stabilityRating)}`}>
            <h4 className="font-medium">Income Stability: {result.stabilityRating.toUpperCase()}</h4>
            <p className="text-sm mt-1">
              {result.stabilityRating === 'stable' && 'Well diversified with strong passive income foundation'}
              {result.stabilityRating === 'balanced' && 'Multiple sources provide backup but still relies on primary'}
              {result.stabilityRating === 'dependent' && 'High dependency on single source - vulnerable to job loss'}
              {result.stabilityRating === 'moderate' && 'Some diversification but could improve'}
            </p>
          </div>

          <div className="p-3 bg-white rounded border mb-4">
            <h4 className="font-medium text-gray-800">Income Breakdown</h4>
            <div className="space-y-2 mt-2">
              {result.incomeSources.map((source, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-600">{source.name}</span>
                    {source.passive && <span className="ml-2 text-xs text-green-600">(passive)</span>}
                  </div>
                  <span className="font-bold text-purple-600">$${source.amount.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Active vs Passive</h4>
              <div className="mt-2">
                <p className="text-sm">Active: <span className="font-bold text-blue-600">{result.activePercent.toFixed(1)}%</span> ($${result.activeIncome.toFixed(0)})</p>
                <p className="text-sm">Passive: <span className="font-bold text-green-600">{result.passivePercent.toFixed(1)}%</span> ($${result.passiveIncome.toFixed(0)})</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Tax Considerations</h4>
              <p className="text-sm mt-1">Self-employment income: $${result.selfEmploymentIncome.toFixed(0)}</p>
              <p className="text-sm text-orange-600">Estimated SE tax: $${result.selfEmploymentTaxEstimate.toFixed(0)}</p>
            </div>
          </div>

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white rounded border mb-4">
              <h4 className="font-medium text-gray-800">Portfolio Recommendations</h4>
              <ul className="mt-2 space-y-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-600">• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {result.growthOpportunities.length > 0 && (
            <div className="p-3 bg-white rounded border">
              <h4 className="font-medium text-gray-800">Growth Opportunities</h4>
              <ul className="mt-2 space-y-1">
                {result.growthOpportunities.map((opp, i) => (
                  <li key={i} className="text-sm text-green-600">• {opp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
        <p><strong>Note:</strong> Multiple income sources provide financial stability but have varying tax implications. Self-employment income (1099, freelance, business) subject to 15.3% self-employment tax. Passive income (investment, rental) typically taxed differently. Track all sources for proper tax reporting. Diversification reduces single-source dependency risk.</p>
      </div>
    </div>
  );
}