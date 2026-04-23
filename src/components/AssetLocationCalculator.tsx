'use client'

import { useState } from 'react'

export default function AssetLocationCalculator() {
  const [totalPortfolio, setTotalPortfolio] = useState(500000)
  const [stockAllocation, setStockAllocation] = useState(60)
  const [bondAllocation, setBondAllocation] = useState(30)
  const [reitAllocation, setReitAllocation] = useState(5)
  const [cashAllocation, setCashAllocation] = useState(5)
  const [taxableAccount, setTaxableAccount] = useState(100000)
  const [traditionalIRA, setTraditionalIRA] = useState(200000)
  const [rothIRA, setRothIRA] = useState(100000)
  const [investmentHorizon, setInvestmentHorizon] = useState(20)
  const [expectedStockReturn, setExpectedStockReturn] = useState(8)
  const [expectedBondReturn, setExpectedBondReturn] = useState(4)
  const [expectedReitReturn, setExpectedReitReturn] = useState(6)
  const [marginalRate, setMarginalRate] = useState(24)

  const calculate = () => {
    // Calculate amounts by asset class
    const stockAmount = totalPortfolio * (stockAllocation / 100)
    const bondAmount = totalPortfolio * (bondAllocation / 100)
    const reitAmount = totalPortfolio * (reitAllocation / 100)
    const cashAmount = totalPortfolio * (cashAllocation / 100)

    // Optimal location
    // Taxable: stocks (LTCG), tax-efficient ETFs, muni bonds
    // Traditional: bonds, REITs (ordinary income tax anyway)
    // Roth: highest growth potential

    // Calculate optimal placement
    // Bonds and REITs -> Traditional first (tax-deferred, taxed as ordinary at withdrawal)
    const traditionalCapacity = traditionalIRA
    const bondsToTraditional = Math.min(bondAmount, traditionalCapacity)
    const remainingTraditional = traditionalCapacity - bondsToTraditional
    const reitsToTraditional = Math.min(reitAmount, remainingTraditional)
    const traditionalLeft = remainingTraditional - reitsToTraditional

    // Stocks with highest growth -> Roth
    const rothCapacity = rothIRA
    const growthStocksToRoth = Math.min(stockAmount * 0.5, rothCapacity) // Half stocks to Roth (growth)
    const remainingRoth = rothCapacity - growthStocksToRoth
    const bondsToRoth = Math.min(bondAmount - bondsToTraditional, remainingRoth) // Remaining bonds

    // Taxable: remaining stocks
    const taxableCapacity = taxableAccount
    const stocksToTaxable = Math.min(stockAmount - growthStocksToRoth, taxableCapacity)
    const remainingTaxable = taxableCapacity - stocksToTaxable
    const cashToTaxable = Math.min(cashAmount, remainingTaxable)

    // Calculate tax drag for each location
    // Taxable: stocks LTCG 15%, bonds ordinary income, REITs ordinary
    const stockTaxDragTaxable = stocksToTaxable * (expectedStockReturn / 100) * 0.15 // LTCG 15%
    const bondTaxDragTaxable = 0 // Bonds in Traditional/Roth
    const reitTaxDragTaxable = 0 // REITs in Traditional

    // Traditional: all deferred, taxed at withdrawal
    // No annual tax, but future tax on withdrawal
    const traditionalFutureTax = (bondsToTraditional + reitsToTraditional) *
      Math.pow(1 + (expectedBondReturn + expectedReitReturn) / 200, investmentHorizon) * (marginalRate / 100)

    // Roth: tax-free forever
    const rothGrowthTaxFree = growthStocksToRoth * Math.pow(1 + expectedStockReturn / 100, investmentHorizon)

    // Calculate alternative: all in taxable (worst case)
    const allTaxableStockTax = stockAmount * (expectedStockReturn / 100) * 0.15 * investmentHorizon
    const allTaxableBondTax = bondAmount * (expectedBondReturn / 100) * (marginalRate / 100) * investmentHorizon
    const allTaxableReitTax = reitAmount * (expectedReitReturn / 100) * (marginalRate / 100) * investmentHorizon
    const totalAllTaxable = allTaxableStockTax + allTaxableBondTax + allTaxableReitTax

    // Optimal location tax
    const optimalTax = stockTaxDragTaxable * investmentHorizon + traditionalFutureTax

    // Tax saved
    const taxSaved = totalAllTaxable - optimalTax

    // Account totals
    const taxableTotal = stocksToTaxable + cashToTaxable
    const traditionalTotal = bondsToTraditional + reitsToTraditional + traditionalLeft
    const rothTotal = growthStocksToRoth + bondsToRoth

    return {
      totalPortfolio: totalPortfolio.toFixed(0),
      stockAllocation: stockAllocation.toFixed(0),
      bondAllocation: bondAllocation.toFixed(0),
      reitAllocation: reitAllocation.toFixed(0),
      cashAllocation: cashAllocation.toFixed(0),
      stockAmount: stockAmount.toFixed(0),
      bondAmount: bondAmount.toFixed(0),
      reitAmount: reitAmount.toFixed(0),
      cashAmount: cashAmount.toFixed(0),
      taxableAccount: taxableAccount.toFixed(0),
      traditionalIRA: traditionalIRA.toFixed(0),
      rothIRA: rothIRA.toFixed(0),
      stocksToTaxable: stocksToTaxable.toFixed(0),
      bondsToTraditional: bondsToTraditional.toFixed(0),
      reitsToTraditional: reitsToTraditional.toFixed(0),
      growthStocksToRoth: growthStocksToRoth.toFixed(0),
      cashToTaxable: cashToTaxable.toFixed(0),
      taxableTotal: taxableTotal.toFixed(0),
      traditionalTotal: traditionalTotal.toFixed(0),
      rothTotal: rothTotal.toFixed(0),
      investmentHorizon: investmentHorizon.toFixed(0),
      expectedStockReturn: expectedStockReturn.toFixed(0),
      expectedBondReturn: expectedBondReturn.toFixed(0),
      expectedReitReturn: expectedReitReturn.toFixed(0),
      marginalRate: marginalRate.toFixed(0),
      stockTaxDragTaxable: stockTaxDragTaxable.toFixed(0),
      traditionalFutureTax: traditionalFutureTax.toFixed(0),
      totalAllTaxable: totalAllTaxable.toFixed(0),
      optimalTax: optimalTax.toFixed(0),
      taxSaved: taxSaved.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Asset Location Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize asset placement across account types for tax efficiency.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Portfolio ($)</label>
          <input type="number" value={totalPortfolio} onChange={(e) => setTotalPortfolio(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Allocation (%)</label>
          <input type="number" value={stockAllocation} onChange={(e) => setStockAllocation(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bond Allocation (%)</label>
          <input type="number" value={bondAllocation} onChange={(e) => setBondAllocation(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">REIT Allocation (%)</label>
          <input type="number" value={reitAllocation} onChange={(e) => setReitAllocation(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taxable Account Size ($)</label>
          <input type="number" value={taxableAccount} onChange={(e) => setTaxableAccount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional IRA Size ($)</label>
          <input type="number" value={traditionalIRA} onChange={(e) => setTraditionalIRA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Roth IRA Size ($)</label>
          <input type="number" value={rothIRA} onChange={(e) => setRothIRA(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Horizon (years)</label>
          <input type="number" value={investmentHorizon} onChange={(e) => setInvestmentHorizon(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Stock Return (%)</label>
          <input type="number" value={expectedStockReturn} onChange={(e) => setExpectedStockReturn(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate (%)</label>
          <input type="number" value={marginalRate} onChange={(e) => setMarginalRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Asset Allocation</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-zinc-600">Stocks:</span><span className="font-bold ml-2">${result.stockAmount} ({result.stockAllocation}%)</span></div>
          <div><span className="text-zinc-600">Bonds:</span><span className="font-bold ml-2">${result.bondAmount} ({result.bondAllocation}%)</span></div>
          <div><span className="text-zinc-600">REITs:</span><span className="font-bold ml-2">${result.reitAmount} ({result.reitAllocation}%)</span></div>
          <div><span className="text-zinc-600">Cash:</span><span className="font-bold ml-2">${result.cashAmount}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Optimal Location: Taxable</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Stocks:</span><span className="font-bold text-green-700 ml-2">$ {result.stocksToTaxable}</span></div>
          <div><span className="text-zinc-600">Cash:</span><span className="font-bold ml-2">$ {result.cashToTaxable}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Taxable best for: stocks (LTCG 0-20%), tax-efficient ETFs, municipal bonds.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Optimal Location: Traditional IRA/401k</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Bonds:</span><span className="font-bold text-purple-700 ml-2">$ {result.bondsToTraditional}</span></div>
          <div><span className="text-zinc-600">REITs:</span><span className="font-bold ml-2">$ {result.reitsToTraditional}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Traditional best for: bonds, REITs (taxed as ordinary income anyway, deferred tax benefit).</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Optimal Location: Roth IRA</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Growth Stocks:</span><span className="font-bold text-orange-700 ml-2">$ {result.growthStocksToRoth}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Roth best for: highest growth potential assets (tax-free forever), small-cap, growth stocks.</div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Account Totals</h2>
        <div className="grid grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Taxable:</span><span className="font-bold ml-2">$ {result.taxableTotal}</span></div>
          <div><span className="text-zinc-600">Traditional:</span><span className="font-bold ml-2">$ {result.traditionalTotal}</span></div>
          <div><span className="text-zinc-600">Roth:</span><span className="font-bold ml-2">$ {result.rothTotal}</span></div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">All Taxable Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalAllTaxable}</span></div>
          <div><span className="text-zinc-600">Optimal Location Tax:</span><span className="font-bold ml-2">$ {result.optimalTax}</span></div>
          <div><span className="text-zinc-600">Tax Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSaved}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Optimal asset location saves significant tax over {result.investmentHorizon} years.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Asset Location Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Taxable: stocks (LTCG rates), tax-efficient index funds, muni bonds</li>
          <li>Traditional: bonds, REITs, high-turnover funds (deferred tax)</li>
          <li>Roth: highest growth potential (tax-free forever)</li>
          <li>Consider account size constraints when placing assets</li>
          <li>Rebalance across accounts as they grow</li>
          <li>Factor in withdrawal timing and flexibility needs</li>
        </ul>
      </div>
    </div>
  )
}