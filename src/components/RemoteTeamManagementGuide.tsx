'use client'

export default function RemoteTeamManagementGuide() {
  const challenges = [
    { challenge: 'Communication', desc: 'Information gaps, delays', solution: 'Async-first, clear documentation' },
    { challenge: 'Collaboration', desc: 'Team cohesion, isolation', solution: 'Regular check-ins, virtual events' },
    { challenge: 'Accountability', desc: 'Tracking work, visibility', solution: 'Clear goals, regular updates' },
    { challenge: 'Trust', desc: 'Micromanagement tendency', solution: 'Outcome focus, autonomy' },
    { challenge: 'Time Zones', desc: 'Coordination difficulties', solution: 'Overlap hours, async defaults' },
  ];

  const practices = [
    'Clear communication channels',
    'Document decisions',
    'Regular video check-ins',
    'Set expectations explicitly',
    'Respect time zones',
    'Focus on outcomes',
    'Build team rituals',
    'Trust and autonomy',
  ];

  const tools = [
    { category: 'Communication', tools: 'Slack, Teams, Discord' },
    { category: 'Video', tools: 'Zoom, Google Meet' },
    { category: 'Project Management', tools: 'Jira, Asana, Notion' },
    { category: 'Documentation', tools: 'Confluence, Notion, Git' },
    { category: 'Time Tracking', tools: 'Clockify, Harvest' },
  ];

  const meetingTips = [
    'Define purpose before meeting',
    'Share agenda in advance',
    'Keep meetings short (30 min)',
    'Record for absent team members',
    'Follow up with written summary',
    'Limit required attendance',
    'Default to async when possible',
    'Respect overlap hours',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Remote Team Management Guide</h1>
      <p className="text-zinc-600">Challenges, practices, tools, and meeting tips for remote teams.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Challenges</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong>{c.challenge}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Solution: {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.category} className="bg-white rounded p-2">
              <strong>{t.category}</strong>
              <div className="text-zinc-500 mt-1">{t.tools}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Meeting Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {meetingTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set communication expectations. 2. Choose right tools. 3. Establish regular rhythms. 4. Document all decisions. 5. Focus on outcomes not activity. 6. Build trust through transparency. 7. Create team connection opportunities. 8. Respect time zones. 9. Provide growth opportunities. 10. Check in regularly (1:1s). Remote teams = intentionality + documentation + trust. Not micromanagement. Set clear expectations."
        </div>
      </div>
    </main>
  );
}