'use client'

export default function EmployeeOnsiteWorkPolicyGuide() {
  const requirements = [
    { requirement: 'Attendance schedule', detail: 'Work hours, location', policy: 'Mandatory presence' },
    { requirement: 'Workplace conduct', detail: 'Behavior standards', policy: 'Professional environment' },
    { requirement: 'Safety compliance', detail: 'Health protocols', policy: 'Mandatory adherence' },
    { requirement: 'Equipment usage', detail: 'Company resources', policy: 'Proper utilization' },
    { requirement: 'Meeting participation', detail: 'Collaboration sessions', policy: 'In-person attendance' },
    { requirement: 'Visitor protocols', detail: 'Guest management', policy: 'Security procedures' },
  ];

  const benefits = [
    { benefit: 'Direct collaboration', impact: 'Team interaction', measurement: 'Project speed' },
    { benefit: 'Immediate feedback', impact: 'Real-time response', measurement: 'Decision speed' },
    { benefit: 'Culture building', impact: 'Shared experience', measurement: 'Engagement scores' },
    { benefit: 'Resource access', impact: 'Full equipment', measurement: 'Capability utilization' },
    { benefit: 'Visibility presence', impact: 'Management awareness', measurement: 'Recognition frequency' },
    { benefit: 'Social connection', impact: 'Relationship building', measurement: 'Team cohesion' },
  ];

  const considerations = [
    'Commute time impact',
    'Office capacity limits',
    'Flexibility expectations',
    'Work-life balance',
    'Cost implications',
    'Safety requirements',
    'Technology needs',
    'Employee preferences',
  ];

  const management = [
    'Clear scheduling requirements',
    'Flexible where possible',
    'Safety protocol enforcement',
    'Resource availability',
    'Performance monitoring',
    'Team coordination',
    'Communication clarity',
    'Regular feedback',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Onsite Work Policy Guide</h1>
      <p className="text-zinc-600">Requirements, benefits, considerations, and management.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Requirements</h3>
        <div className="space-y-1 text-xs">
          {requirements.map((r) => (
            <div key={r.requirement} className="bg-white rounded p-2">
              <strong>{r.requirement}</strong>
              <div className="text-zinc-500 mt-1">Detail: {r.detail}</div>
              <div className="text-green-600 mt-1">Policy: {r.policy}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Onsite Benefits</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-zinc-500 mt-1">Impact: {b.impact}</div>
              <div className="text-green-600 mt-1">Measurement: {b.measurement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Approach</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {management.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Onsite Work Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define attendance schedule clearly. 2. Set workplace conduct standards. 3. Enforce safety compliance protocols. 4. Specify equipment usage rules. 5. Establish meeting participation requirements. 6. Create visitor management procedures. 7. Address commute considerations. 8. Balance flexibility where possible. 9. Monitor performance effectively. 10. Provide regular feedback. Onsite work = structured presence. Schedule defined. Conduct set. Safety enforced. Equipment specified. Meetings established. Visitors managed. Commute addressed. Flexibility balanced. Performance monitored. Feedback provided.
        </div>
      </div>
    </main>
  );
}