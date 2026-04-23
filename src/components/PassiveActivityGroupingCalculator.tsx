'use client'

import { useState } from 'react'

export default function PassiveActivityGroupingCalculator() {
  const [activities, setActivities] = useState<{ name: string; type: 'rental' | 'business' | 'investment'; income: number; hours: number }[]>([
    { name: 'Rental Property A', type: 'rental', income: 15000, hours: 150 },
    { name: 'Rental Property B', type: 'rental', income: -5000, hours: 80 },
    { name: 'Side Business', type: 'business', income: 30000, hours: 600 },
    { name: 'LP Investment', type: 'investment', income: 8000, hours: 0 },
  ])
  const [totalHours, setTotalHours] = useState(830)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'>('marriedJoint')
  const [otherIncome, setOtherIncome] = useState(100000)
  const [isREPS, setIsREPS] = useState(false)

  const calculate = () => {
    // Passive Activity Grouping Calculator
    // Group passive activities to maximize loss utilization
    // Grouping election allows treating multiple activities as one

    // Rules:
    // 1. Passive activities: rental, businesses without material participation
    // 2. Grouping election treats multiple as single activity
    // 3. Grouped activities share income/loss, hours count together
    // 4. Cannot group rental with non-rental (except REPS)
    // 5. REPS can group rental with non-rental passive

    // Calculate totals by type
    const rentalActivities = activities.filter(a => a.type === 'rental')
    const businessActivities = activities.filter(a => a.type === 'business')
    const investmentActivities = activities.filter(a => a.type === 'investment')

    const rentalIncome = rentalActivities.reduce((sum, a) => sum + a.income, 0)
    const rentalHours = rentalActivities.reduce((sum, a) => sum + a.hours, 0)
    const businessIncome = businessActivities.reduce((sum, a) => sum + a.income, 0)
    const businessHours = businessActivities.reduce((sum, a) => sum + a.hours, 0)
    const investmentIncome = investmentActivities.reduce((sum, a) => sum + a.income, 0)

    // Check material participation (500+ hours for each activity)
    const materiallyParticipate = businessActivities.filter(a => a.hours >= 500)

    // Total passive income/loss
    const totalPassiveIncome = rentalIncome + investmentIncome
    const passiveBusinessIncome = businessActivities.filter(a => a.hours < 500).reduce((sum, a) => sum + a.income, 0)
    const nonPassiveBusinessIncome = materiallyParticipate.reduce((sum, a) => sum + a.income, 0)

    // Grouping scenarios
    // Scenario 1: No grouping - each activity separate
    const noGroupingLosses = rentalActivities.filter(a => a.income < 0).reduce((sum, a) => sum + Math.abs(a.income), 0)
    const noGroupingUsable = Math.min(totalPassiveIncome + passiveBusinessIncome, 0) // Losses offset income

    // Scenario 2: Group all rentals together
    const groupedRentalIncome = rentalIncome
    const groupedRentalHours = rentalHours
    const groupedRentalLossUsable = groupedRentalIncome >= 0 ? 0 : Math.min(Math.abs(groupedRentalIncome), investmentIncome)

    // Scenario 3: REPS grouping (rental + business together)
    const repsGroupedIncome = rentalIncome + businessIncome + investmentIncome
    const repsGroupedHours = totalHours
    const repsMaterialParticipation = repsGroupedHours >= 750 && repsGroupedHours > otherIncome * 0.5
    const repsAllNonPassive = isREPS && repsMaterialParticipation

    // Suspended losses (cannot use this year)
    const totalLosses = activities.filter(a => a.income < 0).reduce((sum, a) => sum + Math.abs(a.income), 0)
    const usableLosses = Math.max(0, Math.min(totalLosses, totalPassiveIncome + passiveBusinessIncome))
    const suspendedLosses = totalLosses - usableLosses

    // Grouping recommendation
    let recommendation = ''
    if (isREPS && totalHours >= 750) {
      recommendation = `REPS status with ${totalHours} hours. All passive income treated as non-passive. Group rental and business activities for maximum flexibility.`
    } else if (rentalActivities.length > 1 && rentalIncome >= 0) {
      recommendation = `Multiple rental activities with net income. Grouping not beneficial this year - losses already offset by rental income.`
    } else if (rentalActivities.length > 1 && rentalIncome < 0) {
      recommendation = `Net rental loss with multiple properties. Consider grouping rentals to offset with other passive income. File Form 8582.`
    } else if (businessHours >= 500 && businessActivities.length === 1) {
      recommendation = `Material participation in business (>500 hours). Income non-passive. Cannot offset passive losses with this income.`
    } else {
      recommendation = `Evaluate grouping options based on income mix. Grouping election irrevocable - choose carefully. File with tax return.`
    }

    if (suspendedLosses > 0) {
      recommendation += ` Suspended losses: $${suspendedLosses.toFixed(0)} - carry forward indefinitely.`
    }

    // Grouping rules summary
    const groupingRules = [
      'File grouping election with return',
      'Irrevocable once made',
      'Can group similar activities',
      'Rental with rental allowed',
      'Business with business allowed',
      'Rental with business NOT allowed (unless REPS)',
      'Hours count together for grouped activities',
      'Grouping affects material participation test',
      'REPS can group rental with business',
      'Form 8582 for passive activity losses',
    ]

    return {
      activities,
      rentalActivities: rentalActivities.length,
      businessActivities: businessActivities.length,
      investmentActivities: investmentActivities.length,
      rentalIncome: rentalIncome.toFixed(0),
      rentalHours: rentalHours.toFixed(0),
      businessIncome: businessIncome.toFixed(0),
      businessHours: businessHours.toFixed(0),
      investmentIncome: investmentIncome.toFixed(0),
      totalHours: totalHours.toFixed(0),
      materiallyParticipating: materiallyParticipate.length,
      nonPassiveBusinessIncome: nonPassiveBusinessIncome.toFixed(0),
      passiveBusinessIncome: passiveBusinessIncome.toFixed(0),
      totalPassiveIncome: (totalPassiveIncome + passiveBusinessIncome).toFixed(0),
      totalLosses: totalLosses.toFixed(0),
      usableLosses: usableLosses.toFixed(0),
      suspendedLosses: suspendedLosses.toFixed(0),
      groupedRentalIncome: groupedRentalIncome.toFixed(0),
      groupedRentalHours: groupedRentalHours.toFixed(0),
      repsGroupedIncome: repsGroupedIncome.toFixed(0),
      repsMaterialParticipation,
      repsAllNonPassive,
      isREPS,
      filingStatus,
      otherIncome: otherIncome.toFixed(0),
      recommendation,
      groupingRules,
    }
  }

  const result = calculate()

  const addActivity = () => {
    setActivities([...activities, { name: `Activity ${activities.length + 1}`, type: 'rental', income: 0, hours: 0 }])
  }

  const removeActivity = (index: number) => {
    const newActivities = activities.filter((_, i) => i !== index)
    setActivities(newActivities)
  }

  const updateActivity = (index: number, field: string, value: string | number) => {
    const newActivities = [...activities]
    if (field === 'type') {
      newActivities[index].type = value as 'rental' | 'business' | 'investment'
    } else if (field === 'income' || field === 'hours') {
      newActivities[index][field] = Number(value)
    }
    setActivities(newActivities)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Passive Activity Grouping Calculator</h1>
      <p className="text-gray-600 mb-4">Evaluate grouping passive activities to maximize loss utilization.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">REPS Status?</label>
          <select value={isREPS ? 'yes' : 'no'} onChange={(e) => setIsREPS(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - Real Estate Professional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Active Income</label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Activities ({activities.length})</h2>
        {activities.map((activity, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
            <input type="text" value={activity.name} onChange={(e) => {
              const newActivities = [...activities]
              newActivities[index].name = e.target.value
              setActivities(newActivities)
            }} className="border rounded p-1 text-xs" />
            <select value={activity.type} onChange={(e) => updateActivity(index, 'type', e.target.value)} className="border rounded p-1 text-xs">
              <option value="rental">Rental</option>
              <option value="business">Business</option>
              <option value="investment">Investment</option>
            </select>
            <input type="number" value={activity.income} onChange={(e) => updateActivity(index, 'income', e.target.value)} className="border rounded p-1 text-xs" />
            <div className="flex gap-1">
              <input type="number" value={activity.hours} onChange={(e) => updateActivity(index, 'hours', e.target.value)} className="border rounded p-1 text-xs w-20" placeholder="hrs" />
              <button onClick={() => removeActivity(index)} className="text-red-500 text-xs">×</button>
            </div>
          </div>
        ))}
        <button onClick={addActivity} className="text-sm text-blue-600 mt-2">+ Add Activity</button>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Activity Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Rental:</span><span className="font-medium ml-2">{result.rentalActivities}</span></div>
          <div><span className="text-zinc-600">Business:</span><span className="font-medium ml-2">{result.businessActivities}</span></div>
          <div><span className="text-zinc-600">Investment:</span><span className="font-medium ml-2">{result.investmentActivities}</span></div>
          <div><span className="text-zinc-600">Total Hours:</span><span className="font-bold ml-2">{result.totalHours}</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <div><span className="text-zinc-600">Rental Income:</span><span className={`font-bold ml-2 ${Number(result.rentalIncome) >= 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.rentalIncome}</span></div>
          <div><span className="text-zinc-600">Business Income:</span><span className={`font-bold ml-2 ${Number(result.businessIncome) >= 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.businessIncome}</span></div>
          <div><span className="text-zinc-600">Investment:</span><span className="font-medium ml-2">$ {result.investmentIncome}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.isREPS && result.repsMaterialParticipation ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">REPS Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">REPS:</span><span className="font-bold ml-2">{result.isREPS ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">750+ Hours:</span><span className={`font-bold ml-2 ${Number(result.totalHours) >= 750 ? 'text-green-700' : 'text-red-700'}`}>{Number(result.totalHours) >= 750 ? 'Yes' : 'No'}</span></div>
        </div>
        {result.isREPS && (
          <div className="text-xs text-zinc-600 mt-2">REPS allows grouping rental with business activities for non-passive treatment.</div>
        )}
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-red-700">Passive Loss Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Losses:</span><span className="font-bold text-red-700 ml-2">$ {result.totalLosses}</span></div>
          <div><span className="text-zinc-600">Usable:</span><span className="font-medium ml-2">$ {result.usableLosses}</span></div>
          <div><span className="text-zinc-600">Suspended:</span><span className="font-bold text-orange-700 ml-2">$ {result.suspendedLosses}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Material Participation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Activities &gt;500 hrs:</span><span className="font-bold ml-2">{result.materiallyParticipating}</span></div>
          <div><span className="text-zinc-600">Non-Passive Income:</span><span className="font-bold text-green-700 ml-2">$ {result.nonPassiveBusinessIncome}</span></div>
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Grouping Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.groupingRules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}