'use client'

import { useState } from 'react'

export default function MedicarePartBIRMAACalculator() {
  const [modifiedAdjustedGrossIncome, setModifiedAdjustedGrossIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [yearType, setYearType] = useState<'current' | 'future'>('current')

  const calculate = () => {
    // IRMAA brackets and surcharges (2024)
    const bracketsSingle = [103000, 129000, 161000, 193000, 215000, 500000]
    const bracketsMarried = [206000, 258000, 322000, 386000, 430000, 750000]

    // IRMAA surcharge amounts per month for Part B (2024)
    const surchargesPartB = [0, 69.90, 174.20, 278.50, 382.80, 487.10, 487.10] // Above $500K same as bracket 6

    // IRMAA surcharge amounts per month for Part D (2024)
    const surchargesPartD = [0, 12.90, 32.10, 51.30, 70.50, 89.70, 89.70]

    const brackets = filingStatus === 'single' ? bracketsSingle : bracketsMarried
    let bracketIndex = 0

    for (let i = 0; i < brackets.length; i++) {
      if (modifiedAdjustedGrossIncome <= brackets[i]) {
        bracketIndex = i
        break
      }
      bracketIndex = brackets.length
    }

    const partBSurcharge = surchargesPartB[bracketIndex]
    const partDSurcharge = surchargesPartD[bracketIndex]
    const totalMonthlySurcharge = partBSurcharge + partDSurcharge

    // Base premiums
    const partBBasePremium = 174.70 // 2024 standard
    const partDBasePremium = 34.50 // Average estimate

    // Total premiums
    const partBTotal = partBBasePremium + partBSurcharge
    const partDTotal = partDBasePremium + partDSurcharge
    const monthlyTotal = partBTotal + partDTotal
    const annualTotal = monthlyTotal * 12

    // IRMAA tiers
    const tiers = [
      { name: 'Tier 1', threshold: filingStatus === 'single' ? '$103,000' : '$206,000', surcharge: '$69.90 Part B + $12.90 Part D' },
      { name: 'Tier 2', threshold: filingStatus === 'single' ? '$129,000' : '$258,000', surcharge: '$174.20 Part B + $32.10 Part D' },
      { name: 'Tier 3', threshold: filingStatus === 'single' ? '$161,000' : '$322,000', surcharge: '$278.50 Part B + $51.30 Part D' },
      { name: 'Tier 4', threshold: filingStatus === 'single' ? '$193,000' : '$386,000', surcharge: '$382.80 Part B + $70.50 Part D' },
      { name: 'Tier 5', threshold: filingStatus === 'single' ? '$215,000' : '$430,000', surcharge: '$487.10 Part B + $89.70 Part D' },
    ]

    const currentTier = bracketIndex === 0 ? 'Standard (No IRMAA)' : 'Tier ' + bracketIndex

    // Avoidance strategies
    const savingsFromReduction = (totalMonthlySurcharge * 12).toFixed(0)
    const thresholdToAvoid = bracketIndex > 0 ? brackets[bracketIndex - 1] : 0

    return {
      modifiedAdjustedGrossIncome: modifiedAdjustedGrossIncome.toFixed(0),
      filingStatus,
      bracketIndex: bracketIndex.toFixed(0),
      currentTier,
      partBBasePremium: partBBasePremium.toFixed(2),
      partBSurcharge: partBSurcharge.toFixed(2),
      partBTotal: partBTotal.toFixed(2),
      partDBasePremium: partDBasePremium.toFixed(2),
      partDSurcharge: partDSurcharge.toFixed(2),
      partDTotal: partDTotal.toFixed(2),
      totalMonthlySurcharge: totalMonthlySurcharge.toFixed(2),
      monthlyTotal: monthlyTotal.toFixed(2),
      annualTotal: annualTotal.toFixed(0),
      savingsFromReduction,
      thresholdToAvoid: thresholdToAvoid.toFixed(0),
      tiers,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part B IRMAA Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Income-Related Monthly Adjustment Amount (IRMAA) surcharges.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Modified Adjusted Gross Income ($)</label>
          <input type="number" value={modifiedAdjustedGrossIncome} onChange={(e) => setModifiedAdjustedGrossIncome(Number(e.target.value))} className="w-full border rounded p-2" />
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
        <h2 className="text-lg font-semibold mb-3">IRMAA Tier Brackets (2024)</h2>
        <div className="grid grid-cols-1 gap-2">
          {result.tiers.map((tier, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 text-xs">
              <div className="font-medium">{tier.name}</div>
              <div className="text-zinc-600">Income above: {tier.threshold}</div>
              <div className="text-orange-700">+{tier.surcharge}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRMAA based on MAGI from 2 years prior (2022 income affects 2024 IRMAA).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Your IRMAA Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">MAGI:</span><span className="font-medium ml-2">$ {result.modifiedAdjustedGrossIncome}</span></div>
          <div><span className="text-zinc-600">Filing Status:</span><span className="font-medium ml-2">{result.filingStatus}</span></div>
          <div><span className="text-zinc-600">IRMAA Tier:</span><span className={`font-bold ml-2 ${result.bracketIndex === '0' ? 'text-green-700' : 'text-orange-700'}`}>{result.currentTier}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part B Premium Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Base Premium:</span><span className="font-medium ml-2">$ {result.partBBasePremium}/mo</span></div>
          <div><span className="text-zinc-600">IRMAA Surcharge:</span><span className={`font-bold ml-2 ${Number(result.partBSurcharge) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.partBSurcharge}/mo</span></div>
          <div><span className="text-zinc-600">Total Part B:</span><span className="font-bold text-purple-700 ml-2">$ {result.partBTotal}/mo</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part D Premium Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Base Premium:</span><span className="font-medium ml-2">$ {result.partDBasePremium}/mo avg</span></div>
          <div><span className="text-zinc-600">IRMAA Surcharge:</span><span className={`font-bold ml-2 ${Number(result.partDSurcharge) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.partDSurcharge}/mo</span></div>
          <div><span className="text-zinc-600">Total Part D:</span><span className="font-bold ml-2">$ {result.partDTotal}/mo</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Part D base premium varies by plan. IRMAA applies to all Part D plans.</div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Cost Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Monthly IRMAA Surcharge:</span><span className={`font-bold ml-2 ${Number(result.totalMonthlySurcharge) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.totalMonthlySurcharge}</span></div>
          <div><span className="text-zinc-600">Monthly Total:</span><span className="font-bold ml-2">$ {result.monthlyTotal}</span></div>
          <div><span className="text-zinc-600">Annual Total:</span><span className="font-bold text-red-700 ml-2">$ {result.annualTotal}</span></div>
          {Number(result.totalMonthlySurcharge) > 0 && (
            <div><span className="text-zinc-600">Annual IRMAA Cost:</span><span className="font-bold text-red-700 ml-2">$ {(Number(result.totalMonthlySurcharge) * 12).toFixed(0)}</span></div>
          )}
        </div>
      </div>

      {Number(result.totalMonthlySurcharge) > 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">IRMAA Reduction Strategies</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Reduce MAGI below:</span><span className="font-bold text-green-700 ml-2">$ {result.thresholdToAvoid}</span></div>
            <div><span className="text-zinc-600">Potential Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.savingsFromReduction}/yr</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Strategies: Roth conversions, tax-loss harvesting, deferred compensation, HSA contributions.</div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">IRMAA Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IRMAA applies to Part B and Part D premiums</li>
          <li>Based on MAGI from 2 tax years prior (lag effect)</li>
          <li>Can appeal if life-changing event occurred</li>
          <li>Income brackets: single starts at $103K, married at $206K</li>
          <li>Surcharges range from $69.90 to $487.10/month for Part B</li>
          <li>Strategic income planning can reduce IRMAA</li>
        </ul>
      </div>
    </div>
  )
}