'use client'

import { useState } from 'react'

export default function StateTaxDeductionCalculator() {
  const [stateIncomeTax, setStateIncomeTax] = useState(10000)
  const [stateSalesTax, setStateSalesTax] = useState(0)
  const [localIncomeTax, setLocalIncomeTax] = useState(0)
  const [propertyTax, setPropertyTax] = useState(5000)
  const [federalIncome, setFederalIncome] = useState(200000)
  const [deductionMethod, setDeductionMethod] = useState<'salt' | 'sales'>('salt')

  const calculate = () => {
    const totalStateLocalTax = stateIncomeTax + localIncomeTax + propertyTax
    const saltLimit = 10000
    const saltDeduction = Math.min(totalStateLocalTax, saltLimit)
    const excessStateTax = totalStateLocalTax - saltDeduction

    const salesTaxDeduction = stateSalesTax
    const chosenDeduction = deductionMethod === 'salt' ? saltDeduction : salesTaxDeduction

    const standardDeductionSingle = 14600
    const standardDeductionMarried = 29200
    const isBetterThanStandardSingle = chosenDeduction > standardDeductionSingle
    const isBetterThanStandardMarried = chosenDeduction > standardDeductionMarried

    let marginalRate = 0.24
    if (federalIncome <= 11000) marginalRate = 0.10
    else if (federalIncome <= 44725) marginalRate = 0.12
    else if (federalIncome <= 95475) marginalRate = 0.22
    else if (federalIncome <= 182100) marginalRate = 0.24
    else if (federalIncome <= 231250) marginalRate = 0.32
    else if (federalIncome <= 578125) marginalRate = 0.35
    else marginalRate = 0.37

    const taxSavingsIfItemizing = chosenDeduction * marginalRate
    const wastedDeduction = excessStateTax

    const effectiveSALTRate = saltDeduction > 0 ? (saltDeduction / totalStateLocalTax) * 100 : 0

    return {
      stateIncomeTax: stateIncomeTax.toFixed(2),
      stateSalesTax: stateSalesTax.toFixed(2),
      localIncomeTax: localIncomeTax.toFixed(2),
      propertyTax: propertyTax.toFixed(2),
      totalStateLocalTax: totalStateLocalTax.toFixed(2),
      saltLimit: saltLimit.toFixed(0),
      saltDeduction: saltDeduction.toFixed(2),
      excessStateTax: excessStateTax.toFixed(2),
      salesTaxDeduction: salesTaxDeduction.toFixed(2),
      chosenDeduction: chosenDeduction.toFixed(2),
      deductionMethod,
      marginalRate: (marginalRate * 100).toFixed(0),
      taxSavingsIfItemizing: taxSavingsIfItemizing.toFixed(2),
      effectiveSALTRate: effectiveSALTRate.toFixed(2),
      standardDeductionSingle: standardDeductionSingle.toFixed(0),
      standardDeductionMarried: standardDeductionMarried.toFixed(0),
      isBetterThanStandardSingle,
      isBetterThanStandardMarried,
      wastedDeduction: wastedDeduction.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">State Tax Deduction Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate SALT deduction and its tax benefit under TCJA $10K cap.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">State Income Tax Paid ($)</label>
          <input
            type="number"
            value={stateIncomeTax}
            onChange={(e) => setStateIncomeTax(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Local Income Tax Paid ($)</label>
          <input
            type="number"
            value={localIncomeTax}
            onChange={(e) => setLocalIncomeTax(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Tax Paid ($)</label>
          <input
            type="number"
            value={propertyTax}
            onChange={(e) => setPropertyTax(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Sales Tax Paid (optional) ($)</label>
          <input
            type="number"
            value={stateSalesTax}
            onChange={(e) => setStateSalesTax(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Federal Taxable Income ($)</label>
          <input
            type="number"
            value={federalIncome}
            onChange={(e) => setFederalIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deduction Method</label>
          <select
            value={deductionMethod}
            onChange={(e) => setDeductionMethod(e.target.value as 'salt' | 'sales')}
            className="w-full border rounded p-2"
          >
            <option value="salt">SALT (Income + Property Tax)</option>
            <option value="sales">Sales Tax Only</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">State & Local Taxes Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">State Income Tax:</span>
            <span className="font-medium ml-2">$ {result.stateIncomeTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Local Income Tax:</span>
            <span className="font-medium ml-2">$ {result.localIncomeTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Property Tax:</span>
            <span className="font-medium ml-2">$ {result.propertyTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total SALT:</span>
            <span className="font-bold ml-2">$ {result.totalStateLocalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">SALT Cap:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.saltLimit}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Deduction Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">SALT Deduction:</span>
            <span className="font-bold text-green-600 ml-2">$ {result.saltDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Sales Tax Deduction:</span>
            <span className="font-medium ml-2">$ {result.salesTaxDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Chosen Deduction:</span>
            <span className="font-bold ml-2">$ {result.chosenDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Excess (Not Deductible):</span>
            <span className="font-medium text-red-600 ml-2">$ {result.excessStateTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective SALT Rate:</span>
            <span className="font-medium ml-2">{result.effectiveSALTRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Benefit</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Marginal Rate:</span>
            <span className="font-medium ml-2">{result.marginalRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Savings (if itemizing):</span>
            <span className="font-bold text-orange-700 ml-2">$ {result.taxSavingsIfItemizing}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Standard Deduction Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Standard Deduction (Single):</span>
            <span className="font-medium ml-2">$ {result.standardDeductionSingle}</span>
            <span className="text-xs ml-2">{result.isBetterThanStandardSingle ? '(SALT better)' : '(Standard better)'}</span>
          </div>
          <div>
            <span className="text-zinc-600">Standard Deduction (Married):</span>
            <span className="font-medium ml-2">$ {result.standardDeductionMarried}</span>
            <span className="text-xs ml-2">{result.isBetterThanStandardMarried ? '(SALT better)' : '(Standard better)'}</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">SALT $10,000 Cap Impact</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Before TCJA:</strong> Unlimited deduction for all state/local income and property taxes.</p>
          <p><strong>After TCJA (2018-2025):</strong> Maximum $10,000 combined for income + property taxes.</p>
          <p><strong>Your Wasted Deduction:</strong> $ {result.wastedDeduction} - amount you paid but cannot deduct.</p>
          <p><strong>High-tax states impacted:</strong> CA, NY, NJ, CT - many taxpayers pay far more than $10K in state taxes.</p>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">SALT Deduction Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>SALT vs Sales Tax: Choose whichever is larger (cannot deduct both)</li>
          <li>Property tax timing: Pay in years when total under $10K cap</li>
          <li>Pass-through entity tax: Some states allow entity-level tax (avoid SALT cap)</li>
          <li>Charitable deduction: Some states had charitable funds workaround (IRS limited)</li>
          <li>TCJA expires 2025: SALT cap may be removed or modified after 2025</li>
        </ul>
      </div>
    </div>
  )
}