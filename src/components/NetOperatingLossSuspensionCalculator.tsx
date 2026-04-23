'use client'

import { useState } from 'react'

export default function NetOperatingLossSuspensionCalculator() {
  const [nolAmount, setNolAmount] = useState(100000)
  const [nolYear, setNolYear] = useState(2020)
  const [taxableIncome2021, setTaxableIncome2021] = useState(50000)
  const [taxableIncome2022, setTaxableIncome2022] = useState(80000)
  const [taxableIncome2023, setTaxableIncome2023] = useState(120000)
  const [taxableIncome2024, setTaxableIncome2024] = useState(150000)
  const [taxableIncome2025, setTaxableIncome2025] = useState(180000)
  const [nolType, setNolType] = useState<'pre2018' | 'post2017'>('post2017')
  const [carryforwardYears, setCarryforwardYears] = useState(20)

  const calculate = () => {
    // Net Operating Loss Suspension Calculator
    // NOL carryforward rules changed significantly in 2018

    // Pre-2018 NOLs:
    // - 20-year carryforward
    // - Can offset 100% of taxable income
    // - No carryback for most taxpayers

    // Post-2017 NOLs (TCJA rules):
    // - Unlimited carryforward (no expiration)
    // - Can only offset 80% of taxable income
    // - No carryback allowed

    // CARES Act (2020):
    // - Temporarily allowed 5-year carryback for 2018-2020 NOLs
    // - Temporarily allowed 100% offset (not 80% limit)

    const taxableIncomes = [
      { year: 2021, income: taxableIncome2021 },
      { year: 2022, income: taxableIncome2022 },
      { year: 2023, income: taxableIncome2023 },
      { year: 2024, income: taxableIncome2024 },
      { year: 2025, income: taxableIncome2025 },
    ]

    // Calculate NOL utilization schedule
    let remainingNol = nolAmount
    const utilizationSchedule = []

    for (const ti of taxableIncomes) {
      if (remainingNol <= 0) break

      // Determine offset limit based on NOL type
      let offsetLimit = 0
      if (nolType === 'pre2018') {
        offsetLimit = ti.income // 100% offset allowed
      } else {
        // Post-2017: 80% limit
        // CARES Act exception for 2018-2020: 100%
        if (ti.year >= 2021) {
          offsetLimit = ti.income * 0.8
        } else {
          offsetLimit = ti.income // CARES Act 100% for 2018-2020
        }
      }

      const nolUsed = Math.min(remainingNol, offsetLimit)
      const taxableAfterNol = ti.income - nolUsed
      remainingNol -= nolUsed

      utilizationSchedule.push({
        year: ti.year,
        taxableIncome: ti.income,
        nolUsed,
        taxableAfterNol,
        remainingNol,
        offsetLimit,
      })
    }

    // Total NOL used
    const totalNolUsed = nolAmount - remainingNol

    // Tax savings calculation (simplified 24% rate)
    const taxRate = 0.24
    const taxSavings = totalNolUsed * taxRate

    // Years to full utilization
    const yearsToFullUse = utilizationSchedule.filter((s) => s.nolUsed > 0).length

    // Remaining NOL at end of period
    const finalRemainingNol = remainingNol

    // Expiration analysis (for pre-2018 NOLs)
    const expirationYear = nolType === 'pre2018' ? nolYear + carryforwardYears : null

    // Recommendation
    let recommendation = ''
    if (nolType === 'pre2018') {
      recommendation = `Pre-2018 NOL ($${nolAmount.toFixed(0)}) expires in ${carryforwardYears} years (${expirationYear}). Can offset 100% of income. Used $${totalNolUsed.toFixed(0)} over ${yearsToFullUse} years. Remaining: $${finalRemainingNol.toFixed(0)}. Maximize utilization before expiration.`
    } else {
      recommendation = `Post-2017 NOL ($${nolAmount.toFixed(0)}) has unlimited carryforward. Limited to 80% of taxable income. Used $${totalNolUsed.toFixed(0)} over ${yearsToFullUse} years. Remaining: $${finalRemainingNol.toFixed(0)}. Tax savings: $${taxSavings.toFixed(0)}. Plan for gradual utilization.`
    }

    if (finalRemainingNol > 0 && nolType === 'pre2018' && expirationYear !== null) {
      const yearsLeft = expirationYear - 2025
      if (yearsLeft <= 5) {
        recommendation += ` WARNING: Only ${yearsLeft} years until expiration. Accelerate income or structure transactions to maximize NOL use.`
      }
    }

    // NOL type comparison
    const typeComparison = [
      { type: 'Pre-2018 NOL', carryforward: '20 years', offsetLimit: '100%', carryback: 'None (generally)', expires: 'Yes' },
      { type: 'Post-2017 NOL', carryforward: 'Unlimited', offsetLimit: '80%', carryback: 'None', expires: 'No' },
    ]

    return {
      nolAmount: nolAmount.toFixed(0),
      nolYear,
      nolType,
      carryforwardYears,
      totalNolUsed: totalNolUsed.toFixed(0),
      remainingNol: finalRemainingNol.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      yearsToFullUse,
      utilizationSchedule,
      expirationYear,
      recommendation,
      typeComparison,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Net Operating Loss Suspension Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate NOL carryforward utilization and suspension rules.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">NOL Amount</label>
          <input type="number" value={nolAmount} onChange={(e) => setNolAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NOL Year Generated</label>
          <input type="number" value={nolYear} onChange={(e) => setNolYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">NOL Type</label>
          <select value={nolType} onChange={(e) => setNolType(e.target.value as 'pre2018' | 'post2017')} className="w-full border rounded p-2">
            <option value="pre2018">Pre-2018 (20-year, 100% offset)</option>
            <option value="post2017">Post-2017 (Unlimited, 80% limit)</option>
          </select>
        </div>
        {nolType === 'pre2018' && (
          <div>
            <label className="block text-sm font-medium mb-1">Carryforward Years</label>
            <input type="number" value={carryforwardYears} onChange={(e) => setCarryforwardYears(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Projected Taxable Income</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">2021 Income</label>
            <input type="number" value={taxableIncome2021} onChange={(e) => setTaxableIncome2021(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">2022 Income</label>
            <input type="number" value={taxableIncome2022} onChange={(e) => setTaxableIncome2022(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">2023 Income</label>
            <input type="number" value={taxableIncome2023} onChange={(e) => setTaxableIncome2023(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">2024 Income</label>
            <input type="number" value={taxableIncome2024} onChange={(e) => setTaxableIncome2024(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">2025 Income</label>
            <input type="number" value={taxableIncome2025} onChange={(e) => setTaxableIncome2025(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">NOL Rules Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Carryforward</th>
                <th className="py-2 text-left">Offset Limit</th>
                <th className="py-2 text-left">Carryback</th>
                <th className="py-2 text-left">Expires</th>
              </tr>
            </thead>
            <tbody>
              {result.typeComparison.map((t) => (
                <tr key={t.type} className="border-b">
                  <td className="py-1 font-semibold">{t.type}</td>
                  <td className="py-1">{t.carryforward}</td>
                  <td className="py-1">{t.offsetLimit}</td>
                  <td className="py-1">{t.carryback}</td>
                  <td className="py-1">{t.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">NOL Utilization Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Taxable Income</th>
                <th className="py-2 text-left">Offset Limit</th>
                <th className="py-2 text-left">NOL Used</th>
                <th className="py-2 text-left">After NOL</th>
                <th className="py-2 text-left">Remaining NOL</th>
              </tr>
            </thead>
            <tbody>
              {result.utilizationSchedule.map((s) => (
                <tr key={s.year} className="border-b">
                  <td className="py-1">{s.year}</td>
                  <td className="py-1">$ {s.taxableIncome.toFixed(0)}</td>
                  <td className="py-1">$ {s.offsetLimit.toFixed(0)}</td>
                  <td className="py-1 font-semibold text-green-700">$ {s.nolUsed.toFixed(0)}</td>
                  <td className="py-1">$ {s.taxableAfterNol.toFixed(0)}</td>
                  <td className="py-1">$ {s.remainingNol.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">NOL Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original NOL:</span><span className="font-medium ml-2">$ {result.nolAmount}</span></div>
          <div><span className="text-zinc-600">NOL Used:</span><span className="font-bold text-green-700 ml-2">$ {result.totalNolUsed}</span></div>
          <div><span className="text-zinc-600">Remaining:</span><span className="font-medium ml-2">$ {result.remainingNol}</span></div>
          <div><span className="text-zinc-600">Tax Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span></div>
          <div><span className="text-zinc-600">Years Used:</span><span className="font-medium ml-2">{result.yearsToFullUse}</span></div>
          {result.expirationYear && <div><span className="text-zinc-600">Expires:</span><span className="font-bold text-red-700 ml-2">{result.expirationYear}</span></div>}
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">NOL Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Pre-2018: 20-year carryforward, 100% offset</li>
          <li>Post-2017: Unlimited carryforward, 80% limit</li>
          <li>CARES Act: 5-year carryback for 2018-2020</li>
          <li>CARES Act: 100% offset temporarily</li>
          <li>Track NOL annually on Form 1045</li>
          <li>Business vs individual NOL rules differ</li>
          <li>Suspended NOL on S corp books</li>
          <li>Ownership change limits (Section 382)</li>
          <li>Plan utilization strategically</li>
          <li>Document NOL calculation carefully</li>
        </ul>
      </div>
    </div>
  )
}