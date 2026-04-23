'use client'

import { useState } from 'react'

export default function SocialSecurityTaxBenefitOptimizerCalculator() {
  const [combinedIncome, setCombinedIncome] = useState(50000)
  const [socialSecurityBenefit, setSocialSecurityBenefit] = useState(24000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [stateTaxRate, setStateTaxRate] = useState(5)

  const calculate = () => {
    // Social Security taxation thresholds (2024)
    const singleBase = 25000
    const singleMax = 34000
    const marriedBase = 32000
    const marriedMax = 44000

    const base = filingStatus === 'single' ? singleBase : marriedBase
    const max = filingStatus === 'single' ? singleMax : marriedMax

    // Provisional income calculation
    // Combined income = AGI + tax-exempt interest + 50% of SS benefits
    const provisionalIncome = combinedIncome + socialSecurityBenefit * 0.5

    // Taxable SS calculation
    let taxableSS = 0
    let taxationRate = 0

    if (provisionalIncome <= base) {
      taxableSS = 0
      taxationRate = 0
    } else if (provisionalIncome <= max) {
      // Up to 50% of benefits taxable
      taxableSS = Math.min(
        socialSecurityBenefit * 0.5,
        (provisionalIncome - base) * 0.5
      )
      taxationRate = 50
    } else {
      // Up to 85% of benefits taxable
      const firstTier = Math.min(
        socialSecurityBenefit * 0.5,
        (max - base) * 0.5
      )
      const secondTier = Math.min(
        socialSecurityBenefit * 0.35,
        (provisionalIncome - max) * 0.85
      )
      taxableSS = Math.min(socialSecurityBenefit * 0.85, firstTier + secondTier)
      taxationRate = 85
    }

    // Federal tax on SS (using 12% and 22% brackets estimate)
    const federalTaxRate = combinedIncome < 40000 ? 0.10 : combinedIncome < 90000 ? 0.12 : 0.22
    const federalTaxOnSS = taxableSS * federalTaxRate

    // State tax on SS (varies by state)
    const stateTaxOnSS = taxableSS * stateTaxRate / 100

    // Total tax impact
    const totalTaxOnSS = federalTaxOnSS + stateTaxOnSS
    const netSSBenefit = socialSecurityBenefit - totalTaxOnSS

    // Optimization strategies
    // Threshold to avoid taxation
    const thresholdToAvoid = base - combinedIncome - socialSecurityBenefit * 0.5
    const reductionNeeded = provisionalIncome - base
    const maxTaxableSS = socialSecurityBenefit * 0.85

    // Tax savings if below threshold
    const potentialTaxSavings = totalTaxOnSS

    // Strategies to reduce provisional income
    const strategies = [
      { name: 'Reduce MAGI', amount: Math.max(0, reductionNeeded).toFixed(0), impact: 'Move below taxation threshold' },
      { name: 'Roth conversions', amount: 'Year before 62', impact: 'No income impact on SS taxation' },
      { name: 'Tax-exempt bonds', amount: 'No', impact: 'Still counted in provisional income!' },
      { name: 'Delay SS to 70', amount: 'Higher benefit', impact: 'But higher taxation threshold same' },
    ]

    return {
      combinedIncome: combinedIncome.toFixed(0),
      socialSecurityBenefit: socialSecurityBenefit.toFixed(0),
      filingStatus,
      provisionalIncome: provisionalIncome.toFixed(0),
      baseThreshold: base.toFixed(0),
      maxThreshold: max.toFixed(0),
      taxableSS: taxableSS.toFixed(0),
      taxationRate: taxationRate.toFixed(0),
      federalTaxRate: (federalTaxRate * 100).toFixed(0),
      federalTaxOnSS: federalTaxOnSS.toFixed(0),
      stateTaxRate: stateTaxRate.toFixed(0),
      stateTaxOnSS: stateTaxOnSS.toFixed(0),
      totalTaxOnSS: totalTaxOnSS.toFixed(0),
      netSSBenefit: netSSBenefit.toFixed(0),
      thresholdToAvoid: thresholdToAvoid.toFixed(0),
      reductionNeeded: reductionNeeded.toFixed(0),
      maxTaxableSS: maxTaxableSS.toFixed(0),
      potentialTaxSavings: potentialTaxSavings.toFixed(0),
      strategies,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Tax Benefit Optimizer Calculator</h1>
      <p className="text-gray-600 mb-4">Minimize taxation of your Social Security benefits through income management.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Combined Income (MAGI) ($)</label>
          <input type="number" value={combinedIncome} onChange={(e) => setCombinedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Social Security Benefit ($)</label>
          <input type="number" value={socialSecurityBenefit} onChange={(e) => setSocialSecurityBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateTaxRate} min="0" max="15" onChange={(e) => setStateTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Provisional Income Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">MAGI:</span><span className="font-medium ml-2">$ {result.combinedIncome}</span></div>
          <div><span className="text-zinc-600">SS Benefit:</span><span className="font-medium ml-2">$ {result.socialSecurityBenefit}</span></div>
          <div><span className="text-zinc-600">50% SS:</span><span className="font-medium ml-2">$ {(Number(result.socialSecurityBenefit) * 0.5).toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Provisional Income:</span><span className="font-bold text-blue-700 ml-2">$ {result.provisionalIncome}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Provisional income = MAGI + tax-exempt interest + 50% of SS benefits.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Taxation Thresholds</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Base Threshold:</span><span className="font-medium ml-2">$ {result.baseThreshold}</span></div>
          <div><span className="text-zinc-600">Max Threshold:</span><span className="font-medium ml-2">$ {result.maxThreshold}</span></div>
          <div><span className="text-zinc-600">Your Status:</span><span className={`font-bold ml-2 ${Number(result.taxationRate) === 0 ? 'text-green-700' : Number(result.taxationRate) === 50 ? 'text-orange-700' : 'text-red-700'}`}>{Number(result.taxationRate) === 0 ? 'None taxable' : Number(result.taxationRate) === 50 ? 'Up to 50%' : 'Up to 85%'}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Taxable SS:</span><span className={`font-bold ml-2 ${Number(result.taxableSS) > 0 ? 'text-purple-700' : 'text-green-700'}`}>$ {result.taxableSS}</span></div>
          <div><span className="text-zinc-600">Federal Tax:</span><span className={`font-bold ml-2 ${Number(result.federalTaxOnSS) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.federalTaxOnSS}</span></div>
          <div><span className="text-zinc-600">State Tax:</span><span className={`font-bold ml-2 ${Number(result.stateTaxOnSS) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.stateTaxOnSS}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Tax on SS:</span><span className={`font-bold ml-2 ${Number(result.totalTaxOnSS) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.totalTaxOnSS}</span></div>
          <div><span className="text-zinc-600">Net SS Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.netSSBenefit}</span></div>
        </div>
      </div>

      {Number(result.taxableSS) > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Optimization Strategies</h2>
          <div className="grid grid-cols-1 gap-2">
            {result.strategies.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                <div className="font-medium">{s.name}</div>
                <div className="text-zinc-600">{s.amount}</div>
                <div className="text-green-700">{s.impact}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Reduce Income by:</span><span className="font-bold text-green-700 ml-2">$ {result.reductionNeeded}</span></div>
            <div><span className="text-zinc-600">Potential Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.potentialTaxSavings}/yr</span></div>
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">SS Taxation Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Single: 0% taxable below $25K, up to 50% at $25K-$34K, 85% above $34K</li>
          <li>Married: 0% taxable below $32K, up to 50% at $32K-$44K, 85% above $44K</li>
          <li>Tax-exempt interest still counted in provisional income</li>
          <li>37 states exempt SS from state tax (check your state)</li>
          <li>Manage withdrawals to stay below thresholds</li>
          <li>Roth conversions before age 62 avoid SS taxation impact</li>
        </ul>
      </div>
    </div>
  )
}