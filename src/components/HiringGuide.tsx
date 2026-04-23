'use client'

export default function HiringGuide() {
  const steps = [
    { step: 'Define Role', desc: 'Job description, requirements', action: 'Clear expectations, skills needed' },
    { step: 'Source', desc: 'Find candidates', action: 'Post job, referrals, recruiters' },
    { step: 'Screen', desc: 'Resume review, initial call', action: 'Filter to qualified candidates' },
    { step: 'Interview', desc: 'Technical, behavioral interviews', action: 'Assess skills, culture fit' },
    { step: 'Decide', desc: 'Evaluate, compare', action: 'Gather feedback, make decision' },
    { step: 'Offer', desc: 'Compensation, terms', action: 'Competitive offer, negotiate' },
    { step: 'Onboard', desc: 'Integration to team', action: 'Training, documentation, support' },
  ];

  const interviewTypes = [
    { type: 'Screening', desc: 'Initial brief call', focus: 'Basic qualifications, motivation' },
    { type: 'Technical', desc: 'Skills assessment', focus: 'Job-specific abilities' },
    { type: 'Behavioral', desc: 'Past experiences', focus: 'Problem-solving, teamwork' },
    { type: 'Culture', desc: 'Team fit', focus: 'Values, communication style' },
    { type: 'Reference', desc: 'Past employer feedback', focus: 'Performance verification' },
  ];

  const bestPractices = [
    'Clear job descriptions',
    'Structured interviews',
    'Standardized evaluation',
    'Diverse candidate pool',
    'Timely feedback',
    'Competitive compensation',
    'Smooth onboarding',
    'Track hiring metrics',
  ];

  const mistakes = [
    'Vague job requirements',
    'Unstructured interviews',
    'Slow response time',
    'No feedback process',
    'Ignoring culture fit',
    'Lowball offers',
    'Poor onboarding',
    'Biased evaluation',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Hiring Guide</h1>
      <p className="text-zinc-600">Hiring steps, interview types, best practices, and common mistakes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Hiring Steps</h3>
        <div className="space-y-1 text-xs">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded p-2">
              <strong>{s.step}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Action: {s.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interview Types</h3>
        <div className="space-y-1 text-xs">
          {interviewTypes.map((i) => (
            <div key={i.type} className="bg-white rounded p-2">
              <strong>{i.type}</strong>
              <div className="text-zinc-500 mt-1">{i.desc}</div>
              <div className="text-green-600 mt-1">Focus: {i.focus}</div>
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
        <h3 className="font-medium mb-2">Hiring Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define role clearly (skills, responsibilities). 2. Write compelling job description. 3. Choose sourcing channels. 4. Create interview rubric. 5. Schedule structured interviews. 6. Gather structured feedback. 7. Compare candidates objectively. 8. Check references. 9. Prepare competitive offer. 10. Negotiate fairly. 11. Set onboarding plan. 12. Track hiring metrics. Hiring = finding right person for right role. Structure prevents bias. Speed matters."
        </div>
      </div>
    </main>
  );
}