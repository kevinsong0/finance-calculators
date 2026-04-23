'use client'

import { useState } from 'react'

export default function TaxSettlementTimelineCalculator() {
  const [settlementType, setSettlementType] = useState<'oic' | 'cnc' | 'ia' | 'partial_payment'>('oic')
  const [totalDebt, setTotalDebt] = useState(50000)
  const [incomeMonthly, setIncomeMonthly] = useState(4000)
  const [expensesMonthly, setExpensesMonthly] = useState(3500)
  const [assetValue, setAssetValue] = useState(10000)
  const [assetEquity, setAssetEquity] = useState(8000)
  const [taxYears, setTaxYears] = useState(3)
  const [filingStatus, setFilingStatus] = useState<'compliant' | 'non_compliant' | 'partial'>('compliant')
  const [businessOwner, setBusinessOwner] = useState(false)
  const [currentlyCollectible, setCurrentlyCollectible] = useState(true)
  const [offerAmount, setOfferAmount] = useState(15000)
  const [alreadyFiledOIC, setAlreadyFiledOIC] = useState(false)

  const calculate = () => {
    // Tax Settlement Timeline Calculator
    // Calculate timeline for IRS settlement options: OIC, CNC, IA, Partial Payment

    const disposableIncome = incomeMonthly - expensesMonthly
    const remainingCollectionPeriod = 10 - (taxYears > 0 ? Math.min(taxYears, 10) : 0)

    // Calculate RCP (Reasonable Collection Potential)
    const futureIncomeValue = disposableIncome * remainingCollectionPeriod * 12
    const rcp = assetEquity + Math.max(0, futureIncomeValue)

    // Timeline phases based on settlement type
    const phases: { phase: string; duration: string; description: string; milestone: string }[] = []

    if (settlementType === 'oic') {
      phases.push({
        phase: 'Pre-Application Preparation',
        duration: '2-4 weeks',
        description: 'Gather financial documentation, calculate RCP, determine offer amount',
        milestone: 'Complete Forms 433-A/B and Form 656',
      })

      phases.push({
        phase: 'Application Submission',
        duration: '1-2 weeks',
        description: 'Submit OIC package with $205 application fee and 20% payment',
        milestone: 'IRS receives application, assigns to examiner',
      })

      phases.push({
        phase: 'Initial Review',
        duration: '2-4 weeks',
        description: 'IRS reviews for processability, checks compliance status',
        milestone: 'IRS sends acceptance letter or returns for deficiencies',
      })

      phases.push({
        phase: 'Financial Investigation',
        duration: '4-12 months',
        description: 'Examiner verifies assets, income, expenses, calculates RCP',
        milestone: 'IRS may request additional documentation',
      })

      phases.push({
        phase: 'Offer Negotiation',
        duration: '2-6 months',
        description: 'IRS proposes counter-offer if RCP exceeds submitted offer',
        milestone: 'Negotiation or acceptance of offer amount',
      })

      phases.push({
        phase: 'Final Decision',
        duration: '1-2 months',
        description: 'IRS issues acceptance, rejection, or appeal rights',
        milestone: 'Form 656-L or rejection letter',
      })

      if (filingStatus === 'compliant') {
        phases.push({
          phase: 'Payment Period',
          duration: '5-24 months',
          description: 'Pay agreed amount per terms (lump sum or periodic)',
          milestone: 'All payments completed',
        })
      }

      phases.push({
        phase: 'Lien Release',
        duration: '30 days after payment',
        description: 'IRS releases lien upon full payment of offer',
        milestone: 'Certificate of Release issued',
      })
    } else if (settlementType === 'cnc') {
      phases.push({
        phase: 'Financial Documentation',
        duration: '2-4 weeks',
        description: 'Prepare Form 433-F showing financial hardship',
        milestone: 'Complete financial statement',
      })

      phases.push({
        phase: 'CNC Request',
        duration: '1-2 weeks',
        description: 'Submit CNC request to IRS Collection',
        milestone: 'IRS receives CNC application',
      })

      phases.push({
        phase: 'IRS Review',
        duration: '2-6 weeks',
        description: 'IRS verifies inability to pay without hardship',
        milestone: 'CNC determination made',
      })

      phases.push({
        phase: 'CNC Status Granted',
        duration: 'Immediate',
        description: 'Collection suspended, debt remains',
        milestone: 'Account marked CNC',
      })

      phases.push({
        phase: 'Annual Review',
        duration: 'Annual',
        description: 'IRS reviews CNC status each year for 10-year period',
        milestone: 'CNC status maintained or revoked',
      })

      phases.push({
        phase: 'CSED Expiration',
        duration: `${remainingCollectionPeriod} years`,
        description: '10-year collection statute expires',
        milestone: 'Debt legally expires',
      })
    } else if (settlementType === 'ia') {
      phases.push({
        phase: 'Financial Assessment',
        duration: '1-2 weeks',
        description: 'Calculate affordable monthly payment',
        milestone: 'Payment amount determined',
      })

      phases.push({
        phase: 'IA Application',
        duration: '1 week',
        description: 'Submit IA request online, phone, or mail',
        milestone: 'IRS receives IA request',
      })

      phases.push({
        phase: 'IRS Processing',
        duration: '2-6 weeks',
        description: 'IRS reviews financials, approves IA terms',
        milestone: 'IA agreement letter issued',
      })

      phases.push({
        phase: 'Payment Period',
        duration: `${Math.ceil(totalDebt / disposableIncome)} months`,
        description: 'Monthly payments per agreement',
        milestone: 'All payments completed',
      })

      phases.push({
        phase: 'Lien Release',
        duration: 'Upon completion',
        description: 'Lien released after full payment',
        milestone: 'Certificate of Release',
      })
    } else if (settlementType === 'partial_payment') {
      phases.push({
        phase: 'Financial Documentation',
        duration: '2-4 weeks',
        description: 'Prepare Form 433 showing limited payment ability',
        milestone: 'Financial statement complete',
      })

      phases.push({
        phase: 'PPIA Application',
        duration: '1-2 weeks',
        description: 'Submit partial payment IA request',
        milestone: 'IRS receives application',
      })

      phases.push({
        phase: 'IRS Review',
        duration: '2-6 weeks',
        description: 'IRS verifies inability to pay full debt',
        milestone: 'PPIA approved or denied',
      })

      phases.push({
        phase: 'Payment Period',
        duration: `${remainingCollectionPeriod} years`,
        description: 'Payments until CSED expires',
        milestone: 'CSED approaches expiration',
      })

      phases.push({
        phase: 'CSED Expiration',
        duration: 'Upon expiration',
        description: 'Remaining debt forgiven when statute expires',
        milestone: 'Debt expires unpaid',
      })
    }

    // Calculate estimated total timeline
    let totalMonths = 0
    let totalYears = 0

    if (settlementType === 'oic') {
      totalMonths = filingStatus === 'compliant' ? 24 : 36 // 12-24 months typical + payment period
    } else if (settlementType === 'cnc') {
      totalYears = remainingCollectionPeriod // wait for CSED
    } else if (settlementType === 'ia') {
      totalMonths = Math.ceil(totalDebt / Math.max(disposableIncome, 100))
    } else if (settlementType === 'partial_payment') {
      totalYears = remainingCollectionPeriod
    }

    // Settlement comparison
    const comparison: { option: string; timeline: string; totalPaid: string; debtRemaining: string; pros: string; cons: string }[] = []

    const oicPaid = Math.min(offerAmount, rcp * 0.8)
    comparison.push({
      option: 'Offer in Compromise',
      timeline: '12-24 months + payment',
      totalPaid: `$${oicPaid.toFixed(0)} (offer amount)`,
      debtRemaining: '$0',
      pros: 'Debt settled for less than full, lien release upon payment',
      cons: 'Long process, requires compliance, uncertain acceptance',
    })

    comparison.push({
      option: 'Currently Not Collectible',
      timeline: `${remainingCollectionPeriod} years (wait for CSED)`,
      totalPaid: '$0',
      debtRemaining: `$${totalDebt.toFixed(0)} (expires with CSED)`,
      pros: 'Immediate collection suspension, no payments required',
      cons: 'Debt remains, interest accrues, annual IRS review',
    })

    const iaPayment = Math.max(disposableIncome, 100)
    const iaMonths = Math.ceil(totalDebt / iaPayment)
    comparison.push({
      option: 'Installment Agreement',
      timeline: `${iaMonths} months`,
      totalPaid: `$${totalDebt.toFixed(0)} + interest`,
      debtRemaining: '$0',
      pros: 'Predictable payments, avoid enforced collection',
      cons: 'Full debt plus interest, may trigger lien',
    })

    const ppiaPayment = Math.max(disposableIncome * 0.5, 50)
    const ppiaYears = remainingCollectionPeriod
    const ppiaPaid = ppiaPayment * 12 * ppiaYears
    comparison.push({
      option: 'Partial Payment IA',
      timeline: `${ppiaYears} years`,
      totalPaid: `$${Math.min(ppiaPaid, totalDebt).toFixed(0)}`,
      debtRemaining: `$${Math.max(0, totalDebt - ppiaPaid).toFixed(0)} forgiven`,
      pros: 'Partial payments, remaining forgiven at CSED',
      cons: 'Long timeline, interest accrues, requires annual review',
    })

    // Success factors
    const successFactors: { factor: string; status: string; impact: string }[] = []

    successFactors.push({
      factor: 'Tax Compliance',
      status: filingStatus === 'compliant' ? 'Good' : filingStatus === 'partial' ? 'Moderate' : 'Poor',
      impact: filingStatus === 'compliant' ? 'Essential for OIC, helps all options' : 'Non-compliance blocks OIC',
    })

    successFactors.push({
      factor: 'Disposable Income',
      status: disposableIncome > 0 ? 'Has Payment Ability' : 'Hardship',
      impact: disposableIncome > 0 ? 'Enables IA/PPIA' : 'Strong CNC/OIC case',
    })

    successFactors.push({
      factor: 'RCP vs Debt',
      status: rcp < totalDebt ? 'OIC Favorable' : 'OIC Unlikely',
      impact: rcp < totalDebt ? `RCP $${rcp.toFixed(0)} suggests viable OIC` : `RCP $${rcp.toFixed(0)} exceeds debt`,
    })

    successFactors.push({
      factor: 'Collection Period Left',
      status: remainingCollectionPeriod < 5 ? 'Short' : remainingCollectionPeriod < 8 ? 'Moderate' : 'Long',
      impact: `${remainingCollectionPeriod} years remaining affects settlement approach`,
    })

    // Recommendation
    let recommendation = ''

    if (settlementType === 'oic') {
      if (filingStatus !== 'compliant') {
        recommendation = `WARNING: Non-compliance blocks OIC. First become compliant: file all missing returns, make current estimated payments. Then submit OIC. RCP: $${rcp.toFixed(0)}. Offer should be close to RCP. Timeline: 12-24 months typical.`
      } else if (rcp >= totalDebt) {
        recommendation = `OIC unlikely. RCP ($${rcp.toFixed(0)}) equals or exceeds debt ($${totalDebt.toFixed(0)}). Consider IA instead, or reduce RCP by spending assets, increasing allowable expenses. OIC rejection rate high when RCP > debt.`
      } else {
        recommendation = `OIC viable. RCP ($${rcp.toFixed(0)}) less than debt ($${totalDebt.toFixed(0)}). Offer amount should approximate RCP. ${disposableIncome <= 0 ? 'Strong hardship case.' : 'Future income contributes to RCP.'} Timeline: 12-24 months. Maintain compliance throughout.`
      }
    } else if (settlementType === 'cnc') {
      if (disposableIncome <= 0) {
        recommendation = `CNC appropriate. Disposable income $${disposableIncome.toFixed(0)} shows hardship. IRS likely to grant CNC. Collection suspended but debt remains. Interest continues. Annual IRS reviews. Wait ${remainingCollectionPeriod} years for CSED expiration.`
      } else {
        recommendation = `CNC may be granted but less likely. Income shows payment ability. CNC requires demonstrating payment would cause hardship. Prepare strong hardship documentation. Consider IA or PPIA if CNC denied.`
      }
    } else if (settlementType === 'ia') {
      const monthlyPayment = Math.max(disposableIncome, 100)
      const monthsNeeded = Math.ceil(totalDebt / monthlyPayment)
      recommendation = `IA viable. Monthly payment: $${monthlyPayment.toFixed(0)}. Duration: ${monthsNeeded} months. ${monthsNeeded > 72 ? 'Consider Streamlined IA (up to 72 months) or formal IA.' : 'Streamlined IA available.'} Full debt plus interest. Lien may be filed for debts >$10,000.`
    } else if (settlementType === 'partial_payment') {
      recommendation = `PPIA appropriate for inability to pay full debt within CSED. Payments: $${Math.max(disposableIncome * 0.5, 50).toFixed(0)}/month suggested. Duration: ${remainingCollectionPeriod} years until CSED expires. Remaining debt forgiven at expiration. Annual financial review required.`
    }

    return {
      settlementType,
      totalDebt: totalDebt.toFixed(0),
      incomeMonthly: incomeMonthly.toFixed(0),
      expensesMonthly: expensesMonthly.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      assetEquity: assetEquity.toFixed(0),
      taxYears,
      filingStatus,
      remainingCollectionPeriod,
      rcp: rcp.toFixed(0),
      offerAmount: offerAmount.toFixed(0),
      phases,
      totalMonths,
      totalYears,
      comparison,
      successFactors,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Settlement Timeline Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate timeline and milestones for IRS settlement options: OIC, CNC, IA, Partial Payment.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Settlement Type</label>
          <select value={settlementType} onChange={(e) => setSettlementType(e.target.value as 'oic' | 'cnc' | 'ia' | 'partial_payment')} className="w-full border rounded p-2">
            <option value="oic">Offer in Compromise</option>
            <option value="cnc">Currently Not Collectible</option>
            <option value="ia">Installment Agreement</option>
            <option value="partial_payment">Partial Payment IA</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Tax Debt</label>
          <input type="number" value={totalDebt} onChange={(e) => setTotalDebt(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Income</label>
          <input type="number" value={incomeMonthly} onChange={(e) => setIncomeMonthly(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
          <input type="number" value={expensesMonthly} onChange={(e) => setExpensesMonthly(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Equity</label>
          <input type="number" value={assetEquity} onChange={(e) => setAssetEquity(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Since Assessment</label>
          <input type="number" value={taxYears} onChange={(e) => setTaxYears(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        {settlementType === 'oic' && (
          <div>
            <label className="block text-sm font-medium mb-1">Offer Amount</label>
            <input type="number" value={offerAmount} onChange={(e) => setOfferAmount(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Status & Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Filing Compliance</label>
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'compliant' | 'non_compliant' | 'partial')} className="w-full border rounded p-2">
              <option value="compliant">Compliant</option>
              <option value="partial">Partially Compliant</option>
              <option value="non_compliant">Non-Compliant</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={businessOwner} onChange={(e) => setBusinessOwner(e.target.checked)} className="mr-2" />
              <span className="text-sm">Business Owner</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={currentlyCollectible} onChange={(e) => setCurrentlyCollectible(e.target.checked)} className="mr-2" />
              <span className="text-sm">Currently Collectible</span>
            </label>
          </div>
          {settlementType === 'oic' && (
            <div>
              <label className="flex items-center">
                <input type="checkbox" checked={alreadyFiledOIC} onChange={(e) => setAlreadyFiledOIC(e.target.checked)} className="mr-2" />
                <span className="text-sm">Already Filed OIC</span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.rcp) < Number(result.totalDebt) ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Financial Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Debt:</span><span className="font-bold ml-2">$ {result.totalDebt}</span></div>
          <div><span className="text-zinc-600">Disposable Income:</span><span className="font-bold ml-2">$ {result.disposableIncome}/mo</span></div>
          <div><span className="text-zinc-600">Asset Equity:</span><span className="font-bold ml-2">$ {result.assetEquity}</span></div>
          <div><span className="text-zinc-600">RCP:</span><span className={`font-bold ml-2 ${Number(result.rcp) < Number(result.totalDebt) ? 'text-green-700' : 'text-orange-700'}`}>$ {result.rcp}</span></div>
          <div><span className="text-zinc-600">Years Remaining:</span><span className="font-bold ml-2">{result.remainingCollectionPeriod}</span></div>
          <div><span className="text-zinc-600">Settlement:</span><span className="font-bold ml-2">{result.settlementType.toUpperCase()}</span></div>
        </div>
        <div className="text-sm font-semibold mt-2">{Number(result.rcp) < Number(result.totalDebt) ? 'RCP below debt - settlement viable' : 'RCP exceeds debt - consider reducing assets or IA'}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Settlement Timeline Phases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Phase</th>
                <th className="py-2 text-left">Duration</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {result.phases.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.phase}</td>
                  <td className="py-1">{p.duration}</td>
                  <td className="py-1">{p.description}</td>
                  <td className="py-1">{p.milestone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-sm font-semibold">Total Timeline: {result.totalYears > 0 ? `${result.totalYears} years` : `${result.totalMonths} months`}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Settlement Options Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Timeline</th>
                <th className="py-2 text-left">Total Paid</th>
                <th className="py-2 text-left">Debt Remaining</th>
              </tr>
            </thead>
            <tbody>
              {result.comparison.map((c, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{c.option}</td>
                  <td className="py-1">{c.timeline}</td>
                  <td className="py-1">{c.totalPaid}</td>
                  <td className="py-1">{c.debtRemaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Success Factors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Factor</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Impact</th>
              </tr>
            </thead>
            <tbody>
              {result.successFactors.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.factor}</td>
                  <td className="py-1">{s.status}</td>
                  <td className="py-1">{s.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.rcp) < Number(result.totalDebt) && result.filingStatus === 'compliant' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Settlement Timeline Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>OIC: 12-24 months typical</li>
          <li>CNC: Wait for CSED expiration</li>
          <li>IA: Based on payment amount</li>
          <li>PPIA: Until CSED expires</li>
          <li>Compliance required for OIC</li>
          <li>RCP determines OIC viability</li>
          <li>Document everything thoroughly</li>
          <li>Respond timely to IRS requests</li>
          <li>Professional help recommended</li>
          <li>Maintain compliance throughout</li>
        </ul>
      </div>
    </div>
  )
}