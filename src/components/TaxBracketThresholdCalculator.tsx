'use client'

import { useState } from 'react'

export default function TaxBracketThresholdCalculator() {
  const [income, setIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'married_separate' | 'head_household'>('single')
  const [deductions, setDeductions] = useState(14600)
  const [taxCredits, setTaxCredits] = useState(0)

  const calculate = () => {
    const taxableIncome = Math.max(0, income - deductions)

    // 2024 tax brackets
    const brackets = {
      single: [
        { min: 0, max: 11000, rate: 10, tax: 1100 },
        { min: 11000, max: 44725, rate: 12, tax: 4004.40 },
        { min: 44725, max: 95475, rate: 22, tax: 11176 },
        { min: 95475, max: 182100, rate: 24, tax: 20976 },
        { min: 182100, max: 231250, rate: 32, tax: 15680 },
        { min: 231250, max: 578125, rate: 35, tax: 121812.5 },
        { min: 578125, max: Infinity, rate: 37, tax: Infinity },
      ],
      married: [
        { min: 0, max: 22000, rate: 10, tax: 2200 },
        { min: 22000, max: 89450, rate: 12, tax: 8094 },
        { min: 89450, max: 190750, rate: 22, tax: 22277 },
        { min: 190750, max: 364200, rate: 24, tax: 41652 },
        { min: 364200, max: 462500, rate: 32, tax: 31392 },
        { min: 462500, max: 693750, rate: 35, tax: 80712.5 },
        { min: 693750, max: Infinity, rate: 37, tax: Infinity },
      ],
      married_separate: [
        { min: 0, max: 11000, rate: 10, tax: 1100 },
        { min: 11000, max: 44725, rate: 12, tax: 4004.40 },
        { min: 44725, max: 95475, rate: 22, tax: 11176 },
        { min: 95475, max: 182100, rate: 24, tax: 20976 },
        { min: 182100, max: 231250, rate: 32, tax: 15680 },
        { min: 231250, max: 346875, rate: 35, tax: 40687.5 },
        { min: 346875, max: Infinity, rate: 37, tax: Infinity },
      ],
      head_household: [
        { min: 0, max: 15700, rate: 10, tax: 1570 },
        { min: 15700, max: 59850, rate: 12, tax: 5304 },
        { min: 59850, max: 95475, rate: 22, tax: 7753.5 },
        { min: 95475, max: 182100, rate: 24, tax: 20826 },
        { min: 182100, max: 231250, rate: 32, tax: 15680 },
        { min: 231250, max: 578125, rate: 35, tax: 121812.5 },
        { min: 578125, max: Infinity, rate: 37, tax: Infinity },
      ],
    }

    const currentBrackets = brackets[filingStatus]

    // Find current bracket
    let currentBracket = currentBrackets.find(b => taxableIncome >= b.min && taxableIncome < b.max)
    if (!currentBracket) {
      currentBracket = currentBrackets[currentBrackets.length - 1]
    }

    // Calculate total tax
    let totalTax = 0
    for (const bracket of currentBrackets) {
      if (taxableIncome > bracket.min) {
        const incomeInBracket = Math.min(taxableIncome, bracket.max) - bracket.min
        totalTax += incomeInBracket * (bracket.rate / 100)
      }
    }

    const taxAfterCredits = Math.max(0, totalTax - taxCredits)
    const effectiveRate = income > 0 ? (taxAfterCredits / income) * 100 : 0

    // Calculate distance to next bracket threshold
    const bracketIndex = currentBrackets.findIndex(b => taxableIncome >= b.min && taxableIncome < b.max)
    const nextBracket = bracketIndex < currentBrackets.length - 1 ? currentBrackets[bracketIndex + 1] : null
    const distanceToNextBracket = nextBracket ? nextBracket.min - taxableIncome : Infinity
    const incomeToNextBracket = nextBracket ? nextBracket.min - taxableIncome + deductions : Infinity

    // Calculate marginal impact of additional income
    const marginalTaxRate = currentBracket.rate

    return {
      income: income.toFixed(0),
      deductions: deductions.toFixed(0),
      taxableIncome: taxableIncome.toFixed(0),
      filingStatus,
      currentBracketRate: currentBracket.rate.toFixed(0),
      currentBracketMin: currentBracket.min.toFixed(0),
      currentBracketMax: currentBracket.max === Infinity ? 'No limit' : currentBracket.max.toFixed(0),
      totalTax: totalTax.toFixed(2),
      taxCredits: taxCredits.toFixed(0),
      taxAfterCredits: taxAfterCredits.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      marginalTaxRate: marginalTaxRate.toFixed(0),
      distanceToNextBracket: distanceToNextBracket === Infinity ? 'No next bracket' : distanceToNextBracket.toFixed(0),
      incomeToNextBracket: incomeToNextBracket === Infinity ? 'No next bracket' : incomeToNextBracket.toFixed(0),
      nextBracketRate: nextBracket ? nextBracket.rate.toFixed(0) : 'No next bracket',
      brackets: currentBrackets,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Bracket Threshold Calculator</h1>
      <p className="text-gray-600 mb-4">Find your tax bracket and calculate distance to next threshold.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Gross Income ($)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married' | 'married_separate' | 'head_household')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
            <option value="head_household">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deductions ($)</label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Credits ($)</label>
          <input
            type="number"
            value={taxCredits}
            onChange={(e) => setTaxCredits(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Current Tax Bracket</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-bold ml-2">$ {result.taxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bracket Range:</span>
            <span className="font-medium ml-2">$ {result.currentBracketMin} - {result.currentBracketMax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Marginal Rate:</span>
            <span className="font-bold text-blue-700 ml-2">{result.currentBracketRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">After Credits:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.taxAfterCredits}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-medium ml-2">{result.effectiveRate}%</span>
          </div>
        </div>
      </div>

      {result.distanceToNextBracket !== 'No next bracket' && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Next Bracket Threshold</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Distance (Taxable):</span>
              <span className="font-bold text-orange-700 ml-2">$ {result.distanceToNextBracket}</span>
            </div>
            <div>
              <span className="text-zinc-600">Distance (Gross):</span>
              <span className="font-bold text-orange-700 ml-2">$ {result.incomeToNextBracket}</span>
            </div>
            <div>
              <span className="text-zinc-600">Next Rate:</span>
              <span className="font-bold text-red-600 ml-2">{result.nextBracketRate}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">2024 Tax Brackets ({filingStatus.replace('_', ' ')})</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          {result.brackets.map((bracket, index) => (
            <div key={index} className={`flex justify-between p-1 rounded ${parseFloat(result.taxableIncome) >= bracket.min && parseFloat(result.taxableIncome) < bracket.max ? 'bg-purple-200 font-bold' : ''}`}>
              <span>${bracket.min.toLocaleString()} - {bracket.max === Infinity ? '∞' : '$' + bracket.max.toLocaleString()}</span>
              <span>{bracket.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Bracket Threshold Planning</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Know your distance to next bracket threshold</li>
          <li>Stay below threshold to avoid higher marginal rate</li>
          <li>Increase pre-tax contributions to reduce taxable income</li>
          <li>Time income recognition (bonus, stock sales) strategically</li>
          <li>Bunch deductions in years near threshold</li>
          <li>Consider timing of Roth conversions vs income</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200 mt-4">
        <h3 className="font-medium mb-2 text-red-700">Marginal vs Effective Rate</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Marginal rate: rate on your LAST dollar of income</li>
          <li>Effective rate: total tax divided by total income</li>
          <li>Marginal rate determines impact of additional income</li>
          <li>Effective rate shows overall tax burden</li>
          <li>Additional income taxed at marginal rate, not effective</li>
          <li>Deductions reduce tax at marginal rate</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Strategies Near Threshold</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Maximize 401(k)/IRA contributions</li>
          <li>HSA contributions reduce taxable income</li>
          <li>Flexible Spending Account contributions</li>
          <li>Charitable donations for deduction</li>
          <li>Defer bonus to next year if near threshold</li>
          <li>Realize capital losses to offset gains</li>
        </ul>
      </div>
    </div>
  )
}