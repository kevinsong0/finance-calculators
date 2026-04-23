'use client'

export default function EmployeeBenefitsAdministrationGuide() {
  const types = [
    { type: 'Health insurance', coverage: 'Medical, dental, vision', administration: 'Premium sharing' },
    { type: 'Retirement plans', coverage: '401(k), pension', administration: 'Contribution matching' },
    { type: 'Life insurance', coverage: 'Basic, supplemental', administration: 'Premium payment' },
    { type: 'Disability insurance', coverage: 'Short-term, long-term', administration: 'Coverage levels' },
    { type: 'Paid time off', coverage: 'Vacation, sick, holiday', administration: 'Accrual tracking' },
    { type: 'Flexible spending', coverage: 'Health, dependent', administration: 'Pre-tax deductions' },
  ];

  const process = [
    'Select benefit providers',
    'Negotiate contracts',
    'Design benefit packages',
    'Set contribution levels',
    'Enroll employees',
    'Manage changes',
    'Process claims',
    'Track participation',
    'Report compliance',
    'Review annually',
  ];

  const compliance = [
    'ERISA requirements',
    'ACA compliance',
    'HIPAA privacy',
    'FMLA administration',
    'COBRA notifications',
    'DOL reporting',
    'Non-discrimination rules',
    'Summary plan descriptions',
  ];

  const challenges = [
    { challenge: 'Cost management', issue: 'Premium increases', solution: 'Plan redesign' },
    { challenge: 'Employee education', issue: 'Complex options', solution: 'Clear communication' },
    { challenge: 'Claim processing', issue: 'Delays, disputes', solution: 'Streamlined procedures' },
    { challenge: 'Regulatory changes', issue: 'New requirements', solution: 'Regular updates' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Benefits Administration Guide</h1>
      <p className="text-zinc-600">Types, process, compliance, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefit Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Coverage: {t.coverage}</div>
              <div className="text-green-600 mt-1">Administration: {t.administration}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Administration Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
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
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong>{c.challenge}</strong>
              <div className="text-zinc-500 mt-1">Issue: {c.issue}</div>
              <div className="text-green-600 mt-1">Solution: {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Select qualified benefit providers. 2. Negotiate favorable contracts. 3. Design comprehensive packages. 4. Set appropriate contribution levels. 5. Enroll all eligible employees. 6. Manage status changes promptly. 7. Process claims efficiently. 8. Track participation rates. 9. Report compliance requirements. 10. Review plans annually. Benefits = strategic investment. Providers selected. Contracts negotiated. Packages designed. Contributions set. Enrollment complete. Changes managed. Claims processed. Participation tracked. Compliance reported. Annual review.
        </div>
      </div>
    </main>
  );
}