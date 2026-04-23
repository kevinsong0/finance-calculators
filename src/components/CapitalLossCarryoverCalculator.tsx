'use client'

import { useState } from 'react'

export default function CapitalLossCarryoverCalculator() {
  const [priorYearLoss, setPriorYearLoss] = useState('-15000')
  const [currentYearStGains, setCurrentYearStGains] = useState('5000')
  const [currentYearLtGains, setCurrentYearLtGains] = useState('10000')
  const [currentYearStLosses, setCurrentYearStLosses] = useState('0')
  const [currentYearLtLosses, setCurrentYearLtLosses] = useState('0')
  const [ordinaryIncome, setOrdinaryIncome] = useState('80000')
  const [filingStatus, setFilingStatus] = useState('single')
  const [carryoverType, setCarryoverType] = useState('mixed')

  const calculate = () => {
    const priorLoss = parseFloat(priorYearLoss) || 0 // Should be negative
    const stGains = parseFloat(currentYearStGains) || 0
    const ltGains = parseFloat(currentYearLtGains) || 0
    const stLosses = parseFloat(currentYearStLosses) || 0
    const ltLosses = parseFloat(currentYearLtLosses) || 0
    const income = parseFloat(ordinaryIncome) || 0

    // Prior year carryover analysis
    // Determine if prior loss is ST, LT, or mixed (assume mixed for simplicity, user can adjust)
    const priorStLoss = carryoverType === 'st' ? priorLoss : carryoverType === 'lt' ? 0 : priorLoss / 2
    const priorLtLoss = carryoverType === 'lt' ? priorLoss : carryoverType === 'st' ? 0 : priorLoss / 2

    // Current year net gains/losses
    const netStGainsCurrent = stGains - stLosses
    const netLtGainsCurrent = ltGains - ltLosses

    // Apply carryover losses
    // Short-term losses first offset short-term gains, then long-term gains, then ordinary income
    // Long-term losses first offset long-term gains, then short-term gains, then ordinary income

    let totalStLossAvailable = Math.abs(priorStLoss) + (netStGainsCurrent < 0 ? Math.abs(netStGainsCurrent) : 0)
    let totalLtLossAvailable = Math.abs(priorLtLoss) + (netLtGainsCurrent < 0 ? Math.abs(netLtGainsCurrent) : 0)

    // Step 1: ST losses offset ST gains first
    let remainingStGains = netStGainsCurrent > 0 ? netStGainsCurrent : 0
    let stLossUsedForSt = Math.min(totalStLossAvailable, remainingStGains)
    remainingStGains -= stLossUsedForSt
    totalStLossAvailable -= stLossUsedForSt

    // Step 2: LT losses offset LT gains first
    let remainingLtGains = netLtGainsCurrent > 0 ? netLtGainsCurrent : 0
    let ltLossUsedForLt = Math.min(totalLtLossAvailable, remainingLtGains)
    remainingLtGains -= ltLossUsedForLt
    totalLtLossAvailable -= ltLossUsedForLt

    // Step 3: ST losses offset LT gains (cross-offset)
    let stLossUsedForLt = Math.min(totalStLossAvailable, remainingLtGains)
    remainingLtGains -= stLossUsedForLt
    totalStLossAvailable -= stLossUsedForLt

    // Step 4: LT losses offset ST gains (cross-offset)
    let ltLossUsedForSt = Math.min(totalLtLossAvailable, remainingStGains)
    remainingStGains -= ltLossUsedForSt
    totalLtLossAvailable -= ltLossUsedForSt

    // Step 5: Remaining losses offset ordinary income ($3000 max)
    const totalRemainingLoss = totalStLossAvailable + totalLtLossAvailable
    const ordinaryDeductionLimit = filingStatus === 'marriedSeparate' ? 1500 : 3000
    const ordinaryDeduction = Math.min(totalRemainingLoss, ordinaryDeductionLimit)

    // Final net gains/losses
    const finalNetStGains = remainingStGains
    const finalNetLtGains = remainingLtGains
    const finalNetGains = finalNetStGains + finalNetLtGains

    // New carryover for next year
    const newCarryover = totalRemainingLoss - ordinaryDeduction
    const newStCarryover = Math.max(0, totalStLossAvailable - ordinaryDeduction / 2) // Approximate split
    const newLtCarryover = Math.max(0, totalLtLossAvailable - ordinaryDeduction / 2)

    // Tax calculation
    const stRate = 0.35 // Approximate marginal rate for ST gains
    const ltRate = 0.15 // Preferential rate for LT gains
    const ordinaryRate = 0.22

    // Without carryover (what tax would be)
    const taxWithoutCarryoverSt = netStGainsCurrent > 0 ? netStGainsCurrent * stRate : 0
    const taxWithoutCarryoverLt = netLtGainsCurrent > 0 ? netLtGainsCurrent * ltRate : 0
    const taxWithoutCarryover = taxWithoutCarryoverSt + taxWithoutCarryoverLt

    // With carryover applied
    const taxWithCarryoverSt = finalNetStGains > 0 ? finalNetStGains * stRate : 0
    const taxWithCarryoverLt = finalNetLtGains > 0 ? finalNetLtGains * ltRate : 0
    const ordinaryTaxSavings = ordinaryDeduction * ordinaryRate
    const taxWithCarryover = taxWithCarryoverSt + taxWithCarryoverLt - ordinaryTaxSavings

    const taxSavings = taxWithoutCarryover - taxWithCarryover + ordinaryTaxSavings

    // 5-year projection
    const projection = []
    let projectedCarryover = newCarryover
    for (let year = 1; year <= 5; year++) {
      const projectedDeduction = Math.min(projectedCarryover, ordinaryDeductionLimit)
      const projectedSavings = projectedDeduction * ordinaryRate
      projectedCarryover = Math.max(0, projectedCarryover - projectedDeduction)
      projection.push({
        year,
        carryover: projectedCarryover.toFixed(0),
        deduction: projectedDeduction.toFixed(0),
        savings: projectedSavings.toFixed(0),
      })
    }

    return {
      priorYearLoss: Math.abs(priorLoss).toFixed(2),
      priorStLoss: Math.abs(priorStLoss).toFixed(2),
      priorLtLoss: Math.abs(priorLtLoss).toFixed(2),
      carryoverType: carryoverType === 'st' ? 'Short-Term' : carryoverType === 'lt' ? 'Long-Term' : 'Mixed (50/50)',
      currentYearStGains: stGains.toFixed(2),
      currentYearLtGains: ltGains.toFixed(2),
      currentYearStLosses: stLosses.toFixed(2),
      currentYearLtLosses: ltLosses.toFixed(2),
      netStGainsCurrent: netStGainsCurrent.toFixed(2),
      netLtGainsCurrent: netLtGainsCurrent.toFixed(2),
      filingStatus: filingStatus === 'single' ? 'Single' : filingStatus === 'marriedSeparate' ? 'Married Filing Separately' : 'Married Filing Jointly',

      totalStLossAvailable: (Math.abs(priorStLoss) + (netStGainsCurrent < 0 ? Math.abs(netStGainsCurrent) : 0)).toFixed(2),
      totalLtLossAvailable: (Math.abs(priorLtLoss) + (netLtGainsCurrent < 0 ? Math.abs(netLtGainsCurrent) : 0)).toFixed(2),

      stLossUsedForSt: stLossUsedForSt.toFixed(2),
      stLossUsedForLt: stLossUsedForLt.toFixed(2),
      ltLossUsedForLt: ltLossUsedForLt.toFixed(2),
      ltLossUsedForSt: ltLossUsedForSt.toFixed(2),
      totalLossApplied: (stLossUsedForSt + stLossUsedForLt + ltLossUsedForLt + ltLossUsedForSt).toFixed(2),

      finalNetStGains: finalNetStGains.toFixed(2),
      finalNetLtGains: finalNetLtGains.toFixed(2),
      finalNetGains: finalNetGains.toFixed(2),
      hasFinalGains: finalNetGains > 0,

      ordinaryDeductionLimit: ordinaryDeductionLimit.toFixed(0),
      ordinaryDeduction: ordinaryDeduction.toFixed(2),
      ordinaryTaxSavings: ordinaryTaxSavings.toFixed(2),

      newCarryover: newCarryover.toFixed(2),
      newStCarryover: newStCarryover.toFixed(2),
      newLtCarryover: newLtCarryover.toFixed(2),
      hasNewCarryover: newCarryover > 0,

      taxWithoutCarryover: taxWithoutCarryover.toFixed(2),
      taxWithCarryover: taxWithCarryover.toFixed(2),
      taxSavings: taxSavings.toFixed(2),

      projection,

      priorLossNegative: priorLoss < 0,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Capital Loss Carryover Calculator</h1>
      <p className="text-zinc-600">Track and calculate capital loss carryovers from prior years. Apply carryover losses against current year gains, understand offset rules, and project future year deductions.</p>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Prior Year Carryover Loss</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Prior Year Loss Amount ($)</label>
            <input
              type="number"
              value={priorYearLoss}
              onChange={(e) => setPriorYearLoss(e.target.value)}
              className="input"
            />
            <div className="text-xs text-yellow-600 mt-1">
              Enter negative value for loss carryover. Example: -15000 means $15,000 loss carried forward.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Carryover Type</label>
            <select
              value={carryoverType}
              onChange={(e) => setCarryoverType(e.target.value)}
              className="input"
            >
              <option value="mixed">Mixed (50% ST, 50% LT) - Typical</option>
              <option value="st">Short-Term Only</option>
              <option value="lt">Long-Term Only</option>
            </select>
            <div className="text-xs text-zinc-500 mt-1">
              Check prior year tax return for exact split. Schedule D shows ST and LT carryover separately.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Year Capital Activity</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Short-Term Gains ($)</label>
            <input
              type="number"
              value={currentYearStGains}
              onChange={(e) => setCurrentYearStGains(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Assets held under 12 months. Taxed at ordinary income rates.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Long-Term Gains ($)</label>
            <input
              type="number"
              value={currentYearLtGains}
              onChange={(e) => setCurrentYearLtGains(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Assets held over 12 months. Taxed at preferential 0-20% rates.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Short-Term Losses ($)</label>
            <input
              type="number"
              value={currentYearStLosses}
              onChange={(e) => setCurrentYearStLosses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Long-Term Losses ($)</label>
            <input
              type="number"
              value={currentYearLtLosses}
              onChange={(e) => setCurrentYearLtLosses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="marriedSeparate">Married Filing Separately</option>
            </select>
            <div className="text-xs text-zinc-500 mt-1">
              Affects ordinary income deduction limit: $3,000 (single/MFJ) or $1,500 (MFS).
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Loss Sources Available</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Prior Year ST Loss:</span>
            <span className="font-bold ml-2">${result.priorStLoss}</span>
          </div>
          <div>
            <span className="text-zinc-600">Prior Year LT Loss:</span>
            <span className="font-bold ml-2">${result.priorLtLoss}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current ST Losses:</span>
            <span className="font-medium ml-2">${result.currentYearStLosses}</span>
          </div>
          <div>
            <span className="text-zinc-600">Current LT Losses:</span>
            <span className="font-medium ml-2">${result.currentYearLtLosses}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total ST Available:</span>
            <span className="font-bold ml-2">${result.totalStLossAvailable}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total LT Available:</span>
            <span className="font-bold ml-2">${result.totalLtLossAvailable}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Loss Offset Order Applied</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">ST Loss → ST Gains:</span>
            <span className="font-medium ml-2">${result.stLossUsedForSt}</span>
          </div>
          <div>
            <span className="text-zinc-600">ST Loss → LT Gains:</span>
            <span className="font-medium ml-2">${result.stLossUsedForLt}</span>
          </div>
          <div>
            <span className="text-zinc-600">LT Loss → LT Gains:</span>
            <span className="font-medium ml-2">${result.ltLossUsedForLt}</span>
          </div>
          <div>
            <span className="text-zinc-600">LT Loss → ST Gains:</span>
            <span className="font-medium ml-2">${result.ltLossUsedForSt}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Loss Applied:</span>
            <span className="font-bold ml-2">${result.totalLossApplied}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          IRS offset rules: Same type first, then cross-type, then $3,000 ordinary income deduction.
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Final Position After Carryover</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Net ST Gains:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.finalNetStGains) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${result.finalNetStGains}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Net LT Gains:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.finalNetLtGains) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${result.finalNetLtGains}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Total Net:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.finalNetGains) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${result.finalNetGains}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Ordinary Income Deduction</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Deduction Limit:</span>
            <span className="font-medium ml-2">${result.ordinaryDeductionLimit}</span>
          </div>
          <div>
            <span className="text-zinc-600">This Year Deduction:</span>
            <span className="font-bold ml-2">${result.ordinaryDeduction}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Savings (~22%):</span>
            <span className="font-bold ml-2 text-green-800">${result.ordinaryTaxSavings}</span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Losses exceeding gains can deduct up to $3,000 from ordinary income annually.
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax Impact Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Tax Without Carryover:</span>
            <span className="font-bold ml-2">${result.taxWithoutCarryover}</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax With Carryover:</span>
            <span className="font-bold ml-2">${result.taxWithCarryover}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax Savings:</span>
            <span className="font-bold ml-2 text-green-800">${result.taxSavings}</span>
          </div>
        </div>
      </div>

      {result.hasNewCarryover && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">New Carryover for Next Year</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Total Carryover:</span>
              <span className="font-bold ml-2">${result.newCarryover}</span>
            </div>
            <div>
              <span className="text-zinc-600">ST Carryover:</span>
              <span className="font-medium ml-2">${result.newStCarryover}</span>
            </div>
            <div>
              <span className="text-zinc-600">LT Carryover:</span>
              <span className="font-medium ml-2">${result.newLtCarryover}</span>
            </div>
          </div>
          <div className="text-xs text-teal-600 mt-2">
            Unused losses carry forward indefinitely. Deduct $3,000 annually until exhausted.
          </div>
        </div>
      )}

      {result.hasNewCarryover && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">5-Year Carryover Projection</h3>
          <div className="overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Year</th>
                  <th className="text-left p-2">Carryover</th>
                  <th className="text-left p-2">Deduction</th>
                  <th className="text-left p-2">Savings (~22%)</th>
                </tr>
              </thead>
              <tbody>
                {result.projection.map((row) => (
                  <tr key={row.year} className="border-b">
                    <td className="p-2">{row.year}</td>
                    <td className="p-2">${row.carryover}</td>
                    <td className="p-2">${row.deduction}</td>
                    <td className="p-2">${row.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            Assumes no future gains. With gains, carryover offsets gains first, saving at 15-37% rate.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Capital Loss Carryover Rules</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Indefinite Carryforward:</strong> Capital losses carry forward indefinitely, no expiration. Track on Schedule D each year.</li>
          <li><strong>$3,000 Annual Deduction:</strong> Net losses exceeding gains can deduct $3,000 ($1,500 MFS) from ordinary income each year.</li>
          <li><strong>Offset Order:</strong> ST losses → ST gains → LT gains. LT losses → LT gains → ST gains. Then $3,000 ordinary deduction.</li>
          <li><strong>Short-Term More Valuable:</strong> ST losses offset ST gains first (saving at 22-37% vs 15-20%). Prioritize using ST carryover.</li>
          <li><strong>Schedule D Tracking:</strong> Form shows prior year ST and LT carryover separately. Lines 6 and 14 for 2024 Schedule D.</li>
          <li><strong>State Differences:</strong> Some states have different carryover rules. CA allows indefinite carryforward, same $3,000 deduction.</li>
          <li><strong>Death Termination:</strong> Unused capital losses expire at death. Cannot pass to heirs. Consider accelerating use if estate planning.</li>
          <li><strong>Strategic Use:</strong> If large carryover, realize gains to offset them tax-free. Better than $3,000 deduction at 22% vs offsetting gains at 15%.</li>
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Planning Strategies</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Realize Gains:</strong> If $50K carryover, sell $50K of appreciated stock. Gain offset by carryover = $0 tax. Better than $3,000/year deduction.</li>
          <li><strong>Timing:</strong> Large carryover with no gains? Consider rebalancing portfolio to realize gains tax-free, then reinvest.</li>
          <li><strong>Roth Conversion:</strong> Convert Traditional IRA to Roth. Capital losses can offset other income, making conversion more affordable.</li>
          <li><strong>Check Prior Return:</strong> Look at last year's Schedule D lines 6 (ST carryover) and 14 (LT carryover). Enter exact amounts here.</li>
          <li><strong>Broker Reports:</strong> 1099-B shows realized gains/losses. Import into tax software. Carryover auto-calculated from prior year.</li>
          <li><strong>Long-Term vs Short-Term:</strong> Know your carryover type. ST losses more valuable (offset higher-rate gains first).</li>
        </ul>
      </div>
    </main>
  )
}