'use client'

import { useState } from 'react'

export default function TaxAttributionRulesCalculator() {
  const [sharesOwned, setSharesOwned] = useState(1000)
  const [ownershipPercent, setOwnershipPercent] = useState(25)
  const [familyMembers, setFamilyMembers] = useState({ spouse: 500, children: 0, parents: 0 })
  const [relatedEntities, setRelatedEntities] = useState({ partnerships: 0, corporations: 0, trusts: 0 })
  const [isSold, setIsSold] = useState(false)
  const [salePrice, setSalePrice] = useState(100000)
  const [buyerType, setBuyerType] = useState<'unrelated' | 'family' | 'controlled'>('unrelated')
  const [holdingPeriod, setHoldingPeriod] = useState(24)
  const [testType, setTestType] = useState<'stock' | 'partnership'>('stock')

  const calculate = () => {
    // Tax Attribution Rules Calculator
    // Constructive ownership rules (Section 267, 318)
    // Determine if transactions are between related parties

    // Attribution rules:
    // 1. Family attribution: spouse, children, parents
    // 2. Entity attribution: partnerships, corporations, trusts
    // 3. Option attribution: options to acquire stock
    // 4. Downward attribution: entity to owner
    // 5. Upward attribution: owner to entity

    // Calculate total constructive ownership
    const directOwnership = ownershipPercent

    // Family attribution (Section 267(f))
    const spouseOwnership = (familyMembers.spouse / sharesOwned) * 100
    const childrenOwnership = (familyMembers.children / sharesOwned) * 100
    const parentsOwnership = (familyMembers.parents / sharesOwned) * 100
    const familyAttributed = spouseOwnership + childrenOwnership + parentsOwnership

    // Entity attribution
    const partnershipAttributed = relatedEntities.partnerships
    const corpAttributed = relatedEntities.corporations
    const trustAttributed = relatedEntities.trusts
    const entityAttributed = partnershipAttributed + corpAttributed + trustAttributed

    // Total constructive ownership
    const totalConstructive = directOwnership + familyAttributed + entityAttributed

    // Determine if related party
    const isRelatedParty = totalConstructive >= 50 || directOwnership >= 50

    // Loss disallowance rules (Section 267)
    const lossDisallowed = isSold && isRelatedParty && buyerType !== 'unrelated'

    // Holding period rules (Section 267(c))
    // Tacking allowed for gifts between family members
    // Tacking NOT allowed for wash sales
    const holdingPeriodTackingAllowed = !lossDisallowed && buyerType === 'family'

    // Section 318 attribution for corporate stock
    // More complex rules for corporate attributions
    const section318Applicable = testType === 'stock'

    // Related party transaction consequences
    let consequences: string[] = []
    if (isRelatedParty) {
      consequences.push('Related party status confirmed')
      if (lossDisallowed) {
        consequences.push('Loss on sale disallowed (Section 267)')
        consequences.push('Buyer cannot recognize loss until sold to unrelated party')
      }
      if (isSold && buyerType === 'family') {
        consequences.push('Family sale: special attribution rules apply')
      }
      if (totalConstructive >= 80) {
        consequences.push('80%+ ownership: controlled group rules apply')
      }
      if (totalConstructive >= 50) {
        consequences.push('50%+ ownership: related party transactions restricted')
      }
    } else {
      consequences.push('Not a related party under attribution rules')
      consequences.push('Normal transaction treatment applies')
    }

    // Attribution breakdown
    const attributionBreakdown = [
      { source: 'Direct Ownership', percent: directOwnership },
      { source: 'Spouse Attribution', percent: spouseOwnership },
      { source: 'Children Attribution', percent: childrenOwnership },
      { source: 'Parents Attribution', percent: parentsOwnership },
      { source: 'Partnership Attribution', percent: partnershipAttributed },
      { source: 'Corporate Attribution', percent: corpAttributed },
      { source: 'Trust Attribution', percent: trustAttributed },
    ]

    // Recommendation
    let recommendation = ''
    if (isRelatedParty) {
      if (lossDisallowed) {
        recommendation = `WARNING: Sale to related party - loss disallowed under Section 267. Buyer's basis = purchase price. Loss deferred until sale to unrelated party. Consider restructuring transaction.`
      } else if (totalConstructive >= 80) {
        recommendation = `80%+ constructive ownership: controlled group. Intercompany transactions subject to special rules. Consolidated return may be required.`
      } else {
        recommendation = `Related party status confirmed (50%+ constructive ownership). Transactions subject to Section 267 restrictions. Document all intercompany dealings carefully.`
      }
    } else {
      recommendation = `Not a related party. Normal transaction treatment. Attribution below 50% threshold. Consider family/entity restructuring if approaching threshold.`
    }

    return {
      sharesOwned: sharesOwned.toFixed(0),
      ownershipPercent: ownershipPercent.toFixed(1),
      familyMembers,
      relatedEntities,
      directOwnership: directOwnership.toFixed(1),
      spouseOwnership: spouseOwnership.toFixed(1),
      childrenOwnership: childrenOwnership.toFixed(1),
      parentsOwnership: parentsOwnership.toFixed(1),
      familyAttributed: familyAttributed.toFixed(1),
      entityAttributed: entityAttributed.toFixed(1),
      totalConstructive: totalConstructive.toFixed(1),
      isRelatedParty,
      lossDisallowed,
      holdingPeriodTackingAllowed,
      testType,
      section318Applicable,
      buyerType,
      salePrice: salePrice.toFixed(0),
      holdingPeriod: holdingPeriod.toFixed(0),
      attributionBreakdown,
      consequences,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Attribution Rules Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate constructive ownership under attribution rules (Section 267, 318).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Total Shares Outstanding</label>
          <input type="number" value={sharesOwned} onChange={(e) => setSharesOwned(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Direct Ownership (%)</label>
          <input type="number" value={ownershipPercent} onChange={(e) => setOwnershipPercent(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Family Member Ownership</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Spouse Shares</label>
            <input type="number" value={familyMembers.spouse} onChange={(e) => setFamilyMembers({ ...familyMembers, spouse: Number(e.target.value) })} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Children Shares</label>
            <input type="number" value={familyMembers.children} onChange={(e) => setFamilyMembers({ ...familyMembers, children: Number(e.target.value) })} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parents Shares</label>
            <input type="number" value={familyMembers.parents} onChange={(e) => setFamilyMembers({ ...familyMembers, parents: Number(e.target.value) })} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-4">
        <h2 className="text-lg font-semibold mb-3">Entity Attribution (%)</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Partnership</label>
            <input type="number" value={relatedEntities.partnerships} onChange={(e) => setRelatedEntities({ ...relatedEntities, partnerships: Number(e.target.value) })} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Corporation</label>
            <input type="number" value={relatedEntities.corporations} onChange={(e) => setRelatedEntities({ ...relatedEntities, corporations: Number(e.target.value) })} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trust</label>
            <input type="number" value={relatedEntities.trusts} onChange={(e) => setRelatedEntities({ ...relatedEntities, trusts: Number(e.target.value) })} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Test Type</label>
          <select value={testType} onChange={(e) => setTestType(e.target.value as 'stock' | 'partnership')} className="w-full border rounded p-2">
            <option value="stock">Corporate Stock (Section 318)</option>
            <option value="partnership">Partnership (Section 267)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sale Scenario?</label>
          <select value={isSold ? 'yes' : 'no'} onChange={(e) => setIsSold(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No sale</option>
            <option value="yes">Yes - evaluating sale</option>
          </select>
        </div>
        {isSold && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Sale Price</label>
              <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Buyer Type</label>
              <select value={buyerType} onChange={(e) => setBuyerType(e.target.value as 'unrelated' | 'family' | 'controlled')} className="w-full border rounded p-2">
                <option value="unrelated">Unrelated Party</option>
                <option value="family">Family Member</option>
                <option value="controlled">Controlled Entity</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Attribution Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Source</th>
                <th className="py-2 text-left">Ownership (%)</th>
              </tr>
            </thead>
            <tbody>
              {result.attributionBreakdown.map((a) => (
                <tr key={a.source} className="border-b">
                  <td className="py-1 font-semibold">{a.source}</td>
                  <td className="py-1">{a.percent.toFixed(1)}%</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="py-1">Total Constructive</td>
                <td className="py-1">{result.totalConstructive}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.isRelatedParty ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Related Party Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Total Constructive:</span><span className={`font-bold ml-2 ${Number(result.totalConstructive) >= 50 ? 'text-orange-700' : 'text-green-700'}`}>{result.totalConstructive}%</span></div>
          <div><span className="text-zinc-600">Status:</span><span className={`font-bold ml-2 ${result.isRelatedParty ? 'text-orange-700' : 'text-green-700'}`}>{result.isRelatedParty ? 'Related Party' : 'Unrelated'}</span></div>
        </div>
      </div>

      {result.isRelatedParty && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-red-700">Consequences</h2>
          <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
            {result.consequences.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={`card mb-6 ${result.isRelatedParty ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Attribution Rules Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Section 267: loss disallowance</li>
          <li>Section 318: constructive ownership</li>
          <li>Family attribution: spouse, children, parents</li>
          <li>Entity attribution: partnerships, corps, trusts</li>
          <li>50% threshold for related party</li>
          <li>80% threshold for controlled group</li>
          <li>Loss deferred on related party sale</li>
          <li>Buyer's basis = purchase price</li>
          <li>Document family/entity ownership</li>
          <li>Review before major transactions</li>
        </ul>
      </div>
    </div>
  )
}