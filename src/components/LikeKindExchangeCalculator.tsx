'use client'

import { useState } from 'react'

export default function LikeKindExchangeCalculator() {
  const [propertyType, setPropertyType] = useState<'realEstate' | 'personalProperty'>('realEstate')
  const [adjustedBasis, setAdjustedBasis] = useState(200000)
  const [fairMarketValue, setFairMarketValue] = useState(350000)
  const [relinquishedLiabilities, setRelinquishedLiabilities] = useState(50000)
  const [replacementFMV, setReplacementFMV] = useState(400000)
  const [replacementBasis, setReplacementBasis] = useState(400000)
  const [replacementLiabilities, setReplacementLiabilities] = useState(80000)
  const [bootReceived, setBootReceived] = useState(0)
  const [bootGiven, setBootGiven] = useState(0)
  const [isDelayed, setIsDelayed] = useState(true)
  const [daysToIdentify, setDaysToIdentify] = useState(45)
  const [daysToClose, setDaysToClose] = useState(180)

  const calculate = () => {
    // Like-Kind Exchange Calculator (Section 1031)
    // Exchange of like-kind property for tax deferral

    // Rules:
    // 1. Real estate only after 2018 (no personal property)
    // 2. Like-kind: same nature/character
    // 3. Delayed exchange: 45 days to identify, 180 days to close
    // 4. Boot = cash + other property + liability relief
    // 5. Must exchange for equal or greater value
    // 6. Must exchange for equal or greater liability

    // Calculate boot
    const liabilityRelief = relinquishedLiabilities - replacementLiabilities
    const netBoot = bootReceived + liabilityRelief - bootGiven

    // Gain realized
    const gainRealized = fairMarketValue - adjustedBasis - relinquishedLiabilities

    // Gain recognized (boot received)
    const gainRecognized = Math.min(gainRealized, netBoot)

    // Gain deferred
    const gainDeferred = gainRealized - gainRecognized

    // New basis in replacement property
    const newBasis = replacementFMV - gainDeferred - replacementLiabilities

    // Exchange qualification
    const valueQualified = replacementFMV >= fairMarketValue
    const liabilityQualified = replacementLiabilities >= relinquishedLiabilities
    const timeQualified = daysToIdentify <= 45 && daysToClose <= 180
    const typeQualified = propertyType === 'realEstate' // Only real estate qualifies post-2018

    const fullyQualified = valueQualified && liabilityQualified && timeQualified && typeQualified

    // Tax savings
    const taxRate = 0.20 // Simplified capital gains rate
    const taxDeferred = gainDeferred * taxRate
    const taxRecognized = gainRecognized * taxRate

    // Boot breakdown
    const bootBreakdown = [
      { type: 'Cash/Property Received', amount: bootReceived },
      { type: 'Liability Relief', amount: liabilityRelief },
      { type: 'Boot Given', amount: -bootGiven },
      { type: 'Net Boot', amount: netBoot },
    ]

    // Timeline compliance
    const timelineStatus = [
      { deadline: 'Identification (45 days)', days: daysToIdentify, compliant: daysToIdentify <= 45 },
      { deadline: 'Closing (180 days)', days: daysToClose, compliant: daysToClose <= 180 },
    ]

    // Recommendation
    let recommendation = ''
    if (!typeQualified) {
      recommendation = `Personal property no longer qualifies for 1031 (TCJA 2017). Only real estate exchanges allowed. Consider selling and recognizing gain.`
    } else if (!fullyQualified) {
      const issues: string[] = []
      if (!valueQualified) issues.push(`Replacement value ($${replacementFMV}) less than relinquished ($${fairMarketValue})`)
      if (!liabilityQualified) issues.push(`Replacement liabilities ($${replacementLiabilities}) less than relinquished ($${relinquishedLiabilities})`)
      if (!timeQualified) issues.push(`Timeline exceeded: ${daysToIdentify}/45 days, ${daysToClose}/180 days`)
      recommendation = `Exchange NOT fully qualified: ${issues.join('; ')}. Boot recognized: $${gainRecognized.toFixed(0)}. Tax: $${taxRecognized.toFixed(0)}.`
    } else {
      recommendation = `Exchange fully qualified! Gain deferred: $${gainDeferred.toFixed(0)}. Tax saved: $${taxDeferred.toFixed(0)}. New basis: $${newBasis.toFixed(0)}. Consider qualified intermediary.`
    }

    if (netBoot > 0) {
      recommendation += ` Boot received: $${netBoot.toFixed(0)} - taxable gain recognized.`
    }

    return {
      propertyType,
      adjustedBasis: adjustedBasis.toFixed(0),
      fairMarketValue: fairMarketValue.toFixed(0),
      relinquishedLiabilities: relinquishedLiabilities.toFixed(0),
      replacementFMV: replacementFMV.toFixed(0),
      replacementLiabilities: replacementLiabilities.toFixed(0),
      bootReceived: bootReceived.toFixed(0),
      bootGiven: bootGiven.toFixed(0),
      liabilityRelief: liabilityRelief.toFixed(0),
      netBoot: netBoot.toFixed(0),
      gainRealized: gainRealized.toFixed(0),
      gainRecognized: gainRecognized.toFixed(0),
      gainDeferred: gainDeferred.toFixed(0),
      newBasis: newBasis.toFixed(0),
      taxDeferred: taxDeferred.toFixed(0),
      taxRecognized: taxRecognized.toFixed(0),
      valueQualified,
      liabilityQualified,
      timeQualified,
      typeQualified,
      fullyQualified,
      daysToIdentify: daysToIdentify.toFixed(0),
      daysToClose: daysToClose.toFixed(0),
      isDelayed,
      bootBreakdown,
      timelineStatus,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Like-Kind Exchange Calculator (Section 1031)</h1>
      <p className="text-gray-600 mb-4">Calculate tax-deferred exchange of like-kind property.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as 'realEstate' | 'personalProperty')} className="w-full border rounded p-2">
            <option value="realEstate">Real Estate (qualifies)</option>
            <option value="personalProperty">Personal Property (no longer qualifies)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Exchange Type</label>
          <select value={isDelayed ? 'delayed' : 'simultaneous'} onChange={(e) => setIsDelayed(e.target.value === 'delayed')} className="w-full border rounded p-2">
            <option value="delayed">Delayed Exchange</option>
            <option value="simultaneous">Simultaneous Exchange</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Relinquished Property</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Adjusted Basis</label>
            <input type="number" value={adjustedBasis} onChange={(e) => setAdjustedBasis(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fair Market Value</label>
            <input type="number" value={fairMarketValue} onChange={(e) => setFairMarketValue(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Liabilities</label>
            <input type="number" value={relinquishedLiabilities} onChange={(e) => setRelinquishedLiabilities(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Replacement Property</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fair Market Value</label>
            <input type="number" value={replacementFMV} onChange={(e) => setReplacementFMV(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Liabilities</label>
            <input type="number" value={replacementLiabilities} onChange={(e) => setReplacementLiabilities(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Boot</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Boot Received (Cash/Property)</label>
            <input type="number" value={bootReceived} onChange={(e) => setBootReceived(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Boot Given</label>
            <input type="number" value={bootGiven} onChange={(e) => setBootGiven(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      {isDelayed && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Timeline Deadlines</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Days to Identify</label>
              <input type="number" value={daysToIdentify} onChange={(e) => setDaysToIdentify(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Days to Close</label>
              <input type="number" value={daysToClose} onChange={(e) => setDaysToClose(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">45 days to identify, 180 days to close (or tax return deadline)</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Boot Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {result.bootBreakdown.map((b) => (
                <tr key={b.type} className="border-b">
                  <td className="py-1 font-semibold">{b.type}</td>
                  <td className="py-1">$ {b.amount.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Gain Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Gain Realized:</span><span className="font-medium ml-2">$ {result.gainRealized}</span></div>
          <div><span className="text-zinc-600">Gain Recognized:</span><span className={`font-bold ml-2 ${Number(result.gainRecognized) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.gainRecognized}</span></div>
          <div><span className="text-zinc-600">Gain Deferred:</span><span className="font-bold text-green-700 ml-2">$ {result.gainDeferred}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">New Basis:</span><span className="font-bold ml-2">$ {result.newBasis}</span></div>
          <div><span className="text-zinc-600">Tax Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.taxDeferred}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.fullyQualified ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Exchange Qualification</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Type:</span><span className={`font-bold ml-2 ${result.typeQualified ? 'text-green-700' : 'text-red-700'}`}>{result.typeQualified ? '✓' : '✗'}</span></div>
          <div><span className="text-zinc-600">Value:</span><span className={`font-bold ml-2 ${result.valueQualified ? 'text-green-700' : 'text-red-700'}`}>{result.valueQualified ? '✓' : '✗'}</span></div>
          <div><span className="text-zinc-600">Liability:</span><span className={`font-bold ml-2 ${result.liabilityQualified ? 'text-green-700' : 'text-red-700'}`}>{result.liabilityQualified ? '✓' : '✗'}</span></div>
          <div><span className="text-zinc-600">Timeline:</span><span className={`font-bold ml-2 ${result.timeQualified ? 'text-green-700' : 'text-red-700'}`}>{result.timeQualified ? '✓' : '✗'}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.fullyQualified ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">1031 Exchange Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Real estate only (TCJA 2018)</li>
          <li>Like-kind: same nature/character</li>
          <li>45 days to identify replacements</li>
          <li>180 days to close exchange</li>
          <li>Use qualified intermediary (QI)</li>
          <li>Cannot touch cash during exchange</li>
          <li>Boot = cash + liability relief</li>
          <li>Boot triggers recognized gain</li>
          <li>Basis carries over + boot adjustment</li>
          <li>Form 8824 for reporting</li>
        </ul>
      </div>
    </div>
  )
}