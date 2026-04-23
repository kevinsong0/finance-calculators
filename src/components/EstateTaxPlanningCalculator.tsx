'use client'

import { useState } from 'react'

export default function EstateTaxPlanningCalculator() {
  const [estateValue, setEstateValue] = useState<string>('5000000')
  const [priorGifts, setPriorGifts] = useState<string>('0')
  const [maritalStatus, setMaritalStatus] = useState<string>('single')
  const [state, setState] = useState<string>('none')

  const calculate = () => {
    const estate = parseFloat(estateValue) || 0
    const gifts = parseFloat(priorGifts) || 0
    const isMarried = maritalStatus === 'married'

    // 2026 Federal estate tax exemption (Tax Cuts and Jobs Act sunset)
    const federalExemptionSingle = 7000000 // Projected 2026 exemption after TCJA sunset
    const federalExemptionMarried = federalExemptionSingle * 2

    // Current exemption (2025) is approximately $13.99M per person
    // After TCJA sunset at end of 2025, exemption drops to ~$7M (projected)

    const federalExemption = isMarried ? federalExemptionMarried : federalExemptionSingle

    // Taxable estate (after lifetime gifts used exemption)
    const taxableEstate = Math.max(0, estate + gifts - federalExemption)

    // Federal estate tax rates (progressive, max 40%)
    let federalTax = 0
    if (taxableEstate > 0) {
      // Simplified calculation using 40% top rate for amounts over exemption
      // Actual rates are progressive from 18% to 40%
      federalTax = taxableEstate * 0.40
    }

    // State estate/inheritance tax (some states have separate taxes)
    const stateExemptions: Record<string, number> = {
      'none': 0,
      'NY': 6580000,
      'MA': 2000000,
      'CT': 12920000,
      'OR': 1000000,
      'IL': 4000000,
      'MN': 3000000,
      'NJ': 675000, // Inheritance tax
      'PA': 0, // Inheritance tax
      'IA': 0, // Inheritance tax
      'KY': 0, // Inheritance tax
      'NE': 0, // Inheritance tax
      'MD': 5000000,
      'HI': 6580000,
      'VT': 5000000,
      'WA': 2617000,
      'DC': 4000000,
    }

    const stateRates: Record<string, number> = {
      'none': 0,
      'NY': 0.16,
      'MA': 0.16,
      'CT': 0.12,
      'OR': 0.10,
      'IL': 0.10,
      'MN': 0.10,
      'NJ': 0.11, // Inheritance tax (varies by heir)
      'PA': 0.15, // Inheritance tax (varies by heir)
      'IA': 0.12, // Inheritance tax
      'KY': 0.16, // Inheritance tax
      'NE': 0.18, // Inheritance tax
      'MD': 0.10,
      'HI': 0.20,
      'VT': 0.16,
      'WA': 0.20,
      'DC': 0.14,
    }

    const stateExemption = stateExemptions[state] || 0
    const stateRate = stateRates[state] || 0
    const taxableEstateState = Math.max(0, estate - stateExemption)
    const stateTax = taxableEstateState * stateRate

    // Total tax
    const totalTax = federalTax + stateTax

    // Net to heirs
    const netToHeirs = estate - totalTax

    // Effective tax rate
    const effectiveRate = estate > 0 ? (totalTax / estate) * 100 : 0

    // Exemption remaining
    const exemptionUsed = Math.min(estate + gifts, federalExemption)
    const exemptionRemaining = federalExemption - exemptionUsed

    return {
      estate,
      gifts,
      federalExemption: federalExemption.toFixed(0),
      taxableEstate: taxableEstate.toFixed(2),
      federalTax: federalTax.toFixed(2),
      stateExemption: stateExemption.toFixed(0),
      stateTax: stateTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netToHeirs: netToHeirs.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      exemptionRemaining: exemptionRemaining.toFixed(0),
      isMarried,
      state,
      hasTaxableEstate: taxableEstate > 0,
      hasStateTax: stateTax > 0,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Estate Tax Planning Calculator</h1>
      <p className="text-zinc-600">Calculate federal and state estate tax liability. Understand exemption thresholds, tax rates, and planning strategies to minimize estate taxes and maximize inheritance for heirs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Estate Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Estate Value ($)</label>
            <input
              type="number"
              value={estateValue}
              onChange={(e) => setEstateValue(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Lifetime Gifts Made ($)</label>
            <input
              type="number"
              value={priorGifts}
              onChange={(e) => setPriorGifts(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Marital Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single / Unmarried</option>
              <option value="married">Married (portable exemption)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">State (if estate/inheritance tax)</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input"
            >
              <option value="none">No State Tax</option>
              <option value="NY">New York</option>
              <option value="MA">Massachusetts</option>
              <option value="CT">Connecticut</option>
              <option value="OR">Oregon</option>
              <option value="IL">Illinois</option>
              <option value="MN">Minnesota</option>
              <option value="MD">Maryland</option>
              <option value="NJ">New Jersey (Inheritance)</option>
              <option value="PA">Pennsylvania (Inheritance)</option>
              <option value="IA">Iowa (Inheritance)</option>
              <option value="KY">Kentucky (Inheritance)</option>
              <option value="NE">Nebraska (Inheritance)</option>
              <option value="HI">Hawaii</option>
              <option value="VT">Vermont</option>
              <option value="WA">Washington</option>
              <option value="DC">District of Columbia</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Federal Estate Tax Exemption (2026)</h3>
        <div className="text-xl font-bold text-purple-800">
          ${result.isMarried ? '$14,000,000' : '$7,000,000'} (Projected)
        </div>
        <div className="text-xs text-purple-600 mt-2">
          TCJA exemption (~$13.99M) sunsets end of 2025. Projected exemption ~$7M per person in 2026. Married couples can port unused exemption.
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Your Exemption:</span>
            <span className="font-bold ml-2">${result.federalExemption}</span>
          </div>
          <div>
            <span className="text-zinc-600">Remaining:</span>
            <span className="font-bold ml-2">${result.exemptionRemaining}</span>
          </div>
        </div>
      </div>

      {result.hasTaxableEstate && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">Federal Estate Tax</h3>
          <div className="text-2xl font-bold text-red-800">${result.federalTax}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">Taxable Estate:</span>
              <span className="font-bold ml-2">${result.taxableEstate}</span>
            </div>
            <div>
              <span className="text-zinc-600">Top Rate:</span>
              <span className="font-medium ml-2">40%</span>
            </div>
          </div>
          <div className="text-xs text-red-600 mt-2">
            Federal estate tax rates: 18% to 40% progressive. Amounts over exemption taxed at up to 40%.
          </div>
        </div>
      )}

      {result.hasStateTax && (
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">State Estate/Inheritance Tax</h3>
          <div className="text-xl font-bold text-orange-800">${result.stateTax}</div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="text-zinc-600">State Exemption:</span>
              <span className="font-medium ml-2">${result.stateExemption}</span>
            </div>
            <div>
              <span className="text-zinc-600">State:</span>
              <span className="font-medium ml-2">{result.state}</span>
            </div>
          </div>
          <div className="text-xs text-orange-600 mt-2">
            State estate tax separate from federal. Some states have lower exemptions. Inheritance tax based on heir relationship.
          </div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Estate Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Estate:</span>
            <span className="font-bold ml-2">${result.estate.toFixed(0)}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.totalTax) > 0 ? 'text-red-700' : 'text-green-700'}`}>
              ${result.totalTax}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Net to Heirs:</span>
            <span className="font-bold ml-2 text-green-700">${result.netToHeirs}</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Tax Rate:</span>
            <span className="font-bold ml-2">{result.effectiveRate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Estate Tax Reduction Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Annual Gift Exclusion:</strong> Gift up to $18K per person per year (2024). Unlimited recipients. Removes assets from estate.</li>
          <li><strong>Lifetime Gifts:</strong> Use exemption during life. Gifts reduce estate but also use exemption. Plan carefully.</li>
          <li><strong>Irrevocable Trusts:</strong> Transfer assets to irrevocable trust. Removes from estate. Grantor retains no control.</li>
          <li><strong>Life Insurance Trust (ILIT):</strong> Life insurance proceeds in ILIT. Excluded from estate. Pay premiums via gifts.</li>
          <li><strong>Charitable Remainder Trust:</strong> Income during life, remainder to charity. Reduces estate, income tax deduction.</li>
          <li><strong>Family Limited Partnership:</strong> Transfer business assets to FLP. Valuation discounts reduce estate value.</li>
          <li><strong>Portability Election:</strong> Married: deceased spouse's unused exemption transfers to surviving spouse. File estate tax return.</li>
          <li><strong>Spousal Transfer:</strong> Unlimited marital deduction. Assets to spouse tax-free. But spouse's estate later taxed.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Federal Estate Tax Rates</h3>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Taxable Amount Over</th>
                <th className="text-left p-2">Rate</th>
                <th className="text-left p-2">Tax on Base</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">$0</td>
                <td className="p-2">18%</td>
                <td className="p-2">$0</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$10,000</td>
                <td className="p-2">20%</td>
                <td className="p-2">$1,800</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$20,000</td>
                <td className="p-2">22%</td>
                <td className="p-2">$3,800</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$40,000</td>
                <td className="p-2">24%</td>
                <td className="p-2">$8,200</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$60,000</td>
                <td className="p-2">26%</td>
                <td className="p-2">$13,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$80,000</td>
                <td className="p-2">28%</td>
                <td className="p-2">$18,200</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$100,000</td>
                <td className="p-2">30%</td>
                <td className="p-2">$23,800</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$150,000</td>
                <td className="p-2">32%</td>
                <td className="p-2">$38,800</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$250,000</td>
                <td className="p-2">34%</td>
                <td className="p-2">$70,800</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$500,000</td>
                <td className="p-2">37%</td>
                <td className="p-2">$155,800</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">$750,000</td>
                <td className="p-2">39%</td>
                <td className="p-2">$248,300</td>
              </tr>
              <tr>
                <td className="p-2">$1,000,000+</td>
                <td className="p-2 font-bold">40%</td>
                <td className="p-2">$345,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">State Estate/Inheritance Taxes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Estate Tax States:</strong> NY, MA, CT, OR, IL, MN, MD, HI, VT, WA, DC. Tax on estate before distribution.</li>
          <li><strong>Inheritance Tax States:</strong> NJ, PA, IA, KY, NE. Tax on heir based on relationship. Spouse usually exempt.</li>
          <li><strong>Lower Exemptions:</strong> Many states have lower exemptions than federal. MA exemption only $2M.</li>
          <li><strong>No Portability:</strong> State exemptions usually not portable between spouses. Each spouse separate exemption.</li>
          <li><strong>Cliff Effect:</strong> Some states (NY) tax entire estate if exceeds exemption by even $1. No graduated tax.</li>
          <li><strong>Planning Required:</strong> If live in state with estate tax, additional planning needed beyond federal.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Estate Planning Basics</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Will:</strong> Basic document directing asset distribution. Subject to probate. Can include tax planning provisions.</li>
          <li><strong>Revocable Trust:</strong> Avoids probate. Assets in trust during life. Revocable - can change. Still in estate for tax.</li>
          <li><strong>Irrevocable Trust:</strong> Removes assets from estate. Cannot change. Estate tax benefit. Lose control.</li>
          <li><strong>Probate:</strong> Court process for wills. Costs, delays, public. Trusts avoid probate.</li>
          <li><strong>Beneficiary Designations:</strong> Retirement accounts, life insurance pass by designation. Not in will/trust usually.</li>
          <li><strong>Power of Attorney:</strong> Financial decisions if incapacitated. Estate planning essential document.</li>
          <li><strong>Healthcare Directive:</strong> Medical decisions if incapacitated. Living will, healthcare proxy.</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Estate Tax Mistakes</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Not Planning:</strong> Many don't plan until too late. Estate tax can take 40% of excess over exemption.</li>
          <li><strong>TCJA Sunset:</strong> Assuming $13.99M exemption forever. SUNSET end of 2025 - exemption drops to ~$7M.</li>
          <li><strong>State Tax:</strong> Ignoring state estate tax. Some have much lower exemptions than federal.</li>
          <li><strong>No Portability:</strong> Not filing estate tax return for portability. First spouse dies - unused exemption lost if not filed.</li>
          <li><strong>Beneficiary Designations:</strong> Not updating. Old designations override will. Ex-spouse may inherit.</li>
          <li><strong>Trust Funding:</strong> Created trust but didn't transfer assets. Empty trust = no benefit.</li>
        </ul>
      </div>
    </main>
  )
}