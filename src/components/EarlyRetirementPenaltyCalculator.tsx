'use client'

import { useState } from 'react'

export default function EarlyRetirementPenaltyCalculator() {
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [accountType, setAccountType] = useState('401k')
  const [currentAge, setCurrentAge] = useState('')
  const [reason, setReason] = useState('general')
  const [yearsOfService, setYearsOfService] = useState('')
  const [separationAge, setSeparationAge] = useState('')
  const [separationYear, setSeparationYear] = useState('')
  const [exceptionType, setExceptionType] = useState('none')

  const calculate = () => {
    const withdrawal = parseFloat(withdrawalAmount) || 50000
    const account = accountType
    const age = parseInt(currentAge) || 45
    const exception = exceptionType
    const yrsService = parseInt(yearsOfService) || 20
    const sepAge = parseInt(separationAge) || 55
    const sepYear = parseInt(separationYear) || 2020
    const reasonCode = reason

    // Standard early withdrawal penalty: 10% before age 59.5
    const penaltyAgeThreshold = 59.5
    const penaltyRate = 0.10

    // Check exceptions
    let penaltyApplies = age < penaltyAgeThreshold
    let penaltyAmount = 0
    let exceptionName = 'None'

    // Exception 1: Rule of 55 (401k only, separate after age 55)
    if (account === '401k' && sepAge >= 55 && exception === 'rule_of_55') {
      penaltyApplies = false
      exceptionName = 'Rule of 55'
    }

    // Exception 2: First-time home purchase (IRA only, up to $10K)
    if (account === 'ira' && exception === 'first_home' && withdrawal <= 10000) {
      penaltyApplies = false
      exceptionName = 'First-time home buyer ($10K limit)'
    }

    // Exception 3: Medical expenses exceeding 7.5% AGI
    if (exception === 'medical') {
      penaltyApplies = false
      exceptionName = 'Medical expenses > 7.5% AGI'
    }

    // Exception 4: Disability
    if (exception === 'disability') {
      penaltyApplies = false
      exceptionName = 'Total and permanent disability'
    }

    // Exception 5: Death (beneficiary)
    if (exception === 'death') {
      penaltyApplies = false
      exceptionName = 'Death of account owner (beneficiary)'
    }

    // Exception 6: Education expenses (IRA only)
    if (account === 'ira' && exception === 'education') {
      penaltyApplies = false
      exceptionName = 'Qualified education expenses'
    }

    // Exception 7: Substantially equal periodic payments (72t)
    if (exception === '72t') {
      penaltyApplies = false
      exceptionName = '72(t) substantially equal payments'
    }

    // Exception 8: Birth/adoption (up to $5K per parent)
    if (exception === 'birth_adoption' && withdrawal <= 5000) {
      penaltyApplies = false
      exceptionName = 'Birth or adoption ($5K limit)'
    }

    // Exception 9: Military reservist called to active duty
    if (exception === 'military') {
      penaltyApplies = false
      exceptionName = 'Military reservist active duty'
    }

    // Exception 10: IRS levy
    if (exception === 'levy') {
      penaltyApplies = false
      exceptionName = 'IRS levy on account'
    }

    // Calculate penalty if no exception
    if (penaltyApplies) {
      penaltyAmount = withdrawal * penaltyRate
    }

    // Federal income tax (assume 22% bracket)
    const federalTaxRate = 0.22
    const federalTax = withdrawal * federalTaxRate

    // State income tax (assume 5% average)
    const stateTaxRate = 0.05
    const stateTax = withdrawal * stateTaxRate

    // Total tax and penalty
    const totalTaxPenalty = federalTax + stateTax + penaltyAmount

    // Net proceeds
    const netProceeds = withdrawal - totalTaxPenalty

    // Effective tax rate (including penalty)
    const effectiveRate = (totalTaxPenalty / withdrawal) * 100

    // Compare to waiting until 59.5
    const yearsTo59_5 = Math.ceil(59.5 - age)
    const waitFederalTax = withdrawal * federalTaxRate
    const waitStateTax = withdrawal * stateTaxRate
    const waitTotalTax = waitFederalTax + waitStateTax
    const waitNetProceeds = withdrawal - waitTotalTax
    const savingsIfWait = waitNetProceeds - netProceeds

    // Rule of 55 eligibility check
    const ruleOf55Eligible = account === '401k' && sepAge >= 55 && sepYear >= 2020

    // IRA vs 401k differences
    const iraFirstHomeLimit = 10000
    const iraEducationEligible = account === 'ira'

    return {
      withdrawalAmount: withdrawal.toFixed(2),
      accountType: account,
      currentAge: age,
      penaltyApplies,
      penaltyAmount: penaltyAmount.toFixed(2),
      penaltyRate: '10%',
      exceptionType: exception,
      exceptionName,
      federalTax: federalTax.toFixed(2),
      federalRate: '22%',
      stateTax: stateTax.toFixed(2),
      stateRate: '5%',
      totalTaxPenalty: totalTaxPenalty.toFixed(2),
      netProceeds: netProceeds.toFixed(2),
      effectiveRate: effectiveRate.toFixed(1),
      yearsTo59_5: Math.max(0, yearsTo59_5),
      waitTotalTax: waitTotalTax.toFixed(2),
      waitNetProceeds: waitNetProceeds.toFixed(2),
      savingsIfWait: savingsIfWait.toFixed(2),
      ruleOf55Eligible,
      yearsOfService: yrsService,
      separationAge: sepAge,
      iraFirstHomeLimit,
      iraEducationEligible,
      under59_5: age < 59.5
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Early Retirement Withdrawal Penalty Calculator</h1>
      <p className="text-zinc-600">Calculate 10% early withdrawal penalty for 401(k) and IRA before age 59.5, plus applicable exceptions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Withdrawal Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="401k">401(k) / 403(b) / 457</option>
              <option value="ira">Traditional IRA / SEP-IRA / SIMPLE IRA</option>
              <option value="roth">Roth IRA (special rules)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Withdrawal Amount</label>
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter amount to withdraw"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Exception Type (if applicable)</label>
            <select
              value={exceptionType}
              onChange={(e) => setExceptionType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="none">No Exception (10% penalty applies)</option>
              <option value="rule_of_55">Rule of 55 (401k only, left job after 55)</option>
              <option value="first_home">First-time Home Buyer (IRA, $10K limit)</option>
              <option value="medical">Medical Expenses over 7.5% AGI</option>
              <option value="disability">Total and Permanent Disability</option>
              <option value="education">Qualified Education (IRA only)</option>
              <option value="birth_adoption">Birth or Adoption ($5K limit)</option>
              <option value="72t">72(t) Substantially Equal Payments</option>
              <option value="military">Military Reservist Active Duty</option>
              <option value="levy">IRS Levy on Account</option>
              <option value="death">Death of Account Owner (beneficiary)</option>
            </select>
          </div>
          {accountType === '401k' && exceptionType === 'rule_of_55' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Age at Job Separation</label>
                <input
                  type="number"
                  value={separationAge}
                  onChange={(e) => setSeparationAge(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Age when left employer"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Separation Year</label>
                <input
                  type="number"
                  value={separationYear}
                  onChange={(e) => setSeparationYear(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Year left employer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax & Penalty Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Withdrawal Amount</span>
            <span className="font-bold">$${result.withdrawalAmount}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Your Age</span>
            <span className="font-bold">{result.currentAge}</span>
          </div>
          <div className={`rounded p-3 flex justify-between ${result.under59_5 && result.penaltyApplies ? 'bg-red-50' : 'bg-green-50'}`}>
            <span className="text-zinc-600">Under 59.5</span>
            <span className={`font-bold ${result.under59_5 ? 'text-red-600' : 'text-green-600'}`}>
              {result.under59_5 ? 'Yes (Penalty Risk)' : 'No (No Penalty)'}
            </span>
          </div>
          {result.penaltyApplies && (
            <div className="bg-red-100 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Early Withdrawal Penalty (10%)</span>
              <span className="font-bold text-red-600">$${result.penaltyAmount}</span>
            </div>
          )}
          {!result.penaltyApplies && result.exceptionType !== 'none' && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Exception Applied</span>
              <span className="font-bold text-green-600">{result.exceptionName}</span>
            </div>
          )}
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Federal Income Tax (22%)</span>
            <span className="font-bold text-red-600">$${result.federalTax}</span>
          </div>
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Income Tax (5%)</span>
            <span className="font-bold text-red-600">$${result.stateTax}</span>
          </div>
          <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
            <span className="font-medium">Total Tax & Penalty</span>
            <span className="font-bold text-red-600">$${result.totalTaxPenalty}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Net Proceeds</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Amount Withdrawn</div>
            <div className="text-2xl font-bold">$${result.withdrawalAmount}</div>
          </div>
          <div className="bg-green-50 rounded p-4">
            <div className="text-sm text-zinc-500">Net After Tax/Penalty</div>
            <div className="text-2xl font-bold text-green-600">$${result.netProceeds}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective Tax Rate</div>
            <div className="text-2xl font-bold">{result.effectiveRate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Years to 59.5</div>
            <div className="text-2xl font-bold">{result.yearsTo59_5}</div>
          </div>
        </div>
      </div>

      {result.penaltyApplies && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">10% Penalty Applies</h3>
          <div className="text-sm text-red-600">
            Withdrawal before age 59.5 incurs $${result.penaltyAmount} penalty. Plus income tax: $${result.totalTaxPenalty} total. Net proceeds: $${result.netProceeds}. Effective rate: {result.effectiveRate}%. Consider waiting {result.yearsTo59_5} years to avoid penalty.
          </div>
        </div>
      )}

      {!result.penaltyApplies && result.exceptionType !== 'none' && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Exception Applied - No Penalty</h3>
          <div className="text-sm text-green-600">
            {result.exceptionName} exception eliminates 10% penalty. You still owe income tax ($${result.federalTax} federal + $${result.stateTax} state). Net proceeds: $${result.netProceeds}. Verify exception eligibility with tax advisor.
          </div>
        </div>
      )}

      {!result.under59_5 && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">No Penalty - Over Age 59.5</h3>
          <div className="text-sm text-green-600">
            Withdrawals after age 59.5 have no early withdrawal penalty. Only income tax applies. Net proceeds: $${result.netProceeds}. Consider tax-efficient withdrawal strategies to minimize taxes.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Wait vs Withdraw Now Comparison</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Withdraw Now</strong>
            <div className="text-zinc-500">Total cost: $${result.totalTaxPenalty}</div>
            <div className="text-zinc-500">Net: $${result.netProceeds}</div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <strong>Wait Until 59.5</strong>
            <div className="text-zinc-500">Total cost: $${result.waitTotalTax}</div>
            <div className="text-zinc-500">Net: $${result.waitNetProceeds}</div>
          </div>
        </div>
        {result.yearsTo59_5 > 0 && (
          <div className="text-xs text-green-600 mt-2">
            Waiting {result.yearsTo59_5} years saves $${result.savingsIfWait} by avoiding penalty.
          </div>
        )}
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exception Summary</h3>
        <div className="text-xs text-zinc-600">
          <div className="mb-2"><strong>401(k) exceptions:</strong> Rule of 55 (left job after 55), disability, death, IRS levy, military reservist.</div>
          <div className="mb-2"><strong>IRA exceptions:</strong> First home ($10K), education, medical over 7.5% AGI, disability, death, birth/adoption ($5K), health insurance (unemployed), 72(t) payments.</div>
          <div className="mb-2"><strong>Roth IRA:</strong> Contributions withdrawable anytime tax-free. Earnings penalty-free after 59.5 and 5-year rule. Exceptions apply to earnings too.</div>
          <div>Document exception eligibility carefully. IRS may challenge improper exception claims.</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rule of 55 Details</h3>
        <div className="text-xs text-zinc-600">
          401(k) only: Withdraw penalty-free if left employer during or after calendar year you turned 55. Applies only to that employer's 401(k). Must keep money in that 401(k) (not roll to IRA). Age 50 for public safety employees. Not available for IRA. Check plan rules with employer.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Alternatives to Early Withdrawal</h3>
        <div className="text-xs text-zinc-600">
          401(k) loan: Up to $50K or 50% of balance, no penalty, interest paid to yourself. Roth contributions: Tax-free anytime. Home equity: No retirement impact. 72(t) payments: Penalty-free if structured correctly. Side income: Avoid touching retirement. Emergency fund: Build before tapping retirement.
        </div>
      </div>
    </main>
  )
}