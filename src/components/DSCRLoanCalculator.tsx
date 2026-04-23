'use client'

import { useState } from 'react'

export default function DSCRLoanCalculator() {
  const [propertyNOI, setPropertyNOI] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [propertyType, setPropertyType] = useState('multifamily')

  const calculate = () => {
    const noi = parseFloat(propertyNOI) || 120000
    const amount = parseFloat(loanAmount) || 1000000
    const rate = parseFloat(interestRate) || 7
    const term = parseInt(loanTerm) || 25
    const type = propertyType

    // Calculate annual debt service
    const annualRate = rate / 100
    const monthlyRate = annualRate / 12
    const totalPayments = term * 12
    const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    const annualDebtService = monthlyPayment * 12

    // DSCR calculation
    const dscr = noi / annualDebtService

    // Minimum DSCR requirements by property type
    const minDSCR: Record<string, number> = {
      'multifamily': 1.25,
      'office': 1.35,
      'retail': 1.30,
      'industrial': 1.25,
      'hotel': 1.40
    }
    const requiredDSCR = minDSCR[type] || 1.25
    const qualifies = dscr >= requiredDSCR

    // Maximum loan based on DSCR
    const maxLoanAmount = noi / (requiredDSCR * (amount / noi * annualDebtService / amount))
    const simplifiedMaxLoan = noi / (requiredDSCR * annualRate) * (1 - Math.pow(1 + annualRate, -term))

    // LTV calculation
    const propertyValue = noi / 0.07 // Assuming 7% cap rate
    const ltv = (amount / propertyValue) * 100

    // Debt yield
    const debtYield = (noi / amount) * 100

    return {
      noi: noi.toFixed(2),
      annualDebtService: annualDebtService.toFixed(2),
      dscr: dscr.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      requiredDSCR: requiredDSCR.toFixed(2),
      qualifies,
      propertyType: type,
      ltv: ltv.toFixed(1),
      debtYield: debtYield.toFixed(1),
      estimatedValue: propertyValue.toFixed(2),
      surplusCash: (noi - annualDebtService).toFixed(2),
      bufferPercent: ((dscr - requiredDSCR) / requiredDSCR * 100).toFixed(1)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">DSCR Loan Calculator</h1>
      <p className="text-zinc-600">Calculate Debt Service Coverage Ratio for commercial real estate loans.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="multifamily">Multifamily</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="industrial">Industrial</option>
              <option value="hotel">Hotel/Motel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Net Operating Income (Annual)</label>
            <input
              type="number"
              value={propertyNOI}
              onChange={(e) => setPropertyNOI(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual NOI"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter requested loan amount"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter loan rate"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Term (Years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
              <option value="25">25 Years</option>
              <option value="30">30 Years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">DSCR Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">DSCR</div>
            <div className={`text-2xl font-bold ${result.qualifies ? 'text-green-600' : 'text-red-600'}`}>
              {result.dscr}
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Required DSCR</div>
            <div className="text-2xl font-bold">{result.requiredDSCR}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Debt Service</div>
            <div className="text-2xl font-bold">$${result.annualDebtService}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Surplus Cash</div>
            <div className={`text-lg font-bold ${parseFloat(result.surplusCash) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              $${result.surplusCash}
            </div>
          </div>
        </div>
      </div>

      {result.qualifies ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Loan Qualifies</h3>
          <div className="text-sm text-green-600">
            DSCR of {result.dscr} exceeds minimum {result.requiredDSCR} for {result.propertyType} properties. Buffer: {result.bufferPercent}% above requirement. Loan likely approved.
          </div>
        </div>
      ) : (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Below DSCR Threshold</h3>
          <div className="text-sm text-red-600">
            DSCR of {result.dscr} below required {result.requiredDSCR}. Need ${(parseFloat(result.requiredDSCR) * parseFloat(result.annualDebtService) - parseFloat(result.noi)).toFixed(0)} more NOI or reduce loan amount.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Additional Metrics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Debt Yield</div>
            <div className="font-bold">{result.debtYield}%</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Est. LTV</div>
            <div className="font-bold">{result.ltv}%</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Est. Property Value</div>
            <div className="font-bold">$${result.estimatedValue}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Monthly Payment</div>
            <div className="font-bold">$${result.monthlyPayment}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">DSCR Requirements by Property</h3>
        <div className="space-y-1 text-xs">
          <div className="bg-white rounded p-2">Multifamily: 1.25x minimum</div>
          <div className="bg-white rounded p-2">Office: 1.35x minimum</div>
          <div className="bg-white rounded p-2">Retail: 1.30x minimum</div>
          <div className="bg-white rounded p-2">Industrial: 1.25x minimum</div>
          <div className="bg-white rounded p-2">Hotel: 1.40x minimum (higher risk)</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improving DSCR</h3>
        <div className="text-xs text-zinc-600">
          Increase NOI: raise rents, reduce vacancies, cut operating costs. Reduce debt: lower loan amount, extend term, negotiate better rate. Lenders prefer DSCR of 1.25-1.50 for stability. Strong DSCR = better loan terms.
        </div>
      </div>
    </main>
  )
}