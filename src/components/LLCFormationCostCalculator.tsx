'use client'

import { useState } from 'react'

export default function LLCFormationCostCalculator() {
  const [state, setState] = useState('delaware')
  const [businessType, setBusinessType] = useState('service')
  const [ownerCount, setOwnerCount] = useState('1')
  const [needOperatingAgreement, setNeedOperatingAgreement] = useState(true)
  const [needEIN, setNeedEIN] = useState(true)
  const [needRegisteredAgent, setNeedRegisteredAgent] = useState(false)
  const [needBankAccount, setNeedBankAccount] = useState(true)
  const [annualRevenue, setAnnualRevenue] = useState('')

  const calculate = () => {
    const selectedState = state
    const type = businessType
    const owners = parseInt(ownerCount) || 1
    const revenue = parseFloat(annualRevenue) || 50000

    // State filing fees
    const stateFees: Record<string, number> = {
      'delaware': 90,
      'newyork': 200,
      'california': 70,
      'florida': 125,
      'texas': 200,
      'washington': 200,
      'illinois': 150,
      'georgia': 100,
      'nevada': 200,
      'wyoming': 100
    }

    const filingFee = stateFees[selectedState] || 100

    // State-specific requirements
    // New York: publication requirement (expensive)
    const publicationFee = selectedState === 'newyork' ? 800 : 0

    // California: franchise tax
    const franchiseTax = selectedState === 'california' ? 800 : 0

    // Annual state fees
    const annualFees: Record<string, number> = {
      'delaware': 300,
      'newyork': 200,
      'california': 800,
      'florida': 125,
      'texas': 0,
      'washington': 60,
      'illinois': 150,
      'georgia': 50,
      'nevada': 200,
      'wyoming': 50
    }

    const annualStateFee = annualFees[selectedState] || 50

    // Optional services costs
    const operatingAgreementCost = needOperatingAgreement ? 100 : 0
    const einCost = needEIN ? 0 : 0 // Free from IRS directly
    const einServiceCost = needEIN ? 50 : 0 // If using service
    const registeredAgentCost = needRegisteredAgent ? 200 : 0
    const bankAccountCost = needBankAccount ? 0 : 0

    // Registered agent (required if not in state)
    const needsAgent = selectedState !== 'local'
    const registeredAgentFee = needsAgent || needRegisteredAgent ? 200 : 0

    // Total one-time costs
    const oneTimeCosts = filingFee + publicationFee + franchiseTax + operatingAgreementCost + registeredAgentFee + einServiceCost

    // Annual recurring costs
    const annualCosts = annualStateFee + (needRegisteredAgent ? 200 : 0) + franchiseTax

    // Business license costs (estimated)
    const licenseFee = type === 'service' ? 50 : type === 'retail' ? 100 : type === 'professional' ? 200 : 75

    // Total first year cost
    const firstYearTotal = oneTimeCosts + annualCosts + licenseFee

    // 5-year projection
    const fiveYearCost = oneTimeCosts + (annualCosts * 5) + licenseFee

    // LLC taxation analysis
    const taxAdvantages = [
      'Pass-through taxation (avoid double taxation)',
      'Self-employment tax flexibility for some owners',
      'Can elect S-Corp for tax optimization',
      'Business expense deductions',
      'No corporate tax on retained earnings'
    ]

    // Compare with alternatives
    const soleProprietorCost = 50 // Just business license
    const corpFormationCost = filingFee + 200 // Articles of incorporation + fees
    const corpAnnualCost = annualStateFee + franchiseTax + 200 // Plus corporate tax

    return {
      filingFee: filingFee.toFixed(2),
      publicationFee: publicationFee.toFixed(2),
      franchiseTax: franchiseTax.toFixed(2),
      operatingAgreementCost: operatingAgreementCost.toFixed(2),
      registeredAgentFee: registeredAgentFee.toFixed(2),
      einCost: einCost.toFixed(2),
      oneTimeCosts: oneTimeCosts.toFixed(2),
      annualStateFee: annualStateFee.toFixed(2),
      annualRegisteredAgent: needRegisteredAgent ? 200 : 0,
      annualCosts: annualCosts.toFixed(2),
      licenseFee: licenseFee.toFixed(2),
      firstYearTotal: firstYearTotal.toFixed(2),
      fiveYearCost: fiveYearCost.toFixed(2),
      state: selectedState,
      ownerCount: owners,
      taxAdvantages,
      soleProprietorCost: soleProprietorCost.toFixed(2),
      corpFormationCost: corpFormationCost.toFixed(2),
      corpAnnualCost: corpAnnualCost.toFixed(2),
      needsPublication: selectedState === 'newyork',
      hasFranchiseTax: selectedState === 'california',
      recommendedState: owners > 1 ? 'Delaware' : 'Home state'
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">LLC Formation Cost Calculator</h1>
      <p className="text-zinc-600">Calculate LLC startup costs by state including filing fees, annual fees, and optional services.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Formation Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Formation State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="delaware">Delaware (Popular choice)</option>
              <option value="newyork">New York</option>
              <option value="california">California</option>
              <option value="florida">Florida</option>
              <option value="texas">Texas</option>
              <option value="washington">Washington</option>
              <option value="illinois">Illinois</option>
              <option value="georgia">Georgia</option>
              <option value="nevada">Nevada</option>
              <option value="wyoming">Wyoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="service">Service Business</option>
              <option value="retail">Retail/E-commerce</option>
              <option value="professional">Professional Services</option>
              <option value="real_estate">Real Estate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Owners</label>
            <select
              value={ownerCount}
              onChange={(e) => setOwnerCount(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="1">1 (Single-member LLC)</option>
              <option value="2">2</option>
              <option value="3">3-5</option>
              <option value="6">6+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-2">Optional Services</label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 bg-white rounded p-2">
                <input
                  type="checkbox"
                  checked={needOperatingAgreement}
                  onChange={(e) => setNeedOperatingAgreement(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Operating Agreement ($100)</span>
              </label>
              <label className="flex items-center gap-2 bg-white rounded p-2">
                <input
                  type="checkbox"
                  checked={needEIN}
                  onChange={(e) => setNeedEIN(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>EIN Application (Free from IRS)</span>
              </label>
              <label className="flex items-center gap-2 bg-white rounded p-2">
                <input
                  type="checkbox"
                  checked={needRegisteredAgent}
                  onChange={(e) => setNeedRegisteredAgent(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Registered Agent Service ($200/year)</span>
              </label>
              <label className="flex items-center gap-2 bg-white rounded p-2">
                <input
                  type="checkbox"
                  checked={needBankAccount}
                  onChange={(e) => setNeedBankAccount(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Business Bank Account Setup</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Cost Breakdown</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">State Filing Fee</span>
            <span className="font-bold">$${result.filingFee}</span>
          </div>
          {result.needsPublication && (
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">NY Publication Requirement</span>
              <span className="font-bold text-red-600">$${result.publicationFee}</span>
            </div>
          )}
          {result.hasFranchiseTax && (
            <div className="bg-white rounded p-3 flex justify-between">
              <span className="text-zinc-600">CA Franchise Tax (Annual)</span>
              <span className="font-bold text-red-600">$${result.franchiseTax}</span>
            </div>
          )}
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Operating Agreement</span>
            <span className="font-bold">$${result.operatingAgreementCost}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Registered Agent</span>
            <span className="font-bold">$${result.registeredAgentFee}</span>
          </div>
          <div className="bg-white rounded p-3 flex justify-between">
            <span className="text-zinc-600">Business License</span>
            <span className="font-bold">$${result.licenseFee}</span>
          </div>
          <div className="bg-zinc-100 rounded p-3 flex justify-between border-t-2 border-zinc-300">
            <span className="font-medium">Total One-Time Costs</span>
            <span className="font-bold text-blue-600">$${result.oneTimeCosts}</span>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Annual Costs</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual State Fee</div>
            <div className="text-2xl font-bold">$${result.annualStateFee}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Annual Registered Agent</div>
            <div className="text-2xl font-bold">$${result.annualRegisteredAgent}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">First Year Total</div>
            <div className="text-2xl font-bold text-blue-600">$${result.firstYearTotal}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">5-Year Total</div>
            <div className="text-2xl font-bold">$${result.fiveYearCost}</div>
          </div>
        </div>
      </div>

      {result.needsPublication && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">New York Publication Requirement</h3>
          <div className="text-sm text-yellow-600">
            NY LLCs must publish formation notice in 2 newspapers for 6 weeks. Cost: $800-2000. Waiver possible for low-income. Consider forming elsewhere if cost prohibitive.
          </div>
        </div>
      )}

      {result.hasFranchiseTax && (
        <div className="card bg-red-50 border border-red-200">
          <h3 className="font-medium mb-2 text-red-700">California Franchise Tax</h3>
          <div className="text-sm text-red-600">
            $800 annual minimum franchise tax regardless of revenue. LLCs with revenue over $250K pay additional fees. Consider if CA formation worth the cost vs your home state.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Alternative Comparison</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Sole Proprietor</strong>
            <div className="text-zinc-500">Startup: $${result.soleProprietorCost}</div>
            <div className="text-zinc-500">No liability protection</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>LLC</strong>
            <div className="text-zinc-500">Startup: $${result.firstYearTotal}</div>
            <div className="text-zinc-500">Limited liability + pass-through tax</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Corporation</strong>
            <div className="text-zinc-500">Startup: $${result.corpFormationCost}</div>
            <div className="text-zinc-500">Double taxation possible</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">LLC Tax Advantages</h3>
        <div className="text-xs text-zinc-600 space-y-1">
          {result.taxAdvantages.map((adv, idx) => (
            <div key={idx} className="bg-white rounded p-2">{idx + 1}. {adv}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">State Selection Guide</h3>
        <div className="text-xs text-zinc-600">
          Delaware: Popular for multi-owner LLCs, investor-friendly, strong legal precedent. Home state: Simpler for single-owner, no registered agent needed. Wyoming/Nevada: Low fees, privacy, asset protection. California: High franchise tax ($800), avoid if possible. Texas/Florida: No state income tax, moderate fees.
        </div>
      </div>
    </main>
  )
}