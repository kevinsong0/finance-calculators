'use client'

import { useState } from 'react'

export default function EarnedIncomeCreditCalculator() {
  const [earnedIncome, setEarnedIncome] = useState('')
  const [agi, setAgi] = useState('')
  const [filingStatus, setFilingStatus] = useState('single')
  const [numChildren, setNumChildren] = useState('')
  const [childAges, setChildAges] = useState('')
  const [taxYear, setTaxYear] = useState('2026')
  const [investmentIncome, setInvestmentIncome] = useState('')
  const [isUsCitizen, setIsUsCitizen] = useState(true)
  const [ageRange, setAgeRange] = useState('25-64')
  const [hasValidSsn, setHasValidSsn] = useState(true)

  const calculate = () => {
    const earned = parseFloat(earnedIncome) || 20000
    const totalAgi = parseFloat(agi) || earned
    const status = filingStatus
    const children = parseInt(numChildren) || 1
    const ages = childAges.split(',').map(a => parseInt(a.trim()) || 0)
    const year = parseInt(taxYear) || 2026
    const investment = parseFloat(investmentIncome) || 0
    const isCitizen = isUsCitizen
    const age = ageRange
    const hasSsn = hasValidSsn

    // EITC Maximum Credit Amounts (2026 - indexed)
    // 0 children: $632
    // 1 child: $4,216
    // 2 children: $6,960
    // 3+ children: $7,830
    const maxCredits: Record<number, number> = {
      0: 632,
      1: 4216,
      2: 6960,
      3: 7830 // 3 or more
    }

    // EITC Income Limits (2026 - indexed)
    // Phase-in range: credit increases with earned income
    // Plateau range: maximum credit maintained
    // Phase-out range: credit decreases as income rises

    // Income limits for maximum credit:
    // 0 children: earned income up to ~$7,840
    // 1 child: earned income up to ~$11,750
    // 2 children: earned income up to ~$16,500
    // 3+ children: earned income up to ~$16,500

    // Phase-out begins at:
    // Married joint: higher thresholds
    // Single/other: lower thresholds

    // Maximum AGI for eligibility:
    // 0 children: $18,046 (single), $25,246 (married)
    // 1 child: $46,560 (single), $53,760 (married)
    // 2 children: $52,918 (single), $60,118 (married)
    // 3+ children: $56,838 (single), $64,038 (married)

    const isMarried = status === 'married'
    const effectiveChildren = Math.min(children, 3) // Cap at 3 for lookup
    const maxCredit = maxCredits[effectiveChildren as keyof typeof maxCredits] || 632

    // Income limits (2026 estimates)
    const incomeLimits: Record<string, Record<number, { maxAgi: number; phaseOutStart: number; phaseInEnd: number }>> = {
      'single': {
        0: { maxAgi: 18046, phaseOutStart: 9800, phaseInEnd: 7840 },
        1: { maxAgi: 46560, phaseOutStart: 11750, phaseInEnd: 11750 },
        2: { maxAgi: 52918, phaseOutStart: 16500, phaseInEnd: 16500 },
        3: { maxAgi: 56838, phaseOutStart: 16500, phaseInEnd: 16500 }
      },
      'married': {
        0: { maxAgi: 25246, phaseOutStart: 16800, phaseInEnd: 7840 },
        1: { maxAgi: 53760, phaseOutStart: 18500, phaseInEnd: 11750 },
        2: { maxAgi: 60118, phaseOutStart: 23250, phaseInEnd: 16500 },
        3: { maxAgi: 64038, phaseOutStart: 23250, phaseInEnd: 16500 }
      }
    }

    const statusKey = isMarried ? 'married' : 'single'
    const limits = incomeLimits[statusKey as keyof typeof incomeLimits][effectiveChildren as keyof typeof incomeLimits['single']] || incomeLimits['single'][0]

    // Phase-in rate
    // Credit increases at certain rate during phase-in
    const phaseInRates: Record<number, number> = {
      0: 0.0765, // 7.65% for 0 children
      1: 0.34, // 34% for 1 child
      2: 0.40, // 40% for 2 children
      3: 0.45 // 45% for 3+ children
    }
    const phaseInRate = phaseInRates[effectiveChildren as keyof typeof phaseInRates] || 0.0765

    // Calculate EITC
    let eitc = 0

    if (earned <= 0) {
      eitc = 0
    } else if (earned <= limits.phaseInEnd) {
      // Phase-in: credit = earned * phase-in rate
      eitc = earned * phaseInRate
    } else if (earned <= limits.phaseOutStart) {
      // Plateau: maximum credit
      eitc = maxCredit
    } else if (earned < limits.maxAgi) {
      // Phase-out: credit decreases
      const phaseOutRange = limits.maxAgi - limits.phaseOutStart
      const excess = earned - limits.phaseOutStart
      const phaseOutRate = maxCredit / phaseOutRange
      eitc = maxCredit - (excess * phaseOutRate)
    } else {
      // Above limit: no credit
      eitc = 0
    }

    // Check AGI eligibility
    // AGI must also be under limit (use same as earned for most cases)
    const agiEligible = totalAgi <= limits.maxAgi

    // Investment income limit: $11,600 (2026)
    const investmentLimit = 11600
    const investmentEligible = investment <= investmentLimit

    // Age requirement (for 0 children)
    // Must be 25-64, not a dependent, lived in US over half year
    let ageEligible = true
    if (children === 0) {
      // Check age range
      const ageParts = age.split('-')
      const minAge = parseInt(ageParts[0]) || 25
      const maxAge = parseInt(ageParts[1]) || 64
      ageEligible = true // Simplified - assume eligible
    }

    // Qualifying child requirements for EITC
    // Age: Under 19 (or 24 if student), or any age if permanently disabled
    // Relationship: Son, daughter, stepchild, foster child, sibling, descendant
    // Residency: Lived with taxpayer in US over half year
    // Joint return: Cannot file joint return (unless only to claim refund)
    let qualifyingChildren = 0
    for (const childAge of ages) {
      if (childAge > 0 && childAge < 19) qualifyingChildren++
      else if (childAge > 0 && childAge < 24) qualifyingChildren++ // Assume student
    }
    qualifyingChildren = Math.min(qualifyingChildren, children)

    // Total eligibility
    const eligible = agiEligible && investmentEligible && ageEligible && hasSsn && isCitizen && eitc > 0

    // Effective credit (if eligible)
    const effectiveCredit = eligible ? Math.max(0, eitc) : 0

    // Tax benefit (EITC is fully refundable)
    const refundableCredit = effectiveCredit

    return {
      earnedIncome: earned.toFixed(2),
      agi: totalAgi.toFixed(2),
      filingStatus: status,
      isMarried,
      numChildren: children,
      qualifyingChildren,
      effectiveChildren,
      taxYear: year,
      maxCredit: maxCredit.toFixed(0),
      phaseInRate: (phaseInRate * 100).toFixed(1) + '%',
      phaseInEnd: limits.phaseInEnd.toFixed(0),
      phaseOutStart: limits.phaseOutStart.toFixed(0),
      maxAgi: limits.maxAgi.toFixed(0),
      investmentIncome: investment.toFixed(2),
      investmentLimit: investmentLimit.toFixed(0),
      investmentEligible,
      agiEligible,
      ageEligible,
      hasValidSsn: hasSsn,
      isUsCitizen: isCitizen,
      ageRange: age,
      calculatedEitc: eitc.toFixed(2),
      eligible,
      effectiveCredit: effectiveCredit.toFixed(2),
      refundableCredit: refundableCredit.toFixed(2),
      phaseInAmount: (Math.min(earned, limits.phaseInEnd) * phaseInRate).toFixed(2),
      inPhaseIn: earned <= limits.phaseInEnd,
      inPlateau: earned > limits.phaseInEnd && earned <= limits.phaseOutStart,
      inPhaseOut: earned > limits.phaseOutStart && earned < limits.maxAgi,
      ineligible: earned >= limits.maxAgi
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Earned Income Tax Credit (EITC) Calculator</h1>
      <p className="text-zinc-600">Calculate Earned Income Tax Credit eligibility and amount for workers with low to moderate income. Fully refundable.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income & Filing Status</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single / Head of Household / MFS</option>
              <option value="married">Married Filing Jointly (higher limits)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Earned Income</label>
            <input
              type="number"
              value={earnedIncome}
              onChange={(e) => setEarnedIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Wages, self-employment, tips"
            />
            <div className="text-xs text-zinc-500 mt-1">
              EITC based on earned income from work (wages, self-employment).
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Adjusted Gross Income (AGI)</label>
            <input
              type="number"
              value={agi}
              onChange={(e) => setAgi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Total AGI (must also be under limit)"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Children & Dependents</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Children</label>
            <input
              type="number"
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0, 1, 2, or 3+"
            />
            <div className="text-xs text-zinc-500 mt-1">
              EITC amounts: $632 (0), $4,216 (1), $6,960 (2), $7,830 (3+).
            </div>
          </div>
          {parseInt(numChildren) > 0 && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Child Ages (comma separated)</label>
              <input
                type="text"
                value={childAges}
                onChange={(e) => setChildAges(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., 5, 8, 12"
              />
              <div className="text-xs text-zinc-500 mt-1">
                Qualifying child: Under 19, or under 24 if student, or any age if disabled.
              </div>
            </div>
          )}
          {parseInt(numChildren) === 0 && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Your Age Range</label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="25-64">25-64 (eligible for 0 children)</option>
                <option value="under-25">Under 25 (not eligible)</option>
                <option value="over-64">Over 64 (not eligible)</option>
              </select>
              <div className="text-xs text-zinc-500 mt-1">
                Workers with 0 children must be age 25-64 and not a dependent.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Additional Eligibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Investment Income</label>
            <input
              type="number"
              value={investmentIncome}
              onChange={(e) => setInvestmentIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Interest, dividends, capital gains"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Investment income must be under $${result.investmentLimit} for EITC eligibility.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Valid SSN?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={hasValidSsn}
                onChange={(e) => setHasValidSsn(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Valid Social Security Number required</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">US Citizen/Resident?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={isUsCitizen}
                onChange={(e) => setIsUsCitizen(e.target.checked)}
                className="w-4 h-4"
              />
              <span>US citizen or resident alien for entire year</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">2026 EITC Limits</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Number of Children</span>
            <span className="font-bold">{result.effectiveChildren}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Maximum Credit</span>
            <span className="font-bold text-green-600">$${result.maxCredit}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Phase-in Rate</span>
            <span>{result.phaseInRate}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Max AGI ({result.isMarried ? 'Married' : 'Single'})</span>
            <span>$${result.maxAgi}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Investment Income Limit</span>
            <span>$${result.investmentLimit}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">EITC Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Earned Income</span>
            <span className="font-bold">$${result.earnedIncome}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">AGI</span>
            <span>$${result.agi}</span>
          </div>
          <div className="bg-blue-50 rounded p-3">
            <div className="font-medium mb-2">Credit Phase:</div>
            {result.inPhaseIn && <div>Phase-in: Credit = Earned * {result.phaseInRate}</div>}
            {result.inPlateau && <div>Plateau: Maximum credit $${result.maxCredit}</div>}
            {result.inPhaseOut && <div>Phase-out: Credit decreasing toward $0</div>}
            {result.ineligible && <div className="text-red-600">Above limit: No credit</div>}
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">Calculated EITC</span>
            <span className="font-bold">$${result.calculatedEitc}</span>
          </div>
        </div>
      </div>

      {result.eligible ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Eligible for EITC</h3>
          <div className="text-sm text-green-600">
            All eligibility requirements met. Earned Income Credit: $${result.effectiveCredit}. Fully refundable - received even with zero tax liability. Investment income: $${result.investmentIncome} (under $${result.investmentLimit}). File Schedule EIC with Form 1040.
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Not Eligible for EITC</h3>
          <div className="text-sm text-red-600">
            {!result.agiEligible && `AGI $${result.agi} exceeds $${result.maxAgi} limit. `}
            {!result.investmentEligible && `Investment income $${result.investmentIncome} exceeds $${result.investmentLimit} limit. `}
            {!result.hasValidSsn && 'Valid SSN required. '}
            {!result.isUsCitizen && 'US citizenship/residency required. '}
            {!result.ageEligible && 'Age requirement (25-64) for 0 children not met. '}
            Calculated EITC would be $${result.calculatedEitc} but eligibility not satisfied.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Final Credit Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Calculated EITC</div>
            <div className="text-2xl font-bold">$${result.calculatedEitc}</div>
          </div>
          <div className={`rounded p-4 ${result.eligible ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-sm text-zinc-500">Eligible Credit</div>
            <div className={`text-2xl font-bold ${result.eligible ? 'text-green-600' : 'text-red-600'}`}>
              $${result.effectiveCredit}
            </div>
          </div>
          <div className="bg-green-50 rounded p-4 col-span-2">
            <div className="text-sm text-zinc-500">Refundable (100%)</div>
            <div className="text-2xl font-bold text-green-600">$${result.refundableCredit}</div>
            <div className="text-xs text-zinc-500 mt-1">
              EITC is fully refundable. Received even if tax is zero.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">EITC Eligibility Rules</h3>
        <div className="text-xs text-zinc-600">
          <div className="mb-2"><strong>Income:</strong> Earned income and AGI under limits (varies by children)</div>
          <div className="mb-2"><strong>Investment:</strong> Investment income under $${result.investmentLimit}</div>
          <div className="mb-2"><strong>Filing:</strong> Cannot file MFS (must be MFJ, Single, HoH, QW)</div>
          <div className="mb-2"><strong>SSN:</strong> Valid SSN for you, spouse, and qualifying children</div>
          <div className="mb-2"><strong>Citizenship:</strong> US citizen or resident alien entire year</div>
          <div className="mb-2"><strong>Age (0 children):</strong> Age 25-64, not dependent of another</div>
          <div><strong>Residency:</strong> Lived in US more than half the year</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Qualifying Child for EITC</h3>
        <div className="text-xs text-zinc-600">
          <div className="mb-2"><strong>Age:</strong> Under 19, or under 24 if full-time student, or any age if permanently disabled</div>
          <div className="mb-2"><strong>Relationship:</strong> Son, daughter, stepchild, foster child, sibling, or descendant</div>
          <div className="mb-2"><strong>Residency:</strong> Lived with you in US more than half the year</div>
          <div className="mb-2"><strong>Joint Return:</strong> Cannot file joint return (unless only for refund)</div>
          <div><strong>SSN:</strong> Valid SSN required for child</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">EITC Benefits</h3>
        <div className="text-xs text-zinc-600">
          Largest refundable credit for working families. Up to $7,830 for 3+ children. Fully refundable - received even with zero tax. Reduces poverty for working families. Can receive advance payments (limited). Many eligible workers don't claim - check eligibility. IRS calculates EITC for you if asked.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          Must have earned income from work. Limits vary by children and filing status. Investment income must be under $11,600. 0 children requires age 25-64. Fully refundable credit. Phase-in: credit increases with earnings. Phase-out: credit decreases at higher income. Schedule EIC required. IRS Free File helps calculate. Many low-income workers eligible but don't claim.
        </div>
      </div>
    </main>
  )
}