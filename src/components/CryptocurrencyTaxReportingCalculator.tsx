'use client'

import { useState } from 'react'

export default function CryptocurrencyTaxReportingCalculator() {
  const [cryptoTransactions, setCryptoTransactions] = useState([
    { name: 'Bitcoin', purchaseDate: '2023-01-15', purchasePrice: 25000, quantity: 0.5, saleDate: '2024-03-20', salePrice: 60000, saleQuantity: 0.5 },
    { name: 'Ethereum', purchaseDate: '2023-06-01', purchasePrice: 2000, quantity: 5, saleDate: '2024-01-15', salePrice: 1800, saleQuantity: 3 },
  ])
  const [cryptoIncome, setCryptoIncome] = useState(0)
  const [miningIncome, setMiningIncome] = useState(0)
  const [stakingRewards, setStakingRewards] = useState(0)
  const [otherIncome, setOtherIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    let totalProceeds = 0
    let totalCostBasis = 0
    let totalGainLoss = 0
    let shortTermGain = 0
    let longTermGain = 0

    const processedTransactions = cryptoTransactions.map(t => {
      const proceeds = t.salePrice * t.saleQuantity
      const costBasis = (t.purchasePrice / t.quantity) * t.saleQuantity
      const gainLoss = proceeds - costBasis
      const purchaseDate = new Date(t.purchaseDate)
      const saleDate = new Date(t.saleDate)
      const holdingDays = Math.floor((saleDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))
      const isLongTerm = holdingDays > 365

      totalProceeds += proceeds
      totalCostBasis += costBasis
      totalGainLoss += gainLoss
      if (gainLoss > 0) {
        if (isLongTerm) longTermGain += gainLoss
        else shortTermGain += gainLoss
      }

      return {
        ...t,
        proceeds: proceeds.toFixed(2),
        costBasis: costBasis.toFixed(2),
        gainLoss: gainLoss.toFixed(2),
        holdingDays,
        isLongTerm,
        termType: isLongTerm ? 'Long-Term' : 'Short-Term',
      }
    })

    const totalCryptoIncome = cryptoIncome + miningIncome + stakingRewards
    const taxableIncome = otherIncome + totalCryptoIncome + totalGainLoss

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

    const shortTermTax = shortTermGain * ordinaryRate
    const longTermTax = longTermGain * longTermRate
    const incomeTax = totalCryptoIncome * ordinaryRate
    const totalTax = shortTermTax + longTermTax + incomeTax

    return {
      transactions: processedTransactions,
      totalProceeds: totalProceeds.toFixed(2),
      totalCostBasis: totalCostBasis.toFixed(2),
      totalGainLoss: totalGainLoss.toFixed(2),
      shortTermGain: shortTermGain.toFixed(2),
      longTermGain: longTermGain.toFixed(2),
      cryptoIncome: cryptoIncome.toFixed(2),
      miningIncome: miningIncome.toFixed(2),
      stakingRewards: stakingRewards.toFixed(2),
      totalCryptoIncome: totalCryptoIncome.toFixed(2),
      shortTermRate: (ordinaryRate * 100).toFixed(0),
      longTermRate: (longTermRate * 100).toFixed(0),
      ordinaryRate: (ordinaryRate * 100).toFixed(0),
      shortTermTax: shortTermTax.toFixed(2),
      longTermTax: longTermTax.toFixed(2),
      incomeTax: incomeTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cryptocurrency Tax Reporting Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate cryptocurrency capital gains and income tax for IRS reporting.</p>

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
        <h2 className="text-lg font-semibold mb-3">Crypto Income (Ordinary Income)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Crypto Payments/Airdrops ($)</label>
            <input
              type="number"
              value={cryptoIncome}
              onChange={(e) => setCryptoIncome(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Mining Income (FMV at receipt) ($)</label>
            <input
              type="number"
              value={miningIncome}
              onChange={(e) => setMiningIncome(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Staking Rewards ($)</label>
            <input
              type="number"
              value={stakingRewards}
              onChange={(e) => setStakingRewards(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-zinc-600">Total Crypto Income:</span>
          <span className="font-bold ml-2">$ {result.totalCryptoIncome}</span>
          <span className="text-xs text-zinc-500 ml-2">Taxed at {result.ordinaryRate}% ordinary rate</span>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Capital Gains/Losses</h2>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Crypto</th>
                <th className="text-left py-1">Term</th>
                <th className="text-right py-1">Days Held</th>
                <th className="text-right py-1">Proceeds</th>
                <th className="text-right py-1">Cost</th>
                <th className="text-right py-1">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {result.transactions.map((t, i) => (
                <tr key={i} className="border-b border-green-100">
                  <td className="py-1">{t.name}</td>
                  <td className="py-1">{t.termType}</td>
                  <td className="text-right">{t.holdingDays}</td>
                  <td className="text-right">$ {t.proceeds}</td>
                  <td className="text-right">$ {t.costBasis}</td>
                  <td className="text-right font-medium">
                    <span className={parseFloat(t.gainLoss) >= 0 ? 'text-green-600' : 'text-red-600'}>
                      $ {t.gainLoss}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Short-Term Gain:</span>
            <span className="font-medium ml-2">$ {result.shortTermGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Long-Term Gain:</span>
            <span className="font-medium ml-2">$ {result.longTermGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Gain/Loss:</span>
            <span className="font-bold ml-2">$ {result.totalGainLoss}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Short-Term Tax ({result.shortTermRate}%):</span>
            <span className="font-medium ml-2">$ {result.shortTermTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Long-Term Tax ({result.longTermRate}%):</span>
            <span className="font-medium ml-2">$ {result.longTermTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Income Tax ({result.ordinaryRate}%):</span>
            <span className="font-medium ml-2">$ {result.incomeTax}</span>
          </div>
          <div className="col-span-3">
            <span className="text-zinc-600 font-medium">Total Crypto Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Crypto Tax Reporting Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Crypto is property, not currency - every sale/trade is taxable event</li>
          <li>Held over 1 year: long-term capital gains rates (0%, 15%, 20%)</li>
          <li>Held less than 1 year: short-term ordinary income rates</li>
          <li>Mining/staking: ordinary income at fair market value when received</li>
          <li>Airdrops/payments: ordinary income when you have dominion/control</li>
          <li>Form 8949 for capital gains, Schedule 1 for mining/staking income</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">IRS Reporting Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Form 8949: Report each crypto sale/trade transaction</li>
          <li>Schedule D: Summarize capital gains/losses from Form 8949</li>
          <li>Schedule 1 (Line 8z): Report mining/staking/airdrop income</li>
          <li>Schedule C: If mining is business activity (self-employment tax applies)</li>
          <li>Keep records: purchase date, price, sale date, proceeds, wallets used</li>
          <li>Question on Form 1040: "Did you receive, sell, exchange virtual currency?"</li>
        </ul>
      </div>
    </div>
  )
}