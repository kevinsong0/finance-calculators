'use client'

import { useState } from 'react'

export default function IRSLevyProtectionCalculator() {
  const [levyType, setLevyType] = useState<'bank' | 'wage' | 'property' | 'social_security'>('bank')
  const [levyAmount, setLevyAmount] = useState(15000)
  const [annualIncome, setAnnualIncome] = useState(60000)
  const [bankBalance, setBankBalance] = useState(10000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000)
  const [dependents, setDependents] = useState(2)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_of_household'>('married')
  const [state, setState] = useState('generic')
  const [levyDate, setLevyDate] = useState('2024-01-15')

  const calculate = () => {
    // IRS Levy Protection Calculator
    // Calculate exemptions and protection options from IRS levies

    // Bank levy exemptions
    let bankExemption = 0
    let bankProtectedAmount = 0

    if (levyType === 'bank') {
      // Some states have bank levy exemptions
      // Federal: no automatic exemption, but can claim hardship
      bankExemption = 0 // Federal has no automatic exemption
      bankProtectedAmount = Math.max(0, bankBalance - levyAmount)
    }

    // Wage levy exemptions (wage garnishment)
    let wageExemption = 0
    let disposableEarnings = 0
    let weeklyDisposable = 0
    let levyableAmount = 0
    let protectedWage = 0

    if (levyType === 'wage') {
      // Federal wage levy rules
      const weeklyIncome = annualIncome / 52
      disposableEarnings = weeklyIncome - (weeklyIncome * 0.25) // Simplified: minus statutory deductions
      weeklyDisposable = weeklyIncome // Simplified gross weekly

      // IRS wage levy exemption
      // Exempt: amount equal to standard deduction + personal exemptions
      // 2024 standard deduction approximations
      const standardDeduction = filingStatus === 'married' ? 29200 : filingStatus === 'head_of_household' ? 21800 : 14600
      const personalExemptions = dependents * 500 // Simplified

      const weeklyExemption = (standardDeduction + personalExemptions) / 52
      wageExemption = weeklyExemption

      // Levyable: amount above exemption, but limited
      if (weeklyDisposable > weeklyExemption) {
        levyableAmount = weeklyDisposable - weeklyExemption
      } else {
        levyableAmount = 0
      }

      protectedWage = weeklyDisposable - levyableAmount
    }

    // Social Security levy limits
    let ssProtected = 0
    let ssLevyable = 0

    if (levyType === 'social_security') {
      // IRS can levy Social Security but limited
      // Automated levy: 15% of benefits maximum
      // Manual levy: can go higher but exemptions apply
      ssProtected = levyAmount * 0.85 // 85% protected under automated levy
      ssLevyable = levyAmount * 0.15 // 15% levyable maximum
    }

    // Property levy exemptions
    let propertyExemption = 0

    if (levyType === 'property') {
      // Property exemptions vary by state
      // Federal: some exemptions for necessary items
      propertyExemption = Math.min(levyAmount, monthlyExpenses * 6)
    }

    // Hardship exemption calculation
    const monthlyIncome = annualIncome / 12
    const hardshipThreshold = monthlyExpenses + dependents * 500
    const hardshipEligible = monthlyIncome < hardshipThreshold || bankBalance < monthlyExpenses

    // CDP deadline
    const levyDateObj = new Date(levyDate)
    const cdpDeadline = new Date(levyDateObj)
    cdpDeadline.setDate(cdpDeadline.getDate() + 30)
    const daysUntilCDP = Math.max(0, Math.ceil((cdpDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))

    // Protection options
    const protectionOptions = [
      { option: 'Request CDP Hearing', action: 'File Form 12153 within 30 days', deadline: '30 days from levy', effect: 'Stops collection during appeal' },
      { option: 'Claim Hardship', action: 'Submit Collection Information Statement', deadline: 'Immediately', effect: 'May release levy if hardship proven' },
      { option: 'Request Currently Not Collectible', action: 'Demonstrate inability to pay', deadline: 'Anytime', effect: 'Temporarily stops collection' },
      { option: 'Offer in Compromise', action: 'Settle for less than full amount', deadline: 'Before levy', effect: 'Can prevent future levies' },
      { option: 'Payment Agreement', action: 'Set up installment agreement', deadline: 'Before levy', effect: 'Can release levy with approved plan' },
      { option: 'Bank Levy Release', action: 'Claim hardship for bank levy', deadline: '21 days after levy', effect: 'Bank holds funds 21 days for IRS' },
    ]

    // Exemption summary
    let exemptionSummary: { type: string; exemption: number; protected: number; levyable: number } = { type: levyType, exemption: 0, protected: 0, levyable: 0 }
    if (levyType === 'bank') {
      exemptionSummary = { type: 'Bank Levy', exemption: bankExemption, protected: bankProtectedAmount, levyable: Math.min(levyAmount, bankBalance) }
    } else if (levyType === 'wage') {
      exemptionSummary = { type: 'Wage Levy', exemption: wageExemption, protected: protectedWage, levyable: levyableAmount }
    } else if (levyType === 'social_security') {
      exemptionSummary = { type: 'Social Security Levy', exemption: ssProtected, protected: ssProtected, levyable: ssLevyable }
    } else {
      exemptionSummary = { type: 'Property Levy', exemption: propertyExemption, protected: propertyExemption, levyable: levyAmount - propertyExemption }
    }

    // Recommendation
    let recommendation = ''
    if (daysUntilCDP <= 0) {
      recommendation = `CDP deadline expired. Contact IRS immediately to discuss release options. ${hardshipEligible ? 'Hardship exemption likely applicable.' : 'Consider payment agreement or OIC.'}`
    } else if (daysUntilCDP <= 7) {
      recommendation = `URGENT: ${daysUntilCDP} days until CDP deadline. File Form 12153 immediately. ${hardshipEligible ? 'Strong hardship case - submit CIS with appeal.' : 'Prepare financial documentation for hearing.'}`
    } else {
      recommendation = `${daysUntilCDP} days to request CDP hearing. Prepare Collection Information Statement (Form 433-A/B). ${hardshipEligible ? 'Hardship exemption likely - gather expense documentation.' : 'Consider payment plan request with release.'}`
    }

    return {
      levyType,
      levyAmount: levyAmount.toFixed(0),
      annualIncome: annualIncome.toFixed(0),
      bankBalance: bankBalance.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      dependents: dependents.toFixed(0),
      filingStatus,
      levyDate,
      bankExemption: bankExemption.toFixed(0),
      bankProtectedAmount: bankProtectedAmount.toFixed(0),
      wageExemption: wageExemption.toFixed(0),
      weeklyDisposable: weeklyDisposable.toFixed(0),
      levyableAmount: levyableAmount.toFixed(0),
      protectedWage: protectedWage.toFixed(0),
      ssProtected: ssProtected.toFixed(0),
      ssLevyable: ssLevyable.toFixed(0),
      propertyExemption: propertyExemption.toFixed(0),
      hardshipEligible,
      hardshipThreshold: hardshipThreshold.toFixed(0),
      cdpDeadline: cdpDeadline.toLocaleDateString(),
      daysUntilCDP: daysUntilCDP.toFixed(0),
      exemptionSummary,
      protectionOptions,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Levy Protection Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate exemptions and protection options from IRS levies.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Levy Type</label>
          <select value={levyType} onChange={(e) => setLevyType(e.target.value as 'bank' | 'wage' | 'property' | 'social_security')} className="w-full border rounded p-2">
            <option value="bank">Bank Levy</option>
            <option value="wage">Wage Garnishment</option>
            <option value="property">Property Seizure</option>
            <option value="social_security">Social Security Levy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Levy Amount</label>
          <input type="number" value={levyAmount} onChange={(e) => setLevyAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income</label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
          <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married' | 'head_of_household')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="head_of_household">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dependents</label>
          <input type="number" value={dependents} onChange={(e) => setDependents(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        {levyType === 'bank' && (
          <div>
            <label className="block text-sm font-medium mb-1">Bank Account Balance</label>
            <input type="number" value={bankBalance} onChange={(e) => setBankBalance(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Levy Notice Date</label>
          <input type="date" value={levyDate} onChange={(e) => setLevyDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.hardshipEligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Exemption Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Levy Type:</span><span className="font-bold ml-2">{result.exemptionSummary.type}</span></div>
          <div><span className="text-zinc-600">Exemption:</span><span className="font-bold ml-2">$ {result.exemptionSummary.exemption}</span></div>
          <div><span className="text-zinc-600">Protected:</span><span className="font-bold ml-2 text-green-700">$ {result.exemptionSummary.protected}</span></div>
          <div><span className="text-zinc-600">Levyable:</span><span className="font-bold ml-2 text-red-700">$ {result.exemptionSummary.levyable}</span></div>
          <div><span className="text-zinc-600">Hardship Eligible:</span><span className={`font-bold ml-2 ${result.hardshipEligible ? 'text-green-700' : 'text-orange-700'}`}>{result.hardshipEligible ? 'Yes' : 'No'}</span></div>
        </div>
      </div>

      {levyType === 'wage' && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Wage Levy Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Weekly Disposable:</span><span className="font-medium ml-2">$ {result.weeklyDisposable}</span></div>
            <div><span className="text-zinc-600">Weekly Exemption:</span><span className="font-medium ml-2">$ {result.wageExemption}</span></div>
            <div><span className="text-zinc-600">Protected Wage:</span><span className="font-bold ml-2 text-green-700">$ {result.protectedWage}</span></div>
            <div><span className="text-zinc-600">Levyable Per Week:</span><span className="font-bold ml-2 text-red-700">$ {result.levyableAmount}</span></div>
          </div>
        </div>
      )}

      {levyType === 'social_security' && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Social Security Levy Limits</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Protected (85%):</span><span className="font-bold ml-2 text-green-700">$ {result.ssProtected}</span></div>
            <div><span className="text-zinc-600">Levyable (15% max):</span><span className="font-bold ml-2 text-red-700">$ {result.ssLevyable}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Automated Federal Payment Levy Program limits to 15%</div>
        </div>
      )}

      <div className={`card mb-6 ${Number(result.daysUntilCDP) <= 7 ? 'bg-red-50 border border-red-200' : 'bg-purple-50 border border-purple-200'}`}>
        <h2 className="text-lg font-semibold mb-3">CDP Appeal Deadline</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">CDP Deadline:</span><span className={`font-bold ml-2 ${Number(result.daysUntilCDP) <= 7 ? 'text-red-700' : ''}`}>{result.cdpDeadline}</span></div>
          <div><span className="text-zinc-600">Days Remaining:</span><span className={`font-bold ml-2 ${Number(result.daysUntilCDP) <= 7 ? 'text-red-700' : ''}`}>{result.daysUntilCDP}</span></div>
        </div>
        {Number(result.daysUntilCDP) <= 0 && <div className="text-xs text-red-700 mt-2">Deadline passed - contact IRS immediately</div>}
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Protection Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Deadline</th>
                <th className="py-2 text-left">Effect</th>
              </tr>
            </thead>
            <tbody>
              {result.protectionOptions.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.option}</td>
                  <td className="py-1">{p.action}</td>
                  <td className="py-1">{p.deadline}</td>
                  <td className="py-1">{p.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.daysUntilCDP) <= 7 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Levy Protection Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>CDP hearing: 30 days from levy notice</li>
          <li>Bank levy: 21-day hold before IRS gets funds</li>
          <li>Wage levy: exemption based on deductions</li>
          <li>SS levy: 15% max under FPLP</li>
          <li>Hardship: may release levy entirely</li>
          <li>CNC status: stops collection temporarily</li>
          <li>Payment plan: can release levy</li>
          <li>OIC: prevents future levies</li>
          <li>File Form 12153 for CDP</li>
          <li>Form 433-A/B for financial statement</li>
        </ul>
      </div>
    </div>
  )
}