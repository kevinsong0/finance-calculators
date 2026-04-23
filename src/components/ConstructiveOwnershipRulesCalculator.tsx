'use client'

import { useState } from 'react'

export default function ConstructiveOwnershipRulesCalculator() {
  const [directOwnership, setDirectOwnership] = useState(30)
  const [spouseOwnership, setSpouseOwnership] = useState(20)
  const [childOwnership, setChildOwnership] = useState(15)
  const [parentOwnership, setParentOwnership] = useState(10)
  const [entityType, setEntityType] = useState<'corporation' | 'partnership' | 'trust'>('corporation')
  const [controlledEntityOwnership, setControlledEntityOwnership] = useState(60)
  const [testType, setTestType] = useState<'relatedParty' | 'passiveActivity' | 'atRisk' | 'affiliatedGroup'>('relatedParty')
  const [thresholdPercentage, setThresholdPercentage] = useState(50)

  const calculate = () => {
    // Constructive Ownership Attribution Rules Calculator
    // Determines total ownership through direct + attributed ownership

    // Attribution rules under IRC:
    // Section 267: Related party loss disallowance
    // Section 469: Passive activity rules
    // Section 465: At-risk rules
    // Section 1504: Affiliated group definitions

    // Family attribution:
    // - Spouse to each other
    // - Parents to children (minor)
    // - Children to parents
    // - Brothers/sisters to each other

    // Entity attribution:
    // - Corporation to shareholders (if &gt;50%)
    // - Partnership to partners
    // - Trust to beneficiaries/grantor

    // Calculate total constructive ownership
    const direct = directOwnership
    const spouseAttrib = spouseOwnership
    const childAttrib = childOwnership
    const parentAttrib = parentOwnership
    const entityAttrib = entityType === 'corporation' && controlledEntityOwnership > 50
      ? controlledEntityOwnership
      : entityType === 'partnership'
        ? controlledEntityOwnership
        : 0

    // Total constructive ownership
    const totalConstructiveOwnership = direct + spouseAttrib + childAttrib + parentAttrib + entityAttrib

    // Check threshold
    const exceedsThreshold = totalConstructiveOwnership > thresholdPercentage

    // Section 267 related party status
    const isRelatedParty267 = totalConstructiveOwnership > 50 || (directOwnership > 0 && (spouseAttrib > 0 || childAttrib > 0 || parentAttrib > 0))

    // Passive activity material participation test
    // Attribution affects who counts as participating
    const passiveActivityImpact = testType === 'passiveActivity'
      ? `Spouse participation attributed: ${totalConstructiveOwnership > 50 ? 'material participation may apply' : 'test separately'}`
      : ''

    // At-risk rules
    // Family member amounts may count toward at-risk
    const atRiskImpact = testType === 'atRisk'
      ? `Family member at-risk amounts: ${totalConstructiveOwnership > 50 ? 'may be attributed' : 'not attributed'}`
      : ''

    // Affiliated group (corporate)
    // 80% ownership required for affiliated group
    const affiliatedGroupThreshold = 80
    const qualifiesAffiliatedGroup = entityType === 'corporation' && totalConstructiveOwnership >= affiliatedGroupThreshold

    // Attribution breakdown
    const attributionDetails: { source: string; percentage: number; rule: string }[] = []

    attributionDetails.push({
      source: 'Direct Ownership',
      percentage: direct,
      rule: 'Your actual ownership',
    })

    if (spouseAttrib > 0) {
      attributionDetails.push({
        source: 'Spouse',
        percentage: spouseAttrib,
        rule: 'Spouse ownership attributed to you',
      })
    }

    if (childAttrib > 0) {
      attributionDetails.push({
        source: 'Children',
        percentage: childAttrib,
        rule: 'Minor children ownership attributed',
      })
    }

    if (parentAttrib > 0) {
      attributionDetails.push({
        source: 'Parents',
        percentage: parentAttrib,
        rule: 'Parent ownership attributed',
      })
    }

    if (entityAttrib > 0) {
      attributionDetails.push({
        source: entityType,
        percentage: entityAttrib,
        rule: `${entityType} ownership attributed (${controlledEntityOwnership}% owned)`,
      })
    }

    // Tax implications based on test type
    let taxImplications = ''
    if (testType === 'relatedParty') {
      taxImplications = exceedsThreshold
        ? 'Related party rules apply: loss disallowance, gain deferral'
        : 'Not a related party under constructive ownership rules'
    } else if (testType === 'passiveActivity') {
      taxImplications = exceedsThreshold
        ? 'Material participation test affected by attributed participation'
        : 'Each person tests participation separately'
    } else if (testType === 'atRisk') {
      taxImplications = exceedsThreshold
        ? 'At-risk amounts may be attributed from family'
        : 'At-risk amounts not attributed'
    } else if (testType === 'affiliatedGroup') {
      taxImplications = qualifiesAffiliatedGroup
        ? 'Qualifies as affiliated group - can file consolidated return'
        : 'Does not meet 80% threshold for affiliated group'
    }

    // Excess ownership beyond threshold
    const excessPercentage = totalConstructiveOwnership - thresholdPercentage

    // Recommendation
    let recommendation = ''
    if (exceedsThreshold) {
      recommendation = `Constructive ownership ${totalConstructiveOwnership}% exceeds ${thresholdPercentage}% threshold. Related party rules apply.`
    } else {
      recommendation = `Constructive ownership ${totalConstructiveOwnership}% does NOT exceed ${thresholdPercentage}% threshold.`
    }

    if (qualifiesAffiliatedGroup) {
      recommendation += ' Qualifies for affiliated group filing.'
    }

    // Rules summary
    const rulesSummary = {
      section267: 'Family + entity attribution for loss disallowance',
      section469: 'Spouse participation attributed for passive tests',
      section465: 'Family at-risk amounts attributed',
      section1504: '80% required for affiliated corporate group',
    }

    // Warnings
    const warnings: string[] = []
    warnings.push('Constructive ownership can exceed 100% in some cases')
    warnings.push('Minor children always attributed to parents')
    warnings.push('Spouse attribution is automatic')
    warnings.push('Entity attribution requires &gt;50% control')
    warnings.push('Rules differ by section (267 vs 469 vs 465)')
    if (totalConstructiveOwnership > 100) {
      warnings.push('Warning: Total exceeds 100% - multiple attribution paths')
    }

    return {
      directOwnership: direct.toFixed(0),
      spouseOwnership: spouseAttrib.toFixed(0),
      childOwnership: childAttrib.toFixed(0),
      parentOwnership: parentAttrib.toFixed(0),
      entityType,
      controlledEntityOwnership: controlledEntityOwnership.toFixed(0),
      testType,
      thresholdPercentage: thresholdPercentage.toFixed(0),
      totalConstructiveOwnership: totalConstructiveOwnership.toFixed(0),
      exceedsThreshold,
      isRelatedParty267,
      passiveActivityImpact,
      atRiskImpact,
      affiliatedGroupThreshold: affiliatedGroupThreshold.toFixed(0),
      qualifiesAffiliatedGroup,
      attributionDetails,
      taxImplications,
      excessPercentage: excessPercentage.toFixed(0),
      recommendation,
      rulesSummary,
      warnings,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Constructive Ownership Rules Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate attributed ownership through family and entity rules.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Direct Ownership (%)</label>
          <input type="number" value={directOwnership} min="0" max="100" onChange={(e) => setDirectOwnership(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse Ownership (%)</label>
          <input type="number" value={spouseOwnership} min="0" max="100" onChange={(e) => setSpouseOwnership(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Children Ownership (%)</label>
          <input type="number" value={childOwnership} min="0" max="100" onChange={(e) => setChildOwnership(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parents Ownership (%)</label>
          <input type="number" value={parentOwnership} min="0" max="100" onChange={(e) => setParentOwnership(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Entity Type</label>
          <select value={entityType} onChange={(e) => setEntityType(e.target.value as 'corporation' | 'partnership' | 'trust')} className="w-full border rounded p-2">
            <option value="corporation">Corporation</option>
            <option value="partnership">Partnership</option>
            <option value="trust">Trust</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Controlled Entity Ownership (%)</label>
          <input type="number" value={controlledEntityOwnership} min="0" max="100" onChange={(e) => setControlledEntityOwnership(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Test Type</label>
          <select value={testType} onChange={(e) => setTestType(e.target.value as 'relatedParty' | 'passiveActivity' | 'atRisk' | 'affiliatedGroup')} className="w-full border rounded p-2">
            <option value="relatedParty">Section 267 Related Party</option>
            <option value="passiveActivity">Section 469 Passive Activity</option>
            <option value="atRisk">Section 465 At-Risk</option>
            <option value="affiliatedGroup">Section 1504 Affiliated Group</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Threshold (%)</label>
          <input type="number" value={thresholdPercentage} min="0" max="100" onChange={(e) => setThresholdPercentage(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className={`card mb-6 ${result.exceedsThreshold ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.exceedsThreshold ? 'text-orange-700' : 'text-green-700'}`}>Constructive Ownership Total</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Direct:</span><span className="font-medium ml-2">{result.directOwnership}%</span></div>
          <div><span className="text-zinc-600">Total:</span><span className={`font-bold ml-2 ${result.exceedsThreshold ? 'text-orange-700' : 'text-green-700'}`}>{result.totalConstructiveOwnership}%</span></div>
          <div><span className="text-zinc-600">Threshold:</span><span className="font-medium ml-2">{result.thresholdPercentage}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Exceeds:</span><span className={`font-bold ml-2 ${result.exceedsThreshold ? 'text-orange-700' : 'text-green-700'}`}>{result.exceedsThreshold ? 'YES' : 'NO'}</span></div>
          <div><span className="text-zinc-600">Excess:</span><span className="font-medium ml-2">{result.excessPercentage}%</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Attribution Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Source</th>
                <th className="py-2 text-left">Percentage</th>
                <th className="py-2 text-left">Rule</th>
              </tr>
            </thead>
            <tbody>
              {result.attributionDetails.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-1 font-semibold">{item.source}</td>
                  <td className="py-1">{item.percentage}%</td>
                  <td className="py-1">{item.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {result.testType === 'relatedParty' && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Section 267 Related Party</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Related Party:</span><span className={`font-bold ml-2 ${result.isRelatedParty267 ? 'text-blue-700' : 'text-zinc-600'}`}>{result.isRelatedParty267 ? 'YES' : 'NO'}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">{result.taxImplications}</div>
        </div>
      )}

      {result.testType === 'passiveActivity' && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Section 469 Passive Activity</h2>
          <div className="text-xs text-zinc-600">{result.passiveActivityImpact}</div>
        </div>
      )}

      {result.testType === 'atRisk' && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Section 465 At-Risk</h2>
          <div className="text-xs text-zinc-600">{result.atRiskImpact}</div>
        </div>
      )}

      {result.testType === 'affiliatedGroup' && (
        <div className={`card mb-6 ${result.qualifiesAffiliatedGroup ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h2 className="text-lg font-semibold mb-3">Section 1504 Affiliated Group</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Threshold:</span><span className="font-medium ml-2">{result.affiliatedGroupThreshold}%</span></div>
            <div><span className="text-zinc-600">Qualifies:</span><span className={`font-bold ml-2 ${result.qualifiesAffiliatedGroup ? 'text-green-700' : 'text-red-700'}`}>{result.qualifiesAffiliatedGroup ? 'YES' : 'NO'}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">{result.taxImplications}</div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Implications</h2>
        <div className="text-sm text-zinc-600">{result.taxImplications}</div>
      </div>

      <div className={`card mb-6 ${result.exceedsThreshold ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Rules Summary</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Section 267:</span> {result.rulesSummary.section267}</div>
          <div><span className="font-semibold">Section 469:</span> {result.rulesSummary.section469}</div>
          <div><span className="font-semibold">Section 465:</span> {result.rulesSummary.section465}</div>
          <div><span className="font-semibold">Section 1504:</span> {result.rulesSummary.section1504}</div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Warnings & Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}