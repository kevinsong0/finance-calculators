'use client'

import { useState } from 'react'

export default function RothConversionTimingOptimizerCalculator() {
  const [conversionAmount, setConversionAmount] = useState(50000)
  const [currentAge, setCurrentAge] = useState(45)
  const [retirementAge, setRetirementAge] = useState(65)
  const [taxBracket, setTaxBracket] = useState(24)
  const [expectedFutureBracket, setExpectedFutureBracket] = useState(32)
  const [stateTaxRate, setStateTaxRate] = useState(5)
  const [expectedFutureStateRate, setExpectedFutureStateRate] = useState(6)
  const [incomePattern, setIncomePattern] = useState<'stable' | 'variable' | 'declining'>('variable')
  const [hasLowIncomeYear, setHasLowIncomeYear] = useState(true)
  const [lowIncomeYearBracket, setLowIncomeYearBracket] = useState(12)
  const [expectedRetirementBracket, setExpectedRetirementBracket] = useState(12)
  const [yearsToSpread, setYearsToSpread] = useState(4)
  const [growthRate, setGrowthRate] = useState(7)
  const [rothGrowth, setRothGrowth] = useState(true)

  const calculate = () => {
    // Roth Conversion Timing Optimizer
    // Key factors: current vs future tax rates, growth rate, years to retirement

    // Current conversion tax
    const currentFederalTax = conversionAmount * (taxBracket / 100)
    const currentStateTax = conversionAmount * (stateTaxRate / 100)
    const currentTotalTax = currentFederalTax + currentStateTax

    // Low income year conversion tax (if opportunity exists)
    const lowIncomeFederalTax = conversionAmount * (lowIncomeYearBracket / 100)
    const lowIncomeStateTax = conversionAmount * (stateTaxRate / 100)
    const lowIncomeTotalTax = lowIncomeFederalTax + lowIncomeStateTax

    // Tax savings from converting in low year vs current
    const taxSavingsLowYear = currentTotalTax - lowIncomeTotalTax

    // Spread conversion over years
    const spreadAmountPerYear = conversionAmount / yearsToSpread
    const spreadFederalTax = spreadAmountPerYear * (taxBracket / 100)
    const spreadStateTax = spreadAmountPerYear * (stateTaxRate / 100)
    const spreadTotalTaxPerYear = spreadFederalTax + spreadStateTax
    const spreadTotalTax = spreadTotalTaxPerYear * yearsToSpread

    // Future tax if not converted (withdrawal in retirement)
    const retirementFederalTax = conversionAmount * (expectedRetirementBracket / 100)
    const retirementStateTax = conversionAmount * (stateTaxRate / 100) // Many states tax retirement income
    const retirementTotalTax = retirementFederalTax + retirementStateTax

    // Growth comparison
    // Roth: grows tax-free
    // Traditional: grows but taxed on withdrawal
    const yearsToRetirement = retirementAge - currentAge

    // Roth growth (tax-free)
    const rothFutureValue = conversionAmount * Math.pow(1 + growthRate / 100, yearsToRetirement)
    const rothNetValue = rothFutureValue - currentTotalTax // Pay tax now, grow tax-free

    // Traditional growth (taxed later)
    const traditionalFutureValue = conversionAmount * Math.pow(1 + growthRate / 100, yearsToRetirement)
    const traditionalNetValue = traditionalFutureValue - retirementTotalTax // Grow, pay tax later

    // Net benefit of Roth conversion
    const rothBenefit = rothNetValue - traditionalNetValue

    // Break-even analysis
    // If future rate > current rate, Roth wins
    // If future rate = current rate, Roth wins due to growth on tax-paid amount

    // Effective rate comparison
    // Roth: pay X% now on amount N
    // Traditional: pay Y% later on amount N * growth
    // If Y > X, Roth better
    // But Roth also wins if Y = X (more principal grows)

    let conversionRecommendation = ''
    let optimalTiming = ''
    let optimalStrategy = ''

    // Decision logic
    const currentEffectiveRate = taxBracket + stateTaxRate
    const retirementEffectiveRate = expectedRetirementBracket + stateTaxRate

    if (hasLowIncomeYear && taxSavingsLowYear > 5000) {
      conversionRecommendation = 'Convert during low-income year for maximum tax savings'
      optimalTiming = 'Wait for low-income year opportunity'
      optimalStrategy = 'Single large conversion when bracket drops'
    } else if (currentEffectiveRate < retirementEffectiveRate) {
      conversionRecommendation = 'Convert now - current rate lower than expected retirement rate'
      optimalTiming = 'Convert this year'
      optimalStrategy = 'Single conversion now'
    } else if (yearsToSpread > 1 && incomePattern === 'variable') {
      conversionRecommendation = 'Spread conversion over multiple years to manage bracket'
      optimalTiming = 'Convert over ' + yearsToSpread + ' years'
      optimalStrategy = 'Gradual conversion spreading'
    } else if (currentEffectiveRate === retirementEffectiveRate && rothGrowth) {
      conversionRecommendation = 'Convert now - tax-free growth benefits even at same rate'
      optimalTiming = 'Convert sooner for longer growth'
      optimalStrategy = 'Early conversion for growth benefit'
    } else {
      conversionRecommendation = 'Wait - current rate may be higher than retirement rate'
      optimalTiming = 'Consider waiting until retirement'
      optimalStrategy = 'Traditional account may be better'
    }

    // Bracket management
    // Avoid pushing into next bracket
    const bracketThresholds = [
      { bracket: 10, threshold: 11600 },
      { bracket: 12, threshold: 47150 },
      { bracket: 22, threshold: 100525 },
      { bracket: 24, threshold: 191950 },
      { bracket: 32, threshold: 244725 },
      { bracket: 35, threshold: 609350 },
    ]

    // Find current bracket threshold
    const currentThreshold = bracketThresholds.find(b => b.bracket === taxBracket)
    const roomInBracket = currentThreshold ? currentThreshold.threshold : 0 // Simplified

    // Conversion strategies comparison
    const strategies = [
      {
        name: 'Single Conversion Now',
        tax: currentTotalTax.toFixed(0),
        benefit: (rothBenefit > 0 ? rothBenefit : 0).toFixed(0),
        note: 'Simple, immediate tax-free growth',
      },
      {
        name: 'Single Low-Income Year',
        tax: lowIncomeTotalTax.toFixed(0),
        benefit: (rothBenefit + taxSavingsLowYear).toFixed(0),
        note: 'Wait for low bracket opportunity',
      },
      {
        name: 'Spread Over Years',
        tax: spreadTotalTax.toFixed(0),
        benefit: 'Manage bracket risk',
        note: 'Convert $' + spreadAmountPerYear.toFixed(0) + ' per year',
      },
    ]

    // Roth vs Traditional comparison
    const comparison = {
      roth: {
        label: 'Roth Conversion',
        futureValue: rothFutureValue.toFixed(0),
        taxPaid: currentTotalTax.toFixed(0),
        netValue: rothNetValue.toFixed(0),
      },
      traditional: {
        label: 'Traditional (No Conversion)',
        futureValue: traditionalFutureValue.toFixed(0),
        taxPaid: retirementTotalTax.toFixed(0),
        netValue: traditionalNetValue.toFixed(0),
      },
      benefit: rothBenefit.toFixed(0),
      rothWins: rothBenefit > 0,
    }

    // Key timing factors
    const timingFactors = [
      'Current tax bracket vs expected retirement bracket',
      'State tax rates (current vs retirement state)',
      'Income variability opportunities',
      'Years until retirement for growth',
      'Expected investment returns',
      'RMD considerations after 73',
    ]

    return {
      conversionAmount: conversionAmount.toFixed(0),
      currentAge: currentAge.toFixed(0),
      retirementAge: retirementAge.toFixed(0),
      yearsToRetirement: yearsToRetirement.toFixed(0),
      taxBracket: taxBracket.toFixed(0),
      expectedRetirementBracket: expectedRetirementBracket.toFixed(0),
      stateTaxRate: stateTaxRate.toFixed(0),
      currentEffectiveRate: currentEffectiveRate.toFixed(0),
      retirementEffectiveRate: retirementEffectiveRate.toFixed(0),
      currentFederalTax: currentFederalTax.toFixed(0),
      currentStateTax: currentStateTax.toFixed(0),
      currentTotalTax: currentTotalTax.toFixed(0),
      hasLowIncomeYear,
      lowIncomeYearBracket: lowIncomeYearBracket.toFixed(0),
      lowIncomeTotalTax: lowIncomeTotalTax.toFixed(0),
      taxSavingsLowYear: taxSavingsLowYear.toFixed(0),
      yearsToSpread: yearsToSpread.toFixed(0),
      spreadAmountPerYear: spreadAmountPerYear.toFixed(0),
      spreadTotalTax: spreadTotalTax.toFixed(0),
      retirementFederalTax: retirementFederalTax.toFixed(0),
      retirementTotalTax: retirementTotalTax.toFixed(0),
      growthRate: growthRate.toFixed(0),
      rothFutureValue: rothFutureValue.toFixed(0),
      rothNetValue: rothNetValue.toFixed(0),
      traditionalFutureValue: traditionalFutureValue.toFixed(0),
      traditionalNetValue: traditionalNetValue.toFixed(0),
      rothBenefit: rothBenefit.toFixed(0),
      conversionRecommendation,
      optimalTiming,
      optimalStrategy,
      strategies,
      comparison,
      timingFactors,
      incomePattern,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Roth Conversion Timing Optimizer</h1>
      <p className="text-gray-600 mb-4">Optimize Roth conversion timing for maximum tax savings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Conversion Amount</label>
          <input type="number" value={conversionAmount} onChange={(e) => setConversionAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="18" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <input type="number" value={retirementAge} min="55" max="75" onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Tax Bracket (%)</label>
          <input type="number" value={taxBracket} min="10" max="37" onChange={(e) => setTaxBracket(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Retirement Bracket (%)</label>
          <input type="number" value={expectedRetirementBracket} min="0" max="37" onChange={(e) => setExpectedRetirementBracket(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateTaxRate} min="0" max="15" onChange={(e) => setStateTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Growth Rate (%)</label>
          <input type="number" value={growthRate} min="0" max="15" onChange={(e) => setGrowthRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has Low-Income Year Opportunity?</label>
          <select value={hasLowIncomeYear ? 'yes' : 'no'} onChange={(e) => setHasLowIncomeYear(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - expect low bracket year</option>
          </select>
        </div>
        {hasLowIncomeYear && (
          <div>
            <label className="block text-sm font-medium mb-1">Low Year Bracket (%)</label>
            <input type="number" value={lowIncomeYearBracket} min="10" max="37" onChange={(e) => setLowIncomeYearBracket(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Income Pattern</label>
          <select value={incomePattern} onChange={(e) => setIncomePattern(e.target.value as 'stable' | 'variable' | 'declining')} className="w-full border rounded p-2">
            <option value="stable">Stable - consistent income</option>
            <option value="variable">Variable - fluctuates yearly</option>
            <option value="declining">Declining - reducing over time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spread Over Years</label>
          <input type="number" value={yearsToSpread} min="1" max="10" onChange={(e) => setYearsToSpread(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.rothBenefit) > 0 ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.rothBenefit) > 0 ? 'text-green-700' : 'text-orange-700'}`}>Conversion Recommendation</h2>
        <div className="text-sm font-medium mb-2">{result.conversionRecommendation}</div>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Optimal Timing:</span><span className="font-bold ml-2">{result.optimalTiming}</span></div>
          <div><span className="text-zinc-600">Strategy:</span><span className="font-bold ml-2">{result.optimalStrategy}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Decision based on current vs retirement brackets, growth, and timing.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Rate Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Current Rate:</span><span className="font-bold ml-2">{result.currentEffectiveRate}%</span></div>
          <div><span className="text-zinc-600">Retirement Rate:</span><span className="font-bold ml-2">{result.retirementEffectiveRate}%</span></div>
          <div><span className="text-zinc-600">Years to Retire:</span><span className="font-medium ml-2">{result.yearsToRetirement}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Convert when current rate &lt; expected retirement rate for tax savings.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Current Conversion Tax</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Amount:</span><span className="font-medium ml-2">$ {result.conversionAmount}</span></div>
          <div><span className="text-zinc-600">Federal:</span><span className="font-bold text-blue-700 ml-2">$ {result.currentFederalTax}</span></div>
          <div><span className="text-zinc-600">State:</span><span className="font-medium ml-2">$ {result.currentStateTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.currentTotalTax}</span></div>
          <div><span className="text-zinc-600">Bracket:</span><span className="font-medium ml-2">{result.taxBracket}%</span></div>
        </div>
      </div>

      {result.hasLowIncomeYear && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Low-Income Year Opportunity</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Low Bracket:</span><span className="font-bold text-green-700 ml-2">{result.lowIncomeYearBracket}%</span></div>
            <div><span className="text-zinc-600">Low Year Tax:</span><span className="font-bold ml-2">$ {result.lowIncomeTotalTax}</span></div>
            <div><span className="text-zinc-600">Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavingsLowYear}</span></div>
          </div>
          <div className="text-xs text-green-600 mt-2">Wait for low-income year to convert at lower bracket - significant savings.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Roth vs Traditional Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Strategy</th>
                <th className="py-2 text-left">Future Value</th>
                <th className="py-2 text-left">Tax Paid</th>
                <th className="py-2 text-left">Net Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-1 font-semibold">{result.comparison.roth.label}</td>
                <td className="py-1">$ {result.comparison.roth.futureValue}</td>
                <td className="py-1">$ {result.comparison.roth.taxPaid}</td>
                <td className="py-1 font-bold text-purple-700">$ {result.comparison.roth.netValue}</td>
              </tr>
              <tr className="border-b">
                <td className="py-1 font-semibold">{result.comparison.traditional.label}</td>
                <td className="py-1">$ {result.comparison.traditional.futureValue}</td>
                <td className="py-1">$ {result.comparison.traditional.taxPaid}</td>
                <td className="py-1">$ {result.comparison.traditional.netValue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Roth Benefit:</span><span className={`font-bold ml-2 ${Number(result.rothBenefit) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.rothBenefit}</span></div>
          <div><span className="text-zinc-600">Roth Wins:</span><span className={`font-bold ml-2 ${result.comparison.rothWins ? 'text-green-700' : 'text-red-700'}`}>{result.comparison.rothWins ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Roth benefits: tax-free growth + no RMDs. Even at same rates, Roth may win.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Strategy</th>
                <th className="py-2 text-left">Tax Cost</th>
                <th className="py-2 text-left">Benefit</th>
                <th className="py-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {result.strategies.map((strat) => (
                <tr key={strat.name} className="border-b">
                  <td className="py-1 font-semibold">{strat.name}</td>
                  <td className="py-1">$ {strat.tax}</td>
                  <td className="py-1">$ {strat.benefit}</td>
                  <td className="py-1">{strat.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Choose strategy based on income pattern and bracket management.</div>
      </div>

      {Number(result.yearsToSpread) > 1 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Spread Conversion Analysis</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Per Year:</span><span className="font-bold ml-2">$ {result.spreadAmountPerYear}</span></div>
            <div><span className="text-zinc-600">Years:</span><span className="font-medium ml-2">{result.yearsToSpread}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold ml-2">$ {result.spreadTotalTax}</span></div>
            <div><span className="text-zinc-600">vs Single:</span><span className="font-medium ml-2">$ {result.currentTotalTax}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Spreading manages bracket risk. May avoid pushing into higher bracket.</div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Key Timing Factors</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.timingFactors.map((factor, i) => (
            <li key={i}>{factor}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Roth Timing Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Convert when current &lt; future rate</li>
          <li>Low-income years: opportunity</li>
          <li>Spread to manage brackets</li>
          <li>Tax-free growth benefits</li>
          <li>No RMDs on Roth</li>
          <li>5-year rule applies</li>
          <li>State taxes matter too</li>
          <li>Consider income pattern</li>
          <li>Years to retirement</li>
          <li>Cannot recharacterize</li>
        </ul>
      </div>
    </div>
  )
}