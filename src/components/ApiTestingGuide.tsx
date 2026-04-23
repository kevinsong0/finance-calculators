'use client'

export default function ApiTestingGuide() {
  const testTypes = [
    { type: 'Unit Tests', desc: 'Individual endpoint tests', tool: 'Jest, Mocha' },
    { type: 'Integration Tests', desc: 'Multiple components together', tool: 'Postman, Newman' },
    { type: 'Load Tests', desc: 'Performance under stress', tool: 'k6, Artillery' },
    { type: 'Security Tests', desc: 'Vulnerability scanning', tool: 'OWASP ZAP, Burp' },
    { type: 'Contract Tests', desc: 'API agreement validation', tool: 'Pact, Spring Cloud Contract' },
    { type: 'Smoke Tests', desc: 'Basic functionality check', tool: 'Custom scripts' },
  ];

  const checklist = [
    'Test all endpoints',
    'Validate response schemas',
    'Check error handling',
    'Test authentication',
    'Verify authorization',
    'Test rate limiting',
    'Check pagination',
    'Test edge cases',
  ];

  const bestPractices = [
    'Isolated test environment',
    'Reset state between tests',
    'Use realistic data',
    'Automate test runs',
    'Document test cases',
    'Version test suites',
    'Mock external services',
    'Test both success and failure',
  ];

  const commonMistakes = [
    'Testing in production',
    'Ignoring edge cases',
    'No authentication tests',
    'Missing error scenarios',
    'Tests depend on each other',
    'Hard-coded test data',
    'No cleanup after tests',
    'Skipping security tests',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Testing Guide</h1>
      <p className="text-zinc-600">Test types, tools, checklist, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Test Types</h3>
        <div className="space-y-1 text-xs">
          {testTypes.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Tools: {t.tool}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">✓ {c}</div>
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
          {commonMistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">API Testing Workflow</h3>
        <div className="text-xs text-zinc-600">
          1. Document API endpoints. 2. Create test environment. 3. Write unit tests per endpoint. 4. Test success responses. 5. Test error responses. 6. Validate schemas. 7. Test authentication flows. 8. Test authorization boundaries. 9. Run integration tests. 10. Perform load testing. 11. Security scan. 12. Automate in CI/CD. API testing = quality assurance. Untested API = unknown behavior. Test all paths, automate runs, monitor in production."
        </div>
      </div>
    </main>
  );
}