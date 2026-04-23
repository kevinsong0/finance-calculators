'use client'

import { useState } from 'react'

export default function SaltDeductionCalculator() {
  const [stateTaxesPaid, setStateTaxesPaid] = useState('')
  const [localTaxesPaid, setLocalTaxesPaid] = useState('')
  const [propertyTaxesPaid, setPropertyTaxesPaid] = useState('')
  const [adjustedGrossIncome, setAdjustedGrossIncome] = useState('')
  const [filingStatus, setFilingStatus] = useState('single')
  const [itemizeDeductions, setItemizeDeductions] = useState(true)
  const [otherDeductions, setOtherDeductions] = useState('')

  const calculate = () => {
    const stateTax = parseFloat(stateTaxesPaid) || 5000
    const localTax = parseFloat(localTaxesPaid) || 2000
    const propertyTax = parseFloat(propertyTaxesPaid) || 8000
    const agi = parseFloat(adjustedGrossIncome) || 120000
    const status = filingStatus
    const isItemizing = itemizeDeductions
    const otherDeduct = parseFloat(otherDeductions) || 0

    // TCJA SALT Cap: $10,000 for all filing statuses (2018-2025)
    const saltCap = 10000

    // Total SALT taxes paid
    const totalSaltPaid = stateTax + localTax + propertyTax

    // SALT deduction (capped at $10,000)
    const allowedSaltDeduction = Math.min(totalSaltPaid, saltCap)

    // Disallowed SALT (lost deduction)
    const disallowedSalt = Math.max(0, totalSaltPaid - saltCap)

    // Standard deduction 2026
    const standardDeduction: Record<string, number> = {
      'single': 15000,
      'married': 30000,
      'head_household': 22500
    }
    const standard = standardDeduction[status] || 15000

    // Total itemized deductions
    const totalItemized = allowedSaltDeduction + otherDeduct

    // Compare itemized vs standard
    const betterOption = totalItemized > standard ? 'itemize' : 'standard'
    const usedDeduction = Math.max(totalItemized, standard)
    const deductionBenefit = betterOption === 'itemize' ? totalItemized - standard : 0

    // Tax benefit calculation
    const marginalRate = agi > 200000 ? 0.32 : agi > 100000 ? 0.24 : 0.22
    const taxSavingsFromSalt = allowedSaltDeduction * marginalRate
    const taxSavingsFromStandard = standard * marginalRate

    // Tax cost of SALT cap
    const taxCostOfCap = disallowedSalt * marginalRate

    // State-by-state analysis
    const highTaxStates = ['CA', 'NY', 'NJ', 'CT', 'IL', 'MA']
    const isHighTaxState = totalSaltPaid > 15000 // Rough indicator

    // AMT consideration (SALT not deductible under AMT)
    const amtRisk = agi > 500000 && totalSaltPaid > saltCap

    // Pass-through entity tax (PTET) workaround
    // Some states allow entity-level SALT deduction (uncapped for business)
    const ptetEligible = status !== 'married' || agi > 100000

    return {
      stateTaxesPaid: stateTax.toFixed(2),
      localTaxesPaid: localTax.toFixed(2),
      propertyTaxesPaid: propertyTax.toFixed(2),
      totalSaltPaid: totalSaltPaid.toFixed(2),
      saltCap: saltCap.toFixed(0),
      allowedSaltDeduction: allowedSaltDeduction.toFixed(2),
      disallowedSalt: disallowedSalt.toFixed(2),
      standardDeduction: standard.toFixed(0),
      otherDeductions: otherDeduct.toFixed(2),
      totalItemized: totalItemized.toFixed(2),
      betterOption,
      usedDeduction: usedDeduction.toFixed(2),
      deductionBenefit: deductionBenefit.toFixed(2),
      marginalRate: (marginalRate * 100).toFixed(0),
      taxSavingsFromSalt: taxSavingsFromSalt.toFixed(2),
      taxSavingsFromStandard: taxSavingsFromStandard.toFixed(2),
      taxCostOfCap: taxCostOfCap.toFixed(2),
      filingStatus: status,
      adjustedGrossIncome: agi.toFixed(2),
      isHighTaxState,
      amtRisk,
      ptetEligible,
      saltCapExpires: '2025 (TCJA provision)',
      saltCapExtension: 'Likely extended or modified'
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">SALT Deduction Calculator</h1>
      <p className="text-zinc-600">Calculate State and Local Tax deduction under $10,000 TCJA cap and compare itemized vs standard deduction.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">SALT Taxes Paid</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State Income Taxes</label>
            <input
              type="number"
              value={stateTaxesPaid}
              onChange={(e) => setStateTaxesPaid(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter state income taxes paid"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Local/City Taxes</label>
            <input
              type="number"
              value={localTaxesPaid}
              onChange={(e) => setLocalTaxesPaid(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter local income taxes paid"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Property Taxes</label>
            <input
              type="number"
              value={propertyTaxesPaid}
              onChange={(e) => setPropertyTaxesPaid(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter property taxes paid"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single ($15,000 standard)</option>
              <option value="married">Married Joint ($30,000 standard)</option>
              <option value="head_household">Head of Household ($22,500 standard)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Adjusted Gross Income</label>
            <input
              type="number"
              value={adjustedGrossIncome}
              onChange={(e) => setAdjustedGrossIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter AGI"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Itemized Deductions</label>
            <input
              type="number"
              value={otherDeductions}
              onChange={(e) => setOtherDeductions(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Mortgage interest, charitable, medical"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">SALT Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Taxes</span>
            <span className="font-bold">$${result.stateTaxesPaid}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Local Taxes</span>
            <span className="font-bold">$${result.localTaxesPaid}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Property Taxes</span>
            <span className="font-bold">$${result.propertyTaxesPaid}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Total SALT Paid</span>
            <span className="font-bold">$${result.totalSaltPaid}</span>
          </div>
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">SALT Cap</span>
            <span className="font-bold text-red-600">$${result.saltCap} maximum</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Allowed SALT Deduction</span>
            <span className="font-bold text-green-600">$${result.allowedSaltDeduction}</span>
          </div>
          {parseFloat(result.disallowedSalt) > 0 && (
            <div className="bg-red-100 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Disallowed (Lost Deduction)</span>
              <span className="font-bold text-red-600">$${result.disallowedSalt}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Deduction Comparison</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Itemized</div>
            <div className="text-2xl font-bold">$${result.totalItemized}</div>
            <div className="text-xs text-zinc-400">SALT + Other deductions</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Standard Deduction</div>
            <div className="text-2xl font-bold">$${result.standardDeduction}</div>
          </div>
          <div className={`rounded p-4 ${result.betterOption === 'itemize' ? 'bg-blue-50' : 'bg-green-50'}`}>
            <div className="text-sm text-zinc-500">Better Option</div>
            <div className={`text-2xl font-bold ${result.betterOption === 'itemize' ? 'text-blue-600' : 'text-green-600'}`}>
              {result.betterOption === 'itemize' ? 'Itemize' : 'Standard'}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Deduction Used</div>
            <div className="text-2xl font-bold">$${result.usedDeduction}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Marginal Rate</div>
            <div className="text-2xl font-bold">{result.marginalRate}%</div>
          </div>
          <div className="bg-green-50 rounded p-4">
            <div className="text-sm text-zinc-500">Tax Savings (if itemize)</div>
            <div className="text-2xl font-bold text-green-600">$${result.taxSavingsFromSalt}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax Savings (standard)</div>
            <div className="text-2xl font-bold">$${result.taxSavingsFromStandard}</div>
          </div>
          {parseFloat(result.taxCostOfCap) > 0 && (
            <div className="bg-red-50 rounded p-4">
              <div className="text-sm text-zinc-500">Tax Cost of SALT Cap</div>
              <div className="text-2xl font-bold text-red-600">$${result.taxCostOfCap}</div>
            </div>
          )}
        </div>
      </div>

      {parseFloat(result.disallowedSalt) > 0 && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">SALT Cap Impact</h3>
          <div className="text-sm text-yellow-600">
            SALT taxes ($${result.totalSaltPaid}) exceed $10,000 cap. Lost deduction: $${result.disallowedSalt}. Tax cost: $${result.taxCostOfCap} at {result.marginalRate}% rate. High-tax states (CA, NY, NJ) impacted most. SALT cap expires after 2025 (TCJA provision).
          </div>
        </div>
      )}

      {result.betterOption === 'standard' && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Standard Deduction Better</h3>
          <div className="text-sm text-green-600">
            Standard deduction ($${result.standardDeduction}) exceeds itemized ($${result.totalItemized}). Use standard deduction. SALT cap makes itemizing less beneficial for many taxpayers. Consider if other deductions (mortgage interest, charitable) change this.
          </div>
        </div>
      )}

      {result.amtRisk && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">AMT Consideration</h3>
          <div className="text-sm text-red-600">
            High AGI ($${result.adjustedGrossIncome}) with high SALT may trigger Alternative Minimum Tax. Under AMT, SALT deduction is not allowed - itemized deductions provide no benefit. Calculate AMT liability separately.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SALT Deduction Components</h3>
        <div className="text-xs text-zinc-600">
          State and local income taxes OR sales taxes (choose one). Property taxes (real estate and personal property). Total capped at $10,000 for all filing statuses. Cap applies per return, not per person (married couples share one $10,000 cap).
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pass-Through Entity Tax (PTET) Workaround</h3>
        <div className="text-xs text-zinc-600">
          Some states (CA, NY, NJ, CT) allow pass-through entities to pay state tax at entity level. Entity-level SALT deduction is uncapped for businesses. S Corp, partnership owners benefit. Reduces individual SALT burden. State-specific rules and eligibility requirements vary.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SALT Cap Future</h3>
        <div className="text-xs text-zinc-600">
          $10,000 cap enacted by TCJA (2018-2025). Expires after 2025 unless extended. Proposed changes: Increase cap to $20,000, eliminate cap, or state-by-state adjustments. Monitor legislation changes for 2026 tax year. High-tax state residents benefit most from cap removal.
        </div>
      </div>
    </main>
  )
}