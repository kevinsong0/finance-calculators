'use client'

import { useState } from 'react'

export default function CapitalGainsDistributionCalculator() {
  const [fundValue, setFundValue] = useState(50000)
  const [distributionPerShare, setDistributionPerShare] = useState(2.5)
  const [sharesOwned, setSharesOwned] = useState(1000)
  const [distributionType, setDistributionType] = useState<'short_term' | 'long_term' | 'mixed'>('long_term')
  const [reinvestDividends, setReinvestDividends] = useState(true)
  const [shortTermPercent, setShortTermPercent] = useState(20)
  const [marginalRate, setMarginalRate] = useState(24)

  const calculate = () => {
    const totalDistribution = distributionPerShare * sharesOwned
    const longTermRate = distributionType === 'short_term' ? 0 : distributionType === 'long_term' ? 15 : Math.max(0, 100 - shortTermPercent)
    const stRate = distributionType === 'short_term' ? 100 : distributionType === 'long_term' ? 0 : shortTermPercent

    const shortTermDistribution = totalDistribution * (stRate / 100)
    const longTermDistribution = totalDistribution * (longTermRate / 100)

    // Short-term taxed at ordinary income rate, long-term at capital gains rate
    const shortTermTax = shortTermDistribution * (marginalRate / 100)
    const longTermTax = longTermDistribution * (Math.min(marginalRate, 20) / 100) // 0%, 15%, or 20% LTCG rate

    const totalTax = shortTermTax + longTermTax
    const netDistribution = totalDistribution - totalTax

    // NAV impact after distribution
    const navBefore = fundValue / sharesOwned
    const navAfter = navBefore - distributionPerShare // NAV drops by distribution amount

    // Reinvestment calculation
    const reinvestShares = reinvestDividends ? netDistribution / navAfter : 0
    const newSharesOwned = sharesOwned + reinvestShares
    const newFundValue = reinvestDividends ? navAfter * newSharesOwned : navAfter * sharesOwned

    // Cost basis adjustment
    const costBasisAdjustment = reinvestDividends ? netDistribution : 0 // Reinvested dividends increase basis

    // Return of capital (ROC) portion
    const rocPercent = 10 // Assumed ROC percentage for some funds
    const rocDistribution = totalDistribution * (rocPercent / 100)
    const rocTaxFree = rocDistribution // ROC is tax-free, reduces basis

    return {
      fundValue: fundValue.toFixed(2),
      sharesOwned: sharesOwned.toFixed(0),
      distributionPerShare: distributionPerShare.toFixed(2),
      totalDistribution: totalDistribution.toFixed(2),
      shortTermDistribution: shortTermDistribution.toFixed(2),
      longTermDistribution: longTermDistribution.toFixed(2),
      shortTermTax: shortTermTax.toFixed(2),
      longTermTax: longTermTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netDistribution: netDistribution.toFixed(2),
      navBefore: navBefore.toFixed(2),
      navAfter: navAfter.toFixed(2),
      reinvestDividends,
      reinvestShares: reinvestShares.toFixed(4),
      newSharesOwned: newSharesOwned.toFixed(4),
      newFundValue: newFundValue.toFixed(2),
      costBasisAdjustment: costBasisAdjustment.toFixed(2),
      rocDistribution: rocDistribution.toFixed(2),
      shortTermPercent: stRate.toFixed(0),
      longTermPercent: longTermRate.toFixed(0),
      marginalRate: marginalRate.toFixed(0),
      effectiveTaxRate: totalDistribution > 0 ? ((totalTax / totalDistribution) * 100).toFixed(1) : '0',
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Capital Gains Distribution Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax impact of mutual fund/ETF capital gains distributions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Fund Value ($)</label>
          <input
            type="number"
            value={fundValue}
            onChange={(e) => setFundValue(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Shares Owned</label>
          <input
            type="number"
            value={sharesOwned}
            onChange={(e) => setSharesOwned(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Distribution Per Share ($)</label>
          <input
            type="number"
            value={distributionPerShare}
            onChange={(e) => setDistributionPerShare(Number(e.target.value))}
            step="0.01"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Distribution Type</label>
          <select
            value={distributionType}
            onChange={(e) => setDistributionType(e.target.value as 'short_term' | 'long_term' | 'mixed')}
            className="w-full border rounded p-2"
          >
            <option value="long_term">Long-Term Capital Gains</option>
            <option value="short_term">Short-Term Capital Gains</option>
            <option value="mixed">Mixed (Both Types)</option>
          </select>
        </div>
        {distributionType === 'mixed' && (
          <div>
            <label className="block text-sm font-medium mb-1">Short-Term %</label>
            <input
              type="number"
              value={shortTermPercent}
              onChange={(e) => setShortTermPercent(Number(e.target.value))}
              min="0"
              max="100"
              className="w-full border rounded p-2"
            />
          </div>
        )}
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
            checked={reinvestDividends}
            onChange={(e) => setReinvestDividends(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Reinvest Distributions</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Distribution Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Distribution:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.totalDistribution}</span>
          </div>
          <div>
            <span className="text-zinc-600">Short-Term Portion:</span>
            <span className="font-medium ml-2">$ {result.shortTermDistribution}</span>
          </div>
          <div>
            <span className="text-zinc-600">Long-Term Portion:</span>
            <span className="font-medium ml-2">$ {result.longTermDistribution}</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Short-Term Tax:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.shortTermTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Long-Term Tax:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.longTermTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Tax Rate:</span>
            <span className="font-medium ml-2">{result.effectiveTaxRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Distribution:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.netDistribution}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">NAV Impact & Reinvestment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">NAV Before:</span>
            <span className="font-medium ml-2">$ {result.navBefore}</span>
          </div>
          <div>
            <span className="text-zinc-600">NAV After:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.navAfter}</span>
          </div>
          {result.reinvestDividends && (
            <>
              <div>
                <span className="text-zinc-600">New Shares:</span>
                <span className="font-medium ml-2">{result.reinvestShares}</span>
              </div>
              <div>
                <span className="text-zinc-600">Total Shares:</span>
                <span className="font-bold ml-2">{result.newSharesOwned}</span>
              </div>
              <div>
                <span className="text-zinc-600">Cost Basis Added:</span>
                <span className="font-medium ml-2">$ {result.costBasisAdjustment}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Capital Gains Distribution Facts</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Mutual funds distribute capital gains annually (usually December)</li>
          <li>Short-term gains taxed at ordinary income rates (up to 37%)</li>
          <li>Long-term gains taxed at 0%, 15%, or 20% based on income</li>
          <li>NAV drops by distribution amount on payment date</li>
          <li>Reinvested distributions increase cost basis</li>
          <li>You pay tax on distributions even if reinvested</li>
        </ul>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Return of Capital (ROC)</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>ROC portion is tax-free in year received</li>
          <li>ROC reduces your cost basis in the fund</li>
          <li>When basis reaches zero, ROC becomes capital gain</li>
          <li>Common in funds with high distributions relative to income</li>
          <li>Check fund's distribution breakdown for ROC percentage</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">Timing Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Buy funds after distribution to avoid immediate tax liability</li>
          <li>Wait until after record date to avoid receiving distribution</li>
          <li>ETFs often have lower capital gains distributions than mutual funds</li>
          <li>Index funds typically have lower distributions than active funds</li>
          <li>Tax-efficient funds minimize distributions through loss harvesting</li>
          <li>Consider tax-managed funds for taxable accounts</li>
        </ul>
      </div>
    </div>
  )
}