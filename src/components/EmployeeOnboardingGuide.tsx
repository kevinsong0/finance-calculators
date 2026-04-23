'use client'

export default function EmployeeOnboardingGuide() {
  const phases = [
    { phase: 'Pre-boarding', desc: 'Before start date', action: 'Paperwork, equipment, welcome email' },
    { phase: 'Day 1', desc: 'First day orientation', action: 'HR basics, team intro, workspace setup' },
    { phase: 'Week 1', desc: 'Initial integration', action: 'Role training, key meetings, processes' },
    { phase: 'Month 1', desc: 'Deepening knowledge', action: 'Projects, feedback, relationship building' },
    { phase: 'Quarter 1', desc: 'Full integration', action: 'Performance goals, independence, review' },
    { phase: 'Ongoing', desc: 'Continuous support', action: 'Development, check-ins, growth path' },
  ];

  const checklist = [
    'Welcome email sent',
    'Paperwork completed',
    'Equipment ordered',
    'Workspace prepared',
    'Team notified',
    'Schedule created',
    'Mentor assigned',
    'First week plan',
    'Training scheduled',
    'Goals documented',
  ];

  const bestPractices = [
    'Start before day 1',
    'Clear expectations',
    'Assign a buddy/mentor',
    'Structured schedule',
    'Regular check-ins',
    'Early feedback',
    'Cultural introduction',
    'Documentation provided',
  ];

  const commonMistakes = [
    'No pre-boarding',
    'Paperwork delays',
    'Unprepared workspace',
    'No clear schedule',
    'Left alone too much',
    'No mentor assigned',
    'Overloading week 1',
    'No follow-up',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Onboarding Guide</h1>
      <p className="text-zinc-600">Onboarding phases, checklist, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Onboarding Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Onboarding Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">✓ {c}</div>
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
          {commonMistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Onboarding Success Metrics</h3>
        <div className="text-xs text-zinc-600">
          90-day retention rate (target: 95%+). Time to productivity (target: 30-60 days). Employee satisfaction at 90 days (target: 4/5+). Manager satisfaction with onboarding (target: 4/5+). Training completion rate (target: 100%). Paperwork completion speed (target: day 1). First week feedback score. Onboarding = retention foundation. Poor onboarding = early turnover. First 90 days predicts long-term. Invest in structured process."
        </div>
      </div>
    </main>
  );
}