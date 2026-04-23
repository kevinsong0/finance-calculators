'use client'

import { useState } from 'react'

export default function IntangibleAssetsAmortizationCalculator() {
  const [assetCost, setAssetCost] = useState(500000)
  const [assetType, setAssetType] = useState<'patent' | 'trademark' | 'copyright' | 'software' | 'goodwill' | 'license'>('patent')
  const [usefulLife, setUsefulLife] = useState(15)
  const [acquisitionDate, setAcquisitionDate] = useState('2024-01-01')
  const [amortizationMethod, setAmortizationMethod] = useState<'straightLine' | 'accelerated'>('straightLine')
  const [residualValue, setResidualValue] = useState(0)
  const [taxAmortizationPeriod, setTaxAmortizationPeriod] = useState(15)
  const [impairmentLoss, setImpairmentLoss] = useState(0)

  const calculate = () => {
    // Intangible Assets Amortization Calculator
    // Amortization is the process of expensing intangible assets over their useful life

    // Tax rules (Section 197):
    // - Most intangibles: 15-year amortization, straight-line
    // - Includes: goodwill, going concern value, workforce, patents, trademarks, customer lists
    // - Section 197 intangibles: cannot be amortized separately
    // - Start: month of acquisition or beginning of next month

    // Non-Section 197 intangibles:
    // - Patents (acquired separately): useful life
    // - Copyrights: useful life
    // - Software (off-the-shelf): 3 years

    const cost = assetCost
    const taxPeriod = taxAmortizationPeriod
    const useful = usefulLife

    // Straight-line amortization
    const annualSLAmortization = (cost - residualValue) / useful
    const monthlySLAmortization = annualSLAmortization / 12

    // Tax amortization (Section 197: 15 years straight-line)
    const annualTaxAmortization = cost / taxPeriod
    const monthlyTaxAmortization = annualTaxAmortization / 12

    // Accelerated amortization (if applicable)
    // For non-Section 197 assets, may be able to use faster amortization
    let acceleratedFactor = 1
    let annualAcceleratedAmortization = 0
    if (amortizationMethod === 'accelerated') {
      acceleratedFactor = 1.5 // Simplified 150% declining balance
      annualAcceleratedAmortization = (cost / useful) * acceleratedFactor
    }

    // Cumulative amortization schedule
    const yearsSchedule: { year: number; bookAmort: number; taxAmort: number; bookRemaining: number; taxRemaining: number }[] = []
    let cumulativeBook = 0
    let cumulativeTax = 0

    for (let i = 1; i <= useful; i++) {
      const bookAmortForYear = amortizationMethod === 'straightLine'
        ? annualSLAmortization
        : Math.min(annualAcceleratedAmortization * Math.pow(0.5, i - 1), cost - cumulativeBook)

      const taxAmortForYear = i <= taxPeriod ? annualTaxAmortization : 0

      cumulativeBook += bookAmortForYear
      cumulativeTax += taxAmortForYear

      yearsSchedule.push({
        year: i,
        bookAmort: bookAmortForYear,
        taxAmort: taxAmortForYear,
        bookRemaining: Math.max(0, cost - cumulativeBook),
        taxRemaining: Math.max(0, cost - cumulativeTax),
      })
    }

    // Tax benefit from amortization
    const taxRate = 0.24 // Simplified
    const annualTaxBenefit = annualTaxAmortization * taxRate
    const totalTaxBenefit = cost * taxRate

    // Impairment impact
    const impairmentTaxDeduction = impairmentLoss * taxRate
    const impairedValue = cost - impairmentLoss

    // Book vs tax difference (timing difference)
    const bookTaxDifference = annualSLAmortization - annualTaxAmortization

    // Section 197 rules explanation
    const section197Rules = {
      period: '15-year straight-line amortization',
      start: 'Month of acquisition or next month',
      included: 'Goodwill, patents, trademarks, customer lists, workforce',
      notIncluded: 'Separately acquired patents, copyrights, off-the-shelf software',
      noSeparate: 'Section 197 intangibles amortized as single asset',
    }

    // Asset-specific rules
    const assetRules: Record<string, string> = {
      patent: 'Section 197: 15 years if acquired with business. Separately: useful life.',
      trademark: 'Section 197: 15 years. Renewable trademarks: renew when expired.',
      copyright: 'Useful life or 15 years if Section 197.',
      software: 'Off-the-shelf: 3 years. Developed: capitalize and amortize.',
      goodwill: 'Section 197: 15 years mandatory. Indefinite life for book.',
      license: 'Useful life of license term. Section 197 if with business acquisition.',
    }

    // Recommendation
    let recommendation = ''
    if (taxAmortizationPeriod !== 15 && ['goodwill', 'trademark'].includes(assetType)) {
      recommendation = 'Warning: Section 197 assets must use 15-year amortization. Tax period should be 15 years.'
    } else if (usefulLife !== taxAmortizationPeriod) {
      recommendation = `Book (${usefulLife}y) vs Tax (${taxPeriod}y) difference creates timing adjustment. Track deferred tax asset/liability.`
    } else {
      recommendation = `Annual tax deduction of $${annualTaxAmortization.toFixed(0)} for ${taxPeriod} years. Total tax benefit: $${totalTaxBenefit.toFixed(0)}.`
    }

    return {
      assetCost: assetCost.toFixed(0),
      assetType,
      usefulLife: usefulLife.toFixed(0),
      taxAmortizationPeriod: taxAmortizationPeriod.toFixed(0),
      amortizationMethod,
      residualValue: residualValue.toFixed(0),
      annualSLAmortization: annualSLAmortization.toFixed(0),
      monthlySLAmortization: monthlySLAmortization.toFixed(0),
      annualTaxAmortization: annualTaxAmortization.toFixed(0),
      monthlyTaxAmortization: monthlyTaxAmortization.toFixed(0),
      annualAcceleratedAmortization: annualAcceleratedAmortization.toFixed(0),
      acceleratedFactor: acceleratedFactor.toFixed(1),
      annualTaxBenefit: annualTaxBenefit.toFixed(0),
      totalTaxBenefit: totalTaxBenefit.toFixed(0),
      impairmentLoss: impairmentLoss.toFixed(0),
      impairmentTaxDeduction: impairmentTaxDeduction.toFixed(0),
      impairedValue: impairedValue.toFixed(0),
      bookTaxDifference: bookTaxDifference.toFixed(0),
      yearsSchedule,
      section197Rules,
      assetRules,
      recommendation,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Intangible Assets Amortization Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate amortization for patents, trademarks, goodwill, and other intangibles.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Asset Cost</label>
          <input type="number" value={assetCost} onChange={(e) => setAssetCost(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Asset Type</label>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value as 'patent' | 'trademark' | 'copyright' | 'software' | 'goodwill' | 'license')} className="w-full border rounded p-2">
            <option value="patent">Patent</option>
            <option value="trademark">Trademark</option>
            <option value="copyright">Copyright</option>
            <option value="software">Software</option>
            <option value="goodwill">Goodwill</option>
            <option value="license">License/Franchise</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Useful Life (Years)</label>
          <input type="number" value={usefulLife} min="1" max="40" onChange={(e) => setUsefulLife(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tax Amortization Period (Years)</label>
          <input type="number" value={taxAmortizationPeriod} min="1" max="40" onChange={(e) => setTaxAmortizationPeriod(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amortization Method</label>
          <select value={amortizationMethod} onChange={(e) => setAmortizationMethod(e.target.value as 'straightLine' | 'accelerated')} className="w-full border rounded p-2">
            <option value="straightLine">Straight-Line</option>
            <option value="accelerated">Accelerated (150% DB)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Impairment Loss</label>
          <input type="number" value={impairmentLoss} min="0" onChange={(e) => setImpairmentLoss(Number(e.target.value))} className="w-full border rounded p-2" />
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Annual Amortization</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Asset Cost:</span><span className="font-medium ml-2">$ {result.assetCost}</span></div>
          <div><span className="text-zinc-600">Book Annual:</span><span className="font-bold ml-2">$ {result.annualSLAmortization}</span></div>
          <div><span className="text-zinc-600">Tax Annual:</span><span className="font-bold text-blue-700 ml-2">$ {result.annualTaxAmortization}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Monthly:</span><span className="font-medium ml-2">$ {result.monthlyTaxAmortization}</span></div>
          <div><span className="text-zinc-600">Period:</span><span className="font-medium ml-2">{result.taxAmortizationPeriod} years</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.assetRules[result.assetType]}</div>
      </div>

      <div className="card bg-green-50 border border-green-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-700">Tax Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Annual Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.annualTaxBenefit}</span></div>
          <div><span className="text-zinc-600">Total Benefit:</span><span className="font-bold text-green-700 ml-2">$ {result.totalTaxBenefit}</span></div>
          <div><span className="text-zinc-600">Tax Rate:</span><span className="font-medium ml-2">24%</span></div>
        </div>
      </div>

      {Number(result.impairmentLoss) > 0 && (
        <div className="card bg-orange-50 border border-orange-200 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-orange-700">Impairment Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Impairment:</span><span className="font-bold text-orange-700 ml-2">$ {result.impairmentLoss}</span></div>
            <div><span className="text-zinc-600">Tax Deduction:</span><span className="font-bold text-green-700 ml-2">$ {result.impairmentTaxDeduction}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div><span className="text-zinc-600">Impaired Value:</span><span className="font-medium ml-2">$ {result.impairedValue}</span></div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Amortization Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Year</th>
                <th className="py-2 text-left">Book Amort</th>
                <th className="py-2 text-left">Tax Amort</th>
                <th className="py-2 text-left">Book Remain</th>
                <th className="py-2 text-left">Tax Remain</th>
              </tr>
            </thead>
            <tbody>
              {result.yearsSchedule.slice(0, 10).map((y) => (
                <tr key={y.year} className="border-b">
                  <td className="py-1">{y.year}</td>
                  <td className="py-1">$ {y.bookAmort.toFixed(0)}</td>
                  <td className="py-1">$ {y.taxAmort.toFixed(0)}</td>
                  <td className="py-1">$ {y.bookRemaining.toFixed(0)}</td>
                  <td className="py-1">$ {y.taxRemaining.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {Number(result.bookTaxDifference) !== 0 && (
        <div className="card bg-teal-50 border border-teal-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Book vs Tax Difference</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-zinc-600">Difference:</span><span className="font-bold ml-2">$ {result.bookTaxDifference}</span></div>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Creates deferred tax asset/liability. Track for financial reporting.</div>
        </div>
      )}

      <div className={`card mb-6 ${result.recommendation.includes('Warning') ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
        <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
        <div className="text-sm text-zinc-600">{result.recommendation}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Section 197 Rules</h2>
        <div className="text-xs text-zinc-600 space-y-1">
          <div><span className="font-semibold">Period:</span> {result.section197Rules.period}</div>
          <div><span className="font-semibold">Start:</span> {result.section197Rules.start}</div>
          <div><span className="font-semibold">Included:</span> {result.section197Rules.included}</div>
          <div><span className="font-semibold">Not Included:</span> {result.section197Rules.notIncluded}</div>
          <div><span className="font-semibold">No Separate:</span> {result.section197Rules.noSeparate}</div>
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Intangible Amortization Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Section 197: 15-year mandatory</li>
          <li>Goodwill always Section 197</li>
          <li>Patents: 15y if with business</li>
          <li>Software: 3 years off-the-shelf</li>
          <li>Start month of acquisition</li>
          <li>Straight-line for tax</li>
          <li>No residual value for tax</li>
          <li>Impairment: immediate deduction</li>
          <li>Track book vs tax</li>
          <li>Form 4562 for reporting</li>
        </ul>
      </div>
    </div>
  )
}