'use client'

import { useState } from 'react'

export default function IRSOfferInCompromiseCalculator() {
  const [offerType, setOfferType] = useState<'doubt_collectibility' | 'doubt_liability' | 'effective_tax_admin'>('doubt_collectibility')
  const [totalTaxDebt, setTotalTaxDebt] = useState(50000)
  const [annualIncome, setAnnualIncome] = useState(60000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500)
  const [assetValue, setAssetValue] = useState(20000)
  const [assetEquity, setAssetEquity] = useState(15000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [yearsLeft, setYearsLeft] = useState(10)
  const [canPayFull, setCanPayFull] = useState(false)

  const calculate = () => {
    // IRS Offer in Compromise (OIC) Calculator
    // Three types: Doubt as to Collectibility, Doubt as to Liability, Effective Tax Administration

    // Doubt as to Collectibility (most common)
    // Formula: (Net Realizable Equity + Future Income Value) = Offer Amount
    // Net Realizable Equity = Asset value minus quick sale discount
    // Future Income = Monthly disposable income × months allowed

    // Quick sale discount for assets: 20% (IRS allows reduced value)
    const quickSaleDiscount = 0.20
    const netRealizableEquity = assetEquity * (1 - quickSaleDiscount)

    // Monthly disposable income
    const monthlyIncome = annualIncome / 12
    const disposableIncome = Math.max(0, monthlyIncome - monthlyExpenses)

    // Months allowed for payment (based on payment option)
    // Lump sum: 5 months
    // Short-term: 24 months
    // Deferred: remaining statute of limitation years × 12
    const monthsOptions = {
      lump_sum: 5,
      short_term: 24,
      deferred: yearsLeft * 12,
    }

    // Calculate offer amounts for each payment option
    const lumpSumOffer = netRealizableEquity + disposableIncome * monthsOptions.lump_sum
    const shortTermOffer = netRealizableEquity + disposableIncome * monthsOptions.short_term
    const deferredOffer = netRealizableEquity + disposableIncome * monthsOptions.deferred

    // RICS (Reasonable Collection Potential)
    // IRS minimum offer should be RICS
    const RICS = Math.min(lumpSumOffer, totalTaxDebt)

    // Eligibility check
    // - Filed all required returns
    // - Not in bankruptcy
    // - Current on estimated taxes if business
    // - Can't pay full amount within statute period
    const isEligible = !canPayFull && totalTaxDebt > 0

    // Doubt as to Liability eligibility
    // Requires genuine doubt about tax validity
    const doubtLiabilityEligible = offerType === 'doubt_liability'

    // Effective Tax Administration eligibility
    // Special circumstances where collection would be unfair
    // Requires public policy or equity considerations
    const etaEligible = offerType === 'effective_tax_admin'

    // Success probability factors
    const successFactors: string[] = []
    if (lumpSumOffer < totalTaxDebt * 0.5) successFactors.push('Offer significantly below debt')
    if (assetEquity < 5000) successFactors.push('Low assets')
    if (disposableIncome < 200) successFactors.push('Low disposable income')
    if (!canPayFull) successFactors.push('Cannot pay in full')
    if (yearsLeft < 5) successFactors.push('Short statute remaining')

    // Payment options
    const paymentOptions = [
      { name: 'Lump Sum', months: 5, amount: lumpSumOffer, note: 'Pay in 5 months, lowest offer' },
      { name: 'Short-Term', months: 24, amount: shortTermOffer, note: 'Pay over 24 months' },
      { name: 'Deferred', months: yearsLeft * 12, amount: deferredOffer, note: 'Pay over statute period' },
    ]

    // Application fee
    const applicationFee = 186 // 2024 fee
    const feeWaived = annualIncome < 30000 // Low income waiver

    // Low income certification
    // If income below threshold, simplified offer process
    const lowIncomeCert = annualIncome <= 30000

    // Offer recommendation
    let recommendation = ''
    if (lumpSumOffer <= 0) {
      recommendation = 'No collection potential - IRS may accept $0 offer or CNC status'
    } else if (lumpSumOffer > totalTaxDebt) {
      recommendation = 'Offer exceeds debt - pay full amount instead'
    } else if (canPayFull) {
      recommendation = 'Can pay full amount within statute - OIC not appropriate'
    } else if (lowIncomeCert) {
      recommendation = 'Low income certification available - simplified process'
    } else {
      recommendation = `Submit offer around $${Math.round(lumpSumOffer)} for lump sum option`
    }

    // Forms required
    const formsRequired = [
      'Form 656 - Offer in Compromise',
      'Form 433-A (OIC) - Collection Information Statement',
      'Form 433-B (OIC) - Business Collection Info (if applicable)',
    ]

    // Process timeline
    // Initial review: 2-4 months
    // Investigation: 6-12 months
    // Final decision: 12-24 months total

    return {
      offerType,
      totalTaxDebt: totalTaxDebt.toFixed(0),
      annualIncome: annualIncome.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      assetValue: assetValue.toFixed(0),
      assetEquity: assetEquity.toFixed(0),
      quickSaleDiscount: (quickSaleDiscount * 100).toFixed(0),
      netRealizableEquity: netRealizableEquity.toFixed(0),
      yearsLeft: yearsLeft.toFixed(0),
      canPayFull,
      lumpSumOffer: lumpSumOffer.toFixed(0),
      shortTermOffer: shortTermOffer.toFixed(0),
      deferredOffer: deferredOffer.toFixed(0),
      RICS: RICS.toFixed(0),
      isEligible,
      doubtLiabilityEligible,
      etaEligible,
      successFactors,
      paymentOptions,
      applicationFee: applicationFee.toFixed(0),
      feeWaived,
      lowIncomeCert,
      recommendation,
      formsRequired,
      filingStatus,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">IRS Offer in Compromise Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate offer amount to settle tax debt for less than full amount.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Offer Type</label>
          <select value={offerType} onChange={(e) => setOfferType(e.target.value as 'doubt_collectibility' | 'doubt_liability' | 'effective_tax_admin')} className="w-full border rounded p-2">
            <option value="doubt_collectibility">Doubt as to Collectibility (most common)</option>
            <option value="doubt_liability">Doubt as to Liability</option>
            <option value="effective_tax_admin">Effective Tax Administration</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt</label>
          <input type="number" value={totalTaxDebt} onChange={(e) => setTotalTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income</label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Living Expenses</label>
          <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Equity Value</label>
          <input type="number" value={assetEquity} onChange={(e) => setAssetEquity(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Left on Statute</label>
          <input type="number" value={yearsLeft} min="1" max="10" onChange={(e) => setYearsLeft(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Can Pay Full Amount?</label>
          <select value={canPayFull ? 'yes' : 'no'} onChange={(e) => setCanPayFull(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - cannot pay full debt</option>
            <option value="yes">Yes - could pay over time</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>OIC Eligibility</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Eligible:</span><span className={`font-bold ml-2 ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>{result.isEligible ? 'Likely Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Type:</span><span className="font-medium ml-2">{offerType}</span></div>
        </div>
        {!result.isEligible && (
          <div className="text-xs text-red-600 mt-2">If you can pay full debt within statute period, OIC is not appropriate.</div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Must: filed all returns, not in bankruptcy, current on estimated taxes.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Collection Potential Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Monthly Income:</span><span className="font-medium ml-2">$ {result.monthlyIncome}</span></div>
          <div><span className="text-zinc-600">Expenses:</span><span className="font-medium ml-2">$ {result.monthlyExpenses}</span></div>
          <div><span className="text-zinc-600">Disposable:</span><span className="font-bold text-blue-700 ml-2">$ {result.disposableIncome}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Asset Equity:</span><span className="font-medium ml-2">$ {result.assetEquity}</span></div>
          <div><span className="text-zinc-600">Quick Sale (20% off):</span><span className="font-bold text-blue-700 ml-2">$ {result.netRealizableEquity}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRS allows 20% quick sale discount on asset equity value.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Offer Amounts by Payment Option</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Months</th>
                <th className="py-2 text-left">Offer Amount</th>
                <th className="py-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {result.paymentOptions.map((opt) => (
                <tr key={opt.name} className="border-b">
                  <td className="py-1 font-semibold">{opt.name}</td>
                  <td className="py-1">{opt.months}</td>
                  <td className="py-1 font-bold text-purple-700">$ {opt.amount.toFixed(0)}</td>
                  <td className="py-1">{opt.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Lump sum: lowest offer, pay in 5 months. Longer payment = higher offer.</div>
      </div>

      <div className={`card mb-6 ${Number(result.lumpSumOffer) < Number(result.totalTaxDebt) * 0.5 ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Offer vs Debt Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Debt:</span><span className="font-medium ml-2">$ {result.totalTaxDebt}</span></div>
          <div><span className="text-zinc-600">Offer:</span><span className="font-bold ml-2">$ {result.lumpSumOffer}</span></div>
          <div><span className="text-zinc-600">Savings:</span><span className={`font-bold ml-2 ${Number(result.lumpSumOffer) < Number(result.totalTaxDebt) ? 'text-green-700' : 'text-orange-700'}`}>$ {Math.max(0, Number(result.totalTaxDebt) - Number(result.lumpSumOffer)).toFixed(0)}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Offer should represent reasonable collection potential (RICS).</div>
      </div>

      {result.lowIncomeCert && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-teal-700">Low Income Certification</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Income:</span><span className="font-medium ml-2">$ {result.annualIncome}</span></div>
            <div><span className="text-zinc-600">Qualifies:</span><span className="font-bold text-teal-700 ml-2">Yes (≤$30k)</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div><span className="text-zinc-600">App Fee:</span><span className="font-bold text-green-700 ml-2">Waived</span></div>
            <div><span className="text-zinc-600">Process:</span><span className="font-medium ml-2">Simplified</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Low income: $186 fee waived, simpler documentation, may accept $0 offer.</div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Application Fee</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Fee:</span><span className="font-medium ml-2">$ {result.applicationFee}</span></div>
          <div><span className="text-zinc-600">Waived:</span><span className={`font-bold ml-2 ${result.feeWaived ? 'text-green-700' : 'text-orange-700'}`}>{result.feeWaived ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">$186 non-refundable application fee. Waived for low-income taxpayers.</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600 font-medium">{result.recommendation}</div>
        <div className="text-xs text-zinc-600 mt-2">IRS typically accepts offers that represent true collection potential.</div>
      </div>

      {result.successFactors.length > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Success Factors</h2>
          <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
            {result.successFactors.map((factor, i) => (
              <li key={i}>{factor}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Offer in Compromise Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Doubt as to Collectibility: most common</li>
          <li>Formula: Assets + Future Income</li>
          <li>Quick sale: 20% discount</li>
          <li>Lump sum: lowest offer (5 mo)</li>
          <li>Short-term: 24 months</li>
          <li>Deferred: statute period</li>
          <li>$186 application fee</li>
          <li>Low income: fee waived</li>
          <li>File Forms 656 + 433-A</li>
          <li>Process: 12-24 months</li>
        </ul>
      </div>
    </div>
  )
}