'use client'

import { useState } from 'react'

export default function RothConversionTimingCalculator() {
  const [currentAge, setCurrentAge] = useState(50)
  const [retirementAge, setRetirementAge] = useState(65)
  const [traditionalIRABalance, setTraditionalIRABalance] = useState(200000)
  const [four01kBalance, setFour01kBalance] = useState(300000)
  const [annualIncome, setAnnualIncome] = useState(100000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [conversionAmount, setConversionAmount] = useState(20000)
  const [conversionYears, setConversionYears] = useState(10)
  const [retirementTaxRate, setRetirementTaxRate] = useState(15)

  const calculate = () => {
    const totalPreTaxBalance = traditionalIRABalance + four01kBalance
    const conversionPerYear = Math.min(conversionAmount, totalPreTaxBalance / conversionYears)

    // Current year tax bracket (2024)
    let currentMarginalRate = 0.22
    if (filingStatus === 'single') {
      if (annualIncome <= 11000) currentMarginalRate = 0.10
      else if (annualIncome <= 44725) currentMarginalRate = 0.12
      else if (annualIncome <= 95475) currentMarginalRate = 0.22
      else if (annualIncome <= 182100) currentMarginalRate = 0.24
      else if (annualIncome <= 231250) currentMarginalRate = 0.32
      else currentMarginalRate = 0.35
    } else {
      if (annualIncome <= 22000) currentMarginalRate = 0.10
      else if (annualIncome <= 89450) currentMarginalRate = 0.12
      else if (annualIncome <= 190750) currentMarginalRate = 0.22
      else if (annualIncome <= 364200) currentMarginalRate = 0.24
      else if (annualIncome <= 462500) currentMarginalRate = 0.32
      else currentMarginalRate = 0.35
    }

    // Tax on conversion at current rate
    const conversionTaxCurrent = conversionPerYear * currentMarginalRate
    const conversionTaxRetirement = conversionPerYear * (retirementTaxRate / 100)
    const taxSavingsPerYear = conversionTaxRetirement - conversionTaxCurrent

    // Total conversion analysis
    const totalConversion = conversionPerYear * conversionYears
    const totalConversionTax = conversionTaxCurrent * conversionYears
    const totalTaxAtRetirement = conversionTaxRetirement * conversionYears
    const totalTaxSavings = totalTaxAtRetirement - totalConversionTax

    // Years to retirement
    const yearsToRetirement = retirementAge - currentAge

    // Projected growth (assuming 7% annual return)
    const growthRate = 0.07
    const projectedTraditionalBalance = traditionalIRABalance * Math.pow(1 + growthRate, yearsToRetirement)
    const projectedFour01kBalance = four01kBalance * Math.pow(1 + growthRate, yearsToRetirement)
    const projectedTotalPreTax = projectedTraditionalBalance + projectedFour01kBalance - totalConversion

    // If not converted: RMD starts at age 73 (2024 rule)
    const rmdStartAge = 73
    const yearsToRMD = Math.max(0, rmdStartAge - currentAge)

    // RMD calculation (simplified using uniform lifetime table factor)
    const rmdFactorAt73 = 26.5
    const estimatedRMD = projectedTotalPreTax / rmdFactorAt73
    const rmdTax = estimatedRMD * (retirementTaxRate / 100)

    // Conversion timing score
    let timingScore = 'Good'
    if (currentMarginalRate <= 0.22 && retirementTaxRate >= 15) {
      timingScore = 'Excellent - Low current rate, high retirement rate expected'
    } else if (currentMarginalRate >= 0.32 && retirementTaxRate <= 15) {
      timingScore = 'Poor - High current rate, low retirement rate expected'
    } else if (currentAge < 55 && yearsToRetirement > 10) {
      timingScore = 'Good - Long time for tax-free growth'
    } else if (currentAge >= 70) {
      timingScore = 'Urgent - Near RMD age, consider accelerated conversion'
    }

    // Optimal conversion window
    const optimalWindowStart = Math.max(55, currentAge)
    const optimalWindowEnd = Math.min(65, rmdStartAge - 3)
    const inOptimalWindow = currentAge >= optimalWindowStart && currentAge <= optimalWindowEnd

    return {
      currentAge: currentAge.toFixed(0),
      retirementAge: retirementAge.toFixed(0),
      yearsToRetirement: yearsToRetirement.toFixed(0),
      traditionalIRABalance: traditionalIRABalance.toFixed(0),
      four01kBalance: four01kBalance.toFixed(0),
      totalPreTaxBalance: totalPreTaxBalance.toFixed(0),
      conversionPerYear: conversionPerYear.toFixed(0),
      conversionYears: conversionYears.toFixed(0),
      totalConversion: totalConversion.toFixed(0),
      currentMarginalRate: (currentMarginalRate * 100).toFixed(0),
      conversionTaxCurrent: conversionTaxCurrent.toFixed(0),
      conversionTaxRetirement: conversionTaxRetirement.toFixed(0),
      retirementTaxRate: retirementTaxRate.toFixed(0),
      taxSavingsPerYear: taxSavingsPerYear.toFixed(0),
      totalConversionTax: totalConversionTax.toFixed(0),
      totalTaxAtRetirement: totalTaxAtRetirement.toFixed(0),
      totalTaxSavings: totalTaxSavings.toFixed(0),
      projectedTotalPreTax: projectedTotalPreTax.toFixed(0),
      rmdStartAge: rmdStartAge.toFixed(0),
      yearsToRMD: yearsToRMD.toFixed(0),
      estimatedRMD: estimatedRMD.toFixed(0),
      rmdTax: rmdTax.toFixed(0),
      timingScore,
      optimalWindowStart: optimalWindowStart.toFixed(0),
      optimalWindowEnd: optimalWindowEnd.toFixed(0),
      inOptimalWindow,
      filingStatus,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Roth Conversion Timing Calculator</h1>
      <p className="text-gray-600 mb-4">Optimize timing of Traditional IRA to Roth conversions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Traditional IRA Balance ($)</label>
          <input
            type="number"
            value={traditionalIRABalance}
            onChange={(e) => setTraditionalIRABalance(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">401(k) Balance ($)</label>
          <input
            type="number"
            value={four01kBalance}
            onChange={(e) => setFour01kBalance(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
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
        <div>
          <label className="block text-sm font-medium mb-1">Conversion Per Year ($)</label>
          <input
            type="number"
            value={conversionAmount}
            onChange={(e) => setConversionAmount(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conversion Years</label>
          <input
            type="number"
            value={conversionYears}
            onChange={(e) => setConversionYears(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expected Retirement Tax Rate (%)</label>
          <input
            type="number"
            value={retirementTaxRate}
            onChange={(e) => setRetirementTaxRate(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Pre-Tax Retirement Balance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Traditional IRA:</span>
            <span className="font-medium ml-2">$ {result.traditionalIRABalance}</span>
          </div>
          <div>
            <span className="text-zinc-600">401(k):</span>
            <span className="font-medium ml-2">$ {result.four01kBalance}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total:</span>
            <span className="font-bold text-blue-700 ml-2">$ {result.totalPreTaxBalance}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Conversion Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Conversion Per Year:</span>
            <span className="font-bold text-purple-700 ml-2">$ {result.conversionPerYear}</span>
          </div>
          <div>
            <span className="text-zinc-600">Conversion Years:</span>
            <span className="font-medium ml-2">{result.conversionYears}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Conversion:</span>
            <span className="font-bold ml-2">$ {result.totalConversion}</span>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Tax Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Current Marginal Rate:</span>
            <span className="font-bold ml-2">{result.currentMarginalRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Expected Retirement Rate:</span>
            <span className="font-bold ml-2">{result.retirementTaxRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Tax Now vs Later:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.totalTaxSavings) < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(result.totalTaxSavings) < 0 ? 'Save $' + Math.abs(parseFloat(result.totalTaxSavings)) : 'Cost $' + result.totalTaxSavings}
            </span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax (Convert Now):</span>
            <span className="font-bold text-orange-700 ml-2">$ {result.totalConversionTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">Total Tax (At Retirement):</span>
            <span className="font-bold ml-2">$ {result.totalTaxAtRetirement}</span>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">RMD Analysis (Age {result.rmdStartAge})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Years to RMD:</span>
            <span className="font-medium ml-2">{result.yearsToRMD}</span>
          </div>
          <div>
            <span className="text-zinc-600">Estimated First RMD:</span>
            <span className="font-bold ml-2">$ {result.estimatedRMD}</span>
          </div>
          <div>
            <span className="text-zinc-600">RMD Tax:</span>
            <span className="font-bold text-red-700 ml-2">$ {result.rmdTax}</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">
          RMDs required at age 73 (2024 rule). Roth IRA has NO RMDs. Converting reduces future RMD burden.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Optimal Conversion Window</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-zinc-600">Window Start:</span>
            <span className="font-medium ml-2">Age {result.optimalWindowStart}</span>
          </div>
          <div>
            <span className="text-zinc-600">Window End:</span>
            <span className="font-medium ml-2">Age {result.optimalWindowEnd}</span>
          </div>
          <div>
            <span className="text-zinc-600">Currently In Window:</span>
            <span className={`font-bold ml-2 ${result.inOptimalWindow ? 'text-green-600' : 'text-orange-600'}`}>
              {result.inOptimalWindow ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Timing Assessment</h2>
        <div className="text-sm text-teal-700">{result.timingScore}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Roth Conversion Timing Factors</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Convert when marginal rate lower than expected retirement rate</li>
          <li>Optimal window: age 55-65 (before RMDs, lower income possible)</li>
          <li>Roth growth: tax-free for 10-20 years before withdrawals</li>
          <li>No RMDs on Roth: pass to heirs tax-free</li>
          <li>Consider partial conversions to stay in lower bracket</li>
        </ul>
      </div>

      <div className="card bg-red-50 border border-red-200 mt-4">
        <h3 className="font-medium mb-2 text-red-700">When NOT to Convert</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Current marginal rate higher than retirement rate</li>
          <li>Need funds within 5 years (5-year rule applies)</li>
          <li>Converting pushes into much higher bracket</li>
          <li>Limited time for tax-free growth (near retirement)</li>
          <li>Plan to leave pre-tax assets to charity (tax-free)</li>
        </ul>
      </div>
    </div>
  )
}