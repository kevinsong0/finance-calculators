'use client'

import { useState } from 'react'

export default function SocialSecurityBenefitTaxationThresholdCalculator() {
  const [combinedIncome, setCombinedIncome] = useState(25000)
  const [socialSecurityBenefit, setSocialSecurityBenefit] = useState(18000)
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'married'>('single')
  const [ filingStatus, setFilingStatus] = useState<'single' | 'joint' | 'separate'>('single')

  const calculate = () => {
    // Social Security benefit taxation thresholds
    // Combined income = AGI + nontaxable interest + 50% of SS benefits

    // 2024 thresholds
    const thresholdsSingle = {
      base: 25000, // First tier: 50% taxable
      upper: 34000, // Second tier: 85% taxable
    }

    const thresholdsMarriedJoint = {
      base: 32000,
      upper: 44000,
    }

    const thresholdsMarriedSeparate = {
      base: 0, // All benefits potentially taxable
      upper: 0,
    }

    // Calculate combined income (provisional income)
    // combinedIncome input already includes AGI + nontaxable interest
    const provisionalIncome = combinedIncome + socialSecurityBenefit * 0.50

    // Determine applicable thresholds
    let baseThreshold = 0
    let upperThreshold = 0

    if (filingStatus === 'single') {
      baseThreshold = thresholdsSingle.base
      upperThreshold = thresholdsSingle.upper
    } else if (filingStatus === 'joint') {
      baseThreshold = thresholdsMarriedJoint.base
      upperThreshold = thresholdsMarriedJoint.upper
    } else {
      baseThreshold = thresholdsMarriedSeparate.base
      upperThreshold = thresholdsMarriedSeparate.upper
    }

    // Calculate taxable portion
    let taxableBenefit = 0
    let taxablePercentage = 0

    if (filingStatus === 'separate') {
      // Married filing separately: complex rules
      taxableBenefit = Math.min(socialSecurityBenefit * 0.85, provisionalIncome * 0.85)
      taxablePercentage = 85
    } else if (provisionalIncome <= baseThreshold) {
      // Below first threshold: none taxable
      taxableBenefit = 0
      taxablePercentage = 0
    } else if (provisionalIncome <= upperThreshold) {
      // Between thresholds: up to 50% taxable
      const excess = provisionalIncome - baseThreshold
      taxableBenefit = Math.min(socialSecurityBenefit * 0.50, excess * 0.50)
      taxablePercentage = 50
    } else {
      // Above upper threshold: up to 85% taxable
      const lowerExcess = upperThreshold - baseThreshold
      const upperExcess = provisionalIncome - upperThreshold
      const lowerTaxable = Math.min(socialSecurityBenefit * 0.50, lowerExcess * 0.50)
      const upperTaxable = Math.min(socialSecurityBenefit * 0.85 - lowerTaxable, upperExcess * 0.35)
      taxableBenefit = Math.min(socialSecurityBenefit * 0.85, lowerTaxable + upperTaxable)
      taxablePercentage = 85
    }

    // Non-taxable portion
    const nontaxableBenefit = socialSecurityBenefit - taxableBenefit

    // Tax impact estimate (assuming 12% marginal rate)
    const estimatedTaxRate = 12 // Simplified
    const taxImpact = taxableBenefit * estimatedTaxRate / 100

    // Annual tax savings if below threshold
    const thresholdGap = baseThreshold - provisionalIncome
    const belowThreshold = provisionalIncome <= baseThreshold

    // Strategies to reduce provisional income
    // - Roth conversions (don't add to AGI)
    // - Tax-exempt bonds (don't add but do count)
    // - Delay SS benefits
    // - Increase deductions

    return {
      combinedIncome: combinedIncome.toFixed(0),
      socialSecurityBenefit: socialSecurityBenefit.toFixed(0),
      maritalStatus,
      filingStatus,
      provisionalIncome: provisionalIncome.toFixed(0),
      baseThreshold: baseThreshold.toFixed(0),
      upperThreshold: upperThreshold.toFixed(0),
      taxableBenefit: taxableBenefit.toFixed(0),
      taxablePercentage: taxablePercentage.toFixed(0),
      nontaxableBenefit: nontaxableBenefit.toFixed(0),
      taxImpact: taxImpact.toFixed(0),
      thresholdGap: thresholdGap.toFixed(0),
      belowThreshold,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Benefit Taxation Threshold Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate how much of your Social Security benefits are taxable.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Combined Income (AGI + Interest)</label>
          <input type="number" value={combinedIncome} onChange={(e) => setCombinedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Social Security Benefit</label>
          <input type="number" value={socialSecurityBenefit} onChange={(e) => setSocialSecurityBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'joint' | 'separate')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="joint">Married Filing Jointly</option>
            <option value="separate">Married Filing Separately</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.belowThreshold ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.belowThreshold ? 'text-green-700' : 'text-orange-700'}`}>Provisional Income Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Provisional Income:</span><span className="font-medium ml-2">$ {result.provisionalIncome}</span></div>
          <div><span className="text-zinc-600">Base Threshold:</span><span className="font-medium ml-2">$ {result.baseThreshold}</span></div>
          <div><span className="text-zinc-600">Below Threshold:</span><span className={`font-bold ml-2 ${result.belowThreshold ? 'text-green-700' : 'text-orange-700'}`}>{result.belowThreshold ? 'Yes' : 'No'}</span></div>
        </div>
        {Number(result.thresholdGap) > 0 && (
          <div className="mt-2"><span className="text-zinc-600">Gap to Threshold:</span><span className="font-bold text-green-700 ml-2">$ {result.thresholdGap}</span></div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Provisional income = AGI + nontaxable interest + 50% of SS benefits.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Taxable Benefit Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total SS Benefit:</span><span className="font-medium ml-2">$ {result.socialSecurityBenefit}</span></div>
          <div><span className="text-zinc-600">Taxable Portion:</span><span className="font-bold text-purple-700 ml-2">$ {result.taxableBenefit}</span></div>
          <div><span className="text-zinc-600">Taxable %:</span><span className="font-bold text-purple-700 ml-2">{result.taxablePercentage}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Non-Taxable:</span><span className="font-bold text-green-700 ml-2">$ {result.nontaxableBenefit}</span></div>
          <div><span className="text-zinc-600">Est. Tax Impact:</span><span className="font-medium ml-2">$ {result.taxImpact}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Maximum taxable is 85% of benefits. Tax impact assumes 12% marginal rate.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 Taxation Thresholds</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-1 text-blue-700">Single</div>
            <div className="text-sm text-zinc-600">Base: $25,000 | Upper: $34,000</div>
          </div>
          <div>
            <div className="font-semibold mb-1 text-blue-700">Married Joint</div>
            <div className="text-sm text-zinc-600">Base: $32,000 | Upper: $44,000</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1 text-blue-700">Married Separate</div>
          <div className="text-sm text-zinc-600">Base: $0 - benefits likely taxable</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Below base: 0% taxable. Between: up to 50%. Above upper: up to 85%.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Reduction Strategies</h2>
        <ul className="text-sm text-zinc-600 space-y-1">
          <li>• Keep provisional income below thresholds</li>
          <li>• Roth conversions: distributions not counted</li>
          <li>• Delay Social Security to reduce benefit amount</li>
          <li>• Increase deductions (charitable, medical)</li>
          <li>• Tax-exempt bonds count in provisional income</li>
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Roth IRA distributions don't add to provisional income - effective strategy.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">SS Taxation Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Provisional income determines taxation</li>
          <li>Formula: AGI + tax-exempt interest + 50% SS</li>
          <li>Single: $25K-$34K = 50% taxable</li>
          <li>Single: above $34K = up to 85% taxable</li>
          <li>Married: $32K-$44K = 50% taxable</li>
          <li>Married: above $44K = up to 85% taxable</li>
          <li>Max taxable: 85% of benefits</li>
          <li>Roth distributions not counted</li>
          <li>Delay SS to reduce taxable amount</li>
          <li>Married separate: special rules</li>
        </ul>
      </div>
    </div>
  )
}