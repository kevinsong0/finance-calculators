'use client'

export default function EmployeeGrievanceGuide() {
  const types = [
    { type: 'Work conditions', desc: 'Environment concerns', process: 'Manager first' },
    { type: 'Policy disputes', desc: 'Policy interpretation', process: 'HR involvement' },
    { type: 'Treatment issues', desc: 'Fairness concerns', process: 'Formal process' },
    { type: 'Compensation', desc: 'Pay concerns', process: 'HR review' },
    { type: 'Harassment', desc: 'Behavior complaints', process: 'Investigation' },
  ];

  const process = [
    'Receive complaint',
    'Document grievance',
    'Acknowledge receipt',
    'Investigate issue',
    'Gather information',
    'Review policy',
    'Make determination',
    'Communicate decision',
    'Implement resolution',
    'Follow up',
  ];

  const rights = [
    'Submit without fear',
    'Receive acknowledgment',
    'Fair investigation',
    'Timely resolution',
    'Appeal decision',
    'Confidentiality',
    'No retaliation',
    'Representation option',
  ];

  const resolution = [
    { method: 'Direct discussion', when: 'Minor issues', outcome: 'Quick resolution' },
    { method: 'Mediation', when: 'Relationship issues', outcome: 'Mutual agreement' },
    { method: 'Investigation', when: 'Serious matters', outcome: 'Formal decision' },
    { method: 'Appeal', when: 'Disputed outcome', outcome: 'Review decision' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Grievance Guide</h1>
      <p className="text-zinc-600">Types, process, rights, and resolution methods.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Grievance Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Process: {t.process}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Process Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Employee Rights</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {rights.map((r, i) => (
            <div key={r} className="bg-white rounded p-2">{i + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resolution Methods</h3>
        <div className="space-y-1 text-xs">
          {resolution.map((r) => (
            <div key={r.method} className="bg-white rounded p-2">
              <strong>{r.method}</strong>
              <div className="text-zinc-500 mt-1">When: {r.when}</div>
              <div className="text-green-600 mt-1">Outcome: {r.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Grievance Process Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Have clear grievance policy. 2. Define grievance types. 3. Establish submission process. 4. Set timeline expectations. 5. Create investigation protocol. 6. Define decision process. 7. Establish appeal mechanism. 8. Document all steps. 9. Communicate outcomes. 10. Prevent retaliation. 11. Track grievance patterns. 12. Review policy effectiveness. Grievance = fair process. Clear policy. Submission channels. Timely investigation. Fair decision. Appeal option. No retaliation. Pattern analysis.
        </div>
      </div>
    </main>
  );
}