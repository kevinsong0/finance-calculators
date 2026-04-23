'use client'

import { useState } from 'react'

export default function Section199ADeductionMaximizerCalculator() {
  const [businessIncome, setBusinessIncome] = useState(150000)
  const [businessType, setBusinessType] = useState<'service' | 'nonService'>('nonService')
  const [w2Wages, setW2Wages] = useState(50000)
  const [qualifiedProperty, setQualifiedProperty] = useState(100000)
  const [taxableIncome, setTaxableIncome] = useState(120000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    // SSTB (Specified Service Trade or Business) limitations
    const sstbThresholdStart = filingStatus === 'single' ? 170050 : 340100
    const sstbThresholdEnd = filingStatus === 'single' ? 220050 : 440100

    // QBI deduction limits
    const qbiThresholdStart = filingStatus === 'single' ? 170050 : 340100
    const qbiThresholdEnd = filingStatus === 'single' ? 220050 : 440100

    // Calculate QBI deduction
    let qbiDeduction = 0
    let deductionPhaseout = 0
    let deductionType = 'Full'

    // Step 1: Tentative deduction (20% of QBI)
    const tentativeDeduction = businessIncome * 0.20

    // SSTB business: phaseout above threshold
    if (businessType === 'service') {
      if (taxableIncome <= sstbThresholdStart) {
        qbiDeduction = tentativeDeduction
        deductionType = 'Full (SSTB below threshold)'
      } else if (taxableIncome >= sstbThresholdEnd) {
        qbiDeduction = 0
        deductionType = 'None (SSTB above phaseout)'
        deductionPhaseout = 100
      } else {
        // Phaseout range
        const phaseoutPercent = (taxableIncome - sstbThresholdStart) / (sstbThresholdEnd - sstbThresholdStart) * 100
        qbiDeduction = tentativeDeduction * (1 - phaseoutPercent / 100)
        deductionPhaseout = phaseoutPercent
        deductionType = 'Partial phaseout'
      }
    } else {
      // Non-SSTB business
      if (taxableIncome <= qbiThresholdStart) {
        qbiDeduction = tentativeDeduction
        deductionType = 'Full (below threshold)'
      } else if (taxableIncome <= qbiThresholdEnd) {
        // Phaseout: apply wage/property limitation
        const wageLimit = w2Wages * 0.50
        const propertyLimit = w2Wages * 0.25 + qualifiedProperty * 0.025
        const wageOrPropertyLimit = Math.max(wageLimit, propertyLimit)

        // Phaseout calculation
        const phaseoutPercent = (taxableIncome - qbiThresholdStart) / (qbiThresholdEnd - qbiThresholdStart)
        const excessDeduction = tentativeDeduction - wageOrPropertyLimit
        const reductionAmount = excessDeduction * phaseoutPercent
        qbiDeduction = tentativeDeduction - reductionAmount
        deductionPhaseout = phaseoutPercent * 100
        deductionType = 'Partial (wage/property limit applies)'
      } else {
        // Above threshold: full wage/property limitation
        const wageLimit = w2Wages * 0.50
        const propertyLimit = w2Wages * 0.25 + qualifiedProperty * 0.025
        const wageOrPropertyLimit = Math.max(wageLimit, propertyLimit)
        qbiDeduction = Math.min(tentativeDeduction, wageOrPropertyLimit)
        deductionType = 'Limited by wage/property'
      }
    }

    // Overall limitation: 20% of taxable income minus QBI deduction
    const taxableIncomeMinusQBI = taxableIncome - qbiDeduction
    const overallLimit = taxableIncomeMinusQBI * 0.20
    const finalQbiDeduction = Math.min(qbiDeduction, overallLimit)

    // Tax savings
    const marginalRate = getMarginalRate(taxableIncome, filingStatus)
    const taxSavings = finalQbiDeduction * marginalRate

    // Optimization opportunities
    const maxDeductionWithoutLimit = businessIncome * 0.20
    const lostDeduction = maxDeductionWithoutLimit - finalQbiDeduction
    const lostTaxSavings = lostDeduction * marginalRate

    // Wage/property requirement for full deduction
    const requiredWages = businessType === 'nonService' && taxableIncome > qbiThresholdEnd
      ? businessIncome * 0.50 / 0.50 // Need wages = businessIncome for 50% limit to equal 20% QBI
      : 0

    return {
      businessIncome: businessIncome.toFixed(0),
      businessType,
      taxableIncome: taxableIncome.toFixed(0),
      tentativeDeduction: tentativeDeduction.toFixed(0),
      w2Wages: w2Wages.toFixed(0),
      qualifiedProperty: qualifiedProperty.toFixed(0),
      wageLimit: (w2Wages * 0.50).toFixed(0),
      propertyLimit: (w2Wages * 0.25 + qualifiedProperty * 0.025).toFixed(0),
      qbiDeduction: qbiDeduction.toFixed(0),
      finalQbiDeduction: finalQbiDeduction.toFixed(0),
      deductionType,
      deductionPhaseout: deductionPhaseout.toFixed(1),
      overallLimit: overallLimit.toFixed(0),
      marginalRate: (marginalRate * 100).toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      maxDeductionWithoutLimit: maxDeductionWithoutLimit.toFixed(0),
      lostDeduction: lostDeduction.toFixed(0),
      lostTaxSavings: lostTaxSavings.toFixed(0),
      filingStatus,
      qbiThresholdStart: qbiThresholdStart.toFixed(0),
      qbiThresholdEnd: qbiThresholdEnd.toFixed(0),
      sstbThresholdStart: sstbThresholdStart.toFixed(0),
      sstbThresholdEnd: sstbThresholdEnd.toFixed(0),
    }
  }

  const getMarginalRate = (income: number, status: 'single' | 'married'): number => {
    const bracketsSingle = [11600, 47150, 100525, 191950, 243725, 609350]
    const bracketsMarried = [23200, 94300, 201050, 383900, 487450, 731200]
    const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
    const brackets = status === 'single' ? bracketsSingle : bracketsMarried
    for (let i = 0; i < brackets.length; i++) {
      if (income <= brackets[i]) return rates[i]
    }
    return rates[6]
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Section 199A Deduction Maximizer</h1>
      <p className="text-gray-600 mb-4">Calculate and optimize Qualified Business Income (QBI) deduction.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Business Income ($)</label>
          <input type="number" value={businessIncome} onChange={(e) => setBusinessIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business Type</label>
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value as 'service' | 'nonService')} className="w-full border rounded p-2">
            <option value="nonService">Non-SSTB (Real estate, manufacturing, etc.)</option>
            <option value="service">SSTB (Health, law, consulting, etc.)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">W-2 Wages Paid ($)</label>
          <input type="number" value={w2Wages} onChange={(e) => setW2Wages(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Qualified Property Basis ($)</label>
          <input type="number" value={qualifiedProperty} onChange={(e) => setQualifiedProperty(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taxable Income (Before QBI) ($)</label>
          <input type="number" value={taxableIncome} onChange={(e) => setTaxableIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">QBI Thresholds (2024)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Threshold Start:</span><span className="font-medium ml-2">$ {result.qbiThresholdStart}</span></div>
          <div><span className="text-zinc-600">Threshold End:</span><span className="font-medium ml-2">$ {result.qbiThresholdEnd}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Below threshold: full 20% deduction. Above: wage/property limitations apply.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tentative Deduction</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Business Income:</span><span className="font-bold ml-2">$ {result.businessIncome}</span></div>
          <div><span className="text-zinc-600">20% Tentative:</span><span className="font-bold text-purple-700 ml-2">$ {result.tentativeDeduction}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Wage/Property Limits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">W-2 Wages:</span><span className="font-medium ml-2">$ {result.w2Wages}</span></div>
          <div><span className="text-zinc-600">50% of Wages:</span><span className="font-bold ml-2">$ {result.wageLimit}</span></div>
          <div><span className="text-zinc-600">25% Wages + 2.5% Prop:</span><span className="font-bold ml-2">$ {result.propertyLimit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Above threshold: deduction limited by greater of 50% wages or 25% wages + 2.5% property.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Final QBI Deduction</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Type:</span><span className="font-bold text-green-700 ml-2">{result.deductionType}</span></div>
          <div><span className="text-zinc-600">Phaseout:</span><span className="font-bold ml-2">{result.deductionPhaseout}%</span></div>
          <div><span className="text-zinc-600">Overall Limit:</span><span className="font-medium ml-2">$ {result.overallLimit}</span></div>
          <div><span className="text-zinc-600">Final Deduction:</span><span className="font-bold text-green-700 ml-2">$ {result.finalQbiDeduction}</span></div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Marginal Rate:</span><span className="font-bold ml-2">{result.marginalRate}%</span></div>
          <div><span className="text-zinc-600">Tax Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span></div>
          <div><span className="text-zinc-600">Lost Deduction:</span><span className="font-bold text-red-700 ml-2">$ {result.lostDeduction}</span></div>
          <div><span className="text-zinc-600">Lost Tax Savings:</span><span className="font-bold text-red-700 ml-2">$ {result.lostTaxSavings}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">QBI Deduction Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Maximize W-2 wages to increase deduction limit above threshold</li>
          <li>SSTB: income below threshold for full deduction</li>
          <li>Non-SSTB: hire employees or buy property for limit increase</li>
          <li>Aggregate multiple businesses: combine for wage/property limits</li>
          <li>Trust/estate: special rules for pass-through entities</li>
          <li>Specified service: phaseout begins at {result.sstbThresholdStart}</li>
        </ul>
      </div>
    </div>
  )
}