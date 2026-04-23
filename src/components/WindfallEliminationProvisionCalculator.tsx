'use client'

import { useState } from 'react'

export default function WindfallEliminationProvisionCalculator() {
  const [yearsOfSubstantialEarnings, setYearsOfSubstantialEarnings] = useState(20)
  const [pensionAmount, setPensionAmount] = useState(2000)
  const [socialSecurityBenefit, setSocialSecurityBenefit] = useState(1500)
  const [firstEligibleYear, setFirstEligibleYear] = useState(1985)

  const calculate = () => {
    // WEP reduction factors based on years of substantial earnings
    // 2024 maximum WEP reduction is $586/month (half of first bend point)
    const maxWEPReduction = 586

    // Reduction factors by years of substantial earnings
    let reductionFactor = 0
    if (yearsOfSubstantialEarnings >= 30) {
      reductionFactor = 0 // No WEP if 30+ years
    } else if (yearsOfSubstantialEarnings >= 21) {
      reductionFactor = (30 - yearsOfSubstantialEarnings) * 0.05 // 5% per year below 30
    } else {
      reductionFactor = 0.45 // Maximum 45% reduction for <21 years
    }

    // Calculate WEP reduction amount
    const wepReduction = Math.min(maxWEPReduction, socialSecurityBenefit * reductionFactor)

    // Adjusted Social Security benefit
    const adjustedBenefit = Math.max(0, socialSecurityBenefit - wepReduction)

    // Total monthly benefit including pension
    const totalBenefit = adjustedBenefit + pensionAmount

    // Annual amounts
    const annualSSBeforeWEP = socialSecurityBenefit * 12
    const annualSSAfterWEP = adjustedBenefit * 12
    const annualPension = pensionAmount * 12
    const annualTotal = totalBenefit * 12
    const annualWEPImpact = wepReduction * 12

    // Substantial earnings thresholds (simplified)
    const substantialThreshold2024 = 31060
    const substantialThresholds = [
      { year: 2024, threshold: 31060 },
      { year: 2023, threshold: 29700 },
      { year: 2022, threshold: 27300 },
      { year: 2021, threshold: 26250 },
      { year: 2020, threshold: 25625 },
    ]

    // Years needed to eliminate WEP
    const yearsNeededToEliminate = Math.max(0, 30 - yearsOfSubstantialEarnings)

    // Potential benefit if WEP eliminated
    const benefitIfEliminated = socialSecurityBenefit + pensionAmount
    const gainIfEliminated = socialSecurityBenefit - adjustedBenefit

    return {
      yearsOfSubstantialEarnings: yearsOfSubstantialEarnings.toFixed(0),
      pensionAmount: pensionAmount.toFixed(0),
      socialSecurityBenefit: socialSecurityBenefit.toFixed(0),
      reductionFactor: (reductionFactor * 100).toFixed(0),
      maxWEPReduction: maxWEPReduction.toFixed(0),
      wepReduction: wepReduction.toFixed(0),
      adjustedBenefit: adjustedBenefit.toFixed(0),
      totalBenefit: totalBenefit.toFixed(0),
      annualSSBeforeWEP: annualSSBeforeWEP.toFixed(0),
      annualSSAfterWEP: annualSSAfterWEP.toFixed(0),
      annualPension: annualPension.toFixed(0),
      annualTotal: annualTotal.toFixed(0),
      annualWEPImpact: annualWEPImpact.toFixed(0),
      yearsNeededToEliminate: yearsNeededToEliminate.toFixed(0),
      benefitIfEliminated: benefitIfEliminated.toFixed(0),
      gainIfEliminated: gainIfEliminated.toFixed(0),
      substantialThreshold2024: substantialThreshold2024.toFixed(0),
      firstEligibleYear: firstEligibleYear.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Windfall Elimination Provision (WEP) Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate how WEP reduces your Social Security benefit if you have a non-covered pension.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Years of Substantial Earnings</label>
          <input type="number" value={yearsOfSubstantialEarnings} min="0" max="35" onChange={(e) => setYearsOfSubstantialEarnings(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Non-Covered Pension ($/month)</label>
          <input type="number" value={pensionAmount} onChange={(e) => setPensionAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Social Security Benefit Before WEP ($/month)</label>
          <input type="number" value={socialSecurityBenefit} onChange={(e) => setSocialSecurityBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">First Year Eligible for SS</label>
          <input type="number" value={firstEligibleYear} min="1950" max="2020" onChange={(e) => setFirstEligibleYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">WEP Reduction Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Substantial Years:</span><span className="font-medium ml-2">{result.yearsOfSubstantialEarnings}</span></div>
          <div><span className="text-zinc-600">Reduction Factor:</span><span className={`font-bold ml-2 ${Number(result.reductionFactor) === 0 ? 'text-green-700' : 'text-orange-700'}`}>{result.reductionFactor}%</span></div>
          <div><span className="text-zinc-600">Max WEP (2024):</span><span className="font-medium ml-2">$ {result.maxWEPReduction}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">30+ years of substantial earnings = no WEP. Reduction is 5% per year below 30, max 45%.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Benefit Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">SS Before WEP:</span><span className="font-medium ml-2">$ {result.socialSecurityBenefit}</span></div>
          <div><span className="text-zinc-600">WEP Reduction:</span><span className={`font-bold ml-2 ${Number(result.wepReduction) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.wepReduction}</span></div>
          <div><span className="text-zinc-600">SS After WEP:</span><span className="font-bold text-orange-700 ml-2">$ {result.adjustedBenefit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Pension:</span><span className="font-medium ml-2">$ {result.pensionAmount}</span></div>
          <div><span className="text-zinc-600">Total Monthly:</span><span className="font-bold text-green-700 ml-2">$ {result.totalBenefit}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Benefit Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">SS Before WEP:</span><span className="font-medium ml-2">$ {result.annualSSBeforeWEP}</span></div>
          <div><span className="text-zinc-600">SS After WEP:</span><span className="font-bold text-purple-700 ml-2">$ {result.annualSSAfterWEP}</span></div>
          <div><span className="text-zinc-600">Pension:</span><span className="font-medium ml-2">$ {result.annualPension}</span></div>
          <div><span className="text-zinc-600">WEP Impact:</span><span className={`font-bold ml-2 ${Number(result.annualWEPImpact) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.annualWEPImpact}</span></div>
          <div><span className="text-zinc-600">Total Annual:</span><span className="font-bold text-green-700 ml-2">$ {result.annualTotal}</span></div>
        </div>
      </div>

      {Number(result.yearsNeededToEliminate) > 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Path to WEP Elimination</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Years Needed:</span><span className="font-bold text-teal-700 ml-2">{result.yearsNeededToEliminate} more years</span></div>
            <div><span className="text-zinc-600">Potential Gain:</span><span className="font-bold text-teal-700 ml-2">$ {result.gainIfEliminated}/mo</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">2024 substantial earnings threshold: $ {result.substantialThreshold2024}/year. Work more covered jobs to reduce/eliminate WEP.</div>
        </div>
      )}

      {Number(result.yearsOfSubstantialEarnings) >= 30 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">WEP Exemption</h2>
          <div className="text-sm font-medium">You have 30+ years of substantial covered earnings. WEP does not apply to your benefit.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">WEP Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>WEP affects workers with pensions from non-covered employment (government, some teachers)</li>
          <li>Reduction is capped at half of first bend point ($586 in 2024)</li>
          <li>30+ years of substantial covered earnings eliminates WEP entirely</li>
          <li>20-29 years: partial reduction (5% per year below 30)</li>
          <li>Substantial earnings threshold increases each year</li>
          <li>WEP does not affect survivor benefits</li>
        </ul>
      </div>
    </div>
  )
}