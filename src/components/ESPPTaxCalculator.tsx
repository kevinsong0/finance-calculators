'use client'

import { useState } from 'react'

export default function ESPPTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(40)
  const [marketPrice, setMarketPrice] = useState(50)
  const [discountPercent, setDiscountPercent] = useState(15)
  const [numShares, setNumShares] = useState(100)
  const [purchaseDate, setPurchaseDate] = useState('2024-01-15')
  const [saleDate, setSaleDate] = useState('2025-06-15')
  const [salePrice, setSalePrice] = useState(75)
  const [marginalRate, setMarginalRate] = useState(24)
  const [qualifyingDisposition, setQualifyingDisposition] = useState(true)

  const calculate = () => {
    // ESPP discount calculation
    const discountedPrice = marketPrice * (1 - discountPercent / 100)
    const actualPurchasePrice = Math.min(purchasePrice, discountedPrice) // Lower of FMV at grant or purchase
    const discountAmount = marketPrice - actualPurchasePrice
    const totalDiscount = discountAmount * numShares
    const purchaseCost = actualPurchasePrice * numShares

    // Holding periods
    const purchaseDateTime = new Date(purchaseDate).getTime()
    const saleDateTime = new Date(saleDate).getTime()
    const holdingDays = Math.floor((saleDateTime - purchaseDateTime) / (1000 * 60 * 60 * 24))
    const holdingMonths = holdingDays / 30

    // Qualifying disposition: hold 2+ years from grant, 1+ year from purchase
    // Grant date typically 3-6 months before purchase (offering period)
    const offeringPeriodMonths = 6 // Assumed offering period
    const grantToPurchaseMonths = offeringPeriodMonths
    const totalHoldingFromGrant = holdingMonths + grantToPurchaseMonths
    const isQualifying = qualifyingDisposition && holdingDays >= 365 && totalHoldingFromGrant >= 24

    // Tax calculations
    let ordinaryIncome = 0
    let capitalGainBasis = actualPurchasePrice

    if (isQualifying) {
      // Qualifying disposition: ordinary income = min(discount at purchase, gain at sale)
      // If sold at gain: ordinary income = discount at purchase
      // If sold at loss: ordinary income = gain (if any), but limited to discount
      const gainAtSale = salePrice - marketPrice
      if (gainAtSale >= 0) {
        ordinaryIncome = Math.min(totalDiscount, gainAtSale * numShares)
      } else {
        ordinaryIncome = Math.max(0, Math.min(totalDiscount, (salePrice - actualPurchasePrice) * numShares))
      }
      capitalGainBasis = actualPurchasePrice + ordinaryIncome / numShares
    } else {
      // Disqualifying disposition: ordinary income = entire discount
      ordinaryIncome = totalDiscount
      capitalGainBasis = marketPrice // Basis = FMV at purchase
    }

    const ordinaryIncomeTax = ordinaryIncome * (marginalRate / 100)
    const capitalGain = salePrice - capitalGainBasis
    const totalCapitalGain = capitalGain * numShares

    // Determine if LTCG or STCG
    const isLongTerm = holdingDays > 365
    const capitalGainRate = isLongTerm ? 0.15 : marginalRate / 100
    const capitalGainTax = totalCapitalGain * capitalGainRate

    const totalTax = ordinaryIncomeTax + capitalGainTax
    const saleProceeds = salePrice * numShares
    const netProceeds = saleProceeds - totalTax

    // Compare qualifying vs disqualifying
    const disqualifyingOrdinaryIncome = totalDiscount
    const disqualifyingBasis = marketPrice
    const disqualifyingCapitalGain = salePrice - disqualifyingBasis
    const disqualifyingCapGainTax = disqualifyingCapitalGain * numShares * (isLongTerm ? 0.15 : marginalRate / 100)
    const disqualifyingTotalTax = disqualifyingOrdinaryIncome * (marginalRate / 100) + disqualifyingCapGainTax

    return {
      purchasePrice: purchasePrice.toFixed(2),
      marketPrice: marketPrice.toFixed(2),
      discountPercent: discountPercent.toFixed(0),
      discountedPrice: discountedPrice.toFixed(2),
      actualPurchasePrice: actualPurchasePrice.toFixed(2),
      numShares: numShares.toFixed(0),
      totalDiscount: totalDiscount.toFixed(2),
      purchaseCost: purchaseCost.toFixed(2),
      holdingDays: holdingDays.toFixed(0),
      holdingMonths: holdingMonths.toFixed(1),
      isQualifying,
      ordinaryIncome: ordinaryIncome.toFixed(2),
      ordinaryIncomeTax: ordinaryIncomeTax.toFixed(2),
      capitalGainBasis: capitalGainBasis.toFixed(2),
      capitalGain: capitalGain.toFixed(2),
      totalCapitalGain: totalCapitalGain.toFixed(2),
      isLongTerm,
      capitalGainRate: (capitalGainRate * 100).toFixed(0),
      capitalGainTax: capitalGainTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      saleProceeds: saleProceeds.toFixed(2),
      netProceeds: netProceeds.toFixed(2),
      marginalRate: marginalRate.toFixed(0),
      disqualifyingTotalTax: disqualifyingTotalTax.toFixed(2),
      qualifyingSavings: (disqualifyingTotalTax - totalTax).toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ESPP Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on Employee Stock Purchase Plan shares at sale.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Price (FMV) ($)</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Market Price at Grant ($)</label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            max="15"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Shares</label>
          <input
            type="number"
            value={numShares}
            onChange={(e) => setNumShares(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Purchase Date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
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
          <label className="block text-sm font-medium mb-1">Sale Price ($)</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
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
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={qualifyingDisposition}
            onChange={(e) => setQualifyingDisposition(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Intended Qualifying Disposition</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">ESPP Purchase Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Market Price:</span>
            <span className="font-medium ml-2">$ {result.marketPrice}</span>
          </div>
          <div>
            <span className="text-zinc-600">Discount:</span>
            <span className="font-bold ml-2">{result.discountPercent}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Purchase Price:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.actualPurchasePrice}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Discount:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.totalDiscount}</span>
          </div>
          <div>
            <span className="text-zinc-600">Purchase Cost:</span>
            <span className="font-medium ml-2">$ {result.purchaseCost}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Holding Period Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Days Held:</span>
            <span className="font-medium ml-2">{result.holdingDays}</span>
          </div>
          <div>
            <span className="text-zinc-600">Months Held:</span>
            <span className="font-medium ml-2">{result.holdingMonths}</span>
          </div>
          <div>
            <span className="text-zinc-600">Qualifying:</span>
            <span className={`font-bold ml-2 ${result.isQualifying ? 'text-green-600' : 'text-orange-600'}`}>
              {result.isQualifying ? 'Yes' : 'No'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Long-Term Cap Gain:</span>
            <span className={`font-bold ml-2 ${result.isLongTerm ? 'text-green-600' : 'text-orange-600'}`}>
              {result.isLongTerm ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Ordinary Income:</span>
            <span className="font-bold text-purple-700 ml-2">$ {result.ordinaryIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Income Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.ordinaryIncomeTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Cost Basis:</span>
            <span className="font-medium ml-2">$ {result.capitalGainBasis}/share</span>
          </div>
          <div>
            <span className="text-zinc-600">Capital Gain:</span>
            <span className="font-bold ml-2">$ {result.totalCapitalGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Cap Gain Tax ({result.capitalGainRate}%):</span>
            <span className="font-bold text-red-700 ml-2">$ {result.capitalGainTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Qualifying vs Disqualifying</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Qualifying Tax:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Disqualifying Tax:</span>
            <span className="font-bold text-orange-700 ml-2">$ {result.disqualifyingTotalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Savings:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.qualifyingSavings) > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              $ {result.qualifyingSavings}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">ESPP Tax Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>ESPP discount max 15% (IRS limit)</li>
          <li>Purchase price: lower of FMV at grant or purchase</li>
          <li>Qualifying disposition: hold 2+ years from grant, 1+ year from purchase</li>
          <li>Qualifying: ordinary income = discount (min of gain)</li>
          <li>Disqualifying: ordinary income = entire discount</li>
          <li>Reported on W-2, plus Form 1099-B for sale</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Qualifying Disposition Benefits</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Ordinary income limited to discount at purchase</li>
          <li>Remaining gain taxed as LTCG (15% vs 24%+ marginal)</li>
          <li>If sold at loss: no ordinary income in some cases</li>
          <li>Basis increases by ordinary income amount</li>
          <li>Must hold 2+ years from OFFERING date (grant)</li>
          <li>AND hold 1+ year from PURCHASE date</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200 mt-4">
        <h3 className="font-medium mb-2 text-red-700">Disqualifying Disposition</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Sell before qualifying period ends</li>
          <li>Entire discount taxed as ordinary income</li>
          <li>Basis = FMV at purchase (higher than qualifying)</li>
          <li>Capital gain = Sale price - FMV at purchase</li>
          <li>Higher ordinary income tax, but lower capital gain</li>
          <li>Sell immediately: minimal capital gain, max ordinary income</li>
        </ul>
      </div>
    </div>
  )
}