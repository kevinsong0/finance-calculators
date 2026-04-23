'use client'

import { useState } from 'react'

export default function TaxExemptBondTaxEquivalentCalculator() {
  const [taxFreeYield, setTaxFreeYield] = useState(3.5)
  const [taxableYield, setTaxableYield] = useState(5.0)
  const [federalRate, setFederalRate] = useState(24)
  const [stateRate, setStateRate] = useState(5)
  const [bondType, setBondType] = useState<'municipal' | 'treasury'>('municipal')
  const [isHomeState, setIsHomeState] = useState(true)
  const [investmentAmount, setInvestmentAmount] = useState(100000)

  const calculate = () => {
    // Tax-Exempt Bond Tax Equivalent Yield Calculator
    // Compare tax-free vs taxable bond yields after tax

    // Municipal bonds:
    // - Federal tax-free
    // - State tax-free if from home state
    // - Taxable if from other state

    // Treasury bonds:
    // - Federal taxable
    // - State tax-free (all states)

    // Tax-equivalent yield formula:
    // Tax-Free Yield / (1 - Combined Tax Rate) = Taxable Equivalent

    // Calculate combined tax rate
    let combinedRate = 0
    let stateTaxAppliesToTaxable = stateRate

    if (bondType === 'municipal') {
      if (isHomeState) {
        // Home state muni: federal + state tax-free
        combinedRate = 0 // No tax on tax-free bond
      } else {
        // Out-of-state muni: federal tax-free, state taxable
        combinedRate = stateRate / 100
      }
    } else if (bondType === 'treasury') {
      // Treasury: federal taxable, state tax-free
      combinedRate = federalRate / 100
    }

    // Tax-equivalent yield
    const taxEquivalentYield = combinedRate > 0 ? taxFreeYield / (1 - combinedRate) : taxFreeYield

    // After-tax yield on taxable bond
    const taxableCombinedRate = (federalRate + stateRate) / 100
    const afterTaxYield = taxableYield * (1 - taxableCombinedRate)

    // Compare yields
    const yieldComparison = taxEquivalentYield - taxableYield
    const afterTaxComparison = taxFreeYield - afterTaxYield

    // Income calculations
    const taxFreeIncome = investmentAmount * (taxFreeYield / 100)
    const taxableIncome = investmentAmount * (taxableYield / 100)
    const taxableIncomeAfterTax = taxableIncome * (1 - taxableCombinedRate)

    // Tax savings
    const taxSavings = taxableIncome - taxableIncomeAfterTax - (bondType === 'municipal' && isHomeState ? 0 : taxFreeIncome * combinedRate)

    // Recommendation
    let recommendation = ''
    if (taxEquivalentYield > taxableYield + 0.5) {
      recommendation = `Tax-free bond better. Equivalent yield ${taxEquivalentYield.toFixed(2)}% exceeds taxable ${taxableYield.toFixed(2)}%. Tax savings: $${taxSavings.toFixed(0)} per year. Choose tax-free.`
    } else if (taxableYield > taxEquivalentYield + 0.5) {
      recommendation = `Taxable bond better. After-tax yield ${afterTaxYield.toFixed(2)}% exceeds tax-free ${taxFreeYield.toFixed(2)}%. Higher nominal yield compensates for tax. Choose taxable.`
    } else {
      recommendation = `Yields roughly equivalent. Tax-free: ${taxFreeYield.toFixed(2)}%, Taxable after-tax: ${afterTaxYield.toFixed(2)}%. Consider liquidity, credit quality, and state tax treatment.`
    }

    if (bondType === 'municipal' && !isHomeState) {
      recommendation += ` Out-of-state municipal taxable at state level. State tax: ${stateRate}%.`
    }

    // Bond comparison table
    const bondComparison = [
      { bond: 'Tax-Free Municipal (Home State)', yield: taxFreeYield, taxRate: 0, afterTaxYield: taxFreeYield, equivalentYield: taxFreeYield },
      { bond: 'Tax-Free Municipal (Other State)', yield: taxFreeYield, taxRate: stateRate, afterTaxYield: taxFreeYield * (1 - stateRate / 100), equivalentYield: taxFreeYield / (1 - stateRate / 100) },
      { bond: 'Treasury Bond', yield: taxFreeYield, taxRate: federalRate, afterTaxYield: taxFreeYield * (1 - federalRate / 100), equivalentYield: taxFreeYield / (1 - federalRate / 100) },
      { bond: 'Taxable Bond', yield: taxableYield, taxRate: federalRate + stateRate, afterTaxYield: afterTaxYield, equivalentYield: taxableYield },
    ]

    return {
      taxFreeYield: taxFreeYield.toFixed(2),
      taxableYield: taxableYield.toFixed(2),
      federalRate: federalRate.toFixed(0),
      stateRate: stateRate.toFixed(0),
      bondType,
      isHomeState,
      combinedRate: (combinedRate * 100).toFixed(1),
      taxEquivalentYield: taxEquivalentYield.toFixed(2),
      taxableCombinedRate: (taxableCombinedRate * 100).toFixed(1),
      afterTaxYield: afterTaxYield.toFixed(2),
      yieldComparison: yieldComparison.toFixed(2),
      afterTaxComparison: afterTaxComparison.toFixed(2),
      investmentAmount: investmentAmount.toFixed(0),
      taxFreeIncome: taxFreeIncome.toFixed(0),
      taxableIncome: taxableIncome.toFixed(0),
      taxableIncomeAfterTax: taxableIncomeAfterTax.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      bondComparison,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax-Exempt Bond Tax Equivalent Calculator</h1>
      <p className="text-gray-600 mb-4">Compare tax-free and taxable bond yields after tax.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax-Free Yield (%)</label>
          <input type="number" value={taxFreeYield} step="0.1" onChange={(e) => setTaxFreeYield(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taxable Yield (%)</label>
          <input type="number" value={taxableYield} step="0.1" onChange={(e) => setTaxableYield(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Federal Tax Rate (%)</label>
          <input type="number" value={federalRate} onChange={(e) => setFederalRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateRate} onChange={(e) => setStateRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bond Type</label>
          <select value={bondType} onChange={(e) => setBondType(e.target.value as 'municipal' | 'treasury')} className="w-full border rounded p-2">
            <option value="municipal">Municipal Bond</option>
            <option value="treasury">Treasury Bond</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Amount</label>
          <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        {bondType === 'municipal' && (
          <div>
            <label className="block text-sm font-medium mb-1">Home State Bond?</label>
            <select value={isHomeState ? 'yes' : 'no'} onChange={(e) => setIsHomeState(e.target.value === 'yes')} className="w-full border rounded p-2">
              <option value="yes">Yes - state tax-free</option>
              <option value="no">No - other state (state taxable)</option>
            </select>
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Treatment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Bond Type:</span><span className="font-medium ml-2">{result.bondType === 'municipal' ? 'Municipal' : 'Treasury'}</span></div>
          <div><span className="text-zinc-600">Federal:</span><span className={`font-bold ml-2 ${result.bondType === 'municipal' ? 'text-green-700' : 'text-red-700'}`}>{result.bondType === 'municipal' ? 'Tax-Free' : 'Taxable'}</span></div>
          <div><span className="text-zinc-600">State:</span><span className={`font-bold ml-2 ${result.bondType === 'treasury' || (result.bondType === 'municipal' && result.isHomeState) ? 'text-green-700' : 'text-red-700'}`}>{result.bondType === 'treasury' || (result.bondType === 'municipal' && result.isHomeState) ? 'Tax-Free' : 'Taxable'}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax-Equivalent Yield</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax-Free Yield:</span><span className="font-medium ml-2">{result.taxFreeYield}%</span></div>
          <div><span className="text-zinc-600">Tax Rate:</span><span className="font-medium ml-2">{result.combinedRate}%</span></div>
          <div><span className="text-zinc-600">Equivalent:</span><span className="font-bold text-green-700 ml-2">{result.taxEquivalentYield}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Tax-free {result.taxFreeYield}% = taxable {result.taxEquivalentYield}% after tax adjustment</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bond Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Bond Type</th>
                <th className="py-2 text-left">Yield</th>
                <th className="py-2 text-left">Tax Rate</th>
                <th className="py-2 text-left">After-Tax</th>
                <th className="py-2 text-left">Equivalent</th>
              </tr>
            </thead>
            <tbody>
              {result.bondComparison.map((b) => (
                <tr key={b.bond} className="border-b">
                  <td className="py-1 font-semibold">{b.bond}</td>
                  <td className="py-1">{b.yield.toFixed(2)}%</td>
                  <td className="py-1">{b.taxRate.toFixed(0)}%</td>
                  <td className="py-1">{b.afterTaxYield.toFixed(2)}%</td>
                  <td className="py-1 font-bold">{b.equivalentYield.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.yieldComparison) > 0 ? 'bg-green-50 border border-green-200' : Number(result.yieldComparison) < 0 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Yield Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax-Free:</span><span className="font-bold ml-2">{result.taxFreeYield}%</span></div>
          <div><span className="text-zinc-600">Taxable After-Tax:</span><span className="font-bold ml-2">{result.afterTaxYield}%</span></div>
          <div><span className="text-zinc-600">Difference:</span><span className={`font-bold ml-2 ${Number(result.afterTaxComparison) > 0 ? 'text-green-700' : 'text-red-700'}`}>{result.afterTaxComparison}%</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Income Analysis ($ {result.investmentAmount})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax-Free Income:</span><span className="font-medium ml-2">$ {result.taxFreeIncome}</span></div>
          <div><span className="text-zinc-600">Taxable Income:</span><span className="font-medium ml-2">$ {result.taxableIncome}</span></div>
          <div><span className="text-zinc-600">After-Tax:</span><span className="font-bold ml-2">$ {result.taxableIncomeAfterTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Tax Savings:</span><span className={`font-bold ml-2 ${Number(result.taxSavings) > 0 ? 'text-green-700' : ''}`}>$ {result.taxSavings}</span></div>
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax-Exempt Bond Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Municipal: federal tax-free</li>
          <li>Home state muni: state tax-free</li>
          <li>Out-of-state muni: state taxable</li>
          <li>Treasury: state tax-free</li>
          <li>Tax-equivalent yield formula</li>
          <li>Higher tax bracket = higher equivalent</li>
          <li>Consider credit quality</li>
          <li>AMT may apply (private activity)</li>
          <li>SS taxation affected by muni</li>
          <li>Compare risk levels</li>
        </ul>
      </div>
    </div>
  )
}