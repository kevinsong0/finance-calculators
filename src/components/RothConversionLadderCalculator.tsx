'use client'

import { useState } from 'react'

export default function RothConversionLadderCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('50')
  const [retirementAge, setRetirementAge] = useState<string>('55')
  const [traditionalBalance, setTraditionalBalance] = useState<string>('500000')
  const [annualConversion, setAnnualConversion] = useState<string>('50000')
  const [currentTaxRate, setCurrentTaxRate] = useState<string>('22')
  const [retirementTaxRate, setRetirementTaxRate] = useState<string>('12')
  const [growthRate, setGrowthRate] = useState<string>('7')

  const calculate = () => {
    const age = parseInt(currentAge) || 0
    const retireAge = parseInt(retirementAge) || 0
    const traditional = parseFloat(traditionalBalance) || 0
    const conversion = parseFloat(annualConversion) || 0
    const currentRate = parseFloat(currentTaxRate) / 100 || 0.22
    const retireRate = parseFloat(retirementTaxRate) / 100 || 0.12
    const growth = parseFloat(growthRate) / 100 || 0.07

    const conversionYears = retireAge - age
    const totalConversions = conversion * conversionYears

    // Tax paid now on conversions
    const taxPaidNow = totalConversions * currentRate

    // Growth on converted amounts (in Roth, tax-free growth)
    let rothBalance = 0
    for (let i = 0; i < conversionYears; i++) {
      rothBalance += conversion // Add annual conversion
      rothBalance *= (1 + growth) // Grow for one year
    }

    // Remaining Traditional IRA (not converted)
    const remainingTraditional = traditional - totalConversions
    let traditionalGrowth = remainingTraditional
    for (let i = 0; i < conversionYears; i++) {
      traditionalGrowth *= (1 + growth)
    }

    // Compare scenarios
    // Scenario A: Convert now, pay tax at current rate
    // Scenario B: Keep in Traditional, withdraw in retirement at retire rate

    // Roth withdrawals: tax-free
    const rothWithdrawals = rothBalance

    // Traditional withdrawals: taxed at retirement rate
    const traditionalWithdrawalsAfterTax = traditionalGrowth * (1 - retireRate)

    // Total after-tax wealth
    const totalWithConversion = rothWithdrawals + traditionalWithdrawalsAfterTax
    const totalNoConversion = (traditional + rothBalance - totalConversions) * Math.pow(1 + growth, conversionYears) * (1 - retireRate)

    // Calculate 5-year rule for each conversion
    const conversionSchedule: Array<{
      year: number;
      age: number;
      conversion: number;
      taxPaid: number;
      rothBalance: string;
      fiveYearRuleYear: number;
      canWithdrawTaxFree: boolean;
    }> = []

    for (let i = 0; i < conversionYears; i++) {
      const convYear = new Date().getFullYear() + i
      const convAge = age + i
      const convAmount = conversion
      const taxOnConv = convAmount * currentRate
      const fiveYearYear = convYear + 5
      const canWithdraw = convAge + 5 >= retireAge

      conversionSchedule.push({
        year: convYear,
        age: convAge,
        conversion: convAmount,
        taxPaid: taxOnConv,
        rothBalance: '逐年增长',
        fiveYearRuleYear: fiveYearYear,
        canWithdrawTaxFree: canWithdraw,
      })
    }

    // Tax arbitrage benefit
    const taxArbitrage = (currentRate - retireRate) * totalConversions

    // Break-even analysis
    const breakEvenYears = taxPaidNow / ((traditional * growth * (currentRate - retireRate)))

    return {
      conversionYears,
      totalConversions: totalConversions.toFixed(2),
      taxPaidNow: taxPaidNow.toFixed(2),
      rothBalanceAtRetirement: rothBalance.toFixed(2),
      remainingTraditional: remainingTraditional.toFixed(2),
      traditionalAtRetirement: traditionalGrowth.toFixed(2),
      totalWithConversion: totalWithConversion.toFixed(2),
      totalNoConversion: totalNoConversion.toFixed(2),
      taxArbitrage: taxArbitrage.toFixed(2),
      conversionSchedule,
      currentRate: (currentRate * 100).toFixed(0),
      retireRate: (retireRate * 100).toFixed(0),
      conversionBeneficial: currentRate > retireRate,
      breakEvenYears: breakEvenYears.toFixed(1),
      error: null,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Roth Conversion Ladder Calculator</h1>
      <p className="text-zinc-600">Plan a series of Roth conversions before retirement to minimize taxes. Calculate tax arbitrage benefits, 5-year rule timing, and optimal conversion amounts for early retirement access.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Conversion Plan Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Traditional IRA Balance ($)</label>
            <input
              type="number"
              value={traditionalBalance}
              onChange={(e) => setTraditionalBalance(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Conversion Amount ($)</label>
            <input
              type="number"
              value={annualConversion}
              onChange={(e) => setAnnualConversion(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Tax Rate (%)</label>
            <input
              type="number"
              value={currentTaxRate}
              onChange={(e) => setCurrentTaxRate(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Retirement Tax Rate (%)</label>
            <input
              type="number"
              value={retirementTaxRate}
              onChange={(e) => setRetirementTaxRate(e.target.value)}
              className="input"
            />
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
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Conversion Ladder Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Conversion Years:</span>
            <span className="font-bold ml-2">{result.conversionYears} years</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Converted:</span>
            <span className="font-bold ml-2">${result.totalConversions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Paid Now:</span>
            <span className="font-bold ml-2 text-red-700">${result.taxPaidNow}</span>
          </div>
          <div>
            <span className="text-zinc-600">Roth at Retirement:</span>
            <span className="font-bold ml-2 text-green-700">${result.rothBalanceAtRetirement}</span>
          </div>
        </div>
      </div>

      {result.conversionBeneficial && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Tax Arbitrage Benefit</h3>
          <div className="text-2xl font-bold text-green-800">${result.taxArbitrage}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Current Rate:</span>
              <span className="font-medium ml-2">{result.currentRate}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Retirement Rate:</span>
              <span className="font-medium ml-2">{result.retireRate}%</span>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-2">
            Converting at {result.currentRate}% saves {parseFloat(result.currentRate) - parseFloat(result.retireRate)}% vs paying {result.retireRate}% in retirement. Tax arbitrage reduces lifetime tax burden.
          </div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Conversion Schedule & 5-Year Rule</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Year</th>
                <th className="text-left p-2">Age</th>
                <th className="text-left p-2">Conversion</th>
                <th className="text-left p-2">Tax Paid</th>
                <th className="text-left p-2">5-Year Rule Met</th>
                <th className="text-left p-2">Can Withdraw</th>
              </tr>
            </thead>
            <tbody>
              {result.conversionSchedule?.map((c, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{c.year}</td>
                  <td className="p-2">{c.age}</td>
                  <td className="p-2">${c.conversion.toFixed(0)}</td>
                  <td className="p-2 text-red-600">${c.taxPaid.toFixed(0)}</td>
                  <td className="p-2">{c.fiveYearRuleYear}</td>
                  <td className={`p-2 ${c.canWithdrawTaxFree ? 'text-green-600 font-bold' : 'text-zinc-500'}`}>
                    {c.canWithdrawTaxFree ? 'YES' : 'NO'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Each conversion must wait 5 years before tax-free withdrawal. Start conversions early enough that 5-year rule satisfied by retirement age.
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">5-Year Rule Explanation</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>What:</strong> Each Roth conversion has its own 5-year clock. Cannot withdraw conversion amount tax-free until 5 years after conversion.</li>
          <li><strong>When:</strong> Clock starts January 1 of year conversion is made. Expires December 31 of 5th year.</li>
          <li><strong>Penalty:</strong> Withdraw before 5 years: 10% early withdrawal penalty PLUS ordinary income tax on converted amount.</li>
          <li><strong>Stacking:</strong> Multiple conversions = multiple 5-year clocks. Each conversion tracked separately.</li>
          <li><strong>Strategy:</strong> Start conversion ladder at age 50 to have tax-free access by age 55. Plan 5+ years before retirement.</li>
          <li><strong>Original Roth:</strong> Original Roth IRA contributions have separate 5-year rule (starts when first Roth opened).</li>
        </ul>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Roth Conversion Ladder Strategy</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Start Early:</strong> Begin conversions 5+ years before retirement. Ensure 5-year rule satisfied by retirement age.</li>
          <li><strong>Fill Tax Brackets:</strong> Convert amount that fills lower tax brackets. Avoid jumping into higher bracket.</li>
          <li><strong>Annual Conversions:</strong> Spread conversions over multiple years. Smaller annual amounts vs one large conversion.</li>
          <li><strong>Income Management:</strong> Convert in years with low income (between jobs, early retirement before Social Security).</li>
          <li><strong>Tax Rate Arbitrage:</strong> Convert when tax rate lower than expected retirement rate. Most beneficial if current rate 12-22%, retire rate 22-32%.</li>
          <li><strong>Early Retirement Access:</strong> Roth conversions provide early retirement income before age 59.5 (if 5-year rule met). No penalty!</li>
          <li><strong>No RMDs:</strong> Roth IRAs have no RMDs during owner lifetime. Conversions reduce future Traditional IRA RMD burden.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Conversion Considerations</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Tax Payment Source:</strong> Pay conversion tax from NON-retirement funds. Using IRA funds reduces conversion benefit.</li>
          <li><strong>Cash Flow:</strong> Need cash available to pay tax each year. Plan tax payments as part of conversion strategy.</li>
          <li><strong>ACA Premiums:</strong> Large conversion increases MAGI. May affect ACA premium subsidies if not yet 65.</li>
          <li><strong>IRMAA:</strong> Medicare premiums (IRMAA) affected by income. Large conversion may increase Medicare costs if over 63.</li>
          <li><strong>NII Tax:</strong> 3.8% Net Investment Income Tax applies if MAGI over threshold. Conversion may trigger NII tax.</li>
          <li><strong>State Tax:</strong> Some states tax conversions differently. Check state tax treatment of Roth conversions.</li>
          <li><strong>Recharacterization:</strong> Cannot recharacterize (undo) conversions since 2018 (TCJA). Conversion is permanent.</li>
          <li><strong>Estate Planning:</strong> Roth IRAs better for heirs. No tax on inherited Roth (if 5-year rule met). Consider estate benefits.</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Conversion Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Paying Tax from IRA:</strong> Using IRA funds to pay conversion tax wastes conversion benefit. Less in Roth, same tax burden.</li>
          <li><strong>Too Large Conversion:</strong> Convert too much, jump into higher tax bracket. Pay MORE tax now vs waiting.</li>
          <li><strong>Ignore 5-Year Rule:</strong> Withdraw before 5 years met. 10% penalty + income tax on conversion amount.</li>
          <li><strong>Wrong Rate Comparison:</strong> Convert when current rate HIGHER than retirement rate. Pay more tax now for no benefit.</li>
          <li><strong>Not Starting Early:</strong> Start conversions at age 58, retire at 60. 5-year rule not met, cannot access tax-free.</li>
          <li><strong>ACA/IRMAA Impact:</strong> Large conversion increases MAGI unexpectedly. ACA subsidies lost or Medicare premiums increased.</li>
          <li><strong>State Tax Surprise:</strong> Assume state follows federal. Some states have different Roth conversion treatment.</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">When Roth Conversion Makes Sense</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Tax Rate Arbitrage:</strong> Current tax rate lower than expected retirement rate. Pay tax at 12% now vs 22% later.</li>
          <li><strong>Early Retirement:</strong> Retiring before 59.5. Roth ladder provides penalty-free income if 5-year rule met.</li>
          <li><strong>Large Traditional IRA:</strong> Most retirement funds in Traditional. RMDs will be large, pushing into higher brackets.</li>
          <li><strong>No Pension:</strong> No pension income in retirement. Tax rate likely lower without pension pushing MAGI up.</li>
          <li><strong>Legacy Planning:</strong> Want tax-free inheritance for heirs. Roth better for beneficiaries than Traditional.</li>
          <li><strong>Income Gap Years:</strong> Years between work and Social Security. Low income = low tax rate = ideal conversion time.</li>
          <li><strong>Fill Lower Brackets:</strong> Have room in 10% or 12% bracket. Convert to fill bracket without jumping higher.</li>
        </ul>
      </div>
    </main>
  )
}