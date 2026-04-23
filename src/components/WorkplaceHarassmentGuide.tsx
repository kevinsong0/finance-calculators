'use client'

export default function WorkplaceHarassmentGuide() {
  const types = [
    { type: 'Verbal', desc: 'Comments, jokes, insults', examples: 'Offensive language' },
    { type: 'Physical', desc: 'Unwanted contact', examples: 'Touching, blocking' },
    { type: 'Visual', desc: 'Images, gestures', examples: 'Offensive materials' },
    { type: 'Psychological', desc: 'Intimidation, threats', examples: 'Bullying behavior' },
    { type: 'Sexual', desc: 'Unwelcome sexual advances', examples: 'Quid pro quo' },
  ];

  const prevention = [
    'Clear policy statement',
    'Regular training',
    'Reporting mechanisms',
    'Prompt investigation',
    'Consistent enforcement',
    'Zero tolerance approach',
    'Support for victims',
    'Culture of respect',
  ];

  const response = [
    'Take report seriously',
    'Document complaint',
    'Investigate promptly',
    'Interview parties',
    'Gather evidence',
    'Make determination',
    'Apply appropriate action',
    'Communicate outcome',
    'Monitor situation',
    'Support affected parties',
  ];

  const legal = [
    'Title VII compliance',
    'State law requirements',
    'Documentation standards',
    'Investigation protocols',
    'Retaliation prevention',
    'Record retention',
    'Training requirements',
    'Reporting obligations',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Harassment Guide</h1>
      <p className="text-zinc-600">Types, prevention, response, and legal compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Harassment Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Examples: {t.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Prevention Measures</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {prevention.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {response.map((r, i) => (
            <div key={r} className="bg-white rounded p-2">{i + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Legal Compliance</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {legal.map((l, i) => (
            <div key={l} className="bg-white rounded p-2">{i + 1}. {l}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Harassment Prevention Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish clear policy. 2. Define prohibited behavior. 3. Create reporting channels. 4. Train all employees. 5. Train managers specifically. 6. Investigate promptly. 7. Take appropriate action. 8. Protect complainants. 9. Prevent retaliation. 10. Document thoroughly. 11. Review regularly. 12. Monitor workplace culture. Prevention = policy, training, response. Clear policy. Regular training. Reporting channels. Prompt investigation. Appropriate action. Retaliation prevention. Culture monitoring. Zero tolerance.
        </div>
      </div>
    </main>
  );
}