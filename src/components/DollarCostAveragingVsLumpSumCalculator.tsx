'use client'

import { useState } from 'react'

export default function DollarCostAveragingVsLumpSumCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(100000)
  const [investmentPeriod, setInvestmentPeriod] = useState(12) // months
  const [expectedReturn, setExpectedReturn] = useState(8)
  const [expectedVolatility, setExpectedVolatility] = useState(15)
  const [dcaFrequency, setDcaFrequency] = useState<'monthly' | 'weekly' | 'quarterly'>('monthly')

  const calculate = () => {
    const months = investmentPeriod
    const monthlyInvestmentDCA = totalInvestment / months
    const frequencyMultiplier = dcaFrequency === 'monthly' ? 1 : (dcaFrequency === 'weekly' ? 4.33 : 0.33)

    // Lump sum: invest all now
    const lumpSumFinalValue = totalInvestment * Math.pow(1 + expectedReturn / 100, months / 12)
    const lumpSumGain = lumpSumFinalValue - totalInvestment

    // DCA: invest gradually over time
    // Simplified model: average of start-of-period and end-of-period returns
    const avgMonthsInvested = months / 2 // Average months each dollar is invested
    const dcaAvgReturn = expectedReturn * (avgMonthsInvested / 12) / 100
    const dcaFinalValue = totalInvestment * (1 + dcaAvgReturn)
    const dcaGain = dcaFinalValue - totalInvestment

    // Risk comparison (volatility exposure)
    const lumpSumRiskMonths = months // All money exposed for full period
    const dcaAvgRiskMonths = avgMonthsInvested // Average exposure period

    // Market timing scenarios
    // Scenario A: Market goes up steadily
    const marketUpScenarioLumpSum = totalInvestment * Math.pow(1 + (expectedReturn + 5) / 100, months / 12)
    const marketUpScenarioDCA = totalInvestment * (1 + (expectedReturn + 5) * (avgMonthsInvested / 12) / 100)

    // Scenario B: Market drops then recovers
    const marketDropRecoveryLumpSum = totalInvestment * 0.85 * Math.pow(1 + expectedReturn / 100, (months - 3) / 12)
    // DCA benefits from buying cheaper after drop
    const dcaDropBenefit = monthlyInvestmentDCA * 0.85 * Math.pow(1 + expectedReturn / 100, (months - 3) / 12)
    const marketDropRecoveryDCA = totalInvestment * 0.5 + dcaDropBenefit * (months - 3)

    // Win probability (based on historical studies)
    const lumpSumWinProbability = 67 // Historically, lump sum wins ~2/3 of time
    const dcaWinProbability = 33

    // Psychological benefit of DCA
    const dcaPsychologicalBenefit = 'Reduces regret if market drops after investing'

    // Recommendation based on situation
    let recommendation = ''
    if (expectedReturn >= 6) {
      recommendation = 'LUMP SUM typically better in rising markets. DCA reduces timing risk and psychological stress.'
    } else {
      recommendation = 'DCA may be preferred in uncertain/volatile markets. Provides flexibility to stop if circumstances change.'
    }

    return {
      totalInvestment: totalInvestment.toFixed(0),
      investmentPeriod: months.toFixed(0),
      monthlyInvestmentDCA: monthlyInvestmentDCA.toFixed(0),
      expectedReturn: expectedReturn.toFixed(1),
      expectedVolatility: expectedVolatility.toFixed(1),
      dcaFrequency,
      lumpSumFinalValue: lumpSumFinalValue.toFixed(0),
      lumpSumGain: lumpSumGain.toFixed(0),
      dcaFinalValue: dcaFinalValue.toFixed(0),
      dcaGain: dcaGain.toFixed(0),
      lumpSumAdvantage: (lumpSumGain - dcaGain).toFixed(0),
      lumpSumRiskMonths: lumpSumRiskMonths.toFixed(0),
      dcaAvgRiskMonths: dcaAvgRiskMonths.toFixed(0),
      marketUpScenarioLumpSum: marketUpScenarioLumpSum.toFixed(0),
      marketUpScenarioDCA: marketUpScenarioDCA.toFixed(0),
      lumpSumWinProbability: lumpSumWinProbability.toFixed(0),
      dcaWinProbability: dcaWinProbability.toFixed(0),
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dollar Cost Averaging vs Lump Sum Calculator</h1>
      <p className="text-gray-600 mb-4">Compare gradual investing (DCA) versus investing all at once.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Amount to Invest ($)</label>
          <input type="number" value={totalInvestment} onChange={(e) => setTotalInvestment(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Period (months)</label>
          <input type="number" value={investmentPeriod} min="1" max="36" onChange={(e) => setInvestmentPeriod(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Annual Return (%)</label>
          <input type="number" value={expectedReturn} step="0.5" onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Volatility (%)</label>
          <input type="number" value={expectedVolatility} step="1" onChange={(e) => setExpectedVolatility(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">DCA Frequency</label>
          <select value={dcaFrequency} onChange={(e) => setDcaFrequency(e.target.value as 'monthly' | 'weekly' | 'quarterly')} className="w-full border rounded p-2">
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Investment Strategy Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Investment:</span><span className="font-medium ml-2">$ {result.totalInvestment}</span></div>
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.investmentPeriod} months</span></div>
          <div><span className="text-zinc-600">Expected Return:</span><span className="font-medium ml-2">{result.expectedReturn}%</span></div>
          <div><span className="text-zinc-600">DCA Amount:</span><span className="font-medium ml-2">$ {result.monthlyInvestmentDCA}/{result.dcaFrequency}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Lump Sum Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Final Value:</span><span className="font-bold text-purple-700 ml-2">$ {result.lumpSumFinalValue}</span></div>
          <div><span className="text-zinc-600">Gain:</span><span className="font-bold text-green-700 ml-2">$ {result.lumpSumGain}</span></div>
          <div><span className="text-zinc-600">Money at Risk:</span><span className="font-medium ml-2">{result.lumpSumRiskMonths} months</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">All money invested immediately and exposed to market for full period.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Dollar Cost Averaging Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Final Value:</span><span className="font-bold text-orange-700 ml-2">$ {result.dcaFinalValue}</span></div>
          <div><span className="text-zinc-600">Gain:</span><span className="font-bold text-green-700 ml-2">$ {result.dcaGain}</span></div>
          <div><span className="text-zinc-600">Avg Money at Risk:</span><span className="font-medium ml-2">{result.dcaAvgRiskMonths} months</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Money invested gradually, reducing average market exposure.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Comparison Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Lump Sum Advantage:</span><span className="font-bold text-green-700 ml-2">$ {result.lumpSumAdvantage}</span></div>
          <div><span className="text-zinc-600">Lump Sum Win Rate:</span><span className="font-bold ml-2">{result.lumpSumWinProbability}%</span></div>
          <div><span className="text-zinc-600">DCA Win Rate:</span><span className="font-bold ml-2">{result.dcaWinProbability}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Historically, lump sum wins ~67% of time (markets trend upward). DCA wins in downturns.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-teal-700">Recommendation</h2>
        <div className="text-sm font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Strategy Selection Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Lump sum: better for long-term investors, rising markets, risk-tolerant</li>
          <li>DCA: better for nervous investors, uncertain markets, new money (bonus/inheritance)</li>
          <li>DCA reduces regret if market drops immediately after investing</li>
          <li>Hybrid: invest 50% lump sum, 50% over 6 months</li>
          <li>Time in market beats timing the market (historically)</li>
          <li>Consider your risk tolerance and sleep-at-night factor</li>
        </ul>
      </div>
    </div>
  )
}