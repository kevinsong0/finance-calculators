'use client'

import { useState } from 'react';

export default function RetirementIncomePlanner() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('100000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [desiredIncome, setDesiredIncome] = useState('50000');
  const [result, setResult] = useState<{ totalSavings: number; monthlyWithdrawal: number; yearsFunded: number; shortfall: number } | null>(null);

  const calculate = () => {
    const yearsToRetire = parseInt(retirementAge) - parseInt(currentAge);
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const months = yearsToRetire * 12;

    // Future value of current savings
    const futureCurrent = parseFloat(currentSavings) * Math.pow(1 + parseFloat(expectedReturn) / 100, yearsToRetire);

    // Future value of monthly contributions
    const futureContributions = parseFloat(monthlyContribution) * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);

    const totalSavings = futureCurrent + futureContributions;

    // Withdrawal calculations
    const annualWithdrawalRate = 0.04; // 4% rule
    const monthlyWithdrawal = totalSavings * annualWithdrawalRate / 12;
    const desiredMonthly = parseFloat(desiredIncome) / 12;
    const shortfall = desiredMonthly - monthlyWithdrawal;

    // Years funded at desired rate
    const yearsFunded = Math.log(1 + (totalSavings * (parseFloat(expectedReturn) / 100)) / parseFloat(desiredIncome)) / Math.log(1 + parseFloat(expectedReturn) / 100);

    setResult({
      totalSavings: Math.round(totalSavings),
      monthlyWithdrawal: Math.round(monthlyWithdrawal),
      yearsFunded: Math.round(yearsFunded || 0),
      shortfall: Math.round(shortfall > 0 ? shortfall : 0),
    });
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Retirement Income Planner</h1>
      <p className="text-zinc-600">Plan retirement income with savings growth projection. Calculate future savings, safe withdrawal rate, income gap. Use 4% rule for planning.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Your Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Current Age</label>
            <input type="number" className="w-full p-2 border rounded" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Retirement Age</label>
            <input type="number" className="w-full p-2 border rounded" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Current Savings ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Monthly Contribution ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Expected Return (%)</label>
            <input type="number" className="w-full p-2 border rounded" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Desired Annual Income ($)</label>
            <input type="number" className="w-full p-2 border rounded" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)} />
          </div>
        </div>
        <button onClick={calculate} className="btn-primary w-full mt-2">Calculate Retirement Plan</button>
      </div>

      {result && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Retirement Projection</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-green-600">${result.totalSavings.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Projected Savings at Retirement</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">${result.monthlyWithdrawal.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Monthly Withdrawal (4% Rule)</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold">{result.yearsFunded} yrs</div>
              <div className="text-xs text-zinc-500">Years Funded at Desired Rate</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-red-600">${result.shortfall.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Monthly Shortfall (if any)</div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">The 4% Rule</h3>
        <div className="text-xs text-zinc-600">
          4% rule: withdraw 4% of savings first year, adjust for inflation annually. Historically: portfolio lasts 30+ years with diversified investments. Based on Trinity Study. Adjust for: lower returns, longer retirement, market volatility. Consider: Social Security, pensions, part-time work reduce withdrawal needs.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Income Sources</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><strong>401(k)</strong>: employer match, tax advantage</div>
          <div className="bg-white rounded p-2"><strong>IRA</strong>: traditional or Roth</div>
          <div className="bg-white rounded p-2"><strong>Social Security</strong>: avg $1,500/mo at 67</div>
          <div className="bg-white rounded p-2"><strong>Pension</strong>: if available</div>
          <div className="bg-white rounded p-2"><strong>Investments</strong>: stocks, bonds, REITs</div>
          <div className="bg-white rounded p-2"><strong>Part-time</strong>: supplement income</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips</h3>
        <div className="text-xs text-zinc-600">
          Start early - compound interest powerful. Max employer match - free money. Increase contributions with raises. Diversify investments. Review annually. Plan for healthcare costs. Consider Roth for tax-free withdrawals. Delay Social Security for higher benefit. Reduce expenses before retirement.
        </div>
      </div>
    </main>
  );
}