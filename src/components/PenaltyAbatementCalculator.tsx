'use client'

import { useState } from 'react'

export default function PenaltyAbatementCalculator() {
  const [penaltyAmount, setPenaltyAmount] = useState(5000)
  const [penaltyType, setPenaltyType] = useState<'failure_to_file' | 'failure_to_pay' | 'accuracy' | 'deposit' | 'estimated'>('failure_to_file')
  const [firstTimeAbatement, setFirstTimeAbatement] = useState(false)
  const [cleanHistory, setCleanHistory] = useState(true)
  const [reasonableCause, setReasonableCause] = useState('')
  const [penaltyYears, setPenaltyYears] = useState(3)

  const calculate = () => {
    const ftaEligible = firstTimeAbatement && cleanHistory && penaltyYears >= 3
    const ftaAmount = ftaEligible ? penaltyAmount : 0

    const reasonableCauseEligible = reasonableCause.length > 0
    const rcAmount = reasonableCauseEligible ? penaltyAmount * 0.5 : 0

    const totalAbatement = Math.min(penaltyAmount, ftaAmount + rcAmount)
    const remainingPenalty = penaltyAmount - totalAbatement

    const penaltyTypes = {
      failure_to_file: 'Failure to File (5% per month)',
      failure_to_pay: 'Failure to Pay (0.5% per month)',
      accuracy: 'Accuracy-Related (20%)',
      deposit: 'Failure to Deposit',
      estimated: 'Estimated Tax Underpayment',
    }

    const ftaApplicable = penaltyType === 'failure_to_file' || penaltyType === 'failure_to_pay'
    const rcApplicable = true

    return {
      penaltyAmount: penaltyAmount.toFixed(2),
      penaltyType: penaltyTypes[penaltyType],
      penaltyTypeCode: penaltyType,
      firstTimeAbatement,
      cleanHistory,
      penaltyYears: penaltyYears.toFixed(0),
      ftaEligible,
      ftaAmount: ftaAmount.toFixed(2),
      ftaApplicable,
      reasonableCause: reasonableCause.slice(0, 100),
      reasonableCauseEligible,
      rcAmount: rcAmount.toFixed(2),
      rcApplicable,
      totalAbatement: totalAbatement.toFixed(2),
      remainingPenalty: remainingPenalty.toFixed(2),
      savingsPercent: ((totalAbatement / penaltyAmount) * 100).toFixed(1),
      ftaDescription: ftaEligible ? 'First-time penalty abatement removes entire penalty' : 'Not eligible (clean history required, 3+ years filing)',
      rcDescription: reasonableCauseEligible ? 'Reasonable cause may reduce penalty by 50% or more' : 'Provide reasonable cause explanation',
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Penalty Abatement Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate potential penalty reduction through first-time abatement or reasonable cause.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Amount ($)</label>
          <input
            type="number"
            value={penaltyAmount}
            onChange={(e) => setPenaltyAmount(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Penalty Type</label>
          <select
            value={penaltyType}
            onChange={(e) => setPenaltyType(e.target.value as 'failure_to_file' | 'failure_to_pay' | 'accuracy' | 'deposit' | 'estimated')}
            className="w-full border rounded p-2"
          >
            <option value="failure_to_file">Failure to File</option>
            <option value="failure_to_pay">Failure to Pay</option>
            <option value="accuracy">Accuracy-Related</option>
            <option value="deposit">Failure to Deposit</option>
            <option value="estimated">Estimated Tax Underpayment</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={firstTimeAbatement}
            onChange={(e) => setFirstTimeAbatement(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Request First-Time Abatement</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cleanHistory}
            onChange={(e) => setCleanHistory(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Clean filing history (no penalties 3 prior years)</span>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Filed Timely</label>
          <input
            type="number"
            value={penaltyYears}
            onChange={(e) => setPenaltyYears(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reasonable Cause Explanation</label>
          <input
            type="text"
            value={reasonableCause}
            onChange={(e) => setReasonableCause(e.target.value)}
            placeholder="Describe circumstances..."
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Penalty Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Penalty Amount:</span>
            <span className="font-medium ml-2">$ {result.penaltyAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Penalty Type:</span>
            <span className="font-medium ml-2">{result.penaltyType}</span>
          </div>
          <div>
            <span className="text-zinc-600">Years Filed:</span>
            <span className="font-medium ml-2">{result.penaltyYears}</span>
          </div>
        </div>
      </div>

      {result.ftaApplicable && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">First-Time Abatement (FTA)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">FTA Eligible:</span>
              <span className={`font-bold ml-2 ${result.ftaEligible ? 'text-green-600' : 'text-red-600'}`}>
                {result.ftaEligible ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-zinc-600">FTA Amount:</span>
              <span className="font-bold text-green-700 ml-2">$ {result.ftaAmount}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">{result.ftaDescription}</div>
        </div>
      )}

      {result.rcApplicable && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Reasonable Cause</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">RC Eligible:</span>
              <span className={`font-bold ml-2 ${result.reasonableCauseEligible ? 'text-orange-600' : 'text-red-600'}`}>
                {result.reasonableCauseEligible ? 'Possible' : 'No explanation'}
              </span>
            </div>
            <div>
              <span className="text-zinc-600">Potential RC Amount:</span>
              <span className="font-medium ml-2">$ {result.rcAmount}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">{result.rcDescription}</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Abatement Result</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Total Abatement:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.totalAbatement}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Penalty:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.remainingPenalty}</span>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-600">Savings:</span>
            <span className="font-bold ml-2">{result.savingsPercent}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">First-Time Abatement Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>No penalties in prior 3 tax years (clean history)</li>
          <li>Filed all required returns currently</li>
          <li>Paid or arranged to pay any tax due</li>
          <li>Applies to failure-to-file OR failure-to-pay (one per account)</li>
          <li>Automatic for compliant taxpayers - call IRS or write letter</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Reasonable Cause Examples</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Serious illness or medical emergency</li>
          <li>Death of family member</li>
          <li>Natural disaster (fire, flood, earthquake)</li>
          <li>Unable to obtain records (institution closed)</li>
          <li>IRS gave incorrect advice</li>
          <li>Civil disturbance (war, riot)</li>
          <li>Must document circumstances thoroughly</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">How to Request Abatement</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>FTA: Call IRS or write letter - easiest for eligible taxpayers</li>
          <li>Reasonable Cause: Write detailed letter explaining circumstances</li>
          <li>Include documentation (medical records, death certificate, etc.)</li>
          <li>Request must be timely (within reasonable period after penalty)</li>
          <li>Form 843 for certain penalties</li>
          <li>Appeal if denied - Request for Appeals Conference</li>
        </ul>
      </div>
    </div>
  )
}