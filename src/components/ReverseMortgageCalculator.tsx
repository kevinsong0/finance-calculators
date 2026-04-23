'use client'

import { useState } from 'react'

export default function ReverseMortgageCalculator() {
  const [homeValue, setHomeValue] = useState(400000)
  const [homeownerAge, setHomeownerAge] = useState(70)
  const [interestRate, setInterestRate] = useState(7.5)
  const [loanType, setLoanType] = useState<'lumpsum' | 'lineofcredit' | 'tenure' | 'term'>('tenure')
  const [termYears, setTermYears] = useState(10)
  const [existingMortgage, setExistingMortgage] = useState(0)

  const calculate = () => {
    // Principal Limit Factor (PLF) based on age
    // Approximate PLF table (ages 62-90)
    const plfTable: Record<number, number> = {
      62: 0.50, 63: 0.52, 64: 0.54, 65: 0.56, 66: 0.58, 67: 0.60,
      68: 0.62, 69: 0.64, 70: 0.66, 71: 0.68, 72: 0.70, 73: 0.72,
      74: 0.74, 75: 0.76, 76: 0.78, 77: 0.80, 78: 0.82, 79: 0.84,
      80: 0.86, 81: 0.88, 82: 0.90, 83: 0.92, 84: 0.94, 85: 0.95,
      86: 0.96, 87: 0.97, 88: 0.98, 89: 0.99, 90: 1.00
    }

    const age = Math.max(62, Math.min(90, homeownerAge))
    const plf = plfTable[age] || 0.70

    // Principal Limit calculation
    const principalLimit = homeValue * plf

    // Net Principal Limit (minus existing mortgage payoff)
    const netPrincipalLimit = principalLimit - existingMortgage

    // Loan proceeds based on type
    let loanProceeds = 0
    let monthlyPayment = 0

    if (loanType === 'lumpsum') {
      loanProceeds = netPrincipalLimit * 0.60 // Lump sum typically capped at 60%
    } else if (loanType === 'lineofcredit') {
      loanProceeds = netPrincipalLimit // Full amount available as line of credit
    } else if (loanType === 'tenure') {
      // Monthly payments for life
      const expectedYears = 100 - age // Life expectancy approximation
      const monthlyRate = interestRate / 100 / 12
      const totalPayments = expectedYears * 12
      monthlyPayment = netPrincipalLimit * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalPayments))
      loanProceeds = netPrincipalLimit
    } else if (loanType === 'term') {
      // Monthly payments for fixed term
      const monthlyRate = interestRate / 100 / 12
      const totalPayments = termYears * 12
      monthlyPayment = netPrincipalLimit * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalPayments))
      loanProceeds = netPrincipalLimit
    }

    // Origination fees and costs
    const originationFee = Math.min(homeValue * 0.02, 6000)
    const mortgageInsurancePremium = homeValue * 0.02 // FHA HECM MIP
    const closingCosts = homeValue * 0.01 // Appraisal, title, etc.
    const totalCosts = originationFee + mortgageInsurancePremium + closingCosts

    // Net cash available
    const netCashAfterCosts = netPrincipalLimit - totalCosts

    // Equity remaining scenarios
    const annualGrowthRate = 3 // Home appreciation estimate
    const yearsToSell = 10
    const futureHomeValue = homeValue * Math.pow(1 + annualGrowthRate / 100, yearsToSell)
    const loanBalanceGrowth = netPrincipalLimit * Math.pow(1 + interestRate / 100, yearsToSell)
    const remainingEquity = futureHomeValue - loanBalanceGrowth

    return {
      homeValue: homeValue.toFixed(0),
      homeownerAge: age.toFixed(0),
      interestRate: interestRate.toFixed(2),
      plf: (plf * 100).toFixed(0),
      principalLimit: principalLimit.toFixed(0),
      existingMortgage: existingMortgage.toFixed(0),
      netPrincipalLimit: netPrincipalLimit.toFixed(0),
      loanType,
      loanProceeds: loanProceeds.toFixed(0),
      monthlyPayment: monthlyPayment.toFixed(2),
      termYears: termYears.toFixed(0),
      originationFee: originationFee.toFixed(0),
      mortgageInsurancePremium: mortgageInsurancePremium.toFixed(0),
      closingCosts: closingCosts.toFixed(0),
      totalCosts: totalCosts.toFixed(0),
      netCashAfterCosts: netCashAfterCosts.toFixed(0),
      futureHomeValue: futureHomeValue.toFixed(0),
      loanBalanceGrowth: loanBalanceGrowth.toFixed(0),
      remainingEquity: remainingEquity.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Reverse Mortgage Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate HECM reverse mortgage proceeds for homeowners age 62+.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Home Value ($)</label>
          <input type="number" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Homeowner Age (62+)</label>
          <input type="number" value={homeownerAge} min="62" max="90" onChange={(e) => setHomeownerAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Interest Rate (%)</label>
          <input type="number" value={interestRate} step="0.1" onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Existing Mortgage Balance ($)</label>
          <input type="number" value={existingMortgage} onChange={(e) => setExistingMortgage(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Disbursement Type</label>
          <select value={loanType} onChange={(e) => setLoanType(e.target.value as 'lumpsum' | 'lineofcredit' | 'tenure' | 'term')} className="w-full border rounded p-2">
            <option value="tenure">Tenure (monthly payments for life)</option>
            <option value="term">Term (monthly payments for fixed period)</option>
            <option value="lineofcredit">Line of Credit (draw as needed)</option>
            <option value="lumpsum">Lump Sum (one-time payment)</option>
          </select>
        </div>
        {loanType === 'term' && (
          <div>
            <label className="block text-sm font-medium mb-1">Term Years</label>
            <input type="number" value={termYears} min="1" max="20" onChange={(e) => setTermYears(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Principal Limit Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Home Value:</span><span className="font-medium ml-2">$ {result.homeValue}</span></div>
          <div><span className="text-zinc-600">Age:</span><span className="font-medium ml-2">{result.homeownerAge}</span></div>
          <div><span className="text-zinc-600">PLF:</span><span className="font-bold text-blue-700 ml-2">{result.plf}%</span></div>
          <div><span className="text-zinc-600">Principal Limit:</span><span className="font-bold text-blue-700 ml-2">$ {result.principalLimit}</span></div>
          <div><span className="text-zinc-600">Existing Mortgage:</span><span className="font-medium ml-2">$ {result.existingMortgage}</span></div>
          <div><span className="text-zinc-600">Net Principal Limit:</span><span className="font-bold text-blue-700 ml-2">$ {result.netPrincipalLimit}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">PLF = Principal Limit Factor, increases with age. Older = more available.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Loan Proceeds</h2>
        <div className="grid grid-cols-2 gap-4">
          {result.loanType === 'lumpsum' && (
            <div><span className="text-zinc-600">Lump Sum Available:</span><span className="font-bold text-purple-700 ml-2">$ {result.loanProceeds}</span></div>
          )}
          {result.loanType === 'lineofcredit' && (
            <div><span className="text-zinc-600">Line of Credit Available:</span><span className="font-bold text-purple-700 ml-2">$ {result.loanProceeds}</span></div>
          )}
          {(result.loanType === 'tenure' || result.loanType === 'term') && (
            <>
              <div><span className="text-zinc-600">Monthly Payment:</span><span className="font-bold text-purple-700 ml-2">$ {result.monthlyPayment}</span></div>
              <div><span className="text-zinc-600">Payment Duration:</span><span className="font-medium ml-2">{result.loanType === 'tenure' ? 'Lifetime' : `${result.termYears} years`}</span></div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Closing Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Origination Fee:</span><span className="font-medium ml-2">$ {result.originationFee}</span></div>
          <div><span className="text-zinc-600">MIP (FHA Insurance):</span><span className="font-medium ml-2">$ {result.mortgageInsurancePremium}</span></div>
          <div><span className="text-zinc-600">Other Closing Costs:</span><span className="font-medium ml-2">$ {result.closingCosts}</span></div>
          <div><span className="text-zinc-600">Total Costs:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalCosts}</span></div>
          <div><span className="text-zinc-600">Net Cash After Costs:</span><span className="font-bold text-green-700 ml-2">$ {result.netCashAfterCosts}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Costs can be financed from loan proceeds, reducing available cash.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Future Equity Estimate (10 years)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Projected Home Value:</span><span className="font-medium ml-2">$ {result.futureHomeValue}</span></div>
          <div><span className="text-zinc-600">Projected Loan Balance:</span><span className="font-bold text-red-700 ml-2">$ {result.loanBalanceGrowth}</span></div>
          <div><span className="text-zinc-600">Remaining Equity:</span><span className="font-bold text-green-700 ml-2">$ {result.remainingEquity}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Assumes 3% annual home appreciation. Loan balance grows with interest.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Reverse Mortgage Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>HECM: FHA-insured, most common reverse mortgage type</li>
          <li>No monthly payments required; loan repaid when you leave home</li>
          <li>Must maintain home, pay property taxes and insurance</li>
          <li>You retain title; loan balance can exceed home value (non-recourse)</li>
          <li>Consider alternatives: home equity loan, downsizing, HELOC</li>
          <li>Consult family: may reduce inheritance equity</li>
        </ul>
      </div>
    </div>
  )
}