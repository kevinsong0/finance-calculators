'use client'

export default function BusinessContinuousImprovementGuide() {
  const approaches = [
    { approach: 'Lean improvement', focus: 'Waste elimination', method: 'Value stream' },
    { approach: 'Kaizen', focus: 'Small changes', method: 'Daily improvement' },
    { approach: 'Six Sigma', focus: 'Variation reduction', method: 'DMAIC process' },
    { approach: 'Agile improvement', focus: 'Iterative change', method: 'Sprint reviews' },
    { approach: 'PDCA cycle', focus: 'Trial learning', method: 'Plan-do-check-act' },
    { approach: 'BPR', focus: 'Process redesign', method: 'Radical change' },
  ];

  const cycle = [
    'Identify improvement opportunity',
    'Analyze current performance',
    'Define improvement goals',
    'Develop improvement plan',
    'Implement improvement changes',
    'Measure improvement results',
    'Evaluate improvement impact',
    'Standardize successful improvements',
    'Identify next opportunities',
    'Sustain improvement momentum',
  ];

  const tools = [
    { tool: 'Process mapping', purpose: 'Visualization', application: 'Understanding flows' },
    { tool: 'Root cause analysis', purpose: 'Problem solving', application: 'Finding causes' },
    { tool: 'Benchmarking', purpose: 'Comparison', application: 'Performance gaps' },
    { tool: 'Metrics tracking', purpose: 'Measurement', application: 'Progress monitoring' },
  ];

  const culture = [
    'Improvement mindset',
    'Learning environment',
    'Experiment encouragement',
    'Failure acceptance',
    'Knowledge sharing',
    'Recognition systems',
    'Training programs',
    'Leadership support',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Continuous Improvement Guide</h1>
      <p className="text-zinc-600">Approaches, cycle, tools, and culture elements.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Method: {a.method}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Cycle</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {cycle.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {t.purpose}</div>
              <div className="text-green-600 mt-1">Application: {t.application}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Culture Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {culture.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Continuous Improvement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify improvement opportunities proactively. 2. Analyze current performance thoroughly. 3. Define clear improvement goals. 4. Develop comprehensive improvement plans. 5. Implement improvement changes effectively. 6. Measure improvement results accurately. 7. Evaluate improvement impact honestly. 8. Standardize successful improvements consistently. 9. Identify next opportunities continuously. 10. Sustain improvement momentum persistently. Continuous improvement = competitive advantage. Opportunities identified. Performance analyzed. Goals defined. Plans developed. Changes implemented. Results measured. Impact evaluated. Improvements standardized. Opportunities identified. Momentum sustained.
        </div>
      </div>
    </main>
  );
}