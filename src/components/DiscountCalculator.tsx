'use client'

import { useState, useMemo } from 'react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(8);

  const result = useMemo(() => {
    const firstDiscount = originalPrice * (discountPercent / 100);
    const priceAfterFirst = originalPrice - firstDiscount;
    const secondDiscount = priceAfterFirst * (additionalDiscount / 100);
    const priceAfterSecond = priceAfterFirst - secondDiscount;
    const totalDiscount = firstDiscount + secondDiscount;
    const totalDiscountPercent = (totalDiscount / originalPrice) * 100;
    const tax = priceAfterSecond * (taxRate / 100);
    const finalPrice = priceAfterSecond + tax;

    return {
      firstDiscount,
      priceAfterFirst,
      secondDiscount,
      totalDiscount,
      totalDiscountPercent,
      priceAfterSecond,
      tax,
      finalPrice,
    };
  }, [originalPrice, discountPercent, additionalDiscount, taxRate]);

  const formatMoney = (n: number) => `$${n.toFixed(2)}`;

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Discount Calculator</h1>
      <p className="text-zinc-600">Calculate sale prices, stacked discounts, and final costs with tax. Perfect for shopping decisions.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Original Price ($)</label>
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[25, 50, 100, 200, 500].map((v) => (
                <button key={v} onClick={() => setOriginalPrice(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">${v}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">First Discount (%)</label>
            <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-full" />
            <div className="flex gap-2 mt-2">
              {[10, 15, 20, 25, 30, 50].map((v) => (
                <button key={v} onClick={() => setDiscountPercent(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}%</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Additional Discount (%)</label>
            <input type="number" value={additionalDiscount} onChange={(e) => setAdditionalDiscount(Number(e.target.value))} className="w-full" />
            <div className="text-xs text-zinc-500 mt-1">Stacked discount (optional)</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Sales Tax (%)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full" step="0.5" />
            <div className="flex gap-2 mt-2">
              {[0, 5, 8, 10].map((v) => (
                <button key={v} onClick={() => setTaxRate(v)} className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">{v}%</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-xs text-zinc-500 mb-1">Total Discount</div>
            <div className="text-xl font-bold text-red-600">{formatMoney(result.totalDiscount)}</div>
            <div className="text-xs text-zinc-500">{result.totalDiscountPercent.toFixed(1)}% off</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-xs text-zinc-500 mb-1">Sale Price</div>
            <div className="text-xl font-bold text-green-600">{formatMoney(result.priceAfterSecond)}</div>
            <div className="text-xs text-zinc-500">before tax</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-xs text-zinc-500 mb-1">Tax Amount</div>
            <div className="text-xl font-bold text-blue-600">{formatMoney(result.tax)}</div>
            <div className="text-xs text-zinc-500">{taxRate}%</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-xs text-zinc-500 mb-1">Final Price</div>
            <div className="text-xl font-bold text-purple-600">{formatMoney(result.finalPrice)}</div>
            <div className="text-xs text-zinc-500">you pay</div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="card">
        <h3 className="font-medium mb-3">Price Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-zinc-50 rounded">
            <span>Original Price</span>
            <span className="font-bold">{formatMoney(originalPrice)}</span>
          </div>
          <div className="flex justify-between p-2 bg-red-50 rounded">
            <span>First Discount ({discountPercent}%)</span>
            <span className="font-bold text-red-600">-{formatMoney(result.firstDiscount)}</span>
          </div>
          {additionalDiscount > 0 && (
            <div className="flex justify-between p-2 bg-orange-50 rounded">
              <span>Additional Discount ({additionalDiscount}%)</span>
              <span className="font-bold text-orange-600">-{formatMoney(result.secondDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between p-2 bg-green-50 rounded border-t-2">
            <span>Sale Price</span>
            <span className="font-bold text-green-600">{formatMoney(result.priceAfterSecond)}</span>
          </div>
          {taxRate > 0 && (
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Sales Tax ({taxRate}%)</span>
              <span className="font-bold text-blue-600">+{formatMoney(result.tax)}</span>
            </div>
          )}
          <div className="flex justify-between p-2 bg-purple-50 rounded border-t-2">
            <span className="font-medium">Final Price</span>
            <span className="font-bold text-purple-600">{formatMoney(result.finalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Discount Reference</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {[5, 10, 15, 20, 25, 30, 40, 50, 60, 70].map((pct) => (
            <div key={pct} className="bg-white rounded p-2 text-center">
              <div className="font-medium">{pct}% off</div>
              <div className="text-zinc-600">{formatMoney(originalPrice * (1 - pct/100))}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Discount Shopping Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Stack discounts:</span> Apply percentage codes sequentially for bigger savings
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Compare prices:</span> Check if sale price beats competitors' regular price
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Tax matters:</span> Include tax when comparing final prices across states
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Real savings:</span> 30% off $50 = 50% off $30 (different perception)
          </div>
        </div>
      </div>
    </main>
  );
}