'use client'

import { useState } from 'react'

export default function RothConversionLadderStrategyCalculator() {
  const [currentAge, setCurrentAge] = useState(55)
  const [retirementAge, setRetirementAge] = useState(60)
  const [traditional401kBalance, setTraditional401kBalance] = useState(500000)
  const [annualConversionAmount, setAnnualConversionAmount] = useState(20000)
  const [conversionStartAge, setConversionStartAge] = useState(55)
  const [taxBracketRetirement, setTaxBracketRetirement] = useState(12)
  const [taxBracketWorking, setTaxBracketWorking] = useState(22)
  const [expectedReturn, setExpectedReturn] = useState(6)
  const [livingExpenses, setLivingExpenses] = useState(40000)

  const calculate = () => {
    // Roth conversion ladder strategy
    // Convert Traditional to Roth over several years before retirement
    // Goal: have tax-free income in early retirement before 59.5

    const yearsBeforeRetirement = retirementAge - conversionStartAge
    const yearsInRetirement = 30 - retirementAge // Assume 30 years total

    // Conversion tax costs
    const annualConversionTax = annualConversionAmount * taxBracketRetirement / 100
    const totalConversionTax = annualConversionTax * yearsBeforeRetirement

    // Total converted amount
    const totalConverted = annualConversionAmount * yearsBeforeRetirement

    // Remaining Traditional balance after conversions
    let traditionalBalance = traditional401kBalance
    for (let i = 0; i < yearsBeforeRetirement; i++) {
      traditionalBalance = traditionalBalance * (1 + expectedReturn / 100) - annualConversionAmount
    }
    const traditionalRemaining = traditionalBalance

    // Roth balance after conversions (growing tax-free)
    let rothBalance = 0
    for (let i = 0; i < yearsBeforeRetirement; i++) {
      rothBalance = rothBalance * (1 + expectedReturn / 100) + annualConversionAmount
    }
    // Continue growth in retirement
    for (let i = 0; i < yearsInRetirement; i++) {
      rothBalance = rothBalance * (1 + expectedReturn / 100) - livingExpenses * 0.5 // Assume 50% from Roth
    }
    const rothFinalBalance = Math.max(0, rothBalance)

    // 5-year rule for conversions
    // Each conversion must wait 5 years before tax-free withdrawal
    const conversionAvailabilityAge = conversionStartAge + 5

    // Ladder structure
    const ladderYears = []
    for (let i = 0; i < yearsBeforeRetirement; i++) {
      ladderYears.push({
        conversionYear: conversionStartAge + i,
        conversionAge: (conversionStartAge + i),
        amount: annualConversionAmount,
        availableAge: (conversionStartAge + i) + 5,
        taxCost: annualConversionAmount * taxBracketRetirement / 100,
      })
    }

    // Income ladder availability
    const firstRothAvailableAge = conversionAvailabilityAge
    const lastRothAvailableAge = conversionStartAge + yearsBeforeRetirement - 1 + 5

    // Gap before first conversion available
    const gapYears = Math.max(0, retirementAge - firstRothAvailableAge)

    // Tax savings comparison
    // If withdrew from Traditional in retirement at higher bracket
    const traditionalWithdrawalTaxBracket = taxBracketWorking // Might be higher
    const taxSavingsIfHigherBracket = totalConverted * (traditionalWithdrawalTaxBracket - taxBracketRetirement) / 100

    // ACA subsidy impact (conversions count as income)
    const acaSubsidyThreshold = 20000 // Simplified
    const acaImpact = annualConversionAmount > acaSubsidyThreshold ? 'May reduce ACA subsidies' : 'Minimal impact'

    // Recommended conversion amount per bracket
    const bracketLimits: Record<number, number> = {
      10: 11600,
      12: 47150,
      22: 100525,
      24: 191950,
    }
    const recommendedConversion = bracketLimits[taxBracketRetirement] ?? 50000

    // Strategy benefits
    const benefits = [
      'Tax-free growth in Roth',
      'Tax-free withdrawals after 5 years',
      'No RMDs in Roth',
      'Avoid higher tax bracket later',
      'Better estate planning',
      'Fill lower brackets now',
    ]

    return {
      currentAge: currentAge.toFixed(0),
      retirementAge: retirementAge.toFixed(0),
      traditional401kBalance: traditional401kBalance.toFixed(0),
      annualConversionAmount: annualConversionAmount.toFixed(0),
      conversionStartAge: conversionStartAge.toFixed(0),
      taxBracketRetirement: taxBracketRetirement.toFixed(0),
      taxBracketWorking: taxBracketWorking.toFixed(0),
      expectedReturn: expectedReturn.toFixed(0),
      livingExpenses: livingExpenses.toFixed(0),
      yearsBeforeRetirement: yearsBeforeRetirement.toFixed(0),
      yearsInRetirement: yearsInRetirement.toFixed(0),
      annualConversionTax: annualConversionTax.toFixed(0),
      totalConversionTax: totalConversionTax.toFixed(0),
      totalConverted: totalConverted.toFixed(0),
      traditionalRemaining: traditionalRemaining.toFixed(0),
      rothFinalBalance: rothFinalBalance.toFixed(0),
      conversionAvailabilityAge: conversionAvailabilityAge.toFixed(0),
      firstRothAvailableAge: firstRothAvailableAge.toFixed(0),
      lastRothAvailableAge: lastRothAvailableAge.toFixed(0),
      gapYears: gapYears.toFixed(0),
      taxSavingsIfHigherBracket: taxSavingsIfHigherBracket.toFixed(0),
      acaImpact,
      recommendedConversion: recommendedConversion.toFixed(0),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Roth Conversion Ladder Strategy Calculator</h1>
      <p className="text-gray-600 mb-4">Plan Roth conversions for tax-free early retirement income.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input type="number" value={currentAge} min="50" max="60" onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <input type="number" value={retirementAge} min="55" max="65" onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional 401k Balance</label>
          <input type="number" value={traditional401kBalance} onChange={(e) => setTraditional401kBalance(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Conversion Amount</label>
          <input type="number" value={annualConversionAmount} onChange={(e) => setAnnualConversionAmount(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conversion Start Age</label>
          <input type="number" value={conversionStartAge} min="50" max="60" onChange={(e) => setConversionStartAge(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Bracket (During Conversion)</label>
          <select value={taxBracketRetirement} onChange={(e) => setTaxBracketRetirement(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="10">10%</option>
            <option value="12">12%</option>
            <option value="22">22%</option>
            <option value="24">24%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Return (%)</label>
          <input type="number" value={expectedReturn} min="0" max="10" onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Conversion Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Conversion Start:</span><span className="font-medium ml-2">Age {result.conversionStartAge}</span></div>
          <div><span className="text-zinc-600">Years to Convert:</span><span className="font-medium ml-2">{result.yearsBeforeRetirement}</span></div>
          <div><span className="text-zinc-600">Annual Amount:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualConversionAmount}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Tax Bracket:</span><span className="font-medium ml-2">{result.taxBracketRetirement}%</span></div>
          <div><span className="text-zinc-600">Annual Tax Cost:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualConversionTax}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Convert during lower-income years to fill tax brackets efficiently.</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Conversion Results</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Total Converted:</span><span className="font-bold text-green-700 ml-2">$ {result.totalConverted}</span></div>
          <div><span className="text-zinc-600">Total Tax Cost:</span><span className="font-medium ml-2">$ {result.totalConversionTax}</span></div>
          <div><span className="text-zinc-600">Remaining Traditional:</span><span className="font-medium ml-2">$ {result.traditionalRemaining}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Roth Final Balance:</span><span className="font-bold text-green-700 ml-2">$ {result.rothFinalBalance}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Roth grows tax-free. Conversions reduce Traditional balance.</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">5-Year Rule & Ladder</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">First Roth Available:</span><span className="font-bold text-purple-700 ml-2">Age {result.firstRothAvailableAge}</span></div>
          <div><span className="text-zinc-600">Last Available:</span><span className="font-medium ml-2">Age {result.lastRothAvailableAge}</span></div>
          <div><span className="text-zinc-600">Gap Before Available:</span><span className="font-medium ml-2">{result.gapYears} years</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Each conversion needs 5 years before tax-free withdrawal. Plan early!</div>
      </div>

      <div className={`card mb-6 ${Number(result.taxSavingsIfHigherBracket) > 0 ? 'bg-teal-50 border border-teal-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${Number(result.taxSavingsIfHigherBracket) > 0 ? 'text-teal-700' : 'text-orange-700'}`}>Tax Savings Analysis</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Conversion Bracket:</span><span className="font-medium ml-2">{result.taxBracketRetirement}%</span></div>
          <div><span className="text-zinc-600">Working Bracket:</span><span className="font-medium ml-2">{result.taxBracketWorking}%</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Potential Tax Savings:</span><span className={`font-bold ml-2 ${Number(result.taxSavingsIfHigherBracket) > 0 ? 'text-teal-700' : 'text-orange-700'}`}>$ {result.taxSavingsIfHigherBracket}</span></div>
          <div><span className="text-zinc-600">ACA Impact:</span><span className="font-medium ml-2">{result.acaImpact}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Savings if you convert now vs. withdrawing at higher bracket later.</div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Bracket-Filling Recommendation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Current Bracket Limit:</span><span className="font-medium ml-2">$ {result.recommendedConversion}</span></div>
          <div><span className="text-zinc-600">Your Conversion:</span><span className="font-medium ml-2">$ {result.annualConversionAmount}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Fill lower brackets first. 12% bracket limit: $47,150 (single). Adjust conversion to optimize.</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Roth Conversion Ladder Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Start conversions 5+ years before needing income</li>
          <li>5-year rule: each conversion waits 5 years</li>
          <li>Convert during low-income years (lower bracket)</li>
          <li>Fill tax brackets efficiently (up to limit)</li>
          <li>Roth has no RMDs - better for estate</li>
          <li>Conversions count as income for ACA subsidies</li>
          <li>Plan gap years: other income sources needed</li>
          <li>Tax cost now vs. tax-free withdrawals later</li>
          <li>Start early to maximize ladder length</li>
          <li>Coordinate with Social Security timing</li>
        </ul>
      </div>
    </div>
  )
}