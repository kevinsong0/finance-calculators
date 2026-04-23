'use client'

export default function WorkplaceInvestigationGuide() {
  const types = [
    { type: 'Harassment', trigger: 'Complaint received', urgency: 'High' },
    { type: 'Discrimination', trigger: 'Allegation made', urgency: 'High' },
    { type: 'Safety incident', trigger: 'Event occurred', urgency: 'Immediate' },
    { type: 'Policy violation', trigger: 'Issue reported', urgency: 'Medium' },
    { type: 'Misconduct', trigger: 'Behavior observed', urgency: 'Medium' },
    { type: 'Fraud', trigger: 'Suspicion raised', urgency: 'High' },
  ];

  const steps = [
    'Receive report',
    'Assess severity',
    'Plan investigation',
    'Assign investigator',
    'Interview complainant',
    'Interview accused',
    'Interview witnesses',
    'Gather evidence',
    'Review documentation',
    'Analyze findings',
    'Make determination',
    'Document outcome',
    'Implement action',
    'Follow up',
  ];

  const principles = [
    'Objectivity maintained',
    'Confidentiality respected',
    'Timely completion',
    'Thorough coverage',
    'Fair process',
    'Documentation complete',
    'Legal compliance',
    'Consistent standards',
  ];

  const documentation = [
    'Complaint details',
    'Investigation plan',
    'Interview notes',
    'Evidence collected',
    'Timeline of events',
    'Findings summary',
    'Determination rationale',
    'Action taken',
    'Follow-up notes',
    'Closure record',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Investigation Guide</h1>
      <p className="text-zinc-600">Types, steps, principles, and documentation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investigation Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Trigger: {t.trigger}</div>
              <div className="text-green-600 mt-1">Urgency: {t.urgency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investigation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {documentation.map((d, idx) => (
            <div key={d} className="bg-white rounded p-2">{idx + 1}. {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investigation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Receive and document complaint. 2. Assess severity and urgency. 3. Assign appropriate investigator. 4. Create investigation plan. 5. Interview all parties fairly. 6. Gather all relevant evidence. 7. Maintain confidentiality. 8. Document all steps thoroughly. 9. Analyze findings objectively. 10. Make fair determination. 11. Implement appropriate action. 12. Communicate outcome. 13. Monitor follow-up. 14. Close investigation properly. Investigation = fair process. Prompt response. Objective approach. Thorough coverage. Complete documentation. Appropriate action. Follow-up monitoring. Legal compliance.
        </div>
      </div>
    </main>
  );
}