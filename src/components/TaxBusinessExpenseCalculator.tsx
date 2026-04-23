'use client'

import { useState } from 'react'

export default function TaxBusinessExpenseCalculator() {
  const [businessType, setBusinessType] = useState<'sole_prop' | 'llc' | 'corp' | 's_corp'>('sole_prop')
  const [grossRevenue, setGrossRevenue] = useState(100000)
  const [totalExpenses, setTotalExpenses] = useState(40000)
  const [netIncome, setNetIncome] = useState(60000)
  const [expenseRatio, setExpenseRatio] = useState(40)
  const [vehicleExpense, setVehicleExpense] = useState(5000)
  const [homeOfficeExpense, setHomeOfficeExpense] = useState(2000)
  const [travelExpense, setTravelExpense] = useState(3000)
  const [mealsExpense, setMealsExpense] = useState(1000)
  const [equipmentExpense, setEquipmentExpense] = useState(2000)
  const [suppliesExpense, setSuppliesExpense] = useState(1000)
  const [insuranceExpense, setInsuranceExpense] = useState(500)
  const [professionalExpense, setProfessionalExpense] = useState(2000)
  const [otherExpense, setOtherExpense] = useState(4500)
  const [auditYear, setAuditYear] = useState(2022)
  const [documentationLevel, setDocumentationLevel] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good')
  const [mileageLogComplete, setMileageLogComplete] = useState(true)
  const [receiptsOrganized, setReceiptsOrganized] = useState(true)
  const [separateAccounts, setSeparateAccounts] = useState(true)

  const calculate = () => {
    // Tax Business Expense Calculator
    // Calculate business expense deductions, documentation, and audit risk

    // Expense analysis by category
    const expenseAnalysis: { category: string; amount: number; deductible: string; limits: string; documentation: string }[] = []

    expenseAnalysis.push({
      category: 'Vehicle/Transportation',
      amount: vehicleExpense,
      deductible: 'Deductible',
      limits: 'Mileage rate or actual expenses',
      documentation: mileageLogComplete ? 'Complete mileage log required' : 'MILEAGE LOG MISSING - high risk',
    })

    expenseAnalysis.push({
      category: 'Home Office',
      amount: homeOfficeExpense,
      deductible: 'Deductible if exclusive use',
      limits: 'Regular method or simplified ($5/sq ft, max 300 sq ft)',
      documentation: 'Exclusive use documentation, square footage',
    })

    expenseAnalysis.push({
      category: 'Travel',
      amount: travelExpense,
      deductible: 'Deductible',
      limits: 'Ordinary and necessary business travel',
      documentation: receiptsOrganized ? 'Receipts, itinerary, business purpose' : 'Receipts and purpose required',
    })

    expenseAnalysis.push({
      category: 'Meals/Entertainment',
      amount: mealsExpense,
      deductible: '50% deductible',
      limits: '50% limit for business meals',
      documentation: receiptsOrganized ? 'Receipts, who, business purpose' : 'Detailed receipts with purpose',
    })

    expenseAnalysis.push({
      category: 'Equipment/Equipment',
      amount: equipmentExpense,
      deductible: 'Deductible or depreciate',
      limits: 'Section 179 or depreciation',
      documentation: receiptsOrganized ? 'Receipts, depreciation schedule' : 'Asset records needed',
    })

    expenseAnalysis.push({
      category: 'Supplies',
      amount: suppliesExpense,
      deductible: 'Deductible',
      limits: 'Ordinary supplies',
      documentation: receiptsOrganized ? 'Receipts required' : 'Receipts needed',
    })

    expenseAnalysis.push({
      category: 'Insurance',
      amount: insuranceExpense,
      deductible: 'Deductible',
      limits: 'Business insurance',
      documentation: receiptsOrganized ? 'Policy documentation' : 'Insurance records',
    })

    expenseAnalysis.push({
      category: 'Professional Services',
      amount: professionalExpense,
      deductible: 'Deductible',
      limits: 'Legal, accounting, consulting',
      documentation: receiptsOrganized ? 'Invoices, contracts' : 'Professional invoices',
    })

    expenseAnalysis.push({
      category: 'Other Expenses',
      amount: otherExpense,
      deductible: 'Review each item',
      limits: 'Ordinary and necessary',
      documentation: receiptsOrganized ? 'Itemize each expense' : 'Detailed breakdown',
    })

    const totalExpensesCalc = expenseAnalysis.reduce((sum, e) => sum + e.amount, 0)
    const mealsDeductible = mealsExpense * 0.5
    const totalDeductible = totalExpensesCalc - mealsExpense + mealsDeductible

    // Industry benchmarks (expense ratio comparison)
    const benchmarks: { industry: string; typicalRatio: string; yourRatio: string; status: string }[] = []

    benchmarks.push({
      industry: 'Retail',
      typicalRatio: '25-35%',
      yourRatio: `${expenseRatio}%`,
      status: expenseRatio > 40 ? 'High - scrutiny risk' : expenseRatio < 20 ? 'Low - may be under-deducting' : 'Normal range',
    })

    benchmarks.push({
      industry: 'Consulting/Professional',
      typicalRatio: '15-25%',
      yourRatio: `${expenseRatio}%`,
      status: expenseRatio > 30 ? 'High - review expenses' : expenseRatio < 10 ? 'Low' : 'Normal range',
    })

    benchmarks.push({
      industry: 'Construction',
      typicalRatio: '30-40%',
      yourRatio: `${expenseRatio}%`,
      status: expenseRatio > 45 ? 'High' : expenseRatio < 25 ? 'Low' : 'Normal range',
    })

    benchmarks.push({
      industry: 'Your Business',
      typicalRatio: 'Industry specific',
      yourRatio: `${expenseRatio}%`,
      status: expenseRatio > 50 ? 'Very high - audit flag' : expenseRatio > 40 ? 'High' : expenseRatio < 15 ? 'Low' : 'Normal',
    })

    // Audit risk factors
    const riskFactors: { factor: string; present: boolean; severity: string; explanation: string }[] = []

    riskFactors.push({
      factor: 'High Expense Ratio',
      present: expenseRatio > 40,
      severity: expenseRatio > 50 ? 'High' : expenseRatio > 45 ? 'Moderate' : 'Low',
      explanation: expenseRatio > 40 ? `${expenseRatio}% expenses vs revenue - above typical` : `${expenseRatio}% within normal range`,
    })

    riskFactors.push({
      factor: 'Large Vehicle Expense',
      present: vehicleExpense > grossRevenue * 0.05,
      severity: vehicleExpense > grossRevenue * 0.1 ? 'High' : 'Moderate',
      explanation: vehicleExpense > grossRevenue * 0.05 ? 'Vehicle expense disproportionate to business size' : 'Vehicle expense reasonable',
    })

    riskFactors.push({
      factor: 'Missing Mileage Log',
      present: !mileageLogComplete,
      severity: !mileageLogComplete ? 'High' : 'None',
      explanation: mileageLogComplete ? 'Mileage log maintained' : 'Mileage log incomplete - vehicle expense at risk',
    })

    riskFactors.push({
      factor: 'Mixed Personal/Business',
      present: !separateAccounts,
      severity: !separateAccounts ? 'High' : 'None',
      explanation: separateAccounts ? 'Separate business accounts' : 'Commingled accounts - difficult to substantiate',
    })

    riskFactors.push({
      factor: 'Poor Documentation',
      present: documentationLevel === 'poor' || documentationLevel === 'fair',
      severity: documentationLevel === 'poor' ? 'High' : documentationLevel === 'fair' ? 'Moderate' : 'None',
      explanation: documentationLevel === 'excellent' ? 'Excellent documentation' : documentationLevel === 'good' ? 'Good documentation' : documentationLevel === 'fair' ? 'Fair documentation - gaps' : 'Poor documentation - high risk',
    })

    riskFactors.push({
      factor: 'Home Office Claim',
      present: homeOfficeExpense > 0,
      severity: homeOfficeExpense > 5000 ? 'Moderate' : 'Low',
      explanation: homeOfficeExpense > 0 ? 'Home office deduction requires exclusive use' : 'No home office claim',
    })

    // Calculate audit risk score
    let auditRiskScore = 0

    if (expenseRatio > 50) auditRiskScore += 35
    else if (expenseRatio > 40) auditRiskScore += 20
    else if (expenseRatio > 35) auditRiskScore += 10

    if (!mileageLogComplete && vehicleExpense > 0) auditRiskScore += 25
    if (!separateAccounts) auditRiskScore += 20
    if (documentationLevel === 'poor') auditRiskScore += 30
    else if (documentationLevel === 'fair') auditRiskScore += 15

    if (vehicleExpense > grossRevenue * 0.1) auditRiskScore += 15
    if (homeOfficeExpense > 5000) auditRiskScore += 10

    // Deduction recommendations
    const recommendations: { category: string; suggestion: string; benefit: string; priority: string }[] = []

    recommendations.push({
      category: 'Mileage Log',
      suggestion: mileageLogComplete ? 'Continue maintaining log' : 'Create contemporaneous mileage log immediately',
      benefit: vehicleExpense > 0 ? `Protect $${vehicleExpense.toFixed(0)} vehicle deduction` : 'Prepare for future',
      priority: !mileageLogComplete ? 'Critical' : 'Ongoing',
    })

    recommendations.push({
      category: 'Business Account',
      suggestion: separateAccounts ? 'Maintain separation' : 'Open separate business bank account',
      benefit: separateAccounts ? 'Easier substantiation' : 'Simplify record-keeping',
      priority: !separateAccounts ? 'High' : 'Ongoing',
    })

    recommendations.push({
      category: 'Receipts',
      suggestion: receiptsOrganized ? 'Continue systematic filing' : 'Organize receipts by category and date',
      benefit: receiptsOrganized ? 'Audit ready' : 'Protect all deductions',
      priority: !receiptsOrganized ? 'High' : 'Ongoing',
    })

    recommendations.push({
      category: 'Home Office',
      suggestion: homeOfficeExpense > 0 ? 'Document exclusive use, measure square footage' : 'Evaluate if home office meets criteria',
      benefit: homeOfficeExpense > 0 ? `Support $${homeOfficeExpense.toFixed(0)} deduction` : 'Potential deduction',
      priority: homeOfficeExpense > 0 ? 'High' : 'Evaluate',
    })

    recommendations.push({
      category: 'Expense Ratio',
      suggestion: expenseRatio > 40 ? 'Review each expense category for legitimacy' : expenseRatio < 20 ? 'Review for missed deductions' : 'Continue current practices',
      benefit: expenseRatio > 40 ? 'Reduce audit flag' : expenseRatio < 20 ? 'Capture missed deductions' : 'Maintain compliance',
      priority: expenseRatio > 45 ? 'High' : 'Ongoing',
    })

    // Final recommendation
    let recommendation = ''

    if (auditRiskScore >= 50) {
      recommendation = `HIGH AUDIT RISK. Score: ${auditRiskScore}/100. Expense ratio: ${expenseRatio}% (${expenseRatio > 45 ? 'very high' : expenseRatio > 40 ? 'high' : 'moderate'}). ${!mileageLogComplete ? 'Mileage log missing - vehicle expense vulnerable. ' : ''}${!separateAccounts ? 'Commingled accounts problematic. ' : ''}${documentationLevel === 'poor' ? 'Poor documentation - expenses at risk. ' : ''}Immediate action: create mileage log, separate accounts, organize receipts. Professional consultation recommended.`
    } else if (auditRiskScore >= 25) {
      recommendation = `MODERATE AUDIT RISK. Score: ${auditRiskScore}/100. Expense ratio: ${expenseRatio}%. ${!mileageLogComplete ? 'Mileage log incomplete. ' : ''}${!receiptsOrganized ? 'Receipts need organization. ' : ''}Address documentation gaps. Maintain contemporaneous records. Review expense categories for legitimacy. Professional assistance for complex areas.`
    } else {
      recommendation = `LOW AUDIT RISK. Score: ${auditRiskScore}/100. Expense ratio: ${expenseRatio}% within normal range. ${mileageLogComplete ? 'Mileage log maintained. ' : ''}${separateAccounts ? 'Accounts separate. ' : ''}${receiptsOrganized ? 'Receipts organized. ' : ''}Good compliance position. Continue current documentation practices. Maintain contemporaneous records. Keep organized files.`
    }

    return {
      businessType,
      grossRevenue: grossRevenue.toFixed(0),
      totalExpenses: totalExpensesCalc.toFixed(0),
      netIncome: netIncome.toFixed(0),
      expenseRatio: expenseRatio.toFixed(0),
      auditYear,
      documentationLevel,
      mileageLogComplete,
      receiptsOrganized,
      separateAccounts,
      expenseAnalysis,
      totalDeductible: totalDeductible.toFixed(0),
      mealsDeductible: mealsDeductible.toFixed(0),
      benchmarks,
      riskFactors,
      auditRiskScore,
      recommendations,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Business Expense Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate business expense deductions, documentation requirements, and audit risk analysis.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Business Type</label>
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value as 'sole_prop' | 'llc' | 'corp' | 's_corp')} className="w-full border rounded p-2">
            <option value="sole_prop">Sole Proprietorship</option>
            <option value="llc">LLC</option>
            <option value="corp">C-Corporation</option>
            <option value="s_corp">S-Corporation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={auditYear} onChange={(e) => setAuditYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gross Revenue</label>
          <input type="number" value={grossRevenue} onChange={(e) => setGrossRevenue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Expenses</label>
          <input type="number" value={totalExpenses} onChange={(e) => setTotalExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expense Ratio (%)</label>
          <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documentation Level</label>
          <select value={documentationLevel} onChange={(e) => setDocumentationLevel(e.target.value as 'excellent' | 'good' | 'fair' | 'poor')} className="w-full border rounded p-2">
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Expense Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle</label>
            <input type="number" value={vehicleExpense} onChange={(e) => setVehicleExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Home Office</label>
            <input type="number" value={homeOfficeExpense} onChange={(e) => setHomeOfficeExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Travel</label>
            <input type="number" value={travelExpense} onChange={(e) => setTravelExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meals</label>
            <input type="number" value={mealsExpense} onChange={(e) => setMealsExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Equipment</label>
            <input type="number" value={equipmentExpense} onChange={(e) => setEquipmentExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Supplies</label>
            <input type="number" value={suppliesExpense} onChange={(e) => setSuppliesExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Insurance</label>
            <input type="number" value={insuranceExpense} onChange={(e) => setInsuranceExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Professional</label>
            <input type="number" value={professionalExpense} onChange={(e) => setProfessionalExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input type="number" value={otherExpense} onChange={(e) => setOtherExpense(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Practices</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={mileageLogComplete} onChange={(e) => setMileageLogComplete(e.target.checked)} className="mr-2" />
              <span className="text-sm">Mileage Log Complete</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={receiptsOrganized} onChange={(e) => setReceiptsOrganized(e.target.checked)} className="mr-2" />
              <span className="text-sm">Receipts Organized</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={separateAccounts} onChange={(e) => setSeparateAccounts(e.target.checked)} className="mr-2" />
              <span className="text-sm">Separate Business Accounts</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.auditRiskScore < 25 ? 'bg-green-50 border border-green-200' : result.auditRiskScore < 50 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Audit Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Gross Revenue:</span><span className="font-bold ml-2">$ {result.grossRevenue}</span></div>
          <div><span className="text-zinc-600">Total Expenses:</span><span className="font-bold ml-2">$ {result.totalExpenses}</span></div>
          <div><span className="text-zinc-600">Expense Ratio:</span><span className={`font-bold ml-2 ${Number(result.expenseRatio) > 40 ? 'text-red-700' : Number(result.expenseRatio) > 35 ? 'text-orange-700' : ''}`}>{result.expenseRatio}%</span></div>
          <div><span className="text-zinc-600">Audit Risk Score:</span><span className={`font-bold ml-2 ${result.auditRiskScore >= 50 ? 'text-red-700' : result.auditRiskScore >= 25 ? 'text-orange-700' : 'text-green-700'}`}>{result.auditRiskScore}/100</span></div>
          <div><span className="text-zinc-600">Total Deductible:</span><span className="font-bold ml-2">$ {result.totalDeductible}</span></div>
          <div><span className="text-zinc-600">Meals (50%):</span><span className="font-bold ml-2">$ {result.mealsDeductible}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.auditRiskScore >= 50 ? 'text-red-700' : result.auditRiskScore >= 25 ? 'text-orange-700' : 'text-green-700'}`}>
          {result.auditRiskScore >= 50 ? 'High audit risk - immediate action needed' : result.auditRiskScore >= 25 ? 'Moderate audit risk - improve documentation' : 'Low audit risk - maintain practices'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Expense Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Deductible</th>
                <th className="py-2 text-left">Documentation</th>
              </tr>
            </thead>
            <tbody>
              {result.expenseAnalysis.map((e, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{e.category}</td>
                  <td className="py-1">$ {e.amount.toFixed(0)}</td>
                  <td className="py-1">{e.deductible}</td>
                  <td className="py-1">{e.documentation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Industry Benchmarks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Industry</th>
                <th className="py-2 text-left">Typical Ratio</th>
                <th className="py-2 text-left">Your Ratio</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.benchmarks.map((b, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{b.industry}</td>
                  <td className="py-1">{b.typicalRatio}</td>
                  <td className="py-1">{b.yourRatio}</td>
                  <td className="py-1">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Risk Factors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Factor</th>
                <th className="py-2 text-left">Present</th>
                <th className="py-2 text-left">Severity</th>
                <th className="py-2 text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {result.riskFactors.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.factor}</td>
                  <td className="py-1">{r.present ? 'Yes' : 'No'}</td>
                  <td className="py-1"><span className={r.severity === 'High' ? 'text-red-700' : r.severity === 'Moderate' ? 'text-orange-700' : ''}>{r.severity}</span></td>
                  <td className="py-1">{r.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Suggestion</th>
                <th className="py-2 text-left">Priority</th>
              </tr>
            </thead>
            <tbody>
              {result.recommendations.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.category}</td>
                  <td className="py-1">{r.suggestion}</td>
                  <td className="py-1">{r.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.auditRiskScore >= 50 ? 'bg-red-50 border border-red-200' : result.auditRiskScore >= 25 ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Final Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Business Expense Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Keep contemporaneous mileage log</li>
          <li>Maintain separate business accounts</li>
          <li>Organize receipts by category</li>
          <li>Expense ratio should be typical</li>
          <li>Meals only 50% deductible</li>
          <li>Home office needs exclusive use</li>
          <li>Document business purpose</li>
          <li>Vehicle: mileage rate or actual</li>
          <li>Keep records 7 years</li>
          <li>Professional help for complex</li>
        </ul>
      </div>
    </div>
  )
}