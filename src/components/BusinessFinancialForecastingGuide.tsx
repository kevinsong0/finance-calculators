'use client'

export default function BusinessFinancialForecastingGuide() {
  const types = [
    { type: 'Revenue forecasting', method: 'Historical trends, market analysis', purpose: 'Income planning' },
    { type: 'Expense forecasting', method: 'Cost trends, budget analysis', purpose: 'Cost control' },
    { type: 'Cash forecasting', method: 'Cash flow analysis', purpose: 'Liquidity planning' },
    { type: 'Profit forecasting', method: 'Revenue minus costs', purpose: 'Performance projection' },
  ];

  const techniques = [
    'Historical trend analysis',
    'Regression analysis',
    'Moving average methods',
    'Seasonal adjustment',
    'Scenario planning',
    'Driver-based forecasting',
    'Rolling forecasts',
    'Machine learning models',
    'Expert judgment',
    'Market research integration',
  ];

  const inputs = [
    { input: 'Historical data', source: 'Past performance', reliability: 'High' },
    { input: 'Market trends', source: 'Industry analysis', reliability: 'Medium' },
    { input: 'Economic indicators', source: 'Macro factors', reliability: 'Variable' },
    { input: 'Business drivers', source: 'Internal metrics', reliability: 'High' },
  ];

  const accuracy = [
    'Forecast bias check',
    'Variance analysis',
    'Confidence intervals',
    'Sensitivity testing',
    'Back-testing results',
    'Forecast reconciliation',
    'Stakeholder feedback',
    'Continuous improvement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Forecasting Guide</h1>
      <p className="text-zinc-600">Types, techniques, inputs, and accuracy.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Forecast Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Method: {t.method}</div>
              <div className="text-green-600 mt-1">Purpose: {t.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Forecasting Techniques</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {techniques.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Forecast Inputs</h3>
        <div className="space-y-1 text-xs">
          {inputs.map((i) => (
            <div key={i.input} className="bg-white rounded p-2">
              <strong>{i.input}</strong>
              <div className="text-zinc-500 mt-1">Source: {i.source}</div>
              <div className="text-green-600 mt-1">Reliability: {i.reliability}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Accuracy Measures</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {accuracy.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financial Forecasting Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Gather historical data comprehensively. 2. Analyze market trends carefully. 3. Select appropriate techniques. 4. Build forecast models accurately. 5. Validate forecast assumptions. 6. Generate forecast scenarios. 7. Test forecast sensitivity. 8. Review forecast accuracy. 9. Adjust forecasts dynamically. 10. Communicate forecasts clearly. Financial forecasting = proactive planning. Data gathered. Trends analyzed. Techniques selected. Models built. Assumptions validated. Scenarios generated. Sensitivity tested. Accuracy reviewed. Forecasts adjusted. Communication clear.
        </div>
      </div>
    </main>
  );
}