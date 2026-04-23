'use client'

import { useState } from 'react'

export default function HSAContributionCalculator() {
  const [annualIncome, setAnnualIncome] = useState('')
  const [coverageType, setCoverageType] = useState('self')
  const [age, setAge] = useState('')
  const [employerContribution, setEmployerContribution] = useState('')
  const [catchUpEligible, setCatchUpEligible] = useState(false)
  const [hdhpDeductible, setHdhpDeductible] = useState('')
  const [hasOtherCoverage, setHasOtherCoverage] = useState(false)

  const calculate = () => {
    const income = parseFloat(annualIncome) || 75000
    const coverage = coverageType
    const userAge = parseInt(age) || 40
    const employerContrib = parseFloat(employerContribution) || 0
    const isCatchUp = catchUpEligible || userAge >= 55
    const deductible = parseFloat(hdhpDeductible) || 1500

    // 2026 HSA Contribution Limits
    const baseLimits = {
      'self': 4150,
      'family': 8300
    }

    // Catch-up contribution (age 55+)
    const catchUpLimit = isCatchUp ? 1000 : 0

    // Total IRS limit
    const irsLimit = baseLimits[coverage as keyof typeof baseLimits] + catchUpLimit

    // Your contribution limit (minus employer)
    const yourLimit = irsLimit - employerContrib

    // Monthly contribution recommendation
    const monthlyContrib = yourLimit / 12

    // Tax savings calculation
    const federalTaxRate = 0.22 // Assume 22% bracket
    const stateTaxRate = 0.05 // Average state tax
    const ficaRate = 0.0765 // FICA savings (if payroll deduction)

    const federalSavings = yourLimit * federalTaxRate
    const stateSavings = yourLimit * stateTaxRate
    const ficaSavings = yourLimit * ficaRate
    const totalTaxSavings = federalSavings + stateSavings + ficaSavings

    // Triple tax advantage
    const contributionTaxFree = yourLimit // Tax-free contribution
    const growthTaxFree = yourLimit * 0.07 // Assume 7% growth, tax-free
    const withdrawalTaxFree = yourLimit // Tax-free for qualified medical

    // HSA as investment analysis
    const annualGrowth = 0.07
    const yearsToRetirement = 65 - userAge
    const futureValue = yourLimit * Math.pow(1 + annualGrowth, yearsToRetirement)
    const totalFutureValue = futureValue * yearsToRetirement // Rough estimate

    // Compare to FSA (use-it-or-lose-it)
    const fsaLimit = 3160 // 2026 FSA limit
    const fsaTaxSavings = fsaLimit * (federalTaxRate + stateTaxRate)

    // HDHP qualification check
    const minDeductibleSelf = 1600
    const minDeductibleFamily = 3200
    const maxOutOfPocketSelf = 8050
    const maxOutOfPocketFamily = 16100

    const meetsMinDeductible = coverage === 'self'
      ? deductible >= minDeductibleSelf
      : deductible >= minDeductibleFamily

    return {
      irsLimit: irsLimit.toFixed(2),
      yourLimit: yourLimit.toFixed(2),
      employerContribution: employerContrib.toFixed(2),
      monthlyContrib: monthlyContrib.toFixed(2),
      federalSavings: federalSavings.toFixed(2),
      stateSavings: stateSavings.toFixed(2),
      ficaSavings: ficaSavings.toFixed(2),
      totalTaxSavings: totalTaxSavings.toFixed(2),
      coverageType: coverage,
      catchUpEligible: isCatchUp,
      age: userAge,
      yearsToRetirement,
      futureValue: futureValue.toFixed(2),
      fsaLimit: fsaLimit.toFixed(2),
      fsaTaxSavings: fsaTaxSavings.toFixed(2),
      hsaVsFsaSavings: (totalTaxSavings - fsaTaxSavings).toFixed(2),
      meetsHdhpRequirements: meetsMinDeductible && !hasOtherCoverage,
      deductible,
      minDeductible: coverage === 'self' ? minDeductibleSelf : minDeductibleFamily,
      maxOutOfPocket: coverage === 'self' ? maxOutOfPocketSelf : maxOutOfPocketFamily,
      contributionBase: baseLimits[coverage as keyof typeof baseLimits],
      catchUpAmount: catchUpLimit,
      income: income.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HSA Contribution Calculator</h1>
      <p className="text-zinc-600">Calculate 2026 HSA limits, tax savings, and triple tax advantage for Health Savings Accounts.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">HSA Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Coverage Type</label>
            <select
              value={coverageType}
              onChange={(e) => setCoverageType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="self">Self-only ($4,150 limit)</option>
              <option value="family">Family ($8,300 limit)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Employer Contribution</label>
            <input
              type="number"
              value={employerContribution}
              onChange={(e) => setEmployerContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter employer HSA contribution"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">HDHP Minimum Deductible</label>
            <input
              type="number"
              value={hdhpDeductible}
              onChange={(e) => setHdhpDeductible(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your HDHP deductible"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Minimum: $${result.minDeductible} ({coverageType === 'self' ? 'self' : 'family'})
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Catch-up Eligibility</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={catchUpEligible}
                onChange={(e) => setCatchUpEligible(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Age 55+ (add $1,000 catch-up)</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Other Coverage</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={hasOtherCoverage}
                onChange={(e) => setHasOtherCoverage(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Have other non-HDHP coverage (disqualifies HSA)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Contribution Limits</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">IRS Limit ({coverageType === 'self' ? 'Self' : 'Family'})</span>
            <span className="font-bold">$${result.contributionBase}</span>
          </div>
          {result.catchUpEligible && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Catch-up (55+)</span>
              <span className="font-bold text-green-600">+$${result.catchUpAmount}</span>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Total IRS Limit</span>
            <span className="font-bold">$${result.irsLimit}</span>
          </div>
          {parseFloat(result.employerContribution) > 0 && (
            <div className="bg-blue-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Employer Contribution</span>
              <span className="font-bold text-blue-600">-$${result.employerContribution}</span>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Your Contribution Limit</span>
            <span className="font-bold text-blue-600">$${result.yourLimit}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Savings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Federal Tax Savings</div>
            <div className="text-2xl font-bold text-green-600">$${result.federalSavings}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">State Tax Savings</div>
            <div className="text-2xl font-bold text-green-600">$${result.stateSavings}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">FICA Savings</div>
            <div className="text-2xl font-bold text-green-600">$${result.ficaSavings}</div>
          </div>
          <div className="bg-green-50 rounded p-4">
            <div className="text-sm text-zinc-500">Total Tax Savings</div>
            <div className="text-2xl font-bold text-green-600">$${result.totalTaxSavings}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Monthly Contribution</h3>
        <div className="bg-white rounded p-4">
          <div className="text-sm text-zinc-500">Recommended Monthly</div>
          <div className="text-3xl font-bold text-blue-600">$${result.monthlyContrib}</div>
          <div className="text-xs text-zinc-500 mt-2">
            $${result.yourLimit}/year = $${result.monthlyContrib}/month. Contribute via payroll for FICA savings.
          </div>
        </div>
      </div>

      {result.meetsHdhpRequirements ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">HDHP Qualified</h3>
          <div className="text-sm text-green-600">
            Deductible ($${result.deductible}) meets minimum requirement ($${result.minDeductible}). HSA contributions allowed. Max out-of-pocket: $${result.maxOutOfPocket}.
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">HDHP Requirements Not Met</h3>
          <div className="text-sm text-red-600">
            {hasOtherCoverage ? 'Other coverage disqualifies HSA eligibility.' : `Deductible ($${result.deductible}) below minimum ($${result.minDeductible}). Increase deductible or switch to HDHP plan to qualify for HSA.`}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">HSA vs FSA Comparison</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>HSA</strong>
            <div className="text-zinc-500">Limit: $${result.irsLimit}</div>
            <div className="text-zinc-500">Tax savings: $${result.totalTaxSavings}</div>
            <div className="text-zinc-500">Rolls over, portable, investable</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>FSA</strong>
            <div className="text-zinc-500">Limit: $${result.fsaLimit}</div>
            <div className="text-zinc-500">Tax savings: $${result.fsaTaxSavings}</div>
            <div className="text-zinc-500">Use-it-or-lose-it, not portable</div>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          HSA advantage: $${result.hsaVsFsaSavings} additional tax savings + rollover + investment growth + retirement use.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Triple Tax Advantage</h3>
        <div className="text-xs text-zinc-600">
          1. Tax-free contributions (reduces taxable income). 2. Tax-free growth (invest HSA funds, no taxes on gains). 3. Tax-free withdrawals for qualified medical expenses. After age 65, non-medical withdrawals taxed as income (like IRA) - no penalty. Use as supplemental retirement account.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">2026 HSA Limits</h3>
        <div className="text-xs text-zinc-600">
          Self-only: $4,150. Family: $8,300. Catch-up (55+): $1,000. HDHP minimum deductible: $1,600 self / $3,200 family. HDHP max out-of-pocket: $8,050 self / $16,100 family. No other coverage allowed (including Medicare, non-HDHP spouse coverage). Contributions must stop when enrolled in Medicare.
        </div>
      </div>
    </main>
  )
}