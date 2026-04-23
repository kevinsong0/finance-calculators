'use client'

export default function BusinessLaborRelationsGuide() {
  const aspects = [
    { aspect: 'Collective bargaining', focus: 'Negotiation process', outcome: 'Agreements' },
    { aspect: 'Union relations', focus: 'Collaboration', outcome: 'Partnership' },
    { aspect: 'Contract administration', focus: 'Agreement implementation', outcome: 'Compliance' },
    { aspect: 'Dispute resolution', focus: 'Conflict handling', outcome: 'Settlement' },
    { aspect: 'Grievance processing', focus: 'Complaint handling', outcome: 'Resolution' },
    { aspect: 'Compliance management', focus: 'Legal adherence', outcome: 'Legal standing' },
  ];

  const process = [
    'Understand labor laws',
    'Identify bargaining units',
    'Prepare negotiation strategy',
    'Engage in collective bargaining',
    'Administer agreements',
    'Handle grievances properly',
    'Resolve disputes effectively',
    'Maintain union communication',
    'Monitor compliance status',
    'Review and improve practices',
  ];

  const considerations = [
    { consideration: 'Legal requirements', factor: 'Labor laws', approach: 'Legal counsel' },
    { consideration: 'Economic factors', factor: 'Budget constraints', approach: 'Financial planning' },
    { consideration: 'Operational needs', factor: 'Business requirements', approach: 'Operations review' },
    { consideration: 'Employee interests', factor: 'Workforce concerns', approach: 'Employee input' },
  ];

  const skills = [
    'Negotiation techniques',
    'Conflict resolution',
    'Communication skills',
    'Legal knowledge',
    'Contract interpretation',
    'Relationship building',
    'Problem solving',
    'Mediation abilities',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Labor Relations Guide</h1>
      <p className="text-zinc-600">Aspects, process, considerations, and skills.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Relations Aspects</h3>
        <div className="space-y-1 text-xs">
          {aspects.map((a) => (
            <div key={a.aspect} className="bg-white rounded p-2">
              <strong>{a.aspect}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Outcome: {a.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
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
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Factor: {c.factor}</div>
              <div className="text-green-600 mt-1">Approach: {c.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Required Skills</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {skills.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Labor Relations Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Understand labor laws thoroughly. 2. Identify bargaining units accurately. 3. Prepare comprehensive negotiation strategy. 4. Engage in collective bargaining professionally. 5. Administer agreements consistently. 6. Handle grievances properly and promptly. 7. Resolve disputes effectively and fairly. 8. Maintain positive union communication. 9. Monitor compliance status continuously. 10. Review and improve practices regularly. Labor relations = workforce partnership. Laws understood. Units identified. Strategy prepared. Bargaining engaged. Agreements administered. Grievances handled. Disputes resolved. Communication maintained. Compliance monitored. Practices improved.
        </div>
      </div>
    </main>
  );
}