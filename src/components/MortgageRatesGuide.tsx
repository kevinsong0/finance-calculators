'use client'

export default function MortgageRatesGuide() {
  const rateFactors = [
    { factor: 'Credit Score', impact: 'Higher = lower rate', range: '620-740+ affects 0.5-1%' },
    { factor: 'Down Payment', impact: 'Higher = lower rate', range: '20% vs 5% saves rate + PMI' },
    { factor: 'Loan Term', impact: 'Shorter = lower rate', range: '15yr vs 30yr = 0.25-0.5%' },
    { factor: 'Loan Type', impact: 'Type affects rate', range: 'Conventional typically lower' },
    { factor: 'Property Type', impact: 'Primary vs investment', range: 'Investment rates higher' },
    { factor: 'Market Rates', impact: 'Economy affects rates', range: 'Daily fluctuation' },
  ];

  const loanTypes = [
    { type: 'Conventional', minDown: '3-5%', best: 'Good credit, stable income' },
    { type: 'FHA', minDown: '3.5%', best: 'Lower credit, first-time' },
    { type: 'VA', minDown: '0%', best: 'Military/veterans' },
    { type: 'USDA', minDown: '0%', best: 'Rural areas, income limits' },
    { type: 'Jumbo', minDown: '10-20%', best: 'High-cost homes' },
  ];

  const rateTips = [
    'Compare multiple lenders',
    'Check credit before applying',
    'Higher down payment saves',
    'Consider shorter term',
    'Lock rate when good',
    'Watch market trends',
    'Get quotes same day',
    'Negotiate rate/points',
  ];

  const comparison = [
    'Get 3+ lender quotes',
    'Compare APR not just rate',
    'Check closing costs',
    'Ask about points',
    'Review loan estimate',
    'Consider rate lock timing',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Mortgage Rates Guide</h1>
      <p className="text-zinc-600">Rate factors, loan types, comparison tips, and strategies.</p>

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
        <h3 className="font-medium mb-2">Loan Types</h3>
        <div className="space-y-1 text-xs">
          {loanTypes.map((l) => (
            <div key={l.type} className="bg-white rounded p-2">
              <strong>{l.type}</strong>
              <div className="text-red-600 mt-1">Min Down: {l.minDown}</div>
              <div className="text-zinc-500 mt-1">Best for: {l.best}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rate Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {rateTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Comparison Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {comparison.map((c, i) => (
            <div key={c} className="bg-white rounded p-2">{i + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rate Strategies</h3>
        <div className="text-xs text-zinc-600">
          Improve score first: 20+ points can save 0.1-0.2% rate. Down payment effect: 20% down avoids PMI + lower rate vs 5% down. Points consideration: Pay points to lower rate if staying long-term, typically 1 point = 0.25% rate reduction, $2,000 per point on $200K loan. Rate lock: Lock when rate good, 30-60 day locks common, longer locks cost more. Market timing: Rates change daily, watch trends, don&apos;t wait forever. Rate matters over decades: 0.5% lower = $30,000+ saved on $300K 30yr loan. Compare lenders, improve profile, choose wisely."
        </div>
      </div>
    </main>
  );
}