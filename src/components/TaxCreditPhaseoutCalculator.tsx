'use client'

import { useState } from 'react'

export default function TaxCreditPhaseoutCalculator() {
  const [annualIncome, setAnnualIncome] = useState(80000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head_household'>('single')
  const [numChildren, setNumChildren] = useState(2)
  const [creditType, setCreditType] = useState<'child_tax_credit' | 'education_credit' | 'saver_credit' | 'eitc'>('child_tax_credit')
  const [studentStatus, setStudentStatus] = useState(false)
  const [educationExpense, setEducationExpense] = useState(4000)
  const [retirementContribution, setRetirementContribution] = useState(3000)

  const calculate = () => {
    let fullCredit = 0
    let phaseoutStart = 0
    let phaseoutEnd = 0
    let phaseoutRate = 0
    let creditName = ''
    let eligible = true
    let explanation = ''

    // 2024 tax credit phaseout parameters
    if (creditType === 'child_tax_credit') {
      creditName = 'Child Tax Credit (CTC)'
      fullCredit = numChildren * 2000 // $2000 per child

      if (filingStatus === 'married') {
        phaseoutStart = 400000
        phaseoutEnd = 600000
      } else {
        phaseoutStart = 200000
        phaseoutEnd = 400000
      }
      phaseoutRate = 50 // $50 per $1000 over threshold

      explanation = 'CTC: $2000 per qualifying child under 17. Phaseout begins at $200K (single) or $400K (married). Credit reduced by $50 per $1000 income above threshold. Additional CTC (refundable portion) up to $1700 per child.'
    } else if (creditType === 'education_credit') {
      creditName = 'American Opportunity Tax Credit (AOTC)'

      if (filingStatus === 'married') {
        phaseoutStart = 160000
        phaseoutEnd = 180000
      } else {
        phaseoutStart = 80000
        phaseoutEnd = 90000
      }

      fullCredit = Math.min(2500, educationExpense * 0.25 + 1500) // First $2000 at 100%, next $2000 at 25%
      phaseoutRate = fullCredit / (phaseoutEnd - phaseoutStart) // Linear phaseout

      eligible = !studentStatus && educationExpense > 0
      explanation = 'AOTC: Up to $2500 per student for first 4 years of college. $1000 refundable. Phaseout: $80K-$90K (single), $160K-$180K (married). 100% of first $2000 + 25% of next $2000 expenses.'
    } else if (creditType === 'saver_credit') {
      creditName = 'Saver\'s Credit (Retirement Savings Contributions Credit)'

      // Determine rate based on income and filing status
      let rate = 0
      if (filingStatus === 'married') {
        if (annualIncome <= 46000) rate = 0.50
        else if (annualIncome <= 50000) rate = 0.20
        else if (annualIncome <= 65000) rate = 0.10
        else rate = 0
        phaseoutStart = 46000
        phaseoutEnd = 66000
      } else if (filingStatus === 'head_household') {
        if (annualIncome <= 34500) rate = 0.50
        else if (annualIncome <= 37500) rate = 0.20
        else if (annualIncome <= 51250) rate = 0.10
        else rate = 0
        phaseoutStart = 34500
        phaseoutEnd = 51350
      } else {
        if (annualIncome <= 23000) rate = 0.50
        else if (annualIncome <= 25000) rate = 0.20
        else if (annualIncome <= 32500) rate = 0.10
        else rate = 0
        phaseoutStart = 23000
        phaseoutEnd = 32600
      }

      fullCredit = Math.min(1000, retirementContribution * rate)
      phaseoutRate = fullCredit / (phaseoutEnd - phaseoutStart)

      eligible = annualIncome < phaseoutEnd && retirementContribution > 0
      explanation = 'Saver\'s Credit: 10-50% of retirement contributions up to $2000 ($4000 married). Rates: 50% (lowest income), 20%, 10%. Maximum credit $1000. Must be 18+, not full-time student, not dependent.'
    } else if (creditType === 'eitc') {
      creditName = 'Earned Income Tax Credit (EITC)'

      // EITC 2024 parameters by filing status and children
      const eitcParams = {
        single: {
          0: { max: 632, income_limit: 18590 },
          1: { max: 6985, income_limit: 48270 },
          2: { max: 7830, income_limit: 53090 },
          3: { max: 9320, income_limit: 57650 },
        },
        married: {
          0: { max: 632, income_limit: 24590 },
          1: { max: 6985, income_limit: 54270 },
          2: { max: 7830, income_limit: 59090 },
          3: { max: 9320, income_limit: 63650 },
        },
        head_household: {
          0: { max: 632, income_limit: 18590 },
          1: { max: 6985, income_limit: 48270 },
          2: { max: 7830, income_limit: 53090 },
          3: { max: 9320, income_limit: 57650 },
        },
      }

      const children = Math.min(numChildren, 3) as 0 | 1 | 2 | 3
      const params = eitcParams[filingStatus][children]
      fullCredit = params.max

      // Phaseout begins at threshold and ends at income limit
      const phaseoutThresholds = {
        single: { 0: 9800, 1: 12730, 2: 12730, 3: 12730 } as Record<number, number>,
        married: { 0: 15980, 1: 22730, 2: 22730, 3: 22730 } as Record<number, number>,
        head_household: { 0: 9800, 1: 12730, 2: 12730, 3: 12730 } as Record<number, number>,
      }

      phaseoutStart = phaseoutThresholds[filingStatus][children]
      phaseoutEnd = params.income_limit

      eligible = annualIncome <= params.income_limit && annualIncome > 0
      phaseoutRate = fullCredit / (phaseoutEnd - phaseoutStart)

      explanation = `EITC: For low-income workers. Maximum: $632 (0 children), $6985 (1), $7830 (2), $9320 (3+). Refundable. Must have earned income. Investment income limit $11,600. Phaseout varies by filing status and children.`
    }

    // Calculate actual credit based on income
    let actualCredit = fullCredit
    if (annualIncome > phaseoutStart) {
      const excessIncome = annualIncome - phaseoutStart
      const reduction = excessIncome * phaseoutRate
      actualCredit = Math.max(0, fullCredit - reduction)
    }

    const creditPercent = fullCredit > 0 ? (actualCredit / fullCredit) * 100 : 0
    const incomeAbovePhaseout = annualIncome > phaseoutStart ? annualIncome - phaseoutStart : 0
    const fullyPhasedOut = annualIncome >= phaseoutEnd

    return {
      annualIncome: annualIncome.toFixed(0),
      filingStatus,
      numChildren: numChildren.toFixed(0),
      creditType,
      creditName,
      fullCredit: fullCredit.toFixed(2),
      phaseoutStart: phaseoutStart.toFixed(0),
      phaseoutEnd: phaseoutEnd.toFixed(0),
      phaseoutRate: phaseoutRate.toFixed(4),
      actualCredit: actualCredit.toFixed(2),
      creditPercent: creditPercent.toFixed(1),
      incomeAbovePhaseout: incomeAbovePhaseout.toFixed(0),
      fullyPhasedOut,
      eligible,
      explanation,
      refundable: creditType === 'eitc' ? actualCredit.toFixed(2) : (creditType === 'education_credit' ? Math.min(1000, actualCredit).toFixed(2) : Math.min(1700 * numChildren, actualCredit).toFixed(2)),
      studentStatus,
      educationExpense: educationExpense.toFixed(2),
      retirementContribution: retirementContribution.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Credit Phaseout Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate how tax credits phase out as income increases.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married' | 'head_household')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="head_household">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credit Type</label>
          <select
            value={creditType}
            onChange={(e) => setCreditType(e.target.value as 'child_tax_credit' | 'education_credit' | 'saver_credit' | 'eitc')}
            className="w-full border rounded p-2"
          >
            <option value="child_tax_credit">Child Tax Credit</option>
            <option value="education_credit">Education Credit (AOTC)</option>
            <option value="saver_credit">Saver's Credit</option>
            <option value="eitc">Earned Income Tax Credit</option>
          </select>
        </div>
        {(creditType === 'child_tax_credit' || creditType === 'eitc') && (
          <div>
            <label className="block text-sm font-medium mb-1">Number of Children</label>
            <input
              type="number"
              value={numChildren}
              onChange={(e) => setNumChildren(Number(e.target.value))}
              min="0"
              max="10"
              className="w-full border rounded p-2"
            />
          </div>
        )}
        {creditType === 'education_credit' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Education Expenses ($)</label>
              <input
                type="number"
                value={educationExpense}
                onChange={(e) => setEducationExpense(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={studentStatus}
                onChange={(e) => setStudentStatus(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Full-time Student (disqualifies for AOTC)</label>
            </div>
          </>
        )}
        {creditType === 'saver_credit' && (
          <div>
            <label className="block text-sm font-medium mb-1">Retirement Contribution ($)</label>
            <input
              type="number"
              value={retirementContribution}
              onChange={(e) => setRetirementContribution(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">{result.creditName}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Full Credit Amount:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.fullCredit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Phaseout Starts:</span>
            <span className="font-medium ml-2">$ {result.phaseoutStart}</span>
          </div>
          <div>
            <span className="text-zinc-600">Fully Phases Out:</span>
            <span className="font-medium ml-2">$ {result.phaseoutEnd}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Your Credit Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Income Above Threshold:</span>
            <span className="font-medium ml-2">$ {result.incomeAbovePhaseout}</span>
          </div>
          <div>
            <span className="text-zinc-600">Credit Remaining:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.actualCredit) > 0 ? 'text-green-700' : 'text-red-600'}`}>$ {result.actualCredit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Credit Percentage:</span>
            <span className="font-medium ml-2">{result.creditPercent}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Refundable Portion:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.refundable}</span>
          </div>
          <div>
            <span className="text-zinc-600">Eligible:</span>
            <span className={`font-bold ml-2 ${result.eligible && !result.fullyPhasedOut ? 'text-green-600' : 'text-red-600'}`}>
              {result.eligible && !result.fullyPhasedOut ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {result.fullyPhasedOut && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Credit Fully Phased Out</h2>
          <div className="text-sm text-red-700">
            Your income ($ {result.annualIncome}) exceeds the phaseout limit ($ {result.phaseoutEnd}). No credit available.
          </div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Phaseout Range</h2>
        <div className="text-xs text-zinc-600">
          Income range: $ {result.phaseoutStart} - $ {result.phaseoutEnd}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div className="relative h-4">
            <div
              className="bg-green-500 h-4 rounded-l-full"
              style={{ width: `${Math.min(100, (parseFloat(result.phaseoutStart) / parseFloat(result.phaseoutEnd)) * 100)}%` }}
            ></div>
            <div
              className="bg-yellow-500 h-4"
              style={{
                width: `${Math.max(0, Math.min(100, ((Math.min(parseFloat(result.annualIncome), parseFloat(result.phaseoutEnd)) - parseFloat(result.phaseoutStart)) / (parseFloat(result.phaseoutEnd) - parseFloat(result.phaseoutStart))) * 100))}%`,
                marginLeft: `${(parseFloat(result.phaseoutStart) / parseFloat(result.phaseoutEnd)) * 100}%`
              }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>$0</span>
          <span>$ {result.phaseoutStart}</span>
          <span>$ {result.phaseoutEnd}</span>
          <span>Your: $ {result.annualIncome}</span>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Credit Details</h3>
        <div className="text-xs text-zinc-600">{result.explanation}</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Phaseout Mechanics</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Credit reduced gradually as income rises above threshold</li>
          <li>Linear phaseout: constant reduction per dollar of income</li>
          <li>Fully phased out when income reaches upper limit</li>
          <li>Phaseout ranges vary by credit type and filing status</li>
          <li>Plan income to maximize credits before phaseout begins</li>
        </ul>
      </div>
    </div>
  )
}