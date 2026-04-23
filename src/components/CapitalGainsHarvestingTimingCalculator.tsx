'use client'

import { useState } from 'react'

export default function CapitalGainsHarvestingTimingCalculator() {
  const [currentGain, setCurrentGain] = useState(50000)
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(10)
  const [expectedGain, setExpectedGain] = useState(10000)
  const [expectedGainMonths, setExpectedGainMonths] = useState(2)
  const [ordinaryIncome, setOrdinaryIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [stateRate, setStateRate] = useState(5)

  const calculate = () => {
    const holdingPeriodDays = holdingPeriodMonths * 30
    const totalHoldingDays = holdingPeriodDays + expectedGainMonths * 30

    // Determine if short-term or long-term
    const isLongTerm = holdingPeriodDays >= 365 // 1 year
    const wouldBeLongTerm = totalHoldingDays >= 365

    // Federal capital gains rates
    const stCapitalGainsRate = getMarginalRate(ordinaryIncome + currentGain, filingStatus)
    const ltCapitalGainsRate = getLTCGRate(ordinaryIncome, filingStatus)

    // Calculate taxes for each scenario
    // Scenario 1: Sell now (short-term if < 1 year)
    const sellNowFederalTax = currentGain * (isLongTerm ? ltCapitalGainsRate : stCapitalGainsRate)
    const sellNowStateTax = currentGain * (stateRate / 100)
    const sellNowTotalTax = sellNowFederalTax + sellNowStateTax

    // Scenario 2: Wait for long-term (if close to 1 year)
    const daysToLT = Math.max(0, 365 - holdingPeriodDays)
    const canWaitForLT = daysToLT <= expectedGainMonths * 30 && expectedGainMonths > 0

    const totalGainIfWait = currentGain + expectedGain
    const waitLTFederalTax = totalGainIfWait * ltCapitalGainsRate
    const waitLTStateTax = totalGainIfWait * (stateRate / 100)
    const waitLTTotalTax = waitLTFederalTax + waitLTStateTax

    // Scenario 3: Sell part now, wait for rest
    const partialSellFederalTax = currentGain * (isLongTerm ? ltCapitalGainsRate : stCapitalGainsRate)
    const partialWaitFederalTax = expectedGain * ltCapitalGainsRate
    const partialTotalTax = partialSellFederalTax + partialWaitFederalTax +
      (currentGain + expectedGain) * (stateRate / 100)

    // Opportunity cost of waiting
    const annualOpportunityRate = 5 // Investment return if sold and reinvested
    const daysWaited = daysToLT
    const opportunityCost = (sellNowTotalTax * annualOpportunityRate / 365 * daysWaited)

    // Recommendation
    let recommendation = ''
    let bestScenario = ''
    let savings = 0

    if (isLongTerm) {
      recommendation = 'Already long-term: sell now to lock in LTCG rates. No tax benefit from waiting.'
      bestScenario = 'Sell Now'
      savings = 0
    } else if (canWaitForLT) {
      const taxSavingsFromWait = sellNowTotalTax - (waitLTTotalTax - expectedGain * ltCapitalGainsRate)
      if (taxSavingsFromWait > opportunityCost) {
        recommendation = 'WAIT: ' + daysToLT + ' days to reach long-term. Tax savings exceeds opportunity cost.'
        bestScenario = 'Wait for LT'
        savings = taxSavingsFromWait - opportunityCost
      } else {
        recommendation = 'SELL NOW: Opportunity cost of waiting exceeds tax savings.'
        bestScenario = 'Sell Now'
        savings = 0
      }
    } else {
      recommendation = 'Too far from 1-year mark. Sell now and reinvest proceeds.'
      bestScenario = 'Sell Now'
      savings = 0
    }

    return {
      currentGain: currentGain.toFixed(0),
      holdingPeriodMonths: holdingPeriodMonths.toFixed(0),
      holdingPeriodDays: holdingPeriodDays.toFixed(0),
      isLongTerm,
      daysToLT: daysToLT.toFixed(0),
      expectedGain: expectedGain.toFixed(0),
      expectedGainMonths: expectedGainMonths.toFixed(0),
      totalGainIfWait: totalGainIfWait.toFixed(0),
      stCapitalGainsRate: (stCapitalGainsRate * 100).toFixed(1),
      ltCapitalGainsRate: (ltCapitalGainsRate * 100).toFixed(1),
      sellNowFederalTax: sellNowFederalTax.toFixed(0),
      sellNowStateTax: sellNowStateTax.toFixed(0),
      sellNowTotalTax: sellNowTotalTax.toFixed(0),
      waitLTFederalTax: waitLTFederalTax.toFixed(0),
      waitLTStateTax: waitLTStateTax.toFixed(0),
      waitLTTotalTax: waitLTTotalTax.toFixed(0),
      partialTotalTax: partialTotalTax.toFixed(0),
      daysWaited: daysWaited.toFixed(0),
      opportunityCost: opportunityCost.toFixed(0),
      canWaitForLT,
      recommendation,
      bestScenario,
      savings: savings.toFixed(0),
      filingStatus,
      stateRate: stateRate.toFixed(1),
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

  const getLTCGRate = (income: number, status: 'single' | 'married'): number => {
    const bracketsSingle = [47025, 518900]
    const bracketsMarried = [94050, 583750]
    const rates = [0, 0.15, 0.20]
    const brackets = status === 'single' ? bracketsSingle : bracketsMarried
    if (income <= brackets[0]) return rates[0]
    if (income <= brackets[1]) return rates[1]
    return rates[2]
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Capital Gains Harvesting Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Determine optimal timing to sell investments for tax efficiency.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Gain ($)</label>
          <input type="number" value={currentGain} onChange={(e) => setCurrentGain(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Holding Period (months)</label>
          <input type="number" value={holdingPeriodMonths} min="0" max="60" onChange={(e) => setHoldingPeriodMonths(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Additional Gain ($)</label>
          <input type="number" value={expectedGain} onChange={(e) => setExpectedGain(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Gain Timeline (months)</label>
          <input type="number" value={expectedGainMonths} min="0" max="12" onChange={(e) => setExpectedGainMonths(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateRate} step="0.5" onChange={(e) => setStateRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Holding Period Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Current Gain:</span><span className="font-medium ml-2">$ {result.currentGain}</span></div>
          <div><span className="text-zinc-600">Holding Days:</span><span className="font-medium ml-2">{result.holdingPeriodDays}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.isLongTerm ? 'text-green-700' : 'text-orange-700'}`}>{result.isLongTerm ? 'LONG-TERM (LTCG)' : 'SHORT-TERM (STCG)'}</span></div>
          {!result.isLongTerm && (
            <div><span className="text-zinc-600">Days to Long-Term:</span><span className="font-bold text-blue-700 ml-2">{result.daysToLT}</span></div>
          )}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Rate Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Short-Term Rate:</span><span className="font-bold text-red-700 ml-2">{result.stCapitalGainsRate}%</span></div>
          <div><span className="text-zinc-600">Long-Term Rate:</span><span className="font-bold text-green-700 ml-2">{result.ltCapitalGainsRate}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">STCG taxed at ordinary income rates. LTCG: 0%, 15%, or 20% based on income.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Sell Now Scenario</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-bold ml-2">$ {result.sellNowFederalTax}</span></div>
          <div><span className="text-zinc-600">State Tax:</span><span className="font-medium ml-2">$ {result.sellNowStateTax}</span></div>
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.sellNowTotalTax}</span></div>
        </div>
      </div>

      {!result.isLongTerm && result.canWaitForLT && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Wait for Long-Term Scenario</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Total Gain:</span><span className="font-medium ml-2">$ {result.totalGainIfWait}</span></div>
            <div><span className="text-zinc-600">Federal Tax:</span><span className="font-bold ml-2">$ {result.waitLTFederalTax}</span></div>
            <div><span className="text-zinc-600">State Tax:</span><span className="font-medium ml-2">$ {result.waitLTStateTax}</span></div>
            <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold ml-2">$ {result.waitLTTotalTax}</span></div>
            <div><span className="text-zinc-600">Opportunity Cost:</span><span className="font-medium ml-2">$ {result.opportunityCost}</span></div>
          </div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-teal-700">Recommendation</h2>
        <div className="text-sm font-medium mb-2">{result.recommendation}</div>
        {Number(result.savings) > 0 && (
          <div className="text-sm"><span className="text-zinc-600">Net Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.savings}</span></div>
        )}
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Capital Gains Timing Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Hold over 1 year for long-term rates (0%, 15%, or 20% vs up to 37%)</li>
          <li>Consider opportunity cost: waiting delays reinvestment</li>
          <li>Year-end timing: sell losers to offset gains</li>
          <li>Wash sale rule: 30-day waiting period for repurchase</li>
          <li>State taxes apply to both STCG and LTCG</li>
          <li>NIIT: 3.8% surtax on investment income over threshold</li>
        </ul>
      </div>
    </div>
  )
}