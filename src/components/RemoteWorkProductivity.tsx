'use client'

export default function RemoteWorkProductivity() {
  const habits = [
    { habit: 'Morning routine', tips: 'Set consistent wake time, dress for work, review goals' },
    { habit: 'Dedicated workspace', tips: 'Separate work area, good lighting, ergonomic setup' },
    { habit: 'Time blocking', tips: 'Schedule focus blocks, meetings, breaks separately' },
    { habit: 'Regular breaks', tips: 'Pomodoro technique, stretch, walk, avoid eye strain' },
    { habit: 'End-of-day routine', tips: 'Review accomplishments, plan tomorrow, clear desk' },
  ];

  const tools = [
    { category: 'Communication', items: 'Slack, Zoom, Teams, Discord' },
    { category: 'Project Management', items: 'Notion, Trello, Jira, Asana' },
    { category: 'Time Tracking', items: 'Toggl, Clockify, RescueTime' },
    { category: 'Focus', items: 'Forest, Focusmate, Pomodoro Timer' },
    { category: 'Documentation', items: 'Google Docs, Confluence, Obsidian' },
    { category: 'Automation', items: 'Calendly, Zapier, IFTTT' },
  ];

  const challenges = [
    { challenge: 'Distractions', solutions: 'Noise-canceling headphones, focus blocks, disable notifications' },
    { challenge: 'Isolation', solutions: 'Virtual coffee chats, regular team meetings, coworking spaces' },
    { challenge: 'Overwork', solutions: 'Set boundaries, track hours, end-day ritual' },
    { challenge: 'Communication gaps', solutions: 'Over-communicate, async by default, daily standups' },
    { challenge: 'Tech issues', solutions: 'Backup internet, test equipment, have backup plans' },
  ];

  const productivityTips = [
    'Set clear daily goals (3 key tasks)',
    'Use async communication when possible',
    'Batch similar tasks together',
    'Take real breaks (not just switching tabs)',
    'Keep work and personal time separate',
    'Over-communicate progress and blockers',
    'Use video calls for complex discussions',
    'Document decisions and learnings',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Remote Work Productivity Guide</h1>
      <p className="text-zinc-600">Habits, tools, challenges, and tips for effective remote work.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Daily Habits</h3>
        <div className="space-y-1 text-xs">
          {habits.map((h) => (
            <div key={h.habit} className="bg-white rounded p-2">
              <strong>{h.habit}</strong>
              <div className="text-zinc-600 mt-1">{h.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Work Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.category} className="bg-white rounded p-2">
              <strong>{t.category}</strong>
              <div className="text-zinc-500 mt-1">{t.items}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges & Solutions</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{c.challenge}</strong>
              <div className="text-green-600 mt-1">{c.solutions}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Productivity Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {productivityTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Work Best Practices</h3>
        <div className="text-xs text-zinc-600">
          Establish routine (same start/end times). Create boundaries (work space vs living space). Over-communicate (share progress daily). Stay connected (regular team interactions). Take breaks (real breaks, not screen switching). Manage energy (not just time). Use tools wisely (avoid tool fatigue). Continuous improvement (iterate on your setup).
        </div>
      </div>
    </main>
  );
}