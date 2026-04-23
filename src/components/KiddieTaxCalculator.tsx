'use client'

import { useState } from 'react'

export default function KiddieTaxCalculator() {
  const [childAge, setChildAge] = useState(15)
  const [childUnearnedIncome, setChildUnearnedIncome] = useState(3500)
  const [parentMarginalRate, setParentMarginalRate] = useState(24)
  const [studentStatus, setStudentStatus] = useState(false)
  const [earnedIncome, setEarnedIncome] = useState(500)

  const calculate = () => {
    // Kiddie tax applies to children under 19, or under 24 if full-time student
    const ageLimit = studentStatus ? 24 : 19
    const kiddieTaxApplies = childAge < ageLimit

    // Standard deduction for unearned income
    const standardDeduction = Math.max(earnedIncome, 350) + 400 // Minimum $350 for unearned, plus $400 for earned
    const unearnedDeduction = 1150 // $1150 standard deduction for unearned income only

    // Tax calculation without kiddie tax (child's own rate)
    const taxableUnearnedWithoutKiddie = Math.max(0, childUnearnedIncome - unearnedDeduction)
    const childTaxRate = taxableUnearnedWithoutKiddie <= 1000 ? 10 : taxableUnearnedWithoutKiddie <= 11000 ? 10 : 12 // Simplified
    const childOwnTax = taxableUnearnedWithoutKiddie <= 1150 ? taxableUnearnedWithoutKiddie * 0.10 :
                        taxableUnearnedWithoutKiddie <= 11500 ? 115 + (taxableUnearnedWithoutKiddie - 1150) * 0.12 : 0 // Simplified brackets

    // Kiddie tax calculation (parent's rate applies to net unearned income > $2300)
    const netUnearnedIncome = Math.max(0, childUnearnedIncome - 2300)

    // First $1150 taxed at child's rate (10%), next $1150 at child's rate (10%), excess at parent's rate
    const firstTierTax = Math.min(childUnearnedIncome, 1150) * 0.10
    const secondTierIncome = Math.max(0, Math.min(childUnearnedIncome - 1150, 1150))
    const secondTierTax = secondTierIncome * 0.10
    const excessUnearnedIncome = Math.max(0, childUnearnedIncome - 2300)
    const excessTax = excessUnearnedIncome * (parentMarginalRate / 100)

    const totalKiddieTax = firstTierTax + secondTierTax + excessTax

    // Tax savings/loss from kiddie tax vs child's own rate
    const taxDifference = totalKiddieTax - childOwnTax

    // For 2024, threshold is $2300 of net unearned income
    const threshold = 2300

    return {
      childAge: childAge.toFixed(0),
      childUnearnedIncome: childUnearnedIncome.toFixed(2),
      parentMarginalRate: parentMarginalRate.toFixed(0),
      earnedIncome: earnedIncome.toFixed(2),
      studentStatus,
      ageLimit: ageLimit.toFixed(0),
      kiddieTaxApplies,
      unearnedDeduction: unearnedDeduction.toFixed(0),
      netUnearnedIncome: netUnearnedIncome.toFixed(2),
      firstTierTax: firstTierTax.toFixed(2),
      secondTierTax: secondTierTax.toFixed(2),
      excessUnearnedIncome: excessUnearnedIncome.toFixed(2),
      excessTax: excessTax.toFixed(2),
      totalKiddieTax: totalKiddieTax.toFixed(2),
      childOwnTax: childOwnTax.toFixed(2),
      taxDifference: taxDifference.toFixed(2),
      threshold: threshold.toFixed(0),
      aboveThreshold: childUnearnedIncome > threshold,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Kiddie Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on child's unearned income at parent's rate (Kiddie Tax rules).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Child's Age</label>
          <input
            type="number"
            value={childAge}
            onChange={(e) => setChildAge(Number(e.target.value))}
            min="0"
            max="25"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unearned Income ($)</label>
          <input
            type="number"
            value={childUnearnedIncome}
            onChange={(e) => setChildUnearnedIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parent's Marginal Rate (%)</label>
          <input
            type="number"
            value={parentMarginalRate}
            onChange={(e) => setParentMarginalRate(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Child's Earned Income ($)</label>
          <input
            type="number"
            value={earnedIncome}
            onChange={(e) => setEarnedIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={studentStatus}
            onChange={(e) => setStudentStatus(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Full-Time Student (extends age limit to 24)</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Kiddie Tax Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Kiddie Tax Applies:</span>
            <span className={`font-bold ml-2 ${result.kiddieTaxApplies ? 'text-orange-600' : 'text-green-600'}`}>
              {result.kiddieTaxApplies ? 'Yes' : 'No'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Age Limit:</span>
            <span className="font-medium ml-2">{result.ageLimit} years</span>
          </div>
          <div>
            <span className="text-zinc-600">Threshold:</span>
            <span className="font-medium ml-2">$ {result.threshold}</span>
          </div>
          <div>
            <span className="text-zinc-600">Above Threshold:</span>
            <span className={`font-bold ml-2 ${result.aboveThreshold ? 'text-orange-600' : 'text-green-600'}`}>
              {result.aboveThreshold ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {!result.kiddieTaxApplies && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">No Kiddie Tax</h2>
          <div className="text-sm text-green-700">
            Child is {result.childAge} years old, which exceeds the {result.ageLimit}-year limit. Unearned income taxed at child's own rate.
          </div>
        </div>
      )}

      {result.kiddieTaxApplies && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Kiddie Tax Calculation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Unearned Income:</span>
              <span className="font-medium ml-2">$ {result.childUnearnedIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">Net Unearned (over $2300):</span>
              <span className="font-bold text-orange-600 ml-2">$ {result.netUnearnedIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">First Tier Tax (10%):</span>
              <span className="font-medium ml-2">$ {result.firstTierTax}</span>
            </div>
            <div>
              <span className="text-zinc-600">Second Tier Tax (10%):</span>
              <span className="font-medium ml-2">$ {result.secondTierTax}</span>
            </div>
            <div>
              <span className="text-zinc-600">Excess at Parent Rate:</span>
              <span className="font-bold text-red-600 ml-2">$ {result.excessTax}</span>
            </div>
            <div>
              <span className="text-zinc-600">Total Kiddie Tax:</span>
              <span className="font-bold text-red-700 ml-2">$ {result.totalKiddieTax}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Comparison: Kiddie Tax vs Child's Own Rate</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Child's Own Tax:</span>
            <span className="font-medium ml-2">$ {result.childOwnTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Kiddie Tax:</span>
            <span className="font-bold ml-2">$ {result.totalKiddieTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Difference:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.taxDifference) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $ {result.taxDifference}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Kiddie Tax Rules (2024)</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Applies to children under 19, or under 24 if full-time student</li>
          <li>Net unearned income over $2300 taxed at parent's marginal rate</li>
          <li>First $1150 taxed at child's rate (10%)</li>
          <li>Next $1150 taxed at child's rate (10%)</li>
          <li>Excess taxed at parent's highest marginal rate</li>
          <li>Unearned income: interest, dividends, capital gains</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">How Kiddie Tax Works</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Standard deduction for unearned income: $1150</li>
          <li>Threshold: $2300 of net unearned income triggers kiddie tax</li>
          <li>Tax calculated on Form 8615 (attached to child's return)</li>
          <li>Or included on parent's return via Form 8814 (if certain conditions met)</li>
          <li>Parent's tax rate used: highest marginal rate on last dollar of income</li>
          <li>Investment income from gifts/inheritances subject to kiddie tax</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200 mt-4">
        <h3 className="font-medium mb-2 text-red-700">Avoiding Kiddie Tax</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Invest in tax-free municipal bonds (no kiddie tax)</li>
          <li>Use tax-deferred investments (growth not taxed annually)</li>
          <li>Gift growth stocks (defer gains until child over age limit)</li>
          <li>529 plans: tax-free growth, no kiddie tax</li>
          <li>UGMA/UTMA accounts: consider timing of income recognition</li>
          <li>Wait until child reaches age limit to realize gains</li>
        </ul>
      </div>
    </div>
  )
}