'use client'

import { useState } from 'react'

export default function RetirementAccountWithdrawalSequenceCalculator() {
  const [currentAge, setCurrentAge] = useState(65)
  const [retirementAge, setRetirementAge] = useState(65)
  const [lifeExpectancy, setLifeExpectancy] = useState(90)
  const [taxableBalance, setTaxableBalance] = useState(50000)
  const [traditional401kBalance, setTraditional401kBalance] = useState(300000)
  const [rothBalance, setRothBalance] = useState(100000)
  const [annualExpenses, setAnnualExpenses] = useState(50000)
  const [expectedReturn, setExpectedReturn] = useState(5)
  const [taxBracket, setTaxBracket] = useState(22)

  const calculate = () => {
    // Strategy 1: Taxable first, then Traditional, then Roth
    const yearsInRetirement = lifeExpectancy - currentAge
    const withdrawalNeeded = annualExpenses

    // Order: Taxable → Traditional → Roth (common strategy)
    // Benefits: Deplete taxable first (already taxed), preserve tax-free growth in Roth

    // Strategy 1 simulation
    let s1Taxable = taxableBalance
    let s1Traditional = traditional401kBalance
    let s1Roth = rothBalance

    const strategy1Withdrawals = []
    for (let i = 0; i < yearsInRetirement; i++) {
      let fromTaxable = 0, fromTraditional = 0, fromRoth = 0
      let remainingNeed = withdrawalNeeded

      // Taxable first
      if (s1Taxable > 0 && remainingNeed > 0) {
        fromTaxable = Math.min(s1Taxable, remainingNeed)
        remainingNeed -= fromTaxable
        s1Taxable -= fromTaxable
      }

      // Traditional next
      if (s1Traditional > 0 && remainingNeed > 0) {
        fromTraditional = Math.min(s1Traditional, remainingNeed)
        remainingNeed -= fromTraditional
        s1Traditional -= fromTraditional
      }

      // Roth last
      if (s1Roth > 0 && remainingNeed > 0) {
        fromRoth = Math.min(s1Roth, remainingNeed)
        s1Roth -= fromRoth
      }

      // Growth on remaining balances
      s1Taxable *= (1 + expectedReturn / 100)
      s1Traditional *= (1 + expectedReturn / 100)
      s1Roth *= (1 + expectedReturn / 100)

      strategy1Withdrawals.push({ year: i + 1, fromTaxable, fromTraditional, fromRoth })
    }

    const strategy1FinalRoth = s1Roth

    // Strategy 2: Roth first (preserve Traditional for RMD)
    let s2Taxable = taxableBalance
    let s2Traditional = traditional401kBalance
    let s2Roth = rothBalance

    const strategy2Withdrawals = []
    for (let i = 0; i < yearsInRetirement; i++) {
      let fromTaxable = 0, fromTraditional = 0, fromRoth = 0
      let remainingNeed = withdrawalNeeded

      // Roth first (to avoid RMD later)
      if (s2Roth > 0 && remainingNeed > 0) {
        fromRoth = Math.min(s2Roth, remainingNeed)
        remainingNeed -= fromRoth
        s2Roth -= fromRoth
      }

      // Taxable next
      if (s2Taxable > 0 && remainingNeed > 0) {
        fromTaxable = Math.min(s2Taxable, remainingNeed)
        remainingNeed -= fromTaxable
        s2Taxable -= fromTaxable
      }

      // Traditional last
      if (s2Traditional > 0 && remainingNeed > 0) {
        fromTraditional = Math.min(s2Traditional, remainingNeed)
        s2Traditional -= fromTraditional
      }

      s2Taxable *= (1 + expectedReturn / 100)
      s2Traditional *= (1 + expectedReturn / 100)
      s2Roth *= (1 + expectedReturn / 100)

      strategy2Withdrawals.push({ year: i + 1, fromTaxable, fromTraditional, fromRoth })
    }

    const strategy2FinalTraditional = s2Traditional

    // RMD considerations
    const rmdStartAge = 73 // SECURE 2.0 Act
    const rmdApplies = currentAge >= rmdStartAge
    const rmdYears = Math.max(0, lifeExpectancy - rmdStartAge)

    // Simplified RMD estimate
    const rmdFactor = 26.5 // Age 73 factor (simplified)
    const annualRMD = traditional401kBalance / rmdFactor

    // Tax impact comparison
    // Strategy 1: Traditional withdrawals taxed, Roth preserved
    const s1TaxOnTraditional = strategy1Withdrawals.reduce((sum, w) => sum + w.fromTraditional * taxBracket / 100, 0)

    // Strategy 2: Roth withdrawals tax-free, Traditional grows (RMD taxed later)
    const s2TaxOnRMD = s2Traditional * taxBracket / 100 * 0.5 // Simplified

    // Recommended sequence
    const recommendedSequence = taxableBalance > annualExpenses * 3 ? 'Taxable → Traditional → Roth' :
                                taxBracket >= 24 ? 'Roth → Taxable → Traditional' :
                                'Taxable → Traditional → Roth'

    // Total balances
    const totalBalance = taxableBalance + traditional401kBalance + rothBalance
    const yearsCovered = totalBalance / annualExpenses

    return {
      currentAge: currentAge.toFixed(0),
      retirementAge: retirementAge.toFixed(0),
      lifeExpectancy: lifeExpectancy.toFixed(0),
      taxableBalance: taxableBalance.toFixed(0),
      traditional401kBalance: traditional401kBalance.toFixed(0),
      rothBalance: rothBalance.toFixed(0),
      totalBalance: totalBalance.toFixed(0),
      annualExpenses: annualExpenses.toFixed(0),
      expectedReturn: expectedReturn.toFixed(0),
      taxBracket: taxBracket.toFixed(0),
      yearsInRetirement: yearsInRetirement.toFixed(0),
      yearsCovered: yearsCovered.toFixed(1),
      strategy1FinalRoth: strategy1FinalRoth.toFixed(0),
      strategy2FinalTraditional: strategy2FinalTraditional.toFixed(0),
      s1TaxOnTraditional: s1TaxOnTraditional.toFixed(0),
      s2TaxOnRMD: s2TaxOnRMD.toFixed(0),
      rmdStartAge: rmdStartAge.toFixed(0),
      rmdApplies,
      rmdYears: rmdYears.toFixed(0),
      annualRMD: annualRMD.toFixed(0),
      recommendedSequence,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Retirement Account Withdrawal Sequence Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize withdrawal order to minimize taxes and maximize longevity.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="55" max="85" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Life Expectancy</label>
          <input type="number" value={lifeExpectancy} min="75" max="100" onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taxable Account Balance</label>
          <input type="number" value={taxableBalance} onChange={(e) => setTaxableBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional 401(k)/IRA Balance</label>
          <input type="number" value={traditional401kBalance} onChange={(e) => setTraditional401kBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Roth IRA Balance</label>
          <input type="number" value={rothBalance} onChange={(e) => setRothBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Expenses</label>
          <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Return (%)</label>
          <input type="number" value={expectedReturn} min="0" max="10" onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Bracket (%)</label>
          <select value={taxBracket} onChange={(e) => setTaxBracket(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="10">10%</option>
            <option value="12">12%</option>
            <option value="22">22%</option>
            <option value="24">24%</option>
            <option value="32">32%</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Account Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Taxable:</span><span className="font-medium ml-2">$ {result.taxableBalance}</span></div>
          <div><span className="text-zinc-600">Traditional:</span><span className="font-medium ml-2">$ {result.traditional401kBalance}</span></div>
          <div><span className="text-zinc-600">Roth:</span><span className="font-medium ml-2">$ {result.rothBalance}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Balance:</span><span className="font-bold text-blue-700 ml-2">$ {result.totalBalance}</span></div>
          <div><span className="text-zinc-600">Years Covered:</span><span className="font-bold text-blue-700 ml-2">{result.yearsCovered}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy 1: Taxable → Traditional → Roth</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Order:</span><span className="font-medium ml-2">Taxable first, then Traditional</span></div>
          <div><span className="text-zinc-600">Final Roth:</span><span className="font-bold text-green-700 ml-2">$ {result.strategy1FinalRoth}</span></div>
          <div><span className="text-zinc-600">Tax on Traditional:</span><span className="font-medium ml-2">$ {result.s1TaxOnTraditional}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Preserves Roth for late retirement. Traditional taxed at withdrawal.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy 2: Roth → Taxable → Traditional</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Order:</span><span className="font-medium ml-2">Roth first, preserve Traditional</span></div>
          <div><span className="text-zinc-600">Final Traditional:</span><span className="font-bold text-purple-700 ml-2">$ {result.strategy2FinalTraditional}</span></div>
          <div><span className="text-zinc-600">Tax on RMDs:</span><span className="font-medium ml-2">$ {result.s2TaxOnRMD}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Reduces RMD burden. Traditional grows tax-deferred but taxed at RMD.</div>
      </div>

      <div className={`card mb-6 ${result.rmdApplies ? 'bg-orange-50 border border-orange-200' : 'bg-teal-50 border border-teal-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.rmdApplies ? 'text-orange-700' : 'text-teal-700'}`}>RMD Considerations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">RMD Starts:</span><span className="font-medium ml-2">Age {result.rmdStartAge}</span></div>
          <div><span className="text-zinc-600">RMD Applies:</span><span className={`font-bold ml-2 ${result.rmdApplies ? 'text-orange-700' : 'text-teal-700'}`}>{result.rmdApplies ? 'Yes' : 'No (yet)'}</span></div>
          <div><span className="text-zinc-600">Est. Annual RMD:</span><span className="font-bold text-orange-700 ml-2">$ {result.annualRMD}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SECURE 2.0 Act: RMDs start at age 73 (was 72). Traditional accounts subject to RMD.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommended Sequence</h2>
        <div className="text-lg font-bold text-teal-700">{result.recommendedSequence}</div>
        <div className="text-xs text-zinc-600 mt-2">Based on your account balances, tax bracket, and RMD timing.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Withdrawal Sequence Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Taxable first: already taxed, reduces estate taxes</li>
          <li>Traditional: taxed at withdrawal, RMD at age 73+</li>
          <li>Roth: tax-free growth, no RMD, ideal for late retirement</li>
          <li>High tax bracket: consider Roth first to lower taxable income</li>
          <li>Low tax bracket: withdraw Traditional to fill bracket</li>
          <li>Consider Roth conversions in low-income years</li>
          <li>Balance RMDs with voluntary withdrawals</li>
          <li>Coordinate with Social Security taxation thresholds</li>
          <li>Review annually as tax brackets and balances change</li>
        </ul>
      </div>
    </div>
  )
}