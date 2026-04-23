'use client'

import { useState } from 'react'

export default function IRSNoticeResponseCalculator() {
  const [noticeType, setNoticeType] = useState<'cp2000' | 'cp501' | 'cp503' | 'cp504' | 'letter11' | 'lt11' | 'cp90' | 'cp91' | 'cp231' | 'other'>('cp2000')
  const [noticeDate, setNoticeDate] = useState('2024-01-15')
  const [taxYear, setTaxYear] = useState(2022)
  const [amountDisputed, setAmountDisputed] = useState(5000)
  const [responseDeadline, setResponseDeadline] = useState(30)
  const [agreeWithIRS, setAgreeWithIRS] = useState(false)
  const [haveDocumentation, setHaveDocumentation] = useState(true)
  const [previouslyFiled, setPreviouslyFiled] = useState(true)

  const calculate = () => {
    // IRS Notice Response Calculator
    // Calculate response timeline and options for IRS notices

    // Notice types and their meanings
    const noticeDescriptions: Record<string, { name: string; description: string; severity: string }> = {
      cp2000: { name: 'CP2000', description: 'Underreported Income Notice - IRS found income not on return', severity: 'Moderate' },
      cp501: { name: 'CP501', description: 'Balance Due Reminder - First reminder of unpaid tax', severity: 'Low' },
      cp503: { name: 'CP503', description: 'Second Balance Due Reminder - Urgent payment request', severity: 'Moderate' },
      cp504: { name: 'CP504', description: 'Final Balance Due Notice - Last warning before levy', severity: 'High' },
      letter11: { name: 'Letter 11', description: 'Intent to Levy Notice - 30 days before levy action', severity: 'Critical' },
      lt11: { name: 'LT11', description: 'Final Notice Before Levy - Intent to seize assets', severity: 'Critical' },
      cp90: { name: 'CP90/CP91', description: 'Intent to Levy for Trust Fund Recovery Penalty', severity: 'Critical' },
      cp231: { name: 'CP231', description: 'Balance Due on Trust Fund Recovery Penalty', severity: 'High' },
      other: { name: 'Other Notice', description: 'General IRS correspondence requiring response', severity: 'Variable' },
    }

    const noticeInfo = noticeDescriptions[noticeType]

    // Calculate response deadline
    const noticeDateObj = new Date(noticeDate)
    const responseDueDate = new Date(noticeDateObj)
    responseDueDate.setDate(responseDueDate.getDate() + responseDeadline)

    // Calculate days remaining
    const today = new Date()
    const daysRemaining = Math.ceil((responseDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Response options based on notice type
    const responseOptions: { option: string; action: string; deadline: string }[] = []

    if (noticeType === 'cp2000') {
      responseOptions.push({
        option: 'Agree with IRS',
        action: 'Sign and return CP2000 response form, pay amount due',
        deadline: `Within ${responseDeadline} days`,
      })
      responseOptions.push({
        option: 'Disagree with IRS',
        action: 'Submit written response with documentation explaining discrepancy',
        deadline: `Within ${responseDeadline} days`,
      })
      responseOptions.push({
        option: 'Request Appeal',
        action: 'Request appeal if unable to resolve through correspondence',
        deadline: '30 days from notice',
      })
    } else if (noticeType === 'cp501' || noticeType === 'cp503') {
      responseOptions.push({
        option: 'Pay Full Amount',
        action: 'Pay balance due immediately to stop notices',
        deadline: 'Immediately',
      })
      responseOptions.push({
        option: 'Request Payment Plan',
        action: 'Apply for installment agreement online or by phone',
        deadline: 'Before next notice',
      })
      responseOptions.push({
        option: 'Request Penalty Abatement',
        action: 'Request first-time penalty abatement if eligible',
        deadline: 'With payment or plan request',
      })
    } else if (noticeType === 'cp504' || noticeType === 'letter11' || noticeType === 'lt11') {
      responseOptions.push({
        option: 'Pay Immediately',
        action: 'Pay full amount to prevent levy/seizure',
        deadline: 'Within 30 days',
      })
      responseOptions.push({
        option: 'Request Collection Due Process Appeal',
        action: 'File Form 12153 for CDP hearing within 30 days',
        deadline: '30 days from notice - CRITICAL',
      })
      responseOptions.push({
        option: 'Request Currently Not Collectible',
        action: 'Request CNC status if unable to pay',
        deadline: 'Contact IRS immediately',
      })
    } else if (noticeType === 'cp90' || noticeType === 'cp91' || noticeType === 'cp231') {
      responseOptions.push({
        option: 'Request CDP Appeal',
        action: 'File Form 12153 for Collection Due Process hearing',
        deadline: '30 days from notice',
      })
      responseOptions.push({
        option: 'Request Equivalent Hearing',
        action: 'If CDP deadline missed, request equivalent hearing (1 year)',
        deadline: 'Within 1 year of notice',
      })
      responseOptions.push({
        option: 'Pay or Settle',
        action: 'Pay TFRP or negotiate settlement',
        deadline: 'Before levy action',
      })
    } else {
      responseOptions.push({
        option: 'Respond to Notice',
        action: 'Follow specific instructions in notice',
        deadline: `Within ${responseDeadline} days`,
      })
      responseOptions.push({
        option: 'Contact IRS',
        action: 'Call IRS at number provided in notice for clarification',
        deadline: 'Promptly',
      })
    }

    // Risk assessment
    let riskLevel = ''
    let riskColor = ''
    if (daysRemaining <= 0) {
      riskLevel = 'CRITICAL - Deadline passed. Immediate action required. IRS may take enforcement action.'
      riskColor = 'red'
    } else if (daysRemaining <= 7) {
      riskLevel = 'URGENT - Less than 7 days remaining. Respond immediately.'
      riskColor = 'orange'
    } else if (daysRemaining <= 15) {
      riskLevel = 'HIGH - Limited time remaining. Prepare response promptly.'
      riskColor = 'yellow'
    } else if (daysRemaining <= 30) {
      riskLevel = 'MODERATE - Adequate time but prepare response now.'
      riskColor = 'blue'
    } else {
      riskLevel = 'PLANNING - Sufficient time. Gather documentation and respond.'
      riskColor = 'green'
    }

    // Penalty and interest estimate
    const penaltyRate = noticeType.includes('50') || noticeType.includes('11') ? 0.5 : 0 // Failure to pay penalty
    const estimatedPenalty = amountDisputed * penaltyRate * (responseDeadline / 30)
    const interestRate = 8 // Approximate current IRS interest rate
    const estimatedInterest = amountDisputed * (interestRate / 100) * (responseDeadline / 365)

    // Recommended actions
    let recommendation = ''
    if (daysRemaining <= 0) {
      recommendation = `DEADLINE EXCEEDED. Contact IRS immediately at 1-800-829-1040. ${noticeInfo.severity === 'Critical' ? 'Enforcement action imminent.' : 'Penalties increasing.'}`
    } else if (agreeWithIRS) {
      recommendation = `If you agree: Sign response form, pay $${amountDisputed.toFixed(0)} by ${responseDueDate.toLocaleDateString()}. Consider penalty abatement request if first-time issue.`
    } else if (haveDocumentation) {
      recommendation = `If you disagree and have documentation: Submit written response with supporting documents by ${responseDueDate.toLocaleDateString()}. Explain discrepancy clearly. Include copies of relevant records.`
    } else {
      recommendation = `Gather documentation before responding. Request additional time if needed. Contact IRS to discuss. Keep records of all communications.`
    }

    // Response checklist
    const responseChecklist = [
      'Read notice carefully and understand issue',
      'Verify tax year and return mentioned',
      'Gather all relevant documentation',
      'Prepare written response letter',
      'Include copies of supporting documents',
      'Sign and date response',
      'Send to correct IRS address',
      'Keep copy of response for records',
      'Track delivery confirmation',
      'Follow up if no response within 30 days',
      'Document all phone calls with IRS',
      'Request supervisor if issue unresolved',
      'Consider professional representation',
      'File appeal if disagreement continues',
      'Pay any undisputed portion',
    ]

    return {
      noticeType,
      noticeDate,
      taxYear,
      amountDisputed: amountDisputed.toFixed(0),
      responseDeadline: responseDeadline.toFixed(0),
      agreeWithIRS,
      haveDocumentation,
      previouslyFiled,
      noticeInfo,
      responseDueDate: responseDueDate.toLocaleDateString(),
      daysRemaining: daysRemaining.toFixed(0),
      responseOptions,
      riskLevel,
      riskColor,
      estimatedPenalty: estimatedPenalty.toFixed(2),
      estimatedInterest: estimatedInterest.toFixed(2),
      recommendation,
      responseChecklist,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Notice Response Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate response timeline and options for IRS notices.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Notice Type</label>
          <select value={noticeType} onChange={(e) => setNoticeType(e.target.value as 'cp2000' | 'cp501' | 'cp503' | 'cp504' | 'letter11' | 'lt11' | 'cp90' | 'cp91' | 'cp231' | 'other')} className="w-full border rounded p-2">
            <option value="cp2000">CP2000 - Underreported Income</option>
            <option value="cp501">CP501 - Balance Due Reminder</option>
            <option value="cp503">CP503 - Second Reminder</option>
            <option value="cp504">CP504 - Final Notice</option>
            <option value="letter11">Letter 11 - Intent to Levy</option>
            <option value="lt11">LT11 - Final Before Levy</option>
            <option value="cp90">CP90/CP91 - Trust Fund Penalty</option>
            <option value="cp231">CP231 - TFRP Balance Due</option>
            <option value="other">Other Notice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notice Date</label>
          <input type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year on Notice</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount Disputed/Due</label>
          <input type="number" value={amountDisputed} onChange={(e) => setAmountDisputed(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Response Deadline (days from notice)</label>
          <input type="number" value={responseDeadline} onChange={(e) => setResponseDeadline(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Response Context</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={agreeWithIRS} onChange={(e) => setAgreeWithIRS(e.target.checked)} className="mr-2" />
              <span className="text-sm">I agree with IRS assessment</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={haveDocumentation} onChange={(e) => setHaveDocumentation(e.target.checked)} className="mr-2" />
              <span className="text-sm">I have supporting documentation</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={previouslyFiled} onChange={(e) => setPreviouslyFiled(e.target.checked)} className="mr-2" />
              <span className="text-sm">I filed return for this year</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.riskColor === 'red' ? 'bg-red-50 border border-red-200' : result.riskColor === 'orange' ? 'bg-orange-50 border border-orange-200' : result.riskColor === 'yellow' ? 'bg-yellow-50 border border-yellow-200' : result.riskColor === 'green' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Notice Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Notice:</span><span className="font-bold ml-2">{result.noticeInfo.name}</span></div>
          <div><span className="text-zinc-600">Severity:</span><span className={`font-bold ml-2 ${result.noticeInfo.severity === 'Critical' ? 'text-red-700' : result.noticeInfo.severity === 'High' ? 'text-orange-700' : ''}`}>{result.noticeInfo.severity}</span></div>
          <div><span className="text-zinc-600">Days Left:</span><span className={`font-bold ml-2 ${Number(result.daysRemaining) <= 7 ? 'text-red-700' : ''}`}>{result.daysRemaining}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.noticeInfo.description}</div>
        <div className={`text-sm font-semibold mt-2 ${result.riskColor === 'red' ? 'text-red-700' : result.riskColor === 'orange' ? 'text-orange-700' : ''}`}>{result.riskLevel}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Response Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {result.responseOptions.map((o, i) => (
                <tr key={i} className="border-b">
                  <td className="py-1 font-semibold">{o.option}</td>
                  <td className="py-1">{o.action}</td>
                  <td className="py-1">{o.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Response Checklist</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.responseChecklist.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className={`card mb-6 ${Number(result.daysRemaining) <= 7 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Notice Response Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Respond within deadline stated in notice</li>
          <li>CP2000: 30 days to respond</li>
          <li>Levy notices: 30 days critical deadline</li>
          <li>CDP appeal stops collection temporarily</li>
          <li>Keep copies of all responses</li>
          <li>Send to address on notice</li>
          <li>Document all IRS phone calls</li>
          <li>Pay undisputed amounts promptly</li>
          <li>Request penalty abatement if eligible</li>
          <li>Consider professional representation</li>
        </ul>
      </div>
    </div>
  )
}