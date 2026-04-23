'use client'

import { useState } from 'react'

export default function GiftTaxCalculator() {
  const [giftAmount, setGiftAmount] = useState('')
  const [giftType, setGiftType] = useState('cash')
  const [recipientRelation, setRecipientRelation] = useState('non_spouse')
  const [donorLifetimeGifts, setDonorLifetimeGifts] = useState('')
  const [donorNetWorth, setDonorNetWorth] = useState('')
  const [giftSplitting, setGiftSplitting] = useState(false)
  const [giftYear, setGiftYear] = useState('2026')
  const [giftPurpose, setGiftPurpose] = useState('general')
  const [educationalPayment, setEducationalPayment] = useState('')
  const [medicalPayment, setMedicalPayment] = useState('')
  const [presentInterest, setPresentInterest] = useState(true)

  const calculate = () => {
    const gift = parseFloat(giftAmount) || 50000
    const type = giftType
    const relation = recipientRelation
    const lifetimeGifts = parseFloat(donorLifetimeGifts) || 0
    const netWorth = parseFloat(donorNetWorth) || 1000000
    const splitting = giftSplitting
    const year = parseInt(giftYear) || 2026
    const purpose = giftPurpose
    const eduPayment = parseFloat(educationalPayment) || 0
    const medPayment = parseFloat(medicalPayment) || 0
    const isPresentInterest = presentInterest

    // 2026 Gift Tax Annual Exclusion
    const annualExclusion = 18000 // 2026 estimated (increased from 2025)
    const annualExclusionSplit = splitting ? annualExclusion * 2 : annualExclusion

    // Gift Tax Exemptions and Exclusions
    // 1. Annual exclusion per recipient
    // 2. Educational exclusion (tuition paid directly to institution)
    // 3. Medical exclusion (payment directly to provider)
    // 4. Spouse unlimited marital deduction
    // 5. Charitable deduction
    // 6. Lifetime exemption (12.92M in 2026 estimated)

    const lifetimeExemption = 12920000 // 2026 estimated (indexed)

    // Check exclusions
    let taxableGift = gift

    // Spouse - unlimited marital deduction
    if (relation === 'spouse') {
      taxableGift = 0
    }

    // Educational exclusion (tuition paid directly)
    if (purpose === 'educational' && eduPayment > 0) {
      taxableGift = Math.max(0, gift - eduPayment)
    }

    // Medical exclusion (payment directly to provider)
    if (purpose === 'medical' && medPayment > 0) {
      taxableGift = Math.max(0, taxableGift - medPayment)
    }

    // Annual exclusion
    if (relation !== 'spouse' && isPresentInterest) {
      taxableGift = Math.max(0, taxableGift - annualExclusionSplit)
    }

    // Gift tax rates (unified with estate tax)
    // Progressive rates from 18% to 40%
    const giftTaxRates = [
      { min: 0, max: 10000, rate: 0.18 },
      { min: 10000, max: 20000, rate: 0.20 },
      { min: 20000, max: 40000, rate: 0.22 },
      { min: 40000, max: 60000, rate: 0.24 },
      { min: 60000, max: 80000, rate: 0.26 },
      { min: 80000, max: 100000, rate: 0.28 },
      { min: 100000, max: 150000, rate: 0.30 },
      { min: 150000, max: 250000, rate: 0.32 },
      { min: 250000, max: 500000, rate: 0.34 },
      { min: 500000, max: 750000, rate: 0.37 },
      { min: 750000, max: 1000000, rate: 0.39 },
      { min: 1000000, max: Infinity, rate: 0.40 }
    ]

    // Calculate lifetime taxable gifts
    const totalLifetimeTaxable = lifetimeGifts + taxableGift

    // Check if lifetime exemption covers it
    const exemptionUsed = Math.min(totalLifetimeTaxable, lifetimeExemption)
    const exemptionRemaining = lifetimeExemption - exemptionUsed

    // Tax due on amount over lifetime exemption
    const amountOverExemption = Math.max(0, totalLifetimeTaxable - lifetimeExemption)

    // Calculate gift tax
    let giftTax = 0
    let cumulativeTax = 0
    let remainingAmount = amountOverExemption

    for (const bracket of giftTaxRates) {
      if (remainingAmount <= 0) break
      const bracketAmount = Math.min(remainingAmount, bracket.max - bracket.min)
      cumulativeTax += bracketAmount * bracket.rate
      remainingAmount -= bracketAmount
    }

    // Simplified: if under lifetime exemption, no tax due now
    // But must report on Form 709
    const taxDueNow = totalLifetimeTaxable <= lifetimeExemption ? 0 : cumulativeTax

    // Net gift (after tax, if donor pays tax)
    const netGiftToRecipient = gift - taxDueNow

    // Future estate tax impact
    // Lifetime gifts reduce estate tax exemption available
    const estateExemptionAvailable = lifetimeExemption - exemptionUsed

    // Generation-skipping transfer tax (GST)
    // Applies to gifts to grandchildren (skip generation)
    const gstTaxApplies = relation === 'grandchild' && taxableGift > 0
    const gstRate = 0.40
    const gstExemption = lifetimeExemption // Same as gift/estate exemption
    const gstTax = gstTaxApplies && taxableGift > gstExemption ? (taxableGift - gstExemption) * gstRate : 0

    // Gift tax reporting threshold
    const reportingRequired = gift > annualExclusionSplit || !isPresentInterest || taxableGift > 0

    // Valuation considerations
    let valuationNote = ''
    if (type === 'property') {
      valuationNote = 'Real estate: Use fair market value (FMV). Appraisal recommended.'
    } else if (type === 'stock') {
      valuationNote = 'Stocks: FMV on date of gift. Use average trading price.'
    } else if (type === 'business') {
      valuationNote = 'Business interest: Professional valuation required.'
    } else {
      valuationNote = 'Cash: Value equals amount transferred.'
    }

    return {
      giftAmount: gift.toFixed(2),
      giftType: type,
      recipientRelation: relation,
      giftYear: year,
      annualExclusion: annualExclusion.toFixed(0),
      annualExclusionUsed: annualExclusionSplit.toFixed(0),
      giftSplitting: splitting,
      educationalPayment: eduPayment.toFixed(2),
      medicalPayment: medPayment.toFixed(2),
      taxableGift: taxableGift.toFixed(2),
      lifetimeGifts: lifetimeGifts.toFixed(2),
      totalLifetimeTaxable: totalLifetimeTaxable.toFixed(2),
      lifetimeExemption: lifetimeExemption.toFixed(0),
      exemptionUsed: exemptionUsed.toFixed(2),
      exemptionRemaining: exemptionRemaining.toFixed(2),
      amountOverExemption: amountOverExemption.toFixed(2),
      giftTax: giftTax.toFixed(2),
      taxDueNow: taxDueNow.toFixed(2),
      netGiftToRecipient: netGiftToRecipient.toFixed(2),
      donorNetWorth: netWorth.toFixed(2),
      estateExemptionAvailable: estateExemptionAvailable.toFixed(2),
      gstTaxApplies,
      gstTax: gstTax.toFixed(2),
      reportingRequired,
      isPresentInterest,
      valuationNote,
      spouseExemption: relation === 'spouse' ? 'Unlimited marital deduction' : 'N/A',
      hasExclusions: purpose === 'educational' || purpose === 'medical',
      giftPurpose: purpose
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Gift Tax Calculator</h1>
      <p className="text-zinc-600">Calculate federal gift tax on transfers, understand exclusions, and plan estate tax impact.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Gift Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gift Type</label>
            <select
              value={giftType}
              onChange={(e) => setGiftType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="cash">Cash / Check</option>
              <option value="property">Real Estate</option>
              <option value="stock">Stocks / Securities</option>
              <option value="business">Business Interest</option>
              <option value="personal">Personal Property</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gift Amount (FMV)</label>
            <input
              type="number"
              value={giftAmount}
              onChange={(e) => setGiftAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter fair market value"
            />
            <div className="text-xs text-zinc-500 mt-1">{result.valuationNote}</div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Recipient Relation</label>
            <select
              value={recipientRelation}
              onChange={(e) => setRecipientRelation(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="non_spouse">Non-Spouse Individual</option>
              <option value="spouse">Spouse (Unlimited Marital Deduction)</option>
              <option value="child">Child</option>
              <option value="grandchild">Grandchild (GST Tax May Apply)</option>
              <option value="charity">Charitable Organization</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gift Purpose</label>
            <select
              value={giftPurpose}
              onChange={(e) => setGiftPurpose(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="general">General Gift</option>
              <option value="educational">Educational Tuition Payment</option>
              <option value="medical">Medical Expense Payment</option>
            </select>
            <div className="text-xs text-zinc-500 mt-1">
              Educational/medical payments directly to institution/provider are unlimited exclusions.
            </div>
          </div>
          {result.giftPurpose === 'educational' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Tuition Paid Directly to Institution</label>
              <input
                type="number"
                value={educationalPayment}
                onChange={(e) => setEducationalPayment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Amount paid directly to school"
              />
            </div>
          )}
          {result.giftPurpose === 'medical' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Medical Payment Directly to Provider</label>
              <input
                type="number"
                value={medicalPayment}
                onChange={(e) => setMedicalPayment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Amount paid directly to hospital/provider"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gift Year</label>
            <select
              value={giftYear}
              onChange={(e) => setGiftYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2026">2026 ($18,000 annual exclusion)</option>
              <option value="2025">2025 ($17,000 annual exclusion)</option>
              <option value="2024">2024 ($17,000 annual exclusion)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Gift Splitting (Married)</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={giftSplitting}
                onChange={(e) => setGiftSplitting(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Split gift with spouse (doubles annual exclusion to $36,000)</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Present Interest Gift?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={presentInterest}
                onChange={(e) => setPresentInterest(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Recipient has immediate access (present interest)</span>
            </label>
            <div className="text-xs text-zinc-500 mt-1">
              Future interest gifts (e.g., trust with restrictions) do not qualify for annual exclusion.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Donor Lifetime Gift History</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Prior Lifetime Taxable Gifts</label>
            <input
              type="number"
              value={donorLifetimeGifts}
              onChange={(e) => setDonorLifetimeGifts(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Total prior gifts reported on Form 709"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Donor Net Worth (Approximate)</label>
            <input
              type="number"
              value={donorNetWorth}
              onChange={(e) => setDonorNetWorth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Total assets for estate planning"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Gift Tax Exclusions</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Original Gift Amount</span>
            <span className="font-bold">$${result.giftAmount}</span>
          </div>
          {result.recipientRelation === 'spouse' && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Spouse - Marital Deduction</span>
              <span className="font-bold text-green-600">-$${result.giftAmount}</span>
            </div>
          )}
          {result.hasExclusions && result.educationalPayment !== '0.00' && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Educational Exclusion</span>
              <span className="font-bold text-green-600">-$${result.educationalPayment}</span>
            </div>
          )}
          {result.hasExclusions && result.medicalPayment !== '0.00' && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Medical Exclusion</span>
              <span className="font-bold text-green-600">-$${result.medicalPayment}</span>
            </div>
          )}
          {result.recipientRelation !== 'spouse' && result.isPresentInterest && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Annual Exclusion ({result.giftSplitting ? 'split' : 'single'})</span>
              <span className="font-bold text-green-600">-$${result.annualExclusionUsed}</span>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Taxable Gift</span>
            <span className="font-bold">$${result.taxableGift}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Lifetime Exemption Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Prior Lifetime Taxable Gifts</span>
            <span className="font-bold">$${result.lifetimeGifts}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">This Gift (Taxable)</span>
            <span className="font-bold">$${result.taxableGift}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">Total Lifetime Taxable Gifts</span>
            <span className="font-bold">$${result.totalLifetimeTaxable}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Lifetime Exemption ({result.giftYear})</span>
            <span className="font-bold">$${result.lifetimeExemption}</span>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Exemption Used</span>
            <span className="font-bold text-yellow-600">$${result.exemptionUsed}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Exemption Remaining</span>
            <span className="font-bold text-green-600">$${result.exemptionRemaining}</span>
          </div>
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Amount Over Exemption</span>
            <span className="font-bold text-red-600">$${result.amountOverExemption}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.taxDueNow) > 0 ? (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Gift Tax Due - Exemption Exceeded</h3>
          <div className="text-sm text-red-600">
            Lifetime gifts ($${result.totalLifetimeTaxable}) exceed exemption ($${result.lifetimeExemption}). Gift tax due: $${result.taxDueNow}. Tax rates: 18% to 40% progressive. Net gift to recipient: $${result.netGiftToRecipient}. File Form 709 by April 15.
          </div>
        </div>
      ) : (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">No Gift Tax Due - Within Exemption</h3>
          <div className="text-sm text-green-600">
            Taxable gift $${result.taxableGift} within lifetime exemption $${result.lifetimeExemption}. No tax due now. Exemption remaining: $${result.exemptionRemaining}. Must file Form 709 to report if over annual exclusion.
          </div>
        </div>
      )}

      {result.gstTaxApplies && (
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">Generation-Skipping Transfer (GST) Tax</h3>
          <div className="text-sm text-orange-600">
            Gift to grandchild may trigger GST tax (40% rate). GST exemption: $${result.lifetimeExemption}. GST tax due: $${result.gstTax}. GST tax applies when skipping a generation. Allocate GST exemption on Form 709.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Estate Tax Impact</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Donor Net Worth</span>
            <span className="font-bold">$${result.donorNetWorth}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Lifetime Exemption Used</span>
            <span className="font-bold">$${result.exemptionUsed}</span>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Estate Exemption Available</span>
            <span className="font-bold text-yellow-600">$${result.estateExemptionAvailable}</span>
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            Lifetime gifts reduce estate tax exemption. Estate tax (40%) applies to estate value over available exemption. Gift now vs leave in estate: consider tax impact.
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Gift Tax Rates (Unified with Estate Tax)</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <strong>$0-$10K</strong>
            <div>18%</div>
          </div>
          <div className="bg-white rounded p-2">
            <strong>$10K-$20K</strong>
            <div>20%</div>
          </div>
          <div className="bg-white rounded p-2">
            <strong>$20K-$40K</strong>
            <div>22%</div>
          </div>
          <div className="bg-white rounded p-2">
            <strong>$40K-$60K</strong>
            <div>24%</div>
          </div>
          <div className="bg-white rounded p-2">
            <strong>$60K-$80K</strong>
            <div>26%</div>
          </div>
          <div className="bg-white rounded p-2">
            <strong>$80K-$100K</strong>
            <div>28%</div>
          </div>
          <div className="bg-white rounded p-2">
            <strong>$100K-$1M</strong>
            <div>30-39%</div>
          </div>
          <div className="bg-red-50 rounded p-2">
            <strong>Over $1M</strong>
            <div className="text-red-600">40%</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Form 709 Requirements</h3>
        <div className="text-xs text-zinc-600">
          File Form 709 if: gift exceeds annual exclusion, future interest gift, gift splitting elected, GST allocation needed. Due April 15 following gift year. Report all taxable gifts. Track lifetime exemption usage. Educational/medical exclusions: no reporting needed for direct payments.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Gift Planning Strategies</h3>
        <div className="text-xs text-zinc-600">
          Annual exclusion gifts: Up to $18,000 per recipient yearly, tax-free. Gift splitting: Married couples can give $36,000 per recipient. Educational/medical: Unlimited if paid directly. Crummey trust: Qualify future gifts for annual exclusion with withdrawal right. Valuation discounts: Family business transfers may use minority/marketability discounts. Charitable lead trust: Gift to charity then remainder to heirs.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          Gift tax unified with estate tax (same exemption). 2026 lifetime exemption: ~$12.92M. Annual exclusion: $18,000 per recipient. Spouse: Unlimited marital deduction. Educational/medical: Unlimited direct payment exclusion. GST tax: 40% on generation-skipping gifts. File Form 709 for taxable gifts. Gifts reduce estate exemption. State gift tax: Most states have no gift tax.
        </div>
      </div>
    </main>
  )
}