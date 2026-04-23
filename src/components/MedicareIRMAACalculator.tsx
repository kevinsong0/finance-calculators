'use client'

import { useState } from 'react'

export default function MedicareIRMAACalculator() {
  const [magi2024, setMagi2024] = useState(100000)
  const [magi2023, setMagi2023] = useState(95000)
  const [magi2022, setMagi2022] = useState(90000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [currentAge, setCurrentAge] = useState(65)

  const calculate = () => {
    // IRMAA is based on MAGI from 2 years prior
    // 2024 IRMAA uses 2022 MAGI
    const relevantMAGI = magi2022

    // 2024 IRMAA thresholds
    const thresholdsSingle = [103000, 129000, 161000, 193000, 500000]
    const thresholdsMarried = [206000, 258000, 322000, 386000, 750000]

    // 2024 Part B premiums and IRMAA surcharges
    const standardPartB = 174.70
    const irmaaSurchargesPartB = [0, 74.00, 209.40, 344.70, 479.40, 479.40] // last is highest bracket

    // 2024 Part D premiums and IRMAA surcharges (average)
    const standardPartD = 0 // varies by plan, show surcharge only
    const irmaaSurchargesPartD = [0, 12.90, 32.70, 52.50, 72.30, 72.30]

    const thresholds = filingStatus === 'single' ? thresholdsSingle : thresholdsMarried

    // Determine IRMAA bracket
    let bracket = 0
    for (let i = 0; i < thresholds.length; i++) {
      if (relevantMAGI <= thresholds[i]) {
        bracket = i
        break
      }
      bracket = thresholds.length // highest bracket
    }

    const partBSurcharge = irmaaSurchargesPartB[bracket]
    const partDSurcharge = irmaaSurchargesPartD[bracket]
    const totalPartB = standardPartB + partBSurcharge
    const totalPartD = partDSurcharge // user pays their plan premium + this surcharge

    // Annual costs
    const annualPartB = totalPartB * 12
    const annualPartDSurcharge = totalPartD * 12
    const annualTotal = annualPartB + annualPartDSurcharge

    // Savings if income reduced to avoid IRMAA
    const savingsIfNoIRMAA = (partBSurcharge + partDSurcharge) * 12

    // Next year projection (2025 IRMAA uses 2023 MAGI)
    const thresholds2025Single = [106000, 133000, 167000, 200000, 500000]
    const thresholds2025Married = [212000, 266000, 334000, 400000, 750000]
    const thresholds2025 = filingStatus === 'single' ? thresholds2025Single : thresholds2025Married

    let bracket2025 = 0
    for (let i = 0; i < thresholds2025.length; i++) {
      if (magi2023 <= thresholds2025[i]) {
        bracket2025 = i
        break
      }
      bracket2025 = thresholds2025.length
    }

    const irmaaSurchargesPartB2025 = [0, 76.40, 216.60, 356.90, 497.20, 497.20]
    const irmaaSurchargesPartD2025 = [0, 13.50, 34.20, 54.90, 75.60, 75.60]

    const partBSurcharge2025 = irmaaSurchargesPartB2025[bracket2025]
    const partDSurcharge2025 = irmaaSurchargesPartD2025[bracket2025]

    // Income reduction needed to avoid IRMAA
    const currentThreshold = thresholds[bracket > 0 ? bracket - 1 : 0]
    const incomeReductionNeeded = bracket > 0 ? relevantMAGI - currentThreshold : 0

    // Appeal eligibility
    const canAppeal = false // only for life-changing events (marriage, divorce, death, work stoppage)

    return {
      filingStatus,
      currentAge: currentAge.toFixed(0),
      magi2022: magi2022.toFixed(0),
      magi2023: magi2023.toFixed(0),
      magi2024: magi2024.toFixed(0),
      relevantMAGI: relevantMAGI.toFixed(0),
      bracket: bracket.toFixed(0),
      standardPartB: standardPartB.toFixed(2),
      partBSurcharge: partBSurcharge.toFixed(2),
      totalPartB: totalPartB.toFixed(2),
      partDSurcharge: partDSurcharge.toFixed(2),
      annualPartB: annualPartB.toFixed(0),
      annualPartDSurcharge: annualPartDSurcharge.toFixed(0),
      annualTotal: annualTotal.toFixed(0),
      savingsIfNoIRMAA: savingsIfNoIRMAA.toFixed(0),
      partBSurcharge2025: partBSurcharge2025.toFixed(2),
      partDSurcharge2025: partDSurcharge2025.toFixed(2),
      bracket2025: bracket2025.toFixed(0),
      incomeReductionNeeded: incomeReductionNeeded.toFixed(0),
      threshold1: thresholds[0].toFixed(0),
      threshold2: thresholds[1]?.toFixed(0) || 'N/A',
      threshold3: thresholds[2]?.toFixed(0) || 'N/A',
      threshold4: thresholds[3]?.toFixed(0) || 'N/A',
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare IRMAA Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Medicare Part B/D premium surcharges based on income.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">MAGI 2022 ($) (Affects 2024 IRMAA)</label>
          <input
            type="number"
            value={magi2022}
            onChange={(e) => setMagi2022(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">MAGI 2023 ($) (Affects 2025 IRMAA)</label>
          <input
            type="number"
            value={magi2023}
            onChange={(e) => setMagi2023(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Projected MAGI 2024 ($) (Affects 2026 IRMAA)</label>
          <input
            type="number"
            value={magi2024}
            onChange={(e) => setMagi2024(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 IRMAA (Based on 2022 MAGI)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Relevant MAGI:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.magi2022}</span>
          </div>
          <div>
            <span className="text-zinc-600">IRMAA Bracket:</span>
            <span className={`font-bold ml-2 ${parseInt(result.bracket) === 0 ? 'text-green-600' : 'text-orange-600'}`}>
              {parseInt(result.bracket) === 0 ? 'Standard (No IRMAA)' : `Bracket ${result.bracket}`}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part B Premium (2024)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Standard Premium:</span>
            <span className="font-medium ml-2">$ {result.standardPartB}/mo</span>
          </div>
          <div>
            <span className="text-zinc-600">IRMAA Surcharge:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.partBSurcharge) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $ {result.partBSurcharge}/mo
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Total Part B:</span>
            <span className="font-bold text-purple-700 ml-2">$ {result.totalPartB}/mo</span>
          </div>
          <div>
            <span className="text-zinc-600">Annual Part B:</span>
            <span className="font-bold ml-2">$ {result.annualPartB}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part D IRMAA Surcharge (2024)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Part D Surcharge:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.partDSurcharge) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $ {result.partDSurcharge}/mo
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Annual Part D Surcharge:</span>
            <span className="font-bold ml-2">$ {result.annualPartDSurcharge}</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          Part D surcharge added to your plan's premium. Standard Part D premium varies by plan.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Annual Medicare Cost</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Part B + D IRMAA:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.annualTotal) > parseFloat(result.standardPartB) * 12 ? 'text-red-600' : 'text-green-600'}`}>
              $ {result.annualTotal}/year
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Potential Savings (No IRMAA):</span>
            <span className="font-bold text-green-700 ml-2">$ {result.savingsIfNoIRMAA}/year</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2025 IRMAA Projection (Based on 2023 MAGI)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">2023 MAGI:</span>
            <span className="font-medium ml-2">$ {result.magi2023}</span>
          </div>
          <div>
            <span className="text-zinc-600">Part B Surcharge:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.partBSurcharge2025) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $ {result.partBSurcharge2025}/mo
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Part D Surcharge:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.partDSurcharge2025) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $ {result.partDSurcharge2025}/mo
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRMAA Thresholds (2024)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-zinc-600">Bracket 1:</span>
            <span className="font-medium ml-2">{filingStatus === 'single' ? 'under $103K' : 'under $206K'}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bracket 2:</span>
            <span className="font-medium ml-2">{filingStatus === 'single' ? '$103K-$129K' : '$206K-$258K'}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bracket 3:</span>
            <span className="font-medium ml-2">{filingStatus === 'single' ? '$129K-$161K' : '$258K-$322K'}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bracket 4:</span>
            <span className="font-medium ml-2">{filingStatus === 'single' ? '$161K-$193K' : '$322K-$386K'}</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          Higher brackets: Bracket 5 ({filingStatus === 'single' ? '$193K-$500K' : '$386K-$750K'}), Bracket 6 (over {filingStatus === 'single' ? '$500K' : '$750K'}).
        </div>
      </div>

      {parseInt(result.bracket) > 0 && (
        <div className="card bg-indigo-50 border border-indigo-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Income Reduction Strategy</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Reduce MAGI to Avoid IRMAA:</span>
              <span className="font-bold text-indigo-700 ml-2">$ {result.incomeReductionNeeded}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            Reduce income through: Roth withdrawals (not counted), tax-loss harvesting, QCD, timing capital gains.
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">IRMAA Reduction Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Use Roth IRA withdrawals (not counted in MAGI)</li>
          <li>Tax-loss harvesting to offset gains</li>
          <li>Qualified Charitable Distribution (QCD) from IRA</li>
          <li>Delay capital gains realization</li>
          <li>Convert Traditional to Roth before Medicare age</li>
          <li>Plan 2 years ahead: IRMAA based on prior-year income</li>
          <li>Appeal for life-changing events (work stoppage, marriage, death)</li>
        </ul>
      </div>
    </div>
  )
}