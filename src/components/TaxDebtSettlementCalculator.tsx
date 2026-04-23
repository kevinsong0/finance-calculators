'use client'

import { useState } from 'react'

export default function TaxDebtSettlementCalculator() {
  const [totalTaxDebt, setTotalTaxDebt] = useState(50000)
  const [taxYears, setTaxYears] = useState('2020,2021,2022')
  const [monthlyIncome, setMonthlyIncome] = useState(4000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(3800)
  const [assetValue, setAssetValue] = useState(30000)
  const [equityInAssets, setEquityInAssets] = useState(15000)
  const [age, setAge] = useState(45)
  const [healthStatus, setHealthStatus] = useState<'good' | 'fair' | 'poor'>('good')
  const [hasRetirementAccounts, setHasRetirementAccounts] = useState(true)
  const [retirementBalance, setRetirementBalance] = useState(50000)
  const [futureIncomePotential, setFutureIncomePotential] = useState<'stable' | 'declining' | 'increasing'>('stable')
  const [disputedLiability, setDisputedLiability] = useState(false)
  const [collectionStatuteYears, setCollectionStatuteYears] = useState(7)

  const calculate = () => {
    // Tax Debt Settlement Calculator
    // Compare settlement options: OIC, CNC, Payment Plan, etc.

    const disposableIncome = monthlyIncome - monthlyExpenses
    const yearsList = taxYears.split(',').map(y => y.trim())
    const numberOfYears = yearsList.length

    // Calculate Reasonable Collection Potential (RCP) for OIC
    // RCP = Net Realizable Equity in Assets + Future Income

    // Net equity in assets
    const netRealizableEquity = equityInAssets

    // Future income component
    // For OIC: multiply monthly disposable income by months remaining in statute
    const monthsRemaining = collectionStatuteYears * 12
    const futureIncomeValue = Math.max(0, disposableIncome) * monthsRemaining

    // Total RCP
    const totalRCP = netRealizableEquity + futureIncomeValue

    // OIC eligibility
    const oicEligible = totalRCP < totalTaxDebt

    // OIC offer amount (must equal RCP for DATC)
    const minimumOffer = totalRCP

    // Settlement options
    const settlementOptions: { option: string; eligibility: boolean; amount: number; term: string; pros: string; cons: string }[] = []

    // Option 1: Full Payment
    settlementOptions.push({
      option: 'Pay Full Debt',
      eligibility: true,
      amount: totalTaxDebt,
      term: 'Immediate',
      pros: 'Ends collection, no ongoing costs',
      cons: 'May not have funds available',
    })

    // Option 2: Payment Plan
    const planEligible = disposableIncome > 0 && totalTaxDebt <= disposableIncome * 72
    const planPayment = Math.min(totalTaxDebt / 72, disposableIncome)
    settlementOptions.push({
      option: 'Installment Agreement',
      eligibility: planEligible,
      amount: totalTaxDebt,
      term: 'Up to 72 months',
      pros: 'Predictable payments, stops levy',
      cons: 'Interest continues, long commitment',
    })

    // Option 3: OIC - Doubt as to Collectibility (DATC)
    settlementOptions.push({
      option: 'OIC - Doubt as to Collectibility',
      eligibility: oicEligible,
      amount: minimumOffer,
      term: '5-year compliance required',
      pros: `Settle for $${minimumOffer.toFixed(0)} vs $${totalTaxDebt.toFixed(0)}`,
      cons: '5-year monitoring, can be rejected',
    })

    // Option 4: OIC - Doubt as to Liability (DATL)
    settlementOptions.push({
      option: 'OIC - Doubt as to Liability',
      eligibility: disputedLiability,
      amount: 0, // Negotiated based on actual liability
      term: '5-year compliance',
      pros: 'Reduce debt if liability disputed',
      cons: 'Must prove liability error',
    })

    // Option 5: OIC - Effective Tax Administration (ETA)
    const etaEligible = totalRCP >= totalTaxDebt && (
      healthStatus === 'poor' ||
      age >= 65 ||
      futureIncomePotential === 'declining'
    )
    settlementOptions.push({
      option: 'OIC - Effective Tax Administration',
      eligibility: etaEligible,
      amount: minimumOffer,
      term: '5-year compliance',
      pros: 'Settlement even if full collectible',
      cons: 'Must show exceptional circumstances',
    })

    // Option 6: Currently Not Collectible
    const cncEligible = disposableIncome <= 0 || (
      healthStatus === 'poor' &&
      assetValue < 5000
    )
    settlementOptions.push({
      option: 'Currently Not Collectible',
      eligibility: cncEligible,
      amount: 0,
      term: 'Until statute expires',
      pros: 'No payments, stops collection',
      cons: 'Debt remains, statute continues',
    })

    // Option 7: Partial Payment IA
    const ppiEligible = disposableIncome > 0 && disposableIncome * monthsRemaining < totalTaxDebt
    settlementOptions.push({
      option: 'Partial Payment IA',
      eligibility: ppiEligible,
      amount: disposableIncome * monthsRemaining,
      term: 'Until statute expires',
      pros: 'Pay what you can, rest forgiven',
      cons: 'Longer term, interest on balance',
    })

    // Calculate settlement savings
    const oicSavings = totalTaxDebt - minimumOffer
    const ppiSavings = totalTaxDebt - (disposableIncome * monthsRemaining)

    // Compare outcomes
    const outcomes = [
      { method: 'Full Payment', totalCost: totalTaxDebt, years: 0 },
      { method: 'Payment Plan', totalCost: totalTaxDebt + totalTaxDebt * 0.08 * 6, years: 6 }, // Approx interest
      { method: 'OIC (DATC)', totalCost: minimumOffer + 205, years: 5 }, // Application fee
      { method: 'CNC', totalCost: 0, years: collectionStatuteYears },
    ]

    // Best option recommendation
    let bestOption = ''
    let bestAmount = 0
    let bestReason = ''

    if (oicEligible && minimumOffer < totalTaxDebt * 0.5) {
      bestOption = 'OIC - Doubt as to Collectibility'
      bestAmount = minimumOffer
      bestReason = `RCP ($${totalRCP.toFixed(0)}) significantly less than debt. Settle for $${minimumOffer.toFixed(0)} vs $${totalTaxDebt.toFixed(0)}.`
    } else if (cncEligible) {
      bestOption = 'Currently Not Collectible'
      bestAmount = 0
      bestReason = 'No disposable income. Collection suspended. Debt expires at statute.'
    } else if (ppiEligible) {
      bestOption = 'Partial Payment IA'
      bestAmount = disposableIncome * monthsRemaining
      bestReason = `Can pay $${(disposableIncome * monthsRemaining).toFixed(0)} over statute. Remaining $${(totalTaxDebt - disposableIncome * monthsRemaining).toFixed(0)} forgiven.`
    } else if (planEligible) {
      bestOption = 'Installment Agreement'
      bestAmount = totalTaxDebt
      bestReason = `Payable over 72 months at $${planPayment.toFixed(0)}/month. Stops collection.`
    } else {
      bestOption = 'Consider Professional Advice'
      bestAmount = 0
      bestReason = 'Complex situation. Consult tax resolution specialist.'
    }

    // Recommendation details
    let recommendation = ''
    if (bestOption === 'OIC - Doubt as to Collectibility') {
      recommendation = `OIC recommended. Submit Form 656 with $205 application fee. Offer amount: $${minimumOffer.toFixed(0)}. RCP calculation: $${netRealizableEquity.toFixed(0)} (assets) + $${futureIncomeValue.toFixed(0)} (future income) = $${totalRCP.toFixed(0)}. Include Form 433-A (OIC) financial statement.`
    } else if (bestOption === 'Currently Not Collectible') {
      recommendation = `CNC status recommended. Submit Form 433-A/B showing inability to pay. Collection suspended but debt remains. ${collectionStatuteYears} years until statute expiration. Interest continues accruing.`
    } else if (bestOption === 'Partial Payment IA') {
      recommendation = `Partial Payment IA recommended. Monthly payment: $${Math.max(0, disposableIncome).toFixed(0)}. Over ${monthsRemaining} months: $${(disposableIncome * monthsRemaining).toFixed(0)}. Remaining debt forgiven at statute.`
    } else if (bestOption === 'Installment Agreement') {
      recommendation = `Payment plan recommended. Monthly payment: $${planPayment.toFixed(0)} for up to 72 months. Apply online if debt under $50K. Stops levy action. Interest continues.`
    } else {
      recommendation = `Consult tax resolution professional. Complex factors: $${totalTaxDebt.toFixed(0)} debt, $${totalRCP.toFixed(0)} RCP, ${collectionStatuteYears} years statute. Evaluate all options carefully.`
    }

    return {
      totalTaxDebt: totalTaxDebt.toFixed(0),
      taxYears: yearsList.join(', '),
      numberOfYears: numberOfYears.toFixed(0),
      monthlyIncome: monthlyIncome.toFixed(0),
      monthlyExpenses: monthlyExpenses.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      assetValue: assetValue.toFixed(0),
      equityInAssets: equityInAssets.toFixed(0),
      netRealizableEquity: netRealizableEquity.toFixed(0),
      age: age.toFixed(0),
      healthStatus,
      hasRetirementAccounts,
      retirementBalance: retirementBalance.toFixed(0),
      futureIncomePotential,
      disputedLiability,
      collectionStatuteYears: collectionStatuteYears.toFixed(0),
      monthsRemaining: monthsRemaining.toFixed(0),
      futureIncomeValue: futureIncomeValue.toFixed(0),
      totalRCP: totalRCP.toFixed(0),
      oicEligible,
      minimumOffer: minimumOffer.toFixed(0),
      oicSavings: oicSavings.toFixed(0),
      settlementOptions,
      outcomes,
      bestOption,
      bestAmount: bestAmount.toFixed(0),
      bestReason,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Debt Settlement Calculator</h1>
      <p className="text-gray-600 mb-4">Compare settlement options: OIC, CNC, payment plans, and more.</p>

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
          <label className="block text-sm font-medium mb-1">Asset Value</label>
          <input type="number" value={assetValue} onChange={(e) => setAssetValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Equity in Assets</label>
          <input type="number" value={equityInAssets} onChange={(e) => setEquityInAssets(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Collection Statute Years Remaining</label>
          <input type="number" value={collectionStatuteYears} onChange={(e) => setCollectionStatuteYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Additional Factors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Health Status</label>
            <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value as 'good' | 'fair' | 'poor')} className="w-full border rounded p-2">
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Future Income</label>
            <select value={futureIncomePotential} onChange={(e) => setFutureIncomePotential(e.target.value as 'stable' | 'declining' | 'increasing')} className="w-full border rounded p-2">
              <option value="stable">Stable</option>
              <option value="declining">Declining</option>
              <option value="increasing">Increasing</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={disputedLiability} onChange={(e) => setDisputedLiability(e.target.checked)} className="mr-2" />
              <span className="text-sm">Disputed Liability</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={hasRetirementAccounts} onChange={(e) => setHasRetirementAccounts(e.target.checked)} className="mr-2" />
              <span className="text-sm">Has Retirement Accounts</span>
            </label>
          </div>
          {hasRetirementAccounts && (
            <div>
              <label className="block text-sm font-medium mb-1">Retirement Balance</label>
              <input type="number" value={retirementBalance} onChange={(e) => setRetirementBalance(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          )}
        </div>
      </div>

      <div className={`card mb-6 ${result.oicEligible ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">OIC Eligibility - RCP Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Debt:</span><span className="font-bold ml-2">$ {result.totalTaxDebt}</span></div>
          <div><span className="text-zinc-600">Net Equity:</span><span className="font-medium ml-2">$ {result.netRealizableEquity}</span></div>
          <div><span className="text-zinc-600">Future Income:</span><span className="font-medium ml-2">$ {result.futureIncomeValue}</span></div>
          <div><span className="text-zinc-600">Total RCP:</span><span className={`font-bold ml-2 ${Number(result.totalRCP) < Number(result.totalTaxDebt) ? 'text-green-700' : 'text-orange-700'}`}>$ {result.totalRCP}</span></div>
          <div><span className="text-zinc-600">OIC Eligible:</span><span className={`font-bold ml-2 ${result.oicEligible ? 'text-green-700' : 'text-orange-700'}`}>{result.oicEligible ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Min Offer:</span><span className="font-bold ml-2">$ {result.minimumOffer}</span></div>
          <div><span className="text-zinc-600">Potential Savings:</span><span className="font-bold ml-2 text-green-700">$ {result.oicSavings}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Settlement Options Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Eligible</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Term</th>
                <th className="py-2 text-left">Pros</th>
                <th className="py-2 text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              {result.settlementOptions.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.option}</td>
                  <td className="py-1"><span className={s.eligibility ? 'text-green-700' : 'text-red-700'}>{s.eligibility ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">$ {s.amount.toFixed(0)}</td>
                  <td className="py-1">{s.term}</td>
                  <td className="py-1">{s.pros}</td>
                  <td className="py-1">{s.cons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.bestOption.includes('OIC') ? 'bg-green-50 border border-green-200' : result.bestOption.includes('CNC') ? 'bg-blue-50 border border-blue-200' : 'bg-teal-50 border border-teal-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Best Settlement Option</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Best Option:</span><span className="font-bold ml-2">{result.bestOption}</span></div>
          <div><span className="text-zinc-600">Amount:</span><span className="font-bold ml-2">$ {result.bestAmount}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.bestReason}</div>
      </div>

      <div className={`card mb-6 ${Number(result.disposableIncome) <= 0 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Settlement Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>OIC: RCP must be less than debt</li>
          <li>RCP = assets + future income</li>
          <li>Future income: disposable x months</li>
          <li>Application fee: $205</li>
          <li>5-year compliance required</li>
          <li>CNC: no payments, debt remains</li>
          <li>Partial IA: pay until statute</li>
          <li>Statute: 10 years from assessment</li>
          <li>Retirement rarely considered</li>
          <li>Professional help recommended</li>
        </ul>
      </div>
    </div>
  )
}