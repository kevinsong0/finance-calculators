'use client'

export default function EmployeeOffboardingGuide() {
  const steps = [
    { step: 'Notification', desc: 'Inform employee of departure', timing: 'As soon as known' },
    { step: 'Documentation', desc: 'Complete paperwork', timing: 'Before departure' },
    { step: 'Asset Recovery', desc: 'Collect company property', timing: 'Last day' },
    { step: 'Access Revocation', desc: 'Remove system access', timing: 'Departure day' },
    { step: 'Knowledge Transfer', desc: 'Transfer responsibilities', timing: 'Before departure' },
    { step: 'Exit Interview', desc: 'Conduct final discussion', timing: 'Last day/week' },
  ];

  const checklist = [
    'Departure notification',
    'Paperwork completion',
    'Asset recovery list',
    'Access revocation',
    'Knowledge transfer',
    'Exit interview',
    'Final paycheck',
    'Benefits status',
    'Reference eligibility',
    'Non-compete review',
  ];

  const assets = [
    'Computer/laptop',
    'Mobile devices',
    'Keys/cards',
    'Uniforms/equipment',
    'Company vehicle',
    'Documents/files',
    'Software licenses',
    'Company credit cards',
  ];

  const knowledgeTransfer = [
    'Current projects',
    'Pending tasks',
    'Key contacts',
    'Process documentation',
    'File locations',
    'System access needs',
    'Ongoing issues',
    'Client relationships',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Offboarding Guide</h1>
      <p className="text-zinc-600">Offboarding steps, checklist, assets, and knowledge transfer.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Offboarding Steps</h3>
        <div className="space-y-1 text-xs">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded p-2">
              <strong>{s.step}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Timing: {s.timing}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Offboarding Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Assets to Recover</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {assets.map((a) => (
            <div key={a} className="bg-white rounded p-2">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Knowledge Transfer Items</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {knowledgeTransfer.map((k) => (
            <div key={k} className="bg-white rounded p-2">{k}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Offboarding Checklist Summary</h3>
        <div className="text-xs text-zinc-600">
          1. Notify employee of departure date. 2. Complete all paperwork. 3. Document asset list to collect. 4. Arrange knowledge transfer. 5. Schedule exit interview. 6. Remove system access timely. 7. Collect all company property. 8. Process final paycheck. 9. Explain benefits continuation. 10. Clarify reference policy. 11. Review non-compete if applicable. 12. Document everything. Offboarding = orderly departure. Document process. Recover assets. Transfer knowledge. Remove access. Final pay accurate. Exit interview valuable."
        </div>
      </div>
    </main>
  );
}