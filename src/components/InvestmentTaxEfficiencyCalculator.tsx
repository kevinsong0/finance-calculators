'use client'

import { useState } from 'react'

export default function InvestmentTaxEfficiencyCalculator() {
  const [stocksAllocation, setStocksAllocation] = useState(60)
  const [bondsAllocation, setBondsAllocation] = useState(30)
  const [reitsAllocation, setReitsAllocation] = useState(5)
  const [cashAllocation, setCashAllocation] = useState(5)
  const [accountTypeTaxable, setAccountTypeTaxable] = useState(40)
  const [accountTypeTraditional, setAccountTypeTraditional] = useState(30)
  const [accountTypeRoth, setAccountTypeRoth] = useState(30)
  const [expectedStockReturn, setExpectedStockReturn] = useState(8)
  const [expectedBondReturn, setExpectedBondReturn] = useState(4)
  const [expectedReitReturn, setExpectedReitReturn] = useState(6)
  const [marginalTaxRate, setMarginalTaxRate] = useState(24)
  const [investmentHorizon, setInvestmentHorizon] = useState(20)
  const [portfolioValue, setPortfolioValue] = useState(500000)

  const calculate = () => {
    // Account values
    const taxableValue = portfolioValue * accountTypeTaxable / 100
    const traditionalValue = portfolioValue * accountTypeTraditional / 100
    const rothValue = portfolioValue * accountTypeRoth / 100

    // Efficient asset location strategy
    // Stocks: Roth (highest growth, tax-free gains)
    // Bonds: Traditional (tax-deferred, lower growth)
    // REITs: Roth or Traditional (high dividends taxed heavily in taxable)
    // Cash: Taxable or Traditional (low yield, minimal tax impact)

    // Current (inefficient) location
    const currentTaxableStocks = taxableValue * stocksAllocation / 100
    const currentTaxableBonds = taxableValue * bondsAllocation / 100
    const currentRothBonds = rothValue * bondsAllocation / 100
    const currentTraditionalStocks = traditionalValue * stocksAllocation / 100

    // Optimal location
    const optimalRothStocks = Math.min(rothValue, portfolioValue * stocksAllocation / 100)
    const optimalTraditionalBonds = Math.min(traditionalValue, portfolioValue * bondsAllocation / 100)
    const remainingStocks = portfolioValue * stocksAllocation / 100 - optimalRothStocks
    const remainingBonds = portfolioValue * bondsAllocation / 100 - optimalTraditionalBonds

    // Tax drag calculation
    // Taxable account: dividends and gains taxed annually
    const stockDividendYield = 2 // 2% dividend yield
    const bondInterestYield = expectedBondReturn
    const reitDividendYield = 4 // REITs required to distribute 90%+ income

    const currentTaxDragTaxableStocks = currentTaxableStocks * stockDividendYield / 100 * marginalTaxRate / 100
    const currentTaxDragTaxableBonds = currentTaxableBonds * bondInterestYield / 100 * marginalTaxRate / 100
    const currentAnnualTaxDrag = currentTaxDragTaxableStocks + currentTaxDragTaxableBonds

    // Optimal tax drag (minimal)
    const optimalTaxDrag = 0 // Roth has no tax drag, Traditional defers all taxes

    // Annual tax savings from efficient location
    const annualTaxSavings = currentAnnualTaxDrag - optimalTaxDrag

    // Compound benefit over investment horizon
    const compoundTaxSavings = annualTaxSavings * Math.pow(1 + expectedStockReturn / 100, investmentHorizon)

    // After-tax wealth comparison
    const currentAfterTaxWealth = portfolioValue * Math.pow(1 + (expectedStockReturn * stocksAllocation + expectedBondReturn * bondsAllocation) / 100 - currentAnnualTaxDrag / portfolioValue, investmentHorizon) * (1 - marginalTaxRate / 100 * 0.4) // simplified
    const optimalAfterTaxWealth = portfolioValue * Math.pow(1 + (expectedStockReturn * stocksAllocation + expectedBondReturn * bondsAllocation) / 100, investmentHorizon)

    // Efficiency score
    const efficiencyGain = optimalAfterTaxWealth - currentAfterTaxWealth

    // Recommended location per asset type
    const recommendations = [
      { asset: 'Stocks', current: 'Mixed', optimal: 'Roth first, then Traditional', reason: 'High growth, tax-free gains preferred' },
      { asset: 'Bonds', current: 'Mixed', optimal: 'Traditional IRA/401k', reason: 'Lower growth, tax-deferred interest' },
      { asset: 'REITs', current: 'Taxable', optimal: 'Roth or Traditional', reason: 'High dividends taxed as ordinary income' },
      { asset: 'Cash/Money Market', current: 'Taxable', optimal: 'Taxable OK', reason: 'Low yield, minimal tax impact' },
    ]

    return {
      portfolioValue: portfolioValue.toFixed(0),
      stocksAllocation: stocksAllocation.toFixed(0),
      bondsAllocation: bondsAllocation.toFixed(0),
      reitsAllocation: reitsAllocation.toFixed(0),
      accountTypeTaxable: accountTypeTaxable.toFixed(0),
      accountTypeTraditional: accountTypeTraditional.toFixed(0),
      accountTypeRoth: accountTypeRoth.toFixed(0),
      taxableValue: taxableValue.toFixed(0),
      traditionalValue: traditionalValue.toFixed(0),
      rothValue: rothValue.toFixed(0),
      currentAnnualTaxDrag: currentAnnualTaxDrag.toFixed(0),
      optimalTaxDrag: optimalTaxDrag.toFixed(0),
      annualTaxSavings: annualTaxSavings.toFixed(0),
      compoundTaxSavings: compoundTaxSavings.toFixed(0),
      efficiencyGain: efficiencyGain.toFixed(0),
      marginalTaxRate: marginalTaxRate.toFixed(0),
      investmentHorizon: investmentHorizon.toFixed(0),
      recommendations,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Investment Tax Efficiency Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize asset location across account types to minimize tax drag.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Stocks Allocation %</label>
          <input type="number" value={stocksAllocation} min="0" max="100" onChange={(e) => setStocksAllocation(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bonds Allocation %</label>
          <input type="number" value={bondsAllocation} min="0" max="100" onChange={(e) => setBondsAllocation(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Taxable Account %</label>
          <input type="number" value={accountTypeTaxable} min="0" max="100" onChange={(e) => setAccountTypeTaxable(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional IRA/401k %</label>
          <input type="number" value={accountTypeTraditional} min="0" max="100" onChange={(e) => setAccountTypeTraditional(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Roth IRA/401k %</label>
          <input type="number" value={accountTypeRoth} min="0" max="100" onChange={(e) => setAccountTypeRoth(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate %</label>
          <input type="number" value={marginalTaxRate} min="0" max="50" onChange={(e) => setMarginalTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Investment Horizon (years)</label>
          <input type="number" value={investmentHorizon} min="1" max="40" onChange={(e) => setInvestmentHorizon(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Portfolio Value ($)</label>
          <input type="number" value={portfolioValue} onChange={(e) => setPortfolioValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Account Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-zinc-600">Taxable</div>
            <div className="font-bold text-blue-700">$ {result.taxableValue}</div>
            <div className="text-xs">{result.accountTypeTaxable}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-600">Traditional</div>
            <div className="font-bold text-purple-700">$ {result.traditionalValue}</div>
            <div className="text-xs">{result.accountTypeTraditional}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-zinc-600">Roth</div>
            <div className="font-bold text-green-700">$ {result.rothValue}</div>
            <div className="text-xs">{result.accountTypeRoth}%</div>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Drag Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Current Tax Drag:</span><span className="font-bold text-red-700 ml-2">$ {result.currentAnnualTaxDrag}/yr</span></div>
          <div><span className="text-zinc-600">Optimal Tax Drag:</span><span className="font-bold text-green-700 ml-2">$ {result.optimalTaxDrag}/yr</span></div>
          <div><span className="text-zinc-600">Annual Savings:</span><span className="font-bold text-orange-700 ml-2">$ {result.annualTaxSavings}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Tax drag: taxes paid annually on dividends/interest in taxable accounts reduce compound growth.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Compound Benefit Over {result.investmentHorizon} Years</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Compound Tax Savings:</span><span className="font-bold text-purple-700 ml-2">$ {result.compoundTaxSavings}</span></div>
          <div><span className="text-zinc-600">Efficiency Gain:</span><span className="font-bold text-green-700 ml-2">$ {result.efficiencyGain}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Asset location optimization compounds over time, potentially adding significant wealth.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Optimal Asset Location</h2>
        <div className="grid grid-cols-1 gap-2">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 text-xs">
              <div className="font-medium">{rec.asset}</div>
              <div className="text-zinc-600">→ {rec.optimal}</div>
              <div className="text-green-700">{rec.reason}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Asset Location Principles</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>High-growth assets (stocks) → Roth (tax-free gains)</li>
          <li>Income-producing assets (bonds) → Traditional (defer interest tax)</li>
          <li>High-dividend assets (REITs) → Tax-advantaged accounts</li>
          <li>Tax drag is ~0.5-1.5% annually on taxable accounts</li>
          <li>Rebalancing in tax-advantaged accounts avoids tax costs</li>
          <li>Asset location matters more as tax rates and horizon increase</li>
        </ul>
      </div>
    </div>
  )
}