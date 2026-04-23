'use client'

export default function LegalDocumentGenerator() {
  const documentTypes = [
    { type: 'Privacy Policy', desc: 'Data collection, usage, user rights', required: 'All websites' },
    { type: 'Terms of Service', desc: 'Usage rules, liability, termination', required: 'All services' },
    { type: 'Cookie Policy', desc: 'Cookie usage, types, consent', required: 'If using cookies' },
    { type: 'Disclaimer', desc: 'Limit liability, accuracy warnings', required: 'Content sites' },
    { type: 'EULA', desc: 'Software license agreement', required: 'Software/apps' },
    { type: 'GDPR Notice', desc: 'EU data protection compliance', required: 'EU users' },
  ];

  const sections = [
    { doc: 'Privacy Policy', sections: 'Data collected, purpose, sharing, retention, user rights, contact' },
    { doc: 'Terms of Service', sections: 'Acceptance, usage rules, accounts, content, termination, liability' },
    { doc: 'Cookie Policy', sections: 'Cookie types, purposes, duration, consent, management' },
    { doc: 'Disclaimer', sections: 'Accuracy, liability limits, external links, professional advice' },
  ];

  const compliance = [
    { regulation: 'GDPR', region: 'EU', key: 'Data rights, consent, breach notification' },
    { regulation: 'CCPA', region: 'California', key: 'Right to know, delete, opt-out' },
    { regulation: 'HIPAA', region: 'US Healthcare', key: 'Health data protection' },
    { regulation: 'COPPA', region: 'US', key: 'Children under 13 data' },
  ];

  const tips = [
    'Consult a lawyer for final review',
    'Update documents regularly',
    'Make documents easily accessible',
    'Use clear, plain language',
    'Include effective date',
    'Provide contact information',
    'Document changes in changelog',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Legal Document Generator Guide</h1>
      <p className="text-zinc-600">Document types, sections, compliance regulations, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Document Types</h3>
        <div className="space-y-1 text-xs">
          {documentTypes.map((d) => (
            <div key={d.type} className="bg-white rounded p-2">
              <strong>{d.type}</strong>
              <div className="text-zinc-500 mt-1">{d.desc}</div>
              <div className="text-green-600 mt-1">Required: {d.required}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Sections</h3>
        <div className="space-y-1 text-xs">
          {sections.map((s) => (
            <div key={s.doc} className="bg-white rounded p-2">
              <strong>{s.doc}</strong>
              <div className="text-zinc-600 mt-1">{s.sections}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Regulations</h3>
        <div className="space-y-1 text-xs">
          {compliance.map((c) => (
            <div key={c.regulation} className="bg-blue-50 rounded p-2">
              <strong className="text-blue-600">{c.regulation}</strong> ({c.region})
              <div className="text-zinc-600 mt-1">{c.key}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Important Disclaimer</h3>
        <div className="text-xs text-zinc-600">
          This guide provides general information only. Generated documents may not be legally compliant for your specific situation. Always consult a qualified attorney before publishing legal documents. Laws vary by jurisdiction and change frequently. Document templates need customization for your business, location, and data practices. Non-compliance can result in significant legal penalties.
        </div>
      </div>
    </main>
  );
}