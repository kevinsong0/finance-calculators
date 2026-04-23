'use client'

import { useState } from 'react'

export default function IRAMaximizerCalculator() {
  const [annualIncome, setAnnualIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [age, setAge] = useState(45)
  const [has401k, setHas401k] = useState(true)
  const [four01kContribution, setFour01kContribution] = useState(23000)
  const [employerMatch, setEmployerMatch] = useState(5000)
  const [rothOrTraditional, setRothOrTraditional] = useState<'roth' | 'traditional' | 'both'>('traditional')
  const [iraContribution, setIraContribution] = useState(7000)
  const [otherRetirement, setOtherRetirement] = useState(0)

  const calculate = () => {
    // 2024 IRA limits
    const standardIRALimit = 7000
    const catchUpIRALimit = 8000
    const catchUpAge = 50

    const iraLimit = age >= catchUpAge ? catchUpIRALimit : standardIRALimit

    // 401(k) limits
    const standardFour01kLimit = 23000
    const catchUpFour01kLimit = 30500
    const four01kLimit = age >= catchUpAge ? catchUpFour01kLimit : standardFour01kLimit

    // Total retirement contribution capacity
    const totalCapacity = iraLimit + four01kLimit + employerMatch

    // Current contributions
    const currentFour01k = Math.min(four01kContribution, four01kLimit)
    const currentIRA = Math.min(iraContribution, iraLimit)
    const currentTotal = currentFour01k + currentIRA + employerMatch

    // Unused capacity
    const unusedFour01k = four01kLimit - currentFour01k
    const unusedIRA = iraLimit - currentIRA
    const unusedTotal = totalCapacity - currentTotal

    // Roth IRA income limits
    const rothIncomeLimitFull = filingStatus === 'married' ? 230000 : 161000
    const rothIncomeLimitPhaseoutEnd = filingStatus === 'married' ? 240000 : 176000

    const rothEligible = annualIncome < rothIncomeLimitPhaseoutEnd
    const rothFullEligible = annualIncome < rothIncomeLimitFull

    // Traditional IRA deduction limits (if covered by employer plan)
    const tradDeductionPhaseoutStart = filingStatus === 'married' ? 123000 : 77000
    const tradDeductionPhaseoutEnd = filingStatus === 'married' ? 143000 : 87000

    const tradDeductible = has401k ? annualIncome < tradDeductionPhaseoutEnd : true
    const tradFullDeductible = has401k ? annualIncome < tradDeductionPhaseoutStart : true

    // Tax benefit estimation
    const marginalRate = 0.24
    const traditionalTaxSavings = currentIRA * marginalRate
    const four01kTaxSavings = currentFour01k * marginalRate

    // Roth vs Traditional decision factors
    const rothBenefit = 'Tax-free growth, no RMDs, tax-free withdrawals'
    const tradBenefit = `Immediate tax savings: $${traditionalTaxSavings.toFixed(0)}`

    // Optimal strategy recommendation
    let recommendation = ''
    if (rothEligible && annualIncome < 100000) {
      recommendation = 'Consider Roth for tax-free growth. Low current rate, Roth provides flexibility.'
    } else if (tradDeductible && marginalRate > 0.25) {
      recommendation = 'Traditional deduction valuable at high marginal rate. Consider Roth conversion ladder in retirement.'
    } else if (!rothEligible && !tradDeductible) {
      recommendation = 'Consider backdoor Roth IRA: contribute non-deductible Traditional, convert to Roth.'
    } else {
      recommendation = 'Split between Roth and Traditional for diversification and flexibility.'
    }

    // Spousal IRA check
    const spousalIRACapacity = filingStatus === 'married' ? iraLimit * 2 : iraLimit

    return {
      annualIncome: annualIncome.toFixed(0),
      filingStatus,
      age: age.toFixed(0),
      iraLimit: iraLimit.toFixed(0),
      four01kLimit: four01kLimit.toFixed(0),
      catchUpEligible: age >= catchUpAge,
      currentIRA: currentIRA.toFixed(0),
      currentFour01k: currentFour01k.toFixed(0),
      employerMatch: employerMatch.toFixed(0),
      currentTotal: currentTotal.toFixed(0),
      totalCapacity: totalCapacity.toFixed(0),
      unusedFour01k: unusedFour01k.toFixed(0),
      unusedIRA: unusedIRA.toFixed(0),
      unusedTotal: unusedTotal.toFixed(0),
      rothEligible,
      rothFullEligible,
      tradDeductible,
      tradFullDeductible,
      traditionalTaxSavings: traditionalTaxSavings.toFixed(0),
      four01kTaxSavings: four01kTaxSavings.toFixed(0),
      totalTaxSavings: (traditionalTaxSavings + four01kTaxSavings).toFixed(0),
      recommendation,
      spousalIRACapacity: spousalIRACapacity.toFixed(0),
      has401k,
      rothIncomeLimitFull: rothIncomeLimitFull.toFixed(0),
      rothIncomeLimitPhaseoutEnd: rothIncomeLimitPhaseoutEnd.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRA Maximizer Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize IRA contributions within retirement savings strategy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">IRA Contribution ($)</label>
          <input
            type="number"
            value={iraContribution}
            onChange={(e) => setIraContribution(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={has401k}
            onChange={(e) => setHas401k(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Have 401(k) at Work</label>
        </div>
        {has401k && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">401(k) Contribution ($)</label>
              <input
                type="number"
                value={four01kContribution}
                onChange={(e) => setFour01kContribution(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Employer Match ($)</label>
              <input
                type="number"
                value={employerMatch}
                onChange={(e) => setEmployerMatch(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Contribution Limits (2024)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">IRA Limit:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.iraLimit}</span>
          </div>
          {result.catchUpEligible && (
            <div>
              <span className="text-zinc-600">Catch-Up:</span>
              <span className="font-bold text-green-700 ml-2">Eligible (50+)</span>
            </div>
          )}
          {has401k && (
            <>
              <div>
                <span className="text-zinc-600">401(k) Limit:</span>
                <span className="font-bold ml-2">$ {result.four01kLimit}</span>
              </div>
              <div>
                <span className="text-zinc-600">Total Capacity:</span>
                <span className="font-bold text-blue-700 ml-2">$ {result.totalCapacity}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Current Contributions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">IRA:</span>
            <span className="font-bold ml-2">$ {result.currentIRA}</span>
          </div>
          {has401k && (
            <>
              <div>
                <span className="text-zinc-600">401(k):</span>
                <span className="font-bold ml-2">$ {result.currentFour01k}</span>
              </div>
              <div>
                <span className="text-zinc-600">Employer Match:</span>
                <span className="font-bold text-green-700 ml-2">$ {result.employerMatch}</span>
              </div>
              <div>
                <span className="text-zinc-600">Total:</span>
                <span className="font-bold text-green-700 ml-2">$ {result.currentTotal}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Unused Capacity</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">IRA Unused:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.unusedIRA) > 0 ? 'text-orange-700' : 'text-green-600'}`}>
              $ {result.unusedIRA}
            </span>
          </div>
          {has401k && (
            <>
              <div>
                <span className="text-zinc-600">401(k) Unused:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.unusedFour01k) > 0 ? 'text-orange-700' : 'text-green-600'}`}>
                  $ {result.unusedFour01k}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Total Unused:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.unusedTotal) > 0 ? 'text-orange-700' : 'text-green-600'}`}>
                  $ {result.unusedTotal}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Roth IRA Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Income Limit:</span>
            <span className="font-medium ml-2">$ {result.rothIncomeLimitFull}</span>
          </div>
          <div>
            <span className="text-zinc-600">Phaseout End:</span>
            <span className="font-medium ml-2">$ {result.rothIncomeLimitPhaseoutEnd}</span>
          </div>
          <div>
            <span className="text-zinc-600">Roth Eligible:</span>
            <span className={`font-bold ml-2 ${result.rothEligible ? 'text-green-600' : 'text-red-600'}`}>
              {result.rothEligible ? (result.rothFullEligible ? 'Full' : 'Partial') : 'No'}
            </span>
          </div>
        </div>
      </div>

      {has401k && (
        <div className="card bg-yellow-50 border border-yellow-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Traditional IRA Deduction</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Deductible:</span>
              <span className={`font-bold ml-2 ${result.tradDeductible ? 'text-green-600' : 'text-red-600'}`}>
                {result.tradDeductible ? (result.tradFullDeductible ? 'Full' : 'Partial') : 'No'}
              </span>
            </div>
            <div>
              <span className="text-zinc-600">Tax Savings:</span>
              <span className="font-bold text-green-700 ml-2">$ {result.totalTaxSavings}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            Covered by employer plan: deduction phaseout {filingStatus === 'married' ? '$123K-$143K' : '$77K-$87K'}.
          </div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy Recommendation</h2>
        <div className="text-sm text-teal-700">{result.recommendation}</div>
      </div>

      {filingStatus === 'married' && (
        <div className="card bg-indigo-50 border border-indigo-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Spousal IRA Capacity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Couple IRA Limit:</span>
              <span className="font-bold text-indigo-700 ml-2">$ {result.spousalIRACapacity}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            Each spouse can contribute up to $7,000 ($8,000 if 50+) if combined earned income covers contributions.
          </div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">IRA Maximization Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Contribute maximum each year ($7,000 or $8,000 if 50+)</li>
          <li>Maximize 401(k) first (especially employer match)</li>
          <li>IRA provides additional $7,000 tax-advantaged space</li>
          <li>Spousal IRA: doubles couple's retirement capacity</li>
          <li>Consider Roth for flexibility, Traditional for deduction</li>
          <li>Backdoor Roth if income exceeds Roth limits</li>
        </ul>
      </div>
    </div>
  )
}