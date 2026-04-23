'use client'

import { useState } from 'react'

export default function TaxRecordkeepingCalculator() {
  const [recordType, setRecordType] = useState<'income' | 'expense' | 'asset' | 'deduction' | 'business'>('income')
  const [taxYear, setTaxYear] = useState(2022)
  const [auditStatus, setAuditStatus] = useState<'not_audited' | 'under_audit' | 'completed'>('not_audited')
  const [electronicRecords, setElectronicRecords] = useState(true)
  const [paperRecords, setPaperRecords] = useState(true)
  const [recordsOrganized, setRecordsOrganized] = useState(true)
  const [yearsAvailable, setYearsAvailable] = useState(7)
  const [missingRecords, setMissingRecords] = useState(0)
  const [reconstructedRecords, setReconstructedRecords] = useState(0)
  const [totalRecords, setTotalRecords] = useState(100)
  const [backupCopies, setBackupCopies] = useState(true)
  const [accessibleLocation, setAccessibleLocation] = useState(true)
  const [contemporaneous, setContemporaneous] = useState(80)

  const calculate = () => {
    // Tax Recordkeeping Calculator
    // Calculate recordkeeping compliance, retention periods, and audit readiness

    const recordCompleteness = ((totalRecords - missingRecords - reconstructedRecords) / totalRecords) * 100

    // Retention requirements by type
    const retention: { recordType: string; period: string; reason: string; status: string }[] = []

    retention.push({
      recordType: 'Tax Returns',
      period: 'Permanently',
      reason: 'Essential for future reference, amendments',
      status: yearsAvailable >= 7 ? 'Sufficient' : 'Below minimum',
    })

    retention.push({
      recordType: 'Supporting Documents',
      period: '7 years from filing',
      reason: 'IRS audit period up to 6 years for substantial understatement',
      status: yearsAvailable >= 7 ? 'Compliant' : yearsAvailable >= 3 ? 'Partial' : 'Non-compliant',
    })

    retention.push({
      recordType: 'Income Records (W-2, 1099)',
      period: '7 years',
      reason: 'Verify income for audit defense',
      status: yearsAvailable >= 7 ? 'Complete' : 'May need',
    })

    retention.push({
      recordType: 'Expense Documentation',
      period: '7 years',
      reason: 'Support deductions claimed',
      status: yearsAvailable >= 7 ? 'Complete' : 'Incomplete',
    })

    retention.push({
      recordType: 'Business Records',
      period: '7+ years',
      reason: 'Schedule C, asset basis, depreciation',
      status: yearsAvailable >= 7 ? 'Good' : 'Enhance retention',
    })

    retention.push({
      recordType: 'Asset/Property Records',
      period: 'Until 7 years after sale/disposal',
      reason: 'Basis, improvements, sale documentation',
      status: yearsAvailable >= 7 ? 'Maintained' : 'Keep longer',
    })

    retention.push({
      recordType: 'Employment Tax Records',
      period: '4 years after tax due or paid',
      reason: 'Payroll, withholding, employment',
      status: yearsAvailable >= 4 ? 'Compliant' : 'Extend retention',
    })

    retention.push({
      recordType: 'Investment Records',
      period: 'Until 7 years after sale',
      reason: 'Purchase/sale basis, dividends, splits',
      status: yearsAvailable >= 7 ? 'Complete' : 'Continue retention',
    })

    // Compliance checklist
    const compliance: { item: string; required: boolean; met: boolean; importance: string }[] = []

    compliance.push({
      item: 'Electronic Records Maintained',
      required: true,
      met: electronicRecords,
      importance: 'Critical',
    })

    compliance.push({
      item: 'Paper Backup Available',
      required: recordType === 'business' || auditStatus === 'under_audit',
      met: paperRecords,
      importance: 'High',
    })

    compliance.push({
      item: 'Records Organized by Year',
      required: true,
      met: recordsOrganized,
      importance: 'Critical',
    })

    compliance.push({
      item: '7-Year Retention Met',
      required: true,
      met: yearsAvailable >= 7,
      importance: 'Critical',
    })

    compliance.push({
      item: 'Backup Copies Available',
      required: true,
      met: backupCopies,
      importance: 'High',
    })

    compliance.push({
      item: 'Accessible Storage Location',
      required: true,
      met: accessibleLocation,
      importance: 'High',
    })

    compliance.push({
      item: 'Contemporaneous Records',
      required: recordType === 'business' || recordType === 'expense',
      met: contemporaneous >= 80,
      importance: 'High',
    })

    compliance.push({
      item: 'No Missing Records',
      required: true,
      met: missingRecords === 0,
      importance: 'Critical',
    })

    compliance.push({
      item: 'No Reconstructed Records',
      required: auditStatus !== 'under_audit',
      met: reconstructedRecords === 0,
      importance: 'High',
    })

    // Recordkeeping quality score
    let qualityScore = 0

    if (electronicRecords) qualityScore += 15
    if (paperRecords) qualityScore += 10
    if (recordsOrganized) qualityScore += 20
    if (yearsAvailable >= 7) qualityScore += 25
    if (backupCopies) qualityScore += 10
    if (accessibleLocation) qualityScore += 10
    if (contemporaneous >= 80) qualityScore += 15
    if (missingRecords === 0) qualityScore += 15
    if (reconstructedRecords === 0) qualityScore += 10

    // Deduct for deficiencies
    if (missingRecords > 0) qualityScore -= Math.min(20, missingRecords * 2)
    if (reconstructedRecords > 0) qualityScore -= Math.min(15, reconstructedRecords * 3)
    if (yearsAvailable < 3) qualityScore -= 20
    if (!backupCopies) qualityScore -= 15

    qualityScore = Math.max(0, Math.min(100, qualityScore))

    // Audit readiness assessment
    const readiness: { aspect: string; ready: boolean; notes: string }[] = []

    readiness.push({
      aspect: 'Income Verification',
      ready: recordCompleteness >= 90,
      notes: recordCompleteness >= 90 ? 'Income records complete' : `${missingRecords} records missing`,
    })

    readiness.push({
      aspect: 'Expense Substantiation',
      ready: contemporaneous >= 70 && missingRecords === 0,
      notes: contemporaneous >= 70 ? 'Good contemporaneous records' : 'Records reconstructed - less reliable',
    })

    readiness.push({
      aspect: 'Audit Response Speed',
      ready: accessibleLocation && recordsOrganized,
      notes: accessibleLocation && recordsOrganized ? 'Quick access to all records' : 'Record retrieval may be slow',
    })

    readiness.push({
      aspect: 'Backup Protection',
      ready: backupCopies,
      notes: backupCopies ? 'Backup copies available' : 'Single copy risk - create backup',
    })

    readiness.push({
      aspect: 'Retention Compliance',
      ready: yearsAvailable >= 7,
      notes: yearsAvailable >= 7 ? '7-year retention met' : `${yearsAvailable} years only - extend retention`,
    })

    // Audit scenarios
    const scenarios: { scenario: string; preparation: string; risk: string }[] = []

    scenarios.push({
      scenario: 'Correspondence Audit',
      preparation: qualityScore >= 80 ? 'Ready - can respond quickly with documentation' : qualityScore >= 60 ? 'Partially ready - may need to gather records' : 'Not ready - significant gaps',
      risk: qualityScore >= 80 ? 'Low' : qualityScore >= 60 ? 'Moderate' : 'High',
    })

    scenarios.push({
      scenario: 'Office Audit',
      preparation: recordsOrganized && accessibleLocation ? 'Ready - organized records portable' : 'Not ready - disorganized records',
      risk: recordsOrganized ? 'Low' : 'Moderate',
    })

    scenarios.push({
      scenario: 'Field Audit',
      preparation: qualityScore >= 70 && contemporaneous >= 70 ? 'Ready - comprehensive documentation' : 'Partial - may struggle with complex review',
      risk: qualityScore >= 70 ? 'Low' : qualityScore >= 50 ? 'Moderate' : 'High',
    })

    scenarios.push({
      scenario: 'Business Audit',
      preparation: contemporaneous >= 80 && reconstructedRecords === 0 ? 'Ready - contemporaneous business records' : 'At risk - reconstructed or incomplete',
      risk: contemporaneous >= 80 ? 'Low' : 'High',
    })

    // Recommendations
    const recommendations: { action: string; priority: string; benefit: string }[] = []

    if (yearsAvailable < 7) {
      recommendations.push({
        action: 'Extend record retention to 7+ years',
        priority: 'High',
        benefit: 'Meet IRS audit window requirements',
      })
    }

    if (!backupCopies) {
      recommendations.push({
        action: 'Create backup copies of all records',
        priority: 'High',
        benefit: 'Protect against loss, ensure continuity',
      })
    }

    if (missingRecords > 0) {
      recommendations.push({
        action: `Obtain or reconstruct ${missingRecords} missing records`,
        priority: 'Critical',
        benefit: 'Complete documentation for audit defense',
      })
    }

    if (!recordsOrganized) {
      recommendations.push({
        action: 'Organize records by year and category',
        priority: 'High',
        benefit: 'Quick retrieval for audit response',
      })
    }

    if (contemporaneous < 80) {
      recommendations.push({
        action: 'Create contemporaneous record system',
        priority: 'High',
        benefit: 'Stronger substantiation for expenses',
      })
    }

    if (!accessibleLocation) {
      recommendations.push({
        action: 'Store records in accessible location',
        priority: 'Medium',
        benefit: 'Fast response to IRS requests',
      })
    }

    if (recommendations.length === 0) {
      recommendations.push({
        action: 'Continue current recordkeeping practices',
        priority: 'Ongoing',
        benefit: 'Maintain compliance',
      })
    }

    // Final recommendation
    let recommendation = ''

    if (qualityScore >= 90) {
      recommendation = `Excellent recordkeeping compliance. Score: ${qualityScore}/100. ${electronicRecords ? 'Electronic records maintained. ' : ''}${paperRecords ? 'Paper backup available. ' : ''}${yearsAvailable >= 7 ? '7-year retention met. ' : ''}${backupCopies ? 'Backup copies protected. ' : ''}Audit ready. Maintain current practices. Organized, accessible, complete records.`
    } else if (qualityScore >= 70) {
      recommendation = `Good recordkeeping with minor gaps. Score: ${qualityScore}/100. ${!backupCopies ? 'Create backup copies. ' : ''}${yearsAvailable < 7 ? 'Extend retention to 7 years. ' : ''}${missingRecords > 0 ? `Address ${missingRecords} missing records. ` : ''}Address gaps to improve audit readiness. Organize records systematically. Create contemporaneous log for ongoing records.`
    } else if (qualityScore >= 50) {
      recommendation = `Moderate recordkeeping compliance. Score: ${qualityScore}/100. Several deficiencies need attention. ${missingRecords > 0 ? `${missingRecords} records missing. ` : ''}${reconstructedRecords > 0 ? `${reconstructedRecords} reconstructed records - less reliable. ` : ''}${yearsAvailable < 7 ? 'Retention below 7 years. ' : ''}Immediate action: organize records, create backups, address gaps. Audit response would be difficult. Professional assistance may help.`
    } else {
      recommendation = `Poor recordkeeping compliance. Score: ${qualityScore}/100. Critical deficiencies present. ${missingRecords > 0 ? `${missingRecords} records missing. ` : ''}${yearsAvailable < 3 ? 'Very limited retention. ' : ''}${!recordsOrganized ? 'Records disorganized. ' : ''}CRITICAL: organize records immediately, obtain missing documents, create backups, extend retention. Audit would be problematic. Professional recordkeeping assistance recommended.`
    }

    return {
      recordType,
      taxYear,
      auditStatus,
      electronicRecords,
      paperRecords,
      recordsOrganized,
      yearsAvailable,
      missingRecords,
      reconstructedRecords,
      totalRecords,
      backupCopies,
      accessibleLocation,
      contemporaneous,
      recordCompleteness: recordCompleteness.toFixed(0),
      retention,
      compliance,
      qualityScore,
      readiness,
      scenarios,
      recommendations,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Recordkeeping Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate recordkeeping compliance, retention periods, and audit readiness assessment.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Record Type Focus</label>
          <select value={recordType} onChange={(e) => setRecordType(e.target.value as 'income' | 'expense' | 'asset' | 'deduction' | 'business')} className="w-full border rounded p-2">
            <option value="income">Income Records</option>
            <option value="expense">Expense Records</option>
            <option value="asset">Asset/Property Records</option>
            <option value="deduction">Deduction Records</option>
            <option value="business">Business Records</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Year</label>
          <input type="number" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Audit Status</label>
          <select value={auditStatus} onChange={(e) => setAuditStatus(e.target.value as 'not_audited' | 'under_audit' | 'completed')} className="w-full border rounded p-2">
            <option value="not_audited">Not Under Audit</option>
            <option value="under_audit">Currently Under Audit</option>
            <option value="completed">Audit Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Years Records Available</label>
          <input type="number" value={yearsAvailable} onChange={(e) => setYearsAvailable(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Records</label>
          <input type="number" value={totalRecords} onChange={(e) => setTotalRecords(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Missing Records</label>
          <input type="number" value={missingRecords} onChange={(e) => setMissingRecords(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reconstructed Records</label>
          <input type="number" value={reconstructedRecords} onChange={(e) => setReconstructedRecords(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contemporaneous %</label>
          <input type="number" value={contemporaneous} onChange={(e) => setContemporaneous(Number(e.target.value))} min="0" max="100" className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recordkeeping Practices</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={electronicRecords} onChange={(e) => setElectronicRecords(e.target.checked)} className="mr-2" />
              <span className="text-sm">Electronic Records</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={paperRecords} onChange={(e) => setPaperRecords(e.target.checked)} className="mr-2" />
              <span className="text-sm">Paper Records</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={recordsOrganized} onChange={(e) => setRecordsOrganized(e.target.checked)} className="mr-2" />
              <span className="text-sm">Records Organized</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={backupCopies} onChange={(e) => setBackupCopies(e.target.checked)} className="mr-2" />
              <span className="text-sm">Backup Copies</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" checked={accessibleLocation} onChange={(e) => setAccessibleLocation(e.target.checked)} className="mr-2" />
              <span className="text-sm">Accessible Location</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card mb-6 ${result.qualityScore >= 90 ? 'bg-green-50 border border-green-200' : result.qualityScore >= 70 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recordkeeping Quality</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Quality Score:</span><span className={`font-bold ml-2 ${result.qualityScore >= 90 ? 'text-green-700' : result.qualityScore >= 70 ? 'text-orange-700' : 'text-red-700'}`}>{result.qualityScore}/100</span></div>
          <div><span className="text-zinc-600">Completeness:</span><span className={`font-bold ml-2 ${Number(result.recordCompleteness) >= 90 ? 'text-green-700' : Number(result.recordCompleteness) >= 70 ? 'text-orange-700' : 'text-red-700'}`}>{result.recordCompleteness}%</span></div>
          <div><span className="text-zinc-600">Years Retained:</span><span className={`font-bold ml-2 ${result.yearsAvailable >= 7 ? 'text-green-700' : 'text-red-700'}`}>{result.yearsAvailable}</span></div>
          <div><span className="text-zinc-600">Missing:</span><span className={`font-bold ml-2 ${result.missingRecords > 0 ? 'text-red-700' : 'text-green-700'}`}>{result.missingRecords}</span></div>
          <div><span className="text-zinc-600">Reconstructed:</span><span className={`font-bold ml-2 ${result.reconstructedRecords > 0 ? 'text-orange-700' : 'text-green-700'}`}>{result.reconstructedRecords}</span></div>
          <div><span className="text-zinc-600">Contemporaneous:</span><span className={`font-bold ml-2 ${result.contemporaneous >= 80 ? 'text-green-700' : 'text-orange-700'}`}>{result.contemporaneous}%</span></div>
        </div>
        <div className={`text-sm font-semibold mt-2 ${result.qualityScore >= 90 ? 'text-green-700' : result.qualityScore >= 70 ? 'text-orange-700' : 'text-red-700'}`}>
          {result.qualityScore >= 90 ? 'Excellent recordkeeping - audit ready' : result.qualityScore >= 70 ? 'Good recordkeeping - minor gaps' : 'Poor recordkeeping - needs improvement'}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Retention Requirements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Record Type</th>
                <th className="py-2 text-left">Period</th>
                <th className="py-2 text-left">Reason</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.retention.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.recordType}</td>
                  <td className="py-1">{r.period}</td>
                  <td className="py-1">{r.reason}</td>
                  <td className="py-1">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Compliance Checklist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-left">Required</th>
                <th className="py-2 text-left">Met</th>
                <th className="py-2 text-left">Importance</th>
              </tr>
            </thead>
            <tbody>
              {result.compliance.map((c, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{c.item}</td>
                  <td className="py-1">{c.required ? 'Yes' : 'Optional'}</td>
                  <td className="py-1"><span className={c.met ? 'text-green-700' : 'text-red-700'}>{c.met ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{c.importance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Audit Readiness</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Aspect</th>
                <th className="py-2 text-left">Ready</th>
                <th className="py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.readiness.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.aspect}</td>
                  <td className="py-1"><span className={r.ready ? 'text-green-700' : 'text-red-700'}>{r.ready ? 'Yes' : 'No'}</span></td>
                  <td className="py-1">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Audit Scenarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Scenario</th>
                <th className="py-2 text-left">Preparation</th>
                <th className="py-2 text-left">Risk</th>
              </tr>
            </thead>
            <tbody>
              {result.scenarios.map((s, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{s.scenario}</td>
                  <td className="py-1">{s.preparation}</td>
                  <td className="py-1">{s.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Action Recommendations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Priority</th>
                <th className="py-2 text-left">Benefit</th>
              </tr>
            </thead>
            <tbody>
              {result.recommendations.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1 font-semibold">{r.action}</td>
                  <td className="py-1">{r.priority}</td>
                  <td className="py-1">{r.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.qualityScore >= 90 ? 'bg-green-50 border border-green-200' : result.qualityScore >= 70 ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Final Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Recordkeeping Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Keep records for 7 years minimum</li>
          <li>Contemporaneous records preferred</li>
          <li>Organize by year and category</li>
          <li>Maintain electronic and paper</li>
          <li>Create backup copies</li>
          <li>Store in accessible location</li>
          <li>Reconstructed records less reliable</li>
          <li>Asset records until 7 years after sale</li>
          <li>Business records 7+ years</li>
          <li>Audit can extend retention</li>
        </ul>
      </div>
    </div>
  )
}