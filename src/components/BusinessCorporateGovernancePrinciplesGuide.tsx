'use client'

export default function BusinessCorporateGovernancePrinciplesGuide() {
  const principles = [
    { principle: 'Transparency', implementation: 'Open disclosure', benefit: 'Trust building' },
    { principle: 'Accountability', implementation: 'Clear responsibility', benefit: 'Performance focus' },
    { principle: 'Fairness', implementation: 'Equal treatment', benefit: 'Stakeholder confidence' },
    { principle: 'Responsibility', implementation: 'Ethical conduct', benefit: 'Sustainability' },
  ];

  const structures = [
    'Board composition',
    'Board independence',
    'Committee structure',
    'Executive compensation',
    'Shareholder rights',
    'Stakeholder engagement',
    'Risk oversight',
    'Compliance framework',
  ];

  const practices = [
    { practice: 'Board meetings', frequency: 'Regular', purpose: 'Strategic oversight' },
    { practice: 'Financial reporting', frequency: 'Quarterly', purpose: 'Transparency' },
    { practice: 'Risk assessment', frequency: 'Annual', purpose: 'Risk management' },
    { practice: 'Stakeholder communication', frequency: 'Ongoing', purpose: 'Engagement' },
  ];

  const compliance = [
    'Legal requirements',
    'Regulatory standards',
    'Industry codes',
    'Internal policies',
    'Ethical guidelines',
    'Best practices',
    'Audit requirements',
    'Disclosure standards',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Corporate Governance Principles Guide</h1>
      <p className="text-zinc-600">Principles, structures, practices, and compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">Implementation: {p.implementation}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Structures</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {structures.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Practices</h3>
        <div className="space-y-1 text-xs">
          {practices.map((p) => (
            <div key={p.practice} className="bg-white rounded p-2">
              <strong>{p.practice}</strong>
              <div className="text-zinc-500 mt-1">Frequency: {p.frequency}</div>
              <div className="text-green-600 mt-1">Purpose: {p.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {compliance.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Corporate Governance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Implement transparency principles. 2. Establish accountability structures. 3. Apply fairness standards. 4. Foster responsibility culture. 5. Optimize board composition. 6. Ensure board independence. 7. Structure committees properly. 8. Design compensation appropriately. 9. Protect shareholder rights. 10. Engage stakeholders actively. Corporate governance = sustainable business. Transparency implemented. Accountability established. Fairness applied. Responsibility fostered. Board optimized. Independence ensured. Committees structured. Compensation designed. Rights protected. Stakeholders engaged.
        </div>
      </div>
    </main>
  );
}
