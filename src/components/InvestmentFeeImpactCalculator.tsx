'use client'

import { useState } from 'react'

export default function InvestmentFeeImpactCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [annualFee, setAnnualFee] = useState(1)
  const [investmentYears, setInvestmentYears] = useState(30)
  const [comparisonFee, setComparisonFee] = useState(0.25)

  const calculate = () => {
    const years = investmentYears

    // Portfolio with higher fee
    const netReturnHighFee = annualReturn - annualFee
    const finalValueHighFee = initialInvestment * Math.pow(1 + netReturnHighFee / 100, years)

    // Portfolio with lower fee
    const netReturnLowFee = annualReturn - comparisonFee
    const finalValueLowFee = initialInvestment * Math.pow(1 + netReturnLowFee / 100, years)

    // Difference
    const valueDifference = finalValueLowFee - finalValueHighFee

    // Total fees paid over period
    const totalFeesHighFee = initialInvestment * annualFee / 100 * years // Simplified estimate
    const totalFeesLowFee = initialInvestment * comparisonFee / 100 * years

    // Cumulative fee impact
    const cumulativeFeeImpact = valueDifference

    // Fee drag percentage
    const feeDragPercent = (valueDifference / finalValueLowFee) * 100

    // Annual fee cost
    const annualFeeDollarHigh = initialInvestment * annualFee / 100
    const annualFeeDollarLow = initialInvestment * comparisonFee / 100

    // 1% fee over 30 years scenario
    const fee1Percent30Years = initialInvestment * Math.pow(1 + (annualReturn - 1) / 100, 30)
    const fee0Percent30Years = initialInvestment * Math.pow(1 + annualReturn / 100, 30)
    const feeImpact1Percent30Years = fee0Percent30Years - fee1Percent30Years

    // Year-by-year breakdown (first 10 years)
    const yearByYear = []
    for (let y = 1; y <= Math.min(years, 10); y++) {
      const highFeeValue = initialInvestment * Math.pow(1 + netReturnHighFee / 100, y)
      const lowFeeValue = initialInvestment * Math.pow(1 + netReturnLowFee / 100, y)
      yearByYear.push({
        year: y,
        highFeeValue: highFeeValue.toFixed(0),
        lowFeeValue: lowFeeValue.toFixed(0),
        difference: (lowFeeValue - highFeeValue).toFixed(0),
      })
    }

    return {
      initialInvestment: initialInvestment.toFixed(0),
      annualReturn: annualReturn.toFixed(1),
      annualFee: annualFee.toFixed(2),
      comparisonFee: comparisonFee.toFixed(2),
      investmentYears: years.toFixed(0),
      netReturnHighFee: netReturnHighFee.toFixed(1),
      netReturnLowFee: netReturnLowFee.toFixed(1),
      finalValueHighFee: finalValueHighFee.toFixed(0),
      finalValueLowFee: finalValueLowFee.toFixed(0),
      valueDifference: valueDifference.toFixed(0),
      feeDragPercent: feeDragPercent.toFixed(1),
      annualFeeDollarHigh: annualFeeDollarHigh.toFixed(0),
      annualFeeDollarLow: annualFeeDollarLow.toFixed(0),
      feeImpact1Percent30Years: feeImpact1Percent30Years.toFixed(0),
      cumulativeFeeImpact: cumulativeFeeImpact.toFixed(0),
      yearByYear,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Investment Fee Impact Calculator</h1>
      <p className="text-gray-600 mb-4">See how fees erode your investment returns over time.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Initial Investment ($)</label>
          <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Annual Return (%)</label>
          <input type="number" value={annualReturn} step="0.5" onChange={(e) => setAnnualReturn(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Annual Fee (%)</label>
          <input type="number" value={annualFee} step="0.1" min="0" max="5" onChange={(e) => setAnnualFee(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Comparison/Low Fee (%)</label>
          <input type="number" value={comparisonFee} step="0.05" min="0" max="2" onChange={(e) => setComparisonFee(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Period (years)</label>
          <input type="number" value={investmentYears} min="1" max="50" onChange={(e) => setInvestmentYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Fee Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Initial Investment:</span><span className="font-medium ml-2">$ {result.initialInvestment}</span></div>
          <div><span className="text-zinc-600">Expected Return:</span><span className="font-medium ml-2">{result.annualReturn}%</span></div>
          <div><span className="text-zinc-600">High Fee:</span><span className="font-bold text-red-700 ml-2">{result.annualFee}%</span></div>
          <div><span className="text-zinc-600">Low Fee:</span><span className="font-bold text-green-700 ml-2">{result.comparisonFee}%</span></div>
          <div><span className="text-zinc-600">Net Return (High):</span><span className="font-medium ml-2">{result.netReturnHighFee}%</span></div>
          <div><span className="text-zinc-600">Net Return (Low):</span><span className="font-bold text-green-700 ml-2">{result.netReturnLowFee}%</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Fee Cost</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">High Fee Annual Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.annualFeeDollarHigh}</span></div>
          <div><span className="text-zinc-600">Low Fee Annual Cost:</span><span className="font-bold text-green-700 ml-2">$ {result.annualFeeDollarLow}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">First-year fee cost. Fees compound as portfolio grows.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Final Values After {result.investmentYears} Years</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">With High Fee:</span><span className="font-bold text-orange-700 ml-2">$ {result.finalValueHighFee}</span></div>
          <div><span className="text-zinc-600">With Low Fee:</span><span className="font-bold text-green-700 ml-2">$ {result.finalValueLowFee}</span></div>
          <div><span className="text-zinc-600">Lost to Fees:</span><span className="font-bold text-red-700 ml-2">$ {result.valueDifference}</span></div>
          <div><span className="text-zinc-600">Fee Drag:</span><span className="font-bold text-red-700 ml-2">{result.feeDragPercent}%</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Cumulative Fee Impact</h2>
        <div className="text-sm mb-2">
          <span className="text-zinc-600">Over {result.investmentYears} years, fees cost you:</span>
          <span className="font-bold text-red-700 ml-2">$ {result.cumulativeFeeImpact}</span>
        </div>
        <div className="text-xs text-zinc-600">This is money that would have compounded if not lost to fees.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Year-by-Year Comparison (First 10)</h2>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="text-zinc-600">
                <th className="text-left p-1">Year</th>
                <th className="text-left p-1">High Fee</th>
                <th className="text-left p-1">Low Fee</th>
                <th className="text-left p-1">Difference</th>
              </tr>
            </thead>
            <tbody>
              {result.yearByYear.map((row) => (
                <tr key={row.year}>
                  <td className="p-1">{row.year}</td>
                  <td className="p-1">$ {row.highFeeValue}</td>
                  <td className="p-1">$ {row.lowFeeValue}</td>
                  <td className="p-1 text-red-700">$ {row.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Fee Reduction Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Index funds/ETFs: typically 0.03-0.20% fees</li>
          <li>Active funds: often 0.5-2% fees, rarely outperform</li>
          <li>Advisor fees: 1% typical, consider flat-fee advisors</li>
          <li>401(k): check expense ratios, consider IRA rollover</li>
          <li>A 1% fee over 30 years costs ~$100K on $100K investment</li>
          <li>Every 0.1% saved compounds to significant savings</li>
        </ul>
      </div>
    </div>
  )
}