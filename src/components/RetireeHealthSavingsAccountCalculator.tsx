'use client'

import { useState } from 'react'

export default function RetireeHealthSavingsAccountCalculator() {
  const [currentAge, setCurrentAge] = useState(60)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentHSABalance, setCurrentHSABalance] = useState(30000)
  const [annualContribution, setAnnualContribution] = useState(4000)
  const [expectedReturnRate, setExpectedReturnRate] = useState(5)
  const [medicareAge, setMedicareAge] = useState(65)
  const [coverageType, setCoverageType] = useState<'individual' | 'family'>('individual')
  const [plannedWithdrawalRate, setPlannedWithdrawalRate] = useState(5000)

  const calculate = () => {
    // Years until Medicare (can't contribute to HSA after Medicare)
    const yearsUntilMedicare = Math.max(0, medicareAge - currentAge)

    // 2024 HSA contribution limits
    const individualLimit = 4150
    const familyLimit = 8300
    const catchUpAge = 55 // Can add $1,000 catch-up

    // Contribution limit based on coverage
    let contributionLimit = coverageType === 'individual' ? individualLimit : familyLimit
    if (currentAge >= catchUpAge) {
      contributionLimit += 1000 // Catch-up contribution
    }

    // Max contribution vs planned
    const maxAnnual = contributionLimit
    const actualContribution = Math.min(annualContribution, maxAnnual)

    // Growth until Medicare
    const yearsContributing = yearsUntilMedicare
    let balanceAtMedicare = currentHSABalance
    for (let i = 0; i < yearsContributing; i++) {
      balanceAtMedicare = balanceAtMedicare * (1 + expectedReturnRate / 100) + actualContribution
    }

    // After Medicare - growth only (no contributions)
    const yearsAfterMedicare = 20 // Assume 20 years of withdrawals
    let balanceAfterWithdrawals = balanceAtMedicare
    const totalWithdrawals = plannedWithdrawalRate * yearsAfterMedicare

    // Tax savings calculation
    const marginalTaxRate = 24 // Estimate
    const annualTaxSavings = actualContribution * marginalTaxRate / 100
    const totalTaxSavingsDuringContribution = annualTaxSavings * yearsContributing

    // Tax-free medical spending
    const taxFreeMedicalSavings = totalWithdrawals * marginalTaxRate / 100

    // Compare to taxable account
    const taxableAccountReturn = expectedReturnRate * (1 - marginalTaxRate / 100) // After tax
    let taxableBalance = currentHSABalance
    for (let i = 0; i < yearsContributing; i++) {
      taxableBalance = taxableBalance * (1 + taxableAccountReturn / 100) + actualContribution
    }
    for (let i = 0; i < yearsAfterMedicare; i++) {
      taxableBalance = taxableBalance * (1 + taxableAccountReturn / 100) - plannedWithdrawalRate
    }
    const hsasAdvantage = balanceAtMedicare - taxableBalance + taxFreeMedicalSavings

    // Medicare premium eligibility (can use HSA for premiums)
    const canUseForMedicarePremiums = true
    const estimatedMedicarePremiumsAnnual = 3000 // Part B + D estimate

    // Last year to contribute
    const lastContributionYear = 2026 + yearsUntilMedicare - 1

    return {
      currentAge: currentAge.toFixed(0),
      retirementAge: retirementAge.toFixed(0),
      currentHSABalance: currentHSABalance.toFixed(0),
      medicareAge: medicareAge.toFixed(0),
      coverageType,
      yearsUntilMedicare: yearsUntilMedicare.toFixed(0),
      contributionLimit: contributionLimit.toFixed(0),
      annualContribution: annualContribution.toFixed(0),
      actualContribution: actualContribution.toFixed(0),
      maxAnnual: maxAnnual.toFixed(0),
      expectedReturnRate: expectedReturnRate.toFixed(0),
      balanceAtMedicare: balanceAtMedicare.toFixed(0),
      plannedWithdrawalRate: plannedWithdrawalRate.toFixed(0),
      yearsAfterMedicare: yearsAfterMedicare.toFixed(0),
      totalWithdrawals: totalWithdrawals.toFixed(0),
      marginalTaxRate: marginalTaxRate.toFixed(0),
      annualTaxSavings: annualTaxSavings.toFixed(0),
      totalTaxSavingsDuringContribution: totalTaxSavingsDuringContribution.toFixed(0),
      taxFreeMedicalSavings: taxFreeMedicalSavings.toFixed(0),
      taxableBalance: taxableBalance.toFixed(0),
      hsasAdvantage: hsasAdvantage.toFixed(0),
      lastContributionYear: lastContributionYear.toFixed(0),
      estimatedMedicarePremiumsAnnual: estimatedMedicarePremiumsAnnual.toFixed(0),
      catchUpAge: catchUpAge.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Retiree Health Savings Account Calculator</h1>
      <p className="text-gray-600 mb-4">Plan HSA growth before Medicare and tax-free withdrawals after.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="55" max="64" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current HSA Balance ($)</label>
          <input type="number" value={currentHSABalance} onChange={(e) => setCurrentHSABalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Contribution ($)</label>
          <input type="number" value={annualContribution} min="0" max="10000" onChange={(e) => setAnnualContribution(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Coverage Type</label>
          <select value={coverageType} onChange={(e) => setCoverageType(e.target.value as 'individual' | 'family')} className="w-full border rounded p-2">
            <option value="individual">Self-only ($4,150 limit)</option>
            <option value="family">Family ($8,300 limit)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Return (%)</label>
          <input type="number" value={expectedReturnRate} min="0" max="10" onChange={(e) => setExpectedReturnRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Withdrawal Plan ($)</label>
          <input type="number" value={plannedWithdrawalRate} onChange={(e) => setPlannedWithdrawalRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Contribution Strategy</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Coverage:</span><span className="font-medium ml-2">{result.coverageType}</span></div>
          <div><span className="text-zinc-600">Max Limit:</span><span className="font-bold text-blue-700 ml-2">$ {result.maxAnnual}</span></div>
          <div><span className="text-zinc-600">Catch-up (age {result.catchUpAge}+):</span><span className="font-medium ml-2">$1,000</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Your Contribution:</span><span className="font-bold ml-2">$ {result.actualContribution}</span></div>
          <div><span className="text-zinc-600">Years Until Medicare:</span><span className="font-bold text-blue-700 ml-2">{result.yearsUntilMedicare}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Last year to contribute: {result.lastContributionYear}. Cannot contribute after Medicare enrollment.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">HSA Growth to Medicare</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Starting Balance:</span><span className="font-medium ml-2">$ {result.currentHSABalance}</span></div>
          <div><span className="text-zinc-600">Balance at Medicare:</span><span className="font-bold text-green-700 ml-2">$ {result.balanceAtMedicare}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Assumes {result.expectedReturnRate}% annual return and $ {result.actualContribution} contributions for {result.yearsUntilMedicare} years.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Annual Tax Savings:</span><span className="font-bold text-orange-700 ml-2">$ {result.annualTaxSavings}</span></div>
          <div><span className="text-zinc-600">Total Contribution Savings:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalTaxSavingsDuringContribution}</span></div>
          <div><span className="text-zinc-600">Tax-Free Withdrawals:</span><span className="font-bold text-orange-700 ml-2">$ {result.taxFreeMedicalSavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Assumes {result.marginalTaxRate}% marginal tax rate. Triple tax advantage: deductible contributions, tax-free growth, tax-free withdrawals.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">HSA vs Taxable Account</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">HSA Balance at Medicare:</span><span className="font-bold text-green-700 ml-2">$ {result.balanceAtMedicare}</span></div>
          <div><span className="text-zinc-600">Taxable Equivalent:</span><span className="font-medium ml-2">$ {result.taxableBalance}</span></div>
          <div><span className="text-zinc-600">HSA Advantage:</span><span className="font-bold text-purple-700 ml-2">$ {result.hsasAdvantage}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Taxable account loses {result.marginalTaxRate}% of gains to taxes annually.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Post-Medicicare Use</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Annual Withdrawal:</span><span className="font-medium ml-2">$ {result.plannedWithdrawalRate}</span></div>
          <div><span className="text-zinc-600">Est. Medicare Premiums:</span><span className="font-medium ml-2">$ {result.estimatedMedicarePremiumsAnnual}/yr</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Can use HSA for Medicare Part B, D, and supplemental premiums. Cannot contribute after Medicare, but can still withdraw.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">HSA Retirement Strategy</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Maximize contributions before age 65/Medicare enrollment</li>
          <li>Catch-up: extra $1,000/year if age 55+</li>
          <li>Cannot contribute after Medicare (Part A or B)</li>
          <li>Can still use HSA funds after Medicare (tax-free)</li>
          <li>Use for Medicare premiums, long-term care insurance</li>
          <li>After 65, can withdraw for non-medical (penalty-free, but taxed)</li>
          <li>Consider HSA as additional retirement account</li>
        </ul>
      </div>
    </div>
  )
}