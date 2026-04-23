'use client'

import { useState } from 'react'

export default function ForeignTaxCreditCalculator() {
  const [foreignIncome, setForeignIncome] = useState(10000)
  const [foreignTaxPaid, setForeignTaxPaid] = useState(2500)
  const [usTaxBeforeCredit, setUsTaxBeforeCredit] = useState(3000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    const foreignTaxLimit = usTaxBeforeCredit * (foreignIncome / (foreignIncome + 100000))
    const tentativeCredit = Math.min(foreignTaxPaid, foreignTaxLimit)
    const excessCredit = foreignTaxPaid - tentativeCredit
    const carryback1Year = Math.min(excessCredit, tentativeCredit)
    const carryforward10Years = excessCredit - carryback1Year
    const netUsTax = usTaxBeforeCredit - tentativeCredit
    const effectiveForeignRate = (foreignTaxPaid / foreignIncome) * 100
    const effectiveUsRate = (netUsTax / foreignIncome) * 100

    return {
      foreignIncome: foreignIncome.toFixed(2),
      foreignTaxPaid: foreignTaxPaid.toFixed(2),
      usTaxBeforeCredit: usTaxBeforeCredit.toFixed(2),
      foreignTaxLimit: foreignTaxLimit.toFixed(2),
      tentativeCredit: tentativeCredit.toFixed(2),
      excessCredit: excessCredit.toFixed(2),
      carryback1Year: carryback1Year.toFixed(2),
      carryforward10Years: carryforward10Years.toFixed(2),
      netUsTax: netUsTax.toFixed(2),
      effectiveForeignRate: effectiveForeignRate.toFixed(2),
      effectiveUsRate: effectiveUsRate.toFixed(2),
      canClaimCredit: tentativeCredit > 0,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Foreign Tax Credit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate foreign tax credit to avoid double taxation on foreign income.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Foreign Source Income ($)</label>
          <input
            type="number"
            value={foreignIncome}
            onChange={(e) => setForeignIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Foreign Tax Paid ($)</label>
          <input
            type="number"
            value={foreignTaxPaid}
            onChange={(e) => setForeignTaxPaid(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">US Tax on Income Before Credit ($)</label>
          <input
            type="number"
            value={usTaxBeforeCredit}
            onChange={(e) => setUsTaxBeforeCredit(Number(e.target.value))}
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
        <h2 className="text-lg font-semibold mb-3">Foreign Tax Credit Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Foreign Income:</span>
            <span className="font-medium ml-2">$ {result.foreignIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Foreign Tax Paid:</span>
            <span className="font-medium ml-2">$ {result.foreignTaxPaid}</span>
          </div>
          <div>
            <span className="text-zinc-600">Foreign Tax Limit:</span>
            <span className="font-medium ml-2">$ {result.foreignTaxLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Credit Allowed:</span>
            <span className="font-medium ml-2 text-green-600">$ {result.tentativeCredit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Excess Credit:</span>
            <span className="font-medium ml-2">$ {result.excessCredit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net US Tax:</span>
            <span className="font-medium ml-2">$ {result.netUsTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Carryover Credits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Carryback (1 year):</span>
            <span className="font-medium ml-2">$ {result.carryback1Year}</span>
          </div>
          <div>
            <span className="text-zinc-600">Carryforward (10 years):</span>
            <span className="font-medium ml-2">$ {result.carryforward10Years}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Foreign Tax Credit Rules</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Credit Limit:</strong> Cannot exceed US tax on foreign-source income. If foreign tax rate exceeds US rate, excess can be carried back 1 year and forward 10 years.</p>
          <p><strong>Qualifying Taxes:</strong> Income taxes, war profits taxes, excess profits taxes paid to foreign country or US possession. Must be compulsory, not voluntary.</p>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Common Foreign Tax Credit Sources</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Foreign stock dividends (tax withheld at source)</li>
          <li>Foreign mutual fund distributions</li>
          <li>Foreign rental income</li>
          <li>Foreign business income</li>
          <li>Foreign pension income</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">FTC vs Foreign Tax Deduction</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Credit:</strong> Reduces US tax dollar-for-dollar (usually better)</li>
          <li><strong>Deduction:</strong> Itemized deduction, reduces taxable income</li>
          <li>Credit preferred when foreign tax rate equals or exceeds US rate</li>
          <li>Deduction may be better if foreign tax exceeds US tax significantly</li>
          <li>Cannot claim both credit and deduction for same foreign tax</li>
        </ul>
      </div>
    </div>
  )
}