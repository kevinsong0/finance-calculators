'use client'

import { useState } from 'react'

export default function HomeSaleExclusionCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('200000')
  const [salePrice, setSalePrice] = useState<string>('500000')
  const [improvements, setImprovements] = useState<string>('50000')
  const [ownershipYears, setOwnershipYears] = useState<string>('5')
  const [useYears, setUseYears] = useState<string>('5')
  const [maritalStatus, setMaritalStatus] = useState<string>('single')
  const [priorExclusions, setPriorExclusions] = useState<string>('0')

  const calculate = () => {
    const purchase = parseFloat(purchasePrice) || 0
    const sale = parseFloat(salePrice) || 0
    const improvementsCost = parseFloat(improvements) || 0
    const ownership = parseFloat(ownershipYears) || 0
    const use = parseFloat(useYears) || 0
    const prior = parseFloat(priorExclusions) || 0
    const isMarried = maritalStatus === 'married'

    // Section 121 exclusion limits
    const exclusionLimit = isMarried ? 500000 : 250000

    // Adjusted basis
    const adjustedBasis = purchase + improvementsCost

    // Total gain
    const totalGain = sale - adjustedBasis

    // Eligibility tests
    const meetsOwnershipTest = ownership >= 2
    const meetsUseTest = use >= 2
    const meetsPriorExclusionTest = prior < 2 // Must wait 2 years after last exclusion

    // Partial exclusion factors
    let partialExclusionFactor = 1
    const partialExclusionReasons: string[] = []

    if (!meetsOwnershipTest || !meetsUseTest) {
      // Check for qualifying exceptions for partial exclusion
      // Employment change, health, unforeseen circumstances
      // For calculation purposes, assume 0% if tests not met (no exception)
      partialExclusionFactor = 0
      if (!meetsOwnershipTest) partialExclusionReasons.push('Ownership < 2 years')
      if (!meetsUseTest) partialExclusionReasons.push('Use < 2 years')
    }

    if (!meetsPriorExclusionTest) {
      partialExclusionFactor = 0
      partialExclusionReasons.push('Prior exclusion within 2 years')
    }

    // Maximum exclusion available
    const maxExclusion = exclusionLimit * partialExclusionFactor

    // Excludable gain
    const excludableGain = Math.min(totalGain, maxExclusion)

    // Taxable gain
    const taxableGain = Math.max(0, totalGain - excludableGain)

    // Estimated tax (15% LTCG rate)
    const estimatedTax = taxableGain * 0.15

    // Eligibility status
    const isFullyEligible = meetsOwnershipTest && meetsUseTest && meetsPriorExclusionTest
    const isPartiallyEligible = false // Simplified - partial requires specific exceptions
    const isNotEligible = !isFullyEligible && !isPartiallyEligible

    return {
      purchase,
      sale,
      improvementsCost,
      adjustedBasis: adjustedBasis.toFixed(2),
      totalGain: totalGain.toFixed(2),
      exclusionLimit: exclusionLimit.toFixed(0),
      maxExclusion: maxExclusion.toFixed(2),
      excludableGain: excludableGain.toFixed(2),
      taxableGain: taxableGain.toFixed(2),
      estimatedTax: estimatedTax.toFixed(2),
      ownership,
      use,
      prior,
      meetsOwnershipTest,
      meetsUseTest,
      meetsPriorExclusionTest,
      isFullyEligible,
      isNotEligible,
      partialExclusionReasons,
      maritalStatus,
      hasGain: totalGain > 0,
      gainExceedsExclusion: totalGain > exclusionLimit,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Home Sale Exclusion Calculator</h1>
      <p className="text-zinc-600">Calculate Section 121 home sale exclusion eligibility. Determine if your gain qualifies for $250K (single) or $500K (married) tax-free exclusion based on ownership, use, and prior exclusion history.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Home Sale Details</h3>
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
            <label className="block text-sm text-zinc-600 mb-1">Improvements ($)</label>
            <input
              type="number"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Marital Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single / Head of Household</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Eligibility Tests</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years Owned</label>
            <input
              type="number"
              value={ownershipYears}
              onChange={(e) => setOwnershipYears(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years as Principal Residence</label>
            <input
              type="number"
              value={useYears}
              onChange={(e) => setUseYears(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Prior Exclusions (last 2 years)</label>
            <input
              type="number"
              value={priorExclusions}
              onChange={(e) => setPriorExclusions(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className={`card ${result.isFullyEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isFullyEligible ? 'text-green-700' : 'text-red-700'}`}>Eligibility Status</h3>
        <div className={`text-xl font-bold ${result.isFullyEligible ? 'text-green-800' : 'text-red-800'}`}>
          {result.isFullyEligible ? 'FULLY ELIGIBLE' : 'NOT ELIGIBLE'}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2 text-xs">
          <div className={`${result.meetsOwnershipTest ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Ownership Test:</span>
            <span className="ml-1">{result.meetsOwnershipTest ? 'PASS (≥2 years)' : 'FAIL (<2 years)'}</span>
          </div>
          <div className={`${result.meetsUseTest ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Use Test:</span>
            <span className="ml-1">{result.meetsUseTest ? 'PASS (≥2 years)' : 'FAIL (<2 years)'}</span>
          </div>
          <div className={`${result.meetsPriorExclusionTest ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Prior Exclusion Test:</span>
            <span className="ml-1">{result.meetsPriorExclusionTest ? 'PASS (<2)' : 'FAIL (≥2)'}</span>
          </div>
        </div>
        {result.isNotEligible && result.partialExclusionReasons.length > 0 && (
          <div className="text-xs text-red-600 mt-2">
            Reasons: {result.partialExclusionReasons.join(', ')}
          </div>
        )}
      </div>

      {result.hasGain && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Gain Calculation</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Adjusted Basis:</span>
              <span className="font-medium ml-2">${result.adjustedBasis}</span>
            </div>
            <div>
              <span className="text-zinc-600">Total Gain:</span>
              <span className="font-bold ml-2">${result.totalGain}</span>
            </div>
            <div>
              <span className="text-zinc-600">Exclusion Limit:</span>
              <span className="font-bold ml-2">${result.exclusionLimit}</span>
            </div>
          </div>
        </div>
      )}

      {result.isFullyEligible && result.hasGain && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Tax-Free Exclusion</h3>
          <div className="text-2xl font-bold text-green-800">${result.excludableGain} TAX-FREE</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Maximum Exclusion:</span>
              <span className="font-medium ml-2">${result.maxExclusion}</span>
            </div>
            <div>
              <span className="text-zinc-600">Taxable Gain:</span>
              <span className={`font-bold ml-2 ${parseFloat(result.taxableGain) > 0 ? 'text-red-700' : 'text-green-700'}`}>
                ${result.taxableGain}
              </span>
            </div>
          </div>
          {parseFloat(result.taxableGain) > 0 && (
            <div className="text-xs text-red-600 mt-2">
              Gain exceeds exclusion limit. Excess taxed as capital gain.
            </div>
          )}
        </div>
      )}

      {parseFloat(result.taxableGain) > 0 && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Taxable Gain & Estimated Tax</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Taxable Gain:</span>
              <span className="text-xl font-bold ml-2 text-red-800">${result.taxableGain}</span>
            </div>
            <div>
              <span className="text-zinc-600">Estimated Tax (15% LTCG):</span>
              <span className="text-xl font-bold ml-2 text-red-800">${result.estimatedTax}</span>
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2">
            Gain above exclusion limit taxed as long-term capital gain. Rate varies by income (0%, 15%, 20%).
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Section 121 Exclusion Rules</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-medium text-purple-800">Exclusion Amounts</h4>
            <ul className="text-zinc-600 space-y-1 list-disc pl-4">
              <li>Single: $250,000 maximum</li>
              <li>Married (MFJ): $500,000 maximum</li>
              <li>Both spouses must meet use test</li>
              <li>Either spouse can meet ownership test</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-800">Eligibility Requirements</h4>
            <ul className="text-zinc-600 space-y-1 list-disc pl-4">
              <li>Own home for ≥2 of last 5 years</li>
              <li>Live in home for ≥2 of last 5 years</li>
              <li>No exclusion in last 2 years</li>
              <li>Principal residence (not vacation home)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Partial Exclusion Exceptions</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Employment Change:</strong> Job change requiring relocation. Distance test or health/education exception.</li>
          <li><strong>Health:</strong> Doctor recommends move for health reasons. Must be documented.</li>
          <li><strong>Unforeseen Circumstances:</strong> Death, divorce, natural disaster, involuntary conversion, multiple births.</li>
          <li><strong>Distance Test:</strong> New job at least 50 miles farther from old home than old job was.</li>
          <li><strong>Proration:</strong> Partial exclusion = (months owned / 24) × full exclusion limit.</li>
          <li><strong>Documentation Required:</strong> Proof of employment change, medical records, divorce decree, etc.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Important Section 121 Details</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>5-Year Lookback:</strong> Tests apply to 5-year period BEFORE sale date. Not 5 years from purchase.</li>
          <li><strong>2-Year Rolling Period:</strong> After using exclusion, must wait 2 FULL years (24 months) before next exclusion.</li>
          <li><strong>Principal Residence:</strong> Must be main home. Vacation homes, rentals do NOT qualify (unless converted).</li>
          <li><strong>Ownership vs Use:</strong> Can own but not live in (rental). Can live in but not own (renting). Both required.</li>
          <li><strong>Spouse Use Test:</strong> For $500K, BOTH spouses must meet 2-year use test. Either can meet ownership.</li>
          <li><strong>Improvements Count:</strong> Add improvements to basis. Reduces gain, potentially under exclusion limit.</li>
          <li><strong>Depreciation Recapture:</strong> If rented before sale, depreciation is recaptured (Section 1250) - not excludable.</li>
          <li><strong>Multiple Homes:</strong> Can only have ONE principal residence at a time. Choose which to exclude.</li>
          <li><strong>Form Reporting:</strong> No form needed if gain fully excluded. Report on Schedule D if taxable gain remains.</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Strategies to Maximize Exclusion</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Wait 2 Years:</strong> If close to eligibility, wait until tests met. Don't rush sale.</li>
          <li><strong>Track Improvements:</strong> Document all improvements. Add to basis to reduce gain below exclusion.</li>
          <li><strong>Marriage Timing:</strong> If getting married, $500K exclusion available if both meet use test.</li>
          <li><strong>Convert Rental:</strong> Live in rental for 2 years before selling. But depreciation still recaptured.</li>
          <li><strong>Partial Year Count:</strong> Short absences (vacation, illness) still count toward use test. Up to 1 year total absence allowed.</li>
          <li><strong>Exception Documentation:</strong> If partial exclusion applies, document reason thoroughly for IRS.</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Common Home Sale Exclusion Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Vacation Home:</strong> Assume vacation home qualifies. NO - must be principal residence.</li>
          <li><strong>Rental Property:</strong> Convert rental to personal, sell immediately. Must live 2 years first.</li>
          <li><strong>2-Year Rule Misunderstanding:</strong> Think any 2 years ownership qualifies. Must be within 5-year lookback.</li>
          <li><strong>Prior Exclusion:</strong> Used exclusion 1 year ago, think available again. NO - must wait 24 months.</li>
          <li><strong>Divorce Scenario:</strong> Transfer home to spouse in divorce. Ownership period carries over.</li>
          <li><strong>Depreciation Forgotten:</strong> Rented for 5 years before selling. Depreciation recapture taxed - not excluded.</li>
          <li><strong>Improvements Not Tracked:</strong> Forget to add improvements to basis. Pay tax on gain that could be excluded.</li>
        </ul>
      </div>
    </main>
  )
}