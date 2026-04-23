'use client'

import { useState } from 'react'

export default function SocialSecurityWEPReductionTableCalculator() {
  const [yearsOfSubstantialEarnings, setYearsOfSubstantialEarnings] = useState(20)
  const [averageIndexedMonthlyEarnings, setAverageIndexedMonthlyEarnings] = useState(2000)
  const [nonCoveredPension, setNonCoveredPension] = useState(1500)
  const [pensionType, setPensionType] = useState<'monthly' | 'annual'>('monthly')

  const calculate = () => {
    // Windfall Elimination Provision (WEP) reduction table
    // 2024 bend points for PIA calculation
    const firstBendPoint = 1174
    const secondBendPoint = 7078

    // Calculate PIA without WEP
    let piaWithoutWEP = 0
    if (averageIndexedMonthlyEarnings <= firstBendPoint) {
      piaWithoutWEP = averageIndexedMonthlyEarnings * 0.90
    } else if (averageIndexedMonthlyEarnings <= secondBendPoint) {
      piaWithoutWEP = firstBendPoint * 0.90 + (averageIndexedMonthlyEarnings - firstBendPoint) * 0.32
    } else {
      piaWithoutWEP = firstBendPoint * 0.90 + (secondBendPoint - firstBendPoint) * 0.32 + (averageIndexedMonthlyEarnings - secondBendPoint) * 0.15
    }

    // WEP reduction table (based on years of substantial earnings)
    // Years of substantial earnings reduce WEP penalty
    const wepReductionTable: Record<number, number> = {
      20: 0.50, // 50% of full WEP
      21: 0.45,
      22: 0.40,
      23: 0.35,
      24: 0.30,
      25: 0.25,
      26: 0.20,
      27: 0.15,
      28: 0.10,
      29: 0.05,
      30: 0, // No WEP if 30+ years
    }

    // Substantial earnings years (2024 threshold)
    const substantialEarningsThreshold2024 = 31225 // Annual earnings threshold

    // Full WEP reduction (2024)
    const maxWEPReduction = 614 // Half of first bend point factor

    // Apply reduction based on years
    const reductionFactor = yearsOfSubstantialEarnings >= 30 ? 0 :
                           wepReductionTable[Math.min(yearsOfSubstantialEarnings, 29)] ||
                           wepReductionTable[20]

    // Calculate WEP reduction amount
    const wepReductionAmount = maxWEPReduction * reductionFactor

    // PIA with WEP
    // WEP reduces the 90% factor to 40% at first bend point (but not below 40%)
    // Simplified calculation
    const piaWithWEP = Math.max(0, piaWithoutWEP - wepReductionAmount)

    // WEP guarantee: benefit cannot be reduced by more than half of pension
    const monthlyPension = pensionType === 'monthly' ? nonCoveredPension : nonCoveredPension / 12
    const halfPension = monthlyPension / 2
    const guaranteeProtection = wepReductionAmount > halfPension

    // Actual WEP reduction (subject to guarantee)
    const actualWEPReduction = guaranteeProtection ? halfPension : wepReductionAmount

    // Final benefit after WEP
    const finalBenefit = piaWithoutWEP - actualWEPReduction

    // Years of substantial earnings needed to eliminate WEP
    const yearsNeededForZeroWEP = 30

    // Remaining years needed
    const remainingYears = Math.max(0, yearsNeededForZeroWEP - yearsOfSubstantialEarnings)

    // Monthly reduction amounts per year of substantial earnings
    const reductionPerYear = maxWEPReduction * 0.05 // Each year reduces WEP by 5%

    // 2024 substantial earnings thresholds by year
    const substantialThresholds = {
      1990: 9840,
      2000: 14600,
      2010: 19800,
      2020: 25625,
      2024: 31225,
    }

    return {
      yearsOfSubstantialEarnings: yearsOfSubstantialEarnings.toFixed(0),
      averageIndexedMonthlyEarnings: averageIndexedMonthlyEarnings.toFixed(0),
      nonCoveredPension: nonCoveredPension.toFixed(0),
      pensionType,
      monthlyPension: monthlyPension.toFixed(0),
      firstBendPoint: firstBendPoint.toFixed(0),
      secondBendPoint: secondBendPoint.toFixed(0),
      piaWithoutWEP: piaWithoutWEP.toFixed(0),
      maxWEPReduction: maxWEPReduction.toFixed(0),
      reductionFactor: (reductionFactor * 100).toFixed(0),
      wepReductionAmount: wepReductionAmount.toFixed(0),
      piaWithWEP: piaWithWEP.toFixed(0),
      halfPension: halfPension.toFixed(0),
      guaranteeProtection,
      actualWEPReduction: actualWEPReduction.toFixed(0),
      finalBenefit: finalBenefit.toFixed(0),
      yearsNeededForZeroWEP: yearsNeededForZeroWEP.toFixed(0),
      remainingYears: remainingYears.toFixed(0),
      reductionPerYear: reductionPerYear.toFixed(0),
      substantialEarningsThreshold2024: substantialEarningsThreshold2024.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security WEP Reduction Table Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate WEP reduction based on years of substantial earnings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Years of Substantial Earnings</label>
          <input type="number" value={yearsOfSubstantialEarnings} min="0" max="35" onChange={(e) => setYearsOfSubstantialEarnings(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Average Indexed Monthly Earnings</label>
          <input type="number" value={averageIndexedMonthlyEarnings} onChange={(e) => setAverageIndexedMonthlyEarnings(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Non-Covered Pension Amount</label>
          <input type="number" value={nonCoveredPension} onChange={(e) => setNonCoveredPension(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pension Type</label>
          <select value={pensionType} onChange={(e) => setPensionType(e.target.value as 'monthly' | 'annual')} className="w-full border rounded p-2">
            <option value="monthly">Monthly Pension</option>
            <option value="annual">Annual Pension</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">PIA Calculation (Without WEP)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">AIME:</span><span className="font-medium ml-2">$ {result.averageIndexedMonthlyEarnings}</span></div>
          <div><span className="text-zinc-600">First Bend:</span><span className="font-medium ml-2">$ {result.firstBendPoint}</span></div>
          <div><span className="text-zinc-600">PIA (No WEP):</span><span className="font-bold text-blue-700 ml-2">$ {result.piaWithoutWEP}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">PIA formula: 90% of first $1,174 + 32% up to $7,078 + 15% above.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">WEP Reduction Factor</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Substantial Years:</span><span className="font-medium ml-2">{result.yearsOfSubstantialEarnings}</span></div>
          <div><span className="text-zinc-600">Reduction Factor:</span><span className="font-bold text-orange-700 ml-2">{result.reductionFactor}%</span></div>
          <div><span className="text-zinc-600">Max WEP:</span><span className="font-medium ml-2">$ {result.maxWEPReduction}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Calculated Reduction:</span><span className="font-bold text-orange-700 ml-2">$ {result.wepReductionAmount}</span></div>
          <div><span className="text-zinc-600">Years to Zero WEP:</span><span className="font-medium ml-2">{result.remainingYears}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each year of substantial earnings reduces WEP. 30+ years = no WEP. 20 years = 50% of max WEP.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">WEP Guarantee Protection</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Monthly Pension:</span><span className="font-medium ml-2">$ {result.monthlyPension}</span></div>
          <div><span className="text-zinc-600">Half Pension:</span><span className="font-bold text-purple-700 ml-2">$ {result.halfPension}</span></div>
          <div><span className="text-zinc-600">Guarantee Applies:</span><span className={`font-bold ml-2 ${result.guaranteeProtection ? 'text-purple-700' : 'text-zinc-600'}`}>{result.guaranteeProtection ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">WEP cannot reduce SS benefit by more than half of monthly pension amount.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Final Social Security Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">PIA (No WEP):</span><span className="font-medium ml-2">$ {result.piaWithoutWEP}</span></div>
          <div><span className="text-zinc-600">Actual WEP:</span><span className="font-bold text-red-700 ml-2">$ {result.actualWEPReduction}</span></div>
          <div><span className="text-zinc-600">Final Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.finalBenefit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Actual WEP = calculated reduction or half pension (guarantee protection).</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Years of Substantial Earnings Table</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">20 yrs:</span><span className="font-medium ml-2">50% WEP</span></div>
          <div><span className="text-zinc-600">25 yrs:</span><span className="font-medium ml-2">25% WEP</span></div>
          <div><span className="text-zinc-600">29 yrs:</span><span className="font-medium ml-2">5% WEP</span></div>
          <div><span className="text-zinc-600">30+ yrs:</span><span className="font-bold text-teal-700 ml-2">0% WEP</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">2024 substantial earnings threshold: $31,225/year. Each year above threshold reduces WEP.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">WEP Reduction Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>WEP affects workers with non-covered pension (gov, teacher)</li>
          <li>Reduces 90% factor to 40% (or higher with substantial earnings)</li>
          <li>Max WEP reduction: $614/month (2024)</li>
          <li>30+ years substantial earnings = no WEP</li>
          <li>Guarantee: WEP can't exceed half of pension</li>
          <li>Substantial earnings: $31,225/year (2024)</li>
          <li>Each year of substantial earnings reduces WEP by 5%</li>
          <li>Plan: work more covered years to reduce WEP</li>
          <li>Check SSA statement for exact WEP amount</li>
          <li>WEP applies only if claiming own SS benefit</li>
        </ul>
      </div>
    </div>
  )
}