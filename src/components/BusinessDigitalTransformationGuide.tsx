'use client'

export default function BusinessDigitalTransformationGuide() {
  const drivers = [
    { driver: 'Customer expectations', pressure: 'Digital-first', response: 'Channel integration' },
    { driver: 'Competitive pressure', pressure: 'Digital disruption', response: 'Capability building' },
    { driver: 'Technology availability', pressure: 'New capabilities', response: 'Technology adoption' },
    { driver: 'Efficiency requirements', pressure: 'Cost reduction', response: 'Process automation' },
  ];

  const stages = [
    'Digital awareness',
    'Digital exploration',
    'Digital experimentation',
    'Digital integration',
    'Digital optimization',
    'Digital transformation',
    'Digital innovation',
    'Digital leadership',
    'Digital maturity',
    'Digital excellence',
  ];

  const domains = [
    { domain: 'Customer experience', focus: 'Digital channels', investment: 'Front-end systems' },
    { domain: 'Operations', focus: 'Process automation', investment: 'Workflow systems' },
    { domain: 'Business model', focus: 'Digital revenue', investment: 'Platform systems' },
    { domain: 'Organization', focus: 'Digital culture', investment: 'People development' },
  ];

  const technologies = [
    'Cloud computing',
    'Data analytics',
    'Artificial intelligence',
    'Automation tools',
    'Mobile platforms',
    'IoT systems',
    'Blockchain',
    'API architecture',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Digital Transformation Guide</h1>
      <p className="text-zinc-600">Drivers, stages, domains, and technologies.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Transformation Drivers</h3>
        <div className="space-y-1 text-xs">
          {drivers.map((d) => (
            <div key={d.driver} className="bg-white rounded p-2">
              <strong>{d.driver}</strong>
              <div className="text-zinc-500 mt-1">Pressure: {d.pressure}</div>
              <div className="text-green-600 mt-1">Response: {d.response}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Transformation Stages</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {stages.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Transformation Domains</h3>
        <div className="space-y-1 text-xs">
          {domains.map((d) => (
            <div key={d.domain} className="bg-white rounded p-2">
              <strong>{d.domain}</strong>
              <div className="text-zinc-500 mt-1">Focus: {d.focus}</div>
              <div className="text-green-600 mt-1">Investment: {d.investment}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Technologies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {technologies.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Digital Transformation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess transformation drivers accurately. 2. Determine current stage honestly. 3. Identify priority domains strategically. 4. Select technologies appropriately. 5. Develop transformation roadmap clearly. 6. Secure necessary investment adequately. 7. Build digital capabilities systematically. 8. Implement digital solutions effectively. 9. Measure transformation progress continuously. 10. Scale transformation impact broadly. Digital transformation = future readiness. Drivers assessed. Stage determined. Domains identified. Technologies selected. Roadmap developed. Investment secured. Capabilities built. Solutions implemented. Progress measured. Impact scaled.
        </div>
      </div>
    </main>
  );
}
