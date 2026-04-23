'use client'

import { useState } from 'react'

export default function PassiveIncomeCalculator() {
  const [dividendIncome, setDividendIncome] = useState('12000')
  const [rentalIncome, setRentalIncome] = useState('24000')
  const [rentalExpenses, setRentalExpenses] = useState('6000')
  const [interestIncome, setInterestIncome] = useState('3000')
  const [royaltyIncome, setRoyaltyIncome] = useState('5000')
  const [businessIncome, setBusinessIncome] = useState('15000')
  const [businessExpenses, setBusinessExpenses] = useState('3000')
  const [pensionIncome, setPensionIncome] = useState('0')
  const [socialSecurityIncome, setSocialSecurityIncome] = useState('0')
  const [filingStatus, setFilingStatus] = useState('single')
  const [ordinaryIncome, setOrdinaryIncome] = useState('50000')

  const taxBrackets: Record<string, Array<{ min: number; max: number; rate: number }>> = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
  }

  const capitalGainsThresholds: Record<string, { zero: number; fifteen: number }> = {
    single: { zero: 47025, fifteen: 518900 },
    married: { zero: 94050, fifteen: 583750 },
  }

  const calculate = () => {
    const dividends = parseFloat(dividendIncome) || 0
    const rental = parseFloat(rentalIncome) || 0
    const rentalExp = parseFloat(rentalExpenses) || 0
    const interest = parseFloat(interestIncome) || 0
    const royalties = parseFloat(royaltyIncome) || 0
    const business = parseFloat(businessIncome) || 0
    const businessExp = parseFloat(businessExpenses) || 0
    const pension = parseFloat(pensionIncome) || 0
    const ss = parseFloat(socialSecurityIncome) || 0
    const ordinary = parseFloat(ordinaryIncome) || 0

    const netRental = rental - rentalExp
    const netBusiness = business - businessExp

    // Total passive income
    const totalPassive = dividends + netRental + interest + royalties + netBusiness + pension + ss
    const totalGross = dividends + rental + interest + royalties + business + pension + ss

    // Total taxable income (simplified)
    const totalTaxable = ordinary + totalPassive
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200
    const taxableAfterDeduction = Math.max(0, totalTaxable - standardDeduction)

    // Calculate tax
    const brackets = taxBrackets[filingStatus]
    let federalTax = 0
    let remaining = taxableAfterDeduction

    for (const bracket of brackets) {
      if (remaining <= 0) break
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
      federalTax += taxableInBracket * bracket.rate
      remaining -= taxableInBracket
    }

    // Qualified dividend tax rates
    const thresholds = capitalGainsThresholds[filingStatus]
    const qualifiedDivRate = taxableAfterDeduction <= thresholds.zero ? 0 :
                             taxableAfterDeduction <= thresholds.fifteen ? 0.15 : 0.20

    // Qualified dividends tax (assumes 100% qualified for simplicity)
    const qualifiedDivTax = dividends * qualifiedDivRate

    // Effective tax rate
    const effectiveRate = totalTaxable > 0 ? (federalTax / totalTaxable) * 100 : 0

    // Passive income efficiency metrics
    const passiveRatio = totalPassive / (ordinary + totalPassive) * 100
    const hourlyEquivalent = totalPassive / 2080 // 2080 work hours/year
    const monthlyPassive = totalPassive / 12

    // Self-employment tax on business income (if applicable)
    const seTax = netBusiness * 0.9235 * 0.153 // Simplified SE tax

    return {
      dividendIncome: dividends.toFixed(2),
      rentalIncome: rental.toFixed(2),
      rentalExpenses: rentalExp.toFixed(2),
      netRentalIncome: netRental.toFixed(2),
      interestIncome: interest.toFixed(2),
      royaltyIncome: royalties.toFixed(2),
      businessIncome: business.toFixed(2),
      businessExpenses: businessExp.toFixed(2),
      netBusinessIncome: netBusiness.toFixed(2),
      pensionIncome: pension.toFixed(2),
      socialSecurityIncome: ss.toFixed(2),
      totalPassiveIncome: totalPassive.toFixed(2),
      totalGrossPassive: totalGross.toFixed(2),
      ordinaryIncome: ordinary.toFixed(2),
      totalTaxableIncome: totalTaxable.toFixed(2),
      taxableAfterDeduction: taxableAfterDeduction.toFixed(2),
      federalTax: federalTax.toFixed(2),
      qualifiedDivTax: qualifiedDivTax.toFixed(2),
      seTax: seTax.toFixed(2),
      totalTax: (federalTax + seTax).toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      passiveRatio: passiveRatio.toFixed(1),
      hourlyEquivalent: hourlyEquivalent.toFixed(2),
      monthlyPassive: monthlyPassive.toFixed(2),
      qualifiedDivRate: (qualifiedDivRate * 100).toFixed(0),
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      standardDeduction: standardDeduction.toFixed(0),
      afterTaxPassive: (totalPassive - federalTax).toFixed(2),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Passive Income Tax Calculator</h1>
      <p className="text-zinc-600">Calculate tax implications of passive income sources including dividends, rental income, interest, royalties, and pension income.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Passive Income Sources</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Qualified Dividend Income ($)</label>
            <input
              type="number"
              value={dividendIncome}
              onChange={(e) => setDividendIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Taxed at preferential rates: 0%, 15%, or 20% based on income bracket
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Rental Income ($)</label>
            <input
              type="number"
              value={rentalIncome}
              onChange={(e) => setRentalIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Rental Expenses (deductions) ($)</label>
            <input
              type="number"
              value={rentalExpenses}
              onChange={(e) => setRentalExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Interest Income ($)</label>
            <input
              type="number"
              value={interestIncome}
              onChange={(e) => setInterestIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Taxed at ordinary income rates
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Royalty Income ($)</label>
            <input
              type="number"
              value={royaltyIncome}
              onChange={(e) => setRoyaltyIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business & Other Income</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Self-Employment/Side Business Income ($)</label>
            <input
              type="number"
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Expenses ($)</label>
            <input
              type="number"
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Pension/Annuity Income ($)</label>
            <input
              type="number"
              value={pensionIncome}
              onChange={(e) => setPensionIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Social Security Income ($)</label>
            <input
              type="number"
              value={socialSecurityIncome}
              onChange={(e) => setSocialSecurityIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">W-2/Other Ordinary Income ($)</label>
            <input
              type="number"
              value={ordinaryIncome}
              onChange={(e) => setOrdinaryIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Passive Income Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Dividends:</span>
            <span className="font-medium ml-2">${result.dividendIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Rental:</span>
            <span className="font-medium ml-2">${result.netRentalIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Interest:</span>
            <span className="font-medium ml-2">${result.interestIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Royalties:</span>
            <span className="font-medium ml-2">${result.royaltyIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Business:</span>
            <span className="font-medium ml-2">${result.netBusinessIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Pension/SS:</span>
            <span className="font-medium ml-2">${parseFloat(result.pensionIncome) + parseFloat(result.socialSecurityIncome)}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Total Passive Income</h3>
        <div className="text-2xl font-bold text-green-800">${result.totalPassiveIncome}</div>
        <div className="text-sm text-green-600 mt-2">
          Monthly: ${result.monthlyPassive} | Hourly equivalent: ${result.hourlyEquivalent}/hr
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Tax Calculation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Taxable:</span>
            <span className="font-medium ml-2">${result.totalTaxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">After Deduction:</span>
            <span className="font-medium ml-2">${result.taxableAfterDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Federal Tax:</span>
            <span className="font-medium ml-2">${result.federalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">SE Tax:</span>
            <span className="font-medium ml-2">${result.seTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Dividend Tax:</span>
            <span className="font-medium ml-2">${result.qualifiedDivTax} ({result.qualifiedDivRate}%)</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-medium ml-2">{result.effectiveRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Passive Income Efficiency</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Passive Ratio:</span>
            <span className="font-medium ml-2">{result.passiveRatio}%</span>
          </div>
          <div>
            <span className="text-zinc-600">After-Tax Passive:</span>
            <span className="font-medium ml-2">${result.afterTaxPassive}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          Passive ratio shows how much of your total income comes from passive sources vs active work.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Treatment by Income Type</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Qualified Dividends:</strong> Taxed at 0%, 15%, or 20% based on total taxable income bracket.</li>
          <li><strong>Rental Income:</strong> Ordinary income rates. Deduct expenses (mortgage interest, repairs, depreciation).</li>
          <li><strong>Interest Income:</strong> Ordinary income rates (same as W-2 wages).</li>
          <li><strong>Royalties:</strong> Ordinary income. Can deduct related expenses if you own the intellectual property.</li>
          <li><strong>Self-Employment:</strong> Ordinary rates + 15.3% SE tax (covers SS + Medicare).</li>
          <li><strong>Pension:</strong> Generally taxed as ordinary income. Roth pensions may be tax-free.</li>
          <li><strong>Social Security:</strong> Up to 85% taxable depending on combined income threshold.</li>
        </ul>
      </div>
    </main>
  )
}