'use client'

import { useState } from 'react'

export default function PropertyTaxCalculator() {
  const [propertyValue, setPropertyValue] = useState('')
  const [state, setState] = useState('california')
  const [county, setCounty] = useState('')
  const [isPrimaryResidence, setIsPrimaryResidence] = useState(true)
  const [assessmentRatio, setAssessmentRatio] = useState('')
  const [exemptions, setExemptions] = useState('0')

  const calculate = () => {
    const value = parseFloat(propertyValue) || 300000
    const stateCode = state
    const isPrimary = isPrimaryResidence
    const customRatio = parseFloat(assessmentRatio) || 0
    const exemptionAmount = parseFloat(exemptions) || 0

    // State-specific property tax rates and assessment ratios
    const stateData: Record<string, { rate: number, ratio: number, exemption: number }> = {
      'california': { rate: 1.1, ratio: 1.0, exemption: 7000 }, // Prop 13 limits
      'newyork': { rate: 1.5, ratio: 0.45, exemption: 0 },
      'florida': { rate: 0.97, ratio: 1.0, exemption: 25000 }, // Homestead exemption
      'texas': { rate: 1.8, ratio: 1.0, exemption: 25000 },
      'illinois': { rate: 2.2, ratio: 0.33, exemption: 0 },
      'ohio': { rate: 1.56, ratio: 0.35, exemption: 0 },
      'michigan': { rate: 1.64, ratio: 0.5, exemption: 0 },
      'georgia': { rate: 0.92, ratio: 0.4, exemption: 0 },
      'northcarolina': { rate: 0.84, ratio: 1.0, exemption: 0 },
      'arizona': { rate: 0.66, ratio: 1.0, exemption: 0 },
      'colorado': { rate: 0.52, ratio: 0.29, exemption: 0 },
      'newjersey': { rate: 2.49, ratio: 1.0, exemption: 0 },
      'connecticut': { rate: 1.75, ratio: 0.7, exemption: 0 },
      'massachusetts': { rate: 1.23, ratio: 1.0, exemption: 0 },
      'pennsylvania': { rate: 1.53, ratio: 1.0, exemption: 0 }
    }

    const data = stateData[stateCode] || { rate: 1.0, ratio: 1.0, exemption: 0 }

    // Use custom ratio if provided, else state default
    const ratio = customRatio > 0 ? customRatio / 100 : data.ratio

    // Calculate assessed value
    const assessedValue = value * ratio

    // Apply exemptions
    let totalExemption = exemptionAmount
    if (isPrimary) {
      totalExemption += data.exemption
    }

    const taxableValue = Math.max(0, assessedValue - totalExemption)

    // Calculate annual tax
    const annualTax = taxableValue * (data.rate / 100)

    // Monthly breakdown
    const monthlyTax = annualTax / 12

    // Effective tax rate
    const effectiveRate = (annualTax / value) * 100

    // Compare to national average (1.1%)
    const nationalAvgRate = 1.1
    const nationalAvgTax = value * (nationalAvgRate / 100)
    const savingsVsNational = nationalAvgTax - annualTax

    // 10-year projection
    const tenYearTax = annualTax * 10

    return {
      propertyValue: value.toFixed(2),
      assessedValue: assessedValue.toFixed(2),
      assessmentRatio: (ratio * 100).toFixed(2),
      totalExemption: totalExemption.toFixed(2),
      taxableValue: taxableValue.toFixed(2),
      stateRate: data.rate.toFixed(2),
      annualTax: annualTax.toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(3),
      nationalAvgTax: nationalAvgTax.toFixed(2),
      savingsVsNational: savingsVsNational.toFixed(2),
      tenYearTax: tenYearTax.toFixed(2),
      state: stateCode,
      isPrimaryResidence: isPrimary,
      hasHomestead: isPrimary && data.exemption > 0,
      avgStateRate: data.rate,
      exemptionUsed: data.exemption
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Property Tax Calculator</h1>
      <p className="text-zinc-600">Calculate annual property taxes by state including exemptions and effective rates.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Property Value</label>
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter estimated property value"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="california">California (1.1%)</option>
              <option value="newyork">New York (1.5%)</option>
              <option value="newjersey">New Jersey (2.49% - Highest)</option>
              <option value="illinois">Illinois (2.2%)</option>
              <option value="connecticut">Connecticut (1.75%)</option>
              <option value="texas">Texas (1.8%)</option>
              <option value="florida">Florida (0.97%)</option>
              <option value="ohio">Ohio (1.56%)</option>
              <option value="michigan">Michigan (1.64%)</option>
              <option value="pennsylvania">Pennsylvania (1.53%)</option>
              <option value="massachusetts">Massachusetts (1.23%)</option>
              <option value="georgia">Georgia (0.92%)</option>
              <option value="northcarolina">North Carolina (0.84%)</option>
              <option value="arizona">Arizona (0.66%)</option>
              <option value="colorado">Colorado (0.52% - Lowest)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Assessment Ratio (%)</label>
            <input
              type="number"
              value={assessmentRatio}
              onChange={(e) => setAssessmentRatio(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Leave empty for state default"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Some states assess at fraction of market value (e.g., MI 50%, NY 45%)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Property Type</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={isPrimaryResidence}
                onChange={(e) => setIsPrimaryResidence(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Primary Residence (may qualify for exemptions)</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Additional Exemptions</label>
            <input
              type="number"
              value={exemptions}
              onChange={(e) => setExemptions(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Senior, veteran, disability exemptions"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Property Value</span>
            <span className="font-bold">$${result.propertyValue}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Assessment Ratio</span>
            <span className="font-bold">{result.assessmentRatio}%</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Assessed Value</span>
            <span className="font-bold">$${result.assessedValue}</span>
          </div>
          {parseFloat(result.totalExemption) > 0 && (
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Total Exemptions</span>
              <span className="font-bold text-green-600">-$${result.totalExemption}</span>
            </div>
          )}
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Taxable Value</span>
            <span className="font-bold">$${result.taxableValue}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Tax Rate</span>
            <span className="font-bold">{result.stateRate}%</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Annual Property Tax</span>
            <span className="font-bold text-blue-600">$${result.annualTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Monthly Tax</div>
            <div className="text-2xl font-bold">$${result.monthlyTax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective Rate</div>
            <div className="text-2xl font-bold">{result.effectiveRate}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">10-Year Total</div>
            <div className="text-2xl font-bold">$${result.tenYearTax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">vs National Avg</div>
            <div className={`text-2xl font-bold ${parseFloat(result.savingsVsNational) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(result.savingsVsNational) >= 0 ? '+' : ''}$${result.savingsVsNational}
            </div>
          </div>
        </div>
      </div>

      {result.hasHomestead && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Homestead Exemption Applied</h3>
          <div className="text-sm text-green-600">
            Primary residence qualifies for $${result.exemptionUsed} homestead exemption in this state. This reduces your assessed value and lowers annual property tax.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">State Tax Rate Comparison</h3>
        <div className="text-xs text-zinc-600">
          Lowest: Hawaii/Colorado (~0.3-0.5%). Highest: New Jersey (2.49%), Illinois (2.2%). National average: 1.1%. Rates vary by county within states. Some states cap increases (CA Prop 13 limits to 1% + 2% annual max). Check local assessor for exact rates.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exemptions & Appeals</h3>
        <div className="text-xs text-zinc-600">
          Common exemptions: Homestead (primary residence), Senior (over 65), Veteran/Disabled, Agricultural. File for exemptions with county assessor. Appeal assessed value if over market value - gather comparable sales data, file within deadline (typically 30-90 days after assessment notice).
        </div>
      </div>
    </main>
  )
}