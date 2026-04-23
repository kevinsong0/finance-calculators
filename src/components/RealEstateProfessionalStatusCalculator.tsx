'use client'

import { useState } from 'react'

export default function RealEstateProfessionalStatusCalculator() {
  const [realEstateHours, setRealEstateHours] = useState(750)
  const [totalPersonalServiceHours, setTotalPersonalServiceHours] = useState(1000)
  const [otherBusinessHours, setOtherBusinessHours] = useState(250)
  const [hasOtherJobs, setHasOtherJobs] = useState(false)
  const [rentalPropertiesCount, setRentalPropertiesCount] = useState(3)
  const [hoursPerProperty, setHoursPerProperty] = useState([250, 200, 300])
  const [documentationLevel, setDocumentationLevel] = useState<'minimal' | 'adequate' | 'excellent'>('adequate')
  const [propertyManagementType, setPropertyManagementType] = useState<'self' | 'partial' | 'full'>('self')
  const [isSpouseFilingJointly, setIsSpouseFilingJointly] = useState(true)
  const [spouseREHours, setSpouseREHours] = useState(0)

  const calculate = () => {
    // Real Estate Professional Status (REPS) Calculator
    // To qualify for REPS, must meet two tests:
    // 1. More than 750 hours in real estate activities
    // 2. More than 50% of personal services in real estate

    // Benefits of REPS:
    // - Rental losses not limited by passive activity rules
    // - Can deduct rental losses against active income
    // - Material participation easier to prove

    const reHours = realEstateHours
    const spouseHours = isSpouseFilingJointly ? spouseREHours : 0
    const combinedREHours = reHours + spouseHours

    // Test 1: 750-hour test
    const meets750HourTest = combinedREHours > 750
    const hoursShort750 = Math.max(0, 750 - combinedREHours)

    // Test 2: 50% of personal services test
    const totalHours = totalPersonalServiceHours
    const rePercentage = (combinedREHours / totalHours) * 100
    const meets50PercentTest = rePercentage > 50

    // Combined status
    const qualifiesAsREPS = meets750HourTest && meets50PercentTest

    // Hours per property (material participation)
    const totalPropertyHours = hoursPerProperty.reduce((a, b) => a + b, 0)
    const avgHoursPerProperty = rentalPropertiesCount > 0 ? totalPropertyHours / rentalPropertiesCount : 0

    // Material participation per property (100-hour rule or 500-hour rule)
    const propertiesWith100Hours = hoursPerProperty.filter(h => h >= 100).length
    const propertiesWith500Hours = hoursPerProperty.filter(h => h >= 500).length

    // Documentation strength
    let documentationScore = 0
    if (documentationLevel === 'minimal') documentationScore = 30
    if (documentationLevel === 'adequate') documentationScore = 60
    if (documentationLevel === 'excellent') documentationScore = 90

    let documentationNote = ''
    if (documentationLevel === 'minimal') {
      documentationNote = 'Warning: Minimal documentation may fail IRS challenge. Keep time logs.'
    } else if (documentationLevel === 'adequate') {
      documentationNote = 'Adequate documentation but strengthen for audit protection.'
    } else {
      documentationNote = 'Excellent documentation - strong audit defense.'
    }

    // Property management impact
    let managementNote = ''
    let managementHoursFactor = 1
    if (propertyManagementType === 'full') {
      managementNote = 'Full management company reduces your hours significantly.'
      managementHoursFactor = 0.3
    } else if (propertyManagementType === 'partial') {
      managementNote = 'Partial management: count only hours you personally spend.'
      managementHoursFactor = 0.7
    } else {
      managementNote = 'Self-managed: all hours count toward REPS.'
      managementHoursFactor = 1
    }

    // Risk assessment
    let auditRisk = 'Low'
    if (!meets750HourTest || !meets50PercentTest) {
      auditRisk = 'High - does not meet tests'
    } else if (documentationLevel === 'minimal') {
      auditRisk = 'Medium - documentation weak'
    } else if (combinedREHours < 800) {
      auditRisk = 'Medium - close to threshold'
    }

    // Recommendations
    let recommendation = ''
    if (qualifiesAsREPS) {
      recommendation = `Qualifies as REPS with ${combinedREHours} hours (${rePercentage.toFixed(0)}% of personal services). Rental losses fully deductible against active income.`
    } else if (!meets750HourTest) {
      recommendation = `Need ${hoursShort750} more RE hours to meet 750-hour test. Increase real estate activity time.`
    } else if (!meets50PercentTest) {
      recommendation = `RE hours only ${rePercentage.toFixed(0)}% of personal services. Need to exceed 50% threshold.`
    } else {
      recommendation = 'Does not qualify. Passive activity limits apply to rental losses.'
    }

    // Passive activity benefit calculation
    // Without REPS, rental losses limited to passive income
    // With REPS, can offset any income
    const passiveLossLimitWithoutREPS = 'Limited to passive income only'
    const passiveLossBenefitWithREPS = 'Can offset active/W-2 income'

    // Activities that count
    const qualifyingActivities = [
      'Property acquisition/disposition',
      'Property management',
      'Repairs and maintenance',
      'Tenant management',
      'Leasing activities',
      'Real estate development',
      'Real estate brokerage',
    ]

    // Activities that don't count
    const nonQualifyingActivities = [
      'Investment research only',
      'Financial management only',
      'Passive investor activities',
    ]

    // Spouse election note
    const spouseNote = isSpouseFilingJointly
      ? 'Filing jointly: Spouse hours count toward both tests.'
      : 'Filing separately: Each spouse must qualify individually.'

    return {
      realEstateHours: realEstateHours.toFixed(0),
      spouseREHours: spouseREHours.toFixed(0),
      combinedREHours: combinedREHours.toFixed(0),
      totalPersonalServiceHours: totalPersonalServiceHours.toFixed(0),
      otherBusinessHours: otherBusinessHours.toFixed(0),
      hasOtherJobs,
      meets750HourTest,
      hoursShort750: hoursShort750.toFixed(0),
      rePercentage: rePercentage.toFixed(0),
      meets50PercentTest,
      qualifiesAsREPS,
      rentalPropertiesCount: rentalPropertiesCount.toFixed(0),
      totalPropertyHours: totalPropertyHours.toFixed(0),
      avgHoursPerProperty: avgHoursPerProperty.toFixed(0),
      hoursPerProperty,
      propertiesWith100Hours: propertiesWith100Hours.toFixed(0),
      propertiesWith500Hours: propertiesWith500Hours.toFixed(0),
      documentationLevel,
      documentationScore: documentationScore.toFixed(0),
      documentationNote,
      propertyManagementType,
      managementNote,
      auditRisk,
      recommendation,
      passiveLossLimitWithoutREPS,
      passiveLossBenefitWithREPS,
      qualifyingActivities,
      nonQualifyingActivities,
      spouseNote,
      isSpouseFilingJointly,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Real Estate Professional Status Calculator</h1>
      <p className="text-gray-600 mb-4">Determine qualification for REPS tax benefits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Real Estate Hours</label>
          <input type="number" value={realEstateHours} onChange={(e) => setRealEstateHours(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Personal Service Hours</label>
          <input type="number" value={totalPersonalServiceHours} onChange={(e) => setTotalPersonalServiceHours(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rental Properties Count</label>
          <input type="number" value={rentalPropertiesCount} min="0" onChange={(e) => setRentalPropertiesCount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documentation Level</label>
          <select value={documentationLevel} onChange={(e) => setDocumentationLevel(e.target.value as 'minimal' | 'adequate' | 'excellent')} className="w-full border rounded p-2">
            <option value="minimal">Minimal - little documentation</option>
            <option value="adequate">Adequate - some time logs</option>
            <option value="excellent">Excellent - detailed logs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Management</label>
          <select value={propertyManagementType} onChange={(e) => setPropertyManagementType(e.target.value as 'self' | 'partial' | 'full')} className="w-full border rounded p-2">
            <option value="self">Self-managed</option>
            <option value="partial">Partial management</option>
            <option value="full">Full management company</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Jointly with Spouse?</label>
          <select value={isSpouseFilingJointly ? 'yes' : 'no'} onChange={(e) => setIsSpouseFilingJointly(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - filing jointly</option>
            <option value="no">No - filing separately</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.qualifiesAsREPS ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.qualifiesAsREPS ? 'text-green-700' : 'text-red-700'}`}>REPS Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">750-Hour Test:</span><span className={`font-bold ml-2 ${result.meets750HourTest ? 'text-green-700' : 'text-red-700'}`}>{result.meets750HourTest ? 'PASS' : 'FAIL'}</span></div>
          <div><span className="text-zinc-600">RE Hours:</span><span className="font-bold ml-2">{result.combinedREHours}</span></div>
          <div><span className="text-zinc-600">% of Services:</span><span className="font-bold ml-2">{result.rePercentage}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">50% Test:</span><span className={`font-bold ml-2 ${result.meets50PercentTest ? 'text-green-700' : 'text-red-700'}`}>{result.meets50PercentTest ? 'PASS' : 'FAIL'}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.qualifiesAsREPS ? 'text-green-700' : 'text-red-700'}`}>{result.qualifiesAsREPS ? 'QUALIFIED' : 'NOT QUALIFIED'}</span></div>
        </div>
        {!result.meets750HourTest && (
          <div className="text-xs text-orange-600 mt-2">Need {result.hoursShort750} more hours to meet 750-hour test</div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Hours Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Your RE Hours:</span><span className="font-medium ml-2">{result.realEstateHours}</span></div>
          <div><span className="text-zinc-600">Spouse RE Hours:</span><span className="font-medium ml-2">{result.spouseREHours}</span></div>
          <div><span className="text-zinc-600">Combined:</span><span className="font-bold ml-2">{result.combinedREHours}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Personal:</span><span className="font-medium ml-2">{result.totalPersonalServiceHours}</span></div>
          <div><span className="text-zinc-600">RE Percentage:</span><span className="font-bold ml-2">{result.rePercentage}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.spouseNote}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Material Participation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Properties:</span><span className="font-medium ml-2">{result.rentalPropertiesCount}</span></div>
          <div><span className="text-zinc-600">Avg Hours/Property:</span><span className="font-medium ml-2">{result.avgHoursPerProperty}</span></div>
          <div><span className="text-zinc-600">Total Property Hours:</span><span className="font-bold ml-2">{result.totalPropertyHours}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Properties &gt;100 hrs:</span><span className="font-medium ml-2">{result.propertiesWith100Hours}</span></div>
          <div><span className="text-zinc-600">Properties &gt;500 hrs:</span><span className="font-medium ml-2">{result.propertiesWith500Hours}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.managementNote}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Score</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Score:</span><span className="font-bold ml-2">{result.documentationScore}/100</span></div>
          <div><span className="text-zinc-600">Audit Risk:</span><span className={`font-bold ml-2 ${result.auditRisk.includes('High') ? 'text-red-700' : result.auditRisk.includes('Medium') ? 'text-orange-700' : 'text-green-700'}`}>{result.auditRisk}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.documentationNote}</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Passive Activity Impact</h2>
        <div className="grid grid-cols-1 gap-4">
          <div><span className="text-zinc-600">Without REPS:</span><span className="font-medium ml-2">{result.passiveLossLimitWithoutREPS}</span></div>
          <div><span className="text-zinc-600">With REPS:</span><span className="font-bold text-green-700 ml-2">{result.passiveLossBenefitWithREPS}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">REPS Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>&gt;750 hours in real estate activities</li>
          <li>&gt;50% of personal services in RE</li>
          <li>Both tests must be met</li>
          <li>Spouse hours count if filing jointly</li>
          <li>Keep detailed time logs</li>
          <li>Material participation per property</li>
          <li>Self-management preferred</li>
          <li>Can offset active income losses</li>
          <li>Audit risk high - document well</li>
          <li>IRS challenges REPS claims often</li>
        </ul>
      </div>
    </div>
  )
}