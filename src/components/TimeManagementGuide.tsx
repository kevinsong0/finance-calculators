'use client'

export default function TimeManagementGuide() {
  const methods = [
    { method: 'Pomodoro', desc: '25 min work + 5 min break cycles', benefit: 'Focus, prevents burnout' },
    { method: 'Time Blocking', desc: 'Schedule specific tasks in time slots', benefit: 'Structure, prevents multitasking' },
    { method: 'Eisenhower Matrix', desc: 'Prioritize by urgency/importance', benefit: 'Focus on right tasks' },
    { method: ' batching', desc: 'Group similar tasks together', benefit: 'Efficiency, less context switching' },
    { method: 'Parkinson\'s Law', desc: 'Limit time for task completion', benefit: 'Prevents perfectionism' },
    { method: 'Deep Work', desc: 'Dedicated focus time without distractions', benefit: 'High-quality output' },
  ];

  const priorities = [
    { quadrant: 'Do First', desc: 'Urgent + Important', examples: 'Deadlines, crises, meetings' },
    { quadrant: 'Schedule', desc: 'Important + Not Urgent', examples: 'Planning, learning, health' },
    { quadrant: 'Delegate', desc: 'Urgent + Not Important', examples: 'Some emails, interruptions' },
    { quadrant: 'Eliminate', desc: 'Not Urgent + Not Important', examples: 'Social media, busywork' },
  ];

  const tips = [
    'Start day with planning (5-10 min)',
    'Identify top 3 tasks for day',
    'Block time for deep work',
    'Batch similar tasks',
    'Take regular breaks',
    'Limit meetings',
    'Set boundaries (work hours)',
    'Review weekly progress',
  ];

  const commonIssues = [
    { issue: 'Procrastination', fix: 'Break into smaller tasks, start with easiest' },
    { issue: 'Multitasking', fix: 'Focus on one task, use time blocks' },
    { issue: 'Overcommitting', fix: 'Learn to say no, estimate realistic time' },
    { issue: 'Perfectionism', fix: 'Set time limits, accept good enough' },
    { issue: 'Distractions', fix: 'Remove notifications, create focus environment' },
    { issue: 'No planning', fix: 'Daily planning routine, weekly review' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Time Management Guide</h1>
      <p className="text-zinc-600">Methods, prioritization, tips, and solutions to common issues.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Time Management Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Eisenhower Matrix</h3>
        <div className="space-y-1 text-xs">
          {priorities.map((p) => (
            <div key={p.quadrant} className="bg-white rounded p-2">
              <strong>{p.quadrant}</strong>: {p.desc}
              <div className="text-zinc-600 mt-1">{p.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Daily Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Issues & Fixes</h3>
        <div className="space-y-1 text-xs">
          {commonIssues.map((c) => (
            <div key={c.issue} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{c.issue}</strong>
              <div className="text-green-600 mt-1">Fix: {c.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Time Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Plan tomorrow tonight. 2. Identify 3 key tasks. 3. Block focus time. 4. Eliminate distractions. 5. Take breaks. 6. Batch similar tasks. 7. Track time spent. 8. Review weekly. 9. Adjust methods. 10. Maintain balance. Time management = intention + structure + discipline.
        </div>
      </div>
    </main>
  );
}