'use client'

import { useState } from 'react'

export default function MedicarePartBIRMAAIncomeReconsiderationCalculator() {
  const [currentIRMAA, setCurrentIRMAA] = useState(174.70)
  const [modifiedAGI, setModifiedAGI] = useState(97000)
  const [taxYear, setTaxYear] = useState(2022)
  const [lifeChangingEvent, setLifeChangingEvent] = useState<'none' | 'marriage' | 'divorce' | 'death' | 'retirement' | 'job_loss' | 'other'>('none')
  const [eventDate, setEventDate] = useState('')

  const calculate = () => {
    // Medicare Part B IRMAA (Income-Related Monthly Adjustment Amount)
    // 2024 IRMAA tiers based on MAGI from tax return 2 years prior

    // IRMAA tiers 2024 (individual)
    const tiersIndividual = [
      { min: 0, max: 103000, irmaa: 0, bracket: 'Standard' },
      { min: 103001, max: 129000, irmaa: 69.90, bracket: 'Tier 1' },
      { min: 129001, max: 161000, irmaa: 174.70, bracket: 'Tier 2' },
      { min: 161001, max: 193000, irmaa: 279.50, bracket: 'Tier 3' },
      { min: 193001, max: 500000, irmaa: 384.30, bracket: 'Tier 4' },
      { min: 500001, max: Infinity, irmaa: 462.70, bracket: 'Tier 5' },
    ]

    // IRMAA tiers 2024 (married filing jointly)
    const tiersMarried = [
      { min: 0, max: 206000, irmaa: 0, bracket: 'Standard' },
      { min: 206001, max: 258000, irmaa: 69.90, bracket: 'Tier 1' },
      { min: 258001, max: 322000, irmaa: 174.70, bracket: 'Tier 2' },
      { min: 322001, max: 386000, irmaa: 279.50, bracket: 'Tier 3' },
      { min: 386001, max: 750000, irmaa: 384.30, bracket: 'Tier 4' },
      { min: 750001, max: Infinity, irmaa: 462.70, bracket: 'Tier 5' },
    ]

    // Find current tier (simplified for individual)
    const currentTier = tiersIndividual.find(t => modifiedAGI >= t.min && modifiedAGI <= t.max) || tiersIndividual[5]
    const currentIRMAATier = currentTier.bracket
    const standardPremium = 174.70 // 2024 standard Part B premium
    const totalPremium = standardPremium + currentIRMAA

    // Life-changing event reconsideration (SSA-44)
    // Events that qualify for IRMAA reconsideration:
    // - Marriage, divorce, death of spouse
    // - Work stoppage (retirement)
    // - Loss of income-producing property
    // - Reduction/loss of pension
    // - Natural disaster

    const qualifyingEvents = [
      { event: 'marriage', desc: 'Marriage - income may change' },
      { event: 'divorce', desc: 'Divorce - income separation' },
      { event: 'death', desc: 'Death of spouse - income reduction' },
      { event: 'retirement', desc: 'Retirement - work stoppage' },
      { event: 'job_loss', desc: 'Job loss - involuntary' },
      { event: 'other', desc: 'Other qualifying event' },
    ]

    const qualifiesForReconsideration = lifeChangingEvent !== 'none'
    const eventQualifies = qualifyingEvents.find(e => e.event === lifeChangingEvent)

    // Estimated new IRMAA after reconsideration (assuming 25% income reduction)
    const estimatedNewAGI = qualifiesForReconsideration ? modifiedAGI * 0.75 : modifiedAGI
    const newTier = tiersIndividual.find(t => estimatedNewAGI >= t.min && estimatedNewAGI <= t.max) || tiersIndividual[5]
    const estimatedNewIRMAA = newTier.irmaa
    const estimatedNewTotal = standardPremium + estimatedNewIRMAA

    // Annual savings if reconsideration approved
    const annualSavings = qualifiesForReconsideration ? (currentIRMAA - estimatedNewIRMAA) * 12 : 0

    // Request process
    // 1. Complete SSA-44 form
    // 2. Provide evidence of life-changing event
    // 3. Provide income documentation
    // 4. Submit to local Social Security office

    // Processing time estimate
    const processingTimeWeeks = 4 // Typical processing time

    // Appeal rights if denied
    const appealLevels = ['Reconsideration', 'Hearing', 'Review', 'Federal Court']

    return {
      currentIRMAA: currentIRMAA.toFixed(2),
      modifiedAGI: modifiedAGI.toFixed(0),
      taxYear: taxYear.toFixed(0),
      lifeChangingEvent,
      eventDate,
      currentIRMAATier,
      standardPremium: standardPremium.toFixed(2),
      totalPremium: totalPremium.toFixed(2),
      qualifiesForReconsideration,
      eventDescription: eventQualifies?.desc || 'None',
      estimatedNewAGI: estimatedNewAGI.toFixed(0),
      estimatedNewIRMAA: estimatedNewIRMAA.toFixed(2),
      estimatedNewTotal: estimatedNewTotal.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      processingTimeWeeks: processingTimeWeeks.toFixed(0),
      tierBrackets: tiersIndividual.map(t => ({
        bracket: t.bracket,
        min: t.min.toFixed(0),
        max: t.max === Infinity ? 'No limit' : t.max.toFixed(0),
        irmaa: t.irmaa.toFixed(2),
      })),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part B IRMAA Income Reconsideration Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate potential IRMAA reduction through SSA-44 life-changing event appeal.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current IRMAA Amount</label>
          <input type="number" value={currentIRMAA} step="0.01" onChange={(e) => setCurrentIRMAA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modified AGI (Tax Year Income)</label>
          <input type="number" value={modifiedAGI} onChange={(e) => setModifiedAGI(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year Used for IRMAA</label>
          <input type="number" value={taxYear} min="2020" max="2023" onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Life-Changing Event</label>
          <select value={lifeChangingEvent} onChange={(e) => setLifeChangingEvent(e.target.value as 'none' | 'marriage' | 'divorce' | 'death' | 'retirement' | 'job_loss' | 'other')} className="w-full border rounded p-2">
            <option value="none">No Event</option>
            <option value="marriage">Marriage</option>
            <option value="divorce">Divorce</option>
            <option value="death">Death of Spouse</option>
            <option value="retirement">Retirement/Work Stoppage</option>
            <option value="job_loss">Job Loss (Involuntary)</option>
            <option value="other">Other Qualifying Event</option>
          </select>
        </div>
        {result.qualifiesForReconsideration && (
          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Current IRMAA Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">MAGI:</span><span className="font-medium ml-2">$ {result.modifiedAGI}</span></div>
          <div><span className="text-zinc-600">Tax Year:</span><span className="font-medium ml-2">{result.taxYear}</span></div>
          <div><span className="text-zinc-600">IRMAA Tier:</span><span className="font-bold text-purple-700 ml-2">{result.currentIRMAATier}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Standard Premium:</span><span className="font-medium ml-2">$ {result.standardPremium}</span></div>
          <div><span className="text-zinc-600">Total Premium:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalPremium}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRMAA based on MAGI from tax return 2 years prior (2024 uses 2022 return).</div>
      </div>

      <div className={`card mb-6 ${result.qualifiesForReconsideration ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.qualifiesForReconsideration ? 'text-green-700' : 'text-orange-700'}`}>Reconsideration Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Qualifying Event:</span><span className={`font-bold ml-2 ${result.qualifiesForReconsideration ? 'text-green-700' : 'text-orange-700'}`}>{result.qualifiesForReconsideration ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Event Type:</span><span className="font-medium ml-2">{result.eventDescription}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Life-changing events can qualify for IRMAA reduction through SSA-44 appeal.</div>
      </div>

      {result.qualifiesForReconsideration && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Estimated New IRMAA After Reconsideration</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Est. New MAGI:</span><span className="font-medium ml-2">$ {result.estimatedNewAGI}</span></div>
            <div><span className="text-zinc-600">Est. New IRMAA:</span><span className="font-bold text-blue-700 ml-2">$ {result.estimatedNewIRMAA}</span></div>
            <div><span className="text-zinc-600">Est. Total:</span><span className="font-bold text-blue-700 ml-2">$ {result.estimatedNewTotal}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Annual Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.annualSavings}</span></div>
            <div><span className="text-zinc-600">Processing Time:</span><span className="font-medium ml-2">{result.processingTimeWeeks} weeks</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Estimate assumes 25% income reduction. Actual savings depend on documentation.</div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 IRMAA Tiers (Individual)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Tier</th>
                <th className="py-2 text-left">MAGI Range</th>
                <th className="py-2 text-left">IRMAA</th>
              </tr>
            </thead>
            <tbody>
              {result.tierBrackets.map((t, i) => (
                <tr key={i} className="border-b">
                  <td className="py-1">{t.bracket}</td>
                  <td className="py-1">$ {t.min} - {t.max}</td>
                  <td className="py-1">$ {t.irmaa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Standard Part B premium: $174.70 (2024). IRMAA added to standard premium.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">SSA-44 Application Process</h2>
        <div className="text-sm text-zinc-600 space-y-2">
          <div>1. Complete SSA-44 form (Medicare Income-Related Premium Adjustment Request)</div>
          <div>2. Provide evidence of life-changing event (marriage cert, divorce decree, death cert)</div>
          <div>3. Provide income documentation (tax return, pay stubs, pension statement)</div>
          <div>4. Submit to local Social Security office or call 1-800-772-1213</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">File SSA-44 as soon as possible after life-changing event.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">IRMAA Reconsideration Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IRMAA based on tax return from 2 years prior</li>
          <li>Qualifying events: marriage, divorce, death, retirement</li>
          <li>SSA-44 form required for reconsideration</li>
          <li>Provide documentation for event and income</li>
          <li>Processing typically takes 4-6 weeks</li>
          <li>Can appeal if reconsideration denied</li>
          <li>File promptly after qualifying event</li>
          <li>IRMAA tiers reset annually based on new tax data</li>
          <li>Part D IRMAA follows same process</li>
          <li>Contact SSA at 1-800-772-1213</li>
        </ul>
      </div>
    </div>
  )
}