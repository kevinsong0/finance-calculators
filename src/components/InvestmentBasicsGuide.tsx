'use client'

export default function InvestmentBasicsGuide() {
  const concepts = [
    { concept: 'Risk vs Return', desc: 'Higher risk = higher potential return', note: 'Match risk to your tolerance' },
    { concept: 'Diversification', desc: 'Spread across investments', note: 'Reduce single investment risk' },
    { concept: 'Time Horizon', desc: 'How long before you need money', note: 'Longer = more risk tolerance' },
    { concept: 'Compound Growth', desc: 'Earnings on earnings', note: 'Time multiplies effect' },
    { concept: 'Asset Allocation', desc: 'Mix of stocks, bonds, cash', note: 'Based on goals and risk' },
    { concept: 'Market Volatility', desc: 'Price fluctuations', note: 'Normal, don&apos;t panic' },
  ];

  const investmentTypes = [
    { type: 'Stocks', risk: 'High', return: 'High potential', desc: 'Ownership in companies' },
    { type: 'Bonds', risk: 'Low-Medium', return: 'Fixed income', desc: 'Loans to governments/companies' },
    { type: 'Index Funds', risk: 'Medium', return: 'Market average', desc: 'Basket of stocks, diversified' },
    { type: 'ETFs', risk: 'Medium', return: 'Market segment', desc: 'Tradeable index funds' },
    { type: 'REITs', risk: 'Medium', return: 'Real estate income', desc: 'Real estate investment trusts' },
    { type: 'Cash/Savings', risk: 'None', return: 'Low', desc: 'Safe, emergency fund' },
  ];

  const beginnerSteps = [
    'Define goals and timeline',
    'Assess risk tolerance',
    'Choose account type',
    'Start with index funds',
    'Invest regularly',
    'Don&apos;t panic on dips',
    'Rebalance annually',
    'Keep learning',
  ];

  const mistakes = [
    'Trying to time market',
    'Chasing hot stocks',
    'Overreacting to news',
    'Not diversifying',
    'Too conservative long-term',
    'Checking too frequently',
    'High-fee funds',
    'No emergency fund first',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Investment Basics Guide</h1>
      <p className="text-zinc-600">Core concepts, investment types, and beginner steps.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Core Concepts</h3>
        <div className="space-y-1 text-xs">
          {concepts.map((c) => (
            <div key={c.concept} className="bg-white rounded p-2">
              <strong>{c.concept}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">{c.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Types</h3>
        <div className="space-y-1 text-xs">
          {investmentTypes.map((i) => (
            <div key={i.type} className="bg-white rounded p-2">
              <strong>{i.type}</strong>
              <div className="text-red-600 mt-1">Risk: {i.risk}</div>
              <div className="text-green-600 mt-1">Return: {i.return}</div>
              <div className="text-zinc-500 mt-1">{i.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Beginner Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {beginnerSteps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
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
        <h3 className="font-medium mb-2">Investment Basics Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Have emergency fund first (3-6 months). 2. Define investment goals and timeline. 3. Understand your risk tolerance. 4. Choose appropriate account (IRA, 401k, brokerage). 5. Start with broad index funds. 6. Set up automatic investments. 7. Diversify across asset classes. 8. Don&apos;t try to time market. 9. Rebalance annually. 10. Keep costs low (low-fee funds). 11. Stay invested through volatility. 12. Increase contributions with raises. Investment = wealth building over time. Start early, stay consistent, don&apos;t overreact. Index funds for beginners, diversify, patience."
        </div>
      </div>
    </main>
  );
}