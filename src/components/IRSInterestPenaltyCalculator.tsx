'use client'

import { useState } from 'react'

export default function IRSInterestPenaltyCalculator() {
  const [originalAmount, setOriginalAmount] = useState('')
  const [paymentDueDate, setPaymentDueDate] = useState('')
  const [actualPaymentDate, setActualPaymentDate] = useState('')
  const [reason, setReason] = useState('late_payment')
  const [extensionFiled, setExtensionFiled] = useState(false)
  const [taxYear, setTaxYear] = useState('2026')
  const [underpaymentAmount, setUnderpaymentAmount] = useState('')
  const [estimatedTaxPaid, setEstimatedTaxPaid] = useState('')
  const [totalTax, setTotalTax] = useState('')

  const calculate = () => {
    const amount = parseFloat(originalAmount) || 10000
    const year = parseInt(taxYear) || 2026
    const underpayment = parseFloat(underpaymentAmount) || amount
    const reasonCode = reason
    const hasExtension = extensionFiled
    const paid = parseFloat(estimatedTaxPaid) || 0
    const total = parseFloat(totalTax) || amount

    // IRS Interest Rates (2026 - quarterly adjusted)
    // Current rate approximately 8% (varies quarterly)
    const baseRate = 8 // Simplified for 2026 estimate

    // Calculate days late (simplified - assume 90 days late)
    const daysLate = 90

    // Daily interest factor
    const dailyRate = baseRate / 100 / 365

    // Interest calculation
    const interest = amount * dailyRate * daysLate

    // Failure-to-pay penalty (0.5% per month, max 25%)
    const ftpRate = 0.005 // 0.5% per month
    const monthsLate = Math.ceil(daysLate / 30)
    const ftpPenalty = amount * ftpRate * Math.min(monthsLate, 50) // Max 25% (50 months at 0.5%)

    // Failure-to-file penalty (5% per month, max 25%)
    // Reduced if failure-to-pay also applies (combined max 25% per month)
    let ftfPenalty = 0
    if (reasonCode === 'late_file' || reasonCode === 'no_file') {
      const ftfRate = 0.05 // 5% per month
      const ftpOffset = ftpRate // FTP reduces FTF
      const effectiveFtfRate = ftfRate - ftpOffset // Net 4.5% when both apply
      ftfPenalty = amount * effectiveFtfRate * Math.min(monthsLate, 5) // Max 25% after 5 months
    }

    // If extension filed, FTP still applies but FTF reduced
    if (hasExtension && reasonCode === 'late_file') {
      // Extension protects against FTF until extension deadline
      ftfPenalty = 0 // No FTF if extension filed and paid by extension deadline
    }

    // Total penalties
    const totalPenalties = ftpPenalty + ftfPenalty

    // Total due (original + interest + penalties)
    const totalDue = amount + interest + totalPenalties

    // Underpayment of estimated tax penalty
    // Form 2210 - if underpaid estimated taxes
    const requiredPayments = total * 0.9 // 90% of current year required
    const shortfall = Math.max(0, requiredPayments - paid)
    const underpaymentRate = 8 // Same as interest rate
    const underpaymentPenalty = shortfall * (underpaymentRate / 100) * 0.5 // Rough annual estimate

    // Penalty abatement possibilities
    const abatementReasons = [
      { reason: 'Reasonable cause', description: 'Documented circumstances beyond control' },
      { reason: 'First-time abatement', description: 'Clean compliance history (3 years)' },
      { reason: 'Statutory exception', description: 'Disaster area, military service, casualty' }
    ]

    // Compare to timely payment
    const timelyPayment = amount
    const additionalCost = totalDue - timelyPayment

    return {
      originalAmount: amount.toFixed(2),
      taxYear: year,
      daysLate: daysLate,
      monthsLate: monthsLate,
      baseRate: baseRate.toFixed(1),
      interest: interest.toFixed(2),
      ftpPenalty: ftpPenalty.toFixed(2),
      ftfPenalty: ftfPenalty.toFixed(2),
      totalPenalties: totalPenalties.toFixed(2),
      totalDue: totalDue.toFixed(2),
      additionalCost: additionalCost.toFixed(2),
      reason: reasonCode,
      extensionFiled: hasExtension,
      underpaymentAmount: underpayment.toFixed(2),
      estimatedTaxPaid: paid.toFixed(2),
      totalTax: total.toFixed(2),
      shortfall: shortfall.toFixed(2),
      underpaymentPenalty: underpaymentPenalty.toFixed(2),
      ftpRate: '0.5%/month',
      ftfRate: '5%/month',
      maxFtf: '25%',
      maxFtp: '25%',
      abatementReasons
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">IRS Interest & Penalty Calculator</h1>
      <p className="text-zinc-600">Calculate IRS failure-to-pay, failure-to-file penalties, and interest on late tax payments.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Reason for Penalty</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="late_payment">Late Payment (Failure-to-pay)</option>
              <option value="late_file">Late Filing + Late Payment</option>
              <option value="no_file">Did Not File (Failure-to-file)</option>
              <option value="underpayment">Underpayment of Estimated Tax</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Amount Owed</label>
            <input
              type="number"
              value={originalAmount}
              onChange={(e) => setOriginalAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter tax amount due"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          {reason !== 'underpayment' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Extension Filed?</label>
              <label className="flex items-center gap-2 bg-white rounded p-2">
                <input
                  type="checkbox"
                  checked={extensionFiled}
                  onChange={(e) => setExtensionFiled(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Filed Form 4868 extension (protects against FTF penalty)</span>
              </label>
            </div>
          )}
          {reason === 'underpayment' && (
            <>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Total Tax Liability</label>
                <input
                  type="number"
                  value={totalTax}
                  onChange={(e) => setTotalTax(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter total tax for year"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Estimated Tax Paid</label>
                <input
                  type="number"
                  value={estimatedTaxPaid}
                  onChange={(e) => setEstimatedTaxPaid(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter estimated payments made"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Penalty Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Tax Amount Owed</span>
            <span className="font-bold">$${result.originalAmount}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Days Late</span>
            <span className="font-bold">{result.daysLate} days</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Months Late</span>
            <span className="font-bold">{result.monthsLate} months</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">IRS Interest Rate ({result.taxYear})</span>
            <span className="font-bold">{result.baseRate}%</span>
          </div>
          <div className="bg-yellow-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Interest Accrued</span>
            <span className="font-bold text-yellow-600">$${result.interest}</span>
          </div>
          <div className="bg-red-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Failure-to-Pay ({result.ftpRate})</span>
            <span className="font-bold text-red-600">$${result.ftpPenalty}</span>
          </div>
          {parseFloat(result.ftfPenalty) > 0 && (
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Failure-to-File ({result.ftfRate})</span>
              <span className="font-bold text-red-600">$${result.ftfPenalty}</span>
            </div>
          )}
          <div className="bg-red-100 rounded p-3 flex justify-between border-t-2 border-red-300">
            <span className="font-medium">Total Penalties</span>
            <span className="font-bold text-red-600">$${result.totalPenalties}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Total Amount Due</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Original Tax</div>
            <div className="text-2xl font-bold">$${result.originalAmount}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Interest</div>
            <div className="text-2xl font-bold text-yellow-600">$${result.interest}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Penalties</div>
            <div className="text-2xl font-bold text-red-600">$${result.totalPenalties}</div>
          </div>
          <div className="bg-red-50 rounded p-4">
            <div className="text-sm text-zinc-500">Total Due</div>
            <div className="text-2xl font-bold text-red-600">$${result.totalDue}</div>
          </div>
        </div>
      </div>

      {result.extensionFiled && result.reason === 'late_file' && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Extension Protection</h3>
          <div className="text-sm text-green-600">
            Extension filed - Failure-to-file penalty waived until extension deadline (Oct 15). Failure-to-pay penalty (0.5%/month) still applies from April 15. Interest accrues from original deadline. Pay as soon as possible to minimize interest.
          </div>
        </div>
      )}

      {parseFloat(result.ftfPenalty) > 0 && !result.extensionFiled && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Failure-to-File Penalty Warning</h3>
          <div className="text-sm text-red-600">
            No extension filed - 5%/month FTF penalty applies. Combined with FTP, total 4.5%/month (FTF 5% - FTP 0.5% offset). Max 25% after 5 months. Even if can't pay, FILE extension to avoid FTF penalty. FTF is much larger than FTP.
          </div>
        </div>
      )}

      {result.reason === 'underpayment' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Underpayment of Estimated Tax</h3>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Total Tax Liability</span>
              <span className="font-bold">$${result.totalTax}</span>
            </div>
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">Estimated Tax Paid</span>
              <span className="font-bold">$${result.estimatedTaxPaid}</span>
            </div>
            <div className="bg-yellow-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Shortfall (90% required)</span>
              <span className="font-bold text-yellow-600">$${result.shortfall}</span>
            </div>
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Underpayment Penalty (Form 2210)</span>
              <span className="font-bold text-red-600">$${result.underpaymentPenalty}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Penalty Rates Summary</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Interest</strong>
            <div className="text-zinc-500">{result.baseRate}% annually</div>
            <div className="text-zinc-500">Adjusted quarterly</div>
            <div className="text-zinc-500">Compounded daily</div>
          </div>
          <div className="bg-red-50 rounded p-3">
            <strong>Failure-to-Pay</strong>
            <div className="text-zinc-500">{result.ftpRate}</div>
            <div className="text-zinc-500">Max {result.maxFtp}</div>
            <div className="text-zinc-500">Applies from deadline</div>
          </div>
          <div className="bg-red-100 rounded p-3">
            <strong>Failure-to-File</strong>
            <div className="text-zinc-500">{result.ftfRate}</div>
            <div className="text-zinc-500">Max {result.maxFtf}</div>
            <div className="text-zinc-500">Much larger - file extension!</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Penalty Abatement Options</h3>
        <div className="space-y-2 text-xs">
          {result.abatementReasons.map((a, idx) => (
            <div key={idx} className="bg-white rounded p-3">
              <strong>{a.reason}</strong>
              <div className="text-zinc-500">{a.description}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-green-600 mt-2">
          Request abatement with IRS. First-time abatement often approved for clean 3-year history. Reasonable cause: illness, disaster, death in family. Document circumstances. Call IRS or write letter explaining situation.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Advice</h3>
        <div className="text-xs text-zinc-600">
          Even if can't pay, FILE tax return or extension by deadline to avoid larger FTF penalty. Pay as much as possible to reduce penalties. Payment plans available - apply via Form 9465 or online. Interest continues even with payment plan. File Form 2210 for estimated tax penalty calculation. Penalty relief for reasonable cause - document circumstances.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payment Options</h3>
        <div className="text-xs text-zinc-600">
          Full payment: Stops interest/penalty growth. Short-term extension: Up to 180 days, $89 fee. Installment agreement: Monthly payments, $31-225 setup fee. Offer in Compromise: Settle for less if can't pay full. Currently not collectible: Temporary suspension. Apply online at IRS.gov or call.
        </div>
      </div>
    </main>
  )
}