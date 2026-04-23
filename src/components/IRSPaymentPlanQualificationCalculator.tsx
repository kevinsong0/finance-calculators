'use client'

import { useState } from 'react'

export default function IRSPaymentPlanQualificationCalculator() {
  const [totalTaxDebt, setTotalTaxDebt] = useState(35000)
  const [taxYears, setTaxYears] = useState('2022,2023')
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500)
  const [assetsValue, setAssetsValue] = useState(50000)
  const [filingStatus, setFilingStatus] = useState<'compliant' | 'non_compliant' | 'missing_returns'>('compliant')
  const [previousPaymentPlans, setPreviousPaymentPlans] = useState(0)
  const [hasBusinessDebt, setHasBusinessDebt] = useState(false)
  const [businessIncome, setBusinessIncome] = useState(0)
  const [offerInCompromiseAttempted, setOfferInCompromiseAttempted] = useState(false)
  const [collectionStatus, setCollectionStatus] = useState<'none' | 'notice' | 'levy_warning' | 'levy_active'>('notice')

  const calculate = () => {
    // IRS Payment Plan Qualification Calculator
    // Determine eligibility for different payment plan types

    const disposableIncome = monthlyIncome - monthlyExpenses
    const yearsList = taxYears.split(',').map(y => y.trim())
    const numberOfYears = yearsList.length

    // Payment plan options
    const planOptions: { planType: string; eligibility: boolean; requirements: string; monthlyPayment: number; term: string; notes: string }[] = []

    // Option 1: Full Payment (Short-term)
    planOptions.push({
      planType: 'Full Payment (180 days)',
      eligibility: totalTaxDebt <= disposableIncome * 6,
      requirements: 'Pay full amount within 180 days',
      monthlyPayment: totalTaxDebt / 6,
      term: 'Up to 180 days',
      notes: 'No setup fee. Interest continues.',
    })

    // Option 2: Streamlined Installment Agreement
    const streamlinedEligible =
      totalTaxDebt <= 50000 &&
      filingStatus === 'compliant' &&
      previousPaymentPlans === 0 &&
      numberOfYears <= 2 &&
      totalTaxDebt <= disposableIncome * 72

    const streamlinedPayment = Math.min(totalTaxDebt / 72, disposableIncome * 0.8)

    planOptions.push({
      planType: 'Streamlined Installment Agreement',
      eligibility: streamlinedEligible,
      requirements: 'Debt under $50K, compliant filing, no previous defaults',
      monthlyPayment: streamlinedEligible ? Math.max(streamlinedPayment, 50) : 0,
      term: 'Up to 72 months',
      notes: streamlinedEligible ? 'No financial statement required. Setup fee: $31 (online), $107 (paper)' : 'Not eligible - debt exceeds $50K or compliance issues',
    })

    // Option 3: Guaranteed Installment Agreement
    const guaranteedEligible =
      totalTaxDebt <= 10000 &&
      filingStatus === 'compliant' &&
      previousPaymentPlans === 0 &&
      disposableIncome > 0 &&
      totalTaxDebt <= disposableIncome * 36

    planOptions.push({
      planType: 'Guaranteed Installment Agreement',
      eligibility: guaranteedEligible,
      requirements: 'Debt under $10K, compliant filing, no previous defaults',
      monthlyPayment: guaranteedEligible ? Math.max(totalTaxDebt / 36, 25) : 0,
      term: 'Up to 36 months',
      notes: guaranteedEligible ? 'IRS must accept if eligible. Setup fee waived for low-income.' : 'Not eligible - debt exceeds $10K',
    })

    // Option 4: Regular Installment Agreement (Financial Statement Required)
    const regularEligible =
      filingStatus === 'compliant' &&
      disposableIncome > 0 &&
      totalTaxDebt > 50000 ||
      previousPaymentPlans > 0

    const regularPayment = Math.min(disposableIncome * 0.9, totalTaxDebt / 72)

    planOptions.push({
      planType: 'Regular Installment Agreement',
      eligibility: regularEligible && disposableIncome > 0,
      requirements: 'Submit Form 433-A/B financial statement',
      monthlyPayment: regularEligible ? Math.max(regularPayment, 50) : 0,
      term: 'Based on financial analysis',
      notes: 'Requires full financial disclosure. IRS determines payment amount.',
    })

    // Option 5: In-Business Trust Fund Installment Agreement
    if (hasBusinessDebt) {
      const businessEligible =
        businessIncome > 0 &&
        filingStatus === 'compliant' &&
        totalTaxDebt <= 25000

      planOptions.push({
        planType: 'In-Business Trust Fund IA',
        eligibility: businessEligible,
        requirements: 'Business debt under $25K, compliant',
        monthlyPayment: businessEligible ? Math.max(totalTaxDebt / 24, 100) : 0,
        term: 'Up to 24 months',
        notes: 'Trust fund recovery penalty special rules. Requires business financials.',
      })
    }

    // Option 6: Partial Payment Installment Agreement
    const ppiEligible =
      disposableIncome > 0 &&
      disposableIncome * 72 < totalTaxDebt &&
      assetsValue < totalTaxDebt

    planOptions.push({
      planType: 'Partial Payment IA',
      eligibility: ppiEligible,
      requirements: 'Cannot pay full amount within 72 months',
      monthlyPayment: ppiEligible ? disposableIncome * 0.5 : 0,
      term: 'Remaining debt forgiven at statute expiration',
      notes: 'Debt remains but uncollectible portion written off at 10-year statute.',
    })

    // Calculate best option
    let bestOption = ''
    let bestPayment = 0
    let bestTerm = ''

    if (guaranteedEligible) {
      bestOption = 'Guaranteed Installment Agreement'
      bestPayment = Math.max(totalTaxDebt / 36, 25)
      bestTerm = '36 months'
    } else if (streamlinedEligible) {
      bestOption = 'Streamlined Installment Agreement'
      bestPayment = Math.max(streamlinedPayment, 50)
      bestTerm = '72 months'
    } else if (regularEligible && disposableIncome > 0) {
      bestOption = 'Regular Installment Agreement'
      bestPayment = Math.max(regularPayment, 50)
      bestTerm = '72 months (negotiable)'
    } else if (ppiEligible) {
      bestOption = 'Partial Payment IA'
      bestPayment = disposableIncome * 0.5
      bestTerm = 'Until statute expires'
    } else {
      bestOption = 'Consider Currently Not Collectible or OIC'
      bestPayment = 0
      bestTerm = 'No payment plan feasible'
    }

    // Setup fees
    const setupFees = {
      online: 31,
      paper: 107,
      lowIncomeWaiver: disposableIncome < 500,
      directDebitDiscount: 31 - 10, // $10 discount for direct debit
    }

    // Qualification issues
    const qualificationIssues: string[] = []
    if (filingStatus !== 'compliant') {
      qualificationIssues.push('Filing compliance required - file missing returns')
    }
    if (previousPaymentPlans > 0) {
      qualificationIssues.push('Previous payment plan defaults may affect eligibility')
    }
    if (totalTaxDebt > 50000) {
      qualificationIssues.push('Debt over $50K requires financial statement (Form 433-A/B)')
    }
    if (disposableIncome <= 0) {
      qualificationIssues.push('No disposable income - CNC or hardship release may be appropriate')
    }
    if (numberOfYears > 3) {
      qualificationIssues.push('Multiple tax years may require additional documentation')
    }
    if (offerInCompromiseAttempted) {
      qualificationIssues.push('OIC rejection may affect payment plan negotiation')
    }
    if (collectionStatus === 'levy_active') {
      qualificationIssues.push('Active levy - payment plan may release levy if approved')
    }

    // Recommendation
    let recommendation = ''
    if (disposableIncome <= 0) {
      recommendation = `No disposable income. Payment plan not feasible. Request Currently Not Collectible status. Submit Form 433-A/B showing financial hardship.`
    } else if (guaranteedEligible) {
      recommendation = `Eligible for Guaranteed IA ($${totalTaxDebt.toFixed(0)} under $10K). Monthly payment: $${bestPayment.toFixed(0)}/month for 36 months. IRS must accept. No financial statement required.`
    } else if (streamlinedEligible) {
      recommendation = `Eligible for Streamlined IA. Monthly payment: $${bestPayment.toFixed(0)}/month for up to 72 months. Apply online at IRS.gov. No financial statement required. Setup fee: $${setupFees.online}.`
    } else if (regularEligible) {
      recommendation = `Regular IA required (debt over $50K or prior defaults). Prepare Form 433-A/B financial statement. Estimated payment: $${bestPayment.toFixed(0)}/month. Call IRS to negotiate.`
    } else if (ppiEligible) {
      recommendation = `Partial Payment IA may be appropriate. Cannot pay full debt within statute. Monthly payment: $${bestPayment.toFixed(0)}/month. Remaining debt expires with 10-year statute.`
    } else {
      recommendation = `No standard payment plan feasible. Consider Offer in Compromise or Currently Not Collectible status. Consult tax professional.`
    }

    return {
      totalTaxDebt: totalTaxDebt.toFixed(0),
      taxYears: yearsList.join(', '),
      numberOfYears: numberOfYears.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      assetsValue: assetsValue.toFixed(0),
      filingStatus,
      previousPaymentPlans: previousPaymentPlans.toFixed(0),
      hasBusinessDebt,
      businessIncome: businessIncome.toFixed(0),
      offerInCompromiseAttempted,
      collectionStatus,
      planOptions,
      bestOption,
      bestPayment: bestPayment.toFixed(0),
      bestTerm,
      setupFees,
      qualificationIssues,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Payment Plan Qualification Calculator</h1>
      <p className="text-gray-600 mb-4">Determine eligibility for different IRS payment plan types.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt</label>
          <input type="number" value={totalTaxDebt} onChange={(e) => setTotalTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Years (comma separated)</label>
          <input type="text" value={taxYears} onChange={(e) => setTaxYears(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
          <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Assets Value</label>
          <input type="number" value={assetsValue} onChange={(e) => setAssetsValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'compliant' | 'non_compliant' | 'missing_returns')} className="w-full border rounded p-2">
            <option value="compliant">Compliant - All returns filed</option>
            <option value="non_compliant">Non-Compliant - Some issues</option>
            <option value="missing_returns">Missing Returns - Not filed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Previous Payment Plan Defaults</label>
          <input type="number" value={previousPaymentPlans} onChange={(e) => setPreviousPaymentPlans(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Collection Status</label>
          <select value={collectionStatus} onChange={(e) => setCollectionStatus(e.target.value as 'none' | 'notice' | 'levy_warning' | 'levy_active')} className="w-full border rounded p-2">
            <option value="none">None - No collection action</option>
            <option value="notice">Notice - Bills received</option>
            <option value="levy_warning">Levy Warning - Intent to levy</option>
            <option value="levy_active">Levy Active - Bank/wage levy</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Additional Factors</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasBusinessDebt} onChange={(e) => setHasBusinessDebt(e.target.checked)} className="mr-2" />
              <span className="text-sm">Has Business Tax Debt</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={offerInCompromiseAttempted} onChange={(e) => setOfferInCompromiseAttempted(e.target.checked)} className="mr-2" />
              <span className="text-sm">Offer in Compromise attempted</span>
            </label>
          </div>
          {hasBusinessDebt && (
            <div>
              <label className="block text-sm font-medium mb-1">Business Monthly Income</label>
              <input type="number" value={businessIncome} onChange={(e) => setBusinessIncome(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          )}
        </div>
      </div>

      <div className={`card mb-6 ${result.bestOption.includes('Guaranteed') || result.bestOption.includes('Streamlined') ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Best Payment Plan Option</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Best Option:</span><span className="font-bold ml-2">{result.bestOption}</span></div>
          <div><span className="text-zinc-600">Monthly Payment:</span><span className="font-bold ml-2">$ {result.bestPayment}</span></div>
          <div><span className="text-zinc-600">Term:</span><span className="font-bold ml-2">{result.bestTerm}</span></div>
          <div><span className="text-zinc-600">Disposable Income:</span><span className={`font-bold ml-2 ${Number(result.disposableIncome) <= 0 ? 'text-red-700' : ''}`}>$ {result.disposableIncome}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Plan Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Plan Type</th>
                <th className="py-2 text-left">Eligible</th>
                <th className="py-2 text-left">Requirements</th>
                <th className="py-2 text-left">Payment</th>
                <th className="py-2 text-left">Term</th>
              </tr>
            </thead>
            <tbody>
              {result.planOptions.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.planType}</td>
                  <td className="py-1"><span className={p.eligibility ? 'text-green-700' : 'text-red-700'}>{p.eligibility ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{p.requirements}</td>
                  <td className="py-1">$ {p.monthlyPayment.toFixed(0)}</td>
                  <td className="py-1">{p.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {result.qualificationIssues.length > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Qualification Issues</h2>
          <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
            {result.qualificationIssues.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Setup Fees</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Online Application:</span><span className="font-medium ml-2">$ {result.setupFees.online}</span></div>
          <div><span className="text-zinc-600">Paper Application:</span><span className="font-medium ml-2">$ {result.setupFees.paper}</span></div>
          <div><span className="text-zinc-600">Direct Debit:</span><span className="font-medium ml-2">$ {result.setupFees.directDebitDiscount}</span></div>
          <div><span className="text-zinc-600">Low-Income Waiver:</span><span className={`font-medium ml-2 ${result.setupFees.lowIncomeWaiver ? 'text-green-700' : ''}`}>{result.setupFees.lowIncomeWaiver ? 'Eligible' : 'Not eligible'}</span></div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.disposableIncome) <= 0 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Payment Plan Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Streamlined IA: debt under $50K</li>
          <li>Guaranteed IA: debt under $10K</li>
          <li>Regular IA: requires Form 433-A/B</li>
          <li>File all required returns first</li>
          <li>Apply online at IRS.gov</li>
          <li>Direct debit saves $10 fee</li>
          <li>Low-income fee waiver available</li>
          <li>Interest continues during plan</li>
          <li>Default triggers collection</li>
          <li>Plan releases active levy</li>
        </ul>
      </div>
    </div>
  )
}