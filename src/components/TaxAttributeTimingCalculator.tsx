'use client'

import { useState } from 'react'

export default function TaxAttributeTimingCalculator() {
  const [currentTaxRate, setCurrentTaxRate] = useState(24)
  const [futureTaxRate, setFutureTaxRate] = useState(32)
  const [incomeAmount, setIncomeAmount] = useState(100000)
  const [gainAmount, setGainAmount] = useState(50000)
  const [deductionAmount, setDeductionAmount] = useState(20000)
  const [timingStrategy, setTimingStrategy] = useState<'accelerate_income' | 'defer_income' | 'accelerate_deduction' | 'defer_deduction'>('defer_income')
  const [planningYear, setPlanningYear] = useState(2025)
  const [targetYear, setTargetYear] = useState(2026)

  const calculate = () => {
    // Tax Attribute Timing Calculator
    // Compare tax impact of timing strategies

    // Strategies:
    // 1. Accelerate income - recognize income in current lower-tax year
    // 2. Defer income - delay income recognition to future year
    // 3. Accelerate deduction - claim deduction in current higher-tax year
    // 4. Defer deduction - delay deduction to future higher-tax year

    // Current year tax impact
    const currentIncomeTax = incomeAmount * (currentTaxRate / 100)
    const currentGainTax = gainAmount * (currentTaxRate / 100)
    const currentDeductionSavings = deductionAmount * (currentTaxRate / 100)
    const currentNetTax = currentIncomeTax + currentGainTax - currentDeductionSavings

    // Future year tax impact
    const futureIncomeTax = incomeAmount * (futureTaxRate / 100)
    const futureGainTax = gainAmount * (futureTaxRate / 100)
    const futureDeductionSavings = deductionAmount * (futureTaxRate / 100)
    const futureNetTax = futureIncomeTax + futureGainTax - futureDeductionSavings

    // Calculate strategy impact
    let strategyTaxSavings = 0
    let strategyDescription = ''
    let currentYearTax = 0
    let targetYearTax = 0

    if (timingStrategy === 'accelerate_income') {
      // Move income from future (higher rate) to current (lower rate)
      const taxRateDiff = futureTaxRate - currentTaxRate
      strategyTaxSavings = incomeAmount * (taxRateDiff / 100)
      currentYearTax = currentIncomeTax + currentGainTax
      targetYearTax = futureGainTax - futureDeductionSavings
      strategyDescription = `Accelerate $${incomeAmount.toFixed(0)} income from ${targetYear} (${futureTaxRate}%) to ${planningYear} (${currentTaxRate}%). Tax savings: $${strategyTaxSavings.toFixed(0)}. Current year tax: $${currentYearTax.toFixed(0)}.`
    } else if (timingStrategy === 'defer_income') {
      // Move income from current to future (if future rate lower)
      const taxRateDiff = currentTaxRate - futureTaxRate
      if (taxRateDiff > 0) {
        strategyTaxSavings = incomeAmount * (taxRateDiff / 100)
      } else {
        strategyTaxSavings = -incomeAmount * Math.abs(taxRateDiff) / 100
      }
      currentYearTax = currentGainTax - currentDeductionSavings
      targetYearTax = futureIncomeTax + futureGainTax
      strategyDescription = `Defer $${incomeAmount.toFixed(0)} income from ${planningYear} (${currentTaxRate}%) to ${targetYear} (${futureTaxRate}%). Tax impact: $${strategyTaxSavings.toFixed(0)}. Deferred income taxed at future rate.`
    } else if (timingStrategy === 'accelerate_deduction') {
      // Move deduction from future to current (if current rate higher)
      const taxRateDiff = currentTaxRate - futureTaxRate
      if (taxRateDiff > 0) {
        strategyTaxSavings = deductionAmount * (taxRateDiff / 100)
      } else {
        strategyTaxSavings = -deductionAmount * Math.abs(taxRateDiff) / 100
      }
      currentYearTax = currentIncomeTax + currentGainTax - currentDeductionSavings
      targetYearTax = futureIncomeTax + futureGainTax
      strategyDescription = `Accelerate $${deductionAmount.toFixed(0)} deduction from ${targetYear} to ${planningYear}. Tax impact: $${strategyTaxSavings.toFixed(0)}. Deduction worth more at ${currentTaxRate}% vs ${futureTaxRate}%.`
    } else if (timingStrategy === 'defer_deduction') {
      // Move deduction from current to future (if future rate higher)
      const taxRateDiff = futureTaxRate - currentTaxRate
      strategyTaxSavings = deductionAmount * (taxRateDiff / 100)
      currentYearTax = currentIncomeTax + currentGainTax
      targetYearTax = futureIncomeTax + futureGainTax - futureDeductionSavings
      strategyDescription = `Defer $${deductionAmount.toFixed(0)} deduction from ${planningYear} (${currentTaxRate}%) to ${targetYear} (${futureTaxRate}%). Tax savings: $${strategyTaxSavings.toFixed(0)}. Deduction worth more at higher future rate.`
    }

    // Total tax comparison
    const totalCurrentYearNoStrategy = currentNetTax
    const totalTargetYearNoStrategy = futureNetTax
    const totalWithStrategy = currentYearTax + targetYearTax
    const totalNoStrategy = totalCurrentYearNoStrategy + totalTargetYearNoStrategy
    const netBenefit = totalNoStrategy - totalWithStrategy

    // Opportunity cost (time value of money)
    const discountRate = 0.05 // 5% annual
    const pvOfFutureTax = futureNetTax / (1 + discountRate)
    const pvBenefit = netBenefit > 0 ? netBenefit / (1 + discountRate) : 0

    // Recommendation
    let recommendation = strategyDescription
    if (netBenefit > 500) {
      recommendation += ` Recommended strategy. Total tax savings: $${netBenefit.toFixed(0)}. Present value benefit: $${pvBenefit.toFixed(0)} considering 5% discount rate.`
    } else if (netBenefit < -500) {
      recommendation += ` WARNING: Strategy increases total tax by $${Math.abs(netBenefit).toFixed(0)}. Consider opposite timing strategy.`
    } else {
      recommendation += ` Minimal impact ($${Math.abs(netBenefit).toFixed(0)}). Timing strategy not significant. Focus on other tax planning opportunities.`
    }

    // Strategy comparison table
    const strategyComparison = [
      { strategy: 'Accelerate Income', condition: 'Future rate &gt; current', benefit: incomeAmount * Math.max(0, futureTaxRate - currentTaxRate) / 100 },
      { strategy: 'Defer Income', condition: 'Current rate &gt; future', benefit: incomeAmount * Math.max(0, currentTaxRate - futureTaxRate) / 100 },
      { strategy: 'Accelerate Deduction', condition: 'Current rate &gt; future', benefit: deductionAmount * Math.max(0, currentTaxRate - futureTaxRate) / 100 },
      { strategy: 'Defer Deduction', condition: 'Future rate &gt; current', benefit: deductionAmount * Math.max(0, futureTaxRate - currentTaxRate) / 100 },
    ]

    return {
      currentTaxRate: currentTaxRate.toFixed(0),
      futureTaxRate: futureTaxRate.toFixed(0),
      incomeAmount: incomeAmount.toFixed(0),
      gainAmount: gainAmount.toFixed(0),
      deductionAmount: deductionAmount.toFixed(0),
      timingStrategy,
      planningYear,
      targetYear,
      currentIncomeTax: currentIncomeTax.toFixed(0),
      futureIncomeTax: futureIncomeTax.toFixed(0),
      currentDeductionSavings: currentDeductionSavings.toFixed(0),
      futureDeductionSavings: futureDeductionSavings.toFixed(0),
      currentNetTax: currentNetTax.toFixed(0),
      futureNetTax: futureNetTax.toFixed(0),
      strategyTaxSavings: strategyTaxSavings.toFixed(0),
      currentYearTax: currentYearTax.toFixed(0),
      targetYearTax: targetYearTax.toFixed(0),
      totalWithStrategy: totalWithStrategy.toFixed(0),
      totalNoStrategy: totalNoStrategy.toFixed(0),
      netBenefit: netBenefit.toFixed(0),
      pvBenefit: pvBenefit.toFixed(0),
      strategyComparison,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Attribute Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Compare tax impact of timing strategies for income and deductions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Tax Rate (%)</label>
          <input type="number" value={currentTaxRate} onChange={(e) => setCurrentTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Future Tax Rate (%)</label>
          <input type="number" value={futureTaxRate} onChange={(e) => setFutureTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income Amount</label>
          <input type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capital Gain Amount</label>
          <input type="number" value={gainAmount} onChange={(e) => setGainAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deduction Amount</label>
          <input type="number" value={deductionAmount} onChange={(e) => setDeductionAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Timing Strategy</label>
          <select value={timingStrategy} onChange={(e) => setTimingStrategy(e.target.value as 'accelerate_income' | 'defer_income' | 'accelerate_deduction' | 'defer_deduction')} className="w-full border rounded p-2">
            <option value="accelerate_income">Accelerate Income</option>
            <option value="defer_income">Defer Income</option>
            <option value="accelerate_deduction">Accelerate Deduction</option>
            <option value="defer_deduction">Defer Deduction</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Planning Year</label>
          <input type="number" value={planningYear} onChange={(e) => setPlanningYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target Year</label>
          <input type="number" value={targetYear} onChange={(e) => setTargetYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Strategy</th>
                <th className="py-2 text-left">When Beneficial</th>
                <th className="py-2 text-left">Potential Savings</th>
              </tr>
            </thead>
            <tbody>
              {result.strategyComparison.map((s) => (
                <tr key={s.strategy} className="border-b">
                  <td className="py-1 font-semibold">{s.strategy}</td>
                  <td className="py-1">{s.condition}</td>
                  <td className="py-1 font-bold text-green-700">$ {s.benefit.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Rate Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">{result.planningYear} Rate:</span><span className="font-medium ml-2">{result.currentTaxRate}%</span></div>
          <div><span className="text-zinc-600">{result.targetYear} Rate:</span><span className="font-medium ml-2">{result.futureTaxRate}%</span></div>
          <div><span className="text-zinc-600">Rate Diff:</span><span className={`font-bold ml-2 ${Number(result.futureTaxRate) > Number(result.currentTaxRate) ? 'text-green-700' : 'text-red-700'}`}>{Number(result.futureTaxRate) - Number(result.currentTaxRate)}%</span></div>
          <div><span className="text-zinc-600">Income:</span><span className="font-medium ml-2">$ {result.incomeAmount}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Year-by-Year Tax Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r">
            <h3 className="font-semibold mb-2">{result.planningYear} (Current)</h3>
            <div><span className="text-zinc-600">Income Tax:</span><span className="font-medium ml-2">$ {result.currentIncomeTax}</span></div>
            <div><span className="text-zinc-600">Deduction Savings:</span><span className="font-medium text-green-700 ml-2">$ {result.currentDeductionSavings}</span></div>
            <div><span className="text-zinc-600">Net Tax:</span><span className="font-bold ml-2">$ {result.currentNetTax}</span></div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{result.targetYear} (Future)</h3>
            <div><span className="text-zinc-600">Income Tax:</span><span className="font-medium ml-2">$ {result.futureIncomeTax}</span></div>
            <div><span className="text-zinc-600">Deduction Savings:</span><span className="font-medium text-green-700 ml-2">$ {result.futureDeductionSavings}</span></div>
            <div><span className="text-zinc-600">Net Tax:</span><span className="font-bold ml-2">$ {result.futureNetTax}</span></div>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Strategy Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Strategy Savings:</span><span className={`font-bold ml-2 ${Number(result.strategyTaxSavings) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.strategyTaxSavings}</span></div>
          <div><span className="text-zinc-600">Total w/ Strategy:</span><span className="font-medium ml-2">$ {result.totalWithStrategy}</span></div>
          <div><span className="text-zinc-600">Total w/o Strategy:</span><span className="font-medium ml-2">$ {result.totalNoStrategy}</span></div>
          <div><span className="text-zinc-600">Net Benefit:</span><span className={`font-bold ml-2 ${Number(result.netBenefit) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.netBenefit}</span></div>
          <div><span className="text-zinc-600">PV Benefit (5%):</span><span className="font-bold text-green-700 ml-2">$ {result.pvBenefit}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.netBenefit) > 0 ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Timing Strategy Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Accelerate income when future rate higher</li>
          <li>Defer income when current rate higher</li>
          <li>Accelerate deductions at higher rates</li>
          <li>Defer deductions to higher-rate years</li>
          <li>Consider time value of money</li>
          <li>Bracket management is key</li>
          <li>Bunching deductions strategy</li>
          <li>Roth conversion timing</li>
          <li>Stock sale timing for gains</li>
          <li>Charitable donation timing</li>
        </ul>
      </div>
    </div>
  )
}