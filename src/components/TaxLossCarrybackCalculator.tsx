'use client'

import { useState } from 'react'

export default function TaxLossCarrybackCalculator() {
  const [netOperatingLoss, setNetOperatingLoss] = useState(100000)
  const [lossYear, setLossYear] = useState(2024)
  const [carrybackYears, setCarrybackYears] = useState(2)
  const [carryforwardYears, setCarryforwardYears] = useState(20)
  const [priorYearIncome, setPriorYearIncome] = useState<Record<number, number>>({ 2022: 80000, 2023: 90000 })
  const [expectedFutureIncome, setExpectedFutureIncome] = useState<Record<number, number>>({ 2025: 120000, 2026: 150000, 2027: 180000 })
  const [taxRate, setTaxRate] = useState(24)

  const calculate = () => {
    // Tax Loss Carryback vs Carryforward Analysis
    // NOL can be carried back (limited) or carried forward

    // TCJA 2017: NOL carryback eliminated for most (except farming/insurance)
    // Carryforward limited to 80% of taxable income

    // CARES Act 2020: Temporary 5-year carryback for 2018-2020 NOLs
    // 100% offset allowed (no 80% limit)

    // Current rules (post-CARES):
    // - No carryback (2-year for farming only)
    // - Carryforward unlimited years
    // - 80% of taxable income limit per year

    const nol = netOperatingLoss
    const priorYears = Object.entries(priorYearIncome).map(([year, income]) => ({ year: parseInt(year), income }))
    const futureYears = Object.entries(expectedFutureIncome).map(([year, income]) => ({ year: parseInt(year), income }))

    // Carryback calculation (if allowed)
    let carrybackUsed = 0
    let carrybackRefund = 0
    const carrybackApplied: { year: number; income: number; nolApplied: number; refund: number }[] = []

    // Sort prior years descending (most recent first)
    const sortedPriorYears = priorYears.sort((a, b) => b.year - a.year).slice(0, carrybackYears)

    for (const yearData of sortedPriorYears) {
      const availableNol = nol - carrybackUsed
      const nolApplied = Math.min(availableNol, yearData.income)
      const refund = nolApplied * (taxRate / 100)
      carrybackApplied.push({
        year: yearData.year,
        income: yearData.income,
        nolApplied: nolApplied,
        refund: refund,
      })
      carrybackUsed += nolApplied
      carrybackRefund += refund
      if (carrybackUsed >= nol) break
    }

    const remainingNolCarryback = nol - carrybackUsed

    // Carryforward calculation (80% limit)
    let carryforwardUsed = 0
    let carryforwardSavings = 0
    const carryforwardApplied: { year: number; income: number; taxableIncome: number; nolApplied: number; savings: number }[] = []

    for (const yearData of futureYears) {
      const availableNol = remainingNolCarryback > 0 ? remainingNolCarryback : (nol - carryforwardUsed)
      // 80% limit: NOL can offset up to 80% of taxable income
      const maxOffset = yearData.income * 0.8
      const taxableIncome = yearData.income - maxOffset
      const nolApplied = Math.min(availableNol, maxOffset)
      const savings = nolApplied * (taxRate / 100)

      carryforwardApplied.push({
        year: yearData.year,
        income: yearData.income,
        taxableIncome: taxableIncome,
        nolApplied: nolApplied,
        savings: savings,
      })
      carryforwardUsed += nolApplied
      carryforwardSavings += savings
      if (carryforwardUsed >= nol) break
    }

    const totalNolUsed = carrybackUsed + carryforwardUsed
    const remainingNol = nol - totalNolUsed

    // Pure carryforward scenario (no carryback)
    let pureCarryforwardUsed = 0
    let pureCarryforwardSavings = 0
    const pureCarryforwardApplied: { year: number; nolApplied: number; savings: number }[] = []

    for (const yearData of futureYears) {
      const availableNol = nol - pureCarryforwardUsed
      const maxOffset = yearData.income * 0.8
      const nolApplied = Math.min(availableNol, maxOffset)
      const savings = nolApplied * (taxRate / 100)
      pureCarryforwardApplied.push({
        year: yearData.year,
        nolApplied: nolApplied,
        savings: savings,
      })
      pureCarryforwardUsed += nolApplied
      pureCarryforwardSavings += savings
      if (pureCarryforwardUsed >= nol) break
    }

    // Compare strategies
    const carrybackStrategy = {
      name: 'Carryback + Carryforward',
      immediateRefund: carrybackRefund,
      futureSavings: carryforwardSavings,
      totalBenefit: carrybackRefund + carryforwardSavings,
    }

    const carryforwardOnlyStrategy = {
      name: 'Carryforward Only',
      immediateRefund: 0,
      futureSavings: pureCarryforwardSavings,
      totalBenefit: pureCarryforwardSavings,
    }

    // Recommendation
    let recommendedStrategy = ''
    let recommendation = ''

    if (carrybackYears > 0 && carrybackRefund > 0) {
      recommendedStrategy = 'Carryback Available'
      recommendation = `Carryback generates immediate refund of $${carrybackRefund.toFixed(0)}. Consider electing carryback if allowed.`
    } else {
      recommendedStrategy = 'Carryforward Only'
      recommendation = 'No carryback available under current rules. NOL carries forward indefinitely with 80% income limit.'
    }

    // Time value of money consideration
    const refundPresentValue = carrybackRefund // Immediate
    const savingsPresentValue = carryforwardSavings * 0.85 // Discounted for future

    // Rules explanation
    const rulesExplanation = {
      tcja: 'TCJA 2017 eliminated 2-year carryback, limited carryforward to 80%',
      cares: 'CARES Act 2020 allowed 5-year carryback for 2018-2020 NOLs',
      current: 'Current: No carryback, unlimited carryforward years, 80% limit',
      farming: 'Farming businesses: 2-year carryback still allowed',
      insurance: 'Insurance companies: Special NOL rules apply',
    }

    // Election considerations
    const electionNote = carrybackYears > 0
      ? 'File Form 1045 or 1139 for quick carryback refund (within 12 months of loss year)'
      : 'No carryback election needed - carryforward automatic'

    return {
      netOperatingLoss: netOperatingLoss.toFixed(0),
      lossYear: lossYear.toFixed(0),
      carrybackYears: carrybackYears.toFixed(0),
      carryforwardYears: carryforwardYears.toFixed(0),
      taxRate: taxRate.toFixed(0),
      carrybackApplied,
      carrybackUsed: carrybackUsed.toFixed(0),
      carrybackRefund: carrybackRefund.toFixed(0),
      remainingNolCarryback: remainingNolCarryback.toFixed(0),
      carryforwardApplied,
      carryforwardUsed: carryforwardUsed.toFixed(0),
      carryforwardSavings: carryforwardSavings.toFixed(0),
      totalNolUsed: totalNolUsed.toFixed(0),
      remainingNol: remainingNol.toFixed(0),
      pureCarryforwardApplied,
      pureCarryforwardSavings: pureCarryforwardSavings.toFixed(0),
      carrybackStrategy,
      carryforwardOnlyStrategy,
      recommendedStrategy,
      recommendation,
      refundPresentValue: refundPresentValue.toFixed(0),
      savingsPresentValue: savingsPresentValue.toFixed(0),
      rulesExplanation,
      electionNote,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Loss Carryback Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate NOL carryback refund and carryforward benefits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Net Operating Loss</label>
          <input type="number" value={netOperatingLoss} onChange={(e) => setNetOperatingLoss(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loss Year</label>
          <input type="number" value={lossYear} min="2018" max="2030" onChange={(e) => setLossYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Carryback Years (0, 2, or 5)</label>
          <select value={carrybackYears} onChange={(e) => setCarrybackYears(Number(e.target.value))} className="w-full border rounded p-2">
            <option value={0}>0 years (standard - no carryback)</option>
            <option value={2}>2 years (farming business)</option>
            <option value={5}>5 years (CARES Act 2018-2020 NOLs)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
          <input type="number" value={taxRate} min="10" max="37" onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Income (Loss-2)</label>
          <input type="number" value={priorYearIncome[lossYear - 2] || 0} onChange={(e) => setPriorYearIncome(prev => ({ ...prev, [lossYear - 2]: Number(e.target.value) }))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Income (Loss-1)</label>
          <input type="number" value={priorYearIncome[lossYear - 1] || 0} onChange={(e) => setPriorYearIncome(prev => ({ ...prev, [lossYear - 1]: Number(e.target.value) }))} className="w-full border rounded p-2" />
        </div>
      </div>

      {carrybackYears > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Carryback Refund</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">NOL Applied:</span><span className="font-bold ml-2">$ {result.carrybackUsed}</span></div>
            <div><span className="text-zinc-600">Immediate Refund:</span><span className="font-bold text-green-700 ml-2">$ {result.carrybackRefund}</span></div>
            <div><span className="text-zinc-600">Remaining NOL:</span><span className="font-medium ml-2">$ {result.remainingNolCarryback}</span></div>
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Year</th>
                  <th className="py-2 text-left">Income</th>
                  <th className="py-2 text-left">NOL Applied</th>
                  <th className="py-2 text-left">Refund</th>
                </tr>
              </thead>
              <tbody>
                {result.carrybackApplied.map((item) => (
                  <tr key={item.year} className="border-b">
                    <td className="py-1">{item.year}</td>
                    <td className="py-1">$ {item.income.toFixed(0)}</td>
                    <td className="py-1">$ {item.nolApplied.toFixed(0)}</td>
                    <td className="py-1 font-semibold">$ {item.refund.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-zinc-600 mt-2">{result.electionNote}</div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Carryforward Utilization (80% Limit)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">NOL Applied:</span><span className="font-bold ml-2">$ {result.carryforwardUsed}</span></div>
          <div><span className="text-zinc-600">Future Savings:</span><span className="font-bold text-blue-700 ml-2">$ {result.carryforwardSavings}</span></div>
          <div><span className="text-zinc-600">Remaining NOL:</span><span className="font-medium ml-2">$ {result.remainingNol}</span></div>
        </div>
        <div className="overflow-x-auto mt-3">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Income</th>
                <th className="py-2 text-left">Taxable (80% limit)</th>
                <th className="py-2 text-left">NOL Applied</th>
                <th className="py-2 text-left">Savings</th>
              </tr>
            </thead>
            <tbody>
              {result.carryforwardApplied.map((item) => (
                <tr key={item.year} className="border-b">
                  <td className="py-1">{item.year}</td>
                  <td className="py-1">$ {item.income.toFixed(0)}</td>
                  <td className="py-1">$ {item.taxableIncome.toFixed(0)}</td>
                  <td className="py-1">$ {item.nolApplied.toFixed(0)}</td>
                  <td className="py-1 font-semibold">$ {item.savings.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Carryforward can offset up to 80% of taxable income each year.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Strategy Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-purple-700 mb-1">Carryback + Forward</div>
            <div className="text-xs text-zinc-600">
              <div>Immediate: $ {result.carrybackStrategy.immediateRefund.toFixed(0)}</div>
              <div>Future: $ {result.carrybackStrategy.futureSavings.toFixed(0)}</div>
              <div className="font-bold mt-1">Total: $ {result.carrybackStrategy.totalBenefit.toFixed(0)}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 mb-1">Carryforward Only</div>
            <div className="text-xs text-zinc-600">
              <div>Immediate: $ {result.carryforwardOnlyStrategy.immediateRefund.toFixed(0)}</div>
              <div>Future: $ {result.carryforwardOnlyStrategy.futureSavings.toFixed(0)}</div>
              <div className="font-bold mt-1">Total: $ {result.carryforwardOnlyStrategy.totalBenefit.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${carrybackYears > 0 && Number(result.carrybackRefund) > 0 ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommended Strategy</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Strategy:</span><span className="font-bold ml-2">{result.recommendedStrategy}</span></div>
          <div><span className="text-zinc-600">PV Refund:</span><span className="font-medium ml-2">$ {result.refundPresentValue}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">NOL Rules</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">TCJA 2017:</span> {result.rulesExplanation.tcja}</div>
          <div><span className="font-semibold">CARES Act:</span> {result.rulesExplanation.cares}</div>
          <div><span className="font-semibold">Current:</span> {result.rulesExplanation.current}</div>
          <div><span className="font-semibold">Farming:</span> {result.rulesExplanation.farming}</div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">NOL Carryback/Forward Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Standard: no carryback, unlimited forward</li>
          <li>Farming: 2-year carryback allowed</li>
          <li>80% limit on carryforward offset</li>
          <li>Form 1045 for quick carryback refund</li>
          <li>Time value: immediate refund preferred</li>
          <li>Track NOL expiration carefully</li>
          <li>State rules may differ</li>
          <li>Consult tax professional</li>
        </ul>
      </div>
    </div>
  )
}