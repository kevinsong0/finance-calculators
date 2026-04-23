'use client'

export default function DecisionMakingGuide() {
  const frameworks = [
    { framework: 'RACI', desc: 'Roles matrix', use: 'Who decides, approves, consults' },
    { framework: 'RAPID', desc: 'Decision roles', use: 'Recommend, Agree, Perform, Input, Decide' },
    { framework: 'DACI', desc: 'Driver, Approver, Contributors', use: 'Clear ownership for decisions' },
    { framework: 'Consensus', desc: 'Group agreement', use: 'Team commitment needed' },
    { framework: 'Majority Vote', desc: 'Democratic', use: 'Quick, less critical decisions' },
    { framework: 'Single Decider', desc: 'One owner', use: 'Speed, clear expertise' },
  ];

  const steps = [
    'Define the problem',
    'Gather information',
    'Generate options',
    'Evaluate options',
    'Make decision',
    'Communicate decision',
    'Implement decision',
    'Review outcomes',
  ];

  const biases = [
    'Confirmation bias',
    'Anchoring',
    'Groupthink',
    'Availability bias',
    'Overconfidence',
    'Sunk cost fallacy',
    'Recency bias',
    'Authority bias',
  ];

  const techniques = [
    'Decision matrix',
    'Pros/cons analysis',
    'Scenario planning',
    'Pre-mortem analysis',
    'Six thinking hats',
    'SWOT analysis',
    'Cost-benefit analysis',
    'Decision tree',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Decision Making Guide</h1>
      <p className="text-zinc-600">Decision frameworks, steps, biases, and techniques.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">{f.desc}</div>
              <div className="text-green-600 mt-1">Use: {f.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Biases</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {biases.map((b) => (
            <div key={b} className="bg-white rounded p-2 text-red-600">⚠️ {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Techniques</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {techniques.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Making Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Clarify the decision needed. 2. Identify decision owner/roles. 3. Set deadline for decision. 4. Gather relevant information. 5. Generate at least 3 options. 6. Define evaluation criteria. 7. Analyze options against criteria. 8. Check for bias influence. 9. Make and document decision. 10. Communicate to stakeholders. 11. Set implementation timeline. 12. Review outcomes later. Good decision = clear process. Bad decision = unclear ownership, rushed analysis. Framework, criteria, deadline, documentation."
        </div>
      </div>
    </main>
  );
}