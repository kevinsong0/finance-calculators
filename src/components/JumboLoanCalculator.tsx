'use client'

import { useState } from 'react'

export default function JumboLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(700000)
  const [conformingLimit, setConformingLimit] = useState(766550) // 2024 national limit
  const [interestRate, setInterestRate] = useState(7.0)
  const [jumboRatePremium, setJumboRatePremium] = useState(0.5)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [creditScore, setCreditScore] = useState(750)
  const [loanTerm, setLoanTerm] = useState(30)
  const [locationType, setLocationType] = useState<'standard' | 'highCost'>('standard')

  const calculate = () => {
    // Down payment
    const downPayment = loanAmount * (downPaymentPercent / 100)
    const actualLoanAmount = loanAmount - downPayment

    // Adjust conforming limit for high-cost areas
    const actualConformingLimit = locationType === 'highCost'
      ? conformingLimit * 1.5 // High-cost areas can be up to 150% of base
      : conformingLimit

    // Determine if loan is jumbo
    const isJumbo = actualLoanAmount > actualConformingLimit
    const jumboAmount = isJumbo ? actualLoanAmount - actualConformingLimit : 0

    // Effective rates
    const conformingRate = interestRate
    const jumboRate = isJumbo ? interestRate + jumboRatePremium : interestRate

    // Calculate combined rate for hybrid (conforming + jumbo piggyback)
    // Or single jumbo rate
    let effectiveRate = jumboRate

    // Monthly payment calculation
    const monthlyRate = effectiveRate / 100 / 12
    const numPayments = loanTerm * 12
    const monthlyPayment = actualLoanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    // Total interest
    const totalInterest = (monthlyPayment * numPayments) - actualLoanAmount

    // Qualifying income estimate (DTI ~43%)
    const annualIncomeNeeded = (monthlyPayment * 12) / 0.43

    // Asset requirement (reserves)
    const reserveMonths = isJumbo ? 12 : 6 // Jumbo often requires more reserves
    const reserveRequirement = monthlyPayment * reserveMonths

    // Closing costs (jumbo often higher)
    const closingCostPercent = isJumbo ? 0.03 : 0.02
    const closingCosts = loanAmount * closingCostPercent

    // Minimum credit score requirements
    const minCreditScoreConforming = 620
    const minCreditScoreJumbo = 700

    // Down payment requirements
    const minDownConforming = 3
    const minDownJumbo = 10 // Often 15-20%

    // Cash to close
    const cashToClose = downPayment + closingCosts + reserveRequirement

    return {
      loanAmount: loanAmount.toFixed(0),
      downPaymentPercent: downPaymentPercent.toFixed(1),
      downPayment: downPayment.toFixed(0),
      actualLoanAmount: actualLoanAmount.toFixed(0),
      conformingLimit: conformingLimit.toFixed(0),
      actualConformingLimit: actualConformingLimit.toFixed(0),
      locationType,
      isJumbo,
      jumboAmount: jumboAmount.toFixed(0),
      conformingRate: conformingRate.toFixed(2),
      jumboRate: jumboRate.toFixed(2),
      jumboRatePremium: jumboRatePremium.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(0),
      annualIncomeNeeded: annualIncomeNeeded.toFixed(0),
      reserveMonths: reserveMonths.toFixed(0),
      reserveRequirement: reserveRequirement.toFixed(0),
      closingCosts: closingCosts.toFixed(0),
      cashToClose: cashToClose.toFixed(0),
      creditScore: creditScore.toFixed(0),
      minCreditScoreConforming,
      minCreditScoreJumbo,
      minDownConforming,
      minDownJumbo,
      loanTerm: loanTerm.toFixed(0),
      creditEligible: creditScore >= (isJumbo ? minCreditScoreJumbo : minCreditScoreConforming),
      downPaymentEligible: downPaymentPercent >= (isJumbo ? minDownJumbo : minDownConforming),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Jumbo Loan Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate jumbo mortgage requirements and compare to conforming limits.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Home Price ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Down Payment (%)</label>
          <input type="number" value={downPaymentPercent} step="1" min="3" max="30" onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Base Interest Rate (%)</label>
          <input type="number" value={interestRate} step="0.125" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jumbo Rate Premium (%)</label>
          <input type="number" value={jumboRatePremium} step="0.125" min="0" max="1" onChange={(e) => setJumboRatePremium(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">Location Type</label>
          <select value={locationType} onChange={(e) => setLocationType(e.target.value as 'standard' | 'highCost')} className="w-full border rounded p-2">
            <option value="standard">Standard Area</option>
            <option value="highCost">High-Cost Area (CA, NY, etc.)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conforming Limit ($)</label>
          <input type="number" value={conformingLimit} onChange={(e) => setConformingLimit(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Loan Type Determination</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Home Price:</span><span className="font-medium ml-2">$ {result.loanAmount}</span></div>
          <div><span className="text-zinc-600">Down Payment:</span><span className="font-medium ml-2">$ {result.downPayment} ({result.downPaymentPercent}%)</span></div>
          <div><span className="text-zinc-600">Loan Amount:</span><span className="font-bold ml-2">$ {result.actualLoanAmount}</span></div>
          <div><span className="text-zinc-600">Conforming Limit:</span><span className="font-medium ml-2">$ {result.actualConformingLimit}</span></div>
          <div><span className="text-zinc-600">Loan Type:</span><span className={`font-bold ml-2 ${result.isJumbo ? 'text-orange-700' : 'text-green-700'}`}>{result.isJumbo ? 'JUMBO' : 'CONFORMING'}</span></div>
          {result.isJumbo && (
            <div><span className="text-zinc-600">Jumbo Amount:</span><span className="font-bold text-orange-700 ml-2">$ {result.jumboAmount}</span></div>
          )}
        </div>
        <div className="text-xs text-zinc-600 mt-2">2024 conforming limit: $766,550. High-cost areas up to $1,149,825.</div>
      </div>

      {result.isJumbo && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Jumbo Rate Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Base Rate:</span><span className="font-medium ml-2">{result.conformingRate}%</span></div>
            <div><span className="text-zinc-600">Jumbo Premium:</span><span className="font-bold text-orange-700 ml-2">+ {result.jumboRatePremium}%</span></div>
            <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold text-orange-700 ml-2">{result.effectiveRate}%</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Jumbo loans typically have 0.25-0.75% higher rates than conforming.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Payment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Rate:</span><span className="font-medium ml-2">{result.effectiveRate}%</span></div>
          <div><span className="text-zinc-600">Monthly Payment:</span><span className="font-bold text-purple-700 ml-2">$ {result.monthlyPayment}</span></div>
          <div><span className="text-zinc-600">Total Interest:</span><span className="font-bold ml-2">$ {result.totalInterest}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Qualification Requirements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Credit Score:</span><span className="font-bold ml-2">{result.creditScore}</span></div>
          <div><span className="text-zinc-600">Min Required:</span><span className={`font-bold ml-2 ${result.creditEligible ? 'text-green-700' : 'text-red-700'}`}>{result.isJumbo ? result.minCreditScoreJumbo : result.minCreditScoreConforming}</span></div>
          <div><span className="text-zinc-600">Credit Eligible:</span><span className={`font-bold ml-2 ${result.creditEligible ? 'text-green-700' : 'text-red-700'}`}>{result.creditEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Min Down Payment:</span><span className={`font-bold ml-2 ${result.downPaymentEligible ? 'text-green-700' : 'text-red-700'}`}>{result.isJumbo ? result.minDownJumbo : result.minDownConforming}%</span></div>
          <div><span className="text-zinc-600">Down Payment Eligible:</span><span className={`font-bold ml-2 ${result.downPaymentEligible ? 'text-green-700' : 'text-red-700'}`}>{result.downPaymentEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Income Needed:</span><span className="font-bold ml-2">$ {result.annualIncomeNeeded}/yr</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Jumbo loans: 700+ credit score, 10-20% down, lower DTI, more reserves.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Cash to Close</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Down Payment:</span><span className="font-medium ml-2">$ {result.downPayment}</span></div>
          <div><span className="text-zinc-600">Closing Costs:</span><span className="font-medium ml-2">$ {result.closingCosts}</span></div>
          <div><span className="text-zinc-600">Reserves Required:</span><span className="font-medium ml-2">$ {result.reserveRequirement} ({result.reserveMonths} mo)</span></div>
          <div><span className="text-zinc-600">Total Cash Needed:</span><span className="font-bold text-teal-700 ml-2">$ {result.cashToClose}</span></div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Jumbo Loan Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Exceeds conforming limit ($766,550 in 2024, higher in some areas)</li>
          <li>Stricter requirements: 700+ credit, 10-20% down, 43% max DTI</li>
          <li>Higher rates: typically 0.25-0.75% above conforming</li>
          <li>More reserves needed: 6-12 months of payments</li>
          <li>Not eligible for FHA/VA - conventional only</li>
          <li>Consider piggyback loan: conforming 1st + 2nd mortgage</li>
          <li>Some lenders offer portfolio jumbos with flexible terms</li>
        </ul>
      </div>
    </div>
  )
}