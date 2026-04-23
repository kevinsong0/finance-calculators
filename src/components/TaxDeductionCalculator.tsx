'use client'

import { useState } from 'react'

export default function TaxDeductionCalculator() {
  const [income, setIncome] = useState('')
  const [deductions, setDeductions] = useState({
    mortgageInterest: 0,
    propertyTax: 0,
    charitableDonations: 0,
    medicalExpenses: 0,
    stateLocalTax: 0,
    studentLoanInterest: 0,
    retirementContributions: 0,
    homeOffice: 0,
  })

  const handleDeductionChange = (key: string, value: string) => {
    setDeductions(prev => ({ ...prev, [key]: parseFloat(value) || 0 }))
  }

  const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0)
  const standardDeduction = 13850 // 2024 single filer
  const taxableIncome = Math.max(0, parseFloat(income) - Math.max(totalDeductions, standardDeduction))
  const shouldItemize = totalDeductions > standardDeduction

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax Deduction Calculator</h1>
      <p className="text-zinc-600">Compare itemized vs standard deductions to maximize tax savings.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Gross Income</h3>
        <div>
          <label className="block text-sm text-zinc-600 mb-1">Annual Gross Income ($)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter annual income"
          />
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Itemized Deductions</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            mortgageInterest: 'Mortgage Interest',
            propertyTax: 'Property Tax',
            charitableDonations: 'Charitable Donations',
            medicalExpenses: 'Medical Expenses (over 7.5% AGI)',
            stateLocalTax: 'State/Local Tax (SALT)',
            studentLoanInterest: 'Student Loan Interest',
            retirementContributions: 'Retirement Contributions',
            homeOffice: 'Home Office Expenses',
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block text-xs text-zinc-600 mb-1">{label}</label>
              <input
                type="number"
                value={deductions[key as keyof typeof deductions]}
                onChange={(e) => handleDeductionChange(key, e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Comparison</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Total Itemized</div>
            <div className="text-xl font-bold text-blue-600">${totalDeductions.toFixed(2)}</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Standard Deduction</div>
            <div className="text-xl font-bold text-zinc-600">${standardDeduction.toFixed(2)}</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Recommendation</div>
            <div className="text-xl font-bold text-green-600">
              {shouldItemize ? 'Itemize' : 'Use Standard'}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-zinc-500">Tax Savings</div>
            <div className="text-xl font-bold text-green-600">
              ${(Math.max(totalDeductions, standardDeduction) * 0.22).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Deduction Tips</h3>
        <div className="text-xs text-zinc-600">
          Keep records for all itemized deductions. SALT deduction capped at $10k. Medical expenses only deductible above 7.5% of AGI. Student loan interest max $2,500. Home office requires exclusive business use.
        </div>
      </div>
    </main>
  )
}
