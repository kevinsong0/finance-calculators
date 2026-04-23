'use client'

import { useState } from 'react'

export default function StateTaxComparisonCalculator() {
  const [currentState, setCurrentState] = useState('CA')
  const [targetState, setTargetState] = useState('TX')
  const [income, setIncome] = useState('150000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [propertyValue, setPropertyValue] = useState('500000')
  const [hasCapitalGains, setHasCapitalGains] = useState('0')
  const [deductions, setDeductions] = useState('14600')

  // State tax data (simplified, 2024 estimates)
  const stateTaxData: Record<string, {
    hasIncomeTax: boolean;
    topRate: number;
    brackets: Array<{ min: number; max: number; rate: number }>;
    propertyTaxRate: number;
    salesTaxRate: number;
    capitalGainsTreatment: string;
  }> = {
    CA: { hasIncomeTax: true, topRate: 0.132, brackets: [{ min: 0, max: 10000, rate: 0.01 }, { min: 10000, max: 25000, rate: 0.02 }, { min: 25000, max: 50000, rate: 0.04 }, { min: 50000, max: 100000, rate: 0.06 }, { min: 100000, max: 250000, rate: 0.08 }, { min: 250000, max: 500000, rate: 0.093 }, { min: 500000, max: 1000000, rate: 0.103 }, { min: 1000000, max: Infinity, rate: 0.132 }], propertyTaxRate: 0.007, salesTaxRate: 0.088, capitalGainsTreatment: 'Same as ordinary' },
    TX: { hasIncomeTax: false, topRate: 0, brackets: [], propertyTaxRate: 0.018, salesTaxRate: 0.0825, capitalGainsTreatment: 'No state tax' },
    FL: { hasIncomeTax: false, topRate: 0, brackets: [], propertyTaxRate: 0.011, salesTaxRate: 0.06, capitalGainsTreatment: 'No state tax' },
    NY: { hasIncomeTax: true, topRate: 0.0882, brackets: [{ min: 0, max: 8500, rate: 0.04 }, { min: 8500, max: 11700, rate: 0.0445 }, { min: 11700, max: 23500, rate: 0.0525 }, { min: 23500, max: 50000, rate: 0.055 }, { min: 50000, max: 150000, rate: 0.06 }, { min: 150000, max: 250000, rate: 0.0685 }, { min: 250000, max: Infinity, rate: 0.0882 }], propertyTaxRate: 0.014, salesTaxRate: 0.08, capitalGainsTreatment: 'Same as ordinary' },
    WA: { hasIncomeTax: false, topRate: 0, brackets: [], propertyTaxRate: 0.009, salesTaxRate: 0.1025, capitalGainsTreatment: '7% on gains over $262K' },
    NV: { hasIncomeTax: false, topRate: 0, brackets: [], propertyTaxRate: 0.0069, salesTaxRate: 0.082, capitalGainsTreatment: 'No state tax' },
    AZ: { hasIncomeTax: true, topRate: 0.045, brackets: [{ min: 0, max: 28000, rate: 0.0259 }, { min: 28000, max: 56000, rate: 0.0334 }, { min: 56000, max: 168000, rate: 0.0417 }, { min: 168000, max: Infinity, rate: 0.045 }], propertyTaxRate: 0.0065, salesTaxRate: 0.084, capitalGainsTreatment: 'Same as ordinary' },
    CO: { hasIncomeTax: true, topRate: 0.044, brackets: [{ min: 0, max: Infinity, rate: 0.044 }], propertyTaxRate: 0.0055, salesTaxRate: 0.0725, capitalGainsTreatment: 'Same as ordinary' },
    PA: { hasIncomeTax: true, topRate: 0.0307, brackets: [{ min: 0, max: Infinity, rate: 0.0307 }], propertyTaxRate: 0.013, salesTaxRate: 0.06, capitalGainsTreatment: 'Same as ordinary' },
    IL: { hasIncomeTax: true, topRate: 0.0495, brackets: [{ min: 0, max: Infinity, rate: 0.0495 }], propertyTaxRate: 0.02, salesTaxRate: 0.0625, capitalGainsTreatment: 'Same as ordinary' },
  }

  const calculateStateTax = (state: string, taxableIncome: number, capitalGains: number) => {
    const data = stateTaxData[state]
    if (!data || !data.hasIncomeTax) {
      // Handle states with special capital gains tax
      if (state === 'WA' && capitalGains > 262000) {
        return capitalGains * 0.07
      }
      return 0
    }

    // Calculate tax using brackets
    let tax = 0
    let remaining = taxableIncome
    for (const bracket of data.brackets) {
      if (remaining <= 0) break
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
      tax += taxableInBracket * bracket.rate
      remaining -= taxableInBracket
    }

    // Add capital gains treatment
    if (data.capitalGainsTreatment === 'Same as ordinary') {
      // Already included in taxable income
    } else if (data.capitalGainsTreatment === 'No state tax') {
      tax = tax - capitalGains * 0 // No adjustment needed
    }

    return tax
  }

  const calculate = () => {
    const grossIncome = parseFloat(income) || 0
    const capitalGains = parseFloat(hasCapitalGains) || 0
    const totalIncome = grossIncome + capitalGains
    const ded = parseFloat(deductions) || 0
    const taxableIncome = Math.max(0, totalIncome - ded)
    const propValue = parseFloat(propertyValue) || 0

    const currentData = stateTaxData[currentState]
    const targetData = stateTaxData[targetState]

    // Calculate taxes for both states
    const currentIncomeTax = calculateStateTax(currentState, taxableIncome, capitalGains)
    const targetIncomeTax = calculateStateTax(targetState, taxableIncome, capitalGains)

    const currentPropertyTax = propValue * (currentData?.propertyTaxRate || 0)
    const targetPropertyTax = propValue * (targetData?.propertyTaxRate || 0)

    const currentTotalTax = currentIncomeTax + currentPropertyTax
    const targetTotalTax = targetIncomeTax + targetPropertyTax

    const taxDifference = currentTotalTax - targetTotalTax
    const effectiveRateCurrent = (currentTotalTax / totalIncome) * 100
    const effectiveRateTarget = (targetTotalTax / totalIncome) * 100

    // Estimated annual savings/cost
    const annualSavings = taxDifference
    const tenYearSavings = taxDifference * 10

    // Sales tax impact (estimated annual spending)
    const estimatedSpending = 50000 // Simplified assumption
    const currentSalesTax = estimatedSpending * (currentData?.salesTaxRate || 0)
    const targetSalesTax = estimatedSpending * (targetData?.salesTaxRate || 0)

    return {
      currentState: currentState,
      targetState: targetState,
      grossIncome: grossIncome.toFixed(2),
      capitalGains: capitalGains.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      currentIncomeTax: currentIncomeTax.toFixed(2),
      targetIncomeTax: targetIncomeTax.toFixed(2),
      currentPropertyTax: currentPropertyTax.toFixed(2),
      targetPropertyTax: targetPropertyTax.toFixed(2),
      currentSalesTax: currentSalesTax.toFixed(2),
      targetSalesTax: targetSalesTax.toFixed(2),
      currentTotalTax: currentTotalTax.toFixed(2),
      targetTotalTax: targetTotalTax.toFixed(2),
      taxDifference: taxDifference.toFixed(2),
      effectiveRateCurrent: effectiveRateCurrent.toFixed(2),
      effectiveRateTarget: effectiveRateTarget.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
      tenYearSavings: tenYearSavings.toFixed(2),
      currentHasIncomeTax: currentData?.hasIncomeTax || false,
      targetHasIncomeTax: targetData?.hasIncomeTax || false,
      currentTopRate: ((currentData?.topRate || 0) * 100).toFixed(1),
      targetTopRate: ((targetData?.topRate || 0) * 100).toFixed(1),
      currentPropertyRate: ((currentData?.propertyTaxRate || 0) * 100).toFixed(2),
      targetPropertyRate: ((targetData?.propertyTaxRate || 0) * 100).toFixed(2),
      currentSalesRate: ((currentData?.salesTaxRate || 0) * 100).toFixed(1),
      targetSalesRate: ((targetData?.salesTaxRate || 0) * 100).toFixed(1),
      currentCapitalGainsTreatment: currentData?.capitalGainsTreatment || 'Unknown',
      targetCapitalGainsTreatment: targetData?.capitalGainsTreatment || 'Unknown',
      isRelocationBeneficial: taxDifference > 0,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">State Tax Comparison Calculator</h1>
      <p className="text-zinc-600">Compare total tax burden between states including income tax, property tax, and capital gains treatment for relocation decisions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Capital Gains ($)</label>
            <input
              type="number"
              value={hasCapitalGains}
              onChange={(e) => setHasCapitalGains(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Deductions ($)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">State Comparison</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current State</label>
            <select
              value={currentState}
              onChange={(e) => setCurrentState(e.target.value)}
              className="input"
            >
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="WA">Washington</option>
              <option value="NV">Nevada</option>
              <option value="AZ">Arizona</option>
              <option value="CO">Colorado</option>
              <option value="PA">Pennsylvania</option>
              <option value="IL">Illinois</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target State</label>
            <select
              value={targetState}
              onChange={(e) => setTargetState(e.target.value)}
              className="input"
            >
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="WA">Washington</option>
              <option value="NV">Nevada</option>
              <option value="AZ">Arizona</option>
              <option value="CO">Colorado</option>
              <option value="PA">Pennsylvania</option>
              <option value="IL">Illinois</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Property Value ($)</label>
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">{currentState} Tax Rates</h3>
          <div className="text-sm space-y-1">
            <div><span className="text-zinc-600">Income Tax:</span> {result.currentHasIncomeTax ? `${result.currentTopRate}% top rate` : 'None'}</div>
            <div><span className="text-zinc-600">Property Tax:</span> {result.currentPropertyRate}%</div>
            <div><span className="text-zinc-600">Sales Tax:</span> {result.currentSalesRate}%</div>
            <div><span className="text-zinc-600">Capital Gains:</span> {result.currentCapitalGainsTreatment}</div>
          </div>
        </div>

        <div className="card bg-purple-50 border border-purple-200">
          <h3 className="font-medium mb-2 text-purple-700">{targetState} Tax Rates</h3>
          <div className="text-sm space-y-1">
            <div><span className="text-zinc-600">Income Tax:</span> {result.targetHasIncomeTax ? `${result.targetTopRate}% top rate` : 'None'}</div>
            <div><span className="text-zinc-600">Property Tax:</span> {result.targetPropertyRate}%</div>
            <div><span className="text-zinc-600">Sales Tax:</span> {result.targetSalesRate}%</div>
            <div><span className="text-zinc-600">Capital Gains:</span> {result.targetCapitalGainsTreatment}</div>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Tax Comparison</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">{currentState} Income Tax:</span>
            <span className="font-medium ml-2">${result.currentIncomeTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">{targetState} Income Tax:</span>
            <span className="font-medium ml-2">${result.targetIncomeTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">{currentState} Property Tax:</span>
            <span className="font-medium ml-2">${result.currentPropertyTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">{targetState} Property Tax:</span>
            <span className="font-medium ml-2">${result.targetPropertyTax}</span>
          </div>
        </div>
      </div>

      <div className={`card ${result.isRelocationBeneficial ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isRelocationBeneficial ? 'text-green-700' : 'text-red-700'}`}>
          {result.isRelocationBeneficial ? 'Relocation Tax Savings' : 'Relocation Tax Cost'}
        </h3>
        <div className="text-2xl font-bold">
          ${Math.abs(parseFloat(result.taxDifference)).toFixed(2)}
          <span className="text-sm ml-2">{result.isRelocationBeneficial ? 'saved annually' : 'additional cost annually'}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
          <div>
            <span className="text-zinc-600">{currentState} Total:</span>
            <span className="font-medium ml-2">${result.currentTotalTax}</span>
            <span className="text-xs ml-1">({result.effectiveRateCurrent}% eff.)</span>
          </div>
          <div>
            <span className="text-zinc-600">{targetState} Total:</span>
            <span className="font-medium ml-2">${result.targetTotalTax}</span>
            <span className="text-xs ml-1">({result.effectiveRateTarget}% eff.)</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Long-term Impact</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">10-Year Savings/Cost:</span>
            <span className="font-medium ml-2">${Math.abs(parseFloat(result.tenYearSavings)).toFixed(2)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Sales Tax Difference:</span>
            <span className="font-medium ml-2">${Math.abs(parseFloat(result.currentSalesTax) - parseFloat(result.targetSalesTax)).toFixed(2)}/year</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>No income tax states: TX, FL, WA, NV, SD, AK, TN, NH (interest/dividends only).</li>
          <li>Property taxes vary significantly: TX (~1.8%), CA (~0.7%), NJ (~2.5% highest).</li>
          <li>Capital gains: Most states tax same as ordinary income, WA has 7% on gains over $262K.</li>
          <li>Sales tax: Combined state+local rates range from ~6% to ~10%+.</li>
          <li>Consider cost of living, job market, climate, and lifestyle factors beyond taxes.</li>
          <li>Establish residency properly: Register vehicles, update IDs, spend 183+ days.</li>
        </ul>
      </div>
    </main>
  )
}