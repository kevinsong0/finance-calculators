'use client'

export default function QualityAssuranceGuide() {
  const principles = [
    { principle: 'Prevention', desc: 'Avoid defects', approach: 'Process design' },
    { principle: 'Continuous Improvement', desc: 'Always improve', approach: 'PDCA cycle' },
    { principle: 'Customer Focus', desc: 'Meet requirements', approach: 'Understand needs' },
    { principle: 'Process Control', desc: 'Monitor processes', approach: 'Standards, metrics' },
    { principle: 'Employee Involvement', desc: 'Everyone responsible', approach: 'Training, empowerment' },
    { principle: 'Data-Driven', desc: 'Make decisions with data', approach: 'Measure, analyze' },
  ];

  const methods = [
    { method: 'Inspection', desc: 'Check output', use: 'Detect defects' },
    { method: 'Testing', desc: 'Verify functionality', use: 'Pre-release' },
    { method: 'Review', desc: 'Examine process/output', use: 'Prevent issues' },
    { method: 'Audit', desc: 'Assess compliance', use: 'Periodic check' },
    { method: 'Sampling', desc: 'Check subset', use: 'Large volumes' },
    { method: 'Automation', desc: 'Automated checks', use: 'Consistent verification' },
  ];

  const metrics = [
    'Defect rate',
    'First pass yield',
    'Customer complaints',
    'Return rate',
    'Cycle time',
    'Cost of quality',
  ];

  const process = [
    'Define quality standards',
    'Design process controls',
    'Implement inspection',
    'Collect quality data',
    'Analyze results',
    'Identify improvement areas',
    'Implement corrections',
    'Verify improvements',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Quality Assurance Guide</h1>
      <p className="text-zinc-600">QA principles, methods, metrics, and process.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Approach: {p.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Use: {m.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define quality standards clearly. 2. Design processes for quality. 3. Implement inspection points. 4. Train all employees. 5. Collect quality data regularly. 6. Analyze for patterns. 7. Identify root causes. 8. Implement corrective actions. 9. Verify improvements work. 10. Document all procedures. 11. Audit periodically. 12. Continuously improve. QA = prevention over detection. Define standards. Train everyone. Measure everything. Analyze data. Improve continuously. Everyone responsible for quality."
        </div>
      </div>
    </main>
  );
}