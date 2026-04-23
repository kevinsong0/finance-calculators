'use client'

import { useState } from 'react'

export default function HomeOfficeDeductionMethodsCalculator() {
  const [homeSquareFeet, setHomeSquareFeet] = useState(2000)
  const [officeSquareFeet, setOfficeSquareFeet] = useState(200)
  const [grossIncome, setGrossIncome] = useState(80000)
  const [businessExpenses, setBusinessExpenses] = useState(5000)
  const [mortgageInterest, setMortgageInterest] = useState(12000)
  const [propertyTax, setPropertyTax] = useState(4000)
  const [utilities, setUtilities] = useState(2400)
  const [insurance, setInsurance] = useState(1200)
  const [repairs, setRepairs] = useState(2000)
  const [depreciation, setDepreciation] = useState(5000)
  const [method, setMethod] = useState<'regular' | 'simplified'>('regular')

  const calculate = () => {
    // Home Office Deduction Methods Calculator
    // Compare regular vs simplified method

    // Regular Method:
    // 1. Calculate business percentage (office / total sq ft)
    // 2. Allocate indirect expenses by percentage
    // 3. Deduct direct expenses 100%
    // 4. Must file Form 8829

    // Simplified Method:
    // 1. $5 per square foot (max 300 sq ft)
    // 2. Maximum deduction $1,500
    // 3. No depreciation deduction
    // 4. No Form 8829 required

    const businessPercentage = officeSquareFeet / homeSquareFeet

    // Regular method calculation
    const totalIndirectExpenses = mortgageInterest + propertyTax + utilities + insurance + repairs + depreciation
    const indirectDeduction = totalIndirectExpenses * businessPercentage

    // Direct expenses (100% deductible if for office only)
    const directDeduction = 0 // Assume no direct expenses for this example

    const regularDeduction = indirectDeduction + directDeduction

    // Simplified method calculation
    const simplifiedRate = 5 // $5 per sq ft
    const maxSimplifiedSqFt = 300
    const effectiveSqFt = Math.min(officeSquareFeet, maxSimplifiedSqFt)
    const simplifiedDeduction = effectiveSqFt * simplifiedRate

    // Net business income
    const netBusinessIncome = grossIncome - businessExpenses

    // Deduction limitation
    // Cannot exceed net business income (after other expenses)
    const limitedRegularDeduction = Math.min(regularDeduction, netBusinessIncome)
    const limitedSimplifiedDeduction = Math.min(simplifiedDeduction, netBusinessIncome)

    // Tax savings (assuming marginal rate)
    const taxRate = 0.24
    const regularTaxSavings = limitedRegularDeduction * taxRate
    const simplifiedTaxSavings = limitedSimplifiedDeduction * taxRate

    // Difference
    const deductionDifference = limitedRegularDeduction - limitedSimplifiedDeduction
    const taxSavingsDifference = regularTaxSavings - simplifiedTaxSavings

    // Expense allocation breakdown
    const expenseBreakdown = [
      { expense: 'Mortgage Interest', total: mortgageInterest, businessPortion: mortgageInterest * businessPercentage },
      { expense: 'Property Tax', total: propertyTax, businessPortion: propertyTax * businessPercentage },
      { expense: 'Utilities', total: utilities, businessPortion: utilities * businessPercentage },
      { expense: 'Insurance', total: insurance, businessPortion: insurance * businessPercentage },
      { expense: 'Repairs', total: repairs, businessPortion: repairs * businessPercentage },
      { expense: 'Depreciation', total: depreciation, businessPortion: depreciation * businessPercentage },
    ]

    // Recommendation
    let recommendation = ''
    if (regularDeduction > simplifiedDeduction + 500) {
      recommendation = `Regular method significantly better: $${limitedRegularDeduction.toFixed(0)} vs $${limitedSimplifiedDeduction.toFixed(0)}. Extra deduction: $${deductionDifference.toFixed(0)}. Tax savings: $${taxSavingsDifference.toFixed(0)} more. Use Form 8829.`
    } else if (officeSquareFeet > 300) {
      recommendation = `Office exceeds 300 sq ft limit for simplified. Regular method allows full allocation. Regular: $${limitedRegularDeduction.toFixed(0)}, Simplified capped: $${limitedSimplifiedDeduction.toFixed(0)}. Use regular method.`
    } else if (Math.abs(deductionDifference) < 200) {
      recommendation = `Methods similar. Simplified: $${limitedSimplifiedDeduction.toFixed(0)}, Regular: $${limitedRegularDeduction.toFixed(0)}. Simplified easier - no Form 8829, no depreciation recapture risk.`
    } else {
      recommendation = `Simplified method adequate for small office. $${limitedSimplifiedDeduction.toFixed(0)} deduction, no recordkeeping. Use simplified unless expenses high.`
    }

    if (limitedRegularDeduction < regularDeduction) {
      recommendation += ` Note: Deduction limited to net business income $${netBusinessIncome.toFixed(0)}.`
    }

    // Method comparison summary
    const methodComparison = [
      {
        method: 'Regular',
        deduction: limitedRegularDeduction.toFixed(0),
        taxSavings: regularTaxSavings.toFixed(0),
        pros: 'Higher deduction potential, allocates all expenses',
        cons: 'Requires Form 8829, depreciation recapture risk, more recordkeeping'
      },
      {
        method: 'Simplified',
        deduction: limitedSimplifiedDeduction.toFixed(0),
        taxSavings: simplifiedTaxSavings.toFixed(0),
        pros: 'Easy calculation, no Form 8829, no depreciation recapture',
        cons: 'Capped at $1,500, limited to 300 sq ft, ignores actual expenses'
      },
    ]

    return {
      homeSquareFeet: homeSquareFeet.toFixed(0),
      officeSquareFeet: officeSquareFeet.toFixed(0),
      businessPercentage: (businessPercentage * 100).toFixed(1),
      grossIncome: grossIncome.toFixed(0),
      businessExpenses: businessExpenses.toFixed(0),
      netBusinessIncome: netBusinessIncome.toFixed(0),
      mortgageInterest: mortgageInterest.toFixed(0),
      propertyTax: propertyTax.toFixed(0),
      utilities: utilities.toFixed(0),
      insurance: insurance.toFixed(0),
      repairs: repairs.toFixed(0),
      depreciation: depreciation.toFixed(0),
      totalIndirectExpenses: totalIndirectExpenses.toFixed(0),
      regularDeduction: regularDeduction.toFixed(0),
      limitedRegularDeduction: limitedRegularDeduction.toFixed(0),
      simplifiedDeduction: simplifiedDeduction.toFixed(0),
      limitedSimplifiedDeduction: limitedSimplifiedDeduction.toFixed(0),
      regularTaxSavings: regularTaxSavings.toFixed(0),
      simplifiedTaxSavings: simplifiedTaxSavings.toFixed(0),
      deductionDifference: deductionDifference.toFixed(0),
      taxSavingsDifference: taxSavingsDifference.toFixed(0),
      effectiveSqFt: effectiveSqFt.toFixed(0),
      expenseBreakdown,
      methodComparison,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Home Office Deduction Methods Calculator</h1>
      <p className="text-gray-600 mb-4">Compare regular vs simplified home office deduction methods.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Home Total Sq Ft</label>
          <input type="number" value={homeSquareFeet} onChange={(e) => setHomeSquareFeet(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Office Sq Ft</label>
          <input type="number" value={officeSquareFeet} onChange={(e) => setOfficeSquareFeet(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gross Business Income</label>
          <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Business Expenses</label>
          <input type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Home Expenses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mortgage Interest</label>
            <input type="number" value={mortgageInterest} onChange={(e) => setMortgageInterest(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Property Tax</label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Utilities</label>
            <input type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Insurance</label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Repairs</label>
            <input type="number" value={repairs} onChange={(e) => setRepairs(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Depreciation</label>
            <input type="number" value={depreciation} onChange={(e) => setDepreciation(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Business Percentage</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Home:</span><span className="font-medium ml-2">{result.homeSquareFeet} sq ft</span></div>
          <div><span className="text-zinc-600">Office:</span><span className="font-medium ml-2">{result.officeSquareFeet} sq ft</span></div>
          <div><span className="text-zinc-600">Percentage:</span><span className="font-bold text-purple-700 ml-2">{result.businessPercentage}%</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Regular Method Expense Allocation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Expense</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-left">Business Portion</th>
              </tr>
            </thead>
            <tbody>
              {result.expenseBreakdown.map((e) => (
                <tr key={e.expense} className="border-b">
                  <td className="py-1 font-semibold">{e.expense}</td>
                  <td className="py-1">$ {e.total.toFixed(0)}</td>
                  <td className="py-1">$ {e.businessPortion.toFixed(0)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="py-1">Total</td>
                <td className="py-1">$ {result.totalIndirectExpenses}</td>
                <td className="py-1">$ {result.regularDeduction}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Method Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r">
            <h3 className="font-semibold mb-2">Regular Method</h3>
            <div><span className="text-zinc-600">Deduction:</span><span className="font-bold ml-2">$ {result.limitedRegularDeduction}</span></div>
            <div><span className="text-zinc-600">Tax Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.regularTaxSavings}</span></div>
            <div className="text-xs text-zinc-600 mt-2">Requires Form 8829</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Simplified Method</h3>
            <div><span className="text-zinc-600">Deduction:</span><span className="font-bold ml-2">$ {result.limitedSimplifiedDeduction}</span></div>
            <div><span className="text-zinc-600">Tax Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.simplifiedTaxSavings}</span></div>
            <div className="text-xs text-zinc-600 mt-2">$5/sq ft, max 300 sq ft</div>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.deductionDifference) > 0 ? 'bg-green-50 border border-green-200' : Number(result.deductionDifference) < 0 ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Method Difference</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Extra Deduction:</span><span className={`font-bold ml-2 ${Number(result.deductionDifference) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.deductionDifference}</span></div>
          <div><span className="text-zinc-600">Extra Tax Savings:</span><span className={`font-bold ml-2 ${Number(result.taxSavingsDifference) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.taxSavingsDifference}</span></div>
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Home Office Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Exclusive and regular use required</li>
          <li>Principal place of business</li>
          <li>Regular: actual expense allocation</li>
          <li>Simplified: $5/sq ft max $1,500</li>
          <li>Regular requires Form 8829</li>
          <li>Simplified: no depreciation recapture</li>
          <li>Deduction limited to net income</li>
          <li>Cannot create/increase loss</li>
          <li>Depreciation recapture on sale</li>
          <li>Record square footage accurately</li>
        </ul>
      </div>
    </div>
  )
}