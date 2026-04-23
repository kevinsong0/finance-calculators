'use client'

export default function WorkplaceCommunicationGuide() {
  const channels = [
    { channel: 'Email', use: 'Formal communication', best: 'Documentation needed' },
    { channel: 'Chat tools', use: 'Quick questions', best: 'Immediate response' },
    { channel: 'Meetings', use: 'Discussion depth', best: 'Complex topics' },
    { channel: 'Video calls', use: 'Remote connection', best: 'Personal touch' },
    { channel: 'In-person', use: 'Relationship building', best: 'Sensitive topics' },
    { channel: 'Documentation', use: 'Information sharing', best: 'Reference material' },
  ];

  const practices = [
    'Clear message crafting',
    'Appropriate channel selection',
    'Timely responses',
    'Professional tone',
    'Concise communication',
    'Active listening',
    'Feedback giving',
    'Conflict avoidance',
  ];

  const types = [
    { type: 'Upward communication', direction: 'To management', frequency: 'Regular updates' },
    { type: 'Downward communication', direction: 'From management', frequency: 'Directives, info' },
    { type: 'Horizontal communication', direction: 'Peer level', frequency: 'Collaboration' },
    { type: 'External communication', direction: 'Outside organization', frequency: 'Stakeholders' },
  ];

  const challenges = [
    { challenge: 'Information overload', solution: 'Prioritize, summarize' },
    { challenge: 'Miscommunication', solution: 'Clarity, confirmation' },
    { challenge: 'Language barriers', solution: 'Simple language, visuals' },
    { challenge: 'Remote challenges', solution: 'Regular check-ins, video' },
    { challenge: 'Silence issues', solution: 'Proactive sharing, questions' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Communication Guide</h1>
      <p className="text-zinc-600">Channels, practices, types, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Channels</h3>
        <div className="space-y-1 text-xs">
          {channels.map((c) => (
            <div key={c.channel} className="bg-white rounded p-2">
              <strong>{c.channel}</strong>
              <div className="text-zinc-500 mt-1">Use: {c.use}</div>
              <div className="text-green-600 mt-1">Best for: {c.best}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Direction: {t.direction}</div>
              <div className="text-green-600 mt-1">Frequency: {t.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Challenges & Solutions</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong className="text-red-600">{c.challenge}</strong>
              <div className="text-green-600 mt-1">→ {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate channel. 2. Craft clear messages. 3. Be timely in response. 4. Maintain professional tone. 5. Listen actively. 6. Confirm understanding. 7. Document important communication. 8. Follow up when needed. 9. Share information proactively. 10. Avoid communication overload. 11. Address miscommunication quickly. 12. Provide constructive feedback. Communication = clear, timely, appropriate. Channel selection. Clear messages. Timely response. Active listening. Documentation. Proactive sharing. Feedback skills.
        </div>
      </div>
    </main>
  );
}