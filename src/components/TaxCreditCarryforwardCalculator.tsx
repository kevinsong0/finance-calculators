'use client'

import { useState } from 'react'

export default function TaxCreditCarryforwardCalculator() {
  const [creditType, setCreditType] = useState<'business' | 'foreign' | 'general' | 'capital_loss'>('business')
  const [creditAmount, setCreditAmount] = useState(50000)
  const [carryforwardYears, setCarryforwardYears] = useState(20)
  const [currentYearTaxLiability, setCurrentYearTaxLiability] = useState(30000)
  const [priorYearCredits, setPriorYearCredits] = useState(10000)
  const [creditExpirationYear, setCreditExpirationYear] = useState(2024)

  const calculate = () => {
    // Tax Credit Carryforward Rules
    // Different credits have different carryforward periods

    // Business credits: 20 years carryforward, 1 year back (general)
    // Foreign tax credit: 10 years back, 1 year forward
    // General business credit: 20 years forward
    // Capital loss: unlimited carryforward (corporations)

    // Credit utilization strategy
    // Use oldest credits first (expiration priority)
    // Maximize utilization before expiration

    const creditLimits: Record<string, {
      carrybackYears: number;
      carryforwardYears: number;
      expirationRule: string;
    }> = {
      business: { carrybackYears: 1, carryforwardYears: 20, expirationRule: 'Expires after 20 years' },
      foreign: { carrybackYears: 10, carryforwardYears: 1, expirationRule: 'Expires after 1 year forward' },
      general: { carrybackYears: 1, carryforwardYears: 20, expirationRule: 'Expires after 20 years' },
      capital_loss: { carrybackYears: 3, carryforwardYears: 99, expirationRule: 'Unlimited carryforward' },
    }

    const creditInfo = creditLimits[creditType] || creditLimits['general']

    // Current year utilization
    const currentYearUtilization = Math.min(creditAmount, currentYearTaxLiability)
    const currentYearRemaining = creditAmount - currentYearUtilization

    // Total credits available (including prior)
    const totalCreditsAvailable = creditAmount + priorYearCredits
    const totalUtilization = Math.min(totalCreditsAvailable, currentYearTaxLiability)
    const totalRemaining = totalCreditsAvailable - totalUtilization

    // Years remaining for carryforward
    const yearsUntilExpiration = creditType === 'capital_loss' ? 99 : creditInfo.carryforwardYears

    // Projected expiration
    const expirationYear = creditExpirationYear + yearsUntilExpiration

    // Optimal utilization strategy
    // Use expiring credits first
    let recommendedUtilization = 0
    let expiringCreditRisk = 0

    if (priorYearCredits > 0) {
      // Assume prior credits are older, use first
      recommendedUtilization = Math.min(priorYearCredits, currentYearTaxLiability)
      if (priorYearCredits > currentYearTaxLiability) {
        expiringCreditRisk = priorYearCredits - currentYearTaxLiability
      }
    }

    // Annual utilization projection
    const annualUtilizationRate = currentYearTaxLiability > 0 ?
      Math.min(1, creditAmount / currentYearTaxLiability) : 0

    // Years to fully utilize
    const yearsToFullyUtilize = Math.ceil(totalRemaining / currentYearTaxLiability)

    // Expiration risk calculation
    const willCreditsExpire = yearsToFullyUtilize > yearsUntilExpiration
    const expiredCreditAmount = willCreditsExpire ?
      Math.max(0, totalRemaining - (currentYearTaxLiability * yearsUntilExpiration)) : 0

    // Tax savings estimate
    // Assume credit is dollar-for-dollar reduction
    const taxSavingsCurrentYear = totalUtilization
    const taxSavingsPotential = totalCreditsAvailable

    return {
      creditType,
      creditAmount: creditAmount.toFixed(0),
      carryforwardYears: creditInfo.carryforwardYears.toFixed(0),
      carrybackYears: creditInfo.carrybackYears.toFixed(0),
      expirationRule: creditInfo.expirationRule,
      currentYearTaxLiability: currentYearTaxLiability.toFixed(0),
      priorYearCredits: priorYearCredits.toFixed(0),
      creditExpirationYear: creditExpirationYear.toFixed(0),
      currentYearUtilization: currentYearUtilization.toFixed(0),
      currentYearRemaining: currentYearRemaining.toFixed(0),
      totalCreditsAvailable: totalCreditsAvailable.toFixed(0),
      totalUtilization: totalUtilization.toFixed(0),
      totalRemaining: totalRemaining.toFixed(0),
      yearsUntilExpiration: yearsUntilExpiration.toFixed(0),
      expirationYear: expirationYear.toFixed(0),
      recommendedUtilization: recommendedUtilization.toFixed(0),
      expiringCreditRisk: expiringCreditRisk.toFixed(0),
      yearsToFullyUtilize: yearsToFullyUtilize.toFixed(0),
      willCreditsExpire,
      expiredCreditAmount: expiredCreditAmount.toFixed(0),
      taxSavingsCurrentYear: taxSavingsCurrentYear.toFixed(0),
      taxSavingsPotential: taxSavingsPotential.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Credit Carryforward Calculator</h1>
      <p className="text-gray-600 mb-4">Track and optimize tax credit carryforward utilization.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Credit Type</label>
          <select value={creditType} onChange={(e) => setCreditType(e.target.value as 'business' | 'foreign' | 'general' | 'capital_loss')} className="w-full border rounded p-2">
            <option value="business">Business Tax Credit</option>
            <option value="foreign">Foreign Tax Credit</option>
            <option value="general">General Business Credit</option>
            <option value="capital_loss">Capital Loss (Corp)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Credit Amount</label>
          <input type="number" value={creditAmount} onChange={(e) => setCreditAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Year Tax Liability</label>
          <input type="number" value={currentYearTaxLiability} onChange={(e) => setCurrentYearTaxLiability(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Carryforward</label>
          <input type="number" value={priorYearCredits} onChange={(e) => setPriorYearCredits(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credit Generation Year</label>
          <input type="number" value={creditExpirationYear} min="2020" max="2030" onChange={(e) => setCreditExpirationYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Carryforward Rules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Credit Type:</span><span className="font-medium ml-2">{result.creditType}</span></div>
          <div><span className="text-zinc-600">Carryforward:</span><span className="font-bold text-blue-700 ml-2">{result.carryforwardYears} years</span></div>
          <div><span className="text-zinc-600">Carryback:</span><span className="font-medium ml-2">{result.carrybackYears} years</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.expirationRule}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Credits Available</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">New Credit:</span><span className="font-medium ml-2">$ {result.creditAmount}</span></div>
          <div><span className="text-zinc-600">Prior Credits:</span><span className="font-medium ml-2">$ {result.priorYearCredits}</span></div>
          <div><span className="text-zinc-600">Total Available:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalCreditsAvailable}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Combine new credits with prior year carryforwards.</div>
      </div>

      <div className={`card mb-6 ${Number(result.totalRemaining) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.totalRemaining) > 0 ? 'text-orange-700' : 'text-green-700'}`}>Current Year Utilization</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax Liability:</span><span className="font-medium ml-2">$ {result.currentYearTaxLiability}</span></div>
          <div><span className="text-zinc-600">Credits Used:</span><span className="font-bold text-green-700 ml-2">$ {result.totalUtilization}</span></div>
          <div><span className="text-zinc-600">Remaining:</span><span className={`font-bold ml-2 ${Number(result.totalRemaining) > 0 ? 'text-orange-700' : 'text-green-700'}`}>$ {result.totalRemaining}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Credits reduce tax liability dollar-for-dollar.</div>
      </div>

      <div className={`card mb-6 ${result.willCreditsExpire ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.willCreditsExpire ? 'text-red-700' : 'text-green-700'}`}>Expiration Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Years to Expiration:</span><span className="font-medium ml-2">{result.yearsUntilExpiration}</span></div>
          <div><span className="text-zinc-600">Years to Utilize:</span><span className="font-medium ml-2">{result.yearsToFullyUtilize}</span></div>
          <div><span className="text-zinc-600">Expiration Year:</span><span className="font-medium ml-2">{result.expirationYear}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Expiry Risk:</span><span className={`font-bold ml-2 ${result.willCreditsExpire ? 'text-red-700' : 'text-green-700'}`}>{result.willCreditsExpire ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Expired Amount:</span><span className={`font-bold ml-2 ${Number(result.expiredCreditAmount) > 0 ? 'text-red-700' : 'text-green-700'}`}>$ {result.expiredCreditAmount}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Use oldest credits first to prevent expiration loss.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Savings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">This Year:</span><span className="font-bold text-teal-700 ml-2">$ {result.taxSavingsCurrentYear}</span></div>
          <div><span className="text-zinc-600">Potential Total:</span><span className="font-bold text-teal-700 ml-2">$ {result.taxSavingsPotential}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Maximize utilization to capture full tax savings potential.</div>
      </div>

      {Number(result.expiringCreditRisk) > 0 && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Expiration Risk Alert</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Prior Credits at Risk:</span><span className="font-bold text-red-700 ml-2">$ {result.expiringCreditRisk}</span></div>
            <div><span className="text-zinc-600">Recommended Use:</span><span className="font-bold text-orange-700 ml-2">$ {result.recommendedUtilization}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Prior year credits may expire. Increase utilization this year.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Carryforward Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Business credit: 20 years forward</li>
          <li>Foreign tax credit: 1 year forward</li>
          <li>Capital loss: unlimited (corps)</li>
          <li>Use oldest credits first</li>
          <li>Track expiration dates</li>
          <li>File Form 3800 (business)</li>
          <li>Carryback option available</li>
          <li>Plan utilization strategically</li>
          <li>Expired credits lost forever</li>
          <li>Review annually for optimization</li>
        </ul>
      </div>
    </div>
  )
}