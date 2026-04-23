'use client'

import { useState } from 'react'

export default function RothIRAContributionCalculator() {
  const [age, setAge] = useState('35')
  const [income, setIncome] = useState('80000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [currentContributions, setCurrentContributions] = useState('0')
  const [otherRetirementContributions, setOtherRetirementContributions] = useState('0')
  const [taxYear, setTaxYear] = useState('2024')
  const [plannedContribution, setPlannedContribution] = useState('7000')

  const contributionLimits: Record<string, { base: number; catchUp: number; catchUpAge: number }> = {
    '2024': { base: 7000, catchUp: 1000, catchUpAge: 50 },
    '2025': { base: 7000, catchUp: 1000, catchUpAge: 50 },
  }

  const incomeLimits: Record<string, Record<string, { phaseOutStart: number; phaseOutEnd: number }>> = {
    '2024': {
      single: { phaseOutStart: 146000, phaseOutEnd: 161000 },
      married: { phaseOutStart: 230000, phaseOutEnd: 240000 },
      marriedSeparate: { phaseOutStart: 0, phaseOutEnd: 10000 },
    },
    '2025': {
      single: { phaseOutStart: 150000, phaseOutEnd: 165000 },
      married: { phaseOutStart: 236000, phaseOutEnd: 246000 },
      marriedSeparate: { phaseOutStart: 0, phaseOutEnd: 10000 },
    },
  }

  const calculate = () => {
    const userAge = parseInt(age) || 0
    const magi = parseFloat(income) || 0 // Modified AGI
    const current = parseFloat(currentContributions) || 0
    const otherContributions = parseFloat(otherRetirementContributions) || 0
    const planned = parseFloat(plannedContribution) || 0
    const year = taxYear

    // Contribution limits
    const limits = contributionLimits[year]
    const baseLimit = limits.base
    const catchUpLimit = userAge >= limits.catchUpAge ? limits.catchUp : 0
    const totalLimit = baseLimit + catchUpLimit

    // Income limits (phase-out range)
    const filingKey = filingStatus === 'marriedSeparate' ? 'marriedSeparate' : filingStatus
    const incomeRange = incomeLimits[year][filingKey]
    const phaseOutStart = incomeRange.phaseOutStart
    const phaseOutEnd = incomeRange.phaseOutEnd

    // Calculate allowed contribution based on income
    let allowedContribution = totalLimit
    let phaseOutPercentage = 0
    let incomeEligibility = 'Full contribution allowed'

    if (magi >= phaseOutEnd) {
      allowedContribution = 0
      phaseOutPercentage = 100
      incomeEligibility = 'Income too high - No Roth IRA contribution allowed'
    } else if (magi > phaseOutStart) {
      // Phase-out calculation
      phaseOutPercentage = ((magi - phaseOutStart) / (phaseOutEnd - phaseOutStart)) * 100
      const reduction = totalLimit * (phaseOutPercentage / 100)
      allowedContribution = Math.max(0, totalLimit - reduction)
      // Round down to nearest $10 (IRS rule for phase-out calculations)
      allowedContribution = Math.floor(allowedContribution / 10) * 10
      incomeEligibility = `Partial contribution allowed (phase-out: ${phaseOutPercentage.toFixed(0)}%)`
    } else if (magi < phaseOutStart) {
      incomeEligibility = 'Full contribution allowed (below phase-out)'
    }

    // Remaining contribution room
    const remainingRoom = Math.max(0, allowedContribution - current)

    // Excess contribution check
    const excess = Math.max(0, planned - allowedContribution)

    // Combined IRA limit (Traditional + Roth)
    const combinedLimit = totalLimit // Same limit for both
    const remainingCombinedRoom = Math.max(0, combinedLimit - current - otherContributions)

    // Growth projection (assume 7% annual return over various periods)
    const growthRates = { '10': 0.07, '20': 0.07, '30': 0.07 }
    const projectedGrowth: Record<string, string> = {}
    for (const [years, rate] of Object.entries(growthRates)) {
      const futureValue = allowedContribution * Math.pow(1 + rate, parseInt(years))
      projectedGrowth[years] = futureValue.toFixed(0)
    }

    // Tax benefit analysis
    // Roth contributions are after-tax, but withdrawals are tax-free
    const marginalRate = 22 // Approximate
    const taxCostNow = allowedContribution * (marginalRate / 100)
    const futureTaxSavings = parseFloat(projectedGrowth['30']) * (marginalRate / 100)

    // Catch-up contribution reminder
    const catchUpReminder = userAge >= 50 ? `Extra $${catchUpLimit} catch-up contribution available` : 'Catch-up contribution available at age 50+'

    return {
      age: userAge.toFixed(0),
      income: magi.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : filingStatus === 'married' ? 'Married Filing Jointly' : 'Married Filing Separately',
      taxYear: year,
      baseLimit: baseLimit.toLocaleString(),
      catchUpLimit: catchUpLimit.toLocaleString(),
      catchUpAvailable: userAge >= limits.catchUpAge,
      totalLimit: totalLimit.toLocaleString(),
      phaseOutStart: phaseOutStart.toLocaleString(),
      phaseOutEnd: phaseOutEnd.toLocaleString(),
      phaseOutPercentage: phaseOutPercentage.toFixed(0),
      allowedContribution: allowedContribution.toLocaleString(),
      incomeEligibility,
      currentContributions: current.toFixed(2),
      remainingRoom: remainingRoom.toLocaleString(),
      plannedContribution: planned.toFixed(2),
      excess: excess.toFixed(2),
      hasExcess: excess > 0,
      otherRetirementContributions: otherContributions.toFixed(2),
      combinedLimit: combinedLimit.toLocaleString(),
      remainingCombinedRoom: remainingCombinedRoom.toLocaleString(),
      projected10Year: projectedGrowth['10'],
      projected20Year: projectedGrowth['20'],
      projected30Year: projectedGrowth['30'],
      taxCostNow: taxCostNow.toFixed(2),
      futureTaxSavings: futureTaxSavings.toFixed(2),
      catchUpReminder,
      marginalRate,
      isEligible: allowedContribution > 0,
      isFullyEligible: phaseOutPercentage === 0,
      isPartiallyEligible: phaseOutPercentage > 0 && phaseOutPercentage < 100,
      isNotEligible: phaseOutPercentage >= 100,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Roth IRA Contribution Calculator</h1>
      <p className="text-zinc-600">Calculate your Roth IRA contribution limits and eligibility. Understand income phase-out rules, catch-up contributions, and combined Traditional/Roth IRA limits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Catch-up contribution ($1,000 extra) available at age 50+.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="marriedSeparate">Married Filing Separately</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Modified AGI ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Modified Adjusted Gross Income. Includes wages, dividends, interest, etc.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="input"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Contribution Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Roth IRA Contributions ($)</label>
            <input
              type="number"
              value={currentContributions}
              onChange={(e) => setCurrentContributions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Amount already contributed this year.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Traditional IRA Contributions ($)</label>
            <input
              type="number"
              value={otherRetirementContributions}
              onChange={(e) => setOtherRetirementContributions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Traditional + Roth share the same annual limit.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Planned Roth Contribution ($)</label>
            <input
              type="number"
              value={plannedContribution}
              onChange={(e) => setPlannedContribution(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className={`card ${result.isNotEligible ? 'bg-red-50 border border-red-200' : result.isPartiallyEligible ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isNotEligible ? 'text-red-700' : result.isPartiallyEligible ? 'text-yellow-700' : 'text-green-700'}`}>
          Eligibility Status
        </h3>
        <div className={`text-lg font-bold ${result.isNotEligible ? 'text-red-800' : result.isPartiallyEligible ? 'text-yellow-800' : 'text-green-800'}`}>
          {result.incomeEligibility}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Phase-Out Start:</span>
            <span className="font-medium ml-2">${result.phaseOutStart}</span>
          </div>
          <div>
            <span className="text-zinc-600">Phase-Out End:</span>
            <span className="font-medium ml-2">${result.phaseOutEnd}</span>
          </div>
          {result.isPartiallyEligible && (
            <div>
              <span className="text-zinc-600">Phase-Out %:</span>
              <span className="font-bold ml-2">{result.phaseOutPercentage}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Contribution Limits ({result.taxYear})</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Base Limit:</span>
            <span className="font-medium ml-2">${result.baseLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Catch-Up (50+):</span>
            <span className="font-medium ml-2">${result.catchUpLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Your Max:</span>
            <span className="font-bold ml-2">${result.totalLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Allowed:</span>
            <span className={`font-bold ml-2 ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>${result.allowedContribution}</span>
          </div>
        </div>
        {result.catchUpAvailable && (
          <div className="text-xs text-blue-600 mt-2">
            {result.catchUpReminder}
          </div>
        )}
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Remaining Contribution Room</h3>
        <div className="text-xl font-bold text-purple-800">${result.remainingRoom}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Current Contributions:</span>
            <span className="font-medium ml-2">${result.currentContributions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Traditional IRA:</span>
            <span className="font-medium ml-2">${result.otherRetirementContributions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Combined IRA Limit:</span>
            <span className="font-medium ml-2">${result.combinedLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Combined Room:</span>
            <span className="font-bold ml-2">${result.remainingCombinedRoom}</span>
          </div>
        </div>
      </div>

      {result.hasExcess && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Excess Contribution Warning</h3>
          <div className="text-sm text-red-600">
            Your planned contribution of ${result.plannedContribution} exceeds your allowed ${result.allowedContribution}.
          </div>
          <div className="text-xl font-bold text-red-800 mt-2">Excess: ${result.excess}</div>
          <div className="text-xs text-red-600 mt-2">
            Excess contributions incur 6% penalty tax each year until corrected. Withdraw excess before tax deadline.
          </div>
        </div>
      )}

      {result.isEligible && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Projected Growth (7% Annual Return)</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">10 Years:</span>
              <span className="font-bold ml-2">${result.projected10Year}</span>
            </div>
            <div>
              <span className="text-zinc-600">20 Years:</span>
              <span className="font-bold ml-2">${result.projected20Year}</span>
            </div>
            <div>
              <span className="text-zinc-600">30 Years:</span>
              <span className="font-bold ml-2">${result.projected30Year}</span>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-2">
            Roth IRA grows tax-free. All withdrawals in retirement are tax-free (after age 59½ and 5-year rule).
          </div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Roth IRA Tax Benefit Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Tax Cost Now (~{result.marginalRate}%):</span>
            <span className="font-medium ml-2">${result.taxCostNow}</span>
          </div>
          <div>
            <span className="text-zinc-600">Future Tax Savings:</span>
            <span className="font-bold ml-2">${result.futureTaxSavings}</span>
          </div>
        </div>
        <div className="text-xs text-teal-600 mt-2">
          Pay taxes now on contributions, but withdrawals are 100% tax-free in retirement. Best if tax rate will be higher later.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Roth IRA Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Income Limits:</strong> Phase-out range for 2024: $146K-$161K (single), $230K-$240K (married). 2025: $150K-$165K (single), $236K-$246K (married).</li>
          <li><strong>Contribution Limit:</strong> $7,000 base + $1,000 catch-up (age 50+) for 2024-2025.</li>
          <li><strong>Combined Limit:</strong> Traditional + Roth IRA contributions share same annual limit.</li>
          <li><strong>No Age Limit:</strong> Can contribute at any age as long as you have earned income.</li>
          <li><strong>Withdrawal Rules:</strong> Tax-free after age 59½ AND account open 5+ years. Contributions can be withdrawn anytime tax-free.</li>
          <li><strong>Phase-Out Calculation:</strong> Contribution reduces linearly through phase-out range. IRS requires rounding down to nearest $10.</li>
          <li><strong>Excess Penalty:</strong> 6% excise tax per year on excess contributions. Correct by withdrawing before tax deadline.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Roth IRA vs Traditional IRA</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Roth IRA:</strong> No income deduction. Tax-free growth. Tax-free withdrawals. No RMDs. Best if expect higher taxes in retirement.</li>
          <li><strong>Traditional IRA:</strong> May deduct contributions (income limits apply). Tax-deferred growth. Taxed withdrawals. RMDs at 73. Best if expect lower taxes in retirement.</li>
          <li><strong>Backdoor Roth:</strong> If income too high for direct Roth, contribute to Traditional (non-deductible) then convert to Roth. Watch for pro-rata rule if you have other Traditional IRAs.</li>
          <li><strong>Earned Income Required:</strong> Both require earned income (wages, self-employment). Cannot contribute more than earned income.</li>
        </ul>
      </div>
    </main>
  )
}