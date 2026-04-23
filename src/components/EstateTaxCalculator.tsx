'use client'

import { useState } from 'react'

export default function EstateTaxCalculator() {
  const [totalAssets, setTotalAssets] = useState('')
  const [lifeInsurance, setLifeInsurance] = useState('')
  const [giftsMade, setGiftsMade] = useState('')
  const [state, setState] = useState('federal')
  const [yearOfDeath, setYearOfDeath] = useState('2024')

  const calculate = () => {
    const assets = parseFloat(totalAssets) || 5000000
    const insurance = parseFloat(lifeInsurance) || 0
    const gifts = parseFloat(giftsMade) || 0
    const year = parseInt(yearOfDeath) || 2024

    // Federal estate tax exemption (2024: $13.61 million)
    const federalExemption = year >= 2024 ? 13610000 : year >= 2023 ? 12920000 : 12060000
    const federalRate = 0.40 // 40% federal estate tax rate

    // Total taxable estate
    const grossEstate = assets + insurance + gifts
    const taxableEstate = Math.max(0, grossEstate - federalExemption)
    const federalTax = taxableEstate * federalRate

    // State estate tax (varies by state)
    const stateExemptions: Record<string, number> = {
      'NY': 6110000,
      'MA': 2000000,
      'CT': 13150000,
      'NJ': 675000,
      'MD': 5000000,
      'OR': 1000000,
      'VT': 5000000,
      'RI': 1876000,
      'HI': 5990000,
      'WA': 2500000,
      'MN': 3000000,
      'IL': 4000000,
      'ME': 6800000,
      'federal': 0
    }

    const stateExempt = stateExemptions[state] || 0
    const stateTaxable = Math.max(0, grossEstate - stateExempt)
    const stateRates: Record<string, number> = {
      'NY': 0.16, 'MA': 0.16, 'CT': 0.12, 'NJ': 0.16, 'MD': 0.10,
      'OR': 0.10, 'VT': 0.16, 'RI': 0.16, 'HI': 0.20, 'WA': 0.20,
      'MN': 0.10, 'IL': 0.08, 'ME': 0.12, 'federal': 0
    }
    const stateRate = stateRates[state] || 0
    const stateTax = stateTaxable * stateRate

    // Net estate to heirs
    const totalTax = federalTax + stateTax
    const netToHeirs = grossEstate - totalTax

    // Effective tax rate
    const effectiveRate = (totalTax / grossEstate) * 100

    // Tax reduction strategies
    const charitableDeduction = grossEstate * 0.10
    const taxWithCharity = Math.max(0, grossEstate - charitableDeduction - federalExemption) * federalRate

    return {
      grossEstate: grossEstate.toFixed(2),
      federalExemption: federalExemption.toFixed(2),
      taxableEstate: taxableEstate.toFixed(2),
      federalTax: federalTax.toFixed(2),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netToHeirs: netToHeirs.toFixed(2),
      effectiveRate: effectiveRate.toFixed(1),
      isTaxable: taxableEstate > 0 || stateTaxable > 0,
      charitableDeduction: charitableDeduction.toFixed(2),
      taxWithCharity: taxWithCharity.toFixed(2),
      charitySavings: (federalTax - taxWithCharity).toFixed(2)
    }
  }

  const result = calculate()

  // Recalculate with proper variable
  const recalc = () => {
    const assets = parseFloat(totalAssets) || 5000000
    const insurance = parseFloat(lifeInsurance) || 0
    const gifts = parseFloat(giftsMade) || 0
    const year = parseInt(yearOfDeath) || 2024

    const federalExemption = year >= 2024 ? 13610000 : year >= 2023 ? 12920000 : 12060000
    const federalRate = 0.40

    const grossEstate = assets + insurance + gifts
    const taxableEstate = Math.max(0, grossEstate - federalExemption)
    const federalTax = taxableEstate * federalRate

    const stateExemptions: Record<string, number> = {
      'NY': 6110000, 'MA': 2000000, 'CT': 13150000, 'NJ': 675000,
      'MD': 5000000, 'OR': 1000000, 'VT': 5000000, 'RI': 1876000,
      'HI': 5990000, 'WA': 2500000, 'MN': 3000000, 'IL': 4000000,
      'ME': 6800000, 'federal': 0
    }

    const stateExempt = stateExemptions[state] || 0
    const stateTaxable = Math.max(0, grossEstate - stateExempt)

    const stateRates: Record<string, number> = {
      'NY': 0.16, 'MA': 0.16, 'CT': 0.12, 'NJ': 0.16, 'MD': 0.10,
      'OR': 0.10, 'VT': 0.16, 'RI': 0.16, 'HI': 0.20, 'WA': 0.20,
      'MN': 0.10, 'IL': 0.08, 'ME': 0.12, 'federal': 0
    }

    const stateRate = stateRates[state] || 0
    const stateTax = stateTaxable * stateRate
    const totalTax = federalTax + stateTax
    const netToHeirs = grossEstate - totalTax
    const effectiveRate = grossEstate > 0 ? (totalTax / grossEstate) * 100 : 0

    return {
      grossEstate,
      federalExemption,
      taxableEstate,
      federalTax,
      stateTax,
      totalTax,
      netToHeirs,
      effectiveRate,
      isTaxable: taxableEstate > 0 || stateTaxable > 0
    }
  }

  const calcResult = recalc()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Estate Tax Calculator</h1>
      <p className="text-zinc-600">Calculate federal and state estate taxes on your inheritance and plan tax reduction strategies.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Estate Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Assets Value</label>
            <input
              type="number"
              value={totalAssets}
              onChange={(e) => setTotalAssets(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total estate value"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Life Insurance Proceeds</label>
            <input
              type="number"
              value={lifeInsurance}
              onChange={(e) => setLifeInsurance(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter life insurance value"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Lifetime Gifts Made</label>
            <input
              type="number"
              value={giftsMade}
              onChange={(e) => setGiftsMade(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter total lifetime gifts"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="federal">Federal Only</option>
              <option value="NY">New York</option>
              <option value="MA">Massachusetts</option>
              <option value="CT">Connecticut</option>
              <option value="NJ">New Jersey</option>
              <option value="MD">Maryland</option>
              <option value="OR">Oregon</option>
              <option value="VT">Vermont</option>
              <option value="RI">Rhode Island</option>
              <option value="HI">Hawaii</option>
              <option value="WA">Washington</option>
              <option value="MN">Minnesota</option>
              <option value="IL">Illinois</option>
              <option value="ME">Maine</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Year of Death</label>
            <select
              value={yearOfDeath}
              onChange={(e) => setYearOfDeath(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Estate Tax Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Gross Estate</div>
            <div className="text-2xl font-bold">$${calcResult.grossEstate.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Federal Exemption</div>
            <div className="text-2xl font-bold text-green-600">$${calcResult.federalExemption.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Federal Tax</div>
            <div className={`text-2xl font-bold ${calcResult.federalTax > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${calcResult.federalTax.toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">State Tax</div>
            <div className={`text-2xl font-bold ${calcResult.stateTax > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${calcResult.stateTax.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Estate Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Estate Tax</div>
            <div className={`font-bold ${calcResult.totalTax > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${calcResult.totalTax.toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Net to Heirs</div>
            <div className="font-bold text-green-600">$${calcResult.netToHeirs.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Effective Tax Rate</div>
            <div className="font-bold">{calcResult.effectiveRate.toFixed(1)}%</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Status</div>
            <div className={`font-bold ${calcResult.isTaxable ? 'text-yellow-600' : 'text-green-600'}`}>
              {calcResult.isTaxable ? 'Taxable Estate' : 'Below Exemption'}
            </div>
          </div>
        </div>
      </div>

      {!calcResult.isTaxable && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">No Estate Tax</h3>
          <div className="text-sm text-green-600">
            Your estate is below the federal exemption of $${calcResult.federalExemption.toFixed(2)}. No federal estate tax applies.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Reduction Strategies</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Annual Gift Exclusion</strong>
            <div className="text-zinc-500">Gift $17,000/year per person (2024) without reducing exemption</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Charitable Deduction</strong>
            <div className="text-zinc-500">Leave portion to charity, reduces taxable estate</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Irrevocable Life Insurance Trust</strong>
            <div className="text-zinc-500">Remove life insurance from estate calculation</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Estate Tax Facts</h3>
        <div className="text-xs text-zinc-600">
          Federal exemption: $13.61 million (2024), doubles for married couples. Top federal rate: 40%. 17 states have estate or inheritance taxes. Estate tax applies before heirs receive inheritance. Planning can significantly reduce or eliminate estate taxes.
        </div>
      </div>
    </main>
  )
}