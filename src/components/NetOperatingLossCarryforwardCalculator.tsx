'use client'

import { useState } from 'react'

export default function NetOperatingLossCarryforwardCalculator() {
  const [nolAmount, setNOLAmount] = useState(100000)
  const [nolYear, setNOLYear] = useState(2021)
  const [currentYear, setCurrentYear] = useState(2024)
  const [futureIncome, setFutureIncome] = useState([
    { year: 2024, income: 50000 },
    { year: 2025, income: 80000 },
    { year: 2026, income: 100000 },
    { year: 2027, income: 120000 },
  ])
  const [entityType, setEntityType] = useState<'corporation' | 'individual'>('corporation')

  const calculate = () => {
    // Net Operating Loss (NOL) Carryforward Rules
    // TCJA 2017 changed rules for NOLs
    // Post-2017 NOLs: carryforward only, 80% income limitation
    // Pre-2018 NOLs: 2-year carryback, 20-year carryforward, no income limit

    // NOL rules by year generated
    const isPreTCJA = nolYear < 2018
    const carryforwardYears = isPreTCJA ? 20 : 80 // TCJA allows indefinite carryforward
    const incomeLimitPercent = isPreTCJA ? 100 : 80 // 80% limitation for post-2017

    // Calculate utilization year by year
    let remainingNOL = nolAmount
    let utilizedNOL = 0
    let expiredNOL = 0
    let utilizationHistory: { year: number; income: number; limit: number; utilized: number; remaining: number }[] = []

    // Sort future income by year
    const sortedIncome = [...futureIncome].sort((a, b) => a.year - b.year)

    for (const yearData of sortedIncome) {
      if (remainingNOL <= 0) break

      // Calculate income limit for NOL utilization
      const incomeLimit = yearData.income * (incomeLimitPercent / 100)

      // Amount that can be utilized this year
      const canUtilize = Math.min(remainingNOL, incomeLimit)
      const actualUtilize = yearData.income > 0 ? canUtilize : 0

      utilizationHistory.push({
        year: yearData.year,
        income: yearData.income,
        limit: incomeLimit,
        utilized: actualUtilize,
        remaining: remainingNOL - actualUtilize,
      })

      utilizedNOL += actualUtilize
      remainingNOL -= actualUtilize
    }

    // Calculate expiration
    const expirationYear = isPreTCJA ? nolYear + 20 : null // Indefinite for post-2017
    if (isPreTCJA && remainingNOL > 0) {
      expiredNOL = remainingNOL
    }

    // Tax savings estimate
    // Assume 21% corporate rate or individual's marginal rate
    const taxRate = entityType === 'corporation' ? 21 : 24 // Simplified
    const taxSavings = utilizedNOL * (taxRate / 100)
    const potentialSavings = nolAmount * (taxRate / 100)
    const lostSavings = expiredNOL * (taxRate / 100)

    // Years to full utilization
    const yearsToFullUtilize = utilizationHistory.filter(h => h.utilized > 0).length
    const willFullyUtilize = remainingNOL <= 0 || !isPreTCJA

    // Carryback option (pre-TCJA only)
    const carrybackYears = isPreTCJA ? 2 : 0
    const carrybackAvailable = isPreTCJA && nolYear >= currentYear - 3

    return {
      nolAmount: nolAmount.toFixed(0),
      nolYear: nolYear.toFixed(0),
      currentYear: currentYear.toFixed(0),
      entityType,
      isPreTCJA,
      carryforwardYears: carryforwardYears === 80 ? 'Indefinite' : carryforwardYears.toFixed(0),
      incomeLimitPercent: incomeLimitPercent.toFixed(0),
      remainingNOL: remainingNOL.toFixed(0),
      utilizedNOL: utilizedNOL.toFixed(0),
      expiredNOL: expiredNOL.toFixed(0),
      expirationYear: expirationYear ? expirationYear.toFixed(0) : 'None (indefinite)',
      taxRate: taxRate.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      potentialSavings: potentialSavings.toFixed(0),
      lostSavings: lostSavings.toFixed(0),
      yearsToFullUtilize: yearsToFullUtilize.toFixed(0),
      willFullyUtilize,
      carrybackYears: carrybackYears.toFixed(0),
      carrybackAvailable,
      utilizationHistory,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Net Operating Loss Carryforward Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate NOL utilization and tax savings over time.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">NOL Amount</label>
          <input type="number" value={nolAmount} onChange={(e) => setNOLAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NOL Generated Year</label>
          <input type="number" value={nolYear} min="2015" max="2024" onChange={(e) => setNOLYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Entity Type</label>
          <select value={entityType} onChange={(e) => setEntityType(e.target.value as 'corporation' | 'individual')} className="w-full border rounded p-2">
            <option value="corporation">Corporation (C-Corp)</option>
            <option value="individual">Individual/Sole Prop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Year</label>
          <input type="number" value={currentYear} min="2020" max="2030" onChange={(e) => setCurrentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">NOL Rules Applied</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">NOL Year:</span><span className="font-medium ml-2">{result.nolYear}</span></div>
          <div><span className="text-zinc-600">Rule Type:</span><span className="font-bold text-blue-700 ml-2">{result.isPreTCJA ? 'Pre-TCJA' : 'Post-TCJA'}</span></div>
          <div><span className="text-zinc-600">Income Limit:</span><span className="font-bold ml-2">{result.incomeLimitPercent}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Carryforward:</span><span className="font-bold text-blue-700 ml-2">{result.carryforwardYears} years</span></div>
          <div><span className="text-zinc-600">Expiration:</span><span className="font-medium ml-2">{result.expirationYear}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.isPreTCJA ? 'Pre-2018: 2-year carryback, 20-year forward, no income limit.' : 'Post-2017: No carryback, indefinite forward, 80% income limit.'}</div>
      </div>

      <div className={`card mb-6 ${result.willFullyUtilize ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.willFullyUtilize ? 'text-green-700' : 'text-orange-700'}`}>Utilization Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original NOL:</span><span className="font-medium ml-2">$ {result.nolAmount}</span></div>
          <div><span className="text-zinc-600">Utilized:</span><span className="font-bold text-green-700 ml-2">$ {result.utilizedNOL}</span></div>
          <div><span className="text-zinc-600">Remaining:</span><span className="font-bold ml-2">$ {result.remainingNOL}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Expired:</span><span className={`font-bold ml-2 ${Number(result.expiredNOL) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.expiredNOL}</span></div>
          <div><span className="text-zinc-600">Full Use:</span><span className={`font-bold ml-2 ${result.willFullyUtilize ? 'text-green-700' : 'text-orange-700'}`}>{result.willFullyUtilize ? 'Yes' : 'Partial'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">NOL offsets taxable income. Post-TCJA limited to 80% of income.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Year-by-Year Utilization</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Income</th>
                <th className="py-2 text-left">Limit</th>
                <th className="py-2 text-left">Utilized</th>
                <th className="py-2 text-left">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {result.utilizationHistory.map((h) => (
                <tr key={h.year} className="border-b">
                  <td className="py-1 font-semibold">{h.year}</td>
                  <td className="py-1">$ {h.income.toFixed(0)}</td>
                  <td className="py-1">$ {h.limit.toFixed(0)}</td>
                  <td className="py-1 text-green-700 font-bold">$ {h.utilized.toFixed(0)}</td>
                  <td className="py-1">$ {h.remaining.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each year uses NOL up to income limit. Remaining carries forward.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Savings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax Rate:</span><span className="font-medium ml-2">{result.taxRate}%</span></div>
          <div><span className="text-zinc-600">Savings Realized:</span><span className="font-bold text-teal-700 ml-2">$ {result.taxSavings}</span></div>
          <div><span className="text-zinc-600">Potential:</span><span className="font-medium ml-2">$ {result.potentialSavings}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Lost Savings:</span><span className={`font-bold ml-2 ${Number(result.lostSavings) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.lostSavings}</span></div>
          <div><span className="text-zinc-600">Years Used:</span><span className="font-medium ml-2">{result.yearsToFullUtilize}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">NOL reduces taxable income, saving taxes at your marginal rate.</div>
      </div>

      {result.carrybackAvailable && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Carryback Option</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Carryback Years:</span><span className="font-medium ml-2">{result.carrybackYears}</span></div>
            <div><span className="text-zinc-600">Available:</span><span className="font-bold text-orange-700 ml-2">Yes (Pre-TCJA)</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Pre-2018 NOLs can carry back 2 years for immediate refund. Consider filing amended returns.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">NOL Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Pre-2018: 20-year carryforward</li>
          <li>Post-2017: indefinite carryforward</li>
          <li>Pre-2018: 2-year carryback option</li>
          <li>Post-2017: 80% income limit</li>
          <li>Corporate rate: 21%</li>
          <li>File Form 1139 for carryback</li>
          <li>Track utilization annually</li>
          <li>Consider carryback for refund</li>
          <li>Expire unused (pre-TCJA)</li>
          <li>Maximize income timing</li>
        </ul>
      </div>
    </div>
  )
}