'use client'

import { useState } from 'react'

export default function MedicarePartDHospiceBenefitCalculator() {
  const [ hospiceEligible, setHospiceEligible] = useState(true)
  const [drugNeeds, setDrugNeeds] = useState('palliative')
  const [monthlyDrugCost, setMonthlyDrugCost] = useState(200)
  const [hasPartD, setHasPartD] = useState(true)
  const [ hospiceDurationMonths, setHospiceDurationMonths] = useState(6)

  const calculate = () => {
    // Medicare hospice benefit and Part D coverage
    // Hospice benefit covers palliative drugs related to terminal diagnosis
    // Part D covers unrelated drugs during hospice

    // Hospice drug coverage
    // - Covered: drugs for symptom management, pain relief
    // - Covered: drugs related to terminal prognosis
    // - Not covered: curative treatments, unrelated conditions

    // Part D during hospice
    // - Part D still covers unrelated drugs
    // - Can suspend Part D if all drugs are hospice-covered
    // - May want to keep Part D for unrelated medications

    // Hospice benefit details
    const hospiceDrugCoverageRate = 0 // Hospice covers palliative drugs at no cost
    const hospiceCoversPalliative = true
    const hospiceCoversRelated = true
    const hospiceExcludesCurative = true

    // Drug type categorization
    const palliativeDrugsCost = drugNeeds === 'palliative' ? monthlyDrugCost : drugNeeds === 'mixed' ? monthlyDrugCost * 0.50 : monthlyDrugCost * 0.20
    const unrelatedDrugsCost = monthlyDrugCost - palliativeDrugsCost

    // Hospice coverage (free for palliative/related)
    const hospiceCoveredCost = 0 // Hospice covers at no cost
    const hospiceUncoveredCost = unrelatedDrugsCost // Unrelated drugs need Part D

    // Part D costs for unrelated drugs
    const partDDeductible = 545 // 2024
    const partDCopayRate = 0.25 // Initial coverage phase
    const partDCoveredUnrelated = unrelatedDrugsCost * partDCopayRate

    // Annual projections
    const hospiceDurationYears = hospiceDurationMonths / 12
    const totalHospiceDrugCost = palliativeDrugsCost * hospiceDurationMonths
    const totalUnrelatedDrugCost = unrelatedDrugsCost * hospiceDurationMonths

    // Cost comparison
    // With Part D: pay Part D premium + copays for unrelated
    // Without Part D: pay full price for unrelated drugs

    const partDAnnualPremium = 50 * 12 // Simplified estimate
    const withPartDTotalCost = partDAnnualPremium * hospiceDurationYears + partDCoveredUnrelated * hospiceDurationMonths + partDDeductible * (hospiceDurationYears >= 1 ? 1 : hospiceDurationYears)
    const withoutPartDTotalCost = unrelatedDrugsCost * hospiceDurationMonths

    const partDValueIfUnrelated = withoutPartDTotalCost - withPartDTotalCost
    const keepPartDRecommended = unrelatedDrugsCost > 100 || !hospiceEligible

    // Hospice benefit coverage details
    const hospiceCoverage = {
      drugsForSymptomManagement: 'Covered',
      drugsForPainControl: 'Covered',
      drugsForTerminalPrognosis: 'Covered',
      curativeTreatments: 'Not covered',
      unrelatedConditions: 'Not covered',
      medicalEquipment: 'Covered',
      nursingCare: 'Covered',
      socialServices: 'Covered',
    }

    // Part D suspension option
    // Can suspend Part D if hospice covers all drugs
    // Must re-enroll if leaving hospice

    const canSuspendPartD = unrelatedDrugsCost === 0 && hospiceEligible
    const suspensionRisk = 'Must re-enroll if discharged from hospice'

    return {
      hospiceEligible,
      drugNeeds,
      monthlyDrugCost: monthlyDrugCost.toFixed(0),
      hasPartD,
      hospiceDurationMonths: hospiceDurationMonths.toFixed(0),
      palliativeDrugsCost: palliativeDrugsCost.toFixed(0),
      unrelatedDrugsCost: unrelatedDrugsCost.toFixed(0),
      hospiceCoveredCost: hospiceCoveredCost.toFixed(0),
      hospiceUncoveredCost: hospiceUncoveredCost.toFixed(0),
      partDCoveredUnrelated: partDCoveredUnrelated.toFixed(0),
      partDAnnualPremium: partDAnnualPremium.toFixed(0),
      withPartDTotalCost: withPartDTotalCost.toFixed(0),
      withoutPartDTotalCost: withoutPartDTotalCost.toFixed(0),
      partDValueIfUnrelated: partDValueIfUnrelated.toFixed(0),
      keepPartDRecommended,
      canSuspendPartD,
      suspensionRisk,
      hospiceCoverage,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medicare Part D Hospice Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Understand drug coverage during hospice care.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1"> Hospice Eligible?</label>
          <select value={ hospiceEligible ? 'yes' : 'no'} onChange={(e) => setHospiceEligible(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - terminal prognosis (6 months or less)</option>
            <option value="no">No - not in hospice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Drug Needs Type</label>
          <select value={drugNeeds} onChange={(e) => setDrugNeeds(e.target.value)} className="w-full border rounded p-2">
            <option value="palliative">Palliative only - symptom management</option>
            <option value="mixed">Mixed - palliative + unrelated</option>
            <option value="mostly_unrelated">Mostly unrelated conditions</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Drug Cost</label>
          <input type="number" value={monthlyDrugCost} onChange={(e) => setMonthlyDrugCost(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has Part D Plan?</label>
          <select value={hasPartD ? 'yes' : 'no'} onChange={(e) => setHasPartD(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1"> Hospice Duration (months)</label>
          <input type="number" value={ hospiceDurationMonths} min="1" max="24" onChange={(e) => setHospiceDurationMonths(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.hospiceEligible ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.hospiceEligible ? 'text-green-700' : 'text-gray-700'}`}>Hospice Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Eligible:</span><span className={`font-bold ml-2 ${result.hospiceEligible ? 'text-green-700' : 'text-gray-600'}`}>{result.hospiceEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Requirement:</span><span className="font-medium ml-2">6 months prognosis</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Hospice benefit covers palliative drugs at no cost if hospice-eligible.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Drug Cost Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Monthly:</span><span className="font-medium ml-2">$ {result.monthlyDrugCost}</span></div>
          <div><span className="text-zinc-600">Palliative:</span><span className="font-bold text-purple-700 ml-2">$ {result.palliativeDrugsCost}</span></div>
          <div><span className="text-zinc-600">Unrelated:</span><span className="font-bold text-orange-700 ml-2">$ {result.unrelatedDrugsCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Palliative drugs covered by hospice. Unrelated drugs may need Part D.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Hospice Drug Coverage</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Covered Cost:</span><span className="font-bold text-green-700 ml-2">$ {result.hospiceCoveredCost}</span></div>
          <div><span className="text-zinc-600">Uncovered:</span><span className="font-medium ml-2">$ {result.hospiceUncoveredCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Hospice covers palliative drugs at $0. Unrelated drugs need separate coverage.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Part D During Hospice</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Part D Covers:</span><span className="font-medium ml-2">Unrelated drugs</span></div>
          <div><span className="text-zinc-600">Your Cost:</span><span className="font-bold text-blue-700 ml-2">$ {result.partDCoveredUnrelated}</span></div>
          <div><span className="text-zinc-600">Premium:</span><span className="font-medium ml-2">$ {result.partDAnnualPremium}/yr</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Part D covers drugs unrelated to terminal prognosis. May want to keep Part D for other medications.</div>
      </div>

      <div className={`card mb-6 ${result.keepPartDRecommended ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.keepPartDRecommended ? 'text-orange-700' : 'text-green-700'}`}>Part D Recommendation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Keep Part D:</span><span className={`font-bold ml-2 ${result.keepPartDRecommended ? 'text-orange-700' : 'text-green-700'}`}>{result.keepPartDRecommended ? 'Recommended' : 'Optional'}</span></div>
          <div><span className="text-zinc-600">Can Suspend:</span><span className={`font-bold ml-2 ${result.canSuspendPartD ? 'text-green-700' : 'text-orange-700'}`}>{result.canSuspendPartD ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.keepPartDRecommended ? 'Keep Part D for unrelated medications.' : 'If all drugs hospice-covered, may suspend Part D.'} Risk: {result.suspensionRisk}.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Hospice Coverage Details</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div>✓ Drugs for symptom management</div>
          <div>✓ Pain control medications</div>
          <div>✓ Drugs for terminal prognosis</div>
          <div>✓ Medical equipment and supplies</div>
          <div>✓ Nursing care</div>
          <div>✓ Social services</div>
          <div className="text-red-600">✗ Curative treatments</div>
          <div className="text-red-600">✗ Unrelated condition drugs</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Hospice focuses on comfort, not cure. Curative treatments not covered.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Hospice Drug Coverage Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Hospice covers palliative drugs at $0</li>
          <li>Part D covers unrelated drugs</li>
          <li>Can suspend Part D if hospice covers all</li>
          <li>Must re-enroll if discharged from hospice</li>
          <li>Curative treatments not covered</li>
          <li>Hospice eligibility: 6 months prognosis</li>
          <li>Can extend hospice if still eligible</li>
          <li>Hospice includes equipment, nursing</li>
          <li>Coordinate with hospice team</li>
          <li>Part D premium may continue</li>
        </ul>
      </div>
    </div>
  )
}