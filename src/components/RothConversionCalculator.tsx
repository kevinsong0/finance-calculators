'use client'

import { useState } from 'react'

export default function RothConversionCalculator() {
  const [currentAge, setCurrentAge] = useState('')
  const [traditionalBalance, setTraditionalBalance] = useState('')
  const [conversionAmount, setConversionAmount] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [expectedGrowth, setExpectedGrowth] = useState('')
  const [retirementAge, setRetirementAge] = useState('')
  const [retirementTaxRate, setRetirementTaxRate] = useState('')

  const calculate = () => {
    const age = parseInt(currentAge) || 50
    const traditional = parseFloat(traditionalBalance) || 200000
    const convert = parseFloat(conversionAmount) || traditional
    const currentTax = parseFloat(taxRate) || 22
    const growth = parseFloat(expectedGrowth) || 7
    const retireAge = parseInt(retirementAge) || 65
    const retireTax = parseFloat(retirementTaxRate) || 15

    const yearsToRetirement = retireAge - age
    const yearsInRetirement = 25
    const growthRate = growth / 100

    // Taxes paid now for conversion
    const conversionTax = convert * (currentTax / 100)

    // Traditional IRA growth (no conversion)
    const traditionalGrowth = traditional * Math.pow(1 + growthRate, yearsToRetirement)
    const traditionalAfterTax = traditionalGrowth * (1 - retireTax / 100)

    // Roth IRA growth (conversion)
    const rothPrincipal = convert - conversionTax
    const rothGrowth = rothPrincipal * Math.pow(1 + growthRate, yearsToRetirement)
    // Roth withdrawals are tax-free

    // Remaining Traditional (if partial conversion)
    const remainingTraditional = traditional - convert
    const remainingGrowth = remainingTraditional * Math.pow(1 + growthRate, yearsToRetirement)
    const remainingAfterTax = remainingGrowth * (1 - retireTax / 100)

    // Total comparison
    const noConversionTotal = traditionalAfterTax
    const conversionTotal = rothGrowth + remainingAfterTax

    // Breakeven calculation
    const advantage = conversionTotal - noConversionTotal
    const isAdvantage = advantage > 0

    // Future value at withdrawal
    const totalFutureValue = rothGrowth
    const totalTaxPaid = conversionTax
    const effectiveTaxRate = (conversionTax / (convert + rothGrowth - rothPrincipal)) * 100

    // RMD savings (simplified)
    const rmdSavings = traditional > 0 ? traditional * 0.04 * (retireTax / 100) * 10 : 0

    return {
      conversionTax: conversionTax.toFixed(2),
      rothPrincipal: rothPrincipal.toFixed(2),
      rothGrowth: rothGrowth.toFixed(2),
      traditionalGrowth: traditionalGrowth.toFixed(2),
      traditionalAfterTax: traditionalAfterTax.toFixed(2),
      noConversionTotal: noConversionTotal.toFixed(2),
      conversionTotal: conversionTotal.toFixed(2),
      advantage: advantage.toFixed(2),
      isAdvantage,
      yearsToRetirement,
      currentTaxRate: currentTax,
      retireTaxRate: retireTax,
      taxSavings: Math.abs(advantage).toFixed(2),
      breakEvenYears: advantage > 0 ? 'Immediate' : Math.ceil(Math.log(1 + (conversionTax / rothPrincipal)) / Math.log(1 + growthRate)),
      rmdSavings: rmdSavings.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Roth IRA Conversion Calculator</h1>
      <p className="text-zinc-600">Analyze the tax implications and benefits of converting Traditional IRA to Roth IRA.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Conversion Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your current age"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Traditional IRA Balance</label>
            <input
              type="number"
              value={traditionalBalance}
              onChange={(e) => setTraditionalBalance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current balance"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Conversion Amount</label>
            <input
              type="number"
              value={conversionAmount}
              onChange={(e) => setConversionAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Amount to convert (or full balance)"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Tax Rate (%)</label>
            <select
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="10">10% Bracket</option>
              <option value="12">12% Bracket</option>
              <option value="22">22% Bracket</option>
              <option value="24">24% Bracket</option>
              <option value="32">32% Bracket</option>
              <option value="35">35% Bracket</option>
              <option value="37">37% Bracket</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Growth Rate (%)</label>
            <input
              type="number"
              value={expectedGrowth}
              onChange={(e) => setExpectedGrowth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Annual expected return"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="When you plan to retire"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Retirement Tax Rate (%)</label>
            <select
              value={retirementTaxRate}
              onChange={(e) => setRetirementTaxRate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="0">0% (No tax)</option>
              <option value="10">10% Bracket</option>
              <option value="12">12% Bracket</option>
              <option value="15">15% (Estimate)</option>
              <option value="22">22% Bracket</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Conversion Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax Paid Now</div>
            <div className="text-2xl font-bold text-red-600">$${result.conversionTax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Roth Principal</div>
            <div className="text-2xl font-bold text-green-600">$${result.rothPrincipal}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Roth at Retirement</div>
            <div className="text-2xl font-bold text-green-600">$${result.rothGrowth}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Years to Retirement</div>
            <div className="text-2xl font-bold">{result.yearsToRetirement}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Comparison at Retirement</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">No Conversion (After Tax)</div>
            <div className="font-bold">$${result.noConversionTotal}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">With Conversion</div>
            <div className="font-bold text-green-600">$${result.conversionTotal}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Advantage</div>
            <div className={`font-bold ${result.isAdvantage ? 'text-green-600' : 'text-red-600'}`}>
              $${result.advantage}
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Tax Rate Difference</div>
            <div className="font-bold">{result.currentTaxRate}% → {result.retireTaxRate}%</div>
          </div>
        </div>
      </div>

      {result.isAdvantage ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Conversion Recommended</h3>
          <div className="text-sm text-green-600">
            Converting saves approximately $${result.taxSavings} over {result.yearsToRetirement} years. Paying {result.currentTaxRate}% now is better than {result.retireTaxRate}% later on larger withdrawals.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Consider Waiting</h3>
          <div className="text-sm text-yellow-600">
            Current tax rate ({result.currentTaxRate}%) is higher than expected retirement rate ({result.retireTaxRate}%). Conversion may not be optimal now.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Roth Conversion Benefits</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Tax-Free Growth</strong>
            <div className="text-zinc-500">Investments grow tax-free, withdrawals are tax-free</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>No RMDs</strong>
            <div className="text-zinc-500">Roth IRAs have no required minimum distributions during owner's lifetime</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Estate Planning</strong>
            <div className="text-zinc-500">Heirs inherit tax-free, stretching distributions over their lifetime</div>
          </div>
        </div>
      </div>
    </main>
  )
}