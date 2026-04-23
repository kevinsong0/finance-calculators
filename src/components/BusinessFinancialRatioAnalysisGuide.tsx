'use client'

export default function BusinessFinancialRatioAnalysisGuide() {
  const categories = [
    { category: 'Profitability ratios', examples: 'Margin, ROI, ROE', purpose: 'Earning ability' },
    { category: 'Liquidity ratios', examples: 'Current, quick ratios', purpose: 'Short-term health' },
    { category: 'Efficiency ratios', examples: 'Turnover ratios', purpose: 'Asset utilization' },
    { category: 'Solvency ratios', examples: 'Debt, leverage ratios', purpose: 'Long-term stability' },
  ];

  const ratios = [
    'Gross profit margin',
    'Net profit margin',
    'Return on assets',
    'Return on equity',
    'Current ratio',
    'Quick ratio',
    'Asset turnover',
    'Inventory turnover',
    'Debt-to-equity ratio',
    'Interest coverage ratio',
  ];

  const methods = [
    { method: 'Trend analysis', approach: 'Compare over time', benefit: 'Progress tracking' },
    { method: 'Industry benchmark', approach: 'Compare to peers', benefit: 'Market position' },
    { method: 'Target comparison', approach: 'Compare to goals', benefit: 'Goal achievement' },
    { method: 'DuPont analysis', approach: 'Decompose ROE', benefit: 'Component insight' },
  ];

  const interpretations = [
    'Ratio above benchmark',
    'Ratio below benchmark',
    'Ratio trending upward',
    'Ratio trending downward',
    'Ratio within target range',
    'Ratio outside target',
    'Ratio improvement needed',
    'Ratio maintaining stability',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Ratio Analysis Guide</h1>
      <p className="text-zinc-600">Categories, ratios, methods, and interpretations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Ratio Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>
              <div className="text-zinc-500 mt-1">Examples: {c.examples}</div>
              <div className="text-green-600 mt-1">Purpose: {c.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Ratios</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {ratios.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Approach: {m.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Ratio Interpretations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {interpretations.map((i, idx) => (
            <div key={i} className="bg-white rounded p-2">{idx + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Ratio Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate all relevant ratios. 2. Apply trend analysis. 3. Compare to industry benchmarks. 4. Evaluate against targets. 5. Use DuPont decomposition. 6. Interpret ratio signals. 7. Identify improvement areas. 8. Develop action plans. 9. Monitor ratio changes. 10. Report ratio findings. Financial ratio analysis = business insight. Ratios calculated. Trends applied. Benchmarks compared. Targets evaluated. DuPont used. Signals interpreted. Areas identified. Plans developed. Changes monitored. Findings reported.
        </div>
      </div>
    </main>
  );
}
