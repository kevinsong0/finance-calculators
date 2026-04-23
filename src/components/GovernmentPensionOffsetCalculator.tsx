'use client'

import { useState } from 'react'

export default function GovernmentPensionOffsetCalculator() {
  const [governmentPensionAmount, setGovernmentPensionAmount] = useState(2000)
  const [spousalBenefitEntitled, setSpousalBenefitEntitled] = useState(1200)
  const [survivorBenefitEntitled, setSurvivorBenefitEntitled] = useState(2500)
  const [hasNonCoveredPension, setHasNonCoveredPension] = useState(true)

  const calculate = () => {
    // GPO reduces spousal/survivor benefits by 2/3 of non-covered pension
    const gpoOffset = hasNonCoveredPension ? Math.min(governmentPensionAmount * 2 / 3, spousalBenefitEntitled) : 0

    // Adjusted spousal benefit
    const adjustedSpousalBenefit = Math.max(0, spousalBenefitEntitled - gpoOffset)

    // Survivor benefit GPO (same calculation)
    const gpoSurvivorOffset = hasNonCoveredPension ? Math.min(governmentPensionAmount * 2 / 3, survivorBenefitEntitled) : 0
    const adjustedSurvivorBenefit = Math.max(0, survivorBenefitEntitled - gpoSurvivorOffset)

    // Annual amounts
    const annualPension = governmentPensionAmount * 12
    const annualSpousalBeforeGPO = spousalBenefitEntitled * 12
    const annualSpousalAfterGPO = adjustedSpousalBenefit * 12
    const annualSurvivorBeforeGPO = survivorBenefitEntitled * 12
    const annualSurvivorAfterGPO = adjustedSurvivorBenefit * 12
    const annualGPOImpactSpousal = gpoOffset * 12
    const annualGPOImpactSurvivor = gpoSurvivorOffset * 12

    // Combined benefits
    const monthlyCombinedSpousal = adjustedSpousalBenefit + governmentPensionAmount
    const monthlyCombinedSurvivor = adjustedSurvivorBenefit + governmentPensionAmount
    const annualCombinedSpousal = monthlyCombinedSpousal * 12
    const annualCombinedSurvivor = monthlyCombinedSurvivor * 12

    // GPO eliminated scenario
    const spousalGainIfNoGPO = spousalBenefitEntitled - adjustedSpousalBenefit
    const survivorGainIfNoGPO = survivorBenefitEntitled - adjustedSurvivorBenefit

    return {
      governmentPensionAmount: governmentPensionAmount.toFixed(0),
      spousalBenefitEntitled: spousalBenefitEntitled.toFixed(0),
      survivorBenefitEntitled: survivorBenefitEntitled.toFixed(0),
      hasNonCoveredPension,
      gpoOffset: gpoOffset.toFixed(0),
      adjustedSpousalBenefit: adjustedSpousalBenefit.toFixed(0),
      adjustedSurvivorBenefit: adjustedSurvivorBenefit.toFixed(0),
      gpoSurvivorOffset: gpoSurvivorOffset.toFixed(0),
      annualPension: annualPension.toFixed(0),
      annualSpousalBeforeGPO: annualSpousalBeforeGPO.toFixed(0),
      annualSpousalAfterGPO: annualSpousalAfterGPO.toFixed(0),
      annualSurvivorBeforeGPO: annualSurvivorBeforeGPO.toFixed(0),
      annualSurvivorAfterGPO: annualSurvivorAfterGPO.toFixed(0),
      annualGPOImpactSpousal: annualGPOImpactSpousal.toFixed(0),
      annualGPOImpactSurvivor: annualGPOImpactSurvivor.toFixed(0),
      monthlyCombinedSpousal: monthlyCombinedSpousal.toFixed(0),
      monthlyCombinedSurvivor: monthlyCombinedSurvivor.toFixed(0),
      annualCombinedSpousal: annualCombinedSpousal.toFixed(0),
      annualCombinedSurvivor: annualCombinedSurvivor.toFixed(0),
      spousalGainIfNoGPO: spousalGainIfNoGPO.toFixed(0),
      survivorGainIfNoGPO: survivorGainIfNoGPO.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Government Pension Offset (GPO) Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate how GPO reduces your spousal/survivor Social Security benefits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Non-Covered Government Pension ($/month)</label>
          <input type="number" value={governmentPensionAmount} onChange={(e) => setGovernmentPensionAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spousal Benefit Entitled ($/month)</label>
          <input type="number" value={spousalBenefitEntitled} onChange={(e) => setSpousalBenefitEntitled(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Survivor Benefit Entitled ($/month)</label>
          <input type="number" value={survivorBenefitEntitled} onChange={(e) => setSurvivorBenefitEntitled(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has Non-Covered Pension?</label>
          <select value={hasNonCoveredPension ? 'yes' : 'no'} onChange={(e) => setHasNonCoveredPension(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes (GPO applies)</option>
            <option value="no">No (GPO does not apply)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">GPO Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Gov Pension:</span><span className="font-medium ml-2">$ {result.governmentPensionAmount}</span></div>
          <div><span className="text-zinc-600">2/3 of Pension:</span><span className="font-bold text-blue-700 ml-2">$ {(Number(result.governmentPensionAmount) * 2 / 3).toFixed(0)}</span></div>
          <div><span className="text-zinc-600">GPO Offset:</span><span className={`font-bold ml-2 ${Number(result.gpoOffset) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.gpoOffset}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">GPO reduces spousal/survivor benefits by 2/3 of your non-covered government pension.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Spousal Benefit Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Entitled Benefit:</span><span className="font-medium ml-2">$ {result.spousalBenefitEntitled}</span></div>
          <div><span className="text-zinc-600">GPO Offset:</span><span className={`font-bold ml-2 ${Number(result.gpoOffset) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.gpoOffset}</span></div>
          <div><span className="text-zinc-600">Actual Benefit:</span><span className={`font-bold ml-2 ${Number(result.adjustedSpousalBenefit) === 0 ? 'text-red-700' : 'text-orange-700'}`}>$ {result.adjustedSpousalBenefit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Plus Pension:</span><span className="font-medium ml-2">$ {result.governmentPensionAmount}</span></div>
          <div><span className="text-zinc-600">Total Monthly:</span><span className="font-bold text-green-700 ml-2">$ {result.monthlyCombinedSpousal}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Survivor Benefit Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Entitled Benefit:</span><span className="font-medium ml-2">$ {result.survivorBenefitEntitled}</span></div>
          <div><span className="text-zinc-600">GPO Offset:</span><span className={`font-bold ml-2 ${Number(result.gpoSurvivorOffset) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.gpoSurvivorOffset}</span></div>
          <div><span className="text-zinc-600">Actual Benefit:</span><span className={`font-bold ml-2 ${Number(result.adjustedSurvivorBenefit) === 0 ? 'text-red-700' : 'text-purple-700'}`}>$ {result.adjustedSurvivorBenefit}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Plus Pension:</span><span className="font-medium ml-2">$ {result.governmentPensionAmount}</span></div>
          <div><span className="text-zinc-600">Total Monthly:</span><span className="font-bold text-green-700 ml-2">$ {result.monthlyCombinedSurvivor}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Pension Annual:</span><span className="font-medium ml-2">$ {result.annualPension}</span></div>
          <div><span className="text-zinc-600">Spousal After GPO:</span><span className="font-bold ml-2">$ {result.annualSpousalAfterGPO}</span></div>
          <div><span className="text-zinc-600">Survivor After GPO:</span><span className="font-bold ml-2">$ {result.annualSurvivorAfterGPO}</span></div>
          <div><span className="text-zinc-600">Spousal GPO Loss:</span><span className={`font-bold ml-2 ${Number(result.annualGPOImpactSpousal) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.annualGPOImpactSpousal}</span></div>
          <div><span className="text-zinc-600">Survivor GPO Loss:</span><span className={`font-bold ml-2 ${Number(result.annualGPOImpactSurvivor) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.annualGPOImpactSurvivor}</span></div>
        </div>
      </div>

      {!hasNonCoveredPension && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-teal-700">GPO Does Not Apply</h2>
          <div className="text-sm font-medium">You do not have a non-covered government pension. GPO does not reduce your spousal/survivor benefits.</div>
        </div>
      )}

      {hasNonCoveredPension && Number(result.adjustedSpousalBenefit) === 0 && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Complete Spousal Benefit Offset</h2>
          <div className="text-sm font-medium">Your GPO offset equals or exceeds your spousal benefit. You receive $0 from spousal SS, only your pension.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">GPO Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>GPO reduces spousal/survivor SS by 2/3 of non-covered pension</li>
          <li>Affects government employees, teachers, some municipal workers</li>
          <li>Can completely eliminate spousal/survivor benefits</li>
          <li>Unlike WEP, GPO affects both spousal AND survivor benefits</li>
          <li>Last 60 months of covered work may help reduce GPO</li>
          <li>GPO and WEP can both apply to the same person</li>
        </ul>
      </div>
    </div>
  )
}