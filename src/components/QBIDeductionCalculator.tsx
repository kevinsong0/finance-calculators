'use client'

import { useState } from 'react'

export default function QBIDeductionCalculator() {
  const [businessIncome, setBusinessIncome] = useState('')
  const [businessType, setBusinessType] = useState('general')
  const [filingStatus, setFilingStatus] = useState('single')
  const [w2Wages, setW2Wages] = useState('')
  const [qualifiedProperty, setQualifiedProperty] = useState('')
  const [totalTaxableIncome, setTotalTaxableIncome] = useState('')
  const [isSSTB, setIsSSTB] = useState(false)
  const [sstbType, setSstbType] = useState('none')
  const [taxYear, setTaxYear] = useState('2026')
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState('')
  const [hasEmployees, setHasEmployees] = useState(false)
  const [employeeCount, setEmployeeCount] = useState('')
  const [healthInsurancePaid, setHealthInsurancePaid] = useState('')
  const [retirementContributions, setRetirementContributions] = useState('')

  const calculate = () => {
    const income = parseFloat(businessIncome) || 100000
    const type = businessType
    const status = filingStatus
    const wages = parseFloat(w2Wages) || 50000
    const property = parseFloat(qualifiedProperty) || 100000
    const totalIncome = parseFloat(totalTaxableIncome) || 150000
    const isSpecifiedService = isSSTB
    const sstbCategory = sstbType
    const year = parseInt(taxYear) || 2026
    const seIncome = parseFloat(selfEmploymentIncome) || income
    const hasEmps = hasEmployees
    const empCount = parseInt(employeeCount) || 0
    const healthIns = parseFloat(healthInsurancePaid) || 0
    const retireContrib = parseFloat(retirementContributions) || 0

    // QBI Deduction Thresholds (2026)
    const thresholds: Record<string, number> = {
      'single': 191950,
      'married': 383900,
      'head_household': 191950,
      'married_separate': 191950
    }

    const phaseOutRanges: Record<string, number> = {
      'single': 50100,
      'married': 100200,
      'head_household': 50100,
      'married_separate': 50100
    }

    const threshold = thresholds[status as keyof typeof thresholds] || 191950
    const phaseOutRange = phaseOutRanges[status as keyof typeof phaseOutRanges] || 50100
    const upperThreshold = threshold + phaseOutRange

    // Qualified Business Income (QBI)
    // QBI = net income from qualified trade or business
    // Excludes: capital gains/losses, dividends, interest income
    // For SSTB: QBI limited if income over threshold

    const qbi = income // Simplified: assume all business income is QBI

    // SSTB Types (Specified Service Trade or Business)
    // Health, law, accounting, actuarial science, performing arts, consulting
    // Athletics, financial services, brokerage services
    // Investment management, trading, dealing in securities
    // Architecture and engineering NOW qualify (removed from SSTB in TCJA)

    const sstbTypes: Record<string, string> = {
      'none': 'Not SSTB - Full QBI deduction potential',
      'health': 'Health services (doctors, nurses, therapists)',
      'law': 'Legal services (lawyers, paralegals)',
      'accounting': 'Accounting services',
      'consulting': 'Consulting services',
      'performing_arts': 'Performing arts',
      'financial': 'Financial services, investment management',
      'brokerage': 'Brokerage services',
      'athletics': 'Athletics, sports'
    }

    const sstbDescription = sstbTypes[sstbCategory as keyof typeof sstbTypes] || 'Not SSTB'

    // QBI Deduction Calculation
    // Two methods:
    // 1. 20% of QBI (simple method)
    // 2. Wage/Property limitation for higher incomes

    const simpleQbiDeduction = qbi * 0.20

    // Wage/Property Limitation (for income over threshold)
    // 50% of W-2 wages OR
    // 25% of W-2 wages + 2.5% of qualified property

    const wageLimit1 = wages * 0.50
    const wageLimit2 = wages * 0.25 + property * 0.025
    const wagePropertyLimit = Math.max(wageLimit1, wageLimit2)

    // Determine deduction based on income level
    let qbiDeduction = 0
    let limitationApplies = false
    let reductionAmount = 0

    if (totalIncome <= threshold) {
      // Below threshold: 20% of QBI, full deduction
      // SSTB fully qualifies below threshold
      qbiDeduction = simpleQbiDeduction
      limitationApplies = false
    } else if (totalIncome <= upperThreshold) {
      // Phase-out zone: partial limitation
      limitationApplies = true
      const phaseOutPercent = (totalIncome - threshold) / phaseOutRange
      reductionAmount = (simpleQbiDeduction - Math.min(simpleQbiDeduction, wagePropertyLimit)) * phaseOutPercent

      // SSTB: QBI reduced in phase-out
      let reducedQbi = qbi
      if (isSpecifiedService) {
        reducedQbi = qbi * (1 - phaseOutPercent)
      }

      const reducedQbiDeduction = reducedQbi * 0.20
      qbiDeduction = Math.min(reducedQbiDeduction, totalIncome * 0.20)
    } else {
      // Above upper threshold: full limitation applies
      limitationApplies = true

      // SSTB above upper threshold: NO QBI deduction
      if (isSpecifiedService) {
        qbiDeduction = 0
        reductionAmount = simpleQbiDeduction
      } else {
        // Non-SSTB: wage/property limit applies
        qbiDeduction = Math.min(simpleQbiDeduction, wagePropertyLimit)
        reductionAmount = simpleQbiDeduction - qbiDeduction
      }
    }

    // Total deduction cap: 20% of taxable income
    const taxableIncomeCap = totalIncome * 0.20
    const finalQbiDeduction = Math.min(qbiDeduction, taxableIncomeCap)

    // Self-employment tax adjustment
    // SE tax: 15.3% on net earnings (deductible half)
    const seTax = seIncome * 0.9235 * 0.153
    const seTaxDeduction = seTax * 0.50

    // Adjusted taxable income for QBI cap
    const adjustedTaxableIncome = totalIncome - seTaxDeduction
    const adjustedCap = adjustedTaxableIncome * 0.20

    // Alternative calculation (if QBI deduction > adjusted cap)
    const cappedDeduction = Math.min(finalQbiDeduction, adjustedCap)

    // Tax savings from QBI deduction
    // Assume 24% marginal rate for savings estimate
    const marginalRate = 0.24
    const taxSavings = cappedDeduction * marginalRate

    // Recommendations
    const recommendations: string[] = []
    if (isSpecifiedService && totalIncome > threshold) {
      recommendations.push('SSTB income over threshold: QBI deduction limited or eliminated')
    }
    if (!hasEmps && wages === 0 && totalIncome > threshold) {
      recommendations.push('No W-2 wages: Consider hiring employees or contractors to increase wage limit')
    }
    if (property === 0 && wages === 0 && totalIncome > upperThreshold) {
      recommendations.push('Zero wage/property limit: QBI deduction fully phased out above upper threshold')
    }
    if (type === 's_corp' && wages < qbi * 0.25) {
      recommendations.push('S-Corp: Increase W-2 salary to optimize QBI deduction')
    }
    if (totalIncome < threshold && isSpecifiedService) {
      recommendations.push('SSTB below threshold: Full 20% QBI deduction available')
    }

    // Strategies
    const strategies = [
      { name: 'Increase W-2 wages', benefit: wages < qbi * 0.5 ? 'Unlock higher QBI limit' : 'Already optimized' },
      { name: 'Buy qualified property', benefit: property < wages * 2 ? '2.5% of property adds to limit' : 'Property adequate' },
      { name: 'Aggregate businesses', benefit: 'Combine to maximize wage/property limit' },
      { name: 'Split SSTB/non-SSTB', benefit: 'Separate non-SSTB income qualifies fully' },
      { name: 'Reduce taxable income', benefit: 'Stay below threshold for full deduction' }
    ]

    return {
      businessIncome: income.toFixed(2),
      businessType: type,
      filingStatus: status,
      taxYear: year,
      threshold: threshold.toFixed(0),
      upperThreshold: upperThreshold.toFixed(0),
      phaseOutRange: phaseOutRange.toFixed(0),
      totalTaxableIncome: totalIncome.toFixed(2),
      isSSTB: isSpecifiedService,
      sstbType: sstbCategory,
      sstbDescription,
      qbi: qbi.toFixed(2),
      simpleQbiDeduction: simpleQbiDeduction.toFixed(2),
      w2Wages: wages.toFixed(2),
      qualifiedProperty: property.toFixed(2),
      wageLimit1: wageLimit1.toFixed(2),
      wageLimit2: wageLimit2.toFixed(2),
      wagePropertyLimit: wagePropertyLimit.toFixed(2),
      limitationApplies,
      reductionAmount: reductionAmount.toFixed(2),
      qbiDeduction: qbiDeduction.toFixed(2),
      taxableIncomeCap: taxableIncomeCap.toFixed(2),
      finalQbiDeduction: finalQbiDeduction.toFixed(2),
      seTax: seTax.toFixed(2),
      seTaxDeduction: seTaxDeduction.toFixed(2),
      adjustedCap: adjustedCap.toFixed(2),
      cappedDeduction: cappedDeduction.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      marginalRate: '24%',
      hasEmployees: hasEmps,
      employeeCount: empCount,
      healthInsurancePaid: healthIns.toFixed(2),
      retirementContributions: retireContrib.toFixed(2),
      recommendations,
      strategies,
      incomeBelowThreshold: totalIncome <= threshold,
      incomeInPhaseOut: totalIncome > threshold && totalIncome <= upperThreshold,
      incomeAboveUpper: totalIncome > upperThreshold
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">QBI Deduction Calculator (Section 199A)</h1>
      <p className="text-zinc-600">Calculate Qualified Business Income deduction for sole proprietors, partnerships, and S-corps. Up to 20% deduction.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business & Filing Status</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="single">Single ($191,950 threshold)</option>
              <option value="married">Married Joint ($383,900 threshold)</option>
              <option value="head_household">Head of Household ($191,950 threshold)</option>
              <option value="married_separate">Married Separate ($191,950 threshold)</option>
            </select>
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
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="sole_prop">Sole Proprietor (Schedule C)</option>
              <option value="partnership">Partnership / LLC</option>
              <option value="s_corp">S Corporation</option>
              <option value="general">General Qualified Business</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Qualified Business Income (QBI)</label>
            <input
              type="number"
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Net income from qualified trade/business"
            />
            <div className="text-xs text-zinc-500 mt-1">
              QBI excludes capital gains, dividends, interest. Schedule C net profit, partnership/S-corp K-1 Box 1.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Taxable Income (Before QBI)</label>
            <input
              type="number"
              value={totalTaxableIncome}
              onChange={(e) => setTotalTaxableIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="All income including wages, investments"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">SSTB Status (Specified Service Trade/Business)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Is this a Specified Service Business?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={isSSTB}
                onChange={(e) => setIsSSTB(e.target.checked)}
                className="w-4 h-4"
              />
              <span>SSTB (health, law, accounting, consulting, financial services, performing arts)</span>
            </label>
            <div className="text-xs text-zinc-500 mt-1">
              SSTB deduction limited at higher incomes. Architecture/engineering removed from SSTB.
            </div>
          </div>
          {isSSTB && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">SSTB Category</label>
              <select
                value={sstbType}
                onChange={(e) => setSstbType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="none">Select SSTB Type</option>
                <option value="health">Health Services</option>
                <option value="law">Legal Services</option>
                <option value="accounting">Accounting</option>
                <option value="consulting">Consulting</option>
                <option value="financial">Financial Services</option>
                <option value="brokerage">Brokerage</option>
                <option value="performing_arts">Performing Arts</option>
                <option value="athletics">Athletics</option>
              </select>
              <div className="text-xs text-zinc-500 mt-1">{result.sstbDescription}</div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Wage & Property Limitation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">W-2 Wages Paid</label>
            <input
              type="number"
              value={w2Wages}
              onChange={(e) => setW2Wages(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Total W-2 wages paid to employees"
            />
            <div className="text-xs text-zinc-500 mt-1">
              W-2 wages from payroll. S-corp owner salary included but reduces QBI.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Qualified Property (UBIA)</label>
            <input
              type="number"
              value={qualifiedProperty}
              onChange={(e) => setQualifiedProperty(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Unadjusted basis of qualified property"
            />
            <div className="text-xs text-zinc-500 mt-1">
              UBIA of qualified property: tangible property used in business, depreciable period.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Has Employees?</label>
            <label className="flex items-center gap-2 bg-white rounded p-2">
              <input
                type="checkbox"
                checked={hasEmployees}
                onChange={(e) => setHasEmployees(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Business has W-2 employees</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Threshold Analysis</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">QBI Threshold ({result.filingStatus})</span>
            <span className="font-bold">$${result.threshold}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Phase-out Range</span>
            <span>$${result.phaseOutRange}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Upper Threshold</span>
            <span className="font-bold">$${result.upperThreshold}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Your Total Taxable Income</span>
            <span className="font-bold">$${result.totalTaxableIncome}</span>
          </div>
          <div className={`rounded p-3 flex justify-between ${result.incomeBelowThreshold ? 'bg-green-50' : result.incomeInPhaseOut ? 'bg-yellow-50' : 'bg-red-50'}`}>
            <span className="text-zinc-600">Income Status</span>
            <span className={`font-bold ${result.incomeBelowThreshold ? 'text-green-600' : result.incomeInPhaseOut ? 'text-yellow-600' : 'text-red-600'}`}>
              {result.incomeBelowThreshold ? 'Below Threshold (Full Deduction)' : result.incomeInPhaseOut ? 'Phase-out Zone' : 'Above Upper Threshold'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">QBI Deduction Calculation</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Qualified Business Income</span>
            <span className="font-bold">$${result.qbi}</span>
          </div>
          <div className="bg-green-50 rounded p-3 flex justify-between">
            <span className="text-zinc-600">Simple Method (20% of QBI)</span>
            <span className="font-bold text-green-600">$${result.simpleQbiDeduction}</span>
          </div>
          {result.limitationApplies && (
            <div className="bg-yellow-50 rounded p-3">
              <div className="font-medium mb-2">Wage/Property Limitation:</div>
              <div className="flex justify-between">
                <span className="text-zinc-600">50% of W-2 wages</span>
                <span>$${result.wageLimit1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">25% wages + 2.5% property</span>
                <span>$${result.wageLimit2}</span>
              </div>
              <div className="flex justify-between border-t border-yellow-200 pt-2 mt-2">
                <span className="font-medium">Applicable Limit</span>
                <span className="font-bold">$${result.wagePropertyLimit}</span>
              </div>
            </div>
          )}
          {parseFloat(result.reductionAmount) > 0 && (
            <div className="bg-red-50 rounded p-3 flex justify-between">
              <span className="text-zinc-600">Reduction (Phase-out)</span>
              <span className="font-bold text-red-600">-$${result.reductionAmount}</span>
            </div>
          )}
          <div className="bg-zinc-100 rounded p-3 flex justify-between">
            <span className="font-medium">QBI Deduction</span>
            <span className="font-bold">$${result.qbiDeduction}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Taxable Income Cap (20%)</span>
            <span>$${result.taxableIncomeCap}</span>
          </div>
          <div className="bg-green-100 rounded p-3 flex justify-between border-t-2 border-green-300">
            <span className="font-medium">Final QBI Deduction</span>
            <span className="font-bold text-green-600">$${result.finalQbiDeduction}</span>
          </div>
        </div>
      </div>

      {result.isSSTB && result.incomeAboveUpper ? (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">SSTB Above Upper Threshold - No QBI Deduction</h3>
          <div className="text-sm text-red-600">
            SSTB with income over $${result.upperThreshold}: QBI deduction fully eliminated. Specified service businesses (health, law, accounting, etc.) lose deduction above phase-out zone. Consider business restructuring or income reduction strategies.
          </div>
        </div>
      ) : result.isSSTB && result.incomeInPhaseOut ? (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">SSTB in Phase-out Zone - Partial Deduction</h3>
          <div className="text-sm text-yellow-600">
            SSTB income between $${result.threshold} and $${result.upperThreshold}: QBI deduction partially phased out. Deduction: $${result.finalQbiDeduction}. Reduce taxable income to stay below threshold for full deduction.
          </div>
        </div>
      ) : result.finalQbiDeduction === result.simpleQbiDeduction ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Full 20% QBI Deduction Available</h3>
          <div className="text-sm text-green-600">
            Income below threshold: Full 20% deduction = $${result.finalQbiDeduction}. Tax savings at 24% rate: $${result.taxSavings}. No wage/property limitation applies. File Form 8995 or 8995-A.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Wage/Property Limitation Applies</h3>
          <div className="text-sm text-yellow-600">
            Income above threshold: QBI deduction limited by wages/property. Deduction: $${result.finalQbiDeduction} (vs $${result.simpleQbiDeduction} simple method). Increase W-2 wages or qualified property to maximize deduction.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Tax Savings Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">QBI Deduction</div>
            <div className="text-2xl font-bold text-green-600">$${result.finalQbiDeduction}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Tax Savings (24%)</div>
            <div className="text-2xl font-bold text-green-600">$${result.taxSavings}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">SE Tax</div>
            <div className="text-2xl font-bold">$${result.seTax}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">SE Tax Deduction</div>
            <div className="text-2xl font-bold">$${result.seTaxDeduction}</div>
          </div>
        </div>
      </div>

      {result.recommendations.length > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Recommendations</h3>
          <div className="text-xs text-zinc-600">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="mb-1">- {rec}</div>
            ))}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Strategies</h3>
        <div className="space-y-2 text-xs">
          {result.strategies.map((s, idx) => (
            <div key={idx} className="bg-white rounded p-3">
              <strong>{s.name}</strong>
              <div className="text-zinc-500">{s.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QBI Deduction Rules</h3>
        <div className="text-xs text-zinc-600">
          20% of qualified business income deduction. Available for sole props, partnerships, S-corps. SSTB deduction limited above threshold. Wage/property limit for income over threshold. Cap: 20% of taxable income. File Form 8995 (simple) or 8995-A (complex). Deduction expires 2025 unless extended.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Points</h3>
        <div className="text-xs text-zinc-600">
          TCJA created QBI deduction (2018-2025, may be extended). SSTB: health, law, accounting, consulting, financial, performing arts. Architecture/engineering removed from SSTB. Threshold indexed annually. W-2 wages from employees (not contractors). Qualified property: UBIA of tangible property. Aggregation rules allow combining businesses.
        </div>
      </div>
    </main>
  )
}