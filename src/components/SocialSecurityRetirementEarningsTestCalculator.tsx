'use client'

import { useState } from 'react'

export default function SocialSecurityRetirementEarningsTestCalculator() {
  const [currentAge, setCurrentAge] = useState(62)
  const [fullRetirementAge, setFullRetirementAge] = useState(67)
  const [monthlyBenefit, setMonthlyBenefit] = useState(1200)
  const [annualWorkIncome, setAnnualWorkIncome] = useState(25000)
  const [isRetired, setIsRetired] = useState(false)

  const calculate = () => {
    // Retirement Earnings Test rules
    // Before FRA: $1 withheld for every $2 earned above limit
    // Year of FRA: $1 withheld for every $3 earned above limit (only counts months before FRA)
    // After FRA: No earnings test

    // 2024 Earnings Limits
    const earningsLimitBeforeFRA = 22280 // Annual
    const earningsLimitYearOfFRA = 59460 // Annual (only months before FRA)

    // Calculate withheld benefits
    let withheldBenefits = 0
    let withheldMonths = 0

    const yearsUntilFRA = fullRetirementAge - currentAge

    if (currentAge < fullRetirementAge && annualWorkIncome > earningsLimitBeforeFRA) {
      // Before FRA penalty
      const excessEarnings = annualWorkIncome - earningsLimitBeforeFRA
      withheldBenefits = Math.floor(excessEarnings / 2) // $1 for every $2
      withheldMonths = Math.min(12, Math.ceil(withheldBenefits / monthlyBenefit))
    } else if (currentAge >= fullRetirementAge - 1 && currentAge < fullRetirementAge) {
      // Year of FRA (simplified - assumes full year before FRA)
      const monthsBeforeFRA = 6 // Simplified
      const proRatedLimit = earningsLimitYearOfFRA * (monthsBeforeFRA / 12)
      const excessEarnings = Math.max(0, annualWorkIncome - proRatedLimit)
      withheldBenefits = Math.floor(excessEarnings / 3) // $1 for every $3
      withheldMonths = Math.min(12, Math.ceil(withheldBenefits / monthlyBenefit))
    }

    // After FRA - no withholding
    const noEarningsTestAfterFRA = currentAge >= fullRetirementAge

    // Actual monthly benefit
    const actualMonthlyBenefit = withheldMonths >= 12 ? 0 : monthlyBenefit * (12 - withheldMonths) / 12
    const annualBenefitReceived = actualMonthlyBenefit * (12 - withheldMonths)

    // Benefits withheld are not lost - recalculated at FRA
    // SSA recalculates to credit withheld months
    const withheldMonthsRecalculatedAtFRA = withheldMonths
    const benefitIncreaseAtFRA = monthlyBenefit * withheldMonthsRecalculatedAtFRA / 12

    // Adjusted benefit after FRA (simplified)
    const adjustedMonthlyBenefitAtFRA = monthlyBenefit + benefitIncreaseAtFRA

    // Net income analysis
    const workIncomeAfterSSPenalty = annualWorkIncome - withheldBenefits
    const totalIncome = workIncomeAfterSSPenalty + annualBenefitReceived

    // Break-even: when is it worth to stop working?
    // If withheld benefits = work income gain, may not be worth working
    const netGainFromWorking = annualWorkIncome - withheldBenefits

    // Grace year rule
    const graceYearMonths = 12 // Months before FRA in grace year
    const graceYearExemptMonths = Math.floor(graceYearMonths / 3) // Simplified

    return {
      currentAge: currentAge.toFixed(0),
      fullRetirementAge: fullRetirementAge.toFixed(0),
      monthlyBenefit: monthlyBenefit.toFixed(0),
      annualWorkIncome: annualWorkIncome.toFixed(0),
      isRetired,
      earningsLimitBeforeFRA: earningsLimitBeforeFRA.toFixed(0),
      earningsLimitYearOfFRA: earningsLimitYearOfFRA.toFixed(0),
      yearsUntilFRA: yearsUntilFRA.toFixed(0),
      excessEarnings: Math.max(0, annualWorkIncome - earningsLimitBeforeFRA).toFixed(0),
      withheldBenefits: withheldBenefits.toFixed(0),
      withheldMonths: withheldMonths.toFixed(0),
      actualMonthlyBenefit: actualMonthlyBenefit.toFixed(0),
      annualBenefitReceived: annualBenefitReceived.toFixed(0),
      noEarningsTestAfterFRA,
      withheldMonthsRecalculatedAtFRA: withheldMonthsRecalculatedAtFRA.toFixed(0),
      benefitIncreaseAtFRA: benefitIncreaseAtFRA.toFixed(0),
      adjustedMonthlyBenefitAtFRA: adjustedMonthlyBenefitAtFRA.toFixed(0),
      workIncomeAfterSSPenalty: workIncomeAfterSSPenalty.toFixed(0),
      totalIncome: totalIncome.toFixed(0),
      netGainFromWorking: netGainFromWorking.toFixed(0),
      graceYearMonths: graceYearMonths.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Retirement Earnings Test Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate benefit withholding when working before FRA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="62" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Retirement Age</label>
          <select value={fullRetirementAge} onChange={(e) => setFullRetirementAge(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="66">Age 66</option>
            <option value="66.5">Age 66 + 6 months</option>
            <option value="67">Age 67</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Social Security Benefit</label>
          <input type="number" value={monthlyBenefit} onChange={(e) => setMonthlyBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Work Income</label>
          <input type="number" value={annualWorkIncome} onChange={(e) => setAnnualWorkIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.noEarningsTestAfterFRA ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.noEarningsTestAfterFRA ? 'text-green-700' : 'text-blue-700'}`}>Earnings Test Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Earnings Limit:</span><span className="font-bold text-blue-700 ml-2">$ {result.earningsLimitBeforeFRA}</span></div>
          <div><span className="text-zinc-600">Your Income:</span><span className="font-medium ml-2">$ {result.annualWorkIncome}</span></div>
          <div><span className="text-zinc-600">Excess:</span><span className="font-medium ml-2">$ {result.excessEarnings}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Years to FRA:</span><span className="font-medium ml-2">{result.yearsUntilFRA}</span></div>
          <div><span className="text-zinc-600">Test Applies:</span><span className={`font-bold ml-2 ${result.noEarningsTestAfterFRA ? 'text-green-700' : 'text-orange-700'}`}>{result.noEarningsTestAfterFRA ? 'No (after FRA)' : 'Yes (before FRA)'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">2024 earnings limit: $22,280 before FRA, $59,460 in year of FRA (months before only).</div>
      </div>

      <div className={`card mb-6 ${Number(result.withheldBenefits) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.withheldBenefits) > 0 ? 'text-orange-700' : 'text-green-700'}`}>Benefits Withheld</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Withheld Amount:</span><span className={`font-bold ml-2 ${Number(result.withheldBenefits) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.withheldBenefits}</span></div>
          <div><span className="text-zinc-600">Withheld Months:</span><span className="font-medium ml-2">{result.withheldMonths}</span></div>
          <div><span className="text-zinc-600">Rate:</span><span className="font-medium ml-2">$1 per $2 over limit</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Before FRA: SSA withholds $1 for every $2 earned above $22,280.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Actual Benefit Received</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Monthly Benefit:</span><span className="font-medium ml-2">$ {result.monthlyBenefit}</span></div>
          <div><span className="text-zinc-600">Actual Received:</span><span className="font-bold text-purple-700 ml-2">$ {result.actualMonthlyBenefit}/mo</span></div>
          <div><span className="text-zinc-600">Annual Received:</span><span className="font-bold text-purple-700 ml-2">$ {result.annualBenefitReceived}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">If months withheld ≥ 12, $0 benefit that year. Otherwise, benefit reduced proportionally.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recalculation at FRA</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Months Credited:</span><span className="font-medium ml-2">{result.withheldMonthsRecalculatedAtFRA}</span></div>
          <div><span className="text-zinc-600">Benefit Increase:</span><span className="font-bold text-teal-700 ml-2">$ {result.benefitIncreaseAtFRA}/mo</span></div>
          <div><span className="text-zinc-600">Adjusted Benefit:</span><span className="font-bold text-teal-700 ml-2">$ {result.adjustedMonthlyBenefitAtFRA}/mo</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Withheld benefits are NOT lost - SSA recalculates at FRA to credit withheld months.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Net Income Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Work Income:</span><span className="font-medium ml-2">$ {result.annualWorkIncome}</span></div>
          <div><span className="text-zinc-600">After SS Penalty:</span><span className="font-medium ml-2">$ {result.workIncomeAfterSSPenalty}</span></div>
          <div><span className="text-zinc-600">SS Received:</span><span className="font-medium ml-2">$ {result.annualBenefitReceived}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Income:</span><span className="font-bold text-green-700 ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Net Gain Working:</span><span className="font-medium ml-2">$ {result.netGainFromWorking}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Working still adds income despite SS withholding. Penalty recovered at FRA.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Retirement Earnings Test Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Before FRA: $1 withheld per $2 over $22,280 (2024)</li>
          <li>Year of FRA: $1 withheld per $3 over $59,460 (months before FRA)</li>
          <li>After FRA: No earnings test - work freely</li>
          <li>Withheld benefits recovered at FRA recalculating</li>
          <li>Grace year: higher limit, pro-rated in FRA year</li>
          <li>Working still beneficial despite withholding</li>
          <li>Report income to SSA to avoid overpayment</li>
          <li>Self-employment income counted differently</li>
          <li>Only count earned income, not investments/pension</li>
        </ul>
      </div>
    </div>
  )
}