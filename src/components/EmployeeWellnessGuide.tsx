'use client'

export default function EmployeeWellnessGuide() {
  const areas = [
    { area: 'Physical Health', desc: 'Body wellness', programs: 'Fitness, health screening' },
    { area: 'Mental Health', desc: 'Psychological wellness', programs: 'Counseling, stress management' },
    { area: 'Financial Health', desc: 'Financial wellness', programs: 'Planning, education' },
    { area: 'Social Health', desc: 'Relationships, connection', programs: 'Team events, community' },
    { area: 'Work Environment', desc: 'Safe, supportive workplace', programs: 'Ergonomics, safety' },
  ];

  const programs = [
    'Health insurance benefits',
    'Mental health support',
    'Fitness facilities/subsidies',
    'Wellness challenges',
    'Health screenings',
    'Stress management training',
    'Financial wellness education',
    'Flexible work arrangements',
  ];

  const benefits = [
    { benefit: 'Reduced absenteeism', impact: 'Better attendance' },
    { benefit: 'Higher productivity', impact: 'Better performance' },
    { benefit: 'Employee retention', impact: 'Lower turnover' },
    { benefit: 'Engagement increase', impact: 'More committed staff' },
    { benefit: 'Healthcare cost reduction', impact: 'Lower insurance costs' },
    { benefit: 'Culture improvement', impact: 'Positive workplace' },
  ];

  const implementation = [
    'Assess employee needs',
    'Define wellness goals',
    'Choose program components',
    'Allocate budget',
    'Communicate programs',
    'Measure participation',
    'Track outcomes',
    'Adjust and improve',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Wellness Guide</h1>
      <p className="text-zinc-600">Wellness areas, programs, benefits, and implementation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Wellness Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">{a.desc}</div>
              <div className="text-green-600 mt-1">Programs: {a.programs}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Programs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {programs.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits of Wellness</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-green-600 mt-1">Impact: {b.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Implementation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {implementation.map((i, num) => (
            <div key={i} className="bg-white rounded p-2">{num + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Wellness Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess current employee wellness needs. 2. Define program goals and objectives. 3. Choose appropriate wellness components. 4. Allocate sufficient budget. 5. Communicate programs clearly. 6. Make participation easy. 7. Track participation rates. 8. Measure outcomes and impact. 9. Adjust programs based on feedback. 10. Integrate with overall HR strategy. 11. Review annually. 12. Benchmark against industry. Wellness = holistic employee health. Multiple areas addressed. Programs match needs. Measure outcomes. Adjust continuously. Culture of wellness. Investment in people."
        </div>
      </div>
    </main>
  );
}