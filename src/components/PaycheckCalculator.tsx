'use client'

import { useState, useMemo } from 'react';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export default function PaycheckCalculator() {
  const [grossAnnual, setGrossAnnual] = useState(75000);
  const [payFrequency, setPayFrequency] = useState('monthly');
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('CA');
  const [preTaxDeductions, setPreTaxDeductions] = useState(500);
  const [postTaxDeductions, setPostTaxDeductions] = useState(200);
  const [federalAllowances, setFederalAllowances] = useState(0);

  const federalBrackets: Record<string, TaxBracket[]> = useMemo(() => ({
    single: [
      { min: 0, max: 11000, rate: 10 },
      { min: 11000, max: 44475, rate: 12 },
      { min: 44475, max: 95375, rate: 22 },
      { min: 95375, max: 182100, rate: 24 },
      { min: 182100, max: 231250, rate: 32 },
      { min: 231250, max: 578125, rate: 35 },
      { min: 578125, max: Infinity, rate: 37 },
    ],
    married: [
      { min: 0, max: 22000, rate: 10 },
      { min: 22000, max: 89450, rate: 12 },
      { min: 89450, max: 190750, rate: 22 },
      { min: 190750, max: 364200, rate: 24 },
      { min: 364200, max: 462500, rate: 32 },
      { min: 462500, max: 693750, rate: 35 },
      { min: 693750, max: Infinity, rate: 37 },
    ],
  }), []);

  const stateRates: Record<string, number> = useMemo(() => ({
    CA: 9.3, TX: 0, NY: 6.85, FL: 0, WA: 0, IL: 4.95, PA: 3.07, OH: 3.99, GA: 5.75, NC: 5.25, MA: 5, NJ: 10.75, VA: 5.75, AZ: 2.59,
  }), []);

  const result = useMemo(() => {
    const adjustedGross = grossAnnual - preTaxDeductions * 12;
    const periodsPerYear = payFrequency === 'weekly' ? 52 : payFrequency === 'biweekly' ? 26 : payFrequency === 'monthly' ? 12 : 24;

    // Federal tax calculation
    const brackets = federalBrackets[filingStatus] || federalBrackets.single;
    let federalTax = 0;
    let remainingIncome = adjustedGross;
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      federalTax += taxableInBracket * (bracket.rate / 100);
      remainingIncome -= taxableInBracket;
    }

    // Social Security (6.2% up to $168600)
    const socialSecurity = Math.min(adjustedGross, 168600) * 0.062;
    // Medicare (1.45% + 0.9% over $200k)
    const medicare = adjustedGross * 0.0145 + (adjustedGross > 200000 ? (adjustedGross - 200000) * 0.009 : 0);

    // State tax
    const stateTax = adjustedGross * (stateRates[state] || 0) / 100;

    const totalTax = federalTax + socialSecurity + medicare + stateTax;
    const netAnnual = adjustedGross - totalTax - postTaxDeductions * 12;
    const netPerPaycheck = netAnnual / periodsPerYear;
    const grossPerPaycheck = grossAnnual / periodsPerYear;

    const effectiveRate = (totalTax / grossAnnual) * 100;

    return {
      federalTax,
      socialSecurity,
      medicare,
      stateTax,
      totalTax,
      netAnnual,
      netPerPaycheck,
      grossPerPaycheck,
      effectiveRate,
      adjustedGross,
    };
  }, [grossAnnual, payFrequency, filingStatus, state, preTaxDeductions, postTaxDeductions, federalBrackets, stateRates]);

  const formatMoney = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Paycheck Calculator</h1>
      <p className="text-zinc-600">Estimate take-home pay after federal, state, and FICA taxes. Plan budget with actual net income.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Annual Gross Salary ($)</label>
            <input type="number" value={grossAnnual} onChange={(e) => setGrossAnnual(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[50000, 75000, 100000, 150000].map((v) => (
                <button key={v} onClick={() => setGrossAnnual(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
                  {formatMoney(v)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Pay Frequency</label>
            <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="w-full">
              <option value="weekly">Weekly (52 paychecks)</option>
              <option value="biweekly">Bi-weekly (26 paychecks)</option>
              <option value="monthly">Monthly (12 paychecks)</option>
              <option value="semimonthly">Semi-monthly (24 paychecks)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Filing Status</label>
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)} className="w-full">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full">
              <option value="CA">California (9.3%)</option>
              <option value="TX">Texas (0%)</option>
              <option value="NY">New York (6.85%)</option>
              <option value="FL">Florida (0%)</option>
              <option value="WA">Washington (0%)</option>
              <option value="IL">Illinois (4.95%)</option>
              <option value="PA">Pennsylvania (3.07%)</option>
              <option value="NJ">New Jersey (10.75%)</option>
              <option value="MA">Massachusetts (5%)</option>
              <option value="AZ">Arizona (2.59%)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Pre-tax Deductions ($/mo)</label>
            <input type="number" value={preTaxDeductions} onChange={(e) => setPreTaxDeductions(Number(e.target.value))} className="w-full" />
            <div className="text-xs text-zinc-500 mt-1">401k, health insurance, HSA</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Post-tax Deductions ($/mo)</label>
            <input type="number" value={postTaxDeductions} onChange={(e) => setPostTaxDeductions(Number(e.target.value))} className="w-full" />
            <div className="text-xs text-zinc-500 mt-1">Roth 401k, life insurance, union dues</div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-green-50">
          <div className="text-xs text-zinc-500 mb-1">Net Annual</div>
          <div className="text-xl font-bold text-green-600">{formatMoney(result.netAnnual)}</div>
        </div>
        <div className="card bg-blue-50">
          <div className="text-xs text-zinc-500 mb-1">Per Paycheck</div>
          <div className="text-xl font-bold text-blue-600">{formatMoney(result.netPerPaycheck)}</div>
          <div className="text-xs text-zinc-500">net take-home</div>
        </div>
        <div className="card bg-red-50">
          <div className="text-xs text-zinc-500 mb-1">Total Tax</div>
          <div className="text-xl font-bold text-red-600">{formatMoney(result.totalTax)}</div>
          <div className="text-xs text-zinc-500">{result.effectiveRate.toFixed(1)}% effective</div>
        </div>
        <div className="card bg-zinc-50">
          <div className="text-xs text-zinc-500 mb-1">Gross/Paycheck</div>
          <div className="text-xl font-bold">{formatMoney(result.grossPerPaycheck)}</div>
        </div>
      </div>

      {/* Tax Breakdown */}
      <div className="card">
        <h3 className="font-medium mb-3">Tax Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-red-50 rounded">
            <span>Federal Income Tax</span>
            <span className="font-bold text-red-600">{formatMoney(result.federalTax)}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50 rounded">
            <span>Social Security (6.2%)</span>
            <span className="font-bold text-purple-600">{formatMoney(result.socialSecurity)}</span>
          </div>
          <div className="flex justify-between p-2 bg-blue-50 rounded">
            <span>Medicare (1.45%)</span>
            <span className="font-bold text-blue-600">{formatMoney(result.medicare)}</span>
          </div>
          <div className="flex justify-between p-2 bg-orange-50 rounded">
            <span>State Tax ({stateRates[state] || 0}%)</span>
            <span className="font-bold text-orange-600">{formatMoney(result.stateTax)}</span>
          </div>
          <div className="flex justify-between p-2 border-t-2 bg-zinc-50 rounded">
            <span className="font-medium">Total Tax</span>
            <span className="font-bold">{formatMoney(result.totalTax)}</span>
          </div>
        </div>
      </div>

      {/* Deductions Impact */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">How Deductions Help</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Pre-tax:</span> Reduces taxable income, lowers tax bill
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">401k:</span> Save $500/mo pre-tax = ~$150 tax savings/month
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Health:</span> Premiums are pre-tax deductions
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Post-tax:</span> Doesn't reduce taxable income
          </div>
        </div>
      </div>
    </main>
  );
}