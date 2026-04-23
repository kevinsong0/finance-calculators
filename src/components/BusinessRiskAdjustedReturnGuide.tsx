'use client'

export default function BusinessRiskAdjustedReturnGuide() {
  const measures = [
    { measure: 'Sharpe ratio', formula: '(Return - Risk-free)/Std dev', interpretation: 'Risk efficiency' },
    { measure: 'Treynor ratio', formula: '(Return - Risk-free)/Beta', interpretation: 'Market risk efficiency' },
    { measure: 'Jensen alpha', formula: 'Actual - Expected return', interpretation: 'Excess performance' },
    { measure: 'Information ratio', formula: 'Active return/Tracking error', interpretation: 'Manager skill' },
  ];

  const steps = [
    'Calculate portfolio return',
    'Determine risk-free rate',
    'Measure portfolio volatility',
    'Calculate beta coefficient',
    'Compute Sharpe ratio',
    'Compute Treynor ratio',
    'Calculate Jensen alpha',
    'Calculate information ratio',
    'Compare to benchmarks',
    'Interpret risk-adjusted performance',
  ];

  const factors = [
    { factor: 'Return volatility', impact: 'Risk measure', consideration: 'Standard deviation' },
    { factor: 'Market correlation', impact: 'Beta measure', consideration: 'Systematic risk' },
    { factor: 'Time period', impact: 'Calculation accuracy', consideration: 'Appropriate horizon' },
    { factor: 'Benchmark selection', impact: 'Relative performance', consideration: 'Proper comparison' },
  ];

  const applications = [
    'Portfolio evaluation',
    'Manager selection',
    'Investment comparison',
    'Performance attribution',
    'Risk management',
    'Strategy assessment',
    'Asset allocation',
    'Fund ranking',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Risk-Adjusted Return Guide</h1>
      <p className="text-zinc-600">Measures, steps, factors, and applications.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Measures</h3>
        <div className="space-y-1 text-xs">
          {measures.map((m) => (
            <div key={m.measure} className="bg-white rounded p-2">
              <strong>{m.measure}</strong>
              <div className="text-zinc-500 mt-1">Formula: {m.formula}</div>
              <div className="text-green-600 mt-1">Interpretation: {m.interpretation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Calculation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {f.impact}</div>
              <div className="text-green-600 mt-1">Consideration: {f.consideration}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Applications</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {applications.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk-Adjusted Return Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate portfolio return accurately. 2. Determine risk-free rate correctly. 3. Measure portfolio volatility precisely. 4. Calculate beta coefficient accurately. 5. Compute Sharpe ratio properly. 6. Compute Treynor ratio correctly. 7. Calculate Jensen alpha precisely. 8. Calculate information ratio properly. 9. Compare to benchmarks fairly. 10. Interpret performance objectively. Risk-adjusted return = true performance. Return calculated. Risk-free determined. Volatility measured. Beta calculated. Sharpe computed. Treynor computed. Alpha calculated. Information computed. Benchmarks compared. Performance interpreted.
        </div>
      </div>
    </main>
  );
}
