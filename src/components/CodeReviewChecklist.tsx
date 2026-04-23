'use client'

export default function CodeReviewChecklist() {
  const categories = [
    {
      name: 'Code Quality',
      items: [
        'Follows coding standards and style guide',
        'Meaningful variable and function names',
        'No unnecessary complexity',
        'No duplicate code (DRY principle)',
        'Functions are small and focused',
        'No magic numbers or hardcoded values',
        'Proper use of constants and enums',
      ],
    },
    {
      name: 'Error Handling',
      items: [
        'All exceptions handled properly',
        'Error messages are clear and helpful',
        'Edge cases covered',
        'Null/undefined checks where needed',
        'Graceful degradation implemented',
        'Logging appropriate for debugging',
      ],
    },
    {
      name: 'Security',
      items: [
        'No SQL injection vulnerabilities',
        'No XSS vulnerabilities',
        'Input validation and sanitization',
        'Authentication checks present',
        'Authorization/permission checks',
        'Sensitive data encrypted',
        'No hardcoded secrets/credentials',
        'HTTPS enforced for sensitive data',
      ],
    },
    {
      name: 'Performance',
      items: [
        'No unnecessary loops or iterations',
        'Database queries optimized',
        'Memory leaks avoided',
        'Caching implemented where beneficial',
        'Large operations paginated/streamed',
        'Lazy loading considered',
      ],
    },
    {
      name: 'Testing',
      items: [
        'Unit tests cover new functionality',
        'Edge cases tested',
        'Integration tests where needed',
        'Tests are maintainable',
        'Mock data appropriate',
        'Test coverage acceptable',
      ],
    },
    {
      name: 'Documentation',
      items: [
        'Code is self-documenting',
        'Complex logic has comments',
        'Public APIs documented',
        'README updated if needed',
        'Change log updated',
        'Migration guide if breaking change',
      ],
    },
    {
      name: 'Architecture',
      items: [
        'Follows project architecture patterns',
        'Dependencies appropriate and minimal',
        'No circular dependencies',
        'Separation of concerns maintained',
        'Interfaces used appropriately',
        'Module boundaries respected',
      ],
    },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Review Checklist</h1>
      <p className="text-zinc-600">Comprehensive code review checklist for developers. Quality, security, performance, testing. Ensure high-quality code before merge.</p>

      {categories.map((cat) => (
        <div key={cat.name} className="card bg-zinc-50">
          <h3 className="font-medium mb-2">{cat.name}</h3>
          <div className="space-y-1 text-xs">
            {cat.items.map((item) => (
              <div key={item} className="bg-white rounded p-2 flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Process Tips</h3>
        <div className="text-xs text-zinc-600">
          Review in small chunks (400 lines max). Focus on logic, not style (use linter). Ask questions, don&apos;t demand. Explain why changes matter. Be respectful and constructive. Approve when ready. Use PR templates. Automate with CI checks. Balance thoroughness and speed.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Review Issues</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">Unclear variable names</div>
          <div className="bg-white rounded p-2">Missing error handling</div>
          <div className="bg-white rounded p-2">Hardcoded values</div>
          <div className="bg-white rounded p-2">Missing tests</div>
          <div className="bg-white rounded p-2">Security vulnerabilities</div>
          <div className="bg-white rounded p-2">Performance issues</div>
          <div className="bg-white rounded p-2">Over-engineering</div>
          <div className="bg-white rounded p-2">Breaking changes</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Phrases</h3>
        <div className="text-xs text-zinc-600">
          Good: &quot;Consider using...&quot; &quot;What if...&quot; &quot;Could you explain...&quot; Bad: &quot;This is wrong&quot; &quot;Change this&quot; &quot;I don&apos;t like this&quot;. Frame as suggestions, ask for clarification, explain reasoning. Positive: &quot;Good catch&quot; &quot;Nice implementation&quot; &quot;LGTM&quot;. Constructive feedback improves team.
        </div>
      </div>
    </main>
  );
}