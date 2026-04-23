'use client'

export default function APIDocumentationGuide() {
  const endpoints = [
    { method: 'GET', purpose: 'Retrieve data', example: 'GET /api/users' },
    { method: 'POST', purpose: 'Create new resource', example: 'POST /api/users' },
    { method: 'PUT', purpose: 'Update entire resource', example: 'PUT /api/users/123' },
    { method: 'PATCH', purpose: 'Partial update', example: 'PATCH /api/users/123' },
    { method: 'DELETE', purpose: 'Remove resource', example: 'DELETE /api/users/123' },
  ];

  const docSections = [
    { section: 'Overview', content: 'Purpose, authentication, base URL, versioning' },
    { section: 'Authentication', content: 'API keys, OAuth, JWT, headers required' },
    { section: 'Endpoints', content: 'Methods, paths, parameters, request/response' },
    { section: 'Errors', content: 'Status codes, error formats, handling guide' },
    { section: 'Rate Limits', content: 'Limits, headers, retry strategies' },
    { section: 'Examples', content: 'Code samples in multiple languages' },
  ];

  const bestPractices = [
    { practice: 'Consistent naming', desc: 'Use clear, consistent endpoint naming' },
    { practice: 'Versioning', desc: 'Include version in URL or header (/v1/)' },
    { practice: 'Pagination', desc: 'Large datasets need pagination support' },
    { practice: 'Error format', desc: 'Consistent error response structure' },
    { practice: 'Examples', desc: 'Include working code samples' },
    { practice: 'Changelog', desc: 'Document changes, deprecations' },
  ];

  const tools = [
    { name: 'Swagger/OpenAPI', desc: 'Interactive API documentation' },
    { name: 'Postman', desc: 'API testing and documentation' },
    { name: 'Redoc', desc: 'OpenAPI documentation renderer' },
    { name: 'Stoplight', desc: 'API design and documentation' },
    { name: 'ReadMe', desc: 'Developer documentation platform' },
    { name: 'Notion', desc: 'Simple documentation alternative' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Documentation Guide</h1>
      <p className="text-zinc-600">Structure, endpoints, best practices, and tools for API docs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">RESTful Methods</h3>
        <div className="space-y-1 text-xs">
          {endpoints.map((e) => (
            <div key={e.method} className="bg-white rounded p-2">
              <strong className="text-green-600">{e.method}</strong>: {e.purpose}
              <div className="font-mono text-zinc-500 mt-1">{e.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Sections</h3>
        <div className="space-y-1 text-xs">
          {docSections.map((d) => (
            <div key={d.section} className="bg-white rounded p-2">
              <strong>{d.section}</strong>
              <div className="text-zinc-600 mt-1">{d.content}</div>
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
        <h3 className="font-medium mb-2">Documentation Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">API Doc Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Introduction (what API does). 2. Authentication (how to access). 3. All endpoints (methods, params). 4. Request examples (JSON, curl). 5. Response examples (success, error). 6. Error codes (list, meanings). 7. Rate limits (limits, headers). 8. Versioning (how versions work). 9. Code samples (Python, JS, curl). 10. Changelog (updates, deprecations). Good docs = developers can use API without support tickets.
        </div>
      </div>
    </main>
  );
}