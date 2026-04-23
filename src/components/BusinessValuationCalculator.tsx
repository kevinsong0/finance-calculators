'use client'

import { useState } from 'react'

export default function BusinessValuationCalculator() {
  const [valuationMethod, setValuationMethod] = useState('multiples')
  const [annualRevenue, setAnnualRevenue] = useState('5000000')
  const [grossProfit, setGrossProfit] = useState('3000000')
  const [netIncome, setNetIncome] = useState('800000')
  const [ebitda, setEbitda] = useState('1200000')
  const [industry, setIndustry] = useState('tech')
  const [yearsInBusiness, setYearsInBusiness] = useState('10')
  const [growthRate, setGrowthRate] = useState('15')
  const [assetValue, setAssetValue] = useState('2000000')
  const [liabilities, setLiabilities] = useState('500000')
  const [discountRate, setDiscountRate] = useState('12')
  const [projectionYears, setProjectionYears] = useState('5')

  // Industry multiples
  const industryMultiples: Record<string, { revenue: number; ebitda: number; pe: number; description: string }> = {
    tech: { revenue: 2.5, ebitda: 12, pe: 25, description: 'SaaS/Software companies' },
    retail: { revenue: 0.5, ebitda: 4, pe: 12, description: 'Retail/e-commerce' },
    manufacturing: { revenue: 0.8, ebitda: 6, pe: 15, description: 'Manufacturing businesses' },
    healthcare: { revenue: 1.5, ebitda: 10, pe: 20, description: 'Healthcare services' },
    finance: { revenue: 2.0, ebitda: 15, pe: 18, description: 'Financial services' },
    consulting: { revenue: 1.0, ebitda: 8, pe: 14, description: 'Consulting/professional services' },
    restaurant: { revenue: 0.3, ebitda: 3, pe: 8, description: 'Restaurants/F&B' },
    construction: { revenue: 0.4, ebitda: 4, pe: 10, description: 'Construction businesses' },
    realEstate: { revenue: 1.2, ebitda: 10, pe: 15, description: 'Real estate services' },
    logistics: { revenue: 0.6, ebitda: 5, pe: 12, description: 'Logistics/transportation' },
  }

  const calculate = () => {
    const revenue = parseFloat(annualRevenue) || 0
    const gp = parseFloat(grossProfit) || 0
    const ni = parseFloat(netIncome) || 0
    const ebitdaVal = parseFloat(ebitda) || 0
    const years = parseFloat(yearsInBusiness) || 0
    const growth = parseFloat(growthRate) || 0
    const assets = parseFloat(assetValue) || 0
    const debts = parseFloat(liabilities) || 0
    const discount = parseFloat(discountRate) || 0
    const projYears = parseFloat(projectionYears) || 5

    const selectedIndustry = industryMultiples[industry] || industryMultiples['tech']

    // Method 1: Market Multiples
    const revenueMultipleVal = revenue * selectedIndustry.revenue
    const ebitdaMultipleVal = ebitdaVal * selectedIndustry.ebitda
    const peMultipleVal = ni > 0 ? ni * selectedIndustry.pe : 0

    // Method 2: Asset-Based
    const bookValue = assets - debts
    const adjustedBookValue = bookValue * 1.2 // Adjusted for market value

    // Method 3: DCF (Discounted Cash Flow)
    let dcfValue = 0
    const discountFactor = discount / 100

    // Project EBITDA with growth
    const projectedCashFlows: number[] = []
    for (let i = 1; i <= projYears; i++) {
      const projectedEbitda = ebitdaVal * Math.pow(1 + growth / 100, i)
      projectedCashFlows.push(projectedEbitda)
    }

    // Discount each year
    for (let i = 0; i < projectedCashFlows.length; i++) {
      dcfValue += projectedCashFlows[i] / Math.pow(1 + discountFactor, i + 1)
    }

    // Terminal value (perpetuity growth model)
    const terminalGrowth = 0.03 // 3% perpetual growth
    const terminalEbitda = projectedCashFlows[projYears - 1] * (1 + terminalGrowth)
    const terminalValue = terminalEbitda / (discountFactor - terminalGrowth)
    const discountedTerminal = terminalValue / Math.pow(1 + discountFactor, projYears)

    dcfValue += discountedTerminal

    // Method 4: Rule of Thumb adjustments
    const yearsAdjustment = years < 3 ? 0.7 : years < 5 ? 0.85 : years < 10 ? 0.95 : 1.0
    const growthAdjustment = growth < 5 ? 0.9 : growth < 10 ? 1.0 : growth < 20 ? 1.1 : 1.2

    // Weighted average valuation
    const multiplesAvg = (revenueMultipleVal + ebitdaMultipleVal + peMultipleVal) / 3
    const adjustedMultiples = multiplesAvg * yearsAdjustment * growthAdjustment

    // Final valuation range
    const lowEstimate = Math.min(bookValue, dcfValue * 0.8, adjustedMultiples * 0.9)
    const midEstimate = (adjustedMultiples + dcfValue + adjustedBookValue) / 3
    const highEstimate = Math.max(dcfValue, adjustedMultiples * 1.1, adjustedBookValue * 1.2)

    // Gross margin analysis
    const grossMargin = revenue > 0 ? (gp / revenue) * 100 : 0
    const netMargin = revenue > 0 ? (ni / revenue) * 100 : 0
    const ebitdaMargin = revenue > 0 ? (ebitdaVal / revenue) * 100 : 0

    return {
      valuationMethod,
      annualRevenue: revenue.toFixed(2),
      grossProfit: gp.toFixed(2),
      grossMargin: grossMargin.toFixed(1),
      netIncome: ni.toFixed(2),
      netMargin: netMargin.toFixed(1),
      ebitda: ebitdaVal.toFixed(2),
      ebitdaMargin: ebitdaMargin.toFixed(1),
      industry: industry.charAt(0).toUpperCase() + industry.slice(1),
      industryDescription: selectedIndustry.description,
      yearsInBusiness: years.toFixed(0),
      growthRate: growth.toFixed(1),
      assetValue: assets.toFixed(2),
      liabilities: debts.toFixed(2),
      bookValue: bookValue.toFixed(2),
      adjustedBookValue: adjustedBookValue.toFixed(2),
      revenueMultiple: selectedIndustry.revenue.toFixed(1),
      ebitdaMultiple: selectedIndustry.ebitda.toFixed(1),
      peMultiple: selectedIndustry.pe.toFixed(1),
      revenueMultipleVal: revenueMultipleVal.toFixed(2),
      ebitdaMultipleVal: ebitdaMultipleVal.toFixed(2),
      peMultipleVal: peMultipleVal.toFixed(2),
      multiplesAverage: multiplesAvg.toFixed(2),
      yearsAdjustment: yearsAdjustment.toFixed(2),
      growthAdjustment: growthAdjustment.toFixed(2),
      adjustedMultiples: adjustedMultiples.toFixed(2),
      dcfValue: dcfValue.toFixed(2),
      discountRate: discount.toFixed(1),
      projectionYears: projYears.toFixed(0),
      lowEstimate: lowEstimate.toFixed(2),
      midEstimate: midEstimate.toFixed(2),
      highEstimate: highEstimate.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Valuation Calculator</h1>
      <p className="text-zinc-600">Calculate business value using multiple methods: market multiples, DCF, asset-based. Understand valuation ranges, industry benchmarks, and factors affecting business worth.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Financial Data</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Revenue ($)</label>
            <input
              type="number"
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Gross Profit ($)</label>
            <input
              type="number"
              value={grossProfit}
              onChange={(e) => setGrossProfit(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Net Income ($)</label>
            <input
              type="number"
              value={netIncome}
              onChange={(e) => setNetIncome(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">EBITDA ($)</label>
            <input
              type="number"
              value={ebitda}
              onChange={(e) => setEbitda(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Earnings Before Interest, Taxes, Depreciation, Amortization
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Business Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="input"
            >
              <option value="tech">Technology/SaaS (Rev: 2.5x, EBITDA: 12x)</option>
              <option value="retail">Retail/e-Commerce (Rev: 0.5x, EBITDA: 4x)</option>
              <option value="manufacturing">Manufacturing (Rev: 0.8x, EBITDA: 6x)</option>
              <option value="healthcare">Healthcare (Rev: 1.5x, EBITDA: 10x)</option>
              <option value="finance">Financial Services (Rev: 2.0x, EBITDA: 15x)</option>
              <option value="consulting">Consulting (Rev: 1.0x, EBITDA: 8x)</option>
              <option value="restaurant">Restaurant/F&B (Rev: 0.3x, EBITDA: 3x)</option>
              <option value="construction">Construction (Rev: 0.4x, EBITDA: 4x)</option>
              <option value="realEstate">Real Estate (Rev: 1.2x, EBITDA: 10x)</option>
              <option value="logistics">Logistics (Rev: 0.6x, EBITDA: 5x)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years in Business</label>
            <input
              type="number"
              value={yearsInBusiness}
              onChange={(e) => setYearsInBusiness(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Under 3 years: 0.7x multiplier. 3-5 years: 0.85x. 5-10 years: 0.95x. Over 10: 1.0x
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annual Growth Rate (%)</label>
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              className="input"
              min="-20"
              max="100"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Under 5%: 0.9x. 5-10%: 1.0x. 10-20%: 1.1x. Over 20%: 1.2x
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Assets & Liabilities</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Asset Value ($)</label>
            <input
              type="number"
              value={assetValue}
              onChange={(e) => setAssetValue(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Equipment, inventory, real estate, IP, cash
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Liabilities ($)</label>
            <input
              type="number"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              className="input"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">DCF Parameters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Discount Rate (%)</label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              className="input"
              min="5"
              max="30"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Risk-adjusted rate. Small business: 15-25%. Established: 10-15%
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Projection Years</label>
            <input
              type="number"
              value={projectionYears}
              onChange={(e) => setProjectionYears(e.target.value)}
              className="input"
              min="3"
              max="10"
            />
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Profitability Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Gross Margin:</span>
            <span className="font-medium ml-2">{result.grossMargin}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Margin:</span>
            <span className="font-medium ml-2">{result.netMargin}%</span>
          </div>
          <div>
            <span className="text-zinc-600">EBITDA Margin:</span>
            <span className="font-bold ml-2">{result.ebitdaMargin}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Industry:</span>
            <span className="font-medium ml-2">{result.industry}</span>
          </div>
        </div>
      </div>

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Market Multiples Valuation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Revenue Multiple ({result.revenueMultiple}x):</span>
            <span className="font-medium ml-2">${result.revenueMultipleVal}</span>
          </div>
          <div>
            <span className="text-zinc-600">EBITDA Multiple ({result.ebitdaMultiple}x):</span>
            <span className="font-bold ml-2">${result.ebitdaMultipleVal}</span>
          </div>
          <div>
            <span className="text-zinc-600">P/E Multiple ({result.peMultiple}x):</span>
            <span className="font-medium ml-2">${result.peMultipleVal}</span>
          </div>
          <div>
            <span className="text-zinc-600">Multiples Average:</span>
            <span className="font-medium ml-2">${result.multiplesAverage}</span>
          </div>
        </div>
        <div className="text-xs text-purple-600 mt-2">
          {result.industryDescription} - Industry standard multiples applied
        </div>
      </div>

      <div className="card bg-teal-50 border border-teal-200">
        <h3 className="font-medium mb-2 text-teal-700">Asset-Based Valuation</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Book Value:</span>
            <span className="font-medium ml-2">${result.bookValue}</span>
          </div>
          <div>
            <span className="text-zinc-600">Adjusted Book Value:</span>
            <span className="font-bold ml-2">${result.adjustedBookValue}</span>
          </div>
        </div>
        <div className="text-xs text-teal-600 mt-2">
          Assets minus liabilities, adjusted for market value (1.2x factor)
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">DCF Valuation</h3>
        <div className="text-xl font-bold text-orange-800">${result.dcfValue}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">Discount Rate:</span>
            <span className="font-medium ml-2">{result.discountRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Projection Years:</span>
            <span className="font-medium ml-2">{result.projectionYears}</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          {result.projectionYears}-year projected EBITDA at {result.growthRate}% growth, discounted at {result.discountRate}% + 3% terminal growth
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Adjustment Factors</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Years Factor:</span>
            <span className="font-medium ml-2">{result.yearsAdjustment}x</span>
          </div>
          <div>
            <span className="text-zinc-600">Growth Factor:</span>
            <span className="font-medium ml-2">{result.growthAdjustment}x</span>
          </div>
          <div>
            <span className="text-zinc-600">Adjusted Multiples:</span>
            <span className="font-bold ml-2">${result.adjustedMultiples}</span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Final Valuation Range</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <span className="text-zinc-600 block">Low</span>
            <span className="text-lg font-bold text-green-800">${result.lowEstimate}</span>
          </div>
          <div className="text-center">
            <span className="text-zinc-600 block">Mid</span>
            <span className="text-2xl font-bold text-green-800">${result.midEstimate}</span>
          </div>
          <div className="text-center">
            <span className="text-zinc-600 block">High</span>
            <span className="text-lg font-bold text-green-800">${result.highEstimate}</span>
          </div>
        </div>
        <div className="text-xs text-green-600 mt-2">
          Weighted average across all valuation methods with risk adjustments
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Valuation Methods Explained</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Market Multiples:</strong> Compare to similar businesses sold. Revenue multiple for early-stage, EBITDA for profitable, P/E for stable earnings.</li>
          <li><strong>DCF:</strong> Project future cash flows and discount to present value. Best for growing businesses with predictable earnings.</li>
          <li><strong>Asset-Based:</strong> Book value (assets minus liabilities). Adjusted for market appreciation. Good for asset-heavy businesses.</li>
          <li><strong>Rule of Thumb:</strong> Industry-specific formulas (e.g., restaurants = 3x monthly gross, agencies = 0.75x annual revenue).</li>
          <li><strong>Factors:</strong> Years in business affects stability. Growth rate affects future potential. Customer concentration, key person risk, recurring revenue boost value.</li>
          <li><strong>Due Diligence:</strong> Verify financials, contracts, IP, legal issues, customer retention, employee turnover. Professional valuation recommended for M&A.</li>
        </ul>
      </div>
    </main>
  )
}