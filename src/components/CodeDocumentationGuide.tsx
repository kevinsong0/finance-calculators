'use client'

export default function CodeDocumentationGuide() {
  const types = [
    { type: 'API documentation', audience: 'Developers', importance: 'Essential' },
    { type: 'Inline comments', audience: 'All developers', importance: 'Standard' },
    { type: 'README files', audience: 'Project users', importance: 'Required' },
    { type: 'Architecture docs', audience: 'Team', importance: 'Important' },
    { type: 'User guides', audience: 'End users', importance: 'Essential' },
    { type: 'Change logs', audience: 'All users', importance: 'Required' },
  ];

  const standards = [
    'Consistent formatting',
    'Clear language',
    'Audience appropriate',
    'Regular updates',
    'Version tracking',
    'Accessibility',
    'Search capability',
    'Code examples',
  ];

  const tools = [
    'Javadoc',
    'Swagger/OpenAPI',
    'JSDoc',
    'Sphinx',
    'Doxygen',
    'Markdown',
    'Confluence',
    'GitBook',
  ];

  const practices = [
    'Write as you code',
    'Update with changes',
    'Review documentation',
    'Use code examples',
    'Keep concise',
    'Avoid redundancy',
    'Link related docs',
    'Version appropriately',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Documentation Guide</h1>
      <p className="text-zinc-600">Types, standards, tools, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Audience: {t.audience}</div>
              <div className="text-green-600 mt-1">Importance: {t.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Standards</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {standards.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Document APIs comprehensively. 2. Add inline comments for complex code. 3. Write clear README files. 4. Document architecture decisions. 5. Create user guides for features. 6. Maintain change logs. 7. Use consistent formatting. 8. Include code examples. 9. Update documentation regularly. 10. Review docs with code reviews. 11. Keep documentation accessible. 12. Version documentation appropriately. Documentation = code companion. Multiple types. Consistent standards. Appropriate tools. Regular updates. Code examples. Audience focus. Review integration.
        </div>
      </div>
    </main>
  );
}