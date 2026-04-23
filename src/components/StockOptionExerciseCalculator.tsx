'use client'

import { useState } from 'react'

export default function StockOptionExerciseCalculator() {
  const [optionType, setOptionType] = useState<'iso' | 'nso'>('iso')
  const [grantPrice, setGrantPrice] = useState(10)
  const [currentPrice, setCurrentPrice] = useState(50)
  const [numShares, setNumShares] = useState(1000)
  const [vestedShares, setVestedShares] = useState(1000)
  const [exerciseYear, setExerciseYear] = useState(2024)
  const [holdingPeriod, setHoldingPeriod] = useState(0)
  const [marginalRate, setMarginalRate] = useState(24)
  const [amtExemption, setAmtExemption] = useState(87800)
  const [otherAMTIncome, setOtherAMTIncome] = useState(0)

  const calculate = () => {
    const spread = currentPrice - grantPrice
    const totalSpread = spread * vestedShares
    const exerciseCost = grantPrice * vestedShares

    // NSO calculation
    const nsoOrdinaryIncome = totalSpread
    const nsoTax = nsoOrdinaryIncome * (marginalRate / 100)
    const nsoCostBasis = currentPrice // Cost basis = FMV at exercise

    // ISO calculation
    const isoAdjustment = totalSpread // AMT adjustment
    const isoRegularTax = 0 // No regular tax at exercise (if hold 2+ years)

    // AMT calculation for ISO
    const amtIncome = amtExemption + otherAMTIncome + isoAdjustment
    const amtTaxRate = 0.26 // Flat 26% AMT rate (28% above $232K)
    const amtTax = Math.max(0, amtIncome - 73900) * amtTaxRate // AMT exemption phaseout starts at $739K
    const amtOwed = Math.max(0, amtTax - isoRegularTax)

    // Future sale calculations
    const futureSalePrice = currentPrice * 1.5 // Assumed 50% growth
    const futureGain = futureSalePrice - currentPrice

    // ISO qualified sale (2+ years from grant, 1+ year from exercise)
    const isoQualifiedHoldingYears = 2
    const isoQualified = holdingPeriod >= isoQualifiedHoldingYears
    const isoCapitalGain = futureGain * vestedShares
    const isoCapitalGainTax = isoCapitalGain * 0.15 // 15% LTCG rate
    const isoTotalTax = amtOwed + isoCapitalGainTax

    // ISO disqualified sale (sell before qualifying period)
    const isoDisqualifySpreadTax = totalSpread * (marginalRate / 100)
    const isoDisqualifyCapitalGain = futureGain * vestedShares
    const isoDisqualifyCapitalGainTax = isoCapitalGain * 0.15
    const isoDisqualifyTotalTax = isoDisqualifySpreadTax + isoDisqualifyCapitalGainTax

    // NSO sale (always ordinary income on spread at exercise)
    const nsoCapitalGain = futureGain * vestedShares
    const nsoCapitalGainTax = nsoCapitalGain * 0.15
    const nsoSaleTotalTax = nsoTax + nsoCapitalGainTax

    // AMT credit (recoverable when regular tax exceeds AMT in future)
    const amtCredit = amtOwed

    return {
      optionType,
      grantPrice: grantPrice.toFixed(2),
      currentPrice: currentPrice.toFixed(2),
      spread: spread.toFixed(2),
      numShares: numShares.toFixed(0),
      vestedShares: vestedShares.toFixed(0),
      totalSpread: totalSpread.toFixed(2),
      exerciseCost: exerciseCost.toFixed(2),
      nsoOrdinaryIncome: nsoOrdinaryIncome.toFixed(2),
      nsoTax: nsoTax.toFixed(2),
      isoAdjustment: isoAdjustment.toFixed(2),
      amtOwed: amtOwed.toFixed(2),
      amtCredit: amtCredit.toFixed(2),
      isoQualified,
      isoCapitalGainTax: isoCapitalGainTax.toFixed(2),
      isoTotalTax: isoTotalTax.toFixed(2),
      isoDisqualifyTotalTax: isoDisqualifyTotalTax.toFixed(2),
      nsoSaleTotalTax: nsoSaleTotalTax.toFixed(2),
      futureSalePrice: futureSalePrice.toFixed(2),
      holdingPeriod: holdingPeriod.toFixed(0),
      marginalRate: marginalRate.toFixed(0),
      amtExemption: amtExemption.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Stock Option Exercise Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax implications of exercising ISO vs NSO stock options.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Option Type</label>
          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value as 'iso' | 'nso')}
            className="w-full border rounded p-2"
          >
            <option value="iso">ISO (Incentive Stock Option)</option>
            <option value="nso">NSO (Non-Qualified Stock Option)</option>
          </select>
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
          <label className="block text-sm font-medium mb-1">Current FMV ($)</label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vested Shares</label>
          <input
            type="number"
            value={vestedShares}
            onChange={(e) => setVestedShares(Number(e.target.value))}
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
        {optionType === 'iso' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Holding Period (years)</label>
              <input
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">AMT Exemption ($)</label>
              <input
                type="number"
                value={amtExemption}
                onChange={(e) => setAmtExemption(Number(e.target.value))}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Exercise Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Spread per Share:</span>
            <span className="font-bold ml-2">$ {result.spread}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Spread:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.totalSpread}</span>
          </div>
          <div>
            <span className="text-zinc-600">Exercise Cost:</span>
            <span className="font-bold ml-2">$ {result.exerciseCost}</span>
          </div>
        </div>
      </div>

      {result.optionType === 'nso' && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">NSO Tax at Exercise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="text-zinc-600">Ordinary Income:</span>
              <span className="font-bold text-orange-700 ml-2">$ {result.nsoOrdinaryIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">Tax ({result.marginalRate}%):</span>
              <span className="font-bold text-red-700 ml-2">$ {result.nsoTax}</span>
            </div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">
            NSO: Spread taxed as ordinary income at exercise. Reported on W-2 if employer, or 1099-MISC.
          </div>
        </div>
      )}

      {result.optionType === 'iso' && (
        <>
          <div className="card bg-purple-50 border border-purple-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">ISO AMT at Exercise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-zinc-600">AMT Adjustment:</span>
                <span className="font-bold text-purple-700 ml-2">$ {result.isoAdjustment}</span>
              </div>
              <div>
                <span className="text-zinc-600">Potential AMT:</span>
                <span className="font-bold text-red-700 ml-2">$ {result.amtOwed}</span>
              </div>
              <div>
                <span className="text-zinc-600">AMT Credit:</span>
                <span className="font-bold text-green-700 ml-2">$ {result.amtCredit}</span>
              </div>
            </div>
            <div className="text-xs text-zinc-600 mt-2">
              ISO: No regular tax at exercise if hold requirements met. AMT applies to spread. AMT credit recoverable in future years.
            </div>
          </div>

          <div className="card bg-green-50 border border-green-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">ISO Sale Comparison</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-600">Qualified Sale Tax:</span>
                <span className={`font-bold ml-2 ${result.isoQualified ? 'text-green-700' : 'text-gray-500'}`}>
                  $ {result.isoTotalTax}
                </span>
                {!result.isoQualified && <span className="text-xs ml-1">(need {2 - parseFloat(result.holdingPeriod)} more years)</span>}
              </div>
              <div>
                <span className="text-zinc-600">Disqualified Sale Tax:</span>
                <span className="font-bold text-orange-700 ml-2">$ {result.isoDisqualifyTotalTax}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Future Sale Tax (Assumed 50% Growth)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Future Price:</span>
            <span className="font-medium ml-2">$ {result.futureSalePrice}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.nsoSaleTotalTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">ISO vs NSO Comparison</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>ISO: No regular tax at exercise, potential AMT, LTCG on sale if qualified</li>
          <li>NSO: Ordinary income tax on spread at exercise, LTCG on future gains</li>
          <li>ISO requires: 2+ years from grant date, 1+ year from exercise</li>
          <li>NSO always taxed as ordinary income on spread at exercise</li>
          <li>ISO AMT credit: recoverable when regular tax exceeds AMT</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">ISO Holding Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Qualifying disposition: hold 2+ years from GRANT date</li>
          <li>AND hold 1+ year from EXERCISE date</li>
          <li>If sold before: disqualified, spread taxed as ordinary income</li>
          <li>Qualified sale: all gain taxed as LTCG (0%/15%/20%)</li>
          <li>Exercise within 90 days of leaving company to keep ISO status</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">AMT Considerations for ISO</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>AMT exemption: $87,800 (2024 for single/married)</li>
          <li>AMT rate: 26% (28% above $232K AMTI)</li>
          <li>ISO spread adds to AMT income but not regular income</li>
          <li>Large ISO exercise can trigger significant AMT</li>
          <li>AMT credit carries forward indefinitely</li>
          <li>Exercise ISO strategically to manage AMT exposure</li>
        </ul>
      </div>
    </div>
  )
}