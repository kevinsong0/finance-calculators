'use client'

import { useState } from 'react'

export default function EarlyWithdrawalPenaltyCalculator() {
  const [withdrawalAmount, setWithdrawalAmount] = useState(50000)
  const [accountType, setAccountType] = useState<'401k' | 'traditional_ira' | 'roth_ira' | 'roth_401k'>('401k')
  const [age, setAge] = useState(45)
  const [withdrawalReason, setWithdrawalReason] = useState<'general' | 'disability' | 'medical' | 'first_home' | 'education' | 'birth_adoption' | 'military' | 'death'>('general')
  const [medicalExpensePercent, setMedicalExpensePercent] = useState(7.5)
  const [agi, setAGI] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [rothContributions, setRothContributions] = useState(20000)
  const [rothAccountAge, setRothAccountAge] = useState(3)

  const calculate = () => {
    const penaltyRate = 0.10
    const isExempt = age >= 59.5 || withdrawalReason !== 'general'
    const is59Half = age >= 59.5
    const is55Separation = accountType === '401k' && age >= 55

    let penaltyExemptAmount = 0
    let taxableAmount = withdrawalAmount
    let penaltyAmount = 0
    let exemptionReason = ''

    if (is59Half) {
      penaltyExemptAmount = withdrawalAmount
      exemptionReason = 'Age 59.5 or older'
    } else if (is55Separation) {
      penaltyExemptAmount = withdrawalAmount
      exemptionReason = 'Age 55+ separated from service (401k rule)'
    } else if (withdrawalReason === 'disability') {
      penaltyExemptAmount = withdrawalAmount
      exemptionReason = 'Total and permanent disability'
    } else if (withdrawalReason === 'death') {
      penaltyExemptAmount = withdrawalAmount
      exemptionReason = 'Beneficiary distribution'
    } else if (withdrawalReason === 'medical') {
      const medicalThreshold = agi * (medicalExpensePercent / 100)
      penaltyExemptAmount = Math.min(withdrawalAmount, medicalThreshold)
      exemptionReason = `Medical expenses exceeding ${medicalExpensePercent}% AGI`
    } else if (withdrawalReason === 'first_home' && accountType === 'roth_ira') {
      penaltyExemptAmount = Math.min(withdrawalAmount, 10000)
      exemptionReason = 'First-time homebuyer (Roth IRA: $10K lifetime limit)'
    } else if (withdrawalReason === 'education' && (accountType === 'traditional_ira' || accountType === 'roth_ira')) {
      penaltyExemptAmount = withdrawalAmount
      exemptionReason = 'Qualified education expenses (IRA only)'
    } else if (withdrawalReason === 'birth_adoption') {
      penaltyExemptAmount = Math.min(withdrawalAmount, 5000)
      exemptionReason = 'Birth or adoption (IRAs: $5K per event)'
    } else if (withdrawalReason === 'military') {
      penaltyExemptAmount = withdrawalAmount
      exemptionReason = 'Military reservist called to active duty'
    }

    if (accountType === 'roth_ira' || accountType === 'roth_401k') {
      if (rothContributions >= withdrawalAmount) {
        taxableAmount = 0
        penaltyAmount = 0
        exemptionReason = 'Withdrawal of contributions (tax-free, penalty-free)'
      } else if (rothAccountAge >= 5 && is59Half) {
        taxableAmount = Math.max(0, withdrawalAmount - rothContributions)
        penaltyAmount = 0
        exemptionReason = 'Qualified Roth distribution (5-year rule + age 59.5)'
      } else {
        const earningsWithdrawn = Math.max(0, withdrawalAmount - rothContributions)
        taxableAmount = earningsWithdrawn
        penaltyAmount = earningsWithdrawn * penaltyRate
      }
    } else {
      taxableAmount = withdrawalAmount - penaltyExemptAmount
      penaltyAmount = Math.max(0, taxableAmount * penaltyRate)
    }

    let marginalRate = 0.22
    if (filingStatus === 'single') {
      if (agi <= 11000) marginalRate = 0.10
      else if (agi <= 44725) marginalRate = 0.12
      else if (agi <= 95475) marginalRate = 0.22
      else if (agi <= 182100) marginalRate = 0.24
      else marginalRate = 0.32
    } else {
      if (agi <= 22000) marginalRate = 0.10
      else if (agi <= 89450) marginalRate = 0.12
      else if (agi <= 190750) marginalRate = 0.22
      else if (agi <= 364200) marginalRate = 0.24
      else marginalRate = 0.32
    }

    const incomeTax = taxableAmount * marginalRate
    const totalTax = incomeTax + penaltyAmount
    const netWithdrawal = withdrawalAmount - totalTax
    const effectivePenaltyRate = (totalTax / withdrawalAmount) * 100

    return {
      withdrawalAmount: withdrawalAmount.toFixed(2),
      accountType,
      age: age.toFixed(0),
      withdrawalReason,
      is59Half,
      is55Separation,
      penaltyExemptAmount: penaltyExemptAmount.toFixed(2),
      taxableAmount: taxableAmount.toFixed(2),
      penaltyRate: (penaltyRate * 100).toFixed(0),
      penaltyAmount: penaltyAmount.toFixed(2),
      marginalRate: (marginalRate * 100).toFixed(0),
      incomeTax: incomeTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netWithdrawal: netWithdrawal.toFixed(2),
      effectivePenaltyRate: effectivePenaltyRate.toFixed(2),
      exemptionReason,
      rothContributions: rothContributions.toFixed(2),
      rothAccountAge: rothAccountAge.toFixed(0),
      hasPenalty: penaltyAmount > 0,
      isExempt,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Early Withdrawal Penalty Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate 10% early withdrawal penalty and tax on retirement account distributions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Withdrawal Amount ($)</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as '401k' | 'traditional_ira' | 'roth_ira' | 'roth_401k')}
            className="w-full border rounded p-2"
          >
            <option value="401k">401(k)</option>
            <option value="traditional_ira">Traditional IRA</option>
            <option value="roth_ira">Roth IRA</option>
            <option value="roth_401k">Roth 401(k)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age at Withdrawal</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Withdrawal Reason</label>
          <select
            value={withdrawalReason}
            onChange={(e) => setWithdrawalReason(e.target.value as 'general' | 'disability' | 'medical' | 'first_home' | 'education' | 'birth_adoption' | 'military' | 'death')}
            className="w-full border rounded p-2"
          >
            <option value="general">General (no exemption)</option>
            <option value="disability">Total and permanent disability</option>
            <option value="medical">Medical expenses</option>
            <option value="first_home">First-time home purchase</option>
            <option value="education">Education expenses</option>
            <option value="birth_adoption">Birth or adoption</option>
            <option value="military">Military reservist call-up</option>
            <option value="death">Death (beneficiary)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">AGI ($)</label>
          <input
            type="number"
            value={agi}
            onChange={(e) => setAGI(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        {(accountType === 'roth_ira' || accountType === 'roth_401k') && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Roth Contributions Total ($)</label>
              <input
                type="number"
                value={rothContributions}
                onChange={(e) => setRothContributions(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Roth Account Age (years)</label>
              <input
                type="number"
                value={rothAccountAge}
                onChange={(e) => setRothAccountAge(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Withdrawal Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Withdrawal:</span>
            <span className="font-medium ml-2">$ {result.withdrawalAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Account:</span>
            <span className="font-medium ml-2">{result.accountType}</span>
          </div>
          <div>
            <span className="text-zinc-600">Age:</span>
            <span className="font-medium ml-2">{result.age}</span>
          </div>
          <div>
            <span className="text-zinc-600">Reason:</span>
            <span className="font-medium ml-2">{result.withdrawalReason}</span>
          </div>
        </div>
      </div>

      {result.exemptionReason && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Exemption Applied</h2>
          <div className="text-sm text-green-700">{result.exemptionReason}</div>
          <div className="mt-2">
            <span className="text-zinc-600">Exempt Amount:</span>
            <span className="font-medium ml-2">$ {result.penaltyExemptAmount}</span>
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax & Penalty</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Taxable Amount:</span>
            <span className="font-medium ml-2">$ {result.taxableAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Income Tax ({result.marginalRate}%):</span>
            <span className="font-medium ml-2">$ {result.incomeTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">10% Penalty:</span>
            <span className="font-medium ml-2 text-red-600">$ {result.penaltyAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Amount:</span>
            <span className="font-bold ml-2">$ {result.netWithdrawal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-medium ml-2">{result.effectivePenaltyRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Early Withdrawal Penalty Rules</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>10% Penalty:</strong> Applies to withdrawals before age 59.5 (except exemptions). Plus ordinary income tax on distribution amount. Combined cost can exceed 30-40% for high earners.</p>
          <p><strong>Age 55 Rule (401k):</strong> If separated from employer at age 55 or older, no penalty on 401k withdrawal. Does NOT apply to IRAs.</p>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Penalty Exemptions</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Age 59.5 or older (any account)</li>
          <li>Disability (total and permanent)</li>
          <li>Death (beneficiary receives distribution)</li>
          <li>Medical expenses exceeding 7.5% AGI</li>
          <li>First home (Roth IRA: $10K lifetime limit)</li>
          <li>Education (IRA only, qualified expenses)</li>
          <li>Birth/adoption (IRAs: $5K per event)</li>
          <li>Military reservist called to active duty</li>
          <li>Substantially equal periodic payments (72t)</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Roth Withdrawal Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Contributions withdrawn first: always tax-free, penalty-free</li>
          <li>Earnings taxable if not qualified distribution</li>
          <li>Qualified: 5-year holding + age 59.5 (or exemption)</li>
          <li>Non-qualified earnings: income tax + 10% penalty</li>
          <li>Order: contributions first, then conversions, then earnings</li>
        </ul>
      </div>
    </div>
  )
}