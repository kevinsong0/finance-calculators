'use client'

export default function ProductivityToolsComparison() {
  const categories = [
    { category: 'Task Management', tools: 'Todoist, Notion, Things, Trello, Asana', use: 'Track tasks, organize projects' },
    { category: 'Note Taking', tools: 'Notion, Obsidian, Evernote, OneNote', use: 'Capture ideas, organize notes' },
    { category: 'Calendar', tools: 'Google Calendar, Outlook, Fantastical', use: 'Schedule, time management' },
    { category: 'Focus', tools: 'Forest, Freedom, Cold Turkey', use: 'Block distractions, stay focused' },
    { category: 'Automation', tools: 'Zapier, IFTTT, n8n', use: 'Automate repetitive tasks' },
    { category: 'Communication', tools: 'Slack, Discord, Teams, Zoom', use: 'Team communication, meetings' },
  ];

  const features = [
    { feature: 'Cross-platform', desc: 'Works on all devices', important: 'Yes' },
    { feature: 'Sync', desc: 'Real-time synchronization', important: 'Yes' },
    { feature: 'Offline', desc: 'Works without internet', important: 'Depends' },
    { feature: 'Integrations', desc: 'Connects with other apps', important: 'Yes' },
    { feature: 'Mobile app', desc: 'Native mobile experience', important: 'Yes' },
    { feature: 'Price', desc: 'Free vs paid options', important: 'Varies' },
  ];

  const comparison = [
    { aspect: 'Notion', pros: 'Flexible, all-in-one', cons: 'Learning curve, slower mobile' },
    { aspect: 'Todoist', pros: 'Simple, reliable, natural language', cons: 'Limited free tier' },
    { aspect: 'Obsidian', pros: 'Local, markdown, free', cons: 'No native sync, technical' },
    { aspect: 'Trello', pros: 'Visual Kanban, simple', cons: 'Limited for complex projects' },
  ];

  const tips = [
    'Start with one tool per category',
    'Learn features before switching',
    'Use keyboard shortcuts',
    'Integrate tools where possible',
    'Review monthly, adjust if needed',
    'Don&apos;t over-automate simple tasks',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Productivity Tools Comparison</h1>
      <p className="text-zinc-600">Tool categories, key features, comparisons, and selection tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tool Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>
              <div className="text-zinc-600 mt-1">{c.tools}</div>
              <div className="text-green-600 mt-1">Use: {c.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Features to Consider</h3>
        <div className="space-y-1 text-xs">
          {features.map((f) => (
            <div key={f.feature} className="bg-white rounded p-2">
              <strong>{f.feature}</strong>
              <div className="text-zinc-500 mt-1">{f.desc}</div>
              <div className="text-green-600 mt-1">Important: {f.important}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Popular Tool Pros/Cons</h3>
        <div className="space-y-1 text-xs">
          {comparison.map((c) => (
            <div key={c.aspect} className="bg-white rounded p-2">
              <strong>{c.aspect}</strong>
              <div className="text-green-600 mt-1">Pros: {c.pros}</div>
              <div className="text-red-600">Cons: {c.cons}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Selection Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tool Selection Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify needs (what problem to solve). 2. Research options (reviews, comparisons). 3. Try free version first. 4. Test key features (actual use). 5. Check integrations (works with existing). 6. Evaluate pricing (free vs paid). 7. Consider team needs (collaboration). 8. Commit to learning (give time). 9. Review after month. 10. Adjust if not working. Right tool = solves problem + fits workflow.
        </div>
      </div>
    </main>
  );
}