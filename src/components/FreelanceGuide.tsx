'use client'

export default function FreelanceGuide() {
  const pros = [
    'Flexible schedule',
    'Location independence',
    'Choose your projects',
    'Higher hourly rates',
    'Direct client relationships',
    'Skill development',
    'Portfolio building',
  ];

  const cons = [
    'No guaranteed income',
    'No employer benefits',
    'Self-marketing required',
    'Client management',
    'Income variability',
    'Isolation',
    'Administrative overhead',
  ];

  const steps = [
    'Choose specialty/niche',
    'Build portfolio',
    'Set rates',
    'Find first clients',
    'Set up business basics',
    'Create contracts',
    'Manage finances',
    'Scale/expand',
  ];

  const skills = [
    { skill: 'Core Service', desc: 'What you sell', develop: 'Specialize, get good' },
    { skill: 'Marketing', desc: 'Find clients', develop: 'LinkedIn, portfolio, networking' },
    { skill: 'Communication', desc: 'Client relationships', develop: 'Clear proposals, updates' },
    { skill: 'Time Management', desc: 'Multiple projects', develop: 'Tools, discipline' },
    { skill: 'Business Admin', desc: 'Invoicing, taxes', develop: 'Accounting, legal basics' },
  ];

  const ratesTips = [
    'Calculate hourly from salary goal',
    'Include overhead (insurance, tools)',
    'Market research on comparable rates',
    'Value-based pricing possible',
    'Raise rates as skills grow',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Freelance Guide</h1>
      <p className="text-zinc-600">Freelancing pros/cons, skills, rates, and getting started.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pros & Cons</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <strong className="text-green-600">Pros</strong>
            {pros.map((p) => (<div key={p} className="text-green-600">✓ {p}</div>))}
          </div>
          <div className="bg-white rounded p-2">
            <strong className="text-red-600">Cons</strong>
            {cons.map((c) => (<div key={c} className="text-red-600">✗ {c}</div>))}
          </div>
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
        <h3 className="font-medium mb-2">Freelance Skills</h3>
        <div className="space-y-1 text-xs">
          {skills.map((s) => (
            <div key={s.skill} className="bg-white rounded p-2">
              <strong>{s.skill}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Develop: {s.develop}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Setting Rates</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {ratesTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Freelance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define your service offering. 2. Build portfolio website. 3. Calculate minimum rates. 4. Set up business entity (LLC?). 5. Open business banking. 6. Get contracts templates. 7. Set up invoicing system. 8. Track expenses for taxes. 9. Create client acquisition plan. 10. Set up time tracking. 11. Build emergency fund (3 months). 12. Network constantly. Freelancing = business + craft. Prepare before quitting full-time.
        </div>
      </div>
    </main>
  );
}