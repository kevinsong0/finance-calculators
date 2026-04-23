'use client'

export default function BusinessCorporateGovernanceGuide() {
  const structures = [
    { structure: 'Board of directors', role: 'Strategic oversight', accountability: 'Shareholders' },
    { structure: 'Executive team', role: 'Operational leadership', accountability: 'Board' },
    { structure: 'Audit committee', role: 'Financial oversight', accountability: 'Board' },
    { structure: 'Risk committee', role: 'Risk management', accountability: 'Board' },
    { structure: 'Compensation committee', role: 'Pay decisions', accountability: 'Board' },
    { structure: 'Nomination committee', role: 'Director selection', accountability: 'Board' },
  ];

  const mechanisms = [
    'Board independence',
    'Director elections',
    'Executive compensation',
    'Shareholder rights',
    'Financial reporting',
    'Internal controls',
    'Risk management',
    'Audit processes',
  ];

  const practices = [
    { practice: 'Board diversity', implementation: 'Director mix', benefit: 'Perspectives' },
    { practice: 'Separation of roles', implementation: 'CEO and chair split', benefit: 'Checks and balances' },
    { practice: 'Regular evaluation', implementation: 'Performance reviews', benefit: 'Accountability' },
    { practice: 'Stakeholder engagement', implementation: 'Communication channels', benefit: 'Transparency' },
  ];

  const standards = [
    'Board meeting frequency',
    'Director attendance rate',
    'Independence compliance',
    'Audit completion rate',
    'Risk assessment coverage',
    'Compensation alignment',
    'Shareholder participation',
    'Disclosure timeliness',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Corporate Governance Guide</h1>
      <p className="text-zinc-600">Structures, mechanisms, practices, and standards.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Structures</h3>
        <div className="space-y-1 text-xs">
          {structures.map((s) => (
            <div key={s.structure} className="bg-white rounded p-2">
              <strong>{s.structure}</strong>
              <div className="text-zinc-500 mt-1">Role: {s.role}</div>
              <div className="text-green-600 mt-1">Accountability: {s.accountability}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Mechanisms</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mechanisms.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {practices.map((p) => (
            <div key={p.practice} className="bg-white rounded p-2">
              <strong>{p.practice}</strong>
              <div className="text-zinc-500 mt-1">Implementation: {p.implementation}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Standards</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {standards.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Corporate Governance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish proper governance structures. 2. Implement governance mechanisms fully. 3. Practice board diversity actively. 4. Separate leadership roles clearly. 5. Conduct regular evaluations systematically. 6. Engage stakeholders consistently. 7. Meet governance standards completely. 8. Maintain disclosure transparency. 9. Align executive compensation fairly. 10. Ensure shareholder rights properly. Corporate governance = organizational accountability. Structures established. Mechanisms implemented. Diversity practiced. Roles separated. Evaluations conducted. Stakeholders engaged. Standards met. Transparency maintained. Compensation aligned. Rights ensured.
        </div>
      </div>
    </main>
  );
}