'use client'

import { useState } from 'react'

export default function MegaBackdoorRothCalculator() {
  const [salary, setSalary] = useState<string>('150000')
  const [employerMatch, setEmployerMatch] = useState<string>('6')
  const [afterTaxLimit, setAfterTaxLimit] = useState<string>('66000')
  const [afterTaxContribution, setAfterTaxContribution] = useState<string>('30000')
  const [planAllowsInPlanRoth, setPlanAllowsInPlanRoth] = useState<string>('yes')
  const [growthRate, setGrowthRate] = useState<string>('7')
  const [years, setYears] = useState<string>('10')

  const calculate = () => {
    const sal = parseFloat(salary) || 0
    const matchPercent = parseFloat(employerMatch) / 100 || 0.06
    const afterTaxMax = parseFloat(afterTaxLimit) || 66000
    const afterTaxContrib = parseFloat(afterTaxContribution) || 0
    const inPlanRoth = planAllowsInPlanRoth === 'yes'
    const growth = parseFloat(growthRate) / 100 || 0.07
    const numYears = parseInt(years) || 10

    // 2024 401(k) limits
    const employeePreTaxLimit = 23000 // 2024 limit
    const catchUpLimit = 7500 // Age 50+ catch-up
    const totalLimit = 69000 // Total 401(k) limit (employer + employee)
    const totalCatchUpLimit = 76500 // With catch-up

    // Calculate contribution breakdown
    const employerMatchAmount = sal * matchPercent
    const employeePreTaxRoom = employeePreTaxLimit
    const afterTaxRoom = totalLimit - employeePreTaxRoom - employerMatchAmount
    const actualAfterTax = Math.min(afterTaxContrib, Math.max(0, afterTaxRoom))

    // Mega backdoor Roth benefit
    // Traditional: after-tax contribution grows, taxed on growth when withdrawn
    // Roth: after-tax converted to Roth immediately, growth tax-free

    // Scenario 1: In-plan Roth conversion (if allowed)
    // Immediate conversion, no growth before conversion
    // All growth tax-free in Roth

    // Scenario 2: Out-of-plan conversion (roll to Roth IRA)
    // Growth in after-tax account before conversion is taxed
    // Need to track taxable growth portion

    let totalAfterTaxContributions = 0
    let totalRothBalance = 0
    let totalTaxPaidOnGrowth = 0

    for (let i = 0; i < numYears; i++) {
      totalAfterTaxContributions += actualAfterTax

      if (inPlanRoth) {
        // Immediate in-plan conversion: no tax on growth
        // Contribution immediately goes to Roth, grows tax-free
        totalRothBalance += actualAfterTax
        totalRothBalance *= (1 + growth)
      } else {
        // Out-of-plan: some growth taxed before conversion
        // Simplified: assume conversion happens, growth taxed
        const growthTaxRate = 0.22 // Estimated
        const taxableGrowth = actualAfterTax * growth
        totalTaxPaidOnGrowth += taxableGrowth * growthTaxRate
        totalRothBalance += actualAfterTax
        totalRothBalance *= (1 + growth)
      }
    }

    // Total tax savings vs taxable account
    const taxableAccountBalance = totalAfterTaxContributions * Math.pow(1 + growth * 0.78, numYears) // 22% tax on gains
    const rothBenefit = totalRothBalance - taxableAccountBalance

    // Annual breakdown
    const annualSchedule: Array<{
      year: number;
      afterTaxContrib: number;
      employerMatch: number;
      conversionType: string;
      taxPaidOnGrowth: number;
      rothBalance: string;
    }> = []

    let runningRoth = 0
    for (let i = 0; i < numYears; i++) {
      const year = new Date().getFullYear() + i
      runningRoth += actualAfterTax
      runningRoth *= (1 + growth)
      const taxOnGrowth = inPlanRoth ? 0 : actualAfterTax * growth * 0.22

      annualSchedule.push({
        year,
        afterTaxContrib: actualAfterTax,
        employerMatch: employerMatchAmount,
        conversionType: inPlanRoth ? 'In-Plan Roth' : 'Roll to Roth IRA',
        taxPaidOnGrowth: taxOnGrowth,
        rothBalance: runningRoth.toFixed(2),
      })
    }

    return {
      salary: sal.toFixed(0),
      employerMatchAmount: employerMatchAmount.toFixed(2),
      employeePreTaxLimit: employeePreTaxLimit.toFixed(0),
      afterTaxRoom: afterTaxRoom.toFixed(2),
      actualAfterTax: actualAfterTax.toFixed(2),
      inPlanRoth,
      totalAfterTaxContributions: totalAfterTaxContributions.toFixed(2),
      totalRothBalance: totalRothBalance.toFixed(2),
      totalTaxPaidOnGrowth: totalTaxPaidOnGrowth.toFixed(2),
      rothBenefit: rothBenefit.toFixed(2),
      annualSchedule,
      years: numYears,
      growthRate: (growth * 100).toFixed(0),
      planAllowsInPlan: inPlanRoth,
      hasAfterTaxRoom: afterTaxRoom > 0,
      error: null,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Mega Backdoor Roth Calculator</h1>
      <p className="text-zinc-600">Calculate after-tax 401(k) contributions converted to Roth. Understand 401(k) limits, in-plan Roth conversions, and the tax benefits of contributing beyond standard pre-tax limits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">401(k) Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Salary ($)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Employer Match (%)</label>
            <input
              type="number"
              value={employerMatch}
              onChange={(e) => setEmployerMatch(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">After-Tax Contribution ($)</label>
            <input
              type="number"
              value={afterTaxContribution}
              onChange={(e) => setAfterTaxContribution(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Plan Allows In-Plan Roth Conversion?</label>
            <select
              value={planAllowsInPlanRoth}
              onChange={(e) => setPlanAllowsInPlanRoth(e.target.value)}
              className="input"
            >
              <option value="yes">Yes (Best - Immediate Conversion)</option>
              <option value="no">No (Roll to Roth IRA)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Growth Rate (%)</label>
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years of Contributions</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">2024 401(k) Contribution Limits</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Employee Pre-Tax/Roth Limit:</span>
            <span className="font-bold ml-2">$23,000</span>
          </div>
          <div>
            <span className="text-zinc-600">Catch-Up (Age 50+):</span>
            <span className="font-bold ml-2">$7,500</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Plan Limit:</span>
            <span className="font-bold ml-2">$69,000</span>
          </div>
          <div>
            <span className="text-zinc-600">Total with Catch-Up:</span>
            <span className="font-bold ml-2">$76,500</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          After-tax contributions allowed after pre-tax/Roth contributions up to total plan limit ($69K). Employer match included in total.
        </div>
      </div>

      {result.hasAfterTaxRoom && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Your After-Tax Room</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Salary:</span>
              <span className="font-medium ml-2">${result.salary}</span>
            </div>
            <div>
              <span className="text-zinc-600">Employer Match:</span>
              <span className="font-medium ml-2">${result.employerMatchAmount}</span>
            </div>
            <div>
              <span className="text-zinc-600">Pre-Tax/Roth Limit:</span>
              <span className="font-medium ml-2">${result.employeePreTaxLimit}</span>
            </div>
            <div>
              <span className="text-zinc-600">After-Tax Room:</span>
              <span className="font-bold ml-2 text-green-700">${result.afterTaxRoom}</span>
            </div>
            <div>
              <span className="text-zinc-600">Your Contribution:</span>
              <span className="font-bold ml-2">${result.actualAfterTax}</span>
            </div>
            <div>
              <span className="text-zinc-600">Conversion Type:</span>
              <span className="font-medium ml-2">{result.planAllowsInPlan ? 'In-Plan Roth' : 'Roll to IRA'}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Roth Balance After {result.years} Years</h3>
        <div className="text-2xl font-bold text-green-800">${result.totalRothBalance}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Total Contributions:</span>
            <span className="font-medium ml-2">${result.totalAfterTaxContributions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax-Free Growth:</span>
            <span className="font-bold ml-2 text-green-700">${(parseFloat(result.totalRothBalance) - parseFloat(result.totalAfterTaxContributions)).toFixed(2)}</span>
          </div>
        </div>
        {parseFloat(result.totalTaxPaidOnGrowth) > 0 && (
          <div className="text-xs text-orange-600 mt-2">
            Tax paid on growth before conversion: ${result.totalTaxPaidOnGrowth} (out-of-plan conversion)
          </div>
        )}
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Annual Conversion Schedule</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">After-Tax Contrib</th>
                <th className="text-left p-2">Conversion Type</th>
                <th className="text-left p-2">Tax on Growth</th>
                <th className="text-left p-2">Roth Balance</th>
              </tr>
            </thead>
            <tbody>
              {result.annualSchedule?.slice(0, 10).map((a, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{a.year}</td>
                  <td className="p-2">${a.afterTaxContrib.toFixed(0)}</td>
                  <td className="p-2">{a.conversionType}</td>
                  <td className="p-2 text-red-600">${a.taxPaidOnGrowth.toFixed(0)}</td>
                  <td className="p-2 text-green-600 font-bold">${parseFloat(a.rothBalance).toFixed(0)}</td>
                </tr>
              ))}
              {result.annualSchedule?.length > 10 && (
                <tr>
                  <td className="p-2 text-zinc-500">... {result.annualSchedule.length - 10} more years</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Mega Backdoor Roth Explained</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>What:</strong> Contribute after-tax dollars to 401(k) beyond $23K pre-tax/Roth limit. Convert to Roth immediately. Growth tax-free.</li>
          <li><strong>How:</strong> 1) Max out $23K pre-tax/Roth 401(k), 2) Contribute after-tax up to total limit ($69K), 3) Convert to Roth (in-plan or roll to IRA).</li>
          <li><strong>In-Plan Roth:</strong> Best option. Convert after-tax to Roth within 401(k). No taxable growth before conversion. All growth tax-free.</li>
          <li><strong>Roll to IRA:</strong> If plan doesn't offer in-plan Roth. Roll after-tax to Roth IRA. Growth before roll is taxable.</li>
          <li><strong>Benefits:</strong> Contribute up to $69K total, growth tax-free in Roth, no income limits, no RMDs (Roth 401(k) or Roth IRA).</li>
          <li><strong>Requirements:</strong> Plan must allow after-tax contributions. Plan must allow in-plan Roth OR allow rollovers while employed.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">In-Plan Roth vs Roth IRA Roll</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-medium text-zinc-700">In-Plan Roth Conversion</h4>
            <ul className="text-zinc-600 space-y-1 list-disc pl-4">
              <li>Best: immediate conversion</li>
              <li>No tax on growth before conversion</li>
              <li>Stay in 401(k) plan</li>
              <li>Subject to plan investment options</li>
              <li>May have limited withdrawals</li>
              <li>No 5-year rule per conversion</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-zinc-700">Roll to Roth IRA</h4>
            <ul className="text-zinc-600 space-y-1 list-disc pl-4">
              <li>Growth taxed before roll</li>
              <li>More investment freedom</li>
              <li>Easier withdrawals</li>
              <li>No RMDs ever</li>
              <li>5-year rule applies</li>
              <li>Plan must allow in-service rollover</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Mega Backdoor Roth Benefits</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Supercharge Roth:</strong> Contribute $23K + after-tax up to $69K. More Roth savings than IRA limit ($7K) alone.</li>
          <li><strong>No Income Limits:</strong> High earners can do mega backdoor Roth. No Roth IRA income limits apply.</li>
          <li><strong>Tax-Free Growth:</strong> All growth in Roth is tax-free forever. No tax on withdrawals.</li>
          <li><strong>No RMDs:</strong> Roth 401(k) no RMDs (SECURE 2.0). Roth IRA no RMDs ever. More flexibility in retirement.</li>
          <li><strong>Estate Benefit:</strong> Roth better for heirs. Tax-free inheritance. Heirs get same tax benefits.</li>
          <li><strong>Early Access:</strong> Roth contributions (not conversions) accessible anytime tax-free. Conversions: 5-year rule.</li>
          <li><strong>Employer Match:</strong> Employer match on after-tax contributions if plan allows. More employer money!</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Mega Backdoor Roth Limitations</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Plan Must Allow:</strong> Not all plans allow after-tax contributions. Not all allow in-plan Roth or in-service rollovers. Check with HR.</li>
          <li><strong>Admin Complexity:</strong> Manual conversions sometimes required. Missed conversions = growth taxed. Auto-convert best.</li>
          <li><strong>Withdrawal Rules:</strong> In-plan Roth may have withdrawal restrictions. Need to roll to IRA for full access.</li>
          <li><strong>5-Year Rule:</strong> Roth IRA conversions have 5-year rule. In-plan Roth: no per-conversion 5-year rule, but overall 5-year rule may apply.</li>
          <li><strong>Growth Tax (Roll):</strong> Rolling to Roth IRA: growth before conversion taxed. In-plan Roth preferred to avoid.</li>
          <li><strong>Employer Match:</strong> Some plans do NOT match after-tax. Check plan documents. Match may only apply to pre-tax/Roth.</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">How to Set Up Mega Backdoor Roth</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Step 1:</strong> Check if plan allows after-tax contributions. Ask HR or read plan documents.</li>
          <li><strong>Step 2:</strong> Check if plan allows in-plan Roth conversions OR in-service rollovers to IRA.</li>
          <li><strong>Step 3:</strong> Max out $23K pre-tax/Roth contributions first. After-tax only after pre-tax/Roth maxed.</li>
          <li><strong>Step 4:</strong> Set up after-tax contributions. Calculate room: $69K total - $23K - employer match = after-tax room.</li>
          <li><strong>Step 5:</strong> Convert immediately (in-plan) OR roll to Roth IRA frequently. Minimize growth before conversion.</li>
          <li><strong>Step 6:</strong> Automate if possible. Auto-convert after-tax to Roth eliminates manual conversion timing risk.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Questions</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Can I do backdoor Roth IRA + mega backdoor?</strong> Yes! $7K IRA conversion + $46K after-tax 401(k). Both can be done same year.</li>
          <li><strong>Does employer match count toward after-tax?</strong> Employer match part of $69K total limit. Reduces after-tax room.</li>
          <li><strong>What if plan does not allow after-tax?</strong> Cannot do mega backdoor Roth. Use regular backdoor Roth IRA ($7K) instead.</li>
          <li><strong>Auto-convert vs manual?</strong> Auto-convert best - immediate conversion, no growth tax. Manual: risk of missing conversion timing.</li>
          <li><strong>Can I withdraw mega backdoor Roth?</strong> In-plan Roth: follow plan withdrawal rules. Roth IRA: contributions anytime, conversions 5-year rule.</li>
        </ul>
      </div>
    </main>
  )
}