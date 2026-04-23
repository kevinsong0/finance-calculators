'use client'

import { useState } from 'react'

export default function SocialSecurityBreakEvenCalculator() {
  const [birthYear, setBirthYear] = useState(1960)
  const [fullRetirementAge, setFullRetirementAge] = useState(67)
  const [expectedMonthlyBenefit62, setExpectedMonthlyBenefit62] = useState(1500)
  const [expectedMonthlyBenefitFRA, setExpectedMonthlyBenefitFRA] = useState(2400)
  const [expectedMonthlyBenefit70, setExpectedMonthlyBenefit70] = useState(3000)
  const [currentAge, setCurrentAge] = useState(60)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [otherIncome, setOtherIncome] = useState(50000)

  const calculate = () => {
    const currentYear = 2026
    const ageAtClaim62 = 62
    const ageAtClaimFRA = fullRetirementAge
    const ageAtClaim70 = 70

    // Monthly benefits (user provides)
    const benefitAt62 = expectedMonthlyBenefit62
    const benefitAtFRA = expectedMonthlyBenefitFRA
    const benefitAt70 = expectedMonthlyBenefit70

    // Years of receiving benefits
    const yearsReceivingFrom62 = lifeExpectancy - ageAtClaim62
    const yearsReceivingFromFRA = lifeExpectancy - ageAtClaimFRA
    const yearsReceivingFrom70 = lifeExpectancy - ageAtClaim70

    // Total lifetime benefits
    const totalBenefitsFrom62 = benefitAt62 * 12 * yearsReceivingFrom62
    const totalBenefitsFromFRA = benefitAtFRA * 12 * yearsReceivingFromFRA
    const totalBenefitsFrom70 = benefitAt70 * 12 * yearsReceivingFrom70

    // Break-even age calculations
    // When does waiting to FRA beat claiming at 62?
    const monthlyDifference62vsFRA = benefitAtFRA - benefitAt62
    const monthsReceivingAt62BeforeFRA = (fullRetirementAge - 62) * 12
    const extraReceivedAt62 = benefitAt62 * monthsReceivingAt62BeforeFRA
    const breakEvenMonths62vsFRA = extraReceivedAt62 / monthlyDifference62vsFRA
    const breakEvenAge62vsFRA = fullRetirementAge + breakEvenMonths62vsFRA / 12

    // When does waiting to 70 beat claiming at FRA?
    const monthlyDifferenceFRAvs70 = benefitAt70 - benefitAtFRA
    const monthsReceivingAtFRABefore70 = (70 - fullRetirementAge) * 12
    const extraReceivedAtFRA = benefitAtFRA * monthsReceivingAtFRABefore70
    const breakEvenMonthsFRAvs70 = extraReceivedAtFRA / monthlyDifferenceFRAvs70
    const breakEvenAgeFRAvs70 = 70 + breakEvenMonthsFRAvs70 / 12

    // When does waiting to 70 beat claiming at 62?
    const monthlyDifference62vs70 = benefitAt70 - benefitAt62
    const monthsReceivingAt62Before70 = (70 - 62) * 12
    const extraReceivedAt62Before70 = benefitAt62 * monthsReceivingAt62Before70
    const breakEvenMonths62vs70 = extraReceivedAt62Before70 / monthlyDifference62vs70
    const breakEvenAge62vs70 = 70 + breakEvenMonths62vs70 / 12

    // Recommendation based on life expectancy
    let recommendation = ''
    let bestOption = ''
    if (lifeExpectancy < breakEvenAge62vsFRA) {
      recommendation = 'Claim at 62: Based on life expectancy, you would not reach break-even age. Maximize years of receiving benefits.'
      bestOption = 'Age 62'
    } else if (lifeExpectancy < breakEvenAgeFRAvs70) {
      recommendation = 'Claim at FRA: You reach break-even for waiting from 62, but not for waiting to 70.'
      bestOption = 'Full Retirement Age'
    } else if (lifeExpectancy >= breakEvenAge62vs70) {
      recommendation = 'Wait until 70: Your life expectancy exceeds all break-even points. Maximum lifetime benefits by delaying.'
      bestOption = 'Age 70'
    } else {
      recommendation = 'Consider claiming between FRA and 70 based on health and financial needs.'
      bestOption = 'Between FRA-70'
    }

    return {
      birthYear: birthYear.toFixed(0),
      fullRetirementAge: fullRetirementAge.toFixed(0),
      expectedMonthlyBenefit62: benefitAt62.toFixed(0),
      expectedMonthlyBenefitFRA: benefitAtFRA.toFixed(0),
      expectedMonthlyBenefit70: benefitAt70.toFixed(0),
      lifeExpectancy: lifeExpectancy.toFixed(0),
      yearsReceivingFrom62: yearsReceivingFrom62.toFixed(0),
      yearsReceivingFromFRA: yearsReceivingFromFRA.toFixed(0),
      yearsReceivingFrom70: yearsReceivingFrom70.toFixed(0),
      totalBenefitsFrom62: totalBenefitsFrom62.toFixed(0),
      totalBenefitsFromFRA: totalBenefitsFromFRA.toFixed(0),
      totalBenefitsFrom70: totalBenefitsFrom70.toFixed(0),
      breakEvenAge62vsFRA: breakEvenAge62vsFRA.toFixed(1),
      breakEvenAgeFRAvs70: breakEvenAgeFRAvs70.toFixed(1),
      breakEvenAge62vs70: breakEvenAge62vs70.toFixed(1),
      recommendation,
      bestOption,
      currentAge: currentAge.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Break-Even Calculator</h1>
      <p className="text-gray-600 mb-4">Find the optimal age to claim Social Security benefits based on life expectancy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Birth Year</label>
          <input type="number" value={birthYear} min="1940" max="1969" onChange={(e) => setBirthYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Retirement Age</label>
          <input type="number" value={fullRetirementAge} step="0.5" min="65" max="70" onChange={(e) => setFullRetirementAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Benefit at 62 ($)</label>
          <input type="number" value={expectedMonthlyBenefit62} onChange={(e) => setExpectedMonthlyBenefit62(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Benefit at FRA ($)</label>
          <input type="number" value={expectedMonthlyBenefitFRA} onChange={(e) => setExpectedMonthlyBenefitFRA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Benefit at 70 ($)</label>
          <input type="number" value={expectedMonthlyBenefit70} onChange={(e) => setExpectedMonthlyBenefit70(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Life Span (age)</label>
          <input type="number" value={lifeExpectancy} min="62" max="100" onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Benefit Comparison</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-zinc-600 text-xs">Age 62</div>
            <div className="font-bold text-lg">$ {result.expectedMonthlyBenefit62}</div>
            <div className="text-xs text-red-700">-25% reduction</div>
          </div>
          <div className="text-center">
            <div className="text-zinc-600 text-xs">FRA ({result.fullRetirementAge})</div>
            <div className="font-bold text-lg text-blue-700">$ {result.expectedMonthlyBenefitFRA}</div>
            <div className="text-xs text-blue-700">Full benefit</div>
          </div>
          <div className="text-center">
            <div className="text-zinc-600 text-xs">Age 70</div>
            <div className="font-bold text-lg text-green-700">$ {result.expectedMonthlyBenefit70}</div>
            <div className="text-xs text-green-700">+24% increase</div>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Lifetime Total Benefits</h2>
        <div className="grid grid-cols-3 gap-4">
          <div><span className="text-zinc-600">From Age 62:</span><span className="font-bold ml-2">$ {result.totalBenefitsFrom62}</span></div>
          <div><span className="text-zinc-600">From FRA:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalBenefitsFromFRA}</span></div>
          <div><span className="text-zinc-600">From Age 70:</span><span className="font-bold ml-2">$ {result.totalBenefitsFrom70}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Based on life expectancy of {result.lifeExpectancy} years.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Break-Even Ages</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">62 vs FRA:</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenAge62vsFRA} years</span></div>
          <div><span className="text-zinc-600">FRA vs 70:</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenAgeFRAvs70} years</span></div>
          <div><span className="text-zinc-600">62 vs 70:</span><span className="font-bold text-orange-700 ml-2">{result.breakEvenAge62vs70} years</span></div>
          <div><span className="text-zinc-600">Your Life Expectancy:</span><span className="font-bold ml-2">{result.lifeExpectancy} years</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Break-even: age when delayed claiming catches up to early claiming.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Recommendation</h2>
        <div className="text-sm font-medium mb-2">{result.recommendation}</div>
        <div className="text-sm"><span className="text-zinc-600">Best Option:</span><span className="font-bold text-green-700 ml-2">{result.bestOption}</span></div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Social Security Claiming Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Claiming at 62 reduces benefit by ~25-30% permanently</li>
          <li>Waiting to 70 increases benefit by ~24-28% over FRA</li>
          <li>Break-even typically around age 78-82 for FRA vs 62</li>
          <li>Consider health, family longevity, and financial needs</li>
          <li>Spousal benefits: coordinate for maximum household benefit</li>
          <li>Survivor benefits: higher earner should delay to protect spouse</li>
        </ul>
      </div>
    </div>
  )
}