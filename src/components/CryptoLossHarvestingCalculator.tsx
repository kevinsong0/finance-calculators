'use client'

import { useState } from 'react'

export default function CryptoLossHarvestingCalculator() {
  const [transactions, setTransactions] = useState<string>(`[
    {"coin": "BTC", "purchasePrice": 50000, "currentPrice": 40000, "shares": 1, "purchaseDate": "2024-01-01"},
    {"coin": "ETH", "purchasePrice": 3000, "currentPrice": 2500, "shares": 10, "purchaseDate": "2024-02-01"},
    {"coin": "SOL", "purchasePrice": 100, "currentPrice": 80, "shares": 50, "purchaseDate": "2024-03-01"}
  ]`)
  const [taxRate, setTaxRate] = useState<string>('35')
  const [reinvestDays, setReinvestDays] = useState<string>('31')

  const parseTransactions = () => {
    try {
      return JSON.parse(transactions)
    } catch {
      return []
    }
  }

  const calculate = () => {
    const txns = parseTransactions()
    if (txns.length === 0) return { error: 'Invalid transaction data' }

    const rate = parseFloat(taxRate) / 100 || 0.35
    const days = parseInt(reinvestDays) || 31

    let totalLoss = 0
    let totalTaxSavings = 0
    const harvestCandidates: Array<{
      coin: string;
      purchasePrice: number;
      currentPrice: number;
      shares: number;
      loss: number;
      taxSavings: number;
      purchaseDate: string;
      holdingDays: number;
      isShortTerm: boolean;
      recommendedAction: string;
      replacementCoin: string;
    }> = []

    const today = new Date()

    for (const txn of txns) {
      const loss = (txn.purchasePrice - txn.currentPrice) * txn.shares
      if (loss > 0) {
        const taxSavings = loss * rate
        const purchaseDate = new Date(txn.purchaseDate)
        const holdingDays = Math.floor((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))
        const isShortTerm = holdingDays < 365

        // Replacement coin suggestions (similar but not identical)
        const replacements: Record<string, string> = {
          'BTC': 'ETH or diverse crypto index',
          'ETH': 'BTC or other L1 tokens',
          'SOL': 'ETH or other L1 tokens',
          'ADA': 'ETH or other smart contract platforms',
          'DOT': 'ETH or interoperability protocols',
          'AVAX': 'ETH or other L1 tokens',
          'MATIC': 'ETH or other L2 solutions',
          'LINK': 'Other DeFi infrastructure tokens',
        }

        const replacementCoin = replacements[txn.coin] || 'Different crypto asset (not identical)'

        // Recommendation based on holding period and loss size
        let recommendation = 'Harvest loss'
        if (loss < 100) {
          recommendation = 'Small loss - may not be worth transaction fees'
        } else if (isShortTerm && loss > 5000) {
          recommendation = 'HIGH VALUE - Short-term loss harvest for ordinary income offset'
        } else if (!isShortTerm && loss > 5000) {
          recommendation = 'HIGH VALUE - Long-term loss harvest for capital gains offset'
        }

        harvestCandidates.push({
          coin: txn.coin,
          purchasePrice: txn.purchasePrice,
          currentPrice: txn.currentPrice,
          shares: txn.shares,
          loss,
          taxSavings,
          purchaseDate: txn.purchaseDate,
          holdingDays,
          isShortTerm,
          recommendedAction: recommendation,
          replacementCoin,
        })

        totalLoss += loss
        totalTaxSavings += taxSavings
      }
    }

    // Sort by tax savings (highest first)
    harvestCandidates.sort((a, b) => b.taxSavings - a.taxSavings)

    // Calculate annual $3K ordinary income offset
    const ordinaryIncomeOffset = Math.min(3000, totalLoss)
    const ordinaryIncomeTaxSavings = ordinaryIncomeOffset * rate
    const remainingLossCarryover = totalLoss - ordinaryIncomeOffset

    return {
      transactions: txns,
      harvestCandidates,
      totalLoss: totalLoss.toFixed(2),
      totalTaxSavings: totalTaxSavings.toFixed(2),
      ordinaryIncomeOffset: ordinaryIncomeOffset.toFixed(2),
      ordinaryIncomeTaxSavings: ordinaryIncomeTaxSavings.toFixed(2),
      remainingLossCarryover: remainingLossCarryover.toFixed(2),
      taxRate: rate * 100,
      reinvestDays: days,
      hasHarvestableLosses: harvestCandidates.length > 0,
      error: null,
    }
  }

  const result = calculate()

  if (result.error) {
    return (
      <main className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Crypto Loss Harvesting Calculator</h1>
        <div className="card bg-red-50 border border-red-200">
          <div className="text-red-700">Invalid transaction data format. Use JSON array format.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Crypto Loss Harvesting Calculator</h1>
      <p className="text-zinc-600">Calculate crypto tax-loss harvesting opportunities, tax savings, and replacement strategies. Avoid wash sale rules while maximizing tax benefits from crypto losses.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Crypto Portfolio</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Crypto Holdings (JSON Array)</label>
            <textarea
              value={transactions}
              onChange={(e) => setTransactions(e.target.value)}
              className="input h-40 text-xs"
              placeholder='[{"coin": "BTC", "purchasePrice": X, "currentPrice": Y, "shares": N, "purchaseDate": "YYYY-MM-DD"}]'
            />
            <div className="text-xs text-zinc-500 mt-1">
              Enter crypto holdings with unrealized losses. Include coin name, purchase price, current price, shares, and purchase date.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Reinvest Wait Days</label>
              <input
                type="number"
                value={reinvestDays}
                onChange={(e) => setReinvestDays(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Crypto Wash Sale Warning</h3>
        <div className="text-sm text-red-600">
          IRS wash sale rules apply to crypto! Sell crypto at loss and buy same coin within 30 days = wash sale. Loss disallowed, added to new purchase basis. Wait {result.reinvestDays} days before repurchasing same coin.
        </div>
        <div className="text-xs text-red-500 mt-2">
          Unlike stocks, crypto exchanges don't track wash sales. YOU must self-report across all exchanges and wallets.
        </div>
      </div>

      {result.hasHarvestableLosses && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Harvestable Losses</h3>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Coin</th>
                  <th className="text-left p-2">Loss</th>
                  <th className="text-left p-2">Tax Savings</th>
                  <th className="text-left p-2">Holding Days</th>
                  <th className="text-left p-2">Term</th>
                  <th className="text-left p-2">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {result.harvestCandidates?.map((h, i) => (
                  <tr key={i} className={`border-b ${h.loss > 5000 ? 'bg-yellow-50' : ''}`}>
                    <td className="p-2 font-medium">{h.coin}</td>
                    <td className="p-2 text-red-600">${h.loss.toFixed(2)}</td>
                    <td className="p-2 text-green-600 font-bold">${h.taxSavings.toFixed(2)}</td>
                    <td className="p-2">{h.holdingDays}</td>
                    <td className={`p-2 ${h.isShortTerm ? 'text-orange-600' : 'text-blue-600'}`}>
                      {h.isShortTerm ? 'Short' : 'Long'}
                    </td>
                    <td className="p-2 text-xs">{h.recommendedAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result.hasHarvestableLosses && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Total Tax Benefit</h3>
          <div className="text-2xl font-bold text-green-800">${result.totalTaxSavings}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Total Unrealized Loss:</span>
              <span className="font-bold ml-2 text-red-700">${result.totalLoss}</span>
            </div>
            <div>
              <span className="text-zinc-600">Tax Rate Applied:</span>
              <span className="font-medium ml-2">{result.taxRate}%</span>
            </div>
          </div>
        </div>
      )}

      {result.hasHarvestableLosses && (
        <div className="card bg-purple-50 border border-purple-200">
          <h3 className="font-medium mb-2 text-purple-700">Annual $3K Ordinary Income Offset</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Ordinary Income Offset:</span>
              <span className="font-bold ml-2">${result.ordinaryIncomeOffset}</span>
            </div>
            <div>
              <span className="text-zinc-600">Tax Savings:</span>
              <span className="font-bold ml-2 text-green-700">${result.ordinaryIncomeTaxSavings}</span>
            </div>
            <div>
              <span className="text-zinc-600">Loss Carryover:</span>
              <span className="font-medium ml-2">${result.remainingLossCarryover}</span>
            </div>
          </div>
          <div className="text-xs text-purple-600 mt-2">
            Capital losses offset capital gains first. Up to $3K excess offsets ordinary income annually. Remaining losses carry forward indefinitely.
          </div>
        </div>
      )}

      {result.hasHarvestableLosses && (
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">Replacement Strategies</h3>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Sell Coin</th>
                  <th className="text-left p-2">Replacement</th>
                  <th className="text-left p-2">Why Safe</th>
                </tr>
              </thead>
              <tbody>
                {result.harvestCandidates?.slice(0, 5).map((h, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 font-medium">{h.coin}</td>
                    <td className="p-2">{h.replacementCoin}</td>
                    <td className="p-2 text-xs text-zinc-600">Different asset class, not substantially identical</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-orange-600 mt-2">
            Wait {result.reinvestDays} days before repurchasing SAME coin. OR buy different coin immediately to maintain market exposure.
          </div>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Crypto Wash Sale Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>30-Day Window:</strong> Buy same crypto within 30 days before or after loss sale = wash sale.</li>
          <li><strong>Same Coin:</strong> BTC = BTC, ETH = ETH. Same ticker = substantially identical.</li>
          <li><strong>Across All Wallets:</strong> Wash sale applies across ALL accounts - exchanges, cold storage, DeFi wallets.</li>
          <li><strong>Self-Reporting:</strong> Crypto exchanges don't track wash sales. You must track across all platforms.</li>
          <li><strong>No 1099-B Help:</strong> Most exchanges don't provide 1099-B with wash sale adjustments for crypto.</li>
          <li><strong>IRS Enforcement:</strong> IRS increasingly enforcing wash sale rules on crypto transactions.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crypto Loss Harvesting Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Year-End Harvesting:</strong> December is prime time. Harvest losses before year-end to offset gains.</li>
          <li><strong>Short-Term Preference:</strong> Short-term losses offset short-term gains first (higher tax rate). Prioritize recent purchases.</li>
          <li><strong>Replacement Coins:</strong> Sell BTC, buy ETH. Maintain crypto exposure while harvesting loss.</li>
          <li><strong>Wait 31 Days:</strong> If want same coin back, wait 31+ days. No wash sale after 30-day window.</li>
          <li><strong>Multiple Exchanges:</strong> Track holdings across ALL exchanges. Wash sale applies across platforms.</li>
          <li><strong>DeFi Positions:</strong> DeFi tokens count too. Track liquidity pool positions, staking rewards.</li>
          <li><strong>NFT Losses:</strong> NFT losses can be harvested too. But collectibles tax rate may apply.</li>
          <li><strong>Gas Fees:</strong> Transaction costs (gas fees) add to cost basis. Include in calculations.</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Crypto Wash Sale Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Same Coin Immediately:</strong> Sell BTC at loss, buy BTC same day = wash sale. Loss disallowed.</li>
          <li><strong>Across Exchanges:</strong> Sell on Binance, buy on Coinbase within 30 days = wash sale. IRS tracks by asset, not exchange.</li>
          <li><strong>Forget DeFi:</strong> Sell on exchange, buy via DeFi protocol within 30 days = wash sale.</li>
          <li><strong>Staking Rewards:</strong> Staking reward within 30 days of loss sale may trigger partial wash sale.</li>
          <li><strong>Not Tracking:</strong> Many crypto investors don't track wash sales. IRS audit risk increasing.</li>
          <li><strong>Assume No Rules:</strong> Some think wash sale doesn't apply to crypto. WRONG - IRS says it does.</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Crypto Tax Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Specific Identification:</strong> Choose which coins to sell. Track purchase lots, select highest-cost coins to harvest largest losses.</li>
          <li><strong>Cost Basis Method:</strong> FIFO default but specific ID often better for tax-loss harvesting.</li>
          <li><strong>Record Everything:</strong> Keep all purchase records, timestamps, transaction IDs, gas fees. IRS requires documentation.</li>
          <li><strong>Exchange Statements:</strong> Download exchange statements. Some provide cost basis tracking.</li>
          <li><strong>Use Software:</strong> Crypto tax software (Koinly, CoinTracker) helps track across exchanges.</li>
          <li><strong>Annual Limit:</strong> Max $3K ordinary income offset per year. Carry forward unused losses.</li>
        </ul>
      </div>
    </main>
  )
}