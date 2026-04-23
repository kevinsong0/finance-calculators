'use client'

export default function EmployeeBenefitsGuide() {
  const types = [
    { type: 'Health insurance', desc: 'Medical coverage', value: 'Health security' },
    { type: 'Retirement plans', desc: '401k, pension', value: 'Future security' },
    { type: 'Paid time off', desc: 'Vacation, sick', value: 'Work-life balance' },
    { type: 'Life insurance', desc: 'Death benefit', value: 'Family protection' },
    { type: 'Disability insurance', desc: 'Income protection', value: 'Risk coverage' },
    { type: 'Flexible spending', desc: 'Pre-tax accounts', value: 'Tax savings' },
  ];

  const voluntary = [
    'Vision insurance',
    'Dental insurance',
    'Wellness programs',
    'Gym memberships',
    'Mental health support',
    'Employee assistance',
    'Tuition reimbursement',
    'Professional development',
    'Commuter benefits',
    'Child care support',
  ];

  const administration = [
    'Plan selection',
    'Enrollment process',
    'Communication',
    'Cost management',
    'Compliance tracking',
    'Vendor management',
    'Employee education',
    'Claims support',
  ];

  const trends = [
    { trend: 'Flexible work', impact: 'Remote options', adoption: 'Growing' },
    { trend: 'Mental health', impact: 'Wellness focus', adoption: 'Increasing' },
    { trend: 'Student loan', impact: 'Debt help', adoption: 'New' },
    { trend: 'Personalized', impact: 'Choice options', adoption: 'Emerging' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Benefits Guide</h1>
      <p className="text-zinc-600">Types, administration, trends, and compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Core Benefits</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Value: {t.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Voluntary Benefits</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {voluntary.map((v, idx) => (
            <div key={v} className="bg-white rounded p-2">{idx + 1}. {v}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Administration Tasks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {administration.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Trends</h3>
        <div className="space-y-1 text-xs">
          {trends.map((t) => (
            <div key={t.trend} className="bg-white rounded p-2">
              <strong>{t.trend}</strong>
              <div className="text-zinc-500 mt-1">Impact: {t.impact}</div>
              <div className="text-green-600 mt-1">Adoption: {t.adoption}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess employee needs. 2. Select appropriate plans. 3. Negotiate with vendors. 4. Design enrollment process. 5. Communicate benefits clearly. 6. Educate employees. 7. Manage costs effectively. 8. Ensure compliance. 9. Handle claims support. 10. Review annually. 11. Track satisfaction. 12. Adjust offerings. Benefits = competitive advantage. Core required. Voluntary optional. Clear communication. Cost management. Compliance maintained. Employee education. Regular review.
        </div>
      </div>
    </main>
  );
}