'use client'

import { useState } from 'react'

export default function SocialSecurityBenefitsCalculator() {
  const [birthYear, setBirthYear] = useState(1960)
  const [currentAge, setCurrentAge] = useState(64)
  const [averageIndexedMonthlyEarnings, setAverageIndexedMonthlyEarnings] = useState(5000)
  const [workYears, setWorkYears] = useState(35)
  const [retireAge, setRetireAge] = useState(67)
  const [spouseAIME, setSpouseAIME] = useState(3000)
  const [hasSpouse, setHasSpouse] = useState(false)

  const calculate = () => {
    // Full retirement age based on birth year
    let fullRetirementAge = 67
    if (birthYear <= 1937) fullRetirementAge = 65
    else if (birthYear <= 1942) fullRetirementAge = 65 + (birthYear - 1937) * 2 / 12
    else if (birthYear <= 1954) fullRetirementAge = 66
    else if (birthYear <= 1959) fullRetirementAge = 66 + (birthYear - 1954) * 2 / 12
    else fullRetirementAge = 67

    // Primary Insurance Amount (PIA) calculation
    // 2024 bend points: $1174 at 90%, $7059 at 32%, beyond at 15%
    const bendPoint1 = 1174
    const bendPoint2 = 7059

    let pia = 0
    if (averageIndexedMonthlyEarnings <= bendPoint1) {
      pia = averageIndexedMonthlyEarnings * 0.9
    } else if (averageIndexedMonthlyEarnings <= bendPoint2) {
      pia = bendPoint1 * 0.9 + (averageIndexedMonthlyEarnings - bendPoint1) * 0.32
    } else {
      pia = bendPoint1 * 0.9 + (bendPoint2 - bendPoint1) * 0.32 + (averageIndexedMonthlyEarnings - bendPoint2) * 0.15
    }

    // Maximum family benefit cap (2024: approx $4,873 for single)
    const maxFamilyBenefit = pia * 1.5

    // Early retirement reduction
    const monthsEarly = Math.max(0, (fullRetirementAge - retireAge) * 12)
    const earlyRetirementReduction = monthsEarly * 0.00555 // 6.67% per year for first 3 years, 5% thereafter
    const adjustedEarlyReduction = monthsEarly <= 36 ? monthsEarly * 0.00556 : 36 * 0.00556 + (monthsEarly - 36) * 0.00417

    // Delayed retirement credit
    const monthsDelayed = Math.max(0, (retireAge - fullRetirementAge) * 12)
    const delayedCredit = monthsDelayed * 0.00667 // 8% per year for birth year 1943+

    // Monthly benefit based on retirement age
    let monthlyBenefit = pia
    if (retireAge < fullRetirementAge) {
      monthlyBenefit = pia * (1 - adjustedEarlyReduction)
    } else if (retireAge > fullRetirementAge) {
      monthlyBenefit = pia * (1 + delayedCredit)
    }

    // Maximum benefit at FRA (2024)
    const maxBenefitFRA = 3827

    // Spousal benefit (if applicable)
    let spousalPIA = 0
    let spousalBenefit = 0
    if (hasSpouse && spouseAIME > 0) {
      if (spouseAIME <= bendPoint1) {
        spousalPIA = spouseAIME * 0.9
      } else if (spouseAIME <= bendPoint2) {
        spousalPIA = bendPoint1 * 0.9 + (spouseAIME - bendPoint1) * 0.32
      } else {
        spousalPIA = bendPoint1 * 0.9 + (bendPoint2 - bendPoint1) * 0.32 + (spouseAIME - bendPoint2) * 0.15
      }
      // Spousal benefit: up to 50% of higher earner's PIA
      spousalBenefit = Math.min(pia * 0.5, Math.max(0, pia * 0.5 - spousalPIA))
    }

    // Annual benefit
    const annualBenefit = monthlyBenefit * 12
    const lifetimeBenefit20Years = annualBenefit * 20

    // Earnings test (if under FRA and working)
    const earningsTestThreshold2024 = 22320
    const earningsTestThresholdFRAYear = 59520

    // Eligibility: need 40 credits (10 years work)
    const eligibleForBenefits = workYears >= 10

    // Replacement rate
    const preretirementIncome = averageIndexedMonthlyEarnings * 12
    const replacementRate = (annualBenefit / preretirementIncome) * 100

    return {
      birthYear: birthYear.toFixed(0),
      currentAge: currentAge.toFixed(0),
      fullRetirementAge: fullRetirementAge.toFixed(2),
      retireAge: retireAge.toFixed(0),
      averageIndexedMonthlyEarnings: averageIndexedMonthlyEarnings.toFixed(0),
      pia: pia.toFixed(2),
      monthlyBenefit: monthlyBenefit.toFixed(2),
      annualBenefit: annualBenefit.toFixed(0),
      lifetimeBenefit20Years: lifetimeBenefit20Years.toFixed(0),
      monthsEarly: monthsEarly.toFixed(0),
      monthsDelayed: monthsDelayed.toFixed(0),
      earlyReductionPercent: (adjustedEarlyReduction * 100).toFixed(1),
      delayedCreditPercent: (delayedCredit * 100).toFixed(1),
      maxBenefitFRA: maxBenefitFRA.toFixed(0),
      eligibleForBenefits,
      workYears: workYears.toFixed(0),
      preretirementIncome: preretirementIncome.toFixed(0),
      replacementRate: replacementRate.toFixed(1),
      earningsTestThreshold2024: earningsTestThreshold2024.toFixed(0),
      earningsTestThresholdFRAYear: earningsTestThresholdFRAYear.toFixed(0),
      hasSpouse,
      spousalPIA: spousalPIA.toFixed(2),
      spousalBenefit: spousalBenefit.toFixed(2),
      totalMonthlyCouple: hasSpouse ? (monthlyBenefit + spousalPIA + spousalBenefit).toFixed(2) : monthlyBenefit.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Benefits Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate your Social Security retirement benefits based on earnings history.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Birth Year</label>
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Average Indexed Monthly Earnings ($)</label>
          <input
            type="number"
            value={averageIndexedMonthlyEarnings}
            onChange={(e) => setAverageIndexedMonthlyEarnings(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Worked</label>
          <input
            type="number"
            value={workYears}
            onChange={(e) => setWorkYears(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Planned Retirement Age</label>
          <input
            type="number"
            value={retireAge}
            onChange={(e) => setRetireAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasSpouse}
            onChange={(e) => setHasSpouse(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Has Spouse</label>
        </div>
        {hasSpouse && (
          <div>
            <label className="block text-sm font-medium mb-1">Spouse AIME ($)</label>
            <input
              type="number"
              value={spouseAIME}
              onChange={(e) => setSpouseAIME(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Primary Insurance Amount (PIA)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">AIME:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.averageIndexedMonthlyEarnings}</span>
          </div>
          <div>
            <span className="text-zinc-600">PIA (at FRA):</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.pia}</span>
          </div>
          <div>
            <span className="text-zinc-600">Max Benefit (FRA):</span>
            <span className="font-medium ml-2">$ {result.maxBenefitFRA}</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          PIA formula: 90% of first $1174 + 32% of $1174-$7059 + 15% above $7059 (2024 bend points).
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Retirement Age Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Full Retirement Age:</span>
            <span className="font-bold text-purple-700 ml-2">{result.fullRetirementAge}</span>
          </div>
          <div>
            <span className="text-zinc-600">Planned Retire Age:</span>
            <span className="font-medium ml-2">{result.retireAge}</span>
          </div>
          <div>
            <span className="text-zinc-600">Months Early/Delayed:</span>
            <span className={`font-bold ml-2 ${parseInt(result.monthsEarly) > 0 ? 'text-red-600' : parseInt(result.monthsDelayed) > 0 ? 'text-green-600' : 'text-zinc-600'}`}>
              {parseInt(result.monthsEarly) > 0 ? `${result.monthsEarly} early` : parseInt(result.monthsDelayed) > 0 ? `${result.monthsDelayed} delayed` : 'At FRA'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Early Reduction:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.earlyReductionPercent) > 0 ? 'text-red-600' : 'text-zinc-600'}`}>
              {parseFloat(result.earlyReductionPercent) > 0 ? `-${result.earlyReductionPercent}%` : '0%'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Delayed Credit:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.delayedCreditPercent) > 0 ? 'text-green-600' : 'text-zinc-600'}`}>
              {parseFloat(result.delayedCreditPercent) > 0 ? `+${result.delayedCreditPercent}%` : '0%'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly & Annual Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Monthly Benefit:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.monthlyBenefit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Annual Benefit:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.annualBenefit}</span>
          </div>
          <div>
            <span className="text-zinc-600">20-Year Lifetime:</span>
            <span className="font-bold ml-2">$ {result.lifetimeBenefit20Years}</span>
          </div>
        </div>
      </div>

      {hasSpouse && (
        <div className="card bg-indigo-50 border border-indigo-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Spousal Benefits</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Spouse PIA:</span>
              <span className="font-bold ml-2">$ {result.spousalPIA}</span>
            </div>
            <div>
              <span className="text-zinc-600">Spousal Benefit:</span>
              <span className="font-bold text-indigo-700 ml-2">$ {result.spousalBenefit}</span>
            </div>
            <div>
              <span className="text-zinc-600">Couple Total:</span>
              <span className="font-bold text-indigo-700 ml-2">$ {result.totalMonthlyCouple}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            Spousal benefit: up to 50% of higher earner's PIA, reduced if spouse has own benefit.
          </div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefit Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Eligibility:</span>
            <span className={`font-bold ml-2 ${result.eligibleForBenefits ? 'text-green-600' : 'text-red-600'}`}>
              {result.eligibleForBenefits ? `Yes (${result.workYears} years)` : 'Need 10+ years'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Replacement Rate:</span>
            <span className="font-bold ml-2">{result.replacementRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Pre-retirement Income:</span>
            <span className="font-medium ml-2">$ {result.preretirementIncome}/year</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Earnings Test (If Working Before FRA)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Under FRA Limit:</span>
            <span className="font-medium ml-2">$ {result.earningsTestThreshold2024}/year</span>
          </div>
          <div>
            <span className="text-zinc-600">FRA Year Limit:</span>
            <span className="font-medium ml-2">$ {result.earningsTestThresholdFRAYear}/year</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          Benefits reduced $1 for every $2 above limit (under FRA). $1 for $3 in FRA year. No limit after FRA.
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Timing Strategy Tips</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Wait until FRA for full benefit (no reduction)</li>
          <li>Delay to age 70: earn 8% per year delayed credit</li>
          <li>Claim early: permanent reduction (6.67%/year for first 3 years)</li>
          <li>Break-even analysis: early claim vs delayed at age ~78-80</li>
          <li>Consider health, life expectancy, other income sources</li>
          <li>Married: coordinate claiming for maximum survivor benefit</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Social Security Facts</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Maximum benefit at FRA (2024): $3,827</li>
          <li>Maximum benefit at age 70: ~$4,873 (delayed credits)</li>
          <li>Minimum benefit: depends on work history (40 credits needed)</li>
          <li>Benefits adjusted annually for COLA (Cost of Living Adjustment)</li>
          <li>Taxed based on combined income (0%, 50%, or 85% taxable)</li>
          <li>No benefit above maximum taxable earnings ($168,600 in 2024)</li>
        </ul>
      </div>
    </div>
  )
}