'use client'

import { useState } from 'react'

export default function BusinessEntityTaxComparisonCalculator() {
  const [annualRevenue, setAnnualRevenue] = useState(500000)
  const [businessType, setBusinessType] = useState<'soleProp' | 'llc' | 'sCorp' | 'cCorp'>('llc')
  const [ownerSalary, setOwnerSalary] = useState(100000)
  const [stateTaxRate, setStateTaxRate] = useState(8)
  const [hasEmployees, setHasEmployees] = useState(false)
  const [employeeCount, setEmployeeCount] = useState(5)
  const [employeePayroll, setEmployeePayroll] = useState(200000)
  const [deductions, setDeductions] = useState(50000)
  const [isPassiveIncome, setIsPassiveIncome] = useState(false)

  const calculate = () => {
    // Business Entity Tax Comparison
    // Compare tax implications across business structures

    // Sole Proprietorship: Schedule C, self-employment tax on net income
    // LLC (default): Same as sole prop if single-member, partnership if multi
    // S-Corp: Salary + distributions (distributions avoid SE tax)
    // C-Corp: Double taxation (corporate + dividend), but can retain earnings

    const netIncome = annualRevenue - deductions - ownerSalary

    // Federal tax brackets 2024
    const federalBrackets = [
      { min: 0, max: 11600, rate: 10 },
      { min: 11600, max: 47150, rate: 12 },
      { min: 47150, max: 100525, rate: 22 },
      { min: 100525, max: 191950, rate: 24 },
      { min: 191950, max: 243725, rate: 32 },
      { min: 243725, max: 609350, rate: 35 },
      { min: 609350, max: Infinity, rate: 37 },
    ]

    const calculateFederalTax = (income: number) => {
      let tax = 0
      let remaining = income
      for (const bracket of federalBrackets) {
        const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
        tax += taxableInBracket * (bracket.rate / 100)
        remaining -= taxableInBracket
        if (remaining <= 0) break
      }
      return tax
    }

    // Self-employment tax rate (15.3% on net income)
    const seTaxRate = 0.153
    const seTaxMaxIncome = 168600 // 2024 limit for Social Security portion

    // State tax (simplified)
    const stateTax = netIncome * (stateTaxRate / 100)

    // Calculate taxes for each entity type

    // Sole Proprietorship / Single-Member LLC (disregarded entity)
    const solePropTax = {
      federalTax: calculateFederalTax(netIncome),
      seTax: Math.min(netIncome, seTaxMaxIncome) * 0.124 + netIncome * 0.029,
      stateTax: stateTax,
      totalTax: 0,
      effectiveRate: 0,
    }
    solePropTax.totalTax = solePropTax.federalTax + solePropTax.seTax + solePropTax.stateTax
    solePropTax.effectiveRate = (solePropTax.totalTax / netIncome) * 100

    // S-Corporation
    // Salary is subject to FICA, distributions are not
    const sCorpTax = {
      salaryFica: Math.min(ownerSalary, seTaxMaxIncome) * 0.124 + ownerSalary * 0.029,
      salaryFederal: calculateFederalTax(ownerSalary),
      distributionFederal: calculateFederalTax(netIncome),
      stateTax: stateTax,
      totalTax: 0,
      effectiveRate: 0,
      seSavings: 0,
    }
    // S-Corp income passes through to owner
    sCorpTax.totalTax = sCorpTax.salaryFica + sCorpTax.salaryFederal + sCorpTax.distributionFederal + sCorpTax.stateTax
    sCorpTax.effectiveRate = (sCorpTax.totalTax / (annualRevenue - deductions)) * 100
    sCorpTax.seSavings = solePropTax.seTax - sCorpTax.salaryFica

    // C-Corporation
    // Corporate tax (flat 21% federal) + dividend tax on distributions
    const cCorpTaxRate = 0.21
    const dividendTaxRate = 0.15 // Qualified dividends (assumed)
    const cCorpNetIncome = annualRevenue - deductions - ownerSalary - employeePayroll
    const cCorpTax = {
      corporateTax: cCorpNetIncome * cCorpTaxRate,
      dividendTax: cCorpNetIncome * dividendTaxRate, // If distributed
      ownerSalaryTax: calculateFederalTax(ownerSalary),
      salaryFica: Math.min(ownerSalary, seTaxMaxIncome) * 0.124 + ownerSalary * 0.029,
      stateTax: cCorpNetIncome * (stateTaxRate / 100),
      totalTaxIfDistributed: 0,
      totalTaxIfRetained: 0,
      doubleTaxPenalty: 0,
    }
    cCorpTax.totalTaxIfDistributed = cCorpTax.corporateTax + cCorpTax.dividendTax + cCorpTax.ownerSalaryTax + cCorpTax.salaryFica + cCorpTax.stateTax
    cCorpTax.totalTaxIfRetained = cCorpTax.corporateTax + cCorpTax.ownerSalaryTax + cCorpTax.salaryFica + cCorpTax.stateTax
    cCorpTax.doubleTaxPenalty = cCorpTax.dividendTax

    // LLC - treated as sole prop for single-member
    const llcTax = businessType === 'llc' ? solePropTax : null

    // Comparison
    const taxesByEntity = {
      soleProp: solePropTax.totalTax,
      sCorp: sCorpTax.totalTax,
      cCorpDistributed: cCorpTax.totalTaxIfDistributed,
      cCorpRetained: cCorpTax.totalTaxIfRetained,
    }

    // Best entity recommendation
    let bestEntity = ''
    let recommendation = ''

    if (isPassiveIncome) {
      bestEntity = 'LLC/Sole Prop'
      recommendation = 'Passive income benefits from simplicity - no SE tax on passive income'
    } else if (netIncome > 100000 && sCorpTax.seSavings > 5000) {
      bestEntity = 'S-Corp'
      recommendation = `S-Corp saves $${sCorpTax.seSavings.toFixed(0)} in SE tax through distribution strategy`
    } else if (hasEmployees && annualRevenue > 1000000) {
      bestEntity = 'C-Corp (retain earnings)'
      recommendation = 'Large business with employees - C-Corp can retain earnings and deduct benefits'
    } else if (netIncome < 50000) {
      bestEntity = 'Sole Proprietorship'
      recommendation = 'Low income - simplicity outweighs SE tax savings from S-Corp'
    } else {
      bestEntity = 'LLC (flexible)'
      recommendation = 'LLC provides liability protection with pass-through taxation flexibility'
    }

    // S-Corp reasonable compensation requirement
    const reasonableCompNote = ownerSalary < netIncome * 0.4
      ? `Warning: Salary may be below reasonable compensation (40-60% of profits recommended)`
      : 'Salary appears reasonable'

    // Additional considerations
    const considerations: string[] = []
    if (hasEmployees) considerations.push('Payroll tax obligations for employees')
    if (businessType === 'cCorp') considerations.push('Corporate formalities required')
    if (sCorpTax.seSavings > 0) considerations.push(`SE tax savings potential: $${sCorpTax.seSavings.toFixed(0)}`)
    if (cCorpTax.doubleTaxPenalty > 0) considerations.push(`C-Corp double tax penalty if distributed: $${cCorpTax.doubleTaxPenalty.toFixed(0)}`)
    considerations.push('State-specific rules may vary')
    considerations.push('Consult tax professional for final decision')

    return {
      annualRevenue: annualRevenue.toFixed(0),
      deductions: deductions.toFixed(0),
      ownerSalary: ownerSalary.toFixed(0),
      netIncome: netIncome.toFixed(0),
      businessType,
      stateTaxRate: stateTaxRate.toFixed(0),
      hasEmployees,
      employeeCount: employeeCount.toFixed(0),
      isPassiveIncome,
      solePropTax,
      sCorpTax,
      cCorpTax,
      taxesByEntity,
      bestEntity,
      recommendation,
      reasonableCompNote,
      considerations,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Business Entity Tax Comparison Calculator</h1>
      <p className="text-gray-600 mb-4">Compare tax implications across business structures.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Revenue</label>
          <input type="number" value={annualRevenue} onChange={(e) => setAnnualRevenue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business Deductions</label>
          <input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Owner Salary (for S/C-Corp)</label>
          <input type="number" value={ownerSalary} onChange={(e) => setOwnerSalary(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateTaxRate} min="0" max="15" onChange={(e) => setStateTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has Employees?</label>
          <select value={hasEmployees ? 'yes' : 'no'} onChange={(e) => setHasEmployees(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - solo business</option>
            <option value="yes">Yes - has employees</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Passive Income Business?</label>
          <select value={isPassiveIncome ? 'yes' : 'no'} onChange={(e) => setIsPassiveIncome(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - active business</option>
            <option value="yes">Yes - rental/investment income</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Sole Proprietorship / Single-Member LLC</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-medium ml-2">$ {result.solePropTax.federalTax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">SE Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.solePropTax.seTax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">State Tax:</span><span className="font-medium ml-2">$ {result.solePropTax.stateTax.toFixed(0)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.solePropTax.totalTax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.solePropTax.effectiveRate.toFixed(1)}%</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">SE tax applies to full net income (no salary/distribution split).</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">S-Corporation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Salary FICA:</span><span className="font-medium ml-2">$ {result.sCorpTax.salaryFica.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Salary Federal:</span><span className="font-medium ml-2">$ {result.sCorpTax.salaryFederal.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Distribution Tax:</span><span className="font-medium ml-2">$ {result.sCorpTax.distributionFederal.toFixed(0)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.sCorpTax.totalTax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">SE Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.sCorpTax.seSavings.toFixed(0)}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.reasonableCompNote}</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">C-Corporation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Corporate Tax (21%):</span><span className="font-medium ml-2">$ {result.cCorpTax.corporateTax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Dividend Tax:</span><span className="font-medium ml-2">$ {result.cCorpTax.dividendTax.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">Salary Tax:</span><span className="font-medium ml-2">$ {result.cCorpTax.ownerSalaryTax.toFixed(0)}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">If Distributed:</span><span className="font-bold text-red-700 ml-2">$ {result.cCorpTax.totalTaxIfDistributed.toFixed(0)}</span></div>
          <div><span className="text-zinc-600">If Retained:</span><span className="font-bold text-blue-700 ml-2">$ {result.cCorpTax.totalTaxIfRetained.toFixed(0)}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Double taxation if earnings distributed as dividends.</div>
      </div>

      <div className={`card mb-6 ${result.bestEntity.includes('S-Corp') ? 'bg-purple-50 border border-purple-200' : result.bestEntity.includes('C-Corp') ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommended Entity Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Best Entity:</span><span className="font-bold ml-2">{result.bestEntity}</span></div>
          <div><span className="text-zinc-600">Net Income:</span><span className="font-medium ml-2">$ {result.netIncome}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Comparison Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Entity Type</th>
                <th className="py-2 text-left">Total Tax</th>
                <th className="py-2 text-left">Key Feature</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-1 font-semibold">Sole Prop/LLC</td>
                <td className="py-1">$ {result.taxesByEntity.soleProp.toFixed(0)}</td>
                <td className="py-1">SE tax on all income</td>
              </tr>
              <tr className="border-b">
                <td className="py-1 font-semibold">S-Corp</td>
                <td className="py-1">$ {result.taxesByEntity.sCorp.toFixed(0)}</td>
                <td className="py-1">Distributions avoid SE tax</td>
              </tr>
              <tr className="border-b">
                <td className="py-1 font-semibold">C-Corp (distributed)</td>
                <td className="py-1">$ {result.taxesByEntity.cCorpDistributed.toFixed(0)}</td>
                <td className="py-1">Double taxation</td>
              </tr>
              <tr className="border-b">
                <td className="py-1 font-semibold">C-Corp (retained)</td>
                <td className="py-1">$ {result.taxesByEntity.cCorpRetained.toFixed(0)}</td>
                <td className="py-1">No dividend tax</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Business Entity Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.considerations.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}