'use client'

export default function SLAManagementGuide() {
  const components = [
    { component: 'Service Description', desc: 'What service provided', importance: 'Foundation' },
    { component: 'Performance Metrics', desc: 'Measurable targets', importance: 'Core' },
    { component: 'Response Times', desc: 'Time to respond', importance: 'Critical' },
    { component: 'Availability', desc: 'Uptime percentage', importance: 'Core' },
    { component: 'Remedies', desc: 'Consequences for failure', importance: 'Enforcement' },
    { component: 'Reporting', desc: 'Performance reports', importance: 'Monitoring' },
  ];

  const metrics = [
    { metric: 'Availability', target: '99.9% uptime', measure: 'Monitoring systems' },
    { metric: 'Response Time', target: 'Under X hours', measure: 'Ticket tracking' },
    { metric: 'Resolution Time', target: 'Within X days', measure: 'Issue resolution' },
    { metric: 'Quality', target: 'Defect rate below X%', measure: 'Quality metrics' },
  ];

  const enforcement = [
    'Clear penalty structure',
    'Graduated consequences',
    'Reporting requirements',
    'Review mechanisms',
    'Termination conditions',
    'Renewal criteria',
  ];

  const monitoring = [
    'Track all metrics',
    'Regular reporting',
    'Alert for breaches',
    'Document issues',
    'Vendor communication',
    'Review meetings',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">SLA Management Guide</h1>
      <p className="text-zinc-600">SLA components, metrics, enforcement, and monitoring.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SLA Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Target: {m.target}</div>
              <div className="text-green-600 mt-1">Measure: {m.measure}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Enforcement Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {enforcement.map((e) => (
            <div key={e} className="bg-white rounded p-2">{e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {monitoring.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SLA Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define service clearly. 2. Set measurable metrics. 3. Establish realistic targets. 4. Include remedies/penalties. 5. Specify reporting frequency. 6. Define review process. 7. Set termination conditions. 8. Monitor performance continuously. 9. Document breaches promptly. 10. Communicate with vendor regularly. 11. Review SLA annually. 12. Update as needs change. SLA = performance guarantee. Clear metrics. Realistic targets. Enforceable remedies. Regular monitoring. Document everything. Review periodically."
        </div>
      </div>
    </main>
  );
}