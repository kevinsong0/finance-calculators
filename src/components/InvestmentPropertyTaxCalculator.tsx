'use client'

import { useState } from 'react'

export default function InvestmentPropertyTaxCalculator() {
  const [propertyValue, setPropertyValue] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [state, setState] = useState('california')
  const [propertyType, setPropertyType] = useState('residential')
  const [rentalIncome, setRentalIncome] = useState('')
  const [operatingExpenses, setOperatingExpenses] = useState('')
  const [depreciationYears, setDepreciationYears] = useState('27.5')
  const [holdingPeriod, setHoldingPeriod] = useState('5')
  const [federalTaxBracket, setFederalTaxBracket] = useState('24')
  const [isPrimaryResidence, setIsPrimaryResidence] = useState(false)
  const [improvements, setImprovements] = useState('')

  const calculate = () => {
    const value = parseFloat(propertyValue) || 500000
    const purchase = parseFloat(purchasePrice) || 400000
    const stateCode = state
    const type = propertyType
    const income = parseFloat(rentalIncome) || 36000
    const expenses = parseFloat(operatingExpenses) || 12000
    const depYears = parseInt(depreciationYears) || 27.5
    const holding = parseInt(holdingPeriod) || 5
    const bracket = parseInt(federalTaxBracket) || 24
    const isPrimary = isPrimaryResidence
    const improvementsCost = parseFloat(improvements) || 0

    // Property tax rates by state
    const stateRates: Record<string, number> = {
      'california': 1.1,
      'newyork': 1.5,
      'florida': 0.97,
      'texas': 1.8,
      'illinois': 2.2,
      'georgia': 0.92,
      'arizona': 0.66,
      'colorado': 0.52,
      'newjersey': 2.49,
      'connecticut': 1.75
    }

    const stateRate = stateRates[stateCode] || 1.0

    // Annual property tax
    const annualPropertyTax = value * (stateRate / 100)

    // Depreciation (residential 27.5 years, commercial 39 years)
    const depreciationRate = type === 'residential' ? 27.5 : 39
    const annualDepreciation = purchase / depreciationRate
    const totalDepreciation = annualDepreciation * holding

    // Net operating income
    const noi = income - expenses - annualPropertyTax

    // Taxable income (NOI - depreciation)
    const taxableIncome = noi - annualDepreciation

    // Federal income tax on rental income
    const federalTax = taxableIncome * (bracket / 100)

    // State income tax on rental income
    const stateIncomeRates: Record<string, number> = {
      'california': 9.3,
      'newyork': 8.82,
      'florida': 0,
      'texas': 0,
      'illinois': 4.95,
      'georgia': 5.75,
      'arizona': 2.59,
      'colorado': 4.4,
      'newjersey': 10.75,
      'connecticut': 6.99
    }

    const stateIncomeRate = stateIncomeRates[stateCode] || 5
    const stateIncomeTax = taxableIncome * (stateIncomeRate / 100)

    // Total annual tax burden
    const totalAnnualTax = annualPropertyTax + federalTax + stateIncomeTax

    // Depreciation recapture upon sale (25% rate)
    const salePrice = value * 1.1 // Assume 10% appreciation
    const capitalGain = salePrice - purchase
    const depreciationRecapture = totalDepreciation * 0.25

    // Capital gains tax on sale (20% federal + state)
    const capitalGainsTax = (capitalGain - totalDepreciation) * 0.20
    const stateCapitalGainsTax = (capitalGain - totalDepreciation) * (stateIncomeRate / 100)

    // 1031 exchange option (defer all gains tax)
    const exchangeSavings = depreciationRecapture + capitalGainsTax + stateCapitalGainsTax

    // Tax-free income comparison
    // Primary residence: No rental income tax, but property tax + mortgage interest deductible
    const primaryDeduction = isPrimary ? annualPropertyTax : 0

    // ROI after taxes
    const cashFlowAfterTax = noi - federalTax - stateIncomeTax
    const roiAfterTax = (cashFlowAfterTax / purchase) * 100

    // 5-year total tax burden
    const fiveYearTax = totalAnnualTax * holding

    // Effective tax rate on rental income
    const effectiveRate = taxableIncome > 0 ? ((federalTax + stateIncomeTax) / taxableIncome) * 100 : 0

    return {
      propertyValue: value.toFixed(2),
      purchasePrice: purchase.toFixed(2),
      state: stateCode,
      stateRate: stateRate.toFixed(2),
      annualPropertyTax: annualPropertyTax.toFixed(2),
      propertyType: type,
      rentalIncome: income.toFixed(2),
      operatingExpenses: expenses.toFixed(2),
      noi: noi.toFixed(2),
      depreciationYears: depreciationRate.toFixed(1),
      annualDepreciation: annualDepreciation.toFixed(2),
      totalDepreciation: totalDepreciation.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      federalBracket: bracket.toFixed(0),
      federalTax: federalTax.toFixed(2),
      stateIncomeRate: stateIncomeRate.toFixed(2),
      stateIncomeTax: stateIncomeTax.toFixed(2),
      totalAnnualTax: totalAnnualTax.toFixed(2),
      cashFlowAfterTax: cashFlowAfterTax.toFixed(2),
      roiAfterTax: roiAfterTax.toFixed(1),
      effectiveRate: effectiveRate.toFixed(1),
      holdingPeriod: holding,
      salePrice: salePrice.toFixed(2),
      capitalGain: capitalGain.toFixed(2),
      depreciationRecapture: depreciationRecapture.toFixed(2),
      capitalGainsTax: capitalGainsTax.toFixed(2),
      stateCapitalGainsTax: stateCapitalGainsTax.toFixed(2),
      exchangeSavings: exchangeSavings.toFixed(2),
      fiveYearTax: fiveYearTax.toFixed(2),
      isPrimaryResidence: isPrimary,
      improvements: improvementsCost.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Investment Property Tax Calculator</h1>
      <p className="text-zinc-600">Calculate property tax, depreciation, rental income tax, and capital gains for real estate investments.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="residential">Residential (27.5 year depreciation)</option>
              <option value="commercial">Commercial (39 year depreciation)</option>
              <option value="mixed_use">Mixed Use</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Purchase Price</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter purchase cost"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Current Market Value</label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter estimated value"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="california">California (9.3% income, 1.1% property)</option>
              <option value="newyork">New York (8.82% income, 1.5% property)</option>
              <option value="florida">Florida (0% income, 0.97% property)</option>
              <option value="texas">Texas (0% income, 1.8% property)</option>
              <option value="illinois">Illinois (4.95% income, 2.2% property)</option>
              <option value="georgia">Georgia (5.75% income, 0.92% property)</option>
              <option value="arizona">Arizona (2.59% income, 0.66% property)</option>
              <option value="colorado">Colorado (4.4% income, 0.52% property)</option>
              <option value="newjersey">New Jersey (10.75% income, 2.49% property)</option>
              <option value="connecticut">Connecticut (6.99% income, 1.75% property)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Primary Residence?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={isPrimaryResidence}
                onChange={(e) => setIsPrimaryResidence(e.target.checked)}
                className="w-4 h-4"
              />
              <span>This is primary residence (no rental income tax)</span>
            </label>
          </div>
        </div>
      </div>

      {!result.isPrimaryResidence && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Rental Income</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Annual Rental Income</label>
              <input
                type="number"
                value={rentalIncome}
                onChange={(e) => setRentalIncome(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter gross rental income"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Operating Expenses</label>
              <input
                type="number"
                value={operatingExpenses}
                onChange={(e) => setOperatingExpenses(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Maintenance, management, insurance"
              />
              <div className="text-xs text-zinc-500 mt-1">
                Includes: repairs, insurance, management fees, utilities (if paid by owner)
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Federal Tax Bracket (%)</label>
              <select
                value={federalTaxBracket}
                onChange={(e) => setFederalTaxBracket(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="10">10%</option>
                <option value="12">12%</option>
                <option value="22">22%</option>
                <option value="24">24%</option>
                <option value="32">32%</option>
                <option value="35">35%</option>
                <option value="37">37%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Holding Period (years)</label>
              <input
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Years you expect to hold property"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Capital Improvements</label>
              <input
                type="number"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Add to depreciation basis"
              />
              <div className="text-xs text-zinc-500 mt-1">
                Improvements add to depreciation basis (not repairs)
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Tax</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Market Value</span>
            <span className="font-bold">$${result.propertyValue}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Rate ({result.state})</span>
            <span className="font-bold">{result.stateRate}%</span>
          </div>
          <div className="bg-blue-50 rounded p-3 flex justify-between border-t-2 border-blue-300">
            <span className="font-medium">Annual Property Tax</span>
            <span className="font-bold text-blue-600">$${result.annualPropertyTax}</span>
          </div>
        </div>
      </div>

      {!result.isPrimaryResidence && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Depreciation Analysis</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Purchase Price + Improvements</span>
              <span className="font-bold">$${(parseFloat(result.purchasePrice) + parseFloat(result.improvements)).toFixed(2)}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Depreciation Period</span>
              <span className="font-bold">{result.depreciationYears} years</span>
            </div>
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Annual Depreciation</span>
              <span className="font-bold text-green-600">$${result.annualDepreciation}</span>
            </div>
            <div className="bg-green-100 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Total Depreciation ({result.holdingPeriod} years)</span>
              <span className="font-bold text-green-600">$${result.totalDepreciation}</span>
            </div>
            <div className="text-xs text-green-600 mt-2">
              Depreciation reduces taxable income (paper loss, not cash). But creates depreciation recapture tax when sold.
            </div>
          </div>
        </div>
      )}

      {!result.isPrimaryResidence && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Rental Income Tax</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Gross Rental Income</span>
              <span className="font-bold">$${result.rentalIncome}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Operating Expenses</span>
              <span className="font-bold">-$${result.operatingExpenses}</span>
            </div>
            <div className="bg-blue-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Property Tax</span>
              <span className="font-bold">-$${result.annualPropertyTax}</span>
            </div>
            <div className="bg-green-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Depreciation</span>
              <span className="font-bold text-green-600">-$${result.annualDepreciation}</span>
            </div>
            <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
              <span className="font-medium">Taxable Income</span>
              <span className="font-bold">$${result.taxableIncome}</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Federal Tax ({result.federalBracket}%)</span>
              <span className="font-bold text-red-600">$${result.federalTax}</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">State Tax ({result.stateIncomeRate}%)</span>
              <span className="font-bold text-red-600">$${result.stateIncomeTax}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Annual Tax Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Property Tax</div>
            <div className="text-2xl font-bold text-blue-600">$${result.annualPropertyTax}</div>
          </div>
          {!result.isPrimaryResidence && (
            <>
              <div className="bg-white rounded p-4">
                <div className="text-sm text-zinc-500">Income Tax</div>
                <div className="text-2xl font-bold text-red-600">$${(parseFloat(result.federalTax) + parseFloat(result.stateIncomeTax)).toFixed(2)}</div>
              </div>
              <div className="bg-white rounded p-4">
                <div className="text-sm text-zinc-500">Cash Flow After Tax</div>
                <div className="text-2xl font-bold text-green-600">$${result.cashFlowAfterTax}</div>
              </div>
              <div className="bg-white rounded p-4">
                <div className="text-sm text-zinc-500">ROI After Tax</div>
                <div className="text-2xl font-bold">{result.roiAfterTax}%</div>
              </div>
            </>
          )}
        </div>
      </div>

      {!result.isPrimaryResidence && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Sale Tax Analysis (after {result.holdingPeriod} years)</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Estimated Sale Price</span>
              <span className="font-bold">$${result.salePrice}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Capital Gain</span>
              <span className="font-bold">$${result.capitalGain}</span>
            </div>
            <div className="bg-yellow-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Depreciation Recapture (25%)</span>
              <span className="font-bold text-yellow-600">$${result.depreciationRecapture}</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Capital Gains Tax (20%)</span>
              <span className="font-bold text-red-600">$${result.capitalGainsTax}</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">State Capital Gains</span>
              <span className="font-bold text-red-600">$${result.stateCapitalGainsTax}</span>
            </div>
            <div className="bg-green-50 rounded p-3 flex justify-between border-t-2 border-green-300">
              <span className="font-medium">1031 Exchange Savings</span>
              <span className="font-bold text-green-600">$${result.exchangeSavings}</span>
            </div>
          </div>
        </div>
      )}

      {!result.isPrimaryResidence && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Depreciation Recapture Warning</h3>
          <div className="text-sm text-yellow-600">
            Depreciation ($${result.totalDepreciation}) creates tax benefit now, but taxed at 25% when sold. Capital gains taxed at 20% + state. Consider 1031 exchange to defer all gains tax. Or hold property to pass to heirs (step-up basis eliminates deferred tax).
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Deductions Available</h3>
        <div className="text-xs text-zinc-600">
          Property tax (deductible from rental income), Mortgage interest (deductible), Depreciation (paper loss), Operating expenses (repairs, insurance, management), Travel to property, Home office (if managing), Professional fees (legal, accounting). Document all expenses for audit protection.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">1031 Exchange Benefits</h3>
        <div className="text-xs text-zinc-600">
          Defer all capital gains and depreciation recapture. Must identify replacement within 45 days. Must close within 180 days. Like-kind: Any real estate for any real estate. Value must equal or exceed. Ultimate tax savings: Hold until death - heirs get step-up basis, all deferred gain eliminated.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">State Tax Optimization</h3>
        <div className="text-xs text-zinc-600">
          No state income tax: FL, TX, WA, NV, WY, SD. Low property tax: CO (0.52%), AZ (0.66%). High property tax: NJ (2.49%), IL (2.2%). Balance income tax vs property tax. Consider investing in tax-friendly states. Rental income taxed where property located (not where you live).
        </div>
      </div>
    </main>
  )
}