'use client'

import { useState } from 'react'

export default function VaLoanVsConventionalCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(0)
  const [conventionalRate, setConventionalRate] = useState(6.5)
  const [vaRate, setVaRate] = useState(6.0)
  const [creditScore, setCreditScore] = useState(720)
  const [loanTerm, setLoanTerm] = useState(30)
  const [serviceType, setServiceType] = useState<'active' | 'guard' | 'survivor'>('active')
  const [fundingFeeExempt, setFundingFeeExempt] = useState(false)
  const [firstTimeUse, setFirstTimeUse] = useState(true)

  const calculate = () => {
    // Down payment amount
    const downPayment = loanAmount * (downPaymentPercent / 100)
    const baseLoanAmount = loanAmount - downPayment

    // VA Funding Fee calculation
    let vaFundingFeeRate = 0
    if (fundingFeeExempt) {
      vaFundingFeeRate = 0 // Exempt for disabled veterans
    } else if (downPaymentPercent >= 10) {
      vaFundingFeeRate = firstTimeUse ? 0.015 : 0.0375 // Lower fee with 10%+ down
    } else if (downPaymentPercent >= 5) {
      vaFundingFeeRate = firstTimeUse ? 0.0175 : 0.04
    } else {
      vaFundingFeeRate = firstTimeUse ? 0.0225 : 0.0375 // 0% down, first time
    }

    const vaFundingFee = baseLoanAmount * vaFundingFeeRate
    const vaLoanAmount = baseLoanAmount + vaFundingFee // Fee can be financed

    // Conventional PMI calculations
    let pmiRate = 0
    if (downPaymentPercent >= 20) {
      pmiRate = 0
    } else if (creditScore >= 760 && downPaymentPercent >= 10) {
      pmiRate = 0.003
    } else if (creditScore >= 700 && downPaymentPercent >= 10) {
      pmiRate = 0.0045
    } else if (creditScore >= 680 && downPaymentPercent >= 5) {
      pmiRate = 0.006
    } else if (downPaymentPercent >= 5) {
      pmiRate = 0.0085
    } else {
      pmiRate = 0.011 // Lower credit or 0% down (very high)
    }

    const convMonthlyPmi = baseLoanAmount * pmiRate / 12
    const pmiDurationMonths = downPaymentPercent >= 20 ? 0 : Math.ceil((80 - downPaymentPercent) / 0.5)
    const convTotalPmi = convMonthlyPmi * pmiDurationMonths

    // Monthly payments
    const monthlyRateConv = conventionalRate / 100 / 12
    const monthlyRateVa = vaRate / 100 / 12
    const numPayments = loanTerm * 12

    const convPrincipalPayment = baseLoanAmount *
      (monthlyRateConv * Math.pow(1 + monthlyRateConv, numPayments)) /
      (Math.pow(1 + monthlyRateConv, numPayments) - 1)

    const vaPrincipalPayment = vaLoanAmount *
      (monthlyRateVa * Math.pow(1 + monthlyRateVa, numPayments)) /
      (Math.pow(1 + monthlyRateVa, numPayments) - 1)

    // Total monthly payments
    const convMonthlyPayment = convPrincipalPayment + convMonthlyPmi
    const vaMonthlyPayment = vaPrincipalPayment // No PMI/MIP

    // Total interest
    const convTotalInterest = (convPrincipalPayment * numPayments) - baseLoanAmount
    const vaTotalInterest = (vaPrincipalPayment * numPayments) - vaLoanAmount

    // Total cost comparison
    const convTotalCost = downPayment + convTotalInterest + convTotalPmi
    const vaTotalCost = downPayment + vaTotalInterest + vaFundingFee

    // VA loan limits (2024)
    const vaLoanLimit = 0 // No limit for most veterans with full entitlement
    const countyLimitExample = 807750 // Example county limit for partial entitlement

    // Recommendation
    let recommendation = ''
    let savings = 0
    if (vaTotalCost < convTotalCost) {
      savings = convTotalCost - vaTotalCost
      recommendation = `VA LOAN: Saves $${savings.toFixed(0)} over ${loanTerm} years. No PMI + lower rate.`
    } else {
      savings = vaTotalCost - convTotalCost
      recommendation = `CONVENTIONAL: Slightly lower cost by $${savings.toFixed(0)}. Consider VA for 0% down option.`
    }

    return {
      loanAmount: loanAmount.toFixed(0),
      downPaymentPercent: downPaymentPercent.toFixed(1),
      downPayment: downPayment.toFixed(0),
      baseLoanAmount: baseLoanAmount.toFixed(0),
      conventionalRate: conventionalRate.toFixed(2),
      vaRate: vaRate.toFixed(2),
      creditScore: creditScore.toFixed(0),
      serviceType,
      fundingFeeExempt,
      firstTimeUse,
      vaFundingFeeRate: (vaFundingFeeRate * 100).toFixed(2),
      vaFundingFee: vaFundingFee.toFixed(0),
      vaLoanAmount: vaLoanAmount.toFixed(0),
      pmiRate: (pmiRate * 100).toFixed(2),
      convMonthlyPmi: convMonthlyPmi.toFixed(2),
      pmiDurationMonths: pmiDurationMonths.toFixed(0),
      convTotalPmi: convTotalPmi.toFixed(0),
      convPrincipalPayment: convPrincipalPayment.toFixed(2),
      vaPrincipalPayment: vaPrincipalPayment.toFixed(2),
      convMonthlyPayment: convMonthlyPayment.toFixed(2),
      vaMonthlyPayment: vaMonthlyPayment.toFixed(2),
      convTotalInterest: convTotalInterest.toFixed(0),
      vaTotalInterest: vaTotalInterest.toFixed(0),
      convTotalCost: convTotalCost.toFixed(0),
      vaTotalCost: vaTotalCost.toFixed(0),
      recommendation,
      savings: savings.toFixed(0),
      loanTerm: loanTerm.toFixed(0),
      vaLoanLimit,
      countyLimitExample: countyLimitExample.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">VA Loan vs Conventional Calculator</h1>
      <p className="text-gray-600 mb-4">Compare VA loan benefits to conventional mortgages for eligible veterans.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Home Price ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Down Payment (%)</label>
          <input type="number" value={downPaymentPercent} step="0.5" min="0" max="20" onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Credit Score</label>
          <input type="number" value={creditScore} min="500" max="850" onChange={(e) => setCreditScore(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (years)</label>
          <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="30">30 years</option>
            <option value="20">20 years</option>
            <option value="15">15 years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conventional Rate (%)</label>
          <input type="number" value={conventionalRate} step="0.125" onChange={(e) => setConventionalRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">VA Rate (%)</label>
          <input type="number" value={vaRate} step="0.125" onChange={(e) => setVaRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Service Type</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value as 'active' | 'guard' | 'survivor')} className="w-full border rounded p-2">
            <option value="active">Active Duty / Veteran</option>
            <option value="guard">National Guard / Reserves</option>
            <option value="survivor">Surviving Spouse</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={fundingFeeExempt} onChange={(e) => setFundingFeeExempt(e.target.checked)} className="w-4 h-4" />
          <label className="text-sm font-medium">VA Disability Exempt (no funding fee)</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={firstTimeUse} onChange={(e) => setFirstTimeUse(e.target.checked)} className="w-4 h-4" />
          <label className="text-sm font-medium">First-time VA Loan Use</label>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Loan Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Home Price:</span><span className="font-medium ml-2">$ {result.loanAmount}</span></div>
          <div><span className="text-zinc-600">Down Payment:</span><span className="font-medium ml-2">$ {result.downPayment} ({result.downPaymentPercent}%)</span></div>
          <div><span className="text-zinc-600">Service Type:</span><span className="font-medium ml-2">{result.serviceType}</span></div>
          <div><span className="text-zinc-600">Funding Fee Exempt:</span><span className={`font-bold ml-2 ${result.fundingFeeExempt ? 'text-green-700' : 'text-zinc-600'}`}>{result.fundingFeeExempt ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">First Use:</span><span className="font-medium ml-2">{result.firstTimeUse ? 'Yes' : 'No (subsequent)'}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">VA Funding Fee</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Funding Fee Rate:</span><span className="font-bold text-green-700 ml-2">{result.vaFundingFeeRate}%</span></div>
          <div><span className="text-zinc-600">Funding Fee:</span><span className="font-bold ml-2">$ {result.vaFundingFee}</span></div>
          <div><span className="text-zinc-600">VA Loan Amount:</span><span className="font-medium ml-2">$ {result.vaLoanAmount}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          {result.fundingFeeExempt
            ? 'Disabled veterans (10%+ rating) are exempt from funding fee.'
            : 'Funding fee can be financed into loan. Subsequent use has higher fee.'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Conventional PMI</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">PMI Rate:</span><span className="font-medium ml-2">{result.pmiRate}%</span></div>
          <div><span className="text-zinc-600">Monthly PMI:</span><span className="font-bold ml-2">$ {result.convMonthlyPmi}</span></div>
          <div><span className="text-zinc-600">PMI Duration:</span><span className="font-medium ml-2">{Number(result.pmiDurationMonths) > 0 ? result.pmiDurationMonths + ' months' : 'None (20% down)'}</span></div>
          <div><span className="text-zinc-600">Total PMI:</span><span className="font-bold text-purple-700 ml-2">$ {result.convTotalPmi}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Payment Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Conventional:</span><span className="font-bold ml-2">$ {result.convMonthlyPayment}</span></div>
          <div><span className="text-zinc-600">VA Loan:</span><span className="font-bold text-green-700 ml-2">$ {result.vaMonthlyPayment}</span></div>
          <div><span className="text-zinc-600">VA Savings:</span><span className="font-bold text-green-700 ml-2">$ {Math.abs(Number(result.convMonthlyPayment) - Number(result.vaMonthlyPayment)).toFixed(2)}/mo</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Cost Over {result.loanTerm} Years</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Conventional Total:</span><span className="font-bold ml-2">$ {result.convTotalCost}</span></div>
          <div><span className="text-zinc-600">VA Loan Total:</span><span className="font-bold text-green-700 ml-2">$ {result.vaTotalCost}</span></div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-yellow-700">Recommendation</h2>
        <div className="text-sm font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">VA Loan Key Benefits</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>0% down payment possible (no PMI required)</li>
          <li>Lower interest rates than conventional</li>
          <li>No loan limit with full entitlement</li>
          <li>Funding fee exempt for disabled veterans (10%+ rating)</li>
          <li>No prepayment penalty</li>
          <li>VA loans are assumable by future buyers</li>
          <li>Surviving spouses eligible for benefits</li>
        </ul>
      </div>
    </div>
  )
}