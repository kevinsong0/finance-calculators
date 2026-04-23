'use client'

import { useState } from 'react'

export default function OfferInCompromiseCalculator() {
  const [totalDebt, setTotalDebt] = useState(50000)
  const [annualIncome, setAnnualIncome] = useState(60000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000)
  const [assetValue, setAssetValue] = useState(20000)
  const [age, setAge] = useState(45)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    const monthlyIncome = annualIncome / 12
    const discretionaryIncome = monthlyIncome - monthlyExpenses
    const netWorth = assetValue

    const monthlyMultiplier = age >= 65 ? 20 : filingStatus === 'married' ? 12 : 48
    const assetMultiplier = 80

    const incomeComponent = Math.max(0, discretionaryIncome) * monthlyMultiplier
    const assetComponent = netWorth * (assetMultiplier / 100)

    const lumpSumOffer = incomeComponent + assetComponent
    const periodicOffer = Math.max(0, discretionaryIncome) * 24 + assetComponent
    const deferredOffer = Math.max(0, discretionaryIncome) * 60

    const minimumOffer = Math.min(lumpSumOffer, totalDebt)
    const savingsPercentage = totalDebt > 0 ? ((totalDebt - minimumOffer) / totalDebt) * 100 : 0

    const eligibilityThreshold = 10000
    const eligibleForOIC = totalDebt >= eligibilityThreshold && discretionaryIncome > 0 || assetValue > 0

    const doubtAsToLiability = false
    const doubtAsToCollectibility = totalDebt > minimumOffer
    const effectiveTaxAdministration = age >= 65 && totalDebt > annualIncome

    const applicationFee = 205
    const nonRefundablePayment = Math.min(205, minimumOffer)

    return {
      totalDebt: totalDebt.toFixed(2),
      annualIncome: annualIncome.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      monthlyExpenses: monthlyExpenses.toFixed(2),
      discretionaryIncome: discretionaryIncome.toFixed(2),
      assetValue: assetValue.toFixed(2),
      age: age.toFixed(0),
      filingStatus,
      monthlyMultiplier: monthlyMultiplier.toFixed(0),
      assetMultiplier: assetMultiplier.toFixed(0),
      incomeComponent: incomeComponent.toFixed(2),
      assetComponent: assetComponent.toFixed(2),
      lumpSumOffer: lumpSumOffer.toFixed(2),
      periodicOffer: periodicOffer.toFixed(2),
      deferredOffer: deferredOffer.toFixed(2),
      minimumOffer: minimumOffer.toFixed(2),
      savingsPercentage: savingsPercentage.toFixed(2),
      eligibleForOIC,
      doubtAsToCollectibility,
      effectiveTaxAdministration,
      applicationFee: applicationFee.toFixed(2),
      nonRefundablePayment: nonRefundablePayment.toFixed(2),
      canAffordLumpSum: discretionaryIncome * 6 >= lumpSumOffer,
      recommendOIC: totalDebt > lumpSumOffer * 1.5,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Offer in Compromise Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRS Offer in Compromise amount to settle tax debt for less.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt ($)</label>
          <input
            type="number"
            value={totalDebt}
            onChange={(e) => setTotalDebt(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Allowable Expenses ($)</label>
          <input
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Value (net) ($)</label>
          <input
            type="number"
            value={assetValue}
            onChange={(e) => setAssetValue(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Financial Situation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Debt:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.totalDebt}</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly Income:</span>
            <span className="font-medium ml-2">$ {result.monthlyIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly Expenses:</span>
            <span className="font-medium ml-2">$ {result.monthlyExpenses}</span>
          </div>
          <div>
            <span className="text-zinc-600">Discretionary Income:</span>
            <span className="font-medium ml-2">$ {result.discretionaryIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Assets:</span>
            <span className="font-medium ml-2">$ {result.assetValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Age:</span>
            <span className="font-medium ml-2">{result.age}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Offer Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Income Multiplier ({result.monthlyMultiplier} months):</span>
            <span className="font-medium ml-2">$ {result.incomeComponent}</span>
          </div>
          <div>
            <span className="text-zinc-600">Asset Component (80%):</span>
            <span className="font-medium ml-2">$ {result.assetComponent}</span>
          </div>
          <div>
            <span className="text-zinc-600">Lump Sum Offer:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.lumpSumOffer}</span>
          </div>
          <div>
            <span className="text-zinc-600">Periodic Payment Offer:</span>
            <span className="font-medium ml-2">$ {result.periodicOffer}</span>
          </div>
          <div>
            <span className="text-zinc-600">Deferred Offer (5 years):</span>
            <span className="font-medium ml-2">$ {result.deferredOffer}</span>
          </div>
          <div>
            <span className="text-zinc-600">Minimum Offer:</span>
            <span className="font-bold ml-2">$ {result.minimumOffer}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.savingsPercentage) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Potential Savings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Debt Settlement:</span>
              <span className="font-bold text-orange-700 ml-2">$ {result.minimumOffer}</span>
            </div>
            <div>
              <span className="text-zinc-600">Savings:</span>
              <span className="font-bold text-green-700 ml-2">{result.savingsPercentage}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Eligibility & Fees</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">OIC Eligible:</span>
            <span className={`font-bold ml-2 ${result.eligibleForOIC ? 'text-green-600' : 'text-red-600'}`}>
              {result.eligibleForOIC ? 'Likely' : 'Check Requirements'}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Application Fee:</span>
            <span className="font-medium ml-2">$ {result.applicationFee}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">OIC Types</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Doubt as to Liability:</strong> Dispute tax amount owed (requires evidence)</li>
          <li><strong>Doubt as to Collectibility:</strong> Cannot pay full amount (most common type)</li>
          <li><strong>Effective Tax Administration:</strong> Special circumstances (age, disability, hardship)</li>
          <li><strong>Lump Sum:</strong> Pay within 5 months of acceptance (20% with application)</li>
          <li><strong>Periodic Payment:</strong> Pay in installments over 6-24 months</li>
          <li><strong>Deferred Payment:</strong> Pay over remaining collection statute (5 years)</li>
        </ul>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mt-4">
        <h3 className="font-medium mb-2 text-orange-700">OIC Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>All tax returns filed</li>
          <li>Not in bankruptcy</li>
          <li>Current on estimated tax payments</li>
          <li>Employer tax deposits current (if applicable)</li>
          <li>Form 433-A (OIC) financial disclosure</li>
          <li>$205 application fee (low income waiver available)</li>
          <li>Non-refundable payment with application</li>
        </ul>
      </div>
    </div>
  )
}