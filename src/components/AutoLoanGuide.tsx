'use client'

export default function AutoLoanGuide() {
  const loanTypes = [
    { type: 'Bank/Credit Union', benefit: 'Lower rates typically', tip: 'Pre-approval recommended' },
    { type: 'Dealer Financing', benefit: 'Convenient, incentives', tip: 'Compare to outside rates' },
    { type: 'Online Lenders', benefit: 'Quick, easy process', tip: 'Check rates and terms' },
    { type: 'Manufacturer Financing', benefit: 'Special offers possible', tip: 'Good for new cars' },
  ];

  const rateFactors = [
    { factor: 'Credit Score', impact: 'Major rate determinant', range: '740+ best, 600+ minimum' },
    { factor: 'Loan Term', impact: 'Longer = higher rate', range: '36-72 months typical' },
    { factor: 'New vs Used', impact: 'New = lower rates', range: 'Used rates 1-3% higher' },
    { factor: 'Down Payment', impact: 'Higher = better terms', range: '10-20% recommended' },
    { factor: 'Debt-to-Income', impact: 'Affects approval', range: 'Under 36% ideal' },
  ];

  const tips = [
    'Get pre-approval first',
    'Compare multiple lenders',
    'Check credit before applying',
    'Consider shorter term',
    'Negotiate car price first',
    'Avoid long terms (72+ months)',
    'Watch for dealer markups',
    'Read all loan terms',
  ];

  const mistakes = [
    'Focusing only on monthly payment',
    'Long loan terms (72+ months)',
    'No down payment',
    'Not comparing rates',
    'Dealer financing only',
    'Rolling negative equity',
    'No credit check beforehand',
    'Ignoring total cost',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Auto Loan Guide</h1>
      <p className="text-zinc-600">Loan types, rate factors, tips, and avoiding mistakes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Loan Types</h3>
        <div className="space-y-1 text-xs">
          {loanTypes.map((l) => (
            <div key={l.type} className="bg-white rounded p-2">
              <strong>{l.type}</strong>
              <div className="text-green-600 mt-1">{l.benefit}</div>
              <div className="text-zinc-500 mt-1">{l.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rate Factors</h3>
        <div className="space-y-1 text-xs">
          {rateFactors.map((r) => (
            <div key={r.factor} className="bg-white rounded p-2">
              <strong>{r.factor}</strong>
              <div className="text-green-600 mt-1">{r.impact}</div>
              <div className="text-zinc-500 mt-1">{r.range}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Auto Loan Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Check credit score before shopping. 2. Get pre-approval from bank/credit union. 3. Set budget for total cost not just monthly. 4. Negotiate car price before discussing financing. 5. Compare dealer offer to pre-approval rate. 6. Consider down payment (10-20% ideal). 7. Choose reasonable term (48-60 months). 8. Review all loan terms and fees. 9. Avoid rolling negative equity from old loan. 10. Consider gap insurance for new cars. Auto loan = total cost matters. Monthly payment focus = longer term = more interest. Pre-approval, compare rates, reasonable term."
        </div>
      </div>
    </main>
  );
}