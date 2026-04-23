'use client'

export default function EmployeePerformanceImprovementGuide() {
  const steps = [
    'Identify performance gap',
    'Document specific issues',
    'Meet with employee',
    'Set improvement goals',
    'Create action plan',
    'Provide support resources',
    'Monitor progress',
    'Provide feedback',
    'Evaluate improvement',
    'Make final decision',
  ];

  const plans = [
    { element: 'Performance gaps', content: 'Specific, measurable issues', timeline: 'Document clearly' },
    { element: 'Improvement goals', content: 'Clear, achievable targets', timeline: 'Set deadlines' },
    { element: 'Action steps', content: 'Concrete activities', timeline: 'Weekly milestones' },
    { element: 'Support provided', content: 'Training, coaching', timeline: 'Resource allocation' },
    { element: 'Progress reviews', content: 'Regular check-ins', timeline: 'Scheduled meetings' },
    { element: 'Success criteria', content: 'Measurable outcomes', timeline: 'Final evaluation' },
  ];

  const support = [
    'Additional training',
    'Mentor assignment',
    'Coaching sessions',
    'Resource materials',
    'Time adjustments',
    'Peer assistance',
    'Manager guidance',
    'Regular feedback',
  ];

  const outcomes = [
    { outcome: 'Successful improvement', result: 'Continue employment', next: 'Ongoing support' },
    { outcome: 'Partial improvement', result: 'Extended timeline', next: 'Modified plan' },
    { outcome: 'No improvement', result: 'Separation decision', next: 'Transition process' },
    { outcome: 'New issues identified', result: 'Plan revision', next: 'Updated goals' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Performance Improvement Guide</h1>
      <p className="text-zinc-600">Steps, plans, support, and outcomes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Process Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Plan Elements</h3>
        <div className="space-y-1 text-xs">
          {plans.map((p) => (
            <div key={p.element} className="bg-white rounded p-2">
              <strong>{p.element}</strong>
              <div className="text-zinc-500 mt-1">Content: {p.content}</div>
              <div className="text-green-600 mt-1">Timeline: {p.timeline}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Support Resources</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {support.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Possible Outcomes</h3>
        <div className="space-y-1 text-xs">
          {outcomes.map((o) => (
            <div key={o.outcome} className="bg-white rounded p-2">
              <strong>{o.outcome}</strong>
              <div className="text-zinc-500 mt-1">Result: {o.result}</div>
              <div className="text-green-600 mt-1">Next: {o.next}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify performance gaps early. 2. Document specific issues clearly. 3. Meet privately with employee. 4. Set measurable improvement goals. 5. Create detailed action plan. 6. Provide adequate support resources. 7. Monitor progress regularly. 8. Give constructive feedback. 9. Evaluate improvement objectively. 10. Make fair final decision. Performance improvement = structured support. Gaps identified. Issues documented. Goals set. Plan created. Support provided. Progress monitored. Feedback given. Improvement evaluated. Decision made.
        </div>
      </div>
    </main>
  );
}