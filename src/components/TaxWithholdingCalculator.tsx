'use client'

import { useState } from 'react'

export default function TaxWithholdingCalculator() {
  const [annualSalary, setAnnualSalary] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'married_separate'>('single')
  const [federalAllowances, setFederalAllowances] = useState(0)
  const [stateTaxRate, setStateTaxRate] = useState(5)
  const [otherIncome, setOtherIncome] = useState(0)
  const [deductions, setDeductions] = useState(14600)
  const [taxCredits, setTaxCredits] = useState(0)

  const calculate = () => {
    const totalIncome = annualSalary + otherIncome
    const taxableIncome = Math.max(0, totalIncome - deductions)

    let federalTax = 0
    let brackets: { rate: number; income: number }[] = []

    if (filingStatus === 'single') {
      const limits = [11000, 44725, 95475, 182100, 231250, 578125]
      const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
      let remaining = taxableIncome
      let prevLimit = 0

      for (let i = 0; i < rates.length && remaining > 0; i++) {
        const bracketWidth = i < limits.length ? limits[i] - prevLimit : Infinity
        const bracketIncome = Math.min(remaining, bracketWidth)
        federalTax += bracketIncome * rates[i]
        if (bracketIncome > 0) {
          brackets.push({ rate: rates[i] * 100, income: bracketIncome })
        }
        remaining -= bracketIncome
        prevLimit = i < limits.length ? limits[i] : prevLimit
      }
    } else if (filingStatus === 'married') {
      const limits = [22000, 89450, 190750, 364200, 462500, 693750]
      const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
      let remaining = taxableIncome
      let prevLimit = 0

      for (let i = 0; i < rates.length && remaining > 0; i++) {
        const bracketWidth = i < limits.length ? limits[i] - prevLimit : Infinity
        const bracketIncome = Math.min(remaining, bracketWidth)
        federalTax += bracketIncome * rates[i]
        if (bracketIncome > 0) {
          brackets.push({ rate: rates[i] * 100, income: bracketIncome })
        }
        remaining -= bracketIncome
        prevLimit = i < limits.length ? limits[i] : prevLimit
      }
    } else {
      const limits = [11000, 44725, 95475, 182100, 231250, 346875]
      const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
      let remaining = taxableIncome
      let prevLimit = 0

      for (let i = 0; i < rates.length && remaining > 0; i++) {
        const bracketWidth = i < limits.length ? limits[i] - prevLimit : Infinity
        const bracketIncome = Math.min(remaining, bracketWidth)
        federalTax += bracketIncome * rates[i]
        if (bracketIncome > 0) {
          brackets.push({ rate: rates[i] * 100, income: bracketIncome })
        }
        remaining -= bracketIncome
        prevLimit = i < limits.length ? limits[i] : prevLimit
      }
    }

    federalTax = Math.max(0, federalTax - taxCredits)

    const stateTax = taxableIncome * (stateTaxRate / 100)

    const totalTax = federalTax + stateTax
    const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0

    const monthlyGross = totalIncome / 12
    const monthlyFederal = federalTax / 12
    const monthlyState = stateTax / 12
    const monthlyTotal = totalTax / 12
    const monthlyNet = monthlyGross - monthlyTotal

    const biweeklyGross = totalIncome / 26
    const biweeklyFederal = federalTax / 26
    const biweeklyState = stateTax / 26
    const biweeklyTotal = totalTax / 26
    const biweeklyNet = biweeklyGross - biweeklyTotal

    const socialSecurityRate = 0.062
    const medicareRate = 0.0145
    const socialSecurityTax = Math.min(annualSalary, 168600) * socialSecurityRate
    const medicareTax = annualSalary * medicareRate
    const additionalMedicare = annualSalary > 200000 ? (annualSalary - 200000) * 0.009 : 0

    const totalFICA = socialSecurityTax + medicareTax + additionalMedicare
    const totalPayrollTax = totalTax + totalFICA
    const netAnnual = totalIncome - totalPayrollTax

    return {
      annualSalary: annualSalary.toFixed(2),
      otherIncome: otherIncome.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      deductions: deductions.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      federalAllowances: federalAllowances.toFixed(0),
      federalTax: federalTax.toFixed(2),
      stateTaxRate: stateTaxRate.toFixed(1),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      taxCredits: taxCredits.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      brackets,
      monthlyGross: monthlyGross.toFixed(2),
      monthlyFederal: monthlyFederal.toFixed(2),
      monthlyState: monthlyState.toFixed(2),
      monthlyTotal: monthlyTotal.toFixed(2),
      monthlyNet: monthlyNet.toFixed(2),
      biweeklyGross: biweeklyGross.toFixed(2),
      biweeklyFederal: biweeklyFederal.toFixed(2),
      biweeklyState: biweeklyState.toFixed(2),
      biweeklyTotal: biweeklyTotal.toFixed(2),
      biweeklyNet: biweeklyNet.toFixed(2),
      socialSecurityTax: socialSecurityTax.toFixed(2),
      medicareTax: medicareTax.toFixed(2),
      additionalMedicare: additionalMedicare.toFixed(2),
      totalFICA: totalFICA.toFixed(2),
      totalPayrollTax: totalPayrollTax.toFixed(2),
      netAnnual: netAnnual.toFixed(2),
      filingStatus,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Withholding Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate federal and state tax withholding for payroll.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Salary ($)</label>
          <input
            type="number"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married' | 'married_separate')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="married_separate">Married Filing Separately</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Income ($)</label>
          <input
            type="number"
            value={otherIncome}
            onChange={(e) => setOtherIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Deductions ($)</label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input
            type="number"
            value={stateTaxRate}
            onChange={(e) => setStateTaxRate(Number(e.target.value))}
            className="w-full border rounded p-2"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Credits ($)</label>
          <input
            type="number"
            value={taxCredits}
            onChange={(e) => setTaxCredits(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Total Income:</span>
            <span className="font-medium ml-2">$ {result.totalIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Income:</span>
            <span className="font-medium ml-2">$ {result.taxableIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Federal Tax:</span>
            <span className="font-medium ml-2">$ {result.federalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">State Tax:</span>
            <span className="font-medium ml-2">$ {result.stateTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.totalTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-medium ml-2">{result.effectiveRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Withholding</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Gross Pay:</span>
            <span className="font-medium ml-2">$ {result.monthlyGross}</span>
          </div>
          <div>
            <span className="text-zinc-600">Federal:</span>
            <span className="font-medium ml-2">$ {result.monthlyFederal}</span>
          </div>
          <div>
            <span className="text-zinc-600">State:</span>
            <span className="font-medium ml-2">$ {result.monthlyState}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-medium ml-2">$ {result.monthlyTotal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Pay:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.monthlyNet}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Biweekly Withholding</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Gross Pay:</span>
            <span className="font-medium ml-2">$ {result.biweeklyGross}</span>
          </div>
          <div>
            <span className="text-zinc-600">Federal:</span>
            <span className="font-medium ml-2">$ {result.biweeklyFederal}</span>
          </div>
          <div>
            <span className="text-zinc-600">State:</span>
            <span className="font-medium ml-2">$ {result.biweeklyState}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className="font-medium ml-2">$ {result.biweeklyTotal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Pay:</span>
            <span className="font-bold text-orange-700 ml-2">$ {result.biweeklyNet}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">FICA Taxes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Social Security (6.2%):</span>
            <span className="font-medium ml-2">$ {result.socialSecurityTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Medicare (1.45%):</span>
            <span className="font-medium ml-2">$ {result.medicareTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Add. Medicare:</span>
            <span className="font-medium ml-2">$ {result.additionalMedicare}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total FICA:</span>
            <span className="font-bold ml-2">$ {result.totalFICA}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Payroll:</span>
            <span className="font-bold text-purple-700 ml-2">$ {result.totalPayrollTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Annual:</span>
            <span className="font-bold text-green-700 ml-2">$ {result.netAnnual}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">2024 Tax Brackets</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Single:</strong> 10% ($0-$11K), 12% ($11K-$44.7K), 22% ($44.7K-$95.5K), 24% ($95.5K-$182K), 32% ($182K-$231K), 35% ($231K-$578K), 37% (over $578K)</p>
          <p><strong>Married:</strong> Brackets double for joint filers</p>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">Adjusting W-4</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Submit new W-4 to employer to change withholding</li>
          <li>Step 3: Claim dependents and other credits</li>
          <li>Step 4a: Other income not from jobs</li>
          <li>Step 4b: Deductions beyond standard</li>
          <li>Step 4c: Extra withholding per paycheck</li>
          <li>IRS Tax Withholding Estimator tool available online</li>
        </ul>
      </div>
    </div>
  )
}