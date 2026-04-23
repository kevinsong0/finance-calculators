'use client'

import { useState } from 'react'

export default function CapitalGainsTaxRateCalculator() {
  const [longTermGains, setLongTermGains] = useState(50000)
  const [shortTermGains, setShortTermGains] = useState(10000)
  const [capitalLosses, setCapitalLosses] = useState(0)
  const [priorYearLossCarryover, setPriorYearLossCarryover] = useState(0)
  const [otherIncome, setOtherIncome] = useState(80000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold'>('marriedJoint')
  const [hasQualifiedDividends, setHasQualifiedDividends] = useState(true)
  const [qualifiedDividends, setQualifiedDividends] = useState(5000)
  const [taxYear, setTaxYear] = useState(2024)

  const calculate = () => {
    // Capital Gains Tax Rate Calculator
    // Short-term: ordinary income rates (held &lt;1 year)
    // Long-term: preferential rates 0%, 15%, 20% (held &gt;1 year)

    // Capital loss rules:
    // - Offset gains: losses first offset same-type gains
    // - $3,000 annual deduction against ordinary income
    // - Carryover remaining losses to future years

    // 2024 brackets for long-term capital gains rates:
    const thresholds = {
      2024: {
        single: { zero: 47025, fifteen: 518900 },
        marriedJoint: { zero: 94050, fifteen: 583750 },
        marriedSeparate: { zero: 47025, fifteen: 291875 },
        headOfHousehold: { zero: 63150, fifteen: 551350 },
      },
      2023: {
        single: { zero: 44275, fifteen: 492300 },
        marriedJoint: { zero: 88550, fifteen: 553850 },
        marriedSeparate: { zero: 44275, fifteen: 276925 },
        headOfHousehold: { zero: 59475, fifteen: 523050 },
      },
    }

    const threshold = thresholds[taxYear as keyof typeof thresholds]?.[filingStatus] || thresholds[2024][filingStatus]

    // Step 1: Net capital gains
    const netLongTerm = longTermGains - Math.min(capitalLosses, longTermGains)
    const remainingLosses = Math.max(0, capitalLosses - longTermGains)
    const netShortTerm = shortTermGains - Math.min(remainingLosses, shortTermGains)
    const remainingLosses2 = Math.max(0, remainingLosses - shortTermGains)

    // Add prior year carryover
    const totalRemainingLosses = remainingLosses2 + priorYearLossCarryover

    // $3,000 deduction against ordinary income
    const ordinaryDeduction = Math.min(3000, totalRemainingLosses)
    const finalLossCarryover = totalRemainingLosses - ordinaryDeduction

    // Total income for bracket determination
    const incomeForBracket = otherIncome + netLongTerm + netShortTerm + (hasQualifiedDividends ? qualifiedDividends : 0) - ordinaryDeduction

    // Determine long-term rate
    let longTermRate = 15
    if (incomeForBracket <= threshold.zero) {
      longTermRate = 0
    } else if (incomeForBracket > threshold.fifteen) {
      longTermRate = 20
    }

    // Short-term rate (use marginal rate from other income)
    const marginalRate = 0.24 // Simplified

    // Calculate taxes
    const longTermTax = netLongTerm * (longTermRate / 100)
    const shortTermTax = netShortTerm * marginalRate
    const qualifiedDividendTax = hasQualifiedDividends ? qualifiedDividends * (longTermRate / 100) : 0
    const ordinaryIncomeTax = (otherIncome - ordinaryDeduction) * marginalRate // Simplified

    const totalCapitalGainsTax = longTermTax + shortTermTax
    const totalTax = totalCapitalGainsTax + qualifiedDividendTax + ordinaryIncomeTax

    // Tax savings from long-term vs short-term
    const ifAllShortTermTax = (longTermGains + shortTermGains) * marginalRate
    const taxSavingsFromLongTerm = ifAllShortTermTax - (longTermTax + shortTermTax)

    // Effective capital gains rate
    const totalNetGains = netLongTerm + netShortTerm
    const effectiveRate = totalNetGains > 0 ? (totalCapitalGainsTax / totalNetGains) * 100 : 0

    // Loss utilization
    const lossUtilization = {
      offsetGains: Math.min(capitalLosses, longTermGains + shortTermGains),
      ordinaryDeduction: ordinaryDeduction,
      carryover: finalLossCarryover,
      totalUsed: Math.min(capitalLosses + priorYearLossCarryover, longTermGains + shortTermGains + 3000),
    }

    // Comparison table
    const rateComparison = [
      { type: 'Long-Term Gains', amount: netLongTerm, rate: `${longTermRate}%`, tax: longTermTax },
      { type: 'Short-Term Gains', amount: netShortTerm, rate: `${marginalRate * 100}%`, tax: shortTermTax },
      { type: 'Qualified Dividends', amount: hasQualifiedDividends ? qualifiedDividends : 0, rate: `${longTermRate}%`, tax: qualifiedDividendTax },
    ]

    // Recommendation
    let recommendation = ''
    if (longTermRate === 0) {
      recommendation = `Income within 0% bracket! Long-term gains and qualified dividends completely tax-free. Consider realizing more gains this year.`
    } else if (longTermRate === 15) {
      recommendation = `Long-term rate 15% vs short-term ${marginalRate * 100}%. Savings: $${taxSavingsFromLongTerm.toFixed(0)}. Hold investments &gt;1 year for preferential rates.`
    } else {
      recommendation = `High income: 20% long-term rate. Still saves $${taxSavingsFromLongTerm.toFixed(0)} vs ${marginalRate * 100}% short-term. Consider timing gains.`
    }

    if (capitalLosses > 0) {
      recommendation += ` Losses offset $${lossUtilization.offsetGains.toFixed(0)} gains. $${ordinaryDeduction.toFixed(0)} deducted against ordinary income.`
    }

    // Bracket optimization note
    const bracketNote = `Long-term rate determined by total income including gains and qualified dividends. Thresholds: $${threshold.zero} (0%), $${threshold.fifteen} (20%).`

    return {
      longTermGains: longTermGains.toFixed(0),
      shortTermGains: shortTermGains.toFixed(0),
      capitalLosses: capitalLosses.toFixed(0),
      priorYearLossCarryover: priorYearLossCarryover.toFixed(0),
      otherIncome: otherIncome.toFixed(0),
      filingStatus,
      hasQualifiedDividends,
      qualifiedDividends: qualifiedDividends.toFixed(0),
      taxYear: taxYear.toFixed(0),
      thresholdZero: threshold.zero.toFixed(0),
      thresholdFifteen: threshold.fifteen.toFixed(0),
      netLongTerm: netLongTerm.toFixed(0),
      netShortTerm: netShortTerm.toFixed(0),
      incomeForBracket: incomeForBracket.toFixed(0),
      longTermRate: longTermRate.toFixed(0),
      marginalRate: (marginalRate * 100).toFixed(0),
      longTermTax: longTermTax.toFixed(0),
      shortTermTax: shortTermTax.toFixed(0),
      qualifiedDividendTax: qualifiedDividendTax.toFixed(0),
      totalCapitalGainsTax: totalCapitalGainsTax.toFixed(0),
      ordinaryIncomeTax: ordinaryIncomeTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      ifAllShortTermTax: ifAllShortTermTax.toFixed(0),
      taxSavingsFromLongTerm: taxSavingsFromLongTerm.toFixed(0),
      totalNetGains: totalNetGains.toFixed(0),
      effectiveRate: effectiveRate.toFixed(1),
      lossUtilization,
      finalLossCarryover: finalLossCarryover.toFixed(0),
      ordinaryDeduction: ordinaryDeduction.toFixed(0),
      rateComparison,
      recommendation,
      bracketNote,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Capital Gains Tax Rate Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax on long-term and short-term capital gains.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Long-Term Gains</label>
          <input type="number" value={longTermGains} onChange={(e) => setLongTermGains(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short-Term Gains</label>
          <input type="number" value={shortTermGains} onChange={(e) => setShortTermGains(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capital Losses</label>
          <input type="number" value={capitalLosses} onChange={(e) => setCapitalLosses(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Loss Carryover</label>
          <input type="number" value={priorYearLossCarryover} onChange={(e) => setPriorYearLossCarryover(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">Has Qualified Dividends?</label>
          <select value={hasQualifiedDividends ? 'yes' : 'no'} onChange={(e) => setHasQualifiedDividends(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        {hasQualifiedDividends && (
          <div>
            <label className="block text-sm font-medium mb-1">Qualified Dividends</label>
            <input type="number" value={qualifiedDividends} onChange={(e) => setQualifiedDividends(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bracket Thresholds ({result.taxYear})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">0% Up To:</span><span className="font-bold text-green-700 ml-2">$ {result.thresholdZero}</span></div>
          <div><span className="text-zinc-600">15% Up To:</span><span className="font-medium ml-2">$ {result.thresholdFifteen}</span></div>
          <div><span className="text-zinc-600">Income:</span><span className="font-medium ml-2">$ {result.incomeForBracket}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.bracketNote}</div>
      </div>

      <div className={`card mb-6 ${Number(result.longTermRate) === 0 ? 'bg-green-50 border border-green-200' : Number(result.longTermRate) === 15 ? 'bg-blue-50 border border-blue-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Your Long-Term Rate</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Rate:</span><span className={`font-bold ml-2 ${Number(result.longTermRate) === 0 ? 'text-green-700' : Number(result.longTermRate) === 15 ? 'text-blue-700' : 'text-orange-700'}`}>{result.longTermRate}%</span></div>
          <div><span className="text-zinc-600">Status:</span><span className="font-medium ml-2">{filingStatus}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax by Type</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Rate</th>
                <th className="py-2 text-left">Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.rateComparison.map((t) => (
                <tr key={t.type} className="border-b">
                  <td className="py-1 font-semibold">{t.type}</td>
                  <td className="py-1">$ {t.amount.toFixed(0)}</td>
                  <td className="py-1">{t.rate}</td>
                  <td className="py-1 font-bold">$ {t.tax.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Total Capital Gains Tax</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Long-Term:</span><span className="font-medium ml-2">$ {result.longTermTax}</span></div>
          <div><span className="text-zinc-600">Short-Term:</span><span className="font-medium ml-2">$ {result.shortTermTax}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-red-700 ml-2">$ {result.totalCapitalGainsTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Effective Rate:</span><span className="font-bold ml-2">{result.effectiveRate}%</span></div>
          <div><span className="text-zinc-600">Net Gains:</span><span className="font-medium ml-2">$ {result.totalNetGains}</span></div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Savings from Long-Term</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">If All Short:</span><span className="font-medium ml-2">$ {result.ifAllShortTermTax}</span></div>
          <div><span className="text-zinc-600">Actual:</span><span className="font-bold text-green-700 ml-2">$ {result.totalCapitalGainsTax}</span></div>
          <div><span className="text-zinc-600">Savings:</span><span className="font-bold text-green-700 ml-2">$ {result.taxSavingsFromLongTerm}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Holding &gt;1 year saves {Number(result.taxSavingsFromLongTerm) > 0 ? `$${result.taxSavingsFromLongTerm}` : 'nothing'} vs short-term rates.</div>
      </div>

      {Number(result.capitalLosses) > 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Loss Utilization</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><span className="text-zinc-600">Offset Gains:</span><span className="font-medium ml-2">$ {result.lossUtilization.offsetGains.toFixed(0)}</span></div>
            <div><span className="text-zinc-600">Ordinary Ded:</span><span className="font-bold text-teal-700 ml-2">$ {result.lossUtilization.ordinaryDeduction.toFixed(0)}</span></div>
            <div><span className="text-zinc-600">Carryover:</span><span className="font-medium ml-2">$ {result.lossUtilization.carryover.toFixed(0)}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">$3,000 annual limit against ordinary income. Remaining carries forward indefinitely.</div>
        </div>
      )}

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Capital Gains Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Long-term: held &gt;1 year</li>
          <li>Short-term: held &lt;1 year</li>
          <li>LT rates: 0%, 15%, 20%</li>
          <li>ST rates: ordinary income</li>
          <li>Bracket includes all income</li>
          <li>Losses offset same-type first</li>
          <li>$3,000 ordinary deduction</li>
          <li>Carryover indefinite</li>
          <li>Qualified dividends same rate</li>
          <li>Net investment income tax: 3.8%</li>
        </ul>
      </div>
    </div>
  )
}