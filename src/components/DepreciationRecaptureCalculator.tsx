'use client'

import { useState } from 'react'

export default function DepreciationRecaptureCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('100000')
  const [salePrice, setSalePrice] = useState<string>('150000')
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState<string>('30000')
  const [propertyType, setPropertyType] = useState<string>('section1245')

  const calculate = () => {
    const purchase = parseFloat(purchasePrice) || 0
    const sale = parseFloat(salePrice) || 0
    const depreciation = parseFloat(accumulatedDepreciation) || 0

    const adjustedBasis = purchase - depreciation
    const totalGain = sale - adjustedBasis

    let recaptureGain = 0
    let capitalGain = 0
    let recaptureRate = 0
    let capitalRate = 0
    let recaptureTax = 0
    let capitalTax = 0
    let totalTax = 0

    if (propertyType === 'section1245') {
      recaptureGain = Math.min(depreciation, totalGain)
      capitalGain = totalGain - recaptureGain
      recaptureRate = 0.25
      capitalRate = 0.15
      recaptureTax = recaptureGain * recaptureRate
      capitalTax = capitalGain * capitalRate
      totalTax = recaptureTax + capitalTax
    } else if (propertyType === 'section1250') {
      const excessDepreciation = depreciation * 0.25
      recaptureGain = Math.min(excessDepreciation, totalGain)
      const unrecaptured1250Gain = Math.min(depreciation - excessDepreciation, totalGain - recaptureGain)
      capitalGain = totalGain - recaptureGain - unrecaptured1250Gain

      recaptureRate = 0.25
      capitalRate = 0.15
      recaptureTax = recaptureGain * recaptureRate
      const unrecaptured1250Tax = unrecaptured1250Gain * 0.25
      capitalTax = capitalGain * capitalRate
      totalTax = recaptureTax + unrecaptured1250Tax + capitalTax
    }

    const ordinaryIncomeGain = propertyType === 'section1245' ? recaptureGain : 0
    const unrecaptured1250Gain = propertyType === 'section1250' ? Math.min(depreciation, totalGain) - recaptureGain : 0

    return {
      purchase,
      sale,
      depreciation,
      adjustedBasis: adjustedBasis.toFixed(2),
      totalGain: totalGain.toFixed(2),
      recaptureGain: recaptureGain.toFixed(2),
      capitalGain: capitalGain.toFixed(2),
      ordinaryIncomeGain: ordinaryIncomeGain.toFixed(2),
      unrecaptured1250Gain: unrecaptured1250Gain.toFixed(2),
      recaptureRate: (recaptureRate * 100).toFixed(0),
      capitalRate: (capitalRate * 100).toFixed(0),
      recaptureTax: recaptureTax.toFixed(2),
      capitalTax: capitalTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      propertyType,
      hasRecapture: recaptureGain > 0,
      hasCapitalGain: capitalGain > 0,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Depreciation Recapture Calculator</h1>
      <p className="text-zinc-600">Calculate Section 1245 and Section 1250 depreciation recapture when selling business property. Understand how depreciation reduces basis and creates taxable ordinary income upon sale.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Sale Price ($)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Accumulated Depreciation ($)</label>
            <input
              type="number"
              value={accumulatedDepreciation}
              onChange={(e) => setAccumulatedDepreciation(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="input"
            >
              <option value="section1245">Section 1245 (Equipment, Vehicles, Personal Property)</option>
              <option value="section1250">Section 1250 (Buildings, Real Property)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Basis Calculation</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Original Basis:</span>
            <span className="font-medium ml-2">${result.purchase.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Less Depreciation:</span>
            <span className="font-medium ml-2">${result.depreciation.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Adjusted Basis:</span>
            <span className="font-bold ml-2">${result.adjustedBasis}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Gain Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Gain:</span>
            <span className="font-bold ml-2">${result.totalGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Capital Gain:</span>
            <span className="font-bold ml-2">${result.capitalGain}</span>
          </div>
        </div>
        {result.hasRecapture && (
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div className="bg-orange-100 p-2 rounded">
              <span className="text-orange-700">Depreciation Recapture:</span>
              <span className="font-bold ml-2">${result.recaptureGain}</span>
            </div>
            <div>
              <span className="text-zinc-600">Recapture Rate:</span>
              <span className="font-medium ml-2">{result.recaptureRate}%</span>
            </div>
          </div>
        )}
      </div>

      {result.hasRecapture && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Depreciation Recapture Tax</h3>
          <div className="text-2xl font-bold text-red-800">${result.recaptureTax}</div>
          <div className="text-xs text-red-600 mt-2">
            Recapture taxed as ordinary income (Section 1245) or at special 25% rate (Section 1250 unrecaptured gain).
          </div>
          {result.hasCapitalGain && (
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div>
                <span className="text-zinc-600">Capital Gains Tax:</span>
                <span className="font-bold ml-2">${result.capitalTax}</span>
              </div>
              <div>
                <span className="text-zinc-600">Total Tax on Sale:</span>
                <span className="font-bold ml-2 text-red-800">${result.totalTax}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Section 1245 vs Section 1250</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-medium text-orange-800">Section 1245 (Personal Property)</h4>
            <ul className="text-zinc-600 space-y-1 list-disc pl-4">
              <li>Equipment, machinery, vehicles</li>
              <li>Furniture, fixtures</li>
              <li>Intangible assets (software, patents)</li>
              <li>ALL depreciation recaptured as ordinary income</li>
              <li>Max rate: your ordinary income bracket</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-orange-800">Section 1250 (Real Property)</h4>
            <ul className="text-zinc-600 space-y-1 list-disc pl-4">
              <li>Buildings, structural components</li>
              <li>Land improvements</li>
              <li>Only EXCESS depreciation recaptured</li>
              <li>Straight-line = NO recapture</li>
              <li>Unrecaptured gain taxed at 25% max</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Depreciation Recapture Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Recapture Definition:</strong> Depreciation claimed during ownership is "recaptured" and taxed as ordinary income when property sold at gain.</li>
          <li><strong>Section 1245:</strong> Full depreciation recapture. Gain up to depreciation amount = ordinary income. Remaining = capital gain.</li>
          <li><strong>Section 1250:</strong> Only accelerated depreciation over straight-line is recaptured. Straight-line depreciation creates unrecaptured Section 1250 gain (25% rate).</li>
          <li><strong>Order of Taxation:</strong> 1) Recapture (ordinary income or 25%), 2) Unrecaptured 1250 gain (25%), 3) Remaining capital gain (15%/20%).</li>
          <li><strong>No Loss Recapture:</strong> If sold at loss, no recapture. Loss calculated on adjusted basis.</li>
          <li><strong>Like-Kind Exchange:</strong> Section 1031 exchange defers recapture. But recapture carries forward to new property.</li>
          <li><strong>Installment Sale:</strong> Recapture taxed in year of sale (cannot spread). Capital gain can be spread.</li>
          <li><strong>Property Conversion:</strong> Convert rental to personal use, then sell. Depreciation still recaptured.</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Strategies to Minimize Recapture</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>1031 Like-Kind Exchange:</strong> Swap for similar property. Defer ALL gain including recapture. Must follow strict timeline (45 days identify, 180 days close).</li>
          <li><strong>Installment Sale:</strong> Spread capital gain over years. Recapture still taxed year 1, but remaining gain deferred.</li>
          <li><strong>Hold Longer:</strong> More depreciation = more recapture. But basis reduction helps if property appreciates significantly.</li>
          <li><strong>Cost Segregation:</strong> Break building into components (1245 vs 1250). More 1245 = faster depreciation = more recapture risk.</li>
          <li><strong>Sell at Loss:</strong> No recapture if total loss. But adjusted basis lower = larger loss deduction.</li>
          <li><strong>Charitable Donation:</strong> Donate appreciated property. Avoid recapture AND get deduction at FMV (must hold more than 1 year).</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Depreciation Recapture Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Underestimating Tax:</strong> Many forget depreciation recapture. Surprise tax bill at ordinary rates vs expected 15% capital gains rate.</li>
          <li><strong>Section 1250 Misunderstanding:</strong> Think NO recapture for buildings. Wrong - accelerated depreciation (pre-1987 methods) is recaptured.</li>
          <li><strong>Cost Segregation Risk:</strong> Cost seg accelerates depreciation (good for cash flow). But creates more 1245 property = more recapture risk.</li>
          <li><strong>1031 Exchange Failure:</strong> Miss 45/180 day deadlines. Entire gain including recapture taxed immediately.</li>
          <li><strong>Personal Use Conversion:</strong> Live in former rental for 2 years. Think Section 121 exclusion applies. WRONG - recapture still taxed.</li>
          <li><strong>Form 4797 Required:</strong> Must file Form 4797 for depreciation recapture. Schedule D alone is incorrect.</li>
        </ul>
      </div>
    </main>
  )
}