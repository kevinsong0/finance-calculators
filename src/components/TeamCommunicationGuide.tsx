'use client'

export default function TeamCommunicationGuide() {
  const channels = [
    { channel: 'Email', best: 'Formal, documentation', avoid: 'Urgent, complex discussion' },
    { channel: 'Slack/Chat', best: 'Quick updates, questions', avoid: 'Sensitive, long threads' },
    { channel: 'Video Call', best: 'Complex topics, relationship', avoid: 'Simple updates' },
    { channel: 'In-Person', best: 'Sensitive, confidential', avoid: 'Large group updates' },
    { channel: 'Meeting', best: 'Decisions, brainstorming', avoid: 'Single-topic updates' },
    { channel: 'Document', best: 'Reference, long content', avoid: 'Time-sensitive info' },
  ];

  const bestPractices = [
    'Clear subject lines',
    'Concise messages',
    'Right channel choice',
    'Timely responses',
    'Active listening',
    'Feedback openness',
    'Documentation habit',
    'Regular check-ins',
  ];

  const mistakes = [
    'Wrong channel choice',
    'Overlong messages',
    'No response delays',
    'Ambiguous language',
    'Missing context',
    'Ignoring messages',
    'Too many meetings',
    'No documentation',
  ];

  const meetingTips = [
    'Clear agenda shared',
    'Right people invited',
    'Time limit respected',
    'Action items captured',
    'Follow-up scheduled',
    'Decision documented',
    'Preparation required',
    'Participation encouraged',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Team Communication Guide</h1>
      <p className="text-zinc-600">Communication channels, best practices, and meeting tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Channels</h3>
        <div className="space-y-1 text-xs">
          {channels.map((c) => (
            <div key={c.channel} className="bg-white rounded p-2">
              <strong>{c.channel}</strong>
              <div className="text-green-600 mt-1">Best: {c.best}</div>
              <div className="text-red-600 mt-1">Avoid: {c.avoid}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
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
        <h3 className="font-medium mb-2">Communication Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose right channel for message type. 2. Be clear and concise. 3. Include necessary context. 4. Set clear subject/topic. 5. Respond promptly. 6. Document decisions. 7. Share meeting agendas. 8. Capture action items. 9. Follow up on commitments. 10. Give regular updates. Communication = team effectiveness foundation. Poor communication = misunderstandings, delays, frustration. Right channel, clear message, timely response."
        </div>
      </div>
    </main>
  );
}