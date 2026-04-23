'use client'

export default function EmployeeSuccessionPlanningGuide() {
  const purposes = [
    { purpose: 'Leadership continuity', importance: 'Critical', approach: 'Identify successors' },
    { purpose: 'Knowledge preservation', importance: 'Important', approach: 'Transfer planning' },
    { purpose: 'Risk mitigation', importance: 'High', approach: 'Prepare backups' },
    { purpose: 'Development planning', importance: 'Essential', approach: 'Career paths' },
    { purpose: 'Organizational stability', importance: 'Vital', approach: 'Smooth transitions' },
  ];

  const positions = [
    'Executive leadership',
    'Senior management',
    'Key technical roles',
    'Critical operations',
    'Revenue-driving roles',
    'Specialized positions',
    'Customer-facing roles',
    'Strategic positions',
  ];

  const process = [
    'Identify critical positions',
    'Define position requirements',
    'Assess current talent',
    'Identify potential successors',
    'Evaluate succession readiness',
    'Develop succession candidates',
    'Create development plans',
    'Implement development',
    'Monitor progress',
    'Review and adjust',
  ];

  const criteria = [
    { criteria: 'Performance', assessment: 'Results track record' },
    { criteria: 'Potential', assessment: 'Growth capability' },
    { criteria: 'Skills', assessment: 'Required competencies' },
    { criteria: 'Experience', assessment: 'Relevant background' },
    { criteria: 'Leadership', assessment: 'Leadership capability' },
    { criteria: 'Fit', assessment: 'Position alignment' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Succession Planning Guide</h1>
      <p className="text-zinc-600">Purposes, positions, process, and criteria.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Purposes</h3>
        <div className="space-y-1 text-xs">
          {purposes.map((p) => (
            <div key={p.purpose} className="bg-white rounded p-2">
              <strong>{p.purpose}</strong>
              <div className="text-zinc-500 mt-1">Importance: {p.importance}</div>
              <div className="text-green-600 mt-1">Approach: {p.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Critical Positions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {positions.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Successor Criteria</h3>
        <div className="space-y-1 text-xs">
          {criteria.map((c) => (
            <div key={c.criteria} className="bg-white rounded p-2">
              <strong>{c.criteria}</strong>
              <div className="text-green-600 mt-1">Assessment: {c.assessment}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Succession Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify critical positions. 2. Define position requirements clearly. 3. Assess current talent pool. 4. Identify potential successors. 5. Evaluate succession readiness. 6. Create development plans. 7. Implement development activities. 8. Monitor progress regularly. 9. Review plans periodically. 10. Adjust as needs change. 11. Document succession plans. 12. Communicate appropriately. 13. Test succession readiness. 14. Update with changes. Succession planning = organizational continuity. Critical positions identified. Requirements defined. Talent assessed. Successors identified. Development planned. Progress monitored. Regular review. Documentation maintained.
        </div>
      </div>
    </main>
  );
}