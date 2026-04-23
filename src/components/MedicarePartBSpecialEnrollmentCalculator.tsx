'use client'

import { useState } from 'react'

export default function MedicarePartBSpecialEnrollmentCalculator() {
  const [coverageType, setCoverageType] = useState<'employer' | 'cobra' | 'none'>('employer')
  const [currentAge, setCurrentAge] = useState(64)
  const [coverageEnding, setCoverageEnding] = useState('retirement')
  const [coverageEndDate, setCoverageEndDate] = useState('2024-03')
  const [delayedEnrollment, setDelayedEnrollment] = useState(false)
  const [delayedMonths, setDelayedMonths] = useState(12)

  const calculate = () => {
    // Medicare Part B Special Enrollment Period (SEP)
    // SEP available when employer coverage ends
    // No late enrollment penalty if enrolled during SEP

    // IEP: Initial Enrollment Period (3 months before to 3 months after 65)
    // SEP: Special Enrollment Period (8 months after coverage/employment ends)
    // GEP: General Enrollment Period (Jan 1 - Mar 31 each year)

    // SEP eligibility conditions
    // 1. Had employer group coverage (or COBRA) at age 65
    // 2. Coverage was through active employment (self or spouse)
    // 3. Enroll within 8 months of coverage/employment ending

    const iepMonthsBefore = 3
    const iepMonthsAfter = 3
    const iepTotalMonths = 7

    const sepMonthsAfterEnd = 8 // SEP duration

    // Calculate enrollment windows
    const age65Month = 'Age 65 birthday month'
    const iepStart = '3 months before 65'
    const iepEnd = '3 months after 65'

    // SEP timeline
    const coverageEndMonth = coverageEndDate
    const sepStart = coverageEndDate
    const sepEnd = `${sepMonthsAfterEnd} months after coverage ends`

    // Late enrollment penalty
    // 10% of premium for each 12-month period delayed
    // Part B premium: $174.70 (2024 standard)

    const partBPremium = 174.70
    const penaltyPer12Months = 0.10

    let penaltyPercentage = 0
    let penaltyAmount = 0
    let monthlyPremiumWithPenalty = partBPremium

    if (delayedEnrollment) {
      const penaltyPeriods = Math.ceil(delayedMonths / 12)
      penaltyPercentage = penaltyPeriods * 10
      penaltyAmount = partBPremium * penaltyPeriods * penaltyPer12Months
      monthlyPremiumWithPenalty = partBPremium + penaltyAmount
    }

    // SEP avoids penalty if enrolled timely
    const sepAvoidsPenalty = coverageType === 'employer' && !delayedEnrollment

    // COBRA warning
    // COBRA does NOT qualify for SEP (must be active employment)
    const cobraNotSEPQualified = coverageType === 'cobra'
    const cobraPenaltyRisk = cobraNotSEPQualified ? 'Yes - COBRA does not qualify' : 'No'

    // Enrollment recommendations
    let recommendation = ''
    if (coverageType === 'employer') {
      recommendation = 'Enroll during SEP when coverage ends - no penalty'
    } else if (coverageType === 'cobra') {
      recommendation = 'COBRA does not qualify - may face penalty unless enrolled during IEP'
    } else {
      recommendation = 'Enroll during IEP or GEP - may face penalty'
    }

    // GEP enrollment
    // Jan 1 - Mar 31 each year
    // Coverage starts July 1
    const gepStart = 'January 1'
    const gepEnd = 'March 31'
    const gepCoverageStart = 'July 1'

    // Part A premium-free eligibility
    // Most qualify for Part A at no cost (40 quarters)

    // 2024 Part B premium structure
    const standardPremium = 174.70

    return {
      coverageType,
      currentAge: currentAge.toFixed(0),
      coverageEnding,
      coverageEndDate,
      delayedEnrollment,
      delayedMonths: delayedMonths.toFixed(0),
      iepMonthsBefore: iepMonthsBefore.toFixed(0),
      iepMonthsAfter: iepMonthsAfter.toFixed(0),
      sepMonthsAfterEnd: sepMonthsAfterEnd.toFixed(0),
      sepStart,
      sepEnd,
      partBPremium: partBPremium.toFixed(2),
      penaltyPercentage: penaltyPercentage.toFixed(0),
      penaltyAmount: penaltyAmount.toFixed(2),
      monthlyPremiumWithPenalty: monthlyPremiumWithPenalty.toFixed(2),
      sepAvoidsPenalty,
      cobraNotSEPQualified,
      cobraPenaltyRisk,
      recommendation,
      gepStart,
      gepEnd,
      gepCoverageStart,
      standardPremium: standardPremium.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part B Special Enrollment Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate SEP eligibility and late enrollment penalty.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Coverage Type</label>
          <select value={coverageType} onChange={(e) => setCoverageType(e.target.value as 'employer' | 'cobra' | 'none')} className="w-full border rounded p-2">
            <option value="employer">Employer Group Coverage (Active Work)</option>
            <option value="cobra">COBRA Continuation</option>
            <option value="none">No Coverage</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="60" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Coverage Ending Reason</label>
          <select value={coverageEnding} onChange={(e) => setCoverageEnding(e.target.value)} className="w-full border rounded p-2">
            <option value="retirement">Retirement</option>
            <option value="job_loss">Job Loss</option>
            <option value="spouse_retirement">Spouse Retirement</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Coverage/Work End Date</label>
          <input type="text" value={coverageEndDate} onChange={(e) => setCoverageEndDate(e.target.value)} className="w-full border rounded p-2" placeholder="YYYY-MM" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Delayed Enrollment?</label>
          <select value={delayedEnrollment ? 'yes' : 'no'} onChange={(e) => setDelayedEnrollment(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - enrolled during SEP</option>
            <option value="yes">Yes - enrolled late</option>
          </select>
        </div>
        {result.delayedEnrollment && (
          <div>
            <label className="block text-sm font-medium mb-1">Months Delayed After SEP</label>
            <input type="number" value={delayedMonths} onChange={(e) => setDelayedMonths(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.sepAvoidsPenalty ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.sepAvoidsPenalty ? 'text-green-700' : 'text-orange-700'}`}>SEP Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Coverage Type:</span><span className="font-medium ml-2">{result.coverageType}</span></div>
          <div><span className="text-zinc-600">SEP Qualified:</span><span className={`font-bold ml-2 ${result.sepAvoidsPenalty ? 'text-green-700' : 'text-orange-700'}`}>{result.sepAvoidsPenalty ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SEP requires active employment coverage. COBRA does NOT qualify for SEP.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Enrollment Periods</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-blue-700 mb-1">IEP (Initial)</div>
            <div className="text-sm text-zinc-600">3 months before to 3 months after 65</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 mb-1">SEP (Special)</div>
            <div className="text-sm text-zinc-600">{result.sepMonthsAfterEnd} months after coverage ends</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <div className="font-semibold text-blue-700 mb-1">GEP (General)</div>
            <div className="text-sm text-zinc-600">{result.gepStart} - {result.gepEnd} (coverage {result.gepCoverageStart})</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 mb-1">SEP Window</div>
            <div className="text-sm text-zinc-600">{result.sepStart} to {result.sepEnd}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SEP allows enrollment without penalty when employer coverage ends.</div>
      </div>

      {result.cobraNotSEPQualified && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">COBRA Warning</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">SEP Qualified:</span><span className="font-bold text-red-700 ml-2">No</span></div>
            <div><span className="text-zinc-600">Penalty Risk:</span><span className="font-bold text-red-700 ml-2">{result.cobraPenaltyRisk}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">COBRA does NOT qualify for SEP. Must be active employment coverage. Enroll during IEP or face penalty.</div>
        </div>
      )}

      {result.delayedEnrollment && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Late Enrollment Penalty</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Months Delayed:</span><span className="font-medium ml-2">{result.delayedMonths}</span></div>
            <div><span className="text-zinc-600">Penalty %:</span><span className="font-bold text-orange-700 ml-2">{result.penaltyPercentage}%</span></div>
            <div><span className="text-zinc-600">Penalty Amount:</span><span className="font-bold text-orange-700 ml-2">$ {result.penaltyAmount}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Standard Premium:</span><span className="font-medium ml-2">$ {result.partBPremium}</span></div>
            <div><span className="text-zinc-600">With Penalty:</span><span className="font-bold text-orange-700 ml-2">$ {result.monthlyPremiumWithPenalty}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">10% penalty per 12-month period delayed. Lifetime penalty unless qualifying SEP.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
        <div className="text-xs text-zinc-600 mt-2">Enroll during SEP if eligible to avoid lifetime penalty. Part A is premium-free for most.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part B Premium 2024</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Standard:</span><span className="font-bold text-teal-700 ml-2">$ {result.standardPremium}</span></div>
          <div><span className="text-zinc-600">With Penalty:</span><span className="font-medium ml-2">$ {result.monthlyPremiumWithPenalty}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRMAA may apply based on income. Penalty adds to base premium permanently.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Part B Enrollment Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IEP: 7-month window around age 65</li>
          <li>SEP: 8 months after coverage ends</li>
          <li>SEP requires active employment</li>
          <li>COBRA does NOT qualify for SEP</li>
          <li>Late penalty: 10% per 12-month delay</li>
          <li>Penalty is lifetime</li>
          <li>Enroll during SEP to avoid penalty</li>
          <li>Part A is premium-free for most</li>
          <li>GEP: Jan-Mar, coverage July 1</li>
          <li>Report coverage end to SSA</li>
        </ul>
      </div>
    </div>
  )
}