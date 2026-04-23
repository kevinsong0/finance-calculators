'use client'

import { useState } from 'react'

export default function SocialSecurityDependentBenefitCalculator() {
  const [workerPIA, setWorkerPIA] = useState(2000)
  const [dependentAge, setDependentAge] = useState(62)
  const [dependentType, setDependentType] = useState<'spouse' | 'child' | 'parent'>('spouse')
  const [childIsDisabled, setChildIsDisabled] = useState(false)
  const [workerIsDeceased, setWorkerIsDeceased] = useState(false)
  const [workerClaimingAge, setWorkerClaimingAge] = useState(67)

  const calculate = () => {
    // Social Security dependent benefits calculation
    // Spouse: up to 50% of worker's PIA (if alive) or 100% (if deceased - survivor)
    // Child: up to 50% of worker's PIA (if worker alive/deceased)
    // Parent: up to 82.5% of worker's PIA (parent dependency benefit)

    // Family Maximum Benefit (FMB) limits total family benefits
    // FMB = 150% to 188% of worker's PIA (depending on PIA level)
    // 2024 bend points for FMB

    const firstBend = 1370
    const secondBend = 1994
    const thirdBend = 2787

    let fmb = 0
    if (workerPIA <= firstBend) {
      fmb = workerPIA * 1.50 // 150%
    } else if (workerPIA <= secondBend) {
      fmb = firstBend * 1.50 + (workerPIA - firstBend) * 2.72 // 272%
    } else if (workerPIA <= thirdBend) {
      fmb = firstBend * 1.50 + (secondBend - firstBend) * 2.72 + (workerPIA - secondBend) * 1.34 // 134%
    } else {
      fmb = firstBend * 1.50 + (secondBend - firstBend) * 2.72 + (thirdBend - secondBend) * 1.34 + (workerPIA - thirdBend) * 1.75 // 175%
    }

    // Maximum family benefit is capped
    const maxFMB = 4673 // 2024 maximum
    fmb = Math.min(fmb, maxFMB)

    // Dependent benefit calculation
    let dependentBenefitBase = 0
    let dependentBenefitMax = 0

    if (dependentType === 'spouse') {
      if (workerIsDeceased) {
        // Survivor benefit: 100% of worker's PIA (at full retirement age)
        dependentBenefitBase = workerPIA
        dependentBenefitMax = workerPIA
      } else {
        // Spousal benefit: 50% of worker's PIA (at full retirement age)
        dependentBenefitBase = workerPIA * 0.50
        dependentBenefitMax = workerPIA * 0.50
      }
    } else if (dependentType === 'child') {
      // Child benefit: 50% of worker's PIA
      dependentBenefitBase = workerPIA * 0.50
      dependentBenefitMax = workerPIA * 0.50
    } else if (dependentType === 'parent') {
      // Parent dependency benefit: 82.5% (rare, specific conditions)
      dependentBenefitBase = workerPIA * 0.825
      dependentBenefitMax = workerPIA * 0.825
    }

    // Early claiming reduction for spouse (not for children)
    let earlyReduction = 0
    if (dependentType === 'spouse' && dependentAge < 67) {
      const monthsEarly = (67 - dependentAge) * 12
      // Spousal: 25/36 of 1% per month early (max 35% reduction at 62)
      earlyReduction = dependentBenefitBase * Math.min(0.35, monthsEarly * 25 / 36 / 100)
    }

    const dependentBenefitActual = dependentBenefitBase - earlyReduction

    // FMB reduction if total exceeds limit
    // Simplified: assume worker + one dependent
    const workerBenefit = workerPIA // Worker at FRA
    const totalFamilyBenefits = workerBenefit + dependentBenefitActual

    const fmbExceeds = totalFamilyBenefits > fmb
    const fmbReduction = fmbExceeds ? (totalFamilyBenefits - fmb) : 0
    const reducedDependentBenefit = Math.max(0, dependentBenefitActual - fmbReduction)

    // Disabled adult child benefit (DAC)
    // Adult disabled child can receive benefits indefinitely
    // No reduction for age if disabled before 22

    const dacEligible = dependentType === 'child' && childIsDisabled

    // Eligibility conditions
    const eligibilityAge = dependentType === 'spouse' ? 62 : dependentType === 'child' ? (childIsDisabled ? 18 : 18) : 62
    const isEligibleAge = dependentAge >= eligibilityAge

    return {
      workerPIA: workerPIA.toFixed(0),
      dependentAge: dependentAge.toFixed(0),
      dependentType,
      childIsDisabled,
      workerIsDeceased,
      workerClaimingAge: workerClaimingAge.toFixed(0),
      fmb: fmb.toFixed(0),
      maxFMB: maxFMB.toFixed(0),
      dependentBenefitBase: dependentBenefitBase.toFixed(0),
      dependentBenefitMax: dependentBenefitMax.toFixed(0),
      earlyReduction: earlyReduction.toFixed(0),
      dependentBenefitActual: dependentBenefitActual.toFixed(0),
      workerBenefit: workerBenefit.toFixed(0),
      totalFamilyBenefits: totalFamilyBenefits.toFixed(0),
      fmbExceeds,
      fmbReduction: fmbReduction.toFixed(0),
      reducedDependentBenefit: reducedDependentBenefit.toFixed(0),
      dacEligible,
      eligibilityAge: eligibilityAge.toFixed(0),
      isEligibleAge,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Dependent Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate benefits for spouse, children, or dependent parents.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Worker's PIA (Monthly)</label>
          <input type="number" value={workerPIA} onChange={(e) => setWorkerPIA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dependent's Age</label>
          <input type="number" value={dependentAge} min="0" max="100" onChange={(e) => setDependentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dependent Type</label>
          <select value={dependentType} onChange={(e) => setDependentType(e.target.value as 'spouse' | 'child' | 'parent')} className="w-full border rounded p-2">
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Dependent Parent</option>
          </select>
        </div>
        {dependentType === 'child' && (
          <div>
            <label className="block text-sm font-medium mb-1">Child Disabled Before 22?</label>
            <select value={childIsDisabled ? 'yes' : 'no'} onChange={(e) => setChildIsDisabled(e.target.value === 'yes')} className="w-full border rounded p-2">
              <option value="no">No</option>
              <option value="yes">Yes - Disabled Adult Child</option>
            </select>
          </div>
        )}
        {dependentType === 'spouse' && (
          <div>
            <label className="block text-sm font-medium mb-1">Worker Status</label>
            <select value={workerIsDeceased ? 'deceased' : 'alive'} onChange={(e) => setWorkerIsDeceased(e.target.value === 'deceased')} className="w-full border rounded p-2">
              <option value="alive">Alive (Spousal Benefit)</option>
              <option value="deceased">Deceased (Survivor Benefit)</option>
            </select>
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.isEligibleAge ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isEligibleAge ? 'text-green-700' : 'text-orange-700'}`}>Age Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Dependent Age:</span><span className="font-medium ml-2">{result.dependentAge}</span></div>
          <div><span className="text-zinc-600">Min Eligibility Age:</span><span className="font-medium ml-2">{result.eligibilityAge}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Spouse: age 62+ (early) or any age if caring for child under 16. Child: under 18 or disabled adult child.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Dependent Benefit Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Worker PIA:</span><span className="font-medium ml-2">$ {result.workerPIA}</span></div>
          <div><span className="text-zinc-600">Base Benefit:</span><span className="font-bold text-blue-700 ml-2">$ {result.dependentBenefitBase}</span></div>
          <div><span className="text-zinc-600">Max Benefit:</span><span className="font-medium ml-2">$ {result.dependentBenefitMax}</span></div>
        </div>
        {Number(result.earlyReduction) > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Early Reduction:</span><span className="font-bold text-red-700 ml-2">$ {result.earlyReduction}</span></div>
            <div><span className="text-zinc-600">After Reduction:</span><span className="font-bold text-blue-700 ml-2">$ {result.dependentBenefitActual}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">{result.dependentType === 'spouse' ? (result.workerIsDeceased ? 'Survivor: 100% of PIA' : 'Spouse: 50% of PIA') : result.dependentType === 'child' ? 'Child: 50% of PIA' : 'Parent: 82.5% of PIA'} at full retirement age.</div>
      </div>

      <div className={`card mb-6 ${result.fmbExceeds ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.fmbExceeds ? 'text-orange-700' : 'text-green-700'}`}>Family Maximum Benefit (FMB)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">FMB Limit:</span><span className="font-medium ml-2">$ {result.fmb}</span></div>
          <div><span className="text-zinc-600">Total Family:</span><span className="font-medium ml-2">$ {result.totalFamilyBenefits}</span></div>
          <div><span className="text-zinc-600">Exceeds FMB:</span><span className={`font-bold ml-2 ${result.fmbExceeds ? 'text-orange-700' : 'text-green-700'}`}>{result.fmbExceeds ? 'Yes' : 'No'}</span></div>
        </div>
        {result.fmbExceeds && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">FMB Reduction:</span><span className="font-bold text-orange-700 ml-2">$ {result.fmbReduction}</span></div>
            <div><span className="text-zinc-600">Reduced Benefit:</span><span className="font-bold text-orange-700 ml-2">$ {result.reducedDependentBenefit}</span></div>
          </div>
        )}
        <div className="text-xs text-zinc-600 mt-2">FMB = 150-188% of PIA. If worker + dependents exceed FMB, benefits are reduced proportionally.</div>
      </div>

      {result.dacEligible && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Disabled Adult Child (DAC) Benefits</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">DAC Eligible:</span><span className="font-bold text-purple-700 ml-2">Yes</span></div>
            <div><span className="text-zinc-600">No Age Reduction:</span><span className="font-medium ml-2">Applies</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Disabled adult children can receive benefits indefinitely if disability began before age 22.</div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefit Type Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Spouse:</span><span className="font-medium ml-2">50% PIA</span></div>
          <div><span className="text-zinc-600">Survivor:</span><span className="font-medium ml-2">100% PIA</span></div>
          <div><span className="text-zinc-600">Child:</span><span className="font-medium ml-2">50% PIA</span></div>
          <div><span className="text-zinc-600">Parent:</span><span className="font-medium ml-2">82.5% PIA</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Percentages are at full retirement age. Early claiming reduces spousal/survivor benefits.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Dependent Benefit Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Spouse: 50% of worker's PIA (at FRA)</li>
          <li>Survivor: 100% of worker's PIA (at FRA)</li>
          <li>Child: 50% until 18 (or 19 if student)</li>
          <li>Disabled child: benefits continue after 18</li>
          <li>Early spouse claim: up to 35% reduction</li>
          <li>FMB limits total family benefits</li>
          <li>Worker must be receiving benefits</li>
          <li>Divorced spouse: if married 10+ years</li>
          <li>Dependent parent: if no other support</li>
          <li>Check SSA for exact eligibility</li>
        </ul>
      </div>
    </div>
  )
}