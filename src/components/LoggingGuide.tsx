'use client'

export default function LoggingGuide() {
  const levels = [
    { level: 'ERROR', use: 'Failures, exceptions', action: 'Immediate attention' },
    { level: 'WARN', use: 'Potential problems', action: 'Monitor closely' },
    { level: 'INFO', use: 'Important events', action: 'Normal tracking' },
    { level: 'DEBUG', use: 'Detailed diagnostics', action: 'Development only' },
    { level: 'TRACE', use: 'Very detailed', action: 'Debugging specific issues' },
  ];

  const bestPractices = [
    'Use appropriate log levels',
    'Include context and data',
    'Consistent message format',
    'Include timestamps',
    'Include request/session ID',
    'Don\'t log sensitive data',
    'Structured logging (JSON)',
    'Async logging for performance',
  ];

  const whatToLog = [
    { item: 'Errors/Exceptions', reason: 'Problem diagnosis' },
    { item: 'Business events', reason: 'Activity tracking' },
    { item: 'Performance metrics', reason: 'Optimization' },
    { item: 'Security events', reason: 'Audit and protection' },
    { item: 'Request/response', reason: 'Debugging and tracing' },
    { item: 'State changes', reason: 'Understanding flow' },
  ];

  const avoid = [
    'Logging sensitive data',
    'Excessive debug logging',
    'Unstructured messages',
    'Missing context',
    'Logging in loops',
    'Blocking operations',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Logging Best Practices Guide</h1>
      <p className="text-zinc-600">Log levels, practices, what to log, and pitfalls.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Log Levels</h3>
        <div className="space-y-1 text-xs">
          {levels.map((l) => (
            <div key={l.level} className="bg-white rounded p-2">
              <strong>{l.level}</strong>
              <div className="text-zinc-500 mt-1">Use: {l.use}</div>
              <div className="text-green-600 mt-1">Action: {l.action}</div>
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
        <h3 className="font-medium mb-2">What to Log</h3>
        <div className="space-y-1 text-xs">
          {whatToLog.map((w) => (
            <div key={w.item} className="bg-white rounded p-2">
              <strong>{w.item}</strong>
              <div className="text-green-600 mt-1">Reason: {w.reason}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pitfalls to Avoid</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {avoid.map((a) => (
            <div key={a} className="bg-white rounded p-2 text-red-600">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Logging Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate log level. 2. Include relevant context. 3. Use structured format. 4. Add timestamps. 5. Include identifiers (request, session). 6. Never log sensitive data. 7. Configure async logging. 8. Set up log aggregation. 9. Define retention policy. 10. Monitor log volume. 11. Test logging during development. 12. Review logs regularly. Logging = observability foundation. Right level, right context. Structured and searchable. Security and performance balance. Logs help debug, monitor, audit."
        </div>
      </div>
    </main>
  );
}