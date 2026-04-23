'use client'

import { useState } from 'react'

export default function MedicarePartDLatePenaltyWaiverCalculator() {
  const [currentAge, setCurrentAge] = useState(66)
  const [hasPartD, setHasPartD] = useState(false)
  const [monthsWithoutCoverage, setMonthsWithoutCoverage] = useState(12)
  const [enrollmentYear, setEnrollmentYear] = useState(2026)
  const [hasCreditableCoverage, setHasCreditableCoverage] = useState(false)
  const [basePartDPremium, setBasePartDPremium] = useState(32)

  const calculate = () => {
    // Part D late enrollment penalty rules
    // Penalty = 1% of national base premium per month without creditable coverage
    const penaltyRatePerMonth = 0.01 // 1% per month

    // National base premium (2024)
    const nationalBasePremium = 32.00 // Average

    // Calculate penalty
    const penaltyPercentage = monthsWithoutCoverage * penaltyRatePerMonth * 100
    const penaltyAmount = nationalBasePremium * monthsWithoutCoverage * penaltyRatePerMonth

    // Total Part D premium with penalty
    const totalPremium = basePartDPremium + penaltyAmount

    // Penalty is permanent - lasts for life
    const lifetimePenaltyYears = 25 // Estimate
    const lifetimePenaltyCost = penaltyAmount * 12 * lifetimePenaltyYears

    // Waiver options
    // 1. Had creditable coverage (employer, Medicaid, etc.)
    const waiverAvailable = hasCreditableCoverage

    // 2. Qualify for Extra Help (Low-Income Subsidy)
    const extraHelpIncomeLimit = 20000 // Simplified
    const extraHelpAssetLimit = 15000
    const extraHelpAvailable = false // Would need income/asset inputs

    // 3. SEP (Special Enrollment Period) for moving, losing coverage
    const sepMonthsAvailable = 2 // 2 months after event

    // Enrollment periods
    const iepStartAge = 65 - 0.25 // 3 months before 65
    const iepEndAge = 65 + 0.25 // 3 months after 65

    // Annual enrollment (Oct 15 - Dec 7)
    const annualEnrollmentPeriod = 'October 15 - December 7'
    const annualEnrollmentCoverageStart = 'January 1'

    // Penalty calculation timing
    // Penalty starts when you enroll, calculated at that time
    const penaltyCalculationYear = enrollmentYear

    // Monthly and annual costs
    const monthlyPartDWithPenalty = totalPremium
    const annualPartDWithPenalty = totalPremium * 12

    // Without penalty comparison
    const annualWithoutPenalty = basePartDPremium * 12
    const annualSavingsIfWaiver = annualPartDWithPenalty - annualWithoutPenalty

    // Strategies to avoid penalty
    const strategies = [
      'Enroll during IEP (age 65)',
      'Maintain creditable coverage',
      'Apply for Extra Help',
      'Use SEP after losing employer coverage',
      'Enroll during annual enrollment (Oct 15 - Dec 7)',
    ]

    return {
      currentAge: currentAge.toFixed(0),
      hasPartD,
      monthsWithoutCoverage: monthsWithoutCoverage.toFixed(0),
      enrollmentYear: enrollmentYear.toFixed(0),
      hasCreditableCoverage,
      basePartDPremium: basePartDPremium.toFixed(2),
      nationalBasePremium: nationalBasePremium.toFixed(2),
      penaltyRatePerMonth: (penaltyRatePerMonth * 100).toFixed(0),
      penaltyPercentage: penaltyPercentage.toFixed(0),
      penaltyAmount: penaltyAmount.toFixed(2),
      totalPremium: totalPremium.toFixed(2),
      lifetimePenaltyYears: lifetimePenaltyYears.toFixed(0),
      lifetimePenaltyCost: lifetimePenaltyCost.toFixed(0),
      waiverAvailable,
      iepStartAge: iepStartAge.toFixed(2),
      iepEndAge: iepEndAge.toFixed(2),
      annualEnrollmentPeriod,
      annualEnrollmentCoverageStart,
      penaltyCalculationYear: penaltyCalculationYear.toFixed(0),
      monthlyPartDWithPenalty: monthlyPartDWithPenalty.toFixed(2),
      annualPartDWithPenalty: annualPartDWithPenalty.toFixed(0),
      annualWithoutPenalty: annualWithoutPenalty.toFixed(0),
      annualSavingsIfWaiver: annualSavingsIfWaiver.toFixed(0),
      sepMonthsAvailable: sepMonthsAvailable.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part D Late Enrollment Penalty Waiver Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate penalty amount and explore waiver options.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="65" max="85" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Months Without Creditable Coverage</label>
          <input type="number" value={monthsWithoutCoverage} min="0" max="60" onChange={(e) => setMonthsWithoutCoverage(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Part D Plan Base Premium ($)</label>
          <input type="number" value={basePartDPremium} onChange={(e) => setBasePartDPremium(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enrollment Year</label>
          <input type="number" value={enrollmentYear} min="2024" max="2030" onChange={(e) => setEnrollmentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Had Creditable Coverage?</label>
          <select value={hasCreditableCoverage ? 'yes' : 'no'} onChange={(e) => setHasCreditableCoverage(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - no other drug coverage</option>
            <option value="yes">Yes - employer/Medicaid/other creditable coverage</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.waiverAvailable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.waiverAvailable ? 'text-green-700' : 'text-red-700'}`}>Waiver Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Waiver Available:</span><span className={`font-bold ml-2 ${result.waiverAvailable ? 'text-green-700' : 'text-red-700'}`}>{result.waiverAvailable ? 'Yes - penalty waived' : 'No - penalty applies'}</span></div>
          <div><span className="text-zinc-600">SEP Months:</span><span className="font-medium ml-2">{result.sepMonthsAvailable} months after event</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Creditable coverage = employer drug plan, Medicaid, VA, TRICARE, or other coverage at least as good as Part D.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Penalty Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Months Late:</span><span className="font-medium ml-2">{result.monthsWithoutCoverage}</span></div>
          <div><span className="text-zinc-600">Penalty Rate:</span><span className="font-medium ml-2">{result.penaltyRatePerMonth}%/month</span></div>
          <div><span className="text-zinc-600">Total Penalty:</span><span className="font-bold text-blue-700 ml-2">{result.penaltyPercentage}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">National Base:</span><span className="font-medium ml-2">$ {result.nationalBasePremium}</span></div>
          <div><span className="text-zinc-600">Penalty Amount:</span><span className="font-bold text-blue-700 ml-2">$ {result.penaltyAmount}/mo</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Penalty = 1% × months without coverage × national base premium. Penalty is permanent.</div>
      </div>

      <div className={`card mb-6 ${!result.waiverAvailable ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${!result.waiverAvailable ? 'text-red-700' : 'text-green-700'}`}>Monthly & Annual Cost</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Plan Premium:</span><span className="font-medium ml-2">$ {result.basePartDPremium}/mo</span></div>
          <div><span className="text-zinc-600">With Penalty:</span><span className={`font-bold ml-2 ${!result.waiverAvailable ? 'text-red-700' : 'text-green-700'}`}>$ {result.monthlyPartDWithPenalty}/mo</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className={`font-bold ml-2 ${!result.waiverAvailable ? 'text-red-700' : 'text-green-700'}`}>$ {result.annualPartDWithPenalty}</span></div>
        </div>
        {!result.waiverAvailable && (
          <div className="mt-2">
            <div><span className="text-zinc-600">Without Penalty:</span><span className="font-medium ml-2">$ {result.annualWithoutPenalty}</span></div>
            <div><span className="text-zinc-600">Extra Annual Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.annualSavingsIfWaiver}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Penalty added to your plan's monthly premium. Estimate: {result.penaltyCalculationYear}.</div>
      </div>

      <div className={`card mb-6 ${!result.waiverAvailable ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${!result.waiverAvailable ? 'text-red-700' : 'text-green-700'}`}>Lifetime Penalty Cost</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Est. Duration:</span><span className="font-medium ml-2">{result.lifetimePenaltyYears} years</span></div>
          <div><span className="text-zinc-600">Total Cost:</span><span className={`font-bold ml-2 ${!result.waiverAvailable ? 'text-red-700' : 'text-green-700'}`}>$ {result.lifetimePenaltyCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Part D penalty is permanent - lasts as long as you have Part D coverage.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Enrollment Periods</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">IEP:</span><span className="font-medium ml-2">Age {result.iepStartAge} - {result.iepEndAge}</span></div>
          <div><span className="text-zinc-600">Annual:</span><span className="font-medium ml-2">{result.annualEnrollmentPeriod}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IEP = Initial Enrollment Period (around age 65). Annual enrollment: Oct 15 - Dec 7, coverage starts Jan 1.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part D Penalty Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>1% penalty per month without creditable coverage</li>
          <li>Penalty is permanent - lasts for life</li>
          <li>Added to your plan's monthly premium</li>
          <li>Creditable coverage waives penalty</li>
          <li>Extra Help (LIS) eliminates penalty</li>
          <li>SEP: 2 months after losing employer coverage</li>
          <li>Enroll during IEP to avoid penalty</li>
          <li>Annual enrollment (Oct 15 - Dec 7) may add penalty</li>
          <li>National base premium used for calculation</li>
        </ul>
      </div>
    </div>
  )
}