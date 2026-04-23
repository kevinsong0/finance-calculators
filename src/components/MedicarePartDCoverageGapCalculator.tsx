'use client'

import { useState } from 'react'

export default function MedicarePartCCoverageGapCalculator() {
  const [currentYear, setCurrentYear] = useState(2024)
  const [totalDrugCosts, setTotalDrugCosts] = useState(8000)
  const [planDeductible, setPlanDeductible] = useState(505)
  const [initialCoverageLimit, setInitialCoverageLimit] = useState(5030)
  const [catastrophicThreshold, setCatastrophicThreshold] = useState(8350)
  const [copayPercentage, setCopayPercentage] = useState(25)

  const calculate = () => {
    // 2024 Medicare Part D Coverage Gap (Donut Hole) parameters
    // Standard defined parameters for 2024
    const standardDeductible = 545 // Actually 2024 value
    const standardInitialLimit = 5330 // Initial coverage limit (true out-of-pocket)
    const standardCatastrophic = 8400 // Catastrophic coverage threshold

    // Use provided values or defaults
    const deductible = planDeductible || standardDeductible
    const initialLimit = initialCoverageLimit || standardInitialLimit
    const catastrophic = catastrophicThreshold || standardCatastrophic

    // Coverage phases
    // Phase 1: Deductible (you pay 100% until deductible met)
    const phase1Cost = Math.min(totalDrugCosts, deductible)
    const phase1Remaining = totalDrugCosts - phase1Cost

    // Phase 2: Initial Coverage (25% coinsurance)
    // You pay 25% of drug costs until total drug costs reach initial limit
    const phase2TotalDrugs = initialLimit - deductible
    const phase2DrugCosts = Math.min(phase1Remaining, phase2TotalDrugs)
    const phase2YourCost = phase2DrugCosts * copayPercentage / 100
    const phase2Remaining = phase1Remaining - phase2DrugCosts

    // Phase 3: Coverage Gap (Donut Hole)
    // You pay 25% of brand-name, 25% of generic (2024 - gap mostly closed)
    const gapDrugCosts = Math.min(phase2Remaining, catastrophic - initialLimit)
    const gapYourCost = gapDrugCosts * copayPercentage / 100 // Simplified: 25% for both
    const gapRemaining = phase2Remaining - gapDrugCosts

    // Phase 4: Catastrophic Coverage
    // You pay small copay or 5% coinsurance
    const catastrophicCopayBrand = 4.50 // per drug per month
    const catastrophicCopayGeneric = 0.10 // per drug per month
    const catastrophicCoinsurance = 5 // 5% coinsurance

    const catastrophicYourCost = gapRemaining * catastrophicCoinsurance / 100

    // Total out-of-pocket costs
    const totalOutOfPocket = phase1Cost + phase2YourCost + gapYourCost + catastrophicYourCost

    // Coverage gap status
    const inGap = totalDrugCosts > initialLimit && totalDrugCosts < catastrophic
    const pastGap = totalDrugCosts >= catastrophic

    // Yearly savings estimates
    const savingsFromGapClosing = gapDrugCosts * (75 - copayPercentage) / 100 // If gap was fully open (75% you pay)

    // True Out-of-Pocket (TrOOP) tracking
    // Counts toward catastrophic threshold
    const trOOP = phase1Cost + phase2YourCost + gapYourCost + catastrophicYourCost

    // Manufacturer discount (in gap for brands)
    // 70% discount from manufacturer for brand drugs in gap (counts toward TrOOP)
    const manufacturerDiscount = gapDrugCosts * 0.70 // Simplified brand estimate

    return {
      currentYear: currentYear.toFixed(0),
      totalDrugCosts: totalDrugCosts.toFixed(0),
      planDeductible: deductible.toFixed(0),
      initialCoverageLimit: initialLimit.toFixed(0),
      catastrophicThreshold: catastrophic.toFixed(0),
      copayPercentage: copayPercentage.toFixed(0),
      standardDeductible: standardDeductible.toFixed(0),
      standardInitialLimit: standardInitialLimit.toFixed(0),
      standardCatastrophic: standardCatastrophic.toFixed(0),
      phase1Cost: phase1Cost.toFixed(0),
      phase2DrugCosts: phase2DrugCosts.toFixed(0),
      phase2YourCost: phase2YourCost.toFixed(0),
      gapDrugCosts: gapDrugCosts.toFixed(0),
      gapYourCost: gapYourCost.toFixed(0),
      catastrophicYourCost: catastrophicYourCost.toFixed(0),
      totalOutOfPocket: totalOutOfPocket.toFixed(0),
      inGap,
      pastGap,
      savingsFromGapClosing: savingsFromGapClosing.toFixed(0),
      trOOP: trOOP.toFixed(0),
      manufacturerDiscount: manufacturerDiscount.toFixed(0),
      catastrophicCoinsurance: catastrophicCoinsurance.toFixed(0),
      catastrophicCopayBrand: catastrophicCopayBrand.toFixed(2),
      catastrophicCopayGeneric: catastrophicCopayGeneric.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part D Coverage Gap Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate costs through deductible, initial coverage, and catastrophic phases.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Annual Drug Costs</label>
          <input type="number" value={totalDrugCosts} onChange={(e) => setTotalDrugCosts(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input type="number" value={currentYear} min="2024" max="2030" onChange={(e) => setCurrentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plan Deductible ($)</label>
          <input type="number" value={planDeductible} onChange={(e) => setPlanDeductible(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Initial Coverage Limit ($)</label>
          <input type="number" value={initialCoverageLimit} onChange={(e) => setInitialCoverageLimit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catastrophic Threshold ($)</label>
          <input type="number" value={catastrophicThreshold} onChange={(e) => setCatastrophicThreshold(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Copay/Coinsurance (%)</label>
          <input type="number" value={copayPercentage} min="0" max="100" onChange={(e) => setCopayPercentage(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.inGap ? 'bg-orange-50 border border-orange-200' : result.pastGap ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.inGap ? 'text-orange-700' : result.pastGap ? 'text-green-700' : 'text-blue-700'}`}>Coverage Phase Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Drug Costs:</span><span className="font-medium ml-2">$ {result.totalDrugCosts}</span></div>
          <div><span className="text-zinc-600">In Gap:</span><span className={`font-bold ml-2 ${result.inGap ? 'text-orange-700' : 'text-green-700'}`}>{result.inGap ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Past Gap:</span><span className={`font-bold ml-2 ${result.pastGap ? 'text-green-700' : 'text-zinc-600'}`}>{result.pastGap ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">2024: Gap mostly closed - you pay 25% for both brands and generics.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Phase 1: Deductible</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Deductible:</span><span className="font-medium ml-2">$ {result.planDeductible}</span></div>
          <div><span className="text-zinc-600">Your Cost:</span><span className="font-bold text-blue-700 ml-2">$ {result.phase1Cost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">You pay 100% of drug costs until deductible is met. Standard deductible: $545 (2024).</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Phase 2: Initial Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Drug Costs:</span><span className="font-medium ml-2">$ {result.phase2DrugCosts}</span></div>
          <div><span className="text-zinc-600">Copay:</span><span className="font-medium ml-2">{result.copayPercentage}%</span></div>
          <div><span className="text-zinc-600">Your Cost:</span><span className="font-bold text-green-700 ml-2">$ {result.phase2YourCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">After deductible, you pay 25% coinsurance. Initial coverage limit: $5,330 total drug costs (2024).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Phase 3: Coverage Gap (Donut Hole)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Drug Costs:</span><span className="font-medium ml-2">$ {result.gapDrugCosts}</span></div>
          <div><span className="text-zinc-600">Your Share:</span><span className="font-medium ml-2">25%</span></div>
          <div><span className="text-zinc-600">Your Cost:</span><span className="font-bold text-orange-700 ml-2">$ {result.gapYourCost}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Manufacturer Discount:</span><span className="font-medium ml-2">$ {result.manufacturerDiscount} (brands)</span></div>
          <div><span className="text-zinc-600">Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.savingsFromGapClosing}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">2024: Gap closed - you pay 25% (brands and generics). Manufacturer pays 70% discount for brands.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Phase 4: Catastrophic Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Threshold:</span><span className="font-medium ml-2">$ {result.catastrophicThreshold}</span></div>
          <div><span className="text-zinc-600">Your Share:</span><span className="font-medium ml-2">{result.catastrophicCoinsurance}%</span></div>
          <div><span className="text-zinc-600">Your Cost:</span><span className="font-bold text-purple-700 ml-2">$ {result.catastrophicYourCost}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Copay (Brand):</span><span className="font-medium ml-2">$ {result.catastrophicCopayBrand}/drug</span></div>
          <div><span className="text-zinc-600">Copay (Generic):</span><span className="font-medium ml-2">$ {result.catastrophicCopayGeneric}/drug</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">After $8,400 true out-of-pocket, you pay 5% or small copays. Catastrophic threshold for 2024.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Out-of-Pocket</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">TrOOP (True Out-of-Pocket):</span><span className="font-bold text-teal-700 ml-2">$ {result.trOOP}</span></div>
          <div><span className="text-zinc-600">Total Drug Costs:</span><span className="font-medium ml-2">$ {result.totalDrugCosts}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">TrOOP counts toward catastrophic threshold. Includes deductible, copays, gap costs.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Coverage Gap Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>2024: Coverage gap mostly closed (you pay 25%)</li>
          <li>Deductible: up to $545 (plan may have lower)</li>
          <li>Initial coverage: 25% coinsurance</li>
          <li>Gap: 25% for brands and generics</li>
          <li>Catastrophic: 5% after $8,400 TrOOP</li>
          <li>Manufacturer pays 70% discount for brands in gap</li>
          <li>TrOOP tracks your true costs</li>
          <li>Extra Help: lower or no copays</li>
          <li>Some plans have no deductible</li>
          <li>Check plan details for exact costs</li>
        </ul>
      </div>
    </div>
  )
}