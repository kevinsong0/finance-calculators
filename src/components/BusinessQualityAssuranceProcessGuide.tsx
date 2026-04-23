'use client'

export default function BusinessQualityAssuranceProcessGuide() {
  const aspects = [
    { aspect: 'Product QA', scope: 'Product quality', methods: 'Testing protocols' },
    { aspect: 'Process QA', scope: 'Process quality', methods: 'Process audits' },
    { aspect: 'Service QA', scope: 'Service quality', methods: 'Service reviews' },
    { aspect: 'Document QA', scope: 'Documentation', methods: 'Review cycles' },
    { aspect: 'Data QA', scope: 'Data quality', methods: 'Validation rules' },
    { aspect: 'Code QA', scope: 'Software quality', methods: 'Code reviews' },
  ];

  const methods = [
    'Define quality standards',
    'Establish QA processes',
    'Create checklists and templates',
    'Conduct quality reviews',
    'Perform testing activities',
    'Document quality findings',
    'Track quality metrics',
    'Report quality status',
    'Implement improvements',
    'Validate quality outcomes',
  ];

  const techniques = [
    { technique: 'Testing', application: 'Product verification', outcome: 'Defect detection' },
    { technique: 'Inspection', application: 'Process review', outcome: 'Standard adherence' },
    { technique: 'Audit', application: 'System evaluation', outcome: 'Compliance' },
    { technique: 'Review', application: 'Document check', outcome: 'Accuracy' },
  ];

  const metrics = [
    'Defect rate',
    'Quality score',
    'Review completion',
    'Test coverage',
    'Error reduction',
    'Quality cost',
    'Customer satisfaction',
    'Process efficiency',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Quality Assurance Process Guide</h1>
      <p className="text-zinc-600">Aspects, methods, techniques, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Aspects</h3>
        <div className="space-y-1 text-xs">
          {aspects.map((a) => (
            <div key={a.aspect} className="bg-white rounded p-2">
              <strong>{a.aspect}</strong>
              <div className="text-zinc-500 mt-1">Scope: {a.scope}</div>
              <div className="text-green-600 mt-1">Methods: {a.methods}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Techniques</h3>
        <div className="space-y-1 text-xs">
          {techniques.map((t) => (
            <div key={t.technique} className="bg-white rounded p-2">
              <strong>{t.technique}</strong>
              <div className="text-zinc-500 mt-1">Application: {t.application}</div>
              <div className="text-green-600 mt-1">Outcome: {t.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">QA Process Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define clear quality standards. 2. Establish effective QA processes. 3. Create comprehensive checklists. 4. Conduct thorough quality reviews. 5. Perform rigorous testing activities. 6. Document all quality findings. 7. Track key quality metrics. 8. Report quality status regularly. 9. Implement meaningful improvements. 10. Validate quality outcomes. Quality assurance = excellence delivery. Standards defined. Processes established. Checklists created. Reviews conducted. Testing performed. Findings documented. Metrics tracked. Status reported. Improvements implemented. Outcomes validated.
        </div>
      </div>
    </main>
  );
}