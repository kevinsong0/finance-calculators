'use client'

import { useState } from 'react'

export default function TaxLienReleaseCalculator() {
  const [lienAmount, setLienAmount] = useState(50000)
  const [lienDate, setLienDate] = useState('2023-01-15')
  const [taxDebtPaid, setTaxDebtPaid] = useState(false)
  const [taxDebtRemaining, setTaxDebtRemaining] = useState(50000)
  const [lienType, setLienType] = useState<'federal' | 'state' | 'property'>('federal')
  const [releaseReason, setReleaseReason] = useState<'payment' | 'subordination' | 'discharge' | 'withdrawal' | 'expiration'>('payment')
  const [propertySold, setPropertySold] = useState(false)
  const [salePrice, setSalePrice] = useState(200000)
  const [existingMortgage, setExistingMortgage] = useState(150000)
  const [csedExpired, setCsedExpired] = useState(false)
  const [csedDate, setCsedDate] = useState('2033-01-15')
  const [withdrawalEligible, setWithdrawalEligible] = useState(false)
  const [installmentAgreement, setInstallmentAgreement] = useState(false)

  const calculate = () => {
    // Tax Lien Release Calculator
    // Calculate lien release options, requirements, and timeline

    const lienDateObj = new Date(lienDate)
    const csedDateObj = new Date(csedDate)
    const today = new Date()
    const lienAgeDays = Math.ceil((today.getTime() - lienDateObj.getTime()) / (1000 * 60 * 60 * 24))
    const daysUntilCSED = Math.ceil((csedDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Release options
    const releaseOptions: { type: string; eligibility: string; process: string; timeline: string; cost: string }[] = []

    // Full Payment Release
    releaseOptions.push({
      type: 'Full Payment Release',
      eligibility: taxDebtPaid ? 'Eligible' : taxDebtRemaining > 0 ? 'Not Eligible' : 'Eligible',
      process: taxDebtPaid ? 'IRS automatically releases lien within 30 days of full payment' : 'Pay full tax debt including penalties and interest',
      timeline: taxDebtPaid ? '30 days' : 'Upon payment',
      cost: `$${taxDebtRemaining.toFixed(0)} remaining`,
    })

    // Lien Discharge (specific property)
    if (releaseReason === 'discharge' || propertySold) {
      const saleProceedsAfterMortgage = salePrice - existingMortgage
      const canPayLienFromProceeds = saleProceedsAfterMortgage >= lienAmount

      releaseOptions.push({
        type: 'Lien Discharge',
        eligibility: canPayLienFromProceeds ? 'Eligible' : saleProceedsAfterMortgage > lienAmount * 0.5 ? 'Partial' : 'Not Eligible',
        process: 'Apply for discharge using Form 14135. IRS releases lien from specific property while keeping lien on taxpayer.',
        timeline: '30-60 days',
        cost: canPayLienFromProceeds ? `Full lien from proceeds` : 'Partial discharge may be available',
      })
    }

    // Lien Subordination
    releaseOptions.push({
      type: 'Lien Subordination',
      eligibility: 'If refinancing benefits IRS',
      process: 'Apply with Form 14134. IRS moves lien behind new lender, not full release.',
      timeline: '30-60 days',
      cost: '$100+ application fee',
    })

    // Lien Withdrawal
    releaseOptions.push({
      type: 'Lien Withdrawal',
      eligibility: withdrawalEligible ? 'Eligible' : installmentAgreement ? 'Potentially Eligible' : 'Review Required',
      process: withdrawalEligible ? 'Request withdrawal with Form 12277. Removes lien from public record entirely.' : 'Must meet withdrawal criteria: lien filed incorrectly, taxpayer in compliance, or IA accepted',
      timeline: '30-45 days',
      cost: 'No fee',
    })

    // Statute Expiration
    releaseOptions.push({
      type: 'CSED Expiration',
      eligibility: csedExpired ? 'Eligible' : daysUntilCSED > 0 ? `Expires in ${daysUntilCSED} days` : 'Expired',
      process: csedExpired ? 'Lien automatically releases upon CSED expiration' : 'Wait for collection statute to expire',
      timeline: csedExpired ? 'Automatic' : `${Math.ceil(daysUntilCSED / 365)} years`,
      cost: 'No action needed',
    })

    // Calculate release likelihood
    let releaseLikelihood = 0
    let bestOption = ''

    if (taxDebtPaid) {
      releaseLikelihood = 100
      bestOption = 'Full payment - automatic release within 30 days'
    } else if (csedExpired) {
      releaseLikelihood = 100
      bestOption = 'CSED expired - automatic release'
    } else if (withdrawalEligible) {
      releaseLikelihood = 85
      bestOption = 'Withdrawal - removes lien from public record'
    } else if (propertySold && salePrice - existingMortgage >= lienAmount) {
      releaseLikelihood = 80
      bestOption = 'Discharge from property - sale proceeds cover lien'
    } else if (installmentAgreement && lienAmount < 25000) {
      releaseLikelihood = 60
      bestOption = 'Fresh Start withdrawal - IA may qualify for lien withdrawal'
    } else {
      releaseLikelihood = 30
      bestOption = 'Payment required - consider IA or OIC to address debt'
    }

    // Required documentation
    const documentation: { item: string; required: boolean; notes: string }[] = []

    documentation.push({ item: 'Lien notice copy', required: true, notes: 'Form 668-Y or state equivalent' })
    documentation.push({ item: 'Payment proof', required: taxDebtPaid, notes: 'Bank records, IRS confirmation' })

    if (releaseReason === 'discharge' || propertySold) {
      documentation.push({ item: 'Property appraisal', required: true, notes: 'Current market value' })
      documentation.push({ item: 'Sale agreement', required: propertySold, notes: 'If property being sold' })
      documentation.push({ item: 'Mortgage statement', required: true, notes: 'Existing encumbrances' })
    }

    if (releaseReason === 'withdrawal') {
      documentation.push({ item: 'Withdrawal request', required: true, notes: 'Form 12277' })
      documentation.push({ item: 'Compliance evidence', required: true, notes: 'Current tax filings, payments' })
      documentation.push({ item: 'IA agreement', required: installmentAgreement, notes: 'If applicable' })
    }

    documentation.push({ item: 'Application fee', required: releaseReason === 'subordination', notes: '$100 minimum for subordination' })

    // Release process steps
    const steps: { step: string; action: string; timeframe: string }[] = []

    steps.push({
      step: '1. Verify Lien Status',
      action: 'Confirm lien details, amount, and filing date',
      timeframe: 'Day 1',
    })

    steps.push({
      step: '2. Determine Release Method',
      action: `Select appropriate release option: ${bestOption}`,
      timeframe: 'Days 1-3',
    })

    steps.push({
      step: '3. Gather Documentation',
      action: 'Collect required documents for application',
      timeframe: 'Days 3-7',
    })

    steps.push({
      step: '4. Submit Application',
      action: 'File appropriate form with IRS',
      timeframe: 'Days 7-14',
    })

    steps.push({
      step: '5. IRS Processing',
      action: 'IRS reviews application and processes release',
      timeframe: '30-60 days',
    })

    steps.push({
      step: '6. Receive Release Certificate',
      action: 'IRS issues Certificate of Release of Federal Tax Lien',
      timeframe: 'After approval',
    })

    steps.push({
      step: '7. File Release Locally',
      action: 'Record release certificate with county/state',
      timeframe: 'Within 30 days',
    })

    // Recommendation
    let recommendation = ''

    if (taxDebtPaid) {
      recommendation = `Full payment completed. IRS will automatically release lien within 30 days. Monitor for Certificate of Release. If not received, contact IRS at 1-800-913-6050. File release certificate with county recorder to clear title.`
    } else if (csedExpired) {
      recommendation = `Collection statute expired. Lien should be automatically released. If not released, request Certificate of Release from IRS citing CSED expiration. Verify no extensions apply (OIC, bankruptcy, CDP appeal).`
    } else if (withdrawalEligible) {
      recommendation = `Eligible for lien withdrawal. Submit Form 12277 requesting withdrawal. Withdrawal removes lien from public record entirely - better than release. Requires proof of compliance and proper filing.`
    } else if (propertySold) {
      const proceeds = salePrice - existingMortgage
      if (proceeds >= lienAmount) {
        recommendation = `Property sale with sufficient proceeds. Apply for discharge using Form 14135. Sale proceeds will pay lien. Lien released from property while remaining on taxpayer if debt not fully paid.`
      } else {
        recommendation = `Property sale proceeds insufficient to pay full lien. Negotiate partial discharge with IRS. Proceeds of $${proceeds.toFixed(0)} may cover portion of lien. Consider other release options.`
      }
    } else if (installmentAgreement) {
      recommendation = `Installment agreement in place. Under Fresh Start, liens under $25K may be withdrawn. Request withdrawal with Form 12277. Maintain IA compliance. Lien may still be released if IA conditions met.`
    } else {
      recommendation = `Multiple options available. ${taxDebtRemaining < lienAmount ? 'Consider partial payment to reduce lien. ' : ''}Payment plan may allow withdrawal under Fresh Start. If CSED near expiration (${Math.ceil(daysUntilCSED / 365)} years), wait may be viable. Consult professional for complex situations.`
    }

    return {
      lienAmount: lienAmount.toFixed(0),
      lienDate,
      lienType,
      lienAgeDays,
      taxDebtPaid,
      taxDebtRemaining: taxDebtRemaining.toFixed(0),
      releaseReason,
      propertySold,
      salePrice: salePrice.toFixed(0),
      existingMortgage: existingMortgage.toFixed(0),
      csedExpired,
      csedDate,
      daysUntilCSED,
      withdrawalEligible,
      installmentAgreement,
      releaseOptions,
      releaseLikelihood: releaseLikelihood.toFixed(0),
      bestOption,
      documentation,
      steps,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Lien Release Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate lien release options, eligibility, and timeline for removing IRS tax liens.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Lien Amount</label>
          <input type="number" value={lienAmount} onChange={(e) => setLienAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lien Filed Date</label>
          <input type="date" value={lienDate} onChange={(e) => setLienDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lien Type</label>
          <select value={lienType} onChange={(e) => setLienType(e.target.value as 'federal' | 'state' | 'property')} className="w-full border rounded p-2">
            <option value="federal">Federal Tax Lien</option>
            <option value="state">State Tax Lien</option>
            <option value="property">Property Tax Lien</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Release Reason</label>
          <select value={releaseReason} onChange={(e) => setReleaseReason(e.target.value as 'payment' | 'subordination' | 'discharge' | 'withdrawal' | 'expiration')} className="w-full border rounded p-2">
            <option value="payment">Full Payment</option>
            <option value="discharge">Property Discharge</option>
            <option value="subordination">Subordination</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="expiration">CSED Expiration</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Debt Remaining</label>
          <input type="number" value={taxDebtRemaining} onChange={(e) => setTaxDebtRemaining(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CSED Date</label>
          <input type="date" value={csedDate} onChange={(e) => setCsedDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Release Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={taxDebtPaid} onChange={(e) => setTaxDebtPaid(e.target.checked)} className="mr-2" />
              <span className="text-sm">Tax Debt Fully Paid</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={csedExpired} onChange={(e) => setCsedExpired(e.target.checked)} className="mr-2" />
              <span className="text-sm">CSED Expired</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={propertySold} onChange={(e) => setPropertySold(e.target.checked)} className="mr-2" />
              <span className="text-sm">Property Being Sold</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={withdrawalEligible} onChange={(e) => setWithdrawalEligible(e.target.checked)} className="mr-2" />
              <span className="text-sm">Withdrawal Eligible</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={installmentAgreement} onChange={(e) => setInstallmentAgreement(e.target.checked)} className="mr-2" />
              <span className="text-sm">Installment Agreement</span>
            </label>
          </div>
        </div>
        {propertySold && (
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sale Price</label>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Existing Mortgage</label>
              <input type="number" value={existingMortgage} onChange={(e) => setExistingMortgage(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
          </div>
        )}
      </div>

      <div className={`card mb-6 ${Number(result.releaseLikelihood) >= 80 ? 'bg-green-50 border border-green-200' : Number(result.releaseLikelihood) >= 50 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Release Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Lien Amount:</span><span className="font-bold ml-2">$ {result.lienAmount}</span></div>
          <div><span className="text-zinc-600">Lien Type:</span><span className="font-bold ml-2">{result.lienType}</span></div>
          <div><span className="text-zinc-600">Days Since Lien:</span><span className="font-bold ml-2">{result.lienAgeDays}</span></div>
          <div><span className="text-zinc-600">Release Likelihood:</span><span className={`font-bold ml-2 ${Number(result.releaseLikelihood) >= 80 ? 'text-green-700' : Number(result.releaseLikelihood) >= 50 ? 'text-orange-700' : 'text-red-700'}`}>{result.releaseLikelihood}%</span></div>
          <div><span className="text-zinc-600">Days to CSED:</span><span className="font-bold ml-2">{result.daysUntilCSED}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${Number(result.releaseLikelihood) >= 80 ? 'text-green-700' : Number(result.releaseLikelihood) >= 50 ? 'text-orange-700' : 'text-red-700'}`}>Best Option: {result.bestOption}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Release Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Eligibility</th>
                <th className="py-2 text-left">Timeline</th>
                <th className="py-2 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              {result.releaseOptions.map((o, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{o.type}</td>
                  <td className="py-1">{o.eligibility}</td>
                  <td className="py-1">{o.timeline}</td>
                  <td className="py-1">{o.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Documentation Required</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-left">Required</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.documentation.map((d, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{d.item}</td>
                  <td className="py-1">{d.required ? 'Yes' : 'Optional'}</td>
                  <td className="py-1">{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Release Process</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Step</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Timeframe</th>
              </tr>
            </thead>
            <tbody>
              {result.steps.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.step}</td>
                  <td className="py-1">{s.action}</td>
                  <td className="py-1">{s.timeframe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.releaseLikelihood) >= 80 ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Lien Release Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Full payment triggers automatic release</li>
          <li>Release within 30 days of payment</li>
          <li>Discharge removes lien from property</li>
          <li>Withdrawal removes from public record</li>
          <li>CSED expiration automatic release</li>
          <li>File release certificate locally</li>
          <li>Form 12277 for withdrawal request</li>
          <li>Form 14135 for discharge</li>
          <li>Fresh Start may allow withdrawal</li>
          <li>Consult professional for complex cases</li>
        </ul>
      </div>
    </div>
  )
}