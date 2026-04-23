'use client'

export default function BusinessInvestmentPortfolioManagementGuide() {
  const objectives = [
    { objective: 'Capital preservation', priority: 'Safety first', approach: 'Low-risk assets' },
    { objective: 'Income generation', priority: 'Cash flow', approach: 'Dividend assets' },
    { objective: 'Growth appreciation', priority: 'Value increase', approach: 'Growth assets' },
    { objective: 'Balanced approach', priority: 'Mix objectives', approach: 'Diversified portfolio' },
  ];

  const strategies = [
    'Asset allocation planning',
    'Diversification strategy',
    'Risk management integration',
    'Performance monitoring',
    'Rebalancing procedures',
    'Tax optimization',
    'Cost management',
    'Liquidity planning',
    'Benchmark comparison',
    'Portfolio review',
  ];

  const components = [
    { component: 'Equity investments', allocation: 'Stocks, ETFs', risk: 'Medium to high' },
    { component: 'Fixed income', allocation: 'Bonds, CDs', risk: 'Low to medium' },
    { component: 'Alternative investments', allocation: 'Real estate, commodities', risk: 'Variable' },
    { component: 'Cash equivalents', allocation: 'Money market, savings', risk: 'Low' },
  ];

  const metrics = [
    'Portfolio return',
    'Risk-adjusted return',
    'Sharpe ratio',
    'Portfolio volatility',
    'Asset allocation ratio',
    'Diversification index',
    'Beta coefficient',
    'Correlation matrix',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Investment Portfolio Management Guide</h1>
      <p className="text-zinc-600">Objectives, strategies, components, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Portfolio Objectives</h3>
        <div className="space-y-1 text-xs">
          {objectives.map((o) => (
            <div key={o.objective} className="bg-white rounded p-2">
              <strong>{o.objective}</strong>
              <div className="text-zinc-500 mt-1">Priority: {o.priority}</div>
              <div className="text-green-600 mt-1">Approach: {o.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Portfolio Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Allocation: {c.allocation}</div>
              <div className="text-green-600 mt-1">Risk: {c.risk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Portfolio Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Plan asset allocation strategically. 2. Implement diversification properly. 3. Manage risk systematically. 4. Monitor performance continuously. 5. Rebalance portfolio periodically. 6. Optimize tax efficiency. 7. Manage costs carefully. 8. Plan liquidity needs. 9. Compare to benchmarks regularly. 10. Review portfolio annually. Portfolio management = investment success. Allocation planned. Diversification implemented. Risk managed. Performance monitored. Portfolio rebalanced. Tax optimized. Costs managed. Liquidity planned. Benchmarks compared. Portfolio reviewed.
        </div>
      </div>
    </main>
  );
}
