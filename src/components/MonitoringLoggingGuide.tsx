'use client'

export default function MonitoringLoggingGuide() {
  const monitoringTypes = [
    { type: 'Infrastructure', desc: 'Servers, CPU, memory, disk', tools: 'Prometheus, Datadog' },
    { type: 'Application', desc: 'Response time, errors, throughput', tools: 'APM tools' },
    { type: 'Log Monitoring', desc: 'Application logs analysis', tools: 'ELK, Splunk' },
    { type: 'User Experience', desc: 'Client-side metrics', tools: 'Analytics, RUM' },
    { type: 'Business Metrics', desc: 'KPIs, conversions', tools: 'Custom dashboards' },
  ];

  const loggingLevels = [
    { level: 'ERROR', desc: 'Errors requiring attention', use: 'Production issues' },
    { level: 'WARN', desc: 'Potential issues', use: 'Watch for problems' },
    { level: 'INFO', desc: 'General information', use: 'Key events' },
    { level: 'DEBUG', desc: 'Detailed debugging', use: 'Development' },
    { level: 'TRACE', desc: 'Very detailed', use: 'Deep debugging' },
  ];

  const bestPractices = [
    'Structured logging (JSON)',
    'Include context (request ID)',
    'Log meaningful events',
    'Avoid logging sensitive data',
    'Use appropriate levels',
    'Centralize logs',
    'Set retention policies',
    'Monitor log volume',
  ];

  const alertPrinciples = [
    'Alert on actionable issues',
    'Avoid alert fatigue',
    'Set meaningful thresholds',
    'Include runbooks',
    'Route alerts properly',
    'Track alert history',
    'Review and tune regularly',
    'Escalation procedures',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Monitoring & Logging Guide</h1>
      <p className="text-zinc-600">Monitoring types, logging levels, best practices, and alerts.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Types</h3>
        <div className="space-y-1 text-xs">
          {monitoringTypes.map((m) => (
            <div key={m.type} className="bg-white rounded p-2">
              <strong>{m.type}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Tools: {m.tools}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Logging Levels</h3>
        <div className="space-y-1 text-xs">
          {loggingLevels.map((l) => (
            <div key={l.level} className="bg-white rounded p-2">
              <strong>{l.level}</strong>
              <div className="text-zinc-500 mt-1">{l.desc}</div>
              <div className="text-green-600 mt-1">Use: {l.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Logging Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Alert Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {alertPrinciples.map((a) => (
            <div key={a} className="bg-white rounded p-2">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define key metrics. 2. Set up infrastructure monitoring. 3. Implement application monitoring. 4. Configure log aggregation. 5. Establish logging standards. 6. Create dashboards. 7. Define alert thresholds. 8. Write runbooks. 9. Test alert routing. 10. Review regularly. Monitoring = visibility into systems. Log what matters. Alert on actionable issues. No alert fatigue."
        </div>
      </div>
    </main>
  );
}