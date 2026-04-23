'use client'

import { useState } from 'react'

export default function SocialSecurityGPOOffsetCalculator() {
  const [governmentPension, setGovernmentPension] = useState(1200)
  const [spousalBenefit, setSpousalBenefit] = useState(800)
  const [survivorBenefit, setSurvivorBenefit] = useState(1000)
  const [pensionType, setPensionType] = useState<'monthly' | 'annual'>('monthly')
  const [maritalStatus, setMaritalStatus] = useState<'married' | 'widowed'>('married')

  const calculate = () => {
    // Government Pension Offset (GPO) calculation
    // GPO reduces Social Security spousal/survivor benefits by 2/3 of government pension

    const monthlyPension = pensionType === 'monthly' ? governmentPension : governmentPension / 12

    // GPO reduction formula: 2/3 of government pension
    const gpoReduction = monthlyPension * 2 / 3

    // Spousal benefit after GPO
    const spousalBenefitAfterGPO = Math.max(0, spousalBenefit - gpoReduction)
    const spousalGPOApplies = gpoReduction >= spousalBenefit

    // Survivor benefit after GPO
    const survivorBenefitAfterGPO = Math.max(0, survivorBenefit - gpoReduction)
    const survivorGPOApplies = gpoReduction >= survivorBenefit

    // Total offset (spousal or survivor based on marital status)
    const applicableBenefit = maritalStatus === 'married' ? spousalBenefit : survivorBenefit
    const benefitAfterGPO = maritalStatus === 'married' ? spousalBenefitAfterGPO : survivorBenefitAfterGPO
    const gpoFullyEliminates = gpoReduction >= applicableBenefit

    // Annual impact
    const annualPension = monthlyPension * 12
    const annualGPOReduction = gpoReduction * 12
    const annualBenefitLost = applicableBenefit * 12 - benefitAfterGPO * 12

    // Lifetime impact (20 years)
    const lifetimeBenefitLost = annualBenefitLost * 20

    // Exemption conditions
    // - Pension from non-covered employment (no SS taxes paid)
    // - Last 60 months of government service were covered by SS
    // - Certain federal employees (CSRS offset)

    // GPO vs WEP difference
    // WEP: affects your own SS benefit (worker)
    // GPO: affects spousal/survivor benefits (dependent)

    // Potential work-around
    // Work in covered employment to earn own benefit
    // GPO only affects spousal/survivor, not own benefit

    return {
      governmentPension: governmentPension.toFixed(0),
      spousalBenefit: spousalBenefit.toFixed(0),
      survivorBenefit: survivorBenefit.toFixed(0),
      pensionType,
      maritalStatus,
      monthlyPension: monthlyPension.toFixed(0),
      gpoReduction: gpoReduction.toFixed(0),
      spousalBenefitAfterGPO: spousalBenefitAfterGPO.toFixed(0),
      spousalGPOApplies,
      survivorBenefitAfterGPO: survivorBenefitAfterGPO.toFixed(0),
      survivorGPOApplies,
      applicableBenefit: applicableBenefit.toFixed(0),
      benefitAfterGPO: benefitAfterGPO.toFixed(0),
      gpoFullyEliminates,
      annualPension: annualPension.toFixed(0),
      annualGPOReduction: annualGPOReduction.toFixed(0),
      annualBenefitLost: annualBenefitLost.toFixed(0),
      lifetimeBenefitLost: lifetimeBenefitLost.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security GPO Offset Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Government Pension Offset reduction for spousal/survivor benefits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Government Pension Amount</label>
          <input type="number" value={governmentPension} onChange={(e) => setGovernmentPension(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pension Type</label>
          <select value={pensionType} onChange={(e) => setPensionType(e.target.value as 'monthly' | 'annual')} className="w-full border rounded p-2">
            <option value="monthly">Monthly Pension</option>
            <option value="annual">Annual Pension</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spousal Benefit (if married)</label>
          <input type="number" value={spousalBenefit} onChange={(e) => setSpousalBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Survivor Benefit (if widowed)</label>
          <input type="number" value={survivorBenefit} onChange={(e) => setSurvivorBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value as 'married' | 'widowed')} className="w-full border rounded p-2">
            <option value="married">Currently Married</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">GPO Reduction Formula</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Monthly Pension:</span><span className="font-medium ml-2">$ {result.monthlyPension}</span></div>
          <div><span className="text-zinc-600">GPO Formula:</span><span className="font-bold text-orange-700 ml-2">2/3 × Pension</span></div>
          <div><span className="text-zinc-600">GPO Reduction:</span><span className="font-bold text-orange-700 ml-2">$ {result.gpoReduction}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">GPO reduces Social Security spousal/survivor benefits by 2/3 of your government pension from non-covered employment.</div>
      </div>

      <div className={`card mb-6 ${result.gpoFullyEliminates ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.gpoFullyEliminates ? 'text-red-700' : 'text-green-700'}`}>Benefit After GPO</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original Benefit:</span><span className="font-medium ml-2">$ {result.applicableBenefit}</span></div>
          <div><span className="text-zinc-600">After GPO:</span><span className={`font-bold ml-2 ${result.gpoFullyEliminates ? 'text-red-700' : 'text-green-700'}`}>$ {result.benefitAfterGPO}</span></div>
          <div><span className="text-zinc-600">GPO Eliminates:</span><span className={`font-bold ml-2 ${result.gpoFullyEliminates ? 'text-red-700' : 'text-zinc-600'}`}>{result.gpoFullyEliminates ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.maritalStatus === 'married' ? 'Spousal benefit' : 'Survivor benefit'} after GPO reduction. If GPO exceeds benefit, benefit is eliminated entirely.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual & Lifetime Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Annual Pension:</span><span className="font-medium ml-2">$ {result.annualPension}</span></div>
          <div><span className="text-zinc-600">Annual GPO:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualGPOReduction}</span></div>
          <div><span className="text-zinc-600">Benefit Lost/yr:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualBenefitLost}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Lifetime Lost (20yr):</span><span className="font-bold text-purple-700 ml-2">$ {result.lifetimeBenefitLost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Lifetime impact assumes 20 years of Social Security benefit receipt.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Spousal vs Survivor Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Spousal After GPO:</span><span className={`font-bold ml-2 ${result.spousalGPOApplies ? 'text-red-700' : 'text-green-700'}`}>$ {result.spousalBenefitAfterGPO}</span></div>
          <div><span className="text-zinc-600">Survivor After GPO:</span><span className={`font-bold ml-2 ${result.survivorGPOApplies ? 'text-red-700' : 'text-green-700'}`}>$ {result.survivorBenefitAfterGPO}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">GPO affects both spousal and survivor benefits identically (2/3 of pension offset).</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">GPO Exemption Conditions</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div>• Last 60 months of government service covered by Social Security</div>
          <div>• Certain federal employees under CSRS Offset system</div>
          <div>• Pension from employment covered by Social Security (no GPO)</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">If your pension is from covered employment (SS taxes paid), GPO does not apply.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">GPO Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>GPO: affects spousal/survivor benefits (not your own)</li>
          <li>WEP: affects your own worker benefit</li>
          <li>Offset: 2/3 of non-covered government pension</li>
          <li>Can eliminate benefit entirely if pension is large</li>
          <li>Applies to federal, state, local government pensions</li>
          <li>Teachers, police, firefighters often affected</li>
          <li>Work in covered job to earn own SS benefit</li>
          <li>GPO does not reduce your own earned benefit</li>
          <li>Check SSA for exact GPO amount</li>
          <li>Plan retirement income considering GPO</li>
        </ul>
      </div>
    </div>
  )
}