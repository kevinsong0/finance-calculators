'use client'

import { useState } from 'react'

export default function RentalPropertyROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState('300000')
  const [downPayment, setDownPayment] = useState('60000')
  const [loanAmount, setLoanAmount] = useState('240000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [monthlyRent, setMonthlyRent] = useState('2200')
  const [vacancyRate, setVacancyRate] = useState('5')
  const [propertyTax, setPropertyTax] = useState('3600')
  const [insurance, setInsurance] = useState('1200')
  const [maintenance, setMaintenance] = useState('1800')
  const [managementFee, setManagementFee] = useState('8')
  const [otherExpenses, setOtherExpenses] = useState('600')
  const [appreciationRate, setAppreciationRate] = useState('3')
  const [holdingPeriod, setHoldingPeriod] = useState('10')

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 0
    const down = parseFloat(downPayment) || 0
    const loan = parseFloat(loanAmount) || 0
    const rate = parseFloat(interestRate) || 0
    const term = parseFloat(loanTerm) || 30
    const rent = parseFloat(monthlyRent) || 0
    const vacancy = parseFloat(vacancyRate) || 0
    const tax = parseFloat(propertyTax) || 0
    const ins = parseFloat(insurance) || 0
    const maint = parseFloat(maintenance) || 0
    const mgmt = parseFloat(managementFee) || 0
    const other = parseFloat(otherExpenses) || 0
    const appreciation = parseFloat(appreciationRate) || 0
    const years = parseFloat(holdingPeriod) || 10

    // Monthly mortgage payment (P&I)
    const monthlyRate = rate / 100 / 12
    const numPayments = term * 12
    const mortgagePI = loan > 0 && rate > 0
      ? loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0

    // Annual mortgage payment
    const annualMortgagePI = mortgagePI * 12

    // Gross rental income
    const annualGrossRent = rent * 12
    const effectiveGrossRent = annualGrossRent * (1 - vacancy / 100)

    // Operating expenses
    const managementAnnual = effectiveGrossRent * (mgmt / 100)
    const totalOperatingExpenses = tax + ins + maint + managementAnnual + other

    // Net Operating Income (NOI)
    const noi = effectiveGrossRent - totalOperatingExpenses

    // Cash flow before debt service
    const cashFlowBeforeDebt = noi

    // Annual cash flow (after debt service)
    const annualCashFlow = noi - annualMortgagePI

    // Monthly cash flow
    const monthlyCashFlow = annualCashFlow / 12

    // Cap Rate (NOI / Property Value)
    const capRate = noi / price * 100

    // Cash-on-Cash Return (Annual Cash Flow / Down Payment)
    const cashOnCash = annualCashFlow / down * 100

    // Total ROI over holding period
    // Includes: Cash flow + Appreciation + Loan paydown
    const futureValue = price * Math.pow(1 + appreciation / 100, years)
    const appreciationGain = futureValue - price

    // Calculate loan balance at end of holding period
    const remainingPayments = (term - years) * 12
    const loanBalanceAfterYears = loan > 0 && rate > 0
      ? loan * (Math.pow(1 + monthlyRate, numPayments) - Math.pow(1 + monthlyRate, years * 12)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0
    const loanPaydown = loan - loanBalanceAfterYears

    // Total profit
    const totalCashFlow = annualCashFlow * years
    const totalProfit = totalCashFlow + appreciationGain + loanPaydown

    // Total ROI
    const totalROI = (totalProfit / down) * 100
    const annualizedROI = (Math.pow(1 + totalROI / 100, 1 / years) - 1) * 100

    // 1% and 2% rule checks
    const onePercentRule = rent >= price / 100
    const twoPercentRule = rent >= price / 50

    // Gross Rent Multiplier
    const grm = price / annualGrossRent

    // Debt Service Coverage Ratio (DSCR)
    const dscr = noi / annualMortgagePI

    // Break-even occupancy
    const breakEvenOccupancy = ((totalOperatingExpenses + annualMortgagePI) / annualGrossRent) * 100

    return {
      purchasePrice: price.toFixed(2),
      downPayment: down.toFixed(2),
      loanAmount: loan.toFixed(2),
      monthlyMortgage: mortgagePI.toFixed(2),
      annualMortgage: annualMortgagePI.toFixed(2),
      monthlyRent: rent.toFixed(2),
      annualGrossRent: annualGrossRent.toFixed(2),
      effectiveGrossRent: effectiveGrossRent.toFixed(2),
      vacancyLoss: (annualGrossRent - effectiveGrossRent).toFixed(2),
      totalOperatingExpenses: totalOperatingExpenses.toFixed(2),
      noi: noi.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2),
      monthlyCashFlow: monthlyCashFlow.toFixed(2),
      capRate: capRate.toFixed(2),
      cashOnCash: cashOnCash.toFixed(2),
      appreciationGain: appreciationGain.toFixed(2),
      loanPaydown: loanPaydown.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      totalROI: totalROI.toFixed(2),
      annualizedROI: annualizedROI.toFixed(2),
      onePercentRule: onePercentRule ? 'Pass' : 'Fail',
      onePercentGap: (rent - price / 100).toFixed(2),
      twoPercentRule: twoPercentRule ? 'Pass' : 'Fail',
      grm: grm.toFixed(1),
      dscr: dscr.toFixed(2),
      breakEvenOccupancy: breakEvenOccupancy.toFixed(1),
      years: years.toFixed(0),
      futureValue: futureValue.toFixed(2),
      positiveCashFlow: annualCashFlow > 0,
      dscrHealthy: dscr >= 1.25,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Rental Property ROI Calculator</h1>
      <p className="text-zinc-600">Calculate comprehensive ROI metrics including Cap Rate, Cash-on-Cash Return, and total return over holding period for rental property investment analysis.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Property & Financing</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Down Payment ($)</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Amount ($)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="input"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Loan Term (years)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="input"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period (years)</label>
            <input
              type="number"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="input"
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income & Expenses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Monthly Rent ($)</label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Vacancy Rate (%)</label>
            <input
              type="number"
              value={vacancyRate}
              onChange={(e) => setVacancyRate(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Property Tax ($)</label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Insurance ($)</label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Maintenance ($)</label>
            <input
              type="number"
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Management Fee (% of rent)</label>
            <input
              type="number"
              value={managementFee}
              onChange={(e) => setManagementFee(e.target.value)}
              className="input"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Other Expenses ($)</label>
            <input
              type="number"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Appreciation Rate (%)</label>
            <input
              type="number"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(e.target.value)}
              className="input"
              min="0"
              step="0.5"
            />
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Income & Expenses Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Monthly Mortgage:</span>
            <span className="font-medium ml-2">${result.monthlyMortgage}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rent:</span>
            <span className="font-medium ml-2">${result.effectiveGrossRent}/year</span>
          </div>
          <div>
            <span className="text-zinc-600">Vacancy Loss:</span>
            <span className="font-medium ml-2">${result.vacancyLoss}/year</span>
          </div>
          <div>
            <span className="text-zinc-600">Operating Expenses:</span>
            <span className="font-medium ml-2">${result.totalOperatingExpenses}/year</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Net Operating Income (NOI)</h3>
        <div className="text-2xl font-bold text-purple-800">${result.noi}/year</div>
        <div className="text-sm text-purple-600 mt-1">
          Effective Rent - Operating Expenses (before debt service)
        </div>
      </div>

      <div className={`card ${result.positiveCashFlow ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.positiveCashFlow ? 'text-green-700' : 'text-red-700'}`}>
          Annual Cash Flow
        </h3>
        <div className="text-2xl font-bold">${result.annualCashFlow}</div>
        <div className="text-sm mt-1">
          Monthly: ${result.monthlyCashFlow} | NOI - Debt Service
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">Cap Rate</h3>
          <div className="text-xl font-bold text-orange-800">{result.capRate}%</div>
          <div className="text-xs text-orange-600 mt-1">NOI / Purchase Price</div>
        </div>

        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Cash-on-Cash Return</h3>
          <div className="text-xl font-bold text-teal-800">{result.cashOnCash}%</div>
          <div className="text-xs text-teal-600 mt-1">Annual Cash Flow / Down Payment</div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Total ROI over {result.years} Years</h3>
        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
          <div>
            <span className="text-zinc-600">Cash Flow:</span>
            <span className="font-medium ml-2">${(parseFloat(result.annualCashFlow) * parseFloat(result.years)).toFixed(2)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Appreciation:</span>
            <span className="font-medium ml-2">${result.appreciationGain}</span>
          </div>
          <div>
            <span className="text-zinc-600">Loan Paydown:</span>
            <span className="font-medium ml-2">${result.loanPaydown}</span>
          </div>
          <div>
            <span className="text-zinc-600">Future Value:</span>
            <span className="font-medium ml-2">${result.futureValue}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600 text-sm">Total Profit:</span>
            <span className="font-bold text-lg ml-2">${result.totalProfit}</span>
          </div>
          <div>
            <span className="text-zinc-600 text-sm">Annualized ROI:</span>
            <span className="font-bold text-lg ml-2">{result.annualizedROI}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Rule Checks</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className={result.onePercentRule === 'Pass' ? 'text-green-600' : 'text-red-600'}>
            <strong>1% Rule:</strong> {result.onePercentRule}
            <div className="text-xs">Rent should be ≥ 1% of price (${(parseFloat(result.purchasePrice) / 100).toFixed(2)})</div>
          </div>
          <div className={result.twoPercentRule === 'Pass' ? 'text-green-600' : 'text-red-600'}>
            <strong>2% Rule:</strong> {result.twoPercentRule}
            <div className="text-xs">Rent should be ≥ 2% of price (${(parseFloat(result.purchasePrice) / 50).toFixed(2)})</div>
          </div>
          <div>
            <strong>GRM:</strong> {result.grm} (under 12 is good)
            <div className="text-xs">Price / Annual Gross Rent</div>
          </div>
          <div className={result.dscrHealthy ? 'text-green-600' : 'text-red-600'}>
            <strong>DSCR:</strong> {result.dscr} ({result.dscrHealthy ? 'Healthy' : 'Low'})
            <div className="text-xs">NOI / Debt Service (≥1.25 preferred)</div>
          </div>
        </div>
        <div className="mt-3 text-sm">
          <strong>Break-even Occupancy:</strong> {result.breakEvenOccupancy}% needed to cover all costs
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics Explained</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Cap Rate:</strong> NOI / Property Value. Measures unlevered return. 5-8% typical, higher for riskier markets.</li>
          <li><strong>Cash-on-Cash:</strong> Annual Cash Flow / Cash Invested. Measures levered return on your actual money.</li>
          <li><strong>Total ROI:</strong> Includes cash flow, appreciation, and loan paydown over holding period.</li>
          <li><strong>1% Rule:</strong> Rent should equal at least 1% of purchase price for positive cash flow potential.</li>
          <li><strong>DSCR:</strong> Debt Service Coverage Ratio. Lenders require ≥1.25 for investment property loans.</li>
          <li><strong>GRM:</strong> Gross Rent Multiplier. Lower is better. Under 12 indicates good value in most markets.</li>
        </ul>
      </div>
    </main>
  )
}