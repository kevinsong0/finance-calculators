'use client'

import { useState } from 'react'

export default function HomeOfficeDeductionCalculator() {
  const [homeType, setHomeType] = useState('owned')
  const [homeSquareFeet, setHomeSquareFeet] = useState('')
  const [officeSquareFeet, setOfficeSquareFeet] = useState('')
  const [method, setMethod] = useState('regular')
  const [grossIncome, setGrossIncome] = useState('')
  const [businessIncome, setBusinessIncome] = useState('')
  const [mortgageInterest, setMortgageInterest] = useState('')
  const [propertyTax, setPropertyTax] = useState('')
  const [utilitiesCost, setUtilitiesCost] = useState('')
  const [insuranceCost, setInsuranceCost] = useState('')
  const [repairsCost, setRepairsCost] = useState('')
  const [rentAmount, setRentAmount] = useState('')
  const [depreciationYears, setDepreciationYears] = useState('27.5')
  const [homeValue, setHomeValue] = useState('')
  const [businessDays, setBusinessDays] = useState('')
  const [regularMethodDeduction, setRegularMethodDeduction] = useState('')
  const [meetClientsHome, setMeetClientsHome] = useState(false)
  const [exclusiveUse, setExclusiveUse] = useState(true)

  const calculate = () => {
    const homeSqFt = parseFloat(homeSquareFeet) || 2000
    const officeSqFt = parseFloat(officeSquareFeet) || 200
    const calculationMethod = method
    const income = parseFloat(grossIncome) || 100000
    const busIncome = parseFloat(businessIncome) || 50000
    const mortgage = parseFloat(mortgageInterest) || 12000
    const propTax = parseFloat(propertyTax) || 4000
    const utilities = parseFloat(utilitiesCost) || 2400
    const insurance = parseFloat(insuranceCost) || 1200
    const repairs = parseFloat(repairsCost) || 500
    const rent = parseFloat(rentAmount) || 0
    const homeVal = parseFloat(homeValue) || 400000
    const busDays = parseInt(businessDays) || 250
    const hasExclusiveUse = exclusiveUse
    const meetsClients = meetClientsHome

    // Percentage of home used for business
    const businessPercentage = (officeSqFt / homeSqFt) * 100

    // Depreciation calculation (owned home only)
    // Residential: 27.5 years straight-line
    // Basis = home value minus land value (assume 20% land)
    const landPercentage = 0.20
    const homeBasis = homeVal * (1 - landPercentage)
    const annualDepreciation = homeBasis / 27.5
    const businessDepreciation = annualDepreciation * (businessPercentage / 100)

    // Regular Method Calculation
    // Deductible expenses multiplied by business percentage
    let totalExpenses = 0

    if (homeType === 'owned') {
      // Indirect expenses (apportioned by business percentage)
      const mortgageDeduction = mortgage * (businessPercentage / 100)
      const propTaxDeduction = propTax * (businessPercentage / 100)
      const utilitiesDeduction = utilities * (businessPercentage / 100)
      const insuranceDeduction = insurance * (businessPercentage / 100)
      const repairsDeduction = repairs * (businessPercentage / 100)
      const depreciationDeduction = businessDepreciation

      totalExpenses = mortgageDeduction + propTaxDeduction + utilitiesDeduction + insuranceDeduction + repairsDeduction + depreciationDeduction
    } else {
      // Rented home
      const rentDeduction = rent * (businessPercentage / 100)
      const utilitiesDeduction = utilities * (businessPercentage / 100)
      const insuranceDeduction = insurance * (businessPercentage / 100)
      const repairsDeduction = repairs * (businessPercentage / 100)

      totalExpenses = rentDeduction + utilitiesDeduction + insuranceDeduction + repairsDeduction
    }

    // Regular method deduction
    const regularMethodAmount = totalExpenses

    // Simplified Method (Safe Harbor)
    // $5 per square foot, max 300 sq ft = $1,500 max
    const simplifiedRate = 5
    const simplifiedMaxSqFt = 300
    const effectiveSqFt = Math.min(officeSqFt, simplifiedMaxSqFt)
    const simplifiedMethodAmount = effectiveSqFt * simplifiedRate

    // Which method to use
    const recommendedMethod = regularMethodAmount > simplifiedMethodAmount ? 'regular' : 'simplified'
    const maxDeduction = calculationMethod === 'regular' ? regularMethodAmount : simplifiedMethodAmount

    // Limitation: Cannot exceed business income (net profit)
    // Deduction limited to Schedule C net profit minus other deductions
    const otherDeductions = busIncome * 0.10 // Simplified assumption
    const netBusinessIncome = busIncome - otherDeductions
    const allowableDeduction = Math.min(maxDeduction, netBusinessIncome)

    // Carryover: Excess deduction can carry forward to future years
    const carryover = maxDeduction > allowableDeduction ? maxDeduction - allowableDeduction : 0

    // Tax savings (assume 22% federal + 5% state + 15.3% SE tax)
    const totalTaxRate = 0.22 + 0.05 + 0.153 // 42.3%
    const taxSavings = allowableDeduction * totalTaxRate

    // Eligibility requirements
    const eligibilityChecks = [
      { requirement: 'Regular and exclusive use', met: hasExclusiveUse, note: 'Office must be used regularly and exclusively for business' },
      { requirement: 'Principal place of business', met: true, note: 'OR meet clients there regularly, OR separate structure' },
      { requirement: 'Business purpose', met: true, note: 'Office used for administrative/management activities' }
    ]

    const eligible = hasExclusiveUse // Simplified

    // Expense breakdown
    const expenseBreakdown = homeType === 'owned' ? {
      mortgageInterest: (mortgage * (businessPercentage / 100)).toFixed(2),
      propertyTax: (propTax * (businessPercentage / 100)).toFixed(2),
      utilities: (utilities * (businessPercentage / 100)).toFixed(2),
      insurance: (insurance * (businessPercentage / 100)).toFixed(2),
      repairs: (repairs * (businessPercentage / 100)).toFixed(2),
      depreciation: businessDepreciation.toFixed(2),
      total: regularMethodAmount.toFixed(2)
    } : {
      rent: (rent * (businessPercentage / 100)).toFixed(2),
      utilities: (utilities * (businessPercentage / 100)).toFixed(2),
      insurance: (insurance * (businessPercentage / 100)).toFixed(2),
      repairs: (repairs * (businessPercentage / 100)).toFixed(2),
      total: regularMethodAmount.toFixed(2)
    }

    // Recapture risk: Depreciation recaptured when selling home
    const depreciationRecapture = businessDepreciation * 5 // Simplified 5-year accumulation
    const recaptureTaxRate = 0.25 // Unrecaptured Section 1250 gain
    const potentialRecaptureTax = depreciationRecapture * recaptureTaxRate

    return {
      homeType,
      homeSquareFeet: homeSqFt.toFixed(0),
      officeSquareFeet: officeSqFt.toFixed(0),
      businessPercentage: businessPercentage.toFixed(1),
      method: calculationMethod,
      grossIncome: income.toFixed(2),
      businessIncome: busIncome.toFixed(2),
      regularMethodAmount: regularMethodAmount.toFixed(2),
      simplifiedMethodAmount: simplifiedMethodAmount.toFixed(2),
      simplifiedMax: '1,500',
      recommendedMethod,
      allowableDeduction: allowableDeduction.toFixed(2),
      carryover: carryover.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      totalTaxRate: '42.3%',
      eligible,
      eligibilityChecks,
      expenseBreakdown,
      homeBasis: homeBasis.toFixed(2),
      annualDepreciation: annualDepreciation.toFixed(2),
      businessDepreciation: businessDepreciation.toFixed(2),
      depreciationRecapture: depreciationRecapture.toFixed(2),
      potentialRecaptureTax: potentialRecaptureTax.toFixed(2),
      depreciationYears: depreciationYears,
      meetsClients,
      exclusiveUse: hasExclusiveUse
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Home Office Deduction Calculator</h1>
      <p className="text-zinc-600">Calculate home office deduction for self-employed, freelancers, and remote workers. Regular vs Simplified method comparison.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Home & Office Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Home Type</label>
            <select
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="owned">Owned Home</option>
              <option value="rented">Rented Home/Apartment</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Total Home Square Feet</label>
              <input
                type="number"
                value={homeSquareFeet}
                onChange={(e) => setHomeSquareFeet(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Total home area"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Office Square Feet</label>
              <input
                type="number"
                value={officeSquareFeet}
                onChange={(e) => setOfficeSquareFeet(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Office area only"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Calculation Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="regular">Regular Method (Actual Expenses)</option>
              <option value="simplified">Simplified Method ($5/sq ft, max $1,500)</option>
              <option value="compare">Compare Both Methods</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Exclusive Use Requirement</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={exclusiveUse}
                onChange={(e) => setExclusiveUse(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Office used regularly and exclusively for business (required)</span>
            </label>
            <div className="text-xs text-zinc-500 mt-1">
              Exclusive use means no personal activities in the office space. Required for deduction.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Meet Clients at Home?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={meetClientsHome}
                onChange={(e) => setMeetClientsHome(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Meet clients/customers at home office regularly</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Income</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Income</label>
            <input
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Total gross income"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Income (Schedule C)</label>
            <input
              type="number"
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Net profit from self-employment"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Deduction limited to business net profit. Excess can carry forward.
            </div>
          </div>
        </div>
      </div>

      {homeType === 'owned' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Home Expenses (Owned)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Home Value (Purchase Price)</label>
              <input
                type="number"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Home purchase price"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Mortgage Interest (Annual)</label>
              <input
                type="number"
                value={mortgageInterest}
                onChange={(e) => setMortgageInterest(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Annual mortgage interest"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Property Tax (Annual)</label>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Annual property tax"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Utilities (Annual)</label>
              <input
                type="number"
                value={utilitiesCost}
                onChange={(e) => setUtilitiesCost(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Electric, gas, water, internet"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Home Insurance (Annual)</label>
              <input
                type="number"
                value={insuranceCost}
                onChange={(e) => setInsuranceCost(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Annual homeowners insurance"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Repairs/Maintenance (Annual)</label>
              <input
                type="number"
                value={repairsCost}
                onChange={(e) => setRepairsCost(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Home repairs"
              />
            </div>
          </div>
        </div>
      )}

      {homeType === 'rented' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Home Expenses (Rented)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Annual Rent</label>
              <input
                type="number"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Total annual rent paid"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Utilities (Annual)</label>
              <input
                type="number"
                value={utilitiesCost}
                onChange={(e) => setUtilitiesCost(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Electric, gas, water, internet"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Renter Insurance (Annual)</label>
              <input
                type="number"
                value={insuranceCost}
                onChange={(e) => setInsuranceCost(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Annual renters insurance"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Repairs (Annual)</label>
              <input
                type="number"
                value={repairsCost}
                onChange={(e) => setRepairsCost(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Repairs you paid for"
              />
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Percentage</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Total Home Area</span>
            <span className="font-bold">{result.homeSquareFeet} sq ft</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Office Area</span>
            <span className="font-bold">{result.officeSquareFeet} sq ft</span>
          </div>
          <div className="bg-blue-50 rounded p-3 flex justify-between">
            <span className="font-medium">Business Percentage</span>
            <span className="font-bold text-blue-600">{result.businessPercentage}%</span>
          </div>
        </div>
      </div>

      {result.method === 'regular' || result.method === 'compare' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Regular Method - Expense Breakdown</h3>
          <div className="space-y-2 text-xs">
            {homeType === 'owned' ? (
              <>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Mortgage Interest ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.mortgageInterest}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Property Tax ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.propertyTax}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Utilities ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.utilities}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Insurance ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.insurance}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Repairs ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.repairs}</span>
                </div>
                <div className="bg-yellow-50 rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Depreciation ({result.depreciationYears} years)</span>
                  <span className="font-bold text-yellow-600">$${result.expenseBreakdown.depreciation}</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Rent ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.rent}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Utilities ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.utilities}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Insurance ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.insurance}</span>
                </div>
                <div className="bg-white rounded p-3 flex justify-between">
                  <span className="text-zinc-600">Repairs ({result.businessPercentage}%)</span>
                  <span>$${result.expenseBreakdown.repairs}</span>
                </div>
              </>
            )}
            <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
              <span className="font-medium">Regular Method Total</span>
              <span className="font-bold">$${result.expenseBreakdown.total}</span>
            </div>
          </div>
        </div>
      )}

      {result.method === 'simplified' || result.method === 'compare' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Simplified Method (Safe Harbor)</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Office Square Feet</span>
              <span>{Math.min(parseFloat(result.officeSquareFeet), 300)} sq ft (max 300)</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Rate per Square Foot</span>
              <span>$5</span>
            </div>
            <div className="bg-green-100 rounded p-3 flex justify-between">
              <span className="font-medium">Simplified Method Deduction</span>
              <span className="font-bold text-green-600">$${result.simplifiedMethodAmount}</span>
            </div>
            <div className="text-xs text-zinc-500 mt-2">
              Simplified method: $5/sq ft up to 300 sq ft = $1,500 max. No expense tracking needed. No depreciation recapture.
            </div>
          </div>
        </div>
      )}

      {result.method === 'compare' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Method Comparison</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded p-4">
              <div className="text-sm text-zinc-500">Regular Method</div>
              <div className="text-2xl font-bold">$${result.regularMethodAmount}</div>
            </div>
            <div className="bg-white rounded p-4">
              <div className="text-sm text-zinc-500">Simplified Method</div>
              <div className="text-2xl font-bold">$${result.simplifiedMethodAmount}</div>
            </div>
          </div>
          <div className="bg-green-50 rounded p-3 mt-2">
            <span className="font-medium text-green-700">Recommended: {result.recommendedMethod === 'regular' ? 'Regular Method (higher deduction)' : 'Simplified Method (less paperwork)'}</span>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Final Deduction & Tax Savings</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Calculated Deduction</span>
            <span className="font-bold">$${result.method === 'simplified' ? result.simplifiedMethodAmount : result.regularMethodAmount}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Business Income Limit</span>
            <span>$${result.businessIncome}</span>
          </div>
          <div className="bg-green-100 rounded p-3 flex justify-between">
            <span className="font-medium">Allowable Deduction</span>
            <span className="font-bold text-green-600">$${result.allowableDeduction}</span>
          </div>
          {parseFloat(result.carryover) > 0 && (
            <div className="bg-yellow-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Carryover to Future Years</span>
              <span className="font-bold text-yellow-600">$${result.carryover}</span>
            </div>
          )}
          <div className="bg-green-50 rounded p-3 flex justify-between border-t-2 border-green-300">
            <span className="font-medium">Tax Savings ({result.totalTaxRate})</span>
            <span className="font-bold text-green-600">$${result.taxSavings}</span>
          </div>
        </div>
      </div>

      {result.eligible ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Eligible for Home Office Deduction</h3>
          <div className="text-sm text-green-600">
            Regular and exclusive use confirmed. Office qualifies as principal place of business or meets clients regularly. Deduction: $${result.allowableDeduction}. Tax savings: $${result.taxSavings}. File Form 8829 (regular method) or Schedule C line 30 (simplified).
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Not Eligible - Exclusive Use Required</h3>
          <div className="text-sm text-red-600">
            Home office deduction requires regular AND exclusive use for business. Personal activities in office disqualify deduction. Office must be principal place of business OR meet clients regularly OR separate structure.
          </div>
        </div>
      )}

      {homeType === 'owned' && result.method === 'regular' && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Depreciation Recapture Warning</h3>
          <div className="text-sm text-yellow-600">
            Regular method includes depreciation ($${result.businessDepreciation}/year). When selling home, depreciation recaptured at 25% tax rate. 5-year accumulated: $${result.depreciationRecapture}. Potential recapture tax: $${result.potentialRecaptureTax}. Simplified method avoids depreciation recapture.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Eligibility Requirements</h3>
        <div className="space-y-2 text-xs">
          {result.eligibilityChecks.map((check, idx) => (
            <div key={idx} className={`rounded p-3 ${check.met ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex justify-between">
                <span className="font-medium">{check.requirement}</span>
                <span className={`font-bold ${check.met ? 'text-green-600' : 'text-red-600'}`}>
                  {check.met ? 'Met' : 'Not Met'}
                </span>
              </div>
              <div className="text-zinc-500">{check.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Form 8829 (Regular Method)</h3>
        <div className="text-xs text-zinc-600">
          Part I: Area of home used for business. Part II: Figure allowable deduction. Part III: Carryover of excess deduction. Report on Schedule C. Simplified method: No Form 8829 needed, report directly on Schedule C line 30.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          Exclusive use required: No personal activities. Principal place of business: OR meet clients, OR separate structure. Regular method: Actual expenses tracked, depreciation included. Simplified method: $5/sq ft, max $1,500, no depreciation. Employees: No home office deduction (suspended 2018-2025). Self-employed only. Deduction limited to business net profit. Carryover unused deduction. Depreciation recaptured at sale (regular method). Simplified avoids recapture.
        </div>
      </div>
    </main>
  )
}