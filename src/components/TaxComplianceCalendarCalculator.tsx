'use client'

import { useState } from 'react'

export default function TaxComplianceCalendarCalculator() {
  const [taxYear, setTaxYear] = useState(2024)
  const [filingStatus, setFilingStatus] = useState<'individual' | 'corporate' | 'partnership' | 's_corp' | 'estate'>('individual')
  const [extensionFiled, setExtensionFiled] = useState(false)
  const [hasForeignAccounts, setHasForeignAccounts] = useState(false)
  const [hasEstimatedTax, setHasEstimatedTax] = useState(false)
  const [quarterlyPayments, setQuarterlyPayments] = useState(4)
  const [hasTrust, setHasTrust] = useState(false)
  const [hasPayroll, setHasPayroll] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(1)

  const calculate = () => {
    // Tax Compliance Calendar Calculator
    // Generate key tax deadlines and compliance reminders

    const year = taxYear
    const filingYear = year + 1

    // Base deadlines
    const deadlines: { date: string; deadline: string; type: string; penalty: string; priority: string }[] = []

    // Individual deadlines
    if (filingStatus === 'individual') {
      // April 15 - Individual tax return due
      const apr15 = extensionFiled ? 'October 15' : 'April 15'
      deadlines.push({
        date: `${filingYear}-04-15`,
        deadline: extensionFiled ? `${filingYear}-10-15` : `${filingYear}-04-15`,
        type: 'Form 1040 - Individual Tax Return',
        penalty: 'Failure to file: 5% per month (max 25%). Failure to pay: 0.5% per month',
        priority: 'Critical',
      })

      // FBAR deadline (April 15, automatic extension to October 15)
      if (hasForeignAccounts) {
        deadlines.push({
          date: `${filingYear}-04-15`,
          deadline: `${filingYear}-10-15`,
          type: 'FBAR (FinCEN Form 114) - Foreign Bank Accounts',
          penalty: 'Non-willful: $10,000 per violation. Willful: $100,000 or 50% of account balance',
          priority: 'Critical',
        })
      }
    }

    // Estimated tax payments
    if (hasEstimatedTax) {
      deadlines.push({
        date: `${filingYear}-04-15`,
        deadline: `${filingYear}-04-15`,
        type: 'Q1 Estimated Tax Payment',
        penalty: 'Underpayment penalty: IRS interest rate + 3%',
        priority: 'High',
      })
      deadlines.push({
        date: `${filingYear}-06-15`,
        deadline: `${filingYear}-06-15`,
        type: 'Q2 Estimated Tax Payment',
        penalty: 'Underpayment penalty: IRS interest rate + 3%',
        priority: 'High',
      })
      deadlines.push({
        date: `${filingYear}-09-15`,
        deadline: `${filingYear}-09-15`,
        type: 'Q3 Estimated Tax Payment',
        penalty: 'Underpayment penalty: IRS interest rate + 3%',
        priority: 'High',
      })
      deadlines.push({
        date: `${filingYear + 1}-01-15`,
        deadline: `${filingYear + 1}-01-15`,
        type: 'Q4 Estimated Tax Payment',
        penalty: 'Underpayment penalty: IRS interest rate + 3%',
        priority: 'High',
      })
    }

    // Corporate deadlines
    if (filingStatus === 'corporate') {
      deadlines.push({
        date: `${filingYear}-04-15`,
        deadline: extensionFiled ? `${filingYear}-09-15` : `${filingYear}-04-15`,
        type: 'Form 1120 - Corporate Tax Return',
        penalty: 'Failure to file: 5% per month (max 25%). Minimum penalty: $435',
        priority: 'Critical',
      })
    }

    // Partnership deadlines
    if (filingStatus === 'partnership') {
      deadlines.push({
        date: `${filingYear}-03-15`,
        deadline: extensionFiled ? `${filingYear}-09-15` : `${filingYear}-03-15`,
        type: 'Form 1065 - Partnership Return',
        penalty: '$210 per partner per month (max 12 months)',
        priority: 'Critical',
      })
    }

    // S-Corp deadlines
    if (filingStatus === 's_corp') {
      deadlines.push({
        date: `${filingYear}-03-15`,
        deadline: extensionFiled ? `${filingYear}-09-15` : `${filingYear}-03-15`,
        type: 'Form 1120S - S Corporation Return',
        penalty: '$210 per shareholder per month (max 12 months)',
        priority: 'Critical',
      })
    }

    // Estate deadlines
    if (filingStatus === 'estate') {
      deadlines.push({
        date: `${filingYear}-04-15`,
        deadline: `${filingYear}-04-15`,
        type: 'Form 1041 - Estate/Trust Income Tax Return',
        penalty: 'Failure to file: 5% per month (max 25%)',
        priority: 'Critical',
      })
    }

    // Trust deadlines
    if (hasTrust) {
      deadlines.push({
        date: `${filingYear}-04-15`,
        deadline: `${filingYear}-04-15`,
        type: 'Form 1041 - Trust Income Tax Return',
        penalty: 'Failure to file: 5% per month (max 25%)',
        priority: 'High',
      })
    }

    // Payroll deadlines
    if (hasPayroll) {
      deadlines.push({
        date: `${filingYear + 1}-01-31`,
        deadline: `${filingYear + 1}-01-31`,
        type: 'W-2/W-3 Forms - Employee Wage Reporting',
        penalty: '$50 per W-2 if late (max $536,500). Intentional disregard: $550 per W-2',
        priority: 'Critical',
      })
      deadlines.push({
        date: `${filingYear + 1}-01-31`,
        deadline: `${filingYear + 1}-01-31`,
        type: 'Form 940 - FUTA Tax Return',
        penalty: 'Failure to file: 5% per month (max 25%)',
        priority: 'High',
      })
      deadlines.push({
        date: 'Quarterly',
        deadline: 'Quarterly (Apr 30, Jul 31, Oct 31, Jan 31)',
        type: 'Form 941 - Quarterly Payroll Tax',
        penalty: 'Failure to file: 5% per month. Trust Fund Recovery Penalty possible',
        priority: 'Critical',
      })
      deadlines.push({
        date: `${filingYear + 1}-02-28`,
        deadline: `${filingYear + 1}-02-28`,
        type: 'Form 1099-MISC/NEC - Contractor Payments',
        penalty: '$60 per 1099 (max $220,500). Intentional disregard: $310 per 1099',
        priority: 'High',
      })
    }

    // Common deadlines for all
    deadlines.push({
      date: `${filingYear + 1}-10-15`,
      deadline: `${filingYear + 1}-10-15`,
      type: 'Extended Return Deadline (if extension filed)',
      penalty: 'No additional penalty if extension filed and paid estimated tax',
      priority: 'High',
    })

    // Sort by date
    deadlines.sort((a, b) => {
      const dateA = a.date.split('-').map(Number)
      const dateB = b.date.split('-').map(Number)
      return (dateA[0] * 10000 + dateA[1] * 100 + dateA[2]) - (dateB[0] * 10000 + dateB[1] * 100 + dateB[2])
    })

    // Calculate months remaining
    const currentYearDate = filingYear
    const monthsRemaining: { deadline: string; monthsLeft: number; urgency: string }[] = deadlines.map(d => {
      const parts = d.deadline.split('-')
      const deadlineYear = Number(parts[0])
      const deadlineMonth = Number(parts[1])
      const months = (deadlineYear - currentYearDate) * 12 + (deadlineMonth - currentMonth)
      let urgency = ''
      if (months <= 0) urgency = 'PAST DUE'
      else if (months <= 1) urgency = 'URGENT'
      else if (months <= 3) urgency = 'SOON'
      else urgency = 'PLANNING'
      return { deadline: d.deadline, monthsLeft: Math.max(0, months), urgency }
    })

    // Compliance checklist
    const checklist = [
      'Review all income documents',
      'Verify deduction eligibility',
      'Check filing status accuracy',
      'Confirm estimated tax payments',
      'Review foreign account holdings',
      'Verify payroll tax deposits',
      'Check retirement account contributions',
      'Review charitable donation records',
      'Confirm business expense documentation',
      'Verify dependent information',
      'Review health insurance coverage',
      'Check education credits eligibility',
      'Review investment transactions',
      'Confirm rental property income/expenses',
      'Review state tax obligations',
    ]

    return {
      taxYear,
      filingStatus,
      extensionFiled,
      hasForeignAccounts,
      hasEstimatedTax,
      hasTrust,
      hasPayroll,
      currentMonth,
      deadlines,
      monthsRemaining,
      checklist,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Compliance Calendar Calculator</h1>
      <p className="text-gray-600 mb-4">Generate key tax deadlines and compliance reminders.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'individual' | 'corporate' | 'partnership' | 's_corp' | 'estate')} className="w-full border rounded p-2">
            <option value="individual">Individual (Form 1040)</option>
            <option value="corporate">Corporate (Form 1120)</option>
            <option value="partnership">Partnership (Form 1065)</option>
            <option value="s_corp">S Corporation (Form 1120S)</option>
            <option value="estate">Estate/Trust (Form 1041)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Month (for deadline urgency)</label>
          <input type="number" value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))} min="1" max="12" className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Additional Compliance Factors</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={extensionFiled} onChange={(e) => setExtensionFiled(e.target.checked)} className="mr-2" />
              <span className="text-sm">Extension Filed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasForeignAccounts} onChange={(e) => setHasForeignAccounts(e.target.checked)} className="mr-2" />
              <span className="text-sm">Foreign Bank Accounts (FBAR)</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasEstimatedTax} onChange={(e) => setHasEstimatedTax(e.target.checked)} className="mr-2" />
              <span className="text-sm">Estimated Tax Required</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasTrust} onChange={(e) => setHasTrust(e.target.checked)} className="mr-2" />
              <span className="text-sm">Trust Income</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasPayroll} onChange={(e) => setHasPayroll(e.target.checked)} className="mr-2" />
              <span className="text-sm">Payroll Tax Obligations</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Deadline Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Deadline</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Penalty</th>
                <th className="py-2 text-left">Priority</th>
                <th className="py-2 text-left">Urgency</th>
              </tr>
            </thead>
            <tbody>
              {result.deadlines.map((d, i) => (
                <tr key={i} className="border-b">
                  <td className="py-1 font-semibold">{d.deadline}</td>
                  <td className="py-1">{d.type}</td>
                  <td className="py-1 text-xs">{d.penalty}</td>
                  <td className="py-1">
                    <span className={d.priority === 'Critical' ? 'text-red-700 font-bold' : 'text-orange-700'}>{d.priority}</span>
                  </td>
                  <td className="py-1">
                    <span className={result.monthsRemaining[i]?.urgency === 'PAST DUE' ? 'text-red-700 font-bold' : result.monthsRemaining[i]?.urgency === 'URGENT' ? 'text-orange-700' : ''}>{result.monthsRemaining[i]?.urgency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Compliance Checklist</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.checklist.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Key Compliance Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>File by deadline to avoid penalties</li>
          <li>Pay estimated taxes quarterly</li>
          <li>FBAR due April 15 (auto extends to Oct 15)</li>
          <li>Partnership/S-Corp returns due March 15</li>
          <li>Payroll forms due Jan 31</li>
          <li>W-2s must be issued by Jan 31</li>
          <li>1099s due by Jan 31 (NEC), Feb 28 (MISC)</li>
          <li>Extension grants time to file, not pay</li>
          <li>Penalties compound monthly</li>
          <li>Trust Fund Recovery Penalty severe</li>
        </ul>
      </div>
    </div>
  )
}