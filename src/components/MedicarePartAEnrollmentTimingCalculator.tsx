'use client'

import { useState } from 'react'

export default function MedicarePartAEnrollmentTimingCalculator() {
  const [currentAge, setCurrentAge] = useState(64)
  const [hasPartA, setHasPartA] = useState(false)
  const [hasPartB, setHasPartB] = useState(false)
  const [retirementAge, setRetirementAge] = useState(65)
  const [hasGroupHealthPlan, setHasGroupHealthPlan] = useState(true)
  const [employerSize, setEmployerSize] = useState<'small' | 'large'>('large')
  const [enrollmentIntent, setEnrollmentIntent] = useState<'standard' | 'delayed' | 'early'>('standard')

  const calculate = () => {
    // Medicare Part A enrollment rules
    const standardEnrollmentStart = 65 // Age 65
    const initialEnrollmentPeriodMonths = 7 // 3 months before + month of + 3 months after

    // Part A is usually free if you or spouse worked 40+ quarters
    const partAPremiumFree = true // Simplified assumption

    // If not free, Part A premium (2024)
    const partAPremiumIfNotFree = employerSize === 'small' ? 278 : 505 // Per month

    // Enrollment timing
    const enrollmentWindowStartAge = standardEnrollmentStart - 0.25 // 3 months before
    const enrollmentWindowEndAge = standardEnrollmentStart + 0.25 // 3 months after

    // Special Enrollment Period (SEP) if covered by group health plan
    const sepAvailable = hasGroupHealthPlan && employerSize === 'large'
    const sepMonthsAfterEmploymentEnds = 8 // 8 months after employment or coverage ends

    // Late enrollment penalty (for Part A)
    const lateEnrollmentPenaltyRate = 10 // 10% increase in premium
    const penaltyDurationYears = 2 // Lasts 2 years

    // Calculate enrollment age based on intent
    let effectiveEnrollmentAge = 65
    let penaltyApplies = false
    let penaltyAmount = 0

    if (enrollmentIntent === 'delayed' && !sepAvailable) {
      effectiveEnrollmentAge = 67 // Example delayed enrollment
      penaltyApplies = true
      penaltyAmount = partAPremiumIfNotFree * lateEnrollmentPenaltyRate / 100
    } else if (enrollmentIntent === 'early') {
      effectiveEnrollmentAge = 65 // Cannot enroll before 65 for Part A
    }

    // Coverage start date
    const coverageStartAge = effectiveEnrollmentAge

    // General Enrollment Period (Jan 1 - Mar 31 each year)
    const generalEnrollmentPeriodStart = 'January 1'
    const generalEnrollmentPeriodEnd = 'March 31'
    const generalEnrollmentCoverageStart = 'July 1'

    // Cost analysis
    const freePartASavings = partAPremiumFree ? 505 * 12 : 0 // Annual savings if free
    const penaltyCostIfLate = penaltyApplies ? penaltyAmount * 12 * penaltyDurationYears : 0

    return {
      currentAge: currentAge.toFixed(0),
      hasPartA,
      hasPartB,
      retirementAge: retirementAge.toFixed(0),
      hasGroupHealthPlan,
      employerSize,
      enrollmentIntent,
      standardEnrollmentStart: standardEnrollmentStart.toFixed(0),
      initialEnrollmentPeriodMonths: initialEnrollmentPeriodMonths.toFixed(0),
      partAPremiumFree,
      partAPremiumIfNotFree: partAPremiumIfNotFree.toFixed(0),
      enrollmentWindowStartAge: enrollmentWindowStartAge.toFixed(2),
      enrollmentWindowEndAge: enrollmentWindowEndAge.toFixed(2),
      sepAvailable,
      sepMonthsAfterEmploymentEnds: sepMonthsAfterEmploymentEnds.toFixed(0),
      lateEnrollmentPenaltyRate: lateEnrollmentPenaltyRate.toFixed(0),
      penaltyDurationYears: penaltyDurationYears.toFixed(0),
      effectiveEnrollmentAge: effectiveEnrollmentAge.toFixed(0),
      penaltyApplies,
      penaltyAmount: penaltyAmount.toFixed(0),
      coverageStartAge: coverageStartAge.toFixed(0),
      generalEnrollmentPeriodStart,
      generalEnrollmentPeriodEnd,
      generalEnrollmentCoverageStart,
      freePartASavings: freePartASavings.toFixed(0),
      penaltyCostIfLate: penaltyCostIfLate.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part A Enrollment Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Determine optimal enrollment timing and penalties.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="62" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <input type="number" value={retirementAge} min="62" max="70" onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Size</label>
          <select value={employerSize} onChange={(e) => setEmployerSize(e.target.value as 'small' | 'large')} className="w-full border rounded p-2">
            <option value="large">20+ employees (SEP available)</option>
            <option value="small">Under 20 employees (No SEP)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Health Coverage?</label>
          <select value={hasGroupHealthPlan ? 'yes' : 'no'} onChange={(e) => setHasGroupHealthPlan(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - covered by employer plan</option>
            <option value="no">No - no employer coverage</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enrollment Intent</label>
          <select value={enrollmentIntent} onChange={(e) => setEnrollmentIntent(e.target.value as 'standard' | 'delayed' | 'early')} className="w-full border rounded p-2">
            <option value="standard">Standard (at age 65)</option>
            <option value="delayed">Delayed (after 65)</option>
            <option value="early">Early attempt</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Enrollment Window</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Standard Age:</span><span className="font-medium ml-2">{result.standardEnrollmentStart}</span></div>
          <div><span className="text-zinc-600">IEP Months:</span><span className="font-medium ml-2">{result.initialEnrollmentPeriodMonths}</span></div>
          <div><span className="text-zinc-600">Window Start:</span><span className="font-medium ml-2">Age {result.enrollmentWindowStartAge}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Window End:</span><span className="font-bold text-blue-700 ml-2">Age {result.enrollmentWindowEndAge}</span></div>
          <div><span className="text-zinc-600">Coverage Starts:</span><span className="font-medium ml-2">Age {result.coverageStartAge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Initial Enrollment Period: 3 months before age 65, month of 65th birthday, 3 months after.</div>
      </div>

      <div className={`card mb-6 ${result.sepAvailable ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.sepAvailable ? 'text-green-700' : 'text-orange-700'}`}>Special Enrollment Period</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">SEP Available:</span><span className={`font-bold ml-2 ${result.sepAvailable ? 'text-green-700' : 'text-orange-700'}`}>{result.sepAvailable ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">SEP Duration:</span><span className="font-medium ml-2">{result.sepMonthsAfterEmploymentEnds} months after employment ends</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SEP available if you or spouse work for employer with 20+ employees and have group health coverage.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part A Premium Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Premium-Free:</span><span className={`font-bold ml-2 ${result.partAPremiumFree ? 'text-green-700' : 'text-red-700'}`}>{result.partAPremiumFree ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">If Not Free:</span><span className="font-medium ml-2">$ {result.partAPremiumIfNotFree}/mo</span></div>
          <div><span className="text-zinc-600">Annual Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.freePartASavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Part A is premium-free if you or spouse paid Medicare taxes for 40+ quarters (10 years).</div>
      </div>

      <div className={`card mb-6 ${result.penaltyApplies ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.penaltyApplies ? 'text-red-700' : 'text-green-700'}`}>Late Enrollment Penalty</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Penalty Applies:</span><span className={`font-bold ml-2 ${result.penaltyApplies ? 'text-red-700' : 'text-green-700'}`}>{result.penaltyApplies ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Penalty Rate:</span><span className="font-medium ml-2">{result.lateEnrollmentPenaltyRate}%</span></div>
          <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.penaltyDurationYears} years</span></div>
        </div>
        {result.penaltyApplies && (
          <div className="mt-2">
            <div><span className="text-zinc-600">Penalty Amount:</span><span className="font-bold text-red-700 ml-2">$ {result.penaltyAmount}/mo</span></div>
            <div><span className="text-zinc-600">Total Penalty Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.penaltyCostIfLate}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Penalty applies if you enroll late and don't qualify for SEP. Penalty = 10% of premium for 2 years.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">General Enrollment Period</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.generalEnrollmentPeriodStart} - {result.generalEnrollmentPeriodEnd}</span></div>
          <div><span className="text-zinc-600">Coverage Starts:</span><span className="font-medium ml-2">{result.generalEnrollmentCoverageStart}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">If you miss IEP and SEP, you can enroll during General Enrollment Period (Jan 1 - Mar 31), but coverage starts July 1 and penalty may apply.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part A Enrollment Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Enroll at age 65 to avoid late enrollment penalties</li>
          <li>Part A usually premium-free if you worked 10+ years</li>
          <li>SEP available if covered by large employer health plan</li>
          <li>SEP: 8 months after employment/coverage ends</li>
          <li>Late penalty: 10% premium increase for 2 years</li>
          <li>Cannot enroll in Part A before age 65</li>
          <li>Delay enrollment if SEP available to avoid penalty</li>
          <li>Coordinate with employer coverage to maximize benefits</li>
        </ul>
      </div>
    </div>
  )
}