'use client'

export default function PerformanceAppraisalGuide() {
  const methods = [
    { method: '360-Degree', desc: 'Multi-source feedback', action: 'Peers, managers, self-review' },
    { method: 'MBO', desc: 'Management by objectives', action: 'Goal-based evaluation' },
    { method: 'Rating Scale', desc: 'Numeric scoring', action: '1-5 on competencies' },
    { method: 'Behavioral', desc: 'BARS assessment', action: 'Specific behavior anchors' },
    { method: 'Self-Assessment', desc: 'Employee reflection', action: 'Own performance review' },
    { method: 'Peer Review', desc: 'Colleague feedback', action: 'Team member input' },
  ];

  const bestPractices = [
    'Regular feedback cycles',
    'Clear performance criteria',
    'Objective measurements',
    'Development focus',
    'Fair and consistent',
    'Document properly',
    'Training for reviewers',
    'Follow-up actions',
  ];

  const commonMistakes = [
    'Once-a-year only',
    'Vague criteria',
    'Personal bias',
    'No development plan',
    'Surprise feedback',
    'Inconsistent standards',
    'Skipping documentation',
    'No follow-up',
  ];

  const feedbackTips = [
    'Be specific and timely',
    'Focus on behavior, not person',
    'Balance positive and negative',
    'Provide actionable suggestions',
    'Listen actively',
    'Follow up regularly',
    'Document key points',
    'Link to development goals',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Performance Appraisal Guide</h1>
      <p className="text-zinc-600">Evaluation methods, best practices, feedback tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Appraisal Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Action: {m.action}</div>
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
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {commonMistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {feedbackTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Appraisal Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear performance criteria upfront. 2. Train reviewers on bias avoidance. 3. Gather multi-source feedback. 4. Review objective data (metrics, deliverables). 5. Schedule formal meeting. 6. Discuss performance honestly. 7. Set development goals. 8. Document appraisal properly. 9. Create follow-up plan. 10. Review quarterly. Performance appraisal = development opportunity. Not just evaluation - growth conversation. Fair, documented, actionable."
        </div>
      </div>
    </main>
  );
}