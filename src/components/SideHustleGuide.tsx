'use client'

export default function SideHustleGuide() {
  const ideas = [
    { idea: 'Freelancing', desc: 'Use existing professional skills', time: 'Flexible', income: 'Project-based' },
    { idea: 'Consulting', desc: 'Advise in your expertise area', time: 'Evenings/weekends', income: 'Hourly' },
    { idea: 'Content Creation', desc: 'Blog, YouTube, podcast', time: 'Ongoing', income: 'Ads/sponsorships' },
    { idea: 'E-commerce', desc: 'Sell products online', time: 'Setup + maintenance', income: 'Sales revenue' },
    { idea: 'Teaching/Tutoring', desc: 'Teach what you know', time: 'Scheduled sessions', income: 'Hourly' },
    { idea: 'App Development', desc: 'Build and sell apps', time: 'Development then passive', income: 'Sales/subscriptions' },
  ];

  const steps = [
    'Identify skills/assets',
    'Research market demand',
    'Choose idea with best ROI',
    'Start small (test)',
    'Set up basics',
    'Launch minimum version',
    'Gather feedback',
    'Iterate and improve',
  ];

  const tips = [
    'Start while employed',
    'Low upfront investment',
    'Test before scaling',
    'Automate where possible',
    'Protect main income',
    'Track all income/expenses',
    'Set clear boundaries',
    'Build toward passive',
  ];

  const challenges = [
    'Time management',
    'Burnout risk',
    'Income instability',
    'Legal considerations',
    'Tax complexity',
    'Work-life balance',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Side Hustle Guide</h1>
      <p className="text-zinc-600">Side hustle ideas, getting started, tips, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Side Hustle Ideas</h3>
        <div className="space-y-1 text-xs">
          {ideas.map((i) => (
            <div key={i.idea} className="bg-white rounded p-2">
              <strong>{i.idea}</strong>
              <div className="text-zinc-500 mt-1">{i.desc}</div>
              <div className="text-green-600 mt-1">Time: {i.time}, Income: {i.income}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Getting Started</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Side Hustle Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Challenges</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {challenges.map((c) => (
            <div key={c} className="bg-white rounded p-2 text-red-600">⚠️ {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Side Hustle Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. List your skills/interests. 2. Research income potential. 3. Check time requirements. 4. Choose low-risk idea. 5. Start with minimal investment. 6. Set clear goals. 7. Allocate specific hours. 7. Track income/expenses. 8. Test market response. 9. Iterate based on feedback. 10. Consider scaling if successful. 11. Plan transition if grows big. 12. Manage taxes properly. Side hustle = extra income + learning. Start small, scale smart.
        </div>
      </div>
    </main>
  );
}