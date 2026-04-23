'use client'

export default function EmployeeExpenseManagementGuide() {
  const categories = [
    { category: 'Travel expenses', examples: 'Flights, hotels, meals', policy: 'Pre-approval required' },
    { category: 'Office supplies', examples: 'Equipment, materials', policy: 'Budget limits' },
    { category: 'Professional development', examples: 'Training, conferences', policy: 'Approval process' },
    { category: 'Client entertainment', examples: 'Meals, events', policy: 'Spending limits' },
    { category: 'Vehicle expenses', examples: 'Mileage, fuel, maintenance', policy: 'Reimbursement rates' },
    { category: 'Home office', examples: 'Internet, equipment', policy: 'Remote work policy' },
  ];

  const process = [
    'Establish expense policy',
    'Define approval workflow',
    'Set spending limits',
    'Choose submission method',
    'Require documentation',
    'Review submissions',
    'Approve or deny',
    'Process reimbursement',
    'Track spending trends',
    'Report to finance',
  ];

  const controls = [
    'Pre-approval requirements',
    'Spending limits by category',
    'Documentation standards',
    'Approval hierarchies',
    'Timely submission rules',
    'Fraud detection measures',
    'Budget monitoring',
    'Policy enforcement',
  ];

  const challenges = [
    { challenge: 'Policy compliance', issue: 'Inconsistent adherence', solution: 'Clear communication' },
    { challenge: 'Processing delays', issue: 'Slow approvals', solution: 'Automated workflow' },
    { challenge: 'Documentation gaps', issue: 'Missing receipts', solution: 'Mandatory uploads' },
    { challenge: 'Budget overruns', issue: 'Excessive spending', solution: 'Regular monitoring' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Expense Management Guide</h1>
      <p className="text-zinc-600">Categories, process, controls, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Expense Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>
              <div className="text-zinc-500 mt-1">Examples: {c.examples}</div>
              <div className="text-green-600 mt-1">Policy: {c.policy}</div>
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
        <h3 className="font-medium mb-2">Control Measures</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {controls.map((c, idx) => (
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
        <h3 className="font-medium mb-2">Expense Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish clear expense policy. 2. Define approval workflow levels. 3. Set spending limits per category. 4. Choose efficient submission method. 5. Require complete documentation. 6. Review submissions promptly. 7. Approve or deny with reasons. 8. Process reimbursements timely. 9. Track spending trends regularly. 10. Report results to finance. Expense management = controlled spending. Policy established. Workflow defined. Limits set. Method chosen. Documentation required. Submissions reviewed. Approvals processed. Reimbursements timely. Trends tracked. Reports provided.
        </div>
      </div>
    </main>
  );
}