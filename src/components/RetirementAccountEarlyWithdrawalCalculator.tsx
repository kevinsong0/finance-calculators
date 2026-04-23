'use client'

import { useState } from 'react'

export default function RetirementAccountEarlyWithdrawalCalculator() {
  const [accountType, setAccountType] = useState<'401k' | 'ira' | 'roth'>('401k')
  const [withdrawalAmount, setWithdrawalAmount] = useState(20000)
  const [accountBalance, setAccountBalance] = useState(100000)
  const [currentAge, setCurrentAge] = useState(40)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [taxBracket, setTaxBracket] = useState(24)
  const [withdrawalReason, setWithdrawalReason] = useState('general')
  const [stateTaxRate, setStateTaxRate] = useState(5)

  const calculate = () => {
    // Retirement account early withdrawal penalties and taxes
    // 10% early withdrawal penalty before age 59½ (with exceptions)
    // Additional taxes and impacts

    const earlyWithdrawalPenaltyAge = 59.5
    const penaltyRate = 0.10 // 10% federal penalty

    // Check if penalty applies
    const isEarlyWithdrawal = currentAge < earlyWithdrawalPenaltyAge

    // Exception categories (penalty-free)
    const penaltyExceptions: Record<string, string> = {
      disability: 'Disability - no penalty',
      medical_excess: 'Medical expenses >7.5% AGI - no penalty',
      first_home: 'First home purchase ($10k limit for IRA)',
      education: 'Education expenses (IRA only)',
      birth_adoption: 'Birth/adoption ($5k limit)',
      military: 'Military reservist call to duty',
      divorce: 'Divorce decree (QDRO)',
      death: 'Death of account owner',
      substantially_equal: '72(t) substantially equal payments',
      covid: 'COVID-related (2020 only)',
    }

    const isPenaltyFree = withdrawalReason !== 'general' && withdrawalReason !== 'none'
    let penaltyException = isPenaltyFree ? penaltyExceptions[withdrawalReason] || 'Possible exception' : 'None'

    // Roth IRA special rules
    // Contributions can be withdrawn anytime tax-free
    // Earnings subject to 5-year rule and age requirement
    const isRoth = accountType === 'roth'
    const rothContributionRatio = 0.60 // Assume 60% contributions (simplified)
    const rothEarningsRatio = 0.40

    // Calculate taxes
    let federalTax = 0
    let penaltyAmount = 0
    let stateTax = 0
    let taxableAmount = withdrawalAmount

    if (accountType === 'roth') {
      // Roth: contributions first, then earnings
      const contributionWithdrawal = Math.min(withdrawalAmount, accountBalance * rothContributionRatio)
      const earningsWithdrawal = withdrawalAmount - contributionWithdrawal

      // Contributions tax-free
      // Earnings taxed if early and under 5-year rule
      taxableAmount = earningsWithdrawal
      federalTax = taxableAmount * (taxBracket / 100)

      if (isEarlyWithdrawal && earningsWithdrawal > 0) {
        penaltyAmount = earningsWithdrawal * penaltyRate
      }
    } else {
      // Traditional 401k/IRA: full amount taxable
      federalTax = withdrawalAmount * (taxBracket / 100)
      stateTax = withdrawalAmount * (stateTaxRate / 100)

      if (isEarlyWithdrawal && !isPenaltyFree) {
        penaltyAmount = withdrawalAmount * penaltyRate
      }
    }

    // Total cost of withdrawal
    const totalTaxAndPenalty = federalTax + penaltyAmount + stateTax
    const netAmountReceived = withdrawalAmount - totalTaxAndPenalty

    // Opportunity cost - lost growth
    // Assume 7% annual growth
    const growthRate = 0.07
    const yearsToRetirement = Math.max(0, 65 - currentAge)
    const futureValueIfLeft = withdrawalAmount * Math.pow(1 + growthRate, yearsToRetirement)
    const opportunityCost = futureValueIfLeft - withdrawalAmount

    // Total real cost including opportunity
    const totalRealCost = totalTaxAndPenalty + opportunityCost

    // First home exception limit (IRA only)
    const firstHomeLimit = accountType === 'ira' ? 10000 : 0
    const firstHomePenaltyFree = withdrawalReason === 'first_home' && accountType === 'ira' && withdrawalAmount <= firstHomeLimit

    return {
      accountType,
      withdrawalAmount: withdrawalAmount.toFixed(0),
      accountBalance: accountBalance.toFixed(0),
      currentAge: currentAge.toFixed(0),
      filingStatus,
      taxBracket: taxBracket.toFixed(0),
      withdrawalReason,
      stateTaxRate: stateTaxRate.toFixed(0),
      earlyWithdrawalPenaltyAge: earlyWithdrawalPenaltyAge.toFixed(1),
      isEarlyWithdrawal,
      penaltyRate: (penaltyRate * 100).toFixed(0),
      isPenaltyFree,
      penaltyException,
      federalTax: federalTax.toFixed(0),
      penaltyAmount: penaltyAmount.toFixed(0),
      stateTax: stateTax.toFixed(0),
      totalTaxAndPenalty: totalTaxAndPenalty.toFixed(0),
      netAmountReceived: netAmountReceived.toFixed(0),
      taxableAmount: taxableAmount.toFixed(0),
      growthRate: (growthRate * 100).toFixed(0),
      yearsToRetirement: yearsToRetirement.toFixed(0),
      futureValueIfLeft: futureValueIfLeft.toFixed(0),
      opportunityCost: opportunityCost.toFixed(0),
      totalRealCost: totalRealCost.toFixed(0),
      firstHomeLimit: firstHomeLimit.toFixed(0),
      firstHomePenaltyFree,
      isRoth,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Retirement Account Early Withdrawal Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate taxes, penalties, and opportunity cost of early withdrawal.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value as '401k' | 'ira' | 'roth')} className="w-full border rounded p-2">
            <option value="401k">401(k) Traditional</option>
            <option value="ira">Traditional IRA</option>
            <option value="roth">Roth IRA</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Withdrawal Amount</label>
          <input type="number" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Balance</label>
          <input type="number" value={accountBalance} onChange={(e) => setAccountBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="18" max="70" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Federal Tax Bracket (%)</label>
          <input type="number" value={taxBracket} min="10" max="37" onChange={(e) => setTaxBracket(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
          <input type="number" value={stateTaxRate} min="0" max="15" onChange={(e) => setStateTaxRate(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Withdrawal Reason</label>
          <select value={withdrawalReason} onChange={(e) => setWithdrawalReason(e.target.value)} className="w-full border rounded p-2">
            <option value="general">General withdrawal (penalty applies)</option>
            <option value="disability">Disability</option>
            <option value="medical_excess">Medical expenses &gt;7.5% AGI</option>
            <option value="first_home">First home purchase</option>
            <option value="education">Education expenses (IRA)</option>
            <option value="birth_adoption">Birth/adoption</option>
            <option value="substantially_equal">72(t) substantially equal payments</option>
          </select>
        </div>
      </div>

      <div className={`card mb-6 ${result.isEarlyWithdrawal && !result.isPenaltyFree ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.isEarlyWithdrawal && !result.isPenaltyFree ? 'text-red-700' : 'text-green-700'}`}>Withdrawal Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Account Type:</span><span className="font-medium ml-2">{result.accountType}</span></div>
          <div><span className="text-zinc-600">Age:</span><span className="font-medium ml-2">{result.currentAge}</span></div>
          <div><span className="text-zinc-600">Early Withdrawal:</span><span className={`font-bold ml-2 ${result.isEarlyWithdrawal ? 'text-red-700' : 'text-green-700'}`}>{result.isEarlyWithdrawal ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Penalty Exception:</span><span className={`font-bold ml-2 ${result.isPenaltyFree ? 'text-green-700' : 'text-red-700'}`}>{result.penaltyException}</span></div>
          <div><span className="text-zinc-600">Penalty Applies:</span><span className={`font-bold ml-2 ${result.isEarlyWithdrawal && !result.isPenaltyFree ? 'text-red-700' : 'text-green-700'}`}>{result.isEarlyWithdrawal && !result.isPenaltyFree ? 'Yes' : 'No'}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Age 59½ is the threshold for penalty-free withdrawals. Exceptions may apply.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-orange-700">Taxes and Penalties</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Taxable Amount:</span><span className="font-medium ml-2">$ {result.taxableAmount}</span></div>
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.federalTax}</span></div>
          <div><span className="text-zinc-600">Early Penalty:</span><span className="font-bold text-red-700 ml-2">$ {result.penaltyAmount}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">State Tax:</span><span className="font-medium ml-2">$ {result.stateTax}</span></div>
          <div><span className="text-zinc-600">Total Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTaxAndPenalty}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Federal tax at your bracket rate. 10% penalty if under 59½ without exception.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Net Amount Received</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Requested:</span><span className="font-medium ml-2">$ {result.withdrawalAmount}</span></div>
          <div><span className="text-zinc-600">You Receive:</span><span className="font-bold text-blue-700 ml-2">$ {result.netAmountReceived}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Actual cash you receive after all taxes and penalties deducted.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Opportunity Cost Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Years to Retirement:</span><span className="font-medium ml-2">{result.yearsToRetirement}</span></div>
          <div><span className="text-zinc-600">Growth Rate:</span><span className="font-medium ml-2">{result.growthRate}%/yr</span></div>
          <div><span className="text-zinc-600">Future Value:</span><span className="font-bold text-purple-700 ml-2">$ {result.futureValueIfLeft}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Lost Growth:</span><span className="font-bold text-red-700 ml-2">$ {result.opportunityCost}</span></div>
          <div><span className="text-zinc-600">Total Real Cost:</span><span className="font-bold text-red-700 ml-2">$ {result.totalRealCost}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Money withdrawn loses compounded growth. This is the hidden cost.</div>
      </div>

      {result.isRoth && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Roth IRA Special Rules</h2>
          <div className="text-sm text-zinc-600 space-y-1">
            <div>✓ Contributions withdrawn tax-free anytime</div>
            <div>✓ Earnings taxed if under 5-year rule</div>
            <div>✓ 5-year rule: account open 5+ years</div>
            <div className="text-xs text-zinc-600 mt-2">Roth contributions come out first. Order matters.</div>
          </div>
        </div>
      )}

      {result.withdrawalReason === 'first_home' && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">First Home Exception</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">IRA Limit:</span><span className="font-medium ml-2">$ {result.firstHomeLimit}</span></div>
            <div><span className="text-zinc-600">Penalty-Free:</span><span className={`font-bold ml-2 ${result.firstHomePenaltyFree ? 'text-green-700' : 'text-orange-700'}`}>{result.firstHomePenaltyFree ? 'Yes' : 'Partial'}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Traditional IRA: $10,000 penalty-free for first home. 401(k) not eligible.</div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Early Withdrawal Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>10% penalty before age 59½</li>
          <li>Full amount taxable (traditional)</li>
          <li>Roth contributions tax-free anytime</li>
          <li>Roth earnings: 5-year + age rule</li>
          <li>Exceptions: disability, medical, first home</li>
          <li>First home: $10k IRA penalty-free</li>
          <li>72(t): substantially equal payments</li>
          <li>Consider loan instead of withdrawal</li>
          <li>Opportunity cost is significant</li>
          <li>401(k) loan: borrow from yourself</li>
        </ul>
      </div>
    </div>
  )
}