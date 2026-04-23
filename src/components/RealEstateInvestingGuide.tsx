'use client'

export default function RealEstateInvestingGuide() {
  const types = [
    { type: 'Residential', desc: 'Single-family, condos, apartments', pros: 'Stable demand, familiar market' },
    { type: 'Commercial', desc: 'Office, retail, industrial', pros: 'Higher returns, longer leases' },
    { type: 'REITs', desc: 'Real estate investment trusts', pros: 'Liquid, diversified, passive' },
    { type: 'Raw Land', desc: 'Undeveloped land', pros: 'Low maintenance, appreciation' },
  ];

  const strategies = [
    { strategy: 'Buy & Hold', desc: 'Long-term rental income', pros: 'Cash flow, appreciation' },
    { strategy: 'Fix & Flip', desc: 'Buy, renovate, sell quickly', pros: 'Quick profits, active work' },
    { strategy: 'BRRRR', desc: 'Buy, rehab, rent, refinance, repeat', pros: 'Scale with less cash' },
    { strategy: 'House Hacking', desc: 'Live in, rent out rooms/units', pros: 'Reduce living costs' },
  ];

  const considerations = [
    'Location matters most',
    'Cash flow vs appreciation',
    'Property management',
    'Maintenance costs',
    'Market cycles',
    'Liquidity limitations',
    'Capital requirements',
    'Tax implications',
  ];

  const risks = [
    'Market downturns',
    'Vacancy periods',
    'Unexpected repairs',
    'Tenant issues',
    'Interest rate changes',
    'Regulatory changes',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Real Estate Investing Guide</h1>
      <p className="text-zinc-600">Types, strategies, considerations, and risks for real estate investing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Property Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Pros: {t.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r) => (
            <div key={r} className="bg-white rounded p-2 text-red-600">⚠️ {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Real Estate Investing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define investment goals. 2. Determine budget/capital. 3. Choose strategy (buy-hold/flip/REIT). 4. Research target market. 5. Analyze properties carefully. 6. Calculate all costs (purchase, rehab, ongoing). 7. Check cash flow potential. 8. Get professional inspection. 9. Secure financing. 10. Plan property management. 11. Understand tax implications. 12. Have exit strategy. Real estate = tangible asset, long-term wealth. Location + timing + management = success.
        </div>
      </div>
    </main>
  );
}