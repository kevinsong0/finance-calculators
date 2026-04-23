'use client'

import { useState } from 'react'

export default function BusinessTaxDeductionCalculator() {
  const [businessIncome, setBusinessIncome] = useState('150000')
  const [businessType, setBusinessType] = useState('llc')
  const [filingStatus, setFilingStatus] = useState('single')
  const [officeRent, setOfficeRent] = useState('18000')
  const [equipmentCost, setEquipmentCost] = useState('12000')
  const [vehicleExpenses, setVehicleExpenses] = useState('8000')
  const [travelExpenses, setTravelExpenses] = useState('5000')
  const [mealsEntertainment, setMealsEntertainment] = useState('2000')
  const [insurance, setInsurance] = useState('4000')
  const [professionalServices, setProfessionalServices] = useState('6000')
  const [salaries, setSalaries] = useState('40000')
  const [retirementContribution, setRetirementContribution] = useState('23000')
  const [healthInsurance, setHealthInsurance] = useState('12000')
  const [otherExpenses, setOtherExpenses] = useState('3000')
  const [homeOfficeSquareFeet, setHomeOfficeSquareFeet] = useState('200')
  const [useHomeOffice, setUseHomeOffice] = useState(false)
  const [vehicleMilesBusiness, setVehicleMilesBusiness] = useState('5000')

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

  const calculate = () => {
    const income = parseFloat(businessIncome) || 0
    const rent = parseFloat(officeRent) || 0
    const equipment = parseFloat(equipmentCost) || 0
    const vehicle = parseFloat(vehicleExpenses) || 0
    const travel = parseFloat(travelExpenses) || 0
    const meals = parseFloat(mealsEntertainment) || 0
    const ins = parseFloat(insurance) || 0
    const profServices = parseFloat(professionalServices) || 0
    const salary = parseFloat(salaries) || 0
    const retirement = parseFloat(retirementContribution) || 0
    const healthIns = parseFloat(healthInsurance) || 0
    const other = parseFloat(otherExpenses) || 0
    const homeOfficeSF = parseFloat(homeOfficeSquareFeet) || 0
    const vehicleMiles = parseFloat(vehicleMilesBusiness) || 0

    // Deduction calculations
    const mealsDeduction = meals * 0.5 // 50% deductible
    const homeOfficeDeduction = useHomeOffice ? Math.min(homeOfficeSF * 5, 1500) : 0
    const standardMileageRate = 0.67 // 2024 rate
    const vehicleMileageDeduction = vehicleMiles * standardMileageRate

    // Use mileage deduction if higher than actual expenses (simplified)
    const vehicleDeduction = Math.max(vehicle, vehicleMileageDeduction)

    // Total deductions
    const totalDeductions = rent + equipment + vehicleDeduction + travel +
                           mealsDeduction + ins + profServices + salary +
                           retirement + healthIns + other + homeOfficeDeduction

    // Net business income
    const netIncome = income - totalDeductions

    // Self-employment tax calculation
    const seTaxableIncome = netIncome * 0.9235
    const ssLimit = 168600
    const ssTax = Math.min(seTaxableIncome, ssLimit) * 0.124
    const medicareTax = seTaxableIncome * 0.029
    const additionalMedicare = seTaxableIncome > 200000 ? (seTaxableIncome - 200000) * 0.009 : 0
    const seTax = ssTax + medicareTax + additionalMedicare

    // Deduct half of SE tax
    const seTaxDeduction = seTax / 2

    // QBI deduction (20% of qualified business income)
    const qbiDeduction = Math.min(netIncome * 0.20, netIncome * 0.20)

    // Taxable income for income tax
    const taxableForIncomeTax = Math.max(0, netIncome - seTaxDeduction - qbiDeduction)
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200
    const totalTaxable = Math.max(0, taxableForIncomeTax - standardDeduction)

    // Calculate income tax
    const brackets = taxBrackets[filingStatus]
    let incomeTax = 0
    let remaining = totalTaxable

    for (const bracket of brackets) {
      if (remaining <= 0) break
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
      incomeTax += taxableInBracket * bracket.rate
      remaining -= taxableInBracket
    }

    // Total tax
    const totalTax = incomeTax + seTax

    // Effective tax rate
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0

    // Tax savings from deductions
    const taxWithoutDeductions = income * 0.30 // Simplified estimate
    const taxSavings = taxWithoutDeductions - totalTax

    return {
      businessIncome: income.toFixed(2),
      businessType: businessType === 'llc' ? 'LLC/Sole Proprietor' :
                    businessType === 'scorp' ? 'S-Corporation' : 'C-Corporation',
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      officeRent: rent.toFixed(2),
      equipmentCost: equipment.toFixed(2),
      vehicleExpenses: vehicleDeduction.toFixed(2),
      travelExpenses: travel.toFixed(2),
      mealsEntertainment: mealsDeduction.toFixed(2),
      insurance: ins.toFixed(2),
      professionalServices: profServices.toFixed(2),
      salaries: salary.toFixed(2),
      retirementContribution: retirement.toFixed(2),
      healthInsurance: healthIns.toFixed(2),
      otherExpenses: other.toFixed(2),
      homeOfficeDeduction: homeOfficeDeduction.toFixed(2),
      vehicleMileageDeduction: vehicleMileageDeduction.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      netBusinessIncome: netIncome.toFixed(2),
      seTax: seTax.toFixed(2),
      seTaxDeduction: seTaxDeduction.toFixed(2),
      qbiDeduction: qbiDeduction.toFixed(2),
      taxableForIncomeTax: taxableForIncomeTax.toFixed(2),
      totalTaxable: totalTaxable.toFixed(2),
      incomeTax: incomeTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      taxSavings: Math.max(0, taxSavings).toFixed(2),
      useHomeOffice,
      homeOfficeSquareFeet: homeOfficeSF.toFixed(0),
      vehicleMilesBusiness: vehicleMiles.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Tax Deduction Calculator</h1>
      <p className="text-zinc-600">Calculate tax deductions for self-employed individuals and small business owners. Estimate savings from common business expenses, retirement contributions, and the QBI deduction.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="input"
            >
              <option value="llc">LLC / Sole Proprietor</option>
              <option value="scorp">S-Corporation</option>
              <option value="ccorp">C-Corporation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Business Income ($)</label>
            <input
              type="number"
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
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

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Operating Expenses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Office Rent ($)</label>
            <input
              type="number"
              value={officeRent}
              onChange={(e) => setOfficeRent(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Equipment/Supplies ($)</label>
            <input
              type="number"
              value={equipmentCost}
              onChange={(e) => setEquipmentCost(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Vehicle Expenses (actual) ($)</label>
            <input
              type="number"
              value={vehicleExpenses}
              onChange={(e) => setVehicleExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Miles Driven</label>
            <input
              type="number"
              value={vehicleMilesBusiness}
              onChange={(e) => setVehicleMilesBusiness(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Standard mileage rate: $0.67/mile (2024). Calculator uses whichever is higher.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Travel Expenses ($)</label>
            <input
              type="number"
              value={travelExpenses}
              onChange={(e) => setTravelExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Meals & Entertainment ($)</label>
            <input
              type="number"
              value={mealsEntertainment}
              onChange={(e) => setMealsEntertainment(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Only 50% deductible for business meals
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Other Deductible Expenses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Insurance (business) ($)</label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Professional Services (legal, accounting) ($)</label>
            <input
              type="number"
              value={professionalServices}
              onChange={(e) => setProfessionalServices(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Employee Salaries/Wages ($)</label>
            <input
              type="number"
              value={salaries}
              onChange={(e) => setSalaries(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Retirement Contribution (SEP-IRA, Solo 401k) ($)</label>
            <input
              type="number"
              value={retirementContribution}
              onChange={(e) => setRetirementContribution(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              SEP-IRA: up to 25% of net income ($69,000 max). Solo 401k: $23,000 + 25% of net income.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Self-Employed Health Insurance ($)</label>
            <input
              type="number"
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              100% deductible for self-employed (deducted from gross income, not SE tax)
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Business Expenses ($)</label>
            <input
              type="number"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Home Office Deduction</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useHomeOffice}
              onChange={(e) => setUseHomeOffice(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Use simplified home office deduction</label>
          </div>
          {useHomeOffice && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Home Office Square Feet</label>
              <input
                type="number"
                value={homeOfficeSquareFeet}
                onChange={(e) => setHomeOfficeSquareFeet(e.target.value)}
                className="input"
                min="0"
                max="300"
              />
              <div className="text-xs text-zinc-500 mt-1">
                Simplified method: $5/sq ft, max $1,500 (300 sq ft). Regular method may yield higher deduction.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Deduction Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Operating Expenses:</span>
            <span className="font-medium ml-2">${parseFloat(result.officeRent) + parseFloat(result.equipmentCost) + parseFloat(result.vehicleExpenses) + parseFloat(result.travelExpenses)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Professional Services:</span>
            <span className="font-medium ml-2">${result.professionalServices}</span>
          </div>
          <div>
            <span className="text-zinc-600">Salaries:</span>
            <span className="font-medium ml-2">${result.salaries}</span>
          </div>
          <div>
            <span className="text-zinc-600">Retirement:</span>
            <span className="font-medium ml-2">${result.retirementContribution}</span>
          </div>
          <div>
            <span className="text-zinc-600">Health Insurance:</span>
            <span className="font-medium ml-2">${result.healthInsurance}</span>
          </div>
          <div>
            <span className="text-zinc-600">Home Office:</span>
            <span className="font-medium ml-2">${result.homeOfficeDeduction}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Total Deductions</h3>
        <div className="text-2xl font-bold text-purple-800">${result.totalDeductions}</div>
        <div className="text-sm text-purple-600 mt-1">
          Reducing gross income of ${result.businessIncome} to net income of ${result.netBusinessIncome}
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Tax Calculation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Self-Employment Tax:</span>
            <span className="font-medium ml-2">${result.seTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">SE Tax Deduction:</span>
            <span className="font-medium ml-2">${result.seTaxDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">QBI Deduction:</span>
            <span className="font-medium ml-2">${result.qbiDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Income Tax:</span>
            <span className="font-medium ml-2">${result.incomeTax}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Total Tax & Savings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-green-800">${result.totalTax}</div>
            <div className="text-sm text-green-600">Total Tax Owed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-800">{result.effectiveRate}%</div>
            <div className="text-sm text-green-600">Effective Rate</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Deduction Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Ordinary & Necessary:</strong> Expenses must be common, accepted, and helpful for your business.</li>
          <li><strong>Meals:</strong> 50% deductible. Must be business-related, not lavish.</li>
          <li><strong>Vehicle:</strong> Standard mileage ($0.67/mile) OR actual expenses (gas, repairs, depreciation).</li>
          <li><strong>Home Office:</strong> Simplified ($5/sq ft, max $1,500) OR regular method (actual expenses prorated).</li>
          <li><strong>Health Insurance:</strong> 100% deductible for self-employed. Reduces income tax, not SE tax.</li>
          <li><strong>Retirement:</strong> SEP-IRA up to 25% of net SE income ($69K). Solo 401k: $23K + 25% employer contribution.</li>
          <li><strong>QBI Deduction:</strong> 20% of qualified business income for pass-through entities (LLC, S-Corp, sole prop).</li>
          <li><strong>SE Tax Deduction:</strong> Deduct 50% of SE tax from gross income.</li>
        </ul>
      </div>
    </main>
  )
}