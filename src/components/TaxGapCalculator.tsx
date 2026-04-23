'use client'

import { useState } from 'react'

export default function TaxGapCalculator() {
  const [grossIncome, setGrossIncome] = useState(200000)
  const [totalDeductions, setTotalDeductions] = useState(30000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    const taxableIncome = grossIncome - totalDeductions

    let marginalRate = 0
    let totalTax = 0
    let brackets: { bracket: string; income: number; tax: number }[] = []

    if (filingStatus === 'single') {
      const limits = [0, 11000, 44725, 95475, 182100, 231250, 578125, Infinity]
      const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]

      let remaining = taxableIncome
      let prevLimit = 0

      for (let i = 0; i < rates.length && remaining > 0; i++) {
        const bracketWidth = limits[i + 1] - prevLimit
        const bracketIncome = Math.min(remaining, bracketWidth)
        const bracketTax = bracketIncome * rates[i]

        if (bracketIncome > 0) {
          brackets.push({
            bracket: `$${prevLimit.toLocaleString()} - $${limits[i + 1] === Infinity ? '∞' : limits[i + 1].toLocaleString()}`,
            income: bracketIncome,
            tax: bracketTax,
          })
        }

        totalTax += bracketTax
        remaining -= bracketIncome
        prevLimit = limits[i + 1]

        if (bracketIncome > 0) marginalRate = rates[i]
      }
    } else {
      const limits = [0, 22000, 89450, 190750, 364200, 462500, 693750, Infinity]
      const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]

      let remaining = taxableIncome
      let prevLimit = 0

      for (let i = 0; i < rates.length && remaining > 0; i++) {
        const bracketWidth = limits[i + 1] - prevLimit
        const bracketIncome = Math.min(remaining, bracketWidth)
        const bracketTax = bracketIncome * rates[i]

        if (bracketIncome > 0) {
          brackets.push({
            bracket: `$${prevLimit.toLocaleString()} - $${limits[i + 1] === Infinity ? '∞' : limits[i + 1].toLocaleString()}`,
            income: bracketIncome,
            tax: bracketTax,
          })
        }

        totalTax += bracketTax
        remaining -= bracketIncome
        prevLimit = limits[i + 1]

        if (bracketIncome > 0) marginalRate = rates[i]
      }
    }

    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0
    const effectiveRateGross = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0
    const taxGap = (marginalRate * 100) - effectiveRate
    const marginalVsEffective = totalTax > 0 ? `Marginal ${(marginalRate * 100).toFixed(0)}% vs Effective ${effectiveRate.toFixed(1)}%` : 'No tax liability'

    return {
      grossIncome: grossIncome.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      totalTax: totalTax.toFixed(2),
      marginalRate: (marginalRate * 100).toFixed(0),
      effectiveRate: effectiveRate.toFixed(2),
      effectiveRateGross: effectiveRateGross.toFixed(2),
      taxGap: taxGap.toFixed(2),
      marginalVsEffective,
      brackets,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Gap Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate the difference between your marginal tax rate and effective tax rate.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Gross Income ($)</label>
          <input
            type="number"
            value={grossIncome}
            onChange={(e) => setGrossIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Deductions ($)</label>
          <input
            type="number"
            value={totalDeductions}
            onChange={(e) => setTotalDeductions(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Gross Income:</span>
            <span className="font-medium ml-2">$ {result.grossIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Deductions:</span>
            <span className="font-medium ml-2">$ {result.totalDeductions}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-medium ml-2">$ {result.taxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-medium ml-2">$ {result.totalTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Marginal vs Effective Rate</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Marginal Rate:</span>
            <span className="font-bold text-orange-700 ml-2">{result.marginalRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate (on taxable):</span>
            <span className="font-bold text-green-700 ml-2">{result.effectiveRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate (on gross):</span>
            <span className="font-medium ml-2">{result.effectiveRateGross}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Gap:</span>
            <span className="font-bold text-blue-700 ml-2">{result.taxGap}%</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-4">
          {result.marginalVsEffective} - Your actual tax burden is lower than your top bracket rate because lower brackets fill first.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bracket Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Bracket</th>
                <th className="text-right py-1">Income</th>
                <th className="text-right py-1">Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.brackets.map((b, i) => (
                <tr key={i} className="border-b border-green-100">
                  <td className="py-1">{b.bracket}</td>
                  <td className="text-right">$ {b.income.toFixed(2)}</td>
                  <td className="text-right">$ {b.tax.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Understanding Tax Gap</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Marginal Rate:</strong> The rate applied to your LAST dollar of income. This is your "tax bracket" - what you see on tax tables.</p>
          <p><strong>Effective Rate:</strong> Your actual average tax rate - total tax divided by income. Always lower than marginal due to progressive brackets.</p>
          <p><strong>Tax Gap:</strong> The difference between marginal and effective rates. Larger gap = more income spread across lower brackets.</p>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Why Effective Rate Matters</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Use effective rate for true tax burden comparison</li>
          <li>Marginal rate only matters for additional income decisions</li>
          <li>Effective rate helps evaluate overall financial situation</li>
          <li>Compare effective rates across years to track tax efficiency</li>
          <li>Use effective rate when comparing to flat-tax alternatives</li>
        </ul>
      </div>
    </div>
  )
}