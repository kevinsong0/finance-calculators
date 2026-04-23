'use client'

export default function BusinessFinancialRiskAssessmentGuide() {
  const types = [
    { type: 'Market risk', source: 'Price fluctuations', impact: 'Value volatility' },
    { type: 'Credit risk', source: 'Counterparty default', impact: 'Loss exposure' },
    { type: 'Liquidity risk', source: 'Cash constraints', impact: 'Operational disruption' },
    { type: 'Operational risk', source: 'Process failures', impact: 'Efficiency loss' },
  ];

  const methods = [
    'Risk identification',
    'Risk quantification',
    'Probability assessment',
    'Impact analysis',
    'Risk mapping',
    'Scenario analysis',
    'Stress testing',
    'Sensitivity analysis',
    'VaR calculation',
    'Risk aggregation',
  ];

  const metrics = [
    { metric: 'Probability of occurrence', description: 'Likelihood estimate', output: 'Risk frequency' },
    { metric: 'Impact magnitude', description: 'Consequence severity', output: 'Risk severity' },
    { metric: 'Expected loss', description: 'Probability × Impact', output: 'Risk exposure' },
    { metric: 'Risk-adjusted return', description: 'Return after risk', output: 'Net value' },
  ];

  const responses = [
    'Risk avoidance',
    'Risk reduction',
    'Risk transfer',
    'Risk acceptance',
    'Risk hedging',
    'Risk diversification',
    'Risk monitoring',
    'Risk contingency',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Risk Assessment Guide</h1>
      <p className="text-zinc-600">Types, methods, metrics, and responses.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Source: {t.source}</div>
              <div className="text-green-600 mt-1">Impact: {t.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Assessment Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Description: {m.description}</div>
              <div className="text-green-600 mt-1">Output: {m.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {responses.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Risk Assessment Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all risk types. 2. Quantify risk exposures. 3. Assess probability accurately. 4. Analyze impact severity. 5. Map risk distribution. 6. Run scenario analysis. 7. Conduct stress testing. 8. Calculate expected loss. 9. Determine response strategy. 10. Monitor continuously. Financial risk assessment = proactive protection. Risks identified. Exposures quantified. Probability assessed. Impact analyzed. Risks mapped. Scenarios run. Testing done. Loss calculated. Strategy determined. Monitoring active.
        </div>
      </div>
    </main>
  );
}