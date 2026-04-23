'use client'

import { useState } from 'react'

export default function IncomeAnnuityCalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState('500000')
  const [annuityType, setAnnuityType] = useState('fixed')
  const [currentAge, setCurrentAge] = useState('65')
  const [paymentFrequency, setPaymentFrequency] = useState('monthly')
  const [deferralYears, setDeferralYears] = useState('0')
  const [guaranteeYears, setGuaranteeYears] = useState('0')
  const [jointLife, setJointLife] = useState(false)
  const [spouseAge, setSpouseAge] = useState('63')
  const [inflationProtection, setInflationProtection] = useState(false)
  const [inflationRate, setInflationRate] = useState('3')
  const [payoutRate, setPayoutRate] = useState('5')

  // Approximate payout rates by age (fixed immediate annuity)
  const payoutRatesByAge: Record<number, number> = {
    55: 4.0,
    60: 4.5,
    65: 5.5,
    70: 6.5,
    75: 7.5,
    80: 9.0,
    85: 11.0,
  }

  const calculate = () => {
    const purchase = parseFloat(purchaseAmount) || 0
    const age = parseFloat(currentAge) || 65
    const spouse = parseFloat(spouseAge) || 65
    const defer = parseFloat(deferralYears) || 0
    const guarantee = parseFloat(guaranteeYears) || 0
    const inflation = parseFloat(inflationRate) || 3
    const rate = parseFloat(payoutRate) || 5
    const isJoint = jointLife
    const hasInflationProtection = inflationProtection
    const isFixed = annuityType === 'fixed'
    const isVariable = annuityType === 'variable'

    // Base payout rate (lookup by age)
    let basePayoutRate = payoutRatesByAge[age] || 5.5

    // Adjustments
    if (isJoint) {
      basePayoutRate *= 0.85 // Joint life reduces payout ~15%
    }
    if (defer > 0) {
      basePayoutRate *= (1 + defer * 0.05) // Deferral increases payout ~5% per year
    }
    if (guarantee > 0) {
      basePayoutRate *= (1 - guarantee * 0.02) // Guarantee period reduces payout ~2% per year
    }
    if (hasInflationProtection) {
      basePayoutRate *= 0.75 // Inflation protection reduces initial payout ~25%
    }

    // Override with custom rate if specified
    const effectivePayoutRate = isFixed ? basePayoutRate : rate

    // Calculate payments
    const annualPayment = purchase * (effectivePayoutRate / 100)
    const monthlyPayment = annualPayment / 12
    const quarterlyPayment = annualPayment / 4
    const semiannualPayment = annualPayment / 2

    // Choose payment based on frequency
    const periodicPayment = paymentFrequency === 'monthly' ? monthlyPayment :
                            paymentFrequency === 'quarterly' ? quarterlyPayment :
                            paymentFrequency === 'semiannual' ? semiannualPayment : annualPayment

    // Total guaranteed payments (if guarantee period)
    const guaranteedTotal = guarantee > 0 ? periodicPayment * (paymentFrequency === 'monthly' ? guarantee * 12 :
                               paymentFrequency === 'quarterly' ? guarantee * 4 :
                               paymentFrequency === 'semiannual' ? guarantee * 2 : guarantee) : 0

    // Life expectancy estimate (simplified)
    const lifeExpectancy = age < 65 ? 85 - age : 90 - age
    const expectedTotalPayments = periodicPayment * (paymentFrequency === 'monthly' ? lifeExpectancy * 12 :
                                   paymentFrequency === 'quarterly' ? lifeExpectancy * 4 :
                                   paymentFrequency === 'semiannual' ? lifeExpectancy * 2 : lifeExpectancy)

    // Inflation-adjusted projections
    let year1Payment = periodicPayment
    let year10Payment = periodicPayment
    let year20Payment = periodicPayment

    if (hasInflationProtection) {
      year10Payment = periodicPayment * Math.pow(1 + inflation / 100, 10)
      year20Payment = periodicPayment * Math.pow(1 + inflation / 100, 20)
    } else {
      // Show what inflation does WITHOUT protection
      year10Payment = periodicPayment / Math.pow(1 + inflation / 100, 10)
      year20Payment = periodicPayment / Math.pow(1 + inflation / 100, 20)
    }

    // Internal rate of return estimate
    // Simplified: assumes average life expectancy
    const totalProjectedReturn = expectedTotalPayments
    const irrEstimate = totalProjectedReturn > purchase ?
      ((totalProjectedReturn / purchase) - 1) / lifeExpectancy * 100 : 0

    // Comparison: CD/Bond rates
    const cdRate = 4.5 // Approximate 2024 CD rate
    const bondRate = 5.0 // Approximate bond yield
    const cdAnnualPayment = purchase * (cdRate / 100)
    const bondAnnualPayment = purchase * (bondRate / 100)

    // Break-even analysis
    const breakEvenYears = purchase / annualPayment

    return {
      purchaseAmount: purchase.toFixed(2),
      annuityType: isFixed ? 'Fixed Immediate Annuity' :
                  isVariable ? 'Variable Annuity' : 'Indexed Annuity',
      currentAge: age.toFixed(0),
      paymentFrequency: paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1),
      deferralYears: defer.toFixed(0),
      guaranteeYears: guarantee.toFixed(0),
      jointLife: isJoint,
      spouseAge: spouse.toFixed(0),
      inflationProtection: hasInflationProtection,
      basePayoutRate: basePayoutRate.toFixed(2),
      effectivePayoutRate: effectivePayoutRate.toFixed(2),
      annualPayment: annualPayment.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      quarterlyPayment: quarterlyPayment.toFixed(2),
      semiannualPayment: semiannualPayment.toFixed(2),
      periodicPayment: periodicPayment.toFixed(2),
      guaranteedTotal: guaranteedTotal.toFixed(2),
      lifeExpectancy: lifeExpectancy.toFixed(0),
      expectedTotalPayments: expectedTotalPayments.toFixed(2),
      year1Payment: year1Payment.toFixed(2),
      year10Payment: year10Payment.toFixed(2),
      year20Payment: year20Payment.toFixed(2),
      inflationRate: inflation.toFixed(1),
      irrEstimate: irrEstimate.toFixed(2),
      cdAnnualPayment: cdAnnualPayment.toFixed(2),
      bondAnnualPayment: bondAnnualPayment.toFixed(2),
      breakEvenYears: breakEvenYears.toFixed(1),
      isFixed,
      isVariable,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Income Annuity Calculator</h1>
      <p className="text-zinc-600">Calculate immediate and deferred income annuity payments. Compare fixed, variable, and indexed annuities. Understand payout rates, inflation impact, and guarantee periods.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Annuity Purchase</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Amount ($)</label>
            <input
              type="number"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              className="input"
              min="10000"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Annuity Type</label>
            <select
              value={annuityType}
              onChange={(e) => setAnnuityType(e.target.value)}
              className="input"
            >
              <option value="fixed">Fixed Immediate Annuity (Guaranteed payments)</option>
              <option value="variable">Variable Annuity (Market-linked payments)</option>
              <option value="indexed">Indexed Annuity (Hybrid with upside cap)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Your Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="input"
              min="50"
              max="90"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Payout rate increases with age. Age 55: ~4%. Age 65: ~5.5%. Age 75: ~7.5%
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Payment Options</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Payment Frequency</label>
            <select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              className="input"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semiannual">Semi-Annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Deferral Period (Years)</label>
            <input
              type="number"
              value={deferralYears}
              onChange={(e) => setDeferralYears(e.target.value)}
              className="input"
              min="0"
              max="20"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Deferred annuity: wait before starting payments. Higher payout when started.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Guarantee Period (Years)</label>
            <input
              type="number"
              value={guaranteeYears}
              onChange={(e) => setGuaranteeYears(e.target.value)}
              className="input"
              min="0"
              max="20"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Payments continue to beneficiary if you die within this period. Reduces payout rate.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Joint Life Option</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={jointLife}
              onChange={(e) => setJointLife(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Joint Life (payments continue to spouse)</label>
          </div>
          {jointLife && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Spouse Age</label>
              <input
                type="number"
                value={spouseAge}
                onChange={(e) => setSpouseAge(e.target.value)}
                className="input"
                min="50"
                max="90"
              />
              <div className="text-xs text-yellow-600 mt-1">
                Joint life reduces payout ~15% but ensures spouse receives payments after your death
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Inflation Protection</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inflationProtection}
              onChange={(e) => setInflationProtection(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">Add inflation adjustment (COLA)</label>
          </div>
          {inflationProtection && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Annual Increase Rate (%)</label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="input"
                min="1"
                max="5"
              />
              <div className="text-xs text-blue-600 mt-1">
                Payments grow each year. Reduces initial payout ~25% but protects purchasing power.
              </div>
            </div>
          )}
        </div>
      </div>

      {!result.isFixed && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-4">Variable Annuity Parameters</h3>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Expected Payout Rate (%)</label>
            <input
              type="number"
              value={payoutRate}
              onChange={(e) => setPayoutRate(e.target.value)}
              className="input"
              min="2"
              max="10"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Variable annuity payments depend on market performance. This is an estimate.
            </div>
          </div>
        </div>
      )}

      <div className="card bg-purple-50 border border-purple-200">
        <h3 className="font-medium mb-2 text-purple-700">Payout Rate Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Base Rate:</span>
            <span className="font-medium ml-2">{result.basePayoutRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Effective Rate:</span>
            <span className="font-bold ml-2">{result.effectivePayoutRate}%</span>
          </div>
          <div>
            <span className="text-zinc-600">Adjustments:</span>
            <span className="font-medium ml-2">
              {result.jointLife ? 'Joint -15%' : ''}
              {result.deferralYears !== '0' ? ` +${parseFloat(result.deferralYears) * 5}%` : ''}
              {result.guaranteeYears !== '0' ? ` Guar -${parseFloat(result.guaranteeYears) * 2}%` : ''}
              {result.inflationProtection ? ' COLA -25%' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Annuity Payments</h3>
        <div className="text-2xl font-bold text-green-800">${result.periodicPayment}</div>
        <div className="text-sm text-green-600">{result.paymentFrequency} payment</div>
        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
          <div>
            <span className="text-zinc-600">Annual:</span>
            <span className="font-medium ml-2">${result.annualPayment}</span>
          </div>
          <div>
            <span className="text-zinc-600">Monthly:</span>
            <span className="font-medium ml-2">${result.monthlyPayment}</span>
          </div>
        </div>
      </div>

      {parseFloat(result.guaranteeYears) > 0 && (
        <div className="card bg-teal-50 border border-teal-200">
          <h3 className="font-medium mb-2 text-teal-700">Guarantee Period Protection</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Guarantee Period:</span>
              <span className="font-medium ml-2">{result.guaranteeYears} years</span>
            </div>
            <div>
              <span className="text-zinc-600">Guaranteed Total:</span>
              <span className="font-bold ml-2">${result.guaranteedTotal}</span>
            </div>
          </div>
          <div className="text-xs text-teal-600 mt-2">
            If you die within guarantee period, remaining payments go to beneficiary
          </div>
        </div>
      )}

      <div className="card bg-orange-50 border border-orange-200">
        <h3 className="font-medium mb-2 text-orange-700">Inflation Impact Over Time</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-zinc-600 block">Year 1</span>
            <span className="font-bold text-orange-800">${result.year1Payment}</span>
          </div>
          <div>
            <span className="text-zinc-600 block">Year 10</span>
            <span className="font-bold text-orange-800">${result.year10Payment}</span>
          </div>
          <div>
            <span className="text-zinc-600 block">Year 20</span>
            <span className="font-bold text-orange-800">${result.year20Payment}</span>
          </div>
        </div>
        <div className="text-xs text-orange-600 mt-2">
          {result.inflationProtection
            ? `With COLA: payments grow at ${result.inflationRate}% annually`
            : `Without protection: purchasing power declines at ${result.inflationRate}% inflation`}
        </div>
      </div>

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Projected Returns</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Life Expectancy:</span>
            <span className="font-medium ml-2">{result.lifeExpectancy} more years</span>
          </div>
          <div>
            <span className="text-zinc-600">Expected Total:</span>
            <span className="font-bold ml-2">${result.expectedTotalPayments}</span>
          </div>
          <div>
            <span className="text-zinc-600">Break-Even:</span>
            <span className="font-medium ml-2">{result.breakEvenYears} years</span>
          </div>
          <div>
            <span className="text-zinc-600">Est. IRR:</span>
            <span className="font-medium ml-2">{result.irrEstimate}%</span>
          </div>
        </div>
      </div>

      <div className="card bg-indigo-50 border border-indigo-200">
        <h3 className="font-medium mb-2 text-indigo-700">Comparison: Other Options</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">CD (4.5%):</span>
            <span className="font-medium ml-2">${result.cdAnnualPayment}/yr</span>
          </div>
          <div>
            <span className="text-zinc-600">Bond (5%):</span>
            <span className="font-medium ml-2">${result.bondAnnualPayment}/yr</span>
          </div>
        </div>
        <div className="text-xs text-indigo-600 mt-2">
          Annuity provides guaranteed lifetime income but no liquidity. CD/Bond preserves principal but income ends when principal withdrawn.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Annuity Types & Considerations</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Fixed Immediate:</strong> Guaranteed payments for life. No market risk. Rate locked at purchase. Best for guaranteed retirement income.</li>
          <li><strong>Variable:</strong> Payments linked to investment performance. Potential upside but risk of lower income. Fees typically 2-4% annually.</li>
          <li><strong>Indexed:</strong> Hybrid: some guaranteed income + upside linked to index (S&P 500). Caps on gains, floors on losses. Complex.</li>
          <li><strong>Joint Life:</strong> Payments continue to surviving spouse. Reduced rate (~15% lower) but protects both spouses.</li>
          <li><strong>Deferral:</strong> Delay payments for higher rate. Good if income not needed immediately. 5% rate increase per deferral year.</li>
          <li><strong>Guarantee Period:</strong> Payments continue to beneficiary if annuitant dies early. Reduces payout ~2% per guarantee year.</li>
          <li><strong>Inflation Protection:</strong> COLA rider increases payments annually. Reduces initial payout ~25%. Critical for long retirements.</li>
          <li><strong>Risks:</strong> Irrevocable once purchased. No liquidity. Company credit risk. Shop multiple insurers for best rates.</li>
        </ul>
      </div>
    </main>
  )
}