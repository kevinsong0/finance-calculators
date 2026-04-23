'use client'

import { useState } from 'react'

export default function Section199ADeductionCalculator() {
  const [businessIncome, setBusinessIncome] = useState('200000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [w2Wages, setW2Wages] = useState('80000')
  const [ubiaProperty, setUbiaProperty] = useState('150000')
  const [isSstb, setIsSstb] = useState(false)
  const [sstbIncome, setSstbIncome] = useState('200000')
  const [otherIncome, setOtherIncome] = useState('50000')
  const [deductions, setDeductions] = useState('14600')
  const [specificationTradeOrBusiness, setSpecificationTradeOrBusiness] = useState('health')

  const taxableIncomeThresholds: Record<string, { phaseInStart: number; phaseInEnd: number }> = {
    single: { phaseInStart: 191950, phaseInEnd: 243725 },
    married: { phaseInStart: 383900, phaseInEnd: 487450 },
  }

  const calculate = () => {
    const qbi = parseFloat(businessIncome) || 0
    const wages = parseFloat(w2Wages) || 0
    const property = parseFloat(ubiaProperty) || 0
    const sstbIncomeAmount = parseFloat(sstbIncome) || 0
    const other = parseFloat(otherIncome) || 0
    const ded = parseFloat(deductions) || 0
    const thresholds = taxableIncomeThresholds[filingStatus]

    // Calculate taxable income before QBI deduction
    const totalGrossIncome = qbi + other
    const taxableBeforeQbi = Math.max(0, totalGrossIncome - ded)

    // Basic QBI deduction (20% of QBI)
    const basicQbiDeduction = qbi * 0.20

    // QBI deduction limited to 20% of taxable income
    const taxableIncomeLimit = taxableBeforeQbi * 0.20

    // Determine phase-in status
    const belowThreshold = taxableBeforeQbi <= thresholds.phaseInStart
    const aboveThreshold = taxableBeforeQbi >= thresholds.phaseInEnd
    const inPhaseIn = !belowThreshold && !aboveThreshold

    // Calculate wage and property limitations
    // Wage-only limit: 50% of W-2 wages
    const wageOnlyLimit = wages * 0.50

    // Wage + property limit: 25% of W-2 wages + 2.5% of UBIA property
    const wagePropertyLimit = (wages * 0.25) + (property * 0.025)

    // Use higher of wage-only or wage+property
    const wagePropertyBasedLimit = Math.max(wageOnlyLimit, wagePropertyLimit)

    // SSTB limitation for high-income taxpayers
    let sstbReduction = 0
    let sstbReductionRatio = 0

    if (isSstb && taxableBeforeQbi > thresholds.phaseInStart) {
      if (aboveThreshold) {
        // SSTB completely disqualified for taxable income above phase-in end
        sstbReductionRatio = 1
      } else {
        // SSTB partially reduced during phase-in range
        sstbReductionRatio = (taxableBeforeQbi - thresholds.phaseInStart) /
                             (thresholds.phaseInEnd - thresholds.phaseInStart)
      }
      sstbReduction = qbi * sstbReductionRatio
    }

    // Adjusted QBI after SSTB reduction
    const adjustedQbi = Math.max(0, qbi - sstbReduction)

    // Final QBI deduction calculation based on taxable income level
    let finalQbiDeduction = 0
    let limitationReason = ''

    if (belowThreshold) {
      // Below threshold: Full QBI deduction, no wage/property limit
      finalQbiDeduction = Math.min(basicQbiDeduction, taxableIncomeLimit)
      limitationReason = isSstb ? 'No SSTB limit below threshold' : 'No wage/property limit below threshold'
    } else if (aboveThreshold) {
      // Above threshold: Subject to wage/property limit
      if (isSstb) {
        finalQbiDeduction = 0 // SSTB completely disqualified
        limitationReason = 'SSTB disqualified above threshold'
      } else {
        const qbiBasedLimit = adjustedQbi * 0.20
        finalQbiDeduction = Math.min(qbiBasedLimit, wagePropertyBasedLimit, taxableIncomeLimit)
        limitationReason = `Wage/property limit applies (${wagePropertyBasedLimit.toFixed(2)})`
      }
    } else {
      // In phase-in range: Partial wage/property limit
      const phaseInRatio = (taxableBeforeQbi - thresholds.phaseInStart) /
                           (thresholds.phaseInEnd - thresholds.phaseInStart)
      const partialWageLimit = wagePropertyBasedLimit * phaseInRatio
      const qbiBasedLimit = adjustedQbi * 0.20

      if (isSstb) {
        finalQbiDeduction = Math.min(qbiBasedLimit, partialWageLimit, taxableIncomeLimit)
        limitationReason = `Partial SSTB reduction (${parseFloat(sstbReductionRatio.toFixed(1)) * 100}%) and partial wage limit`
      } else {
        finalQbiDeduction = Math.min(qbiBasedLimit, partialWageLimit, taxableIncomeLimit)
        limitationReason = `Partial wage/property limit (${parseFloat(phaseInRatio.toFixed(1)) * 100}%)`
      }
    }

    // Calculate tax savings
    const taxSavings = finalQbiDeduction * 0.22 // Approximate marginal rate

    // Effective deduction rate
    const effectiveRate = qbi > 0 ? (finalQbiDeduction / qbi) * 100 : 0

    return {
      businessIncome: qbi.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      w2Wages: wages.toFixed(2),
      ubiaProperty: property.toFixed(2),
      isSstb,
      sstbType: specificationTradeOrBusiness,
      sstbReduction: sstbReduction.toFixed(2),
      sstbReductionRatio: (sstbReductionRatio * 100).toFixed(1),
      adjustedQbi: adjustedQbi.toFixed(2),
      basicQbiDeduction: basicQbiDeduction.toFixed(2),
      taxableBeforeQbi: taxableBeforeQbi.toFixed(2),
      taxableIncomeLimit: taxableIncomeLimit.toFixed(2),
      wageOnlyLimit: wageOnlyLimit.toFixed(2),
      wagePropertyLimit: wagePropertyLimit.toFixed(2),
      wagePropertyBasedLimit: wagePropertyBasedLimit.toFixed(2),
      finalQbiDeduction: finalQbiDeduction.toFixed(2),
      limitationReason,
      taxSavings: taxSavings.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      belowThreshold,
      aboveThreshold,
      inPhaseIn,
      thresholdStart: thresholds.phaseInStart.toFixed(0),
      thresholdEnd: thresholds.phaseInEnd.toFixed(0),
      otherIncome: other.toFixed(2),
      deductions: ded.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Section 199A QBI Deduction Calculator</h1>
      <p className="text-zinc-600">Calculate the Qualified Business Income (QBI) deduction for pass-through businesses. Understand wage and property limitations, SSTB restrictions, and phase-in thresholds.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single (Threshold: $191,950 - $243,725)</option>
              <option value="married">Married Filing Jointly (Threshold: $383,900 - $487,450)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Qualified Business Income (QBI) ($)</label>
            <input
              type="number"
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Net income from sole proprietorship, partnership, or S-corp (before QBI deduction)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Income (W-2, investments) ($)</label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Deductions ($)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Wage & Property Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total W-2 Wages Paid ($)</label>
            <input
              type="number"
              value={w2Wages}
              onChange={(e) => setW2Wages(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Required for wage limitation calculation above threshold
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">UBIA of Qualified Property ($)</label>
            <input
              type="number"
              value={ubiaProperty}
              onChange={(e) => setUbiaProperty(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Unadjusted Basis Immediately After Acquisition - original purchase price of business property
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Specified Service Trade or Business (SSTB)</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSstb}
              onChange={(e) => setIsSstb(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">This is a Specified Service Trade or Business</label>
          </div>
          {isSstb && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Type of SSTB</label>
              <select
                value={specificationTradeOrBusiness}
                onChange={(e) => setSpecificationTradeOrBusiness(e.target.value)}
                className="input"
              >
                <option value="health">Health (doctors, nurses, pharmacists)</option>
                <option value="law">Law (attorneys, paralegals)</option>
                <option value="accounting">Accounting (CPAs, accountants)</option>
                <option value="actuarial">Actuarial Science</option>
                <option value="performing">Performing Arts</option>
                <option value="consulting">Consulting</option>
                <option value="financial">Financial Services (investment advisors)</option>
                <option value="brokerage">Brokerage Services</option>
                <option value="athletics">Athletics (professional athletes)</option>
                <option value="trades">Trades/Businesses involving reputation/skill</option>
              </select>
              <div className="text-xs text-yellow-600 mt-1">
                SSTBs face QBI deduction reduction above threshold ($191,950 Single, $383,900 MFJ)
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Taxable Income Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-medium ml-2">${result.taxableBeforeQbi}</span>
          </div>
          <div>
            <span className="text-zinc-600">Threshold Status:</span>
            <span className="font-medium ml-2">
              {result.belowThreshold ? 'Below Threshold' :
               result.aboveThreshold ? 'Above Threshold' : 'In Phase-In Range'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Phase-In Start:</span>
            <span className="font-medium ml-2">${result.thresholdStart}</span>
          </div>
          <div>
            <span className="text-zinc-600">Phase-In End:</span>
            <span className="font-medium ml-2">${result.thresholdEnd}</span>
          </div>
        </div>
      </div>

      {result.isSstb && !result.belowThreshold && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">SSTB Reduction</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">QBI Reduced:</span>
              <span className="font-medium ml-2">${result.sstbReduction}</span>
            </div>
            <div>
              <span className="text-zinc-600">Reduction %:</span>
              <span className="font-medium ml-2">{result.sstbReductionRatio}%</span>
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2">
            {result.aboveThreshold
              ? 'SSTB income completely disqualified above threshold'
              : `SSTB QBI partially reduced during phase-in`}
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Wage & Property Limits</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Wage-Only (50%):</span>
            <span className="font-medium ml-2">${result.wageOnlyLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Wage + Property:</span>
            <span className="font-medium ml-2">${result.wagePropertyLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Higher Limit:</span>
            <span className="font-medium ml-2">${result.wagePropertyBasedLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income Limit:</span>
            <span className="font-medium ml-2">${result.taxableIncomeLimit}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Final QBI Deduction</h3>
        <div className="text-2xl font-bold text-green-800">${result.finalQbiDeduction}</div>
        <div className="text-sm text-green-600 mt-1">
          {result.limitationReason}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-medium ml-2">{result.effectiveRate}% of QBI</span>
          </div>
          <div>
            <span className="text-zinc-600">Estimated Tax Savings:</span>
            <span className="font-medium ml-2">${result.taxSavings}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Section 199A Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Basic Deduction:</strong> 20% of qualified business income from pass-through entities.</li>
          <li><strong>Income Limit:</strong> Deduction cannot exceed 20% of taxable income (before QBI).</li>
          <li><strong>Below Threshold:</strong> Full 20% deduction, no wage/property limit ($191,950 Single).</li>
          <li><strong>Above Threshold:</strong> Limited by wage/property test: 50% of W-2 wages OR 25% wages + 2.5% UBIA property.</li>
          <li><strong>SSTB:</strong> Specified service businesses face deduction phase-out above threshold.</li>
          <li><strong>SSTB Types:</strong> Health, law, accounting, actuarial, performing arts, consulting, financial, brokerage, athletics.</li>
          <li><strong>UBIA Property:</strong> Original purchase price, not depreciated value. Must be held at least 3+ years.</li>
          <li><strong>Strategy:</strong> Hire employees, acquire business property, or convert to C-Corp for SSTBs above threshold.</li>
        </ul>
      </div>
    </main>
  )
}