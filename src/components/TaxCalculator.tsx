'use client'

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function TaxCalculator() {
  const [income, setIncome] = useState(80000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [dependents, setDependents] = useState(0);
  const [deductionsType, setDeductionsType] = useState('standard');
  const [itemizedDeductions, setItemizedDeductions] = useState(0);
  const [taxCredits, setTaxCredits] = useState(0);
  const [capitalGains, setCapitalGains] = useState(0);
  const [state, setState] = useState('CA');

  const standardDeductions: Record<string, number> = useMemo(() => ({
    single: 13850,
    married: 27700,
    headOfHousehold: 20800,
  }), []);

  const federalBrackets = useMemo(() => ({
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
    headOfHousehold: [
      { min: 0, max: 15700, rate: 10 },
      { min: 15700, max: 59850, rate: 12 },
      { min: 59850, max: 95350, rate: 22 },
      { min: 95350, max: 191900, rate: 24 },
      { min: 191900, max: 243700, rate: 32 },
      { min: 243700, max: 609350, rate: 35 },
      { min: 609350, max: Infinity, rate: 37 },
    ],
  }), []);

  const stateRates: Record<string, number> = useMemo(() => ({
    CA: 9.3, TX: 0, NY: 6.85, FL: 0, WA: 0, IL: 4.95, PA: 3.07, MA: 5, NJ: 10.75,
  }), []);

  const capitalGainsRates = useMemo(() => [
    { min: 0, max: 44475, rate: 0 },
    { min: 44475, max: 517200, rate: 15 },
    { min: 517200, max: Infinity, rate: 20 },
  ], []);

  const result = useMemo(() => {
    const deduction = deductionsType === 'standard' ? standardDeductions[filingStatus] : itemizedDeductions;
    const taxableIncome = Math.max(0, income - deduction);
    const taxableIncomeWithGains = taxableIncome + capitalGains;

    // Federal tax calculation
    const brackets = federalBrackets[filingStatus as keyof typeof federalBrackets] || federalBrackets.single;
    let federalTax = 0;
    let remainingIncome = taxableIncome;
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      federalTax += taxableInBracket * (bracket.rate / 100);
      remainingIncome -= taxableInBracket;
    }

    // Capital gains tax
    let capitalGainsTax = 0;
    let remainingGains = capitalGains;
    for (const bracket of capitalGainsRates) {
      if (remainingGains <= 0) break;
      const taxableInBracket = Math.min(remainingGains, bracket.max - bracket.min);
      capitalGainsTax += taxableInBracket * (bracket.rate / 100);
      remainingGains -= taxableInBracket;
    }

    // State tax
    const stateTax = taxableIncomeWithGains * (stateRates[state] || 0) / 100;

    // Child tax credit (up to $2000 per child)
    const childCredit = Math.min(dependents * 2000, taxableIncomeWithGains * 0.15);

    // Apply credits
    const totalCredits = Math.min(taxCredits + childCredit, federalTax + capitalGainsTax);

    const totalTax = federalTax + capitalGainsTax + stateTax - totalCredits;
    const effectiveRate = (totalTax / income) * 100;
    const marginalRate = brackets.find(b => taxableIncome >= b.min && taxableIncome < b.max)?.rate || brackets[brackets.length - 1].rate;

    return {
      deduction,
      taxableIncome,
      federalTax,
      capitalGainsTax,
      stateTax,
      childCredit,
      totalCredits,
      totalTax,
      effectiveRate,
      marginalRate,
    };
  }, [income, filingStatus, dependents, deductionsType, itemizedDeductions, taxCredits, capitalGains, state, standardDeductions, federalBrackets, stateRates, capitalGainsRates]);

  const formatMoney = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const chartData = [
    { name: 'Federal Tax', value: result.federalTax, color: '#ef4444' },
    { name: 'State Tax', value: result.stateTax, color: '#f97316' },
    { name: 'Capital Gains', value: result.capitalGainsTax, color: '#8b5cf6' },
    { name: 'Credits Applied', value: -result.totalCredits, color: '#10b981' },
  ].filter(d => d.value !== 0);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Income Tax Calculator</h1>
      <p className="text-zinc-600">Calculate federal and state income taxes with deductions, credits, and capital gains.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Annual Income ($)</label>
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[50000, 75000, 100000, 150000, 200000].map((v) => (
                <button key={v} onClick={() => setIncome(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{formatMoney(v)}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Filing Status</label>
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)} className="w-full">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="headOfHousehold">Head of Household</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Dependents</label>
            <input type="number" value={dependents} onChange={(e) => setDependents(Number(e.target.value))} className="w-full" min="0" max="10" />
            <div className="text-xs text-zinc-500 mt-1">$2,000 child tax credit each</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full">
              <option value="CA">California (9.3%)</option>
              <option value="TX">Texas (0%)</option>
              <option value="NY">New York (6.85%)</option>
              <option value="FL">Florida (0%)</option>
              <option value="MA">Massachusetts (5%)</option>
              <option value="NJ">New Jersey (10.75%)</option>
              <option value="IL">Illinois (4.95%)</option>
              <option value="PA">Pennsylvania (3.07%)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Deductions</label>
            <select value={deductionsType} onChange={(e) => setDeductionsType(e.target.value)} className="w-full">
              <option value="standard">Standard Deduction ({formatMoney(standardDeductions[filingStatus])})</option>
              <option value="itemized">Itemized Deductions</option>
            </select>
            {deductionsType === 'itemized' && (
              <input type="number" value={itemizedDeductions} onChange={(e) => setItemizedDeductions(Number(e.target.value))} className="w-full mt-2" placeholder="Total itemized deductions" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Capital Gains ($)</label>
            <input type="number" value={capitalGains} onChange={(e) => setCapitalGains(Number(e.target.value))} className="w-full" />
            <div className="text-xs text-zinc-500 mt-1">Long-term gains (0-20% rates)</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Other Tax Credits ($)</label>
          <input type="number" value={taxCredits} onChange={(e) => setTaxCredits(Number(e.target.value))} className="w-full" />
          <div className="text-xs text-zinc-500 mt-1">Education, energy, retirement credits</div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card bg-red-50">
          <div className="text-xs text-zinc-500 mb-1">Total Tax</div>
          <div className="text-xl font-bold text-red-600">{formatMoney(result.totalTax)}</div>
          <div className="text-xs text-zinc-500">{result.effectiveRate.toFixed(1)}% effective</div>
        </div>
        <div className="card bg-green-50">
          <div className="text-xs text-zinc-500 mb-1">Taxable Income</div>
          <div className="text-xl font-bold text-green-600">{formatMoney(result.taxableIncome)}</div>
          <div className="text-xs text-zinc-500">{result.marginalRate}% marginal bracket</div>
        </div>
        <div className="card bg-blue-50">
          <div className="text-xs text-zinc-500 mb-1">Deduction Used</div>
          <div className="text-xl font-bold text-blue-600">{formatMoney(result.deduction)}</div>
          <div className="text-xs text-zinc-500">{deductionsType === 'standard' ? 'Standard' : 'Itemized'}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name }) => name}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatMoney(Math.abs(v))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown */}
      <div className="card">
        <h3 className="font-medium mb-3">Tax Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-red-50 rounded">
            <span>Federal Income Tax</span>
            <span className="font-bold text-red-600">{formatMoney(result.federalTax)}</span>
          </div>
          {capitalGains > 0 && (
            <div className="flex justify-between p-2 bg-purple-50 rounded">
              <span>Capital Gains Tax</span>
              <span className="font-bold text-purple-600">{formatMoney(result.capitalGainsTax)}</span>
            </div>
          )}
          <div className="flex justify-between p-2 bg-orange-50 rounded">
            <span>State Tax ({stateRates[state] || 0}%)</span>
            <span className="font-bold text-orange-600">{formatMoney(result.stateTax)}</span>
          </div>
          {result.totalCredits > 0 && (
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Tax Credits Applied</span>
              <span className="font-bold text-green-600">-{formatMoney(result.totalCredits)}</span>
            </div>
          )}
          <div className="flex justify-between p-2 border-t-2 bg-zinc-50 rounded font-medium">
            <span>Total Tax Owed</span>
            <span>{formatMoney(result.totalTax)}</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Planning Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Max deductions:</span> Itemize if total exceeds standard
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">401k:</span> Contributions reduce taxable income
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Capital losses:</span> Offset gains up to $3,000/year
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Credits vs deductions:</span> Credits directly reduce tax owed
          </div>
        </div>
      </div>
    </main>
  );
}