'use client'

export default function BusinessProcessImprovementGuide() {
  const methods = [
    { method: 'Lean', focus: 'Waste elimination', outcome: 'Efficiency gains' },
    { method: 'Six Sigma', focus: 'Variation reduction', outcome: 'Quality improvement' },
    { method: 'Kaizen', focus: 'Continuous improvement', outcome: 'Incremental progress' },
    { method: 'Business process', focus: 'Process redesign', outcome: 'Transformation' },
    { method: 'TQM', focus: 'Quality culture', outcome: 'Organization-wide quality' },
    { method: 'Agile', focus: 'Flexibility', outcome: 'Adaptability' },
  ];

  const steps = [
    'Identify improvement opportunity',
    'Analyze current process',
    'Define improvement goals',
    'Design improved process',
    'Implement changes',
    'Monitor results',
    'Standardize improvements',
    'Continue improvement cycle',
  ];

  const tools = [
    { tool: 'Value stream mapping', application: 'Process visualization', benefit: 'Identify waste' },
    { tool: 'Root cause analysis', application: 'Problem solving', benefit: 'Find causes' },
    { tool: 'Benchmarking', application: 'Performance comparison', benefit: 'Set targets' },
    { tool: 'PDCA cycle', application: 'Iterative improvement', benefit: 'Continuous progress' },
  ];

  const benefits = [
    'Cost reduction',
    'Quality improvement',
    'Time savings',
    'Customer satisfaction',
    'Employee engagement',
    'Competitive advantage',
    'Risk reduction',
    'Innovation enablement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Process Improvement Guide</h1>
      <p className="text-zinc-600">Methods, steps, tools, and benefits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Focus: {m.focus}</div>
              <div className="text-green-600 mt-1">Outcome: {m.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Application: {t.application}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Benefits</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {benefits.map((b, idx) => (
            <div key={b} className="bg-white rounded p-2">{idx + 1}. {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Process Improvement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate method. 2. Identify improvement opportunity. 3. Analyze current process. 4. Define improvement goals. 5. Design improved process. 6. Implement changes carefully. 7. Monitor results closely. 8. Standardize successful improvements. 9. Continue improvement cycle. 10. Document lessons learned. Process improvement = operational excellence. Method chosen. Opportunity identified. Process analyzed. Goals defined. Process designed. Changes implemented. Results monitored. Improvements standardized. Cycle continued. Lessons documented.
        </div>
      </div>
    </main>
  );
}