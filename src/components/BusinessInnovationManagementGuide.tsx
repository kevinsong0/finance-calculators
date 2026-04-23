'use client'

export default function BusinessInnovationManagementGuide() {
  const types = [
    { type: 'Product innovation', focus: 'New offerings', outcome: 'Market differentiation' },
    { type: 'Process innovation', focus: 'Method improvement', outcome: 'Efficiency gains' },
    { type: 'Business model innovation', focus: 'Revenue models', outcome: 'New value' },
    { type: 'Service innovation', focus: 'Customer experience', outcome: 'Service excellence' },
    { type: 'Technology innovation', focus: 'Tech advancement', outcome: 'Capability' },
    { type: 'Organizational innovation', focus: 'Structure changes', outcome: 'Agility' },
  ];

  const process = [
    'Identify innovation opportunities',
    'Generate innovation ideas',
    'Evaluate innovation potential',
    'Prioritize innovation projects',
    'Prototype innovations',
    'Test innovation concepts',
    'Implement innovations',
    'Scale successful innovations',
    'Measure innovation impact',
    'Capture innovation learning',
  ];

  const methods = [
    { method: 'Design thinking', approach: 'User-centered', benefit: 'Customer relevance' },
    { method: 'Agile innovation', approach: 'Iterative development', benefit: 'Speed' },
    { method: 'Open innovation', approach: 'External collaboration', benefit: 'Diverse ideas' },
    { method: 'Lean startup', approach: 'Experiment-driven', benefit: 'Risk reduction' },
  ];

  const metrics = [
    'Innovation pipeline size',
    'Innovation success rate',
    'Time to market',
    'Innovation ROI',
    'Patent filings',
    'New product revenue',
    'Innovation culture index',
    'Innovation investment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Innovation Management Guide</h1>
      <p className="text-zinc-600">Types, process, methods, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Focus: {t.focus}</div>
              <div className="text-green-600 mt-1">Outcome: {t.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Methods</h3>
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
        <h3 className="font-medium mb-2">Innovation Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify innovation opportunities. 2. Generate innovation ideas actively. 3. Evaluate innovation potential carefully. 4. Prioritize innovation projects strategically. 5. Prototype innovations quickly. 6. Test innovation concepts rigorously. 7. Implement innovations effectively. 8. Scale successful innovations. 9. Measure innovation impact accurately. 10. Capture innovation learning systematically. Innovation management = competitive future. Opportunities identified. Ideas generated. Potential evaluated. Projects prioritized. Prototypes built. Concepts tested. Innovations implemented. Successes scaled. Impact measured. Learning captured.
        </div>
      </div>
    </main>
  );
}