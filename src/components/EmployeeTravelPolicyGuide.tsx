'use client'

export default function EmployeeTravelPolicyGuide() {
  const components = [
    { component: 'Booking procedures', scope: 'Flights, hotels, cars', guideline: 'Approved vendors' },
    { component: 'Expense limits', scope: 'Daily allowances', guideline: 'Per diem rates' },
    { component: 'Approval process', scope: 'Pre-travel authorization', guideline: 'Required sign-offs' },
    { component: 'Reimbursement rules', scope: 'Expense submission', guideline: 'Documentation required' },
    { component: 'Travel classes', scope: 'Flight, hotel tiers', guideline: 'Role-based limits' },
    { component: 'Safety requirements', scope: 'Security measures', guideline: 'Company protocols' },
  ];

  const process = [
    'Submit travel request',
    'Obtain approval',
    'Book arrangements',
    'Follow expense limits',
    'Document expenses',
    'Complete trip',
    'Submit expense report',
    'Review submissions',
    'Process reimbursement',
    'Update records',
  ];

  const policies = [
    'Advance booking requirement',
    'Preferred vendor usage',
    'Class of travel limits',
    'Per diem allowances',
    'Receipt documentation',
    'Timely submission',
    'Approval hierarchy',
    'Travel safety protocol',
  ];

  const considerations = [
    { consideration: 'Budget control', factor: 'Cost limits', approach: 'Per diem system' },
    { consideration: 'Employee comfort', factor: 'Travel fatigue', approach: 'Class flexibility' },
    { consideration: 'Company liability', factor: 'Safety risks', approach: 'Insurance coverage' },
    { consideration: 'Policy fairness', factor: 'Consistent application', approach: 'Clear guidelines' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Travel Policy Guide</h1>
      <p className="text-zinc-600">Components, process, policies, and considerations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Scope: {c.scope}</div>
              <div className="text-green-600 mt-1">Guideline: {c.guideline}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Travel Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Policies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {policies.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Factor: {c.factor}</div>
              <div className="text-green-600 mt-1">Approach: {c.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Travel Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Submit travel request early. 2. Obtain required approvals. 3. Book approved arrangements. 4. Follow expense limits strictly. 5. Document all expenses. 6. Complete trip objectives. 7. Submit expense report promptly. 8. Review submission accuracy. 9. Process reimbursement quickly. 10. Update travel records. Travel policy = balanced guidelines. Request submitted. Approval obtained. Arrangements booked. Limits followed. Expenses documented. Trip completed. Report submitted. Submission reviewed. Reimbursement processed. Records updated.
        </div>
      </div>
    </main>
  );
}