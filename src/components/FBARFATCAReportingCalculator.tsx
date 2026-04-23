'use client'

import { useState } from 'react'

export default function FBARFATCAReportingCalculator() {
  const [accountType, setAccountType] = useState<'bank' | 'investment' | 'pension' | 'insurance'>('bank')
  const [totalValue, setTotalValue] = useState(150000)
  const [maxSingleAccount, setMaxSingleAccount] = useState(100000)
  const [numberOfAccounts, setNumberOfAccounts] = useState(3)
  const [country, setCountry] = useState('switzerland')
  const [accountOwnership, setAccountOwnership] = useState<'individual' | 'joint' | 'corporate'>('individual')
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [usCitizen, setUSCitizen] = useState(true)
  const [residentType, setResidentType] = useState<'resident' | 'nonresident'>('resident')

  const calculate = () => {
    // FBAR and FATCA Reporting Requirements
    // FBAR (FinCEN 114): $10,000 threshold, all accounts aggregated
    // FATCA (Form 8938): higher threshold, different by filing status

    // FBAR Threshold
    const fbarThreshold = 10000
    const fbarRequired = totalValue > fbarThreshold

    // FATCA Thresholds (2024)
    // Single living in US: $50,000 end of year or $75,000 anytime
    // Married living in US: $100,000 end or $150,000 anytime
    // Single living abroad: $200,000 end or $300,000 anytime
    // Married living abroad: $400,000 end or $600,000 anytime

    const fatcaThresholds = {
      single_us: { endOfYear: 50000, anytime: 75000 },
      married_us: { endOfYear: 100000, anytime: 150000 },
      single_abroad: { endOfYear: 200000, anytime: 300000 },
      married_abroad: { endOfYear: 400000, anytime: 600000 },
    }

    // Determine FATCA threshold based on status
    let fatcaThreshold = { endOfYear: 0, anytime: 0 }
    if (residentType === 'resident') {
      if (filingStatus === 'single') {
        fatcaThreshold = fatcaThresholds.single_us
      } else {
        fatcaThreshold = fatcaThresholds.married_us
      }
    } else {
      if (filingStatus === 'single') {
        fatcaThreshold = fatcaThresholds.single_abroad
      } else {
        fatcaThreshold = fatcaThresholds.married_abroad
      }
    }

    const fatcaRequired = totalValue > fatcaThreshold.endOfYear || maxSingleAccount > fatcaThreshold.anytime

    // FBAR filing deadline: April 15 (automatic extension to October 15)
    // FATCA: filed with tax return (April 15 or extended)

    // Reporting forms
    const fbarForm = 'FinCEN Form 114 (FBAR) - filed electronically'
    const fatcaForm = 'Form 8938 - Statement of Specified Foreign Financial Assets'

    // Penalty structure
    // FBAR non-willful: up to $15,637 per violation (2024)
    // FBAR willful: up to $156,373 or 50% of account balance
    // FATCA: $10,000 failure to file, up to $50,000 continued failure

    const fbarNonWillfulPenalty = 15637
    const fbarWillfulPenaltyMax = 156373
    const fbarWillfulPenaltyPercent = 50
    const fatcaPenaltyInitial = 10000
    const fatcaPenaltyContinued = 50000

    // Calculate potential penalties
    const fbarWillfulPenalty = Math.min(fbarWillfulPenaltyMax, totalValue * (fbarWillfulPenaltyPercent / 100))
    const fbarPotentialPenalty = fbarWillfulPenalty // Worst case

    // Account types that must be reported
    const reportableAccountTypes = [
      'Bank accounts (checking, savings)',
      'Investment accounts (brokerage)',
      'Pension/retirement accounts',
      'Insurance policies with cash value',
      'Mutual funds',
      'Foreign trusts',
    ]

    // Exceptions to reporting
    const exceptions = [
      'US military banking facilities',
      'Accounts owned by international organizations',
      'Correspondent/nostro accounts (banks)',
      'Accounts with only signature authority',
    ]

    // Required information for reporting
    const requiredInfo = [
      'Account number',
      'Name of financial institution',
      'Maximum value during year',
      'Address of institution',
      'Type of account',
    ]

    // Deadline status
    const fbarDeadline = 'April 15 (auto extension to Oct 15)'
    const fatcaDeadline = 'April 15 (with tax return)'

    // Compliance recommendation
    let recommendation = ''
    if (fbarRequired && fatcaRequired) {
      recommendation = 'Both FBAR and Form 8938 required - file both by April 15'
    } else if (fbarRequired) {
      recommendation = 'FBAR required - file FinCEN 114 electronically by April 15'
    } else if (fatcaRequired) {
      recommendation = 'Form 8938 required - file with your tax return'
    } else {
      recommendation = 'Below thresholds - no reporting required this year'
    }

    // Willful vs non-willful determination factors
    const willfulFactors = [
      'Knowingly failed to file',
      'Received notice and still didn\'t file',
      'Attempted to hide accounts',
      'Used foreign accounts to evade taxes',
    ]

    // Voluntary disclosure options
    const voluntaryOptions = [
      'IRS Voluntary Disclosure Program',
      'Streamlined Filing Compliance Procedures',
      'Delinquent FBAR Submission Procedures',
      'Delinquent International Information Return Submission Procedures',
    ]

    return {
      accountType,
      totalValue: totalValue.toFixed(0),
      maxSingleAccount: maxSingleAccount.toFixed(0),
      numberOfAccounts: numberOfAccounts.toFixed(0),
      country,
      accountOwnership,
      filingStatus,
      usCitizen,
      residentType,
      fbarThreshold: fbarThreshold.toFixed(0),
      fbarRequired,
      fatcaThresholdEnd: fatcaThreshold.endOfYear.toFixed(0),
      fatcaThresholdAnytime: fatcaThreshold.anytime.toFixed(0),
      fatcaRequired,
      fbarForm,
      fatcaForm,
      fbarNonWillfulPenalty: fbarNonWillfulPenalty.toFixed(0),
      fbarWillfulPenaltyMax: fbarWillfulPenaltyMax.toFixed(0),
      fbarWillfulPenaltyPercent: fbarWillfulPenaltyPercent.toFixed(0),
      fbarPotentialPenalty: fbarPotentialPenalty.toFixed(0),
      fatcaPenaltyInitial: fatcaPenaltyInitial.toFixed(0),
      fatcaPenaltyContinued: fatcaPenaltyContinued.toFixed(0),
      reportableAccountTypes,
      exceptions,
      requiredInfo,
      fbarDeadline,
      fatcaDeadline,
      recommendation,
      willfulFactors,
      voluntaryOptions,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">FBAR/FATCA Reporting Calculator</h1>
      <p className="text-gray-600 mb-4">Determine foreign account reporting requirements and penalties.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value as 'bank' | 'investment' | 'pension' | 'insurance')} className="w-full border rounded p-2">
            <option value="bank">Bank Account</option>
            <option value="investment">Investment/Brokerage</option>
            <option value="pension">Pension/Retirement</option>
            <option value="insurance">Insurance (cash value)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Foreign Account Value</label>
          <input type="number" value={totalValue} onChange={(e) => setTotalValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Single Account Value</label>
          <input type="number" value={maxSingleAccount} onChange={(e) => setMaxSingleAccount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Accounts</label>
          <input type="number" value={numberOfAccounts} min="1" max="50" onChange={(e) => setNumberOfAccounts(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Residence Type</label>
          <select value={residentType} onChange={(e) => setResidentType(e.target.value as 'resident' | 'nonresident')} className="w-full border rounded p-2">
            <option value="resident">US Resident</option>
            <option value="nonresident">Living Abroad</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.fbarRequired ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.fbarRequired ? 'text-orange-700' : 'text-green-700'}`}>FBAR Requirement</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Threshold:</span><span className="font-medium ml-2">$ {result.fbarThreshold}</span></div>
          <div><span className="text-zinc-600">Your Total:</span><span className="font-medium ml-2">$ {result.totalValue}</span></div>
          <div><span className="text-zinc-600">Required:</span><span className={`font-bold ml-2 ${result.fbarRequired ? 'text-orange-700' : 'text-green-700'}`}>{result.fbarRequired ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Form:</span><span className="font-medium ml-2">{result.fbarForm}</span></div>
          <div><span className="text-zinc-600">Deadline:</span><span className="font-medium ml-2">{result.fbarDeadline}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FBAR aggregates ALL foreign accounts. $10,000 threshold is total, not per account.</div>
      </div>

      <div className={`card mb-6 ${result.fatcaRequired ? 'bg-purple-50 border border-purple-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.fatcaRequired ? 'text-purple-700' : 'text-green-700'}`}>FATCA (Form 8938) Requirement</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">End-of-Year:</span><span className="font-medium ml-2">$ {result.fatcaThresholdEnd}</span></div>
          <div><span className="text-zinc-600">Anytime Max:</span><span className="font-medium ml-2">$ {result.fatcaThresholdAnytime}</span></div>
          <div><span className="text-zinc-600">Required:</span><span className={`font-bold ml-2 ${result.fatcaRequired ? 'text-purple-700' : 'text-green-700'}`}>{result.fatcaRequired ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Form:</span><span className="font-medium ml-2">{result.fatcaForm}</span></div>
          <div><span className="text-zinc-600">Deadline:</span><span className="font-medium ml-2">{result.fatcaDeadline}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FATCA thresholds vary by filing status and residence. Higher than FBAR.</div>
      </div>

      {(result.fbarRequired || result.fatcaRequired) && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Penalty Warning</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">FBAR Non-Willful:</span><span className="font-medium ml-2">$ {result.fbarNonWillfulPenalty}</span></div>
            <div><span className="text-zinc-600">FBAR Willful:</span><span className="font-bold text-red-700 ml-2">$ {result.fbarPotentialPenalty}</span></div>
            <div><span className="text-zinc-600">FATCA Initial:</span><span className="font-medium ml-2">$ {result.fatcaPenaltyInitial}</span></div>
          </div>
          <div className="text-xs text-red-600 mt-2">Willful FBAR: up to $156k or 50% of balance. FATCA: $10k initial, $50k continued.</div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Threshold Comparison</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div><span className="font-semibold">FBAR:</span> $10,000 (aggregated, all filers)</div>
          <div><span className="font-semibold">FATCA Single US:</span> $50,000 EOY or $75,000 anytime</div>
          <div><span className="font-semibold">FATCA Married US:</span> $100,000 EOY or $150,000 anytime</div>
          <div><span className="font-semibold">FATCA Abroad:</span> $200k-$400k (higher thresholds)</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FBAR threshold is lower. Many must file FBAR but not FATCA.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Reportable Account Types</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.reportableAccountTypes.slice(0, 4).map((type, i) => (
            <li key={i}>{type}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Bank, investment, pension, and insurance accounts with cash value.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Required Information</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.requiredInfo.map((info, i) => (
            <li key={i}>{info}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Gather this information before filing. Maximum value during year required.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600 font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">FBAR/FATCA Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>FBAR: $10k threshold, all accounts</li>
          <li>FATCA: higher, varies by status</li>
          <li>FBAR deadline: April 15</li>
          <li>FATCA: with tax return</li>
          <li>FBAR: electronic only (BSA)</li>
          <li>Penalties: up to $156k willful</li>
          <li>50% of balance possible</li>
          <li>Voluntary disclosure available</li>
          <li>Streamlined procedures</li>
          <li>File timely to avoid penalties</li>
        </ul>
      </div>
    </div>
  )
}