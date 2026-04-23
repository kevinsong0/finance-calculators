'use client'

export default function BusinessGovernanceFrameworkGuide() {
  const principles = [
    { principle: 'Transparency', application: 'Open disclosure', benefit: 'Trust' },
    { principle: 'Accountability', application: 'Clear responsibility', benefit: 'Ownership' },
    { principle: 'Fairness', application: 'Equal treatment', benefit: 'Equity' },
    { principle: 'Responsibility', application: 'Ethical conduct', benefit: 'Integrity' },
  ];

  const components = [
    'Board structure',
    'Board committees',
    'Management oversight',
    'Internal controls',
    'Risk management',
    'Compliance systems',
    'Audit processes',
    'Reporting standards',
    'Stakeholder rights',
    'Ethical guidelines',
  ];

  const structures = [
    { structure: 'Board of directors', role: 'Strategic oversight', function: 'Direction setting' },
    { structure: 'Audit committee', role: 'Financial oversight', function: 'Audit review' },
    { structure: 'Risk committee', role: 'Risk oversight', function: 'Risk assessment' },
    { structure: 'Compensation committee', role: 'Pay oversight', function: 'Remuneration' },
  ];

  const practices = [
    'Regular board meetings',
    'Independent directors',
    'Separation of roles',
    'Disclosure requirements',
    'Conflict of interest policies',
    'Whistleblower protection',
    'Code of conduct',
    'Shareholder communication',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Governance Framework Guide</h1>
      <p className="text-zinc-600">Principles, components, structures, and practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">Application: {p.application}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Framework Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Structures</h3>
        <div className="space-y-1 text-xs">
          {structures.map((s) => (
            <div key={s.structure} className="bg-white rounded p-2">
              <strong>{s.structure}</strong>
              <div className="text-zinc-500 mt-1">Role: {s.role}</div>
              <div className="text-green-600 mt-1">Function: {s.function}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Framework Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Ensure transparency through open disclosure. 2. Establish accountability with clear responsibility. 3. Maintain fairness with equal treatment. 4. Uphold responsibility through ethical conduct. 5. Define board structure clearly. 6. Create effective board committees. 7. Implement strong management oversight. 8. Develop robust internal controls. 9. Build comprehensive risk management. 10. Maintain ethical guidelines consistently. Governance framework = organizational integrity. Transparency ensured. Accountability established. Fairness maintained. Responsibility upheld. Structure defined. Committees created. Oversight implemented. Controls developed. Management built. Guidelines maintained.
        </div>
      </div>
    </main>
  );
}