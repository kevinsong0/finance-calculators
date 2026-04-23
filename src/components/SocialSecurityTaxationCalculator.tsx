'use client'

import { useState } from 'react'

export default function SocialSecurityTaxationCalculator() {
  const [socialSecurity, setSocialSecurity] = useState(24000)
  const [otherIncome, setOtherIncome] = useState(30000)
  const [taxExemptInterest, setTaxExemptInterest] = useState(0)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const calculate = () => {
    const provisionalIncome = otherIncome + taxExemptInterest + (socialSecurity * 0.5)

    let threshold1 = 0
    let threshold2 = 0
    if (filingStatus === 'single') {
      threshold1 = 25000
      threshold2 = 34000
    } else {
      threshold1 = 32000
      threshold2 = 44000
    }

    let taxablePercentage = 0
    let taxableSS = 0
    let maxTaxable = socialSecurity * 0.85

    if (provisionalIncome <= threshold1) {
      taxablePercentage = 0
      taxableSS = 0
    } else if (provisionalIncome <= threshold2) {
      taxablePercentage = 50
      taxableSS = Math.min((provisionalIncome - threshold1) * 0.5, socialSecurity * 0.5)
    } else {
      taxablePercentage = 85
      const lowerCalc = Math.min((threshold2 - threshold1) * 0.5, socialSecurity * 0.5)
      const upperCalc = (provisionalIncome - threshold2) * 0.85
      taxableSS = Math.min(lowerCalc + upperCalc, maxTaxable)
    }

    const actualPercentage = socialSecurity > 0 ? (taxableSS / socialSecurity) * 100 : 0
    const taxableSSAnnual = taxableSS
    const nonTaxableSS = socialSecurity - taxableSS
    const totalTaxableIncome = otherIncome + taxableSS

    return {
      socialSecurity: socialSecurity.toFixed(2),
      otherIncome: otherIncome.toFixed(2),
      taxExemptInterest: taxExemptInterest.toFixed(2),
      provisionalIncome: provisionalIncome.toFixed(2),
      threshold1: threshold1.toFixed(0),
      threshold2: threshold2.toFixed(0),
      taxableSS: taxableSS.toFixed(2),
      nonTaxableSS: nonTaxableSS.toFixed(2),
      taxablePercentage: taxablePercentage.toFixed(0),
      actualPercentage: actualPercentage.toFixed(2),
      maxTaxable: maxTaxable.toFixed(2),
      totalTaxableIncome: totalTaxableIncome.toFixed(2),
      filingStatus,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Social Security Taxation Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate how much of your Social Security benefits are taxable.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Annual Social Security Benefits ($)</label>
          <input
            type="number"
            value={socialSecurity}
            onChange={(e) => setSocialSecurity(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Income (pension, wages, dividends, etc.) ($)</label>
          <input
            type="number"
            value={otherIncome}
            onChange={(e) => setOtherIncome(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax-Exempt Interest (municipal bonds) ($)</label>
          <input
            type="number"
            value={taxExemptInterest}
            onChange={(e) => setTaxExemptInterest(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
            className="w-full border rounded p-2"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Provisional Income Calculation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Social Security (50%):</span>
            <span className="font-medium ml-2">$ {(socialSecurity * 0.5).toFixed(2)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Other Income:</span>
            <span className="font-medium ml-2">$ {result.otherIncome}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax-Exempt Interest:</span>
            <span className="font-medium ml-2">$ {result.taxExemptInterest}</span>
          </div>
          <div className="col-span-3">
            <span className="text-zinc-600 font-medium">Provisional Income:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.provisionalIncome}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Taxable Social Security</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">First Threshold:</span>
            <span className="font-medium ml-2">$ {result.threshold1}</span>
          </div>
          <div>
            <span className="text-zinc-600">Second Threshold:</span>
            <span className="font-medium ml-2">$ {result.threshold2}</span>
          </div>
          <div>
            <span className="text-zinc-600">Taxable Amount:</span>
            <span className="font-bold text-red-600 ml-2">$ {result.taxableSS}</span>
          </div>
          <div>
            <span className="text-zinc-600">Non-Taxable:</span>
            <span className="font-medium ml-2 text-green-600">$ {result.nonTaxableSS}</span>
          </div>
          <div>
            <span className="text-zinc-600">Percentage Taxable:</span>
            <span className="font-medium ml-2">{result.actualPercentage}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Max Taxable (85%):</span>
            <span className="font-medium ml-2">$ {result.maxTaxable}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Total Taxable Income:</span>
            <span className="font-bold text-orange-700 ml-2">$ {result.totalTaxableIncome}</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-3">
          Taxable Social Security is taxed at your ordinary income tax rates (not capital gains rates).
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Social Security Taxation Thresholds</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <p><strong>Single:</strong></p>
          <ul className="list-disc pl-4">
            <li>$0-$25,000 provisional income: 0% taxable</li>
            <li>$25,001-$34,000: Up to 50% taxable</li>
            <li>Over $34,000: Up to 85% taxable</li>
          </ul>
          <p className="mt-2"><strong>Married Filing Jointly:</strong></p>
          <ul className="list-disc pl-4">
            <li>$0-$32,000 provisional income: 0% taxable</li>
            <li>$32,001-$44,000: Up to 50% taxable</li>
            <li>Over $44,000: Up to 85% taxable</li>
          </ul>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mt-4">
        <h3 className="font-medium mb-2 text-purple-700">Reducing Social Security Taxation</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Convert Traditional IRA to Roth before receiving Social Security</li>
          <li>Roth IRA withdrawals do NOT count toward provisional income</li>
          <li>Delay Social Security to allow more Roth conversion time</li>
          <li>Manage investment income (dividends, capital gains)</li>
          <li>Qualified charitable distributions (age 70.5+) reduce AGI</li>
          <li>Tax-exempt interest still counts toward provisional income</li>
        </ul>
      </div>
    </div>
  )
}