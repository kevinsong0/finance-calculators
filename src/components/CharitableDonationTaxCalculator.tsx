'use client'

import { useState } from 'react'

export default function CharitableDonationTaxCalculator() {
  const [donationAmount, setDonationAmount] = useState('10000')
  const [donationType, setDonationType] = useState('cash')
  const [assetValue, setAssetValue] = useState('15000')
  const [assetCostBasis, setAssetCostBasis] = useState('5000')
  const [holdingPeriod, setHoldingPeriod] = useState('long')
  const [filingStatus, setFilingStatus] = useState('single')
  const [grossIncome, setGrossIncome] = useState('100000')
  const [itemizedDeductions, setItemizedDeductions] = useState('12000')
  const [donorAdviceFund, setDonorAdviceFund] = useState(false)
  const [charitableOrganizationType, setCharitableOrganizationType] = useState('public')

  const calculate = () => {
    const donation = parseFloat(donationAmount) || 0
    const assetVal = parseFloat(assetValue) || 0
    const costBasis = parseFloat(assetCostBasis) || 0
    const income = parseFloat(grossIncome) || 0
    const itemized = parseFloat(itemizedDeductions) || 0
    const isLongTerm = holdingPeriod === 'long'
    const isCash = donationType === 'cash'
    const isPublicCharity = charitableOrganizationType === 'public'

    const standardDeduction = filingStatus === 'single' ? 14600 : 29200

    // AGI limits for charitable deductions
    const cashLimitPercent = isPublicCharity ? 0.60 : 0.30 // 60% for public charities, 30% for private
    const appreciatedLimitPercent = isPublicCharity ? 0.30 : 0.20 // 30% for public, 20% for private

    // Calculate deduction amount
    let deductionAmount = 0
    let capitalGainsAvoided = 0

    if (isCash) {
      deductionAmount = donation
    } else {
      // Appreciated assets
      if (isLongTerm) {
        // Long-term: Deduct FMV, avoid capital gains
        deductionAmount = assetVal
        capitalGainsAvoided = (assetVal - costBasis) * 0.15 // 15% long-term rate
      } else {
        // Short-term: Deduct cost basis only (not FMV)
        deductionAmount = costBasis
        capitalGainsAvoided = 0
      }
    }

    // Apply AGI limits
    const agiLimit = isCash ? income * cashLimitPercent : income * appreciatedLimitPercent
    const allowedDeduction = Math.min(deductionAmount, agiLimit)
    const excessCarryover = deductionAmount - allowedDeduction

    // Total itemized deductions
    const totalItemized = itemized + allowedDeduction
    const useStandardOrItemized = Math.max(standardDeduction, totalItemized)
    const benefitFromDonation = Math.max(0, totalItemized - standardDeduction)

    // Tax savings calculation
    const marginalRate = 0.22 // Approximate
    const taxSavings = benefitFromDonation * marginalRate

    // Bunching strategy analysis
    // Donate in years where itemizing exceeds standard
    const bunchingThreshold = standardDeduction - itemized
    const bunchingRecommendation = donation > bunchingThreshold ? 'Current donation enables itemizing' :
                                   bunchingThreshold > 0 ? `Bunch $${bunchingThreshold.toFixed(0)}+ to exceed standard deduction` :
                                   'Already itemizing'

    // DAF benefits
    const dafBenefits = donorAdviceFund ? {
      immediateDeduction: allowedDeduction,
      futureDistribution: 'Distribute to charities over time',
      assetDonation: 'Donate appreciated assets, avoid capital gains',
      bunching: 'Front-load donations for larger deduction year',
    } : null

    // Qualified Charitable Distribution (QCD) for age 70½+
    // Up to $105,000 from IRA directly to charity (not shown here but noted)

    // Total benefit
    const totalBenefit = taxSavings + capitalGainsAvoided

    return {
      donationAmount: donation.toFixed(2),
      donationType: isCash ? 'Cash Donation' :
                    isLongTerm ? 'Appreciated Asset (Long-term)' : 'Appreciated Asset (Short-term)',
      assetValue: assetVal.toFixed(2),
      assetCostBasis: costBasis.toFixed(2),
      capitalGains: (assetVal - costBasis).toFixed(2),
      capitalGainsAvoided: capitalGainsAvoided.toFixed(2),
      deductionAmount: deductionAmount.toFixed(2),
      agiLimit: agiLimit.toFixed(2),
      allowedDeduction: allowedDeduction.toFixed(2),
      excessCarryover: excessCarryover.toFixed(2),
      grossIncome: income.toFixed(2),
      itemizedDeductions: itemized.toFixed(2),
      totalItemized: totalItemized.toFixed(2),
      standardDeduction: standardDeduction.toFixed(0),
      useStandardOrItemized: useStandardOrItemized.toFixed(2),
      benefitFromDonation: benefitFromDonation.toFixed(2),
      taxSavings: taxSavings.toFixed(2),
      marginalRate: (marginalRate * 100).toFixed(0),
      totalBenefit: totalBenefit.toFixed(2),
      bunchingThreshold: bunchingThreshold.toFixed(2),
      bunchingRecommendation,
      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      isPublicCharity,
      donorAdviceFund,
      holdingPeriod: isLongTerm ? 'Long-term (over 1 year)' : 'Short-term (under 1 year)',
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Charitable Donation Tax Benefit Calculator</h1>
      <p className="text-zinc-600">Calculate tax benefits from charitable donations including cash, appreciated assets, and donor-advised fund strategies. Understand AGI limits, bunching, and capital gains avoidance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Donation Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Donation Type</label>
            <select
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              className="input"
            >
              <option value="cash">Cash Donation</option>
              <option value="stock">Appreciated Stock/Securities</option>
              <option value="realEstate">Real Estate/Other Property</option>
            </select>
          </div>
          {donationType === 'cash' ? (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Cash Donation Amount ($)</label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="input"
                min="0"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Asset Fair Market Value ($)</label>
                <input
                  type="number"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  className="input"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Original Cost Basis ($)</label>
                <input
                  type="number"
                  value={assetCostBasis}
                  onChange={(e) => setAssetCostBasis(e.target.value)}
                  className="input"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-600 mb-1">Holding Period</label>
                <select
                  value={holdingPeriod}
                  onChange={(e) => setHoldingPeriod(e.target.value)}
                  className="input"
                >
                  <option value="long">Long-term (held over 1 year)</option>
                  <option value="short">Short-term (held under 1 year)</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Organization Type</label>
            <select
              value={charitableOrganizationType}
              onChange={(e) => setCharitableOrganizationType(e.target.value)}
              className="input"
            >
              <option value="public">Public Charity (60% AGI limit for cash)</option>
              <option value="private">Private Foundation (30% AGI limit)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={donorAdviceFund}
              onChange={(e) => setDonorAdviceFund(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Donate through Donor-Advised Fund (DAF)</label>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Income & Deductions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single (Standard: $14,600)</option>
              <option value="married">Married Filing Jointly (Standard: $29,200)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Income (AGI) ($)</label>
            <input
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Other Itemized Deductions ($)</label>
            <input
              type="number"
              value={itemizedDeductions}
              onChange={(e) => setItemizedDeductions(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Mortgage interest, SALT (up to $10K), medical expenses over 7.5% AGI
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Donation Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Donation Type:</span>
            <span className="font-medium ml-2">{result.donationType}</span>
          </div>
          <div>
            <span className="text-zinc-600">Organization:</span>
            <span className="font-medium ml-2">{result.isPublicCharity ? 'Public Charity' : 'Private Foundation'}</span>
          </div>
          {donationType !== 'cash' && (
            <>
              <div>
                <span className="text-zinc-600">Asset FMV:</span>
                <span className="font-medium ml-2">${result.assetValue}</span>
              </div>
              <div>
                <span className="text-zinc-600">Capital Gains:</span>
                <span className="font-medium ml-2">${result.capitalGains}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Deduction Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Potential Deduction:</span>
            <span className="font-medium ml-2">${result.deductionAmount}</span>
          </div>
          <div>
            <span className="text-zinc-600">AGI Limit:</span>
            <span className="font-medium ml-2">${result.agiLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">Allowed Deduction:</span>
            <span className="font-bold ml-2">${result.allowedDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Carryover:</span>
            <span className="font-medium ml-2">${result.excessCarryover}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Itemized vs Standard Deduction</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Itemized:</span>
            <span className="font-medium ml-2">${result.totalItemized}</span>
          </div>
          <div>
            <span className="text-zinc-600">Standard Deduction:</span>
            <span className="font-medium ml-2">${result.standardDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Benefit from Donation:</span>
            <span className="font-bold ml-2">${result.benefitFromDonation}</span>
          </div>
          <div>
            <span className="text-zinc-600">Using:</span>
            <span className="font-medium ml-2">${result.useStandardOrItemized}</span>
          </div>
        </div>
      </div>

      {donationType !== 'cash' && result.holdingPeriod.includes('Long') && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Capital Gains Avoided</h3>
          <div className="text-xl font-bold text-teal-800">${result.capitalGainsAvoided}</div>
          <div className="text-sm text-teal-600 mt-1">
            Donating appreciated long-term assets avoids 15% capital gains tax on ${result.capitalGains} gain
          </div>
        </div>
      )}

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Total Tax Benefit</h3>
        <div className="text-2xl font-bold text-green-800">${result.totalBenefit}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Tax Savings:</span>
            <span className="font-medium ml-2">${result.taxSavings}</span>
          </div>
          <div>
            <span className="text-zinc-600">Capital Gains Avoided:</span>
            <span className="font-medium ml-2">${result.capitalGainsAvoided}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Bunching Strategy</h3>
        <div className="text-sm text-yellow-600">
          {result.bunchingRecommendation}
        </div>
        <div className="text-xs text-yellow-600 mt-2">
          Threshold to exceed standard: ${result.bunchingThreshold} in donations needed
        </div>
      </div>

      {result.donorAdviceFund && (
        <div className="card bg-indigo-50 border border-indigo-200">
          <h3 className="font-medium mb-2 text-indigo-700">Donor-Advised Fund Benefits</h3>
          <ul className="text-xs text-indigo-600 space-y-1 list-disc pl-4">
            <li><strong>Immediate Deduction:</strong> Get full deduction in contribution year</li>
            <li><strong>Future Distribution:</strong> Distribute to charities over multiple years</li>
            <li><strong>Appreciated Assets:</strong> Donate stock, avoid capital gains, get FMV deduction</li>
            <li><strong>Bunching Strategy:</strong> Front-load years of donations for larger deduction</li>
            <li><strong>Investment Growth:</strong> Assets in DAF can grow tax-free before distribution</li>
          </ul>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Rules & Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>AGI Limits:</strong> Cash: 60% AGI (public charity). Appreciated: 30% AGI. Excess carries forward 5 years.</li>
          <li><strong>Appreciated Assets:</strong> Long-term: Deduct FMV, avoid gains. Short-term: Deduct cost basis only.</li>
          <li><strong>Bunching:</strong> Combine multiple years of donations in one year to exceed standard deduction.</li>
          <li><strong>QCD (Age 70½+):</strong> Up to $105,000 from IRA directly to charity. Not itemized but reduces AGI.</li>
          <li><strong>Private Foundations:</strong> 30% AGI limit for cash, 20% for appreciated. Stricter rules.</li>
          <li><strong>Documentation:</strong> Cash under $250: receipt. $250+: written acknowledgment. Non-cash: Form 8283.</li>
          <li><strong>$5,000+ Non-cash:</strong> Qualified appraisal required. Attach to Form 8283.</li>
          <li><strong>Estate Planning:</strong> Charitable bequests unlimited deduction, reduce estate tax.</li>
        </ul>
      </div>
    </main>
  )
}