'use client'

import { useState } from 'react'

export default function MedicareEnrollmentPeriodComparisonCalculator() {
  const [currentAge, setCurrentAge] = useState(64)
  const [turning65Month, setTurning65Month] = useState('January')
  const [hasEmployerCoverage, setHasEmployerCoverage] = useState(true)
  const [employerSize, setEmployerSize] = useState<'large' | 'small'>('large')
  const [retirementDate, setRetirementDate] = useState('June 2026')
  const [enrollmentPeriod, setEnrollmentPeriod] = useState<'IEP' | 'SEP' | 'GEP' | 'AEP'>('IEP')

  const calculate = () => {
    // Medicare enrollment periods
    const iepStart = '3 months before 65th birthday'
    const iepEnd = '3 months after 65th birthday'
    const iepDurationMonths = 7

    // Coverage start depends on when you enroll in IEP
    const coverageStartRules = {
      beforeBirthday: 'Birthday month (or following month)',
      birthdayMonth: 'Following month',
      afterBirthday: '1-3 months after enrollment (varies)',
    }

    // Special Enrollment Period (SEP)
    const sepTrigger = 'Losing employer coverage or stopping work'
    const sepDurationMonths = 8
    const sepCoverageStart = 'First day of month after enrollment'

    // General Enrollment Period (GEP)
    const gepPeriod = 'January 1 - March 31 each year'
    const gepCoverageStart = 'July 1 of that year'
    const gepPenalty = 'Late enrollment penalty may apply'

    // Annual Enrollment Period (AEP) - for changing plans
    const aepPeriod = 'October 15 - December 7'
    const aepCoverageStart = 'January 1 of following year'
    const aepPurpose = 'Change Medicare Advantage or Part D plans'

    // Medicare Advantage Open Enrollment
    const maOepPeriod = 'January 1 - March 31'
    const maOepPurpose = 'Switch MA plans or return to Original Medicare'

    // Calculate specific dates based on inputs
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const birthdayMonthIndex = months.indexOf(turning65Month)

    // IEP months
    const iepStartMonth = months[(birthdayMonthIndex - 3 + 12) % 12]
    const iepEndMonth = months[(birthdayMonthIndex + 3) % 12]

    // SEP availability
    const sepAvailable = hasEmployerCoverage && employerSize === 'large'

    // Penalty risk
    const penaltyRiskIEP = false
    const penaltyRiskSEP = false
    const penaltyRiskGEP = true

    // Recommended period
    const recommendedPeriod = sepAvailable && hasEmployerCoverage ? 'SEP (if delaying due to employer coverage)' : 'IEP (enroll at 65)'

    // Enrollment timeline
    const enrollmentTimeline = {
      IEP: {
        period: `${iepStartMonth} - ${iepEndMonth} (around age 65)`,
        duration: '7 months',
        penaltyRisk: 'None',
        coverageStart: 'Birthday month or following',
        bestFor: 'Most people without employer coverage',
      },
      SEP: {
        period: 'Anytime (8 months after employer coverage ends)',
        duration: '8 months after trigger',
        penaltyRisk: 'None (if qualified)',
        coverageStart: 'Month after enrollment',
        bestFor: 'People with large employer coverage',
      },
      GEP: {
        period: 'January 1 - March 31 (annual)',
        duration: '3 months',
        penaltyRisk: 'Late enrollment penalty',
        coverageStart: 'July 1',
        bestFor: 'Missed other enrollment periods',
      },
      AEP: {
        period: 'October 15 - December 7',
        duration: '~2.5 months',
        penaltyRisk: 'None (plan changes only)',
        coverageStart: 'January 1',
        bestFor: 'Changing Medicare Advantage or Part D',
      },
    }

    const selectedPeriod = enrollmentTimeline[enrollmentPeriod]

    return {
      currentAge: currentAge.toFixed(0),
      turning65Month,
      hasEmployerCoverage,
      employerSize,
      retirementDate,
      enrollmentPeriod,
      iepStart,
      iepEnd,
      iepDurationMonths: iepDurationMonths.toFixed(0),
      iepStartMonth,
      iepEndMonth,
      sepTrigger,
      sepDurationMonths: sepDurationMonths.toFixed(0),
      sepAvailable,
      sepCoverageStart,
      gepPeriod,
      gepCoverageStart,
      gepPenalty,
      aepPeriod,
      aepCoverageStart,
      aepPurpose,
      maOepPeriod,
      maOepPurpose,
      penaltyRiskIEP,
      penaltyRiskSEP,
      penaltyRiskGEP,
      recommendedPeriod,
      selectedPeriod,
      selectedPeriodKey: enrollmentPeriod,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Enrollment Period Comparison Calculator</h1>
      <p className="text-gray-600 mb-4">Compare enrollment periods and determine your best option.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="62" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">65th Birthday Month</label>
          <select value={turning65Month} onChange={(e) => setTurning65Month(e.target.value)} className="w-full border rounded p-2">
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Health Coverage?</label>
          <select value={hasEmployerCoverage ? 'yes' : 'no'} onChange={(e) => setHasEmployerCoverage(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - covered by employer plan</option>
            <option value="no">No - no employer coverage</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employer Size</label>
          <select value={employerSize} onChange={(e) => setEmployerSize(e.target.value as 'large' | 'small')} className="w-full border rounded p-2">
            <option value="large">20+ employees</option>
            <option value="small">Under 20 employees</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Compare Enrollment Period</label>
          <select value={enrollmentPeriod} onChange={(e) => setEnrollmentPeriod(e.target.value as 'IEP' | 'SEP' | 'GEP' | 'AEP')} className="w-full border rounded p-2">
            <option value="IEP">IEP - Initial Enrollment Period</option>
            <option value="SEP">SEP - Special Enrollment Period</option>
            <option value="GEP">GEP - General Enrollment Period</option>
            <option value="AEP">AEP - Annual Enrollment Period</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Selected Period: {result.selectedPeriodKey}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.selectedPeriod.period}</span></div>
          <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.selectedPeriod.duration}</span></div>
          <div><span className="text-zinc-600">Penalty Risk:</span><span className={`font-bold ml-2 ${result.selectedPeriod.penaltyRisk === 'None' ? 'text-green-700' : 'text-red-700'}`}>{result.selectedPeriod.penaltyRisk}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Coverage Starts:</span><span className="font-medium ml-2">{result.selectedPeriod.coverageStart}</span></div>
          <div><span className="text-zinc-600">Best For:</span><span className="font-medium ml-2">{result.selectedPeriod.bestFor}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Initial Enrollment Period (IEP)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Window:</span><span className="font-medium ml-2">{result.iepStartMonth} - {result.iepEndMonth}</span></div>
          <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.iepDurationMonths} months</span></div>
          <div><span className="text-zinc-600">Penalty:</span><span className="font-bold text-green-700 ml-2">None</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">7-month window around 65th birthday: 3 months before + birthday month + 3 months after.</div>
      </div>

      <div className={`card mb-6 ${result.sepAvailable ? 'bg-purple-50 border border-purple-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.sepAvailable ? 'text-purple-700' : 'text-orange-700'}`}>Special Enrollment Period (SEP)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Trigger:</span><span className="font-medium ml-2">{result.sepTrigger}</span></div>
          <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.sepDurationMonths} months</span></div>
          <div><span className="text-zinc-600">Available:</span><span className={`font-bold ml-2 ${result.sepAvailable ? 'text-purple-700' : 'text-orange-700'}`}>{result.sepAvailable ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SEP available for large employer (20+) coverage. 8 months after employment or coverage ends.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">General Enrollment Period (GEP)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.gepPeriod}</span></div>
          <div><span className="text-zinc-600">Coverage:</span><span className="font-medium ml-2">{result.gepCoverageStart}</span></div>
          <div><span className="text-zinc-600">Penalty:</span><span className="font-bold text-red-700 ml-2">May apply</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Only use if missed IEP/SEP. Late enrollment penalty applies. Coverage delayed to July 1.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Enrollment Period (AEP)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.aepPeriod}</span></div>
          <div><span className="text-zinc-600">Purpose:</span><span className="font-medium ml-2">{result.aepPurpose}</span></div>
          <div><span className="text-zinc-600">Coverage:</span><span className="font-medium ml-2">{result.aepCoverageStart}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">For changing plans, not initial enrollment. Switch Medicare Advantage or Part D plans.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommended Enrollment Strategy</h2>
        <div className="text-lg font-bold text-teal-700">{result.recommendedPeriod}</div>
        <div className="text-xs text-zinc-600 mt-2">Based on your employer coverage status and size. Enroll early to avoid penalties.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Enrollment Period Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IEP: 7-month window at age 65 (best for most)</li>
          <li>SEP: 8 months after large employer coverage ends</li>
          <li>GEP: Jan-Mar annually, but penalty may apply</li>
          <li>AEP: Oct-Dec for plan changes, not enrollment</li>
          <li>MA OEP: Jan-Mar for Medicare Advantage changes</li>
          <li>Large employer (20+): SEP available</li>
          <li>Small employer: No SEP, enroll in IEP</li>
          <li>Enroll early in IEP for earlier coverage start</li>
          <li>Missing IEP/SEP leads to GEP with penalty</li>
          <li>Plan enrollment periods carefully</li>
        </ul>
      </div>
    </div>
  )
}