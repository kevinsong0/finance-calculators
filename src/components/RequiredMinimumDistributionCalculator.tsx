'use client'

import { useState } from 'react'

export default function RequiredMinimumDistributionCalculator() {
  const [accountBalance, setAccountBalance] = useState('')
  const [currentAge, setCurrentAge] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [accountType, setAccountType] = useState('traditional_ira')
  const [spouseAge, setSpouseAge] = useState('')
  const [spouseIsSoleBeneficiary, setSpouseIsSoleBeneficiary] = useState(false)

  const calculate = () => {
    const balance = parseFloat(accountBalance) || 500000
    const age = parseInt(currentAge) || 73
    const year = parseInt(birthYear) || 1950
    const spouseAgeNum = parseInt(spouseAge) || 0
    const isSpouseBeneficiary = spouseIsSoleBeneficiary && spouseAgeNum > 0

    // SECURE Act 2.0 RMD Age Schedule
    // Born 1950-1959: RMD starts at 73
    // Born 1960 or later: RMD starts at 75
    // Born before 1950: RMD started at 72 (already in effect)

    let rmdStartAge = 73
    if (year >= 1960) {
      rmdStartAge = 75
    } else if (year < 1950) {
      rmdStartAge = 72
    }

    // IRS Uniform Lifetime Table factors (2022 updated)
    const uniformFactors: Record<number, number> = {
      72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7,
      77: 22.8, 78: 21.8, 79: 20.9, 80: 20.0, 81: 19.1,
      82: 18.2, 83: 17.3, 84: 16.4, 85: 15.5, 86: 14.6,
      87: 13.7, 88: 12.8, 89: 11.9, 90: 10.8, 91: 10.1,
      92: 9.4, 93: 8.7, 94: 8.1, 95: 7.5, 96: 6.9,
      97: 6.4, 98: 5.9, 99: 5.5, 100: 5.1, 101: 4.8,
      102: 4.5, 103: 4.2, 104: 3.9, 105: 3.7, 106: 3.5,
      107: 3.3, 108: 3.1, 109: 2.9, 110: 2.8, 111: 2.6,
      112: 2.5, 113: 2.3, 114: 2.2, 115: 2.1, 116: 2.0,
      117: 1.9, 118: 1.8, 119: 1.7
    }

    // Joint life expectancy table (spouse more than 10 years younger)
    const jointFactors: Record<string, number> = {
      '73-50': 31.1, '73-55': 28.7, '73-60': 26.3, '73-65': 24.1,
      '74-50': 30.2, '74-55': 27.8, '74-60': 25.6, '74-65': 23.4,
      '75-50': 29.4, '75-55': 27.1, '75-60': 24.9, '75-65': 22.8,
      '76-50': 28.5, '76-55': 26.2, '76-60': 24.1, '76-65': 22.1,
      '77-50': 27.6, '77-55': 25.4, '77-60': 23.3, '77-65': 21.3,
      '78-50': 26.7, '78-55': 24.5, '78-60': 22.5, '78-65': 20.6,
      '79-50': 25.8, '79-55': 23.7, '79-60': 21.7, '79-65': 19.8
    }

    // Determine distribution period factor
    let factor = uniformFactors[age] || 6.0

    // If spouse is sole beneficiary and more than 10 years younger
    if (isSpouseBeneficiary && (age - spouseAgeNum) > 10) {
      const jointKey = `${age}-${spouseAgeNum}`
      factor = jointFactors[jointKey] || factor
    }

    // Calculate RMD
    const rmd = balance / factor

    // Calculate RMDs for next 5 years
    const futureRMDs = []
    let currentBalance = balance
    for (let i = 0; i < 5; i++) {
      const futureAge = age + i
      const futureFactor = uniformFactors[futureAge] || Math.max(6, factor - i)
      const futureRmd = currentBalance / futureFactor
      futureRMDs.push({
        age: futureAge,
        factor: futureFactor,
        rmd: futureRmd.toFixed(2),
        remaining: (currentBalance - futureRmd).toFixed(2)
      })
      currentBalance -= futureRmd
    }

    // Penalty for missed RMD (25% of missed amount, reduced to 10% if corrected timely)
    const missedPenaltyRate = 0.25
    const correctedPenaltyRate = 0.10
    const missedPenalty = rmd * missedPenaltyRate
    const correctedPenalty = rmd * correctedPenaltyRate

    // Tax impact (assume 22% marginal rate)
    const taxRate = 0.22
    const taxOnRmd = rmd * taxRate
    const netAfterTax = rmd - taxOnRmd

    return {
      accountBalance: balance.toFixed(2),
      currentAge: age,
      distributionFactor: factor,
      rmd: rmd.toFixed(2),
      rmdStartAge,
      birthYear: year,
      accountType,
      isSpouseBeneficiary,
      spouseAge: spouseAgeNum,
      missedPenalty: missedPenalty.toFixed(2),
      correctedPenalty: correctedPenalty.toFixed(2),
      taxOnRmd: taxOnRmd.toFixed(2),
      netAfterTax: netAfterTax.toFixed(2),
      futureRMDs,
      mustTakeRmd: age >= rmdStartAge,
      penaltyRate: '25%',
      correctedPenaltyRate: '10%'
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Required Minimum Distribution Calculator</h1>
      <p className="text-zinc-600">Calculate IRS RMD for retirement accounts based on SECURE Act 2.0 rules and age factors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Account Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Account Balance (Dec 31 prior year)</label>
            <input
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter account balance"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="traditional_ira">Traditional IRA</option>
              <option value="sep_ira">SEP-IRA</option>
              <option value="simple_ira">SIMPLE IRA</option>
              <option value="401k">401(k) (retired)</option>
              <option value="403b">403(b)</option>
              <option value="inherited_ira">Inherited IRA</option>
            </select>
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
            <label className="block text-sm text-zinc-600 mb-1">Birth Year</label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter birth year"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Determines RMD start age under SECURE Act 2.0
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Spouse Beneficiary Options</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={spouseIsSoleBeneficiary}
                onChange={(e) => setSpouseIsSoleBeneficiary(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Spouse is sole beneficiary</span>
            </label>
            {spouseIsSoleBeneficiary && (
              <input
                type="number"
                value={spouseAge}
                onChange={(e) => setSpouseAge(e.target.value)}
                className="w-full p-2 border rounded mt-2"
                placeholder="Spouse's age (if more than 10 years younger)"
              />
            )}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">RMD Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Account Balance</span>
            <span className="font-bold">$${result.accountBalance}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Distribution Period Factor</span>
            <span className="font-bold">{result.distributionFactor}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Your Age</span>
            <span className="font-bold">{result.currentAge}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Required Minimum Distribution</span>
            <span className="font-bold text-blue-600">$${result.rmd}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax & Penalty Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax on RMD (22%)</div>
            <div className="text-2xl font-bold text-red-600">$${result.taxOnRmd}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Net After Tax</div>
            <div className="text-2xl font-bold text-green-600">$${result.netAfterTax}</div>
          </div>
          <div className="bg-red-50 rounded p-4">
            <div className="text-sm text-zinc-500">Missed RMD Penalty (25%)</div>
            <div className="text-2xl font-bold text-red-600">$${result.missedPenalty}</div>
          </div>
          <div className="bg-yellow-50 rounded p-4">
            <div className="text-sm text-zinc-500">Corrected Penalty (10%)</div>
            <div className="text-2xl font-bold text-yellow-600">$${result.correctedPenalty}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">5-Year RMD Projection</h3>
        <div className="space-y-2 text-xs">
          {result.futureRMDs.map((item, idx) => (
            <div key={idx} className="bg-white rounded p-3 grid grid-cols-4 gap-2">
              <div>
                <span className="text-zinc-500">Age {item.age}</span>
              </div>
              <div>
                <span className="text-zinc-500">Factor: {item.factor}</span>
              </div>
              <div className="font-bold">
                RMD: $${item.rmd}
              </div>
              <div className="text-zinc-500">
                Remaining: $${item.remaining}
              </div>
            </div>
          ))}
        </div>
      </div>

      {result.mustTakeRmd ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">RMD Required This Year</h3>
          <div className="text-sm text-green-600">
            At age {result.currentAge} (born {result.birthYear}), RMD starts at age {result.rmdStartAge} per SECURE Act 2.0. Take $${result.rmd} by December 31 to avoid 25% penalty. First RMD can be delayed until April 1 of following year.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">RMD Not Yet Required</h3>
          <div className="text-sm text-yellow-600">
            At age {result.currentAge} (born {result.birthYear}), RMD starts at age {result.rmdStartAge}. Plan for future distributions. Consider Roth conversions before RMDs begin to reduce future taxable distributions.
          </div>
        </div>
      )}

      {result.isSpouseBeneficiary && (result.currentAge - result.spouseAge) > 10 && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Spouse Beneficiary - Lower RMD</h3>
          <div className="text-sm text-blue-600">
            Spouse more than 10 years younger allows use of Joint Life Expectancy table, reducing RMD. This preserves more account balance for surviving spouse.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SECURE Act 2.0 RMD Ages</h3>
        <div className="text-xs text-zinc-600">
          Born before 1950: RMD at 72 (already in effect). Born 1950-1959: RMD at 73. Born 1960+: RMD at 75. No RMD for Roth IRAs during owner's lifetime. RMDs for inherited accounts follow 10-year rule (except eligible designated beneficiaries).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Rules & Tips</h3>
        <div className="text-xs text-zinc-600">
          Deadline: December 31 each year (first RMD: April 1 following year). Penalty: 25% of missed RMD (10% if corrected timely). Aggregate RMDs: Can combine multiple IRAs, take from one. QCD: Qualified Charitable Distribution up to $105K satisfies RMD tax-free. Still working exception: 401(k) RMD delayed if still employed (not IRAs).
        </div>
      </div>
    </main>
  )
}