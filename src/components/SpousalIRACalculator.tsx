'use client'

import { useState } from 'react'

export default function SpousalIRACalculator() {
  const [workingSpouseIncome, setWorkingSpouseIncome] = useState(100000)
  const [nonWorkingSpouseAge, setNonWorkingSpouseAge] = useState(45)
  const [workingSpouseAge, setWorkingSpouseAge] = useState(48)
  const [jointIncome, setJointIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'married_joint' | 'married_separate'>('married_joint')
  const [spousalIRAType, setSpousalIRAType] = useState<'traditional' | 'roth' | 'both'>('traditional')
  const [traditionalAmount, setTraditionalAmount] = useState(7000)
  const [rothAmount, setRothAmount] = useState(0)
  const [existingIRABalance, setExistingIRABalance] = useState(0)

  const calculate = () => {
    // Contribution limits 2024
    const standardLimit = 7000
    const catchUpLimit = 8000 // If age 50+

    const spousalCatchUpEligible = nonWorkingSpouseAge >= 50
    const workingCatchUpEligible = workingSpouseAge >= 50

    const spousalLimit = spousalCatchUpEligible ? catchUpLimit : standardLimit
    const workingLimit = workingCatchUpEligible ? catchUpLimit : standardLimit

    // Total IRA contribution limit for married couple
    const totalCoupleLimit = spousalLimit + workingLimit

    // Spousal IRA eligibility
    // 1. Must be married filing jointly
    // 2. Working spouse must have earned income >= total contributions
    // 3. Non-working spouse can contribute up to their limit

    const eligibleForSpousalIRA = filingStatus === 'married_joint' && workingSpouseIncome >= (traditionalAmount + rothAmount)

    // Roth IRA income limits for spousal contribution
    const rothIncomeLimitFull = 230000 // MAGI for full Roth contribution (married)
    const rothIncomeLimitPhaseoutEnd = 240000 // Phaseout end (married)

    // Traditional IRA deduction limits (if covered by employer plan)
    // If working spouse covered, phaseout for spouse: $230K-$240K
    // If neither covered, full deduction regardless of income

    const rothEligible = jointIncome < rothIncomeLimitPhaseoutEnd && filingStatus === 'married_joint'
    const rothFullEligible = jointIncome < rothIncomeLimitFull

    // Calculate Roth contribution allowed
    let allowedRothContribution = 0
    if (rothFullEligible) {
      allowedRothContribution = spousalLimit
    } else if (rothEligible) {
      // Phaseout calculation
      const phaseoutRange = rothIncomeLimitPhaseoutEnd - rothIncomeLimitFull
      const excessIncome = jointIncome - rothIncomeLimitFull
      const reductionFraction = excessIncome / phaseoutRange
      allowedRothContribution = Math.max(0, spousalLimit * (1 - reductionFraction))
    }

    const actualRothAmount = Math.min(rothAmount, allowedRothContribution)
    const actualTraditionalAmount = Math.min(traditionalAmount, spousalLimit - actualRothAmount)
    const totalSpousalContribution = actualRothAmount + actualTraditionalAmount

    // Tax benefit estimation
    const marginalRate = 24 // Assumed marginal rate
    const traditionalTaxSavings = actualTraditionalAmount * (marginalRate / 100)

    // Projected growth (30 years, 7% return)
    const yearsToRetirement = Math.max(0, 65 - nonWorkingSpouseAge)
    const growthRate = 0.07
    const projectedTraditionalValue = actualTraditionalAmount * Math.pow(1 + growthRate, yearsToRetirement)
    const projectedRothValue = actualRothAmount * Math.pow(1 + growthRate, yearsToRetirement)

    // Traditional withdrawal tax (assumed lower rate in retirement)
    const retirementTaxRate = 15
    const projectedTraditionalAfterTax = projectedTraditionalValue * (1 - retirementTaxRate / 100)
    const totalProjectedValue = projectedTraditionalAfterTax + projectedRothValue

    // Pro-rata warning for existing Traditional IRA
    const proRataWarning = existingIRABalance > 0 && spousalIRAType === 'roth' && actualTraditionalAmount > 0

    return {
      workingSpouseIncome: workingSpouseIncome.toFixed(0),
      nonWorkingSpouseAge: nonWorkingSpouseAge.toFixed(0),
      workingSpouseAge: workingSpouseAge.toFixed(0),
      jointIncome: jointIncome.toFixed(0),
      filingStatus,
      spousalCatchUpEligible,
      workingCatchUpEligible,
      spousalLimit: spousalLimit.toFixed(0),
      workingLimit: workingLimit.toFixed(0),
      totalCoupleLimit: totalCoupleLimit.toFixed(0),
      eligibleForSpousalIRA,
      rothEligible,
      rothFullEligible,
      allowedRothContribution: allowedRothContribution.toFixed(2),
      actualRothAmount: actualRothAmount.toFixed(2),
      actualTraditionalAmount: actualTraditionalAmount.toFixed(2),
      totalSpousalContribution: totalSpousalContribution.toFixed(2),
      traditionalTaxSavings: traditionalTaxSavings.toFixed(2),
      yearsToRetirement: yearsToRetirement.toFixed(0),
      projectedTraditionalValue: projectedTraditionalValue.toFixed(2),
      projectedRothValue: projectedRothValue.toFixed(2),
      projectedTraditionalAfterTax: projectedTraditionalAfterTax.toFixed(2),
      totalProjectedValue: totalProjectedValue.toFixed(2),
      proRataWarning,
      existingIRABalance: existingIRABalance.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Spousal IRA Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRA contributions for non-working spouse based on working spouse's income.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Working Spouse Income ($)</label>
          <input
            type="number"
            value={workingSpouseIncome}
            onChange={(e) => setWorkingSpouseIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Joint MAGI ($)</label>
          <input
            type="number"
            value={jointIncome}
            onChange={(e) => setJointIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Non-Working Spouse Age</label>
          <input
            type="number"
            value={nonWorkingSpouseAge}
            onChange={(e) => setNonWorkingSpouseAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Working Spouse Age</label>
          <input
            type="number"
            value={workingSpouseAge}
            onChange={(e) => setWorkingSpouseAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'married_joint' | 'married_separate')}
            className="w-full border rounded p-2"
          >
            <option value="married_joint">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spousal IRA Type</label>
          <select
            value={spousalIRAType}
            onChange={(e) => setSpousalIRAType(e.target.value as 'traditional' | 'roth' | 'both')}
            className="w-full border rounded p-2"
          >
            <option value="traditional">Traditional IRA</option>
            <option value="roth">Roth IRA</option>
            <option value="both">Both Traditional & Roth</option>
          </select>
        </div>
        {spousalIRAType !== 'roth' && (
          <div>
            <label className="block text-sm font-medium mb-1">Traditional IRA Amount ($)</label>
            <input
              type="number"
              value={traditionalAmount}
              onChange={(e) => setTraditionalAmount(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        )}
        {spousalIRAType !== 'traditional' && (
          <div>
            <label className="block text-sm font-medium mb-1">Roth IRA Amount ($)</label>
            <input
              type="number"
              value={rothAmount}
              onChange={(e) => setRothAmount(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Existing Traditional IRA Balance ($)</label>
          <input
            type="number"
            value={existingIRABalance}
            onChange={(e) => setExistingIRABalance(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Spousal IRA Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Spousal IRA Eligible:</span>
            <span className={`font-bold ml-2 ${result.eligibleForSpousalIRA ? 'text-green-600' : 'text-red-600'}`}>
              {result.eligibleForSpousalIRA ? 'Yes' : 'No'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Catch-Up Eligible (Spouse):</span>
            <span className={`font-medium ml-2 ${result.spousalCatchUpEligible ? 'text-green-600' : 'text-gray-500'}`}>
              {result.spousalCatchUpEligible ? 'Yes (50+)' : 'No'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Spousal Limit:</span>
            <span className="font-bold ml-2">$ {result.spousalLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Working Spouse Limit:</span>
            <span className="font-medium ml-2">$ {result.workingLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Couple Limit:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.totalCoupleLimit}</span>
          </div>
        </div>
      </div>

      {!result.eligibleForSpousalIRA && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Eligibility Issue</h2>
          <div className="text-sm text-red-700">
            {result.filingStatus === 'married_separate'
              ? 'Spousal IRA requires married filing jointly status.'
              : `Working spouse income ($${result.workingSpouseIncome}) must exceed total IRA contributions ($${result.totalSpousalContribution}).`}
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Contribution Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Traditional IRA:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.actualTraditionalAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Roth IRA:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.actualRothAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Spousal:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.totalSpousalContribution}</span>
          </div>
          <div>
            <span className="text-zinc-600">Roth Eligible:</span>
            <span className={`font-medium ml-2 ${result.rothEligible ? 'text-green-600' : 'text-red-600'}`}>
              {result.rothEligible ? (result.rothFullEligible ? 'Full' : 'Partial') : 'No'}
            </span>
          </div>
          {parseFloat(result.actualTraditionalAmount) > 0 && (
            <div>
              <span className="text-zinc-600">Tax Savings:</span>
              <span className="font-bold text-green-700 ml-2">$ {result.traditionalTaxSavings}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Projected Growth (to Retirement)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Years to 65:</span>
            <span className="font-medium ml-2">{result.yearsToRetirement}</span>
          </div>
          <div>
            <span className="text-zinc-600">Traditional Value:</span>
            <span className="font-medium ml-2">$ {result.projectedTraditionalValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Traditional After-Tax:</span>
            <span className="font-medium ml-2">$ {result.projectedTraditionalAfterTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Roth Value:</span>
            <span className="font-medium ml-2">$ {result.projectedRothValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total After-Tax:</span>
            <span className="font-bold text-purple-700 ml-2">$ {result.totalProjectedValue}</span>
          </div>
        </div>
      </div>

      {result.proRataWarning && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Pro-Rata Warning</h2>
          <div className="text-sm text-orange-700">
            Existing Traditional IRA balance ($ {result.existingIRABalance}) may trigger pro-rata rule if converting to Roth.
          </div>
        </div>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Spousal IRA Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Non-working spouse can contribute to IRA based on working spouse's earned income</li>
          <li>Must be married filing jointly to qualify</li>
          <li>Working spouse must have earned income ≥ total couple IRA contributions</li>
          <li>Each spouse has separate $7,000 limit (2024), $8,000 if 50+</li>
          <li>Both spouses can contribute to their own IRAs</li>
          <li>Spousal IRA owned by non-working spouse, not joint account</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Benefits of Spousal IRA</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Retirement savings for spouse with no earned income</li>
          <li>Doubles couple's total IRA contribution capacity</li>
          <li>Tax-deferred growth in Traditional IRA</li>
          <li>Tax-free growth in Roth IRA</li>
          <li>Catch-up contributions for spouses 50+</li>
          <li>Independent retirement savings for each spouse</li>
        </ul>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mt-4">
        <h3 className="font-medium mb-2 text-blue-700">Roth vs Traditional Choice</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Roth: Tax-free growth, income limits apply ($230K MAGI for full)</li>
          <li>Traditional: Tax deduction now, taxed at withdrawal</li>
          <li>Consider current vs future tax rates</li>
          <li>Roth has no RMDs during owner's lifetime</li>
          <li>Traditional may be better if expect lower retirement tax rate</li>
          <li>Can split between both types for flexibility</li>
        </ul>
      </div>
    </div>
  )
}