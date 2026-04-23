'use client'

export default function EmployeeHandbookGuide() {
  const sections = [
    { section: 'Company overview', content: 'Mission, values, history', importance: 'Foundation' },
    { section: 'Employment policies', content: 'Hiring, classification, status', importance: 'Essential' },
    { section: 'Code of conduct', content: 'Behavior expectations', importance: 'Core' },
    { section: 'Compensation', content: 'Pay, benefits, overtime', importance: 'Required' },
    { section: 'Leave policies', content: 'PTO, sick, family leave', importance: 'Important' },
    { section: 'Safety', content: 'Workplace safety, emergencies', importance: 'Required' },
    { section: 'Discipline', content: 'Performance, termination', importance: 'Essential' },
    { section: 'Acknowledgment', content: 'Employee signature', importance: 'Documentation' },
  ];

  const policies = [
    'Equal opportunity',
    'Anti-harassment',
    'Attendance',
    'Confidentiality',
    'Technology use',
    'Social media',
    'Remote work',
    'Drug-free workplace',
  ];

  const development = [
    'Gather legal requirements',
    'Review existing policies',
    'Draft sections',
    'Legal review',
    'Management approval',
    'Employee feedback',
    'Finalize content',
    'Design and format',
    'Distribute to employees',
    'Collect acknowledgments',
    'Train on handbook',
    'Update regularly',
  ];

  const updates = [
    'Annual review schedule',
    'Regulation change monitoring',
    'Policy revision process',
    'Employee notification',
    'Acknowledgment collection',
    'Version tracking',
    'Archive maintenance',
    'Distribution method',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Handbook Guide</h1>
      <p className="text-zinc-600">Sections, policies, development, and maintenance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Sections</h3>
        <div className="space-y-1 text-xs">
          {sections.map((s) => (
            <div key={s.section} className="bg-white rounded p-2">
              <strong>{s.section}</strong>
              <div className="text-zinc-500 mt-1">Content: {s.content}</div>
              <div className="text-green-600 mt-1">Importance: {s.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Essential Policies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {policies.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Development Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {development.map((d, idx) => (
            <div key={d} className="bg-white rounded p-2">{idx + 1}. {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Maintenance Tasks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {updates.map((u, idx) => (
            <div key={u} className="bg-white rounded p-2">{idx + 1}. {u}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Handbook Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify required content. 2. Gather legal input. 3. Draft comprehensive sections. 4. Include essential policies. 5. Review with legal counsel. 6. Obtain management approval. 7. Format professionally. 8. Distribute to all employees. 9. Collect acknowledgment signatures. 10. Train on key policies. 11. Schedule annual review. 12. Update as regulations change. Handbook = comprehensive guide. Key sections. Essential policies. Legal review. Employee acknowledgment. Regular updates. Distribution tracked. Training provided.
        </div>
      </div>
    </main>
  );
}