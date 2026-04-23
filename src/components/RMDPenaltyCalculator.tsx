'use client'

import { useState } from 'react'

export default function RMDPenaltyCalculator() {
  const [rmdAmount, setRmdAmount] = useState(20000)
  const [amountWithdrawn, setAmountWithdrawn] = useState(15000)
  const [missedYear, setMissedYear] = useState(2024)
  const [withdrawalDate, setWithdrawalDate] = useState('2025-03-15')
  const [waiverRequested, setWaiverRequested] = useState(false)
  const [reasonableCause, setReasonableCause] = useState('')

  const calculate = () => {
    const shortfall = rmdAmount - amountWithdrawn
    const penaltyRate = 0.25
    const penaltyAmount = shortfall * penaltyRate
    const excessPenaltyRate = 0.10
    const excessPenalty = shortfall > 0 ? 0 : Math.abs(shortfall) * excessPenaltyRate

    const missedAmount = shortfall > 0 ? shortfall : 0
    const missedPenalty = missedAmount * penaltyRate

    const currentDate = new Date()
    const missedYearDate = new Date(missedYear, 11, 31)
    const withdrawalDateTime = new Date(withdrawalDate)
    const daysLate = Math.max(0, Math.floor((withdrawalDateTime.getTime() - missedYearDate.getTime()) / (1000 * 60 * 60 * 24)))

    const irsForm = 'Form 5329'
    const waiverPossible = waiverRequested && reasonableCause.length > 0
    const lateFiling = daysLate > 60

    return {
      rmdAmount: rmdAmount.toFixed(2),
      amountWithdrawn: amountWithdrawn.toFixed(2),
      shortfall: shortfall.toFixed(2),
      missedAmount: missedAmount.toFixed(2),
      penaltyRate: (penaltyRate * 100).toFixed(0),
      penaltyAmount: missedPenalty.toFixed(2),
      excessWithdrawn: shortfall < 0 ? Math.abs(shortfall).toFixed(2) : '0.00',
      excessPenaltyRate: (excessPenaltyRate * 100).toFixed(0),
      excessPenalty: shortfall < 0 ? excessPenalty.toFixed(2) : '0.00',
      missedYear: missedYear.toFixed(0),
      daysLate: daysLate.toFixed(0),
      withdrawalDate,
      irsForm,
      waiverRequested,
      waiverPossible,
      reasonableCause,
      lateFiling,
      hasPenalty: missedAmount > 0,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">RMD Penalty Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate missed RMD penalty (25% excise tax) and waiver options.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Required RMD Amount ($)</label>
          <input
            type="number"
            value={rmdAmount}
            onChange={(e) => setRmdAmount(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount Withdrawn ($)</label>
          <input
            type="number"
            value={amountWithdrawn}
            onChange={(e) => setAmountWithdrawn(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Missed RMD Year</label>
          <input
            type="number"
            value={missedYear}
            onChange={(e) => setMissedYear(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Actual Withdrawal Date</label>
          <input
            type="date"
            value={withdrawalDate}
            onChange={(e) => setWithdrawalDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={waiverRequested}
            onChange={(e) => setWaiverRequested(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Requesting waiver (Form 5329)</span>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reasonable Cause Explanation</label>
          <input
            type="text"
            value={reasonableCause}
            onChange={(e) => setReasonableCause(e.target.value)}
            placeholder="Describe reasonable cause..."
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">RMD Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Required Amount:</span>
            <span className="font-medium ml-2">$ {result.rmdAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Amount Withdrawn:</span>
            <span className="font-medium ml-2">$ {result.amountWithdrawn}</span>
          </div>
          <div>
            <span className="text-zinc-600">Shortfall:</span>
            <span className="font-medium ml-2">$ {result.shortfall}</span>
          </div>
          <div>
            <span className="text-zinc-600">Days Late:</span>
            <span className="font-medium ml-2">{result.daysLate}</span>
          </div>
          <div>
            <span className="text-zinc-600">Missed Year:</span>
            <span className="font-medium ml-2">{result.missedYear}</span>
          </div>
        </div>
      </div>

      {result.hasPenalty && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Penalty Calculation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Missed Amount:</span>
              <span className="font-medium ml-2">$ {result.missedAmount}</span>
            </div>
            <div>
              <span className="text-zinc-600">Penalty Rate:</span>
              <span className="font-medium ml-2 text-red-600">{result.penaltyRate}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Penalty Amount:</span>
              <span className="font-bold text-red-700 ml-2">$ {result.penaltyAmount}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-3">
            The 25% excise tax applies to any shortfall in your RMD. File Form 5329 to report and pay the penalty, or request waiver.
          </div>
        </div>
      )}

      {result.waiverRequested && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Waiver Request</h2>
          <div className="text-sm text-zinc-600">
            {result.waiverPossible ? (
              <p className="text-green-700">Waiver may be granted if IRS accepts your reasonable cause explanation. File Form 5329 and attach statement explaining circumstances.</p>
            ) : (
              <p className="text-orange-600">Provide reasonable cause explanation to request waiver. Without explanation, waiver unlikely.</p>
            )}
          </div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">RMD Penalty Rules</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>25% Excise Tax:</strong> Penalty on any shortfall from required minimum distribution. One of the steepest IRS penalties. RMD deadline: December 31 each year (April 1 for first year after turning 73).</p>
          <p><strong>Form 5329:</strong> Report the missed RMD and pay penalty. File separately from Form 1040. Can request waiver by attaching reasonable cause statement. IRS may grant waiver for documented circumstances.</p>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Reasonable Cause for Waiver</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Serious illness or medical condition preventing withdrawal</li>
          <li>Death of family member causing financial disruption</li>
          <li>Natural disaster affecting ability to manage finances</li>
          <li>Financial institution error preventing distribution</li>
          <li>Confusion about RMD rules (limited acceptance)</li>
          <li>Custodian provided incorrect information</li>
          <li>Documented proof required for each reason</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Avoiding RMD Penalty</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Set up automatic RMD withdrawals with custodian</li>
          <li>Calendar reminder: RMD deadline December 31</li>
          <li>First RMD: deadline April 1 following year you turn 73</li>
          <li>Calculate RMD early in year (use calculator tools)</li>
          <li>Verify withdrawal completed before year-end</li>
          <li>Request waiver promptly if missed (better chance if quick)</li>
          <li>Keep documentation of all withdrawal attempts</li>
        </ul>
      </div>
    </div>
  )
}