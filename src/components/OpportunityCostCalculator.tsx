'use client'

import { useState } from 'react'

export default function OpportunityCostCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [alternativeReturn, setAlternativeReturn] = useState('')
  const [chosenOption, setChosenOption] = useState('spending')
  const [timeHorizon, setTimeHorizon] = useState('')
  const [inflationRate, setInflationRate] = useState('')

  const calculate = () => {
    const amount = parseFloat(investmentAmount) || 10000
    const altReturn = parseFloat(alternativeReturn) || 7
    const horizon = parseInt(timeHorizon) || 5
    const inflation = parseFloat(inflationRate) || 3
    const option = chosenOption

    // Alternative investment returns (compound growth)
    const altFutureValue = amount * Math.pow(1 + altReturn / 100, horizon)
    const altGain = altFutureValue - amount

    // Current option analysis
    let currentFutureValue = 0
    let currentGain = 0
    let lostValue = 0

    if (option === 'spending') {
      // Spending - value is 0 (except for immediate gratification)
      currentFutureValue = 0
      currentGain = -amount // Lost entire amount
      lostValue = altFutureValue
    } else if (option === 'low_return') {
      // Low return option (1% savings account)
      const lowRate = 1
      currentFutureValue = amount * Math.pow(1 + lowRate / 100, horizon)
      currentGain = currentFutureValue - amount
      lostValue = altFutureValue - currentFutureValue
    } else if (option === 'idle') {
      // Idle cash - inflation erosion
      currentFutureValue = amount * Math.pow(1 - inflation / 100, horizon)
      currentGain = currentFutureValue - amount
      lostValue = altFutureValue - currentFutureValue
    }

    // Opportunity cost
    const opportunityCost = lostValue

    // Annual cost breakdown
    const annualAltReturn = amount * (altReturn / 100)
    const totalLostReturns = annualAltReturn * horizon

    // Per-day cost
    const dailyCost = opportunityCost / (horizon * 365)

    // Hour cost (for hourly wage perspective)
    const hourlyCost = dailyCost / 24

    // ROI if invested instead
    const roiPercentage = (altGain / amount) * 100

    // Comparison scenarios
    const scenarios = [
      { name: 'High-yield savings (4%)', rate: 4, future: amount * Math.pow(1.04, horizon) },
      { name: 'Index fund (7%)', rate: 7, future: amount * Math.pow(1.07, horizon) },
      { name: 'Individual stocks (10%)', rate: 10, future: amount * Math.pow(1.10, horizon) },
      { name: 'Real estate (8%)', rate: 8, future: amount * Math.pow(1.08, horizon) },
      { name: 'Cash (inflation -3%)', rate: -3, future: amount * Math.pow(0.97, horizon) }
    ]

    // Decision impact
    const decisionQuality = option === 'spending' ? 'Poor' : option === 'low_return' ? 'Suboptimal' : 'Optimal'

    return {
      investmentAmount: amount.toFixed(2),
      alternativeReturn: altReturn.toFixed(1),
      timeHorizon: horizon,
      inflationRate: inflation.toFixed(1),
      chosenOption: option,
      altFutureValue: altFutureValue.toFixed(2),
      altGain: altGain.toFixed(2),
      currentFutureValue: currentFutureValue.toFixed(2),
      currentGain: currentGain.toFixed(2),
      opportunityCost: opportunityCost.toFixed(2),
      totalLostReturns: totalLostReturns.toFixed(2),
      dailyCost: dailyCost.toFixed(2),
      hourlyCost: hourlyCost.toFixed(2),
      roiPercentage: roiPercentage.toFixed(1),
      annualAltReturn: annualAltReturn.toFixed(2),
      scenarios: scenarios.map(s => ({ ...s, future: s.future.toFixed(2) })),
      decisionQuality,
      isWasteful: opportunityCost > amount * 0.5
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Opportunity Cost Calculator</h1>
      <p className="text-zinc-600">Calculate hidden cost of spending vs investing and compare alternative returns.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Decision Analysis</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Amount Being Decided</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter amount you're deciding to spend/invest"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Option</label>
            <select
              value={chosenOption}
              onChange={(e) => setChosenOption(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="spending">Spending (non-essential purchase)</option>
              <option value="low_return">Low return (savings account 1%)</option>
              <option value="idle">Idle cash (holding, inflation erosion)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Alternative Investment Return (%)</label>
            <input
              type="number"
              value={alternativeReturn}
              onChange={(e) => setAlternativeReturn(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter expected alternative return rate"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Typical: Index fund 7%, High-yield savings 4%, Real estate 8%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Time Horizon (years)</label>
            <input
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter years for analysis"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Inflation (%)</label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter inflation rate"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Historical US average: 3%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Opportunity Cost Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Amount Decided</div>
            <div className="text-2xl font-bold">$${result.investmentAmount}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Time Horizon</div>
            <div className="text-2xl font-bold">{result.timeHorizon} years</div>
          </div>
          <div className="bg-green-50 rounded p-4">
            <div className="text-sm text-zinc-500">Alternative Future Value</div>
            <div className="text-2xl font-bold text-green-600">$${result.altFutureValue}</div>
          </div>
          <div className="bg-blue-50 rounded p-4">
            <div className="text-sm text-zinc-500">Alternative Gain</div>
            <div className="text-2xl font-bold text-blue-600">$${result.altGain}</div>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Opportunity Cost</h3>
        <div className="text-3xl font-bold text-red-600">$${result.opportunityCost}</div>
        <div className="text-sm text-red-500 mt-2">
          By choosing {result.chosenOption.replace('_', ' ')} instead of investing at {result.alternativeReturn}%, you lose $${result.opportunityCost} over {result.timeHorizon} years.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Cost Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Per Year</div>
            <div className="text-xl font-bold text-red-600">$${result.annualAltReturn}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Per Day</div>
            <div className="text-xl font-bold text-red-600">$${result.dailyCost}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Per Hour</div>
            <div className="text-xl font-bold text-red-600">$${result.hourlyCost}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Alternative Comparison</h3>
        <div className="space-y-2 text-xs">
          {result.scenarios.map((s, idx) => (
            <div key={idx} className="bg-white rounded p-3 flex justify-between items-center">
              <span>{s.name}</span>
              <span className={`font-bold ${parseFloat(s.future) > parseFloat(result.investmentAmount) ? 'text-green-600' : 'text-red-600'}`}>
                $${s.future}
              </span>
            </div>
          ))}
        </div>
      </div>

      {result.isWasteful && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Decision Warning</h3>
          <div className="text-sm text-yellow-600">
            Opportunity cost exceeds 50% of original amount. Consider delaying non-essential spending or choosing higher-return alternatives. Small decisions compound - $${result.dailyCost}/day loss adds up to $${result.opportunityCost} over {result.timeHorizon} years.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">What Is Opportunity Cost?</h3>
        <div className="text-xs text-zinc-600">
          Opportunity cost = value of best alternative forgone when making a choice. Every dollar spent is a dollar not invested. $1,000 spent today at 7% return = $1,967 lost over 10 years. Hidden cost of decisions compounds over time. Factor into major purchases, career choices, time allocation.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Framework</h3>
        <div className="text-xs text-zinc-600">
          Ask: What else could I do with this money/time? Calculate lost returns if invested instead. Consider time horizon - longer = larger opportunity cost. Weigh immediate benefit vs long-term cost. Essential spending (needs) vs discretionary (wants). Apply to career moves, education, major purchases, daily habits.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Examples</h3>
        <div className="text-xs text-zinc-600">
          Car purchase: $30K vs invested = $60K over 10 years at 7%. Daily coffee: $5/day = $18K over 20 years. Extended warranty: Often poor value vs self-insuring. Cable TV: $100/month = $28K over 20 years. New phone annually: $800/year = $16K over 10 years. Calculate before spending.
        </div>
      </div>
    </main>
  )
}