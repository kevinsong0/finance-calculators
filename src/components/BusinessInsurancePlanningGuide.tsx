'use client'

export default function BusinessInsurancePlanningGuide() {
  const types = [
    { type: 'General liability', coverage: 'Third-party claims', importance: 'Essential' },
    { type: 'Property insurance', coverage: 'Physical assets', importance: 'Essential' },
    { type: 'Professional liability', coverage: 'Service errors', importance: 'Service firms' },
    { type: 'Workers compensation', coverage: 'Employee injuries', importance: 'Mandatory' },
    { type: 'Cyber insurance', coverage: 'Data breaches', importance: 'Digital businesses' },
    { type: 'Business interruption', coverage: 'Revenue loss', importance: 'Continuity' },
  ];

  const process = [
    'Assess business risks',
    'Identify coverage needs',
    'Research providers',
    'Compare policies',
    'Review exclusions',
    'Negotiate terms',
    'Purchase coverage',
    'Document policies',
    'Review annually',
    'Update for changes',
  ];

  const considerations = [
    { factor: 'Coverage adequacy', impact: 'Protection level', approach: 'Risk assessment' },
    { factor: 'Premium cost', impact: 'Budget impact', approach: 'Cost comparison' },
    { factor: 'Deductible level', impact: 'Out-of-pocket', approach: 'Balance analysis' },
    { factor: 'Policy exclusions', impact: 'Gap coverage', approach: 'Careful review' },
  ];

  const bestPractices = [
    'Bundle policies for savings',
    'Review coverage annually',
    'Document all policies',
    'Understand exclusions',
    'Maintain good records',
    'Report claims promptly',
    'Work with reputable providers',
    'Consider business growth',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Insurance Planning Guide</h1>
      <p className="text-zinc-600">Types, process, considerations, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Insurance Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Coverage: {t.coverage}</div>
              <div className="text-green-600 mt-1">Importance: {t.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.factor} className="bg-white rounded p-2">
              <strong>{c.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {c.impact}</div>
              <div className="text-green-600 mt-1">Approach: {c.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Insurance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess all business risks. 2. Identify coverage needs. 3. Research reputable providers. 4. Compare multiple policies. 5. Review policy exclusions. 6. Negotiate favorable terms. 7. Purchase adequate coverage. 8. Document all policies. 9. Review coverage annually. 10. Update for business changes. Business insurance = risk transfer. Risks assessed. Needs identified. Providers researched. Policies compared. Exclusions reviewed. Terms negotiated. Coverage purchased. Policies documented. Reviews conducted. Updates applied.
        </div>
      </div>
    </main>
  );
}