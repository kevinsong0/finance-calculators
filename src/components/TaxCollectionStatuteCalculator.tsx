'use client'

import { useState } from 'react'

export default function TaxCollectionStatuteCalculator() {
  const [taxYear, setTaxYear] = useState(2022)
  const [assessmentDate, setAssessmentDate] = useState('2023-04-15')
  const [returnFiledDate, setReturnFiledDate] = useState('2023-04-15')
  const [extensionFiled, setExtensionFiled] = useState(false)
  const [omittedIncome, setOmittedIncome] = useState(0)
  const [fraudulentReturn, setFraudulentReturn] = useState(false)
  const [noReturnFiled, setNoReturnFiled] = useState(false)
  const [assessmentType, setAssessmentType] = useState<'normal' | 'math_error' | 'jeopardy' | 'quick'>('normal')
  const [paymentMade, setPaymentMade] = useState(false)
  const [paymentDate, setPaymentDate] = useState('')

  const calculate = () => {
    // Tax Collection Statute Calculator
    // Calculate CSED (Collection Statute Expiration Date) and ASED (Assessment Statute Expiration Date)

    const filedDate = new Date(returnFiledDate)
    const assessedDate = new Date(assessmentDate)

    // ASED Calculation (Assessment Statute Expiration Date)
    let asedYears = 3
    let asedExtensionReasons: string[] = []

    // Normal filing deadline calculation
    const normalDeadline = extensionFiled ? new Date(taxYear + 1, 9, 15) : new Date(taxYear + 1, 3, 15)

    // ASED date based on filing
    let asedDate: Date
    if (noReturnFiled) {
      asedYears = 999 // No expiration
      asedExtensionReasons.push('No return filed - assessment statute never expires')
      asedDate = new Date('2099-12-31')
    } else {
      // 3 years from filing date or extended deadline
      asedDate = new Date(filedDate)
      asedDate.setFullYear(asedDate.getFullYear() + 3)
    }

    // ASED extensions
    if (omittedIncome > 0 && omittedIncome > 5000) {
      asedYears = 6
      asedDate.setFullYear(filedDate.getFullYear() + 6)
      asedExtensionReasons.push(`Omitted income >25% of reported: 6-year statute (omitted $${omittedIncome.toLocaleString()})`)
    }

    if (fraudulentReturn) {
      asedYears = 999
      asedDate = new Date('2099-12-31')
      asedExtensionReasons.push('Fraudulent return - no assessment statute expiration')
    }

    // CSED Calculation (Collection Statute Expiration Date)
    let csedYears = 10
    let csedDate: Date
    let csedExtensionReasons: string[] = []

    // CSED starts from assessment date
    csedDate = new Date(assessedDate)
    csedDate.setFullYear(csedDate.getFullYear() + 10)

    // CSED extensions
    if (omittedIncome > 0 && omittedIncome > 5000) {
      csedExtensionReasons.push('Substantial understatement extends CSED')
    }

    if (fraudulentReturn) {
      csedYears = 999
      csedDate = new Date('2099-12-31')
      csedExtensionReasons.push('Fraudulent return - collection statute never expires')
    }

    if (noReturnFiled) {
      csedYears = 999
      csedDate = new Date('2099-12-31')
      csedExtensionReasons.push('No return filed - collection statute never expires')
    }

    // Calculate days remaining
    const today = new Date()
    const asedDaysRemaining = Math.max(0, Math.ceil((asedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    const csedDaysRemaining = Math.max(0, Math.ceil((csedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))

    // Status determination
    let asedStatus = ''
    let csedStatus = ''

    if (asedDaysRemaining > 365) {
      asedStatus = 'ACTIVE - IRS can still assess additional tax'
    } else if (asedDaysRemaining > 0) {
      asedStatus = 'EXPIRING SOON - Assessment window closing'
    } else {
      asedStatus = 'EXPIRED - IRS cannot assess additional tax (unless exceptions apply)'
    }

    if (csedDaysRemaining > 365 * 5) {
      csedStatus = 'ACTIVE - IRS collection actions permitted'
    } else if (csedDaysRemaining > 365) {
      csedStatus = 'ACTIVE BUT AGING - Collection window decreasing'
    } else if (csedDaysRemaining > 0) {
      csedStatus = 'EXPIRING SOON - Collection window closing, act urgently'
    } else {
      csedStatus = 'EXPIRED - IRS collection actions must cease'
    }

    // Extension events that extend CSED
    const extensionEvents: { event: string; extendsBy: string; notes: string }[] = []

    extensionEvents.push({
      event: 'Offer in Compromise pending',
      extendsBy: 'Period OIC is pending + 6 months',
      notes: 'File Form 656, suspends collection while IRS reviews',
    })

    extensionEvents.push({
      event: 'Bankruptcy filing',
      extendsBy: 'Period bankruptcy pending + 6 months',
      notes: 'Automatic stay suspends all collection',
    })

    extensionEvents.push({
      event: 'Collection Due Process appeal',
      extendsBy: 'Period appeal pending + 90 days',
      notes: 'Request CDP hearing within 30 days of levy/lien notice',
    })

    extensionEvents.push({
      event: 'Taxpayer abroad 6+ months',
      extendsBy: 'Period abroad + 6 months',
      notes: 'Suspension while taxpayer outside US',
    })

    extensionEvents.push({
      event: 'IRS unable to locate taxpayer',
      extendsBy: 'Period taxpayer absent',
      notes: 'If IRS cannot find taxpayer to collect',
    })

    extensionEvents.push({
      event: 'Installment agreement pending',
      extendsBy: 'Period pending',
      notes: 'IA request suspends collection actions',
    })

    // Key dates summary
    const keyDates: { date: string; event: string; significance: string }[] = []

    keyDates.push({
      date: filedDate.toLocaleDateString(),
      event: 'Return Filed',
      significance: 'Starts 3-year ASED clock (normal case)',
    })

    keyDates.push({
      date: assessedDate.toLocaleDateString(),
      event: 'Tax Assessed',
      significance: 'Starts 10-year CSED clock',
    })

    keyDates.push({
      date: asedDate.toLocaleDateString(),
      event: 'ASED (Assessment Expires)',
      significance: asedDaysRemaining > 0 ? `Expires in ${asedDaysRemaining} days` : 'Already expired',
    })

    keyDates.push({
      date: csedDate.toLocaleDateString(),
      event: 'CSED (Collection Expires)',
      significance: csedDaysRemaining > 0 ? `Expires in ${csedDaysRemaining} days` : 'Already expired',
    })

    // Recommendations
    let recommendation = ''

    if (fraudulentReturn || noReturnFiled) {
      recommendation = `CRITICAL: Statute never expires due to ${fraudulentReturn ? 'fraud' : 'no return filed'}. IRS can assess and collect indefinitely. Consider filing return immediately if not filed. Consult tax attorney for fraud issues.`
    } else if (csedDaysRemaining < 365 && csedDaysRemaining > 0) {
      recommendation = `CSED expires in ${csedDaysRemaining} days. IRS may intensify collection efforts. Consider: Currently Not Collectible status, Offer in Compromise, or payment plan. Urgent action needed.`
    } else if (asedDaysRemaining < 365 && asedDaysRemaining > 0) {
      recommendation = `ASED expires in ${asedDaysRemaining} days. IRS may propose additional assessments soon. Monitor for notices. Respond promptly to any proposed adjustments.`
    } else if (csedDaysRemaining < 365 * 2) {
      recommendation = `Collection statute expires in ~${Math.ceil(csedDaysRemaining / 365)} years. IRS active collection likely. Consider resolution options: OIC, CNC, IA. Professional guidance recommended.`
    } else {
      recommendation = `Normal statute period. ASED: ${asedYears} years, CSED: ${csedYears} years. Monitor for IRS notices. Maintain good records. Respond timely to any correspondence.`
    }

    return {
      taxYear,
      assessmentDate,
      returnFiledDate,
      extensionFiled,
      omittedIncome: omittedIncome.toFixed(0),
      fraudulentReturn,
      noReturnFiled,
      assessmentType,
      paymentMade,
      paymentDate,
      asedYears,
      asedDate: asedDate.toLocaleDateString(),
      asedDaysRemaining,
      asedStatus,
      asedExtensionReasons,
      csedYears,
      csedDate: csedDate.toLocaleDateString(),
      csedDaysRemaining,
      csedStatus,
      csedExtensionReasons,
      extensionEvents,
      keyDates,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Collection Statute Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate ASED and CSED expiration dates for IRS assessment and collection limitations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Return Filed Date</label>
          <input type="date" value={returnFiledDate} onChange={(e) => setReturnFiledDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assessment Date</label>
          <input type="date" value={assessmentDate} onChange={(e) => setAssessmentDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Omitted Income Amount</label>
          <input type="number" value={omittedIncome} onChange={(e) => setOmittedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assessment Type</label>
          <select value={assessmentType} onChange={(e) => setAssessmentType(e.target.value as 'normal' | 'math_error' | 'jeopardy' | 'quick')} className="w-full border rounded p-2">
            <option value="normal">Normal Assessment</option>
            <option value="math_error">Math Error (Immediate)</option>
            <option value="jeopardy">Jeopardy Assessment</option>
            <option value="quick">Quick Assessment</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Special Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={extensionFiled} onChange={(e) => setExtensionFiled(e.target.checked)} className="mr-2" />
              <span className="text-sm">Extension Filed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={fraudulentReturn} onChange={(e) => setFraudulentReturn(e.target.checked)} className="mr-2" />
              <span className="text-sm">Fraudulent Return</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={noReturnFiled} onChange={(e) => setNoReturnFiled(e.target.checked)} className="mr-2" />
              <span className="text-sm">No Return Filed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={paymentMade} onChange={(e) => setPaymentMade(e.target.checked)} className="mr-2" />
              <span className="text-sm">Payment Made</span>
            </label>
          </div>
        </div>
        {paymentMade && (
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Payment Date</label>
            <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.asedDaysRemaining < 365 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">ASED (Assessment Statute)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">ASED Date:</span><span className="font-bold ml-2">{result.asedDate}</span></div>
          <div><span className="text-zinc-600">Years:</span><span className="font-bold ml-2">{result.asedYears}</span></div>
          <div><span className="text-zinc-600">Days Left:</span><span className={`font-bold ml-2 ${result.asedDaysRemaining < 365 ? 'text-orange-700' : ''}`}>{result.asedDaysRemaining}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.asedDaysRemaining < 365 ? 'text-orange-700' : ''}`}>{result.asedStatus}</div>
        {result.asedExtensionReasons.length > 0 && (
          <div className="text-xs text-zinc-600 mt-2">
            {result.asedExtensionReasons.map((r, i) => <div key={i}>• {r}</div>)}
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.csedDaysRemaining < 365 ? 'bg-red-50 border border-red-200' : result.csedDaysRemaining < 365 * 2 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">CSED (Collection Statute)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">CSED Date:</span><span className="font-bold ml-2">{result.csedDate}</span></div>
          <div><span className="text-zinc-600">Years:</span><span className="font-bold ml-2">{result.csedYears}</span></div>
          <div><span className="text-zinc-600">Days Left:</span><span className={`font-bold ml-2 ${result.csedDaysRemaining < 365 ? 'text-red-700' : result.csedDaysRemaining < 365 * 2 ? 'text-orange-700' : ''}`}>{result.csedDaysRemaining}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.csedDaysRemaining < 365 ? 'text-red-700' : result.csedDaysRemaining < 365 * 2 ? 'text-orange-700' : ''}`}>{result.csedStatus}</div>
        {result.csedExtensionReasons.length > 0 && (
          <div className="text-xs text-zinc-600 mt-2">
            {result.csedExtensionReasons.map((r, i) => <div key={i}>• {r}</div>)}
          </div>
        )}
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Key Dates Timeline</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Event</th>
                <th className="py-2 text-left">Significance</th>
              </tr>
            </thead>
            <tbody>
              {result.keyDates.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.date}</td>
                  <td className="py-1">{d.event}</td>
                  <td className="py-1">{d.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">CSED Extension Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Event</th>
                <th className="py-2 text-left">Extends By</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.extensionEvents.map((e, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{e.event}</td>
                  <td className="py-1">{e.extendsBy}</td>
                  <td className="py-1">{e.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.csedDaysRemaining < 365 || result.asedDaysRemaining < 365 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Statute of Limitations Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>ASED: 3 years from filing (normal)</li>
          <li>CSED: 10 years from assessment</li>
          <li>Substantial understatement: 6-year ASED</li>
          <li>Fraud: No statute expiration</li>
          <li>No return filed: No expiration</li>
          <li>OIC/Bankruptcy suspends CSED</li>
          <li>CDP appeal extends CSED</li>
          <li>Taxpayer abroad extends CSED</li>
          <li>Monitor expiration dates carefully</li>
          <li>Act before statutes expire</li>
        </ul>
      </div>
    </div>
  )
}