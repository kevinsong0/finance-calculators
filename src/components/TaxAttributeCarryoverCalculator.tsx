'use client'

import { useState } from 'react'

export default function TaxAttributeCarryoverCalculator() {
  const [attributeType, setAttributeType] = useState<'nol' | 'credit' | 'deduction' | 'loss'>('nol')
  const [originalAmount, setOriginalAmount] = useState(100000)
  const [originYear, setOriginYear] = useState(2020)
  const [currentYear, setCurrentYear] = useState(2024)
  const [usageSchedule, setUsageSchedule] = useState([
    { year: 2021, used: 20000 },
    { year: 2022, used: 30000 },
    { year: 2023, used: 25000 },
    { year: 2024, used: 0 },
  ])
  const [expirationYears, setExpirationYears] = useState(20)
  const [taxRate, setTaxRate] = useState(24)

  const calculate = () => {
    // Tax Attribute Carryover Calculator
    // Track and project utilization of tax carryovers

    // Types of carryovers:
    // NOL: 20 years (pre-2018) or indefinite (post-2017)
    // Tax credits: varies by type (usually 20 years)
    // Capital losses: indefinite for corporations, 3 years for individuals
    // Deductions: charitable 5 years, foreign tax credit 10 years

    // Calculate remaining carryover
    let remainingAmount = originalAmount
    const usedSchedule = []

    for (const usage of usageSchedule) {
      if (usage.used > remainingAmount) {
        usedSchedule.push({ year: usage.year, used: remainingAmount, remaining: 0, expired: false })
        remainingAmount = 0
      } else {
        remainingAmount -= usage.used
        usedSchedule.push({ year: usage.year, used: usage.used, remaining: remainingAmount, expired: false })
      }
    }

    // Check expiration
    const expirationYear = originYear + expirationYears
    const yearsUntilExpiration = expirationYear - currentYear

    // Current remaining
    const currentRemaining = remainingAmount

    // Tax benefit of remaining carryover
    const taxBenefitRemaining = currentRemaining * (taxRate / 100)

    // Projected utilization schedule
    const projectedSchedule = []
    let projectedRemaining = currentRemaining
    for (let year = currentYear + 1; year <= expirationYear && projectedRemaining > 0; year++) {
      const projectedUsage = Math.min(projectedRemaining, 25000) // Simplified assumption
      projectedRemaining -= projectedUsage
      const taxSavings = projectedUsage * (taxRate / 100)
      projectedSchedule.push({
        year,
        projectedUsage: projectedUsage.toFixed(0),
        remaining: projectedRemaining.toFixed(0),
        taxSavings: taxSavings.toFixed(0),
        yearsFromNow: year - currentYear,
      })
    }

    // Expiration risk
    let expirationRisk = ''
    if (yearsUntilExpiration <= 0) {
      expirationRisk = 'EXPIRED - carryover no longer available'
    } else if (yearsUntilExpiration <= 3) {
      expirationRisk = `HIGH RISK - expires in ${yearsUntilExpiration} years. Accelerate utilization.`
    } else if (yearsUntilExpiration <= 5) {
      expirationRisk = `MODERATE RISK - expires in ${yearsUntilExpiration} years. Monitor utilization.`
    } else {
      expirationRisk = `LOW RISK - ${yearsUntilExpiration} years until expiration.`
    }

    // Total utilized
    const totalUtilized = originalAmount - currentRemaining
    const utilizationPercentage = (totalUtilized / originalAmount) * 100

    // Total tax benefit realized
    const totalTaxBenefitRealized = totalUtilized * (taxRate / 100)

    // Recommendation
    let recommendation = ''
    if (currentRemaining === 0) {
      recommendation = `Carryover fully utilized. Original $${originalAmount.toFixed(0)} completely used over ${usageSchedule.length} years. Total tax benefit realized: $${totalTaxBenefitRealized.toFixed(0)}. No remaining carryover.`
    } else if (yearsUntilExpiration <= 0) {
      recommendation = `Carryover expired. $${currentRemaining.toFixed(0)} lost due to expiration. Unclaimed tax benefit: $${taxBenefitRemaining.toFixed(0)}. No further utilization possible.`
    } else {
      recommendation = `Remaining carryover: $${currentRemaining.toFixed(0)}. Utilized: ${utilizationPercentage.toFixed(1)}%. Tax benefit remaining: $${taxBenefitRemaining.toFixed(0)}. Years until expiration: ${yearsUntilExpiration}. ${expirationRisk}`
    }

    if (yearsUntilExpiration > 0 && yearsUntilExpiration <= 5 && currentRemaining > 20000) {
      recommendation += ` Plan to increase income or structure transactions to utilize carryover before expiration.`
    }

    // Attribute type summary
    const attributeSummary = [
      { type: 'NOL (pre-2018)', carryover: '20 years', expiration: 'Yes', form: 'Form 1045/1120' },
      { type: 'NOL (post-2017)', carryover: 'Indefinite', expiration: 'No', form: 'Form 1045/1120' },
      { type: 'Tax Credits', carryover: '1-20 years varies', expiration: 'Yes', form: 'Form 3800' },
      { type: 'Capital Loss (corp)', carryover: 'Indefinite', expiration: 'No', form: 'Schedule D' },
      { type: 'Capital Loss (indiv)', carryover: '3 years', expiration: 'Yes', form: 'Schedule D' },
      { type: 'Charitable Deduction', carryover: '5 years', expiration: 'Yes', form: 'Schedule A' },
    ]

    return {
      attributeType,
      originalAmount: originalAmount.toFixed(0),
      originYear,
      currentYear,
      expirationYears,
      expirationYear,
      yearsUntilExpiration,
      currentRemaining: currentRemaining.toFixed(0),
      totalUtilized: totalUtilized.toFixed(0),
      utilizationPercentage: utilizationPercentage.toFixed(1),
      taxBenefitRemaining: taxBenefitRemaining.toFixed(0),
      totalTaxBenefitRealized: totalTaxBenefitRealized.toFixed(0),
      taxRate: taxRate.toFixed(0),
      usedSchedule,
      projectedSchedule,
      expirationRisk,
      recommendation,
      attributeSummary,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Attribute Carryover Calculator</h1>
      <p className="text-gray-600 mb-4">Track and project utilization of tax carryovers (NOL, credits, losses).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Attribute Type</label>
          <select value={attributeType} onChange={(e) => setAttributeType(e.target.value as 'nol' | 'credit' | 'deduction' | 'loss')} className="w-full border rounded p-2">
            <option value="nol">Net Operating Loss (NOL)</option>
            <option value="credit">Tax Credit</option>
            <option value="deduction">Deduction Carryforward</option>
            <option value="loss">Capital Loss</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original Amount</label>
          <input type="number" value={originalAmount} onChange={(e) => setOriginalAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Origin Year</label>
          <input type="number" value={originYear} onChange={(e) => setOriginYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expiration Years</label>
          <input type="number" value={expirationYears} onChange={(e) => setExpirationYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Year</label>
          <input type="number" value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
          <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Attribute Type Rules</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Carryover Period</th>
                <th className="py-2 text-left">Expires?</th>
                <th className="py-2 text-left">Form</th>
              </tr>
            </thead>
            <tbody>
              {result.attributeSummary.map((a) => (
                <tr key={a.type} className="border-b">
                  <td className="py-1 font-semibold">{a.type}</td>
                  <td className="py-1">{a.carryover}</td>
                  <td className="py-1">{a.expiration}</td>
                  <td className="py-1">{a.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.yearsUntilExpiration <= 0 ? 'bg-red-50 border border-red-200' : result.yearsUntilExpiration <= 5 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Carryover Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Original:</span><span className="font-medium ml-2">$ {result.originalAmount}</span></div>
          <div><span className="text-zinc-600">Utilized:</span><span className="font-medium ml-2">$ {result.totalUtilized}</span></div>
          <div><span className="text-zinc-600">Remaining:</span><span className="font-bold ml-2">$ {result.currentRemaining}</span></div>
          <div><span className="text-zinc-600">Utilization:</span><span className="font-medium ml-2">{result.utilizationPercentage}%</span></div>
          <div><span className="text-zinc-600">Expires:</span><span className={`font-bold ml-2 ${result.yearsUntilExpiration <= 3 ? 'text-red-700' : 'text-zinc-600'}`}>{result.expirationYear}</span></div>
          <div><span className="text-zinc-600">Years Left:</span><span className={`font-bold ml-2 ${result.yearsUntilExpiration <= 3 ? 'text-red-700' : 'text-green-700'}`}>{result.yearsUntilExpiration}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Historical Usage</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Used</th>
                <th className="py-2 text-left">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {result.usedSchedule.map((u) => (
                <tr key={u.year} className="border-b">
                  <td className="py-1">{u.year}</td>
                  <td className="py-1 font-semibold text-green-700">$ {u.used.toFixed(0)}</td>
                  <td className="py-1">$ {u.remaining.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {Number(result.currentRemaining) > 0 && result.yearsUntilExpiration > 0 && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Projected Utilization</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Year</th>
                  <th className="py-2 text-left">Projected Use</th>
                  <th className="py-2 text-left">Remaining</th>
                  <th className="py-2 text-left">Tax Savings</th>
                </tr>
              </thead>
              <tbody>
                {result.projectedSchedule.map((p) => (
                  <tr key={p.year} className="border-b">
                    <td className="py-1">{p.year}</td>
                    <td className="py-1 font-semibold">$ {p.projectedUsage}</td>
                    <td className="py-1">$ {p.remaining}</td>
                    <td className="py-1">$ {p.taxSavings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Benefit Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax Rate:</span><span className="font-medium ml-2">{result.taxRate}%</span></div>
          <div><span className="text-zinc-600">Benefit Realized:</span><span className="font-bold text-green-700 ml-2">$ {result.totalTaxBenefitRealized}</span></div>
          <div><span className="text-zinc-600">Benefit Remaining:</span><span className="font-bold ml-2">$ {result.taxBenefitRemaining}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${result.yearsUntilExpiration <= 3 && Number(result.currentRemaining) > 0 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Expiration Risk</h2>
        <div className="text-sm font-semibold text-red-700">{result.expirationRisk}</div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Carryover Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Track all carryovers annually</li>
          <li>Monitor expiration dates</li>
          <li>Accelerate utilization near expiration</li>
          <li>Document usage on appropriate forms</li>
          <li>Consider income acceleration strategies</li>
          <li>Coordinate with tax planning</li>
          <li>Business vs individual rules differ</li>
          <li>Ownership changes affect NOL (Section 382)</li>
          <li>State carryover rules may differ</li>
          <li>Review carryover statements from prior years</li>
        </ul>
      </div>
    </div>
  )
}