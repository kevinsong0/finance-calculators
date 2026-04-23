'use client'

import { useState } from 'react'

export default function TaxAuditRiskAssessmentCalculator() {
  const [totalIncome, setTotalIncome] = useState(150000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('married')
  const [scheduleCIncome, setScheduleCIncome] = useState(50000)
  const [scheduleCLoss, setScheduleCLoss] = useState(false)
  const [homeOfficeDeduction, setHomeOfficeDeduction] = useState(false)
  const [largeCharitableDeduction, setLargeCharitableDeduction] = useState(5000)
  const [unreportedIncome, setUnreportedIncome] = useState(0)
  const [priorAuditHistory, setPriorAuditHistory] = useState(false)
  const [complexityFactors, setComplexityFactors] = useState<string[]>([])
  const [taxPreparerType, setTaxPreparerType] = useState<'self' | 'software' | 'cpa'>('software')

  const calculate = () => {
    // Tax Audit Risk Assessment
    // DIF (Discriminant Inventory Function) scoring
    // Higher income = higher audit risk
    // Certain deductions flag for review

    // IRS audit rates (2023 estimates)
    // Overall: ~0.2% of returns
    // >$1M income: ~2%
    // >$500k: ~0.5%
    // Business returns: higher risk

    // Risk factors (each increases audit probability)
    // 1. High income: >$200k significantly higher risk
    // 2. Schedule C with losses: hobby loss rule triggers
    // 3. Home office deduction: requires qualification
    // 4. Large charitable deductions: >10% of income flagged
    // 5. Unreported income: 1099 mismatch triggers
    // 6. Prior audit: higher scrutiny
    // 7. Complex transactions: crypto, foreign accounts

    // Base audit probability
    let baseProbability = 0.002 // 0.2%

    // Income adjustment
    if (totalIncome > 1000000) {
      baseProbability = 0.02 // 2%
    } else if (totalIncome > 500000) {
      baseProbability = 0.005 // 0.5%
    } else if (totalIncome > 200000) {
      baseProbability = 0.003 // 0.3%
    } else if (totalIncome > 100000) {
      baseProbability = 0.0025 // 0.25%
    }

    // Risk factor adjustments (each multiplies risk)
    let riskMultiplier = 1

    // Schedule C factors
    if (scheduleCIncome > 0) {
      riskMultiplier *= 1.5 // Business income increases risk
      if (scheduleCLoss) {
        riskMultiplier *= 2 // Schedule C loss is red flag
      }
      if (scheduleCIncome > 25000 && scheduleCIncome < 100000) {
        riskMultiplier *= 1.3 // Mid-range business income
      }
    }

    // Home office
    if (homeOfficeDeduction) {
      riskMultiplier *= 1.4 // Home office requires qualification
    }

    // Charitable deduction ratio
    const charitableRatio = largeCharitableDeduction / totalIncome
    if (charitableRatio > 0.1) {
      riskMultiplier *= 1.5 // >10% of income flagged
    } else if (charitableRatio > 0.05) {
      riskMultiplier *= 1.2 // >5% reviewed
    }

    // Unreported income (1099 mismatch)
    if (unreportedIncome > 0) {
      riskMultiplier *= 3 // Automatic flag
    }

    // Prior audit history
    if (priorAuditHistory) {
      riskMultiplier *= 2 // Previous audit increases scrutiny
    }

    // Complexity factors
    if (complexityFactors.includes('crypto')) {
      riskMultiplier *= 1.5
    }
    if (complexityFactors.includes('foreign')) {
      riskMultiplier *= 2 // FBAR/FATCA requirements
    }
    if (complexityFactors.includes('rental')) {
      riskMultiplier *= 1.3
    }
    if (complexityFactors.includes('stock_options')) {
      riskMultiplier *= 1.2
    }

    // Tax preparer effect (reduces risk)
    if (taxPreparerType === 'cpa') {
      riskMultiplier *= 0.7 // CPA reduces error risk
    } else if (taxPreparerType === 'software') {
      riskMultiplier *= 0.85 // Software catches errors
    }

    // Final probability
    const auditProbability = Math.min(baseProbability * riskMultiplier, 0.15) // Cap at 15%

    // Risk level categorization
    let riskLevel = 'Low'
    let riskColor = 'green'
    if (auditProbability > 0.01) {
      riskLevel = 'High'
      riskColor = 'red'
    } else if (auditProbability > 0.005) {
      riskLevel = 'Moderate'
      riskColor = 'orange'
    } else if (auditProbability > 0.002) {
      riskLevel = 'Above Average'
      riskColor = 'yellow'
    }

    // Audit probability as percentage
    const auditPercentage = (auditProbability * 100).toFixed(2)

    // Compare to average
    const averageAuditRate = 0.2 // 0.2%
    const relativeRisk = (auditProbability / averageAuditRate).toFixed(1)

    // Red flags detected
    const redFlags: string[] = []
    if (scheduleCLoss) redFlags.push('Schedule C loss (hobby loss rule)')
    if (charitableRatio > 0.1) redFlags.push('Charitable deductions >10% income')
    if (unreportedIncome > 0) redFlags.push('Unreported income (1099 mismatch)')
    if (homeOfficeDeduction && scheduleCIncome < 10000) redFlags.push('Home office with low business income')
    if (priorAuditHistory) redFlags.push('Prior audit history')
    if (complexityFactors.includes('foreign')) redFlags.push('Foreign accounts (FBAR/FATCA)')

    // Recommendations
    const recommendations: string[] = []
    if (scheduleCLoss) recommendations.push('Document business intent and profit motive')
    if (charitableRatio > 0.1) recommendations.push('Keep detailed charitable donation records')
    if (unreportedIncome > 0) recommendations.push('Report all 1099 income immediately')
    if (homeOfficeDeduction) recommendations.push('Ensure home office meets exclusive use test')
    if (auditProbability > 0.01) recommendations.push('Consider professional tax preparer')
    if (complexityFactors.includes('crypto')) recommendations.push('Report all crypto transactions')

    return {
      totalIncome: totalIncome.toFixed(0),
      filingStatus,
      scheduleCIncome: scheduleCIncome.toFixed(0),
      scheduleCLoss,
      homeOfficeDeduction,
      largeCharitableDeduction: largeCharitableDeduction.toFixed(0),
      charitableRatio: (charitableRatio * 100).toFixed(1),
      unreportedIncome: unreportedIncome.toFixed(0),
      priorAuditHistory,
      complexityFactors,
      taxPreparerType,
      baseProbability: (baseProbability * 100).toFixed(2),
      riskMultiplier: riskMultiplier.toFixed(2),
      auditProbability: auditPercentage,
      riskLevel,
      riskColor,
      averageAuditRate: (averageAuditRate * 100).toFixed(2),
      relativeRisk,
      redFlags,
      recommendations,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Audit Risk Assessment Calculator</h1>
      <p className="text-gray-600 mb-4">Estimate your likelihood of IRS audit based on return characteristics.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Total Income</label>
          <input type="number" value={totalIncome} onChange={(e) => setTotalIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Schedule C Business Income</label>
          <input type="number" value={scheduleCIncome} onChange={(e) => setScheduleCIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Schedule C Loss?</label>
          <select value={scheduleCLoss ? 'yes' : 'no'} onChange={(e) => setScheduleCLoss(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - profitable</option>
            <option value="yes">Yes - showing loss</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Home Office Deduction?</label>
          <select value={homeOfficeDeduction ? 'yes' : 'no'} onChange={(e) => setHomeOfficeDeduction(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - claiming home office</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Charitable Deductions</label>
          <input type="number" value={largeCharitableDeduction} onChange={(e) => setLargeCharitableDeduction(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unreported 1099 Income</label>
          <input type="number" value={unreportedIncome} onChange={(e) => setUnreportedIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Audit History?</label>
          <select value={priorAuditHistory ? 'yes' : 'no'} onChange={(e) => setPriorAuditHistory(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - audited before</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Preparer</label>
          <select value={taxPreparerType} onChange={(e) => setTaxPreparerType(e.target.value as 'self' | 'software' | 'cpa')} className="w-full border rounded p-2">
            <option value="self">Self-prepared</option>
            <option value="software">Tax software</option>
            <option value="cpa">CPA/Professional</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.riskLevel === 'High' ? 'bg-red-50 border border-red-200' : result.riskLevel === 'Moderate' ? 'bg-orange-50 border border-orange-200' : result.riskLevel === 'Above Average' ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.riskLevel === 'High' ? 'text-red-700' : result.riskLevel === 'Moderate' ? 'text-orange-700' : result.riskLevel === 'Above Average' ? 'text-yellow-700' : 'text-green-700'}`}>Audit Risk Assessment</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Audit Probability:</span><span className={`font-bold ml-2 ${result.riskLevel === 'High' ? 'text-red-700' : result.riskLevel === 'Low' ? 'text-green-700' : 'text-orange-700'}`}>{result.auditProbability}%</span></div>
          <div><span className="text-zinc-600">Risk Level:</span><span className={`font-bold ml-2 ${result.riskLevel === 'High' ? 'text-red-700' : result.riskLevel === 'Low' ? 'text-green-700' : 'text-orange-700'}`}>{result.riskLevel}</span></div>
          <div><span className="text-zinc-600">vs Average:</span><span className="font-medium ml-2">{result.relativeRisk}x</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Average audit rate: {result.averageAuditRate}%. Your risk: {result.relativeRisk} times average.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Risk Factor Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Income:</span><span className="font-medium ml-2">$ {result.totalIncome}</span></div>
          <div><span className="text-zinc-600">Base Rate:</span><span className="font-medium ml-2">{result.baseProbability}%</span></div>
          <div><span className="text-zinc-600">Multiplier:</span><span className="font-bold text-blue-700 ml-2">{result.riskMultiplier}x</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Charitable Ratio:</span><span className="font-medium ml-2">{result.charitableRatio}%</span></div>
          <div><span className="text-zinc-600">Preparer:</span><span className="font-medium ml-2">{result.taxPreparerType}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each risk factor multiplies audit probability. Professional preparer reduces risk.</div>
      </div>

      {result.redFlags.length > 0 && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Red Flags Detected</h2>
          <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
            {result.redFlags.map((flag, i) => (
              <li key={i} className="text-red-700 font-medium">{flag}</li>
            ))}
          </ul>
          <div className="text-xs text-zinc-600 mt-2">These factors significantly increase audit probability.</div>
        </div>
      )}

      {result.recommendations.length > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Recommendations</h2>
          <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-4">
            {result.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
          <div className="text-xs text-zinc-600 mt-2">Following these recommendations reduces audit risk.</div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Audit Statistics</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div>• Overall audit rate: ~0.2%</div>
          <div>• Income &gt;$1M: ~2%</div>
          <div>• Income &gt;$500k: ~0.5%</div>
          <div>• Schedule C returns: higher risk</div>
          <div>• 1099 mismatch: automatic flag</div>
          <div>• Prior audit: 2x scrutiny</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">IRS uses DIF scoring to select returns. Certain patterns trigger review.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Audit Risk Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>High income increases risk</li>
          <li>Schedule C losses flagged</li>
          <li>Home office requires proof</li>
          <li>Charitable &gt;10% reviewed</li>
          <li>1099 mismatch automatic</li>
          <li>Prior audit increases risk</li>
          <li>Foreign accounts: FBAR</li>
          <li>Crypto transactions flagged</li>
          <li>CPA reduces error risk</li>
          <li>Keep documentation ready</li>
        </ul>
      </div>
    </div>
  )
}