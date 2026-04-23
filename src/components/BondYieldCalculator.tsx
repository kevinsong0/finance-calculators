'use client'

import { useState } from 'react'

export default function BondYieldCalculator() {
  const [faceValue, setFaceValue] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [couponRate, setCouponRate] = useState('')
  const [yearsToMaturity, setYearsToMaturity] = useState('')
  const [bondType, setBondType] = useState('coupon')

  const calculate = () => {
    const face = parseFloat(faceValue) || 1000
    const price = parseFloat(purchasePrice) || 950
    const coupon = parseFloat(couponRate) || 5
    const years = parseInt(yearsToMaturity) || 10

    const annualCoupon = face * (coupon / 100)
    const totalCouponPayments = annualCoupon * years
    const currentYield = (annualCoupon / price) * 100
    const ytmApprox = ((annualCoupon + (face - price) / years) / ((face + price) / 2)) * 100
    const totalReturn = totalCouponPayments + (face - price)
    const totalReturnPercent = (totalReturn / price) * 100
    const zeroCouponYield = bondType === 'zero' ? (Math.pow(face / price, 1 / years) - 1) * 100 : 0
    const capitalGain = face - price
    const gainOrLoss = capitalGain > 0 ? 'gain' : 'loss'
    const priceStatus = price < face ? 'Discount' : price > face ? 'Premium' : 'Par'
    const effectiveYield = bondType === 'zero' ? zeroCouponYield : ytmApprox

    return {
      annualCoupon: annualCoupon.toFixed(2),
      totalCouponPayments: totalCouponPayments.toFixed(2),
      currentYield: currentYield.toFixed(2),
      ytmApprox: ytmApprox.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      totalReturnPercent: totalReturnPercent.toFixed(2),
      capitalGain: Math.abs(capitalGain).toFixed(2),
      gainOrLoss,
      priceStatus,
      zeroCouponYield: zeroCouponYield.toFixed(2),
      effectiveYield: effectiveYield.toFixed(2)
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Bond Yield Calculator</h1>
      <p className="text-zinc-600">Calculate current yield, yield to maturity, and total return for bonds.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Bond Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Bond Type</label>
            <select
              value={bondType}
              onChange={(e) => setBondType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="coupon">Coupon Bond</option>
              <option value="zero">Zero-Coupon Bond</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Face Value (Par Value)</label>
            <input
              type="number"
              value={faceValue}
              onChange={(e) => setFaceValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter face value (e.g., 1000)"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Purchase Price</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter purchase price"
            />
          </div>
          {bondType === 'coupon' && (
            <div>
              <label className="block text-sm text-zinc-600 mb-1">Coupon Rate (%)</label>
              <input
                type="number"
                value={couponRate}
                onChange={(e) => setCouponRate(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter annual coupon rate"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years to Maturity</label>
            <input
              type="number"
              value={yearsToMaturity}
              onChange={(e) => setYearsToMaturity(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter years until maturity"
            />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Yield Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Current Yield</div>
            <div className="text-2xl font-bold text-green-600">{result.currentYield}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Yield to Maturity</div>
            <div className="text-2xl font-bold text-blue-600">{result.ytmApprox}%</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Price Status</div>
            <div className="text-2xl font-bold">{result.priceStatus}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Effective Yield</div>
            <div className="text-2xl font-bold text-purple-600">{result.effectiveYield}%</div>
          </div>
        </div>
      </div>

      {bondType === 'coupon' && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Coupon Payments</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Annual Payment</div>
              <div className="font-bold">$${result.annualCoupon}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-zinc-500">Total Coupons</div>
              <div className="font-bold">$${result.totalCouponPayments}</div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Maturity Outcome</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Capital {result.gainOrLoss}</div>
            <div className={`font-bold ${result.gainOrLoss === 'gain' ? 'text-green-600' : 'text-red-600'}`}>$${result.capitalGain}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Return</div>
            <div className="font-bold text-blue-600">$${result.totalReturn} ({result.totalReturnPercent}%)</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Yield Definitions</h3>
        <div className="text-xs text-zinc-600 space-y-2">
          <div><strong>Current Yield:</strong> Annual coupon payment divided by current bond price.</div>
          <div><strong>YTM:</strong> Total return if bond held to maturity, including coupons and capital gain/loss.</div>
          <div><strong>Discount Bond:</strong> Price below face value, YTM exceeds coupon rate.</div>
          <div><strong>Premium Bond:</strong> Price above face value, coupon rate exceeds YTM.</div>
        </div>
      </div>
    </main>
  )
}