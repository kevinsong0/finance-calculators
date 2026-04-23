'use client'

import { useState } from 'react'

export default function MedicareIRMAASurchargeAppealCalculator() {
  const [incomeYear, setIncomeYear] = useState(2022)
  const [ MAGI, setMAGI] = useState(120000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [partBPremium, setPartBPremium] = useState(174.70)
  const [partDPremium, setPartDPremium] = useState(32)
  const [hasLifeEvent, setHasLifeEvent] = useState(false)
  const [eventType, setEventType] = useState<'marriage' | 'divorce' | 'death' | 'retirement' | 'job_loss' | 'other'>('retirement')

  const calculate = () => {
    // 2024 IRMAA thresholds (based on income from 2 years prior)
    const thresholds = {
      single: [
        { min: 0, max: 103000, tier: 0, partB: 174.70, partD: 0 },
        { min: 103000, max: 129000, tier: 1, partB: 244.60, partD: 12.90 },
        { min: 129000, max: 161000, tier: 2, partB: 349.40, partD: 32.50 },
        { min: 161000, max: 193000, tier: 3, partB: 459.00, partD: 51.70 },
        { min: 193000, max: Infinity, tier: 4, partB: 569.00, partD: 70.90 },
      ],
      married: [
        { min: 0, max: 206000, tier: 0, partB: 174.70, partD: 0 },
        { min: 206000, max: 258000, tier: 1, partB: 244.60, partD: 12.90 },
        { min: 258000, max: 322000, tier: 2, partB: 349.40, partD: 32.50 },
        { min: 322000, max: 386000, tier: 3, partB: 459.00, partD: 51.70 },
        { min: 386000, max: Infinity, tier: 4, partB: 569.00, partD: 70.90 },
      ],
    }

    // Find IRMAA tier
    const tiers = thresholds[filingStatus]
    const tier = tiers.find(t => MAGI >= t.min && MAGI < t.max) || tiers[tiers.length - 1]

    // Calculate surcharges
    const partBSurcharge = tier.partB - 174.70
    const partDSurcharge = tier.partD

    // Annual costs
    const annualPartBSurcharge = partBSurcharge * 12
    const annualPartDSurcharge = partDSurcharge * 12
    const totalAnnualSurcharge = annualPartBSurcharge + annualPartDSurcharge

    // Standard premiums (no IRMAA)
    const standardAnnualPartB = 174.70 * 12
    const standardAnnualPartD = 32 * 12

    // Appeal eligibility
    // Life-changing events that qualify for appeal
    const qualifyingEvents = [
      'marriage',
      'divorce',
      'death of spouse',
      'retirement (stop working)',
      'job loss (employer破产)',
      'reduced work hours',
      'loss of income-producing property',
      'other (must document)',
    ]

    const appealEligible = hasLifeEvent && tier.tier > 0

    // Appeal process
    const appealForm = 'SSA-44'
    const appealDeadline = 'No strict deadline, but file as soon as possible'
    const appealDocumentation = [
      'Proof of life-changing event',
      'Documentation of income reduction',
      'Medicare card',
      'SSA benefit statement',
    ]

    // Estimated new income after event
    const estimatedNewIncome = eventType === 'retirement' || eventType === 'job_loss' ? Math.floor(MAGI * 0.4) : MAGI

    // New tier estimate after appeal
    const newTier = tiers.find(t => estimatedNewIncome >= t.min && estimatedNewIncome < t.max) || tiers[tiers.length - 1]
    const newPartBSurcharge = newTier.partB - 174.70
    const newPartDSurcharge = newTier.partD

    // Potential savings from successful appeal
    const savingsIfApproved = (partBSurcharge - newPartBSurcharge) * 12 + (partDSurcharge - newPartDSurcharge) * 12

    return {
      incomeYear: incomeYear.toFixed(0),
      MAGI: MAGI.toFixed(0),
      filingStatus,
      partBPremium: partBPremium.toFixed(2),
      partDPremium: partDPremium.toFixed(2),
      hasLifeEvent,
      eventType,
      tier: tier.tier.toFixed(0),
      partBSurcharge: partBSurcharge.toFixed(2),
      partDSurcharge: partDSurcharge.toFixed(2),
      annualPartBSurcharge: annualPartBSurcharge.toFixed(0),
      annualPartDSurcharge: annualPartDSurcharge.toFixed(0),
      totalAnnualSurcharge: totalAnnualSurcharge.toFixed(0),
      standardAnnualPartB: standardAnnualPartB.toFixed(0),
      standardAnnualPartD: standardAnnualPartD.toFixed(0),
      appealEligible,
      appealForm,
      appealDeadline,
      estimatedNewIncome: estimatedNewIncome.toFixed(0),
      newTier: newTier.tier.toFixed(0),
      newPartBSurcharge: newPartBSurcharge.toFixed(2),
      newPartDSurcharge: newPartDSurcharge.toFixed(2),
      savingsIfApproved: savingsIfApproved.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare IRMAA Surcharge Appeal Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRMAA surcharge and determine appeal eligibility.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Income Year (2 years prior)</label>
          <input type="number" value={incomeYear} min="2020" max="2024" onChange={(e) => setIncomeYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">MAGI (Modified Adjusted Gross Income)</label>
          <input type="number" value={MAGI} onChange={(e) => setMAGI(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single/Head of Household</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Had Life-Changing Event?</label>
          <select value={hasLifeEvent ? 'yes' : 'no'} onChange={(e) => setHasLifeEvent(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - income decreased</option>
          </select>
        </div>
        {hasLifeEvent && (
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select value={eventType} onChange={(e) => setEventType(e.target.value as 'marriage' | 'divorce' | 'death' | 'retirement' | 'job_loss' | 'other')} className="w-full border rounded p-2">
              <option value="retirement">Retirement (stopped working)</option>
              <option value="job_loss">Job loss</option>
              <option value="divorce">Divorce</option>
              <option value="death">Death of spouse</option>
              <option value="marriage">Marriage</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRMAA Tier Determination</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Income Year:</span><span className="font-medium ml-2">{result.incomeYear}</span></div>
          <div><span className="text-zinc-600">MAGI:</span><span className="font-medium ml-2">$ {result.MAGI}</span></div>
          <div><span className="text-zinc-600">Filing Status:</span><span className="font-medium ml-2">{result.filingStatus}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">IRMAA Tier:</span><span className="font-bold text-blue-700 ml-2">{result.tier}</span></div>
          <div><span className="text-zinc-600">Threshold ({filingStatus}):</span><span className="font-medium ml-2">{filingStatus === 'single' ? '$103K-$193K' : '$206K-$386K'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRMAA based on MAGI from 2 years prior (tax return data).</div>
      </div>

      <div className={`card mb-6 ${Number(result.tier) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.tier) > 0 ? 'text-orange-700' : 'text-green-700'}`}>IRMAA Surcharge Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Part B Surcharge:</span><span className={`font-bold ml-2 ${Number(result.tier) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.partBSurcharge}/mo</span></div>
          <div><span className="text-zinc-600">Part D Surcharge:</span><span className={`font-bold ml-2 ${Number(result.tier) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.partDSurcharge}/mo</span></div>
          <div><span className="text-zinc-600">Total Annual:</span><span className={`font-bold ml-2 ${Number(result.tier) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.totalAnnualSurcharge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRMAA added to standard Part B ($174.70) and Part D premiums.</div>
      </div>

      <div className={`card mb-6 ${result.appealEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.appealEligible ? 'text-green-700' : 'text-red-700'}`}>Appeal Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Can Appeal:</span><span className={`font-bold ml-2 ${result.appealEligible ? 'text-green-700' : 'text-red-700'}`}>{result.appealEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Form Required:</span><span className="font-medium ml-2">{result.appealForm}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Appeal available if life-changing event caused significant income reduction.</div>
      </div>

      {result.appealEligible && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Appeal Outcome Estimate</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Est. New Income:</span><span className="font-medium ml-2">$ {result.estimatedNewIncome}</span></div>
            <div><span className="text-zinc-600">New Tier:</span><span className="font-medium ml-2">{result.newTier}</span></div>
            <div><span className="text-zinc-600">New Part B Surcharge:</span><span className="font-medium ml-2">$ {result.newPartBSurcharge}/mo</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">New Part D Surcharge:</span><span className="font-medium ml-2">$ {result.newPartDSurcharge}/mo</span></div>
            <div><span className="text-zinc-600">Annual Savings:</span><span className="font-bold text-purple-700 ml-2">$ {result.savingsIfApproved}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Savings estimate if appeal approved. SSA uses current income to recalculate.</div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appeal Process</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Form:</span><span className="font-medium ml-2">SSA-44</span></div>
          <div><span className="text-zinc-600">Deadline:</span><span className="font-medium ml-2">{result.appealDeadline}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Submit SSA-44 with proof of life-changing event and income documentation.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">IRMAA Appeal Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IRMAA based on MAGI from 2 years prior</li>
          <li>Qualifying events: retirement, job loss, divorce, death</li>
          <li>File SSA-44 to request new initial determination</li>
          <li>Provide proof: letter from employer, tax return, death certificate</li>
          <li>SSA may adjust to current year income</li>
          <li>Appeal can reduce or eliminate IRMAA</li>
          <li>File as soon as event occurs</li>
          <li>No strict deadline but faster is better</li>
          <li>Keep SSA informed of income changes</li>
          <li>IRMAA applies to Part B and Part D</li>
        </ul>
      </div>
    </div>
  )
}