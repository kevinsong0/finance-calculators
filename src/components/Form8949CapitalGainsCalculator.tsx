'use client'

import { useState } from 'react'

export default function Form8949CapitalGainsCalculator() {
  const [transactions, setTransactions] = useState([
    { description: 'Stock A', purchaseDate: '2023-01-15', saleDate: '2024-03-20', proceeds: 10000, costBasis: 8000, heldTerm: 'long' },
    { description: 'Stock B', purchaseDate: '2023-08-01', saleDate: '2023-12-15', proceeds: 5000, costBasis: 6000, heldTerm: 'short' },
    { description: 'ETF C', purchaseDate: '2022-06-10', saleDate: '2024-04-01', proceeds: 15000, costBasis: 12000, heldTerm: 'long' },
  ])
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [otherIncome, setOtherIncome] = useState(100000)

  const calculate = () => {
    let totalShortProceeds = 0
    let totalShortCost = 0
    let totalShortGain = 0
    let totalLongProceeds = 0
    let totalLongCost = 0
    let totalLongGain = 0

    const processedTransactions = transactions.map(t => {
      const gain = t.proceeds - t.costBasis
      const isGain = gain > 0
      if (t.heldTerm === 'short') {
        totalShortProceeds += t.proceeds
        totalShortCost += t.costBasis
        if (isGain) totalShortGain += gain
      } else {
        totalLongProceeds += t.proceeds
        totalLongCost += t.costBasis
        if (isGain) totalLongGain += gain
      }
      return {
        ...t,
        gain: gain.toFixed(2),
        isGain,
        term: t.heldTerm === 'short' ? 'Short-Term (<1 yr)' : 'Long-Term (>1 yr)',
      }
    })

    const shortLosses = Math.max(0, totalShortCost - totalShortProceeds)
    const longLosses = Math.max(0, totalLongCost - totalLongProceeds)
    const netShortGain = Math.max(0, totalShortProceeds - totalShortCost)
    const netLongGain = Math.max(0, totalLongProceeds - totalLongCost)

    const netCapitalGain = (totalShortProceeds - totalShortCost) + (totalLongProceeds - totalLongCost)
    const capitalLossUsed = netCapitalGain < 0 ? Math.min(Math.abs(netCapitalGain), 3000) : 0
    const lossCarryover = netCapitalGain < 0 ? Math.abs(netCapitalGain) - capitalLossUsed : 0

    const taxableIncome = otherIncome + netCapitalGain - capitalLossUsed
    let longTermRate = 0
    if (filingStatus === 'single') {
      if (taxableIncome <= 44625) longTermRate = 0
      else if (taxableIncome <= 492150) longTermRate = 0.15
      else longTermRate = 0.20
    } else {
      if (taxableIncome <= 89250) longTermRate = 0
      else if (taxableIncome <= 553850) longTermRate = 0.15
      else longTermRate = 0.20
    }

    let ordinaryRate = 0.22
    if (filingStatus === 'single') {
      if (otherIncome <= 11000) ordinaryRate = 0.10
      else if (otherIncome <= 44725) ordinaryRate = 0.12
      else if (otherIncome <= 95475) ordinaryRate = 0.22
      else if (otherIncome <= 182100) ordinaryRate = 0.24
      else ordinaryRate = 0.32
    } else {
      if (otherIncome <= 22000) ordinaryRate = 0.10
      else if (otherIncome <= 89450) ordinaryRate = 0.12
      else if (otherIncome <= 190750) ordinaryRate = 0.22
      else if (otherIncome <= 364200) ordinaryRate = 0.24
      else ordinaryRate = 0.32
    }

    const shortTermTax = netShortGain * ordinaryRate
    const longTermTax = Math.max(0, netLongGain - shortLosses) * longTermRate
    const totalCapGainsTax = shortTermTax + longTermTax

    return {
      transactions: processedTransactions,
      totalShortProceeds: totalShortProceeds.toFixed(2),
      totalShortCost: totalShortCost.toFixed(2),
      netShortGain: netShortGain.toFixed(2),
      shortLosses: shortLosses.toFixed(2),
      totalLongProceeds: totalLongProceeds.toFixed(2),
      totalLongCost: totalLongCost.toFixed(2),
      netLongGain: netLongGain.toFixed(2),
      longLosses: longLosses.toFixed(2),
      netCapitalGain: netCapitalGain.toFixed(2),
      capitalLossUsed: capitalLossUsed.toFixed(2),
      lossCarryover: lossCarryover.toFixed(2),
      shortTermRate: (ordinaryRate * 100).toFixed(0),
      longTermRate: (longTermRate * 100).toFixed(0),
      shortTermTax: shortTermTax.toFixed(2),
      longTermTax: longTermTax.toFixed(2),
      totalCapGainsTax: totalCapGainsTax.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Form 8949 Capital Gains Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate capital gains/losses for Form 8949 Schedule D reporting.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Other Ordinary Income ($)</label>
          <input
            type="number"
            value={otherIncome}
            onChange={(e) => setOtherIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Transactions Summary</h2>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Description</th>
                <th className="text-left py-1">Term</th>
                <th className="text-right py-1">Proceeds</th>
                <th className="text-right py-1">Cost</th>
                <th className="text-right py-1">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {result.transactions.map((t, i) => (
                <tr key={i} className="border-b border-blue-100">
                  <td className="py-1">{t.description}</td>
                  <td className="py-1">{t.term}</td>
                  <td className="text-right">$ {t.proceeds.toFixed(2)}</td>
                  <td className="text-right">$ {t.costBasis.toFixed(2)}</td>
                  <td className="text-right font-medium">
                    <span className={t.isGain ? 'text-green-600' : 'text-red-600'}>
                      $ {t.gain}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Short-Term Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Proceeds:</span>
            <span className="font-medium ml-2">$ {result.totalShortProceeds}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Cost:</span>
            <span className="font-medium ml-2">$ {result.totalShortCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Gain:</span>
            <span className="font-medium ml-2">$ {result.netShortGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Rate:</span>
            <span className="font-medium ml-2">{result.shortTermRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax:</span>
            <span className="font-medium ml-2 text-red-600">$ {result.shortTermTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Long-Term Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Proceeds:</span>
            <span className="font-medium ml-2">$ {result.totalLongProceeds}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Cost:</span>
            <span className="font-medium ml-2">$ {result.totalLongCost}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Gain:</span>
            <span className="font-medium ml-2">$ {result.netLongGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Rate:</span>
            <span className="font-medium ml-2">{result.longTermRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax:</span>
            <span className="font-medium ml-2 text-red-600">$ {result.longTermTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Schedule D Totals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Net Capital Gain:</span>
            <span className="font-medium ml-2">$ {result.netCapitalGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Loss Used Against Income:</span>
            <span className="font-medium ml-2">$ {result.capitalLossUsed}</span>
          </div>
          <div>
            <span className="text-zinc-600">Loss Carryover:</span>
            <span className="font-medium ml-2">$ {result.lossCarryover}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Capital Gains Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalCapGainsTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Form 8949 Reporting</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Short-term transactions (held less than 1 year): Part I of Form 8949</li>
          <li>Long-term transactions (held more than 1 year): Part II of Form 8949</li>
          <li>Report each transaction: description, dates, proceeds, cost basis, gain/loss</li>
          <li>Totals flow to Schedule D, then to Form 1040 line 7</li>
          <li>Brokerage 1099-B may report some transactions directly on Schedule D</li>
        </ul>
      </div>
    </div>
  )
}