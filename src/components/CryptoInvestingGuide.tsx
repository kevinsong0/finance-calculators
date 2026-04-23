'use client'

export default function CryptoInvestingGuide() {
  const basics = [
    { term: 'Bitcoin', desc: 'First cryptocurrency, store of value', use: 'Digital gold, hedge' },
    { term: 'Ethereum', desc: 'Smart contract platform', use: 'DeFi, NFTs, apps' },
    { term: 'Altcoins', desc: 'Alternative cryptocurrencies', use: 'Various purposes' },
    { term: 'Stablecoins', desc: 'Pegged to fiat (USDT, USDC)', use: 'Stability, trading' },
    { term: 'DeFi', desc: 'Decentralized finance protocols', use: 'Yield, lending' },
  ];

  const risks = [
    'High volatility',
    'Regulatory uncertainty',
    'Security risks (hacks)',
    'Scams/fraud',
    'No guaranteed returns',
    'Technical complexity',
    'Liquidity issues',
    'Market manipulation',
  ];

  const strategies = [
    { strategy: 'HODL', desc: 'Buy and hold long-term', risk: 'Medium', time: 'Years' },
    { strategy: 'DCA', desc: 'Regular small investments', risk: 'Low', time: 'Ongoing' },
    { strategy: 'Trading', desc: 'Active buying/selling', risk: 'High', time: 'Daily' },
    { strategy: 'Staking', desc: 'Earn yield by holding', risk: 'Medium', time: 'Passive' },
  ];

  const tips = [
    'Start small',
    'Research thoroughly',
    'Use reputable exchanges',
    'Secure your keys',
    'Diversify holdings',
    'Don&apos;t invest more than you can lose',
    'Understand tax implications',
    'Keep records',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Crypto Investing Guide</h1>
      <p className="text-zinc-600">Cryptocurrency basics, risks, strategies, and safety tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crypto Basics</h3>
        <div className="space-y-1 text-xs">
          {basics.map((b) => (
            <div key={b.term} className="bg-white rounded p-2">
              <strong>{b.term}</strong>
              <div className="text-zinc-500 mt-1">{b.desc}</div>
              <div className="text-green-600 mt-1">Use: {b.use}</div>
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
              <div className="text-green-600 mt-1">Risk: {s.risk}, Time: {s.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r) => (
            <div key={r} className="bg-white rounded p-2 text-red-600">⚠️ {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crypto Investing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Research cryptocurrencies. 2. Understand blockchain basics. 3. Choose reputable exchange. 4. Set up secure storage (wallet). 5. Determine allocation (small % of portfolio). 6. Choose strategy (HODL/DCA). 7. Start with major coins. 8. Track investments. 9. Understand tax rules. 10. Be prepared for volatility. Crypto = high risk, high potential. Only invest what you can lose. Research first, invest second.
        </div>
      </div>
    </main>
  );
}