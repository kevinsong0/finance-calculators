'use client'

export default function ConflictResolutionGuide() {
  const sources = [
    { source: 'Communication Issues', desc: 'Misunderstandings, unclear expectations', resolution: 'Clear communication' },
    { source: 'Resource Competition', desc: 'Limited resources allocation', resolution: 'Fair allocation process' },
    { source: 'Personal Differences', desc: 'Personality, style conflicts', resolution: 'Understanding, compromise' },
    { source: 'Role Confusion', desc: 'Unclear responsibilities', resolution: 'Role clarification' },
    { source: 'Process Disagreement', desc: 'How work should be done', resolution: 'Discuss, agree on approach' },
    { source: 'Performance Issues', desc: 'Quality, output concerns', resolution: 'Feedback, improvement' },
  ];

  const approaches = [
    { approach: 'Collaborate', desc: 'Work together for solution', use: 'Both parties important' },
    { approach: 'Compromise', desc: 'Both give something', use: 'Equal power, quick resolution' },
    { approach: 'Accommodate', desc: 'One party yields', use: 'Relationship important' },
    { approach: 'Avoid', desc: 'Postpone or ignore', use: 'Issue trivial, time needed' },
    { approach: 'Compete', desc: 'One wins, other loses', use: 'Emergency, quick decision' },
  ];

  const process = [
    'Identify the conflict',
    'Understand perspectives',
    'Find common ground',
    'Generate options',
    'Evaluate solutions',
    'Agree on approach',
    'Implement solution',
    'Monitor results',
  ];

  const skills = [
    'Active listening',
    'Remaining neutral',
    'Asking clarifying questions',
    'Focusing on issues',
    'Remaining calm',
    'Seeking compromise',
    'Building trust',
    'Following through',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Conflict Resolution Guide</h1>
      <p className="text-zinc-600">Conflict sources, approaches, process, and skills.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Conflict Sources</h3>
        <div className="space-y-1 text-xs">
          {sources.map((s) => (
            <div key={s.source} className="bg-white rounded p-2">
              <strong className="text-red-600">{s.source}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Resolution: {s.resolution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resolution Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">{a.desc}</div>
              <div className="text-green-600 mt-1">Use: {a.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resolution Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Required Skills</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {skills.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Conflict Resolution Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify conflict early. 2. Understand all perspectives. 3. Remain neutral and calm. 4. Focus on issues not people. 5. Listen actively to all parties. 6. Find common interests. 7. Generate multiple solutions. 8. Evaluate options objectively. 9. Agree on best approach. 10. Implement solution clearly. 11. Monitor results. 12. Follow up to prevent recurrence. Conflict resolution = address early. Understand perspectives. Stay neutral. Focus on issues. Generate options. Agree on solution. Monitor and follow up."
        </div>
      </div>
    </main>
  );
}