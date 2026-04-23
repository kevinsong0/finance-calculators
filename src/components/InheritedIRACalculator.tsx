'use client'

import { useState } from 'react'

export default function InheritedIRACalculator() {
  const [accountType, setAccountType] = useState<string>('traditional')
  const [accountValue, setAccountValue] = useState<string>('500000')
  const [beneficiaryType, setBeneficiaryType] = useState<string>('nonSpouse')
  const [beneficiaryAge, setBeneficiaryAge] = useState<string>('40')
  const [originalOwnerAge, setOriginalOwnerAge] = useState<string>('75')
  const [distributionStartYear, setDistributionStartYear] = useState<string>('2025')

  const calculate = () => {
    const value = parseFloat(accountValue) || 0
    const beneAge = parseInt(beneficiaryAge) || 0
    const ownerAge = parseInt(originalOwnerAge) || 0
    const startYear = parseInt(distributionStartYear) || 2025
    const isSpouse = beneficiaryType === 'spouse'
    const isTraditional = accountType === 'traditional'

    let distributionYears = 10
    let annualDistribution = 0
    let distributionSchedule: Array<{ year: number; distribution: string; remaining: string; taxEstimate: string }> = []

    const isMinor = beneAge < 18
    const isDisabled = beneficiaryType === 'disabled'
    const isChronicallyIll = beneficiaryType === 'chronicallyIll'
    const isEDB = isSpouse || isMinor || isDisabled || isChronicallyIll

    if (isSpouse) {
      distributionYears = Math.max(1, 90 - beneAge)
      if (ownerAge >= beneAge) {
        distributionYears = Math.max(1, Math.floor(90 - ownerAge))
      }
    } else if (isMinor) {
      distributionYears = 21 - beneAge + 10
    } else if (isDisabled || isChronicallyIll) {
      distributionYears = Math.max(1, 90 - beneAge)
    } else {
      distributionYears = 10
    }

    annualDistribution = value / distributionYears

    const taxRate = 0.25

    let remaining = value
    for (let i = 0; i < distributionYears; i++) {
      const year = startYear + i
      const dist = annualDistribution
      remaining -= dist
      const taxEstimate = isTraditional ? dist * taxRate : 0

      distributionSchedule.push({
        year,
        distribution: dist.toFixed(2),
        remaining: Math.max(0, remaining).toFixed(2),
        taxEstimate: taxEstimate.toFixed(2),
      })
    }

    const totalTaxEstimate = isTraditional ? value * taxRate : 0
    const effectiveTaxRate = isTraditional ? 25 : 0

    return {
      accountValue: value.toFixed(2),
      accountType,
      isTraditional,
      beneficiaryType,
      beneficiaryAge: beneAge,
      distributionYears,
      annualDistribution: annualDistribution.toFixed(2),
      distributionSchedule,
      totalTaxEstimate: totalTaxEstimate.toFixed(2),
      effectiveTaxRate,
      isSpouse,
      isEDB,
      isMinor,
      startYear,
      endYear: startYear + distributionYears - 1,
      hasStretchIRA: distributionYears > 10,
      has10YearRule: distributionYears === 10,
      error: null,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Inherited IRA Calculator</h1>
      <p className="text-zinc-600">Calculate inherited IRA distribution requirements under SECURE Act 2.0. Understand 10-year rule, stretch IRA exceptions, RMD timing, and tax implications for beneficiaries.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Inherited IRA Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="input"
            >
              <option value="traditional">Traditional IRA (Pre-tax)</option>
              <option value="roth">Roth IRA (After-tax)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Account Value ($)</label>
            <input
              type="number"
              value={accountValue}
              onChange={(e) => setAccountValue(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Beneficiary Type</label>
            <select
              value={beneficiaryType}
              onChange={(e) => setBeneficiaryType(e.target.value)}
              className="input"
            >
              <option value="spouse">Spouse</option>
              <option value="nonSpouse">Non-Spouse Adult</option>
              <option value="minor">Minor Child</option>
              <option value="disabled">Disabled Individual</option>
              <option value="chronicallyIll">Chronically Ill Individual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Beneficiary Age</label>
            <input
              type="number"
              value={beneficiaryAge}
              onChange={(e) => setBeneficiaryAge(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Original Owner Age at Death</label>
            <input
              type="number"
              value={originalOwnerAge}
              onChange={(e) => setOriginalOwnerAge(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">First Distribution Year</label>
            <input
              type="number"
              value={distributionStartYear}
              onChange={(e) => setDistributionStartYear(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Distribution Rule</h3>
        <div className="text-xl font-bold text-purple-800">
          {result.hasStretchIRA ? `Stretch IRA (${result.distributionYears} years)` : '10-Year Rule'}
        </div>
        <div className="text-xs text-purple-600 mt-2">
          {result.isSpouse
            ? 'Spouse has special options: treat as own, roll over, or keep as inherited with stretch.'
            : result.isEDB
            ? 'Eligible Designated Beneficiary (EDB) gets stretch IRA based on life expectancy.'
            : 'SECURE Act: Most beneficiaries must distribute within 10 years. No annual RMDs, but all out by year 10.'}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Distribution Years:</span>
            <span className="font-bold ml-2">{result.distributionYears}</span>
          </div>
          <div>
            <span className="text-zinc-600">Annual Distribution:</span>
            <span className="font-bold ml-2">${result.annualDistribution}</span>
          </div>
        </div>
      </div>

      {result.isTraditional && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Tax Implications (Traditional IRA)</h3>
          <div className="text-2xl font-bold text-red-800">${result.totalTaxEstimate}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Estimated Tax Rate:</span>
              <span className="font-medium ml-2">{result.effectiveTaxRate}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Total Distribution:</span>
              <span className="font-medium ml-2">${result.accountValue}</span>
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2">
            Traditional IRA distributions taxed as ordinary income. Roth IRA distributions tax-free if account open 5+ years.
          </div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Distribution Schedule</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">Distribution</th>
                <th className="text-left p-2">Remaining</th>
                {result.isTraditional && <th className="text-left p-2">Tax Estimate</th>}
              </tr>
            </thead>
            <tbody>
              {result.distributionSchedule?.slice(0, 10).map((d, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{d.year}</td>
                  <td className="p-2">${d.distribution}</td>
                  <td className="p-2">${d.remaining}</td>
                  {result.isTraditional && <td className="p-2 text-red-600">${d.taxEstimate}</td>}
                </tr>
              ))}
              {result.distributionSchedule?.length > 10 && (
                <tr>
                  <td className="p-2 text-zinc-500">... {result.distributionSchedule.length - 10} more years</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-blue-600 mt-2">
          Final deadline: December 31, {result.endYear}. All funds must be distributed by this date to avoid 25% penalty.
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Spouse Beneficiary Options</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Treat as Own IRA:</strong> Best if spouse has own IRA. Merge into spouse IRA. RMDs based on spouse age.</li>
          <li><strong>Roll into Own IRA:</strong> Transfer to spouse existing IRA. Same effect as treating as own.</li>
          <li><strong>Keep as Inherited:</strong> Keep separate. RMDs based on deceased remaining life expectancy OR spouse age.</li>
          <li><strong>Delay RMDs:</strong> If deceased died before RBD (age 73), spouse can delay RMDs until deceased would have reached RBD.</li>
          <li><strong>Roth IRA:</strong> Spouse can treat inherited Roth as own. No RMDs ever (SECURE Act 2.0).</li>
        </ul>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Eligible Designated Beneficiary (EDB)</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Who Qualifies:</strong> Spouse, minor child (under 18), disabled, chronically ill, or person not more than 10 years younger.</li>
          <li><strong>Stretch IRA:</strong> EDBs can use life expectancy method. Annual RMDs based on beneficiary age.</li>
          <li><strong>Minor Exception:</strong> Minor child gets stretch until age 21. Then 10-year rule applies (all out by age 31).</li>
          <li><strong>Disabled/Chronically Ill:</strong> Full stretch IRA based on life expectancy. No 10-year limit.</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">10-Year Rule (SECURE Act)</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Who Must Use:</strong> All non-EDB beneficiaries. Adult children, friends, most non-spouse heirs.</li>
          <li><strong>Deadline:</strong> All funds must be distributed by December 31 of the 10th year after death.</li>
          <li><strong>No Annual RMDs:</strong> Can take any amount each year (even zero). But all must be out by year 10.</li>
          <li><strong>Penalty:</strong> 25% penalty on amounts not distributed by deadline.</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Tax Planning Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Roth Conversion Before Death:</strong> Owner converts Traditional to Roth during life. Beneficiary gets tax-free distributions.</li>
          <li><strong>Stretch for EDB:</strong> If eligible, use stretch IRA for maximum tax deferral. Annual RMDs spread taxation over decades.</li>
          <li><strong>Flexible 10-Year:</strong> Can delay distributions in 10-year rule. Take larger distributions in low-income years.</li>
          <li><strong>Roth Inheritance:</strong> Best: inherit Roth IRA. No tax on distributions. Same 10-year rule applies but tax-free.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Inherited IRA Key Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>RBD (Required Beginning Date):</strong> April 1 after turning age 73 (SECURE Act 2.0). Original owner first RMD deadline.</li>
          <li><strong>Beneficiary RMD Start:</strong> December 31 of year AFTER owner death. Or December 31 of year owner would have reached RBD.</li>
          <li><strong>Title Requirements:</strong> Inherited IRA must be titled correctly: Jane Smith (deceased) IRA FBO John Smith (beneficiary).</li>
          <li><strong>No Contributions:</strong> Cannot make new contributions to inherited IRA. Only distributions allowed.</li>
          <li><strong>Multiple Beneficiaries:</strong> If multiple beneficiaries, use oldest beneficiary age for RMD calculations.</li>
          <li><strong>Separate Accounts:</strong> Split by September 30 after death. Each beneficiary uses own age for RMDs.</li>
        </ul>
      </div>
    </main>
  )
}