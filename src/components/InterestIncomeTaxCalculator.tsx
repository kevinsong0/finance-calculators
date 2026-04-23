'use client'

import { useState } from 'react'

export default function InterestIncomeTaxCalculator() {
  const [interestIncome, setInterestIncome] = useState(5000)
  const [interestType, setInterestType] = useState<'ordinary' | 'municipal' | 'treasury' | 'mixed'>('ordinary')
  const [municipalAmount, setMunicipalAmount] = useState(0)
  const [treasuryAmount, setTreasuryAmount] = useState(0)
  const [ordinaryAmount, setOrdinaryAmount] = useState(5000)
  const [otherIncome, setOtherIncome] = useState(75000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'>('marriedJoint')
  const [stateTaxRate, setStateTaxRate] = useState(5)
  const [isAMTSubject, setIsAMTSubject] = useState(false)
  const [socialSecurityBenefits, setSocialSecurityBenefits] = useState(0)

  const calculate = () => {
    // Interest Income Tax Calculator
    // Different types of interest have different tax treatment

    // Ordinary interest: fully taxable at federal and state
    // - Bank accounts, CDs, corporate bonds
    // - Taxed as ordinary income (10-37% rates)

    // Municipal bond interest:
    // - Federal tax-free
    // - State tax-free if from home state
    // - May be subject to AMT (private activity bonds)
    // - Increases AGI for Social Security taxation

    // Treasury interest:
    // - Federal taxable
    // - State tax-free (all states)
    // - No AMT impact

    const ordinary = ordinaryAmount
    const treasury = treasuryAmount
    const municipal = municipalAmount
    const totalInterest = ordinary + treasury + municipal

    // Federal tax brackets (simplified)
    const brackets = {
      single: [{ min: 0, max: 11600, rate: 10 }, { min: 11600, max: 47150, rate: 12 }, { min: 47150, max: 100525, rate: 22 }],
      marriedJoint: [{ min: 0, max: 23200, rate: 10 }, { min: 23200, max: 94300, rate: 12 }, { min: 94300, max: 201050, rate: 22 }],
      marriedSeparate: [{ min: 0, max: 11600, rate: 10 }, { min: 11600, max: 47150, rate: 12 }, { min: 47150, max: 100525, rate: 22 }],
      headOfHousehold: [{ min: 0, max: 16550, rate: 10 }, { min: 16550, max: 63100, rate: 12 }, { min: 63100, max: 100500, rate: 22 }],
    }

    // Calculate federal tax on taxable interest
    const taxableFederalInterest = ordinary + treasury // Municipal is federal tax-free
    const totalOrdinaryIncome = otherIncome + taxableFederalInterest

    // Simplified federal tax calculation
    const marginalRate = 0.24
    const federalInterestTax = taxableFederalInterest * marginalRate

    // State tax calculation
    // Treasury: state tax-free
    // Municipal: tax-free if home state (assume it is)
    // Ordinary: fully taxable
    const taxableStateInterest = ordinary // Treasury and municipal state tax-free
    const stateInterestTax = taxableStateInterest * (stateTaxRate / 100)

    // Total interest tax
    const totalInterestTax = federalInterestTax + stateInterestTax

    // Tax savings from municipal bonds
    const municipalFederalSavings = municipal * marginalRate
    const municipalStateSavings = municipal * (stateTaxRate / 100)
    const totalMunicipalSavings = municipalFederalSavings + municipalStateSavings

    // Tax savings from Treasury bonds
    const treasuryStateSavings = treasury * (stateTaxRate / 100)

    // AMT impact on municipal bonds
    // Private activity bonds: tax preference item
    const amtPreferenceAmount = isAMTSubject ? municipal * 0.75 : 0 // Simplified

    // Social Security taxation impact
    // Municipal interest included in combined income for SS taxation
    let ssTaxationNote = ''
    if (socialSecurityBenefits > 0) {
      const combinedIncome = totalOrdinaryIncome + municipal + (socialSecurityBenefits / 2)
      const ssThreshold = filingStatus === 'marriedJoint' ? 32000 : 25000
      if (combinedIncome > ssThreshold) {
        ssTaxationNote = 'Municipal interest increases combined income - may cause Social Security taxation'
      } else {
        ssTaxationNote = 'Combined income below threshold - Social Security not taxed'
      }
    }

    // Effective rate on interest
    const effectiveInterestRate = totalInterest > 0 ? (totalInterestTax / totalInterest) * 100 : 0

    // Comparison by type
    const typeComparison = [
      { type: 'Ordinary Interest', amount: ordinary, federalTax: ordinary * marginalRate, stateTax: ordinary * (stateTaxRate / 100), totalTax: ordinary * marginalRate + ordinary * (stateTaxRate / 100) },
      { type: 'Treasury Interest', amount: treasury, federalTax: treasury * marginalRate, stateTax: 0, totalTax: treasury * marginalRate },
      { type: 'Municipal Interest', amount: municipal, federalTax: 0, stateTax: 0, totalTax: 0 },
    ]

    // Tax-equivalent yield calculation
    // What taxable yield equals tax-free yield after tax?
    const taxEquivalentMunicipalYield = municipal > 0
      ? (1 / (1 - marginalRate - stateTaxRate / 100)) * 100 // Simplified formula
      : 0

    // Recommendation
    let recommendation = ''
    if (municipal > totalInterest * 0.5) {
      recommendation = `High municipal allocation: saves $${totalMunicipalSavings.toFixed(0)} in taxes. Tax-equivalent yield: consider if taxable bonds offer higher after-tax return.`
    } else if (treasury > 0 && stateTaxRate > 0) {
      recommendation = `Treasury bonds: state tax savings $${treasuryStateSavings.toFixed(0)}. Good for high state tax residents.`
    } else if (ordinary === totalInterest) {
      recommendation = `All ordinary interest: taxed at ${marginalRate * 100}% federal + ${stateTaxRate}% state. Consider tax-advantaged alternatives.`
    } else {
      recommendation = 'Mixed interest types optimize tax efficiency. Track each type separately.'
    }

    // Interest types explanation
    const interestTypes = {
      ordinary: 'Bank accounts, CDs, corporate bonds, savings accounts - fully taxable',
      municipal: 'State/local government bonds - federal tax-free, state tax-free if home state',
      treasury: 'US Treasury bills, notes, bonds - federal taxable, state tax-free',
    }

    return {
      interestIncome: totalInterest.toFixed(0),
      interestType,
      municipalAmount: municipal.toFixed(0),
      treasuryAmount: treasury.toFixed(0),
      ordinaryAmount: ordinary.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      otherIncome: otherIncome.toFixed(0),
      filingStatus,
      stateTaxRate: stateTaxRate.toFixed(0),
      isAMTSubject,
      socialSecurityBenefits: socialSecurityBenefits.toFixed(0),
      taxableFederalInterest: taxableFederalInterest.toFixed(0),
      federalInterestTax: federalInterestTax.toFixed(0),
      taxableStateInterest: taxableStateInterest.toFixed(0),
      stateInterestTax: stateInterestTax.toFixed(0),
      totalInterestTax: totalInterestTax.toFixed(0),
      municipalFederalSavings: municipalFederalSavings.toFixed(0),
      municipalStateSavings: municipalStateSavings.toFixed(0),
      totalMunicipalSavings: totalMunicipalSavings.toFixed(0),
      treasuryStateSavings: treasuryStateSavings.toFixed(0),
      amtPreferenceAmount: amtPreferenceAmount.toFixed(0),
      ssTaxationNote,
      effectiveInterestRate: effectiveInterestRate.toFixed(1),
      typeComparison,
      marginalRate: (marginalRate * 100).toFixed(0),
      taxEquivalentMunicipalYield: taxEquivalentMunicipalYield.toFixed(1),
      recommendation,
      interestTypes,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Interest Income Tax Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on different types of interest income.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Ordinary Interest</label>
          <input type="number" value={ordinaryAmount} onChange={(e) => setOrdinaryAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Municipal Bond Interest</label>
          <input type="number" value={municipalAmount} onChange={(e) => setMunicipalAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Treasury Interest</label>
          <input type="number" value={treasuryAmount} onChange={(e) => setTreasuryAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Income</label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold')} className="w-full border rounded p-2">
            <option value="single">Single</option>
            <option value="marriedJoint">Married Filing Jointly</option>
            <option value="marriedSeparate">Married Filing Separately</option>
            <option value="headOfHousehold">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateTaxRate} min="0" max="15" onChange={(e) => setStateTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject to AMT?</label>
          <select value={isAMTSubject ? 'yes' : 'no'} onChange={(e) => setIsAMTSubject(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - not subject</option>
            <option value="yes">Yes - AMT applies</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Social Security Benefits</label>
          <input type="number" value={socialSecurityBenefits} onChange={(e) => setSocialSecurityBenefits(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Interest Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Ordinary:</span><span className="font-medium ml-2">$ {result.ordinaryAmount}</span></div>
          <div><span className="text-zinc-600">Municipal:</span><span className="font-bold text-green-700 ml-2">$ {result.municipalAmount}</span></div>
          <div><span className="text-zinc-600">Treasury:</span><span className="font-medium ml-2">$ {result.treasuryAmount}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total:</span><span className="font-bold ml-2">$ {result.totalInterest}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax by Interest Type</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Federal</th>
                <th className="py-2 text-left">State</th>
                <th className="py-2 text-left">Total Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.typeComparison.map((t) => (
                <tr key={t.type} className="border-b">
                  <td className="py-1 font-semibold">{t.type}</td>
                  <td className="py-1">$ {t.amount.toFixed(0)}</td>
                  <td className="py-1">$ {t.federalTax.toFixed(0)}</td>
                  <td className="py-1">$ {t.stateTax.toFixed(0)}</td>
                  <td className="py-1 font-bold">$ {t.totalTax.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Interest Tax</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Federal:</span><span className="font-bold text-orange-700 ml-2">$ {result.federalInterestTax}</span></div>
          <div><span className="text-zinc-600">State:</span><span className="font-medium ml-2">$ {result.stateInterestTax}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-red-700 ml-2">$ {result.totalInterestTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveInterestRate}%</span></div>
        </div>
      </div>

      {Number(result.municipalAmount) > 0 && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-green-700">Municipal Bond Tax Savings</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Federal Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.municipalFederalSavings}</span></div>
            <div><span className="text-zinc-600">State Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.municipalStateSavings}</span></div>
            <div><span className="text-zinc-600">Total Saved:</span><span className="font-bold text-green-700 ml-2">$ {result.totalMunicipalSavings}</span></div>
          </div>
        </div>
      )}

      {Number(result.treasuryAmount) > 0 && Number(result.stateTaxRate) > 0 && (
        <div className="card bg-blue-50 border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Treasury Bond State Savings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">State Tax Saved:</span><span className="font-bold text-blue-700 ml-2">$ {result.treasuryStateSavings}</span></div>
          </div>
        </div>
      )}

      {result.isAMTSubject && Number(result.municipalAmount) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-orange-700">AMT Warning</h2>
          <div className="text-xs text-zinc-600">Private activity municipal bonds: AMT preference item of $ {result.amtPreferenceAmount}</div>
        </div>
      )}

      {Number(result.socialSecurityBenefits) > 0 && (
        <div className="card bg-purple-50 border border-purple-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Social Security Impact</h2>
          <div className="text-xs text-zinc-600">{result.ssTaxationNote}</div>
        </div>
      )}

      <div className={`card mb-6 bg-green-50 border border-green-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Interest Types</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Ordinary:</span> {result.interestTypes.ordinary}</div>
          <div><span className="font-semibold">Municipal:</span> {result.interestTypes.municipal}</div>
          <div><span className="font-semibold">Treasury:</span> {result.interestTypes.treasury}</div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Interest Income Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Ordinary: fully taxable</li>
          <li>Municipal: federal tax-free</li>
          <li>Treasury: state tax-free</li>
          <li>Home state muni: state tax-free</li>
          <li>Private activity: AMT applies</li>
          <li>Muni affects SS taxation</li>
          <li>Report on Schedule B</li>
          <li>$1,500 threshold for filing</li>
          <li>Form 1099-INT reporting</li>
          <li>Consider tax-equivalent yield</li>
        </ul>
      </div>
    </div>
  )
}