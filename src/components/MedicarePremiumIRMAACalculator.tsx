'use client'

import { useState } from 'react'

export default function MedicarePremiumIRMAACalculator() {
  const [magi, setMagi] = useState(200000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'married_separate'>('single')
  const [age, setAge] = useState(65)
  const [partBEnrolled, setPartBEnrolled] = useState(true)
  const [partDEnrolled, setPartDEnrolled] = useState(true)

  const calculate = () => {
    let thresholds: number[] = []
    if (filingStatus === 'single' || filingStatus === 'married_separate') {
      thresholds = [103000, 129000, 161000, 193000, 215000, 500000]
    } else {
      thresholds = [206000, 258000, 322000, 386000, 430000, 750000]
    }

    let partBBracket = 0
    let partDBracket = 0
    for (let i = 0; i < thresholds.length; i++) {
      if (magi <= thresholds[i]) {
        partBBracket = i
        partDBracket = i
        break
      }
      partBBracket = thresholds.length
      partDBracket = thresholds.length
    }

    const standardPartB = 164.90
    const partBIRMAAs = [0, 69.90, 139.90, 209.80, 279.70, 349.60, 419.50]
    const partBTotal = standardPartB + partBIRMAAs[partBBracket]
    const partBAnnual = partBTotal * 12

    const standardPartD = 0
    const partDIRMAAs = [0, 12.20, 24.40, 36.60, 48.90, 61.10, 73.30]
    const partDTotal = standardPartD + partDIRMAAs[partDBracket]
    const partDAnnual = partDTotal * 12

    const totalMonthly = (partBEnrolled ? partBTotal : 0) + (partDEnrolled ? partDTotal : 0)
    const totalAnnual = totalMonthly * 12
    const irmaaAnnual = ((partBEnrolled ? partBIRMAAs[partBBracket] : 0) + (partDEnrolled ? partDIRMAAs[partDBracket] : 0)) * 12

    const bracketNames = ['Standard', '1st IRMAA', '2nd IRMAA', '3rd IRMAA', '4th IRMAA', '5th IRMAA', '6th IRMAA']

    return {
      magi: magi.toFixed(2),
      filingStatus,
      age: age.toFixed(0),
      thresholds: thresholds,
      partBBracket: bracketNames[partBBracket],
      partDBracket: bracketNames[partDBracket],
      standardPartB: standardPartB.toFixed(2),
      partBIRMAA: partBIRMAAs[partBBracket].toFixed(2),
      partBTotal: partBTotal.toFixed(2),
      partBAnnual: partBAnnual.toFixed(2),
      standardPartD: '0.00',
      partDIRMAA: partDIRMAAs[partDBracket].toFixed(2),
      partDTotal: partDTotal.toFixed(2),
      partDAnnual: partDAnnual.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      totalAnnual: totalAnnual.toFixed(2),
      irmaaAnnual: irmaaAnnual.toFixed(2),
      isIRMAA: partBBracket > 0 || partDBracket > 0,
      isEligible: age >= 63,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Premium IRMAA Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Medicare Part B and Part D IRMAA based on your income.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">MAGI (Modified Adjusted Gross Income) ($)</label>
          <input
            type="number"
            value={magi}
            onChange={(e) => setMagi(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married' | 'married_separate')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={partBEnrolled}
              onChange={(e) => setPartBEnrolled(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Enrolled in Part B</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={partDEnrolled}
              onChange={(e) => setPartDEnrolled(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Enrolled in Part D</span>
          </label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRMAA Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">MAGI:</span>
            <span className="font-medium ml-2">$ {result.magi}</span>
          </div>
          <div>
            <span className="text-zinc-600">IRMAA Bracket:</span>
            <span className="font-medium ml-2">{result.partBBracket}</span>
          </div>
          <div>
            <span className="text-zinc-600">Age:</span>
            <span className="font-medium ml-2">{result.age}</span>
          </div>
        </div>
      </div>

      {result.isEligible && (
        <>
          <div className="card bg-green-50 border border-green-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">Part B Premium</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-zinc-600">Standard Premium:</span>
                <span className="font-medium ml-2">$ {result.standardPartB}/mo</span>
              </div>
              <div>
                <span className="text-zinc-600">IRMAA Amount:</span>
                <span className="font-medium ml-2 text-red-600">$ {result.partBIRMAA}/mo</span>
              </div>
              <div>
                <span className="text-zinc-600">Total Monthly:</span>
                <span className="font-bold ml-2">$ {result.partBTotal}</span>
              </div>
              <div>
                <span className="text-zinc-600">Annual Cost:</span>
                <span className="font-bold text-green-700 ml-2">$ {result.partBAnnual}</span>
              </div>
            </div>
          </div>

          <div className="card bg-orange-50 border border-orange-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">Part D Premium</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-zinc-600">IRMAA Amount:</span>
                <span className="font-medium ml-2 text-red-600">$ {result.partDIRMAA}/mo</span>
              </div>
              <div>
                <span className="text-zinc-600">Total IRMAA:</span>
                <span className="font-medium ml-2">$ {result.partDTotal}/mo</span>
              </div>
              <div>
                <span className="text-zinc-600">Annual IRMAA:</span>
                <span className="font-bold ml-2">$ {result.partDAnnual}</span>
              </div>
            </div>
          </div>

          <div className="card bg-red-50 border border-red-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">Total Medicare Premiums</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-600">Monthly Total:</span>
                <span className="font-bold text-red-700 ml-2">$ {result.totalMonthly}</span>
              </div>
              <div>
                <span className="text-zinc-600">Annual Total:</span>
                <span className="font-bold text-red-700 ml-2">$ {result.totalAnnual}</span>
              </div>
              <div>
                <span className="text-zinc-600">IRMAA Premium (extra):</span>
                <span className="font-bold text-red-700 ml-2">$ {result.irmaaAnnual}/yr</span>
              </div>
            </div>
          </div>
        </>
      )}

      {!result.isEligible && (
        <div className="card bg-yellow-50 border border-yellow-200 mb-6">
          <p className="text-zinc-600">IRMAA applies at age 63+. You are below the eligibility age.</p>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">IRMAA Thresholds (2024)</h3>
        <div className="text-xs text-zinc-600">
          <p className="mb-2"><strong>Single/Married Filing Separately:</strong></p>
          <ul className="list-disc pl-4 space-y-1">
            <li>$103,000 or less: No IRMAA</li>
            <li>$103,001-$129,000: +$69.90 Part B, +$12.20 Part D</li>
            <li>$129,001-$161,000: +$139.90 Part B, +$24.40 Part D</li>
            <li>$161,001-$193,000: +$209.80 Part B, +$36.60 Part D</li>
            <li>$193,001-$215,000: +$279.70 Part B, +$48.90 Part D</li>
            <li>$215,001-$500,000: +$349.60 Part B, +$61.10 Part D</li>
            <li>Over $500,000: +$419.50 Part B, +$73.30 Part D</li>
          </ul>
          <p className="mt-3 mb-2"><strong>Married Filing Jointly:</strong> Thresholds are double ($206K, $258K, etc.)</p>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Avoiding IRMAA</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Manage MAGI through Roth conversions before age 63</li>
          <li>Use tax-loss harvesting to reduce capital gains</li>
          <li>Delay Social Security to reduce income</li>
          <li>Request IRMAA reconsideration if income decreased due to life-changing event</li>
          <li>Qualified charitable distributions reduce MAGI for age 70.5+</li>
        </ul>
      </div>
    </div>
  )
}