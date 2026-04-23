'use client'

import { useState } from 'react'

export default function StockOptionExerciseTaxCalculator() {
  const [optionType, setOptionType] = useState<'iso' | 'nso'>('nso')
  const [strikePrice, setStrikePrice] = useState(50)
  const [currentFMV, setCurrentFMV] = useState(100)
  const [numberOfShares, setNumberOfShares] = useState(1000)
  const [ordinaryIncome, setOrdinaryIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [salePrice, setSalePrice] = useState(120)
  const [holdingPeriod, setHoldingPeriod] = useState<'disqualifying' | 'qualifying'>('disqualifying')
  const [grantDate, setGrantDate] = useState('2020')

  const calculate = () => {
    const spread = currentFMV - strikePrice
    const totalSpread = spread * numberOfShares
    const exerciseCost = strikePrice * numberOfShares
    const currentValue = currentFMV * numberOfShares

    // NSO taxation
    let nsoCompensationIncome = 0
    let nsoTax = 0
    let nsoCapitalGains = 0
    let nsoCapitalGainsTax = 0

    if (optionType === 'nso') {
      // NSO: spread taxed as ordinary income at exercise
      nsoCompensationIncome = totalSpread
      const marginalRate = getMarginalRate(ordinaryIncome + nsoCompensationIncome, filingStatus)
      nsoTax = nsoCompensationIncome * marginalRate

      // Sale taxation
      const saleGain = (salePrice - currentFMV) * numberOfShares
      nsoCapitalGains = saleGain
      const capitalGainsRate = holdingPeriod === 'qualifying' ? 0.15 : getMarginalRate(ordinaryIncome + nsoCompensationIncome, filingStatus)
      nsoCapitalGainsTax = saleGain > 0 ? saleGain * capitalGainsRate : 0
    }

    // ISO taxation
    let isoCompensationIncome = 0
    let isoTax = 0
    let isoCapitalGains = 0
    let isoCapitalGainsTax = 0
    let amtAdjustment = 0
    let amtTax = 0

    if (optionType === 'iso') {
      // ISO: no regular tax at exercise, but AMT adjustment
      amtAdjustment = totalSpread

      // AMT calculation (simplified)
      const amtExemption = filingStatus === 'single' ? 81700 : 126500
      const amtRate = 0.26 // 26% up to $220,700, 28% above
      const amtIncome = ordinaryIncome + amtAdjustment
      const amtTaxable = Math.max(0, amtIncome - amtExemption)
      amtTax = amtTaxable * amtRate

      // Regular tax
      const regularTax = ordinaryIncome * getMarginalRate(ordinaryIncome, filingStatus)
      isoTax = Math.max(amtTax - regularTax, 0) // AMT credit potential

      // Sale taxation
      if (holdingPeriod === 'qualifying') {
        // Qualifying disposition: all gain taxed as LTCG
        const totalGain = (salePrice - strikePrice) * numberOfShares
        isoCapitalGains = totalGain
        isoCapitalGainsTax = totalGain > 0 ? totalGain * 0.15 : 0
      } else {
        // Disqualifying: spread taxed as ordinary, rest as capital gain
        isoCompensationIncome = totalSpread
        const marginalRate = getMarginalRate(ordinaryIncome + isoCompensationIncome, filingStatus)
        isoTax = isoCompensationIncome * marginalRate
        const remainingGain = (salePrice - currentFMV) * numberOfShares
        isoCapitalGains = remainingGain
        isoCapitalGainsTax = remainingGain > 0 ? remainingGain * 0.15 : 0
      }
    }

    // Total cost and proceeds
    const exerciseTotalCost = exerciseCost + (optionType === 'nso' ? nsoTax : isoTax)
    const saleProceeds = salePrice * numberOfShares
    const totalTax = optionType === 'nso' ? nsoTax + nsoCapitalGainsTax : isoTax + isoCapitalGainsTax
    const netProceeds = saleProceeds - exerciseTotalCost - totalTax

    // ISO holding requirements
    const isoHoldingRequirement = 'Exercise + 2 years from grant + 1 year from exercise'

    return {
      optionType,
      strikePrice: strikePrice.toFixed(2),
      currentFMV: currentFMV.toFixed(2),
      numberOfShares: numberOfShares.toFixed(0),
      spread: spread.toFixed(2),
      totalSpread: totalSpread.toFixed(0),
      exerciseCost: exerciseCost.toFixed(0),
      currentValue: currentValue.toFixed(0),
      ordinaryIncome: ordinaryIncome.toFixed(0),
      nsoCompensationIncome: nsoCompensationIncome.toFixed(0),
      nsoTax: nsoTax.toFixed(0),
      nsoCapitalGains: nsoCapitalGains.toFixed(0),
      nsoCapitalGainsTax: nsoCapitalGainsTax.toFixed(0),
      isoCompensationIncome: isoCompensationIncome.toFixed(0),
      isoTax: isoTax.toFixed(0),
      isoCapitalGains: isoCapitalGains.toFixed(0),
      isoCapitalGainsTax: isoCapitalGainsTax.toFixed(0),
      amtAdjustment: amtAdjustment.toFixed(0),
      amtTax: amtTax.toFixed(0),
      salePrice: salePrice.toFixed(2),
      saleProceeds: saleProceeds.toFixed(0),
      exerciseTotalCost: exerciseTotalCost.toFixed(0),
      totalTax: totalTax.toFixed(0),
      netProceeds: netProceeds.toFixed(0),
      holdingPeriod,
      filingStatus,
      isoHoldingRequirement,
    }
  }

  const getMarginalRate = (income: number, status: 'single' | 'married'): number => {
    const bracketsSingle = [11600, 47150, 100525, 191950, 243725, 609350]
    const bracketsMarried = [23200, 94300, 201050, 383900, 487450, 731200]
    const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
    const brackets = status === 'single' ? bracketsSingle : bracketsMarried
    for (let i = 0; i < brackets.length; i++) {
      if (income <= brackets[i]) return rates[i]
    }
    return rates[6]
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Stock Option Exercise Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax impact of exercising NSO or ISO stock options.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Option Type</label>
          <select value={optionType} onChange={(e) => setOptionType(e.target.value as 'iso' | 'nso')} className="w-full border rounded p-2">
            <option value="nso">NSO (Non-Qualified Stock Option)</option>
            <option value="iso">ISO (Incentive Stock Option)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Strike Price ($)</label>
          <input type="number" value={strikePrice} onChange={(e) => setStrikePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current FMV ($)</label>
          <input type="number" value={currentFMV} onChange={(e) => setCurrentFMV(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Shares</label>
          <input type="number" value={numberOfShares} onChange={(e) => setNumberOfShares(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Price ($)</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ordinary Income ($)</label>
          <input type="number" value={ordinaryIncome} onChange={(e) => setOrdinaryIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Period</label>
          <select value={holdingPeriod} onChange={(e) => setHoldingPeriod(e.target.value as 'disqualifying' | 'qualifying')} className="w-full border rounded p-2">
            <option value="disqualifying">Disqualifying (sell before holding requirement)</option>
            <option value="qualifying">Qualifying (met holding requirement)</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Option Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Strike Price:</span><span className="font-medium ml-2">$ {result.strikePrice}</span></div>
          <div><span className="text-zinc-600">Current FMV:</span><span className="font-medium ml-2">$ {result.currentFMV}</span></div>
          <div><span className="text-zinc-600">Spread:</span><span className="font-bold text-blue-700 ml-2">$ {result.spread}</span></div>
          <div><span className="text-zinc-600">Shares:</span><span className="font-medium ml-2">{result.numberOfShares}</span></div>
          <div><span className="text-zinc-600">Total Spread:</span><span className="font-bold text-blue-700 ml-2">$ {result.totalSpread}</span></div>
          <div><span className="text-zinc-600">Exercise Cost:</span><span className="font-medium ml-2">$ {result.exerciseCost}</span></div>
        </div>
      </div>

      {result.optionType === 'nso' && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">NSO Taxation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Compensation Income:</span><span className="font-bold text-purple-700 ml-2">$ {result.nsoCompensationIncome}</span></div>
            <div><span className="text-zinc-600">Tax at Exercise:</span><span className="font-bold text-purple-700 ml-2">$ {result.nsoTax}</span></div>
            <div><span className="text-zinc-600">Capital Gains:</span><span className="font-medium ml-2">$ {result.nsoCapitalGains}</span></div>
            <div><span className="text-zinc-600">Capital Gains Tax:</span><span className="font-bold ml-2">$ {result.nsoCapitalGainsTax}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">NSO: spread taxed as ordinary income at exercise. Later sale: capital gain on appreciation.</div>
        </div>
      )}

      {result.optionType === 'iso' && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">ISO Taxation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">AMT Adjustment:</span><span className="font-bold text-orange-700 ml-2">$ {result.amtAdjustment}</span></div>
            <div><span className="text-zinc-600">AMT Tax:</span><span className="font-bold ml-2">$ {result.amtTax}</span></div>
            <div><span className="text-zinc-600">ISO Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.isoTax}</span></div>
            <div><span className="text-zinc-600">Capital Gains:</span><span className="font-medium ml-2">$ {result.isoCapitalGains}</span></div>
            <div><span className="text-zinc-600">Capital Gains Tax:</span><span className="font-bold ml-2">$ {result.isoCapitalGainsTax}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">ISO: no regular tax at exercise, but AMT adjustment. Qualifying sale: all taxed as LTCG.</div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Sale Proceeds</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Sale Proceeds:</span><span className="font-bold ml-2">$ {result.saleProceeds}</span></div>
          <div><span className="text-zinc-600">Exercise Total Cost:</span><span className="font-bold ml-2">$ {result.exerciseTotalCost}</span></div>
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
          <div><span className="text-zinc-600">Net Proceeds:</span><span className="font-bold text-green-700 ml-2">$ {result.netProceeds}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">ISO Holding Requirements</h2>
        <div className="text-sm text-teal-700">{result.isoHoldingRequirement}</div>
        <div className="text-xs text-zinc-600 mt-2">Qualifying disposition: hold shares at least 2 years from grant AND 1 year from exercise.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Stock Option Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>NSO: taxed at exercise, simpler tax treatment</li>
          <li>ISO: AMT risk, but LTCG on qualifying sale</li>
          <li>ISO AMT credit: can offset future regular tax</li>
          <li>Exercise early: lower spread, lower AMT risk</li>
          <li>Sell same day: disqualifying disposition for ISO</li>
          <li>83(b) election: for restricted stock, not options</li>
        </ul>
      </div>
    </div>
  )
}