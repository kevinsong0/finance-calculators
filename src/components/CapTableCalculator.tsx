'use client'

import { useState } from 'react'

export default function CapTableCalculator() {
  const [totalShares, setTotalShares] = useState('')
  const [rounds, setRounds] = useState([{ name: 'Founders', shares: '', price: '' }])

  const addRound = () => {
    setRounds([...rounds, { name: `Round ${rounds.length}`, shares: '', price: '' }])
  }

  const updateRound = (idx: number, field: string, value: string) => {
    const updated = [...rounds]
    updated[idx] = { ...updated[idx], [field]: value }
    setRounds(updated)
  }

  const calculate = () => {
    const total = parseFloat(totalShares) || 10000000
    let issuedShares = 0
    let totalInvestment = 0

    rounds.forEach((r) => {
      const shares = parseFloat(r.shares) || 0
      const price = parseFloat(r.price) || 0
      issuedShares += shares
      totalInvestment += shares * price
    })

    const outstandingShares = issuedShares
    const availableShares = total - issuedShares
    const ownershipPercent = (issuedShares / total) * 100

    // Post-money valuation (simplified)
    const lastPrice = parseFloat(rounds[rounds.length - 1]?.price) || 1
    const postMoneyValuation = total * lastPrice

    // Ownership breakdown
    const breakdown = rounds.map((r) => {
      const shares = parseFloat(r.shares) || 0
      const price = parseFloat(r.price) || 0
      const percent = (shares / total) * 100
      const investment = shares * price
      return {
        name: r.name,
        shares,
        percent: percent.toFixed(2),
        investment: investment.toFixed(2),
        price: price.toFixed(2)
      }
    })

    return {
      totalShares: total.toFixed(0),
      outstandingShares: outstandingShares.toFixed(0),
      availableShares: availableShares.toFixed(0),
      totalInvestment: totalInvestment.toFixed(2),
      postMoneyValuation: postMoneyValuation.toFixed(2),
      ownershipPercent: ownershipPercent.toFixed(1),
      availablePercent: (availableShares / total * 100).toFixed(1),
      breakdown
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cap Table Calculator</h1>
      <p className="text-zinc-600">Track equity ownership, dilution, and valuation across funding rounds.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Total Authorized Shares</h3>
        <div>
          <label className="block text-sm text-zinc-600 mb-1">Authorized Shares</label>
          <input
            type="number"
            value={totalShares}
            onChange={(e) => setTotalShares(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter total authorized shares"
          />
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Shareholders & Rounds</h3>
        <div className="space-y-2">
          {rounds.map((r, idx) => (
            <div key={idx} className="bg-white rounded p-3 grid grid-cols-3 gap-2 text-sm">
              <input
                type="text"
                value={r.name}
                onChange={(e) => updateRound(idx, 'name', e.target.value)}
                className="p-1 border rounded"
                placeholder="Name"
              />
              <input
                type="number"
                value={r.shares}
                onChange={(e) => updateRound(idx, 'shares', e.target.value)}
                className="p-1 border rounded"
                placeholder="Shares"
              />
              <input
                type="number"
                value={r.price}
                onChange={(e) => updateRound(idx, 'price', e.target.value)}
                className="p-1 border rounded"
                placeholder="Price/share"
              />
            </div>
          ))}
          <button
            onClick={addRound}
            className="w-full p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Add Shareholder/Round
          </button>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Cap Table Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Outstanding Shares</div>
            <div className="text-2xl font-bold">{result.outstandingShares}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Available Shares</div>
            <div className="text-2xl font-bold text-green-600">{result.availableShares}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Total Investment</div>
            <div className="text-2xl font-bold">$${result.totalInvestment}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Post-Money Valuation</div>
            <div className="text-2xl font-bold">$${result.postMoneyValuation}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Ownership Breakdown</h3>
        <div className="space-y-1 text-xs">
          {result.breakdown.map((b) => (
            <div key={b.name} className="bg-white rounded p-2 flex justify-between">
              <span className="font-medium">{b.name}</span>
              <span>{b.shares} shares ({b.percent}%)</span>
              <span>$${b.investment}</span>
            </div>
          ))}
          <div className="bg-zinc-100 rounded p-2 flex justify-between">
            <span className="font-medium">Unallocated</span>
            <span>{result.availableShares} shares ({result.availablePercent}%)</span>
            <span>-</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cap Table Terms</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Authorized Shares</strong>
            <div className="text-zinc-500">Maximum shares company can issue per articles of incorporation</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Outstanding Shares</strong>
            <div className="text-zinc-500">Shares currently held by shareholders (issued and not repurchased)</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Dilution</strong>
            <div className="text-zinc-500">Percentage ownership decrease when new shares are issued</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Post-Money Valuation</strong>
            <div className="text-zinc-500">Company value after investment: shares × latest share price</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cap Table Best Practices</h3>
        <div className="text-xs text-zinc-600">
          Update after each funding round. Track vesting schedules. Include option pool. Document shareholder agreements. Use professional cap table software (Carta, Pulley) for complex tables. Keep records for compliance and future fundraising.
        </div>
      </div>
    </main>
  )
}