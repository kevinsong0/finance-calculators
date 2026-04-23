'use client'

import { useState } from 'react'

export default function NetInvestmentIncomeTaxCalculator() {
  const [agi, setAgi] = useState('')
  const [investmentIncome, setInvestmentIncome] = useState('')
  const [filingStatus, setFilingStatus] = useState('single')
  const [incomeType, setIncomeType] = useState('mixed')
  const [capitalGains, setCapitalGains] = useState('')
  const [dividends, setDividends] = useState('')
  const [interest, setInterest] = useState('')
  const [rentalIncome, setRentalIncome] = useState('')
  const [hasDeductions, setHasDeductions] = useState(false)
  const [investmentExpenses, setInvestmentExpenses] = useState('')

  const calculate = () => {
    const totalAgi = parseFloat(agi) || 200000
    const investment = parseFloat(investmentIncome) || 50000
    const status = filingStatus
    const type = incomeType
    const gains = parseFloat(capitalGains) || 30000
    const dividendsIncome = parseFloat(dividends) || 10000
    const interestIncome = parseFloat(interest) || 5000
    const rental = parseFloat(rentalIncome) || 5000
    const expenses = parseFloat(investmentExpenses) || 0

    // NIIT Thresholds (2026)
    const thresholds: Record<string, number> = {
      'single': 200000,
      'married': 250000,
      'head_household': 250000,
      'married_separate': 125000
    }

    const threshold = thresholds[status] || 200000

    // Calculate net investment income
    const totalInvestmentIncome = gains + dividendsIncome + interestIncome + rental
    const netInvestment = Math.max(0, totalInvestmentIncome - expenses)

    // NIIT applies if AGI exceeds threshold
    const exceedsThreshold = totalAgi > threshold

    // Amount subject to NIIT
    // Lesser of: (1) Net investment income, or (2) MAGI over threshold
    const magiOverThreshold = totalAgi - threshold
    const niitBase = exceedsThreshold ? Math.min(netInvestment, magiOverThreshold) : 0

    // NIIT rate: 3.8%
    const niitRate = 0.038
    const niitAmount = niitBase * niitRate

    // Additional Medicare Tax on earned income (0.9%)
    // Separate from NIIT, applies to wages/self-employment
    const medicareThreshold = threshold
    const earnedIncome = totalAgi - totalInvestmentIncome
    const earnedOverThreshold = Math.max(0, earnedIncome - medicareThreshold)
    const medicareTax = earnedOverThreshold * 0.009

    // Total additional Medicare/NIIT
    const totalAdditionalTax = niitAmount + medicareTax

    // Income types subject to NIIT
    const taxableIncome = {
      capital_gains: gains > 0,
      dividends: dividendsIncome > 0,
      interest: interestIncome > 0,
      rental: rental > 0,
      royalties: false,
      passive_business: false
    }

    // Exempt income types
    const exemptIncome = {
      tax_exempt_interest: 'Municipal bond interest',
      retirement_distributions: 'IRA/401k distributions (if not investment income)',
      social_security: 'Social Security benefits',
      earned_income: 'Wages/Self-employment (subject to Medicare, not NIIT)',
      active_business: 'Active participation business income'
    }

    // MAGI calculation explanation
    const magi = totalAgi // Simplified (MAGI = AGI + foreign income adjustments)

    // Breakdown
    const breakdown = {
      threshold,
      agiOverThreshold: Math.max(0, totalAgi - threshold),
      netInvestment,
      lesserOf: niitBase,
      niitRate: '3.8%',
      niitAmount,
      medicareRate: '0.9%',
      medicareAmount: medicareTax,
      totalAdditionalTax
    }

    // Tax planning strategies
    const savingsOpportunities = [
      { strategy: 'Tax-loss harvesting', savings: gains > 0 ? Math.min(gains * 0.20, 3000) : 0 },
      { strategy: 'Municipal bonds', savings: interestIncome * 0.038 },
      { strategy: 'Roth conversions', savings: 'Reduces future MAGI' },
      { strategy: 'Charitable giving', savings: 'Reduces MAGI below threshold' }
    ]

    return {
      agi: totalAgi.toFixed(2),
      threshold: threshold.toFixed(0),
      filingStatus: status,
      exceedsThreshold,
      magi: magi.toFixed(2),
      magiOverThreshold: breakdown.agiOverThreshold.toFixed(2),
      capitalGains: gains.toFixed(2),
      dividends: dividendsIncome.toFixed(2),
      interest: interestIncome.toFixed(2),
      rentalIncome: rental.toFixed(2),
      totalInvestmentIncome: totalInvestmentIncome.toFixed(2),
      investmentExpenses: expenses.toFixed(2),
      netInvestment: netInvestment.toFixed(2),
      lesserOf: niitBase.toFixed(2),
      niitRate: '3.8%',
      niitAmount: niitAmount.toFixed(2),
      medicareAmount: medicareTax.toFixed(2),
      totalAdditionalTax: totalAdditionalTax.toFixed(2),
      investmentIncomeType: type,
      niitApplies: niitAmount > 0,
      medicareApplies: medicareTax > 0,
      taxableIncomeTypes: taxableIncome,
      exemptIncomeTypes: exemptIncome
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Net Investment Income Tax Calculator</h1>
      <p className="text-zinc-600">Calculate 3.8% NIIT (Net Investment Income Tax) on capital gains, dividends, interest, and rental income.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single ($200K threshold)</option>
              <option value="married">Married Joint ($250K threshold)</option>
              <option value="head_household">Head of Household ($250K threshold)</option>
              <option value="married_separate">Married Separate ($125K threshold)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Modified Adjusted Gross Income (MAGI)</label>
            <input
              type="number"
              value={agi}
              onChange={(e) => setAgi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total AGI"
            />
            <div className="text-xs text-zinc-500 mt-1">
              MAGI = AGI + foreign income adjustments (simplified here as AGI)
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Capital Gains</label>
              <input
                type="number"
                value={capitalGains}
                onChange={(e) => setCapitalGains(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter capital gains"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Dividends</label>
              <input
                type="number"
                value={dividends}
                onChange={(e) => setDividends(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter dividend income"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Interest Income</label>
              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter taxable interest"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Rental/Passive Income</label>
              <input
                type="number"
                value={rentalIncome}
                onChange={(e) => setRentalIncome(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter rental income"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Investment Expenses (Deduction)</label>
            <input
              type="number"
              value={investmentExpenses}
              onChange={(e) => setInvestmentExpenses(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Investment management fees, etc."
            />
            <div className="text-xs text-zinc-500 mt-1">
              State income taxes, investment fees (limited deduction)
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Threshold Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">NIIT Threshold ({result.filingStatus})</span>
            <span className="font-bold">$${result.threshold}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Your MAGI</span>
            <span className="font-bold">$${result.agi}</span>
          </div>
          <div className={`rounded p-3 flex justify-between ${result.exceedsThreshold ? 'bg-red-50' : 'bg-green-50'}`}>
            <span className="text-zinc-600">MAGI Over Threshold</span>
            <span className={`font-bold ${result.exceedsThreshold ? 'text-red-600' : 'text-green-600'}`}>
              $${result.magiOverThreshold}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Investment Income Breakdown</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Capital Gains</span>
            <span className="font-bold">$${result.capitalGains}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Dividends</span>
            <span className="font-bold">$${result.dividends}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Interest</span>
            <span className="font-bold">$${result.interest}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Rental Income</span>
            <span className="font-bold">$${result.rentalIncome}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Total Investment Income</span>
            <span className="font-bold">$${result.totalInvestmentIncome}</span>
          </div>
          {parseFloat(result.investmentExpenses) > 0 && (
            <div className="bg-blue-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Less: Expenses</span>
              <span className="font-bold text-blue-600">-$${result.investmentExpenses}</span>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">Net Investment Income</span>
            <span className="font-bold">$${result.netInvestment}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">NIIT Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-yellow-50 rounded p-3">
            <div className="font-medium mb-2">Tax Base = Lesser of:</div>
            <div className="flex justify-between">
              <span className="text-zinc-600">1. Net Investment Income</span>
              <span>$${result.netInvestment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">2. MAGI over Threshold</span>
              <span>$${result.magiOverThreshold}</span>
            </div>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">Amount Subject to NIIT</span>
            <span className="font-bold">$${result.lesserOf}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">NIIT Rate</span>
            <span className="font-bold">{result.niitRate}</span>
          </div>
          <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
            <span className="font-medium">NIIT Amount</span>
            <span className="font-bold text-red-600">$${result.niitAmount}</span>
          </div>
        </div>
      </div>

      {result.niitApplies ? (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">NIIT Applies - 3.8% Additional Tax</h3>
          <div className="text-sm text-red-600">
            MAGI ($${result.agi}) exceeds $${result.threshold} threshold. NIIT: $${result.niitAmount} on $${result.lesserOf} taxable amount. Plus Additional Medicare Tax on earned income if applicable. Total additional taxes: $${result.totalAdditionalTax}. Consider strategies to reduce MAGI below threshold.
          </div>
        </div>
      ) : (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">No NIIT - Below Threshold</h3>
          <div className="text-sm text-green-600">
            MAGI ($${result.agi}) below $${result.threshold} threshold. No 3.8% NIIT applies. You still owe regular income tax on investment income. Monitor income to avoid crossing threshold in future years.
          </div>
        </div>
      )}

      {result.medicareApplies && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Additional Medicare Tax (0.9%)</h3>
          <div className="text-sm text-yellow-600">
            Earned income exceeds threshold. Additional Medicare Tax: $${result.medicareAmount}. This is separate from NIIT (applies to wages/self-employment). Combined total: $${result.totalAdditionalTax}.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Total Additional Taxes</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">NIIT (3.8%)</div>
            <div className="text-2xl font-bold text-red-600">$${result.niitAmount}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Add. Medicare (0.9%)</div>
            <div className="text-2xl font-bold text-yellow-600">$${result.medicareAmount}</div>
          </div>
          <div className="bg-red-50 rounded p-4 col-span-2">
            <div className="text-sm text-zinc-500">Total Additional Tax</div>
            <div className="text-2xl font-bold text-red-600">$${result.totalAdditionalTax}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Income Subject to NIIT</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Taxable:</strong>
            <div className="text-zinc-500">Capital gains (long/short)</div>
            <div className="text-zinc-500">Dividends (qualified/non-qualified)</div>
            <div className="text-zinc-500">Interest (taxable)</div>
            <div className="text-zinc-500">Rental/passive income</div>
            <div className="text-zinc-500">Royalties</div>
            <div className="text-zinc-500">Passive business income</div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <strong>Exempt:</strong>
            <div className="text-zinc-500">Municipal bond interest</div>
            <div className="text-zinc-500">Social Security</div>
            <div className="text-zinc-500">IRA/401k distributions</div>
            <div className="text-zinc-500">Earned income (wages)</div>
            <div className="text-zinc-500">Active business income</div>
            <div className="text-zinc-500">Life insurance proceeds</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">NIIT Avoidance Strategies</h3>
        <div className="text-xs text-zinc-600">
          Tax-loss harvesting: Offset gains with losses. Municipal bonds: Tax-exempt interest. Roth conversions: Reduce future MAGI. Charitable donations: Reduce MAGI below threshold. Increase retirement contributions: Lower MAGI. Passive to active: Convert passive business to active (material participation). Timing income: Spread gains across years.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">NIIT vs Medicare Tax</h3>
        <div className="text-xs text-zinc-600">
          NIIT (3.8%): Investment income (gains, dividends, interest, rental, passive). Additional Medicare (0.9%): Earned income (wages, self-employment) over threshold. Both use same thresholds ($200K single, $250K married). Can apply simultaneously on different income types. Total max: 4.7% additional on combined income.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          NIIT enacted 2013 (Obamacare). Applies above threshold regardless of age. No phase-out - full 3.8% applies immediately. Cannot be offset by standard/itemized deductions. Consider in retirement planning: Roth conversions reduce future MAGI. State income taxes deductible from investment income (reduces NIIT base).
        </div>
      </div>
    </main>
  )
}