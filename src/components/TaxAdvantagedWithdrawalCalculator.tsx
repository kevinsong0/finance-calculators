'use client'

import { useState } from 'react'

export default function TaxAdvantagedWithdrawalCalculator() {
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [traditionalIRA, setTraditionalIRA] = useState(500000)
  const [rothIRA, setRothIRA] = useState(200000)
  const [taxableAccount, setTaxableAccount] = useState(100000)
  const [annualExpenses, setAnnualExpenses] = useState(60000)
  const [socialSecurity, setSocialSecurity] = useState(24000)
  const [currentAge, setCurrentAge] = useState(65)
  const [withdrawalYears, setWithdrawalYears] = useState(25)
  const [targetTaxBracket, setTargetTaxBracket] = useState(12)

  const calculate = () => {
    // Standard deduction 2024
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200

    // Tax brackets 2024
    const bracketsSingle = [0, 11600, 47150, 100525, 191950, 243725, 609350]
    const bracketsMarried = [0, 23200, 94300, 201050, 383900, 487450, 731200]
    const brackets = filingStatus === 'single' ? bracketsSingle : bracketsMarried

    // Find bracket limit for target
    const bracketIndex = targetTaxBracket === 10 ? 1 : targetTaxBracket === 12 ? 2 : targetTaxBracket === 22 ? 3 : 4
    const bracketLimit = brackets[bracketIndex]

    // Room in bracket after SS and deduction
    const ssTaxablePortion = socialSecurity * 0.85 // Assume 85% taxable
    const taxableSS = ssTaxablePortion
    const roomInBracket = bracketLimit - standardDeduction - taxableSS

    // Traditional withdrawal to fill bracket
    const traditionalToFillBracket = Math.max(0, roomInBracket)

    // Remaining expenses to cover
    const remainingExpenses = annualExpenses - socialSecurity - traditionalToFillBracket

    // Optimal withdrawal sequence
    // 1. RMD (if applicable, age 73+) - included in traditional above
    // 2. Traditional to fill bracket
    // 3. Taxable (long-term gains at 0% if in 12% bracket)
    // 4. Roth for remainder

    let taxableWithdrawal = 0
    let rothWithdrawal = 0

    if (remainingExpenses > 0) {
      // LTCG 0% bracket same as 12% income bracket
      const ltcgZeroBracket = filingStatus === 'single' ? 47025 : 94050
      const ltcgRoom = Math.max(0, ltcgZeroBracket - taxableSS - traditionalToFillBracket)

      taxableWithdrawal = Math.min(remainingExpenses, Math.min(taxableAccount, ltcgRoom))
      rothWithdrawal = remainingExpenses - taxableWithdrawal
    }

    // Tax calculation
    const traditionalTax = traditionalToFillBracket * (targetTaxBracket / 100)
    const taxableGainsTax = 0 // In 0% LTCG bracket
    const rothTax = 0
    const totalTax = traditionalTax + taxableGainsTax + rothTax

    // Effective tax rate
    const totalWithdrawal = traditionalToFillBracket + taxableWithdrawal + rothWithdrawal + socialSecurity
    const effectiveRate = totalWithdrawal > 0 ? (totalTax / totalWithdrawal) * 100 : 0

    // Multi-year projection
    const traditionalDrawdown = traditionalToFillBracket * withdrawalYears
    const taxableDrawdown = taxableWithdrawal * withdrawalYears
    const rothDrawdown = rothWithdrawal * withdrawalYears

    const traditionalRemaining = Math.max(0, traditionalIRA - traditionalDrawdown)
    const taxableRemaining = Math.max(0, taxableAccount - taxableDrawdown)
    const rothRemaining = Math.max(0, rothIRA - rothDrawdown)

    // SS taxation impact
    const combinedIncome = traditionalToFillBracket + taxableWithdrawal + socialSecurity * 0.5
    const ssTaxablePercent = filingStatus === 'single'
      ? (combinedIncome > 34000 ? (combinedIncome > 44000 ? 85 : 50) : 0)
      : (combinedIncome > 32000 ? (combinedIncome > 44000 ? 85 : 50) : 0)

    return {
      filingStatus,
      traditionalIRA: traditionalIRA.toFixed(0),
      rothIRA: rothIRA.toFixed(0),
      taxableAccount: taxableAccount.toFixed(0),
      totalAssets: (traditionalIRA + rothIRA + taxableAccount).toFixed(0),
      annualExpenses: annualExpenses.toFixed(0),
      socialSecurity: socialSecurity.toFixed(0),
      currentAge: currentAge.toFixed(0),
      withdrawalYears: withdrawalYears.toFixed(0),
      standardDeduction: standardDeduction.toFixed(0),
      bracketLimit: bracketLimit.toFixed(0),
      targetTaxBracket: targetTaxBracket.toFixed(0),
      taxableSS: taxableSS.toFixed(0),
      roomInBracket: roomInBracket.toFixed(0),
      traditionalWithdrawal: traditionalToFillBracket.toFixed(0),
      taxableWithdrawal: taxableWithdrawal.toFixed(0),
      rothWithdrawal: rothWithdrawal.toFixed(0),
      traditionalTax: traditionalTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      totalWithdrawal: totalWithdrawal.toFixed(0),
      traditionalRemaining: traditionalRemaining.toFixed(0),
      taxableRemaining: taxableRemaining.toFixed(0),
      rothRemaining: rothRemaining.toFixed(0),
      ssTaxablePercent: ssTaxablePercent.toFixed(0),
      combinedIncome: combinedIncome.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax-Advantaged Withdrawal Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize withdrawal sequence to minimize retirement taxes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional IRA/401(k) ($)</label>
          <input type="number" value={traditionalIRA} onChange={(e) => setTraditionalIRA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Roth IRA ($)</label>
          <input type="number" value={rothIRA} onChange={(e) => setRothIRA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taxable Account ($)</label>
          <input type="number" value={taxableAccount} onChange={(e) => setTaxableAccount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Expenses ($)</label>
          <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Social Security Income ($)</label>
          <input type="number" value={socialSecurity} onChange={(e) => setSocialSecurity(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Tax Bracket (%)</label>
          <select value={targetTaxBracket} onChange={(e) => setTargetTaxBracket(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="10">10%</option>
            <option value="12">12%</option>
            <option value="22">22%</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Account Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Traditional:</span><span className="font-bold ml-2">$ {result.traditionalIRA}</span></div>
          <div><span className="text-zinc-600">Roth:</span><span className="font-bold ml-2">$ {result.rothIRA}</span></div>
          <div><span className="text-zinc-600">Taxable:</span><span className="font-bold ml-2">$ {result.taxableAccount}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-blue-700 ml-2">$ {result.totalAssets}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bracket Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Standard Deduction:</span><span className="font-medium ml-2">$ {result.standardDeduction}</span></div>
          <div><span className="text-zinc-600">Bracket Limit:</span><span className="font-medium ml-2">$ {result.bracketLimit}</span></div>
          <div><span className="text-zinc-600">Target Bracket:</span><span className="font-bold ml-2">{result.targetTaxBracket}%</span></div>
          <div><span className="text-zinc-600">Taxable SS:</span><span className="font-medium ml-2">$ {result.taxableSS}</span></div>
          <div><span className="text-zinc-600">Room in Bracket:</span><span className="font-bold text-purple-700 ml-2">$ {result.roomInBracket}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Optimal Withdrawal Sequence</h2>
        <div className="grid grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Traditional:</span><span className="font-bold text-green-700 ml-2">$ {result.traditionalWithdrawal}</span></div>
          <div><span className="text-zinc-600">Taxable:</span><span className="font-bold ml-2">$ {result.taxableWithdrawal}</span></div>
          <div><span className="text-zinc-600">Roth:</span><span className="font-bold ml-2">$ {result.rothWithdrawal}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">1) Traditional to fill bracket, 2) Taxable (0% LTCG), 3) Roth for remainder.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Traditional Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.traditionalTax}</span></div>
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveRate}%</span></div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Social Security Taxation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Combined Income:</span><span className="font-medium ml-2">$ {result.combinedIncome}</span></div>
          <div><span className="text-zinc-600">SS Taxable:</span><span className="font-bold ml-2">{result.ssTaxablePercent}%</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Multi-Year Projection ({result.withdrawalYears} years)</h2>
        <div className="grid grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Traditional Left:</span><span className="font-bold ml-2">$ {result.traditionalRemaining}</span></div>
          <div><span className="text-zinc-600">Taxable Left:</span><span className="font-bold ml-2">$ {result.taxableRemaining}</span></div>
          <div><span className="text-zinc-600">Roth Left:</span><span className="font-bold ml-2">$ {result.rothRemaining}</span></div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Withdrawal Strategy Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Fill lower tax brackets with Traditional withdrawals</li>
          <li>Use taxable account for 0% LTCG in low-income years</li>
          <li>Roth: save for high-income years, emergencies, legacy</li>
          <li>Manage SS taxation: stay below 85% threshold</li>
          <li>RMDs start at 73: plan Traditional drawdown before then</li>
        </ul>
      </div>
    </div>
  )
}