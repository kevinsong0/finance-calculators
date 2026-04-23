'use client'

import { useState } from 'react'

export default function InvestmentInterestDeductionCalculator() {
  const [investmentInterest, setInvestmentInterest] = useState(5000)
  const [investmentIncome, setInvestmentIncome] = useState(15000)
  const [qualifiedDividends, setQualifiedDividends] = useState(3000)
  const [capitalGains, setCapitalGains] = useState(8000)
  const [taxableGains, setTaxableGains] = useState(8000)
  const [otherInvestmentIncome, setOtherInvestmentIncome] = useState(2000)
  const [marginalRate, setMarginalRate] = useState(24)
  const [carryoverFromPrior, setCarryoverFromPrior] = useState(0)

  const calculate = () => {
    // Investment Interest Expense Deduction Calculator
    // Form 4952 - Deduct interest on loans used to purchase investments
    // Deduction limited to net investment income

    // Rules:
    // 1. Investment interest = interest paid on loans for investments
    // 2. Deduction limited to "net investment income"
    // 3. Net investment income = investment income - investment expenses
    // 4. Qualified dividends and long-term gains excluded (unless you elect)
    // 5. Carryover unused interest indefinitely
    // 6. Elect to include QD/LTCG in net investment income (makes them ordinary)

    // Calculate investment income components
    const ordinaryInvestmentIncome = otherInvestmentIncome // Interest, non-qualified dividends, short-term gains
    const totalGains = capitalGains

    // Net investment income (default: exclude qualified dividends and LTCG)
    const netInvestmentIncomeWithoutElection = ordinaryInvestmentIncome
    const netInvestmentIncomeWithElection = ordinaryInvestmentIncome + qualifiedDividends + capitalGains

    // Deductible amount (limited to net investment income)
    const totalInterest = investmentInterest + carryoverFromPrior

    const deductibleWithoutElection = Math.min(totalInterest, netInvestmentIncomeWithoutElection)
    const deductibleWithElection = Math.min(totalInterest, netInvestmentIncomeWithElection)

    const carryoverWithoutElection = totalInterest - deductibleWithoutElection
    const carryoverWithElection = totalInterest - deductibleWithElection

    // Tax impact of election
    // If elect to include QD/LTCG in NII, they become taxable at ordinary rate
    // Benefit: can deduct more investment interest at ordinary rate

    // Without election: QD/LTCG taxed at preferential rate, less interest deducted
    // With election: QD/LTCG taxed at ordinary rate, more interest deducted

    // Calculate tax savings/loss from election
    const preferentialRate = 15 // Simplified - assume 15% for qualified/LTCG
    const ordinaryRate = marginalRate

    // Tax on dividends/gains without election
    const taxOnQDWithoutElection = qualifiedDividends * (preferentialRate / 100)
    const taxOnGainsWithoutElection = capitalGains * (preferentialRate / 100)
    const totalTaxWithoutElection = taxOnQDWithoutElection + taxOnGainsWithoutElection - deductibleWithoutElection * (ordinaryRate / 100)

    // Tax on dividends/gains with election
    const taxOnQDWithElection = qualifiedDividends * (ordinaryRate / 100)
    const taxOnGainsWithElection = capitalGains * (ordinaryRate / 100)
    const totalTaxWithElection = taxOnQDWithElection + taxOnGainsWithElection - deductibleWithElection * (ordinaryRate / 100)

    // Net benefit/loss from election
    const electionTaxImpact = totalTaxWithoutElection - totalTaxWithElection
    const electionBeneficial = electionTaxImpact > 0

    // Recommendation
    let recommendation = ''
    if (totalInterest <= ordinaryInvestmentIncome) {
      recommendation = `Investment interest ($${totalInterest}) fully deductible against ordinary investment income ($${ordinaryInvestmentIncome}). No election needed. Deduction: $${deductibleWithoutElection}.`
    } else if (electionBeneficial) {
      recommendation = `Election beneficial! Including QD/LTCG in NII allows $${deductibleWithElection} deduction vs $${deductibleWithoutElection}. Net tax savings: $${electionTaxImpact.toFixed(0)}. File Form 4952 with election statement.`
    } else {
      recommendation = `Election NOT beneficial. Keep QD/LTCG at preferential rates. Deduction limited to $${deductibleWithoutElection}. Carryover: $${carryoverWithoutElection}. Consider paying down investment debt.`
    }

    // Comparison summary
    const comparison = [
      { scenario: 'Without Election', deductible: deductibleWithoutElection, carryover: carryoverWithoutElection, taxOnQD: taxOnQDWithoutElection, taxOnGains: taxOnGainsWithoutElection, netTax: totalTaxWithoutElection },
      { scenario: 'With Election', deductible: deductibleWithElection, carryover: carryoverWithElection, taxOnQD: taxOnQDWithElection, taxOnGains: taxOnGainsWithElection, netTax: totalTaxWithElection },
    ]

    return {
      investmentInterest: investmentInterest.toFixed(0),
      investmentIncome: investmentIncome.toFixed(0),
      qualifiedDividends: qualifiedDividends.toFixed(0),
      capitalGains: capitalGains.toFixed(0),
      otherInvestmentIncome: otherInvestmentIncome.toFixed(0),
      carryoverFromPrior: carryoverFromPrior.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      netInvestmentIncomeWithoutElection: netInvestmentIncomeWithoutElection.toFixed(0),
      netInvestmentIncomeWithElection: netInvestmentIncomeWithElection.toFixed(0),
      deductibleWithoutElection: deductibleWithoutElection.toFixed(0),
      deductibleWithElection: deductibleWithElection.toFixed(0),
      carryoverWithoutElection: carryoverWithoutElection.toFixed(0),
      carryoverWithElection: carryoverWithElection.toFixed(0),
      marginalRate: marginalRate.toFixed(0),
      preferentialRate: preferentialRate.toFixed(0),
      electionTaxImpact: electionTaxImpact.toFixed(0),
      electionBeneficial,
      comparison,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Investment Interest Deduction Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate deductible investment interest expense (Form 4952).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Investment Interest Expense</label>
          <input type="number" value={investmentInterest} onChange={(e) => setInvestmentInterest(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Qualified Dividends</label>
          <input type="number" value={qualifiedDividends} onChange={(e) => setQualifiedDividends(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Long-Term Capital Gains</label>
          <input type="number" value={capitalGains} onChange={(e) => setCapitalGains(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Investment Income</label>
          <input type="number" value={otherInvestmentIncome} onChange={(e) => setOtherInvestmentIncome(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prior Year Carryover</label>
          <input type="number" value={carryoverFromPrior} onChange={(e) => setCarryoverFromPrior(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate (%)</label>
          <input type="number" value={marginalRate} onChange={(e) => setMarginalRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Investment Interest Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Current Interest:</span><span className="font-medium ml-2">$ {result.investmentInterest}</span></div>
          <div><span className="text-zinc-600">Prior Carryover:</span><span className="font-medium ml-2">$ {result.carryoverFromPrior}</span></div>
          <div><span className="text-zinc-600">Total:</span><span className="font-bold text-orange-700 ml-2">$ {result.totalInterest}</span></div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Net Investment Income</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-zinc-600">Without Election:</span>
            <span className="font-bold ml-2">$ {result.netInvestmentIncomeWithoutElection}</span>
            <div className="text-xs text-zinc-600">(excludes QD/LTCG)</div>
          </div>
          <div>
            <span className="text-zinc-600">With Election:</span>
            <span className="font-bold ml-2">$ {result.netInvestmentIncomeWithElection}</span>
            <div className="text-xs text-zinc-600">(includes QD/LTCG)</div>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Deduction Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Scenario</th>
                <th className="py-2 text-left">Deductible</th>
                <th className="py-2 text-left">Carryover</th>
                <th className="py-2 text-left">Tax on QD</th>
                <th className="py-2 text-left">Tax on Gains</th>
                <th className="py-2 text-left">Net Tax</th>
              </tr>
            </thead>
            <tbody>
              {result.comparison.map((c) => (
                <tr key={c.scenario} className="border-b">
                  <td className="py-1 font-semibold">{c.scenario}</td>
                  <td className="py-1">$ {c.deductible.toFixed(0)}</td>
                  <td className="py-1">$ {c.carryover.toFixed(0)}</td>
                  <td className="py-1">$ {c.taxOnQD.toFixed(0)}</td>
                  <td className="py-1">$ {c.taxOnGains.toFixed(0)}</td>
                  <td className="py-1 font-bold">$ {c.netTax.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`card mb-6 ${result.electionBeneficial ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Election Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Tax Impact:</span><span className={`font-bold ml-2 ${result.electionBeneficial ? 'text-green-700' : 'text-red-700'}`}>$ {result.electionTaxImpact}</span></div>
          <div><span className="text-zinc-600">Election:</span><span className={`font-bold ml-2 ${result.electionBeneficial ? 'text-green-700' : 'text-red-700'}`}>{result.electionBeneficial ? 'Beneficial ✓' : 'Not Beneficial'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          Election makes QD/LTCG taxable at {result.marginalRate}% instead of {result.preferentialRate}% but allows more interest deduction.
        </div>
      </div>

      <div className={`card mb-6 bg-blue-50 border border-blue-200`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Investment Interest Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Interest on loans for investments</li>
          <li>Deduction limited to NII</li>
          <li>QD/LTCG excluded by default</li>
          <li>Election to include QD/LTCG</li>
          <li>Election makes them ordinary income</li>
          <li>Carryover unused interest indefinitely</li>
          <li>Form 4952 for calculation</li>
          <li>Attach election statement</li>
          <li>Track carryover year to year</li>
          <li>Consider paying down debt</li>
        </ul>
      </div>
    </div>
  )
}