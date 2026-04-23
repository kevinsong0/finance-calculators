'use client'

export default function WorkplaceConflictGuide() {
  const conflictTypes = [
    { type: 'Task Conflict', desc: 'Work-related disagreements', resolution: 'Clarify goals, compromise' },
    { type: 'Process Conflict', desc: 'How work should be done', resolution: 'Standardize procedures' },
    { type: 'Relationship Conflict', desc: 'Personal friction', resolution: 'Mediation, boundaries' },
    { type: 'Status Conflict', desc: 'Authority/role disputes', resolution: 'Clear roles, hierarchy' },
    { type: 'Value Conflict', desc: 'Different beliefs/principles', resolution: 'Respect, common ground' },
    { type: 'Resource Conflict', desc: 'Competition for resources', resolution: 'Fair allocation rules' },
  ];

  const resolutionSteps = [
    'Identify the issue',
    'Understand perspectives',
    'Find common ground',
    'Explore solutions',
    'Agree on action',
    'Implement solution',
    'Monitor progress',
    'Prevent recurrence',
  ];

  const mediationTips = [
    'Stay neutral',
    'Listen to both sides',
    'Focus on facts',
    'Separate people from problem',
    'Find shared interests',
    'Generate options',
    'Agree on criteria',
    'Document resolution',
  ];

  const escalationTriggers = [
    'Safety concerns',
    'Legal issues',
    'HR policy violations',
    'Unresolved after attempts',
    'Harassment/discrimination',
    'Violence threats',
    'Impact on business',
    'Team-wide conflict',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Conflict Resolution Guide</h1>
      <p className="text-zinc-600">Conflict types, resolution steps, and mediation techniques.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Conflict Types</h3>
        <div className="space-y-1 text-xs">
          {conflictTypes.map((c) => (
            <div key={c.type} className="bg-white rounded p-2">
              <strong>{c.type}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Resolution: {c.resolution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resolution Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {resolutionSteps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Mediation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mediationTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Escalation Triggers</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {escalationTriggers.map((t) => (
            <div key={t} className="bg-white rounded p-2 text-red-600">⚠️ {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Conflict Resolution Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Acknowledge conflict exists. 2. Meet privately with parties. 3. Listen without judgment. 4. Identify root cause not symptoms. 5. Separate facts from emotions. 6. Focus on future solutions. 7. Find common interests. 8. Generate multiple options. 9. Agree on specific actions. 10. Set timeline for resolution. 11. Document agreed solution. 12. Follow up on progress. Conflict = opportunity for improvement. Address early before escalation. Neutral facilitation. Focus on work outcomes."
        </div>
      </div>
    </main>
  );
}