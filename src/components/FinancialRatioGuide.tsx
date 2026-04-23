'use client'

export default function FinancialRatioGuide() {
  const liquidityRatios = [
    { ratio: 'Current Ratio', formula: 'Current Assets / Current Liabilities', good: '> 1.5' },
    { ratio: 'Quick Ratio', formula: '(Cash + AR) / Current Liabilities', good: '> 1.0' },
    { ratio: 'Cash Ratio', formula: 'Cash / Current Liabilities', good: '> 0.5' },
  ];

  const profitabilityRatios = [
    { ratio: 'Gross Margin', formula: '(Revenue - COGS) / Revenue', good: 'Industry specific' },
    { ratio: 'Net Margin', formula: 'Net Income / Revenue', good: '> 5-10%' },
    { ratio: 'Return on Assets', formula: 'Net Income / Total Assets', good: '> 5%' },
    { ratio: 'Return on Equity', formula: 'Net Income / Equity', good: '> 10%' },
  ];

  const efficiencyRatios = [
    { ratio: 'Inventory Turnover', formula: 'COGS / Average Inventory', good: 'High' },
    { ratio: 'AR Turnover', formula: 'Revenue / Average AR', good: 'High' },
    { ratio: 'AP Turnover', formula: 'Purchases / Average AP', good: 'Balanced' },
    { ratio: 'Asset Turnover', formula: 'Revenue / Total Assets', good: 'High' },
  ];

  const leverageRatios = [
    { ratio: 'Debt Ratio', formula: 'Total Debt / Total Assets', good: '< 0.5' },
    { ratio: 'Debt to Equity', formula: 'Total Debt / Equity', good: '< 1.0' },
    { ratio: 'Interest Coverage', formula: 'EBIT / Interest Expense', good: '> 3' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Financial Ratio Guide</h1>
      <p className="text-zinc-600">Liquidity, profitability, efficiency, and leverage ratios.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Liquidity Ratios</h3>
        <div className="space-y-1 text-xs">
          {liquidityRatios.map((r) => (
            <div key={r.ratio} className="bg-white rounded p-2">
              <strong>{r.ratio}</strong>
              <div className="text-zinc-500 mt-1">{r.formula}</div>
              <div className="text-green-600 mt-1">Good: {r.good}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Profitability Ratios</h3>
        <div className="space-y-1 text-xs">
          {profitabilityRatios.map((r) => (
            <div key={r.ratio} className="bg-white rounded p-2">
              <strong>{r.ratio}</strong>
              <div className="text-zinc-500 mt-1">{r.formula}</div>
              <div className="text-green-600 mt-1">Good: {r.good}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Efficiency Ratios</h3>
        <div className="space-y-1 text-xs">
          {efficiencyRatios.map((r) => (
            <div key={r.ratio} className="bg-white rounded p-2">
              <strong>{r.ratio}</strong>
              <div className="text-zinc-500 mt-1">{r.formula}</div>
              <div className="text-green-600 mt-1">Good: {r.good}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leverage Ratios</h3>
        <div className="space-y-1 text-xs">
          {leverageRatios.map((r) => (
            <div key={r.ratio} className="bg-white rounded p-2">
              <strong>{r.ratio}</strong>
              <div className="text-zinc-500 mt-1">{r.formula}</div>
              <div className="text-green-600 mt-1">Good: {r.good}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Ratio Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate key ratios quarterly. 2. Compare to industry benchmarks. 3. Track trends over time. 4. Identify improving/declining ratios. 5. Investigate unusual changes. 6. Use ratios for decisions. 7. Balance multiple ratios (not just one). 8. Consider business context. 9. Report to stakeholders. 10. Set improvement targets. Financial ratios = health indicators. Liquidity = ability to pay now. Profitability = earning power. Efficiency = asset utilization. Leverage = debt risk. Track trends, not just snapshots."
        </div>
      </div>
    </main>
  );
}