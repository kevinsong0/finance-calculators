'use client'

import { useState } from 'react'

export default function TaxFreshStartCalculator() {
  const [taxDebt, setTaxDebt] = useState(25000)
  const [incomeMonthly, setIncomeMonthly] = useState(4000)
  const [expensesMonthly, setExpensesMonthly] = useState(3500)
  const [assetsValue, setAssetsValue] = useState(10000)
  const [liensFiled, setLiensFiled] = useState(true)
  const [lienAmount, setLienAmount] = useState(25000)
  const [filingCompliant, setFilingCompliant] = useState(true)
  const [currentYear, setCurrentYear] = useState(2022)
  const [installmentEligible, setInstallmentEligible] = useState(true)
  const [oicEligible, setOicEligible] = useState(false)
  const [cncEligible, setCncEligible] = useState(false)
  const [employed, setEmployed] = useState(true)
  const [selfEmployed, setSelfEmployed] = useState(false)

  const calculate = () => {
    // Tax Fresh Start Calculator
    // Calculate Fresh Start Initiative eligibility and options

    const disposableIncome = incomeMonthly - expensesMonthly
    const totalDebt = taxDebt

    // Fresh Start programs eligibility
    const programs: { program: string; eligibility: string; benefit: string; requirements: string }[] = []

    // Fresh Start Lien Withdrawal
    const lienWithdrawalEligible = taxDebt <= 25000 && installmentEligible && filingCompliant
    programs.push({
      program: 'Fresh Start Lien Withdrawal',
      eligibility: lienWithdrawalEligible ? 'Eligible' : 'Not Eligible',
      benefit: lienWithdrawalEligible ? 'Lien withdrawn from public record after IA acceptance' : 'Debt must be under $25,000 with IA',
      requirements: 'Tax debt ≤$25,000, IA accepted, filing compliant, current payments',
    })

    // Fresh Start Installment Agreement
    const streamlinedIAEligible = taxDebt <= 50000 && filingCompliant && employed
    programs.push({
      program: 'Fresh Start Streamlined IA',
      eligibility: streamlinedIAEligible ? 'Eligible' : 'Not Eligible',
      benefit: streamlinedIAEligible ? 'IA up to 72 months, no detailed financials required' : 'Debt must be ≤$50,000 with compliance',
      requirements: 'Tax debt ≤$50,000, filing compliant, direct debit payment',
    })

    // Fresh Start OIC
    const freshStartOIC = taxDebt <= 50000 && filingCompliant && disposableIncome < 200
    programs.push({
      program: 'Fresh Start Offer in Compromise',
      eligibility: freshStartOIC ? 'Eligible' : oicEligible ? 'Standard OIC' : 'Not Eligible',
      benefit: freshStartOIC ? 'Simplified OIC process, faster acceptance' : 'Standard OIC process if eligible',
      requirements: 'Low income, filing compliant, ability determination',
    })

    // In-Business Trust Fund Express IA
    const trustFundExpressEligible = selfEmployed && taxDebt <= 25000 && filingCompliant
    programs.push({
      program: 'In-Business Trust Fund Express IA',
      eligibility: trustFundExpressEligible ? 'Eligible' : 'Not Eligible',
      benefit: trustFundExpressEligible ? 'Express IA for business trust fund penalties' : 'Business with trust fund debt ≤$25,000',
      requirements: 'Business taxpayer, trust fund debt ≤$25,000, compliance',
    })

    // Calculate monthly payment options
    const paymentOptions: { type: string; monthlyPayment: string; duration: string; totalPaid: string; lienStatus: string }[] = []

    // Streamlined IA
    const streamlinedPayment = Math.ceil(taxDebt / 72)
    paymentOptions.push({
      type: 'Streamlined IA (72 months)',
      monthlyPayment: `$${streamlinedPayment.toFixed(0)}`,
      duration: '72 months',
      totalPaid: `$${(streamlinedPayment * 72).toFixed(0)} + interest`,
      lienStatus: taxDebt <= 25000 ? 'Withdrawn after acceptance' : 'Lien filed if >$10,000',
    })

    // Short-term IA (120 days)
    const shortTermPayment = Math.ceil(taxDebt / 4)
    paymentOptions.push({
      type: 'Short-term IA (120 days)',
      monthlyPayment: `$${(shortTermPayment * 2).toFixed(0)}`,
      duration: '4 months',
      totalPaid: `$${taxDebt.toFixed(0)} + minimal interest`,
      lienStatus: taxDebt > 10000 ? 'Lien may be filed' : 'No lien typically',
    })

    // Regular IA
    const regularPayment = Math.max(disposableIncome, 100)
    const regularMonths = Math.ceil(taxDebt / regularPayment)
    paymentOptions.push({
      type: 'Regular IA (based on income)',
      monthlyPayment: `$${regularPayment.toFixed(0)}`,
      duration: `${regularMonths} months`,
      totalPaid: `$${(regularPayment * regularMonths).toFixed(0)} + interest`,
      lienStatus: taxDebt > 10000 ? 'Lien likely filed' : 'Lien possible',
    })

    // Fresh Start benefits summary
    const benefits: { benefit: string; applicable: boolean; details: string }[] = []

    benefits.push({
      benefit: 'Lien Threshold Increase',
      applicable: taxDebt <= 25000,
      details: taxDebt <= 25000 ? 'IRS generally does NOT file lien for debts under $25,000 under Fresh Start' : 'Debt exceeds $25,000 threshold',
    })

    benefits.push({
      benefit: 'Streamlined IA Process',
      applicable: streamlinedIAEligible,
      details: streamlinedIAEligible ? 'No detailed financial statement required for IA' : 'Requires Form 433-A/B if not streamlined',
    })

    benefits.push({
      benefit: 'Lien Withdrawal on IA',
      applicable: lienWithdrawalEligible,
      details: lienWithdrawalEligible ? 'Lien withdrawn after IA acceptance, not just released' : 'Lien release only, remains on public record',
    })

    benefits.push({
      benefit: 'Direct Debit Payment',
      applicable: employed || incomeMonthly > 0,
      details: 'Automatic payments from bank account, reduces default risk',
    })

    benefits.push({
      benefit: 'OIC Flexibility',
      applicable: freshStartOIC || oicEligible,
      details: freshStartOIC ? 'Fresh Start OIC has simplified requirements' : oicEligible ? 'Standard OIC available' : 'OIC not currently available',
    })

    // Compliance checklist
    const compliance: { item: string; required: boolean; status: string }[] = []

    compliance.push({
      item: 'All returns filed',
      required: true,
      status: filingCompliant ? 'Complete' : 'Missing returns - file immediately',
    })

    compliance.push({
      item: 'Current year estimated payments',
      required: true,
      status: filingCompliant ? 'Required for IA acceptance' : 'Must make current year payments',
    })

    compliance.push({
      item: 'Direct debit authorization',
      required: streamlinedIAEligible,
      status: streamlinedIAEligible ? 'Required for Streamlined IA' : 'Optional for regular IA',
    })

    compliance.push({
      item: 'Financial statement',
      required: !streamlinedIAEligible && taxDebt > 50000,
      status: streamlinedIAEligible ? 'Not required for Streamlined' : 'Form 433-A/B needed',
    })

    compliance.push({
      item: 'Business returns filed',
      required: selfEmployed,
      status: selfEmployed ? 'All business returns required' : 'Not applicable',
    })

    // Calculate Fresh Start score
    let freshStartScore = 0

    if (taxDebt <= 25000) freshStartScore += 30
    else if (taxDebt <= 50000) freshStartScore += 20

    if (filingCompliant) freshStartScore += 25

    if (streamlinedIAEligible) freshStartScore += 20

    if (lienWithdrawalEligible) freshStartScore += 15

    if (employed && incomeMonthly > expensesMonthly) freshStartScore += 10

    // Recommendation
    let recommendation = ''

    if (freshStartScore >= 75) {
      recommendation = `Excellent Fresh Start eligibility. Tax debt $${taxDebt.toFixed(0)} ${taxDebt <= 25000 ? 'under lien threshold - lien likely NOT filed' : taxDebt <= 50000 ? 'qualifies for Streamlined IA' : 'requires financial statement'}. Streamlined IA available with $${streamlinedPayment.toFixed(0)}/mo for 72 months. ${lienWithdrawalEligible ? 'Lien withdrawn after IA acceptance - best outcome.' : 'Apply immediately. Direct debit required.'}`
    } else if (freshStartScore >= 50) {
      recommendation = `Good Fresh Start eligibility. ${streamlinedIAEligible ? 'Streamlined IA available - no detailed financials needed.' : 'Regular IA required - submit Form 433-A/B.'} ${filingCompliant ? 'Compliance good.' : 'File missing returns first - compliance required for all Fresh Start programs.'} Monthly payment: $${regularPayment.toFixed(0)}. Apply online or call IRS.`
    } else if (freshStartScore >= 25) {
      recommendation = `Partial Fresh Start eligibility. ${!filingCompliant ? 'CRITICAL: File all missing returns before applying for any program.' : ''} ${taxDebt > 50000 ? 'Debt exceeds Fresh Start thresholds - standard IA or OIC may apply.' : 'Fresh Start programs potentially available once compliant.'} Consider professional assistance for complex situation.`
    } else {
      recommendation = `Limited Fresh Start eligibility. ${!filingCompliant ? 'File all missing returns immediately - compliance is essential.' : ''} ${taxDebt > 50000 ? 'High debt requires detailed financial analysis.' : 'Other options may be available.'} Consider Currently Not Collectible if hardship, or standard OIC. Professional consultation recommended.`
    }

    return {
      taxDebt: taxDebt.toFixed(0),
      incomeMonthly: incomeMonthly.toFixed(0),
      expensesMonthly: expensesMonthly.toFixed(0),
      disposableIncome: disposableIncome.toFixed(0),
      liensFiled,
      lienAmount: lienAmount.toFixed(0),
      filingCompliant,
      currentYear,
      employed,
      selfEmployed,
      programs,
      paymentOptions,
      benefits,
      compliance,
      freshStartScore,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Fresh Start Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate eligibility for IRS Fresh Start Initiative programs: Streamlined IA, lien withdrawal, and OIC options.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tax Debt Amount</label>
          <input type="number" value={taxDebt} onChange={(e) => setTaxDebt(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">Assets Value</label>
          <input type="number" value={assetsValue} onChange={(e) => setAssetsValue(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Taxpayer Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={liensFiled} onChange={(e) => setLiensFiled(e.target.checked)} className="mr-2" />
              <span className="text-sm">IRS Lien Filed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={filingCompliant} onChange={(e) => setFilingCompliant(e.target.checked)} className="mr-2" />
              <span className="text-sm">Filing Compliant</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={employed} onChange={(e) => setEmployed(e.target.checked)} className="mr-2" />
              <span className="text-sm">Employed (W-2)</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={selfEmployed} onChange={(e) => setSelfEmployed(e.target.checked)} className="mr-2" />
              <span className="text-sm">Self-Employed</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={installmentEligible} onChange={(e) => setInstallmentEligible(e.target.checked)} className="mr-2" />
              <span className="text-sm">Installment Eligible</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={oicEligible} onChange={(e) => setOicEligible(e.target.checked)} className="mr-2" />
              <span className="text-sm">OIC Eligible</span>
            </label>
          </div>
        </div>
        {liensFiled && (
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Lien Amount</label>
            <input type="number" value={lienAmount} onChange={(e) => setLienAmount(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className={`card mb-6 ${result.freshStartScore >= 75 ? 'bg-green-50 border border-green-200' : result.freshStartScore >= 50 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Fresh Start Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax Debt:</span><span className="font-bold ml-2">$ {result.taxDebt}</span></div>
          <div><span className="text-zinc-600">Disposable Income:</span><span className="font-bold ml-2">$ {result.disposableIncome}/mo</span></div>
          <div><span className="text-zinc-600">Fresh Start Score:</span><span className={`font-bold ml-2 ${result.freshStartScore >= 75 ? 'text-green-700' : result.freshStartScore >= 50 ? 'text-orange-700' : 'text-red-700'}`}>{result.freshStartScore}/100</span></div>
          <div><span className="text-zinc-600">Compliant:</span><span className={`font-bold ml-2 ${result.filingCompliant ? 'text-green-700' : 'text-red-700'}`}>{result.filingCompliant ? 'Yes' : 'No'}</span></div>
          <div><span className="text-zinc-600">Lien Status:</span><span className="font-bold ml-2">{Number(result.taxDebt) <= 25000 ? 'Under Threshold' : result.liensFiled ? 'Filed' : 'Not Filed'}</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.freshStartScore >= 75 ? 'text-green-700' : result.freshStartScore >= 50 ? 'text-orange-700' : 'text-red-700'}`}>
          {result.freshStartScore >= 75 ? 'Excellent eligibility - multiple Fresh Start options' : result.freshStartScore >= 50 ? 'Good eligibility - Streamlined IA likely' : 'Limited eligibility - improve compliance first'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Fresh Start Programs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Program</th>
                <th className="py-2 text-left">Eligibility</th>
                <th className="py-2 text-left">Benefit</th>
              </tr>
            </thead>
            <tbody>
              {result.programs.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.program}</td>
                  <td className="py-1">{p.eligibility}</td>
                  <td className="py-1">{p.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Monthly</th>
                <th className="py-2 text-left">Duration</th>
                <th className="py-2 text-left">Lien Status</th>
              </tr>
            </thead>
            <tbody>
              {result.paymentOptions.map((p, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{p.type}</td>
                  <td className="py-1">{p.monthlyPayment}</td>
                  <td className="py-1">{p.duration}</td>
                  <td className="py-1">{p.lienStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Fresh Start Benefits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Benefit</th>
                <th className="py-2 text-left">Applicable</th>
                <th className="py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {result.benefits.map((b, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{b.benefit}</td>
                  <td className="py-1"><span className={b.applicable ? 'text-green-700' : 'text-zinc-500'}>{b.applicable ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{b.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Compliance Checklist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-left">Required</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.compliance.map((c, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{c.item}</td>
                  <td className="py-1">{c.required ? 'Yes' : 'Optional'}</td>
                  <td className="py-1">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.freshStartScore >= 75 ? 'bg-green-50 border border-green-200' : result.filingCompliant ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Fresh Start Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Lien threshold: $25,000 (not filed below)</li>
          <li>Streamlined IA: up to $50,000 debt</li>
          <li>72-month payment term available</li>
          <li>No financial statement for Streamlined</li>
          <li>Direct debit required for IA</li>
          <li>Lien withdrawal under $25,000 IA</li>
          <li>Compliance essential for all programs</li>
          <li>File all returns before applying</li>
          <li>Current year estimated payments</li>
          <li>Apply online at IRS.gov</li>
        </ul>
      </div>
    </div>
  )
}