'use client'

import { useState } from 'react'

export default function RSUTaxCalculator() {
  const [numUnits, setNumUnits] = useState(1000)
  const [grantPrice, setGrantPrice] = useState(10)
  const [vestPrice, setVestPrice] = useState(50)
  const [salePrice, setSalePrice] = useState(75)
  const [vestDate, setVestDate] = useState('2024-01-15')
  const [saleDate, setSaleDate] = useState('2024-06-15')
  const [marginalRate, setMarginalRate] = useState(24)
  const [supplementalRate, setSupplementalRate] = useState(22)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [sellImmediately, setSellImmediately] = useState(false)

  const calculate = () => {
    // RSU taxation at vesting
    const incomeAtVest = vestPrice * numUnits
    const withheldTax = incomeAtVest * (supplementalRate / 100)
    const netUnits = numUnits - Math.ceil(withheldTax / vestPrice) // Units withheld for taxes

    // Calculate actual tax vs withheld
    const actualTaxAtVest = incomeAtVest * (marginalRate / 100)
    const taxUnderwithheld = actualTaxAtVest - withheldTax
    const taxOverwithheld = withheldTax - actualTaxAtVest

    // Sale calculations
    const actualUnitsSold = sellImmediately ? netUnits : numUnits // If sell immediately, use net units
    const saleProceeds = salePrice * actualUnitsSold
    const costBasis = vestPrice // Cost basis = FMV at vesting
    const capitalGain = salePrice - costBasis
    const totalCapitalGain = capitalGain * actualUnitsSold

    // Holding period for LTCG qualification
    const vestDateTime = new Date(vestDate).getTime()
    const saleDateTime = new Date(saleDate).getTime()
    const holdingDays = Math.floor((saleDateTime - vestDateTime) / (1000 * 60 * 60 * 24))
    const isLongTerm = holdingDays > 365

    // Capital gains tax
    const capitalGainRate = isLongTerm ? 0.15 : marginalRate / 100 // LTCG 15% vs STCG at marginal
    const capitalGainTax = totalCapitalGain * capitalGainRate

    // Total tax
    const totalTax = actualTaxAtVest + capitalGainTax

    // Net proceeds
    const netProceeds = saleProceeds - capitalGainTax

    // Double taxation risk (if not properly tracked)
    const doubleTaxRisk = sellImmediately ? 0 : actualTaxAtVest // Risk if cost basis not tracked

    return {
      numUnits: numUnits.toFixed(0),
      grantPrice: grantPrice.toFixed(2),
      vestPrice: vestPrice.toFixed(2),
      salePrice: salePrice.toFixed(2),
      incomeAtVest: incomeAtVest.toFixed(2),
      withheldTax: withheldTax.toFixed(2),
      actualTaxAtVest: actualTaxAtVest.toFixed(2),
      taxUnderwithheld: taxUnderwithheld.toFixed(2),
      taxOverwithheld: taxOverwithheld.toFixed(2),
      netUnits: netUnits.toFixed(0),
      actualUnitsSold: actualUnitsSold.toFixed(0),
      saleProceeds: saleProceeds.toFixed(2),
      costBasis: costBasis.toFixed(2),
      capitalGain: capitalGain.toFixed(2),
      totalCapitalGain: totalCapitalGain.toFixed(2),
      holdingDays: holdingDays.toFixed(0),
      isLongTerm,
      capitalGainRate: (capitalGainRate * 100).toFixed(0),
      capitalGainTax: capitalGainTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netProceeds: netProceeds.toFixed(2),
      marginalRate: marginalRate.toFixed(0),
      supplementalRate: supplementalRate.toFixed(0),
      doubleTaxRisk: doubleTaxRisk.toFixed(2),
      sellImmediately,
      vestDate,
      saleDate,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">RSU Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on Restricted Stock Units at vesting and sale.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Number of RSUs</label>
          <input
            type="number"
            value={numUnits}
            onChange={(e) => setNumUnits(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grant Price ($)</label>
          <input
            type="number"
            value={grantPrice}
            onChange={(e) => setGrantPrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vest Price (FMV) ($)</label>
          <input
            type="number"
            value={vestPrice}
            onChange={(e) => setVestPrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Price ($)</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vest Date</label>
          <input
            type="date"
            value={vestDate}
            onChange={(e) => setVestDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Date</label>
          <input
            type="date"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate (%)</label>
          <input
            type="number"
            value={marginalRate}
            onChange={(e) => setMarginalRate(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Supplemental Rate (%)</label>
          <input
            type="number"
            value={supplementalRate}
            onChange={(e) => setSupplementalRate(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sellImmediately}
            onChange={(e) => setSellImmediately(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Sell Immediately at Vest (Same-Day Sale)</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Income at Vesting</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">RSUs Vested:</span>
            <span className="font-bold ml-2">{result.numUnits}</span>
          </div>
          <div>
            <span className="text-zinc-600">Vest Value:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.incomeAtVest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Withheld:</span>
            <span className="font-medium ml-2">$ {result.withheldTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Actual Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.actualTaxAtVest}</span>
          </div>
          {parseFloat(result.taxUnderwithheld) > 0 && (
            <div>
              <span className="text-zinc-600">Under-Withheld:</span>
              <span className="font-bold text-orange-700 ml-2">$ {result.taxUnderwithheld}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Withholding Analysis</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Supplemental Rate:</span>
            <span className="font-medium ml-2">{result.supplementalRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Marginal Rate:</span>
            <span className="font-medium ml-2">{result.marginalRate}%</span>
          </div>
          <div className="col-span-2 text-xs text-zinc-600">
            Supplemental withholding ({result.supplementalRate}%) may under-withhold if your marginal rate is higher ({result.marginalRate}%).
            Consider adjusting W-4 or making estimated tax payments.
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Sale Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Units Sold:</span>
            <span className="font-medium ml-2">{result.actualUnitsSold}</span>
          </div>
          <div>
            <span className="text-zinc-600">Sale Proceeds:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.saleProceeds}</span>
          </div>
          <div>
            <span className="text-zinc-600">Cost Basis:</span>
            <span className="font-medium ml-2">$ {result.costBasis}/share</span>
          </div>
          <div>
            <span className="text-zinc-600">Capital Gain:</span>
            <span className="font-bold ml-2">$ {result.totalCapitalGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Holding Days:</span>
            <span className="font-medium ml-2">{result.holdingDays}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Type:</span>
            <span className={`font-bold ml-2 ${result.isLongTerm ? 'text-green-600' : 'text-orange-600'}`}>
              {result.isLongTerm ? 'Long-Term' : 'Short-Term'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Cap Gain Tax ({result.capitalGainRate}%):</span>
            <span className="font-bold text-red-700 ml-2">$ {result.capitalGainTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Tax Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Income Tax:</span>
            <span className="font-bold ml-2">$ {result.actualTaxAtVest}</span>
          </div>
          <div>
            <span className="text-zinc-600">Cap Gain Tax:</span>
            <span className="font-bold ml-2">$ {result.capitalGainTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Proceeds:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.netProceeds}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">RSU Tax Facts</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>RSUs taxed as ordinary income at vesting (FMV × units)</li>
          <li>Cost basis = FMV at vesting (already taxed on this amount)</li>
          <li>Capital gain = Sale price - Vest price (FMV)</li>
          <li>Hold 1+ year from vest for LTCG (15% vs marginal rate)</li>
          <li>Withholding: supplemental rate 22% (37% above $1M)</li>
          <li>Reported on W-2, not 1099 (employer income)</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Same-Day Sale vs Hold</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Same-day sale: minimal capital gain/loss, immediate cash</li>
          <li>Hold: potential growth, but risk of price decline</li>
          <li>Hold 1+ year: qualify for LTCG (15% vs 24%+ marginal)</li>
          <li>Sell-to-cover: sell enough to cover tax withholding</li>
          <li>Net shares: receive remaining shares after withholding</li>
          <li>Consider diversification risk (too much in one stock)</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200 mt-4">
        <h3 className="font-medium mb-2 text-red-700">Double Taxation Risk</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Cost basis must be FMV at vesting (NOT grant price)</li>
          <li>Broker may have incorrect basis - verify Form 1099-B</li>
          <li>W-2 shows income, but 1099-B shows sale</li>
          <li>If basis wrong, you pay tax twice on vest income</li>
          <li>Adjust basis on Form 8949 if 1099-B is incorrect</li>
          <li>Keep records: vest date, FMV, units, withholding</li>
        </ul>
      </div>
    </div>
  )
}