'use client'

import { useState } from 'react'

export default function InheritanceTaxCalculator() {
  const [inheritanceAmount, setInheritanceAmount] = useState('')
  const [inheritanceType, setInheritanceType] = useState('cash')
  const [relationship, setRelationship] = useState('child')
  const [state, setState] = useState('federal')
  const [beneficiaryAge, setBeneficiaryAge] = useState('')

  const calculate = () => {
    const amount = parseFloat(inheritanceAmount) || 500000
    const type = inheritanceType
    const relation = relationship
    const age = parseInt(beneficiaryAge) || 30

    // Federal inheritance tax (same as estate tax for deceased)
    // Beneficiary pays no federal inheritance tax
    const federalTax = 0

    // State inheritance taxes (varies by relationship)
    const stateInheritanceRates: Record<string, Record<string, [number, number]>> = {
      'NJ': {
        'child': [0, 672000],
        'sibling': [11, 25000],
        'other': [15, 0]
      },
      'PA': {
        'child': [0, 0],
        'sibling': [12, 0],
        'other': [15, 0]
      },
      'KY': {
        'child': [0, 1000],
        'sibling': [4, 1000],
        'other': [6, 1000]
      },
      'IA': {
        'child': [0, 0],
        'sibling': [5, 0],
        'other': [10, 0]
      },
      'MD': {
        'child': [0, 50000],
        'sibling': [10, 1000],
        'other': [15, 0]
      },
      'federal': {
        'child': [0, 0],
        'sibling': [0, 0],
        'other': [0, 0]
      }
    }

    const rates = stateInheritanceRates[state] || stateInheritanceRates['federal']
    const [rate, exemption] = rates[relation] || [0, 0]

    const taxableAmount = Math.max(0, amount - exemption)
    const stateTax = taxableAmount * (rate / 100)
    const totalTax = federalTax + stateTax
    const netInheritance = amount - totalTax

    // Special considerations by asset type
    let assetConsideration = ''
    let stepUpValue = amount
    if (type === 'stock') {
      assetConsideration = 'Stocks get step-up in basis. Capital gains tax only on appreciation after inheritance date.'
      stepUpValue = amount // Fair market value at death
    } else if (type === 'real_estate') {
      assetConsideration = 'Real estate gets step-up in basis. Consider property taxes and maintenance costs.'
    } else if (type === 'ira') {
      assetConsideration = 'IRA/401(k) distributions taxed as ordinary income to beneficiary. Consider stretch IRA options.'
    } else if (type === 'life_insurance') {
      assetConsideration = 'Life insurance generally tax-free to beneficiaries. Not included in inheritance calculation.'
    }

    return {
      inheritanceAmount: amount.toFixed(2),
      federalTax: federalTax.toFixed(2),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netInheritance: netInheritance.toFixed(2),
      stateTaxRate: rate,
      exemption: exemption.toFixed(2),
      taxableAmount: taxableAmount.toFixed(2),
      relationship: relation,
      state,
      assetType: type,
      assetConsideration,
      effectiveRate: amount > 0 ? (totalTax / amount * 100).toFixed(1) : '0',
      hasStateInheritanceTax: state !== 'federal' && rate > 0,
      isTaxFree: totalTax === 0,
      beneficiaryAge: age
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Inheritance Tax Calculator</h1>
      <p className="text-zinc-600">Calculate taxes on inherited assets based on state, relationship, and asset type.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Inheritance Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Inheritance Amount</label>
            <input
              type="number"
              value={inheritanceAmount}
              onChange={(e) => setInheritanceAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter inherited amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Asset Type</label>
            <select
              value={inheritanceType}
              onChange={(e) => setInheritanceType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="cash">Cash/Savings</option>
              <option value="stock">Stocks/Investments</option>
              <option value="real_estate">Real Estate</option>
              <option value="ira">IRA/401(k)</option>
              <option value="life_insurance">Life Insurance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Relationship to Deceased</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="child">Child/Grandchild</option>
              <option value="sibling">Sibling</option>
              <option value="other">Other Relative/Friend</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="federal">Federal Only (No State Inheritance Tax)</option>
              <option value="NJ">New Jersey</option>
              <option value="PA">Pennsylvania</option>
              <option value="KY">Kentucky</option>
              <option value="IA">Iowa</option>
              <option value="MD">Maryland</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Beneficiary Age</label>
            <input
              type="number"
              value={beneficiaryAge}
              onChange={(e) => setBeneficiaryAge(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your age"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Inheritance Amount</div>
            <div className="text-2xl font-bold">$${result.inheritanceAmount}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Tax</div>
            <div className={`text-2xl font-bold ${result.isTaxFree ? 'text-green-600' : 'text-red-600'}`}>
              $${result.totalTax}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Net to Beneficiary</div>
            <div className="text-2xl font-bold text-green-600">$${result.netInheritance}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective Rate</div>
            <div className="text-2xl font-bold">{result.effectiveRate}%</div>
          </div>
        </div>
      </div>

      {result.isTaxFree ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">No Inheritance Tax</h3>
          <div className="text-sm text-green-600">
            As a {result.relationship}, you pay no inheritance tax on this inheritance in {result.state === 'federal' ? 'most states' : result.state}. Federal inheritance tax does not exist (estate tax paid by deceased's estate).
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">State Inheritance Tax Applies</h3>
          <div className="text-sm text-yellow-600">
            {result.state} imposes {result.stateTaxRate}% inheritance tax on {result.relationship} after $${result.exemption} exemption. Taxable amount: $${result.taxableAmount}. Consider tax planning options.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Asset-Specific Considerations</h3>
        <div className="text-xs text-zinc-600">
          {result.assetConsideration}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Inheritance vs Estate Tax</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Inheritance Tax</strong>
            <div className="text-zinc-500">Paid by beneficiary. Only 6 states have it. Rate varies by relationship. Exemptions differ by heir class.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Estate Tax</strong>
            <div className="text-zinc-500">Paid by deceased's estate before distribution. Federal + 17 states. High exemption ($13.61M federal). Beneficiary receives net amount.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">State Inheritance Tax Rates</h3>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="bg-white rounded p-2">Child: 0% (most states)</div>
          <div className="bg-white rounded p-2">Sibling: 4-15%</div>
          <div className="bg-white rounded p-2">Other: 10-18%</div>
        </div>
        <div className="text-xs text-zinc-500 mt-2">
          States with inheritance tax: NJ, PA, KY, IA, MD. Rates exempt close relatives (children, spouse). Higher rates for distant relatives and non-relatives.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Planning Tips</h3>
        <div className="text-xs text-zinc-600">
          Step-up basis eliminates capital gains on inherited assets. Consider gift during lifetime (annual exclusion $17,000). Trusts can reduce taxable inheritance. Life insurance not subject to inheritance tax. IRA distributions have special rules - consult tax advisor.
        </div>
      </div>
    </main>
  )
}