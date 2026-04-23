'use client'

import { useState } from 'react'

export default function TaxFinancialStatementCalculator() {
  const [formType, setFormType] = useState<'433A' | '433B' | '433F'>('433A')
  const [grossIncomeMonthly, setGrossIncomeMonthly] = useState(5000)
  const [netIncomeMonthly, setNetIncomeMonthly] = useState(4000)
  const [employmentType, setEmploymentType] = useState<'w2' | 'self_employed' | 'mixed' | 'retired'>('w2')
  const [housingExpense, setHousingExpense] = useState(1500)
  const [utilitiesExpense, setUtilitiesExpense] = useState(200)
  const [foodExpense, setFoodExpense] = useState(400)
  const [transportExpense, setTransportExpense] = useState(300)
  const [healthExpense, setHealthExpense] = useState(200)
  const [clothingExpense, setClothingExpense] = useState(100)
  const [miscExpense, setMiscExpense] = useState(200)
  const [otherNecessary, setOtherNecessary] = useState(0)
  const [bankAccounts, setBankAccounts] = useState(5000)
  const [investments, setInvestments] = useState(10000)
  const [retirementAccounts, setRetirementAccounts] = useState(50000)
  const [realEstateValue, setRealEstateValue] = useState(200000)
  const [realEstateDebt, setRealEstateDebt] = useState(150000)
  const [vehiclesValue, setVehiclesValue] = useState(15000)
  const [vehiclesDebt, setVehiclesDebt] = useState(5000)
  const [otherAssets, setOtherAssets] = useState(5000)
  const [taxDebt, setTaxDebt] = useState(30000)
  const [otherDebts, setOtherDebts] = useState(10000)

  const calculate = () => {
    // Tax Financial Statement Calculator
    // Calculate Form 433-A/B/F financial analysis for IRS collection

    const totalMonthlyExpenses = housingExpense + utilitiesExpense + foodExpense + transportExpense + healthExpense + clothingExpense + miscExpense + otherNecessary
    const disposableIncome = netIncomeMonthly - totalMonthlyExpenses

    // IRS National Standards (simplified 2024 values)
    const nationalStandards = {
      food: { onePerson: 327, twoPerson: 654, threePerson: 787, fourPerson: 957 },
      clothing: { onePerson: 103, twoPerson: 206, threePerson: 249, fourPerson: 324 },
      misc: { onePerson: 157, twoPerson: 314, threePerson: 382, fourPerson: 466 },
    }

    // IRS allowable expenses analysis
    const expenseAnalysis: { category: string; actual: number; allowed: number; variance: string; notes: string }[] = []

    // Housing - local standard based
    expenseAnalysis.push({
      category: 'Housing/Utilities',
      actual: housingExpense + utilitiesExpense,
      allowed: housingExpense + utilitiesExpense, // Simplified - actual allowed if reasonable
      variance: 'Within standard',
      notes: 'Local housing standard varies by county',
    })

    // Food - national standard
    const foodAllowed = nationalStandards.food.onePerson
    expenseAnalysis.push({
      category: 'Food',
      actual: foodExpense,
      allowed: foodAllowed,
      variance: foodExpense > foodAllowed ? 'Exceeds standard' : foodExpense < foodAllowed * 0.5 ? 'Below standard' : 'Within standard',
      notes: `National standard: $${foodAllowed}`,
    })

    // Transportation
    expenseAnalysis.push({
      category: 'Transportation',
      actual: transportExpense,
      allowed: transportExpense, // Actual if reasonable
      variance: 'Within standard',
      notes: 'Operating costs + public transport if applicable',
    })

    // Health care
    expenseAnalysis.push({
      category: 'Health Care',
      actual: healthExpense,
      allowed: healthExpense, // Actual if documented
      variance: 'Within standard',
      notes: 'Out-of-pocket expenses, insurance premiums',
    })

    // Clothing - national standard
    const clothingAllowed = nationalStandards.clothing.onePerson
    expenseAnalysis.push({
      category: 'Clothing',
      actual: clothingExpense,
      allowed: clothingAllowed,
      variance: clothingExpense > clothingAllowed ? 'Exceeds standard' : 'Within standard',
      notes: `National standard: $${clothingAllowed}`,
    })

    // Miscellaneous - national standard
    const miscAllowed = nationalStandards.misc.onePerson
    expenseAnalysis.push({
      category: 'Miscellaneous',
      actual: miscExpense,
      allowed: miscAllowed,
      variance: miscExpense > miscAllowed ? 'Exceeds standard' : 'Within standard',
      notes: `National standard: $${miscAllowed}`,
    })

    // Total expenses analysis
    const totalAllowed = expenseAnalysis.reduce((sum, e) => sum + e.allowed, 0)
    const totalActual = expenseAnalysis.reduce((sum, e) => sum + e.actual, 0)

    expenseAnalysis.push({
      category: 'TOTAL',
      actual: totalActual,
      allowed: totalAllowed,
      variance: totalActual > totalAllowed ? `Exceeds by $${(totalActual - totalAllowed).toFixed(0)}` : `Within standards`,
      notes: 'IRS uses national and local standards',
    })

    // Asset analysis
    const assetAnalysis: { asset: string; value: number; debt: number; equity: number; quickSale: number; notes: string }[] = []

    // Cash and bank accounts
    assetAnalysis.push({
      asset: 'Cash/Bank Accounts',
      value: bankAccounts,
      debt: 0,
      equity: bankAccounts,
      quickSale: bankAccounts,
      notes: 'Immediately available',
    })

    // Investments
    assetAnalysis.push({
      asset: 'Investments',
      value: investments,
      debt: 0,
      equity: investments,
      quickSale: investments * 0.8,
      notes: '80% quick sale value',
    })

    // Retirement accounts (often protected)
    assetAnalysis.push({
      asset: 'Retirement Accounts',
      value: retirementAccounts,
      debt: 0,
      equity: retirementAccounts,
      quickSale: 0,
      notes: 'Often exempt from collection',
    })

    // Real estate
    const realEstateEquity = realEstateValue - realEstateDebt
    assetAnalysis.push({
      asset: 'Real Estate',
      value: realEstateValue,
      debt: realEstateDebt,
      equity: realEstateEquity,
      quickSale: realEstateEquity * 0.85,
      notes: '85% quick sale value of equity',
    })

    // Vehicles
    const vehiclesEquity = vehiclesValue - vehiclesDebt
    assetAnalysis.push({
      asset: 'Vehicles',
      value: vehiclesValue,
      debt: vehiclesDebt,
      equity: vehiclesEquity,
      quickSale: vehiclesEquity > 0 ? vehiclesEquity * 0.75 : 0,
      notes: '75% quick sale value, $3,000 per vehicle exempt',
    })

    // Other assets
    assetAnalysis.push({
      asset: 'Other Assets',
      value: otherAssets,
      debt: 0,
      equity: otherAssets,
      quickSale: otherAssets * 0.5,
      notes: '50% quick sale value',
    })

    const totalAssetValue = assetAnalysis.reduce((sum, a) => sum + a.value, 0)
    const totalAssetDebt = assetAnalysis.reduce((sum, a) => sum + a.debt, 0)
    const totalAssetEquity = assetAnalysis.reduce((sum, a) => sum + a.equity, 0)
    const totalQuickSale = assetAnalysis.reduce((sum, a) => sum + a.quickSale, 0)

    // Calculate RCP (Reasonable Collection Potential)
    const collectionPeriodMonths = 120 // 10 years = 120 months
    const rcpAssets = totalQuickSale
    const rcpIncome = disposableIncome > 0 ? disposableIncome * collectionPeriodMonths : 0
    const rcpTotal = rcpAssets + rcpIncome

    // Payment capacity
    const paymentCapacity: { option: string; monthlyPayment: number; duration: string; totalPaid: number; settlementRatio: string }[] = []

    if (disposableIncome > 0) {
      paymentCapacity.push({
        option: 'Full Payment IA',
        monthlyPayment: Math.ceil(taxDebt / collectionPeriodMonths),
        duration: `${Math.ceil(taxDebt / Math.max(disposableIncome, 100))} months`,
        totalPaid: taxDebt,
        settlementRatio: '100%',
      })

      paymentCapacity.push({
        option: 'Disposable Income Payment',
        monthlyPayment: disposableIncome,
        duration: `${Math.ceil(taxDebt / disposableIncome)} months`,
        totalPaid: taxDebt,
        settlementRatio: '100%',
      })

      if (rcpTotal < taxDebt) {
        paymentCapacity.push({
          option: 'OIC (Based on RCP)',
          monthlyPayment: 0,
          duration: 'Settlement',
          totalPaid: rcpTotal,
          settlementRatio: `${((rcpTotal / taxDebt) * 100).toFixed(0)}%`,
        })
      }
    } else {
      paymentCapacity.push({
        option: 'Currently Not Collectible',
        monthlyPayment: 0,
        duration: '10 years',
        totalPaid: 0,
        settlementRatio: '0% (debt expires)',
      })
    }

    // Form requirements checklist
    const requirements: { section: string; required: boolean; completed: string; notes: string }[] = []

    requirements.push({
      section: 'Personal Information',
      required: true,
      completed: 'Section 1',
      notes: 'Name, SSN, address, employment',
    })

    requirements.push({
      section: 'Income Information',
      required: true,
      completed: 'Section 2',
      notes: `Gross: $${grossIncomeMonthly}, Net: $${netIncomeMonthly}`,
    })

    requirements.push({
      section: 'Expense Information',
      required: true,
      completed: 'Section 3',
      notes: `Total: $${totalMonthlyExpenses}/mo`,
    })

    requirements.push({
      section: 'Asset Information',
      required: true,
      completed: 'Section 4',
      notes: `Total equity: $${totalAssetEquity.toFixed(0)}`,
    })

    requirements.push({
      section: 'Liabilities',
      required: true,
      completed: 'Section 5',
      notes: `Tax: $${taxDebt}, Other: $${otherDebts}`,
    })

    requirements.push({
      section: 'Signature/Date',
      required: true,
      completed: 'Required',
      notes: 'Must be signed under penalty of perjury',
    })

    // Recommendation
    let recommendation = ''

    if (disposableIncome <= 0 && rcpTotal < taxDebt) {
      recommendation = `Hardship situation. Disposable income: $${disposableIncome.toFixed(0)}/mo (negative). RCP: $${rcpTotal.toFixed(0)} (assets + income). CNC status recommended - collection suspended. Complete Form 433-F for CNC request. Document expenses carefully.`
    } else if (rcpTotal < taxDebt * 0.8) {
      recommendation = `OIC viable. RCP ($${rcpTotal.toFixed(0)}) significantly less than debt ($${taxDebt.toFixed(0)}). Offer should approximate RCP. ${totalQuickSale > 0 ? `Assets contribute $${totalQuickSale.toFixed(0)} to RCP.` : ''} ${disposableIncome > 0 ? `Future income: $${rcpIncome.toFixed(0)}.` : ''} Submit with Form 656.`
    } else if (disposableIncome > taxDebt / 72) {
      recommendation = `Streamlined IA available. Disposable income ($${disposableIncome.toFixed(0)}) exceeds $${(taxDebt / 72).toFixed(0)} minimum payment. ${taxDebt <= 50000 ? 'No Form 433 required for Streamlined.' : 'Form 433-A/B needed for regular IA.'} Apply online. Direct debit payment required.`
    } else {
      recommendation = `Regular IA with Form 433. Disposable income: $${disposableIncome.toFixed(0)}/mo. Payment: $${Math.max(100, disposableIncome).toFixed(0)}/mo. Duration: ${Math.ceil(taxDebt / Math.max(100, disposableIncome))} months. Submit complete financial statement. IRS verifies expenses against standards.`
    }

    return {
      formType,
      grossIncomeMonthly: grossIncomeMonthly.toFixed(0),
      netIncomeMonthly: netIncomeMonthly.toFixed(0),
      employmentType,
      totalMonthlyExpenses: totalMonthlyExpenses.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      taxDebt: taxDebt.toFixed(0),
      otherDebts: otherDebts.toFixed(0),
      expenseAnalysis,
      assetAnalysis,
      totalAssetValue: totalAssetValue.toFixed(0),
      totalAssetDebt: totalAssetDebt.toFixed(0),
      totalAssetEquity: totalAssetEquity.toFixed(0),
      totalQuickSale: totalQuickSale.toFixed(0),
      rcpAssets: rcpAssets.toFixed(0),
      rcpIncome: rcpIncome.toFixed(0),
      rcpTotal: rcpTotal.toFixed(0),
      paymentCapacity,
      requirements,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Financial Statement Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate IRS Form 433-A/B/F financial analysis for collection resolution.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Form Type</label>
          <select value={formType} onChange={(e) => setFormType(e.target.value as '433A' | '433B' | '433F')} className="w-full border rounded p-2">
            <option value="433A">Form 433-A (Individual)</option>
            <option value="433B">Form 433-B (Business)</option>
            <option value="433F">Form 433-F (Collection)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employment Type</label>
          <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value as 'w2' | 'self_employed' | 'mixed' | 'retired')} className="w-full border rounded p-2">
            <option value="w2">W-2 Employee</option>
            <option value="self_employed">Self-Employed</option>
            <option value="mixed">Mixed (W-2 + SE)</option>
            <option value="retired">Retired/Pension</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gross Monthly Income</label>
          <input type="number" value={grossIncomeMonthly} onChange={(e) => setGrossIncomeMonthly(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Net Monthly Income</label>
          <input type="number" value={netIncomeMonthly} onChange={(e) => setNetIncomeMonthly(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Debt</label>
          <input type="number" value={taxDebt} onChange={(e) => setTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Debts</label>
          <input type="number" value={otherDebts} onChange={(e) => setOtherDebts(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Expenses</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Housing</label>
            <input type="number" value={housingExpense} onChange={(e) => setHousingExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Utilities</label>
            <input type="number" value={utilitiesExpense} onChange={(e) => setUtilitiesExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Food</label>
            <input type="number" value={foodExpense} onChange={(e) => setFoodExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Transport</label>
            <input type="number" value={transportExpense} onChange={(e) => setTransportExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Health</label>
            <input type="number" value={healthExpense} onChange={(e) => setHealthExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Clothing</label>
            <input type="number" value={clothingExpense} onChange={(e) => setClothingExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Misc</label>
            <input type="number" value={miscExpense} onChange={(e) => setMiscExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input type="number" value={otherNecessary} onChange={(e) => setOtherNecessary(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Assets</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bank Accounts</label>
            <input type="number" value={bankAccounts} onChange={(e) => setBankAccounts(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Investments</label>
            <input type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Retirement</label>
            <input type="number" value={retirementAccounts} onChange={(e) => setRetirementAccounts(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Real Estate Value</label>
            <input type="number" value={realEstateValue} onChange={(e) => setRealEstateValue(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Real Estate Debt</label>
            <input type="number" value={realEstateDebt} onChange={(e) => setRealEstateDebt(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Other Assets</label>
            <input type="number" value={otherAssets} onChange={(e) => setOtherAssets(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Value</label>
            <input type="number" value={vehiclesValue} onChange={(e) => setVehiclesValue(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Debt</label>
            <input type="number" value={vehiclesDebt} onChange={(e) => setVehiclesDebt(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.disposableIncome) > 0 ? 'bg-green-50 border border-green-200' : Number(result.disposableIncome) >= -500 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Financial Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Net Income:</span><span className="font-bold ml-2">$ {result.netIncomeMonthly}/mo</span></div>
          <div><span className="text-zinc-600">Expenses:</span><span className="font-bold ml-2">$ {result.totalMonthlyExpenses}/mo</span></div>
          <div><span className="text-zinc-600">Disposable:</span><span className={`font-bold ml-2 ${Number(result.disposableIncome) > 0 ? 'text-green-700' : 'text-red-700'}`}>$ {result.disposableIncome}/mo</span></div>
          <div><span className="text-zinc-600">Tax Debt:</span><span className="font-bold ml-2">$ {result.taxDebt}</span></div>
          <div><span className="text-zinc-600">Total Equity:</span><span className="font-bold ml-2">$ {result.totalAssetEquity}</span></div>
          <div><span className="text-zinc-600">Quick Sale:</span><span className="font-bold ml-2">$ {result.totalQuickSale}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">RCP Analysis</h2>
        <div className="grid grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Asset RCP:</span><span className="font-bold ml-2">$ {result.rcpAssets}</span></div>
          <div><span className="text-zinc-600">Income RCP:</span><span className="font-bold ml-2">$ {result.rcpIncome}</span></div>
          <div><span className="text-zinc-600">Total RCP:</span><span className={`font-bold ml-2 ${Number(result.rcpTotal) < Number(result.taxDebt) ? 'text-green-700' : ''}`}>$ {result.rcpTotal}</span></div>
        </div>
        <div className="text-sm mt-2">
          {Number(result.rcpTotal) < Number(result.taxDebt) ? `RCP below debt - OIC viable. Settlement: ${((Number(result.rcpTotal) / Number(result.taxDebt)) * 100).toFixed(0)}%` : `RCP covers debt - IA or full payment`}
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">IRS Expense Standards</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Actual</th>
                <th className="py-2 text-left">Allowed</th>
                <th className="py-2 text-left">Variance</th>
              </tr>
            </thead>
            <tbody>
              {result.expenseAnalysis.map((e, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{e.category}</td>
                  <td className="py-1">$ {e.actual.toFixed(0)}</td>
                  <td className="py-1">$ {e.allowed.toFixed(0)}</td>
                  <td className="py-1">{e.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Asset Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Asset</th>
                <th className="py-2 text-left">Value</th>
                <th className="py-2 text-left">Debt</th>
                <th className="py-2 text-left">Equity</th>
                <th className="py-2 text-left">Quick Sale</th>
              </tr>
            </thead>
            <tbody>
              {result.assetAnalysis.map((a, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{a.asset}</td>
                  <td className="py-1">$ {a.value.toFixed(0)}</td>
                  <td className="py-1">$ {a.debt.toFixed(0)}</td>
                  <td className="py-1">$ {a.equity.toFixed(0)}</td>
                  <td className="py-1">$ {a.quickSale.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Capacity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Monthly</th>
                <th className="py-2 text-left">Duration</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-left">Ratio</th>
              </tr>
            </thead>
            <tbody>
              {result.paymentCapacity.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.option}</td>
                  <td className="py-1">$ {p.monthlyPayment.toFixed(0)}</td>
                  <td className="py-1">{p.duration}</td>
                  <td className="py-1">$ {p.totalPaid.toFixed(0)}</td>
                  <td className="py-1">{p.settlementRatio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.disposableIncome) > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Form 433 Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>IRS uses national/local expense standards</li>
          <li>Actual expenses may exceed standards</li>
          <li>Quick sale value for assets</li>
          <li>Retirement often exempt</li>
          <li>RCP determines collection potential</li>
          <li>Disposable income = net - expenses</li>
          <li>Form 433-A for individuals</li>
          <li>Form 433-B for businesses</li>
          <li>Form 433-F simplified for CNC</li>
          <li>Sign under penalty of perjury</li>
        </ul>
      </div>
    </div>
  )
}