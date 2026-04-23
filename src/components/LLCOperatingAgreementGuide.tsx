'use client'

import { useState } from 'react'

export default function LLCOperatingAgreementGuide() {
  const sections = [
    { section: 'Organization', contents: ['Company name', 'Business purpose', 'Principal office', 'Duration', 'Member information'] },
    { section: 'Management', contents: ['Management structure', 'Member-managed vs manager-managed', 'Voting rights', 'Decision-making process', 'Manager duties'] },
    { section: 'Capital', contents: ['Initial capital contributions', 'Additional contributions', 'Capital accounts', 'Profit/loss allocation', 'Distribution timing'] },
    { section: 'Membership', contents: ['New member admission', 'Member withdrawal', 'Transfer restrictions', 'Death/disability provisions', 'Buyout procedures'] },
    { section: 'Dissolution', contents: ['Dissolution triggers', 'Winding up process', 'Asset distribution', 'Final tax obligations', 'Certificate of cancellation'] },
  ];

  const clauses = [
    { clause: 'Indemnification', purpose: 'Protect members from liability', importance: 'High' },
    { clause: 'Confidentiality', purpose: 'Protect business information', importance: 'Medium' },
    { clause: 'Non-competition', purpose: 'Restrict departing members', importance: 'Medium' },
    { clause: 'Dispute resolution', purpose: 'Avoid costly litigation', importance: 'High' },
    { clause: 'Amendment procedure', purpose: 'Allow future modifications', importance: 'Medium' },
  ];

  const tips = [
    'Customize for your specific business needs',
    'Include buy-sell agreement provisions',
    'Define voting thresholds for major decisions',
    'Address tax treatment clearly',
    'Update regularly as business evolves',
    'Consult attorney for complex provisions',
    'Keep signed copies with all members',
    'File with state if required',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">LLC Operating Agreement Guide</h1>
      <p className="text-zinc-600">Essential sections, clauses, and tips for creating your LLC operating agreement.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Required Sections</h3>
        <div className="space-y-1 text-xs">
          {sections.map((s) => (
            <div key={s.section} className="bg-white rounded p-2">
              <strong>{s.section}</strong>
              <div className="text-zinc-500 mt-1">{s.contents.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Clauses</h3>
        <div className="space-y-1 text-xs">
          {clauses.map((c) => (
            <div key={c.clause} className="bg-white rounded p-2">
              <strong>{c.clause}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {c.purpose}</div>
              <div className={`mt-1 ${c.importance === 'High' ? 'text-red-600' : 'text-zinc-400'}`}>Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Member-Managed vs Manager-Managed</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Member-Managed</strong>
            <div className="text-zinc-500 mt-1">All members run business. Simpler structure. Better for small LLCs with active members.</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Manager-Managed</strong>
            <div className="text-zinc-500 mt-1">Designated managers run business. Passive members. Better for large LLCs or investors.</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operating Agreement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define company name and purpose. 2. List all members and ownership. 3. Specify management structure. 4. Outline capital contributions. 5. Set profit/loss distribution. 6. Establish voting rights. 7. Include transfer restrictions. 8. Add dissolution provisions. 9. Define amendment process. 10. Sign and date by all members.
        </div>
      </div>
    </main>
  );
}