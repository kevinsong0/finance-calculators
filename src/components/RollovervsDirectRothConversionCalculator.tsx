'use client'

import { useState } from 'react'

export default function RollovervsDirectRothConversionCalculator() {
  const [accountType, setAccountType] = useState<'401k' | 'ira' | '403b'>('401k')
  const [conversionAmount, setConversionAmount] = useState(50000)
  const [currentAge, setCurrentAge] = useState(45)
  const [taxBracket, setTaxBracket] = useState(24)
  const [stateTaxRate, setStateTaxRate] = useState(5)
  const [planToLeaveJob, setPlanToLeaveJob] = useState(false)
  const [current401kPlanAllows, setCurrent401kPlanAllows] = useState(true)
  const [targetIraProvider, setTargetIraProvider] = useState('fidelity')
  const [investmentOptions401k, setInvestmentOptions401k] = useState('limited')
  const [investmentOptionsIra, setInvestmentOptionsIra] = useState('broad')
  const [hasAfterTaxContributions, setHasAfterTaxContributions] = useState(false)
  const [afterTaxAmount, setAfterTaxAmount] = useState(10000)

  const calculate = () => {
    // Rollover vs Direct Roth Conversion Analysis
    // Two paths to Roth:
    // 1. Rollover 401k to Traditional IRA, then convert to Roth IRA
    // 2. Direct in-plan Roth conversion (if 401k plan allows)

    // Key differences:
    // Rollover path: more flexibility, IRA investment options
    // Direct conversion: stays in 401k plan, plan investment options

    // Calculate tax impact (same for both paths)
    const federalTax = conversionAmount * (taxBracket / 100)
    const stateTax = conversionAmount * (stateTaxRate / 100)
    const totalTax = federalTax + stateTax

    // After-tax contributions (if applicable)
    // Mega backdoor Roth: after-tax 401k → Roth conversion
    // In-plan: Roth 401k conversion of after-tax
    // Rollover: after-tax goes to Roth IRA directly

    let afterTaxConversion = 0
    if (hasAfterTaxContributions) {
      // After-tax portion converts tax-free
      afterTaxConversion = afterTaxAmount
    }

    const totalConversion = conversionAmount + afterTaxConversion
    const totalTaxWithAfterTax = federalTax + stateTax // After-tax portion tax-free

    // Path 1: Rollover to IRA then convert
    const rolloverPath = {
      steps: ['Rollover 401k to Traditional IRA', 'Convert Traditional IRA to Roth IRA'],
      advantages: ['Broader investment options', 'More control', 'No plan restrictions', 'Can convert partial amounts'],
      disadvantages: ['Two-step process', 'IRA rules apply', 'Possible IRA fees', 'Cannot reverse'],
      timeline: '2-6 weeks for rollover, then convert',
    }

    // Path 2: Direct in-plan Roth conversion
    const directPath = {
      steps: ['In-plan Roth conversion (if allowed)'],
      advantages: ['Single step', 'Stay in employer plan', 'No IRA setup', 'May have plan loans'],
      disadvantages: ['Limited investment options', 'Plan rules apply', 'Must leave job to rollover', 'Plan may not allow'],
      timeline: 'Immediate if plan allows',
    }

    // Investment flexibility comparison
    let investmentFlexibility = ''
    if (investmentOptions401k === 'limited' && investmentOptionsIra === 'broad') {
      investmentFlexibility = 'IRA offers better investment options'
    } else if (investmentOptions401k === 'broad') {
      investmentFlexibility = '401k options adequate'
    } else {
      investmentFlexibility = 'Similar investment options'
    }

    // Recommendation factors
    const rolloverFactors: string[] = []
    const directFactors: string[] = []

    if (!current401kPlanAllows) rolloverFactors.push('Plan does not allow in-plan Roth')
    if (planToLeaveJob) rolloverFactors.push('Leaving job soon - rollover easier')
    if (investmentOptions401k === 'limited') rolloverFactors.push('Need broader investments')
    if (hasAfterTaxContributions) rolloverFactors.push('After-tax can go direct to Roth')
    if (targetIraProvider !== 'none') rolloverFactors.push('Prefer specific IRA provider')

    if (current401kPlanAllows) directFactors.push('Plan allows direct conversion')
    if (investmentOptions401k === 'broad') directFactors.push('401k investments adequate')
    if (!planToLeaveJob) directFactors.push('Staying with employer')
    if (accountType === '403b') directFactors.push('403b often allows in-plan')

    // Best path recommendation
    let recommendedPath = ''
    let recommendation = ''

    if (!current401kPlanAllows && accountType === '401k') {
      recommendedPath = 'Rollover Path (Required)'
      recommendation = 'Plan does not allow in-plan Roth - must rollover to IRA first'
    } else if (planToLeaveJob) {
      recommendedPath = 'Rollover Path'
      recommendation = 'Leaving job soon - rollover gives more flexibility and control'
    } else if (investmentOptions401k === 'limited' && investmentOptionsIra === 'broad') {
      recommendedPath = 'Rollover Path'
      recommendation = 'IRA offers better investment options worth the extra step'
    } else if (hasAfterTaxContributions && current401kPlanAllows) {
      recommendedPath = 'Either Path Works'
      recommendation = 'After-tax can go Roth in either path. Consider investment needs'
    } else if (current401kPlanAllows && investmentOptions401k !== 'limited') {
      recommendedPath = 'Direct Conversion'
      recommendation = 'Plan allows and investments adequate - simpler single step'
    } else {
      recommendedPath = 'Rollover Path'
      recommendation = 'More flexibility with IRA rollover approach'
    }

    // Roth conversion timing considerations
    // Early in year: more time to recharacterize (before 2018 eliminated)
    // Late in year: know full year income for bracket planning
    const timingNote = 'Convert when tax bracket known. No recharacterization allowed after 2018.'

    // Five-year rule
    // Roth IRA: 5 years from first Roth contribution
    // Roth 401k: 5 years from conversion, separate clock
    const fiveYearRule = {
      rothIRA: '5 years from first Roth IRA contribution for tax-free withdrawals',
      roth401k: '5 years from each conversion for penalty-free (amounts subject to ordering rules)',
      note: 'Both require age 59½ for tax-free earnings',
    }

    // Tax brackets and timing
    // Consider current year expected income
    // Conversion adds to AGI
    const addedAGI = conversionAmount
    const newBracketRisk = addedAGI > 50000 ? 'May push into higher bracket' : 'Within current bracket likely'

    return {
      accountType,
      conversionAmount: conversionAmount.toFixed(0),
      currentAge: currentAge.toFixed(0),
      taxBracket: taxBracket.toFixed(0),
      stateTaxRate: stateTaxRate.toFixed(0),
      federalTax: federalTax.toFixed(0),
      stateTax: stateTax.toFixed(0),
      totalTax: totalTax.toFixed(0),
      hasAfterTaxContributions,
      afterTaxAmount: afterTaxAmount.toFixed(0),
      afterTaxConversion: afterTaxConversion.toFixed(0),
      totalConversion: totalConversion.toFixed(0),
      planToLeaveJob,
      current401kPlanAllows,
      investmentOptions401k,
      investmentOptionsIra,
      targetIraProvider,
      rolloverPath,
      directPath,
      investmentFlexibility,
      rolloverFactors,
      directFactors,
      recommendedPath,
      recommendation,
      timingNote,
      fiveYearRule,
      addedAGI: addedAGI.toFixed(0),
      newBracketRisk,
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rollover vs Direct Roth Conversion Calculator</h1>
      <p className="text-gray-600 mb-4">Compare paths to convert retirement funds to Roth.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value as '401k' | 'ira' | '403b')} className="w-full border rounded p-2">
            <option value="401k">401(k)</option>
            <option value="ira">Traditional IRA</option>
            <option value="403b">403(b)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conversion Amount</label>
          <input type="number" value={conversionAmount} onChange={(e) => setConversionAmount(Number(e.target.value))} className="w-full border rounded p-2" />
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
          <label className="block text-sm font-medium mb-1">Plan Allows In-Plan Roth?</label>
          <select value={current401kPlanAllows ? 'yes' : 'no'} onChange={(e) => setCurrent401kPlanAllows(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="yes">Yes - plan allows conversion</option>
            <option value="no">No - not available</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Plan to Leave Job?</label>
          <select value={planToLeaveJob ? 'yes' : 'no'} onChange={(e) => setPlanToLeaveJob(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No - staying with employer</option>
            <option value="yes">Yes - leaving soon</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">401k Investment Options</label>
          <select value={investmentOptions401k} onChange={(e) => setInvestmentOptions401k(e.target.value)} className="w-full border rounded p-2">
            <option value="limited">Limited - few choices</option>
            <option value="adequate">Adequate - reasonable options</option>
            <option value="broad">Broad - many options</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Has After-Tax Contributions?</label>
          <select value={hasAfterTaxContributions ? 'yes' : 'no'} onChange={(e) => setHasAfterTaxContributions(e.target.value === 'yes')} className="w-full border rounded p-2">
            <option value="no">No</option>
            <option value="yes">Yes - mega backdoor eligible</option>
          </select>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-orange-700">Tax Impact (Both Paths)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><span className="text-zinc-600">Conversion:</span><span className="font-medium ml-2">$ {result.conversionAmount}</span></div>
          <div><span className="text-zinc-600">Federal Tax:</span><span className="font-bold text-orange-700 ml-2">$ {result.federalTax}</span></div>
          <div><span className="text-zinc-600">State Tax:</span><span className="font-medium ml-2">$ {result.stateTax}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div><span className="text-zinc-600">Total Tax:</span><span className="font-bold text-red-700 ml-2">$ {result.totalTax}</span></div>
          <div><span className="text-zinc-600">Bracket:</span><span className="font-medium ml-2">{result.taxBracket}%</span></div>
        </div>
        {result.hasAfterTaxContributions && (
          <div className="text-xs text-green-600 mt-2">After-tax $ {result.afterTaxAmount} converts tax-free (mega backdoor Roth)</div>
        )}
        <div className="text-xs text-zinc-600 mt-2">Same tax impact whether rollover or direct conversion.</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Rollover Path (401k → IRA → Roth IRA)</h2>
        <div className="text-sm text-zinc-600 mb-2">Steps: {result.rolloverPath.steps.join(' → ')}</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-blue-700 mb-1">Advantages</div>
            <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
              {result.rolloverPath.advantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-red-700 mb-1">Disadvantages</div>
            <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
              {result.rolloverPath.disadvantages.map((dis, i) => (
                <li key={i}>{dis}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Timeline: {result.rolloverPath.timeline}</div>
      </div>

      <div className="card bg-purple-50 border border-purple-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Direct In-Plan Roth Conversion</h2>
        <div className="text-sm text-zinc-600 mb-2">Steps: {result.directPath.steps.join(' → ')}</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-purple-700 mb-1">Advantages</div>
            <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
              {result.directPath.advantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-red-700 mb-1">Disadvantages</div>
            <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
              {result.directPath.disadvantages.map((dis, i) => (
                <li key={i}>{dis}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">Timeline: {result.directPath.timeline}. Requires plan to allow.</div>
      </div>

      <div className={`card mb-6 ${result.recommendedPath.includes('Rollover') ? 'bg-teal-50 border border-teal-200' : 'bg-orange-50 border border-orange-200'}`}>
        <h2 className={`text-lg font-semibold mb-3 ${result.recommendedPath.includes('Rollover') ? 'text-teal-700' : 'text-orange-700'}`}>Recommended Path</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Recommended:</span><span className="font-bold ml-2">{result.recommendedPath}</span></div>
          <div><span className="text-zinc-600">Investments:</span><span className="font-medium ml-2">{result.investmentFlexibility}</span></div>
        </div>
        <div className="text-sm text-zinc-600 mt-2">{result.recommendation}</div>
      </div>

      <div className="card bg-teal-50 border border-teal-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Decision Factors</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-teal-700 mb-1">Rollover Factors</div>
            <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
              {result.rolloverFactors.map((factor, i) => (
                <li key={i}>{factor}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-purple-700 mb-1">Direct Factors</div>
            <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
              {result.directFactors.map((factor, i) => (
                <li key={i}>{factor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">AGI Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-zinc-600">Added to AGI:</span><span className="font-bold ml-2">$ {result.addedAGI}</span></div>
          <div><span className="text-zinc-600">Bracket Risk:</span><span className="font-medium ml-2">{result.newBracketRisk}</span></div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.timingNote}</div>
      </div>

      <div className="card bg-blue-50 border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold mb-3">Five-Year Rule</h2>
        <div className="text-sm text-zinc-600 space-y-1">
          <div><span className="font-semibold">Roth IRA:</span> {result.fiveYearRule.rothIRA}</div>
          <div><span className="font-semibold">Roth 401k:</span> {result.fiveYearRule.roth401k}</div>
        </div>
        <div className="text-xs text-zinc-600 mt-2">{result.fiveYearRule.note}</div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Roth Conversion Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Same tax either path</li>
          <li>Rollover: more control</li>
          <li>Direct: simpler if plan allows</li>
          <li>After-tax: tax-free Roth</li>
          <li>IRA: broader investments</li>
          <li>401k: plan rules apply</li>
          <li>5-year rule applies</li>
          <li>No recharacterization</li>
          <li>Consider timing</li>
          <li>Check plan allows</li>
        </ul>
      </div>
    </div>
  )
}