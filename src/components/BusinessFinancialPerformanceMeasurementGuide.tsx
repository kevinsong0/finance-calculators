'use client'

export default function BusinessFinancialPerformanceMeasurementGuide() {
  const dimensions = [
    { dimension: 'Profitability', metrics: 'Margin, return ratios', importance: 'Primary' },
    { dimension: 'Efficiency', metrics: 'Turnover, utilization', importance: 'High' },
    { dimension: 'Liquidity', metrics: 'Cash, working capital', importance: 'High' },
    { dimension: 'Solvency', metrics: 'Debt, leverage ratios', importance: 'Medium' },
  ];

  const metrics = [
    'Revenue growth rate',
    'Gross profit margin',
    'Operating profit margin',
    'Net profit margin',
    'Return on assets',
    'Return on equity',
    'Asset turnover',
    'Inventory turnover',
    'Current ratio',
    'Debt-to-equity ratio',
  ];

  const methods = [
    { method: 'Ratio analysis', description: 'Compare metrics to benchmarks', purpose: 'Relative performance' },
    { method: 'Trend analysis', description: 'Track performance over time', purpose: 'Progress tracking' },
    { method: 'Peer comparison', description: 'Compare to competitors', purpose: 'Market position' },
    { method: 'Target analysis', description: 'Measure against goals', purpose: 'Goal achievement' },
  ];

  const actions = [
    'Set performance targets',
    'Collect financial data',
    'Calculate performance metrics',
    'Analyze performance results',
    'Identify performance gaps',
    'Develop improvement plans',
    'Implement performance changes',
    'Monitor performance trends',
    'Report performance outcomes',
    'Optimize measurement process',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Performance Measurement Guide</h1>
      <p className="text-zinc-600">Dimensions, metrics, methods, and actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Measurement Dimensions</h3>
        <div className="space-y-1 text-xs">
          {dimensions.map((d) => (
            <div key={d.dimension} className="bg-white rounded p-2">
              <strong>{d.dimension}</strong>
              <div className="text-zinc-500 mt-1">Metrics: {d.metrics}</div>
              <div className="text-green-600 mt-1">Importance: {d.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Description: {m.description}</div>
              <div className="text-green-600 mt-1">Purpose: {m.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Measurement Actions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {actions.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Measurement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set performance targets clearly. 2. Collect financial data accurately. 3. Calculate performance metrics precisely. 4. Analyze performance results thoroughly. 5. Identify performance gaps systematically. 6. Develop improvement plans strategically. 7. Implement performance changes effectively. 8. Monitor performance trends continuously. 9. Report performance outcomes honestly. 10. Optimize measurement process continuously. Performance measurement = business health. Targets set. Data collected. Metrics calculated. Results analyzed. Gaps identified. Plans developed. Changes implemented. Trends monitored. Outcomes reported. Process optimized.
        </div>
      </div>
    </main>
  );
}