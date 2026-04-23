'use client'

export default function BusinessInternalCommunicationGuide() {
  const channels = [
    { channel: 'Email', purpose: 'Formal communication', best: 'Documentation' },
    { channel: 'Meetings', purpose: 'Group discussion', best: 'Complex topics' },
    { channel: 'Messaging', purpose: 'Quick updates', best: 'Immediate feedback' },
    { channel: 'Intranet', purpose: 'Information hub', best: 'Resource access' },
    { channel: 'Video calls', purpose: 'Remote interaction', best: 'Visual connection' },
    { channel: 'Notice boards', purpose: 'Announcements', best: 'Broad reach' },
  ];

  const practices = [
    'Define communication purpose',
    'Choose appropriate channel',
    'Craft clear messages',
    'Target right audience',
    'Timing communications',
    'Encourage feedback',
    'Monitor communication effectiveness',
    'Archive communications',
    'Train communication skills',
    'Review and improve processes',
  ];

  const barriers = [
    { barrier: 'Information overload', cause: 'Too much content', solution: 'Prioritization' },
    { barrier: 'Channel confusion', cause: 'Wrong medium', solution: 'Channel guidelines' },
    { barrier: 'Message ambiguity', cause: 'Unclear content', solution: 'Clarity training' },
    { barrier: 'Timing issues', cause: 'Poor scheduling', solution: 'Timing rules' },
  ];

  const metrics = [
    'Message reach rate',
    'Response time',
    'Understanding accuracy',
    'Feedback participation',
    'Channel usage',
    'Communication satisfaction',
    'Information retention',
    'Action completion rate',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Internal Communication Guide</h1>
      <p className="text-zinc-600">Channels, practices, barriers, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Channels</h3>
        <div className="space-y-1 text-xs">
          {channels.map((c) => (
            <div key={c.channel} className="bg-white rounded p-2">
              <strong>{c.channel}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {c.purpose}</div>
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
        <h3 className="font-medium mb-2">Communication Barriers</h3>
        <div className="space-y-1 text-xs">
          {barriers.map((b) => (
            <div key={b.barrier} className="bg-white rounded p-2">
              <strong>{b.barrier}</strong>
              <div className="text-zinc-500 mt-1">Cause: {b.cause}</div>
              <div className="text-green-600 mt-1">Solution: {b.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Internal Communication Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define communication purpose clearly. 2. Choose appropriate channel wisely. 3. Craft clear and concise messages. 4. Target the right audience precisely. 5. Timing communications appropriately. 6. Encourage meaningful feedback. 7. Monitor communication effectiveness regularly. 8. Archive communications properly. 9. Train communication skills consistently. 10. Review and improve processes continuously. Internal communication = organizational alignment. Purpose defined. Channel chosen. Messages crafted. Audience targeted. Timings set. Feedback encouraged. Effectiveness monitored. Communications archived. Skills trained. Processes improved.
        </div>
      </div>
    </main>
  );
}