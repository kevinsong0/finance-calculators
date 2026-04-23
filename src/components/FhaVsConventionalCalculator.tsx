'use client'

import { useState } from 'react'

export default function FhaVsConventionalCalculator() {
  const [loanAmount, setLoanAmount] = useState(250000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(5)
  const [conventionalRate, setConventionalRate] = useState(6.5)
  const [fhaRate, setFhaRate] = useState(6.25)
  const [creditScore, setCreditScore] = useState(680)
  const [loanTerm, setLoanTerm] = useState(30)

  const calculate = () => {
    const downPayment = loanAmount * (downPaymentPercent / 100)
    const baseLoanAmount = loanAmount - downPayment

    const fhaUpfrontMip = baseLoanAmount * 0.0175
    const fhaLoanAmount = baseLoanAmount + fhaUpfrontMip
    const fhaAnnualMipRate = downPaymentPercent < 5 ? 0.0135 : (downPaymentPercent < 10 ? 0.005 : 0.0045)
    const fhaMonthlyMip = fhaLoanAmount * fhaAnnualMipRate / 12
    const fhaTotalMip = fhaUpfrontMip + (fhaMonthlyMip * loanTerm * 12)

    let pmiRate = 0
    if (downPaymentPercent >= 20) {
      pmiRate = 0
    } else if (creditScore >= 760 && downPaymentPercent >= 10) {
      pmiRate = 0.003
    } else if (creditScore >= 700 && downPaymentPercent >= 10) {
      pmiRate = 0.0045
    } else if (creditScore >= 680 && downPaymentPercent >= 5) {
      pmiRate = 0.006
    } else if (creditScore >= 660 && downPaymentPercent >= 5) {
      pmiRate = 0.0085
    } else {
      pmiRate = 0.011
    }

    const convMonthlyPmi = baseLoanAmount * pmiRate / 12
    const pmiDurationMonths = Math.ceil((80 - downPaymentPercent) / 0.5)
    const convTotalPmi = convMonthlyPmi * pmiDurationMonths

    const monthlyRateConv = conventionalRate / 100 / 12
    const monthlyRateFha = fhaRate / 100 / 12
    const numPayments = loanTerm * 12

    const convPrincipalPayment = baseLoanAmount *
      (monthlyRateConv * Math.pow(1 + monthlyRateConv, numPayments)) /
      (Math.pow(1 + monthlyRateConv, numPayments) - 1)

    const fhaPrincipalPayment = fhaLoanAmount *
      (monthlyRateFha * Math.pow(1 + monthlyRateFha, numPayments)) /
      (Math.pow(1 + monthlyRateFha, numPayments) - 1)

    const convMonthlyPayment = convPrincipalPayment + convMonthlyPmi
    const fhaMonthlyPayment = fhaPrincipalPayment + fhaMonthlyMip

    const fhaClosingCosts = loanAmount * 0.03
    const convClosingCosts = loanAmount * 0.02

    const convTotalInterest = (convPrincipalPayment * numPayments) - baseLoanAmount
    const fhaTotalInterest = (fhaPrincipalPayment * numPayments) - fhaLoanAmount

    const convTotalCost = downPayment + convClosingCosts + convTotalInterest + convTotalPmi
    const fhaTotalCost = downPayment + fhaClosingCosts + fhaTotalInterest + fhaTotalMip

    let recommendation = ''
    let savings = 0
    if (convTotalCost < fhaTotalCost) {
      savings = fhaTotalCost - convTotalCost
      recommendation = 'CONVENTIONAL: Lower total cost by $' + savings.toFixed(0) + ' over ' + loanTerm + ' years.'
    } else {
      savings = convTotalCost - fhaTotalCost
      recommendation = 'FHA: Lower total cost by $' + savings.toFixed(0) + ' over ' + loanTerm + ' years.'
    }

    const minCreditScoreFha = 500
    const minCreditScoreConv = 620
    const fhaCreditEligible = creditScore >= minCreditScoreFha
    const convCreditEligible = creditScore >= minCreditScoreConv

    return {
      loanAmount: loanAmount.toFixed(0),
      downPaymentPercent: downPaymentPercent.toFixed(1),
      downPayment: downPayment.toFixed(0),
      baseLoanAmount: baseLoanAmount.toFixed(0),
      conventionalRate: conventionalRate.toFixed(2),
      fhaRate: fhaRate.toFixed(2),
      creditScore: creditScore.toFixed(0),
      fhaUpfrontMip: fhaUpfrontMip.toFixed(0),
      fhaLoanAmount: fhaLoanAmount.toFixed(0),
      fhaAnnualMipRate: (fhaAnnualMipRate * 100).toFixed(2),
      fhaMonthlyMip: fhaMonthlyMip.toFixed(2),
      fhaTotalMip: fhaTotalMip.toFixed(0),
      pmiRate: (pmiRate * 100).toFixed(2),
      convMonthlyPmi: convMonthlyPmi.toFixed(2),
      pmiDurationMonths: pmiDurationMonths.toFixed(0),
      convTotalPmi: convTotalPmi.toFixed(0),
      convPrincipalPayment: convPrincipalPayment.toFixed(2),
      fhaPrincipalPayment: fhaPrincipalPayment.toFixed(2),
      convMonthlyPayment: convMonthlyPayment.toFixed(2),
      fhaMonthlyPayment: fhaMonthlyPayment.toFixed(2),
      convClosingCosts: convClosingCosts.toFixed(0),
      fhaClosingCosts: fhaClosingCosts.toFixed(0),
      convTotalInterest: convTotalInterest.toFixed(0),
      fhaTotalInterest: fhaTotalInterest.toFixed(0),
      convTotalCost: convTotalCost.toFixed(0),
      fhaTotalCost: fhaTotalCost.toFixed(0),
      recommendation,
      savings: savings.toFixed(0),
      loanTerm: loanTerm.toFixed(0),
      fhaCreditEligible,
      convCreditEligible,
      minCreditScoreFha,
      minCreditScoreConv,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">FHA vs Conventional Loan Calculator</h1>
      <p className="text-gray-600 mb-4">Compare FHA and conventional mortgage costs to find the best option.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Home Price ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Down Payment (%)</label>
          <input type="number" value={downPaymentPercent} step="0.5" min="3" max="20" onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">FHA Rate (%)</label>
          <input type="number" value={fhaRate} step="0.125" onChange={(e) => setFhaRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Loan Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Home Price:</span><span className="font-medium ml-2">$ {result.loanAmount}</span></div>
          <div><span className="text-zinc-600">Down Payment:</span><span className="font-medium ml-2">$ {result.downPayment} ({result.downPaymentPercent}%)</span></div>
          <div><span className="text-zinc-600">Credit Score:</span><span className="font-bold ml-2">{result.creditScore}</span></div>
          <div><span className="text-zinc-600">FHA Eligible:</span><span className={result.fhaCreditEligible ? 'font-bold ml-2 text-green-700' : 'font-bold ml-2 text-red-700'}>{result.fhaCreditEligible ? 'Yes' : 'No (min 500)'}</span></div>
          <div><span className="text-zinc-600">Conv Eligible:</span><span className={result.convCreditEligible ? 'font-bold ml-2 text-green-700' : 'font-bold ml-2 text-red-700'}>{result.convCreditEligible ? 'Yes' : 'No (min 620)'}</span></div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">FHA Insurance Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Upfront MIP (1.75%):</span><span className="font-bold text-orange-700 ml-2">$ {result.fhaUpfrontMip}</span></div>
          <div><span className="text-zinc-600">FHA Loan Amount:</span><span className="font-medium ml-2">$ {result.fhaLoanAmount}</span></div>
          <div><span className="text-zinc-600">Annual MIP Rate:</span><span className="font-medium ml-2">{result.fhaAnnualMipRate}%</span></div>
          <div><span className="text-zinc-600">Monthly MIP:</span><span className="font-bold ml-2">$ {result.fhaMonthlyMip}</span></div>
          <div><span className="text-zinc-600">Total MIP ({result.loanTerm} yrs):</span><span className="font-bold text-orange-700 ml-2">$ {result.fhaTotalMip}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">FHA MIP is permanent for loans with less than 10% down. Can be canceled after 11 years if 10% or more down.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Conventional PMI Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">PMI Rate:</span><span className="font-medium ml-2">{result.pmiRate}%</span></div>
          <div><span className="text-zinc-600">Monthly PMI:</span><span className="font-bold ml-2">$ {result.convMonthlyPmi}</span></div>
          <div><span className="text-zinc-600">PMI Duration:</span><span className="font-medium ml-2">{result.pmiDurationMonths} months</span></div>
          <div><span className="text-zinc-600">Total PMI:</span><span className="font-bold text-purple-700 ml-2">$ {result.convTotalPmi}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Conventional PMI cancels at 20% equity. PMI rate varies by credit score and down payment.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Payment Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Conventional:</span><span className="font-bold ml-2">$ {result.convMonthlyPayment}</span></div>
          <div><span className="text-zinc-600">FHA:</span><span className="font-bold ml-2">$ {result.fhaMonthlyPayment}</span></div>
          <div><span className="text-zinc-600">Difference:</span><span className="font-bold text-blue-700 ml-2">$ {Math.abs(Number(result.convMonthlyPayment) - Number(result.fhaMonthlyPayment)).toFixed(2)}</span></div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Cost Over {result.loanTerm} Years</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Conventional Total:</span><span className="font-bold ml-2">$ {result.convTotalCost}</span></div>
          <div><span className="text-zinc-600">FHA Total:</span><span className="font-bold ml-2">$ {result.fhaTotalCost}</span></div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-yellow-700">Recommendation</h2>
        <div className="text-sm font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">FHA vs Conventional Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>FHA: lower credit score requirement (500 min), accepts 3.5% down</li>
          <li>Conventional: 620+ credit score, 5% min down (often 3% for first-time)</li>
          <li>FHA MIP: 1.75% upfront + 0.45-1.35% annual (permanent if less than 10% down)</li>
          <li>Conventional PMI: cancels at 20% equity, varies by credit score</li>
          <li>Higher credit score means lower conventional PMI rate</li>
          <li>FHA often better for lower credit scores or smaller down payments</li>
        </ul>
      </div>
    </div>
  )
}