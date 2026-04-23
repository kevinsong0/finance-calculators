'use client'

export default function DocumentationGuide() {
  const types = [
    { type: 'API Documentation', audience: 'Developers', format: 'Reference format' },
    { type: 'User Guides', audience: 'End users', format: 'Step-by-step' },
    { type: 'Technical Docs', audience: 'Engineers', format: 'Specifications' },
    { type: 'Requirements', audience: 'Product team', format: 'Requirements specs' },
    { type: 'Architecture', audience: 'Technical team', format: 'Design docs' },
    { type: 'Release Notes', audience: 'All users', format: 'Change summary' },
  ];

  const bestPractices = [
    'Clear and concise language',
    'Consistent terminology',
    'Visual aids when helpful',
    'Examples and code samples',
    'Version control for docs',
    'Regular review and update',
    'Accessibility considerations',
    'Search functionality',
  ];

  const process = [
    'Plan documentation needs',
    'Identify audience',
    'Create outline',
    'Write content',
    'Review with stakeholders',
    'Test with users',
    'Publish',
    'Maintain and update',
  ];

  const tools = [
    { tool: 'Markdown', use: 'Simple formatting' },
    { tool: 'Docusaurus', use: 'Documentation sites' },
    { tool: 'Swagger/OpenAPI', use: 'API documentation' },
    { tool: 'Confluence', use: 'Team wikis' },
    { tool: 'Notion', use: 'Collaborative docs' },
    { tool: 'GitBook', use: 'Technical docs' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Documentation Best Practices Guide</h1>
      <p className="text-zinc-600">Documentation types, practices, process, and tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Audience: {t.audience}</div>
              <div className="text-green-600 mt-1">Format: {t.format}</div>
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
        <h3 className="font-medium mb-2">Documentation Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Use: {t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify documentation needs. 2. Define target audience. 3. Choose appropriate format. 4. Write clearly and concisely. 5. Include helpful examples. 6. Use consistent terminology. 7. Review with stakeholders. 8. Test with actual users. 9. Keep version controlled. 10. Update regularly. 11. Make searchable. 12. Maintain accessibility. Documentation = communication tool. Know your audience. Write clearly. Keep current. Test with users. Version control essential."
        </div>
      </div>
    </main>
  );
}