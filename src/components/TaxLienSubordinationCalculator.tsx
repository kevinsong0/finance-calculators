'use client'

import { useState } from 'react'

export default function TaxLienSubordinationCalculator() {
  const [lienAmount, setLienAmount] = useState(50000)
  const [lienDate, setLienDate] = useState('2023-01-15')
  const [propertyValue, setPropertyValue] = useState(200000)
  const [existingMortgage, setExistingMortgage] = useState(150000)
  const [subordinationReason, setSubordinationReason] = useState<'refinance' | 'sale' | 'new_loan' | 'business'>('refinance')
  const [newLoanAmount, setNewLoanAmount] = useState(180000)
  const [lienPriority, setLienPriority] = useState<'first' | 'second'>('second')
  const [lenderRequesting, setLenderRequesting] = useState(false)
  const [irsConsent, setIrsConsent] = useState(false)

  const calculate = () => {
    // Tax Lien Subordination Calculator
    // Calculate subordination requirements, equity positions, and application process

    const lienDateObj = new Date(lienDate)
    const today = new Date()
    const lienAgeDays = Math.ceil((today.getTime() - lienDateObj.getTime()) / (1000 * 60 * 60 * 24))
    const lienAgeYears = lienAgeDays / 365

    // Calculate equity position
    const totalEncumbrances = lienAmount + existingMortgage
    const equityBefore = propertyValue - totalEncumbrances
    const equityRatio = equityBefore / propertyValue

    // After subordination
    let equityAfter = propertyValue - (existingMortgage + (subordinationReason === 'refinance' ? newLoanAmount : existingMortgage) + lienAmount)
    const equityRatioAfter = equityAfter / propertyValue

    // Subordination requirements
    const requirements: { requirement: string; status: string; details: string }[] = []

    requirements.push({
      requirement: 'IRS Application Form',
      status: 'Required',
      details: 'Submit Form 14134 (Application for Subordination)',
    })

    requirements.push({
      requirement: 'Subordination Fee',
      status: 'Required',
      details: `$${Math.max(100, lienAmount * 0.001).toFixed(0)} application fee (minimum $100, maximum varies)`,
    })

    requirements.push({
      requirement: 'Lender Request Letter',
      status: lenderRequesting ? 'Provided' : 'Needed',
      details: 'New lender must request subordination explaining why it benefits government',
    })

    requirements.push({
      requirement: 'Property Appraisal',
      status: 'Required',
      details: 'Current property value documentation',
    })

    requirements.push({
      requirement: 'Existing Lien Info',
      status: 'Required',
      details: 'Details of all existing liens and encumbrances',
    })

    requirements.push({
      requirement: 'Government Benefit',
      status: 'Critical',
      details: 'Must show subordination benefits the government (protects IRS interest)',
    })

    // Subordination conditions
    const conditions: { condition: string; met: string; notes: string }[] = []

    // Equity cushion test
    const equityCushion = equityRatioAfter * 100
    conditions.push({
      condition: 'Equity Cushion',
      met: equityCushion >= 20 ? 'Yes' : equityCushion >= 10 ? 'Partial' : 'No',
      notes: `${equityCushion.toFixed(1)}% equity cushion. IRS typically requires 20%+ for subordination`,
    })

    // Lien age
    conditions.push({
      condition: 'Lien Age',
      met: lienAgeYears >= 1 ? 'Yes' : 'No',
      notes: `${lienAgeYears.toFixed(1)} years. Older liens more likely to be subordinated`,
    })

    // Reason analysis
    let reasonStrength = ''
    switch (subordinationReason) {
      case 'refinance':
        reasonStrength = 'Strong - Refinance at better rate may improve taxpayer ability to pay IRS'
        conditions.push({
          condition: 'Refinance Benefit',
          met: newLoanAmount < existingMortgage ? 'Yes' : 'Partial',
          notes: newLoanAmount < existingMortgage ? 'Lower debt improves collection potential' : 'Evaluate rate savings',
        })
        break
      case 'sale':
        reasonStrength = 'Strong - Sale with subordination allows IRS to collect from proceeds'
        conditions.push({
          condition: 'Sale Proceeds',
          met: propertyValue > lienAmount + existingMortgage ? 'Yes' : 'No',
          notes: 'Sale must generate enough proceeds to pay IRS lien',
        })
        break
      case 'new_loan':
        reasonStrength = 'Moderate - New loan must clearly benefit government'
        conditions.push({
          condition: 'New Loan Purpose',
          met: 'Review',
          notes: 'Must demonstrate how new loan benefits IRS collection',
        })
        break
      case 'business':
        reasonStrength = 'Moderate - Business purpose must show collection benefit'
        conditions.push({
          condition: 'Business Benefit',
          met: 'Review',
          notes: 'Business loan that improves taxpayer income/cash flow',
        })
        break
    }

    conditions.push({
      condition: 'Reason Analysis',
      met: reasonStrength.includes('Strong') ? 'Strong' : reasonStrength.includes('Moderate') ? 'Moderate' : 'Weak',
      notes: reasonStrength,
    })

    // Calculate likelihood of approval
    let approvalLikelihood = 0
    let likelihoodDescription = ''

    if (equityCushion >= 30) {
      approvalLikelihood += 40
    } else if (equityCushion >= 20) {
      approvalLikelihood += 30
    } else if (equityCushion >= 10) {
      approvalLikelihood += 15
    }

    if (lienAgeYears >= 2) {
      approvalLikelihood += 20
    } else if (lienAgeYears >= 1) {
      approvalLikelihood += 10
    }

    if (subordinationReason === 'refinance' && newLoanAmount < existingMortgage) {
      approvalLikelihood += 20
    } else if (subordinationReason === 'sale' && propertyValue > lienAmount + existingMortgage) {
      approvalLikelihood += 20
    } else if (subordinationReason === 'refinance' || subordinationReason === 'sale') {
      approvalLikelihood += 10
    }

    if (lenderRequesting) {
      approvalLikelihood += 10
    }

    if (irsConsent) {
      approvalLikelihood = 100
    }

    if (approvalLikelihood >= 70) {
      likelihoodDescription = 'HIGH - Strong equity cushion and beneficial reason. Good approval prospects.'
    } else if (approvalLikelihood >= 50) {
      likelihoodDescription = 'MODERATE - Meets basic requirements. May need additional documentation.'
    } else if (approvalLikelihood >= 30) {
      likelihoodDescription = 'LOW - Limited equity cushion. Consider strengthening application.'
    } else {
      likelihoodDescription = 'VERY LOW - Insufficient equity or weak rationale. Unlikely to be approved.'
    }

    // Application steps
    const steps: { step: string; action: string; timeline: string }[] = []

    steps.push({
      step: '1. Prepare Application',
      action: 'Complete Form 14134 with all required information',
      timeline: '1-2 weeks',
    })

    steps.push({
      step: '2. Gather Documentation',
      action: 'Appraisal, lender letter, existing lien details, financial statements',
      timeline: '1-2 weeks',
    })

    steps.push({
      step: '3. Submit to IRS',
      action: 'Mail to IRS Centralized Lien Unit',
      timeline: 'Upon completion',
    })

    steps.push({
      step: '4. IRS Review',
      action: 'IRS evaluates government benefit and equity position',
      timeline: '30-60 days',
    })

    steps.push({
      step: '5. Decision',
      action: 'IRS issues approval or denial letter',
      timeline: 'After review',
    })

    steps.push({
      step: '6. If Approved',
      action: 'File subordination agreement with county recorder',
      timeline: 'Within 30 days',
    })

    steps.push({
      step: '7. If Denied',
      action: 'Request appeal or modify application with stronger rationale',
      timeline: '30 days from denial',
    })

    // Alternative options
    const alternatives: { option: string; description: string; when: string }[] = []

    alternatives.push({
      option: 'Lien Release',
      description: 'Pay full tax debt to obtain complete lien release',
      when: 'If debt can be paid',
    })

    alternatives.push({
      option: 'Lien Discharge',
      description: 'Remove lien from specific property (not entire debt)',
      when: 'If property being sold or transferred',
    })

    alternatives.push({
      option: 'Lien Withdrawal',
      description: 'IRS withdraws lien (removes from public record)',
      when: 'If lien filed incorrectly or OIC accepted',
    })

    alternatives.push({
      option: 'Payment Agreement',
      description: 'Installment agreement may help with lien release later',
      when: 'If can make regular payments',
    })

    alternatives.push({
      option: 'Offer in Compromise',
      description: 'Settle debt for less than full amount',
      when: 'If qualifies for OIC',
    })

    // Recommendation
    let recommendation = ''

    if (irsConsent) {
      recommendation = 'IRS has indicated consent for subordination. Proceed with formal application. Ensure all documentation complete. File subordination agreement promptly after approval.'
    } else if (approvalLikelihood >= 70) {
      recommendation = `Strong approval likelihood (${approvalLikelihood}%). ${equityCushion >= 25 ? 'Good equity cushion supports application.' : ''} ${subordinationReason === 'refinance' ? 'Refinance benefit to government clear.' : subordinationReason === 'sale' ? 'Sale proceeds will pay IRS.' : ''} Proceed with application with strong documentation.`
    } else if (approvalLikelihood >= 50) {
      recommendation = `Moderate approval likelihood (${approvalLikelihood}%). ${equityCushion < 20 ? 'Consider improving equity position or providing additional justification.' : ''} Strengthen lender request letter showing government benefit. Professional assistance may improve outcome.`
    } else {
      recommendation = `Low approval likelihood (${approvalLikelihood}%). ${equityCushion < 15 ? 'Insufficient equity cushion for typical approval.' : ''} Consider alternatives: lien discharge for sale, payment agreement, or Offer in Compromise. Professional consultation recommended.`
    }

    return {
      lienAmount: lienAmount.toFixed(0),
      lienDate,
      lienAgeDays,
      lienAgeYears: lienAgeYears.toFixed(1),
      propertyValue: propertyValue.toFixed(0),
      existingMortgage: existingMortgage.toFixed(0),
      newLoanAmount: newLoanAmount.toFixed(0),
      subordinationReason,
      lienPriority,
      lenderRequesting,
      irsConsent,
      equityBefore: equityBefore.toFixed(0),
      equityRatio: (equityRatio * 100).toFixed(1),
      equityAfter: equityAfter.toFixed(0),
      equityRatioAfter: (equityRatioAfter * 100).toFixed(1),
      requirements,
      conditions,
      approvalLikelihood: approvalLikelihood.toFixed(0),
      likelihoodDescription,
      steps,
      alternatives,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Lien Subordination Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate subordination requirements, equity position, and approval likelihood for IRS lien subordination.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">IRS Lien Amount</label>
          <input type="number" value={lienAmount} onChange={(e) => setLienAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lien Filed Date</label>
          <input type="date" value={lienDate} onChange={(e) => setLienDate(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Value</label>
          <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Existing Mortgage</label>
          <input type="number" value={existingMortgage} onChange={(e) => setExistingMortgage(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subordination Reason</label>
          <select value={subordinationReason} onChange={(e) => setSubordinationReason(e.target.value as 'refinance' | 'sale' | 'new_loan' | 'business')} className="w-full border rounded p-2">
            <option value="refinance">Refinance Existing Loan</option>
            <option value="sale">Property Sale</option>
            <option value="new_loan">New Loan Needed</option>
            <option value="business">Business Purpose</option>
          </select>
        </div>
        {(subordinationReason === 'refinance' || subordinationReason === 'new_loan') && (
          <div>
            <label className="block text-sm font-medium mb-1">New Loan Amount</label>
            <input type="number" value={newLoanAmount} onChange={(e) => setNewLoanAmount(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Current IRS Lien Priority</label>
          <select value={lienPriority} onChange={(e) => setLienPriority(e.target.value as 'first' | 'second')} className="w-full border rounded p-2">
            <option value="first">First Priority Lien</option>
            <option value="second">Second Priority Lien</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Application Circumstances</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={lenderRequesting} onChange={(e) => setLenderRequesting(e.target.checked)} className="mr-2" />
              <span className="text-sm">Lender Requesting Subordination</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={irsConsent} onChange={(e) => setIrsConsent(e.target.checked)} className="mr-2" />
              <span className="text-sm">IRS Has Indicated Consent</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.approvalLikelihood) >= 70 ? 'bg-green-50 border border-green-200' : Number(result.approvalLikelihood) >= 50 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Equity Position</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Lien Amount:</span><span className="font-bold ml-2">$ {result.lienAmount}</span></div>
          <div><span className="text-zinc-600">Property Value:</span><span className="font-bold ml-2">$ {result.propertyValue}</span></div>
          <div><span className="text-zinc-600">Existing Mortgage:</span><span className="font-bold ml-2">$ {result.existingMortgage}</span></div>
          <div><span className="text-zinc-600">Equity Before:</span><span className="font-bold ml-2">$ {result.equityBefore}</span></div>
          <div><span className="text-zinc-600">Equity Ratio:</span><span className={`font-bold ml-2 ${Number(result.equityRatioAfter) < 20 ? 'text-orange-700' : ''}`}>{result.equityRatio}%</span></div>
          <div><span className="text-zinc-600">Equity After:</span><span className="font-bold ml-2">$ {result.equityAfter}</span></div>
        </div>
        <div className="mt-2"><span className="text-zinc-600">Approval Likelihood:</span><span className={`font-bold ml-2 ${Number(result.approvalLikelihood) >= 70 ? 'text-green-700' : Number(result.approvalLikelihood) >= 50 ? 'text-orange-700' : 'text-red-700'}`}>{result.approvalLikelihood}%</span></div>
        <div className={`text-sm font-semibold mt-1 ${Number(result.approvalLikelihood) >= 70 ? 'text-green-700' : Number(result.approvalLikelihood) >= 50 ? 'text-orange-700' : 'text-red-700'}`}>{result.likelihoodDescription}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Subordination Requirements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Requirement</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {result.requirements.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.requirement}</td>
                  <td className="py-1">{r.status}</td>
                  <td className="py-1">{r.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Approval Conditions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Condition</th>
                <th className="py-2 text-left">Met</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.conditions.map((c, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{c.condition}</td>
                  <td className="py-1">{c.met}</td>
                  <td className="py-1">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Application Steps</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Step</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {result.steps.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.step}</td>
                  <td className="py-1">{s.action}</td>
                  <td className="py-1">{s.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Alternative Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Option</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-left">When to Use</th>
              </tr>
            </thead>
            <tbody>
              {result.alternatives.map((a, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{a.option}</td>
                  <td className="py-1">{a.description}</td>
                  <td className="py-1">{a.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${Number(result.approvalLikelihood) >= 70 ? 'bg-green-50 border border-green-200' : Number(result.approvalLikelihood) >= 50 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Lien Subordination Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Subordination moves IRS lien behind new lender</li>
          <li>Must benefit the government</li>
          <li>20%+ equity cushion typically required</li>
          <li>Use Form 14134 for application</li>
          <li>Application fee: $100 minimum</li>
          <li>IRS review takes 30-60 days</li>
          <li>Lender request letter essential</li>
          <li>Consider alternatives if unlikely</li>
          <li>Refinance or sale most common reasons</li>
          <li>Professional help recommended</li>
        </ul>
      </div>
    </div>
  )
}