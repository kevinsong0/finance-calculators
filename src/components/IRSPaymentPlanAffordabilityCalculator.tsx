'use client'

import { useState } from 'react'

export default function IRSPaymentPlanAffordabilityCalculator() {
  const [totalTaxDebt, setTotalTaxDebt] = useState(25000)
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500)
  const [irsMinimumPayment, setIrsMinimumPayment] = useState(500)
  const [paymentPlanDuration, setPaymentPlanDuration] = useState(72)
  const [interestRate, setInterestRate] = useState(8)

  const calculate = () => {
    // IRS Payment Plan (Installment Agreement) Affordability
    // IRS offers payment plans for tax debt
    // Interest and penalties continue during payment plan

    // Available payment plan options
    // - Short-term (180 days): no setup fee
    // - Long-term (>180 days): setup fee applies
    // - Guaranteed: if debt <$10k, pay within 3 years
    // - Streamlined: if debt <$50k, pay within 6 years
    // - Regular: requires financial disclosure

    // Interest rate: ~8% (2024, changes quarterly)
    // Failure-to-pay penalty: 0.25% per month (reduced to 0.25% on plan)

    // Calculate disposable income
    const disposableIncome = monthlyIncome - monthlyExpenses
    const maxAffordablePayment = disposableIncome

    // Calculate payment plan details
    const monthlyPayment = totalTaxDebt / paymentPlanDuration
    const monthlyInterest = (totalTaxDebt * interestRate / 100) / 12
    const monthlyPenalty = totalTaxDebt * 0.0025 // 0.25% failure-to-pay

    // Total monthly cost including interest and penalty
    let remainingBalance = totalTaxDebt
    let totalInterestPaid = 0
    let totalPenaltyPaid = 0
    const months = paymentPlanDuration

    for (let i = 0; i < months; i++) {
      const interestThisMonth = remainingBalance * (interestRate / 100) / 12
      const penaltyThisMonth = remainingBalance * 0.0025
      totalInterestPaid += interestThisMonth
      totalPenaltyPaid += penaltyThisMonth

      const paymentToPrincipal = monthlyPayment - interestThisMonth - penaltyThisMonth
      remainingBalance -= Math.max(0, paymentToPrincipal)
    }

    const totalPaid = totalTaxDebt + totalInterestPaid + totalPenaltyPaid
    const effectivePayment = totalPaid / months

    // Affordability check
    const isAffordable = effectivePayment <= maxAffordablePayment
    const affordabilityGap = isAffordable ? 0 : effectivePayment - maxAffordablePayment

    // IRS minimum payment requirement
    // IRS typically requires minimum based on debt amount and timeline
    const meetsIRSMinimum = effectivePayment >= irsMinimumPayment

    // Setup fees
    const setupFeeOnline = 31 // Apply online
    const setupFeePhone = 107 // Phone/mail
    const setupFeeLowIncome = 0 // Low income waiver

    // Low income threshold
    const lowIncomeThresholdMonthly = 2500
    const isLowIncome = monthlyIncome <= lowIncomeThresholdMonthly
    const applicableSetupFee = isLowIncome ? setupFeeLowIncome : setupFeeOnline

    // Payment plan type recommendation
    let planType = ''
    if (totalTaxDebt <= 10000 && paymentPlanDuration <= 36) {
      planType = 'Guaranteed Installment Agreement'
    } else if (totalTaxDebt <= 50000 && paymentPlanDuration <= 72) {
      planType = 'Streamlined Installment Agreement'
    } else {
      planType = 'Regular Installment Agreement (requires Form 433)'
    }

    // Short-term option (180 days)
    const shortTermDays = 180
    const shortTermPayment = totalTaxDebt / 6 // ~6 months

    // Compare options
    const canDoShortTerm = shortTermPayment <= maxAffordablePayment * 3 && totalTaxDebt <= 100000

    return {
      totalTaxDebt: totalTaxDebt.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      maxAffordablePayment: maxAffordablePayment.toFixed(0),
      paymentPlanDuration: paymentPlanDuration.toFixed(0),
      monthlyPayment: monthlyPayment.toFixed(0),
      interestRate: interestRate.toFixed(0),
      totalInterestPaid: totalInterestPaid.toFixed(0),
      totalPenaltyPaid: totalPenaltyPaid.toFixed(0),
      totalPaid: totalPaid.toFixed(0),
      effectivePayment: effectivePayment.toFixed(0),
      isAffordable,
      affordabilityGap: affordabilityGap.toFixed(0),
      irsMinimumPayment: irsMinimumPayment.toFixed(0),
      meetsIRSMinimum,
      setupFeeOnline: setupFeeOnline.toFixed(0),
      setupFeePhone: setupFeePhone.toFixed(0),
      applicableSetupFee: applicableSetupFee.toFixed(0),
      isLowIncome,
      planType,
      shortTermDays: shortTermDays.toFixed(0),
      shortTermPayment: shortTermPayment.toFixed(0),
      canDoShortTerm,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Payment Plan Affordability Calculator</h1>
      <p className="text-gray-600 mb-4">Determine if an IRS installment agreement fits your budget.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt</label>
          <input type="number" value={totalTaxDebt} onChange={(e) => setTotalTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
          <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Plan Duration (months)</label>
          <input type="number" value={paymentPlanDuration} min="6" max="84" onChange={(e) => setPaymentPlanDuration(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" value={interestRate} min="4" max="12" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">IRS Minimum Payment</label>
          <input type="number" value={irsMinimumPayment} onChange={(e) => setIrsMinimumPayment(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.isAffordable && result.meetsIRSMinimum ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isAffordable && result.meetsIRSMinimum ? 'text-green-700' : 'text-red-700'}`}>Affordability Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Disposable Income:</span><span className="font-medium ml-2">$ {result.disposableIncome}</span></div>
          <div><span className="text-zinc-600">Required Payment:</span><span className="font-bold ml-2">$ {result.effectivePayment}</span></div>
          <div><span className="text-zinc-600">Affordable:</span><span className={`font-bold ml-2 ${result.isAffordable ? 'text-green-700' : 'text-red-700'}`}>{result.isAffordable ? 'Yes' : 'No'}</span></div>
        </div>
        {!result.isAffordable && (
          <div className="text-xs text-red-600 mt-2">Gap: $ {result.affordabilityGap} per month above your disposable income.</div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Payment must be within disposable income and meet IRS minimum.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Plan Recommendation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Plan Type:</span><span className="font-bold text-blue-700 ml-2">{result.planType}</span></div>
          <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.paymentPlanDuration} months</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Setup Fee:</span><span className="font-medium ml-2">$ {result.applicableSetupFee}</span></div>
          <div><span className="text-zinc-600">Low Income:</span><span className={`font-bold ml-2 ${result.isLowIncome ? 'text-green-700' : 'text-zinc-600'}`}>{result.isLowIncome ? 'Fee Waived' : 'Standard Fee'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Guaranteed: debt ≤$10k, 3 years. Streamlined: debt ≤$50k, 6 years.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Cost Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Principal:</span><span className="font-medium ml-2">$ {result.totalTaxDebt}</span></div>
          <div><span className="text-zinc-600">Interest:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalInterestPaid}</span></div>
          <div><span className="text-zinc-600">Penalty:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalPenaltyPaid}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Paid:</span><span className="font-bold text-red-700 ml-2">$ {result.totalPaid}</span></div>
          <div><span className="text-zinc-600">Monthly Payment:</span><span className="font-bold ml-2">$ {result.effectivePayment}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Interest (~8%) and 0.25% failure-to-pay penalty continue during payment plan.</div>
      </div>

      {result.canDoShortTerm && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Short-Term Option</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Duration:</span><span className="font-medium ml-2">{result.shortTermDays} days</span></div>
            <div><span className="text-zinc-600">Payment:</span><span className="font-bold text-teal-700 ml-2">$ {result.shortTermPayment}/mo</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">Setup Fee:</span><span className="font-bold text-green-700 ml-2">$0</span></div>
            <div><span className="text-zinc-600">Eligible:</span><span className="font-bold text-green-700 ml-2">Yes</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Short-term (180 days) has no setup fee but higher monthly payment.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRS Minimum Check</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">IRS Minimum:</span><span className="font-medium ml-2">$ {result.irsMinimumPayment}</span></div>
          <div><span className="text-zinc-600">Meets:</span><span className={`font-bold ml-2 ${result.meetsIRSMinimum ? 'text-green-700' : 'text-red-700'}`}>{result.meetsIRSMinimum ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRS requires minimum payment based on debt amount. Failure to meet may reject plan.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Payment Plan Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Interest (~8%) continues during plan</li>
          <li>Failure-to-pay penalty: 0.25%/mo</li>
          <li>Guaranteed: ≤$10k, 3 years</li>
          <li>Streamlined: ≤$50k, 6 years</li>
          <li>Setup fee: $31 online, $107 phone</li>
          <li>Low income: fee waived</li>
          <li>Short-term: 180 days, no fee</li>
          <li>Apply via IRS Online Payment Agreement</li>
          <li>Miss payments: plan default</li>
          <li>Consider offer in compromise</li>
        </ul>
      </div>
    </div>
  )
}