'use client'

export default function BusinessQualityManagementGuide() {
  const frameworks = [
    { framework: 'ISO 9001', focus: 'Quality management systems', application: 'Global certification' },
    { framework: 'TQM', focus: 'Total quality approach', application: 'Culture-driven quality' },
    { framework: 'Six Sigma', focus: 'Defect reduction', application: 'Process improvement' },
    { framework: 'Lean', focus: 'Waste elimination', application: 'Efficiency optimization' },
  ];

  const principles = [
    'Customer focus',
    'Leadership commitment',
    'Process approach',
    'Continuous improvement',
    'Evidence-based decisions',
    'Relationship management',
    'Risk-based thinking',
    'Employee engagement',
  ];

  const processes = [
    'Quality planning',
    'Quality control',
    'Quality assurance',
    'Quality improvement',
    'Quality audit',
    'Quality review',
    'Quality documentation',
    'Quality training',
  ];

  const metrics = [
    'Defect rate',
    'Customer satisfaction',
    'Process efficiency',
    'First-pass yield',
    'Cost of quality',
    'Quality compliance',
    'Audit score',
    'Improvement rate',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Quality Management Guide</h1>
      <p className="text-zinc-600">Frameworks, principles, processes, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">Focus: {f.focus}</div>
              <div className="text-green-600 mt-1">Application: {f.application}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Processes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Select quality framework. 2. Establish quality principles. 3. Define quality processes. 4. Set quality metrics. 5. Implement quality controls. 6. Conduct quality audits. 7. Drive continuous improvement. 8. Train quality culture. 9. Document quality systems. 10. Review quality performance. Quality management = business excellence. Framework selected. Principles established. Processes defined. Metrics set. Controls implemented. Audits conducted. Improvement driven. Culture trained. Systems documented. Performance reviewed.
        </div>
      </div>
    </main>
  );
}
