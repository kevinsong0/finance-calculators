'use client'

import { useState } from 'react'

export default function InvestmentPropertyTaxOptimizerCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [currentValue, setCurrentValue] = useState(750000)
  const [annualRent, setAnnualRent] = useState(36000)
  const [annualExpenses, setAnnualExpenses] = useState(8000)
  const [depreciationYears, setDepreciationYears] = useState(27.5)
  const [holdingYears, setHoldingYears] = useState(10)
  const [marginalRate, setMarginalRate] = useState(24)
  const [capitalGainsRate, setCapitalGainsRate] = useState(15)
  const [stateRate, setStateRate] = useState(5)
  const [use1031Exchange, setUse1031Exchange] = useState(false)

  const calculate = () => {
    // Depreciation
    const buildingValue = purchasePrice * 0.8 // 80% building, 20% land
    const annualDepreciation = buildingValue / depreciationYears
    const totalDepreciation = annualDepreciation * holdingYears

    // Net operating income
    const noi = annualRent - annualExpenses - annualDepreciation
    const taxableIncome = noi > 0 ? noi : 0

    // Annual tax on rental income
    const annualRentalTax = taxableIncome * (marginalRate / 100 + stateRate / 100)

    // Capital gains on sale
    const saleGain = currentValue - purchasePrice
    const depreciationRecapture = Math.min(totalDepreciation, saleGain)
    const remainingGain = saleGain - depreciationRecapture

    // Depreciation recapture taxed at 25% max
    const recaptureTax = depreciationRecapture * 0.25
    const capitalGainsTax = remainingGain * (capitalGainsRate / 100)
    const stateCapitalGainsTax = saleGain * (stateRate / 100)

    // Total tax on sale without 1031
    const totalSaleTax = recaptureTax + capitalGainsTax + stateCapitalGainsTax

    // With 1031 exchange: tax deferred
    const saleTaxWith1031 = use1031Exchange ? 0 : totalSaleTax

    // Total tax over holding period
    const totalRentalTax = annualRentalTax * holdingYears
    const totalTax = totalRentalTax + saleTaxWith1031

    // Tax savings from 1031
    const taxSaved1031 = use1031Exchange ? totalSaleTax : 0

    // Cash flow analysis
    const annualCashFlow = annualRent - annualExpenses - annualRentalTax
    const totalCashFlow = annualCashFlow * holdingYears

    // Effective tax rate on income
    const effectiveRate = noi > 0 ? (annualRentalTax / noi) * 100 : 0

    return {
      purchasePrice: purchasePrice.toFixed(0),
      currentValue: currentValue.toFixed(0),
      annualRent: annualRent.toFixed(0),
      annualExpenses: annualExpenses.toFixed(0),
      buildingValue: buildingValue.toFixed(0),
      annualDepreciation: annualDepreciation.toFixed(0),
      totalDepreciation: totalDepreciation.toFixed(0),
      noi: noi.toFixed(0),
      taxableIncome: taxableIncome.toFixed(0),
      annualRentalTax: annualRentalTax.toFixed(0),
      totalRentalTax: totalRentalTax.toFixed(0),
      saleGain: saleGain.toFixed(0),
      depreciationRecapture: depreciationRecapture.toFixed(0),
      remainingGain: remainingGain.toFixed(0),
      recaptureTax: recaptureTax.toFixed(0),
      capitalGainsTax: capitalGainsTax.toFixed(0),
      stateCapitalGainsTax: stateCapitalGainsTax.toFixed(0),
      totalSaleTax: totalSaleTax.toFixed(0),
      saleTaxWith1031: saleTaxWith1031.toFixed(0),
      totalTax: totalTax.toFixed(0),
      taxSaved1031: taxSaved1031.toFixed(0),
      annualCashFlow: annualCashFlow.toFixed(0),
      totalCashFlow: totalCashFlow.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      use1031Exchange,
      holdingYears: holdingYears.toFixed(0),
      depreciationYears: depreciationYears.toFixed(1),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Investment Property Tax Optimizer</h1>
      <p className="text-gray-600 mb-4">Calculate depreciation, rental income tax, and sale tax implications.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Price ($)</label>
          <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Value ($)</label>
          <input type="number" value={currentValue} onChange={(e) => setCurrentValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Rent ($)</label>
          <input type="number" value={annualRent} onChange={(e) => setAnnualRent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Expenses ($)</label>
          <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Years</label>
          <input type="number" value={holdingYears} onChange={(e) => setHoldingYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate (%)</label>
          <input type="number" value={marginalRate} onChange={(e) => setMarginalRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capital Gains Rate (%)</label>
          <input type="number" value={capitalGainsRate} onChange={(e) => setCapitalGainsRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateRate} onChange={(e) => setStateRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={use1031Exchange} onChange={(e) => setUse1031Exchange(e.target.checked)} className="w-4 h-4" />
          <label className="text-sm font-medium">Use 1031 Exchange on Sale</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Depreciation Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Building Value:</span><span className="font-medium ml-2">$ {result.buildingValue}</span></div>
          <div><span className="text-zinc-600">Annual Depreciation:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualDepreciation}</span></div>
          <div><span className="text-zinc-600">Total Depreciation:</span><span className="font-bold ml-2">$ {result.totalDepreciation}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Residential: 27.5 years. Commercial: 39 years. Land not depreciable.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Rental Income Tax</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Net Operating Income:</span><span className="font-bold ml-2">$ {result.noi}</span></div>
          <div><span className="text-zinc-600">Taxable Income:</span><span className="font-bold ml-2">$ {result.taxableIncome}</span></div>
          <div><span className="text-zinc-600">Annual Tax:</span><span className="font-bold text-purple-700 ml-2">$ {result.annualRentalTax}</span></div>
          <div><span className="text-zinc-600">Total Rental Tax:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalRentalTax}</span></div>
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveRate}%</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Sale Tax Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Sale Gain:</span><span className="font-bold ml-2">$ {result.saleGain}</span></div>
          <div><span className="text-zinc-600">Depreciation Recapture:</span><span className="font-bold text-orange-700 ml-2">$ {result.depreciationRecapture}</span></div>
          <div><span className="text-zinc-600">Remaining Gain:</span><span className="font-medium ml-2">$ {result.remainingGain}</span></div>
          <div><span className="text-zinc-600">Recapture Tax (25%):</span><span className="font-bold ml-2">$ {result.recaptureTax}</span></div>
          <div><span className="text-zinc-600">Capital Gains Tax:</span><span className="font-bold ml-2">$ {result.capitalGainsTax}</span></div>
          <div><span className="text-zinc-600">State Tax:</span><span className="font-bold ml-2">$ {result.stateCapitalGainsTax}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">1031 Exchange Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Tax Without 1031:</span><span className="font-bold text-red-600 ml-2">$ {result.totalSaleTax}</span></div>
          <div><span className="text-zinc-600">Tax With 1031:</span><span className="font-bold text-green-700 ml-2">$ {result.saleTaxWith1031}</span></div>
          <div><span className="text-zinc-600">Tax Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSaved1031}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">1031 exchange defers all capital gains and depreciation recapture tax indefinitely.</div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Tax Summary ({result.holdingYears} years)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Rental Tax:</span><span className="font-bold ml-2">$ {result.totalRentalTax}</span></div>
          <div><span className="text-zinc-600">Sale Tax:</span><span className="font-bold ml-2">$ {result.saleTaxWith1031}</span></div>
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Investment Property Tax Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Depreciation: reduces taxable rental income, creates future recapture</li>
          <li>1031 exchange: defer all gains, exchange into better property</li>
          <li>Passive activity: rental losses offset passive income only</li>
          <li>Material participation: can offset active income</li>
          <li>Cost segregation: accelerate depreciation on components</li>
          <li>Hold over 1 year: LTCG rates vs ordinary income</li>
        </ul>
      </div>
    </div>
  )
}