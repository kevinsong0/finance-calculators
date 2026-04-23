'use client'

import { useState } from 'react'

export default function CorporateTaxCalculator() {
  const [businessType, setBusinessType] = useState('ccorp')
  const [grossRevenue, setGrossRevenue] = useState('5000000')
  const [operatingExpenses, setOperatingExpenses] = useState('3000000')
  const [salaries, setSalaries] = useState('1500000')
  const [interestExpense, setInterestExpense] = useState('100000')
  const [depreciation, setDepreciation] = useState('200000')
  const [charitableContributions, setCharitableContributions] = useState('50000')
  const [stateOfOperation, setStateOfOperation] = useState('CA')
  const [hasForeignIncome, setHasForeignIncome] = useState(false)
  const [foreignIncome, setForeignIncome] = useState('0')
  const [taxYear, setTaxYear] = useState('2024')

  // State corporate tax rates
  const stateCorporateTaxRates: Record<string, { rate: number; hasMinimum: boolean }> = {
    CA: { rate: 8.84, hasMinimum: true },
    TX: { rate: 0, hasMinimum: false }, // Franchise tax instead
    NY: { rate: 6.5, hasMinimum: true },
    FL: { rate: 5.5, hasMinimum: false },
    AZ: { rate: 4.9, hasMinimum: false },
    CO: { rate: 4.4, hasMinimum: false },
    PA: { rate: 9.99, hasMinimum: false },
    IL: { rate: 9.5, hasMinimum: false },
    WA: { rate: 0, hasMinimum: false }, // B&O tax instead
    NV: { rate: 0, hasMinimum: false }, // Modified business tax
    OH: { rate: 0, hasMinimum: false }, // Commercial activity tax
    NJ: { rate: 9.0, hasMinimum: true },
    MA: { rate: 8.0, hasMinimum: true },
    NC: { rate: 2.5, hasMinimum: false },
    GA: { rate: 5.75, hasMinimum: false },
    VA: { rate: 6.0, hasMinimum: false },
    MI: { rate: 6.0, hasMinimum: false },
    IN: { rate: 4.8, hasMinimum: false },
    UT: { rate: 4.85, hasMinimum: false },
  }

  const federalCorporateTaxBrackets2024 = [
    { min: 0, max: 50000, rate: 0.15 },
    { min: 50000, max: 75000, rate: 0.25 },
    { min: 75000, max: 100000, rate: 0.34 },
    { min: 100000, max: 335000, rate: 0.39 },
    { min: 335000, max: 10000000, rate: 0.34 },
    { min: 10000000, max: 15000000, rate: 0.35 },
    { min: 15000000, max: 18333333, rate: 0.38 },
    { min: 18333333, max: Infinity, rate: 0.21 }, // Flat 21% for large corps
  ]

  const calculate = () => {
    const revenue = parseFloat(grossRevenue) || 0
    const expenses = parseFloat(operatingExpenses) || 0
    const salary = parseFloat(salaries) || 0
    const interest = parseFloat(interestExpense) || 0
    const depr = parseFloat(depreciation) || 0
    const charitable = parseFloat(charitableContributions) || 0
    const foreign = parseFloat(foreignIncome) || 0
    const year = parseInt(taxYear) || 2024

    const stateData = stateCorporateTaxRates[stateOfOperation] || { rate: 5, hasMinimum: false }

    // Calculate taxable income
    const grossProfit = revenue - expenses - salary
    const taxableIncomeBeforeDeductions = grossProfit - interest - depr

    // Charitable contribution limit (10% of taxable income)
    const charitableLimit = taxableIncomeBeforeDeductions * 0.10
    const allowedCharitable = Math.min(charitable, charitableLimit)
    const taxableIncome = Math.max(0, taxableIncomeBeforeDeductions - allowedCharitable)

    // Federal corporate tax calculation
    let federalTax = 0

    if (businessType === 'ccorp') {
      // C-Corp: Graduated rates
      let remaining = taxableIncome
      for (const bracket of federalCorporateTaxBrackets2024) {
        if (remaining <= 0) break
        const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
        federalTax += taxableInBracket * bracket.rate
        remaining -= taxableInBracket
      }

      // Alternative: Flat 21% may be simpler for very large corps
      // This is for income over $18.33M
    } else {
      // Pass-through (S-Corp, LLC): No federal corporate tax
      // Owners pay individual tax on income
      federalTax = 0
    }

    // State corporate tax
    const stateTax = taxableIncome * (stateData.rate / 100)

    // Foreign income tax (simplified)
    const foreignTax = hasForeignIncome ? foreign * 0.21 : 0

    // Total tax
    const totalTax = federalTax + stateTax + foreignTax

    // Effective tax rate
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0

    // Net income after tax
    const netIncome = taxableIncome - totalTax

    // Pass-through comparison (if C-Corp)
    // Estimate what owners would pay if pass-through
    const ownerMarginalRate = 0.35 // Estimate
    const passThroughTaxEstimate = businessType === 'ccorp' ?
      (taxableIncome - federalTax) * ownerMarginalRate : 0

    // Double taxation impact (C-Corp dividends)
    const dividendTax = businessType === 'ccorp' && netIncome > 0 ?
      netIncome * 0.20 * 0.15 : 0 // 20% dividend payout at 15% rate

    return {
      businessType: businessType === 'ccorp' ? 'C-Corporation' :
                    businessType === 'scorp' ? 'S-Corporation (Pass-through)' :
                    'LLC (Pass-through)',
      grossRevenue: revenue.toFixed(2),
      operatingExpenses: expenses.toFixed(2),
      salaries: salary.toFixed(2),
      grossProfit: grossProfit.toFixed(2),
      interestExpense: interest.toFixed(2),
      depreciation: depr.toFixed(2),
      charitableContributions: charitable.toFixed(2),
      charitableLimit: charitableLimit.toFixed(2),
      allowedCharitable: allowedCharitable.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      federalTax: federalTax.toFixed(2),
      stateOfOperation: stateOfOperation === 'CA' ? 'California' :
                        stateOfOperation === 'TX' ? 'Texas' :
                        stateOfOperation === 'NY' ? 'New York' :
                        stateOfOperation === 'FL' ? 'Florida' : stateOfOperation,
      stateTaxRate: stateData.rate.toFixed(2),
      stateTax: stateTax.toFixed(2),
      hasForeignIncome,
      foreignIncome: foreign.toFixed(2),
      foreignTax: foreignTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      netIncome: netIncome.toFixed(2),
      passThroughTaxEstimate: passThroughTaxEstimate.toFixed(2),
      dividendTax: dividendTax.toFixed(2),
      doubleTaxationTotal: businessType === 'ccorp' ?
        (totalTax + dividendTax).toFixed(2) : '0.00',
      taxYear: year.toFixed(0),
      isCCorp: businessType === 'ccorp',
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Corporate Tax Calculator</h1>
      <p className="text-zinc-600">Calculate corporate income tax for C-Corporations and compare with pass-through entities (S-Corp, LLC). Understand double taxation, state taxes, and deduction limits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Structure</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="input"
            >
              <option value="ccorp">C-Corporation (Subject to corporate tax)</option>
              <option value="scorp">S-Corporation (Pass-through)</option>
              <option value="llc">LLC (Pass-through)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State of Operation</label>
            <select
              value={stateOfOperation}
              onChange={(e) => setStateOfOperation(e.target.value)}
              className="input"
            >
              <option value="CA">California (8.84%)</option>
              <option value="TX">Texas (Franchise tax, no income tax)</option>
              <option value="NY">New York (6.5%)</option>
              <option value="FL">Florida (5.5%)</option>
              <option value="AZ">Arizona (4.9%)</option>
              <option value="CO">Colorado (4.4%)</option>
              <option value="PA">Pennsylvania (9.99%)</option>
              <option value="IL">Illinois (9.5%)</option>
              <option value="NJ">New Jersey (9%)</option>
              <option value="MA">Massachusetts (8%)</option>
              <option value="NC">North Carolina (2.5%)</option>
              <option value="GA">Georgia (5.75%)</option>
              <option value="VA">Virginia (6%)</option>
              <option value="MI">Michigan (6%)</option>
              <option value="IN">Indiana (4.8%)</option>
              <option value="UT">Utah (4.85%)</option>
              <option value="WA">Washington (B&O tax)</option>
              <option value="NV">Nevada (Modified business tax)</option>
              <option value="OH">Ohio (Commercial activity tax)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="input"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Revenue & Expenses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Revenue ($)</label>
            <input
              type="number"
              value={grossRevenue}
              onChange={(e) => setGrossRevenue(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Operating Expenses ($)</label>
            <input
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Salaries & Wages ($)</label>
            <input
              type="number"
              value={salaries}
              onChange={(e) => setSalaries(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Deductions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Expense ($)</label>
            <input
              type="number"
              value={interestExpense}
              onChange={(e) => setInterestExpense(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Depreciation ($)</label>
            <input
              type="number"
              value={depreciation}
              onChange={(e) => setDepreciation(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Charitable Contributions ($)</label>
            <input
              type="number"
              value={charitableContributions}
              onChange={(e) => setCharitableContributions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Limited to 10% of taxable income. Excess carries forward 5 years.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasForeignIncome}
              onChange={(e) => setHasForeignIncome(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Has foreign-source income</label>
          </div>
          {hasForeignIncome && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Foreign Income ($)</label>
              <input
                type="number"
                value={foreignIncome}
                onChange={(e) => setForeignIncome(e.target.value)}
                className="input"
                min="0"
              />
            </div>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Income Calculation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Gross Revenue:</span>
            <span className="font-medium ml-2">${result.grossRevenue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Gross Profit:</span>
            <span className="font-medium ml-2">${result.grossProfit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-bold ml-2">${result.taxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Charitable Deduction:</span>
            <span className="font-medium ml-2">${result.allowedCharitable}</span>
          </div>
        </div>
      </div>

      {!result.isCCorp ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Pass-Through Entity</h3>
          <div className="text-sm text-green-600">
            {result.businessType} does not pay corporate income tax. Income passes to owners who report on personal returns.
          </div>
          <div className="text-xs text-green-600 mt-2">
            Owners pay individual income tax + potential SE tax (S-Corp can reduce SE tax via salary/distribution split).
          </div>
        </div>
      ) : (
        <>
          <div className="card bg-purple-50 border border-purple-200">
            <h3 className="font-medium mb-2 text-purple-700">Federal Corporate Tax</h3>
            <div className="text-xl font-bold text-purple-800">${result.federalTax}</div>
            <div className="text-sm text-purple-600 mt-1">
              Graduated rates: 15% ($0-50K) → 25% → 34% → 35% → 38% → 21% (over $18.33M flat)
            </div>
          </div>

          <div className="card bg-orange-50 border border-orange-200">
            <h3 className="font-medium mb-2 text-orange-700">{result.stateOfOperation} Corporate Tax</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-600">State Rate:</span>
                <span className="font-medium ml-2">{result.stateTaxRate}%</span>
              </div>
              <div>
                <span className="text-zinc-600">State Tax:</span>
                <span className="font-medium ml-2">${result.stateTax}</span>
              </div>
            </div>
          </div>

          <div className="card bg-red-50 border border-red-200">
            <h3 className="font-medium mb-2 text-red-700">Total Corporate Tax</h3>
            <div className="text-2xl font-bold text-red-800">${result.totalTax}</div>
            <div className="text-sm text-red-600 mt-1">
              Effective rate: {result.effectiveRate}%
            </div>
          </div>

          <div className="card bg-yellow-50 border border-yellow-200">
            <h3 className="font-medium mb-2 text-yellow-700">Double Taxation Impact</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-600">Corporate Tax:</span>
                <span className="font-medium ml-2">${result.totalTax}</span>
              </div>
              <div>
                <span className="text-zinc-600">Dividend Tax (est.):</span>
                <span className="font-medium ml-2">${result.dividendTax}</span>
              </div>
              <div>
                <span className="text-zinc-600">Total Double Tax:</span>
                <span className="font-bold ml-2">${result.doubleTaxationTotal}</span>
              </div>
              <div>
                <span className="text-zinc-600">Net to Owners:</span>
                <span className="font-medium ml-2">${(parseFloat(result.netIncome) - parseFloat(result.dividendTax)).toFixed(2)}</span>
              </div>
            </div>
            <div className="text-xs text-yellow-600 mt-2">
              Assumes 20% of net income paid as dividends at 15% shareholder tax rate.
            </div>
          </div>

          <div className="card bg-teal-50 border border-teal-200">
            <h3 className="font-medium mb-2 text-teal-700">Pass-Through Comparison</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-600">C-Corp Total Tax:</span>
                <span className="font-medium ml-2">${result.doubleTaxationTotal}</span>
              </div>
              <div>
                <span className="text-zinc-600">Pass-Through Estimate:</span>
                <span className="font-medium ml-2">${result.passThroughTaxEstimate}</span>
              </div>
            </div>
            <div className="text-xs text-teal-600 mt-2">
              Compare total tax burden including dividend taxation vs pass-through owner taxation.
            </div>
          </div>
        </>
      )}

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Net Income After Tax</h3>
        <div className="text-2xl font-bold text-green-800">${result.netIncome}</div>
        {result.isCCorp && (
          <div className="text-sm text-green-600 mt-1">
            Retained earnings available for reinvestment or future dividends
          </div>
        )}
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">C-Corp vs Pass-Through Decision</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>C-Corp Advantages:</strong> Unlimited shareholders, stock options, retained earnings, potential lower tax at high profits (21% flat).</li>
          <li><strong>C-Corp Disadvantage:</strong> Double taxation (corporate tax + dividend tax). No QBI deduction.</li>
          <li><strong>S-Corp Advantages:</strong> No corporate tax, pass-through, QBI deduction, reduce SE tax via salary/distribution split.</li>
          <li><strong>S-Corp Limits:</strong> 100 shareholders max, US residents only, one class of stock.</li>
          <li><strong>LLC Advantages:</strong> Flexibility, pass-through, QBI deduction, no shareholder limits.</li>
          <li><strong>LLC Disadvantage:</strong> Full SE tax on net income unless taxed as S-Corp.</li>
          <li><strong>Break-even:</strong> C-Corp preferred when profits retained (not distributed) or shareholders are tax-exempt.</li>
          <li><strong>Qualified Business Income:</strong> Pass-through entities eligible for 20% QBI deduction (not C-Corps).</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Federal Corporate Tax Brackets (2024)</h3>
        <ul className="text-xs text-zinc-600 space-y-1">
          <li>$0 - $50,000: 15%</li>
          <li>$50,000 - $75,000: 25%</li>
          <li>$75,000 - $100,000: 34%</li>
          <li>$100,000 - $335,000: 39%</li>
          <li>$335,000 - $10,000,000: 34%</li>
          <li>$10,000,000 - $15,000,000: 35%</li>
          <li>$15,000,000 - $18,333,333: 38%</li>
          <li>Over $18,333,333: Flat 21%</li>
        </ul>
      </div>
    </main>
  )
}