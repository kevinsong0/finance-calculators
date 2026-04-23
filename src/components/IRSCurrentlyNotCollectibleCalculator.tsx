'use client'

import { useState } from 'react'

export default function IRSCurrentlyNotCollectibleCalculator() {
  const [totalTaxDebt, setTotalTaxDebt] = useState(35000)
  const [monthlyIncome, setMonthlyIncome] = useState(2500)
  const [monthlyNecessaryExpenses, setMonthlyNecessaryExpenses] = useState(2200)
  const [hasAssets, setHasAssets] = useState(false)
  const [assetValue, setAssetValue] = useState(5000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [employmentStatus, setEmploymentStatus] = useState<'employed' | 'unemployed' | 'retired' | 'disabled'>('unemployed')
  const [ageYears, setAgeYears] = useState(65)
  const [yearsToRetirement, setYearsToRetirement] = useState(0)
  const [expectedIncomeIncrease, setExpectedIncomeIncrease] = useState(false)
  const [hasHardship, setHasHardship] = useState(true)

  const calculate = () => {
    // IRS Currently Not Collectible (CNC) Status
    // When taxpayer has no ability to pay without causing hardship
    // Collection suspended temporarily but debt remains

    // CNC eligibility criteria:
    // 1. Income equals or exceeds necessary living expenses
    // 2. No significant assets beyond exempt amounts
    // 3. No ability to pay without hardship
    // 4. Collection would cause economic hardship

    // Calculate disposable income
    const disposableIncome = monthlyIncome - monthlyNecessaryExpenses

    // CNC qualification thresholds
    // IRS National Standards for living expenses (simplified)
    // If income ≤ necessary expenses, hardship exists
    const hardshipThreshold = 0 // Disposable income must be ≤ 0 for hardship

    // Asset exemption amounts
    // Basic living necessities are exempt
    const exemptAssetAmount = 6500 // Approximate IRS exemption
    const nonExemptAssets = Math.max(0, assetValue - exemptAssetAmount)

    // CNC eligibility determination
    let cncEligible = false
    let cncReason = ''

    if (disposableIncome <= hardshipThreshold && hasHardship) {
      cncEligible = true
      cncReason = 'Income insufficient for living expenses'
    } else if (employmentStatus === 'disabled') {
      cncEligible = true
      cncReason = 'Disabled with limited earning capacity'
    } else if (employmentStatus === 'retired' && ageYears >= 65 && disposableIncome <= 100) {
      cncEligible = true
      cncReason = 'Retired senior with minimal income'
    } else if (employmentStatus === 'unemployed' && !expectedIncomeIncrease) {
      cncEligible = true
      cncReason = 'Unemployed with no income recovery expected'
    } else if (nonExemptAssets <= 1000 && disposableIncome <= 200) {
      cncEligible = true
      cncReason = 'No significant assets, minimal surplus'
    } else if (hasHardship && disposableIncome <= 100) {
      cncEligible = true
      cncReason = 'Documented economic hardship'
    } else {
      cncEligible = false
      cncReason = 'May have ability to pay - consider payment plan'
    }

    // Income/expense analysis
    const monthlySurplus = disposableIncome
    const annualSurplus = monthlySurplus * 12

    // Collection potential
    // If CNC, collection potential = 0
    // If not CNC, calculate payment potential
    const collectionPotential = cncEligible ? 0 : Math.max(0, annualSurplus + nonExemptAssets)

    // Years to collect (statute of limitations)
    // 10 years from assessment
    const statuteYears = 10
    const potentialCollectionOverStatute = collectionPotential * statuteYears

    // CNC status details
    // Debt remains but collection suspended
    // Interest and penalties continue accruing
    // Annual review of financial situation
    // Lien may still be filed

    // Alternative options if CNC not appropriate
    const alternatives: string[] = []
    if (!cncEligible) {
      if (monthlySurplus >= 25) alternatives.push('Installment Agreement')
      if (nonExemptAssets > 5000) alternatives.push('Offer in Compromise')
      if (totalTaxDebt <= 50000) alternatives.push('Streamlined Payment Plan')
    }
    alternatives.push('Request CNC anyway - IRS will evaluate')

    // Documentation required for CNC request
    const documentation = [
      'Form 433-A (Collection Information Statement)',
      'Proof of income (pay stubs, SS, pension)',
      'Proof of expenses (bills, statements)',
      'Asset documentation',
      'Bank statements (3 months)',
      'Employment status proof',
      'Medical/disability documentation (if applicable)',
    ]

    // Process for CNC request
    // 1. Contact IRS
    // 2. Submit Form 433-A with documentation
    // 3. IRS evaluates financial situation
    // 4. IRS determines CNC status

    // Benefits of CNC
    const benefits = [
      'Collection suspended (no levy/seizure)',
      'No monthly payment required',
      'Statute continues running',
      'Can rebuild financial situation',
    ]

    // Limitations/risks
    const limitations = [
      'Debt NOT eliminated - still owed',
      'Interest/penalties continue accruing',
      'Lien may still be filed',
      'Annual financial review by IRS',
      'Status can be revoked if income improves',
      'Refunds applied to debt',
      'No passport certification possible',
    ]

    // Recommendation
    let recommendation = ''
    if (cncEligible) {
      recommendation = 'Likely eligible for CNC - submit Form 433-A with hardship documentation'
    } else if (monthlySurplus > 0 && monthlySurplus < 500) {
      recommendation = 'Consider payment plan or request CNC with hardship documentation'
    } else if (monthlySurplus >= 500) {
      recommendation = 'Payment plan likely better option - CNC not appropriate'
    } else {
      recommendation = 'Evaluate alternatives - may qualify for CNC if hardship documented'
    }

    return {
      totalTaxDebt: totalTaxDebt.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      monthlyNecessaryExpenses: monthlyNecessaryExpenses.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      hasAssets,
      assetValue: assetValue.toFixed(0),
      exemptAssetAmount: exemptAssetAmount.toFixed(0),
      nonExemptAssets: nonExemptAssets.toFixed(0),
      filingStatus,
      employmentStatus,
      ageYears: ageYears.toFixed(0),
      yearsToRetirement: yearsToRetirement.toFixed(0),
      expectedIncomeIncrease,
      hasHardship,
      cncEligible,
      cncReason,
      monthlySurplus: monthlySurplus.toFixed(0),
      annualSurplus: annualSurplus.toFixed(0),
      collectionPotential: collectionPotential.toFixed(0),
      statuteYears: statuteYears.toFixed(0),
      potentialCollectionOverStatute: potentialCollectionOverStatute.toFixed(0),
      alternatives,
      documentation,
      benefits,
      limitations,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Currently Not Collectible (CNC) Calculator</h1>
      <p className="text-gray-600 mb-4">Determine eligibility for CNC status when unable to pay.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt</label>
          <input type="number" value={totalTaxDebt} onChange={(e) => setTotalTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income</label>
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Necessary Expenses</label>
          <input type="number" value={monthlyNecessaryExpenses} onChange={(e) => setMonthlyNecessaryExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employment Status</label>
          <select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value as 'employed' | 'unemployed' | 'retired' | 'disabled')} className="w-full border rounded p-2">
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has Assets?</label>
          <select value={hasAssets ? 'yes' : 'no'} onChange={(e) => setHasAssets(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No significant assets</option>
            <option value="yes">Yes - has assets</option>
          </select>
        </div>
        {hasAssets && (
          <div>
            <label className="block text-sm font-medium mb-1">Asset Value</label>
            <input type="number" value={assetValue} onChange={(e) => setAssetValue(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={ageYears} min="18" max="100" onChange={(e) => setAgeYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Economic Hardship?</label>
          <select value={hasHardship ? 'yes' : 'no'} onChange={(e) => setHasHardship(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - cannot meet basic needs</option>
            <option value="no">No - can manage</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.cncEligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.cncEligible ? 'text-green-700' : 'text-orange-700'}`}>CNC Eligibility</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Eligible:</span><span className={`font-bold ml-2 ${result.cncEligible ? 'text-green-700' : 'text-orange-700'}`}>{result.cncEligible ? 'Likely Yes' : 'Uncertain'}</span></div>
          <div><span className="text-zinc-600">Reason:</span><span className="font-medium ml-2">{result.cncReason}</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.employmentStatus}`}>{result.employmentStatus}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">CNC requires: income ≤ necessary expenses, no significant assets, documented hardship.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Financial Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Income:</span><span className="font-medium ml-2">$ {result.monthlyIncome}</span></div>
          <div><span className="text-zinc-600">Expenses:</span><span className="font-medium ml-2">$ {result.monthlyNecessaryExpenses}</span></div>
          <div><span className="text-zinc-600">Surplus:</span><span className={`font-bold ml-2 ${Number(result.disposableIncome) <= 0 ? 'text-green-700' : 'text-blue-700'}`}>$ {result.disposableIncome}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Annual Surplus:</span><span className="font-medium ml-2">$ {result.annualSurplus}</span></div>
          <div><span className="text-zinc-600">Non-Exempt Assets:</span><span className="font-medium ml-2">$ {result.nonExemptAssets}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Negative surplus = hardship. IRS exempts basic living necessities (~$6,500).</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Collection Potential</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Debt:</span><span className="font-medium ml-2">$ {result.totalTaxDebt}</span></div>
          <div><span className="text-zinc-600">CNC:</span><span className={`font-bold ml-2 ${result.cncEligible ? 'text-green-700' : 'text-zinc-600'}`}>{result.cncEligible ? 'Zero collection' : 'May collect'}</span></div>
          <div><span className="text-zinc-600">Potential:</span><span className="font-bold ml-2">$ {result.collectionPotential}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">If CNC, IRS suspends collection. Statute runs (10 years). Debt remains legally owed.</div>
      </div>

      {result.cncEligible && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">CNC Benefits</h2>
          <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
            {result.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
          <div className="text-xs text-zinc-600 mt-2">Collection suspended. No levies or seizures. Time to recover financially.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-red-700">CNC Limitations</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.limitations.slice(0, 5).map((limit, i) => (
            <li key={i}>{limit}</li>
          ))}
        </ul>
        <div className="text-xs text-red-600 mt-2">Debt NOT eliminated. Interest continues. IRS reviews annually.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Required</h2>
        <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
          {result.documentation.slice(0, 5).map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
        <div className="text-xs text-zinc-600 mt-2">Submit Form 433-A with all supporting documents to request CNC.</div>
      </div>

      {!result.cncEligible && result.alternatives.length > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Alternative Options</h2>
          <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
            {result.alternatives.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600 font-medium">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">CNC Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>CNC: suspend collection</li>
          <li>Not debt forgiveness</li>
          <li>Hardship required</li>
          <li>Income ≤ expenses</li>
          <li>No significant assets</li>
          <li>Interest continues</li>
          <li>Annual IRS review</li>
          <li>10-year statute runs</li>
          <li>Lien may still file</li>
          <li>File Form 433-A</li>
        </ul>
      </div>
    </div>
  )
}