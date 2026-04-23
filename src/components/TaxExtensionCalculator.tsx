'use client'

import { useState } from 'react'

export default function TaxExtensionCalculator() {
  const [estimatedTax, setEstimatedTax] = useState('')
  const [extensionType, setExtensionType] = useState('personal')
  const [paymentMade, setPaymentMade] = useState('')
  const [reason, setReason] = useState('travel')

  const calculate = () => {
    const tax = parseFloat(estimatedTax) || 15000
    const type = extensionType
    const payment = parseFloat(paymentMade) || 0
    const deadline = type === 'personal' ? 'Oct 15' : 'Sep 15'
    const originalDeadline = type === 'personal' ? 'Apr 15' : 'Mar 15'

    // Calculate penalties for underpayment
    const underpayment = Math.max(0, tax - payment)
    const penaltyRate = 0.005 // 0.5% per month
    const monthsLate = type === 'personal' ? 6 : 6 // 6-month extension

    const penalty = underpayment * penaltyRate * monthsLate
    const interest = underpayment * 0.04 // 4% annual interest
    const totalPenaltyInterest = penalty + interest

    // Safe harbor calculations
    const safeHarbor90 = tax * 0.9 // 90% safe harbor
    const safeHarbor100 = tax * 1.0 // 100% of previous year (110% for high income)
    const minPayment = Math.min(safeHarbor90, safeHarbor100)

    // State extension considerations
    const stateExtensionNeeded = true // Most states require separate extension

    // Business extension specifics
    const businessPenaltyRate = 0.005
    const businessEstimate = tax

    return {
      estimatedTax: tax.toFixed(2),
      paymentMade: payment.toFixed(2),
      underpayment: underpayment.toFixed(2),
      penalty: penalty.toFixed(2),
      interest: interest.toFixed(2),
      totalPenaltyInterest: totalPenaltyInterest.toFixed(2),
      safeHarbor90: safeHarbor90.toFixed(2),
      safeHarbor100: safeHarbor100.toFixed(2),
      minPayment: minPayment.toFixed(2),
      meetsSafeHarbor: payment >= minPayment,
      deadline,
      originalDeadline,
      extensionType: type,
      stateExtensionNeeded,
      penaltyRate: '0.5%/month',
      interestRate: '4%/year',
      monthsExtension: monthsLate
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax Extension Penalty Calculator</h1>
      <p className="text-zinc-600">Calculate penalties and interest for IRS tax extension underpayment.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Extension Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Extension Type</label>
            <select
              value={extensionType}
              onChange={(e) => setExtensionType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="personal">Personal (Form 4868)</option>
              <option value="business">Business (Form 7004)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Estimated Tax Liability</label>
            <input
              type="number"
              value={estimatedTax}
              onChange={(e) => setEstimatedTax(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter estimated total tax"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Payment Made with Extension</label>
            <input
              type="number"
              value={paymentMade}
              onChange={(e) => setPaymentMade(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter amount paid by original deadline"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Reason for Extension</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="travel">Out of country</option>
              <option value="records">Missing records</option>
              <option value="disaster">Natural disaster</option>
              <option value="other">Other valid reason</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Penalty Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Estimated Tax</div>
            <div className="text-2xl font-bold">$${result.estimatedTax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Payment Made</div>
            <div className="text-2xl font-bold">$${result.paymentMade}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Underpayment</div>
            <div className={`text-2xl font-bold ${parseFloat(result.underpayment) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${result.underpayment}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Penalty + Interest</div>
            <div className={`text-2xl font-bold ${parseFloat(result.totalPenaltyInterest) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${result.totalPenaltyInterest}
            </div>
          </div>
        </div>
      </div>

      {result.meetsSafeHarbor ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Safe Harbor Met</h3>
          <div className="text-sm text-green-600">
            Payment of $${result.paymentMade} meets safe harbor requirements (90% of current year or 100% of previous year). No penalty for underpayment, but pay remaining tax by {result.deadline}.
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Underpayment Penalty</h3>
          <div className="text-sm text-red-600">
            Payment below safe harbor minimum of $${result.minPayment}. Penalties: $${result.penalty} + interest $${result.interest}. Pay at least 90% of estimated tax by {result.originalDeadline}.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safe Harbor Rules</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">90% Safe Harbor</div>
            <div className="font-bold">$${result.safeHarbor90}</div>
            <div className="text-xs text-zinc-400">Pay 90% of current year tax</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">100% Safe Harbor</div>
            <div className="font-bold">$${result.safeHarbor100}</div>
            <div className="text-xs text-zinc-400">Pay 100% of previous year (110% for AGI over $150K)</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Extension Deadlines</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Personal (Form 4868)</strong>
            <div className="text-zinc-500">Original: April 15. Extension: Oct 15 (6 months)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Business (Form 7004)</strong>
            <div className="text-zinc-500">Original: March 15. Extension: Sept 15 (6 months)</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Penalty Rates</h3>
        <div className="text-xs text-zinc-600">
          Failure-to-pay penalty: 0.5% per month (max 25%). Interest: 4% annually (variable rate). Penalties accrue from original deadline even with extension. File extension to avoid failure-to-file penalty (5%/month, max 25%).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          Extension extends filing deadline, NOT payment deadline. Must estimate and pay tax by original deadline. Separate state extension may be required. File extension even if can't pay - avoids larger filing penalty. Penalty abatement possible for reasonable cause.
        </div>
      </div>
    </main>
  )
}