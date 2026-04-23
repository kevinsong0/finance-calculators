'use client'

import { useState } from 'react'

export default function SocialSecurityCalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [retirementAge, setRetirementAge] = useState('67')
  const [annualIncome, setAnnualIncome] = useState('')
  const [yearsWorked, setYearsWorked] = useState('')

  const calculate = () => {
    const age = parseInt(currentAge) || 35
    const retireAge = parseInt(retirementAge) || 67
    const income = parseFloat(annualIncome) || 60000
    const worked = parseInt(yearsWorked) || 35

    // Simplified Social Security calculation
    // Actual formula uses AIME (Average Indexed Monthly Earnings)
    const avgMonthlyIncome = income / 12
    const primaryInsuranceAmount = Math.min(avgMonthlyIncome * 0.9, 1224) +
      Math.max(0, Math.min(avgMonthlyIncome - 1224, 7356) * 0.32) +
      Math.max(0, (avgMonthlyIncome - 7356) * 0.15)

    // Early retirement reduction (before age 67)
    let monthlyBenefit = primaryInsuranceAmount
    let reductionFactor = 1

    if (retireAge < 67) {
      const monthsEarly = (67 - retireAge) * 12
      if (retireAge < 62) {
        reductionFactor = 0
      } else if (retireAge >= 62 && retireAge < 65) {
        reductionFactor = 1 - (monthsEarly * 0.005556) // 5/9 of 1% per month
      } else {
        reductionFactor = 1 - (monthsEarly * 0.004167) // 5/12 of 1% per month
      }
    }

    // Delayed retirement increase (after age 67)
    if (retireAge > 67 && retireAge <= 70) {
      const monthsLate = (retireAge - 67) * 12
      reductionFactor = 1 + (monthsLate * 0.00667) // 2/3 of 1% per month
    }

    monthlyBenefit = Math.max(0, primaryInsuranceAmount * reductionFactor)
    const annualBenefit = monthlyBenefit * 12
    const totalBenefit = annualBenefit * 20 // 20 years of retirement

    // Calculate replacement rate
    const replacementRate = (annualBenefit / income) * 100

    return {
      monthlyBenefit: monthlyBenefit.toFixed(2),
      annualBenefit: annualBenefit.toFixed(2),
      totalBenefit: totalBenefit.toFixed(2),
      replacementRate: replacementRate.toFixed(1),
      retireAge,
      isEarly: retireAge < 67,
      isDelayed: retireAge > 67,
      primaryInsuranceAmount: primaryInsuranceAmount.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Social Security Benefits Calculator</h1>
      <p className="text-zinc-600">Estimate your Social Security retirement benefits based on income and retirement age.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your current age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Planned Retirement Age</label>
            <select
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="62">62 (Early Retirement)</option>
              <option value="63">63</option>
              <option value="64">64</option>
              <option value="65">65</option>
              <option value="66">66</option>
              <option value="67">67 (Full Retirement Age)</option>
              <option value="68">68</option>
              <option value="69">69</option>
              <option value="70">70 (Maximum Benefit Age)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Average Annual Income</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your average annual income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years Worked</label>
            <input
              type="number"
              value={yearsWorked}
              onChange={(e) => setYearsWorked(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter years of employment"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Estimated Benefits</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Benefit</div>
            <div className="text-2xl font-bold text-green-600">$${result.monthlyBenefit}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Benefit</div>
            <div className="text-2xl font-bold text-green-600">$${result.annualBenefit}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Replacement Rate</div>
            <div className="text-2xl font-bold">{result.replacementRate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">20-Year Total</div>
            <div className="text-2xl font-bold text-blue-600">$${result.totalBenefit}</div>
          </div>
        </div>
      </div>

      {result.isEarly && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Early Retirement Impact</h3>
          <div className="text-sm text-yellow-600">
            Retiring at age {result.retireAge} reduces your monthly benefit. Your Primary Insurance Amount (PIA) at full retirement age would be $${result.primaryInsuranceAmount}/month.
          </div>
        </div>
      )}

      {result.isDelayed && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Delayed Retirement Bonus</h3>
          <div className="text-sm text-green-600">
            Waiting until age {result.retireAge} increases your benefit by approximately {((result.retireAge - 67) * 8).toFixed(0)}%. Your monthly benefit is higher than the standard PIA of $${result.primaryInsuranceAmount}.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Social Security Facts</h3>
        <div className="text-xs text-zinc-600">
          Full Retirement Age (FRA) is 67 for those born 1960 or later. Early retirement at 62 reduces benefits by up to 30%. Delayed retirement credits increase benefits by 8% per year until age 70. You need 40 credits (10 years of work) to qualify for benefits. Spousal benefits can be up to 50% of your benefit.
        </div>
      </div>
    </main>
  )
}