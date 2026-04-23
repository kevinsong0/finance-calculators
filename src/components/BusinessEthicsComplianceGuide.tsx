'use client'

export default function BusinessEthicsComplianceGuide() {
  const principles = [
    { principle: 'Integrity', expectation: 'Honest conduct', enforcement: 'Zero tolerance' },
    { principle: 'Fairness', expectation: 'Equal treatment', enforcement: 'Policy review' },
    { principle: 'Transparency', expectation: 'Open disclosure', enforcement: 'Audit process' },
    { principle: 'Responsibility', expectation: 'Accountable actions', enforcement: 'Performance link' },
    { principle: 'Respect', expectation: 'Dignified interaction', enforcement: 'HR oversight' },
    { principle: 'Compliance', expectation: 'Legal adherence', enforcement: 'Legal review' },
  ];

  const areas = [
    'Financial ethics',
    'Workplace conduct',
    'Data privacy',
    'Anti-corruption',
    'Fair competition',
    'Environmental ethics',
    'Supply chain ethics',
    'Customer relations',
  ];

  const process = [
    { step: 'Code development', activity: 'Policy creation', outcome: 'Standards defined' },
    { step: 'Training delivery', activity: 'Education programs', outcome: 'Awareness built' },
    { step: 'Monitoring systems', activity: 'Compliance tracking', outcome: 'Issues detected' },
    { step: 'Reporting channels', activity: 'Whistleblower access', outcome: 'Concerns voiced' },
  ];

  const violations = [
    'Financial misconduct',
    'Harassment incidents',
    'Data breaches',
    'Corruption attempts',
    'Safety violations',
    'Discrimination cases',
    'Conflict violations',
    'Compliance failures',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Ethics Compliance Guide</h1>
      <p className="text-zinc-600">Principles, areas, process, and violations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Ethics Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">Expectation: {p.expectation}</div>
              <div className="text-green-600 mt-1">Enforcement: {p.enforcement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Areas</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {areas.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Process</h3>
        <div className="space-y-1 text-xs">
          {process.map((p) => (
            <div key={p.step} className="bg-white rounded p-2">
              <strong>{p.step}</strong>
              <div className="text-zinc-500 mt-1">Activity: {p.activity}</div>
              <div className="text-green-600 mt-1">Outcome: {p.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Violation Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {violations.map((v, idx) => (
            <div key={v} className="bg-white rounded p-2">{idx + 1}. {v}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Ethics Compliance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish clear ethics principles. 2. Define compliance areas comprehensively. 3. Develop ethics code thoroughly. 4. Deliver training programs effectively. 5. Implement monitoring systems properly. 6. Create reporting channels safely. 7. Handle violations consistently. 8. Review ethics program regularly. 9. Update policies as needed. 10. Maintain ethics culture continuously. Ethics compliance = organizational integrity. Principles established. Areas defined. Code developed. Training delivered. Monitoring implemented. Channels created. Violations handled. Program reviewed. Policies updated. Culture maintained.
        </div>
      </div>
    </main>
  );
}