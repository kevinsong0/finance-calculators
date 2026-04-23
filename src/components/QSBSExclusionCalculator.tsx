'use client'

import { useState } from 'react'

export default function QSBSExclusionCalculator() {
  const [stockPurchaseDate, setStockPurchaseDate] = useState('2020')
  const [purchasePrice, setPurchasePrice] = useState(100000)
  const [salePrice, setSalePrice] = useState(500000)
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(60)
  const [corporationType, setCorporationType] = useState<'cCorp' | 'sCorp'>('cCorp')
  const [corporationAssets, setCorporationAssets] = useState(40000000)
  const [originalIssue, setOriginalIssue] = useState(true)
  const [isQSB, setIsQSB] = useState(true)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'marriedSeparate'>('marriedJoint')

  const calculate = () => {
    // QSBS Exclusion Calculator (Section 1202)
    // Qualified Small Business Stock exclusion - up to $10M per issuer

    // Requirements:
    // 1. C corporation (not S corp)
    // 2. Gross assets &lt; $50M at time of stock issuance
    // 3. Original issue (not purchased from another investor)
    // 4. Active business (not investment company)
    // 5. Held more than 5 years
    // 6. Stock issued after Aug 10, 1993

    const purchaseYear = parseInt(stockPurchaseDate)
    const holdingYears = holdingPeriodMonths / 12

    // Calculate gain
    const gain = salePrice - purchasePrice

    // Check qualification criteria
    const meetsHoldingPeriod = holdingYears >= 5
    const meetsAssetTest = corporationAssets < 50000000
    const meetsCorpType = corporationType === 'cCorp'
    const meetsOriginalIssue = originalIssue
    const meetsIssueDate = purchaseYear >= 1993
    const meetsActiveBusiness = isQSB // Simplified - assume active business

    const fullyQualified = meetsHoldingPeriod && meetsAssetTest && meetsCorpType && meetsOriginalIssue && meetsIssueDate && meetsActiveBusiness

    // Exclusion limit
    // $10M per issuer, or 10x basis (whichever is greater)
    const exclusionLimit = Math.max(10000000, purchasePrice * 10)

    // Calculate exclusion
    let exclusionAmount = 0
    if (fullyQualified) {
      exclusionAmount = Math.min(gain, exclusionLimit)
    }

    // Tax on excluded gain (0% federal)
    const excludedGain = exclusionAmount
    const taxableGain = gain - exclusionAmount

    // Federal tax rates
    const federalRate = 0.20 // Simplified capital gains rate

    // Tax savings from exclusion
    const taxSaved = excludedGain * federalRate
    const taxOnRemaining = taxableGain * federalRate

    // State tax (not all states conform)
    // Many states do NOT follow Section 1202 exclusion
    const stateRate = 0.05 // Simplified
    const stateTaxOnExcluded = excludedGain * stateRate // No state exclusion in many states

    // Total tax
    const totalTax = taxOnRemaining + stateTaxOnExcluded

    // Qualification checklist
    const qualificationCheck = [
      { criterion: 'C Corporation', met: meetsCorpType },
      { criterion: 'Assets &lt; $50M at issuance', met: meetsAssetTest, detail: `Assets: $${(corporationAssets / 1000000).toFixed(1)}M` },
      { criterion: 'Original Issue', met: meetsOriginalIssue },
      { criterion: 'Held 5+ years', met: meetsHoldingPeriod, detail: `Held: ${holdingYears.toFixed(1)} years` },
      { criterion: 'Issued after Aug 1993', met: meetsIssueDate },
      { criterion: 'Active Business', met: meetsActiveBusiness },
    ]

    // Recommendation
    let recommendation = ''
    if (!fullyQualified) {
      const failedCriteria = qualificationCheck.filter(c => !c.met).map(c => c.criterion)
      recommendation = `NOT qualified: ${failedCriteria.join(', ')}. Exclusion unavailable. Full gain $${gain.toFixed(0)} taxable. Consider holding longer if &lt;5 years.`
    } else if (gain <= exclusionLimit) {
      recommendation = `Fully qualified! Entire gain $${gain.toFixed(0)} excluded. Federal tax saved: $${taxSaved.toFixed(0)}. Note: Many states don't conform - state tax may apply on $${excludedGain.toFixed(0)}.`
    } else {
      recommendation = `Qualified but gain exceeds limit. Excluded: $${exclusionAmount.toFixed(0)} (limit $${exclusionLimit.toFixed(0)}). Taxable gain: $${taxableGain.toFixed(0)}. Tax: $${totalTax.toFixed(0)}. Consider AMT implications for large gains.`
    }

    // State conformity note
    const stateNote = 'Many states (CA, NY, etc.) do NOT conform to Section 1202. Excluded gain may still be taxable at state level. Check your state conformity rules.'

    // Key rules
    const keyRules = [
      'Section 1202 exclusion for QSBS',
      'Up to $10M per issuer (or 10x basis)',
      'Must be C corporation',
      'Assets under $50M at issuance',
      'Original issue direct from corp',
      'Held more than 5 years',
      'Active business (80%+ test)',
      'Stock issued after Aug 10, 1993',
      'Exclusion is 100% for post-Sept 2010',
      '50% exclusion for pre-Sept 2010',
      'AMT may apply for large gains',
      'Form 8949 for reporting',
    ]

    return {
      stockPurchaseDate,
      purchasePrice: purchasePrice.toFixed(0),
      salePrice: salePrice.toFixed(0),
      holdingPeriodMonths: holdingPeriodMonths.toFixed(0),
      holdingYears: holdingYears.toFixed(1),
      corporationType,
      corporationAssets: (corporationAssets / 1000000).toFixed(1),
      originalIssue,
      isQSB,
      filingStatus,
      gain: gain.toFixed(0),
      meetsHoldingPeriod,
      meetsAssetTest,
      meetsCorpType,
      meetsOriginalIssue,
      meetsIssueDate,
      meetsActiveBusiness,
      fullyQualified,
      exclusionLimit: exclusionLimit.toFixed(0),
      exclusionAmount: exclusionAmount.toFixed(0),
      excludedGain: excludedGain.toFixed(0),
      taxableGain: taxableGain.toFixed(0),
      taxSaved: taxSaved.toFixed(0),
      taxOnRemaining: taxOnRemaining.toFixed(0),
      stateTaxOnExcluded: stateTaxOnExcluded.toFixed(0),
      totalTax: totalTax.toFixed(0),
      qualificationCheck,
      recommendation,
      stateNote,
      keyRules,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">QSBS Exclusion Calculator (Section 1202)</h1>
      <p className="text-gray-600 mb-4">Calculate qualified small business stock gain exclusion.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Stock Purchase Year</label>
          <input type="number" value={stockPurchaseDate} onChange={(e) => setStockPurchaseDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Price</label>
          <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Price</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Period (Months)</label>
          <input type="number" value={holdingPeriodMonths} onChange={(e) => setHoldingPeriodMonths(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corporation Type</label>
          <select value={corporationType} onChange={(e) => setCorporationType(e.target.value as 'cCorp' | 'sCorp')} className="w-full border rounded p-2">
            <option value="cCorp">C Corporation (qualifies)</option>
            <option value="sCorp">S Corporation (does NOT qualify)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Corp Assets at Issuance ($)</label>
          <input type="number" value={corporationAssets} onChange={(e) => setCorporationAssets(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Issue?</label>
          <select value={originalIssue ? 'yes' : 'no'} onChange={(e) => setOriginalIssue(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - direct from corporation</option>
            <option value="no">No - purchased from investor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Active Business?</label>
          <select value={isQSB ? 'yes' : 'no'} onChange={(e) => setIsQSB(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - qualified small business</option>
            <option value="no">No - investment company type</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.fullyQualified ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Qualification Checklist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Criterion</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {result.qualificationCheck.map((c) => (
                <tr key={c.criterion} className="border-b">
                  <td className="py-1 font-semibold">{c.criterion}</td>
                  <td className="py-1"><span className={c.met ? 'text-green-700' : 'text-red-700'}>{c.met ? '✓ Met' : '✗ Not Met'}</span></td>
                  <td className="py-1">{c.detail || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Gain Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Purchase:</span><span className="font-medium ml-2">$ {result.purchasePrice}</span></div>
          <div><span className="text-zinc-600">Sale:</span><span className="font-medium ml-2">$ {result.salePrice}</span></div>
          <div><span className="text-zinc-600">Gain:</span><span className="font-bold ml-2">$ {result.gain}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.fullyQualified ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Exclusion Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Limit:</span><span className="font-medium ml-2">$ {result.exclusionLimit}</span></div>
          <div><span className="text-zinc-600">Excluded:</span><span className={`font-bold ml-2 ${Number(result.exclusionAmount) > 0 ? 'text-green-700' : ''}`}>$ {result.exclusionAmount}</span></div>
          <div><span className="text-zinc-600">Taxable:</span><span className="font-bold text-red-700 ml-2">$ {result.taxableGain}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Federal Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSaved}</span></div>
          <div><span className="text-zinc-600">Tax on Remaining:</span><span className="font-medium ml-2">$ {result.taxOnRemaining}</span></div>
          <div><span className="text-zinc-600">State (may apply):</span><span className="font-medium ml-2">$ {result.stateTaxOnExcluded}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.stateNote}</div>
      </div>

      <div className={`card mb-6 ${result.fullyQualified ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">QSBS Key Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.keyRules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}