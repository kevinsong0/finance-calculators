'use client'

import { useState } from 'react'

export default function WashSaleCalculator() {
  const [transactions, setTransactions] = useState<string>(`[
    {"date": "2024-01-15", "type": "sell", "shares": 100, "purchasePrice": 55, "sellPrice": 45, "loss": 1000},
    {"date": "2024-01-25", "type": "buy", "shares": 100, "price": 46}
  ]`)
  const [analysisType, setAnalysisType] = useState('single')

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

    // Sort by date
    const sorted = [...txns].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Find wash sales (sell at loss, then buy same stock within 30 days before or after)
    const washSales: Array<{
      sellDate: string;
      buyDate: string;
      daysBetween: number;
      originalLoss: string;
      disallowedLoss: string;
      allowedLoss: string;
      adjustedCostBasis: string;
      originalPurchasePrice: string;
      newPurchasePrice: string;
      isWashSale: boolean;
    }> = []

    let totalDisallowedLoss = 0
    let totalAllowedLoss = 0
    let totalAdjustedCostBasis = 0

    // Find sell transactions with losses
    const sellTxns = sorted.filter(t => t.type === 'sell' && (t.loss > 0 || (t.purchasePrice > t.sellPrice)))

    // Find buy transactions
    const buyTxns = sorted.filter(t => t.type === 'buy')

    for (const sell of sellTxns) {
      const sellDate = new Date(sell.date)
      const originalLoss = sell.loss || ((sell.purchasePrice - sell.sellPrice) * sell.shares)

      if (originalLoss <= 0) continue

      // Check for buys within 61-day window (30 days before + 30 days after + day of sale)
      for (const buy of buyTxns) {
        const buyDate = new Date(buy.date)
        const daysDiff = Math.floor((buyDate.getTime() - sellDate.getTime()) / (1000 * 60 * 60 * 24))

        // Wash sale window: -30 to +30 days (buy within 30 days before or after)
        if (daysDiff >= -30 && daysDiff <= 30) {
          const isWashSale = true
          const disallowedLoss = originalLoss // Full loss disallowed for same shares
          const allowedLoss = 0
          const adjustedCostBasis = buy.price * buy.shares + disallowedLoss

          washSales.push({
            sellDate: sell.date,
            buyDate: buy.date,
            daysBetween: daysDiff,
            originalLoss: originalLoss.toFixed(2),
            disallowedLoss: disallowedLoss.toFixed(2),
            allowedLoss: allowedLoss.toFixed(2),
            adjustedCostBasis: adjustedCostBasis.toFixed(2),
            originalPurchasePrice: (buy.price * buy.shares).toFixed(2),
            newPurchasePrice: buy.price.toFixed(2),
            isWashSale,
          })

          totalDisallowedLoss += disallowedLoss
          totalAllowedLoss += allowedLoss
          totalAdjustedCostBasis += adjustedCostBasis - (buy.price * buy.shares)
        }
      }

      // If no wash sale found, loss is allowed
      if (!washSales.some(w => w.sellDate === sell.date)) {
        washSales.push({
          sellDate: sell.date,
          buyDate: '',
          daysBetween: 999,
          originalLoss: originalLoss.toFixed(2),
          disallowedLoss: '0',
          allowedLoss: originalLoss.toFixed(2),
          adjustedCostBasis: '0',
          originalPurchasePrice: '0',
          newPurchasePrice: '0',
          isWashSale: false,
        })
        totalAllowedLoss += originalLoss
      }
    }

    // Calculate future tax impact
    // Disallowed loss adds to cost basis, reducing future gain when repurchased stock is sold
    const futureGainReduction = totalAdjustedCostBasis

    // Tax rates
    const stRate = 0.35 // Short-term rate (ordinary)
    const ltRate = 0.15 // Long-term rate
    const ordinaryRate = 0.22

    // Tax impact
    const taxBenefitLost = totalDisallowedLoss * stRate // Lost immediate tax benefit
    const futureTaxBenefit = futureGainReduction * ltRate // Future benefit when sold LT
    const netTaxImpact = taxBenefitLost - futureTaxBenefit

    // Strategies to avoid wash sale
    const strategies = [
      'Wait 31+ days before repurchasing same stock',
      'Buy different but similar stock (e.g., sell S&P 500, buy Total Market)',
      'Buy in different account (IRA) - IRS says wash sale applies across ALL accounts',
      'Wait 31+ days AFTER repurchase to sell (30-day rule also applies BEFORE)',
      'Sell and buy substantially different security',
      'Use ETF alternatives (sell VOO, buy SPY is NOT allowed - too similar)',
    ]

    // Substantially identical rules
    const identicalRules = [
      'Same stock/CUSIP number = identical',
      'Options on same stock = identical',
      'ETF tracking same index = likely identical',
      'Mutual fund vs ETF tracking same index = gray area, risky',
      'Different index (S&P 500 vs Total Market) = NOT identical',
      'Preferred vs common stock of same company = gray area',
    ]

    return {
      transactions: sorted,
      washSales,
      totalDisallowedLoss: totalDisallowedLoss.toFixed(2),
      totalAllowedLoss: totalAllowedLoss.toFixed(2),
      totalAdjustedCostBasis: totalAdjustedCostBasis.toFixed(2),
      futureGainReduction: futureGainReduction.toFixed(2),
      taxBenefitLost: taxBenefitLost.toFixed(2),
      futureTaxBenefit: futureTaxBenefit.toFixed(2),
      netTaxImpact: netTaxImpact.toFixed(2),
      strategies,
      identicalRules,
      hasWashSales: washSales.some(w => w.isWashSale),
      hasAllowedLosses: totalAllowedLoss > 0,
      error: null,
    }
  }

  const result = calculate()

  if (result.error) {
    return (
      <main className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Wash Sale Calculator</h1>
        <div className="card bg-red-50 border border-red-200">
          <div className="text-red-700">Invalid transaction data format. Use JSON array format.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Wash Sale Calculator</h1>
      <p className="text-zinc-600">Calculate wash sale disallowed losses and adjusted cost basis. Understand the 30-day rule, substantially identical securities, and strategies to avoid wash sale violations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Transaction History</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Transactions (JSON Array)</label>
            <textarea
              value={transactions}
              onChange={(e) => setTransactions(e.target.value)}
              className="input h-40 text-xs"
              placeholder='[{"date": "YYYY-MM-DD", "type": "sell|buy", "shares": N, ...}]'
            />
            <div className="text-xs text-zinc-500 mt-1">
              Enter sell (with loss) and buy transactions. Include date, type, shares, and prices.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Wash Sale Rule</h3>
        <div className="text-sm text-red-600">
          If you sell stock at a loss and buy the same or substantially identical stock within 30 days before or after the sale, the loss is disallowed. The disallowed loss is added to the cost basis of the repurchased shares.
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
          <div>
            <span className="text-zinc-600">Window:</span>
            <span className="font-medium ml-2">30 days BEFORE + 30 days AFTER</span>
          </div>
          <div>
            <span className="text-zinc-600">Result:</span>
            <span className="font-medium ml-2">Loss disallowed, added to basis</span>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Wash Sale Analysis</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Sell Date</th>
                <th className="text-left p-2">Buy Date</th>
                <th className="text-left p-2">Days</th>
                <th className="text-left p-2">Original Loss</th>
                <th className="text-left p-2">Disallowed</th>
                <th className="text-left p-2">Allowed</th>
                <th className="text-left p-2">Wash Sale?</th>
              </tr>
            </thead>
            <tbody>
              {result.washSales?.map((w, i) => (
                <tr key={i} className={`border-b ${w.isWashSale ? 'bg-red-50' : ''}`}>
                  <td className="p-2">{w.sellDate}</td>
                  <td className="p-2">{w.buyDate || 'N/A'}</td>
                  <td className="p-2">{w.daysBetween === 999 ? 'No repurchase' : w.daysBetween}</td>
                  <td className="p-2">${w.originalLoss}</td>
                  <td className={`p-2 ${parseFloat(w.disallowedLoss) > 0 ? 'text-red-600 font-bold' : ''}`}>
                    ${w.disallowedLoss}
                  </td>
                  <td className={`p-2 ${parseFloat(w.allowedLoss) > 0 ? 'text-green-600 font-bold' : ''}`}>
                    ${w.allowedLoss}
                  </td>
                  <td className={`p-2 ${w.isWashSale ? 'text-red-600 font-bold' : 'text-green-600'}`}>
                    {w.isWashSale ? 'YES' : 'NO'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {result.hasWashSales && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Disallowed Loss Summary</h3>
          <div className="text-2xl font-bold text-red-800">${result.totalDisallowedLoss}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Allowed Loss:</span>
              <span className="font-bold ml-2 text-green-700">${result.totalAllowedLoss}</span>
            </div>
            <div>
              <span className="text-zinc-600">Adjusted Basis Added:</span>
              <span className="font-medium ml-2">${result.totalAdjustedCostBasis}</span>
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2">
            Disallowed losses are NOT lost forever - they're added to repurchased stock's cost basis, reducing future taxable gain.
          </div>
        </div>
      )}

      {result.hasWashSales && (
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">Adjusted Cost Basis Detail</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Original Purchase Cost:</span>
              <span className="font-medium ml-2">${result.washSales.find(w => w.isWashSale)?.originalPurchasePrice || '0'}</span>
            </div>
            <div>
              <span className="text-zinc-600">Disallowed Loss Added:</span>
              <span className="font-bold ml-2">${result.totalAdjustedCostBasis}</span>
            </div>
            <div>
              <span className="text-zinc-600">New Adjusted Basis:</span>
              <span className="font-bold ml-2">${result.washSales.find(w => w.isWashSale)?.adjustedCostBasis || '0'}</span>
            </div>
            <div>
              <span className="text-zinc-600">Future Gain Reduction:</span>
              <span className="font-medium ml-2">${result.futureGainReduction}</span>
            </div>
          </div>
          <div className="text-xs text-orange-600 mt-2">
            When you sell the repurchased stock, higher basis = lower taxable gain = tax benefit recovered.
          </div>
        </div>
      )}

      {result.hasWashSales && (
        <div className="card bg-purple-50 border border-purple-200">
          <h3 className="font-medium mb-2 text-purple-700">Tax Impact Analysis</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Tax Benefit Lost Now:</span>
              <span className="font-bold ml-2 text-red-700">${result.taxBenefitLost}</span>
            </div>
            <div>
              <span className="text-zinc-600">Future Tax Benefit:</span>
              <span className="font-bold ml-2 text-green-700">${result.futureTaxBenefit}</span>
            </div>
            <div>
              <span className="text-zinc-600">Net Tax Impact:</span>
              <span className={`font-bold ml-2 ${parseFloat(result.netTaxImpact) > 0 ? 'text-red-700' : 'text-green-700'}`}>
                ${result.netTaxImpact}
              </span>
            </div>
          </div>
          <div className="text-xs text-purple-600 mt-2">
            Net impact depends on rates. Disallowed loss saved at ST rate (~35%), future benefit at LT rate (~15%) = net cost.
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Strategies to Avoid Wash Sale</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.strategies?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">What's "Substantially Identical"</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.identicalRules?.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Wash Sale Technical Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>30-Day Window:</strong> Applies 30 days BEFORE and 30 days AFTER the loss sale date. Total 61-day window.</li>
          <li><strong>Same Security:</strong> Same CUSIP number, stock ticker, or substantially identical security triggers wash sale.</li>
          <li><strong>All Accounts:</strong> Wash sale applies across ALL accounts - taxable, IRA, Roth IRA, spouse's accounts. IRS tracks by security, not account.</li>
          <li><strong>Partial Purchases:</strong> If buy 50 shares and sold 100 at loss, 50% of loss disallowed. Match shares bought to shares sold.</li>
          <li><strong>Disallowed Amount:</strong> Entire loss on matched shares is disallowed. Added to NEW shares' cost basis.</li>
          <li><strong>Deferred Benefit:</strong> Benefit recouped when NEW shares sold. Higher basis = lower gain. If sold at loss again, bigger loss.</li>
          <li><strong>IRA Exception:</strong> Loss on taxable account, buy in IRA = loss permanently disallowed (no cost basis adjustment possible in IRA).</li>
          <li><strong>Options/Contracts:</strong> Buying options on same stock counts as substantially identical. Selling options may trigger wash sale too.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Wash Sale Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>IRA Purchases:</strong> Many think buying in IRA avoids wash sale. NO - loss permanently disallowed with no basis adjustment.</li>
          <li><strong>Different Brokerage:</strong> Think wash sale only applies at same broker. NO - IRS tracks across all accounts.</li>
          <li><strong>Pre-Sale Purchase:</strong> Many forget the 30-day BEFORE rule. Buy on Dec 15, sell Dec 20 at loss = wash sale.</li>
          <li><strong>Similar ETFs:</strong> Sell VOO (S&P 500), buy IVV (S&P 500) = likely wash sale. Different but substantially identical.</li>
          <li><strong>Auto-Reinvest:</strong> Dividend reinvestment within 30 days of loss sale triggers wash sale on that portion.</li>
          <li><strong>Broker Reports:</strong> 1099-B may NOT show wash sale adjustments. IRS expects you to self-report. Check transactions yourself.</li>
        </ul>
      </div>
    </main>
  )
}