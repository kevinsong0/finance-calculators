'use client'

import { useState } from 'react'

export default function TaxBracketOptimizerCalculator() {
  const [currentIncome, setCurrentIncome] = useState('120000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [deductionType, setDeductionType] = useState('standard')
  const [itemizedDeductions, setItemizedDeductions] = useState('18000')
  const [pretaxContributions, setPretaxContributions] = useState('23000')
  const [hsaContribution, setHsaContribution] = useState('4150')
  const [flexContributions, setFlexContributions] = useState('3300')
  const [charitableDonations, setCharitableDonations] = useState('5000')
  const [targetBracket, setTargetBracket] = useState('22')

  const taxBrackets: Record<string, Array<{ min: number; max: number; rate: number }>> = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
  }

  const standardDeduction: Record<string, number> = {
    single: 14600,
    married: 29200,
  }

  const calculateTax = (taxableIncome: number, brackets: Array<{ min: number; max: number; rate: number }>) => {
    let tax = 0
    let remaining = taxableIncome

    for (const bracket of brackets) {
      if (remaining <= 0) break
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
      tax += taxableInBracket * bracket.rate
      remaining -= taxableInBracket
    }
    return tax
  }

  const findCurrentBracket = (taxableIncome: number, brackets: Array<{ min: number; max: number; rate: number }>) => {
    for (const bracket of brackets) {
      if (taxableIncome >= bracket.min && taxableIncome < bracket.max) {
        return { rate: bracket.rate * 100, name: `${bracket.rate * 100}% bracket`, min: bracket.min, max: bracket.max }
      }
    }
    return { rate: 37, name: '37% bracket', min: 609350, max: Infinity }
  }

  const calculate = () => {
    const income = parseFloat(currentIncome) || 0
    const itemized = parseFloat(itemizedDeductions) || 0
    const pretax = parseFloat(pretaxContributions) || 0
    const hsa = parseFloat(hsaContribution) || 0
    const flex = parseFloat(flexContributions) || 0
    const charitable = parseFloat(charitableDonations) || 0
    const target = parseFloat(targetBracket) || 22

    const brackets = taxBrackets[filingStatus]
    const standard = standardDeduction[filingStatus]

    // Current situation (no optimization)
    const currentDeduction = deductionType === 'standard' ? standard : Math.max(itemized, standard)
    const currentTaxable = Math.max(0, income - currentDeduction)
    const currentBracket = findCurrentBracket(currentTaxable, brackets)
    const currentTax = calculateTax(currentTaxable, brackets)

    // Optimized situation
    const totalReductions = pretax + hsa + flex
    const effectiveDeduction = currentDeduction + totalReductions
    const optimizedTaxable = Math.max(0, income - effectiveDeduction)
    const optimizedBracket = findCurrentBracket(optimizedTaxable, brackets)
    const optimizedTax = calculateTax(optimizedTaxable, brackets)

    // Calculate the income needed to reach target bracket
    const targetBracketData = brackets.find(b => b.rate === target / 100)
    const targetThreshold = targetBracketData ? targetBracketData.min : 0
    const gapToTarget = currentTaxable - targetThreshold

    // How much more deduction needed to drop to target bracket
    const additionalDeductionNeeded = Math.max(0, gapToTarget)

    // Tax savings
    const taxSavings = currentTax - optimizedTax
    const marginalSavingsRate = currentBracket.rate // Each $100 deduction saves this % in taxes

    // Calculate effective tax rates
    const currentEffectiveRate = income > 0 ? (currentTax / income) * 100 : 0
    const optimizedEffectiveRate = income > 0 ? (optimizedTax / income) * 100 : 0

    // Bracket shift analysis
    const bracketShifted = currentBracket.rate !== optimizedBracket.rate

    // Strategies available
    const strategies = [
      {
        name: '401(k) Contribution',
        amount: pretax,
        limit: filingStatus === 'single' ? 23000 : 46000,
        taxSavings: pretax * currentBracket.rate / 100,
      },
      {
        name: 'HSA Contribution',
        amount: hsa,
        limit: filingStatus === 'single' ? 4150 : 8300,
        taxSavings: hsa * currentBracket.rate / 100,
      },
      {
        name: 'FSA Contribution',
        amount: flex,
        limit: 3300,
        taxSavings: flex * currentBracket.rate / 100,
      },
      {
        name: 'Charitable Donation',
        amount: charitable,
        limit: income * 0.6,
        taxSavings: deductionType === 'itemized' ? charitable * currentBracket.rate / 100 : 0,
      },
    ]

    const totalPotentialSavings = strategies.reduce((sum, s) => sum + s.taxSavings, 0)

    return {
      currentIncome: income.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      currentDeduction: currentDeduction.toFixed(2),
      currentTaxableIncome: currentTaxable.toFixed(2),
      currentBracketRate: currentBracket.rate.toFixed(0),
      currentBracketName: currentBracket.name,
      currentBracketMin: currentBracket.min.toFixed(0),
      currentBracketMax: currentBracket.max === Infinity ? '∞' : currentBracket.max.toFixed(0),
      currentTax: currentTax.toFixed(2),
      currentEffectiveRate: currentEffectiveRate.toFixed(2),
      effectiveDeduction: effectiveDeduction.toFixed(2),
      optimizedTaxableIncome: optimizedTaxable.toFixed(2),
      optimizedBracketRate: optimizedBracket.rate.toFixed(0),
      optimizedBracketName: optimizedBracket.name,
      optimizedTax: optimizedTax.toFixed(2),
      optimizedEffectiveRate: optimizedEffectiveRate.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      bracketShifted,
      marginalSavingsRate: marginalSavingsRate.toFixed(0),
      targetBracket: target.toFixed(0),
      targetThreshold: targetThreshold.toFixed(0),
      additionalDeductionNeeded: additionalDeductionNeeded.toFixed(2),
      pretaxContribution: pretax.toFixed(2),
      hsaContribution: hsa.toFixed(2),
      flexContribution: flex.toFixed(2),
      charitableDonation: charitable.toFixed(2),
      totalReductions: totalReductions.toFixed(2),
      strategies: strategies.map(s => ({
        ...s,
        amount: s.amount.toFixed(2),
        limit: s.limit.toFixed(0),
        taxSavings: s.taxSavings.toFixed(2),
      })),
      totalPotentialSavings: totalPotentialSavings.toFixed(2),
      standardDeduction: standard.toFixed(0),
      deductionType: deductionType === 'standard' ? 'Standard' : 'Itemized',
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax Bracket Optimizer Calculator</h1>
      <p className="text-zinc-600">Optimize your tax situation by understanding bracket thresholds and calculating how pre-tax contributions can reduce your taxable income and lower your tax bracket.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Income & Filing Status</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Income ($)</label>
            <input
              type="number"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Deduction Type</label>
            <select
              value={deductionType}
              onChange={(e) => setDeductionType(e.target.value)}
              className="input"
            >
              <option value="standard">Standard Deduction (${result.standardDeduction})</option>
              <option value="itemized">Itemized Deductions</option>
            </select>
          </div>
          {deductionType === 'itemized' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Itemized Deduction Amount ($)</label>
              <input
                type="number"
                value={itemizedDeductions}
                onChange={(e) => setItemizedDeductions(e.target.value)}
                className="input"
                min="0"
              />
              <div className="text-xs text-zinc-500 mt-1">
                Mortgage interest, state taxes (up to $10K), charitable donations, medical expenses over 7.5% AGI
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Pre-Tax Reduction Strategies</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">401(k) / 403(b) Contribution ($)</label>
            <input
              type="number"
              value={pretaxContributions}
              onChange={(e) => setPretaxContributions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              2024 limit: $23,000 (Single) or $46,000 (MFJ combined). $30,500 if age 50+.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">HSA Contribution ($)</label>
            <input
              type="number"
              value={hsaContribution}
              onChange={(e) => setHsaContribution(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              2024 limit: $4,150 (Self-only) or $8,300 (Family). $1,000 catch-up if 55+.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">FSA Contribution ($)</label>
            <input
              type="number"
              value={flexContributions}
              onChange={(e) => setFlexContributions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              2024 Health FSA limit: $3,300 per employer.
            </div>
          </div>
          {deductionType === 'itemized' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Charitable Donations ($)</label>
              <input
                type="number"
                value={charitableDonations}
                onChange={(e) => setCharitableDonations(e.target.value)}
                className="input"
                min="0"
              />
              <div className="text-xs text-zinc-500 mt-1">
                Deduction limited to 60% of AGI for cash donations.
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Tax Bracket (%)</label>
            <select
              value={targetBracket}
              onChange={(e) => setTargetBracket(e.target.value)}
              className="input"
            >
              <option value="10">10% bracket</option>
              <option value="12">12% bracket</option>
              <option value="22">22% bracket</option>
              <option value="24">24% bracket</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Current Tax Bracket Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Gross Income:</span>
            <span className="font-medium ml-2">${result.currentIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-medium ml-2">${result.currentTaxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current Bracket:</span>
            <span className="font-bold ml-2">{result.currentBracketName}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bracket Range:</span>
            <span className="font-medium ml-2">${result.currentBracketMin} - ${result.currentBracketMax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Owed:</span>
            <span className="font-medium ml-2">${result.currentTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-medium ml-2">{result.currentEffectiveRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Optimized Tax Situation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">New Taxable Income:</span>
            <span className="font-medium ml-2">${result.optimizedTaxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">New Bracket:</span>
            <span className="font-bold ml-2">{result.optimizedBracketName}</span>
          </div>
          <div>
            <span className="text-zinc-600">New Tax:</span>
            <span className="font-medium ml-2">${result.optimizedTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">New Effective Rate:</span>
            <span className="font-medium ml-2">{result.optimizedEffectiveRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-emerald-50 border border-emerald-200">
        <h3 className="font-medium mb-2 text-emerald-700">Tax Savings</h3>
        <div className="text-2xl font-bold text-emerald-800">${result.taxSavings}</div>
        <div className="text-sm text-emerald-600 mt-1">
          {result.bracketShifted
            ? `Bracket shifted from ${result.currentBracketRate}% to ${result.optimizedBracketRate}%!`
            : `Still in ${result.currentBracketRate}% bracket, but saved on taxes`}
        </div>
        <div className="text-xs text-emerald-600 mt-1">
          Marginal savings rate: Every $100 of deduction saves ${result.marginalSavingsRate} in taxes
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Breakdown of Tax Savings</h3>
        <div className="space-y-2 text-sm">
          {result.strategies.map((s) => (
            <div key={s.name} className="flex justify-between">
              <span className="text-zinc-600">{s.name} (${s.amount})</span>
              <span className="font-medium">${s.taxSavings} saved</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-2 pt-2">
          <div className="flex justify-between">
            <span className="font-medium">Total Tax Savings</span>
            <span className="font-bold">${result.totalPotentialSavings}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Bracket Threshold Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Target Bracket:</span>
            <span className="font-medium ml-2">{result.targetBracket}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Threshold:</span>
            <span className="font-medium ml-2">${result.targetThreshold}</span>
          </div>
          <div>
            <span className="text-zinc-600">Gap to Target:</span>
            <span className="font-medium ml-2">${result.additionalDeductionNeeded}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Deductions Applied:</span>
            <span className="font-medium ml-2">${result.totalReductions}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          Need ${result.additionalDeductionNeeded} more deductions to reach the {result.targetBracket}% bracket threshold.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Pre-tax 401(k):</strong> Reduces taxable income immediately. Employer match adds extra benefit.</li>
          <li><strong>HSA Triple Tax Benefit:</strong> Tax-free contribution, tax-free growth, tax-free withdrawal for medical expenses.</li>
          <li><strong>FSA:</strong> Use-it-or-lose-it but reduces taxable income for qualified health expenses.</li>
          <li><strong>Charitable Bunching:</strong> Bundle multiple years of donations into one year to exceed standard deduction.</li>
          <li><strong>Bracket Management:</strong> Each $1,000 deduction saves your marginal rate in taxes (22% = $220 saved).</li>
          <li><strong>Marginal vs Effective:</strong> Marginal rate is what you pay on next dollar earned. Effective rate is total tax / total income.</li>
        </ul>
      </div>
    </main>
  )
}