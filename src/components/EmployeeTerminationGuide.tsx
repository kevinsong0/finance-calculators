'use client'

export default function EmployeeTerminationGuide() {
  const types = [
    { type: 'Voluntary resignation', reason: 'Employee choice', process: 'Resignation handling' },
    { type: 'Involuntary termination', reason: 'Employer decision', process: 'Performance/discipline' },
    { type: 'Layoff', reason: 'Business need', process: 'Reduction in force' },
    { type: 'Termination for cause', reason: 'Policy violation', process: 'Discipline outcome' },
    { type: 'Retirement', reason: 'Career end', process: 'Retirement process' },
    { type: 'Contract end', reason: 'Contract term', process: 'Contract completion' },
  ];

  const process = [
    'Review employment terms',
    'Follow termination policy',
    'Consult legal counsel',
    'Document rationale',
    'Plan termination meeting',
    'Prepare separation package',
    'Conduct meeting',
    'Complete paperwork',
    'Handle logistics',
    'Communicate to team',
    'Manage access removal',
    'Follow up support',
  ];

  const documentation = [
    'Termination letter',
    'Performance records',
    'Discipline history',
    'Investigation records',
    'Separation agreement',
    'COBRA information',
    'Final paycheck',
    'Benefits information',
    'Reference policy',
    'Return receipt',
  ];

  const considerations = [
    'Legal compliance',
    'Employment agreement',
    'Severance eligibility',
    'Benefits continuation',
    'Reference handling',
    'Non-compete issues',
    'Final pay timing',
    'Documentation quality',
    'Communication timing',
    'Security access',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Termination Guide</h1>
      <p className="text-zinc-600">Types, process, documentation, and considerations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Termination Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Reason: {t.reason}</div>
              <div className="text-green-600 mt-1">Process: {t.process}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Termination Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Required Documentation</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {documentation.map((d, idx) => (
            <div key={d} className="bg-white rounded p-2">{idx + 1}. {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Termination Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Review employment terms and contract. 2. Follow termination policy. 3. Consult legal counsel if needed. 4. Document termination rationale. 5. Prepare termination meeting. 6. Prepare separation package. 7. Conduct meeting professionally. 8. Complete all paperwork. 9. Handle logistics properly. 10. Communicate appropriately to team. 11. Remove access and permissions. 12. Collect company property. 13. Process final paycheck timely. 14. Provide benefits information. 15. Document entire process. Termination = professional handling. Legal compliance. Proper documentation. Professional meeting. Complete paperwork. Access removal. Final pay timely. Benefits information. Clear communication.
        </div>
      </div>
    </main>
  );
}