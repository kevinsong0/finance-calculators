'use client'

import { useState } from 'react'

export default function BusinessLossLimitationCalculator() {
  const [businessLoss, setBusinessLoss] = useState(500000)
  const [taxYear, setTaxYear] = useState(2024)
  const [ownerType, setOwnerType] = useState<'individual' | 'corporation'>('individual')
  const [w2Income, setW2Income] = useState(100000)
  const [otherIncome, setOtherIncome] = useState(50000)
  const [basisLimitation, setBasisLimitation] = useState(200000)
  const [atRiskLimitation, setAtRiskLimitation] = useState(200000)
  const [passiveIncome, setPassiveIncome] = useState(30000)

  const calculate = () => {
    // Business Loss Limitation Calculator
    // Multiple limitations apply to business losses

    // 1. Excess Business Loss Limitation (TCJA):
    // - Individuals limited to threshold amount
    // - 2021-2028: $262,000 single, $524,000 joint (indexed)
    // - Losses carryforward as NOL

    // 2. Basis Limitation:
    // - Loss limited to owner's basis in entity
    // - Applies to S corps, partnerships

    // 3. At-Risk Limitation:
    // - Loss limited to amount investor has at risk
    // - Excludes nonrecourse financing

    // 4. Passive Activity Limitation:
    // - Passive losses only offset passive income
    // - Unless REPS qualification

    // Threshold amounts by year (individuals)
    const thresholds: Record<number, { single: number; joint: number }> = {
      2021: { single: 262000, joint: 524000 },
      2022: { single: 270000, joint: 540000 },
      2023: { single: 289000, joint: 578000 },
      2024: { single: 305000, joint: 610000 },
      2025: { single: 313000, joint: 626000 },
    }

    const threshold = thresholds[taxYear] || thresholds[2024]
    const filingStatus = 'single' // Simplified
    const excessLossThreshold = threshold.single

    // Calculate total income
    const totalIncome = w2Income + otherIncome + passiveIncome

    // Apply limitations in order
    let remainingLoss = businessLoss

    // 1. Basis limitation
    const basisLimitedLoss = Math.min(remainingLoss, basisLimitation)
    const basisExcess = remainingLoss - basisLimitedLoss
    remainingLoss = basisLimitedLoss

    // 2. At-risk limitation
    const atRiskLimitedLoss = Math.min(remainingLoss, atRiskLimitation)
    const atRiskExcess = remainingLoss - atRiskLimitedLoss
    remainingLoss = atRiskLimitedLoss

    // 3. Passive limitation (if applicable)
    const passiveLimitedLoss = Math.min(remainingLoss, passiveIncome)
    const passiveExcess = remainingLoss - passiveLimitedLoss
    // Note: Passive excess carries forward, not immediately deductible

    // 4. Excess business loss limitation (individuals only)
    let excessBusinessLoss = 0
    let allowedLoss = remainingLoss

    if (ownerType === 'individual') {
      excessBusinessLoss = Math.max(0, remainingLoss - excessLossThreshold)
      allowedLoss = Math.min(remainingLoss, excessLossThreshold)
    }

    // Total deductions allowed
    const totalAllowed = basisExcess + atRiskExcess + passiveExcess + excessBusinessLoss === 0
      ? Math.min(basisLimitedLoss, atRiskLimitedLoss, passiveLimitedLoss, allowedLoss)
      : allowedLoss

    // Net taxable income after losses
    const netTaxableIncome = totalIncome - totalAllowed

    // Loss carryforwards
    const nolCarryforward = excessBusinessLoss
    const suspendedPassiveLoss = passiveExcess
    const basisSuspendedLoss = basisExcess
    const atRiskSuspendedLoss = atRiskExcess

    // Total suspended losses
    const totalSuspended = basisSuspendedLoss + atRiskSuspendedLoss + suspendedPassiveLoss + nolCarryforward

    // Tax benefit calculation
    const taxRate = 0.24
    const taxBenefitLost = totalSuspended * taxRate

    // Recommendation
    let recommendation = ''
    if (totalSuspended > 0) {
      recommendation = `Business loss of $${businessLoss.toFixed(0)} partially limited. Total suspended: $${totalSuspended.toFixed(0)}. Basis suspended: $${basisSuspendedLoss.toFixed(0)}. At-risk suspended: $${atRiskSuspendedLoss.toFixed(0)}. Passive suspended: $${suspendedPassiveLoss.toFixed(0)}. NOL carryforward: $${nolCarryforward.toFixed(0)}. Tax benefit deferred: $${taxBenefitLost.toFixed(0)}.`
    } else {
      recommendation = `Full loss deduction allowed. No limitations exceeded. Deduct $${businessLoss.toFixed(0)} against $${totalIncome.toFixed(0)} income. Net taxable: $${netTaxableIncome.toFixed(0)}.`
    }

    if (basisSuspendedLoss > 0) {
      recommendation += ' Increase basis through capital contribution or debt assumption.'
    }
    if (atRiskSuspendedLoss > 0) {
      recommendation += ' Increase at-risk amount through additional investment.'
    }
    if (suspendedPassiveLoss > 0) {
      recommendation += ' Consider REPS qualification or generate passive income.'
    }

    // Limitation hierarchy
    const limitationHierarchy = [
      { limitation: 'Basis', amount: basisLimitation, suspended: basisSuspendedLoss },
      { limitation: 'At-Risk', amount: atRiskLimitation, suspended: atRiskSuspendedLoss },
      { limitation: 'Passive', amount: passiveIncome, suspended: suspendedPassiveLoss },
      { limitation: 'Excess Business Loss', amount: excessLossThreshold, suspended: nolCarryforward },
    ]

    return {
      businessLoss: businessLoss.toFixed(0),
      taxYear,
      ownerType,
      w2Income: w2Income.toFixed(0),
      otherIncome: otherIncome.toFixed(0),
      passiveIncome: passiveIncome.toFixed(0),
      totalIncome: totalIncome.toFixed(0),
      basisLimitation: basisLimitation.toFixed(0),
      atRiskLimitation: atRiskLimitation.toFixed(0),
      excessLossThreshold: excessLossThreshold.toFixed(0),
      basisSuspendedLoss: basisSuspendedLoss.toFixed(0),
      atRiskSuspendedLoss: atRiskSuspendedLoss.toFixed(0),
      suspendedPassiveLoss: suspendedPassiveLoss.toFixed(0),
      nolCarryforward: nolCarryforward.toFixed(0),
      totalSuspended: totalSuspended.toFixed(0),
      allowedLoss: totalAllowed.toFixed(0),
      netTaxableIncome: netTaxableIncome.toFixed(0),
      taxBenefitLost: taxBenefitLost.toFixed(0),
      limitationHierarchy,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Business Loss Limitation Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate multiple limitations on business loss deductions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Business Loss Amount</label>
          <input type="number" value={businessLoss} onChange={(e) => setBusinessLoss(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <select value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Owner Type</label>
          <select value={ownerType} onChange={(e) => setOwnerType(e.target.value as 'individual' | 'corporation')} className="w-full border rounded p-2">
            <option value="individual">Individual (S corp/LLC)</option>
            <option value="corporation">C Corporation</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Income Sources</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">W-2 Income</label>
            <input type="number" value={w2Income} onChange={(e) => setW2Income(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Other Income</label>
            <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Passive Income</label>
            <input type="number" value={passiveIncome} onChange={(e) => setPassiveIncome(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Limitation Amounts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Basis in Entity</label>
            <input type="number" value={basisLimitation} onChange={(e) => setBasisLimitation(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">At-Risk Amount</label>
            <input type="number" value={atRiskLimitation} onChange={(e) => setAtRiskLimitation(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          {ownerType === 'individual' && (
            <div><span className="text-zinc-600">Excess Loss Threshold:</span><span className="font-bold ml-2">$ {result.excessLossThreshold}</span></div>
          )}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Limitation Hierarchy</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Limitation Type</th>
                <th className="py-2 text-left">Amount Available</th>
                <th className="py-2 text-left">Suspended Loss</th>
              </tr>
            </thead>
            <tbody>
              {result.limitationHierarchy.map((l) => (
                <tr key={l.limitation} className="border-b">
                  <td className="py-1 font-semibold">{l.limitation}</td>
                  <td className="py-1">$ {l.amount.toFixed(0)}</td>
                  <td className="py-1 font-semibold text-red-700">$ {l.suspended.toFixed(0)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="py-1">Total Suspended</td>
                <td className="py-1"></td>
                <td className="py-1 text-red-700">$ {result.totalSuspended}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Business Loss:</span><span className="font-medium ml-2">$ {result.businessLoss}</span></div>
          <div><span className="text-zinc-600">Total Income:</span><span className="font-medium ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Allowed Loss:</span><span className="font-bold text-green-700 ml-2">$ {result.allowedLoss}</span></div>
          <div><span className="text-zinc-600">Net Taxable:</span><span className="font-medium ml-2">$ {result.netTaxableIncome}</span></div>
          <div><span className="text-zinc-600">Total Suspended:</span><span className="font-bold text-red-700 ml-2">$ {result.totalSuspended}</span></div>
          <div><span className="text-zinc-600">Tax Benefit Lost:</span><span className="font-bold text-red-700 ml-2">$ {result.taxBenefitLost}</span></div>
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Loss Limitation Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Limitations applied in order: basis → at-risk → passive → excess</li>
          <li>Basis: owner's investment in entity</li>
          <li>At-risk: actual economic investment</li>
          <li>Passive: only offsets passive income</li>
          <li>Excess business loss: annual threshold</li>
          <li>C corps not subject to excess loss limit</li>
          <li>Suspended losses carryforward</li>
          <li>Track on K-1 and Form 8582</li>
          <li>Plan to increase basis/at-risk</li>
          <li>REPS eliminates passive limit</li>
        </ul>
      </div>
    </div>
  )
}