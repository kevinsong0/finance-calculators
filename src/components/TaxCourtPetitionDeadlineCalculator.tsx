'use client'

import { useState } from 'react'

export default function TaxCourtPetitionDeadlineCalculator() {
  const [noticeType, setNoticeType] = useState<'statutory' | 'deficiency' | 'cdp' | 'nftl'>('deficiency')
  const [noticeDate, setNoticeDate] = useState('2024-01-15')
  const [currentDate, setCurrentDate] = useState('2024-02-20')
  const [petitionType, setPetitionType] = useState<'regular' | 'small'>('regular')
  const [disputedAmount, setDisputedAmount] = useState(15000)

  const calculate = () => {
    // Tax Court Petition Deadline Calculator
    // Different notices have different deadlines

    // Notice of Deficiency (90-day letter): 90 days to petition
    // Final Partner Item Adjustment (FPAA): 90 days
    // CDP Notice: 30 days (but can do equivalent hearing)
    // Notice of Federal Tax Lien (NFTL): 30 days for CDP

    // Small Tax Case: under $50k, simplified process
    // Regular Tax Case: formal proceedings, more options

    // Calculate days
    const notice = new Date(noticeDate)
    const current = new Date(currentDate)
    const daysSinceNotice = Math.floor((current.getTime() - notice.getTime()) / (1000 * 60 * 60 * 24))

    // Deadline calculation
    let deadlineDays = 0
    let deadlineType = ''
    let courtType = ''
    let jurisdictionType = ''

    if (noticeType === 'deficiency') {
      deadlineDays = 90
      deadlineType = '90-day letter'
      courtType = 'Tax Court'
      jurisdictionType = 'pre-payment (no pay required)'
    } else if (noticeType === 'statutory') {
      deadlineDays = 90
      deadlineType = 'Statutory Notice of Deficiency'
      courtType = 'Tax Court'
      jurisdictionType = 'pre-payment'
    } else if (noticeType === 'cdp') {
      deadlineDays = 30
      deadlineType = 'CDP Notice'
      courtType = 'Tax Court (after CDP denial)'
      jurisdictionType = 'collection review'
    } else if (noticeType === 'nftl') {
      deadlineDays = 30
      deadlineType = 'Notice of Federal Tax Lien'
      courtType = 'Tax Court (CDP hearing first)'
      jurisdictionType = 'lien review'
    }

    // Remaining days
    const daysRemaining = deadlineDays - daysSinceNotice
    const isExpired = daysRemaining <= 0
    const isUrgent = daysRemaining > 0 && daysRemaining <= 10

    // Deadline date
    const deadlineDate = new Date(notice)
    deadlineDate.setDate(deadlineDate.getDate() + deadlineDays)
    const deadlineDateStr = deadlineDate.toISOString().split('T')[0]

    // Small case eligibility
    const smallCaseLimit = 50000
    const smallCaseEligible = disputedAmount <= smallCaseLimit && petitionType === 'small'

    // Petition options
    const petitionOptions: string[] = []
    if (!isExpired) {
      petitionOptions.push('File Tax Court petition')
      if (smallCaseEligible) {
        petitionOptions.push('Request Small Tax Case (simplified)')
      }
      petitionOptions.push('Pay and sue for refund in District Court')
      petitionOptions.push('Pay and sue for refund in Claims Court')
    } else {
      petitionOptions.push('Tax Court petition deadline expired')
      petitionOptions.push('Pay tax and file refund claim')
      petitionOptions.push('Request equivalent hearing (CDP only)')
    }

    // Court comparison
    const courts = [
      { name: 'Tax Court', advantage: 'No pay required first', disadvantage: 'May take longer', cost: 'Low' },
      { name: 'District Court', advantage: 'Jury trial possible', disadvantage: 'Must pay first', cost: 'Higher' },
      { name: 'Claims Court', advantage: 'Specialized judges', disadvantage: 'Must pay first', cost: 'Moderate' },
    ]

    // Small vs Regular case
    const caseComparison = {
      small: {
        limit: smallCaseLimit,
        process: 'Informal, no formal discovery',
        decision: 'Cannot be appealed by taxpayer',
        time: 'Usually faster (6-12 months)',
      },
      regular: {
        limit: 'Any amount',
        process: 'Formal rules, full discovery',
        decision: 'Appealable to Circuit Court',
        time: 'Longer (12-24 months)',
      },
    }

    // Petition filing requirements
    const filingRequirements = [
      'Petition form (Tax Court)',
      'Statement of facts',
      'Copy of IRS notice',
      'Proof of timely filing',
      'Filing fee ($60 regular, $60 small)',
    ]

    // Recommendation
    let recommendation = ''
    if (isExpired) {
      recommendation = 'Deadline passed - Tax Court no longer available. Pay and sue for refund or negotiate with IRS.'
    } else if (isUrgent) {
      recommendation = 'URGENT: File petition immediately! Only ' + daysRemaining + ' days left.'
    } else if (smallCaseEligible) {
      recommendation = 'Eligible for Small Tax Case - simpler process, faster resolution.'
    } else {
      recommendation = 'File Tax Court petition within deadline - no payment required first.'
    }

    return {
      noticeType,
      noticeDate,
      currentDate,
      daysSinceNotice: daysSinceNotice.toFixed(0),
      deadlineDays: deadlineDays.toFixed(0),
      daysRemaining: daysRemaining.toFixed(0),
      deadlineDate: deadlineDateStr,
      deadlineType,
      courtType,
      jurisdictionType,
      isExpired,
      isUrgent,
      petitionType,
      disputedAmount: disputedAmount.toFixed(0),
      smallCaseLimit: smallCaseLimit.toFixed(0),
      smallCaseEligible,
      petitionOptions,
      courts,
      caseComparison,
      filingRequirements,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Court Petition Deadline Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate deadline for filing Tax Court petition after IRS notice.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Notice Type</label>
          <select value={noticeType} onChange={(e) => setNoticeType(e.target.value as 'statutory' | 'deficiency' | 'cdp' | 'nftl')} className="w-full border rounded p-2">
            <option value="deficiency">Notice of Deficiency (90-day)</option>
            <option value="statutory">Statutory Notice</option>
            <option value="cdp">CDP Notice</option>
            <option value="nftl">Notice of Federal Tax Lien</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notice Date</label>
          <input type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Date</label>
          <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Petition Type</label>
          <select value={petitionType} onChange={(e) => setPetitionType(e.target.value as 'regular' | 'small')} className="w-full border rounded p-2">
            <option value="regular">Regular Tax Court Case</option>
            <option value="small">Small Tax Case (≤$50k)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Disputed Amount</label>
          <input type="number" value={disputedAmount} onChange={(e) => setDisputedAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.isExpired ? 'bg-red-50 border border-red-200' : result.isUrgent ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isExpired ? 'text-red-700' : result.isUrgent ? 'text-orange-700' : 'text-green-700'}`}>Deadline Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Notice Type:</span><span className="font-medium ml-2">{result.deadlineType}</span></div>
          <div><span className="text-zinc-600">Days Since:</span><span className="font-medium ml-2">{result.daysSinceNotice}</span></div>
          <div><span className="text-zinc-600">Deadline:</span><span className="font-bold ml-2">{result.deadlineDays} days</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Deadline Date:</span><span className={`font-bold ml-2 ${result.isExpired || result.isUrgent ? 'text-red-700' : ''}`}>{result.deadlineDate}</span></div>
          <div><span className="text-zinc-600">Days Left:</span><span className={`font-bold ml-2 ${result.isExpired ? 'text-red-700' : result.isUrgent ? 'text-orange-700' : 'text-green-700'}`}>{result.isExpired ? 'EXPIRED' : result.daysRemaining}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.jurisdictionType}. Missing deadline loses Tax Court option.</div>
      </div>

      {result.isUrgent && !result.isExpired && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Urgent Warning</h2>
          <div className="text-sm text-red-700 font-bold">Only {result.daysRemaining} days to file petition!</div>
          <div className="text-xs text-red-600 mt-2">File immediately. Late filing = lose Tax Court rights permanently.</div>
        </div>
      )}

      {result.isExpired && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Deadline Expired</h2>
          <div className="text-sm text-red-700">Tax Court petition no longer available.</div>
          <div className="text-xs text-red-600 mt-2">Must pay tax and sue for refund, or negotiate payment plan.</div>
        </div>
      )}

      <div className={`card mb-6 ${result.smallCaseEligible ? 'bg-teal-50 border border-teal-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.smallCaseEligible ? 'text-teal-700' : 'text-blue-700'}`}>Case Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Disputed:</span><span className="font-medium ml-2">$ {result.disputedAmount}</span></div>
          <div><span className="text-zinc-600">Small Case:</span><span className={`font-bold ml-2 ${result.smallCaseEligible ? 'text-teal-700' : 'text-zinc-600'}`}>{result.smallCaseEligible ? 'Eligible (≤$50k)' : 'Not eligible'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Small case: simplified rules, faster resolution, no appeal by you.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Petition Options</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.petitionOptions.map((opt, i) => (
            <li key={i}>{opt}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Tax Court: pre-payment jurisdiction. District/Claims: must pay first.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Court Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Court</th>
                <th className="py-2 text-left">Advantage</th>
                <th className="py-2 text-left">Must Pay?</th>
              </tr>
            </thead>
            <tbody>
              {result.courts.map((court) => (
                <tr key={court.name} className="border-b">
                  <td className="py-1 font-semibold">{court.name}</td>
                  <td className="py-1">{court.advantage}</td>
                  <td className="py-1">{court.disadvantage.includes('pay') ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Tax Court is most common: no payment required before trial.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Filing Requirements</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.filingRequirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">File by mail or hand-delivery to Tax Court in Washington, DC.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600 font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax Court Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>90-day letter: 90 days deadline</li>
          <li>CDP notice: 30 days</li>
          <li>Small case: ≤$50k simplified</li>
          <li>Tax Court: no pay first</li>
          <li>Other courts: pay first</li>
          <li>Deadline is FIRM</li>
          <li>Late = lose rights</li>
          <li>File in Washington DC</li>
          <li>$60 filing fee</li>
          <li>Appeal to Circuit Court</li>
        </ul>
      </div>
    </div>
  )
}