'use client'

export default function BusinessPerformanceReviewGuide() {
  const types = [
    { type: 'Annual review', frequency: 'Once yearly', purpose: 'Comprehensive assessment' },
    { type: 'Quarterly review', frequency: 'Four times yearly', purpose: 'Regular feedback' },
    { type: 'Monthly check-in', frequency: 'Monthly', purpose: 'Ongoing dialogue' },
    { type: 'Project-based review', frequency: 'Project completion', purpose: 'Outcome evaluation' },
  ];

  const process = [
    'Set review objectives',
    'Prepare review materials',
    'Gather performance data',
    'Collect stakeholder input',
    'Complete self-assessment',
    'Conduct review meeting',
    'Discuss performance results',
    'Set development goals',
    'Create action plans',
    'Follow up on progress',
  ];

  const methods = [
    { method: 'Rating scales', approach: 'Numerical evaluation', benefit: 'Quantifiable' },
    { method: 'Behavioral anchors', approach: 'Specific behaviors', benefit: 'Objective' },
    { method: 'Narrative review', approach: 'Written feedback', benefit: 'Contextual' },
    { method: '360-degree feedback', approach: 'Multi-source input', benefit: 'Comprehensive' },
  ];

  const outcomes = [
    'Performance ratings documented',
    'Development needs identified',
    'Goals and objectives set',
    'Compensation decisions informed',
    'Career path clarified',
    'Training plans created',
    'Strengths recognized',
    'Improvement areas addressed',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Performance Review Guide</h1>
      <p className="text-zinc-600">Types, process, methods, and outcomes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Frequency: {t.frequency}</div>
              <div className="text-green-600 mt-1">Purpose: {t.purpose}</div>
            </div>
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
        <h3 className="font-medium mb-2">Evaluation Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Approach: {m.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Outcomes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {outcomes.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Review Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear review objectives. 2. Prepare thorough review materials. 3. Gather accurate performance data. 4. Collect comprehensive stakeholder input. 5. Complete honest self-assessment. 6. Conduct productive review meeting. 7. Discuss performance results openly. 8. Set meaningful development goals. 9. Create actionable action plans. 10. Follow up on progress consistently. Performance review = continuous improvement. Objectives set. Materials prepared. Data gathered. Input collected. Assessment completed. Meeting conducted. Results discussed. Goals set. Plans created. Progress tracked.
        </div>
      </div>
    </main>
  );
}