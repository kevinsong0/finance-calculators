'use client'

import { useState } from 'react'

export default function RelatedPartyTransactionTaxCalculator() {
  const [transactionType, setTransactionType] = useState<'sale' | 'gift' | 'loan' | 'rental' | 'employment'>('sale')
  const [assetValue, setAssetValue] = useState(100000)
  const [transferPrice, setTransferPrice] = useState(80000)
  const [relatedPartyType, setRelatedPartyType] = useState<'spouse' | 'parent' | 'child' | 'sibling' | 'corporation' | 'partnership'>('child')
  const [isControlledEntity, setIsControlledEntity] = useState(true)
  const [ownershipPercentage, setOwnershipPercentage] = useState(80)
  const [gainOrLoss, setGainOrLoss] = useState(20000)
  const [holdingPeriod, setHoldingPeriod] = useState(5)
  const [isLossDisallowed, setIsLossDisallowed] = useState(true)
  const [gainDeferred, setGainDeferred] = useState(false)

  const calculate = () => {
    // Related Party Transaction Tax Calculator
    // Special rules apply to transactions between related parties

    // Related parties include:
    // - Family members: spouse, parents, children, siblings
    // - Controlled entities: &gt;50% owned corporations/partnerships
    // - Grantor trusts, beneficiaries

    // Key rules:
    // 1. Losses on sales to related parties are DISALLOWED
    // 2. Gains may be deferred if property sold back to unrelated party
    // 3. Gift rules: carryover basis (no gain/loss recognition)
    // 4. Loans: must have adequate interest (below-market loan rules)
    // 5. Rental: fair market value required
    // 6. Employment: reasonable compensation required

    const isLoss = gainOrLoss < 0
    const isGain = gainOrLoss > 0

    // Loss disallowance rule (Section 267)
    // Losses on sales to related parties are completely disallowed
    const lossDisallowed = isLoss && isLossDisallowed ? Math.abs(gainOrLoss) : 0

    // Gain deferral rule (Section 267(d))
    // If related party later sells to unrelated party at gain,
    // the deferred gain from first sale may be recognized
    const gainOnTransfer = isGain ? gainOrLoss : 0
    let gainDeferredAmount = 0
    let gainRecognizedNow = gainOnTransfer

    if (isGain && gainDeferred && relatedPartyType !== 'spouse') {
      gainDeferredAmount = gainOnTransfer
      gainRecognizedNow = 0
    }

    // Gift basis rules
    // Gift to related party: carryover basis (donor's basis)
    // Gift tax paid on appreciation: add portion to basis
    const giftBasisCarryover = transactionType === 'gift' ? assetValue - gainOrLoss : 0

    // Below-market loan rules
    // Imputed interest if rate below AFR
    // Lender has interest income, borrower has interest deduction
    const imputedInterestRules = {
      applies: transactionType === 'loan' && transferPrice < assetValue,
      lenderIncome: 'Imputed interest income',
      borrowerDeduction: 'Imputed interest deduction (if business use)',
      afrRates: 'Applicable Federal Rates published monthly',
    }

    // Rental at below FMV
    // May be treated as gift element
    // Must charge fair market value for business deduction
    const rentalRules = {
      fmvRequired: 'Fair market value required for business deduction',
      belowFmv: 'Partial gift element if below FMV',
      personalUse: 'Limited deduction if personal use by family',
    }

    // Employment compensation
    // Reasonable compensation required
    // Excessive compensation = dividend (C-Corp) or gift
    const employmentRules = {
      reasonableComp: 'Reasonable compensation test applies',
      excessiveRisk: 'Excessive salary may be reclassified',
      familyRisk: 'Family employee compensation scrutinized',
    }

    // Control tests
    // More than 50% ownership = controlled entity
    const controlledThreshold = 50
    const isControlled = ownershipPercentage > controlledThreshold

    // Attribution rules
    // Stock ownership attributed from:
    // - Spouse, children, parents
    // - Entities controlled by individual
    const attributionRules = {
      familyAttribution: 'Family members\' stock attributed to individual',
      entityAttribution: 'Stock in controlled entities attributed',
      partnershipAttribution: 'Partners\' interests attributed',
    }

    // Tax impact
    const disallowedLossTax = lossDisallowed * 0.24 // Lost tax benefit
    const deferredGainTax = gainDeferredAmount * 0.15 // Deferred capital gains tax
    const recognizedGainTax = gainRecognizedNow * 0.15

    // Recommendations
    let recommendation = ''
    if (isLoss && isLossDisallowed) {
      recommendation = `Loss of $${lossDisallowed.toFixed(0)} is DISALLOWED. No tax benefit. Consider selling to unrelated party instead.`
    } else if (isGain && gainDeferred) {
      recommendation = `Gain of $${gainDeferredAmount.toFixed(0)} deferred until related party sells to unrelated buyer.`
    } else if (transactionType === 'gift') {
      recommendation = `Gift basis carryover: recipient takes your basis of $${giftBasisCarryover.toFixed(0)}.`
    } else if (transactionType === 'loan') {
      recommendation = 'Loan must have adequate interest per AFR rules. Below-market loans have imputed interest.'
    } else if (transactionType === 'rental') {
      recommendation = 'Rental to family must be at fair market value for full deduction.'
    } else {
      recommendation = 'Gain recognized immediately if no deferral election.'
    }

    // Strategies
    const strategies: string[] = []
    if (isLoss) {
      strategies.push('Sell to unrelated party instead')
      strategies.push('Wait for related party to sell to unrelated buyer')
    }
    if (isGain) {
      strategies.push('Consider gift if large gain (carryover basis)')
      strategies.push('Installment sale may spread recognition')
    }
    if (transactionType === 'gift') {
      strategies.push('Use annual gift exclusion ($18K per recipient)')
      strategies.push('Lifetime estate/gift tax unified credit')
    }
    strategies.push('Document fair market value')
    strategies.push('Use independent appraisal')
    strategies.push('Consider Section 267(f) exception for certain entities')

    // Warnings
    const warnings: string[] = []
    warnings.push('Related party transactions scrutinized by IRS')
    warnings.push('Losses permanently disallowed (not deferred)')
    warnings.push('Attribution rules expand definition')
    warnings.push('Documentation critical for audit defense')
    if (isControlledEntity) {
      warnings.push('Controlled entity rules apply (&gt;50% ownership)')
    }

    return {
      transactionType,
      assetValue: assetValue.toFixed(0),
      transferPrice: transferPrice.toFixed(0),
      relatedPartyType,
      isControlledEntity,
      ownershipPercentage: ownershipPercentage.toFixed(0),
      isControlled,
      controlledThreshold: controlledThreshold.toFixed(0),
      gainOrLoss: gainOrLoss.toFixed(0),
      isLoss,
      isGain,
      holdingPeriod: holdingPeriod.toFixed(0),
      isLossDisallowed,
      lossDisallowed: lossDisallowed.toFixed(0),
      gainOnTransfer: gainOnTransfer.toFixed(0),
      gainDeferred,
      gainDeferredAmount: gainDeferredAmount.toFixed(0),
      gainRecognizedNow: gainRecognizedNow.toFixed(0),
      giftBasisCarryover: giftBasisCarryover.toFixed(0),
      imputedInterestRules,
      rentalRules,
      employmentRules,
      attributionRules,
      disallowedLossTax: disallowedLossTax.toFixed(0),
      deferredGainTax: deferredGainTax.toFixed(0),
      recognizedGainTax: recognizedGainTax.toFixed(0),
      recommendation,
      strategies,
      warnings,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Related Party Transaction Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax impact of transactions between related parties.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Transaction Type</label>
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as 'sale' | 'gift' | 'loan' | 'rental' | 'employment')} className="w-full border rounded p-2">
            <option value="sale">Sale of Property</option>
            <option value="gift">Gift</option>
            <option value="loan">Loan</option>
            <option value="rental">Rental</option>
            <option value="employment">Employment</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Value</label>
          <input type="number" value={assetValue} onChange={(e) => setAssetValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Transfer Price</label>
          <input type="number" value={transferPrice} onChange={(e) => setTransferPrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Related Party Type</label>
          <select value={relatedPartyType} onChange={(e) => setRelatedPartyType(e.target.value as 'spouse' | 'parent' | 'child' | 'sibling' | 'corporation' | 'partnership')} className="w-full border rounded p-2">
            <option value="spouse">Spouse</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="sibling">Sibling</option>
            <option value="corporation">Controlled Corporation</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gain or Loss</label>
          <input type="number" value={gainOrLoss} onChange={(e) => setGainOrLoss(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        {relatedPartyType !== 'spouse' && relatedPartyType !== 'parent' && relatedPartyType !== 'child' && relatedPartyType !== 'sibling' && (
          <div>
            <label className="block text-sm font-medium mb-1">Ownership Percentage (%)</label>
            <input type="number" value={ownershipPercentage} min="0" max="100" onChange={(e) => setOwnershipPercentage(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        {result.isLoss && (
          <div>
            <label className="block text-sm font-medium mb-1">Loss Disallowed?</label>
            <select value={isLossDisallowed ? 'yes' : 'no'} onChange={(e) => setIsLossDisallowed(e.target.value === 'yes')} className="w-full border rounded p-2">
              <option value="yes">Yes - Section 267 applies</option>
              <option value="no">No - exception applies</option>
            </select>
          </div>
        )}
        {result.isGain && result.relatedPartyType !== 'spouse' && (
          <div>
            <label className="block text-sm font-medium mb-1">Defer Gain?</label>
            <select value={gainDeferred ? 'yes' : 'no'} onChange={(e) => setGainDeferred(e.target.value === 'yes')} className="w-full border rounded p-2">
              <option value="no">No - recognize now</option>
              <option value="yes">Yes - Section 267(d) deferral</option>
            </select>
          </div>
        )}
      </div>

      {result.isLoss && result.isLossDisallowed && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">⚠️ Loss Disallowed (Section 267)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Loss Amount:</span><span className="font-bold text-red-700 ml-2">$ {result.lossDisallowed}</span></div>
            <div><span className="text-zinc-600">Tax Benefit Lost:</span><span className="font-bold text-red-700 ml-2">$ {result.disallowedLossTax}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Losses on sales to related parties are PERMANENTLY disallowed - not deferred.</div>
        </div>
      )}

      {result.isGain && result.gainDeferred && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Gain Deferred (Section 267(d))</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Deferred Amount:</span><span className="font-bold text-orange-700 ml-2">$ {result.gainDeferredAmount}</span></div>
            <div><span className="text-zinc-600">Tax Deferred:</span><span className="font-medium ml-2">$ {result.deferredGainTax}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Gain deferred until related party sells to UNRELATED buyer.</div>
        </div>
      )}

      {result.transactionType === 'gift' && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Gift Basis Rules</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Carryover Basis:</span><span className="font-bold ml-2">$ {result.giftBasisCarryover}</span></div>
            <div><span className="text-zinc-600">FMV at Gift:</span><span className="font-medium ml-2">$ {result.assetValue}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Recipient takes donor&apos;s basis. No gain/loss recognized on gift.</div>
        </div>
      )}

      {result.transactionType === 'loan' && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Below-Market Loan Rules</h2>
          <div className="text-xs text-zinc-600 space-y-1">
            <div><span className="font-semibold">Applies:</span> {result.imputedInterestRules.applies ? 'Yes' : 'No'}</div>
            <div><span className="font-semibold">Lender:</span> {result.imputedInterestRules.lenderIncome}</div>
            <div><span className="font-semibold">Borrower:</span> {result.imputedInterestRules.borrowerDeduction}</div>
            <div><span className="font-semibold">AFR:</span> {result.imputedInterestRules.afrRates}</div>
          </div>
        </div>
      )}

      {result.transactionType === 'rental' && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Rental to Related Party</h2>
          <div className="text-xs text-zinc-600 space-y-1">
            <div><span className="font-semibold">FMV:</span> {result.rentalRules.fmvRequired}</div>
            <div><span className="font-semibold">Below FMV:</span> {result.rentalRules.belowFmv}</div>
            <div><span className="font-semibold">Personal:</span> {result.rentalRules.personalUse}</div>
          </div>
        </div>
      )}

      {result.transactionType === 'employment' && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Employment Compensation</h2>
          <div className="text-xs text-zinc-600 space-y-1">
            <div><span className="font-semibold">Reasonable:</span> {result.employmentRules.reasonableComp}</div>
            <div><span className="font-semibold">Excessive:</span> {result.employmentRules.excessiveRisk}</div>
            <div><span className="font-semibold">Family:</span> {result.employmentRules.familyRisk}</div>
          </div>
        </div>
      )}

      {result.isControlledEntity && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Controlled Entity Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Ownership:</span><span className="font-bold ml-2">{result.ownershipPercentage}%</span></div>
            <div><span className="text-zinc-600">Controlled:</span><span className={`font-bold ml-2 ${result.isControlled ? 'text-purple-700' : 'text-zinc-600'}`}>{result.isControlled ? 'YES' : 'NO'}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">More than {result.controlledThreshold}% ownership = controlled entity. Related party rules apply.</div>
        </div>
      )}

      <div className={`card mb-6 ${result.isLoss && result.isLossDisallowed ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Attribution Rules</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Family:</span> {result.attributionRules.familyAttribution}</div>
          <div><span className="font-semibold">Entity:</span> {result.attributionRules.entityAttribution}</div>
          <div><span className="font-semibold">Partnership:</span> {result.attributionRules.partnershipAttribution}</div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategies</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.strategies.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Warnings & Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
          <li>Spouse transactions generally exempt</li>
          <li>Document fair market value</li>
          <li>Use independent appraisals</li>
          <li>Section 267 applies to losses</li>
          <li>Section 267(d) for deferred gains</li>
        </ul>
      </div>
    </div>
  )
}