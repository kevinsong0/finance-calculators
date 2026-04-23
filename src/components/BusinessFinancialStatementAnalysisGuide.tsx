'use client'

export default function BusinessFinancialStatementAnalysisGuide() {
  const statements = [
    { statement: 'Balance sheet', focus: 'Assets, liabilities, equity', purpose: 'Financial position' },
    { statement: 'Income statement', focus: 'Revenue, expenses, profit', purpose: 'Profitability' },
    { statement: 'Cash flow statement', focus: 'Cash movements', purpose: 'Liquidity' },
    { statement: 'Equity statement', focus: 'Owner changes', purpose: 'Ownership tracking' },
  ];

  const techniques = [
    'Horizontal analysis',
    'Vertical analysis',
    'Ratio analysis',
    'Common-size analysis',
    'Trend analysis',
    'Comparative analysis',
    'Segment analysis',
    'DuPont analysis',
    'Quality of earnings',
    'Red flag detection',
  ];

  const ratios = [
    { ratio: 'Profitability ratios', examples: 'Margin, ROI, ROE', insight: 'Earning ability' },
    { ratio: 'Liquidity ratios', examples: 'Current, quick ratios', insight: 'Short-term health' },
    { ratio: 'Efficiency ratios', examples: 'Turnover ratios', insight: 'Asset utilization' },
    { ratio: 'Solvency ratios', examples: 'Debt ratios', insight: 'Long-term stability' },
  ];

  const considerations = [
    'Accounting policies',
    'Revenue recognition',
    'Expense timing',
    'Asset valuation',
    'Disclosure completeness',
    'Management integrity',
    'Industry context',
    'Economic conditions',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Statement Analysis Guide</h1>
      <p className="text-zinc-600">Statements, techniques, ratios, and considerations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Statements</h3>
        <div className="space-y-1 text-xs">
          {statements.map((s) => (
            <div key={s.statement} className="bg-white rounded p-2">
              <strong>{s.statement}</strong>
              <div className="text-zinc-500 mt-1">Focus: {s.focus}</div>
              <div className="text-green-600 mt-1">Purpose: {s.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Techniques</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {techniques.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Ratio Categories</h3>
        <div className="space-y-1 text-xs">
          {ratios.map((r) => (
            <div key={r.ratio} className="bg-white rounded p-2">
              <strong>{r.ratio}</strong>
              <div className="text-zinc-500 mt-1">Examples: {r.examples}</div>
              <div className="text-green-600 mt-1">Insight: {r.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Statement Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Review all financial statements. 2. Apply horizontal analysis. 3. Apply vertical analysis. 4. Calculate key ratios. 5. Compare to benchmarks. 6. Identify trends. 7. Assess accounting policies. 8. Evaluate disclosure quality. 9. Consider industry context. 10. Form analytical conclusions. Financial statement analysis = business transparency. Statements reviewed. Horizontal applied. Vertical applied. Ratios calculated. Benchmarks compared. Trends identified. Policies assessed. Disclosure evaluated. Context considered. Conclusions formed.
        </div>
      </div>
    </main>
  );
}