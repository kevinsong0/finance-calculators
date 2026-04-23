'use client'

import { useState } from 'react'

export default function SequenceOfReturnsRiskCalculator() {
  const [initialPortfolio, setInitialPortfolio] = useState('1000000')
  const [withdrawalRate, setWithdrawalRate] = useState('4')
  const [inflationRate, setInflationRate] = useState('3')
  const [retirementYears, setRetirementYears] = useState('30')
  const [averageReturn, setAverageReturn] = useState('7')
  const [scenarioType, setScenarioType] = useState('badEarly')

  const calculate = () => {
    const initial = parseFloat(initialPortfolio) || 0
    const withdraw = parseFloat(withdrawalRate) || 0
    const inflation = parseFloat(inflationRate) || 0
    const years = parseFloat(retirementYears) || 0
    const avgReturn = parseFloat(averageReturn) || 0

    // Base withdrawal (Year 1)
    const baseWithdrawal = initial * (withdraw / 100)

    // Generate return sequences for different scenarios
    // Good early years: High returns early, low returns late
    // Bad early years: Low returns early, high returns late (most dangerous)
    // Constant returns: Same average return every year

    let goodEarlyReturns: number[] = []
    let badEarlyReturns: number[] = []
    let constantReturns: number[] = []
    let volatileReturns: number[] = []

    // Generate return sequences
    for (let i = 0; i < years; i++) {
      const yearInSequence = i

      // Good early years: Start high, decline to low
      const goodEarlyReturn = yearInSequence < years / 3 ? avgReturn + 5 :
                              yearInSequence < 2 * years / 3 ? avgReturn : avgReturn - 5
      goodEarlyReturns.push(goodEarlyReturn)

      // Bad early years: Start low, improve to high (most dangerous for retirees)
      const badEarlyReturn = yearInSequence < years / 3 ? avgReturn - 5 :
                             yearInSequence < 2 * years / 3 ? avgReturn : avgReturn + 5
      badEarlyReturns.push(badEarlyReturn)

      // Constant returns: Same every year
      constantReturns.push(avgReturn)

      // Volatile returns: Random-ish sequence with same average
      const volatileReturn = (Math.sin(i * 1.5) * 10) + avgReturn
      volatileReturns.push(volatileReturn)
    }

    // Calculate portfolio survival for each scenario
    const simulatePortfolio = (returns: number[]): { finalValue: number; survived: boolean; minYear: number; depletedYear: number | null } => {
      let portfolio = initial
      let minPortfolio = initial
      let depletedYear = null

      for (let i = 0; i < years; i++) {
        // Apply return
        portfolio *= (1 + returns[i] / 100)

        // Withdraw (inflation-adjusted)
        const yearWithdrawal = baseWithdrawal * Math.pow(1 + inflation / 100, i)
        portfolio -= yearWithdrawal

        minPortfolio = Math.min(minPortfolio, portfolio)

        if (portfolio <= 0) {
          depletedYear = i + 1
          break
        }
      }

      return {
        finalValue: portfolio,
        survived: portfolio > 0,
        minYear: Math.min(...returns.map((_, i) => i)),
        depletedYear,
      }
    }

    const goodEarlyResult = simulatePortfolio(goodEarlyReturns)
    const badEarlyResult = simulatePortfolio(badEarlyReturns)
    const constantResult = simulatePortfolio(constantReturns)
    const volatileResult = simulatePortfolio(volatileReturns)

    // Calculate sequence of returns risk metrics
    const averageOfAll = (goodEarlyResult.finalValue + badEarlyResult.finalValue + constantResult.finalValue + volatileResult.finalValue) / 4

    const worstCase = badEarlyResult.finalValue
    const bestCase = goodEarlyResult.finalValue

    const riskSpread = Math.abs(bestCase - worstCase)

    // Depletion risk
    const depletionScenarios = [goodEarlyResult, badEarlyResult, volatileResult].filter(r => r.depletedYear !== null).length

    // Calculate adjusted withdrawal rate for worst case survival
    let safeWithdrawalRate = withdraw
    for (let rate = withdraw; rate > 0; rate -= 0.5) {
      const testInitial = initial
      const testWithdrawal = testInitial * (rate / 100)

      let testPortfolio = testInitial
      for (let i = 0; i < years; i++) {
        testPortfolio *= (1 + badEarlyReturns[i] / 100)
        const yearWithdraw = testWithdrawal * Math.pow(1 + inflation / 100, i)
        testPortfolio -= yearWithdraw
        if (testPortfolio <= 0) break
      }

      if (testPortfolio > 0) {
        safeWithdrawalRate = rate
        break
      }
    }

    // Buffer assets needed for worst case
    const bufferNeeded = badEarlyResult.depletedYear ? 0 :
      Math.max(0, -badEarlyResult.finalValue)

    return {
      initialPortfolio: initial.toFixed(0),
      withdrawalRate: withdraw.toFixed(1),
      baseWithdrawal: baseWithdrawal.toFixed(0),
      inflationRate: inflation.toFixed(1),
      retirementYears: years.toFixed(0),
      averageReturn: avgReturn.toFixed(1),
      goodEarlyFinal: goodEarlyResult.finalValue.toFixed(0),
      goodEarlySurvived: goodEarlyResult.survived,
      goodEarlyDepleted: goodEarlyResult.depletedYear,
      badEarlyFinal: badEarlyResult.finalValue.toFixed(0),
      badEarlySurvived: badEarlyResult.survived,
      badEarlyDepleted: badEarlyResult.depletedYear,
      constantFinal: constantResult.finalValue.toFixed(0),
      constantSurvived: constantResult.survived,
      volatileFinal: volatileResult.finalValue.toFixed(0),
      volatileSurvived: volatileResult.survived,
      bestCase: bestCase.toFixed(0),
      worstCase: worstCase.toFixed(0),
      averageOfAll: averageOfAll.toFixed(0),
      riskSpread: riskSpread.toFixed(0),
      depletionScenarios: depletionScenarios.toFixed(0),
      safeWithdrawalRate: safeWithdrawalRate.toFixed(1),
      bufferNeeded: bufferNeeded.toFixed(0),
      goodEarlyReturns: goodEarlyReturns.slice(0, 10).map(r => r.toFixed(1)),
      badEarlyReturns: badEarlyReturns.slice(0, 10).map(r => r.toFixed(1)),
      constantReturns: constantReturns.slice(0, 10).map(r => r.toFixed(1)),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Sequence of Returns Risk Calculator</h1>
      <p className="text-zinc-600">Understand how the order of investment returns affects retirement portfolio survival. Bad returns early in retirement can deplete portfolios faster than good returns early, even with the same average return.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Portfolio Parameters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Initial Portfolio ($)</label>
            <input
              type="number"
              value={initialPortfolio}
              onChange={(e) => setInitialPortfolio(e.target.value)}
              className="input"
              min="100000"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Withdrawal Rate (%)</label>
            <input
              type="number"
              value={withdrawalRate}
              onChange={(e) => setWithdrawalRate(e.target.value)}
              className="input"
              min="1"
              max="10"
              step="0.1"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Traditional rule: 4%. Conservative: 3-3.5%. Aggressive: 5%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Inflation Rate (%)</label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="input"
              min="0"
              max="10"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Return Assumptions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Duration (Years)</label>
            <input
              type="number"
              value={retirementYears}
              onChange={(e) => setRetirementYears(e.target.value)}
              className="input"
              min="15"
              max="40"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Average Annual Return (%)</label>
            <input
              type="number"
              value={averageReturn}
              onChange={(e) => setAverageReturn(e.target.value)}
              className="input"
              min="0"
              max="15"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Historical stock market average: 7-10%. Balanced portfolio: 5-7%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Sequence Risk Explained</h3>
        <div className="text-sm text-red-600">
          All scenarios below have the SAME average return of {result.averageReturn}%. But the ORDER of returns dramatically affects outcomes:
        </div>
      </div>

      <div className={`card ${result.goodEarlySurvived ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.goodEarlySurvived ? 'text-green-700' : 'text-red-700'}`}>
          Scenario 1: Good Returns Early
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Final Portfolio:</span>
            <span className={`font-bold ml-2 ${result.goodEarlySurvived ? 'text-green-800' : 'text-red-800'}`}>
              ${result.goodEarlyFinal}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Status:</span>
            <span className={`font-medium ml-2 ${result.goodEarlySurvived ? 'text-green-600' : 'text-red-600'}`}>
              {result.goodEarlySurvived ? 'Survived' : `Depleted Year ${result.goodEarlyDepleted}`}
            </span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Returns: {result.goodEarlyReturns.join('%, ')}%... High returns early grow portfolio before withdrawals deplete it.
        </div>
      </div>

      <div className={`card ${result.badEarlySurvived ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.badEarlySurvived ? 'text-yellow-700' : 'text-red-700'}`}>
          Scenario 2: Bad Returns Early (DANGEROUS)
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Final Portfolio:</span>
            <span className={`font-bold ml-2 ${result.badEarlySurvived ? 'text-yellow-800' : 'text-red-800'}`}>
              ${result.badEarlyFinal}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Status:</span>
            <span className={`font-medium ml-2 ${result.badEarlySurvived ? 'text-yellow-600' : 'text-red-600'}`}>
              {result.badEarlySurvived ? 'Survived' : `Depleted Year ${result.badEarlyDepleted}`}
            </span>
          </div>
        </div>
        <div className="text-xs text-red-600 mt-2">
          Returns: {result.badEarlyReturns.join('%, ')}%... Low returns early while withdrawing is most dangerous sequence.
        </div>
      </div>

      <div className={`card ${result.constantSurvived ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.constantSurvived ? 'text-blue-700' : 'text-red-700'}`}>
          Scenario 3: Constant Returns (Idealized)
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Final Portfolio:</span>
            <span className={`font-bold ml-2 ${result.constantSurvived ? 'text-blue-800' : 'text-red-800'}`}>
              ${result.constantFinal}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Status:</span>
            <span className={`font-medium ml-2 ${result.constantSurvived ? 'text-blue-600' : 'text-red-600'}`}>
              {result.constantSurvived ? 'Survived' : 'Depleted'}
            </span>
          </div>
        </div>
        <div className="text-xs text-blue-600 mt-2">
          Returns: {result.constantReturns.join('%, ')}%... Same return every year. Benchmark for comparison.
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Sequence Risk Impact</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Best Case:</span>
            <span className="font-medium ml-2 text-green-800">${result.bestCase}</span>
          </div>
          <div>
            <span className="text-zinc-600">Worst Case:</span>
            <span className="font-medium ml-2 text-red-800">${result.worstCase}</span>
          </div>
          <div>
            <span className="text-zinc-600">Average:</span>
            <span className="font-medium ml-2">${result.averageOfAll}</span>
          </div>
          <div>
            <span className="text-zinc-600">Risk Spread:</span>
            <span className="font-bold ml-2">${result.riskSpread}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          Same average return, but worst case ends with ${result.riskSpread} less than best case due to return sequence alone.
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Mitigation Strategies</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Safer Withdrawal:</span>
            <span className="font-bold ml-2">{result.safeWithdrawalRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Buffer Needed:</span>
            <span className="font-medium ml-2">${result.bufferNeeded}</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          Lower withdrawal rate or additional buffer assets help survive bad early returns.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">How to Mitigate Sequence Risk</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Flexible Withdrawal:</strong> Reduce withdrawals when portfolio drops (e.g., cut 10% after 10% portfolio decline). Resume normal when recovered.</li>
          <li><strong>Cash Buffer:</strong> Keep 2-3 years of withdrawals in cash/short-term bonds. Avoid selling stocks during downturns.</li>
          <li><strong>Bucket Strategy:</strong> 3 buckets: Cash (1-2 years), Bonds (3-7 years), Stocks (long-term). Deplete in order.</li>
          <li><strong>Lower Initial WR:</strong> Start at 3-3.5% instead of 4%. More conservative, higher survival probability.</li>
          <li><strong>Part-Time Income:</strong> Early retirement income reduces need to withdraw during bad returns years.</li>
          <li><strong>Annuity Floor:</strong> Use partial annuity for guaranteed income floor, reducing withdrawal pressure on portfolio.</li>
          <li><strong>Dynamic Asset Allocation:</strong> Reduce equity exposure after bad returns, increase after good years.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Historical Context</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>1966 Retiree:</strong> Worst historical case. 15 years of low/negative returns. 4% WR depleted in 14 years.</li>
          <li><strong>2000 Retiree:</strong> Dot-com crash + 2008 financial crisis. Two major downturns in first decade.</li>
          <li><strong>Best Periods:</strong> Retirees starting in early 1980s or 2010s benefited from sustained bull markets.</li>
          <li><strong>Key Insight:</strong> The first 10 years of retirement are most critical. Bad returns here have lasting impact.</li>
        </ul>
      </div>
    </main>
  )
}