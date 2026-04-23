'use client'

export default function ErrorHandlingGuide() {
  const types = [
    { type: 'Input Errors', handling: 'Validation, user feedback', severity: 'Low' },
    { type: 'Business Errors', handling: 'Graceful degradation', severity: 'Medium' },
    { type: 'System Errors', handling: 'Fallback, retry', severity: 'High' },
    { type: 'Network Errors', handling: 'Retry, timeout handling', severity: 'Medium' },
    { type: 'Database Errors', handling: 'Transaction rollback', severity: 'High' },
    { type: 'Security Errors', handling: 'Audit, block, notify', severity: 'Critical' },
  ];

  const strategies = [
    'Fail gracefully with message',
    'Provide fallback behavior',
    'Log error with context',
    'Notify appropriate parties',
    'Retry for transient errors',
    'Validate inputs early',
    'Use error boundaries',
    'Centralize error handling',
  ];

  const response = [
    { action: 'Display message', when: 'User-facing, recoverable' },
    { action: 'Fallback value', when: 'Non-critical failure' },
    { action: 'Retry operation', when: 'Transient/network error' },
    { action: 'Redirect flow', when: 'Critical, alternative path' },
    { action: 'Stop operation', when: 'Unrecoverable, safety' },
    { action: 'Alert team', when: 'System/security critical' },
  ];

  const patterns = [
    'Try-catch blocks',
    'Error boundaries (React)',
    'Global error handler',
    'Promise rejection handling',
    'Async error propagation',
    'Error wrapping/classification',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Error Handling Best Practices</h1>
      <p className="text-zinc-600">Error types, strategies, responses, and patterns.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Error Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Handling: {t.handling}</div>
              <div className="text-red-600 mt-1">Severity: {t.severity}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Handling Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Actions</h3>
        <div className="space-y-1 text-xs">
          {response.map((r) => (
            <div key={r.action} className="bg-white rounded p-2">
              <strong>{r.action}</strong>
              <div className="text-green-600 mt-1">When: {r.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Implementation Patterns</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {patterns.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Error Handling Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify possible error sources. 2. Classify by type and severity. 3. Define handling strategy per type. 4. Implement error capture. 5. Provide user feedback. 6. Log with context for debugging. 7. Set up alerts for critical errors. 8. Test error scenarios. 9. Document error codes/messages. 10. Review handling regularly. Error handling = robust software. Expect failures, plan responses. User experience matters. Log for debugging. Security and safety critical. Test the unhappy paths."
        </div>
      </div>
    </main>
  );
}