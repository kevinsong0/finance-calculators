'use client'

import { useState } from 'react'

export default function PensionCalculator() {
  const [yearsOfService, setYearsOfService] = useState('')
  const [finalSalary, setFinalSalary] = useState('')
  const [pensionMultiplier, setPensionMultiplier] = useState('1.5')
  const [retirementAge, setRetirementAge] = useState('65')
  const [pensionType, setPensionType] = useState('defined')

  const calculate = () => {
    const years = parseInt(yearsOfService) || 20
    const salary = parseFloat(finalSalary) || 80000
    const multiplier = parseFloat(pensionMultiplier) || 1.5
    const age = parseInt(retirementAge) || 65

    // Defined Benefit Pension Calculation
    const annualPension = salary * (multiplier / 100) * years
    const monthlyPension = annualPension / 12

    // Vesting check (typically 5 years)
    const isVested = years >= 5
    const vestingPercent = Math.min(100, years * 10) // Simplified vesting schedule

    // Early retirement reduction
    let earlyRetireReduction = 0
    if (age < 65 && pensionType === 'defined') {
      const yearsEarly = 65 - age
      earlyRetireReduction = yearsEarly * 5 // 5% reduction per year early
    }

    const adjustedAnnualPension = annualPension * (100 - earlyRetireReduction) / 100
    const adjustedMonthlyPension = adjustedAnnualPension / 12

    // Lump sum option (present value calculation simplified)
    const lumpSum = adjustedAnnualPension * 15 // Roughly 15x annual pension

    // Total estimated payout over retirement years
    const retirementYears = 85 - age
    const totalPayout = adjustedAnnualPension * Math.max(0, retirementYears)

    return {
      annualPension: annualPension.toFixed(2),
      monthlyPension: monthlyPension.toFixed(2),
      adjustedAnnualPension: adjustedAnnualPension.toFixed(2),
      adjustedMonthlyPension: adjustedMonthlyPension.toFixed(2),
      isVested,
      vestingPercent,
      earlyRetireReduction,
      lumpSum: lumpSum.toFixed(2),
      totalPayout: totalPayout.toFixed(2),
      replacementRate: ((adjustedAnnualPension / salary) * 100).toFixed(1),
      retirementYears: Math.max(0, retirementYears)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Pension Calculator</h1>
      <p className="text-zinc-600">Calculate your defined benefit pension payout based on years of service and salary.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Pension Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years of Service</label>
            <input
              type="number"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter years worked"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Final Average Salary</label>
            <input
              type="number"
              value={finalSalary}
              onChange={(e) => setFinalSalary(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your final salary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Pension Multiplier (%)</label>
            <select
              value={pensionMultiplier}
              onChange={(e) => setPensionMultiplier(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="1.0">1.0% per year</option>
              <option value="1.25">1.25% per year</option>
              <option value="1.5">1.5% per year</option>
              <option value="1.75">1.75% per year</option>
              <option value="2.0">2.0% per year</option>
              <option value="2.5">2.5% per year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Age</label>
            <select
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="55">55 (Early)</option>
              <option value="60">60</option>
              <option value="62">62</option>
              <option value="65">65 (Standard)</option>
              <option value="67">67</option>
              <option value="70">70</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Pension Estimate</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Pension</div>
            <div className="text-2xl font-bold text-green-600">$${result.adjustedMonthlyPension}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Pension</div>
            <div className="text-2xl font-bold text-green-600">$${result.adjustedAnnualPension}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Replacement Rate</div>
            <div className="text-2xl font-bold">{result.replacementRate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Lifetime Payout</div>
            <div className="text-2xl font-bold text-blue-600">$${result.totalPayout}</div>
          </div>
        </div>
      </div>

      {!result.isVested && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Vesting Status</h3>
          <div className="text-sm text-red-600">
            You are not yet vested ({result.vestingPercent}% vested). Most pensions require 5 years of service for full vesting. You need {5 - parseInt(yearsOfService || '0')} more years.
          </div>
        </div>
      )}

      {result.earlyRetireReduction > 0 && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Early Retirement Reduction</h3>
          <div className="text-sm text-yellow-600">
            Retiring early reduces your pension by {result.earlyRetireReduction}%. Full pension at 65 would be $${result.monthlyPension}/month ($${result.annualPension}/year).
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pension Options</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Lifetime Annuity</strong>
            <div className="text-zinc-500">Monthly payments for life: $${result.adjustedMonthlyPension}</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Lump Sum Option</strong>
            <div className="text-zinc-500">One-time payment (estimated): $${result.lumpSum}</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Joint & Survivor</strong>
            <div className="text-zinc-500">Lower monthly payment but continues to spouse after death</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pension Formula</h3>
        <div className="text-xs text-zinc-600">
          Pension = Final Salary × Multiplier × Years of Service. Example: $80,000 × 1.5% × 20 years = $24,000/year. Formula varies by employer. Some use highest 3-5 year average. Check your plan documents for exact formula.
        </div>
      </div>
    </main>
  )
}