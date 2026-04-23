'use client'

export default function ErrorHandlingPatterns() {
  const patterns = [
    { name: 'Try-Catch', desc: 'Wrap risky operations, handle exceptions locally', example: 'try { op() } catch(e) { handle(e) }' },
    { name: 'Error Boundary', desc: 'React component catches render errors', example: '<ErrorBoundary fallback={<Error />}><App /></ErrorBoundary>' },
    { name: 'Global Handler', desc: 'Catch unhandled errors at app level', example: 'window.onerror, process.on("uncaughtException")' },
    { name: 'Promise.catch', desc: 'Handle async errors in promises', example: 'fetch(url).catch(err => log(err))' },
    { name: 'Async/Await Try', desc: 'Try-catch with async functions', example: 'try { await op() } catch(e) {}' },
    { name: 'Validation First', desc: 'Check inputs before operations', example: 'if (!valid(input)) return error' },
  ];

  const errorTypes = [
    { type: 'Syntax Error', cause: 'Code parsing fails', fix: 'Check syntax, lint code' },
    { type: 'Runtime Error', cause: 'Execution fails (null, undefined)', fix: 'Null checks, type guards' },
    { type: 'Network Error', cause: 'API fails, timeout', fix: 'Retry logic, fallback data' },
    { type: 'Logic Error', cause: 'Wrong algorithm/logic', fix: 'Unit tests, code review' },
    { type: 'Type Error', cause: 'Wrong type operation', fix: 'TypeScript, validation' },
    { type: 'Resource Error', cause: 'OOM, stack overflow', fix: 'Optimize memory, limit recursion' },
  ];

  const bestPractices = [
    { practice: 'Specific errors', desc: 'Create custom error types for clarity' },
    { practice: 'Error context', desc: 'Include relevant data in error object' },
    { practice: 'Graceful degradation', desc: 'Show fallback UI, partial functionality' },
    { practice: 'User messaging', desc: 'Clear error messages, action suggestions' },
    { practice: 'Logging', desc: 'Log errors with stack trace, context' },
    { practice: 'Monitoring', desc: 'Track error rates, alert on spikes' },
    { practice: 'Retry logic', desc: 'Retry transient failures with backoff' },
    { practice: 'Cleanup', desc: 'Release resources in error handlers' },
  ];

  const tools = [
    { name: 'Sentry', desc: 'Error tracking, performance monitoring' },
    { name: 'LogRocket', desc: 'Session replay, error logs' },
    { name: 'Bugsnag', desc: 'Error monitoring, release tracking' },
    { name: 'Rollbar', desc: 'Real-time error tracking' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Error Handling Patterns</h1>
      <p className="text-zinc-600">Common patterns, error types, best practices, and monitoring tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Handling Patterns</h3>
        <div className="space-y-1 text-xs">
          {patterns.map((p) => (
            <div key={p.name} className="bg-white rounded p-2">
              <strong>{p.name}</strong>: {p.desc}
              <div className="font-mono text-zinc-500 mt-1">{p.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Error Types & Fixes</h3>
        <div className="space-y-1 text-xs">
          {errorTypes.map((e) => (
            <div key={e.type} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{e.type}</strong>: {e.cause}
              <div className="text-green-600 mt-1">Fix: {e.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((b) => (
            <div key={b.practice} className="bg-white rounded p-2">
              <strong>{b.practice}</strong>
              <div className="text-zinc-500 mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Error Monitoring Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Error Handling Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify error sources. 2. Choose appropriate pattern. 3. Add context to errors. 4. Log with stack trace. 5. Show user-friendly message. 6. Provide recovery action. 7. Monitor error rates. 8. Set up alerts. 9. Review logs regularly. 10. Fix root causes. Good error handling = resilient app + happy users.
        </div>
      </div>
    </main>
  );
}