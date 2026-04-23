'use client'

import { useState } from 'react'

export default function IRSCollectionAppealCalculator() {
  const [collectionAction, setCollectionAction] = useState<'levy' | 'lien' | 'seizure' | 'notice'>('levy')
  const [debtAmount, setDebtAmount] = useState(25000)
  const [daysSinceNotice, setDaysSinceNotice] = useState(15)
  const [hasCollectionDueProcess, setHasCollectionDueProcess] = useState(true)
  const [financialHardship, setFinancialHardship] = useState(false)
  const [priorAppeals, setPriorAppeals] = useState(0)
  const [disputeValidity, setDisputeValidity] = useState(false)

  const calculate = () => {
    // IRS Collection Appeal Rights
    // Collection Due Process (CDP) hearing: 30 days from notice
    // Equivalent hearing: after 30-day deadline
    // Collection Appeals Program (CAP): faster process

    // Appeal options based on action type
    // Levy: CDP hearing required before levy
    // Lien: CDP hearing for lien filing or NFTL
    // Seizure: CAP appeal available
    // Notice: challenge correctness

    // Deadlines
    const cdpDeadline = 30 // days from notice
    const cdpRemaining = cdpDeadline - daysSinceNotice

    // Appeal eligibility
    const cdpEligible = cdpRemaining > 0 && hasCollectionDueProcess
    const equivalentEligible = !cdpEligible && daysSinceNotice < 365
    const capEligible = true // CAP always available but limited scope

    // Appeal type determination
    let appealType = ''
    let appealDeadline = ''
    let appealScope = ''

    if (cdpEligible) {
      appealType = 'Collection Due Process (CDP)'
      appealDeadline = `${cdpRemaining} days remaining`
      appealScope = 'Full scope: liability, collection alternatives, lien/levy appropriateness'
    } else if (equivalentEligible) {
      appealType = 'Equivalent Hearing'
      appealDeadline = 'File ASAP (late CDP)'
      appealScope = 'Limited: no court review, but IRS will consider'
    } else {
      appealType = 'Collection Appeals Program (CAP)'
      appealDeadline = 'Anytime before collection'
      appealScope = 'Limited: collection method only, not liability'
    }

    // Collection alternatives available
    const alternatives: string[] = []
    if (debtAmount <= 50000) alternatives.push('Streamlined Installment Agreement')
    if (debtAmount <= 10000) alternatives.push('Guaranteed Installment Agreement')
    if (financialHardship) alternatives.push('Currently Not Collectible (CNC)')
    if (disputeValidity) alternatives.push('Offer in Compromise (Doubt as to Liability)')
    alternatives.push('Offer in Compromise (Doubt as to Collectibility)')

    // Appeal success factors
    let successFactors = ''
    const factors: string[] = []
    if (financialHardship) factors.push('Financial hardship documented')
    if (debtAmount < 25000) factors.push('Lower debt amount')
    if (priorAppeals === 0) factors.push('First appeal')
    if (disputeValidity) factors.push('Valid dispute on liability')
    successFactors = factors.length > 0 ? factors.join(', ') : 'Standard case'

    // Recommendation based on situation
    let recommendation = ''
    if (cdpRemaining <= 5 && cdpRemaining > 0) {
      recommendation = 'URGENT: File CDP appeal immediately - deadline approaching'
    } else if (cdpEligible) {
      recommendation = 'File CDP hearing request within 30-day window for full rights'
    } else if (equivalentEligible) {
      recommendation = 'File equivalent hearing - limited but still available'
    } else if (financialHardship) {
      recommendation = 'Request Currently Not Collectible status via CAP'
    } else if (disputeValidity) {
      recommendation = 'Challenge liability through CDP or Tax Court'
    } else {
      recommendation = 'Negotiate payment plan or offer in compromise'
    }

    // Forms required
    const formCDP = 'Form 12153 - Request for Collection Due Process Hearing'
    const formCAP = 'Form 9423 - Collection Appeals Request'

    // Court options after CDP
    const courtOptions = cdpEligible ? 'Tax Court, Federal District Court, or Claims Court' : 'None (CAP has no court review)'

    return {
      collectionAction,
      debtAmount: debtAmount.toFixed(0),
      daysSinceNotice: daysSinceNotice.toFixed(0),
      hasCollectionDueProcess,
      financialHardship,
      priorAppeals: priorAppeals.toFixed(0),
      disputeValidity,
      cdpDeadline: cdpDeadline.toFixed(0),
      cdpRemaining: cdpRemaining.toFixed(0),
      cdpEligible,
      equivalentEligible,
      capEligible,
      appealType,
      appealDeadline,
      appealScope,
      alternatives,
      successFactors,
      recommendation,
      formCDP,
      formCAP,
      courtOptions,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Collection Appeal Calculator</h1>
      <p className="text-gray-600 mb-4">Determine your appeal rights for IRS collection actions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Collection Action</label>
          <select value={collectionAction} onChange={(e) => setCollectionAction(e.target.value as 'levy' | 'lien' | 'seizure' | 'notice')} className="w-full border rounded p-2">
            <option value="levy">Levy (bank/wage seizure)</option>
            <option value="lien">Federal Tax Lien</option>
            <option value="seizure">Property Seizure</option>
            <option value="notice">Collection Notice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Debt Amount</label>
          <input type="number" value={debtAmount} onChange={(e) => setDebtAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Days Since Notice</label>
          <input type="number" value={daysSinceNotice} min="0" max="365" onChange={(e) => setDaysSinceNotice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Received CDP Notice?</label>
          <select value={hasCollectionDueProcess ? 'yes' : 'no'} onChange={(e) => setHasCollectionDueProcess(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - received notice of right to hearing</option>
            <option value="no">No - no CDP notice received</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Financial Hardship?</label>
          <select value={financialHardship ? 'yes' : 'no'} onChange={(e) => setFinancialHardship(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - can pay over time</option>
            <option value="yes">Yes - unable to pay basic living expenses</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dispute Tax Validity?</label>
          <select value={disputeValidity ? 'yes' : 'no'} onChange={(e) => setDisputeValidity(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - acknowledge debt</option>
            <option value="yes">Yes - dispute amount or validity</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.cdpEligible ? 'bg-green-50 border border-green-200' : result.equivalentEligible ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.cdpEligible ? 'text-green-700' : result.equivalentEligible ? 'text-orange-700' : 'text-blue-700'}`}>Appeal Type Available</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Type:</span><span className="font-bold ml-2">{result.appealType}</span></div>
          <div><span className="text-zinc-600">Deadline:</span><span className={`font-bold ml-2 ${Number(result.cdpRemaining) <= 5 ? 'text-red-700' : ''}`}>{result.appealDeadline}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2"><span className="text-zinc-600">Scope:</span> {result.appealScope}</div>
        <div className="text-xs text-zinc-600 mt-2">CDP: full rights, court review. Equivalent: limited. CAP: collection method only.</div>
      </div>

      {result.cdpEligible && Number(result.cdpRemaining) <= 10 && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Urgent Deadline</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Days Left:</span><span className="font-bold text-red-700 ml-2">{result.cdpRemaining}</span></div>
            <div><span className="text-zinc-600">CDP Deadline:</span><span className="font-bold ml-2">30 days from notice</span></div>
          </div>
          <div className="text-xs text-red-600 mt-2">MISSING DEADLINE = lose CDP rights, only CAP available (no court review)</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Collection Alternatives</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.alternatives.map((alt, i) => (
            <li key={i}>{alt}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Request alternatives during CDP hearing. IRS must consider if you qualify.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Forms Required</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-blue-700 mb-1">CDP Hearing</div>
            <div className="text-sm">{result.formCDP}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 mb-1">CAP Appeal</div>
            <div className="text-sm">{result.formCAP}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">File by mail or fax to IRS address on notice. Include documentation.</div>
      </div>

      <div className={`card mb-6 ${result.successFactors.includes('hardship') || result.successFactors.includes('Valid dispute') ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Success Factors</h2>
        <div className="text-sm text-zinc-600">{result.successFactors || 'Standard case - document your situation'}</div>
        <div className="text-xs text-zinc-600 mt-2">Financial hardship, valid dispute, and first appeal improve success rate.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600 font-medium">{result.recommendation}</div>
        {result.cdpEligible && (
          <div className="text-xs text-zinc-600 mt-2">After CDP denial, you can appeal to {result.courtOptions}.</div>
        )}
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Collection Appeal Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>CDP: 30 days from notice</li>
          <li>CDP: full rights + court review</li>
          <li>Equivalent: late CDP, limited</li>
          <li>CAP: anytime, no court review</li>
          <li>Request alternatives at hearing</li>
          <li>Financial hardship = CNC status</li>
          <li>Dispute liability at CDP</li>
          <li>File Form 12153 for CDP</li>
          <li>Keep documentation ready</li>
          <li>Missing deadline = lose rights</li>
        </ul>
      </div>
    </div>
  )
}