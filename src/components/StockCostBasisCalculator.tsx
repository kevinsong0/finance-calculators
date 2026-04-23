'use client'

import { useState } from 'react'

export default function StockCostBasisCalculator() {
  const [transactions, setTransactions] = useState<string>(`[
    {"date": "2023-01-15", "type": "buy", "shares": 100, "price": 50, "commission": 5},
    {"date": "2023-06-20", "type": "buy", "shares": 50, "price": 55, "commission": 5},
    {"date": "2024-02-10", "type": "buy", "shares": 75, "price": 48, "commission": 5},
    {"date": "2024-08-01", "type": "sell", "shares": 150, "price": 60, "commission": 10}
  ]`)
  const [method, setMethod] = useState('average')
  const [currentShares, setCurrentShares] = useState('75')
  const [currentPrice, setCurrentPrice] = useState('58')

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

    // Process transactions chronologically
    const sortedTxns = [...txns].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Average Cost Method
    let avgTotalCost = 0
    let avgTotalShares = 0
    let avgCostPerShare = 0

    // FIFO (First In, First Out) - track purchase lots
    const fifoLots: Array<{ date: string; shares: number; price: number; commission: number; remaining: number }> = []

    // LIFO (Last In, First Out) - track purchase lots
    const lifoLots: Array<{ date: string; shares: number; price: number; commission: number; remaining: number }> = []

    let totalBuys = 0
    let totalSells = 0
    let realizedGainAvg = 0
    let realizedGainFifo = 0
    let realizedGainLifo = 0
    let totalCommissionsPaid = 0

    for (const txn of sortedTxns) {
      const shares = txn.shares || 0
      const price = txn.price || 0
      const commission = txn.commission || 0
      const totalAmount = shares * price + commission

      if (txn.type === 'buy') {
        totalBuys += shares
        totalCommissionsPaid += commission

        // Average: add to total
        avgTotalCost += totalAmount
        avgTotalShares += shares
        avgCostPerShare = avgTotalCost / avgTotalShares

        // FIFO: add lot
        fifoLots.push({
          date: txn.date,
          shares,
          price,
          commission,
          remaining: shares,
        })

        // LIFO: add lot
        lifoLots.push({
          date: txn.date,
          shares,
          price,
          commission,
          remaining: shares,
        })
      } else if (txn.type === 'sell') {
        totalSells += shares
        totalCommissionsPaid += commission
        const sellAmount = shares * price - commission // Net proceeds

        // Average Cost Method
        const avgCostOfSale = shares * avgCostPerShare
        const avgGain = sellAmount - avgCostOfSale
        realizedGainAvg += avgGain
        avgTotalShares -= shares
        avgTotalCost = avgTotalShares * avgCostPerShare

        // FIFO Method
        let fifoCostOfSale = 0
        let sharesToSell = shares
        const fifoUsedLots: Array<{ date: string; shares: number; price: number }> = []

        for (const lot of fifoLots) {
          if (sharesToSell <= 0) break
          if (lot.remaining > 0) {
            const sharesFromLot = Math.min(sharesToSell, lot.remaining)
            fifoCostOfSale += sharesFromLot * lot.price + (sharesFromLot === lot.remaining ? lot.commission : lot.commission * (sharesFromLot / lot.shares))
            lot.remaining -= sharesFromLot
            sharesToSell -= sharesFromLot
            fifoUsedLots.push({ date: lot.date, shares: sharesFromLot, price: lot.price })
          }
        }
        realizedGainFifo += sellAmount - fifoCostOfSale

        // LIFO Method (reverse order)
        let lifoCostOfSale = 0
        sharesToSell = shares
        const lifoUsedLots: Array<{ date: string; shares: number; price: number }> = []

        for (let i = lifoLots.length - 1; i >= 0; i--) {
          const lot = lifoLots[i]
          if (sharesToSell <= 0) break
          if (lot.remaining > 0) {
            const sharesFromLot = Math.min(sharesToSell, lot.remaining)
            lifoCostOfSale += sharesFromLot * lot.price + (sharesFromLot === lot.remaining ? lot.commission : lot.commission * (sharesFromLot / lot.shares))
            lot.remaining -= sharesFromLot
            sharesToSell -= sharesFromLot
            lifoUsedLots.push({ date: lot.date, shares: sharesFromLot, price: lot.price })
          }
        }
        realizedGainLifo += sellAmount - lifoCostOfSale
      }
    }

    // Remaining shares after all transactions
    const remainingShares = totalBuys - totalSells

    // Calculate unrealized gain on remaining position at current price
    const currPrice = parseFloat(currentPrice) || 0
    const currShares = parseFloat(currentShares) || remainingShares
    const currentValue = currShares * currPrice

    // Average unrealized
    const avgUnrealizedGain = remainingShares > 0 ? currentValue - (remainingShares * avgCostPerShare) : 0

    // FIFO unrealized
    let fifoRemainingCost = 0
    for (const lot of fifoLots) {
      if (lot.remaining > 0) {
        fifoRemainingCost += lot.remaining * lot.price + (lot.remaining === lot.shares ? lot.commission : lot.commission * (lot.remaining / lot.shares))
      }
    }
    const fifoUnrealizedGain = remainingShares > 0 ? currentValue - fifoRemainingCost : 0

    // LIFO unrealized
    let lifoRemainingCost = 0
    for (const lot of lifoLots) {
      if (lot.remaining > 0) {
        lifoRemainingCost += lot.remaining * lot.price + (lot.remaining === lot.shares ? lot.commission : lot.commission * (lot.remaining / lot.shares))
      }
    }
    const lifoUnrealizedGain = remainingShares > 0 ? currentValue - lifoRemainingCost : 0

    // Short-term vs long-term classification (12 month threshold)
    const classifyGain = (purchaseDate: string, sellDate: string) => {
      const days = (new Date(sellDate).getTime() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24)
      return days > 365 ? 'long-term' : 'short-term'
    }

    return {
      transactions: sortedTxns,
      method: method.charAt(0).toUpperCase() + method.slice(1),

      totalBuys: totalBuys.toFixed(0),
      totalSells: totalSells.toFixed(0),
      remainingShares: remainingShares.toFixed(0),
      totalCommissionsPaid: totalCommissionsPaid.toFixed(2),

      // Average Cost Method
      avgCostPerShare: avgCostPerShare.toFixed(2),
      avgRemainingCost: (avgTotalShares * avgCostPerShare).toFixed(2),
      avgRealizedGain: realizedGainAvg.toFixed(2),
      avgUnrealizedGain: avgUnrealizedGain.toFixed(2),
      avgTotalGain: (realizedGainAvg + avgUnrealizedGain).toFixed(2),

      // FIFO Method
      fifoRemainingCost: fifoRemainingCost.toFixed(2),
      fifoRealizedGain: realizedGainFifo.toFixed(2),
      fifoUnrealizedGain: fifoUnrealizedGain.toFixed(2),
      fifoTotalGain: (realizedGainFifo + fifoUnrealizedGain).toFixed(2),

      // LIFO Method
      lifoRemainingCost: lifoRemainingCost.toFixed(2),
      lifoRealizedGain: realizedGainLifo.toFixed(2),
      lifoUnrealizedGain: lifoUnrealizedGain.toFixed(2),
      lifoTotalGain: (realizedGainLifo + lifoUnrealizedGain).toFixed(2),

      // Current position
      currentShares: currShares.toFixed(0),
      currentPrice: currPrice.toFixed(2),
      currentValue: currentValue.toFixed(2),

      // Comparison
      fifoVsAvgDiff: (realizedGainFifo - realizedGainAvg).toFixed(2),
      lifoVsAvgDiff: (realizedGainLifo - realizedGainAvg).toFixed(2),
      fifoVsLifoDiff: (realizedGainFifo - realizedGainLifo).toFixed(2),

      fifoLots: fifoLots.filter(l => l.remaining > 0).map(l => ({
        date: l.date,
        shares: l.remaining.toFixed(0),
        price: l.price.toFixed(2),
        cost: (l.remaining * l.price).toFixed(2),
        holdingDays: Math.floor((new Date().getTime() - new Date(l.date).getTime()) / (1000 * 60 * 60 * 24)),
        isLongTerm: Math.floor((new Date().getTime() - new Date(l.date).getTime()) / (1000 * 60 * 60 * 24)) > 365,
      })),

      hasRemaining: remainingShares > 0,
      hasSales: totalSells > 0,
      error: null,
    }
  }

  const result = calculate()

  if (result.error) {
    return (
      <main className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Stock Cost Basis Calculator</h1>
        <p className="text-zinc-600">Calculate cost basis using Average Cost, FIFO, or LIFO methods. Compare realized/unrealized gains for tax planning.</p>
        <div className="card bg-red-50 border border-red-200">
          <div className="text-red-700">Invalid transaction data format. Use JSON array format.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stock Cost Basis Calculator</h1>
      <p className="text-zinc-600">Calculate cost basis using Average Cost, FIFO, or LIFO methods. Compare realized/unrealized gains across methods for optimal tax planning.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Transaction History</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Transactions (JSON Array)</label>
            <textarea
              value={transactions}
              onChange={(e) => setTransactions(e.target.value)}
              className="input h-40 text-xs"
              placeholder='[{"date": "YYYY-MM-DD", "type": "buy|sell", "shares": N, "price": X, "commission": Y}]'
            />
            <div className="text-xs text-zinc-500 mt-1">
              Enter buy/sell transactions with date, shares, price, and commission. Format as JSON array.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Cost Basis Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="input"
            >
              <option value="average">Average Cost (AVG)</option>
              <option value="fifo">FIFO - First In, First Out</option>
              <option value="lifo">LIFO - Last In, First Out</option>
            </select>
            <div className="text-xs text-zinc-500 mt-1">
              Average: simple, FIFO: oldest shares first, LIFO: newest shares first.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Position</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Shares Held</label>
            <input
              type="number"
              value={currentShares}
              onChange={(e) => setCurrentShares(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Market Price ($)</label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Position Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Shares Bought:</span>
            <span className="font-medium ml-2">{result.totalBuys}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Shares Sold:</span>
            <span className="font-medium ml-2">{result.totalSells}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Shares:</span>
            <span className="font-bold ml-2">{result.remainingShares}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current Value:</span>
            <span className="font-bold ml-2">${result.currentValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Commissions:</span>
            <span className="font-medium ml-2">${result.totalCommissionsPaid}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Average Cost Method</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Avg Cost Per Share:</span>
            <span className="font-bold ml-2">${result.avgCostPerShare}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining Cost Basis:</span>
            <span className="font-medium ml-2">${result.avgRemainingCost}</span>
          </div>
          {result.hasSales && (
            <>
              <div>
                <span className="text-zinc-600">Realized Gain:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.avgRealizedGain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.avgRealizedGain}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Unrealized Gain:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.avgUnrealizedGain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.avgUnrealizedGain}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Total Gain:</span>
                <span className="font-bold ml-2">${result.avgTotalGain}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {result.hasSales && (
        <>
          <div className="card bg-orange-50 border border-orange-200">
            <h3 className="font-medium mb-2 text-orange-700">FIFO Method (First In, First Out)</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-600">Remaining Cost Basis:</span>
                <span className="font-medium ml-2">${result.fifoRemainingCost}</span>
              </div>
              <div>
                <span className="text-zinc-600">Realized Gain:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.fifoRealizedGain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.fifoRealizedGain}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Unrealized Gain:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.fifoUnrealizedGain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.fifoUnrealizedGain}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Total Gain:</span>
                <span className="font-bold ml-2">${result.fifoTotalGain}</span>
              </div>
            </div>
          </div>

          <div className="card bg-purple-50 border border-purple-200">
            <h3 className="font-medium mb-2 text-purple-700">LIFO Method (Last In, First Out)</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-zinc-600">Remaining Cost Basis:</span>
                <span className="font-medium ml-2">${result.lifoRemainingCost}</span>
              </div>
              <div>
                <span className="text-zinc-600">Realized Gain:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.lifoRealizedGain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.lifoRealizedGain}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Unrealized Gain:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.lifoUnrealizedGain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.lifoUnrealizedGain}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Total Gain:</span>
                <span className="font-bold ml-2">${result.lifoTotalGain}</span>
              </div>
            </div>
          </div>

          <div className="card bg-teal-50 border border-teal-200">
            <h3 className="font-medium mb-2 text-teal-700">Method Comparison</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-zinc-600">FIFO vs Avg:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.fifoVsAvgDiff) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.fifoVsAvgDiff}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">LIFO vs Avg:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.lifoVsAvgDiff) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.lifoVsAvgDiff}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">FIFO vs LIFO:</span>
                <span className={`font-bold ml-2 ${parseFloat(result.fifoVsLifoDiff) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${result.fifoVsLifoDiff}
                </span>
              </div>
            </div>
            <div className="text-xs text-teal-600 mt-2">
              Positive = FIFO/LIFO shows higher gain. Choose method that minimizes taxable gain (or maximizes loss).
            </div>
          </div>
        </>
      )}

      {result.hasRemaining && result.fifoLots.length > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Remaining Purchase Lots (FIFO View)</h3>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Purchase Date</th>
                  <th className="text-left p-2">Shares</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Cost</th>
                  <th className="text-left p-2">Holding Days</th>
                  <th className="text-left p-2">Term</th>
                </tr>
              </thead>
              <tbody>
                {result.fifoLots.map((lot, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{lot.date}</td>
                    <td className="p-2">{lot.shares}</td>
                    <td className="p-2">${lot.price}</td>
                    <td className="p-2">${lot.cost}</td>
                    <td className="p-2">{lot.holdingDays}</td>
                    <td className={`p-2 ${lot.isLongTerm ? 'text-green-600' : 'text-orange-600'}`}>
                      {lot.isLongTerm ? 'Long-Term' : 'Short-Term'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Basis Method Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Average Cost:</strong> Simple calculation. Total cost ÷ total shares. Only allowed for mutual funds. NOT allowed for individual stocks.</li>
          <li><strong>FIFO:</strong> Default for most brokerages. Oldest shares sold first. Often results in long-term gains (lower tax rate) if holding long.</li>
          <li><strong>LIFO:</strong> Newest shares sold first. May realize short-term gains (higher tax) or current losses. Can be strategic for tax-loss harvesting.</li>
          <li><strong>Specific Identification:</strong> Choose exactly which lot to sell. Must identify shares at time of sale. Most flexible for tax optimization.</li>
          <li><strong>IRS Requirement:</strong> Method must be chosen at time of sale. Cannot change retroactively. Keep records of method used for each sale.</li>
          <li><strong>Mutual Funds:</strong> Can use average cost. Once used, must continue for that fund. Can switch to FIFO/specific ID if never used average.</li>
          <li><strong>Broker Reporting:</strong> Brokers report cost basis to IRS on 1099-B since 2011. Verify broker's method matches your records.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Strategy Tips</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Long-Term Preferred:</strong> 15-20% vs 22-37% tax. FIFO often qualifies more sales as long-term.</li>
          <li><strong>Tax-Loss Harvesting:</strong> Sell losing positions to offset gains. LIFO may show current losses while FIFO shows old gains.</li>
          <li><strong>Wash Sale Rule:</strong> Cannot repurchase same stock within 30 days. Disallowed loss adds to new cost basis.</li>
          <li><strong>Gains vs Losses:</strong> Sell gains in low-income years (0% rate possible). Sell losses in high-income years (offset at marginal rate).</li>
          <li><strong>Commission Included:</strong> Cost basis includes purchase commission. Sale proceeds reduced by sale commission.</li>
          <li><strong>Dividend Reinvestment:</strong> DRIP purchases create new lots with new cost basis. Track each DRIP purchase separately.</li>
        </ul>
      </div>
    </main>
  )
}