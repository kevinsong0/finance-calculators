'use client'

import { useState } from 'react'

export default function FlexibleSpendingAccountCalculator() {
  const [grossIncome, setGrossIncome] = useState('')
  const [fsaType, setFsaType] = useState('health')
  const [plannedContribution, setPlannedContribution] = useState('')
  const [expectedExpenses, setExpectedExpenses] = useState('')
  const [taxYear, setTaxYear] = useState('2026')
  const [filingStatus, setFilingStatus] = useState('single')
  const [employerCarryOver, setEmployerCarryOver] = useState('0')
  const [employerGracePeriod, setEmployerGracePeriod] = useState(false)
  const [medicalExpensesList, setMedicalExpensesList] = useState('')
  const [dependentCareExpenses, setDependentCareExpenses] = useState('')
  const [numberOfDependents, setNumberOfDependents] = useState('')
  const [employerContribution, setEmployerContribution] = useState('')

  const calculate = () => {
    const income = parseFloat(grossIncome) || 75000
    const type = fsaType
    const planned = parseFloat(plannedContribution) || 2500
    const expenses = parseFloat(expectedExpenses) || 2000
    const year = parseInt(taxYear) || 2026
    const status = filingStatus
    const carryOverLimit = parseFloat(employerCarryOver) || 0
    const gracePeriod = employerGracePeriod
    const medExpensesList = parseFloat(medicalExpensesList) || expenses
    const depCareExpenses = parseFloat(dependentCareExpenses) || 0
    const dependents = parseInt(numberOfDependents) || 1
    const employerContrib = parseFloat(employerContribution) || 0

    // FSA Contribution Limits (2026)
    // Health FSA: $3,300 (indexed)
    // Dependent Care FSA: $5,000 single, $5,000 married ($2,500 MFS)
    const healthFsaLimit = 3300
    const dependentCareLimits: Record<string, number> = {
      'single': 5000,
      'married': 5000,
      'married_separate': 2500,
      'head_household': 5000
    }
    const depCareLimit = dependentCareLimits[status as keyof typeof dependentCareLimits] || 5000

    // Apply limit based on type
    const applicableLimit = type === 'health' ? healthFsaLimit : depCareLimit
    const maxContribution = applicableLimit
    const withinLimit = planned <= maxContribution
    const excessContribution = Math.max(0, planned - maxContribution)

    // Total contribution (employer + employee)
    const totalContribution = planned + employerContrib

    // Tax savings calculation
    // Federal income tax (assume 22% marginal)
    const federalRate = 0.22
    const stateRate = 0.05 // Most states allow FSA pretax
    const ficaRate = 0.0765 // FICA savings on contributions

    const federalTaxSavings = totalContribution * federalRate
    const stateTaxSavings = totalContribution * stateRate
    const ficaSavings = totalContribution * ficaRate
    const totalTaxSavings = federalTaxSavings + stateTaxSavings + ficaSavings

    // Effective cost
    const netCost = totalContribution - totalTaxSavings

    // Use-it-or-lose-it analysis
    const forfeitedAmount = Math.max(0, totalContribution - expenses - carryOverLimit)
    const forfeitRisk = forfeitedAmount > 0

    // Carry-over options (employer determines)
    // IRS allows carry-over up to $660 (2026) OR grace period of 2.5 months
    // Employer can offer either, neither, or both (limited)
    const irsCarryOverMax = 660
    const effectiveCarryOver = Math.min(carryOverLimit, irsCarryOverMax)

    // Grace period extends deadline to March 15 of following year
    const gracePeriodEndDate = 'March 15, ' + (year + 1)

    // Qualified expenses
    const qualifiedHealthExpenses = [
      'Doctor visits, copays, deductibles',
      'Prescription medications',
      'Medical equipment, supplies',
      'Dental care (not cosmetic)',
      'Vision care, glasses, contacts',
      'Mental health services',
      'Chiropractic, acupuncture (some plans)',
      'Over-the-counter meds (no prescription needed since 2020)'
    ]

    const qualifiedDependentCareExpenses = [
      'Daycare for children under 13',
      'Before/after school programs',
      'Nanny/babysitter for work-related care',
      'Summer day camp (not overnight)',
      'Elder care for disabled dependents',
      'Adult daycare'
    ]

    // Dependent care FSA rules
    const depCareAnnualLimit = depCareLimit
    const depCareMonthlyLimit = depCareAnnualLimit / 12
    const depCareQualifiedExpenses = depCareExpenses
    const depCareUseItOrLose = Math.max(0, planned - depCareQualifiedExpenses)

    // Comparison to HSA
    const hsaComparison = {
      advantage: 'FSA: Lower deductible requirement, employer controls',
      disadvantage: 'FSA: Use-it-or-lose-it, not portable, no investment option',
      hsaBetter: 'HSA: Triple tax advantage, portable, grows tax-free, no use-it-or-lose'
    }

    // Recommendation
    let recommendation = ''
    if (forfeitedAmount > 500) {
      recommendation = 'High forfeit risk. Reduce contribution to expected expenses. Use carry-over or grace period if available.'
    } else if (planned < expenses) {
      recommendation = 'Contribution under planned expenses. Consider increasing contribution for more tax savings.'
    } else {
      recommendation = 'Contribution matches expenses well. Tax savings: $${totalTaxSavings.toFixed(2)}.'
    }

    return {
      grossIncome: income.toFixed(2),
      fsaType: type,
      taxYear: year,
      plannedContribution: planned.toFixed(2),
      employerContribution: employerContrib.toFixed(2),
      totalContribution: totalContribution.toFixed(2),
      applicableLimit: applicableLimit.toFixed(0),
      withinLimit,
      excessContribution: excessContribution.toFixed(2),
      expectedExpenses: expenses.toFixed(2),
      federalTaxSavings: federalTaxSavings.toFixed(2),
      stateTaxSavings: stateTaxSavings.toFixed(2),
      ficaSavings: ficaSavings.toFixed(2),
      totalTaxSavings: totalTaxSavings.toFixed(2),
      netCost: netCost.toFixed(2),
      forfeitedAmount: forfeitedAmount.toFixed(2),
      forfeitRisk,
      carryOverLimit: effectiveCarryOver.toFixed(0),
      irsCarryOverMax: irsCarryOverMax.toFixed(0),
      gracePeriod,
      gracePeriodEndDate,
      qualifiedHealthExpenses,
      qualifiedDependentCareExpenses,
      dependentCareLimit: depCareLimit.toFixed(0),
      depCareMonthlyLimit: depCareMonthlyLimit.toFixed(2),
      recommendation,
      hsaComparison,
      effectiveTaxSavingsRate: ((totalTaxSavings / totalContribution) * 100).toFixed(1)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">FSA Contribution & Tax Savings Calculator</h1>
      <p className="text-zinc-600">Calculate Flexible Spending Account contribution limits, tax savings, and use-it-or-lose-it risk analysis.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">FSA Type & Enrollment</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">FSA Type</label>
            <select
              value={fsaType}
              onChange={(e) => setFsaType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="health">Health FSA ($3,300 limit)</option>
              <option value="dependent">Dependent Care FSA ($5,000 limit)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single ($5,000 Dep Care limit)</option>
              <option value="married">Married Joint ($5,000 Dep Care limit)</option>
              <option value="married_separate">Married Separate ($2,500 Dep Care limit)</option>
              <option value="head_household">Head of Household ($5,000 Dep Care limit)</option>
            </select>
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
        <h3 className="font-medium mb-4">Income & Contributions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Income</label>
            <input
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Annual gross income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Planned Contribution</label>
            <input
              type="number"
              value={plannedContribution}
              onChange={(e) => setPlannedContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Annual FSA contribution"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Employer Contribution (if applicable)</label>
            <input
              type="number"
              value={employerContribution}
              onChange={(e) => setEmployerContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Some employers contribute to FSA"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Qualified Expenses</label>
            <input
              type="number"
              value={expectedExpenses}
              onChange={(e) => setExpectedExpenses(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Medical or dependent care expenses"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Employer Plan Features</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Carry-over Allowed?</label>
            <select
              value={employerCarryOver}
              onChange={(e) => setEmployerCarryOver(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="0">No carry-over (use-it-or-lose-it)</option>
              <option value="660">Yes - IRS max $660 carry-over</option>
              <option value="500">Yes - $500 carry-over</option>
              <option value="300">Yes - $300 carry-over</option>
            </select>
            <div className="text-xs text-zinc-500 mt-1">
              IRS allows carry-over up to $660 (2026) OR grace period. Employer chooses which to offer.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Grace Period Offered?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={employerGracePeriod}
                onChange={(e) => setEmployerGracePeriod(e.target.checked)}
                className="w-4 h-4"
              />
              <span>2.5 month grace period (extends to March 15)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">2026 FSA Contribution Limits</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">FSA Type</span>
            <span className="font-bold">{result.fsaType === 'health' ? 'Health FSA' : 'Dependent Care FSA'}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">IRS Limit ({result.taxYear})</span>
            <span className="font-bold">$${result.applicableLimit}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Your Planned Contribution</span>
            <span className="font-bold">$${result.plannedContribution}</span>
          </div>
          {parseFloat(result.employerContribution) > 0 && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Employer Contribution</span>
              <span className="font-bold text-green-600">+$${result.employerContribution}</span>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Total Contributions</span>
            <span className="font-bold">$${result.totalContribution}</span>
          </div>
          {result.withinLimit ? (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Status</span>
              <span className="font-bold text-green-600">Within IRS Limit</span>
            </div>
          ) : (
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Excess Contribution</span>
              <span className="font-bold text-red-600">$${result.excessContribution}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Savings Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Total FSA Contributions</span>
            <span className="font-bold">$${result.totalContribution}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Federal Tax Savings (22%)</span>
            <span className="font-bold text-green-600">$${result.federalTaxSavings}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Tax Savings (5%)</span>
            <span className="font-bold text-green-600">$${result.stateTaxSavings}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">FICA Savings (7.65%)</span>
            <span className="font-bold text-green-600">$${result.ficaSavings}</span>
          </div>
          <div className="bg-green-100 rounded p-3 flex justify-between border-t-2 border-green-300">
            <span className="font-medium">Total Tax Savings</span>
            <span className="font-bold text-green-600">$${result.totalTaxSavings}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Effective Tax Savings Rate</span>
            <span className="font-bold">{result.effectiveTaxSavingsRate}%</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Net Cost After Savings</span>
            <span className="font-bold">$${result.netCost}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Use-it-or-Lose-it Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Total Contributions</span>
            <span className="font-bold">$${result.totalContribution}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Expected Expenses</span>
            <span className="font-bold">$${result.expectedExpenses}</span>
          </div>
          {parseFloat(result.carryOverLimit) > 0 && (
            <div className="bg-blue-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Carry-over Protection</span>
              <span className="font-bold text-blue-600">$${result.carryOverLimit}</span>
            </div>
          )}
          {result.gracePeriod && (
            <div className="bg-blue-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Grace Period</span>
              <span className="font-bold text-blue-600">{result.gracePeriodEndDate}</span>
            </div>
          )}
          {result.forfeitRisk ? (
            <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
              <span className="font-medium">Potential Forfeiture</span>
              <span className="font-bold text-red-600">$${result.forfeitedAmount}</span>
            </div>
          ) : (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Forfeiture Risk</span>
              <span className="font-bold text-green-600">None (expenses cover contributions)</span>
            </div>
          )}
        </div>
      </div>

      {result.forfeitRisk && parseFloat(result.forfeitedAmount) > 100 && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">High Forfeiture Risk</h3>
          <div className="text-sm text-red-600">
            You risk forfeiting $${result.forfeitedAmount} if not spent by year-end. Use carry-over ($${result.carryOverLimit}) or grace period ({result.gracePeriodEndDate}) if available. Reduce contribution to match expected expenses. Estimate carefully to avoid losing funds.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Qualified Expenses - {result.fsaType === 'health' ? 'Health FSA' : 'Dependent Care FSA'}</h3>
        <div className="text-xs text-zinc-600">
          {result.fsaType === 'health' ? (
            <ul className="space-y-1">
              {result.qualifiedHealthExpenses.map((exp, idx) => (
                <li key={idx}>- {exp}</li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-1">
              {result.qualifiedDependentCareExpenses.map((exp, idx) => (
                <li key={idx}>- {exp}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">FSA vs HSA Comparison</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-yellow-50 rounded p-3">
            <strong>FSA Disadvantages</strong>
            <div className="text-zinc-500">Use-it-or-lose-it</div>
            <div className="text-zinc-500">Not portable</div>
            <div className="text-zinc-500">No investment option</div>
            <div className="text-zinc-500">Employer controls</div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <strong>HSA Advantages</strong>
            <div className="text-zinc-500">No use-it-or-lose</div>
            <div className="text-zinc-500">Portable (you own it)</div>
            <div className="text-zinc-500">Investment option</div>
            <div className="text-zinc-500">Triple tax advantage</div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 mt-2">
          If eligible for HSA (HDHP enrolled), HSA is generally superior. FSA useful if not HDHP eligible or need dependent care.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recommendation</h3>
        <div className="text-xs text-zinc-600">
          {result.recommendation}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">FSA Rules Summary</h3>
        <div className="text-xs text-zinc-600">
          Contribution deadline: Elect during open enrollment. Contribution limit: $3,300 health, $5,000 dependent care. Use deadline: December 31 (or March 15 with grace period). Carry-over: Up to $660 if employer allows (OR grace period). Employer contribution: May contribute to your FSA. Tax savings: Pre-tax contributions reduce federal, state, FICA. Not portable: FSA ends if you leave job (except some plans allow spending).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          FSA: Use-it-or-lose-it unless carry-over/grace period. Health FSA: No HDHP required (unlike HSA). Dependent Care FSA: For childcare/elder care while working. Tax savings: 30%+ effective savings on contributions. Estimate carefully: Forfeiture risk. Check employer plan: Carry-over and grace period options vary. HSA better: If HDHP eligible, prefer HSA over Health FSA.
        </div>
      </div>
    </main>
  )
}