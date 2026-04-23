'use client'

import { useState } from 'react'

export default function SocialSecurityDisabilityBenefitCalculator() {
  const [currentAge, setCurrentAge] = useState(50)
  const [yearsWorked, setYearsWorked] = useState(20)
  const [averageIndexedMonthlyEarnings, setAverageIndexedMonthlyEarnings] = useState(4000)
  const [disabilityStartDate, setDisabilityStartDate] = useState(2026)
  const [hasRecentWork, setHasRecentWork] = useState(true)

  const calculate = () => {
    // Social Security Disability Insurance (SSDI) benefit calculation
    // Primary Insurance Amount (PIA) formula (2024 bend points)
    const firstBendPoint = 1174
    const secondBendPoint = 7078

    // PIA calculation
    let pia = 0
    if (averageIndexedMonthlyEarnings <= firstBendPoint) {
      pia = averageIndexedMonthlyEarnings * 0.90
    } else if (averageIndexedMonthlyEarnings <= secondBendPoint) {
      pia = firstBendPoint * 0.90 + (averageIndexedMonthlyEarnings - firstBendPoint) * 0.32
    } else {
      pia = firstBendPoint * 0.90 + (secondBendPoint - firstBendPoint) * 0.32 + (averageIndexedMonthlyEarnings - secondBendPoint) * 0.15
    }

    // Maximum family benefit cap (about 150% of PIA)
    const maxFamilyBenefit = pia * 1.5

    // Eligibility check
    // Need 20 quarters (5 years) in last 10 years for ages 31+
    const quartersNeeded = currentAge >= 31 ? 20 : Math.min(currentAge - 21, 20) * 2
    const quartersEarned = yearsWorked * 4
    const isEligible = hasRecentWork && quartersEarned >= quartersNeeded && currentAge < 65

    // Duration of work needed (simplified)
    const totalQuartersNeeded = Math.min(40, currentAge >= 62 ? 40 : Math.floor((currentAge - 21) / 4) * 4 + 6)

    // Benefits
    const monthlyBenefit = pia
    const annualBenefit = monthlyBenefit * 12

    // Waiting period (5 months from disability onset)
    const firstPaymentMonth = 5 // Months after disability
    const monthsBeforeFirstPayment = 5

    // Medicare eligibility (after 24 months on SSDI)
    const medicareEligibleMonths = 24
    const medicareEligibleYear = disabilityStartDate + Math.floor(medicareEligibleMonths / 12)

    // Conversion to retirement at age 65 (FRA for disability recipients)
    const retirementConversionAge = 65
    const yearsUntilConversion = Math.max(0, retirementConversionAge - currentAge)

    // Trial work period (9 months)
    const trialWorkMonths = 9
    const extendedPeriodMonths = 36

    return {
      currentAge: currentAge.toFixed(0),
      yearsWorked: yearsWorked.toFixed(0),
      averageIndexedMonthlyEarnings: averageIndexedMonthlyEarnings.toFixed(0),
      firstBendPoint: firstBendPoint.toFixed(0),
      secondBendPoint: secondBendPoint.toFixed(0),
      pia: pia.toFixed(0),
      monthlyBenefit: monthlyBenefit.toFixed(0),
      annualBenefit: annualBenefit.toFixed(0),
      maxFamilyBenefit: maxFamilyBenefit.toFixed(0),
      quartersNeeded: quartersNeeded.toFixed(0),
      quartersEarned: quartersEarned.toFixed(0),
      isEligible,
      hasRecentWork,
      totalQuartersNeeded: totalQuartersNeeded.toFixed(0),
      monthsBeforeFirstPayment: monthsBeforeFirstPayment.toFixed(0),
      medicareEligibleMonths: medicareEligibleMonths.toFixed(0),
      medicareEligibleYear: medicareEligibleYear.toFixed(0),
      retirementConversionAge: retirementConversionAge.toFixed(0),
      yearsUntilConversion: yearsUntilConversion.toFixed(0),
      trialWorkMonths: trialWorkMonths.toFixed(0),
      extendedPeriodMonths: extendedPeriodMonths.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Disability Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate SSDI benefits based on work history and earnings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="18" max="64" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Worked</label>
          <input type="number" value={yearsWorked} min="0" max="40" onChange={(e) => setYearsWorked(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Average Indexed Monthly Earnings ($)</label>
          <input type="number" value={averageIndexedMonthlyEarnings} onChange={(e) => setAverageIndexedMonthlyEarnings(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recent Work (last 10 years)?</label>
          <select value={hasRecentWork ? 'yes' : 'no'} onChange={(e) => setHasRecentWork(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - worked recently</option>
            <option value="no">No - gap in employment</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">PIA Calculation (2024 Bend Points)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">AIME:</span><span className="font-medium ml-2">$ {result.averageIndexedMonthlyEarnings}</span></div>
          <div><span className="text-zinc-600">First Bend:</span><span className="font-medium ml-2">$ {result.firstBendPoint}</span></div>
          <div><span className="text-zinc-600">Second Bend:</span><span className="font-medium ml-2">$ {result.secondBendPoint}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">PIA formula: 90% of first $1,174 + 32% up to $7,078 + 15% above.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Benefit</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Primary Insurance Amount:</span><span className="font-bold text-green-700 ml-2">$ {result.pia}</span></div>
          <div><span className="text-zinc-600">Monthly SSDI:</span><span className="font-bold text-green-700 ml-2">$ {result.monthlyBenefit}</span></div>
          <div><span className="text-zinc-600">Annual Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.annualBenefit}</span></div>
          <div><span className="text-zinc-600">Max Family:</span><span className="font-medium ml-2">$ {result.maxFamilyBenefit}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>Eligibility Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Recent Quarters Needed:</span><span className={`font-bold ml-2 ${Number(result.quartersEarned) >= Number(result.quartersNeeded) ? 'text-green-700' : 'text-red-700'}`}>{result.quartersNeeded}</span></div>
          <div><span className="text-zinc-600">Quarters Earned:</span><span className="font-medium ml-2">{result.quartersEarned}</span></div>
          <div><span className="text-zinc-600">Total Quarters Needed:</span><span className="font-medium ml-2">{result.totalQuartersNeeded}</span></div>
        </div>
        <div className={`mt-2 text-sm font-bold ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>
          {result.isEligible ? '✓ Eligible for SSDI benefits' : '✗ Not eligible - need more recent work credits'}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefit Timeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">5-Month Wait:</span><span className="font-medium ml-2">{result.monthsBeforeFirstPayment} months</span></div>
          <div><span className="text-zinc-600">Medicare Eligible:</span><span className="font-bold text-orange-700 ml-2">Month {result.medicareEligibleMonths} (Year {result.medicareEligibleYear})</span></div>
          <div><span className="text-zinc-600">Converts to Retirement:</span><span className="font-medium ml-2">Age {result.retirementConversionAge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SSDI automatically converts to retirement benefits at Full Retirement Age (65 for disability recipients).</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Return to Work Rules</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Trial Work Period:</span><span className="font-bold text-purple-700 ml-2">{result.trialWorkMonths} months</span></div>
          <div><span className="text-zinc-600">Extended Period:</span><span className="font-bold text-purple-700 ml-2">{result.extendedPeriodMonths} months</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Trial work: earn any amount for 9 months. Extended: benefits continue if earnings below substantial gainful activity level.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">SSDI Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Must be unable to work for at least 12 months or condition terminal</li>
          <li>5-month waiting period before first payment</li>
          <li>Medicare after 24 months on SSDI</li>
          <li>Need 20 quarters in last 10 years (ages 31+)</li>
          <li>Benefits convert to retirement at FRA (age 65 for SSDI)</li>
          <li>Trial work period allows testing return to work</li>
          <li>Substantial gainful activity: $1,550/month (2024, non-blind)</li>
        </ul>
      </div>
    </div>
  )
}