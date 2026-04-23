'use client'

import { useState } from 'react'

export default function ChildTaxCreditCalculator() {
  const [numChildren, setNumChildren] = useState('')
  const [childAges, setChildAges] = useState('')
  const [agi, setAgi] = useState('')
  const [filingStatus, setFilingStatus] = useState('married')
  const [taxYear, setTaxYear] = useState('2026')
  const [hasSsn, setHasSsn] = useState(true)
  const [isResident, setIsResident] = useState(true)
  const [earnedIncome, setEarnedIncome] = useState('')
  const [otherDependents, setOtherDependents] = useState('')

  const calculate = () => {
    const children = parseInt(numChildren) || 2
    const ages = childAges.split(',').map(a => parseInt(a.trim()) || 10)
    const totalAgi = parseFloat(agi) || 150000
    const status = filingStatus
    const year = parseInt(taxYear) || 2026
    const hasValidSsn = hasSsn
    const isUsResident = isResident
    const earned = parseFloat(earnedIncome) || totalAgi
    const otherDep = parseInt(otherDependents) || 0

    // Child Tax Credit Amounts (2026)
    // Full credit: $2,000 per qualifying child
    // Refundable portion: $1,700 (additional child tax credit)
    // Phase-out threshold based on filing status
    const fullCreditPerChild = 2000
    const refundablePerChild = 1700
    const nonrefundablePerChild = fullCreditPerChild - refundablePerChild // $300

    // Phase-out thresholds (2026 - indexed)
    const phaseOutThresholds: Record<string, number> = {
      'married': 400000,
      'single': 200000,
      'head_household': 200000,
      'married_separate': 200000
    }

    const phaseOutRate = 50 // $50 reduction per $1,000 over threshold

    const threshold = phaseOutThresholds[status as keyof typeof phaseOutThresholds] || 200000

    // Qualifying child requirements
    // 1. Under age 17 at end of year
    // 2. US citizen, national, or resident alien
    // 3. Has valid SSN
    // 4. Lived with taxpayer for more than half year
    // 5. Did not provide more than half their own support
    // 6. Claimed as dependent

    let qualifyingChildren = 0
    let qualifyingDetails: { age: number; qualifies: boolean; reason: string }[] = []

    for (const age of ages) {
      const under17 = age < 17
      const qualifies = under17 && hasValidSsn && isUsResident
      let reason = ''
      if (!under17) reason = 'Over age 17 (not qualifying child)'
      else if (!hasValidSsn) reason = 'Missing valid SSN'
      else if (!isUsResident) reason = 'Not US citizen/resident'
      else reason = 'Qualifies for full credit'

      qualifyingDetails.push({ age, qualifies, reason })
      if (qualifies) qualifyingChildren++
    }

    // Limit to actual number of children input
    qualifyingChildren = Math.min(qualifyingChildren, children)

    // Calculate credit before phase-out
    const maxCredit = qualifyingChildren * fullCreditPerChild

    // Phase-out calculation
    let phaseOutAmount = 0
    if (totalAgi > threshold) {
      const excessIncome = totalAgi - threshold
      const excessThousands = Math.ceil(excessIncome / 1000)
      phaseOutAmount = excessThousands * phaseOutRate
    }

    // Credit after phase-out
    const creditAfterPhaseOut = Math.max(0, maxCredit - phaseOutAmount)

    // Split into refundable and non-refundable portions
    // Refundable portion phases out first
    let refundablePortion = 0
    let nonrefundablePortion = 0

    if (phaseOutAmount === 0) {
      refundablePortion = qualifyingChildren * refundablePerChild
      nonrefundablePortion = qualifyingChildren * nonrefundablePerChild
    } else {
      // Phase out refundable first, then non-refundable
      const maxRefundable = qualifyingChildren * refundablePerChild
      const maxNonrefundable = qualifyingChildren * nonrefundablePerChild

      if (phaseOutAmount <= maxRefundable) {
        refundablePortion = maxRefundable - phaseOutAmount
        nonrefundablePortion = maxNonrefundable
      } else {
        refundablePortion = 0
        nonrefundablePortion = Math.max(0, maxNonrefundable - (phaseOutAmount - maxRefundable))
      }
    }

    // Additional Child Tax Credit (ACTC) - refundable portion
    // Requires earned income > $2,500
    // Credit limited to 15% of earned income over $2,500
    const earnedIncomeThreshold = 2500
    const actcRate = 0.15

    let additionalChildTaxCredit = 0
    if (earned > earnedIncomeThreshold && refundablePortion > 0) {
      const earnedExcess = earned - earnedIncomeThreshold
      const actcLimit = earnedExcess * actcRate
      additionalChildTaxCredit = Math.min(refundablePortion, actcLimit)
    }

    // Other Dependent Credit (ODC)
    // $500 for dependents who don't qualify for CTC
    // Non-refundable only
    const otherDependentCredit = otherDep * 500

    // Total credits
    const totalNonrefundable = nonrefundablePortion + otherDependentCredit
    const totalRefundable = additionalChildTaxCredit
    const totalCredit = totalNonrefundable + totalRefundable

    // Tax liability assumption (for non-refundable portion limit)
    const assumedTaxLiability = totalAgi * 0.10 // Simplified
    const usableNonrefundable = Math.min(totalNonrefundable, assumedTaxLiability)
    const finalCredit = usableNonrefundable + totalRefundable

    return {
      numChildren: children,
      childAges: ages,
      qualifyingChildren,
      qualifyingDetails,
      agi: totalAgi.toFixed(2),
      filingStatus: status,
      taxYear: year,
      threshold: threshold.toFixed(0),
      phaseOutThresholds: phaseOutThresholds,
      hasSsn: hasValidSsn,
      isResident: isUsResident,
      earnedIncome: earned.toFixed(2),
      fullCreditPerChild: fullCreditPerChild.toFixed(0),
      refundablePerChild: refundablePerChild.toFixed(0),
      nonrefundablePerChild: nonrefundablePerChild.toFixed(0),
      maxCredit: maxCredit.toFixed(2),
      phaseOutAmount: phaseOutAmount.toFixed(2),
      creditAfterPhaseOut: creditAfterPhaseOut.toFixed(2),
      refundablePortion: refundablePortion.toFixed(2),
      nonrefundablePortion: nonrefundablePortion.toFixed(2),
      additionalChildTaxCredit: additionalChildTaxCredit.toFixed(2),
      otherDependents: otherDep,
      otherDependentCredit: otherDependentCredit.toFixed(2),
      totalNonrefundable: totalNonrefundable.toFixed(2),
      totalRefundable: totalRefundable.toFixed(2),
      totalCredit: totalCredit.toFixed(2),
      assumedTaxLiability: assumedTaxLiability.toFixed(2),
      usableNonrefundable: usableNonrefundable.toFixed(2),
      finalCredit: finalCredit.toFixed(2),
      earnedIncomeThreshold: earnedIncomeThreshold.toFixed(0),
      actcRate: '15%',
      under17Required: true,
      phaseOutRate: '$50 per $1,000'
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Child Tax Credit Calculator</h1>
      <p className="text-zinc-600">Calculate Child Tax Credit, Additional Child Tax Credit (refundable), and Other Dependent Credit for 2026.</p>

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
              placeholder="Number of children under 17"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Child Ages (comma separated)</label>
            <input
              type="text"
              value={childAges}
              onChange={(e) => setChildAges(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., 5, 8, 12, 16"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Only children under 17 at end of tax year qualify for full Child Tax Credit.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Dependents (non-CTC eligible)</label>
            <input
              type="number"
              value={otherDependents}
              onChange={(e) => setOtherDependents(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Dependents over 17, etc."
            />
            <div className="text-xs text-zinc-500 mt-1">
              $500 Other Dependent Credit for dependents who don't qualify for CTC (non-refundable).
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">All Children Have Valid SSN?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={hasSsn}
                onChange={(e) => setHasSsn(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Valid Social Security Number required for CTC</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">US Citizens/Residents?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={isResident}
                onChange={(e) => setIsResident(e.target.checked)}
                className="w-4 h-4"
              />
              <span>US citizen, national, or resident alien</span>
            </label>
          </div>
        </div>
      </div>

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
              <option value="married">Married Joint ($400,000 threshold)</option>
              <option value="single">Single ($200,000 threshold)</option>
              <option value="head_household">Head of Household ($200,000 threshold)</option>
              <option value="married_separate">Married Separate ($200,000 threshold)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Adjusted Gross Income (AGI)</label>
            <input
              type="number"
              value={agi}
              onChange={(e) => setAgi(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total AGI"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Earned Income (for refundable portion)</label>
            <input
              type="number"
              value={earnedIncome}
              onChange={(e) => setEarnedIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Wages, self-employment income"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Refundable Additional CTC requires earned income over $2,500.
            </div>
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
        <h3 className="font-medium mb-4">Qualifying Child Analysis</h3>
        <div className="space-y-2 text-xs">
          {result.qualifyingDetails.map((child, idx) => (
            <div key={idx} className={`rounded p-3 ${child.qualifies ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex justify-between">
                <span className="text-zinc-600">Child {idx + 1} (Age {child.age})</span>
                <span className={`font-bold ${child.qualifies ? 'text-green-600' : 'text-red-600'}`}>
                  {child.qualifies ? 'Qualifies' : 'Does Not Qualify'}
                </span>
              </div>
              <div className="text-zinc-500">{child.reason}</div>
            </div>
          ))}
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">Total Qualifying Children</span>
            <span className="font-bold">{result.qualifyingChildren}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Credit Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Qualifying Children</span>
            <span className="font-bold">{result.qualifyingChildren}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Full Credit per Child</span>
            <span className="font-bold">$${result.fullCreditPerChild}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Maximum Credit (before phase-out)</span>
            <span className="font-bold text-green-600">$${result.maxCredit}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">AGI Threshold ({result.filingStatus})</span>
            <span>$${result.threshold}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Your AGI</span>
            <span>$${result.agi}</span>
          </div>
          {parseFloat(result.phaseOutAmount) > 0 && (
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Phase-out Reduction</span>
              <span className="font-bold text-red-600">-$${result.phaseOutAmount}</span>
              <div className="text-xs text-zinc-500">$50 per $1,000 over threshold</div>
            </div>
          )}
          <div className="bg-green-100 rounded p-3 flex justify-between border-t-2 border-green-300">
            <span className="font-medium">Credit After Phase-out</span>
            <span className="font-bold text-green-600">$${result.creditAfterPhaseOut}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Refundable vs Non-refundable</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <div className="font-medium mb-2">Credit Structure:</div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Refundable portion (ACTC)</span>
              <span>$${result.refundablePerChild} per child</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Non-refundable portion</span>
              <span>$${result.nonrefundablePerChild} per child</span>
            </div>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Non-refundable Credit</span>
            <span className="font-bold text-yellow-600">$${result.nonrefundablePortion}</span>
            <div className="text-xs text-zinc-500">Reduces tax, not refundable</div>
          </div>
          <div className="bg-blue-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Refundable Portion (potential)</span>
            <span className="font-bold text-blue-600">$${result.refundablePortion}</span>
            <div className="text-xs text-zinc-500">Additional Child Tax Credit</div>
          </div>
          <div className="bg-blue-100 rounded p-3 flex justify-between">
            <span className="font-medium">Additional CTC (ACTC - refundable)</span>
            <span className="font-bold text-blue-600">$${result.additionalChildTaxCredit}</span>
            <div className="text-xs text-zinc-500">15% of earned income over $2,500</div>
          </div>
        </div>
      </div>

      {result.otherDependents > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Other Dependent Credit</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Other Dependents</span>
              <span className="font-bold">{result.otherDependents}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Credit per dependent</span>
              <span>$500</span>
            </div>
            <div className="bg-yellow-50 rounded p-3 flex justify-between">
              <span className="font-medium">Other Dependent Credit</span>
              <span className="font-bold text-yellow-600">$${result.otherDependentCredit}</span>
              <div className="text-xs text-zinc-500">Non-refundable only</div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Final Credit Summary</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Non-refundable Credit</span>
            <span>$${result.totalNonrefundable}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Assumed Tax Liability</span>
            <span>$${result.assumedTaxLiability}</span>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Usable Non-refundable</span>
            <span className="font-bold text-yellow-600">$${result.usableNonrefundable}</span>
            <div className="text-xs text-zinc-500">Limited by tax liability</div>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Refundable Credit (ACTC)</span>
            <span className="font-bold text-green-600">$${result.totalRefundable}</span>
            <div className="text-xs text-zinc-500">Received even with zero tax</div>
          </div>
          <div className="bg-green-100 rounded p-3 flex justify-between border-t-2 border-green-300">
            <span className="font-medium">Total Child Tax Credit</span>
            <span className="font-bold text-green-600">$${result.finalCredit}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.phaseOutAmount) > 0 ? (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Credit Reduced by Income Phase-out</h3>
          <div className="text-sm text-yellow-600">
            AGI $${result.agi} exceeds threshold $${result.threshold}. Credit reduced by $${result.phaseOutAmount}. Phase-out: $50 per $1,000 over threshold. Full credit lost when income exceeds threshold + (max credit / $50) * $1,000.
          </div>
        </div>
      ) : (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Full Credit - Under Threshold</h3>
          <div className="text-sm text-green-600">
            AGI $${result.agi} under $${result.threshold} threshold. Full $${result.maxCredit} credit available. Refundable portion: $${result.additionalChildTaxCredit} (based on earned income).
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Qualifying Child Requirements</h3>
        <div className="text-xs text-zinc-600">
          <div className="mb-2"><strong>Age:</strong> Under 17 at end of tax year</div>
          <div className="mb-2"><strong>Relationship:</strong> Son, daughter, stepchild, eligible foster child, sibling, or descendant</div>
          <div className="mb-2"><strong>Support:</strong> Did not provide over half their own support</div>
          <div className="mb-2"><strong>Dependent:</strong> Claimed as dependent on your return</div>
          <div className="mb-2"><strong>Residence:</strong> Lived with you over half the year</div>
          <div className="mb-2"><strong>Citizenship:</strong> US citizen, national, or resident alien</div>
          <div><strong>SSN:</strong> Valid Social Security Number (ITIN not acceptable for CTC)</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Additional Child Tax Credit (ACTC)</h3>
        <div className="text-xs text-zinc-600">
          Refundable portion of CTC. Received even if tax liability is zero. Requirements: Earned income exceeds $2,500. Credit limited to 15% of earned income over $2,500. File Form 8812 to claim. Up to $1,700 per qualifying child refundable.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Phase-out Calculation</h3>
        <div className="text-xs text-zinc-600">
          Threshold: $400,000 (married), $200,000 (others). Reduction: $50 per $1,000 AGI over threshold. Example: AGI $450,000 married = $50 over threshold. Excess $50,000 = 50 thousands. Reduction = 50 * $50 = $2,500. Phase-out reduces refundable portion first.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          Full credit: $2,000 per qualifying child. Refundable: $1,700 (ACTC). Non-refundable: $300. Other Dependent Credit: $500 (non-refundable). Age limit: Under 17. SSN required. Phase-out at higher incomes. ACTC requires earned income. Form 8812 for ACTC. Credit is per child, not per family.
        </div>
      </div>
    </main>
  )
}