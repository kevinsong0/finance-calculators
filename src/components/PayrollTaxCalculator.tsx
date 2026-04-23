'use client'

import { useState } from 'react'

export default function PayrollTaxCalculator() {
  const [employeeCount, setEmployeeCount] = useState('10')
  const [totalWages, setTotalWages] = useState('500000')
  const [avgWage, setAvgWage] = useState('50000')
  const [state, setState] = useState('CA')
  const [hasHealthInsurance, setHasHealthInsurance] = useState(true)
  const [healthInsuranceCost, setHealthInsuranceCost] = useState('6000')
  const [retirementMatchPercent, setRetirementMatchPercent] = useState('3')
  const [futaRate, setFutaRate] = useState('0.6')

  // State unemployment tax rates (simplified estimates)
  const stateUITaxRates: Record<string, { rate: number; newEmployer: number; maxWage: number }> = {
    CA: { rate: 3.4, newEmployer: 3.4, maxWage: 7000 },
    TX: { rate: 2.7, newEmployer: 2.7, maxWage: 9000 },
    NY: { rate: 4.0, newEmployer: 4.0, maxWage: 12000 },
    FL: { rate: 2.7, newEmployer: 2.7, maxWage: 7000 },
    AZ: { rate: 2.0, newEmployer: 2.0, maxWage: 7000 },
    WA: { rate: 3.5, newEmployer: 3.5, maxWage: 68500 },
    PA: { rate: 3.0, newEmployer: 3.0, maxWage: 10000 },
    IL: { rate: 3.1, newEmployer: 3.1, maxWage: 13800 },
    CO: { rate: 2.4, newEmployer: 2.4, maxWage: 13700 },
    NV: { rate: 2.5, newEmployer: 2.5, maxWage: 36500 },
  }

  const calculate = () => {
    const employees = parseFloat(employeeCount) || 0
    const wages = parseFloat(totalWages) || 0
    const avg = parseFloat(avgWage) || 0
    const healthCost = parseFloat(healthInsuranceCost) || 0
    const matchPercent = parseFloat(retirementMatchPercent) || 0
    const futa = parseFloat(futaRate) || 0.6

    const stateData = stateUITaxRates[state] || { rate: 2.5, newEmployer: 2.5, maxWage: 7000 }

    // Social Security Tax (6.2% up to $168,600 per employee)
    const ssLimit = 168600
    const ssTaxableWages = Math.min(wages, employees * ssLimit)
    const employerSS = ssTaxableWages * 0.062
    const employeeSS = ssTaxableWages * 0.062
    const totalSS = employerSS + employeeSS

    // Medicare Tax (1.45% all wages + 0.9% additional for high earners)
    const employerMedicare = wages * 0.0145
    const employeeMedicare = wages * 0.0145
    const additionalMedicareWages = Math.max(0, avg - 200000) * employees // Simplified
    const employeeAdditionalMedicare = additionalMedicareWages * 0.009
    const totalMedicare = employerMedicare + employeeMedicare + employeeAdditionalMedicare

    // FUTA (Federal Unemployment Tax) - 0.6% on first $7,000 per employee (after SUTA credit)
    const futaTaxableWages = Math.min(wages, employees * 7000)
    const futaTax = futaTaxableWages * (futa / 100)

    // SUTA (State Unemployment Tax)
    const sutaxTaxableWages = Math.min(wages, employees * stateData.maxWage)
    const sutaxTax = sutaxTaxableWages * (stateData.rate / 100)

    // Employer-paid health insurance
    const totalHealthInsurance = hasHealthInsurance ? healthCost * employees : 0

    // Employer 401(k) match contribution
    const retirementMatch = wages * (matchPercent / 100)

    // Total employer payroll costs
    const totalEmployerTaxes = employerSS + employerMedicare + futaTax + sutaxTax
    const totalEmployerBenefits = totalHealthInsurance + retirementMatch
    const totalEmployerCost = totalEmployerTaxes + totalEmployerBenefits

    // Total employee deductions
    const totalEmployeeDeductions = employeeSS + employeeMedicare + employeeAdditionalMedicare

    // Cost per employee
    const employerCostPerEmployee = totalEmployerCost / employees
    const employeeDeductionPerEmployee = totalEmployeeDeductions / employees

    // Effective employer cost ratio
    const employerCostRatio = wages > 0 ? (totalEmployerCost / wages) * 100 : 0

    return {
      employeeCount: employees.toFixed(0),
      totalWages: wages.toFixed(2),
      avgWage: avg.toFixed(2),
      state: state,
      ssTaxableWages: ssTaxableWages.toFixed(2),
      employerSS: employerSS.toFixed(2),
      employeeSS: employeeSS.toFixed(2),
      totalSS: totalSS.toFixed(2),
      employerMedicare: employerMedicare.toFixed(2),
      employeeMedicare: employeeMedicare.toFixed(2),
      employeeAdditionalMedicare: employeeAdditionalMedicare.toFixed(2),
      totalMedicare: totalMedicare.toFixed(2),
      futaTax: futaTax.toFixed(2),
      sutaxTax: sutaxTax.toFixed(2),
      sutaxRate: stateData.rate.toFixed(1),
      sutaxMaxWage: stateData.maxWage.toFixed(0),
      totalEmployerTaxes: totalEmployerTaxes.toFixed(2),
      totalHealthInsurance: totalHealthInsurance.toFixed(2),
      retirementMatch: retirementMatch.toFixed(2),
      totalEmployerBenefits: totalEmployerBenefits.toFixed(2),
      totalEmployerCost: totalEmployerCost.toFixed(2),
      totalEmployeeDeductions: totalEmployeeDeductions.toFixed(2),
      employerCostPerEmployee: employerCostPerEmployee.toFixed(2),
      employeeDeductionPerEmployee: employeeDeductionPerEmployee.toFixed(2),
      employerCostRatio: employerCostRatio.toFixed(2),
      hasHealthInsurance,
      healthInsurancePerEmployee: healthCost.toFixed(2),
      retirementMatchPercent: matchPercent.toFixed(1),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Payroll Tax Calculator for Employers</h1>
      <p className="text-zinc-600">Calculate employer payroll taxes including Social Security, Medicare, FUTA, SUTA, and employee benefit costs. Estimate total employer cost per employee.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Employee & Wage Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Employees</label>
            <input
              type="number"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              className="input"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Annual Wages ($)</label>
            <input
              type="number"
              value={totalWages}
              onChange={(e) => setTotalWages(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Average Wage per Employee ($)</label>
            <input
              type="number"
              value={avgWage}
              onChange={(e) => setAvgWage(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State (for SUTA calculation)</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
            >
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="NY">New York</option>
              <option value="FL">Florida</option>
              <option value="AZ">Arizona</option>
              <option value="WA">Washington</option>
              <option value="PA">Pennsylvania</option>
              <option value="IL">Illinois</option>
              <option value="CO">Colorado</option>
              <option value="NV">Nevada</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Employee Benefits</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasHealthInsurance}
              onChange={(e) => setHasHealthInsurance(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Employer provides health insurance</label>
          </div>
          {hasHealthInsurance && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Health Insurance Cost per Employee ($/year)</label>
              <input
                type="number"
                value={healthInsuranceCost}
                onChange={(e) => setHealthInsuranceCost(e.target.value)}
                className="input"
                min="0"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">401(k) Match Percentage (%)</label>
            <input
              type="number"
              value={retirementMatchPercent}
              onChange={(e) => setRetirementMatchPercent(e.target.value)}
              className="input"
              min="0"
              max="25"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Common match: 3% to 6% of employee salary
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Payroll Tax Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Social Security (Employer):</span>
            <span className="font-medium ml-2">${result.employerSS}</span>
            <div className="text-xs text-blue-600">6.2% up to $168,600/employee</div>
          </div>
          <div>
            <span className="text-zinc-600">Social Security (Employee):</span>
            <span className="font-medium ml-2">${result.employeeSS}</span>
            <div className="text-xs text-blue-600">6.2% withheld from wages</div>
          </div>
          <div>
            <span className="text-zinc-600">Medicare (Employer):</span>
            <span className="font-medium ml-2">${result.employerMedicare}</span>
            <div className="text-xs text-blue-600">1.45% on all wages</div>
          </div>
          <div>
            <span className="text-zinc-600">Medicare (Employee):</span>
            <span className="font-medium ml-2">${result.employeeMedicare}</span>
            <div className="text-xs text-blue-600">1.45% withheld + 0.9% additional over $200K</div>
          </div>
          <div>
            <span className="text-zinc-600">FUTA:</span>
            <span className="font-medium ml-2">${result.futaTax}</span>
            <div className="text-xs text-blue-600">0.6% on first $7,000/employee</div>
          </div>
          <div>
            <span className="text-zinc-600">SUTA ({result.state}):</span>
            <span className="font-medium ml-2">${result.sutaxTax}</span>
            <div className="text-xs text-blue-600">{result.sutaxRate}% on first ${result.sutaxMaxWage}/employee</div>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Total Employer Payroll Taxes</h3>
        <div className="text-2xl font-bold text-purple-800">${result.totalEmployerTaxes}</div>
        <div className="text-sm text-purple-600 mt-1">
          SS + Medicare + FUTA + SUTA paid by employer
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Employee Benefits Cost</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Health Insurance:</span>
            <span className="font-medium ml-2">${result.totalHealthInsurance}</span>
          </div>
          <div>
            <span className="text-zinc-600">401(k) Match:</span>
            <span className="font-medium ml-2">${result.retirementMatch}</span>
          </div>
        </div>
        <div className="text-lg font-bold mt-2">${result.totalEmployerBenefits}</div>
        <div className="text-sm text-green-600">Total benefits paid by employer</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Total Employer Cost</h3>
        <div className="text-2xl font-bold text-orange-800">${result.totalEmployerCost}</div>
        <div className="text-sm text-orange-600 mt-2">
          Payroll taxes + Employee benefits
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
          <div>
            <span className="text-zinc-600">Cost per Employee:</span>
            <span className="font-medium ml-2">${result.employerCostPerEmployee}/year</span>
          </div>
          <div>
            <span className="text-zinc-600">Cost Ratio:</span>
            <span className="font-medium ml-2">{result.employerCostRatio}% of wages</span>
          </div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Employee Payroll Deductions</h3>
        <div className="text-xl font-bold text-red-800">${result.totalEmployeeDeductions}</div>
        <div className="text-sm text-red-600 mt-1">
          SS + Medicare withheld from employee paychecks
        </div>
        <div className="text-sm mt-2">
          Per employee: ${result.employeeDeductionPerEmployee}/year
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payroll Tax Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Social Security:</strong> 6.2% each (employer + employee) on wages up to $168,600 per employee in 2024.</li>
          <li><strong>Medicare:</strong> 1.45% each on all wages. Employee pays extra 0.9% on wages over $200,000.</li>
          <li><strong>FUTA:</strong> Federal unemployment tax. 0.6% on first $7,000 per employee after SUTA credit.</li>
          <li><strong>SUTA:</strong> State unemployment tax. Rates vary by state and employer history. New employers pay fixed rate.</li>
          <li><strong>Health Insurance:</strong> Employer portion deductible. Small businesses may qualify for tax credits.</li>
          <li><strong>401(k) Match:</strong> Employer contributions deductible up to 25% of total compensation.</li>
          <li><strong>Total Employer Cost:</strong> Typically 15-20% above wages for taxes and benefits.</li>
          <li><strong>Pay Frequency:</strong> Calculate taxes per pay period and remit to IRS/state agencies.</li>
        </ul>
      </div>
    </main>
  )
}