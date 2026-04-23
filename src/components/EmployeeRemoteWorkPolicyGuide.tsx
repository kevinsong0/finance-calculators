'use client'

export default function EmployeeRemoteWorkPolicyGuide() {
  const elements = [
    { element: 'Eligibility criteria', scope: 'Role requirements', guideline: 'Performance standards' },
    { element: 'Equipment provisions', scope: 'Hardware, software', guideline: 'Company support' },
    { element: 'Communication expectations', scope: 'Availability, responsiveness', guideline: 'Response times' },
    { element: 'Work hours', scope: 'Schedule flexibility', guideline: 'Core hours policy' },
    { element: 'Security requirements', scope: 'Data protection', guideline: 'VPN, encryption' },
    { element: 'Performance tracking', scope: 'Output measurement', guideline: 'Regular reviews' },
  ];

  const benefits = [
    { benefit: 'Increased flexibility', impact: 'Employee satisfaction', measurement: 'Engagement surveys' },
    { benefit: 'Cost savings', impact: 'Office overhead', measurement: 'Expense reduction' },
    { benefit: 'Talent attraction', impact: 'Hiring reach', measurement: 'Applicant pool' },
    { benefit: 'Productivity gains', impact: 'Focus time', measurement: 'Output metrics' },
    { benefit: 'Reduced commute', impact: 'Time, stress', measurement: 'Wellness scores' },
    { benefit: 'Geographic reach', impact: 'Location flexibility', measurement: 'Hiring geography' },
  ];

  const challenges = [
    'Communication gaps',
    'Collaboration difficulties',
    'Isolation concerns',
    'Management visibility',
    'Technology issues',
    'Security risks',
    'Time zone differences',
    'Culture maintenance',
  ];

  const bestPractices = [
    'Clear policy documentation',
    'Regular check-ins',
    'Technology support',
    'Flexible scheduling',
    'Outcome-based evaluation',
    'Team bonding activities',
    'Training for managers',
    'Continuous improvement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Remote Work Policy Guide</h1>
      <p className="text-zinc-600">Elements, benefits, challenges, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">Scope: {e.scope}</div>
              <div className="text-green-600 mt-1">Guideline: {e.guideline}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Work Benefits</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-zinc-500 mt-1">Impact: {b.impact}</div>
              <div className="text-green-600 mt-1">Measurement: {b.measurement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {challenges.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Work Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Document clear policy requirements. 2. Define eligibility criteria. 3. Specify equipment provisions. 4. Set communication expectations. 5. Establish work hour guidelines. 6. Address security requirements. 7. Create performance tracking. 8. Support technology needs. 9. Maintain team connections. 10. Review policy regularly. Remote work = structured flexibility. Policy documented. Eligibility defined. Equipment specified. Communication set. Hours established. Security addressed. Performance tracked. Technology supported. Connections maintained. Policy reviewed.
        </div>
      </div>
    </main>
  );
}