'use client'

import { useState } from 'react'

export default function StockOptionCalculator() {
  const [grantType, setGrantType] = useState('iso')
  const [sharesGranted, setSharesGranted] = useState('1000')
  const [strikePrice, setStrikePrice] = useState('10')
  const [currentFMV, setCurrentFMV] = useState('50')
  const [vestedShares, setVestedShares] = useState('500')
  const [exerciseDate, setExerciseDate] = useState('2024-01')
  const [salePrice, setSalePrice] = useState('60')
  const [ordinaryIncome, setOrdinaryIncome] = useState('100000')
  const [filingStatus, setFilingStatus] = useState('single')

  const amtExemption: Record<string, Record<string, number>> = {
    2024: { single: 85700, married: 133300 },
  }

  const calculate = () => {
    const shares = parseFloat(sharesGranted) || 0
    const strike = parseFloat(strikePrice) || 0
    const fmv = parseFloat(currentFMV) || 0
    const vested = parseFloat(vestedShares) || 0
    const sale = parseFloat(salePrice) || 0
    const income = parseFloat(ordinaryIncome) || 0
    const year = parseInt(exerciseDate.split('-')[0]) || 2024

    const bargainElement = Math.max(0, fmv - strike)
    const totalBargain = vested * bargainElement
    const exerciseCost = vested * strike
    const vestedValue = vested * fmv

    let regularTax = 0
    let amtTrigger = 0
    let capitalGains = 0
    let ordinaryComp = 0

    if (grantType === 'iso') {
      // ISO: No regular tax at exercise, but AMT adjustment
      amtTrigger = totalBargain
      regularTax = 0
      ordinaryComp = 0

      // AMT calculation (simplified)
      const amtThreshold = amtExemption[year]?.[filingStatus] || 85700
      const amtIncome = income + amtTrigger
      const amtExcess = Math.max(0, amtIncome - amtThreshold)
      const amtTax = amtExcess * 0.26 + Math.max(0, amtIncome - 206700) * 0.02

      // Capital gains at sale
      const saleGain = vested * (sale - fmv)
      capitalGains = saleGain

      // AMT credit available for future years
      const amtCredit = Math.max(0, amtTax)

      return {
        grantType: 'ISO (Incentive Stock Option)',
        sharesGranted: shares.toFixed(0),
        strikePrice: strike.toFixed(2),
        currentFMV: fmv.toFixed(2),
        vestedShares: vested.toFixed(0),
        bargainElement: bargainElement.toFixed(2),
        totalBargain: totalBargain.toFixed(2),
        exerciseCost: exerciseCost.toFixed(2),
        vestedValue: vestedValue.toFixed(2),
        regularTaxAtExercise: '0.00',
        amtAdjustment: totalBargain.toFixed(2),
        amtThreshold: amtThreshold.toFixed(0),
        amtIncome: amtIncome.toFixed(2),
        potentialAmtTax: amtTax.toFixed(2),
        amtCreditPotential: amtCredit.toFixed(2),
        saleGain: capitalGains.toFixed(2),
        capitalGainsType: sale > fmv ? 'Long-term' : 'No gain',
        salePrice: sale.toFixed(2),
        totalProfit: (vested * sale - exerciseCost).toFixed(2),
        ordinaryCompensation: '0.00',
        warningAMT: amtTrigger > 0 && amtIncome > amtThreshold,
        warning83b: false,
      }
    } else if (grantType === 'nso') {
      // NSO: Ordinary income at exercise
      ordinaryComp = totalBargain
      regularTax = ordinaryComp * 0.32 // Approximate ordinary rate

      // Capital gains at sale
      const saleGain = vested * (sale - fmv)
      capitalGains = saleGain

      return {
        grantType: 'NSO (Non-Qualified Stock Option)',
        sharesGranted: shares.toFixed(0),
        strikePrice: strike.toFixed(2),
        currentFMV: fmv.toFixed(2),
        vestedShares: vested.toFixed(0),
        bargainElement: bargainElement.toFixed(2),
        totalBargain: totalBargain.toFixed(2),
        exerciseCost: exerciseCost.toFixed(2),
        vestedValue: vestedValue.toFixed(2),
        regularTaxAtExercise: regularTax.toFixed(2),
        amtAdjustment: '0.00',
        amtThreshold: '0',
        amtIncome: '0.00',
        potentialAmtTax: '0.00',
        amtCreditPotential: '0.00',
        saleGain: capitalGains.toFixed(2),
        capitalGainsType: sale > fmv ? 'Long-term or Short-term' : 'No gain',
        salePrice: sale.toFixed(2),
        totalProfit: (vested * sale - exerciseCost).toFixed(2),
        ordinaryCompensation: ordinaryComp.toFixed(2),
        warningAMT: false,
        warning83b: vested > 0 && strike === 0,
      }
    } else {
      // RSU: Ordinary income at vesting
      ordinaryComp = vestedValue
      regularTax = ordinaryComp * 0.32

      return {
        grantType: 'RSU (Restricted Stock Unit)',
        sharesGranted: shares.toFixed(0),
        strikePrice: '0.00',
        currentFMV: fmv.toFixed(2),
        vestedShares: vested.toFixed(0),
        bargainElement: fmv.toFixed(2),
        totalBargain: vestedValue.toFixed(2),
        exerciseCost: '0.00',
        vestedValue: vestedValue.toFixed(2),
        regularTaxAtExercise: regularTax.toFixed(2),
        amtAdjustment: '0.00',
        amtThreshold: '0',
        amtIncome: '0.00',
        potentialAmtTax: '0.00',
        amtCreditPotential: '0.00',
        saleGain: (vested * (sale - fmv)).toFixed(2),
        capitalGainsType: sale > fmv ? 'Long-term or Short-term' : 'No gain',
        salePrice: sale.toFixed(2),
        totalProfit: (vested * sale).toFixed(2),
        ordinaryCompensation: ordinaryComp.toFixed(2),
        warningAMT: false,
        warning83b: true,
      }
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stock Option & RSU Tax Calculator</h1>
      <p className="text-zinc-600">Calculate tax implications of ISO, NSO, and RSU grants including AMT considerations and optimal exercise timing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Grant Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Grant Type</label>
            <select
              value={grantType}
              onChange={(e) => setGrantType(e.target.value)}
              className="input"
            >
              <option value="iso">ISO (Incentive Stock Option)</option>
              <option value="nso">NSO (Non-Qualified Stock Option)</option>
              <option value="rsu">RSU (Restricted Stock Unit)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Shares Granted</label>
            <input
              type="number"
              value={sharesGranted}
              onChange={(e) => setSharesGranted(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          {grantType !== 'rsu' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Strike/Exercise Price ($)</label>
              <input
                type="number"
                value={strikePrice}
                onChange={(e) => setStrikePrice(e.target.value)}
                className="input"
                min="0"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current FMV per Share ($)</label>
            <input
              type="number"
              value={currentFMV}
              onChange={(e) => setCurrentFMV(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Vested Shares</label>
            <input
              type="number"
              value={vestedShares}
              onChange={(e) => setVestedShares(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Exercise & Sale Scenario</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Exercise Date</label>
            <input
              type="month"
              value={exerciseDate}
              onChange={(e) => setExerciseDate(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Sale Price ($)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Ordinary Income ($)</label>
            <input
              type="number"
              value={ordinaryIncome}
              onChange={(e) => setOrdinaryIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Grant Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Grant Type:</span>
            <span className="font-medium ml-2">{result.grantType}</span>
          </div>
          <div>
            <span className="text-zinc-600">Shares Granted:</span>
            <span className="font-medium ml-2">{result.sharesGranted}</span>
          </div>
          <div>
            <span className="text-zinc-600">Strike Price:</span>
            <span className="font-medium ml-2">${result.strikePrice}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current FMV:</span>
            <span className="font-medium ml-2">${result.currentFMV}</span>
          </div>
          <div>
            <span className="text-zinc-600">Bargain Element:</span>
            <span className="font-medium ml-2">${result.bargainElement}/share</span>
          </div>
          <div>
            <span className="text-zinc-600">Vested Shares:</span>
            <span className="font-medium ml-2">{result.vestedShares}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Exercise Cost & Value</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Exercise Cost:</span>
            <span className="font-medium ml-2">${result.exerciseCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Vested Value:</span>
            <span className="font-medium ml-2">${result.vestedValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Bargain:</span>
            <span className="font-medium ml-2">${result.totalBargain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Profit at Sale:</span>
            <span className="font-medium ml-2">${result.totalProfit}</span>
          </div>
        </div>
      </div>

      {grantType === 'iso' && result.warningAMT && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">AMT Warning</h3>
          <div className="text-sm text-red-600">
            ISO spread of ${result.amtAdjustment} may trigger AMT. AMT income: ${result.amtIncome} exceeds exemption ${result.amtThreshold}.
          </div>
          <div className="text-sm text-red-600 mt-1">
            Potential AMT tax: ${result.potentialAmtTax}. AMT credit available for future years: ${result.amtCreditPotential}.
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Tax Implications</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Tax at Exercise:</span>
            <span className="font-medium ml-2">${result.regularTaxAtExercise}</span>
          </div>
          <div>
            <span className="text-zinc-600">Ordinary Compensation:</span>
            <span className="font-medium ml-2">${result.ordinaryCompensation}</span>
          </div>
          <div>
            <span className="text-zinc-600">Capital Gains at Sale:</span>
            <span className="font-medium ml-2">${result.saleGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">AMT Adjustment:</span>
            <span className="font-medium ml-2">${result.amtAdjustment}</span>
          </div>
        </div>
      </div>

      {grantType === 'iso' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">ISO Special Rules</h3>
          <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
            <li>No regular tax at exercise, but AMT adjustment for the bargain element.</li>
            <li>Hold shares 2+ years from grant and 1+ year from exercise for long-term treatment.</li>
            <li>$100,000 annual ISO limit based on FMV at grant (not exercisable value).</li>
            <li>AMT credit can be used in future years when regular tax exceeds AMT.</li>
            <li>Disqualifying disposition (sell before holding period) converts to NSO treatment.</li>
          </ul>
        </div>
      )}

      {grantType === 'nso' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">NSO Tax Treatment</h3>
          <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
            <li>Bargain element taxed as ordinary income at exercise (W-2 reported).</li>
            <li>No AMT implications for NSO exercise.</li>
            <li>Future appreciation taxed as capital gains when sold.</li>
            <li>No $100,000 annual limit like ISOs.</li>
            <li>Can exercise before vesting (early exercise) with 83(b) election option.</li>
          </ul>
        </div>
      )}

      {grantType === 'rsu' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">RSU Tax Treatment</h3>
          <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
            <li>Taxed as ordinary income at vesting based on FMV.</li>
            <li>No exercise cost - you receive shares for free.</li>
            <li>Section 83(b) election rarely beneficial for RSUs (no purchase price).</li>
            <li>Future appreciation taxed as capital gains when sold.</li>
            <li>Can sell immediately at vesting ("sell to cover" for taxes).</li>
          </ul>
        </div>
      )}

      {result.warning83b && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">83(b) Election Consideration</h3>
          <div className="text-xs text-yellow-600">
            For early-exercise options or restricted stock, Section 83(b) election allows paying tax on current value (often $0) instead of vested value. File within 30 days of grant.
          </div>
        </div>
      )}
    </main>
  )
}