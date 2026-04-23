'use client'

import { useState } from 'react'

export default function CryptoTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState('')
  const [cryptoType, setCryptoType] = useState('bitcoin')
  const [taxBracket, setTaxBracket] = useState('22')
  const [state, setState] = useState('federal')
  const [costMethod, setCostMethod] = useState('fifo')

  const calculate = () => {
    const purchase = parseFloat(purchasePrice) || 10000
    const sale = parseFloat(salePrice) || 50000
    const holding = parseInt(holdingPeriod) || 365
    const bracket = parseFloat(taxBracket) || 22
    const method = costMethod

    // Calculate gain/loss
    const gain = sale - purchase
    const isGain = gain > 0
    const gainPercent = ((gain / purchase) * 100).toFixed(1)

    // Determine tax treatment based on holding period
    const isLongTerm = holding > 365
    const longTermRates: Record<string, number> = {
      '0': 0, '10': 0, '12': 0, '15': 0,
      '22': 15, '24': 15, '32': 15, '35': 20, '37': 20
    }
    const shortTermRate = bracket
    const longTermRate = longTermRates[bracket] || 15

    const effectiveRate = isLongTerm ? longTermRate : shortTermRate
    const taxRateName = isLongTerm ? 'Long-term Capital Gains' : 'Short-term Capital Gains'

    // Calculate federal tax
    const federalTax = isGain ? gain * (effectiveRate / 100) : 0

    // State tax (varies by state)
    const stateRates: Record<string, number> = {
      'CA': 9.3, 'NY': 6.85, 'TX': 0, 'FL': 0, 'NV': 0,
      'WA': 0, 'WY': 0, 'PA': 3.07, 'OH': 4.0, 'MI': 4.25,
      'federal': 0
    }
    const stateRate = stateRates[state] || 0
    const stateTax = isGain ? gain * (stateRate / 100) : 0

    // Net proceeds
    const totalTax = federalTax + stateTax
    const netProceeds = sale - totalTax
    const netGain = gain - totalTax

    // Cost basis methods explanation
    const methodExplanation = method === 'fifo' ?
      'First In, First Out - oldest coins sold first' :
      method === 'lifo' ?
        'Last In, First Out - newest coins sold first' :
        'Specific identification - choose which coins to sell'

    return {
      gain: gain.toFixed(2),
      gainPercent,
      isGain,
      isLongTerm,
      taxRateName,
      effectiveRate,
      federalTax: federalTax.toFixed(2),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netProceeds: netProceeds.toFixed(2),
      netGain: netGain.toFixed(2),
      holdingDays: holding,
      purchase: purchase.toFixed(2),
      sale: sale.toFixed(2),
      methodExplanation,
      savingsIfLongTerm: isLongTerm ? 0 : (gain * ((shortTermRate - longTermRate) / 100)).toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Crypto Tax Calculator</h1>
      <p className="text-zinc-600">Calculate cryptocurrency capital gains tax based on holding period and tax bracket.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Transaction Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price (Cost Basis)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter purchase price in USD"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Sale Price</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter sale price in USD"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period (Days)</label>
            <input
              type="number"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Days between purchase and sale"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Tax Bracket (%)</label>
            <select
              value={taxBracket}
              onChange={(e) => setTaxBracket(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="10">10% Bracket</option>
              <option value="12">12% Bracket</option>
              <option value="22">22% Bracket</option>
              <option value="24">24% Bracket</option>
              <option value="32">32% Bracket</option>
              <option value="35">35% Bracket</option>
              <option value="37">37% Bracket</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="federal">Federal Only</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas (No State Tax)</option>
              <option value="FL">Florida (No State Tax)</option>
              <option value="NV">Nevada (No State Tax)</option>
              <option value="WA">Washington (No State Tax)</option>
              <option value="PA">Pennsylvania</option>
              <option value="OH">Ohio</option>
              <option value="MI">Michigan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Cost Basis Method</label>
            <select
              value={costMethod}
              onChange={(e) => setCostMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="fifo">FIFO (First In, First Out)</option>
              <option value="lifo">LIFO (Last In, First Out)</option>
              <option value="specific">Specific Identification</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Capital Gain/Loss</div>
            <div className={`text-2xl font-bold ${result.isGain ? 'text-green-600' : 'text-red-600'}`}>
              $${result.gain}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Gain Percentage</div>
            <div className="text-2xl font-bold">{result.gainPercent}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax Type</div>
            <div className="text-lg font-bold">{result.taxRateName}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax Rate</div>
            <div className="text-2xl font-bold">{result.effectiveRate}%</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Federal Tax</div>
            <div className={`font-bold ${parseFloat(result.federalTax) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${result.federalTax}
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">State Tax</div>
            <div className={`font-bold ${parseFloat(result.stateTax) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${result.stateTax}
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Tax</div>
            <div className={`font-bold ${parseFloat(result.totalTax) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              $${result.totalTax}
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Net Proceeds</div>
            <div className="font-bold text-green-600">$${result.netProceeds}</div>
          </div>
        </div>
      </div>

      {result.isLongTerm ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Long-term Capital Gains</h3>
          <div className="text-sm text-green-600">
            Held for {result.holdingDays} days (over 1 year). You qualify for preferential long-term capital gains rates of {result.effectiveRate}%, significantly lower than your ordinary income rate.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Short-term Capital Gains</h3>
          <div className="text-sm text-yellow-600">
            Held for {result.holdingDays} days (under 1 year). taxed at ordinary income rate of {result.effectiveRate}%. Holding longer could save $${result.savingsIfLongTerm} in taxes.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crypto Tax Rules</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Cost Basis Tracking</strong>
            <div className="text-zinc-500">Record purchase price for each crypto transaction. IRS requires accurate basis tracking.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Holding Period</strong>
            <div className="text-zinc-500">Hold over 365 days for lower long-term rates. Short-term taxed at ordinary income rates.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Wash Sales</strong>
            <div className="text-zinc-500">Crypto wash sale rule unclear. Avoid buying same crypto within 30 days of loss sale.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reporting Requirements</h3>
        <div className="text-xs text-zinc-600">
          Report crypto gains on Form 8949 and Schedule D. exchanges must report transactions over $10,000 (starting 2025). Keep detailed records of all purchases, sales, and transfers. NFTs and staking rewards have separate reporting rules.
        </div>
      </div>
    </main>
  )
}