'use client'

export default function RemoteWorkPolicyGuide() {
  const components = [
    { component: 'Eligibility', desc: 'Who can work remotely', criteria: 'Role, performance' },
    { component: 'Schedule', desc: 'When remote work allowed', criteria: 'Days, hours' },
    { component: 'Equipment', desc: 'What company provides', criteria: 'Laptop, internet' },
    { component: 'Expectations', desc: 'Remote work standards', criteria: 'Availability, output' },
    { component: 'Communication', desc: 'How to stay connected', criteria: 'Tools, frequency' },
    { component: 'Security', desc: 'Data protection requirements', criteria: 'VPN, policies' },
  ];

  const benefits = [
    { benefit: 'Flexibility', for: 'Employee', impact: 'Work-life balance' },
    { benefit: 'Cost savings', for: 'Company', impact: 'Office space reduction' },
    { benefit: 'Talent access', for: 'Company', impact: 'Broader hiring pool' },
    { benefit: 'Retention', for: 'Company', impact: 'Higher employee retention' },
    { benefit: 'Productivity', for: 'Employee', impact: 'Focus time increase' },
  ];

  const challenges = [
    { challenge: 'Communication gaps', solution: 'Regular check-ins, tools' },
    { challenge: 'Collaboration difficulty', solution: 'Scheduled collaboration time' },
    { challenge: 'Isolation', solution: 'Team events, connection efforts' },
    { challenge: 'Visibility concerns', solution: 'Output-based measurement' },
    { challenge: 'Security risks', solution: 'VPN, training, policies' },
  ];

  const bestPractices = [
    'Clear policy documentation',
    'Regular communication schedule',
    'Output-based performance',
    'Appropriate technology tools',
    'Security requirements',
    'Training for managers',
    'Connection opportunities',
    'Policy updates as needed',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Remote Work Policy Guide</h1>
      <p className="text-zinc-600">Policy components, benefits, challenges, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Criteria: {c.criteria}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-zinc-500 mt-1">For: {b.for}</div>
              <div className="text-green-600 mt-1">Impact: {b.impact}</div>
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
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Remote Work Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define clear eligibility criteria. 2. Set schedule expectations. 3. Provide necessary equipment. 4. Establish communication norms. 5. Define security requirements. 6. Set performance expectations. 7. Train managers on remote supervision. 8. Create connection opportunities. 9. Review policy regularly. 10. Address issues promptly. 11. Gather feedback from remote workers. 12. Update policy as needed. Remote work = clear expectations. Document policy. Provide support. Set communication norms. Focus on output. Address challenges. Measure effectiveness. Update continuously."
        </div>
      </div>
    </main>
  );
}