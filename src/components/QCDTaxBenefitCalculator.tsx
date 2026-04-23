'use client'

import { useState } from 'react'

export default function QCDTaxBenefitCalculator() {
  const [age, setAge] = useState(72)
  const [iraBalance, setIraBalance] = useState(100000)
  const [donationAmount, setDonationAmount] = useState(5000)
  const [rmdAmount, setRmdAmount] = useState(4000)
  const [marginalRate, setMarginalRate] = useState(22)
  const [charitableDeductionLimit, setCharitableDeductionLimit] = useState(0)

  const calculate = () => {
    const isEligible = age >= 70.5
    const maxQCD = Math.min(100000, iraBalance, donationAmount)
    const actualQCD = isEligible ? Math.min(donationAmount, maxQCD) : 0

    const qcdReducesRMD = Math.min(actualQCD, rmdAmount)
    const remainingRMD = rmdAmount - qcdReducesRMD
    const rmdTaxWithoutQCD = rmdAmount * (marginalRate / 100)
    const rmdTaxWithQCD = remainingRMD * (marginalRate / 100)
    const rmdTaxSavings = rmdTaxWithoutQCD - rmdTaxWithQCD

    const deductionBenefit = charitableDeductionLimit > 0 ? donationAmount * (marginalRate / 100) : 0
    const qcdBenefit = actualQCD * (marginalRate / 100)
    const totalQCDBenefit = rmdTaxSavings + qcdBenefit

    const benefitDifference = totalQCDBenefit - deductionBenefit
    const agiWithoutQCD = rmdAmount
    const agiWithQCD = remainingRMD
    const agiReduction = agiWithoutQCD - agiWithQCD

    const irmaaThreshold = 103000
    const irmaaAvoidedWithQCD = agiWithoutQCD > irmaaThreshold && agiWithQCD <= irmaaThreshold
    const irmaaMonthlySaving = irmaaAvoidedWithQCD ? 69.90 : 0
    const irmaaAnnualSaving = irmaaMonthlySaving * 12

    return {
      age: age.toFixed(0),
      iraBalance: iraBalance.toFixed(2),
      donationAmount: donationAmount.toFixed(2),
      rmdAmount: rmdAmount.toFixed(2),
      marginalRate: marginalRate.toFixed(0),
      isEligible,
      maxQCD: maxQCD.toFixed(2),
      actualQCD: actualQCD.toFixed(2),
      qcdReducesRMD: qcdReducesRMD.toFixed(2),
      remainingRMD: remainingRMD.toFixed(2),
      rmdTaxWithoutQCD: rmdTaxWithoutQCD.toFixed(2),
      rmdTaxWithQCD: rmdTaxWithQCD.toFixed(2),
      rmdTaxSavings: rmdTaxSavings.toFixed(2),
      deductionBenefit: deductionBenefit.toFixed(2),
      qcdBenefit: qcdBenefit.toFixed(2),
      totalQCDBenefit: totalQCDBenefit.toFixed(2),
      benefitDifference: benefitDifference.toFixed(2),
      agiWithoutQCD: agiWithoutQCD.toFixed(2),
      agiWithQCD: agiWithQCD.toFixed(2),
      agiReduction: agiReduction.toFixed(2),
      irmaaAvoidedWithQCD,
      irmaaAnnualSaving: irmaaAnnualSaving.toFixed(2),
    }
  }

  const result = calculate()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">QCD Tax Benefit Calculator</h1>
      <p className="text-gray-600 mb-4">Calculate tax benefits of Qualified Charitable Distributions from IRA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">IRA Balance ($)</label>
          <input
            type="number"
            value={iraBalance}
            onChange={(e) => setIraBalance(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Donation Amount ($)</label>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">RMD Amount ($)</label>
          <input
            type="number"
            value={rmdAmount}
            onChange={(e) => setRmdAmount(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marginal Tax Rate (%)</label>
          <input
            type="number"
            value={marginalRate}
            onChange={(e) => setMarginalRate(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Charitable Deduction Limit ($)</label>
          <input
            type="number"
            value={charitableDeductionLimit}
            onChange={(e) => setCharitableDeductionLimit(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
          <p className="text-xs text-zinc-500">Amount you can deduct if itemizing</p>
        </div>
      </div>

      {!result.isEligible && (
        <div className="card bg-red-50 border border-red-200 mb-6">
          <p className="text-red-700">QCD requires age 70.5 or older. You are not eligible.</p>
        </div>
      )}

      {result.isEligible && (
        <>
          <div className="card bg-blue-50 border border-blue-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">QCD Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-zinc-600">QCD Amount:</span>
                <span className="font-medium ml-2">$ {result.actualQCD}</span>
              </div>
              <div>
                <span className="text-zinc-600">Max QCD Limit:</span>
                <span className="font-medium ml-2">$ 100,000</span>
              </div>
              <div>
                <span className="text-zinc-600">QCD Reduces RMD:</span>
                <span className="font-medium ml-2">$ {result.qcdReducesRMD}</span>
              </div>
              <div>
                <span className="text-zinc-600">Remaining RMD:</span>
                <span className="font-medium ml-2">$ {result.remainingRMD}</span>
              </div>
            </div>
          </div>

          <div className="card bg-green-50 border border-green-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">Tax Benefits</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-zinc-600">RMD Tax Without QCD:</span>
                <span className="font-medium ml-2">$ {result.rmdTaxWithoutQCD}</span>
              </div>
              <div>
                <span className="text-zinc-600">RMD Tax With QCD:</span>
                <span className="font-medium ml-2">$ {result.rmdTaxWithQCD}</span>
              </div>
              <div>
                <span className="text-zinc-600">RMD Tax Savings:</span>
                <span className="font-bold text-green-600 ml-2">$ {result.rmdTaxSavings}</span>
              </div>
              <div>
                <span className="text-zinc-600">QCD AGI Reduction:</span>
                <span className="font-bold text-green-600 ml-2">$ {result.agiReduction}</span>
              </div>
            </div>
          </div>

          <div className="card bg-orange-50 border border-orange-200 mb-6">
            <h2 className="text-lg font-semibold mb-3">QCD vs Charitable Deduction</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-600">QCD Tax Benefit:</span>
                <span className="font-bold text-orange-700 ml-2">$ {result.totalQCDBenefit}</span>
              </div>
              <div>
                <span className="text-zinc-600">Deduction Benefit:</span>
                <span className="font-medium ml-2">$ {result.deductionBenefit}</span>
              </div>
              <div>
                <span className="text-zinc-600">QCD Advantage:</span>
                <span className="font-bold text-green-600 ml-2">$ {result.benefitDifference}</span>
              </div>
            </div>
            <div className="text-xs text-zinc-600 mt-3">
              QCD reduces AGI directly (more valuable than deduction). Lower AGI helps avoid IRMAA, reduce Social Security taxation, and may qualify for other tax benefits.
            </div>
          </div>

          {result.irmaaAvoidedWithQCD && (
            <div className="card bg-purple-50 border border-purple-200 mb-6">
              <h2 className="text-lg font-semibold mb-3">IRMAA Avoided!</h2>
              <div className="text-sm text-purple-700">
                QCD reduces AGI below IRMAA threshold. You save $ {result.irmaaAnnualSaving} annually on Medicare premiums.
              </div>
            </div>
          )}
        </>
      )}

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">QCD Requirements</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Age 70.5 or older at time of distribution</li>
          <li>Distribution must go directly to qualified charity</li>
          <li>Maximum $100,000 per year per IRA owner</li>
          <li>Only from IRA (not 401(k), pension, etc.)</li>
          <li>Charity must be 501(c)(3) eligible organization</li>
          <li>Cannot claim charitable deduction for QCD amount</li>
        </ul>
      </div>

      <div className="card bg-green-50 border border-green-200 mt-4">
        <h3 className="font-medium mb-2 text-green-700">QCD Benefits Beyond Tax</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li>Reduces AGI (helps avoid IRMAA Medicare surcharge)</li>
          <li>Reduces AGI (may reduce Social Security taxation)</li>
          <li>Satisfies RMD without increasing taxable income</li>
          <li>Works even if taking standard deduction</li>
          <li>May help qualify for other AGI-based tax benefits</li>
          <li>Simple: direct transfer, no itemizing required</li>
        </ul>
      </div>
    </div>
  )
}