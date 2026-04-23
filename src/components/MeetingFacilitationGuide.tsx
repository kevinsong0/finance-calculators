'use client'

export default function MeetingFacilitationGuide() {
  const meetingTypes = [
    { type: 'Decision Meeting', purpose: 'Reach specific outcome', prep: 'Options prepared, criteria clear' },
    { type: 'Status Meeting', purpose: 'Share updates', prep: 'Brief updates, no discussion' },
    { type: 'Brainstorm', purpose: 'Generate ideas', prep: 'Problem defined, no solutions yet' },
    { type: 'Planning', purpose: 'Create roadmap', prep: 'Goals, constraints known' },
    { type: 'Retrospective', purpose: 'Learn from past', prep: 'Data collected, safe space' },
    { type: '1:1', purpose: 'Individual connection', prep: 'Topics prepared, private setting' },
  ];

  const facilitationTips = [
    'Clear agenda shared',
    'Start and end on time',
    'Parking lot for tangents',
    'Equal participation',
    'Summarize key points',
    'Capture action items',
    'Assign owners and dates',
    'Follow up promptly',
  ];

  const commonProblems = [
    'No agenda',
    'Starting late',
    'Tangent discussions',
    'Dominating voices',
    'No decisions made',
    'Missing action items',
    'No follow-up',
    'Wrong attendees',
  ];

  const timeboxRules = [
    'Decision: 30-60 min',
    'Status: 15-30 min',
    'Brainstorm: 60-90 min',
    'Planning: 60-120 min',
    'Retrospective: 60-90 min',
    '1:1: 30-60 min',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Meeting Facilitation Guide</h1>
      <p className="text-zinc-600">Meeting types, facilitation tips, and timeboxing rules.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Meeting Types</h3>
        <div className="space-y-1 text-xs">
          {meetingTypes.map((m) => (
            <div key={m.type} className="bg-white rounded p-2">
              <strong>{m.type}</strong>
              <div className="text-zinc-500 mt-1">{m.purpose}</div>
              <div className="text-green-600 mt-1">Prep: {m.prep}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Facilitation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {facilitationTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Problems</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {commonProblems.map((p) => (
            <div key={p} className="bg-white rounded p-2 text-red-600">✗ {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Timeboxing Rules</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {timeboxRules.map((r) => (
            <div key={r} className="bg-white rounded p-2">{r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Facilitation Checklist</h3>
        <div className="text-xs text-zinc-600">
          Before: 1. Define meeting purpose. 2. Create agenda with times. 3. Invite right people. 4. Share prep materials. During: 5. Start on time. 6. Review agenda. 7. Keep to timebox. 8. Encourage participation. 9. Use parking lot. 10. Summarize decisions. After: 11. Send notes within 24h. 12. List action items with owners. 13. Schedule follow-ups. 14. Cancel unnecessary recurring. Facilitation = meeting effectiveness. Poor facilitation = wasted time. Right purpose, right people, right time."
        </div>
      </div>
    </main>
  );
}