'use client'

import { useState } from 'react'

export default function TraditionalVsRothIRACalculator() {
  const [currentAge, setCurrentAge] = useState('35')
  const [retirementAge, setRetirementAge] = useState('65')
  const [currentIncome, setCurrentIncome] = useState('80000')
  const [expectedRetirementIncome, setExpectedRetirementIncome] = useState('50000')
  const [contributionAmount, setContributionAmount] = useState('7000')
  const [expectedReturn, setExpectedReturn] = useState('7')
  const [currentTaxRate, setCurrentTaxRate] = useState('22')
  const [expectedRetirementTaxRate, setExpectedRetirementTaxRate] = useState('15')
  const [filingStatus, setFilingStatus] = useState('single')
  const [stateTaxRate, setStateTaxRate] = useState('5')
  const [iraType, setIraType] = useState('both')

  const calculate = () => {
    const age = parseFloat(currentAge) || 0
    const retireAge = parseFloat(retirementAge) || 65
    const income = parseFloat(currentIncome) || 0
    const retireIncome = parseFloat(expectedRetirementIncome) || 0
    const contribution = parseFloat(contributionAmount) || 0
    const returnRate = parseFloat(expectedReturn) / 100 || 0.07
    const currentRate = parseFloat(currentTaxRate) / 100 || 0.22
    const retireRate = parseFloat(expectedRetirementTaxRate) / 100 || 0.15
    const stateRate = parseFloat(stateTaxRate) / 100 || 0.05
    const yearsToRetire = retireAge - age

    // Traditional IRA Analysis
    // Tax deduction now, taxed withdrawals later
    const tradTaxSavingsNow = contribution * (currentRate + stateRate)
    const tradNetCostNow = contribution - tradTaxSavingsNow // Actual cost to you
    const tradFutureValue = contribution * Math.pow(1 + returnRate, yearsToRetire)
    const tradTaxAtWithdrawal = tradFutureValue * (retireRate + stateRate)
    const tradNetAfterTax = tradFutureValue - tradTaxAtWithdrawal
    const tradEffectiveGrowth = (tradNetAfterTax / tradNetCostNow - 1) * 100

    // Roth IRA Analysis
    // No tax deduction now, tax-free withdrawals later
    const rothTaxCostNow = contribution * (currentRate + stateRate) // Extra tax paid now
    const rothNetCostNow = contribution + rothTaxCostNow // Total cost including tax
    const rothFutureValue = contribution * Math.pow(1 + returnRate, yearsToRetire)
    const rothTaxAtWithdrawal = 0 // Tax-free
    const rothNetAfterTax = rothFutureValue
    const rothEffectiveGrowth = (rothNetAfterTax / rothNetCostNow - 1) * 100

    // Comparison
    const rothAdvantage = rothNetAfterTax - tradNetAfterTax
    const rothBetter = rothNetAfterTax > tradNetAfterTax

    // Break-even tax rate (when both are equal)
    // Find retirement tax rate where tradNetAfterTax = rothNetAfterTax
    const breakEvenRate = currentRate // Simplified: when retirement rate = current rate, roughly equal

    // Annual comparison over time
    const yearByYear = []
    for (let y = 1; y <= Math.min(yearsToRetire, 30); y++) {
      const tradFV = contribution * Math.pow(1 + returnRate, y)
      const rothFV = tradFV
      const tradAfterTax = tradFV * (1 - retireRate - stateRate)
      yearByYear.push({
        year: y,
        tradValue: tradFV.toFixed(0),
        tradAfterTax: tradAfterTax.toFixed(0),
        rothValue: rothFV.toFixed(0),
        rothAdvantage: (rothFV - tradAfterTax).toFixed(0),
      })
    }

    // Tax rate scenarios
    const scenarios = [
      { name: 'Same Tax Rate', retireRate: currentRate, tradNet: tradFutureValue * (1 - currentRate - stateRate), rothNet: rothFutureValue },
      { name: 'Lower Tax Rate', retireRate: retireRate, tradNet: tradNetAfterTax, rothNet: rothFutureValue },
      { name: 'Higher Tax Rate', retireRate: currentRate + 0.05, tradNet: tradFutureValue * (1 - currentRate - 0.05 - stateRate), rothNet: rothFutureValue },
    ]

    // Qualitative factors
    const tradPros = ['Tax deduction now reduces current tax bill', 'May reduce AGI for other benefits (student loan, etc.)', 'Better if expect lower taxes in retirement', 'Can convert to Roth later (backdoor strategy)']
    const tradCons = ['Taxed withdrawals in retirement', 'Required Minimum Distributions at 73', 'Tax rate uncertainty in retirement', 'State tax on withdrawals']
    const rothPros = ['Tax-free growth and withdrawals', 'No RMDs (can leave money untouched)', 'Tax rate locked in now (predictability)', 'Withdraw contributions anytime penalty-free']
    const rothCons = ['No tax deduction now', 'Higher effective cost now', 'Income limits for direct contribution', 'Lock in current tax rate (bad if rates drop)']

    // Recommendation
    let recommendation = ''
    if (rothAdvantage > 1000) {
      recommendation = 'Roth IRA recommended - Tax-free withdrawals provide significant advantage'
    } else if (tradNetAfterTax > rothNetAfterTax + 1000) {
      recommendation = 'Traditional IRA recommended - Tax deduction provides more value'
    } else {
      recommendation = 'Both options viable - Consider qualitative factors beyond pure math'
    }

    return {
      currentAge: age.toFixed(0),
      retirementAge: retireAge.toFixed(0),
      yearsToRetire: yearsToRetire.toFixed(0),
      currentIncome: income.toFixed(2),
      expectedRetirementIncome: retireIncome.toFixed(2),
      contributionAmount: contribution.toFixed(2),
      expectedReturn: returnRate.toFixed(0),
      currentTaxRate: (currentRate * 100).toFixed(0),
      expectedRetirementTaxRate: (retireRate * 100).toFixed(0),
      stateTaxRate: (stateRate * 100).toFixed(0),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',

      tradTaxSavingsNow: tradTaxSavingsNow.toFixed(2),
      tradNetCostNow: tradNetCostNow.toFixed(2),
      tradFutureValue: tradFutureValue.toFixed(0),
      tradTaxAtWithdrawal: tradTaxAtWithdrawal.toFixed(0),
      tradNetAfterTax: tradNetAfterTax.toFixed(0),
      tradEffectiveGrowth: tradEffectiveGrowth.toFixed(0),

      rothTaxCostNow: rothTaxCostNow.toFixed(2),
      rothNetCostNow: rothNetCostNow.toFixed(2),
      rothFutureValue: rothFutureValue.toFixed(0),
      rothNetAfterTax: rothNetAfterTax.toFixed(0),
      rothEffectiveGrowth: rothEffectiveGrowth.toFixed(0),

      rothAdvantage: rothAdvantage.toFixed(0),
      rothBetter,
      recommendation,

      yearByYear,
      scenarios: scenarios.map(s => ({
        name: s.name,
        tradNet: s.tradNet.toFixed(0),
        rothNet: s.rothNet.toFixed(0),
        advantage: (s.rothNet - s.tradNet).toFixed(0),
      })),

      tradPros,
      tradCons,
      rothPros,
      rothCons,

      combinedCurrentRate: ((currentRate + stateRate) * 100).toFixed(0),
      combinedRetireRate: ((retireRate + stateRate) * 100).toFixed(0),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Traditional vs Roth IRA Calculator</h1>
      <p className="text-zinc-600">Compare Traditional and Roth IRA to find the best retirement strategy. Analyze tax implications, growth projections, and break-even tax rates for your situation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Personal & Retirement Info</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="input"
              min="18"
              max="70"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="input"
              min="55"
              max="75"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Income ($)</label>
            <input
              type="number"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Retirement Income (Annual Withdrawals) ($)</label>
            <input
              type="number"
              value={expectedRetirementIncome}
              onChange={(e) => setExpectedRetirementIncome(e.target.value)}
              className="input"
              min="0"
            />
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
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Contribution & Tax Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual IRA Contribution ($)</label>
            <input
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              2024-2025 limit: $7,000 base + $1,000 catch-up (age 50+)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="input"
              min="0"
              max="15"
              step="0.5"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Historical stock market average: ~7-10%. Conservative: 5-6%.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Marginal Tax Rate (%)</label>
            <input
              type="number"
              value={currentTaxRate}
              onChange={(e) => setCurrentTaxRate(e.target.value)}
              className="input"
              min="10"
              max="40"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Federal marginal rate based on income bracket.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Retirement Tax Rate (%)</label>
            <input
              type="number"
              value={expectedRetirementTaxRate}
              onChange={(e) => setExpectedRetirementTaxRate(e.target.value)}
              className="input"
              min="0"
              max="40"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Guess your future federal marginal rate. Often lower than current.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State Tax Rate (%)</label>
            <input
              type="number"
              value={stateTaxRate}
              onChange={(e) => setStateTaxRate(e.target.value)}
              className="input"
              min="0"
              max="15"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Applied to both current deduction and future withdrawals.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Time to Retirement</h3>
        <div className="text-2xl font-bold text-blue-800">{result.yearsToRetire} years</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Current Age:</span>
            <span className="font-medium ml-2">{result.currentAge}</span>
          </div>
          <div>
            <span className="text-zinc-600">Retirement Age:</span>
            <span className="font-medium ml-2">{result.retirementAge}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Traditional IRA Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Tax Savings Now:</span>
            <span className="font-bold ml-2 text-green-700">${result.tradTaxSavingsNow}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Cost Now:</span>
            <span className="font-medium ml-2">${result.tradNetCostNow}</span>
          </div>
          <div>
            <span className="text-zinc-600">Future Value:</span>
            <span className="font-medium ml-2">${result.tradFutureValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax at Withdrawal:</span>
            <span className="font-bold ml-2 text-red-700">${result.tradTaxAtWithdrawal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net After Tax:</span>
            <span className="font-bold ml-2">${result.tradNetAfterTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Growth:</span>
            <span className="font-medium ml-2">{result.tradEffectiveGrowth}%</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Deduct contributions now (save tax), pay tax on full amount at withdrawal.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Roth IRA Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Tax Cost Now:</span>
            <span className="font-bold ml-2 text-red-700">${result.rothTaxCostNow}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Cost Now:</span>
            <span className="font-medium ml-2">${result.rothNetCostNow}</span>
          </div>
          <div>
            <span className="text-zinc-600">Future Value:</span>
            <span className="font-medium ml-2">${result.rothFutureValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax at Withdrawal:</span>
            <span className="font-bold ml-2 text-green-700">$0</span>
          </div>
          <div>
            <span className="text-zinc-600">Net After Tax:</span>
            <span className="font-bold ml-2">${result.rothNetAfterTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Growth:</span>
            <span className="font-medium ml-2">{result.rothEffectiveGrowth}%</span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Pay tax now (no deduction), withdraw 100% tax-free in retirement.
        </div>
      </div>

      <div className={`card ${result.rothBetter ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h3 className={`font-medium mb-2 ${result.rothBetter ? 'text-green-700' : 'text-orange-700'}`}>Comparison Result</h3>
        <div className={`text-xl font-bold ${result.rothBetter ? 'text-green-800' : 'text-orange-800'}`}>
          {result.rothBetter ? 'Roth IRA Wins' : 'Traditional IRA Wins'}
        </div>
        <div className="text-lg font-medium mt-2">
          {result.rothBetter ? 'Roth' : 'Traditional'} advantage: ${Math.abs(parseFloat(result.rothAdvantage)).toLocaleString()}
        </div>
        <div className="text-sm mt-2">{result.recommendation}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Tax Rate Scenarios</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          {result.scenarios.map((s, i) => (
            <div key={i} className="border border-purple-100 p-2 rounded">
              <div className="font-medium">{s.name}</div>
              <div className="mt-1">Trad: ${s.tradNet}</div>
              <div>Roth: ${s.rothNet}</div>
              <div className={parseFloat(s.advantage) > 0 ? 'text-green-600' : 'text-orange-600'}>
                {parseFloat(s.advantage) > 0 ? 'Roth +' : 'Trad +'}${Math.abs(parseFloat(s.advantage))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Growth Over Time (Year by Year)</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">Trad Before Tax</th>
                <th className="text-left p-2">Trad After Tax</th>
                <th className="text-left p-2">Roth</th>
                <th className="text-left p-2">Roth Advantage</th>
              </tr>
            </thead>
            <tbody>
              {result.yearByYear.slice(0, 15).map((row) => (
                <tr key={row.year} className="border-b">
                  <td className="p-2">{row.year}</td>
                  <td className="p-2">${row.tradValue}</td>
                  <td className="p-2">${row.tradAfterTax}</td>
                  <td className="p-2">${row.rothValue}</td>
                  <td className={`p-2 ${parseFloat(row.rothAdvantage) > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                    ${row.rothAdvantage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Traditional IRA Pros & Cons</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium text-green-700 mb-1">Pros</div>
            <ul className="list-disc pl-4 space-y-1">
              {result.tradPros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-medium text-red-700 mb-1">Cons</div>
            <ul className="list-disc pl-4 space-y-1">
              {result.tradCons.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Roth IRA Pros & Cons</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium text-green-700 mb-1">Pros</div>
            <ul className="list-disc pl-4 space-y-1">
              {result.rothPros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-medium text-red-700 mb-1">Cons</div>
            <ul className="list-disc pl-4 space-y-1">
              {result.rothCons.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Decision Factors</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Current vs Future Tax Rate:</strong> If retirement rate &lt; current rate, Traditional wins. If retirement rate &gt; current rate, Roth wins.</li>
          <li><strong>Roth Income Limits:</strong> Direct Roth contributions limited above $146K/$161K (2024 single). Backdoor Roth possible but has pro-rata rule.</li>
          <li><strong>Traditional Deduction Limits:</strong> If covered by workplace plan, Traditional IRA deduction phases out at higher incomes.</li>
          <li><strong>RMDs:</strong> Traditional IRAs require withdrawals at 73. Roth has no RMDs during owner's lifetime.</li>
          <li><strong>Flexibility:</strong> Roth allows contribution withdrawals anytime. Traditional withdrawals taxed and may have penalty before 59½.</li>
          <li><strong>Tax Diversification:</strong> Consider having both types for flexibility in retirement tax planning.</li>
        </ul>
      </div>
    </main>
  )
}