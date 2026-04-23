'use client'

export default function KnowledgeManagementGuide() {
  const types = [
    { type: 'Explicit Knowledge', desc: 'Documented, codified', storage: 'Systems, databases' },
    { type: 'Tacit Knowledge', desc: 'Personal experience', storage: 'People, training' },
    { type: 'Embedded Knowledge', desc: 'In processes, culture', storage: 'Organization' },
  ];

  const processes = [
    { process: 'Capture', desc: 'Collect knowledge', method: 'Documentation, recording' },
    { process: 'Organize', desc: 'Structure knowledge', method: 'Categorization, indexing' },
    { process: 'Store', desc: 'Preserve knowledge', method: 'Knowledge bases, systems' },
    { process: 'Share', desc: 'Distribute knowledge', method: 'Training, collaboration' },
    { process: 'Apply', desc: 'Use knowledge', method: 'Implementation, practice' },
    { process: 'Update', desc: 'Maintain knowledge', method: 'Review, refresh' },
  ];

  const tools = [
    { tool: 'Knowledge Base', use: 'Document repository' },
    { tool: 'Wiki', use: 'Collaborative documentation' },
    { tool: 'Learning Management', use: 'Training delivery' },
    { tool: 'Collaboration Tools', use: 'Knowledge sharing' },
    { tool: 'Search Systems', use: 'Knowledge retrieval' },
    { tool: 'Expert Networks', use: 'Expert identification' },
  ];

  const benefits = [
    'Faster problem solving',
    'Reduced duplication',
    'Better decisions',
    'Training efficiency',
    'Innovation support',
    'Competitive advantage',
    'Risk reduction',
    'Continuous improvement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Knowledge Management Guide</h1>
      <p className="text-zinc-600">Knowledge types, processes, tools, and benefits.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Knowledge Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Storage: {t.storage}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">KM Processes</h3>
        <div className="space-y-1 text-xs">
          {processes.map((p) => (
            <div key={p.process} className="bg-white rounded p-2">
              <strong>{p.process}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Method: {p.method}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">KM Tools</h3>
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
        <h3 className="font-medium mb-2">Benefits</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {benefits.map((b) => (
            <div key={b} className="bg-white rounded p-2">{b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Knowledge Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify critical knowledge areas. 2. Capture existing knowledge. 3. Organize for accessibility. 4. Store in appropriate systems. 5. Make searchable. 6. Train on knowledge use. 7. Encourage knowledge sharing. 8. Update regularly. 9. Review for relevance. 10. Retire obsolete knowledge. 11. Measure usage and value. 12. Build knowledge culture. Knowledge management = organizational learning. Capture what&apos;s known. Organize clearly. Make accessible. Encourage sharing. Keep current. Measure value."
        </div>
      </div>
    </main>
  );
}