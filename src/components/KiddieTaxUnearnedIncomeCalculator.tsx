'use client'

import { useState } from 'react'

export default function KiddieTaxUnearnedIncomeCalculator() {
  const [childAge, setChildAge] = useState(15)
  const [unearnedIncome, setUnearnedIncome] = useState(15000)
  const [earnedIncome, setEarnedIncome] = useState(3000)
  const [parentTaxRate, setParentTaxRate] = useState(24)
  const [isStudent, setIsStudent] = useState(true)
  const [investmentType, setInvestmentType] = useState<'interest' | 'dividends' | 'capital_gains'>('interest')

  const calculate = () => {
    // Kiddie Tax Unearned Income Calculator
    // Tax on child's unearned income at parent's rate

    // Kiddie Tax rules (post-2018):
    // - Applies to children under 19, or under 24 if full-time student
    // - Unearned income over $2,300 (2024) taxed at parent's rate
    // - First $1,150 tax-free (standard deduction for unearned)
    // - Next $1,150 taxed at child's rate (10%)
    // - Above $2,300 taxed at parent's rate

    // Threshold amounts (indexed annually)
    const thresholds: Record<number, { taxFree: number; childRate: number; kiddieLimit: number }> = {
      2023: { taxFree: 1150, childRate: 1150, kiddieLimit: 2300 },
      2024: { taxFree: 1250, childRate: 1250, kiddieLimit: 2500 },
      2025: { taxFree: 1300, childRate: 1300, kiddieLimit: 2600 },
    }

    const threshold = thresholds[2024] // Use 2024 values
    const taxFreeAmount = threshold.taxFree
    const childRateAmount = threshold.childRate
    const kiddieThreshold = threshold.kiddieLimit

    // Check if kiddie tax applies
    const ageLimit = isStudent ? 24 : 19
    const kiddieTaxApplies = childAge < ageLimit && unearnedIncome > kiddieThreshold

    // Calculate tax tiers
    // Tier 1: First $1,250 tax-free (offset by standard deduction)
    const tier1Income = Math.min(unearnedIncome, taxFreeAmount)
    const tier1Tax = 0

    // Tier 2: Next $1,250 taxed at child's rate (10%)
    const tier2Income = Math.min(Math.max(0, unearnedIncome - taxFreeAmount), childRateAmount)
    const childRate = 0.10
    const tier2Tax = tier2Income * childRate

    // Tier 3: Above $2,500 taxed at parent's rate (kiddie tax)
    const tier3Income = Math.max(0, unearnedIncome - kiddieThreshold)
    const parentRate = parentTaxRate / 100
    const tier3Tax = tier3Income * parentRate

    // Total kiddie tax
    const totalKiddieTax = tier1Tax + tier2Tax + tier3Tax

    // Earned income tax (child's rate)
    const earnedStandardDeduction = Math.max(0, earnedIncome - Math.min(earnedIncome, 1250))
    const earnedTax = earnedStandardDeduction * 0.10 // Simplified

    // Total child tax
    const totalChildTax = totalKiddieTax + earnedTax

    // Compare to if taxed entirely at child's rate
    const childOnlyTax = (unearnedIncome - taxFreeAmount) * childRate
    const taxIncreaseDueToKiddie = totalKiddieTax - childOnlyTax

    // Alternative: parent includes child's income
    // Parent can elect to include child's income on their return
    // If child's income between $2,500 and $11,000
    const parentIncludeAllowed = unearnedIncome >= kiddieThreshold && unearnedIncome <= 11000
    const parentIncludeBenefit = parentIncludeAllowed ? 'Simplified filing - no separate return for child' : 'Not eligible - must file separate return'

    // Tax breakdown
    const taxBreakdown = [
      { tier: 'Tier 1 (Tax-Free)', amount: tier1Income, rate: 0, tax: tier1Tax },
      { tier: 'Tier 2 (Child Rate)', amount: tier2Income, rate: 10, tax: tier2Tax },
      { tier: 'Tier 3 (Parent Rate)', amount: tier3Income, rate: parentTaxRate, tax: tier3Tax },
    ]

    // Recommendation
    let recommendation = ''
    if (!kiddieTaxApplies) {
      recommendation = `Kiddie tax does NOT apply. Age ${childAge}, unearned income $${unearnedIncome.toFixed(0)} below $${kiddieThreshold} threshold. All income taxed at child's 10% rate. Tax: $${childOnlyTax.toFixed(0)}. File child's own return.`
    } else if (parentIncludeAllowed) {
      recommendation = `Kiddie tax applies. Unearned income $${unearnedIncome.toFixed(0)} exceeds $${kiddieThreshold}. Parent can elect to include on parent's return (simpler). Or file Form 8615 with child's return. Total tax: $${totalKiddieTax.toFixed(0)}. Extra tax due to kiddie: $${taxIncreaseDueToKiddie.toFixed(0)}.`
    } else {
      recommendation = `Kiddie tax applies. Unearned income $${unearnedIncome.toFixed(0)} exceeds $${kiddieThreshold}. Must file Form 8615 with child's return. Tier 1: $${tier1Income.toFixed(0)} tax-free. Tier 2: $${tier2Income.toFixed(0)} at 10%. Tier 3: $${tier3Income.toFixed(0)} at ${parentTaxRate}%. Total: $${totalKiddieTax.toFixed(0)}.`
    }

    // Avoidance strategies
    const avoidanceStrategies = [
      'Invest in tax-free municipal bonds',
      'Use tax-deferred accounts (529, Roth)',
      'Delay realization of gains until 19/24',
      'Invest in growth stocks (no dividends)',
      'Gift appreciated assets (child sells)',
    ]

    return {
      childAge: childAge.toFixed(0),
      unearnedIncome: unearnedIncome.toFixed(0),
      earnedIncome: earnedIncome.toFixed(0),
      parentTaxRate: parentTaxRate.toFixed(0),
      isStudent,
      investmentType,
      kiddieTaxApplies,
      ageLimit: ageLimit.toFixed(0),
      taxFreeAmount: taxFreeAmount.toFixed(0),
      kiddieThreshold: kiddieThreshold.toFixed(0),
      tier1Income: tier1Income.toFixed(0),
      tier2Income: tier2Income.toFixed(0),
      tier3Income: tier3Income.toFixed(0),
      totalKiddieTax: totalKiddieTax.toFixed(0),
      earnedTax: earnedTax.toFixed(0),
      totalChildTax: totalChildTax.toFixed(0),
      childOnlyTax: childOnlyTax.toFixed(0),
      taxIncreaseDueToKiddie: taxIncreaseDueToKiddie.toFixed(0),
      parentIncludeAllowed,
      parentIncludeBenefit,
      taxBreakdown,
      recommendation,
      avoidanceStrategies,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Kiddie Tax Unearned Income Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on child's unearned income at parent's rate.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Child's Age</label>
          <input type="number" value={childAge} onChange={(e) => setChildAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unearned Income</label>
          <input type="number" value={unearnedIncome} onChange={(e) => setUnearnedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Earned Income (Wages)</label>
          <input type="number" value={earnedIncome} onChange={(e) => setEarnedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parent's Tax Rate (%)</label>
          <input type="number" value={parentTaxRate} onChange={(e) => setParentTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full-Time Student?</label>
          <select value={isStudent ? 'yes' : 'no'} onChange={(e) => setIsStudent(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes (extends to age 24)</option>
            <option value="no">No (expires at age 19)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Type</label>
          <select value={investmentType} onChange={(e) => setInvestmentType(e.target.value as 'interest' | 'dividends' | 'capital_gains')} className="w-full border rounded p-2">
            <option value="interest">Interest</option>
            <option value="dividends">Dividends</option>
            <option value="capital_gains">Capital Gains</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.kiddieTaxApplies ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Kiddie Tax Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Child Age:</span><span className="font-medium ml-2">{result.childAge}</span></div>
          <div><span className="text-zinc-600">Age Limit:</span><span className="font-medium ml-2">{result.ageLimit}</span></div>
          <div><span className="text-zinc-600">Kiddie Tax:</span><span className={`font-bold ml-2 ${result.kiddieTaxApplies ? 'text-red-700' : 'text-green-700'}`}>{result.kiddieTaxApplies ? 'APPLIES' : 'Does NOT Apply'}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Tier Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Tier</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Rate</th>
                <th className="py-2 text-left">Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.taxBreakdown.map((t) => (
                <tr key={t.tier} className="border-b">
                  <td className="py-1 font-semibold">{t.tier}</td>
                  <td className="py-1">$ {t.amount.toFixed(0)}</td>
                  <td className="py-1">{t.rate}%</td>
                  <td className="py-1 font-bold">$ {t.tax.toFixed(0)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="py-1">Total Unearned Tax</td>
                <td className="py-1">$ {result.unearnedIncome}</td>
                <td className="py-1"></td>
                <td className="py-1">$ {result.totalKiddieTax}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r">
            <h3 className="font-semibold mb-2">With Kiddie Tax</h3>
            <div><span className="text-zinc-600">Unearned Tax:</span><span className="font-bold ml-2">$ {result.totalKiddieTax}</span></div>
            <div><span className="text-zinc-600">Earned Tax:</span><span className="font-medium ml-2">$ {result.earnedTax}</span></div>
            <div><span className="text-zinc-600">Total:</span><span className="font-bold ml-2">$ {result.totalChildTax}</span></div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">At Child's Rate Only</h3>
            <div><span className="text-zinc-600">Unearned Tax:</span><span className="font-medium ml-2">$ {result.childOnlyTax}</span></div>
            <div><span className="text-zinc-600">Extra Kiddie Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.taxIncreaseDueToKiddie}</span></div>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Filing Options</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Threshold:</span><span className="font-medium ml-2">$ {result.kiddieThreshold}</span></div>
          <div><span className="text-zinc-600">Parent Include:</span><span className={`font-medium ml-2 ${result.parentIncludeAllowed ? 'text-green-700' : 'text-red-700'}`}>{result.parentIncludeAllowed ? 'Allowed' : 'Not Allowed'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.parentIncludeBenefit}</div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Avoidance Strategies</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.avoidanceStrategies.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Kiddie Tax Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Applies under 19, or under 24 if student</li>
          <li>First $1,250 tax-free (2024)</li>
          <li>Next $1,250 at child's 10% rate</li>
          <li>Above $2,500 at parent's rate</li>
          <li>Form 8615 for separate filing</li>
          <li>Parent election if $2,500-$11,000</li>
          <li>Only unearned income affected</li>
          <li>Earned income taxed normally</li>
          <li>Use tax-free investments</li>
          <li>Plan timing of gains</li>
        </ul>
      </div>
    </div>
  )
}