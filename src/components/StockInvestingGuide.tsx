'use client'

export default function StockInvestingGuide() {
  const basics = [
    { term: 'Stock', desc: 'Share of ownership in a company', action: 'Buy to own part of company' },
    { term: 'Dividend', desc: 'Regular payment from profits', action: 'Income from owning shares' },
    { term: 'Market Cap', desc: 'Total value of all shares', action: 'Measure company size' },
    { term: 'P/E Ratio', desc: 'Price / Earnings per share', action: 'Valuation metric' },
    { term: 'Portfolio', desc: 'Collection of investments', action: 'Diversify holdings' },
  ];

  const strategies = [
    { strategy: 'Value Investing', desc: 'Buy undervalued stocks', risk: 'Low', return: 'Long-term' },
    { strategy: 'Growth Investing', desc: 'High potential growth stocks', risk: 'Medium', return: 'High potential' },
    { strategy: 'Dividend Investing', desc: 'Focus on dividend-paying stocks', risk: 'Low', return: 'Regular income' },
    { strategy: 'Index Investing', desc: 'Buy market index funds', risk: 'Low', return: 'Market average' },
  ];

  const risks = [
    'Market volatility',
    'Company-specific risk',
    'Economic downturns',
    'Interest rate changes',
    'Political events',
  ];

  const tips = [
    'Start early',
    'Diversify holdings',
    'Invest regularly',
    'Keep long-term view',
    'Don&apos;t panic sell',
    'Research before buying',
    'Understand risk tolerance',
    'Avoid emotional decisions',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stock Investing Guide</h1>
      <p className="text-zinc-600">Basics, strategies, risks, and best practices for stock investing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stock Basics</h3>
        <div className="space-y-1 text-xs">
          {basics.map((b) => (
            <div key={b.term} className="bg-white rounded p-2">
              <strong>{b.term}</strong>
              <div className="text-zinc-500 mt-1">{b.desc}</div>
              <div className="text-green-600 mt-1">Action: {b.action}</div>
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
              <div className="text-green-600 mt-1">Risk: {s.risk}, Return: {s.return}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risks to Consider</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r) => (
            <div key={r} className="bg-white rounded p-2 text-red-600">⚠️ {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investing Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stock Investing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Determine investment goals. 2. Assess risk tolerance. 3. Set budget for investing. 4. Choose strategy (index/active). 5. Open brokerage account. 6. Research stocks/funds. 7. Start with index funds. 8. Diversify across sectors. 9. Invest regularly (dollar-cost average). 10. Monitor performance quarterly. 11. Rebalance annually. 12. Keep long-term perspective. Stocks = long-term wealth building. Patience wins.
        </div>
      </div>
    </main>
  );
}