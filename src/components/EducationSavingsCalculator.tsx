'use client'

import { useState } from 'react'

export default function EducationSavingsCalculator() {
  const [currentAge, setCurrentAge] = useState('5')
  const [collegeAge, setCollegeAge] = useState('18')
  const [targetAmount, setTargetAmount] = useState('100000')
  const [currentSavings, setCurrentSavings] = useState('10000')
  const [monthlyContribution, setMonthlyContribution] = useState('500')
  const [expectedReturn, setExpectedReturn] = useState('7')
  const [planType, setPlanType] = useState('529')
  const [stateOfResidence, setStateOfResidence] = useState('CA')
  const [contributionType, setContributionType] = useState('monthly')

  // State 529 plan deduction limits
  const state529DeductionLimits: Record<string, { limit: number; unlimited: boolean }> = {
    CA: { limit: 0, unlimited: false },
    NY: { limit: 10000, unlimited: false },
    TX: { limit: 0, unlimited: false },
    FL: { limit: 0, unlimited: false },
    PA: { limit: 18000, unlimited: false },
    NJ: { limit: 0, unlimited: false },
    MA: { limit: 0, unlimited: false },
    NC: { limit: 0, unlimited: false },
    GA: { limit: 4000, unlimited: false },
    VA: { limit: 4000, unlimited: false },
    MI: { limit: 5000, unlimited: false },
    IN: { limit: 7500, unlimited: false },
    UT: { limit: 2400, unlimited: false },
    AZ: { limit: 2000, unlimited: false },
    CO: { limit: 7000, unlimited: false },
    IL: { limit: 10000, unlimited: false },
    OH: { limit: 4000, unlimited: false },
    WA: { limit: 0, unlimited: false },
    NV: { limit: 0, unlimited: false },
  }

  const calculate = () => {
    const age = parseFloat(currentAge) || 0
    const collegeStart = parseFloat(collegeAge) || 18
    const target = parseFloat(targetAmount) || 0
    const saved = parseFloat(currentSavings) || 0
    const monthly = parseFloat(monthlyContribution) || 0
    const rate = parseFloat(expectedReturn) || 0
    const is529 = planType === '529'
    const isESA = planType === 'esa'

    const yearsToCollege = Math.max(0, collegeStart - age)
    const monthsToCollege = yearsToCollege * 12

    // Calculate future value of current savings
    const futureValueCurrent = saved * Math.pow(1 + rate / 100, yearsToCollege)

    // Calculate future value of contributions
    const monthlyRate = rate / 100 / 12
    let futureValueContributions = 0
    let totalContributions = 0

    if (monthlyRate > 0 && monthsToCollege > 0) {
      futureValueContributions = monthly * ((Math.pow(1 + monthlyRate, monthsToCollege) - 1) / monthlyRate)
      totalContributions = monthly * monthsToCollege
    } else {
      totalContributions = monthly * monthsToCollege
    }

    const projectedTotal = futureValueCurrent + futureValueContributions
    const shortfall = Math.max(0, target - projectedTotal)
    const excess = Math.max(0, projectedTotal - target)

    // Required monthly contribution to meet goal
    const fvFactor = Math.pow(1 + monthlyRate, monthsToCollege)
    let requiredMonthly = 0
    if (fvFactor > 1 && yearsToCollege > 0) {
      const neededFromContributions = target - futureValueCurrent
      requiredMonthly = neededFromContributions / ((fvFactor - 1) / monthlyRate)
    } else if (yearsToCollege > 0) {
      requiredMonthly = (target - futureValueCurrent) / monthsToCollege
    }

    // State tax deduction benefit (529 plans)
    const stateData = state529DeductionLimits[stateOfResidence] || { limit: 0, unlimited: false }
    const deductibleAmount = Math.min(totalContributions, stateData.limit)
    const stateTaxRate = 0.05 // Approximate
    const stateTaxSavings = deductibleAmount * stateTaxRate

    // Plan contribution limits
    const planLimits = {
      '529': { annual: Infinity, lifetime: 500000, description: 'High limits, varies by state' },
      'esa': { annual: 2000, lifetime: 2000, description: 'Coverdell ESA $2,000 per child per year' },
      'ugma': { annual: Infinity, lifetime: Infinity, description: 'No limits, but kiddie tax applies' },
      'roth': { annual: 7000, lifetime: Infinity, description: 'Roth IRA $7,000 (2024), income limits apply' },
    }

    const selectedPlan = planLimits[planType as keyof typeof planLimits]

    // Tax-advantaged growth savings
    const taxableGrowthLoss = projectedTotal * 0.15 * (rate / 100) * yearsToCollege / 2
    const taxAdvantagedBenefit = is529 || isESA ? taxableGrowthLoss : 0

    // Total benefit analysis
    const totalBenefit = stateTaxSavings + taxAdvantagedBenefit

    // College cost projection (inflation)
    const collegeCostInflation = 0.05
    const inflatedCost = target * Math.pow(1 + collegeCostInflation, yearsToCollege)

    return {
      currentAge: age.toFixed(0),
      collegeAge: collegeStart.toFixed(0),
      yearsToCollege: yearsToCollege.toFixed(1),
      monthsToCollege: monthsToCollege.toFixed(0),
      targetAmount: target.toFixed(2),
      currentSavings: saved.toFixed(2),
      monthlyContribution: monthly.toFixed(2),
      contributionType: contributionType === 'monthly' ? 'Monthly' : 'Annual',
      expectedReturn: rate.toFixed(1),
      futureValueCurrent: futureValueCurrent.toFixed(2),
      futureValueContributions: futureValueContributions.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      projectedTotal: projectedTotal.toFixed(2),
      shortfall: shortfall.toFixed(2),
      excess: excess.toFixed(2),
      requiredMonthly: requiredMonthly.toFixed(2),
      onTrack: projectedTotal >= target,
      planType: planType === '529' ? '529 College Savings Plan' :
                planType === 'esa' ? 'Coverdell ESA' :
                planType === 'ugma' ? 'UGMA/UTMA' : 'Roth IRA (for child)',
      stateOfResidence,
      stateDeductionLimit: stateData.limit.toFixed(0),
      deductibleAmount: deductibleAmount.toFixed(2),
      stateTaxSavings: stateTaxSavings.toFixed(2),
      planAnnualLimit: selectedPlan.annual === Infinity ? 'No limit' : `$${selectedPlan.annual}`,
      planLifetimeLimit: selectedPlan.lifetime === Infinity ? 'No limit' : `$${selectedPlan.lifetime}`,
      planDescription: selectedPlan.description,
      taxAdvantagedBenefit: taxAdvantagedBenefit.toFixed(2),
      totalBenefit: totalBenefit.toFixed(2),
      inflatedCollegeCost: inflatedCost.toFixed(2),
      is529,
      isESA,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Education Savings Calculator</h1>
      <p className="text-zinc-600">Calculate college savings projections for 529 plans, Coverdell ESA, and other education savings options. Understand tax benefits, contribution limits, and required savings rates.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Child Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="input"
              min="0"
              max="18"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected College Start Age</label>
            <input
              type="number"
              value={collegeAge}
              onChange={(e) => setCollegeAge(e.target.value)}
              className="input"
              min="18"
              max="25"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Savings Amount ($)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Average 4-year public university: $100,000. Private: $200,000+
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Savings & Contributions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Savings Balance ($)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Contribution Frequency</label>
            <select
              value={contributionType}
              onChange={(e) => setContributionType(e.target.value)}
              className="input"
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">{result.contributionType} Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="input"
              min="0"
              max="15"
              step="0.1"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Conservative: 4-5%. Moderate: 6-7%. Aggressive: 8-10%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Savings Plan Type</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Plan Type</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className="input"
            >
              <option value="529">529 College Savings Plan</option>
              <option value="esa">Coverdell ESA</option>
              <option value="ugma">UGMA/UTMA (Custodial)</option>
              <option value="roth">Roth IRA (for child earnings)</option>
            </select>
          </div>
          {result.is529 && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">State of Residence</label>
              <select
                value={stateOfResidence}
                onChange={(e) => setStateOfResidence(e.target.value)}
                className="input"
              >
                <option value="CA">California (No state deduction)</option>
                <option value="NY">New York ($10,000 deduction)</option>
                <option value="PA">Pennsylvania ($18,000 deduction)</option>
                <option value="IN">Indiana ($7,500 deduction)</option>
                <option value="CO">Colorado ($7,000 deduction)</option>
                <option value="IL">Illinois ($10,000 deduction)</option>
                <option value="GA">Georgia ($4,000 deduction)</option>
                <option value="VA">Virginia ($4,000 deduction)</option>
                <option value="MI">Michigan ($5,000 deduction)</option>
                <option value="AZ">Arizona ($2,000 deduction)</option>
                <option value="OH">Ohio ($4,000 deduction)</option>
                <option value="UT">Utah ($2,400 deduction)</option>
                <option value="TX">Texas (No state income tax)</option>
                <option value="FL">Florida (No state income tax)</option>
                <option value="WA">Washington (No state income tax)</option>
                <option value="NV">Nevada (No state income tax)</option>
                <option value="NJ">New Jersey (No state deduction)</option>
                <option value="MA">Massachusetts (No state deduction)</option>
                <option value="NC">North Carolina (No state deduction)</option>
              </select>
              <div className="text-xs text-zinc-500 mt-1">
                State deduction limit: ${result.stateDeductionLimit}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Time to College</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Years:</span>
            <span className="font-medium ml-2">{result.yearsToCollege}</span>
          </div>
          <div>
            <span className="text-zinc-600">Months:</span>
            <span className="font-medium ml-2">{result.monthsToCollege}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Projected Savings Growth</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Current Savings FV:</span>
            <span className="font-medium ml-2">${result.futureValueCurrent}</span>
          </div>
          <div>
            <span className="text-zinc-600">Contributions FV:</span>
            <span className="font-medium ml-2">${result.futureValueContributions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Contributions:</span>
            <span className="font-medium ml-2">${result.totalContributions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Projected Total:</span>
            <span className="font-bold ml-2">${result.projectedTotal}</span>
          </div>
        </div>
      </div>

      <div className={`card ${result.onTrack ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.onTrack ? 'text-green-700' : 'text-red-700'}`}>
          {result.onTrack ? 'On Track!' : 'Shortfall Detected'}
        </h3>
        {result.onTrack ? (
          <div className="text-sm text-green-600">
            Projected savings exceed target by ${result.excess}
          </div>
        ) : (
          <>
            <div className="text-xl font-bold text-red-800">${result.shortfall}</div>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div>
                <span className="text-zinc-600">Required Monthly:</span>
                <span className="font-bold ml-2">${result.requiredMonthly}</span>
              </div>
              <div>
                <span className="text-zinc-600">Increase Needed:</span>
                <span className="font-medium ml-2">${(parseFloat(result.requiredMonthly) - parseFloat(result.monthlyContribution)).toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {(result.is529 || result.isESA) && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Tax Benefits</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">State Deduction:</span>
              <span className="font-medium ml-2">${result.deductibleAmount}</span>
            </div>
            <div>
              <span className="text-zinc-600">State Tax Savings:</span>
              <span className="font-medium ml-2">${result.stateTaxSavings}</span>
            </div>
            <div>
              <span className="text-zinc-600">Tax-Free Growth:</span>
              <span className="font-medium ml-2">${result.taxAdvantagedBenefit}</span>
            </div>
            <div>
              <span className="text-zinc-600">Total Tax Benefit:</span>
              <span className="font-bold ml-2">${result.totalBenefit}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Plan Limits</h3>
        <div className="text-sm">
          <div className="mb-2"><strong>{result.planType}</strong></div>
          <div className="text-xs text-orange-600">{result.planDescription}</div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <span className="text-zinc-600">Annual Limit:</span>
              <span className="font-medium ml-2">{result.planAnnualLimit}</span>
            </div>
            <div>
              <span className="text-zinc-600">Lifetime Limit:</span>
              <span className="font-medium ml-2">{result.planLifetimeLimit}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">College Cost Inflation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Current Target:</span>
            <span className="font-medium ml-2">${result.targetAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Inflated Cost:</span>
            <span className="font-bold ml-2">${result.inflatedCollegeCost}</span>
          </div>
        </div>
        <div className="text-xs text-yellow-600 mt-2">
          College costs inflate ~5% annually. Consider adjusting your target.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Education Savings Plan Comparison</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>529 Plan:</strong> High contribution limits, tax-free growth for education, state tax deductions in some states. Funds must be used for qualified education expenses.</li>
          <li><strong>Coverdell ESA:</strong> $2,000 annual limit per child, tax-free growth, can be used for K-12 and college. Income limits apply ($110K single, $220K married).</li>
          <li><strong>UGMA/UTMA:</strong> No contribution limits, but kiddie tax applies (child unearned income taxed at parent rate above $2,500). Assets belong to child at maturity.</li>
          <li><strong>Roth IRA:</strong> Child must have earned income. Contributions limited to earned income amount (max $7,000). Can withdraw contributions penalty-free for education.</li>
          <li><strong>Strategy:</strong> Start early, automate contributions, increase with income raises, consider state-specific 529 benefits.</li>
          <li><strong>Withdrawal:</strong> 529/ESA must be used for qualified expenses (tuition, room, board, books, computers). Non-qualified withdrawals face 10% penalty + taxes.</li>
        </ul>
      </div>
    </main>
  )
}