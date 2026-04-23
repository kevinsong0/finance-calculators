'use client'

import { useState } from 'react'

export default function TaxBenefitOfDependentsCalculator() {
  const [numDependents, setNumDependents] = useState(2)
  const [dependentAges, setDependentAges] = useState<number[]>([10, 16])
  const [annualIncome, setAnnualIncome] = useState(120000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('married')
  const [dependentType, setDependentType] = useState<'child' | 'relative' | 'both'>('child')
  const [numQualifyingChildren, setNumQualifyingChildren] = useState(2)
  const [numQualifyingRelatives, setNumQualifyingRelatives] = useState(0)
  const [childcareExpenses, setChildcareExpenses] = useState(5000)

  const calculate = () => {
    // Child Tax Credit (CTC)
    const ctcPerChild = 2000
    const additionalCtcPerChild = 1700 // Refundable portion
    const ctcPhaseoutStart = filingStatus === 'married' ? 400000 : 200000
    const ctcPhaseoutEnd = filingStatus === 'married' ? 600000 : 400000

    const ctcFull = numQualifyingChildren * ctcPerChild
    const additionalCtcFull = numQualifyingChildren * additionalCtcPerChild

    // CTC phaseout
    let ctcReduction = 0
    if (annualIncome > ctcPhaseoutStart) {
      ctcReduction = Math.min(ctcFull, ((annualIncome - ctcPhaseoutStart) / 1000) * 50)
    }
    const ctcActual = Math.max(0, ctcFull - ctcReduction)
    const additionalCtcActual = Math.max(0, additionalCtcFull - ctcReduction)

    // Credit for Other Dependents (ODC)
    const odcPerDependent = 500
    const odcDependents = numDependents - numQualifyingChildren // Non-child qualifying dependents
    const odcPhaseoutSameAsCTC = true // Same phaseout rules as CTC

    let odcReduction = 0
    if (annualIncome > ctcPhaseoutStart) {
      odcReduction = Math.min(odcDependents * odcPerDependent, ((annualIncome - ctcPhaseoutStart) / 1000) * 50)
    }
    const odcActual = Math.max(0, odcDependents * odcPerDependent - odcReduction)

    // Child and Dependent Care Credit
    let cdccRate = 0.20
    if (annualIncome <= 15000) cdccRate = 0.35
    else if (annualIncome <= 25000) cdccRate = 0.30
    else if (annualIncome <= 35000) cdccRate = 0.25
    else if (annualIncome <= 45000) cdccRate = 0.22
    else cdccRate = 0.20

    const cdccMaxExpense = 3000 // Per qualifying person, max $6000 for 2+
    const cdccExpenseCap = Math.min(childcareExpenses, numQualifyingChildren >= 2 ? 6000 : 3000)
    const cdccCredit = cdccExpenseCap * cdccRate

    // Earned Income Tax Credit (EITC) - simplified for dependents
    let eitc = 0
    if (filingStatus === 'married') {
      if (numQualifyingChildren === 0 && annualIncome <= 24590) eitc = 632
      else if (numQualifyingChildren === 1 && annualIncome <= 54270) eitc = 6985
      else if (numQualifyingChildren === 2 && annualIncome <= 59090) eitc = 7830
      else if (numQualifyingChildren >= 3 && annualIncome <= 63650) eitc = 9320
    } else {
      if (numQualifyingChildren === 0 && annualIncome <= 18590) eitc = 632
      else if (numQualifyingChildren === 1 && annualIncome <= 48270) eitc = 6985
      else if (numQualifyingChildren === 2 && annualIncome <= 53090) eitc = 7830
      else if (numQualifyingChildren >= 3 && annualIncome <= 57650) eitc = 9320
    }

    // Head of Household filing status benefit (if single with dependents)
    const standardDeductionSingle = 14600
    const standardDeductionHOH = 21900
    const hohBenefit = filingStatus === 'single' && numDependents > 0 ? (standardDeductionHOH - standardDeductionSingle) * 0.12 : 0

    // Total tax benefit
    const totalCredits = ctcActual + odcActual + cdccCredit + eitc
    const totalBenefit = totalCredits + hohBenefit

    return {
      numDependents: numDependents.toFixed(0),
      numQualifyingChildren: numQualifyingChildren.toFixed(0),
      numQualifyingRelatives: numQualifyingRelatives.toFixed(0),
      annualIncome: annualIncome.toFixed(0),
      filingStatus,
      childcareExpenses: childcareExpenses.toFixed(0),
      ctcFull: ctcFull.toFixed(0),
      ctcActual: ctcActual.toFixed(0),
      additionalCtcActual: additionalCtcActual.toFixed(0),
      ctcPhaseoutStart: ctcPhaseoutStart.toFixed(0),
      odcDependents: odcDependents.toFixed(0),
      odcActual: odcActual.toFixed(0),
      cdccRate: (cdccRate * 100).toFixed(0),
      cdccCredit: cdccCredit.toFixed(0),
      eitc: eitc.toFixed(0),
      hohBenefit: hohBenefit.toFixed(0),
      totalCredits: totalCredits.toFixed(0),
      totalBenefit: totalBenefit.toFixed(0),
      ctcPerChild: ctcPerChild.toFixed(0),
      odcPerDependent: odcPerDependent.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Benefit of Dependents Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax credits and benefits from claiming dependents.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Number of Dependents</label>
          <input
            type="number"
            value={numDependents}
            onChange={(e) => setNumDependents(Number(e.target.value))}
            min="0"
            max="10"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Qualifying Children</label>
          <input
            type="number"
            value={numQualifyingChildren}
            onChange={(e) => setNumQualifyingChildren(Number(e.target.value))}
            min="0"
            max="10"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Qualifying Relatives</label>
          <input
            type="number"
            value={numQualifyingRelatives}
            onChange={(e) => setNumQualifyingRelatives(Number(e.target.value))}
            min="0"
            max="10"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Childcare Expenses ($)</label>
          <input
            type="number"
            value={childcareExpenses}
            onChange={(e) => setChildcareExpenses(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Child Tax Credit (CTC)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Per Child Amount:</span>
            <span className="font-bold ml-2">$ {result.ctcPerChild}</span>
          </div>
          <div>
            <span className="text-zinc-600">Full Credit:</span>
            <span className="font-medium ml-2">$ {result.ctcFull}</span>
          </div>
          <div>
            <span className="text-zinc-600">Actual Credit:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.ctcActual}</span>
          </div>
          <div>
            <span className="text-zinc-600">Refundable (ACTC):</span>
            <span className="font-bold text-green-700 ml-2">$ {result.additionalCtcActual}</span>
          </div>
          <div>
            <span className="text-zinc-600">Phaseout Starts:</span>
            <span className="font-medium ml-2">$ {result.ctcPhaseoutStart}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.odcActual) > 0 && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Credit for Other Dependents (ODC)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Per Dependent:</span>
              <span className="font-bold ml-2">$ {result.odcPerDependent}</span>
            </div>
            <div>
              <span className="text-zinc-600">Qualifying Relatives:</span>
              <span className="font-medium ml-2">{result.odcDependents}</span>
            </div>
            <div>
              <span className="text-zinc-600">Actual Credit:</span>
              <span className="font-bold text-purple-700 ml-2">$ {result.odcActual}</span>
            </div>
          </div>
        </div>
      )}

      {parseFloat(result.childcareExpenses) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Child & Dependent Care Credit</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Credit Rate:</span>
              <span className="font-medium ml-2">{result.cdccRate}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Childcare Expenses:</span>
              <span className="font-medium ml-2">$ {result.childcareExpenses}</span>
            </div>
            <div>
              <span className="text-zinc-600">Credit Amount:</span>
              <span className="font-bold text-orange-700 ml-2">$ {result.cdccCredit}</span>
            </div>
          </div>
        </div>
      )}

      {parseFloat(result.eitc) > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Earned Income Tax Credit (EITC)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">EITC Amount:</span>
              <span className="font-bold text-green-700 ml-2">$ {result.eitc}</span>
            </div>
            <div>
              <span className="text-zinc-600">Refundable:</span>
              <span className="font-bold text-green-700 ml-2">Yes (100%)</span>
            </div>
          </div>
        </div>
      )}

      {parseFloat(result.hohBenefit) > 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Head of Household Benefit</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Extra Deduction:</span>
              <span className="font-medium ml-2">$ 7,300</span>
            </div>
            <div>
              <span className="text-zinc-600">Tax Savings:</span>
              <span className="font-bold text-teal-700 ml-2">$ {result.hohBenefit}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Tax Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Credits:</span>
            <span className="font-bold ml-2">$ {result.totalCredits}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Benefit:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalBenefit}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Dependent Tax Benefits Summary</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Child Tax Credit: $2000 per qualifying child under 17</li>
          <li>Additional CTC: Up to $1700 refundable per child</li>
          <li>Credit for Other Dependents: $500 per qualifying relative</li>
          <li>Child Care Credit: 20-35% of childcare expenses (max $3000-$6000)</li>
          <li>EITC: Up to $9320 for families with 3+ qualifying children</li>
          <li>Head of Household: Higher standard deduction ($21,900 vs $14,600)</li>
        </ul>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mt-4">
        <h3 className="font-medium mb-2 text-blue-700">Qualifying Child Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Under age 17 at end of year</li>
          <li>US citizen, US national, or resident alien</li>
          <li>Lived with you for more than half the year</li>
          <li>Did not provide more than half of own support</li>
          <li>Not filing joint return (unless claiming EITC only)</li>
          <li>Related to you: child, sibling, stepchild, foster, descendant</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Qualifying Relative Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Not a qualifying child of anyone</li>
          <li>Gross income less than $5050 (2024)</li>
          <li>You provided more than half of support</li>
          <li>Lived with you all year as member of household OR related</li>
          <li>US citizen, US national, or resident alien</li>
          <li>Related: parent, sibling, in-law, aunt, uncle, etc.</li>
        </ul>
      </div>
    </div>
  )
}