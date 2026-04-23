'use client'

import { useState } from 'react'

export default function QualifiedSmallBusinessStockCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('100000')
  const [salePrice, setSalePrice] = useState<string>('500000')
  const [holdingPeriod, setHoldingPeriod] = useState<string>('5')
  const [companyType, setCompanyType] = useState<string>('QSBS')
  const [companySize, setCompanySize] = useState<string>('50')
  const [originalIssue, setOriginalIssue] = useState<string>('yes')

  const calculate = () => {
    const purchase = parseFloat(purchasePrice) || 0
    const sale = parseFloat(salePrice) || 0
    const holding = parseFloat(holdingPeriod) || 0
    const size = parseFloat(companySize) || 0
    const isOriginal = originalIssue === 'yes'
    const isQSBS = companyType === 'QSBS'

    const gain = sale - purchase

    // Section 1202 QSBS exclusion rules
    // 100% exclusion for QSBS acquired after Sept 27, 2010
    // 50% exclusion for QSBS acquired before Sept 27, 2010 (Feb 18, 2009 - Sept 27, 2010)
    // 75% exclusion for QSBS acquired Aug 10, 1993 - Feb 17, 2009

    // Requirements:
    // 1. Held more than 5 years
    // 2. Original issue (purchased directly from company, not secondary market)
    // 3. Company is qualified small business (assets < $50M at time of stock issuance)
    // 4. C corporation (not S corp, partnership, LLC)
    // 5. Active business (not investment company, holding company)

    const meets5Year = holding >= 5
    const meetsSizeTest = size <= 50
    const meetsOriginalIssue = isOriginal

    // Exclusion percentage
    let exclusionPercent = 0
    if (isQSBS && meets5Year && meetsOriginalIssue && meetsSizeTest) {
      exclusionPercent = 100 // Post Sept 27, 2010 acquisition
    }

    // Maximum exclusion: 10x investment OR $10M (whichever is greater)
    const maxExclusion10x = purchase * 10
    const maxExclusion10M = 10000000
    const maxExclusion = Math.max(maxExclusion10x, maxExclusion10M)

    // Calculate excluded gain
    const eligibleGain = Math.min(gain, maxExclusion)
    const excludedGain = eligibleGain * (exclusionPercent / 100)
    const taxableGain = gain - excludedGain

    // Alternative minimum tax (AMT) consideration
    // For QSBS, AMT preference item: 7% of excluded gain (for 50%/75% exclusion)
    // 100% exclusion: NO AMT preference
    const amtPreference = exclusionPercent < 100 ? excludedGain * 0.07 : 0

    // Estimated tax (if taxable)
    const taxRate = 0.20 // Long-term capital gains rate
    const estimatedTax = taxableGain * taxRate

    // QSBS eligibility status
    const isEligible = isQSBS && meets5Year && meetsOriginalIssue && meetsSizeTest

    // If not eligible, explain why
    const ineligibleReasons: string[] = []
    if (!isQSBS) ineligibleReasons.push('Not qualified small business stock')
    if (!meets5Year) ineligibleReasons.push('Held less than 5 years')
    if (!meetsOriginalIssue) ineligibleReasons.push('Not original issue (secondary market)')
    if (!meetsSizeTest) ineligibleReasons.push('Company assets > $50M at issuance')

    return {
      purchase,
      sale,
      gain: gain.toFixed(2),
      holding,
      isQSBS,
      meets5Year,
      meetsOriginalIssue,
      meetsSizeTest,
      isEligible,
      ineligibleReasons,
      exclusionPercent,
      maxExclusion: maxExclusion.toFixed(2),
      excludedGain: excludedGain.toFixed(2),
      taxableGain: taxableGain.toFixed(2),
      amtPreference: amtPreference.toFixed(2),
      estimatedTax: estimatedTax.toFixed(2),
      companySize: size,
      taxSavings: excludedGain * 0.20,
      hasGain: gain > 0,
      hasFullExclusion: exclusionPercent === 100 && isEligible,
      exceeds10xLimit: gain > maxExclusion10x,
      exceeds10MLimit: gain > maxExclusion10M,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Qualified Small Business Stock (QSBS) Calculator</h1>
      <p className="text-zinc-600">Calculate Section 1202 QSBS exclusion eligibility. Understand 100% capital gains exclusion for qualified small business stock held over 5 years, and $10M/10x investment limits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Stock Investment Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Sale Price ($)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period (Years)</label>
            <input
              type="number"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Company Type</label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="input"
            >
              <option value="QSBS">Qualified Small Business Stock (QSBS)</option>
              <option value="nonQSBS">Non-QSBS (S Corp, LLC, Public, etc.)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Company Assets at Issuance ($M)</label>
            <input
              type="number"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Original Issue Stock?</label>
            <select
              value={originalIssue}
              onChange={(e) => setOriginalIssue(e.target.value)}
              className="input"
            >
              <option value="yes">Yes - Purchased directly from company</option>
              <option value="no">No - Secondary market purchase</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`card ${result.isEligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <h3 className={`font-medium mb-2 ${result.isEligible ? 'text-green-700' : 'text-red-700'}`}>QSBS Eligibility</h3>
        <div className={`text-xl font-bold ${result.isEligible ? 'text-green-800' : 'text-red-800'}`}>
          {result.isEligible ? `ELIGIBLE - ${result.exclusionPercent}% EXCLUSION` : 'NOT ELIGIBLE'}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
          <div className={`${result.meets5Year ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">5-Year Test:</span>
            <span className="ml-1">{result.meets5Year ? 'PASS' : 'FAIL'} ({result.holding} years)</span>
          </div>
          <div className={`${result.meetsOriginalIssue ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Original Issue:</span>
            <span className="ml-1">{result.meetsOriginalIssue ? 'PASS' : 'FAIL'}</span>
          </div>
          <div className={`${result.meetsSizeTest ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Size Test:</span>
            <span className="ml-1">{result.meetsSizeTest ? 'PASS' : 'FAIL'} (${result.companySize}M assets)</span>
          </div>
          <div className={`${result.isQSBS ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">C Corporation:</span>
            <span className="ml-1">{result.isQSBS ? 'PASS' : 'FAIL'}</span>
          </div>
        </div>
        {result.ineligibleReasons.length > 0 && (
          <div className="text-xs text-red-600 mt-2">
            Reasons: {result.ineligibleReasons.join(', ')}
          </div>
        )}
      </div>

      {result.hasGain && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Gain Calculation</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Purchase:</span>
              <span className="font-medium ml-2">${result.purchase.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-zinc-600">Sale:</span>
              <span className="font-medium ml-2">${result.sale.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-zinc-600">Total Gain:</span>
              <span className="font-bold ml-2">${result.gain}</span>
            </div>
          </div>
        </div>
      )}

      {result.isEligible && result.hasGain && (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Section 1202 Exclusion</h3>
          <div className="text-2xl font-bold text-green-800">${result.excludedGain} TAX-FREE</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Exclusion Percentage:</span>
              <span className="font-bold ml-2">{result.exclusionPercent}%</span>
            </div>
            <div>
              <span className="text-zinc-600">Max Exclusion Limit:</span>
              <span className="font-medium ml-2">${result.maxExclusion}</span>
            </div>
          </div>
          {parseFloat(result.taxableGain) > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div>
                <span className="text-zinc-600">Taxable Gain:</span>
                <span className="font-bold ml-2 text-red-700">${result.taxableGain}</span>
              </div>
              <div>
                <span className="text-zinc-600">Estimated Tax:</span>
                <span className="font-bold ml-2 text-red-700">${result.estimatedTax}</span>
              </div>
            </div>
          )}
          <div className="text-xs text-green-600 mt-2">
            QSBS exclusion: 100% of gain excluded (if acquired after Sept 27, 2010). No federal capital gains tax.
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">QSBS Exclusion Limits</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">10x Investment Limit:</span>
            <span className="font-medium ml-2">Exclusion max = 10x cost</span>
          </div>
          <div>
            <span className="text-zinc-600">$10M Limit:</span>
            <span className="font-medium ml-2">Per issuer, per taxpayer</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          Maximum exclusion: Greater of 10x your investment OR $10M. Example: Invest $100K, max exclusion = $1M (10x). Invest $2M, max exclusion = $20M (10x exceeds $10M).
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">QSBS Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>C Corporation:</strong> Must be C corp. S corps, partnerships, LLCs do NOT qualify. Check company structure.</li>
          <li><strong>Original Issue:</strong> Must purchase directly from company (founders, investors, employees). NOT secondary market (stock exchanges).</li>
          <li><strong>Active Business:</strong> Company must actively conduct business. NOT holding company, investment company, real estate company.</li>
          <li><strong>Asset Test:</strong> Aggregate assets less than $50M at time of stock issuance. Measured immediately after issuance.</li>
          <li><strong>5-Year Holding:</strong> Must hold stock more than 5 years. Sale before 5 years = NO exclusion (regular capital gains treatment).</li>
          <li><strong>Stock Type:</strong> Common or preferred stock (not options, warrants, debt). Options/warrants converted to stock may qualify.</li>
          <li><strong>Acquisition Date:</strong> Stock acquired after Sept 27, 2010 = 100% exclusion. Earlier acquisitions = 50% or 75% exclusion.</li>
        </ul>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">QSBS Exclusion History</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Post Sept 27, 2010:</strong> 100% exclusion. No AMT preference. Best treatment.</li>
          <li><strong>Feb 18, 2009 - Sept 27, 2010:</strong> 50% exclusion. 7% AMT preference on excluded gain.</li>
          <li><strong>Aug 10, 1993 - Feb 17, 2009:</strong> 75% exclusion. 7% AMT preference on excluded gain.</li>
          <li><strong>Before Aug 10, 1993:</strong> No QSBS exclusion. Regular capital gains treatment.</li>
          <li><strong>SECURE Act 2.0:</strong> Extended QSBS treatment to certain partnership interests (75% exclusion for rollover).</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QSBS Details & Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>$10M Per Issuer:</strong> Limit applies per issuing company. Multiple QSBS investments in different companies = separate $10M limits.</li>
          <li><strong>Per Taxpayer:</strong> Married filing jointly = 2 taxpayers = $20M limit. Separate per spouse.</li>
          <li><strong>Non-QSBS Gain:</strong> Gain exceeding limit taxed as regular capital gain. 10x limit may be lower than $10M for small investments.</li>
          <li><strong>State Tax:</strong> Some states follow federal QSBS exclusion, some do not. California: does NOT follow federal. State tax may still apply.</li>
          <li><strong>Founders:</strong> Founders receiving stock for services may qualify if company meets QSBS requirements at issuance.</li>
          <li><strong>Employee Stock:</strong> Employees receiving stock may qualify. Must be actual stock (not options until exercised).</li>
          <li><strong>Rollover:</strong> Section 1045 allows rollover of QSBS gains into new QSBS. Defers recognition, maintains QSBS status.</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">QSBS Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Section 1045 Rollover:</strong> Sell QSBS, roll gain into new QSBS within 60 days. Defers recognition, maintains eligibility.</li>
          <li><strong>Multiple Investments:</strong> Invest in multiple QSBS companies. Each has separate $10M limit. Maximize total exclusion potential.</li>
          <li><strong>Hold 5 Years:</strong> Never sell before 5 years. Missed exclusion = significant tax cost. Plan exit timing.</li>
          <li><strong>Original Issue Only:</strong> Avoid secondary market purchases. Only original issue qualifies. Buy directly from company.</li>
          <li><strong>Verify QSBS Status:</strong> Get company certification that stock is QSBS. Check asset test, C corp status, active business.</li>
          <li><strong>Married Filing Jointly:</strong> Two taxpayers = $20M limit. Both spouses can claim exclusion for same QSBS investment.</li>
          <li><strong>Gift QSBS:</strong> Gift QSBS to family. Recipient gets your holding period, basis, QSBS status. May help with limit management.</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">QSBS Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Sell Before 5 Years:</strong> Most common mistake. Early exit loses entire exclusion. Regular capital gains treatment.</li>
          <li><strong>Secondary Market:</strong> Buy QSBS on secondary market. NOT original issue = no QSBS treatment.</li>
          <li><strong>S Corp/LLC:</strong> Invest in S corp or LLC, assume QSBS treatment. Only C corps qualify.</li>
          <li><strong>Assume All Startups Qualify:</strong> Not all startups are QSBS. Check asset test, business type, corporate structure.</li>
          <li><strong>Exceed Limit:</strong> Large gain exceeds $10M/10x limit. Part of gain taxed. Plan multiple investments for larger exclusions.</li>
          <li><strong>State Tax Surprise:</strong> Assume state follows federal QSBS. California, some states do NOT. State tax still applies.</li>
          <li><strong>No Documentation:</strong> Fail to get QSBS certification from company. IRS audit requires proof of QSBS status.</li>
        </ul>
      </div>
    </main>
  )
}