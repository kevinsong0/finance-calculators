'use client'

export default function EmployeeLeaveManagementGuide() {
  const types = [
    { type: 'Vacation leave', basis: 'Accrued time', policy: 'Company-specific' },
    { type: 'Sick leave', basis: 'Illness, injury', policy: 'Health-related' },
    { type: 'FMLA leave', basis: 'Family, medical', policy: 'Federal mandated' },
    { type: 'Parental leave', basis: 'Birth, adoption', policy: 'Company policy' },
    { type: 'Bereavement leave', basis: 'Family death', policy: 'Company allowance' },
    { type: 'Military leave', basis: 'Service duty', policy: 'USERRA protection' },
  ];

  const process = [
    'Receive leave request',
    'Verify eligibility',
    'Check leave balance',
    'Review documentation',
    'Approve or deny',
    'Communicate decision',
    'Track leave usage',
    'Manage return',
    'Update records',
    'Report compliance',
  ];

  const compliance = [
    'FMLA eligibility tracking',
    'Leave balance calculations',
    'Documentation requirements',
    'Return rights protection',
    'Benefit continuation',
    'Job restoration',
    'Notification timing',
    'Record retention',
  ];

  const challenges = [
    { challenge: 'Coverage planning', issue: 'Absent employees', solution: 'Cross-training' },
    { challenge: 'Balance tracking', issue: 'Complex accruals', solution: 'Automated systems' },
    { challenge: 'Policy consistency', issue: 'Fair application', solution: 'Clear guidelines' },
    { challenge: 'Return coordination', issue: 'Transition smooth', solution: 'Communication plan' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Leave Management Guide</h1>
      <p className="text-zinc-600">Types, process, compliance, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Leave Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Basis: {t.basis}</div>
              <div className="text-green-600 mt-1">Policy: {t.policy}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
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
        <h3 className="font-medium mb-2">Leave Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Receive leave requests promptly. 2. Verify eligibility criteria. 3. Check leave balances accurately. 4. Review required documentation. 5. Approve or deny fairly. 6. Communicate decisions clearly. 7. Track leave usage continuously. 8. Manage return coordination. 9. Update employee records. 10. Report compliance requirements. Leave management = balanced approach. Requests received. Eligibility verified. Balances checked. Documentation reviewed. Decisions communicated. Usage tracked. Return managed. Records updated. Compliance reported.
        </div>
      </div>
    </main>
  );
}