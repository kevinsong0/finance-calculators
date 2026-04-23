'use client'

export default function EmployeePerformanceReviewGuide() {
  const methods = [
    { method: 'Annual review', frequency: 'Yearly', pros: 'Comprehensive overview' },
    { method: 'Quarterly review', frequency: 'Quarterly', pros: 'Regular feedback' },
    { method: '360-degree', frequency: 'Annual/semi', pros: 'Multiple perspectives' },
    { method: 'Continuous feedback', frequency: 'Ongoing', pros: 'Real-time input' },
    { method: 'MBO', frequency: 'Goal-based', pros: 'Results focus' },
  ];

  const criteria = [
    'Goal achievement',
    'Job knowledge',
    'Quality of work',
    'Productivity',
    'Communication',
    'Teamwork',
    'Initiative',
    'Leadership potential',
    'Professional development',
    'Attendance',
  ];

  const process = [
    'Set expectations',
    'Document performance',
    'Prepare review',
    'Schedule meeting',
    'Discuss performance',
    'Review goals',
    'Set new goals',
    'Development planning',
    'Complete documentation',
    'Follow-up actions',
  ];

  const bestPractices = [
    'Regular documentation',
    'Objective criteria',
    'Two-way dialogue',
    'Future focus',
    'Specific examples',
    'Actionable feedback',
    'Goal alignment',
    'Development support',
    'Timely completion',
    'Manager preparation',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Performance Review Guide</h1>
      <p className="text-zinc-600">Methods, criteria, process, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Frequency: {m.frequency}</div>
              <div className="text-green-600 mt-1">Pros: {m.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Evaluation Criteria</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {criteria.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Review Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear expectations upfront. 2. Document performance throughout year. 3. Use objective criteria. 4. Prepare thoroughly before review. 5. Schedule adequate time. 6. Make it two-way dialogue. 7. Provide specific examples. 8. Give actionable feedback. 9. Discuss goals progress. 10. Set new goals clearly. 11. Plan development activities. 12. Document review outcomes. 13. Follow up on commitments. 14. Provide ongoing feedback. Performance = ongoing process. Clear expectations. Regular documentation. Objective criteria. Two-way dialogue. Specific feedback. Goal focus. Development planning. Follow-up support.
        </div>
      </div>
    </main>
  );
}