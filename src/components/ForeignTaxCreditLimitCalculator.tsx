'use client'

import { useState } from 'react'

export default function ForeignTaxCreditLimitCalculator() {
  const [foreignIncome, setForeignIncome] = useState(100000)
  const [foreignTaxPaid, setForeignTaxPaid] = useState(25000)
  const [foreignTaxCountry, setForeignTaxCountry] = useState('UK')
  const [usTaxBeforeCredit, setUsTaxBeforeCredit] = useState(30000)
  const [totalWorldwideIncome, setTotalWorldwideIncome] = useState(200000)
  const [incomeType, setIncomeType] = useState<'general' | 'passive' | 'generalPassive'>('general')
  const [carryoverFromPrior, setCarryoverFromPrior] = useState(5000)
  const [taxYear, setTaxYear] = useState(2024)

  const calculate = () => {
    // Foreign Tax Credit Limit Calculator
    // Form 1116 calculation

    // FTC Limit = (Foreign Source Taxable Income / Worldwide Taxable Income) × US Tax
    // Cannot exceed foreign tax actually paid

    // Separate baskets:
    // - General category (active business income)
    // - Passive category (interest, dividends, royalties)
    // - General + passive (simplified if under threshold)

    const worldwideIncome = totalWorldwideIncome
    const usTax = usTaxBeforeCredit

    // Foreign Tax Credit Limit
    const foreignIncomeRatio = foreignIncome / worldwideIncome
    const ftcLimit = foreignIncomeRatio * usTax

    // Actual credit allowed
    const creditAllowed = Math.min(ftcLimit, foreignTaxPaid)

    // Excess foreign tax (carryover)
    const excessForeignTax = foreignTaxPaid - creditAllowed

    // Unused credit from prior years
    const totalCarryoverAvailable = carryoverFromPrior

    // Total credit used this year
    const totalCreditUsed = Math.min(creditAllowed + totalCarryoverAvailable, ftcLimit)

    // Remaining carryover to future
    const remainingCarryover = totalCarryoverAvailable - (totalCreditUsed - creditAllowed)

    // New carryover generated
    const newCarryoverGenerated = excessForeignTax

    // Total carryover after this year
    const totalCarryoverAfterYear = remainingCarryover + newCarryoverGenerated

    // Tax savings
    const taxSavings = totalCreditUsed

    // Effective foreign tax rate
    const effectiveForeignRate = (foreignTaxPaid / foreignIncome) * 100
    const usEffectiveRateOnForeign = (creditAllowed / foreignIncome) * 100

    // Double taxation remaining
    const doubleTaxRemaining = foreignTaxPaid - creditAllowed

    // Carryback/carryforward rules
    // FTC carryover: 1 year back, 10 years forward
    const carryoverRules = {
      carryback: '1 year',
      carryforward: '10 years',
      expiration: `Carryover expires after 10 years from generation`,
    }

    // Basket-specific calculations
    let basketAnalysis = null
    if (incomeType === 'generalPassive') {
      // Simplified: combine baskets if foreign income under certain threshold
      basketAnalysis = {
        type: 'Simplified (combined baskets)',
        note: 'Can use simplified foreign tax credit calculation if qualifying',
      }
    } else {
      basketAnalysis = {
        type: incomeType === 'general' ? 'General Category (Form 1116)' : 'Passive Category (Form 1116)',
        note: incomeType === 'general'
          ? 'Active business income, certain royalties'
          : 'Interest, dividends, passive royalties, rents',
      }
    }

    // High tax kick-out
    // If foreign tax rate exceeds US rate on that income, may elect to not claim FTC
    // and instead deduct foreign taxes
    const highTaxKickOut = effectiveForeignRate > (usTax / worldwideIncome) * 100
    const kickOutAnalysis = highTaxKickOut
      ? 'Foreign tax rate exceeds US rate - consider deduction instead of credit'
      : 'Credit more beneficial than deduction'

    // Recommendations
    let recommendation = ''
    if (excessForeignTax > 0) {
      recommendation = `Excess foreign tax $${excessForeignTax.toFixed(0)} will carryforward 10 years`
    } else if (ftcLimit < foreignTaxPaid) {
      recommendation = `Credit limited to $${ftcLimit.toFixed(0)} by ratio. Excess carries forward.`
    } else {
      recommendation = `Full foreign tax credit of $${foreignTaxPaid.toFixed(0)} allowed`
    }

    // Deduction vs credit comparison
    const deductionBenefit = foreignTaxPaid * 0.24 // Simplified at marginal rate
    const creditBenefit = creditAllowed
    const preferredMethod = creditBenefit > deductionBenefit ? 'Credit' : 'Deduction'

    // Foreign tax credit reduction for certain income
    // GILTI, Subpart F, etc. have special rules
    const specialRulesNote = 'GILTI, Subpart F income have separate FTC baskets and special rules'

    return {
      foreignIncome: foreignIncome.toFixed(0),
      foreignTaxPaid: foreignTaxPaid.toFixed(0),
      foreignTaxCountry,
      usTaxBeforeCredit: usTaxBeforeCredit.toFixed(0),
      totalWorldwideIncome: worldwideIncome.toFixed(0),
      incomeType,
      taxYear: taxYear.toFixed(0),
      foreignIncomeRatio: foreignIncomeRatio.toFixed(3),
      ftcLimit: ftcLimit.toFixed(0),
      creditAllowed: creditAllowed.toFixed(0),
      excessForeignTax: excessForeignTax.toFixed(0),
      carryoverFromPrior: carryoverFromPrior.toFixed(0),
      totalCreditUsed: totalCreditUsed.toFixed(0),
      remainingCarryover: remainingCarryover.toFixed(0),
      newCarryoverGenerated: newCarryoverGenerated.toFixed(0),
      totalCarryoverAfterYear: totalCarryoverAfterYear.toFixed(0),
      taxSavings: taxSavings.toFixed(0),
      effectiveForeignRate: effectiveForeignRate.toFixed(1),
      usEffectiveRateOnForeign: usEffectiveRateOnForeign.toFixed(1),
      doubleTaxRemaining: doubleTaxRemaining.toFixed(0),
      carryoverRules,
      basketAnalysis,
      highTaxKickOut,
      kickOutAnalysis,
      recommendation,
      deductionBenefit: deductionBenefit.toFixed(0),
      creditBenefit: creditBenefit.toFixed(0),
      preferredMethod,
      specialRulesNote,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Foreign Tax Credit Limit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate Form 1116 foreign tax credit limit and carryover.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Foreign Source Income</label>
          <input type="number" value={foreignIncome} onChange={(e) => setForeignIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Foreign Tax Paid</label>
          <input type="number" value={foreignTaxPaid} onChange={(e) => setForeignTaxPaid(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">US Tax Before FTC</label>
          <input type="number" value={usTaxBeforeCredit} onChange={(e) => setUsTaxBeforeCredit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Worldwide Income</label>
          <input type="number" value={totalWorldwideIncome} onChange={(e) => setTotalWorldwideIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Income Type (Basket)</label>
          <select value={incomeType} onChange={(e) => setIncomeType(e.target.value as 'general' | 'passive' | 'generalPassive')} className="w-full border rounded p-2">
            <option value="general">General Category (active business)</option>
            <option value="passive">Passive Category (interest/dividends)</option>
            <option value="generalPassive">Simplified (combined)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">FTC Carryover from Prior Years</label>
          <input type="number" value={carryoverFromPrior} onChange={(e) => setCarryoverFromPrior(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Foreign Tax Credit Limit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Foreign Income Ratio:</span><span className="font-medium ml-2">{result.foreignIncomeRatio}</span></div>
          <div><span className="text-zinc-600">FTC Limit:</span><span className="font-bold text-blue-700 ml-2">$ {result.ftcLimit}</span></div>
          <div><span className="text-zinc-600">Foreign Tax Paid:</span><span className="font-medium ml-2">$ {result.foreignTaxPaid}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Credit Allowed:</span><span className="font-bold text-green-700 ml-2">$ {result.creditAllowed}</span></div>
          <div><span className="text-zinc-600">Excess Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.excessForeignTax}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FTC Limit = (Foreign Income / Worldwide Income) × US Tax</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">FTC Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Prior Carryover:</span><span className="font-medium ml-2">$ {result.carryoverFromPrior}</span></div>
          <div><span className="text-zinc-600">Total Credit Used:</span><span className="font-bold text-purple-700 ml-2">$ {result.totalCreditUsed}</span></div>
          <div><span className="text-zinc-600">Tax Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavings}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Remaining Carryover:</span><span className="font-medium ml-2">$ {result.remainingCarryover}</span></div>
          <div><span className="text-zinc-600">New Carryover:</span><span className="font-bold text-orange-700 ml-2">$ {result.newCarryoverGenerated}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Carryover Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Prior Carryover:</span><span className="font-medium ml-2">$ {result.carryoverFromPrior}</span></div>
          <div><span className="text-zinc-600">New Generated:</span><span className="font-medium ml-2">$ {result.newCarryoverGenerated}</span></div>
          <div><span className="text-zinc-600">Used This Year:</span><span className="font-medium ml-2">$ {Number(result.totalCreditUsed) - Number(result.creditAllowed)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total After Year:</span><span className="font-bold ml-2">$ {result.totalCarryoverAfterYear}</span></div>
          <div><span className="text-zinc-600">Expiration:</span><span className="font-medium ml-2">{result.carryoverRules.expiration}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Rate Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Foreign Rate:</span><span className="font-bold ml-2">{result.effectiveForeignRate}%</span></div>
          <div><span className="text-zinc-600">US Rate on Foreign:</span><span className="font-medium ml-2">{result.usEffectiveRateOnForeign}%</span></div>
          <div><span className="text-zinc-600">Double Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.doubleTaxRemaining}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.kickOutAnalysis}</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Credit vs Deduction</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Credit Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.creditBenefit}</span></div>
          <div><span className="text-zinc-600">Deduction Benefit:</span><span className="font-medium ml-2">$ {result.deductionBenefit}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">Recommended: <span className="font-bold">{result.preferredMethod}</span></div>
      </div>

      <div className={`card mb-6 ${Number(result.excessForeignTax) > 0 ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Basket Type:</span><span className="font-medium ml-2">{result.basketAnalysis?.type}</span></div>
          <div><span className="text-zinc-600">Country:</span><span className="font-medium ml-2">{result.foreignTaxCountry}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
        <div className="text-xs text-zinc-600 mt-1">{result.basketAnalysis?.note}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Foreign Tax Credit Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Form 1116 for foreign tax credit</li>
          <li>Limit = ratio × US tax</li>
          <li>Separate baskets required</li>
          <li>General vs passive category</li>
          <li>Carryover: 1 back, 10 forward</li>
          <li>Credit usually beats deduction</li>
          <li>High tax kick-out rule</li>
          <li>GILTI has special rules</li>
          <li>Track carryover expiration</li>
          <li>Foreign tax must be legal liability</li>
        </ul>
      </div>
    </div>
  )
}