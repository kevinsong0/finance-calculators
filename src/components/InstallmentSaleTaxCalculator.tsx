'use client'

import { useState } from 'react'

export default function InstallmentSaleTaxCalculator() {
  const [salePrice, setSalePrice] = useState(500000)
  const [adjustedBasis, setAdjustedBasis] = useState(300000)
  const [totalGain, setTotalGain] = useState(200000)
  const [paymentsPerYear, setPaymentsPerYear] = useState(1)
  const [paymentAmount, setPaymentAmount] = useState(100000)
  const [saleYear, setSaleYear] = useState(2024)
  const [totalPayments, setTotalPayments] = useState(5)
  const [assetType, setAssetType] = useState<'realEstate' | 'business' | 'investment'>('realEstate')
  const [isDepreciationRecapture, setIsDepreciationRecapture] = useState(false)
  const [depreciationRecapture, setDepreciationRecapture] = useState(50000)
  const [interestRate, setInterestRate] = useState(6)

  const calculate = () => {
    // Installment Sale Tax Calculator (Form 6252)
    // Spread capital gain tax over multiple years

    // Rules:
    // - Gross profit ratio = Total Gain / Contract Price
    // - Each payment taxed proportionally
    // - Interest on payments taxed as ordinary income
    // - Depreciation recapture taxed in year 1 (not spread)

    const contractPrice = salePrice
    const grossProfit = totalGain
    const grossProfitRatio = grossProfit / contractPrice

    // Depreciation recapture must be recognized in year 1
    // Cannot be spread over installment payments
    const recaptureInYear1 = isDepreciationRecapture ? depreciationRecapture : 0
    const gainAvailableForInstallment = totalGain - recaptureInYear1
    const adjustedGrossProfitRatio = gainAvailableForInstallment / contractPrice

    // Calculate payments
    const payments: { year: number; payment: number; principal: number; interest: number; gainRecognized: number; tax: number }[] = []
    let remainingPrincipal = salePrice
    let totalGainRecognized = 0

    for (let i = 0; i < totalPayments; i++) {
      const year = saleYear + i
      const payment = paymentAmount

      // Interest portion
      const interest = remainingPrincipal * (interestRate / 100)
      const principal = payment - interest

      // Gain recognized (gross profit ratio)
      const gainRecognized = principal * adjustedGrossProfitRatio
      totalGainRecognized += gainRecognized

      // Tax (15% capital gain rate + interest tax)
      const capitalGainTax = gainRecognized * 0.15
      const interestTax = interest * 0.24 // Ordinary rate
      const totalPaymentTax = capitalGainTax + interestTax

      payments.push({
        year,
        payment: payment,
        principal: Math.max(0, principal),
        interest: Math.max(0, interest),
        gainRecognized: gainRecognized,
        tax: totalPaymentTax,
      })

      remainingPrincipal -= principal
    }

    // Add depreciation recapture to year 1
    if (recaptureInYear1 > 0 && payments.length > 0) {
      payments[0].tax += recaptureInYear1 * 0.25 // Unrecaptured 1250 rate
    }

    // Total taxes
    const totalTax = payments.reduce((sum, p) => sum + p.tax, 0)
    const totalPaymentsReceived = payments.reduce((sum, p) => sum + p.payment, 0)
    const totalInterestReceived = payments.reduce((sum, p) => sum + p.interest, 0)

    // Compare to lump sum sale
    const lumpSumTax = totalGain * 0.15 + recaptureInYear1 * 0.25
    const taxDeferralBenefit = lumpSumTax - payments[0]?.tax || 0

    // Gross profit ratio percentage
    const gpRatioPercent = grossProfitRatio * 100

    // Eligibility rules
    const eligibilityRules = {
      eligible: 'Most property sales qualify except inventory, marketable securities',
      ineligible: 'Inventory, stocks/bonds publicly traded, depreciation recapture',
      limitation: 'Depreciation recapture cannot be spread - taxed in year 1',
    }

    // Recommendations
    let recommendation = ''
    if (totalPayments > 3) {
      recommendation = `Installment sale spreads tax over ${totalPayments} years, deferring $${taxDeferralBenefit.toFixed(0)} in taxes. Consider time value of money.`
    } else if (isDepreciationRecapture) {
      recommendation = `Depreciation recapture $${recaptureInYear1.toFixed(0)} taxed in year 1. Remaining gain spread over installments.`
    } else {
      recommendation = 'Installment method provides tax deferral and potentially lower effective tax rate over time.'
    }

    // Risks
    const risks: string[] = []
    risks.push('Buyer default risk - may not receive all payments')
    risks.push('Interest taxed as ordinary income')
    risks.push('Tax rates may change in future years')
    risks.push('State tax treatment may differ')
    if (assetType === 'realEstate') {
      risks.push('Real estate market fluctuations')
    }

    // Benefits
    const benefits: string[] = []
    benefits.push('Spread capital gain over multiple years')
    benefits.push('Potential for lower tax brackets each year')
    benefits.push('Time value of money advantage')
    benefits.push('Interest income on deferred payments')
    benefits.push('Flexibility in timing income recognition')

    return {
      salePrice: salePrice.toFixed(0),
      adjustedBasis: adjustedBasis.toFixed(0),
      totalGain: totalGain.toFixed(0),
      contractPrice: contractPrice.toFixed(0),
      grossProfit: grossProfit.toFixed(0),
      grossProfitRatio: grossProfitRatio.toFixed(3),
      gpRatioPercent: gpRatioPercent.toFixed(1),
      paymentsPerYear: paymentsPerYear.toFixed(0),
      paymentAmount: paymentAmount.toFixed(0),
      totalPayments: totalPayments.toFixed(0),
      saleYear: saleYear.toFixed(0),
      assetType,
      isDepreciationRecapture,
      depreciationRecapture: depreciationRecapture.toFixed(0),
      recaptureInYear1: recaptureInYear1.toFixed(0),
      gainAvailableForInstallment: gainAvailableForInstallment.toFixed(0),
      adjustedGrossProfitRatio: adjustedGrossProfitRatio.toFixed(3),
      interestRate: interestRate.toFixed(0),
      payments,
      totalTax: totalTax.toFixed(0),
      totalPaymentsReceived: totalPaymentsReceived.toFixed(0),
      totalInterestReceived: totalInterestReceived.toFixed(0),
      lumpSumTax: lumpSumTax.toFixed(0),
      taxDeferralBenefit: taxDeferralBenefit.toFixed(0),
      eligibilityRules,
      recommendation,
      risks,
      benefits,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Installment Sale Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Spread capital gain tax over multiple years with installment method.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Sale Price</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adjusted Basis</label>
          <input type="number" value={adjustedBasis} onChange={(e) => setAdjustedBasis(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Gain</label>
          <input type="number" value={totalGain} onChange={(e) => setTotalGain(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Amount</label>
          <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Payments</label>
          <input type="number" value={totalPayments} min="1" max="30" onChange={(e) => setTotalPayments(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" value={interestRate} min="0" max="15" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Type</label>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value as 'realEstate' | 'business' | 'investment')} className="w-full border rounded p-2">
            <option value="realEstate">Real Estate</option>
            <option value="business">Business Interest</option>
            <option value="investment">Investment Property</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Depreciation Recapture?</label>
          <select value={isDepreciationRecapture ? 'yes' : 'no'} onChange={(e) => setIsDepreciationRecapture(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - no recapture</option>
            <option value="yes">Yes - has recapture</option>
          </select>
        </div>
        {isDepreciationRecapture && (
          <div>
            <label className="block text-sm font-medium mb-1">Recapture Amount</label>
            <input type="number" value={depreciationRecapture} onChange={(e) => setDepreciationRecapture(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Gross Profit Ratio</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Contract Price:</span><span className="font-medium ml-2">$ {result.contractPrice}</span></div>
          <div><span className="text-zinc-600">Gross Profit:</span><span className="font-bold text-green-700 ml-2">$ {result.grossProfit}</span></div>
          <div><span className="text-zinc-600">Ratio:</span><span className="font-bold ml-2">{result.gpRatioPercent}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each payment taxed at this ratio as capital gain.</div>
      </div>

      {isDepreciationRecapture && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-orange-700">Depreciation Recapture (Year 1)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Recapture Amount:</span><span className="font-bold text-orange-700 ml-2">$ {result.depreciationRecapture}</span></div>
            <div><span className="text-zinc-600">Remaining for Installment:</span><span className="font-medium ml-2">$ {result.gainAvailableForInstallment}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Depreciation recapture cannot be spread - taxed entirely in year 1.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Payment</th>
                <th className="py-2 text-left">Principal</th>
                <th className="py-2 text-left">Interest</th>
                <th className="py-2 text-left">Gain</th>
                <th className="py-2 text-left">Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.payments.map((p) => (
                <tr key={p.year} className="border-b">
                  <td className="py-1">{p.year}</td>
                  <td className="py-1">$ {p.payment.toFixed(0)}</td>
                  <td className="py-1">$ {p.principal.toFixed(0)}</td>
                  <td className="py-1">$ {p.interest.toFixed(0)}</td>
                  <td className="py-1">$ {p.gainRecognized.toFixed(0)}</td>
                  <td className="py-1 font-semibold">$ {p.tax.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Interest taxed as ordinary income. Principal portion taxed as capital gain.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Payments:</span><span className="font-medium ml-2">$ {result.totalPaymentsReceived}</span></div>
          <div><span className="text-zinc-600">Total Interest:</span><span className="font-medium ml-2">$ {result.totalInterestReceived}</span></div>
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Lump Sum Tax:</span><span className="font-medium ml-2">$ {result.lumpSumTax}</span></div>
          <div><span className="text-zinc-600">Year 1 Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.payments[0]?.tax.toFixed(0) || 0}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Deferral Benefit</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Deferred to Future:</span><span className="font-bold text-green-700 ml-2">$ {(Number(result.lumpSumTax) - (result.payments[0]?.tax || 0)).toFixed(0)}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Eligibility Rules</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Eligible:</span> {result.eligibilityRules.eligible}</div>
          <div><span className="font-semibold">Ineligible:</span> {result.eligibilityRules.ineligible}</div>
          <div><span className="font-semibold">Limitation:</span> {result.eligibilityRules.limitation}</div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Benefits</h2>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Risks & Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
          <li>Form 6252 for reporting</li>
          <li>Elect installment method annually</li>
          <li>Gross profit ratio stays fixed</li>
          <li>Interest required by IRS rules</li>
        </ul>
      </div>
    </div>
  )
}