'use client'

import { useState } from 'react'

export default function AMTCalculator() {
  const [regularTaxableIncome, setRegularTaxableIncome] = useState('')
  const [amtAdjustments, setAmtAdjustments] = useState('')
  const [amtPreferences, setAmtPreferences] = useState('')
  const [filingStatus, setFilingStatus] = useState('single')
  const [taxYear, setTaxYear] = useState('2026')
  const [itemizedDeductions, setItemizedDeductions] = useState('')
  const [standardDeductionUsed, setStandardDeductionUsed] = useState(true)
  const [medicalExpenses, setMedicalExpenses] = useState('')
  const [miscellaneousDeductions, setMiscellaneousDeductions] = useState('')
  const [taxExemptInterest, setTaxExemptInterest] = useState('')
  const [incentiveStockOptions, setIncentiveStockOptions] = useState('')
  const [depreciationAdjustment, setDepreciationAdjustment] = useState('')

  const calculate = () => {
    const regularIncome = parseFloat(regularTaxableIncome) || 150000
    const adjustments = parseFloat(amtAdjustments) || 0
    const preferences = parseFloat(amtPreferences) || 50000
    const status = filingStatus
    const year = parseInt(taxYear) || 2026
    const itemized = parseFloat(itemizedDeductions) || 0
    const medExpenses = parseFloat(medicalExpenses) || 0
    const miscDeductions = parseFloat(miscellaneousDeductions) || 0
    const exemptInterest = parseFloat(taxExemptInterest) || 0
    const isoGain = parseFloat(incentiveStockOptions) || 50000
    const depAdjust = parseFloat(depreciationAdjustment) || 0

    // AMT Exemption Amounts (2026 estimated)
    const amtExemptions: Record<string, number> = {
      'single': 81700,
      'married': 127900,
      'head_household': 81700,
      'married_separate': 63950
    }

    // AMT Phase-out Thresholds
    const phaseOutThresholds: Record<string, number> = {
      'single': 593900,
      'married': 954300,
      'head_household': 593900,
      'married_separate': 477150
    }

    const exemption = amtExemptions[status as keyof typeof amtExemptions] || 81700
    const phaseOutThreshold = phaseOutThresholds[status as keyof typeof phaseOutThresholds] || 593900

    // Calculate AMTI (Alternative Minimum Taxable Income)
    // AMTI = Regular taxable income + AMT adjustments + AMT tax preferences
    // Key adjustments:
    // 1. Standard deduction not allowed for AMT
    // 2. Itemized deductions limited (medical over 10% AGI, miscellaneous deductions)
    // 3. ISO gain (difference between FMV and exercise price)
    // 4. Depreciation adjustment (150% declining balance vs straight-line)
    // 5. Private activity bond interest (tax preference)

    const stdDeductionDisallowance = standardDeductionUsed ? 0 : 0 // Standard deduction already not in taxable income
    const medicalAdjustment = medExpenses * 0.025 // Only 10% AGI allowed for AMT (vs 7.5% for regular)
    const miscAdjustment = miscDeductions // Miscellaneous deductions not allowed for AMT
    const isoAdjustment = isoGain // ISO bargain element
    const depAdjustmentAmount = depAdjust // Depreciation difference
    const privateActivityBond = exemptInterest * 0.75 // Tax preference for private activity bonds

    const totalAdjustments = medicalAdjustment + miscAdjustment + isoAdjustment + depAdjustmentAmount + privateActivityBond

    const amtIncome = regularIncome + totalAdjustments

    // Phase-out calculation
    // Exemption reduced by 25% of AMTI over threshold
    let reducedExemption = exemption
    if (amtIncome > phaseOutThreshold) {
      const excess = amtIncome - phaseOutThreshold
      const phaseOutAmount = excess * 0.25
      reducedExemption = Math.max(0, exemption - phaseOutAmount)
    }

    // AMT Tax Base
    const amtTaxBase = amtIncome - reducedExemption

    // AMT Tax Rate (26% up to threshold, 28% above)
    const amt26Threshold = 220700 // 2026 estimated
    const amt26Rate = 0.26
    const amt28Rate = 0.28

    let amtTax = 0
    if (amtTaxBase <= amt26Threshold) {
      amtTax = amtTaxBase * amt26Rate
    } else {
      amtTax = amt26Threshold * amt26Rate + (amtTaxBase - amt26Threshold) * amt28Rate
    }

    // Regular Tax Calculation (simplified)
    // Assume 22% average rate for regular tax on taxable income
    const regularTaxRate = 0.22
    const regularTax = regularIncome * regularTaxRate

    // AMT applies if AMT > Regular Tax
    const amtApplies = amtTax > regularTax
    const amtDue = amtApplies ? amtTax - regularTax : 0
    const totalTaxDue = Math.max(amtTax, regularTax)

    // AMT Credit (for future use)
    // Can carry forward to offset regular tax in future years
    const amtCreditGenerated = amtDue

    // Warning triggers
    const triggersIso = isoGain > 0
    const triggersPrivateActivity = exemptInterest > 0
    const triggersItemized = !standardDeductionUsed && itemized > 10000
    const triggersDepreciation = depAdjust > 0

    const triggerCount = [triggersIso, triggersPrivateActivity, triggersItemized, triggersDepreciation].filter(Boolean).length

    return {
      regularTaxableIncome: regularIncome.toFixed(2),
      filingStatus: status,
      taxYear: year,
      amtExemption: exemption.toFixed(0),
      phaseOutThreshold: phaseOutThreshold.toFixed(0),
      reducedExemption: reducedExemption.toFixed(2),
      isoGain: isoGain.toFixed(2),
      medicalAdjustment: medicalAdjustment.toFixed(2),
      miscAdjustment: miscAdjustment.toFixed(2),
      depAdjustment: depAdjustmentAmount.toFixed(2),
      privateActivityBond: privateActivityBond.toFixed(2),
      totalAdjustments: totalAdjustments.toFixed(2),
      amtIncome: amtIncome.toFixed(2),
      amtTaxBase: amtTaxBase.toFixed(2),
      amt26Rate: '26%',
      amt28Rate: '28%',
      amtTax: amtTax.toFixed(2),
      regularTax: regularTax.toFixed(2),
      amtApplies,
      amtDue: amtDue.toFixed(2),
      totalTaxDue: totalTaxDue.toFixed(2),
      amtCreditGenerated: amtCreditGenerated.toFixed(2),
      triggersIso,
      triggersPrivateActivity,
      triggersItemized,
      triggersDepreciation,
      triggerCount,
      amt26Threshold: amt26Threshold.toFixed(0),
      exemptionPhaseOutRate: '25%',
      hasAmtRisk: amtTaxBase > 0 || isoGain > 0
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Alternative Minimum Tax (AMT) Calculator</h1>
      <p className="text-zinc-600">Calculate AMT liability and identify tax preference items that trigger alternative minimum tax.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income & Filing Status</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single ($81,700 exemption)</option>
              <option value="married">Married Joint ($127,900 exemption)</option>
              <option value="head_household">Head of Household ($81,700 exemption)</option>
              <option value="married_separate">Married Separate ($63,950 exemption)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Regular Taxable Income</label>
            <input
              type="number"
              value={regularTaxableIncome}
              onChange={(e) => setRegularTaxableIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter taxable income from Form 1040"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Used Standard Deduction?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={standardDeductionUsed}
                onChange={(e) => setStandardDeductionUsed(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Standard deduction used (not itemized)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">AMT Adjustment Items</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Incentive Stock Options (ISO) Gain</label>
            <input
              type="number"
              value={incentiveStockOptions}
              onChange={(e) => setIncentiveStockOptions(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Bargain element: FMV minus exercise price"
            />
            <div className="text-xs text-zinc-500 mt-1">
              ISO exercises are major AMT trigger. Report difference between fair market value and exercise price.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Medical Expenses Adjustment</label>
            <input
              type="number"
              value={medicalExpenses}
              onChange={(e) => setMedicalExpenses(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Medical expenses over 7.5% AGI"
            />
            <div className="text-xs text-zinc-500 mt-1">
              For AMT, only medical expenses over 10% AGI allowed (difference added back).
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Miscellaneous Itemized Deductions</label>
            <input
              type="number"
              value={miscellaneousDeductions}
              onChange={(e) => setMiscellaneousDeductions(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Investment expenses, tax prep fees, etc."
            />
            <div className="text-xs text-zinc-500 mt-1">
              Miscellaneous deductions disallowed for AMT (added back to income).
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Depreciation Adjustment</label>
            <input
              type="number"
              value={depreciationAdjustment}
              onChange={(e) => setDepreciationAdjustment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Difference between regular and AMT depreciation"
            />
            <div className="text-xs text-zinc-500 mt-1">
              AMT requires slower depreciation (150% declining balance vs accelerated).
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">AMT Tax Preference Items</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax-Exempt Interest (Private Activity Bonds)</label>
            <input
              type="number"
              value={taxExemptInterest}
              onChange={(e) => setTaxExemptInterest(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Interest from private activity bonds"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Private activity bond interest is AMT preference (75% added back).
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">AMT Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Regular Taxable Income</span>
            <span className="font-bold">$${result.regularTaxableIncome}</span>
          </div>
          <div className="bg-yellow-50 rounded p-3">
            <div className="font-medium mb-2">AMT Adjustments Added Back:</div>
            <div className="flex justify-between">
              <span className="text-zinc-600">ISO Gain</span>
              <span>$${result.isoGain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Medical Adjustment</span>
              <span>$${result.medicalAdjustment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Misc Deductions</span>
              <span>$${result.miscAdjustment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Depreciation</span>
              <span>$${result.depAdjustment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Private Activity Bond</span>
              <span>$${result.privateActivityBond}</span>
            </div>
            <div className="flex justify-between border-t border-yellow-200 pt-2 mt-2">
              <span className="font-medium">Total Adjustments</span>
              <span className="font-bold">$${result.totalAdjustments}</span>
            </div>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">AMT Income (AMTI)</span>
            <span className="font-bold">$${result.amtIncome}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">AMT Exemption ({result.filingStatus})</span>
            <span>$${result.amtExemption}</span>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Reduced Exemption (after phase-out)</span>
            <span>$${result.reducedExemption}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">AMT Tax Base</span>
            <span className="font-bold">$${result.amtTaxBase}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Comparison</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Regular Tax (estimated)</span>
            <span className="font-bold">$${result.regularTax}</span>
          </div>
          <div className="bg-orange-50 rounded p-3">
            <div className="flex justify-between">
              <span className="text-zinc-600">AMT Tax</span>
              <span className="font-bold text-orange-600">$${result.amtTax}</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              26% on first $${result.amt26Threshold}, 28% above
            </div>
          </div>
          {result.amtApplies && (
            <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
              <span className="font-medium">AMT Due (AMT minus Regular)</span>
              <span className="font-bold text-red-600">$${result.amtDue}</span>
            </div>
          )}
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="font-medium">Total Tax Liability</span>
            <span className="font-bold text-red-600">$${result.totalTaxDue}</span>
          </div>
        </div>
      </div>

      {result.amtApplies ? (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">AMT Applies - Additional Tax Due</h3>
          <div className="text-sm text-red-600">
            AMT of $${result.amtTax} exceeds regular tax of $${result.regularTax}. You owe additional $${result.amtDue} under AMT. Total tax: $${result.totalTaxDue}. Form 6251 required. AMT credit of $${result.amtCreditGenerated} generated for future years.
          </div>
        </div>
      ) : (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">No AMT - Regular Tax Higher</h3>
          <div className="text-sm text-green-600">
            Regular tax $${result.regularTax} exceeds AMT $${result.amtTax}. No AMT due. Total tax: $${result.totalTaxDue}. However, AMT adjustments may still need reporting on Form 6251.
          </div>
        </div>
      )}

      {result.triggerCount > 0 && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">AMT Trigger Analysis</h3>
          <div className="text-xs text-yellow-600">
            <div className="mb-2">You have {result.triggerCount} potential AMT trigger(s):</div>
            {result.triggersIso && <div>- ISO exercise: Major trigger. Consider selling shares same year to avoid AMT.</div>}
            {result.triggersPrivateActivity && <div>- Private activity bonds: Tax preference item.</div>}
            {result.triggersItemized && <div>- Large itemized deductions: Some disallowed for AMT.</div>}
            {result.triggersDepreciation && <div>- Accelerated depreciation: AMT requires slower method.</div>}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">AMT Rates & Exemption (2026)</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>26% Rate</strong>
            <div className="text-zinc-500">Up to $${result.amt26Threshold}</div>
            <div className="text-zinc-500">Lower AMTI bracket</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>28% Rate</strong>
            <div className="text-zinc-500">Above $${result.amt26Threshold}</div>
            <div className="text-zinc-500">Higher AMTI bracket</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Exemption Phase-Out</strong>
            <div className="text-zinc-500">25% over threshold</div>
            <div className="text-zinc-500">Exemption reduced</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">AMT Avoidance Strategies</h3>
        <div className="text-xs text-zinc-600">
          ISO timing: Sell ISO shares same year (disqualifying disposition) to avoid AMT, or wait until AMT credit can offset regular tax. Private activity bonds: Consider regular tax-exempt bonds instead. Itemized deductions: Standard deduction avoids AMT adjustments. Depreciation: Elect slower depreciation for AMT-safe. Income timing: Spread ISO exercises across years. AMT credit: Carry forward to offset future regular tax.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Form 6251 Requirements</h3>
        <div className="text-xs text-zinc-600">
          Must file Form 6251 if: AMT adjustments present, ISO exercised, tax preference items, or income exceeds exemption threshold. Even if no AMT due, Form 6251 may be required to report adjustments. AMT credit calculated on Form 8801 for carryforward.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          AMT ensures high-income taxpayers pay minimum tax. Two parallel tax systems: regular and AMT. Pay whichever is higher. AMT exemption phases out at higher incomes. ISO exercises are most common trigger. AMT credit can offset future regular tax. Consult tax advisor for complex AMT situations.
        </div>
      </div>
    </main>
  )
}