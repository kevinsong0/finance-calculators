'use client'

import { useState } from 'react'

export default function SocialSecurityEarningsTestExemptionCalculator() {
  const [yearlyEarnings, setYearlyEarnings] = useState(25000)
  const [isWorking, setIsWorking] = useState(true)
  const [currentAge, setCurrentAge] = useState(63)
  const [fraYear, setFraYear] = useState(1960)
  const [monthlyBenefit, setMonthlyBenefit] = useState(1200)
  const [monthsRetiredInYear, setMonthsRetiredInYear] = useState(0)

  const calculate = () => {
    // Social Security earnings test exemption and withholding
    // Earnings test applies before Full Retirement Age (FRA)
    // 2024 earnings limits

    const earningsLimitUnderFRA = 22280 // 2024: before year reaching FRA
    const earningsLimitFRAYear = 59460 // 2024: year reaching FRA (only months before FRA)

    // Calculate FRA based on birth year
    const fraAge = fraYear >= 1960 ? 67 : fraYear >= 1959 ? 66 + 10/12 : fraYear >= 1938 ? 65 + (fraYear - 1938) * 2/12 : 65

    // Determine which limit applies
    const reachesFRAThisYear = currentAge === Math.floor(fraAge)
    const underFRA = currentAge < fraAge

    let applicableLimit = 0
    let withholdingRate = 0

    if (underFRA && !reachesFRAThisYear) {
      applicableLimit = earningsLimitUnderFRA
      withholdingRate = 1/2 // $1 withheld for every $2 over limit
    } else if (reachesFRAThisYear) {
      applicableLimit = earningsLimitFRAYear
      withholdingRate = 1/3 // $1 withheld for every $3 over limit
    } else {
      // Over FRA: no earnings test
      applicableLimit = Infinity
      withholdingRate = 0
    }

    // Calculate excess earnings
    const excessEarnings = isWorking ? Math.max(0, yearlyEarnings - applicableLimit) : 0

    // Calculate withheld benefits
    let withheldAmount = 0
    if (excessEarnings > 0 && withholdingRate > 0) {
      withheldAmount = excessEarnings * withholdingRate
    }

    // Monthly withholding
    const monthlyWithholdingRate = withheldAmount / monthlyBenefit
    const monthsWithheld = Math.ceil(monthlyWithholdingRate)

    // If monthsRetiredInYear > 0, use special monthly test
    // Monthly test: $1,860/month exempt in months after retirement (2024)
    const monthlyEarningsLimit = 1860 // 2024: if retired during year

    let earningsUsingMonthlyTest = 0
    if (monthsRetiredInYear > 0 && isWorking) {
      // Months working before retirement
      const monthsWorking = 12 - monthsRetiredInYear
      // Earnings during working months count toward annual test
      // After retirement, only monthly limit applies
      const workingMonthEarnings = yearlyEarnings * monthsWorking / 12
      const retiredMonthEarnings = yearlyEarnings * monthsRetiredInYear / 12
      const exemptRetiredEarnings = monthlyEarningsLimit * monthsRetiredInYear

      if (workingMonthEarnings > applicableLimit) {
        earningsUsingMonthlyTest = (workingMonthEarnings - applicableLimit) * withholdingRate
      } else if (retiredMonthEarnings > exemptRetiredEarnings) {
        earningsUsingMonthlyTest = (retiredMonthEarnings - exemptRetiredEarnings) * withholdingRate
      }
    }

    // Grace year: first year of retirement, monthly test
    const graceYearEligible = monthsRetiredInYear > 0

    // Annual benefit vs withheld
    const annualBenefit = monthlyBenefit * 12
    const netAnnualBenefit = annualBenefit - withheldAmount

    // Benefits not permanently lost - recalculated at FRA
    const adjustmentAtFRA = monthsWithheld // Months of credit added at FRA

    // Exemption conditions
    // - Over FRA: no earnings test
    // - Grace year: monthly test available
    // - Working for employer: different rules

    return {
      yearlyEarnings: yearlyEarnings.toFixed(0),
      isWorking,
      currentAge: currentAge.toFixed(0),
      fraYear: fraYear.toFixed(0),
      fraAge: fraAge.toFixed(1),
      monthlyBenefit: monthlyBenefit.toFixed(0),
      monthsRetiredInYear: monthsRetiredInYear.toFixed(0),
      earningsLimitUnderFRA: earningsLimitUnderFRA.toFixed(0),
      earningsLimitFRAYear: earningsLimitFRAYear.toFixed(0),
      monthlyEarningsLimit: monthlyEarningsLimit.toFixed(0),
      applicableLimit: applicableLimit === Infinity ? 'No limit' : applicableLimit.toFixed(0),
      withholdingRate: withholdingRate === 1/2 ? '$1/$2' : withholdingRate === 1/3 ? '$1/$3' : 'None',
      excessEarnings: excessEarnings.toFixed(0),
      withheldAmount: withheldAmount.toFixed(0),
      monthsWithheld: monthsWithheld.toFixed(0),
      graceYearEligible,
      earningsUsingMonthlyTest: earningsUsingMonthlyTest.toFixed(0),
      annualBenefit: annualBenefit.toFixed(0),
      netAnnualBenefit: netAnnualBenefit.toFixed(0),
      adjustmentAtFRA: adjustmentAtFRA.toFixed(0),
      underFRA,
      reachesFRAThisYear,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Earnings Test Exemption Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate benefit withholding if working before FRA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Yearly Earnings</label>
          <input type="number" value={yearlyEarnings} onChange={(e) => setYearlyEarnings(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currently Working?</label>
          <select value={isWorking ? 'yes' : 'no'} onChange={(e) => setIsWorking(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - still earning income</option>
            <option value="no">No - fully retired</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="62" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Birth Year</label>
          <input type="number" value={fraYear} min="1938" max="1960" onChange={(e) => setFraYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly SS Benefit</label>
          <input type="number" value={monthlyBenefit} onChange={(e) => setMonthlyBenefit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Months Retired in Year (Grace Year)</label>
          <input type="number" value={monthsRetiredInYear} min="0" max="12" onChange={(e) => setMonthsRetiredInYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.underFRA && result.isWorking ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.underFRA && result.isWorking ? 'text-orange-700' : 'text-green-700'}`}>Earnings Test Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Current Age:</span><span className="font-medium ml-2">{result.currentAge}</span></div>
          <div><span className="text-zinc-600">FRA:</span><span className="font-medium ml-2">{result.fraAge}</span></div>
          <div><span className="text-zinc-600">Test Applies:</span><span className={`font-bold ml-2 ${result.underFRA && result.isWorking ? 'text-orange-700' : 'text-green-700'}`}>{result.underFRA && result.isWorking ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Earnings test applies before FRA. After FRA, no earnings limit.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 Earnings Limits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Under FRA:</span><span className="font-bold text-blue-700 ml-2">$ {result.earningsLimitUnderFRA}</span></div>
          <div><span className="text-zinc-600">FRA Year:</span><span className="font-bold text-blue-700 ml-2">$ {result.earningsLimitFRAYear}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Monthly (Grace Year):</span><span className="font-medium ml-2">$ {result.monthlyEarningsLimit}</span></div>
          <div><span className="text-zinc-600">Applicable:</span><span className="font-bold text-blue-700 ml-2">{result.applicableLimit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Under FRA: $1 withheld for every $2 over. FRA year: $1 for every $3.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Withholding Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Earnings:</span><span className="font-medium ml-2">$ {result.yearlyEarnings}</span></div>
          <div><span className="text-zinc-600">Excess:</span><span className="font-bold text-purple-700 ml-2">$ {result.excessEarnings}</span></div>
          <div><span className="text-zinc-600">Rate:</span><span className="font-medium ml-2">{result.withholdingRate}</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <div><span className="text-zinc-600">Withheld:</span><span className="font-bold text-red-700 ml-2">$ {result.withheldAmount}</span></div>
          <div><span className="text-zinc-600">Months:</span><span className="font-bold text-red-700 ml-2">{result.monthsWithheld}</span></div>
          <div><span className="text-zinc-600">Benefit:</span><span className="font-medium ml-2">$ {result.monthlyBenefit}/mo</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SSA withholds full monthly benefits until excess earnings recovered.</div>
      </div>

      {result.graceYearEligible && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Grace Year (Monthly Test)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Months Retired:</span><span className="font-medium ml-2">{result.monthsRetiredInYear}</span></div>
            <div><span className="text-zinc-600">Monthly Limit:</span><span className="font-medium ml-2">$ {result.monthlyEarningsLimit}/mo</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Using Monthly Test:</span><span className={`font-bold ml-2 ${Number(result.earningsUsingMonthlyTest) < Number(result.withheldAmount) ? 'text-green-700' : 'text-teal-700'}`}>$ {result.earningsUsingMonthlyTest}</span></div>
            <div><span className="text-zinc-600">Benefit:</span><span className="font-medium ml-2">Higher in grace year</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">First year of retirement: use monthly test for higher exempt amount.</div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Benefit Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Annual Benefit:</span><span className="font-medium ml-2">$ {result.annualBenefit}</span></div>
          <div><span className="text-zinc-600">Withheld:</span><span className="font-bold text-orange-700 ml-2">$ {result.withheldAmount}</span></div>
          <div><span className="text-zinc-600">Net:</span><span className="font-bold text-orange-700 ml-2">$ {result.netAnnualBenefit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Benefits withheld but not permanently lost - adjusted at FRA.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">FRA Adjustment Credit</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Months Withheld:</span><span className="font-medium ml-2">{result.monthsWithheld}</span></div>
          <div><span className="text-zinc-600">Credit at FRA:</span><span className="font-bold text-green-700 ml-2">{result.adjustmentAtFRA} months</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">At FRA, SSA recalculates benefit to credit withheld months. Not permanently lost!</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Earnings Test Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Test applies before FRA only</li>
          <li>2024 limit: $22,280 under FRA</li>
          <li>2024 limit: $59,460 in FRA year</li>
          <li>$1 withheld for $2 over limit</li>
          <li>Grace year: monthly test available</li>
          <li>Monthly limit: $1,860 in grace year</li>
          <li>Benefits not permanently lost</li>
          <li>Credit added at FRA</li>
          <li>Report earnings to SSA</li>
          <li>Self-employment: different rules</li>
        </ul>
      </div>
    </div>
  )
}