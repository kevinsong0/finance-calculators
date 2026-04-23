'use client'

import { useState } from 'react'

export default function TaxEfficientWithdrawalCalculator() {
  const [portfolioValue, setPortfolioValue] = useState('')
  const [targetWithdrawal, setTargetWithdrawal] = useState('')
  const [traditionalBalance, setTraditionalBalance] = useState('')
  const [rothBalance, setRothBalance] = useState('')
  const [taxableBalance, setTaxableBalance] = useState('')
  const [age, setAge] = useState('')
  const [taxBracket, setTaxBracket] = useState('')
  const [stateTaxRate, setStateTaxRate] = useState('')
  const [targetYear, setTargetYear] = useState('')

  const calculate = () => {
    const portfolio = parseFloat(portfolioValue) || 1000000
    const withdrawal = parseFloat(targetWithdrawal) || 60000
    const traditional = parseFloat(traditionalBalance) || 400000
    const roth = parseFloat(rothBalance) || 300000
    const taxable = parseFloat(taxableBalance) || 300000
    const userAge = parseInt(age) || 65
    const bracket = parseFloat(taxBracket) || 22
    const stateRate = parseFloat(stateTaxRate) || 5
    const year = parseInt(targetYear) || 2026

    // Combined tax rate
    const federalRate = bracket / 100
    const combinedRate = federalRate + (stateRate / 100)

    // Strategy 1: Traditional only (highest tax)
    const traditionalWithdrawal = Math.min(withdrawal, traditional)
    const traditionalTax = traditionalWithdrawal * combinedRate
    const traditionalNet = traditionalWithdrawal - traditionalTax

    // Strategy 2: Roth only (no tax, but may be too early)
    const rothWithdrawal = Math.min(withdrawal, roth)
    const rothTax = 0
    const rothNet = rothWithdrawal

    // Strategy 3: Taxable first (capital gains rates)
    const taxableWithdrawal = Math.min(withdrawal, taxable)
    // Assume 50% of taxable is basis (non-taxable), 50% is gains
    const taxableBasis = taxableWithdrawal * 0.5
    const taxableGains = taxableWithdrawal * 0.5
    // Capital gains rate (assume 15% long-term for most retirees)
    const capGainsRate = bracket <= 15 ? 0 : bracket <= 20 ? 0.15 : 0.20
    const taxableTax = taxableGains * capGainsRate + taxableWithdrawal * (stateRate / 100)
    const taxableNet = taxableWithdrawal - taxableTax

    // Strategy 4: Optimized mix (taxable first, then Traditional/Roth blend)
    // Use taxable first (lowest tax on gains), then fill bracket with Traditional
    const bracketRoom = withdrawal * federalRate // Approximate room in bracket
    const optimizedTaxableUse = Math.min(withdrawal, taxable)
    const remainingNeed1 = withdrawal - optimizedTaxableUse
    const optimizedTraditionalUse = Math.min(remainingNeed1, traditional)
    const remainingNeed2 = remainingNeed1 - optimizedTraditionalUse
    const optimizedRothUse = Math.min(remainingNeed2, roth)

    // Calculate optimized tax
    const optTaxableTax = optimizedTaxableUse * 0.5 * capGainsRate + optimizedTaxableUse * (stateRate / 100)
    const optTraditionalTax = optimizedTraditionalUse * combinedRate
    const optRothTax = 0
    const optimizedTotalTax = optTaxableTax + optTraditionalTax + optRothTax
    const optimizedNet = withdrawal - optimizedTotalTax

    // Strategy 5: Bracket fill (use Traditional up to bracket limit)
    const bracketLimit = withdrawal // Simplified
    const bracketFillTraditional = Math.min(withdrawal, traditional)
    const bracketFillTax = bracketFillTraditional * combinedRate
    const bracketFillNet = bracketFillTraditional - bracketFillTax

    // Compare strategies
    const strategies = [
      { name: 'Traditional Only', tax: traditionalTax, net: traditionalNet, useTraditional: traditionalWithdrawal, useRoth: 0, useTaxable: 0 },
      { name: 'Roth Only', tax: rothTax, net: rothNet, useTraditional: 0, useRoth: rothWithdrawal, useTaxable: 0 },
      { name: 'Taxable First', tax: taxableTax, net: taxableNet, useTraditional: 0, useRoth: 0, useTaxable: taxableWithdrawal },
      { name: 'Optimized Mix', tax: optimizedTotalTax, net: optimizedNet, useTraditional: optimizedTraditionalUse, useRoth: optimizedRothUse, useTaxable: optimizedTaxableUse },
      { name: 'Bracket Fill', tax: bracketFillTax, net: bracketFillNet, useTraditional: bracketFillTraditional, useRoth: 0, useTaxable: 0 }
    ]

    // Sort by lowest tax
    const bestStrategy = strategies.reduce((a, b) => a.tax < b.tax ? a : b)

    // Savings comparison
    const worstStrategy = strategies.reduce((a, b) => a.tax > b.tax ? a : b)
    const savingsVsWorst = worstStrategy.tax - bestStrategy.tax

    // RMD consideration (age 73+)
    const rmdApplies = userAge >= 73
    const rmdAmount = traditional / 26.5 // Simplified factor for age 73

    // 10-year projection of tax savings
    const annualSavings = savingsVsWorst
    const tenYearSavings = annualSavings * 10

    return {
      portfolioValue: portfolio.toFixed(2),
      targetWithdrawal: withdrawal.toFixed(2),
      traditionalBalance: traditional.toFixed(2),
      rothBalance: roth.toFixed(2),
      taxableBalance: taxable.toFixed(2),
      age: userAge,
      taxBracket: bracket.toFixed(0),
      federalRate: (federalRate * 100).toFixed(0),
      stateRate: stateRate.toFixed(1),
      combinedRate: (combinedRate * 100).toFixed(1),
      capGainsRate: (capGainsRate * 100).toFixed(0),
      strategies: strategies.map(s => ({
        ...s,
        tax: s.tax.toFixed(2),
        net: s.net.toFixed(2),
        useTraditional: s.useTraditional.toFixed(2),
        useRoth: s.useRoth.toFixed(2),
        useTaxable: s.useTaxable.toFixed(2)
      })),
      bestStrategyName: bestStrategy.name,
      bestTax: bestStrategy.tax.toFixed(2),
      worstStrategyName: worstStrategy.name,
      worstTax: worstStrategy.tax.toFixed(2),
      savingsVsWorst: savingsVsWorst.toFixed(2),
      rmdApplies,
      rmdAmount: rmdAmount.toFixed(2),
      tenYearSavings: tenYearSavings.toFixed(2),
      year
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax-Efficient Withdrawal Calculator</h1>
      <p className="text-zinc-600">Optimize retirement withdrawal strategy from Traditional IRA, Roth IRA, and taxable accounts to minimize taxes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Portfolio Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Annual Withdrawal</label>
            <input
              type="number"
              value={targetWithdrawal}
              onChange={(e) => setTargetWithdrawal(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual income need"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Traditional/401(k) Balance</label>
            <input
              type="number"
              value={traditionalBalance}
              onChange={(e) => setTraditionalBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Pre-tax account balance"
            />
            <div className="text-xs text-zinc-500 mt-1">Taxed as ordinary income when withdrawn</div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Roth IRA Balance</label>
            <input
              type="number"
              value={rothBalance}
              onChange={(e) => setRothBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="After-tax account balance"
            />
            <div className="text-xs text-zinc-500 mt-1">Tax-free withdrawals if 59.5+ and 5-year rule met</div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Taxable Account Balance</label>
            <input
              type="number"
              value={taxableBalance}
              onChange={(e) => setTaxableBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Brokerage/non-retirement balance"
            />
            <div className="text-xs text-zinc-500 mt-1">Capital gains rates (0%/15%/20%) on growth</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Your Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Federal Tax Bracket (%)</label>
              <input
                type="number"
                value={taxBracket}
                onChange={(e) => setTaxBracket(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter bracket (10/12/22/24/32)"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State Tax Rate (%)</label>
            <input
              type="number"
              value={stateTaxRate}
              onChange={(e) => setStateTaxRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter state tax rate"
            />
            <div className="text-xs text-zinc-500 mt-1">
              FL/TX/WA: 0%, CA: 9.3%, NY: 8.8%, Average: 5%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Strategy Comparison</h3>
        <div className="space-y-2 text-xs">
          {result.strategies.map((s, idx) => (
            <div key={idx} className={`rounded p-3 ${s.name === result.bestStrategyName ? 'bg-green-50 border border-green-200' : 'bg-white'}`}>
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${s.name === result.bestStrategyName ? 'text-green-700' : ''}`}>{s.name}</span>
                {s.name === result.bestStrategyName && <span className="text-green-600 text-xs">BEST</span>}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-zinc-500">Traditional: </span>
                  <span>$${s.useTraditional}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Roth: </span>
                  <span>$${s.useRoth}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Taxable: </span>
                  <span>$${s.useTaxable}</span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-zinc-500">Tax:</span>
                <span className={`font-bold ${parseFloat(s.tax) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  $${s.tax}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Best Strategy: {result.bestStrategyName}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax on Withdrawal</div>
            <div className="text-2xl font-bold text-green-600">$${result.bestTax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Savings vs Worst</div>
            <div className="text-2xl font-bold text-green-600">$${result.savingsVsWorst}</div>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Using optimized withdrawal order saves $${result.savingsVsWorst}/year. Over 10 years: $${result.tenYearSavings} additional retirement income.
        </div>
      </div>

      {result.rmdApplies && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">RMD Consideration (Age {result.age})</h3>
          <div className="text-sm text-yellow-600">
            At age {result.age}, RMDs apply to Traditional accounts. Estimated RMD: $${result.rmdAmount}. Must withdraw RMD first, then optimize remaining withdrawal. Consider Roth conversions before RMD age to reduce future RMDs and taxes.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Withdrawal Priority Order</h3>
        <div className="text-xs text-zinc-600">
          Recommended order: 1. Taxable accounts (lowest capital gains rates). 2. Traditional IRA/401(k) (fill lower brackets). 3. Roth (preserve for high-tax years, late retirement, estate). Exceptions: Use Roth if need tax-free income for specific year, if expecting higher future rates, or for large expenses.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Account Type Tax Treatment</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Traditional</strong>
            <div className="text-zinc-500">Ordinary income rates</div>
            <div className="text-zinc-500">{result.federalRate}% federal + {result.stateRate}% state</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Roth</strong>
            <div className="text-zinc-500">Tax-free withdrawals</div>
            <div className="text-zinc-500">No federal or state tax</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Taxable</strong>
            <div className="text-zinc-500">Capital gains rates</div>
            <div className="text-zinc-500">{result.capGainsRate}% federal + state on gains</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Strategies</h3>
        <div className="text-xs text-zinc-600">
          Bracket fill: Withdraw Traditional up to bracket limit, avoid pushing into higher bracket. Roth ladder: Convert Traditional to Roth in low-income years. Tax-loss harvesting: Offset taxable gains with losses. Asset location: Keep high-growth in Roth, bonds in Traditional. Charitable: Use Traditional for QCD (tax-free up to $105K after 70.5).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Advanced Considerations</h3>
        <div className="text-xs text-zinc-600">
          Social Security taxation: Income affects SS taxation (provisional income). Medicare IRMAA: High income increases premiums. AMT considerations for complex situations. Estate planning: Roth inherits tax-free, better for heirs. State differences: Some states exempt retirement income. Consider all factors for holistic planning.
        </div>
      </div>
    </main>
  )
}