'use client'

import { useState } from 'react'

export default function FinancialFreedomCalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [targetAge, setTargetAge] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [expectedReturn, setExpectedReturn] = useState('')
  const [targetMonthlyExpense, setTargetMonthlyExpense] = useState('')
  const [withdrawalRate, setWithdrawalRate] = useState('4')
  const [currentIncome, setCurrentIncome] = useState('')
  const [savingsRate, setSavingsRate] = useState('')

  const calculate = () => {
    const age = parseInt(currentAge) || 30
    const target = parseInt(targetAge) || 55
    const savings = parseFloat(currentSavings) || 50000
    const monthly = parseFloat(monthlyContribution) || 1000
    const returnRate = parseFloat(expectedReturn) || 7
    const monthlyExpense = parseFloat(targetMonthlyExpense) || 3000
    const withdrawal = parseFloat(withdrawalRate) || 4
    const income = parseFloat(currentIncome) || 80000
    const rate = parseFloat(savingsRate) || 15

    // Years to target
    const yearsToTarget = target - age

    // Future value of current savings
    const fvCurrentSavings = savings * Math.pow(1 + returnRate / 100, yearsToTarget)

    // Future value of monthly contributions (compound)
    const monthlyRate = returnRate / 100 / 12
    const fvContributions = monthly * ((Math.pow(1 + monthlyRate, yearsToTarget * 12) - 1) / monthlyRate) * (1 + monthlyRate)

    // Total projected savings
    const totalProjected = fvCurrentSavings + fvContributions

    // Required nest egg for target lifestyle
    const requiredNestEgg = monthlyExpense * 12 / (withdrawal / 100)

    // Gap analysis
    const gap = requiredNestEgg - totalProjected
    const onTrack = gap <= 0

    // If behind, calculate needed adjustments
    const additionalMonthlyNeeded = gap > 0
      ? gap / (((Math.pow(1 + monthlyRate, yearsToTarget * 12) - 1) / monthlyRate) * (1 + monthlyRate))
      : 0

    // Calculate FIRE number
    const fireNumber = requiredNestEgg

    // Calculate freedom date if on track
    const freedomYear = onTrack ? target : calculateFreedomYear(savings, monthly, returnRate, requiredNestEgg, age)

    // Annual contributions
    const annualContribution = monthly * 12

    // Savings rate analysis
    const actualSavingsRate = (annualContribution / income) * 100
    const savingsRateComparison = actualSavingsRate >= rate

    // Path analysis
    const paths = [
      { name: 'Lean FIRE', expense: monthlyExpense * 0.7, nestEgg: monthlyExpense * 0.7 * 12 / (withdrawal / 100) },
      { name: 'Regular FIRE', expense: monthlyExpense, nestEgg: monthlyExpense * 12 / (withdrawal / 100) },
      { name: 'Fat FIRE', expense: monthlyExpense * 1.5, nestEgg: monthlyExpense * 1.5 * 12 / (withdrawal / 100) },
      { name: 'Barista FIRE', expense: monthlyExpense, nestEgg: requiredNestEgg * 0.5, partTime: monthlyExpense * 0.5 }
    ]

    // Milestone tracking
    const milestones = []
    let runningTotal = savings
    for (let y = age; y <= Math.min(target + 10, age + 40); y += 5) {
      const yearsFromNow = y - age
      runningTotal = savings * Math.pow(1 + returnRate / 100, yearsFromNow) +
        monthly * ((Math.pow(1 + monthlyRate, yearsFromNow * 12) - 1) / monthlyRate) * (1 + monthlyRate)
      milestones.push({
        age: y,
        total: runningTotal.toFixed(0),
        percent: ((runningTotal / requiredNestEgg) * 100).toFixed(0)
      })
    }

    return {
      currentAge: age,
      targetAge: target,
      yearsToTarget,
      currentSavings: savings.toFixed(2),
      monthlyContribution: monthly.toFixed(2),
      annualContribution: annualContribution.toFixed(2),
      expectedReturn: returnRate.toFixed(1),
      fvCurrentSavings: fvCurrentSavings.toFixed(2),
      fvContributions: fvContributions.toFixed(2),
      totalProjected: totalProjected.toFixed(2),
      monthlyExpense: monthlyExpense.toFixed(2),
      requiredNestEgg: requiredNestEgg.toFixed(2),
      fireNumber: fireNumber.toFixed(2),
      gap: gap.toFixed(2),
      onTrack,
      additionalMonthlyNeeded: additionalMonthlyNeeded.toFixed(2),
      freedomYear,
      actualSavingsRate: actualSavingsRate.toFixed(1),
      targetSavingsRate: rate.toFixed(1),
      savingsRateComparison,
      withdrawalRate: withdrawal.toFixed(1),
      currentIncome: income.toFixed(2),
      paths: paths.map(p => ({
        ...p,
        nestEgg: p.nestEgg.toFixed(2),
        expense: p.expense.toFixed(2),
        partTime: p.partTime ? p.partTime.toFixed(2) : 0
      })),
      milestones
    }
  }

  function calculateFreedomYear(current: number, monthly: number, rate: number, target: number, age: number): number {
    let balance = current
    let year = age
    const monthlyRate = rate / 100 / 12
    while (balance < target && year < 100) {
      balance = balance * (1 + rate / 100) + monthly * 12
      year++
    }
    return year
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Financial Freedom Calculator</h1>
      <p className="text-zinc-600">Calculate FIRE timeline, required nest egg, and savings gap to achieve financial independence.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Your Profile</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Target Freedom Age</label>
              <input
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="When do you want to be free?"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Savings</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total savings/investments"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Contribution</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter monthly savings amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter expected investment return"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Conservative: 4-5%, Moderate: 6-7%, Aggressive: 8-10%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Monthly Expenses</label>
            <input
              type="number"
              value={targetMonthlyExpense}
              onChange={(e) => setTargetMonthlyExpense(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter desired monthly spending"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Safe Withdrawal Rate (%)</label>
            <input
              type="number"
              value={withdrawalRate}
              onChange={(e) => setWithdrawalRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter withdrawal rate (4% standard)"
            />
            <div className="text-xs text-zinc-500 mt-1">
              4% rule: Withdraw 4% annually, portfolio lasts ~30 years
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">FIRE Number Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Target Monthly Expenses</span>
            <span className="font-bold">$${result.monthlyExpense}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Annual Expenses</span>
            <span className="font-bold">$${(parseFloat(result.monthlyExpense) * 12).toFixed(2)}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Withdrawal Rate</span>
            <span className="font-bold">{result.withdrawalRate}%</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between border-t-2 border-green-300">
            <span className="font-medium">FIRE Number Required</span>
            <span className="font-bold text-green-600">$${result.requiredNestEgg}</span>
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            Formula: Annual expenses / Withdrawal rate = $${result.requiredNestEgg}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Projection Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Years to Target</span>
            <span className="font-bold">{result.yearsToTarget} years</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Current Savings FV</span>
            <span className="font-bold">$${result.fvCurrentSavings}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Contributions FV</span>
            <span className="font-bold">$${result.fvContributions}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Total Projected</span>
            <span className="font-bold text-blue-600">$${result.totalProjected}</span>
          </div>
        </div>
      </div>

      {result.onTrack ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">On Track for Financial Freedom!</h3>
          <div className="text-sm text-green-600">
            Projected savings ($${result.totalProjected}) exceeds FIRE number ($${result.requiredNestEgg}). Freedom possible at age {result.freedomYear}. Continue current savings rate to achieve goal.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Gap Analysis - Behind Target</h3>
          <div className="text-sm text-yellow-600">
            Shortfall: $${result.gap}. Need additional $${result.additionalMonthlyNeeded}/month to reach goal at age {result.targetAge}. Current projection reaches FIRE at age {result.freedomYear} instead.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">FIRE Path Options</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {result.paths.map((p, idx) => (
            <div key={idx} className="bg-white rounded p-3">
              <strong>{p.name}</strong>
              <div className="text-zinc-500">Nest egg: $${p.nestEgg}</div>
              <div className="text-zinc-500">Monthly: $${p.expense}</div>
              {parseFloat(String(p.partTime)) > 0 && <div className="text-zinc-500">Part-time: $${p.partTime}/mo</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Milestone Tracker</h3>
        <div className="space-y-2 text-xs">
          {result.milestones.map((m, idx) => (
            <div key={idx} className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Age {m.age}</span>
              <span className="font-bold">$${m.total}</span>
              <span className={`text-zinc-500 ${parseInt(m.percent) >= 100 ? 'text-green-600' : ''}`}>
                {m.percent}% of goal
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">FIRE Strategies</h3>
        <div className="text-xs text-zinc-600">
          Increase savings rate: 50%+ savers reach FIRE faster. Reduce expenses: Lower FIRE number, faster timeline. Increase income: Side hustles, career advancement. Optimize returns: Index funds, tax efficiency. Geographic arbitrage: Live in low-cost areas. House hack: Reduce housing costs.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key FIRE Concepts</h3>
        <div className="text-xs text-zinc-600">
          FIRE Number = Annual expenses x 25 (at 4% withdrawal). 4% Rule: Historical safe withdrawal rate for 30-year horizon. Savings rate matters more than income. Time in market beats timing. Compound growth accelerates later years. Part-time work extends runway (Barista FIRE).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">FIRE Types Explained</h3>
        <div className="text-xs text-zinc-600">
          Lean FIRE: Frugal lifestyle, smaller nest egg (~$500K). Regular FIRE: Typical middle-class lifestyle (~$1M). Fat FIRE: Luxurious lifestyle, larger nest egg (~$2M+). Barista FIRE: Semi-retirement with part-time work. Coast FIRE: Save early, let compound interest finish. FIRE movement: Lifestyle design for early freedom.
        </div>
      </div>
    </main>
  )
}