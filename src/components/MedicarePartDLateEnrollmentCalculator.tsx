'use client'

import { useState } from 'react'

export default function MedicarePartDLateEnrollmentCalculator() {
  const [currentAge, setCurrentAge] = useState(65)
  const [enrollmentAge, setEnrollmentAge] = useState(68)
  const [hasCreditableCoverage, setHasCreditableCoverage] = useState(false)
  const [numberOfMonthsLate, setNumberOfMonthsLate] = useState(36)
  const [planPremium, setPlanPremium] = useState(35)

  const calculate = () => {
    // Part D late enrollment penalty: 1% of national base premium per month late
    // 2024 national base beneficiary premium: $34.70 (rounded to $35 for calculation)
    const nationalBasePremium = 34.70

    // Penalty calculation
    const penaltyPercent = numberOfMonthsLate * 1 // 1% per month
    const penaltyAmount = (nationalBasePremium * penaltyPercent / 100).toFixed(2)
    const totalMonthlyPremium = Number(planPremium) + Number(penaltyAmount)

    // Annual costs
    const annualBasePremium = planPremium * 12
    const annualPenalty = Number(penaltyAmount) * 12
    const annualTotal = totalMonthlyPremium * 12

    // Lifetime cost of penalty (assuming 20 years on Medicare)
    const yearsOnMedicare = 20
    const lifetimePenaltyCost = Number(penaltyAmount) * 12 * yearsOnMedicare

    // Special Enrollment Period (SEP) eligibility
    const hasSEP = hasCreditableCoverage
    const sepWindow = hasCreditableCoverage ? '63 days after coverage ends' : 'None'

    // Initial Enrollment Period (IEP)
    const iepStartAge = 65
    const iepEndAge = 65.25 // 7 months window (3 months before, 3 months after turning 65)
    const monthsOutsideIEP = Math.max(0, numberOfMonthsLate)

    // Penalty avoidance
    const penaltyAvoidable = hasCreditableCoverage

    // Enrollment timing options
    const optimalEnrollmentAge = hasCreditableCoverage ? 'Within SEP (63 days after coverage ends)' : 'During IEP (65 + 3 months)'
    const currentPenaltyStatus = penaltyAvoidable ? 'No penalty (creditable coverage)' : `Penalty: ${penaltyPercent}%`

    return {
      currentAge: currentAge.toFixed(0),
      enrollmentAge: enrollmentAge.toFixed(0),
      hasCreditableCoverage,
      numberOfMonthsLate: numberOfMonthsLate.toFixed(0),
      nationalBasePremium: nationalBasePremium.toFixed(2),
      penaltyPercent: penaltyPercent.toFixed(0),
      penaltyAmount: penaltyAmount,
      planPremium: planPremium.toFixed(2),
      totalMonthlyPremium: totalMonthlyPremium.toFixed(2),
      annualBasePremium: annualBasePremium.toFixed(0),
      annualPenalty: annualPenalty.toFixed(0),
      annualTotal: annualTotal.toFixed(0),
      lifetimePenaltyCost: lifetimePenaltyCost.toFixed(0),
      yearsOnMedicare: yearsOnMedicare.toFixed(0),
      hasSEP,
      sepWindow,
      monthsOutsideIEP: monthsOutsideIEP.toFixed(0),
      penaltyAvoidable,
      optimalEnrollmentAge,
      currentPenaltyStatus,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part D Late Enrollment Penalty Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Part D penalty for late enrollment without creditable coverage.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="65" max="100" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enrollment Age (or Planned)</label>
          <input type="number" value={enrollmentAge} min="65" max="100" onChange={(e) => setEnrollmentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Months Without Creditable Coverage</label>
          <input type="number" value={numberOfMonthsLate} min="0" max="120" onChange={(e) => setNumberOfMonthsLate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Had Creditable Coverage?</label>
          <select value={hasCreditableCoverage ? 'yes' : 'no'} onChange={(e) => setHasCreditableCoverage(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No (penalty applies)</option>
            <option value="yes">Yes (employer/union coverage)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Part D Plan Premium ($/month)</label>
          <input type="number" value={planPremium} min="0" max="200" onChange={(e) => setPlanPremium(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Penalty Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Months Late:</span><span className="font-medium ml-2">{result.numberOfMonthsLate}</span></div>
          <div><span className="text-zinc-600">Penalty Rate:</span><span className="font-bold text-blue-700 ml-2">{result.penaltyPercent}%</span></div>
          <div><span className="text-zinc-600">National Base:</span><span className="font-medium ml-2">$ {result.nationalBasePremium}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Monthly Penalty:</span><span className={`font-bold ml-2 ${Number(result.penaltyAmount) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.penaltyAmount}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.penaltyAvoidable ? 'text-green-700' : 'text-orange-700'}`}>{result.currentPenaltyStatus}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Premium Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Plan Premium:</span><span className="font-medium ml-2">$ {result.planPremium}</span></div>
          <div><span className="text-zinc-600">Late Penalty:</span><span className={`font-bold ml-2 ${Number(result.penaltyAmount) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.penaltyAmount}</span></div>
          <div><span className="text-zinc-600">Total Monthly:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalMonthlyPremium}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual & Lifetime Cost</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Annual Base:</span><span className="font-medium ml-2">$ {result.annualBasePremium}</span></div>
          <div><span className="text-zinc-600">Annual Penalty:</span><span className={`font-bold ml-2 ${Number(result.annualPenalty) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.annualPenalty}</span></div>
          <div><span className="text-zinc-600">Annual Total:</span><span className="font-bold text-purple-700 ml-2">$ {result.annualTotal}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Lifetime Penalty ({result.yearsOnMedicare} yrs):</span><span className={`font-bold ml-2 ${Number(result.lifetimePenaltyCost) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.lifetimePenaltyCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Penalty is permanent - lasts as long as you have Part D coverage.</div>
      </div>

      {hasCreditableCoverage && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Special Enrollment Period (SEP)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">SEP Eligible:</span><span className="font-bold text-green-700 ml-2">Yes</span></div>
            <div><span className="text-zinc-600">Enrollment Window:</span><span className="font-medium ml-2">{result.sepWindow}</span></div>
          </div>
          <div className="text-sm font-medium mt-2 text-green-700">You have creditable coverage - no penalty if enrolled within SEP.</div>
        </div>
      )}

      {!hasCreditableCoverage && Number(result.penaltyAmount) > 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Penalty Avoidance Tips</h2>
          <div className="text-sm font-medium">{result.optimalEnrollmentAge}</div>
          <div className="text-xs text-zinc-600 mt-2">Enroll during Initial Enrollment Period (3 months before to 3 months after turning 65) to avoid penalty.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part D Enrollment Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Initial Enrollment Period: 7 months (3 before, 3 after turning 65)</li>
          <li>Late penalty: 1% of national base premium per month late, permanent</li>
          <li>Creditable coverage: employer/union drug coverage as good as Part D</li>
          <li>SEP: 63-day window after losing creditable coverage, no penalty</li>
          <li>Penalty is added to all Part D premiums, forever</li>
          <li>National base premium 2024: $34.70 (used for penalty calc)</li>
        </ul>
      </div>
    </div>
  )
}